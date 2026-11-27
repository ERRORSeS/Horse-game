/* Preserve existing ridden efforts while restoring missing opponents in an open team show. */
function team116RepairOpenField(){
 const show=app.activeShow,event=show?.eventSnapshot;
 if(!event?.federationProgram||!event.team||show.awarded||show.finalStandings?.length||show.round||['complete','final','return'].includes(show.stage))return false;
 if(new Set((show.competitors||[]).map(e=>e.country)).size>1)return false;
 const player=show.competitors.find(e=>e.player),rider=player&&careerBookedRider(show,player);if(!rider)return false;
 const plan=federationPlan(event.date.year,event.programCountries?.[0]||rider.country,event.discipline,event.division),canonical=plan&&federation90ProgramEvents(plan).find(e=>e.id===event.id);
 if(canonical?.programCountries?.length>1)event.programCountries=[...canonical.programCountries];
 const limit=(event.programCountries?.length||6)*event.team,field=careerNpcField(event,limit,rider),counts=new Map(),used=new Set(show.competitors.map(e=>e.riderId));
 for(const e of show.competitors)counts.set(e.country,(counts.get(e.country)||0)+1);
 let added=0;for(const pair of field){const country=pair.rider.country;if(used.has(pair.rider.id)||(counts.get(country)||0)>=event.team)continue;
 const entry=careerNpcEntry(event,pair,show.competitors.length);entry.startOrder=show.competitors.length+1;show.competitors.push(entry);used.add(pair.rider.id);counts.set(country,(counts.get(country)||0)+1);added++;}
 if(added){show.npcCount=show.competitors.filter(e=>!e.player).length;event.npcCount=show.npcCount;event.fieldSize=show.competitors.length;}return added>0;
}
const TEAM116_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const out=TEAM116_LOAD(...args);team116RepairOpenField();return out;};
/* A squad which loses qualifying mounts during final checks cannot enter a partial foreign team. */
const TEAM116_FIELD=careerNpcField;
careerNpcField=function(event,limit,player=null,selectionPool=false){const field=TEAM116_FIELD(event,limit,player,selectionPool);if(!event.team||selectionPool)return field;const counts=new Map();for(const p of field)counts.set(p.rider.country,(counts.get(p.rider.country)||0)+1);return field.filter(p=>p.rider.country===player?.country||(counts.get(p.rider.country)||0)>=event.team);};
