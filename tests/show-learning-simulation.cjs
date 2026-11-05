const fs=require('node:fs'),vm=require('node:vm');
const {context}=require('./behavior5-harness.cjs');
const rows=vm.runInContext(`(()=>{
 resetGame();rrSettings().enabled=true;rrSettings().level='Professional';const h=app.horses[0],b=rrHorse(h),rows=[],N=10000;
 const s={id:'show-learning-simulation',liveShowId:'saved-show',discipline:'jumping',exerciseId:'vertical',steps:[{stage:'main_round',phase:'showjumping'}],stepIndex:0,seed:17391,attempts:0,createdHour:0,log:[],tension:50,temporary:{},location:'Indoor',weather:{type:'Clear',wind:0}};
 const sample=(name,p,run)=>{let count=0;for(let n=0;n<N;n++)if(run(n))count++;const observed=count/N*100,tolerance=Math.max(.5,6*Math.sqrt(p/100*(1-p/100)/N)*100);if(Math.abs(observed-p)>tolerance)throw Error(name+': '+observed+' expected '+p);rows.push({name,trials:N,expectedPercent:p,observedPercent:observed,count});};
 const trial=(kind,extra={})=>{s.attempts++;s.tension=50;s.phase='main';s.finished=false;s.mountedStopped=false;s.riderFell=false;s.horseFell=false;s.recoveryRequired=false;s.temporary={};s.log=[];s.incidents=[];h.vetNotes=[];delete h.trainingIncidentAssessment;for(const k of RR_LEARNED)b.learned[k]=k.includes('Avoidance')?20:70;const r={exerciseId:s.exerciseId,resultIndex:6,text:'Actual qualifying show simulation incident',changes:{}};return t2xIncident(h,s,kind,r,extra);};
 for(const stability of [30,60,95]){rrSettings().abilities['Seat Stability']=stability;rrSettings().abilities.Balance=stability;sample('Show rider fall after refusal, stability '+stability,tb51FallProfile(h,s,'refusal').chance,()=>trial('refusal').fell);}
 rrSettings().abilities['Seat Stability']=60;rrSettings().abilities.Balance=60;
 sample('Show horse fall after actual slip',1,()=>trial('slip').horseFell);
 sample('Show horse fall after serious jumping disruption',5/3,()=>trial('landing',{seriousJump:true}).horseFell);
 return rows;
})()`,context,{timeout:180000});
fs.writeFileSync(__dirname+'/../outputs/show-learning-simulation.json',JSON.stringify({seed:'Deterministic t2random streams; actual conditional show incident resolution',rows},null,2)+'\n');
for(const r of rows)console.log(`PASS ${r.name}: ${r.count}/${r.trials} (${r.observedPercent.toFixed(2)}%; expected ${r.expectedPercent.toFixed(2)}%)`);
