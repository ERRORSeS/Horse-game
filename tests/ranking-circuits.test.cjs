const {check}=require('./behavior5-harness.cjs');
const selectedDiscipline=process.env.RANKING_DISCIPLINE;
check('all ranking categories and every federation have at least 24 real competitors', `{
 resetGame();const hour=pastureCalendarHour();
 for(const discipline of ${selectedDiscipline?JSON.stringify([selectedDiscipline]):'DISCIPLINES'}){
  resetGame();
  const cases=[['world',''],['horse',''],['horse','pony'],['combination','']];
  for(const division of Object.keys(CAREER_AGE_DIVISIONS).filter(d=>d!=='senior')){
   cases.push(['division',division],['youth-international',division]);
   for(const country of Object.keys(CAREER_COUNTRIES))cases.push(['youth-national',division+'|'+country]);
  }
  for(const country of Object.keys(CAREER_COUNTRIES))cases.push(['national',country]);
  for(const age of [4,5,6,7,8])cases.push(['young-horse',age]);
  for(const row of CAREER_SERIES.filter(row=>row.discipline===discipline&&row.series))cases.push([row.team?'team':'tour',row.series]);
  for(const [type,filter]of cases){
   const rows=careerCircuitField(type,discipline,filter,hour);
   if(rows.length<24||new Set(rows.map(r=>r.id)).size!==rows.length||rows.some(r=>r.points<0||r.specialty!==discipline))throw Error('thin board '+type+' '+discipline+' '+filter);
   if(type==='national'&&rows.some(r=>r.country!==filter)||type==='youth-national'&&rows.some(r=>r.country!==filter.split('|')[1]))throw Error('foreign entrant on national board');
   if(['division','youth-international','youth-national'].includes(type)){
    const [min,max]=CAREER_AGE_DIVISIONS[String(filter).split('|')[0]].ages;if(rows.some(r=>r.age<min||r.age>max))throw Error('age division');
   }
   if(rows.some(r=>r.points!==r.circuitResults.reduce((n,result)=>n+result.points,0)))throw Error('points without results');
  }
 }
}`);
check('circuits preserve earned player points and have deterministic weekly form without render rewards', `{
 resetGame();const w=careerState(),hour=pastureCalendarHour(),key=careerBoardKey('national','jumping','KAZ');
 w.rankings[key]=[{id:'player',name:'Player',country:'KAZ',points:25,rank:1}];
 const rows=careerRankingRows('national','jumping','KAZ',hour),first=JSON.stringify(rows);
 if(rows.find(r=>r.id==='player').points!==25||rows.length<25)throw Error('player result changed');
 if(JSON.stringify(careerRankingRows('national','jumping','KAZ',hour))!==first)throw Error('view rerolled results');
 const next=careerCircuitField('national','jumping','KAZ',hour+CAREER_HOURS_PER_WEEK);
 if(JSON.stringify(next.map(r=>r.points))===JSON.stringify(rows.filter(r=>r.circuit).map(r=>r.points)))throw Error('static rankings');
 if(careerCircuitField('division','dressage','kids',hour).some(r=>rows.some(other=>other.id===r.id||other.name===r.name)))throw Error('multi-discipline rider');
}`);
check('weekly publication refreshes watched categories and preserves competitors through saving', `{
 resetGame();const w=careerState();w.settings.background=false;w.settings.progression=false;w.openingHistory=true;
 const key=careerBoardKey('youth-national','jumping','kids|KAZ'),first=careerRankingRows('youth-national','jumping','kids|KAZ');
 const ids=first.map(r=>r.id).sort(),next=(Math.floor(w.cursor/CAREER_HOURS_PER_WEEK)+1)*CAREER_HOURS_PER_WEEK;
 careerAdvance(next);const rows=w.rankings[key];
 if(w.rankingCircuits[key]!==next||rows.length<24||rows.filter(r=>r.circuitResults?.some(result=>result.at===next)).length<24)throw Error('weekly update missing');
 const saved=JSON.parse(serializeAppState());hydrateFromSave(saved);
 const loaded=careerRankingRows('youth-national','jumping','kids|KAZ');
 if(loaded.length<24||careerState().rankingCircuits[key]!==next)throw Error('save lost category');
 if(!careerLeaderboardDetails(loaded[0],'youth-national','jumping','kids|KAZ').includes('Weekly circuit results'))throw Error('missing score evidence');
}`);
