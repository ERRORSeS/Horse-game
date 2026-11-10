const {check}=require('./behavior5-harness.cjs');

check('custom registrations and final results share the official writer and preserve sandbox separation', `{
  resetGame();
  const horse=app.horses[0], profile=rrStoreCurrentProfile();
  const country=careerCountry(app.currentBarn.country);
  careerSetProfile(profile,16,country);
  rrSettings().enabled=true;
  const world=careerState();world.settings.progression=true;
  world.settings.background=false;
  app.money=100000;
  horse.age=8;horse.behavior=900;horse.requiresBreakingIn=false;horse.illnesses=[];horse.medicalConditions=[];
  horse.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};
  const rider=careerRider(), now=pastureCalendarHour();
  for(let i=1;i<=3;i++) world.meets['qualifier-'+i]={
    id:'qualifier-'+i,hour:now-i*24,discipline:'jumping',tier:2,division:'junior',
    results:[{riderId:rider.id,horseId:horse.id,player:true,placing:i,points:0}],teams:[]
  };
  const input={name:'Test Classic',venue:app.currentBarn.name,country,year:app.year,month:app.month,
    day:app.day+12,duration:1,prestige:32,tier:3,classes:[{name:'Junior Stakes',discipline:'jumping',level:'0.70',
      division:'junior',offset:0,capacity:12,fee:100,prize:1000,npcs:true}]};
  const official=customShowCreate({...input,mode:'sanctioned'});
  if(!official.ok) throw Error(official.message);
  const exhibition=customShowCreate({...input,day:input.day+1,mode:'sandbox'});
  if(!exhibition.ok) throw Error(exhibition.message);
  const events=customShowEvents(now,now+30*24);
  let booked=careerEnter(events[0],horse);
  if(!booked.ok) throw Error(booked.message);
  let show=booked.show;
  if(activeShowParticipation()?.status!=='Entered' || world.meets[events[0].id]) throw Error('entry counted as completed');
  hydrateFromSave(JSON.parse(serializeAppState()));
  show=app.activeShow;
  if(activeShowParticipation()?.riderId!==rider.id) throw Error('booked identity lost');
  const warmup=show.rpg.steps.findIndex(step=>step.stage==='warm_up');
  show.rpg.choiceRecords=[{step:warmup,interactive7:true}];
  if(activeShowParticipation()?.status!=='Entered') throw Error('warm-up counted as a start');
  show.rpg.choiceRecords=[];
  show.competitors.find(row=>row.player).scores.showjumping={penalties:0,faults:0,time:20};
  if(activeShowParticipation()?.status!=='Started') throw Error('start not saved');
  for(const entry of show.competitors.filter(row=>!row.player)) entry.scores.showjumping={penalties:4,faults:4,time:70};
  showCompletePhase(show);
  showPersistResults(show);
  const officialMeet=careerState().meets[events[0].id], classified=officialMeet.results.find(row=>row.player);
  if(!officialMeet.official || officialMeet.classId!==events[0].classId || officialMeet.division!=='junior' ||
    classified.status!=='Completed' || classified.placing!==1 || classified.score!==0 || classified.showPoints!==29 ||
    classified.horseId!==horse.id || classified.riderId!==rider.id || classified.points<=0) throw Error('sanctioned ledger');
  const release=pastureCalendarHour(app.year,app.month+1,1,0);
  careerPublish(release);
  const boards=careerState().rankings;
  if(boards['division|jumping|junior']?.find(row=>row.id===rider.id)?.points!==classified.points ||
    boards['youth-national|jumping|junior|'+country]?.find(row=>row.id===rider.id)?.points!==classified.points ||
    boards['world|jumping|']?.some(row=>row.id===rider.id)) throw Error('wrong official board');
  if(app.horses[0].showResults.filter(row=>row.entryId===show.id).length!==1) throw Error('horse history duplication');
  showFinish(show);
  booked=careerEnter(events[1],app.horses[0]);
  if(!booked.ok) throw Error(booked.message);
  show=booked.show;
  for(const entry of show.competitors) entry.scores.showjumping={
    penalties:entry.player ? 8 : 0, faults:entry.player ? 8 : 0,time:60,eliminated:entry.player
  };
  const cash=app.money, awards=app.horses[0].showResults.length;
  showCompletePhase(show);showAward(show);
  hydrateFromSave(JSON.parse(serializeAppState()));
  const sandbox=careerParticipationRows({horseId:horse.id}).find(row=>row.eventId===events[1].id);
  if(!sandbox?.sandbox || sandbox.status!=='Eliminated' || sandbox.score!==8 || sandbox.showPoints || sandbox.credits.length ||
    app.horses[0].showResults.length!==awards || app.money!==cash || riderShowPointSummary(rider.id).points!==29) throw Error('sandbox history or isolation');
}`);

