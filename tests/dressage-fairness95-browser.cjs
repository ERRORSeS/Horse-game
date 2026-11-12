const assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.GAME_URL||'http://localhost:8103');await page.waitForFunction(()=>Save3.ready);
 const before=await page.evaluate(async()=>{
  resetGame();rrSettings().enabled=true;rrSettings().level='Professional';for(const key of RR_ABILITIES)rrSettings().abilities[key]=100;rrSettings().experience.dressage='Grand Prix';
  const h=app.horses[0];h.age=10;h.behavior=900;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.fatigue=0;h.personality='Easy-Going';h.potential.dressage=100;for(const key of Object.keys(h.stats.dressage))h.stats.dressage[key]=100;t2horse(h).traits=[];
  const s=buildCompetitionRpgSession(h,'dressage','Grand Prix'),show=showCreate(h,s);app.activeShow=show;show.stage='ride';s.warmupState={tension:0,focus:100,confidence:100,energy:100,timing:100};c7State(s).readiness=100;
  const roll=c7Roll;c7Roll=()=>.999;try{for(let i=0;i<s.steps.length;i++)if(s.steps[i].stage==='main_round'){s.stepIndex=i;c7Resolve(h,s,0);}}finally{c7Roll=roll;}
  s.interactive7.started=true;const player=show.competitors.find(e=>e.player);player.scores.dressage=c7ScoreRecords(show,player,'dressage',s.choiceRecords,s.roundStats);
  for(const e of show.competitors.filter(e=>!e.player))e.scores.dressage=showScore(show,e,'dressage');showCompletePhase(show);showPersistResults(show);changeTab('shows');renderShows();
  const row=show.finalStandings.find(e=>e.player),result={percentage:row.total,rank:row.rank,maxMark:Math.max(...row.result.movements.map(m=>m.mark)),scores:JSON.stringify(show.competitors.map(e=>e.scores))};saveGame(false);await Save3.flush();return result;
 });
 assert(before.maxMark>=8&&before.maxMark<=10);assert(before.percentage>=78&&before.percentage<92);assert.equal(before.rank,1);
 await page.reload();await page.waitForFunction(()=>Save3.ready);const after=await page.evaluate(()=>({rank:app.activeShow.finalStandings.find(e=>e.player).rank,scores:JSON.stringify(app.activeShow.competitors.map(e=>e.scores))}));assert.equal(after.rank,before.rank);assert.equal(after.scores,before.scores);assert.deepEqual(errors,[]);
 console.log('PASS complete manual Grand Prix: '+JSON.stringify({percentage:before.percentage,rank:before.rank,maxMark:before.maxMark})+'; actual NPC field, official result and verified reload');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
