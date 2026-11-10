const SHOW82_SORTS = [
  ['date','Date · soonest'],['latest','Date · latest'],['high','Prestige · highest'],['low','Prestige · lowest'],
  ['tier','Competition tier'],['purse','Prize fund · highest'],['small-purse','Prize fund · lowest'],
  ['deadline','Entry deadline'],['region','Distance / region'],['recommended','Recommended']
];
function show82Major(event) {
  return !event.customShowId && (event.tier>=10 || event.major || event.final || event.games || event.team && event.tier>=6);
}
function show82EventList(year,month,view) {
  const from=pastureCalendarHour(year,view==='major' || view==='list' ? 1 : month,1,0);
  const to=view==='major' || view==='list' ? pastureCalendarHour(year,12,30,23) : from+CAREER_HOURS_PER_MONTH-1;
  const events=[...careerSchedule(from,to),...customShowEvents(from,to)];
  const seen=new Set(events.map(event=>event.id));
  if (view!=='major') {
    for (const event of [...(app.barnShows || []),...(app.upcomingEvents || []),...(mgState().calendarShows || [])]) {
      const at=event.at ?? pastureCalendarHour()+ (event.daysUntilStart || 0)*24;
      if (at<from || at>to || seen.has(event.id)) continue;
      seen.add(event.id);
      const classification=event.careerClassification;
      events.push({...event,at,date:pastureDate(at),name:calendarEventName(event),legacy:true,
        tier:classification?.tier ?? 0,prestige:classification?.prestige ?? 3,custom:!!event.userHosted,
        entryFee:event.entryFee ?? event.fee ?? 0});
    }
  }
  const hidden=app.career?.showRecords?.hidden || {};
  return events.filter(event=>!hidden[event.id] && (view!=='major' || show82Major(event)));
}
function show82Blocker(event,rider,horse,historyFor) {
  if (event.status==='Completed' || app.career?.meets[event.id] || app.career?.customShows?.results[event.id]) return 'Completed';
  if (event.at<pastureCalendarHour()) return 'Entries closed';
  if (app.career?.customShows?.shows[event.customShowId]?.registrations[event.id]) return 'Already entered';
  if (!horse) return 'Choose a horse.';
  if (event.legacy) return event.isUpcomingEvent && event.daysUntilStart>0 ? 'Upcoming fixture' : calendarRegistrationEligibility(horse,event);
  if (federationEnabled() && (event.team || event.games)) {
    const nomination=federationNomination(event,rider,horse);
    if (!nomination || !['Selected — National Squad','Selected — Championship Team'].includes(nomination.status)) return 'Federation nomination required.';
  }
  const earliest=event.country===app.currentBarn?.country ? 24 : 60;
  const now=pastureCalendarHour();
  if (event.at < now+earliest || event.at > now+90*24) return 'Outside the booking window.';
  const history=event.tier>=5 || event.youngFinal || event.final ? historyFor?.(event.discipline) : undefined;
  const issue=careerEligibility(event,rider,event.allocated ? null : horse,{history});
  if (issue) return issue;
  return '';
}
function show82Sort(rows,key) {
  const metrics={
    date:(a,b)=>a.event.at-b.event.at, latest:(a,b)=>b.event.at-a.event.at,
    high:(a,b)=>b.event.prestige-a.event.prestige, low:(a,b)=>a.event.prestige-b.event.prestige,
    tier:(a,b)=>b.event.tier-a.event.tier, purse:(a,b)=>(b.event.displayPrize ?? b.event.prizeMoney ?? 0)-(a.event.displayPrize ?? a.event.prizeMoney ?? 0),
    'small-purse':(a,b)=>(a.event.displayPrize ?? a.event.prizeMoney ?? 0)-(b.event.displayPrize ?? b.event.prizeMoney ?? 0),
    deadline:(a,b)=>(a.event.deadline ?? a.event.at)-(b.event.deadline ?? b.event.at),
    region:(a,b)=>Number(b.event.country===app.currentBarn?.country)-Number(a.event.country===app.currentBarn?.country) ||
      String(a.event.country || '').localeCompare(String(b.event.country || '')),
    recommended:(a,b)=>Number(!!a.blocker)-Number(!!b.blocker) || b.event.prestige-a.event.prestige
  };
  const compare=metrics[key] || metrics.date;
  return rows.slice().sort((a,b)=>compare(a,b) || a.event.at-b.event.at || a.event.id.localeCompare(b.event.id));
}
function show82Matches(event,filters) {
  if (filters.discipline && event.discipline!==filters.discipline || filters.division && event.division!==filters.division ||
    filters.tier!=='' && filters.tier!=null && event.tier!==Number(filters.tier) ||
    event.prestige<Number(filters.min || 0) || event.prestige>Number(filters.max ?? 100)) return false;
  return ({
    pony:!!event.ponyCm, young:!!event.horseAge, team:!!event.team || !!event.federationTrial,
    championship:!!event.games || event.tier===4 || event.tier===11,
    ranking:!!event.base && event.official, custom:!!event.customShowId || !!event.custom, final:!!event.final
  })[filters.kind] ?? true;
}
function show82Filter(label,key,options,value) {
  return `<label>${label}<select data-show82-filter="${key}">${careerOptions(options,value ?? '')}</select></label>`;
}
function show82Card(event,blocker) {
  return `<article class="box sales-horse-card career-event-card">
    <p class="shop-eyebrow">${CAREER_DISCIPLINE_LABELS[event.discipline]} · ${csEscape(event.level)}</p>
    <h3>${csEscape(event.name)}</h3>
    <div class="career-chips"><span>Prestige ${event.prestige}</span><span>${event.sandbox ? 'Sandbox · Unofficial' : event.customShowId ? 'Career-sanctioned · Official' : CAREER_TIERS[event.tier].label}</span>
      ${event.base ? '<span>Ranking eligible</span>' : ''}${event.team ? '<span>Team</span>' : ''}</div>
    <p>${csEscape(pastureDateLabel(event.at))} · ${csEscape(event.barnName || event.city || 'Stable arena')}${event.country ? ' · '+csEscape(event.country) : ''}</p>
    <p>Entry ${money(event.entryFee || 0)} · Purse ${money(event.displayPrize ?? event.prizeMoney ?? 0)}${event.sandbox ? ' simulated' : ''}</p>
    <p class="small">${csEscape(event.legacy ? 'Existing calendar class' : careerEventRequirements(event))}
      ${event.maximumEntries ? ' · ' + event.maximumEntries + ' maximum entries' : ''}
      ${event.customWeather ? ' · ' + csEscape(event.customWeather) : ''}</p>
    <p class="small">${csEscape(blocker || 'Eligible to enter')}</p>
    <button type="button" data-show82-enter="${csEscape(event.id)}"${blocker ? ' disabled' : ''}>Enter show</button>
  </article>`;
}
function show82RenderCalendar() {
  const panel=document.getElementById('calendar');
  const original=panel.querySelector('.career-calendar-wrap');
  original?.remove?.();
  const filters=careerSelection().show82 ||= {view:'monthly',sort:'date'};
  const view=filters.view,year=Number(filters.year) || app.year,month=Number(filters.month) || app.month;
  const rider=careerRider(), horses=competitionEligibleHorses();
  const horse=horses.find(row=>row.id===filters.horse) || horses[0];
  const fixtures=view!=='reference' && view!=='history';
  const events=fixtures ? show82EventList(year,month,view) : [];
  const history= view==='history' ? showHistoryRows() : [];
  const histories=new Map();
  const historyFor=discipline=>{
    if (!histories.has(discipline)) histories.set(discipline,careerResults({riderId:rider.id,discipline}));
    return histories.get(discipline);
  };
  const blocker=event=>show82Blocker(event,rider,horse,historyFor);
  const needsEligibility=filters.sort==='recommended' || Boolean(filters.status);
  const rows=show82Sort(events.filter(event=>show82Matches(event,filters))
    .map(event=>({event,blocker:needsEligibility ? blocker(event) : null}))
    .filter(row=>filters.status==='eligible' ? !row.blocker : filters.status==='completed' ? row.blocker==='Completed' : true),filters.sort);
  const pageSize=24, total=view==='history' ? history.length : rows.length;
  const page=Math.min(Math.max(0,Number(filters.page) || 0),Math.max(0,Math.ceil(total/pageSize)-1));
  const pageRows=rows.slice(page*pageSize,(page+1)*pageSize);
  if (!needsEligibility) for (const row of pageRows) row.blocker=blocker(row.event);
  const pageNav=total>pageSize ? `<div class="shop-meta"><span>${page*pageSize+1}–${Math.min(total,(page+1)*pageSize)} of ${total}</span>
    <button type="button" data-show82-page="${page-1}"${page===0 ? ' disabled' : ''}>Previous</button>
    <button type="button" data-show82-page="${page+1}"${(page+1)*pageSize>=total ? ' disabled' : ''}>Next</button></div>` : '';
  const section=document.createElement('section');
  section.className='tack-shop horse-sales-shop career-shell career-calendar-wrap';
  const choices=(values)=>[['','All'],...values];
  const references=MAJOR_REFERENCE_2026.filter(row=>!filters.discipline || row[4].includes(filters.discipline));
  const rendered = view==='major' ? Array.from({length:12},(_,i)=>i+1).map(m=>{
    const matches=pageRows.filter(row=>row.event.date.month===m);
    return matches.length ? `<details class="shop-drawer" open><summary>Month ${m} <span class="shop-count">${matches.length}</span></summary>
      <div class="shop-drawer-body cards sales-listings">${matches.map(row=>show82Card(row.event,row.blocker)).join('')}</div></details>` : `<details class="shop-drawer"><summary>Month ${m}</summary><div class="shop-drawer-body">No major events match.</div></details>`;
  }).join('') : `<div class="sales-shop-body cards sales-listings">${pageRows.map(row=>show82Card(row.event,row.blocker)).join('')}</div>`;
  section.innerHTML=careerHero('Show office · Season calendar','Competition calendar','Find a suitable class, follow the year’s major events, or organize a show.')+
    `<div class="shop-meta"><span>${view==='reference' ? references.length+' published references' : view==='history' ? history.length+' past shows' : rows.length+' visible classes'}</span><span>${csEscape(rider.name)}</span><span>${csEscape(pastureDateLabel(pastureCalendarHour()))}</span></div>
    <div class="sales-filter-bar career-filters">
      ${show82Filter('View','view',[['monthly','Monthly'],['list','Season list'],['major','Annual majors'],['reference','2026 reference'],['history','Show history']],view)}
      ${show82Filter('Discipline','discipline',choices(Object.entries(CAREER_DISCIPLINE_LABELS)),filters.discipline)}
      ${show82Filter('Year','year',Array.from({length:6},(_,i)=>app.year-1+i).filter(y=>y>0).map(y=>[y,'Year '+y]),year)}
      ${show82Filter('Month','month',Array.from({length:12},(_,i)=>[i+1,'Month '+(i+1)]),month)}
      ${show82Filter('Sort','sort',SHOW82_SORTS,filters.sort)}
      ${show82Filter('Tier','tier',choices(CAREER_TIERS.map((tier,i)=>[i,tier.label])),filters.tier)}
      ${show82Filter('Division','division',choices(Object.entries(CAREER_AGE_DIVISIONS).map(([key,row])=>[key,row.label])),filters.division)}
      ${show82Filter('Class type','kind',choices([['pony','Pony'],['young','Young horse'],['team','Team or trial'],['championship','Championship'],['ranking','Ranking eligible'],['custom','Custom'],['final','Series final']]),filters.kind)}
      ${show82Filter('Entry status','status',choices([['eligible','Eligible for this combination'],['completed','Completed']]),filters.status)}
      ${show82Filter('Horse','horse',horses.map(h=>[h.id,h.name]),horse?.id)}
      <label>Minimum prestige<input type="number" min="0" max="100" data-show82-filter="min" value="${Number(filters.min || 0)}"></label>
      <label>Maximum prestige<input type="number" min="0" max="100" data-show82-filter="max" value="${Number(filters.max ?? 100)}"></label>
    </div>
    <p class="shop-status" role="status" data-show82-message></p>
    ${view==='history' ? showHistoryMarkup(history.slice(page*pageSize,(page+1)*pageSize)) : view==='reference' ? `<div class="sales-shop-body cards sales-listings">${references.map(([name,start,end,venue,disciplines,kind,source])=>
      `<article class="box sales-horse-card"><p class="shop-eyebrow">Published 2026 reference · ${kind}</p><h3>${csEscape(name)}</h3>
      <p>${start}${start===end ? '' : ' to '+end} · ${csEscape(venue)}</p><p>${disciplines.map(d=>CAREER_DISCIPLINE_LABELS[d]).join(' · ')}</p>
      <a href="${source}" target="_blank" rel="noopener noreferrer">Organizer schedule</a></article>`).join('')}</div>` :
      rows.length ? rendered : '<div class="sales-shop-body"><p class="shop-empty">No events match the filters.</p></div>'}${pageNav}`;
  if (fixtures) section.innerHTML += federationMarkup82(rider,horses) + show82CreatorMarkup();
  if (panel.children?.length > 0 && typeof panel.append === 'function' && !panel.querySelector('.calendar82-stable-tools')) {
    const tools=document.createElement('details'), summary=document.createElement('summary'), content=document.createElement('div');
    tools.className='tack-shop shop-drawer calendar82-stable-tools';
    summary.textContent='Stable calendar tools and reminders';
    content.className='shop-drawer-body';
    for (const child of Array.from(panel.children)) content.append(child);
    tools.append(summary,content);
    panel.append(tools);
  }
  panel.prepend(section);
  show82BindCreator(panel);
  show82BindFederation(panel,rider,horses);
  for (const input of panel.querySelectorAll('[data-show82-filter]')) input.onchange=()=>{
    filters[input.dataset.show82Filter]=input.value;
    filters.page=0;
    show82RenderCalendar();
  };
  for (const button of panel.querySelectorAll('[data-show82-page]')) button.onclick=()=>{
    filters.page=Number(button.dataset.show82Page);show82RenderCalendar();
  };
  bindShowHistory(panel,history);
  for (const button of panel.querySelectorAll('[data-show82-enter]')) button.onclick=()=>{
    const event=events.find(row=>row.id===button.dataset.show82Enter);
    if (!event) return;
    if (!horse) return;
    const source=event.legacy ? calendarFindEvent(event.id) || event : event;
    const result=event.legacy ? (source.userHosted ? registerCalendarHorseShow(horse,source) : calendarRegisterGameShow(horse,source)) : careerEnter(source,horse);
    if (result.ok) {
      saveGame(false);
      if (app.activeShow) changeTab('shows');
      else renderCalendar();
    } else panel.querySelector('[data-show82-message]').textContent=result.message;
  };
}

