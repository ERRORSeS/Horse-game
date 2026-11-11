/* Keep time simulation atomic and off the UI thread; cancellation discards the worker copy. */
let timeSkipTask=null,timeSkipIdleWorker=null,timeSkipIdleTimer=null;
function timeSkipScripts(){return [...document.scripts].map(s=>s.src).filter(src=>src&&!/\/(responsive-time|time-skip-worker)\.js(?:\?|$)/.test(src));}
function runResponsiveTimeSkip(unit,{testSeed}={}){
 if(timeSkipTask)return timeSkipTask.promise;
 if(!['hour','day','month'].includes(unit))return Promise.reject(Error('Unknown time skip.'));
 if(typeof Worker==='undefined')return Promise.reject(Error('Background simulation is unavailable in this browser.'));
 const dialog=document.createElement('dialog');dialog.className='time-skip-dialog';dialog.innerHTML='<div class="time-skip-spinner" aria-hidden="true"></div><h2>Advancing time</h2><p role="status" aria-live="polite">Preparing simulation…</p><button type="button">Cancel skip</button>';document.body.appendChild(dialog);dialog.showModal();
 let worker;try{if(timeSkipIdleTimer!==null)clearTimeout(timeSkipIdleTimer);worker=timeSkipIdleWorker||new Worker(new URL('time-skip-worker.js?v=1',document.baseURI));timeSkipIdleWorker=null;timeSkipIdleTimer=null;}catch(error){dialog.close();dialog.remove();saveFeedback('Could not advance time: '+error.message,true);return Promise.resolve({ok:false,error:error.message});}
 let settle;const promise=new Promise(resolve=>settle=resolve),task={worker,promise,committed:false};timeSkipTask=task;
 const status=dialog.querySelector('[role="status"]'),cancel=dialog.querySelector('button');
 const finish=result=>{if(task.done)return;task.done=true;if(result.ok){worker.onmessage=null;worker.onerror=null;timeSkipIdleWorker=worker;timeSkipIdleTimer=setTimeout(()=>{if(timeSkipIdleWorker===worker){worker.terminate();timeSkipIdleWorker=null;timeSkipIdleTimer=null;}},60000);}else worker.terminate();dialog.close();dialog.remove();if(timeSkipTask===task)timeSkipTask=null;settle(result);};
 const abort=()=>{if(!task.committed)finish({cancelled:true});};cancel.onclick=abort;dialog.addEventListener('cancel',event=>{event.preventDefault();abort();});
 const fail=message=>{if(task.done)return;finish({ok:false,error:message});saveFeedback('Time skip did not complete. Your previous game state is unchanged. '+message,true);};
 worker.onerror=event=>{event.preventDefault();fail(event.message||'Background simulation could not start.');};
 worker.onmessage=({data})=>{
  if(timeSkipTask!==task)return;
  if(data.type==='progress'){status.textContent=data.text;return;}
  if(data.type==='error'){fail(data.message);return;}
  if(data.type!=='complete')return;
  try{
   Save3.validate(data.state);
   // Keep the active app object, replacing its state only after successful completion.
   const identity=app.saveIdentity,lastSaved=app.lastSuccessfulSave;
   for(const key of Object.keys(app))delete app[key];Object.assign(app,data.state);
   if(identity)app.saveIdentity=identity;if(lastSaved)app.lastSuccessfulSave=lastSaved;
   RECENT_HORSE_NAMES.clear();for(const name of data.recentHorseNames||[])RECENT_HORSE_NAMES.add(name);
   task.committed=true;render();saveGame(false);finish({ok:true,simulationMs:data.simulationMs});
  }catch(error){if(task.committed){finish({ok:true,displayError:error.message});saveFeedback('Time advanced. Refresh the view and retry saving: '+error.message,true);}else fail(error.message);}
 };
 try{worker.postMessage({unit,state:app,recentHorseNames:[...RECENT_HORSE_NAMES],scripts:timeSkipScripts(),...(testSeed!==undefined?{testSeed}:{})});}catch(error){fail(error.message);}
 return promise;
}
for(const [id,unit]of [['skipHourBtn','hour'],['skipDayBtn','day'],['skipMonthBtn','month']]){const button=document.getElementById(id);if(button)button.onclick=()=>runResponsiveTimeSkip(unit).catch(error=>saveFeedback(error.message,true));}
