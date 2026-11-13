/* Integrate with the existing session, phase, result and one-click workflow. */
function competition100Configure(s,event=null){
 if(!['dressage','eventing'].includes(s.discipline)||s.choiceRecords?.length&&!s.version100)return s;
 const show={id:s.id,discipline:s.discipline,level:s.level,eventSnapshot:event},test=dressage100Test(show),old=s.steps||[],first=old.find(x=>x.stage==='main_round'),template=first||{stage:'main_round',eventIndex:0};
 const phases=s.discipline==='eventing'?eventing100Order(show):['dressage'],main=[];
 for(const phase of phases){if(phase==='dressage')for(const m of test.movements)main.push({...template,stage:'main_round',phase:'dressage phase',movement:{...m},plan7:null});
 else if(phase==='cross-country')for(const fence of eventing100Course(show))main.push({...template,stage:'main_round',phase:'cross-country phase',movement:undefined,xc100:fence,routeDistance:fence.segment,plan7:null});
 else{const existing=old.filter(x=>x.stage==='main_round'&&showPhaseName(x)==='showjumping'),r=event?.rules?.eventingJumping||{},count=r.fences||10+Math.max(0,SHOW_LEVELS.eventing.indexOf(s.level));for(let i=0;i<count;i++){const step=existing[i%Math.max(1,existing.length)]||{...template,phase:'showjumping phase'};main.push({...step,movement:undefined,height:eventing100ArenaHeight(show),routeDistance:(r.distance||count*40)/count,plan7:null});}}}
 const head=old.filter(x=>x.stage!=='main_round');s.steps=[...head,...main];s.version100=1;s.movementPlan=test.movements;s.event100=event?Object.fromEntries(['course','dressageTest','dressageRules','phaseOrder','phaseSchedule','crossCountryRules','crossCountryCourse','courseDistance','tier','judgeCount'].filter(k=>event[k]!==undefined).map(k=>[k,HorseHealth.copy(event[k])])):null;if(s.event100&&event.rules)s.event100.rules=Object.fromEntries(['dressage','crossCountry','eventing','eventingJumping'].filter(k=>event.rules[k]!==undefined).map(k=>[k,HorseHealth.copy(event.rules[k])]));s.phaseOrder100=phases;return s;
}
const COMP100_BUILD=buildCompetitionRpgSession;
buildCompetitionRpgSession=function(h,d,l){return competition100Configure(COMP100_BUILD(h,d,l));};
const COMP100_CREATE=showCreate;
showCreate=function(h,s,event,...args){const show=COMP100_CREATE(h,s,event,...args);competition100Configure(s,event);show.performance100=1;for(const entry of show.competitors){entry.initialFatigue100=Number(performance100Horse(entry).fatigue)||0;}return show;};
const COMP100_PHASE=showPhase;
showPhase=function(show){return show.discipline==='eventing'?eventing100Order(show)[show.round]:COMP100_PHASE(show);};
const COMP100_SCORE=showScore;
showScore=function(show,entry,phase,records,stats={}){
 const enabled=show.performance100||!show.rpg;if(!enabled)return COMP100_SCORE(show,entry,phase,records,stats);
 if(entry.scores?.[phase])return entry.scores[phase];
 if(Object.values(entry.scores||{}).some(r=>r.eliminated)&&show.discipline==='eventing')return {phase,penalties:0,time:0,faults:0,eliminated:true,eliminationReason:'Eliminated in a preceding phase',notStarted:true};
 if(records?.some(r=>Number.isInteger(r.step))&&show.rpg)records=records.filter(r=>show.rpg.steps[r.step]?.stage==='main_round'&&c7Phase(show.rpg,show.rpg.steps[r.step])===phase);
 let result;if(phase==='dressage')result=records?.length?dressage100Sheet(show,entry,records,stats):dressage100Simulate(show,entry);
 else if(show.discipline==='eventing'&&phase==='cross-country')result=records?.length?eventing100XcResult(show,records,stats):eventing100SimulateXc(show,entry);
 else if(show.discipline==='eventing'&&phase==='showjumping'){
  if(records?.length){result=COMP100_SCORE(show,entry,phase,records,stats);const r=show.eventSnapshot?.rules?.eventingJumping||{},distance=records.reduce((n,f)=>n+(f.routeDistance||40),0),allowed=r.timeAllowed||distance/(325/60);result={...result,timeAllowed:allowed,timePenalties:Math.ceil(Math.max(0,result.time-allowed)-1e-8)*(r.timeRate??.4)};result.penalties=result.faults+result.timePenalties;}else result=eventing100Arena(show,entry);
 }else return COMP100_SCORE(show,entry,phase,records,stats);
 if(stats.eliminated){result.eliminated=true;result.eliminationReason=stats.eliminationReason||result.eliminationReason||'Eliminated';}eventing100Carry(show,entry,result);return result;
};
const COMP100_RECORDS=c7ScoreRecords;
c7ScoreRecords=function(show,entry,phase,records,stats={}){if(!show.performance100)return COMP100_RECORDS(show,entry,phase,records,stats);if(phase==='dressage')return dressage100Sheet(show,entry,records,stats);if(show.discipline==='eventing'&&phase==='cross-country')return eventing100XcResult(show,records,stats);return COMP100_RECORDS(show,entry,phase,records,stats);};
const COMP100_PROMPT=competitionPromptForStep;
competitionPromptForStep=function(s){const p=COMP100_PROMPT(s),step=s.steps?.[s.stepIndex];if(!s.version100||!step||step.stage!=='main_round'||!p)return p;
 if(showPhaseName(step)==='dressage')return {...p,title:step.movement.name,scene:'Ride '+step.movement.name.toLowerCase()+'.',options:[{label:'Prioritize accuracy and rhythm',intent:'precision rhythm balance',fail:7},{label:step.movement.kind==='technical'?'Request greater collection':step.movement.kind==='precision'?'Commit to precise markers':'Ask for more expression',intent:step.movement.kind==='technical'?'push collection':step.movement.kind==='precision'?'push precision':'push expression',fail:13},{label:'Soften and prioritize relaxation',intent:'reassure steady',fail:6}]};
 if(step.xc100)return {...p,title:step.xc100.type+' '+step.xc100.number,scene:step.xc100.terrain+' approach · '+step.xc100.height.toFixed(2)+' m · manage pace and line.',options:[{label:'Balanced line',intent:'balanced',fail:10},{label:'Careful, wider approach',intent:'balance careful',fail:7},{label:'Fast, direct approach',intent:'fast direct',fail:13}]};return p;
};
const COMP100_EXECUTION=c7Execution;
c7Execution=function(h,s,plan,option){const e=COMP100_EXECUTION(h,s,plan,option);if(s.version100&&plan.dressage){const fake={discipline:s.discipline,level:s.level,eventSnapshot:s.event100},m=s.steps[s.stepIndex].movement,t=dressage100Training(h,m,fake),delta=(effectiveDisciplineSkill(h,'dressage')-t.actual)*.12;e.chance=clamp(e.chance+delta,1,70);}return e;};
function competition100Judge(h,s,plan,record){
 const show=app.activeShow?.id===s.liveShowId?app.activeShow:{id:s.id,performance100:1,discipline:s.discipline,level:s.level,eventSnapshot:s.event100,rpg:s},entry=show.competitors?.find(e=>e.horseId===h.id)||{id:s.id,horseId:h.id,player:!s.npc7,riderAbilities:s.riderProfile?.abilities,attributes:h.training2?.attributes};
 let m=s.steps[s.stepIndex].movement||plan;const ordinal=s.steps.slice(0,s.stepIndex).filter(x=>x.stage==='main_round'&&showPhaseName(x)==='dressage').length;
 const intent=String(record.intent||'');if(intent.includes('reassure')){s.warmupState.tension=Math.max(0,s.warmupState.tension-2);}record.judging100=dressage100Evaluate(show,entry,h,m,record,ordinal);if(record.quality===1&&(intent.includes('expression')&&m.kind==='expressive'||intent.includes('collection')&&m.kind==='technical'&&record.judging100.components.training>=80||intent.includes('push precision')&&m.kind==='precision'&&record.judging100.components.rider>=80))record.judging100.rawMark=Math.min(10,record.judging100.rawMark+.10);if(intent.includes('reassure')&&m.kind==='expressive')record.judging100.rawMark=Math.max(0,record.judging100.rawMark-.08);
 const increment=dressage100Rules(show).increment;record.mark=Math.round(record.judging100.rawMark/increment)*increment;record.coefficient=m.coefficient||1;record.markDeduction=record.judging100.deduction;record.outcome=m.name+': '+record.mark.toFixed(1)+'/10';return record;
}
const COMP100_RESOLVE=c7Resolve;
c7Resolve=function(h,s,index,options={}){
 const step=s.steps?.[s.stepIndex];if(!s.version100||!step?.xc100||step.stage!=='main_round')return COMP100_RESOLVE(h,s,index,options);
 if(s.awaitingAdvance||s.eliminated)return null;const state=c7State(s),key=s.stepIndex+':'+(state.representations[s.stepIndex]||0),old=s.choiceRecords?.find(r=>r.id===rrSessionId(s)+':xc:'+key);if(old)return old;
 const show=app.activeShow?.id===s.liveShowId?app.activeShow:{id:s.id,discipline:'eventing',level:s.level,eventSnapshot:s.event100,rpg:s},entry=show.competitors?.find(e=>e.horseId===h.id)||{id:h.id,horseId:h.id,player:!options.npc,riderAbilities:s.riderProfile?.abilities},option=competitionPromptForStep(s).options[index];
 if(!option)return null;s.xcState100 ||= {fatigue:entry.phaseFatigue100||0};const style=index===1?'Conservative':index===2?'Aggressive':showRidingStyle(s),record=eventing100Obstacle(show,entry,h,step.xc100,s.xcState100,style,option);Object.assign(record,{id:rrSessionId(s)+':xc:'+key,step:s.stepIndex,interactive7:true,choice:option.label,intent:option.intent,events6:record.event?[record.event]:[]});
 if(record.eliminated){s.eliminated=true;s.roundStats.eliminated=true;s.roundStats.eliminationReason=record.eliminationReason;}s.roundStats.faults=(s.roundStats.faults||0)+record.faults;state.started=true;state.ledger[key]={id:record.id,resolved:true};state.representStep=record.represent?s.stepIndex:null;s.choiceRecords ||= [];s.choiceRecords.push(record);s.outcomes ||= [];s.outcomes.push({phase:step.phase,outcome:record.outcome,recordId:record.id});s.feedback=record.outcome;if(!options.npc&&rrEnabled()&&typeof tbRecord==='function'){s.attempts=(s.attempts||0)+1;tbRecord(h,s,record.event||'exercise','jumping',record.completed);}
 s.awaitingAdvance=true;s.warmupState.energy=Math.max(0,s.warmupState.energy-record.energyUse);if(show===app.activeShow&&!options.npc)show.clock+=record.time/3600;return record;
};
const COMP100_QUICK=quickCompete;
quickCompete=function(show){
 if(!show.performance100||!['dressage','eventing'].includes(show.discipline))return COMP100_QUICK(show);
 if(show.stage!=='ride'||show.quickRunning)return false;show.quickRunning=true;
 try{const order=show.discipline==='eventing'?eventing100Order(show):['dressage'];for(let round=show.round;round<order.length;round++){
  show.round=round;const phase=order[round];for(const entry of show.competitors){if(entry.scores[phase])continue;
   const blocked=entry.player&&performance100MedicalBlock(showHorse(show));const earlier=Object.values(entry.scores).find(r=>r.eliminated);if(earlier||blocked){entry.scores[phase]={phase,penalties:0,faults:0,time:0,notStarted:true,eliminated:true,eliminationReason:earlier?.eliminationReason||'Medical or riding eligibility prevents continuation'};if(entry.player)show.phaseScores[phase]=entry.scores[phase];continue;}
   const previous=entry.player?(show.rpg.choiceRecords||[]).filter(r=>show.rpg.steps[r.step]?.stage==='main_round'&&c7Phase(show.rpg,show.rpg.steps[r.step])===phase):[];
   const result=phase==='dressage'?dressage100Simulate(show,entry,previous):phase==='cross-country'?eventing100SimulateXc(show,entry,previous):eventing100Arena(show,entry,previous);
   entry.scores[phase]=result;eventing100Carry(show,entry,result);if(entry.player)show.phaseScores[phase]=entry.scores[phase];
  }
 }
 show.rpg.stepIndex=show.rpg.steps.length;show.rpg.awaitingAdvance=false;show.quickCompleted={...(show.quickCompleted||{}),complete:true};showCompletePhase(show);return true;
 }finally{show.quickRunning=false;saveGame(false);}
};
const COMP100_CONTINUE=showContinueEvent;
showContinueEvent=function(show){
 if(show.performance100&&show.discipline==='eventing'){const h=showHorse(show),entry=show.competitors.find(e=>e.player);if(h&&performance100MedicalBlock(h)){for(const phase of eventing100Order(show).slice(show.round+1))entry.scores[phase]={phase,penalties:0,faults:0,time:0,eliminated:true,notStarted:true,eliminationReason:'Medical or riding eligibility prevents continuation'};for(const e of show.competitors.filter(e=>!e.player))for(const phase of eventing100Order(show).slice(show.round+1))e.scores[phase] ||= showScore(show,e,phase);show.round=2;showCompletePhase(show);return;}}
 return COMP100_CONTINUE(show);
};
const COMP100_STANDINGS=showStandings;
showStandings=function(show){if(show.discipline!=='eventing'||!show.performance100&&!show.competitors?.some(e=>Object.values(e.scores||{}).some(s=>s.version100)))return COMP100_STANDINGS(show);
 for(const e of show.competitors)if(Number.isFinite(e.otherPenalties)&&e.otherPenalties>0)e.scores.other={phase:'other',penalties:e.otherPenalties,reason:e.otherPenaltyReason||'Configured event penalty'};
 const phase=showPhase(show),rows=show.competitors.filter(e=>e.scores[phase]).map(e=>({...e,result:e.scores[phase],total:Math.round(Object.values(e.scores).reduce((n,r)=>n+(r.penalties||0),0)*100)/100,eliminated:Object.values(e.scores).some(r=>r.eliminated)})),tie=show.eventSnapshot?.rules?.eventing?.tieBreak||['xcPenalties','xcOptimum','jumpingPenalties','jumpingTime','dressage'];
 const value=(r,key)=>key==='xcPenalties'?r.scores['cross-country']?.penalties||0:key==='xcOptimum'?Math.abs((r.scores['cross-country']?.time||0)-(r.scores['cross-country']?.optimumTime||0)):key==='jumpingPenalties'?r.scores.showjumping?.penalties||0:key==='jumpingTime'?r.scores.showjumping?.time||0:r.scores.dressage?.penalties||0;
 rows.sort((a,b)=>Number(a.eliminated)-Number(b.eliminated)||a.total-b.total||tie.map(k=>value(a,k)-value(b,k)).find(n=>Math.abs(n)>1e-8)||a.startOrder-b.startOrder);let rank=0;return rows.map((r,i)=>{const tied=i>0&&!r.eliminated&&!rows[i-1].eliminated&&Math.abs(r.total-rows[i-1].total)<1e-8&&tie.every(k=>Math.abs(value(r,k)-value(rows[i-1],k))<1e-8);if(!tied)rank=i+1;return {...r,rank:r.eliminated?null:rank};});
};
function performance100PhasesSummary(scores={}){return Object.fromEntries(Object.entries(scores).map(([phase,r])=>[phase,phase==='dressage'?[r.penalties||0,r.percentage??null,r.eliminated?r.notStarted?2:1:0]:[r.penalties||0,r.time||0,r.faults||0,r.timePenalties||0,r.eliminated?r.notStarted?2:1:0,...(phase==='cross-country'?[r.optimumTime||0]:[])]]));}
function performance100PhaseHistory(row){return Object.fromEntries(Object.entries(row.phases100||{}).map(([phase,v])=>[phase,phase==='dressage'?{penalties:v[0],percentage:v[1],eliminated:!!v[2],notStarted:v[2]===2}:{penalties:v[0],time:v[1],faults:v[2],timePenalties:v[3],eliminated:!!v[4],notStarted:v[4]===2,...(phase==='cross-country'?{optimumTime:v[5]}:{})}]));}
const COMP100_FINISH=showFinish;
showFinish=function(show,...args){const h=showHorse(show),before=!show.returned,out=COMP100_FINISH(show,...args);if(h&&before&&show.performance100&&show.discipline==='eventing')h.fatigue=Math.max(0,h.fatigue-Math.min(18,show.exertion100||0));return out;};

function performance100MedicalBlock(h){return !h||!canCompeteUnderSaddle(h)||!!HorseHealth.allowed(h,'competition',3);}
const COMP100_PERSIST=showPersistResults;
showPersistResults=function(show,...args){if(show.performance100&&['dressage','eventing'].includes(show.discipline)){const entry=show.competitors.find(e=>e.player);if(entry)show.phaseScores=HorseHealth.copy(entry.scores);}return COMP100_PERSIST(show,...args);};
