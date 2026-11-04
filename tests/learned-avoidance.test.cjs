const fs=require('node:fs'),vm=require('node:vm');const setup=fs.readFileSync(__dirname+'/competition-completion.test.cjs','utf8').split("check('trait fixture'")[0];const {check}=vm.runInNewContext('(function(require,__dirname){'+setup+'return {check};})(require,__dirname)',{require,__dirname,console},{filename:__filename});
check('all band boundaries keep per-jump rates within the requested ranges for every rider and fence',`{resetGame();rrSettings().enabled=true;const h=app.horses[0],b=rrHorse(h);for(const [low,high,min,max]of [[0,10,15,25],[11,30,30,40],[31,50,45,55],[51,75,65,75],[76,100,85,90]])for(const score of [low,high])for(const level of ['Beginner','Novice','Intermediate','Advanced','Professional']){rrSettings().level=level;b.learned['Learned Fence Avoidance']=score;let prior;for(const exerciseId of ['crossrail','vertical','oxer','water']){const p=fenceAvoidanceProfile(h,{exerciseId,setup:{height:.7}}),exception=low===51&&level==='Professional';if(p.chance<(exception?15:min)||p.chance>(exception?25:max))throw Error(JSON.stringify(p));if(prior!==undefined&&p.chance!==prior)throw Error('fence changed rate');prior=p.chance;}}}`);
check('height above rider experience increases risk but changing venue or fence memories does not evade avoidance',`{resetGame();rrSettings().enabled=true;const h=app.horses[0],b=rrHorse(h),s={discipline:'jumping',exerciseId:'crossrail',setup:{height:.7},facilityId:'home'};b.learned['Learned Fence Avoidance']=40;const at=fenceAvoidanceProfile(h,s).chance;s.setup.height=1.8;if(fenceAvoidanceProfile(h,s).chance<=at)throw Error('over level');b.memories=[{context:rrContextKey(s),avoidance:30}];const matching=fenceAvoidanceProfile(h,s).chance;s.facilityId='new';s.exerciseId='oxer';if(fenceAvoidanceProfile(h,s).chance!==matching)throw Error('context evasion');rrSettings().level='Advanced';s.setup.height=.7;if(fenceAvoidanceProfile(h,s).chance>=at||fenceAvoidanceProfile(h,s).chance<45)throw Error('advanced band');}`);
check('suitable success recovers across contexts; overfaced or distressed work does not earn recovery',`{resetGame();rrSettings().enabled=true;const h=app.horses[0],b=rbState(h);b.learned['Learned Fence Avoidance']=50;let n=0;const attempt=(extra={})=>{const s={id:'recover'+n++,discipline:'jumping',exerciseId:'crossrail',setup:{height:.7},attempts:1,lastResult:0,...extra};return rrRecord(h,s,'exercise','jumping',true);};attempt({setup:{height:1.8}});attempt({tension:70});if(b.learned['Learned Fence Avoidance']!==50)throw Error('unsuitable recovered');attempt();if(b.learned['Learned Fence Avoidance']>=50)throw Error('no cross-context recovery');const before=b.learned['Learned Fence Avoidance'];attempt({automatic:true});if(b.learned['Learned Fence Avoidance']!==before)throw Error('automatic learned');}`);
check('resolved negative jumping experiences and neglect increase avoidance once',`{resetGame();rrSettings().enabled=true;const h=app.horses[0],b=rbState(h);for(const kind of ['refusal','runout','spook','tension','overreaction','frustration']){b.behaviorDaily={};const s={id:kind,discipline:'jumping',exerciseId:'crossrail',attempts:1,lastResult:2},before=b.learned['Learned Fence Avoidance'];rrRecord(h,s,kind,'jumping',false);if(b.learned['Learned Fence Avoidance']<=before)throw Error(kind);const after=b.learned['Learned Fence Avoidance'];rrRecord(h,s,kind,'jumping',false);if(b.learned['Learned Fence Avoidance']!==after)throw Error('duplicate');}const s={id:'neglect',exerciseId:'crossrail',discipline:'jumping',rrConcern:{kind:'refusal'},log:[]},before=b.learned['Learned Fence Avoidance'];rrFollowup(h,s,'continue');if(b.learned['Learned Fence Avoidance']<=before)throw Error('neglect');}`);
check('harsh tack with novice riders reinforces avoidance even on a completed jump',`{resetGame();rrSettings().enabled=true;rrSettings().level='Novice';app.settings.tackOwnership=false;const h=app.horses[0],b=rbState(h);h.tack={...h.tack,bit:'Pelham Bit'};const s={id:'harsh',discipline:'jumping',exerciseId:'crossrail',setup:{height:.7},attempts:1,lastResult:0};if(!fenceAvoidanceLearning(h,s).harsh)throw Error('harsh gear not detected');const before=b.learned['Learned Fence Avoidance'];rrRecord(h,s,'exercise','jumping',true);if(b.learned['Learned Fence Avoidance']<=before)throw Error('harsh tack recovered');}`);
check('actual training jump attempts use the absolute rate before interruptions and do not add another refusal roll',`{resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;const h=app.horses[0];h.age=10;h.behavior=800;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.unridable=false;h.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};for(const g of Object.values(h.stats))for(const k of Object.keys(g))g[k]=100;const original=t2random;try{for(const [score,roll,refused]of [[5,.1,true],[5,.4,false],[90,.84,true],[90,.95,false]]){rrHorse(h).learned['Learned Fence Avoidance']=score;h.fatigue=0;const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail',setup:{height:.5}});s.phase='main';s.warmup=15;s.weather={type:'Clear',temperature:20,wind:0};t2random=()=>roll;const r=t2attempt(h,s);if(r.blocked||r.resultIndex==null)throw Error('attempt blocked '+JSON.stringify(r));if((r.resultIndex===5)!==refused)throw Error('wrong refusal '+JSON.stringify(r));const p=r.probabilities.resistance;if(p.chance!==p.learnedAvoidance.chance)throw Error('display differs from actual');}}finally{t2random=original;}}`);
check('show choices expose the exact bands and stale concerns never block a show refusal or the next choice',`{resetGame();rrSettings().enabled=true;const h=app.horses[0],s=buildCompetitionRpgSession(h,'jumping','0.70');rrHorse(h).learned['Learned Fence Avoidance']=90;s.stepIndex=s.steps.findIndex(x=>x.stage==='main_round');const step=s.steps[s.stepIndex],options=competitionPromptForStep(s).options;for(const row of competitionOptionFinalChances(s,h,step,options)){if(row.computed.failChance<85||row.computed.failChance>90||Math.abs(row.successChance+row.computed.neutralChance+row.computed.failChance-100)>1e-8)throw Error('show bands');}const random=Math.random;s.rrConcern={kind:'refusal'};Math.random=()=>.5;try{resolveCompetitionRpgChoice(s,h,0);}finally{Math.random=random;}if(s.roundStats.refusals!==1||s.rrConcern)throw Error('show concern interrupted or persisted');const box=rrConcernControls(h,{discipline:'jumping',exerciseId:'crossrail',rrConcern:{kind:'refusal'}});if(!box.innerHTML.includes('Behavioral concern'))throw Error('training control removed');}`);
check('automatic round plans apply learned avoidance per fence and preserve legacy behavior when disabled',`{resetGame();rrSettings().enabled=true;const h=app.horses[0];rrHorse(h).learned['Learned Fence Avoidance']=90;let refused=0,total=0;for(let i=0;i<100;i++){const p=ShowjumpingRound.plan(h,'0.70','learned-'+i,12);refused+=p.refusalIndices.length;total+=12;}const rate=refused/total;if(rate<.82||rate>.93)throw Error('round plans not per jump '+rate);rrSettings().enabled=false;for(let i=0;i<20;i++)if(ShowjumpingRound.plan(h,'0.70','legacy-'+i,12).refusalIndices.length>1)throw Error('disabled behavior changed');}`);
check('show advancement clears saved concerns and advances normally',`{resetGame();rrSettings().enabled=true;const h=app.horses[0],s=buildCompetitionRpgSession(h,'jumping','0.70');s.stepIndex=s.steps.findIndex(x=>x.stage==='main_round');s.awaitingAdvance=true;s.rrConcern={kind:'refusal'};const prior=s.stepIndex;showAdvanceRpg(s);if(s.stepIndex!==prior+1||s.awaitingAdvance||s.rrConcern)throw Error('show advancement blocked');}`);
check('reassessing or investigating each real refusal reduces avoidance once by one or two', `{
 for(const action of ['assess','investigate']){
  resetGame();rrSettings().enabled=true;
  const h=app.horses[0],b=rbState(h);b.learned['Learned Fence Avoidance']=50;
  const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});
  s.phase='main';s.attempts=1;s.lastResult=5;s.rrConcern={kind:'refusal'};
  if(!rrFollowup(h,s,action))throw Error('action failed');
  const loss=50-b.learned['Learned Fence Avoidance'];
  if(loss<1||loss>2)throw Error('reassessment loss '+loss);
  s.rrConcern={kind:'refusal'};rrFollowup(h,s,action==='assess'?'investigate':'assess');
  if(b.learned['Learned Fence Avoidance']!==50-loss)throw Error('same refusal rewarded twice');
  const stored=JSON.parse(JSON.stringify(s));delete stored.faRecoveries;
  hydrateFromSave(JSON.parse(serializeAppState()));stored.rrConcern={kind:'refusal'};
  rrFollowup(app.horses[0],stored,action);
  if(rrHorse(app.horses[0]).learned['Learned Fence Avoidance']!==50-loss)throw Error('save replay rewarded');
 }
}`);
check('walk breaks and circling away recover only after a jump and actual tension reduction', `{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],b=rbState(h);
 b.learned['Learned Fence Avoidance']=50;
 const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.tension=30;
 if(t2break(h,s)<=0)throw Error('fixture did not relax');
 const loss=50-b.learned['Learned Fence Avoidance'];if(loss<1||loss>2)throw Error('break loss');
 s.tension=30;t2break(h,s);if(b.learned['Learned Fence Avoidance']!==50-loss)throw Error('repeated break rewarded');
 const before=b.learned['Learned Fence Avoidance'];s.attempts++;s.tension=0;t2break(h,s);
 if(b.learned['Learned Fence Avoidance']!==before)throw Error('no tension recovered avoidance');
 const flat=t2newSession(h,{discipline:'flatwork',exerciseId:'large-circle'});flat.phase='main';flat.attempts=1;flat.tension=30;t2break(h,flat);
 if(b.learned['Learned Fence Avoidance']!==before)throw Error('flatwork granted jump recovery');
 s.attempts++;s.elapsed+=12;s.tension=30;t2break(h,s);
 if(b.learned['Learned Fence Avoidance']>=before)throw Error('circle-away did not recover');
 const after=b.learned['Learned Fence Avoidance'];s.finished=true;s.tension=30;t2break(h,s);
 if(b.learned['Learned Fence Avoidance']!==after)throw Error('finished work recovered');
}`);
check('experienced riders earn exactly half a point per completed jumping session and preserve fractions', `{
 for(const level of ['Advanced','Professional','Intermediate']){
  resetGame();rrSettings().enabled=true;rrSettings().level=level;
  const h=app.horses[0],b=rbState(h);b.learned['Learned Fence Avoidance']=50;
  const make=(exerciseId='crossrail')=>{const s=t2newSession(h,{discipline:'jumping',exerciseId});s.phase='main';s.attempts=1;s.elapsed=4;s.lastResult=5;s.log.push({exerciseId,resultIndex:5,result:'Refusal',text:'Actual attempt'});return s;};
  const s=make();t2finish(h,s);const expected=level==='Intermediate'?50:49.5;
  if(b.learned['Learned Fence Avoidance']!==expected)throw Error('session amount '+level);
  t2finish(h,s);if(b.learned['Learned Fence Avoidance']!==expected)throw Error('finish replay');
  const empty=make();empty.attempts=0;empty.log=[];t2finish(h,empty);
  const flat=make('large-circle');t2finish(h,flat);
  const automatic=make();automatic.automatic=true;t2finish(h,automatic);
  if(b.learned['Learned Fence Avoidance']!==expected)throw Error('unqualified session earned recovery');
  hydrateFromSave(JSON.parse(serializeAppState()));
  if(rrHorse(app.horses[0]).learned['Learned Fence Avoidance']!==expected)throw Error('fraction lost');
 }
}`);
check('clean jumps earn two to four confidence plus one for safe aids with exact stability boundaries', `{
 for(const [leg,spurs,hand,pelham,neglect,error,bonus]of [[19,false,60,false,false,false,true],[19,true,60,false,false,false,false],[20,true,60,false,false,false,true],[60,false,19,true,false,false,false],[60,false,19,false,false,false,true],[60,false,20,true,false,false,true],[60,false,60,false,true,false,false],[60,false,60,false,false,true,false]]){
  resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;const r=rrSettings();r.abilities['Leg Stability']=leg;r.abilities['Hand Stability']=hand;
  const h=app.horses[0],b=rbState(h);h.tack={...h.tack,bit:pelham?'Pelham Bit':'Loose Ring Snaffle'};
  const s={id:'clean-aids',discipline:'jumping',exerciseId:'crossrail',setup:{height:.7},attempts:1,lastResult:0,intensity:2,riderAid:spurs?'Spurs':'None',rrCurrentError:error,rbJumpingNeglect:neglect?{}:null};
  const base=2+Math.floor(HorseHealth.roll(HorseHealth.hash(rrSessionId(s)+'|experience|1|exercise'),'clean-jump-confidence')*3),before=b.learned['Jump Confidence'];
  rrRecord(h,s,'exercise','jumping',true);
  if(b.learned['Jump Confidence']-before!==base+(bonus?1:0))throw Error('confidence mismatch '+JSON.stringify([leg,spurs,hand,pelham,neglect,error]));
  const after=b.learned['Jump Confidence'];rrRecord(h,s,'exercise','jumping',true);
  if(b.learned['Jump Confidence']!==after)throw Error('clean effort rewarded twice');
 }
}`);
