// Rank releases use compact results written by the live show and background scoring paths.
const CAREER_BOARD_TYPES = ['world','horse','combination','national','division','youth-national','youth-international','young-horse','tour','team'];
function careerBoardKey(type, discipline, filter = '') {
  return [type, discipline, filter].join('|');
}
// The same destinations drive published standings and the result breakdown.
function careerPointCredits(meet,row) {
  if (!row.points || meet.sandbox) return [];
  const {riderId,riderName,horseId,horseName,country,points} = row;
  const credits = [];
  function add(type,filter = '',seasonal = false,id = riderId,name = riderName,amount = points) {
    if (id) credits.push({type,filter,seasonal,id,name,country,points:amount});
  }
  if (meet.ranking === 'world') {
    add('world');
    add('horse','',false,horseId,horseName,Math.round(points*(.94+(meet.prestige || 0)*.0012)*(row.clear ? 1.04 : 1)));
    if (riderId && horseId) add('combination','',false,riderId+'|'+horseId,riderName+' / '+horseName);
  }
  if (['national','world'].includes(meet.ranking)) add('national',country,true);
  if (meet.ranking === 'division' || meet.custom && meet.ranking === 'national' && meet.division !== 'senior') {
    add('division',meet.division);
    if (meet.divisionScope !== 'international') add('youth-national',meet.division+'|'+country,true);
    if (meet.divisionScope === 'international' || meet.tier >= 5) add('youth-international',meet.division);
    if (meet.division === 'pony') add('horse','pony',false,horseId,horseName);
  }
  if (meet.ranking === 'young-horse') add('young-horse',meet.horseAge,false,horseId,horseName);
  if (meet.series && meet.ranking !== 'team') add('tour',meet.series,true);
  return credits;
}
function careerComputeBoards(hour) {
  const boards = {};
  const specialties=new Map((careerState().npcs||[]).map(r=>[r.id,r.specialty]));
  const nationalities=new Map([...(careerState().npcs||[]).map(r=>[r.id,r.country]),...(app.riderRealism?.profiles||[]).map(r=>[r.id,r.career?.country])]);
  const year = pastureDate(hour).year;
  function add(discipline,{type,filter,id,name,country,points}) {
    if (!points) return;
    const key = careerBoardKey(type,discipline,filter);
    const rows = boards[key] ||= new Map();
    if (!rows.has(id)) rows.set(id,{id,name,country,scores:[]});
    rows.get(id).scores.push(points);
  }
  for (const meet of Object.values(careerState().meets)) {
    if (meet.sandbox || meet.hour >= hour || meet.hour < hour - CAREER_HOURS_PER_YEAR) continue;
    const seasonal = pastureDate(meet.hour).year === year;
    for (const row of meet.results.filter(row=>!specialties.has(row.riderId)||specialties.get(row.riderId)===meet.discipline)) for (const credit of careerPointCredits(meet,row)) {
      if (!credit.seasonal || seasonal){const country=nationalities.get(row.riderId)||credit.country;add(meet.discipline,{...credit,country,filter:credit.type==='national'?country:credit.type==='youth-national'?String(credit.filter).split('|')[0]+'|'+country:credit.filter});}
    }
    if (seasonal && meet.series) for (const row of meet.teams || []) {
      add(meet.discipline,{type:'team',filter:meet.series,id:row.country,
        name:CAREER_COUNTRIES[row.country]?.[0] || row.country,country:row.country,points:row.points});
    }
  }
  return Object.fromEntries(Object.entries(boards).map(([key, rows]) => {
    const standings = [...rows.values()].map(({ scores, ...row }) => ({
      ...row, starts: scores.length, points: scores.sort((a,b) => b - a).slice(0, key.startsWith('world|') ? 30 : Infinity).reduce((a,b) => a+b,0)
    })).sort((a,b) => b.points - a.points || b.starts - a.starts || a.id.localeCompare(b.id));
    return [key, standings.map(({ starts, ...row }, index) => ({ ...row, rank: index + 1 }))];
  }));
}
function careerPublish(hour,{repair = false} = {}) {
  const world = careerState();
  const boards = careerComputeBoards(hour);
  const playerIds = new Set(rrSettings().profiles.map(profile => profile.id));
  for (const [key, rows] of Object.entries(boards)) {
    const prior = new Map((world.rankings[key] || []).map(row => [row.id,row]));
    const history = world.rankHistory[key] ||= {};
    for (const row of rows) {
      const oldRow = prior.get(row.id);
      row.previous = repair ? oldRow?.previous ?? null : oldRow?.rank ?? null;
      const record = history[row.id] ||= { best: row.rank, releases: [] };
      record.best = Math.min(record.best, row.rank);
      row.best = record.best;
      if (key.startsWith('world|') && (row.rank <= 100 || playerIds.has(row.id))) {
        const release = {hour,rank:row.rank,points:row.points};
        if (record.releases.at(-1)?.hour === hour) record.releases[record.releases.length-1] = release;
        else record.releases.push(release);
        if (record.releases.length > 120) record.releases.shift();
      }
    }
  }
  world.rankings = boards;
  world.rankingHour = hour;
}
function careerSeriesHistory(series, discipline) {
  const years = [...new Set(Object.values(careerState().meets).filter(meet => meet.series === series && meet.discipline === discipline)
    .map(meet => pastureDate(meet.hour).year))].filter(year => year < app.year);
  return years.sort((a,b) => b-a).map(year => {
    const boards = careerComputeBoards(pastureCalendarHour(year,12,30,23));
    return { year, winner: (boards[careerBoardKey('tour',discipline,series)] || boards[careerBoardKey('team',discipline,series)])?.[0] };
  }).filter(row => row.winner);
}
function careerMedals() {
  const countries = {};
  for (const meet of Object.values(careerState().meets).filter(meet => meet.games)) {
    for (const row of [...meet.results, ...meet.teams]) {
      if (!row.medal) continue;
      const total = countries[row.country] ||= { Gold: 0, Silver: 0, Bronze: 0 };
      total[row.medal]++;
    }
  }
  return Object.entries(countries).sort((a,b) => b[1].Gold-a[1].Gold || b[1].Silver-a[1].Silver || b[1].Bronze-a[1].Bronze || a[0].localeCompare(b[0]));
}

