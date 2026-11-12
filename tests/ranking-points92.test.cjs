const {check}=require('./behavior5-harness.cjs');
check('all sanctioned custom tiers use a finite base and credit a qualifying result',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;
 careerSetProfile(rrStoreCurrentProfile(),17,'GBR');const rider=careerRider(),h=app.horses[0],now=pastureCalendarHour();
 for(let tier=0;tier<=11;tier++){
  const made=customShowCreate({name:'Points '+tier,venue:'Test Arena',country:'GBR',year:app.year,month:app.month,day:12,duration:1,prestige:90,tier,mode:'sanctioned',classes:[{name:'Junior',discipline:'jumping',level:'0.70',division:'junior',offset:0,capacity:12,fee:0,prize:500,npcs:true}]});
  if(!made.ok)throw Error(made.message);
  const event=customShowEvents(now,now+720).find(e=>e.customShowId===made.show.id);
  if(!Number.isFinite(event.base))throw Error('missing tier '+tier+' base');
  const standings=Array.from({length:12},(_,i)=>({player:i===0,riderId:'points92-npc-'+i,riderName:'Test Rider',horseId:i===0?h.id:'points92-horse-'+i,horseName:'Test Horse',rank:i+1,total:i*4,status:'Completed',started:true,country:'GBR'}));
  const meet=careerRecordMeet(event,standings,rider),row=meet.results[0];
  if(tier===0?row.points!==0:row.points<=0)throw Error('wrong tier '+tier+' points');
  if(tier>=5){const old={...event};delete old.base;if(careerPoints(old,row,12)!==45)throw Error('booked old snapshot still broken');}
  careerPublish(meet.hour);
  if(tier>0&&!careerState().rankings['division|jumping|junior']?.some(r=>r.id===rider.id&&r.points>=row.points))throw Error('finish missing at exact release');
 }
}`);
check('the release boundary includes completed points once and excludes future results',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const w=careerState(),r=careerRider(),h=app.horses[0],hour=pastureCalendarHour();
 const row={riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:'GBR',player:true,started:true,placing:1,score:0,points:25};
 for(const [id,at,points]of [['boundary',hour,25],['future',hour+1,99]])w.meets[id]={id,hour:at,at,discipline:'jumping',division:'junior',tier:3,official:true,ranking:'division',results:[{...row,points}]};
 careerPublish(hour);const key='division|jumping|junior';
 if(w.rankings[key]?.find(x=>x.id===r.id)?.points!==25)throw Error('boundary excluded or future included');
 if(careerRankingRows('division','jumping','junior',hour).find(x=>x.id===r.id)?.points!==25)throw Error('view used different cutoff');
 if(riderShowPointsMarkup(r).includes('25 points pending'))throw Error('published points still pending');
 careerPublish(hour,{repair:true});if(w.rankings[key].find(x=>x.id===r.id).points!==25)throw Error('double count');
}`);
check('loading repairs affected saved player results once without prizes or invalid points',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const w=careerState(),r=careerRider(),h=app.horses[0],hour=pastureCalendarHour(),cash=app.money;
 const result={riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:'GBR',player:true,started:true,status:'Completed',placing:1,score:0,points:0};
 const base={hour:hour-1,at:hour-3,discipline:'jumping',division:'junior',tier:8,official:true,custom:true,customId:'custom-old',ranking:'division',starters:12,fieldStrength:60,results:[result]};
 for(const [id,extra]of [['affected',{}],['sandbox',{sandbox:true}],['eliminated',{results:[{...result,eliminated:true,placing:null}]}],['small',{starters:2}],['already',{results:[{...result,points:53}]}],['unofficial',{official:false}],['unknownTier',{tier:undefined}],['schooling',{tier:0}]])w.meets[id]={...base,id,...extra};
 delete w.rankingPointsVersion92;w.rankingHour=hour;hydrateFromSave(JSON.parse(serializeAppState()));
 const state=careerState();if(state.meets.affected.results[0].points<=0)throw Error('old result not repaired');
 for(const id of ['sandbox','eliminated','small','unofficial','unknownTier','schooling'])if(state.meets[id].results[0].points!==0)throw Error('invalid points '+id);
 if(state.meets.already.results[0].points!==53||app.money!==cash)throw Error('rewrote earned points or replayed prize');
 const points=state.meets.affected.results[0].points;hydrateFromSave(JSON.parse(serializeAppState()));if(careerState().meets.affected.results[0].points!==points||app.money!==cash)throw Error('repair repeated');
}`);
check('every ranking calendar class across four years has a valid award and ranking destination',`{
 resetGame();careerSetProfile(rrStoreCurrentProfile(),17,'GBR');const r=careerRider(),h=app.horses[0],seen=new Set();let count=0;
 for(const e of careerSchedule(pastureCalendarHour(1,1,1),pastureCalendarHour(4,12,30,23))){
  if(!e.official||e.ranking==='none'||e.base===0)continue;
  if(!Number.isFinite(e.base)||e.base<=0)throw Error('calendar base '+e.id);
  const row={riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:'GBR',player:true,score:e.discipline==='dressage'||e.discipline==='hunter'?80:e.discipline==='eventing'?30:0,placing:1,started:true};
  row.points=careerPoints(e,row,32);if(row.points<=0)throw Error('calendar award '+e.id);
  if(e.ranking!=='team'&&!careerPointCredits(e,row).some(c=>c.points>0))throw Error('no board destination '+e.id);
  seen.add(e.discipline);count++;
 }
 if(seen.size!==4||count<100)throw Error('incomplete calendar coverage');
}`);
check('local calendar shows remain unranked and are excluded from save repairs',`{
 resetGame();careerSetProfile(rrStoreCurrentProfile(),17,'GBR');const r=careerRider(),h=app.horses[0],fixture=createBarnShowEvent({discipline:'jumping',level:'0.70',forceCurrentBarn:true});
 const show=showCreate(h,buildCompetitionRpgSession(h,'jumping','0.70'),fixture,'local92');
 show.finalStandings=Array.from({length:12},(_,i)=>({player:i===0,horseId:i===0?h.id:'local92-'+i,rank:i+1,total:i*4,status:'Completed',started:true}));
 const event=careerShowClass(show),meet=careerRecordMeet(event,show.finalStandings,r);
 if(event.ranking!=='none'||meet.results[0].points!==0)throw Error('local class became rankable');
 app.showHistory=[show];app.activeShow=null;delete careerState().rankingPointsVersion92;
 hydrateFromSave(JSON.parse(serializeAppState()));if(careerState().meets[event.id].ranking!=='none'||careerState().meets[event.id].results[0].points!==0)throw Error('repair ranked local show');
}`);
check('designated calendar ranking shows award and publish in every discipline with optional progression off',`{
 resetGame();careerSetProfile(rrStoreCurrentProfile(),17,'GBR');const r=careerRider(),h=app.horses[0],now=pastureCalendarHour();
 for(const d of DISCIPLINES){
  const event=careerSchedule(now,now+CAREER_HOURS_PER_YEAR).find(e=>e.discipline===d&&e.official&&e.ranking==='national'&&e.base>0);
  if(!event)throw Error('missing calendar fixture '+d);
  const standings=Array.from({length:16},(_,i)=>({player:i===0,riderId:'calendar92-'+d+i,riderName:'Test Rider',horseId:i===0?h.id:'calendar92-horse-'+i,horseName:'Test Horse',rank:i+1,total:d==='dressage'||d==='hunter'?80-i:d==='eventing'?30+i:i*4,status:'Completed',started:true,country:'GBR'}));
  const meet=careerRecordMeet(event,standings,r);if(meet.results[0].points<=0)throw Error('calendar show blocked by optional settings '+d);
  careerPublish(meet.hour);if(!careerState().rankings['national|'+d+'|GBR']?.some(x=>x.id===r.id&&x.points>0))throw Error('calendar release lost '+d);
 }
}`);
check('old designated calendar results repair from the catalogue without retained show snapshots',`{
 resetGame();careerSetProfile(rrStoreCurrentProfile(),17,'GBR');const r=careerRider(),h=app.horses[0],w=careerState(),hour=pastureCalendarHour();
 const event=careerSchedule(hour,hour+CAREER_HOURS_PER_YEAR).find(e=>e.discipline==='jumping'&&e.ranking==='national'&&e.base>0);
 w.meets[event.id]={id:event.id,classId:event.classId,at:event.at,hour:careerEventEnd(event),discipline:event.discipline,tier:event.tier,ranking:event.ranking,division:event.division,official:true,starters:12,fieldStrength:60,results:[{riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:r.country,player:true,started:true,placing:1,score:0,points:0}]};
 app.showHistory=[];app.activeShow=null;delete w.rankingPointsVersion92;
 hydrateFromSave(JSON.parse(serializeAppState()));if(careerState().meets[event.id].results[0].points<=0)throw Error('catalogue-backed result not restored');
}`);
