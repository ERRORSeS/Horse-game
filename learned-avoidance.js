/* Training Behavior Engine 5.0. Learned values live only on horse.riderBehavior.learned. */
const FA_BANDS=[{max:2,min:4,high:4,label:'Minimal learned avoidance'},{max:10,min:15,high:25,label:'Little learned avoidance'},{max:30,min:30,high:40,label:'Mild avoidance'},{max:50,min:45,high:55,label:'Noticeable avoidance'},{max:75,min:65,high:75,label:'Strong established avoidance'},{max:100,min:85,high:90,label:'Severe established avoidance'}];
function getBaseAvoidanceRisk(value){
 const n=clamp(Number(value)||0,0,100);
 if(n<=2)return 4;
 if(n<=10)return 15+n;
 if(n<=30)return 30+((n-11)/19)*10;
 if(n<=50)return 45+((n-31)/19)*10;
 if(n<=75)return 65+((n-51)/24)*10;
 return 85+((n-76)/24)*5;
}
function tbTier(value,rows){return rows[Math.min(4,Math.floor(clamp(Number(value)||0,0,100)/20))];}
function fenceAvoidanceOverLevel(s={}){
 const levels=SHOW_LEVELS.jumping,experience=parseFloat(rrSettings().experience.jumping),height=parseFloat(s.setup?.height??s.level);
 if(!Number.isFinite(height))return 0;
 const tier=levels.findIndex(level=>parseFloat(level)>=height-.00001),current=levels.findIndex(level=>parseFloat(level)>=experience-.00001);
 const gap=Math.max(0,(tier<0?levels.length:tier)-Math.max(0,current));
 return [0,3,6,10,15][Math.min(4,gap)];
}
function fenceAvoidanceProfile(h,s={}){
 const b=rrHorse(h).learned,score=b['Learned Fence Avoidance'],band=FA_BANDS.findIndex(row=>score<=row.max),row=FA_BANDS[band];
 const tension=s.tension??s.warmupState?.tension??0,parts={base:getBaseAvoidanceRisk(score),rider:({Beginner:8,Novice:5,Intermediate:2,Advanced:-3,Professional:-7})[rrSettings().level],height:fenceAvoidanceOverLevel(s),confidence:tbTier(b['Jump Confidence'],[8,5,2,0,-4]),trust:tbTier(b['Rider Trust in Aids'],[6,4,2,0,-3]),tension:tension<25?-3:tension<45?-1:tension<65?0:tension<80?3:6,medical:0};
 const chance=clamp(Object.values(parts).reduce((sum,n)=>sum+n,0),5,95);
 return {score,band,label:row.label,min:row.min,max:row.high,base:parts.base,chance,modifier:chance,parts,over:parts.height,experience:rrSettings().experience.jumping};
}
function tbTrainer(s){
 const r=rrSettings(),type=r.trainer==='Demanding'?'Strict':r.trainer||'Fair';app.behaviorTrainers ||= {};
 if(!r.trainerId||!app.behaviorTrainers[r.trainerId]||app.behaviorTrainers[r.trainerId].type!==type){r.trainerId='trainer-'+(app.behaviorTrainerSequence=(app.behaviorTrainerSequence||0)+1);app.behaviorTrainers[r.trainerId]={id:r.trainerId,type};}
 if(s)s.trainerId=r.trainerId;
 return app.behaviorTrainers[r.trainerId];
}
function tbSession(h,s){
 const b=rrHorse(h);s.horseId ||= h.id;
 s.behavior5 ||= {version:5,sessionId:rrSessionId(s),horseId:h.id,initialBehavior:{...b.learned},resolvedEventIds:[],completedAttemptIds:[],actionHistory:[],events:[],learningCaps:{nonJumpingAvoidanceReduction:0,successfulJumpConfidenceGain:0,sessionTrustGain:0},positiveJumps:0,positiveMounted:0,clearCommunication:0,errors:0,refusals:0};
 s.behavior5.riderId=rrSettings().riderId;s.behavior5.trainerId=tbTrainer(s).id;
 return s.behavior5;
}
function tbRandom(h,s,key){return HorseHealth.roll(HorseHealth.hash(h.id+'|'+rrSessionId(s)+'|'+key),'behavior5');}
function tbRange(h,s,key,a,b){return a+Math.floor(tbRandom(h,s,key)*(b-a+1));}
function tbMedical(h){return typeof HorseHealth!=='undefined'&&HorseHealth.workloadAdvice(h,'ridden',2).some(row=>row.level>=2);}
function tbJump(s){const e=t2exercise(s.exerciseId);return e?e.category==='Jumping':['jumping','hunter','eventing'].includes(s.discipline)&&!String(s.steps?.[s.stepIndex]?.phase||'').includes('dressage');}
function tbMounted(s){const e=t2exercise(s.exerciseId);return e?e.category!=='Groundwork'&&!e.id.startsWith('lunge-'):s.discipline!=='groundwork';}
function tbEvent(h,s,id,type,extra={}){
 const state=tbSession(h,s),b=rbState(h),key=rrSessionId(s)+'|behavior5|'+id;
 if(state.resolvedEventIds.includes(key)||b.processed.includes(key))return null;
 state.resolvedEventIds.push(key);state.resolvedEventIds=state.resolvedEventIds.slice(-300);b.processed.push(key);b.processed=b.processed.slice(-300);
 const trainer=tbTrainer(s),event={key,id,type,horseId:h.id,sessionId:rrSessionId(s),riderId:rrSettings().riderId,riderLevel:rrSettings().level,trainerId:trainer.id,trainerType:trainer.type,day:rrDay(s),hour:pastureCalendarHour(),attempt:s.attempts??s.stepIndex??0,exercise:s.exerciseId||s.level||s.discipline,context:rbContext(s),action:s.behavior5.pendingAction||null,changes:{},positive:false,flags:{},...extra};
 state.events.push(event);state.events=state.events.slice(-150);return event;
}
function tbApply(h,s,event,stat,delta,cap=null,limit=Infinity){
 const state=tbSession(h,s),b=rrHorse(h),before=b.learned[stat];
 if(cap){const remaining=Math.max(0,limit-(state.learningCaps[cap]||0));delta=Math.sign(delta)*Math.min(Math.abs(delta),remaining);}
 const after=clamp(before+delta,0,100),actual=after-before;
 if(cap)state.learningCaps[cap]=(state.learningCaps[cap]||0)+Math.abs(actual);
 if(actual){b.learned[stat]=after;const prior=event.changes[stat];event.changes[stat]={before:prior?.before??before,after,delta:after-(prior?.before??before)};}
 return actual;
}
function tbCommit(h,s,event){
 const state=tbSession(h,s),b=rbState(h);tbEnrichEvent(h,s,event);event.positive=Object.entries(event.changes).some(([stat,c])=>(/Avoidance|Sensitivity|Anticipation/.test(stat)?-c.delta:c.delta)>0);
 event.kind=event.type;event.rider=event.riderId;event.cause=event.type;event.recovery=event.positive?'Improving':'Unresolved';event.consequence=Object.entries(event.changes).map(([stat,c])=>stat+': '+c.before+' → '+c.after).join('; ')||'No permanent learned change';
 b.history.push(event);b.history=b.history.slice(-100);b.experiences.push(event);b.experiences=b.experiences.slice(-200);s.rbLatestExperience=event.key;
 if(event.type==='attempt'){b.behavior5Setbacks ||= {};const scope=tbScope(s);if(event.failed&&Object.keys(event.changes).length){b.behaviorSetbacks[event.context]={key:event.key,day:event.day,sessionId:event.sessionId};b.behavior5Setbacks[scope]={key:event.key,day:event.day,successfulAttempts:0};}else if(event.clean&&b.behavior5Setbacks[scope])b.behavior5Setbacks[scope].successfulAttempts++;}
 s.log ||= [];s.log.push({kind:'Behavior outcome',text:event.consequence,elapsed:s.elapsed,eventId:event.key});
 tbNarrate(h,s,event);return event;
}
function tbRecord(h,s,kind,discipline,positive=false){
 if(!rrEnabled()||s.behavior5?.finished||s.rbResult?.status==='DQ')return null;
 const attempt=s.attempts??s.stepIndex??0,index=s.rbResultIndex??s.lastResult;
 // Communication and welfare are separate real events, never inferred from the prose.
 if(kind==='communication')return null;
 const event=tbEvent(h,s,kind==='welfare'?'welfare:'+attempt:'attempt:'+attempt,kind==='welfare'?'welfare':'attempt',{resultIndex:index,clean:positive&&(index==null||index<=1),failed:!positive,jumping:tbJump(s),mounted:tbMounted(s),riderError:!!s.rrCurrentError,event:kind});
 if(!event)return null;
 const state=tbSession(h,s),b=rrHorse(h),collection=/collect|shoulder|half-pass|piaffe|passage/.test(s.exerciseId||'');
 if(event.type==='attempt'){state.completedAttemptIds.push(event.key);state.completedAttemptIds=state.completedAttemptIds.slice(-200);if(event.riderError)state.errors++;}
 const refusal=['refusal','runout','abandoned-approach'].includes(kind)||index===5,spook=/spook/i.test(kind),significant=index>=4||refusal||spook||kind==='welfare',prior=state.events.filter(e=>e.type==='attempt'&&e.failed&&e.exercise===event.exercise).length>1;
 if(refusal&&event.type==='attempt')state.refusals++;
 event.flags={success:event.clean,cleanJump:event.clean&&event.jumping,failed:event.failed,refusal,hesitation:index===4||refusal,technicalError:event.failed&&index===3,riderError:event.riderError,approachError:event.riderError&&event.jumping,timingError:event.riderError&&rrSettings().abilities.Timing<50,distanceError:event.riderError&&t2taskEvent(t2exercise(s.exerciseId)||{id:''})==='distance',balanceError:!!s.riderFell,balanceFailed:!!s.riderFell,overHeight:fenceAvoidanceOverLevel(s)>0,medicalConcern:tbMedical(h),repeatedErrors:state.errors>=2,repeatedRefusals:state.refusals>=2,venue:!!(s.facilityId||s.liveShowId),familiar:(t2horse(h).familiarity[s.lastAttemptKey]||0)>20};
 if(kind==='welfare'){
  tbApply(h,s,event,'Rider Trust in Aids',-3);if(event.jumping)tbApply(h,s,event,'Jump Confidence',-2);
  if(event.jumping)tbApply(h,s,event,'Learned Fence Avoidance',2);state.severeCommunication=true;event.flags.misconduct=true;
 }else if(event.clean){
  if(event.jumping){const roll=tbRandom(h,s,event.key+'|confidence'),gain=roll<.4?2:roll<.8?3:4;tbApply(h,s,event,'Jump Confidence',gain,'successfulJumpConfidenceGain',12);state.positiveJumps++;tbApply(h,s,event,'Learned Fence Avoidance',-1);}
  else if(event.mounted)tbApply(h,s,event,'Flatwork Confidence',tbRange(h,s,event.key+'|flat',1,2));
  else tbApply(h,s,event,'Handling Confidence',1);
  if(collection)tbApply(h,s,event,'Collection Confidence',tbRange(h,s,event.key+'|collection',1,2));
  if(event.mounted)state.positiveMounted++;
  if(!event.riderError){tbApply(h,s,event,'Rider Trust in Aids',1);state.clearCommunication++;event.flags.clearCommunication=true;}
  if(s.facilityId||s.liveShowId)tbApply(h,s,event,'Arena Confidence',tbRange(h,s,event.key+'|venue',1,2));
  if(!event.riderError&&/transition|walk-|downward/.test(s.exerciseId||''))tbApply(h,s,event,'Training Anticipation',-tbRange(h,s,event.key+'|timing',1,2));
  if(s.exerciseId==='desensitize'||s.rrRecovery&&state.events.some(e=>e.event==='spook'))tbApply(h,s,event,'Learned Spook Sensitivity',-tbRange(h,s,event.key+'|familiarize',1,2));
 }else if(significant||event.riderError){
  if(event.jumping){
   if(event.riderError&&['Beginner','Novice'].includes(event.riderLevel))tbApply(h,s,event,'Jump Confidence',-tbRange(h,s,event.key+'|error',1,2));
   else if(event.riderLevel==='Intermediate'&&significant&&event.riderError)tbApply(h,s,event,'Jump Confidence',-1);
   if(refusal||kind==='welfare')tbApply(h,s,event,'Learned Fence Avoidance',prior?2:1);
  }else if(event.mounted)tbApply(h,s,event,'Flatwork Confidence',-tbRange(h,s,event.key+'|flat',prior?3:2,prior?5:3));
  else tbApply(h,s,event,'Handling Confidence',-tbRange(h,s,event.key+'|handling',2,4));
  if(collection)tbApply(h,s,event,'Collection Confidence',-tbRange(h,s,event.key+'|collection',prior?3:2,prior?5:4));
  if(spook){tbApply(h,s,event,'Learned Spook Sensitivity',tbRange(h,s,event.key+'|spook',2,5));tbApply(h,s,event,'Arena Confidence',-tbRange(h,s,event.key+'|arena',2,4));}
 }
 if(kind==='anticipation')tbApply(h,s,event,'Training Anticipation',tbRange(h,s,event.key+'|anticipation',prior?2:1,prior?4:3));
 event.flags.confidenceGain=(event.changes['Jump Confidence']?.delta||0)>0;event.flags.avoidanceDecrease=(event.changes['Learned Fence Avoidance']?.delta||0)<0;
 return tbCommit(h,s,event);
}
function fenceAvoidanceLearning(h,s={}){return {harsh:false,suitable:!s.rrCurrentError&&!tbMedical(h),recoveryBonus:0};}
function fenceAvoidanceSafeAids(h,s){const a=rrSettings().abilities,gear=taEquipment(h,s);return gear.score>=55&&!gear.warnings.length&&!s.rrCurrentError&&!s.rrWelfareIncident&&!(a['Leg Stability']<20&&taEquippedAid(h,'spurs',s))&&!(a['Hand Stability']<20&&eqSetup(h).bit==='Pelham Bit');}
function fenceAvoidanceTraining(s){return rrEnabled()&&!s.liveShowId&&!s.steps;}
function fenceAvoidanceJumpWorked(s,latest=false){const rows=(s.log||[]).filter(row=>row.resultIndex!=null&&row.exerciseId);return (latest?rows.slice(-1):rows).some(row=>t2exercise(row.exerciseId)?.category==='Jumping');}
function tbRecovery(h,s,action){
 const state=tbSession(h,s),attempt=s.attempts||0,family=['assess','investigate'].includes(action)?'reassess':action==='reorganize'?'reorganize':'break',sequence=family==='reassess'?'':':'+(state.recoverySequence=(state.recoverySequence||0)+1),key='recovery:'+attempt+':'+family+sequence;
 const latest=state.events.findLast(e=>e.type==='attempt');
 if(s.finished||!attempt||!fenceAvoidanceJumpWorked(s,true)||!latest)return null;
 if(['assess','investigate'].includes(action)&&!latest.flags.refusal)return null;
 const event=tbEvent(h,s,key,'recovery',{action,flags:{selectedAction:true,break:action==='break'||action==='circle-away',reassessment:action==='assess'||action==='investigate'}});if(!event)return null;
 const roll=tbRandom(h,s,key+'|'+action),row=action==='assess'?(roll<.45?[2,3,5]:roll<.8?[1,1,3]:[0,0,1]):action==='investigate'?(roll<.4?[2,0,0]:roll<.8?[1,0,0]:[0,0,0]):action==='reorganize'?(roll<.3?[2,3,5]:roll<.75?[1,1,3]:[0,0,1]):(roll<.3?[2,4,6]:roll<.7?[1,2,4]:[0,1,2]);
 const before=s.tension||0,drop=tbRange(h,s,key+'|tension',row[1],row[2]);s.tension=Math.max(0,before-drop);event.tension={before,after:s.tension};
 if(!tbMedical(h)&&(['assess','investigate'].includes(action)||s.tension<before))tbApply(h,s,event,'Learned Fence Avoidance',-row[0],'nonJumpingAvoidanceReduction',4);
 if(s.tension<=10){s.recoveryRequired=false;s.controlLost=false;}
 event.flags.tensionDecrease=s.tension<before;event.flags.avoidanceDecrease=(event.changes['Learned Fence Avoidance']?.delta||0)<0;event.flags.reassessmentImproved=event.flags.reassessment&&event.flags.avoidanceDecrease;
 if(event.flags.reassessment&&!event.flags.avoidanceDecrease)event.flags.noReassessmentImprovement=true;
 return tbCommit(h,s,event);
}
function recordBehaviorRecovery(h,s,reason,stat,change){const e=tbEvent(h,s,reason,'recovery',{action:reason});if(!e)return 0;const delta=tbApply(h,s,e,stat,change);tbCommit(h,s,e);return delta;}
function fenceAvoidanceRecover(h,s,reason,amount){return -recordBehaviorRecovery(h,s,reason,'Learned Fence Avoidance',-amount);}
function fenceAvoidanceReward(h,s){
 if(!rrEnabled()||s.finished||s.phase!=='main'||!fenceAvoidanceJumpWorked(s,true)||![0,1].includes(s.lastResult))return false;
 const state=tbSession(h,s),latest=state.events.findLast(e=>e.type==='attempt');if(!latest?.clean||!latest.jumping)return false;
 const event=tbEvent(h,s,'reward:'+s.attempts,'reward',{action:'reward',flags:{selectedAction:true}});if(!event)return false;
 const learned=rrHorse(h).learned;
 if(learned['Jump Confidence']<50)tbApply(h,s,event,'Jump Confidence',1);
 if(learned['Learned Fence Avoidance']>75)tbApply(h,s,event,'Learned Fence Avoidance',-1);
 tbCommit(h,s,event);return true;
}
function tbFinish(h,s){
 const state=tbSession(h,s);if(state.finished)return;
 if(s.attempts>0&&!state.events.some(e=>e.type==='attempt'&&e.attempt===s.attempts)){state.pendingFinish=true;return;}
 state.finished=true;
 if(!state.events.some(e=>e.type==='attempt'))return;
 const event=tbEvent(h,s,'finish','session',{flags:{sessionComplete:true}});if(!event)return;
 const experienced=['Advanced','Professional'].includes(rrSettings().level),serious=s.rrWelfareIncident||s.riderFell||s.recoveryRequired||(s.tension||0)>=65||tbMedical(h);
 const riderWork=state.events.filter(e=>e.type==='attempt'&&e.riderId===rrSettings().riderId&&['Advanced','Professional'].includes(e.riderLevel));
 if(experienced&&riderWork.some(e=>e.clean&&e.jumping)&&!serious)tbApply(h,s,event,'Learned Fence Avoidance',-.5);
 if(experienced&&riderWork.some(e=>e.clean&&e.mounted&&e.flags.clearCommunication)&&!state.severeCommunication&&!serious)tbApply(h,s,event,'Rider Trust in Aids',3,'sessionTrustGain',3);
 const abilities=rrSettings().abilities;
 if(state.positiveMounted>0&&state.clearCommunication>0&&!state.severeCommunication&&!serious&&fenceAvoidanceSafeAids(h,s)&&(abilities['Leg Stability']<20||abilities['Hand Stability']<20))tbApply(h,s,event,'Rider Trust in Aids',1);
 const b=rrHorse(h);event.flags={...event.flags,riderChanged:!!b.lastBehaviorRider&&b.lastBehaviorRider!==rrSettings().riderId};
 const positive=!serious&&state.events.some(e=>e.type==='attempt'&&e.clean)&&Object.entries(b.learned).some(([stat,n])=>(/Avoidance|Sensitivity|Anticipation/.test(stat)?-1:1)*(n-state.initialBehavior[stat])>0),scope=tbScope(s),setback=b.behavior5Setbacks?.[scope];
 b.completedBehaviorSessions ||= [];if(!b.completedBehaviorSessions.some(e=>e.sessionId===rrSessionId(s)))b.completedBehaviorSessions.push({sessionId:rrSessionId(s),horseId:h.id,rider:rrSettings().riderId,riderLevel:rrSettings().level,trainerId:s.trainerId,day:rrDay(s),context:rbContext(s),scope,positive,setbackKey:setback?.key});b.completedBehaviorSessions=b.completedBehaviorSessions.slice(-100);
 const positives=b.completedBehaviorSessions.filter(e=>e.positive&&e.rider===rrSettings().riderId&&e.scope===scope&&e.setbackKey===setback?.key);
 if(positive&&setback&&positives.length>=3&&!setback.milestoneAwarded){tbApply(h,s,event,scope==='jumping'?'Jump Confidence':scope==='groundwork'?'Handling Confidence':'Flatwork Confidence',3);setback.milestoneAwarded=true;event.flags.recoveryMilestone=true;}event.flags.twoSessions=positives.length===2;event.flags.threeSessions=positives.length>=3;event.flags.mixed=state.events.some(e=>e.clean)&&state.events.some(e=>e.failed);event.flags.trustSessionGain=(event.changes['Rider Trust in Aids']?.delta||0)>=3;
 tbCommit(h,s,event);b.lastBehaviorRider=rrSettings().riderId;b.lastBehaviorWorkDay=rrDay(s);
 if(s.report){s.report.behavior={version:5,initial:{...state.initialBehavior},final:{...b.learned},caps:{...state.learningCaps},eventIds:state.events.map(e=>e.key)};s.report.notes.push(event.consequence);}
}
function tbStartAction(h,s,action){const state=tbSession(h,s);state.pendingAction=action;state.actionHistory.push({id:rrSessionId(s)+'|action:'+(state.actionSequence=(state.actionSequence||0)+1),action,attempt:s.attempts||0,hour:pastureCalendarHour(),tension:s.tension||0,exercise:s.exerciseId,difficulty:s.difficulty,height:s.setup?.height,setupHash:HorseHealth.hash(JSON.stringify(s.setup||{}))});state.actionHistory=state.actionHistory.slice(-200);}
function tbCompleteAction(h,s,action){
 if(!rrEnabled())return;const state=tbSession(h,s);
 const before=state.actionHistory.at(-1),changed=before&&(before.exercise!==s.exerciseId||before.difficulty!==s.difficulty||before.setupHash!==HorseHealth.hash(JSON.stringify(s.setup||{})));
 if(changed&&['simplify','easier','lower5','lower10','smaller-steps','change-rein','switch','larger-circle','away-object','flatwork'].includes(action)&&s.attempts>0&&before?.tension>0)tbRecovery(h,s,'reorganize');
 const e=tbEvent(h,s,'action:'+state.actionSequence,'action',{action,flags:{selectedAction:true,simplify:changed&&['simplify','easier','lower5','lower10','smaller-steps'].includes(action),repeat:['attempt','repeat-line','calm-repeat'].includes(action),configure:changed&&['switch','raise5','raise10','lower5','lower10','select-exercise','configure-fence'].includes(action)}});if(e)tbCommit(h,s,e);
 state.pendingAction=null;
}
// Existing action handlers remain in place; only their behavior consequences are owned here.
const TB_NEW_SESSION=t2newSession;t2newSession=function(h,options={}){const s=TB_NEW_SESSION(h,options);if(rrEnabled())tbSession(h,s);return s;};
const TB_BREAK=t2break;t2break=function(h,s,minutes=2){
 if(!rrEnabled())return TB_BREAK(h,s,minutes);
 if(s.finished||s.riderFell||s.mountedStopped)return 0;
 if(s.phase!=='main'||!s.attempts||!fenceAvoidanceJumpWorked(s,true))return TB_BREAK(h,s,minutes);
 const before=s.tension||0,action=s.behavior5?.pendingAction==='circle-away'?'circle-away':'break',event=tbRecovery(h,s,action);
 if(!event)return 0;
 s.elapsed+=clamp(Number(minutes)||2,2,10);s.gait='Walk';s.speedPressure=0;
 s.log.push({kind:'Walk break',text:(before-(s.tension||0))>0?'The horse is calmer; the recorded behavior changes show whether avoidance improved.':'The horse remains uncertain after the pause.',elapsed:s.elapsed});
 return before-(s.tension||0);
};
const TB_FOLLOWUP=rrFollowup;rrFollowup=function(h,s,action){
 if(!rrEnabled())return TB_FOLLOWUP(h,s,action);
 if(s.finished||!s.rrConcern)return false;
 if(['assess','investigate'].includes(action)){
  const event=tbRecovery(h,s,action);if(!event)return false;s.rrConcern=null;s.rrAssessment=action==='assess';return true;
 }
 if(action==='change-trainer'){const ok=rrChangeTrainer(h,s);if(ok)s.rrConcern=null;return ok;}
 const result=TB_FOLLOWUP(h,s,action);
 if(result&&action==='continue'){
  const event=tbEvent(h,s,'unresolved:'+s.attempts,'unresolved concern',{action,flags:{selectedAction:true,failed:true}});
  if(event){if(tbJump(s))tbApply(h,s,event,'Learned Fence Avoidance',1);tbCommit(h,s,event);}
 }
 return result;
};
const TB_FINISH=t2finish;t2finish=function(h,s){const out=TB_FINISH(h,s);if(rrEnabled())tbFinish(h,s);return out;};
const TB_ATTEMPT=t2attempt;t2attempt=function(h,s){
 if(!rrEnabled())return TB_ATTEMPT(h,s);
 const state=tbSession(h,s),before=s.attempts||0;
 const result=TB_ATTEMPT(h,s);
 if(result?.resultIndex!=null&&!result.blocked&&s.attempts>before){
  // The original pipeline resolves incidents, skills and eligibility. Narration follows it.
  const event=state.events.findLast(e=>e.type==='attempt'&&e.attempt===s.attempts);
  if(event){event.incident=result.incident||null;event.flags.balanceFailed=!!result.incident?.fell;event.flags.balanceError=!!result.incident?.fell;tbNarrate(h,s,event);}
  if(s.finished)tbFinish(h,s);
 }
 return result;
};
const TB_TA_RESOLVE=taResolve;taResolve=function(h,s,e,result){
 if(rrEnabled()&&!s.rrCurrentError&&!['aid','overreaction'].includes(result?.event))return null;
 const event=TB_TA_RESOLVE(h,s,e,result);if(!rrEnabled()||!event)return event;
 const state=tbSession(h,s);
 const learned=tbEvent(h,s,'communication:'+(s.attempts??s.stepIndex??0),'communication',{failed:true,mounted:true,severity:event.severity,flags:{contactError:event.kind==='contact',legError:event.kind==='leg',riderError:true}});
 if(learned){
  const severe=event.severity==='Significant';if(event.severity!=='Minor')tbApply(h,s,learned,'Rider Trust in Aids',-tbRange(h,s,learned.key,2,5));
  if(taContext(e,s).collection&&!state.events.some(row=>row.attempt===learned.attempt&&row.changes['Collection Confidence']))tbApply(h,s,learned,'Collection Confidence',-tbRange(h,s,learned.key+'|collection',2,4));
  if(severe)state.severeCommunication=true;tbCommit(h,s,learned);
 }
 return event;
};
const TB_BASE_PROBABILITY=RR_PROBABILITY;
t2probability=function(h,event,base,c={},primary,secondary,s){
 const row=TB_BASE_PROBABILITY(h,event,base,c,primary,secondary,s);if(!rrEnabled()||!s)return row;
 const b=rrHorse(h).learned,e=t2exercise(s.exerciseId),jump=e?.category==='Jumping',ground=e?.category==='Groundwork'||e?.id.startsWith('lunge-'),collection=/collect|shoulder|half-pass|piaffe|passage/.test(e?.id||'');let extra=0;
 if(['technical','hesitation','resistance'].includes(event)&&!jump){extra+=tbTier(b[ground?'Handling Confidence':'Flatwork Confidence'],[8,5,2,0,ground?-4:-3]);if(collection&&event!=='technical')extra+=tbTier(b['Collection Confidence'],[8,5,2,0,-4]);}
 if(event==='aid'||event==='cooperation')extra+=tbTier(b['Rider Trust in Aids'],[6,4,2,0,-3]);
 if(event==='anticipation')extra+=tbTier(b['Training Anticipation'],[-2,0,2,5,8]);
 if(['spook','tension','distraction'].includes(event)&&(c.wind||c.traffic||c.busy||c.newArena))extra+=tbTier(b['Arena Confidence'],[8,5,2,0,-4]);
 if(event==='spook'&&(c.wind||c.traffic||c.busy))extra+=tbTier(b['Learned Spook Sensitivity'],[-3,-1,0,4,7]);
 if(event==='technical'&&!ground){const info=taEquipment(h,s),a=rrSettings().abilities;extra+=taStability(Math.min(a['Hand Stability'],a['Leg Stability']))+info.modifier+info.coordinationModifier+tbTier(b['Rider Trust in Aids'],[6,4,2,0,-3]);if(collection)extra+=tbTier(b['Collection Confidence'],[8,5,2,0,-4]);}
 if(event==='technical'&&s.rrCurrentError)extra+=rrTechnique(h,s).overLevel;
 return {...row,chance:clamp(row.chance+extra,0,row.cap),behaviorModifier:extra};
};
const TB_SPOOK=t2xSpookProfile;t2xSpookProfile=function(h,s,c,gear){const p=TB_SPOOK(h,s,c,gear);if(!rrEnabled()||!(c.wind||c.traffic||c.busy||c.actualStimulus))return p;const b=rrHorse(h);return {...p,chance:clamp(p.chance+tbTier(b.learned['Learned Spook Sensitivity'],[-3,-1,0,4,7])+tbTier(b.learned['Arena Confidence'],[8,5,2,0,-4])+(b.naturalSpookiness-50)*.05,0,p.cap)};};
// Exact combined refusal percentages own the show roll; pole and elimination mechanics remain separate.
const TB_CHANCES=competitionOptionFinalChances;competitionOptionFinalChances=function(s,h,step,options){
 const rows=TB_CHANCES(s,h,step,options);if(!rrEnabled()||step?.stage!=='main_round'||s.discipline==='dressage'||String(step.phase).toLowerCase().includes('dressage'))return rows;
 const profile=fenceAvoidanceProfile(h,s);return rows.map(row=>{const total=row.successChance+row.computed.neutralChance,remaining=100-profile.chance,success=total?row.successChance/total*remaining:remaining;return {...row,successChance:success,computed:{...row.computed,neutralChance:remaining-success,failChance:profile.chance},learnedAvoidance:profile};});
};
const TB_CARD=createHorseCard;createHorseCard=function(h,...args){const node=TB_CARD(h,...args),p=document.createElement('p'),profile=fenceAvoidanceProfile(h);p.textContent='Learned Fence Avoidance: '+profile.score+'/100 — '+profile.label+'. Base risk '+Number(profile.base.toFixed(2))+'%; current rider risk '+Number(profile.chance.toFixed(2))+'% per jump. Refusal risk uses rider experience, Jump Confidence, Rider Trust and live Tension. Recovery actions use the current live score and require a genuine relevant experience.';node.appendChild(p);return node;};
function tbNarrativeFacts(h,s,event){
 const state=tbSession(h,s),b=rrHorse(h),attempts=state.events.filter(row=>row.type==='attempt'),successes=attempts.filter(row=>row.clean),last=attempts.at(-1),setback=attempts.findLast(row=>row.failed),prior=attempts.slice(0,-1),sessions=(b.completedBehaviorSessions||[]).filter(row=>row.positive&&row.rider===event.riderId&&row.scope===tbScope(s)),delta=event.changes;
 const improvement=Object.entries(b.learned).some(([stat,n])=>(/Avoidance|Sensitivity|Anticipation/.test(stat)?-1:1)*(n-state.initialBehavior[stat])>0);
 const facts={...event.flags,currentConfidence:true,collection:/collect|shoulder|half-pass|piaffe|passage/.test(event.exercise||''),noRiderError:!event.riderError,withinExperience:fenceAvoidanceOverLevel(s)===0,highAvoidance:b.learned['Learned Fence Avoidance']>50,priorError:prior.some(row=>row.riderError),minorError:event.riderError&&event.clean,successfulApproach:event.clean&&event.jumping,successfulRhythm:event.clean&&!event.riderError,successfulTiming:event.clean&&!event.riderError,secondSuccess:event.clean&&successes.length===2,lastSuccess:!!last?.clean,afterRefusal:state.refusals>0,noSuccessAfterSetback:!!setback&&!attempts.some(row=>row.clean&&state.events.indexOf(row)>state.events.indexOf(setback)),firstSuccessAfterSetback:event.clean&&b.behavior5Setbacks?.[tbScope(s)]?.successfulAttempts===1,multipleSessions:sessions.length>=2,multipleProfessionalSessions:event.riderLevel==='Professional'&&sessions.filter(row=>row.riderLevel==='Professional').length>=2,twoSessions:event.type==='session'&&sessions.length===2,threeSessions:event.type==='session'&&sessions.length>=3,noProgress:!improvement,confidenceGain:(delta['Jump Confidence']?.delta||0)>0,confidenceChanged:!!delta['Jump Confidence'],avoidanceDecrease:(delta['Learned Fence Avoidance']?.delta||0)<0,avoidanceUnchanged:!delta['Learned Fence Avoidance'],decline:Object.entries(delta).some(([stat,c])=>(/Avoidance|Sensitivity|Anticipation/.test(stat)?-1:1)*c.delta<0),priorProgress:state.events.some(row=>row!==event&&(row.changes['Learned Fence Avoidance']?.delta||0)<0),unresolved:!!setback&&!last?.clean,concern:!!s.rrConcern||!!event.flags?.medicalConcern,concernRaised:event.action==='assess'||event.action==='investigate',abusiveTrainer:event.trainerType==='Abusive',distress:(s.tension||0)>=80,configurationSelected:event.type==='action'&&['simplify','harder','switch','lower5','lower10','raise5','raise10'].includes(event.action),riderChanged:event.flags?.riderChanged===true||!!b.lastBehaviorRider&&b.lastBehaviorRider!==event.riderId,trainerChanged:event.type==='trainer change',technicalUnchanged:!event.technicalChanged,daysWithoutWork:!!b.lastBehaviorWorkDay&&rrDay(s)-b.lastBehaviorWorkDay>=3,restWithoutLearning:event.type==='session'&&attempts.length===0,historicalMisconduct:b.important.some(row=>row.kind==='Trainer conduct'&&row.trainerId===event.trainerId),multipleMisconduct:b.important.filter(row=>row.kind==='Trainer conduct'&&row.trainerId===event.trainerId).length>=2};
 // These require explicit records; generic failure or personality never fabricates them.
 for(const name of ['rhythmError','rhythmImproved','stabilityImproved','balancePassed','minorBalanceError','underChallenged','storylineProposal','preparationIssue','stagnation','potentialContext','difficultyDiscussion','higherPastPerformance','historicalDecline','conflictingAdvice','trainerMisconduct','trainerBlame','trainerDismissal','trainerPressure','trainerRefusedReview','trainerInappropriateComment','trainerIgnoredMedical'])facts[name]=event.flags?.[name]===true;
 return facts;
}
function tbNarrativeEligible(rule,h,s,event,facts=null){
 if(event.horseId!==h.id||event.riderId!==rrSettings().riderId||event.riderLevel!==rrSettings().level||event.trainerId!==tbTrainer(s).id)return false;
 if(rule.allowedEventTypes&&!rule.allowedEventTypes.includes(event.type))return false;
 if(rule.requiredStatDirection){const delta=event.changes?.[rule.requiredStatDirection.stat]?.delta||0;if(rule.requiredStatDirection.direction==='increase'?delta<=0:delta>=0)return false;}
 if(rule.allowedRiderLevels&&!rule.allowedRiderLevels.includes(event.riderLevel))return false;
 if(rule.allowedTrainerTypes&&!rule.allowedTrainerTypes.includes(event.trainerType))return false;
 facts ||= tbNarrativeFacts(h,s,event);return rule.requiredConditions.every(condition=>facts[condition]===true);
}
function tbNarrate(h,s,event){
 if(event.narrated)return event.observation;
 const facts=tbNarrativeFacts(h,s,event),candidates=TB5_NARRATIVES.filter(rule=>tbNarrativeEligible(rule,h,s,event,facts));
 const rule=candidates.length?candidates[Math.floor(tbRandom(h,s,event.key+'|narrative')*candidates.length)]:null;
 const changed=rule?.requiredStatDirection?event.changes[rule.requiredStatDirection.stat]:event.changes['Learned Fence Avoidance']||event.changes['Jump Confidence'];
 event.observation=(rule?.text||event.type+' recorded. '+event.consequence).replaceAll('[HORSE]',h.name).replaceAll('[VALUE]',String(rrHorse(h).learned['Jump Confidence'])).replaceAll('[OLD]',String(changed?.before??'')).replaceAll('[NEW]',String(changed?.after??''));
 event.narrativeId=rule?.id||null;event.narrated=true;s.rrNarrative=event.observation;
 s.log ||= [];s.log.push({kind:'Behavior observation',text:event.observation,eventId:event.key,elapsed:s.elapsed});return event.observation;
}
// The old prose-first layers are superseded; their quote catalogs remain readable for old saves.
rrScene=function(){return null;};rrTrainerEvent=function(){return null;};taNarratives=function(){return null;};rbNarrate=function(){return null;};
rrChangeTrainer=function(h,s,trait='Patient'){
 if(!rrEnabled()||!rrSettings().difficultStories)return false;
 const old=tbTrainer(s);rrSettings().trainer=trait;rrSettings().trainerId=null;const current=tbTrainer(s);
 const event=tbEvent(h,s,'trainer-change:'+current.id,'trainer change',{action:'change-trainer',previousTrainerId:old.id,flags:{trainerChanged:true,selectedAction:true}});
 if(event)tbCommit(h,s,event);s.rrTrainerConcern=false;return true;
};
function tbEnrichEvent(h,s,event){
 const state=tbSession(h,s),rows=state.events.filter(e=>e.type==='attempt'),prior=rows.filter(e=>e!==event),f=event.flags;
 const record=(s.log||[]).findLast(row=>row.resultIndex!=null&&row.exerciseId),incident=record?.incident;
 event.technicalChanged=!!record&&Object.keys(record.changes||{}).some(key=>!key.startsWith('Riding '));
 if(rrSettings().difficultStories&&['Negligent','Abusive'].includes(event.trainerType)&&(event.type==='attempt'&&event.failed||event.type==='recovery'||event.type==='action'&&event.flags.simplify)){
  const responses=['blame'];if(event.flags.refusal)responses.push('comment');if(event.flags.medicalConcern)responses.push('ignoreMedical');if((s.tension||0)>=80)responses.push('pressure');if(['assess','investigate'].includes(event.action))responses.push('dismiss');if(event.flags.simplify)responses.push('refuseReview');if(state.errors>=2)responses.push('conflictingAdvice');
  const response=responses[Math.floor(tbRandom(h,s,event.key+'|trainer-response')*responses.length)];event.trainerResponse=response;
  Object.assign(event.flags,{trainerBlame:response==='blame',trainerDismissal:response==='dismiss',trainerPressure:response==='pressure',trainerRefusedReview:response==='refuseReview',trainerInappropriateComment:response==='comment',trainerIgnoredMedical:response==='ignoreMedical',conflictingAdvice:response==='conflictingAdvice',trainerMisconduct:['pressure','ignoreMedical','dismiss'].includes(response)});
  s.rrTrainerConcern=true;s.rrConcern ||= {kind:'trainer concern',context:s.discipline};
  if(event.flags.trainerMisconduct){const b=rrHorse(h);b.important.push({key:event.key+'|trainer',kind:'Trainer conduct',trainerId:event.trainerId,riderId:event.riderId,day:event.day,hour:event.hour,response});b.important=b.important.slice(-100);}
 }
 f.collection=/collect|shoulder|half-pass|piaffe|passage/.test(event.exercise||'');
 f.minorError=event.clean&&event.riderError;
 f.balancePassed=!!incident&&incident.fallRolls===1&&incident.fell===false;
 f.balanceFailed=!!incident?.fell;
 f.balanceError=f.balanceFailed;
 f.stabilityImproved=Number(record?.changes?.['Riding Balance'])>0;
 f.rhythmError=event.event==='rhythm';f.rhythmImproved=event.clean&&prior.some(row=>row.exercise===event.exercise&&row.event==='rhythm');
 f.aidConflict=event.type==='communication';
 f.significantError=event.riderError&&event.failed&&event.resultIndex>=3;
 f.priorError=prior.some(row=>row.riderError);
 f.underChallenged=event.jumping&&Number(s.setup?.height)<t2height(h)-.2;
 f.storylineProposal=rrSettings().difficultStories&&event.failed;
 f.potentialContext=event.type==='session'&&Object.values(h.potential||{}).some(value=>Number.isFinite(value));
 f.higherPastPerformance=(h.showResults||[]).some(row=>row.discipline==='jumping'&&parseFloat(row.level)>parseFloat(s.level||s.setup?.height));
 f.historicalDecline=prior.filter(row=>Object.entries(row.changes).some(([stat,c])=>/Avoidance|Sensitivity|Anticipation/.test(stat)?c.delta>0:c.delta<0)).length>=2;
 f.stagnation=(rrHorse(h).completedBehaviorSessions||[]).slice(-3).length===3&&(rrHorse(h).completedBehaviorSessions||[]).slice(-3).every(row=>!row.positive);
}
const TB_REPORT=t2reportMarkup;t2reportMarkup=function(report){
 const html=TB_REPORT(report);if(!report.behavior)return html;
 return html+`<section class='box'><h4>Behavior during this session</h4><table><thead><tr><th>Statistic</th><th>Start</th><th>Finish</th></tr></thead><tbody>${RR_LEARNED.map(stat=>`<tr><td>${mgEscape(stat)}</td><td>${report.behavior.initial[stat]}</td><td>${report.behavior.final[stat]}</td></tr>`).join('')}</tbody></table><p>Avoidance recovery from pauses and reorganization: ${report.behavior.caps.nonJumpingAvoidanceReduction}/4. Jump Confidence earned from successful jumps: ${report.behavior.caps.successfulJumpConfidenceGain}/12.</p></section>`;
};
const TB_RENDER_TRAINING=renderTraining;renderTraining=function(){
 TB_RENDER_TRAINING();if(!rrEnabled())return;
 const s=t2state().session,h=s&&t2findHorse(s.horseId),panel=document.getElementById('training');if(!h||!panel)return;
 panel.querySelector('[data-behavior5-status]')?.remove();const status=document.createElement('p');status.dataset.behavior5Status='';status.setAttribute('role','status');const b=rrHorse(h).learned;
 status.textContent='Current behavior — Jump Confidence '+b['Jump Confidence']+' · Learned Fence Avoidance '+b['Learned Fence Avoidance']+' · Rider Trust in Aids '+b['Rider Trust in Aids'];panel.appendChild(status);
};
function tbQuickJumpRefusals(h,discipline,level,interaction={},jumpCount=12){
 if(!app.horses.some(horse=>horse.id===h.id))return 0;
 const b=rrHorse(h);b.quickRefusalPlans ||= {};const id=interaction?.behavior5RoundId||interaction?.poleRoundKey||'quick-round:'+(app.behaviorQuickRoundSequence=(app.behaviorQuickRoundSequence||0)+1);
 if(b.quickRefusalPlans[id])return b.quickRefusalPlans[id].refusals;
 const chance=fenceAvoidanceProfile(h,{discipline:'jumping',level,tension:interaction?.tension||0}).chance,seed=HorseHealth.hash(h.id+'|'+id),limit=discipline==='eventing'?3:2,attempts=[];let refusals=0;
 for(let jump=0;jump<jumpCount&&refusals<limit;jump++){const refused=HorseHealth.roll(seed,'jump:'+jump)*100<chance;attempts.push({jump,refused});if(refused)refusals++;}
 b.quickRefusalPlans[id]={id,chance,refusals,attempts};for(const key of Object.keys(b.quickRefusalPlans).slice(0,-100))delete b.quickRefusalPlans[key];return refusals;
}
const TB_QUICK_RESULT=calculateCompetitionResult;calculateCompetitionResult=function(h,d,level,interaction=null,entry=null){
 if(!rrEnabled()||interaction?.rpgSession||!['jumping','eventing'].includes(d))return TB_QUICK_RESULT(h,d,level,interaction,entry);
 const id=entry?.id||interaction?.behavior5RoundId||'quick-round:'+(app.behaviorQuickRoundSequence=(app.behaviorQuickRoundSequence||0)+1);
 return TB_QUICK_RESULT(h,d,level,{...(interaction||{}),behavior5RoundId:id,poleRoundKey:interaction?.poleRoundKey||id},entry);
};
function tbScope(s){return tbJump(s)?'jumping':tbMounted(s)?'flatwork':'groundwork';}
function tbCompetitionRefusalKind(h,s){
 const state=tbSession(h,s);state.refusalKinds ||= {};const key=String(s.stepIndex);
 if(!state.refusalKinds[key]){const roll=tbRandom(h,s,'show-refusal:'+key);state.refusalKinds[key]=roll<.65?'refusal':roll<.9?'runout':'abandoned-approach';}
 if(s.lastShowIncident)s.lastShowIncident.cause=state.refusalKinds[key]==='refusal'?'Refusal':state.refusalKinds[key]==='runout'?'Runout':'Abandoned approach';return state.refusalKinds[key];
}
function tbUsesPlayerRider(h){return app.horses.some(horse=>horse.id===h.id)||Object.values(app.lessonHorsesByBarn||{}).some(roster=>roster.some(horse=>horse.id===h.id));}
const TB_HYDRATE=hydrateFromSave;hydrateFromSave=function(data,...args){
 const result=TB_HYDRATE(data,...args);
 app.behaviorTrainers={};
 for(const [id,profile]of Object.entries(data.behaviorTrainers||{}))if(/^trainer-[0-9]+$/.test(id)&&profile&&profile.id===id&&['Patient','Fair','Strict','Ambitious','Inexperienced','Negligent','Abusive'].includes(profile.type))app.behaviorTrainers[id]={id,type:profile.type};
 app.behaviorTrainerSequence=Object.keys(app.behaviorTrainers).reduce((n,id)=>Math.max(n,Number(id.slice(8))),Number.isSafeInteger(data.behaviorTrainerSequence)?Math.max(0,data.behaviorTrainerSequence):0);
 app.behaviorQuickRoundSequence=Number.isSafeInteger(data.behaviorQuickRoundSequence)?Math.max(0,data.behaviorQuickRoundSequence):0;
 return result;
};
