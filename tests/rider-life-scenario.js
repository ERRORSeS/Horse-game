/* Best-case career reachability: scripted clean rides use real entry, scoring,
   classification, applications and team selection. No qualification flags are forced. */
function simulateRiderLife(startAge=22,stopAtFirstTeam=false){
 resetGame();rrSettings().enabled=true;const world=careerState();world.settings.progression=true;world.settings.background=true;
 careerSetProfile(rrStoreCurrentProfile(),startAge,'GBR');rrSettings().experience.jumping='1.80';for(const k of RR_ABILITIES)rrSettings().abilities[k]=100;
 const horse=app.horses[0],horseId=horse.id;horse.breed='Dutch Warmblood';horse.careerLevelCaps={};horse.age=9;horse.birthYear=app.year-9;horse.behavior=900;horse.requiresBreakingIn=false;horse.medicalConditions=[];horse.illnesses=[];horse.legacyMedicalRecords=[];
 for(const group of Object.values(horse.stats))for(const k of Object.keys(group))group[k]=100;for(const k of Object.keys(horse.potential))horse.potential[k]=100;
 horse.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};app.money=10000000;
 // Scripted skilled rides exercise real entry, scoring, result-writing and selection; avoid save I/O per test show.
 const realSave=saveGame;saveGame=()=>true;const log=[],blocked=[];let entered=0,games=false,checkpoint=false,teamStarts=0;
 function now(to){if(to<=careerState().cursor)return;const date=pastureDate(to);app.year=date.year;app.month=date.month;app.day=date.day;app.hour=date.hour||0;app.horses.find(h=>h.id===horseId).age=date.year-horse.birthYear;careerAdvance(to);}
 function ride(event){
  const mount=app.horses.find(h=>h.id===horseId);mount.fatigue=0;const entry=event.federationTrial?federationRegisterTrial(event.federationTrial):event.team||event.games?federationRegisterTeam(event.id):careerEnter(event,mount);if(!entry.ok){blocked.push({year:event.date.year,event:event.name,reason:entry.message});return false;}
  const show=entry.show;now(careerEventEnd(event));
  for(const phase of CAREER_PHASES[event.discipline])for(const competitor of show.competitors)competitor.scores[phase]=showScore(show,competitor,phase,competitor.player?Array.from({length:8},(_,i)=>({quality:1,title:'Fence '+i,faults:0,time:6})):undefined);
  show.round=event.discipline==='eventing'?2:0;showCompletePhase(show);
  if(show.stage==='jump-off-ready'){show.round=1;for(const c of show.competitors.filter(c=>show.qualifiers.includes(c.id)))c.scores['jump-off']=showScore(show,c,'jump-off',c.player?Array.from({length:4},()=>({quality:1,faults:0,time:6})):undefined);showCompletePhase(show);}
  showAward(show);showFinish(show);entered++;if(event.federationTrial)log.push({year:event.date.year,type:'trial',placing:careerState().meets[event.id]?.results.find(r=>r.player)?.placing});if(event.team&&!event.games){const team=careerState().meets[event.id]?.teams.find(t=>t.country==='GBR');teamStarts++;log.push({year:event.date.year,type:'team start',country:'GBR',teamSize:event.team,teamPlace:team?.placing,teamPoints:team?.points,prize:show.award?.prize,represented:show.federationSelection?.country});}if(event.games){games=true;log.push({year:event.date.year,type:'Games',placing:careerState().meets[event.id]?.results.find(r=>r.player)?.placing,teamMedal:careerState().meets[event.id]?.teams.find(t=>t.country==='GBR')?.medal,prize:show.award?.prize});}return true;
 }
 try{
  for(let year=app.year;year<=4;year++){
   const division=startAge+year-1<=18?'junior':'senior';
   const plan=federationPlan(year,'GBR','jumping',division);
   let events=careerSchedule(pastureCalendarHour(year,1,1,0),pastureCalendarHour(year,12,30,23)).filter(e=>e.discipline==='jumping'&&(e.division==='senior'||e.division===division)&&!e.final&&!e.horseAge&&!e.gamesTrial&&!e.federationTrial&&e.tier>=2&&e.tier<=9);
   events.push(plan.trial);if(year%4===0)events.push(careerEvent(CAREER_SERIES.find(e=>e.id==='world-games-jumping'),year));events.sort((a,b)=>a.at-b.at);const priorities=events.filter(e=>e.federationTrial||e.games);events=events.filter(e=>e.federationTrial||e.games||!priorities.some(p=>Math.abs(p.at-e.at)<120));
   for(const e of events){
    if(e.at<=careerState().cursor+72)continue;now(e.at-72);
    if(pastureCalendarHour()<=plan.closes&&!federationState().applications[plan.id+':'+careerRider().id]){const applied=federationApply(plan,app.horses.find(h=>h.id===horseId));if(applied.ok)log.push({year,type:'application',status:applied.application.status});}
    if(stopAtFirstTeam&&e.team&&!e.games&&federationTeamEntries().some(entry=>entry.event.id===e.id)&&!show82Blocker(e,careerRider(),app.horses.find(h=>h.id===horseId)))return {pendingTeam:e.id,horseId};
    ride(e);const hour=careerState().cursor;
    if(hour<=plan.closes&&!federationState().applications[plan.id+':'+careerRider().id]){const applied=federationApply(plan,app.horses.find(h=>h.id===horseId),careerRider(),hour);if(applied.ok)log.push({year,type:'application',status:applied.application.status});}
    if(!checkpoint&&federationState().applications[plan.id+':'+careerRider().id]?.status==='Trial Invited'){hydrateFromSave(JSON.parse(serializeAppState()));checkpoint=true;log.push({year,type:'invitation reloaded'});}
    if(games)break;
   }
   const application=federationState().applications[plan.id+':'+careerRider().id];log.push({year,type:'selection',status:application?.status,reason:application?.reason});
   if(games)break;now(pastureCalendarHour(year,12,30,23));
  }
  return {startAge,entered,teamStarts,games,checkpoint,log,blocked,meets:Object.keys(careerState().meets).length};
 }finally{saveGame=realSave;}
}
