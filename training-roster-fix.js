/* Resolve selection against the live owned roster; restrictions affect status, not visibility. */
function t2ownedTrainingHorses(){return (Array.isArray(app.horses)?app.horses:[]).filter(h=>h&&!h.deceased&&!h.sold&&!h.rehomed&&!h.isPastureNPC&&!h.isNPC);}
t2trainingHorses=function(){const owned=t2ownedTrainingHorses(),scope=app.trainingHorseScope||'both',lessons=scope==='private'?[]:(currentBarnLessonHorses()||[]).filter(h=>h&&!h.deceased&&!h.sold&&!h.rehomed);return [...new Map([...owned,...lessons].map(h=>[String(h.id),h])).values()].map(h=>owned.find(o=>String(o.id)===String(h.id))||h);};
t2findHorse=function(id){if(id==null)return null;return t2ownedTrainingHorses().find(h=>String(h.id)===String(id))||(currentBarnLessonHorses()||[]).find(h=>h&&!h.deceased&&String(h.id)===String(id))||null;};
function t2trainingActivity(discipline){const d=t2canonicalDiscipline(discipline);return d==='groundwork'?'Groundwork':d==='lunging'?'Lunging':'Ridden Training';}
function t2horseTrainingStatus(h,discipline,facilityId='outdoor'){
 const d=t2canonicalDiscipline(discipline),activity=t2trainingActivity(d),location=t2facilities().find(f=>f.id===facilityId)?.location||'Outdoor';
 const exercises=T2_EXERCISES.filter(e=>t2disciplineExercise(e,d)&&(d!=='lunging'||e.id.startsWith('lunge-')));
 const reasons=exercises.map(e=>t2eligibility(h,e,{height:.5,location,discipline:d}));
 let reason=reasons.some(r=>!r)?autoTrainingStaminaReason(h,pastureCalendarHour()):reasons[0]||'No exercises are available for this activity.';
 if(!reason&&h.training2?.trainingSpan?.end>pastureCalendarHour())reason='The previous activity is still in progress. Advance time before starting another session.';
 return {activity,available:!reason,reason};
}
function t2repairHorseSelection(){const state=t2state(),horses=t2trainingHorses();if(app.trainingHorseScope==='lesson')app.trainingHorseScope='both';
 if(app.trainingRpg&&!t2findHorse(app.trainingRpg.horseId)){state.unavailableLegacySession=app.trainingRpg;app.trainingRpg=null;state.feedback='The previous session horse is no longer available. Select a current horse.';}
 if(state.session&&!t2findHorse(state.session.horseId)){state.unavailableSession=state.session;state.session=null;state.feedback='The previous session horse is no longer in the current stable. Select a current horse.';}
 const draft=state.draft||(state.draft={discipline:'flatwork',facilityId:'outdoor',length:40,goal:'Responsiveness',lesson:['large-circle']});
 if(!horses.some(h=>String(h.id)===String(draft.horseId)))draft.horseId=t2ownedTrainingHorses().find(h=>t2horseTrainingStatus(h,draft.discipline,draft.facilityId).available)?.id||t2ownedTrainingHorses()[0]?.id||horses.find(h=>t2horseTrainingStatus(h,draft.discipline,draft.facilityId).available)?.id||horses[0]?.id;
 else draft.horseId=horses.find(h=>String(h.id)===String(draft.horseId)).id;
}
function t2horseOptions(horses,draft){return horses.map(h=>{const status=t2horseTrainingStatus(h,draft.discipline,draft.facilityId);return `<option value='${mgEscape(String(h.id))}' ${String(h.id)===String(draft.horseId)?'selected':''}>${mgEscape(h.name||'Unnamed Horse')+(h.isLessonHorse?' [Lesson Horse]':'')} — ${status.activity} ${status.available?'Available':'Unavailable: '+mgEscape(status.reason)}</option>`;}).join('');}
function t2trainingRosterNotice(horses,draft){const ownedIds=new Set(t2ownedTrainingHorses().map(h=>String(h.id))),relevant=ownedIds.size?horses.filter(h=>ownedIds.has(String(h.id))):horses;const statuses=relevant.map(h=>({h,...t2horseTrainingStatus(h,draft.discipline,draft.facilityId)}));if(statuses.some(s=>s.available))return '';const activity=t2trainingActivity(draft.discipline);return `<p role='status'>No horses are currently eligible for ${activity}.</p>${statuses.map(s=>`<p class='small'>${mgEscape(s.h.name)} — ${mgEscape(s.reason)}</p>`).join('')}`;}
const ROSTER_FIX_RENDER=renderTraining;
renderTraining=function(){t2repairHorseSelection();return ROSTER_FIX_RENDER();};
