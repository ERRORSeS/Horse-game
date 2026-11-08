/* Training Behavior 5.2: audit each genuine jump, truthful changes and detailed incident history. */
function getActualChanges(before={},after={}){
 return Object.keys(after).filter(stat=>Number.isFinite(before[stat])&&Number.isFinite(after[stat])&&Math.abs(after[stat]-before[stat])>.00001).map(stat=>({stat,delta:after[stat]-before[stat]}));
}
function tb52ChangeText(changes={}){
 const before={},after={};for(const [stat,row]of Object.entries(changes)){before[stat]=row.before;after[stat]=row.after;}
 return getActualChanges(before,after).map(({stat,delta})=>stat+' '+(delta>0?'+':'')+Number(delta.toFixed(5))).join('; ');
}
function tb52SilentStatText(text=''){
 return /no (?:permanent|behavioral|lasting|learned|additional (?:learned|behavioral))[^.!?]*(?:change|response|gain|improvement)|no measurable behavioral improvement|does not provide enough evidence of behavioral improvement|unchanged|all statistics remain|confidence remains at|shows no lasting|(?:Jump Confidence|Rider Trust(?: in Aids)?|(?:Learned )?Fence Avoidance)\s*[+−-]0(?:\.0+)?(?:\b|[.;])/i.test(text);
}
function tb52CleanText(text=''){
 return String(text).split(/(?<=[.!?])\s+|;\s*/).filter(part=>!tb52SilentStatText(part)).join(' ').trim();
}
function tb52LogEntries(rows=[]){return rows.map(row=>({...row,text:tb52CleanText(row.text)})).filter(row=>row.text);}
const TB52_OBSERVATIONS=t2visibleObservations;t2visibleObservations=function(s){return tb52LogEntries(TB52_OBSERVATIONS(s));};

function tb52JumpKey(s,show=false){return rrSessionId(s)+'|jump:'+(show?'show:'+s.stepIndex+(s.interactive7?.representations?.[s.stepIndex]?':retry:'+s.interactive7.representations[s.stepIndex]:''):(s.attempts||0)+1);}
function tb52JumpAlreadyResolved(h,s){return rrEnabled()&&tbJump(s)&&!!rrHorse(h).jumpAttempts52?.[tb52JumpKey(s)];}
function tb52SaveJump(h,s,profile,roll,show=false){
 const b=rrHorse(h),id=tb52JumpKey(s,show);b.jumpAttempts52 ||= {};
 if(b.jumpAttempts52[id])return b.jumpAttempts52[id];
 const attempt={id,horseId:h.id,riderId:rrSettings().riderId,sessionId:rrSessionId(s),attempt:show?s.stepIndex:(s.attempts||0)+1,exercise:s.exerciseId||s.level,height:Number(s.setup?.height??s.level),score:profile.score,chance:profile.chance,roll,refused:roll<profile.chance,day:rrDay(s),show};
 b.jumpAttempts52[id]=attempt;for(const key of Object.keys(b.jumpAttempts52).slice(0,-200))delete b.jumpAttempts52[key];return attempt;
}
function tb52JumpDecision(h,s,profile){const prior=rrHorse(h).jumpAttempts52?.[tb52JumpKey(s)];if(prior)return prior;return tb52SaveJump(h,s,profile,t2random(s)*100);}
function tb52ShowJumpDecision(h,s,step,chance){
 if(!rrEnabled()||step?.stage!=='main_round'||!tbJump(s))return null;
 const prior=rrHorse(h).jumpAttempts52?.[tb52JumpKey(s,true)];if(prior)return prior;return tb52SaveJump(h,s,{...fenceAvoidanceProfile(h,s),chance},s.interactive7?.started&&typeof c7Roll==='function'?c7Roll(s,s.stepIndex+':'+(s.interactive7.representations[s.stepIndex]||0)+':refusal')*100:Math.random()*100,true);
}
const TB52_ATTEMPT=t2attempt;t2attempt=function(h,s){
 const record=TB52_ATTEMPT(h,s);
 if(record?.jumpAttempt){record.jumpAttempt.resultIndex=record.resultIndex;record.jumpAttempt.outcome=record.event||record.result;record.jumpAttempt.incidentId=record.incident?.id||null;}
 return record;
};

