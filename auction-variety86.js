/* Expanded catalogs use the existing bidding, contract and transport engine. */
const AUCTION86_KINDS=['Sport Horse','Developing','Green Horse','Foal','Breeding','Warmblood','Pony','Exotic'];
// Three catalogs per cycle; rotate through the complete theme list over time.
function auctionCycleKinds87(cycle=auctionState().catalogCycle||0){return Array.from({length:3},(_,i)=>AUCTION86_KINDS[(cycle*3+i)%AUCTION86_KINDS.length]);}
function auctionLimitCatalogs87(s){if(s.collections.length<=3)return;
 const ranked=[...s.collections].sort((a,b)=>Number(b.lots.some(l=>l.leader==='player'))-Number(a.lots.some(l=>l.leader==='player'))),keep=new Set(ranked.slice(0,3).map(c=>c.id));
 s.deferredCollections87 ||= [];for(const c of s.collections.filter(c=>!keep.has(c.id))){if(c.status==='Closed'){s.history.push({id:c.id,name:c.name,country:c.country,closeAt:c.closeAt,lots:c.lots.map(l=>({id:l.id,number:l.number,name:l.horse.name,bid:l.bid,status:l.status}))});}else s.deferredCollections87.push(c);}
 s.collections=s.collections.filter(c=>keep.has(c.id));if(!keep.has(s.selectedCollection))s.selectedCollection=s.collections[0]?.id;
}
function auctionDeferred87(s,at){const c=s.deferredCollections87?.shift();if(!c)return null;const shift=at-c.previewAt;c.previewAt=at;c.openAt+=shift;c.closeAt+=shift;c.status='Preview';
 for(const lot of c.lots){lot.openAt+=shift;lot.closeAt+=shift;if(['Preview','Open'].includes(lot.status))lot.status='Preview';for(const event of lot.schedule)event.at+=shift;}
 s.collections.push(c);if(!s.collection)s.collection=c;s.nextAt=at+720;return c;
}
const AUCTION86_STAGES=['Schoolmaster','Developing','Green','Foal','Breeding'];
const AUCTION86_LEVELS={jumping:{low:['0.70','0.80','0.90','1.00'],medium:['1.10','1.20','1.30'],high:['1.40','1.50','1.60','1.70','1.80']},dressage:{low:['Introductory','Training','Level One'],medium:['Level Three','Level Four','Prix St Georges'],high:['Intermediate','Grand Prix']},eventing:{low:['Starter','Pre-Entry','Entry'],medium:['Pre-Training','Training','Preliminary'],high:['Intermediate','Advanced','Four Star']},hunter:{low:['Poles and Crosspoles','Novice','Pre-Green'],medium:['Green','Low','Medium'],high:['Modified','Regular','Working','Open']}};
function auction86Group(breed){return /pony|welsh|connemara|haflinger|fjord/i.test(breed)?'Pony':/warmblood|baden|hessen|gelderlander|zweibrucker|hanoverian|holstein|oldenburg|trakehner|westphal|rhineland|selle|belgian sport|irish sport|zangersheide|kwpn/i.test(breed)?'Warmblood':/arabian|thoroughbred|friesian|andalusian|lusitano|iberian|lipizzan|draft|draught|shire|clydesdale|percheron|belgian|suffolk|arden|brabant|boulonnais|comtois/i.test(breed)?'Exotic':'Other';}
function auction86Unstarted(h){return h.auctionLifeStage==='Foal'||h.auctionUnbroken||h.age<3||h.requiresBreakingIn;}
auctionSchoolingBand=function(d,level){if(level==='Unstarted')return 'low';if(d==='dressage'&&level==='Level Two')return 'medium';return Object.keys(AUCTION86_LEVELS[d]).find(b=>AUCTION86_LEVELS[d][b].includes(level))||'low';};
auctionSchoolingLimit=function(h,d){const band=h.age<=5||h.auctionSchoolingBand==='low'?'low':h.age<7||h.auctionSchoolingBand==='medium'?'medium':'high';return Math.max(...AUCTION86_LEVELS[d][band].map(l=>SHOW_LEVELS[d].indexOf(l)));};
auctionLevel=function(h,d,potential=false){if(potential)return SHOW_LEVELS[d][auctionPotentialIndex(h,d)];if(auction86Unstarted(h))return 'Unstarted';const max=Math.min(auctionSchoolingLimit(h,d),highestAllowedLevelIndex(h,d));return SHOW_LEVELS[d].filter((l,i)=>i<=max).at(-1)||SHOW_LEVELS[d][0];};
auctionSchoolingPrice=function(d,level,key){const [min,max]={low:[15000,25000],medium:[30000,45000],high:[50000,100000]}[auctionSchoolingBand(d,level)];return min+Math.floor(auctionRoll(key+':schooling-price')*((max-min)/250+1))*250;};
function auction86Horse(key,age,group,stage,d){
 const breeds=BREEDS.filter(b=>!group||auction86Group(b)===group),saved=[...BREEDS],random=Math.random;let count=0;Math.random=()=>auctionRoll(key+':candidate-random:'+count++);
 try{BREEDS.splice(0,BREEDS.length,...breeds);for(let attempt=0;attempt<96;attempt++){
  const h=baseHorse(stage==='Foal'?'untrained':'trained','npc');h.id=key+':candidate:'+attempt+':horse';h.age=age;h.birthYear=pastureDate(auction86GenerationHour).year-age;h.birthDate={year:h.birthYear,month:1,day:1};if(group==='Pony'){const hands=11+Math.floor(auctionRoll(key+':pony-hands')*4),inches=Math.floor(auctionRoll(key+':pony-inches')*(hands===14?3:4));h.height=hands+'.'+inches+' hh';h.measuredHeightCm=Math.round(hands*10.16+inches*2.54);h.pony=true;}h.auctionLifeStage=stage;h.isAuctionHorse=true;h.auctionTier='Normal';delete h.breedPotentialProfile;applyBreedPotential(h);
  if(stage==='Breeding')h.gender=auctionRoll(key+':sex')<.65?'Mare':'Stallion';
  if(stage==='Foal'){h.requiresBreakingIn=true;h.auctionUnbroken=true;h.auctionSchoolingBand='unstarted';h.behavior=Math.min(149,h.behavior||0);for(const g of Object.values(h.stats))for(const k of Object.keys(g))g[k]=0;HorseHealth.seedSaleHealth(h,Math.floor(auction86GenerationHour/24));return h;}
  const bands=stage==='Green'?['low']:stage==='Developing'?['medium']:['medium','high'];
  const available=bands.flatMap(band=>AUCTION86_LEVELS[d][band].filter(level=>requiredSkillBand(d,level)[0]<=h.potential[d]).map(level=>({band,level})));
  if(!available.length)continue;const choice=available[Math.floor(auctionRoll(key+':level:'+attempt)*available.length)],index=SHOW_LEVELS[d].indexOf(choice.level),min=requiredSkillBand(d,choice.level)[0],next=SHOW_LEVELS[d][index+1],score=min+(next?requiredSkillBand(d,next)[0]-min:100-min)*.75-(h.extraPotential?3:0);
  for(const [g,values]of Object.entries(h.stats))for(const k of Object.keys(values))values[k]=Math.max(0,Math.min(h.potential[g],score));
  h.auctionSchoolingBand=choice.band;if(age===3){h.manualRidabilityOverride=true;h.ridingEducationOverride=true;}h.requiresBreakingIn=false;h.unridable=false;h.behavior=Math.max(500,h.behavior||0);restoreBasicRidingEducation(h);syncRidability(h);
  HorseHealth.seedSaleHealth(h,Math.floor(auction86GenerationHour/24));if(!canCompeteUnderSaddle(h)||HorseHealth.allowed(h,'competition',3)||!AUCTION86_LEVELS[d][choice.band].includes(auctionLevel(h,d)))continue;return h;
 }}finally{BREEDS.splice(0,BREEDS.length,...saved);Math.random=random;}
 throw Error('No eligible '+stage+' '+(group||'mixed-breed')+' horse could be generated for '+d+'.');
}
let auction86GenerationHour=0;
function auction86Seller(collection,d){
 const roster=careerRoster(),id=collection.id+':seller:'+d;let rider=roster.find(r=>r.id===id);if(rider)return rider;
 const name=careerUniqueRiderName(id,careerCountry(collection.country),new Set(roster.map(r=>r.name)));
 rider={id,name,country:careerCountry(collection.country),specialty:d,birth:{year:pastureDate(collection.previewAt).year-35,month:1,day:1},stage:4,skill:80,potential:95,professional:true,horses:[],retiredHorses:[],starts:0,training:[],resources85:150000};roster.push(rider);return rider;
}
const AUCTION86_RIVAL_POOLS=new WeakMap();
function auction86Rivals(event,owner){const world=careerState();let cache=AUCTION86_RIVAL_POOLS.get(world);if(!cache||cache.at!==auction86GenerationHour){cache={at:auction86GenerationHour,pools:new Map()};AUCTION86_RIVAL_POOLS.set(world,cache);}const key=event.discipline+'|'+event.level+'|'+event.date.year;
 if(!cache.pools.has(key))cache.pools.set(key,careerNpcField(event,0,null,true).filter(pair=>!pair.rider.id.includes(':seller:')));
 const pool=cache.pools.get(key),field=[],offset=Math.floor(careerRoll(event.id,'rival-offset')*pool.length);
 for(let i=0;i<pool.length&&field.length<7;i++){const pair=pool[(offset+i)%pool.length],r=pair.rider;if(r.id===owner.id||careerBusy(r.recentStarts||[],event))continue;const horse=npc85ChooseHorse(r,r.horses.filter(h=>!careerEligibility(event,r,h,{npc:true,history:[]})),event);if(horse)field.push({rider:r,horse,score:(r.skill+npc85HorseSkill(horse,event.discipline))/2});}return field;
}
function auction86History(h,lot,collection){
 if(lot.lifeStage==='Foal')return;const count=lot.lifeStage==='Green'?(h.age===3?0:Math.floor(auctionRoll(lot.id+':starts')*3)):lot.lifeStage==='Developing'?3+Math.floor(auctionRoll(lot.id+':starts')*5):8+Math.floor(auctionRoll(lot.id+':starts')*9),rider=auction86Seller(collection,lot.discipline);h.owner=rider.name;h.ownerId=rider.id;npc85Initialize(rider,h);rider.horses.push(h);npc85Registry().horses.set(h.id,h);lot.seller=rider.name;h.showResults=[];h.competitionResults=[];h.competitionEarnings=0;
 for(let i=0;i<count;i++){
  let at=collection.previewAt-(count-i)*72-lot.number*24;const event={...careerEvent({id:lot.id+':prior-start:'+i,name:'Seller Competition · '+auctionDisciplineName(lot.discipline),discipline:lot.discipline,level:lot.current,division:'senior',tier:3,official:true,ranking:'none',base:0,minField:8,cutoff:24,month:pastureDate(at).month,day:pastureDate(at).day,country:rider.country},pastureDate(at).year),at,prizeMoney:lot.lifeStage==='Breeding'?3000:1200};
  if(event.phaseSchedule)event.phaseSchedule={dressage:at,'cross-country':at+4,showjumping:at+6};
  while(careerBusy(rider.auctionSpans86||[],event)){at-=24;event.at=at;if(event.phaseSchedule)event.phaseSchedule={dressage:at,'cross-country':at+4,showjumping:at+6};}event.date=pastureDate(at);
  const priorAge=pastureDate(at).year-h.birthYear;if(priorAge<4)continue;if(priorAge<=5)event.level=AUCTION86_LEVELS[lot.discipline].low.includes(lot.current)?lot.current:AUCTION86_LEVELS[lot.discipline].low.at(-1);
  event.tier=3;event.minimumSkill=requiredSkillBand(lot.discipline,event.level)[0];
  const rivals=auction86Rivals(event,rider),pairs=[{rider,horse:h,score:(rider.skill+effectiveDisciplineSkill(h,lot.discipline))/2},...rivals];
  const entries=pairs.map((pair,index)=>careerNpcEntry(event,pair,index)),show={id:event.id,discipline:lot.discipline,level:event.level,round:lot.discipline==='eventing'?2:0,competitors:entries};
  for(const entry of entries)for(const phase of CAREER_PHASES[lot.discipline])entry.scores[phase]=showScore(show,entry,phase);
  const standings=showStandings(show),row=standings.find(e=>e.horseId===h.id),meet=careerRecordMeet(event,standings,null,{ranked:false}),result=meet.results.find(r=>r.horseId===h.id),earnings=result.placing&&result.placing<=6?Math.round(event.prizeMoney/result.placing):0;
  const record={eventId:event.id,horseId:h.id,riderId:rider.id,discipline:lot.discipline,level:event.level,hour:at,score:row.total,placing:result.placing,status:result.status,eliminated:result.eliminated,prize:earnings,source:'Simulated seller competition',resultText:showResultText(row.result)};h.showResults.push(record);h.competitionResults.push({...record});h.competitionEarnings+=earnings;meet.auctionSellerMeet86=true;(rider.auctionSpans86 ||= []).push({start:at,end:careerEventEnd(event)});

 }
 h.auctionListed86=true;lot.recordedStarts=h.showResults.length;auctionLimitTraining(h);
}
auctionGenerate=function(at,slot=0,kind='Sport Horse',tier=slot%2?'Elite':'Normal'){
 const state=auctionState();if(state.collections.length>=3)return null;const deferred=auctionDeferred87(state,at);if(deferred)return deferred;
 const s=state,id='collection:'+ ++s.sequence,breedGroup=['Warmblood','Pony','Exotic'].includes(kind)?kind:null,stage=breedGroup?AUCTION86_STAGES[Math.floor(auctionRoll(id+':stage')*5)]:({ 'Sport Horse':'Schoolmaster','Green Horse':'Green',Foal:'Foal',Developing:'Developing',Breeding:'Breeding'}[kind]||'Schoolmaster'),discipline=auctionRoll(id+':mixed')<.45?null:DISCIPLINES[Math.floor(auctionRoll(id+':discipline')*4)],country=AUCTION_COUNTRIES[Math.floor(auctionRoll(id+'country')*AUCTION_COUNTRIES.length)][0],size=kind==='Sport Horse'?28+Math.floor(auctionRoll(id+'size')*8):8+Math.floor(auctionRoll(id+'size')*5),theme=(breedGroup?breedGroup+' · ':'')+(stage==='Breeding'?'Broodmares & Studs':stage==='Foal'?'Foals & Youngstock':stage+' Horses')+' · '+(discipline?auctionDisciplineName(discipline):'Mixed Disciplines'),c={id,kind,lifeStage:stage,breedGroup,discipline,theme,country,tier,name:tier+' · '+theme,previewAt:at,openAt:at+72,closeAt:at+192+slot*6,status:'Preview',lots:[],varietyVersion86:1};
 const mixedOrder=[...DISCIPLINES].sort((a,b)=>auctionRoll(id+':order:'+a)-auctionRoll(id+':order:'+b));auction86GenerationHour=at;
 for(let n=1;n<=size;n++){
  const key=id+':lot:'+n,d=discipline||(n<=4?mixedOrder[n-1]:DISCIPLINES[Math.floor(auctionRoll(key+':discipline')*4)]),range={Schoolmaster:[8,19],Developing:[6,9],Green:[3,5],Foal:[0,3],Breeding:[10,20]}[stage],age=range[0]+Math.floor(auctionRoll(key+':age')*(range[1]-range[0]+1)),h=auction86Horse(key,age,breedGroup,stage,d);
  h.auctionTier=tier;h.owner='International breeder';h.showResults=[];h.competitionResults=[];h.isAuctionHorse=true;
  let current=auctionLevel(h,d);const ceiling=auctionPotentialIndex(h,d),accuracy=auctionPick([['close',60],['optimistic',20],['conservative',15],['inaccurate',5]],key+'estimate'),offset=accuracy==='close'?0:accuracy==='optimistic'?1:-1,estimate=SHOW_LEVELS[d][clamp(ceiling+offset,0,SHOW_LEVELS[d].length-1)],price=auctionSchoolingPrice(d,current,key),mean=Object.values(h.potential).reduce((a,b)=>a+b,0)/4,quality=mean>=86?'Rare elite':mean>=78?'Exceptional prospect':mean>=70?'Strong prospect':mean>=60?'Promising':'Ordinary';
  const lot={schoolingPricingVersion:3,ridingEducationVersion:2,tier,id:key,number:n,collectionId:id,horseId:h.id,horse:h,quality,lifeStage:stage,breedGroup:auction86Group(h.breed),experience:stage==='Foal'?'Unstarted; no competition experience':stage,discipline:d,current,estimate,accuracy,origin:auctionShipping(country),country,seller:country+' Sport Breeder '+n,startingPrice:price,reserve:price,bid:0,leader:null,bidCount:0,history:[],status:'Preview',openAt:c.openAt,closeAt:c.closeAt,schedule:[],cursor:0};
  auction86History(h,lot,c);lot.current=auctionLevel(h,d);lot.startingPrice=lot.reserve=auctionSchoolingPrice(d,lot.current,key);
  const count=1+Math.floor(auctionRoll(key+'buyers')*3),buyers=Array.from({length:count},(_,i)=>({id:'Buyer '+(i+1),max:Math.round(lot.startingPrice*(.7+auctionRoll(key+'budget'+i)*.65)/250)*250}));
  const interest={Ordinary:.25,Promising:.4,'Strong prospect':.55,'Exceptional prospect':.7,'Rare elite':.7}[quality];for(let i=0;i<5;i++)if(auctionRoll(key+'opportunity'+i)<interest){const buyer=buyers[Math.floor(auctionRoll(key+'bidder'+i)*buyers.length)];lot.schedule.push({at:c.openAt+1+Math.floor(auctionRoll(key+'time'+i)*119),bidder:buyer.id,max:buyer.max});}lot.schedule.sort((a,b)=>a.at-b.at);lot.bidderCount=count;auctionEstimatedLevels(lot);c.lots.push(lot);
 }
 s.collections.push(c);if(!s.collection)s.collection=c;s.nextAt=at+720;return c;
};
// Existing catalogs and bids are retained. New cycles show three collections, rotating through all eight themes.
const AUCTION86_ADVANCE=auctionAdvance;
auctionAdvance=function(target){const s=auctionState();if(s.processing)return;auctionLimitCatalogs87(s);if(s.collections.length&&s.nextAt>s.collections[0].previewAt+720)s.nextAt=Math.max(...s.collections.map(c=>c.closeAt),s.collections[0].previewAt+720);
 // Let the established clock process bids and transport, then fill the cycle with additional collections.
 const result=AUCTION86_ADVANCE(target);const current=s.collections;
 if(current.length&&current.some(c=>c.varietyVersion86===1))for(const kind of auctionCycleKinds87(Math.max(0,(s.catalogCycle||1)-1)))if(!current.some(c=>c.kind===kind))auctionGenerate(current[0].previewAt,current.length,kind,auctionRoll(current[0].id+':tier:'+kind)<.5?'Normal':'Elite');
 return result;
};
const AUCTION86_UPGRADE=auctionUpgradeSchooling;
auctionUpgradeSchooling=function(l){if(l.schoolingPricingVersion===3)return;return AUCTION86_UPGRADE(l);};
const AUCTION86_ELIGIBLE=npc85HorseEligible;
npc85HorseEligible=function(r,h,event){return !h.auctionListed86&&AUCTION86_ELIGIBLE(r,h,event);};
const AUCTION86_CONTRACT=auctionContract;
auctionContract=function(id,action,...args){const prior=auctionState().contracts.find(c=>c.id===id),wasDelivered=prior?.delivered,result=AUCTION86_CONTRACT(id,action,...args);if(prior?.delivered&&!wasDelivered){prior.horse.auctionListed86=false;(prior.horse.ownershipHistory ||= []).push({day:csDay(),from:prior.seller,to:'Your Stable',transactionId:prior.id,price:prior.bid});npc85PlayerTransfer(app,{direction:'buy'},null,prior.horse,csDay());}return result;};
const AUCTION86_CLOSE=auctionClose;
auctionClose=function(collection){const wasClosed=collection.status==='Closed',result=AUCTION86_CLOSE(collection);if(wasClosed||collection.status!=='Closed')return result;
 const registry=npc85Registry();
 for(const lot of collection.lots){if(!collection.varietyVersion86)continue;const h=lot.horse;if(lot.status==='Won')continue;h.auctionListed86=false;
  if(lot.status==='Lost'){const rider=registry.riders.get(h.ownerId);if(rider){rider.resources85+=lot.bid;rider.horses=rider.horses.filter(row=>row.id!==h.id);npc85Remember(rider,h,Math.floor(collection.closeAt/24),'Sold at auction');}if(h.assignedRiderId)(h.formerRiderIds ||= []).push(h.assignedRiderId);(h.ownershipHistory ||= []).push({day:Math.floor(collection.closeAt/24),from:h.owner,to:lot.leader,price:lot.bid,auctionLotId:lot.id});h.owner='Auction buyer '+lot.leader;h.ownerId='auction-buyer:'+lot.id+':'+lot.leader;h.assignedRiderId=null;}
  if((h.showResults||[]).length&&!registry.riders.get(h.ownerId)?.horses.some(row=>row.id===h.id))npc85State().npcArchive85[h.id]=h;
 }npc85Registry(true);return result;
};
const AUCTION86_FUNDED_CONTRACT=auctionContract;
auctionContract=function(id,action,...args){const c=auctionState().contracts.find(c=>c.id===id),wasPaid=c?.paid,result=AUCTION86_FUNDED_CONTRACT(id,action,...args);if(c?.paid&&!wasPaid&&!c.sellerPaid86){const rider=npc85Registry().riders.get(c.horse.ownerId);if(rider)rider.resources85+=c.bid;c.sellerPaid86=true;}return result;};
// Auction lots hold the full record; seller rosters serialize references and recover by ID.
const AUCTION86_SERIALIZE=serializeAppState;
serializeAppState=function(...args){if(!app.auctions3?.collections?.length)return AUCTION86_SERIALIZE(...args);const current=new Set([...auctionAllLots(),...(app.auctions3.deferredCollections87||[]).flatMap(c=>c.lots)].map(l=>l.horseId)),restored=[];
 for(const rider of app.career?.npcs||[])if(rider.horses?.some(h=>current.has(h.id))){restored.push([rider,rider.horses]);rider.horses=rider.horses.map(h=>current.has(h.id)?{id:h.id}:h);}
 try{return AUCTION86_SERIALIZE(...args);}finally{for(const [rider,horses]of restored)rider.horses=horses;}
};
