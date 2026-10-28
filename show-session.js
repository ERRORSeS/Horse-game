// The core game file and its Bond/QOL calculations remain byte-for-byte unchanged.
function normalizeCompetitionRpgSession(session) {
  if (!session || typeof session !== 'object') return null;
  const discipline = typeof session.discipline === 'string' && SHOW_LEVELS[session.discipline] ? session.discipline : 'jumping';
  const level = typeof session.level === 'string' ? session.level : SHOW_LEVELS[discipline][0];
  const base = Array.isArray(session.steps)&&session.steps.length ? {} : buildCompetitionRpgSession({ id: session.horseId || '' }, discipline, level);
  const normalized = { ...base, ...session };
  normalized.discipline = discipline;
  normalized.level = level;
  normalized.horseId = session.horseId || '';
  normalized.stepIndex = Number.isFinite(session.stepIndex) ? Math.max(0, session.stepIndex) : 0;
  normalized.steps = Array.isArray(session.steps) && session.steps.length ? session.steps : base.steps;
  normalized.outcomes = Array.isArray(session.outcomes) ? session.outcomes : [];
  normalized.modifier = Number.isFinite(session.modifier) ? session.modifier : 0;
  normalized.refusalCount = Number.isFinite(session.refusalCount) ? session.refusalCount : 0;
  normalized.eliminated = session.eliminated === true;
  normalized.awaitingAdvance = session.awaitingAdvance === true;
  normalized.feedback = typeof session.feedback === 'string' ? session.feedback : '';
  const ws = session.warmupState || {};
  normalized.warmupState = {
    tension: clamp(Number.isFinite(ws.tension) ? ws.tension : 50, 0, 100),
    focus: clamp(Number.isFinite(ws.focus) ? ws.focus : 50, 0, 100),
    confidence: clamp(Number.isFinite(ws.confidence) ? ws.confidence : 50, 0, 100),
    energy: clamp(Number.isFinite(ws.energy) ? ws.energy : 50, 0, 100),
    timing: clamp(Number.isFinite(ws.timing) ? ws.timing : 50, 0, 100)
  };
  normalized.readinessBonus = Number.isFinite(session.readinessBonus) ? session.readinessBonus : 0;
  normalized.horseChanceBias = Number.isFinite(session.horseChanceBias) ? clamp(session.horseChanceBias, -8, 8) : 0;
  const rs = session.roundStats || {};
  normalized.roundStats = {
    rails: Number.isFinite(rs.rails) ? Math.max(0, rs.rails) : 0,
    faults: Number.isFinite(rs.faults) ? Math.max(0, rs.faults) : 0,
    refusals: Number.isFinite(rs.refusals) ? Math.max(0, rs.refusals) : 0,
    clearJumps: Number.isFinite(rs.clearJumps) ? Math.max(0, rs.clearJumps) : 0,
    majorFaults: Number.isFinite(rs.majorFaults) ? Math.max(0, rs.majorFaults) : 0,
    eliminated: rs.eliminated === true,
    eliminationReason: typeof rs.eliminationReason === 'string' ? rs.eliminationReason : ''
  };
  return Object.assign(session, normalized);
}

