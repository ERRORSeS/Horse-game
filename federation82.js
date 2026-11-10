// Seasonal national selection uses the same result ledger and eligibility rules as career shows.
const FEDERATION_DIVISIONS = {
  jumping: ['children','pony','junior','young','u25','senior'],
  dressage: ['children','pony','junior','young','u25','senior'],
  eventing: ['pony','junior','young','senior'],
  hunter: ['junior','young','senior']
};
const FEDERATION_LEVELS = {
  jumping: ['0.90','1.00','1.10','1.20','1.30','1.40'],
  dressage: ['Level One','Level Two','Level Three','Level Four','Intermediate','Grand Prix'],
  eventing: ['Pre-Training','Training','Preliminary','Intermediate'],
  hunter: ['Green','Medium','Working']
};
const FEDERATION_POSITIONS = 5;
function federationState() {
  return careerState().federations ||= { seasons: {}, applications: {}, invitations: {} };
}
function federationEnabled() {
  return careerActive() && careerState().settings.federations !== false;
}
function federationPlan(year,country,discipline,division) {
  const index = FEDERATION_DIVISIONS[discipline]?.indexOf(division) ?? -1;
  if (index < 0 || !Object.hasOwn(CAREER_COUNTRIES,country)) return null;
  const id = [year,country,discipline,division].join(':');
  const trial = careerEvent({
    id:'federation-trial-' + [country,discipline,division].join('-'),
    name: CAREER_COUNTRIES[country][0] + ' ' + CAREER_AGE_DIVISIONS[division].label + ' ' + cap(discipline) + ' Selection Trial',
    discipline, division, level:FEDERATION_LEVELS[discipline][index], tier:4, official:true, ranking:'none', base:0,
    prestige:48, month:5, day:8 + index * 3, country, federationTrial:id, minField:4, cutoff:10,
    horseMinAge:5, ...(division === 'pony' ? { ponyCm:148 } : {})
  },year);
  return {id,year,country,discipline,division,trial,
    opens:pastureCalendarHour(year,1,1,0), closes:pastureCalendarHour(year,3,15,23),
    review:pastureCalendarHour(year,3,20,12), shortlist:pastureCalendarHour(year,4,2,12),
    invites:pastureCalendarHour(year,4,8,12), selection:pastureCalendarHour(year,6,4,12),
    expires:pastureCalendarHour(year+1,6,4,12)};
}
function federationPlans(year,country) {
  return Object.entries(FEDERATION_DIVISIONS).flatMap(([discipline,divisions]) =>
    divisions.map(division => federationPlan(year,country,discipline,division)));
}
function federationCountries() {
  return [...new Set((app.riderRealism?.profiles || []).map(profile => profile.career?.country).filter(Boolean))];
}
const FEDERATION_SCHEDULE = careerSchedule;
careerSchedule = function (from,to,...args) {
  const base = FEDERATION_SCHEDULE(from,to,...args);
  if (!federationEnabled()) return base;
  for (let year=pastureDate(from).year; year<=pastureDate(to).year; year++) {
    for (const country of federationCountries()) {
      for (const {trial} of federationPlans(year,country)) if (trial.at >= from && trial.at <= to) base.push(trial);
    }
  }
  return base.sort((a,b) => a.at-b.at || a.id.localeCompare(b.id));
};
function federationRecords(plan,riderId,horseId,until) {
  return careerResults({riderId,horseId,discipline:plan.discipline,from:until-CAREER_HOURS_PER_YEAR,until})
    .filter(row => row.tier >= 2 && row.placing && (row.division === plan.division || plan.division === 'senior' && row.division === 'amateur'));
}
function federationEligibility(plan,rider,horse,hour) {
  if (rider.country !== plan.country) return 'Apply to your sporting federation.';
  if (careerAge(rider,plan.trial.at,true) == null) return 'Set your rider’s age first.';
  if (!horse) return 'Choose a horse for this application.';
  const issue = FEDERATION_ELIGIBILITY(plan.trial,rider,horse);
  if (issue) return issue;
  if (!federationRecords(plan,rider.id,horse.id,hour).some(row => row.placing <= 10)) {
    return 'A verified regional or higher top-ten result with this horse in the division is required.';
  }
  return '';
}
function federationTransition(application,status,hour) {
  if (application.status === status) return;
  application.status = status;
  application.history.push({status,hour});
}
function federationApply(plan,horse,rider = careerRider(),hour = pastureCalendarHour()) {
  if (!federationEnabled() || hour < plan.opens || hour > plan.closes) return {ok:false,message:'Applications are closed.'};
  const state = federationState(), id = plan.id + ':' + rider.id;
  if (state.applications[id]) return {ok:false,message:'An application already exists for this squad.'};
  const issue = federationEligibility(plan,rider,horse,hour);
  if (issue) return {ok:false,message:issue};
  const application = {id,planId:plan.id,riderId:rider.id,riderName:rider.name,horseId:horse.id,horseName:horse.name,
    country:rider.country,discipline:plan.discipline,division:plan.division,year:plan.year,submitted:hour,status:'Submitted',
    history:[{status:'Submitted',hour}]};
  state.applications[id] = application;
  state.invitations[id] && (state.invitations[id].accepted = hour);
  return {ok:true,application};
}
function federationRegisterTrial(planId,rider=careerRider()){
 const plan=federationPlans(app.year,rider.country).find(plan=>plan.id===planId);
 const application=plan&&federationState().applications[plan.id+':'+rider.id];
 if(!application||application.status!=='Trial Invited')return {ok:false,message:'A selection-trial invitation is required for this rider and horse.'};
 const horse=calendarHorseById(application.horseId);
 if(!horse)return {ok:false,message:'The invited horse is unavailable.'};
 return careerEnter(plan.trial,horse);
}
function federationTeamEntries(rider=careerRider(),hour=pastureCalendarHour()){
 if(!federationEnabled())return [];
 const seasons=Object.values(federationState().seasons).filter(season=>season.country===rider.country&&season.members.some(member=>member.riderId===rider.id&&['Selected — National Squad','Selected — Championship Team'].includes(member.status))).sort((a,b)=>b.selectedAt-a.selectedAt);
 const entries=[];if(!seasons.length)return entries;
 for(const event of careerSchedule(hour+24,hour+90*24).filter(event=>event.team||event.games)){
  const season=seasons.find(season=>season.discipline===event.discipline&&season.division===event.division&&season.selectedAt<=event.at&&season.expires>event.at);
  const member=season?.members.find(row=>row.riderId===rider.id&&['Selected — National Squad','Selected — Championship Team'].includes(row.status));
  const horse=member&&calendarHorseById(member.horseId);
  if(horse&&federationNomination(event,rider,horse))entries.push({event,horse});
 }
 return entries;
}
function federationRegisterTeam(eventId,rider=careerRider()){
 const entry=federationTeamEntries(rider).find(entry=>entry.event.id===eventId);
 if(!entry)return {ok:false,message:'An active nomination and an open team competition are required.'};
 return careerEnter(entry.event,entry.horse);
}
function federationScore(plan,rider,horse,hour,trial = null) {
  const npc = !rider.player, records = federationRecords(plan,rider.id,horse.id,hour);
  const finishes = records.filter(row => row.placing <= 10).length;
  const consistency = records.length ? finishes / records.length : 0;
  const skill = npc ? rider.skill : Object.values(rider.abilities).reduce((a,b)=>a+b,0) / RR_ABILITIES.length;
  const readiness = npc ? horse.skills[plan.discipline] : effectiveDisciplineSkill(horse,plan.discipline);
  const rank = careerState().rankings[careerBoardKey('national',plan.discipline,plan.country)]?.find(row=>row.id===rider.id)?.rank;
  const form = trial ? trial.placing ? Math.max(0,1-(trial.placing-1)/12) : 0 : consistency * .6;
  const factors = { results:25*Math.min(1,finishes/5), consistency:20*consistency,
    readiness:.2*readiness, skill:.15*skill, ranking:rank ? 10/(1+(rank-1)/15) : 0, form:10*form };
  return {score:Object.values(factors).reduce((a,b)=>a+b,0),finishes,consistency,readiness,factors};
}
function federationPlayer(application) {
  const profile = app.riderRealism?.profiles.find(row=>row.id===application.riderId);
  if (!profile) return null;
  return {...profile,...profile.career,player:true,professional:profile.level==='Professional'};
}
function federationReview(plan,hour) {
  const state = federationState();
  const applications = Object.values(state.applications).filter(row=>row.planId===plan.id && row.status!=='Withdrawn');
  for (const application of applications) {
    if (hour >= plan.review && application.status==='Submitted') federationTransition(application,'Under Review',plan.review);
    if (hour >= plan.shortlist && application.status==='Under Review') {
      const rider = federationPlayer(application), horse = calendarHorseById(application.horseId);
      const issue = !rider || federationEligibility(plan,rider,horse,plan.shortlist);
      if (issue) application.reason = typeof issue==='string' ? issue : 'The rider profile is unavailable.';
      federationTransition(application,issue ? 'Not Selected' : 'Shortlisted',plan.shortlist);
    }
    if (hour >= plan.invites && application.status==='Shortlisted') federationTransition(application,'Trial Invited',plan.invites);
    const trial = careerState().meets[plan.trial.id]?.results.find(row=>row.riderId===application.riderId && row.horseId===application.horseId);
    if (trial && application.status==='Trial Invited') federationTransition(application,'Trial Completed',careerEventEnd(plan.trial));
  }
  if (hour < plan.selection || state.seasons[plan.id]) return;
  const meet = careerState().meets[plan.trial.id];
  const candidates = (careerRosterIndex().byCountry.get(plan.country)||[]).filter(rider=>rider.specialty===plan.discipline && !rider.retired).flatMap(rider=>{
    const horse = rider.horses.filter(horse=>!FEDERATION_ELIGIBILITY(plan.trial,rider,horse,{npc:true}))
      .sort((a,b)=>b.skills[plan.discipline]-a.skills[plan.discipline])[0];
    return horse ? [{rider,horse}] : [];
  });
  for (const application of applications.filter(row=>['Trial Invited','Trial Completed'].includes(row.status))) {
    const rider=federationPlayer(application), horse=calendarHorseById(application.horseId);
    if (rider && !federationEligibility(plan,rider,horse,plan.selection)) candidates.push({rider,horse,application});
    else federationTransition(application,'Not Selected',plan.selection);
  }
  const ranked = candidates.map(({rider,horse,application})=>{
    const trial = meet?.results.find(row=>row.riderId===rider.id && row.horseId===horse.id);
    return { riderId:rider.id,riderName:rider.name,horseId:horse.id,horseName:horse.name,application,trial,
      ...federationScore(plan,rider,horse,plan.selection,trial) };
  }).filter(row=>row.finishes || row.trial?.placing)
    .sort((a,b)=>b.score-a.score || b.finishes-a.finishes || b.consistency-a.consistency || b.readiness-a.readiness || a.riderId.localeCompare(b.riderId));
  const members = ranked.map(({application,trial,...candidate},index)=>{
    const status = index < 3 && trial?.placing ? 'Selected — Championship Team'
      : index < FEDERATION_POSITIONS ? (trial?.placing ? 'Selected — National Squad' : 'Selected — Development Squad')
      : index === FEDERATION_POSITIONS ? 'Selected — Reserve' : 'Not Selected';
    if (application) {
      application.selection = candidate;
      federationTransition(application,status,plan.selection);
    }
    return {...candidate,status,trialPlace:trial?.placing || null};
  });
  for (const row of applications) if (['Trial Completed','Trial Invited'].includes(row.status)) federationTransition(row,'Not Selected',plan.selection);
  state.seasons[plan.id] = { id:plan.id,year:plan.year,country:plan.country,discipline:plan.discipline,
    division:plan.division,selectedAt:plan.selection,expires:plan.expires,trialId:plan.trial.id,members };
}
function federationAdvance(hour) {
  if (!federationEnabled()) return;
  const state = federationState(), year = pastureDate(hour).year;
  const from = state.cursor ?? careerState().origin;
  if (state.cursor!=null && Math.floor(hour/6)===Math.floor(from/6)) return;
  for (let y=pastureDate(from).year;y<=year;y++) for (const country of federationCountries()) {
    for (const plan of federationPlans(y,country)) {
      if (plan.opens > hour || state.seasons[plan.id]) continue;
      if (state.recruitYear!==year) federationRecruit(plan,hour);
      federationReview(plan,hour);
    }
  }
  state.cursor = hour;
  state.recruitYear = year;
}
const FEDERATION_ADVANCE = careerAdvance;
careerAdvance = function(hour=pastureCalendarHour()) {
  FEDERATION_ADVANCE(hour);
  federationAdvance(hour);
};
const FEDERATION_ELIGIBILITY = careerEligibility;
careerEligibility = function(event,rider,horse,options={}) {
  if (event.federationTrial && rider?.country !== event.federation) return 'This trial is for the host federation.';
  if (event.federationTrial && !options.npc) {
    const appRow = app.career?.federations?.applications[event.federationTrial + ':' + rider?.id];
    if (!appRow || appRow.horseId !== horse?.id || !['Shortlisted','Trial Invited','Trial Completed'].includes(appRow.status)) {
      return 'This combination needs a selection-trial invitation.';
    }
  }
  return FEDERATION_ELIGIBILITY(event,rider,horse,options);
};

