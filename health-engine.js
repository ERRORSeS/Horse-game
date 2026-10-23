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
    catalog[id] = { id, name, category, weight, days, signs: signs.split('|'), tests: tests.split('|'), severity: 'minor', residual: 0, restriction: 'demanding', configuredResidual: Object.hasOwn(options,'residual'), ...options };
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
  const defaults = typeof module!=='undefined' ? require('./medical-catalog.js') : root.MedicalCatalogDefaults;
  const probabilityAudit=[];
  const aliases={abrasion:'rub','tendon-rupture':'tendon','stable-fracture':'orthopedic','unstable-fracture':'orthopedic',impaction:'colic','surgical-colic':'colic','critical-colic':'colic'};
  // New subtypes are never added as another independent incidence opportunity.
  for(const [id,base] of Object.entries(aliases)) if(!catalog[id]) catalog[id]={...copy(catalog[base]),id,name:defaults[id].name,weight:0,selectable:false,configuredResidual:false};
  const recurrenceDefaults={scratch:[.01,60],cut:[.02,60],abrasion:[.02,60,.15],rub:[.03,60,.25],dermatitis:[.05,90,.20],'skin-infection':[.08,90,.20],laceration:[.02,90],'tender-hoof':[.10,60],abscess:[.08,90],bruise:[.05,60],imbalance:[.05,90,.30],thrush:[.06,90,.25],soreness:[.15,30],strain:[.08,360],tendon:[.12,720],'tendon-rupture':[.35,720],suspensory:[.15,720],synovitis:[.12,360],back:[.06,360,.25],respiratory:[.05,60],strangles:[.05,90],'airway-irritation':[.03,60,.35],'digestive-upset':[.10,60],colic:[.08,360],impaction:[.18,360],'surgical-colic':[.15,720],'critical-colic':[.20,720],ulcers:[.25,360],parasites:[.03,360,.15],'digestive-illness':[.10,360],eye:[.08,90],cornea:[.05,90],ear:[.12,90],oral:[.05,360],heat:[.10,90],'stable-fracture':[.08,720]};
  for(const d of Object.values(catalog)){
    const e=defaults[d.id];
    d.legacyNames=[d.name];
    if(d.id==='skin-infection')d.name='Skin Infection';if(d.id==='tendon')d.name='Partial Tendon Injury';if(d.id==='rub')d.name='Tack Rub';
    d.conditionId=d.id;
    d.eligibleSeverityLevels=Object.keys(e?.severityWeights||{[d.severity]:100});
    d.severityWeights=e?.severityWeights||{[d.severity]:100};
    d.recoveryDurationBySeverity=e?.recoveryDurationBySeverity||{[d.severity]:d.days};
    d.causes=[e?.source.Cause||d.requires||'Recorded clinical history'];
    d.triggerConditions=d.requires?[d.requires]:[];
    d.contexts=[...new Set((d.contexts||['rest']).map(c=>c==='groom'?'stall':c))];
    if(d.visible&&!d.contexts.includes('stall'))d.contexts.push('stall');
    if(d.contexts.includes('rest'))d.contexts.push('stall','pasture');
    d.observationLocations=[...new Set(d.contexts)];d.observableSigns=d.signs;
    if(d.category==='hoof'&&!d.tests.includes('hoof'))d.tests.push('hoof');
    d.recommendedExaminations=d.tests;
    d.diagnosticRequirements=['tendon','suspensory','tendon-rupture'].includes(d.id)?['ultrasound']:['orthopedic','stable-fracture','unstable-fracture'].includes(d.id)?['radiographs']:d.id==='ulcers'?['gastroscopy']:[];
    d.validTreatments=[e?.source.Treatment||'Individual professional management and follow-up'];
    d.requiredSupplies=d.category==='skin'?['Saline Rinse','Sterile Gauze']:[];
    d.treatmentCost=d.requiredSupplies.length?21:0;
    const recurrence=recurrenceDefaults[d.id]||[0,0];
    d.recurrenceProbabilityBySeverity=d.id==='strain'?{minor:.08,moderate:.15}:d.id==='tendon'?{minor:.12,moderate:.25,major:.40}:d.id==='suspensory'?{minor:.15,moderate:.25,major:.40}:d.id==='synovitis'?{minor:.12,moderate:.25,major:.40}:d.id==='colic'?{minor:.08,moderate:.18}:{};
    d.recurrenceProbability=d.recurrence??recurrence[0];d.recurrenceHorizon=recurrence[1];d.recurrenceIfCausePersists=recurrence[2]??d.recurrenceProbability;
    d.requiresRecurrenceTrigger=['scratch','cut','tender-hoof','abscess','soreness','digestive-upset','eye','ear','heat'].includes(d.id);
    d.outcomesBySeverity={};
    for(const severity of d.eligibleSeverityLevels){
      const a=[...(e?.outcomes[severity]||[1-d.residual,d.residual,0,0])];while(a.length<4)a.push(0);
      // Surgical escalation is removed from the acute table and resolved through its own branch.
      if(d.id==='impaction') {const total=a.reduce((n,v)=>n+v,0);for(let i=0;i<4;i++)a[i]/=total;d.surgicalEscalationProbability=.05;}
      let residual=d.configuredResidual?d.residual:a[1];
      if(d.id==='tendon')residual={minor:.15,moderate:.35,major:.6}[severity];
      if(d.id==='suspensory')residual={minor:.2,moderate:.35,major:.55}[severity];
      if(residual!==a[1]) probabilityAudit.push({conditionId:d.id,severity,field:'residual',preserved:residual,suggested:a[1]});
      const remaining=1-residual,others=a[0]+a[2]+a[3];
      d.outcomesBySeverity[severity]={full:others?a[0]/others*remaining:0,residual,persistent:others?a[2]/others*remaining:remaining,death:others?a[3]/others*remaining:0};
    }
    d.fullRecoveryProbability=Object.fromEntries(Object.entries(d.outcomesBySeverity).map(([k,v])=>[k,v.full]));
    d.residualEffectProbability=Object.fromEntries(Object.entries(d.outcomesBySeverity).map(([k,v])=>[k,v.residual]));
    d.fatalityProbability=Object.fromEntries(Object.entries(d.outcomesBySeverity).map(([k,v])=>[k,v.death]));
    d.workRestrictions=d.restriction;d.progressionStages=['Active','Improving','Awaiting Follow-Up','Resolved','Resolved with Residual Effects','Chronic / Persistent','Deceased'];
    d.historicalRecord=['horseId','id','diagnosis','onset','resolvedDay','severity','outcome','treatmentStarted'];
    const quotes=e?.quotes||[d.signs[0],d.signs[1]||d.signs[0]+' remains noticeable.',e?.source.Treatment||'The observed concern remains under assessment.',d.id==='contusion'?'The bruised area is becoming less sensitive.':'The documented symptoms are more comfortable under the current plan.',d.id==='contusion'?'The bruising has resolved after appropriate rest.':'The clinical history remains available for continued management.'];
    d.narrativeTemplates=quotes.map((text,i)=>({text,phase:['first','active','ongoing','improving','resolved'][i]||'prognosis',requiresDiagnosis:i>=3||/veterinar|farrier|examin|infection|dermatitis|fracture|colic|tendon|strain|dental|condition has resolved/i.test(text)}));
    d.resolvedNarrativeTemplates=d.narrativeTemplates.filter(t=>t.phase==='resolved');
  }
  for(const id of ['tendon-rupture','unstable-fracture','surgical-colic','critical-colic']){
    const d=catalog[id];d.emergency=true;d.restriction=d.workRestrictions='all';d.routine=false;d.requires='majorTrauma';d.contexts=d.observationLocations=['rest','stall','pasture','walk','legs'];d.requiredSupplies=[];d.treatmentCost=id==='tendon-rupture'?4000:id==='unstable-fracture'?6000:id==='critical-colic'?7000:4000;
    d.narrativeTemplates.forEach((t,i)=>{t.phase=i===0?'first':i===1?'active':i===2?'ongoing':'prognosis';t.requiresDiagnosis=i>0;});
  }
  catalog['stable-fracture'].routine=false;catalog['stable-fracture'].restriction='all';catalog['stable-fracture'].requiredSupplies=[];
  catalog['stable-fracture'].narrativeTemplates[3].phase='treatment';catalog['stable-fracture'].narrativeTemplates[4].phase='improving';
  catalog['tendon-rupture'].narrativeTemplates[3].phase='diagnostic';
  catalog['surgical-colic'].narrativeTemplates[4].phase='postoperative';catalog['surgical-colic'].narrativeTemplates[5].phase='improving';catalog['surgical-colic'].narrativeTemplates[6].phase='worsening';catalog['surgical-colic'].narrativeTemplates[7].phase='terminal';
  catalog['critical-colic'].narrativeTemplates[4].phase='critical';catalog['critical-colic'].narrativeTemplates[5].phase='improving';catalog['critical-colic'].narrativeTemplates[6].phase='worsening';catalog['critical-colic'].narrativeTemplates[7].phase='death';
  for(const id of ['tendon-rupture','unstable-fracture'])catalog[id].narrativeTemplates.push({phase:'improving',requiresDiagnosis:true,text:id==='tendon-rupture'?'The repaired tendon is progressing through rehabilitation, with sporting function still uncertain.':'The stabilized fracture is progressing through healing under specialist supervision.'});
  for(const id of ['djd','asthma'])catalog[id].narrativeTemplates[4].phase='prognosis';
  catalog.djd.functionalOutcomes={stable:.65,restricted:.30,severe:.05};catalog.asthma.functionalOutcomes={stable:.60,restricted:.30,severe:.10};
  for(const id of ['fever','weight-loss'])catalog[id].investigation=true;
  const exams = {
    general: ['General Physical Exam',90], intake: ['Rescue Intake Exam',140], lameness: ['Lameness Evaluation',180], soundness: ['Detailed Soundness Exam',350], ultrasound: ['Ultrasound',180], radiographs: ['Radiographs',250], blood: ['Bloodwork',110], respiratory: ['Respiratory Assessment',135], dental: ['Dental Examination',120], gastroscopy: ['Gastroscopy',350], emergency: ['Emergency Consultation',300], followup: ['Follow-Up',65], eye: ['Eye Examination',90], ear: ['Ear Examination',90], parasite: ['Targeted Parasite Test',90], hoof: ['Hoof Assessment',35], joint: ['Farrier-Vet Joint Assessment',170]
  };
  const supplies = Object.fromEntries([['Sterile Gauze',12],['Non-Adherent Dressing',15],['Cohesive Bandage',10],['Cotton Padding',14],['Saline Rinse',9],['Digital Thermometer',20],['Disposable Gloves',8],['Clean Towels',7],['Hoof Pick',8],['Hoof Brush',9],['Routine Hoof Dressing',22],['Horse-Safe Shampoo',18],['Fly Mask',25],['Fly Sheet',70],['Cooling Wraps',45],['First-Aid Box',35],['Treatment Folder',12]].map(([name,price])=>[name,{name,price,kind:'supply'}]));
  const medicines = Object.fromEntries([['Phenylbutazone',45],['Flunixin',65],['Firocoxib',95],['Omeprazole',120],['Sucralfate',85],['Trimethoprim–Sulfadiazine',75],['Penicillin G veterinary package',110],['Ceftiofur',125],['Dexamethasone',50],['Ivermectin package',28],['Moxidectin',38],['Praziquantel',35],['Electrolytes',25],['Antiseptic',22]].map(([name,price])=>[name,{name,price,kind:'medicine'}]));
  for(const [name,price] of [['Thermometer',20],['Cotton Padding Roll',14],['Oral Electrolyte Product',25],['Non-Sterile Examination Gloves',6],['Veterinary Antiseptic Product',22],['Equine Digital Thermometer Case',6],['Bandage Storage Set',18],['Fly Repellent (Equine)',20],['Soft Hoof-Care Cloth',7]])supplies[name] ||= {name,price,kind:'supply'};
  medicines['Prescription Eye Medication Package']={name:'Prescription Eye Medication Package',price:70,kind:'medicine'};
  catalog.cornea.medication='Prescription Eye Medication Package';
  const services={hospital:['Hospital Admission',400],hospitalDay:['Hospital Daily Care',150],specialist:['Specialist Consultation',600],fluids:['Hospital Fluid Therapy Service',180],colic:['Emergency Colic Treatment Service',350],wound:['Routine Wound Treatment Service',80],dental:['Dental Treatment Package',100],tendon:['Tendon Surgery Package',4000],fracture:['Fracture Surgery Package',6000],surgery:['Surgical Colic Package',4000],critical:['Critical Colic Surgery Package',7000]};
  const farrierServices = { basic:['Basic Trim',45], routine:['Full Routine Trim',65], front:['Front Shoes',95], full:['Full Set',160], reset:['Reset',115], lost:['Lost Shoe Replacement',55], balance:['Hoof Balance Assessment',35], joint:['Farrier-Vet Joint Assessment',170], therapeutic:['Therapeutic Plan',240] };
  const arrays = ['medicalConditions','observableSigns','playerObservations','suspectedDiagnoses','confirmedDiagnoses','previousConditions','prescriptions','vaccinations','vetVisits','diagnosticTests','medicalRestrictions','rehabilitationPlans','conditionRiskFactors','medicalTimeline'];
  function ensure(h, day) {
    if (h.medicalVersion === 1) {
      arrays.forEach(key=>{if(!Array.isArray(h[key]))h[key]=[];});
      if(h.medicalExpansionVersion!==2){
        for(const c of h.medicalConditions){
          c.careLog ||= [];
          const rx=h.prescriptions.find(rx=>rx.conditionId===c.id&&rx.used>0);
          if(c.medicationSupport&&rx&&!c.medicationCourse)c.medicationCourse={rxId:rx.id,remainingDays:Math.max(0,c.recoveryDays-c.recoveryProgress),started:rx.issued};
        }
        h.medicalExpansionVersion=2;
      }
      // Earlier service controls allowed an impossible 'surgery unavailable' decision after a paid operation.
      for(const c of h.medicalConditions.filter(c=>c.specialistCare&&c.criticalDecision==='unavailable')){
        if(c.outcome==='death'&&!c.criticalEvaluated&&h.deathRecord?.conditionId===c.id){
          (h.correctedMedicalRecords ||= []).push({reason:'Invalid unavailable-surgery branch after completed operation',record:copy(h.deathRecord)});
          h.deceased=false;delete h.deathDay;delete h.deathRecord;delete c.outcome;delete c.resolvedDay;c.resolved=false;c.stage='Post-operative Monitoring';
          h.previousConditions=h.previousConditions.filter(r=>!(r.id===c.id&&r.outcome==='death'));
          h.rehabilitationPlans.filter(p=>p.conditionId===c.id).forEach(p=>{p.status='Active';p.scheduled=true;});
        }
        delete c.criticalDecision;delete c.decisionDay;
        h.medicalTimeline.push({day,conditionId:c.id,kind:'Invalid treatment branch corrected',text:'Completed surgery retains post-operative care; the unavailable-surgery branch does not apply.'});
      }
      for(const c of h.medicalConditions.filter(c=>!c.resolved&&c.confirmed&&c.services?.length&&!h.rehabilitationPlans.some(p=>p.conditionId===c.id&&p.status==='Active')))if(!c.outcome)plan(h,c.id,day);
      for(const c of h.medicalConditions)if(c.hospitalized||c.hospitalEpisode)hospitalRecord(h,c,day);
      return h;
    }
    arrays.forEach(key => { if (!Array.isArray(h[key])) h[key] = []; });
    h.medicalVersion = 1; h.medicalExpansionVersion=2; h.healthSeed = hash(h.id + '|medical'); h.healthProcessedDay = day;
    h.hoofHealth = h.hoofHealth || { condition: h.hoofCare ?? 65, balance: 70, growth: 0, shoes: 'barefoot', lostShoe: false, nextDue: day + 42, observations: [], findings: [], history: [], handling: 0 };
    // Legacy records remain byte-for-byte accessible; migration never manufactures disease.
    h.legacyMedicalRecords = copy(h.illnesses || []);
    for (const [i, old] of (h.illnesses || []).entries()) {
      const def = Object.values(catalog).find(d => [d.name,...(d.legacyNames||[])].some(name=>name.toLowerCase() === String(old.name).toLowerCase()));
      const c = add(h, def?.id || 'legacy', day, { id: `${h.id}:legacy:${i}`, legacyName: old.name, known: !old.hidden, severity: old.severity === 'Easy' ? 'minor' : 'moderate', recoveryDays: Math.max(1, (old.remaining || 1) * 30), resolved: old.active === false, legacy: copy(old) });
      if (c.resolved) { c.stage = 'Resolved'; h.previousConditions.push(copy(c)); }
    }
    for (const [i, old] of (h.hiddenIllnesses || []).entries()) add(h, 'legacy', day, { id: `${h.id}:hidden:${i}`, legacyName: old.name, legacy: copy(old) });
    for(const c of h.medicalConditions)if(c.hospitalized||c.hospitalEpisode)hospitalRecord(h,c,day);
    return h;
  }
  function definition(c) { return catalog[c.diagnosis] || { ...catalog.strain, name: c.legacyName || 'Legacy Medical Record', tests:['general','soundness'], residual:0 }; }
  function add(h, diagnosis, day, extra = {}) {
    const def = catalog[diagnosis] || { ...catalog.strain, id:'legacy' };
    if (extra.id && h.medicalConditions.some(c=>c.id===extra.id)) return h.medicalConditions.find(c=>c.id===extra.id);
    const id = extra.id || `${h.id}:condition:${day}:${h.medicalConditions.length}`;
    const severity=def.eligibleSeverityLevels.includes(extra.severity)?extra.severity:weighted(Object.entries(def.severityWeights).map(([id,weight])=>({id,weight})),roll(h.healthSeed,`${id}:clinical-severity`)).id;
    const duration=def.recoveryDurationBySeverity[severity]||def.days;
    const c = { id, horseId:h.id, diagnosis, category:def.category, region:def.category === 'hoof' ? 'hoof' : def.category === 'muscle' ? 'limb / back' : def.category, onset:day, cause:extra.cause || 'existing physiological condition', severity, stage:'Active', symptoms:[...def.signs], known:false, suspected:false, confirmed:false, resolved:false, residual:false, recoveryDays:duration[0]+Math.floor(roll(h.healthSeed,id)* (duration[1]-duration[0]+1)), recoveryProgress:0, ...extra };
    c.severity=def.eligibleSeverityLevels.includes(c.severity)?c.severity:severity;
    c.careLog ||= [];
    if(def.emergency)c.emergencyStatus='Attention Required';
    h.medicalConditions.push(c);if(diagnosis==='lost-shoe'&&!c.resolved)h.hoofHealth.lostShoe=true;
    if (c.known) { c.confirmed=true; h.confirmedDiagnoses.push({conditionId:id,name:definition(c).name,day,legacy:true}); }
    h.medicalTimeline.push({day,kind:c.known?'Legacy Medical Record':'internal',conditionId:id});
    return c;
  }
  function current(h) { return h.medicalConditions.filter(c=>!c.resolved); }
  function allowed(h, activity, intensity=1) {
    ensure(h);
    if(h.deceased)return 'This horse is deceased; its history is preserved.';
    return '';
  }
  function workloadAdvice(h,activity,intensity=1) {
    ensure(h);
    return current(h).map(c=>{
      const d=definition(c),load=Math.max(0,Number(intensity)||0);
      let level=0;
      if(load>0){
        if(activity==='handling')level=d.emergency?3:['muscle','hoof'].includes(d.category)?1:0;
        else if(d.category==='skin')level=d.correction&&activity==='ridden'?2:d.id==='scratch'?0:load>=3?1:0;
        else if(d.restriction==='all')level=3;
        else if(['muscle','hoof'].includes(d.category))level=activity==='jump'?3:activity==='lunge'?2:load>=2?2:1;
        else level=load>=3?3:load>=2?2:0;
      }
      if((c.stage==='Awaiting Follow-Up'||c.rehabStage>=3)&&!d.emergency)level=Math.max(0,level-1);
      const status=['Recommended','Acceptable with Caution','Not Recommended','Strongly Advised Against'][level];
      return {conditionId:c.id,level,status,reason:c.confirmed?`${d.name}: ${d.validTreatments.join(' ')}`:'Recent observations raise a possible health concern.'};
    });
  }
  function workExposure(h,activity,intensity,day,eventId) {
    ensure(h);if(h.deceased)return {ok:false,blocked:true};
    const affected=[],events=[];
    for(const advice of workloadAdvice(h,activity,intensity)){
      const c=current(h).find(c=>c.id===advice.conditionId);
      c.workEvents ||= [];if(c.workEvents.includes(eventId))continue;c.workEvents.push(eventId);
      c.workloadHistory ||= [];c.workloadHistory.push({day,eventId,activity,intensity,status:advice.status});
      if(!advice.level)continue;
      const recent=c.workloadHistory.filter(r=>r.day>=day-7&&r.status!=='Recommended').length;
      const base=[0,.02,.08,.20][advice.level];
      const risk=Math.min([0,.03,.12,.30][advice.level],base*(c.severity==='major'?1.3:c.severity==='moderate'?1.1:1)*(1+Math.min(5,recent-1)*.08));
      if(roll(h.healthSeed,`work:${c.id}:${eventId}`)>=risk)continue;
      const outcome=roll(h.healthSeed,`work-outcome:${c.id}:${eventId}`),delay=outcome<(advice.level<3?.65:.40)?0:outcome<.90?1+Math.floor(roll(h.healthSeed,`delay:${eventId}`)*3):4+Math.floor(roll(h.healthSeed,`delay:${eventId}`)*11);
      c.discomfort=(c.discomfort||0)+1;
      const severePathway={'unstable-fracture':'Fracture instability','tendon-rupture':'Loss of tendon support','critical-colic':'Critical abdominal deterioration','surgical-colic':'Post-operative abdominal complication',heat:'Exertional heat deterioration'}[c.diagnosis];
      if(severePathway&&advice.level===3&&intensity>=3&&outcome>=.70){
        c.complications ||= [];c.complications.push({day,eventId,kind:severePathway,requiresEmergencyAssessment:true});
        c.emergencyStatus='Urgent Reassessment Required';c.recoveryProgress=Math.max(0,c.recoveryProgress-7);
        events.push(c.confirmed?`${definition(c).name}: ${severePathway}. Urgent veterinary reassessment is required.`:'The horse shows serious deterioration. Urgent veterinary assessment is required.');
        // Terminal outcomes remain owned by the existing diagnosis-specific emergency engine.
      }

      if(outcome>=.90&&advice.level>=2){
        const d=definition(c),next={minor:'moderate',moderate:'major'}[c.severity];
        if(next&&d.eligibleSeverityLevels.includes(next)){c.severity=next;c.reinjuries ||= [];c.reinjuries.push({day,eventId,activity});c.recoveryDays=Math.max(c.recoveryDays,(d.recoveryDurationBySeverity[next]||d.days)[0]);}
        if(outcome>=.95&&['tendon','suspensory','tendon-rupture','stable-fracture','unstable-fracture'].includes(d.id)){c.complications ||= [];c.complications.push({day,eventId,kind:'Reinjury requires veterinary reassessment'});if((c.reinjuries?.length||0)>=3)c.residual=true;}
      }
      if(delay){const p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');if(p){p.forecastHistory ||= [];p.forecastHistory.push({day,previous:p.estimatedRecovery,reason:'Workload setback'});p.estimatedRecovery=(p.estimatedRecovery||[c.recoveryDays,c.recoveryDays]).map(n=>n+delay);}c.recoveryDays+=delay;c.setbacks ||= [];c.setbacks.push({day,eventId,delay});c.stage='Active';}
      const activePlan=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');if(activePlan){activePlan.adviceHistory ||= [];activePlan.adviceHistory.push({day,eventId,activity,previous:advice.status,current:workloadAdvice(h,activity,intensity).find(a=>a.conditionId===c.id)?.status,reason:'Actual workload response'});}
      const text=delay?'The recovery estimate has been extended after the recent setback.':`${h.name} appears more uncomfortable following the demanding exercise.`;
      affected.push(c.id);events.push(text);h.medicalTimeline.push({day,kind:'Medical workload response',conditionId:c.id,eventId,text,delay});
    }
    return {ok:true,affected,events};
  }
  function narrative(h,c,phase){
    const d=definition(c),templates=d.narrativeTemplates||[];
    if(phase==='improving'&&['surgical-colic','critical-colic'].includes(c.diagnosis)&&!c.criticalSurvived)return c.symptoms[0]+' remains under intensive monitoring.';
    let t=templates.find(t=>t.phase===phase&&(!t.requiresDiagnosis||c.confirmed));
    // Diagnosis-sensitive scripted lines are never substituted into unconfirmed observations.
    const text=t?.text||(phase==='improving'?c.symptoms[0]+' is less noticeable.':phase==='resolved'?c.residual?'The documented episode has ended with residual limitations.':'The documented episode has resolved.':c.symptoms[0]);
    return text.replaceAll('[HORSE]',h.name||'The horse').replaceAll('[BODY REGION]',c.region||'affected area').replaceAll('[LIMB]',c.limb||'affected limb');
  }
  function recordObservation(h,c,context,day,phase){
    c.observedPhases ||= [];
    if(c.observedPhases.includes(phase))return null;
    c.observedPhases.push(phase);
    const record={day,context,text:'Important Observation: '+narrative(h,c,phase),conditionId:c.id,phase,strength:definition(c).emergency?'Emergency Veterinary Attention Required':'Important Observation'};
    h.observableSigns.push(record);h.playerObservations.push(record);return record;
  }
  function observe(h, context, day, eventId, options={}) {
    // Accept the historical context as a save/API alias, never as a required UI action.
    if(context==='groom')context='stall';
    const key=`observe:${eventId}:${context}`;
    if ((h.healthEvents ||= {})[key]) return [];
    h.healthEvents[key]=true;
    const found=[];
    for(const c of current(h)){
        hospitalRecord(h,c,day);
      const d=definition(c);if(!d.contexts.includes(context))continue;
      if(context==='pasture'&&options.close!==true&&!d.emergency)continue;
      const phase=c.recoveryProgress>0?'improving':'first';
      const chance=d.emergency?1:Math.min(.95,(d.visible?.9:['circle','jump'].includes(context)?.65:.35));
      if(roll(h.healthSeed,`${key}:${c.id}`)>=chance)continue;
      const r=recordObservation(h,c,context,day,phase);if(r)found.push(r);
      if(r&&c.diagnosis==='scratch'&&!c.confirmed){c.known=c.confirmed=true;h.confirmedDiagnoses.push({conditionId:c.id,name:d.name,day,visual:true});}
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
    const clinicalSignature=JSON.stringify(h.medicalConditions.map(c=>[c.id,c.resolved,c.residual,c.severity,c.recoveryProgress]));
    const sameDay=h.vetVisits.find(v=>v.day===day&&v.type===type&&v.clinicalSignature===clinicalSignature);if(sameDay)return {ok:true,report:sameDay,reused:true};
    const receipt=ledger(state,`exam:${h.id}:${eventId}`,exams[type][1],day,h,[{name:exams[type][0],quantity:1,unitPrice:exams[type][1]}]);
    if (!receipt)return {ok:false,message:'Insufficient funds.'};
    const report={id:eventId,day,type,clinicalSignature,horseId:h.id,observed:[],possible:[],diagnoses:[],recommendedTests:[],historyFindings:[],messages:[],tests:[exams[type][0]],restrictions:[],followup:day+7,uncertainty:'An examination cannot guarantee future soundness or exclude every subtle condition.',receipt:receipt.number};
    for (const c of h.medicalConditions.filter(c=>!c.resolved||c.residual)) {
      const d=definition(c),movement=['muscle','hoof'].includes(d.category),relevant=(movement&&['soundness','lameness','joint'].includes(type))||d.tests.includes(type)||(type==='followup'&&c.confirmed)||(type==='intake'&&d.tests.includes('general'));
      if(!relevant)continue;
      const imaging=['ultrasound','radiographs','gastroscopy'].includes(type),chance=imaging?.9:['general','intake'].includes(type)?d.visible?.9:.4:.75;
      const value=type==='followup'&&c.confirmed?0:roll(h.healthSeed,`exam:${eventId}:${c.id}`);
      if(type==='followup'&&c.confirmed){const previous=c.lastFollowupProgress??0;if((c.setbacks?.length||0)<=(c.lastFollowupSetbacks||0))report.messages.push(c.recoveryProgress>previous?'The follow-up examination shows improvement since the previous visit.':'The condition remains stable, and the existing plan will continue.');const worse=(c.setbacks?.length||0)>(c.lastFollowupSetbacks||0);if(worse)report.messages.push('The condition has worsened since the previous assessment.');if(!worse&&c.recoveryProgress>previous){c.rehabStage=Math.max(1,Math.min(4,Math.floor(c.recoveryProgress/Math.max(1,c.recoveryDays)*5)));c.stage=['Acute','Early Recovery','Controlled Rehabilitation','Progressive Work','Return to Training'][c.rehabStage];}c.lastFollowupSetbacks=c.setbacks?.length||0;c.followupResults ||= [];c.followupResults.push({day,previousProgress:previous,progress:c.recoveryProgress,stage:c.stage,severity:c.severity,workloadCount:c.workloadHistory?.length||0,careDays:c.careLog?.filter(r=>r.ok).length||0,outcome:worse?'Worse':c.recoveryProgress>previous?'Improving':'Stable'});c.lastFollowupProgress=c.recoveryProgress;c.lastFollowupDay=day;const plan=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');if(plan){plan.followup=day+7;delete plan.followupNotified;}}
      const diagnosticsReady=!d.diagnosticRequirements.length||d.diagnosticRequirements.includes(type)||d.diagnosticRequirements.every(test=>h.diagnosticTests.some(r=>r.type===test));
      // A relevant exam records present signs even when a definitive diagnosis needs targeted testing.
      if(!c.resolved||value<chance){
        report.observed.push(...d.signs);
        if(!diagnosticsReady){report.possible.push('The findings do not currently support a definitive diagnosis.');report.recommendedTests.push(...d.diagnosticRequirements.filter(test=>!h.diagnosticTests.some(r=>r.type===test)));}
        if(!diagnosticsReady&&['muscle','hoof'].includes(d.category))report.messages.push('A movement irregularity was observed, but the cause remains uncertain.');
      }
      if(value<chance&&diagnosticsReady){c.known=true;c.confirmed=true;if(c.resolved){report.historyFindings.push(d.name);const old=h.previousConditions.find(r=>r.id===c.id);if(old){old.known=true;old.confirmed=true;}}else report.diagnoses.push(d.name);if(!h.confirmedDiagnoses.some(r=>r.conditionId===c.id))h.confirmedDiagnoses.push({conditionId:c.id,name:d.name,day});}
      else if(value<Math.min(.98,chance+.15)){c.suspected=true;report.possible.push('A relevant concern remains uncertain; further targeted assessment may help.');h.suspectedDiagnoses.push({day,conditionId:c.id,text:'Further targeted assessment recommended.'});}
      if(type==='followup'&&c.confirmed&&c.recoveryProgress<c.recoveryDays){const p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');if(p){p.followup=day+Math.min(14,c.recoveryDays-c.recoveryProgress);delete p.followupNotified;}}
      if(type==='followup'&&c.confirmed&&c.recoveryProgress>=c.recoveryDays&&!d.investigation){c.medicalClearance=day;finish(h,c,day);const finding=c.followupResults?.at(-1);if(finding){finding.stage=c.stage;finding.outcome=c.outcome||finding.outcome;}if(c.outcome==='full')report.messages.push('The condition has resolved without meaningful remaining effects.');else if(c.residual)report.messages.push('Recovery is incomplete, and some residual limitations remain.');else if(c.outcome==='persistent')report.messages.push('The horse requires a revised long-term management plan.');}
      if(type==='emergency'&&d.emergency){c.emergencyAssessed=day;c.emergencyStatus='Assessed — Treatment Required';}
      if(['lameness','soundness','joint'].includes(type))report.lamenessGrade=Math.max(report.lamenessGrade||0,lamenessGrade(h));
      if(d.restriction&&!c.resolved)report.restrictions.push(d.restriction==='all'?'Rest and professional reassessment.':'Avoid demanding work; review a controlled return with the veterinarian.');
    }
    if(['general','intake','soundness','followup'].includes(type))report.historyFindings.push(...h.previousConditions.filter(c=>c.known||c.confirmed).map(c=>definition(c).name));
    report.observed=[...new Set(report.observed)];report.recommendedTests=[...new Set(report.recommendedTests)];report.historyFindings=[...new Set(report.historyFindings)];
    report.messages.push(...report.diagnoses.map(name=>'The examination identified findings consistent with '+name+'.'),...report.historyFindings.map(name=>'The horse has a documented history of '+name+'.'));
    if(report.recommendedTests.length)report.messages.push('Additional diagnostic imaging is recommended.');
    if(!report.diagnoses.length&&report.possible.length&&!report.messages.includes('The findings do not currently support a definitive diagnosis.'))report.messages.push('The findings do not currently support a definitive diagnosis.');
    if(!report.observed.length&&!report.diagnoses.length&&!report.possible.length)report.messages.push('No significant abnormality was identified during the examinations performed.');
    if(report.restrictions.length)report.messages.push("The horse's current condition is not suitable for the proposed workload.");
    h.vetVisits.push(report);h.diagnosticTests.push({day,type,reportId:eventId});return {ok:true,report};
  }
  function plan(h, conditionId, day) {
    const c=current(h).find(c=>c.id===conditionId&&c.confirmed);if(!c)return {ok:false,message:'A confirmed relevant diagnosis is required.'};
    let p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');if(p){issuePrescription(h,c,day);return {ok:true,plan:p};}
    const d=definition(c);p={horseId:h.id,severity:c.severity,assignedVeterinarian:'Stable veterinarian',estimatedRecovery:[Math.max(1,Math.floor(c.recoveryDays*.8)),Math.ceil(c.recoveryDays*1.3)],adviceHistory:[],forecastHistory:[],id:`plan:${c.id}`,conditionId:c.id,day,followup:day+Math.min(14,c.recoveryDays),status:'Active',restrictions:d.restriction,care:d.routine?'Routine care and monitoring':'Veterinary-directed care, monitoring and reassessment',supplies:[...d.requiredSupplies],scheduled:true};
    c.treatmentStarted=day;c.courseDaysRemaining=c.recoveryDays-c.recoveryProgress;h.rehabilitationPlans.push(p);h.medicalRestrictions.push({conditionId:c.id,activity:d.restriction,from:day});
    issuePrescription(h,c,day);
    return {ok:true,plan:p};
  }
  function issuePrescription(h,c,day){
    const d=definition(c);if(!d.medication||c.resolved||c.recoveryProgress>=c.recoveryDays||c.medicationCourse?.remainingDays>0)return;
    if(h.prescriptions.some(rx=>rx.conditionId===c.id&&rx.item===d.medication&&rx.expires>=day&&rx.used<rx.quantity))return;
    const prior=h.prescriptions.filter(rx=>rx.conditionId===c.id).length;
    h.prescriptions.push({id:`rx:${c.id}${prior?':'+prior:''}`,horseId:h.id,conditionId:c.id,medicationId:d.medication,indication:d.name,courseState:'Issued',nextReview:day+7,authorizedTreatmentUnits:Math.max(1,c.recoveryDays-c.recoveryProgress),item:d.medication,quantity:1,dispensed:0,used:0,issued:day,expires:day+14,competitionHoldUntil:day+Math.max(7,c.recoveryDays-c.recoveryProgress),professionalOnly:/Penicillin|Ceftiofur|Flunixin|Dexamethasone/.test(d.medication)});
  }
  function purchase(state,h,item,quantity,day,eventId,rxId) {
    const store=state.careEconomy ||= {receipts:[],inventory:[],operations:{}};
    if(store.operations[`shop:${eventId}`])return {ok:true,receipt:store.operations[`shop:${eventId}`]};
    const product=supplies[item]||medicines[item];if(!product||!Number.isInteger(quantity)||quantity<1||quantity>100)return {ok:false,message:'Choose a valid item and quantity.'};
    const rx=h?.prescriptions.find(r=>r.id===rxId);
    if(product.kind==='medicine'&&(!rx||rx.horseId!==h.id||rx.item!==item||rx.expires<day||quantity>rx.quantity-rx.dispensed||!current(h).some(c=>c.id===rx.conditionId)))return {ok:false,message:'A valid matching prescription for this horse and quantity is required.'};
    const receipt=ledger(state,`shop:${eventId}`,product.price*quantity,day,h,[{name:item,quantity,unitPrice:product.price}],{prescription:rxId||null});if(!receipt)return {ok:false,message:'Insufficient funds.'};
    store.inventory.push({id:`stock:${receipt.number}`,item,kind:product.kind,quantity,horseId:product.kind==='medicine'?h.id:null,prescription:rxId||null});if(rx){rx.dispensed+=quantity;rx.courseState='Dispensed';}
    return {ok:true,receipt};
  }
  function administer(state,h,rxId,day,eventId) {
    const rx=h.prescriptions.find(r=>r.id===rxId),key=`administer:${eventId}`;
    const store=state.careEconomy ||= {receipts:[],inventory:[],operations:{}};if(store.operations[key])return {ok:true};
    const item=store.inventory.find(i=>i.prescription===rxId&&i.horseId===h.id&&i.quantity>0);
    const c=current(h).find(c=>c.id===rx?.conditionId);
    if(rx&&rx.horseId!==h.id)return {ok:false,message:'This prescription was issued for a different horse.'};
    if(!rx)return {ok:false,message:'This medication requires an active veterinary prescription.'};
    if(!rx||!c||!item||rx.expires<day||rx.used>=rx.quantity)return {ok:false,message:'A current condition, valid prescription and dispensed package are required.'};
    const nsaids=['Phenylbutazone','Flunixin Meglumine','Firocoxib'];if(nsaids.includes(rx.item)&&current(h).some(other=>other.id!==c.id&&other.medicationCourse?.remainingDays>0&&h.prescriptions.some(r=>r.id===other.medicationCourse.rxId&&nsaids.includes(r.item))))return {ok:false,message:'An active NSAID course requires veterinary review before another NSAID can be prepared.'};
    // Packages represent a professional-authorized game course, never a dose.
    item.quantity--;rx.used++;rx.courseState='Prepared';c.medicationSupport=true;c.medicationCourse={rxId,remainingDays:Math.max(1,c.recoveryDays-c.recoveryProgress),started:day};store.operations[key]=true;
    h.medicalTimeline.push({day,kind:'Medication course recorded',conditionId:c.id,item:rx.item,professional:rx.professionalOnly});return {ok:true};
  }
  function finish(h,c,day) {
    const d=definition(c);if(c.resolved||c.outcome)return;
    if(d.investigation)return;
    if(d.chronic){
      const outcomes=d.functionalOutcomes||{stable:1};
      c.functionalOutcome=weighted(Object.entries(outcomes).map(([id,weight])=>({id,weight})),roll(h.healthSeed,`functional:${c.id}`)).id;
      c.stage=c.functionalOutcome==='stable'?'Stable / Managed':'Chronic / Persistent';c.outcome='persistent';c.sportRestriction=c.functionalOutcome==='stable'?'adjusted':'non-sport';h.previousConditions.push(copy(c));recordObservation(h,c,'health',day,'prognosis');h.rehabilitationPlans.filter(p=>p.conditionId===c.id).forEach(p=>p.status='Ongoing Management');return;
    }
    let table=d.outcomesBySeverity[c.severity]||Object.values(d.outcomesBySeverity)[0];
    if(d.emergency&&table.death>0&&!c.emergencyAssessed)return;
    if(['surgical-colic','critical-colic','tendon-rupture','unstable-fracture'].includes(c.diagnosis)&&!c.specialistCare&&c.criticalDecision!=='unavailable')return;
    if(c.criticalDecision==='unavailable')table={full:0,residual:.05,persistent:.05,death:.90};
    const result=weighted(Object.entries(table).map(([id,weight])=>({id,weight})),roll(h.healthSeed,`outcome:${c.id}`)).id;
    c.outcome=result;c.resolvedDay=day;c.residual=result==='residual';c.resolved=result!=='persistent';
    if(c.hospitalized){c.hospitalized=false;if(c.hospitalEpisode){c.hospitalEpisode.dischargeDay=day;c.hospitalEpisode.status=result==='death'?'Closed — Deceased':'Completed';}}
    c.stage=result==='death'?'Deceased':result==='persistent'?'Chronic / Persistent':c.residual?'Resolved with Residual Effects':'Resolved';
    if(result==='persistent'||['tendon-rupture','unstable-fracture'].includes(c.diagnosis)&&result==='residual')c.sportRestriction='non-sport';
    if(result==='death'){
      h.deceased=true;h.deathDay=day;
      h.deathRecord={horseId:h.id,name:h.registeredName||h.name,day,cause:c.confirmed?d.name:'Severe veterinary emergency',conditionId:c.id,outcome:'death',veterinaryRecord:copy(h.vetVisits),treatments:copy(h.rehabilitationPlans),ownershipHistory:copy(h.ownershipHistory||[]),competitionHistory:copy(h.showResults||[]),pedigree:copy(h.pedigree||{}),genetics:copy(h.genetics||{})};
      recordObservation(h,c,'health',day,'death');
      h.medicalTimeline.push({day,conditionId:c.id,kind:'Death',text:`${h.name} has died following a severe medical emergency. The medical record has been updated.`});
    }else{
      recordObservation(h,c,'health',day,result==='persistent'?'prognosis':'resolved');
      if(result!=='persistent'&&d.recurrenceHorizon){c.recurrenceDue=day+1+Math.floor(roll(h.healthSeed,`recurrence-date:${c.id}`)*d.recurrenceHorizon);c.recurrenceUntil=day+d.recurrenceHorizon;}
    }
    h.previousConditions.push(copy(c));h.medicalRestrictions=h.medicalRestrictions.filter(r=>r.conditionId!==c.id);
    h.rehabilitationPlans.filter(p=>p.conditionId===c.id).forEach(p=>p.status=result==='persistent'?'Ongoing Management':'Completed');
  }
  function lamenessGrade(h){return Math.max(0,...current(h).filter(c=>definition(c).category==='muscle'||definition(c).category==='hoof').map(c=>['tendon-rupture','unstable-fracture'].includes(c.diagnosis)?5:c.severity==='major'?4:c.severity==='moderate'?3:1));}
  function completeCare(state,h,conditionId,day,selected=[],context={}){
    ensure(h);const c=current(h).find(c=>c.id===conditionId&&c.confirmed),p=h.rehabilitationPlans.find(p=>p.conditionId===conditionId&&p.status==='Active');
    if(!c||!p)return {ok:false,message:'A confirmed relevant diagnosis and active treatment plan are required.'};
    if(c.hospitalized)return {ok:false,message:'Provided by Veterinary Hospital. Routine hospital care does not require player item selection.'};
    if(c.careLog?.some(r=>r.day===day&&r.ok&&r.careProvider!=='HOSPITAL'))return {ok:false,message:"Today's scheduled care has already been completed."};
    if(selected.some(item=>!p.supplies.includes(item)))return {ok:false,message:'This item is not appropriate for the current treatment plan.'};
    if(p.supplies.some(item=>!selected.includes(item)))return {ok:false,message:'Required supplies are missing. Purchase the prescribed items before completing this treatment.'};
    const result=careDay(state,h,c,day,{...context,playerCompleted:true});return {...result,message:result.ok?'Scheduled care completed.':result.reason.includes('supplies')?'Required supplies are missing. Purchase the prescribed items before completing this treatment.':result.reason};
  }
  function hospitalRecord(h,c,day){
    const p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');
    if(!c.hospitalEpisode&&c.hospitalized){const admitted=c.operationDay??c.services?.find(r=>r.service==='hospital')?.day??p?.day??day;c.hospitalEpisode={id:'hospital:'+c.id,horseId:h.id,conditionId:c.id,admittedDay:admitted,careProvider:'HOSPITAL'};}
    const e=c.hospitalEpisode;if(!e)return null;
    e.expectedDays ??= Math.max(1,Math.min(14,c.recoveryDays));e.coveredUntil ??= e.admittedDay+e.expectedDays;e.status ??= c.hospitalized?'Active':'Discharged';
    e.elapsedDays=Math.max(0,(e.dischargeDay??day)-e.admittedDay);
    if(c.hospitalized&&day>=e.coveredUntil&&e.status==='Active')e.status='Review Due';
    for(const r of c.careLog||[])if(r.ok&&!r.careProvider&&r.day>=e.admittedDay&&r.day<=(e.dischargeDay??e.coveredUntil)){r.careProvider='HOSPITAL';r.status='Completed by Hospital';r.treatmentEpisodeId=e.id;}
    e.completedDays=(c.careLog||[]).filter(r=>r.ok&&r.careProvider==='HOSPITAL').length;
    for(const r of c.careLog||[])if(r.ok&&r.recoveryAppliedDay==null&&(r.careProvider==='HOSPITAL'?r.day<=h.healthProcessedDay:r.day<h.healthProcessedDay))r.recoveryAppliedDay=r.day;
    for(const r of c.careLog||[])if(!r.ok&&r.reason==='Scheduled care was not completed by the player'&&r.day>=e.admittedDay&&r.day<(e.dischargeDay??e.coveredUntil)){
      r.previousStatus=copy(r);r.status='Superseded by Professional Care';r.careProvider='HOSPITAL';r.reason='Transferred to hospital responsibility';r.missedReason=null;
    }
    for(const r of h.medicalTimeline)if(r.conditionId===c.id&&r.kind==='Missed treatment task'&&r.reason==='Scheduled care was not completed by the player'&&r.day>=e.admittedDay&&r.day<(e.dischargeDay??e.coveredUntil)){r.previousKind=r.kind;r.kind='Home task superseded by professional care';}
    return e;
  }
  function hospitalDecision(h,conditionId,action,day){
    ensure(h,day);const c=current(h).find(c=>c.id===conditionId);if(!c)return {ok:false,message:'Select an active condition.'};const e=hospitalRecord(h,c,day);if(!e)return {ok:false,message:'No hospital episode is recorded.'};
    if(action==='discharge'){if(e.status==='Discharged')return {ok:true,message:'Discharge is already recorded.'};c.hospitalized=false;e.status='Discharged';e.dischargeDay=day;c.homeCareStartsDay=day;c.stage='Home Rehabilitation';h.medicalTimeline.push({day,conditionId:c.id,kind:'Hospital discharge',episodeId:e.id});return {ok:true,message:'Discharged to the existing home rehabilitation plan. Home tasks begin today.'};}
    if(action==='extend'&&c.hospitalized&&e.status==='Review Due'&&c.lastFollowupDay>=e.coveredUntil){e.extensions ||= [];e.extensions.push({authorizedDay:day,previousEnd:e.coveredUntil});e.coveredUntil=day+Math.max(1,Math.min(14,c.recoveryDays-c.recoveryProgress));e.expectedDays=e.coveredUntil-e.admittedDay;e.status='Active';return {ok:true,message:'Continued hospital care authorized. Daily fees apply only to provided care.'};}
    return {ok:false,message:'A follow-up examination is required before authorizing continued hospital care.'};
  }
  function careDay(state,h,c,day,context={}){
    const requested=!!context.playerCompleted,d=definition(c),p=h.rehabilitationPlans.find(p=>p.conditionId===c.id&&p.status==='Active');
    c.careLog ||= [];const old=c.careLog.find(r=>r.day===day&&r.ok&&(c.hospitalized?r.careProvider==='HOSPITAL':r.careProvider!=='HOSPITAL'));if(old)return old;
    if(context.playerCompleted)c.careLog=c.careLog.filter(r=>r.day!==day||r.careProvider==='HOSPITAL');
    if(!p)return {day,ok:false,reason:'No active authorized care plan'};
    const episode=hospitalRecord(h,c,day),outpatient=(c.services||[]).some(r=>r.day===day&&['wound','dental','fluids','colic'].includes(r.service)),professional=!!c.hospitalized||outpatient,provider=c.hospitalized?'HOSPITAL':'VETERINARIAN';
    if(c.hospitalized&&day>episode.coveredUntil){episode.status='Review Due';return {day,ok:false,reason:'Professional treatment interval complete. Request a follow-up and authorize continued care or discharge.',careProvider:'HOSPITAL',status:'Scheduled'};}
    if(!professional&&c.homeCareStartsDay!=null&&day<c.homeCareStartsDay)return {day,ok:false,reason:'Home care has not started.',status:'No Longer Required'};
    const passive=!professional&&!p.supplies.length&&!d.medication&&!d.farrier&&!d.correction&&!d.emergency;
    if(outpatient)context={...context,playerCompleted:true};
    if(passive)context={...context,playerCompleted:true};
    if(c.hospitalized){c.hospitalEpisode ||= {id:'hospital:'+c.id,horseId:h.id,conditionId:c.id,admittedDay:c.operationDay??c.services?.find(r=>r.service==='hospital')?.day??p.day,careProvider:'HOSPITAL'};context={...context,playerCompleted:true};}
    if(!context.playerCompleted){const existing=c.careLog.find(r=>r.day===day&&r.careProvider!=='HOSPITAL');if(existing){if(existing.status==='Scheduled'&&existing.careProvider==='PLAYER'){existing.status='Missed';existing.missedReason='Player task due window passed';h.medicalTimeline.push({day,conditionId:c.id,kind:'Missed treatment task',reason:existing.missedReason});}return existing;}const r={day,ok:false,reason:'Scheduled care was not completed by the player',taskId:p.id+':'+day,horseId:h.id,conditionId:c.id,treatmentEpisodeId:p.id,scheduledAt:day,careProvider:'PLAYER',taskType:'Scheduled care',requiredItems:p.supplies,status:'Missed',completedAt:null,missedReason:'Player task due window passed'};c.careLog.push(r);h.medicalTimeline.push({day,conditionId:c.id,planId:p.id,kind:'Missed treatment task',reason:r.reason});return r;}
    const missing=[];
    if(!professional&&d.correction&&!context[d.correction])missing.push('Contributing cause requires correction');
    if(d.farrier&&!c.farrierCare)missing.push('Farrier care is required');
    if(d.emergency&&!c.emergencyAssessed)missing.push('Emergency veterinary assessment is required');
    if(!professional&&d.medication&&!(c.medicationCourse?.remainingDays>0))missing.push('Authorized medication course is not prepared');
    if(['surgical-colic','critical-colic','tendon-rupture','unstable-fracture'].includes(c.diagnosis)&&!c.specialistCare)missing.push('Specialist treatment decision is required');
    const inventory=state?.careEconomy?.inventory||[],stock=(professional?[]:p.supplies).map(item=>inventory.find(i=>i.item===item&&i.kind==='supply'&&i.quantity>0));
    if(stock.some(i=>!i))missing.push('Required treatment supplies are missing');
    if(d.category==='mouth'&&['dental','oral'].includes(d.id)&&!c.services?.some(r=>r.service==='dental'))missing.push('Professional dental treatment is required');
    if(c.hospitalized&&!missing.length&&!ledger(state,`hospital-daily:${h.id}:${day}`,services.hospitalDay[1],day,h,[{name:services.hospitalDay[0],quantity:1,unitPrice:services.hospitalDay[1]}],{conditionId:c.id,treatmentEpisodeId:episode.id,admissionDate:episode.admittedDay,daysOfCare:1}))missing.push('Hospital daily care could not be paid');
    const r={day,ok:!missing.length,reason:missing.join('; '),taskId:p.id+':'+day,horseId:h.id,conditionId:c.id,treatmentEpisodeId:c.hospitalEpisode?.id||p.id,scheduledAt:day,careProvider:professional?provider:passive?'PASSIVE':'PLAYER',taskType:'Scheduled care',requiredItems:professional?[]:p.supplies,status:missing.length?(professional||requested?'Scheduled':'Missed'):(professional?(provider==='HOSPITAL'?'Completed by Hospital':'Completed by Veterinarian'):passive?'No Longer Required':'Completed by Player'),completedAt:missing.length?null:day,missedReason:missing.length?missing.join('; '):null};c.careLog.push(r);
    if(r.ok){stock.forEach(i=>{if(!['Digital Thermometer','Hoof Pick','Hoof Brush','Fly Mask','Fly Sheet','First-Aid Box','Treatment Folder','Cooling Wraps'].includes(i.item))i.quantity--;});if(!professional&&c.medicationCourse)c.medicationCourse.remainingDays--;c.courseDaysRemaining=Math.max(0,(c.courseDaysRemaining??c.recoveryDays)-1);}
    h.medicalTimeline.push({day,conditionId:c.id,planId:p.id,kind:r.ok?(professional?'Professional treatment completed for today.':'Scheduled care completed'):(professional?'Professional care needs assessment':requested?'Care task not completed':'Missed treatment task'),reason:r.reason});return r;
  }
  function serviceOptions(h,c){
    if(c.resolved||c.recoveryProgress>=c.recoveryDays)return [];
    const d=definition(c),completed=id=>c.services?.some(r=>r.service===id);
    const surgical={ 'tendon-rupture':'tendon','stable-fracture':'fracture','unstable-fracture':'fracture','surgical-colic':'surgery','critical-colic':'critical' }[c.diagnosis];
    const ids=[];
    if(d.emergency||c.severity!=='minor'){
      if(!c.hospitalized&&!c.criticalSurvived&&!completed('hospital'))ids.push('hospital');
      if(c.hospitalized)ids.push('hospitalDay');
      if(!completed('specialist'))ids.push('specialist');
    }
    if((d.category==='digestive'||['dehydration','heat'].includes(c.diagnosis))&&!completed('fluids'))ids.push('fluids');
    if(['colic','impaction'].includes(c.diagnosis)&&!completed('colic'))ids.push('colic');
    if(d.category==='skin'&&!completed('wound'))ids.push('wound');
    if(['dental','oral'].includes(c.diagnosis)&&!completed('dental'))ids.push('dental');
    if(surgical&&!completed(surgical))ids.push(surgical);
    return ids.map(id=>({id,name:services[id][0],price:services[id][1],blocked:d.emergency&&!c.emergencyAssessed?'Call the emergency veterinarian first.':['tendon','fracture','surgery','critical'].includes(id)&&!c.specialistAssessed?'Specialist assessment is required first.':''}));
  }
  function clinicalService(state,h,conditionId,service,day,eventId){
    const c=current(h).find(c=>c.id===conditionId),d=c&&definition(c);
    if(!c||(!c.confirmed&&!(['hospital','specialist','hospitalDay'].includes(service)&&c.emergencyAssessed))||!services[service]||h.deceased)return {ok:false,message:'A confirmed current condition and relevant veterinary service are required.'};
    const previous=c.services?.find(r=>r.service===service&&(service!=='hospitalDay'||r.day===day));
    if(previous)return {ok:true,message:services[service][0]+' is already completed for this episode. No additional charge was made.',serviceRecord:previous};
    const option=serviceOptions(h,c).find(r=>r.id===service);
    if(!option)return {ok:false,message:'This service is not indicated for the diagnosed condition. Choose one of the listed relevant services.'};
    if(option.blocked)return {ok:false,message:option.blocked};
    const key=service==='hospitalDay'?`hospital-daily:${h.id}:${day}`:`service:${h.id}:${c.id}:${service}`;
    const receipt=ledger(state,key,services[service][1],day,h,[{name:services[service][0],quantity:1,unitPrice:services[service][1]}],{conditionId:c.id,treatmentService:service});
    if(!receipt)return {ok:false,message:'Insufficient funds for this service.'};
    c.services ||= [];
    const record={service,day,receipt:receipt.number,findings:[],nextSteps:[]};c.services.push(record);
    if(service==='specialist'){
      c.specialistAssessed=day;
      record.findings.push(c.confirmed?d.name+' has been reviewed by the specialist.':'The specialist has assessed the urgent signs; the exact diagnosis still needs targeted testing.');
      record.nextSteps.push(...d.diagnosticRequirements.filter(type=>!h.diagnosticTests.some(r=>r.type===type)).map(type=>'Authorize '+exams[type][0]+'.'));
      const surgery=serviceOptions(h,c).find(r=>['tendon','fracture','surgery','critical'].includes(r.id));
      if(surgery)record.nextSteps.push('Review and authorize '+surgery.name+' if treatment is feasible.');
      else record.nextSteps.push('Begin the condition-specific care plan and attend the scheduled follow-up.');
    }
    if(['tendon','fracture','surgery','critical'].includes(service)){
      c.specialistCare=true;c.hospitalized=true;c.operationDay=day;c.emergencyStatus='Post-operative Monitoring';
      record.findings.push('The operation has been completed. The horse remains hospitalized during the critical phase.');
      record.nextSteps.push('Scheduled hospital care and restricted rehabilitation are now active. The critical response will be reviewed after five completed care days.');
    }
    if(service==='hospital'){
      c.hospitalEpisode ||= {id:'hospital:'+c.id,horseId:h.id,conditionId:c.id,admittedDay:day,careProvider:'HOSPITAL'};
      c.hospitalized=true;c.emergencyStatus='Hospitalized — Assessment / Treatment';
      record.findings.push('Hospital admission is complete. The horse is under professional monitoring.');
      record.nextSteps.push('Complete the indicated assessment and treatment. Hospital daily care costs $150 on each eligible care day.');
    }
    if(service==='hospitalDay'){
      record.findings.push('Hospital nursing and monitoring for this day have been paid.');
      record.nextSteps.push('The daily treatment clock will not charge this same hospital day twice.');
    }
    if(service==='colic'){
      c.emergencyTreatment=true;c.emergencyStatus='Medical Monitoring';
      record.findings.push('Veterinary medical treatment for the abdominal episode has started.');
      record.nextSteps.push('Continue the scheduled monitoring; an unresolved episode may require referral.');
    }
    if(service==='fluids'){
      c.fluidTherapy={day,provider:'Veterinary team'};
      record.findings.push('The veterinary team has provided the indicated fluid therapy.');
      record.nextSteps.push('Continue the cause-specific plan; fluid support does not replace indicated surgery or other treatment.');
    }
    if(service==='wound'){
      c.woundCare={day,provider:'Veterinary team'};
      record.findings.push('The wound has been professionally assessed and treated.');
      record.nextSteps.push('Daily wound care is scheduled. Keep the required dressing and cleansing supplies available.');
    }
    if(service==='dental'){
      c.dentalCare={day,provider:'Veterinary team'};
      record.findings.push('The diagnosed oral problem has received professional dental treatment.');
      record.nextSteps.push('Monitor eating comfort through the recovery period and attend the follow-up.');
    }
    // Authorizing actual treatment also starts its scheduled plan; a paid operation must never remain inert.
    let carePlan;
    if(c.confirmed){carePlan=plan(h,c.id,day).plan;if(carePlan){carePlan.scheduled=true;record.planId=carePlan.id;}if(c.hospitalized)hospitalRecord(h,c,day);}
    h.medicalTimeline.push({day,conditionId:c.id,kind:'Veterinary service completed',service,receipt:receipt.number,text:record.findings.join(' '),nextSteps:record.nextSteps});
    return {ok:true,message:record.findings.join(' ')+' '+record.nextSteps.join(' '),serviceRecord:record,plan:carePlan,receipt};
  }
  function emergencyResponse(state,h,conditionId,action,day,eventId){
    const c=current(h).find(c=>c.id===conditionId),d=c&&definition(c);
    if(!c||!d.emergency||h.deceased)return {ok:false,message:'No current emergency episode is available.'};
    if(action==='call'){if(c.emergencyAssessed)return {ok:true,message:'The emergency consultation is already recorded. Continue with the indicated treatment or hospital referral.'};return examine(state,h,'emergency',day,eventId);}
    if(action==='referral'){
      if(!c.emergencyAssessed)return {ok:false,message:'Call the emergency veterinarian for assessment first.'};
      const result=clinicalService(state,h,c.id,'hospital',day,eventId);if(result.ok)c.referralRequested=day;return result;
    }
    if(action==='unavailable'){
      if(c.specialistCare)return {ok:false,message:'The operation has already been completed. Continue post-operative monitoring and rehabilitation.'};
      if(!c.specialistAssessed||!['surgical-colic','critical-colic','tendon-rupture','unstable-fracture'].includes(c.diagnosis))return {ok:false,message:'Specialist assessment and a treatment prognosis must be recorded first.'};
      c.criticalDecision='unavailable';c.decisionDay=day;c.emergencyStatus='Critical Veterinary Monitoring';
      h.medicalTimeline.push({day,conditionId:c.id,kind:'Specialist treatment unavailable',text:'The veterinarian reports a critical prognosis without the indicated specialist treatment.'});return {ok:true,message:'The critical prognosis and veterinary monitoring decision have been recorded.'};
    }
    return {ok:false,message:'Choose an available emergency response.'};
  }
  function linkUnderlying(h,conditionId,underlyingId,day){
    const c=current(h).find(c=>c.id===conditionId),cause=current(h).find(c=>c.id===underlyingId);
    if(!c||!cause||!definition(c).investigation||!cause.confirmed||definition(cause).investigation)return {ok:false,message:'Select a confirmed underlying diagnosis for this investigation.'};
    c.underlyingId=cause.id;c.stage='Underlying Cause Identified';h.medicalTimeline.push({day,kind:'Investigation linked',conditionId:c.id,underlyingId:cause.id});return {ok:true};
  }
  function injuryOutcome(seed,key){const value=roll(seed,key)*114;return value<80?'none':value<94?'minor':value<107?'moderate':'major';}
  function incident(h,day,context={}) {
    if(h.deceased||current(h).length)return;
    const chance=backgroundChance(h,day,context.backgroundMode),r=roll(h.healthSeed,`incident:${day}`);if(r>=chance)return;
    const severity=injuryOutcome(h.healthSeed,`severity:${day}`);(h.healthOpportunities ||= []).push({day,outcome:severity});if(severity==='none')return;
    const eligible=Object.values(catalog).filter(d=>d.selectable!==false&&d.severity===severity&&(!d.minAge||h.age>=d.minAge)&&(!d.requires||context[d.requires]));
    const groups=[['skin',25],['hoof',20],['muscle',20],['airway',10],['digestive',10],['mouth',7],['general',8]].map(([id,weight])=>({id,weight,definitions:eligible.filter(d=>d.category===id)})).filter(g=>g.definitions.length);
    if(!groups.length)return;const group=weighted(groups,roll(h.healthSeed,`category:${day}`));
    const defs=group.definitions.map(d=>({...d,weight:d.weight*(d.vaccine&&h.vaccinations.some(v=>v.vaccine===d.vaccine&&v.nextDue>=day&&v.courseStatus==='Complete')?({influenza:.4,ehv:.65,strangles:.7}[d.id]??.75):1)}));
    const d=weighted(defs,roll(h.healthSeed,`diagnosis:${day}`));add(h,d.id,day,{cause:d.requires||'ordinary environmental exposure',severity});
  }
  function advance(h,targetDay,context={},state) {
    ensure(h,targetDay);
    for(let day=h.healthProcessedDay+1;day<=targetDay;day++){
      if(h.deceased){h.healthProcessedDay=day;continue;}
      for(const p of h.rehabilitationPlans.filter(p=>p.status==='Active'&&day>=p.followup&&!p.followupNotified)){p.followupNotified=day;h.medicalTimeline.push({day,conditionId:p.conditionId,kind:'Veterinary follow-up due',text:'The scheduled veterinary review is due.'});}
      for(const c of current(h)){
        hospitalRecord(h,c,day);
        const d=definition(c);if(c.outcome==='persistent')continue;
        if(d.investigation){const cause=h.medicalConditions.find(r=>r.id===c.underlyingId);if(cause?.resolved){c.resolved=true;c.resolvedDay=day;c.stage='Underlying Cause Managed';h.previousConditions.push(copy(c));}continue;}
        if(c.recoveryProgress>=c.recoveryDays){c.stage=d.chronic?'Stable / Managed':'Awaiting Follow-Up';continue;}
        if(c.criticalDecision==='unavailable'&&day>c.decisionDay){finish(h,c,day);if(h.deceased)break;continue;}
        const care=careDay(state,h,c,c.hospitalized?day:day-1,context);
        if(care.ok&&care.recoveryAppliedDay==null){
          care.recoveryAppliedDay=day;c.recoveryProgress++;c.stage='Improving';
          if(c.specialistCare&&['surgical-colic','critical-colic','tendon-rupture','unstable-fracture'].includes(c.diagnosis)&&!c.criticalEvaluated&&c.recoveryProgress>=5){
            c.criticalEvaluated=true;
            const table=d.outcomesBySeverity[c.severity]||Object.values(d.outcomesBySeverity)[0];
            const result=weighted(Object.entries(table).map(([id,weight])=>({id,weight})),roll(h.healthSeed,`outcome:${c.id}`)).id;
            if(result==='death'){finish(h,c,day);break;}
            c.criticalSurvived=true;if(c.hospitalEpisode){c.hospitalEpisode.dischargeDay=day;c.hospitalEpisode.status='Discharged';}c.homeCareStartsDay=day;c.hospitalized=false;c.emergencyStatus='Restricted Rehabilitation';h.medicalTimeline.push({day,conditionId:c.id,kind:'Critical phase survived',text:'The critical phase has passed, although longer-term rehabilitation is still required.'});
          }
          if(c.observedPhases?.length)recordObservation(h,c,'health',day,'improving');
          if((d.surgicalEscalationProbability||c.diagnosis==='colic'&&c.severity==='moderate')&&c.recoveryProgress>=c.recoveryDays&&!c.escalationChecked){
            c.escalationChecked=true;
            if(roll(h.healthSeed,`escalation:${c.id}`)<(d.surgicalEscalationProbability||.02)){
              c.resolved=true;c.stage='Referred for Surgery';c.outcome='escalated';c.resolvedDay=day;h.previousConditions.push(copy(c));
              const next=add(h,c.diagnosis==='colic'?'impaction':'surgical-colic',day,{cause:'Escalation of persistent abdominal emergency',parentEpisodeId:c.id,known:c.confirmed,confirmed:c.confirmed});
              c.escalatedTo=next.id;h.rehabilitationPlans.filter(p=>p.conditionId===c.id).forEach(p=>p.status='Referred');continue;
            }
          }
          if(c.recoveryProgress>=c.recoveryDays){if(d.routine)finish(h,c,day);else c.stage=d.chronic?'Stable / Managed':'Awaiting Follow-Up';}
        }
      }
      for(const c of h.medicalConditions.filter(c=>c.resolved&&c.recurrenceDue&&day>=c.recurrenceDue&&!c.recurrenceChecked)){
        const d=definition(c),eligible=(!d.requiresRecurrenceTrigger||context[d.requires]||d.correction&&!context[d.correction])&&(!['tendon','suspensory','tendon-rupture','stable-fracture'].includes(c.diagnosis)||c.returnedToWork);
        if(!eligible){if(day>=c.recurrenceUntil)c.recurrenceChecked=true;continue;}
        c.recurrenceChecked=true;
        const probability=d.correction&&!context[d.correction]?d.recurrenceIfCausePersists:d.recurrence??d.recurrenceProbabilityBySeverity[c.severity]??d.recurrenceProbability;
        if(roll(h.healthSeed,`recurrence:${c.id}`)<probability&&!current(h).some(r=>r.diagnosis===c.diagnosis))add(h,c.diagnosis,day,{cause:'Linked recurrence of previous episode',parentEpisodeId:c.id,severity:c.severity});
      }
      h.hoofHealth.growth+=.15;
      if(day>h.hoofHealth.nextDue+14&&roll(h.healthSeed,`hoof:${day}`)<.02)h.hoofHealth.condition=bounded(h.hoofHealth.condition-1,0,100);
      for(const c of h.medicalConditions)if(c.hospitalEpisode)hospitalRecord(h,c,day);
      incident(h,day,{...context,shod:h.hoofHealth.shoes!=='barefoot',overdueHooves:day>h.hoofHealth.nextDue+21});h.healthProcessedDay=day;
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
    let examReport;if(assessment){const result=examine({money:1000000},h,service==='joint'?'joint':'hoof',day,`farrier-exam:${eventId}`);if(result.ok){examReport=result.report;findings.push(...examReport.messages);}}
    const record={id:eventId,day,service,findings,examReport,nextDue:hoof.nextDue,receipt:receipt.number};hoof.history.push(record);hoof.findings.push(...findings.map(text=>({day,text})));return {ok:true,visit:record};
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
  const backgroundConfig={previousMonthly:.04,monthly:.046,dailyBase:.04,dailyMax:.12,raisedDayFrequency:.10};
  function backgroundChance(h,day,mode='month'){
    if(mode!=='day')return 1-Math.pow(1-backgroundConfig.monthly,1/30);
    return roll(h.healthSeed,`background-vary:${day}`)<backgroundConfig.raisedDayFrequency?backgroundConfig.dailyBase+roll(h.healthSeed,`background-level:${day}`)*(backgroundConfig.dailyMax-backgroundConfig.dailyBase):backgroundConfig.dailyBase;
  }
  const saleHealthWeights={healthy:55,minor:20,historical:12,active:10,serious:3};
  const activeSaleWeights={muscle:45,hoof:20,digestive:15,airway:10,other:10};
  const seriousSaleWeights={orthopedic:45,chronic:20,digestive:20,other:15};
  function chooseMap(map,seed,key){return weighted(Object.entries(map).map(([id,weight])=>({id,weight})),roll(seed,key)).id;}
  function chooseIds(ids,seed,key){return ids[Math.floor(roll(seed,key)*ids.length)];}
  function seedSaleHealth(h,day){
    ensure(h,day);if(h.preexistingHealthProcessed)return h.preSaleHealthProfile;
    h.preexistingHealthProcessed=true;
    const seed=hash(h.id+'|market-health-v3'),kind=chooseMap(saleHealthWeights,seed,'category');
    const profile=h.preSaleHealthProfile={version:3,kind,affected:kind!=='healthy',severity:null};
    if(kind==='healthy')return profile;
    let id,severity,group;
    if(kind==='minor'){id=chooseIds(['scratch','abrasion','rub','dental'],seed,'condition');severity='minor';}
    if(kind==='historical'){id=chooseIds(['tendon','suspensory','synovitis'],seed,'condition');severity='moderate';}
    if(kind==='active'){
      group=chooseMap(activeSaleWeights,seed,'group');id=chooseIds({muscle:['strain','synovitis','soreness'],hoof:['abscess','bruise','imbalance'],digestive:['ulcers','digestive-upset'],airway:['respiratory','airway-irritation'],other:['dental','skin-infection','eye']}[group],seed,'condition');severity=roll(seed,'severity')<.5?'minor':'moderate';
    }
    if(kind==='serious'){
      group=chooseMap(seriousSaleWeights,seed,'group');id=chooseIds({orthopedic:['tendon','suspensory','synovitis'],chronic:['djd','asthma'],digestive:['digestive-illness'],other:['cornea','skin-infection','laceration']}[group],seed,'condition');severity='major';
    }
    const historical=kind==='historical'||kind==='minor'&&roll(seed,'resolved')<.5;
    const known=historical&&roll(seed,'records')<.75;
    const c=add(h,id,day,{cause:'Persistent pre-sale medical history',severity,known,confirmed:known});
    if(historical){c.resolved=true;c.resolvedDay=day-30-Math.floor(roll(seed,'history-age')*331);c.onset=c.resolvedDay-c.recoveryDays;c.recoveryProgress=c.recoveryDays;c.residual=kind==='historical'&&roll(seed,'residual')<(definition(c).outcomesBySeverity[c.severity]?.residual||0);c.outcome=c.residual?'residual':'full';c.stage=c.residual?'Resolved with Residual Effects':'Resolved';h.previousConditions.push(copy(c));}
    profile.conditionId=c.id;profile.severity=c.severity;profile.group=group||null;profile.historical=historical;
    return profile;
  }
  const rescueProfileWeights={neglect:25,medical:25,underconditioned:20,multiple:15,severe:10,behavior:5};
  const rescueSeverityWeights={minor:5,moderate:50,major:35,complex:10};
  function seedRescueHealth(h,day){
    ensure(h,day);if(h.rescueIntakeVersion===3)return h.rehabilitationProfile;
    const seed=hash(h.id+'|rescue-intake-v3'),kind=chooseMap(rescueProfileWeights,seed,'profile'),severity=chooseMap(kind==='severe'?{major:75,complex:25}:{minor:5/90*100,moderate:50/90*100,major:27.5/90*100,complex:7.5/90*100},seed,'severity'),clinical=severity==='complex'?'major':severity;
    h.rescueIntakeVersion=3;h.isRescue=true;h.careNewNPC=false;
    h.welfareNeeds=[];
    h.rehabilitationProfile={profile:kind,primarySeverity:severity,stage:'Intake',hiddenFears:[],handlingDays:[],version:3};
    const condition=(id,level=clinical)=>add(h,id,day,{cause:'Rescue intake history requiring rehabilitation',severity:level});
    if(kind==='neglect'){h.weightStatus=clinical==='major'?'Very Underweight':'Underweight';h.welfareNeeds.push('Nutritional neglect','Hoof-care rehabilitation');condition('imbalance');}
    if(kind==='medical'){h.welfareNeeds.push('Previous injury requiring an active rehabilitation plan');condition(chooseIds(['tendon','synovitis','suspensory'],seed,'condition'));}
    if(kind==='underconditioned'){h.weightStatus='Very Underweight';h.welfareNeeds.push('Serious underconditioning','Low handling education');h.behavior=Math.min(h.behavior||100,150);h.requiresBreakingIn=true;}
    if(kind==='multiple'){h.weightStatus='Underweight';h.welfareNeeds.push('Multiple physical rehabilitation needs');condition('dental');condition('imbalance');condition('strain',clinical==='major'?'moderate':clinical);}
    if(kind==='severe'){h.weightStatus='Underweight';h.welfareNeeds.push('Prolonged veterinary rehabilitation');condition('tendon','major');condition('imbalance','moderate');}
    if(kind==='behavior'){h.weightStatus='Moderate';h.welfareNeeds.push('Significant handling rehabilitation');h.behavior=Math.min(h.behavior||100,100);h.requiresBreakingIn=true;}
    if(['underconditioned','behavior','multiple'].includes(kind)){
      h.rehabilitationProfile.hiddenFears.push({context:'hoof',trait:'Hoof-Handling Difficulties',known:false,exposures:0,history:[]});
      if(severity==='major'||severity==='complex')h.rehabilitationProfile.hiddenFears.push({context:'equipment',trait:'Equipment Cautious',known:false,exposures:0,history:[]});
    }
    return h.rehabilitationProfile;
  }
  root.HorseHealth={hospitalRecord,hospitalDecision,completeCare,workloadAdvice,workExposure,backgroundConfig,backgroundChance,saleHealthWeights,activeSaleWeights,seriousSaleWeights,rescueProfileWeights,rescueSeverityWeights,seedRescueHealth,serviceOptions,emergencyResponse,probabilityAudit,services,narrative,careDay,clinicalService,linkUnderlying,lamenessGrade,seedSaleHealth,injuryOutcome,catalog,exams,supplies,medicines,farrierServices,vaccinePolicies,hash,roll,copy,ensure,add,definition,current,allowed,observe,publicView,ledger,examine,plan,purchase,administer,advance,incident,cooperation,farrier,vaccinate,documentation};
  if(typeof module!=='undefined')module.exports=root.HorseHealth;
})(globalThis);