function showClockLabel(hour){const minutes=Math.max(0,Math.round(Number(hour)*60)),wholeHour=Math.floor(minutes/60),minute=minutes%60;return pastureDateLabel(wholeHour).replace(/\d{2}:00$/,String(wholeHour%24).padStart(2,'0')+':'+String(minute).padStart(2,'0'));}
/* Persistent show workflow. Scene, competitor and calendar clocks are independent. */
function showRoll(show,key){return HorseHealth.roll(HorseHealth.hash(show.id),key);}
function showWeighted(show,key,weights){const r=showRoll(show,key)*weights.reduce((a,b)=>a+b,0);let n=0;return weights.findIndex(w=>(n+=w)>r);}
function showNote(show,text){
  const templates={planning:['Travel-planning narrative',2],journey:['Journey quotes',0],'arrival-queue':['Journey quotes',18],'check-in':['Arrival narrative',2],'stall-allocation':['Arrival narrative',3],unloading:['Arrival narrative',4],'stable-walk':['Arrival narrative',9],'stall-inspection':['Arrival narrative',15],settling:['Settling narrative',0],results:show.discipline==='dressage'?['Dressage result quotes',6]:show.discipline==='hunter'?['Hunter result quotes',5]:['Live result narrative',1],final:['Live result narrative',17],return:['Return-home quotes',0]};
  const template=templates[show.stage],line=template?gameNarrative(template[0],template[1],{HORSE:showHorse(show)?.name||'',SHOW:show.name,VENUE:show.venue,DISTANCE:show.distance}):'';
  show.feedback=line&&!text.includes(line)?text+' '+line:text;show.history.push({stage:show.stage,hour:show.clock,text:show.feedback});
}
function showHorse(show){return t2findHorse(show.horseId);}
function showCreate(h,rpg,event=null,entryId=null){
  app.showSequence=(app.showSequence||0)+1;const draft=app.showTripDraft||{},home=event?!(event.barnId&&event.barnId!==app.currentBarn?.id):draft.location!=='away',venueId=event?.barnId||(!home?draft.venue||'regional-showground':app.currentBarn?.id||'home');
  h.venueFamiliarity ||= {};h.transportHistory ||= [];
  const show={version:1,id:entryId||'live-show:'+h.id+':'+app.showSequence,horseId:h.id,discipline:rpg.discipline,level:rpg.level,eventId:event?.id||null,eventSnapshot:event?HorseHealth.copy(event):null,name:event?.name||`${cap(rpg.discipline)} ${rpg.level}`,home,venueId,venue:event?.barnName||(!home?draft.venue||'Regional Showground':'Home Arena'),distance:event?.country&&event.country!==app.currentBarn?.country?'long-distance':event&&!home?'regional':draft.distance||'local',format:rpg.discipline==='jumping'?(event?(event.rules?.jumpOff===true?'jump-off':'single'):draft.format||'single'):'single',stage:home?'preparation':'entry',clock:event?.at??pastureCalendarHour(),classTime:event?.at??pastureCalendarHour()+(home?2:24),history:[],feedback:'Your entry has been confirmed.',readiness:0,stress:0,travelFatigue:0,venueConfidence:50,familiarity:h.venueFamiliarity[venueId]?.confidence||0,venueVisited:Boolean(h.venueFamiliarity[venueId]?.visits),competitors:[],phaseScores:{},round:0,awarded:false,returned:false};
  if(event)showConfigureField(event);const preset=SHOW_FIELD_SIZES[draft.eventSize],presetCount=preset?preset[0]+Math.floor(showRoll(show,'field-size')*(preset[1]-preset[0]+1))-1:11;show.eventSize=event?.eventSize||draft.eventSize||'custom';const npcCount=clamp(Math.round(Number(event?.npcCount??(preset?presetCount:draft.npcCount)??11)||11),1,99),fieldSize=npcCount+1,playerIndex=Math.min(3,Math.floor(fieldSize/2));show.npcCount=npcCount;
  for(let i=0;i<fieldSize;i++){const player=i===playerIndex,seed=HorseHealth.hash(show.id+':competitor:'+i),skill=player?effectiveDisciplineSkill(h,show.discipline):35+HorseHealth.roll(seed,'skill')*55;show.competitors.push({id:show.id+':entry:'+i,horseId:player?h.id:show.id+':npc-horse:'+i,name:player?h.name:'Combination '+(i+1),player,startOrder:i+1,skills:{discipline:skill,rhythm:player?(h.stats?.dressage?.Rhythm||skill):skill,form:player?(h.stats?.jumping?.Balance||skill):skill},difficulty:levelIndex(show.discipline,show.level),state:'Awaiting start',scores:{},finalPlacing:null});}
  if(event){calendarAttachEntry({id:show.id,horseId:h.id},event);}
  showEnsureNames(show);rpg.liveShowId=show.id;rpg.choiceRecords ||= [];show.rpg=rpg;app.activeShow=show;app.competitionRpg=rpg;return show;
}
const LIVE_REGISTER=registerShowEntry;
registerShowEntry=function(h,d,l){
  if(app.activeShow&&app.activeShow.stage!=='complete'){pushReport('Complete the current show and return sequence before entering another class.');return;}
  const prior=(h.pendingCompetitions||[]).length;LIVE_REGISTER(h,d,l);
  if(app.competitionRpg?.horseId===h.id){showCreate(h,app.competitionRpg,calendarRegistrationContext?.event);saveGame(false);}
  else if((h.pendingCompetitions||[]).length>prior){const queued=h.pendingCompetitions.at(-1),validation=queued.specialRules?validateCalendarEquipment(h,d,l,queued):validateCompetitionEquipment(h,d,l);if(!validation.valid)return;const entry=h.pendingCompetitions.pop(),rpg=buildCompetitionRpgSession(h,d,l),show=showCreate(h,rpg,calendarRegistrationContext?.event);show.normalInteraction=entry.interaction;saveGame(false);}
};
function showTravelChoice(show,action,values={}){
  const h=showHorse(show),stage=show.stage,choice=(weights,key)=>showWeighted(show,key,weights),advance=(next,text,minutes=10)=>{show.clock+=minutes/60;show.stage=next;showNote(show,text);};
  if(stage==='entry'){advance('planning','You review the estimated journey time and the class schedule.',0);}
  else if(stage==='planning'){
    const timing=values.timing||'morning',transport=values.transport||'shared',distance=show.distance,regional=distance!=='local',cost=transport==='private'?(regional?700:300):transport==='specialist'?1200:regional?450:180,overnight=timing==='early'?90:0;
    if(transport==='own'&&!app.ownedTransport?.suitable)throw new Error('Suitable owned transport is not available.');
    const duration=distance==='long-distance'?12:regional?5:2,buffer=timing==='early'?26:timing==='morning'?5:1;if(show.eventSnapshot&&show.classTime-buffer-duration<pastureCalendarHour())throw new Error('This class is too soon for that arrival plan. Choose a later arrival or a later show.');
    const credit=show.eventSnapshot?showTransportFee(show.eventSnapshot)||0:0,amount=Math.max(credit,transport==='own'?regional?160:70:cost),total=Math.max(0,amount-credit)+overnight;
    const paid=show.travel?.paidTotal??(app.careEconomy?.receipts||[]).find(r=>r.number===show.travel?.receipt)?.total??0,due=Math.max(0,total-paid);
    const receipt=HorseHealth.ledger(app,show.id+(paid?':transport-adjust:'+total:':transport'),due,csDay(),h,[{name:'Show transport and stabling',quantity:1,unitPrice:due}]);if(!receipt)throw new Error('Insufficient funds for the selected transport and stabling.');
    if(!show.eventSnapshot)show.classTime=Math.max(show.classTime,pastureCalendarHour()+duration+buffer);
    show.travel={timing,transport,cost:amount,overnight,paidTotal:Math.max(paid,total),receipt:receipt.number,duration,departure:show.classTime-buffer-duration,plannedArrival:show.classTime-buffer,delay:0,loadingAttempts:0};show.clock=show.travel.departure;
    show.readiness=choice(timing==='early'?[90,9,1]:timing==='morning'?[70,25,5]:[35,45,20],'arrival-readiness')===0?8:-5;
    advance('horse-preparation','The departure schedule is now confirmed. The equipment and competition supplies are added to the preparation checklist.',0);
  }
  else if(stage==='horse-preparation'){advance('loading-observe',`The transport waits outside the barn as ${h.name} approaches.`);}
  else if(stage==='loading-observe'){
    const base=choice([75,18,6,1],'loading-base'),experienced=(h.transportHistory||[]).filter(x=>x.loaded).length,calm=base===0||experienced>=3;
    show.loadingProfile=calm?'confident':['Spooky','Excitable','Hot-Blooded'].includes(h.personality)?'restless':'hesitant';advance('loading',calm?`${h.name} approaches the ramp with relaxed ears and appears ready to follow.`:`${h.name} reaches the foot of the ramp, then stops. The horse sniffs the entrance and turns its head toward the activity behind the transport.`,0);
  }
  else if(stage==='loading'){
    if(action==='abandon'){show.loadingAbandoned=true;advance('planning','The loading attempt has been abandoned, and the travel schedule must be revised.',15);return;}
    const intent=['inspect','forward','pause','staff'].indexOf(action);if(intent<0)throw new Error('Choose a loading action.');
    const weights=show.loadingProfile==='confident'?[[95,5,0],[93,7,0],[90,10,0],[95,5,0]][intent]:[[85,12,3],[75,18,7],[82,15,3],[90,8,2]][intent],attempt=show.travel.loadingAttempts++,result=choice(weights,'loading-action:'+attempt);
    show.travel.delay+=result===0?0:result===1?.25:.5;show.clock+=result===0?.1:result===1?.25:.5;
    (show.loadingOutcomes ||= []).push({attempt,intent:action,result});
    if(result===2&&attempt<2){show.stress+=4;showNote(show,`${h.name} backs away and needs time to settle. The transport staff offer assistance.`);}
    else if(result===2){advance('planning','The loading attempt has been abandoned, and the travel schedule must be revised.',0);}
    else{show.travel.loaded=true;h.transportHistory.push({showId:show.id,loaded:true,outcome:result,day:csDay()});h.transportExperience=(h.transportExperience||0)+1;advance('departure',`${h.name} finally steps fully aboard. Loading is complete and the journey can begin.`,0);}
  }
  else if(stage==='departure'){
    show.travel.actualDeparture=show.clock;show.travel.mainEvent=choice([55,20,15,8,2],'journey');advance('journey','The transport pulls away from the stable. The first part of the journey is quiet.',0);
  }
  else if(stage==='journey'){
    const event=show.travel.mainEvent,assessment=['check','adjust'].includes(action),delay=event===2?1:event===4?2:event===3?.5:0;show.travel.delay+=Math.max(0,delay-(action==='notify'?.25:0));show.travel.actualDuration=show.travel.duration+show.travel.delay+(assessment?.5:0);show.clock=show.travel.actualDeparture+show.travel.actualDuration;show.travelFatigue+=show.travel.duration*(assessment?1:2);show.stress+=event===1||event>=3?(assessment?3:8):0;show.travel.arrival=show.clock;show.preparationWindow=Math.max(0,show.classTime-show.clock);if(show.preparationWindow<1)show.readiness-=10;
    advance('arrival-queue','The showground signs appear ahead. The transport joins the venue’s arrival queue.',0);
  }
  else if(stage==='arrival-queue'){advance('check-in','Stewards direct the vehicles toward the designated unloading area.');}
  else if(stage==='check-in'){show.checkedIn=true;advance('stall-allocation',`You confirm ${h.name}'s entry at the show office.`);}
  else if(stage==='stall-allocation'){show.stall='Block '+(1+Math.floor(showRoll(show,'stall-block')*4))+' · Stall '+(1+Math.floor(showRoll(show,'stall')*30));advance('unloading','The show office assigns a temporary stall: '+show.stall+'. A printed stable map shows the route through the venue.');}
  else if(stage==='unloading'){
    const weights=action==='staff'?[95,4,1]:action==='wait'?[92,7,1]:action==='routine'?[85,12,3]:[90,8,2],outcome=choice(weights,'unloading');show.unloaded=true;show.stress+=outcome*3;advance('stable-walk','The horse steps carefully into the unfamiliar surroundings.');
  }
  else if(stage==='stable-walk'){advance('stall-inspection','The assigned stable block comes into view. You check the stall number against the show office assignment.');}
  else if(stage==='stall-inspection'){show.stallInspected=true;show.arrivalResponse=choice([50,25,17,7,1],'arrival-response');show.stress+=Math.max(0,show.arrivalResponse*4-show.familiarity*.1);advance('settling',`${h.name} looks inside before stepping forward. The horse investigates the bedding.`);}
  else if(stage==='settling'){
    const outcome=choice([60,30,10],'settling:'+action),quiet=action==='quiet'||action==='rest',sensitive=['Spooky','Sensitive'].includes(h.personality),benefit=outcome===0?10:outcome===1?4:-4;show.stress=Math.max(0,show.stress-benefit-(quiet&&sensitive?4:0));show.venueConfidence+=benefit;show.readiness+=benefit/2;if(action==='rest')show.travelFatigue=Math.max(0,show.travelFatigue-8);if(action==='walk')show.familiarity+=10;
    advance(show.venueVisited||show.familiarity>=50?'preparation':'exploration',outcome===2?`${h.name} remains restless despite the extra settling time.`:`${h.name} appears calmer after a quiet period. The settling period is complete and the horse's show readiness has been updated.`,quiet?45:20);
  }
  else if(stage==='exploration'){show.familiarity+=10;advance('practice','The venue walk helps the horse become more comfortable.');}
  else if(stage==='practice'){
    if(!['observe','flatwork','poles','rest'].includes(action))throw new Error('Choose a permitted practice activity.');
    if(action==='rest')show.travelFatigue=Math.max(0,show.travelFatigue-5);else{show.readiness+=action==='observe'?3:6;show.travelFatigue+=action==='observe'?0:4;show.familiarity+=5;}
    advance('preparation',action==='rest'?'You decide that further practice would offer little benefit.':'Arena familiarization has been recorded in the show preparation history.',action==='rest'?25:15);
  }
  else if(stage==='preparation'){
    if(!show.home){const v=h.venueFamiliarity[show.venueId] ||= {visits:0,confidence:0,experiences:[]};v.visits++;v.confidence=Math.min(100,Math.max(v.confidence,show.familiarity)+10);v.experiences.push({showId:show.id,stress:show.stress,stall:show.stall});}
    const validation=show.eventSnapshot?validateCalendarEquipment(h,show.discipline,show.level,calendarEntrySnapshot(show.eventSnapshot)):validateCompetitionEquipment(h,show.discipline,show.level);
    if(!validation.valid)throw new Error(validation.messages.join(' '));
    const claim=eqClaimCompetitionItems(h,{id:show.id},validation);if(!claim.ok)throw new Error(claim.message);show.equipmentValidation=validation;
    show.rpg.ridingStyle=values.ridingStyle||show.rpg.ridingStyle||'Balanced';show.rpg.readinessBonus=clamp(show.readiness-show.stress*.2-show.travelFatigue*.2,-10,10);show.clock=Math.max(show.clock,show.classTime-.5);show.stage='ride';showNote(show,'Final grooming and tack preparation are complete. The warm-up begins.');
  }
  else throw new Error('This travel stage is already complete.');
}
function showPhaseName(step){const p=String(step?.phase||'').toLowerCase();return p.includes('dressage')?'dressage':p.includes('cross')?'cross-country':'showjumping';}
function showScore(show,entry,phase,records,stats={}){
  const skill=entry.skills.discipline,seed=HorseHealth.hash(show.id+'|'+entry.id+'|'+phase),difficulty=entry.difficulty||0,r=(key)=>HorseHealth.roll(seed,key),judged=phase==='dressage'||phase==='hunter';
  if(!records)records=Array.from({length:phase==='jump-off'?4:8},(_,i)=>{const v=r('effort:'+i),success=clamp(.45+skill*.004-difficulty*.025,.2,.9);return {quality:v<success?1:v<success+.2?.6:0,title:judged?'Movement '+(i+1):'Fence '+(i+1),faults:judged?0:v<success+.2?0:phase==='cross-country'?20:4,time:7+r('time:'+i)*2};});
  const eliminated=Boolean(stats.eliminated),faults=records.reduce((n,x)=>n+(x.faults||0),0),time=records.reduce((n,x)=>n+(x.time||8),0),marks=records.map((x,i)=>({movement:x.title||'Movement '+(i+1),mark:Math.round(clamp(3+skill*.04+x.quality*2-difficulty*.15+(r('mark:'+i)-.5)*.4,0,10)*10)/10,coefficient:i===records.length-1?2:1,comment:x.quality>=.8?'Accurate, balanced and rhythmic.':x.quality>0?'Some loss of rhythm and accuracy.':'Significant correction affected this movement.'}));
  const percentage=marks.length?Math.round(marks.reduce((n,x)=>n+x.mark*x.coefficient,0)/marks.reduce((n,x)=>n+x.coefficient*10,0)*10000)/100:0;
  if(phase==='dressage')return {phase,percentage,penalties:100-percentage,movements:marks,comments:marks.map(x=>x.comment),eliminated};
  if(phase==='hunter'){
    const criteria=['Rhythm','Smoothness','Jumping form','Distances','Straightness','Flow','Rider quietness','Presentation'].map((name,i)=>({name,score:Math.round(clamp(45+skill*.35+(records[i%records.length]?.quality||0)*20-difficulty,0,100)*10)/10})),score=criteria.reduce((n,c)=>n+c.score,0)/criteria.length;
    return {phase,score:Math.round(score*100)/100,criteria,comments:criteria.map(c=>c.name+': '+(c.score>=75?'Positive impression.':'Needs greater consistency.')),eliminated};
  }
  const allowed=phase==='cross-country'?65:phase==='jump-off'?38:75,timePenalties=phase==='cross-country'?Math.max(0,Math.round((time-allowed)*.4*10)/10):Math.max(0,Math.ceil(time-allowed));
  return {phase,faults,time:Math.round(time*100)/100,timePenalties,penalties:faults+timePenalties,eliminated};
}
function showPhase(show){return show.discipline==='eventing'?['dressage','cross-country','showjumping'][show.round]:show.round===1?'jump-off':show.discipline==='jumping'?'showjumping':show.discipline;}
function showPlayerResult(show,session){
  const entry=show.competitors.find(e=>e.player),phase=showPhase(show);if(entry.scores[phase])return;
  const records=(session.choiceRecords||[]).filter(x=>show.discipline!=='eventing'||x.phase===phase),result=showScore(show,entry,phase,records,session.roundStats);
  entry.scores[phase]=result;entry.state='Performance Complete';show.phaseScores[phase]=result;
  for(const npc of show.competitors.filter(e=>!e.player&&e.startOrder<entry.startOrder)){if(!npc.scores[phase])npc.scores[phase]=showScore(show,npc,phase);npc.state='Performance Complete';}
  show.stage='results';showNote(show,'The provisional score appears on the board. The leaderboard updates immediately.');
}
function showStandings(show){
  const phase=showPhase(show),eligible=show.round===1&&show.discipline==='jumping'?show.competitors.filter(e=>show.qualifiers?.includes(e.id)):show.competitors;
  const rows=eligible.filter(e=>e.scores[phase]).map(e=>{const score=e.scores[phase],total=show.discipline==='eventing'?Object.values(e.scores).reduce((n,s)=>n+(s.penalties||0),0):show.discipline==='dressage'?score.percentage:score.penalties??score.score??score.percentage;return {...e,result:score,total,eliminated:Object.values(e.scores).some(s=>s.eliminated)};});
  rows.sort((a,b)=>Number(a.eliminated)-Number(b.eliminated)||(show.discipline==='dressage'||show.discipline==='hunter'?b.total-a.total:a.total-b.total)||((show.discipline==='jumping'||show.discipline==='eventing')?(a.result.time||0)-(b.result.time||0):0)||a.startOrder-b.startOrder);
  return rows.map((r,i)=>({...r,rank:r.eliminated?null:i+1}));
}
function showNextCompetitor(show){
  const phase=showPhase(show),pool=show.round===1&&show.discipline==='jumping'?show.competitors.filter(e=>show.qualifiers.includes(e.id)):show.competitors,npc=pool.find(e=>!e.player&&!e.scores[phase]);
  if(npc){npc.scores[phase]=showScore(show,npc,phase);npc.state='Performance Complete';show.clock+=((npc.scores[phase].time||120)+120)/3600;showNote(show,`The next combination enters the ring. ${npc.name}'s score is posted. The leaderboard updates immediately.`);}
  if(pool.every(e=>e.scores[phase]))showCompletePhase(show);return Boolean(npc);
}
function showCompletePhase(show){
  if(show.discipline==='eventing'&&show.round<2){const player=show.competitors.find(e=>e.player);if(Object.values(player.scores).some(s=>s.eliminated)){for(let i=show.round+1;i<3;i++){const phase=['dressage','cross-country','showjumping'][i];for(const entry of show.competitors)entry.scores[phase]=entry.player?{phase,penalties:0,faults:0,time:0,timePenalties:0,eliminated:true}:showScore(show,entry,phase);}show.round=2;}else{show.stage='phase-results';return;}}
  const ranked=showStandings(show);
  if(show.discipline==='jumping'&&show.round===0&&show.format==='jump-off'){
    show.qualifiers=ranked.filter(r=>!r.eliminated&&r.result.penalties===0).map(r=>r.id);
    if(show.qualifiers.length>1){show.stage='jump-off-ready';return;}
  }
  show.finalStandings=show.round===1&&show.discipline==='jumping'?[...ranked,...show.competitors.filter(e=>!show.qualifiers.includes(e.id)).sort((a,b)=>a.scores.showjumping.penalties-b.scores.showjumping.penalties||a.scores.showjumping.time-b.scores.showjumping.time).map((e,i)=>({...e,result:e.scores.showjumping,total:e.scores.showjumping.penalties,rank:e.scores.showjumping.eliminated?null:ranked.length+i+1}))]:ranked;
  show.competitors.forEach(e=>e.finalPlacing=show.finalStandings.find(r=>r.id===e.id)?.rank??null);show.stage='final';showNote(show,'The official standings have now been confirmed. The prizegiving is scheduled to begin shortly.');showPersistResults(show);
}
function showPersistResults(show){
  const h=showHorse(show),player=show.finalStandings.find(e=>e.player);if(!h||!player)return;
  h.showResults ||= [];if(h.showResults.some(r=>r.entryId===show.id))return;
  const record={entryId:show.id,eventId:show.eventId,date:dateLabel(),discipline:show.discipline,level:show.level,score:player.total,placing:player.rank,prize:0,status:player.eliminated?'ELIMINATED':null,resultText:showResultText(player.result),phaseScores:HorseHealth.copy(show.phaseScores),finalStandings:HorseHealth.copy(show.finalStandings),awarded:false};h.showResults.push(record);h.processedCompetitionIds ||= [];h.processedCompetitionIds.push(show.id);
  if(show.eventId){const event=calendarFindEvent(show.eventId);if(event){event.results ||= {};event.results[show.id]={...record,horseId:h.id};event.status='Completed';}}
}
function showResultText(r){return r.movements?`${r.percentage.toFixed(2)}%`:r.criteria?`Hunter score ${r.score.toFixed(2)}`:`${r.faults} jumping faults · ${r.timePenalties} time penalties · ${r.time.toFixed(2)} seconds`;}
function showAward(show){
  if(show.awarded)return;const h=showHorse(show),player=show.finalStandings.find(e=>e.player),rank=player?.rank,prize=rank&&rank<=6?Math.round((show.eventSnapshot?.prizeMoney||600)/rank):0;
  const economy=app.careEconomy ||= {receipts:[],inventory:[],operations:{}},transactionKey=show.id+':award';if(economy.operations[transactionKey]){show.awarded=true;show.award=economy.operations[transactionKey].award;return;}
  const receipt={number:'CARE-'+(economy.receipts.length+1),date:csDay(),horseId:h.id,horse:h.name,kind:'Competition prize',direction:'income',total:prize,status:'Received',award:{prize,rank},items:[{name:show.name+' prize',quantity:1,unitPrice:prize}]};economy.receipts.push(receipt);economy.operations[transactionKey]=receipt;
  app.money+=prize;h.earnings=(h.earnings||0)+prize;h.totalPoints=(h.totalPoints||0)+(rank?Math.max(0,30-rank):0);if(rank===1)h.championships=(h.championships||0)+1;if(rank===2)h.reserves=(h.reserves||0)+1;
  const record=h.showResults.find(r=>r.entryId===show.id);if(record)Object.assign(record,{prize,awarded:true,rosette:rank&&rank<=6?'Place '+rank:null});show.awarded=true;show.award={prize,rank,rosette:record?.rosette,receipt:receipt.number};if(h.topWins)h.topWins.highestScore=Math.max(h.topWins.highestScore||0,player.result.score??player.result.percentage??Math.max(0,100-player.total));
  pushCompetitionReport({id:show.id,date:dateLabel(),discipline:show.discipline,level:show.level,competitionName:show.name,horseName:h.name,horseBreed:h.breed,placing:rank,fieldSize:show.competitors.length,highlights:[showResultText(player.result)],comment:'Final standings confirmed during the show.',suggestion:'Allow suitable rest after competition.'});updateHorseTitles(h);
}
function showContinueEvent(show){
  show.round++;const nextPhase=showPhase(show),scheduled=show.eventSnapshot?.phaseSchedule?.[nextPhase];if(Number.isFinite(scheduled))show.clock=Math.max(show.clock,scheduled);else if(scheduled&&Number.isInteger(scheduled.year))show.clock=Math.max(show.clock,pastureCalendarHour(scheduled.year,scheduled.month,scheduled.day,scheduled.hour||0));else show.clock+=1;show.stage='ride';show.rpg.awaitingAdvance=false;show.rpg.roundStats={faults:0,refusals:0,clearJumps:0,majorFaults:0,eliminated:false};showNote(show,'The next eventing phase is '+showPhase(show)+'. Your cumulative penalties remain recorded.');app.competitionRpg=show.rpg;
}
function showBeginJumpOff(show,strategy='Balanced'){
  if(show.stage!=='jump-off-ready')return;show.clock+=.5;show.round=1;show.jumpOffStrategy=strategy;
  const player=show.competitors.find(e=>e.player);
  if(!show.qualifiers.includes(player.id)){show.stage='results';while(showNextCompetitor(show)){}return;}
  const h=showHorse(show),rpg=buildCompetitionRpgSession(h,'jumping',show.level);rpg.steps=rpg.steps.filter(s=>s.stage==='main_round').slice(0,4);rpg.liveShowId=show.id;rpg.jumpOff=true;rpg.strategy=strategy;rpg.ridingStyle=strategy;rpg.choiceRecords=[];show.rpg=rpg;app.competitionRpg=rpg;show.stage='ride';showNote(show,'Congratulations. '+h.name+' has qualified for the jump-off. You study the shortened course and locate the inside turn.');
}
const SHOW_RIDING_STYLES=Object.freeze({Conservative:{risk:.80,time:1.12},Balanced:{risk:1,time:1},Competitive:{risk:1.15,time:.92},Aggressive:{risk:1.35,time:.84}});
function showRidingStyle(session){return session.ridingStyle||session.strategy||'Balanced';}
const LIVE_CHANCES=competitionOptionFinalChances;
competitionOptionFinalChances=function(session,h,step,options){const rows=LIVE_CHANCES(session,h,step,options);if(step?.stage!=='main_round')return rows;const risk=SHOW_RIDING_STYLES[showRidingStyle(session)]?.risk||1;return rows.map(row=>{const fail=Math.max(0,100-row.successChance-row.computed.neutralChance),next=Math.min(95,fail*risk),scale=(100-next)/Math.max(1,100-fail);return {...row,successChance:row.successChance*scale,computed:{...row.computed,neutralChance:row.computed.neutralChance*scale,failChance:next}};});};
const LIVE_RESOLVE=resolveCompetitionRpgChoice;
resolveCompetitionRpgChoice=function(session,h,index){
  if(session.awaitingAdvance||session._resolving)return;const step=session.steps[session.stepIndex];if(!step)return;session._resolving=true;
  try{const before=session.roundStats?.faults||0;LIVE_RESOLVE(session,h,index);if(!session.awaitingAdvance)return;
    if(step.stage==='main_round'){
      const text=session.outcomes.at(-1)?.outcome||'',quality=/Clear|Accurate/.test(text)?1:/Minor|Style|Penalty/.test(text)?.6:0,phase=session.jumpOff?'jump-off':session.discipline==='eventing'?showPhaseName(step):session.discipline==='jumping'?'showjumping':session.discipline,pace=SHOW_RIDING_STYLES[showRidingStyle(session)]?.time||1;
      const choice=competitionPromptForStep(session)?.options[index],intent=String(choice?.intent||choice?.label||''),route=/inside|tight|direct|cut/i.test(intent)?.94:/wide|conservative|steady|balance|extra/i.test(intent)?1.06:1,distance=(phase==='cross-country'?80:40)*route,speed=phase==='cross-country'?10:5+effectiveDisciplineSkill(h,session.discipline)/100;
      session.choiceRecords ||= [];session.choiceRecords.push({choice:choice?.label,intent,routeDistance:distance,step:session.stepIndex,ridingStyle:showRidingStyle(session),phase,quality,title:competitionPromptForStep(session)?.title,faults:Math.max(0,(session.roundStats?.faults||0)-before),time:(distance/speed+(1-quality)*1.1)*pace});if(app.activeShow&&app.activeShow.id===session.liveShowId){app.activeShow.clock=Math.max(app.activeShow.clock,app.activeShow.classTime)+session.choiceRecords.at(-1).time/3600;}
    }else if(app.activeShow&&app.activeShow.id===session.liveShowId){app.activeShow.clock+=(step.stage==='warm_up'?3:2)/60;}
  }finally{delete session._resolving;}
  saveGame(false);showScheduleAdvance(session);
};
let showAdvanceTimer=null;
function showScheduleAdvance(session){
  if(!session.awaitingAdvance)return;clearTimeout(showAdvanceTimer);const index=session.stepIndex;
  showAdvanceTimer=setTimeout(()=>{if(app.competitionRpg!==session||!session.awaitingAdvance||session.stepIndex!==index)return;showAdvanceRpg(session);saveGame(false);if(app.uiActiveTab==='shows')renderShows();},900);
}
function showAdvanceRpg(session){
  if(!session.awaitingAdvance)return;const prior=session.steps[session.stepIndex];session.awaitingAdvance=false;session.stepIndex++;
  const show=app.activeShow,next=session.steps[session.stepIndex];
  if(next?.stage==='main_round'&&!session.readinessBonus)session.readinessBonus=competitionWarmupReadinessBonus(session);
  if(session.eliminated||session.stepIndex>=session.steps.length){finalizeCompetitionRpgEntry(showHorse(show),session);return;}
  if(show?.discipline==='eventing'&&prior.stage==='main_round'&&next.stage==='main_round'&&showPhaseName(prior)!==showPhaseName(next))showPlayerResult(show,session);
}
finalizeCompetitionRpgEntry=function(h,session){
  const show=app.activeShow&&app.activeShow.id===session.liveShowId?app.activeShow:showCreate(h,session,session.calendarEventSnapshot);
  showPlayerResult(show,session);
  if(!show.workRecorded){show.workRecorded=true;if(show.equipmentValidation)eqRecordCompetitionUse(h,{id:show.id},show.equipmentValidation);HorseHealth.workExposure(h,'competition',3,csDay(),show.id);if(typeof HorseSoundness!=='undefined')HorseSoundness.workload(h,csDay(),show.id,'competition',HorseHealth.current(h).length>0);h.showEntriesThisMonth=(h.showEntriesThisMonth||0)+1;}
  saveGame(false);
};
const LIVE_HYDRATE=hydrateFromSave;
hydrateFromSave=function(data){const r=LIVE_HYDRATE(data);app.showSequence=data.showSequence||0;app.showTripDraft=data.showTripDraft||{};app.showHistory=data.showHistory||[];app.activeShow=data.activeShow||null;if(app.activeShow)showEnsureNames(app.activeShow);for(const show of app.showHistory)showEnsureNames(show);for(const h of app.horses)for(const result of h.showResults||[])if(result.finalStandings)showEnsureNames({id:result.entryId,competitors:result.finalStandings});if(app.activeShow){app.activeShow.rpg=app.competitionRpg||app.activeShow.rpg;app.competitionRpg=app.activeShow.rpg;}return r;};
const LIVE_RESET=resetGame;
resetGame=function(...args){app.activeShow=null;app.showSequence=0;app.showTripDraft={};app.showHistory=[];clearTimeout(showAdvanceTimer);return LIVE_RESET(...args);};
function showTravelOptions(show){
  const table={entry:[['continue','Review entry and travel information']],planning:[['book','Confirm itinerary']], 'horse-preparation':[['ready','Prepare horse and pack equipment']], 'loading-observe':[['observe','Observe body language at the ramp']],loading:[['inspect','Allow time to inspect the ramp'],['forward','Ask calmly for another step'],['pause','Pause and retry after a short break'],['staff','Request experienced transport staff assistance'],['abandon','Abandon loading and revise the plan']],departure:[['depart','Begin journey']],journey:[['continue','Continue according to the professional plan'],['check','Take scheduled rest stop and welfare check'],['adjust','Adjust itinerary after staff assessment'],['notify','Notify show office of the delay']], 'arrival-queue':[['wait','Wait in designated arrival area']], 'check-in':[['check-in','Complete check-in before unloading']], 'stall-allocation':[['stall','Receive temporary stable assignment']],unloading:[['quiet','Allow a quiet moment before unloading'],['routine','Continue familiar unloading routine'],['staff','Request staff assistance'],['wait','Wait for nearby traffic to settle']], 'stable-walk':[['walk','Walk to the assigned stable']], 'stall-inspection':[['inspect','Inspect the assigned stall and surroundings']],settling:[['quiet','Quiet stall time'],['walk','Walk permitted showground areas'],['routine','Familiar short in-hand routine'],['rest','Review schedule and allow additional rest']],exploration:[['explore','Explore permitted areas and observe the arena']],practice:[['observe','Allow time to observe the surroundings'],['flatwork','Practice suitable flatwork in practice arena'],['poles','School familiar poles in permitted practice arena'],['rest','Skip extra practice and allow rest']],preparation:[['ready','Check tack and begin warm-up']]};
  return table[show.stage]||[];
}
function showResultMarkup(show){
  const official=Boolean(show.finalStandings),rows=official?show.finalStandings:showStandings(show),player=rows.find(r=>r.player),phase=showPhase(show),pool=official?show.competitors.length:show.round===1&&show.discipline==='jumping'?show.qualifiers.length:show.competitors.length,remaining=pool-rows.length;
  return `<h3>${csEscape(phase.toUpperCase())} — ${show.stage==='final'||show.stage==='prizegiving'?'FINAL':'PROVISIONAL'} RESULTS</h3>${player?`<p><strong>${csEscape(player.name)}: ${csEscape(showResultText(player.result))}</strong></p><p>Current placing: ${player.rank||'Eliminated'} / ${rows.length} finished · Remaining starters: ${remaining} · ${remaining?'Awaiting remaining rounds.':'All scheduled entries finished.'}</p>${show.discipline==='eventing'?`<p>Cumulative penalties: ${player.total.toFixed(2)}. Dressage → Cross-country → Showjumping.</p>`:''}${player.result.movements?`<details open><summary>Movement scores & judge comments</summary>${player.result.movements.map(m=>`<p>${csEscape(m.movement)}: ${m.mark.toFixed(1)} / 10 (×${m.coefficient}) · ${csEscape(m.comment)}</p>`).join('')}</details>`:''}${player.result.criteria?`<details open><summary>Hunter judging</summary>${player.result.criteria.map(c=>`<p>${csEscape(c.name)}: ${c.score.toFixed(1)}</p>`).join('')}${player.result.comments.map(c=>`<p>${csEscape(c)}</p>`).join('')}</details>`:''}`:''}<p>Jump-off: ${show.format==='jump-off'?(show.qualifiers?'Qualifiers confirmed.':'May be required after all first rounds.'): 'Not part of this class format.'}</p><table><thead><tr><th>Rank</th><th>Horse / Rider</th><th>Score</th><th>${show.discipline==='eventing'?'Cumulative penalties':'Status'}</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.rank||'E'}</td><td>${csEscape(r.name)}<br><small>${csEscape(r.riderName||'You')}</small></td><td>${csEscape(showResultText(r.result))}</td><td>${show.discipline==='eventing'?r.total.toFixed(2):r.eliminated?'Eliminated':'Complete'}</td></tr>`).join('')}</tbody></table>`;
}
function showRenderSession(show){
  showEnsureNames(show);const panel=document.getElementById('shows'),h=showHorse(show);if(!h){show.stage='complete';app.competitionRpg=null;return;}
  const resultStages=['results','phase-results','jump-off-ready','final','prizegiving','return','return-loading','return-journey','return-stable'];
  panel.innerHTML=`<h2>${csEscape(show.name)} — ${csEscape(h.name)}</h2><div class="box"><p>Stage: <strong>${csEscape(show.stage)}</strong> · Venue: ${csEscape(show.venue)} · ${show.home?'Home show':show.distance+' journey'}</p><p>Show clock: ${csEscape(showClockLabel(show.clock))} · Class: ${csEscape(showClockLabel(show.classTime))} · Check-in deadline: ${csEscape(showClockLabel(show.classTime-1))}</p><p>Horse condition: ${csEscape(h.mood||'Unrecorded')} · Fatigue ${h.fatigue||0} · Show readiness ${show.readiness.toFixed(1)} · Temporary stress ${show.stress.toFixed(1)} · Travel fatigue ${show.travelFatigue.toFixed(1)} · Venue familiarity ${show.familiarity.toFixed(0)}</p>${show.stall?`<p>Assigned stable: ${csEscape(show.stall)}</p>`:''}<p role="status" aria-live="polite">${csEscape(show.feedback)}</p>${show.stage==='planning'?`<p>Estimated journey: ${show.distance==='local'?2:show.distance==='long-distance'?12:5} hours. Overnight stabling available: $90. Shared transport $180 local / $450 regional; private $300 / $700; specialist $1,200. Return transport is arranged separately.</p><label>Arrival<select data-trip-timing><option value="early">One day early (+$90 stabling)</option><option value="morning" selected>Early on show day</option><option value="late">Shortly before class</option></select></label><label>Transport<select data-trip-transport><option value="shared">Shared professional transport</option><option value="private">Private professional transport</option><option value="specialist">Long-distance specialist transport</option>${app.ownedTransport?.suitable?'<option value="own">Own suitable transport</option>':''}</select></label>`:''}${show.stage==='preparation'?`<label>Riding style<select data-trip-riding-style>${Object.keys(SHOW_RIDING_STYLES).map(style=>`<option ${style==='Balanced'?'selected':''}>${style}</option>`).join('')}</select></label><p>Conservative: slower and safer. Balanced: standard pace. Competitive: faster with increased mistake risk. Aggressive: fastest with the greatest mistake risk. Judged classes retain their discipline scoring.</p>`:''}${resultStages.includes(show.stage)?showResultMarkup(show):''}<div data-show-actions></div><details><summary>Show preparation & travel history</summary>${show.history.slice(-25).map(e=>`<p>${csEscape(e.text)}</p>`).join('')}</details></div>`;
  const wrap=panel.querySelector('[data-show-actions]');
  function button(id,label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.showAction=id;b.onclick=()=>{if(b.disabled||app.activeShow!==show)return;b.disabled=true;try{fn();saveGame(false);renderShows();}catch(error){show.feedback=error.message;b.disabled=false;panel.querySelector('[role="status"]').textContent=error.message;}};wrap.appendChild(b);}
  if(showTravelOptions(show).length)for(const [action,label]of showTravelOptions(show))button(action,label,()=>showTravelChoice(show,action,{timing:panel.querySelector('[data-trip-timing]')?.value,transport:panel.querySelector('[data-trip-transport]')?.value,ridingStyle:panel.querySelector('[data-trip-riding-style]')?.value}));
  else if(show.stage==='results'){
    button('next','Watch next competitor',()=>showNextCompetitor(show));button('fast-forward','Fast-forward remaining competitors',()=>{for(let n=0;n<show.competitors.length&&show.stage==='results';n++)showNextCompetitor(show);});
  }else if(show.stage==='phase-results')button('next-phase','Begin '+['dressage','cross-country','showjumping'][show.round+1],()=>showContinueEvent(show));
  else if(show.stage==='jump-off-ready')for(const strategy of ['Conservative','Balanced','Competitive','Aggressive'])button('jump-off-'+strategy,'Start jump-off — '+strategy,()=>showBeginJumpOff(show,strategy));
  else if(show.stage==='final')button('prizegiving','Attend prizegiving',()=>{show.stage='prizegiving';show.ceremonyStep=0;showNote(show,'The announcer asks the placed combinations to prepare for prizegiving. The ribbon colors are arranged beside the presentation area.');});
  else if(show.stage==='prizegiving')button('ceremony',show.ceremonyStep===0?'Enter presentation area':show.ceremonyStep===1?'Receive award':'Conclude prizegiving',()=>{
    show.clock+=10/60;show.ceremonyStep++;if(show.ceremonyStep===1)showNote(show,`${h.name} waits among the other horses. A steward directs you toward the presentation area.`);
    else if(show.ceremonyStep===2){showAward(show);showNote(show,show.award.rank?`Your name is called: place ${show.award.rank}. ${h.name} ${['Spooky','Excitable'].includes(h.personality)?'becomes slightly restless with the crowd nearby':'stands quietly as the award is presented'}. Prize money: ${money(show.award.prize)}.`:'The announcer thanks all competitors. No placing award was earned in this class.');}
    else{show.stage=show.home?'complete':'return';showNote(show,'The applause fades as the presentation concludes. The class is officially finished.');if(show.home)showFinish(show);}
  });
  else if(show.stage==='return'){
    for(const [id,label,rest]of [['leave','Arrange return transport and leave',0],['rest','Allow suitable rest, then arrange return transport',1],...(show.travel?.overnight?[['overnight','Use booked overnight stable before return',12]]:[])])button(id,label,()=>{const cost=Math.round((show.travel?.cost||0)*.7),receipt=HorseHealth.ledger(app,show.id+':return-transport',cost,csDay(),h,[{name:'Return show transport',quantity:1,unitPrice:cost}]);if(!receipt)throw new Error('Insufficient funds for return transport.');show.returnJourney={receipt:receipt.number,cost,rest,departure:show.clock+rest};show.clock+=rest;show.travelFatigue=Math.max(0,show.travelFatigue-rest*3);show.stage='return-loading';showNote(show,'The last of the competition equipment is returned to storage. The transport arrives for the return journey.');});
  }else if(show.stage==='return-loading')button('load-home','Complete loading for the journey home',()=>{show.stage='return-journey';showNote(show,`${h.name} approaches the familiar vehicle. Loading is completed for the trip home.`);});
  else if(show.stage==='return-journey')button('journey-home','Travel home',()=>{show.clock+=show.travel.actualDuration;show.stage='return-stable';showNote(show,'The journey home is quieter than the arrival. The stable comes back into view.');});
  else if(show.stage==='return-stable')button('stable-home','Return horse to its usual stall',()=>showFinish(show));
}
function showFinish(show){const horse=showHorse(show);if(horse&&!show.returned){horse.fatigue=clamp((horse.fatigue||0)+show.travelFatigue+(show.discipline==='eventing'?18:8),0,100);horse.competitionTripHistory ||= [];if(!horse.competitionTripHistory.some(trip=>trip.id===show.id))horse.competitionTripHistory.push({id:show.id,venue:show.venue,departure:show.travel?.actualDeparture,arrival:show.travel?.arrival,returnHour:show.clock,awards:show.award});}show.returned=true;show.stage='complete';showNote(show,'The competition trip has been completed and added to the horse’s history.');app.showHistory ||= [];if(!app.showHistory.some(s=>s.id===show.id))app.showHistory.push(HorseHealth.copy({...show,rpg:null}));app.activeShow=null;app.competitionRpg=null;}
const LIVE_RENDER=renderShows;
renderShows=function(){
  showResumePending();let show=app.activeShow;if(!show&&app.competitionRpg){const horse=t2findHorse(app.competitionRpg.horseId);if(horse)show=showCreate(horse,app.competitionRpg,app.competitionRpg.calendarEventSnapshot);else app.competitionRpg=null;}
  if(show&&show.stage!=='ride'&&show.stage!=='complete'){showRenderSession(show);return;}
  LIVE_RENDER();showFormatInterface(document.getElementById('shows'));if(show&&show.stage!=='ride'&&show.stage!=='complete')return;const panel=document.getElementById('shows');
  if(show&&show.stage==='ride'){
    const session=app.competitionRpg;show.rpg=session;const hint=panel.querySelector('.small');if(hint&&hint.textContent.includes('Press Enter'))hint.textContent='Choose an option. Result feedback advances automatically to the next scene.';
    const next=document.getElementById('comp-enter');if(next){next.textContent='Continue';next.disabled=!session?.awaitingAdvance;next.onclick=()=>{if(session?.awaitingAdvance){showAdvanceRpg(session);saveGame(false);renderShows();}};}
    const retire=document.getElementById('comp-retire');if(retire)retire.onclick=()=>{session.eliminated=true;session.roundStats.eliminated=true;session.roundStats.eliminationReason='Retired';finalizeCompetitionRpgEntry(showHorse(show),session);renderShows();};
    if(session?.awaitingAdvance)showScheduleAdvance(session);
    const styleControl=document.createElement('label');styleControl.innerHTML=`Riding style<select data-live-riding-style ${session?.awaitingAdvance?'disabled':''}>${Object.keys(SHOW_RIDING_STYLES).map(style=>`<option ${showRidingStyle(session)===style?'selected':''}>${style}</option>`).join('')}</select><span class="small"> Slower styles reduce mistake risk; faster styles shorten jumping and cross-country times. Changing style affects subsequent choices and does not reroll completed efforts.</span>`;panel.prepend(styleControl);styleControl.querySelector('select').onchange=e=>{session.ridingStyle=e.target.value;saveGame(false);renderShows();};
    const info=document.createElement('p');info.textContent=`${show.venue} · Show readiness ${show.readiness.toFixed(1)} · ${show.feedback}`;panel.prepend(info);
    return;
  }
  const draft=app.showTripDraft ||= {location:'home',venue:'Regional Showground',distance:'local',format:'single'};draft.eventSize ||= draft.npcCount?'custom':'small';const box=document.createElement('details');box.className='box';box.open=true;box.innerHTML=`<summary>Show location, travel & class format</summary><label>Location<select data-show-draft="location"><option value="home">Home show</option><option value="away">Away show</option></select></label><label>Venue name<input data-show-draft="venue" value="${csEscape(draft.venue||'Regional Showground')}"></label><label>Distance<select data-show-draft="distance"><option value="local">Local</option><option value="regional">Regional</option><option value="long-distance">Long-distance</option></select></label><label>Event size<select data-show-draft="eventSize"><option value="small">Small (12–20 total riders)</option><option value="medium">Medium (20–27 total riders)</option><option value="big">Big (25–33 total riders)</option><option value="custom">Custom NPC count</option></select></label><p>Preset sizes include your horse. The exact field is saved when the class starts. Choose Custom to set an exact NPC count.</p><label>NPC participants<input type="number" min="1" max="99" step="1" data-show-draft="npcCount" ${draft.eventSize==='custom'?'':'disabled'} value="${Number(draft.npcCount)||11}"></label><label>Showjumping format<select data-show-draft="format"><option value="single">Single round</option><option value="jump-off">Jump-off class (clear rounds qualify)</option></select></label><p>These settings apply to the next ordinary show entry. Calendar entries retain their venue and configured class rules.</p>`;panel.prepend(box);box.querySelectorAll('[data-show-draft]').forEach(n=>{if(n.tagName==='SELECT')n.value=draft[n.dataset.showDraft]||n.value;n.onchange=()=>{if(n.dataset.showDraft==='npcCount'&&(!Number.isInteger(Number(n.value))||Number(n.value)<1||Number(n.value)>99)){n.value=draft.npcCount||11;return;}draft[n.dataset.showDraft]=n.value;if(n.dataset.showDraft==='eventSize'){box.querySelector('[data-show-draft="npcCount"]').disabled=n.value!=='custom';}saveGame(false);};});
};

const FEVER_VET=renderVet;
renderVet=function(){FEVER_VET();const panel=document.getElementById('vet'),h=app.horses.find(h=>h.id===app.vetSelection?.horseId)||app.horses[0];if(!h||!HorseHealth.current(csEnsure(h)).some(c=>c.diagnosis==='fever'))return;const box=document.createElement('details');box.className='box';box.innerHTML='<summary>Investigate Unexplained Fever</summary><p>Review temperature, recent exposure and relevant findings. Monitoring can continue while the cause remains uncertain.</p>'+[['general','General examination & temperature evaluation'],['blood','Relevant bloodwork'],['respiratory','Respiratory examination (when cough or respiratory signs are present)'],['followup','Review recent illness, exposure and follow-up']].filter(([id])=>id!=='respiratory'||HorseHealth.current(h).some(c=>c.diagnosis==='respiratory'||c.symptoms?.some(s=>/cough|nasal|breath/i.test(s))||c.feverInvestigation?.tests.includes('general')&&c.feverInvestigation?.branch==='respiratory')).map(([id,label])=>`<button type="button" data-fever-exam="${id}">${label} (${money(HorseHealth.exams[id][1])})</button>`).join('');panel.prepend(box);box.querySelectorAll('[data-fever-exam]').forEach(b=>b.onclick=()=>{const r=HorseHealth.examine(app,h,b.dataset.feverExam,csDay(),csId('fever-exam'));csNotice({...r,message:r.ok?r.report.messages.join(' '):r.message});});};

function showPendingDue(entry){return Number.isFinite(entry.calendarAt)?entry.calendarAt<=pastureCalendarHour():Number.isFinite(entry.hourIndex)?entry.hourIndex<currentHourAbsolute():true;}
function showResumePending(horse=null){
  if(app.activeShow||app.competitionRpg)return false;
  for(const h of horse?[horse]:app.horses){
    const entry=(h.pendingCompetitions||[]).find(e=>showPendingDue(e)&&e.specialRules?.format!=='Puissance'&&!(h.processedCompetitionIds||[]).includes(e.id));if(!entry)continue;
    const validation=entry.specialRules?validateCalendarEquipment(h,entry.discipline,entry.level,entry):validateCompetitionEquipment(h,entry.discipline,entry.level);if(!validation.valid)continue;
    const event=calendarFindEvent(entry.eventId),rpg=buildCompetitionRpgSession(h,entry.discipline,entry.level),show=showCreate(h,rpg,event,entry.id);
    show.originalEntryId=entry.id;show.priorInteraction=entry.interaction||null;h.pendingCompetitions=h.pendingCompetitions.filter(e=>e.id!==entry.id);
    if(entry.interaction){
      rpg.roundStats=entry.interaction.roundStats||rpg.roundStats;rpg.choiceRecords=(entry.interaction.phases||[]).filter(p=>!p.phase?.includes('warm')).map((p,i)=>({phase:entry.discipline==='eventing'?showPhaseName(p):entry.discipline==='jumping'?'showjumping':entry.discipline,quality:/success|clear|accurate/i.test(p.outcome)?1:/partial|minor/i.test(p.outcome)?.6:0,faults:0,time:8,title:p.eventText||'Element '+i}));
      if(entry.discipline!=='eventing'&&rpg.choiceRecords.length){rpg.choiceRecords.at(-1).faults=entry.interaction.roundStats?.faults||0;}rpg.stepIndex=rpg.steps.length;showPlayerResult(show,rpg);
    }
    pushReport(`${h.name}'s scheduled competition is ready in Shows. Scores and remaining competitors are processed inside the show.`);return true;
  }return false;
}
const LIVE_PENDING=resolvePendingCompetitions;
resolvePendingCompetitions=function(h){
  showResumePending(h);const held=(h.pendingCompetitions||[]).filter(e=>showPendingDue(e)&&e.specialRules?.format!=='Puissance'&&!(h.processedCompetitionIds||[]).includes(e.id)&&(e.specialRules?validateCalendarEquipment(h,e.discipline,e.level,e):validateCompetitionEquipment(h,e.discipline,e.level)).valid);
  h.pendingCompetitions=(h.pendingCompetitions||[]).filter(e=>!held.includes(e));try{return LIVE_PENDING(h);}finally{h.pendingCompetitions.push(...held);}
};

