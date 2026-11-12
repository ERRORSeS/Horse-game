/* Keep time simulation atomic and off the UI thread; cancellation discards the worker copy. */
let timeSkipTask=null,timeSkipIdleWorker=null,timeSkipIdleTimer=null;
function timeSkipScripts(){return [...document.scripts].map(s=>s.src).filter(src=>src&&!/\/(responsive-time|time-skip-worker)\.js(?:\?|$)/.test(src));}
function runResponsiveTimeSkip(unit,{testSeed}={}){
 if(timeSkipTask)return timeSkipTask.promise;
 if(!['hour','day','month'].includes(unit))return Promise.reject(Error('Unknown time skip.'));
 if(typeof Worker==='undefined')return Promise.reject(Error('Background simulation is unavailable in this browser.'));
 if(app.activeShow&&['ride','jump-off-ready'].includes(app.activeShow.stage)){saveFeedback('Finish or leave the active competition round before advancing time.',true);return Promise.resolve({ok:false,error:'An active competition round requires your decision.'});}
 const decision=typeof timeAdvanceDecision90==='function'?timeAdvanceDecision90(unit):'';if(decision){saveFeedback(decision,true);return Promise.resolve({ok:false,error:decision});}
 const dialog=document.createElement('span');dialog.className='time-skip-status';dialog.setAttribute('data-time-skip-status','');dialog.innerHTML='<span role="status" aria-live="polite">Advancing '+unit+'…</span> <button type="button" data-time-skip-cancel>Cancel</button>';(document.querySelector('.topbar .status')||document.body).appendChild(dialog);

 let worker;try{if(timeSkipIdleTimer!==null)clearTimeout(timeSkipIdleTimer);worker=timeSkipIdleWorker||new Worker(new URL('time-skip-worker.js?v=3',document.baseURI));timeSkipIdleWorker=null;timeSkipIdleTimer=null;}catch(error){dialog.remove();saveFeedback('Could not advance time: '+error.message,true);return Promise.resolve({ok:false,error:error.message});}
 let settle;const promise=new Promise(resolve=>settle=resolve),task={worker,promise,committed:false,startedAt:performance.timeOrigin+performance.now()};timeSkipTask=task;
 const status=dialog.querySelector('[role="status"]'),cancel=dialog.querySelector('button');
 const finish=result=>{if(task.done)return;task.done=true;if(result.ok){worker.onmessage=null;worker.onerror=null;timeSkipIdleWorker=worker;timeSkipIdleTimer=setTimeout(()=>{if(timeSkipIdleWorker===worker){worker.terminate();timeSkipIdleWorker=null;timeSkipIdleTimer=null;}},60000);}else worker.terminate();dialog.remove();if(timeSkipTask===task)timeSkipTask=null;settle(result);};
 const abort=()=>{if(!task.committed)finish({cancelled:true});};cancel.onclick=abort;
 const fail=message=>{if(task.done)return;finish({ok:false,error:message});saveFeedback('Time skip did not complete. Your previous game state is unchanged. '+message,true);};
 worker.onerror=event=>{event.preventDefault();fail(event.message||'Background simulation could not start.');};
 worker.onmessage=({data})=>{
  if(timeSkipTask!==task)return;
  if(data.type==='progress'){status.textContent=data.text;return;}
  if(data.type==='error'){fail(data.message);return;}
  if(data.type!=='complete')return;
  try{
   const receivedAt=performance.timeOrigin+performance.now();
   if(data.ledger)SimulationDelta.restore(data,app);
   Save3.validate(data.state);
   // Keep the active app object, replacing its state only after successful completion.
   const identity=app.saveIdentity,lastSaved=app.lastSuccessfulSave,view={uiActiveTab:app.uiActiveTab,uiDisclosures:app.uiDisclosures,uiSelections:app.uiSelections},careerView=app.career?.ui;
   for(const key of Object.keys(app))delete app[key];Object.assign(app,data.state);
   Object.assign(app,view);if(careerView&&app.career)app.career.ui=careerView;if(identity)app.saveIdentity=identity;if(lastSaved)app.lastSuccessfulSave=lastSaved;
   RECENT_HORSE_NAMES.clear();for(const name of data.recentHorseNames||[])RECENT_HORSE_NAMES.add(name);
   const fingerprints=task.meetFingerprints91;if(data.ledger&&fingerprints){for(const id of data.ledger.removed)fingerprints.delete(id);for(const [id,meet]of Object.entries(data.ledger.changed))fingerprints.set(id,JSON.stringify(meet));worker.meetCache91={meets:app.career?.meets,fingerprints};}else if(app.career?.meets)worker.meetCache91={meets:app.career.meets,fingerprints:SimulationDelta.capture(app)};else worker.meetCache91=null;
   task.committed=true;render();saveGame(false);finish({ok:true,simulationMs:data.simulationMs,timings:{ledgerInputReused:data.ledgerInputReused,engineMs:data.engineMs,outputDiffMs:data.outputDiffMs,diffMs:task.diffMs,inputMs:task.inputMs,prepareMs:data.startedAt-task.startedAt-task.inputMs-task.diffMs,returnMs:receivedAt-data.finishedAt,applyMs:performance.timeOrigin+performance.now()-receivedAt}});
  }catch(error){if(task.committed){finish({ok:true,displayError:error.message});saveFeedback('Time advanced. Refresh the view and retry saving: '+error.message,true);}else fail(error.message);}
 };
 try{const diffStart=performance.now(),cache=worker.meetCache91;let packet={state:app,ledger:null};if(cache&&cache.meets===app.career?.meets){const next=new Map();packet=SimulationDelta.create(app,cache.fingerprints,next);task.meetFingerprints91=next;}else task.meetFingerprints91=SimulationDelta.capture(app);task.diffMs=performance.now()-diffStart;const inputStart=performance.now();worker.postMessage({unit,...packet,ledgerInput91:!!packet.ledger,recentHorseNames:[...RECENT_HORSE_NAMES],scripts:timeSkipScripts(),...(testSeed!==undefined?{testSeed}:{})});task.inputMs=performance.now()-inputStart;}catch(error){fail(error.message);}
 return promise;
}
for(const [id,unit]of [['skipHourBtn','hour'],['skipDayBtn','day'],['skipMonthBtn','month']]){const button=document.getElementById(id);if(button)button.onclick=()=>runResponsiveTimeSkip(unit).catch(error=>saveFeedback(error.message,true));}