function careerMajorStreak(series) {
  let streak = null;
  const meets = Object.values(careerState().meets).filter(meet => meet.major && meet.series === series)
    .sort((a,b) => a.hour-b.hour || a.id.localeCompare(b.id));
  for (const meet of meets) {
    const winner = meet.results.find(row => row.placing === 1);
    if (!winner) continue;
    const length = streak?.riderId === winner.riderId ? streak.length + 1 : 1;
    streak = { riderId: winner.riderId, riderName: winner.riderName, length, eventId: meet.id };
  }
  return streak;
}

function careerNpcSponsors(rider, event, row) {
  const world = careerState();
  if (!world.settings.sponsors || !row.placing) return;
  const month = Math.floor(event.at / CAREER_HOURS_PER_MONTH);
  if (rider.sponsor?.endMonth <= month) rider.sponsor = null;
  if (!rider.sponsor && row.placing <= 5) {
    const possible = CAREER_SPONSORS.filter(offer => offer.tier <= event.tier && rider.starts >= offer.starts * 3);
    const sponsor = possible.at(-1);
    if (sponsor) rider.sponsor = { id: sponsor.id, name: sponsor.name, startMonth: month, endMonth: month + 7, stipend: sponsor.stipend, bonus: sponsor.bonus };
  }
  if (rider.sponsor && row.placing <= 3) rider.sponsorResources = (rider.sponsorResources || 0) + rider.sponsor.bonus;
}

