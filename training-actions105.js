/* Abstract rider choices use the existing learning, equipment, incident and medical engines. */
const RIDER105_CATEGORIES=['Spurs','Crop','Mouth'];
const RIDER105_SEVERITIES=['Mild','Forceful','Excessive'];
const RIDER105_REACTIONS=[
 {id:'quick',weight:10,text:['quickens briefly, then returns toward the previous tempo','responds abruptly for a few strides before the initial urgency fades'],focus:1,balance:.1,tension:2},
 {id:'unchanged',weight:12,text:['continues at much the same pace with no obvious outward response','maintains the previous head carriage and tempo'],focus:0,balance:0,tension:0},
 {id:'ears',weight:10,text:['pins its ears briefly while continuing the movement','turns its ears back and carries on without improved accuracy'],focus:1,balance:0,tension:2},
 {id:'tail',weight:9,text:['swishes its tail and becomes less relaxed','swishes its tail repeatedly while its tempo becomes less regular'],focus:1,balance:.1,tension:3},
 {id:'head',weight:7,text:['raises its head and loses the previous outline','lifts its head and becomes less steady through the movement'],focus:2,balance:.2,tension:3},
 {id:'rhythm',weight:8,text:['takes uneven steps and loses the established rhythm','continues with a less regular tempo through the exercise'],focus:1,balance:.3,tension:2},
 {id:'hesitate',weight:7,text:['hesitates before responding to the next request','slows its response and pauses before continuing'],focus:2,balance:.1,tension:2},
 {id:'drift',weight:5,text:['drifts away from the intended line','loses straightness and moves off the planned track'],focus:2,balance:.2,tension:2},
 {id:'disengage',weight:5,text:['becomes less consistent in its responses to ordinary aids','responds more slowly and loses attention to the exercise'],focus:3,balance:.1,tension:3},
 {id:'stiffen',weight:7,text:['stiffens through the movement and loses relaxation','continues with a more rigid outline and less fluid steps'],focus:1,balance:.2,tension:3},
 {id:'contact',weight:5,text:['becomes less steady in the contact and raises its head','avoids a consistent connection and loses some harmony'],focus:2,balance:.3,tension:3},
 {id:'look',weight:6,text:['looks toward activity beyond the exercise','becomes more alert to the surroundings and glances away'],focus:3,balance:.1,tension:2},
 {id:'rush',weight:5,text:['rushes forward with quicker, less balanced steps','moves with greater urgency while the rhythm becomes hurried'],focus:2,balance:.3,tension:4},
 {id:'canter',weight:4,gait:'Canter',text:['loses an even canter rhythm through the turn','continues cantering with less consistent balance'],focus:1,balance:.3,tension:2},
 {id:'collection',weight:4,collection:true,text:['loses some collection and precision','finds it harder to maintain the previous balance in the technical movement'],focus:1,balance:.3,tension:3},
 {id:'stop',weight:3,text:['halts and interrupts the current movement','stops moving forward and pauses the exercise'],focus:3,balance:.2,tension:4},
 {id:'tense',weight:6,text:['continues the exercise with visibly increased tension','completes the movement with less relaxation and a less consistent response'],focus:2,balance:.2,tension:4},
 {id:'withdraw',weight:4,text:['lowers its activity and becomes slower to engage','shows less forward response without a dramatic outward reaction'],focus:2,balance:.1,tension:2},
 {id:'buck',weight:1.2,incident:'smallBuck',text:['bucks and interrupts the rhythm of the exercise','responds with a brief buck, disrupting the current movement'],focus:3,balance:.3,tension:5},
 {id:'rear',weight:.6,incident:'briefRear',text:['rears and interrupts the requested movement','responds with a brief rear, bringing the exercise to a pause'],focus:3,balance:.3,tension:5}
];
function rider105State(s){return s.riderActions105 ||= {version:1,sequence:0,events:[],open:false,category:'Spurs',severity:'Mild',page:0};}
function rider105Show(s){return !!s.liveShowId||Array.isArray(s.steps);}
function rider105Equipment(h,s,category){
 if(!RIDER105_CATEGORIES.includes(category))return 'Select Spurs, Crop or Mouth.';
 const setup=eqSetup(h);
 if(category==='Mouth'){
  if(!mgType(setup.bit)||mgType(setup.bit).slot!=='bit'||['Neck Rope','Hackamore','None'].includes(setup.bridle))return 'No bitted contact is equipped. Mouth is unavailable with this bitless or unbitted configuration.';
  if(app.settings.tackOwnership){const item=mgOwned(h.equipmentRefs?.bit);if(!item||item.assignedHorseId!==h.id||item.assignedSlot!=='bit'||item.condition<=0)return 'Equip an available bit before selecting Mouth.';}
  return '';
 }
 const slot=category==='Crop'?'crop':'spurs';
 if(app.settings.tackOwnership)return taEquippedAid(h,slot,s)?'':'Equip an available '+category.toLowerCase()+' item for this horse first.';
 return mgType(setup[slot])?.slot===slot?'':'Equip '+category.toLowerCase()+' for this horse first.';
}
function rider105Restriction(h,s){
 if(s.finished)return 'This session has finished.';
 if(h.deceased||h.retiredForever||h.retiredToBreeding||!canRideUnderSaddle(h))return 'Ridden actions are unavailable for this horse.';
 if(!tbMounted(s))return 'These rider actions are unavailable during groundwork or lunging.';
 if(s.mountedStopped||s.riderFell||s.horseFell||s.recoveryRequired||s.controlLost||s.safetyStop)return 'The exercise is interrupted. Use the existing assessment, recovery or remount controls.';
 if(h.trainingIncidentAssessment?.status==='pending'||tbMedical(h))return 'A recorded health or safety concern needs assessment before ridden actions can continue.';
 if((s.tension||0)>=90)return 'The horse is seriously unsettled. Regroup or change activity before continuing.';
 return '';
}
function rider105Profile(h,s,severity){
 const b=rrHorse(h),a=t2horse(h).attributes,person=mgPersonality(h),experience=clamp(Number(h.age)||3,3,20),confidence=tbJump(s)?b.learned['Jump Confidence']:b.learned['Flatwork Confidence'];
 const values=[clamp((s.difficulty||0)*15+30,0,100),b.learned['Training Anticipation'],b.temperamentIntensity,b.naturalSpookiness,(a['Sensitivity to Aids']??5)*10,100-(a.Responsiveness??5)*10,100-(a.Patience??5)*10,100-t2attribute(h,'Focus',s)*10,100-(a.Willingness??5)*10,100-b.learned['Rider Trust in Aids'],100-confidence,100-b.learned['Handling Confidence'],b.learned['Learned Spook Sensitivity'],Number(h.fatigue)||0,s.tension||0];
 const recent=rider105State(s).events.slice(-8).filter(e=>e.status==='Applied').length;
 return clamp(values.reduce((n,v)=>n+v,0)/values.length+({Sensitive:8,'Hot-Blooded':8,Spooky:7,Stubborn:4,'Bomb-Proof':-7,'Easy-Going':-5}[person]||0)+(h.mood==='Distress'?10:0)-Math.min(4,(experience-3)/3)+recent*.5+RIDER105_SEVERITIES.indexOf(severity)*4,0,100);
}
function rider105Reaction(h,s,severity,key){
 const score=rider105Profile(h,s,severity),e=t2exercise(s.exerciseId),collection=/collect|shoulder|half-pass|piaffe|passage/.test(s.exerciseId||'');
 const rows=RIDER105_REACTIONS.filter(r=>(!r.gait||s.gait===r.gait)&&(!r.collection||collection)&&!(r.id==='contact'&&!mgType(eqSetup(h).bit)));
 const weights=rows.map(r=>r.weight);
 // Personality shifts the odds within a shared pool; every eligible reaction remains possible.
 for(let i=0;i<rows.length;i++)weights[i]*=rows[i].incident?(.5+score/30):['unchanged','quick','ears'].includes(rows[i].id)?(1.5-score/120):(.7+score/100);
 let roll=tbRandom(h,s,key+'|reaction')*weights.reduce((n,w)=>n+w,0);
 return rows[weights.findIndex(w=>(roll-=w)<0)]||rows.at(-1);
}
function rider105Narrative(row){
 if(row.status!=='Applied')return 'Selected '+row.category+' — '+row.severity+'. Action unavailable: '+row.reason+' No punitive action was simulated.';
 const action=row.category+' — '+row.severity,prefixes=['The rider selects '+action+'.','During '+row.exerciseName+', the rider chooses '+action+'.','The rider continues the session by selecting '+action+'.'];
 if(row.previousRelated)prefixes.push('The rider repeats '+row.category+', this time recorded as '+row.severity+'.','After an earlier '+row.category+' selection, the rider chooses '+action+' again.');
 const memory=row.previousReaction?(row.previousReaction===row.reaction?' The same visible response recurs; this is recorded as a separate event.':' The visible response differs from the previous recorded rider action.') : '';
 return prefixes[row.wording%prefixes.length]+' '+row.horseName+' '+row.reactionText+'. '+row.qualityText+memory+' '+row.followup;
}

