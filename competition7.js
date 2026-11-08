/* Interactive Competition 7. Existing controls and official show lifecycle are reused. */
function c7Quick(s){return !!app.activeShow?.quickRunning||s?.competitionMode==='quick';}
function c7State(s){s.warmupState ||= {tension:50,focus:50,confidence:50,energy:50,timing:50};for(const key of ['tension','focus','confidence','energy','timing'])s.warmupState[key]=clamp(Number.isFinite(s.warmupState[key])?s.warmupState[key]:50,0,100);return s.interactive7 ||= {version:7,readiness:50,ledger:{},representations:{},repetitions:{},readinessHistory:[],started:false};}
function c7Readiness(s,delta,reason){const v=c7State(s),before=v.readiness;v.readiness=clamp(before+delta,0,100);if(v.readiness!==before)v.readinessHistory.push({step:s.stepIndex,before,after:v.readiness,reason});v.readinessHistory=v.readinessHistory.slice(-50);return v.readiness;}
function c7Tier(value,values){return values[value<25?0:value<45?1:value<65?2:value<85?3:4];}
function c7Phase(s,step){return s.jumpOff?'jump-off':s.discipline==='eventing'?showPhaseName(step):s.discipline==='jumping'?'showjumping':s.discipline;}
function c7Random(seed,key){let n=HorseHealth.hash(seed+'|'+key);n^=n>>>16;n=Math.imul(n,0x7feb352d);n^=n>>>15;n=Math.imul(n,0x846ca68b);n^=n>>>16;return (n>>>0)/4294967296;}
function c7Roll(s,key){const state=c7State(s);state.seed ??= HorseHealth.hash(rrSessionId(s)+'|competition7');return c7Random(state.seed,key);}
function c7Plan(s,step,index=s.stepIndex){
 if(step.plan7){const configured=Number(step.routeDistance??step.distance),oldDefault=step.plan7.phase==='cross-country'?80:step.plan7.jump?32+(index%4)*4:35;if(step.stage==='main_round'&&!(configured>0)&&step.plan7.distance===oldDefault)step.plan7.distance=step.plan7.phase==='cross-country'?80:40;return step.plan7;}
 const current=s.stepIndex;s.stepIndex=index;const p=C7_PROMPT(s)||{};s.stepIndex=current;
 const phase=c7Phase(s,step),title=String(p.title||step.jumpType||''),source=String(step.jumpType||''),text=title+' '+source,main=step.stage==='main_round',dressage=phase==='dressage',jump=!dressage&&(main||/fence|jump|cross.?rail|combination/i.test(title));
 const movement=step.movement||(dressage?c7Movement(s,step,index):{}),rein=movement.rein||(/left/i.test(text)?'Left':/right/i.test(text)?'Right':index%2?'Right':'Left'),transition=movement.transition??/transition|halt|gait|canter lead/i.test(text),gait=movement.gait||(/canter/i.test(text)?'Canter':/walk|halt/i.test(text)?'Walk':'Trot');
 const related=/related|distance|combination|line|stride/i.test(text),water=jump&&/water|liverpool/i.test(text),filler=jump&&/filler|wall|plank/i.test(text);
 const distance=Number(step.routeDistance??step.distance)|| (phase==='cross-country'?80:main?40:jump?32+(index%4)*4:35),weight=Number(step.railWeight)||1+(related?.2:0)+(/oxer|triple|combination/i.test(text)?.15:0);
 step.plan7={phase,title:movement.name||C7_PLAN_LABELS[title]||title,promptTitle:title,main,jump,dressage,water,hasFiller:filler,filler,related,rein,gait,transition,downward:movement.downward??(transition&&/halt|downward|walk|slowing/i.test(text)),circle:movement.circle??/circle|volte/i.test(text),collected:movement.collected??/collect|piaffe|passage|half.?pass/i.test(text),distance,weight,height:Number.isFinite(Number(step.height??s.setup?.height??parseFloat(s.level)))?Number(step.height??s.setup?.height??parseFloat(s.level)):null,coefficient:Number(movement.coefficient)||1};return step.plan7;
}
const C7_BUILD=buildCompetitionRpgSession;
buildCompetitionRpgSession=function(...args){const s=C7_BUILD(...args);c7State(s);return s;};
const C7_PROMPT=competitionPromptForStep;
competitionPromptForStep=function(s){const p=C7_PROMPT(s);if(!p||c7Quick(s))return p;const step=s.steps?.[s.stepIndex];if(!step)return p;const plan=c7Plan(s,step);return {...p,title:plan.title,scene:step.stage==='course_walk'?`Study the planned ${plan.title.toLowerCase()} and choose your preparation.`:step.stage==='warm_up'?`Choose how to ride the planned ${plan.title.toLowerCase()} exercise. Your current condition carries into the arena.`:`${plan.dressage?'Movement':'Fence'}: ${plan.title}. Choose your aids using the horse's current condition.`};};
function c7RiderAdjustment(s,plan){const r=i6Rider(s),a=r.abilities||{},names=plan.jump?['Timing','Balance','Hand Stability','Leg Stability']:['Timing','Hand Stability','Leg Stability','Aid Consistency'],skill=names.reduce((n,k)=>n+(Number(a[k])||50),0)/names.length,ability=clamp((50-skill)*.12,-6,6),discipline=plan.dressage?'dressage':plan.phase==='cross-country'?'eventing':'jumping',levels=SHOW_LEVELS[discipline]||SHOW_LEVELS.jumping,exp=levels.indexOf(r.experience?.[discipline]),level=levels.indexOf(s.level),experience=clamp((level-Math.max(0,exp))*1,-5,5),rank=({Beginner:4,Novice:2,Intermediate:0,Advanced:-2,Professional:-4})[r.level]||0;return {ability,experience,rank,total:clamp(ability+experience+rank,-12,12)};}
function c7Context(h,s,plan,option={}){const state=c7State(s),title=plan.title,repeat=(state.repetitions[title]||0)+1,show=app.activeShow?.id===s.liveShowId?app.activeShow:null,env=s.environment||{},previous=s.choiceRecords?.at(-1),intent=String(option.intent||'');return i6Context({ordinary:true,jump:plan.jump,flat:plan.dressage||!plan.jump,newExercise:false,hasFiller:plan.hasFiller,water:plan.water,related:plan.related,left:plan.rein==='Left',right:plan.rein==='Right',leftCanter:plan.gait==='Canter'&&plan.transition&&plan.rein==='Left',rightCanter:plan.gait==='Canter'&&plan.transition&&plan.rein==='Right',transition:plan.transition,downward:plan.downward,circle:plan.circle,rhythmEligible:true,inconsistentContact:/emergency|hard|force|correction/.test(intent)&&(i6Rider(s).abilities?.['Hand Stability']??50)<60,demanding:plan.phase==='cross-country'||plan.height>=1.3,encouraged:/reassur|encourag|confidence/.test(intent),fourth:repeat>=4,repeated:repeat>=2,monotony:repeat,failedAttempt:previous?.quality<.8,cold:stepWarmup(s)&&state.readiness<45,disturbed:!!s.incidents?.length&&s.warmupState.tension>=25,completed:true,newArrival:!!show&&!show.venueVisited&&!state.arrivalChecked,indoor:s.location==='Indoor'||env.indoor===true,outdoor:s.location==='Outdoor'||env.outdoor===true,horses:!!s.otherHorsesPresent||env.otherHorses===true||stepWarmup(s)&&/busy|horses/i.test(title),wind:s.location!=='Indoor'&&s.weather?.wind>=25,traffic:!!s.traffic,gate:!!s.steps[s.stepIndex]?.nearGate,trail:plan.phase==='cross-country',familiarHandler:s.familiarHandler===true,repeat});}
function stepWarmup(s){return s.steps[s.stepIndex]?.stage==='warm_up';}
function c7Execution(h,s,plan,option={}){
 const state=c7State(s),w=s.warmupState,c=c7Context(h,s,plan,option),rider=c7RiderAdjustment(s,plan),intent=String(option.intent||''),risky=/risk|gamble|emergency|force|power|push/.test(intent),prepared=/balance|precision|regulat|reassur|rhythm|steady|adjust/.test(intent);
 const modifiers={readiness:c7Tier(state.readiness,[6,3,0,-2,-4]),focus:c7Tier(w.focus,[6,3,0,-2,-4]),timing:c7Tier(w.timing,[7,3,0,-2,-5]),confidence:c7Tier(w.confidence,[4,2,0,-1,-2]),energy:c7Tier(w.energy,[6,3,0,0,-2]),tension:w.tension<25?-2:w.tension<65?0:w.tension<80?2:4,rider:rider.total,choice:clamp((Number(option.fail)||10)-10,-6,10),technical:clamp((50-effectiveDisciplineSkill(h,plan.dressage?'dressage':s.discipline))*.08,-4,4)};
 const checks=[['tension',2,c.newArrival||c.gate||c.indoor||c.outdoor],['rhythm',3,true],['straightness',2,c.flat],['rushing',2,c.jump],['hesitation',2,c.jump],['distance',2,c.related],['drift',1,c.jump],['postSpeed',1,c.jump],['turn',2,c.flat&&(c.left||c.right)],['lead',3,c.leftCanter||c.rightCanter],['anticipation',2,c.transition],['aid',3,c.downward],['balance',2,c.circle],['overreaction',2,c.inconsistentContact],['frustration',2,c.fourth||c.failedAttempt],['distraction',2,c.realDistraction],['technical',2,c.cold]].filter(x=>x[2]);
 const issues=checks.map(([event,base])=>{const traits=i6Check(h,event,{...c,eventAliases:event==='rushing'?['hurried']:[]});return {event,weight:Math.max(0,base+clamp(traits.reduce((n,t)=>n+t.value,0),-18,18)),traits};});
 const learned=rrHorse(h).learned;modifiers.learned=plan.dressage?tbTier(learned[plan.collected?'Collection Confidence':'Flatwork Confidence'],[5,3,1,0,-2]):0;if(c.transition)modifiers.learned+=tbTier(learned['Training Anticipation'],[0,1,2,3,4]);
 const common=modifiers.learned+modifiers.readiness+modifiers.focus+modifiers.rider+modifiers.choice+modifiers.technical;
 const relevant=issues.map(row=>{const adjustment=['hesitation'].includes(row.event)?modifiers.confidence+modifiers.tension:['rhythm','distance','turn','lead','aid','drift'].includes(row.event)?modifiers.timing:['technical','balance','postSpeed'].includes(row.event)?modifiers.energy:0;return {...row,weight:Math.max(0,row.weight+adjustment*.35)};});
 const sum=relevant.reduce((n,x)=>n+x.weight,0),chance=clamp((sum+common)*(SHOW_RIDING_STYLES[showRidingStyle(s)]?.risk||1),1,70);return {chance,issues:relevant,modifiers,rider,context:c,prepared,risky};
}
function c7PoleBaseline(height){const value=Number.isFinite(height)&&height>0?height:.7;return value<1?.30:value<1.3?.40:.45;}
function c7LocalHazard(roundChance,weight,sum){return sum>0?1-Math.exp(Math.log1p(-clamp(roundChance,0,.999999))*Math.max(0,weight)/sum):0;}
function c7PoleRisk(h,s,step,plan,execution){
 if(!plan.jump||plan.phase==='cross-country')return {chance:0,front:0,hind:0};if(s.polePlan?.indices){const ordinal=s.steps.slice(0,s.stepIndex).filter(x=>x.stage==='main_round').length;return {legacy:true,chance:s.polePlan.indices.includes(ordinal)?1:0,front:1,hind:1};}const steps=s.steps.filter(x=>x.stage==='main_round'&&c7Phase(s,x)===plan.phase),weights=steps.map(x=>c7Plan(s,x,s.steps.indexOf(x)).weight),sum=weights.reduce((n,x)=>n+x,0)||plan.weight;
 const base=c7LocalHazard(c7PoleBaseline(plan.height),plan.weight,sum),traits=i6Traits(h),w=s.warmupState;
 const timing=c7Tier(w.timing,[7,3,0,-2,-5]),energy=c7Tier(w.energy,[6,3,0,0,-2]),focus=c7Tier(w.focus,[6,3,0,-2,-4]),factor=clamp(1+(execution.rider.total+execution.modifiers.technical+execution.modifiers.choice+timing+energy+focus)/100,.55,1.7)*(SHOW_RIDING_STYLES[showRidingStyle(s)]?.risk||1),hazard=-Math.log1p(-base)*factor,frontHazard=hazard/2*(traits.includes('Careful Front End')?.92:1),hindHazard=hazard/2*(traits.includes('Trails Hind Legs')?1.10:1),chance=1-Math.exp(-frontHazard-hindHazard);
 return {base,chance,front:frontHazard,hind:hindHazard,sumWeights:sum,roundBaseline:c7PoleBaseline(plan.height)};
}
function c7Incident(h,s,cause,record,npc=false){
 let incident;if(npc){const a=i6Rider(s).abilities||{},value=(a['Seat Stability']??50)*.6+(a.Balance??50)*.4,mult=value<20?1.8:value<40?1.5:value<60?1.2:value<80?1:value<90?.75:.55,chance=showFallChance((cause==='Spook'?13:15)*mult);incident={id:record.id+':incident',kind:cause.toLowerCase(),attempt:s.stepIndex,fell:c7Roll(s,record.id+':fall')*100<chance,fallChance:chance,fallSeverity:'Mild'};s.incidents ||= [];s.incidents.push(incident);}else{const severity=cause==='Spook'?(record.spookSeverity??1):0,kind=cause==='Spook'?['mildSpook','moderateSpook','severeSpook'][severity]:cause==='Runout'?'runout':cause==='Landing'?'landing':'refusal';const originalAttempt=s.attempts;s.attempts=(s.attempts||0)+1;incident=t2xIncident(h,s,kind,record,{incidentId:record.id+':incident',seriousJump:cause==='Landing',...(cause==='Spook'?{severity,stimulus:record.stimulus}:{} )});s.attempts=originalAttempt;s.lastShowIncident={cause,incidentId:incident.id};}
 if(incident?.fell){s.eliminated=true;s.roundStats.eliminated=true;s.roundStats.eliminationReason='fall';s.roundStats.fallSeverity=incident.fallSeverity;record.fell=true;record.fallSeverity=incident.fallSeverity;}
 record.incidentId=incident?.id;return incident;
}
function c7Resolve(h,s,index,{npc=false}={}){
 const state=c7State(s),step=s.steps[s.stepIndex],prompt=competitionPromptForStep(s),option=prompt?.options?.[index];if(!step||!option||s.awaitingAdvance||s.eliminated)return null;
 const key=s.stepIndex+':'+(state.representations[s.stepIndex]||0);if(state.ledger[key])return state.ledger[key].outcome?state.ledger[key]:(s.choiceRecords||[]).find(r=>r.id===state.ledger[key].id)||null;state.started=true;
 const plan=c7Plan(s,step),execution=c7Execution(h,s,plan,option),poleProfile=c7PoleRisk(h,s,step,plan,execution),c=execution.context,main=step.stage==='main_round',warmup=step.stage==='warm_up',w=s.warmupState,before={...w},prior=s.choiceRecords?.at(-1),record={id:rrSessionId(s)+':'+key,step:s.stepIndex,attempt:state.representations[s.stepIndex]||0,phase:plan.phase,title:plan.title,choice:option.label,intent:option.intent,interactive7:true,events6:[],completed:false,quality:1,faults:0,time:0,routeDistance:0,ridingStyle:showRidingStyle(s),before,readinessBefore:state.readiness};
 state.ledger[key]={id:record.id,pending:true};delete s.rrConcern;s.rrCurrentError=null;s.tension=w.tension;s.temporary ||= {};s.log ||= [];s.roundStats ||= {faults:0,refusals:0,clearJumps:0,rails:0,majorFaults:0};
 const selectedReset=step.stage!=='course_walk'&&plan.jump&&/circle|re.?approach|represent|abort/i.test(option.label),skip=plan.phase==='cross-country'&&/skip/i.test(option.label);
 if(selectedReset&&!skip){record.outcome='Reorganized the approach';record.represent=true;record.quality=.6;record.time=8;record.settled6=w.tension>0;i6StateChange(s,'tension',-3);i6StateChange(s,'confidence',1);c7Readiness(s,2,'Selected settling action');}
 else if(step.stage==='course_walk'){record.completed=true;record.outcome='Course preparation recorded';record.prepared=true;state.preparations ||= {};state.preparations[plan.title]={intent:option.intent,step:s.stepIndex};i6StateChange(s,'timing',2);record.time=120;}
 else{
  const stimulus=typeof tb51Stimulus==='function'?tb51Stimulus({...s,occupancy:c.horses?'Busy':s.occupancy}):null;
  if(stimulus){const spook=tb51SpookProfile(h,s,stimulus);record.stimulus=stimulus;record.spookProfile=spook;if(c7Roll(s,key+':spook')*100<spook.chance){record.events6.push('spook');record.quality=0;record.outcome='Environmental spook';const weights=tb51SpookSeverity(h);let severityRoll=c7Roll(s,key+':spook-severity')*weights.reduce((n,x)=>n+x,0);record.spookSeverity=weights.findIndex(x=>(severityRoll-=x)<=0);c7Readiness(s,record.spookSeverity===2?-4:-1,'Environmental disruption');const incident=c7Incident(h,s,'Spook',record,npc);if(incident?.effects){w.tension=clamp(s.tension||0,0,100);i6StateChange(s,'focus',-(incident.effects.focusLoss||0));}if(incident?.kind==='bolt'){record.event='bolt';record.outcome='Environmental bolt';record.events6.push('bolt');}record.balancePassed=!incident?.fell;record.represent=plan.jump&&!s.eliminated;record.time=5;}else{record.composed=true;if(!npc)i6Recovery(h,s,record.id,stimulus.source||stimulus.id,{completed:true,composed:true});}}
  if(!record.events6.includes('spook')){
   const eligibleJump=plan.jump&&(main||/fence|jump|cross.?rail|combination/i.test(plan.title));
   if(eligibleJump){const profile=fenceAvoidanceProfile(h,{...s,refusalContext:'competition',setup:{height:plan.height}}),decision=!npc&&main&&rrEnabled()?tb52ShowJumpDecision(h,s,step,profile.chance):null,roll=decision?decision.roll:c7Roll(s,key+':refusal')*100;record.refusal={profile,roll,refused:roll<profile.chance};if(record.refusal.refused){const subtype=c7Roll(s,key+':refusal-kind');record.event=subtype<.65?'refusal':subtype<.9?'runout':'abandoned-approach';record.outcome=record.event==='runout'?'Run-out':record.event==='refusal'?'Refusal':'Abandoned approach';record.quality=0;record.time=6;record.represent=true;record.events6.push('hesitation');i6StateChange(s,'tension',5);i6StateChange(s,'confidence',-2);c7Readiness(s,-4,'Failed jumping attempt');if(main){s.roundStats.refusals++;s.refusalCount=s.roundStats.refusals;record.faults=4;s.roundStats.faults+=4;if(s.roundStats.refusals>=2){s.eliminated=true;s.roundStats.eliminated=true;s.roundStats.eliminationReason='2 refusals';}}const incident=c7Incident(h,s,record.event==='runout'?'Runout':'Refusal',record,npc);record.balancePassed=!incident?.fell;}}
   if(!record.refusal?.refused){
    const roll=c7Roll(s,key+':execution')*100;record.execution={...execution,roll};record.completed=true;record.quality=1;
    if(roll<execution.chance){let target=c7Roll(s,key+':cause')*execution.issues.reduce((n,x)=>n+x.weight,0);const issue=execution.issues.find(x=>(target-=x.weight)<=0)||execution.issues[0];let event=issue?.event||'rhythm';if(event==='drift'){const dir=i6Traits(h).includes('Drifts Left to Fences')?'Left':i6Traits(h).includes('Drifts Right to Fences')?'Right':c.left?'Left':'Right';event='drift'+dir;}record.events6.push(event);if(event==='tension')i6StateChange(s,'tension',2);record.quality=['lead','aid','balance','overreaction'].includes(event)?.3:.6;record.error=event;record.riderError=['distance','overreaction','aid'].includes(event);if(record.riderError)s.rrCurrentError={type:event};i6StateChange(s,'focus',-1);i6StateChange(s,'timing',-2);if(record.quality<.5){i6StateChange(s,'confidence',-1);c7Readiness(s,prior?.quality<.5?-4:-2,'Execution difficulty');}else c7Readiness(s,-1,'Minor execution error');}
    else{record.prepared=execution.prepared;if(warmup){i6StateChange(s,'tension',-4);i6StateChange(s,'confidence',3);record.settled6=before.tension>w.tension;}i6StateChange(s,'timing',1);i6StateChange(s,'focus',1);if(warmup)c7Readiness(s,prior?.quality>=.8?6:4,'Completed suitable preparation');}
    const positive=i6Check(h,'engagement',c).reduce((n,x)=>n+x.value,0);record.engaged6=record.quality>=.8&&positive>0&&c7Roll(s,key+':engagement')*100<50+positive;
    if(plan.jump){
     const pole=poleProfile;record.pole=pole;
     if(c7Roll(s,key+':pole')<pole.chance){record.railCause=c7Roll(s,key+':rail-cause')<pole.front/Math.max(.0001,pole.front+pole.hind)?'front':'hind';record.faults=main?4:0;record.quality=Math.min(record.quality,.6);if(main){s.roundStats.faults+=4;s.roundStats.rails=(s.roundStats.rails||0)+1;}}
     else if(i6Traits(h).includes('Overjumps')&&c7Roll(s,key+':clearance')<.12)record.events6.push('overjump');
     if(main&&!record.faults)s.roundStats.clearJumps++;
     record.outcome=record.railCause?`Rail (${record.railCause} legs${main?', 4 faults':''})`:record.error?'Imperfect approach; clear':'Clean jump';
     if(record.error==='balance'&&w.energy<25)c7Incident(h,s,'Landing',record,npc);
    }else record.outcome=record.error?'Movement completed with '+record.error+' error':'Accurate movement';
    if(plan.dressage){const skill=effectiveDisciplineSkill(h,'dressage'),base=clamp(5+skill*.035+clamp((w.timing+w.focus+w.confidence-150)/300,-.5,.5),0,10),deduction=record.error?(record.error==='lead'||record.error==='aid'||record.error==='anticipation'?.75:record.error==='balance'?.5:.2):0,bonus=record.quality>=.8?.2:0;record.mark=Math.round(clamp(base-deduction+bonus,0,10)*10)/10;record.markDeduction=deduction;record.coefficient=plan.coefficient;record.outcome=`${plan.title}: ${record.mark.toFixed(1)}/10`;}
    if(main)c7EffortTiming(h,s,plan,option,record);
    else{
    const style=SHOW_RIDING_STYLES[showRidingStyle(s)]?.time||1,route=/inside|tight|direct/i.test(option.label)?.94:/wide|steady|balance|extra/i.test(option.label)?1.06:1,slow=plan.jump&&i6Traits(h).includes('Careful but Slow')?1.05:1,speed=plan.phase==='cross-country'?10:plan.dressage?3:5+effectiveDisciplineSkill(h,s.discipline)/100;
    record.routeDistance=plan.distance*route;record.time=record.routeDistance/speed*style*slow+(record.events6.includes('hesitation')?1.5:0)+(record.error?.startsWith('drift')?.5:0);record.slowerPace6=slow>1?record.time-record.time/slow:0;
    }
    if(skip){record.completed=false;record.quality=0;record.faults=4;s.roundStats.faults+=4;record.represent=true;record.outcome='Cross-country question skipped; not completed';}
    const exertion=warmup?2:plan.phase==='cross-country'?3:1;i6StateChange(s,'energy',-exertion);if(w.energy<25)c7Readiness(s,-5,'Actual exertion');
   }
  }
 }
 if(main&&record.refusal?.refused)c7EffortTiming(h,s,plan,option,record);
 record.resultIndex=record.refusal?.refused?5:record.quality>=.8?0:record.quality>=.5?2:3;
 const facts=i6ResolveTraitEffects(h,s,record,c);if(plan.phase==='hunter'&&['rushing','rhythm'].some(e=>record.events6.includes(e)))record.hunterPaceDeduction=2;record.facts={...facts,opening:main&&s.steps.filter((x,i)=>i<s.stepIndex&&x.stage==='main_round'&&c7Phase(s,x)===plan.phase).length===0,finalFence:main&&!s.steps.slice(s.stepIndex+1).some(x=>x.stage==='main_round'&&c7Phase(s,x)===plan.phase),cleanClearance:plan.jump&&record.completed&&!record.railCause,refusal:record.event==='refusal',runout:record.event==='runout',timingError:!!record.error&&['distance','aid','rhythm'].includes(record.error),correctTransition:plan.dressage&&plan.transition&&record.completed&&!['lead','anticipation','aid'].includes(record.error),correctRightLead:plan.dressage&&c.rightCanter&&record.completed&&record.error!=='lead',wrongLeftLead:plan.dressage&&c.leftCanter&&record.error==='lead',straightness:plan.dressage&&record.completed&&record.error!=='straightness',rhythmSuccess:record.completed&&record.error!=='rhythm',advanced:['Advanced','Professional'].includes(i6Rider(s).level),inexperienced:['Beginner','Novice'].includes(i6Rider(s).level),balancePassed:!!record.balancePassed,refusalFall:record.fell&&!!record.refusal?.refused,recovered:prior?.quality<.8&&record.quality>=.8,relatedSuccess:plan.related&&record.completed&&!record.events6.includes('distance'),selectedPreparation:!!record.prepared,slower:record.slowerPace6>0,tensionIncrease:w.tension>before.tension,tensionDecrease:w.tension<before.tension,timingIncrease:w.timing>before.timing,readinessLow:state.readiness<45,warmupPositive:warmup&&record.completed&&record.quality>=.8,focusSuccess:!!c.realDistraction&&record.completed&&!record.events6.includes('distraction'),confidentApproach:plan.jump&&record.completed&&w.confidence>=65&&!facts.hesitation,excessExertion:before.energy-w.energy>=4,patient:c.repeated&&record.completed&&!facts.frustration};
 if(main||warmup){state.repetitions[plan.title]=(state.repetitions[plan.title]||0)+1;if(c.newArrival)state.arrivalChecked=true;}
 if(!npc&&rrEnabled()&&(main||warmup)&&!selectedReset){s.rbResultIndex=record.resultIndex;s.lastResult=record.resultIndex;s.attempts=(s.attempts||0)+1;if(record.engaged6)s.i6LastEngagedAttempt=s.attempts;const e=tbRecord(h,s,record.event||record.error||'exercise',plan.dressage?'dressage':'jumping',record.completed&&record.quality>=.8);record.learningChanges=e?.changes||{};}
 record.after={...w};record.readinessAfter=state.readiness;if(record.fell)record.outcome='Eliminated — Fall'+(record.fallSeverity?' · Fall intensity: '+record.fallSeverity:'');else if(s.eliminated)record.outcome='Eliminated — Refusal';
 record.narratives=c7Narratives(h,s,record,plan).slice(0,3);if(record.execution)record.execution={chance:record.execution.chance,modifiers:record.execution.modifiers,rider:record.execution.rider,roll:record.execution.roll,context:{horses:c.horses,fourth:c.fourth}};state.ledger[key]={id:record.id,incidentId:record.incidentId||null,resolved:true};s.choiceRecords ||= [];s.choiceRecords.push(record);s.outcomes ||= [];s.outcomes.push({phase:step.phase,outcome:record.outcome,eventText:record.narratives.map(x=>x.text).join(' '),recordId:record.id});s.feedback=[record.outcome,...record.narratives.slice(0,2).map(x=>x.text)].join(' · ');s.awaitingAdvance=true;state.representStep=record.represent&&!s.eliminated?s.stepIndex:null;
 const show=app.activeShow;if(!npc&&show&&show.id===s.liveShowId)show.clock+=record.time/3600;
 return record;
}
const C7_CHANCES=competitionOptionFinalChances;
competitionOptionFinalChances=function(s,h,step,options){if(c7Quick(s))return C7_CHANCES(s,h,step,options);const plan=c7Plan(s,step),refusal=plan.jump?fenceAvoidanceProfile(h,{...s,refusalContext:'competition',setup:{height:plan.height}}).chance:0;return options.map((option,index)=>{const p=c7Execution(h,s,plan,option),fail=plan.jump?refusal:p.chance,pole=plan.jump?c7PoleRisk(h,s,step,plan,p).chance*100:null,partial=(100-fail)*(pole??p.chance)/100,actionOnly=step.stage!=='course_walk'&&plan.jump&&/circle|re.?approach|represent|abort/i.test(option.label);return {index,option,successChance:100-fail-partial,computed:{neutralChance:partial,failChance:fail},refusalChance:refusal,executionChance:p.chance,poleChance:pole,jumpOutcomeChances:plan.jump&&!actionOnly,actionOnly};});};
const C7_RESOLVE=resolveCompetitionRpgChoice;
resolveCompetitionRpgChoice=function(s,h,index){if(c7Quick(s))return C7_RESOLVE(s,h,index);if(s._resolving||s.awaitingAdvance)return;try{s._resolving=true;c7Resolve(h,s,index);}finally{delete s._resolving;}saveGame(false);showScheduleAdvance(s);};
const C7_ADVANCE=showAdvanceRpg;
showAdvanceRpg=function(s){if(c7Quick(s))return C7_ADVANCE(s);const state=c7State(s);if(s.awaitingAdvance&&state.representStep===s.stepIndex&&!s.eliminated){s.awaitingAdvance=false;state.representations[s.stepIndex]=(state.representations[s.stepIndex]||0)+1;state.representStep=null;return;}const was=s.steps[s.stepIndex],result=C7_ADVANCE(s),next=s.steps[s.stepIndex];if(was?.stage==='warm_up'&&next?.stage==='main_round'&&!state.entryRecorded){state.entryRecorded=true;const h=app.horses.find(h=>h.id===s.horseId);if(h){const r={facts:{arenaEntry:true,warmupComplete:true},phase:c7Phase(s,next),outcome:'Arena entry',events6:[]};s.feedback=c7Narratives(h,s,r,c7Plan(s,next)).map(x=>x.text).join(' ');}}return result;};
const C7_JUMP_OFF=showBeginJumpOff;
showBeginJumpOff=function(show,...args){const old=show.rpg,state=old?.interactive7,values=HorseHealth.copy(old?.warmupState),result=C7_JUMP_OFF(show,...args);if(show.rpg!==old&&state&&!show.quickRunning){const next=c7State(show.rpg);next.readiness=state.readiness;next.preparations=HorseHealth.copy(state.preparations||{});next.started=state.started;show.rpg.warmupState=values;next.carriedFrom=rrSessionId(old);}return result;};

