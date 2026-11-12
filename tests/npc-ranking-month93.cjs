const {context}=require('./behavior5-harness.cjs'),vm=require('node:vm');
const result=vm.runInContext(`(()=>{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const start=pastureCalendarHour(),end=pastureCalendarHour(app.year,3,1,0);
 careerRankingRows('world','jumping','',start);careerRankingRows('national','jumping','GBR',start);
 careerAdvance(end);Object.assign(app,pastureDate(end));careerPublish(end);
 const w=careerState(),registry=careerRosterIndex(),catalogue=new Map(CAREER_SERIES.map(e=>[e.id,e]));let scoringResults=0,wins=0,checkedRows=0;const disciplines=new Set();
 for(const meet of Object.values(w.meets)){
  const e=ranking93ScoringEvent(meet,catalogue);if(!e)continue;
  const strength=clamp(.85+(meet.fieldStrength??60)*.003,.85,1.15),starters=meet.starters??meet.results.filter(r=>r.started!==false).length;
  for(const row of meet.results){if(row.player||!registry.byId.has(row.riderId))continue;
   const expected=careerPoints(e,row,starters,strength);if(row.points!==expected)throw Error('NPC award differs from scoring rules '+meet.id+' '+row.riderId+' '+row.points+' vs '+expected);
   if(row.points>0){scoringResults++;disciplines.add(meet.discipline);if(row.placing===1)wins++;}
  }
 }
 for(const [key,rows]of Object.entries(w.rankings)){
  const [type,d,...f]=key.split('|');for(const row of rows.filter(r=>r.points>0).slice(0,5)){
   const total=ranking93History(row,type,d,f.join('|'),end).reduce((n,r)=>n+r.rankingPoints,0);
   if(total!==row.points)throw Error('published total differs from credited results '+key+' '+total+' vs '+row.points);
   if(!Number.isInteger(row.best)||row.best<1)throw Error('missing best rank '+key);checkedRows++;
  }
 }
 if(scoringResults<50||wins<5||disciplines.size!==4||checkedRows<10)throw Error('insufficient real calendar coverage');
 return {scoringResults,wins,disciplines:[...disciplines],checkedRows,meets:Object.values(w.meets).filter(rank91Real).length};
})()`,context);
console.log('PASS two calendar months: '+JSON.stringify(result));
