const {check}=require('./behavior5-harness.cjs');
check('new catalogs balance adult sport horses, high schooling, disciplines and breeds', `{
 resetGame();let total=0,young=0,high=0;const breeds=new Set(),disciplines=new Set();
 for(let cycle=0;cycle<3;cycle++){
  auctionAdvance(auctionState().nextAt);const collections=auctionState().collections,sport=collections.find(c=>c.kind==='Sport Horse');
  if(collections.length!==3||sport&&(sport.lots.length<28||sport.lots.length>35))throw Error('collection limits');
  if(sport&&(sport.discipline?sport.lots.some(l=>l.discipline!==sport.discipline):new Set(sport.lots.map(l=>l.discipline)).size!==4))throw Error('discipline balance');
  const experienced=(sport?.lots||[]).filter(l=>l.horse.age>=9&&auctionSchoolingBand(l.discipline,l.current)==='high');
  if(sport&&!experienced.length)throw Error('missing experienced high-level horses');
  for(const l of auctionAllLots()){
   total++;young+=Number(l.horse.age<6);high+=Number(l.current!=='Unstarted'&&auctionSchoolingBand(l.discipline,l.current)==='high');breeds.add(l.horse.breed);disciplines.add(l.discipline);
   if(l.horse.age<7&&l.current!=='Unstarted'&&SHOW_LEVELS[l.discipline].indexOf(l.current)>auctionSchoolingLimit(l.horse,l.discipline))throw Error('age rule bypass');
   if(l.startingPrice!==auctionSchoolingPrice(l.discipline,l.current,l.id)||l.openAt!==collections[0].previewAt+72||l.schedule.length>5||l.bidderCount>3)throw Error('auction rules changed');
  }
 }
 if(young/total>.7||high/total<.05||breeds.size<10||disciplines.size!==4)throw Error('unbalanced catalog totals');
 console.log(JSON.stringify({lots:total,young,experiencedHigh:high,breeds:breeds.size,disciplines:[...disciplines]}));
}`);
check('potential question answers yes and no truthfully and persists without changing the horse', `{
 resetGame();const h=baseHorse('trained','npc');h.breed='Dutch Warmblood';h.age=9;h.requiresBreakingIn=false;h.behavior=800;
 for(const d of Object.keys(h.potential))h.potential[d]=100;for(const g of Object.values(h.stats))for(const k of Object.keys(g))g[k]=20;
 const l=HorseSales.list(app,h,20000,csDay());l.mainDiscipline='jumping';const tx=HorseSales.inquiry(app,l.id,csDay()),before=JSON.stringify(h);
 const answer=HorseSales.say(app,tx,'potential',csDay());if(!answer.ok||!answer.message.startsWith('Yes,')||!answer.message.includes('estimated potential')||JSON.stringify(h)!==before)throw Error('missing positive answer or horse changed');
 for(const g of Object.values(h.stats))for(const k of Object.keys(g))g[k]=100;
 const no=HorseSales.say(app,tx,'potential',csDay());if(!no.ok||!no.message.startsWith('No,'))throw Error('ceiling answer');
 if(!csTransactionMarkup(tx).includes('Does the horse have potential to go higher?'))throw Error('question missing from menu');
 const id=tx.id;hydrateFromSave(JSON.parse(serializeAppState()));const loaded=HorseSales.state(app).transactions.find(t=>t.id===id);
 if(loaded.conversation.filter(row=>row.topic==='potential').length!==2)throw Error('answer lost on reload');
 loaded.status='Cancelled';if(HorseSales.say(app,loaded,'potential',csDay()).ok)throw Error('closed inquiry accepted');
}`);
