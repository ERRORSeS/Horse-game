// Fictional regulations. Levels refer to the existing discipline and scoring engines.
const CAREER_TIERS = [
  { label: 'Schooling / club', prestige: 3, purse: 1, national: 0 },
  { label: 'Local recognized', prestige: 9, purse: 2, national: 5 },
  { label: 'Regional', prestige: 21, purse: 4, national: 10 },
  { label: 'National', prestige: 34, purse: 7, national: 20 },
  { label: 'National championship', prestige: 49, purse: 10, national: 35 },
  { label: 'International 1★', prestige: 46, purse: 12 },
  { label: 'International 2★', prestige: 56, purse: 18 },
  { label: 'International 3★', prestige: 66, purse: 28 },
  { label: 'International 4★', prestige: 79, purse: 45 },
  { label: 'International 5★', prestige: 90, purse: 75 },
  { label: 'International major / final', prestige: 96, purse: 110 },
  { label: 'World championship', prestige: 100, purse: 130 }
];

const CAREER_WORLD_POINTS = {
  jumping: [30, 45, 70, 100, 140, 180, 200],
  dressage: [35, 50, 75, 100, 130, 170, 200],
  eventing: [30, 45, 70, 105, 160, 190, 200],
  hunter: [25, 35, 50, 65, 80, 90, 120]
};

const CAREER_AGE_DIVISIONS = {
  leadline: { label: 'Leadline / introductory', ages: [6, 8] },
  kids: { label: 'Kids', ages: [7, 11] },
  prechildren: { label: 'Pre-Children', ages: [10, 12] },
  children: { label: 'Children', ages: [12, 14] },
  pony: { label: 'Pony Riders', ages: [12, 16] },
  junior: { label: 'Juniors', ages: [14, 18] },
  young: { label: 'Young Riders', ages: [16, 21] },
  u25: { label: 'U25', ages: [16, 25] },
  senior: { label: 'Open / Senior', ages: [16, 100] },
  amateur: { label: 'Amateur', ages: [18, 100], amateur: true },
  professional: { label: 'Professional', ages: [18, 100], professional: true }
};

const CAREER_COUNTRIES = {
  FRA: ['France', 'Europe', 'Paris'], GER: ['Germany', 'Europe', 'Aachen'],
  NED: ['Netherlands', 'Europe', 'Rotterdam'], BEL: ['Belgium', 'Europe', 'Brussels'],
  GBR: ['United Kingdom', 'Europe', 'London'], IRL: ['Ireland', 'Europe', 'Dublin'],
  ITA: ['Italy', 'Europe', 'Rome'], ESP: ['Spain', 'Europe', 'Madrid'],
  SUI: ['Switzerland', 'Europe', 'Geneva'], SWE: ['Sweden', 'Europe', 'Stockholm'],
  USA: ['United States', 'Americas', 'Lexington'], CAN: ['Canada', 'Americas', 'Calgary'],
  BRA: ['Brazil', 'Americas', 'São Paulo'], MEX: ['Mexico', 'Americas', 'Mexico City'],
  KAZ: ['Kazakhstan', 'Asia', 'Almaty'], JPN: ['Japan', 'Asia', 'Tokyo'],
  CHN: ['China', 'Asia', 'Hangzhou'], QAT: ['Qatar', 'Asia', 'Doha'],
  UAE: ['United Arab Emirates', 'Asia', 'Abu Dhabi'], KOR: ['South Korea', 'Asia', 'Seoul'],
  AUS: ['Australia', 'Oceania', 'Sydney'], NZL: ['New Zealand', 'Oceania', 'Auckland'],
  RSA: ['South Africa', 'Africa', 'Cape Town']
};

const CAREER_SERIES = [];
function careerClass(id, name, discipline, tier, level, month, options = {}) {
  const official = tier >= 1;
  const division = options.division || 'senior';
  const ranking = options.ranking || (options.horseAge ? 'young-horse' :
    division !== 'senior' ? 'division' : tier >= 5 ? 'world' : official ? 'national' : 'none');
  const base = options.base ?? (ranking === 'world' ? CAREER_WORLD_POINTS[discipline][tier - 5] :
    ranking === 'none' ? 0 : CAREER_TIERS[tier].national ?? 45);
  CAREER_SERIES.push({
    id, name, discipline, tier, level, month, day: options.day ?? 7 + (CAREER_SERIES.length % 18),
    official, division, ranking, base, horseMinAge: options.horseAge || (tier >= 9 ? 8 : tier >= 5 ? 6 : tier >= 3 ? 5 : tier >= 1 ? 4 : 3), minField: official ? 4 : 2, cutoff: tier >= 5 ? 20 : 10,
    star: tier >= 5 && tier <= 9 ? tier - 4 : null, prestige: CAREER_TIERS[tier].prestige,
    ...options
  });
}

