function showRecordsState() {
  return careerState().showRecords ||= { hidden:{}, riderPoints:{}, results:{} };
}

function showHistoryRows() {
  const rows = new Map();
  const custom = app.career?.customShows;
  const eventIds = new Set();
  const hidden = app.career?.showRecords?.hidden || {};
  for (const result of Object.values(app.career?.showRecords?.results || {})) {
    rows.set(result.id,result);
    if (result.eventId) eventIds.add(result.eventId);
  }
  for (const show of app.showHistory || []) {
    if (rows.has(show.id)) continue;
    if (!show.finalStandings?.length && !show.withdrawnBeforeWarmup) continue;
    if (show.eventId) eventIds.add(show.eventId);
    rows.set(show.id, { id:show.id,eventId:show.eventId,name:show.name,
      hour:show.eventSnapshot?.at ?? show.classTime ?? show.clock,custom:!!show.eventSnapshot?.customShowId,
      customId:show.eventSnapshot?.customShowId });
  }
  for (const meet of Object.values(app.career?.meets || {})) {
    if (!meet.results.some(row=>row.player) || eventIds.has(meet.id) || rows.has(meet.id)) continue;
    eventIds.add(meet.id);
    const player=meet.results.find(row=>row.player);
    rows.set(meet.id,{id:meet.id,eventId:meet.id,name:meet.name,hour:meet.hour,discipline:meet.discipline,
      level:meet.level,horseName:player.horseName,riderName:player.riderName,placing:player.placing,eliminated:player.eliminated,
      starters:meet.results.length,score:player.score,rankPoints:player.points});
  }
  for (const event of mgState().calendarShows || []) {
    if (!['Expired','Completed','No valid classified results'].includes(event.status) || rows.has(event.id)) continue;
    if (eventIds.has(event.id)) continue;
    eventIds.add(event.id);
    rows.set(event.id,{id:event.id,eventId:event.id,name:event.name,hour:event.at,legacyCustom:!!event.userHosted});
  }
  for (const horse of app.horses) for (const result of horse.showResults || []) {
    if (!result.entryId || rows.has(result.entryId) || result.eventId && eventIds.has(result.eventId)) continue;
    rows.set(result.entryId,{id:result.entryId,eventId:result.eventId,name:result.eventName || cap(result.discipline || 'show')+' '+(result.level || ''),
      date:result.date,discipline:result.discipline,level:result.level,horseName:horse.name,placing:result.placing,
      eliminated:result.status==='ELIMINATED',resultText:result.resultText,score:result.score});
    if (result.eventId) eventIds.add(result.eventId);
  }
  for (const result of Object.values(custom?.results || {})) {
    if (eventIds.has(result.id)) continue;
    const definition=custom.shows[result.showId], date=result.date;
    rows.set(result.id,{id:result.id,eventId:result.id,name:definition?.name || 'Custom show',
      hour:pastureCalendarHour(date.year,date.month,date.day,12),custom:true,customId:result.showId});
  }
  return [...rows.values()].filter(row=>!hidden[row.id] && !hidden[row.eventId] && !hidden[row.customId])
    .sort((a,b)=>(b.hour || 0)-(a.hour || 0) || a.id.localeCompare(b.id));
}

function removeShowFromHistory(row) {
  if (!row || app.activeShow && (row.id===app.activeShow.id || row.eventId && row.eventId===app.activeShow.eventId)) return false;
  const hidden=showRecordsState().hidden;
  hidden[row.id]=true;
  if (row.eventId) hidden[row.eventId]=true;
  delete showRecordsState().results?.[row.id];
  app.showHistory=(app.showHistory || []).filter(show=>show.id!==row.id && (!row.eventId || show.eventId!==row.eventId));
  app.competitionReports=(app.competitionReports || []).filter(report=>report.id!==row.id);
  if (row.custom && row.eventId && app.career?.customShows) delete app.career.customShows.results[row.eventId];
  const legacy=(mgState().calendarShows || []).find(event=>event.id===row.eventId);
  if (legacy?.userHosted && ![...app.horses,...Object.values(app.lessonHorsesByBarn || {}).flat()]
    .some(horse=>horse.pendingCompetitions?.some(entry=>entry.eventId===legacy.id))) {
    mgState().calendarShows=mgState().calendarShows.filter(event=>event.id!==legacy.id);
    delete mgState().calendarEventRegistry?.[legacy.id];
  }
  return true;
}

