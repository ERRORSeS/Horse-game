/* Advice is derived from existing clinical state; reading it never examines a horse. */
const V3_QUESTIONS=['What is wrong with my horse?','How serious is it?','What caused this?','Could this become permanent?','What treatment does my horse need?','Which items should I buy?','What medication is prescribed?','What happens if I miss treatment?','How long will recovery take?','Has my horse improved?','When should I return for a check?','Can the injury happen again?','Can I walk my horse?','Can I do groundwork?','Can I lunge?','Can I use ground poles?','Can I ride flatwork?','Can I canter or do collected work?','Can I jump?','Can I compete?','What if I ignore your advice?','What can I safely focus on instead?','Has your recommendation changed?','What is the long-term outlook?'];
function v3answer(h,c,p,index){
 const d=HorseHealth.definition(c),advice=(activity,load)=>HorseHealth.workloadAdvice(h,activity,load).find(r=>r.conditionId===c.id);
 if(index>=12&&index<=19){const [activity,load]=[['handling',1],['handling',1],['lunge',2],['ridden',2],['ridden',2],['ridden',3],['jump',4],['competition',5]][index-12],a=advice(activity,load);return `${a.status}. ${a.reason} Unsuitable work may aggravate the condition or delay recovery. Separate competition rules still apply.`;}
 const stock=app.careEconomy?.inventory||[],remaining=Math.max(0,c.recoveryDays-c.recoveryProgress),rx=h.prescriptions.filter(r=>r.conditionId===c.id&&r.expires>=csDay());
 return [
 `The current diagnosis is ${d.name}, affecting ${d.category}, classified as ${c.severity}.`,
 `Current severity: ${c.severity}. ${d.validTreatments.join(' ')}`,
 c.cause||'The cause remains uncertain; further investigation may be necessary.',
 `Lasting effects depend on severity and further injury. ${c.residual?'Lasting changes are documented.':'No lasting change has been established.'}`,
 p?.care||'Request a treatment plan for this diagnosis.',
 p?.supplies.map(item=>`${item} — $${HorseHealth.supplies[item]?.price||0}; owned ${stock.filter(i=>i.item===item).reduce((n,i)=>n+i.quantity,0)}`).join('; ')||'No supplies are currently required.',
 rx.map(r=>`${r.item}, prescribed for ${d.name}`).join('; ')||'No medication purchase is currently required.',
 `Missing scheduled care can delay recovery. Completed care days: ${c.careLog?.filter(r=>r.ok).length||0}.`,
 `Estimated remaining recovery: ${Math.max(1,Math.floor(remaining*.8))}–${Math.max(2,Math.ceil(remaining*1.3))} in-game days. Estimates may change after examination.`,
 `Current stage: ${c.stage}. Recorded recovery progress: ${c.recoveryProgress} care days. New observations require veterinary assessment.`,
 p?`Next recommended examination: ${csDate(p.followup)}.`:'Request a treatment plan.',
 'Recurrence depends on the condition, recovery and future workload.',
 ...Array(8).fill(''),
 'Unsuitable work can cause discomfort or a recovery setback. One session does not guarantee deterioration; repeated exposure increases risk.',
 'Choose work marked Recommended and review the horse’s comfort.',
 p?.adviceHistory?.length?`Latest reassessment: ${p.adviceHistory.at(-1).previous} → ${p.adviceHistory.at(-1).current}. Reason: ${p.adviceHistory.at(-1).reason}.`:'The recommendation has not changed since the previous assessment.',
 c.residual?'Lasting changes are documented; request an individual workload assessment.':'The long-term outlook requires reassessment of clinical recovery.'
 ][index];
}
const V3_RENDER_VET=renderVet;
renderVet=function(){
 V3_RENDER_VET();const panel=document.getElementById('vet'),h=app.horses.find(h=>h.id===(app.vetSelection?.horseId||app.horses[0]?.id));if(!h)return;
 panel.querySelector('#cs-care')?.closest('details')?.remove();const topic=panel.querySelector('#cs-vet-topic');if(topic)topic.closest('label').remove();panel.querySelector('#cs-vet-discuss')?.remove();panel.querySelector('#cs-vet-reply')?.remove();
 const node=document.createElement('section');node.className='box v3-clinic';node.innerHTML='<p class="shop-eyebrow">VETERINARY CARE</p><h3>Your horse’s care desk</h3><label for="v3-question">Ask your veterinarian</label><select id="v3-question"><option value="">Choose a question…</option>'+V3_QUESTIONS.map((q,i)=>i>=12&&i<=19?'':`<option value="${i}">${csEscape(q)}</option>`).join('')+'<option value="workload">What workload can my horse do?</option></select><div id="v3-answer" class="v3-answer" role="status" aria-live="polite" hidden></div>'+HorseHealth.current(h).filter(c=>c.confirmed).map(c=>{
 const p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');return `<details class="v3-condition"><summary>${csEscape(HorseHealth.definition(c).name)} — ${csEscape(c.stage)}</summary>${p?`<p>Diagnosed: ${csDate(p.day)} · Severity: ${csEscape(c.severity)} · Elapsed: ${Math.max(0,csDay()-p.day)} days</p><p>Estimated recovery window: ${(p.estimatedRecovery||[c.recoveryDays,c.recoveryDays]).join('–')} days. Recovery estimates may change after further veterinary assessment.</p><p>Next recommended vet check: ${csDate(p.followup)} · Recent setbacks: ${c.setbacks?.length||0}</p><details><summary>Veterinary Treatment Shopping List</summary>${p.supplies.map(item=>`<p>${csEscape(item)} — $${HorseHealth.supplies[item]?.price||0} · owned ${(app.careEconomy?.inventory||[]).filter(i=>i.item===item).reduce((n,i)=>n+i.quantity,0)}</p>`).join('')||'<p>No supplies required.</p>'}<button data-v3-buy="${csEscape(c.id)}">Purchase Missing Items</button></details>`:''}${p?`<details><summary>Apply Treatment</summary><p>Select the items for today's scheduled care. Professional services and prescribed courses remain separately authorized.</p>${(app.careEconomy?.inventory||[]).filter(i=>i.quantity>0&&i.kind==='supply').map(i=>`<label class="checkbox-label"><input type="checkbox" data-v3-item="${csEscape(c.id)}" value="${csEscape(i.item)}">${csEscape(i.item)} × ${i.quantity} — ${p.supplies.includes(i.item)?'Suitable':'Not suitable'}</label>`).join('')}<button data-v3-complete="${csEscape(c.id)}">Complete Care Task</button></details>`:''}</details>`;
 }).join('');panel.appendChild(node);const reproduction=Array.from(panel.querySelectorAll('h3')).find(n=>n.textContent==='Reproduction')?.closest('.box');if(reproduction){const previousGrid=reproduction.parentElement;reproduction.classList.add('v3-clinic');panel.appendChild(reproduction);if(previousGrid?.classList.contains('grid')&&previousGrid.children.length===1)previousGrid.style.gridTemplateColumns='1fr';}
 const question=node.querySelector('#v3-question'),answer=node.querySelector('#v3-answer');
 question.onchange=()=>{const value=question.value;answer.hidden=!value;if(!value)return;const conditions=HorseHealth.current(h).filter(c=>c.confirmed);if(!conditions.length){answer.textContent='No diagnosis has been confirmed. Record observations and request an examination for individual advice.';return;}
 if(value==='workload'){
 const activities=[['Turnout','handling',1],['Hand-Walking','handling',1],['In-Hand Groundwork','handling',1],['Lunging Walk','lunge',1],['Lunging Trot','lunge',2],['Lunging Canter','lunge',3],['Ridden Walk','ridden',1],['Ridden Trot','ridden',2],['Ridden Canter','ridden',3],['Flatwork','ridden',2],['Ground Poles','ridden',2],['Raised Poles / Cavaletti','ridden',3],['Dressage Schooling','ridden',3],['Collected / Lateral Work','ridden',4],['Small Jumping','jump',4],['Full Jumping','jump',5],['Hunter Schooling','jump',4],['Eventing Dressage','ridden',3],['Cross-Country Schooling','jump',5],['Competitions','competition',5]];
 answer.innerHTML='<h4>Your current workload advice</h4><p>These recommendations consider the current medical record. You decide which activities to choose; ordinary training prerequisites and official competition rules still apply.</p>'+conditions.map(c=>'<p>'+csEscape(HorseHealth.definition(c).name+': '+HorseHealth.definition(c).validTreatments.join(' '))+'</p>').join('')+'<dl class="v3-workload">'+activities.map(([name,activity,load])=>{const rows=HorseHealth.workloadAdvice(h,activity,load).filter(a=>conditions.some(c=>c.id===a.conditionId)),worst=rows.sort((a,b)=>b.level-a.level)[0];return `<div><dt>${csEscape(name)}</dt><dd><strong>${csEscape(worst?.status||'Recommended')}</strong></dd></div>`;}).join('')+'</dl><p>Unsuitable work can increase discomfort, delay recovery or aggravate an injury. A single session does not guarantee deterioration. Ask for a follow-up when signs change.</p>';
 }else answer.innerHTML=conditions.map(c=>`<h4>${csEscape(HorseHealth.definition(c).name)}</h4><p>${csEscape(v3answer(h,c,h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active'),Number(value)))}</p>`).join('');
 };
 const services=Array.from(panel.querySelectorAll('h3')).find(n=>n.textContent==='Professional Treatment Services')?.closest('.box');if(services)services.classList.add('v3-clinic','v3-services');

 node.querySelectorAll('[data-v3-buy]').forEach(b=>b.onclick=()=>{const p=h.rehabilitationPlans.find(p=>p.conditionId===b.dataset.v3Buy&&p.status==='Active');for(const item of p.supplies){const owned=(app.careEconomy?.inventory||[]).filter(i=>i.item===item).reduce((n,i)=>n+i.quantity,0);if(!owned){const result=HorseHealth.purchase(app,h,item,1,csDay(),csId('missing'));if(!result.ok)return csNotice(result);}}csNotice({});});
 node.querySelectorAll('[data-v3-complete]').forEach(b=>b.onclick=()=>csNotice(HorseHealth.completeCare(app,h,b.dataset.v3Complete,csDay(),Array.from(node.querySelectorAll('[data-v3-item]')).filter(i=>i.dataset.v3Item===b.dataset.v3Complete&&i.checked).map(i=>i.value))));
};

