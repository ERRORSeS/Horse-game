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
  const archivedByEvent = new Map([...rows.values()].filter(row=>row.eventId).map(row=>[row.eventId,row]));
  for (const meet of Object.values(app.career?.meets || {})) {
    const player=meet.results.find(row=>row.player);
    if (!player) continue;
    const archive=rows.get(player.entryId || meet.id) || archivedByEvent.get(meet.id);
    const id=archive?.id || player.entryId || meet.id;
    const row=showHistoryResult(meet,player);
    rows.set(id,{...archive,...row,id,eventId:archive?.eventId || meet.id,starters:meet.starters ?? meet.results.length});
    eventIds.add(meet.id);
  }
  for (const pending of pendingShowParticipation()) if (!rows.has(pending.id)) rows.set(pending.id,pending);
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
  const rows=Object.entries(app.career?.showRecords?.riderPoints || {}).filter(([,row])=>row.riderId===riderId)
    .map(([entryId,row])=>({...row,entryId}));
  const history=careerResults({riderId}).filter(row=>row.player);
  const credits=new Map(rows.map(row=>[row.entryId,row.points]).filter(([id])=>id));
  for (const row of history) if (Number.isFinite(row.showPoints)) credits.set(row.entryId || row.eventId,row.showPoints);
  return {starts:history.length, points:[...credits.values()].reduce((sum,points)=>sum+points,0),
    wins:history.filter(row=>row.placing===1).length, majors:history.filter(row=>row.placing===1 && row.major).length};
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
  results[show.id]={id:show.id,eventId:show.eventId,name:show.name,hour:event?.at ?? show.classTime ?? show.clock,
    discipline:show.discipline,level:show.level,horseName:player.horseName || player.name,riderName,
    placing:player.rank || null,eliminated:!!player.eliminated,score:Number.isFinite(player.total) ? player.total : null,
    starters:show.finalStandings.length,
    custom:!!event?.customShowId,customId:event?.customShowId,sandbox:!!event?.sandbox};
  return true;
}
const RECORDS_PERSIST_SHOW=showPersistResults;
showPersistResults=function(show) {
  const result=RECORDS_PERSIST_SHOW(show);
  const player=show.finalStandings?.find(row=>row.player);
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

function showHistoryResult(meet,row) {
  const savedPoints = app.career?.showRecords?.riderPoints;
  const showPoints = row.showPoints ?? savedPoints?.[row.entryId || meet.id]?.points ??
    savedPoints?.[meet.id+':player']?.points;
  const credits = careerPointCredits(meet,row);
  const squad = meet.ranking==='team' && row.started!==false && meet.teams?.find(team=>team.country===row.country);
  if (squad?.points) credits.push({type:'team',filter:meet.series,id:squad.country,points:squad.points,seasonal:true});
  return {...row, id:row.entryId || meet.id,eventId:meet.id,name:meet.name,hour:meet.at ?? meet.hour,
    discipline:meet.discipline,level:meet.level,division:meet.division,custom:meet.custom,customId:meet.customId,
    classId:meet.classId,official:meet.official,tier:meet.tier,prestige:meet.prestige,sandbox:meet.sandbox,
    status:row.status || (row.placing ? 'Completed' : row.eliminated ? 'Eliminated' : 'Unclassified'),
    showPoints,credits,unattributedPoints:row.points && !credits.length ? row.points : 0};
}

function activeShowParticipation() {
  const show=app.activeShow, event=show?.eventSnapshot;
  if (!(event?.customShowId || event?.userHosted) || show.finalStandings || careerState().meets[careerShowClass(show).id]) return null;
  const player=show.competitors.find(row=>row.player);
  const session=show.rpg;
  const started=Object.keys(player?.scores || {}).length ||
    session?.choiceRecords?.some(record=>session.steps[record.step]?.stage==='main_round');
  return showHistoryResult({...careerShowClass(show),custom:true,customId:event.customShowId},{
    entryId:show.id,riderId:show.profileRiderId || show.careerRider?.id,riderName:show.careerRider?.name,
    horseId:show.horseId,horseName:player?.horseName || player?.name,status:started ? 'Started' : 'Entered'
  });
}

const RECORDS_LEAVE_SHOW=showLeaveBeforeWarmup;
showLeaveBeforeWarmup=function(show) {
  const result=RECORDS_LEAVE_SHOW(show);
  if (!result) return result;
  const event=careerShowClass(show), player=show.competitors.find(row=>row.player);
  const rider=careerBookedRider(show,player);
  if (!rider) return result;
  const status=show.eventSnapshot?.careerEvent && pastureCalendarHour()>careerEventEnd(event) ? 'Did Not Start' : 'Withdrawn';
  careerRecordMeet(event,[{...player,entryId:show.id,status,started:false}],rider);
  saveGame(false);
  return result;
};

function riderShowPointsMarkup(rider,discipline='jumping') {
  const {starts,points,wins,majors}=riderShowPointSummary(rider.id);
  return `<section class="box rider-show-profile"><p class="shop-eyebrow">Rider profile · Competition record</p>
    <h3>${csEscape(rider.name)}</h3><dl>
      <div><dt>Show Points</dt><dd>${points}</dd></div><div><dt>Career Starts</dt><dd>${starts}</dd></div>
      <div><dt>Wins</dt><dd>${wins}</dd></div><div><dt>Major Victories</dt><dd>${majors}</dd></div></dl>
    ${careerRiderRankingMarkup(rider,discipline)}</section>`;
}
const RECORDS_RENDER_SETTINGS=renderSettings;
renderSettings=function(...args) {
  const result=RECORDS_RENDER_SETTINGS(...args);
  const manager=document.querySelector('[data-rider-profiles]');
  if (manager?.insertAdjacentHTML) manager.insertAdjacentHTML('afterbegin',riderShowPointsMarkup(careerRider(),careerSelection().discipline)+riderParticipationMarkup(careerRider()));
  return result;
};

function showHistoryMarkup(rows) {
  const custom=Object.values(app.career?.customShows?.shows || {});
  return `<div class="sales-shop-body">
    <p class="small">Removing a result clears its calendar and show-history display. Earned points, prizes, and official records remain recorded.</p>
    <div class="cards sales-listings">${rows.map(row=>`<article class="box sales-horse-card">
      <p class="shop-eyebrow">${row.custom || row.legacyCustom ? 'Player-created show' : 'Competition record'}</p>
      <h3>${csEscape(row.name)}</h3><p>${row.hour!=null ? csEscape(pastureDateLabel(row.hour)) : csEscape(row.date || 'Past show')}</p>
      <div class="career-chips"><span>${csEscape(row.status || (row.eliminated ? 'Eliminated' : 'Unclassified'))}
        ${row.placing ? ' · #' + row.placing + (row.starters ? ' of '+row.starters : '') : ''}</span>
        ${row.sandbox ? '<span>Sandbox · Unofficial</span>' : row.official===true ? '<span>Official</span>' : row.official===false ? '<span>Unofficial</span>' : ''}</div>
      ${row.discipline ? `<p>${csEscape(CAREER_DISCIPLINE_LABELS[row.discipline] || row.discipline)} · ${csEscape(row.level || '')}
        ${row.division ? ' · '+csEscape(CAREER_AGE_DIVISIONS[row.division]?.label || row.division) : ''}</p>` : ''}
      ${showPointsBreakdown(row)}
      ${row.horseName ? `<p>${csEscape(row.horseName)}${row.riderName ? ' / '+csEscape(row.riderName) : ''}</p>` : ''}
      ${row.resultText ? `<p>${csEscape(row.resultText)}</p>` : Number.isFinite(row.score) ? `<p>Score ${row.score}</p>` : ''}
      ${['Entered','Started'].includes(row.status) ? '' : `<button type="button" data-history-remove="${csEscape(row.id)}">Remove from history</button>`}
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

function recoverCareerShowHistory() {
  const profiles=rrSettings().profiles;
  const profileById=new Map(profiles.map(profile=>[profile.id,profile]));
  const world=careerState();
  let repaired=false;
  for (const show of [...(app.showHistory || []),app.activeShow].filter(Boolean)) {
    const player=show.finalStandings?.find(row=>row.player) || (show.withdrawnBeforeWarmup ? show.competitors?.find(row=>row.player) : null);
    if (!player) continue;
    const rider=careerBookedRider(show,player);
    const hour=show.eventSnapshot?.at ?? show.classTime ?? show.clock;
    if (!rider || !Number.isFinite(hour)) continue;
    const event=careerShowClass({...show,classTime:hour});
    const existing=world.meets[event.id]?.results.find(row=>row.player);
    if (existing) {
      if (!existing.riderId || existing.riderId==='player-rider') {
        existing.riderId=rider.id;
        existing.riderName=rider.name;
        existing.country ||= rider.country;
        repaired=true;
      }
      existing.entryId ||= show.id;
      existing.horseId ||= player.horseId || show.horseId;
      const savedPoints=world.showRecords?.results?.[show.id]?.rankPoints;
      if (existing.points==null && event.official && savedPoints>0) {
        existing.points=savedPoints;
        repaired=true;
      }
      continue;
    }
    if (world.meets[event.id]) continue;
    const standings=show.finalStandings?.length ? careerShowStandings(show) :
      [{...player,entryId:show.id,status:'Withdrawn',started:false}];
    const meet=careerRecordMeet(event,standings,rider,{recovery:true,ranked:false});
    const savedPoints=world.showRecords?.results?.[show.id]?.rankPoints;
    if (event.official && savedPoints>0) {
      meet.results.find(row=>row.player).points=savedPoints;
      repaired=true;
    }
  }
  for (const saved of Object.values(world.customShows?.results || {})) {
    if (world.meets[saved.id] || !saved.standings?.length) continue;
    const definition=world.customShows.shows?.[saved.showId], booking=definition?.registrations?.[saved.id];
    const profile=profileById.get(booking?.riderId);
    const event=calendarFindEvent(saved.id);
    if (!event?.careerEvent || !booking || !profile) continue;
    const standings=saved.standings.map(row=>({...row,rank:row.placing,total:row.score,
      player:row.riderId===booking.riderId && row.horseId===booking.horseId,
      status:row.placing ? 'Completed' : row.score!=null ? 'Eliminated' : 'Did Not Start'}));
    const player=standings.find(row=>row.player);
    if (!player) continue;
    player.entryId=booking.showId;
    const meet=careerRecordMeet(event,standings,{id:profile.id,name:profile.name,country:profile.career?.country},
      {recovery:true,ranked:false});
    const savedPoints=world.showRecords?.results?.[booking.showId]?.rankPoints;
    if (event.official && savedPoints>0) {
      meet.results.find(row=>row.player).points=savedPoints;
      repaired=true;
    }
  }
  if (repaired && world.rankingHour && world.recordVersion===84) careerPublish(world.rankingHour,{repair:true});
}

function repairCareerStandings() {
  const world=app.career;
  if (!world || world.recordVersion===84) return;
  for (const meet of Object.values(world.meets)) {
    const event=/^career:\d+:custom-\d+-\d+$/.test(meet.id || '') && calendarFindEvent(meet.id);
    if (!event?.customShowId) continue;
    Object.assign(meet,{custom:true,customId:event.customShowId,classId:event.classId,official:event.official,
      sandbox:event.sandbox,at:event.at});
  }
  world.openingHistory=true;
  world.recordVersion=84;
  if (world.rankingHour) careerPublish(world.rankingHour,{repair:true});
}
const RECORDS_LOAD=hydrateFromSave;
hydrateFromSave=function(...args) {
  const result=RECORDS_LOAD(...args);
  if ((app.career && app.career.recordVersion!==84) || app.showHistory?.length || app.activeShow?.finalStandings) {
    recoverCareerShowHistory();
  }
  repairCareerStandings();
  return result;
};

function careerCreditLabel(credit,discipline) {
  const category=String(credit.filter ?? '').split('|')[0];
  const division=CAREER_AGE_DIVISIONS[category]?.label || category;
  const sport=CAREER_DISCIPLINE_LABELS[discipline] || discipline;
  const country=code=>CAREER_COUNTRIES[code]?.[0] || code;
  switch (credit.type) {
    case 'world': return 'World '+sport;
    case 'national': return country(credit.filter)+' National '+sport;
    case 'division': return division+' '+sport;
    case 'youth-national': return division+' National '+sport+' · '+country(credit.filter.split('|')[1]);
    case 'youth-international': return division+' International '+sport;
    case 'tour': case 'team': return CAREER_SERIES_LABELS.get(credit.filter) || credit.filter;
    case 'horse': return (credit.filter==='pony' ? 'Pony' : 'World Horse')+' '+sport;
    case 'combination': return 'World Combination '+sport;
    case 'young-horse': return credit.filter+'-Year-Old '+sport;
    default: return sport;
  }
}

function showPointsBreakdown(row) {
  if (['Entered','Started','Withdrawn','Did Not Start'].includes(row.status)) return '';
  const credits=row.credits || [];
  const points=credits.map(credit=> '+'+credit.points+' '+careerCreditLabel(credit,row.discipline)+
    (credit.type==='team' ? ' Team Series Points' : credit.type==='tour' ? ' Series Points' : ' Ranking Points'));
  if (row.showPoints!=null) points.unshift((row.showPoints ? '+' : '')+row.showPoints+' Show Points');
  if (row.unattributedPoints || !row.credits && row.rankPoints) {
    points.push((row.unattributedPoints || row.rankPoints)+' saved points · destination unavailable');
  }
  if (row.sandbox) points.push('Unofficial · 0 Ranking Points');
  else if (row.showPoints!=null && !credits.length && !row.unattributedPoints) points.push('0 Ranking Points');
  return points.length ? '<ul class="career-point-breakdown">'+points.map(label=>'<li>'+csEscape(label)+'</li>').join('')+'</ul>' : '';
}

function careerParticipationRows({riderId,horseId,discipline}={}) {
  const rows=[];
  for (const pending of pendingShowParticipation()) {
    if ((!riderId || pending.riderId===riderId) && (!horseId || pending.horseId===horseId) &&
        (!discipline || pending.discipline===discipline)) rows.push(pending);
  }
  for (const meet of Object.values(app.career?.meets || {})) {
    if (discipline && meet.discipline!==discipline) continue;
    for (const row of meet.results) {
      if (!row.player || riderId && row.riderId!==riderId || horseId && row.horseId!==horseId) continue;
      rows.push(showHistoryResult(meet,row));
    }
  }
  return rows.sort((a,b)=>b.hour-a.hour);
}

function showParticipationLine(row) {
  return `<article class="career-result-line">
    <strong>${csEscape(row.name)}</strong>
    <p class="small">${csEscape(pastureDateLabel(row.hour))} · ${csEscape(CAREER_DISCIPLINE_LABELS[row.discipline])}
    ${csEscape(row.level || '')} · ${csEscape(row.status)}${row.placing ? ' · #'+row.placing : ''}
    ${row.medal ? ' · '+csEscape(row.medal) : ''}</p>
    <p class="small">${csEscape(row.riderName)} / ${csEscape(row.horseName)}
    ${Number.isFinite(row.score) ? ' · '+(['jumping','eventing'].includes(row.discipline) ? 'Penalties ' : 'Score ')+row.score : ''}
    ${row.official ? ' · Official' : row.sandbox ? ' · Sandbox' : ''}</p>${showPointsBreakdown(row)}</article>`;
}

function riderParticipationMarkup(rider,discipline) {
  const rows=careerParticipationRows({riderId:rider.id,discipline});
  const format=results=>results.slice(0,24).map(showParticipationLine).join('') || '<p>No recorded participation.</p>';
  const sandbox=rows.filter(row=>row.sandbox);
  return `<details class="shop-drawer"><summary>Competition history and points</summary><div class="shop-drawer-body">
    ${format(rows.filter(row=>!row.sandbox))}
    ${sandbox.length ? '<details><summary>Sandbox participation ('+sandbox.length+')</summary>'+format(sandbox)+'</details>' : ''}
    </div></details>`;
}

function careerProfileDivisions(rider) {
  const hasPony=app.horses.some(horse=>!horse.deceased && !horse.retiredForever &&
    careerHeightCm(horse)-Number(horse.measuredWithShoes===true)<=148);
  return careerDivisions(rider).filter(key=>key!=='pony' || hasPony);
}

function careerRiderRankingMarkup(rider,discipline) {
  discipline=CAREER_DISCIPLINE_LABELS[discipline] ? discipline : 'jumping';
  const world=careerState(), eligible=careerProfileDivisions(rider), now=pastureCalendarHour();
  const history=careerResults({riderId:rider.id,discipline}).filter(row=>row.player && row.placing)
    .sort((a,b)=>b.hour-a.hour);
  const selected=eligible.includes(rider.activeDivision) ? rider.activeDivision :
    history.find(row=>eligible.includes(row.division) && (row.tier>0 || row.points || row.custom))?.division || eligible[0] || 'senior';
  const descriptors=new Map();
  function add(type,filter='',section='additional') {
    const key=careerBoardKey(type,discipline,filter);
    if (!descriptors.has(key)) descriptors.set(key,{key,type,filter,section,pending:0,earned:false});
    return descriptors.get(key);
  }
  function divisionBoards(division,section) {
    if (division==='senior') {
      add('national',rider.country,section);
      return;
    }
    add('division',division,section);
    add('youth-national',division+'|'+rider.country,section);
    add('youth-international',division,section);
  }
  divisionBoards(selected,'current');
  add('world','','current');
  for (const division of eligible) if (division!==selected) divisionBoards(division,'additional');
  for (const row of history) {
    const meet=world.meets[row.eventId];
    for (const credit of showHistoryResult(meet,row).credits) {
      if (['horse','young-horse','combination'].includes(credit.type)) continue;
      const board=add(credit.type,credit.filter,['tour','team'].includes(credit.type) ? 'series' : 'additional');
      board.rankedId=credit.id;
      board.earned=true;
      const year=pastureDate(now).year;
      if (meet.hour>=(world.rankingHour ?? now-CAREER_HOURS_PER_YEAR) &&
          (!credit.seasonal || pastureDate(meet.hour).year>=year)) board.pending+=credit.points;
    }
  }
  function boardRows(section) {
    return [...descriptors.values()].filter(board=>board.section===section).map(board=>{
      const rank=world.rankings[board.key]?.find(row=>row.id===(board.rankedId || rider.id));
      const best=world.rankHistory[board.key]?.[board.rankedId || rider.id]?.best;
      const reason=board.pending ? board.pending+' points pending the next ranking release' :
        board.earned || best ? 'no points in the current ranking period' : 'no eligible points recorded';
      return `<div class="shop-cart-line career-profile-ranking"><strong>${csEscape(careerCreditLabel(board,discipline))}</strong>
        <span>${rank ? '#'+rank.rank+' · '+rank.points+' points' : 'Unranked · 0 published points'}${best ? ' · Career high #'+best : ''}</span>
        ${!rank || board.pending ? '<small>'+csEscape(reason)+'</small>' : ''}</div>`;
    }).join('');
  }
  const extra=boardRows('additional'),series=boardRows('series');
  return `<p class="shop-eyebrow">Active division · ${csEscape(CAREER_AGE_DIVISIONS[selected].label)}</p>
    <h4>Current Rankings</h4>${boardRows('current')}
    ${extra ? '<details class="shop-drawer"><summary>Additional Rankings</summary><div class="shop-drawer-body">'+extra+'</div></details>' : ''}
    <details class="shop-drawer"><summary>Championship and Series Standings</summary><div class="shop-drawer-body">
      ${series || '<p>No eligible series points recorded.</p>'}</div></details>`;
}

// Earlier calendar-hosted classes still use their established rules and payouts.
const RECORDS_ATTACH_ENTRY=calendarAttachEntry;
calendarAttachEntry=function(entry,event) {
  const result=RECORDS_ATTACH_ENTRY(entry,event);
  if (event.userHosted && !event.careerEvent && entry.discipline) {
    const booking=event.registeredEntries.find(row=>row.entryId===entry.id);
    const rider=entry.careerRider ||= careerRider();
    if (booking) booking.careerRider ||= rider;
  }
  return result;
};

function legacyCustomClass(event,entry) {
  return careerShowClass({id:entry.id,eventSnapshot:event,classTime:event.at,name:calendarEventName(event),
    discipline:event.discipline,level:event.level,venue:event.barnName});
}
function pendingShowParticipation() {
  const active=activeShowParticipation(), rows=active ? [active] : [];
  for (const horse of app.horses) for (const entry of horse.pendingCompetitions || []) {
    if (!entry.careerRider || app.career?.meets[entry.id]) continue;
    const event=calendarFindEvent(entry.eventId);
    if (!event?.userHosted || event.careerEvent) continue;
    const wall=event.puissance?.states[entry.id];
    rows.push({...showHistoryResult(legacyCustomClass(event,entry),{entryId:entry.id,riderId:entry.careerRider.id,
      riderName:entry.careerRider.name,horseId:horse.id,horseName:horse.name,status:wall?.attempts?.length ? 'Started' : 'Entered'}),
      eventId:event.id});
  }
  return rows;
}
function recordLegacyCustomResult(event,entry,horse,result) {
  if (!event?.userHosted || event.careerEvent || !entry.careerRider || !result) return;
  const status=result.placing ? 'Completed' : result.status==='DQ' ? 'Did Not Start' : 'Eliminated';
  careerRecordMeet(legacyCustomClass(event,entry),[{player:true,entryId:entry.id,horseId:horse.id,
    horseName:horse.name,rank:result.placing,total:result.score,status,started:status!=='Did Not Start'}],
    entry.careerRider,{ranked:false});
}
const RECORDS_WALL_FINISH=calendarFinishWall;
calendarFinishWall=function(event) {
  const result=RECORDS_WALL_FINISH(event);
  if (event.userHosted) for (const row of event.puissance?.entryOrder || []) {
    const horse=calendarHorseById(row.horseId);
    const entry=horse?.pendingCompetitions?.find(entry=>entry.id===row.entryId);
    if (entry) recordLegacyCustomResult(event,entry,horse,event.puissance.results[row.entryId]);
  }
  return result;
};
const RECORDS_LEGACY_RESULT=calculateCompetitionResult;
calculateCompetitionResult=function(horse,discipline,level,interaction,entry) {
  const result=RECORDS_LEGACY_RESULT(horse,discipline,level,interaction,entry);
  if (entry?.careerRider) recordLegacyCustomResult(calendarFindEvent(entry.eventId),entry,horse,result);
  return result;
};
