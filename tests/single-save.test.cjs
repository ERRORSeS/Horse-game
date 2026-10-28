const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const test=require('node:test');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const sources=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="([^?]+)\?/g)].map(m=>[m[1],fs.readFileSync(path.join(root,m[1]),'utf8')]);
function runtime(store=new Map(),limits={quota:Infinity}){
  const dummy=new Proxy(function(){},{get(t,k){if(k==='innerHTML')return Reflect.get(t,k)||'';if(['style','classList','dataset'].includes(k))return dummy;if(k==='value')return '';if(k==='querySelectorAll')return ()=>[];return ()=>{};}});
  const storage={get length(){return store.size},key(i){return [...store.keys()][i]},getItem(k){return store.get(k)??null},setItem(k,v){const used=[...store].reduce((n,[key,value])=>n+(key===k?0:value.length),0)+v.length;if(used>limits.quota){limits.rejections=(limits.rejections||0)+1;const error=Error('Storage quota exceeded');error.name='QuotaExceededError';throw error;}store.set(k,v);},removeItem(k){store.delete(k)}};
  const ctx=vm.createContext({console:{log(){},warn(){},error(){}},document:{readyState:'loading',addEventListener(){},createElement(){return dummy},getElementById(){return dummy},querySelector(){return dummy},querySelectorAll(){return []}},localStorage:storage,window:{addEventListener(){}},setTimeout(){},clearTimeout(){},alert(){}});
  for(const [name,source]of sources)vm.runInContext(source,ctx,{filename:name});
  return {ctx,store,limits,run:code=>vm.runInContext(code,ctx)};
}
test('real compressed storage at quota consolidates atomically and resumes in a fresh runtime',()=>{
  const game=runtime();game.run(`resetGame();app.money=12345;const old=serializeAppState();localStorage.setItem(SAVE_SLOTS_KEY,JSON.stringify({activeSlot:'A',slots:Object.fromEntries(['A','B','C','D'].map(n=>[n,{payload:old}]))}));localStorage.setItem(QUARTERLY_SAVE_KEY,JSON.stringify({scopes:{old:{current:{payload:old},previous:{payload:old}}}}));`);
  game.limits.quota=[...game.store.values()].reduce((n,v)=>n+v.length,0);
  assert.equal(game.run(`app.money=67890;app.horses[0].name='Saved Étoile 🐎';let pressureSeed=17,notes='';for(let i=0;i<20000;i++){pressureSeed=(Math.imul(pressureSeed,1664525)+1013904223)>>>0;notes+=String.fromCharCode(32+pressureSeed%95);}app.horses[0].savePressureNotes=notes;saveGame(true)`),true);
  assert.ok(game.limits.rejections>0,'first primary write must actually exceed capacity');
  assert.equal(game.store.size,1,'one compressed stable remains');
  assert.ok([...game.store.values()][0].startsWith('OXERLZ1:'));
  const count=game.run('app.horses.length'),ids=game.run('app.horses.map(h=>h.id).join("|")');
  const fresh=runtime(game.store,{quota:Infinity});
  assert.equal(fresh.run('loadGame(false)'),true);
  assert.equal(fresh.run('app.money'),67890);
  assert.equal(fresh.run('app.horses[0].name'),'Saved Étoile 🐎');
  assert.equal(fresh.run('app.horses.length'),count);
  assert.equal(fresh.run('app.horses.map(h=>h.id).join("|")'),ids);
  assert.equal(fresh.run('saveGame(true)'),true);
  assert.deepEqual([...game.store.keys()],['horse_game_save_v1']);
});
test('a quota failure preserves the previous raw record byte for byte across reload',()=>{
  const game=runtime();game.run('resetGame();app.money=2468;saveGame(true)');
  const before=new Map(game.store);game.limits.quota=0;
  assert.equal(game.run('app.money=9876;saveGame(true)'),false);
  assert.deepEqual(game.store,before);
  const fresh=runtime(game.store);assert.equal(fresh.run('loadGame(false)'),true);assert.equal(fresh.run('app.money'),2468);
});
test('a pre-care legacy stable can load at full capacity without requiring a duplicate backup',()=>{
  const game=runtime();game.run(`resetGame();const legacy=JSON.parse(serializeAppState());delete legacy.careVersion;legacy.money=0;localStorage.setItem(SAVE_KEY,JSON.stringify(legacy));`);
  const before=new Map(game.store),fresh=runtime(game.store,{quota:0});
  assert.equal(fresh.run('loadGame(false)'),true);
  assert.equal(fresh.run('app.money'),0);assert.deepEqual(game.store,before);
});
test('single Save UI has no slot picker, load/delete menu or duplicate-save controls',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.match(html,/<button id="saveGameBtn"[^>]*>Save<\/button>/);
  assert.doesNotMatch(html,/id="(?:saveSlotSelect|saveNameInput|toggleSavePanelBtn|loadGameBtn|deleteSaveBtn|savePanel)"/);
  assert.match(html,/id="saveStatus"[^>]*aria-live="polite"/);
});

test('a corrupt compressed duplicate cannot block a valid legacy stable from loading or saving',()=>{
  const game=runtime();game.run(`resetGame();app.money=1357;localStorage.setItem(SAVE_SLOTS_KEY,JSON.stringify({activeSlot:'Old',slots:{Old:{payload:serializeAppState()}}}));`);
  game.store.set('horse_game_save_v1','OXERLZ1:'+String.fromCharCode(1000,2000));
  const fresh=runtime(game.store);assert.equal(fresh.run('loadGame(false)'),true);assert.equal(fresh.run('app.money'),1357);
  assert.equal(fresh.run('saveGame(true)'),true);assert.equal(game.store.size,1);
  const reloaded=runtime(game.store);assert.equal(reloaded.run('loadGame(false)'),true);assert.equal(reloaded.run('app.money'),1357);
});
