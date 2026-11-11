const {check}=require('./behavior5-harness.cjs');
check('all eight catalogs have real age-appropriate current schooling, histories and prices',`{
 resetGame();const at=pastureCalendarHour();auctionAdvance(at);const s=auctionState();if(s.collections.length!==8||s.nextAt!==at+720)throw Error('catalog cadence/count');
 const ranges={low:[15000,25000],medium:[30000,45000],high:[50000,100000]},ages={Schoolmaster:[8,99],Developing:[6,9],Green:[3,5],Foal:[0,3],Breeding:[10,20]};let starts=0,earnings=0;
 for(const c of s.collections)for(const l of c.lots){const h=l.horse,[min,max]=ages[l.lifeStage],band=auctionSchoolingBand(l.discipline,l.current);if(h.age<min||h.age>max)throw Error('age '+l.lifeStage);if(c.discipline&&l.discipline!==c.discipline)throw Error('exact discipline');if(c.breedGroup&&auction86Group(h.breed)!==c.breedGroup)throw Error('breed group');
  if(l.lifeStage==='Foal'){if(l.current!=='Unstarted'||h.showResults.length||!h.requiresBreakingIn)throw Error('foal career');}else{if(l.current==='Unstarted')throw Error('started category');if(h.age<=5&&band!=='low'||h.age===6&&band==='high')throw Error('age schooling');if(l.lifeStage==='Developing'&&band!=='medium'||['Breeding','Schoolmaster'].includes(l.lifeStage)&&band==='low')throw Error('category schooling '+l.id+' '+l.current);}
  if(l.lifeStage==='Breeding'&&!['Mare','Stallion'].includes(h.gender))throw Error('breeding sex');
  if(l.startingPrice<ranges[band][0]||l.startingPrice>ranges[band][1]||l.reserve!==l.startingPrice||l.current!==auctionLevel(h,l.discipline))throw Error('price/current');
  if(l.schedule.length>5||l.bidderCount>3||l.openAt!==c.previewAt+72)throw Error('bid rules');
  for(const r of h.showResults){const meet=careerState().meets[r.eventId];if(!meet||!meet.results.some(row=>row.horseId===h.id&&row.score===r.score)||meet.results.some(row=>row.points)||r.hour>=at)throw Error('not real historical scoring');starts++;}earnings+=h.competitionEarnings||0;
 }
 if(!starts||!earnings)throw Error('missing experience/earnings');Save3.validate(JSON.parse(serializeAppState()));const snapshot=JSON.stringify(s.collections);hydrateFromSave(JSON.parse(serializeAppState()));auctionAdvance(at);if(JSON.stringify(auctionState().collections)!==snapshot)throw Error('save reroll');console.log(JSON.stringify({collections:8,lots:auctionAllLots().length,starts,earnings}));
}`);
check('price endpoints and current-only age caps preserve future potential',`{
 const old=auctionRoll;try{for(const d of DISCIPLINES)for(const [band,levels]of Object.entries(AUCTION86_LEVELS[d]))for(const level of levels){const range={low:[15000,25000],medium:[30000,45000],high:[50000,100000]}[band];auctionRoll=()=>0;if(auctionSchoolingPrice(d,level,'a')!==range[0])throw Error('min');auctionRoll=()=>.999999;if(auctionSchoolingPrice(d,level,'a')!==range[1])throw Error('max');}}finally{auctionRoll=old;}
 for(const age of [3,4,5,6,7,10]){const h=baseHorse('elite','npc');h.age=age;delete h.auctionSchoolingBand;const potential=JSON.stringify(h.potential);auctionLimitTraining(h);if(JSON.stringify(h.potential)!==potential)throw Error('genetic potential changed');for(const d of DISCIPLINES)if(age<=5&&auctionSchoolingBand(d,auctionLevel(h,d))!=='low'||age===6&&auctionSchoolingBand(d,auctionLevel(h,d))==='high')throw Error('age cap');}
}`);
check('existing bids and contracts survive adopting the expanded catalog',`{
 resetGame();const c=auctionGenerate(pastureCalendarHour()),l=c.lots[0];l.bid=90000;l.leader='player';l.startingPrice=50000;l.reserve=50000;const before=JSON.stringify([l.bid,l.leader,l.startingPrice,l.reserve,l.schedule]);auctionAdvance(pastureCalendarHour());if(JSON.stringify([l.bid,l.leader,l.startingPrice,l.reserve,l.schedule])!==before)throw Error('committed bid rewritten');
}`);