check('withdrawn, retired and missed custom entries retain their true participation status', `{
  resetGame();
  const horse=app.horses[0], rider=careerRider(), now=pastureCalendarHour();
  const definition=customShowCreate({name:'Participation Trials',venue:'Home Ring',country:rider.country,
    year:app.year,month:app.month,day:app.day+5,duration:1,prestige:0,tier:0,classes:[0,1,2].map(i=>({
      name:'Class '+i,discipline:'jumping',level:'0.70',division:'senior',offset:0,capacity:1,fee:0,prize:0,npcs:false
    }))});
  if(!definition.ok) throw Error(definition.message);
  const events=customShowEvents(now,now+30*24);
  const create=event=>showCreate(horse,buildCompetitionRpgSession(horse,'jumping','0.70'),event,event.id+':player');
  let show=create(events[0]);
  if(!showLeaveBeforeWarmup(show)) throw Error('withdrawal failed');
  show=create(events[1]);
  const player=show.competitors.find(row=>row.player);
  player.scores.showjumping={penalties:4,time:70,eliminated:true,eliminationReason:'Retired'};
  showCompletePhase(show);showFinish(show);
  app.day+=7;show=create(events[2]);
  if(!showLeaveBeforeWarmup(show)) throw Error('missed entry failed');
  const results=events.map(event=>careerState().meets[event.id].results.find(row=>row.player));
  if(results.map(row=>row.status).join('|')!=='Withdrawn|Retired|Did Not Start' ||
    results.map(row=>row.started).join('|')!=='false|true|false' || results.some(row=>row.placing || row.points)) throw Error('incorrect status or awards');
}`);

