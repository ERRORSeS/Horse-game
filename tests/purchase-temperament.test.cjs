const {check}=require('./behavior5-harness.cjs');
check('purchasable horses receive varied finite behavior scales related to their advertised personalities',`{
 resetGame();const means={},allLearned=Object.fromEntries(RR_LEARNED.map(key=>[key,new Set()]));
 for(const [personality,key]of [['Bomb-proof','bombproof'],['Spooky','spooky'],['Lazy','lazy'],['Energetic','energetic'],['Sensitive','sensitive'],['Hot-Blooded','hotblooded'],['Easy-Going','easygoing']]){
  let spook=0,intensity=0;const range=PURCHASE_TEMPERAMENT_RANGES[key];
  for(let n=0;n<120;n++){const h={id:'temperament-'+key+'-'+n,personality},b=preparePurchaseTemperament(h,personality,'test');spook+=b.naturalSpookiness;intensity+=b.temperamentIntensity;
   if(b.naturalSpookiness<range.spook[0]||b.naturalSpookiness>range.spook[1]||b.temperamentIntensity<range.intensity[0]||b.temperamentIntensity>range.intensity[1])throw Error('advertised personality ignored');
   for(const stat of RR_LEARNED){const value=b.learned[stat];if(!Number.isFinite(value)||value<0||value>100)throw Error('invalid scale');allLearned[stat].add(value);}
   if(b.history.length||b.memories.length||b.processed.length)throw Error('invented behavioral events');
  }means[key]={spook:spook/120,intensity:intensity/120};
 }
 if(means.spooky.spook<=means.bombproof.spook+40||means.energetic.intensity<=means.lazy.intensity+30)throw Error('advertised correlation absent');
 if(Object.values(allLearned).some(values=>values.size<70))throw Error('learned scales still fixed');
}`);
check('all nine learned values are independently rolled and innate spookiness does not imply learned fence avoidance',`{
 resetGame();let lowAvoidanceSpooky=0,highAvoidanceSteady=0;
 for(let n=0;n<160;n++){
  const spooky=preparePurchaseTemperament({id:'independent-spooky-'+n,personality:'Spooky'}),steady=preparePurchaseTemperament({id:'independent-steady-'+n,personality:'Bomb-proof'});
  if(spooky.learned['Learned Fence Avoidance']<=2)lowAvoidanceSpooky++;if(steady.learned['Learned Fence Avoidance']>10)highAvoidanceSteady++;
  if(Object.values(spooky.learned).every(value=>value===spooky.learned['Jump Confidence']))throw Error('one shared roll for every stat');
 }
 if(!lowAvoidanceSpooky||!highAvoidanceSteady)throw Error('innate spookiness confused with learned avoidance');
 const h={id:'recorded-refusals',personality:'Bomb-proof',showResults:[{eliminated:true,eliminationReason:'2 refusals'},{eliminated:true,eliminationReason:'Refusal'}]},b=preparePurchaseTemperament(h);if(b.learned['Learned Fence Avoidance']<25||b.learned['Jump Confidence']>70)throw Error('recorded jumping concern ignored');
}`);
check('sale inquiries and purchases retain one profile and actual trial learning without changing technical or medical truth',`{
 resetGame();app.money=1000000;const h=baseHorse('trained','npc');h.personality='Spooky';h.preexistingHealthProcessed=true;h.age=10;h.behavior=800;h.requiresBreakingIn=false;const original=JSON.stringify({stats:h.stats,potential:h.potential,genetics:h.genetics,bond:h.bond,qol:calculateHorseQualityOfLife(h),medical:h.medicalConditions});
 const listing=HorseSales.list(app,h,10000,csDay()),b=rrHorse(h),profile=JSON.stringify(b.purchaseTemperament),tx=HorseSales.inquiry(app,listing.id,csDay());if(b.naturalSpookiness<55||!b.purchaseTemperament.initial)throw Error('not initialized before trial');
 b.learned['Jump Confidence']+=2;b.learned['Learned Fence Avoidance']=Math.max(0,b.learned['Learned Fence Avoidance']-1);b.history.push({kind:'Actual trial practice',key:'trial-proof'});const learned=JSON.stringify(b.learned);
 HorseSales.inquiry(app,listing.id,csDay());HorseSales.list(app,h,10000,csDay());if(JSON.stringify(b.purchaseTemperament)!==profile||JSON.stringify(b.learned)!==learned)throw Error('inquiry rerolled');
 HorseSales.offer(app,tx,10000,csDay());HorseSales.contract(app,tx,csDay());HorseSales.sign(app,tx,true);HorseSales.pay(app,tx,csDay());HorseSales.deliver(app,tx,csDay());HorseSales.deliver(app,tx,csDay());if(JSON.stringify(rrHorse(h).learned)!==learned||JSON.stringify(rrHorse(h).purchaseTemperament)!==profile)throw Error('purchase erased trial progress');
 if(JSON.stringify({stats:h.stats,potential:h.potential,genetics:h.genetics,bond:h.bond,qol:calculateHorseQualityOfLife(h),medical:h.medicalConditions})!==original)throw Error('unrequested horse values changed');
 const id=h.id;hydrateFromSave(JSON.parse(serializeAppState()));const owned=app.horses.find(x=>x.id===id);if(JSON.stringify(rrHorse(owned).learned)!==learned||JSON.stringify(rrHorse(owned).purchaseTemperament)!==profile)throw Error('profile not persisted');
}`);
check('already owned horses and unowned horses with real or authored behavior retain their established values',`{
 resetGame();const owned=app.horses[0],before=JSON.stringify(rrHorse(owned));preparePurchaseTemperament(owned,'Spooky');if(JSON.stringify(rrHorse(owned))!==before)throw Error('owned horse rerolled');
 const trained=baseHorse('trained','npc'),b=rrHorse(trained);b.learned['Jump Confidence']=43.7;b.learned['Learned Fence Avoidance']=61.2;b.naturalSpookiness=8;b.history.push({kind:'Recorded actual work'});const truth=JSON.stringify({natural:b.naturalSpookiness,learned:b.learned,history:b.history});preparePurchaseTemperament(trained,'Spooky');if(!b.purchaseTemperament.preservedExperience||JSON.stringify({natural:b.naturalSpookiness,learned:b.learned,history:b.history})!==truth)throw Error('known experience overwritten');
 const authored=baseHorse('trained','npc'),a=rrHorse(authored);a.learned['Handling Confidence']=12.5;preparePurchaseTemperament(authored,'Bomb-proof');if(a.learned['Handling Confidence']!==12.5||!a.purchaseTemperament.preservedExperience)throw Error('authored value discarded');
}`);
check('auction profiles survive bidding, cancellation, payment, delivery and saved catalogues without rerolls',`{
 resetGame();app.money=1000000;auctionAdvance(pastureCalendarHour());const lot=auctionAllLots().find(l=>l.horse.age>=4),h=lot.horse,b=rrHorse(h),initial=JSON.stringify(b);if(!b.purchaseTemperament.initial)throw Error('auction lacks profile');app.day+=3;auctionAdvance(pastureCalendarHour());lot.schedule=[];lot.history=[];lot.leader=null;lot.bid=0;auctionBid(lot.id,lot.startingPrice);auctionWithdrawBid(lot.id);auctionBid(lot.id,lot.startingPrice);if(JSON.stringify(rrHorse(h))!==initial)throw Error('bids reroll');
 app.day+=6;auctionAdvance(pastureCalendarHour());const c=auctionState().contracts.find(c=>c.lotId===lot.id);auctionContract(c.id,'sign',{accept:true});auctionContract(c.id,'pay');auctionContract(c.id,'documents');auctionContract(c.id,'book');app.month=2;app.day=1;auctionAdvance(pastureCalendarHour());auctionContract(c.id,'observe');auctionContract(c.id,'unload');auctionContract(c.id,'vet');app.currentBarn.capacity=100;auctionContract(c.id,'deliver',{stallId:stallState().find(st=>!stallOccupants(st).length).id});if(JSON.stringify(rrHorse(h))!==initial)throw Error('auction purchase rerolled');const id=h.id;hydrateFromSave(JSON.parse(serializeAppState()));if(JSON.stringify(rrHorse(app.horses.find(x=>x.id===id)))!==initial)throw Error('auction profile save');
}`);
check('lesson buyouts and active lease conversions preserve the advertised profile and accumulated learning',`{
 resetGame();app.money=1000000;const source=currentBarnLessonHorses()[0];source.barnAvailable=true;source.lessonBuyout={status:'available',price:2000,expiresMonth:currentMonthAbsolute()+3,expiryOutcome:'sold'};const before=JSON.stringify(rrHorse(source));if(!rrHorse(source).purchaseTemperament.initial)throw Error('lesson has no varied profile');const lease=lessonStartLease(source,1).horse;rrHorse(lease).learned['Rider Trust in Aids']+=1;const learned=JSON.stringify(rrHorse(lease));const result=lessonBuyHorse(source);if(!result.ok||result.horse!==lease||JSON.stringify(rrHorse(lease))!==learned||JSON.stringify(rrHorse(source))!==before)throw Error('lease conversion reset');
}`);
