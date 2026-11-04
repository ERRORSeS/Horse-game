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
  recoveryBonus:s.adjustedSinceAttempt||s.familiarArena===true?1:0};
}

function fenceAvoidanceSafeAids(h,s){
 const a=rrSettings().abilities,setup=eqSetup(h);
 return !s.rrCurrentError&&!s.rbJumpingNeglect&&!s.rrWelfareIncident&&(s.intensity||2)<=3
  &&!(a['Leg Stability']<20&&(s.riderAid==='Spurs'||taEquippedAid(h,'spurs',s)))
  &&!(a['Hand Stability']<20&&setup.bit==='Pelham Bit');
}
function fenceAvoidanceTraining(s){
 return rrEnabled()&&!rbAutoTrainingSession(s)&&!s.liveShowId&&!s.steps;
}
function fenceAvoidanceJumpWorked(s,latest=false){
 const attempts=(s.log||[]).filter(row=>row.resultIndex!=null&&row.exerciseId);
 if(attempts.length)return (latest?[attempts.at(-1)]:attempts).some(row=>t2exercise(row.exerciseId)?.category==='Jumping');
 return s.attempts>0&&t2exercise(s.exerciseId)?.category==='Jumping';
}
function recordBehaviorRecovery(h,s,reason,stat,change){
 if(!fenceAvoidanceTraining(s))return 0;
 const b=rbState(h),key=rrSessionId(s)+'|fence-recovery|'+reason;
 s.faRecoveries ||= {};
 if(s.faRecoveries[reason]||b.processed.includes(key))return 0;
 const before=b.learned[stat],after=clamp(before+change,0,100),delta=after-before;
 s.faRecoveries[reason]=true;b.processed.push(key);b.processed=b.processed.slice(-200);
 b.learned[stat]=after;
 const text=stat+': '+before+' → '+after+' ('+(delta>0?'+':'')+delta+'). '+reason.split(':')[0]+'.';
 b.history.push({key,day:rrDay(s),sessionId:rrSessionId(s),context:rbContext(s),kind:'Rider behavior recovery',positive:true,changes:{[stat]:{before,after,delta}},observation:text,recovery:'Improving'});
 b.history=b.history.slice(-50);s.log ||= [];s.log.push({kind:'Behavior outcome',text,elapsed:s.elapsed});
 if(s.report)s.report.notes.push(text);
 return delta;
}
function fenceAvoidanceRecover(h,s,reason,amount){
 return -recordBehaviorRecovery(h,s,reason,'Learned Fence Avoidance',-amount);
}
function fenceAvoidanceRecoveryAmount(h,s,reason){
 return 1+Math.floor(HorseHealth.roll(HorseHealth.hash(h.id+'|'+rrSessionId(s)+'|'+reason),'recovery')*2);
}
const FA_FOLLOWUP=rrFollowup;
rrFollowup=function(h,s,action){
 const refusal=s.rrConcern&&/refusal|runout/i.test(s.rrConcern.kind||''),eligible=!s.finished&&fenceAvoidanceTraining(s)&&fenceAvoidanceJumpWorked(s,true);
 const result=FA_FOLLOWUP(h,s,action);
 if(result&&eligible&&refusal&&['assess','investigate'].includes(action)){
  const reason='Reassessing a refusal:'+s.attempts;
  fenceAvoidanceRecover(h,s,reason,fenceAvoidanceRecoveryAmount(h,s,reason));
 }
 return result;
};
const FA_BREAK=t2break;
t2break=function(h,s,minutes=2){
 const eligible=!s.finished&&s.phase==='main'&&fenceAvoidanceTraining(s)&&fenceAvoidanceJumpWorked(s,true),before=s.tension;
 const result=FA_BREAK(h,s,minutes);
 if(eligible&&result>0&&s.tension<before){
  const reason='Calm walk or circle away:'+s.attempts;
  fenceAvoidanceRecover(h,s,reason,fenceAvoidanceRecoveryAmount(h,s,reason));
 }
 return result;
};
const FA_FINISH=t2finish;
t2finish=function(h,s){
 const experienced=!s.finished&&fenceAvoidanceTraining(s)&&['Advanced','Professional'].includes(rrSettings().level),eligible=experienced&&fenceAvoidanceJumpWorked(s),trustEligible=experienced&&s.attempts>0;
 const result=FA_FINISH(h,s);
 if(eligible&&s.finished)fenceAvoidanceRecover(h,s,'Experienced rider session',.5);
 if(trustEligible&&s.finished)recordBehaviorRecovery(h,s,'Experienced rider trust session','Rider Trust in Aids',3);
 return result;
};

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
 p.textContent='Learned Fence Avoidance: '+profile.score+'/100 — '+profile.label+'. Refusal/runout risk per jump: '+profile.min+'–'+profile.max+'% (current rider: '+Number(profile.chance.toFixed(1))+'%). Jump type does not change this rate. Suitable successful work with consistent aids rebuilds confidence; frightening experiences, unresolved distress, harsh tack with novice riders and neglectful methods reinforce avoidance. Reassessing a refusal or a calming walk/circle away reduces avoidance by 1–2 points. Advanced/Professional riders reduce it by 0.5 per completed jumping session.';
 node.appendChild(p);return node;
};
