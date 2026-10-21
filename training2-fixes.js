/* Small presentation, reward-floor and refresh fixes. The lesson/incident engines stay intact. */
function t2refreshDiscipline(draft,h){
 const eligible=T2_EXERCISES.filter(e=>t2disciplineExercise(e,draft.discipline)&&!t2eligibility(h,e,{height:.5,location:t2facilities().find(f=>f.id===draft.facilityId)?.location||'Outdoor'}));
 draft.lesson=(draft.lesson||[]).filter(id=>eligible.some(e=>e.id===id));
 if(draft.discipline!=='lunging')draft.lesson=draft.lesson.filter(id=>!id.startsWith('lunge-'));
 if(!draft.lesson.length){const preferred=draft.discipline==='lunging'?'lunge-walk':['flatwork','dressage'].includes(draft.discipline)?'large-circle':['jumping','hunter','eventing'].includes(draft.discipline)?'crossrail':'leading';draft.lesson=[eligible.find(e=>e.id===preferred)?.id||eligible.find(e=>draft.discipline==='lunging'||!e.id.startsWith('lunge-'))?.id].filter(Boolean);}
}
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