const CAREER_SKILL_ROUTES = {
  jumping: ['Timing','Balance','Leg Stability','Judgment'],
  dressage: ['Seat Stability','Hand Stability','Aid Consistency','Balance'],
  eventing: ['Judgment','Timing','Leg Stability','Seat Stability'],
  hunter: ['Seat Stability','Hand Stability','Balance','Aid Consistency']
};
function careerPractice(riderId, discipline, level, source, hour) {
  if (!careerActive() || !CAREER_SKILL_ROUTES[discipline]) return 0;
  const r = rrSettings();
  rrStoreCurrentProfile();
  const profile = r.profiles.find(p => p.id === riderId);
  if (!profile) return 0;
  const month = Math.floor(hour / CAREER_HOURS_PER_MONTH), day = Math.floor(hour / 24);
  const world = careerState();
  const log = world.practice[riderId] ||= { month, budget: 0, sessions: {} };
  if (log.month > month) return 0;
  if (log.month !== month) Object.assign(log, { month, budget: 0, sessions: {} });
  if (Object.hasOwn(log.sessions, source) || log.budget >= 2.5) return 0;
  const index = levelIndex(discipline, level);
  const current = levelIndex(discipline, profile.experience[discipline]);
  if (index < current - 2) return 0;
  const repetitions = Object.values(log.sessions).filter(record => record.day === day && record.discipline === discipline).length;
  if (repetitions >= 2) return 0;
  let total = 0;
  for (const key of CAREER_SKILL_ROUTES[discipline]) {
    const skill = profile.abilities[key];
    const gain = Math.min(100 - skill, (.025 + .1 * (1 - skill / 100)) / (1 + repetitions), 2.5 - log.budget - total);
    profile.abilities[key] += gain;
    total += gain;
  }
  log.budget += total;
  log.sessions[source] = { day, discipline, amount: total };
  const disciplinePractice = Object.values(log.sessions).filter(record => record.discipline === discipline).length;
  if (index >= current && disciplinePractice >= 6 && disciplinePractice % 6 === 0) {
    profile.experience[discipline] = SHOW_LEVELS[discipline][Math.min(current + 1, SHOW_LEVELS[discipline].length - 1)];
  }
  if (r.riderId === riderId) {
    r.abilities = { ...profile.abilities };
    r.experience = { ...profile.experience };
  }
  return total;
}
const CAREER_TRAINING_SESSION = t2newSession;
t2newSession = function (...args) {
  const session = CAREER_TRAINING_SESSION(...args);
  if (careerActive()) session.careerRiderId = rrSettings().riderId;
  return session;
};
const CAREER_FINISH_TRAINING = t2finish;
t2finish = function (horse, session, ...args) {
  const finished = session.finished;
  const report = CAREER_FINISH_TRAINING(horse, session, ...args);
  if (finished || !session.finished || session.automatic || session.riddenMinutes < 5 ||
    !session.log?.some(row => row.exerciseId && row.resultIndex <= 2 && t2exercise(row.exerciseId)?.category !== 'Groundwork')) return report;
  const discipline = session.discipline === 'flatwork' ? 'dressage' : session.discipline;
  if (!session.careerRiderId || !CAREER_SKILL_ROUTES[discipline]) return report;
  const height = Number(session.setup?.height);
  const level = discipline === 'jumping' && height ? SHOW_LEVELS.jumping.find(value => Number(value) >= height) || SHOW_LEVELS.jumping.at(-1)
    : rrSettings().experience[discipline];
  careerPractice(session.careerRiderId, discipline, level, session.id, session.createdHour);
  return report;
};

function careerSponsorOffers(rider, hour = pastureCalendarHour()) {
  if (!careerActive() || !careerState().settings.sponsors) return [];
  const age = careerAge(rider, hour);
  if (age == null) return [];
  const results = careerResults({ riderId: rider.id, from: hour - CAREER_HOURS_PER_YEAR, until: hour });
  return CAREER_SPONSORS.filter(sponsor => {
    const conflict = careerState().contracts.some(contract => contract.riderId === rider.id && contract.category === sponsor.category &&
      contract.endMonth > Math.floor(hour / CAREER_HOURS_PER_MONTH));
    const starts = results.filter(row => row.tier >= sponsor.tier && row.placing && row.placing <= (sponsor.tier >= 6 ? 8 : 12));
    return !conflict && starts.length >= sponsor.starts && (age >= 16 || sponsor.tier <= 3);
  });
}
function careerAcceptSponsor(rider, sponsorId, guardian = false) {
  const sponsor = careerSponsorOffers(rider).find(offer => offer.id === sponsorId);
  if (!sponsor || careerAge(rider) < 18 && !guardian) return false;
  const startMonth = Math.floor(pastureCalendarHour() / CAREER_HOURS_PER_MONTH);
  careerState().contracts.push({ ...sponsor, contractId: rider.id + ':' + sponsorId + ':' + startMonth,
    riderId: rider.id, guardian: careerAge(rider) < 18, startMonth, endMonth: startMonth + 7, paid: [] });
  return true;
}
function careerCredit(key, amount, date, label) {
  const economy = app.careEconomy ||= { receipts: [], inventory: [], operations: {} };
  if (economy.operations[key]) return false;
  const receipt = { number: 'CARE-' + (economy.receipts.length + 1), date: Math.floor(date / 24),
    kind: label, direction: 'income', total: amount, status: 'Received',
    items: [{ name: label, quantity: 1, unitPrice: amount }] };
  economy.operations[key] = receipt;
  economy.receipts.push(receipt);
  app.money += amount;
  return true;
}
function careerPaySponsors(month) {
  const world = careerState();
  for (const contract of world.contracts) {
    if (contract.startMonth >= month || contract.endMonth <= month || contract.paid.includes(month)) continue;
    careerCredit('career-stipend:' + (contract.contractId || contract.riderId) + ':' + month,
      contract.stipend,month * CAREER_HOURS_PER_MONTH,(contract.name || 'Career sponsor') + ' monthly support');
    contract.paid.push(month);
  }
  if (careerActive() && world.settings.background) for (const rider of world.npcs || []) {
    const sponsor = rider.sponsor;
    if (!sponsor || sponsor.startMonth >= month || sponsor.endMonth <= month || sponsor.paidMonth === month) continue;
    rider.sponsorResources = (rider.sponsorResources || 0) + sponsor.stipend;
    sponsor.paidMonth = month;
  }
}
function careerSponsorBonus(rider, event, row) {
  if (!row?.placing || row.placing > 3) return;
  const month = Math.floor(event.at / CAREER_HOURS_PER_MONTH);
  for (const contract of careerState().contracts) {
    if (contract.riderId === rider.id && month >= contract.startMonth && month < contract.endMonth && event.tier >= contract.tier) {
      careerCredit('career-podium:' + contract.contractId + ':' + event.id,contract.bonus,event.at,contract.name + ' podium bonus');
    }
  }
}

