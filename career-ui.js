const CAREER_BOARD_LABELS = {
  world: 'World riders', horse: 'World horses', combination: 'Rider–horse combinations',
  national: 'National riders', division: 'Age divisions', 'youth-national': 'National age divisions', 'youth-international': 'International age divisions', 'young-horse': 'Young horses',
  tour: 'Season tour standings', team: 'National teams'
};
const CAREER_DISCIPLINE_LABELS = { jumping: 'Showjumping', dressage: 'Dressage', eventing: 'Eventing', hunter: 'Hunters' };
const CAREER_SERIES_LABELS = new Map(CAREER_SERIES.filter(event=>event.series)
  .map(event=>[event.series,event.series.endsWith('-ladder') ? CAREER_DISCIPLINE_LABELS[event.discipline]+' Competition Ladder' :
    event.name.split(' · Leg ')[0].replace(/ Final$/,'')]));


function careerOptions(options, selected) {
  return options.map(([value,label]) =>
    '<option value="' + csEscape(value) + '"' + (String(value) === String(selected) ? ' selected' : '') + '>' + csEscape(label) + '</option>').join('');
}
function careerHero(eyebrow, title, description, aside = '') {
  return `<header class="shop-hero">
    <div><p class="shop-eyebrow">${csEscape(eyebrow)}</p><h2>${csEscape(title)}</h2><p>${csEscape(description)}</p></div>
    ${aside}
  </header>`;
}
function careerSelection() {
  app.uiSelections ||= {};
  return app.uiSelections.career || (app.uiSelections.career = {});
}
function careerGuide() {
  return `<details class="shop-drawer career-guide" data-ui-key="career-guide">
    <summary>Competition and rankings guide</summary>
    <div class="shop-drawer-body"><p>These are fictional game regulations and scoring tables.</p>
    <details><summary>Competition ladder</summary><ol>${CAREER_TIERS.map(tier =>
      `<li>${tier.label} · Prestige ${tier.prestige}/100 · Prize scale ×${tier.purse}</li>`).join('')}</ol>
      <p>Every scheduled class specifies its own level, eligibility, and points. International senior classes require recent verified results. A season final also requires a qualifying finish in that series.</p></details>
    <details><summary>How points are earned</summary>
      <p>Points = winner base × placing × discipline performance × field strength (0.85–1.15), rounded to the nearest whole point. Official fields need at least four starters. Results below the class cutoff or outside the top 75% receive zero points. Eliminations receive zero points.</p>
      <p>Placing factors are 1.00, 0.80, 0.65, 0.55, 0.45, then 0.30 for 6th–10th and 0.12 for 11th–20th.</p>
      ${Object.entries(CAREER_WORLD_POINTS).map(([discipline,points]) =>
        `<p>${CAREER_DISCIPLINE_LABELS[discipline]} international winner bases, 1★ through World Championship · ${points.join(', ')}.</p>`).join('')}
      <p>Dressage uses the final percentage. Eventing uses total penalties across all phases. Hunter uses the judged score.</p></details>
    <details><summary>Ranking periods</summary>
      <p>Ranking categories simulate up to 50 NPC contenders, or 100 when your rider is eligible. A newly active category adds five contenders per weekly release. NPC points come from real calendar competitions; private seller histories and legacy hidden circuits do not count.</p><p>World results roll off after 12 game months. World rider totals use the best 30 results. Rankings release every seven game days. Tour, team and national standings use the game year. Youth and young horse points stay in their own boards.</p></details>
    <details><summary>Age divisions and ponies</summary>
      <ul>${Object.values(CAREER_AGE_DIVISIONS).map(division => `<li>${division.label} · ${division.ages.join('–')}</li>`).join('')}</ul>
      <p>Age divisions use age in the competition year. Pony classes check measured height. The default 148 cm ceiling includes a 1 cm allowance for a shod measurement. Young horse divisions require the specified age and suitable schooling.</p></details>
    <details><summary>Games and national teams</summary>
      <p>Games editions repeat on four-year cycles. Each has a country quota and discipline, age and recent qualifying-result requirements. Team classes count the configured number of best classified scores. The World Youth Arena Games supplies a temporary mount.</p></details>
    <details><summary>Rider training</summary>
      ${Object.entries(CAREER_SKILL_ROUTES).map(([discipline,skills]) => `<p>${CAREER_DISCIPLINE_LABELS[discipline]} · ${skills.join(', ')}.</p>`).join('')}
      <p>Complete ridden exercises or suitable competition rounds. Practice gains taper with ability and repeated efforts. Advancing the calendar alone earns no player skill.</p></details>
    </div>
  </details>`;
}
function careerEventRequirements(event) {
  const requirements = [CAREER_AGE_DIVISIONS[event.division].label];
  if (event.horseAge) requirements.push(event.horseAge + '-year-old horses');
  if (event.horseMinAge) requirements.push('Horse age ' + event.horseMinAge + '+');
  if (event.ponyCm) requirements.push('Pony height ≤ ' + event.ponyCm + ' cm unshod');
  if (event.region) requirements.push(event.region + ' federations');
  if (event.team) requirements.push(event.team + ' starters per team, ' + event.count + ' scores count');
  if (event.quota) requirements.push(event.quota + ' per country');
  if (event.final) requirements.push('Season qualification');
  if (event.allocated) requirements.push('Allocated mount');
  return requirements.join(' · ');
}
function careerCalendarMarkup() {
  const selected = careerSelection();
  const now = pastureCalendarHour(), rider = careerRider(), state = careerState();
  const discipline = CAREER_DISCIPLINE_LABELS[selected.calendarDiscipline] ? selected.calendarDiscipline : 'jumping';
  const year = Number(selected.calendarYear) || app.year;
  const month = Number(selected.calendarMonth) || app.month;
  const start = pastureCalendarHour(year,month,1,0), end = start + CAREER_HOURS_PER_MONTH - 1;
  const events = careerSchedule(start,end).filter(event => event.discipline === discipline &&
    (!selected.calendarDivision || selected.calendarDivision === 'all' || event.division === selected.calendarDivision));
  const horses = competitionEligibleHorses().filter(horse => !horse.deceased && !horse.sold && !horse.rehomed);
  const years = [app.year - 1, app.year, app.year + 1, app.year + 2, app.year + 3].filter(value => value > 0);
  const statuses = year > app.year + 1 ? '<p>Entries open within 90 game days of each class.</p>' : '';
  return `<section class="tack-shop horse-sales-shop career-shell">
    ${careerHero('Show office · Season calendar','Competition calendar','Browse recognized classes, tour legs, and championships. Check eligibility before booking your trip.',
      `<div class="sales-balance"><span>Stable balance</span><strong>${money(app.money)}</strong></div>`)}
    <div class="shop-meta"><span><strong>${events.length}</strong> classes in this selection</span><span>${csEscape(pastureDateLabel(now))}</span><span>Fixed dates · Verified results</span></div>
    <details class="shop-drawer" data-ui-key="career-calendar">
      <summary>Browse competitions</summary>
      <div class="sales-filter-bar career-filters">
      <label>Discipline<select data-career-filter="calendarDiscipline">${careerOptions(Object.entries(CAREER_DISCIPLINE_LABELS),discipline)}</select></label>
      <label>Division<select data-career-filter="calendarDivision">${careerOptions([['all','All divisions'],...Object.entries(CAREER_AGE_DIVISIONS).map(([key,row]) => [key,row.label])],selected.calendarDivision || 'all')}</select></label>
      <label>Year<select data-career-filter="calendarYear">${careerOptions(years.map(value => [value,'Year ' + value]),year)}</select></label>
      <label>Month<select data-career-filter="calendarMonth">${careerOptions(Array.from({ length: 12 }, (_,i) => [i+1,'Month ' + (i+1)]),month)}</select></label>
    </div>
    ${statuses}
    <p class="shop-status" role="status" data-career-calendar-status></p>
    <div class="sales-shop-body"><div class="cards sales-listings">
    ${events.map(event => {
      const meet = state.meets[event.id];
      const open = event.at >= now + 24 && event.at <= now + 90 * 24 && !meet;
      const eligible = horses.filter(horse => !careerEligibility(event,rider,event.allocated ? null : horse));
      return `<article class="box sales-horse-card career-event-card" data-career-class="${event.id}">
        <p class="shop-eyebrow">${CAREER_DISCIPLINE_LABELS[event.discipline]} · ${event.level}</p>
        <h3>${csEscape(event.name)}</h3>
        <div class="career-chips"><span>${CAREER_TIERS[event.tier].label}</span><span>Prestige ${event.prestige}</span>${event.games ? '<span>Games</span>' : ''}</div>
        <p>Y${event.date.year} M${event.date.month} D${event.date.day} · ${csEscape(event.city)}, ${csEscape(event.country)}
       ${event.course ? ' · ' + event.course : ''}</p>
        <p>${csEscape(careerEventRequirements(event))}</p>
        <p class="career-entry-price">Entry ${money(event.entryFee)} · Winner award ${money(event.prizeMoney)} ·
        ${event.base ? event.base + ' base ' + event.ranking + ' points' : 'No ranking points'}</p>
        ${meet ? `<p>${meet.results.length ? 'Winner · ' + csEscape(meet.results.find(row => row.placing === 1)?.riderName || 'No classified finish') : 'No qualified field'}</p>` :
        open ? `<label>${event.allocated ? 'Horse to provide tack' : 'Horse'}<select data-career-mount>${careerOptions((eligible.length ? eligible : horses).map(horse => [horse.id,horse.name]),eligible[0]?.id)}</select></label>
          <button type="button" data-career-enter="${event.id}"${horses.length ? '' : ' disabled'}>Enter and prepare show trip</button>
          ${!eligible.length && horses.length ? `<p class="small">${csEscape(careerEligibility(event,rider,event.allocated ? null : horses[0]))}</p>` : ''}`
        : '<p>Entries closed or outside the booking window.</p>'}
      </article>`;
    }).join('') || '<p class="shop-empty">No classes in this selection.</p>'}
    </div></div>
    </details>
  </section>`;
}
const CAREER_CALENDAR_RENDER = renderCalendar;
renderCalendar = function () {
  const result = CAREER_CALENDAR_RENDER();
  if (typeof show82RenderCalendar === 'function') { show82RenderCalendar(); return result; }
  const panel = document.getElementById('calendar');
  if (!panel) return result;
  const section = document.createElement('section');
  section.className = 'career-calendar-wrap';
  section.innerHTML = careerCalendarMarkup();
  panel.prepend(section);
  panel.querySelectorAll('[data-career-filter]').forEach(select => select.onchange = () => {
    careerSelection()[select.dataset.careerFilter] = select.value;
    renderCalendar();
    panel.querySelector('[data-ui-key="career-calendar"]')?.setAttribute('open','');
  });
  panel.querySelectorAll('[data-career-enter]').forEach(button => button.onclick = () => {
    const [,year,id] = button.dataset.careerEnter.split(':');
    const definition = CAREER_SERIES.find(row => row.id === id);
    if (!definition) return;
    const event = calendarFindEvent(button.dataset.careerEnter) || careerEvent(definition,Number(year));
    const horseId = button.closest('[data-career-class]').querySelector('[data-career-mount]').value;
    const result = careerEnter(event,calendarHorseById(horseId));
    if (result.ok) changeTab('shows');
    else section.querySelector('[data-career-calendar-status]').textContent = result.message;
  });
  return result;
};

