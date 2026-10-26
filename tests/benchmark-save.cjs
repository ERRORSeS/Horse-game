// Informational same-process benchmark; timing is never a correctness assertion.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{performance}=require('node:perf_hooks');
const root=path.resolve(__dirname,'..'),legacySource=fs.readFileSync(path.join(__dirname,'performance.test.cjs'),'utf8').split('\n').find(line=>line.startsWith('function legacyPack'));
const before=vm.runInNewContext(legacySource+';legacyPack');
const context={localStorage:{getItem(){return null},setItem(){}},console};
vm.runInNewContext(fs.readFileSync(path.join(root,'save-fix.js'),'utf8').split('/* Manual slots')[0].replace('  target.getItem=','  globalThis.packBench=pack;target.getItem='),context);
const after=context.packBench,raw=JSON.stringify({horses:Array.from({length:500},(_,i)=>({id:'horse-'+i,name:'Étoile '+i,medicalConditions:[{diagnosis:'strain',severity:'minor',known:false,recoveryProgress:3,recoveryDays:30}],history:Array.from({length:20},(_,n)=>({day:n,kind:'Care completed',conditionId:'condition-'+i})),training:{jumping:35.4,dressage:41.8}}))});
const median=fn=>{fn(raw);return Array.from({length:7},()=>{const start=performance.now();fn(raw);return performance.now()-start;}).sort((a,b)=>a-b)[3]};
const oldMs=median(before),newMs=median(after);console.log(JSON.stringify({bytes:Buffer.byteLength(raw),medianBeforeMs:oldMs,medianAfterMs:newMs,reductionPercent:(1-newMs/oldMs)*100,encodedBytesIdentical:before(raw)===after(raw)},null,2));
