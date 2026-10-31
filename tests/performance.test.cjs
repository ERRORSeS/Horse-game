const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../save-fix.js'),'utf8').split('/* Manual slots')[0];
function storageCodec(){const data=new Map(),writes=[];const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>{writes.push(k);data.set(k,v)}};vm.runInNewContext(source.replace('  target.getItem=', '  globalThis.packForTest=pack;target.getItem='),{localStorage:storage,console});return {storage,data,writes};}
function legacyPack(text){const input=unescape(encodeURIComponent(text)),dict=new Map(),out=[];let next=256,word='';for(const ch of input){const combined=word+ch;if(combined.length===1||dict.has(combined)){word=combined;continue;}out.push(word.length===1?word.charCodeAt(0):dict.get(word));if(next<65000)dict.set(combined,next++);word=ch;}if(word)out.push(word.length===1?word.charCodeAt(0):dict.get(word));return 'OXERLZ1:'+out.map(c=>String.fromCharCode(c+1)).join('');}
test('faster compression is byte-compatible with existing saves and survives fresh reloads',()=>{const {storage,data}=storageCodec();let seed=17,random='';for(let i=0;i<200000;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;random+=String.fromCharCode(32+seed%95);}for(const raw of [JSON.stringify({name:'Étoile 漢字 🐎',history:Array(3000).fill('persistent injury and care')}),random]){storage.setItem('horse_game_perf',raw);assert.equal(data.get('horse_game_perf'),legacyPack(raw));assert.equal(storage.getItem('horse_game_perf'),raw);const next=storageCodec();next.data.set('horse_game_perf',data.get('horse_game_perf'));assert.equal(next.storage.getItem('horse_game_perf'),raw);}});
test('unchanged saves avoid another compression/write but detect external storage changes',()=>{const {storage,data,writes}=storageCodec(),raw=JSON.stringify({history:Array(3000).fill('same state')});storage.setItem('horse_game_perf',raw);storage.setItem('horse_game_perf',raw);assert.equal(writes.length,1);data.set('horse_game_perf','external');assert.equal(storage.getItem('horse_game_perf'),'external');storage.setItem('horse_game_perf',raw);assert.equal(writes.length,2);assert.equal(storage.getItem('horse_game_perf'),raw);});
test('selection changes scan their own panel and preserve unrelated saved UI state',()=>{const listeners={},queries=[],panel={querySelectorAll:s=>{queries.push(s);return [];}},app={uiDisclosures:{old:true},uiSelections:{other:'retained'}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../ui-state.js'),'utf8'),{app,document:{addEventListener:(k,f)=>listeners[k]=f,querySelectorAll(){throw Error('scanned every hidden panel');}},window:{addEventListener(){}},setTimeout(){},clearTimeout(){}});listeners.change({target:{closest:()=>panel}});assert.deepEqual(queries,['details','select, textarea']);assert.equal(app.uiSelections.other,'retained');assert.equal(app.uiDisclosures.old,true);});
test('restocking preserves stock and RNG without rescanning owned equipment per random draw',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../management.js'),'utf8');
  function run(legacy){
    let scans=0;
    const context=vm.createContext({app:{management:{sequence:0,items:Array.from({length:1000},(_,i)=>({id:i,originalPrice:45,condition:100}))}}});
    vm.runInContext(legacy?source.replace('function mgStockRandom(){const s=app.management||mgState();','function mgStockRandom(){const s=mgState();'):source,context);
    context.countScan=()=>scans++;
    vm.runInContext('const originalState=mgState;mgState=function(){countScan();return originalState();};mgRestock(720);',context);
    return {state:JSON.stringify(context.app.management),scans};
  }
  const fast=run(false),legacy=run(true);
  assert.equal(fast.state,legacy.state,'stock, inventory values and random stream must remain identical');
  assert.ok(fast.scans<5,`restock performed ${fast.scans} inventory scans`);
  assert.ok(legacy.scans>100,'fixture must exercise repeated random draws');
});
test('disabled housing skips occupant scans and still invokes the base simulation hook',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../behavior.js'),'utf8');
  const start=source.indexOf('const BEHAVIOR_BASE_SIMULATE_STALL=mgSimulateHour;');
  const end=source.indexOf('function behaviorAfterPastureHour',start);
  const hours=[];
  const context=vm.createContext({app:{settings:{stallAssignments:false},currentBarn:{pasturesEnabled:false}},mgSimulateHour:hour=>hours.push(hour),stallState(){throw Error('Disabled housing scanned stalls');}});
  vm.runInContext(source.slice(start,end)+'mgSimulateHour(123);',context);
  assert.deepEqual(hours,[123]);
});
