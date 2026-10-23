/* Lossless local-save compression. Plain JSON saves remain readable. */
(function(){
  const target=typeof Storage!=='undefined'&&localStorage instanceof Storage?Storage.prototype:localStorage;
  const read=target.getItem,write=target.setItem,prefix='OXERLZ1:',cache=new Map();
  function pack(text){
    const input=unescape(encodeURIComponent(text)),dict=new Map(),out=[];let next=256,word='';
    for(const ch of input){const combined=word+ch;if(combined.length===1||dict.has(combined)){word=combined;continue;}out.push(word.length===1?word.charCodeAt(0):dict.get(word));if(next<65000)dict.set(combined,next++);word=ch;}
    if(word)out.push(word.length===1?word.charCodeAt(0):dict.get(word));
    return prefix+out.map(c=>String.fromCharCode(c+1)).join('');
  }
  function unpack(text){
    if(!text?.startsWith(prefix))return text;
    const codes=text.slice(prefix.length).split('').map(c=>c.charCodeAt(0)-1),dict=[];let next=256,word=String.fromCharCode(codes.shift()),out=[word];
    for(const code of codes){const entry=code<256?String.fromCharCode(code):dict[code]||(code===next?word+word[0]:null);if(entry===null)throw Error('Compressed save is corrupt.');out.push(entry);if(next<65000)dict[next++]=word+entry[0];word=entry;}
    return decodeURIComponent(escape(out.join('')));
  }
  target.getItem=function(key){const stored=read.call(this,key),old=cache.get(key);if(old&&old.stored===stored)return old.raw;const raw=unpack(stored);cache.set(key,{stored,raw});return raw;};
  target.setItem=function(key,value){const raw=String(value),packed=String(key).startsWith('horse_game')&&raw.length>512?pack(raw):raw;const stored=packed.length<raw.length?packed:raw;write.call(this,key,stored);cache.set(key,{stored,raw});};
  if(typeof localStorage.key==='function'){const keys=Array.from({length:localStorage.length},(_,i)=>localStorage.key(i));for(const key of keys)if(key?.startsWith('horse_game'))try{const raw=read.call(localStorage,key);if(raw&&!raw.startsWith(prefix)&&raw.length>512){const packed=pack(raw);if(packed.length<raw.length)write.call(localStorage,key,packed);}}catch(error){console.warn('Existing save compaction deferred',error);}}
})();
/* Manual slots are snapshots. Autosave belongs to the separate session key. */
function saveFeedback(message,error=false){
  app.saveFeedback={message,error};
  const panel=document.getElementById('savePanel');if(!panel)return;
  let status=panel.querySelector?.('[data-save-status]');
  if(!status){status=document.createElement('p');status.setAttribute('data-save-status','');panel.appendChild(status);}
  status.setAttribute('role',error?'alert':'status');status.textContent=message;
}
function readSaveStoreForWrite(){
  const raw=localStorage.getItem(SAVE_SLOTS_KEY);if(!raw)return {activeSlot:'',slots:Object.create(null)};
  const store=JSON.parse(raw);
  if(!store||typeof store!=='object'||!store.slots||typeof store.slots!=='object'||Array.isArray(store.slots))throw new Error('The existing save list could not be read. It has been left unchanged.');
  return {activeSlot:typeof store.activeSlot==='string'?store.activeSlot:'',slots:Object.assign(Object.create(null),store.slots)};
}
refreshSaveSlotsUi=function(selectedName=''){
  const select=document.getElementById('saveSlotSelect');if(!select)return;
  const previous=select.value,names=saveSlotNames(),chosen=selectedName||previous||names[0]||'';
  select.innerHTML=names.length?names.map(name=>`<option value="${csEscape(name)}">${csEscape(name)}</option>`).join(''):'<option value="">No saves yet</option>';
  if(names.includes(chosen))select.value=chosen;
};
saveGame=function(manual=true,saveName=''){
  if(careMigrationBlocked){saveFeedback('Saving is blocked because the original save backup could not be stored.',true);return false;}
  try{
    app.careVersion=CARE_VERSION;
    const payload=serializeAppState();
    if(!manual){commitSaveValue(SAVE_KEY,payload);return true;}
    const name=(saveName||resolveSelectedSaveName()).trim()||DEFAULT_SAVE_SLOT;
    const store=readSaveStoreForWrite();
    store.slots[name]={updatedAt:new Date().toISOString(),payload};store.activeSlot=name;
    writeSaveSlotsStore(store);
    let warning='';
    try{commitSaveValue(SAVE_KEY,payload);}catch(error){warning=' The named save is stored, but the session autosave could not be updated.';}
    refreshSaveSlotsUi(name);pushReport(`Game saved to "${name}".`);
    saveFeedback(`Saved "${name}". This snapshot will stay unchanged until you save over it.`+warning,Boolean(warning));
    return true;
  }catch(error){
    console.error('Save failed',error);
    saveFeedback('Saving failed. Your existing named saves have not been replaced. '+(/quota|storage|space/i.test(error.name+' '+error.message)?'Browser storage may be full or unavailable.':error.message),true);return false;
  }
};
loadGame=function(manual=true,saveName=''){
  let rollback;
  try{
    const store=readSaveSlotsStore();
    const name=(saveName||(manual?resolveLoadSaveName():'' )||'').trim();
    let raw,nameUsed=name;
    if(name){raw=Object.hasOwn(store.slots,name)?store.slots[name].payload:'';}
    else if(!manual){raw=localStorage.getItem(SAVE_KEY);if(!raw){nameUsed=store.activeSlot||Object.keys(store.slots)[0]||'';raw=store.slots[nameUsed]?.payload;}}
    else {nameUsed=store.activeSlot||'';raw=store.slots[nameUsed]?.payload;}
    if(!raw){if(manual)saveFeedback(nameUsed?`Saved game "${nameUsed}" was not found.`:'No saved game is available yet.',true);return false;}
    const data=JSON.parse(raw);if(!data||typeof data!=='object'||!Array.isArray(data.horses))throw new Error('The selected save does not contain a valid horse roster.');
    rollback=serializeAppState();hydrateFromSave(data);if(nameUsed&&app.saveScope!=='slot:'+nameUsed){app.saveScope='slot:'+nameUsed;app.autosaveSchedule=null;ensureSaveSchedule();}
    let warning='';
    try{
      commitSaveValue(SAVE_KEY,serializeAppState());
      if(nameUsed){store.activeSlot=nameUsed;writeSaveSlotsStore(store);}
    }catch(error){warning=' The game loaded, but browser storage could not update the current session.';}
    refreshSaveSlotsUi(nameUsed||store.activeSlot);
    if(manual){pushReport(`Game loaded from "${nameUsed}" successfully.`);saveFeedback(`Loaded "${nameUsed}". Money, date and horse progress have been restored.`+warning,Boolean(warning));}
    return true;
  }catch(error){
    if(rollback)try{hydrateFromSave(JSON.parse(rollback));}catch(rollbackError){console.error('Unable to restore the previous session',rollbackError);}
    console.error('Load failed',error);if(manual)saveFeedback('Loading failed. '+error.message,true);return false;
  }
};
const SAVE_FEEDBACK_RENDER=render;
render=function(...args){const result=SAVE_FEEDBACK_RENDER(...args);saveFeedback(app.saveFeedback?.message||'Manual saves and three-month backups are separate.',app.saveFeedback?.error||false);return result;};

