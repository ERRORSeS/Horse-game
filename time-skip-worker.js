/* Runs the existing simulation away from the UI. No storage or live DOM is exposed. */
const workerStorage=new Map();
const dummy=new Proxy(function(){},{get(target,key){if(key==='innerHTML'||key==='value')return '';if(key==='style'||key==='classList'||key==='dataset')return dummy;if(key==='querySelectorAll')return ()=>[];if(key===Symbol.iterator)return function*(){};return ()=>{};},set(){return true;}});
self.document={readyState:'loading',createElement:()=>dummy,addEventListener(){},getElementById:()=>dummy,querySelector:()=>dummy,querySelectorAll:()=>[]};
self.window={addEventListener(){}};
self.localStorage={getItem:key=>workerStorage.get(key)||null,setItem:(key,value)=>workerStorage.set(key,String(value)),removeItem:key=>workerStorage.delete(key)};
self.alert=message=>{throw Error(message);};
// Bootstrap and save callbacks never run in the simulation worker.
self.setTimeout=()=>0;self.clearTimeout=()=>{};
let timeSkipBooted=false;
self.onmessage=({data})=>{
 try{
  self.postMessage({type:'progress',text:'Preparing simulation…'});
  if(!timeSkipBooted){importScripts(...data.scripts);timeSkipBooted=true;}
  // IndexedDB exists in workers, but the live save remains exclusively in the UI.
  saveGame=()=>true;render=()=>{};
  for(const key of Object.keys(app))delete app[key];Object.assign(app,data.state);
  RECENT_HORSE_NAMES.clear();for(const name of data.recentHorseNames||[])RECENT_HORSE_NAMES.add(name);
  if(data.testSeed!==undefined){let seed=data.testSeed;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
  self.postMessage({type:'progress',text:'Advancing '+data.unit+' · simulating horse care, competitions and auctions…'});
  const start=performance.now();
  if(data.unit==='month')monthlyProgress();else if(data.unit==='day')advanceOneDay();else if(data.unit==='hour')advanceOneHour();else throw Error('Unknown time skip.');
  self.postMessage({type:'complete',state:app,recentHorseNames:[...RECENT_HORSE_NAMES],simulationMs:performance.now()-start});
 }catch(error){self.postMessage({type:'error',message:error.message,stack:error.stack});}
};
