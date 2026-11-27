/* Pause unrelated category schedules without changing eligibility, fields or scores. */
function rankingLag113Enabled(){return app.settings?.reduceRankingLag!==false;}
function rankingLag113Own(event){return rank91Active(rank91EventSpec(event),event.at);}
careerBackgroundSchedule112=function(from,to){
 if(careerState().settings.background===false)return [];
 const reduced=rankingLag113Enabled();
 return careerSchedule(from,to,undefined,true).filter(event=>!event.sandbox&&(event.official||event.federationTrial||careerActive())&&(!reduced||rankingLag113Own(event)));
};
const LAG113_SETTINGS=renderSettings;
renderSettings=function(...args){const out=LAG113_SETTINGS(...args),panel=document.getElementById('settings');if(!panel?.appendChild)return out;
 const box=document.createElement('section');box.className='box';box.dataset.rankingLag113='true';
 box.innerHTML='<button type="button" data-reduce-lag113></button><p data-reduce-lag-status113 role="status"></p><p class="small">ON: simulate categories your riders qualify for by age, country and horse age. OFF: simulate every category. Both modes keep full-strength opponents, the same eligibility and scoring, and 50/100 NPC limits. Set your rider age and country to activate your categories. Background NPC Simulation can still pause all NPC competitions.</p>';
 const button=box.querySelector('[data-reduce-lag113]'),status=box.querySelector('[data-reduce-lag-status113]');
 const update=()=>{const enabled=rankingLag113Enabled();button.textContent='Reduce Lag: '+(enabled?'ON':'OFF');button.setAttribute('aria-pressed',String(enabled));status.textContent=enabled?'Only your eligible categories progress. Other categories are paused.':'All categories progress. Time skips may take longer.';if(careerState().settings.background===false)status.textContent+=' Background NPC Simulation is currently paused.';};
 button.onclick=()=>{app.settings.reduceRankingLag=!rankingLag113Enabled();saveGame(false);update();};update();panel.appendChild(box);return out;
};
const LAG113_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){const out=LAG113_LOAD(data,...args);app.settings.reduceRankingLag=data?.settings?.reduceRankingLag!==false;return out;};
