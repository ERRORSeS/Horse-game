const {check}=require('./behavior5-harness.cjs');
check('exact baseline interpolation includes the zero-to-two override and fractional boundaries',`{
 for(const [score,chance]of [[0,4],[1,4],[2,4],[3,15],[5,15+20/7],[8,15+50/7],[10,25],[10.5,30-5/19],[11,30],[20,30+90/19],[30,40],[30.5,45-5/19],[31,45],[40,45+90/19],[50,55],[50.5,65-5/24],[51,65],[60,68.75],[75,75],[75.5,85-2.5/24],[76,85],[85,86.875],[100,90]])if(Math.abs(getBaseAvoidanceRisk(score)-chance)>1e-8)throw Error(score);
 for(let score=0;score<=100;score+=.5)if(!Number.isFinite(getBaseAvoidanceRisk(score)))throw Error('fraction');
 if(getBaseAvoidanceRisk(-5)!==4||getBaseAvoidanceRisk(120)!==90)throw Error('clamp');
}`);
check('combined modifiers use the current rider, exact height tiers, live confidence, trust and tension',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],b=rrHorse(h).learned,s={discipline:'jumping',setup:{height:.7},tension:50};
 b['Learned Fence Avoidance']=60;b['Jump Confidence']=70;b['Rider Trust in Aids']=70;
 for(const [level,modifier]of [['Beginner',8],['Novice',5],['Intermediate',2],['Advanced',-3],['Professional',-7]]){rrSettings().level=level;const p=fenceAvoidanceProfile(h,s);if(p.chance!==68.75+modifier)throw Error('rider '+level);}
 rrSettings().level='Intermediate';for(const [height,extra]of [[.7,0],[.8,3],[.9,6],[1,10],[1.1,15],[1.8,15]]){s.setup.height=height;if(fenceAvoidanceProfile(h,s).parts.height!==extra)throw Error('height '+height);}
 s.setup.height=.7;b['Jump Confidence']=10;b['Rider Trust in Aids']=10;s.tension=90;if(fenceAvoidanceProfile(h,s).chance!==90.75)throw Error('live modifiers');
 b['Learned Fence Avoidance']=100;s.setup.height=1.8;if(fenceAvoidanceProfile(h,s).chance!==95)throw Error('maximum');
 s.setup.height=.7;b['Learned Fence Avoidance']=0;b['Jump Confidence']=100;b['Rider Trust in Aids']=100;s.tension=0;rrSettings().level='Professional';if(fenceAvoidanceProfile(h,s).chance!==1)throw Error('final floor');
}`);
check('fence type, filler and venue never change the avoidance baseline or add unknown-obstacle causes',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s={discipline:'jumping',setup:{height:.7},tension:50};let chance;
 for(const exerciseId of ['crossrail','vertical','oxer','water'])for(const filler of [false,true]){s.exerciseId=exerciseId;s.setup.type=exerciseId;s.setup.filler=filler;const p=fenceAvoidanceProfile(h,s);chance??=p.chance;if(p.chance!==chance)throw Error('fence changed risk');}
 if(rrSuspectedCauses(h,s).some(c=>/unfamiliar|unknown/i.test(c)))throw Error('invented refusal cause');
}`);
check('post-jump reward is conditional for each stat, uses live values and is once per actual success',`{
 for(const [confidence,avoidance,expectedConfidence,expectedAvoidance]of [[49,80,50,79],[70,80,71,79],[49,50,50,49],[50,75,51,74],[70,30,71,30],[100,31,100,30]]){
  resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});tbRecord(h,s,'exercise','jumping',true);
  const b=rrHorse(h).learned;b['Jump Confidence']=confidence;b['Learned Fence Avoidance']=avoidance;t2rewardSuccessfulAttempt(h,s);
  if(b['Jump Confidence']!==expectedConfidence||b['Learned Fence Avoidance']!==expectedAvoidance)throw Error('threshold');
  t2rewardSuccessfulAttempt(h,s);if(b['Jump Confidence']!==expectedConfidence||b['Learned Fence Avoidance']!==expectedAvoidance)throw Error('duplicate');
  const copy=JSON.parse(JSON.stringify(s));copy.rewardedAttempts=[];hydrateFromSave(JSON.parse(serializeAppState()));t2rewardSuccessfulAttempt(app.horses[0],copy);
  if(rrHorse(app.horses[0]).learned['Jump Confidence']!==expectedConfidence)throw Error('save replay');
 }
}`);
