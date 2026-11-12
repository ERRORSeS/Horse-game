const { check } = require('./behavior5-harness.cjs');

check('career calendar uses explicit classifications, supported levels and four-year Games cycles', `{
  resetGame();
  const from = pastureCalendarHour(1,1,1,0), to = pastureCalendarHour(8,12,30,23);
  const events = careerSchedule(from,to);
  if (events.length !== new Set(events.map(event => event.id)).size) throw Error('duplicate IDs');
  for (const event of events) {
    if (!competitionLevels(event.discipline).includes(event.level)) throw Error(event.id + ' uses an invalid level');
    if (event.games && event.date.year % event.cycle !== event.edition) throw Error('wrong edition');
    if (event.star && (event.tier < 5 || event.tier > 9)) throw Error('bad classification');
  }
  const nonranking = events.find(event => event.series === 'rising-stars');
  if (!nonranking.star || nonranking.base || nonranking.ranking !== 'none') throw Error('ranking inferred from star');
  if (careerSchedule(from,to,false).some(event => event.games)) throw Error('Games toggle');
}`);

check('rider birthdays and overlapping age divisions survive profile switching and old saves', `{
  resetGame();
  const adult = rrStoreCurrentProfile();
  if (careerAge(careerRider()) !== null) throw Error('fabricated legacy age');
  const created = rrCreateRider('Dana');
  if (!created.ok || !careerSetProfile(created.profile,16,'KAZ')) throw Error('profile');
  created.profile.career.birth.month = 5;
  const rider = careerRider();
  if (careerAge(rider,pastureCalendarHour(app.year,4,30,12)) !== 15 ||
      careerAge(rider,pastureCalendarHour(app.year,5,1,12)) !== 16) throw Error('birthday');
  const before = JSON.stringify(rider.abilities);
  rrSelectRider(adult.id);
  importStableSave(exportStableSave());
  rrSelectRider(created.profile.id);
  if (careerRider().country !== 'KAZ' || JSON.stringify(careerRider().abilities) !== before) throw Error('profile migration');
  for (const division of ['pony','junior','young','u25']) {
    const [min,max] = CAREER_AGE_DIVISIONS[division].ages;
    if (min > 16 || max < 16) throw Error(division);
  }
}`);

check('ponies use measured height, young horse classes use birth year and Welsh limits preserve genetics', `{
  resetGame();
  careerSetProfile(rrStoreCurrentProfile(),15,'GBR');
  const rider = careerRider();
  const event = careerEvent(CAREER_SERIES.find(row => row.series === 'jumping-pony-national'),app.year);
  const pony = { ...app.horses[0], breed: 'Welsh Cob', measuredHeightCm: 149 };
  if (!/height/.test(careerEligibility(event,rider,pony))) throw Error('oversize pony entered');
  pony.measuredWithShoes = true;
  if (/height/.test(careerEligibility(event,rider,pony))) throw Error('shod allowance ignored');
  const youngster = careerEvent(CAREER_SERIES.find(row => row.series === 'jumping-young-horse-5'),app.year);
  pony.birthYear = app.year - 9;
  if (!/5 in the competition year/.test(careerEligibility(youngster,{...rider,birth:{...rider.birth,year:app.year-22}},pony))) throw Error('young age not enforced');
  pony.breed = 'Welsh Pony'; pony.measuredHeightCm = 145; pony.marking = 'None';
  if (careerWelshRegistry(pony,'UK-inspired').eligible || !careerWelshRegistry(pony,'North American-inspired').eligible) throw Error('registry standard');
  pony.marking = 'Tobiano'; pony.genetics = {tobiano:'TO/n'};
  if (careerWelshRegistry(pony,'North American-inspired').eligible || pony.genetics.tobiano !== 'TO/n') throw Error('pattern genetics changed');
  const seen = new Set();
  for (let i = 0; i < 300; i++) {
    const id = 'welsh-test:' + i;
    const output = careerWelshMarkings({}, {}, 'Welsh Pony',id,false);
    const face = output.faceMarking !== 'None';
    const legs = Object.values(output.legMarkings).some(marking => marking !== 'None');
    seen.add(face + ':' + legs);
  }
  if (seen.size !== 4) throw Error('marking coverage');
}`);

