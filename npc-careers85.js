/* Stable identities and partnerships extend the existing career roster and sales ledger. */
const NPC85_INDEX=new WeakMap();
function npc85State(){const w=careerState();w.npcArchive85 ||= {};w.npcDiagnostics85 ||= {missing:[],duplicateNames:[]};return w;}
function npc85Registry(force=false){
 const w=npc85State(),roster=w.npcs||[],size=roster.length+(app.horses?.length||0)+(app.saleBarn?.length||0)+(app.npcSales?.length||0)+(app.rescueHorses?.length||0)+(app.rescueBarn?.length||0)+(app.npcStuds?.length||0)+(app.auctions3?.contracts?.length||0)+(app.auctions3?.sequence||0)+(app.sales2?.listings?.length||0)+Object.keys(w.npcArchive85).length;
 let index=NPC85_INDEX.get(w);if(!force&&index?.size===size&&index.roster===roster)return index;
 index={size,roster,riders:new Map(roster.map(r=>[r.id,r])),horses:new Map()};
 const playerIds=new Set((app.horses||[]).map(h=>h.id));
 const add=h=>{if(!h?.id||!(h.skills||h.stats))return;const old=index.horses.get(h.id),latest=horse=>Math.max(horse.retiredAt85||-1,...(horse.ownershipHistory||[]).map(row=>row.day??-1));if(!old||!playerIds.has(h.id)&&latest(h)>latest(old))index.horses.set(h.id,h);};
 for(const h of app.horses||[])add(h);for(const pool of [app.saleBarn,app.npcSales,app.rescueHorses,app.rescueBarn,app.npcStuds])for(const h of pool||[])add(h);for(const c of app.auctions3?.contracts||[])add(c.horse);for(const c of app.auctions3?.collections||[])for(const lot of c.lots||[])add(lot.horse);for(const r of roster){for(const h of r.horses||[])add(h);for(const h of r.retiredHorses||[])add(h);}for(const h of Object.values(w.npcArchive85))add(h);for(const l of app.sales2?.listings||[])add(l.horse);
 NPC85_INDEX.set(w,index);return index;
}
function npc85Nationality(rider){return rider?.country||'GBR';}
function npc85Initialize(rider,h){
 rider.horses ||= [];rider.retiredHorses ||= [];rider.partnershipHistory85 ||= [];
 rider.resources85 ??= [5000,16000,40000,90000,180000,350000][rider.stage??0];
 if(!h)return;
 if(h.stats)h.skills=Object.fromEntries(DISCIPLINES.map(d=>[d,effectiveDisciplineSkill(h,d)]));
 h.ownerId ||= !h.owner||h.owner===rider.name?rider.id:'external-owner:'+stableTextHash(h.owner);h.owner ||= rider.name;h.assignedRiderId ||= rider.id;h.formerRiderIds ||= [];h.competitionHistory85 ||= [];h.medicalConditions ||= [];
 h.potential ||= Object.fromEntries(DISCIPLINES.map(d=>[d,Math.max(h.skills?.[d]||0,Math.min(100,rider.potential||h.skills?.[d]||60))]));
}
function npc85Remember(rider,h,day,relationship){
 rider.partnershipHistory85 ||= [];if(!rider.partnershipHistory85.some(row=>row.horseId===h.id&&row.relationship===relationship))rider.partnershipHistory85.push({horseId:h.id,name:h.name,day,relationship});
}
function npc85Repair(){
 const w=npc85State();if(!w.npcs)return;
 for(const r of w.npcs){npc85Initialize(r);for(const h of r.horses)npc85Initialize(r,h);}
 const index=npc85Registry(true),latest=new Map();
 for(const h of app.horses||[])if(h.owner==='Your Stable'){h.ownerId='Your Stable';if(!h.assignedRiderId||index.riders.has(h.assignedRiderId)){if(h.assignedRiderId)(h.formerRiderIds ||= []).push(h.assignedRiderId);h.assignedRiderId=careerRider().id;}}
 // JSON saves can contain several copies of the same ID; restore shared references to the canonical record.
 for(const r of w.npcs){r.horses=r.horses.map(h=>index.horses.get(h.id)||h).filter(h=>{if(h.assignedRiderId===r.id&&!h.retiredForever)return true;npc85Remember(r,h,csDay(),'Former rider');return false;});r.retiredHorses=r.retiredHorses.map(h=>index.horses.get(h.id)||h);}
 for(const l of app.sales2?.listings||[])if(index.horses.has(l.horseId))l.horse=index.horses.get(l.horseId);
 for(const id of Object.keys(w.npcArchive85))if(index.horses.has(id))w.npcArchive85[id]=index.horses.get(id);
 const riderIds=new Map();for(const r of w.npcs)riderIds.set(r.id,(riderIds.get(r.id)||0)+1);w.npcDiagnostics85.duplicateIds=[...riderIds].filter(([,n])=>n>1).map(([id,count])=>({id,count}));
 for(const meet of Object.values(w.meets||{}))for(const row of meet.results||[]){if(row.player||!row.riderId||!row.horseId)continue;const key=row.riderId+'|'+row.horseId;if(!latest.has(key)||latest.get(key).day<meet.hour/24)latest.set(key,{...row,day:meet.hour/24});}
 for(const row of latest.values()){
  const rider=index.riders.get(row.riderId),h=index.horses.get(row.horseId);if(!rider)continue;
  if(!h){if(!w.npcDiagnostics85.missing.some(m=>m.riderId===rider.id&&m.horseId===row.horseId))w.npcDiagnostics85.missing.push({riderId:rider.id,horseId:row.horseId,name:row.horseName,kind:'Historical horse record unavailable'});continue;}
  if(h.assignedRiderId===rider.id&&!h.retiredForever&&h.owner!=='Your Stable'){if(!rider.horses.some(horse=>horse.id===h.id))rider.horses.push(h);}
  else npc85Remember(rider,h,row.day,'Former rider');
 }
 const names=new Map();for(const r of w.npcs){const name=String(r.name||r.id).toLocaleLowerCase();if(!names.has(name))names.set(name,[]);names.get(name).push(r.id);}
 w.npcDiagnostics85.duplicateNames=[...names].filter(([,ids])=>ids.length>1).slice(0,100).map(([name,ids])=>({name,ids}));
 for(const [key,rows]of Object.entries(w.rankings||{})){
  const type=key.split('|')[0];if(['horse','young-horse','combination','team'].includes(type))continue;
  for(const row of rows){const rider=index.riders.get(row.id);if(rider)row.country=npc85Nationality(rider);}
 }
 w.npcPartnershipVersion85=1;npc85Registry(true);
}
function npc85HorseAge(h,at){return Number.isFinite(h.birthYear)?pastureDate(at).year-h.birthYear:h.age;}
function npc85HorseSkill(h,d){return h.stats?effectiveDisciplineSkill(h,d):Number(h.skills?.[d])||0;}
function npc85HorseEligible(rider,h,event){
 if(!h?.id||!h.name||h.deceased||h.retiredForever||h.retiredToBreeding||h.owner==='Your Stable'||h.assignedRiderId&&h.assignedRiderId!==rider.id)return false;
 if(h.stats&&!canCompeteUnderSaddle(h))return false;
 if((h.medicalConditions||[]).some(c=>!c.resolved&&(c.severity==='major'||HorseHealth.definition(c).restriction)))return false;
 if((h.illnesses||[]).some(c=>c.active)||h.fatigue>=70)return false;
 const age=npc85HorseAge(h,event.at);if(age<4||age>24)return false;
 if(!rankingSchoolingAge86(h,event.discipline,event.level,event.at))return false;
 if(careerBusy(h.recentStarts85||[],event))return false;
 return npc85HorseSkill(h,event.discipline)>=(event.minimumSkill??requiredSkillBand(event.discipline,event.level)[0]);
}
function npc85ChooseHorse(rider,candidates,event){
 for(const h of candidates)npc85Initialize(rider,h);
 const eligible=candidates.filter(h=>npc85HorseEligible(rider,h,event)),day=Math.floor(event.at/24),target=event.minimumSkill??requiredSkillBand(event.discipline,event.level)[0];
 return eligible.sort((a,b)=>{
  const fit=h=>Math.abs(npc85HorseSkill(h,event.discipline)-(target+8))*.25+(h.competitionHistory85||[]).filter(r=>day-r.day>=0&&day-r.day<30&&r.discipline===event.discipline).length*12;
  return fit(a)-fit(b)||a.id.localeCompare(b.id);
 })[0]||null;
}
const NPC85_FIELD=careerNpcField;
careerNpcField=function(event,limit,player=null,selectionPool=false){
 const field=NPC85_FIELD(event,limit,player,selectionPool).map(pair=>{if(event.allocated&&!selectionPool&&pair.horse.id===event.id+':allocated:'+pair.rider.id){const archive=npc85State().npcArchive85;let h=archive[pair.horse.id];if(!h){const source=pair.horse;h={id:source.id,name:source.name,birthYear:source.birthYear,age:source.age,height:source.height,breed:source.breed,personality:source.personality,skills:{...source.skills}};h.owner='Event schoolmaster pool';h.ownerId='event-pool:'+event.id;h.assignedRiderId=pair.rider.id;archive[h.id]=h;}pair={...pair,horse:h};}return pair;}).filter(pair=>npc85HorseEligible(pair.rider,pair.horse,event));
 if(selectionPool||event.allocated||event.team||event.games||!(event.maxHorsesPerRider>1))return field;
 const expanded=[],counts=new Map(),mounts=new Map(),cap=event.quota||(event.tier>=5?3:Infinity),baseCount=Math.max(1,Math.ceil(limit*.82));if(player)counts.set(player.country,1);
 const add=pair=>{const country=npc85Nationality(pair.rider);if(expanded.length>=limit||(counts.get(country)||0)>=cap||expanded.some(p=>p.horse.id===pair.horse.id))return false;expanded.push(pair);counts.set(country,(counts.get(country)||0)+1);mounts.set(pair.rider.id,(mounts.get(pair.rider.id)||0)+1);return true;};
 for(const pair of field.slice(0,baseCount))add(pair);
 for(const pair of [...expanded].sort((a,b)=>careerRoll(event.id,a.rider.id)-careerRoll(event.id,b.rider.id))){while((mounts.get(pair.rider.id)||0)<event.maxHorsesPerRider&&expanded.length<limit){const candidates=pair.rider.horses.filter(h=>!expanded.some(p=>p.horse.id===h.id)&&!careerEligibility(event,pair.rider,h,{npc:true,history:[]})),horse=npc85ChooseHorse(pair.rider,candidates,event);if(!horse||!add({...pair,horse,score:(pair.rider.skill+npc85HorseSkill(horse,event.discipline))/2}))break;}}
 for(const pair of field.slice(baseCount))if(expanded.length<limit)add(pair);return expanded;
};
const NPC85_RECORD=careerRecordMeet;
careerRecordMeet=function(event,standings,player=null,...args){
 const prior=app.career?.meets[event.id],result=NPC85_RECORD(event,standings,player,...args);if(prior||event.sandbox||args[0]?.recovery)return result;
 const index=npc85Registry();for(const row of result.results){if(row.player)continue;const rider=index.riders.get(row.riderId),h=index.horses.get(row.horseId);if(!rider||!h)continue;
  const development85=h.stats?Math.max(0,(h.skills?.[event.discipline]||0)-effectiveDisciplineSkill(h,event.discipline)):0;npc85Initialize(rider,h);h.competitionHistory85.push({eventId:event.id,day:Math.floor(event.at/24),discipline:event.discipline,level:event.level,riderId:rider.id,placing:row.placing,score:row.score});h.competitionHistory85=h.competitionHistory85.slice(-100);
  h.recentStarts85=[...(h.recentStarts85||[]),{start:event.at,end:careerEventEnd(event),country:event.federation||careerCountry(event.country)}].sort((a,b)=>a.start-b.start).slice(-32);
  if(row.placing){const prize=row.placing<=6?Math.round((event.prizeMoney||0)/row.placing):0;rider.resources85+=prize;
   if(h.stats){for(const group of ['jumping','dressage'].filter(group=>!['jumping','dressage'].includes(event.discipline)||group===event.discipline))for(const skill of Object.keys(h.stats[group]||{})){const ceiling=h.potential?.[group]??100;if(h.stats[group][skill]<ceiling)h.stats[group][skill]=Math.min(ceiling,h.stats[group][skill]+development85+.08);}h.skills=Object.fromEntries(DISCIPLINES.map(d=>[d,effectiveDisciplineSkill(h,d)]));}
   else if(h.skills){const ceiling=h.potential?.[event.discipline]??rider.potential;h.skills[event.discipline]=Math.min(ceiling,h.skills[event.discipline]+.08);}
  }
  npc85Remember(rider,h,Math.floor(event.at/24),h.ownerId===rider.id?'Owner and rider':'Assigned rider');
 }
 return result;
};
function npc85Retire(rider,h,day){
 if(h.retiredForever)return false;npc85Initialize(rider,h);h.retiredForever=true;h.retiredAt85=day;h.status85='Retired';
 rider.horses=rider.horses.filter(row=>row.id!==h.id);if(!rider.retiredHorses.some(row=>row.id===h.id))rider.retiredHorses.push(h);npc85Remember(rider,h,day,'Retired partnership');return true;
}
careerRefreshPartnerships=function(year){
 const w=npc85State();if(w.partnershipYear===year)return;const roster=careerRoster();careerAddYouthCohort(year,roster);
 for(const r of roster){npc85Initialize(r);if(year-r.birth.year>=68)r.retired=true;
  for(const h of [...r.horses]){npc85Initialize(r,h);if(npc85HorseAge(h,pastureCalendarHour(year,1,1,0))>21||(h.medicalConditions||[]).some(c=>!c.resolved&&c.chronic&&HorseHealth.definition(c).restriction==='all'))npc85Retire(r,h,Math.floor(pastureCalendarHour(year,1,1,0)/24));}
  r.ageHistory ||= {};r.ageHistory[year]=careerDivisions(r,pastureCalendarHour(year,1,1,0));
 }
 w.partnershipYear=year;npc85Registry(true);
};
function npc85Materialize(h,rider){
 if(h.stats)return h;
 let counter=0;const random=Math.random;Math.random=()=>careerRoll(h.id,'materialize85:'+counter++);
 try{const defaults=baseHorse('trained','npc');for(const [key,value]of Object.entries(defaults))if(value!==undefined&&h[key]===undefined&&!/sire|dam|parent|pedigree|ancestor|genetics|bredBy|name|birth|breedPotential/i.test(key))h[key]=HorseHealth.copy(value);
  h.registeredName ||= h.name;h.genetics ||= randomGenetics(h.breed);for(const [group,skills]of Object.entries(h.stats))for(const key of Object.keys(skills))skills[key]=h.skills[group]||0;
  h.owner=rider?.name||h.owner;h.age=npc85HorseAge(h,pastureCalendarHour());return h;
 }finally{Math.random=random;}
}
function npc85Buy(rider,l,day,eventId){
 const prior=HorseSales.state(app).npcTransfers85?.[eventId];if(prior)return {ok:true,transfer:prior};
 const index=npc85Registry(),seller=index.riders.get(l.horse.ownerId);npc85Initialize(rider);
 const result=HorseSales.transferNpc(app,l.id,rider,seller,day,eventId);if(!result.ok)return result;
 const h=l.horse;npc85Initialize(rider,h);if(seller){seller.horses=seller.horses.filter(row=>row.id!==h.id);npc85Remember(seller,h,day,'Former owner and rider');}
 if(!rider.horses.some(row=>row.id===h.id))rider.horses.push(h);npc85Remember(rider,h,day,'Purchased and assigned');npc85Registry(true);return result;
}
function npc85MarketMonth(month){
 const w=npc85State();w.npcMarketMonths85 ||= {};if(!careerActive()||!w.settings.progression||w.npcMarketMonths85[month])return;w.npcMarketMonths85[month]=true;
 const day=month*30,roster=careerRoster();
 // Existing markets supply finite, priced horses; no free replacements are generated.
 const candidates=roster.filter(r=>!r.retired&&careerRoll(r.id,'market85:'+month)<.025).slice(0,40);
 for(const r of candidates){npc85Initialize(r);
  if(r.horses.length>1){const surplus=r.horses.find(h=>h.ownerId===r.id&&!h.retiredForever&&npc85HorseAge(h,month*720)>=17&&npc85HorseSkill(h,r.specialty)<r.skill-8&&!careerBusy(h.recentStarts85||[],{at:month*720}));if(surplus){npc85Materialize(surplus,r);const ask=auctionSchoolingPrice(r.specialty,SHOW_LEVELS[r.specialty][Math.max(0,SHOW_LEVELS[r.specialty].findLastIndex(level=>requiredSkillBand(r.specialty,level)[0]<=npc85HorseSkill(surplus,r.specialty)))],surplus.id+':npc-sale');const listing=HorseSales.list(app,surplus,ask,day);listing.mainDiscipline=r.specialty;}}
  if(r.horses.filter(h=>!h.retiredForever).length>=2)continue;
  const listings=HorseSales.state(app).listings.filter(l=>l.status==='Listing Active'&&l.direction==='buy'&&l.horse.owner!=='Your Stable'&&l.horse.ownerId!==r.id&&l.ask<=r.resources85&&npc85HorseAge(l.horse,month*720)>=4&&npc85HorseAge(l.horse,month*720)<=15&&!(l.horse.medicalConditions||[]).some(c=>!c.resolved)&&npc85HorseSkill(l.horse,r.specialty)>=Math.max(20,r.skill-25));
  listings.sort((a,b)=>Math.abs(npc85HorseSkill(a.horse,r.specialty)-r.skill)-Math.abs(npc85HorseSkill(b.horse,r.specialty)-r.skill));if(listings[0])npc85Buy(r,listings[0],day,'npc85:'+month+':'+r.id);
 }
}
function npc85HorseSections(rider,discipline){
 npc85Initialize(rider);for(const h of rider.horses||[])npc85Initialize(rider,h);
 const index=npc85Registry(),current=(rider.horses||[]).filter(h=>!h.retiredForever&&h.assignedRiderId===rider.id),former=new Map();
 for(const h of rider.retiredHorses||[])former.set(h.id,h);for(const row of rider.partnershipHistory85||[]){const h=index.horses.get(row.horseId);if(!current.some(c=>c.id===row.horseId))former.set(row.horseId,h||row);}
 const markup=h=>{const age=npc85HorseAge(h,pastureCalendarHour()),score=npc85HorseSkill(h,discipline);let level=h.stats||h.skills?SHOW_LEVELS[discipline][0]:'Level unrecorded';if(h.stats||h.skills)SHOW_LEVELS[discipline].forEach(l=>{if(requiredSkillBand(discipline,l)[0]<=score&&rankingSchoolingAge86(h,discipline,l,pastureCalendarHour()))level=l;});const results=careerResults({horseId:h.id||h.horseId,riderId:rider.id,discipline}).sort((a,b)=>b.hour-a.hour).slice(0,3);return `<p><strong>${csEscape(h.name)}</strong> · ${Number.isFinite(age)?age+' years':'Historical horse'} · ${csEscape(h.breed||'Breed unrecorded')} · ${csEscape(level)} · ${h.ownerId===rider.id?'Owned':h.assignedRiderId===rider.id?'Assigned rider':'Former partnership'} · Owner: ${csEscape(h.owner||'Unrecorded')} · ${h.retiredForever||h.year?'Retired':h.skills||h.stats?'Active':'Historical record'}</p>${results.map(r=>`<p>${csEscape(r.event)}: ${r.placing?'#'+r.placing:r.eliminated?'Eliminated':'Recorded'}</p>`).join('')}`;};
 return `<section data-npc85-horses><h4>Current Horses</h4>${current.map(markup).join('')||'<p>No current eligible partnership.</p>'}<details><summary>Former Horses</summary>${[...former.values()].map(markup).join('')||'<p>No former partnerships recorded.</p>'}</details></section>`;
}
const NPC85_DETAILS=careerLeaderboardDetails;
careerLeaderboardDetails=function(row,type,discipline,...args){const html=NPC85_DETAILS(row,type,discipline,...args),rider=npc85Registry().riders.get(row.riderId||(['horse','young-horse'].includes(type)?npc85Registry().horses.get(row.horseId||row.id)?.assignedRiderId:type==='combination'?row.id.split('|')[0]:row.id));return html+(rider?npc85HorseSections(rider,discipline):'');};
function npc85PlayerTransfer(app,tx,listing,h,day){
 const previous=h.assignedRiderId,rider=npc85Registry().riders.get(previous);h.formerRiderIds ||= [];
 if(previous&&!h.formerRiderIds.includes(previous))h.formerRiderIds.push(previous);
 if(rider){rider.horses=rider.horses.filter(row=>row.id!==h.id);npc85Remember(rider,h,day,'Sold to player');}
 if(tx.direction==='buy'){h.ownerId='Your Stable';h.assignedRiderId=careerRider().id;}
 else{h.ownerId='external-owner:'+stableTextHash(h.owner);h.assignedRiderId=null;}
 npc85Registry(true);
}
function npc85ExpireListing(app,listing,day){
 const seller=npc85Registry().riders.get(listing.horse.ownerId);if(!seller)return false;
 // Named NPC stock may only change owners through a funded, recorded transfer.
 // An expired unsold listing is withdrawn; it does not invent an anonymous buyer.
 listing.status='Withdrawn';listing.closed=day;
 for(const tx of HorseSales.state(app).transactions.filter(t=>t.listingId===listing.id&&!t.paid&&!['Complete','Cancelled','Withdrawn'].includes(t.status))){tx.status='Withdrawn';tx.events.push({day,type:'Listing ended before payment'});}
 return true;
}
const NPC85_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){const result=NPC85_LOAD(data,...args);if(app.career?.npcs)npc85Repair();return result;};

