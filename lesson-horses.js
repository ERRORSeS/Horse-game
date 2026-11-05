/* Saved lesson-horse offers, barn-managed tack and player-selected lease terms. */
function lessonMakeLeaseAvailable(h){
 h.owner='Your Stable';h.isLessonHorse=false;h.isNPC=false;h.isPastureNPC=false;h.barnAvailable=true;return h;
}
function lessonNormalizeLeases(){for(const h of app.horses||[])if(h.isLeased)lessonMakeLeaseAvailable(h);}
function lessonOpenTraining(h){
 const horse=lessonActiveLease(h)||h;if(!horse.isLeased&&!horse.barnAvailable)return false;
 app.trainingHorseScope='both';app.trainingSelection={...(app.trainingSelection||{}),horseId:horse.id};
 t2repairHorseSelection();t2state().draft.horseId=horse.id;changeTab('training');renderTraining();return true;
}
function lessonActiveLease(h){return app.horses.find(row=>row.isLeased&&row.leaseSourceId===h.id);}
function lessonMatchingTack(h,poor=false){
 const personality=mgPersonality(h),setup={},choices={bridle:['Snaffle Bridle','Plain Cavesson Bridle','Flash Bridle','Drop Noseband Bridle','Figure-8 Bridle','Anatomical Bridle'],bit:EQ_SNAFFLES.concat(['Straight Bar Bit','Pelham Bit']),saddle:['All-Purpose Saddle','Jumping Saddle','Dressage Saddle'],pad:['Basic Cotton Pad']};
 for(const [slot,list]of Object.entries(choices)){
  const suitable=list.filter(name=>EQ_RULES[name]?.suitable.includes(personality)),unsuitable=list.filter(name=>EQ_RULES[name]?.unsuitable.includes(personality));
  const mismatch=poor&&rnd(1,100)<=50&&unsuitable.length;
  setup[slot]=pick(mismatch?unsuitable:suitable.length?suitable:list.filter(name=>!EQ_RULES[name]?.unsuitable.includes(personality)));
 }
 h.tack={...h.tack,...setup};h.lessonManagedTack=true;h.lessonEquipment={};h.equipmentRefs={};
 for(const [slot,type]of Object.entries(setup)){
  const item=mgNewItem(type,{assignedHorseId:h.id,assignedSlot:slot,size:mgDefaultSize(mgType(type),h),condition:poor?rnd(45,75):rnd(85,100),barnOwned:true});
  h.lessonEquipment[slot]=item;h.equipmentRefs[slot]=item.id;
 }
 h.lessonTackMatched=Object.values(setup).every(name=>!EQ_RULES[name]?.unsuitable.includes(personality));
}
function lessonEnsureTerms(h,barn){
 if(!h.lessonLeaseTerms){
  if(!h.height)h.height=rnd(14,17)+'.'+rnd(0,3);
  mgSizing(h);
  const available=clamp(Number(h.barnAvailabilityPercent)||lessonAvailabilityBase(barn?.lessonsStars),1,100),limit=Math.max(1,Math.min(12,Math.floor(available/8)));
  h.lessonLeaseTerms={monthlyPrice:rnd(50,200),maxMonths:rnd(1,limit),createdMonth:currentMonthAbsolute()};
  const forSale=rnd(1,100)<=35;
  h.lessonBuyout={status:forSale?'available':'not offered',price:Math.max(1000,Math.round(calculateHorsePrice(h)*.75/50)*50),expiresMonth:currentMonthAbsolute()+rnd(1,6),expiryOutcome:rnd(1,100)<=50?'sold':'withdrawn'};
  h.lessonOverworked=Number(barn?.lessonsStars||3)<2;
  if(h.lessonOverworked)h.fatigue=Math.max(h.fatigue||0,rnd(45,65));
  lessonMatchingTack(h,h.lessonOverworked);
 }
 return h.lessonLeaseTerms;
}
function lessonProcessOffers(barn,roster){
 for(const h of roster){
  lessonEnsureTerms(h,barn);const offer=h.lessonBuyout;
  if(offer.status==='available'&&currentMonthAbsolute()>=offer.expiresMonth&&lessonActiveLease(h))offer.status='expired during lease';
  if(['available','expired during lease'].includes(offer.status)&&currentMonthAbsolute()>=offer.expiresMonth&&!lessonActiveLease(h)){
   offer.status=offer.expiryOutcome;
   pushReport(h.name+(offer.status==='sold'?' was bought by another rider and left the lesson program.':' was taken off sale by the lesson program.'));
  }
 }
 return roster.filter(h=>h.lessonBuyout?.status!=='sold'&&h.lessonBuyout?.status!=='purchased');
}
const LESSON_ROSTER=ensureLessonRosterForBarn;
ensureLessonRosterForBarn=function(barn,refresh=false){
 const roster=LESSON_ROSTER(barn,refresh);if(!barn?.id)return roster;
 const current=lessonProcessOffers(barn,roster);
 for(const h of current){if(lessonActiveLease(h))h.barnAvailable=false;if(refresh&&h.lessonOverworked)h.fatigue=Math.max(h.fatigue||0,45);}
 app.lessonHorsesByBarn[barn.id]=current;return current;
};
const LESSON_OWNED=mgOwned;mgOwned=function(id){
 const owned=LESSON_OWNED(id);if(owned||!id)return owned;
 return [...app.horses,...Object.values(app.lessonHorsesByBarn||{}).flat()].flatMap(h=>Object.values(h.lessonEquipment||{})).find(item=>item.id===id)||null;
};
const LESSON_ITEMS=eqItems;eqItems=function(h,override=null){
 if(!override&&h.lessonManagedTack&&(h.isLessonHorse||h.isLeased)&&!(competitionEquipmentScope?.horseId===h.id&&competitionEquipmentScope.setup))return Object.entries(h.lessonEquipment||{}).map(([slot,item])=>({slot,type:item.type,item}));
 return LESSON_ITEMS(h,override);
};
function lessonStartLease(h,months,barn=app.currentBarn){
 const roster=app.lessonHorsesByBarn[barn?.id]||[],terms=lessonEnsureTerms(h,barn);
 if(!roster.includes(h)||!h.barnAvailable||lessonActiveLease(h))return {ok:false,message:'This horse is not currently available for lease.'};
 if(!Number.isInteger(months)||months<1||months>terms.maxMonths)return {ok:false,message:'Choose 1–'+terms.maxMonths+' months.'};
 if(app.money<terms.monthlyPrice)return {ok:false,message:'Not enough money for the first month of the lease.'};
 const leased=HorseHealth.copy(h);leased.id=uid();leased.owner='Your Stable';leased.isLessonHorse=false;leased.isLeased=true;leased.leaseSourceId=h.id;leased.leaseLocked=true;leased.leaseMonthlyCost=terms.monthlyPrice;leased.leaseDurationMonths=months;leased.leaseMonthsRemaining=months;leased.leasePrepaidFirstMonth=true;
 for(const condition of leased.medicalConditions||[])condition.horseId=leased.id;
 for(const [slot,item]of Object.entries(leased.lessonEquipment||{})){item.id=mgId();item.assignedHorseId=leased.id;leased.equipmentRefs[slot]=item.id;}
 lessonMakeLeaseAvailable(leased);app.money-=terms.monthlyPrice;app.horses.push(leased);h.barnAvailable=false;
 pushReport('Leased '+h.name+' for '+months+' month(s) at '+money(terms.monthlyPrice)+'/month. The first month is paid; later months are billed monthly.');
 return {ok:true,horse:leased};
}
function lessonBuyHorse(h,barn=app.currentBarn){
 const roster=app.lessonHorsesByBarn[barn?.id]||[],offer=h.lessonBuyout;
 if(!roster.includes(h)||offer?.status!=='available'||currentMonthAbsolute()>=offer.expiresMonth)return {ok:false,message:'This buyout offer is no longer available.'};
 if(app.money<offer.price)return {ok:false,message:'Not enough money for this buyout.'};
 const horse=lessonActiveLease(h)||h;app.money-=offer.price;offer.status='purchased';
 app.lessonHorsesByBarn[barn.id]=roster.filter(row=>row.id!==h.id);
 horse.lessonBuyout.status='purchased';lessonMakeLeaseAvailable(horse);horse.isLeased=false;horse.leaseLocked=false;horse.barnAvailable=true;
 delete horse.leaseSourceId;delete horse.leaseMonthsRemaining;delete horse.leaseDurationMonths;delete horse.leaseMonthlyCost;delete horse.leasePrepaidFirstMonth;
 for(const item of Object.values(horse.lessonEquipment||{})){item.barnOwned=false;mgState().items.push(item);}
 delete horse.lessonManagedTack;delete horse.lessonEquipment;
 if(!app.horses.includes(horse))app.horses.push(horse);
 pushReport('Bought '+horse.name+' from the lesson program for '+money(offer.price)+'.');return {ok:true,horse};
}
const LESSON_RELEASE=releaseLeasedHorseToLessonProgram;
releaseLeasedHorseToLessonProgram=function(h){
 const source=Object.values(app.lessonHorsesByBarn||{}).flat().find(row=>row.id===h.leaseSourceId);
 if(source)for(const key of ['stats','training2','riderBehavior','fatigue','illnesses','medicalConditions','showResults','earnings','totalPoints'])if(h[key]!=null)source[key]=HorseHealth.copy(h[key]);
 if(source)for(const condition of source.medicalConditions||[])condition.horseId=source.id;
 LESSON_RELEASE(h);
};
const LESSON_MONTH=monthlyProgress;monthlyProgress=function(...args){
 const before=currentMonthAbsolute(),result=LESSON_MONTH(...args);if(currentMonthAbsolute()===before)return result;
 for(const [id,roster]of Object.entries(app.lessonHorsesByBarn||{})){
  const barn=app.barnCatalog?.find(row=>row.id===id)||(app.currentBarn?.id===id?app.currentBarn:{id,lessonsStars:3});
  app.lessonHorsesByBarn[id]=lessonProcessOffers(barn,roster);
 }
 return result;
};
function lessonProfileDetails(h){
 const height=/hh/i.test(String(h.height))?String(h.height):h.height+' hh';
 const levels=Object.keys(SHOW_LEVELS).map(d=>'<li>'+mgEscape(d[0].toUpperCase()+d.slice(1))+': '+mgEscape(SHOW_LEVELS[d][highestAllowedLevelIndex(h,d)])+'</li>').join('');
 return '<section data-lesson-details><p>Personality: '+mgEscape(h.personality)+' · Coat: '+mgEscape(h.coat)+' · Height: '+mgEscape(height)+'</p><h4>Discipline levels</h4><ul>'+levels+'</ul><p>Barn-managed tack: '+Object.entries(h.tack||{}).filter(([slot])=>['bridle','bit','saddle','pad'].includes(slot)).map(([slot,type])=>mgEscape(slot)+': '+mgEscape(type)).join(' · ')+'</p><p>'+(h.lessonOverworked?'Overworked lesson horse at a facility rated below 2 stars for lessons. Tack may be unsuitable.':'Lesson workload managed by the barn. Tack selected for this horse’s personality.')+'</p></section>';
}
const LESSON_PROFILE=horseProfileMarkup;horseProfileMarkup=function(h,...args){return LESSON_PROFILE(h,...args)+(h.isLessonHorse||h.isLeased&&h.lessonLeaseTerms?lessonProfileDetails(h):'');};
const LESSON_RENDER=renderBarn;renderBarn=function(){
 LESSON_RENDER();const roster=currentBarnLessonHorses(),h=roster.find(row=>row.id===app.barnLessonSelectionId)||roster[0],box=document.getElementById('barn-lesson-profile');if(!h||!box)return;
 const terms=lessonEnsureTerms(h,app.currentBarn),active=lessonActiveLease(h),offer=h.lessonBuyout;
 for(const button of document.querySelectorAll('[data-lesson-profile]')){const source=roster.find(row=>row.id===button.dataset.lessonProfile);if(source&&lessonActiveLease(source)){const label=button.previousSibling;if(label?.nodeType===3)label.textContent=label.textContent.replace('Not available','Leased by you; available to ride');}}
 const train=document.getElementById('lesson-train-btn');if(train){train.disabled=!active&&!h.barnAvailable;train.onclick=()=>lessonOpenTraining(h);const note=train.parentElement.nextElementSibling;if(active&&note?.tagName==='P')note.textContent='Leased by you. Available to ride, train and enter shows through your active lease.';}
 box.insertAdjacentHTML('beforeend','<section data-lesson-lease><h4>Lease</h4><p>'+money(terms.monthlyPrice)+'/month · Available lease: 1–'+terms.maxMonths+' months. First month paid when signing.</p><label>Lease length (months)<select id="lesson-lease-months">'+Array.from({length:terms.maxMonths},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+'</option>').join('')+'</select></label>'+(offer.status==='available'?'<p>Buyout: '+money(offer.price)+' · Offer ends in '+Math.max(0,offer.expiresMonth-currentMonthAbsolute())+' month(s).</p><button id="lesson-buyout-btn">Buy this lesson horse</button>':'<p>Buyout: '+mgEscape(offer.status)+'.</p>')+'</section>');
 let lease=document.getElementById('lesson-lease-btn');if(!lease){lease=document.createElement('button');lease.id='lesson-lease-btn';lease.textContent='Lease';box.querySelector('[data-lesson-lease]').appendChild(lease);}
 lease.disabled=!h.barnAvailable||!!active;lease.onclick=()=>{const result=lessonStartLease(h,Number(document.getElementById('lesson-lease-months').value));if(!result.ok){alert(result.message);return;}saveGame(false);render();};
 const buy=document.getElementById('lesson-buyout-btn');if(buy)buy.onclick=()=>{const result=lessonBuyHorse(h);if(!result.ok){alert(result.message);return;}saveGame(false);render();};
};

const LESSON_LEASE_HYDRATE=hydrateFromSave;hydrateFromSave=function(data,...args){const result=LESSON_LEASE_HYDRATE(data,...args);lessonNormalizeLeases();return result;};
