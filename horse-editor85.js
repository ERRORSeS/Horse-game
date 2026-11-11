/* Optional roleplay editor: every control writes the existing authoritative field. */
function horseEditor85Fields(h){
 const fields=[];t2horse(h);rrHorse(h);
 for(const [group,skills]of Object.entries(h.stats||{}))for(const skill of Object.keys(skills))fields.push({id:'skill:'+group+':'+skill,label:group+' · '+skill,max:100,category:'technical',get:()=>h.stats[group][skill],set:v=>{h.stats[group][skill]=v;}});
 for(const name of T2_ATTRIBUTES)fields.push({id:'attribute:'+name,label:'Riding · '+name,max:10,category:'riding',get:()=>t2attribute(h,name),set:v=>{if(name==='Focus')h.focus=v*10;else h.training2.attributes[name]=v;if(name==='Sensitivity to Aids')h.training2.sensitivityBaseline=v;}});
 for(const name of RR_LEARNED)fields.push({id:'learned:'+name,label:'Learned · '+name,max:100,category:'learned',get:()=>rrHorse(h).learned[name],set:v=>{rrHorse(h).learned[name]=v;}});
 for(const name of ['naturalSpookiness','temperamentIntensity'])fields.push({id:'natural:'+name,label:'Natural · '+name,max:100,category:'natural',get:()=>rrHorse(h)[name],set:v=>{rrHorse(h)[name]=v;}});
 for(const [name,max]of [['behavior',1000],['confidenceFlat',100],['confidenceJump',100],['controlability',100],['fatigue',100]])if(Number.isFinite(h[name]))fields.push({id:'horse:'+name,label:name,max,category:'other',get:()=>h[name],set:v=>{h[name]=v;}});
 for(const name of Object.keys(h.training2.education||{}))fields.push({id:'education:'+name,label:'Aid education · '+name,max:100,category:'education',get:()=>h.training2.education[name],set:v=>{h.training2.education[name]=v;}});
 for(const d of Object.keys(h.potential||{}))fields.push({id:'potential:'+d,label:'Potential · '+d,max:100,category:'potential',get:()=>h.potential[d],set:v=>{h.potential[d]=v;(h.statEditorPotential85 ||= {})[d]=v;}});
 return fields;
}
const EDITOR85_POTENTIAL=applyBreedPotential;
applyBreedPotential=function(h){const out=EDITOR85_POTENTIAL(h);if(h?.statEditorPotential85&&h.potential)for(const [d,value]of Object.entries(h.statEditorPotential85))if(Object.hasOwn(h.potential,d)&&Number.isFinite(value))h.potential[d]=clamp(value,0,100);return out;};
function horseEditor85Apply(id,changes){
 const h=app.horses.find(h=>h.id===id&&!h.isLeased&&h.owner==='Your Stable');
 if(!app.settings.horseStatEditor85||!h)return {ok:false,message:'Enable Horse Stat Editor and select an owned horse.'};
 const fields=new Map(horseEditor85Fields(h).map(f=>[f.id,f]));
 for(const [key,value]of Object.entries(changes)){const field=fields.get(key);if(!field||!Number.isFinite(Number(value))||Number(value)<0||Number(value)>field.max)return {ok:false,message:'Use a valid value for '+key+'.'};}
 for(const [key,value]of Object.entries(changes))fields.get(key).set(Number(value));
 saveGame(false);return {ok:true};
}
function horseEditor85Max(id){
 const h=app.horses.find(h=>h.id===id);if(!h)return {ok:false};
 const values={};for(const f of horseEditor85Fields(h))if(['technical','riding','potential','education'].includes(f.category)||['horse:behavior','horse:controlability'].includes(f.id)||['horse:confidenceFlat','horse:confidenceJump'].includes(f.id))values[f.id]=f.max;
 return horseEditor85Apply(id,values);
}
const EDITOR85_CARD=createHorseCard;
createHorseCard=function(h,...args){
 const node=EDITOR85_CARD(h,...args);if(!app.settings.horseStatEditor85||!app.horses.some(row=>row.id===h.id&&row.owner==='Your Stable'&&!row.isLeased))return node;
 const editor=document.createElement('details');editor.dataset.uiKey='stat-editor85:'+h.id;
 editor.innerHTML='<summary>Edit Stats</summary><button type="button" data-editor85-max>MAX ALL SKILLS &amp; ATTRIBUTES</button><p>Uses 100 for technical skills and editable potential, and 10 for riding attributes. Natural temperament, learned behavior, genes, Bond and QOL stay as set.</p>'+horseEditor85Fields(h).map(f=>`<label>${csEscape(f.label)}<input type="number" min="0" max="${f.max}" step="0.1" value="${Number(f.get()||0)}" data-editor85-field="${csEscape(f.id)}"></label>`).join('')+`<label>Personality<select data-editor85-personality>${PERSONALITIES.map(p=>`<option${p===h.personality?' selected':''}>${csEscape(p)}</option>`).join('')}</select></label><details><summary>Existing personality traits</summary>${[...new Set(T2_TRAIT_RULES.map(r=>r[0]))].map(trait=>`<label><input type="checkbox" data-editor85-trait="${csEscape(trait)}"${h.training2.traits.includes(trait)?' checked':''}>${csEscape(trait)}</label>`).join('')}</details><details><summary>Advanced bulk targets (includes negative behavior)</summary><label>Category<select data-editor85-category><option value="learned">All learned behaviors, including avoidance</option><option value="natural">Natural spookiness and temperament intensity</option></select></label><label>Explicit target (0–100)<input data-editor85-target type="number" min="0" max="100" value="0"></label><button type="button" data-editor85-bulk>Apply explicit target</button></details><p role="status" data-editor85-status></p>`;
 const status=result=>{editor.querySelector('[data-editor85-status]').textContent=result.ok?'Saved. Changes apply to the next activity.':result.message;};
 editor.querySelectorAll('[data-editor85-field]').forEach(input=>input.onchange=()=>status(horseEditor85Apply(h.id,{[input.dataset.editor85Field]:input.value})));
 editor.querySelector('[data-editor85-max]').onclick=()=>{status(horseEditor85Max(h.id));render();};
 editor.querySelector('[data-editor85-personality]').onchange=e=>{h.personality=e.target.value;saveGame(false);};
 editor.querySelectorAll('[data-editor85-trait]').forEach(input=>input.onchange=()=>{if(input.checked){for(const pair of T2_EXCLUSIONS.filter(pair=>pair.includes(input.dataset.editor85Trait)))editor.querySelectorAll('[data-editor85-trait]').forEach(other=>{if(other!==input&&pair.includes(other.dataset.editor85Trait))other.checked=false;});}h.training2.traits=[...editor.querySelectorAll('[data-editor85-trait]:checked')].map(i=>i.dataset.editor85Trait);saveGame(false);});
 editor.querySelector('[data-editor85-bulk]').onclick=()=>{const category=editor.querySelector('[data-editor85-category]').value,value=Number(editor.querySelector('[data-editor85-target]').value),patch=Object.fromEntries(horseEditor85Fields(h).filter(f=>f.category===category).map(f=>[f.id,value]));status(horseEditor85Apply(h.id,patch));render();};node.appendChild(editor);return node;
};
const EDITOR85_SETTINGS=renderSettings;
renderSettings=function(...args){const out=EDITOR85_SETTINGS(...args),panel=document.getElementById('settings'),label=document.createElement('label');label.innerHTML=`<input type="checkbox" data-editor85-enabled${app.settings.horseStatEditor85?' checked':''}> Enable Horse Stat Editor`;panel.appendChild(label);label.querySelector('input').onchange=e=>{app.settings.horseStatEditor85=e.target.checked;saveGame(false);};return out;};