for (const [discipline, stem, levels] of [
  ['jumping', 'Showjumping', ['0.70','0.80','0.90','1.10','1.20','1.25','1.30','1.40','1.50','1.60','1.60','1.60']],
  ['dressage', 'Dressage', ['Introductory','Training','Level One','Level Three','Level Four','Prix St Georges','Intermediate','Grand Prix','Grand Prix','Grand Prix','Grand Prix','Grand Prix']],
  ['eventing', 'Eventing', ['Starter','Pre-Entry','Entry','Preliminary','Intermediate','Preliminary','Intermediate','Advanced','Four Star','Four Star','Four Star','Four Star']],
  ['hunter', 'Hunter', ['Poles and Crosspoles','Novice','Pre-Green','Green','Medium','Modified','Regular','Working','Working','Open','Open','Open']]
]) {
  for (let tier = 0; tier < levels.length; tier++) {
    const starCode = { jumping: 'CSI', dressage: 'CDI', eventing: 'CCI', hunter: 'Hunter International ' }[discipline];
    const title = tier < 5 ? ['Schooling Day', 'Local Circuit', 'Regional League', 'National Cup', 'National Championship'][tier]
      : tier < 10 ? starCode + (tier - 4) + '★ Circuit' : tier === 10 ? 'International Masters' : 'World Championship';
    const level = levels[tier] === '1.25' ? '1.20' : levels[tier];
    careerClass(discipline + '-tier-' + tier, stem + ' ' + title, discipline, tier, level, tier % 12 + 1, {
      series: discipline + '-ladder', ...(tier===11 ? {cycle:4,edition:2} : {}), day: 8 + Object.keys(CAREER_WORLD_POINTS).indexOf(discipline),
      ...(discipline === 'eventing' && tier >= 5 ? { course: tier >= 8 ? 'Long' : 'Short' } : {})
    });
  }
}

function careerLeague(id, name, discipline, tier, level, months, rules = {}) {
  for (const [index, month] of months.entries()) {
    const final = rules.final && index === months.length - 1;
    careerClass(id + '-' + month, name + (final ? ' Final' : months.length > 1 ? ' · Leg ' + (index + 1) : ''),
      discipline, final ? Math.max(tier, 10) : tier, level, month, {
        series: id, country: ['QAT','ESP','FRA','GER','GBR','NED','CAN','ITA','SUI'][month % 9],
        ...rules, final: Boolean(final)
      });
  }
}

careerLeague('jumping-world-cup', 'Global Jumping World Cup', 'jumping', 7, '1.40', [1,3,10,12], { final: true, indoor: true });
careerLeague('champions-tour', 'Global Champions Jumping Tour', 'jumping', 8, '1.50', [2,4,6,9,11], { final: true });
careerLeague('nations-jumping', 'World Nations Jumping League', 'jumping', 7, '1.40', [3,6,8,11], { team: 4, count: 3, final: true, ranking: 'team', base: 70 });
careerLeague('continental-jumping', 'Continental Jumping Cup', 'jumping', 6, '1.30', [5,9], { region: 'Europe' });
careerLeague('indoor-masters', 'Global Masters Indoor Series', 'jumping', 8, '1.50', [2,10,11], { indoor: true });
careerLeague('elite-majors', 'International Elite Grand Prix Circuit', 'jumping', 10, '1.60', [3,6,9,12], { major: true });
careerLeague('rising-stars', 'International Rising Stars', 'jumping', 5, '1.20', [4,8], { ranking: 'none', base: 0 });
careerLeague('amateur-gp', 'Amateur Grand Prix League', 'jumping', 3, '1.10', [2,7,11], { division: 'amateur', base: 30 });

