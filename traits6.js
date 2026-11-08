/* Canonical trait IDs remain in training2.traits. No duplicate trait storage. */
const I6_TRAIT_DESCRIPTIONS=[
 [
  "Rushes Fences",
  "+12 points to an approach-rushing check. If rushing occurs, temporary Focus -2 and approach Timing -2.",
  "[HORSE] begins accelerating during the approach."
 ],
 [
  "Cautious Jumper",
  "+8 points to a hesitation check during early encounters with a new exercise; no additional generic unfamiliar-obstacle refusal roll.",
  "[HORSE] approaches the exercise cautiously, maintaining a slower rhythm."
 ],
 [
  "Bold Jumper",
  "-6 points to approach hesitation checks. When a confident approach actually succeeds, temporary Confidence +1.",
  "[HORSE] approaches with confidence and maintains its rhythm."
 ],
 [
  "Hesitates at Fillers",
  "+10 points to a filler-specific hesitation check when a filler is actually present. Hesitation can reduce approach Timing by 1–2.",
  "[HORSE] loses some rhythm when approaching the filler."
 ],
 [
  "Water-Shy",
  "+12 points to hesitation checks involving actual water obstacles. On a resolved difficult response, temporary Tension +1–3.",
  "[HORSE] becomes hesitant during the water-obstacle exercise."
 ],
 [
  "Overjumps",
  "+12 points to an excessive-clearance-style check on a successful jump. Extra Energy cost 1–2 if triggered.",
  "[HORSE] clears the fence with considerably more height than necessary."
 ],
 [
  "Careful Front End",
  "-8 points to front-leg rail-contact likelihood when an existing jumping-error outcome is resolved. Does not reroll or silently remove round-level faults.",
  "[HORSE] brings its front legs neatly clear of the fence."
 ],
 [
  "Trails Hind Legs",
  "+10 points to hind-leg contact likelihood during an existing relevant rail-contact outcome.",
  "[HORSE] clears the front of the obstacle but catches the rail behind."
 ],
 [
  "Long Stride Tendency",
  "+8 points to a long-stride approach pattern; modifies distance/timing calculations on actual related-distance exercises.",
  "[HORSE]'s naturally longer stride changes the distance to the next fence."
 ],
 [
  "Short Stride Tendency",
  "+8 points to short-stride approach pattern; modifies related-distance timing.",
  "[HORSE] shortens the distance covered between fences."
 ],
 [
  "Drifts Left to Fences",
  "+10 points to left-drift events during jumping approaches. When triggered, approach alignment worsens by 1–3.",
  "[HORSE] drifts left during the approach."
 ],
 [
  "Drifts Right to Fences",
  "+10 points to right-drift events during jumping approaches. When triggered, approach alignment worsens by 1–3.",
  "[HORSE] drifts right during the approach."
 ],
 [
  "Strong After Fences",
  "+12 points to post-landing rebalance difficulty. Successful landing can still occur; failed rebalance gives temporary Timing -2–3.",
  "[HORSE] continues strongly after landing, making the next transition less consistent."
 ],
 [
  "Careful but Slow",
  "Reduces relevant hurried-technique errors by 4 points; ordinary approach pace is 4–6% slower when the trait activates, affecting actual elapsed time.",
  "[HORSE] maintains a careful jumping style but loses time through its slower pace."
 ],
 [
  "Enjoys Jumping",
  "+8 points to positive jumping engagement checks. A verified engaged, successful exercise has +10% to its normal positive learning amount, not an automatic gain.",
  "[HORSE] approaches the next exercise with evident enthusiasm."
 ],
 [
  "Strong on Left Rein",
  "+10 points to left-rein contact difficulty checks during relevant exercises. Failed check: temporary Connection/Focus -1–2.",
  "[HORSE] becomes heavier in the left rein during the movement."
 ],
 [
  "Strong on Right Rein",
  "+10 points to right-rein contact difficulty checks.",
  "[HORSE] leans against the right-rein contact."
 ],
 [
  "Weak Left Canter Lead",
  "+12 points to incorrect/unsuccessful left-lead canter checks.",
  "[HORSE] struggles to establish the intended left canter lead."
 ],
 [
  "Weak Right Canter Lead",
  "+12 points to incorrect/unsuccessful right-lead canter checks.",
  "[HORSE] fails to establish the intended right canter lead."
 ],
 [
  "Anticipates Transitions",
  "+12 points to premature-transition checks. When triggered, Training Anticipation +0.25–0.5 if meaningful.",
  "[HORSE] changes gait before the intended request."
 ],
 [
  "Difficult Downward Transitions",
  "+12 points to unsuccessful downward-transition checks. Failed outcome: temporary Timing -1–2.",
  "[HORSE] takes longer than intended to complete the downward transition."
 ],
 [
  "Naturally Straight",
  "-8 points to unintended-drift/alignment-error checks during flatwork.",
  "[HORSE] maintains a straight line through the movement."
 ],
 [
  "Falls Inward on Circles",
  "+10 points to inward-drift/balance errors on actual circles.",
  "[HORSE] loses its balance toward the inside of the circle."
 ],
 [
  "Excellent Rhythm",
  "-8 points to relevant rhythm-error checks. On successful rhythm result, temporary Focus +1.",
  "[HORSE] maintains an even rhythm throughout the exercise."
 ],
 [
  "Contact Sensitive",
  "+10 points to contact-related reaction checks when the rider actually makes an inconsistent-contact error.",
  "[HORSE] reacts noticeably to the inconsistent contact."
 ],
 [
  "Quick Learner",
  "×1.15 multiplier to eligible positive learned-behavior progression, excluding major incident recovery milestones.",
  "[HORSE] responds more consistently following the completed exercise."
 ],
 [
  "Slow Learner",
  "×0.80 multiplier to eligible positive learned-behavior progression.",
  "The completed exercise produces only a small improvement."
 ],
 [
  "Dislikes Repetition",
  "After three genuinely completed identical attempts, +8 points to a frustration/focus-disruption check on the fourth and later repeats.",
  "[HORSE] begins losing concentration during repeated attempts at the same exercise."
 ],
 [
  "Patient Worker",
  "-8 points to frustration checks during appropriate repetition.",
  "[HORSE] remains attentive throughout the repeated exercise."
 ],
 [
  "Easily Distracted",
  "+12 points to distraction checks when a real eligible distraction is present.",
  "[HORSE] loses focus as activity around the arena draws its attention."
 ],
 [
  "Strong Work Ethic",
  "+6 points to cooperative-engagement checks during eligible exercises.",
  "[HORSE] remains willing to participate despite the demanding session."
 ],
 [
  "Needs Encouragement",
  "+8 points to a positive engagement check after a genuinely selected existing encouragement action.",
  "[HORSE] responds positively to the encouragement."
 ],
 [
  "Frustrates Easily",
  "+10 points to frustration checks after a relevant unsuccessful exercise. On actual frustration, Tension +1–3.",
  "[HORSE] becomes increasingly frustrated after the unsuccessful attempt."
 ],
 [
  "Slow to Warm Up",
  "+10 points to early-session stiffness/low-readiness checks before adequate warmup has actually occurred.",
  "[HORSE] takes longer to settle into the opening exercises."
 ],
 [
  "Quick to Settle",
  "+12 points to positive settling checks following an actual mild/moderate disturbance; successful check decreases temporary Tension by 1–3.",
  "[HORSE] regains composure shortly after the disturbance."
 ],
 [
  "Nervous in New Arenas",
  "+10 points to unfamiliar-venue tension checks, once per new-venue arrival context.",
  "[HORSE] remains alert while adjusting to the new arena."
 ],
 [
  "Comfortable in New Arenas",
  "-10 points to new-venue tension checks.",
  "[HORSE] settles comfortably into the new surroundings."
 ],
 [
  "Distracted by Other Horses",
  "+12 points to distraction checks when other horses are actually nearby.",
  "[HORSE] shifts its attention toward the other horses."
 ],
 [
  "Enjoys Working Around Horses",
  "-8 points to company-related distraction/tension checks when horses are nearby.",
  "[HORSE] remains comfortable working beside other horses."
 ],
 [
  "Wind Sensitive",
  "+12 points to wind-related reaction checks when actual wind conditions qualify.",
  "[HORSE] becomes alert as the wind picks up around the arena."
 ],
 [
  "Traffic Nervous",
  "+12 points to traffic-triggered environmental reaction checks when vehicles are actually present.",
  "[HORSE] becomes tense as a vehicle passes nearby."
 ],
 [
  "Likes Open Spaces",
  "-6 points to outdoor-environment tension checks in suitable outdoor contexts.",
  "[HORSE] settles comfortably in the open arena."
 ],
 [
  "Prefers Enclosed Spaces",
  "-6 points to indoor-environment tension checks.",
  "[HORSE] appears comfortable in the enclosed arena."
 ],
 [
  "Nervous Around Arena Gates",
  "+12 points to distraction/tension checks near an actual arena entrance.",
  "[HORSE] becomes tense when passing the arena entrance."
 ],
 [
  "Enjoys Trail Work",
  "+8 points to positive engagement checks during genuine trail activities.",
  "[HORSE] moves willingly along the trail."
 ],
 [
  "Difficult to Mount",
  "+15 points to movement/restlessness checks during actual mounting.",
  "[HORSE] moves before the rider has completed mounting."
 ],
 [
  "Stands Quietly",
  "-12 points to unnecessary movement checks during appropriate standing/handling activities.",
  "[HORSE] remains quietly in place during the activity."
 ],
 [
  "Sensitive to Grooming",
  "+12 points to discomfort/restlessness checks during relevant grooming actions.",
  "[HORSE] reacts to the grooming sensation."
 ],
 [
  "Hoof-Handling Difficulties",
  "+15 points to hoof-handling resistance checks when a hoof is actually being handled.",
  "[HORSE] becomes reluctant during hoof handling."
 ],
 [
  "Calm with Farrier",
  "-12 points to farrier-related nervousness checks.",
  "[HORSE] remains settled during the farrier visit."
 ],
 [
  "Nervous with Farrier",
  "+15 points to farrier-related nervousness checks.",
  "[HORSE] becomes restless during the farrier examination."
 ],
 [
  "Sensitive to Clipping",
  "+15 points to clipping-related reaction checks.",
  "[HORSE] becomes unsettled when clipping begins."
 ],
 [
  "Equipment Cautious",
  "+12 points to hesitation checks during introduction of genuinely unfamiliar equipment.",
  "[HORSE] examines the unfamiliar equipment before settling."
 ],
 [
  "Mouths Equipment",
  "+15 points to investigative mouthing behavior checks during relevant equipment handling.",
  "[HORSE] investigates the nearby equipment with its mouth."
 ],
 [
  "Very People-Oriented",
  "+10 points to positive engagement checks during familiar-human handling interactions.",
  "[HORSE] approaches the familiar handler willingly."
 ]
];
const I6_RULES=[
 ['rushing',12,'jump'],['hesitation',8,'newExercise'],['hesitation',-6,'jump'],['hesitation',10,'hasFiller'],['hesitation',12,'water'],['overjump',12,'jump'],['frontRail',-8,'jump'],['hindRail',10,'jump'],['distance',8,'related'],['distance',8,'related'],['drift',10,'jump'],['drift',10,'jump'],['postSpeed',12,'jump'],['hurried',-4,'jump'],['engagement',8,'jump'],
 ['turn',10,'left'],['turn',10,'right'],['lead',12,'leftCanter'],['lead',12,'rightCanter'],['anticipation',12,'transition'],['aid',12,'downward'],['straightness',-8,'flat'],['balance',10,'circle'],['rhythm',-8,'rhythmEligible'],['overreaction',10,'inconsistentContact'],
 ['learn',15,'completed'],['learn',-20,'completed'],['frustration',8,'fourth'],['frustration',-8,'repeated'],['distraction',12,'realDistraction'],['engagement',6,'demanding'],['engagement',8,'encouraged'],['frustration',10,'failedAttempt'],['technical',10,'cold'],['settling',12,'disturbed'],
 ['tension',10,'newArrival'],['tension',-10,'newArrival'],['distraction',12,'horses'],['distraction',-8,'horses'],['spook',12,'wind'],['spook',12,'traffic'],['tension',-6,'outdoor'],['tension',-6,'indoor'],['tension',12,'gate'],['engagement',8,'trail'],
 ['mount',15,'mount'],['mount',-12,'standing'],['groom',12,'groom'],['hoof',15,'hoof'],['farrier',-12,'farrier'],['farrier',15,'farrier'],['clip',15,'clip'],['hesitation',12,'newEquipment'],['fidget',15,'equipment'],['engagement',10,'familiarHandler']
];
const I6_CONTRASTS=[
 "[HORSE] maintains its pace throughout the approach.",
 "[HORSE] completes the opening jumping exercise without hesitation.",
 "A hesitant approach interrupts [HORSE]'s usual bold rhythm.",
 "[HORSE] keeps its rhythm when approaching the filler.",
 "[HORSE] completes the water-obstacle exercise without hesitation.",
 "[HORSE] uses a proportionate effort to clear the fence.",
 "[HORSE] makes contact with the rail with its front legs.",
 "[HORSE] brings its hind legs clear without touching the rail.",
 "[HORSE] adjusts its longer stride to complete the related distance.",
 "[HORSE] maintains the intended distance with its shorter stride.",
 "[HORSE] holds the intended line without drifting left.",
 "[HORSE] holds the intended line without drifting right.",
 "[HORSE] returns to a manageable rhythm after landing.",
 "The slower approach does not prevent a loss of rhythm on this attempt.",
 "[HORSE] completes the jumping exercise quietly, without an enthusiastic response.",
 "[HORSE] accepts the left-rein contact throughout the movement.",
 "[HORSE] accepts the right-rein contact throughout the movement.",
 "[HORSE] establishes the intended left canter lead.",
 "[HORSE] establishes the intended right canter lead.",
 "[HORSE] waits for the requested transition aid.",
 "[HORSE] completes the downward transition at the intended point.",
 "[HORSE] loses straightness during the movement.",
 "[HORSE] stays balanced around the circle.",
 "[HORSE] loses its usual rhythm during the exercise.",
 "[HORSE] accepts the rider's steady contact throughout the exercise.",
 "The difficult attempt interrupts [HORSE]'s usually consistent response to the exercise.",
 "[HORSE] completes the exercise with a more consistent response.",
 "[HORSE] remains attentive through the repeated exercise.",
 "[HORSE] loses concentration during this repetition.",
 "[HORSE] stays focused despite the activity around the arena.",
 "The demanding exercise produces a reluctant response from [HORSE].",
 "[HORSE] remains uncertain despite the rider's encouragement.",
 "[HORSE] responds to the next exercise without becoming frustrated.",
 "[HORSE] completes the opening exercise without stiffness disrupting the task.",
 "[HORSE] needs more time to regain composure after the disturbance.",
 "[HORSE] completes the new-arena exercise without a tense response.",
 "[HORSE] becomes tense while adjusting to this new arena.",
 "[HORSE] keeps its attention on the exercise beside the other horses.",
 "[HORSE] loses concentration while working near the other horses.",
 "[HORSE] remains composed through the outdoor gust.",
 "[HORSE] remains composed as the vehicle passes.",
 "[HORSE] becomes tense during the outdoor exercise.",
 "[HORSE] becomes tense during the indoor exercise.",
 "[HORSE] passes the arena entrance without becoming tense.",
 "[HORSE] completes the trail exercise without showing positive engagement.",
 "[HORSE] stands still until the rider has finished mounting.",
 "[HORSE] moves out of place during the standing activity.",
 "[HORSE] remains comfortable during the grooming action.",
 "[HORSE] allows the hoof to be handled without resistance.",
 "[HORSE] becomes unsettled during this farrier visit.",
 "[HORSE] remains calm during this farrier visit.",
 "[HORSE] accepts the clipper activity without becoming unsettled.",
 "[HORSE] accepts the unfamiliar equipment without hesitation.",
 "[HORSE] leaves the nearby equipment alone during handling.",
 "[HORSE] remains hesitant during the familiar handler's request."
];
const I6_TRAITS=new Map(T2_TRAIT_RULES.map((row,i)=>{row.splice(1,3,...I6_RULES[i]);return [row[0],{name:row[0],event:row[1],value:row[2],trigger:row[3],effect:I6_TRAIT_DESCRIPTIONS[i][1],quote:I6_TRAIT_DESCRIPTIONS[i][2],contrast:I6_CONTRASTS[i]}];}));
function i6Traits(h){const out=[];for(let name of t2horse(h).traits){name=({'Drifts Left':'Drifts Left to Fences','Drifts Right':'Drifts Right to Fences'})[name]||name;if(!I6_TRAITS.has(name)||out.includes(name)||T2_EXCLUSIONS.some(pair=>pair.includes(name)&&out.some(x=>pair.includes(x))))continue;out.push(name);}return out;}
function i6Context(c={}){return {...c,flat:c.flat??false,newExercise:c.newExercise??(c.jump&&c.repeat<=2&&c.familiarity<20),related:c.related??!!(c.shortLine||c.longLine),transition:c.transition??!!(c.leftCanter||c.rightCanter||c.downward||c.repeatedTransition),rhythmEligible:c.rhythmEligible??!!(c.ordinary||c.familiar),fourth:c.fourth??c.monotony>=4,realDistraction:c.realDistraction??!!(c.horses||c.traffic||c.wind&&!c.indoor||c.busy),failedAttempt:c.failedAttempt??!!c.failedRepeat,newArrival:c.newArrival??!!c.newArena,wind:!!c.wind&&!c.indoor,groom:c.groom??!!c.roughGroom,inconsistentContact:!!c.inconsistentContact,demanding:c.demanding??!!c.speedDemand};}
function i6Check(h,event,context={}){const c=i6Context(context),events=[event,...(c.eventAliases||[]),...(event==='technical'?c.technicalEvents||[]:[])];return i6Traits(h).flatMap(name=>{const r=I6_TRAITS.get(name);return events.includes(r.event)&&c[r.trigger]?[{name,value:r.value,event:r.event}]:[];});}
t2traitModifiers=function(h,event,c={}){return i6Check(h,event,c).sort((a,b)=>Math.abs(b.value)-Math.abs(a.value));};
const I6_CONTEXT=t2context;
t2context=function(h,e,s,setup){const c=I6_CONTEXT(h,e,s,setup);return i6Context({...c,flat:e.category==='Flatwork',groom:e.id==='groom',demanding:e.intensity>=3,inconsistentContact:!!s.rrCurrentError&&(rrSettings().abilities['Hand Stability']<50||s.rrCurrentError?.type==='contact'),newExercise:(s.repetitions[e.id]||0)<2&&!t2horse(h).completedExerciseIds6?.includes(e.id),newArrival:c.newArena&&!s.i6ArrivalChecked,failedAttempt:s.lastResult>=2,disturbed:(s.tension||0)>=25&&!!s.incidents?.length});};
const I6_PROB=t2probability;
t2probability=function(h,event,base,c={},primary,secondary,s){c=i6Context(c);const p=I6_PROB(h,event,base,c,primary,secondary,s),sum=p.traits.reduce((n,r)=>n+r.value,0),cap=event==='technical'?24:18;const priorSocial=p.traitPersonality;p.traitPersonality=clamp(sum+p.personality,-cap,cap);p.chance=clamp(p.chance+(p.traitPersonality-priorSocial)*(c.relative??1),0,p.cap);if(['mount','hoof','farrier','groom','clip'].includes(event)||event==='technical'&&['mount','hoof','farrier','groom','clip'].some(x=>c[x])){p.handling=tbTier(rrHorse(h).learned['Handling Confidence'],[8,5,2,0,-4]);p.chance=clamp(p.chance+p.handling,0,p.cap);}return p;};
t2railProfile=function(h,e,c){const p=t2probability(h,'railContact',e.base,{...c,statePP:0,eventAliases:['frontRail','hindRail','hurried']}),front=Math.max(0,e.base/2+p.traits.filter(t=>t.name!=='Trails Hind Legs').reduce((n,t)=>n+t.value,0)),hind=Math.max(0,e.base/2+p.traits.filter(t=>t.name!=='Careful Front End').reduce((n,t)=>n+t.value,0)),scale=front+hind>30?30/(front+hind):1;return {...p,front:front*scale,hind:hind*scale,chance:(front+hind)*scale};};
function i6EnvironmentContext(s,stimulus){const source=String(stimulus?.source||stimulus?.type||stimulus?.id||'').toLowerCase(),indoor=s.location==='Indoor';return {indoor,outdoor:s.location==='Outdoor',wind:!indoor&&(/wind|gust/.test(source)||s.weather?.wind>=25),traffic:!!s.traffic&&/traffic|vehicle/.test(source),horses:!!s.otherHorsesPresent||s.occupancy==='Busy'||/horses/.test(source),gate:!!s.setup?.nearGate||/gate/.test(source),newArrival:!!s.newVenue&&!s.i6ArrivalChecked,realDistraction:!!stimulus};}
function i6StateChange(s,key,delta){if(s.warmupState){const before=s.warmupState[key];s.warmupState[key]=clamp(before+delta,0,100);return s.warmupState[key]-before;}if(key==='tension'){const before=s.tension||0;s.tension=clamp(before+delta,0,100);return s.tension-before;}s.temporary ||= {};const attr=key==='energy'?'Energy':key==='timing'?'Timing':key==='confidence'?'Confidence':'Focus',before=s.temporary[attr]||0;s.temporary[attr]=clamp(before+delta/10,-5,5);return (s.temporary[attr]-before)*10;}
function i6TraitFacts(r,c={}){const success=r.resultIndex<=1||r.completed&&r.quality>=.8,events=new Set(r.events6||[]),event=r.event;return {slower:!!r.slowerPace6,success,failed:!success,neutral:r.resultIndex===2||r.quality===.6,rushing:!!r.rushing||events.has('rushing'),hesitation:event==='hesitation'||events.has('hesitation'),overjump:r.jumpObservation==='Overjump'||events.has('overjump'),frontRail:/Front-rail/.test(r.jumpObservation||'')||r.railCause==='front',hindRail:/Hind-rail/.test(r.jumpObservation||'')||r.railCause==='hind',postSpeed:r.jumpObservation==='Strong landing'||events.has('postSpeed'),driftLeft:events.has('driftLeft'),driftRight:events.has('driftRight'),distance:events.has('distance'),turn:event==='turn'||events.has('turn'),lead:event==='lead'||events.has('lead'),anticipation:event==='anticipation'||events.has('anticipation'),aid:event==='aid'||events.has('aid'),balance:event==='balance'||events.has('balance'),rhythm:event==='rhythm'||events.has('rhythm'),overreaction:event==='overreaction'||events.has('overreaction'),frustration:event==='frustration'||events.has('frustration'),distraction:event==='distraction'||events.has('distraction'),tension:event==='tension'||events.has('tension'),spook:event==='spook'||events.has('spook'),technical:event==='technical'||r.resultIndex===3,engagement:!!r.engaged6,settling:!!r.settled6,mount:!!c.mount&&!success,hoof:!!c.hoof&&!success,groom:!!c.groom&&!success,farrier:!!c.farrier&&!success,clip:!!c.clip&&!success,fidget:!!r.mouthedEquipment};}
function i6TraitNarrative(h,name,c,f,learning={}){const r=I6_TRAITS.get(name);if(!r||!i6Traits(h).includes(name)||!i6Context(c)[r.trigger])return null;const favorable=r.value<0,actual=r.event==='learn'?Object.values(learning).some(x=>x&&(/Avoidance|Sensitivity|Anticipation/.test(x.stat)?x.delta<0:x.delta>0)):name==='Drifts Left to Fences'?f.driftLeft:name==='Drifts Right to Fences'?f.driftRight:f[r.event];
 if(r.event==='learn'&&!actual)return f.failed?{trait:name,outcome:'difficulty',text:r.contrast.replaceAll('[HORSE]',h.name)}:f.neutral?{trait:name,outcome:'neutral',text:`${h.name} completes the learning exercise with a mixed response.`}:null;
 let primary=r.event==='learn'?actual:favorable?f.success&&!actual:actual;
 if(name==='Equipment Cautious')primary=!!(f.hesitation&&f.settling);
 if(name==='Careful but Slow'&&!f.slower)return null;
 if(primary)return {trait:name,outcome:favorable||['learn','engagement','settling'].includes(r.event)?'favorable':'difficulty',text:r.quote.replaceAll('[HORSE]',h.name)};
 if(f.neutral&&actual)return {trait:name,outcome:'neutral',text:`${h.name} completes the relevant ${name.toLowerCase()} check with a mixed response.`};
 if(f.success&&!actual)return {trait:name,outcome:'favorable',text:r.contrast.replaceAll('[HORSE]',h.name)};
 if(f.failed&&actual)return {trait:name,outcome:'difficulty',text:r.contrast.replaceAll('[HORSE]',h.name)};return null;}
