/* Permanent ridability is independent of age and sporting longevity estimates. */
function kissingSpines(h){return (h.medicalConditions||[]).find(c=>c.diagnosis==='kissing-spines'||/kissing spines/i.test(c.legacyName||c.name||''));}
function syncRidability(h){
 if(!h)return h;
 let c=kissingSpines(h);
 const legacy=[...(h.legacyMedicalRecords||[]),...(h.illnesses||[])].find(c=>/kissing spines/i.test(c.name||''));
 if(!c&&legacy){c=HorseHealth.add(h,'legacy',csDay(),{legacyName:'Kissing Spines',known:true,confirmed:true,cause:'Recorded rescue or historical diagnosis'});}
 if(c){c.resolved=false;c.recoveryDays=Math.max(c.recoveryDays||0,1000000000);c.chronic=true;c.stage='Lifelong';h.unridable=true;h.unridableReason='Kissing Spines';}
 else{h.unridable=false;delete h.unridableReason;}
 return h;
}
const RIDABILITY_ENSURE=csEnsure;
csEnsure=function(h,...args){return syncRidability(RIDABILITY_ENSURE(h,...args));};
const RIDABILITY_RIDE=canRideUnderSaddle;
canRideUnderSaddle=function(h){if(!h||h.age<3)return false;syncRidability(h);return !h.unridable&&RIDABILITY_RIDE(h);};
function recordZeroSoundnessRiding(h,day){syncRidability(h);if((h.soundnessRemainingMonths??h.soundnessYears*12)>0){h.zeroSoundnessRiddenDays=[];return;}const days=h.zeroSoundnessRiddenDays ||= [];if(!days.includes(day))days.push(day);if(days.length>360&&!kissingSpines(h)){HorseHealth.add(h,'legacy',day,{legacyName:'Kissing Spines',known:true,confirmed:true,cause:'Ridden for over one game year at zero soundness'});syncRidability(h);}}
const RIDABILITY_USE=eqRecordUse;
eqRecordUse=function(h,context='flatwork',ridden=true,token=null,...args){const result=RIDABILITY_USE(h,context,ridden,token,...args);if(result!==false&&ridden)recordZeroSoundnessRiding(h,csDay());return result;};
const RIDABILITY_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const r=RIDABILITY_LOAD(...args);for(const h of csHorses())syncRidability(h);return r;};