function careerRiderDetails(row, discipline) {
  const state = careerState();
  const rider = state.npcs?.find(rider => rider.id === row.id) || rrSettings().profiles.find(profile => profile.id === row.id);
  if (!rider) return '';
  const identity = rider.career ? { ...rider.career, id: rider.id } : rider;
  const history = careerResults({ riderId: row.id, discipline }).sort((a,b) => b.hour - a.hour);
  const rankHistory = state.rankHistory[careerBoardKey('world',discipline)]?.[row.id];
  return `<p>Competition age ${careerAge(identity) ?? 'unrecorded'} · ${CAREER_STAGES[rider.stage] || rider.level || 'Player rider'}
    · Major wins ${history.filter(result => result.major && result.placing === 1).length}</p>
    <p>Eligible divisions · ${careerDivisions({ ...identity, professional: rider.professional || rider.level === 'Professional' })
      .map(key => CAREER_AGE_DIVISIONS[key].label).join(', ')}</p>
    ${rider.sponsor ? '<p>Career partner · ' + csEscape(rider.sponsor.name) + '</p>' : ''}
    ${rider.horses ? '<p>Partnerships · ' + rider.horses.map(horse => csEscape(horse.name) + ' (' + csEscape(horse.breed) + ')').join(', ') + '</p>' : ''}
    ${rankHistory?.releases.length ? `<p>Recent releases · ${rankHistory.releases.slice(-6).map(record =>
      'Y' + pastureDate(record.hour).year + ' M' + pastureDate(record.hour).month + ' #' + record.rank).join(' · ')}</p>` : ''}
    ${history.slice(0,5).map(result => `<p>${csEscape(result.event)} · ${csEscape(result.horseName)} · ${result.placing ? '#' + result.placing : 'Unclassified'}</p>`).join('')}`;
}
function careerRivals(rider, discipline) {
  const rivals = new Map();
  for (const meet of Object.values(careerState().meets)) {
    if (meet.discipline !== discipline) continue;
    const own = meet.results.find(result => result.player && result.riderId === rider.id);
    if (!own) continue;
    for (const result of meet.results.filter(result => !result.player)) {
      const record = rivals.get(result.riderId) || { name: result.riderName, horse: result.horseName, meetings: 0, ahead: 0, behind: 0 };
      record.meetings++;
      if (own.placing && result.placing && own.placing < result.placing) record.ahead++;
      if (own.placing && result.placing && own.placing > result.placing) record.behind++;
      rivals.set(result.riderId,record);
    }
  }
  return [...rivals.values()].filter(rival => rival.meetings >= 2).sort((a,b) => b.meetings-a.meetings || a.name.localeCompare(b.name)).slice(0,8);
}
function careerHistoryMarkup(rider, discipline) {
  const medals = careerMedals();
  const rivals = careerRivals(rider,discipline);
  const streak = careerMajorStreak('elite-majors');
  return `${riderParticipationMarkup(rider,discipline)}
    <details class="shop-drawer"><summary>Career highlights</summary><div class="shop-drawer-body">
    ${streak?.riderId === rider.id && streak.length >= 2 ? '<p>Elite Majors streak · ' + streak.length + ' consecutive wins</p>' : ''}
    ${rivals.length ? '<h3>Recurring rivals</h3>' + rivals.map(rival =>
      `<p>${csEscape(rival.name)} / ${csEscape(rival.horse)} · ${rival.meetings} meetings ·
      ${rival.ahead} finishes ahead, ${rival.behind} behind</p>`).join('') : ''}
    </div></details>
    <details class="shop-drawer"><summary>Games results and country medal table</summary><div class="shop-drawer-body">
      ${medals.map(([country,row]) => `<p>${csEscape(CAREER_COUNTRIES[country]?.[0] || country)} · Gold ${row.Gold} · Silver ${row.Silver} · Bronze ${row.Bronze}</p>`).join('') || '<p>No Games medals awarded yet.</p>'}
      ${Object.values(careerState().meets).filter(meet => meet.games).sort((a,b) => b.hour-a.hour).slice(0,20).map(meet =>
        `<details><summary>${csEscape(meet.name)} · Year ${pastureDate(meet.hour).year}</summary>
        ${meet.results.filter(row => row.medal).map(row => `<p>${row.medal} · ${csEscape(row.riderName)} · ${csEscape(row.country)}</p>`).join('')}
        ${meet.teams.filter(row => row.medal).map(row => `<p>Team ${row.medal} · ${csEscape(row.country)}</p>`).join('')}</details>`).join('')}
    </div></details>`;
}
function careerSponsorMarkup(rider) {
  const state = careerState(), offers = careerSponsorOffers(rider);
  const contracts = state.contracts.filter(contract => contract.riderId === rider.id);
  return `<details class="shop-drawer"><summary><span>Sponsorships</span><span class="shop-count">${offers.length}</span></summary>
    <div class="shop-drawer-body">
    ${contracts.map(contract => `<div class="shop-cart-line"><div><strong>${csEscape(contract.name)}</strong>
      <p>${money(contract.stipend)}/month · ${contract.endMonth > Math.floor(pastureCalendarHour() / CAREER_HOURS_PER_MONTH)
        ? 'Active through ' + pastureDateLabel(contract.endMonth * CAREER_HOURS_PER_MONTH - 1) : 'Expired'}
        ${contract.guardian ? ' · Guardian represented' : ''}</p></div></div>`).join('')}
    ${offers.map(offer => `<div class="shop-cart-line"><div><strong>${offer.name}</strong>
      <p>${money(offer.stipend)} monthly · ${money(offer.bonus)} qualifying podium bonus</p></div>
      <button class="career-primary" type="button" data-career-sponsor="${offer.id}">${careerAge(rider) < 18 ? 'Accept through guardian' : 'Accept offer'}</button></div>`).join('')
      || '<p class="shop-empty">No current offers.</p>'}
    </div></details>`;
}
function careerLeaderboardDetails(row, type, discipline, filter) {
  if (type === 'team') {
    const meets = Object.values(careerState().meets).filter(meet => meet.series === filter && meet.discipline === discipline)
      .sort((a,b) => b.hour-a.hour);
    const squad = meets.map(meet => ({ meet, result: meet.teams.find(team => team.country === row.country) }))
      .find(entry => entry.result);
    if (!squad) return '<p class="shop-empty">No classified squad.</p>';
    const members = squad.meet.results.filter(result => result.country === row.country)
      .map(result => csEscape(result.riderName) + ' / ' + csEscape(result.horseName));
    return `<p>Latest squad · ${csEscape(squad.meet.name)} · Team #${squad.result.placing}</p><p>${members.join(' · ')}</p>`;
  }
  if (['horse','young-horse','combination'].includes(type)) {
    const horseId = type === 'combination' ? row.id.slice(row.id.indexOf('|') + 1) : row.id;
    const horse = app.horses.find(horse => horse.id === horseId) ||
      careerState().npcs?.flatMap(rider => rider.horses).find(horse => horse.id === horseId);
    const history = careerResults({ horseId, discipline, riderId: type === 'combination' ? row.id.split('|')[0] : undefined })
      .sort((a,b) => b.hour-a.hour);
    return `<p>${horse ? csEscape(horse.breed) + ' · ' : ''}${history.length} starts ·
      ${history.filter(result => result.placing === 1).length} wins</p>
      ${history.slice(0,5).map(result => `<p>${csEscape(result.event)} · ${csEscape(result.riderName)} ·
        ${result.placing ? '#' + result.placing : 'Unclassified'}</p>`).join('')}`;
  }
  return careerRiderDetails(row,discipline) || '<p>' + csEscape(row.name) + '</p>';
}

