/* Staff role integrated into Barn; care and training delegate to their existing engines. */
function manager85State(){return (app.staff85 ||= {}).horseManager ||= {id:'horse-manager:'+app.currentBarn.id,name:'Stable Horse Manager',role:'Horse Manager',hired:false,wage:120,barnId:app.currentBarn.id,toggles:{vet:false,farrier:false,treatment:false,training:false},history:[],processed:{},hiredAt:null};}
function manager85Log(m,h,day,feature,text,ok=true){m.history.push({day,horseId:h?.id,horse:h?.name||'Stable',feature,text,ok});m.history=m.history.slice(-150);}
function manager85Hire(){const m=manager85State(),day=csDay(),month=Math.floor(pastureCalendarHour()/720);if(m.hired)return {ok:true};const receipt=HorseHealth.ledger(app,'manager85:wage:'+m.id+':'+month,m.wage,day,null,[{name:'Horse Manager monthly wage',quantity:1,unitPrice:m.wage}]);if(!receipt)return {ok:false,message:'Insufficient funds for the monthly wage.'};m.hired=true;m.barnId=app.currentBarn.id;m.hiredAt=pastureCalendarHour();m.cursor=m.hiredAt;m.paidMonth=month;saveGame(false);return {ok:true};}
function manager85Set(feature,on){const m=manager85State();if(!Object.hasOwn(m.toggles,feature))return {ok:false};m.toggles[feature]=!!on;saveGame(false);return {ok:true};}
function manager85Care(m,h,day){
 csEnsure(h,day);const key=h.id+':'+day;
 if(m.toggles.vet&&!m.processed['vet:'+key]){
  m.processed['vet:'+key]=true;
  const dueFollowup=h.rehabilitationPlans.some(p=>p.status==='Active'&&p.followup<=day),last=h.vetVisits.filter(v=>v.type==='general').at(-1);
  if(dueFollowup||h.due?.checkup&&(!last||day-last.day>=180)){
   const result=HorseHealth.examine(app,h,dueFollowup?'followup':'general',day,'manager85:exam:'+key);
   if(result.ok){if(!dueFollowup){h.due ||= {};h.due.checkup=false;}csSync(h);}
   manager85Log(m,h,day,'vet',result.ok?(dueFollowup?'Veterinary follow-up completed.':'Routine veterinary check completed.'):result.message,result.ok);
  }
 }
 if(m.toggles.farrier&&h.hoofHealth.nextDue<=day&&!m.processed['farrier:'+key]){
  m.processed['farrier:'+key]=true;const service=h.hoofHealth.lostShoe?'lost':h.hoofHealth.shoes==='barefoot'?'routine':'reset',result=HorseHealth.farrier(app,h,service,day,'manager85:farrier:'+key,'prepare');
  manager85Log(m,h,day,'farrier',result.ok?'Scheduled farrier service completed.':result.message,result.ok);csSync(h);
 }
 if(m.toggles.treatment&&!m.processed['treatment:'+key]){
  m.processed['treatment:'+key]=true;
  for(const c of HorseHealth.current(h).filter(c=>c.confirmed)){
   let plan=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');
   if(!plan){const result=HorseHealth.plan(h,c.id,day);plan=result.plan;if(!result.ok){manager85Log(m,h,day,'treatment',result.message,false);continue;}}
   // Only the veterinarian's existing eligible services and prescriptions are followed.
   const service=HorseHealth.serviceOptions(h,c).find(o=>!o.blocked);
   if(service){const r=HorseHealth.clinicalService(app,h,c.id,service.id,day,'manager85:service:'+key+':'+c.id);manager85Log(m,h,day,'treatment',r.message||service.name+' '+(r.ok?'completed.':'could not be completed.'),r.ok);}
   for(const item of plan.supplies){if(!(app.careEconomy?.inventory||[]).some(i=>i.item===item&&i.quantity>0)){const r=HorseHealth.purchase(app,h,item,1,day,'manager85:stock:'+key+':'+c.id+':'+item);if(!r.ok)manager85Log(m,h,day,'treatment',r.message,false);}}
   for(const rx of h.prescriptions.filter(rx=>rx.conditionId===c.id&&rx.used<rx.quantity&&rx.expires>=day)){
    if(!(app.careEconomy?.inventory||[]).some(i=>i.prescription===rx.id&&i.quantity>0)){const r=HorseHealth.purchase(app,h,rx.item,1,day,'manager85:rx:'+key+':'+rx.id,rx.id);if(!r.ok){manager85Log(m,h,day,'treatment',r.message,false);continue;}}
    const r=HorseHealth.administer(app,h,rx.id,day,'manager85:medication:'+key+':'+rx.id);manager85Log(m,h,day,'treatment',r.message||(r.ok?rx.item+' administered as prescribed.':'Medication could not be administered.'),r.ok);
   }
   if(!c.hospitalized){const r=HorseHealth.completeCare(app,h,c.id,day,plan.supplies);manager85Log(m,h,day,'treatment',r.message,r.ok);}
  }
 }
}
function manager85ChooseTraining(h,hour){
 const t=t2horse(h),day=Math.floor(hour/24);if(h.deceased||h.retiredForever||h.retiredToBreeding||h.fatigue>=55||Number.isFinite(h.energy)&&h.energy<35||t.trainingSpan?.end>hour)return {reason:'Training skipped: recovery, workload or availability requires rest.'};
 if(HorseHealth.current(h).some(c=>HorseHealth.definition(c).restriction||HorseHealth.workloadAdvice(h,'ridden',1).some(a=>a.level>=2)))return {reason:'Training skipped: the current medical condition requires care or restricted work.'};
 const prior=[...new Set([...(t.manager85Days||[]),...t.history.filter(r=>r.exercises?.length).map(r=>Math.floor(r.time/24))])];if(prior.some(d=>day-d<2)||prior.filter(d=>day-d<7).length>=4)return {reason:'Training skipped: recent workload requires recovery.'};
 const discipline=h.age<=3||!canRideUnderSaddle(h)?'groundwork':(['jumping','dressage','eventing','hunter'].includes(h.mainDiscipline)?h.mainDiscipline:'dressage');
 const facility=t2facilities().find(f=>f.location==='Indoor')||t2facilities()[0];if(!facility)return {reason:'No suitable training facility is available.'};
 const exercises=T2_EXERCISES.filter(e=>t2disciplineExercise(e,discipline)&&e.intensity<=2&&!t2eligibility(h,e,{discipline,location:facility.location,height:.5})&&!t2weatherRestriction(e,facility.location,t2weather(hour)));
 const last=t.history.at(-1)?.exercises?.map(e=>e.name)||[];
 const score=e=>{const map=originalSkillMapping(e,{discipline}),current=map.group==='education'?(map.primary==='Confidence'?h.confidenceFlat||0:(h.behavior||0)/10):h.stats?.[map.group]?.[map.primary]??100;const potential=map.group==='education'?100:h.potential?.[discipline]??100;return current/Math.max(1,potential)+(last.includes(e.name)?.2:0)+careerRoll(h.id,'manager85:'+day+':'+e.id)*.12;};
 exercises.sort((a,b)=>score(a)-score(b));if(!exercises.length)return {reason:'No eligible balanced exercise is currently available.'};const exercise=exercises[0];return {discipline,exercise,facility};
}
function manager85Hour(hour){
 const m=app.staff85?.horseManager;if(!m?.hired||hour<m.hiredAt||hour<=m.cursor||m.barnId!==app.currentBarn?.id)return;
 m.cursor=hour;const day=Math.floor(hour/24),month=Math.floor(hour/720),time=hour%24;
 if(time<9||time>17)return;
 if(m.paidMonth!==month){const receipt=HorseHealth.ledger(app,'manager85:wage:'+m.id+':'+month,m.wage,day,null,[{name:'Horse Manager monthly wage',quantity:1,unitPrice:m.wage}]);if(!receipt){if(m.unpaidDay!==day){m.unpaidDay=day;manager85Log(m,null,day,'wage','Manager duties paused: monthly wage could not be paid.',false);}return;}m.paidMonth=month;}
 const horses=app.horses.filter(h=>!h.deceased&&(h.owner==='Your Stable'||h.isLeased)&&(!(h.barnId||h.pastureBooking?.barnId||h.stallBooking?.barnId)||(h.barnId||h.pastureBooking?.barnId||h.stallBooking?.barnId)===m.barnId));
 const previous=careSimulationHour;careSimulationHour=hour;
 try{
  if(time===9)for(const h of horses)manager85Care(m,h,day);
  if(!m.toggles.training||m.busyUntil>hour||t2state().session||app.activeShow||app.competitionRpg)return;
  const available=horses.filter(h=>!m.processed['training:'+h.id+':'+day]).sort((a,b)=>(t2horse(a).manager85Days?.at(-1)??-Infinity)-(t2horse(b).manager85Days?.at(-1)??-Infinity));
  for(const h of available){m.processed['training:'+h.id+':'+day]=true;const chosen=manager85ChooseTraining(h,hour);if(chosen.reason){manager85Log(m,h,day,'training',chosen.reason,false);continue;}
   const t=t2horse(h);if(t.trainingSpan?.end<=hour)t.trainingSpan=null;
   const result=t2start(h,{discipline:chosen.discipline,disciplineSkill:originalSkillMapping(chosen.exercise,{discipline:chosen.discipline}).group+':'+originalSkillMapping(chosen.exercise,{}).primary,lesson:[chosen.exercise.id],facilityId:chosen.facility.id,length:35,hour},true);
   if(result.ok&&result.session.attempts>0){t.manager85Days=[...(t.manager85Days||[]),day].filter(d=>day-d<30);m.busyUntil=hour+1;manager85Log(m,h,day,'training',chosen.exercise.name+': '+result.session.attempts+' actual attempts completed.');break;}
   manager85Log(m,h,day,'training',result.message||'Session stopped before any actual training attempts.',false);
  }
 }finally{careSimulationHour=previous;}
 if(time===17){for(const key of Object.keys(m.processed))if(Number(key.split(':').at(-1))<day-60)delete m.processed[key];}
}
const MANAGER85_HOUR=simulatePastureHour;
simulatePastureHour=function(hour){const result=MANAGER85_HOUR(hour);manager85Hour(hour);return result;};
const MANAGER85_BARN=renderBarn;
renderBarn=function(...args){const out=MANAGER85_BARN(...args),m=manager85State(),panel=document.getElementById('barn'),box=document.createElement('section');box.className='box';box.innerHTML=`<h3>Staff · Horse Manager</h3><p>${csEscape(m.name)} · ${m.hired?'Employed':'Not employed'} · ${money(m.wage)} per game month · Assigned barn: ${csEscape((app.barnCatalog||[]).find(b=>b.id===m.barnId)?.name||(m.barnId===app.currentBarn.id?app.currentBarn.name:m.barnId))}</p><button type="button" data-manager85-hire>${m.hired?'Dismiss Horse Manager':'Hire Horse Manager'}</button>${m.hired&&m.barnId!==app.currentBarn.id?'<button type="button" data-manager85-assign>Assign to this barn</button>':''}${[['vet','Automatic Vet Checks'],['farrier','Automatic Farrier Appointments'],['treatment','Automatic Treatment'],['training','Automatic Balanced Training']].map(([key,label])=>`<label><input type="checkbox" data-manager85-toggle="${key}"${m.toggles[key]?' checked':''}>${label}</label>`).join('')}<p>Training is selected dynamically from existing exercises; no manual schedule is required.</p><p role="status" data-manager85-status></p><details><summary>Horse Manager Activity</summary>${m.history.slice(-30).reverse().map(row=>`<p>${csEscape(csDate(row.day))} — ${csEscape(row.horse)}: ${csEscape(row.text)}</p>`).join('')||'<p>No tasks processed yet.</p>'}</details>`;panel.appendChild(box);box.querySelector('[data-manager85-hire]').onclick=()=>{if(m.hired){m.hired=false;saveGame(false);renderBarn();}else{const r=manager85Hire();if(r.ok)renderBarn();else box.querySelector('[data-manager85-status]').textContent=r.message;}};if(box.querySelector('[data-manager85-assign]'))box.querySelector('[data-manager85-assign]').onclick=()=>{m.barnId=app.currentBarn.id;m.cursor=pastureCalendarHour();saveGame(false);renderBarn();};box.querySelectorAll('[data-manager85-toggle]').forEach(input=>input.onchange=()=>manager85Set(input.dataset.manager85Toggle,input.checked));return out;};
const MANAGER85_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){const result=MANAGER85_LOAD(data,...args);app.settings.horseStatEditor85=data.settings?.horseStatEditor85===true;app.staff85=data.staff85?HorseHealth.copy(data.staff85):{};return result;};
const MANAGER85_RESET=resetGame;
resetGame=function(...args){const out=MANAGER85_RESET(...args);app.staff85={};return out;};
