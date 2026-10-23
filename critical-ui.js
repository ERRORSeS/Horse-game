/* Existing systems: seller workflows, condition-bearing rescue intake and skip context. */
let criticalTimeMode='day';
const CRITICAL_CONTEXT=csContext;
csContext=function(h){return {...CRITICAL_CONTEXT(h),backgroundMode:criticalTimeMode};};
const CRITICAL_MONTH=monthlyProgress;
monthlyProgress=function(...args){const previous=criticalTimeMode;criticalTimeMode='month';try{return CRITICAL_MONTH(...args);}finally{criticalTimeMode=previous;}};
const CRITICAL_GENERATE_RESCUE=generateRescueHorse;
generateRescueHorse=function(){
  const template=CRITICAL_GENERATE_RESCUE(),h=baseHorse('untrained','npc');
  Object.assign(h,{name:template.name,breed:template.breed,age:template.age,gender:template.gender,owner:'Rescue Centre',weightStatus:'Moderate',isRescue:true,rescueId:template.id,requiresBreakingIn:false,rescueWeightDelay:0});
  HorseHealth.seedRescueHealth(h,csDay());
  template.actualHorse=h;template.rehabilitationProfile=h.rehabilitationProfile;template.weightStatus=h.weightStatus;template.isGreen=h.requiresBreakingIn;template.issues=[];
  template.note=['Underweight','Very Underweight'].includes(h.weightStatus)?'Visible Observation: Poor body condition. Veterinary assessment recommended.':h.rehabilitationProfile.profile==='behavior'?'Significant handling rehabilitation is needed. Veterinary intake is recommended.':'Veterinary assessment recommended. This horse has specific rehabilitation needs.';
  if(HorseHealth.current(h).some(c=>c.diagnosis==='imbalance'))template.note+=' Important Observation: Hooves appear excessively overgrown.';
  return template;
};
const CRITICAL_SALE_LIST=HorseSales.list;
HorseSales.list=function(state,h,...args){const l=CRITICAL_SALE_LIST(state,h,...args);if(l.direction==='buy'&&h.preSaleHealthProfile?.version===3&&h.preSaleHealthProfile.kind==='serious'){l.advertisedSuitability='Horse requiring assessment / rehabilitation project';l.trialAvailable=false;}return l;};
const CRITICAL_AD=csSaleMarkup;
csSaleMarkup=function(l){let html=CRITICAL_AD(l);if(l.advertisedSuitability)html=html.replace('<p>Asking ',`<p>${csEscape(l.advertisedSuitability)}</p><p>Asking `);if(l.direction==='sell')html=html.replace('data-cs-inquire=', 'data-owned-listing=');return html;};
const CRITICAL_TRANSACTION=csTransactionMarkup;
csTransactionMarkup=function(tx){if(tx.direction==='sell')return '<div class="box"><p>Manage this owned-horse listing in Owned Horse Sales below.</p></div>';let html=CRITICAL_TRANSACTION(tx);if(tx.ppe?.messages?.length)html=html.replace('<p>Findings:',`<div>${tx.ppe.messages.map(m=>'<p>'+csEscape(m)+'</p>').join('')}</div><p>Findings:`);return html.replace('<option>Advanced</option>','<option>Advanced</option><option>Digestive</option><option>Hoof</option><option>Eye</option>');};
const CRITICAL_SALE_FORM=csOpenSaleForm;
csOpenSaleForm=function(node,h){
  node.querySelector('[data-inline-sale]')?.remove();const form=document.createElement('form');form.className='box';form.setAttribute('data-inline-sale','');
  form.innerHTML=`<h4>List ${csEscape(h.name)} for Sale</h4><label>Asking price<input data-owned-ask type="number" min="1" step="1" value="${Math.round(horseWorth(h))}"></label><p data-owned-error role="status"></p><button type="submit">List for Sale</button><button type="button" data-owned-cancel>Cancel</button>`;
  node.appendChild(form);form.querySelector('[data-owned-cancel]').onclick=()=>form.remove();form.onsubmit=event=>{event.preventDefault();try{const l=HorseSales.list(app,h,Number(form.querySelector('[data-owned-ask]').value),csDay(),'sell');app.ownedSaleSelection=l.id;app.careSelectedTransaction=null;changeTab('sales');csNotice({message:'The listing is active. Buyer inquiries arrive as game time advances.'});}catch(error){form.querySelector('[data-owned-error]').textContent=error.message;}};
};
function ownedSaleMarkup(l){
  const txs=HorseSales.state(app).transactions.filter(t=>t.listingId===l.id),tx=txs.find(t=>!['Cancelled','Withdrawn','Declined','Complete'].includes(t.status))||txs.at(-1);
  const action=(name,label,disabled=false)=>`<button data-owned-action="${name}" data-listing="${csEscape(l.id)}" data-transaction="${csEscape(tx?.id||'')}" ${disabled?'disabled':''}>${label}</button>`;
  return `<details data-ui-key="owned-sale-${csEscape(l.id)}" ${l.id===app.ownedSaleSelection?'open':''}><summary>${csEscape(l.horse.name)} — ${csEscape(l.status)} — ${money(l.ask)}</summary><label>Asking price<input data-edit-price="${csEscape(l.id)}" type="number" min="1" step="1" value="${l.ask}"></label>${action('price','Edit Asking Price',l.status!=='Listing Active')}${action('view','View Inquiries')}${l.status==='Listing Active'?action('withdraw','Withdraw Listing'):''}${!tx?.buyerOffer?'<p>No buyer inquiry yet. Advance game time to allow buyers to respond.</p>':`<p>${csEscape(tx.buyerName||'NPC Buyer')} · ${csEscape(tx.status)} · offered ${money(tx.buyerOffer)}</p>${tx.conversation.map(r=>`<p>${csEscape(r.text)}</p>`).join('')}${HorseSales.active(app,tx)&&!tx.contract?`${action('accept','Accept Offer')}${action('decline','Decline Offer')}<label>Counteroffer<input data-counter="${csEscape(tx.id)}" type="number" min="1" step="1" value="${l.ask}"></label>${action('counter','Counteroffer')}${action('viewing','Arrange Viewing')}${action('ppe','Handle Veterinary Examination Request')}${action('contract','Review Contract',!tx.offer)}`:''}${tx.ppe?`<details open><summary>Buyer Veterinary Report</summary>${(tx.ppe.messages||[]).map(m=>`<p>${csEscape(m)}</p>`).join('')}<p>${csEscape(tx.ppe.uncertainty)}</p></details>`:''}${tx.contract?`<p>Contract: ${csEscape(tx.contract.registeredName)} (${csEscape(tx.contract.horseId)}), seller ${csEscape(tx.contract.seller)}, buyer ${csEscape(tx.contract.buyer)}, price ${money(tx.contract.price)}.</p><p>Disclosures: ${tx.contract.disclosedConditions.map(r=>csEscape(r.name)).join(', ')||'No confirmed condition disclosed; unknown concerns remain possible.'}</p>${tx.status==='Contract Draft'?`<label><input type="checkbox" data-owned-sign="${csEscape(tx.id)}"> I reviewed the identity, price, disclosures and terms.</label>${action('sign','Sign Contract')}`:''}${['Contract Signed','Transport Pending'].includes(tx.status)?action('complete','Complete Sale'):''}`:''}${tx.transferred?`<p>${csEscape(l.horse.name)} has been sold for ${money(tx.offer)}.</p>`:''}`}</details>`;
}
const CRITICAL_RENDER_SALES=renderSales;
renderSales=function(){
  CRITICAL_RENDER_SALES();const panel=document.getElementById('sales'),box=document.createElement('section');box.className='box';
  const listings=HorseSales.state(app).listings.filter(l=>l.direction==='sell');
  box.innerHTML=`<h2>Owned Horse Sales</h2><label>Owned horse<select data-owned-horse>${app.horses.filter(h=>!h.deceased&&!h.isLeased&&!listings.some(l=>l.horseId===h.id&&['Listing Active','Reserved'].includes(l.status))).map(h=>`<option value="${csEscape(h.id)}">${csEscape(h.name)}</option>`).join('')}</select></label><label>Asking price<input data-owned-new-price type="number" min="1" step="1" value="10000"></label><button data-owned-new>List for Sale</button>${listings.map(ownedSaleMarkup).join('')||'<p>No owned horses are listed yet.</p>'}`;
  panel.prepend(box);
  box.querySelector('[data-owned-new]').onclick=()=>{const h=app.horses.find(h=>h.id===box.querySelector('[data-owned-horse]').value);if(!h)return csNotice({ok:false,message:'Select an eligible owned horse.'});try{const l=HorseSales.list(app,h,Number(box.querySelector('[data-owned-new-price]').value),csDay(),'sell');app.ownedSaleSelection=l.id;csNotice({message:'The listing is active. Buyer inquiries arrive as game time advances.'});}catch(error){csNotice({ok:false,message:error.message});}};
  panel.querySelectorAll('[data-owned-listing]').forEach(b=>b.onclick=()=>{app.ownedSaleSelection=b.dataset.ownedListing;renderSales();});
  box.querySelectorAll('[data-owned-action]').forEach(b=>b.onclick=()=>{
    const l=listings.find(l=>l.id===b.dataset.listing),tx=HorseSales.state(app).transactions.find(t=>t.id===b.dataset.transaction),day=csDay(),action=b.dataset.ownedAction;app.ownedSaleSelection=l.id;let r;
    const value=(attr,key)=>Array.from(box.querySelectorAll('['+attr+']')).find(e=>e.getAttribute(attr)===key);
    if(action==='price')r=HorseSales.editPrice(app,l,Number(value('data-edit-price',l.id).value),day);
    if(action==='withdraw')r=HorseSales.withdrawListing(app,l,day);
    if(action==='view')r={ok:true,message:tx?.buyerOffer?`${tx.buyerName} offers ${money(tx.buyerOffer)}.`:'No buyer inquiry yet. The active listing can receive inquiries as time advances.'};
    if(action==='accept'||action==='decline'||action==='counter')r=HorseSales.respondOffer(app,tx,action,action==='counter'?Number(value('data-counter',tx.id).value):null,day);
    if(action==='viewing')r=HorseSales.say(app,tx,'viewing',day);
    if(action==='ppe')r=HorseSales.ppe(app,tx,'Advanced',day,csId('buyer-ppe'));
    if(action==='contract')r=HorseSales.contract(app,tx,day);
    if(action==='sign')r=HorseSales.sign(app,tx,value('data-owned-sign',tx.id).checked);
    if(action==='complete')r=HorseSales.completeSale(app,tx,day);
    csNotice(r);
  });
};

// Shared eligibility also covers legacy care/training and seller previews.
const CRITICAL_CAN_RIDE=canRideUnderSaddle;
canRideUnderSaddle=function(h){return !!h&&!HorseHealth.allowed(csEnsure(h),'ridden',1)&&CRITICAL_CAN_RIDE(h);};
const CRITICAL_CARE_STATUS=careTrainingStatus;
careTrainingStatus=function(h){return HorseHealth.allowed(csEnsure(h),'ridden',1)?'Medically Restricted / Unrideable':CRITICAL_CARE_STATUS(h);};
