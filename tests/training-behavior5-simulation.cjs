const fs=require('node:fs'),vm=require('node:vm');
const {context,check}=require('./behavior5-harness.cjs');
const result=vm.runInContext(`(()=>{
 resetGame();rrSettings().enabled=true;rrSettings().level='Intermediate';const h=app.horses[0],learned=rrHorse(h).learned,rows=[];
 learned['Jump Confidence']=70;learned['Rider Trust in Aids']=70;
 for(const score of [1,5,20,40,60,85]){
  learned['Learned Fence Avoidance']=score;const p=fenceAvoidanceProfile(h,{discipline:'jumping',setup:{height:.7},tension:50}).chance/100;
  let refused=0;for(let n=0;n<10000;n++)refused+=tbQuickJumpRefusals(h,'jumping','0.70',{behavior5RoundId:'single:'+score+':'+n,tension:50},1);
  const rate=refused/10000,tolerance=Math.max(.008,6*Math.sqrt(p*(1-p)/10000));if(Math.abs(rate-p)>tolerance)throw Error('single-jump statistical drift '+score);
  let clear=0,eliminated=0,maxAttempts=0;for(let n=0;n<1000;n++){const id='course:'+score+':'+n,count=tbQuickJumpRefusals(h,'jumping','0.70',{behavior5RoundId:id,tension:50},12),plan=rrHorse(h).quickRefusalPlans[id];if(!count)clear++;if(count>=2)eliminated++;maxAttempts=Math.max(maxAttempts,plan.attempts.length);if(plan.attempts.length>12)throw Error('course loop');}
  const expectedClear=(1-p)**12,expectedEliminated=1-expectedClear-12*p*(1-p)**11;
  if(Math.abs(clear/1000-expectedClear)>Math.max(.015,6*Math.sqrt(expectedClear*(1-expectedClear)/1000)))throw Error('clear-course drift');
  if(Math.abs(eliminated/1000-expectedEliminated)>Math.max(.015,6*Math.sqrt(expectedEliminated*(1-expectedEliminated)/1000)))throw Error('elimination drift');
  rows.push({score,base:getBaseAvoidanceRisk(score),finalPercent:p*100,attempts:10000,refusals:refused,observedPercent:rate*100,courses:1000,clearCourses:clear,eliminatedCourses:eliminated,maxAttempts});
 }
 return rows;
})()`,context);
fs.writeFileSync('/tmp/training-behavior5-simulation.json',JSON.stringify({seed:'HorseHealth.hash/roll, stable per course and jump',rows:result},null,2)+'\n');
for(const row of result)console.log(`PASS score ${row.score}: ${row.refusals}/10000 refusals (${row.observedPercent.toFixed(2)}%, expected ${row.finalPercent.toFixed(2)}%); ${row.clearCourses}/1000 clear courses`);
check('real seeded training sessions finish with only actual outcomes and preserve protected horse data',`{
 for(const score of [1,5,20,40,60,85])for(let n=0;n<4;n++){
  resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;const h=app.horses[0];h.age=10;h.behavior=800;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.unridable=false;h.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};
  rrHorse(h).learned['Learned Fence Avoidance']=score;const bond=h.bond,qol=h.qol,potential=JSON.stringify(h.potential),s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail',location:'Indoor',setup:{height:.5},length:60});s.phase='main';s.warmup=15;s.weather={type:'Clear',temperature:20,wind:0};s.automatic=true;
  for(let i=0;i<12&&!s.finished&&!s.riderFell;i++){const r=t2attempt(h,s);if(r.blocked)break;if(s.recoveryRequired)t2break(h,s);}
  const report=t2finish(h,s),actual=s.log.filter(row=>row.resultIndex!=null);if(actual.length!==s.attempts||!actual.length||!report.behavior)throw Error('missing real outcomes');
  if(h.bond!==bond||h.qol!==qol||JSON.stringify(h.potential)!==potential)throw Error('protected state in full session');
  for(const stat of RR_LEARNED)if(report.behavior.final[stat]!==rrHorse(h).learned[stat])throw Error('summary mismatch');
 }
}`);
