/* Ordinary development classes explicitly permit some riders to bring a second mount. */
for(const row of CAREER_SERIES)if(!row.team&&!row.games&&!row.allocated&&!row.major&&!row.final&&(row.id.startsWith('division-circuit-')||row.developmentHeight))row.maxHorsesPerRider ??= 2;
function skipCompetitionTravel86(){return app.settings?.skipCompetitionTravel86===true;}
function setSkipCompetitionTravel86(on){app.settings.skipCompetitionTravel86=!!on;saveGame(false);return app.settings.skipCompetitionTravel86;}
function startAtArena86(show){if(!show||['ride','results','awaiting-results','jump-off-ready','complete'].includes(show.stage))return show;show.skipTravel86=true;app.showReservations=(app.showReservations||[]).filter(r=>r.showId!==show.id);show.originalHome86 ??= show.home;show.home=true;show.stage='preparation';show.travelFatigue=0;show.clock=Math.max(show.clock,show.classTime-.5);show.travelRegionLabel86='Travel skipped';
 try{showTravelChoice(show,'ready');}catch(error){show.feedback=error.message;}return show;
}
const OPTIONS86_CREATE=showCreate;
showCreate=function(...args){const show=OPTIONS86_CREATE(...args);if(skipCompetitionTravel86())startAtArena86(show);return show;};
const OPTIONS86_FEE=showTransportFee;
showTransportFee=function(event){return skipCompetitionTravel86()?0:OPTIONS86_FEE(event);};
const OPTIONS86_SHOWS=renderShows;
renderShows=function(...args){const result=OPTIONS86_SHOWS(...args),panel=document.getElementById('shows');if(panel){const button=document.createElement('button');button.type='button';button.setAttribute('data-skip-travel86','');button.textContent='Skip Competition Travel: '+(skipCompetitionTravel86()?'ON':'OFF');button.onclick=()=>{const on=setSkipCompetitionTravel86(!skipCompetitionTravel86());if(on&&app.activeShow)startAtArena86(app.activeShow);renderShows();};panel.prepend(button);}return result;};
const OPTIONS86_SETTINGS=renderSettings;
renderSettings=function(...args){const result=OPTIONS86_SETTINGS(...args),panel=document.getElementById('settings');if(panel){const label=document.createElement('label');label.innerHTML='<input type="checkbox" data-skip-travel86-setting'+(skipCompetitionTravel86()?' checked':'')+'> Skip Competition Travel — start at the arena';label.querySelector('input').onchange=e=>setSkipCompetitionTravel86(e.target.checked);panel.appendChild(label);}return result;};
const OPTIONS86_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){const result=OPTIONS86_LOAD(data,...args);app.settings.skipCompetitionTravel86=data.settings?.skipCompetitionTravel86===true;return result;};
function showBookingLeadHours86(event){if(skipCompetitionTravel86())return 0;const home=event.barnId===app.currentBarn?.id,hours=showRoute86({id:event.id||'booking',home,eventSnapshot:event}).hours;return hours+(hours>5?26:1);}
