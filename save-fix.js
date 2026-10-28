/* Lossless local-save compression. Plain JSON saves remain readable. */
(function(){
  const target=typeof Storage!=='undefined'&&localStorage instanceof Storage?Storage.prototype:localStorage;
  const read=target.getItem,write=target.setItem,prefix='OXERLZ1:',cache=new Map();
  function pack(text){
    const input=unescape(encodeURIComponent(text)),dict=new Map(),out=[];let next=256,word=input.charCodeAt(0);
    if(!input.length)return prefix;
    for(let i=1;i<input.length;i++){
      const ch=input.charCodeAt(i),key=word*256+ch,combined=dict.get(key);
      if(combined!==undefined){word=combined;continue;}
      out.push(String.fromCharCode(word+1));if(next<65000)dict.set(key,next++);word=ch;
    }
    out.push(String.fromCharCode(word+1));return prefix+out.join('');
  }
  function unpack(text){
    if(!text?.startsWith(prefix))return text;
    const dict=[],start=prefix.length;let next=256,word=String.fromCharCode(text.charCodeAt(start)-1);const out=[word];
    for(let i=start+1;i<text.length;i++){
      const code=text.charCodeAt(i)-1,entry=code<256?String.fromCharCode(code):dict[code]||(code===next?word+word[0]:null);
      if(entry===null)throw Error('Compressed save is corrupt.');out.push(entry);if(next<65000)dict[next++]=word+entry[0];word=entry;
    }
    return decodeURIComponent(escape(out.join('')));
  }
  target.getItem=function(key){const stored=read.call(this,key),old=cache.get(key);if(old&&old.stored===stored)return old.raw;const raw=unpack(stored);cache.set(key,{stored,raw});return raw;};
  target.setItem=function(key,value){const raw=String(value),old=cache.get(key);if(old?.raw===raw&&read.call(this,key)===old.stored)return;const packed=String(key).startsWith('horse_game')&&raw.length>512?pack(raw):raw;const stored=packed.length<raw.length?packed:raw;write.call(this,key,stored);cache.set(key,{stored,raw});};
  if(typeof localStorage.key==='function'){const keys=Array.from({length:localStorage.length},(_,i)=>localStorage.key(i));for(const key of keys)if(key?.startsWith('horse_game'))try{const raw=read.call(localStorage,key);if(raw&&!raw.startsWith(prefix)&&raw.length>512){const packed=pack(raw);if(packed.length<raw.length)write.call(localStorage,key,packed);}}catch(error){console.warn('Existing save compaction deferred',error);}}
})();
/* Manual slots are retired: all saves update one verified stable record. */
const QUARTERLY_SAVE_KEY=SAVE_KEY+'_quarterly_v1';
let singleSaveLoadBlocked=false;
function saveFeedback(message,error=false){
  app.saveFeedback={message,error};
  const status=document.getElementById('saveStatus');if(!status)return;
  status.setAttribute('role',error?'alert':'status');status.textContent=message;
}
function validatePersistentState(data){
  if(!data||!Array.isArray(data.horses)||!Number.isFinite(data.money))throw new Error('The current stable or currency data is invalid.');
  if(!Number.isInteger(data.year)||data.year<1||!Number.isInteger(data.month)||data.month<1||data.month>12||!Number.isInteger(data.day)||data.day<1||data.day>30)throw new Error('The current calendar is invalid.');
  const ids=new Set();for(const h of data.horses){if(!h||!h.id||typeof h.name!=='string'||ids.has(h.id))throw new Error('A horse has missing or duplicate identity data.');ids.add(h.id);}
  return data;
}
function commitSaveValue(key,value){
  const previous=localStorage.getItem(key);
  try{localStorage.setItem(key,value);if(localStorage.getItem(key)!==value)throw new Error('Browser storage did not confirm the saved data.');}
  catch(error){try{if(localStorage.getItem(key)!==previous){if(previous===null)localStorage.removeItem(key);else localStorage.setItem(key,previous);}}catch(restoreError){console.error('Save rollback failed',restoreError);}throw error;}
}
function singleSaveKeys(){
  const keys=[SAVE_KEY,SAVE_SLOTS_KEY,QUARTERLY_SAVE_KEY];
  if(typeof localStorage.key==='function')for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith('horse_game_pre_care_v1_'))keys.push(key);}
  return [...new Set(keys)];
}
function persistSingleSave(payload){
  // Replacing an existing storage value is atomic. If duplicates exhaust quota,
  // replace the largest legacy record first, without deleting the last good save.
  const records=singleSaveKeys().map(key=>{try{return {key,raw:localStorage.getItem(key)};}catch(error){return {key,raw:null,unreadable:true};}}),fallback=records.filter(r=>r.key!==SAVE_KEY&&r.raw!==null).sort((a,b)=>b.raw.length-a.raw.length);
  let failure;
  for(const record of [records[0],...fallback]){
    try{commitSaveValue(record.key,payload);}catch(error){failure=error;continue;}
    // Only retire old copies after the full new record has been read back.
    for(const old of records)if(old.key!==record.key&&(old.raw!==null||old.unreadable))try{localStorage.removeItem(old.key);}catch(error){console.warn('Old save cleanup deferred',error);}
    return record.key;
  }
  throw failure||new Error('Browser storage is unavailable.');
}
function saveMonthIndex(){return (app.year-1)*12+app.month-1;}
function ensureSaveSchedule(){
  app.saveScope='stable:single';
  if(!app.autosaveSchedule||app.autosaveSchedule.scope!==app.saveScope)app.autosaveSchedule={scope:app.saveScope,lastBoundary:saveMonthIndex(),nextBoundary:saveMonthIndex()+3,commits:[]};
  return app.autosaveSchedule;
}
saveGame=function(manual=true){
  const previous=app.lastSuccessfulSave;
  try{
    if(singleSaveLoadBlocked)throw new Error('The existing save could not be loaded. Reload before saving to protect it.');
    validatePersistentState(app);app.careVersion=CARE_VERSION;ensureSaveSchedule();app.lastSuccessfulSave=new Date().toISOString();
    const payload=serializeAppState();persistSingleSave(payload);careMigrationBlocked=false;
    saveFeedback('Saved · '+new Date(app.lastSuccessfulSave).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}));return true;
  }catch(error){app.lastSuccessfulSave=previous;saveFeedback('Save failed. Your previous save is preserved. '+(/quota|storage|space/i.test(error.name+' '+error.message)?'Browser storage is full or unavailable.':error.message),true);console.error('Save failed',error);return false;}
};
function singleSaveCandidates(){
  const candidates=[];let found=false;
  const add=(payload,priority)=>{try{const data=validatePersistentState(typeof payload==='string'?JSON.parse(payload):payload);candidates.push({data,priority});}catch(error){/* Try the next preserved legacy record. */}};
  for(const key of singleSaveKeys()){
    let raw;try{raw=localStorage.getItem(key);}catch(error){found=true;continue;}if(!raw)continue;found=true;
    let data;try{data=JSON.parse(raw);}catch(error){continue;}
    if(Array.isArray(data.horses)){add(data,0);continue;}
    if(data.slots){const entries=Object.entries(data.slots).sort((a,b)=>String(b[1]?.updatedAt||'').localeCompare(String(a[1]?.updatedAt||'')));const active=data.slots[data.activeSlot];if(active)add(active.payload,2);for(const [,slot]of entries)add(slot?.payload,3);}
    if(data.scopes)for(const scope of Object.values(data.scopes)){add(scope.current?.payload,4);add(scope.previous?.payload,5);}
    if(data.source)add(data.source,6);
  }
  candidates.sort((a,b)=>a.priority-b.priority||(a.priority===0?String(b.data.lastSuccessfulSave||'').localeCompare(String(a.data.lastSuccessfulSave||'')):0));return {found,candidates};
}
loadGame=function(manual=true){
  let rollback;
  try{
    const {found,candidates}=singleSaveCandidates();
    if(!candidates.length){if(found)throw new Error('The saved stable could not be read. It has been left untouched.');return false;}
    rollback=serializeAppState();hydrateFromSave(candidates[0].data);singleSaveLoadBlocked=false;
    // Loading does not write or prune storage. The next successful save consolidates it.
    saveFeedback('Progress restored automatically.');return true;
  }catch(error){if(rollback)try{hydrateFromSave(JSON.parse(rollback));}catch(restoreError){console.error('Load rollback failed',restoreError);}singleSaveLoadBlocked=true;saveFeedback('Load failed. '+error.message,true);console.error('Load failed',error);return false;}
};
refreshSaveSlotsUi=function(){};
// Migration can hydrate directly from the preserved source. It must not require
// another full localStorage backup before loading a nearly-full storage area.
csMigrate=function(){};
const SINGLE_HYDRATE=hydrateFromSave;
hydrateFromSave=function(data){const result=SINGLE_HYDRATE(data);app.lastSuccessfulSave=data.lastSuccessfulSave||null;app.saveScope='stable:single';app.autosaveSchedule=data.autosaveSchedule?HorseHealth.copy(data.autosaveSchedule):null;ensureSaveSchedule();return result;};
function processQuarterlyAutosave(){
  const schedule=ensureSaveSchedule(),now=saveMonthIndex();if(now<schedule.nextBoundary)return false;
  const before=HorseHealth.copy(schedule);schedule.lastBoundary=now;while(schedule.nextBoundary<=now)schedule.nextBoundary+=3;
  schedule.commits.push({year:app.year,month:app.month,boundary:now});schedule.commits=schedule.commits.slice(-12);
  if(saveGame(false))return true;app.autosaveSchedule=before;return false;
}
const SINGLE_MONTH=monthlyProgress;
monthlyProgress=function(...args){ensureSaveSchedule();const result=SINGLE_MONTH(...args);processQuarterlyAutosave();return result;};
const SINGLE_RESET=resetGame;
resetGame=function(...args){singleSaveLoadBlocked=false;app.lastSuccessfulSave=null;app.saveScope=null;app.autosaveSchedule=null;return SINGLE_RESET(...args);};
const SINGLE_RENDER=render;
render=function(...args){const result=SINGLE_RENDER(...args);saveFeedback(app.saveFeedback?.message||'One save · Progress resumes automatically.',app.saveFeedback?.error||false);return result;};
// Portable helpers remain compatible with previously exported files.
function exportStableSave(){return JSON.stringify({format:'oxer-to-oxer',version:1,exportedAt:new Date().toISOString(),state:JSON.parse(serializeAppState())},null,2);}
function validateImportedSave(text){const file=JSON.parse(text);if(file.format&&file.format!=='oxer-to-oxer')throw new Error('This file is not an Oxer to Oxer save.');if(file.format&&file.version!==1)throw new Error('Unsupported save version.');return validatePersistentState(file.format?file.state:file);}
function importStableSave(text){const data=validateImportedSave(text),before=serializeAppState();try{hydrateFromSave(data);if(!saveGame(false))throw new Error('Imported progress could not be stored.');return true;}catch(error){hydrateFromSave(JSON.parse(before));throw error;}}
