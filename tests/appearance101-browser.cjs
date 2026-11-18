const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'light'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.GAME_URL||'http://localhost:8110');await page.waitForFunction(()=>Save3.ready);
  assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
  assert.equal(await page.evaluate(()=>app.horses.length),0,'new game must start without horses');
  await page.evaluate(()=>{app.horses.push(baseHorse('trained'));render();});
  const warnings=page.locator('[data-vet-warning-close-all]');if(await warnings.count())await warnings.click();
  await page.evaluate(async()=>{Save3.enqueue();await Save3.flush();});
  const identity=await page.evaluate(()=>({id:app.saveIdentity.id,horses:app.horses.map(h=>h.id)}));
  const tabs=await page.locator('#tabs [data-tab]').evaluateAll(nodes=>nodes.map(n=>n.dataset.tab));
  for(const theme of ['light','dark']) {
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.click('#appearanceToggle');
   for(const tab of tabs){
    await page.locator(`#tabs [data-tab="${tab}"]`).click();
    assert(await page.locator(`#${tab}`).isVisible(),`${theme}: ${tab} did not open`);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
    assert(!overflow,`${theme}: ${tab} overflows desktop viewport`);
   }
  }
  await page.reload();await page.waitForFunction(()=>Save3.ready);
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  assert.deepEqual(await page.evaluate(()=>({id:app.saveIdentity.id,horses:app.horses.map(h=>h.id)})),identity);
  for(const width of [390,700,1024]) {
   await page.setViewportSize({width,height:844});
   for(const tab of ['dashboard','horses','sales','market','rankings','calendar','settings','vet','shows','training','barn']){
    await page.locator(`#tabs [data-tab="${tab}"]`).click();
    assert(await page.locator(`#${tab}`).isVisible());
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),`${width}: ${tab} overflow`);
   }
  }
  await page.setViewportSize({width:1440,height:1000});await page.click('#toggleTabsBtn');assert(!await page.locator('#tabs').isVisible());await page.click('#toggleTabsBtn');assert(await page.locator('#tabs').isVisible());
  await page.locator('.stable-brand').click();assert(await page.locator('#dashboard').isVisible());
  await page.click('#saveGameBtn');await page.evaluate(()=>Save3.flush());
  await page.evaluate(async()=>{resetGame();await Save3.create('Empty stable test');render();});
  assert.equal(await page.evaluate(()=>app.horses.length),0,'new career must start empty');
  await page.reload();await page.waitForFunction(()=>Save3.ready);assert.equal(await page.evaluate(()=>app.horses.length),0,'empty career must remain empty after reload');
  for(const tab of tabs){await page.locator(`#tabs [data-tab="${tab}"]`).click();assert(await page.locator(`#${tab}`).isVisible(),`empty stable: ${tab}`);}
  await page.locator('[data-tab=sales]').click();await page.evaluate(()=>app.money=1000000);
  await page.locator('#sales .sales-ad > summary').first().click();
  await page.locator('#sales [data-cs-inquire]').first().click();await page.locator('#cs-sale-negotiate').click();await page.locator('#cs-sale-contract').click();await page.locator('#cs-sign-confirm').check();await page.locator('#cs-sale-sign').click();await page.locator('#cs-sale-pay').click();await page.locator('#cs-sale-deliver').click();
  assert.equal(await page.evaluate(()=>app.horses.length),1,'first horse can be purchased');
  await page.evaluate(async()=>{Save3.enqueue();await Save3.flush();});await page.reload();await page.waitForFunction(()=>Save3.ready);assert.equal(await page.evaluate(()=>app.horses.length),1,'purchased horse survives reload');
  assert.deepEqual(errors,[]);
  const systemPage=await context.newPage();await systemPage.goto(process.env.GAME_URL||'http://localhost:8110');await systemPage.waitForFunction(()=>Save3.ready);await systemPage.evaluate(()=>localStorage.removeItem('oxer.appearance101'));await systemPage.emulateMedia({colorScheme:'dark'});await systemPage.reload();assert.equal(await systemPage.locator('html').getAttribute('data-theme'),'dark');await systemPage.emulateMedia({colorScheme:'light'});await systemPage.waitForFunction(()=>document.documentElement.dataset.theme==='light');
  console.log(`PASS ${tabs.length} navigation tabs in both themes; 3 responsive sizes; theme persists independently of saved horses; system preference and menu disclosure; manual save; no browser errors`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