// Named competitors are generated once and retained with their horse and rider IDs.
function showEnsureNames(show){
  if(!show?.competitors)return;
  const prefixes=['Silver','Midnight','Winter','Storm','Emerald','Hope','Royal','Velvet','Sol','Luna','Aster','Río','Nieve','Cielo','Frost','Sable','Aquila','Noir','Azul','Viento','Sakura','Kumo','Brisa','Ravn','Fuego','Aurum','Étoile','Vega'];
  const suffixes=['Dream','River','Valor','Cross','Echo','Flight','Blessing','Danza','Cielo','Mistral','Reina','Fleur','Nimbus','Solstice','Gloria','Mariposa','Orion','Zenith','Eclipse','Horizon','Belle','Shadow','Storm','Mirage'];
  const first=['Alex','Samira','Jordan','Sofia','Daniel','Maya','Luca','Aisha','Robin','Elena','Noah','Camille','Elias','Leila','Morgan','Nina'];
  const last=['Bennett','Reyes','Laurent','Khan','Andersen','Costa','Dubois','Patel','Santos','Novak','Martin','Okafor','Hansen','Rivera','Moreau','Chen'];
  const used=new Set(show.competitors.filter(e=>e.player||e.name&&!/^Combination \d+$/.test(e.name)).map(e=>e.name));
  for(const entry of show.competitors){
    const seed=HorseHealth.hash(show.id+'|'+entry.id),pick=(rows,key)=>rows[Math.floor(HorseHealth.roll(seed,key)*rows.length)];
    if(entry.player){entry.horseName=entry.name;entry.riderName ||= 'You';continue;}
    if(!entry.name||/^Combination \d+$/.test(entry.name)){
      let name=pick(prefixes,'horse-prefix')+' '+pick(suffixes,'horse-suffix'),attempt=0;
      while(used.has(name)&&attempt<100){attempt++;name=pick(prefixes,'horse-prefix:'+attempt)+' '+pick(suffixes,'horse-suffix:'+attempt);}
      entry.name=name;used.add(name);
    }
    entry.horseName=entry.name;entry.riderName ||= pick(first,'rider-first')+' '+pick(last,'rider-last');entry.riderId ||= entry.id+':rider';
    entry.horse ||= {id:entry.horseId,name:entry.name,breed:pick(BREEDS,'breed'),skills:HorseHealth.copy(entry.skills)};
  }
  for(const row of show.finalStandings||[]){const source=show.competitors.find(e=>e.id===row.id);if(source)Object.assign(row,{name:source.name,horseName:source.horseName,riderName:source.riderName,riderId:source.riderId});}
}