check('every junior circuit has a field and ordinary monthly divisions stay balanced', `{
  resetGame();
  const year=app.year, start=pastureCalendarHour(year,1,1,0), end=pastureCalendarHour(year,12,30,23);
  const schedule=careerSchedule(start,end);
  if(schedule.length!==new Set(schedule.map(row=>row.id)).size) throw Error('duplicate calendar classes');
  const horse=app.horses[0];
  horse.age=8;horse.breed='Dutch Warmblood';horse.careerLevelCaps={};horse.behavior=900;horse.requiresBreakingIn=false;horse.medicalConditions=[];horse.illnesses=[];
  for(const d of DISCIPLINES) {
    horse.potential[d]=100;
    for(const key of Object.keys(horse.stats[d] || {})) horse.stats[d][key]=100;
  }
  const profile=rrStoreCurrentProfile();
  for(const [division,age] of Object.entries({kids:9,prechildren:11,children:13,pony:15,junior:15,young:19,u25:23,senior:30})) {
    careerSetProfile(profile,age,'GBR');
    horse.measuredHeightCm=division==='pony' ? 145 : 162;
    for(let month=1;month<=12;month++) {
      const eligible=schedule.filter(row=>row.division===division && row.date.month===month && careerOrdinaryDivision(row) &&
        !careerEligibility(row,careerRider(),horse));
      if(eligible.length<6 || eligible.length>(division==='senior' ? 10 : 8)) throw Error(division+' month '+month+' has '+eligible.length+' accessible classes');
    }
  }
  careerSetProfile(profile,14,'GBR');
  for(const [discipline,name] of CAREER_JUNIOR_CLASSES) {
    const event=schedule.find(row=>row.name.startsWith(name+' ·'));
    if(!event || event.discipline!==discipline || !event.official || !event.base || careerEligibility(event,careerRider(),horse)) throw Error(name+' unavailable at age 14');
    const field=careerNpcField(event,event.npcCount);
    if(field.length<event.minField || field.some(({rider,horse})=>careerEligibility(event,rider,horse,{npc:true}))) throw Error(name+' field');
  }
  careerSetProfile(profile,16,'GBR');
  if(!['junior','young','u25','pony','senior'].every(key=>careerDivisions(careerRider()).includes(key))) throw Error('overlapping age categories');
  const pony=schedule.find(row=>row.division==='pony' && row.ponyCm===148);
  horse.measuredHeightCm=160;
  if(!careerEligibility(pony,careerRider(),horse)) throw Error('overheight horse accepted');
  horse.measuredHeightCm=146;
  if(careerEligibility(pony,careerRider(),horse)) throw Error('eligible pony blocked');
  if(!show82Matches(pony,{kind:'pony'}) || show82Matches(pony,{kind:'young'})) throw Error('calendar filters');
  const team=schedule.find(row=>row.series==='junior-nations');
  if(careerNpcField(team,team.npcCount).length<6) throw Error('Junior Nations Cup cannot fill squads');
}`);

check('profile ranks and point labels follow class metadata and keep expired standings out of the current period', `{
  resetGame();
  const profile=rrStoreCurrentProfile();profile.name='Bella Verona';
  careerSetProfile(profile,16,'ITA');profile.career.activeDivision='junior';
  const rider=careerRider(), world=careerState(), season=app.year;
  const release=pastureCalendarHour(season,4,1,0);
  const results=(points,placing)=>[{riderId:rider.id,riderName:rider.name,horseId:app.horses[0].id,
    horseName:app.horses[0].name,country:'ITA',player:true,placing,points,showPoints:30-placing,started:true}];
  world.meets.series={id:'series',name:'Junior Championship',hour:release-48,discipline:'jumping',
    division:'junior',tier:4,ranking:'series',series:'jumping-junior',results:results(18,4),teams:[]};
  world.meets.children={id:'children',name:'Children’s National Finals',hour:release-24,discipline:'jumping',
    division:'children',tier:3,ranking:'division',results:results(21,1),teams:[]};
  world.meets.international={id:'international',name:'Junior International',hour:release+24,discipline:'jumping',
    division:'junior',divisionScope:'international',tier:5,ranking:'division',results:results(27,2),teams:[]};
  app.month=4;app.day=5;
  careerPublish(release);
  const profileMarkup=riderShowPointsMarkup(rider);
  const history=riderParticipationMarkup(rider,'jumping');
  if(!profileMarkup.includes('World Showjumping') || !profileMarkup.includes('no eligible points recorded') ||
     !profileMarkup.includes('27 points pending') || !profileMarkup.includes('#1 · 18 points') ||
     !profileMarkup.includes('#1 · 21 points') || !history.includes('+18 Jumping Junior Championship Series Points') ||
     !history.includes('+21 Children National Showjumping') || history.includes('+18 Juniors National')) throw Error('metadata or point labels');
  if(world.rankings['youth-national|jumping|junior|ITA'] || world.rankings['world|jumping|']) throw Error('wrong ledger');
  careerPublish(pastureCalendarHour(season,5,1,0));
  if(world.rankings['youth-international|jumping|junior'][0].points!==27) throw Error('international release');
  app.year+=2;
  careerPublish(pastureCalendarHour(app.year,1,1,0));
  if(world.rankings['youth-international|jumping|junior'] || !riderShowPointsMarkup(rider).includes('Career high #1') ||
    !riderParticipationMarkup(rider).includes('Junior Championship')) throw Error('age-out history or expiry');
}`);