check('ranking math respects performance, elimination, placing cutoff and rolling expiration', `{
  resetGame(); rrSettings().enabled = true;
  const world = careerState(); world.settings.progression = true;
  const jumping = careerEvent(CAREER_SERIES.find(row => row.id === 'jumping-tier-9'),app.year);
  const dressage = careerEvent(CAREER_SERIES.find(row => row.id === 'dressage-tier-9'),app.year);
  const eventing = careerEvent(CAREER_SERIES.find(row => row.id === 'eventing-tier-9'),app.year);
  if (careerPoints(jumping,{placing:1,score:0},28) !== 140) throw Error('jumping base');
  if (careerPoints(jumping,{placing:1,score:0,eliminated:true},28) ||
      careerPoints(jumping,{placing:2,score:0},2)) throw Error('invalid points');
  if (careerPoints(dressage,{placing:1,score:80},12) <= careerPoints(dressage,{placing:1,score:60},12)) throw Error('dressage quality');
  if (careerPoints(eventing,{placing:1,score:50},12) <= careerPoints(eventing,{placing:1,score:100},12)) throw Error('eventing penalties');
  world.meets[jumping.id] = { id:jumping.id, hour:jumping.at, discipline:'jumping', ranking:'world', tier:9, teams:[],
    results:[{riderId:'id',riderName:'Rider',horseId:'horse',horseName:'Horse',country:'GBR',points:140}] };
  careerPublish(jumping.at + 1);
  if (world.rankings['world|jumping|'][0].points !== 140 || world.rankings['world|dressage|']) throw Error('leaderboard cross-contamination');
  careerPublish(jumping.at + CAREER_HOURS_PER_YEAR + 1);
  if (world.rankings['world|jumping|'] || !world.meets[jumping.id]) throw Error('expired history');
}`);

check('background meets record recurring combinations and process each date once', `{
  resetGame(); rrSettings().enabled = true;
  const world = careerState(); world.settings.progression = true;
  const until = pastureCalendarHour(app.year,3,29,23);
  careerAdvance(until);
  const meets = Object.values(world.meets);
  const starts = meets.flatMap(meet => meet.results);
  if (meets.length < 15 || starts.length < 100 || starts.some(row => row.player)) throw Error('background starts');
  const names = new Map(), riders = new Map();
  for (const row of starts) {
    if (names.has(row.horseId) && names.get(row.horseId) !== row.horseName) throw Error('horse identity changed');
    if (riders.has(row.riderId) && riders.get(row.riderId) !== row.riderName) throw Error('rider identity changed');
    names.set(row.horseId,row.horseName); riders.set(row.riderId,row.riderName);
  }
  if (riders.size >= starts.length) throw Error('no recurring competitors');
  const saved = JSON.stringify(world);
  careerAdvance(until);
  if (JSON.stringify(world) !== saved) throw Error('duplicate simulation');
  importStableSave(exportStableSave());
  if (JSON.stringify(careerState()) !== saved) throw Error('career data changed on reload');
  careerState().settings.progression = false;
  careerAdvance(until + 30 * 24);
  if (Object.keys(careerState().meets).length !== meets.length) throw Error('paused NPC simulation advanced');
}`);

check('classified live results apply one capped premium and use the booked rider ID', `{
  resetGame();
  rrSettings().enabled = false;
  const horse = app.horses[0];
  horse.behavior = 900; horse.requiresBreakingIn = false; horse.medicalConditions = []; horse.illnesses = [];
  careerSetProfile(rrStoreCurrentProfile(),24,'GBR');
  const event = careerEvent(CAREER_SERIES.find(row => row.id === 'jumping-tier-1'),app.year);
  const session = buildCompetitionRpgSession(horse,event.discipline,event.level);
  const show = showCreate(horse,session,event);
  for (const [i,row] of show.competitors.entries()) {
    row.scores.showjumping = { faults:0, penalties:0, time:row.player ? 50 : 70 + i, eliminated:false };
  }
  showCompletePhase(show);
  const meet = careerState().meets[event.id];
  if (meet.results.filter(row => row.player).length !== 1 || meet.results.find(row => row.player).riderId !== 'player') throw Error('live rider');
  showPersistResults(show);
  if (horse.showResults.filter(row => row.entryId === show.id).length !== 1 || careerHorseRecord(horse).wins !== 1) throw Error('result repeated');
  if (!(meet.results.find(row => row.player)?.points > 0)) throw Error('eligible live ranking points blocked by optional progression settings');
  if (careerHorseRecord(horse).premium <= 0 || careerHorseRecord(horse).premium > .35) throw Error('market premium');
}`);