const CAREER_PREMIUMS = [0,.01,.03,.06,.08,.10,.10,.14,.20,.27,.35,.35];
function careerHorseRecord(horse) {
  const rows = (horse.showResults || []).filter(row => row.career?.official);
  const completed = rows.filter(row => row.placing && !row.status);
  const top = completed.filter(row => row.placing <= 10).sort((a,b) => b.career.tier - a.career.tier);
  const recent = rows.slice(-10);
  const consistency = recent.length ? recent.filter(row => row.placing && !row.status).length / recent.length : 0;
  const tier = top[0]?.career.tier ?? 0;
  const supporting = top.filter(row => row.career.tier >= tier - 1).length;
  const premium = CAREER_PREMIUMS[tier] * (.45 + .35 * Math.min(1, supporting / 5) + .2 * consistency);
  return {
    starts: rows.length, wins: completed.filter(row => row.placing === 1).length,
    podiums: completed.filter(row => row.placing <= 3).length, clears: completed.filter(row => row.career.clear).length,
    best: top[0], highest: completed.slice().sort((a,b) => b.career.tier - a.career.tier)[0],
    majors: rows.filter(row => row.career.tier >= 10).length,
    majorWins: completed.filter(row => row.career.tier >= 10 && row.placing === 1).length,
    premium, recent, prestige: top[0]?.career.prestige || 0
  };
}
const CAREER_PRICE = calculateHorsePrice;
calculateHorsePrice = function (horse, ...args) {
  const official = (horse.showResults || []).filter(row => row.career?.official);
  if (!official.length) return CAREER_PRICE(horse, ...args);
  const awarded = official.filter(row => row.awarded);
  const baseline = {
    ...horse,
    showResults: (horse.showResults || []).filter(row => !row.career?.official),
    earnings: Math.max(0, (horse.earnings || 0) - awarded.reduce((sum,row) => sum + (row.prize || 0),0)),
    championships: Math.max(0, (horse.championships || 0) - awarded.filter(row => row.placing === 1).length),
    reserves: Math.max(0, (horse.reserves || 0) - awarded.filter(row => row.placing === 2).length)
  };
  return Math.round(CAREER_PRICE(baseline, ...args) * (1 + careerHorseRecord(horse).premium));
};
const CAREER_BARN_EVENT = createBarnShowEvent;
createBarnShowEvent = function (options = {}) {
  const event = CAREER_BARN_EVENT(options);
  if (!event) return event;
  // Existing game-hosted classes are recognized locally. The star-rated calendar is explicitly sanctioned in game.
  const tier = event.barnId === app.currentBarn?.id ? 1 : 2;
  event.careerClassification = { tier, official: true, prestige: CAREER_TIERS[tier].prestige, ranking: 'none' };
  return event;
};
const CAREER_USER_EVENT = createCalendarHorseShow;
createCalendarHorseShow = function (data) {
  const result = CAREER_USER_EVENT(data);
  if (result.ok) result.event.careerClassification = { tier: 0, official: false, prestige: CAREER_TIERS[0].prestige, ranking: 'none' };
  return result;
};
const CAREER_EVENT_LABEL = calendarSpecialLabel;
calendarSpecialLabel = function (event) {
  const label = CAREER_EVENT_LABEL(event);
  return event.careerClassification ? label + ' · ' + CAREER_TIERS[event.careerClassification.tier].label : label;
};

