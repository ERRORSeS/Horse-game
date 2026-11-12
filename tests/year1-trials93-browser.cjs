const assert=require('node:assert/strict'),{chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.GAME_URL||'http://localhost:8099');await page.waitForFunction(()=>Save3.ready);
 const ids=await page.evaluate(()=>{
  resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerState().settings.background=false;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');app.money=1000000;
  const h=app.horses[0];h.breed='Dutch Warmblood';delete h.breedPotentialProfile;applyBreedPotential(h);h.age=9;h.birthYear=-8;h.behavior=900;h.requiresBreakingIn=false;h.manualRidabilityOverride=true;h.medicalConditions=[];h.illnesses=[];h.legacyMedicalRecords=[];h.owner='Your Stable';h.potential.jumping=100;for(const key of Object.keys(h.stats.jumping))h.stats.jumping[key]=100;rrSettings().experience.jumping='1.80';
  changeTab('calendar');renderCalendar();document.querySelector('[data-ui-key="show82-federation"]').open=true;
  const plan=federationPlan(1,'GBR','jumping','junior');return {plan:plan.id,trial:plan.openingTrial93.id};
 });
 const apply=page.locator('[data-federation-apply="'+ids.plan+'"]');await apply.click();
 const register=page.locator('[data-federation-register-trial="'+ids.plan+'"][data-federation-trial-id="'+ids.trial+'"]');await register.waitFor({state:'visible'});assert(await register.isEnabled());assert((await register.innerText()).includes('opening tryout'));await register.click();
 await page.waitForFunction(id=>app.activeShow?.eventId===id,ids.trial);assert.equal(await page.evaluate(()=>app.activeShow.eventSnapshot.date.month),1);
 await page.evaluate(async()=>{saveGame(false);await Save3.flush();});await page.reload();await page.waitForFunction(()=>Save3.ready);
 assert.equal(await page.evaluate(()=>app.activeShow?.eventId),ids.trial);assert.deepEqual(errors,[]);
 console.log('PASS Year 1 calendar apply/register buttons open an actual January trial and retain the registered show on verified reload');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
