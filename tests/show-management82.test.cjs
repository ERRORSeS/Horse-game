const {check}=require('./behavior5-harness.cjs');

check('annual majors use competition classifications and respect championship cycles', `{
  resetGame();
  for(let year=1;year<=8;year++) {
    const rows=show82EventList(year,5,'major');
    if(rows.some(row=>row.tier===11 && row.date.year%row.cycle!==row.edition)) throw Error('championship cycle');
    if(rows.some(row=>!show82Major(row)) || rows.length!==new Set(rows.map(row=>row.id)).size) throw Error('major scope');
  }
  const rows=show82Sort([{event:{id:'a',prestige:10,at:1,prizeMoney:100}},{event:{id:'b',prestige:99,at:2,prizeMoney:0}}],'high');
  if(rows[0].event.id!=='b') throw Error('prestige sorting uses the purse');
  if(!MAJOR_REFERENCE_2026.every(row=>row[1].startsWith('2026-') && row[6].startsWith('https://'))) throw Error('reference metadata');
}`);

check('sandbox classes persist without rank or career money and annual IDs remain stable', `{
  resetGame();
  const h=app.horses[0], country=careerCountry(app.currentBarn?.country);
  careerSetProfile(rrStoreCurrentProfile(),25,country);
  const made=customShowCreate({name:'Harbour Open',venue:'Harbour Arena',country,year:app.year,month:app.month,day:12,duration:1,prestige:100,tier:11,annual:true,
    classes:[{name:'Jumping',discipline:'jumping',level:'0.70',division:'senior',horseAge:0,offset:0,capacity:1,fee:500,prize:25000,npcs:false}]});
  if(!made.ok) throw Error(made.message);
  const events=customShowEvents(pastureCalendarHour(app.year,1,1,0),pastureCalendarHour(app.year+1,12,30,23));
  if(events.length!==2 || events[0].id===events[1].id) throw Error('recurrence');
  const event=events[0];
  if(event.official || event.base || event.entryFee || event.prizeMoney || event.prestige!==100) throw Error('sandbox classification');
  const show=showCreate(h,buildCompetitionRpgSession(h,'jumping','0.70'),event);
  if(show.competitors.length!==1) throw Error('configured field cap');
  const player=show.competitors[0];
  player.scores.showjumping={time:70,faults:0,penalties:0,eliminated:false};
  const cash=app.money, starts=h.showResults.length;
  showCompletePhase(show);showAward(show);showAward(show);
  if(app.money!==cash || h.showResults.length!==starts || !customShowState().results[event.id]) throw Error('sandbox farm');
  hydrateFromSave(JSON.parse(serializeAppState()));
  if(!customShowState().results[event.id] || calendarFindEvent(events[1].id)?.id!==events[1].id) throw Error('custom history lost');
}`);

check('federation applications are gated, idempotent and selected on scheduled milestones', `{
  resetGame(); rrSettings().enabled=true; careerState().settings.progression=true;
  const h=app.horses[0], country=careerCountry(app.currentBarn?.country);
  rrSettings().experience.jumping='1.10';
  careerSetProfile(rrStoreCurrentProfile(),17,country);
  const rider=careerRider(), plan=federationPlan(app.year,country,'jumping','junior');
  h.age=9; h.behavior=900; h.requiresBreakingIn=false; h.illnesses=[]; h.medicalConditions=[];
  for(const key of Object.keys(h.stats.jumping)) h.stats.jumping[key]=100;
  h.potential.jumping=100;
  if(federationApply(plan,h,rider).ok) throw Error('unearned application');
  const now=pastureCalendarHour();
  careerState().meets.fixture={id:'fixture',hour:now-20,discipline:'jumping',tier:4,division:'junior',results:[
    {riderId:rider.id,horseId:h.id,placing:3,score:0,country}]};
  const result=federationApply(plan,h,rider);
  if(!result.ok || federationApply(plan,h,rider).ok) throw Error(result.message || 'duplicate application');
  federationReview(plan,plan.review);
  if(result.application.status!=='Under Review') throw Error('review');
  federationReview(plan,plan.invites);
  if(result.application.status!=='Trial Invited') throw Error('trial invitation');
  careerState().meets[plan.trial.id]={id:plan.trial.id,hour:careerEventEnd(plan.trial),discipline:'jumping',tier:4,division:'junior',results:[
    {riderId:rider.id,horseId:h.id,placing:1,score:0,country}]};
  federationReview(plan,plan.selection);
  if(!result.application.status.startsWith('Selected') || !federationState().seasons[plan.id].members.some(row=>row.riderId===rider.id)) throw Error('selection');
  const snapshot=JSON.stringify(federationState());
  federationReview(plan,plan.selection);
  if(JSON.stringify(federationState())!==snapshot) throw Error('duplicate decision');
}`);
