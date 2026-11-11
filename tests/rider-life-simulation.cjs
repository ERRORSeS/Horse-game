const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {context}=require('./behavior5-harness.cjs');
vm.runInContext(fs.readFileSync(__dirname+'/rider-life-scenario.js','utf8'),context);
for(const age of [17,22]){
 const start=Date.now(),result=vm.runInContext('simulateRiderLife('+age+')',context);
 assert.equal(result.games,true,'Games must be reachable');assert.ok(result.teamStarts>0,'a national team event must be reachable');
 assert.ok(result.log.some(row=>row.type==='trial'&&row.placing),'trial must be completed');
 assert.ok(result.log.some(row=>row.status==='Selected — National Squad'),'selection must be earned');
 assert.ok(result.checkpoint,'trial invitation must survive reload');
 console.log(JSON.stringify({elapsedMs:Date.now()-start,...result},null,2));
}
