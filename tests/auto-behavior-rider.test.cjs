const {check}=require('./behavior5-harness.cjs');
check('interactive quick and automatic training learn only from real resolved work and preserve Bond QOL genetics',`{
 for(const mode of ['interactive','quick','automatic']){
  resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;const h=app.horses[0];h.age=10;h.behavior=700;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];
  const bond=h.bond,qol=h.qol,potential=JSON.stringify(h.potential),s=t2newSession(h,{discipline:'flatwork',exerciseId:'large-circle',location:'Indoor',length:60});s.location='Indoor';s.warmup=10;s.phase='main';s.quick=mode==='quick';s.automatic=mode==='automatic';
  const result=t2attempt(h,s);if(result.blocked||result.resultIndex==null)throw Error('actual attempt lost '+mode);
  if(!s.behavior5.events.some(e=>e.type==='attempt')||s.behavior5.completedAttemptIds.length!==1)throw Error('resolved work not recorded '+mode);
  const report=t2finish(h,s);if(!report.behavior||!report.exercises.length)throw Error('report');
  if(h.bond!==bond||h.qol!==qol||JSON.stringify(h.potential)!==potential)throw Error('protected core state');
 }
}`);
check('experienced rider bonuses require positive jumping and clear mounted communication and never duplicate',`{
 for(const scenario of ['positive','failed','empty','serious','changed-rider']){
  resetGame();rrSettings().enabled=true;rrSettings().level='Professional';const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.elapsed=4;
  if(scenario!=='empty'){s.attempts=1;s.lastResult=scenario==='failed'?5:0;s.log.push({exerciseId:'crossrail',resultIndex:s.lastResult});tbRecord(h,s,s.lastResult===5?'refusal':'exercise','jumping',s.lastResult===0);}
  if(scenario==='serious')s.recoveryRequired=true;if(scenario==='changed-rider')rrSettings().riderId='different-rider';
  const b=rrHorse(h).learned,avoidance=b['Learned Fence Avoidance'],trust=b['Rider Trust in Aids'];t2finish(h,s);
  if(scenario==='positive'){if(b['Learned Fence Avoidance']!==Math.max(0,avoidance-.5)||b['Rider Trust in Aids']!==trust+3)throw Error('qualified bonus');}
  else if(b['Learned Fence Avoidance']!==avoidance||b['Rider Trust in Aids']!==trust)throw Error('unearned bonus '+scenario);
  const snapshot=JSON.stringify(b);t2finish(h,s);if(JSON.stringify(b)!==snapshot)throw Error('duplicate finish');
 }
}`);
check('suitable aids for low stability add one trust point after actual consistent work',`{
 for(const work of [false,true]){
  resetGame();rrSettings().enabled=true;rrSettings().abilities['Hand Stability']=15;rrSettings().abilities['Leg Stability']=15;const h=app.horses[0];app.settings.tackOwnership=false;h.tack.bit='Loose Ring Snaffle';
  const s=t2newSession(h,{discipline:'flatwork',exerciseId:'large-circle'});s.phase='main';s.elapsed=4;
  if(work){s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'large-circle',resultIndex:0});tbRecord(h,s,'exercise','flatwork',true);}
  const before=rrHorse(h).learned['Rider Trust in Aids'];t2finish(h,s);if(work?(rrHorse(h).learned['Rider Trust in Aids']<before+1.5||rrHorse(h).learned['Rider Trust in Aids']>before+1.75):rrHorse(h).learned['Rider Trust in Aids']!==before)throw Error('compatibility evidence');
 }
}`);