function renderCareerRankings() {
  const panel = document.getElementById('rankings');
  if (!panel) return;
  const state = careerState(), selected = careerSelection(), rider = careerRider();
  const type = CAREER_BOARD_TYPES.includes(selected.board) ? selected.board : 'world';
  const discipline = CAREER_DISCIPLINE_LABELS[selected.discipline] ? selected.discipline : 'jumping';
  const series = [...new Map([...CAREER_SERIES,...(typeof federationSeries90==='function'?federationSeries90():[])].filter(event => event.discipline === discipline && event.series &&
    (type === 'team' ? event.team : !event.team || event.federationProgram)).map(event => [event.series,CAREER_SERIES_LABELS.get(event.series)])).entries()];
  const options = type === 'national' ? Object.entries(CAREER_COUNTRIES).map(([code,[name]]) => [code,name])
    : ['division','youth-international'].includes(type) ? Object.entries(CAREER_AGE_DIVISIONS).filter(([key]) => key !== 'senior').map(([key,row]) => [key,row.label])
    : type === 'youth-national' ? Object.entries(CAREER_AGE_DIVISIONS).filter(([key]) => key !== 'senior')
      .flatMap(([key,row]) => Object.entries(CAREER_COUNTRIES).map(([code,country])=>[key+'|'+code,row.label+' · '+country[0]]))
    : type === 'young-horse' ? [4,5,6,7,8].map(age => [age,age + '-year-olds'])
    : ['team','tour'].includes(type) ? series : type === 'horse' ? [['','World horses'],['pony','Pony horses']] : [];
  const choice = selected['boardFilter:' + type];
  const filter = options.some(([value]) => String(value) === String(choice)) ? choice
    : type === 'national' ? rider.country : options[0]?.[0] ?? '';
  const rows = careerRankingRows(type,discipline,filter);
  const top = rows.slice(0,100);
  const own = rows.find(row => row.id === rider.id);
  if (own && !top.includes(own)) top.push(own);
  panel.innerHTML = `<section class="tack-shop horse-sales-shop career-shell">
    ${careerHero('Show office · Official results','Competition rankings','Weekly circuits and official show results keep every age group and national board competitive.')}
    <div class="shop-meta">
      <span><strong>${careerActive() ? 'Career simulation active' : 'Career progression paused · Weekly ranking circuits active'}</strong></span>
      <span>${state.rankingHour ? 'Last release · ' + csEscape(pastureDateLabel(state.rankingHour)) + ' · Updates every 7 days' : 'Rankings update every 7 days'}</span>
      <span>${rows.length} ranked ${rows.length === 1 ? 'entry' : 'entries'}</span>
    </div>
    <div class="sales-filter-bar career-filters">
      <label>Board<select data-career-board="board">${careerOptions(Object.entries(CAREER_BOARD_LABELS),type)}</select></label>
      <label>Discipline<select data-career-board="discipline">${careerOptions(Object.entries(CAREER_DISCIPLINE_LABELS),discipline)}</select></label>
      ${options.length ? `<label>Division or series<select data-career-board="boardFilter:${type}">${careerOptions(options,filter)}</select></label>` : ''}
    </div>
    <details class="shop-drawer" data-career-rider-list${selected.rankingsCollapsed ? '' : ' open'}>
      <summary><span>Rankings list</span><span class="shop-count">${rows.length}</span></summary>
      <div class="shop-drawer-body career-board"></div>
    </details>
    ${typeof riderShowPointsMarkup==='function' ? '<div class="sales-shop-body">' + riderShowPointsMarkup(rider,discipline) + '</div>' : ''}
    ${careerHistoryMarkup(rider,discipline)}
    ${careerSponsorMarkup(rider)}
    ${careerGuide()}</section>`;
  const list=panel.querySelector('[data-career-rider-list]');
  function fillRankingsList() {
    const board=list?.querySelector('.career-board');
    if (!board || board.innerHTML) return;
    const champions=['team','tour'].includes(type) ? careerSeriesHistory(filter,discipline) : [];
    board.innerHTML=`
      ${top.length ? top.map((row,index) => {
        const change = row.previous == null ? 'New' : row.previous - row.rank;
        return `<details class="career-rank-row" data-career-rank-row="${index}">
          <summary><span class="career-rank">#${row.rank}</span><span class="career-rank-name"><strong>${csEscape(row.name)}</strong>
            <small>${csEscape(row.country)} · Best #${row.best}</small></span><span class="career-rank-points">${row.points} pts</span>
            <span class="career-movement ${change > 0 ? 'rising' : change < 0 ? 'falling' : ''}">${change > 0 ? '+' : ''}${change}</span></summary>
          <div class="career-rank-detail"></div>
        </details>`;
      }).join('') : '<p class="shop-empty">No classified points in this release.</p>'}
      ${champions.length ? '<h3>Season champions</h3>' + champions.map(row => `<p>Year ${row.year} · ${csEscape(row.winner.name)} · ${row.winner.points} pts</p>`).join('') : ''}
`;
    board.querySelectorAll('[data-career-rank-row]').forEach(details => details.ontoggle = () => {
    const body = details.querySelector('.career-rank-detail');
    if (details.open && !body.innerHTML) {
      body.innerHTML = careerLeaderboardDetails(top[Number(details.dataset.careerRankRow)],type,discipline,filter);
    }
  });
  }
  if (list) {
    list.ontoggle=()=>{
      selected.rankingsCollapsed=!list.open;
      if (list.open) fillRankingsList();
    };
    if (list.open) fillRankingsList();
  }
  panel.querySelectorAll('[data-career-board]').forEach(select => select.onchange = () => {
    if (list) selected.rankingsCollapsed=!list.open;
    selected[select.dataset.careerBoard] = select.value;
    renderCareerRankings();
  });
  panel.querySelectorAll('[data-career-sponsor]').forEach(button => button.onclick = () => {
    if (careerAcceptSponsor(rider,button.dataset.careerSponsor,careerAge(rider) < 18)) saveGame(false);
    renderCareerRankings();
  });
}
tabs.push('rankings');
const CAREER_RENDER = render;
render = function (...args) {
  const result = CAREER_RENDER(...args);
  if (app.uiActiveTab === 'rankings') safeRun('renderCareerRankings',renderCareerRankings);
  return result;
};

