const {check}=require('./behavior5-harness.cjs');
const ready=`resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;const h=app.horses[0];h.age=10;h.behavior=800;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.retiredForever=false;h.retiredToBreeding=false;h.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail',location:'Indoor',length:60});s.phase='main';s.warmup=15;s.occupancy='Quiet';s.weather={type:'Clear',temperature:20,wind:0};`;
check('shows have lower rider and horse fall risks while training and incident eligibility keep their existing rates',`{
 ${ready} const show={...s,steps:[{stage:'main_round',phase:'showjumping'}],stepIndex:0,liveShowId:'actual-show'};rrSettings().abilities['Seat Stability']=60;rrSettings().abilities.Balance=60;
 if(tb51FallProfile(h,s,'refusal').chance!==15||tb51FallProfile(h,show,'refusal').chance!==5)throw Error('show separation');if(tb51HorseFallProfile(s,'landing').chance!==5||Math.abs(tb51HorseFallProfile(show,'landing').chance-5/3)>1e-9)throw Error('horse fall reduction');
 if(tb51IsShow({...s,steps:[]})||tb51FallProfile(h,{...s,steps:[]},'refusal').chance!==15)throw Error('empty synthetic steps');rrSettings().abilities['Seat Stability']=0;rrSettings().abilities.Balance=0;if(tb51FallProfile(h,show,'highRear').chance!==12)throw Error('show cap');
 if(showFallChance(12)!==4||showFallChance(6)!==2||showFallChance(100)!==12||tb51HorseFallProfile(show,'mildSpook').chance!==0)throw Error('legacy or incident bounds');
}`);
check('each legitimate refusal response and tension-lowering break removes one or two points from the same current score',`{
 ${ready} s.attempts=1;s.lastResult=5;s.tension=35;s.log.push({exerciseId:s.exerciseId,resultIndex:5});tbRecord(h,s,'refusal','jumping',false);const b=rrHorse(h).learned;b['Learned Fence Avoidance']=65;const random=tbRandom;try{
  let expected=65;for(const [action,roll,points]of [['assess',.1,2],['break',.9,1],['investigate',.9,1],['circle-away',.1,2]]){tbRandom=()=>roll;const event=tbRecovery(h,s,action);expected-=points;if(b['Learned Fence Avoidance']!==expected||event.changes['Learned Fence Avoidance'].before!==expected+points)throw Error('live recovery '+action);}
  s.tension=0;const before=b['Learned Fence Avoidance'];for(let n=0;n<5;n++)tbRecovery(h,s,'assess');if(b['Learned Fence Avoidance']!==before)throw Error('settled farming');const state=JSON.parse(JSON.stringify(s)),saved=JSON.parse(serializeAppState());hydrateFromSave(saved);const horse=app.horses[0];state.tension=20;const event=tbRecovery(horse,state,'break');if(event.changes['Learned Fence Avoidance'].before!==before||rrHorse(horse).learned['Learned Fence Avoidance']!==before-2)throw Error('saved shared state');
 }finally{tbRandom=random;}
}`);
check('expert session gains are exact once and the low-stability safe-aid bonus adds one trust point',`{
 for(const level of ['Advanced','Professional']){
  ${ready} rrSettings().level=level;rrSettings().abilities['Leg Stability']=15;rrSettings().abilities['Hand Stability']=60;s.attempts=1;s.lastResult=0;s.elapsed=3;s.log.push({exerciseId:s.exerciseId,resultIndex:0});tbRecord(h,s,'exercise','jumping',true);const b=rrHorse(h).learned,avoid=b['Learned Fence Avoidance'],trust=b['Rider Trust in Aids'];t2finish(h,s);if(b['Learned Fence Avoidance']!==avoid-.5||b['Rider Trust in Aids']!==trust+4)throw Error('expert or safe-aids bonus '+level);const values=JSON.stringify(b);t2finish(h,s);if(JSON.stringify(b)!==values)throw Error('repeated session gain');
 }
}`);
check('safe-aid compatibility needs real work and excludes low-hand Pelham and low-leg equipped spurs',`{
 for(const scenario of ['empty','good-hand','pelham','spurs']){
  ${ready} rrSettings().level='Professional';rrSettings().abilities['Hand Stability']=scenario==='spurs'?60:15;rrSettings().abilities['Leg Stability']=scenario==='spurs'?15:60;
  if(scenario==='pelham')h.tack.bit='Pelham Bit';if(scenario==='spurs'){const item=mgNewItem('Rounded Short-Neck Spurs');mgState().items.push(item);mgAssign(item,h,'spurs');if(!taEquippedAid(h,'spurs',s))throw Error('owned spurs fixture');}
  if(scenario!=='empty'){s.attempts=1;s.lastResult=0;s.elapsed=3;s.log.push({exerciseId:s.exerciseId,resultIndex:0});tbRecord(h,s,'exercise','jumping',true);}const before=rrHorse(h).learned['Rider Trust in Aids'];t2finish(h,s);const gain=rrHorse(h).learned['Rider Trust in Aids']-before;if(gain!==(scenario==='good-hand'?4:0))throw Error('aid qualification '+scenario+' '+gain);
 }
}`);
check('the session clean-jump award unlocks per-jump gains after two consecutive successes and resets after failure',`{
 ${ready} const b=rrHorse(h).learned;b['Jump Confidence']=20;const random=tbRandom;try{tbRandom=()=>.1;const expected=[2,2,-1,0,2,2];for(const [index,result]of [0,0,3,0,0,0].entries()){s.attempts=index+1;s.lastResult=result;s.rrCurrentError=false;s.log.push({exerciseId:s.exerciseId,resultIndex:result});const before=b['Jump Confidence'],e=tbRecord(h,s,'exercise','jumping',result===0);if(expected[index]===-1?b['Jump Confidence']>=before:b['Jump Confidence']-before!==expected[index])throw Error('streak '+index);if(index===2&&e.cleanJumpStreak!==0)throw Error('failure did not reset');const value=b['Jump Confidence'];tbRecord(h,s,'exercise','jumping',result===0);if(b['Jump Confidence']!==value)throw Error('attempt replay');}
 }finally{tbRandom=random;}
}`);
check('ordinary failed jumps lower confidence at every rank and punishment reverses clean rewards at every rank',`{
 for(const level of ['Beginner','Novice','Intermediate','Advanced','Professional'])for(const failure of [2,3,4,5]){
  ${ready} rrSettings().level=level;s.attempts=1;s.lastResult=failure;s.rrCurrentError=false;s.log.push({exerciseId:s.exerciseId,resultIndex:failure});const b=rrHorse(h).learned,before=b['Jump Confidence'];tbRecord(h,s,'exercise','jumping',false);if(b['Jump Confidence']>=before)throw Error('failed attempt rank '+level);
  s.attempts=2;s.lastResult=0;s.log.push({exerciseId:s.exerciseId,resultIndex:0});const beforeClean=b['Jump Confidence'];tbRecord(h,s,'exercise','jumping',true);const stale=JSON.parse(JSON.stringify(s));if(!fenceAvoidanceReward(h,s))throw Error('clean reward');tbRecord(h,s,'welfare','jumping',false);if(b['Jump Confidence']!==Math.max(0,beforeClean-2)||fenceAvoidanceReward(h,s)||fenceAvoidanceReward(h,stale))throw Error('punishment kept reward '+level);const values=JSON.stringify(b);tbRecord(h,s,'welfare','jumping',false);if(JSON.stringify(b)!==values)throw Error('duplicate punishment');t2finish(h,s);if(s.behavior5.learningCaps.sessionTrustGain)throw Error('punished session trust gain');
 }
}`);
check('successful-attempt rewards add confidence at every level, reduce avoidance only above 30 and survive reload without replay',`{
 for(const [confidence,avoidance,nextC,nextA]of [[20,30,21,30],[80,31,81,30],[99.5,30.5,100,29.5],[100,50,100,49]]){
  ${ready} s.attempts=1;s.lastResult=0;s.log.push({exerciseId:s.exerciseId,resultIndex:0});tbRecord(h,s,'exercise','jumping',true);const b=rrHorse(h).learned;b['Jump Confidence']=confidence;b['Learned Fence Avoidance']=avoidance;if(!fenceAvoidanceReward(h,s)||b['Jump Confidence']!==nextC||b['Learned Fence Avoidance']!==nextA)throw Error('reward thresholds');const copy=JSON.parse(JSON.stringify(s));hydrateFromSave(JSON.parse(serializeAppState()));fenceAvoidanceReward(app.horses[0],copy);if(rrHorse(app.horses[0]).learned['Jump Confidence']!==nextC||rrHorse(app.horses[0]).learned['Learned Fence Avoidance']!==nextA)throw Error('reward replay');
 }
}`);
check('actual show falls still eliminate once with a recorded cause and intensity',`{
 ${ready} const show=buildCompetitionRpgSession(h,'jumping','.70');show.stepIndex=show.steps.findIndex(step=>step.stage==='main_round');const chances=competitionOptionFinalChances,random=Math.random,physical=t2random;try{competitionOptionFinalChances=()=>[{index:0,successChance:0,computed:{neutralChance:0}}];Math.random=()=>0;t2random=()=>0;resolveCompetitionRpgChoice(show,h,0);if(!show.eliminated||show.roundStats.eliminationReason!=='fall'||show.incidents.length!==1||!show.feedback.includes('Fall intensity:'))throw Error('show fall record');const count=show.outcomes.length;resolveCompetitionRpgChoice(show,h,0);if(show.outcomes.length!==count||show.incidents.length!==1)throw Error('show fall replay');}finally{competitionOptionFinalChances=chances;Math.random=random;t2random=physical;}
}`);