const CAREER_DRESSAGE_TESTS = {
  Special: [
    ['Entry and halt','Walk','Left',{ transition:true, coefficient:2 }],
    ['Extended trot diagonal','Trot','Left',{}], ['Passage to piaffe','Trot','Right',{ collected:true, coefficient:2 }],
    ['Extended walk','Walk','Right',{}], ['Canter half-pass','Canter','Left',{ collected:true }],
    ['Canter pirouette','Canter','Right',{ circle:true, collected:true, coefficient:2 }],
    ['Collected trot transition','Trot','Left',{ transition:true, downward:true }],
    ['Final halt','Walk','Left',{ transition:true, downward:true, coefficient:2 }]
  ],
  Freestyle: [
    ['Musical entrance','Trot','Left',{}], ['Passage arc','Trot','Left',{ collected:true }],
    ['Extended trot diagonal','Trot','Right',{}], ['Canter departure on the beat','Canter','Right',{ transition:true }],
    ['Canter half-pass to pirouette','Canter','Right',{ collected:true, circle:true, coefficient:2 }],
    ['Change of rein and rhythm','Canter','Left',{}], ['Passage and piaffe sequence','Trot','Left',{ collected:true, coefficient:2 }],
    ['Musical finish and salute','Walk','Left',{ transition:true, downward:true, coefficient:2 }]
  ]
};
function careerConfigureSession(session, event) {
  const test = CAREER_DRESSAGE_TESTS[event.course];
  if (event.discipline === 'dressage' && test) {
    session.movementPlan = test.map(([name,gait,rein,details]) => ({ name,gait,rein,...details }));
  }
  if (event.discipline === 'eventing' && event.course) {
    for (const step of session.steps.filter(step => step.stage === 'main_round' && step.phase === 'cross-country phase')) {
      step.routeDistance = event.course === 'Long' ? 110 : 75;
    }
  }
}

function careerOrdinaryField(show) {
  const roster = careerRoster();
  const usedNames = new Set([horseNameKey(show.competitors.find(row => row.player)?.name)]);
  const difficulty = levelIndex(show.discipline, show.level);
  const desired = show.competitors.filter(row => !row.player).length;
  const event = { id: show.id, discipline: show.discipline, level: show.level, at: show.classTime ?? pastureCalendarHour() };
  const home = careerCountry(show.eventSnapshot?.country || app.currentBarn?.country);
  const candidates = (careerRosterIndex(roster).byDiscipline.get(show.discipline)||[]).filter(rider => rider.specialty===show.discipline && !rider.retired && rider.horses.length && (!careerActive() || !careerBusy(rider.recentStarts || [],event)) && careerAge(rider,event.at) >= 6 && careerAge(rider,event.at) < 68)
    .map(rider => ({ rider, horse: rider.horses[0], draw: careerRoll(show.id, rider.id) + (rider.country === home ? -.38 : 0) }));
  candidates.sort((a,b) => a.draw - b.draw);
  const picked = candidates.filter(({horse}) => {
    const key = horseNameKey(horse.name);
    if (usedNames.has(key)) return false;
    usedNames.add(key);
    return true;
  }).slice(0,desired);
  let index = 0;
  for (const entry of show.competitors) {
    if (entry.player || !picked[index]) continue;
    const pair = picked[index++];
    const identity = careerNpcEntry(event, { ...pair, score: pair.horse.skills[show.discipline] }, entry.startOrder - 1);
    // Ordinary shows retain the established course, pacing and difficulty.
    Object.assign(entry, { horseId: identity.horseId, name: identity.name, horseName: identity.horseName,
      horse: identity.horse, riderId: identity.riderId, riderName: identity.riderName, country: identity.country, difficulty });
    if (careerActive()) {
      entry.skills.discipline = (pair.rider.skill + pair.horse.skills[show.discipline]) / 2;
      entry.riderAbilities = identity.riderAbilities;
      entry.riderLevel = identity.riderLevel;
    }
  }
}

