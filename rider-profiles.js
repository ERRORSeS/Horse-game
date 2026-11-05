/* Named rider profiles retain independent levels and stable behavioral identities. */
function rrProfileSnapshot(r,id=r.riderId,name=id){return {id,name,level:r.level,abilities:{...r.abilities},experience:{...r.experience}};}
function rrNormalizeProfile(p){
 return {id:String(p.id).slice(0,80),name:String(p.name||p.id).trim().slice(0,80)||String(p.id).slice(0,80),level:['Beginner','Novice','Intermediate','Advanced','Professional'].includes(p.level)?p.level:'Intermediate',abilities:Object.fromEntries(RR_ABILITIES.map(k=>[k,Number.isFinite(Number(p.abilities?.[k]))?clamp(Number(p.abilities[k]),0,100):60])),experience:Object.fromEntries(Object.entries(SHOW_LEVELS).map(([d,levels])=>[d,levels.includes(p.experience?.[d])?p.experience[d]:levels[0]]))};
}
const RR_PROFILE_SETTINGS=rrSettings;
rrSettings=function(){
 const r=RR_PROFILE_SETTINGS();r.riderId=String(r.riderId||'player').slice(0,80);
 if(r.profilesVersion!==1||!Array.isArray(r.profiles)||r.profiles.some(p=>!p||typeof p.id!=='string')){
  const seen=new Set();r.profiles=(Array.isArray(r.profiles)?r.profiles:[]).filter(p=>p&&typeof p==='object'&&typeof p.id==='string'&&p.id.trim()).map(rrNormalizeProfile).filter(p=>{if(seen.has(p.id))return false;seen.add(p.id);return true;});r.profilesVersion=1;
 }
 if(!r.profiles.some(p=>p.id===r.riderId))r.profiles.push(rrProfileSnapshot(r));
 return r;
};
function rrStoreCurrentProfile(){
 const r=rrSettings(),p=r.profiles.find(p=>p.id===r.riderId);Object.assign(p,rrProfileSnapshot(r,p.id,p.name));return p;
}
function rrCurrentRiderName(){const r=rrSettings();return r.profiles.find(p=>p.id===r.riderId)?.name||r.riderId;}
function rrSelectRider(id){
 const r=rrSettings(),p=r.profiles.find(p=>p.id===id);if(!p)return false;
 rrStoreCurrentProfile();r.riderId=p.id;r.level=p.level;r.abilities={...p.abilities};r.experience={...p.experience};return true;
}
function rrCreateRider(name){
 const r=rrSettings(),clean=String(name||'').trim().slice(0,80);if(!clean)return {ok:false,message:'Enter a rider name.'};
 if(r.profiles.some(p=>p.name.toLowerCase()===clean.toLowerCase()))return {ok:false,message:'A rider with that name already exists. Choose it from Saved riders.'};
 rrStoreCurrentProfile();let id;do{r.profileSequence=(Number.isFinite(r.profileSequence)?Math.max(0,Math.floor(r.profileSequence)):0)+1;id='rider-'+r.profileSequence+'-'+uid();}while(r.profiles.some(p=>p.id===id));
 const p=rrProfileSnapshot(r,id,clean);r.profiles.push(p);rrSelectRider(id);return {ok:true,profile:p};
}
function rrRenameRider(name){
 const r=rrSettings(),clean=String(name||'').trim().slice(0,80),p=r.profiles.find(p=>p.id===r.riderId);
 if(!clean||r.profiles.some(other=>other.id!==p.id&&other.name.toLowerCase()===clean.toLowerCase()))return false;
 p.name=clean;return true;
}
function rrReadRiderForm(box){
 const r=rrSettings(),level=box.querySelector('[data-rr-level]');if(level)r.level=level.value;
 box.querySelectorAll('[data-rr-ability]').forEach(el=>r.abilities[el.dataset.rrAbility]=clamp(Number(el.value)||0,0,100));
 box.querySelectorAll('[data-rr-experience]').forEach(el=>r.experience[el.dataset.rrExperience]=el.value);
 rrStoreCurrentProfile();
}
function rrUpdateProfileLabels(box){const r=rrSettings();box.querySelectorAll('[data-rr-profile] option').forEach(option=>{const p=r.profiles.find(p=>p.id===option.value);if(p)option.textContent=p.name+' — '+p.level;});}
const RR_PROFILE_HYDRATE=hydrateFromSave;
hydrateFromSave=function(data,...args){const result=RR_PROFILE_HYDRATE(data,...args);const r=rrSettings();delete r.profilesVersion;rrSettings();rrStoreCurrentProfile();return result;};
const RR_PROFILE_RENDER=renderSettings;
renderSettings=function(){
 RR_PROFILE_RENDER();const box=document.querySelector('[data-ui-key="rider-realism"]');if(!box)return;
 const r=rrSettings(),identity=box.querySelector('[data-rr-identity]'),name=identity?.querySelector('input'),save=box.querySelector('[data-rr-save]'),status=box.querySelector('[data-rr-status]');
 if(name){identity.firstChild.textContent='Rider name ';name.value=rrCurrentRiderName();name.setAttribute('data-rr-name','');name.maxLength=80;name.onchange=()=>{if(!rrRenameRider(name.value)){name.value=rrCurrentRiderName();status.textContent='Use a unique, nonempty rider name.';return;}name.value=rrCurrentRiderName();rrUpdateProfileLabels(box);saveGame(false);};}
 const manager=document.createElement('section');manager.setAttribute('data-rider-profiles','');
 manager.innerHTML='<h3>Saved riders</h3><label>Current rider<select data-rr-profile>'+r.profiles.map(p=>'<option value="'+csEscape(p.id)+'" '+(p.id===r.riderId?'selected':'')+'>'+csEscape(p.name)+' — '+csEscape(p.level)+'</option>').join('')+'</select></label><label>New rider name<input data-rr-new-name maxlength="80"></label><button type="button" data-rr-create>Create rider</button><p class="small">New riders copy the current levels and abilities. Edit and save them after creating. Switching saves your current rider edits.</p>';
 box.insertBefore(manager,box.querySelector('h3'));
 const previousSave=save.onclick;save.onclick=function(...args){rrReadRiderForm(box);const result=previousSave?.apply(this,args);rrUpdateProfileLabels(box);return result;};
 manager.querySelector('[data-rr-profile]').onchange=event=>{save.onclick();if(rrSelectRider(event.target.value)){saveGame(false);renderSettings();}};
 manager.querySelector('[data-rr-create]').onclick=()=>{save.onclick();const result=rrCreateRider(manager.querySelector('[data-rr-new-name]').value);if(!result.ok){status.textContent=result.message;return;}saveGame(false);renderSettings();};
};