check('team scoring honors starter and counting-score rules', `{
  resetGame();
  const event = careerEvent(CAREER_SERIES.find(row => row.series === 'nations-jumping'),app.year);
  const results = ['GBR','FRA','GER'].flatMap(country =>
    Array.from({length:country === 'GER' ? 2 : 4},(_,i) => ({
      country, riderId:country + i, placing:1+i, score: i === 3 ? 100 : country === 'GBR' ? 4 : 0
    })));
  const teams = careerTeamScores(event,results);
  if (teams.length !== 2 || teams[0].country !== 'FRA' || teams[1].score !== 12 || teams[0].members.length !== 3) throw Error('team scoring');
}`);

check('career training is bounded and sponsor stipends are idempotent', `{
  resetGame(); const r = rrSettings(); r.enabled = true;
  const world = careerState(); world.settings.progression = true;
  careerSetProfile(rrStoreCurrentProfile(),22,'GBR');
  const rider = careerRider(), hour = pastureCalendarHour();
  if (careerPractice(rider.id,'jumping','0.70','real-session',hour) <= 0 ||
      careerPractice(rider.id,'jumping','0.70','real-session',hour) !== 0) throw Error('session replay');
  const before = app.money, month = Math.floor(hour / CAREER_HOURS_PER_MONTH);
  world.contracts.push({ riderId:rider.id, startMonth:month, endMonth:month+3, stipend:100, paid:[] });
  careerPaySponsors(month+1); careerPaySponsors(month+1); careerPaySponsors(month+3);
  if (app.money !== before+100) throw Error('sponsor payment replay or expiration');
  world.settings.progression = false;
  if (careerPractice(rider.id,'jumping','0.70','paused-session',hour)) throw Error('paused rider gained skill');
}`);

check('Games require the right federation and verified qualifications, and allocated horses remain temporary', `{
  resetGame();
  const horse = app.horses[0];
  careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
  const rider = careerRider();
  const asian = careerEvent(CAREER_SERIES.find(row => row.id === 'asian-games-jumping'),2);
  if (!/Asia/.test(careerEligibility(asian,rider,horse))) throw Error('continental federation gate');
  const youth = careerEvent(CAREER_SERIES.find(row => row.id === 'youth-games'),app.year);
  if (!/verified/.test(careerEligibility(youth,rider,null))) throw Error('unqualified Games entry');
  const previous = [1,2].map(offset => ({ placing:5, tier:4, division:'junior', hour:youth.at - 24 * offset, score:0 }));
  if (careerEligibility(youth,rider,null,{history:previous})) throw Error('qualified youth blocked');
  const allocation = careerAllocatedHorse(youth,rider,horse), rosterSize = app.horses.length;
  careerState().allocations[allocation.id] = allocation;
  const show = showCreate(allocation,buildCompetitionRpgSession(allocation,'jumping','1.10'),youth);
  if (t2findHorse(allocation.id) !== allocation || app.horses.length !== rosterSize) throw Error('allocation became ownership');
  showFinish(show);
  if (careerState().allocations[allocation.id] || app.horses.length !== rosterSize) throw Error('allocation retained');
}`);

check('discipline-specific tests and fixed-date course rules configure the existing show', `{
  resetGame();
  const h = app.horses[0];
  const special = careerEvent(CAREER_SERIES.find(row => row.course === 'Special'),app.year);
  const freestyle = careerEvent(CAREER_SERIES.find(row => row.course === 'Freestyle'),app.year);
  const a = buildCompetitionRpgSession(h,'dressage','Grand Prix'), b = buildCompetitionRpgSession(h,'dressage','Grand Prix');
  careerConfigureSession(a,special); careerConfigureSession(b,freestyle);
  if (a.movementPlan.length !== 8 || b.movementPlan.length !== 8 || a.movementPlan[0].name === b.movementPlan[0].name) throw Error('same dressage test');
  const long = careerEvent(CAREER_SERIES.find(row => row.discipline === 'eventing' && row.course === 'Long'),app.year);
  if (long.phaseSchedule.showjumping - long.phaseSchedule.dressage < 48) throw Error('long event compressed to one day');
  const session = buildCompetitionRpgSession(h,'eventing',long.level);
  careerConfigureSession(session,long);
  if (!session.steps.some(step => step.phase === 'cross-country phase' && step.routeDistance === 110)) throw Error('long route missing');
  const show = showCreate(h,session,long);
  show.stage = 'planning'; show.classTime = pastureCalendarHour() + 1; show.eventSnapshot.at = show.classTime;
  let rejected = false;
  try { bookShowTrip(show,{scope:'country',nights:2}); } catch (error) { rejected = /fixed class time/.test(error.message); }
  if (!rejected) throw Error('itinerary rescheduled official class');
}`);