function rider105Resolve(h,s,category,severity){
 if(!h||!s||rider105Show(s))return {ok:false,message:'Select an active training session.'};
 s.log ||= [];const state=rider105State(s),sequence=++state.sequence,key='rider105:'+sequence;
 const row={id:rrSessionId(s)+'|'+key,sequence,category,severity,horseId:h.id,horseName:h.name,sessionId:rrSessionId(s),riderId:rrSettings().riderId,hour:s.createdHour+(s.elapsed||0)/60,elapsed:s.elapsed||0,exerciseName:t2exercise(s.exerciseId)?.name||s.discipline,previousReaction:state.events.findLast(e=>e.status==='Applied')?.reaction,previousRelated:state.events.filter(e=>e.category===category&&e.status==='Applied').length,changes:{},technicalGain:0};
 state.events.push(row);state.page=0;
 const reason=!RIDER105_SEVERITIES.includes(severity)?'Select a valid severity.':rider105Restriction(h,s)||rider105Equipment(h,s,category);
 if(reason){row.status='Unavailable';row.reason=reason;row.narrative=rider105Narrative(row);s.log.push({kind:'Rider action unavailable',text:row.narrative,elapsed:s.elapsed,riderAction105:row.id});return {ok:false,message:reason,row};}
 row.status='Applied';const before={tension:s.tension||0,focus:t2attribute(h,'Focus',s),balance:t2attribute(h,'Balance',s),responsiveness:t2attribute(h,'Responsiveness',s)},reaction=rider105Reaction(h,s,severity,key),level=RIDER105_SEVERITIES.indexOf(severity)+1;
 const event=tbEvent(h,s,key,'welfare',{action:'punish',category,severity,failed:true,jumping:tbJump(s),mounted:true,flags:{misconduct:true,punished:true,selectedAction:true}});
 s.rrWelfareIncident=true;s.rrWelfareSequence=(s.rrWelfareSequence||0)+1;s.rrAssessment=true;
 tb51Temporary(s,reaction.focus, reaction.tension+level);
 s.temporary ||= {};s.temporary.Balance=clamp((s.temporary.Balance||0)-reaction.balance,-3,5);
 if(['hesitate','disengage','withdraw'].includes(reaction.id))s.temporary.Responsiveness=clamp((s.temporary.Responsiveness||0)-.1,-3,5);
 const learned=rrHorse(h).learned;
 tbApply(h,s,event,'Rider Trust in Aids',-level);
 tbApply(h,s,event,tbJump(s)?'Jump Confidence':'Flatwork Confidence',-(.25+.25*level));
 if(tbJump(s))tbApply(h,s,event,'Learned Fence Avoidance',.25*level);
 if(reaction.id==='look')tbApply(h,s,event,'Learned Spook Sensitivity',.1*level);
 if(category==='Mouth')tbApply(h,s,event,'Collection Confidence',-.2*level);
 const behavior=tbSession(h,s);behavior.punishedAttempts ||= {};behavior.punishedAttempts[s.attempts||0]=true;behavior.severeCommunication=true;
 // Revoke genuine clean-jump/reward learning on this attempt once, rather than granting compliance XP.
 const balance=tb51State(h,s),award=balance.cleanJumpAwards?.[s.attempts||0];
 if(award&&!award.revoked){tbApply(h,s,event,'Jump Confidence',-award.gain);award.revoked=true;behavior.learningCaps.successfulJumpConfidenceGain=Math.max(0,behavior.learningCaps.successfulJumpConfidenceGain-award.gain);balance.cleanJumpBudget=Math.max(0,(balance.cleanJumpBudget||0)-award.planned);}
 balance.cleanJumpAwarded=Object.values(balance.cleanJumpAwards||{}).some(a=>!a.revoked);
 for(const reward of behavior.events.filter(e=>e.type==='reward'&&e.attempt===(s.attempts||0)&&!e.rewardRevoked)){tbApply(h,s,event,'Jump Confidence',-Math.max(0,reward.changes['Jump Confidence']?.delta||0));reward.rewardRevoked=true;}
 tbCommit(h,s,event);row.changes=HorseHealth.copy(event.changes);
 row.reaction=reaction.id;row.wording=Math.floor(tbRandom(h,s,key+'|wording')*10000);row.reactionText=reaction.text[row.wording%reaction.text.length];row.temporaryCompliance=reaction.id==='quick';
 row.qualityText=reaction.balance>0?'Balance and rhythm support are reduced; the action earns no technical training progress.':reaction.focus>0?'Attention to the exercise is reduced; the action earns no technical training progress.':'No improvement in exercise quality or technical training is recorded.';
 row.followup='The session remains open. Calmer work, a simpler exercise or regrouping is available.';
 if(reaction.incident){const record={kind:'Rider-action incident',text:h.name+' '+row.reactionText+'.',changes:{},elapsed:s.elapsed};s.log.push(record);const incident=t2xIncident(h,s,reaction.incident,record,{incidentId:row.id+'|incident',riderAction105:row.id});row.incidentId=incident?.id;row.incident=incident?{kind:incident.kind,fell:!!incident.fell,horseFell:!!incident.horseFell,fallRolls:incident.fallRolls||0}:null;row.followup=incident?.fell?'The resolved fall is recorded. Existing assessment and remount restrictions apply.':s.recoveryRequired||s.mountedStopped?'The exercise is interrupted. Existing recovery and assessment controls remain available.':'The defensive incident is recorded; the rider can regroup before another exercise.';}
 // Only an actual resolved, rare clinical event creates a condition in the existing medical system.
 row.welfare='Behaviour changes recorded; no new medical condition was resolved.';
 if(level>1&&['Spurs','Mouth'].includes(category)&&tbRandom(h,s,key+'|medical')<.005*level){const diagnosis=category==='Mouth'?'oral':'rub',id=h.id+'|rider105|'+rrSessionId(s)+'|'+diagnosis;csEnsure(h);const c=HorseHealth.add(h,diagnosis,csDay(),{id,cause:'Recorded equipment-related rider action',suspected:true,severity:'minor'});row.conditionId=c.id;row.welfare='A discomfort concern was recorded for veterinary assessment; diagnosis remains unconfirmed.';h.playerObservations.push({day:csDay(),conditionId:c.id,context:'Rider Actions & Horse Welfare',text:category==='Mouth'?'Sensitivity to bitted contact was observed. Veterinary assessment is recommended.':'Equipment-contact irritation was observed. Veterinary assessment is recommended.',strength:'Unconfirmed concern'});csSync(h);}
 row.effects={tension:{before:before.tension,after:s.tension||0},focus:{before:before.focus,after:t2attribute(h,'Focus',s)},balance:{before:before.balance,after:t2attribute(h,'Balance',s)},responsiveness:{before:before.responsiveness,after:t2attribute(h,'Responsiveness',s)}};
 row.qualityText=row.effects.balance.after<row.effects.balance.before?'Balance and rhythm support are reduced; the action earns no technical training progress.':row.effects.focus.after<row.effects.focus.before?'Attention to the exercise is reduced; the action earns no technical training progress.':'No additional change in current exercise conditions or technical progress is recorded.';
 row.narrative=rider105Narrative(row);s.log.push({kind:'Rider Actions & Horse Welfare',text:row.narrative,elapsed:s.elapsed,riderAction105:row.id});
 return {ok:true,row,message:row.narrative};
}
function rider105Regroup(h,s){
 const state=rider105State(s),row={id:rrSessionId(s)+'|rider105:'+ ++state.sequence,sequence:state.sequence,category:'Regroup / Release Pressure',horseId:h.id,horseName:h.name,sessionId:rrSessionId(s),hour:s.createdHour+(s.elapsed||0)/60,status:'Recovery',changes:{}};state.events.push(row);state.page=0;
 if(s.finished){row.status='Unavailable';row.reason='This session has finished.';row.narrative='Regroup unavailable: '+row.reason;return row;}
 const before=s.tension||0,focus=s.temporary?.Focus||0,balance=s.temporary?.Balance||0,effectiveFocus=t2attribute(h,'Focus',s),effectiveBalance=t2attribute(h,'Balance',s);
 // Settling is not a cure or an automatic refund of learned trust or confidence.
 s.tension=Math.max(0,before-3);s.temporary ||= {};s.temporary.Focus=focus<0?Math.min(0,focus+.1):focus;s.temporary.Balance=balance<0?Math.min(0,balance+.05):balance;
 if(s.tension<=10&&!s.mountedStopped&&!s.riderFell&&!tbMedical(h)){s.recoveryRequired=false;s.controlLost=false;}
 row.effects={tension:{before,after:s.tension},focus:{before:effectiveFocus,after:t2attribute(h,'Focus',s)},balance:{before:effectiveBalance,after:t2attribute(h,'Balance',s)}};
 row.narrative=s.tension<before?h.name+' is given time to regroup. Tension eases and some temporary focus and balance return; previous learned changes and any medical restrictions remain recorded.':h.name+' is allowed to pause. No further tension reduction or learned training gain is recorded.';
 s.log.push({kind:'Regroup / Release Pressure',text:row.narrative,elapsed:s.elapsed,riderAction105:row.id});return row;
}
function rider105Rows(events,page=0){const size=10,start=Math.max(0,events.length-(page+1)*size),rows=events.slice(start,Math.max(0,events.length-page*size));return rows.map(row=>'<p><strong>#'+row.sequence+' · '+csEscape(row.category)+(row.severity?' — '+csEscape(row.severity):'')+'</strong> · '+csEscape(pastureDateLabel(row.hour))+'</p><p>'+csEscape(row.narrative||'Action resolved.')+'</p>'+(Object.keys(row.changes||{}).length?'<p>'+csEscape(tb52ChangeText(row.changes))+'</p>':'')+(row.effects?'<p>'+Object.entries(row.effects).map(([name,v])=>csEscape(cap(name))+': '+Number(v.before).toFixed(2)+' → '+Number(v.after).toFixed(2)).join(' · ')+'</p>':'')+(row.welfare?'<p>'+csEscape(row.welfare)+'</p>':'')).join('')||'<p>No rider actions recorded.</p>';}
function rider105Pagination(events,page){return events.length>10?'<div class="inline"><button type="button" data-rider105-older '+((page+1)*10>=events.length?'disabled':'')+'>Earlier actions</button><button type="button" data-rider105-newer '+(!page?'disabled':'')+'>Later actions</button><span>'+events.length+' recorded actions</span></div>':'';}
function rider105BindPages(box,events,state){const update=()=>{box.querySelector('[data-rider105-rows]').innerHTML=rider105Rows(events,state.page);box.querySelector('[data-rider105-pages]').innerHTML=rider105Pagination(events,state.page);bind();};const bind=()=>{box.querySelector('[data-rider105-older]')?.addEventListener('click',()=>{state.page++;update();});box.querySelector('[data-rider105-newer]')?.addEventListener('click',()=>{state.page--;update();});};bind();}
const RIDER105_RENDER=renderTraining;
renderTraining=function(...args){const out=RIDER105_RENDER(...args),s=t2state().session,h=s&&t2findHorse(s.horseId),panel=document.getElementById('training');if(!h||!s||rider105Show(s)||!panel?.appendChild)return out;
 const state=rider105State(s),box=document.createElement('section');box.className='inline';box.dataset.rider105='';
 box.innerHTML='<button type="button" data-rider105-open aria-expanded="'+state.open+'">Punish Horse</button><dialog class="rider105-dialog" data-rider105-panel aria-labelledby="rider105-title"><div class="inline rider105-dialog-heading"><h3 id="rider105-title">Punish Horse</h3><button type="button" data-rider105-close>Close — Back to training</button></div><p class="small">Abstract simulation choices. Temporary compliance does not earn technical skills.</p><div class="grid two"><label>Category<select data-rider105-category>'+RIDER105_CATEGORIES.map(c=>'<option'+(state.category===c?' selected':'')+'>'+c+'</option>').join('')+'</select></label><label>Severity<select data-rider105-severity>'+RIDER105_SEVERITIES.map(c=>'<option'+(state.severity===c?' selected':'')+'>'+c+'</option>').join('')+'</select></label></div><p role="status" data-rider105-availability></p><button type="button" data-rider105-apply>Record selected action</button><button type="button" data-rider105-regroup>Regroup / Release Pressure</button><p role="status" data-rider105-latest>'+csEscape(state.events.at(-1)?.narrative||'No rider action selected.')+'</p><details data-ui-key="rider105-history" '+(state.historyOpen?'open':'')+'><summary>Rider action history · '+state.events.length+'</summary><div class="training-observation" data-rider105-rows>'+rider105Rows(state.events,state.page)+'</div><div data-rider105-pages>'+rider105Pagination(state.events,state.page)+'</div></details></dialog>';
 const training=[...panel.querySelectorAll('.training2')].find(node=>node.querySelector('[data-t2-action="finish"]')),heading=training?.querySelector('h3');if(heading)heading.insertAdjacentElement('afterend',box);else (training||panel).appendChild(box);box.querySelector('[data-ui-key="rider105-history"]').ontoggle=e=>{state.historyOpen=e.target.open;};const availability=()=>{box.querySelector('[data-rider105-availability]').textContent=rider105Restriction(h,s)||rider105Equipment(h,s,state.category)||'Available. Each selection records a separate event.';};availability();
 const dialog=box.querySelector('[data-rider105-panel]'),opener=box.querySelector('[data-rider105-open]');
 const close=()=>{state.open=false;dialog.close?.();opener.setAttribute('aria-expanded','false');opener.focus?.({preventScroll:true});};
 opener.onclick=()=>{state.open=true;opener.setAttribute('aria-expanded','true');dialog.showModal?.();};
 box.querySelector('[data-rider105-close]').onclick=close;dialog.addEventListener('cancel',()=>{state.open=false;opener.setAttribute('aria-expanded','false');});
 if(state.open&&app.uiActiveTab==='training')dialog.showModal?.();
 box.querySelector('[data-rider105-category]').onchange=e=>{state.category=e.target.value;availability();};box.querySelector('[data-rider105-severity]').onchange=e=>{state.severity=e.target.value;};
 const refresh=()=>{saveGame(false);renderTraining();};box.querySelector('[data-rider105-apply]').onclick=()=>{rider105Resolve(h,s,state.category,state.severity);refresh();};box.querySelector('[data-rider105-regroup]').onclick=()=>{rider105Regroup(h,s);refresh();};rider105BindPages(box,state.events,state);return out;};
