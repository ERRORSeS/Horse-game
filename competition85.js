/* Developmental heights extend offerings without shifting legacy level indices or old records. */
const HEIGHTS85={kids:[.30,.40,.50,.60,.70,.80,.90,1,1.05],prechildren:[.40,.50,.60,.70,.80,.90,1,1.05,1.10],children:[.50,.60,.70,.80,.90,1,1.10,1.20,1.30],pony:[.50,.60,.70,.80,.90,1,1.10,1.20,1.30,1.35],junior:[.70,.80,.90,1,1.10,1.20,1.30,1.40],young:[.80,.90,1,1.10,1.20,1.30,1.40,1.50],u25:[.90,1,1.10,1.20,1.30,1.40,1.50,1.60],senior:[.50,.60,.70,.80,.90,1,1.10,1.20,1.30,1.40,1.50,1.60]};
const HEIGHT85_LEVELS=competitionLevels,HEIGHT85_INDEX=levelIndex;
competitionLevels=function(d){return d==='jumping'?['Crosspoles',...[...new Set([...SHOW_LEVELS.jumping,...Object.values(HEIGHTS85).flat().map(n=>n.toFixed(2))])].sort((a,b)=>Number(a)-Number(b))]:HEIGHT85_LEVELS(d);};
levelIndex=function(d,level){const original=HEIGHT85_INDEX(d,level);if(original>=0||d!=='jumping')return original;const height=Number(level);if(!competitionLevels('jumping').includes(String(level))||!Number.isFinite(height))return -1;let index=0;SHOW_LEVELS.jumping.forEach((value,i)=>{if(Number(value)<=height)index=i;});return index;};
// Vary existing ordinary jumping fixtures and fill calendar gaps to the 8.4 availability target.
// Existing IDs, disciplines, special championships and saved event snapshots are retained.
for(const [division,heights]of Object.entries(HEIGHTS85)){
 let sequence=0;
 const kidsCycle=[.30,.60,.80,.40,.70,.90,.50,.60,1,.70,.80,.40,.60,.90,.50,.70,1.05,.60,.80,1];
 const nextHeight=()=>{const i=sequence++;return (division==='kids'?kidsCycle[i%kidsCycle.length]:heights[i%heights.length]).toFixed(2);};
 for(let month=1;month<=12;month++){
  const ordinary=CAREER_SERIES.filter(row=>row.division===division&&row.month===month&&careerOrdinaryDivision(row));
  for(const row of ordinary.filter(row=>row.discipline==='jumping'&&row.id.startsWith('division-circuit-'))){
   row.level=nextHeight();row.developmentHeight=true;row.horseMinAge=Math.max(4,row.horseMinAge||0);
  }
  const count=Math.max(0,(division==='senior'?9:8)-ordinary.length);
  for(let i=0;i<count;i++){
   const height=nextHeight();
   careerClass('development85-'+division+'-'+month+'-'+i,CAREER_AGE_DIVISIONS[division].label+' Development Jumping · '+height+' m','jumping',division==='senior'?1:2,height,month,{division,day:2+i*3,developmentHeight:true,calendarOnly:true,ponyCm:division==='pony'?148:null,horseMinAge:4,series:'development85-'+division,star:null});
  }
 }
}
for(const d of Object.keys(HEIGHTS85))CAREER_SERIES_LABELS.set('development85-'+d,CAREER_AGE_DIVISIONS[d].label+' Development Jumping');
// Ordinary development classes recommend experience; age/horse/measurement/medical rules still apply.
const HEIGHT85_ELIGIBILITY=careerEligibility;
careerEligibility=function(event,rider,horse,options={}){
 if(!event?.developmentHeight||options.npc)return HEIGHT85_ELIGIBILITY(event,rider,horse,options);
 const experience=rider?.experience,copy=experience?{...rider,experience:{...experience,jumping:event.level}}:rider;
 return HEIGHT85_ELIGIBILITY(event,copy,horse,options);
};
/* One moving-time calculation; incident delays require recorded events. */
showEffortTiming=function(h,session,phase,choice,quality,baseDistance=null,timeFactor=1,record=null){
 const style=showRidingStyle(session),pace=SHOW_RIDING_STYLES[style]?.time||1,intent=String(choice?.intent||choice?.label||''),route=/inside|tight|direct|cut/i.test(intent)?.94:/wide|conservative|steady|balance|extra/i.test(intent)?1.06:1;
 const distance=(Number.isFinite(baseDistance)&&baseDistance>0?baseDistance:phase==='cross-country'?80:40)*route,speed=phase==='cross-country'?10:5+effectiveDisciplineSkill(h,session.discipline)/100;
 const movingTime=distance/speed*pace*timeFactor,incidents=[];
 if(record){
  if(record.refusal?.refused)incidents.push({cause:record.event==='runout'?'Run-out recovery':'Refusal recovery',seconds:6.4});
  else if(record.error==='rhythm'||record.events6?.includes('hesitation'))incidents.push({cause:'Recorded loss of rhythm / hesitation',seconds:1.5});
  if(record.error?.startsWith('drift'))incidents.push({cause:'Recorded drift correction',seconds:.5});
 }else if(quality<1)incidents.push({cause:'Recorded execution correction',seconds:(1-quality)*1.1});
 return {routeDistance:distance,movingTime,incidents,time:movingTime+incidents.reduce((n,event)=>n+event.seconds,0),style};
};
c7EffortTiming=function(h,s,plan,choice,record){
 const state=c7State(s);let factor=1;if(s.discipline==='jumping'){s.poleRoundId ||= s.liveShowId||rrSessionId(s);state.ridingTimeFactor ??= s.polePlan?.timeFactor??ShowjumpingRound.timeFactor(h,s.poleRoundId);factor=state.ridingTimeFactor;}
 const slow=plan.jump&&record.completed&&i6Traits(h).includes('Careful but Slow')?1.05:1;
 const timing=showEffortTiming(h,s,plan.phase,choice,record.quality,plan.distance,factor*slow,record);
 record.routeDistance=timing.routeDistance;record.time=timing.time;record.slowerPace6=slow>1?timing.movingTime-timing.movingTime/slow:0;record.timeBreakdown85={style:timing.style,movingTime:timing.movingTime,incidents:timing.incidents,finalTime:timing.time};
};
const TIMING85_RESOLVE=c7Resolve;
c7Resolve=function(h,s,...args){const before=s.choiceRecords?.length||0,result=TIMING85_RESOLVE(h,s,...args);if((s.choiceRecords?.length||0)>before){const record=s.choiceRecords.at(-1);if(record.timeBreakdown85&&record.time!==record.timeBreakdown85.finalTime){const delta=record.time-record.timeBreakdown85.finalTime;if(delta>0)record.timeBreakdown85.incidents.push({cause:'Recorded course adjustment',seconds:delta});record.timeBreakdown85.finalTime=record.time;}}return result;};
const TIMING85_RESULTS=showResultMarkup;
showResultMarkup=function(show){const html=TIMING85_RESULTS(show),records=(show.rpg?.choiceRecords||[]).filter(r=>r.timeBreakdown85);if(!records.length)return html;return html+`<details data-time85><summary>Riding time breakdown</summary>${records.map(record=>{const t=record.timeBreakdown85;return `<p>${csEscape(t.style)} · Moving time ${t.movingTime.toFixed(2)} s${t.incidents.map(e=>' · '+csEscape(e.cause)+' +'+e.seconds.toFixed(2)+' s').join('')} · Final effort time ${t.finalTime.toFixed(2)} s</p>`;}).join('')}</details>`;};
