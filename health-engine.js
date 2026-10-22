/* Persistent game medical truth. Pure engine: no DOM, timers, real treatment directions. */
(function (root) {
  'use strict';
  const copy = value => JSON.parse(JSON.stringify(value));
  const bounded = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  function hash(text) { let n = 2166136261; for (const c of String(text)) n = Math.imul(n ^ c.charCodeAt(0), 16777619); return n >>> 0; }
  // Independent, reproducible opportunities. Opening a menu cannot advance this stream.
  const roll = (seed, key) => { let n = hash(`${seed}|${key}`); n ^= n << 13; n ^= n >>> 17; n ^= n << 5; return (n >>> 0) / 4294967296; };
  function weighted(rows, value) { const total = rows.reduce((n, r) => n + r.weight, 0); let cursor = value * total; return rows.find(r => (cursor -= r.weight) < 0) || rows.at(-1); }
  const catalog = {};
  function condition(id, name, category, weight, days, signs, tests, options = {}) {
    catalog[id] = { id, name, category, weight, days, signs: signs.split('|'), tests: tests.split('|'), severity: 'minor', residual: 0, restriction: 'demanding', ...options };
  }
  condition('scratch', 'Superficial Scratch', 'skin', 45, [2,6], 'Small superficial mark on the coat', 'general|intake', { visible: true, contexts: ['rest','groom'], restriction: '', routine: true });
  condition('cut', 'Small Cut', 'skin', 25, [4,10], 'Visible small wound', 'general|intake', { visible: true, contexts: ['rest','groom'], residual: .01, routine: true });
  condition('rub', 'Abrasion / Tack Rub', 'skin', 15, [3,10], 'Skin irritation at a tack contact point', 'general|intake', { visible: true, contexts: ['groom','tack'], correction: 'tackCorrected', routine: true });
  condition('dermatitis', 'Rain-Related Dermatitis', 'skin', 7, [7,21], 'Changes in the coat and skin', 'general|intake', { visible: true, contexts: ['groom'], requires: 'wetExposure', residual: .01 });
  condition('skin-infection', 'Mild Skin Infection', 'skin', 5, [10,28], 'Localized heat|Localized swelling', 'general|blood', { requires: 'skinDamageExposure', contexts: ['legs','groom'], residual: .03, medication: 'Trimethoprim–Sulfadiazine' });
  condition('laceration', 'Significant Laceration', 'skin', 3, [21,60], 'Significant visible wound', 'emergency|general', { requires: 'trauma', visible: true, contexts: ['rest'], severity: 'major', restriction: 'all', residual: .15 });
  condition('tender-hoof', 'Mild Hoof Tenderness', 'hoof', 30, [3,14], 'Shortened stride on firm footing|Sensitivity during hoof handling', 'lameness|soundness|joint', { requires: 'firmFooting', contexts: ['hooves','trot','circle'], farrier: true });
  condition('lost-shoe', 'Lost Shoe', 'hoof', 20, [1,1], 'A shoe appears to be missing', 'hoof|joint', { requires: 'shod', visible: true, contexts: ['hooves'], farrier: true });
  condition('abscess', 'Hoof Abscess', 'hoof', 18, [7,28], 'Altered weight bearing|Hoof sensitivity', 'lameness|joint', { contexts: ['hooves','walk','trot'], severity: 'moderate', restriction: 'all', farrier: true });
  condition('bruise', 'Hoof Bruise', 'hoof', 15, [7,21], 'Movement differs on firm surfaces', 'lameness|soundness|joint', { requires: 'firmFooting', contexts: ['trot','circle'], farrier: true });
  condition('imbalance', 'Hoof Imbalance / Excessive Growth', 'hoof', 12, [7,21], 'Uneven hoof wear|Excessive hoof growth', 'hoof|joint|lameness', { requires: 'overdueHooves', visible: true, contexts: ['hooves'], farrier: true });
  condition('thrush', 'Thrush / Frog Infection', 'hoof', 5, [10,28], 'Changes around the frog', 'hoof|joint', { requires: 'wetDirtyHooves', contexts: ['hooves'], farrier: true });
  condition('soreness', 'Mild Muscle Soreness', 'muscle', 30, [1,5], 'Unusual stiffness|Difficulty during transitions', 'lameness|general|soundness', { requires: 'demandingWork', contexts: ['trot','circle','post'], routine: true, residual: .005 });
  condition('strain', 'Mild Soft-Tissue Strain', 'muscle', 25, [14,42], 'Subtle asymmetry|Mild localized swelling', 'lameness|ultrasound|soundness', { contexts: ['trot','circle','post'], severity: 'moderate', restriction:'high', residual: .05 });
  condition('tendon', 'Tendon Injury', 'muscle', 12, [90,240], 'Altered movement|Localized sensitivity', 'lameness|ultrasound|soundness', { requires: 'trauma', contexts: ['trot','circle','post'], severity: 'major', restriction: 'all', residual: .35 });
  condition('suspensory', 'Suspensory Ligament Injury', 'muscle', 10, [90,240], 'Subtle movement asymmetry|Reduced comfort during demanding work', 'lameness|ultrasound|soundness', { requires: 'trauma', contexts: ['circle','jump','post'], severity: 'major', restriction: 'all', residual: .35 });
  condition('synovitis', 'Joint Inflammation / Synovitis', 'muscle', 10, [21,60], 'Stiffness through turns|Reduced movement quality', 'lameness|radiographs|soundness', { contexts: ['circle','trot'], severity: 'moderate', residual: .2 });
  condition('back', 'Back or Saddle-Region Pain', 'muscle', 8, [7,42], 'Discomfort during tacking|Resistance to mounting', 'general|lameness|soundness', { requires: 'poorTackFit', contexts: ['tack','mount','jump'], correction: 'tackCorrected' });
  condition('djd', 'Degenerative Joint Disease', 'muscle', 3, [60,120], 'Recurring stiffness|Difficulty with collected work', 'lameness|radiographs|soundness', { minAge: 15, contexts: ['circle','trot'], chronic: true, severity: 'moderate' });
  condition('orthopedic', 'Significant Orthopedic Trauma', 'muscle', 2, [120,300], 'Marked movement abnormality', 'emergency|radiographs', { requires: 'trauma', contexts: ['walk','rest'], severity: 'major', restriction: 'all', residual: .6 });
  condition('respiratory', 'Mild Respiratory Infection', 'airway', 35, [7,21], 'Cough|Nasal discharge', 'general|respiratory|blood', { requires: 'infectiousExposure', contexts: ['rest','trot','post'], isolation: true });
  condition('influenza', 'Equine Influenza', 'airway', 15, [14,35], 'Cough|Fever|Nasal discharge', 'respiratory|blood', { requires: 'influenzaExposure', contexts: ['rest','post'], severity: 'moderate', restriction: 'all', isolation: true, vaccine: 'Equine Influenza' });
  condition('ehv', 'EHV-Associated Respiratory Disease', 'airway', 10, [14,35], 'Respiratory changes|Fever', 'respiratory|blood', { requires: 'ehvExposure', contexts: ['rest','post'], severity: 'moderate', restriction: 'all', isolation: true, vaccine: 'EHV-1/EHV-4' });
  condition('strangles', 'Strangles', 'airway', 8, [21,60], 'Swelling around the throat|Fever|Nasal discharge', 'respiratory|blood', { requires: 'stranglesExposure', contexts: ['rest'], severity: 'moderate', restriction: 'all', isolation: true, vaccine: 'Strangles' });
  condition('asthma', 'Equine Asthma', 'airway', 15, [21,60], 'Recurring cough|Reduced exercise tolerance', 'respiratory', { requires: 'dustExposure', contexts: ['trot','post'], chronic: true, correction: 'airQualityCorrected' });
  condition('airway-irritation', 'Environmental Airway Irritation', 'airway', 17, [3,14], 'Occasional cough', 'respiratory|general', { requires: 'dustExposure', contexts: ['rest','trot'], correction: 'airQualityCorrected' });
  condition('digestive-upset', 'Mild Digestive Upset', 'digestive', 35, [1,4], 'Appetite change|Manure change', 'general', { contexts: ['rest','groom'], routine: true });
  condition('colic', 'Colic Episode', 'digestive', 20, [3,14], 'Repeated abdominal discomfort', 'emergency', { contexts: ['rest'], severity: 'major', emergency: true, restriction: 'all' });
  condition('ulcers', 'Gastric Ulcer Syndrome', 'digestive', 20, [28,60], 'Altered appetite|Unexplained condition loss|Handling discomfort', 'gastroscopy', { contexts: ['rest','tack'], severity: 'moderate', residual: .05, recurrence: .25, medication: 'Omeprazole' });
  condition('parasites', 'Parasite-Related Illness', 'digestive', 15, [14,42], 'Condition loss|Altered manure', 'parasite', { requires: 'parasiteExposure', contexts: ['rest'], severity: 'moderate', medication: 'Ivermectin package' });
  condition('digestive-illness', 'Significant Digestive Illness', 'digestive', 10, [21,60], 'Persistent appetite loss|Abdominal discomfort', 'emergency|blood', { contexts: ['rest'], severity: 'major', restriction: 'all' });
  condition('dental', 'Dental Sharp Points / Oral Discomfort', 'mouth', 40, [7,14], 'Difficulty with contact|Feeding changes', 'dental', { requires: 'dentalOverdue', contexts: ['rest','tack','trot'] });
  condition('eye', 'Eye Irritation', 'mouth', 25, [3,14], 'Watering eye|Eye sensitivity', 'eye|emergency', { visible: true, contexts: ['rest','groom'], restriction: 'all' });
  condition('cornea', 'Corneal Injury', 'mouth', 10, [14,35], 'Painful-looking eye|Eye held closed', 'eye|emergency', { requires: 'trauma', visible: true, contexts: ['rest','groom'], emergency: true, severity: 'moderate', restriction: 'all' });
  condition('ear', 'Ear Irritation', 'mouth', 15, [7,21], 'Ear sensitivity|Headshaking', 'ear|general', { contexts: ['groom','tack'] });
  condition('oral', 'Other Oral Condition', 'mouth', 10, [7,28], 'Feeding difficulty|Mouth sensitivity', 'dental', { contexts: ['rest','tack'] });
  condition('dehydration', 'Mild Dehydration', 'general', 25, [1,3], 'Reduced energy|Drinking pattern changes', 'general|blood', { requires: 'hydrationRisk', contexts: ['rest','post'], routine: true });
  condition('heat', 'Heat-Related Illness', 'general', 10, [3,14], 'Failure to settle after work|Marked heat discomfort', 'emergency|general', { requires: 'heatExposure', contexts: ['post'], emergency: true, severity: 'major', restriction: 'all' });
  condition('fatigue', 'Significant Fatigue / Overexertion', 'general', 25, [2,7], 'Unusual exhaustion after ordinary work', 'general', { requires: 'overexertion', contexts: ['post'], restriction: 'all', routine: true });
  condition('fever', 'Unexplained Fever', 'general', 15, [3,14], 'Unusual warmth|Reduced appetite', 'general|blood', { contexts: ['rest'], severity: 'moderate', restriction: 'all' });
  condition('weight-loss', 'Weight-Loss Investigation', 'general', 15, [21,60], 'Loss of body condition', 'general|blood|dental', { requires: 'weightLoss', contexts: ['rest'], severity: 'moderate' });
  condition('age-related', 'Age-Related Management Condition', 'general', 10, [30,90], 'Persistent changes in energy or condition', 'general|blood', { minAge: 20, contexts: ['rest'], chronic: true });
  condition('contusion','Pasture Contusion','muscle',1,[3,10],'Localized bruising|Movement discomfort','general|lameness',{requires:'trauma',contexts:['rest','walk','groom'],restriction:'all',routine:true});
  const exams = {
    general: ['General Physical Exam',90], intake: ['Rescue Intake Exam',140], lameness: ['Lameness Evaluation',180], soundness: ['Detailed Soundness Exam',350], ultrasound: ['Ultrasound',180], radiographs: ['Radiographs',250], blood: ['Bloodwork',110], respiratory: ['Respiratory Assessment',135], dental: ['Dental Examination',120], gastroscopy: ['Gastroscopy',350], emergency: ['Emergency Consultation',300], followup: ['Follow-Up',65], eye: ['Eye Examination',90], ear: ['Ear Examination',90], parasite: ['Targeted Parasite Test',90], hoof: ['Hoof Assessment',35], joint: ['Farrier-Vet Joint Assessment',170]
  };
  const supplies = Object.fromEntries([['Sterile Gauze',12],['Non-Adherent Dressing',15],['Cohesive Bandage',10],['Cotton Padding',14],['Saline Rinse',9],['Digital Thermometer',20],['Disposable Gloves',8],['Clean Towels',7],['Hoof Pick',8],['Hoof Brush',9],['Routine Hoof Dressing',22],['Horse-Safe Shampoo',18],['Fly Mask',25],['Fly Sheet',70],['Cooling Wraps',45],['First-Aid Box',35],['Treatment Folder',12]].map(([name,price])=>[name,{name,price,kind:'supply'}]));
  const medicines = Object.fromEntries([['Phenylbutazone',45],['Flunixin',65],['Firocoxib',95],['Omeprazole',120],['Sucralfate',85],['Trimethoprim–Sulfadiazine',75],['Penicillin G veterinary package',110],['Ceftiofur',125],['Dexamethasone',50],['Ivermectin package',28],['Moxidectin',38],['Praziquantel',35],['Electrolytes',25],['Antiseptic',22]].map(([name,price])=>[name,{name,price,kind:'medicine'}]));
  const farrierServices = { basic:['Basic Trim',45], routine:['Full Routine Trim',65], front:['Front Shoes',95], full:['Full Set',160], reset:['Reset',115], lost:['Lost Shoe Replacement',55], balance:['Hoof Balance Assessment',35], joint:['Farrier-Vet Joint Assessment',170], therapeutic:['Therapeutic Plan',240] };
  const arrays = ['medicalConditions','observableSigns','playerObservations','suspectedDiagnoses','confirmedDiagnoses','previousConditions','prescriptions','vaccinations','vetVisits','diagnosticTests','medicalRestrictions','rehabilitationPlans','conditionRiskFactors','medicalTimeline'];
  function ensure(h, day) {
    if (h.medicalVersion === 1) return h;
    arrays.forEach(key => { if (!Array.isArray(h[key])) h[key] = []; });
    h.medicalVersion = 1; h.healthSeed = hash(h.id + '|medical'); h.healthProcessedDay = day;
    h.hoofHealth = h.hoofHealth || { condition: h.hoofCare ?? 65, balance: 70, growth: 0, shoes: 'barefoot', lostShoe: false, nextDue: day + 42, observations: [], findings: [], history: [], handling: 0 };
    // Legacy records remain byte-for-byte accessible; migration never manufactures disease.
    h.legacyMedicalRecords = copy(h.illnesses || []);
    for (const [i, old] of (h.illnesses || []).entries()) {
      const def = Object.values(catalog).find(d => d.name.toLowerCase() === String(old.name).toLowerCase());
      const c = add(h, def?.id || 'legacy', day, { id: `${h.id}:legacy:${i}`, legacyName: old.name, known: !old.hidden, severity: old.severity === 'Easy' ? 'minor' : 'moderate', recoveryDays: Math.max(1, (old.remaining || 1) * 30), resolved: old.active === false, legacy: copy(old) });
      if (c.resolved) { c.stage = 'Resolved'; h.previousConditions.push(copy(c)); }
    }
    for (const [i, old] of (h.hiddenIllnesses || []).entries()) add(h, 'legacy', day, { id: `${h.id}:hidden:${i}`, legacyName: old.name, legacy: copy(old) });
    return h;
  }
  function definition(c) { return catalog[c.diagnosis] || { ...catalog.strain, name: c.legacyName || 'Legacy Medical Record', tests:['general','soundness'], residual:0 }; }
  function add(h, diagnosis, day, extra = {}) {
    const def = catalog[diagnosis] || { ...catalog.strain, id:'legacy' };
    if (extra.id && h.medicalConditions.some(c=>c.id===extra.id)) return h.medicalConditions.find(c=>c.id===extra.id);
    const id = extra.id || `${h.id}:condition:${day}:${h.medicalConditions.length}`;
    const c = { id, horseId:h.id, diagnosis, category:def.category, region:def.category === 'hoof' ? 'hoof' : def.category === 'muscle' ? 'limb / back' : def.category, onset:day, cause:extra.cause || 'existing physiological condition', severity:def.severity, stage:'Active', symptoms:[...def.signs], known:false, suspected:false, confirmed:false, resolved:false, residual:false, recoveryDays:def.days[0]+Math.floor(roll(h.healthSeed,id)* (def.days[1]-def.days[0]+1)), recoveryProgress:0, ...extra };
    h.medicalConditions.push(c);if(diagnosis==='lost-shoe'&&!c.resolved)h.hoofHealth.lostShoe=true;
    if (c.known) { c.confirmed=true; h.confirmedDiagnoses.push({conditionId:id,name:definition(c).name,day,legacy:true}); }
    h.medicalTimeline.push({day,kind:c.known?'Legacy Medical Record':'internal',conditionId:id});
    return c;
  }
  function current(h) { return h.medicalConditions.filter(c=>!c.resolved); }
  function allowed(h, activity, intensity=1) {
    if (['jump','ridden','lunge','competition'].includes(activity) && ['Very Underweight'].includes(h.weightStatus)) return 'The current body condition requires stabilization before this activity.';
    for (const c of current(h)) { const d=definition(c); if (d.restriction==='all' && (!c.resolved)) return 'A health concern requires professional assessment and rest before this activity.'; if ((d.restriction==='demanding' && intensity>=2||d.restriction==='high'&&intensity>=3)) return 'Demanding work is restricted pending veterinary review.'; }
    if (h.medicalConditions.some(c=>c.residual) && intensity>=3) return 'The documented residual limitation requires an adjusted workload.';
    return '';
  }
  function observe(h, context, day, eventId) {
    const key=`observe:${eventId}:${context}`;
    if ((h.healthEvents ||= {})[key]) return [];
    h.healthEvents[key]=true;
    const found=[];
    for (const c of current(h)) {
      const d=definition(c); if (!(d.contexts || ['trot','circle','post']).includes(context)) continue;
      const previous=h.playerObservations.filter(o=>o.conditionId===c.id).length;
      const chance=Math.min(.95,(d.visible?.9:['circle','jump'].includes(context)?.65:.35)+previous*.1);
      if (roll(h.healthSeed,`${key}:${c.id}`)>=chance) continue;
      const sign=d.signs[Math.floor(roll(h.healthSeed,`${key}:${c.id}:sign`)*d.signs.length)];
      const record={day,context,text:sign,conditionId:c.id,strength:d.emergency?'Emergency sign':d.visible?'Obvious clinical sign':previous?'Repeated clue':'Weak clue'};
      h.observableSigns.push(record);h.playerObservations.push(record);found.push(record);
    }
    return found;
  }
  function publicView(h) {
    return { observations:h.playerObservations.map(({conditionId,...o})=>o), suspected:h.suspectedDiagnoses.map(({conditionId,...o})=>o), confirmed:h.confirmedDiagnoses.map(d=>({...d,resolved:h.medicalConditions.find(c=>c.id===d.conditionId)?.resolved || false})), history:h.previousConditions.filter(c=>c.known||c.confirmed).map(c=>({name:definition(c).name,stage:c.stage,residual:c.residual})), upcoming:h.rehabilitationPlans.map(p=>({followup:p.followup,status:p.status})), vaccinations:copy(h.vaccinations) };
  }
  function funds(state, total) { return Number.isFinite(total) && total>=0 && Number.isFinite(state.money) && state.money>=total; }
  function ledger(state, key, total, day, h, lines, extra={}) {
    const store=state.careEconomy ||= {receipts:[],inventory:[],operations:{}};
    if (store.operations[key]) return store.operations[key];
    if (!key || !funds(state,total)) return null;
    const receipt={number:`CARE-${store.receipts.length+1}`,date:day,stable:'Your Stable',horseId:h?.id,horse:h?.name,items:copy(lines),total,status:'Paid',...extra};
    state.money-=total;store.receipts.push(receipt);store.operations[key]=receipt;return receipt;
  }
  function examine(state,h,type,day,eventId) {
    if (!exams[type]) return {ok:false,message:'Unknown examination.'};
    const prior=h.vetVisits.find(v=>v.id===eventId);if(prior)return {ok:true,report:prior};
    if(h.vetVisits.some(v=>v.day===day&&v.type===type)) return {ok:false,message:'This examination is already recorded today. Review the report or discuss a targeted test.'};
    const receipt=ledger(state,`exam:${h.id}:${eventId}`,exams[type][1],day,h,[{name:exams[type][0],quantity:1,unitPrice:exams[type][1]}]);
    if (!receipt)return {ok:false,message:'Insufficient funds.'};
    const report={id:eventId,day,type,horseId:h.id,observed:[],possible:[],diagnoses:[],tests:[exams[type][0]],restrictions:[],followup:day+7,uncertainty:'An examination cannot guarantee future soundness or exclude every subtle condition.',receipt:receipt.number};
    for (const c of current(h)) {
      const d=definition(c),relevant=d.tests.includes(type)||(type==='followup'&&c.confirmed)||(type==='intake'&&d.tests.includes('general'));
      if(!relevant)continue;
      const imaging=['ultrasound','radiographs','gastroscopy'].includes(type),chance=imaging?.9:['general','intake'].includes(type)?d.visible?.9:.4:.75;
      const value=roll(h.healthSeed,`exam:${eventId}:${c.id}`);
      if(value<chance){c.known=true;c.confirmed=true;report.observed.push(...d.signs);report.diagnoses.push(d.name);if(!h.confirmedDiagnoses.some(r=>r.conditionId===c.id))h.confirmedDiagnoses.push({conditionId:c.id,name:d.name,day});}
      else if(value<Math.min(.98,chance+.15)){c.suspected=true;report.possible.push('A relevant concern remains uncertain; further targeted assessment may help.');h.suspectedDiagnoses.push({day,conditionId:c.id,text:'Further targeted assessment recommended.'});}
      if(type==='followup'&&c.confirmed&&c.recoveryProgress>=c.recoveryDays)finish(h,c,day);
      if(d.restriction&&c.confirmed&&!c.resolved)report.restrictions.push(d.restriction==='all'?'Rest and professional reassessment.':'Avoid demanding work; review a controlled return with the veterinarian.');
    }
    h.vetVisits.push(report);h.diagnosticTests.push({day,type,reportId:eventId});return {ok:true,report};
  }
  function plan(h, conditionId, day) {
    const c=current(h).find(c=>c.id===conditionId&&c.confirmed);if(!c)return {ok:false,message:'A confirmed relevant diagnosis is required.'};
    let p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');if(p)return {ok:true,plan:p};
    const d=definition(c);p={id:`plan:${c.id}`,conditionId:c.id,day,followup:day+Math.min(14,c.recoveryDays),status:'Active',restrictions:d.restriction,care:d.routine?'Routine care and monitoring':'Veterinary-directed care, monitoring and reassessment',supplies:d.category==='skin'?['Sterile Gauze','Saline Rinse']:[]};
    c.treatmentStarted=day;h.rehabilitationPlans.push(p);h.medicalRestrictions.push({conditionId:c.id,activity:d.restriction,from:day});
    if(d.medication)h.prescriptions.push({id:`rx:${c.id}`,horseId:h.id,conditionId:c.id,item:d.medication,quantity:1,dispensed:0,used:0,issued:day,expires:day+14,competitionHoldUntil:day+Math.max(7,c.recoveryDays),professionalOnly:/Penicillin|Ceftiofur|Flunixin|Dexamethasone/.test(d.medication)});
    return {ok:true,plan:p};
  }
  function purchase(state,h,item,quantity,day,eventId,rxId) {
    const store=state.careEconomy ||= {receipts:[],inventory:[],operations:{}};
    if(store.operations[`shop:${eventId}`])return {ok:true,receipt:store.operations[`shop:${eventId}`]};
    const product=supplies[item]||medicines[item];if(!product||!Number.isInteger(quantity)||quantity<1||quantity>100)return {ok:false,message:'Choose a valid item and quantity.'};
    const rx=h?.prescriptions.find(r=>r.id===rxId);
    if(product.kind==='medicine'&&(!rx||rx.horseId!==h.id||rx.item!==item||rx.expires<day||quantity>rx.quantity-rx.dispensed||!current(h).some(c=>c.id===rx.conditionId)))return {ok:false,message:'A valid matching prescription for this horse and quantity is required.'};
    const receipt=ledger(state,`shop:${eventId}`,product.price*quantity,day,h,[{name:item,quantity,unitPrice:product.price}],{prescription:rxId||null});if(!receipt)return {ok:false,message:'Insufficient funds.'};
    store.inventory.push({id:`stock:${receipt.number}`,item,kind:product.kind,quantity,horseId:product.kind==='medicine'?h.id:null,prescription:rxId||null});if(rx)rx.dispensed+=quantity;
    return {ok:true,receipt};
  }
  function administer(state,h,rxId,day,eventId) {
    const rx=h.prescriptions.find(r=>r.id===rxId),key=`administer:${eventId}`;
    const store=state.careEconomy ||= {receipts:[],inventory:[],operations:{}};if(store.operations[key])return {ok:true};
    const item=store.inventory.find(i=>i.prescription===rxId&&i.horseId===h.id&&i.quantity>0);
    const c=current(h).find(c=>c.id===rx?.conditionId);
    if(!rx||!c||!item||rx.expires<day||rx.used>=rx.quantity)return {ok:false,message:'A current condition, valid prescription and dispensed package are required.'};
    // Packages represent a professional-authorized game course, never a dose.
    item.quantity--;rx.used++;c.medicationSupport=true;store.operations[key]=true;
    h.medicalTimeline.push({day,kind:'Medication course recorded',conditionId:c.id,item:rx.item,professional:rx.professionalOnly});return {ok:true};
  }
  function finish(h,c,day) {
    const d=definition(c);if(c.resolved)return;
    if(d.chronic){c.stage='Chronic / Recurrent';return;}
    const residualChance=c.diagnosis==='tendon'?({minor:.15,moderate:.35,major:.6}[c.severity]??d.residual):c.diagnosis==='suspensory'?({minor:.2,moderate:.35,major:.55}[c.severity]??d.residual):d.residual;c.resolved=true;c.residual=roll(h.healthSeed,`outcome:${c.id}`)<residualChance;c.stage=c.residual?'Resolved with Residual Effects':'Resolved';c.resolvedDay=day;
    h.previousConditions.push(copy(c));h.medicalRestrictions=h.medicalRestrictions.filter(r=>r.conditionId!==c.id);h.rehabilitationPlans.filter(p=>p.conditionId===c.id).forEach(p=>p.status='Completed');
  }
  function injuryOutcome(seed,key){const value=roll(seed,key)*114;return value<80?'none':value<94?'minor':value<107?'moderate':'major';}
  function incident(h,day,context={}) {
    if(h.deceased||current(h).length)return;
    const chance=1-Math.pow(.96,1/30),r=roll(h.healthSeed,`incident:${day}`);if(r>=chance)return;
    const severity=injuryOutcome(h.healthSeed,`severity:${day}`);(h.healthOpportunities ||= []).push({day,outcome:severity});if(severity==='none')return;
    const eligible=Object.values(catalog).filter(d=>d.severity===severity&&(!d.minAge||h.age>=d.minAge)&&(!d.requires||context[d.requires]));
    const groups=[['skin',25],['hoof',20],['muscle',20],['airway',10],['digestive',10],['mouth',7],['general',8]].map(([id,weight])=>({id,weight,definitions:eligible.filter(d=>d.category===id)})).filter(g=>g.definitions.length);
    if(!groups.length)return;const group=weighted(groups,roll(h.healthSeed,`category:${day}`));
    const defs=group.definitions.map(d=>({...d,weight:d.weight*(d.vaccine&&h.vaccinations.some(v=>v.vaccine===d.vaccine&&v.nextDue>=day&&v.courseStatus==='Complete')?({influenza:.4,ehv:.65,strangles:.7}[d.id]??.75):1)}));
    const d=weighted(defs,roll(h.healthSeed,`diagnosis:${day}`));add(h,d.id,day,{cause:d.requires||'ordinary environmental exposure'});
  }
  function advance(h,targetDay,context={}) {
    ensure(h,targetDay);
    for(let day=h.healthProcessedDay+1;day<=targetDay;day++){
      for(const c of current(h)){
        const d=definition(c),p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');
        if((d.routine||p)&&(!d.correction||context[d.correction])&&(!d.farrier||c.farrierCare)&&(!d.medication||c.medicationSupport)){
          c.recoveryProgress++;if(c.recoveryProgress>0)c.stage='Improving';
          if(c.recoveryProgress>=c.recoveryDays){if(d.routine)finish(h,c,day);else c.stage=d.chronic?'Stable / Managed':'Awaiting Follow-Up';}
        }
      }
      h.hoofHealth.growth+=.15;
      if(day>h.hoofHealth.nextDue+14&&roll(h.healthSeed,`hoof:${day}`)<.02)h.hoofHealth.condition=bounded(h.hoofHealth.condition-1,0,100);
      incident(h,day,{...context,shod:h.hoofHealth.shoes!=='barefoot',overdueHooves:day>h.hoofHealth.nextDue+21});
      h.healthProcessedDay=day;
    }
  }
  function cooperation(h,farrier=false,tension=0) {
    const traits=h.training2?.traits||[],hoof=h.hoofHealth;let pp=farrier?85:80;
    const modifiers=farrier?{'Hoof-Handling Difficulties':-15,'Nervous with Farrier':-12,'Calm with Farrier':8,'Stands Quietly':6}:{'Stands Quietly':8,'Patient Worker':6,'Very People-Oriented':(h.bond||0)>=40?5:0,'Equipment Cautious':-7};
    for(const [trait,value] of Object.entries(modifiers))if(traits.includes(trait))pp+=value;
    return bounded(pp+(tension>=50?-10:0)+Math.min(10,(hoof.handling||0)*2),15,98)/100;
  }
  function farrier(state,h,service,day,eventId,handling='pause') {
    const visit=h.hoofHealth.history.find(v=>v.id===eventId);if(visit)return {ok:true,visit};
    const s=farrierServices[service];if(!s)return {ok:false,message:'Select a valid service.'};
    if(h.hoofHealth.history.some(v=>v.day===day&&v.service===service))return {ok:false,message:'This service is already recorded today.'};
    if(service==='lost'&&!h.hoofHealth.lostShoe)return {ok:false,message:'No missing shoe has been established.'};
    if(service==='reset'&&h.hoofHealth.shoes==='barefoot')return {ok:false,message:'There are no existing shoes to reset.'};
    if(service==='therapeutic'&&!h.confirmedDiagnoses.some(r=>definition(h.medicalConditions.find(c=>c.id===r.conditionId)).category==='hoof'))return {ok:false,message:'A coordinated assessment is required before a therapeutic plan.'};
    const calm=roll(h.healthSeed,`farrier:${day}:${service}`)<cooperation(h,true,h.training2?.tension||0);
    if(!calm&&handling!=='prepare')return {ok:false,unsafe:true,message:'The horse is too unsettled to continue safely. Pause, prepare calmly, or request professional assistance.'};
    if(!calm&&roll(h.healthSeed,`farrier:prepared:${day}:${service}`)>.65)return {ok:false,unsafe:true,message:'The task was stopped safely; professional assistance is recommended.'};
    const receipt=ledger(state,`farrier:${h.id}:${eventId}`,s[1],day,h,[{name:s[0],quantity:1,unitPrice:s[1]}]);if(!receipt)return {ok:false,message:'Insufficient funds.'};
    const hoof=h.hoofHealth,assessment=['balance','joint'].includes(service);
    const findings=[`Current hoof balance assessed at ${Math.round(hoof.balance)}/100.`,...(hoof.lostShoe?['A lost shoe was found.']:[])];
    if(current(h).some(c=>definition(c).category==='hoof'))findings.push('A hoof concern requires veterinary coordination; this is not an automatic diagnosis.');
    if(!assessment){hoof.growth=0;hoof.balance=Math.max(hoof.balance,80);hoof.condition=Math.max(hoof.condition,80);hoof.nextDue=day+42;hoof.handling++;
      if(service==='front')hoof.shoes='front';if(service==='full')hoof.shoes='full';if(['basic','routine'].includes(service))hoof.shoes='barefoot';if(['front','full','lost','reset'].includes(service))hoof.lostShoe=false;
      current(h).filter(c=>(['basic','routine','therapeutic'].includes(service)&&c.diagnosis==='imbalance')||(['front','full','lost','reset'].includes(service)&&c.diagnosis==='lost-shoe')||service==='therapeutic'&&definition(c).farrier).forEach(c=>{c.farrierCare=true;if(c.diagnosis==='lost-shoe')finish(h,c,day);});
    }
    const record={id:eventId,day,service,findings,nextDue:hoof.nextDue,receipt:receipt.number};hoof.history.push(record);hoof.findings.push(...findings.map(text=>({day,text})));return {ok:true,visit:record};
  }
  const vaccinePolicies = {
    'Local leisure': { vaccines:['Tetanus'], competition:[], interval:360 },
    'Competition': { vaccines:['Tetanus','Equine Influenza','EHV-1/EHV-4'], competition:['Equine Influenza'], interval:180 },
    'High exposure': {vaccines:['Tetanus','Equine Influenza','EHV-1/EHV-4','Strangles'],competition:['Equine Influenza'],interval:180},
    'Regional travel': { vaccines:['Tetanus','Equine Influenza','EHV-1/EHV-4','West Nile','Rabies','Encephalomyelitis'], competition:['Equine Influenza'], interval:180 }
  };
  function vaccinate(state,h,vaccine,policy,day,eventId) {
    const rules=vaccinePolicies[policy];if(!rules||!rules.vaccines.includes(vaccine))return {ok:false,message:'The chosen vaccine is not indicated by the configured game policy.'};
    if(current(h).length)return {ok:false,message:'Review current health with the veterinarian before this appointment.'};
    if(h.vaccinations.some(v=>v.vaccine===vaccine&&v.nextDue>day))return {ok:false,message:'This vaccination is not due.'};
    const receipt=ledger(state,`vaccine:${eventId}`,60,day,h,[{name:`Veterinary vaccination: ${vaccine}`,quantity:1,unitPrice:60}]);if(!receipt)return {ok:false,message:'Insufficient funds.'};
    const previous=h.vaccinations.filter(v=>v.vaccine===vaccine),first=!previous.length,record={horseId:h.id,vaccine,date:day,provider:'Stable Veterinarian',courseStatus:first?'Course in progress':'Complete',nextDue:day+(first?30:rules.interval),policy,historicalUncertainty:false,receipt:receipt.number};
    h.vaccinations.push(record);return {ok:true,record};
  }
  function documentation(h,policy,day) { const rules=vaccinePolicies[policy];return rules?rules.competition.filter(vaccine=>!h.vaccinations.some(v=>v.vaccine===vaccine&&v.courseStatus==='Complete'&&v.nextDue>=day)):[]; }
  function seedSaleHealth(h,day){
    ensure(h,day);if(h.preexistingHealthProcessed)return h.preSaleHealthProfile;
    h.preexistingHealthProcessed=true;
    const seed=hash(h.id+'|preexisting-health'),affected=roll(seed,'opportunity')<.40;
    const severityRoll=roll(seed,'severity'),severity=severityRoll<.30?'minor':severityRoll<.80?'moderate':'major';
    h.preSaleHealthProfile={version:2,affected,severity:affected?severity:null};
    if(!affected)return h.preSaleHealthProfile;
    const pools={minor:['scratch','rub','dental'],moderate:['strain','skin-infection','respiratory'],major:['tendon','laceration','cornea']};
    const choices=pools[severity],id=choices[Math.floor(roll(seed,'condition')*choices.length)];
    // Welfare-related rubs are physical history, not an automatic trauma/personality label.
    const c=add(h,id,day,{cause:id==='rub'?'Pre-sale tack discomfort':'Persistent pre-sale health history',severity});
    h.preSaleHealthProfile.conditionId=c.id;return h.preSaleHealthProfile;
  }
  root.HorseHealth={seedSaleHealth,injuryOutcome,catalog,exams,supplies,medicines,farrierServices,vaccinePolicies,hash,roll,copy,ensure,add,definition,current,allowed,observe,publicView,ledger,examine,plan,purchase,administer,advance,incident,cooperation,farrier,vaccinate,documentation};
  if(typeof module!=='undefined')module.exports=root.HorseHealth;
})(globalThis);
