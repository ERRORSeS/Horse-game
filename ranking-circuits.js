/* Weekly background circuits keep every selectable ranking category competitive.
   Every published circuit score comes from persistent riders, horses and completed meets. */
function careerCircuitField(type,discipline,filter,hour){
 const ids=npc85EnsureCircuit(type,discipline,filter,hour),world=careerState(),rows=new Map();
 for(const id of ids){const meet=world.meets[id];if(!meet)continue;
  const source=type==='team'?(meet.teams||[]).map(t=>({...t,riderId:t.country,riderName:CAREER_COUNTRIES[t.country][0],horseId:null,horseName:null})):meet.results;
  for(const result of source){const credit=type==='team'?result:careerPointCredits(meet,result).find(c=>c.type===type&&String(c.filter)===String(filter));if(!credit?.points)continue;const points=credit.points;
   const key=type==='team'?result.country:['horse','young-horse'].includes(type)?result.horseId:type==='combination'?result.riderId+'|'+result.horseId:result.riderId;
   const rider=npc85Registry().riders.get(result.riderId);if(rider&&['division','youth-national','youth-international'].includes(type)&&!careerDivisions(rider,hour).includes(String(filter).split('|')[0]))continue;const name=type==='team'?result.riderName:['horse','young-horse'].includes(type)?result.horseName:type==='combination'?result.riderName+' / '+result.horseName:result.riderName;
   if(!rows.has(key))rows.set(key,{id:key,riderId:result.riderId,horseId:result.horseId,name,country:rider?npc85Nationality(rider):result.country,age:rider?careerAge(rider,hour,true):null,division:meet.division,specialty:discipline,circuit:true,circuitResults:[],points:0});
   const row=rows.get(key);row.points+=points;row.circuitResults.push({at:meet.hour,placing:result.placing,points,horseId:result.horseId,horseName:result.horseName});
  }
 }
 return [...rows.values()];
}
function careerRankingRows(type,discipline,filter='',hour=careerState().rankingHour??pastureCalendarHour(),force=false,priorRows){
 const world=careerState(),key=careerBoardKey(type,discipline,filter);world.rankingCircuits||={};
 if(!force&&world.rankingCircuits[key]===hour&&world.rankings[key]?.some(row=>row.circuit&&row.horseId||type==='team'&&row.circuit))return world.rankings[key];
 const old=priorRows||world.rankings[key]||[];
 if(old.some(row=>row.circuit&&!row.horseId&&type!=='team')){world.legacyCircuitRankings85 ||= {};world.legacyCircuitRankings85[key] ||= {hour,rows:HorseHealth.copy(old)};world.legacyCircuitIdentities85 ||= {};for(const row of old.filter(r=>r.circuit))world.legacyCircuitIdentities85[row.id] ||= {...HorseHealth.copy(row),legacy85:true};}
 const prior=new Map(old.map(row=>[row.id,row])),circuits=careerCircuitField(type,discipline,filter,hour),circuitById=new Map(circuits.map(row=>[row.id,row]));
 const earned=careerComputeBoards(hour+1)[key]||[];
 world.legacyEarnedRankings85 ||= {};if(!world.legacyEarnedRankings85[key]){const missing=old.filter(row=>!row.circuit&&!earned.some(r=>r.id===row.id)&&!careerResults({riderId:row.id,discipline}).length);world.legacyEarnedRankings85[key]={hour:world.rankingHour??hour,rows:HorseHealth.copy(missing)};}
 const legacy=world.legacyEarnedRankings85[key];if(hour-legacy.hour<CAREER_HOURS_PER_YEAR&&(!['national','youth-national','tour','team'].includes(type)||pastureDate(legacy.hour).year===pastureDate(hour).year))for(const row of legacy.rows)if(!earned.some(r=>r.id===row.id))earned.push({...row,legacy85:true});earned.sort((a,b)=>b.points-a.points||a.id.localeCompare(b.id));
 const rows=earned.map((row,index)=>({...row,...(circuitById.get(row.id)?{...circuitById.get(row.id),points:row.points}:{}),rank:index+1,previous:prior.get(row.id)?.rank??null,best:Math.min(prior.get(row.id)?.best??Infinity,index+1)}));
 world.rankings[key]=rows;world.rankingCircuits[key]=hour;world.rankingHour??=hour;return rows;
}
const CIRCUIT_PUBLISH=careerPublish;
careerPublish=function(hour,...args){
 const world=careerState(),watched=Object.keys(world.rankingCircuits||{}),prior=world.rankings;
 const result=CIRCUIT_PUBLISH(hour,...args);
 for(const key of watched){const [type,discipline,...filter]=key.split('|');careerRankingRows(type,discipline,filter.join('|'),hour,true,prior[key]);}
 return result;
};
const CIRCUIT_DETAILS=careerLeaderboardDetails;
careerLeaderboardDetails=function(row,type,...args){
 if(!row.circuit||type==='team')return CIRCUIT_DETAILS(row,type,...args);
 return `<p>${row.age} years old · ${csEscape(CAREER_AGE_DIVISIONS[row.division]?.label||row.division)} · ${csEscape(CAREER_DISCIPLINE_LABELS[row.specialty])} specialist</p><p>Weekly circuit results</p>${row.circuitResults.map(result=>`<p>${csEscape(pastureDateLabel(result.at))} · #${result.placing} · ${result.points} points</p>`).join('')}`;
};