function competitionDisplayChances(success,partial,fail){
  const input=[success,partial,fail].map(x=>Math.max(0,Number(x)||0)),sum=input.reduce((a,b)=>a+b,0)||1,raw=input.map(x=>x/sum*100),rounded=raw.map(Math.floor);
  const order=raw.map((x,i)=>({i,remainder:x-rounded[i]})).sort((a,b)=>b.remainder-a.remainder||a.i-b.i);
  const remaining=100-rounded.reduce((a,b)=>a+b,0);for(let n=0;n<remaining;n++)rounded[order[n%3].i]++;
  return rounded;
}
const STYLE_POLE=showjumpingSessionPole;
showjumpingSessionPole=function(session,h,outcome='success'){
  if(session.liveShowId&&!session.polePlan){
    const jumps=session.steps.filter(s=>s.stage==='main_round').length;
    if(!session.poleRoundId){app.poleRoundSequence=(app.poleRoundSequence||0)+1;session.poleRoundId='rpg:'+app.poleRoundSequence;}
    const risk=SHOW_RIDING_STYLES[showRidingStyle(session)]?.risk||1;
    session.polePlan=ShowjumpingRound.plan(h,session.level,session.poleRoundId,jumps,clamp(-tackControlabilityDelta(h,'jumping')/30,-1,1),risk);
    session.polePlan.ridingStyle=showRidingStyle(session);
    const last=jumps-1,index=session.polePlan.indices.indexOf(last),spare=Array.from({length:Math.max(0,last)},(_,i)=>i).find(i=>!session.polePlan.indices.includes(i));if(index>=0&&spare!==undefined)session.polePlan.indices[index]=spare;
  }
  return STYLE_POLE(session,h,outcome);
};

