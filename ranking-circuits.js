/* Weekly background circuits keep every selectable ranking category competitive.
   Fields and results are deterministic, so unopened boards need no saved NPC pool. */
function careerCircuitField(type,discipline,filter,hour){
 const year=pastureDate(hour).year,week=Math.floor(hour/CAREER_HOURS_PER_WEEK);
 const parts=String(filter||'').split('|'),countries=Object.keys(CAREER_COUNTRIES);
 const division=['division','youth-international','youth-national'].includes(type)?parts[0]:'senior';
 const ages=CAREER_AGE_DIVISIONS[division]?.ages||[18,55];
 const home=type==='national'?String(filter):type==='youth-national'?parts[1]:null;
 const firstNames=CAREER_FIRST_NAMES.filter((_,i)=>i%DISCIPLINES.length===DISCIPLINES.indexOf(discipline));
 const used=new Set(),field=[];
 for(let index=0;index<32;index++){
  const id=['ranking-circuit',year,discipline,type,filter||'open',index].join(':');
  const country=home||countries[index%countries.length];
  let name=careerPick(id,'first',firstNames)+' '+careerPick(id,'last',CAREER_SURNAMES);
  if(used.has(name))name+=' '+(index+1);used.add(name);
  const age=ages[0]+Math.floor(careerRoll(id,'age')*(Math.min(ages[1],55)-ages[0]+1));
  const horseName=careerPick(id,'horse-first',CAREER_SURNAMES)+' '+careerPick(id,'horse-last',CAREER_SURNAMES);
  const skill=58+careerRoll(id,'skill')*38;
  field.push({id:type==='team'?country:id,name:type==='team'?CAREER_COUNTRIES[country][0]:type==='horse'||type==='young-horse'?horseName:type==='combination'?name+' / '+horseName:name,
   country,age,division,specialty:discipline,skill,horseAge:type==='young-horse'?Number(filter):8+index%8,
   circuit:true,circuitResults:[],points:0,week});
 }
 const seasonal=!['world','horse','combination','division','youth-international','young-horse'].includes(type);
 // Four weekly rounds provide varied form and recurring rivals, with 24 scoring places per round.
 for(let round=0;round<4;round++){
  const at=hour-round*CAREER_HOURS_PER_WEEK;if(at<0||seasonal&&pastureDate(at).year!==year)continue;
  const standings=field.map(row=>({row,performance:row.skill+(careerRoll(row.id,'form:'+Math.floor(at/CAREER_HOURS_PER_WEEK))-.5)*42}))
   .sort((a,b)=>b.performance-a.performance||a.row.id.localeCompare(b.row.id));
  for(const [index,{row,performance}]of standings.entries()){
   const placing=index+1,base=type==='world'?100:type==='national'||type==='youth-national'?20:40;
   const points=placing<=24?Math.max(1,Math.round(base*(25-placing)/24)):0;
   row.points+=points;row.circuitResults.push({at,placing,points,performance:Math.round(performance*10)/10});
  }
 }
 return field.filter(row=>row.points>0);
}
function careerRankingRows(type,discipline,filter='',hour=careerState().rankingHour??pastureCalendarHour(),force=false,priorRows){
 const world=careerState(),key=careerBoardKey(type,discipline,filter);
 world.rankingCircuits||={};
 if(!force&&world.rankingCircuits[key]===hour&&world.rankings[key]?.some(row=>row.circuit))return world.rankings[key];
 const prior=new Map((priorRows||world.rankings[key]||[]).map(row=>[row.id,row]));
 const earned=(world.rankings[key]||[]).filter(row=>!row.circuit);
 const earnedIds=new Set(earned.map(row=>row.id));
 const rows=[...earned,...careerCircuitField(type,discipline,filter,hour).filter(row=>!earnedIds.has(row.id))]
  .sort((a,b)=>b.points-a.points||a.id.localeCompare(b.id))
  .map((row,index)=>({...row,rank:index+1,previous:prior.get(row.id)?.rank??null,best:Math.min(prior.get(row.id)?.best??Infinity,index+1)}));
 world.rankings[key]=rows;world.rankingCircuits[key]=hour;world.rankingHour??=hour;
 return rows;
}
const CIRCUIT_PUBLISH=careerPublish;
careerPublish=function(hour,...args){
 const world=careerState(),watched=Object.keys(world.rankingCircuits||{}),prior=world.rankings;
 const result=CIRCUIT_PUBLISH(hour,...args);
 for(const key of watched){const [type,discipline,...filter]=key.split('|');careerRankingRows(type,discipline,filter.join('|'),hour,true,prior[key]);}
 return result;
};
const CIRCUIT_DETAILS=careerLeaderboardDetails;
careerLeaderboardDetails=function(row,...args){
 if(!row.circuit)return CIRCUIT_DETAILS(row,...args);
 return `<p>${row.age} years old · ${csEscape(CAREER_AGE_DIVISIONS[row.division]?.label||row.division)} · ${csEscape(CAREER_DISCIPLINE_LABELS[row.specialty])} specialist</p><p>Weekly circuit results</p>${row.circuitResults.map(result=>`<p>${csEscape(pastureDateLabel(result.at))} · #${result.placing} · ${result.points} points</p>`).join('')}`;
};