function tb52Cause(incident,s){
 const kind=incident.kind||incident.sourceKind||'';
 if(incident.rotational)return 'Rotational incident';
 if(/refusal/i.test(kind))return 'Refusal';if(/runout/i.test(kind))return 'Run-out';
 if(kind==='bolt')return 'Bolt';if(/spook/i.test(kind))return 'Spook';if(/buck/i.test(kind))return 'Buck';
 if(kind==='slip')return 'Footing slip';if(/rear/i.test(kind))return 'Rearing';
 if(kind==='landing'||incident.seriousJump)return 'Jumping-related loss of balance';
 if(s.rrCurrentError)return 'Rider balance error';return incident.horseFell?'Horse fall':'Loss of balance';
}
function tb52FallSeverity(h,s,incident){
 if(!incident.fell)return null;if(incident.rotational)return 'Critical';
 const seriousHorseFall=incident.horseFell&&(incident.seriousJump||['bolt','severeSpook','strongBuck','repeatedBuck','highRear','majorDisruption'].includes(incident.kind)||incident.footing?.index>=3),weights=seriousHorseFall?[10,45,35,10]:[65,27,7,1];
 let roll=tbRandom(h,s,incident.id+'|fall-severity52')*100;return ['Minor','Moderate','Serious','Critical'][Math.max(0,weights.findIndex(weight=>(roll-=weight)<0))];
}
function tb52PrepareIncident(h,s,incident){
 if(incident.behaviorVersion==='5.2')return incident;
 incident.behaviorVersion='5.2';incident.horseId=h.id;incident.riderId=rrSettings().riderId;incident.trainerId=tbTrainer(s).id;incident.sessionId=rrSessionId(s);incident.hour=(s.createdHour??pastureCalendarHour())+(Number(s.elapsed)||0)/60;incident.day=Math.floor(incident.hour/24);incident.date=pastureDateLabel(incident.hour);incident.discipline=s.discipline;incident.context=tbScope(s);incident.exercise=s.exerciseId||s.steps?.[s.stepIndex]?.phase||s.level;
 incident.primaryCause=tb52Cause(incident,s);incident.triggerCause=tb52Cause({...incident,kind:incident.sourceKind||incident.kind,rotational:false},s);
 incident.fallType=incident.rotational?'Rotational fall':incident.horseFell?'Horse-and-rider fall':incident.fell?'Rider fall':'No fall';incident.fallSeverity=tb52FallSeverity(h,s,incident);incident.urgentAssessment=incident.fallSeverity==='Critical';
 const factors=[];if(incident.spookRelated&&incident.kind==='bolt')factors.push('Spook');if(incident.environmentRelated)factors.push('Environment');if(incident.footing?.index>0&&incident.kind==='slip')factors.push(incident.footing.classification+' footing');if((incident.effects?.tension?.before??s.tension??0)>=70)factors.push('High tension');if(incident.fallProfile?.multiplier>1)factors.push('Limited rider stability');if(s.rrCurrentError)factors.push('Rider communication error');incident.contributingFactors=factors;
 incident.confidenceChanges={};incident.sessionOutcome=incident.fell?(s.steps?'Round stopped after fall':'Mounted work stopped after fall'):'Attempt interrupted without a fall';
 return incident;
}
function tb52IncidentFacts(h,s,incident,event={}){
 const assessment=event.assessment||incident?.assessment,kind=incident?.kind||'',fall=!!incident?.fell,balancePassed=!!incident&&incident.fallRolls===1&&!fall;
 return {refusal:/refusal/i.test(kind),runout:kind==='runout',spook:!!incident?.spookRelated||/spook/i.test(kind),bolt:kind==='bolt',buck:/buck/i.test(kind),slip:kind==='slip',riderFall:fall,horseFall:!!incident?.horseFell,rotational:!!incident?.rotational,jumpHorseFall:!!incident?.horseFell&&incident.context==='jumping',destabilized:fall||(incident?.fallChance||0)>=30,balancePassed,continuedAlertness:!!incident&&(s.tension||0)>0,settled:event.type==='recovery'&&event.flags?.tensionDecrease===true,unstable:balancePassed&&incident.remainingInstability===true,interrupted:fall||!!s.recoveryRequired||s.mountedStopped,sessionEnded:fall&&(s.finished||s.eliminated),urgentAssessment:!!incident?.urgentAssessment,riderResponsiveObserved:assessment?.riderResponsiveObserved===true,riderAssessmentPending:assessment?.status==='pending'&&!assessment.riderReviewed,horseAssessmentInProgress:assessment?.horseAssessmentInProgress===true,veterinaryPending:!!assessment?.requiresVeterinary&&!assessment.veterinaryReviewed,medicalFinding:assessment?.medicalFinding===true,assessmentCompleteNoSignificantFinding:assessment?.status==='reviewed'&&assessment.veterinaryReviewed===true&&assessment.noSignificantFinding===true,restricted:assessment?.status==='pending'||!!tbMedical(h),incidentRecorded:!!incident?.id&&!!rrHorse(h).incidents52?.some(i=>i.id===incident.id)};
}
function tb52FallIntensity(incident){return incident?.fell&&['Minor','Moderate','Serious','Critical'].includes(incident.fallSeverity)?'Fall intensity: '+incident.fallSeverity:'';}
function tb52FallDescription(h,s,incident){
 if(incident.description52)return incident.description52;
 const facts=tb52IncidentFacts(h,s,incident),eligible=TB52_NARRATIVES.slice(0,24).filter(rule=>rule.requiredConditions.every(key=>facts[key]===true));
 const explicitFall=eligible.filter(rule=>rule.requiredConditions.some(key=>['riderFall','horseFall','jumpHorseFall','rotational'].includes(key))),pool=incident.fell&&explicitFall.length?explicitFall:eligible;
 const rule=pool[Math.floor(tbRandom(h,s,incident.id+'|fall-description52')*pool.length)];
 incident.description52=(rule?.text||((incident.horseFell?'The horse and rider fell':'The rider fell')+' after '+(incident.primaryCause||'the incident').toLowerCase()+'. The rider chooses whether to continue training or end the session.')).replaceAll('[HORSE]',h.name);incident.narrativeId52=rule?.id||null;
 return incident.description52;
}
const TB52_ASSESSMENT=tb51Assessment;tb51Assessment=function(h,s,incident){
 tb52PrepareIncident(h,s,incident);TB52_ASSESSMENT(h,s,incident);const assessment=h.trainingIncidentAssessment;
 assessment.requiresVeterinary=incident.horseFell||['Serious','Critical'].includes(incident.fallSeverity);assessment.fallSeverity=incident.fallSeverity;assessment.urgency=incident.urgentAssessment?'Urgent':'Ordinary';assessment.primaryCause=incident.primaryCause;incident.assessment=assessment;incident.assessmentStatus=assessment.status;
};
function tb52StoreIncident(h,s,incident){
 tb52PrepareIncident(h,s,incident);incident.context=tbScope(s);
 const event=s.behavior5?.events.find(e=>e.type==='incident'&&e.incident?.id===incident.id);incident.confidenceChanges=HorseHealth.copy(event?.changes||{});
 if(incident.fell){const b=rrHorse(h);b.incidents52 ||= [];if(!b.incidents52.some(row=>row.id===incident.id))b.incidents52.push(incident);b.incidents52=b.incidents52.slice(-100);}
}
const TB52_INCIDENT=t2xIncident;t2xIncident=function(h,s,kind,record,extra={}){
 const existed=!!record.incident,incident=TB52_INCIDENT(h,s,kind,record,extra);
 if(!incident)return incident;
 if(!existed&&incident.behaviorVersion!=='5.2'){
  tb52PrepareIncident(h,s,incident);if(incident.fell){s.mountedStopped=true;tb51Assessment(h,s,incident);record.text=(record.text||'')+' '+tb52FallDescription(h,s,incident);}
 }
 const intensity=tb52FallIntensity(incident);if(intensity&&!record.text?.includes(intensity))record.text=(record.text||'')+' '+intensity+'.';
 tb52StoreIncident(h,s,incident);if(!existed&&incident.fell&&incident.fallSeverity!=='Minor'&&!s.steps&&!s.finished&&!t2xAwaitingRemount(s))t2finish(h,s);return incident;
};
function tb52SyncAssessment(h){
 const pending=h.trainingIncidentAssessment;if(!pending)return;
 const sessions=[t2state().session,...(h.training2?.history||[])].filter(Boolean);
 for(const incident of [...(rrHorse(h).incidents52||[]),...sessions.flatMap(s=>s.incidents||[])])if(incident.id===pending.incidentId){incident.assessment=HorseHealth.copy(pending);incident.assessmentStatus=pending.status;}
}
const TB52_CLEAR=tb51ClearAssessment;tb51ClearAssessment=function(h){const result=TB52_CLEAR(h);tb52SyncAssessment(h);return result;};
function tb52RecordExamination(h,assessment,report){
 assessment.medicalFinding=!!(report.observed?.length||report.diagnoses?.length||report.restrictions?.length);assessment.noSignificantFinding=!assessment.medicalFinding&&!report.recommendedTests?.length;assessment.medicalReportId=report.id;assessment.horseAssessmentInProgress=false;
}
const TB52_ACK=tb51AcknowledgeRiderAssessment;tb51AcknowledgeRiderAssessment=function(h,id){
 const wasReviewed=h.trainingIncidentAssessment?.riderReviewed,result=TB52_ACK(h,id),assessment=h.trainingIncidentAssessment;
 if(result&&!wasReviewed){const s=t2state().session?.horseId===h.id?t2state().session:{id:'rider-review:'+id,discipline:assessment.context==='jumping'?'jumping':'flatwork',createdHour:pastureCalendarHour(),log:[]},event=tbEvent(h,s,'rider-review:'+id,'assessment',{flags:{riderAssessment:true},assessment:HorseHealth.copy(assessment)});if(event)tbCommit(h,s,event);}
 return result;
};
const TB52_NARRATE=tbNarrate;tbNarrate=function(h,s,event){
 if(event.narrated)return event.observation;
 const incident=event.incident||(event.assessment?rrHorse(h).incidents52?.find(i=>i.id===event.assessment.incidentId):null),facts=tb52IncidentFacts(h,s,incident,event);
 const eligible=TB52_NARRATIVES.filter(rule=>tbNarrativeEligible(rule,h,s,event,facts));
 if(!eligible.length)return TB52_NARRATE(h,s,event);
 const rule=eligible.find(r=>r.id===incident?.narrativeId52)||eligible[Math.floor(tbRandom(h,s,event.key+'|narrative52')*eligible.length)];
 event.observation=rule.text.replaceAll('[HORSE]',h.name);event.narrativeId=rule.id;event.narrated=true;s.rrNarrative=event.observation;s.log ||= [];
 if(!s.log.some(row=>row.incident?.id===incident?.id&&row.text?.includes(event.observation)))s.log.push({kind:'Behavior observation',text:event.observation,eventId:event.key,elapsed:s.elapsed});
 return event.observation;
};
const TB52_FINISH=t2finish;t2finish=function(h,s){
 const report=TB52_FINISH(h,s);if(!report)return report;
 for(const incident of s.incidents||[]){tb52StoreIncident(h,s,incident);if(incident.fell&&s.finished&&!incident.continuedAfterFall)incident.sessionOutcome='Session ended after fall';}
 report.incidents=HorseHealth.copy(s.incidents||[]);if(report.behavior)report.behavior.patchVersion='5.2';report.notes=tb52LogEntries((report.notes||[]).map(text=>({text}))).map(row=>row.text);
 // Old generic fall notes could name a refusal after a different primary incident.
 if(s.riderFell)report.notes=report.notes.filter(text=>!['PI10','RF14'].some(id=>text===t2xSay(h,id)));
 return report;
};
const TB52_REPORT=t2reportMarkup;t2reportMarkup=function(report){
 const view={...report,notes:tb52LogEntries((report.notes||[]).map(text=>({text}))).map(row=>row.text),progress:Object.fromEntries(Object.entries(report.progress||{}).filter(([,delta])=>Math.abs(delta)>.00001))};
 const html=TB52_REPORT(view),falls=(report.incidents||[]).filter(i=>i.fell&&i.fallSeverity);
 return html+(falls.length?'<section class="box"><h4>Fall incident details</h4>'+falls.map(i=>'<p>'+mgEscape(i.primaryCause)+' · '+mgEscape(i.fallType)+' · '+mgEscape(tb52FallIntensity(i))+' · '+mgEscape(i.assessment?.urgency||'Ordinary')+' assessment: '+mgEscape(i.assessmentStatus||'pending')+'</p><p>'+mgEscape(i.description52||'')+'</p>'+(tb52ChangeText(i.confidenceChanges)?'<p>'+mgEscape(tb52ChangeText(i.confidenceChanges))+'</p>':'')).join('')+'</section>':'');
};

function tb52HistoryEntry(event){return {...event,observation:[tb52CleanText(event.observation||event.kind),tb52FallIntensity(event.incident)].filter(Boolean).join(' '),cause:tb52CleanText(event.cause),consequence:event.changes?tb52ChangeText(event.changes):tb52CleanText(event.consequence)};}
const TB52_HISTORY=rbHistoryMarkup;rbHistoryMarkup=function(h){return TB52_HISTORY(h).replace(/<p>(.*?)<\/p>/g,(html,text)=>tb52SilentStatText(text)?'':html);};
rbDescribeChanges=function(h,s){return tb52ChangeText(rbEvidence(h,s).latest?.changes||{});};