const CAREER_SETTINGS_RENDER = renderSettings;
renderSettings = function () {
  const result = CAREER_SETTINGS_RENDER();
  const box = document.querySelector('[data-ui-key="rider-realism"]');
  const manager = box?.querySelector('[data-rider-profiles]');
  if (!manager) return result;
  const rider = careerRider();
  const world = careerState();
  const age = careerAge(rider);
  const divisions = careerProfileDivisions(rider);
  const countryOptions = Object.entries(CAREER_COUNTRIES).map(([code,[name]]) => [code,name]);
  const section = document.createElement('section');
  section.className = 'career-profile-settings';
  section.innerHTML = `<p class="shop-eyebrow">Career profile</p><p>Sporting nationality · ${csEscape(CAREER_COUNTRIES[rider.country][0])} · Age ${age ?? 'unrecorded'}</p>
    <label>${age == null ? 'Starting age for this rider' : 'Starting age for a new rider'}<input type="number" min="6" max="60" value="18" data-career-age></label>
    <label>Sporting nationality<select data-career-country>${careerOptions(countryOptions,rider.country)}</select></label>
    ${age == null ? '<button type="button" data-career-profile-save>Set this rider’s age and nationality</button>' : ''}
    <label>Active ranking division<select data-career-division>${careerOptions([['','Automatic'],...divisions.map(key=>[key,CAREER_AGE_DIVISIONS[key].label])],rider.activeDivision || '')}</select></label>
    <details data-ui-key="career-settings"><summary>Career settings</summary>
      ${[['progression','Rider Career Progression & Rankings'],['background','Background NPC Career Simulation'],
        ['games','International Championship Calendar'],['sponsors','Sponsor Offers'],['federations','National Team Applications']].map(([key,label]) =>
        `<label><input type="checkbox" data-career-setting="${key}"${(key==='federations' ? world.settings.federations!==false : world.settings[key]) ? ' checked' : ''}> ${label}</label>`).join('')}
      <p>Career progression and background simulation require Rider Realism. Games scheduling is independent.</p>
      <label>Welsh registry profile<select data-career-welsh>${careerOptions(Object.keys(CAREER_WELSH_STANDARDS).map(key => [key,key]),app.settings.welshStandard || 'UK-inspired')}</select></label>
    </details>`;
  manager.append(section);
  function read() {
    return [Number(section.querySelector('[data-career-age]').value), section.querySelector('[data-career-country]').value];
  }
  const status = box.querySelector('[data-rr-status]');
  const setAge = section.querySelector('[data-career-profile-save]');
  if (setAge) setAge.onclick = () => {
    if (!careerSetProfile(rrStoreCurrentProfile(),...read())) {
      if (status) status.textContent = 'Choose an age from 6 to 60 and a sporting country.';
      return;
    }
    saveGame(false);
    renderSettings();
  };
  const create = manager.querySelector('[data-rr-create]');
  if (create) create.onclick = () => {
    const [age,country] = read();
    if (!Number.isInteger(age) || age < 6 || age > 60) {
      if (status) status.textContent = 'Choose a starting age from 6 to 60.';
      return;
    }
    rrReadRiderForm(box);
    const result = rrCreateRider(manager.querySelector('[data-rr-new-name]').value);
    if (!result.ok) {
      if (status) status.textContent = result.message;
      return;
    }
    careerSetProfile(result.profile,age,country);
    saveGame(false);
    renderSettings();
  };
  section.querySelectorAll('[data-career-setting]').forEach(input => input.onchange = () => {
    careerAdvance();
    world.settings[input.dataset.careerSetting] = input.checked;
    careerSeedRankedHistory(pastureCalendarHour());
    saveGame(false);
  });
  section.querySelector('[data-career-division]').onchange = event => {
    rrStoreCurrentProfile().career.activeDivision = event.target.value;
    saveGame(false);
    renderSettings();
  };
  const standard = section.querySelector('[data-career-welsh]');
  if (standard) standard.onchange = () => {
    app.settings.welshStandard = standard.value;
    saveGame(false);
  };
  return result;
};

