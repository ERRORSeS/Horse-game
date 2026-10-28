const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const dummy=new Proxy(function(){},{get(t,k){if(k==='innerHTML')return Reflect.get(t,k)||'';if(['style','classList','dataset'].includes(k))return dummy;if(k==='value')return '';if(k==='querySelectorAll')return ()=>[];return ()=>{};}});
const storage=new Map();
let rngState=123456789;const seededMath=Object.create(Math);seededMath.random=()=>{rngState=(Math.imul(rngState,1664525)+1013904223)>>>0;return rngState/4294967296;};
const context=vm.createContext({Math:seededMath,console,document:{readyState:'loading',createElement(){return {innerHTML:'',setAttribute(){},appendChild(){},querySelector(){return {onclick:null,textContent:''}}}},addEventListener(){},getElementById(){return dummy},querySelector(){return dummy},querySelectorAll(){return []}},localStorage:{getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,v)},removeItem(k){storage.delete(k)}},window:{addEventListener(){}},alert(m){throw Error(m)},setTimeout(){},clearTimeout(){}});
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/<script src="([^?]+)\?/g))vm.runInContext(fs.readFileSync(path.join(root,match[1]),'utf8'),context,{filename:match[1]});
function check(name,code){vm.runInContext(code,context);console.log('PASS '+name);}


const {performance}=require('node:perf_hooks');
vm.runInContext("resetGame();app.horses=Array.from({length:25},()=>baseHorse('trained','player'));app.saleBarn=[];app.npcSales=[];app.sales2={version:1,sequence:0,listings:[],transactions:[],history:[]};const benchmarkStable=serializeAppState();",context);
const measurements={};
for(const [label,action]of Object.entries({hour:'advanceOneHour()',day:'advanceOneDay()',month:'monthlyProgress()',threeMonths:'for(let i=0;i<3;i++)monthlyProgress()'})){
 const values=[];
 for(let run=0;run<3;run++){
  vm.runInContext('hydrateFromSave(JSON.parse(benchmarkStable));',context);
  const start=performance.now();vm.runInContext(action+';saveGame(false);',context);values.push(performance.now()-start);
 }
 measurements[label]={medianMs:Number(values.sort((a,b)=>a-b)[1].toFixed(2)),samplesMs:values.map(x=>Number(x.toFixed(2)))};
}
console.log(JSON.stringify({horses:25,includes:'chronological simulation, serialization, compression, verified in-memory storage; DOM rendering excluded',measurements},null,2));
