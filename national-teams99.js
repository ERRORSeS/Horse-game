/* International programme fields use actual scheduled selection trials and completed team results. */
function national99Name(country,discipline,division='senior'){
 return (CAREER_COUNTRIES[country]?.[0]||country)+' · '+(CAREER_AGE_DIVISIONS[division]?.label||division)+' National '+CAREER_DISCIPLINE_LABELS[discipline]+' Team';
}
const NATIONAL99_PLAN_IDS=new WeakMap();
function national99Plans(year){
 const world=careerState();let cache=NATIONAL99_PLAN_IDS.get(world);if(!cache){cache=new Map();NATIONAL99_PLAN_IDS.set(world,cache);}
 const key=year+'|'+federationCountries().join(',');if(cache.has(key))return cache.get(key);
 const plans=new Map();for(const country of federationCountries())for(const plan of federationPlans(year,country)){
  const countries=new Set(federation90ProgramEvents(plan).filter(e=>e.team).flatMap(e=>e.programCountries));for(const other of countries)if(other!==country){const peer=federationPlan(year,other,plan.discipline,plan.division);if(peer)plans.set(peer.id,peer);}
 }const out=[...plans.values()];if(cache.size>=16)cache.clear();cache.set(key,out);return out;
}
const NATIONAL99_SCHEDULE=careerSchedule;
careerSchedule=function(from,to,...args){const events=NATIONAL99_SCHEDULE(from,to,...args);if(!federationEnabled())return events;const ids=new Set(events.map(e=>e.id));for(let y=pastureDate(from).year;y<=pastureDate(to).year;y++)for(const plan of national99Plans(y))for(const trial of plan.trials)if(trial.at>=from&&trial.at<=to&&!ids.has(trial.id)){events.push(trial);ids.add(trial.id);}return events.sort((a,b)=>a.at-b.at||a.id.localeCompare(b.id));};
const NATIONAL99_SEASON=federation90EnsureSeason;
let national99Selecting=false;
federation90EnsureSeason=function(event,country){
 if(event.federationProgram&&event.team&&!national99Selecting&&!federationCountries().includes(country)){
  const plan=federationPlan(event.date.year,country,event.discipline,event.division),clock=Math.max(pastureCalendarHour(),careerState().cursor||0);let changed=false;
  if(plan&&clock>=plan.selection){national99Selecting=true;try{for(const trial of [...plan.trials].sort((a,b)=>a.at-b.at)){if(careerEventEnd(trial)>clock||careerEventEnd(trial)>=event.at)continue;const old=careerState().meets[trial.id];if(old?.results.length)continue;if(old)delete careerState().meets[trial.id];const meet=careerResolveNpcMeet(trial);if(meet?.results.length)changed=true;}
   if(changed&&federation90BoardBatch)federation90BoardBatch.trialMeets=null;
   if(changed)federation90Select(plan,Math.min(clock,event.at-1),'Recorded national selection trials completed');
  }finally{national99Selecting=false;}}
 }
 return NATIONAL99_SEASON(event,country);
};
const NATIONAL99_PROGRAM=federation90ProgramEvents;
federation90ProgramEvents=function(plan){
 const countries=Object.keys(CAREER_COUNTRIES).filter(c=>c!==plan.country).sort((a,b)=>careerRoll(plan.country+'|'+plan.discipline+'|'+plan.division,a)-careerRoll(plan.country+'|'+plan.discipline+'|'+plan.division,b)),months=[2,3,4,5,6,8,10,11,12];
 return NATIONAL99_PROGRAM(plan).map(e=>{const slot=(plan.year-1)*months.length+Math.max(0,months.indexOf(e.date.month)),programCountries=[plan.country,...Array.from({length:Math.min(5,countries.length)},(_,i)=>countries[(slot*5+i)%countries.length])];return {...e,programCountries,...(e.team?{npcCount:programCountries.length*e.team}:{})};});
};
function national99Competitive(meet){return new Set((meet?.teams||[]).map(t=>t.country)).size>=2;}
const NATIONAL99_SCORES=careerTeamScores;
careerTeamScores=function(event,...args){const rows=NATIONAL99_SCORES(event,...args);return event.federationProgram&&rows.length<2?[]:rows;};
function national99Board(d,division,hour=careerState().rankingHour??pastureCalendarHour(),series=''){
 const year=pastureDate(hour).year,rows=new Map();
 const add=c=>{if(!rows.has(c))rows.set(c,{id:c,country:c,name:national99Name(c,d,division),points:0,starts:0});return rows.get(c);};
 if(!series)for(const country of Object.keys(CAREER_COUNTRIES))add(country);
 for(const season of Object.values(app.career?.federations?.seasons||{}))if(!series&&season.discipline===d&&season.division===division&&season.expires>hour&&season.selectedAt<=hour&&season.members.some(m=>federation90Role(m)==='main'))add(season.country);
 for(const meet of Object.values(careerState().meets))if(rank91Real(meet)&&national99Competitive(meet)&&(!series||meet.series===series)&&meet.discipline===d&&meet.division===division&&meet.hour<=hour&&pastureDate(meet.hour).year===year)for(const team of meet.teams||[]){const row=add(team.country);row.points+=team.points||0;row.starts++;}
 let last=null,rank=0;return [...rows.values()].sort((a,b)=>b.points-a.points||b.starts-a.starts||a.country.localeCompare(b.country)).map((r,i)=>{if(r.points!==last){rank=i+1;last=r.points;}return {...r,rank,best:null};});
}
const NATIONAL99_ROWS=careerRankingRows;
careerRankingRows=function(type,d,filter='',hour=careerState().rankingHour??pastureCalendarHour(),...args){if(type==='team'&&String(filter).startsWith('national-teams|'))return national99Board(d,String(filter).split('|')[1],hour);if(type==='team')return national99Board(d,rank91Spec('team',d,filter).division,hour,filter);return NATIONAL99_ROWS(type,d,filter,hour,...args);};
const NATIONAL99_HISTORY=ranking93History;
ranking93History=function(row,type,d,filter='',hour=careerState().rankingHour??pastureCalendarHour()){
 if(type!=='team'||!String(filter).startsWith('national-teams|'))return NATIONAL99_HISTORY(row,type,d,filter,hour).filter(r=>type!=='team'||national99Competitive(careerState().meets[r.eventId]));
 return Object.values(careerState().meets).filter(m=>rank91Real(m)&&national99Competitive(m)&&m.discipline===d&&m.division===String(filter).split('|')[1]&&m.hour<=hour&&pastureDate(m.hour).year===pastureDate(hour).year).flatMap(m=>{const r=m.teams?.find(t=>t.country===row.country);return r?[{...r,hour:m.hour,event:m.name,eventId:m.id,rankingPoints:r.points||0}]:[];}).sort((a,b)=>b.hour-a.hour);
};
const NATIONAL99_RESULT=showResultMarkup;
showResultMarkup=function(show,...args){let html=NATIONAL99_RESULT(show,...args);const meet=careerState().meets[show.eventId];if(!meet?.teams?.length)return html;if(!national99Competitive(meet))return html+'<p>National team rankings require at least two classified countries. This result does not count toward team standings.</p>';return html+'<section class="box" data-national99-team-results><h3>National team standings</h3>'+meet.teams.map(t=>'<details><summary>#'+t.placing+' · '+csEscape(national99Name(t.country,meet.discipline,meet.division))+' · '+t.points+' team pts</summary><p>Team score: '+Number(t.score).toFixed(2)+' · '+(t.members?.length||0)+' counting combinations</p><p>'+meet.results.filter(r=>r.country===t.country).map(r=>csEscape(r.riderName)+' / '+csEscape(r.horseName)+(t.members?.includes(r.riderId)?' (counting)':'')).join(' · ')+'</p></details>').join('')+'</section>';};
// Selection trials need a small candidate list, not a new 50-rider ranking pool for every visiting country.
const NATIONAL99_TRIAL_ROSTER=ranking91EventRoster;
ranking91EventRoster=function(event,roster){
 if(!event.federationTrial||federationCountries().includes(event.federation))return NATIONAL99_TRIAL_ROSTER(event,roster);
 const spec=rank91Spec('youth-national',event.discipline,event.division+'|'+event.federation),candidates=(careerRosterIndex(roster).byCountry.get(event.federation)||[]).filter(r=>rank91Eligible(r,spec,event.at)).sort((a,b)=>b.skill-a.skill||a.id.localeCompare(b.id)).slice(0,12);
 if(candidates.length>=12)return candidates;
 const names=new Set(roster.map(r=>r.name)),horses=new Set(roster.flatMap(r=>(r.horses||[]).map(h=>horseNameKey(h.name)))),[lo,hi]=CAREER_AGE_DIVISIONS[event.division].ages;let sequence=0;
 while(candidates.length<12){const id='national99:'+event.federation+':'+event.discipline+':'+event.division+':'+event.date.year+':'+ ++sequence;if(roster.some(r=>r.id===id))continue;
  const age=lo+Math.floor(careerRoll(id,'age')*(Math.min(hi,55)-lo+1)),skill=76+careerRoll(id,'skill')*22,r={id,name:careerUniqueRiderName(id,event.federation,names),country:event.federation,specialty:event.discipline,birth:{year:event.date.year-age,month:1,day:1},professional:event.division==='professional'||event.division!=='amateur'&&age>=18,stage:skill>=92?4:3,skill,potential:100,travelWillingness:careerRoll(id,'travel'),horses:[],retiredHorses:[],starts:0,training:[],rankingDebutHour86:Math.min(event.at,pastureCalendarHour())};
  const h=careerNpcHorse(r,event.division==='pony'?'pony':'sport',event.date.year,horses,event.division==='pony'?'pony':'sport');r.horses.push(h);npc85Initialize(r,h);roster.push(r);candidates.push(r);
 }
 npc85Registry(true);return candidates;
};
