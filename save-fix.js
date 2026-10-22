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
    if(!manual){localStorage.setItem(SAVE_KEY,payload);return true;}
    const name=(saveName||resolveSelectedSaveName()).trim()||DEFAULT_SAVE_SLOT;
    const store=readSaveStoreForWrite();
    store.slots[name]={updatedAt:new Date().toISOString(),payload};store.activeSlot=name;
    writeSaveSlotsStore(store);
    let warning='';
    try{localStorage.setItem(SAVE_KEY,payload);}catch(error){warning=' The named save is stored, but the session autosave could not be updated.';}
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
    rollback=serializeAppState();hydrateFromSave(data);
    let warning='';
    try{
      localStorage.setItem(SAVE_KEY,serializeAppState());
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
render=function(...args){const result=SAVE_FEEDBACK_RENDER(...args);if(app.saveFeedback)saveFeedback(app.saveFeedback.message,app.saveFeedback.error);return result;};
