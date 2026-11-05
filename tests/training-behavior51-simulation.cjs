const fs=require('node:fs'),vm=require('node:vm');
const {context}=require('./behavior5-harness.cjs');
const rows=vm.runInContext(`(()=>{
 resetGame();rrSettings().enabled=true;rrSettings().level='Professional';const h=app.horses[0],b=rrHorse(h),rows=[],N=10000;
 const sample=(name,p,run)=>{let count=0;for(let n=0;n<N;n++)if(run(n))count++;const observed=count/N*100,tolerance=Math.max(.8,6*Math.sqrt(p/100*(1-p/100)/N)*100);if(Math.abs(observed-p)>tolerance)throw Error(name+': '+observed+' expected '+p);rows.push({name,trials:N,expectedPercent:p,observedPercent:observed,count});};
 b.learned['Learned Spook Sensitivity']=40;b.learned['Arena Confidence']=60;
 for(const natural of [0,40,100]){b.naturalSpookiness=natural;const s={seed:100+natural},p=tb51SpookProfile(h,s,{intensity:'Noticeable'});sample('Environmental spook, natural '+natural,p.chance,()=>t2random(s)*100<p.chance);}
 const s={id:'conditional-51',discipline:'flatwork',exerciseId:'large-circle',steps:[],seed:17391,attempts:0,createdHour:0,log:[],tension:50,temporary:{},location:'Indoor',weather:{type:'Clear',wind:0}};
 const trial=(n,kind,extra={})=>{s.attempts++;s.tension=50;s.phase='main';s.finished=false;s.mountedStopped=false;s.riderFell=false;s.horseFell=false;s.recoveryRequired=false;s.temporary={};s.log=[];s.incidents=[];h.vetNotes=[];delete h.trainingIncidentAssessment;for(const k of RR_LEARNED)b.learned[k]=k.includes('Avoidance')?20:70;const r={exerciseId:s.exerciseId,resultIndex:6,text:'Actual qualifying simulation incident',changes:{}};return t2xIncident(h,s,kind,r,extra);};
 for(const stability of [30,95]){rrSettings().abilities['Seat Stability']=stability;rrSettings().abilities.Balance=stability;sample('Rider-only significant stop, stability '+stability,tb51FallProfile(h,s,'refusal').chance,n=>trial(n,'refusal').fell);}
 rrSettings().abilities['Seat Stability']=60;rrSettings().abilities.Balance=60;
 sample('Horse fall after actual slip',3,n=>trial(n,'slip').horseFell);
 b.temperamentIntensity=100;let escalations=0,spooks=0;
 sample('Bolt escalation after significant spook',tb51BoltProfile(h,{tension:50}).chance,n=>{const i=trial(n,'severeSpook',{stimulus:{id:'gust:'+n,source:'wind gust',intensity:'Significant'}});if(i.escalationRolls!==1||i.fallRolls+i.horseFallRolls>2)throw Error('duplicate event');spooks++;if(i.kind==='bolt')escalations++;return i.kind==='bolt';});
 s.discipline='jumping';s.exerciseId='vertical';let horseFalls=0,rotations=0;
 sample('Horse fall after serious jumping disruption',5,n=>{const i=trial(n,'landing',{seriousJump:true});if(i.horseFell){horseFalls++;rotations+=i.rotational?1:0;if(i.fallRolls)throw Error('duplicate rider roll after horse fall');}return i.horseFell;});
 const rotationRate=rotations/horseFalls*100;if(Math.abs(rotationRate-15)>6)throw Error('rotational frequency');rows.push({name:'Rotational subtype among serious jumping horse falls',trials:horseFalls,expectedPercent:15,observedPercent:rotationRate,count:rotations});
 return rows;
})()`,context,{timeout:180000});
fs.mkdirSync(__dirname+'/../outputs',{recursive:true});fs.writeFileSync(__dirname+'/../outputs/training-behavior51-simulation.json',JSON.stringify({seed:'Deterministic t2random streams; independent conditional incident fixtures',rows},null,2)+'\n');
for(const r of rows)console.log(`PASS ${r.name}: ${r.count}/${r.trials} (${r.observedPercent.toFixed(2)}%; expected ${r.expectedPercent}%)`);