function npc85CircuitEvent(type,discipline,filter,hour,round){
 const template=['tour','team'].includes(type)?CAREER_SERIES.find(row=>row.series===filter&&row.discipline===discipline):null;
 const division=template?.division|| (type==='horse'&&filter==='pony'?'pony':['division','youth-national','youth-international'].includes(type)?String(filter).split('|')[0]:'senior'),country=type==='national'?filter:type==='youth-national'?String(filter).split('|')[1]:'FRA';
 const young=type==='young-horse',pony=filter==='pony'||division==='pony'||Boolean(template?.ponyCm),level=discipline==='jumping'?(young&&Number(filter)<6?'0.70':division==='kids'?'0.50':'1.00'):SHOW_LEVELS[discipline][young?0:1];
 const at=hour-round*CAREER_HOURS_PER_WEEK,date=pastureDate(at),key=careerBoardKey(type,discipline,filter);
 const ranking=type==='team'?'team':young?'young-horse':(type==='horse'&&filter==='pony')||['division','youth-national','youth-international'].includes(type)?'division':type==='national'?'national':'world';
 return {...careerEvent({id:'npc-circuit85:'+key+':'+Math.floor(at/CAREER_HOURS_PER_WEEK),name:'Weekly '+(CAREER_AGE_DIVISIONS[division]?.label||'Open')+' '+auctionDisciplineName(discipline)+' Circuit',discipline,level,division,tier:ranking==='world'||type==='youth-international'?5:2,official:true,ranking,base:ranking==='world'?80:25,month:date.month,day:date.day,country,divisionScope:type==='youth-international'?'international':'national',horseAge:young?Number(filter):null,ponyCm:pony?148:null,team:type==='team'?4:0,count:3,series:['team','tour'].includes(type)?filter:undefined,minField:8,cutoff:24},date.year),at,date,circuit85:true,circuitBoard85:key,maximumEntries:type==='team'?160:32};
}
function npc85CircuitPool(event,type,filter){
 const roster=careerRoster(),w=npc85State(),country=type==='national'?filter:type==='youth-national'?String(filter).split('|')[1]:null;
 const valid=r=>!r.retired&&!careerBusy(r.recentStarts||[],event)&&r.specialty===event.discipline&&(!country||npc85Nationality(r)===country)&&careerDivisions(r,event.at).includes(event.division);
 const choose=r=>{npc85Initialize(r);const candidates=r.horses.filter(h=>{npc85Initialize(r,h);return !careerEligibility(event,r,h,{npc:true,history:[]});});return npc85ChooseHorse(r,candidates,event);};
 const countries=Object.keys(CAREER_COUNTRIES).sort((a,b)=>careerRoll(event.id,'country:'+a)-careerRoll(event.id,'country:'+b)).slice(0,event.team?40:74),matches=[],counts=new Map();
 const add=(r,h)=>{if(event.team&&(!countries.includes(npc85Nationality(r))||(counts.get(npc85Nationality(r))||0)>=event.team)||!event.team&&!country&&(counts.get(npc85Nationality(r))||0)>=2)return;if(matches.some(p=>p.rider.id===r.id))return;matches.push({rider:r,horse:h,score:(r.skill+npc85HorseSkill(h,event.discipline))/2});counts.set(npc85Nationality(r),(counts.get(npc85Nationality(r))||0)+1);};
 for(const r of (careerRosterIndex(roster).byDiscipline.get(event.discipline)||[]).filter(valid).sort((a,b)=>b.skill-a.skill||a.id.localeCompare(b.id))){const h=choose(r);if(h)add(r,h);}
 const target=event.team?countries.length*event.team:32;if(matches.length>=target)return matches.slice(0,target);
 const usedNames=new Set(roster.map(r=>r.name)),usedHorses=new Set();for(const h of npc85Registry().horses.values())usedHorses.add(horseNameKey(h.name));
 let count=0;
 while(matches.length<target&&count<target*5){
  const index=count++,home=country||(event.team?countries.find(c=>(counts.get(c)||0)<event.team):countries.find(c=>(counts.get(c)||0)<2)||countries[index%countries.length]),seed=event.circuitBoard85+':'+home+':'+pastureDate(event.at).year+':'+index,id='npc85-circuit:'+seed;
  let r=roster.find(r=>r.id===id);
  if(!r){const ages=CAREER_AGE_DIVISIONS[event.division].ages,age=ages[0]+Math.floor(careerRoll(id,'rider-age86')*(Math.min(ages[1],60)-ages[0]+1)),year=event.date.year;
   const name=careerUniqueRiderName(id,home,usedNames);
   r={id,name,rankingDebutHour86:Math.max(pastureCalendarHour(),careerState().cursor||0,careerState().rankingHour||0)+1,country:home,specialty:event.discipline,stage:3,skill:68+careerRoll(id,'skill')*25,potential:100,professional:event.division==='professional',birth:{year:year-age,month:1,day:1},horses:[],retiredHorses:[],starts:0,training:[],resources85:90000};
   const h=careerNpcHorse(r,event.ponyCm?'pony':'sport',year,usedHorses,event.ponyCm?'pony':'sport');if(event.horseAge){h.birthYear=year-event.horseAge;h.age=event.horseAge;}h.skills[event.discipline]=Math.max(h.skills[event.discipline],event.minimumSkill+5);r.horses.push(h);npc85Initialize(r,h);roster.push(r);
  }
  const h=valid(r)&&choose(r);if(h)add(r,h);
 }
 if(event.team){npc85Registry(true);return matches.slice(0,target);}
 npc85Registry(true);return matches.slice(0,32);
}
function npc85EnsureCircuit(type,discipline,filter,hour){
 if(type==='combination'||type==='horse'&&!filter)return npc85EnsureCircuit('world',discipline,'',hour);
 if(type==='horse'&&filter==='pony')return npc85EnsureCircuit('division',discipline,'pony',hour);
 const w=npc85State();w.rankingLaunch86 ||= {};const launchKey=careerBoardKey(type,discipline,filter),launch=w.rankingLaunch86[launchKey]??=hour;const seasonal=['national','youth-national','tour','team'].includes(type),ids=[];
 for(let round=3;round>=0;round--){const event=npc85CircuitEvent(type,discipline,filter,hour,round);if(event.at<0||seasonal&&event.date.year!==pastureDate(hour).year)continue;ids.push(event.id);if(w.meets[event.id])continue;if(round!==0)continue;
  if(event.phaseSchedule)event.phaseSchedule={dressage:event.at,'cross-country':event.at,showjumping:event.at};
  const field=npc85CircuitPool(event,type,filter);if(event.at<=launch||!field.length)continue;
  const competitors=field.map((pair,i)=>careerNpcEntry(event,pair,i)),show={id:event.id,discipline,level:event.level,round:0,competitors};
  for(const entry of competitors)for(const phase of CAREER_PHASES[discipline])entry.scores[phase]=showScore(show,entry,phase);
  const meet=careerRecordMeet(event,showStandings(show),null,{ranked:true});meet.hour=event.at;meet.circuit85=true;meet.circuitBoard85=event.circuitBoard85;
 }
 return ids;
}
// New rosters/cohorts start with the same relationships that a migrated save receives.
const NPC85_ROSTER=careerRoster;
careerRoster=function(...args){const roster=NPC85_ROSTER(...args);if(app.career.npcPartnershipVersion85!==1)npc85Repair();return roster;};
const NPC85_COHORT=careerAddYouthCohort;
careerAddYouthCohort=function(year,roster,...args){const before=roster.length,result=NPC85_COHORT(year,roster,...args);for(const rider of roster.slice(before)){npc85Initialize(rider);for(const h of rider.horses)npc85Initialize(rider,h);}return result;};
