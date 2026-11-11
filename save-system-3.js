/* Local, portable save identities. IndexedDB is device storage, not cloud storage. */
const Save3=(()=>{
 let database=null,opening=null,pending=null,timer=null,lastError=null,ready=false,dirty=false;
 const supported=typeof indexedDB!=='undefined';
 function id(){const bytes=new Uint32Array(3);if(typeof crypto!=='undefined'&&crypto.getRandomValues)crypto.getRandomValues(bytes);else for(let i=0;i<3;i++)bytes[i]=Math.floor(Math.random()*4294967296);return 'OXER-'+Array.from(bytes,n=>n.toString(36).toUpperCase().padStart(7,'0')).join('-');}
 function identity(){return app.saveIdentity ||= {id:id(),name:'My Stable',stableName:app.currentBarn?.name||'Your Stable',createdAt:new Date().toISOString(),updatedAt:null,schemaVersion:3,storage:supported?'IndexedDB on this device':'Local browser storage'};}
 // A suspended/blocked storage request must report a retryable error rather than hang forever.
 function storageOperation(label,start){
  return new Promise((resolve,reject)=>{
   let settled=false,abort=()=>{};
   const finish=(ok,value)=>{if(settled)return false;settled=true;clearTimeout(timeout);(ok?resolve:reject)(value);return true;};
   const timeout=setTimeout(()=>{if(finish(false,Error(label+' timed out. Close other game tabs and retry saving.'))){try{abort();}catch(error){}}},30000);
   try{start(value=>finish(true,value),error=>finish(false,error||Error(label+' failed.')),callback=>abort=callback);}catch(error){if(finish(false,error)){try{abort();}catch(ignored){}}}
  });
 }
 async function db(){
  if(!supported)return null;
  if(database)return database;
  if(opening)return opening;
  opening=storageOperation('Opening device storage',(resolve,reject)=>{
   const request=indexedDB.open('oxer-save-system-3',1);
   request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('saves'))request.result.createObjectStore('saves',{keyPath:'id'});};
   request.onerror=()=>reject(request.error);
   request.onblocked=()=>reject(Error('Save database is blocked by another open version. Close other game tabs and retry.'));
   request.onsuccess=()=>{const connection=request.result;if(!resolve(connection))connection.close();};
  }).then(connection=>{database=connection;connection.onversionchange=()=>{connection.close();if(database===connection)database=null;};connection.onclose=()=>{if(database===connection)database=null;};return connection;}).finally(()=>{opening=null;});
  return opening;
 }
 // Keep large career ledgers below browser single-value limits without dropping history.
 async function packRecord(record){
  if(!record.payload||record.payload.length<32000000||(typeof CompressionStream==='undefined'||typeof DecompressionStream==='undefined'))return record;
  const payloadGzip=await new Response(new Blob([record.payload]).stream().pipeThrough(new CompressionStream('gzip'))).blob();
  return {...record,payload:null,payloadEncoding:'gzip',payloadGzip};
 }
 async function unpackRecord(record){
  if(record?.payloadEncoding!=='gzip')return record;
  if(typeof DecompressionStream==='undefined')throw Error('This save requires gzip decompression support. Open it in a current browser.');
  const payload=await new Response(record.payloadGzip.stream().pipeThrough(new DecompressionStream('gzip'))).text();
  const {payloadEncoding,payloadGzip,...meta}=record;return {...meta,payload};
 }
 async function getStored(key){
  const d=await db();
  if(!d){const raw=localStorage.getItem('horse_game_save3_'+key);return raw?JSON.parse(raw):null;}
  return storageOperation('Reading device storage',(resolve,reject,setAbort)=>{
   const transaction=d.transaction('saves','readonly'),request=transaction.objectStore('saves').get(key);
   setAbort(()=>transaction.abort());request.onsuccess=()=>resolve(request.result||null);request.onerror=()=>reject(request.error);transaction.onabort=()=>reject(transaction.error||Error('Save read aborted.'));
  });
 }
 async function get(key){return unpackRecord(await getStored(key));}
 async function sameStored(a,b){
  if(a?.snapshotId!==b.snapshotId||a?.payloadEncoding!==b.payloadEncoding)return false;
  if(b.payloadEncoding!=='gzip')return a.payload===b.payload;
  if(a.payloadGzip?.size!==b.payloadGzip.size)return false;
  const [left,right]=await Promise.all([a.payloadGzip.arrayBuffer(),b.payloadGzip.arrayBuffer()]);
  const x=new Uint8Array(left),y=new Uint8Array(right);for(let i=0;i<x.length;i++)if(x[i]!==y[i])return false;return true;
 }
 async function put(record,active=true){
  const d=await db();let stored=record;
  if(!d){localStorage.setItem('horse_game_save3_'+record.id,JSON.stringify(record));if(active)localStorage.setItem('horse_game_save3___active__',JSON.stringify({id:'__active__',saveId:record.id}));}
  else {stored=await packRecord(record);await storageOperation('Writing device storage',(resolve,reject,setAbort)=>{
   const transaction=d.transaction('saves','readwrite'),store=transaction.objectStore('saves');
   setAbort(()=>transaction.abort());transaction.oncomplete=()=>resolve();transaction.onerror=event=>reject(event.target?.error||transaction.error);transaction.onabort=()=>reject(transaction.error||Error('Save transaction aborted.'));
   store.put(stored);if(active)store.put({id:'__active__',saveId:record.id});
  });}
  const verified=await getStored(record.id);
  if(!await sameStored(verified,stored))throw Error('Save readback verification failed.');
 }
 async function list(){
  const d=await db();
  if(!d){const rows=[];for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith('horse_game_save3_')&&!key.endsWith('__active__'))try{rows.push(JSON.parse(localStorage.getItem(key)));}catch(error){}}return rows;}
  return Promise.all(await storageOperation('Listing device saves',(resolve,reject,setAbort)=>{
   const transaction=d.transaction('saves','readonly'),request=transaction.objectStore('saves').getAll();
   setAbort(()=>transaction.abort());request.onsuccess=()=>resolve(request.result.filter(row=>row.id!=='__active__'));request.onerror=()=>reject(request.error);transaction.onabort=()=>reject(transaction.error||Error('Save listing aborted.'));
  }).then(rows=>rows.map(unpackRecord)));
 }
 function validate(data){
  validatePersistentState(data);
  if(data.auctions3){
   const a=data.auctions3,collections=a.collections||[a.collection].filter(Boolean);
   if(a.version!==1||!Array.isArray(a.contracts)||!Array.isArray(a.history)||!Array.isArray(a.watchlist))throw Error('Invalid auction state.');
   if(!Array.isArray(collections)||collections.length>8||collections.some(c=>!Array.isArray(c.lots)||c.lots.length>35))throw Error('Invalid auction collection.');
   const deferred=a.deferredCollections87||[];
   if(!Array.isArray(deferred)||deferred.length>5||deferred.some(c=>!Array.isArray(c.lots)||c.lots.length>35))throw Error('Invalid scheduled auction collection.');
   const lots=new Map();
   for(const lot of [...collections,...deferred].flatMap(c=>c.lots)){
    if(lots.has(lot.id)||lot.horseId!==lot.horse?.id||!Number.isFinite(lot.bid)||lot.bid<0||!Array.isArray(lot.schedule)||lot.schedule.length>8)throw Error('Invalid auction lot references.');
    lots.set(lot.id,lot);
   }
   const contracts=new Set();
   for(const c of a.contracts){
    const horseId=c.horse?.id,lot=lots.get(c.lotId);
    // Old candidate IDs and departed delivered horses remain valid purchase history.
    const matchesLegacy=horseId===c.lotId+':horse'||typeof horseId==='string'&&horseId.startsWith(c.lotId)&&/^:candidate:\d+:horse$/.test(horseId.slice(c.lotId.length));
    const matchesReference=lot?lot.horseId===horseId:c.horseId?c.horseId===horseId:matchesLegacy;
    if(contracts.has(c.id)||!horseId||!matchesReference||c.horseId&&c.horseId!==horseId||!Number.isFinite(c.costs?.total)||c.costs.total<0||c.paid&&!c.signed||c.delivered&&!c.paid||c.cancelled&&(c.paid||c.delivered||c.held>0))throw Error('Invalid import contract.');
    contracts.add(c.id);
   }
  }
  if(data.saveIdentity&&(!/^OXER-[A-Z0-9-]+$/.test(data.saveIdentity.id)||data.saveIdentity.schemaVersion!==3))throw Error('Invalid save identity or schema.');
  return data;
 }
 function cleanTransferFields(){for(const key of Object.keys(app.uiSelections||{}))if(key.includes("data-save3-code:"))delete app.uiSelections[key];}
 async function record(){
  cleanTransferFields();const meta=identity(),updatedAt=new Date().toISOString(),previous=meta.updatedAt,lastSaved=app.lastSuccessfulSave;
  meta.updatedAt=updatedAt;app.lastSuccessfulSave=updatedAt;
  const header={...meta,snapshotId:id()};let payload;
  try{payload=typeof serializeAppStateInBackground==='function'&&supported?serializeAppStateInBackground({storage:true}):serializeAppState();}
  finally{meta.updatedAt=previous;app.lastSuccessfulSave=lastSaved;}
  const encoded=await payload;return {...header,...(typeof encoded==='string'?{payload:encoded}:encoded)};
 }
 function enqueue(){
  identity();dirty=true;saveFeedback('Saving on this device…');
  if(timer!==null){if(typeof timer==='function')timer();else clearTimeout(timer);}
  const run=()=>{timer=null;flush().catch(()=>{});};timer=typeof scheduleAutomaticSave==='function'?scheduleAutomaticSave(run):setTimeout(run,600);return true;
 }
 function flush(){
  if(timer!==null){if(typeof timer==='function')timer();else clearTimeout(timer);timer=null;}
  if(pending)return pending;
  if(!dirty)return Promise.resolve();
  // One write at a time. Changes during a write become one fresh follow-up snapshot.
  const operation=Promise.resolve().then(async()=>{
   while(dirty){
    const saveId=identity().id;
    try{
     validate(app);dirty=false;const current=await record();
     const existing=await getStored(current.id);
     if(existing&&existing.createdAt!==current.createdAt)throw Error('Save ID collision detected. Export this stable before retrying.');
     await put(current);lastError=null;
     if(app.saveIdentity?.id===current.id){app.saveIdentity.updatedAt=current.updatedAt;app.lastSuccessfulSave=current.updatedAt;if(!dirty)saveFeedback('Saved on this device · '+current.id);}
    }catch(error){
     lastError=error;
     if(app.saveIdentity?.id===saveId){dirty=true;saveFeedback('Save failed. Current progress is still open; retry saving or export a file. '+error.message,true);}
     throw error;
    }
   }
  }).finally(()=>{if(pending===operation)pending=null;});
  pending=operation;return operation;
 }
 async function load(saveId,{preserve=true}={}){if((dirty||pending)&&preserve)await flush();const stored=await getStored(String(saveId).trim().toUpperCase()),r=await unpackRecord(stored);if(!r?.payload)throw Error('No accessible save matches this ID on this device or connected storage. Import a save file or choose a local save.');const data=validate(JSON.parse(r.payload)),before=serializeAppState();try{hydrateFromSave(data);app.saveIdentity={id:r.id,name:r.name,stableName:r.stableName,createdAt:r.createdAt,updatedAt:r.updatedAt,schemaVersion:3,storage:r.storage};await put(stored);dirty=false;if(!data.ridingEducationRepairVersion||data.auctions3&&data.auctions3.bidFundingVersion!==2){dirty=true;await flush();}render();saveFeedback('Loaded '+r.name+' · '+r.id);return true;}catch(error){hydrateFromSave(JSON.parse(before));throw error;}}
 async function create(name='My Stable'){if(dirty||pending)await flush();let meta;do{meta={id:id(),name,stableName:app.currentBarn?.name||'Your Stable',createdAt:new Date().toISOString(),updatedAt:null,schemaVersion:3,storage:supported?'IndexedDB on this device':'Local browser storage'};}while(await get(meta.id));app.saveIdentity=meta;dirty=true;await flush();return meta;}
 function exportFile(){cleanTransferFields();identity();return JSON.stringify({format:'oxer-to-oxer',version:3,exportedAt:new Date().toISOString(),state:JSON.parse(serializeAppState())});}
 async function importFile(text){const file=JSON.parse(text);if(file.format&&file.format!=='oxer-to-oxer'||file.version&&![1,3].includes(file.version))throw Error('Unsupported save file.');const data=validate(file.state||file);if(dirty||pending)await flush();const before=serializeAppState();try{hydrateFromSave(data);app.saveIdentity=data.saveIdentity||null;identity();dirty=true;await flush();render();return app.saveIdentity.id;}catch(error){hydrateFromSave(JSON.parse(before));dirty=false;throw error;}}
 async function portableCode(){const text=exportFile(),raw=new TextEncoder().encode(text);let data=raw,mode='RAW';if(typeof CompressionStream!=='undefined'){data=new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());mode='GZ';}const chunks=[];for(let i=0;i<data.length;i+=8192)chunks.push(String.fromCharCode(...data.subarray(i,i+8192)));return 'OXER3.'+mode+'.'+HorseHealth.hash(text).toString(16)+'.'+btoa(chunks.join('')).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');}
 async function importCode(code){const parts=String(code).trim().split('.');if(parts.length!==4||parts[0]!=='OXER3'||!['RAW','GZ'].includes(parts[1]))throw Error('Paste the full Portable Save Code, not the short local Save ID.');if(parts[3].length>100000000)throw Error('Portable code is too large. Use Import Save File instead.');let encoded=parts[3].replaceAll('-','+').replaceAll('_','/');encoded+='='.repeat((4-encoded.length%4)%4);let bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));if(parts[1]==='GZ'){if(typeof DecompressionStream==='undefined')throw Error('This browser cannot decompress the code. Use an exported JSON save file instead.');bytes=new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());}const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);if(HorseHealth.hash(text).toString(16)!==parts[2])throw Error('Portable Save Code is incomplete or damaged. Copy the complete code again.');return importFile(text);}
 async function start(){try{const active=await get('__active__');if(active?.saveId)await load(active.saveId,{preserve:false});else{SAVE3_LEGACY_LOAD(false);if(typeof singleSaveLoadBlocked!=='undefined'&&singleSaveLoadBlocked)throw Error('The existing legacy save could not be restored. Export/recover it before starting a new stable.');identity();dirty=true;await flush();}ready=true;}catch(error){lastError=error;saveFeedback('Local save database unavailable: '+error.message+'. Existing saves have not been deleted.',true);}finally{document.querySelector('[data-save3-loading]')?.remove();}}
 return {supported,identity,get,list,load,create,flush,enqueue,exportFile,importFile,portableCode,importCode,validate,start,get dirty(){return dirty||Boolean(pending);},get ready(){return ready;},get error(){return lastError;}};
})();
const SAVE3_HYDRATE=hydrateFromSave;
hydrateFromSave=function(data){const r=SAVE3_HYDRATE(data);app.saveIdentity=data.saveIdentity?HorseHealth.copy(data.saveIdentity):null;return r;};
const SAVE3_RESET=resetGame;
resetGame=function(...args){const r=SAVE3_RESET(...args);app.saveIdentity=null;app.auctions3=null;return r;};
const SAVE3_LEGACY_LOAD=loadGame;
loadGame=function(manual=true,...args){if(Save3.supported&&!manual)return false;return SAVE3_LEGACY_LOAD(manual,...args);};
const SAVE3_SAVE=saveGame;
saveGame=function(manual=true){if(!Save3.supported){Save3.identity();return SAVE3_SAVE(manual);}if(!Save3.ready){saveFeedback('Save storage is still loading or requires recovery.',true);return false;}Save3.enqueue();if(manual)Save3.flush().catch(()=>{});return true;};
const SAVE3_SETTINGS=renderSettings;
renderSettings=function(){SAVE3_SETTINGS();const panel=document.getElementById('settings');if(!panel)return;panel.querySelector('[data-save3-panel]')?.remove();const node=document.createElement('section'),meta=Save3.identity();node.className='box';node.dataset.save3Panel='';node.innerHTML=`<details data-save3-disclosure><summary>Your Save</summary><p>${csEscape(meta.name)} · ${csEscape(meta.stableName)}</p><p>Save ID: <strong>${csEscape(meta.id)}</strong></p><p>Last saved: ${csEscape(meta.updatedAt||'Not yet saved')} · ${csEscape(meta.storage)}</p><p>IDs load saves available on this device. No cloud backend is configured. Use a Portable Save Code or export a file to move progress to another device.</p><button data-save3='copy'>Copy Local Save ID</button><details><summary>Move or Recover a Save on Any Device</summary><p>A short ID locates a save on this device. A Portable Save Code contains the full snapshot. Generate a fresh code after playing, then paste it into this same section on another device. No cloud account is needed.</p><button data-save3='portable'>Generate Portable Save Code</button><label>Portable Save Code<textarea data-save3-code data-authoritative-selection='true' rows='5' spellcheck='false' placeholder='Paste the complete OXER3 portable code here'></textarea></label><button data-save3='copy-portable'>Copy Portable Code</button><button data-save3='load-portable'>Load Portable Save Code</button></details><button data-save3='export'>Export Save</button><button data-save3='rename'>Rename Save</button><button data-save3='new'>Create Separate Stable Save</button><label>Enter Save ID<input data-save3-id></label><button data-save3='find'>Find Save</button><button data-save3='list'>Choose Local Save</button><label>Import Save File<input type='file' accept='.json,application/json' data-save3-file></label><div data-save3-found></div><p role='status' data-save3-status></p></details>`;panel.prepend(node);const status=node.querySelector('[data-save3-status]'),found=node.querySelector('[data-save3-found]');const action=fn=>async()=>{try{await fn();}catch(e){status.textContent=e.message;}};
 node.querySelector('[data-save3="portable"]').onclick=action(async()=>{node.querySelector('[data-save3-code]').value=await Save3.portableCode();status.textContent='Portable code generated. It contains this snapshot and works on another device.';});
 node.querySelector('[data-save3="copy-portable"]').onclick=action(async()=>{const code=await Save3.portableCode();node.querySelector('[data-save3-code]').value=code;await navigator.clipboard.writeText(code);status.textContent='Portable Save Code copied.';});
 node.querySelector('[data-save3="load-portable"]').onclick=action(async()=>{if(!confirm('Preserve your current stable and restore the pasted snapshot?'))return;const id=await Save3.importCode(node.querySelector('[data-save3-code]').value);const live=document.querySelector('[data-save3-status]');if(live)live.textContent='Portable save restored: '+id;});
 node.querySelector('[data-save3="copy"]').onclick=action(async()=>{await navigator.clipboard.writeText(meta.id);status.textContent='Save ID copied.';});
 node.querySelector('[data-save3="export"]').onclick=action(async()=>{const blob=new Blob([Save3.exportFile()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=meta.id+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 node.querySelector('[data-save3="rename"]').onclick=action(async()=>{const name=prompt('Save display name',meta.name);if(name){meta.name=name;Save3.enqueue();await Save3.flush();renderSettings();}});
 node.querySelector('[data-save3="new"]').onclick=action(async()=>{if(!confirm('Preserve this stable and start a separate stable?'))return;await Save3.flush();resetGame();await Save3.create('New Stable');render();renderSettings();});
 const showFound=r=>{found.innerHTML='';if(!r?.payload){status.textContent='No accessible save matches this ID on this device or connected storage. Import a save file or choose a local save.';return;}const text=document.createElement('p');text.textContent='Save found: '+r.name+'. Last saved '+r.updatedAt;found.appendChild(text);const load=document.createElement('button');load.textContent='Load This Save';load.onclick=action(async()=>{if(!confirm('Save the current stable and load '+r.name+'?'))return;await Save3.load(r.id);});found.appendChild(load);const cancel=document.createElement('button');cancel.textContent='Cancel';cancel.onclick=()=>found.replaceChildren();found.appendChild(cancel);};
 node.querySelector('[data-save3="find"]').onclick=action(async()=>showFound(await Save3.get(node.querySelector('[data-save3-id]').value.trim().toUpperCase())));
 node.querySelector('[data-save3="list"]').onclick=action(async()=>{const rows=await Save3.list();found.innerHTML='';for(const r of rows){const b=document.createElement('button');b.textContent=r.name+' · '+r.id;b.onclick=()=>showFound(r);found.appendChild(b);}});
 node.querySelector('[data-save3-file]').onchange=action(async()=>{const file=node.querySelector('[data-save3-file]').files[0];if(!file)return;if(!confirm('Preserve this stable and import the selected save?'))return;await Save3.importFile(await file.text());status.textContent='Save imported.';});
};
if(typeof document!=='undefined'&&Save3.supported){document.addEventListener('DOMContentLoaded',()=>{const loading=document.createElement('div');loading.dataset.save3Loading='';loading.className='save3-loading';loading.textContent='Loading your local stable…';document.body.appendChild(loading);Save3.start().then(()=>{const before=JSON.stringify(app.auctions3);auctionAdvance(pastureCalendarHour());if(Save3.ready&&before!==JSON.stringify(app.auctions3))Save3.enqueue();render();});});window.addEventListener('pagehide',()=>Save3.flush().catch(()=>{}));window.addEventListener('beforeunload',event=>{if(Save3.dirty){event.preventDefault();event.returnValue='';}});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')Save3.flush().catch(()=>{});});}
