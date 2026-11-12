/* One attainable 0–10 movement scale for manual, automatic and NPC dressage. */
function dressage95Mark({skill,quality=1,preparation=50,deduction=0}){
 const technical=clamp(Number(skill)||0,0,100),execution=clamp(Number(quality)||0,0,1),ready=clamp((Number(preparation)-50)/50,0,1);
 return Math.round(clamp(3+technical*.05+execution*1.5+ready*.5-Math.max(0,Number(deduction)||0),0,10)*10)/10;
}
function dressage95Preparation(show,entry){
 const w=entry.player?show.rpg?.warmupState:null;
 if(w)return ['timing','focus','confidence'].reduce((n,key)=>n+clamp(Number(w[key])||0,0,100),0)/3;
 const attributes=entry.attributes||{};return ['Balance','Focus','Confidence'].reduce((n,key)=>n+clamp(Number(attributes[key]??5)*10,0,100),0)/3;
}
