/* Dismissible veterinary notices use recorded concerns and existing care dates. */
function vetConditionWarningState(c){
 const severity=({subclinical:0,minor:1,mild:1,moderate:2,severe:3,critical:4,terminal:5})[String(c.severity).toLowerCase()]||0;
 return {diagnosis:c.diagnosis,severity,complications:(c.complications||[]).length,disclosed:c.known||c.confirmed?1:0,intensity:Math.floor((Number(c.symptomIntensity)||0)/20)};
}
function vetWarningWasDismissed(h,issue){
 const prior=h.dismissedVetWarnings?.[issue.key];if(!prior||typeof prior!=='object')return false;
 const state=issue.state||{};return prior.diagnosis===state.diagnosis&&['severity','complications','disclosed','intensity'].every(key=>(prior[key]||0)>=(state[key]||0));
}
function vetWarningIssues(h){
 if(!h||h.deceased)return [];csEnsure(h);const issues=[],day=csDay();
 for(const c of HorseHealth.current(h)){
  const def=HorseHealth.definition(c),observed=h.playerObservations.findLast(o=>o.conditionId===c.id);
  if(!def.emergency&&!c.known&&!c.confirmed&&!c.suspected&&!observed)continue;
  const text=c.known||c.confirmed?def.name+' — review current care and veterinary findings.':observed?.text||(def.emergency?'An acute veterinary concern needs attention. Review the current findings.':'A suspected veterinary concern needs review.');
  issues.push({key:'condition:'+c.id,urgent:!!def.emergency,text,state:vetConditionWarningState(c)});
 }
 if(h.due?.checkup)issues.push({key:'checkup:'+app.year,urgent:false,text:'Routine veterinary checkup is due.'});
 for(const p of h.rehabilitationPlans||[])if(p.status==='Active'&&Number.isFinite(p.followup)&&p.followup<=day)issues.push({key:'followup:'+(p.id||p.conditionId)+':'+p.followup,urgent:false,text:'A scheduled veterinary follow-up is due.'});
 const vaccines=new Map();for(const v of h.vaccinations||[])if(!vaccines.has(v.vaccine)||(vaccines.get(v.vaccine).date||0)<=(v.date||0))vaccines.set(v.vaccine,v);
 for(const v of vaccines.values())if(Number.isFinite(v.nextDue)&&v.nextDue<=day)issues.push({key:'vaccination:'+v.vaccine+':'+v.nextDue,urgent:false,text:'Veterinary vaccination review is due: '+v.vaccine+'.'});
 return issues.filter(issue=>!vetWarningWasDismissed(h,issue));
}
function vetWarnings(){return app.horses.filter(h=>h&&!h.deceased).map(h=>({horse:h,issues:vetWarningIssues(h)})).filter(row=>row.issues.length).sort((a,b)=>Number(b.issues.some(i=>i.urgent))-Number(a.issues.some(i=>i.urgent)));}
function vetDismissWarnings(h,issues=vetWarningIssues(h)){
 if(!h.dismissedVetWarnings||typeof h.dismissedVetWarnings!=='object'||Array.isArray(h.dismissedVetWarnings))h.dismissedVetWarnings={};
 for(const issue of issues)h.dismissedVetWarnings[issue.key]={...issue.state};
 for(const key of Object.keys(h.dismissedVetWarnings).slice(0,-100))delete h.dismissedVetWarnings[key];
}
function vetRenderWarnings(){
 const panel=document.getElementById('veterinary-warnings');if(!panel||panel.nodeType!==1)return;
 const rows=vetWarnings(),signature=String(HorseHealth.hash(JSON.stringify(rows.map(row=>[row.horse.id,row.horse.name,row.issues]))));
 panel.hidden=!rows.length;if(panel.dataset.warningSignature===signature)return;panel.dataset.warningSignature=signature;
 if(!rows.length){panel.innerHTML='';return;}
 panel.innerHTML='<div class="vet-warning-heading"><h2>Veterinary warnings</h2><button type="button" data-vet-warning-close-all>Close all warnings</button></div><div class="vet-warning-list">'+rows.map((row,index)=>'<article class="box vet-warning '+(row.issues.some(i=>i.urgent)?'vet-warning-urgent':'')+'" role="'+(row.issues.some(i=>i.urgent)?'alert':'status')+'"><h3>'+csEscape(row.issues.some(i=>i.urgent)?'Acute veterinary concern — ':'Veterinary care — ')+csEscape(row.horse.name)+'</h3><ul>'+row.issues.map(issue=>'<li>'+csEscape(issue.text)+'</li>').join('')+'</ul><button type="button" data-vet-warning-open="'+index+'">View veterinary care</button><button type="button" data-vet-warning-close="'+index+'" aria-label="Close veterinary warning for '+csEscape(row.horse.name)+'">Close warning</button></article>').join('')+'</div>';
 const dismiss=row=>{vetDismissWarnings(row.horse,row.issues);};
 panel.querySelector('[data-vet-warning-close-all]').onclick=()=>{rows.forEach(dismiss);vetRenderWarnings();saveGame(false);};
 panel.querySelectorAll('[data-vet-warning-close]').forEach(button=>button.onclick=()=>{dismiss(rows[Number(button.dataset.vetWarningClose)]);vetRenderWarnings();saveGame(false);});
 panel.querySelectorAll('[data-vet-warning-open]').forEach(button=>button.onclick=()=>{app.vetSelection={...(app.vetSelection||{}),horseId:rows[Number(button.dataset.vetWarningOpen)].horse.id};changeTab('vet');renderVet();});
}
const VET_WARNING_RENDER=render;render=function(...args){const result=VET_WARNING_RENDER(...args);vetRenderWarnings();return result;};