check('older sandbox and sanctioned saves recover from source records once', `{
  resetGame();
  const profile=rrStoreCurrentProfile();careerSetProfile(profile,16,'GBR');
  const horse=app.horses[0], rider=careerRider(), date=pastureDate(pastureCalendarHour()+120), world=careerState();
  delete world.recordVersion;
  world.customShows={sequence:2,shows:{},results:{}};
  for(const i of [1,2]) {
    const id='custom-'+i,eventId='career:'+date.year+':'+id+'-1',entryId=eventId+':player';
    world.customShows.shows[id]={id,name:'Old Class '+i,venue:'Home Arena',country:'GBR',
      ...date,prestige:25,tier:3,sanctioned:i===2,classes:[{discipline:'jumping',level:'0.70',division:'junior',offset:0,capacity:8}],
      registrations:{[eventId]:{showId:entryId,riderId:rider.id,horseId:horse.id}}};
    world.customShows.results[eventId]={id:eventId,showId:id,date,standings:[{riderId:rider.id,riderName:rider.name,
      horseId:horse.id,horseName:horse.name,placing:1,score:0}]};
    if(i===2) showRecordsState().results[entryId]={id:entryId,eventId,rankPoints:20};
  }
  const cash=app.money;
  hydrateFromSave(JSON.parse(serializeAppState()));
  hydrateFromSave(JSON.parse(serializeAppState()));
  const rows=careerParticipationRows({riderId:rider.id});
  if(rows.length!==2 || rows.filter(row=>row.sandbox).length!==1 || !rows.some(row=>row.credits.some(credit=>credit.points===20)) ||
    riderShowPointSummary(rider.id).points!==29 || app.money!==cash) throw Error('migration failed or replayed');
}`);

check('international barn choices preserve legacy records, board prices and sporting nationality', `{
  resetGame();
  careerSetProfile(rrStoreCurrentProfile(),22,'KAZ');
  const original=JSON.stringify(app.barnCatalog), current=JSON.stringify(app.currentBarn);
  const money=app.money, horse=app.horses[0], home=horse.boardingBarnId;
  const locations=barnLocationChoices();
  if(Object.keys(locations).length!==74 || Object.values(locations).flat().length!==210) throw Error('location coverage');
  for(const [country,cities] of Object.entries(BARN_COUNTRIES)) if(cities.some(city=>!locations[country].includes(city))) throw Error('lost legacy city');
  const targets=[['Germany','Aachen'],['Belgium','Lanaken'],['Netherlands','Valkenswaard'],['Kazakhstan','Almaty'],
    ['Japan','Tokyo'],['Qatar','Doha'],['Australia','Sydney'],['South Africa','Cape Town'],['USA','Los Angeles']];
  for(const [country,city] of targets) {
    const rows=barnLocationListings(country,city), barn=rows[0];
    if(!locations[country].includes(city) || barn.city!==city || barn.country!==country || barn.boardPerHorse<250 ||
      barn.boardPerHorse>2500 || !barn.facilityStars || new Set(locations[country]).size!==locations[country].length) throw Error(country+' location');
  }
  if(original!==JSON.stringify(app.barnCatalog) || current!==JSON.stringify(app.currentBarn) || app.money!==money ||
     horse.boardingBarnId!==home || careerRider().country!=='KAZ') throw Error('browsing changed the stable');
  const before=barnLocationListings('Belgium','Lanaken')[0];
  hydrateFromSave(JSON.parse(serializeAppState()));
  if(barnLocationListings('Belgium','Lanaken')[0].id!==before.id || careerRider().country!=='KAZ') throw Error('directory identity lost');
}`);
