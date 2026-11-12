const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.GAME_URL||'http://localhost:8098');await page.waitForFunction(()=>Save3.ready);
  const expected=await page.evaluate(async()=>{
   resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
   const h=app.horses[0],now=pastureCalendarHour(),r=careerRider();
   careerState().settings.progression=false;
   const standardEvent=careerSchedule(now,now+CAREER_HOURS_PER_YEAR).find(e=>e.discipline==='jumping'&&e.tier===1&&e.ranking==='national'&&e.base>0);
   const standard=showCreate(h,buildCompetitionRpgSession(h,'jumping',standardEvent.level),standardEvent,standardEvent.id+':player');app.activeShow=standard;
   for(const e of standard.competitors)e.scores.showjumping={faults:e.player?0:4,penalties:e.player?0:4,time:e.player?40:70};
   showCompletePhase(standard);showPersistResults(standard);
   const standardMeet=careerState().meets[standardEvent.id],standardPoints=standardMeet?.results.find(x=>x.player)?.points;
   if(!standardPoints)throw Error('designated calendar show still awards zero');
   app.showHistory ||= [];app.showHistory.push(standard);careerState().settings.progression=true;
   const made=customShowCreate({name:'Ranking Regression',venue:'Test Arena',country:'GBR',year:app.year,month:app.month,day:12,duration:1,prestige:80,tier:8,mode:'sanctioned',classes:[{name:'Junior Stakes',discipline:'jumping',level:'0.70',division:'junior',offset:0,capacity:12,fee:0,prize:1000,npcs:true}]});
   if(!made.ok)throw Error(made.message);
   const event=customShowEvents(now,now+720).find(e=>e.customShowId===made.show.id);
   const show=showCreate(h,buildCompetitionRpgSession(h,'jumping','0.70'),event,event.id+':player');app.activeShow=show;
   for(const e of show.competitors)e.scores.showjumping={faults:e.player?0:4,penalties:e.player?0:4,time:e.player?40:70};
   showCompletePhase(show);showPersistResults(show);
   const meet=careerState().meets[event.id],row=meet.results.find(x=>x.player);
   if(!row?.points)throw Error('live completion awarded no ranking points');
   const points=row.points;
   Object.assign(app,pastureDate(meet.hour));careerPublish(meet.hour);
   if(careerState().rankings['division|jumping|junior'].find(x=>x.id===r.id)?.points!==points)throw Error('live points missing from release');
   // Emulate an affected old save, then use the real persistence/load path.
   row.points=0;standardMeet.results.find(x=>x.player).points=0;delete careerState().rankingPointsVersion92;
   const money=app.money;saveGame(false);await Save3.flush();
   return {eventId:event.id,riderId:r.id,points,money,standardId:standardEvent.id,standardPoints};
  });
  await page.reload();await page.waitForFunction(()=>Save3.ready);
  const actual=await page.evaluate(({eventId,riderId})=>({points:careerState().meets[eventId].results.find(x=>x.player).points,ranked:careerState().rankings['division|jumping|junior'].find(x=>x.id===riderId)?.points,money:app.money}),expected);
  assert.equal(await page.evaluate(id=>careerState().meets[id].results.find(x=>x.player).points,expected.standardId),expected.standardPoints);
  assert.equal(actual.points,expected.points);assert.equal(actual.ranked,expected.points);assert.equal(actual.money,expected.money);assert.deepEqual(errors,[]);
  await page.evaluate(async()=>{saveGame(false);await Save3.flush();});await page.reload();await page.waitForFunction(()=>Save3.ready);
  assert.equal(await page.evaluate(id=>careerState().meets[id].results.find(x=>x.player).points,expected.eventId),expected.points);
  console.log('PASS designated calendar and high-tier live show completion, exact-boundary publication, verified save repair and repeated reload without duplicate points or prizes');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
