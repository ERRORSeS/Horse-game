/* An additional first-season tryout allows real results before the annual May trials. */
const FED93_PLAN=federationPlan;
federationPlan=function(...args){
  const plan=FED93_PLAN(...args);
  if(!plan || plan.year!==1)return plan;
  const existing=app.career?.federations?.seasons?.[plan.id];
  if(existing && !existing.trialIds?.some(id=>id.endsWith(':opening-93')))return plan;
  const index=FEDERATION_DIVISIONS[plan.discipline].indexOf(plan.division);
  const at=pastureCalendarHour(1,1,8+index*3,12),date=pastureDate(at);
  const opening={...plan.trial,id:plan.trial.id+':opening-93',name:plan.trial.name.replace(' · Round 1','')+' · Year 1 Opening Tryout',
    at,date,openingTrial93:true,federationTrialRound:3};
  if(opening.phaseSchedule)opening.phaseSchedule={dressage:at,'cross-country':at+4,showjumping:at+6};
  plan.openingTrial93=opening;
  plan.trials=[...plan.trials,opening];
  return plan;
};
function federation93OpeningWindow(plan,hour){
  return !!plan?.openingTrial93 && hour>=plan.opens && hour<=plan.openingTrial93.at-48;
}
const FED93_APPLY=federationApply;
federationApply=function(plan,horse,rider=careerRider(),hour=pastureCalendarHour()){
  const result=FED93_APPLY(plan,horse,rider,hour);
  if(result.ok && federation93OpeningWindow(plan,hour)){
    result.application.openingEntry93=true;
    federationTransition(result.application,'Trial Invited',hour);
  }
  return result;
};
const FED93_REGISTER=federationRegisterTrial;
federationRegisterTrial=function(planId,rider=careerRider(),trialId=null){
  if(!trialId){
    const plan=federationPlans(app.year,rider.country).find(p=>p.id===planId);
    trialId=plan?.trials.filter(t=>t.at>=pastureCalendarHour()&&!careerState().meets[t.id]?.results.some(r=>r.riderId===rider.id))
      .sort((a,b)=>a.at-b.at)[0]?.id;
  }
  return FED93_REGISTER(planId,rider,trialId);
};