careerLeague('dressage-world-cup', 'Dressage World Cup', 'dressage', 7, 'Grand Prix', [2,6,10,12], { indoor: true, final: true });
careerLeague('freestyle', 'Grand Prix Freestyle League', 'dressage', 8, 'Grand Prix', [4,8,11], { course: 'Freestyle' });
careerLeague('dressage-special', 'Grand Prix Special', 'dressage', 9, 'Grand Prix', [5,9], { course: 'Special' });
careerLeague('nations-dressage', 'Dressage Nations Cup', 'dressage', 7, 'Grand Prix', [3,7,11], { team: 3, count: 3, ranking: 'team', base: 75 });
careerLeague('continental-dressage', 'Continental Dressage Championships', 'dressage', 10, 'Grand Prix', [8], { region: 'Europe' });
careerLeague('eventing-development', 'CCI2★ Development Tour', 'eventing', 6, 'Intermediate', [2,6], { course: 'Short' });
careerLeague('eventing-challenge', 'CCI3★ Challenge', 'eventing', 7, 'Advanced', [4,7], { course: 'Long' });
careerLeague('eventing-masters', 'CCI4★ Masters Series', 'eventing', 8, 'Four Star', [4,8], { course: 'Short' });
careerLeague('eventing-majors', 'CCI5★ Elite Majors', 'eventing', 10, 'Four Star', [5,9], { course: 'Long', major: true });
careerLeague('nations-eventing', 'Eventing Nations Cup', 'eventing', 7, 'Advanced', [3,7,10], { team: 4, count: 3, ranking: 'team', base: 70 });
careerLeague('continental-eventing', 'Continental Eventing Championships', 'eventing', 10, 'Four Star', [10], { region: 'Europe' });
careerLeague('hunter-derby', 'National Hunter Derby Tour', 'hunter', 4, 'Working', [2,5,9], { base: 50 });
careerLeague('international-hunter-derby', 'International Hunter Derby Circuit', 'hunter', 8, 'Open', [4,8,11], { base: 90 });
careerLeague('green-hunter', 'Green Hunter Incentive Championship', 'hunter', 4, 'Green', [9], { horseAge: 5, base: 30 });
careerLeague('hunter-amateur', 'National Amateur Hunter League', 'hunter', 3, 'Medium', [4,10], { division: 'amateur', base: 20 });

const CAREER_YOUTH = [
  ['leadline', 'Introductory Riding', 0, 0, 0], ['kids', 'Future Champions Cup', 1, 0, 5],
  ['prechildren', 'Rising Stars Youth Cup', 2, 1, 10], ['children', "Children’s National Finals", 3, 2, 20],
  ['junior', 'Junior Championship', 4, 3, 30], ['young', 'Young Rider Masters', 5, 4, 65],
  ['u25', 'U25 International Challenge', 6, 5, 75]
];
const CAREER_PONY_LEVELS = { jumping: '1.00', dressage: 'Level Two', eventing: 'Pre-Training', hunter: 'Low' };
for (const discipline of Object.keys(CAREER_WORLD_POINTS)) {
  const label = cap(discipline);
  for (const [division, name, tier, level, base] of CAREER_YOUTH) {
    careerLeague(discipline + '-' + division, label + ' ' + name, discipline, tier, SHOW_LEVELS[discipline][level],
      division === 'junior' ? [3,7,10] : [2,8], { division, base });
  }
  careerLeague(discipline + '-pony-national', 'National Pony ' + label + ' Tour', discipline, 4, CAREER_PONY_LEVELS[discipline], [3,7,11],
    { division: 'pony', ponyCm: 148, base: 45 });
  careerLeague(discipline + '-pony-international', 'International Pony ' + label + ' Cup', discipline, 5, CAREER_PONY_LEVELS[discipline], [5,9],
    { division: 'pony', ponyCm: 148, base: 70 });
  for (const age of [4,5,6,7,8]) {
    const levels = {
      jumping: ['0.80','1.00','1.10','1.20','1.30'], dressage: ['Training','Level One','Level Two','Level Three','Level Four'],
      eventing: ['Starter','Entry','Pre-Training','Training','Preliminary'], hunter: ['Pre-Green','Green','Low','Medium','Modified']
    };
    const tier = age === 4 ? 1 : age === 8 ? 3 : 4;
    careerLeague(discipline + '-young-horse-' + age, age + '-Year-Old ' + label + ' Championship', discipline, tier,
      levels[discipline][age - 4], [age + 2, age + 4], { horseAge: age, base: [5,15,25,35,45][age - 4] });
  }
  careerLeague(discipline + '-world-breeding', 'World Young Horse ' + label + ' Final', discipline, 10,
    { jumping: '1.30', dressage: 'Level Four', eventing: 'Preliminary', hunter: 'Modified' }[discipline],
    [11], { horseAge: 7, base: 90, youngFinal: true });
}

