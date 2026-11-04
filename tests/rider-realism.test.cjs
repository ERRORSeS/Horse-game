const {check}=require('./behavior5-harness.cjs');
check('disabled rider realism preserves original probability calculations and core horse data',`{
 resetGame();const h=app.horses[0],stats=JSON.stringify(h.stats),potential=JSON.stringify(h.potential),bond=h.bond,qol=h.qol;
 const s=t2newSession(h,{discipline:'flatwork',exerciseId:'large-circle'}),base=RR_PROBABILITY(h,'technical',10,{},'Balance','Focus',s),off=t2probability(h,'technical',10,{},'Balance','Focus',s);if(JSON.stringify(base)!==JSON.stringify(off))throw Error('disabled probability changed');
 if(tbRecord(h,s,'exercise','flatwork',true)!==null)throw Error('disabled learned');
 if(JSON.stringify(h.stats)!==stats||JSON.stringify(h.potential)!==potential||h.bond!==bond||h.qol!==qol)throw Error('core state');
 if(showRidingStyle(null)!=='Balanced')throw Error('safe style');
}`);
check('the exact 140 supplied narratives enforce actual rider trainer action outcome and change evidence',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});const event=tbRecord(h,s,'exercise','jumping',true);
 if(TB5_NARRATIVES.length!==140||new Set(TB5_NARRATIVES.map(r=>r.id)).size!==140)throw Error('quote catalog');
 for(const rule of TB5_NARRATIVES){if(!rule.requiredConditions.length||!rule.trigger)throw Error('missing eligibility');}
 rrSettings().level='Professional';const expert=TB5_NARRATIVES.find(r=>r.id==='TB5-25-08'),beginner=TB5_NARRATIVES.find(r=>r.id==='TB5-21-07');
 const actual={...event,riderLevel:'Professional',trainerId:tbTrainer(s).id,trainerType:tbTrainer(s).type};if(!tbNarrativeEligible(expert,h,s,actual)||tbNarrativeEligible(beginner,h,s,actual))throw Error('rider mismatch');
 const abusive=TB5_NARRATIVES.find(r=>r.id==='TB5-28-02');if(tbNarrativeEligible(abusive,h,s,{...actual,failed:true,flags:{failed:true}}))throw Error('kind trainer described as abusive');
 const simplify=TB5_NARRATIVES.find(r=>r.id==='TB5-25-10');if(tbNarrativeEligible(simplify,h,s,actual))throw Error('unselected player decision');
 const progress=TB5_NARRATIVES.find(r=>r.id==='TB5-29-12');if(tbNarrativeEligible(progress,h,s,actual))throw Error('fake multiple sessions');
 const fakeHorse={...actual,horseId:'another-horse'};if(tbNarrativeEligible(expert,h,s,fakeHorse))throw Error('wrong horse');
}`);
check('changing instructor saves distinct identities and never transfers the old trainer conduct to the new one',`{
 resetGame();rrSettings().enabled=true;rrSettings().difficultStories=true;rrSettings().trainer='Abusive';const h=app.horses[0],s=t2newSession(h,{exerciseId:'crossrail',discipline:'jumping'}),old=tbTrainer(s);
 s.phase='main';s.attempts=1;s.lastResult=5;s.log.push({exerciseId:'crossrail',resultIndex:5});const prior=tbRecord(h,s,'refusal','jumping',false);
 rrChangeTrainer(h,s,'Patient');const current=tbTrainer(s);if(current.id===old.id||prior.trainerId!==old.id||prior.trainerType!=='Abusive'||current.type!=='Patient')throw Error('identity');
 s.attempts=2;const next=tbRecord(h,s,'refusal','jumping',false);
 for(const rule of TB5_NARRATIVES.filter(r=>r.allowedTrainerTypes?.includes('Abusive')))if(tbNarrativeEligible(rule,h,s,next))throw Error('former abusive trainer leaked');
 const id=current.id,saved=JSON.parse(serializeAppState());delete app.behaviorTrainers;delete app.behaviorTrainerSequence;hydrateFromSave(saved);if(rrSettings().trainerId!==id||app.behaviorTrainers[old.id].type!=='Abusive')throw Error('trainer persistence');
}`);
check('narration resolves after events and never mutates gameplay or rerolls on inspection',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{exerciseId:'crossrail',discipline:'jumping'});s.phase='main';s.attempts=1;s.lastResult=5;s.log.push({exerciseId:'crossrail',resultIndex:5});const event=tbRecord(h,s,'refusal','jumping',false),before=JSON.stringify(rrHorse(h).learned),n=s.log.length;
 tbNarrate(h,s,event);tbNarrativeFacts(h,s,event);if(JSON.stringify(rrHorse(h).learned)!==before||s.log.length!==n)throw Error('narration mutated or replayed');
 if(event.observation.includes('decides to simplify')||/unfamiliar.*(?:stop|refus)/i.test(event.observation))throw Error('fictional decision/cause');
}`);
check('each supplied narrative predicate is enforced rather than stored as decorative metadata',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});
 for(const rule of TB5_NARRATIVES){
  rrSettings().level=rule.allowedRiderLevels?.[0]||'Intermediate';rrSettings().trainer=rule.allowedTrainerTypes?.[0]||'Fair';const trainer=tbTrainer(s),event={horseId:h.id,riderId:rrSettings().riderId,riderLevel:rrSettings().level,trainerId:trainer.id,trainerType:trainer.type,type:rule.allowedEventTypes?.[0]||'attempt',changes:rule.requiredStatDirection?{[rule.requiredStatDirection.stat]:{before:60,after:rule.requiredStatDirection.direction==='increase'?61:59,delta:rule.requiredStatDirection.direction==='increase'?1:-1}}:{}};
  const facts=Object.fromEntries(rule.requiredConditions.map(condition=>[condition,true]));if(!tbNarrativeEligible(rule,h,s,event,facts))throw Error('unreachable rule '+rule.id);
  for(const condition of rule.requiredConditions){facts[condition]=false;if(tbNarrativeEligible(rule,h,s,event,facts))throw Error('ignored '+rule.id+' '+condition);facts[condition]=true;}
  if(tbNarrativeEligible(rule,h,s,{...event,riderId:'wrong-rider'},facts)||tbNarrativeEligible(rule,h,s,{...event,trainerId:'wrong-trainer'},facts))throw Error('actor mismatch '+rule.id);
 }
}`);
check('quote placeholders use the quoted statistic when confidence and avoidance change together',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});const event=tbRecord(h,s,'exercise','jumping',true),catalog=TB5_NARRATIVES.splice(0);
 try{TB5_NARRATIVES.push(catalog.find(r=>r.id==='TB5-29-09'));event.narrated=false;event.changes={'Jump Confidence':{before:40,after:43,delta:3},'Learned Fence Avoidance':{before:80,after:79,delta:-1}};const text=tbNarrate(h,s,event);if(!text.includes('40 to 43')||text.includes('80 to 79'))throw Error('wrong statistic placeholders');}finally{TB5_NARRATIVES.splice(0,TB5_NARRATIVES.length,...catalog);}
}`);
