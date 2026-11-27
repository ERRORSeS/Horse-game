/* Transient execution locks must not strand a saved interactive round. */
function showRepairInteractive111(show){
 const s=show?.rpg;if(show?.stage!=='ride'||!s)return;
 delete s._resolving;delete show.quickRunning;app.competitionRpg=s;
 const state=c7State(s),key=s.stepIndex+':'+(state.representations[s.stepIndex]||0),entry=state.ledger[key];
 if(entry){const record=(s.choiceRecords||[]).find(r=>r.id===entry.id);if(record)s.awaitingAdvance=true;else if(entry.pending)delete state.ledger[key];}
}
function lessonSchooling111(h,barn){
 if(h.lessonSchoolingVersion111||h.isLeased||lessonActiveLease(h))return h;
 // Stable variation in education, independent of the scope draw and breed/coat.
 const random=coat94Rng(h.id+':lesson-schooling111'),stars=clamp(Number(barn?.lessonsStars)||3,1,5),roll=random();
 const high=stars>=5?.12:stars>=4?.045:stars>=3?.002:0;
 const middle=stars>=4?.50:stars>=3?.28:.12;
 const range=roll<high?[70,94]:roll<high+middle?[40,69]:[8,39];
 for(const [d,stats]of Object.entries(h.stats||{})){
 const skill=range[0]+random()*(range[1]-range[0]),cap=h.potential?.[d]??100;
 for(const key of Object.keys(stats))stats[key]=Math.round(clamp(skill+(random()-.5)*6,5,cap));
 }
 const age=Number(h.age)||0;
 if(age<7){const caps=age<5?{jumping:3,dressage:2,eventing:2,hunter:2}:{jumping:6,dressage:5,eventing:4,hunter:4};h.careerLevelCaps||={};for(const [d,cap]of Object.entries(caps))h.careerLevelCaps[d]=Math.min(h.careerLevelCaps[d]??cap,cap);}
 h.lessonSchoolingVersion111=1;return h;
}
const LESSON111_CREATE=createLessonHorse;
createLessonHorse=function(barn){let h;for(let attempt=0;attempt<20;attempt++){h=LESSON111_CREATE(barn);if(breed94Athlete(h)?.ridden!==false&&Breed94.get(h.breed)?.ridden!==false)return lessonSchooling111(h,barn);}throw Error('Unable to select a suitable ridden lesson horse.');};
const LESSON111_ROSTER=ensureLessonRosterForBarn;
ensureLessonRosterForBarn=function(barn,...args){const roster=LESSON111_ROSTER(barn,...args);for(const h of roster||[])lessonSchooling111(h,barn);return roster;};
const INTERACTIVE111_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const out=INTERACTIVE111_LOAD(...args);showRepairInteractive111(app.activeShow);return out;};