function federationRecruit(plan,hour) {
  if (hour < plan.opens || hour > plan.closes) return;
  const state = federationState();
  for (const profile of app.riderRealism?.profiles || []) {
    if (profile.career?.country !== plan.country) continue;
    const id = plan.id + ':' + profile.id;
    if (state.invitations[id] || state.applications[id]) continue;
    const rider = {...profile,...profile.career,player:true,professional:profile.level==='Professional'};
    const records = federationRecords(plan,profile.id,undefined,hour).filter(row=>row.placing<=5).sort((a,b)=>a.hour-b.hour);
    if (records.length < 2) continue;
    const horse = calendarHorseById(records.at(-1).horseId);
    if (!federationEligibility(plan,rider,horse,hour)) state.invitations[id] = {
      id,planId:plan.id,riderId:rider.id,horseId:horse.id,issued:hour,expires:plan.closes,
      type:records.length>=4 ? 'National squad invitation' : 'Development squad invitation'
    };
  }
}
function federationNomination(event,rider,horse) {
  const seasons = Object.values(app.career?.federations?.seasons || {}).filter(season=>
    season.country===rider.country && season.discipline===event.discipline && season.division===event.division &&
    season.selectedAt<=event.at && season.expires>event.at).sort((a,b)=>b.selectedAt-a.selectedAt);
  return seasons[0]?.members.find(row=>row.riderId===rider.id && (event.allocated || row.horseId===horse?.id));
}
const FEDERATION_ENTER = careerEnter;
careerEnter = function(event,horse) {
  if (federationEnabled() && (event?.team || event?.games)) {
    const nomination = federationNomination(event,careerRider(),horse);
    if (!nomination || !['Selected — National Squad','Selected — Championship Team'].includes(nomination.status)) {
      return {ok:false,message:'An active federation nomination for this combination is required.'};
    }
  }
  return FEDERATION_ENTER(event,horse);
};

