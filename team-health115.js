/* Reassess current-year health-only rejections without replaying trials or results. */
function federationRepairHealth115(){
 const w=app.career;if(!w||w.teamHealthVersion115)return;
 const state=federationState(),now=pastureCalendarHour();
 for(const a of Object.values(state.applications||{})){
 if(a.year!==app.year||!/medical|health|illness|restriction/i.test(a.reason||''))continue;
 const plan=federationPlan(a.year,a.country,a.discipline,a.division),rider=federationPlayer(a),horse=federation90Horse(a.horseId);
 if(!plan||!rider||!horse||federation90Issue(plan,rider,horse,now,'development'))continue;
 if(now>=plan.selection)federation90Select(plan,now,'Health-neutral selection correction');
 else{delete a.reason;federationTransition(a,'Under Review',now);federationReview(plan,now);}
 }w.teamHealthVersion115=1;
}
const TEAM115_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const out=TEAM115_LOAD(...args);federationRepairHealth115();return out;};
