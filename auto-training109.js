/* Scheduled work runs independently of ordinary readiness gates; active treatment pauses it. */
let auto109Context=null;
function auto109TreatmentReason(h){
 const current=(h.medicalConditions||[]).filter(c=>!c.resolved);
 const condition=current.find(c=>c.hospitalized||(h.rehabilitationPlans||[]).some(p=>p.conditionId===c.id&&p.status==='Active'));
 return condition?'Active treatment: '+(HorseHealth.definition(condition)?.name||'recorded injury')+'.':'';
}
function auto109Running(h){return auto109Context?.horseId===h?.id;}
const AUTO109_STAMINA=autoTrainingStaminaReason;
autoTrainingStaminaReason=function(h,...args){return auto109Running(h)?'':AUTO109_STAMINA(h,...args);};
const AUTO109_ELIGIBILITY=t2eligibility;
t2eligibility=function(h,e,...args){return auto109Running(h)?auto109TreatmentReason(h):AUTO109_ELIGIBILITY(h,e,...args);};
const AUTO109_WEATHER=t2weatherRestriction;
t2weatherRestriction=function(...args){return auto109Context?'':AUTO109_WEATHER(...args);};
const AUTO109_BEFORE=t2xBeforeAttempt;
t2xBeforeAttempt=function(h,s,e){if(s.autoPolicy109&&auto109Running(h)){const reason=auto109TreatmentReason(h);return reason?{blocked:true,message:reason}:null;}return AUTO109_BEFORE(h,s,e);};
const AUTO109_SCHEDULE=t2scheduleRun;
t2scheduleRun=function(h,hour){
 const t=t2horse(h),day=Math.floor(hour/24),plan=t.schedule?.[day%7];
 if(!t.scheduleEnabled||hour%24!==9||t.lastScheduleDay===day||!plan||['Rest','Turnout'].includes(plan.activity)||h.deceased)return;
 if(plan.mode==='Manual')return AUTO109_SCHEDULE(h,hour);
 t.lastScheduleDay=day;const reason=auto109TreatmentReason(h),note=text=>{t.scheduleHistory ||= [];t.scheduleHistory.push({hour,text});t.scheduleHistory=t.scheduleHistory.slice(-100);};
 if(reason){note('Automatic training paused. '+reason);autoTrainingStatus(h,hour,'Postponed',reason,{progress:{},stamina:{used:0}});return;}
 let discipline=t2scheduleDiscipline(plan),exercise=t2scheduledExercise(plan),lesson=t2state().plans.find(p=>'plan:'+p.id===plan.exerciseId)?.lesson||[exercise?.id];
 lesson=lesson.filter(id=>t2exercise(id)&&t2disciplineExercise(t2exercise(id),discipline));
 const ground=h.age<3||h.requiresBreakingIn||h.retiredForever||h.retiredToBreeding||['Light Exercise','Recovery Walk'].includes(plan.activity);
 if(ground||!lesson.length){discipline='groundwork';lesson=['leading'];note('Automatic trainer selected suitable groundwork.');}
 exercise=t2exercise(lesson[0]);const facility=t2facilities().find(f=>f.id===plan.facilityId)||t2facilities()[0],beforeContext=auto109Context,beforeHour=careSimulationHour;
 auto109Context={horseId:h.id};careSimulationHour=hour;
 const previousMood=h.mood,rng={seed:t2mixSeed(stableTextHash(h.id+'|auto-mood|'+day))||1};let draw=t2random(rng),workingMood=previousMood;for(const [mood,weight] of Object.entries(careMoodDistribution(h))){workingMood=mood;if((draw-=weight)<=0)break;}workingMood=h.pastureMoodUntil>hour?h.pastureMood:workingMood;h.mood=workingMood;
 try{
  const s=t2newSession(h,{discipline,disciplineSkill:ground?'':plan.disciplineSkill||'',goal:plan.goal||'Responsiveness',exerciseId:exercise.id,lesson,location:facility?.location||'Indoor',facilityId:facility?.id||'indoor',length:35,hour});s.automatic=true;s.autoPolicy109=true;s.riderAid='None';s.difficulty=plan.intensity==='Challenging'?1:plan.intensity==='Light'?-1:0;
  t2automaticWarmup(h,s,Math.max(...lesson.map(id=>t2exercise(id).intensity)));if(!s.finished)s.phase='main';
  for(let n=0;n<8&&!s.finished;n++){if(auto109TreatmentReason(h))break;s.exerciseId=lesson[n%lesson.length];const result=t2attempt(h,s);if(result?.blocked){s.log.push({kind:'Automatic training',text:result.message,elapsed:s.elapsed});break;}}
  const report=t2finish(h,s),status=s.attempts?'Completed':'Stopped';t2state().lastAutoReport=report;autoTrainingStatus(h,hour,status,s.attempts?'Scheduled '+plan.activity+': '+s.attempts+' actual attempts.':report.safetyStop||'The lesson ended during preparation.',{reportId:report.id,progress:{...report.progress},stamina:report.stamina,goal:report.mainGoal?.goal});note('Scheduled '+plan.activity+': '+s.attempts+' actual attempts.');
 }finally{if(h.mood===workingMood)h.mood=previousMood;auto109Context=beforeContext;careSimulationHour=beforeHour;}
};
function calendar109JumpOff(event){return HorseHealth.roll(HorseHealth.hash(event.classId||event.id),'calendar-jump-off109')<.55;}
const CALENDAR109_CAREER=careerEvent;
careerEvent=function(definition,...args){const event=CALENDAR109_CAREER(definition,...args);if(event.discipline==='jumping'&&!definition.team&&definition.tier>=1&&definition.jumpOff==null)event.rules.jumpOff=calendar109JumpOff(event);return event;};
const CALENDAR109_GENERATE=createBarnShowEvent;
createBarnShowEvent=function(...args){const event=CALENDAR109_GENERATE(...args);if(event?.discipline==='jumping'&&event.rules?.format==='Standard')event.rules.jumpOff=calendar109JumpOff(event);return event;};
const CALENDAR109_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const out=CALENDAR109_LOAD(...args),now=pastureCalendarHour();for(const e of [...(app.barnShows||[]),...(app.upcomingEvents||[]),...Object.values(app.management?.calendarEventRegistry||{})])if(e?.gameHosted&&e.discipline==='jumping'&&e.rules?.format==='Standard'&&e.at>=now&&!e.entries?.length&&!e.registeredEntries?.length&&e.id!==app.activeShow?.eventId)e.rules.jumpOff=calendar109JumpOff(e);return out;};
const AUTO109_SCHEDULE_MARKUP=t2scheduleMarkup;
t2scheduleMarkup=function(...args){return AUTO109_SCHEDULE_MARKUP(...args).replace('<summary>Weekly Training Schedule</summary>','<summary>Weekly Training Schedule</summary><p class="small">Automatic sessions run unless an injury has active veterinary treatment. Other readiness limits still apply to manual training.</p>');};
