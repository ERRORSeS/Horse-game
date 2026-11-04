const {check}=require('./behavior5-harness.cjs');
check('reassessment investigation breaks and reorganization share live state and a four-point cap',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'}),b=rrHorse(h).learned;s.phase='main';b['Learned Fence Avoidance']=65;
 let recovered=0,previous=b['Learned Fence Avoidance'];
 for(let n=1;n<=20;n++){s.attempts=n;s.lastResult=5;s.log.push({exerciseId:'crossrail',resultIndex:5});tbRecord(h,s,'refusal','jumping',false);previous=b['Learned Fence Avoidance'];s.tension=60;
  const event=tbRecovery(h,s,n%3===0?'investigate':n%3===1?'break':'reorganize');const delta=previous-b['Learned Fence Avoidance'];recovered+=delta;if(delta<0||delta>2)throw Error('recovery amount');
  if(event.changes['Learned Fence Avoidance']?.before!==undefined&&event.changes['Learned Fence Avoidance'].before!==previous)throw Error('stale baseline');
 }
 if(recovered!==4||s.behavior5.learningCaps.nonJumpingAvoidanceReduction!==4)throw Error('shared cap');
 s.tension=60;const before=b['Learned Fence Avoidance'],t=s.tension;tbRecovery(h,s,'break');if(b['Learned Fence Avoidance']!==before||s.tension>=t)throw Error('cap should still allow temporary recovery');
}`);
check('weighted recovery tables include genuine no-improvement outcomes and never fabricate a clean jump',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],original=tbRandom;
 try{for(const [action,roll,expected]of [['assess',.1,2],['assess',.6,1],['assess',.9,0],['investigate',.1,2],['investigate',.6,1],['investigate',.9,0],['break',.1,2],['break',.5,1],['break',.9,0],['reorganize',.1,2],['reorganize',.6,1],['reorganize',.9,0]]){
  const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=5;s.tension=50;s.log.push({exerciseId:'crossrail',resultIndex:5});tbRecord(h,s,'refusal','jumping',false);const b=rrHorse(h).learned;b['Learned Fence Avoidance']=80;
  tbRandom=()=>roll;const event=tbRecovery(h,s,action);if(80-b['Learned Fence Avoidance']!==expected)throw Error(action+' '+roll);if(s.lastResult!==5||s.behavior5.positiveJumps)throw Error('invented clean jump');
 }}finally{tbRandom=original;}
}`);
check('known medical restrictions prevent permanent recovery and qualifying session bonuses',`{
 resetGame();rrSettings().enabled=true;rrSettings().level='Professional';const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});tbRecord(h,s,'exercise','jumping',true);
 const original=tbMedical;try{tbMedical=()=>true;const b=rrHorse(h).learned,before=b['Learned Fence Avoidance'],trust=b['Rider Trust in Aids'];s.lastResult=5;s.attempts++;s.log.push({exerciseId:'crossrail',resultIndex:5});tbRecord(h,s,'refusal','jumping',false);const after=b['Learned Fence Avoidance'];s.tension=50;tbRecovery(h,s,'assess');if(b['Learned Fence Avoidance']!==after)throw Error('medical recovery');s.finished=true;tbFinish(h,s);if(b['Rider Trust in Aids']!==trust||b['Learned Fence Avoidance']!==after)throw Error('medical session bonus');}finally{tbMedical=original;}
}`);
check('idle time never regenerates learned state and saved decimals and events remain authoritative',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0];app.horses=[h];h.autoTraining='None';t2horse(h).scheduleEnabled=false;
 const b=rrHorse(h),s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});b.learned['Learned Fence Avoidance']=60.5;
 const before=JSON.stringify(b.learned);advanceOneHour();advanceOneDay();if(JSON.stringify(b.learned)!==before)throw Error('idle learning');
 s.phase='main';s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});const e=tbRecord(h,s,'exercise','jumping',true),values=JSON.stringify(b.learned),copy=JSON.parse(JSON.stringify(s));hydrateFromSave(JSON.parse(serializeAppState()));
 tbRecord(app.horses[0],copy,'exercise','jumping',true);if(JSON.stringify(rrHorse(app.horses[0]).learned)!==values)throw Error('saved event repeated');
}`);
check('a recovery milestone requires three real positive sessions since the setback and cannot repeat',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0];rrHorse(h).learned['Jump Confidence']=20;
 const make=(n,index)=>{const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail',hour:n*24});s.phase='main';s.elapsed=4;s.attempts=1;s.lastResult=index;s.rrCurrentError=index===5;s.log.push({exerciseId:'crossrail',resultIndex:index});tbRecord(h,s,index===5?'refusal':'exercise','jumping',index===0);return s;};
 t2finish(h,make(0,5));
 for(let n=1;n<=3;n++){const s=make(n,0),before=rrHorse(h).learned['Jump Confidence'];t2finish(h,s);const gained=rrHorse(h).learned['Jump Confidence']-before;if(gained!==(n===3?3:0))throw Error('milestone evidence '+n);const snapshot=JSON.stringify(rrHorse(h).learned);t2finish(h,s);if(JSON.stringify(rrHorse(h).learned)!==snapshot)throw Error('milestone replay');}
}`);
