const {check}=require('./behavior5-harness.cjs');
check('national trials require an invitation and a real placing for championship selection', `{
 for(const outcome of ['missed','eliminated','completed']){
  resetGame();rrSettings().enabled=true;const w=careerState();w.settings.progression=true;w.settings.background=false;w.npcs=[];w.competitionRosterVersion=1;
  careerSetProfile(rrStoreCurrentProfile(),17,'GBR');rrSettings().experience.jumping='1.80';for(const k of RR_ABILITIES)rrSettings().abilities[k]=100;
  const rider=careerRider(),h=app.horses[0],plan=federationPlan(app.year,'GBR','jumping','junior');h.age=9;h.behavior=900;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.legacyMedicalRecords=[];h.potential.jumping=100;for(const key of Object.keys(h.stats.jumping))h.stats.jumping[key]=100;
  if(!careerEligibility(plan.trial,rider,h).includes('invitation'))throw Error('open trial without invitation');
  if(federationApply(plan,h,rider).ok)throw Error('unearned application');
  for(let n=0;n<5;n++)w.meets['regional-'+n]={id:'regional-'+n,hour:pastureCalendarHour()-n-1,discipline:'jumping',tier:3,division:'junior',results:[{riderId:rider.id,horseId:h.id,placing:1,score:0,country:'GBR'}]};
  const application=federationApply(plan,h,rider);if(!application.ok)throw Error(application.message);
  if(federationApply(plan,h,rider).ok)throw Error('duplicate application');
  federationReview(plan,plan.invites);if(application.application.status!=='Trial Invited'||careerEligibility(plan.trial,rider,h))throw Error('trial invitation does not unlock entry');
  if(outcome!=='missed')w.meets[plan.trial.id]={id:plan.trial.id,hour:careerEventEnd(plan.trial),discipline:'jumping',tier:4,division:'junior',results:[{riderId:rider.id,horseId:h.id,placing:outcome==='completed'?1:null,score:outcome==='completed'?0:null,eliminated:outcome==='eliminated',country:'GBR'}]};
  federationReview(plan,plan.selection);
  const status=application.application.status;
  if(outcome==='completed'&&status!=='Selected — Championship Team')throw Error('successful trial blocked');
  if(outcome!=='completed'&&['Selected — Championship Team','Selected — National Squad'].includes(status))throw Error('missing/failed trial earned championship nomination');
  const before=JSON.stringify(federationState());federationReview(plan,plan.selection);if(JSON.stringify(federationState())!==before)throw Error('selection rerolled');
 }
}`);