// Verified persistence and quarterly backups, isolated by the active save scope.
const QUARTERLY_SAVE_KEY=SAVE_KEY+'_quarterly_v1';
function commitSaveValue(key,value){localStorage.setItem(key,value);if(localStorage.getItem(key)!==value)throw new Error('Browser storage did not confirm the saved data.');}
writeSaveSlotsStore=function(store){commitSaveValue(SAVE_SLOTS_KEY,JSON.stringify({version:1,activeSlot:store.activeSlot||'',slots:store.slots||{}}));};
function validatePersistentState(data){
  if(!data||!Array.isArray(data.horses)||!Number.isFinite(data.money)||data.money<0)throw new Error('The current stable or currency data is invalid.');
  if(!Number.isInteger(data.year)||data.year<1||!Number.isInteger(data.month)||data.month<1||data.month>12||!Number.isInteger(data.day)||data.day<1||data.day>30)throw new Error('The current calendar is invalid.');
  const ids=new Set();for(const h of data.horses){if(!h||!h.id||typeof h.name!=='string'||ids.has(h.id))throw new Error('A horse has missing or duplicate identity data.');ids.add(h.id);}
  return data;
}
function saveMonthIndex(){return (app.year-1)*12+app.month-1;}
function ensureSaveSchedule(){
  if(!app.saveScope)app.saveScope='stable:'+HorseHealth.hash(app.horses.map(h=>h.id).join('|'));
  if(!app.autosaveSchedule||app.autosaveSchedule.scope!==app.saveScope)app.autosaveSchedule={scope:app.saveScope,lastBoundary:saveMonthIndex(),nextBoundary:saveMonthIndex()+3,commits:[]};
  return app.autosaveSchedule;
}
const VERIFIED_SAVE=saveGame;
saveGame=function(manual=true,name=''){
  const priorScope=app.saveScope,priorSchedule=app.autosaveSchedule;
  try{
    validatePersistentState(JSON.parse(serializeAppState()));
    if(manual){const selected=(name||resolveSelectedSaveName()).trim()||DEFAULT_SAVE_SLOT;app.saveScope='slot:'+selected;}
    ensureSaveSchedule();
    const ok=VERIFIED_SAVE(manual,name);
    if(manual){if(!ok){app.saveScope=priorScope;app.autosaveSchedule=priorSchedule;}saveFeedback(ok?'Game saved successfully.':'Save failed. Your progress has not been confirmed as saved.',!ok);}
    return ok;
  }catch(error){app.saveScope=priorScope;app.autosaveSchedule=priorSchedule;saveFeedback('Save failed. Your progress has not been confirmed as saved.',true);console.error('Save validation or persistence failed',error);return false;}
};
const SCHEDULE_HYDRATE=hydrateFromSave;
hydrateFromSave=function(data){const result=SCHEDULE_HYDRATE(data);app.saveScope=data.saveScope||null;app.autosaveSchedule=data.autosaveSchedule?HorseHealth.copy(data.autosaveSchedule):null;ensureSaveSchedule();return result;};
function processQuarterlyAutosave(){
  const schedule=ensureSaveSchedule(),now=saveMonthIndex();if(now<schedule.nextBoundary)return false;
  const before=HorseHealth.copy(schedule);
  try{
    const raw=localStorage.getItem(QUARTERLY_SAVE_KEY),store=raw?JSON.parse(raw):{version:1,scopes:{}};
    if(!store.scopes||typeof store.scopes!=='object')throw new Error('The backup store is unreadable.');
    schedule.lastBoundary=now;while(schedule.nextBoundary<=now)schedule.nextBoundary+=3;
    schedule.commits.push({year:app.year,month:app.month,boundary:now});
    const payload=serializeAppState();validatePersistentState(JSON.parse(payload));
    const prior=store.scopes[app.saveScope];store.scopes[app.saveScope]={current:{payload,year:app.year,month:app.month,boundary:now},previous:validQuarterlyRecord(prior?.current,app.saveScope)?prior.current:validQuarterlyRecord(prior?.previous,app.saveScope)?prior.previous:null};
    commitSaveValue(QUARTERLY_SAVE_KEY,JSON.stringify(store));
    saveFeedback(`Autosaved — Year ${app.year}, Month ${app.month}`);return true;
  }catch(error){app.autosaveSchedule=before;saveFeedback('Autosave failed. Please save manually.',true);console.error('Quarterly autosave failed',error);return false;}
}
function validQuarterlyRecord(record,scope){try{const data=validatePersistentState(JSON.parse(record?.payload));return !data.saveScope||data.saveScope===scope;}catch(error){return false;}}
function loadQuarterlyBackup(previous=false){
  let rollback;try{ensureSaveSchedule();const scope=app.saveScope,record=JSON.parse(localStorage.getItem(QUARTERLY_SAVE_KEY)||'{}').scopes?.[scope]?.[previous?'previous':'current'];if(!validQuarterlyRecord(record,scope))throw new Error('No valid backup exists for this save.');const data=validatePersistentState(JSON.parse(record.payload));rollback=serializeAppState();hydrateFromSave(data);if(!saveGame(false)){saveFeedback('The backup loaded, but current progress has not been confirmed as saved.',true);return true;}saveFeedback('Backup loaded successfully.');return true;}catch(error){if(rollback)try{hydrateFromSave(JSON.parse(rollback));}catch(restoreError){console.error('Backup rollback failed',restoreError);}saveFeedback('Loading failed. The backup has been left unchanged.',true);return false;}
}
const SCHEDULE_MONTH=monthlyProgress;
monthlyProgress=function(...args){ensureSaveSchedule();const result=SCHEDULE_MONTH(...args);processQuarterlyAutosave();return result;};
const SCHEDULE_RESET=resetGame;
resetGame=function(...args){app.saveScope=null;app.autosaveSchedule=null;const result=SCHEDULE_RESET(...args);ensureSaveSchedule();return result;};
const SCHEDULE_FEEDBACK=saveFeedback;
saveFeedback=function(message,error=false){SCHEDULE_FEEDBACK(message,error);const panel=document.getElementById('savePanel');if(!panel||typeof document.createElement!=='function')return;let controls=panel.querySelector?.('[data-quarterly-controls]');if(!controls){controls=document.createElement('div');controls.setAttribute('data-quarterly-controls','');controls.innerHTML='<p data-quarterly-dates></p><button type="button" data-load-backup>Load Autosave</button><button type="button" data-load-previous>Load Previous Autosave</button>';panel.appendChild(controls);controls.querySelector('[data-load-backup]').onclick=()=>{if(loadQuarterlyBackup())render();};controls.querySelector('[data-load-previous]').onclick=()=>{if(loadQuarterlyBackup(true))render();};}const s=ensureSaveSchedule(),fmt=n=>`Year ${Math.floor(n/12)+1}, Month ${n%12+1}`;controls.querySelector('[data-quarterly-dates]').textContent=`Last autosave: ${s.commits.length?fmt(s.lastBoundary):'None yet'}. Next autosave: ${fmt(s.nextBoundary)}.`;};