check('Beginner and Novice recovery lowers tension and avoidance without restoring jump confidence, while clean work still earns it',`{
 for(const level of ['Beginner','Novice','Intermediate','Advanced','Professional']){
  ${ready} rrSettings().level=level;s.attempts=1;s.lastResult=5;s.tension=35;s.log.push({exerciseId:s.exerciseId,resultIndex:5});tbRecord(h,s,'refusal','jumping',false);const b=rrHorse(h).learned,confidence=b['Jump Confidence'],avoidance=b['Learned Fence Avoidance'],random=tbRandom;try{
   tbRandom=()=>.1;for(const action of ['assess','investigate','break','circle-away','reorganize'])tbRecovery(h,s,action);recordBehaviorRecovery(h,s,'give-time-test','Jump Confidence',1);
   if(s.tension>=35||b['Learned Fence Avoidance']>=avoidance)throw Error('recovery blocked other benefits '+level);if(['Beginner','Novice'].includes(level)?b['Jump Confidence']!==confidence:b['Jump Confidence']<=confidence)throw Error('passive confidence recovery '+level);
   s.attempts=2;s.lastResult=0;s.log.push({exerciseId:s.exerciseId,resultIndex:0});const before=b['Jump Confidence'];tbRecord(h,s,'exercise','jumping',true);if(b['Jump Confidence']!==before+2||!fenceAvoidanceReward(h,s)||b['Jump Confidence']!==before+3)throw Error('earned confidence blocked '+level);
  }finally{tbRandom=random;}
 }
}`);

