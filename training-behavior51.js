/* Engine 5.1 addendum: retained controls and event ledger, slower learning and incident-only risks. */
function tb51State(h,s){const state=tbSession(h,s);state.balance51 ||= {version:'5.1',ordinary:{},stimuli:{},recoveryCount:0};return state.balance51;}
function tb51Value(h,s,key,min,max){return Math.round((min+tbRandom(h,s,'51:'+key)*(max-min))*100)/100;}
function tb51EffectiveTrust(h,riderId=rrSettings().riderId){const b=rrHorse(h);return clamp(b.learned['Rider Trust in Aids']+(Number(b.riderTrustAdjustments?.[riderId])||0),0,100);}
function tb51RiderAdjustment(h,s,amount){const b=rrHorse(h),id=rrSettings().riderId;b.riderTrustAdjustments ||= {};b.riderTrustAdjustments[id]=clamp((Number(b.riderTrustAdjustments[id])||0)+amount,-12,12);const keys=Object.keys(b.riderTrustAdjustments);for(const key of keys.slice(0,-32))if(key!==id)delete b.riderTrustAdjustments[key];}
const TB51_BASE_RISK=getBaseAvoidanceRisk;
getBaseAvoidanceRisk=function(raw){const n=clamp(Number(raw)||0,0,100);if(n<=2)return 4;if(n<=10)return 15+((n-3)/7)*10;return TB51_BASE_RISK(n);};
const TB51_REFUSAL=fenceAvoidanceProfile;
fenceAvoidanceProfile=function(h,s={}){const p=TB51_REFUSAL(h,s);p.parts.trust=tbTier(tb51EffectiveTrust(h),[6,4,2,0,-3]);p.chance=clamp(Object.values(p.parts).reduce((sum,n)=>sum+n,0),1,95);p.modifier=p.chance;p.effectiveTrust=tb51EffectiveTrust(h);return p;};
const TB51_APPLY=tbApply;
tbApply=function(h,s,event,stat,delta,cap=null,limit=Infinity){
 if(!rrEnabled())return TB51_APPLY(h,s,event,stat,delta,cap,limit);
 const state=tb51State(h,s),b=rrHorse(h).learned;
 if(event.type==='incident'||event.type==='trust-session'||event.type==='reward'||event.type==='welfare')return TB51_APPLY(h,s,event,stat,delta);
 if(event.type==='session'){
  if(stat==='Rider Trust in Aids'&&delta>0)return 0;
  return TB51_APPLY(h,s,event,stat,delta,cap,limit);
 }
 if(event.type==='recovery'){
  const actual=TB51_APPLY(h,s,event,stat,delta);
  if(stat==='Learned Fence Avoidance'&&actual<0)s.behavior5.learningCaps.nonJumpingAvoidanceReduction+=-actual;
  return actual;
 }
 if(['attempt','communication'].includes(event.type)){
  const incident=(s.incidents||[]).find(i=>i.attempt===event.attempt),owner=incident&&s.behavior5.events.find(e=>e.type==='incident'&&e.incident?.id===incident.id);
  if(owner?.changes[stat])return 0;
  if(event.clean&&event.jumping&&stat==='Jump Confidence'&&delta>0){
   if(event.flags?.punished||fenceAvoidancePunishedAttempt(h,s,event.attempt))return 0;
   state.cleanJumpAwards ||= {};
   if(state.cleanJumpAwarded&&event.cleanJumpStreak<2)return 0;
   const actual=TB51_APPLY(h,s,event,stat,delta);state.cleanJumpAwards[event.attempt]={gain:actual,planned:delta,riderId:event.riderId};state.cleanJumpAwarded=true;state.cleanJumpBudget=(state.cleanJumpBudget||0)+delta;s.behavior5.learningCaps.successfulJumpConfidenceGain+=actual;return actual;
  }
  if(stat==='Rider Trust in Aids'&&delta>0)return 0;
  const good=/Avoidance|Sensitivity|Anticipation/.test(stat)?delta<0:delta>0,key=stat+':'+(good?'positive':'negative');
  if(state.ordinary[key])return 0;
  state.ordinary[key]=true;
  let range=good?(stat==='Handling Confidence'?[.25,.75]:stat==='Training Anticipation'?[.25,1]:event.resultIndex===1?[.25,.5]:[.5,1]):stat==='Training Anticipation'?[.5,1.5]:event.severity==='Significant'?[1.5,3]:event.resultIndex===3?[.25,.5]:[.5,1.5];
  const amount=tb51Value(h,s,key,...range),actual=TB51_APPLY(h,s,event,stat,Math.sign(delta)*amount);
  if(stat==='Rider Trust in Aids'&&actual<0){tb51RiderAdjustment(h,s,-tb51Value(h,s,'negative-rider-trust',.25,.5));event.effectiveTrust=tb51EffectiveTrust(h);}
  return actual;
 }
 return TB51_APPLY(h,s,event,stat,delta,cap,limit);
};
const TB51_FINISH=tbFinish;
tbFinish=function(h,s){
 const state=tbSession(h,s),wasFinished=state.finished;TB51_FINISH(h,s);if(state.finished)delete state.pendingFinish;if(wasFinished||!state.finished||!rrEnabled())return;
 const work=state.events.filter(e=>e.type==='attempt'&&e.riderId===rrSettings().riderId),positive=work.some(e=>e.clean&&e.mounted&&e.flags.clearCommunication)&&fenceAvoidanceSafeAids(h,s),bad=state.severeCommunication||s.rrWelfareIncident||s.riderFell||s.hadRiderFall||s.horseFell||s.recoveryRequired||(s.tension||0)>=65||tbMedical(h);
 if(positive&&!bad){
  const event=tbEvent(h,s,'trust-session-51','trust-session',{flags:{sessionComplete:true,clearCommunication:true}});
  if(event){const ranges={Beginner:[0,.25],Novice:[.25,.5],Intermediate:[.5,.75],Advanced:[3,3],Professional:[3,3]},amount=tb51Value(h,s,'rider-trust-session',...ranges[rrSettings().level]);tbApply(h,s,event,'Rider Trust in Aids',amount);const abilities=rrSettings().abilities,compatibleLowStability=abilities['Leg Stability']<20&&!taEquippedAid(h,'spurs',s)||abilities['Hand Stability']<20&&eqSetup(h).bit!=='Pelham Bit';if(compatibleLowStability){event.flags.compatibleAids=true;tbApply(h,s,event,'Rider Trust in Aids',1);}tb51RiderAdjustment(h,s,tb51Value(h,s,'rider-specific-positive',.25,.5));event.riderAdjustment=rrHorse(h).riderTrustAdjustments[rrSettings().riderId];event.effectiveTrust=tb51EffectiveTrust(h);state.learningCaps.sessionTrustGain=event.changes['Rider Trust in Aids']?.delta||0;tbCommit(h,s,event);}
 }
 if(s.report&&(s.report.behavior||state.events.length)){s.report.behavior ||= {initial:{...state.initialBehavior},final:{...rrHorse(h).learned},caps:{...state.learningCaps},eventIds:state.events.map(e=>e.key)};s.report.behavior.version='5.1';s.report.behavior.final={...rrHorse(h).learned};s.report.behavior.caps={...state.learningCaps};s.report.behavior.cleanJumpBudget=state.balance51?.cleanJumpBudget||0;s.report.behavior.effectiveTrust=tb51EffectiveTrust(h);s.report.behavior.riderId=rrSettings().riderId;}
};
function tb51Unresolved(h,s){const state=tbSession(h,s),last=state.events.findLast(e=>e.type==='attempt');return !!last&&last.failed&&!state.events.some(e=>e.type==='attempt'&&e.clean&&e.attempt>last.attempt);}
const TB51_RECOVERY=tbRecovery;
function tb51Footing(s={}){
 const facility=t2facilities().find(f=>f.id===s.facilityId),location=s.location||facility?.location||'Unspecified',weather=s.weather||t2weather(),explicit=s.footingCondition||facility?.footingCondition||facility?.footing;
 const names=['Normal','Low concern','Moderate concern','High concern','Severe'],descriptions=['Dry and maintained','Slightly damp','Wet or soft','Very wet / significant snow','Ice / severe traction concern'];let index=0;
 if(typeof explicit==='string'){const value=explicit.toLowerCase();index=/ice|severe|frozen/.test(value)?4:/snow|very wet|high|poor/.test(value)?3:/soft|wet|moderate/.test(value)?2:/damp|low/.test(value)?1:0;}
 else if(explicit&&typeof explicit==='object'&&Number.isFinite(explicit.riskLevel))index=clamp(Math.floor(explicit.riskLevel),0,4);
 else if(location==='Outdoor'){const text=weather.type||'';index=/Ice|Frost|Freezing/i.test(text)?4:/Heavy Rain|Heavy Snow|Storm|Snow/i.test(text)?3:/Rain/i.test(text)?2:weather.precipitation?1:0;}
 return {location,weather:weather.type||'Unknown',wind:location==='Outdoor'?(weather.wind||0):0,index,classification:names[index],description:descriptions[index],slipChance:[.5,6,8,13,21][index],explicit:!!explicit};
}
const TB51_WEATHER_RESTRICTION=t2weatherRestriction;t2weatherRestriction=function(){return '';};
const TB51_WEATHER_MESSAGES=t2weatherMessages;t2weatherMessages=function(h,location,weather){
 const footing=tb51Footing({location,weather,facilityId:t2state().session?.facilityId||t2state().draft?.facilityId}),messages=[];
 if(location==='Indoor')messages.push('Indoor shelter limits exposure; actual arena footing still applies.');
 if(footing.index>=2)messages.push('Warning: Current weather may make the arena footing unsuitable for normal ridden work. Continuing may increase the risk of slipping or an interrupted session.');
 if(location==='Outdoor'&&(weather.wind||0)>=25)messages.push('Strong wind can create relevant environmental stimuli.');
 if(weather.temperature>=34)messages.push('Heat can increase fatigue; monitor the current horse and exercise.');
 messages.push('Arena: '+location+' · Weather: '+weather.type+' · Footing: '+footing.description+' · Risk: '+footing.classification);return messages;
};
const TB51_START=t2start;t2start=function(h,draft,quick=false){
 tb51RemoveClearance(h);
 const facility=t2facilities().find(f=>f.id===draft.facilityId),footing=tb51Footing({facilityId:draft.facilityId,location:facility?.location,weather:t2weather()}),key=[footing.weather,footing.classification,draft.facilityId,draft.discipline].join('|');
 if(footing.location==='Outdoor'&&(footing.index>=2||footing.wind>=25)&&draft.weatherAcknowledged!==key){
  const warning='Warning: Current weather may make the arena footing unsuitable for normal ridden work. Continuing may increase the risk of slipping or an interrupted session.\nWeather: '+footing.weather+'\nArena: '+footing.location+'\nFooting: '+footing.description+' ('+footing.classification+')\nActivity: '+draft.discipline+'\nContinue with the selected activity?';
  if(typeof confirm!=='function'||!confirm(warning))return {ok:false,message:'Weather warning reviewed: training was not started. Indoor and outdoor arenas remain selectable.'};
  draft.weatherAcknowledged=key;
 }
 const result=TB51_START(h,draft,quick);if(result.ok){const s=result.session;s.weatherAcknowledged=draft.weatherAcknowledged||null;tb51State(h,s).footing=footing;if(s.weatherAcknowledged){const e=tbEvent(h,s,'weather-confirmed','weather',{action:'start',flags:{outdoorConfirmed:true}});if(e){e.footing=footing;tbCommit(h,s,e);}}}return result;
};
function tb51Stimulus(s){
 const footing=tb51Footing(s),explicit=s.environmentEvent;
 if(explicit?.id)return {id:String(explicit.id),source:explicit.source||'recorded environmental event',intensity:explicit.intensity||'Noticeable',footing};
 if(footing.wind>=25)return {id:'gust:'+s.attempts,source:'wind gust',intensity:footing.wind>=40?'Significant':'Noticeable',footing};
 if(s.traffic&&footing.location==='Outdoor')return {id:'traffic:'+s.attempts,source:'nearby traffic',intensity:'Noticeable',footing};
 if(s.occupancy==='Busy')return {id:'arena-movement:'+s.attempts,source:'nearby arena movement',intensity:'Minor',footing};
 return null;
}
function tb51SpookProfile(h,s,stimulus){const b=rrHorse(h),base=tbTier(b.naturalSpookiness,[9,14,19,29,40]),learned=tbTier(b.learned['Learned Spook Sensitivity'],[-2,0,3,6,10]),arena=tbTier(b.learned['Arena Confidence'],[6,4,2,0,-3]),intensity=({Minor:-2,Noticeable:0,Significant:5})[stimulus?.intensity]??0;return {base,learned,arena,intensity,chance:stimulus?clamp(base+learned+arena+intensity,0,50):0};}
function tb51SpookSeverity(h){const adjustment=tbTier(rrHorse(h).temperamentIntensity,[-8,-4,0,5,10]);return [30/85*100-adjustment,30/85*100,25/85*100+adjustment];}
function tb51BoltProfile(h,s){const b=rrHorse(h),t=s.tension||0,trust=tb51EffectiveTrust(h),base=tbTier(b.temperamentIntensity,[5,9,14,24,39]),tension=t<40?-2:t<70?0:t<85?3:6,sensitivity=b.learned['Learned Spook Sensitivity']<20?-1:b.learned['Learned Spook Sensitivity']<60?0:b.learned['Learned Spook Sensitivity']<80?2:4,trustModifier=trust<20?3:trust<40?2:trust<80?0:-2;return {base,tension,sensitivity,trust:trustModifier,chance:clamp(base+tension+sensitivity+trustModifier,0,30)};}
function tb51Stability(){const a=rrSettings().abilities,value=.6*a['Seat Stability']+.4*a.Balance,multiplier=value<20?1.8:value<40?1.5:value<60?1.2:value<80?1:value<90?.75:.55;return {value,multiplier};}
function tb51IsShow(s){return !!s.liveShowId||Array.isArray(s.steps)&&s.steps.length>0;}
function tb51FallProfile(h,s,kind){
 const stability=tb51Stability(),base=({mildSpook:0,moderateSpook:3,severeSpook:13,bolt:13,refusal:15,abruptRefusal:15,runout:15,smallBuck:3,strongBuck:17,repeatedBuck:17,briefRear:17,highRear:22,stumble:3,landing:15,slip:3,majorDisruption:22})[kind]||0;
 return {base,stability:stability.value,multiplier:stability.multiplier,chance:tb51IsShow(s)?showFallChance(base*stability.multiplier):Math.min(35,base*stability.multiplier)};
}
const TB51_OLD_FALL=t2xFallChance;t2xFallChance=function(h,s,kind){return rrEnabled()?tb51FallProfile(h,s,kind).chance:TB51_OLD_FALL(h,s,kind);};
function tb51HorseFallProfile(s,kind,extra={}){
 const footing=extra.footing||tb51Footing(s),jumping=tbJump(s),seriousJump=jumping&&(extra.seriousJump||kind==='landing'||kind==='abruptRefusal'&&(s.tension||0)>=70),major=['bolt','severeSpook','strongBuck','repeatedBuck','highRear','majorDisruption'].includes(kind);
 const chance=footing.index===4&&(major||kind==='slip'||seriousJump)?6:seriousJump?5:major?4:kind==='slip'?3:0;
 const crossCountry=s.discipline==='eventing'&&(/cross|xc/i.test(s.steps?.[s.stepIndex]?.phase||s.exerciseId||''));return {chance:tb51IsShow(s)?showFallChance(chance):chance,seriousJump,rotationalChance:seriousJump?(crossCountry?25:15):0,footing};
}
function tb51Temporary(s,focusLoss,tensionGain){const before=s.tension||0;s.tension=clamp(before+tensionGain,0,100);s.temporary ||= {};const previous=s.temporary.Focus||0;s.temporary.Focus=clamp(previous-focusLoss/10,-5,5);return {tension:{before,after:s.tension},focusLoss:(previous-s.temporary.Focus)*10};}
function tb51Assessment(h,s,incident){
 const old=h.trainingIncidentAssessment;
 h.trainingIncidentAssessment={incidentId:incident.id,status:'recorded',clearanceRequired:false,horseId:h.id,riderId:rrSettings().riderId,day:csDay(),requiresVeterinary:incident.horseFell,vetVisitCount:(h.vetVisits||[]).length,requiresRider:false,veterinaryReviewed:false,riderReviewed:false,rotational:incident.rotational,context:tbScope(s),kind:incident.kind,environmentRelated:incident.environmentRelated};
 s.assessmentRequired=false;delete s.rrConcern;
 h.vetNotes ||= [];h.vetNotes.unshift({date:pastureDateLabel(pastureCalendarHour()),text:'Training incident '+incident.id+': '+(incident.rotational?'rotational horse-and-rider fall':incident.horseFell?'horse-and-rider fall':'rider fall')+'. The incident is recorded; no riding clearance is required.'});
 if(old?.status==='pending')h.trainingIncidentAssessment.previousIncidentId=old.incidentId;
}
function tb51RemoveClearance(h){
 const p=h?.trainingIncidentAssessment;if(!p||p.status!=='pending'&&p.clearanceRequired===false&&p.requiresRider===false)return;
 if(p.status==='pending')p.status='recorded';p.clearanceRequired=false;p.requiresRider=false;
 if(typeof tb52SyncAssessment==='function')tb52SyncAssessment(h);
}
function tb51ResumeAfterFall(h,s){
 if(!t2xAwaitingRemount(s)||!canRideUnderSaddle(h))return false;
 const incident=(s.incidents||[]).findLast(i=>i.fell);if(!incident)return false;
 tb51RemoveClearance(h);s.hadRiderFall=true;s.hadHorseFall ||= !!s.horseFell;
 s.riderFell=false;s.horseFell=false;s.mountedStopped=false;s.recoveryRequired=false;s.controlLost=false;s.demandingStopped=false;s.assessmentRequired=false;
 s.phase=s.fallResumePhase==='warmup'?'warmup':'main';delete s.safetyStop;delete s.rrConcern;
 incident.continuedAfterFall=true;incident.sessionOutcome='Rider chose to continue training after fall';
 s.log.push({kind:'Rider choice',text:'The rider chooses to get back on and continue training after the fall.',incidentId:incident.id,elapsed:s.elapsed});
 return true;
}
function tb51AcknowledgeRiderAssessment(h,id){const pending=h.trainingIncidentAssessment;if(!pending||pending.incidentId!==id)return false;pending.riderReviewed=true;tb51ClearAssessment(h);return true;}
function tb51ClearAssessment(h){const p=h.trainingIncidentAssessment;if(p?.riderReviewed&&(!p.requiresVeterinary||p.veterinaryReviewed)&&!tbMedical(h)){p.status='reviewed';p.reviewedDay=csDay();}return p?.status==='reviewed';}
function tb51ApplyIncident(h,s,incident,record){
 const event=tbEvent(h,s,'incident51:'+incident.id,'incident',{failed:true,jumping:tbJump(s),mounted:tbMounted(s),incident,flags:{incidentRecorded:true}});if(!event)return;
 const jump=tbJump(s),spook=incident.spookRelated,environment=incident.environmentRelated,error=!!s.rrCurrentError,range=(stat,a,b,direction=-1)=>tbApply(h,s,event,stat,direction*tbRange(h,s,incident.id+'|'+stat,a,b));
 if(incident.rotational){range('Jump Confidence',8,15);range('Learned Fence Avoidance',6,12,1);}
 else if(incident.horseFell){if(jump){range('Jump Confidence',4,8);range('Learned Fence Avoidance',3,7,1);}else if(tbMounted(s))range('Flatwork Confidence',3,6);}
 else if(incident.fell){if(jump){range('Jump Confidence',2,5);range('Learned Fence Avoidance',1,4,1);}else if(tbMounted(s))range('Flatwork Confidence',2,4);}
 else if(incident.kind==='bolt'){range(jump?'Jump Confidence':'Flatwork Confidence',1,3);}
 if((incident.fell||incident.kind==='bolt')&&error)range('Rider Trust in Aids',1,incident.fell?3:2);
 if(spook&&(incident.severity===2||incident.kind==='bolt'||incident.fell))range('Learned Spook Sensitivity',1,3,1);
 if(environment&&(incident.fell||incident.severity===2))range('Arena Confidence',1,3);
 if(!tbMounted(s)&&spook&&incident.severity===2)range('Handling Confidence',1,2);
 if(Object.keys(event.changes).length){const b=rrHorse(h);b.behavior5Setbacks ||= {};b.behavior5Setbacks[tbScope(s)]={key:event.key,day:event.day,successfulAttempts:0};b.behaviorSetbacks[event.context]={key:event.key,day:event.day,sessionId:event.sessionId};}
 event.tension=incident.effects?.tension;tbCommit(h,s,event);
}
const TB51_OLD_INCIDENT=t2xIncident;
t2xIncident=function(h,s,kind,record,extra={}){
 if(!rrEnabled())return TB51_OLD_INCIDENT(h,s,kind,record,extra);
 if(record.incident)return record.incident;
 const sourceKind=kind,spookRelated=/spook/i.test(kind)||extra.spookRelated===true,environmentRelated=spookRelated||kind==='slip'||!!extra.footing,footing=extra.footing||tb51Footing(s),mounted=tbMounted(s);
 const incident={id:extra.incidentId||rrSessionId(s)+'|incident51:'+(s.attempts??s.stepIndex??0),attempt:s.attempts??s.stepIndex??0,kind,sourceKind,spookRelated,environmentRelated,footing,severity:extra.severity??(/severe/i.test(kind)?2:/moderate/i.test(kind)?1:0),fallRolls:0,horseFallRolls:0,escalationRolls:0,...extra};
 if(mounted&&kind==='severeSpook'){
  const profile=tb51BoltProfile(h,s);incident.escalationRolls=1;incident.boltProfile=profile;incident.escalationRoll=t2random(s)*100;
  if(incident.escalationRoll<profile.chance)incident.kind='bolt';
 }
 kind=incident.kind;const temporary=kind==='mildSpook'?[1,tbRange(h,s,incident.id+'|tension',1,2)]:kind==='moderateSpook'?[2,tbRange(h,s,incident.id+'|tension',3,5)]:kind==='severeSpook'?[tbRange(h,s,incident.id+'|focus',2,4),tbRange(h,s,incident.id+'|tension',3,5)]:kind==='bolt'?[4,tbRange(h,s,incident.id+'|tension',8,12)]:kind==='slip'?[1,tbRange(h,s,incident.id+'|tension',1,3)]:['refusal','abruptRefusal','runout'].includes(kind)?[0,5]:[0,0];
 incident.effects=tb51Temporary(s,...temporary);
 const horse=tb51HorseFallProfile(s,kind,{...extra,footing});incident.horseFallChance=mounted?horse.chance:0;incident.seriousJump=horse.seriousJump;incident.rotationalChance=horse.rotationalChance;
 if(incident.horseFallChance>0){incident.horseFallRolls=1;incident.horseFallRoll=t2random(s)*100;incident.horseFell=incident.horseFallRoll<incident.horseFallChance;}
 if(incident.horseFell){incident.fell=true;if(horse.seriousJump){incident.rotationalRolls=1;incident.rotational= t2random(s)*100<horse.rotationalChance;}}
 else if(mounted){const profile=tb51FallProfile(h,s,kind);incident.fallProfile=profile;incident.fallChance=profile.chance;if(profile.chance>0){incident.fallRolls=1;incident.fallRoll=t2random(s)*100;incident.fell=incident.fallRoll<profile.chance;}}
 incident.fell=!!incident.fell;incident.horseFell=!!incident.horseFell;incident.rotational=!!incident.rotational;if(typeof tb52PrepareIncident==='function')tb52PrepareIncident(h,s,incident);record.incident=incident;s.incidents ||= [];s.incidents.push(incident);
 if(incident.fell){s.fallResumePhase=s.phase;s.riderFell=true;s.horseFell=incident.horseFell;s.mountedStopped=true;s.phase='cooldown';s.safetyStop=incident.rotational?'Rotational fall':incident.horseFell?'Horse-and-rider fall':'Rider fall';record.resultIndex=6;record.result='Safety stop';s.lastResult=6;tb51Assessment(h,s,incident);}
 else if(['bolt','severeSpook','strongBuck','repeatedBuck','briefRear','highRear'].includes(kind)){s.recoveryRequired=true;s.controlLost=kind==='bolt';}
 if(['briefRear','highRear'].includes(kind))s.mountedStopped=true;
 record.text=(record.text||'')+' '+(incident.fell&&typeof tb52FallDescription==='function'?tb52FallDescription(h,s,incident):incident.rotational?'A rotational fall occurred. Training is interrupted for the rider’s decision.':incident.horseFell?'The horse and rider fell. Training is interrupted for the rider’s decision.':incident.fell?'The rider fell. Choose whether to resume riding or end training.':kind==='slip'?'The horse slipped and regained its footing.':kind==='bolt'?'A distinct bolt interrupted the exercise; the rider remained mounted.':kind==='mildSpook'?'A brief startle interrupted attention without a fall.':'The incident was resolved without a fall.');
 tb51ApplyIncident(h,s,incident,record);if(incident.rotational&&!s.steps&&!t2xAwaitingRemount(s))t2finish(h,s);return incident;
};
const TB51_OLD_MAJOR=t2xBehaviorProfiles;t2xBehaviorProfiles=function(h,s,e){const p=TB51_OLD_MAJOR(h,s,e);return rrEnabled()?{...p,bolt:0}:p;};
function tb51InterruptedAttempt(h,s,e,kind,extra={}){
 s.attempts++;s.elapsed+=e.duration;h.fatigue=clamp((h.fatigue||0)+e.intensity,0,100);s.repetitions[e.id]=(s.repetitions[e.id]||0)+1;
 const record={exercise:e.name,exerciseId:e.id,result:'Partial execution',resultIndex:2,event:kind,text:'The movement was interrupted by a recorded '+(kind==='slip'?'footing slip':'environmental reaction')+'.',changes:{},elapsed:s.elapsed,setup:{...s.setup},probabilities:{}};
 s.log.push(record);t2xIncident(h,s,kind,record,extra);if(record.incident.kind==='bolt'){record.event='bolt';record.result='Exercise abandoned';record.resultIndex=6;}
 if(record.incident.kind==='severeSpook'){record.result='Exercise abandoned';record.resultIndex=6;}
 s.lastResult=record.resultIndex;s.lastExerciseId=e.id;if(s.riderFell&&!s.steps&&!t2xAwaitingRemount(s))t2finish(h,s);return record;
}
const TB51_BEFORE=t2xBeforeAttempt;t2xBeforeAttempt=function(h,s,e){
 tb51RemoveClearance(h);
 const existing=TB51_BEFORE(h,s,e);if(existing||!rrEnabled())return existing;
 const state=tb51State(h,s),stimulus=tb51Stimulus(s);
 if(stimulus&&!state.stimuli[stimulus.id]){
  const profile=tb51SpookProfile(h,s,stimulus),roll=t2random(s)*100;state.stimuli[stimulus.id]={profile,roll,occurred:roll<profile.chance};
  if(roll<profile.chance){const severity=t2xPickSeverity(tb51SpookSeverity(h),s),kind=['mildSpook','moderateSpook','severeSpook'][severity];return tb51InterruptedAttempt(h,s,e,kind,{stimulus,severity,spookProfile:profile,spookRoll:roll});}
 }
 if(!['standing','tying','mount','equipment'].includes(e.id)){
  const footing=tb51Footing(s),roll=t2random(s)*100;if(roll<footing.slipChance)return tb51InterruptedAttempt(h,s,e,'slip',{footing,slipRoll:roll});
 }
 return null;
};
// Jumping walk/circle actions always recover live values; reassessment still requires a genuine concern.
tbRecovery=function(h,s,action){
 if(!rrEnabled())return TB51_RECOVERY(h,s,action);
 const state=tb51State(h,s),last=tbSession(h,s).events.findLast(e=>e.type==='attempt'),before=s.tension||0,walking=s.phase==='main'&&tbJump(s)&&['break','circle-away'].includes(action);
 if(s.finished||s.mountedStopped||(!walking&&(!s.attempts||!last)))return null;
 const jumping=walking||fenceAvoidanceJumpWorked(s,true),refusal=last?.flags?.refusal;
 if(['assess','investigate'].includes(action)&&(!jumping||!refusal))return null;
 const unresolved=tb51Unresolved(h,s),newConcern=unresolved&&state.evaluatedConcernEpoch!==s.attempts,meaningful=before>0||newConcern,key='recovery51:'+(state.recoveryCount=(state.recoveryCount||0)+1);
 const event=tbEvent(h,s,key,'recovery',{action,flags:{selectedAction:true,break:['break','circle-away'].includes(action),reassessment:['assess','investigate'].includes(action)}});if(!event)return null;
 const roll=tbRandom(h,s,key+'|'+action),row=action==='assess'?(roll<.45?[2,3,5]:roll<.8?[1,1,3]:[0,0,1]):action==='investigate'?(roll<.4?[2,0,0]:roll<.8?[1,0,0]:[0,0,0]):action==='reorganize'?(roll<.3?[2,3,5]:roll<.75?[1,1,3]:[0,0,1]):(roll<.3?[2,4,6]:roll<.7?[1,2,4]:[0,1,2]);
 s.tension=Math.max(0,before-tbRange(h,s,key+'|tension',row[1],row[2]));event.tension={before,after:s.tension};
 const suitableRecovery=(meaningful||walking)&&!tbMedical(h)&&(walking||s.tension<before||newConcern||['assess','investigate'].includes(action));
 const recoveryPoints=['assess','investigate','break','circle-away'].includes(action)?Math.max(1,row[0]):row[0];
 if(jumping&&suitableRecovery)tbApply(h,s,event,'Learned Fence Avoidance',-recoveryPoints);
 if(['break','circle-away'].includes(action)&&suitableRecovery&&(walking||row[0]>0)){
  const confidence=jumping?'Jump Confidence':last.mounted?'Flatwork Confidence':'Handling Confidence';
  tbApply(h,s,event,confidence,tb51Value(h,s,key+'|confidence',.5,1));
 }
 state.evaluatedConcernEpoch=s.attempts;event.recoveryWasMeaningful=meaningful;
 if(s.tension<=10){s.recoveryRequired=false;s.controlLost=false;if(before>=10)s.recoveryReady=true;}
 event.flags.tensionDecrease=s.tension<before;event.flags.avoidanceDecrease=(event.changes['Learned Fence Avoidance']?.delta||0)<0;event.flags.reassessmentImproved=event.flags.reassessment&&event.flags.avoidanceDecrease;event.flags.noReassessmentImprovement=event.flags.reassessment&&!event.flags.avoidanceDecrease;
 const recent=(s.incidents||[]).at(-1);if(recent?.spookRelated||recent?.kind==='bolt'){event.relatedIncident=recent;if(s.tension<before&&(s.temporary?.Focus||0)<0){const previous=s.temporary.Focus;s.temporary.Focus=Math.min(0,previous+.1);event.temporaryFocusGain=(s.temporary.Focus-previous)*10;}}
 return tbCommit(h,s,event);
};
const TB51_BREAK=t2break;t2break=function(h,s,minutes=2){
 if(!rrEnabled()||s.phase!=='main'||!s.attempts&&!tbJump(s))return TB51_BREAK(h,s,minutes);
 if(s.finished||s.mountedStopped||s.riderFell)return 0;
 const before=s.tension||0,event=tbRecovery(h,s,s.behavior5?.pendingAction==='circle-away'?'circle-away':'break');if(!event)return 0;
 s.elapsed+=clamp(Number(minutes)||2,2,10);s.gait='Walk';s.speedPressure=0;return before-(s.tension||0);
};
const TB51_FOLLOWUP=rrFollowup;rrFollowup=function(h,s,action){
 if(rrEnabled()&&action==='assess'&&h.trainingIncidentAssessment?.status==='pending'){
  tb51AcknowledgeRiderAssessment(h,h.trainingIncidentAssessment.incidentId);s.rrAssessment=true;s.log ||= [];s.log.push({kind:'Assessment',text:'The rider assessment has been acknowledged. Any required veterinary review and existing medical restrictions still apply.',elapsed:s.elapsed});return true;
 }
 if(rrEnabled()&&['assess','investigate'].includes(action)&&s.rrConcern&&!s.finished){const event=tbRecovery(h,s,action);if(!event)return false;if((event.changes['Learned Fence Avoidance']?.delta||0)<0)s.rrConcern=null;return true;}
 return TB51_FOLLOWUP(h,s,action);
};
const TB51_EXAM=HorseHealth.examine;HorseHealth.examine=function(state,h,type,day,eventId){
 const result=TB51_EXAM.apply(this,arguments),pending=h.trainingIncidentAssessment;
 if(result.ok&&!result.reused&&['pending','recorded'].includes(pending?.status)&&pending.requiresVeterinary&&['general','soundness','lameness','emergency','followup'].includes(type)&&result.report?.horseId===h.id&&(h.vetVisits||[]).length>(pending.vetVisitCount||0)){
  pending.veterinaryReviewed=true;pending.veterinaryReportId=result.report.id;if(typeof tb52RecordExamination==='function')tb52RecordExamination(h,pending,result.report);
  tb51ClearAssessment(h);
  const s={id:'assessment:'+pending.incidentId,discipline:pending.context==='jumping'?'jumping':'flatwork',createdHour:pastureCalendarHour()},event=tbEvent(h,s,'veterinary:'+result.report.id,'assessment',{flags:{vetExam:true,assessmentPending:pending.status==='pending'},assessment:{...pending}});if(event)tbCommit(h,s,event);
 }
 return result;
};
const TB51_RIDE=canRideUnderSaddle;canRideUnderSaddle=function(h){tb51RemoveClearance(h);return TB51_RIDE(h);};
const TB51_PROBABILITY=t2probability;t2probability=function(h,event,base,c={},primary,secondary,s){
 const p=TB51_PROBABILITY(h,event,base,c,primary,secondary,s);if(!rrEnabled()||!s||!tbMounted(s)||!['technical','aid','cooperation'].includes(event))return p;
 const general=tbTier(rrHorse(h).learned['Rider Trust in Aids'],[6,4,2,0,-3]),effective=tbTier(tb51EffectiveTrust(h),[6,4,2,0,-3]);return {...p,chance:clamp(p.chance+effective-general,0,p.cap),effectiveTrust:tb51EffectiveTrust(h)};
};
const TB51_WEATHER_PP=t2weatherPP;t2weatherPP=function(w,location,h){const p=TB51_WEATHER_PP(w,location,h);return location==='Indoor'?{...p,wind:0}:p;};
const TB51_REPORT=t2reportMarkup;t2reportMarkup=function(report){
 const html=TB51_REPORT(report);if(report.behavior?.version!=='5.1')return html;
 return html.replace(/Avoidance recovery from pauses and reorganization: [^<]+<\/p>/,'Avoidance recovery from genuine events: '+report.behavior.caps.nonJumpingAvoidanceReduction+' (no fixed session cap). Clean-jump confidence earned: '+report.behavior.caps.successfulJumpConfidenceGain+'/'+report.behavior.cleanJumpBudget+'. Effective Rider Trust: '+Number(report.behavior.effectiveTrust?.toFixed(2))+'/100.</p>')+(report.incidents?.length?'<section class="box"><h4>Incident assessment</h4><p>Horse falls: '+report.incidents.filter(i=>i.horseFell).length+' · Rotational falls: '+report.incidents.filter(i=>i.rotational).length+'. Fall details remain recorded. No separate riding clearance is required.</p></section>':'');
};
const TB51_RENDER=renderTraining;renderTraining=function(){
 TB51_RENDER();const s=t2state().session,h=s&&t2findHorse(s.horseId),node=document.getElementById('training')?.querySelector('[data-behavior5-status]');
 if(rrEnabled()&&h&&node)node.textContent+=' · Effective Trust for '+(typeof rrCurrentRiderName==='function'?rrCurrentRiderName():rrSettings().riderId)+': '+tb51EffectiveTrust(h).toFixed(1)+' · Footing: '+tb51Footing(s).classification;
 if(h&&t2xAwaitingRemount(s)){
  const box=document.createElement('section');box.className='box';box.setAttribute('data-fall-choice','');
  const text=document.createElement('p');text.textContent='The rider fell. Choose whether to get back on or use End Session.';box.appendChild(text);
  const button=document.createElement('button');button.type='button';button.setAttribute('data-training-remount','');button.textContent='Get back on and continue riding';button.disabled=!canRideUnderSaddle(h);
  button.onclick=()=>{if(tb51ResumeAfterFall(h,s)){saveGame(false);renderTraining();}};box.appendChild(button);document.getElementById('training').prepend(box);
 }

};
const TB51_WARMUP=t2warmup;t2warmup=function(h,s,action,minutes=2){
 const result=TB51_WARMUP(h,s,action,minutes);if(!rrEnabled()||!result.ok||!tbMounted(s)||s.mountedStopped)return result;
 const footing=tb51Footing(s),roll=t2random(s)*100;if(roll<footing.slipChance){const count=(tb51State(h,s).warmupCount=(tb51State(h,s).warmupCount||0)+1),record={kind:'Warm-up incident',text:'A footing slip interrupted the warm-up.',changes:{}};s.log.push(record);t2xIncident(h,s,'slip',record,{footing,slipRoll:roll,incidentId:rrSessionId(s)+'|warmup-slip:'+count});if(s.riderFell&&!t2xAwaitingRemount(s))t2finish(h,s);}
 return result;
};
function tb51ShowIncident(h,s,cause,actualEventText=''){
 const prior=(s.incidents||[]).find(i=>i.attempt===s.stepIndex);if(prior)return prior;
 const phase=s.steps?.[s.stepIndex]?.phase||'',seriousJump=tbJump(s)&&(/landing|major.*balance|serious.*jump/i.test(actualEventText)||s.seriousJumpDisruption===true),kind=/runout/i.test(cause)?'runout':/spook/i.test(cause)?'severeSpook':/buck/i.test(cause)?'strongBuck':/rear/i.test(cause)?'highRear':/bolt/i.test(cause)?'bolt':seriousJump?'landing':'refusal';
 const record={exerciseId:s.exerciseId||(/dressage/i.test(phase)?'large-circle':'vertical'),resultIndex:5,text:'A destabilizing show incident was resolved.',changes:{}};
 const incident=t2xIncident(h,s,kind,record,{seriousJump});s.lastShowIncident={...(s.lastShowIncident||{}),cause,incidentId:incident.id,horseFell:incident.horseFell,rotational:incident.rotational};
 return incident;
}
const TB51_FACTS=tbNarrativeFacts;tbNarrativeFacts=function(h,s,event){
 const facts=TB51_FACTS(h,s,event),incident=event.incident||event.relatedIncident,footing=incident?.footing||event.footing||tb51Footing(s),assessment=event.assessment||h.trainingIncidentAssessment;
 const spook=!!incident?.spookRelated,bolt=incident?.kind==='bolt',slip=incident?.kind==='slip',riderFall=!!incident?.fell,horseFall=!!incident?.horseFell,changes=event.changes||{},loss=stat=>(changes[stat]?.delta||0)<0;
 return {...facts,audibleStimulus:/noise|sound|bang|thunder/i.test(incident?.stimulus?.source||''),arenaMovement:/movement|traffic|horses/i.test(incident?.stimulus?.source||''),tensionIncrease:(incident?.effects?.tension?.after||0)>(incident?.effects?.tension?.before||0),completedCalmerExercise:event.type==='attempt'&&event.clean&&event.flags.tensionDecrease===true,spook,bolt,slip,riderFall,horseFall,rotational:!!incident?.rotational,environmentalEvent:!!incident?.stimulus,mildSpook:spook&&incident.severity===0,noticeableSpook:spook&&incident.severity===1,significantSpook:spook&&incident.severity===2,focusLoss:(incident?.effects?.focusLoss||0)>0,sustainedTension:(s.tension||0)>=50,recovery:event.type==='recovery'&&event.flags.tensionDecrease,focusRecovered:(event.temporaryFocusGain||0)>0,balancePassed:(incident?.fallRolls||0)>0&&!riderFall,balanceDifficult:riderFall||(incident?.fallProfile?.chance||0)>=30,contextMemory:!!incident?.stimulus&&tbSession(h,s).events.filter(e=>e.incident?.stimulus?.source===incident.stimulus.source).length>1,unusuallyIntense:spook&&rrHorse(h).temperamentIntensity<20&&incident.severity===2,highSpookiness:rrHorse(h).naturalSpookiness>=60,intenseTemperament:rrHorse(h).temperamentIntensity>=60,placidTemperament:rrHorse(h).temperamentIntensity<20,previousHighTension:(incident?.effects?.tension?.before||0)>=70,lowStability:(incident?.fallProfile?.stability??100)<40,lowStabilityModifier:(incident?.fallProfile?.multiplier||0)>1,expertRider:['Advanced','Professional'].includes(event.riderLevel),destabilization:!!incident&&(incident.fallChance||0)>0,stabilityError:riderFall||!!s.rrCurrentError,refusalLinked:['refusal','abruptRefusal','runout'].includes(incident?.sourceKind),interrupted:!!incident&&(riderFall||['bolt','severeSpook','slip'].includes(incident.kind)),horseStayedUpright:!!incident&&!horseFall,significantFooting:slip&&footing.index>=2,seriousJump:!!incident&&tbJump(s)&&(incident.seriousJump===true||incident.rotationalChance>0),footingContributed:!!incident&&(slip||incident.environmentRelated&&footing.index>=2),environmentRelated:!!incident?.environmentRelated,jumpConfidenceLoss:loss('Jump Confidence'),flatConfidenceLoss:loss('Flatwork Confidence'),arenaConfidenceLoss:loss('Arena Confidence'),avoidanceIncrease:(changes['Learned Fence Avoidance']?.delta||0)>0,sensitivityIncrease:(changes['Learned Spook Sensitivity']?.delta||0)>0,noLearnedChange:Object.keys(changes).length===0,assessmentPending:assessment?.status==='pending',restricted:assessment?.status==='pending',vetExam:event.flags.vetExam===true,incidentRecorded:!!incident||event.flags.incidentRecorded===true,technicalPreserved:!!incident&&!event.technicalChanged,outdoor:footing.location==='Outdoor',indoor:footing.location==='Indoor',heavyRain:/Heavy Rain/i.test(footing.weather),snow:/Snow/i.test(footing.weather),wetFooting:footing.index>=2,poorFooting:footing.index>=2,suitableFooting:footing.index<2,elevatedSlipRisk:footing.index>0,warningActive:footing.index>=2||footing.wind>=25,outdoorConfirmed:event.flags.outdoorConfirmed===true,selectedIndoor:event.type==='action'&&event.action==='select-indoor',weatherChanged:event.weatherChanged===true,arenaUsable:true,selectedResume:event.type==='action'&&event.flags.repeat===true,selectedBreak:event.type==='recovery'&&event.flags.break===true};
};
function tb51FootingComment(rule){return /^TB51-18-(0[1-4]|0[78]|1[56])$/.test(rule.id);}
const TB51_NARRATE=tbNarrate;tbNarrate=function(h,s,event){
 if(event.narrated)return event.observation;
 const facts=tbNarrativeFacts(h,s,event),candidates=TB51_NARRATIVES.filter(rule=>(!tb51FootingComment(rule)||!tb51State(h,s).footingCommentId)&&(typeof tb52SilentStatText!=='function'||!tb52SilentStatText(rule.text))&&tbNarrativeEligible(rule,h,s,event,facts));
 if(!candidates.length)return TB51_NARRATE(h,s,event);
 const rule=candidates[Math.floor(tbRandom(h,s,event.key+'|narrative51')*candidates.length)];event.observation=rule.text.replaceAll('[HORSE]',h.name);event.narrativeId=rule.id;if(tb51FootingComment(rule))tb51State(h,s).footingCommentId=rule.id;event.narrated=true;s.rrNarrative=event.observation;s.log ||= [];s.log.push({kind:'Behavior observation',text:event.observation,eventId:event.key,elapsed:s.elapsed});return event.observation;
};

const TB51_AID_LEARNED=taLearned;taLearned=function(h,context){return rrEnabled()&&context==='aid'?taConfidence(tb51EffectiveTrust(h),40,6):TB51_AID_LEARNED(h,context);};
const TB51_CONTEXT=t2context;t2context=function(h,e,s,setup){const c=TB51_CONTEXT(h,e,s,setup);if(s.location==='Indoor')c.wind=false;return c;};