function deleteCustomShow(showId) {
  const state=app.career?.customShows;
  if (!state?.shows[showId] || app.activeShow?.eventSnapshot?.customShowId===showId) return false;
  const registrations=state.shows[showId].registrations;
  for (const [id,entry] of Object.entries(registrations)) {
    removeShowFromHistory({id:entry.showId,eventId:id,custom:true});
    delete mgState().calendarEventRegistry?.[id];
  }
  for (const result of Object.values(state.results)) if (result.showId===showId) delete state.results[result.id];
  delete state.shows[showId];
  showRecordsState().hidden[showId]=true;
  return true;
}

function riderShowPointSummary(riderId) {
  const rows=Object.values(app.career?.showRecords?.riderPoints || {}).filter(row=>row.riderId===riderId);
  const history=careerResults({riderId}).filter(row=>row.player);
  return { starts:history.length, points:rows.reduce((sum,row)=>sum+row.points,0),
    wins:history.filter(row=>row.placing===1).length, last:rows.at(-1) };
}

const RECORDS_CREATE_SHOW=showCreate;
showCreate=function(...args) {
  const show=RECORDS_CREATE_SHOW(...args);
  show.profileRiderId=show.careerRider?.id || rrSettings().riderId;
  return show;
};
function archiveFinalShow(show,player) {
  const state=showRecordsState(), event=show.eventSnapshot;
  if (state.hidden[show.id] || event?.id && state.hidden[event.id]) return false;
  const results=state.results ||= {};
  if (results[show.id]) return false;
  const riderId=show.profileRiderId || show.careerRider?.id;
  const riderName=show.careerRider?.name || rrSettings().profiles.find(profile=>profile.id===riderId)?.name || player.riderName;
  const meet=app.career?.meets[event?.careerEvent ? show.eventId : show.id];
  results[show.id]={id:show.id,eventId:show.eventId,name:show.name,hour:event?.at ?? show.classTime ?? show.clock,
    discipline:show.discipline,level:show.level,horseName:player.horseName || player.name,riderName,
    placing:player.rank || null,eliminated:!!player.eliminated,score:Number.isFinite(player.total) ? player.total : null,
    starters:show.finalStandings.length,rankPoints:meet?.results.find(row=>row.player)?.points || 0,
    custom:!!event?.customShowId,customId:event?.customShowId,sandbox:!!event?.sandbox};
  return true;
}
const RECORDS_PERSIST_SHOW=showPersistResults;
showPersistResults=function(show) {
  const result=RECORDS_PERSIST_SHOW(show);
  const riderId=show.profileRiderId || show.careerRider?.id;
  const player=show.finalStandings?.find(row=>row.player);
  if (riderId && player && !show.eventSnapshot?.sandbox) {
    const placing=player.rank || null;
    showRecordsState().riderPoints[show.id] ||= { riderId,name:show.name,placing,points:placing ? Math.max(0,30-placing) : 0 };
  }
  if (player && archiveFinalShow(show,player)) {
    if (!show.eventSnapshot?.sandbox && !app.competitionReports.some(report=>report.id===show.id)) {
      const horse=showHorse(show);
      pushCompetitionReport({id:show.id,date:dateLabel(),discipline:show.discipline,level:show.level,
        competitionName:show.name,horseName:player.horseName || player.name,horseBreed:horse?.breed || '',
        placing:player.rank,fieldSize:show.finalStandings.length,
        highlights:[player.rank ? 'Final placing #'+player.rank : player.eliminated ? 'Eliminated' : 'Unclassified'],
        comment:'Final standings recorded.',suggestion:''});
    }
    saveGame(false);
  }
  return result;
};

function riderShowPointsMarkup(rider) {
  const {starts,points,wins,last}=riderShowPointSummary(rider.id);
  return `<section class="box rider-show-profile"><p class="shop-eyebrow">Rider profile · Competition record</p>
    <h3>${csEscape(rider.name)}</h3><dl>
      <div><dt>Show points</dt><dd>${points}</dd></div><div><dt>Starts</dt><dd>${starts}</dd></div>
      <div><dt>Wins</dt><dd>${wins}</dd></div></dl>
    <p class="small">${last ? csEscape(last.name) + ' · +' + last.points + ' pts' : 'Points appear after your first completed show.'}
    · Separate from ranking points.</p></section>`;
}
const RECORDS_RENDER_SETTINGS=renderSettings;
renderSettings=function(...args) {
  const result=RECORDS_RENDER_SETTINGS(...args);
  const manager=document.querySelector('[data-rider-profiles]');
  if (manager?.insertAdjacentHTML) manager.insertAdjacentHTML('afterbegin',riderShowPointsMarkup(careerRider()));
  return result;
};