const C7_NARRATIVES=[
 {
  "id": "jump:1",
  "group": "jump",
  "text": "[HORSE] approaches the opening fence with a consistent rhythm."
 },
 {
  "id": "jump:2",
  "group": "jump",
  "text": "The rider's timing becomes uncertain during the final strides."
 },
 {
  "id": "jump:3",
  "group": "jump",
  "text": "[HORSE] leaves the ground and clears the fence cleanly."
 },
 {
  "id": "jump:4",
  "group": "jump",
  "text": "The horse hesitates briefly but completes the jump."
 },
 {
  "id": "jump:5",
  "group": "jump",
  "text": "[HORSE] accelerates noticeably during the approach."
 },
 {
  "id": "jump:6",
  "group": "jump",
  "text": "The horse drifts left as it approaches the fence."
 },
 {
  "id": "jump:7",
  "group": "jump",
  "text": "The horse drifts right before takeoff."
 },
 {
  "id": "jump:8",
  "group": "jump",
  "text": "[HORSE] clears the fence with an unusually high effort."
 },
 {
  "id": "jump:9",
  "group": "jump",
  "text": "The front end makes contact with the rail."
 },
 {
  "id": "jump:10",
  "group": "jump",
  "text": "The horse catches a rail with its hind legs."
 },
 {
  "id": "jump:11",
  "group": "jump",
  "text": "[HORSE] loses some balance after landing."
 },
 {
  "id": "jump:12",
  "group": "jump",
  "text": "The rider regains a consistent rhythm before the next fence."
 },
 {
  "id": "jump:13",
  "group": "jump",
  "text": "[HORSE] refuses the fence."
 },
 {
  "id": "jump:14",
  "group": "jump",
  "text": "The horse moves away from the intended line and runs out."
 },
 {
  "id": "jump:15",
  "group": "jump",
  "text": "The horse remains hesitant despite the rider's experience."
 },
 {
  "id": "jump:16",
  "group": "jump",
  "text": "The inexperienced rider misjudges the distance."
 },
 {
  "id": "jump:17",
  "group": "jump",
  "text": "The rider remains balanced through the unexpected movement."
 },
 {
  "id": "jump:18",
  "group": "jump",
  "text": "The rider falls after the sudden stop."
 },
 {
  "id": "jump:19",
  "group": "jump",
  "text": "[HORSE] maintains its pace throughout the related distance."
 },
 {
  "id": "jump:20",
  "group": "jump",
  "text": "The horse's longer stride changes the distance to the next fence."
 },
 {
  "id": "jump:21",
  "group": "jump",
  "text": "The horse loses time through a slower but careful approach."
 },
 {
  "id": "jump:22",
  "group": "jump",
  "text": "The rider's preparation results in a consistent final approach."
 },
 {
  "id": "jump:23",
  "group": "jump",
  "text": "[HORSE] completes the final fence without jumping penalties."
 },
 {
  "id": "jump:24",
  "group": "jump",
  "text": "The horse finishes the course with [TOTAL] penalties in [TIME] seconds."
 },
 {
  "id": "jump:25",
  "group": "jump",
  "text": "The completed round qualifies [HORSE] for the jump-off."
 },
 {
  "id": "warmup:1",
  "group": "warmup",
  "text": "[HORSE] settles into the opening warmup exercise."
 },
 {
  "id": "warmup:2",
  "group": "warmup",
  "text": "The horse requires more time to establish a consistent rhythm."
 },
 {
  "id": "warmup:3",
  "group": "warmup",
  "text": "[HORSE] becomes distracted by another horse in the warmup area."
 },
 {
  "id": "warmup:4",
  "group": "warmup",
  "text": "The horse remains attentive despite the surrounding activity."
 },
 {
  "id": "warmup:5",
  "group": "warmup",
  "text": "The rider completes a successful preparation exercise."
 },
 {
  "id": "warmup:6",
  "group": "warmup",
  "text": "[HORSE] becomes increasingly tense after the unsuccessful attempt."
 },
 {
  "id": "warmup:7",
  "group": "warmup",
  "text": "The horse recovers its composure before entering the arena."
 },
 {
  "id": "warmup:8",
  "group": "warmup",
  "text": "The rider uses more energy than intended during the warmup."
 },
 {
  "id": "warmup:9",
  "group": "warmup",
  "text": "The horse approaches the practice fence confidently."
 },
 {
  "id": "warmup:10",
  "group": "warmup",
  "text": "[HORSE] hesitates during the practice attempt."
 },
 {
  "id": "warmup:11",
  "group": "warmup",
  "text": "The rider's timing improves during the completed exercise."
 },
 {
  "id": "warmup:12",
  "group": "warmup",
  "text": "The horse becomes frustrated with the repeated exercise."
 },
 {
  "id": "warmup:13",
  "group": "warmup",
  "text": "[HORSE] remains patient through several completed repetitions."
 },
 {
  "id": "warmup:14",
  "group": "warmup",
  "text": "The horse enters the competition arena carrying its current tension and energy levels."
 },
 {
  "id": "warmup:15",
  "group": "warmup",
  "text": "The warmup ends with [HORSE] showing [READINESS] readiness."
 },
 {
  "id": "judged:1",
  "group": "judged",
  "text": "[HORSE] completes the transition at the intended marker."
 },
 {
  "id": "judged:2",
  "group": "judged",
  "text": "The horse anticipates the transition and changes gait too early."
 },
 {
  "id": "judged:3",
  "group": "judged",
  "text": "The left canter lead is not established correctly."
 },
 {
  "id": "judged:4",
  "group": "judged",
  "text": "The right canter lead is established cleanly."
 },
 {
  "id": "judged:5",
  "group": "judged",
  "text": "[HORSE] maintains straightness throughout the movement."
 },
 {
  "id": "judged:6",
  "group": "judged",
  "text": "The horse falls inward during the circle."
 },
 {
  "id": "judged:7",
  "group": "judged",
  "text": "The contact becomes inconsistent during the collected movement."
 },
 {
  "id": "judged:8",
  "group": "judged",
  "text": "[HORSE] maintains an excellent rhythm during the exercise."
 },
 {
  "id": "judged:9",
  "group": "judged",
  "text": "The judges record a lower mark after the transition error."
 },
 {
  "id": "judged:10",
  "group": "judged",
  "text": "The movement receives a mark of [MARK]."
 },
 {
  "id": "judged:11",
  "group": "judged",
  "text": "[HORSE] maintains a smooth hunter-style rhythm between fences."
 },
 {
  "id": "judged:12",
  "group": "judged",
  "text": "The horse loses hunter marks because of its inconsistent pace."
 },
 {
  "id": "judged:13",
  "group": "judged",
  "text": "The horse's careful but slower pace affects its recorded time."
 },
 {
  "id": "judged:14",
  "group": "judged",
  "text": "[HORSE] remains attentive through the cross-country phase."
 },
 {
  "id": "judged:15",
  "group": "judged",
  "text": "The horse becomes hesitant during the water-related exercise."
 },
 {
  "id": "judged:16",
  "group": "judged",
  "text": "The horse completes the phase within the recorded time."
 },
 {
  "id": "judged:17",
  "group": "judged",
  "text": "The phase result is added to the horse's overall eventing score."
 },
 {
  "id": "judged:18",
  "group": "judged",
  "text": "The competition concludes with a final placing of [RANK]."
 }
];
function c7NarrativeEligible(id,h,s,r,p){const f=r.facts||{},events=r.events6||[],warmup=s.steps[s.stepIndex]?.stage==='warm_up',main=s.steps[s.stepIndex]?.stage==='main_round',g=id.split(':')[0],n=Number(id.split(':')[1]);if(g==='jump'&&(!main||!p.jump))return false;if(g==='warmup'&&!warmup&&!['warmup:14','warmup:15'].includes(id))return false;if(g==='judged'&&!['dressage','hunter','cross-country','showjumping'].includes(p.phase)&&n!==18)return false;
 const conditions={jump:[f.opening&&f.rhythmSuccess,f.timingError,f.cleanClearance&&!r.error, f.hesitation&&f.cleanClearance,f.rushing,f.driftLeft,f.driftRight,f.overjump,r.railCause==='front',r.railCause==='hind',f.postSpeed||events.includes('balance'),f.recovered,f.refusal,f.runout,f.advanced&&f.hesitation,f.inexperienced&&events.includes('distance'),f.balancePassed,f.refusalFall,f.relatedSuccess,i6Traits(h).includes('Long Stride Tendency')&&events.includes('distance'),f.slower,f.selectedPreparation&&r.quality>=.8,f.finalFence&&r.completed&&!r.faults,f.officialCourse,f.jumpOffQualified],warmup:[f.settling,f.readinessLow&&i6Traits(h).includes('Slow to Warm Up')&&r.error==='technical',f.distraction&&!!r.execution?.context.horses,f.focusSuccess,f.warmupPositive,r.quality<.8&&f.tensionIncrease,f.tensionDecrease,f.excessExertion,f.confidentApproach,f.hesitation,f.timingIncrease,f.frustration&&r.execution?.context.fourth,f.patient,f.arenaEntry,f.warmupComplete],judged:[p.dressage&&f.correctTransition,p.dressage&&f.anticipation,p.dressage&&f.wrongLeftLead,p.dressage&&f.correctRightLead,p.dressage&&f.straightness,p.dressage&&f.balance,p.dressage&&p.collected&&f.overreaction,p.dressage&&f.rhythmSuccess,!!r.markDeduction&&['aid','lead','anticipation'].includes(r.error),Number.isFinite(r.mark),p.phase==='hunter'&&f.rhythmSuccess,p.phase==='hunter'&&r.hunterPaceDeduction>0,f.slower,p.phase==='cross-country'&&r.completed&&!f.distraction,p.water&&f.hesitation,f.phaseComplete,f.phaseRecorded,f.officialPlacing]};return !!conditions[g]?.[n-1];}