const FEDERATION_RECORD = careerRecordMeet;
careerRecordMeet = function(event,standings,player=null) {
  const previous=app.career?.meets[event.id], result=FEDERATION_RECORD(event,standings,player);
  if (federationEnabled() && !previous && player) {
    const at=careerEventEnd(event);
    for (const plan of federationPlans(pastureDate(at).year,player.country)) {
      if (plan.discipline===event.discipline) federationRecruit(plan,at);
      if (plan.id===event.federationTrial) federationReview(plan,at);
    }
  }
  return result;
};

const FEDERATION_RESULTS_MARKUP=showResultMarkup;
showResultMarkup=function(show){
 const html=FEDERATION_RESULTS_MARKUP(show);
 if(!show.federationSelection)return html;
 const team=app.career?.meets[show.eventId]?.teams?.find(team=>team.country===show.federationSelection.country);
 if(!team)return html;
 return html+`<section class="box" data-national-team-result><h3>National team result · ${csEscape(CAREER_COUNTRIES[team.country]?.[0]||team.country)}</h3><p>Team placing #${team.placing} · ${team.points} team ranking points${team.medal ? ' · '+csEscape(team.medal)+' medal' : ''}</p>${show.award ? '<p>Show prize received: '+money(show.award.prize)+'</p>' : ''}</section>`;
};