const CAREER_HORSE_CARD = createHorseCard;
createHorseCard = function (horse,...args) {
  const card = CAREER_HORSE_CARD(horse,...args);
  const record = careerHorseRecord(horse);
  if (app.horses.some(row=>row.id===horse.id)) {
    const participation = document.createElement('details');
    participation.className = 'shop-drawer career-horse-record';
    participation.innerHTML = '<summary>Competition history and points</summary><div class="shop-drawer-body"></div>';
    participation.ontoggle = () => {
      if (!participation.open) return;
      const rows = careerParticipationRows({horseId:horse.id});
      participation.querySelector('.shop-drawer-body').innerHTML =
        rows.slice(0,24).map(showParticipationLine).join('') || '<p>No linked competition participation yet.</p>';
    };
    card.append(participation);
  }
  if (record.starts) {
    const details = document.createElement('details');
    const bestRank = Object.keys(CAREER_WORLD_POINTS).map(discipline =>
      app.career?.rankHistory[careerBoardKey('horse',discipline)]?.[horse.id]?.best).filter(Number.isFinite);
    const currentRanks = Object.keys(CAREER_WORLD_POINTS).map(discipline =>
      app.career?.rankings[careerBoardKey('horse',discipline)]?.find(row => row.id === horse.id)?.rank).filter(Number.isFinite);
    details.className = 'career-horse-record';
    details.innerHTML = `<summary>Official competition record</summary>
      <p>${record.starts} starts · ${record.wins} wins · ${record.podiums} podiums · ${record.clears} jumping clears
      · Prestige ${record.prestige}/100 · Proven-record premium ${Math.round(record.premium * 100)}%</p>
      <p>${record.best ? 'Highest placing tier · ' + CAREER_TIERS[record.best.career.tier].label : 'No classified top-ten result'}
        ${currentRanks.length ? ' · Current world rank #' + Math.min(...currentRanks) : ''}
        ${bestRank.length ? ' · Best world rank #' + Math.min(...bestRank) : ''}</p>
      <p>${record.highest ? 'Highest completion · ' + CAREER_TIERS[record.highest.career.tier].label + ' ' + csEscape(record.highest.level) + ' · ' : ''}
        ${record.majors} major starts · ${record.majorWins} major wins</p>
      ${record.recent.slice().reverse().map(row => `<p>${csEscape(row.date)} · ${csEscape(row.discipline)} ${csEscape(row.level)} · ${row.placing ? '#' + row.placing : csEscape(row.status || 'Unclassified')}</p>`).join('')}`;
    card.append(details);
  }
  return card;
};
