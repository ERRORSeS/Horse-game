const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
function game() {
  const dummy = new Proxy(function(){},{get(t,k){if(['style','classList','dataset'].includes(k))return dummy;if(k==='value')return '';if(k==='querySelectorAll')return ()=>[];return ()=>{};}});
  const context=vm.createContext({console, document:{readyState:'loading',addEventListener(){},getElementById(){return dummy},querySelectorAll(){return []}},localStorage:{getItem(){return null},setItem(){}},window:{addEventListener(){}},alert(m){throw Error(m)},setTimeout(){},clearTimeout(){}});
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const match of html.matchAll(/<script src="([^?]+)\?/g))vm.runInContext(fs.readFileSync(path.join(root,match[1]),'utf8'),context,{filename:match[1]});
  return context;
}
let count=0;
function test(name,source){const context=game();try{vm.runInContext(`resetGame();${source}`,context);count++;console.log(`PASS ${name}`);}catch(e){throw Error(`${name}: ${e.stack}`)}}
const fixture=`
function setup(social=60,personality='Easy-Going',gender='Gelding'){
 const a=baseHorse(),b=baseHorse();
 a.id='A';b.id='B';a.name='Aspen';b.name='Birch';a.age=b.age=8;a.social=b.social=social;a.personality=b.personality=personality;a.gender=b.gender=gender;
 a.turnoutAssignmentHours=b.turnoutAssignmentHours=8;a.illnesses=[];b.illnesses=[];a.stallRest=b.stallRest=false;
 app.horses=[a,b];app.currentBarn.id='barn';app.currentBarn.facilityStars=3;app.currentBarn.careStars=5;app.currentBarn.pasturesEnabled=true;
 app.currentBarn.pastures=[{id:'group',name:'Shared Meadow',individual:false,available:true,guests:0},{id:'solo',name:'Quiet Paddock',individual:true,available:true,guests:0}];
 a.pastureBooking={barnId:'barn',pastureId:'group'};b.pastureBooking={barnId:'barn',pastureId:'group'};
 app.pastureRelationships=null;app.management=null;const state=ensurePastureRelationships();state.seed=123456789;app.currentBarn.pastureSimulationMonth=Math.floor(pastureCalendarHour()/720);
 return {a,b,state,p:app.currentBarn.pastures[0],start:pastureCalendarHour()};
}
function check(v,message){if(!v)throw Error(message)};
`;
test('one reciprocal pair, meeting, turnout hours and no duplicate processing',fixture+`
 const {a,b,state,start}=setup();simulatePastureUntil(start+24);const r=existingPasturePair(a,b);
 check(r===existingPasturePair(b,a),'not reciprocal');check(Object.keys(state.pairs).length===1,'duplicate pair');check(r.sharedHours===8,'wrong turnout hours');
 const before=serializeAppState();simulatePastureUntil(start+24);check(serializeAppState()===before,'processed same time twice');
 check(r.history.filter(id=>state.events[id].eventId===86).length===1,'duplicate first meeting');check(r.score<=5,'daily gain exceeded');
`);
test('30 days in month, day, hour and mixed batches produce identical pasture state',fixture+`
 function run(chunks){const {a,b,state,start}=setup();for(const offset of chunks)simulatePastureUntil(start+offset);return JSON.stringify(state)}
 const monthly=run([720]);check(monthly===run(Array.from({length:30},(_,i)=>(i+1)*24)),'day batch mismatch');
 check(monthly===run(Array.from({length:720},(_,i)=>i+1)),'hour batch mismatch');
 check(monthly===run([9,24,32,48,200,201,720]),'mixed batch mismatch');
`);
test('daily positive/negative caps, bounded score and permanent threshold history',fixture+`
 const {a,b,state,p,start}=setup();const r=getPasturePair(a,b,p,start+8);
 for(let n=0;n<30;n++)changePastureRelationship(r,3,[a,b],p,start+8);check(r.score===5,'positive cap');
 for(let n=0;n<30;n++)changePastureRelationship(r,-5,[a,b],p,start+8);check(r.score===0,'ordinary negative cap');
 changePastureRelationship(r,-200,[a,b],p,start+8,{serious:true});check(r.score===-100,'score lower bound');
 r.score=40;r.daily={day:-1,gain:0,loss:0};changePastureRelationship(r,2,[a,b],p,start+24+8);
 check(r.history.filter(id=>state.events[id].eventId===87).length===1,'missing friendship');
 changePastureRelationship(r,1,[a,b],p,start+24+9);check(r.history.filter(id=>state.events[id].eventId===87).length===1,'milestone repeated');
 r.score=39;changePastureRelationship(r,2,[a,b],p,start+48+8);check(r.history.some(id=>state.events[id].title==='Reconciliation'),'no reconciliation');
 r.score=99;r.daily={day:-1,gain:0,loss:0};changePastureRelationship(r,5,[a,b],p,start+72+8);check(r.score===100,'score upper bound');
`);
test('social 5 solitary and social 90 alone; no invented relationships',fixture+`
 let {a,b,state,start}=setup(5);app.horses=[a];a.pastureBooking.pastureId='solo';simulatePastureUntil(start+72);
 check(Object.keys(state.pairs).length===0,'solo phantom pair');check(!a.turnoutSocialIssue,'independent horse unhappy');
 ({a,b,state,start}=setup(90));app.horses=[a];a.pastureBooking.pastureId='solo';simulatePastureUntil(start+72);
 check(careSocialStatus(a).pp===10,'missing social weighting');trainerNotesForHorse(a);check(a.trainerNotes.some(n=>n.includes('Social Dissatisfaction')),'missing social trainer note');
`);
test('friends reduce and enemies increase one combined fight hazard; personality 6%',fixture+`
 const {a,b,p,start}=setup();const r=getPasturePair(a,b,p,start+8);r.compatibility=0;
 const neutral=pastureFightRisk(a,b,r,p,2);r.score=83;const friend=pastureFightRisk(a,b,r,p,2);r.score=-83;const enemy=pastureFightRisk(a,b,r,p,2);check(friend<=neutral&&enemy>neutral,'relationship hazard');
 r.score=0;a.personality='Hot-Blooded';const risk=pastureFightRisk(a,b,r,p,2);check(Math.abs(1-Math.pow(1-risk,8)-.06)<1e-10,'personality not six percent');
 a.gender=b.gender='Stallion';const stallion=pastureFightRisk(a,b,r,p,2);check(stallion>risk,'stallion fighting removed');check(PASTURE_PERSONALITY_FIGHT_RISK===.06,'wrong modifier');
`);
test('at most one serious fight per pair/day; reciprocal logs, injury and stall rest',fixture+`
 const {a,b,state,p,start}=setup(30,'Hot-Blooded','Stallion');const r=getPasturePair(a,b,p,start+8);const c={a,b,rel:r,p,hour:start+8,group:[a,b]};
 const savedRandom=pastureRandom;pastureRandom=()=>.01;HorseHealth.injuryOutcome=()=> 'minor';const e=applyPastureEvent(PASTURE_EVENT_LIBRARY[45],c,{serious:true});
 check(Boolean(e),'fight not generated');check(applyPastureEvent(PASTURE_EVENT_LIBRARY[45],c,{serious:true})===null,'duplicate daily fight');
 check(a.pastureImportantIds.includes(e.id)&&b.pastureImportantIds.includes(e.id),'not linked');check(a.vetNotes.length&&a.illnesses.some(i=>i.active),'no veterinary injury');check(!pastureMedicalEligible(a),'injured horse still eligible');
 a.illnesses.forEach(i=>i.active=false);b.illnesses.forEach(i=>i.active=false);c.hour+=24;applyPastureEvent(PASTURE_EVENT_LIBRARY[45],c,{serious:true});
 trainerNotesForHorse(a);check(a.trainerNotes.some(n=>n.includes('serious fights')&&n.includes('Consider separating')),'repeated fight warning');pastureRandom=savedRandom;
`);
test('retired, breeding-retired, elderly and unrideable horses still turn out',fixture+`
 const {a,b,start}=setup();a.retiredForever=true;a.age=25;b.retiredToBreeding=true;b.unridable=true;simulatePastureUntil(start+24);check(existingPasturePair(a,b).sharedHours===8,'retirement excluded');
`);
test('foal and mother, lactation eligibility, solo pasture family and no riding skill gain',fixture+`
 const {a,b,p,start}=setup();a.age=0;a.foalVitality={ageDays:30};a.damId=b.id;b.gender='Mare';a.pastureBooking=null;b.pastureBooking.pastureId='solo';
 const stats=JSON.stringify(a.stats);simulatePastureUntil(start+24);check(existingPasturePair(a,b).sharedHours===8,'foal missing mother turnout');check(JSON.stringify(a.stats)===stats,'pasture increased riding skill');
 const r=existingPasturePair(a,b),c={a,b,rel:r,group:[a,b],p:app.currentBarn.pastures[1],hour:start+8};check(pastureEventEligible(PASTURE_EVENT_LIBRARY[66],c),'nursing unavailable');b.lactating=false;check(!pastureEventEligible(PASTURE_EVENT_LIBRARY[66],c),'nursing nonlactating mare');
 b.stallRest=true;check(!pastureAttendance(a,c.p,start+8),'foal out without resting mother');
`);
test('moving, sold/dead horses, separated history, reunion and six-month decay',fixture+`
 const {a,b,state,p,start}=setup();simulatePastureUntil(start+24);const r=existingPasturePair(a,b);r.score=50;
 b.pastureBooking.pastureId='solo';syncPastureSeparations(start+24);check(r.separated,'separation missing');
 const hours=r.sharedHours;simulatePastureUntil(start+48);check(r.sharedHours===hours,'different pasture interaction');
 b.pastureBooking.pastureId='group';simulatePastureUntil(start+72);check(!r.separated,'reunion missing');check(r.history.some(id=>state.events[id].eventId===14),'friend reunion not retained');
 app.horses=[a];syncPastureSeparations(start+72);check(r.separated,'sold companion not separated');
 const positive=r.score;pastureDailyMaintenance(r.lastContact+181*24);check(r.score===positive-1,'long separation no decay');
 check(horseRelationshipMarkup(a).includes('Historical companion'),'broken missing horse reference');
 b.deceased=true;app.horses.push(b);simulatePastureUntil(start+96);check(r.sharedHours<=16,'dead horse interacted');
`);
test('diary 100 cap, permanent history and pasture filter metadata',fixture+`
 const {a,b,state,p,start}=setup();const r=getPasturePair(a,b,p,start+8);const first=r.history[0];
 for(let n=0;n<150;n++)BEHAVIOR_BASE_PASTURE_RECORD(PASTURE_EVENT_LIBRARY[20],[a],p,start+8+n,[]);
 check(a.pastureLogIds.length===100,'diary cap');pastureDailyMaintenance(start+192);check(state.events[first]&&r.history.includes(first),'history expired');
 const html=horseRelationshipMarkup(a);for(const f of ['All Events','Positive','Neutral','Negative','Important'])check(html.includes(f),'missing filter '+f);
 check(pastureCompatibilityMarkup(p).includes('Pasture History'),'no barn history control');
`);
test('old save migration, full save/load round-trip, disabling and barn changes',fixture+`
 const {a,b,state,start}=setup();simulatePastureUntil(start+24);const before=JSON.stringify(state);const saved=JSON.parse(serializeAppState());hydrateFromSave(saved);check(JSON.stringify(app.pastureRelationships)===before,'state round trip');
 app.currentBarn.pasturesEnabled=false;const points=Object.values(state.pairs)[0].score;simulatePastureUntil(start+48);check(Object.values(state.pairs)[0].score===points,'disabled relationships changed');
 const old=JSON.parse(serializeAppState());delete old.pastureRelationships;const fields=JSON.stringify({stats:old.horses[0].stats,booking:old.horses[0].pastureBooking,retired:old.horses[0].retiredForever});hydrateFromSave(old);
 check(Object.keys(app.pastureRelationships.pairs).length===0,'old save not initialized');check(JSON.stringify({stats:app.horses[0].stats,booking:app.horses[0].pastureBooking,retired:app.horses[0].retiredForever})===fields,'migration changed unrelated fields');
`);
test('event library complete, variants, foal/adult gates and no unscheduled pasture events',fixture+`
 const {a,b,state,p,start}=setup();check(PASTURE_EVENT_LIBRARY.filter(e=>e.id<=90).length===90&&new Set(PASTURE_EVENT_LIBRARY.map(e=>e.id)).size===PASTURE_EVENT_LIBRARY.length,'event library incomplete');
 check(PASTURE_EVENT_LIBRARY.every(e=>e.texts.length>=2),'missing text variations');
 const r=getPasturePair(a,b,p,start+8),c={a,b,group:[a,b],rel:r,p,hour:start+8};check(!pastureEventEligible(PASTURE_EVENT_LIBRARY[66],c),'adult nursing');
 a.pastureBooking=b.pastureBooking=null;const before=r.sharedHours;simulatePastureUntil(start+24);check(r.sharedHours===before,'unassigned pair interacted');
 check(!pastureAttendance(a,p,start+2),'night turnout generated');
`);
test('every ordinary template has a satisfiable gate and records truthful linked effects',fixture+`
 const visited=[];
 for(const e of PASTURE_EVENT_LIBRARY.filter(e=>e.id<=85)){
  const {a,b,p,start}=setup();const third=baseHorse();third.id='C';third.name='Cedar';third.social=60;third.age=8;third.personality='Easy-Going';third.gender='Gelding';third.pastureBooking={barnId:'barn',pastureId:'group'};app.horses.push(third);
  const r=getPasturePair(a,b,p,start+8);let group=[a,b,third];
  if([2].includes(e.id))r.score=11;
  if([8,11,20].includes(e.id))r.score=50;
  if(e.id===9)b.personality='Sensitive';
  if([6,12,13,18,30,49,79].includes(e.id))a.personality='Energetic';if(e.id===12)b.personality='Energetic';
  if(e.id===17)a.social=90;
  if(e.id===19){a.personality='Sensitive';r.sharedHours=24}if(e.id===20)r.sharedHours=100;
  if(e.id===36)r.score=-20;if([37,81].includes(e.id))a.personality='Stubborn';
  if([39,50].includes(e.id))p.guests=5;if(e.id===40)p.hasFeeder=true;if([43,76].includes(e.id))a.personality='Spooky';
  if(e.id===47){r.score=-50;r.sharedHours=32}
  if([48,83].includes(e.id))a.personality='Excitable';if(e.id===48){a.social=90;b.social=5}
  if(e.id===51)a.gender=b.gender='Stallion';if([52,53].includes(e.id))r.score=-80;
  if(e.id===54)getPasturePair(b,third,p,start+8).score=60;
  if(e.mode==='alone'){group=[a];a.social=[60,61,62,65].includes(e.id)?90:5;a.solitaryTurnoutDays=3}
  if(e.mode==='mother'){a.age=0;a.foalVitality={ageDays:30};a.damId=b.id;b.gender='Mare'}
  if([70,73].includes(e.id)){third.age=0;third.foalVitality={ageDays:30};third.damId=a.id;a.gender='Mare'}
  if(e.id===71){a.age=0;a.foalVitality={ageDays:30};a.damId=third.id;third.gender='Mare';b.personality='Easy-Going'}
  if(e.id===72){a.age=b.age=0;a.foalVitality={ageDays:30};b.foalVitality={ageDays:40}}
  if(e.id===77){a.personality='Sensitive';b.personality='Hot-Blooded'}
  if(e.id===78)a.personality='Bomb-proof';if(e.id===80)a.personality='Lazy';if(e.id===82)a.personality='Unfocused';if(e.id===84)a.personality='Hot-Blooded';
  const c={a,b,p,rel:r,group,hour:start+8};
  if(!['fight','reunion'].includes(e.mode))check(pastureEventEligible(e,c),'impossible event '+e.title);
  behaviorTrack(a,'Pasture',start+8,840,p.id);behaviorTrack(b,'Pasture',start+8,840,p.id);behaviorTrack(third,'Pasture',start+8,840,p.id);const entry=applyPastureEvent(e,c,{serious:e.mode==='fight'});check(entry&&entry.eventId===e.id,'event not applied '+e.title);
  check(!/\{(?:a|b|c|group)\}/.test(entry.description),'unresolved names '+e.title);
  check(entry.horses.every(x=>group.some(h=>h.id===x.id)),'phantom participant '+e.title);
  visited.push(e.id);
 }
 check(visited.length===85,'not all ordinary templates tested');
`);
test('real hour/day/month advance functions share the cursor and respect calendar boundaries',fixture+`
 const {a,b,state,start}=setup();const r=getPasturePair(a,b,app.currentBarn.pastures[0],start);r.compatibility=20;
 for(let i=0;i<5;i++)advanceOneHour();check(app.hour===5&&state.cursor===start+5,'hour integration');
 advanceOneDay();check(app.day===2&&app.hour===0&&state.cursor===start+24,'day integration');check(r.sharedHours===8,'partial day replay');
 monthlyProgress();check(app.month===2&&app.day===1&&state.cursor===start+720,'month integration');check(r.sharedHours<=240,'month exaggerated turnout');
 const savedCursor=state.cursor;advanceOneHour();check(state.cursor===savedCursor+1,'hour after month');
`);
test('all five major milestones and bonded reunion are retained exactly once',fixture+`
 const {a,b,state,p,start}=setup();const r=getPasturePair(a,b,p,start+8);
 r.score=40;changePastureRelationship(r,1,[a,b],p,start+8);
 r.score=75;r.daily={day:-1,gain:0,loss:0};changePastureRelationship(r,1,[a,b],p,start+32);
 r.score=-40;r.daily={day:-1,gain:0,loss:0};changePastureRelationship(r,-1,[a,b],p,start+56);
 r.score=-75;r.daily={day:-1,gain:0,loss:0};changePastureRelationship(r,-1,[a,b],p,start+80);
 for(let id=86;id<=90;id++)check(r.history.filter(key=>state.events[key].eventId===id).length===1,'milestone '+id);
 r.score=83;r.separated=true;pastureReunion(r,a,b,p,start+104,[a,b]);
 check(r.history.filter(key=>state.events[key].eventId===15).length===1,'bonded reunion');pastureReunion(r,a,b,p,start+105,[a,b]);check(r.history.filter(key=>state.events[key].eventId===15).length===1,'duplicate reunion');
`);
test('large stable month keeps ordinary logs bounded and pairs local',fixture+`
 setup();app.horses=[];app.currentBarn.pastures=[];
 for(let g=0;g<20;g++){
  const p={id:'p'+g,name:'Meadow '+g,individual:false,available:true,guests:0};app.currentBarn.pastures.push(p);
  for(let i=0;i<5;i++){const h=baseHorse();h.id='horse-'+g+'-'+i;h.gender='Gelding';h.personality='Easy-Going';h.social=60;h.turnoutAssignmentHours=8;h.pastureBooking={barnId:'barn',pastureId:p.id};app.horses.push(h)}
 }
 app.pastureRelationships=null;const state=ensurePastureRelationships();state.seed=12345;app.currentBarn.pastureSimulationMonth=Math.floor(pastureCalendarHour()/720);
 simulatePastureUntil(pastureCalendarHour()+720);
 check(Object.keys(state.pairs).length===200,'cross-pasture or duplicate pairs');check(app.horses.every(h=>(h.pastureLogIds||[]).length<=100),'large stable diary bound');
 check(Object.values(state.events).filter(e=>!e.important).length<=100*app.horses.length+200*app.currentBarn.pastures.length,'ordinary storage unbounded');
`);
console.log(`${count} pasture regression tests passed`);