function showHistoryMarkup(rows) {
  const custom=Object.values(app.career?.customShows?.shows || {});
  return `<div class="sales-shop-body">
    <p class="small">Removing a result clears its calendar and show-history display. Earned points, prizes, and official records remain recorded.</p>
    <div class="cards sales-listings">${rows.map(row=>`<article class="box sales-horse-card">
      <p class="shop-eyebrow">${row.custom || row.legacyCustom ? 'Player-created show' : 'Competition record'}</p>
      <h3>${csEscape(row.name)}</h3><p>${row.hour!=null ? csEscape(pastureDateLabel(row.hour)) : csEscape(row.date || 'Past show')}</p>
      <div class="career-chips"><span>${row.placing ? 'Placed #' + row.placing + (row.starters ? ' of '+row.starters : '') :
        row.eliminated ? 'Eliminated' : 'Unclassified'}</span>
        ${row.rankPoints ? '<span>'+row.rankPoints+' ranking pts</span>' : ''}${row.sandbox ? '<span>Sandbox</span>' : ''}</div>
      ${row.horseName ? `<p>${csEscape(row.horseName)}${row.riderName ? ' / '+csEscape(row.riderName) : ''}</p>` : ''}
      ${row.resultText ? `<p>${csEscape(row.resultText)}</p>` : Number.isFinite(row.score) ? `<p>Score ${row.score}</p>` : ''}
      <button type="button" data-history-remove="${csEscape(row.id)}">Remove from history</button>
    </article>`).join('') || '<p class="shop-empty">No past shows in your history.</p>'}</div>
    <details class="shop-drawer"><summary>Manage custom shows</summary><div class="shop-drawer-body">
      ${custom.map(show=>`<div class="shop-cart-line"><strong>${csEscape(show.name)}</strong>
        <button type="button" data-history-delete-custom="${csEscape(show.id)}">Delete custom show</button></div>`).join('') || '<p>No custom shows created.</p>'}
    </div></details>
  </div>`;
}
function bindShowHistory(panel,rows) {
  const finish=(ok)=>{
    if (!ok) {panel.querySelector('[data-show82-message]').textContent='Finish the active show first.';return;}
    saveGame(false);renderCalendar();
  };
  for (const button of panel.querySelectorAll('[data-history-remove]')) button.onclick=()=>{
    finish(removeShowFromHistory(rows.find(row=>row.id===button.dataset.historyRemove)));
  };
  for (const button of panel.querySelectorAll('[data-history-delete-custom]')) button.onclick=()=>{
    if (window.confirm('Delete this custom show and its calendar editions? Recorded points and prizes are retained.')) {
      finish(deleteCustomShow(button.dataset.historyDeleteCustom));
    }
  };
}

// Older ordinary shows retained their final standings even when career mode was off.
function recoverCareerShowHistory() {
  const profiles=rrSettings().profiles;
  const profileById=new Map(profiles.map(profile=>[profile.id,profile]));
  for (const show of [...(app.showHistory || []),app.activeShow].filter(Boolean)) {
    const player=show.finalStandings?.find(row=>row.player);
    if (!player || show.withdrawnBeforeWarmup) continue;
    archiveFinalShow(show,player);
    if (show.eventSnapshot?.sandbox) continue;
    const riderId=show.profileRiderId || show.careerRider?.id || player.riderId ||
      (profiles.length===1 ? profiles[0].id : null);
    const profile=profileById.get(riderId);
    const rider=show.careerRider || (profile && {id:riderId,name:profile.name,country:profile.career?.country});
    if (!rider) continue;
    const hour=show.eventSnapshot?.at ?? show.classTime ?? show.clock;
    if (!Number.isFinite(hour)) continue;
    const world=careerState(), id=show.eventSnapshot?.careerEvent && show.eventId ? show.eventId : show.id;
    if (world.meets[id]) continue;
    const classification=show.eventSnapshot?.careerClassification || show.eventSnapshot || {};
    world.meets[id]={
      id,hour,name:show.name,venue:show.venue,discipline:show.discipline,level:show.level,
      tier:classification.tier || 0,prestige:classification.prestige || 0,ranking:'none',
      division:classification.division || 'senior',teams:[],
      results:[{riderId:rider.id,riderName:rider.name,country:rider.country || careerCountry(app.currentBarn?.country),
        player:true,horseId:player.horseId || show.horseId,horseName:player.horseName || player.name,
        placing:player.rank || null,score:Number.isFinite(player.total) ? player.total : null,
        eliminated:!!player.eliminated,points:0}]
    };
  }
}
const RECORDS_LOAD=hydrateFromSave;
hydrateFromSave=function(...args) {
  const result=RECORDS_LOAD(...args);
  if (app.showHistory?.length || app.activeShow?.finalStandings) recoverCareerShowHistory();
  return result;
};
