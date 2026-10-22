/* Scheduled training uses the existing lesson engine and daily stamina window. */
function autoTrainingStamina(h,hour=pastureCalendarHour()){
 const t=t2horse(h),day=Math.floor(hour/24);
 if(t.staminaDay==null||t.staminaDay<day){const first=t.staminaDay==null;t.staminaDay=day;t.staminaUsed=first&&day===Math.floor(pastureCalendarHour()/24)?Math.max(0,h.trainingSessionsSinceReset||0):0;h.trainingSessionsSinceReset=t.staminaUsed;}
 const limit=preferredTrainingSessionLimit(h),used=Math.max(0,t.staminaUsed||0);
 return {day,limit,used,remaining:Math.max(0,limit-used)};
}
function autoTrainingConsume(h,hour,id){const t=t2horse(h),state=autoTrainingStamina(h,hour);t.staminaSessionIds=t.staminaSessionIds||[];if(t.staminaSessionIds.includes(id))return false;t.staminaSessionIds.push(id);t.staminaSessionIds=t.staminaSessionIds.slice(-100);t.staminaUsed=Math.min(state.limit,state.used+1);h.trainingSessionsSinceReset=t.staminaUsed;return true;}
function autoTrainingStaminaReason(h,hour){const state=autoTrainingStamina(h,hour);return state.remaining<=0?`Insufficient stamina: ${state.used}/${state.limit} sessions used in the current daily recovery window. Session postponed until recovery.`:'';}
const AUTO_FIX_START=t2start;
t2start=function(h,draft,quick=false){const problem=autoTrainingStaminaReason(h,pastureCalendarHour());if(problem)return {ok:false,message:problem};return AUTO_FIX_START(h,draft,quick);};
const AUTO_FIX_BEFORE=t2xBeforeAttempt;
t2xBeforeAttempt=function(h,s,e){if(!s.staminaStarted){const problem=autoTrainingStaminaReason(h,s.createdHour);if(problem)return {blocked:true,message:problem};s.staminaStarted=true;}return AUTO_FIX_BEFORE(h,s,e);};
const AUTO_FIX_WARMUP=t2warmup;
t2warmup=function(h,s,...args){if(!s.staminaStarted){const problem=autoTrainingStaminaReason(h,s.createdHour);if(problem)return {ok:false,message:problem};s.staminaStarted=true;}return AUTO_FIX_WARMUP(h,s,...args);};
const AUTO_FIX_FINISH=t2finish;
t2finish=function(h,s){if(s.finished)return AUTO_FIX_FINISH(h,s);const already=false,state=autoTrainingStamina(h,s.createdHour),hadWork=Boolean(s.attempts||s.riddenMinutes>0),report=AUTO_FIX_FINISH(h,s);if(!already&&hadWork){autoTrainingConsume(h,s.createdHour,s.id);report.stamina={used:1,before:state.remaining,after:autoTrainingStamina(h,s.createdHour).remaining,limit:state.limit};}return report;};
const AUTO_FIX_MARK=markTrainingSession;
markTrainingSession=function(h,count=1,...args){const hour=pastureCalendarHour(),state=autoTrainingStamina(h,hour),units=Math.max(1,Math.round(Number(count)||1));if(units>state.remaining)return false;AUTO_FIX_MARK(h,count,...args);for(let n=0;n<units;n++)autoTrainingConsume(h,hour,'legacy-'+(++t2state().sequence));return true;};
const AUTO_FIX_CONTROL=trainingControlabilitySession;
trainingControlabilitySession=function(h,...args){const hour=pastureCalendarHour(),problem=autoTrainingStaminaReason(h,hour);if(problem){pushReport(problem);return null;}return AUTO_FIX_CONTROL(h,...args);};
function autoTrainingStatus(h,hour,status,reason,extra={}){const t=t2horse(h);t.autoTrainingHistory=t.autoTrainingHistory||[];const id=h.id+'|'+hour;if(t.autoTrainingHistory.some(r=>r.id===id))return;t.autoTrainingHistory.push({id,hour,status,reason,...extra});t.autoTrainingHistory=t.autoTrainingHistory.slice(-100);}
const AUTO_FIX_SCHEDULE=t2scheduleRun;
t2scheduleRun=function(h,hour){const t=t2horse(h),day=Math.floor(hour/24),plan=t.schedule?.[day%7];if(!t.scheduleEnabled||hour%24!==9||t.lastScheduleDay===day||!plan||['Rest','Turnout'].includes(plan.activity))return;
 if(plan.mode==='Manual'){AUTO_FIX_SCHEDULE(h,hour);return;}
 const stamina=autoTrainingStamina(h,hour),problem=autoTrainingStaminaReason(h,hour);
 if(problem){t.lastScheduleDay=day;autoTrainingStatus(h,hour,'Postponed',problem,{stamina:{used:0,before:0,after:0,limit:stamina.limit}});return;}
 const previousReport=t.history.at(-1)?.id,previousSpan=t.trainingSpan?.ids?.join('|'),previousMood=h.mood;
 // Resolve the same scheduled-hour mood from current care factors and a saved day seed.
 // UI skip-end mood refreshes must not alter the simulated automatic lesson's RNG path.
 const previousSimulationHour=careSimulationHour;careSimulationHour=hour;const rng={seed:t2mixSeed(stableTextHash(h.id+'|auto-mood|'+day))||1};let roll=t2random(rng),mood=previousMood;for(const[key,weight]of Object.entries(careMoodDistribution(h))){mood=key;if((roll-=weight)<=0)break;}const workingMood=h.pastureMoodUntil>hour?h.pastureMood:mood;h.mood=workingMood;
 try{AUTO_FIX_SCHEDULE(h,hour);}finally{if(h.mood===workingMood)h.mood=previousMood;careSimulationHour=previousSimulationHour;}
 const report=t.history.at(-1),newReport=report?.id!==previousReport&&report?.time===hour;
 if(newReport){const productive=report.exercises.some(x=>['Clean/Correct','Correct with minor imperfection','Partial execution','Technical mistake'].includes(x.result)),status=productive?'Completed':'Stopped';autoTrainingStatus(h,hour,status,report.safetyStop||(productive?`${plan.activity}: ${report.exercises.length} exercise attempts completed.`:'Session ended without a completed exercise block. Review the training report.'),{reportId:report.id,stamina:report.stamina,progress:{...report.progress},goal:report.mainGoal?.goal});t2state().lastAutoReport=report;}
 else if(t.trainingSpan?.ids?.join('|')!==previousSpan&&t.trainingSpan?.ids?.includes('light-'+hour)){autoTrainingConsume(h,hour,'light-'+hour);autoTrainingStatus(h,hour,'Completed','Suitable light exercise completed.',{stamina:{used:1,before:stamina.remaining,after:autoTrainingStamina(h,hour).remaining,limit:stamina.limit},progress:{}});}
 else {const reason=t.scheduleHistory?.at(-1)?.hour===hour?t.scheduleHistory.at(-1).text:'No eligible training work was completed.';autoTrainingStatus(h,hour,/postpon|still completing/i.test(reason)?'Postponed':'Skipped',reason,{stamina:{used:0,before:stamina.remaining,after:stamina.remaining,limit:stamina.limit},progress:{}});}
};
const AUTO_FIX_SCHEDULE_MARKUP=t2scheduleMarkup;
t2scheduleMarkup=function(h){let html=AUTO_FIX_SCHEDULE_MARKUP(h),t=t2horse(h),state=autoTrainingStamina(h);const reports=(t.autoTrainingHistory||[]).slice(-12).reverse();const extra=`<p>Stamina: ${state.remaining}/${state.limit} sessions remaining before the next daily recovery. No monthly skill cap.</p><details data-ui-key='auto-training-reports'><summary>Auto-Training Reports</summary>${reports.map(r=>`<div class='box'><p>${mgEscape(pastureDateLabel(r.hour))} — ${r.status}: ${mgEscape(r.reason)}</p><p>Stamina consumed: ${r.stamina?.used||0}; remaining: ${r.stamina?.after??'—'} / ${r.stamina?.limit??'—'}</p>${r.goal?`<p>Main Training Goal: ${mgEscape(r.goal)}</p>`:''}${Object.entries(r.progress||{}).filter(([,v])=>v>0).map(([k,v])=>`<p>${mgEscape(k)}: +${k.startsWith('Riding ')?t2attributeFmt(v):t2skillFmt(v)}</p>`).join('')}</div>`).join('')||'<p>No scheduled sessions have been processed yet. Sessions run at 09:00 on their scheduled days.</p>'}</details>`;return html.replace("<summary>Weekly Training Schedule</summary>","<summary>Weekly Training Schedule</summary>"+extra);};
const AUTO_FIX_REPORT=t2reportMarkup;
t2reportMarkup=function(r){return AUTO_FIX_REPORT(r).replace('<h4>Exercise Summary</h4>',`${r.stamina?`<p>Stamina consumed: ${r.stamina.used}; remaining ${r.stamina.after}/${r.stamina.limit} sessions in the daily recovery window.</p>`:''}<h4>Exercise Summary</h4>`);};
function autoTrainingSelectActivity(plan){if(['Rest','Turnout','Light Exercise','Recovery Walk'].includes(plan.activity))return;const d=t2scheduleDiscipline(plan),saved=t2state().plans.find(p=>'plan:'+p.id===plan.exerciseId),valid=saved?saved.lesson.every(id=>t2disciplineExercise(t2exercise(id),d)):t2disciplineExercise(t2exercise(plan.exerciseId),d);if(valid)return;const defaults={Groundwork:'leading',Lunging:'lunge-walk',Flatwork:'walk-halt',Dressage:'large-circle',Polework:'trot-poles',Jumping:'crossrail',Gymnastics:'gymnastic',Hunters:'hunter-rhythm','Eventing Schooling':'eventing-dressage','Trail Riding':'trail'};plan.exerciseId=defaults[plan.activity]||'leading';}
function autoTrainingExerciseOptions(plan){const d=t2scheduleDiscipline(plan),catalog=T2_EXERCISES.filter(e=>t2disciplineExercise(e,d)),plans=t2state().plans.filter(p=>p.lesson?.length&&p.lesson.every(id=>t2disciplineExercise(t2exercise(id),d))).map(p=>({id:'plan:'+p.id,name:'Lesson Plan: '+p.name})),valid=[...catalog,...plans].some(e=>e.id===plan.exerciseId);return (!valid?`<option value='${mgEscape(plan.exerciseId||'')}' selected>Saved exercise unavailable for this activity — choose a compatible exercise</option>`:'')+t2options([...catalog,...plans],plan.exerciseId);}

const AUTO_FIX_IMPORT=t2importLegacySchedule;
t2importLegacySchedule=function(h){const t=t2horse(h),focus=h.autoTrainingFocus||'';if(t.scheduleEdited&&!t.scheduleEnabled&&focus&&!['None','Rest'].includes(focus)&&t.importedAutoFocus!==focus)t.scheduleEdited=false;return AUTO_FIX_IMPORT(h);};
