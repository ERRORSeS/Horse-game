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
