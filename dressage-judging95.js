/* Shared dressage scale: strong work scores in the 70s/80s; exceptional movements can earn 9–10. */
function dressage95Mark({skill,quality=1,preparation=50,deduction=0,form=.5,variation=.5,brilliance=.5}){
 const technical=clamp(Number(skill)||0,0,100),execution=clamp(Number(quality)||0,0,1),ready=clamp((Number(preparation)-50)/50,0,1);
 const testForm=clamp(Number(form)||0,0,1),movement=clamp(Number(variation)||0,0,1),spark=clamp(Number(brilliance)||0,0,1);
 const ordinaryForm=(testForm-.5)*.5,exceptionalForm=technical>=95&&ready>=.9&&testForm>.995?(testForm-.995)/.005*.6:0;
 const exceptionalMovement=technical>=85&&execution>=.99&&ready>=.6&&spark>.98?(spark-.98)/.02*1.2:0;
 const raw=3.3+technical*.035+execution*1.35+ready*.35+ordinaryForm+(movement-.5)*.5+exceptionalForm+exceptionalMovement-Math.max(0,Number(deduction)||0);
 return Math.round(clamp(raw,0,10)*10)/10;
}
function dressage97Context(show,entry,movement){
 const seed=HorseHealth.hash(String(show?.id||'dressage')+'|'+String(entry?.id||entry?.horseId||'entry'));
 return {form:HorseHealth.roll(seed,'dressage97:form'),variation:HorseHealth.roll(seed,'dressage97:movement:'+movement),brilliance:HorseHealth.roll(seed,'dressage97:brilliance:'+movement)};
}
function dressage95Preparation(show,entry){
 const w=entry.player?show.rpg?.warmupState:null;
 if(w)return ['timing','focus','confidence'].reduce((n,key)=>n+clamp(Number(w[key])||0,0,100),0)/3;
 const attributes=entry.attributes||{};return ['Balance','Focus','Confidence'].reduce((n,key)=>n+clamp(Number(attributes[key]??5)*10,0,100),0)/3;
}
