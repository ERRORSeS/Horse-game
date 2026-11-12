/* Existing ledger records are retained locally; every changed nested value is compared. */
(function(root){
 function capture(state){return state.career?.meets?new Map(Object.entries(state.career.meets).map(([id,meet])=>[id,JSON.stringify(meet)])):null;}
 function create(state,before,next=null){if(!before||!state.career?.meets)return {state,ledger:null};const changed=Object.create(null),removed=[];for(const [id,meet]of Object.entries(state.career.meets)){const value=JSON.stringify(meet);if(next)next.set(id,value);if(!before.has(id)||before.get(id)!==value)changed[id]=meet;}for(const id of before.keys())if(!Object.hasOwn(state.career.meets,id))removed.push(id);return {state:{...state,career:{...state.career,meets:null}},ledger:{changed,removed}};}
 function restore(output,previous){if(output.ledger){if(!output.ledger.removed.length&&!Object.keys(output.ledger.changed).length){output.state.career.meets=previous.career?.meets||{};return output.state;}const meets={...(previous.career?.meets||{}),...output.ledger.changed};for(const id of output.ledger.removed)delete meets[id];output.state.career.meets=meets;}return output.state;}
 // The clock's ledger is observed only in its isolated worker. Nested repair writes,
 // additions and deletions mark their owning meet; old results need no JSON scan.
 const ledgerSources91=new WeakMap();
 function rawLedger(value){return ledgerSources91.get(value)||value;}
 function observe(state,{nested=true}={}){
  const original=state.career?.meets;if(!original)return {finish:()=>({state,ledger:null})};
  const dirty=new Set(),proxies=new WeakMap(),raw=new WeakMap();
  const unwrap=value=>raw.get(value)||value;
  function wrap(target,id){
   if(!target||typeof target!=='object')return target;
   let byId=proxies.get(target);if(!byId){byId=new Map();proxies.set(target,byId);}if(byId.has(id))return byId.get(id);
   const proxy=new Proxy(target,{
    get(object,key){return wrap(Reflect.get(object,key),id);},
    set(object,key,value){dirty.add(id);return Reflect.set(object,key,unwrap(value));},
    deleteProperty(object,key){dirty.add(id);return Reflect.deleteProperty(object,key);},
    defineProperty(object,key,descriptor){dirty.add(id);if('value'in descriptor)descriptor={...descriptor,value:unwrap(descriptor.value)};return Reflect.defineProperty(object,key,descriptor);}
   });raw.set(proxy,target);byId.set(id,proxy);return proxy;
  }
  const ledger=new Proxy(original,{
   get(object,key){return nested&&typeof key==='string'?wrap(Reflect.get(object,key),key):Reflect.get(object,key);},
   set(object,key,value){dirty.add(key);return Reflect.set(object,key,unwrap(value));},
   deleteProperty(object,key){dirty.add(key);return Reflect.deleteProperty(object,key);},
   defineProperty(object,key,descriptor){dirty.add(key);if('value'in descriptor)descriptor={...descriptor,value:unwrap(descriptor.value)};return Reflect.defineProperty(object,key,descriptor);}
  });
  if(!nested)ledgerSources91.set(ledger,original);
  state.career.meets=ledger;
  function plain(value,seen=new WeakMap()){
   value=unwrap(value);if(!value||typeof value!=='object')return value;if(seen.has(value))return seen.get(value);
   const result=Array.isArray(value)?[]:{};seen.set(value,result);for(const key of Object.keys(value))result[key]=plain(value[key],seen);return result;
  }
  return {finish(){
   if(state.career.meets!==ledger)return {state,ledger:null};
   state.career.meets=original;const changed=Object.create(null),removed=[];
   for(const id of dirty)if(Object.hasOwn(original,id))changed[id]=plain(original[id]);else removed.push(id);
   return {state:{...state,career:{...state.career,meets:null}},ledger:{changed,removed}};
  }};
 }
 const api={capture,create,restore,observe,rawLedger};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SimulationDelta=api;
})(typeof globalThis!=='undefined'?globalThis:this);
