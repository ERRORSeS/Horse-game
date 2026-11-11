/* Existing ledger records are retained locally; every changed nested value is compared. */
(function(root){
 function capture(state){return state.career?.meets?new Map(Object.entries(state.career.meets).map(([id,meet])=>[id,JSON.stringify(meet)])):null;}
 function create(state,before){if(!before||!state.career?.meets)return {state,ledger:null};const changed=Object.create(null),removed=[];for(const [id,meet]of Object.entries(state.career.meets))if(!before.has(id)||before.get(id)!==JSON.stringify(meet))changed[id]=meet;for(const id of before.keys())if(!Object.hasOwn(state.career.meets,id))removed.push(id);return {state:{...state,career:{...state.career,meets:null}},ledger:{changed,removed}};}
 function restore(output,previous){if(output.ledger){if(!output.ledger.removed.length&&!Object.keys(output.ledger.changed).length){output.state.career.meets=previous.career?.meets||{};return output.state;}const meets={...(previous.career?.meets||{}),...output.ledger.changed};for(const id of output.ledger.removed)delete meets[id];output.state.career.meets=meets;}return output.state;}
 const api={capture,create,restore};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SimulationDelta=api;
})(typeof globalThis!=='undefined'?globalThis:this);
