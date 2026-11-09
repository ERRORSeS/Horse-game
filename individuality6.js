/* Individuality 6: shared, authoritative learned values and event-owned probabilities. */
const I6_BANDS=Object.freeze([
 [0,2,4,4,4,4],[3,10,5,7,4,6],[11,20,8,11,6,9],[21,30,12,15,9,12],
 [31,40,16,20,13,17],[41,50,21,26,17,22],[51,60,27,34,23,30],
 [61,70,35,43,31,40],[71,75,44,50,41,48],[76,80,51,60,50,60],
 [81,90,67,74,67,74],[91,95,75,84,75,84],[96,100,94,98,94,98]
]);
const I6_BAND_LABELS=['Very little learned avoidance','Generally willing, occasional avoidance','Mild reluctance','Occasional recurring refusal','Noticeable but manageable','Established, inconsistent refusal pattern','Frequent avoidance','Significant reluctance','Strong avoidance','Very strong avoidance','About two-thirds or more of attempts avoided','Very severe avoidance','Almost every attempt avoided'];
function i6Band(value){const score=clamp(Number(value)||0,0,100);return I6_BANDS.find(r=>score<=r[1])||I6_BANDS.at(-1);}
getBaseAvoidanceRisk=function(value,context='training'){const score=clamp(Number(value)||0,0,100),r=i6Band(score),i=context==='competition'?4:2;return r[i]+clamp((score-r[0])/Math.max(1,r[1]-r[0]),0,1)*(r[i+1]-r[i]);};
function i6Rider(s={}){return s.riderProfile||rrSettings();}
fenceAvoidanceOverLevel=function(s={}){const rider=i6Rider(s),height=parseFloat(s.setup?.height??competitionLevel(s.discipline,s.level)),experience=parseFloat(rider.experience?.jumping);if(!Number.isFinite(height)||!Number.isFinite(experience)){const d=s.discipline,current=levelIndex(d,rider.experience?.[d]),target=levelIndex(d,s.level);return current>=0&&target>=0?Math.min(3,Math.max(0,target-current))*2:0;}const levels=SHOW_LEVELS.jumping.map(parseFloat),at=v=>{const n=levels.findIndex(x=>x>=v-.00001);return n<0?levels.length:n;};return Math.min(3,Math.max(0,at(height)-at(experience)))*2;};
fenceAvoidanceProfile=function(h,s={}){
 const b=rrHorse(h).learned,score=b['Learned Fence Avoidance'],row=i6Band(score),competition=s.refusalContext==='competition'||!!s.liveShowId||!!s.steps;
 const rider=i6Rider(s),trust=s.riderProfile?b['Rider Trust in Aids']:tb51EffectiveTrust(h),tension=s.warmupState?.tension??s.tension??0;
 const parts={base:getBaseAvoidanceRisk(score,competition?'competition':'training'),rider:({Beginner:4,Novice:2,Intermediate:0,Advanced:-2,Professional:-4})[rider.level]??0,height:fenceAvoidanceOverLevel(s),confidence:tbTier(b['Jump Confidence'],[5,3,1,0,-2]),trust:tbTier(trust,[3,2,1,0,-1]),tension:tension<25?-2:tension<65?0:tension<80?2:4,traits:clamp(Number(s.qualifyingRefusalTraitModifier)||0,-4,4)};
 const bounds=score>=96?[92,99]:score>=81?[65,90]:[1,80],chance=clamp(Object.values(parts).reduce((n,x)=>n+x,0),...bounds),label=I6_BAND_LABELS[I6_BANDS.indexOf(row)];
 return {score,band:I6_BANDS.indexOf(row),label,min:row[competition?4:2],max:row[competition?5:3],base:parts.base,chance,modifier:chance,parts,bounds,over:parts.height,experience:rider.experience?.jumping,context:competition?'competition':'training'};
};
function i6PoleEligible(h,e,s){return e.category==='Polework'&&rrHorse(h).learned['Learned Fence Avoidance']>=96;}
function i6ResilienceMultiplier(n){return n<3?1.25:n<5?1.10:n<7?1:n<9?.75:.5;}
function individualityLearningDelta(h,s,event,stat,delta){
 if(stat==='Learned Spook Sensitivity'&&delta<0&&event.type!=='spook-recovery')return 0;
 if(stat==='Learned Fence Avoidance'&&delta>0){
  const f=event.flags||{},incident=event.incident||event.relatedIncident;
  if(!(event.type==='welfare'||event.type==='incident'||incident||f.misconduct||f.punished||f.repeatedRefusals||f.repeatedErrors||f.approachError&&event.failed||f.medicalConcern&&event.failed))return 0;
  return Math.round(delta*i6ResilienceMultiplier(t2horse(h).attributes['Fence Resilience'])*4)/4;
 }
 const positive=/Avoidance|Sensitivity|Anticipation/.test(stat)?delta<0:delta>0;
 if(positive&&!['incident','spook-recovery'].includes(event.type)&&!event.flags?.recoveryMilestone){
  const traits=typeof i6Traits==='function'?i6Traits(h):t2horse(h).traits;
  delta*=traits.includes('Quick Learner')?1.15:traits.includes('Slow Learner')?.8:1;
  if(event.clean&&event.jumping&&s.i6LastEngagedAttempt===event.attempt&&traits.includes('Enjoys Jumping'))delta*=1.10;
 }
 return Math.round(delta*10000)/10000;
}
function i6Recovery(h,s,id,concern,facts={}){
 if(!rrEnabled()||!facts.completed||!(facts.composed||facts.calmWaiting||facts.improvedHandling||facts.settled))return null;
 const e=tbEvent(h,s,'spook-recovery:'+id,'spook-recovery',{concern,flags:{...facts}});if(!e)return null;
 const b=rrHorse(h);b.environmentLearning6 ||= {};const history=b.environmentLearning6[concern] ||= {positive:0,sequences:0};history.positive++;
 const roll=tbRandom(h,s,e.key+'|recovery'),delta=roll<.25?-1:roll<.75?-.5:0;
 tbApply(h,s,e,'Learned Spook Sensitivity',delta);
 if(history.positive%3===0){history.sequences++;e.flags.recoveryMilestone=true;if(tbRandom(h,s,e.key+'|milestone')<.4)tbApply(h,s,e,'Learned Spook Sensitivity',-1);}
 const keys=Object.keys(b.environmentLearning6);for(const key of keys.slice(0,-40))delete b.environmentLearning6[key];
 const decreased=(e.changes['Learned Spook Sensitivity']?.delta||0)<0;
 e.observation=facts.settled?`${h.name} settles after the initial reaction.`:facts.composed?`${h.name} notices the distraction but remains composed.`:decreased?'The completed exercise produces a small reduction in learned sensitivity.':'';
 if((facts.previousReaction||history.previousReaction)&&facts.composed&&decreased)e.observation+=' The horse responds more calmly than during its previous encounter with the same situation.';
 if(e.observation)e.narrated=true;tbCommit(h,s,e);if(e.observation){s.rrNarrative=e.observation;s.log.push({kind:'Environmental recovery',text:e.observation,eventId:e.key});}return e;
}
const I6_SPOOK=tb51SpookProfile;
tb51SpookProfile=function(h,s,stimulus){const p=I6_SPOOK(h,s,stimulus);if(!stimulus)return p;const c=typeof i6EnvironmentContext==='function'?i6EnvironmentContext(s,stimulus):{},traits=typeof i6Check==='function'?i6Check(h,'spook',c):[];p.traits=traits;p.traitModifier=clamp(traits.reduce((n,r)=>n+r.value,0),-18,18);p.chance=clamp(p.chance+p.traitModifier,0,65);return p;};
const I6_ATTEMPT=t2attempt;
t2attempt=function(h,s){const before=s.attempts||0,previousStimuli=new Set(Object.keys(s.behavior5?.balance51?.stimuli||{})),record=I6_ATTEMPT(h,s);if((s.attempts||0)<=before||record?.blocked)return record;if(record?.incident?.spookRelated){const concern=String(record.incident.stimulus?.source||'recorded-spook'),b=rrHorse(h);b.environmentLearning6 ||= {};const history=b.environmentLearning6[concern] ||= {positive:0,sequences:0};history.previousReaction=true;if(record.incident.severity>=2&&history.positive>=3){record.text+=' The horse reacts strongly despite several previous positive experiences.';}}if(record?.incident?.spookRelated&&!record.traitNarratives6&&typeof i6ResolveTraitEffects==='function'){record.events6 ||= [];record.events6.push('spook');i6ResolveTraitEffects(h,s,record,i6EnvironmentContext(s,record.incident.stimulus));const quote=record.traitNarratives6[0]?.text;if(quote)record.text+=' '+quote;}const state=tb51State(h,s),stimuli=Object.entries(state.stimuli||{}),last=stimuli.findLast(([key,v])=>v&&v.occurred===false&&!v.recovered6&&!previousStimuli.has(key));
 if(last&&!record?.incident?.spookRelated){last[1].recovered6=true;i6Recovery(h,s,'attempt:'+s.attempts,last[1].stimulus?.source||last[0].split(':')[0],{completed:true,composed:true});}
 else if(['standing','tying','desensitize'].includes(s.exerciseId)&&record?.resultIndex<=1)i6Recovery(h,s,'wait:'+s.attempts,'calm-waiting:'+s.facilityId,{completed:true,calmWaiting:true});
 if(record?.jumpAttempt){const pole=i6PoleEligible(h,t2exercise(s.exerciseId),s),refused=['refusal','runout','abandoned-approach'].includes(record.event),clean=record.resultIndex<=1;let text=pole&&refused?`${h.name} avoids the ground-pole exercise before completing the line.`:pole&&clean?'The horse completes the poles despite its established avoidance.':refused&&s.exerciseId==='vertical'&&Number(s.setup?.height)<=.7?`${h.name} stops before the small vertical despite the modest height.`:clean&&t2exercise(s.exerciseId)?.category==='Jumping'?`${h.name} clears another fence without hesitation.`:'';if(text){record.individualityNarrative6=text;record.text+=' '+text;}}
 return record;
};
const I6_RECOVERY=tbRecovery;
tbRecovery=function(h,s,action){const prior=(s.incidents||[]).findLast(i=>i.spookRelated),before=s.tension||0,e=I6_RECOVERY(h,s,action);if(e&&prior&&(s.tension||0)<before)i6Recovery(h,s,e.key,prior.stimulus?.source||'recorded-spook',{completed:true,settled:true});return e;};
const I6_BASE_HORSE=baseHorse;
baseHorse=function(...args){const h=I6_BASE_HORSE(...args);h.individualityVersion6=true;return h;};
const I6_PREGNANCY=processPregnancy;
processPregnancy=function(mare,newborns,...args){if(!mare||!(mare.pregnantBy||mare.pregnantEmbryo))return I6_PREGNANCY(mare,newborns,...args);const from=newborns.length,sire=app.horses.find(h=>h.id===mare.pregnantEmbryo?.sireId||h.name===mare.pregnantBy),a=t2horse(mare).attributes['Fence Resilience'],b=sire?t2horse(sire).attributes['Fence Resilience']:5,result=I6_PREGNANCY(mare,newborns,...args);for(const foal of newborns.slice(from))t2horse(foal).attributes['Fence Resilience']=Math.round(clamp((a+b)/2+(HorseHealth.roll(HorseHealth.hash(foal.id),'resilience-inherit')-.5)*2,0,10)*10)/10;return result;};
// Reuse the existing roleplay editor and save action; no new training controls.
const I6_SETTINGS=renderSettings;
renderSettings=function(...args){const result=I6_SETTINGS(...args),box=document.querySelector('[data-rr-save]')?.parentElement;if(!box)return result;const editor=box.querySelector('[data-rr-natural]')?.closest('details');if(editor){for(const h of app.horses){const label=document.createElement('label');label.textContent=h.name+' — Fence Resilience';const input=document.createElement('input');Object.assign(input,{type:'number',min:'0',max:'10',step:'.1',value:t2horse(h).attributes['Fence Resilience']});input.dataset.rrResilience=h.id;label.appendChild(input);editor.appendChild(label);}const save=box.querySelector('[data-rr-save]'),old=save.onclick;save.onclick=function(...event){for(const input of editor.querySelectorAll('[data-rr-resilience]')){const h=app.horses.find(h=>h.id===input.dataset.rrResilience);if(h)t2horse(h).attributes['Fence Resilience']=clamp(Number(input.value)||0,0,10);}return old.apply(this,event);};}return result;};
function i6NegativeFenceEvent(event){const f=event.flags||{};return event.type==='welfare'||event.type==='incident'||!!event.incident||!!event.relatedIncident||f.misconduct||f.punished||f.repeatedRefusals||f.repeatedErrors||f.approachError&&event.failed||f.medicalConcern&&event.failed;}
