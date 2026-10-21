/* Small presentation, reward-floor and refresh fixes. The lesson/incident engines stay intact. */
function t2canonicalDiscipline(value){const key=String(value||'').toLowerCase().replace(/[^a-z]/g,'');return ({showjumping:'jumping',jumping:'jumping',hunters:'hunter',hunter:'hunter',flatwork:'flatwork',dressage:'dressage',eventing:'eventing',groundwork:'groundwork',lunging:'lunging',ridden:'flatwork',polework:'polework',mixed:'mixed'})[key]||'flatwork';}
function t2refreshDiscipline(draft,h){
 draft.discipline=t2canonicalDiscipline(draft.discipline);
 // Category membership is independent of temporary eligibility. Never destroy a
 // saved lesson because lunging equipment, fatigue, or a medical restriction is active.
 const catalog=T2_EXERCISES.filter(e=>t2disciplineExercise(e,draft.discipline));
 draft.lesson=(draft.lesson||[]).filter(id=>catalog.some(e=>e.id===id));
 if(!draft.lesson.length){const preferred=draft.discipline==='lunging'?'lunge-walk':['flatwork','dressage','mixed'].includes(draft.discipline)?'large-circle':draft.discipline==='polework'?'ground-pole':['jumping','hunter','eventing'].includes(draft.discipline)?'crossrail':'leading';const setup={height:.5,discipline:draft.discipline,location:t2facilities().find(f=>f.id===draft.facilityId)?.location||'Outdoor'};const available=catalog.filter(e=>!t2eligibility(h,e,setup));draft.lesson=[available.find(e=>e.id===preferred)?.id||available[0]?.id||catalog.find(e=>e.id===preferred)?.id||catalog[0]?.id].filter(Boolean);}
}
function t2exerciseOptions(h,discipline,current,setup={},session=null){return T2_EXERCISES.filter(e=>t2disciplineExercise(e,discipline)).map(e=>{const problem=t2eligibility(h,e,{height:.5,...setup,discipline:t2canonicalDiscipline(discipline)},session);let reason=problem;if(reason&&reason.includes('additional jumping education')){const missing=Object.entries(e.prerequisites||{}).filter(([key,min])=>(h.stats?.dressage?.[key]??h.stats?.jumping?.[key]??0)<min);if(missing.length)reason='Requires '+missing.map(([key,min])=>key+' '+min).join(', ');else reason='Requires additional '+(e.category==='Groundwork'?'handling':'riding')+' education.';}return `<option value='${mgEscape(e.id)}' ${e.id===current?'selected':''} ${problem?'disabled':''}>${mgEscape(e.name)}${problem?' — Locked: '+mgEscape(reason):''}</option>`;}).join('');}
function t2ridingEquipmentNotice(h,discipline){if(['groundwork','lunging'].includes(t2canonicalDiscipline(discipline)))return '';const aid=eqSetup(h).trainingAid;if(!['Side Reins','Lunging Surcingle'].includes(aid))return '';return `<p role='status'>${mgEscape(aid)} is still equipped from lunging. Ridden exercises are listed below, but locked until the lunging equipment is removed.</p><button data-t2-action='remove-ground-equipment'>Remove Lunging Equipment for Riding</button>`;}
const T2_FIX_FINISH=t2finish;
t2finish=function(h,s){
 if(!s.finished&&!s.normalSkillMinimumApplied){s.normalSkillMinimumApplied=true;
  // Apply the minimum once to genuinely earned normal skill progress for the lesson.
  // Riding attributes and aid education never receive this floor.
  for(const [name,earned]of Object.entries(s.progress||{})){
   if(name.startsWith('Riding ')||!(earned>0)||earned>=1)continue;
   const needed=1-earned;let actual=0;
   if(name==='Manners'){const before=h.behavior;h.behavior=Math.max(before,Math.min(1000,before+needed*10));actual=(h.behavior-before)/10;if(h.behavior>=500)h.requiresBreakingIn=false;}
   else if(name==='Flatwork Confidence (education)'){const before=h.confidenceFlat||0;h.confidenceFlat=Math.min(100,before+needed);actual=h.confidenceFlat-before;}
   else {const exercise=s.log.find(r=>r.exerciseId&&r.changes?.[name]>0);if(exercise){const e=t2exercise(exercise.exerciseId),group=t2skillGroup(e),before=h.stats[group][name];h.stats[group][name]=Math.max(before,clampSkill(h,t2learningDiscipline(e,s),before+needed));actual=h.stats[group][name]-before;}}
   if(actual>0){s.progress[name]+=actual;s.skillGain+=actual;h.handTrainingSkillGainsThisMonth=(h.handTrainingSkillGainsThisMonth||0)+actual;}
  }
 }
 return T2_FIX_FINISH(h,s);
};
const T2_FIX_SKIP=simulatePastureUntil;
simulatePastureUntil=function(target){const before=pastureCalendarHour(),result=T2_FIX_SKIP(target);if(target<=before)return result;const previous=careSimulationHour;careSimulationHour=target;try{for(const h of app.horses){if(h.deceased)continue;const t=t2horse(h);if(t.lastMoodSkipHour===target)continue;t.lastMoodSkipHour=target;const from=h.mood;
 // Active incident and medical priorities still override ordinary mood selection.
 if(h.pastureMoodUntil>target)h.mood=h.pastureMood;else h.mood=mgResolveMood(h);
 t.moodEvaluatedHour=target;t.lastSkipMood={hour:target,from,to:h.mood};h.managementMoodSources=careCurrentMoodFactors(h);
 }}finally{careSimulationHour=previous;}return result;};
// Restore named ridden variants through the canonical definitions and calculations,
// retaining all original IDs and prerequisite objects in the authoritative registry.
for(const [id,name,source,extra]of [
 ['free-walk','Free Walk','large-circle',{intensity:1,gait:'Walk'}],
 ['working-walk','Working Walk','walk-halt',{intensity:1,gait:'Walk'}],
 ['pace-adjustment','Adjusting Pace','shorten',{}],
 ['forwardness','Forwardness Exercises','walk-trot',{}],
 ['controlled-rhythm','Controlled Rhythm Work','consistent-rhythm',{}],
 ['walk-poles','Walk Poles','ground-pole',{intensity:1,gait:'Walk'}],
 ['pole-serpentine','Pole Serpentine','curved-poles',{}],
 ['pole-gymnastics','Ground Pole Gymnastics','cavaletti',{}],
 ['jump-adjustable-strides','Adjustable Stride Jumping','related',{}],
 ['jump-straightness','Straightness Approaches','vertical',{}],
 ['jump-rhythm','Rhythm Approaches','crossrail',{}],
 ['full-course','Full Jumping Course','course',{}],
 ['eventing-showjumping','Eventing Showjumping Practice','course',{}]
]){if(t2exercise(id))continue;const original=t2exercise(source);if(!original)continue;T2_EXERCISES.push({...original,id,name,canonicalSource:source,prerequisites:{...original.prerequisites},locations:[...original.locations],adjustments:[...original.adjustments],...extra});const mapping=T2X_MAPPING[source]||[original.primary,T2X.defaultGains[0],original.secondary,T2X.defaultGains[1]];T2X_MAPPING[id]=[...mapping];}