// Acknowledgement is persisted per horse/day/state and never resolves medical risk.
const V3_START=t2start;
t2start=function(h,draft,quick=false){
 if(h&&(!quick||!draft.v3Scheduled)){
  const choices=(draft.lesson||[]).map(id=>t2exercise(id)).filter(Boolean).flatMap(e=>HorseHealth.workloadAdvice(csEnsure(h),e.category==='Jumping'?'jump':e.id.startsWith('lunge-')?'lunge':e.category==='Groundwork'?'handling':'ridden',e.intensity));
  const worst=choices.sort((a,b)=>b.level-a.level)[0];
  const state=HorseHealth.current(h).map(c=>[c.id,c.severity,c.stage,c.setbacks?.length||0].join(':')).join('|');
  const key=`${csDay()}:${state}`;
  if(worst?.level>=2&&(!(h.vetWarningAcknowledgement?.key===key)||h.vetWarningAcknowledgement.level<worst.level)){
   const existing=document.getElementById('v3-warning');existing?.remove();
   const warning=document.createElement('dialog');warning.id='v3-warning';warning.innerHTML=`<h3>Veterinary Advice</h3><p>${csEscape(worst.status+'. '+worst.reason+' This workload may worsen the condition or delay healing.')}</p><button data-continue>Continue Anyway</button> <button data-cancel>Choose Different Exercise</button>`;
   document.body.appendChild(warning);warning.querySelector('[data-cancel]').onclick=()=>warning.remove();warning.querySelector('[data-continue]').onclick=()=>{h.vetWarningAcknowledgement={key,level:worst.level};warning.remove();t2start(h,draft,quick);if(typeof renderTraining2==='function')renderTraining2();else render();};warning.showModal();return {ok:false,message:'Review veterinary advice before continuing.'};
  }
 }
 return V3_START(h,draft,quick);
};

