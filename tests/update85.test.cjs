const {check}=require('./behavior5-harness.cjs');
check('editor edits authoritative fields, applies potential overrides and preserves identity and negative behavior',`{
 resetGame();const h=app.horses[0],id=h.id,genes=JSON.stringify(h.genetics),bond=h.bond,qol=h.qol;
 if(horseEditor85Max(id).ok)throw Error('editor enabled by default');app.settings.horseStatEditor85=true;
 const natural=JSON.stringify([rrHorse(h).naturalSpookiness,rrHorse(h).temperamentIntensity,rrHorse(h).learned]);
 const old=effectiveDisciplineSkill(h,'jumping');if(!horseEditor85Max(id).ok)throw Error('max failed');
 if(horseEditor85Fields(h).filter(f=>['technical','riding','potential'].includes(f.category)).some(f=>f.get()!==f.max))throw Error('wrong maximum');
 if(effectiveDisciplineSkill(h,'jumping')<=old)throw Error('gameplay ignores editor');
 if(JSON.stringify([rrHorse(h).naturalSpookiness,rrHorse(h).temperamentIntensity,rrHorse(h).learned])!==natural)throw Error('negative or natural behavior maxed');
 applyBreedPotential(h);if(Object.values(h.potential).some(v=>v!==100))throw Error('potential override lost');
 if(!horseEditor85Apply(id,{'learned:Jump Confidence':42,'natural:naturalSpookiness':13,'natural:temperamentIntensity':27}).ok)throw Error('behavior editing');
 const skill=horseEditor85Fields(h).find(f=>f.category==='technical');if(horseEditor85Apply(id,{[skill.id]:101}).ok||skill.get()!==100)throw Error('invalid edit mutated horse');
 hydrateFromSave(JSON.parse(serializeAppState()));const loaded=app.horses.find(h=>h.id===id);
 if(!app.settings.horseStatEditor85||rrHorse(loaded).naturalSpookiness!==13||rrHorse(loaded).learned['Jump Confidence']!==42||effectiveDisciplineSkill(loaded,'jumping')!==100)throw Error('reload');
 if(loaded.id!==id||JSON.stringify(loaded.genetics)!==genes||loaded.bond!==bond||loaded.qol!==qol)throw Error('identity/genes/bond/QOL changed');
}`);
check('actual result IDs recover missing current links without inventing horses, and missing history is flagged',`{
 resetGame();const w=careerState(),roster=careerRoster(),r=roster[0],h=r.horses[0];npc85Initialize(r,h);
 w.npcArchive85={[h.id]:h};r.horses=r.horses.filter(x=>x.id!==h.id);
 w.meets.repair85={id:'repair85',hour:pastureCalendarHour()-24,discipline:r.specialty,results:[{riderId:r.id,horseId:h.id,horseName:h.name},{riderId:r.id,horseId:'missing-horse85',horseName:'Unrecoverable'}]};
 const ids=new Set(roster.flatMap(r=>r.horses.map(h=>h.id)));npc85Repair();
 if(!r.horses.includes(h)||!npc85Registry().horses.has(h.id)||npc85Registry().horses.has('missing-horse85'))throw Error('recovery fabricated or lost horse');
 if(!w.npcDiagnostics85.missing.some(x=>x.horseId==='missing-horse85')||w.meets.repair85.results.length!==2)throw Error('missing result discarded');
 if(!npc85HorseSections(r,r.specialty).includes(h.name))throw Error('profile horse missing');
}`);
check('multi-horse selection rotates actual partners and rejects retirement, health, age and simultaneous starts',`{
 resetGame();const r=careerRoster().find(r=>r.specialty==='jumping'&&r.horses.length>1),a=r.horses[0],b=r.horses[1],hour=pastureCalendarHour();
 for(const h of [a,b]){npc85Initialize(r,h);h.skills.jumping=50;h.birthYear=app.year-9;h.assignedRiderId=r.id;h.medicalConditions=[];}
 const event={id:'rotation85',discipline:'jumping',level:'0.70',minimumSkill:10,at:hour,date:pastureDate(hour)};
 const first=npc85ChooseHorse(r,[a,b],event);first.competitionHistory85.push({day:hour/24,discipline:'jumping'});
 if(npc85ChooseHorse(r,[a,b],{...event,at:hour+48}).id===first.id)throw Error('always strongest horse');
 first.recentStarts85=[{start:hour,end:hour+2}];if(npc85HorseEligible(r,first,event))throw Error('simultaneous horse entry');first.recentStarts85=[];
 first.birthYear=app.year-3;if(npc85HorseEligible(r,first,event))throw Error('young horse');first.birthYear=app.year-9;
 npc85Retire(r,first,hour/24);if(npc85HorseEligible(r,first,event)||!r.retiredHorses.includes(first)||r.horses.includes(first))throw Error('retirement');
 const original=JSON.stringify(r.retiredHorses);careerRefreshPartnerships(app.year);if(JSON.stringify(r.retiredHorses)!==original)throw Error('retired horse regenerated');
}`);
check('NPC sales transfer one real horse, conserve money and retain history with idempotent payment',`{
 resetGame();const [seller,buyer]=careerRoster(),h=seller.horses[0],day=csDay();npc85Initialize(seller,h);npc85Initialize(buyer);npc85Materialize(h,seller);
 h.competitionHistory85=[{eventId:'prior85',placing:2}];if(h.registeredName!==h.name)throw Error('materialization changed registered identity');const identity=h.id,genes=JSON.stringify(h.genetics),l=HorseSales.list(app,h,2000,day);buyer.resources85=10000;seller.resources85=3000;
 const r=npc85Buy(buyer,l,day,'transfer85');if(!r.ok)throw Error(r.message);
 if(h.id!==identity||h.ownerId!==buyer.id||h.assignedRiderId!==buyer.id||buyer.resources85!==8000||seller.resources85!==5000||seller.horses.includes(h)||buyer.horses.filter(x=>x.id===identity).length!==1)throw Error('invalid ownership transfer');
 if(!h.formerRiderIds.includes(seller.id)||!seller.partnershipHistory85.some(x=>x.horseId===identity)||h.competitionHistory85[0].eventId!=='prior85'||JSON.stringify(h.genetics)!==genes)throw Error('lost career identity');
 npc85Buy(buyer,l,day,'transfer85');if(buyer.resources85!==8000||seller.resources85!==5000)throw Error('double payment');
 if(!npc85HorseSections(seller,seller.specialty).includes(h.name))throw Error('former partner missing');
 const poor=careerRoster()[2],saleHorse=seller.horses[0]||buyer.horses[0];npc85Materialize(saleHorse,seller);const another=HorseSales.list(app,saleHorse,9999999,day);poor.resources85=1;
 if(npc85Buy(poor,another,day,'poor85').ok)throw Error('free purchase');
}`);
check('current sporting nationality agrees across boards while old result country stays historical',`{
 resetGame();const w=careerState(),r=careerRoster().find(r=>r.specialty==='jumping'),h=r.horses[0],hour=pastureCalendarHour();
 w.meets.nationality85={id:'nationality85',hour,discipline:'jumping',ranking:'world',results:[{riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:'FRA',points:50}]};
 r.country='KAZ';r.location='France';h.country='Germany';const boards=careerComputeBoards(hour+1);
 if(boards['world|jumping|'][0].country!=='KAZ'||boards['national|jumping|KAZ'][0].id!==r.id||w.meets.nationality85.results[0].country!=='FRA')throw Error('nationality mismatch/history rewrite');
 const other=careerRoster()[1];other.name=r.name;npc85Repair();if(!w.npcDiagnostics85.duplicateNames.some(x=>x.ids.includes(r.id)&&x.ids.includes(other.id)))throw Error('duplicate name audit');
}`);
check('calendar keeps legacy IDs, offers all height ranges, and keeps ordinary monthly density balanced',`{
 resetGame();const ids=CAREER_SERIES.map(e=>e.id);if(new Set(ids).size!==ids.length)throw Error('duplicate class IDs');
 for(const [division,heights]of Object.entries(HEIGHTS85)){
  const classes=CAREER_SERIES.filter(e=>e.discipline==='jumping'&&e.division===division&&e.developmentHeight),available=new Set(classes.map(e=>Number(e.level)));
  if(heights.some(h=>!available.has(h)))throw Error('missing height '+division+' '+heights.filter(h=>!available.has(h)));
  for(let month=1;month<=12;month++){const ordinary=CAREER_SERIES.filter(e=>e.division===division&&e.month===month&&careerOrdinaryDivision(e));if(ordinary.length<6||ordinary.length>12)throw Error('density '+division+' '+month+' '+ordinary.length);}
 }
 if(SHOW_LEVELS.jumping[0]!=='0.70'||levelIndex('jumping','0.30')!==0||!competitionLevels('jumping').includes('1.35'))throw Error('legacy index migration');
 const e=careerEvent(CAREER_SERIES.find(e=>e.developmentHeight&&e.division==='pony'),app.year),r={...careerRoster().find(r=>careerDivisions(r,pastureCalendarHour()).includes('pony')),stage:2};
 if(!r.id)throw Error('fixture');const h=r.horses[0];npc85Initialize(r,h);h.height=17;
 if(!careerEligibility(e,r,h,{npc:true}).includes('measured-height'))throw Error('pony measurement bypassed');
}`);
check('manager independent switches, funded wages and actual farrier care are once-only',`{
 resetGame();app.money=100000;const h=app.horses[0],m=manager85State(),day=csDay();HorseHealth.ensure(h,day);h.hoofHealth.nextDue=day;h.hoofHealth.shoes='barefoot';
 if(!manager85Hire().ok||app.money!==99880)throw Error('hire wage');manager85Set('farrier',true);
 if(m.toggles.vet||m.toggles.treatment||m.toggles.training)throw Error('coupled switches');
 const random=HorseHealth.roll;manager85Care(m,h,day);const money=app.money,count=h.hoofHealth.history.length;manager85Care(m,h,day);
 if(app.money!==money||h.hoofHealth.history.length!==count)throw Error('duplicate appointment');
 if(!count||money>=99880||!m.history.some(r=>r.feature==='farrier'&&r.ok))throw Error('no real care');
 manager85Set('farrier',false);h.hoofHealth.nextDue=day+1;manager85Care(m,h,day+1);if(h.hoofHealth.history.length!==count)throw Error('disabled feature ran');
 hydrateFromSave(JSON.parse(serializeAppState()));if(!manager85State().hired||manager85State().toggles.farrier)throw Error('staff reload');
}`);
check('manager follows a confirmed care plan without diagnosing or free healing',`{
 resetGame();app.money=100000;const h=app.horses[0],day=csDay();HorseHealth.ensure(h,day);const c=HorseHealth.add(h,'scratch',day,{known:true,confirmed:true,recoveryDays:5});
 const m=manager85State();m.toggles.treatment=true;const money=app.money;manager85Care(m,h,day);
 if(!h.rehabilitationPlans.some(p=>p.conditionId===c.id)||app.money>=money||c.resolved)throw Error('care was free or instant');
 const paid=app.money,progress=c.recoveryProgress;manager85Care(m,h,day);if(app.money!==paid||c.recoveryProgress!==progress)throw Error('duplicate care');
 const unknown=HorseHealth.add(h,'strain',day,{known:false,confirmed:false});manager85Care(m,h,day+1);if(unknown.confirmed)throw Error('manager invented diagnosis');
}`);
check('manager trains through Quick handler, respects medical/workload and changes actual weak skills gradually',`{
 resetGame();app.settings.tackOwnership=false;app.money=100000;const h=app.horses[0],hour=pastureCalendarHour();h.age=9;h.behavior=900;h.requiresBreakingIn=false;h.unridable=false;h.illnesses=[];h.medicalConditions=[];h.fatigue=0;h.energy=100;h.mainDiscipline='dressage';
 for(const skills of Object.values(h.stats))for(const key of Object.keys(skills))skills[key]=60;h.stats.dressage.Balance=10;t2horse(h).traits=[];
 const choice=manager85ChooseTraining(h,hour+9);if(!choice.exercise)throw Error(choice.reason);const map=originalSkillMapping(choice.exercise,{discipline:choice.discipline});if(map.primary!=='Balance')throw Error('ignored weak Balance: '+map.primary);
 manager85Hire();manager85Set('training',true);const history=t2horse(h).history.length;manager85Hour(hour+9);
 if(t2horse(h).history.length!==history+1||!t2horse(h).history.at(-1).exercises.length||!manager85State().history.some(r=>r.feature==='training'&&r.ok))throw Error('no actual training');
 const count=t2horse(h).history.length;manager85Hour(hour+9);manager85Hour(hour+10);if(t2horse(h).history.length!==count)throw Error('duplicate session');
 h.fatigue=90;if(!manager85ChooseTraining(h,hour+72).reason)throw Error('fatigue ignored');h.fatigue=0;h.energy=1;if(!manager85ChooseTraining(h,hour+72).reason)throw Error('energy ignored');
 h.energy=100;HorseHealth.add(h,'strain',csDay(),{confirmed:true});if(!manager85ChooseTraining(h,hour+72).reason)throw Error('medical restriction ignored');
}`);
check('manager hour and multi-day skips process the same paid tasks and actual session timestamps',`{
 resetGame();app.settings.tackOwnership=false;app.money=100000;careerState().settings.background=false;const hour=pastureCalendarHour(),h=app.horses[0];h.age=9;h.behavior=900;h.requiresBreakingIn=false;h.unridable=false;h.medicalConditions=[];h.illnesses=[];h.fatigue=0;h.mainDiscipline='dressage';t2horse(h).scheduleEnabled=false;app.horses=[h];
 manager85Hire();manager85Set('training',true);manager85Set('farrier',true);h.hoofHealth.nextDue=csDay();const saved=JSON.parse(serializeAppState()),random=Math.random;Math.random=()=>.9;
 const summary=()=>JSON.stringify({money:app.money,training:t2horse(app.horses[0]).history.map(r=>[r.time,r.exercises.length]),care:app.horses[0].hoofHealth.history.map(r=>[r.day,r.service]),logs:manager85State().history.map(r=>[r.day,r.feature,r.ok])});
 try{simulatePastureUntil(hour+72);const skipped=summary();hydrateFromSave(saved);for(let at=hour+1;at<=hour+72;at++)simulatePastureUntil(at);if(summary()!==skipped)throw Error('skip processing differs');}finally{Math.random=random;}
}`);
check('player delivery and save migration update NPC ownership references; expired unsold stock stays owned',`{
 resetGame();app.money=100000;const seller=careerRoster()[0],h=seller.horses[0],day=csDay();npc85Initialize(seller,h);npc85Materialize(h,seller);const listing=HorseSales.list(app,h,2000,day),tx=HorseSales.inquiry(app,listing.id,day);
 tx.paid=true;tx.status='Transport Pending';tx.offer=2000;tx.contract={seller:seller.name,buyer:'Your Stable',equipment:[]};
 if(!HorseSales.deliver(app,tx,day).ok||seller.horses.some(row=>row.id===h.id)||h.ownerId!=='Your Stable'||h.assignedRiderId!==careerRider().id)throw Error('delivery roster mismatch');
 hydrateFromSave(JSON.parse(serializeAppState()));const loaded=HorseSales.state(app).listings.find(l=>l.id===listing.id);if(loaded.horse!==app.horses.find(row=>row.id===h.id)||npc85Registry().riders.get(seller.id).horses.some(row=>row.id===h.id))throw Error('duplicate loaded owner');
 const other=careerRoster()[1],stock=other.horses[0];npc85Initialize(other,stock);npc85Materialize(stock,other);const ad=HorseSales.list(app,stock,3000,day);ad.marketExitDay=day;ad.marketTimingVersion=1;
 HorseSales.advanceMarket(app,day);if(ad.status!=='Withdrawn'||stock.ownerId!==other.id||!other.horses.includes(stock))throw Error('invented anonymous owner');
}`);
check('multi-horse classes record separate legitimate starts and block competing distant bookings',`{
 resetGame();const r=careerRoster().find(r=>r.specialty==='jumping'&&r.horses.length>1);app.career.npcs=[r];app.career.youthCohorts={[app.year]:true};r.birth.year=app.year-16;r.stage=2;
 for(const h of r.horses){npc85Initialize(r,h);h.birthYear=app.year-9;h.skills.jumping=55;h.medicalConditions=[];h.fatigue=0;}
 const event=careerEvent({id:'multi85',name:'Two-horse test class',discipline:'jumping',level:'0.70',division:'junior',tier:2,month:1,day:3,official:true,base:25,minField:2,cutoff:24,maxHorsesPerRider:2},app.year),field=careerNpcField(event,2);
 if(field.length!==2||new Set(field.map(p=>p.horse.id)).size!==2||field.some(p=>p.rider.id!==r.id))throw Error('multi-horse field');
 careerNpcField({...event,allocated:true},2,null,true);if(r.horses.some(h=>h.ownerId!==r.id))throw Error('selection inspection reassigned an owned horse to the event pool');
 const allocated=careerNpcField({...event,id:event.id+':allocation',allocated:true},2);if(!allocated.length||allocated.some(p=>r.horses.includes(p.horse)||!npc85Registry().horses.has(p.horse.id)||r.horses.some(h=>h.skills===p.horse.skills||h.competitionHistory85===p.horse.competitionHistory85&&h.competitionHistory85)))throw Error('allocated horse was not a separate persistent pool identity');
 const competitors=field.map((p,i)=>careerNpcEntry(event,p,i)),show={id:event.id,discipline:'jumping',level:event.level,competitors,round:0};for(const c of competitors)c.scores.showjumping=showScore(show,c,'showjumping');
 const meet=careerRecordMeet(event,showStandings(show),null,{ranked:true});if(meet.results.length!==2||new Set(meet.results.map(r=>r.horseId)).size!==2)throw Error('merged horse results');
 const history=r.horses.map(h=>h.competitionHistory85.length);careerRecordMeet(event,showStandings(show),null,{ranked:true});if(r.horses.some((h,i)=>h.competitionHistory85.length!==history[i]))throw Error('duplicate history');
 if(careerNpcField({...event,id:'distant85',at:event.at+1,country:'Japan',federation:'JPN'},2).length)throw Error('simultaneous distant starts');
}`);
check('automatic veterinarian checks are real paid visits and are not repeated the next day',`{
 resetGame();app.money=100000;const h=app.horses[0],m=manager85State(),day=csDay();HorseHealth.ensure(h,day);h.due ||= {};h.due.checkup=true;m.toggles.vet=true;const before=h.vetVisits.length,money=app.money;
 manager85Care(m,h,day);if(h.vetVisits.length!==before+1||app.money>=money||!m.history.some(r=>r.feature==='vet'&&r.ok))throw Error('no real vet visit');
 manager85Care(m,h,day);manager85Care(m,h,day+1);if(h.vetVisits.length!==before+1)throw Error('unnecessary repeat visit');
}`);
check('manager respects an explicit horse booking at another barn',`{
 resetGame();app.money=100000;const h=app.horses[0],hour=pastureCalendarHour();manager85Hire();manager85Set('farrier',true);h.pastureBooking={barnId:'another-barn'};HorseHealth.ensure(h,csDay());h.hoofHealth.nextDue=csDay();const before=h.hoofHealth.history.length;manager85Hour(hour+9);if(h.hoofHealth.history.length!==before)throw Error('managed a horse outside the assigned barn');
}`);
check('full NPC sale horses retain actual technical development after a completed start',`{
 resetGame();const rider=careerRoster().find(r=>r.specialty==='jumping'),h=rider.horses[0];npc85Initialize(rider,h);h.skills.jumping=50;npc85Materialize(h,rider);for(const skill of Object.keys(h.stats.jumping))h.stats.jumping[skill]=40;h.potential.jumping=90;npc85Initialize(rider,h);
 const before=h.stats.jumping.Power,event=careerEvent({id:'development-truth85',name:'Development test',discipline:'jumping',level:'0.70',division:'senior',tier:2,month:1,day:2,official:true,base:25,minField:8,cutoff:24},app.year);
 careerRecordMeet(event,[{riderId:rider.id,riderName:rider.name,country:rider.country,horseId:h.id,horseName:h.name,rank:1,total:0,skills:{discipline:40},scores:{showjumping:{faults:0}}}],null,{ranked:true});npc85Initialize(rider,h);
 if(h.stats.jumping.Power<=before||h.skills.jumping!==effectiveDisciplineSkill(h,'jumping'))throw Error('development existed only in a temporary aggregate');
}`);