const CAREER_CREATE_SHOW = showCreate;
showCreate = function (horse, session, event, entryId) {
  if (event?.careerEvent) careerConfigureSession(session,event);
  const show = CAREER_CREATE_SHOW(horse,session,event,entryId);
  if (!event?.careerEvent) {
    careerOrdinaryField(show);
    show.careerRider = event?.registeredEntries?.find(row=>row.entryId===entryId)?.careerRider || careerRider();
    return show;
  }
  const rider = careerRider();
  show.careerRider = rider;
  const player = show.competitors.find(row => row.player);
  player.riderId = rider.id;
  player.riderName = rider.name;
  player.country = rider.country;
  const field = careerNpcField(event, event.npcCount, rider).map((pair,index) => careerNpcEntry(event,pair,index));
  field.splice(Math.min(field.length, 3), 0, player);
  field.forEach((row,index) => { row.startOrder = index + 1; });
  show.competitors = field;
  show.npcCount = field.length - 1;
  show.travelDurationHours = event.country === app.currentBarn?.country ? 3 : 12;
  const actualCount = show.competitors.length;
  show.eventSnapshot.npcCount = actualCount - 1;
  show.eventSnapshot.fieldSize = actualCount;
  show.home = false;
  show.stage = 'entry';
  return show;
};

function careerShowClass(show) {
  const event = show.eventSnapshot;
  if (event?.careerEvent) return event;
  const classification = event?.careerClassification;
  return { id:show.id, classId:event?.id || show.id, at:show.classTime ?? pastureCalendarHour(), name:show.name,
    barnName:show.venue, discipline:show.discipline, level:show.level, tier:classification?.tier || 0,
    prestige:classification?.prestige ?? CAREER_TIERS[0].prestige, division:classification?.division || 'senior',
    official:classification?.official === true, userHosted:event?.userHosted === true, sandbox:event?.userHosted === true, ranking:'none' };
}

function careerBookedRider(show,player) {
  if (show.careerRider) return show.careerRider;
  const profiles=rrSettings().profiles;
  const id=show.profileRiderId || (profiles.some(profile=>profile.id===player?.riderId) ? player.riderId : null);
  const profile=id ? profiles.find(profile=>profile.id===id) : profiles.length===1 ? profiles[0] : null;
  return profile && {id:profile.id,name:profile.name,country:profile.career?.country};
}
function careerShowStandings(show) {
  return show.finalStandings.map(row => row.player ? {...row,entryId:show.id} : row);
}
const CAREER_PERSIST_SHOW = showPersistResults;
showPersistResults = function (show) {
  const event = careerShowClass(show);
  // Sandbox results share the career history but are kept out of the horse's
  // official result array, which also feeds titles, pricing and achievements.
  const modernSandbox = event.careerEvent && event.sandbox;
  const result = modernSandbox || !show.finalStandings?.some(row => row.player) ? undefined : CAREER_PERSIST_SHOW(show);
  const playerStanding=show.finalStandings?.find(row=>row.player);
  const rider=playerStanding && careerBookedRider(show,playerStanding);
  if (!rider) return result;
  const meet = careerRecordMeet(event,careerShowStandings(show),rider);
  const row = modernSandbox ? null : showHorse(show)?.showResults?.find(record => record.entryId === show.id);
  if (row) {
    const player = meet.results.find(record => record.player);
    if (player) Object.assign(row,{ riderId:player.riderId,riderName:player.riderName,classId:meet.classId,
      participationStatus:player.status,showPoints:player.showPoints });
    row.career = { official:meet.official,tier:meet.tier,prestige:meet.prestige,division:meet.division,
      series:meet.series,clear:player?.clear };
  }
  return result;
};

