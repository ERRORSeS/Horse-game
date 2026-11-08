const {check}=require('./behavior5-harness.cjs');
check('exact baseline interpolation includes the zero-to-two override and fractional boundaries',`{
 for(const [score,chance]of [[0,4],[1,4],[2,4],[3,5],[5,5+4/7],[8,5+10/7],[10,7],[10.5,8],[11,8],[20,11],[30,15],[30.5,16],[31,16],[40,20],[50,26],[50.5,27],[51,27],[60,34],[75,50],[75.5,51],[76,51],[85,67+28/9],[100,98]])if(Math.abs(getBaseAvoidanceRisk(score)-chance)>1e-8)throw Error(score);
 for(let score=0;score<=100;score+=.5)if(!Number.isFinite(getBaseAvoidanceRisk(score)))throw Error('fraction');
 if(getBaseAvoidanceRisk(-5)!==4||getBaseAvoidanceRisk(120)!==98)throw Error('clamp');
}`);
check('combined modifiers use the current rider, exact height tiers, live confidence, trust and tension',`{
 resetGame();t2horse(app.horses[0]).traits=[];t2horse(app.horses[0]).attributes['Fence Resilience']=5;rrSettings().enabled=true;const h=app.horses[0],b=rrHorse(h).learned,s={discipline:'jumping',setup:{height:.7},tension:50};
 b['Learned Fence Avoidance']=60;b['Jump Confidence']=70;b['Rider Trust in Aids']=70;
 for(const [level,modifier]of [['Beginner',4],['Novice',2],['Intermediate',0],['Advanced',-2],['Professional',-4]]){rrSettings().level=level;const p=fenceAvoidanceProfile(h,s);if(p.chance!==34+modifier)throw Error('rider '+level);}
 rrSettings().level='Intermediate';for(const [height,extra]of [[.7,0],[.8,2],[.9,4],[1,6],[1.1,6],[1.8,6]]){s.setup.height=height;if(fenceAvoidanceProfile(h,s).parts.height!==extra)throw Error('height '+height);}
 s.setup.height=.7;b['Jump Confidence']=10;b['Rider Trust in Aids']=10;s.tension=90;if(fenceAvoidanceProfile(h,s).chance!==46)throw Error('live modifiers');
 b['Learned Fence Avoidance']=100;s.setup.height=1.8;if(fenceAvoidanceProfile(h,s).chance!==99)throw Error('maximum');
 s.setup.height=.7;b['Learned Fence Avoidance']=0;b['Jump Confidence']=100;b['Rider Trust in Aids']=100;s.tension=0;rrSettings().level='Professional';if(fenceAvoidanceProfile(h,s).chance!==1)throw Error('final floor');
}`);
check('fence type, filler and venue never change the avoidance baseline or add unknown-obstacle causes',`{
 resetGame();t2horse(app.horses[0]).traits=[];t2horse(app.horses[0]).attributes['Fence Resilience']=5;rrSettings().enabled=true;const h=app.horses[0],s={discipline:'jumping',setup:{height:.7},tension:50};let chance;
 for(const exerciseId of ['crossrail','vertical','oxer','water'])for(const filler of [false,true]){s.exerciseId=exerciseId;s.setup.type=exerciseId;s.setup.filler=filler;const p=fenceAvoidanceProfile(h,s);chance??=p.chance;if(p.chance!==chance)throw Error('fence changed risk');}
 if(rrSuspectedCauses(h,s).some(c=>/unfamiliar|unknown/i.test(c)))throw Error('invented refusal cause');
}`);
check('post-jump reward is conditional for each stat, uses live values and is once per actual success',`{
 for(const [confidence,avoidance,expectedConfidence,expectedAvoidance]of [[49,80,50,79],[70,80,71,79],[49,50,50,49],[50,75,51,74],[70,30,71,29],[100,31,100,30]]){
  resetGame();t2horse(app.horses[0]).traits=[];t2horse(app.horses[0]).attributes['Fence Resilience']=5;rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});tbRecord(h,s,'exercise','jumping',true);
  const b=rrHorse(h).learned;b['Jump Confidence']=confidence;b['Learned Fence Avoidance']=avoidance;t2rewardSuccessfulAttempt(h,s);
  if(b['Jump Confidence']!==expectedConfidence||b['Learned Fence Avoidance']!==expectedAvoidance)throw Error('threshold');
  t2rewardSuccessfulAttempt(h,s);if(b['Jump Confidence']!==expectedConfidence||b['Learned Fence Avoidance']!==expectedAvoidance)throw Error('duplicate');
  const copy=JSON.parse(JSON.stringify(s));copy.rewardedAttempts=[];hydrateFromSave(JSON.parse(serializeAppState()));t2rewardSuccessfulAttempt(app.horses[0],copy);
  if(rrHorse(app.horses[0]).learned['Jump Confidence']!==expectedConfidence)throw Error('save replay');
 }
}`);