function show82CustomClass(index) {
  return `<fieldset class="box sales-horse-card" data-show82-class>
    <legend>Class ${index+1}</legend><label>Class name<input data-class-value="name" maxlength="60"></label>
    <div class="shop-option-grid">
    <label>Discipline<select data-class-value="discipline">${careerOptions(Object.entries(CAREER_DISCIPLINE_LABELS),'jumping')}</select></label>
    <label>Level<select data-class-value="level">${careerOptions(SHOW_LEVELS.jumping.map(level=>[level,level]),'0.70')}</select></label>
    <label>Rider division<select data-class-value="division">${careerOptions(Object.entries(CAREER_AGE_DIVISIONS).map(([key,row])=>[key,row.label]),'senior')}</select></label>
    <label>Horse age<select data-class-value="horseAge">${careerOptions([[0,'Open'],...[4,5,6,7,8].map(age=>[age,age+' years'])],0)}</select></label>
    <label>Format<select data-class-value="format">${careerOptions(Object.entries(CALENDAR_FORMATS).filter(([key])=>key!=='Puissance').map(([key,row])=>[key,row.label]),'Standard')}</select></label>
    <label>Test or course<select data-class-value="course">${careerOptions([['','Standard'],['Special','Grand Prix Special'],['Freestyle','Grand Prix Freestyle'],['Short','Short eventing'],['Long','Long eventing']],'')}</select></label>
    <label>Day offset<input type="number" min="0" max="6" value="0" data-class-value="offset"></label>
    <label>Maximum entries<input type="number" min="1" max="100" value="12" data-class-value="capacity"></label>
    <label>Entry fee<input type="number" min="0" max="5000" value="0" data-class-value="fee"></label>
    <label>Prize fund<input type="number" min="0" max="25000" value="0" data-class-value="prize"></label>
    <label><input type="checkbox" data-class-value="pony"> Pony only</label>
    <label><input type="checkbox" data-class-value="jumpOff"> Jump-off</label>
    <label><input type="checkbox" data-class-value="npcs" checked> NPC entrants</label>
    </div><button type="button" data-show82-remove>Remove class</button>
  </fieldset>`;
}
function show82CreatorMarkup() {
  return `<details class="shop-drawer" data-ui-key="show82-create"><summary>Create custom show</summary>
  <div class="shop-drawer-body">
    <p>Sandbox purses are simulated. Career-sanctioned custom shows are official immediately, with no organizer qualifications or upfront prize funding.</p>
    <div class="shop-option-grid">
      <label>Show name<input data-show-value="name" maxlength="90"></label>
      <label>Venue<input data-show-value="venue" maxlength="90" value="${csEscape(app.currentBarn?.name || '')}"></label>
      <label>Country<select data-show-value="country">${careerOptions(Object.entries(CAREER_COUNTRIES).map(([code,row])=>[code,row[0]]),careerCountry(app.currentBarn?.country))}</select></label>
      <label>Mode<select data-show-value="mode">${careerOptions([['sandbox','Sandbox · Unofficial'],['sanctioned','Career-sanctioned · Official']],'sandbox')}</select></label>
      <label>Year<input type="number" min="${app.year}" max="${app.year+5}" value="${app.year}" data-show-value="year"></label>
      <label>Month<input type="number" min="1" max="12" value="${app.month}" data-show-value="month"></label>
      <label>Day<input type="number" min="1" max="30" value="${Math.min(30,app.day+7)}" data-show-value="day"></label>
      <label>Weather<select data-show-value="weather">${careerOptions(['Seasonal','Clear','Light Rain','Heavy Rain','Windy'].map(type=>[type,type]),'Seasonal')}</select></label>
      <label>Days<input type="number" min="1" max="7" value="1" data-show-value="duration"></label>
      <label>Prestige<input type="number" min="0" max="100" value="10" data-show-value="prestige"></label>
      <label>Advertised tier<select data-show-value="tier">${careerOptions(CAREER_TIERS.map((tier,i)=>[i,tier.label]),1)}</select></label>
      <label><input type="checkbox" data-show-value="annual"> Annual recurrence</label>
    </div>
    <div data-show82-classes class="cards sales-listings">${show82CustomClass(0)}</div>
    <div class="shop-actions"><button type="button" data-show82-add>Add class</button><button type="button" data-show82-create>Create show</button></div>
    <p role="status" data-show82-create-status></p>
  </div></details>`;
}
function show82BindCreator(panel) {
  const root=panel.querySelector('[data-ui-key="show82-create"]');
  if (!root?.querySelector) return;
  const classes=root.querySelector('[data-show82-classes]');
  if (!classes) return;
  const bind=(row)=>{
    const discipline=row.querySelector('[data-class-value="discipline"]'),level=row.querySelector('[data-class-value="level"]');
    discipline.onchange=()=>{level.innerHTML=careerOptions(SHOW_LEVELS[discipline.value].map(value=>[value,value]),SHOW_LEVELS[discipline.value][0]);};
    row.querySelector('[data-show82-remove]').onclick=()=>{if (classes.children.length>1) row.remove();};
  };
  for (const row of classes.children) bind(row);
  root.querySelector('[data-show82-add]').onclick=()=>{
    if (classes.children.length>=12) return;
    classes.insertAdjacentHTML('beforeend',show82CustomClass(classes.children.length));
    bind(classes.lastElementChild);
  };
  function values(node,attribute) {
    const numeric=['horseAge','offset','capacity','fee','prize','tier'];
    return Object.fromEntries([...node.querySelectorAll('['+attribute+']')].map(input=>{
      const key=input.getAttribute(attribute);
      return [key,input.type==='checkbox' ? input.checked : input.type==='number' || numeric.includes(key) ? Number(input.value) : input.value];
    }));
  }
  root.querySelector('[data-show82-create]').onclick=()=>{
    const result=customShowCreate({...values(root,'data-show-value'),classes:[...classes.children].map(row=>values(row,'data-class-value'))});
    if (!result.ok) {root.querySelector('[data-show82-create-status]').textContent=result.message;return;}
    Object.assign(careerSelection().show82,{view:'monthly',year:result.show.year,month:result.show.month,kind:'custom',status:'',page:0});
    saveGame(false);
    renderCalendar();
  };
}
function federationMarkup82(rider,horses) {
  if (!federationEnabled()) return `<details class="shop-drawer"><summary>National teams</summary><div class="shop-drawer-body"><p>Enable Rider Realism, Career Progression and National Team Applications in Settings.</p></div></details>`;
  const state=federationState(), now=pastureCalendarHour();
  const plans=federationPlans(app.year,rider.country).filter(plan=>careerDivisions(rider,plan.trial.at).includes(plan.division));
  const previous=Object.values(state.seasons).filter(season=>season.country===rider.country).sort((a,b)=>b.year-a.year);
  return `<details class="shop-drawer" data-ui-key="show82-federation"><summary>National team applications</summary><div class="shop-drawer-body">
    <p class="shop-eyebrow">${csEscape(CAREER_COUNTRIES[rider.country][0])} · Federation selection office</p>
    <p>Applications close on month 3, day 15. Trials run in month 5 and squad selection is announced in month 6.</p>
    <p role="status" data-federation-status></p>
    <div class="cards sales-listings">${plans.map(plan=>{
      const id=plan.id+':'+rider.id, row=state.applications[id], invitation=state.invitations[id];
      return `<article class="box sales-horse-card"><p class="shop-eyebrow">${CAREER_DISCIPLINE_LABELS[plan.discipline]}</p>
      <h3>${CAREER_AGE_DIVISIONS[plan.division].label}</h3>
      <p>${csEscape(row?.status || (now<plan.opens ? 'Not Open' : now<=plan.closes ? 'Open' : 'Expired'))}</p>
      ${invitation && !row && now<=invitation.expires ? `<p>${csEscape(invitation.type)} · Recent verified results</p>` : ''}
      ${row ? `<p>${csEscape(row.horseName)}${row.reason ? ' · '+csEscape(row.reason) : ''}</p>
        <details><summary>Application history</summary>${row.history.map(item=>`<p>${item.status} · ${csEscape(pastureDateLabel(item.hour))}</p>`).join('')}
        ${row.selection ? `<p>Selection score ${row.selection.score.toFixed(1)}/100</p>` : ''}</details>
        ${['Submitted','Under Review','Shortlisted','Trial Invited'].includes(row.status) ? `<button type="button" data-federation-withdraw="${id}">Withdraw application</button>` : ''}`
      : now<=plan.closes ? `<p>Requires a verified top-ten regional or higher result with this horse.</p>
        <label>Horse<select data-federation-mount>${careerOptions(horses.map(horse=>[horse.id,horse.name]),invitation?.horseId)}</select></label>
        <button type="button" data-federation-apply="${plan.id}">${invitation ? 'Accept invitation and apply' : 'Apply'}</button>` : ''}
      </article>`;
    }).join('') || '<p class="shop-empty">Set a rider age and country to see available divisions.</p>'}</div>
    <details><summary>Squads and selection history</summary>${previous.slice(0,24).map(season=>`<details>
      <summary>Year ${season.year} · ${CAREER_DISCIPLINE_LABELS[season.discipline]} · ${CAREER_AGE_DIVISIONS[season.division].label}</summary>
      <p>Federation selection panel · ${csEscape(pastureDateLabel(season.selectedAt))}</p>
      ${season.members.filter(row=>row.status.startsWith('Selected')).map(row=>`<p>${csEscape(row.riderName)} / ${csEscape(row.horseName)} · ${row.status} · ${row.score.toFixed(1)}</p>`).join('') || '<p>No classified squad.</p>'}
    </details>`).join('') || '<p>No squad decisions yet.</p>'}</details>
  </div></details>`;
}
function show82BindFederation(panel,rider,horses) {
  for (const button of panel.querySelectorAll('[data-federation-apply]')) button.onclick=()=>{
    const plan=federationPlans(app.year,rider.country).find(row=>row.id===button.dataset.federationApply);
    if (!plan) return;
    const horse=horses.find(horse=>horse.id===button.closest('article').querySelector('[data-federation-mount]').value);
    const result=federationApply(plan,horse,rider);
    if (!result.ok) {panel.querySelector('[data-federation-status]').textContent=result.message;return;}
    saveGame(false);renderCalendar();panel.querySelector('[data-ui-key="show82-federation"]')?.setAttribute('open','');
  };
  for (const button of panel.querySelectorAll('[data-federation-withdraw]')) button.onclick=()=>{
    const row=federationState().applications[button.dataset.federationWithdraw];
    if (!row || row.riderId!==rider.id || !['Submitted','Under Review','Shortlisted','Trial Invited'].includes(row.status)) return;
    federationTransition(row,'Withdrawn',pastureCalendarHour());
    saveGame(false);renderCalendar();panel.querySelector('[data-ui-key="show82-federation"]')?.setAttribute('open','');
  };
}
