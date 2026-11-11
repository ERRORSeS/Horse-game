const {check}=require('./behavior5-harness.cjs');
check('ordinary sale schooling and advertisements respect age-four and age-five jumping ceilings',`{
 resetGame();for(const [age,height]of [[3,1],[4,1],[5,1.1]])for(const talent of [false,true]){
  const h=baseHorse('fully','npc');h.breed='Dutch Warmblood';h.age=age;h.extraPotential=talent;h.potential.jumping=100;h.potential.dressage=100;for(const value of Object.values(h.stats))for(const key of Object.keys(value))value[key]=100;enforceSaleAgeLimit(h);
  if(Number(SHOW_LEVELS.jumping[highestAllowedLevelIndex(h,'jumping')])>height||h.potential.jumping!==100)throw Error('age cap '+age);const l=HorseSales.list(app,h,20000,csDay());h.mainDiscipline='jumping';l.sellerType='Deliberately misleading seller';delete l.schoolingVersion;for(const key of Object.keys(h.stats.dressage))h.stats.dressage[key]=0;csListingSchooling(l);if(l.mainDiscipline!=='jumping'||parseInt(l.claimedLevel)>height*100)throw Error('advertised above age ceiling');
 }
}`);
check('sale foals are persistent unstarted horses without fictional jumping or show records',`{
 resetGame();refreshNpcAds();const h=app.npcSales.find(h=>h.age===0);if(!h||!h.requiresBreakingIn||canRideUnderSaddle(h)||h.showResults.length||Object.values(h.stats.jumping).some(n=>n>10))throw Error('foal generation');csProspects();const l=HorseSales.state(app).listings.find(l=>l.horse.age===0&&l.status==='Listing Active');if(!l||l.trialAvailable||!l.claimedLevel.startsWith('Unstarted'))throw Error('foal listing');const id=l.id,count=HorseSales.state(app).listings.length;csProspects();if(HorseSales.state(app).listings.length!==count)throw Error('duplicate foals on render');importStableSave(exportStableSave());if(!HorseSales.state(app).listings.some(l=>l.id===id&&l.horse.age===0))throw Error('foal lost');
}`);
check('dedicated foals are unstarted and Green collections are low-schooling three-to-five-year-olds',`{
 resetGame();const foals=auctionGenerate(pastureCalendarHour(),2,'Foal'),green=auctionGenerate(pastureCalendarHour(),1,'Green Horse');if(!foals.lots.length||!green.lots.length)throw Error('empty collection');
 for(const l of foals.lots)if((l.horse.age<0||l.horse.age>3)||!l.horse.requiresBreakingIn||l.current!=='Unstarted'||canRideUnderSaddle(l.horse)||l.horse.showResults.length)throw Error('foal auction schooling');
 for(const l of green.lots){const h=l.horse,potential=JSON.stringify(h.potential);if(h.age<3||h.age>5||h.requiresBreakingIn||l.current==='Unstarted'||auctionSchoolingBand(l.discipline,l.current)!=='low')throw Error('green schooling');syncRidability(h);auctionRepairRidingEducation(l);if(!canRideUnderSaddle(h)||JSON.stringify(h.potential)!==potential)throw Error('green state changed');}
 const ids=green.lots.map(l=>l.horse.id);importStableSave(exportStableSave());for(const l of auctionAllLots().filter(l=>ids.includes(l.horse.id)))if(l.horse.requiresBreakingIn||l.current==='Unstarted')throw Error('saved green status');
}`);
check('new catalogs include foal and green auctions without exceeding save collection limits',`{
 resetGame();auctionAdvance(pastureCalendarHour());const collections=auctionState().collections;if(collections.length!==8||!collections.some(c=>c.kind==='Foal')||!collections.some(c=>c.kind==='Green Horse'))throw Error('missing collection');const beforeTiers=new Map(collections.map(c=>[c.kind,c.tier]));Save3.validate(JSON.parse(serializeAppState()));auctionAdvance(auctionState().nextAt);if(auctionState().collections.some(c=>c.tier===beforeTiers.get(c.kind)))throw Error('catalog tiers never rotate');
}`);
check('an existing registered sport name survives the market save workflow',`{
 resetGame();const h=app.horses[0];h.name='Aurora Rhapsody DVZ';const id=h.id;importStableSave(exportStableSave());if(app.horses.find(h=>h.id===id).name!=='Aurora Rhapsody DVZ')throw Error('name changed');
}`);
check('new warmbloods favor plain coats while rare pinto genes and inheritance remain possible',`{
 let plain=0;const counts={TO:0,O:0,Sb:0},other={TO:0,O:0,Sb:0};for(let n=0;n<10000;n++){const wb=randomGenetics('Hanoverian'),non=randomGenetics('Arabian');for(const [gene,allele]of [['tobiano','TO'],['overo','O'],['sabino','Sb']]){counts[allele]+=isPresent(wb[gene],allele);other[allele]+=isPresent(non[gene],allele);}if(![['tobiano','TO'],['overo','O'],['sabino','Sb'],['splash','SW'],['appaloosa','Lp'],['roan','Rn']].some(([gene,allele])=>isPresent(wb[gene],allele)))plain++;}for(const allele of ['TO','O','Sb'])if(!counts[allele]||counts[allele]>=other[allele]/3)throw Error('pattern frequency '+allele);if(plain<=5000)throw Error('plain coats not most common');const parent={genetics:randomGenetics('Hanoverian')};parent.genetics.tobiano='TO/TO';parent.genetics.sabino='Sb/Sb';if(foalGeneticsFromParents(parent,parent).tobiano!=='TO/TO'||foalGeneticsFromParents(parent,parent).sabino!=='Sb/Sb')throw Error('inheritance changed');
}`);
