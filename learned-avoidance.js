/* One refusal/runout rate per jump, independent of fence type or remembered venue. */
const FA_BANDS=[
 {max:10,min:15,high:25,label:'Little learned avoidance'},
 {max:30,min:30,high:40,label:'Mild avoidance'},
 {max:50,min:45,high:55,label:'Noticeable avoidance'},
 {max:75,min:65,high:75,label:'Strong established avoidance'},
 {max:100,min:85,high:90,label:'Severe context-specific avoidance'}
];
function fenceAvoidanceOverLevel(s={}){
 const d=['hunter','eventing'].includes(s.discipline)?s.discipline:'jumping',experience=rrSettings().experience[d];
 if(s.level&&SHOW_LEVELS[d].includes(s.level))return rrOverLevel(d,s.level);
 const height=Number(s.setup?.height),known=parseFloat(rrSettings().experience.jumping);
 return Number.isFinite(height)&&Number.isFinite(known)?clamp((height-known)*25,0,25):0;
}
function fenceAvoidanceProfile(h,s={}){
 const score=clamp(Number(rrHorse(h).learned['Learned Fence Avoidance'])||0,0,100),band=FA_BANDS.findIndex(b=>score<=b.max),row=FA_BANDS[band],level=rrSettings().level,experience=rrSettings().experience.jumping,over=fenceAvoidanceOverLevel(s);
 // Professional exception for strong avoidance: ordinary low-avoidance risk remains.
 const professionalException=band===3&&level==='Professional',min=professionalException?15:row.min,max=professionalException?25:row.high;
 const rider={Beginner:1,Novice:.8,Intermediate:.6,Advanced:.25,Professional:0}[level]??.6;
 const chance=min+(max-min)*clamp(rider+over/25,0,1);
 return {score,band,label:row.label,min,max,chance,modifier:chance,over,experience,professionalException};
}
function fenceAvoidanceLearning(h,s={}){
 const novice=['Beginner','Novice'].includes(rrSettings().level),gear=taEquipment(h,s);
 const harsh=novice&&gear.components.some(c=>['Pelham Bit','Gag Bit','Weymouth & Bradoon Set','Double Bridle'].includes(c.id)||c.riderCoordinationRequirement==='Advanced'||c.horsePreferenceScore<35);
 return {harsh,suitable:!harsh&&!s.rrCurrentError&&fenceAvoidanceOverLevel(s)===0&&(s.tension||0)<40,
  recoveryBonus:['Advanced','Professional'].includes(rrSettings().level)||s.adjustedSinceAttempt||s.familiarArena===true?1:0};
}
const FA_CHANCES=competitionOptionFinalChances;
competitionOptionFinalChances=function(s,h,step,options){
 const rows=FA_CHANCES(s,h,step,options);
 if(!rrEnabled()||step?.stage!=='main_round'||s.discipline==='dressage'||String(step.phase).toLowerCase().includes('dressage'))return rows;
 const profile=fenceAvoidanceProfile(h,s);
 return rows.map(row=>{
  const remaining=100-profile.chance,total=row.successChance+row.computed.neutralChance,success=total?remaining*row.successChance/total:remaining;
  return {...row,successChance:success,computed:{...row.computed,neutralChance:remaining-success,failChance:profile.chance},learnedAvoidance:profile};
 });
};
const FA_CARD=createHorseCard;
createHorseCard=function(h,...args){
 const node=FA_CARD(h,...args),profile=fenceAvoidanceProfile(h),p=document.createElement('p');
 p.textContent='Learned Fence Avoidance: '+profile.score+'/100 — '+profile.label+'. Refusal/runout risk per jump: '+profile.min+'–'+profile.max+'% (current rider: '+Number(profile.chance.toFixed(1))+'%). Jump type does not change this rate. Suitable successful work with consistent aids rebuilds confidence; frightening experiences, unresolved distress, harsh tack with novice riders and neglectful methods reinforce avoidance. Changing riders or management alone does not erase learned behavior.';
 node.appendChild(p);return node;
};