function c7Narratives(h,s,r,p){return C7_NARRATIVES.filter(q=>c7NarrativeEligible(q.id,h,s,r,p)).map(q=>({id:q.id,text:q.text.replaceAll('[HORSE]',h.name).replaceAll('[READINESS]',c7State(s).readiness.toFixed(1)).replaceAll('[MARK]',Number(r.mark||0).toFixed(1)).replaceAll('[TOTAL]',String(r.total??0)).replaceAll('[TIME]',Number(r.time||0).toFixed(2)).replaceAll('[RANK]',String(r.rank||''))}));}
function c7ScoreRecords(show,entry,phase,records,stats={}){
 const eliminated=!!stats.eliminated,status=eliminated?{eliminationReason:stats.eliminationReason||'',...(stats.fallSeverity?{fallSeverity:stats.fallSeverity}:{})}:{},faults=records.reduce((n,r)=>n+(r.faults||0),0),time=records.reduce((n,r)=>n+(r.time||0),0);
 if(phase==='dressage'){if(records.some(r=>r.interactive7)&&records.some(r=>!r.interactive7&&!Number.isFinite(r.mark))){const old=C7_SCORE(show,entry,phase,records,stats);records=records.map((r,i)=>!r.interactive7&&!Number.isFinite(r.mark)?{...r,mark:old.movements[i].mark,coefficient:old.movements[i].coefficient,markDeduction:0}:r);}const movements=records.filter(r=>Number.isFinite(r.mark)).map(r=>({movement:r.title,mark:r.mark,coefficient:r.coefficient||1,comment:r.error?`Resolved ${r.error} error; deduction ${r.markDeduction.toFixed(2)}.`:'Accurate, balanced and rhythmic.'})),denominator=movements.reduce((n,r)=>n+r.coefficient*10,0),percentage=denominator?Math.round(movements.reduce((n,r)=>n+r.mark*r.coefficient,0)/denominator*10000)/100:0;return {phase,percentage,penalties:100-percentage,movements,comments:movements.map(m=>m.comment),eliminated,...status};}
 if(phase==='hunter'){
  const criteria=['Rhythm','Smoothness','Jumping form','Distances','Straightness','Flow','Rider quietness','Presentation'].map((name,index)=>{const deductions=records.reduce((n,r)=>n+(r.event?8:r.railCause?4:index===0&&['rhythm','rushing'].some(e=>r.events6?.includes(e))?2:index===3&&r.error==='distance'?3:index===4&&r.error?.startsWith('drift')?3:index===6&&r.riderError?2:r.error?1:0),0),score=clamp(65+(entry.skills.discipline||50)*.25-deductions,0,100);return {name,score:Math.round(score*10)/10};}),score=Math.round(criteria.reduce((n,c)=>n+c.score,0)/criteria.length*100)/100;
  return {phase,score,criteria,comments:criteria.map(c=>`${c.name}: ${c.score.toFixed(1)}`),eliminated,...status};
 }
 const timePenalties=0;return {phase,faults,rails:records.filter(r=>r.railCause).length,time:Math.round(time*100)/100,timePenalties,penalties:faults+timePenalties,eliminated,...status};
}
function c7NpcRound(show,entry,phase){
 entry.rounds7 ||= {};if(entry.rounds7[phase])return entry.rounds7[phase];
 const player=show.rpg,discipline=phase==='dressage'?'dressage':phase==='hunter'?'hunter':phase==='cross-country'?'eventing':'jumping',seed=HorseHealth.hash(entry.id+'|individuality6'),skill=entry.skills.discipline||50,level=entry.riderLevel||['Beginner','Novice','Intermediate','Advanced','Professional'][Math.min(4,Math.floor(skill/20))],abilities=Object.fromEntries(RR_ABILITIES.map(k=>[k,clamp(skill+(HorseHealth.roll(seed,k)-.5)*20,0,100)]));
 const h={id:entry.horseId,name:entry.name,age:10,behavior:800,personality:entry.personality||'Easy-Going',mood:entry.mood||'Neutral',focus:50,stats:{jumping:Object.fromEntries(Object.keys(showHorse(show)?.stats?.jumping||{}).map(k=>[k,skill])),dressage:Object.fromEntries(Object.keys(showHorse(show)?.stats?.dressage||{}).map(k=>[k,skill]))},training2:{attributes:{...entry.attributes},traits:entry.traits||[]},potential:{jumping:100,dressage:100,hunter:100,eventing:100},fatigue:0};t2horse(h);const b=rrHorse(h);entry.behavior6 ||= {...b.learned,'Learned Fence Avoidance':Math.round(HorseHealth.roll(seed,'avoidance')*45),'Jump Confidence':40+Math.round(HorseHealth.roll(seed,'confidence')*50)};b.learned={...entry.behavior6};
 const steps=player.steps.filter(x=>x.stage==='main_round'&&c7Phase(player,x)===phase).map(x=>HorseHealth.copy(x)),s={horseId:h.id,id:show.id+':npc:'+entry.id+':'+phase,discipline:show.discipline,level:show.level,liveShowId:show.id,jumpOff:phase==='jump-off',steps,stepIndex:0,choiceRecords:[],outcomes:[],roundStats:{faults:0,rails:0,refusals:0,clearJumps:0},warmupState:{tension:50,focus:50,confidence:50,energy:50,timing:50},riderProfile:{level,abilities,experience:{jumping:show.level,dressage:show.level,eventing:show.level}},npc7:true};
 let guard=0;while(s.stepIndex<steps.length&&!s.eliminated&&guard++<80){const options=competitionPromptForStep(s)?.options||[],index=options.findIndex(o=>!/circle|re.?approach|represent|abort|skip/i.test(o.label));c7Resolve(h,s,Math.max(0,index),{npc:true});s.awaitingAdvance=false;const state=c7State(s);if(state.representStep===s.stepIndex){state.representations[s.stepIndex]=(state.representations[s.stepIndex]||0)+1;state.representStep=null;}else s.stepIndex++;}
 const result=c7ScoreRecords(show,entry,phase,s.choiceRecords,s.roundStats);const compact=s.choiceRecords.map(r=>({id:r.id,step:r.step,phase:r.phase,title:r.title,interactive7:true,completed:r.completed,quality:r.quality,error:r.error,events6:r.events6,faults:r.faults,time:r.time,mark:r.mark,markDeduction:r.markDeduction,coefficient:r.coefficient,railCause:r.railCause,refusal:r.refusal?{chance:r.refusal.profile.chance,roll:r.refusal.roll,refused:r.refusal.refused}:undefined}));entry.rounds7[phase]={records:compact,stats:s.roundStats,result,started:true,completed:true,completedAt:show.clock+s.choiceRecords.reduce((n,r)=>n+r.time,0)/3600};return entry.rounds7[phase];
}
const C7_SCORE=showScore;
showScore=function(show,entry,phase,records,stats={}){if(show.quickRunning||!show.rpg?.interactive7?.started)return C7_SCORE(show,entry,phase,records,stats);if(phase==='jump-off'&&!show.qualifiers?.includes(entry.id))throw Error('This entry did not qualify for the jump-off.');const result=!entry.player?c7NpcRound(show,entry,phase).result:records?.some(r=>r.interactive7)?c7ScoreRecords(show,entry,phase,records,stats):C7_SCORE(show,entry,phase,records,stats);if(phase==='jump-off')Object.assign(entry,{jumpOffFaults:result.faults,jumpOffTime:result.time,jumpOffPenalties:result.penalties,jumpOffCompleted:true,jumpOffEliminated:result.eliminated});return result;};
const C7_RESULT=showPlayerResult;
showPlayerResult=function(show,s){const result=C7_RESULT(show,s),h=showHorse(show),phase=showPhase(show),score=show.phaseScores[phase];if(h&&score&&s.interactive7?.started&&!show.quickRunning){const record={phase,time:score.time,total:score.penalties,rank:null,events6:[],facts:{officialCourse:!score.eliminated&&['showjumping','jump-off'].includes(phase),phaseComplete:!score.eliminated,phaseRecorded:show.discipline==='eventing'}},plan={phase,jump:['showjumping','jump-off','cross-country'].includes(phase),dressage:phase==='dressage'},narratives=c7Narratives(h,s,record,plan);show.notes7 ||= {};show.notes7[phase]=narratives;}return result;};
const C7_COMPLETE_PHASE=showCompletePhase;
showCompletePhase=function(show){const result=C7_COMPLETE_PHASE(show);if(show.rpg?.interactive7?.started&&!show.quickRunning){const h=showHorse(show),player=show.competitors.find(e=>e.player),qualified=show.qualifiers?.includes(player.id),rank=show.finalStandings?.find(e=>e.player)?.rank;show.summary7=[];if(qualified&&show.round===0)show.summary7.push(`The completed round qualifies ${h.name} for the jump-off.`);if(rank)show.summary7.push(`The competition concludes with a final placing of ${rank}.`);}return result;};
const C7_RENDER=renderShows;
renderShows=function(...args){const result=C7_RENDER(...args),show=app.activeShow,s=show?.rpg;if(!s||show.stage!=='ride'||c7Quick(s))return result;const panel=document.getElementById('shows');if(!panel)return result;const state=c7State(s),step=s.steps[s.stepIndex];if(!step)return result;const plan=c7Plan(s,step),phaseSteps=s.steps.filter(x=>x.stage==='main_round'&&c7Phase(s,x)===plan.phase),position=phaseSteps.indexOf(step)+1,time=(s.choiceRecords||[]).filter(r=>r.phase===plan.phase).reduce((n,r)=>n+r.time,0),box=document.createElement('div');box.className='box';box.dataset.competition7='status';box.innerHTML=`<h3>${step.stage==='main_round'?(plan.dressage?'Movement':'Fence')+' '+position+' / '+phaseSteps.length:step.stage==='warm_up'?'Warm-up':'Course preparation'}${plan.jump?' — '+(Number.isFinite(plan.height)?plan.height.toFixed(2)+' m':csEscape(s.level)):''}</h3><p>Current penalties: ${s.roundStats?.faults||0} · Recorded time: ${time.toFixed(2)} s</p><p>${Object.entries(s.warmupState).map(([key,value])=>csEscape(cap(key))+': '+value.toFixed(1)).join(' · ')} · Readiness: ${state.readiness.toFixed(1)}</p>${plan.jump?`<p>Base refusal risk per jump: ${getBaseAvoidanceRisk(rrHorse(showHorse(show)).learned['Learned Fence Avoidance'],'competition').toFixed(1)}%</p>`:''}<p>${(s.choiceRecords||[]).slice(-5).map(r=>csEscape(r.title+': '+r.outcome)).join('<br>')}</p>`;if(app.settings?.debugCompetition){const pre=document.createElement('pre');pre.textContent=JSON.stringify({refusal:fenceAvoidanceProfile(showHorse(show),s),readiness:state.readiness,last:s.choiceRecords?.at(-1)?.execution},null,2);box.appendChild(pre);}panel.prepend(box);return result;};
function c7Handling(h,s,context,id){const state=c7State(s);state.handling ||= {};if(state.handling[id])return state.handling[id];const event=context.mount?'mount':context.hoof?'hoof':context.farrier?'farrier':context.clip?'clip':context.groom?'groom':'hesitation',rules=i6Check(h,event,{...context,eventAliases:['fidget','hesitation']}),uncertainty=tbTier(rrHorse(h).learned['Handling Confidence'],[8,5,2,0,-4]),chance=clamp(10+uncertainty+rules.reduce((n,r)=>n+r.value,0),1,55),roll=c7Roll(s,'handling:'+id)*100,failed=roll<chance,record={id,context,probability:chance,roll,failed,delay:failed?30:0};state.handling[id]=record;
 if(failed){i6StateChange(s,'tension',2);i6StateChange(s,'focus',-1);}else{const engagement=i6Check(h,'engagement',context);record.engaged=engagement.length>0&&roll<70+engagement.reduce((n,r)=>n+r.value,0);if(record.engaged)i6StateChange(s,'focus',1);}
 const f={success:!failed,failed,[event]:failed,fidget:failed&&rules.some(r=>r.event==='fidget'),engagement:!!record.engaged};record.narratives=i6Traits(h).map(name=>i6TraitNarrative(h,name,context,f)).filter(Boolean);return record;}
