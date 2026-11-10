const {check}=require('./behavior5-harness.cjs');

check('the manual riding override survives reload and ignores changing behavior', `{
  resetGame();
  const horse=app.horses[0]; horse.age=3; horse.bredBy='Your Stable'; horse.behavior=7; horse.requiresBreakingIn=true;
  if(makeHorseRidable(horse.id).ok) throw Error('age boundary');
  horse.age=4;
  if(!makeHorseRidable(horse.id).ok || horse.behavior!==7) throw Error('rideability changed behavior');
  horse.behavior=0;
  hydrateFromSave(JSON.parse(serializeAppState()));
  const loaded=app.horses.find(h=>h.id===horse.id);
  if(!canRideUnderSaddle(loaded) || loaded.behavior!==0) throw Error('override lost');
  HorseHealth.add(loaded,'legacy',csDay(),{legacyName:'Kissing Spines',known:true,confirmed:true});
  if(canRideUnderSaddle(loaded)) throw Error('medical exclusion bypassed');
}`);

check('Make Ridable bypasses every behavior score for adult unbroken horses', `{
  resetGame();
  for(const behavior of [-1000,-1,0,1,499,500]){
    const h=app.horses[0];h.age=4;h.behavior=behavior;h.requiresBreakingIn=true;
    h.bredBy='Your Stable';h.auctionUnbroken=true;delete h.ridingEducationOverride;
    const skills=JSON.stringify(h.stats),potential=JSON.stringify(h.potential);
    if(!makeHorseRidable(h.id).ok||!canRideUnderSaddle(h)||h.requiresBreakingIn)throw Error('blocked at '+behavior);
    if(h.behavior!==behavior||JSON.stringify(h.stats)!==skills||JSON.stringify(h.potential)!==potential)throw Error('horse scores changed');
    if(h.behavior<requiredBehaviorForRiding(h)||careTrainingStatus(h)==='Young / Unbroken')throw Error('work still blocked');
    const id=h.id;hydrateFromSave(JSON.parse(serializeAppState()));
    const loaded=app.horses.find(row=>row.id===id);
    if(!canRideUnderSaddle(loaded)||loaded.behavior!==behavior)throw Error('override lost at '+behavior);
  }
}`);

check('show points belong to the booked rider and are credited once', `{
  resetGame();
  const h=app.horses[0], first=rrSettings().riderId;
  const show=showCreate(h,buildCompetitionRpgSession(h,'jumping','0.70'));
  const second=rrCreateRider('Guest Rider').profile.id;
  for(const entry of show.competitors) entry.scores.showjumping={time:entry.player ? 20 : 90,faults:0,penalties:0,eliminated:false};
  showCompletePhase(show);showPersistResults(show);
  const archived=showHistoryRows().find(row=>row.id===show.id);
  if(!archived || archived.placing!==1 || !h.showResults.some(row=>row.entryId===show.id) ||
    app.competitionReports.filter(row=>row.id===show.id).length!==1) throw Error('final result not visible before prizegiving');
  showAward(show);
  if(app.competitionReports.filter(row=>row.id===show.id).length!==1) throw Error('duplicate dashboard result');
  if(!careerResults({riderId:first,discipline:'jumping'}).some(row=>row.placing===1)) throw Error('win missing from paused career history');
  if(riderShowPointSummary(first).points!==29 || riderShowPointSummary(second).points) throw Error('wrong rider or duplicate points');
  hydrateFromSave(JSON.parse(serializeAppState()));
  if(riderShowPointSummary(first).points!==29) throw Error('points lost');
}`);

check('history removal keeps official results and deletes custom definitions and result copies', `{
  resetGame();
  const world=careerState();
  world.meets.finished={id:'finished',name:'Finished',hour:pastureCalendarHour(),results:[{player:true,points:20}]};
  const row=showHistoryRows().find(row=>row.id==='finished');
  if(!removeShowFromHistory(row) || showHistoryRows().some(row=>row.id==='finished') || !world.meets.finished) throw Error('official record removal');
  const state=customShowState();
  state.shows['custom-1']={id:'custom-1',registrations:{'career:1:custom-1-1':{showId:'entry'}}};
  state.results['career:1:custom-1-1']={id:'career:1:custom-1-1',showId:'custom-1'};
  if(!deleteCustomShow('custom-1') || state.shows['custom-1'] || Object.keys(state.results).length) throw Error('custom removal');
  hydrateFromSave(JSON.parse(serializeAppState()));
  if(showHistoryRows().some(row=>row.id==='finished') || !careerState().meets.finished) throw Error('removal lost on reload');
}`);

check('extra development classes cover ponies and every supported young-horse age', `{
  resetGame();
  const events=careerSchedule(pastureCalendarHour(app.year,1,1,0),pastureCalendarHour(app.year,12,30,23)).filter(row=>row.foregroundOnly);
  if(events.length!==96 || events.length!==new Set(events.map(row=>row.id)).size) throw Error('fixture count');
  for(const d of DISCIPLINES) {
    if(events.filter(row=>row.discipline===d && row.ponyCm===148).length!==4) throw Error('pony coverage');
    for(const age of [4,5,6,7,8]) if(events.filter(row=>row.discipline===d && row.horseAge===age).length!==4) throw Error('young horse coverage');
  }
}`);

check('a saved win with a recorded rider can be recovered without replaying awards', `{
  resetGame();
  const rider=rrSettings().riderId;
  app.showHistory=[{id:'previous-win',name:'Previous Grand Prix',discipline:'jumping',level:'0.70',
    classTime:pastureCalendarHour(),profileRiderId:rider,finalStandings:[{player:true,rank:1,name:'Horse',horseId:app.horses[0].id}]}];
  const money=app.money;
  hydrateFromSave(JSON.parse(serializeAppState()));
  const recovered=careerResults({riderId:rider,discipline:'jumping'});
  if(riderShowPointSummary(rider).wins!==1) throw Error('profile win missing');
  if(recovered.length!==1 || recovered[0].placing!==1 || recovered[0].points || app.money!==money) throw Error('win migration');
  recoverCareerShowHistory();
  if(careerResults({riderId:rider}).length!==1) throw Error('duplicated win');
}`);