const RIDER105_FOLLOWUP=rrFollowup;
rrFollowup=function(h,s,action){if(['crop','spurs'].includes(action)&&rrEnabled()&&rrSettings().difficultStories&&s.rrConcern&&!rider105Show(s)){const result=rider105Resolve(h,s,action==='crop'?'Crop':'Spurs','Mild');if(result.ok)s.rrConcern=null;return result.ok;}return RIDER105_FOLLOWUP(h,s,action);};
const RIDER105_FINISH=t2finish;
t2finish=function(h,s,...args){const report=RIDER105_FINISH(h,s,...args);if(report&&s.riderActions105)report.riderActions105=s.riderActions105.events;return report;};
function rider105Summary(events){const applied=events.filter(e=>e.status==='Applied'),unavailable=events.filter(e=>e.status==='Unavailable'),recovery=events.filter(e=>e.status==='Recovery'&&e.effects?.tension.after<e.effects.tension.before);return '<p>Applied rider actions: '+applied.length+' · Unavailable selections: '+unavailable.length+' · Temporary responsiveness: '+(applied.some(e=>e.temporaryCompliance)?'observed':'not recorded')+' · Technical skill gain from punitive actions: 0.</p><p>Rhythm/balance disruption: '+(applied.some(e=>e.effects?.balance.after<e.effects.balance.before)?'recorded':'not recorded')+' · Defensive incidents: '+applied.filter(e=>e.incidentId).length+' · New medical concerns: '+new Set(applied.map(e=>e.conditionId).filter(Boolean)).size+' · Regrouping that reduced tension: '+recovery.length+'.</p>';}
const RIDER105_REPORT=t2reportMarkup;
t2reportMarkup=function(report,...args){const html=RIDER105_REPORT(report,...args),events=report.riderActions105;if(!events?.length)return html;return html+'<details data-rider105-report="'+csEscape(report.id)+'"><summary>Rider Actions & Horse Welfare</summary><p>'+events.length+' chronological actions. Punitive choices grant no technical skill progress; later exercise gains reflect actual work.</p>'+rider105Summary(events)+'<div class="training-observation" data-rider105-rows>'+rider105Rows(events)+'</div><div data-rider105-pages>'+rider105Pagination(events,0)+'</div></details>';};
const RIDER105_REPORT_RENDER=renderTraining;
renderTraining=function(...args){const out=RIDER105_REPORT_RENDER(...args),events=t2state().lastReport?.riderActions105,seen=new Set();for(const box of [...document.querySelectorAll('#training [data-rider105-report]')].reverse()){const id=box.dataset.rider105Report;if(seen.has(id)){box.remove();continue;}seen.add(id);if(events&&id===t2state().lastReport.id)rider105BindPages(box,events,{page:0});}return out;};
