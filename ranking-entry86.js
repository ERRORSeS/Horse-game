/* Schooling limits apply at the date of every ranked competition, in all disciplines. */
function rankingSchoolingAge86(h,d,level,at){const age=npc85HorseAge(h,at),band=auctionSchoolingBand(d,level);return age>=3&&(age<=5?band==='low':age<7?band!=='high':true);}
/* New ranking entrants earn their way in; opening a board never creates past results. */
const RANK86_EARNED=new WeakMap();
function rank86Earned(){const world=careerState(),count=Object.keys(world.meets||{}).length;let cache=RANK86_EARNED.get(world);if(cache?.count===count)return cache.ids;const ids=new Set();for(const meet of Object.values(world.meets||{}))for(const row of meet.results||[])if(row.points>0)ids.add(row.riderId);for(const rows of Object.values(world.rankings||{}))for(const row of rows)if(row.points>0)ids.add(row.riderId||row.id);RANK86_EARNED.set(world,{count,ids});return ids;}
function rank86Source(type,d,filter){return type==='combination'||type==='horse'&&!filter?careerBoardKey('world',d,''):type==='horse'&&filter==='pony'?careerBoardKey('division',d,'pony'):careerBoardKey(type,d,filter);}
const RANK86_POOL=npc85CircuitPool;
npc85CircuitPool=function(event,type,filter){const field=RANK86_POOL(event,type,filter),world=careerState(),hour=Math.max(world.rankingHour??0,world.cursor??0,pastureCalendarHour()),earned=rank86Earned();world.rankingEntrants86 ||= {};
 for(const pair of field)if(pair.rider.rankingDebutHour86==null&&!earned.has(pair.rider.id))pair.rider.rankingDebutHour86=hour+1;
 world.rankingEntrants86[event.circuitBoard85]={division:event.division,teamSize:event.team||0,entries:field.map(pair=>({riderId:pair.rider.id,horseId:pair.horse.id}))};
 return field.filter(pair=>pair.rider.rankingDebutHour86==null||event.at>=pair.rider.rankingDebutHour86);
};
function rank86Pending(type,d,filter,hour){const source=careerState().rankingEntrants86?.[rank86Source(type,d,filter)];if(!source)return [];const registry=npc85Registry(),rows=[],teams=new Map();for(const entry of source.entries){const r=registry.riders.get(entry.riderId),h=registry.horses.get(entry.horseId);if(!r||!h||r.retired||h.retiredForever)continue;const country=npc85Nationality(r);if(type==='team'){teams.set(country,(teams.get(country)||0)+1);continue;}const id=['horse','young-horse'].includes(type)?h.id:type==='combination'?r.id+'|'+h.id:r.id,name=['horse','young-horse'].includes(type)?h.name:type==='combination'?r.name+' / '+h.name:r.name;rows.push({id,riderId:r.id,horseId:h.id,name,country,age:careerAge(r,hour,true),division:source.division,specialty:d,points:0,circuit:true,circuitResults:[],newEntrant86:true});}
 if(type==='team')for(const [country,count]of teams)if(count>=source.teamSize)rows.push({id:country,name:CAREER_COUNTRIES[country][0],country,points:0,circuit:true,circuitResults:[],newEntrant86:true});return rows;
}
const RANK86_FIELD=careerCircuitField;
careerCircuitField=function(type,d,filter,hour){const scored=RANK86_FIELD(type,d,filter,hour),ids=new Set(scored.map(r=>r.id));return [...scored,...rank86Pending(type,d,filter,hour).filter(r=>!ids.has(r.id))];};
const RANK86_ROWS=careerRankingRows;
careerRankingRows=function(type,d,filter='',hour=careerState().rankingHour??pastureCalendarHour(),...args){const before=new Map((args[1]||careerState().rankings[careerBoardKey(type,d,filter)]||[]).map((row,i)=>[row.id,i])),rows=RANK86_ROWS(type,d,filter,hour,...args),ids=new Set(rows.map(r=>r.id));rows.push(...rank86Pending(type,d,filter,hour).filter(r=>!ids.has(r.id)));rows.sort((a,b)=>b.points-a.points||(a.points===0?(before.get(a.id)??Infinity)-(before.get(b.id)??Infinity):0)||a.id.localeCompare(b.id));rows.forEach((row,i)=>row.rank=i+1);careerState().rankings[careerBoardKey(type,d,filter)]=rows;return rows;};
const RANK86_POINTS=careerPoints;
careerPoints=function(event,row,...args){const points=RANK86_POINTS(event,row,...args);if(!row.riderId)return points;const r=careerRosterIndex(careerState().npcs||[]).byId.get(row.riderId),debut=r?.rankingDebutHour86;if(debut==null)return points;if(event.at<debut)return 0;return Math.round(points*Math.min(1,((r.rankingScoringStarts86||0)+1)/4));};
const RANK86_RECORD=careerRecordMeet;
careerRecordMeet=function(event,...args){const previous=app.career?.meets[event.id],meet=RANK86_RECORD(event,...args);if(!previous&&!meet.sandbox){const ids=new Set(meet.results.filter(r=>r.points>0).map(r=>r.riderId));for(const id of ids){const r=careerRosterIndex(careerState().npcs||[]).byId.get(id);if(r?.rankingDebutHour86!=null)r.rankingScoringStarts86=(r.rankingScoringStarts86||0)+1;}}return meet;};

const RANK86_COHORT=careerAddYouthCohort;
careerAddYouthCohort=function(year,roster,...args){const before=roster.length,result=RANK86_COHORT(year,roster,...args);for(const r of roster.slice(before))r.rankingDebutHour86=Math.max(careerState().origin,pastureCalendarHour(year,1,1,0))+1;return result;};
const RANK86_DETAILS=careerLeaderboardDetails;
careerLeaderboardDetails=function(row,...args){return (row.newEntrant86&&row.points===0?'<p>New ranking entrant · 0 points. Results count from joining onward; no backdated points.</p>':'')+RANK86_DETAILS(row,...args);};

const RANK86_RENDER=renderCareerRankings;
renderCareerRankings=function(...args){const result=RANK86_RENDER(...args),panel=document.getElementById('rankings');if(panel){const p=document.createElement('p');p.textContent='New entrants begin at 0. Their first four scoring competitions build ranking points at 25%, 50%, 75% and full value. Viewing a board adds no past results.';panel.prepend(p);}return result;};