const V3_SCHEDULE_MARKUP=t2scheduleMarkup;
t2scheduleMarkup=function(h){return V3_SCHEDULE_MARKUP(h)+`<label class="checkbox-label"><input type="checkbox" id="v3-auto-avoid" data-horse="${csEscape(h.id)}" ${t2horse(h).avoidMedicallyDiscouragedWork?'checked':''}>Avoid medically discouraged Auto Training</label>`;};
document.addEventListener('change',event=>{if(event.target.id!=='v3-auto-avoid')return;const id=event.target.dataset.horse,h=app.horses.find(h=>h.id===id);if(h){t2horse(h).avoidMedicallyDiscouragedWork=event.target.checked;saveGame(false);}});

const V3_COMPETITION_RESULT=calculateCompetitionResult;
calculateCompetitionResult=function(h,d,level,interaction=null,entry=null){
 const result=V3_COMPETITION_RESULT(h,d,level,interaction,entry);
 if(entry?.id&&result.status!=='DQ'&&!result.medicalEvents){
  const medical=HorseHealth.workExposure(csEnsure(h),'competition',5,csDay(),'competition:'+entry.id);
  result.medicalEvents=medical.events||[];
  if(result.medicalEvents.length)result.resultText=(result.resultText||'')+' '+result.medicalEvents.join(' ');const event=calendarFindEvent(entry.eventId);if(event?.results?.[entry.id])event.results[entry.id]={...event.results[entry.id],...result};
 }
 return result;
};
const V3_REGISTER=registerCalendarHorseShow;
registerCalendarHorseShow=function(h,event){
 const issue=calendarRegistrationEligibility(h,event);if(issue)return {ok:false,message:issue};
 const advice=HorseHealth.workloadAdvice(csEnsure(h),'competition',5).sort((a,b)=>b.level-a.level)[0];
 const key=csDay()+':'+HorseHealth.current(h).map(c=>[c.id,c.severity,c.stage,c.setbacks?.length||0].join(':')).join('|');
 if(advice?.level>=2&&h.competitionVetAcknowledgement!==key){
  document.getElementById('v3-competition-warning')?.remove();const dialog=document.createElement('dialog');dialog.id='v3-competition-warning';dialog.innerHTML=`<h3>Veterinary Advice</h3><p>${csEscape(advice.status+'. '+advice.reason+' Competition may aggravate this concern. Official eligibility rules still apply.')}</p><button data-continue>Continue Anyway</button> <button data-cancel>Choose Different Exercise</button>`;document.body.appendChild(dialog);
  dialog.querySelector('[data-cancel]').onclick=()=>dialog.remove();dialog.querySelector('[data-continue]').onclick=()=>{h.competitionVetAcknowledgement=key;dialog.remove();csNotice(registerCalendarHorseShow(h,event));};dialog.showModal();return {ok:false,message:'Review veterinary advice before entering.'};
 }
 return V3_REGISTER(h,event);
};