const FIELD_CREATE_CALENDAR=createCalendarHorseShow;
createCalendarHorseShow=function(data){
  const count=data.npcCount==null?null:Number(data.npcCount);
  if(count!==null&&(!Number.isInteger(count)||count<1||count>99))return {ok:false,message:'Choose between 1 and 99 NPC participants.'};
  const result=FIELD_CREATE_CALENDAR(data);if(!result.ok)return result;
  if(data.eventSize&&SHOW_FIELD_SIZES[data.eventSize])showConfigureField(result.event,data.eventSize);else if(count!==null){result.event.npcCount=count;result.event.eventSize='custom';result.event.fieldSize=count+1;}
  result.event.rules.jumpOff=result.event.discipline==='jumping'&&result.event.rules.format!=='Puissance'&&data.jumpOff===true;
  calendarRemember(result.event);return result;
};
const FIELD_CALENDAR_LABEL=calendarSpecialLabel;
calendarSpecialLabel=function(event){showConfigureField(event);const jumping=event.discipline==='jumping',wall=event.rules?.format==='Puissance',count=event.npcCount??(wall?0:11);return FIELD_CALENDAR_LABEL(event)+` <span class="special-event-badge">${jumping?(wall?'Puissance wall':event.rules?.jumpOff?'Jump-off class':'Single round')+' · ':''}${event.eventSize?cap(event.eventSize)+' · ':''}${count+1} riders (${count} NPC)</span>`;};
const FIELD_REGISTER_CALENDAR=registerCalendarHorseShow;
registerCalendarHorseShow=function(h,event){const result=FIELD_REGISTER_CALENDAR(h,event);if(result.ok&&event.rules?.format!=='Puissance'&&event.at<=pastureCalendarHour()){showResumePending(h);if(app.activeShow?.horseId===h.id)changeTab('shows');}return result;};

