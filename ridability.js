/* Permanent ridability is independent of age and sporting longevity estimates. */
function kissingSpines(h){return (h.medicalConditions||[]).find(c=>c.diagnosis==='kissing-spines'||/kissing spines/i.test(c.legacyName||c.name||''));}
function restoreBasicRidingEducation(h){
 if(!h||h.deceased||h.age<3||h.auctionTier&&h.age<=3)return h;
 h.requiresBreakingIn=false;
 h.behavior=Math.max(500,Number(h.behavior)||0);
 return h;
}
function syncRidability(h){
 if(!h)return h;
 if((h.isAuctionHorse||h.auctionPurchase)&&!(h.age<=3&&h.auctionTier))restoreBasicRidingEducation(h);
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
hydrateFromSave=function(data,...args){const r=RIDABILITY_LOAD(data,...args);if(!data.ridingEducationRepairVersion){for(const h of app.horses)restoreBasicRidingEducation(h);}app.ridingEducationRepairVersion=1;for(const h of csHorses())syncRidability(h);return r;};
const RIDABILITY_TACK_CHECK=eqTrainingAllowed;
eqTrainingAllowed=function(h,context,...args){if(h&&h.age<3&&!['groundwork','lunging','Hand Work'].includes(context))return 'Ridden work requires age three and suitable riding education.';return RIDABILITY_TACK_CHECK(h,context,...args);};

// Explicit repair for already-owned horses; sporting and medical history stay intact.
function makeHorseRidable(horseId){
 const h=app.horses.find(h=>h.id===horseId);
 if(!h)return {ok:false,message:'Select a horse in your stable.'};
 syncRidability(h);
 if(h.deceased)return {ok:false,message:'A deceased horse cannot be made ridable.'};
 if(h.age<3)return {ok:false,message:'This horse must be at least three years old for ridden work.'};
 if(kissingSpines(h))return {ok:false,message:'Kissing Spines is lifelong; this horse cannot be made ridable.'};
 restoreBasicRidingEducation(h);syncRidability(h);
 return {ok:canRideUnderSaddle(h),message:canRideUnderSaddle(h)?'Riding eligibility repaired. This horse is now ridable.':'This horse still has a riding restriction.'};
}
// Refresh derived levels from existing skills and potential without rerolling either.
function rerunHorseSkills(horseId){
 const h=app.horses.find(h=>h.id===horseId);
 if(!h)return {ok:false,message:'Select a horse in your stable.'};
 if(h.deceased)return {ok:false,message:'Levels cannot be recalculated for a deceased horse.'};
 if(!h.stats?.jumping||!h.stats?.dressage)return {ok:false,message:'This horse has no technical skills to recalculate.'};
 const levels=Object.fromEntries(Object.keys(SHOW_LEVELS).map(discipline=>[discipline,SHOW_LEVELS[discipline][highestAllowedLevelIndex(h,discipline)]]));
 return {ok:true,levels,message:'Maximum levels recalculated. Showjumping: '+levels.jumping+' m; Dressage: '+levels.dressage+'; Eventing: '+levels.eventing+'; Hunters: '+levels.hunter+'.'};
}
const RIDABILITY_CARD=createHorseCard;
createHorseCard=function(h,...args){
 const node=RIDABILITY_CARD(h,...args);
 if(!app.horses.some(owned=>owned.id===h.id))return node;
 const controls=document.createElement('section');controls.className='ridability-repair';
 const button=document.createElement('button');button.type='button';button.textContent='Make Horse Ridable';button.dataset.makeHorseRidable=h.id;
 const status=document.createElement('p');status.setAttribute('role','status');status.textContent=h.ridabilityRepairMessage||'';
 button.onclick=()=>{const result=makeHorseRidable(h.id);h.ridabilityRepairMessage=result.message;render();if(result.ok)saveGame(false);};
 const rerun=document.createElement('button');rerun.type='button';rerun.textContent='Rerun Skills';rerun.dataset.rerunHorseSkills=h.id;rerun.title='Recalculate maximum levels from current skills and potential without changing skill scores.';const skillStatus=document.createElement('p');skillStatus.setAttribute('role','status');skillStatus.textContent=h.skillRerunMessage||'';rerun.onclick=()=>{const result=rerunHorseSkills(h.id);h.skillRerunMessage=result.message;render();if(result.ok)saveGame(false);};
 controls.appendChild(button);controls.appendChild(rerun);controls.appendChild(status);controls.appendChild(skillStatus);node.appendChild(controls);return node;
};

// Ridable horses may enter competitions regardless of legacy administrative flags.
canCompeteUnderSaddle=function(h){return canRideUnderSaddle(h);};
