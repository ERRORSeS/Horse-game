/* Keep calendar formats, quick rounds and shortened jump-offs on the real course engine. */
function jumping106Option(h,s){
 const step=s.steps[s.stepIndex],options=competitionPromptForStep(s)?.options||[],plan=c7Plan(s,step),choices=options.map((option,index)=>({option,index})).filter(({option})=>!/circle|re.?approach|represent|abort|skip/i.test(option.label));
 if(!choices.length)throw Error('No playable course choice is configured.');
 // Select by known preparation and riding difficulty, never by a future random draw.
 choices.sort((a,b)=>c7Execution(h,s,plan,a.option).chance-c7Execution(h,s,plan,b.option).chance||a.index-b.index);
 return choices[0].index;
}
const JUMP106_QUICK=quickCompete;
quickCompete=function(show){
 if(show.discipline!=='jumping'||show.rpg?.choiceRecords?.some(r=>!r.interactive7))return JUMP106_QUICK(show);
 if(show.stage!=='ride'||show.quickRunning)return false;
 const h=showHorse(show),s=show.rpg,phase=showPhase(show);if(!h||!s)return false;
 if(phase==='jump-off'&&!show.qualifiers?.includes(show.competitors.find(e=>e.player)?.id))return false;
 show.quickRunning=true;
 try{
  c7State(s).started=true;let guard=0;
  while(s.stepIndex<s.steps.length&&!s.eliminated&&guard++<200){
   s.awaitingAdvance=false;const record=c7Resolve(h,s,jumping106Option(h,s));if(!record)throw Error('The course could not resolve the next fence.');
   s.awaitingAdvance=false;const state=c7State(s);
   if(state.representStep===s.stepIndex){state.representations[s.stepIndex]=(state.representations[s.stepIndex]||0)+1;state.representStep=null;}else s.stepIndex++;
  }
  if(guard>=200)throw Error('The course did not finish within its permitted attempts.');
  s.awaitingAdvance=false;finalizeCompetitionRpgEntry(h,s);
  while(show.stage==='results'&&showNextCompetitor(show)){}
  show.quickCompleted ||= {};show.quickCompleted[phase]=true;return true;
 }finally{show.quickRunning=false;saveGame(false);}
};
const JUMP106_BEGIN=showBeginJumpOff;
showBeginJumpOff=function(show,...args){const before=show.rpg,readiness=before?.interactive7?.readiness,out=JUMP106_BEGIN(show,...args);if(show.rpg!==before&&show.round===1){show.rpg.stepIndex=0;show.rpg.currentStage='main_round';show.rpg.id=show.id+':jump-off';if(Number.isFinite(readiness))c7State(show.rpg).readiness=readiness;}return out;};
function jumping106RepairOpenShow(show){
 if(!show||show.discipline!=='jumping'||show.round!==1||!['ride','results'].includes(show.stage))return;
 for(const entry of show.competitors||[]){const score=entry.scores?.['jump-off'],cached=entry.rounds7?.['jump-off'];if(!entry.player&&score?.time===0&&!score.eliminated&&cached?.records?.length===0){delete entry.scores['jump-off'];delete entry.rounds7['jump-off'];entry.jumpOffCompleted=false;}}
}
const JUMP106_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const out=JUMP106_LOAD(...args);jumping106RepairOpenShow(app.activeShow);
 const now=pastureCalendarHour(),events=new Map();for(const e of [...(app.barnShows||[]),...(app.upcomingEvents||[]),...Object.values(app.management?.calendarEventRegistry||{})])if(e?.id)events.set(e.id,e);
 for(const e of events.values())if(e.gameHosted&&e.discipline==='jumping'&&e.rules?.format==='Standard'&&e.rules.jumpOff==null&&e.at>=now&&!e.entries?.length&&e.status!=='Completed'&&e.id!==app.activeShow?.eventId)e.rules.jumpOff=true;
 return out;};