// Load the simulation engine while the page is idle, rather than on the first click.
function prepareTimeSkipWorker(){
 if(timeSkipTask||timeSkipIdleWorker||typeof Worker==='undefined'||Save3.supported&&!Save3.ready)return;
 let worker;try{worker=new Worker(new URL('time-skip-worker.js?v=3',document.baseURI));}catch(error){return;}
 timeSkipIdleWorker=worker;
 const discard=()=>{worker.terminate();if(timeSkipIdleWorker===worker){timeSkipIdleWorker=null;if(timeSkipIdleTimer!==null)clearTimeout(timeSkipIdleTimer);timeSkipIdleTimer=null;}};
 worker.onerror=event=>{event.preventDefault();discard();};worker.onmessage=({data})=>{if(data.type==='error')discard();else if(data.type==='ready'){worker.onmessage=null;worker.onerror=null;}};
 timeSkipIdleTimer=setTimeout(discard,60000);
 try{worker.postMessage({type:'warmup',scripts:timeSkipScripts()});}catch(error){discard();}
}
window.addEventListener('load',()=>{const ready=()=>{if(Save3.supported&&!Save3.ready){setTimeout(ready,100);return;}if(typeof requestIdleCallback==='function')requestIdleCallback(prepareTimeSkipWorker,{timeout:1000});else setTimeout(prepareTimeSkipWorker,0);};ready();});
for(const id of ['skipHourBtn','skipDayBtn','skipMonthBtn']){const button=document.getElementById(id);if(button){button.addEventListener('pointerenter',prepareTimeSkipWorker);button.addEventListener('focus',prepareTimeSkipWorker);}}

// Read-only navigation remains available during the atomic advance; gameplay choices wait.
function timeAdvanceInputGuard(event){if(!timeSkipTask)return;const target=event.target;if(target?.closest?.('[data-time-skip-cancel],[data-tab],summary,#toggleTabsBtn,#saveGameBtn,[data-save3="export"],[data-save3="copy"]'))return;if(event.type==='keydown'&&['Tab','Escape'].includes(event.key))return;if(target?.closest?.('button,input,select,textarea,#moneyLabel')){event.preventDefault();event.stopImmediatePropagation();}}
for(const event of ['click','pointerdown','keydown','input','change'])document.addEventListener(event,timeAdvanceInputGuard,true);