// Puissance keeps its established wall rules; its NPC field owns separate horses and tack.
const FIELD_WALL_HORSE=calendarHorseById;
calendarHorseById=function(id){return FIELD_WALL_HORSE(id)||Object.values(mgState().calendarEventRegistry||{}).flatMap(e=>e.npcHorses||[]).find(h=>h.id===id);};
const FIELD_NPC_EQUIPMENT=eqItems;
eqItems=function(h,override=null){if(!h.calendarNpc)return FIELD_NPC_EQUIPMENT(h,override);return Object.entries(override||h.tack||{}).filter(([slot,type])=>Object.hasOwn(EQ_SLOTS,slot)&&mgType(type)).map(([slot,type])=>({slot,type,item:null}));};
const FIELD_WALL_REGISTER=registerCalendarHorseShow;
registerCalendarHorseShow=function(h,event){
  const result=FIELD_WALL_REGISTER(h,event);if(!result.ok||event.rules?.format!=='Puissance'||!event.npcCount||event.npcFieldCreated)return result;
  event.npcFieldCreated=true;event.npcHorses ||= [];
  for(let i=0;i<event.npcCount;i++){
    const npc=baseHorse('trained','npc');npc.id=event.id+':npc:'+i;npc.calendarNpc=true;npc.owner='NPC competitor';npc.age=8;npc.behavior=800;npc.requiresBreakingIn=false;npc.unridable=false;npc.medicalConditions=[];npc.illnesses=[];npc.soundnessYears=8;npc.retiredForever=false;npc.retiredToBreeding=false;npc.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};
    for(const group of Object.values(npc.stats))for(const key of Object.keys(group))group[key]=Math.max(group[key],65+Math.floor(HorseHealth.roll(HorseHealth.hash(npc.id),key)*30));npc.potential.jumping=100;
    const entry={id:event.id+':npc-entry:'+i,horseId:npc.id,eventId:event.id,discipline:'jumping',level:event.level,specialRules:HorseHealth.copy(event.rules),calendarAt:event.at};npc.pendingCompetitions=[entry];event.npcHorses.push(npc);event.entries.push(npc.id);calendarWallAddEntry(event,npc,entry);
  }
  calendarRemember(event);return result;
};
const FIELD_WALL_FINISH=calendarFinishWall;
calendarFinishWall=function(event){const result=FIELD_WALL_FINISH(event);if(event.puissance?.complete){event.results ||= {};for(const h of event.npcHorses||[]){const entry=h.pendingCompetitions[0],score=event.puissance.results[entry.id];if(score)event.results[entry.id]={...score,horseId:h.id,horseName:h.name,entryId:entry.id};}}return result;};