const C7_TRAVEL=showTravelChoice;
showTravelChoice=function(show,action,...args){const prior=show.stage,result=C7_TRAVEL(show,action,...args);if(prior==='preparation'&&show.stage==='ride'&&!show.quickRunning){const h=showHorse(show),s=show.rpg;const record=c7Handling(h,s,{mount:true,standing:true,equipment:true,newEquipment:eqItems(h).some(item=>!t2horse(h).equipmentSeen[item.type]),familiarHandler:!!h.training2?.history?.length,completed:true},'mounting');show.clock+=record.delay/3600;if(record.narratives.length)showNote(show,record.narratives.map(r=>r.text).join(' '));}return result;};
function c7Movement(s,step,index){
 const phase=showPhaseName(step),rows=s.steps.filter(x=>x.stage==='main_round'&&showPhaseName(x)===phase),i=rows.indexOf(step),canter=s.discipline==='eventing'||SHOW_LEVELS.dressage.indexOf(s.level)>=1,collected=SHOW_LEVELS.dressage.indexOf(s.level)>=3;
 const movements=[{name:'Entry centerline',gait:'Trot',rein:'Left'}, {name:'Left circle',gait:'Trot',rein:'Left',circle:true}, {name:canter?'Left canter transition':'Walk–trot transition',gait:canter?'Canter':'Trot',rein:'Left',transition:true}, {name:'Left circle',gait:canter?'Canter':'Trot',rein:'Left',circle:true}, {name:canter?'Right canter transition':'Right walk–trot transition',gait:canter?'Canter':'Trot',rein:'Right',transition:true}, {name:collected?'Collected movement':'Change of rein',gait:'Trot',rein:'Right',collected}, {name:'Downward transition',gait:'Walk',rein:'Right',transition:true,downward:true}, {name:'Final halt',gait:'Walk',rein:'Left',transition:true,downward:true,coefficient:2}];
 const planned=rows.length===5?[movements[0],movements[1],movements[2],movements[4],movements[7]]:movements;
 step.movement={...(s.movementPlan?.[i]||planned[i%planned.length])};return step.movement;
}
// A planned question is visible before its outcome. Existing option labels remain unchanged.
const C7_PLAN_LABELS={
 'Horse Too Fresh':'Opening trot preparation','Distracted by Loudspeaker':'Preparation near the loudspeaker','Tight Through Back':'Stretching preparation','Horse Slowing Down':'Forward rhythm preparation','Rider Feeling Nervous':'Rider preparation','Horse Spooks Lightly':'Environmental preparation','Perfect Relaxation Moment':'Quiet preparation','Overreacts to Passing Jump':'Practice-fence approach','First Vertical Feels Big':'First practice vertical','Warm-Up Fence Rush':'Practice-fence rhythm','Horse Rushing':'Warm-up rhythm',
 'Horse Leaves a Stride Out':'Related-distance approach','Rider Off Balance on Landing':'Landing and rebalance','Sudden Spook on Approach':'Approach near the arena rail','Overjump Moment':'Fence clearance','Last Fence Pressure':'Final fence','Rare Perfect Round Energy':'Finishing rhythm',
 'Horse Drifts Off Line':'Hunter approach alignment','Added Stride':'Hunter related distance','Slight Rush Between Fences':'Rhythm between fences','Cute Distraction':'Hunter focus question','Slight Knockdown Risk':'Hunter jumping technique','Smooth Bending Line':'Bending line','Rider Overadjusts':'Hunter aids and rhythm','Perfect Hunter Flow':'Finishing hunter line',
 'Transition Too Quick':'Transition at the marker','Slowing Mid Movement':'Maintaining impulsion','Crooked Centerline':'Centerline','Canter Transition Rush':'Canter departure','Lateral Misunderstanding':'Lateral movement','Tension Builds':'Contact and relaxation','Sudden Harmony':'Self-carriage','Judge Pressure':'Movement before the judges','Slight Trip':'Balance through the movement','Final Halt Pressure':'Final halt',
 'Water Splash Hesitation':'Water question','Horse Spooks at Crowd':'Cross-country approach near spectators','Rider Tired Near End':'Late-course rhythm','Sudden Buck on Landing':'Cross-country landing','Time Pressure Final Fence':'Final cross-country fence','Perfect XC Flow':'Cross-country finishing line'
};
const C7_RECOVERY=showRoundRecovery;
showRoundRecovery=function(show,...args){const prior=show.roundRecovery,result=C7_RECOVERY(show,...args);if(!prior&&show.roundRecovery&&show.rpg?.interactive7?.started&&!show.quickRunning)c7Readiness(show.rpg,2,'Completed between-round recovery');return result;};