function i6ResolveTraitEffects(h,s,r,c){
 const traits=i6Traits(h),f=i6TraitFacts(r,c);r.traitConsequences6 ||= [];const apply=(name,key,delta)=>{if(!traits.includes(name))return;const actual=i6StateChange(s,key,delta);if(actual)r.traitConsequences6.push({trait:name,key,delta:actual});};
 if(f.rushing){apply('Rushes Fences','focus',-2);apply('Rushes Fences','timing',-2);}
 if(f.hesitation&&c.hasFiller)apply('Hesitates at Fillers','timing',-2);
 if(f.hesitation&&c.water)apply('Water-Shy','tension',2);
 if(f.success&&c.jump&&!f.hesitation)apply('Bold Jumper','confidence',1);
 if(f.overjump){apply('Overjumps','energy',-2);}
 if(f.postSpeed)apply('Strong After Fences','timing',-3);
 if(f.driftLeft)apply('Drifts Left to Fences','timing',-2);if(f.driftRight)apply('Drifts Right to Fences','timing',-2);
 if(f.turn&&(c.left||c.right))apply(c.left?'Strong on Left Rein':'Strong on Right Rein','focus',-2);
 if(f.aid&&c.downward)apply('Difficult Downward Transitions','timing',-2);
 if(f.success&&c.rhythmEligible&&!f.rhythm)apply('Excellent Rhythm','focus',1);
 if(f.frustration)apply('Frustrates Easily','tension',2);
 if(f.settling)apply('Quick to Settle','tension',-2);
 if(!s.npc7&&f.anticipation&&traits.includes('Anticipates Transitions')){const e=tbEvent(h,s,'trait-anticipation:'+(s.attempts??s.stepIndex),'trait');if(e){tbApply(h,s,e,'Training Anticipation',.25);tbCommit(h,s,e);}}
 if(f.engagement){const actual=i6StateChange(s,'focus',1);if(actual)r.traitConsequences6.push({trait:traits.find(n=>I6_TRAITS.get(n).event==='engagement'),key:'focus',delta:actual});}if(f.distance&&c.related){for(const name of ['Long Stride Tendency','Short Stride Tendency'])apply(name,'timing',-1);}
 if(f.engagement)s.i6LastEngagedAttempt=s.attempts??s.stepIndex;
 r.traitNarratives6=traits.map(name=>i6TraitNarrative(h,name,c,f)).filter(Boolean);return f;
}
const I6_AFTER=t2xAfterAttempt;
t2xAfterAttempt=function(h,s,e,r,c,observation){I6_AFTER(h,s,e,r,c,observation);if(r.resultIndex<=1){const t=t2horse(h);t.completedExerciseIds6 ||= [];if(!t.completedExerciseIds6.includes(e.id))t.completedExerciseIds6.push(e.id);}r.jumpObservation=observation;r.events6 ||= [];
 // Attribute an existing resolved technical error to an eligible check, without a second failure roll.
 if(r.resultIndex===3){const eligible=(r.probabilities?.technical?.traits||[]).filter(x=>x.value>0&&x.event!=='learn');if(eligible.length){const cause=eligible[Math.floor(tbRandom(h,s,'trait-cause:'+s.attempts)*eligible.length)];r.events6.push(cause.name==='Drifts Left to Fences'?'driftLeft':cause.name==='Drifts Right to Fences'?'driftRight':cause.event);}}
 if(r.resultIndex<=1){const engagement=i6Check(h,'engagement',c).reduce((n,x)=>n+x.value,0);r.engaged6=engagement>0&&tbRandom(h,s,'engagement:'+s.attempts)*100<50+engagement;}
 if(i6Traits(h).includes('Careful but Slow')&&c.jump&&r.resultIndex<=1){const extra=e.duration*.05;s.elapsed+=extra;r.elapsed=s.elapsed;r.slowerPace6=extra;}
 i6ResolveTraitEffects(h,s,r,c);if(c.newArrival)s.i6ArrivalChecked=true;
 const text=r.traitNarratives6.slice(0,2).map(x=>x.text).join(' ');if(text)r.text+=' '+text;
};
// Existing travel, veterinary and handling callers share the canonical numerical rules.
individualResponse=function(h,event,c={},key='ordinary'){const context=i6Context(c),rules=i6Check(h,event,context),personality=t2personality(h,event,context),modifier=clamp(rules.reduce((n,r)=>n+r.value,0)+personality,-18,18);return {modifier,rules,kind:'contextual',narrative:''};};
function i6HandlingCooperation(h,farrier,tension){const c={farrier,hoof:farrier,standing:true},rules=i6Check(h,farrier?'farrier':'mount',{...c,eventAliases:farrier?['hoof','mount']:[]}),uncertainty=tbTier(rrHorse(h).learned['Handling Confidence'],[8,5,2,0,-4]),pp=(farrier?85:80)-clamp(rules.reduce((n,r)=>n+r.value,0),-24,24)-uncertainty-(tension>=50?10:0)+Math.min(10,(h.hoofHealth?.handling||0)*2);return clamp(pp,15,98)/100;}
function i6GroomResponse(h,roll,sensitive){const profile=i6Check(h,'groom',{groom:true}),modifier=profile.reduce((n,r)=>n+r.value,0),uncertainty=tbTier(rrHorse(h).learned['Handling Confidence'],[8,5,2,0,-4]),calm=clamp((sensitive?.62:.70)-(modifier+uncertainty)/100,.15,.95),restless=roll>=calm+.15,response=roll<calm?'stands calmly':roll<calm+.15?'lowers its head and relaxes':roll<.95?'shifts its feet':roll<.99?'moves away from a sensitive area':'needs a pause before continuing';h.groomingResponse6={roll,chance:1-calm,response,restless,priorRestless:h.groomingResponse6?.restless===true};return response;}
const I6_GROOM=groomingAction;
groomingAction=function(h,...args){const text=I6_GROOM(h,...args);if(args[0]!=='brush')return text;const actual=h.groomingResponse6;if(!actual)return text;const a=groomingEnsure(h),s={id:'groom:'+h.id+':'+csDay()+':'+a.history.length,discipline:'groundwork',exerciseId:'groom',createdHour:pastureCalendarHour()},c={groom:true,completed:true},f={success:!actual.restless,failed:actual.restless,groom:actual.restless},n=i6TraitNarrative(h,'Sensitive to Grooming',c,f);if(n)groomingRecord(h,n.text);if(actual.priorRestless&&!actual.restless)i6Recovery(h,s,'calmer-groom','grooming',{completed:true,improvedHandling:true});return n?text+' '+n.text:text;};
const I6_BREAK=t2break;
t2break=function(h,s,...args){const before=s.tension||0,elapsed=s.elapsed,result=I6_BREAK(h,s,...args);if(s.elapsed===elapsed||!s.incidents?.length||before<=s.tension)return result;const c={disturbed:true,completed:true},traits=i6Check(h,'settling',c),chance=50+traits.reduce((n,r)=>n+r.value,0);if(traits.length&&tbRandom(h,s,'settling:'+s.elapsed)*100<chance){const drop=Math.min(s.tension,2);s.tension-=drop;if(drop>0)s.log.push({kind:'Settling',text:`${h.name} regains composure shortly after the disturbance.`,delta:-drop});}return before-s.tension;};
// Learning quotes are selected only after authoritative deltas have been committed.
const I6_COMMIT=tbCommit;
tbCommit=function(h,s,event){const result=I6_COMMIT(h,s,event);const positive=Object.entries(event.changes).filter(([stat,c])=>(/Avoidance|Sensitivity|Anticipation/.test(stat)?-c.delta:c.delta)>0);if(positive.length&&!['incident','spook-recovery'].includes(event.type)){const name=i6Traits(h).find(n=>n==='Quick Learner'||n==='Slow Learner');if(name){const text=I6_TRAITS.get(name).quote.replaceAll('[HORSE]',h.name);event.learningTraitNarrative6={trait:name,text};s.log.push({kind:'Learning observation',text,eventId:event.key});}}return result;};
