const {check}=require('./behavior5-harness.cjs');
check('new riders use natural unique names without numbers or identifiers',`{
 resetGame();const roster=careerRoster(),names=new Set();for(const r of roster){if(/\\d|specialist:|world-rider|youth-rider|npc85-circuit/.test(r.name)||names.has(r.name))throw Error('invalid name '+r.name);names.add(r.name);}careerAddYouthCohort(app.year,roster);if(roster.some(r=>/\\d|specialist:|youth-rider/.test(r.name)))throw Error('cohort name');
}`);
check('name migration preserves IDs, countries, horses and result scores',`{
 resetGame();const r=careerRoster()[0],id=r.id,country=r.country,horse=r.horses[0].id;r.name='Test Rider specialist:FRA:jumping:13:1';const w=careerState();w.meets.names86={id:'names86',hour:pastureCalendarHour()-1,results:[{riderId:id,riderName:r.name,horseId:horse,score:12,points:25}]};riderNames86Repair();if(/\\d|specialist:/.test(r.name)||r.id!==id||r.country!==country||r.horses[0].id!==horse||w.meets.names86.results[0].riderName!==r.name||w.meets.names86.results[0].score!==12)throw Error('destructive rename');
 const saved=JSON.parse(serializeAppState());hydrateFromSave(saved);if(careerRoster().find(r=>r.id===id).name!==r.name)throw Error('name reroll');
}`);
check('international fields limit country concentration while national boards remain national',`{
 resetGame();const at=pastureCalendarHour(),world=npc85CircuitEvent('world','jumping','',at,0),field=RANK86_POOL(world,'world',''),counts={};for(const pair of field)counts[pair.rider.country]=(counts[pair.rider.country]||0)+1;if(field.length!==32||Object.keys(counts).length<16||Object.values(counts).some(n=>n>2))throw Error('country concentration');
 const national=npc85CircuitEvent('national','jumping','KAZ',at,0),locals=RANK86_POOL(national,'national','KAZ');if(locals.length!==32||locals.some(p=>p.rider.country!=='KAZ'))throw Error('national eligibility');
}`);
check('travel follows venue geography, including aliases and all four requested bands',`{
 resetGame();app.currentBarn.country='France';app.currentBarn.continent='Europe';const show={id:'travel86',home:false,eventSnapshot:{country:'FRA',continent:'Europe'}};if(![1,2].includes(tripDuration(show,tripScope(show))))throw Error('domestic');
 for(const [country,hours]of [['Germany',5],['Italy',12],['USA',24]]){show.eventSnapshot.country=country;if(tripDuration(show,tripScope(show))!==hours)throw Error(country);}
 app.currentBarn.country='UK';show.eventSnapshot.country='Germany';if(tripDuration(show,tripScope(show))!==5)throw Error('legacy UK alias');app.currentBarn.country='USA';show.eventSnapshot.country='Canada';if(tripDuration(show,tripScope(show))!==5)throw Error('North America');show.eventSnapshot.country='Brazil';if(tripDuration(show,tripScope(show))!==24)throw Error('continents');
 delete show.eventSnapshot;for(const [scope,hours]of [['country',5],['inter-region',12],['continent',24]])if(tripDuration(show,scope)!==hours)throw Error('manual scope');show.home=true;if(tripDuration(show)!==0)throw Error('home arena');
}`);
check('booking uses the new durations, real charges and overnight rules without repeat charges',`{
 resetGame();app.money=100000;app.currentBarn.country='France';app.currentBarn.continent='Europe';const h=app.horses[0];for(const [country,hours,nights]of [['Germany',5,0],['Italy',12,1],['USA',24,1]]){
  const s=showCreate(h,buildCompetitionRpgSession(h,'jumping','0.70'));s.home=false;s.eventSnapshot={country};s.stage='planning';s.classTime=pastureCalendarHour()+240;s.venueId='venue:'+country;bookShowTrip(s,{timing:'morning',nights});if(s.travel.duration!==hours||s.itinerary.reduce((n,l)=>n+l.hours,0)!==hours||s.stabling.required!==(hours>5))throw Error('booked duration');const money=app.money;s.stage='planning';bookShowTrip(s,{timing:'morning',nights});if(app.money!==money)throw Error('double charge');
 }
 if(!careerBusy([{start:0,end:2,country:'USA'}],{at:20,country:'France'}))throw Error('impossible continental NPC booking');
}`);