// Round only the displayed percentages; resolution keeps full precision.
function competitionChanceMarkup(entry){
 if(entry.actionOnly)return '<p class="small">Reorganize the approach; no jump attempted.</p>';
 const values=[entry.successChance,entry.computed.neutralChance,entry.computed.failChance].map(n=>clamp(Number(n)||0,0,100)),total=values.reduce((a,b)=>a+b,0),scaled=values.map(n=>total?n/total*1000:0),tenths=scaled.map(Math.floor),order=scaled.map((n,i)=>({i,remainder:n-tenths[i]})).sort((a,b)=>b.remainder-a.remainder||a.i-b.i);
 if(total)for(let remaining=1000-tenths.reduce((a,b)=>a+b,0),i=0;i<remaining;i++)tenths[order[i%3].i]++;
 const labels=entry.jumpOutcomeChances?['Success (clear)','Partial (pole)','Fail (refusal)']:['Success','Partial','Fail'];
 return '<p class="small" data-comp-chances>'+labels.map((label,i)=>label+': '+(tenths[i]/10).toFixed(1)+'%').join(' / ')+'</p>';
}

function c7EffortTiming(h,s,plan,choice,record){
 const state=c7State(s);let factor=1;
 if(s.discipline==='jumping'){s.poleRoundId ||= s.liveShowId||rrSessionId(s);state.ridingTimeFactor ??= s.polePlan?.timeFactor??ShowjumpingRound.timeFactor(h,s.poleRoundId);factor=state.ridingTimeFactor;}
 const quality=plan.jump?(record.completed&&!record.railCause?1:0):record.quality>=.8?1:record.quality>=.5?.6:0,timing=showEffortTiming(h,s,plan.phase,choice,quality,plan.distance,factor),slow=plan.jump&&record.completed&&i6Traits(h).includes('Careful but Slow')?1.05:1;
 record.routeDistance=timing.routeDistance;record.time=timing.time*slow;record.slowerPace6=timing.time*(slow-1);
}