check('every federation has persistent specialists across youth and adult age groups', `{
 resetGame();const roster=careerRoster(),size=roster.length;careerRoster();if(roster.length!==size)throw Error('duplicated pool');
 for(const country of Object.keys(CAREER_COUNTRIES))for(const discipline of DISCIPLINES){
  const local=roster.filter(r=>r.country===country&&r.specialty===discipline);
  for(const division of ['kids','prechildren','children','pony','junior','young','u25','amateur','professional']){
   if(local.filter(r=>careerDivisions(r).includes(division)).length<2)throw Error('thin field '+country+' '+discipline+' '+division);
  }
 }
 const event=careerEvent(CAREER_SERIES.find(row=>row.discipline==='jumping'&&row.division==='junior'&&row.tier<=3),app.year);
 const field=careerNpcField(event,30);if(field.length<8||field.some(p=>p.rider.specialty!=='jumping'))throw Error('specialist field');
 const ids=roster.map(r=>r.id);hydrateFromSave(JSON.parse(serializeAppState()));if(JSON.stringify(careerRoster().map(r=>r.id))!==JSON.stringify(ids))throw Error('roster changed on reload');
}`);
check('NPC ranking contenders are discipline specialists while player results remain eligible', `{
 resetGame();const world=careerState(),rider=careerRoster()[0],other=DISCIPLINES.find(d=>d!==rider.specialty),hour=pastureCalendarHour();
 for(const discipline of [rider.specialty,other])world.meets[discipline]={id:discipline,hour:hour-1,discipline,ranking:'world',tier:9,teams:[],results:[{riderId:rider.id,riderName:rider.name,country:rider.country,points:100},{riderId:'player-fixture',riderName:'Player',country:'GBR',points:50}]};
 const boards=careerComputeBoards(hour);
 if(!boards[careerBoardKey('world',rider.specialty)].some(r=>r.id===rider.id)||boards[careerBoardKey('world',other)].some(r=>r.id===rider.id))throw Error('multi-discipline NPC');
 if(!boards[careerBoardKey('world',other)].some(r=>r.id==='player-fixture'))throw Error('player removed');
}`);
check('rankings release every seven days across skipped months and survive reload', `{
 resetGame();rrSettings().enabled=true;const world=careerState();world.settings.progression=true;world.settings.background=false;world.openingHistory=true;
 const start=Math.floor(world.cursor/CAREER_HOURS_PER_WEEK)*CAREER_HOURS_PER_WEEK,next=start+CAREER_HOURS_PER_WEEK;
 world.meets.weekly={id:'weekly',hour:world.cursor-1,discipline:'jumping',ranking:'world',tier:9,teams:[],results:[{riderId:'weekly-rider',riderName:'Weekly',country:'GBR',points:100}]};
 careerAdvance(next-1);if(world.rankingHour)throw Error('early release');
 careerAdvance(next);if(world.rankingHour!==next)throw Error('missing weekly release');
 careerAdvance(next+5*CAREER_HOURS_PER_WEEK+5);const releases=world.rankHistory[careerBoardKey('world','jumping')]['weekly-rider'].releases;
 if(releases.length!==6||releases.some((r,i)=>r.hour!==next+i*CAREER_HOURS_PER_WEEK))throw Error('skipped or monthly releases');
 const before=JSON.stringify(releases);careerAdvance(world.cursor);if(JSON.stringify(releases)!==before)throw Error('duplicate release');
 hydrateFromSave(JSON.parse(serializeAppState()));if(careerState().rankingHour!==next+5*CAREER_HOURS_PER_WEEK)throw Error('release lost');
}`);

check('weekly releases also publish official points with career progression disabled', `{
 resetGame();const w=careerState();w.settings.progression=false;w.settings.background=false;w.openingHistory=true;
 const next=(Math.floor(w.cursor/CAREER_HOURS_PER_WEEK)+1)*CAREER_HOURS_PER_WEEK;
 w.meets.official={id:'official',custom:true,official:true,hour:w.cursor+1,discipline:'jumping',ranking:'national',tier:3,division:'senior',teams:[],results:[{riderId:'official-player',riderName:'Player',country:'GBR',points:20}]};
 careerAdvance(next);if(w.rankingHour!==next||w.rankings[careerBoardKey('national','jumping','GBR')]?.[0]?.points!==20)throw Error('official weekly points stuck');
}`);