function showFormatInterface(panel){
  for(const paragraph of panel.querySelectorAll('p')){
    const text=paragraph.textContent||'';
    if(text==='Results are delivered after the next hour/day/month skip.')paragraph.textContent='Round results and live standings appear during the show session.';
    const match=text.match(/^Final chance: success ([\d.]+)% \/ partial ([\d.]+)% \/ fail ([\d.]+)%$/);
    if(match){const values=competitionDisplayChances(...match.slice(1).map(Number));paragraph.textContent=`Final chance: success ${values[0]}% / partial ${values[1]}% / fail ${values[2]}%`;}
  }
}
const LIVE_REPORT_TEXT=pushReport;
pushReport=function(text,...args){if(typeof text==='string')text=text.replace('Open the Shows tab and press Enter to progress scenes.','Open the Shows tab to play the competition scenes.').replace('Results will arrive after the next hour/day/month skip.','Results appear during the competition session.');return LIVE_REPORT_TEXT(text,...args);};

function liveWallAdvance(event,all=false){if(event.at>pastureCalendarHour())throw new Error('This wall class has not started yet.');if(all)calendarProcessWall(event);else calendarAdvanceWallRound(event);return event.puissance;}
function liveWallPrizegiving(event){
  if(!event.puissance?.complete)throw new Error('Finish the wall rounds before prizegiving.');
  if(event.wallPrizegiving==='complete')return;
  for(const h of app.horses)if(h.pendingCompetitions?.some(e=>e.eventId===event.id))resolvePendingCompetitions(h);
  event.wallPrizegiving='complete';pushReport('The announcer confirms the Puissance placings. Eligible prizes have been recorded once.');
}
const LIVE_WALL_CALENDAR=renderCalendar;
renderCalendar=function(){
  LIVE_WALL_CALENDAR();const panel=document.getElementById('calendar');
  for(const event of Object.values(mgState().calendarEventRegistry||{})){
    const wall=event.puissance;if(!wall||event.at>pastureCalendarHour()||!wall.entryOrder?.some(e=>app.horses.some(h=>h.id===e.horseId)))continue;
    const box=document.createElement('section');box.className='box';box.innerHTML=`<h3>Live Puissance — ${csEscape(calendarEventName(event))}</h3><p>Round ${wall.currentRound} · Wall ${wall.currentHeight.toFixed(2)} m · ${wall.complete?'Final results':'Provisional results'}</p><table><thead><tr><th>Horse</th><th>Highest cleared</th><th>Faults</th><th>Placing / status</th></tr></thead><tbody>${wall.entryOrder.map(e=>{const state=wall.states[e.entryId],result=wall.results[e.entryId];return `<tr><td>${csEscape(e.horseName)}</td><td>${(state?.highestClearedHeight||0).toFixed(2)} m</td><td>${state?.faults||0}</td><td>${result?.placing||result?.status||state?.stopReason||'Awaiting next round'}</td></tr>`;}).join('')}</tbody></table><p role="status">${event.wallPrizegiving==='complete'?'The awards have been presented. The wall class is complete.':event.wallPrizegiving==='presenting'?'The announcer calls the placed combinations forward for prizegiving.':'Wall results appear here during the class; no calendar skip is needed.'}</p>${!wall.complete?'<button type="button" data-live-wall-next>Watch next wall round</button><button type="button" data-live-wall-all>Resolve remaining wall rounds</button>':event.wallPrizegiving==='complete'?'':event.wallPrizegiving==='presenting'?'<button type="button" data-live-wall-award>Present wall awards</button>':'<button type="button" data-live-wall-invite>Attend wall prizegiving</button>'}`;
    panel.prepend(box);for(const [selector,action]of [['[data-live-wall-next]',()=>liveWallAdvance(event)],['[data-live-wall-all]',()=>liveWallAdvance(event,true)],['[data-live-wall-invite]',()=>event.wallPrizegiving='presenting'],['[data-live-wall-award]',()=>liveWallPrizegiving(event)]]){const button=box.querySelector(selector);if(button)button.onclick=()=>{if(button.disabled)return;button.disabled=true;try{action();saveGame(false);renderCalendar();}catch(error){box.querySelector('[role="status"]').textContent=error.message;button.disabled=false;}};}
  }
};

