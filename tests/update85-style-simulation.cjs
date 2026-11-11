const fs=require('node:fs'),vm=require('node:vm');
const {context}=require('./behavior5-harness.cjs');
const report=vm.runInContext(`(()=>{
 resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;
 const source=app.horses[0];source.breed='Dutch Warmblood';source.age=10;source.behavior=800;source.requiresBreakingIn=false;source.illnesses=[];source.medicalConditions=[];source.personality='Neutral';source.fatigue=0;
 for(const group of Object.values(source.stats))for(const key of Object.keys(group))group[key]=65;
 for(const key of Object.keys(source.potential))source.potential[key]=100;
 t2horse(source).traits=[];for(const key of T2_ATTRIBUTES)if(key!=='Focus')source.training2.attributes[key]=6;source.training2.sensitivityBaseline=6;source.focus=60;rrHorse(source).naturalSpookiness=10;
 const base=buildCompetitionRpgSession(source,'jumping','0.90');base.steps=base.steps.filter(x=>x.stage==='main_round').slice(0,10);for(const step of base.steps)step.promptIndex=2;
 base.riderProfile={level:'Advanced',abilities:Object.fromEntries(RR_ABILITIES.map(k=>[k,70])),experience:{jumping:'1.10'}};base.location='Indoor';base.weather={type:'Clear',wind:0,temperature:20};base.warmupState={tension:30,focus:65,confidence:65,energy:70,timing:65};
 const rows=[],rounds=500,styles=['Conservative','Balanced','Competitive','Aggressive'];
 for(const style of styles){const clean=[],full=[];let efforts=0,errors=0,refusals=0,eliminations=0,energy=0,checks=0;
 for(let n=0;n<rounds;n++){
  const h=HorseHealth.copy(source),s=HorseHealth.copy(base);s.id='paired85:'+n;s.ridingStyle=style;s.choiceRecords=[];s.outcomes=[];s.stepIndex=0;s.interactive7={version:7,seed:HorseHealth.hash('paired85:'+n),readiness:60,ledger:{},representations:{},repetitions:{},readinessHistory:[]};let cleanRound=true,total=0;
  for(let step=0;step<s.steps.length&&!s.eliminated;step++){
   s.stepIndex=step;s.awaitingAdvance=false;const r=c7Resolve(h,s,0,{npc:true});if(!r)throw Error('missing effort');
   total+=r.time;efforts++;if(r.error||r.railCause){errors++;cleanRound=false;}if(r.refusal?.refused){refusals++;cleanRound=false;}if(r.events6.includes('spook'))cleanRound=false;energy+=r.energyUse85||0;
   if(r.timeBreakdown85){const t=r.timeBreakdown85;if(Math.abs(t.movingTime+t.incidents.reduce((n,e)=>n+e.seconds,0)-r.time)>1e-8)throw Error('time log mismatch');checks++;}
  }
  if(s.eliminated)eliminations++;else full.push(total);if(cleanRound&&!s.eliminated)clean.push(total);
 }
 const mean=a=>a.reduce((x,y)=>x+y,0)/a.length,median=a=>[...a].sort((a,b)=>a-b)[Math.floor(a.length/2)];rows.push({style,rounds,cleanRounds:clean.length,cleanMean:mean(clean),cleanMedian:median(clean),completedMean:mean(full),technicalErrorRate:errors/efforts,refusalRate:refusals/efforts,energyPerEffort:energy/efforts,eliminations,loggedEfforts:checks});
 }
 if(!(rows[3].cleanMean<rows[1].cleanMean&&rows[0].cleanMean>rows[1].cleanMean&&rows[3].technicalErrorRate>rows[0].technicalErrorRate))throw Error('pace/risk ordering');
 return rows;
})()`,context);
console.log(JSON.stringify(report,null,2));
if(process.argv[2])fs.writeFileSync(process.argv[2],JSON.stringify(report,null,2)+'\n');
