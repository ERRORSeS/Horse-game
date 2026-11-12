/* All face/leg work remains with the original engine. This module writes body-coat fields only. */
function coat94Age(h){if(Number.isFinite(h.coatGenetics94?.bornHour))return Math.max(0,(pastureCalendarHour()-h.coatGenetics94.bornHour)/(360*24));if(h.birthDate?.year!=null)return Math.max(0,(pastureCalendarHour()-pastureCalendarHour(h.birthDate.year,h.birthDate.month||1,h.birthDate.day||1,0))/(360*24));return Math.max(0,(h.birthYear!=null?app.year-h.birthYear:Number(h.age)||0)+(app.month-1)/12+(app.day-1)/360);}
function coat94Apply(h,state){
 h.coatGenetics94=state;const view=coat94Describe(state,coat94Age(h));
 h.coat=view.patterns?.some(p=>p.id==='progressive_grey'&&p.stage!=='Base coat'||p.id==='dominant_white'&&p.allele!=='W20'||p.id==='sabino_white')?view.name:view.primary||h.coat;const body=state.origin==='legacy'?null:view.patterns;
 if(body){const names=body.map(p=>p.subtype?p.subtype+' Appaloosa':Coat94.patterns.get(p.id).name+' ('+Coat94.expressions[p.expression]+')');h.marking=names[0]||'None';h.marking2=names.slice(1).join(' + ')||'None';}
 return state;
}
function coat94Ensure(h){
 if(!h)return null;const state=h.coatGenetics94;
 if(state){if(state.origin!=='legacy')coat94Apply(h,state);return state;}
 return null;
}
const COAT94_BASE=baseHorse;
baseHorse=function(...args){const h=COAT94_BASE(...args);coat94Apply(h,coat94Founder(h.breed,h.id+':coat94',coat94Age(h)));if(Breed94.has(h.breed)){breed94Potential(h);breed94Finalize(h,true);breed94Growth(h);}return h;};
const COAT94_NPC=careerNpcHorse;
careerNpcHorse=function(...args){const h=COAT94_NPC(...args);coat94Apply(h,coat94Founder(h.breed,h.id+':coat94',coat94Age(h)));return h;};
const COAT94_APPEARANCE=applyBreedAppearance;
applyBreedAppearance=function(h,...args){const protectedFields=Object.fromEntries(['faceMarking','legMarkings','socks',...(!h.coatGenetics94||h.coatGenetics94.origin==='legacy'?['coat','marking','marking2','modifiers']:[])].map(k=>[k,{present:Object.hasOwn(h,k),value:h[k]}]));const out=COAT94_APPEARANCE(h,...args);for(const [key,row]of Object.entries(protectedFields))if(row.present)h[key]=row.value;else delete h[key];coat94Ensure(h);return out;};
const COAT94_TRAITS=applyBreedTraits;
applyBreedTraits=function(h,...args){const out=COAT94_TRAITS(h,...args);if(h.coatGenetics94?.origin==='founder'&&h.coatGenetics94.breed!==h.breed&&!globalThis.coat94Loading&&!coat94Horses(app).some(row=>row===h))coat94Apply(h,coat94Founder(h.breed,h.id+':coat94',coat94Age(h)));else coat94Ensure(h);return out;};
const COAT94_INHERIT=foalGeneticsFromParents;
foalGeneticsFromParents=function(dam,sire){
 const old=COAT94_INHERIT(dam,sire),draw=dam.coatBirthCount94||0;dam.coatBirthCount94=draw+1;old.coat94=coat94Inherit(dam,sire,[dam?.id,sire?.id,draw].join(':'));return old;
};
const COAT94_PHENOTYPE=resolvePhenotypeFromGenetics;
resolvePhenotypeFromGenetics=function(genes,breed){
 const result=COAT94_PHENOTYPE(genes,breed);if(!genes?.coat94)return result;
 const state={...genes.coat94,breed},view=coat94Describe(state,0);
 // The returned dedicated marking fields are exactly those produced by the original generator.
 return {...result,coat:view.primary,marking:view.secondary,marking2:'None'};
};
const COAT94_PREGNANCY=processPregnancy;
processPregnancy=function(mare,newborns,...args){
 const before=newborns.length,sireId=mare?.pregnantEmbryo?.sireId,sire=app.horses.find(h=>sireId?h.id===sireId:h.name===mare?.pregnantBy);
 const out=COAT94_PREGNANCY(mare,newborns,...args);
 for(let i=newborns.length-1;i>=before;i--){const h=newborns[i],state=h.genetics?.coat94;if(!state)continue;
  if(!state.viability.valid){newborns.splice(i,1);for(const p of [mare,sire])if(p?.offspring)p.offspring=p.offspring.filter(r=>r.foalId!==h.id);pushReport(mare.name+' lost a foal due to an incompatible inherited coat genotype.');continue;}
  coat94Apply(h,{...state,breed:h.breed,bornHour:pastureCalendarHour()});
  breed94Foal(h,mare,sire);
 }
 return out;
};
function coat94Horses(state){
 const out=[],seen=new WeakSet();
 const skip=new Set(['meets','rankings','rankHistory','showHistory','showResults','finalStandings','results','training2','riderRealism','practice','rankingsCache']);
 function visit(node){if(!node||typeof node!=='object'||seen.has(node))return;seen.add(node);if(node.id&&node.breed&&(node.coat!=null||node.stats||node.skills)){out.push(node);return;}for(const [key,v]of Object.entries(node))if(!skip.has(key)&&v&&typeof v==='object')visit(v);}
 visit(state);return out;
}
function coat94Legacy(h){
 const raw=String(h.coat||''),base=raw.replace(/\s*\((?:light|medium|dark)\)/ig,'').trim(),aliases={'Light Chestnut':'Chestnut','Dark Chestnut':'Chestnut','Light Bay':'Bay','Dark Bay':'Bay','Seal Bay':'Seal Brown','Light Black':'Fading Black','Bluish Black':'Black','True Black':'Black','Pearl':'Pearl Dilute Chestnut'};
 const id=coat94Id(aliases[base]||base),shade=raw.match(/\((light|medium|dark)\)/i);
 return {v:1,origin:'legacy',breed:h.breed,primary:Coat94.primary.has(id)?id:null,shade:shade?Coat94.shades.findIndex(s=>s.toLowerCase()===shade[1].toLowerCase()):null,genes:coat94LegacyGenes(h),legacy:{name:raw,primary:raw,secondary:[h.marking,h.marking2].filter(v=>v&&v!=='None').join(' + ')||'None'}};
}
const COAT94_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){
 const snapshots=new Map(coat94Horses(data).map(h=>[h.id,{h,fields:Object.fromEntries(['coat','marking','marking2','faceMarking','legMarkings','socks','modifiers','genetics'].map(k=>[k,{present:Object.hasOwn(h,k),value:h[k]===undefined?undefined:HorseHealth.copy(h[k])}]))}]));
 const old=globalThis.coat94Loading;globalThis.coat94Loading=true;let result;
 try{result=COAT94_LOAD(data,...args);}finally{globalThis.coat94Loading=old;}
 for(const h of coat94Horses(app)){const saved=snapshots.get(h.id);if(saved){for(const [key,row]of Object.entries(saved.fields))if(row.present)h[key]=row.value;else delete h[key];if(!h.coatGenetics94&&(app.horses||[]).includes(h))h.coatGenetics94=coat94Legacy(h);}else coat94Ensure(h);}
 return result;
};
const COAT94_MONTH=monthlyProgress;
monthlyProgress=function(...args){const out=COAT94_MONTH(...args);for(const h of app.horses||[]){if(h.athleticPotential94)breed94Growth(h);if(h.coatGenetics94?.origin!=='legacy')coat94Ensure(h);}return out;};
