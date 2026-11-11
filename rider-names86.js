/* Repair display names by stable rider ID; never change nationality or earned results. */
function riderNames86Repair(){const world=app.career||{},roster=world.npcs||[];const bad=name=>/\d|specialist:|world-rider|npc85-circuit|youth-rider|ranking-circuit|collection:/i.test(String(name||'')),used=new Set(roster.filter(r=>!bad(r.name)).map(r=>r.name)),changed=new Map();
 for(const rider of roster)if(bad(rider.name)){const before=rider.name;rider.name=careerUniqueRiderName(rider.id,rider.country,used);changed.set(rider.id,{before,name:rider.name});for(const h of rider.horses||[])if(h.ownerId===rider.id&&h.owner===before)h.owner=rider.name;}
 const renameRow=(row,country)=>{if(row.player)return;let value=changed.get(row.riderId);if(!value&&/\d|specialist:|world-rider|npc85-circuit|youth-rider|ranking-circuit|collection:/i.test(String(row.riderName||''))){const id=row.riderId||row.id;if(id){value={before:row.riderName,name:careerUniqueRiderName(id,country||'GBR',used)};changed.set(id,value);}}if(value)row.riderName=value.name;};
 for(const show of [app.activeShow,...(app.showHistory||[])].filter(Boolean))for(const row of [...(show.competitors||[]),...(show.finalStandings||[])])renameRow(row,row.country||show.careerRider?.country);
 if(changed.size){for(const meet of Object.values(world.meets||{}))for(const row of meet.results||[]){const value=changed.get(row.riderId);if(value)row.riderName=value.name;}
 const byOldName=new Map([...changed].map(([id,value])=>[value.before,{...value,id}]));
 for(const [key,rows]of Object.entries(world.rankings||{})){const type=key.split('|')[0];if(['horse','young-horse','team'].includes(type))continue;for(const row of rows){let value=changed.get(row.riderId||row.id);if(type==='combination'&&!value){const old=byOldName.get(row.name.split(' / ')[0]);if(old&&row.id.startsWith(old.id+'|'))value=old;}if(value)row.name=type==='combination'?value.name+' / '+row.name.split(' / ').slice(1).join(' / '):value.name;}}
 }world.riderNamesVersion86=1;return changed.size;
}
const NAMES86_ROSTER=careerRoster;
careerRoster=function(...args){const roster=NAMES86_ROSTER(...args);if(app.career.riderNamesVersion86!==1)riderNames86Repair();return roster;};
const NAMES86_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const result=NAMES86_LOAD(...args);riderNames86Repair();return result;};
