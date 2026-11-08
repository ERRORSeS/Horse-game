const {check}=require('./behavior5-harness.cjs');
check('seeded per-attempt refusal rates and local-hazard round totals match the specified calibration',`{
 resetGame();rrSettings().enabled=true;rrSettings().level='Intermediate';const h=app.horses[0];t2horse(h).traits=[];rrHorse(h).learned['Jump Confidence']=70;rrHorse(h).learned['Rider Trust in Aids']=70;
 const samples=40000,results={refusals:[],poles:[]};
 for(const score of [0,5,20,40,60,75,85,100]){rrHorse(h).learned['Learned Fence Avoidance']=score;const s={id:'rate:'+score,discipline:'jumping',level:'0.70',warmupState:{tension:50,focus:50,confidence:50,energy:50,timing:50},refusalContext:'competition'},p=fenceAvoidanceProfile(h,s);let count=0;for(let i=0;i<samples;i++)if(c7Roll(s,'attempt:'+i)<p.chance/100)count++;if(Math.abs(count/samples-p.chance/100)>.012)throw Error('refusal rate '+score);results.refusals.push({score,target:p.chance,actual:Math.round(count/samples*10000)/100});}
 for(const p of [.30,.40,.45])for(const n of [4,12]){const weights=Array.from({length:n},(_,i)=>1+i%3*.2),sum=weights.reduce((a,b)=>a+b,0),risks=weights.map(w=>c7LocalHazard(p,w,sum));let count=0;for(let i=0;i<samples;i++){const seed=HorseHealth.hash('hazard:'+p+':'+n+':'+i);let hit=false;for(let j=0;j<n;j++)if(c7Random(seed,'fence:'+j)<risks[j])hit=true;if(hit)count++;}if(Math.abs(count/samples-p)>.012)throw Error('pole rate '+p+' / '+n);results.poles.push({baseline:p,fences:n,actual:Math.round(count/samples*10000)/100});}
 console.log('CALIBRATION '+JSON.stringify(results));
}`);
