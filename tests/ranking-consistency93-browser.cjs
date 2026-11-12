const assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.GAME_URL||'http://localhost:8099');await page.waitForFunction(()=>Save3.ready);
 const expected=await page.evaluate(async()=>{
  resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
  const now=pastureCalendarHour(),pool=rank91Pool('world','jumping','',now),r=careerRosterIndex().byId.get(pool.members[0].id),h=r.horses[0];r.rankingDebutHour86=now;r.rankingScoringStarts86=0;
  const e=careerSchedule(now,now+CAREER_HOURS_PER_YEAR).find(e=>e.discipline==='jumping'&&e.ranking==='world'&&e.base>0);
  const standings=Array.from({length:16},(_,i)=>({riderId:i===0?r.id:'browser93-rider-'+i,riderName:i===0?r.name:'Test Rider',horseId:i===0?h.id:'browser93-horse-'+i,horseName:i===0?h.name:'Test Horse',rank:i+1,total:i*4,started:true,status:'Completed',country:i===0?r.country:'GBR'}));
  const meet=careerRecordMeet(e,standings),award=meet.results[0].points,normal=RANK86_POINTS(e,meet.results[0],16,1.03);
  if(award!==normal||award<=1)throw Error('first win still discounted');
  Object.assign(app,pastureDate(meet.hour));careerPublish(meet.hour);
  Object.assign(careerSelection(),{board:'world',discipline:'jumping',rankingsCollapsed:false});renderCareerRankings();
  const row=careerRankingRows('world','jumping','').find(row=>row.id===r.id);if(row.best!==1)throw Error('best rank missing');
  changeTab('rankings');const money=app.money;
  saveGame(false);await Save3.flush();return {id:r.id,eventId:e.id,award,money};
 });
 const initial=await page.locator('#rankings').innerText();assert(!initial.includes('undefined'));assert(initial.includes('Best #1'));assert(initial.includes('Best —'));
 const first=page.locator('[data-career-rank-row]').first();await first.locator('summary').click();await page.waitForFunction(()=>document.querySelector('.career-rank-detail')?.textContent.includes('Results counting toward this board'));
 assert((await first.innerText()).includes('+'+expected.award+' points'));
 await page.evaluate(async({eventId,award})=>{careerState().meets[eventId].results[0].points=Math.round(award/4);delete careerState().npcRankingPointsVersion93;saveGame(false);await Save3.flush();},expected);
 await page.reload();await page.waitForFunction(()=>Save3.ready);
 const actual=await page.evaluate(({id,eventId})=>{Object.assign(careerSelection(),{board:'world',discipline:'jumping',rankingsCollapsed:false});renderCareerRankings();const row=careerRankingRows('world','jumping','').find(r=>r.id===id);return {points:careerState().meets[eventId].results[0].points,best:row.best,rankingPoints:row.points,money:app.money};},expected);
 assert.equal(actual.points,expected.award);assert.equal(actual.rankingPoints,expected.award);assert.equal(actual.best,1);assert.equal(actual.money,expected.money);
 assert(!(await page.locator('#rankings').innerText()).includes('undefined'));assert.deepEqual(errors,[]);
 console.log('PASS rendered best-rank labels, counted-result details, full NPC win points and saved repair/reload without prizes');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