careerLeague('junior-nations', 'Junior Nations Cup', 'jumping', 5, '1.20', [4,9],
  { division: 'junior', team: 3, count: 3, ranking: 'team', base: 50 });
careerLeague('pony-nations', 'Pony Nations Challenge', 'jumping', 5, '1.10', [6,10],
  { division: 'pony', ponyCm: 148, team: 4, count: 3, ranking: 'team', base: 70 });
for (const [name, cm] of [['Small', 127], ['Medium', 137], ['Large', 148]]) {
  careerLeague('hunter-pony-' + name.toLowerCase(), name + ' Pony Hunter Derby', 'hunter', 3, 'Green', [5,10],
    { division: 'pony', ponyCm: cm, ponyMinCm: cm === 148 ? 137 : cm === 137 ? 127 : 0, base: 30 });
}

for (const [discipline, level, continentalLevel, horseMinAge] of [
  ['jumping','1.60','1.40',9], ['dressage','Grand Prix','Intermediate',8], ['eventing','Four Star','Advanced',8]
]) {
  careerClass('world-games-' + discipline, 'World Arena Games · ' + cap(discipline), discipline, 11, level, 8, {
    day: 13 + Object.keys(CAREER_WORLD_POINTS).indexOf(discipline), cycle: 4, edition: 0, games: true,
    country: 'FRA', horseMinAge, team: 3, count: 3, quota: 3, ranking: 'championship', base: 0
  });
  for (const month of [2,4,6]) {
    careerClass('asian-trials-' + discipline + '-' + month, 'Asian Continental Games Trial · ' + cap(discipline),
      discipline, 7, continentalLevel, month, { day: 20 + Object.keys(CAREER_WORLD_POINTS).indexOf(discipline),
        cycle: 4, edition: 2, gamesTrial: true, country: 'KAZ', region: 'Asia', horseMinAge, ranking: 'none', base: 0, starters: 40 });
  }
  for (const month of [2,5,7]) {
    careerClass('world-trials-' + discipline + '-' + month, 'World Arena Games Trial · ' + cap(discipline),
      discipline, 8, level, month, { day: 20 + Object.keys(CAREER_WORLD_POINTS).indexOf(discipline),
        cycle: 4, edition: 0, gamesTrial: true, country: 'FRA', horseMinAge, ranking: 'none', base: 0, starters: 40 });
  }
  careerClass('asian-games-' + discipline, 'Asian Continental Games · ' + cap(discipline), discipline, 11, continentalLevel, 9, {
    day: 13 + Object.keys(CAREER_WORLD_POINTS).indexOf(discipline), cycle: 4, edition: 2, games: true,
    country: 'KAZ', region: 'Asia', horseMinAge, team: 4, count: 3, quota: 4, ranking: 'championship', base: 0
  });
}
for (const month of [2,5]) {
  careerClass('youth-games-trial-' + month, 'World Youth Arena Games Trial', 'jumping', 4, '1.10', month, {
    cycle: 4, edition: 1, gamesTrial: true, division: 'junior', ages: [15,18], horseMinAge: 6,
    country: 'JPN', starters: 24, base: 45
  });
}
careerClass('youth-games', 'World Youth Arena Games · Individual Jumping', 'jumping', 11, '1.10', 7, {
  cycle: 4, edition: 1, games: true, country: 'JPN', ages: [15,18], division: 'junior', horseMinAge: 7,
  quota: 2, allocated: true, ranking: 'championship', base: 0
});
careerClass('youth-continental', 'Continental Youth Games · Individual Jumping', 'jumping', 10, '1.10', 7, {
  cycle: 4, edition: 3, games: true, country: 'GER', region: 'Europe', division: 'junior', horseMinAge: 6,
  quota: 2, ranking: 'championship', base: 0
});

const CAREER_SPONSORS = [
  { id: 'silverline', name: 'Silverline Tack', tier: 1, starts: 2, stipend: 100, bonus: 50, category: 'equipment' },
  { id: 'equora', name: 'Equora Nutrition', tier: 2, starts: 3, stipend: 220, bonus: 100, category: 'nutrition' },
  { id: 'arden', name: 'Arden Sport', tier: 3, starts: 3, stipend: 450, bonus: 300, category: 'apparel' },
  { id: 'aster', name: 'Aster Performance', tier: 6, starts: 3, stipend: 900, bonus: 700, category: 'equipment' },
  { id: 'vellmont', name: 'Vellmont Equestrian', tier: 9, starts: 3, stipend: 1800, bonus: 1400, category: 'apparel' }
];