check('a saved session retains its initial confidence award and its interrupted clean-jump streak',`{
 ${ready} const random=tbRandom;try{tbRandom=()=>.1;const b=rrHorse(h).learned;b['Jump Confidence']=20;
  for(const [index,result]of [0,3].entries()){s.attempts=index+1;s.lastResult=result;s.log.push({exerciseId:s.exerciseId,resultIndex:result});tbRecord(h,s,'exercise','jumping',result===0);}
  const savedSession=JSON.parse(JSON.stringify(s));hydrateFromSave(JSON.parse(serializeAppState()));const horse=app.horses[0],before=rrHorse(horse).learned['Jump Confidence'];
  savedSession.attempts=3;savedSession.lastResult=0;savedSession.log.push({exerciseId:savedSession.exerciseId,resultIndex:0});tbRecord(horse,savedSession,'exercise','jumping',true);if(rrHorse(horse).learned['Jump Confidence']!==before)throw Error('initial award repeated after reload');
  savedSession.attempts=4;savedSession.log.push({exerciseId:savedSession.exerciseId,resultIndex:0});tbRecord(horse,savedSession,'exercise','jumping',true);if(rrHorse(horse).learned['Jump Confidence']!==before+2)throw Error('second consecutive clean did not earn confidence after reload');
 }finally{tbRandom=random;}
}`);
