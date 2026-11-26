/* Relative competition fault chances; training, skills and awarded penalty values are unchanged. */
const COMPETITION_DIFFICULTY108={easy:.65,normal:1,hard:1.30};
function competitionFaultMode108(){const mode=app.settings?.competitionFaultDifficulty;return Object.hasOwn(COMPETITION_DIFFICULTY108,mode)?mode:'normal';}
function competitionFaultFactor108(){return COMPETITION_DIFFICULTY108[competitionFaultMode108()];}
function competitionFaultChance108(chance,maximum=100){return clamp(chance*competitionFaultFactor108(),0,maximum);}
const DIFFICULTY108_EXECUTION=c7Execution;
c7Execution=function(...args){const p=DIFFICULTY108_EXECUTION(...args);return competitionFaultFactor108()===1?p:{...p,chance:competitionFaultChance108(p.chance)};};
const DIFFICULTY108_POLE=c7PoleRisk;
c7PoleRisk=function(...args){const p=DIFFICULTY108_POLE(...args);return competitionFaultFactor108()===1||p.legacy?p:{...p,chance:competitionFaultChance108(p.chance,1)};};
const DIFFICULTY108_REFUSAL=fenceAvoidanceProfile;
fenceAvoidanceProfile=function(h,s={}){const p=DIFFICULTY108_REFUSAL(h,s);if(competitionFaultFactor108()===1||!(s.refusalContext==='competition'||s.liveShowId||s.steps))return p;return {...p,unscaledChance108:p.chance,chance:competitionFaultChance108(p.chance,99)};};
const DIFFICULTY108_LEGACY_PROFILE=ShowjumpingRound.profile;
ShowjumpingRound.profile=function(...args){const p=DIFFICULTY108_LEGACY_PROFILE(...args);return competitionFaultFactor108()===1?p:{...p,chance:competitionFaultChance108(p.chance,1)};};
const DIFFICULTY108_SETTINGS=renderSettings;
renderSettings=function(...args){const out=DIFFICULTY108_SETTINGS(...args),panel=document.getElementById('settings');if(!panel?.appendChild)return out;
 const box=document.createElement('details');box.className='box';box.dataset.uiKey='competition-difficulty108';box.innerHTML='<summary>Competition difficulty</summary><label>Fault chances<select data-competition-difficulty108 data-authoritative-selection="true"><option value="easy">Easy — 35% lower fault chances</option><option value="normal">Normal — current chances</option><option value="hard">Hard — 30% higher fault chances</option></select></label><p class="small">Changes the chance of rails, refusals and technical mistakes for all competition combinations. Faults remain possible on Easy. Existing results, horse skills and the points charged per fault stay the same.</p><p role="status" data-competition-difficulty-status108></p>';panel.appendChild(box);
 const select=box.querySelector('[data-competition-difficulty108]');select.value=competitionFaultMode108();select.onchange=()=>{app.settings.competitionFaultDifficulty=select.value;saveGame(false);box.querySelector('[data-competition-difficulty-status108]').textContent='Competition difficulty saved: '+cap(select.value)+'.';};return out;};
const DIFFICULTY108_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){const out=DIFFICULTY108_LOAD(data,...args),mode=data?.settings?.competitionFaultDifficulty;app.settings.competitionFaultDifficulty=Object.hasOwn(COMPETITION_DIFFICULTY108,mode)?mode:'normal';return out;};
