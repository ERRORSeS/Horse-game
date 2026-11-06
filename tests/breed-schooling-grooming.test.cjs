const {check}=require('./behavior5-harness.cjs');
check('individual non-warmblood potential ceilings vary, persist, and allow rare small exceptions',`{
 resetGame();let exceptions=0,normal=0;
 for(const [breed,limits]of Object.entries(BREED_POTENTIAL_LIMITS)){
  const seen=new Set();for(let n=0;n<160;n++){
   const h=baseHorse('fully','npc');h.id=breed+'-potential-'+n;h.breed=breed;h.potential={jumping:100,dressage:100,eventing:100,hunter:100};delete h.breedPotentialProfile;applyBreedPotential(h);
   const before=JSON.stringify(h.breedPotentialProfile);seen.add(h.potential.jumping);
   for(const [d,maximum]of Object.entries(limits)){
    const index=auctionPotentialIndex(h,d),usual=SHOW_LEVELS[d].indexOf(maximum),exception=h.breedPotentialProfile.exceptions[d];
    if(index>usual+(exception?1:0)||exception&&index!==usual+1)throw Error('wrong ceiling '+breed+' '+d+' '+index);
    if(exception)exceptions++;else normal++;
   }
   for(const group of Object.values(h.stats))for(const skill of Object.keys(group))group[skill]=100;
   if(Number(SHOW_LEVELS.jumping[highestAllowedLevelIndex(h,'jumping')])>1.4||t2height(h)>1.4)throw Error('unlimited breed ability');
   applyBreedPotential(h);if(JSON.stringify(h.breedPotentialProfile)!==before)throw Error('rerolled ceiling');
   if(h.potential.eventing!==100||h.potential.hunter!==100)throw Error('unrequested discipline capped');
  }if(seen.size<40)throw Error('all horses assigned breed maximum');
 }
 if(!exceptions||exceptions>=normal/8)throw Error('exceptions missing or too common');
 const wb=baseHorse('fully');wb.breed='Hanoverian';wb.potential={jumping:100,dressage:100,eventing:100,hunter:100};applyBreedPotential(wb);if(wb.potential.jumping!==100||wb.potential.dressage!==100)throw Error('warmblood capped');
 const h=app.horses[0];h.breed='Friesian';h.potential={jumping:100,dressage:100,eventing:100,hunter:100};delete h.breedPotentialProfile;applyBreedPotential(h);const before=JSON.stringify(h.potential),profile=JSON.stringify(h.breedPotentialProfile),stats=JSON.stringify(h.stats);hydrateFromSave(JSON.parse(serializeAppState()));const restored=app.horses.find(x=>x.id===h.id);if(JSON.stringify(restored.potential)!==before||JSON.stringify(restored.breedPotentialProfile)!==profile||JSON.stringify(restored.stats)!==stats)throw Error('saved ceilings or current skills changed');
}`);
check('Friesian appearance is black or bay without any white or modifier markings, including old saves',`{
 for(let n=0;n<100;n++){const genes=randomGenetics('Friesian'),p=resolvePhenotypeFromGenetics(genes,'Friesian');if(!/Black|Bay/.test(p.coat)||p.marking!=='None'||p.marking2!=='None'||p.faceMarking!=='None'||Object.values(p.legMarkings).some(m=>m!=='None')||Object.values(p.modifiers).some(m=>m!=='None'))throw Error('Friesian appearance');if(countAllele(genes.extension,'e')===2||isPresent(genes.cream,'Cr')||isPresent(genes.tobiano,'TO'))throw Error('Friesian generated genes');}
 resetGame();const h=app.horses[0];h.breed='Friesian';h.coat='Cremello';h.marking='Tobiano';h.faceMarking='Blaze';h.legMarkings={FR:'Sock'};const genes=JSON.stringify(h.genetics);const sale=HorseSales.list(app,baseHorse('trained','npc'),10000,csDay());sale.horse.breed='Friesian';sale.horse.coat='Perlino';sale.horse.faceMarking='Blaze';hydrateFromSave(JSON.parse(serializeAppState()));const restored=app.horses.find(x=>x.id===h.id);if(!/Black|Bay/.test(restored.coat)||restored.marking!=='None'||restored.faceMarking!=='None'||Object.values(restored.legMarkings).some(x=>x!=='None')||JSON.stringify(restored.genetics)!==genes)throw Error('legacy coat or genes');const restoredSale=HorseSales.state(app).listings.find(l=>l.id===sale.id);if(!/Black|Bay/.test(restoredSale.horse.coat)||restoredSale.horse.faceMarking!=='None')throw Error('legacy sale appearance');const coat=restored.coat;hydrateFromSave(JSON.parse(serializeAppState()));if(app.horses.find(x=>x.id===h.id).coat!==coat)throw Error('saved Friesian shade rerolled');
}`);
check('warmblood champagne and double cream genes are much rarer while inheritance remains real',`{
 let wbChampagne=0,otherChampagne=0,wbCream=0,otherCream=0;
 for(let n=0;n<6000;n++){const wb=randomGenetics('Hanoverian'),other=randomGenetics('Arabian');wbChampagne+=isPresent(wb.champagne,'Ch');otherChampagne+=isPresent(other.champagne,'Ch');wbCream+=countAllele(wb.cream,'Cr')===2;otherCream+=countAllele(other.cream,'Cr')===2;}
 if(!wbChampagne||wbChampagne>=otherChampagne/4||!wbCream||wbCream>=otherCream/5)throw Error('rare coat rates');
 const h={genetics:{...randomGenetics('Hanoverian'),cream:'Cr/Cr',champagne:'Ch/Ch'}};const foal=foalGeneticsFromParents(h,h);if(foal.cream!=='Cr/Cr'||foal.champagne!=='Ch/Ch')throw Error('inheritance rewritten');
}`);
check('ordinary sale horses have varied schooling and ages three and four stay at or below 1.10m',`{
 resetGame();let high=0;const levels=new Set();
 for(const age of [3,4,5,6,12])for(let n=0;n<100;n++){
  const h=baseHorse('fully','npc');h.breed='Hanoverian';h.potential={jumping:100,dressage:100,eventing:100,hunter:100};h.age=age;applySalesAgeSkillBand(h);const level=Number(SHOW_LEVELS.jumping[highestAllowedLevelIndex(h,'jumping')]);if(age<=4&&level>1.1)throw Error('young sale too advanced');if(age>4){levels.add(level);if(level>=1.6)high++;}
 }
 if(levels.size<8||!high)throw Error('older sales lack variety');
 for(const h of app.npcSales)if(h.age<=4&&Number(SHOW_LEVELS.jumping[highestAllowedLevelIndex(h,'jumping')])>1.1)throw Error('generated advert age limit');
}`);
check('Normal and Elite auction age schooling bands are actual saved levels in all disciplines',`{
 resetGame();const seen=new Set();let unstarted=0,normalLow=0,eliteHigh=0;
 for(let n=0;n<12;n++){
  const c=auctionGenerate(n*1500,n%2);seen.add(c.tier);
  for(const l of c.lots){const h=l.horse,potential=JSON.stringify(h.potential);for(const d of Object.keys(SHOW_LEVELS)){
   const level=auctionLevel(h,d),band=auctionSchoolingBand(d,level);
   if(h.age<=3){if(level!=='Unstarted'||!h.requiresBreakingIn)throw Error('young auction started');unstarted++;continue;}
   if(h.age===4&&band!=='low'||h.age<7&&band==='high'||h.age>=7&&c.tier==='Elite'&&band==='low'||d==='dressage'&&level==='Level Two')throw Error('wrong auction band '+c.tier+' '+h.age+' '+d+' '+level);
   if(h.age>=7&&c.tier==='Normal'&&band==='low')normalLow++;
   if(h.age>=7&&c.tier==='Elite'&&band==='high')eliteHigh++;
   if(SHOW_LEVELS[d].indexOf(level)!==highestAllowedLevelIndex(h,d))throw Error('advertised schooling disagrees with actual eligibility');if(SHOW_LEVELS[d].indexOf(level)>auctionPotentialIndex(h,d))throw Error('schooling above potential');
  }if(l.current!==auctionLevel(h,l.discipline)||JSON.stringify(h.potential)!==potential)throw Error('false current or changed future ability');}
 }
 if(seen.size!==2||!unstarted||!normalLow||!eliteHigh)throw Error('missing tier or age variety');
 const snapshot=()=>JSON.stringify(auctionAllLots().map(l=>[l.id,l.current,l.startingPrice,l.reserve,l.schedule,l.horse.potential,l.horse.breedPotentialProfile,l.horse.stats,l.horse.requiresBreakingIn,l.horse.auctionSchoolingBand]));const before=snapshot();hydrateFromSave(JSON.parse(serializeAppState()));auctionAdvance(pastureCalendarHour());if(snapshot()!==before)throw Error('catalogue rerolled on load');
}`);
check('mane and tail cuts accept owned styling kits, preserve targets and grow back over time',`{
 resetGame();const h=app.horses[0],a=groomingEnsure(h),bond=h.bond,qol=calculateHorseQualityOfLife(h);groomingPurchase('Mane & Tail Styling Kit','Black',1,'cut-kit');a.maneLength=20;a.tailLength=90;a.targetLength=10;
 groomingAction(h,'cut-mane','Mane','',10);groomingAction(h,'trim-tail','Tail','',60);if(a.maneLength!==10||a.tailLength!==60||!groomingMarkup(h).includes('value="10"'))throw Error('cut or target failed');
 groomingAction(h,'trim-forelock','Mane','',6);groomingAction(h,'trim-forelock','Mane','',4);if(a.forelockLength!==4||a.maneLength!==10)throw Error('forelock not independent');let blocked=false;try{groomingAction(h,'trim-forelock','Mane','',5);}catch(e){blocked=true;}if(!blocked)throw Error('grew forelock by cutting');
 groomingAction(h,'cut-mane','Mane','',0);if(a.maneLength!==0)throw Error('no mane unavailable');let invalid=false;try{groomingAction(h,'trim-tail','Tail','',0);}catch(e){invalid=true;}if(!invalid)throw Error('zero tail allowed');
 hydrateFromSave(JSON.parse(serializeAppState()));const restored=app.horses.find(x=>x.id===h.id);if(restored.appearance.maneLength!==0||restored.appearance.tailLength!==60||restored.appearance.forelockLength!==4||restored.appearance.targetLength!==10)throw Error('cuts not saved');groomingEnsure(restored,csDay()+30);if(restored.appearance.maneLength<=0||restored.appearance.tailLength<=60)throw Error('growth missing');if(h.bond!==bond||calculateHorseQualityOfLife(h)!==qol)throw Error('protected stats changed');
}`);
