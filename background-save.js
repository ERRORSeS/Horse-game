/* Structured cloning captures one atomic snapshot; JSON encoding happens off the UI thread. */
function serializeAppStateInBackground(){
 if(typeof Worker==='undefined')return Promise.resolve(serializeAppState());
 mgCleanupAssignments();mgState();
 return new Promise((resolve,reject)=>{
  let worker;
  try{worker=new Worker(new URL('save-serialize-worker.js?v=1',document.baseURI));}catch(error){resolve(serializeAppState());return;}
  const timeout=setTimeout(()=>{worker.terminate();reject(Error('Preparing the save timed out. Retry saving or export your progress.'));},30000);
  const finish=(error,payload)=>{clearTimeout(timeout);worker.terminate();if(error)reject(Error(error));else resolve(payload);};
  worker.onmessage=({data})=>finish(data.error,data.payload);
  worker.onerror=event=>{event.preventDefault();finish(event.message||'Preparing the save failed.');};
  try{worker.postMessage(app);}catch(error){finish(error.message);}
 });
}

// Avoid starting a large autosave snapshot in the middle of a burst of player input.
let saveLastInputAt=0;
for(const event of ['pointerdown','keydown','input','change'])document.addEventListener(event,()=>saveLastInputAt=performance.now(),true);
function scheduleAutomaticSave(callback){
 let cancelled=false,timer=null,idle=null;
 const blocked=()=>typeof timeSkipTask!=='undefined'&&timeSkipTask||performance.now()-saveLastInputAt<1000||globalThis.navigator?.scheduling?.isInputPending?.({includeContinuous:true});
 const run=()=>{if(cancelled)return;if(blocked()){timer=setTimeout(run,100);return;}if(typeof requestIdleCallback==='function')idle=requestIdleCallback(()=>{idle=null;if(blocked())timer=setTimeout(run,100);else if(!cancelled)callback();},{timeout:2000});else callback();};
 timer=setTimeout(run,600);
 return ()=>{cancelled=true;if(timer!==null)clearTimeout(timer);if(idle!==null&&typeof cancelIdleCallback==='function')cancelIdleCallback(idle);};
}