const SHOW_FIELD_SIZES=Object.freeze({small:[12,20],medium:[20,27],big:[25,33]});
function showConfigureField(event,size=null){
  if(Number.isInteger(event.fieldSize)&&!size)return event;
  if(!size&&Number.isInteger(event.npcCount)){event.fieldSize=event.npcCount+1;event.eventSize ||= 'custom';return event;}
  if(!size&&event.rules?.format==='Puissance'&&event.userHosted&&!event.eventSize)return event;
  const venue=(app.barnCatalog||[]).find(b=>b.id===event.barnId)||(event.barnId===app.currentBarn?.id?app.currentBarn:null),stars=venue?.eventsStars||3;
  const category=SHOW_FIELD_SIZES[size]?size:SHOW_FIELD_SIZES[event.eventSize]?event.eventSize:stars<=2?'small':stars<=4?'medium':'big',range=SHOW_FIELD_SIZES[category],seed=HorseHealth.hash(event.id+'|field-size');
  event.eventSize=category;event.fieldSize=range[0]+Math.floor(HorseHealth.roll(seed,'riders')*(range[1]-range[0]+1));event.npcCount=event.fieldSize-1;return event;
}
const FIELD_GENERATE_EVENT=createBarnShowEvent;
createBarnShowEvent=function(...args){const event=FIELD_GENERATE_EVENT(...args);if(event)showConfigureField(event);return event;};