function careerAllocatedHorse(event, rider, sourceHorse) {
  const horse = baseHorse('trained','npc');
  horse.id = event.id + ':allocated:' + rider.id;
  horse.name = 'Arena Schoolmaster ' + (1 + Math.floor(careerRoll(event.id,rider.id) * 12));
  horse.age = 10;
  horse.ageMonths = 120;
  horse.behavior = 900;
  horse.requiresBreakingIn = false;
  horse.tack = { ...sourceHorse?.tack };
  horse.medicalConditions = [];
  horse.illnesses = [];
  for (const key of Object.keys(horse.stats.jumping)) horse.stats.jumping[key] = 78;
  horse.potential.jumping = 85;
  horse.owner = 'World Youth Arena Games';
  horse.isCareerAllocation = true;
  return horse;
}
const CAREER_FIND_HORSE = t2findHorse;
t2findHorse = function (id) {
  return CAREER_FIND_HORSE(id) || app.career?.allocations[id] || null;
};
const CAREER_FINISH_SHOW = showFinish;
showFinish = function (show) {
  const result = CAREER_FINISH_SHOW(show);
  if (app.career?.allocations[show.horseId]) delete app.career.allocations[show.horseId];
  return result;
};
function careerEnter(event, horse) {
  const world = careerState(), rider = careerRider();
  if (!event || (event.games || event.gamesTrial) && !world.settings.games || event.at < pastureCalendarHour() + (typeof showBookingLeadHours86==='function'?showBookingLeadHours86(event):24) || event.at > pastureCalendarHour() + 90 * 24 ||
    world.meets[event.id] || event.registeredEntries?.length) return { ok: false, message: 'This class is closed.' };
  const earliest = typeof showBookingLeadHours86==='function'?showBookingLeadHours86(event):event.country===app.currentBarn?.country?24:60;
  if (event.at < pastureCalendarHour() + earliest) return { ok: false, message: 'There is too little time to reach this fixed-date class.' };
  if (app.activeShow || app.competitionRpg) return { ok: false, message: 'Finish the active show before entering another class.' };
  const problem = careerEligibility(event, rider, event.allocated ? null : horse);
  if (problem) return { ok: false, message: problem };
  if (!horse) return { ok: false, message: 'Choose an eligible horse or a horse with suitable tack for the allocation.' };
  if (event.team || event.games) {
    const candidates = careerNpcField(event, Infinity, null, true);
    const team = candidates.filter(pair => pair.rider.country === rider.country);
    const max = event.quota || event.team;
    const recent = careerResults({ riderId: rider.id, discipline: event.discipline, until: event.at, from: event.at - CAREER_HOURS_PER_YEAR });
    const performance = recent.filter(row => row.placing && row.placing <= 10 && row.tier >= (event.division === 'senior' ? 5 : 3)).length;
    const athleteSkill = Object.values(rider.abilities).reduce((a,b) => a+b,0) / RR_ABILITIES.length;
    const horseSkill = event.allocated ? 78 : effectiveDisciplineSkill(horse,event.discipline);
    const score = athleteSkill * .35 + horseSkill * .35 + Math.min(30, performance * 8);
    if (event.team && team.length + 1 < event.team) return { ok: false, message: 'Your federation cannot field a complete qualified squad for this class.' };
    if (team.length >= max && score < team[max - 1].selection) return { ok: false, message: 'The federation has filled its quota with stronger qualified combinations. You are on the reserve list.' };
  }
  if (app.money < event.entryFee) return { ok: false, message: 'Insufficient funds for entry.' };
  const allocated = event.allocated ? careerAllocatedHorse(event,rider,horse) : null;
  const mount = allocated || horse;
  const validation = validateCalendarEquipment(mount,event.discipline,event.level,calendarEntrySnapshot(event));
  if (!validation.valid) return { ok: false, message: validation.messages.join(' ') };
  if (allocated) world.allocations[mount.id] = mount;
  app.money -= event.entryFee;
  const session = buildCompetitionRpgSession(mount,event.discipline,event.level);
  const show = showCreate(mount,session,event,event.id + ':player');
  show.qualifiedForGames = Boolean(event.games);
  show.federationSelection = event.team || event.games ? { country: rider.country, status: 'Selected', riderId: rider.id } : null;
  session.calendarEventSnapshot = show.eventSnapshot;
  if (allocated) show.feedback = 'Your allocated horse is available for familiarization during show preparation.';
  saveGame(false);
  return { ok: true, show };
}

const SPECIALIST_RANKINGS_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const result=SPECIALIST_RANKINGS_LOAD(...args);if(app.career){if(app.career.npcs)careerRoster();if(app.career.rankingHour)careerPublish(app.career.rankingHour,{repair:true});}return result;};
