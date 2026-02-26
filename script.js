const BREEDS = [
  'American Warmblood', 'Baden-Wuerttemberg', 'Bavarian Warmblood', 'Belgian Warmblood', 'Canadian Warmblood',
  'Danish Warmblood', 'Dutch Warmblood', 'Gelderlander', 'Hanoverian', 'Hessen', 'Holsteiner', 'Oldenburg',
  'Polish Warmblood', 'Rhineland', 'Selle Francais', 'Swedish Warmblood', 'Trakehner', 'Westphalian', 'Zweibrucker',
  'Arabian', 'Draft', 'Iberian Horse', 'Riding Pony', 'Thoroughbred', 'Friesian'
];
const COATS = ['Light Chestnut', 'Chestnut', 'Dark Chestnut', 'Liver Chestnut', 'Light Black', 'Bluish Black', 'True Black', 'Light Bay', 'Bay', 'Dark Bay', 'Blood Bay', 'Seal Bay', 'Palomino', 'Cremello', 'Buckskin', 'Perlino', 'Smoky Black', 'Smoky Cream', 'Red Dun', 'Bay Dun', 'Grullo', 'Dunalino', 'Dunskin', 'Gold Champagne', 'Amber Champagne', 'Classic Champagne', 'Pearl', 'Palomino Pearl', 'Buckskin Pearl', 'Grey', 'Dapple Grey', 'Flea-bitten Grey'];
const MARKINGS = ['None', 'Tobiano', 'Frame Overo', 'Splash', 'Sabino', 'Leopard', 'Fewspot', 'Snowcap', 'Blanket', 'Spotted Blanket', 'Varnish Roan', 'Red Roan', 'Bay Roan', 'Blue Roan'];
const CONFORMATION = ['Very Bad', 'Bad', 'Acceptable', 'Good', 'Very Good', 'Excellent'];
const SOCKS = ['None', 'Pastern', 'Fetlock', 'Sock', 'Stocking', 'Full White'];
const FACE_MARKINGS = ['Faint', 'Star', 'Stripe', 'Broken Stripe', 'Blaze', 'Snip', 'Blaze + Snip', 'Bald Face'];

const SHOW_LEVELS = {
  jumping: ['0.70', '0.80', '0.90', '1.00', '1.10', '1.20', '1.30', '1.40', '1.50', '1.60', '1.70', '1.80'],
  dressage: ['Introductory', 'Training', 'Level One', 'Level Two', 'Level Three', 'Level Four', 'Prix St Georges', 'Intermediate', 'Grand Prix'],
  hunter: ['Poles and Crosspoles', 'Novice', 'Pre-Green', 'Green', 'Low', 'Medium', 'Modified', 'Regular', 'Working', 'Open'],
  eventing: ['Starter', 'Pre-Entry', 'Entry', 'Pre-Training', 'Training', 'Preliminary', 'Intermediate', 'Advanced', 'Four Star']
};

const CONFORMATION_SHOW_TYPES = [
  { key: 'bronze', label: 'Bronze Conformation Show', feeMin: 250, feeMax: 1000, difficulty: 0.85, slots: [8, 10] },
  { key: 'silver', label: 'Silver Conformation Show', feeMin: 2500, feeMax: 5500, difficulty: 1, slots: [8, 10] },
  { key: 'golden', label: 'Golden Conformation Show', feeMin: 10000, feeMax: 45000, difficulty: 1.15, slots: [8, 10] },
  { key: 'hoy', label: 'Horse Of The Year', feeMin: 100000, feeMax: 150000, difficulty: 1.28, slots: [8, 10], specialMonth: 12 }
];

const BREED_BRANDINGS = {
  'American Warmblood': 'AW',
  'Baden-Wuerttemberg': 'BWA',
  'Bavarian Warmblood': 'BW',
  'Belgian Warmblood': 'BW',
  'Canadian Warmblood': 'CW',
  'Danish Warmblood': 'DW',
  'Dutch Warmblood': 'DDW',
  'Gelderlander': 'GE',
  'Hanoverian': 'HA',
  'Hessen': 'HE',
  'Holsteiner': 'HO',
  'Oldenburg': 'OLD',
  'Polish Warmblood': 'PW',
  'Rhineland': 'RH',
  'Selle Francais': 'SF',
  'Swedish Warmblood': 'SW',
  'Trakehner': 'TR',
  'Westphalian': 'WE',
  'Zweibrucker': 'ZW',
  'Arabian': 'AR',
  'Draft': 'DR',
  'Iberian Horse': 'IH',
  'Riding Pony': 'RP',
  'Thoroughbred': 'TH',
  'Friesian': 'FR',
  'Cross-Breed': 'CS',
  'Sport Cross': 'SC'
};

const BREED_NORMS = {
  'American Warmblood': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Jumping' },
  'Baden-Wuerttemberg': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage / Jumping' },
  'Bavarian Warmblood': { minHeight: 15.3, maxHeight: 17.2, mainPotential: 'Dressage' },
  'Belgian Warmblood': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping' },
  'Canadian Warmblood': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Hunters' },
  'Danish Warmblood': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage' },
  'Dutch Warmblood': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping / Dressage' },
  'Gelderlander': { minHeight: 15.1, maxHeight: 16.3, mainPotential: 'Dressage' },
  'Hanoverian': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage / Jumping' },
  'Hessen': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Dressage' },
  'Holsteiner': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping' },
  'Oldenburg': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage' },
  'Polish Warmblood': { minHeight: 15.1, maxHeight: 17.0, mainPotential: 'Eventing' },
  'Rhineland': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Dressage / Jumping' },
  'Selle Francais': { minHeight: 15.3, maxHeight: 17.2, mainPotential: 'Jumping' },
  'Swedish Warmblood': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Dressage' },
  'Trakehner': { minHeight: 15.2, maxHeight: 17.1, mainPotential: 'Eventing / Dressage' },
  'Westphalian': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping / Dressage' },
  'Zweibrucker': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Jumping' },
  'Arabian': { minHeight: 14.1, maxHeight: 15.2, mainPotential: 'Eventing' },
  'Draft': { minHeight: 16.2, maxHeight: 18.2, mainPotential: 'Low-level Hunters' },
  'Iberian Horse': { minHeight: 14.3, maxHeight: 16.1, mainPotential: 'Dressage' },
  'Riding Pony': { minHeight: 12.2, maxHeight: 14.2, mainPotential: 'Hunters' },
  'Thoroughbred': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Jumping' },
  'Friesian': { minHeight: 15.3, maxHeight: 17.2, mainPotential: 'Dressage' }
};

const CONFORMATION_MULT = {
  'Very Bad': 0.78,
  Bad: 0.86,
  Acceptable: 0.95,
  Good: 1.02,
  'Very Good': 1.1,
  Excellent: 1.2
};

const SICKNESS_TYPES = [
  { name: 'Colic', impact: 12, severity: 'Severe', surgeryRisk: 18, retirementRisk: 10 },
  { name: 'Broken Leg', impact: 30, severity: 'Very Severe', surgeryRisk: 35, retirementRisk: 35 },
  { name: 'Broken Neck', impact: 40, severity: 'Very Severe', surgeryRisk: 45, retirementRisk: 100 },
  { name: 'Stab Wound', impact: 20, severity: 'Severe', surgeryRisk: 22, retirementRisk: 10 },
  { name: 'Lameness', impact: 14, severity: 'More Than Medium', surgeryRisk: 4, retirementRisk: 8 },
  { name: 'Respiratory Disease', impact: 8, severity: 'Medium', surgeryRisk: 2, retirementRisk: 4 },
  { name: 'Tendon Strain', impact: 12, severity: 'More Than Medium', surgeryRisk: 5, retirementRisk: 6 },
  { name: 'Metabolic Flare', impact: 9, severity: 'Medium', surgeryRisk: 3, retirementRisk: 5 },
  { name: 'Temperature', impact: 6, severity: 'Easy', surgeryRisk: 0, retirementRisk: 2 },
  { name: 'Lung Irritation', impact: 7, severity: 'Medium', surgeryRisk: 2, retirementRisk: 3 }
];

const PERSONALITIES = [
  'Stubborn',
  'Easy-Going',
  'Bomb-proof',
  'Energetic',
  'Spooky',
  'Lazy',
  'Unfocused',
  'Hot-Blooded',
  'Excitable'
];

const LEVEL_SKILL_BANDS = {
  jumping: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[80,90],[90,95],[95,100],[95,100]],
  dressage: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[90,100]],
  eventing: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[90,100]],
  hunter: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[80,90],[95,100]]
};

const DISCIPLINE_SKILLS = {
  jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness']
};

const app = {
  money: 50000,
  month: 1,
  day: 1,
  hour: 0,
  year: 1,
  horses: [],
  semenStraws: [],
  embryos: [],
  saleBarn: [],
  rescueBarn: [],
  npcSales: [],
  npcStuds: [],
  reports: [],
  competitionReports: [],
  rescueHorses: [],
  currentBarn: null,
  barnCatalog: [],
  barnShows: [],
  signedUpShows: [],
  lastBarnRefreshMonth: 0,
  settings: {
    barnName: 'Oxer to Oxer Stable Manager',
    breedingCode: '',
    breedingCodePosition: 'front',
    trainingMode: 'rpg',
    competitionMode: 'rpg'
  },
  showOffspringWindow: true,
  trainingSelection: { horseId: '', discipline: 'jumping', exercise: '' },
  trainingRpgConfig: { walk: 1, trot: 1, canter: 1, discipline: 1, coolDown: 2 },
  trainingRpg: null,
  competitionRpg: null,
  trainingRpgFeedback: '',
  trainingRpgSummary: null,
  selectedHorseId: '',
  showSelections: {},
  vetSelection: { horseId: '', mareId: '', stallionId: '', strawId: '', embryoId: '' },
  trainingClinicSelection: { discipline: 'jumping' },
  trainingHorseScope: 'both',
  competitionHorseScope: 'both',
  calendarReminders: [],
  closedReminderIds: [],
  upcomingEvents: [],
  lessonHorsesByBarn: {},
  barnLessonSelectionId: '',
  barnHorseSelectionId: '',
  marketSelections: {},
  stablehandHired: false
};

const options = {};
const SAVE_KEY = 'horse_game_save_v1';
const tabs = ['dashboard', 'horses', 'barn', 'market', 'sales', 'stud', 'shows', 'vet', 'farrier', 'training', 'breeding', 'registries', 'breeders', 'freezer', 'rescue', 'calendar', 'settings'];

const uid = () => Math.random().toString(36).slice(2, 9);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const money = (v) => `$${Math.round(v).toLocaleString()}`;
const dateLabel = () => `Y${app.year}M${app.month}`;
const cap = (t) => t[0].toUpperCase() + t.slice(1);
const starText = (n) => '★'.repeat(clamp(Number(n) || 1, 1, 5));

function shuffledIndices(size) {
  const indexes = Array.from({ length: Math.max(0, size) }, (_, i) => i);
  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = rnd(0, i);
    const temp = indexes[i];
    indexes[i] = indexes[j];
    indexes[j] = temp;
  }
  return indexes;
}

function rolledPersonality(gender = 'Mare') {
  const roll = rnd(1, 100);
  if (gender === 'Stallion') {
    if (roll <= 33) return 'Hot-Blooded';
    if (roll <= 58) return 'Excitable';
  } else if (gender === 'Mare') {
    if (roll <= 25) return 'Hot-Blooded';
    if (roll <= 55) return 'Excitable';
  } else if (gender === 'Gelding') {
    if (roll <= 8) return 'Hot-Blooded';
    if (roll <= 16) return 'Excitable';
  }
  return pick(PERSONALITIES.filter((p) => !['Hot-Blooded', 'Excitable'].includes(p)));
}

function randomBarnName(allowRepeat = false) {
  const suffix = pick(BARN_SUFFIXES);
  const ending = pick(BARN_ENDINGS);
  return `${suffix} ${ending}`;
}

function currentMonthAbsolute() {
  return app.year * 12 + app.month;
}

function transportCost(fromCountry, toCountry) {
  if (!fromCountry || !toCountry || fromCountry === toCountry) return rnd(1000, 2000);
  return rnd(20000, 40000);
}

function boardPriceByStars(stars) {
  const s = clamp(Number(stars) || 1, 1, 5);
  if (s === 5) return rnd(1500, 2500);
  if (s === 4) return rnd(1100, 1800);
  if (s === 3) return rnd(950, 1500);
  if (s === 2) return rnd(650, 900);
  return rnd(250, 650);
}

function ensureBarnState() {
  if (!app.currentBarn) {
    const country = 'USA';
    const city = pick(BARN_COUNTRIES[country]);
    app.currentBarn = {
      id: uid(),
      name: app.settings?.barnName || 'Oxer to Oxer Stable Manager',
      country,
      city,
      careStars: 3,
      facilityStars: 3,
      eventsStars: 3,
      lessonsStars: 3,
      boardPerHorse: boardPriceByStars(3)
    };
  }
  if (!Array.isArray(app.barnCatalog) || !app.barnCatalog.length) {
    refreshBarnCatalog(true);
  }
  if (!Array.isArray(app.barnShows) || !app.barnShows.length) {
    refreshBarnShows();
  }
  ensureLessonRosterForBarn(app.currentBarn);
}

function refreshBarnCatalog(force = false) {
  const now = currentMonthAbsolute();
  if (!force && app.lastBarnRefreshMonth && now - app.lastBarnRefreshMonth < 4) return false;
  app.lastBarnRefreshMonth = now;
  const existingNames = new Set();
  app.barnCatalog = Object.entries(BARN_COUNTRIES).flatMap(([country, cities]) => Array.from({ length: 10 }, () => {
    let name = randomBarnName();
    let attempts = 0;
    while (existingNames.has(name) && rnd(1, 100) > 5 && attempts < 12) {
      name = randomBarnName();
      attempts += 1;
    }
    existingNames.add(name);
    const careStars = rnd(1, 5);
    const facilityStars = rnd(1, 5);
    const eventsStars = rnd(1, 5);
    const lessonsStars = rnd(1, 5);
    return {
      id: uid(),
      name,
      country,
      city: pick(cities),
      careStars,
      facilityStars,
      eventsStars,
      lessonsStars,
      boardPerHorse: boardPriceByStars(Math.round((careStars + facilityStars) / 2))
    };
  }));
  return true;
}

function barnFacilityTurnoutRange(stars) {
  const s = clamp(Number(stars) || 1, 1, 5);
  if (s === 1) return [1, 2];
  if (s === 2) return [2, 3];
  if (s === 3) return [3, 6];
  if (s === 4) return [6, 8];
  return [8, 14];
}


function lessonAvailabilityBase(lessonStars) {
  const stars = clamp(Number(lessonStars) || 1, 1, 5);
  if (stars === 1) return 35;
  if (stars === 2) return 45;
  if (stars === 3) return 55;
  if (stars === 4) return 65;
  return 75;
}

function lessonHorseTargetCount(facilityStars) {
  const stars = clamp(Number(facilityStars) || 1, 1, 5);
  if (stars === 1) return 3;
  if (stars === 2) return 7;
  if (stars === 3) return 11;
  if (stars === 4) return 15;
  return 20;
}

function createLessonHorse(barn) {
  const horse = baseHorse('trained', 'npc');
  horse.owner = 'Lesson Program';
  horse.isLessonHorse = true;
  horse.lessonBarnId = barn?.id || '';
  horse.barnAvailabilityPercent = clamp(lessonAvailabilityBase(barn?.lessonsStars || 3) + rnd(-5, 10), 35, 85);
  horse.barnAvailable = rnd(1, 100) <= horse.barnAvailabilityPercent;
  horse.leaseLocked = true;
  horse.feedPlan = [];
  horse.turnoutAssignmentHours = 0;
  return horse;
}

function ensureLessonRosterForBarn(barn, refreshAvailability = false) {
  if (!barn?.id) return [];
  app.lessonHorsesByBarn = typeof app.lessonHorsesByBarn === 'object' && app.lessonHorsesByBarn ? app.lessonHorsesByBarn : {};
  let roster = Array.isArray(app.lessonHorsesByBarn[barn.id]) ? app.lessonHorsesByBarn[barn.id] : [];
  const target = clamp(lessonHorseTargetCount(barn.facilityStars), 1, 20);
  while (roster.length < target) roster.push(createLessonHorse(barn));
  if (roster.length > target) roster = roster.slice(0, target);
  const base = lessonAvailabilityBase(barn.lessonsStars);
  roster.forEach((h) => {
    h.owner = 'Lesson Program';
    h.isLessonHorse = true;
    h.lessonBarnId = barn.id;
    h.leaseLocked = true;
    if (refreshAvailability || !Number.isFinite(h.barnAvailabilityPercent)) {
      h.barnAvailabilityPercent = clamp(base + rnd(-5, 10), 35, 85);
      h.barnAvailable = rnd(1, 100) <= h.barnAvailabilityPercent;
    } else if (typeof h.barnAvailable !== 'boolean') {
      h.barnAvailable = rnd(1, 100) <= h.barnAvailabilityPercent;
    }
  });
  app.lessonHorsesByBarn[barn.id] = roster;
  return roster;
}


function currentBarnLessonHorses() {
  return ensureLessonRosterForBarn(app.currentBarn);
}

function horsesIncludingLessons() {
  return [...app.horses, ...currentBarnLessonHorses()];
}

function competitionEligibleHorses() {
  const scope = ['private', 'lesson', 'both'].includes(app.competitionHorseScope) ? app.competitionHorseScope : 'both';
  const privateHorses = app.horses.filter((h) => !h.retiredForever);
  const lessonHorses = currentBarnLessonHorses();
  if (scope === 'private') return privateHorses;
  if (scope === 'lesson') return lessonHorses;
  return [...privateHorses, ...lessonHorses];
}

function showTransportFee(show) {
  if (!show) return 0;
  if (Number.isFinite(show.transportFee)) return show.transportFee;
  if (show.barnId && app.currentBarn?.id && show.barnId === app.currentBarn.id) return 0;
  if (show.country && app.currentBarn?.country && show.country === app.currentBarn.country) return 800;
  return 12000;
}

function createBarnShowEvent(options = {}) {
  const venues = [app.currentBarn, ...(app.barnCatalog || []).filter((b) => b.id !== app.currentBarn.id)].filter(Boolean);
  if (!venues.length) return null;
  const foreignVenues = venues.filter((v) => v.country !== app.currentBarn.country);
  const discipline = options.discipline || pick(DISCIPLINES);
  let venue = options.venue;
  if (!venue) {
    venue = rnd(1, 100) <= 45 ? app.currentBarn : pick(venues);
    if (options.forceCurrentBarn) venue = app.currentBarn;
    if (options.forceForeignVenue && foreignVenues.length) venue = pick(foreignVenues);
    if (options.forceSameCountryVenue) {
      const sameCountryVenues = venues.filter((v) => v.country === app.currentBarn.country && v.id !== app.currentBarn.id);
      if (sameCountryVenues.length) venue = pick(sameCountryVenues);
    }
  }
  const transportFee = venue.id === app.currentBarn.id ? 0 : venue.country === app.currentBarn.country ? rnd(300, 1200) : rnd(7000, 18000);
  return {
    id: uid(),
    barnId: venue.id,
    barnName: venue.name,
    country: venue.country,
    city: venue.city,
    fee: rnd(120, 1800),
    transportFee,
    discipline,
    maxSkill: options.maxSkill ?? 100,
    level: options.level || pick(SHOW_LEVELS[discipline] || []),
    month: options.month ?? app.month,
    year: options.year ?? app.year,
    isUpcomingEvent: options.isUpcomingEvent === true,
    monthsUntilStart: Number.isFinite(options.monthsUntilStart) ? Math.max(0, Math.floor(options.monthsUntilStart)) : 0
  };
}

function ensureUpcomingEventsPool(target = 6) {
  app.upcomingEvents = Array.isArray(app.upcomingEvents) ? app.upcomingEvents : [];
  while (app.upcomingEvents.length < target) {
    const event = createBarnShowEvent({
      maxSkill: rnd(75, 100),
      isUpcomingEvent: true,
      monthsUntilStart: rnd(1, 6)
    });
    if (!event) break;
    app.upcomingEvents.push(event);
  }
}

function refreshBarnShows() {
  if (!app.currentBarn) return;
  const eventsStars = app.currentBarn?.eventsStars || 1;
  const maxSkill = eventsStars <= 2 ? 20 : eventsStars === 3 ? 50 : eventsStars === 4 ? 70 : 100;
  const showCount = rnd(3, 10);
  const keySet = new Set();
  const shows = [];

  const addShow = (options = {}) => {
    let attempts = 0;
    while (attempts < 30) {
      const show = createBarnShowEvent({ ...options, maxSkill });
      if (!show) break;
      const key = `${show.barnId}-${show.discipline}-${show.level}`;
      if (!keySet.has(key)) {
        keySet.add(key);
        shows.push(show);
        return true;
      }
      attempts += 1;
    }
    return false;
  };

  // Keep monthly "happening now" variety: same barn (if stars are high enough), same country, and foreign country.
  if (eventsStars >= 3) addShow({ forceCurrentBarn: true });
  addShow({ forceSameCountryVenue: true });
  addShow({ forceForeignVenue: true });

  while (shows.length < showCount) {
    let attempts = 0;
    while (attempts < 30) {
      const show = createBarnShowEvent({
        maxSkill
      });
      if (!show) break;
      const key = `${show.barnId}-${show.discipline}-${show.level}`;
      if (!keySet.has(key)) {
        keySet.add(key);
        shows.push(show);
        break;
      }
      attempts += 1;
    }
    if (attempts >= 30) break;
  }
  app.barnShows = shows.slice(0, 10);
  ensureUpcomingEventsPool();
}

const POSITIVE_MOODS = ['Motivated', 'Happy', 'Try-Hard'];
const NEGATIVE_MOODS = ['Distress', 'Bad moods', 'Grumpy', 'No energy', 'Overly-Active', 'Uncomfortable'];
const BARN_COUNTRIES = {
  USA: ['Lexington', 'Wellington', 'Ocala', 'Tryon', 'Aiken'],
  Germany: ['Warendorf', 'Hamburg', 'Munich', 'Berlin', 'Cologne'],
  Netherlands: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Arnhem', 'Eindhoven'],
  France: ['Paris', 'Lyon', 'Caen', 'Bordeaux', 'Nantes'],
  UK: ['London', 'Birmingham', 'Leeds', 'Manchester', 'Bristol']
};
const BARN_SUFFIXES = ['Raven', 'Hoof', 'Flying', 'Winged', 'Apollo', 'Myth', 'Belivers', 'Pine', 'Willow', 'Elite', 'Bronze', 'Golden', 'Diamond', 'Crystal', 'Domino', 'Alpine', 'Red', 'Yellow', 'Orange', 'Green', 'Pink', 'Dance', 'Flow', 'Melody', 'Orchestre'];
const BARN_ENDINGS = ['Acres', 'Ranch', 'Equine Facility', 'Stables', 'Farms'];
const DISCIPLINES = ['dressage', 'eventing', 'jumping', 'hunter'];

const ENVIRONMENT_OPTIONS = {
  wind: ['Calm', 'Light breeze', 'Steady wind', 'Gusty'],
  noise: ['Quiet', 'Mild arena chatter', 'Busy and noisy', 'Unexpected loud sounds'],
  footing: ['Consistent and springy', 'A little deep', 'Slightly slick in spots', 'Choppy and uneven'],
  nearby: ['No nearby horses', 'One horse schooling nearby', 'Several horses nearby', 'Crowded schooling ring'],
  visual: ['moving shadows', 'fluttering banners', 'an open gate', 'birds lifting from the fence line', 'a barking dog in the distance']
};

const TRAINING_EVENT_POOL = {
  funny: ['A loud sneeze breaks the halt and earns a surprised ear flick.', 'A playful hop pops up between aids, more silly than dangerous.', 'A dramatic head toss appears for two strides before settling.'],
  scary: ['A tarp snaps at the arena edge and tension runs through the neck.', 'A sudden clatter at the gate causes a quick shy off line.', 'A sharp noise sparks a brief bolt thought before control returns.'],
  realistic: ['A perfect transition lands exactly on your aid.', 'There is a brief misunderstanding of the aid, then a soft correction.', 'The first really confident jump effort appears in good balance.']
};

const BARN_TRAIL_VARIANTS = [
  { title: 'Calm Walk Along Woods', options: [
    { success: 90, neutral: 10, fail: 0 },
    { success: 85, neutral: 10, fail: 5 },
    { success: 75, neutral: 15, fail: 10 },
    { success: 80, neutral: 15, fail: 5 }
  ] },
  { title: 'Encounter With Creek', options: [
    { success: 80, neutral: 15, fail: 5 },
    { success: 85, neutral: 10, fail: 5 },
    { success: 70, neutral: 20, fail: 10 },
    { success: 60, neutral: 20, fail: 20 }
  ] },
  { title: 'Spooking Rabbit', options: [
    { success: 85, neutral: 10, fail: 5 },
    { success: 80, neutral: 15, fail: 5 },
    { success: 75, neutral: 15, fail: 10 },
    { success: 70, neutral: 20, fail: 10 }
  ] },
  { title: 'Returning to Barn', options: [
    { success: 90, neutral: 10, fail: 0 },
    { success: 85, neutral: 10, fail: 5 },
    { success: 85, neutral: 10, fail: 5 },
    { success: 70, neutral: 15, fail: 15 }
  ] }
];

const COMPETITION_CONTROLS = {
  steer: 'Arrows / WASD',
  jump: 'Spacebar',
  pace: 'Up/Down or Shift/Ctrl'
};

const COMPETITION_RANDOM_EVENTS = [
  { key: 'buck', text: 'A playful buck appears between efforts.', mod: -10 },
  { key: 'add_stride', text: 'The horse adds an extra stride and gets deep.', mod: -8 },
  { key: 'leave_stride', text: 'The horse leaves a stride out and jumps long.', mod: -6 },
  { key: 'trip', text: 'A small trip interrupts rhythm for a stride.', mod: -12 },
  { key: 'refusal', text: 'The horse hesitates and questions the question.', mod: -18 },
  { key: 'funny', text: 'A funny snort-and-headshake moment boosts morale.', mod: 6 },
  { key: 'breakthrough', text: 'A rare breakthrough: perfect rider-horse sync.', mod: 14 }
];

const COMPETITION_COURSE_WALK_VARIANTS = [
  {
    title: 'Opening Fence Inspection',
    scene: 'You inspect the opening effort and plan how to start with confidence.',
    options: [
      { label: 'Plan a steady conservative approach.', success: 85, neutral: 10, fail: 5, intent: 'confidence_start' },
      { label: 'Plan to ride forward for momentum.', success: 70, neutral: 20, fail: 10, intent: 'aggressive_start' },
      { label: 'Add an extra balancing stride.', success: 75, neutral: 15, fail: 10, intent: 'safety_first' },
      { label: 'Ignore details and trust instinct.', success: 60, neutral: 25, fail: 15, intent: 'improvised' }
    ]
  },
  {
    title: 'Related Distance Line',
    scene: 'A bending related line could ride in multiple ways depending on pace.',
    options: [
      { label: 'Plan exact forward strides.', success: 80, neutral: 15, fail: 5, intent: 'precision' },
      { label: 'Plan one safer added stride.', success: 75, neutral: 15, fail: 10, intent: 'control' },
      { label: 'Plan to leave one out for speed.', success: 60, neutral: 20, fail: 20, intent: 'gamble' },
      { label: 'Stay flexible and decide mid-round.', success: 65, neutral: 20, fail: 15, intent: 'flexible_plan' }
    ]
  },
  {
    title: 'Tight Rollback Turn',
    scene: 'A quick rollback will test balance and line planning under pressure.',
    options: [
      { label: 'Plan strong rebalance after landing.', success: 80, neutral: 15, fail: 5, intent: 'preparation' },
      { label: 'Ride flowing turn for speed.', success: 65, neutral: 20, fail: 15, intent: 'speed_focus' },
      { label: 'Plan to circle if needed.', success: 85, neutral: 10, fail: 5, intent: 'safety_option' },
      { label: 'Ignore turn difficulty.', success: 55, neutral: 25, fail: 20, intent: 'risk' }
    ]
  },
  {
    title: 'Combination Fence Plan',
    scene: 'A combination rides tight enough that distance and straightness matter.',
    options: [
      { label: 'Plan collected entry and straight line.', success: 80, neutral: 15, fail: 5, intent: 'balance' },
      { label: 'Plan forward approach.', success: 65, neutral: 20, fail: 15, intent: 'momentum' },
      { label: 'Prepare defensive riding.', success: 75, neutral: 15, fail: 10, intent: 'caution' },
      { label: 'Skip detailed planning.', success: 55, neutral: 25, fail: 20, intent: 'improvised' }
    ]
  },
  {
    title: 'Final Strategy Decision',
    scene: 'Course walk complete. You decide your overall strategy for the round.',
    options: [
      { label: 'Conservative plan.', success: 85, neutral: 10, fail: 5, intent: 'safety_strategy' },
      { label: 'Balanced plan.', success: 75, neutral: 15, fail: 10, intent: 'balanced_strategy' },
      { label: 'Aggressive speed plan.', success: 60, neutral: 20, fail: 20, intent: 'aggressive_strategy' },
      { label: 'Adapt entirely by feel.', success: 65, neutral: 20, fail: 15, intent: 'flexible_strategy' }
    ]
  }
];

const COMPETITION_WARMUP_UNIVERSAL = [
  { title: 'Entering Busy Arena', scene: 'Several horses pass closely and your horse lifts the head, looking around.', options: [
    { label: 'Keep walking quietly on long rein.', success: 85, neutral: 10, fail: 5, intent: 'reduce_tension' },
    { label: 'Move immediately into trot work.', success: 70, neutral: 20, fail: 10, intent: 'focus_quickly' },
    { label: 'Circle away from traffic.', success: 80, neutral: 15, fail: 5, intent: 'safety_focus' },
    { label: 'Halt and let horse observe.', success: 85, neutral: 10, fail: 5, intent: 'confidence_building' }
  ]},
  { title: 'Horse Too Fresh', scene: 'The horse feels energetic and bouncy in warm-up.', options: [
    { label: 'Let horse stretch in forward trot.', success: 75, neutral: 15, fail: 10, intent: 'release_energy' },
    { label: 'Begin collection early.', success: 60, neutral: 20, fail: 20, intent: 'control' },
    { label: 'Circle repeatedly to soften.', success: 80, neutral: 15, fail: 5, intent: 'balance' },
    { label: 'Transition down to walk.', success: 85, neutral: 10, fail: 5, intent: 'calm_reset' }
  ]},
  { title: 'Distracted by Loudspeaker', scene: 'Noise from the speaker breaks focus briefly.', options: [
    { label: 'Maintain rhythm and ignore noise.', success: 75, neutral: 15, fail: 10, intent: 'focus' },
    { label: 'Circle and reassure.', success: 80, neutral: 15, fail: 5, intent: 'calm_focus' },
    { label: 'Stop briefly to reset.', success: 85, neutral: 10, fail: 5, intent: 'regroup' },
    { label: 'Move away from speaker.', success: 80, neutral: 15, fail: 5, intent: 'environment_management' }
  ]},
  { title: 'Tight Through Back', scene: 'The horse feels tight through the topline.', options: [
    { label: 'Long rein stretching work.', success: 85, neutral: 10, fail: 5, intent: 'relaxation' },
    { label: 'More forward canter.', success: 70, neutral: 20, fail: 10, intent: 'loosen_up' },
    { label: 'Lateral work immediately.', success: 60, neutral: 20, fail: 20, intent: 'challenge' },
    { label: 'Walk break.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
  ]},
  { title: 'Horse Slowing Down', scene: 'Energy drops and impulsion starts fading.', options: [
    { label: 'Add gentle leg aids.', success: 75, neutral: 15, fail: 10, intent: 'restore_energy' },
    { label: 'Use transitions for engagement.', success: 80, neutral: 15, fail: 5, intent: 'focus' },
    { label: 'Accept slower pace.', success: 60, neutral: 25, fail: 15, intent: 'compromise' },
    { label: 'End warm-up early.', success: 70, neutral: 20, fail: 10, intent: 'caution' }
  ]},
  { title: 'Rider Feeling Nervous', scene: 'You feel pressure rising before entering the ring.', options: [
    { label: 'Ride simple circles to relax.', success: 85, neutral: 10, fail: 5, intent: 'rider_confidence' },
    { label: 'Jump into hard work.', success: 60, neutral: 20, fail: 20, intent: 'pressure' },
    { label: 'Deep breathing and steady walk.', success: 90, neutral: 10, fail: 0, intent: 'calm_reset' },
    { label: 'Ask for coaching line.', success: 80, neutral: 15, fail: 5, intent: 'strategy' }
  ]},
  { title: 'Horse Spooks Lightly', scene: 'A small spook tests confidence and control.', options: [
    { label: 'Leg on and continue forward.', success: 75, neutral: 15, fail: 10, intent: 'confidence' },
    { label: 'Circle and reassure.', success: 80, neutral: 15, fail: 5, intent: 'regroup' },
    { label: 'Pull back strongly.', success: 55, neutral: 25, fail: 20, intent: 'emergency' },
    { label: 'Move to quieter area.', success: 85, neutral: 10, fail: 5, intent: 'safety' }
  ]},
  { title: 'Perfect Relaxation Moment', scene: 'You feel an ideal harmony moment in warm-up.', options: [
    { label: 'Continue exactly as is.', success: 95, neutral: 5, fail: 0, intent: 'maintain_harmony' },
    { label: 'Reward softly.', success: 95, neutral: 5, fail: 0, intent: 'reinforcement' },
    { label: 'Increase difficulty slightly.', success: 75, neutral: 15, fail: 10, intent: 'progression' },
    { label: 'End warm-up soon.', success: 90, neutral: 10, fail: 0, intent: 'preserve_state' }
  ]},
  { title: 'Overreacts to Passing Jump', scene: 'Horse reacts strongly to another horse jumping nearby.', options: [
    { label: 'Focus forward and continue.', success: 75, neutral: 15, fail: 10, intent: 'focus' },
    { label: 'Circle and calm.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
    { label: 'Halt briefly.', success: 85, neutral: 10, fail: 5, intent: 'regroup' },
    { label: 'Leave busy section.', success: 85, neutral: 10, fail: 5, intent: 'safety' }
  ]},
  { title: 'Final Warm-Up Check', scene: 'Final preparation before entering the main arena.', options: [
    { label: 'Short smooth canter before entry.', success: 85, neutral: 10, fail: 5, intent: 'readiness' },
    { label: 'One final transition set.', success: 80, neutral: 15, fail: 5, intent: 'responsiveness' },
    { label: 'Walk quietly to entrance.', success: 90, neutral: 10, fail: 0, intent: 'calm_entry' },
    { label: 'Push one intense final effort.', success: 65, neutral: 20, fail: 15, intent: 'risk' }
  ]}
];

const COMPETITION_WARMUP_VARIANTS = {
  jumping: [
    { title: 'First Vertical Feels Big', scene: 'The first warm-up vertical rides larger than expected.', options: [
      { label: 'Ride quietly forward.', success: 80, neutral: 15, fail: 5, intent: 'confidence_jump' },
      { label: 'Add extra balancing stride.', success: 75, neutral: 15, fail: 10, intent: 'safety' },
      { label: 'Push for strong effort.', success: 65, neutral: 20, fail: 15, intent: 'power' },
      { label: 'Circle and retry.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Warm-Up Fence Rush', scene: 'Horse gets quick to the practice fence.', options: [
      { label: 'Half-halt before jump.', success: 75, neutral: 15, fail: 10, intent: 'regulate' },
      { label: 'Let horse jump forward.', success: 65, neutral: 20, fail: 15, intent: 'compromise' },
      { label: 'Circle and rebalance.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Lower practice fence.', success: 85, neutral: 10, fail: 5, intent: 'confidence' }
    ]},
    { title: 'Practice Oxer', scene: 'The oxer asks for power and straightness.', options: [
      { label: 'Maintain rhythm.', success: 75, neutral: 15, fail: 10, intent: 'consistency' },
      { label: 'Add more impulsion.', success: 70, neutral: 20, fail: 10, intent: 'power' },
      { label: 'Approach slower.', success: 65, neutral: 20, fail: 15, intent: 'caution' },
      { label: 'Skip oxer.', success: 80, neutral: 15, fail: 5, intent: 'safety' }
    ]},
    { title: 'Crowded Jump Line', scene: 'Warm-up line is busy and timing is tight.', options: [
      { label: 'Wait patiently for space.', success: 85, neutral: 10, fail: 5, intent: 'safety' },
      { label: 'Go quickly before others.', success: 60, neutral: 20, fail: 20, intent: 'risk' },
      { label: 'Circle away.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Switch jump.', success: 75, neutral: 15, fail: 10, intent: 'adaptation' }
    ]}
  ],
  dressage: [
    { title: 'Stretching Circle', scene: 'You check suppleness and relaxation on a large circle.', options: [
      { label: 'Encourage long low frame.', success: 85, neutral: 10, fail: 5, intent: 'relaxation' },
      { label: 'Ask for collection too early.', success: 60, neutral: 20, fail: 20, intent: 'risk' },
      { label: 'Use transitions for focus.', success: 75, neutral: 15, fail: 10, intent: 'engagement' },
      { label: 'Walk break.', success: 80, neutral: 15, fail: 5, intent: 'reset' }
    ]},
    { title: 'Horse Rushing', scene: 'Rhythm gets too quick before test entry.', options: [
      { label: 'Half-halt and sit deep.', success: 75, neutral: 15, fail: 10, intent: 'regulate' },
      { label: 'Circle to slow tempo.', success: 80, neutral: 15, fail: 5, intent: 'balance' },
      { label: 'Allow forward energy.', success: 65, neutral: 20, fail: 15, intent: 'compromise' },
      { label: 'Transition down.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Shoulder-In Rehearsal', scene: 'Lateral work rehearsal tests suppleness and clarity.', options: [
      { label: 'Ask softly and support outside aids.', success: 78, neutral: 15, fail: 7, intent: 'communication' },
      { label: 'Reduce angle and keep rhythm.', success: 82, neutral: 13, fail: 5, intent: 'simplify' },
      { label: 'Push for stronger angle.', success: 62, neutral: 20, fail: 18, intent: 'risk' },
      { label: 'Return straight and reset.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Final Centerline Rehearsal', scene: 'You practice a brief centerline feeling before entry.', options: [
      { label: 'Prioritize straightness and still halt.', success: 84, neutral: 11, fail: 5, intent: 'accuracy' },
      { label: 'Ride bigger expression.', success: 70, neutral: 20, fail: 10, intent: 'expression' },
      { label: 'Repeat once then leave ring.', success: 82, neutral: 13, fail: 5, intent: 'confidence' },
      { label: 'Skip and keep horse relaxed.', success: 88, neutral: 10, fail: 2, intent: 'calm_entry' }
    ]}
  ],
  hunter: [
    { title: 'Hunter Rhythm Prep', scene: 'You set the smooth hunter canter rhythm.', options: [
      { label: 'Maintain smooth canter rhythm.', success: 85, neutral: 10, fail: 5, intent: 'style_flow' },
      { label: 'Push forward slightly.', success: 70, neutral: 20, fail: 10, intent: 'expression' },
      { label: 'Slow for balance.', success: 75, neutral: 15, fail: 10, intent: 'control' },
      { label: 'Circle quietly.', success: 80, neutral: 15, fail: 5, intent: 'reset' }
    ]},
    { title: 'Long Line Rehearsal', scene: 'Practice line asks for even strides and soft pace.', options: [
      { label: 'Ride exact hunter rhythm.', success: 82, neutral: 13, fail: 5, intent: 'precision' },
      { label: 'Add one for safety.', success: 76, neutral: 16, fail: 8, intent: 'control' },
      { label: 'Leave one out for brilliance.', success: 65, neutral: 20, fail: 15, intent: 'risk' },
      { label: 'Repeat line quietly.', success: 85, neutral: 10, fail: 5, intent: 'refinement' }
    ]},
    { title: 'Flower Box Look', scene: 'Horse peeks at decorative filler near the standard.', options: [
      { label: 'Leg on and keep flow.', success: 78, neutral: 15, fail: 7, intent: 'focus' },
      { label: 'Soften and reassure.', success: 82, neutral: 13, fail: 5, intent: 'calm_focus' },
      { label: 'Pull and over-organize.', success: 58, neutral: 22, fail: 20, intent: 'overthinking' },
      { label: 'Circle once and return.', success: 86, neutral: 10, fail: 4, intent: 'reset' }
    ]},
    { title: 'Final Quiet Gate Approach', scene: 'Last warm-up before entering asks for composure.', options: [
      { label: 'Keep quiet rhythm and finish.', success: 88, neutral: 10, fail: 2, intent: 'readiness' },
      { label: 'Add one showy jump.', success: 68, neutral: 20, fail: 12, intent: 'risk' },
      { label: 'Walk to gate and breathe.', success: 90, neutral: 8, fail: 2, intent: 'calm_entry' },
      { label: 'Do extra circles from nerves.', success: 72, neutral: 18, fail: 10, intent: 'rider_tension' }
    ]}
  ],
  eventing: [
    { title: 'XC Confidence Jump', scene: 'You rehearse bravery over a confidence fence.', options: [
      { label: 'Ride positively forward.', success: 80, neutral: 15, fail: 5, intent: 'bravery' },
      { label: 'Approach cautiously.', success: 70, neutral: 20, fail: 10, intent: 'reassurance' },
      { label: 'Circle before jump.', success: 85, neutral: 10, fail: 5, intent: 'reset' },
      { label: 'Skip jump.', success: 80, neutral: 15, fail: 5, intent: 'safety' }
    ]},
    { title: 'Gallop Rhythm Prep', scene: 'You tune forward pace without losing control.', options: [
      { label: 'Hold controlled forward canter.', success: 82, neutral: 13, fail: 5, intent: 'rhythm' },
      { label: 'Push stronger for time feel.', success: 66, neutral: 19, fail: 15, intent: 'risk' },
      { label: 'Slow and rebalance.', success: 78, neutral: 15, fail: 7, intent: 'control' },
      { label: 'Take short walk break.', success: 86, neutral: 10, fail: 4, intent: 'recovery' }
    ]},
    { title: 'Water Warm-Up Question', scene: 'A water-style question tests confidence and line.', options: [
      { label: 'Ride straight and committed.', success: 78, neutral: 15, fail: 7, intent: 'commitment' },
      { label: 'Soften and reassure.', success: 80, neutral: 15, fail: 5, intent: 'confidence' },
      { label: 'Over-collect before entry.', success: 60, neutral: 20, fail: 20, intent: 'risk' },
      { label: 'Circle and represent.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Final Quiet Entry', scene: 'Final check before entering competition ring.', options: [
      { label: 'Choose calm final canter.', success: 88, neutral: 10, fail: 2, intent: 'calm_entry' },
      { label: 'Do one bold final jump.', success: 70, neutral: 20, fail: 10, intent: 'risk' },
      { label: 'Walk and settle heartbeat.', success: 90, neutral: 8, fail: 2, intent: 'readiness' },
      { label: 'Continue hard effort too long.', success: 62, neutral: 20, fail: 18, intent: 'fatigue_risk' }
    ]}
  ]
};

const COMPETITION_RPG_VARIANTS = {
  jumping: [
    { title: 'Tight Rollback Turn', scene: 'After landing, the next fence comes quickly on a tight rollback turn.', options: [
      { label: 'Sit deep and rebalance before turning.', success: 75, neutral: 15, fail: 10, intent: 'rebalance' },
      { label: 'Turn early and keep pace flowing.', success: 70, neutral: 20, fail: 10, intent: 'maintain_flow' },
      { label: 'Pull back hard to slow down.', success: 55, neutral: 20, fail: 25, intent: 'emergency_control' },
      { label: 'Circle and re-approach.', success: 85, neutral: 10, fail: 5, intent: 'safety_reset' }
    ]},
    { title: 'Long Related Distance', scene: 'A seven-stride line appears and the horse feels behind the leg.', options: [
      { label: 'Add leg and keep rhythm.', success: 80, neutral: 15, fail: 5, intent: 'restore_impulsion' },
      { label: 'Ride quietly and accept extra stride.', success: 70, neutral: 20, fail: 10, intent: 'compromise' },
      { label: 'Push for six strides.', success: 60, neutral: 25, fail: 15, intent: 'gamble' },
      { label: 'Rebalance midway.', success: 75, neutral: 15, fail: 10, intent: 'adjust_line' }
    ]},
    { title: 'Liverpool Fence', scene: 'A reflective liverpool raises tension in the approach.', options: [
      { label: 'Keep leg on and ride forward.', success: 70, neutral: 20, fail: 10, intent: 'confidence' },
      { label: 'Soften contact and reassure.', success: 75, neutral: 15, fail: 10, intent: 'reassurance' },
      { label: 'Slow and approach cautiously.', success: 60, neutral: 25, fail: 15, intent: 'caution' },
      { label: 'Circle and represent.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Horse Leaves a Stride Out', scene: 'Two strides out, the horse lengthens unexpectedly.', options: [
      { label: 'Support with leg and stay balanced.', success: 70, neutral: 20, fail: 10, intent: 'recovery' },
      { label: 'Pull slightly to shorten.', success: 55, neutral: 25, fail: 20, intent: 'emergency_adjust' },
      { label: 'Stay still and trust the jump.', success: 65, neutral: 25, fail: 10, intent: 'trust_horse' },
      { label: 'Abort and circle away.', success: 80, neutral: 15, fail: 5, intent: 'safety_reset' }
    ]},
    { title: 'Rider Off Balance on Landing', scene: 'You land ahead of the motion and need quick recovery.', options: [
      { label: 'Sit back and regain rhythm.', success: 75, neutral: 15, fail: 10, intent: 'recovery' },
      { label: 'Circle to reset balance.', success: 80, neutral: 15, fail: 5, intent: 'regroup' },
      { label: 'Keep going to save time.', success: 60, neutral: 25, fail: 15, intent: 'risk' },
      { label: 'Slow to trot briefly.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Combination Fence', scene: 'A one-stride combination arrives quickly.', options: [
      { label: 'Hold straight line and steady rhythm.', success: 80, neutral: 15, fail: 5, intent: 'precision' },
      { label: 'Collect before entering combo.', success: 75, neutral: 15, fail: 10, intent: 'adjustment' },
      { label: 'Ride forward boldly.', success: 65, neutral: 20, fail: 15, intent: 'power' },
      { label: 'Circle and retry.', success: 85, neutral: 10, fail: 5, intent: 'safety' }
    ]},
    { title: 'Sudden Spook on Approach', scene: 'A shadow near the rail makes the horse drift.', options: [
      { label: 'Leg on and ride straight.', success: 75, neutral: 15, fail: 10, intent: 'confidence' },
      { label: 'Circle to regain focus.', success: 80, neutral: 15, fail: 5, intent: 'regroup' },
      { label: 'Pull to stop.', success: 55, neutral: 20, fail: 25, intent: 'emergency' },
      { label: 'End round early.', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Overjump Moment', scene: 'The horse jumps too big and lands strong.', options: [
      { label: 'Half-halt and stabilize.', success: 75, neutral: 15, fail: 10, intent: 'regulate' },
      { label: 'Continue forward naturally.', success: 65, neutral: 20, fail: 15, intent: 'flow' },
      { label: 'Circle to rebalance.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Slow pace before next fence.', success: 85, neutral: 10, fail: 5, intent: 'control' }
    ]},
    { title: 'Last Fence Pressure', scene: 'Crowd noise rises as you approach the final fence.', options: [
      { label: 'Keep same rhythm and straightness.', success: 80, neutral: 15, fail: 5, intent: 'consistency' },
      { label: 'Push slightly forward to finish.', success: 70, neutral: 20, fail: 10, intent: 'commitment' },
      { label: 'Overthink and adjust late.', success: 55, neutral: 25, fail: 20, intent: 'late_adjustment' },
      { label: 'Circle and reset with time penalty.', success: 85, neutral: 10, fail: 5, intent: 'safety' }
    ]},
    { title: 'Rare Perfect Round Energy', scene: 'Everything feels easy, connected, and in sync.', options: [
      { label: 'Maintain exact same ride.', success: 95, neutral: 5, fail: 0, intent: 'flow_state' },
      { label: 'Soften aids and trust horse.', success: 90, neutral: 10, fail: 0, intent: 'harmony' },
      { label: 'Push for extra speed.', success: 75, neutral: 15, fail: 10, intent: 'risk' },
      { label: 'Finish conservatively.', success: 90, neutral: 10, fail: 0, intent: 'consistency' }
    ]}
  ],
  hunter: [
    { title: 'Flowing Hunter Line', scene: 'Long diagonal line with expected six strides.', options: [
      { label: 'Maintain steady hunter rhythm.', success: 85, neutral: 10, fail: 5, intent: 'style_flow' },
      { label: 'Collect slightly before line.', success: 75, neutral: 15, fail: 10, intent: 'balance' },
      { label: 'Ride forward for expression.', success: 70, neutral: 20, fail: 10, intent: 'expression' },
      { label: 'Adjust late near fence.', success: 55, neutral: 25, fail: 20, intent: 'late_adjustment' }
    ]},
    { title: 'Horse Drifts Off Line', scene: 'The horse starts drifting off your intended track.', options: [
      { label: 'Correct quietly with leg.', success: 80, neutral: 15, fail: 5, intent: 'straighten' },
      { label: 'Circle and re-approach.', success: 85, neutral: 10, fail: 5, intent: 'reset' },
      { label: 'Ignore and continue.', success: 60, neutral: 25, fail: 15, intent: 'compromise' },
      { label: 'Slow and reorganize.', success: 75, neutral: 15, fail: 10, intent: 'control' }
    ]},
    { title: 'Soft Hunter Jump', scene: 'A smooth jump invites maintaining style and flow.', options: [
      { label: 'Keep rhythm unchanged.', success: 90, neutral: 10, fail: 0, intent: 'consistency' },
      { label: 'Praise subtly and continue.', success: 95, neutral: 5, fail: 0, intent: 'positive_reinforcement' },
      { label: 'Push for bigger effort.', success: 70, neutral: 20, fail: 10, intent: 'expression' },
      { label: 'Slow after landing.', success: 80, neutral: 15, fail: 5, intent: 'control' }
    ]},
    { title: 'Added Stride', scene: 'An extra stride appears in the line unexpectedly.', options: [
      { label: 'Stay quiet and support.', success: 75, neutral: 15, fail: 10, intent: 'balance' },
      { label: 'Push forward late.', success: 55, neutral: 25, fail: 20, intent: 'risk' },
      { label: 'Circle and retry.', success: 85, neutral: 10, fail: 5, intent: 'reset' },
      { label: 'Accept lower style score.', success: 70, neutral: 20, fail: 10, intent: 'compromise' }
    ]},
    { title: 'Slight Rush Between Fences', scene: 'Pace quickens and style quality is at risk.', options: [
      { label: 'Half-halt and settle.', success: 75, neutral: 15, fail: 10, intent: 'regulate' },
      { label: 'Continue and hope rhythm returns.', success: 60, neutral: 25, fail: 15, intent: 'compromise' },
      { label: 'Circle for balance.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Transition briefly down.', success: 85, neutral: 10, fail: 5, intent: 'regroup' }
    ]},
    { title: 'Cute Distraction', scene: 'The horse pricks ears and stares at flowers.', options: [
      { label: 'Keep leg on and continue.', success: 80, neutral: 15, fail: 5, intent: 'focus' },
      { label: 'Allow brief look and continue.', success: 75, neutral: 15, fail: 10, intent: 'compromise' },
      { label: 'Circle for focus.', success: 85, neutral: 10, fail: 5, intent: 'reset' },
      { label: 'Halt and regroup.', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Slight Knockdown Risk', scene: 'Distance feels flat and style may break down.', options: [
      { label: 'Stay balanced and ride forward.', success: 75, neutral: 15, fail: 10, intent: 'maintain_style' },
      { label: 'Collect before jump.', success: 70, neutral: 20, fail: 10, intent: 'balance' },
      { label: 'Push forward strongly.', success: 60, neutral: 25, fail: 15, intent: 'risk' },
      { label: 'Circle away.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Smooth Bending Line', scene: 'A bending line rewards arc and rhythm.', options: [
      { label: 'Maintain arc and rhythm.', success: 85, neutral: 10, fail: 5, intent: 'flow' },
      { label: 'Straighten early.', success: 70, neutral: 20, fail: 10, intent: 'caution' },
      { label: 'Ride forward through turn.', success: 65, neutral: 25, fail: 10, intent: 'risk' },
      { label: 'Circle and retry.', success: 80, neutral: 15, fail: 5, intent: 'reset' }
    ]},
    { title: 'Rider Overadjusts', scene: 'Too much adjustment interrupts hunter smoothness.', options: [
      { label: 'Relax and return rhythm.', success: 75, neutral: 15, fail: 10, intent: 'recovery' },
      { label: 'Continue without correction.', success: 60, neutral: 25, fail: 15, intent: 'compromise' },
      { label: 'Circle to rebalance.', success: 80, neutral: 15, fail: 5, intent: 'regroup' },
      { label: 'Slow and reset.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Perfect Hunter Flow', scene: 'Round quality peaks with effortless style.', options: [
      { label: 'Maintain flow to finish.', success: 95, neutral: 5, fail: 0, intent: 'flow_state' },
      { label: 'Soften aids and cruise.', success: 90, neutral: 10, fail: 0, intent: 'harmony' },
      { label: 'Push for extra brilliance.', success: 75, neutral: 15, fail: 10, intent: 'expression' },
      { label: 'Finish conservatively.', success: 90, neutral: 10, fail: 0, intent: 'consistency' }
    ]}
  ],
  dressage: [
    { title: 'Transition Too Quick', scene: 'The transition runs ahead of your aids.', options: [
      { label: 'Half-halt to rebalance.', success: 75, neutral: 15, fail: 10, intent: 'regulate_rhythm' },
      { label: 'Continue forward and soften contact.', success: 65, neutral: 20, fail: 15, intent: 'compromise' },
      { label: 'Redo transition.', success: 85, neutral: 10, fail: 5, intent: 'correction' },
      { label: 'Halt and reset.', success: 80, neutral: 15, fail: 5, intent: 'reset' }
    ]},
    { title: 'Slowing Mid Movement', scene: 'Impulsion fades midway through the movement.', options: [
      { label: 'Add leg gently.', success: 75, neutral: 15, fail: 10, intent: 'restore_impulsion' },
      { label: 'Accept slower rhythm.', success: 60, neutral: 25, fail: 15, intent: 'compromise' },
      { label: 'Transition down and rebuild.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'End movement early.', success: 85, neutral: 10, fail: 5, intent: 'welfare_priority' }
    ]},
    { title: 'Crooked Centerline', scene: 'The centerline drifts off true straightness.', options: [
      { label: 'Correct with outside aids.', success: 80, neutral: 15, fail: 5, intent: 'straighten' },
      { label: 'Continue and accept lower score.', success: 65, neutral: 20, fail: 15, intent: 'compromise' },
      { label: 'Halt and re-enter line.', success: 85, neutral: 10, fail: 5, intent: 'correction' },
      { label: 'Overcorrect sharply.', success: 55, neutral: 25, fail: 20, intent: 'risk' }
    ]},
    { title: 'Canter Transition Rush', scene: 'Canter departure becomes hurried.', options: [
      { label: 'Half-halt immediately.', success: 75, neutral: 15, fail: 10, intent: 'regulate' },
      { label: 'Circle to settle.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Allow forward canter.', success: 60, neutral: 25, fail: 15, intent: 'compromise' },
      { label: 'Return to trot.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Lateral Misunderstanding', scene: 'The horse misreads a lateral aid moment.', options: [
      { label: 'Clarify aids calmly.', success: 75, neutral: 15, fail: 10, intent: 'communication' },
      { label: 'Simplify movement.', success: 80, neutral: 15, fail: 5, intent: 'simplify' },
      { label: 'Continue imperfectly.', success: 65, neutral: 20, fail: 15, intent: 'compromise' },
      { label: 'Return to straight line.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Tension Builds', scene: 'Tension increases and frame tightens.', options: [
      { label: 'Soften contact and ride forward.', success: 75, neutral: 15, fail: 10, intent: 'relaxation' },
      { label: 'Halt briefly.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Push through tension.', success: 60, neutral: 25, fail: 15, intent: 'challenge' },
      { label: 'End test early.', success: 90, neutral: 10, fail: 0, intent: 'welfare_priority' }
    ]},
    { title: 'Sudden Harmony', scene: 'A rare harmony moment appears in self-carriage.', options: [
      { label: 'Maintain exactly as is.', success: 95, neutral: 5, fail: 0, intent: 'harmony' },
      { label: 'Reward subtly.', success: 95, neutral: 5, fail: 0, intent: 'positive_reinforcement' },
      { label: 'Increase difficulty slightly.', success: 75, neutral: 15, fail: 10, intent: 'progression' },
      { label: 'Finish movement early.', success: 90, neutral: 10, fail: 0, intent: 'consistency' }
    ]},
    { title: 'Judge Pressure', scene: 'Crowd and judge presence increase rider pressure.', options: [
      { label: 'Focus on rhythm only.', success: 80, neutral: 15, fail: 5, intent: 'focus' },
      { label: 'Ride bigger for impression.', success: 70, neutral: 20, fail: 10, intent: 'expression' },
      { label: 'Overcorrect due to nerves.', success: 55, neutral: 25, fail: 20, intent: 'pressure_error' },
      { label: 'Simplify movement.', success: 85, neutral: 10, fail: 5, intent: 'safety' }
    ]},
    { title: 'Slight Trip', scene: 'A small trip breaks rhythm momentarily.', options: [
      { label: 'Support and continue.', success: 75, neutral: 15, fail: 10, intent: 'recovery' },
      { label: 'Circle and regroup.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Halt and restart.', success: 85, neutral: 10, fail: 5, intent: 'correction' },
      { label: 'Accept lower score.', success: 70, neutral: 20, fail: 10, intent: 'compromise' }
    ]},
    { title: 'Final Halt Pressure', scene: 'The final halt decides polish and impression.', options: [
      { label: 'Halt straight and confident.', success: 85, neutral: 10, fail: 5, intent: 'finish' },
      { label: 'Overprepare and lose flow.', success: 60, neutral: 25, fail: 15, intent: 'overthinking' },
      { label: 'Maintain forward then halt late.', success: 70, neutral: 20, fail: 10, intent: 'compromise' },
      { label: 'Mentally reset and retry.', success: 80, neutral: 15, fail: 5, intent: 'correction' }
    ]}
  ],
  eventing: [
    { title: 'XC Narrow Fence', scene: 'A skinny fence demands commitment and straightness.', options: [
      { label: 'Ride confidently forward.', success: 75, neutral: 15, fail: 10, intent: 'commitment' },
      { label: 'Slow and aim carefully.', success: 70, neutral: 20, fail: 10, intent: 'precision' },
      { label: 'Circle and re-approach.', success: 85, neutral: 10, fail: 5, intent: 'reset' },
      { label: 'Skip question (penalty).', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Water Splash Hesitation', scene: 'The horse backs off slightly at water.', options: [
      { label: 'Keep leg on and ride through.', success: 75, neutral: 15, fail: 10, intent: 'confidence' },
      { label: 'Slow and reassure.', success: 70, neutral: 20, fail: 10, intent: 'reassurance' },
      { label: 'Circle and retry.', success: 80, neutral: 15, fail: 5, intent: 'reset' },
      { label: 'Avoid route.', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Bank Jump', scene: 'The bank question tests rider balance and line.', options: [
      { label: 'Stay centered and straight.', success: 75, neutral: 15, fail: 10, intent: 'balance' },
      { label: 'Slow before drop.', success: 70, neutral: 20, fail: 10, intent: 'caution' },
      { label: 'Ride forward boldly.', success: 65, neutral: 20, fail: 15, intent: 'commitment' },
      { label: 'Circle away.', success: 85, neutral: 10, fail: 5, intent: 'safety' }
    ]},
    { title: 'Cross-Country Gallop', scene: 'Gallop section pressure challenges time management.', options: [
      { label: 'Maintain pace for time.', success: 80, neutral: 15, fail: 5, intent: 'time_management' },
      { label: 'Slow for control.', success: 75, neutral: 15, fail: 10, intent: 'balance' },
      { label: 'Push faster.', success: 65, neutral: 20, fail: 15, intent: 'risk' },
      { label: 'Regroup before next fence.', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Horse Spooks at Crowd', scene: 'Atmosphere causes a sharp loss of focus.', options: [
      { label: 'Ride forward confidently.', success: 75, neutral: 15, fail: 10, intent: 'confidence' },
      { label: 'Circle and calm.', success: 80, neutral: 15, fail: 5, intent: 'regroup' },
      { label: 'Pull back strongly.', success: 55, neutral: 25, fail: 20, intent: 'emergency' },
      { label: 'Retire from round.', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Rider Tired Near End', scene: 'Fatigue appears as control and timing get harder.', options: [
      { label: 'Maintain rhythm and focus.', success: 75, neutral: 15, fail: 10, intent: 'endurance' },
      { label: 'Slow slightly to recover.', success: 80, neutral: 15, fail: 5, intent: 'manage_energy' },
      { label: 'Push through fatigue.', success: 65, neutral: 20, fail: 15, intent: 'risk' },
      { label: 'Retire early.', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Triple Combination', scene: 'A demanding combination asks for precision and straightness.', options: [
      { label: 'Stay straight and balanced.', success: 75, neutral: 15, fail: 10, intent: 'precision' },
      { label: 'Collect before entering.', success: 70, neutral: 20, fail: 10, intent: 'balance' },
      { label: 'Ride forward strongly.', success: 65, neutral: 20, fail: 15, intent: 'commitment' },
      { label: 'Circle and retry.', success: 80, neutral: 15, fail: 5, intent: 'reset' }
    ]},
    { title: 'Sudden Buck on Landing', scene: 'A buck after landing threatens rider position.', options: [
      { label: 'Sit deep and continue.', success: 70, neutral: 20, fail: 10, intent: 'recovery' },
      { label: 'Circle to regain control.', success: 80, neutral: 15, fail: 5, intent: 'stabilize' },
      { label: 'Pull abruptly.', success: 55, neutral: 25, fail: 20, intent: 'emergency' },
      { label: 'Retire.', success: 90, neutral: 10, fail: 0, intent: 'safety' }
    ]},
    { title: 'Time Pressure Final Fence', scene: 'Clock pressure builds on the final effort.', options: [
      { label: 'Keep current rhythm.', success: 80, neutral: 15, fail: 5, intent: 'consistency' },
      { label: 'Push forward for time.', success: 65, neutral: 20, fail: 15, intent: 'risk' },
      { label: 'Slow for clean jump.', success: 75, neutral: 15, fail: 10, intent: 'safety' },
      { label: 'Circle (time penalty).', success: 85, neutral: 10, fail: 5, intent: 'reset' }
    ]},
    { title: 'Perfect XC Flow', scene: 'Everything aligns across terrain and questions.', options: [
      { label: 'Maintain rhythm to finish.', success: 95, neutral: 5, fail: 0, intent: 'flow_state' },
      { label: 'Relax aids and trust horse.', success: 90, neutral: 10, fail: 0, intent: 'harmony' },
      { label: 'Push for faster finish.', success: 75, neutral: 15, fail: 10, intent: 'risk' },
      { label: 'Finish conservatively.', success: 90, neutral: 10, fail: 0, intent: 'consistency' }
    ]}
  ]
};

const TRAINING_OPTION_LIBRARY = {
  walk: [
    { label: 'Sit deeper and apply gentle half-halts to slow the rhythm.', success: 65, neutral: 25, fail: 10, intent: 'calm_and_balance', effects: { bond: 1, skill: 1 } },
    { label: 'Circle to encourage bending and focus.', success: 70, neutral: 20, fail: 10, intent: 'refocus', effects: { bond: 1, skill: 1 } },
    { label: 'Halt briefly and restart the walk.', success: 75, neutral: 15, fail: 10, intent: 'reset_attention', effects: { bond: 1, skill: 0 } },
    { label: 'Allow the forward energy but keep soft contact.', success: 55, neutral: 30, fail: 15, intent: 'allow_release', effects: { bond: 0, skill: 0 } }
  ],
  trot: [
    { label: 'Apply steady half-halts to rebalance tempo.', success: 65, neutral: 25, fail: 10, intent: 'regulate_rhythm', effects: { bond: 1, skill: 2 } },
    { label: 'Ride a large circle to soften and slow naturally.', success: 70, neutral: 20, fail: 10, intent: 'balance', effects: { bond: 1, skill: 1 } },
    { label: 'Transition back to walk and re-ask calmly.', success: 75, neutral: 15, fail: 10, intent: 'reset_transition', effects: { bond: 1, skill: 1 } },
    { label: 'Allow forward energy briefly before correcting.', success: 55, neutral: 30, fail: 15, intent: 'release_energy', effects: { bond: 0, skill: 0 } }
  ],
  canter: [
    { label: 'Sit deep and apply steady half-halts to regulate tempo.', success: 65, neutral: 25, fail: 10, intent: 'regulate_rhythm', effects: { bond: 1, skill: 2 } },
    { label: 'Ride a large circle to rebalance naturally.', success: 70, neutral: 20, fail: 10, intent: 'balance', effects: { bond: 1, skill: 1 } },
    { label: 'Transition back to trot and retry quietly.', success: 75, neutral: 15, fail: 10, intent: 'reset_transition', effects: { bond: 1, skill: 1 } },
    { label: 'Allow a few energetic strides before correcting.', success: 55, neutral: 30, fail: 15, intent: 'release_energy', effects: { bond: 0, skill: 0 } }
  ],
  jumping: [
    { label: 'Keep the same rhythm and maintain steady contact.', success: 85, neutral: 10, fail: 5, intent: 'maintain_balance', effects: { bond: 1, skill: 2 } },
    { label: 'Add a half-halt to shorten slightly before takeoff.', success: 75, neutral: 15, fail: 10, intent: 'adjust_stride', effects: { bond: 1, skill: 2 } },
    { label: 'Circle away and reset the approach for precision.', success: 80, neutral: 15, fail: 5, intent: 'repetition', effects: { bond: 1, skill: 1 } },
    { label: 'Let the horse jump out of stride and fix later.', success: 55, neutral: 30, fail: 15, intent: 'allow_forward', effects: { bond: -1, skill: 0 } }
  ],
  dressage: [
    { label: 'Continue in a steady rhythm and build gradually.', success: 85, neutral: 10, fail: 5, intent: 'establish_foundation', effects: { bond: 1, skill: 2 } },
    { label: 'Add circles and serpentines for suppleness.', success: 80, neutral: 15, fail: 5, intent: 'suppleness', effects: { bond: 1, skill: 2 } },
    { label: 'Transition down and reset before asking again.', success: 75, neutral: 15, fail: 10, intent: 'reset', effects: { bond: 1, skill: 1 } },
    { label: 'Keep pushing through resistance cautiously.', success: 60, neutral: 25, fail: 15, intent: 'ride_through', effects: { bond: -1, skill: 1 } }
  ],
  cool_down: [
    { label: 'Continue walking on a long rein to relax muscles.', success: 95, neutral: 5, fail: 0, intent: 'relax_muscles', effects: { bond: 1, skill: 0 } },
    { label: 'Circle lightly to encourage stretching.', success: 90, neutral: 10, fail: 0, intent: 'improve_flexibility', effects: { bond: 1, skill: 0 } },
    { label: 'Halt briefly and reward the horse.', success: 95, neutral: 5, fail: 0, intent: 'positive_reinforcement', effects: { bond: 1, skill: 0 } },
    { label: 'End session and dismount calmly.', success: 95, neutral: 5, fail: 0, intent: 'welfare_priority', effects: { bond: 0, skill: 0 } }
  ]
};

const RARE_MARKINGS = MARKINGS.filter((m) => m !== 'None');
const PEDIGREE_RELATIONS = ['Sire', 'Dam', 'Sire\'s Sire', 'Sire\'s Dam', 'Dam\'s Sire', 'Dam\'s Dam'];
const PEDIGREE_PREFIXES = ['OLD', 'HAN', 'RHF', 'BRW', 'STS', 'NTH', 'ELD', 'CRW'];
const FEEDS = [
  'Basic Feed',
  'Sports Feed',
  'Sweet Feed',
  'Brood-mare Feed',
  'Calm nd Ez',
  'Youngster Feed',
  'Old Horse Feed',
  'Recovery',
  'Weight Gain',
  'Diet Feed',
  'Joint Support'
];
let wrongFeedUsed = null;
const MOODS = ['Motivated', 'Happy', 'Try-Hard', 'Neutral', 'Uncomfortable', 'Distress', 'Overly-Active', 'No energy', 'Bad moods', 'Grumpy'];
const WEIGHTS = ['Very Underweight', 'Underweight', 'Moderate', 'Fleshy', 'Overweight'];
const TACK = {
  bridle: ['Snaffle Bridle', 'Flash Bridle', 'Drop Noseband Bridle', 'Figure-8 Bridle', 'Double Bridle'],
  bit: ['Loose Ring Snaffle', 'Eggbutt Snaffle', 'D-Ring Bit', 'Pelham Bit', 'Gag Bit'],
  saddle: ['All-Purpose Saddle', 'Jumping Saddle', 'Dressage Saddle', 'Racing / Close-Contact Saddle', 'Ill-Fitting Saddle'],
  pad: ['Basic Pad', 'Shock-Absorbing Pad', 'Incorrect Size Pad', 'Therapeutic Pad', 'No Pad'],
  footwear: ['Tendon Boots'],
  headwear: ['Halter', 'Ear-Bonnet', 'Race Mask'],
  body: ['No Body Aid', 'Martingal', 'Draw Reins']
};
const EXERCISE_MENU = {
  jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness'],
  hunter: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  eventing: ['Collection', 'Connection', 'Rhythm', 'Striding', 'Confidence', 'Speed']
};
const COMPETITION_HIGHLIGHTS = {
  jumping: {
    positive: [
      'The horse cleared jump # with perfect striding.',
      'The horse approached jump # confidently and met the distance well.',
      'The horse maintained a clean line through jump #.',
      'Jump # required extra effort, and the horse landed smoothly.',
      'The horse showed a clean line until jump #, where a slight stumble caused hesitation.'
    ],
    faults: [
      'The horse had a dramatic knockdown on jump #.',
      'The turn was too sharp for jump #, resulting in a knockdown.',
      'The horse approached jump # confidently but misjudged the distance, brushing the rail.',
      'The pace was off, so the horse struggled, knocking jump #.'
    ],
    refusals: [
      'The striding was off, resulting in a refusal at jump #.'
    ],
    time: [
      'The pace was off, so the horse struggled but cleared jump #.',
      'The horse went off-course at jump #, losing momentum before rejoining the track.'
    ],
    eliminated: [
      'The horse was eliminated after a costly mistake on jump #.'
    ]
  },
  dressage: {
    positive: [
      'The horse executed the movement with fluidity and balance.',
      'The movement was executed with expression and engagement.',
      'The movement was accurate and showed good impulsion.'
    ],
    neutral: [
      'The movement was accurate but lacked impulsion.',
      'The horse performed the movement correctly, but the stride length was inconsistent.',
      'The transition into the movement was slightly rushed, reducing the score.'
    ],
    negative: [
      'The horse hesitated during the movement.',
      'The horse overbent in the movement, resulting in a score drop.',
      'The horse was tense during the movement, affecting rhythm.',
      'The horse lost straightness during the movement.',
      'The horse broke gait momentarily during the movement.'
    ]
  },
  eventing: {
    positive: [
      'The horse handled the jump well, landing smoothly.',
      'The horse galloped confidently over the cross-country obstacle.',
      'The horse showed excellent rhythm throughout the course.'
    ],
    rails: [
      'The horse knocked down a rail at jump #.',
      'The horse misjudged the distance and had a knockdown at jump #.'
    ],
    refusals: [
      'The horse refused at jump # and required a re-approach.',
      'The horse hesitated at water/ditch combinations.'
    ],
    time: [
      'The pace was too fast into the obstacle, resulting in a stumble.',
      'The horse executed a clean line in dressage, but stamina issues affected cross-country.'
    ],
    eliminated: [
      'The horse was eliminated after a fall on the cross-country course.'
    ]
  },
  hunter: {
    positive: [
      'The horse showed a flowing, consistent pace over the fence.',
      'The horse performed with expression and elegance over fence #.',
      'The horse maintained balance and posture throughout the course.'
    ],
    faults: [
      'The horse hit a rail lightly on fence #.',
      'Fence # disrupted the horse’s rhythm, causing a knockdown.',
      'The horse refused at fence #, causing a break in rhythm.'
    ],
    rhythm: [
      'The horse’s striding between fences was uneven.',
      'The horse was slow to the jump but cleared it.',
      'Fence # caused a slight stumble on landing, but the horse recovered well.',
      'The horse drifted off-course near fence # before correcting.'
    ]
  }
};
const COMPETITION_COMMENTS = {
  strong: [
    'Strong performance today; horse is adapting well to current skill level.',
    'The horse is excelling beyond expectations; consider entering a slightly higher-level competition.',
    'Exceptional effort from the horse; small improvements could have a big impact.'
  ],
  mixed: [
    'The horse shows potential but made minor mistakes; focus on precision and rhythm.',
    'Performance varied across rounds; consider adjusting skill-specific training.',
    'The horse’s performance suggests more strength and endurance work is needed.'
  ],
  management: [
    'The horse is responding well to management; keep routines consistent.',
    'The horse’s temperament is affecting performance; observe and adjust management if needed.',
    'The horse is showing its personality today; consider matching feed and turnout to mood.'
  ]
};
const COMPETITION_SUGGESTIONS = {
  feed: [
    'The horse seems to be performing well, but might benefit from slightly richer feed.',
    'The horse appears a little heavy; reducing feed could improve performance.',
    'Consider switching to recovery feed; the horse seems stiff or tense.',
    'The horse is underweight and could benefit from weight-gain feed.',
    'The horse’s energy seems balanced; current feeding regimen is working well.',
    'Too much feed may be affecting its energy and mood; monitor for weight gain.'
  ],
  turnout: [
    'The horse appears energetic and eager, more training may help channel this energy.',
    'The horse seems sluggish today, consider giving more turnout or adjusting feed.',
    'The horse’s energy is off; too much or too little turnout might be affecting its performance.',
    'Consider calm feed or extra rest for the horse; it’s overly active or distracted.',
    'The horse thrives under current workload; maintain schedule.'
  ],
  training: [
    'The horse shows promise in its current discipline but could benefit from extra skill work.',
    'The horse struggles with certain movements/jumps; focus on targeted exercises.',
    'Consistency is key; consider more repetition of current exercises to solidify skill.',
    'The horse may need time off or light training to prevent fatigue or injury.',
    'The horse demonstrates natural talent; ensure training is balanced to maximize potential.'
  ],
  health: [
    'The horse seems healthy, but keep an eye on weight and energy.',
    'Consider retiring this horse soon; age or current performance suggests limits.',
    'The horse may benefit from being gelded if temperament or energy is difficult to manage.',
    'The horse’s stamina is declining; review workload or discipline level.',
    'Injuries or stiffness suggest extra recovery feed or reduced workload.'
  ]
};


const TRAINING_RPG_VARIANTS = {
  scheme: [
    {
      text: 'You review today\'s scheme and set clear goals before mounting.',
      options: [
        { label: 'Keep the plan simple and realistic', success: 85, neutral: 10, fail: 5, moodMod: { Happy: 5, Motivated: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Push for a very ambitious session', success: 55, neutral: 25, fail: 20, moodMod: { Motivated: 5, Distress: -10 }, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 1 } }
      ]
    }
  ],
  walk: [
    {
      text: 'You start in walk and ask for a soft, attentive contact.',
      options: [
        { label: 'Ride a large circle and encourage relaxation', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 10 }, personalityMod: { Spooky: -5 }, effects: { bond: 1, skill: 1 } },
        { label: 'Ask for early lateral flexion', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Keep the walk long and forward', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Lazy: -5 }, effects: { bond: 1, skill: 1 } },
        { label: 'End warm-up and move on', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for walk. The horse drags behind the leg and feels dull.',
      options: [
        { label: 'Use firmer leg and voice', success: 75, neutral: 15, fail: 10, moodMod: { 'Try-Hard': 10 }, personalityMod: { Lazy: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Tap lightly and ask again', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Accept a slower walk', success: 55, neutral: 30, fail: 15, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'Reset by halting once', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } }
      ]
    },
    {
      text: 'You ask for walk. The horse is alert and looks for distractions.',
      options: [
        { label: 'Keep calm contact and ride forward', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 5 }, personalityMod: { Spooky: -10, 'Bomb-proof': 10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Circle to regain focus', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Halt and wait for quiet', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'Finish walk phase early', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for walk. The horse keeps offering trot instead.',
      options: [
        { label: 'Sit deep and half-halt', success: 75, neutral: 20, fail: 5, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Use a circle to reset gait', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Allow a few steps then rebalance', success: 65, neutral: 25, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'Return to halt and restart', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for walk. The horse feels tense through the neck and back.',
      options: [
        { label: 'Offer long rein and breathing room', success: 80, neutral: 15, fail: 5, moodMod: { Distress: -10, Happy: 5 }, personalityMod: { Spooky: -5 }, effects: { bond: 1, skill: 1 } },
        { label: 'Ask tiny bend left-right', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Keep direct contact and push on', success: 50, neutral: 30, fail: 20, moodMod: { Distress: -10 }, personalityMod: { Stubborn: -5 }, effects: { bond: -1, skill: 0 } },
        { label: 'End and reset from halt', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for walk. The horse marches forward confidently and attentive.',
      options: [
        { label: 'Keep the rhythm and reward often', success: 90, neutral: 8, fail: 2, moodMod: { Motivated: 5 }, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 2, skill: 1 } },
        { label: 'Add shoulder-fore feel', success: 75, neutral: 20, fail: 5, moodMod: { Happy: 5 }, personalityMod: { Unfocused: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Transition up promptly', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 1 } },
        { label: 'End on this good note', success: 90, neutral: 8, fail: 2, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } }
      ]
    },
    {
      text: 'You begin walk warm-up. The horse is nervous and sensitive, spooking at small objects.',
      options: [
        { label: 'Halt and calm with voice', success: 80, neutral: 15, fail: 5, moodMod: { Distress: -10 }, personalityMod: { Spooky: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Circle to regain focus', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Ignore it and continue', success: 65, neutral: 20, fail: 15, moodMod: {}, personalityMod: { Spooky: -10 }, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You begin walk warm-up. The horse is energetic and playful, stepping high and prancing.',
      options: [
        { label: 'Sit quietly and maintain rhythm', success: 75, neutral: 20, fail: 5, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Ask for bending', success: 70, neutral: 20, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 1 } },
        { label: 'Allow prancing briefly', success: 65, neutral: 25, fail: 10, moodMod: {}, personalityMod: { Energetic: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You begin walk warm-up. The horse is lazy and stubborn, dragging behind.',
      options: [
        { label: 'Apply leg pressure', success: 75, neutral: 15, fail: 10, moodMod: { 'Try-Hard': 10 }, personalityMod: { Lazy: -10, Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Use voice encouragement', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Lazy: -10 }, effects: { bond: 1, skill: 0 } },
        { label: 'Accept slow pace', success: 60, neutral: 25, fail: 15, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  trot: [
    {
      text: 'You ask for trot. The horse rushes forward and gets flat in the stride.',
      options: [
        { label: 'Half-halt repeatedly to slow the tempo', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 10, 'Overly-Active': -10 }, personalityMod: { Stubborn: -10, Energetic: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Sit deeper and steady contact', success: 55, neutral: 30, fail: 15, moodMod: { Happy: 10 }, personalityMod: { 'Easy-Going': 10, Unfocused: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Allow the pace and continue', success: 30, neutral: 30, fail: 40, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -5 }, effects: { bond: -1, skill: 0 } },
        { label: 'Return to walk and retry', success: 70, neutral: 20, fail: 10, moodMod: { 'No energy': -5 }, personalityMod: {}, effects: { bond: 0, skill: 1 } }
      ]
    },
    {
      text: 'You ask for trot. The horse feels dull, breaks to walk, and ignores light aids.',
      options: [
        { label: 'Add stronger leg and encouragement', success: 55, neutral: 30, fail: 15, moodMod: { 'Try-Hard': 10 }, personalityMod: { Lazy: -10 }, effects: { bond: 0, skill: 2 } },
        { label: 'Use transitions to build energy', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Accept the low pace and continue', success: 35, neutral: 40, fail: 25, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End flatwork early', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for trot. The horse spooks sideways and loses balance for a stride.',
      options: [
        { label: 'Keep leg on and ride forward', success: 65, neutral: 20, fail: 15, moodMod: { 'Bad moods': -10 }, personalityMod: { Spooky: -10, 'Bomb-proof': 10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Circle to regain rhythm', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Pull back sharply to stop', success: 40, neutral: 20, fail: 40, moodMod: { Distress: -10 }, personalityMod: { Spooky: -10 }, effects: { bond: -1, skill: 0 } },
        { label: 'End the session for safety', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for trot. The horse throws the head and braces in the contact.',
      options: [
        { label: 'Soften hand and steady rhythm', success: 65, neutral: 20, fail: 15, moodMod: { Happy: 10 }, personalityMod: { Stubborn: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Ride more forward through it', success: 45, neutral: 30, fail: 25, moodMod: { Distress: -10 }, personalityMod: { Energetic: -5 }, effects: { bond: -1, skill: 1 } },
        { label: 'Halt and check tack fit', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Stop trot work for now', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for trot. The horse tries hard but gets irregular in tempo.',
      options: [
        { label: 'Support with leg and contact', success: 65, neutral: 25, fail: 10, moodMod: { 'Try-Hard': 10 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Slow and simplify the line', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Push for bigger trot now', success: 45, neutral: 25, fail: 30, moodMod: { Distress: -10 }, personalityMod: {}, effects: { bond: -1, skill: 0 } },
        { label: 'Reset with walk transition', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 1 } }
      ]
    },
    {
      text: 'You ask for trot. The horse is balanced and very responsive today.',
      options: [
        { label: 'Continue on current line', success: 80, neutral: 15, fail: 5, moodMod: { Motivated: 5 }, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Add circles and diagonals', success: 70, neutral: 20, fail: 10, moodMod: { Happy: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Ask canter transition now', success: 65, neutral: 20, fail: 15, moodMod: {}, personalityMod: { Energetic: 5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Reward and finish this set', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } }
      ]
    },
    {
      text: 'You ask for trot warm-up. The horse is strong and pulling, rushing ahead.',
      options: [
        { label: 'Half-halt and rebalance', success: 70, neutral: 20, fail: 10, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -5, Stubborn: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Circle to regain control', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -5 }, effects: { bond: 1, skill: 1 } },
        { label: 'Allow a few strides before correcting', success: 65, neutral: 20, fail: 15, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'Return to walk', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for trot warm-up. The horse is distracted and curious, drifting sideways.',
      options: [
        { label: 'Circle to regain focus', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Shorten reins', success: 70, neutral: 20, fail: 10, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Ignore and continue', success: 60, neutral: 25, fail: 15, moodMod: {}, personalityMod: {}, effects: { bond: -1, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for trot warm-up. The horse is energetic and playful, trotting in exaggerated steps.',
      options: [
        { label: 'Ride quietly', success: 75, neutral: 20, fail: 5, moodMod: { Happy: 5 }, personalityMod: { Energetic: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Add light lateral work', success: 70, neutral: 20, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 2 } },
        { label: 'Accept short bursts', success: 65, neutral: 25, fail: 10, moodMod: {}, personalityMod: { Energetic: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  jumping: [
    {
      text: 'You approach the jump. The horse locks onto the fence and starts rushing.',
      options: [
        { label: 'Add half-halt and shorten stride', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 10, Distress: -10 }, personalityMod: { Energetic: -5, 'Bomb-proof': 10 }, effects: { bond: 1, skill: 2, refusal: -5 } },
        { label: 'Circle away and re-approach', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Stubborn: -5 }, effects: { bond: 1, skill: 1, refusal: -8 } },
        { label: 'Let horse jump out of stride', success: 35, neutral: 25, fail: 40, moodMod: { 'Overly-Active': -10 }, personalityMod: { Spooky: -10 }, effects: { bond: -1, skill: 0, refusal: 10 } },
        { label: 'Lower the fence', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 10 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -10 } }
      ]
    },
    {
      text: 'You approach the jump. The horse backs off and adds strides, losing impulsion.',
      options: [
        { label: 'Add leg and open stride slightly', success: 60, neutral: 25, fail: 15, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -10 }, effects: { bond: 0, skill: 2, refusal: -2 } },
        { label: 'Circle and re-approach quietly', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -6 } },
        { label: 'Accept deep distance and jump', success: 45, neutral: 30, fail: 25, moodMod: {}, personalityMod: { Unfocused: -5 }, effects: { bond: 0, skill: 0, refusal: 4 } },
        { label: 'Abort and lower the fence', success: 85, neutral: 10, fail: 5, moodMod: { Happy: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -10 } }
      ]
    },
    {
      text: 'You approach the jump. The horse drifts and stops listening to steering aids.',
      options: [
        { label: 'Halt and regroup before retry', success: 75, neutral: 15, fail: 10, moodMod: { 'Bad moods': -10 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1, refusal: -6 } },
        { label: 'Switch to flatwork for obedience', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Spooky: -5 }, effects: { bond: 1, skill: 1, refusal: -8 } },
        { label: 'Push forward firmly', success: 35, neutral: 25, fail: 40, moodMod: { Distress: -10 }, personalityMod: { Stubborn: -10 }, effects: { bond: -1, skill: 0, refusal: 10 } },
        { label: 'End jumping for today', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -2 } }
      ]
    },
    {
      text: 'You approach the jump. The horse chips in with an extra short stride.',
      options: [
        { label: 'Steady canter and retry same fence', success: 70, neutral: 20, fail: 10, moodMod: { Motivated: 5 }, personalityMod: { Stubborn: -5 }, effects: { bond: 1, skill: 1, refusal: -4 } },
        { label: 'Add more leg earlier on approach', success: 65, neutral: 25, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 2, refusal: -3 } },
        { label: 'Drop height and build confidence', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -8 } },
        { label: 'Move to a different exercise', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -2 } }
      ]
    },
    {
      text: 'After landing, the horse bucks and throws the shoulder out.',
      options: [
        { label: 'Sit deep and ride straight away', success: 65, neutral: 25, fail: 10, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -5 }, effects: { bond: 0, skill: 1, refusal: 2 } },
        { label: 'Circle to restore balance', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -3 } },
        { label: 'Halt and calm before next fence', success: 80, neutral: 15, fail: 5, moodMod: { Distress: -5 }, personalityMod: { Spooky: -5 }, effects: { bond: 1, skill: 0, refusal: -4 } },
        { label: 'End jumping while still safe', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -1 } }
      ]
    },
    {
      text: 'At the fence, the horse slams on the brakes and refuses.',
      options: [
        { label: 'Pat and calmly retry', success: 65, neutral: 25, fail: 10, moodMod: { Happy: 5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 1, skill: 1, refusal: -2 } },
        { label: 'Lower fence and rebuild confidence', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -10 } },
        { label: 'Push again immediately', success: 40, neutral: 20, fail: 40, moodMod: { Distress: -10 }, personalityMod: { Stubborn: -10, Spooky: -10 }, effects: { bond: -1, skill: 0, refusal: 12 } },
        { label: 'Stop jumping and reset next ride', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -4 } }
      ]
    },
    {
      text: 'You approach the jump. The horse suddenly bolts after spooking at a shadow near the fence.',
      options: [
        { label: 'Halt and regain control before retrying', success: 70, neutral: 20, fail: 10, moodMod: { Distress: -10 }, personalityMod: { Spooky: -10 }, effects: { bond: 1, skill: 1, refusal: -3 } },
        { label: 'Circle to reset rhythm and confidence', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1, refusal: -6 } },
        { label: 'Push forward and jump despite distraction', success: 60, neutral: 25, fail: 15, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 1, refusal: 2 } },
        { label: 'End session to avoid stress', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -2 } }
      ]
    },
    {
      text: 'At takeoff, the horse bucks lightly and lifts unevenly after a sudden arena noise.',
      options: [
        { label: 'Sit deep and ride forward to support landing', success: 65, neutral: 20, fail: 15, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -10 }, effects: { bond: 0, skill: 1, refusal: 2 } },
        { label: 'Lower the fence for confidence', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -8 } },
        { label: 'Repeat at the same height carefully', success: 70, neutral: 20, fail: 10, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 1, refusal: -2 } },
        { label: 'End jumping immediately', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -1 } }
      ]
    },
    {
      text: 'After landing from a jump, the horse bolts for a few strides with tense hindquarters.',
      options: [
        { label: 'Apply rein and leg aids to regain control', success: 70, neutral: 20, fail: 10, moodMod: { Distress: -10 }, personalityMod: { Energetic: -5 }, effects: { bond: 0, skill: 1, refusal: 0 } },
        { label: 'Circle and calm before continuing', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -3 } },
        { label: 'Halt immediately to prevent injury', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 0, refusal: -2 } },
        { label: 'End jumping session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0, refusal: -2 } }
      ]
    }
  ],
  dressage: [
    {
      text: 'You ask for more collection. The horse braces and tightens through the back.',
      options: [
        { label: 'Soften reins and rebalance', success: 70, neutral: 20, fail: 10, moodMod: { Happy: 10 }, personalityMod: { Stubborn: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Push through resistance', success: 50, neutral: 25, fail: 25, moodMod: { Distress: -10 }, personalityMod: { Energetic: -5 }, effects: { bond: -1, skill: 1 } },
        { label: 'Halt and reassess', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'End the session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for collection again. The horse shortens too much and loses forward energy.',
      options: [
        { label: 'Add leg to keep impulsion', success: 65, neutral: 25, fail: 10, moodMod: { Motivated: 5 }, personalityMod: { Lazy: -10 }, effects: { bond: 0, skill: 2 } },
        { label: 'Return to working gait briefly', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Accept lighter collection', success: 50, neutral: 35, fail: 15, moodMod: {}, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 0, skill: 1 } },
        { label: 'End this movement and reset', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for lateral work. The horse loses bend and drifts off the line.',
      options: [
        { label: 'Simplify to a larger line', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Use inside leg to outside rein', success: 70, neutral: 20, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 2 } },
        { label: 'Keep asking same difficulty', success: 45, neutral: 25, fail: 30, moodMod: { Distress: -10 }, personalityMod: { Stubborn: -5 }, effects: { bond: -1, skill: 0 } },
        { label: 'Take a short walk break', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } }
      ]
    },
    {
      text: 'You ask for a transition. The horse overreacts and loses balance.',
      options: [
        { label: 'Repeat with quieter aids', success: 70, neutral: 20, fail: 10, moodMod: { Happy: 5 }, personalityMod: { Energetic: -5 }, effects: { bond: 1, skill: 1 } },
        { label: 'Circle then retry transition', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Ride forward and ignore it', success: 50, neutral: 30, fail: 20, moodMod: {}, personalityMod: { Unfocused: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'Switch to easier exercise', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 1 } }
      ]
    },
    {
      text: 'You ask for connection. The horse resists and hollows briefly.',
      options: [
        { label: 'Soften and ask for stretch', success: 70, neutral: 20, fail: 10, moodMod: { Happy: 10 }, personalityMod: { Stubborn: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Ride forward to the hand', success: 65, neutral: 25, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 1 } },
        { label: 'Hold tighter contact', success: 40, neutral: 25, fail: 35, moodMod: { Distress: -10 }, personalityMod: { Spooky: -10 }, effects: { bond: -1, skill: 0 } },
        { label: 'Reset with a walk transition', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } }
      ]
    },
    {
      text: 'You ask for collection and the horse feels light, balanced, and willing.',
      options: [
        { label: 'Continue this quality', success: 85, neutral: 10, fail: 5, moodMod: { Motivated: 5 }, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Increase difficulty slightly', success: 75, neutral: 20, fail: 5, moodMod: { Happy: 5 }, personalityMod: {}, effects: { bond: 0, skill: 2 } },
        { label: 'Reward and then repeat once', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 2, skill: 1 } },
        { label: 'End on a perfect note', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 2, skill: 0 } }
      ]
    },
    {
      text: 'You ask for more collection. The horse is lazy and stubborn, shortening stride but losing rhythm.',
      options: [
        { label: 'Add leg', success: 70, neutral: 20, fail: 10, moodMod: { 'Try-Hard': 5 }, personalityMod: { Lazy: -10, Stubborn: -10 }, effects: { bond: 0, skill: 2 } },
        { label: 'Accept lighter collection', success: 65, neutral: 25, fail: 10, moodMod: {}, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Return to working gait', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'End exercise', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for lateral movement. The horse is nervous and sensitive, fidgeting and spooking sideways.',
      options: [
        { label: 'Calm with voice', success: 75, neutral: 20, fail: 5, moodMod: { Distress: -10 }, personalityMod: { Spooky: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Simplify exercise', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Return to straight line', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 1 } },
        { label: 'End lateral work', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You attempt a higher-level movement. The horse is distracted and curious, bolting forward or breaking gait.',
      options: [
        { label: 'Circle to regain focus', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Repeat movement slowly', success: 75, neutral: 15, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 2 } },
        { label: 'Accept short attempt', success: 65, neutral: 25, fail: 10, moodMod: {}, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  canter: [
    {
      text: 'You ask for canter. The horse surges forward and quickens beyond your aids.',
      options: [
        { label: 'Sit deep and apply half-halt', success: 65, neutral: 25, fail: 10, moodMod: { Motivated: 10 }, personalityMod: { Energetic: -5, Stubborn: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Circle to regain balance', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Let canter settle naturally', success: 55, neutral: 25, fail: 20, moodMod: { 'Overly-Active': -10 }, personalityMod: { Spooky: -5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Return to trot and retry', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 1 } }
      ]
    },
    {
      text: 'You ask for canter. The horse ignores the aid and stays in a flat trot.',
      options: [
        { label: 'Add stronger leg and repeat aid', success: 70, neutral: 20, fail: 10, moodMod: { 'Try-Hard': 10 }, personalityMod: { Lazy: -10 }, effects: { bond: 0, skill: 2 } },
        { label: 'Use a light whip aid', success: 65, neutral: 25, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Accept trot and continue', success: 50, neutral: 30, fail: 20, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End canter work', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for canter. The horse picks up the wrong lead and falls inward.',
      options: [
        { label: 'Correct immediately and rebalance', success: 70, neutral: 20, fail: 10, moodMod: { Motivated: 5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Continue briefly then correct', success: 60, neutral: 30, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 0, skill: 1 } },
        { label: 'Return to trot and reorganize', success: 75, neutral: 20, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'End the canter phase', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for canter. The horse gives a calm, balanced transition and waits.',
      options: [
        { label: 'Continue canter work', success: 85, neutral: 10, fail: 5, moodMod: { Happy: 5 }, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Ask for more collection', success: 75, neutral: 20, fail: 5, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 2 } },
        { label: 'Ride circle or diagonal', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: { Unfocused: -5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Praise and move on', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 2, skill: 0 } }
      ]
    },
    {
      text: 'While cantering, the horse leans and drifts through the shoulder.',
      options: [
        { label: 'Support with outside rein and leg', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 2 } },
        { label: 'Ride a corrective circle', success: 75, neutral: 20, fail: 5, moodMod: {}, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Ignore and continue', success: 50, neutral: 30, fail: 20, moodMod: {}, personalityMod: {}, effects: { bond: -1, skill: 0 } },
        { label: 'Transition to trot and reset', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 1 } }
      ]
    },
    {
      text: 'While cantering, the horse gets overexcited and quickens each stride.',
      options: [
        { label: 'Apply repeated half-halts', success: 70, neutral: 20, fail: 10, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Circle smaller to regain control', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Let forward then stabilize later', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: -1, skill: 0 } },
        { label: 'Return to trot early', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for canter warm-up. The horse is lazy and stubborn, struggling to pick up gait.',
      options: [
        { label: 'Add leg aid', success: 75, neutral: 15, fail: 10, moodMod: { 'Try-Hard': 10 }, personalityMod: { Lazy: -10, Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Repeat canter cue', success: 70, neutral: 20, fail: 10, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Accept slow canter', success: 60, neutral: 25, fail: 15, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'Return to trot', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for canter warm-up. The horse is nervous and sensitive, bolting suddenly.',
      options: [
        { label: 'Half-halt and circle', success: 70, neutral: 20, fail: 10, moodMod: { Distress: -10 }, personalityMod: { Spooky: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Allow forward stride then regain control', success: 65, neutral: 20, fail: 15, moodMod: {}, personalityMod: { Energetic: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'Halt and reset', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for canter warm-up. The horse is energetic and playful, bucking lightly.',
      options: [
        { label: 'Sit deep and ride forward', success: 75, neutral: 15, fail: 10, moodMod: { Happy: 5 }, personalityMod: { Energetic: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Circle to calm', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Accept mild bucking', success: 65, neutral: 20, fail: 15, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: -1, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  work_in_hand: [
    {
      text: 'You work in hand. The horse is alert and looking around instead of focusing.',
      options: [
        { label: 'Use voice and calm body language', success: 75, neutral: 20, fail: 5, moodMod: { Happy: 10 }, personalityMod: { Unfocused: -10 }, effects: { bond: 2, skill: 1 } },
        { label: 'Repeat aid more firmly', success: 65, neutral: 25, fail: 10, moodMod: { Distress: -5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Accept minimal response', success: 50, neutral: 30, fail: 20, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'End in-hand work', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for in-hand canter. The horse surges forward and pulls the lead.',
      options: [
        { label: 'Shorten the lead and rebalance', success: 70, neutral: 20, fail: 10, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Circle to regain control', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Allow a few strides before slowing', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'Stop the in-hand canter attempt', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for in-hand canter. The horse stays in trot and feels hesitant.',
      options: [
        { label: 'Encourage with clear voice/body', success: 70, neutral: 20, fail: 10, moodMod: { 'Try-Hard': 10 }, personalityMod: { Lazy: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Repeat aid more firmly', success: 65, neutral: 25, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Accept trot and continue', success: 50, neutral: 30, fail: 20, moodMod: { 'No energy': -10 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End in-hand canter work', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for in-hand canter. The horse strikes off correctly and stays attentive.',
      options: [
        { label: 'Continue briefly', success: 85, neutral: 10, fail: 5, moodMod: { Happy: 5 }, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 2, skill: 1 } },
        { label: 'Ask for downward transition', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Praise and repeat once', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 2, skill: 1 } },
        { label: 'End on this good attempt', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 2, skill: 0 } }
      ]
    },
    {
      text: 'You ask for in-hand canter. The horse drifts off the circle and loses line.',
      options: [
        { label: 'Refocus with voice and lead', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 1, skill: 1 } },
        { label: 'Halt and reset position', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Continue despite drift', success: 50, neutral: 30, fail: 20, moodMod: {}, personalityMod: {}, effects: { bond: -1, skill: 0 } },
        { label: 'End this exercise', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You ask for in-hand canter. The horse breaks gait quickly after a few strides.',
      options: [
        { label: 'Accept short canter moments', success: 70, neutral: 20, fail: 10, moodMod: { 'Try-Hard': 5 }, personalityMod: { Lazy: -5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Encourage more forward energy', success: 65, neutral: 25, fail: 10, moodMod: { Motivated: 5 }, personalityMod: {}, effects: { bond: 0, skill: 1 } },
        { label: 'Return to trot calmly', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'End the session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  cool_down: [
    {
      text: 'You begin cool-down. The horse is tense but listening.',
      options: [
        { label: 'Walk longer on a long rein', success: 80, neutral: 15, fail: 5, moodMod: { Distress: -10, Happy: 10 }, personalityMod: { Spooky: -5 }, effects: { bond: 1, skill: 0 } },
        { label: 'Ask gentle bending', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Halt and reassess', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You begin cool-down. The horse is still too fresh and fidgety in walk.',
      options: [
        { label: 'Keep a steady contact and quiet seat', success: 70, neutral: 20, fail: 10, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -5 }, effects: { bond: 1, skill: 0 } },
        { label: 'Allow a brief forward walk before softening', success: 65, neutral: 25, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'Halt until fully still', success: 80, neutral: 15, fail: 5, moodMod: { Grumpy: -5 }, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End ride and dismount', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You begin cool-down. The horse stretches and softens nicely right away.',
      options: [
        { label: 'Allow long rein and quiet walk', success: 90, neutral: 10, fail: 0, moodMod: { Happy: 5 }, personalityMod: { 'Easy-Going': 5 }, effects: { bond: 2, skill: 0 } },
        { label: 'Continue walking for recovery', success: 85, neutral: 15, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Dismount and finish', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Praise and end on a good note', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 2, skill: 0 } }
      ]
    },
    {
      text: 'You begin cool-down. The horse remains alert and scans the environment.',
      options: [
        { label: 'Use calm voice and steady walk', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: { Spooky: -10 }, effects: { bond: 1, skill: 0 } },
        { label: 'Walk longer before ending', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Halt and wait for quiet', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 0 } },
        { label: 'End early to avoid escalation', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You cool down in hand. The horse drifts ahead and pulls on the lead.',
      options: [
        { label: 'Shorten lead and slow tempo', success: 75, neutral: 20, fail: 5, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -10 }, effects: { bond: 0, skill: 0 } },
        { label: 'Circle once and rejoin line', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Ignore minor pulling', success: 60, neutral: 30, fail: 10, moodMod: {}, personalityMod: {}, effects: { bond: -1, skill: 0 } },
        { label: 'End hand-walk now', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    },
    {
      text: 'You cool down in hand. The horse is tired and starts lagging behind.',
      options: [
        { label: 'Slow your pace and encourage', success: 85, neutral: 10, fail: 5, moodMod: { 'No energy': -5 }, personalityMod: { Lazy: -5 }, effects: { bond: 1, skill: 0 } },
        { label: 'Pause for a short stand', success: 90, neutral: 10, fail: 0, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'End the cooldown immediately', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'Continue gently to stable', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ]
};

const TRAINING_ACTIONS_BY_DISCIPLINE = {
  jumping: ['scheme', 'walk', 'trot', 'canter', 'jumping', 'cool_down'],
  dressage: ['scheme', 'walk', 'trot', 'canter', 'dressage', 'work_in_hand', 'cool_down'],
  hunter: ['scheme', 'walk', 'trot', 'canter', 'jumping', 'cool_down'],
  eventing: ['scheme', 'walk', 'trot', 'canter', 'jumping', 'dressage', 'cool_down']
};

function actionLabel(action) {
  if (action === 'cool_down') return 'COOL-DOWN';
  return action.replace('_', ' ').toUpperCase();
}

function generateTrainingEnvironment() {
  return {
    wind: pick(ENVIRONMENT_OPTIONS.wind),
    noise: pick(ENVIRONMENT_OPTIONS.noise),
    footing: pick(ENVIRONMENT_OPTIONS.footing),
    nearby: pick(ENVIRONMENT_OPTIONS.nearby),
    visual: pick(ENVIRONMENT_OPTIONS.visual)
  };
}

function randomTrainingEvent() {
  const roll = rnd(1, 100);
  if (roll <= 4) {
    return {
      category: 'breakthrough',
      text: 'Breakthrough moment: horse and rider lock into true sync for several strides.',
      confidenceBonus: 10,
      bondBonus: 5
    };
  }
  if (roll <= 35) return { category: 'funny', text: pick(TRAINING_EVENT_POOL.funny), confidenceBonus: 0, bondBonus: 1 };
  if (roll <= 65) return { category: 'scary', text: pick(TRAINING_EVENT_POOL.scary), confidenceBonus: -2, bondBonus: 0 };
  return { category: 'realistic', text: pick(TRAINING_EVENT_POOL.realistic), confidenceBonus: 1, bondBonus: 0 };
}

function disciplineConfidenceField(discipline) {
  return discipline === 'dressage' ? 'confidenceFlat' : 'confidenceJump';
}

function buildRpgNarrative(horse, session) {
  const pronoun = horse.gender === 'Mare' ? 'she' : 'he';
  const variant = session.variant;
  const env = session.environment;
  const lines = [
    variant.text,
    `${horse.name} feels ${horse.mood.toLowerCase()} today, and that mood blends with a ${horse.personality.toLowerCase()} personality in every response to your aids.`,
    `The ${env.wind.toLowerCase()} and ${env.noise.toLowerCase()} atmosphere combine with ${env.footing.toLowerCase()} footing, so ${pronoun} keeps checking ${env.visual}.`,
    `You feel muscles alternately soften and brace through the topline while balance shifts in subtle waves under the saddle.`
  ];
  if (session.pendingEvent) lines.push(`Random event: ${session.pendingEvent.text}`);
  return lines.join(' ');
}

function personalityOutcomeModifier(personality) {
  if (personality === 'Hot-Blooded') return -15;
  if (personality === 'Excitable') return -10;
  if (personality === 'Stubborn') return -8;
  if (personality === 'Easy-Going') return 8;
  if (personality === 'Bomb-proof') return 5;
  if (personality === 'Energetic') return 4;
  if (personality === 'Spooky') return -10;
  if (personality === 'Lazy') return -4;
  if (personality === 'Unfocused') return -8;
  return 0;
}

function moodOutcomeModifier(mood) {
  if (mood === 'Motivated') return 8;
  if (mood === 'Happy') return 6;
  if (mood === 'Try-Hard') return 5;
  if (mood === 'Neutral') return 0;
  if (mood === 'Uncomfortable') return -6;
  if (mood === 'Distress') return -10;
  if (mood === 'Overly-Active') return -7;
  if (mood === 'No energy') return -8;
  if (mood === 'Bad moods') return -6;
  if (mood === 'Grumpy') return -5;
  return 0;
}

function trainingActionPool(action) {
  if (TRAINING_OPTION_LIBRARY[action]) return TRAINING_OPTION_LIBRARY[action];
  if (action === 'work_in_hand') return TRAINING_OPTION_LIBRARY.cool_down;
  return TRAINING_OPTION_LIBRARY.trot;
}

function buildTrainingActionText(action, horse, environment) {
  const pronoun = horse.gender === 'Mare' ? 'she' : 'he';
  const envLine = `Wind is ${environment.wind.toLowerCase()}, noise is ${environment.noise.toLowerCase()}, and footing feels ${environment.footing.toLowerCase()}.`;
  if (action === 'walk') return `You begin warm-up at walk and ${horse.name} steps out with ears flicking between you and the arena. ${pronoun[0].toUpperCase() + pronoun.slice(1)} shows ${horse.personality.toLowerCase()} tendencies, while a ${horse.mood.toLowerCase()} mood colors each reaction to your aids. ${envLine} The body feels active but not fully settled, so early rhythm and trust matter more than flashy movement.`;
  if (action === 'trot') return `You ask for trot and ${horse.name} moves into a working rhythm with visible effort through shoulder and back. ${pronoun[0].toUpperCase() + pronoun.slice(1)} reacts to your timing with a mix of willingness and tension shaped by ${horse.personality.toLowerCase()} behavior. ${envLine} The stride can either organize or unravel depending on how clearly you ride the line.`;
  if (action === 'canter') return `You ask for canter and ${horse.name} offers energy that needs careful channeling. The horse body lifts, then wavers as balance, impulsion, and attention compete for control in each stride. ${envLine} With a ${horse.mood.toLowerCase()} mindset and ${horse.personality.toLowerCase()} tendencies, this moment tests feel, patience, and commitment.`;
  if (action === 'jumping') return `Main work starts over fences with your eye on line, pace, and jump timing. ${horse.name} reads each question through ${horse.personality.toLowerCase()} instincts and a ${horse.mood.toLowerCase()} emotional state, so no effort is guaranteed. ${envLine} Muscles tighten and release around takeoff, and your choices now shape confidence as much as technical success.`;
  if (action === 'dressage') return `Main flatwork begins with transitions, figures, and precision in the contact. ${horse.name} offers moments of softness and resistance as mood and personality filter every aid. ${envLine} Through the body, rhythm and balance fluctuate, making this a realistic conversation rather than automatic execution.`;
  return `You begin cool-down and let ${horse.name} decompress after effort. Breathing starts to settle while tension drains out in uneven waves through neck, back, and stride. ${envLine} A calm finish reinforces trust, even if the earlier work was imperfect.`;
}

function pickTrainingVariant(action, horse, environment) {
  const pool = trainingActionPool(action).map((opt) => ({ ...opt, moodMod: {}, personalityMod: {} }));
  return {
    id: rnd(1, 20),
    text: buildTrainingActionText(action, horse, environment),
    options: pool
  };
}

function defaultTrainingRpgConfig() {
  return { walk: 1, trot: 1, canter: 1, discipline: 1, coolDown: 2 };
}

function normalizeTrainingRpgConfig(config) {
  const base = defaultTrainingRpgConfig();
  const src = (config && typeof config === 'object') ? config : {};
  return {
    walk: clamp(Number(src.walk) || base.walk, 1, 4),
    trot: clamp(Number(src.trot) || base.trot, 1, 4),
    canter: clamp(Number(src.canter) || base.canter, 1, 4),
    discipline: clamp(Number(src.discipline) || base.discipline, 1, 6),
    coolDown: clamp(Number(src.coolDown) || base.coolDown, 1, 4)
  };
}

function primaryDisciplineAction(discipline) {
  if (discipline === 'dressage') return 'dressage';
  return 'jumping';
}

function buildTrainingRpgSteps(discipline, config) {
  const c = normalizeTrainingRpgConfig(config);
  const primary = primaryDisciplineAction(discipline);
  const steps = [];
  for (let i = 0; i < c.walk; i += 1) steps.push('walk');
  for (let i = 0; i < c.trot; i += 1) steps.push('trot');
  for (let i = 0; i < c.canter; i += 1) steps.push('canter');
  for (let i = 0; i < c.discipline; i += 1) steps.push(primary);
  for (let i = 0; i < c.coolDown; i += 1) steps.push('cool_down');
  return steps;
}

function buildTrainingRpgSession(horse, discipline, config = app.trainingRpgConfig) {
  app.trainingRpgFeedback = '';
  app.trainingRpgSummary = null;
  const steps = buildTrainingRpgSteps(discipline, config);
  const stepIndex = 0;
  const action = steps[stepIndex];
  const environment = generateTrainingEnvironment();
  const variant = pickTrainingVariant(action, horse, environment);
  return {
    horseId: horse.id,
    discipline,
    action,
    variant,
    steps,
    stepIndex,
    at: dateLabel(),
    environment,
    actionsSinceEvent: 0,
    nextEventAt: rnd(2, 4),
    pendingEvent: null,
    summary: { skill: 0, confidence: 0, bond: 0, fatigue: 0, notableEvent: '' }
  };
}

function advanceTrainingRpgSession(session, horse) {
  const steps = Array.isArray(session.steps) && session.steps.length ? session.steps : (TRAINING_ACTIONS_BY_DISCIPLINE[session.discipline] || ['walk', 'trot', 'canter']);
  const stepIndex = (session.stepIndex || 0) + 1;
  if (stepIndex >= steps.length) return null;
  const action = steps[stepIndex];
  return {
    ...session,
    steps,
    stepIndex,
    action,
    variant: pickTrainingVariant(action, horse, session.environment || generateTrainingEnvironment()),
    pendingEvent: null
  };
}

function resolveRpgOption(option, horse, session) {
  const moodBonus = option.moodMod?.[horse.mood] || 0;
  const personalityBonus = option.personalityMod?.[horse.personality] || 0;
  const bondBonus = Math.round(((horse.bond || 0) - 40) * 0.25);
  const qualityBonus = Math.round((calculateHorseQualityOfLife(horse) - 55) * 0.3);
  const controlBonus = Math.round(((horse.controlability || 50) - 50) * 0.18);
  const confidenceField = disciplineConfidenceField(session.discipline);
  const confidenceBonus = Math.round(((horse[confidenceField] ?? 50) - 50) * 0.2);
  const skillBonus = Math.round((effectiveDisciplineSkill(horse, session.discipline) - 50) * 0.22);
  const environmentPenalty = session.environment && ['Gusty', 'Unexpected loud sounds', 'Slightly slick in spots', 'Choppy and uneven', 'Crowded schooling ring'].some((hazard) => Object.values(session.environment).includes(hazard)) ? -4 : 0;
  const successChance = clamp(
    Math.round(option.success * 0.25) + moodBonus + personalityBonus + (moodOutcomeModifier(horse.mood) * 2) + (personalityOutcomeModifier(horse.personality) * 1.6) + bondBonus + qualityBonus + controlBonus + confidenceBonus + skillBonus + environmentPenalty,
    5,
    95
  );
  const neutralChance = clamp(option.neutral, 0, 95 - successChance);
  const failChance = Math.max(0, 100 - successChance - neutralChance);
  const roll = rnd(1, 100);
  let outcome = 'fail';
  if (roll <= successChance) outcome = 'success';
  else if (roll <= successChance + neutralChance) outcome = 'neutral';

  const skillBase = option.effects?.skill || 0;
  const bondDelta = option.effects?.bond || 0;
  const fatigueGain = outcome === 'success' ? rnd(2, 4) : outcome === 'neutral' ? rnd(3, 5) : rnd(4, 7);
  horse.fatigue = clamp((horse.fatigue || 0) + fatigueGain, 0, 100);
  horse.focus = clamp((horse.focus || 50) + (outcome === 'success' ? 3 : outcome === 'neutral' ? 0 : -4), 0, 100);
  let confidenceDelta = outcome === 'success' ? 2 : outcome === 'neutral' ? 0 : -1;

  if (session.pendingEvent) {
    confidenceDelta += session.pendingEvent.confidenceBonus || 0;
    horse.bond = clamp((horse.bond || 0) + (session.pendingEvent.bondBonus || 0), horse.isRescue ? -50 : 0, 100);
  }

  horse[confidenceField] = clamp((horse[confidenceField] ?? 50) + confidenceDelta, 0, 100);

  if (outcome === 'success') {
    horse.bond = clamp((horse.bond || 0) + Math.max(0, bondDelta), horse.isRescue ? -50 : 0, 100);
  } else if (outcome === 'fail') {
    horse.bond = clamp((horse.bond || 0) + Math.min(0, bondDelta), horse.isRescue ? -50 : 0, 100);
  }
  return { outcome, successChance, neutralChance, failChance, skillBase, confidenceDelta, fatigueGain, bondDelta: outcome === 'success' ? Math.max(0, bondDelta) : outcome === 'fail' ? Math.min(0, bondDelta) : 0 };
}

function normalizeMarkingForBreed(marking, breed) {
  const lower = String(breed || '').toLowerCase();
  if (lower.includes('friesian')) return 'None';
  if (!marking.includes('Rabicano')) return marking;
  if (lower.includes('arab')) return marking;
  return pick(MARKINGS.filter((m) => m !== 'Rabicano'));
}

const GENE_KEYS = ['extension', 'agouti', 'cream', 'dun', 'gray', 'champagne', 'pearl', 'roan', 'appaloosa', 'tobiano', 'overo', 'splash', 'sabino'];

function randomAlleles(dominant, recessive, opts = {}) {
  const chanceDominant = opts.chanceDominant ?? 22;
  const chanceHomoDominant = opts.chanceHomoDominant ?? 4;
  const roll = rnd(1, 100);
  if (roll <= chanceHomoDominant) return `${dominant}/${dominant}`;
  if (roll <= chanceDominant) return rnd(1, 100) <= 50 ? `${dominant}/${recessive}` : `${recessive}/${dominant}`;
  return `${recessive}/${recessive}`;
}

function randomGenetics() {
  return {
    extension: randomAlleles('E', 'e', { chanceDominant: 76, chanceHomoDominant: 24 }),
    agouti: randomAlleles('A', 'a', { chanceDominant: 68, chanceHomoDominant: 20 }),
    cream: randomAlleles('Cr', 'n', { chanceDominant: 30, chanceHomoDominant: 5 }),
    dun: randomAlleles('D', 'n', { chanceDominant: 18, chanceHomoDominant: 3 }),
    gray: randomAlleles('G', 'n', { chanceDominant: 16, chanceHomoDominant: 4 }),
    champagne: randomAlleles('Ch', 'n', { chanceDominant: 12, chanceHomoDominant: 2 }),
    pearl: randomAlleles('Prl', 'n', { chanceDominant: 9, chanceHomoDominant: 2 }),
    roan: randomAlleles('Rn', 'n', { chanceDominant: 20, chanceHomoDominant: 4 }),
    appaloosa: randomAlleles('Lp', 'n', { chanceDominant: 18, chanceHomoDominant: 4 }),
    tobiano: randomAlleles('TO', 'n', { chanceDominant: 24, chanceHomoDominant: 6 }),
    overo: randomAlleles('O', 'n', { chanceDominant: 16, chanceHomoDominant: 2 }),
    splash: randomAlleles('SW', 'n', { chanceDominant: 13, chanceHomoDominant: 2 }),
    sabino: randomAlleles('Sb', 'n', { chanceDominant: 16, chanceHomoDominant: 3 })
  };
}

function splitGenePair(pair, fallbackA, fallbackB) {
  if (!pair || typeof pair !== 'string') return [fallbackA, fallbackB];
  if (pair.includes('/')) {
    const [left, right] = pair.split('/');
    return [left || fallbackA, right || fallbackB];
  }
  const normalized = pair.trim();
  if (normalized.length === 2) return [normalized[0], normalized[1]];
  const parsed = normalized.match(/(Cr|Prl|Lp|TO|SW|Sb|Ch|Rn|[A-Za-z])/g);
  if (!parsed || parsed.length < 2) return [fallbackA, fallbackB];
  return [parsed[0], parsed[1]];
}

function isPresent(pair, allele) {
  const [a, b] = splitGenePair(pair, 'n', 'n');
  return a === allele || b === allele;
}

function countAllele(pair, allele) {
  const [a, b] = splitGenePair(pair, 'n', 'n');
  return (a === allele ? 1 : 0) + (b === allele ? 1 : 0);
}

function randomCoatShade(base) {
  if (base === 'Chestnut') return pick(['Light Chestnut', 'Chestnut', 'Dark Chestnut', 'Liver Chestnut']);
  if (base === 'Black') return pick(['Light Black', 'Bluish Black', 'True Black']);
  return pick(['Light Bay', 'Bay', 'Dark Bay', 'Blood Bay', 'Seal Bay']);
}

function determineBaseCoat(genetics) {
  const isChestnut = countAllele(genetics.extension, 'e') === 2;
  if (isChestnut) return 'Chestnut';
  const hasAgouti = isPresent(genetics.agouti, 'A');
  return hasAgouti ? 'Bay' : 'Black';
}

function applyCream(base, genetics) {
  const creamCount = countAllele(genetics.cream, 'Cr');
  if (!creamCount) return base;
  if (base === 'Chestnut') return creamCount === 2 ? 'Cremello' : 'Palomino';
  if (base === 'Bay') return creamCount === 2 ? 'Perlino' : 'Buckskin';
  return creamCount === 2 ? 'Smoky Cream' : 'Smoky Black';
}

function applyDun(color, base, genetics) {
  if (!isPresent(genetics.dun, 'D')) return color;
  if (color === 'Palomino') return 'Dunalino';
  if (color === 'Buckskin') return 'Dunskin';
  if (base === 'Chestnut') return 'Red Dun';
  if (base === 'Black') return 'Grullo';
  return 'Bay Dun';
}

function applyChampagne(color, base, genetics) {
  if (!isPresent(genetics.champagne, 'Ch')) return color;
  if (base === 'Chestnut') return 'Gold Champagne';
  if (base === 'Black') return 'Classic Champagne';
  return 'Amber Champagne';
}

function applyPearl(color, base, genetics) {
  const pearlCount = countAllele(genetics.pearl, 'Prl');
  const creamCount = countAllele(genetics.cream, 'Cr');
  const activates = pearlCount === 2 || (pearlCount >= 1 && creamCount >= 1);
  if (!activates) return color;
  if (color.includes('Palomino')) return 'Palomino Pearl';
  if (color.includes('Buckskin')) return 'Buckskin Pearl';
  if (base === 'Chestnut' && creamCount >= 1) return 'Palomino Pearl';
  if (base === 'Bay' && creamCount >= 1) return 'Buckskin Pearl';
  return 'Pearl';
}

function applyGray(color, genetics) {
  if (!isPresent(genetics.gray, 'G')) return color;
  const family = pick(['Grey', 'Dapple Grey', 'Flea-bitten Grey']);
  const depth = pick(['Light', 'Medium', 'Dark']);
  return `${family} (${depth})`;
}

function randomIntensity() {
  const roll = rnd(1, 100);
  if (roll <= 30) return 'Light';
  if (roll <= 70) return 'Medium';
  return 'Intense';
}

function randomModifierPack() {
  return {
    sooty: pick(['None', 'Light', 'Medium', 'Heavy']),
    brindle: pick(['None', 'Subtle', 'Defined', 'Intense']),
    rabicano: pick(['None', 'Light', 'Medium', 'Heavy']),
    birdcatcher: pick(['None', 'Few', 'Moderate', 'Many']),
    pangare: pick(['None', 'Light', 'Medium', 'Strong']),
    dapples: pick(['None', 'Light', 'Defined', 'High Contrast']),
  };
}

function randomLegMarkings() {
  const legs = ['FR', 'FL', 'BR', 'BL'];
  const out = {};
  legs.forEach((leg) => {
    out[leg] = pick(SOCKS);
  });
  return out;
}

function socksFromLegMarkings(legs) {
  if (!legs) return 'FR:None / FL:None / BR:None / BL:None';
  return `FR:${legs.FR || 'None'} / FL:${legs.FL || 'None'} / BR:${legs.BR || 'None'} / BL:${legs.BL || 'None'}`;
}

function resolveWhitePattern(genetics) {
  const patterns = [];
  if (isPresent(genetics.appaloosa, 'Lp')) {
    const lpCount = countAllele(genetics.appaloosa, 'Lp');
    const appaloosaType = pick(['Leopard', 'Fewspot', 'Snowcap', 'Blanket', 'Spotted Blanket', 'Varnish Roan']);
    const intensity = lpCount === 2 ? 'Intense' : randomIntensity();
    patterns.push(`${appaloosaType} (${intensity})`);
  }
  if (isPresent(genetics.tobiano, 'TO')) patterns.push('Tobiano');
  if (isPresent(genetics.overo, 'O')) patterns.push('Frame Overo');
  if (isPresent(genetics.splash, 'SW')) patterns.push('Splash');
  if (isPresent(genetics.sabino, 'Sb')) patterns.push('Sabino');
  if (isPresent(genetics.roan, 'Rn')) {
    patterns.push(pick(['Red Roan', 'Bay Roan', 'Blue Roan']));
  }
  return patterns;
}

function resolvePhenotypeFromGenetics(genetics, breed = '') {
  const base = determineBaseCoat(genetics);
  let color = randomCoatShade(base);
  color = applyCream(base, genetics);
  color = applyDun(color, base, genetics);
  color = applyChampagne(color, base, genetics);
  color = applyPearl(color, base, genetics);
  color = applyGray(color, genetics);

  const patternList = resolveWhitePattern(genetics);
  const breedLower = String(breed || '').toLowerCase();
  const marking = breedLower.includes('friesian') ? 'None' : (patternList[0] || 'None');
  const marking2 = 'None';
  const face = pick(FACE_MARKINGS);
  const legs = randomLegMarkings();
  const modifiers = randomModifierPack();
  return {
    coat: color,
    marking,
    marking2,
    faceMarking: face,
    legMarkings: legs,
    socks: socksFromLegMarkings(legs),
    modifiers
  };
}

function inheritGenePair(parentA, parentB, fallbackA, fallbackB) {
  const [a1, a2] = splitGenePair(parentA, fallbackA, fallbackB);
  const [b1, b2] = splitGenePair(parentB, fallbackA, fallbackB);
  return `${pick([a1, a2])}/${pick([b1, b2])}`;
}

function foalGeneticsFromParents(dam, sire) {
  const damGen = dam?.genetics || randomGenetics();
  const sireGen = sire?.genetics || randomGenetics();
  return {
    extension: inheritGenePair(damGen.extension, sireGen.extension, 'E', 'e'),
    agouti: inheritGenePair(damGen.agouti, sireGen.agouti, 'A', 'a'),
    cream: inheritGenePair(damGen.cream, sireGen.cream, 'Cr', 'n'),
    dun: inheritGenePair(damGen.dun, sireGen.dun, 'D', 'n'),
    gray: inheritGenePair(damGen.gray, sireGen.gray, 'G', 'n'),
    champagne: inheritGenePair(damGen.champagne, sireGen.champagne, 'Ch', 'n'),
    pearl: inheritGenePair(damGen.pearl, sireGen.pearl, 'Prl', 'n'),
    roan: inheritGenePair(damGen.roan, sireGen.roan, 'Rn', 'n'),
    appaloosa: inheritGenePair(damGen.appaloosa, sireGen.appaloosa, 'Lp', 'n'),
    tobiano: inheritGenePair(damGen.tobiano, sireGen.tobiano, 'TO', 'n'),
    overo: inheritGenePair(damGen.overo, sireGen.overo, 'O', 'n'),
    splash: inheritGenePair(damGen.splash, sireGen.splash, 'SW', 'n'),
    sabino: inheritGenePair(damGen.sabino, sireGen.sabino, 'Sb', 'n')
  };
}

function randomMarking(breed, opts = {}) {
  const roll = rnd(1, 100);
  const breedLower = String(breed || '').toLowerCase();
  const isDraft = breedLower.includes('draft');
  const isFriesian = breedLower.includes('friesian');
  const isWarmblood = breedLower.includes('warmblood');
  const colorMarkings = RARE_MARKINGS.filter((m) => ['Overo', 'Sabino', 'Tobiano', 'Appaloosa', 'Leopard'].some((tag) => m.includes(tag)));
  const salesMarketBonus = opts.salesMarketBoost && isDraft ? 10 : 0;
  const baseChance = isFriesian ? 1 : isDraft ? 65 : isWarmblood ? 40 : 20;
  const chance = clamp(baseChance + salesMarketBonus, 0, 100);
  const marking = roll <= chance ? pick(isDraft ? colorMarkings : RARE_MARKINGS) : 'None';
  return normalizeMarkingForBreed(marking, breed);
}

function conformationIndex(label) {
  return Math.max(0, CONFORMATION.indexOf(label));
}

function foalConformationFromParents(dam, sire) {
  const damIdx = conformationIndex(dam?.conformation);
  const sireIdx = conformationIndex(sire?.conformation);
  const center = Math.round((damIdx + sireIdx) / 2);
  const roll = rnd(1, 100);
  let shift = 0;
  if (roll <= 20) shift = -1;
  else if (roll >= 81) shift = 1;
  const idx = clamp(center + shift, 0, CONFORMATION.length - 1);
  return CONFORMATION[idx];
}

function currentMonthIndex() {
  return app.year * 12 + app.month;
}

function personalityProfile(personality) {
  switch (personality) {
    case 'Stubborn':
      return { trainDelta: -15, showDelta: -6, penaltyBias: 2, refusalBias: 12, fallBias: 2, careerDelta: 0 };
    case 'Easy-Going':
      return { trainDelta: 12, showDelta: 6, penaltyBias: -2, refusalBias: -6, fallBias: -1, careerDelta: 1 };
    case 'Bomb-proof':
      return { trainDelta: 0, showDelta: 6, penaltyBias: -3, refusalBias: -8, fallBias: -2, careerDelta: 2 };
    case 'Energetic':
      return { trainDelta: 8, showDelta: -3, penaltyBias: 3, refusalBias: 4, fallBias: 1, careerDelta: -2 };
    case 'Spooky':
      return { trainDelta: -10, showDelta: -8, penaltyBias: 4, refusalBias: 10, fallBias: 6, careerDelta: -1 };
    case 'Hot-Blooded':
      return { trainDelta: -12, showDelta: -12, penaltyBias: 6, refusalBias: 8, fallBias: 2, careerDelta: -2 };
    case 'Excitable':
      return { trainDelta: -6, showDelta: -9, penaltyBias: 4, refusalBias: 6, fallBias: 1, careerDelta: -1 };
    case 'Lazy':
      return { trainDelta: -4, showDelta: -2, penaltyBias: 1, refusalBias: 2, fallBias: 0, careerDelta: 0 };
    case 'Unfocused':
      return { trainDelta: -8, showDelta: 3, penaltyBias: 1, refusalBias: 3, fallBias: 0, careerDelta: 0 };
    default:
      return { trainDelta: 0, showDelta: 0, penaltyBias: 0, refusalBias: 0, fallBias: 0, careerDelta: 0 };
  }
}

function injuryRecoveryMonths(severity) {
  if (severity === 'Easy') return rnd(1, 2);
  if (severity === 'Medium') return rnd(2, 4);
  if (severity === 'More Than Medium') return rnd(4, 7);
  if (severity === 'Severe') return rnd(8, 12);
  return rnd(12, 16);
}

function soundnessLossRange(severity) {
  if (severity === 'Easy') return [0.5, 0.9];
  if (severity === 'Medium') return [0.8, 1.2];
  if (severity === 'More Than Medium') return [1, 1.5];
  if (severity === 'Severe') return [2, 2.9];
  if (severity === 'Very Severe') return [2.9, 3.5];
  return [0, 0];
}

function soundnessLossMultiplier(horse) {
  if (horse.healthGenetics === 'Low') return 0.8;
  if (horse.healthGenetics === 'High') return 1.2;
  return 1;
}

function applySoundnessLoss(horse, severity) {
  const [minLoss, maxLoss] = soundnessLossRange(severity);
  if (!maxLoss) return;
  const loss = (minLoss + Math.random() * (maxLoss - minLoss)) * soundnessLossMultiplier(horse);
  horse.soundnessYears = Math.max(0, Number((horse.soundnessYears - loss).toFixed(1)));
}

function soundnessForecastLine(years) {
  if (years > 10) return 'Lots of years left... (10+)';
  if (years >= 7) return 'Moderate amount of years left (7-10)';
  if (years >= 5) return 'Some years of competing left (5-7)';
  if (years >= 2) return 'Still some left, be careful though! (2-5)';
  if (years >= 1) return 'Should consider retiring soon... (1-2 years left)';
  return 'Should retire from competing... (less then 1 year left)';
}

function addIllness(horse, illnessTemplate) {
  if (!horse || !illnessTemplate) return null;
  horse.illnesses = Array.isArray(horse.illnesses) ? horse.illnesses : [];
  const existingActive = horse.illnesses.find((i) => i.active && i.name === illnessTemplate.name);
  if (existingActive) return existingActive;
  const severity = illnessTemplate.severity || pick(['Easy', 'Medium', 'More Than Medium']);
  const illness = {
    name: illnessTemplate.name || 'Condition',
    impact: Number.isFinite(illnessTemplate.impact) ? illnessTemplate.impact : 8,
    severity,
    surgeryRisk: Number.isFinite(illnessTemplate.surgeryRisk) ? illnessTemplate.surgeryRisk : 0,
    retirementRisk: Number.isFinite(illnessTemplate.retirementRisk) ? illnessTemplate.retirementRisk : 0,
    remaining: Number.isFinite(illnessTemplate.remaining) ? illnessTemplate.remaining : injuryRecoveryMonths(severity),
    active: true,
    hidden: Boolean(illnessTemplate.hidden)
  };
  horse.illnesses.push(illness);
  applySoundnessLoss(horse, severity);
  horse.injuryCountYear = (horse.injuryCountYear || 0) + 1;
  return illness;
}

function maybeAddRandomIllness(horse) {
  if (!horse || horse.retiredForever || horse.deceased) return;
  horse.illnesses = Array.isArray(horse.illnesses) ? horse.illnesses : [];
  const activeCount = horse.illnesses.filter((i) => i.active).length;
  if (activeCount > 0) return;
  let chance = 4;
  if ((horse.qualityOfLife || 65) < 45) chance += 3;
  if ((horse.stallCleanliness || 65) < 45) chance += 2;
  if ((horse.dailyGrooming || 65) < 45) chance += 1;
  if (horse.healthGenetics === 'High') chance += 2;
  if (horse.healthGenetics === 'Low') chance -= 1;
  chance = clamp(chance, 1, 14);
  if (rnd(1, 100) > chance) return;
  const picked = pick(SICKNESS_TYPES);
  const issue = addIllness(horse, picked);
  if (!issue) return;
  const severityLine = issue.severity ? ` (${issue.severity})` : '';
  pushReport(`${horse.name} developed ${issue.name}${severityLine}. Estimated recovery ${issue.remaining} month(s).`);
}

function maybeAddOvertrainingInjury(horse) {
  if (!horse || horse.retiredForever || horse.deceased) return;
  if (horse.pendingOvertrainingInjury) {
    horse.pendingOvertrainingInjury = false;
    const issue = addIllness(horse, { name: 'Overtraining Strain', impact: 12, severity: 'More Than Medium', surgeryRisk: 2, retirementRisk: 4 });
    if (issue) pushReport(`${horse.name} picked up an overtraining strain. Reduce sessions and monitor recovery.`);
    return;
  }
  const sessions = horse.trainingSessionsThisMonth || 0;
  const pref = horse.preferredTrainingSessions || trainingSessionBounds(horse.trainingPreference || 'Medium')[1];
  if (sessions > pref + 3 && rnd(1, 100) <= 8) {
    const issue = addIllness(horse, { name: 'Muscle Soreness', impact: 6, severity: 'Easy', surgeryRisk: 0, retirementRisk: 0 });
    if (issue) pushReport(`${horse.name} is sore from heavy training volume.`);
  }
}

function applySoundnessWear(horse) {
  if (!horse || horse.retiredForever || horse.deceased || horse.age < 3) return;
  const sessions = horse.trainingSessionsThisMonth || 0;
  const shows = horse.showEntriesThisMonth || 0;
  const workLoad = sessions + (shows * 2);
  if (workLoad <= 0) return;
  const baseWear = Math.min(0.6, 0.06 * workLoad);
  const mult = soundnessLossMultiplier(horse);
  horse.soundnessYears = Math.max(0, Number((horse.soundnessYears - (baseWear * mult)).toFixed(1)));
  if (horse.soundnessYears <= 0.4 && !horse.unridable && rnd(1, 100) <= 20) {
    horse.unridable = true;
    horse.retiredToBreeding = true;
    pushReport(`${horse.name} can no longer compete due to long-term soundness decline and was retired to breeding.`);
  }
}

function trainingSessionBounds(level) {
  if (level === 'Low') return [1, 3];
  if (level === 'High') return [6, 10];
  return [3, 6];
}

function trainingStaminaRange(level) {
  const [minSessions, maxSessions] = trainingSessionBounds(level);
  return `${minSessions}-${maxSessions}`;
}

function turnoutRange(level) {
  if (level === 'Low') return '2-3';
  if (level === 'High') return '8-14';
  return '3-8';
}

function turnoutRangeBounds(level) {
  if (level === 'Low') return [2, 3];
  if (level === 'High') return [8, 14];
  return [3, 8];
}

function resolvedTurnoutBounds(horse) {
  const stamina = horse.trainingPreference || 'Medium';
  const [baseTurnoutMin, baseTurnoutMax] = turnoutRangeBounds(stamina);
  const [facilityTurnoutMin, facilityTurnoutMax] = barnFacilityTurnoutRange(app.currentBarn?.facilityStars || 3);
  const minTurnout = Math.max(baseTurnoutMin, facilityTurnoutMin);
  const maxTurnout = Math.min(baseTurnoutMax, facilityTurnoutMax);
  if (minTurnout > maxTurnout) return [baseTurnoutMin, baseTurnoutMax];
  return [minTurnout, maxTurnout];
}

function feedRangeBounds(horse) {
  const pref = horse.preferredFeedGrams || 150;
  return [Math.max(50, pref - 25), Math.min(250, pref + 25)];
}

function updateWeight(horse, delta) {
  if (horse.isRescue && horse.weightStatus !== 'Moderate' && delta !== 0) {
    horse.rescueWeightCooldown = Number.isFinite(horse.rescueWeightCooldown) ? horse.rescueWeightCooldown : horse.rescueWeightDelay || 6;
    if (horse.rescueWeightCooldown > 0) {
      horse.rescueWeightCooldown -= 1;
      return;
    }
    horse.rescueWeightCooldown = horse.rescueWeightDelay || 6;
  }
  const idx = Math.max(0, Math.min(WEIGHTS.length - 1, WEIGHTS.indexOf(horse.weightStatus)));
  const next = Math.max(0, Math.min(WEIGHTS.length - 1, idx + delta));
  horse.weightStatus = WEIGHTS[next];
}

function moodPerformanceDelta(mood) {
  if (['Motivated', 'Happy', 'Try-Hard'].includes(mood)) return 4;
  if (mood === 'Neutral') return 0;
  if (mood === 'Grumpy') return -3;
  if (mood === 'Bad moods') return -4;
  if (['Uncomfortable', 'Distress', 'Overly-Active', 'No energy'].includes(mood)) return -4;
  return -5;
}

function weightPerformanceDelta(weight) {
  if (weight === 'Moderate') return 3;
  if (['Underweight', 'Fleshy'].includes(weight)) return -2;
  return -4;
}

function applyMonthlyMoodShift(horse) {
  const preferred = horse.preferredMood;
  if (horse.isRescue && (horse.bond || 0) <= 0) {
    return rnd(1, 100) <= 95 ? pick(['Uncomfortable', 'Distress', 'Overly-Active', 'No energy', 'Bad moods', 'Grumpy']) : preferred;
  }
  const bond = horse.bond || 0;
  if (bond >= 45 && rnd(1, 100) <= 40) {
    return pick(['Motivated', 'Happy', 'Try-Hard']);
  }
  const roll = rnd(1, 100);
  if (roll <= 55) return preferred;
  if (roll <= 80) return 'Neutral';
  return rnd(1, 100) <= 50 ? 'Bad moods' : 'Grumpy';
}

function genderPronouns(horse) {
  const female = horse.gender === 'Mare';
  return {
    subject: female ? 'She' : 'He',
    object: female ? 'her' : 'him',
    possessive: female ? 'her' : 'his'
  };
}

function recommendedFeedForHorse(horse) {
  if (horse.illnesses.some((i) => i.active)) return 'Recovery';
  if ((horse.injuryCountYear || 0) > 3) return 'Joint Support';
  if (horse.pregnantBy || horse.pregnantEmbryo || horse.retiredToBreeding) return 'Brood-mare Feed';
  if (horse.age <= 5) return 'Youngster Feed';
  if (horse.age >= 15) return 'Old Horse Feed';
  if (['Overweight', 'Fleshy'].includes(horse.weightStatus)) return 'Diet Feed';
  if (['Very Underweight', 'Underweight'].includes(horse.weightStatus)) return 'Weight Gain';
  return 'Basic Feed';
}

function stablehandFeedPlanForHorse(horse) {
  const [feedMin, feedMax] = feedRangeBounds(horse);
  const targetGrams = clamp(Math.round((feedMin + feedMax) / 2), 50, 250);
  const preferredFeed = recommendedFeedForHorse(horse);
  return [{ type: preferredFeed, grams: targetGrams }];
}

function applyStablehandCare(horse) {
  if (!app.stablehandHired || !horse || (horse.owner !== 'Your Stable' && !horse.isLeased)) return;
  horse.feedPlan = stablehandFeedPlanForHorse(horse);
  horse.managed = horse.managed || {};
  horse.managed.fed = true;
  horse.managed.vet = true;

  (horse.illnesses || []).forEach((issue) => {
    if (!issue) return;
    issue.active = false;
    issue.remaining = 0;
    issue.hidden = false;
  });

  horse.stallCleanliness = Math.max(90, Number(horse.stallCleanliness) || 0);
  horse.hoofCare = Math.max(90, Number(horse.hoofCare) || 0);
  horse.turnoutQuality = Math.max(90, Number(horse.turnoutQuality) || 0);
  horse.dailyGrooming = Math.max(90, Number(horse.dailyGrooming) || 0);
  horse.farrierCare = Math.max(90, Number(horse.farrierCare) || 0);
  horse.qualityOfLife = calculateHorseQualityOfLife(horse);
}

function trainerNotesForHorse(horse) {
  const notes = [];
  const { subject, object, possessive } = genderPronouns(horse);
  const [feedMin, feedMax] = feedRangeBounds(horse);
  const totalGrams = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  if (totalGrams > feedMax + 10) {
    notes.push(`${subject} is getting fleshy, you should feed ${object} less.`);
  } else if (totalGrams && totalGrams < feedMin - 10) {
    notes.push(`${subject} is too lightweight, consider making ${possessive} feeding plan more balanced.`);
  }
  if (horse.lastFeedIssue?.badFeed && horse.lastFeedIssue?.betterFeed) {
    notes.push(`${subject} needs ${horse.lastFeedIssue.badFeed} changed to ${horse.lastFeedIssue.betterFeed}!`);
  }
  if (horse.lastTurnoutIssue === 'low') {
    notes.push(`${subject} has so much energy, give ${object} more turn-out, it's a living creature after all!`);
  }
  if (horse.lastTrainingIssue === 'high') {
    notes.push(`${subject} is very tired, consider easing up ${possessive} schedule.`);
  }
  if (horse.lastTrainingIssue === 'low') {
    notes.push(`${subject} has too much energy, you should train ${object} bit more!`);
  }
  if (!horse.retiredForever && !horse.retiredToBreeding && horse.soundnessYears <= 0) {
    notes.push(`${subject} looks tired and burnt-out maybe it’s time for retirement.`);
  }
  if (horse.gender === 'Stallion' && horse.lastTrainingIssue === 'low' && !horse.retiredForever && !horse.retiredToBreeding) {
    notes.push('He looks overly energetic, consider gelding.');
  }
  if ((horse.injuryCountYear || 0) > 3) {
    notes.push(`${subject} is prone to injuries, better give ${object} some joint support feed!`);
  }
  const bestFeed = recommendedFeedForHorse(horse);
  notes.push(`This is the best feedplan for this horse, ${bestFeed} ${feedMin}-${feedMax}g.`);
  horse.trainerNotes = notes;
}

function evaluateFeedEffects(horse) {
  let moodOverride = '';
  let weightDelta = 0;
  let trainingBoost = 0;
  let competitionBoost = 0;
  let healingBoost = 0;
  let feedIssue = null;
  let wrongFeedUsed = false;
  const activeTraining = (horse.trainingSessionsThisMonth || 0) > 0 || horse.managed?.showEntry;
  const competitionCount = horse.showEntriesThisMonth || 0;
  const hasInjury = horse.illnesses.some((i) => i.active);
  const totalGrams = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  const hasSportsFeed = (horse.feedPlan || []).some((f) => f.type === 'Sports Feed');
  const hasCalmFeed = (horse.feedPlan || []).some((f) => f.type === 'Calm nd Ez');
  const hasRecoveryFeed = (horse.feedPlan || []).some((f) => f.type === 'Recovery');
  const hasOldHorseFeed = (horse.feedPlan || []).some((f) => f.type === 'Old Horse Feed');
  const hasJointSupport = (horse.feedPlan || []).some((f) => f.type === 'Joint Support');
  const pref = horse.preferredFeedGrams || 150;
  if (totalGrams > pref + 30) weightDelta += 1;
  if (totalGrams < pref - 30) weightDelta -= 1;

  (horse.feedPlan || []).forEach((feed) => {
    switch (feed.type) {
      case 'Basic Feed':
        competitionBoost += 1;
        break;
      case 'Sports Feed':
        if (!activeTraining && competitionCount === 0) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Sports Feed', betterFeed: 'Basic Feed' };
        } else {
          trainingBoost += 2;
          competitionBoost += 1;
        }
        break;
      case 'Sweet Feed':
        if (['Energetic', 'Stubborn'].includes(horse.personality)) {
          weightDelta += 1;
          moodOverride = 'Overly-Active';
          competitionBoost -= 1;
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Sweet Feed', betterFeed: 'Calm nd Ez' };
        } else if (horse.personality === 'Lazy') {
          moodOverride = 'Motivated';
          competitionBoost += 1;
        } else {
          moodOverride = 'Happy';
        }
        break;
      case 'Brood-mare Feed':
        if (!(horse.retiredToBreeding || horse.pregnantBy || horse.pregnantEmbryo || horse.age <= 2)) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Brood-mare Feed', betterFeed: 'Basic Feed' };
        } else {
          moodOverride = 'Happy';
        }
        break;
      case 'Calm nd Ez':
        if (['Lazy', 'Easy-Going', 'Bomb-proof'].includes(horse.personality)) {
          moodOverride = 'Uncomfortable';
          competitionBoost -= 1;
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Calm nd Ez', betterFeed: 'Basic Feed' };
        } else {
          moodOverride = 'Neutral';
          competitionBoost += 1;
        }
        if (hasInjury) moodOverride = 'Neutral';
        break;
      case 'Youngster Feed':
        if (horse.age > 5 || horse.retiredForever || horse.retiredToBreeding) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Youngster Feed', betterFeed: 'Basic Feed' };
        } else {
          trainingBoost += 2;
        }
        break;
      case 'Old Horse Feed':
        if (horse.age < 15 && !horse.retiredForever) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Old Horse Feed', betterFeed: 'Basic Feed' };
          if (['Energetic', 'Stubborn'].includes(horse.personality)) moodOverride = 'Overly-Active';
        } else if (horse.age >= 20 || horse.retiredToBreeding || horse.retiredForever) {
          moodOverride = 'Happy';
          if (['Very Underweight', 'Underweight'].includes(horse.weightStatus)) weightDelta += 1;
        } else {
          trainingBoost += 1;
        }
        break;
      case 'Recovery':
        if (!hasInjury) {
          moodOverride = 'Uncomfortable';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Recovery', betterFeed: 'Basic Feed' };
        } else {
          const roll = rnd(1, 100);
          if (roll > 10 && roll <= 80) {
            healingBoost += 1;
          }
        }
        break;
      case 'Weight Gain':
        if (['Moderate', 'Fleshy', 'Overweight'].includes(horse.weightStatus)) {
          moodOverride = 'Distress';
          weightDelta += 1;
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Weight Gain', betterFeed: 'Basic Feed' };
        } else {
          weightDelta += 1;
        }
        break;
      case 'Diet Feed':
        if (['Overweight', 'Fleshy'].includes(horse.weightStatus)) {
          weightDelta -= 2;
        } else {
          weightDelta -= 2;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Diet Feed', betterFeed: 'Basic Feed' };
        }
        if (feed.grams > 60) {
          moodOverride = 'Distress';
          wrongFeedUsed = true;
        }
        break;
      case 'Joint Support':
        if ((horse.injuryCountYear || 0) > 3) {
          competitionBoost += 1;
        } else {
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Joint Support', betterFeed: 'Basic Feed' };
        }
        break;
      default:
        break;
    }
  });

  if (competitionCount > 3 && !hasSportsFeed) {
    moodOverride = 'No energy';
  }
  if ((horse.age >= 20 || horse.retiredToBreeding || horse.retiredForever) && !hasOldHorseFeed) {
    weightDelta -= 1;
  }
  if (hasInjury && hasCalmFeed && hasRecoveryFeed && weightDelta > 0) {
    weightDelta = 0;
  }
  const feedMatchesHorse = !wrongFeedUsed && (!moodOverride || !NEGATIVE_MOODS.includes(moodOverride));
  if (feedMatchesHorse) {
    weightDelta = 0;
  }
  if (wrongFeedUsed) {
    horse.wrongFeedMonthsYear = (horse.wrongFeedMonthsYear || 0) + 1;
  }
  horse.hasJointSupport = hasJointSupport && (horse.injuryCountYear || 0) > 3;
  if (weightDelta !== 0) updateWeight(horse, weightDelta);
  if (moodOverride) horse.mood = moodOverride;
  horse.lastFeedMoodOverride = moodOverride || '';
  horse.lastFeedIssue = feedIssue;
  horse.trainingBoost = trainingBoost;
  horse.competitionBoost = competitionBoost;
  horse.healingBoost = healingBoost;
}

function applyAutoTraining(horse) {
  horse.autoExerciseHours = 0;
  if (!horse.autoTrainingFocus) return;
  const allowedFocuses = autoTrainingOptionsForHorse(horse).map((option) => option.value);
  if (!allowedFocuses.includes(horse.autoTrainingFocus)) return;
  const stamina = horse.trainingPreference || 'Medium';
  const [minTrainingSessions, maxTrainingSessions] = trainingSessionBounds(stamina);
  const preferred = clamp(Math.round(horse.preferredTrainingSessions || maxTrainingSessions), minTrainingSessions, maxTrainingSessions);
  const skillCap = stamina === 'Low' ? rnd(2, 5) : stamina === 'High' ? rnd(7, 10) : rnd(5, 7);
  let skillGains = 0;
  let trainedSessions = 0;
  if (horse.autoTrainingFocus === 'Light Exercise') {
    for (let i = 0; i < preferred; i += 1) {
      if (horse.illnesses.some((n) => n.active)) break;
      applyExerciseSession(horse, { silent: true, accumulate: true });
      trainedSessions += 1;
    }
    if (trainedSessions) {
      pushReport(`${horse.name} completed ${trainedSessions} light exercise session(s) this month.`);
    }
    return;
  }
  if (horse.autoTrainingFocus === 'Breaking in') {
    for (let i = 0; i < preferred; i += 1) {
      if (horse.illnesses.some((n) => n.active)) break;
      horse.behavior = Math.max(0, (horse.behavior || 0) + rnd(1, 2));
      horse.managed.trained = true;
      horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
      trainedSessions += 1;
    }
    if (horse.requiresBreakingIn && horse.behavior >= 500) {
      horse.requiresBreakingIn = false;
      pushReport(`${horse.name} completed breaking in and can begin regular training.`);
    }
    if (trainedSessions) {
      pushReport(`${horse.name} completed ${trainedSessions} breaking-in session(s) this month.`);
    }
    return;
  }
  for (let i = 0; i < preferred; i += 1) {
    if (horse.illnesses.some((n) => n.active)) break;
    const discipline = horse.autoTrainingFocus;
    const atCap = disciplineAtPotential(horse, discipline);
    if (horse.retiredForever || horse.retiredToBreeding || atCap) {
      applyExerciseSession(horse, { silent: true, accumulate: true });
      trainedSessions += 1;
      continue;
    }
    const skill = pick(EXERCISE_MENU[discipline]);
    const bonus = horse.trainingBoost ? Math.max(0, Math.round(horse.trainingBoost / 2)) : 0;
    const gain = rnd(1, 3) + bonus;
    if (skillGains < skillCap) {
      if (discipline === 'dressage') {
        horse.stats.dressage[skill] = clampSkill(horse, discipline, horse.stats.dressage[skill] + gain);
      }
      if (discipline === 'jumping' || discipline === 'hunter') {
        horse.stats.jumping[skill] = clampSkill(horse, discipline, horse.stats.jumping[skill] + gain);
      }
      if (discipline === 'eventing') {
        if (horse.stats.dressage[skill] != null) {
          horse.stats.dressage[skill] = clampSkill(horse, discipline, horse.stats.dressage[skill] + gain);
        }
        if (horse.stats.jumping[skill] != null) {
          horse.stats.jumping[skill] = clampSkill(horse, discipline, horse.stats.jumping[skill] + gain);
        }
      }
      skillGains += 1;
    }
    horse.managed.trained = true;
    horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
    trainedSessions += 1;
  }
  if (trainedSessions) {
    pushReport(`${horse.name} completed ${trainedSessions} auto-training session(s) in ${cap(horse.autoTrainingFocus)}.`);
  }
}


function controlabilityFromPersonality(personality) {
  const roll = rnd(1, 100);
  switch (personality) {
    case 'Easy-Going': return roll <= 45 ? rnd(35, 60) : rnd(60, 100);
    case 'Bomb-proof': return roll <= 30 ? rnd(40, 65) : rnd(65, 100);
    case 'Spooky': return roll <= 70 ? rnd(10, 50) : rnd(50, 90);
    case 'Stubborn': return roll <= 85 ? rnd(15, 60) : rnd(60, 95);
    case 'Energetic': return roll <= 65 ? rnd(20, 70) : rnd(70, 100);
    case 'Hot-Blooded': return roll <= 85 ? rnd(10, 55) : rnd(55, 88);
    case 'Excitable': return roll <= 75 ? rnd(15, 60) : rnd(60, 92);
    case 'Lazy': return roll <= 70 ? rnd(15, 50) : rnd(50, 90);
    case 'Unfocused': return roll <= 85 ? rnd(10, 50) : rnd(50, 90);
    default: return rnd(25, 85);
  }
}

function tackControlabilityDelta(horse, discipline = 'flatwork') {
  const tack = horse.tack || {};
  let delta = 0;
  if (tack.bridle === 'Flash Bridle') delta += 3;
  if (tack.bridle === 'Drop Noseband Bridle') delta += 5;
  if (tack.bridle === 'Figure-8 Bridle') delta += ['jumping', 'eventing', 'hunter'].includes(discipline) ? 6 : -2;
  if (tack.bridle === 'Double Bridle') delta += (horse.bond || 0) >= 45 ? 8 : -8;

  if (tack.bit === 'Eggbutt Snaffle') delta += 2;
  if (tack.bit === 'D-Ring Bit') delta += 4;
  if (tack.bit === 'Pelham Bit') delta += 6;
  if (tack.bit === 'Gag Bit') delta += horse.personality === 'Spooky' || ['Distress', 'Bad moods', 'Grumpy'].includes(horse.mood) ? -8 : 6;

  if (tack.saddle === 'Jumping Saddle') delta += ['jumping', 'eventing', 'hunter'].includes(discipline) ? 4 : -1;
  if (tack.saddle === 'Dressage Saddle') delta += discipline === 'dressage' || discipline === 'flatwork' ? 4 : -1;
  if (tack.saddle === 'Racing / Close-Contact Saddle') delta += -4;
  if (tack.saddle === 'Ill-Fitting Saddle') delta += -12;

  if (tack.pad === 'Shock-Absorbing Pad' || tack.pad === 'Therapeutic Pad') delta += 2;
  if (tack.pad === 'Incorrect Size Pad') delta += -6;
  if (tack.pad === 'No Pad') delta += -10;

  if (tack.headwear === 'Ear-Bonnet') {
    delta += 2;
    if (horse.personality === 'Spooky' || horse.personality === 'Energetic' || ['Overly-Active', 'Distress'].includes(horse.mood)) delta += 3;
  }
  if (tack.headwear === 'Race Mask') {
    delta += 2;
    if (horse.personality === 'Unfocused' || horse.personality === 'Spooky') delta += 4;
  }

  if (tack.body === 'Martingal') delta += ['jumping', 'eventing', 'hunter'].includes(discipline) ? 6 : 1;
  if (tack.body === 'Draw Reins') {
    const hotBlooded = horse.personality === 'Energetic' || horse.personality === 'Spooky' || horse.mood === 'Overly-Active';
    delta += hotBlooded ? 6 : -30;
  }
  return delta;
}

function trainingControlabilitySession(horse, focus) {
  if (focus === 'Hand Work') {
    const handSessions = horse.handTrainingSessionsThisMonth || 0;
    horse.handTrainingSessionsThisMonth = handSessions + 1;
    if (handSessions < 1) {
      horse.mood = 'No energy';
      pushReport(`${horse.name} completed Hand Work and feels low on energy. No controlability gains this session.`);
      return false;
    }
  }
  const mood = horse.mood || 'Neutral';
  const baseSuccess = 58;
  const moodMod = ['Motivated', 'Happy', 'Try-Hard'].includes(mood) ? 18 : ['Distress', 'Bad moods', 'Grumpy', 'No energy', 'Uncomfortable'].includes(mood) ? -18 : 0;
  const personalityMod = ['Easy-Going', 'Bomb-proof'].includes(horse.personality) ? 12 : ['Stubborn', 'Spooky', 'Unfocused'].includes(horse.personality) ? -12 : 0;
  const tackMod = tackControlabilityDelta(horse, 'flatwork');
  const successChance = clamp(baseSuccess + moodMod + personalityMod + tackMod, 10, 95);
  const roll = rnd(1, 100);
  if (roll <= successChance) {
    const gain = rnd(5, 10);
    horse.controlability = clamp((horse.controlability || 0) + gain, 0, 100);
    pushReport(`${horse.name} responded well to ${focus}. Controlability +${gain}%.`);
    return true;
  }
  const loss = rnd(1, 4);
  horse.controlability = clamp((horse.controlability || 0) - loss, 0, 100);
  pushReport(`${horse.name} struggled with ${focus}. Controlability -${loss}%.`);
  return false;
}

function updateMonthlyCare(horse) {
  if (horse.retiredForever && !horse.retiredToBreeding) return;
  evaluateFeedEffects(horse);
  const [minTurnout, maxTurnout] = resolvedTurnoutBounds(horse);
  const stamina = horse.trainingPreference || 'Medium';
  const effectiveTurnout = horse.turnoutAssignmentHours > 0 ? horse.turnoutAssignmentHours : rnd(minTurnout, maxTurnout);
  horse.turnoutHours = (horse.illnesses || []).some((i) => i.active) ? 0 : Math.max(0.5, Math.min(14, effectiveTurnout));
  horse.lastTurnoutIssue = '';
  horse.lastTrainingIssue = '';
  const [minTrainingSessions, maxTrainingSessions] = trainingSessionBounds(stamina);
  horse.preferredTrainingSessions = clamp(Math.round(horse.preferredTrainingSessions || maxTrainingSessions), minTrainingSessions, maxTrainingSessions);
  const sessions = horse.trainingSessionsThisMonth || 0;
  const shows = horse.showEntriesThisMonth || 0;
  horse.lastTrainingSessions = sessions;
  horse.lastShowEntries = shows;
  if (sessions > maxTrainingSessions || shows > 3) {
    horse.lastTrainingIssue = 'high';
    horse.overTrainingCountYear = (horse.overTrainingCountYear || 0) + 1;
    if ([4, 8].includes(horse.overTrainingCountYear)) {
      horse.pendingOvertrainingInjury = true;
    }
  } else if (sessions < minTrainingSessions) {
    horse.lastTrainingIssue = 'low';
  }

  let mood = horse.mood;
  const tackDelta = tackControlabilityDelta(horse, 'flatwork');
  if (tackDelta <= -8 && !['Distress', 'No energy'].includes(mood)) mood = 'Uncomfortable';
  if (!horse.lastFeedMoodOverride && (!mood || mood === 'Neutral')) {
    mood = applyMonthlyMoodShift(horse);
  }
  if ((horse.illnesses || []).some((i) => i.active)) {
    mood = 'Distress';
  }
  if (horse.turnoutHours < minTurnout) {
    mood = 'Distress';
    horse.lastTurnoutIssue = 'low';
    updateWeight(horse, 1);
  } else if (horse.turnoutHours > maxTurnout) {
    mood = 'Uncomfortable';
    horse.lastTurnoutIssue = 'high';
    updateWeight(horse, -1);
  }
  const hasSportsFeed = (horse.feedPlan || []).some((f) => f.type === 'Sports Feed');
  if (horse.lastTrainingIssue === 'high') {
    if (!hasSportsFeed) mood = 'No energy';
    else if (mood === 'No energy') mood = 'Neutral';
  } else if (horse.lastTrainingIssue === 'low') {
    if (!['Distress', 'No energy'].includes(mood)) mood = 'Overly-Active';
  }

  horse.mood = mood;
  horse.turnoutQuality = turnoutOkForHorse(horse) ? clamp((horse.turnoutQuality || 65) + 2, 0, 100) : clamp((horse.turnoutQuality || 65) - 3, 0, 100);
  horse.stallCleanliness = clamp((horse.stallCleanliness || 65) + (horse.managed?.fed ? 1 : -2), 0, 100);
  horse.hoofCare = clamp((horse.hoofCare || 65) + (horse.farrierThisMonth ? 6 : -1), 0, 100);
  horse.dailyGrooming = clamp((horse.dailyGrooming || 65) + (horse.manualTrainingThisMonth ? 2 : -1), 0, 100);
  horse.farrierCare = clamp((horse.farrierCare || 65) + (horse.farrierThisMonth ? 8 : (horse.due?.farrier ? -4 : 0)), 0, 100);
  horse.qualityOfLife = calculateHorseQualityOfLife(horse);
  const careStars = app.currentBarn?.careStars || 3;
  if (careStars === 1 && !horse.managed?.fed) {
    horse.qualityOfLife = clamp(horse.qualityOfLife - 2, 0, 100);
    if (rnd(1, 100) <= 35) horse.mood = pick(NEGATIVE_MOODS);
  } else if (careStars === 5) {
    horse.qualityOfLife = clamp(horse.qualityOfLife + 2, 0, 100);
    if (NEGATIVE_MOODS.includes(horse.mood) && rnd(1, 100) <= 40) horse.mood = pick(POSITIVE_MOODS);
  }
  trainerNotesForHorse(horse);
  horse.trainingSessionsThisMonth = 0;
  horse.handTrainingSessionsThisMonth = 0;
  horse.showEntriesThisMonth = 0;
}

function turnoutOkForHorse(horse) {
  const [minTurnout, maxTurnout] = resolvedTurnoutBounds(horse);
  return (horse.turnoutHours || 0) >= minTurnout && (horse.turnoutHours || 0) <= maxTurnout;
}


function showFatal(message) {
  let main = document.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    document.body.append(main);
  }
  const existing = document.getElementById('fatal-startup-box');
  if (existing) existing.remove();
  const box = document.createElement('section');
  box.id = 'fatal-startup-box';
  box.className = 'panel';
  box.innerHTML = `<div class='box'><h2>Startup Error</h2><p>${message}</p></div>`;
  main.prepend(box);
}

function safeRun(label, fn) {
  try {
    fn();
    return true;
  } catch (error) {
    console.error(`${label} failed`, error);
    showFatal(`${label} failed: ${error.message}`);
    return false;
  }
}


function serializeAppState() {
  return JSON.stringify(app);
}

function hydrateFromSave(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid save data.');
  app.money = Number(data.money) || 50000;
  app.month = Number(data.month) || 1;
  app.day = clamp(Number(data.day) || 1, 1, 30);
  app.hour = clamp(Number(data.hour) || 0, 0, 23);
  app.year = Number(data.year) || 1;
  app.horses = Array.isArray(data.horses) ? data.horses.filter(Boolean) : [];
  app.semenStraws = Array.isArray(data.semenStraws) ? data.semenStraws : [];
  app.embryos = Array.isArray(data.embryos) ? data.embryos : [];
  app.saleBarn = Array.isArray(data.saleBarn) ? data.saleBarn : [];
  app.rescueBarn = Array.isArray(data.rescueBarn) ? data.rescueBarn : [];
  app.npcSales = Array.isArray(data.npcSales) ? data.npcSales : [];
  app.npcStuds = Array.isArray(data.npcStuds) ? data.npcStuds : [];
  app.reports = Array.isArray(data.reports) ? data.reports : [];
  app.competitionReports = Array.isArray(data.competitionReports) ? data.competitionReports : [];
  app.rescueHorses = Array.isArray(data.rescueHorses) ? data.rescueHorses : [];
  app.currentBarn = data.currentBarn && typeof data.currentBarn === 'object' ? data.currentBarn : null;
  app.barnCatalog = Array.isArray(data.barnCatalog) ? data.barnCatalog : [];
  app.barnShows = Array.isArray(data.barnShows) ? data.barnShows : [];
  app.signedUpShows = Array.isArray(data.signedUpShows) ? data.signedUpShows : [];
  app.lastBarnRefreshMonth = Number.isFinite(data.lastBarnRefreshMonth) ? data.lastBarnRefreshMonth : 0;
  app.settings = typeof data.settings === 'object' && data.settings ? {
    barnName: data.settings.barnName || 'Oxer to Oxer Stable Manager',
    breedingCode: data.settings.breedingCode || '',
    breedingCodePosition: data.settings.breedingCodePosition === 'end' ? 'end' : 'front',
    trainingMode: data.settings.trainingMode === 'normal' ? 'normal' : 'rpg',
    competitionMode: data.settings.competitionMode === 'normal' ? 'normal' : 'rpg'
  } : { barnName: 'Oxer to Oxer Stable Manager', breedingCode: '', breedingCodePosition: 'front', trainingMode: 'rpg', competitionMode: 'rpg' };
  app.showOffspringWindow = data.showOffspringWindow !== false;
  app.selectedHorseId = data.selectedHorseId || '';
  app.trainingSelection = typeof data.trainingSelection === 'object' && data.trainingSelection
    ? {
        horseId: data.trainingSelection.horseId || '',
        discipline: data.trainingSelection.discipline || 'jumping',
        exercise: data.trainingSelection.exercise || ''
      }
    : { horseId: '', discipline: 'jumping', exercise: '' };
  app.trainingRpgConfig = normalizeTrainingRpgConfig(data.trainingRpgConfig);
  app.trainingRpg = typeof data.trainingRpg === 'object' && data.trainingRpg ? data.trainingRpg : null;
  app.competitionRpg = normalizeCompetitionRpgSession(data.competitionRpg);
  app.trainingRpgFeedback = typeof data.trainingRpgFeedback === 'string' ? data.trainingRpgFeedback : '';
  app.trainingRpgSummary = typeof data.trainingRpgSummary === 'object' && data.trainingRpgSummary ? data.trainingRpgSummary : null;
  app.showSelections = typeof data.showSelections === 'object' && data.showSelections ? data.showSelections : {};
  app.vetSelection = typeof data.vetSelection === 'object' && data.vetSelection ? data.vetSelection : { horseId: '', mareId: '', stallionId: '', strawId: '', embryoId: '' };
  app.trainingClinicSelection = typeof data.trainingClinicSelection === 'object' && data.trainingClinicSelection ? data.trainingClinicSelection : { discipline: 'jumping' };
  app.trainingHorseScope = ['private', 'lesson', 'both'].includes(data.trainingHorseScope) ? data.trainingHorseScope : 'both';
  app.competitionHorseScope = ['private', 'lesson', 'both'].includes(data.competitionHorseScope) ? data.competitionHorseScope : 'both';
  app.calendarReminders = Array.isArray(data.calendarReminders) ? data.calendarReminders : [];
  app.closedReminderIds = Array.isArray(data.closedReminderIds) ? data.closedReminderIds : [];
  app.upcomingEvents = Array.isArray(data.upcomingEvents) ? data.upcomingEvents : [];
  app.lessonHorsesByBarn = typeof data.lessonHorsesByBarn === 'object' && data.lessonHorsesByBarn ? data.lessonHorsesByBarn : {};
  app.barnLessonSelectionId = data.barnLessonSelectionId || '';
  app.barnHorseSelectionId = data.barnHorseSelectionId || '';
  app.marketSelections = typeof data.marketSelections === 'object' && data.marketSelections ? data.marketSelections : {};
  app.stablehandHired = data.stablehandHired === true;
  ensureBarnState();

  app.horses.forEach((h) => {
    h.genetics = h.genetics && typeof h.genetics === 'object' ? h.genetics : randomGenetics();
    GENE_KEYS.forEach((key) => {
      if (!h.genetics[key]) h.genetics[key] = randomGenetics()[key];
    });
    const phenotype = resolvePhenotypeFromGenetics(h.genetics, h.breed);
    h.coat = h.coat || phenotype.coat;
    h.socks = h.socks || phenotype.socks;
    h.faceMarking = h.faceMarking || phenotype.faceMarking;
    h.marking = normalizeMarkingForBreed(h.marking || phenotype.marking || 'None', h.breed);
    h.marking2 = h.marking2 || phenotype.marking2 || 'None';
    h.legMarkings = h.legMarkings || phenotype.legMarkings;
    h.modifiers = h.modifiers || phenotype.modifiers;
    if (isPregnantMare(h)) {
      if (!Number.isFinite(h.pregnancyDays) && Number.isFinite(h.gestation)) h.pregnancyDays = Math.max(0, Math.round(h.gestation * 30));
      if (!Number.isFinite(h.gestationLengthDays)) h.gestationLengthDays = Number.isFinite(h.foalDue) ? Math.round(h.foalDue * 30) : rnd(320, 360);
      ensurePregnancyState(h);
    } else {
      h.pregnancyDays = Number.isFinite(h.pregnancyDays) ? h.pregnancyDays : 0;
      h.gestationLengthDays = Number.isFinite(h.gestationLengthDays) ? h.gestationLengthDays : 0;
    }
    h.personality = h.personality || rolledPersonality(h.gender);
    h.behavior = Number.isFinite(h.behavior) ? h.behavior : 0;
    h.extraPotential = h.extraPotential === true;
    h.healthGenetics = h.healthGenetics || pick(['Low', 'Medium', 'High']);
    h.injuryProtection = h.injuryProtection || {};
    h.registryInspection = h.registryInspection || null;
    if (h.registryInspection) {
      const scored = registryInspectionScore(h);
      h.registryInspection.condition = Number.isFinite(h.registryInspection.condition) ? h.registryInspection.condition : scored.conditionScore;
      if (h.registryInspection.pedigree === undefined && scored.pedigreeScore != null) {
        h.registryInspection.pedigree = scored.pedigreeScore;
      }
      if (!h.registryInspection.registry) h.registryInspection.registry = scored.isSportCross ? 'Sport Cross' : h.breed;
    }
    h.showInspectionDetails = h.showInspectionDetails || false;
    h.showOffspringSummary = h.showOffspringSummary || false;
    h.showPedigree = h.showPedigree || false;
    h.notes = h.notes || '';
    h.showNotes = h.showNotes || false;
    h.showTrainerNotes = h.showTrainerNotes || false;
    h.feedPlan = Array.isArray(h.feedPlan) ? h.feedPlan : [];
    h.autoTrainingPlan = Array.isArray(h.autoTrainingPlan) ? h.autoTrainingPlan : [];
    h.autoTrainingFocus = h.autoTrainingFocus || h.autoTrainingPlan?.[0]?.discipline || '';
    h.autoExerciseHours = Number.isFinite(h.autoExerciseHours) ? h.autoExerciseHours : 0;
    h.preferredFeedGrams = Number.isFinite(h.preferredFeedGrams) ? h.preferredFeedGrams : rnd(50, 250);
    h.preferredMood = h.preferredMood || pick(['Motivated', 'Happy', 'Try-Hard', 'Neutral']);
    h.mood = h.mood || 'Neutral';
    h.weightStatus = h.weightStatus || 'Moderate';
    h.trainingPreference = h.trainingPreference || pick(['Low', 'Medium', 'High']);
    const [prefMin, prefMax] = trainingSessionBounds(h.trainingPreference);
    h.preferredTrainingSessions = Number.isFinite(h.preferredTrainingSessions) ? Math.round(h.preferredTrainingSessions) : rnd(prefMin, prefMax);
    h.preferredTrainingSessions = clamp(h.preferredTrainingSessions, prefMin, prefMax);
    h.trainingSessionsThisMonth = Number.isFinite(h.trainingSessionsThisMonth) ? h.trainingSessionsThisMonth : 0;
    h.lastTrainingSessions = Number.isFinite(h.lastTrainingSessions) ? h.lastTrainingSessions : 0;
    h.showEntriesThisMonth = Number.isFinite(h.showEntriesThisMonth) ? h.showEntriesThisMonth : 0;
    h.lastShowEntries = Number.isFinite(h.lastShowEntries) ? h.lastShowEntries : 0;
    h.manualTrainingThisMonth = h.manualTrainingThisMonth || false;
    h.farrierThisMonth = h.farrierThisMonth || false;
    h.turnoutHours = Number.isFinite(h.turnoutHours) ? h.turnoutHours : 0;
    h.qualityOfLife = Number.isFinite(h.qualityOfLife) ? h.qualityOfLife : 65;
    h.stallCleanliness = Number.isFinite(h.stallCleanliness) ? h.stallCleanliness : 65;
    h.hoofCare = Number.isFinite(h.hoofCare) ? h.hoofCare : 65;
    h.turnoutQuality = Number.isFinite(h.turnoutQuality) ? h.turnoutQuality : 65;
    h.dailyGrooming = Number.isFinite(h.dailyGrooming) ? h.dailyGrooming : 65;
    h.farrierCare = Number.isFinite(h.farrierCare) ? h.farrierCare : 65;
    h.barnActivityQuality = Number.isFinite(h.barnActivityQuality) ? h.barnActivityQuality : 0;
    h.barnAvailabilityPercent = Number.isFinite(h.barnAvailabilityPercent) ? h.barnAvailabilityPercent : rnd(40, 85);
    h.barnAvailable = typeof h.barnAvailable === 'boolean' ? h.barnAvailable : rnd(1, 100) <= h.barnAvailabilityPercent;
    h.lessonReplacedYear = Number.isFinite(h.lessonReplacedYear) ? h.lessonReplacedYear : 0;
    h.controlability = Number.isFinite(h.controlability) ? h.controlability : 50;
    h.confidenceJump = Number.isFinite(h.confidenceJump) ? h.confidenceJump : 50;
    h.confidenceFlat = Number.isFinite(h.confidenceFlat) ? h.confidenceFlat : 50;
    h.fatigue = Number.isFinite(h.fatigue) ? h.fatigue : 0;
    h.focus = Number.isFinite(h.focus) ? h.focus : 50;
    h.tack = typeof h.tack === 'object' && h.tack ? h.tack : {};
    h.tack.bridle = h.tack.bridle || 'Snaffle Bridle';
    h.tack.bit = h.tack.bit || 'Loose Ring Snaffle';
    h.tack.saddle = h.tack.saddle || 'All-Purpose Saddle';
    h.tack.pad = h.tack.pad || 'Basic Pad';
    h.tack.footwear = h.tack.footwear || 'Tendon Boots';
    h.tack.headwear = h.tack.headwear || 'Halter';
    h.tack.body = h.tack.body || 'No Body Aid';
    if (!TACK.headwear.includes(h.tack.headwear)) {
      h.tack.headwear = h.tack.headwear === 'Fly Mask' ? 'Race Mask' : 'Halter';
    }
    if (!TACK.body.includes(h.tack.body)) {
      h.tack.body = 'No Body Aid';
    }
    h.trainingBoost = Number.isFinite(h.trainingBoost) ? h.trainingBoost : 0;
    h.competitionBoost = Number.isFinite(h.competitionBoost) ? h.competitionBoost : 0;
    h.feedPerformanceDelta = Number.isFinite(h.feedPerformanceDelta) ? h.feedPerformanceDelta : 0;
    h.feedTrainingDelta = Number.isFinite(h.feedTrainingDelta) ? h.feedTrainingDelta : 0;
    h.turnoutEffect = Number.isFinite(h.turnoutEffect) ? h.turnoutEffect : 0;
    h.trainingPerformanceDelta = Number.isFinite(h.trainingPerformanceDelta) ? h.trainingPerformanceDelta : 0;
    h.healingBoost = Number.isFinite(h.healingBoost) ? h.healingBoost : 0;
    h.titles = Array.isArray(h.titles) ? h.titles : [];
    h.failedInspection = Boolean(h.failedInspection);
    h.requiresBreakingIn = Boolean(h.requiresBreakingIn);
    h.trainerNotes = Array.isArray(h.trainerNotes) ? h.trainerNotes : [];
    h.lastFeedIssue = h.lastFeedIssue && typeof h.lastFeedIssue === 'object' ? h.lastFeedIssue : null;
    h.lastFeedMoodOverride = h.lastFeedMoodOverride || '';
    h.lastTurnoutIssue = h.lastTurnoutIssue || '';
    h.lastTrainingIssue = h.lastTrainingIssue || '';
    h.turnoutAssignmentHours = Number.isFinite(h.turnoutAssignmentHours) ? h.turnoutAssignmentHours : 0;
    h.wrongFeedMonthsYear = Number.isFinite(h.wrongFeedMonthsYear) ? h.wrongFeedMonthsYear : 0;
    h.overTrainingCountYear = Number.isFinite(h.overTrainingCountYear) ? h.overTrainingCountYear : 0;
    h.pendingOvertrainingInjury = h.pendingOvertrainingInjury || false;
    h.handTrainingSessionsThisMonth = Number.isFinite(h.handTrainingSessionsThisMonth) ? h.handTrainingSessionsThisMonth : 0;
    h.injuryCountYear = Number.isFinite(h.injuryCountYear) ? h.injuryCountYear : 0;
    h.healthTrackingYear = Number.isFinite(h.healthTrackingYear) ? h.healthTrackingYear : app.year;
    h.hasJointSupport = h.hasJointSupport || false;
    h.bond = Number.isFinite(h.bond) ? h.bond : 0;
    h.isRescue = h.isRescue || false;
    h.rescueWeightDelay = Number.isFinite(h.rescueWeightDelay) ? h.rescueWeightDelay : 0;
    h.rescueWeightCooldown = Number.isFinite(h.rescueWeightCooldown) ? h.rescueWeightCooldown : 0;
    if (h.healthTrackingYear !== app.year) {
      h.overTrainingCountYear = 0;
      h.pendingOvertrainingInjury = false;
      h.wrongFeedMonthsYear = 0;
      h.injuryCountYear = 0;
      h.healthTrackingYear = app.year;
    }
    h.pendingCompetitions = Array.isArray(h.pendingCompetitions) ? h.pendingCompetitions : [];
    h.pendingConformationShows = Array.isArray(h.pendingConformationShows) ? h.pendingConformationShows : [];
    h.conformationWins = h.conformationWins || { goldenFirsts: 0 };
    h.titles = Array.isArray(h.titles) ? h.titles : [];
    h.height = h.height || heightFromBreed(h.breed);
    h.soundnessYears = Number.isFinite(h.soundnessYears) ? h.soundnessYears : rnd(1, 15);
    h.soundnessExpiredMonths = Number.isFinite(h.soundnessExpiredMonths) ? h.soundnessExpiredMonths : 0;
    h.lastSoundnessIssueMonth = Number.isFinite(h.lastSoundnessIssueMonth) ? h.lastSoundnessIssueMonth : 0;
    h.unridable = h.unridable || false;
    h.illnesses = Array.isArray(h.illnesses) ? h.illnesses : [];
    h.illnesses.forEach((ill) => {
      ill.remaining = Number.isFinite(ill.remaining) ? ill.remaining : 0;
      if (typeof ill.active !== 'boolean') {
        ill.active = ill.remaining > 0;
      }
    });
    h.pedigree = h.pedigree || {
      sire: null,
      dam: null,
      sireSire: null,
      sireDam: null,
      damSire: null,
      damDam: null
    };
    ensurePedigreeBase(h);
    h.stats = h.stats || { dressage: {}, jumping: {} };
    const d = h.stats.dressage || {};
    const j = h.stats.jumping || {};
    h.stats.dressage = {
      Collection: d.Collection ?? d.Relaxation ?? rnd(0, 20),
      Balance: d.Balance ?? d.Straightness ?? rnd(0, 20),
      Connection: d.Connection ?? rnd(0, 20),
      Gaits: d.Gaits ?? d.Impulsion ?? rnd(0, 20),
      Rhythm: d.Rhythm ?? rnd(0, 20),
      Flowiness: d.Flowiness ?? rnd(0, 20)
    };
    h.stats.jumping = {
      Striding: j.Striding ?? j.Adjustability ?? rnd(0, 20),
      Confidence: j.Confidence ?? rnd(0, 20),
      Balance: j.Balance ?? rnd(0, 20),
      Power: j.Power ?? rnd(0, 20),
      Speed: j.Speed ?? rnd(0, 20),
      Structure: j.Structure ?? j.Bascule ?? rnd(0, 20)
    };
    applyBreedTraits(h);
    h.lastFarrierMonth = Number.isFinite(h.lastFarrierMonth)
      ? h.lastFarrierMonth
      : (Number.isFinite(h.due?.farrierMonth) ? h.due.farrierMonth : app.year * 12 + app.month);
    h.hiddenIllnesses = Array.isArray(h.hiddenIllnesses) ? h.hiddenIllnesses : [];
    h.leaseMonthsRemaining = Number.isFinite(h.leaseMonthsRemaining) ? Math.max(0, Math.floor(h.leaseMonthsRemaining)) : 0;
    h.leaseDurationMonths = Number.isFinite(h.leaseDurationMonths) ? Math.max(0, Math.floor(h.leaseDurationMonths)) : h.leaseMonthsRemaining;
    h.leaseMonthlyCost = Number.isFinite(h.leaseMonthlyCost) ? Math.max(0, Math.round(h.leaseMonthlyCost)) : 0;
  });
  app.upcomingEvents = app.upcomingEvents.map((event) => ({
    ...event,
    isUpcomingEvent: true,
    monthsUntilStart: Number.isFinite(event.monthsUntilStart) ? Math.max(0, Math.floor(event.monthsUntilStart)) : rnd(1, 4)
  })).filter((event) => event.monthsUntilStart > 0);
  refreshRescueHorses();
}

function resetGame() {
  app.money = 50000;
  app.month = 1;
  app.day = 1;
  app.hour = 0;
  app.year = 1;
  app.horses = [];
  app.semenStraws = [];
  app.embryos = [];
  app.saleBarn = [];
  app.rescueBarn = [];
  app.npcSales = [];
  app.npcStuds = [];
  app.reports = [];
  app.competitionReports = [];
  app.rescueHorses = [];
  app.currentBarn = null;
  app.barnCatalog = [];
  app.barnShows = [];
  app.signedUpShows = [];
  app.lastBarnRefreshMonth = 0;
  app.settings = { barnName: 'Oxer to Oxer Stable Manager', breedingCode: '', breedingCodePosition: 'front', trainingMode: 'rpg', competitionMode: 'rpg' };
  app.marketSelections = {};
  app.showOffspringWindow = true;
  app.trainingSelection = { horseId: '', discipline: 'jumping', exercise: '' };
  app.trainingRpgConfig = defaultTrainingRpgConfig();
  app.trainingRpg = null;
  app.competitionRpg = null;
  app.trainingRpgFeedback = '';
  app.trainingRpgSummary = null;
  app.selectedHorseId = '';
  app.showSelections = {};
  app.vetSelection = { horseId: '', mareId: '', stallionId: '', strawId: '', embryoId: '' };
  app.trainingClinicSelection = { discipline: 'jumping' };
  app.trainingHorseScope = 'both';
  app.competitionHorseScope = 'both';
  app.calendarReminders = [];
  app.closedReminderIds = [];
  app.upcomingEvents = [];
  app.lessonHorsesByBarn = {};
  app.barnLessonSelectionId = '';
  app.barnHorseSelectionId = '';
  seed();
  saveGame(false);
}

function saveGame(manual = true) {
  try {
    localStorage.setItem(SAVE_KEY, serializeAppState());
    if (manual) pushReport('Game saved successfully.');
    return true;
  } catch (error) {
    if (manual) alert('Unable to save game in this browser/environment.');
    console.error('Save failed', error);
    return false;
  }
}

function loadGame(manual = true) {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      if (manual) alert('No saved game found yet.');
      return false;
    }
    hydrateFromSave(JSON.parse(raw));
    if (manual) pushReport('Game loaded successfully.');
    return true;
  } catch (error) {
    if (manual) alert('Failed to load saved game data.');
    console.error('Load failed', error);
    return false;
  }
}

function pushReport(text) {
  app.reports.push({ date: dateLabel(), text });
}

function pushCompetitionReport(report) {
  app.competitionReports.push(report);
}

function requiredBehaviorForRiding(horse) {
  if (!horse) return 0;
  if (horse.requiresBreakingIn) return 500;
  if (horse.bredBy === 'Your Stable') return 500;
  return 0;
}

function canRideUnderSaddle(horse) {
  if (!horse || horse.unridable) return false;
  const required = requiredBehaviorForRiding(horse);
  return (horse.behavior || 0) >= required;
}

function isPregnantMare(horse) {
  return Boolean(horse && (horse.pregnantBy || horse.pregnantEmbryo));
}

function ensurePregnancyState(mare) {
  if (!mare) return;
  if (!Number.isFinite(mare.pregnancyDays)) mare.pregnancyDays = 0;
  if (!Number.isFinite(mare.gestationLengthDays)) mare.gestationLengthDays = rnd(320, 360);
}

function pregnancyStage(horse) {
  if (!isPregnantMare(horse)) return { label: 'Not Pregnant', canCompete: true };
  ensurePregnancyState(horse);
  const days = horse.pregnancyDays || 0;
  if (days < 90) return { label: '0-90 days', canCompete: true };
  if (days < 120) return { label: '90-120 days', canCompete: false };
  if (days < 210) return { label: '120-210 days', canCompete: false };
  if (days < 320) return { label: '210-320 days', canCompete: false };
  return { label: '320+ days', canCompete: false };
}

function eligibleForPhTest(mare) {
  return isPregnantMare(mare) && (mare.pregnancyDays || 0) >= 320;
}

function phReadingForMare(mare) {
  if (!eligibleForPhTest(mare)) return null;
  ensurePregnancyState(mare);
  const left = Math.max(0, (mare.gestationLengthDays || 340) - (mare.pregnancyDays || 0));
  let minPh = 7.2;
  let maxPh = 7.8;
  if (left <= 0.5) {
    minPh = 5.8;
    maxPh = 5.9;
  } else if (left <= 1) {
    minPh = 6.0;
    maxPh = 6.3;
  } else if (left <= 2) {
    minPh = 6.4;
    maxPh = 6.7;
  } else if (left <= 7) {
    minPh = 6.8;
    maxPh = 7.1;
  }
  const actual = minPh + Math.random() * (maxPh - minPh);
  const reading = clamp(actual + ((Math.random() * 0.4) - 0.2), 5.8, 7.8);
  return Number(reading.toFixed(2));
}

function canCompeteUnderSaddle(horse) {
  if (horse?.isLessonHorse && !horse?.barnAvailable) return false;
  const pregnancy = pregnancyStage(horse);
  return horse.age >= 3 && canRideUnderSaddle(horse) && !horse.retiredToBreeding && !horse.retiredForever && pregnancy.canCompete;
}

function horseLifeStage(horse) {
  if (horse.age < 1) return 'Foal';
  if (horse.age < 3) return 'Young Horse';
  return 'Mature Horse';
}

function horseDisplayName(horse) {
  const branding = horse.registryInspection?.branding;
  if (!branding) return horse.name;
  const placement = horse.registryInspection?.brandingPlacement || 'end';
  return placement === 'front' ? `"${branding}" ${horse.name}` : `${horse.name} "${branding}"`;
}

function showRecordSummary(horse) {
  const records = horse.showResults || [];
  const first = records.filter((r) => r.placing === 1).length;
  const second = records.filter((r) => r.placing === 2).length;
  const third = records.filter((r) => r.placing === 3).length;
  return { total: records.length, first, second, third };
}

function bondLevelLabel(horse) {
  const bond = horse.bond || 0;
  if (horse.isRescue) {
    if (bond < 0) return 'Distant';
  }
  if (bond < 8) return 'Stranger';
  if (bond < 15) return 'Acquaintance';
  if (bond < 45) return 'Bonding';
  if (bond < 85) return 'Bestfriend';
  return 'Heart Horse';
}

function calculateHorseQualityOfLife(horse) {
  const stall = Number.isFinite(horse.stallCleanliness) ? horse.stallCleanliness : 65;
  const hooves = Number.isFinite(horse.hoofCare) ? horse.hoofCare : 65;
  const turnout = Number.isFinite(horse.turnoutQuality) ? horse.turnoutQuality : 65;
  const grooming = Number.isFinite(horse.dailyGrooming) ? horse.dailyGrooming : 65;
  const farrier = Number.isFinite(horse.farrierCare) ? horse.farrierCare : 65;
  const activity = Number.isFinite(horse.barnActivityQuality) ? horse.barnActivityQuality : 0;
  const baseCare = (stall + hooves + turnout + grooming + farrier) / 5;
  const cappedCare = Math.min(90, baseCare);
  return clamp(Math.round(cappedCare + activity), 0, 100);
}

function bondModifiers(horse) {
  const bond = horse.bond || 0;
  const rescuePenalty = horse.isRescue && bond < 0 ? 6 : 0;
  if (bond < 8) {
    return { penaltyBias: 4 + rescuePenalty, refusalBias: 10 + rescuePenalty, fallBias: 3 + rescuePenalty, trainingStruggle: 0.4, moodBoost: 0 };
  }
  if (bond < 15) {
    return { penaltyBias: 3 + rescuePenalty, refusalBias: 8 + rescuePenalty, fallBias: 2 + rescuePenalty, trainingStruggle: 0.4, moodBoost: 0.1 };
  }
  if (bond < 45) {
    return { penaltyBias: 1 + rescuePenalty, refusalBias: 4 + rescuePenalty, fallBias: 1 + rescuePenalty, trainingStruggle: 0.2, moodBoost: 0.2 };
  }
  if (bond < 85) {
    return { penaltyBias: 0 + rescuePenalty, refusalBias: 2 + rescuePenalty, fallBias: 0 + rescuePenalty, trainingStruggle: 0.2, moodBoost: 0.4 };
  }
  return { penaltyBias: -1 + rescuePenalty, refusalBias: 0 + rescuePenalty, fallBias: -1 + rescuePenalty, trainingStruggle: 0.1, moodBoost: 0.5 };
}

function updateBondMonthly(horse) {
  if (horse.retiredForever) return;
  let nextBond = horse.bond || 0;
  nextBond += 1;
  if (horse.manualTrainingThisMonth) nextBond += 3;
  const shows = Math.min(2, horse.lastShowEntries || 0);
  nextBond += shows * 2;
  const [feedMin, feedMax] = feedRangeBounds(horse);
  const feedTotal = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  const trainingOk = horse.lastTrainingSessions >= Math.floor((horse.preferredTrainingSessions || 25) * 0.4)
    && horse.lastTrainingSessions <= (horse.preferredTrainingSessions || 25);
  const turnoutOk = turnoutOkForHorse(horse);
  const feedOk = feedTotal >= feedMin && feedTotal <= feedMax;
  if (trainingOk && turnoutOk && feedOk) nextBond += 2;
  if (horse.farrierThisMonth) nextBond += 3;
  if (horse.soundnessYears <= 0 && !horse.retiredToBreeding && !horse.retiredForever && (horse.lastTrainingSessions > 0 || (horse.lastShowEntries || 0) > 0)) {
    nextBond -= 5;
  }
  const minBond = horse.isRescue ? -50 : 0;
  horse.bond = clamp(nextBond, minBond, 100);
  if ((horse.bond || 0) >= 85 && ['Stubborn', 'Spooky', 'Unfocused'].includes(horse.personality) && rnd(1, 100) <= 15) {
    horse.personality = pick(['Easy-Going', 'Bomb-proof']);
  }
  if ((horse.bond || 0) >= 45 && rnd(1, 100) <= 40) {
    horse.mood = pick(POSITIVE_MOODS);
  } else if ((horse.bond || 0) < 15 && rnd(1, 100) <= 45) {
    horse.mood = pick(NEGATIVE_MOODS);
  }
  horse.manualTrainingThisMonth = false;
  horse.farrierThisMonth = false;
}

function highLevelWinCountWins(horse) {
  if (!horse.showResults?.length) return 0;
  return horse.showResults.filter((r) => {
    if (r.placing !== 1) return false;
    if (r.discipline === 'jumping') return Number(r.level) >= 1.6;
    if (r.discipline === 'hunter') return r.level === 'Open';
    if (r.discipline === 'eventing') return r.level === 'Four Star';
    if (r.discipline === 'dressage') return r.level === 'Grand Prix';
    return false;
  }).length;
}

function hasGrandPrixWin(horse) {
  return horse.showResults?.some((r) => r.discipline === 'dressage' && r.level === 'Grand Prix' && r.placing === 1);
}

function updateHorseTitles(horse) {
  const titles = Array.isArray(horse.titles) ? horse.titles : [];
  const addTitle = (title) => {
    if (!titles.includes(title)) titles.push(title);
  };
  const highWins = highLevelWinCountWins(horse);
  if (highWins >= 3) addTitle('Absolute Champion');
  if (highWins >= 15) addTitle('Legend');
  if ((horse.offspring || []).length >= 5) addTitle('Proven Producer');
  const totalShows = horse.showResults?.length || 0;
  const wins = horse.showResults?.filter((r) => r.placing === 1).length || 0;
  if (totalShows > 0 && wins / totalShows > 0.8) addTitle('Star');
  if (horse.registryInspection?.result === 'Fail' && hasGrandPrixWin(horse)) addTitle('Believer');
  const genderTitle = horse.gender === 'Mare' ? 'Mare' : horse.gender === 'Stallion' ? 'Stallion' : '';
  const goldenFirsts = horse.conformationWins?.goldenFirsts || 0;
  if (genderTitle && goldenFirsts >= 5) addTitle(`Golden ${genderTitle}`);
  if (genderTitle && goldenFirsts >= 10) addTitle(`Elite ${genderTitle}`);
  horse.titles = titles;
}

function formattedHorseTitles(horse) {
  const registryTitle = horse.registryInspection?.title ? `${horse.registryInspection.title} Champion` : '';
  const customTitles = horse.titles?.length ? horse.titles.join(' • ') : '';
  return [registryTitle, customTitles].filter(Boolean).join(' • ');
}

function breedPercentages(breed) {
  if (!breed) return {};
  const parts = [];
  const regex = /([^x]+?)\s*(\d+)%/gi;
  let match;
  while ((match = regex.exec(breed)) !== null) {
    parts.push({ name: match[1].trim(), percent: Number(match[2]) });
  }
  if (!parts.length) {
    return { [breed]: 100 };
  }
  return parts.reduce((acc, part) => {
    acc[part.name] = part.percent;
    return acc;
  }, {});
}

function breedPurityPercent(breed) {
  const percents = breedPercentages(breed);
  const values = Object.values(percents);
  return values.length ? Math.max(...values) : 100;
}

function isSportCrossHorse(horse) {
  const purity = breedPurityPercent(horse.breed);
  return purity < 100;
}

function breedNorms(breed) {
  return BREED_NORMS[breed] || null;
}

function heightFromBreed(breed) {
  const norms = breedNorms(breed);
  const pickHeight = (min, max) => {
    const heights = [];
    for (let whole = Math.floor(min); whole <= Math.floor(max); whole += 1) {
      [1, 2, 3].forEach((decimal) => {
        const value = Number((whole + decimal / 10).toFixed(1));
        if (value >= min && value <= max) heights.push(value);
      });
    }
    if (!heights.length) return min;
    return pick(heights);
  };
  if (!norms) return `${pickHeight(14, 18).toFixed(1)} hh`;
  const min = Math.min(norms.minHeight, norms.maxHeight);
  const max = Math.max(norms.minHeight, norms.maxHeight);
  const height = pickHeight(min, max);
  return `${height.toFixed(1)} hh`;
}

function applyBreedTraits(horse) {
  if (!horse?.breed) return;
  if (horse.breedTraitsApplied === horse.breed) return;
  if (horse.breed === 'Friesian') {
    horse.marking = 'None';
    const roll = rnd(1, 100);
    horse.coat = roll <= 5 ? 'Chestnut (Dark)' : rnd(1, 100) <= 70 ? 'Black' : 'Bay (Dark)';
    horse.potential.dressage = Math.min(100, horse.potential.dressage + 12);
    horse.potential.jumping = Math.max(0, horse.potential.jumping - 10);
    horse.potential.eventing = Math.max(0, horse.potential.eventing - 10);
    horse.potential.hunter = Math.max(0, horse.potential.hunter - 10);
  }
  horse.breedTraitsApplied = horse.breed;
}

function visibleIllnesses(horse, revealAll) {
  return (horse.illnesses || []).filter((i) => revealAll || !i.hidden);
}

function applyFoalHandling(horse, exercise) {
  const plan = FOAL_TRAINING[exercise];
  if (!plan) return;
  horse.behavior = Math.max(0, (horse.behavior || 0) + rnd(plan.behavior[0], plan.behavior[1]));
  (plan.dressage || []).forEach((skill) => {
    horse.stats.dressage[skill] = clampSkill(horse, 'dressage', horse.stats.dressage[skill] + rnd(1, 2));
  });
  (plan.jumping || []).forEach((skill) => {
    horse.stats.jumping[skill] = clampSkill(horse, 'jumping', horse.stats.jumping[skill] + rnd(1, 2));
  });
  horse.managed.trained = true;
  if (horse.requiresBreakingIn && horse.behavior >= 500) {
    horse.requiresBreakingIn = false;
    pushReport(`${horse.name} completed breaking in and can begin regular training.`);
  }
}

function pedigreeBaseFromBreed(breed) {
  const percents = breedPercentages(breed);
  const entries = Object.entries(percents);
  if (entries.length >= 2) {
    const [sireBreed, sirePercent] = entries[0];
    const [damBreed] = entries[1];
    const normalizedSire = Math.min(100, Math.max(0, sirePercent));
    const normalizedDam = Math.max(0, 100 - normalizedSire);
    return { sireBreed, damBreed, sirePercent: normalizedSire, damPercent: normalizedDam };
  }
  const onlyBreed = entries.length ? entries[0][0] : breed || pick(BREEDS);
  return { sireBreed: onlyBreed, damBreed: onlyBreed, sirePercent: 50, damPercent: 50 };
}

function randomPedigreeName(label, breed) {
  const tag = pick(PEDIGREE_PREFIXES);
  const code = `${tag}-${rnd(1000, 9999)}`;
  const base = label === 'Dam'
    ? `${pick(['Lady', 'Queen', 'Bella', 'Nova', 'Ivy', 'Aurora'])} ${pick(['Grace', 'Dream', 'Breeze', 'Muse'])}`
    : `${pick(['Sir', 'King', 'Rider', 'Atlas', 'Titan', 'Noble'])} ${pick(['Valor', 'Legacy', 'Storm', 'Echo'])}`;
  return `${base} (#${code})`;
}

function ensurePedigreeBase(horse) {
  const ped = horse.pedigree || {
    sire: null,
    dam: null,
    sireSire: null,
    sireDam: null,
    damSire: null,
    damDam: null
  };
  const { sireBreed, damBreed, sirePercent, damPercent } = pedigreeBaseFromBreed(horse.breed);
  if (!ped.sire) ped.sire = { name: randomPedigreeName('Sire', sireBreed), breed: sireBreed, coat: pick(COATS), percent: sirePercent };
  if (!ped.dam) ped.dam = { name: randomPedigreeName('Dam', damBreed), breed: damBreed, coat: pick(COATS), percent: damPercent };
  horse.pedigree = ped;
}

function pedigreeEntry(label, info, subjectBreed) {
  const fallback = { name: 'Unknown', breed: 'Unknown', coat: 'Unknown' };
  const entry = info || fallback;
  const percents = breedPercentages(subjectBreed);
  const percentValue = Number.isFinite(entry.percent) ? entry.percent : entry.breed && percents[entry.breed] ? percents[entry.breed] : null;
  const percent = percentValue != null ? `${percentValue}%` : 'Unknown';
  return { relation: label, ...fallback, ...entry, percent };
}

function pedigreeForHorse(horse) {
  const ped = horse.pedigree || {};
  return [
    pedigreeEntry('Sire', ped.sire, horse.breed),
    pedigreeEntry('Dam', ped.dam, horse.breed),
    pedigreeEntry("Sire's Sire", ped.sireSire, horse.breed),
    pedigreeEntry("Sire's Dam", ped.sireDam, horse.breed),
    pedigreeEntry("Dam's Sire", ped.damSire, horse.breed),
    pedigreeEntry("Dam's Dam", ped.damDam, horse.breed)
  ];
}

function pedigreeStats(entry) {
  if (!entry || !entry.id) return null;
  return app.horses.find((h) => h.id === entry.id) || null;
}

function offspringSummary(horse) {
  const records = horse.offspring || [];
  let active = 0;
  let retired = 0;
  let sold = 0;
  records.forEach((o) => {
    const foal = app.horses.find((h) => h.id === o.foalId);
    if (!foal) {
      sold += 1;
      return;
    }
    if (foal.retiredForever || foal.retiredToBreeding) {
      retired += 1;
    } else {
      active += 1;
    }
  });
  return { total: records.length, active, retired, sold };
}

function horseDisciplineAverage(horse, discipline) {
  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  const jumpAvg = Object.values(jump).reduce((a, b) => a + b, 0) / 6;
  const dressAvg = Object.values(dress).reduce((a, b) => a + b, 0) / 6;
  if (discipline === 'dressage') return dressAvg;
  if (discipline === 'jumping') return (jumpAvg * 0.9) + (dress.Connection * 0.1);
  if (discipline === 'hunter') {
    return (dress.Flowiness + dress.Balance + dress.Collection + jump.Striding + jump.Confidence + jump.Balance + jump.Structure) / 7;
  }
  return (jumpAvg + dressAvg) / 2;
}

function clampSkill(horse, discipline, value) {
  const capValue = horse?.potential?.[discipline] ?? 100;
  return Math.min(capValue, value);
}

function disciplineStatsGroup(horse, discipline) {
  if (discipline === 'dressage') return horse.stats.dressage;
  if (discipline === 'jumping' || discipline === 'hunter') return horse.stats.jumping;
  return null;
}

function disciplineAtPotential(horse, discipline) {
  const capValue = horse?.potential?.[discipline] ?? 100;
  if (discipline === 'eventing') {
    const dressAt = Object.values(horse.stats.dressage).every((v) => v >= capValue);
    const jumpAt = Object.values(horse.stats.jumping).every((v) => v >= capValue);
    return dressAt && jumpAt;
  }
  const stats = disciplineStatsGroup(horse, discipline);
  return stats ? Object.values(stats).every((v) => v >= capValue) : false;
}

function autoTrainingOptionsForHorse(horse) {
  if ((horse.behavior || 0) < requiredBehaviorForRiding(horse)) {
    return [{ value: 'Breaking in', label: 'Breaking in (lunging, accept touch, light work)' }];
  }
  if (horse.age < 3) {
    return [{ value: 'Breaking in', label: 'Breaking in (lunging, accept touch, light work)' }];
  }
  if (horse.retiredForever || horse.retiredToBreeding) {
    return [{ value: 'Light Exercise', label: 'Light Exercise (lunging/hot-walker)' }];
  }
  return [
    { value: 'jumping', label: 'Jumping' },
    { value: 'dressage', label: 'Dressage' },
    { value: 'eventing', label: 'Eventing' },
    { value: 'hunter', label: 'Hunters' }
  ];
}

function applyExerciseSession(horse, options = {}) {
  const { silent = false, accumulate = false } = options;
  const exercise = pick(['Lunging', 'Hot walker']);
  const hours = rnd(1, 3);
  horse.autoExerciseHours = accumulate ? (horse.autoExerciseHours || 0) + hours : hours;
  horse.managed.trained = true;
  horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
  if (!silent) {
    pushReport(`${horse.name} completed exercise: ${exercise} for ${hours} hour(s).`);
  }
  return { exercise, hours };
}

function levelIndex(discipline, level) {
  return SHOW_LEVELS[discipline].indexOf(level);
}


function requiredSkillBand(discipline, level) {
  const idx = Math.max(0, levelIndex(discipline, level));
  return LEVEL_SKILL_BANDS[discipline][idx] || [5, 100];
}

function effectiveDisciplineSkill(horse, discipline) {
  const raw = horseDisciplineAverage(horse, discipline);
  const talentBoost = horse.extraPotential ? 3 : 0;
  return Math.min(raw + talentBoost, horse.potential[discipline] || 100);
}

function horseSkillScore(horse) {
  return Math.round((horseDisciplineAverage(horse, 'jumping') + horseDisciplineAverage(horse, 'dressage')) / 2);
}

function priceRangeByConformationAndSkill(conformation, skillScore) {
  const ranges = [];
  if (['Very Bad', 'Bad'].includes(conformation)) {
    ranges.push({ min: 0, max: 15, price: [5000, 8000] });
    ranges.push({ min: 15, max: 30, price: [7000, 12000] });
    ranges.push({ min: 30, max: 45, price: [10000, 18000] });
    ranges.push({ min: 45, max: 60, price: [15000, 22000] });
    ranges.push({ min: 60, max: 75, price: [20000, 26000] });
    ranges.push({ min: 75, max: 85, price: [25000, 30000] });
  } else if (conformation === 'Acceptable') {
    ranges.push({ min: 0, max: 15, price: [8000, 12000] });
    ranges.push({ min: 15, max: 30, price: [10000, 18000] });
    ranges.push({ min: 30, max: 45, price: [16000, 25000] });
    ranges.push({ min: 45, max: 60, price: [22000, 32000] });
    ranges.push({ min: 60, max: 75, price: [30000, 40000] });
    ranges.push({ min: 75, max: 85, price: [38000, 45000] });
    ranges.push({ min: 85, max: 95, price: [45000, 50000] });
  } else if (['Good', 'Very Good'].includes(conformation)) {
    ranges.push({ min: 15, max: 30, price: [15000, 22000] });
    ranges.push({ min: 30, max: 45, price: [20000, 30000] });
    ranges.push({ min: 45, max: 60, price: [28000, 40000] });
    ranges.push({ min: 60, max: 75, price: [38000, 52000] });
    ranges.push({ min: 75, max: 85, price: [50000, 60000] });
    ranges.push({ min: 85, max: 95, price: [58000, 65000] });
  } else if (conformation === 'Excellent') {
    ranges.push({ min: 30, max: 45, price: [20000, 30000] });
    ranges.push({ min: 45, max: 60, price: [28000, 45000] });
    ranges.push({ min: 60, max: 75, price: [40000, 65000] });
    ranges.push({ min: 75, max: 85, price: [60000, 85000] });
    ranges.push({ min: 85, max: 95, price: [80000, 100000] });
    ranges.push({ min: 95, max: 100, price: [100000, 110000] });
  }
  const match = ranges.find((range) => skillScore >= range.min && skillScore < range.max);
  if (match) return match.price;
  if (ranges.length && skillScore >= ranges[ranges.length - 1].max) return ranges[ranges.length - 1].price;
  return [5000, 12000];
}

function highLevelWinCount(horse) {
  if (!horse.showResults?.length) return 0;
  return horse.showResults.filter((r) => {
    if (r.placing > 3) return false;
    if (r.discipline === 'jumping') return Number(r.level) >= 1.6;
    if (r.discipline === 'hunter') return r.level === 'Open';
    if (r.discipline === 'eventing') return r.level === 'Four Star';
    if (r.discipline === 'dressage') return r.level === 'Grand Prix';
    return false;
  }).length;
}

function calculateHorsePrice(horse, useRandom = false) {
  const skillScore = horseSkillScore(horse);
  const [minPrice, maxPrice] = priceRangeByConformationAndSkill(horse.conformation, skillScore);
  const base = useRandom ? rnd(minPrice, maxPrice) : Math.round((minPrice + maxPrice) / 2);
  const earningsBoost = Math.min(60000, Math.round((horse.earnings || 0) * 0.4));
  const highClassBoost = highLevelWinCount(horse) * 15000;
  const championshipBoost = horse.championships * 3000 + horse.reserves * 1500;
  const titleBoost = horse.registryInspection?.title === 'Elite' ? 30000 : horse.registryInspection?.title === 'Golden' ? 15000 : 0;
  return Math.max(3500, base + earningsBoost + highClassBoost + championshipBoost + titleBoost);
}

function highestAllowedLevelIndex(horse, discipline) {
  const score = effectiveDisciplineSkill(horse, discipline);
  let maxIdx = 0;
  SHOW_LEVELS[discipline].forEach((lvl, idx) => {
    const [minNeeded] = requiredSkillBand(discipline, lvl);
    if (score >= minNeeded) maxIdx = idx;
  });
  return maxIdx;
}

function disciplineLevelSummary(horse, discipline) {
  const idx = highestAllowedLevelIndex(horse, discipline);
  const label = SHOW_LEVELS[discipline][idx];
  return `${cap(discipline)} max: ${label}`;
}

function horseWorth(horse) {
  const agePenalty = horse.age > 16 ? (horse.age - 16) * 1500 : 0;
  const base = calculateHorsePrice(horse, false);
  return Math.max(350, Math.round(base - agePenalty));
}

function baseHorse(type = 'trained', origin = 'player') {
  const minAge = type === 'untrained' ? 4 : type === 'trained' ? 8 : 10;
  const maxAge = type === 'untrained' ? 6 : type === 'trained' ? 11 : 12;
  const name = `${pick(['Silver', 'Midnight', 'Winter', 'Storm', 'Emerald', 'Hope', 'Royal', 'Velvet', 'Sol', 'Luna', 'Aster', 'Río', 'Nieve', 'Cielo', 'Frost', 'Sable', 'Aquila', 'Noir', 'Azul', 'Viento', 'Sakura', 'Kumo', 'Brisa', 'Ravn', 'Fuego', 'Aurum', 'Étoile', 'Vega'])} ${pick(['Dream', 'River', 'Valor', 'Cross', 'Echo', 'Flight', 'Blessing', 'Danza', 'Cielo', 'Mistral', 'Reina', 'Fleur', 'Nimbus', 'Solstice', 'Gloria', 'Mariposa', 'Orion', 'Zenith', 'Eclipse', 'Horizon', 'Belle', 'Shadow', 'Storm', 'Mirage'])}`;
  const potential = {
    dressage: rnd(35, 100),
    jumping: rnd(35, 100),
    eventing: rnd(35, 100),
    hunter: rnd(35, 100)
  };
  const statRange = type === 'untrained' ? [0, 10] : type === 'trained' ? [30, 60] : [85, 95];
  const horse = {
    id: uid(),
    name,
    breed: pick(BREEDS),
    gender: pick(['Mare', 'Stallion', 'Gelding']),
    age: rnd(minAge, maxAge),
    coat: pick(COATS),
    socks: pick(SOCKS),
    marking: 'None',
    marking2: 'None',
    faceMarking: pick(FACE_MARKINGS),
    legMarkings: null,
    modifiers: null,
    genetics: null,
    personality: '',
    behavior: 0,
    controlability: 50,
    confidenceJump: 50,
    confidenceFlat: 50,
    fatigue: 0,
    focus: 50,
    extraPotential: false,
    healthGenetics: pick(['Low', 'Medium', 'High']),
    injuryProtection: {},
    registryInspection: null,
    showInspectionDetails: false,
    showOffspringSummary: false,
    showPedigree: false,
    notes: '',
    showNotes: false,
    showTrainerNotes: false,
    feedPlan: [],
    autoTrainingPlan: [],
    autoTrainingFocus: '',
    autoExerciseHours: 0,
    preferredFeedGrams: rnd(50, 250),
    preferredMood: pick(['Motivated', 'Happy', 'Try-Hard', 'Neutral']),
    mood: 'Neutral',
    weightStatus: 'Moderate',
    trainingPreference: pick(['Low', 'Medium', 'High']),
    preferredTrainingSessions: 0,
    trainingSessionsThisMonth: 0,
    lastTrainingSessions: 0,
    showEntriesThisMonth: 0,
    lastShowEntries: 0,
    handTrainingSessionsThisMonth: 0,
    manualTrainingThisMonth: false,
    farrierThisMonth: false,
    turnoutHours: 0,
    qualityOfLife: 65,
    stallCleanliness: 65,
    hoofCare: 65,
    turnoutQuality: 65,
    dailyGrooming: 65,
    farrierCare: 65,
    barnActivityQuality: 0,
    lessonReplacedYear: 0,
    tack: {
      bridle: 'Snaffle Bridle',
      bit: 'Loose Ring Snaffle',
      saddle: 'All-Purpose Saddle',
      pad: 'Basic Pad',
      footwear: 'Tendon Boots',
      headwear: 'Halter',
      body: 'No Body Aid'
    },
    turnoutAssignmentHours: 0,
    trainingBoost: 0,
    competitionBoost: 0,
    feedPerformanceDelta: 0,
    feedTrainingDelta: 0,
    turnoutEffect: 0,
    trainingPerformanceDelta: 0,
    healingBoost: 0,
    titles: [],
    failedInspection: false,
    requiresBreakingIn: false,
    trainerNotes: [],
    lastFeedIssue: null,
    lastFeedMoodOverride: '',
    lastTurnoutIssue: '',
    lastTrainingIssue: '',
    wrongFeedMonthsYear: 0,
    overTrainingCountYear: 0,
    pendingOvertrainingInjury: false,
    injuryCountYear: 0,
    healthTrackingYear: app.year,
    hasJointSupport: false,
    bond: 0,
    isRescue: false,
    rescueWeightDelay: 0,
    rescueWeightCooldown: 0,
    conformation: pick(CONFORMATION),
    height: '',
    soundnessYears: rnd(1, 15),
    soundnessExpiredMonths: 0,
    lastSoundnessIssueMonth: 0,
    unridable: false,
    owner: 'Your Stable',
    bredBy: origin === 'npc' ? pick(['North Ridge Stable', 'Willow Creek Farm', 'Silverline Equestrian', 'Ravenwood Horses']) : 'Unknown',
    retiredToBreeding: false,
    retiredForever: false,
    managed: { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false },
    due: { checkup: true, farrier: false },
    lastFarrierMonth: app.year * 12 + app.month,
    illnesses: [],
    hiddenIllnesses: [],
    healthRisks: [pick(['Metabolic', 'Colic', 'Laminitis', 'Tendon Strain']), pick(['Arthritis', 'Respiratory', 'Ulcers', 'None'])],
    vetNotes: [],
    stats: {
      dressage: { Collection: rnd(statRange[0], statRange[1]), Balance: rnd(statRange[0], statRange[1]), Connection: rnd(statRange[0], statRange[1]), Gaits: rnd(statRange[0], statRange[1]), Rhythm: rnd(statRange[0], statRange[1]), Flowiness: rnd(statRange[0], statRange[1]) },
      jumping: { Striding: rnd(statRange[0], statRange[1]), Confidence: rnd(statRange[0], statRange[1]), Balance: rnd(statRange[0], statRange[1]), Power: rnd(statRange[0], statRange[1]), Speed: rnd(statRange[0], statRange[1]), Structure: rnd(statRange[0], statRange[1]) }
    },
    potential,
    coi: rnd(0, 25),
    showResults: [],
    pendingCompetitions: [],
    pendingConformationShows: [],
    titles: [],
    breedersEntries: 0,
    totalPoints: 0,
    championships: 0,
    reserves: 0,
    earnings: 0,
    topWins: { mareFilly: 0, breed: 0, overall: 0, highestScore: 0 },
    conformationWins: { goldenFirsts: 0 },
    offspring: [],
    pedigree: {
      sire: null,
      dam: null,
      sireSire: null,
      sireDam: null,
      damSire: null,
      damDam: null
    }
  };
  horse.personality = rolledPersonality(horse.gender);
  const [prefMin, prefMax] = trainingSessionBounds(horse.trainingPreference);
  horse.preferredTrainingSessions = rnd(prefMin, prefMax);
  horse.height = heightFromBreed(horse.breed);
  horse.controlability = controlabilityFromPersonality(horse.personality);
  applyBreedTraits(horse);
  horse.genetics = randomGenetics();
  const phenotype = resolvePhenotypeFromGenetics(horse.genetics, horse.breed);
  horse.coat = phenotype.coat;
  horse.marking = phenotype.marking;
  horse.marking2 = phenotype.marking2;
  horse.faceMarking = phenotype.faceMarking;
  horse.legMarkings = phenotype.legMarkings;
  horse.socks = phenotype.socks;
  horse.modifiers = phenotype.modifiers;
  if (origin === 'npc') {
    const { sireBreed, damBreed, sirePercent, damPercent } = pedigreeBaseFromBreed(horse.breed);
    horse.pedigree.sire = { name: randomPedigreeName('Sire', sireBreed), breed: sireBreed, coat: pick(COATS), percent: sirePercent };
    horse.pedigree.dam = { name: randomPedigreeName('Dam', damBreed), breed: damBreed, coat: pick(COATS), percent: damPercent };
  }
  ensurePedigreeBase(horse);
  if (rnd(1, 100) <= 18) {
    horse.extraPotential = true;
    Object.keys(horse.potential).forEach((k) => {
      horse.potential[k] = Math.min(100, horse.potential[k] + rnd(6, 14));
    });
  }
  return horse;
}

function createRescueHorse() {
  const horse = baseHorse('untrained', 'npc');
  horse.age = rnd(1, 4);
  horse.owner = 'Rescue Organization';
  horse.requiresBreakingIn = rnd(1, 100) <= 45;
  if (horse.requiresBreakingIn) horse.behavior = rnd(0, 40);
  const illnessCount = rnd(1, 3);
  horse.illnesses = Array.from({ length: illnessCount }, () => {
    const picked = pick(SICKNESS_TYPES);
    const remaining = rnd(1, 4);
    return {
      name: picked.name,
      impact: picked.impact,
      remaining,
      active: true,
      severity: picked.severity,
      retirementRisk: picked.retirementRisk || 0,
      hidden: rnd(1, 100) <= 55
    };
  });
  horse.soundnessYears = Math.max(0, horse.soundnessYears - rnd(0, 3));
  horse.rescueId = uid();
  horse.rescueFee = rnd(500, 900);
  return horse;
}

function inheritExtraPotential(dam, sire) {
  const inheritedChance = dam?.extraPotential || sire?.extraPotential ? 35 : 18;
  return rnd(1, 100) <= inheritedChance;
}

function foalPotential(dam, sire) {
  const disciplines = Object.keys(SHOW_LEVELS);
  const output = {};
  disciplines.forEach((d) => {
    const damValue = Number.isFinite(dam?.potential?.[d]) ? dam.potential[d] : rnd(35, 100);
    const sireValue = Number.isFinite(sire?.potential?.[d]) ? sire.potential[d] : rnd(35, 100);
    const low = Math.max(0, Math.min(damValue, sireValue) - 5);
    const high = Math.min(100, Math.max(damValue, sireValue) + 10);
    output[d] = rnd(Math.min(low, high), Math.max(low, high));
  });
  return output;
}

function processPregnancy(mare, newborns, dayAdvance = 30) {
  if (!mare || !(mare.pregnantBy || mare.pregnantEmbryo)) return;
  ensurePregnancyState(mare);
  mare.pregnancyDays += Math.max(0, Number(dayAdvance) || 0);

  if (mare.pregnancyDays < (mare.gestationLengthDays || 340)) {
    if (mare.pregnancyDays >= 210) mare.weightStatus = 'Overweight';
    else if (mare.pregnancyDays >= 90) mare.weightStatus = pick(['Moderate', 'Fleshy']);
    return;
  }

  const embryo = mare.pregnantEmbryo || null;
  const sire = embryo?.sireId
    ? app.horses.find((h) => h.id === embryo.sireId)
    : app.horses.find((h) => h.name === (mare.pregnantBy || embryo?.sire));
  const sireName = sire?.name || mare.pregnantBy || embryo?.sire || 'Unknown Stallion';

  const foal = baseHorse('untrained', 'player');
  foal.age = 0;
  foal.owner = 'Your Stable';
  foal.gender = pick(['Mare', 'Stallion']);
  foal.breed = mare.breed || sire?.breed || pick(BREEDS);
  foal.conformation = foalConformationFromParents(mare, sire || {});
  foal.height = heightFromBreed(foal.breed);
  foal.genetics = foalGeneticsFromParents(mare, sire || {});
  if (countAllele(foal.genetics.overo, 'O') === 2) {
    pushReport(`${mare.name} lost a foal due to lethal frame overo (OO).`);
    delete mare.pregnantBy;
    delete mare.pregnantEmbryo;
    mare.pregnancyDays = 0;
    mare.gestationLengthDays = 0;
    return;
  }
  const foalPhenotype = resolvePhenotypeFromGenetics(foal.genetics, foal.breed);
  foal.coat = foalPhenotype.coat;
  foal.marking = foalPhenotype.marking;
  foal.marking2 = foalPhenotype.marking2;
  foal.faceMarking = foalPhenotype.faceMarking;
  foal.legMarkings = foalPhenotype.legMarkings;
  foal.socks = foalPhenotype.socks;
  foal.modifiers = foalPhenotype.modifiers;
  foal.potential = foalPotential(mare, sire || {});
  foal.extraPotential = inheritExtraPotential(mare, sire || {});
  if (foal.extraPotential) {
    Object.keys(foal.potential).forEach((k) => {
      foal.potential[k] = Math.min(100, foal.potential[k] + rnd(4, 10));
    });
  }

  const rare = [];
  if (rnd(1, 10000) <= 100) rare.push('Twins (high risk)');
  if (rnd(1, 10000) <= 200) rare.push('Premature foal');
  if (rnd(1, 10000) <= 150) rare.push('Extra tall genetic spike');
  if (rnd(1, 10000) <= 50) rare.push('Color mutation');
  foal.foalVitality = {
    score: rnd(0, 100),
    shownUntilDay: 180,
    ageDays: 0,
    rareEvents: rare
  };

  const code = (app.settings?.breedingCode || '').trim();
  if (code) {
    foal.name = app.settings?.breedingCodePosition === 'end' ? `${foal.name} ${code}` : `${code} ${foal.name}`;
  }

  foal.pedigree = foal.pedigree || {};
  foal.pedigree.dam = { name: mare.name, breed: mare.breed, coat: mare.coat };
  foal.pedigree.sire = { name: sireName, breed: sire?.breed || embryo?.sireBreed || 'Unknown', coat: sire?.coat || 'Unknown' };
  ensurePedigreeBase(foal);

  mare.offspring = Array.isArray(mare.offspring) ? mare.offspring : [];
  mare.offspring.push({ id: uid(), foalId: foal.id, name: foal.name, gender: foal.gender, age: 0, status: 'Active', date: dateLabel() });
  if (sire) {
    sire.offspring = Array.isArray(sire.offspring) ? sire.offspring : [];
    sire.offspring.push({ id: uid(), foalId: foal.id, name: foal.name, gender: foal.gender, age: 0, status: 'Active', date: dateLabel() });
  }

  newborns.push(foal);
  pushReport(`${mare.name} foaled ${foal.name} (${foal.gender}) by ${sireName}.`);

  delete mare.pregnantBy;
  delete mare.pregnantEmbryo;
  mare.pregnancyDays = 0;
  mare.gestationLengthDays = 0;
}


function seed() {
  app.horses = [baseHorse('trained'), baseHorse('untrained'), baseHorse('fully')];
  app.saleBarn = [baseHorse('fully', 'npc'), baseHorse('trained', 'npc')].map((h) => {
    seedShowHistory(h, rnd(1, 3), 10);
    h.marking = randomMarking(h.breed, { salesMarketBoost: true });
    return { ...h, owner: 'NPC Stable', price: Math.round(calculateHorsePrice(h, true) * rnd(95, 110) / 100) };
  });
  refreshNpcAds();
  refreshRescueHorses();
  ensureBarnState();
  refreshBarnShows();
}

function seedShowHistory(horse, showCount = rnd(1, 4), maxLevelIndex = 4) {
  horse.showResults = Array.isArray(horse.showResults) ? horse.showResults : [];
  const disciplines = Object.keys(SHOW_LEVELS);
  const safeCount = Math.max(0, showCount);
  for (let i = 0; i < safeCount; i += 1) {
    const discipline = pick(disciplines);
    const levels = SHOW_LEVELS[discipline] || [];
    if (!levels.length) continue;
    const levelCap = Math.min(levels.length - 1, Math.max(0, maxLevelIndex));
    const level = levels[rnd(0, levelCap)];
    const placing = rnd(1, 12);
    const score = rnd(58, 98);
    const prize = Math.max(0, Math.round((13 - placing) * rnd(60, 180)));
    horse.showResults.push({
      date: dateLabel(),
      discipline,
      level,
      score,
      placing,
      prize,
      resultText: `Score ${score}`
    });
    horse.totalPoints = (horse.totalPoints || 0) + Math.max(0, 30 - placing);
    horse.earnings = (horse.earnings || 0) + prize;
    if (placing === 1) horse.championships = (horse.championships || 0) + 1;
    if (placing === 2) horse.reserves = (horse.reserves || 0) + 1;
  }
  updateHorseTitles(horse);
}


function applySalesAgeSkillBand(horse) {
  const age = horse.age || 3;
  let maxSkill = 95;
  if (age <= 4) maxSkill = 20;
  else if (age <= 6) maxSkill = 40;
  else if (age <= 8) maxSkill = 50;
  Object.keys(horse.stats.dressage || {}).forEach((k) => {
    horse.stats.dressage[k] = rnd(0, maxSkill);
  });
  Object.keys(horse.stats.jumping || {}).forEach((k) => {
    horse.stats.jumping[k] = rnd(0, maxSkill);
  });
}

function refreshNpcAds() {
  const saleCount = 6;
  const studCount = 5;
  app.npcSales = Array.from({ length: saleCount }, () => {
    const horse = baseHorse(pick(['trained', 'fully']), 'npc');
    horse.age = rnd(3, 25);
    applySalesAgeSkillBand(horse);
    seedShowHistory(horse, rnd(1, 4), 8);
    horse.owner = pick(['North Ridge Stable', 'Willow Creek Farm', 'Silverline Equestrian', 'Ravenwood Horses']);
    horse.marking = randomMarking(horse.breed, { salesMarketBoost: true });
    horse.saleId = uid();
    horse.price = Math.round(calculateHorsePrice(horse, true) * rnd(90, 118) / 100);
    return horse;
  });
  app.npcStuds = Array.from({ length: studCount }, () => {
    const stallion = baseHorse('fully', 'npc');
    stallion.gender = 'Stallion';
    seedShowHistory(stallion, rnd(2, 6), 10);
    stallion.owner = pick(['Blue Stone Stud', 'Goldleaf Stallions', 'Westwind Breeding', 'Pine Hollow Sporthorses']);
    stallion.studId = uid();
    stallion.fee = Math.max(500, Math.round(horseWorth(stallion) * rnd(4, 9) / 100));
    return stallion;
  });
}

function generateRescueHorse() {
  const name = `${pick(['Hope', 'Misty', 'Shadow', 'Brave', 'Willow', 'Ash', 'Storm', 'Echo'])} ${pick(['Rescue', 'Heart', 'Spirit', 'Horizon', 'Promise'])}`;
  const age = rnd(3, 18);
  const ageLabel = rnd(1, 100) <= 15 ? `${age}` : `${Math.max(1, age - rnd(1, 3))}-${age + rnd(2, 6)}`;
  const breed = randomRescueBreed();
  const gender = pick(['Mare', 'Stallion', 'Gelding']);
  const weightStatus = pick(['Very Underweight', 'Underweight', 'Moderate', 'Overweight']);
  const issues = rescueHealthIssues();
  const deadlineMonths = rnd(1, 8);
  const deadlineMonthIndex = currentMonthIndex() + deadlineMonths;
  return {
    id: uid(),
    name,
    age,
    ageLabel,
    breed,
    gender,
    weightStatus,
    issues,
    deadlineMonths,
    deadlineMonthIndex,
    rescueFee: rnd(500, 1500),
    note: 'After buying a rescue horse, make sure to give them a vet check! They might have a hidden illness or two…',
    rescueWeightDelay: rnd(4, 12),
    isGreen: rnd(1, 100) <= 35,
    unridable: issues.some((i) => i.name === 'Kissing Spines')
  };
}

function refreshRescueHorses() {
  const now = currentMonthIndex();
  if (!Array.isArray(app.rescueHorses)) app.rescueHorses = [];
  app.rescueHorses = app.rescueHorses.filter((h) => h.deadlineMonthIndex > now);
  while (app.rescueHorses.length < 15) {
    app.rescueHorses.push(generateRescueHorse());
  }
}

function randomRescueBreed() {
  const roll = rnd(1, 100);
  const one = pick(BREEDS);
  if (roll <= 15) return `${one} 100%`;
  if (roll <= 50) {
    const two = pick(BREEDS.filter((b) => b !== one));
    return `${one} 50% x ${two} 50%`;
  }
  if (roll <= 85) {
    const picks = [one, pick(BREEDS), pick(BREEDS), pick(BREEDS)];
    return picks.map((b) => `${b} 25%`).join(' x ');
  }
  const picks = [one, pick(BREEDS), pick(BREEDS), pick(BREEDS), pick(BREEDS)];
  return picks.map((b) => `${b} 15%`).join(' x ');
}

function rescueHealthIssues() {
  const pool = [
    { name: 'Internal Parasites', severity: 'Medium', note: 'Can damage liver, arteries, and intestines.' },
    { name: 'Chronic Infection', severity: 'More Than Medium', note: 'Low-grade infection drains energy.' },
    { name: 'Laminitis', severity: 'Severe', note: 'Hidden hoof inflammation and pain risk.' },
    { name: 'Anhidrosis', severity: 'More Than Medium', note: 'Unable to sweat and overheats easily.' },
    { name: 'Melanoma', severity: 'Severe', note: 'Higher UV sensitivity, especially in grey/white coats.' }
  ];
  if (rnd(1, 100) <= 10) return [];
  const count = rnd(1, 5);
  const issues = [];
  for (let i = 0; i < count; i += 1) {
    if (rnd(1, 100) <= 10) {
      issues.push({ name: 'Kissing Spines', severity: 'Very Severe', note: 'Unridable, only controlability work recommended.' });
    } else {
      issues.push(pick(pool));
    }
  }
  return issues;
}

function generateRescueHorse() {
  const name = `${pick(['Hope', 'Misty', 'Shadow', 'Brave', 'Willow', 'Ash', 'Storm', 'Echo'])} ${pick(['Rescue', 'Heart', 'Spirit', 'Horizon', 'Promise'])}`;
  const age = rnd(3, 18);
  const ageLabel = rnd(1, 100) <= 15 ? `${age}` : `${Math.max(1, age - rnd(1, 3))}-${age + rnd(2, 6)}`;
  const breed = randomRescueBreed();
  const gender = pick(['Mare', 'Stallion', 'Gelding']);
  const weightStatus = pick(['Very Underweight', 'Underweight', 'Moderate', 'Overweight']);
  const issues = rescueHealthIssues();
  const deadlineMonths = rnd(1, 8);
  const deadlineMonthIndex = currentMonthIndex() + deadlineMonths;
  return {
    id: uid(),
    name,
    age,
    ageLabel,
    breed,
    gender,
    weightStatus,
    issues,
    deadlineMonths,
    deadlineMonthIndex,
    rescueFee: rnd(500, 1500),
    note: 'After buying a rescue horse, make sure to give them a vet check! They might have a hidden illness or two…',
    rescueWeightDelay: rnd(4, 12),
    isGreen: rnd(1, 100) <= 35,
    unridable: issues.some((i) => i.name === 'Kissing Spines')
  };
}

function refreshRescueHorses() {
  const now = currentMonthIndex();
  if (!Array.isArray(app.rescueHorses)) app.rescueHorses = [];
  app.rescueHorses = app.rescueHorses.filter((h) => h.deadlineMonthIndex > now);
  while (app.rescueHorses.length < 15) {
    app.rescueHorses.push(generateRescueHorse());
  }
}

function updateHeader() {
  const monthEl = document.getElementById('monthLabel');
  const moneyEl = document.getElementById('moneyLabel');
  const titleEl = document.querySelector('.topbar h1');
  if (titleEl) titleEl.textContent = app.settings?.barnName || 'Oxer to Oxer Stable Manager';
  if (monthEl) monthEl.textContent = `Day ${app.day}, Month ${app.month}, Year ${app.year} • ${String(app.hour).padStart(2, '0')}:00`; 
  if (moneyEl) moneyEl.innerHTML = `<span class="money money-clickable" title="Click to set money amount">${money(app.money)}</span>`;
  const skipHourBtn = document.getElementById('skipHourBtn');
  if (skipHourBtn) {
    skipHourBtn.disabled = false;
    skipHourBtn.style.display = '';
  }
}

function releaseLeasedHorseToLessonProgram(horse) {
  Object.values(app.lessonHorsesByBarn || {}).forEach((roster) => {
    if (!Array.isArray(roster)) return;
    const sourceLessonHorse = roster.find((x) => x.id === horse.leaseSourceId);
    if (sourceLessonHorse) sourceLessonHorse.barnAvailable = true;
  });
}

function changeTab(tab) {
  tabs.forEach((t) => {
    const panel = document.getElementById(t);
    panel?.classList.toggle('hidden', t !== tab);
    document.querySelector(`[data-tab='${t}']`)?.classList.toggle('active', t === tab);
  });
}

function ensurePanels() {
  let main = document.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    document.body.append(main);
  }
  tabs.forEach((tab) => {
    if (document.getElementById(tab)) return;
    const section = document.createElement('section');
    section.id = tab;
    section.className = 'panel hidden';
    main.append(section);
  });
}

function buildTabs() {
  let wrap = document.getElementById('tabs');
  if (!wrap) {
    wrap = document.createElement('nav');
    wrap.id = 'tabs';
    wrap.className = 'tabs';
    const topbar = document.querySelector('.topbar');
    if (topbar && topbar.nextSibling) topbar.parentNode.insertBefore(wrap, topbar.nextSibling);
    else document.body.prepend(wrap);
  }
  wrap.innerHTML = '';
  tabs.forEach((tab) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.tab = tab;
    btn.textContent = cap(tab);
    btn.onclick = () => changeTab(tab);
    wrap.append(btn);
  });
  changeTab('dashboard');
}

function renderDashboard() {
  const reminders = activeRemindersForCurrentMonth();
  const sick = app.horses.filter((h) => h.illnesses.some((i) => i.active)).length;
  const competitionReports = app.competitionReports.slice(-6).reverse().map((report) => `
    <details class='report'>
      <summary>${report.horseName} — ${cap(report.discipline)} ${report.level} (#${report.placing}/${report.fieldSize})</summary>
      <div class='box'>
        <p><strong>Competition:</strong> ${report.competitionName}</p>
        <p><strong>Penalties:</strong> ${report.penaltiesText || '-'}</p>
        <p><strong>Time/Score:</strong> ${report.timeScoreText || '-'}</p>
        ${report.conformationBreakdown ? `<p><strong>Conformation Score Breakdown:</strong> Mood ${report.conformationBreakdown.mood}, Type ${report.conformationBreakdown.type}, Body ${report.conformationBreakdown.body}, Personality ${report.conformationBreakdown.personality}, QOL ${report.conformationBreakdown.qualityOfLife}, Random ${report.conformationBreakdown.random >= 0 ? '+' : ''}${report.conformationBreakdown.random}</p>` : ''}
        <p><strong>Horse Name:</strong> ${report.horseName}</p>
        <p><strong>Horse Breed:</strong> ${report.horseBreed}</p>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Placing:</strong> #${report.placing} of ${report.fieldSize}</p>
        <h4>Highlights</h4>
        <ul>${(report.highlights || []).map((line) => `<li>${line}</li>`).join('')}</ul>
        <h4>Comments</h4>
        <p>${report.comment}</p>
        <h4>Suggestions</h4>
        <p>${report.suggestion}</p>
      </div>
    </details>
  `).join('') || '<p class="small">No competition reports yet.</p>';
  document.getElementById('dashboard').innerHTML = `
    ${reminders.length ? `<div class='box' style='border:2px solid #c40000;background:#ffe7e7'><h3 style='color:#c40000'>Reminders</h3>${reminders.map((r) => `<p><strong>${r.type}:</strong> ${r.note || 'No note'} <button data-rem-close='${r.id}'>Close</button></p>`).join('')}</div>` : ''}
    <div class="grid two">
      <div class="box">
        <h2>Stable Snapshot</h2>
        <p>Horses: <strong>${app.horses.length}</strong></p>
        <p>Horses currently sick/injured: <strong>${sick}</strong></p>
        <p>Frozen Semen Straws: <strong>${app.semenStraws.length}</strong></p>
        <p>Frozen Embryos: <strong>${app.embryos.length}</strong></p>
      </div>
      <div class="box">
        <h2>Latest Reports</h2>
        ${app.reports.slice(-8).reverse().map((r) => `<p class='small'>${r.date}: ${r.text}</p>`).join('') || '<p class="small">No reports yet.</p>'}
      </div>
    </div>
    <div class="box">
      <h2>Competition Reports</h2>
      <button id="clear-competition-reports">Clear Reports</button>
      ${competitionReports}
    </div>
  `;
  document.querySelectorAll('[data-rem-close]').forEach((btn) => {
    btn.onclick = () => {
      app.closedReminderIds = Array.isArray(app.closedReminderIds) ? app.closedReminderIds : [];
      if (!app.closedReminderIds.includes(btn.dataset.remClose)) app.closedReminderIds.push(btn.dataset.remClose);
      renderDashboard();
    };
  });
  const clearBtn = document.getElementById('clear-competition-reports');
  if (clearBtn) {
    clearBtn.onclick = () => {
      app.competitionReports = [];
      renderDashboard();
      saveGame(false);
    };
  }
}

function createHorseCard(horse) {
  horse.illnesses = Array.isArray(horse.illnesses) ? horse.illnesses : [];
  horse.managed = horse.managed || { fed: false, vet: false, farrier: false, trained: false, shown: false };
  horse.stats = horse.stats || { dressage: {}, jumping: {} };
  horse.stats.dressage = horse.stats.dressage || {};
  horse.stats.jumping = horse.stats.jumping || {};
  horse.topWins = horse.topWins || { mareFilly: 0, breed: 0, overall: 0 };
  horse.showResults = Array.isArray(horse.showResults) ? horse.showResults : [];
  horse.soundnessYears = Number.isFinite(horse.soundnessYears) ? horse.soundnessYears : 0;
  horse.weightStatus = horse.weightStatus || 'Healthy Weight';
  horse.coi = Number.isFinite(horse.coi) ? horse.coi : 0;
  const tpl = document.getElementById('horseCardTemplate');
  const node = tpl?.content?.firstElementChild
    ? tpl.content.firstElementChild.cloneNode(true)
    : (() => {
      const article = document.createElement('article');
      article.className = 'horse-card';
      article.innerHTML = `<h3 class='horse-name'></h3><p class='subline'></p><p class='meta'></p><div class='grid two'><div><h4>Jump Training</h4><ul class='stats jump-stats'></ul></div><div><h4>Dressage Training</h4><ul class='stats dressage-stats'></ul></div></div><div class='grid two'><div class='results'></div><div class='manage'></div></div>`;
      return article;
    })();
  const activeIssue = (horse.illnesses || []).find((i) => i.active);
  const injuryLine = activeIssue ? ` • Injury: ${activeIssue.name}` : '';
  const revealAll = options.revealAll ?? horse.owner === 'Your Stable';
  const visible = visibleIllnesses(horse, revealAll);
  const hiddenCount = Math.max(0, (horse.illnesses || []).length - visible.length);
  const illnessLine = visible.length
    ? visible.map((i) => `${i.name}${i.active ? ` (${i.remaining} mo)` : ''}`).join(', ')
    : 'None';
  const illnessLineWithHidden = !revealAll && hiddenCount > 0 ? `${illnessLine} (+${hiddenCount} hidden)` : illnessLine;
  const titleLabel = formattedHorseTitles(horse);
  const autoOptions = autoTrainingOptionsForHorse(horse);
  const canAutoCare = horse.owner === 'Your Stable' && (app.currentBarn?.careStars || 3) > 3;
  const autoFocusOptions = [
    { value: '', label: 'None' },
    ...autoOptions
  ].map((option) => `<option value='${option.value}' ${horse.autoTrainingFocus === option.value ? 'selected' : ''}>${option.label}</option>`).join('');

  node.querySelector('.horse-name').textContent = horseDisplayName(horse);
  let titleEl = node.querySelector('.horse-title');
  if (!titleEl) {
    titleEl = document.createElement('p');
    titleEl.className = 'horse-title';
    node.querySelector('.horse-name').insertAdjacentElement('afterend', titleEl);
  }
  titleEl.textContent = titleLabel || '';
  const socks = horse.socks || 'None';
  const face = horse.faceMarking || 'Faint';
  const marking2 = horse.marking2 || 'None';
  node.querySelector('.subline').textContent = `${horse.height} | ${horse.coat} | ${horse.marking || 'None'} | ${marking2} | Socks (${socks}) | Face: ${face} | ${horse.age} | ${horse.gender} | ${horseLifeStage(horse)}`;
  node.querySelector('.meta').textContent = `${horse.breed} • Personality: ${horse.personality} • Behavior: ${horse.behavior || 0} • Mood: ${horse.mood} • Weight: ${horse.weightStatus} • Conformation: ${horse.conformation} • COI: ${horse.coi}% • Soundness: ${horse.soundnessYears.toFixed(1)} years est. • Worth: ${money(horseWorth(horse))}${horse.extraPotential ? ' • Extra potential' : ''}${injuryLine} • ${canCompeteUnderSaddle(horse) ? 'Under saddle eligible' : 'In-hand/registry only until age 3'}`;

  const dList = node.querySelector('.dressage-stats');
  Object.entries(horse.stats.dressage).forEach(([k, v]) => { dList.innerHTML += `<li>${k}: ${v}</li>`; });
  const jList = node.querySelector('.jump-stats');
  Object.entries(horse.stats.jumping).forEach(([k, v]) => { jList.innerHTML += `<li>${k}: ${v}</li>`; });

  const record = showRecordSummary(horse);
  const bondValue = Number.isFinite(horse.bond) ? horse.bond : 0;
  const bondLabel = bondLevelLabel(horse);
  const bondPercent = clamp(bondValue, 0, 100);
  node.querySelector('.results').innerHTML = `
    <h4>Competition Results</h4>
    <p>Total Points: ${horse.totalPoints} | Championships: ${horse.championships} | Reserves: ${horse.reserves}</p>
    <p>Lifetime Earnings: ${money(horse.earnings)}</p>
    <p class='small'>Illnesses: ${illnessLineWithHidden}</p>
    <p>Show record: ${record.total} (${record.first}-${record.second}-${record.third})</p>
    <p>${horse.gender === 'Stallion' ? 'Top Stallion/Colt' : 'Top Mare/Filly'}: ${horse.topWins.mareFilly} | Best of breed: ${horse.topWins.breed} | Overall best: ${horse.topWins.overall}</p>
    ${horse.showResults.length ? `<p class='small'>Latest: ${horse.showResults[horse.showResults.length - 1].discipline} ${horse.showResults[horse.showResults.length - 1].level} — #${horse.showResults[horse.showResults.length - 1].placing} (${horse.showResults[horse.showResults.length - 1].resultText || horse.showResults[horse.showResults.length - 1].score})</p>` : '<p class="small">No show entries yet.</p>'}
    <p class='small'>${disciplineLevelSummary(horse, 'jumping')} | ${disciplineLevelSummary(horse, 'dressage')} | ${disciplineLevelSummary(horse, 'eventing')} | ${disciplineLevelSummary(horse, 'hunter')}</p>
  `;

  node.querySelector('.manage').innerHTML = `
    <h4>Management</h4>
    <div class='inline'>
      <button data-action='feed'>Fed: ${horse.managed.fed ? 'Y' : 'N'}</button>
      <button data-action='vet'>Vet: ${horse.managed.vet ? 'Y' : 'N'}</button>
      <button data-action='farrier'>Farrier: ${horse.managed.farrier ? 'Y' : 'N'}</button>
      <button data-action='train'>Trained: ${horse.managed.trained ? 'Y' : 'N'}</button>
    </div>
    <label>Rename horse</label><input type='text' value='${horse.name}' />
    <button data-action='rename'>Save Name</button>
    <button data-action='retire-breeding'>${horse.retiredToBreeding ? 'Return to Competition' : 'Retire to Breeding'}</button>
    <button data-action='retire-forever'>Retire to Greener Pastures</button>
    <button data-action='list-sale'>List in Sale Barn ($)</button>
    <button data-action='npc-sell'>Sell to NPC (${money(horseWorth(horse))})</button>
    <button data-action='rehome'>Rehome for Free</button>
    <button data-action='hire-stablehand'>${app.stablehandHired ? 'Stablehand On Duty (Free)' : 'Hire Stablehand (Free)'}</button>
    <label>Notes</label><textarea rows='3' class='note-input'>${horse.notes}</textarea>
    <button data-action='save-notes'>Save Notes</button>
    <button data-action='toggle-notes'>${horse.showNotes ? 'Hide Notes' : 'Show Notes'}</button>
    ${horse.showNotes && horse.notes ? `<div class='box'><p class='small'>${horse.notes}</p></div>` : ''}
    <label>Feed Plan</label>
    <select class='feed-type'>${FEEDS.map((f) => `<option value='${f}'>${f}</option>`).join('')}</select>
    <label>Amount (grams)</label>
    <input type='number' class='feed-grams' min='50' max='250' value='150' />
    <button data-action='add-feed'>Add Feed</button>
    <button data-action='clear-feed'>Clear Feed Plan</button>
    ${horse.feedPlan.length ? `<div class='box'><p class='small'>${horse.feedPlan.map((f) => `${f.type} (${f.grams}g)`).join(', ')}</p></div>` : '<p class="small">No feed assigned.</p>'}
    <p class='small'>Preferred feed range: ${feedRangeBounds(horse)[0]}-${feedRangeBounds(horse)[1]}g (you don’t need to be exact, just within range).</p>
    <label>Controlability</label>
    <p class='small'>${horse.controlability || 0}%</p>
    <label>Quality Of Life</label>
    <p class='small'>${calculateHorseQualityOfLife(horse)}%</p>
    <label>Tack: Bridle</label><select class='tack-bridle'>${TACK.bridle.map((x) => `<option ${horse.tack?.bridle === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Bit</label><select class='tack-bit'>${TACK.bit.map((x) => `<option ${horse.tack?.bit === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Saddle</label><select class='tack-saddle'>${TACK.saddle.map((x) => `<option ${horse.tack?.saddle === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Saddle Pad</label><select class='tack-pad'>${TACK.pad.map((x) => `<option ${horse.tack?.pad === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Headwear</label><select class='tack-headwear'>${TACK.headwear.map((x) => `<option ${horse.tack?.headwear === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Body</label><select class='tack-body'>${TACK.body.map((x) => `<option ${horse.tack?.body === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <button data-action='save-tack'>Save Tack</button>
    <label>Turn-out assignment (hours)</label>
    <input type='number' class='turnout-hours' min='0.5' max='14' step='0.5' value='${horse.turnoutAssignmentHours || ''}' placeholder='0.5 - 14' />
    <p class='small'>Mood: ${horse.mood} • Weight: ${horse.weightStatus} • Training stamina: ${horse.trainingPreference} (${trainingStaminaRange(horse.trainingPreference)} sessions) • Turnout range: ${turnoutRange(horse.trainingPreference)} hrs</p>
    ${isPregnantMare(horse) ? `<p class='small'>Pregnancy: Confirmed (timeline hidden — use pH testing only).</p>` : ''}
    ${eligibleForPhTest(horse) ? `<button data-action='test-ph'>Test pH</button>${horse.lastPhReading ? `<p class='small'>Last pH reading: ${horse.lastPhReading}</p>` : ''}` : ''}
    ${horse.foalVitality && (horse.foalVitality.ageDays || 0) <= (horse.foalVitality.shownUntilDay || 180) ? `<p class='small'>Foal Vitality Score: ${horse.foalVitality.score} / 100${(horse.foalVitality.rareEvents || []).length ? ` • Rare: ${(horse.foalVitality.rareEvents || []).join(', ')}` : ''}</p>` : ''}
    <button data-action='save-turnout'>Save Turn-out</button>
    <details class='bond-box'>
      <summary>Bond</summary>
      <div class='box'>
        <p class='small'>Level: ${bondLabel} (${bondValue.toFixed(0)}%)</p>
        <div class='bond-meter'><span style='width:${bondPercent}%;'></span></div>
      </div>
    </details>
    <button data-action='toggle-trainer-notes'>${horse.showTrainerNotes ? 'Hide Trainer Notes' : 'Show Trainer Notes'}</button>
    ${horse.showTrainerNotes ? `<div class='box'>${horse.trainerNotes.length ? horse.trainerNotes.map((n) => `<p class='small'>${n}</p>`).join('') : '<p class="small">No trainer notes this month.</p>'}</div>` : ''}
    <label>Auto Training Focus (monthly)</label>
    <select class='auto-focus'>${autoFocusOptions}</select>
    <p class='small'>Auto training uses the preferred training amount (${horse.preferredTrainingSessions} sessions).</p>
    <button data-action='save-auto-focus'>Save Auto Training</button>
    ${canAutoCare ? `<button data-action='toggle-auto-stall'>Auto Stall Cleaning: ${horse.autoStallCleaning ? 'On' : 'Off'}</button><button data-action='toggle-auto-groom'>Auto Grooming: ${horse.autoGrooming ? 'On' : 'Off'}</button>` : ''}
    ${horse.autoTrainingFocus ? `<p class='small'>Auto training set to: ${horse.autoTrainingFocus}</p>` : '<p class="small">No auto training assigned.</p>'}
    ${horse.autoExerciseHours ? `<p class='small'>Exercise (retired/maxed): ${horse.autoExerciseHours} hour(s) on lunging/hot-walker.</p>` : ''}
    <button data-action='vet-notes'>${horse.showVetNotes ? 'Hide Vet Notes' : 'Show Vet Notes'}</button>
    ${horse.showVetNotes ? `<div class='box'>${horse.vetNotes.length ? horse.vetNotes.map((n) => `<p class='small'>${n.date}: ${n.text}</p>`).join('') : '<p class="small">No vet notes yet.</p>'}</div>` : ''}
    ${horse.registryInspection ? `<button data-action='inspection-details'>${horse.showInspectionDetails ? 'Hide Inspection Details' : 'Show Inspection Details'}</button>` : ''}
    ${horse.registryInspection && horse.showInspectionDetails ? `
      <div class='box'>
        <p class='small'>Inspection (${horse.registryInspection.result}) — Score ${horse.registryInspection.totalScore.toFixed(2)}</p>
        <p class='small'>Conformation: ${horse.registryInspection.conformation.toFixed(1)} | Condition: ${horse.registryInspection.condition.toFixed(1)} | Pedigree: ${horse.registryInspection.pedigree == null ? 'N/A' : horse.registryInspection.pedigree.toFixed(1)} | Potential: ${horse.registryInspection.potential.toFixed(1)}</p>
      </div>
    ` : ''}
    <button data-action='toggle-pedigree'>${horse.showPedigree ? 'Hide Pedigree' : 'Show Pedigree'}</button>
    ${horse.showPedigree ? (() => {
      const entries = pedigreeForHorse(horse);
      return `<div class='box pedigree-grid'>
        ${entries.map((entry) => {
          const stats = pedigreeStats(entry);
          const disciplineMax = stats
            ? `${disciplineLevelSummary(stats, 'jumping')} | ${disciplineLevelSummary(stats, 'dressage')} | ${disciplineLevelSummary(stats, 'eventing')} | ${disciplineLevelSummary(stats, 'hunter')}`
            : 'Unknown';
          const record = stats ? showRecordSummary(stats) : null;
          return `<div class='pedigree-entry'>
            <p class='small pedigree-relation'>${entry.relation}</p>
            <details ${entry.name !== 'Unknown' ? '' : ''}>
              <summary>${entry.name}</summary>
              <p class='small'>Breed: ${entry.breed} (${entry.percent})</p>
              <p class='small'>Coat: ${entry.coat}</p>
              <p class='small'>Jumping Stats: ${stats ? Object.entries(stats.stats.jumping).map(([k, v]) => `${k} ${v}`).join(', ') : 'Unknown'}</p>
              <p class='small'>Dressage Stats: ${stats ? Object.entries(stats.stats.dressage).map(([k, v]) => `${k} ${v}`).join(', ') : 'Unknown'}</p>
              <p class='small'>Personality: ${stats ? stats.personality : 'Unknown'}</p>
              <p class='small'>Behavior: ${stats ? stats.behavior : 'Unknown'}</p>
              <p class='small'>Conformation: ${stats ? stats.conformation : 'Unknown'}</p>
              <p class='small'>Worth: ${stats ? money(horseWorth(stats)) : 'Unknown'}</p>
              <p class='small'>Total Points: ${stats ? stats.totalPoints : 'Unknown'}</p>
              <p class='small'>Winnings: ${stats ? money(stats.earnings) : 'Unknown'}</p>
              <p class='small'>Lifetime Earnings: ${stats ? money(stats.earnings) : 'Unknown'}</p>
              <p class='small'>Show record: ${stats ? `${record.total} (${record.first}-${record.second}-${record.third})` : 'Unknown'}</p>
              <p class='small'>Discipline Max: ${disciplineMax}</p>
            </details>
          </div>`;
        }).join('')}
      </div>`;
    })() : ''}
    <button data-action='offspring-summary'>${horse.showOffspringSummary ? 'Hide Offspring Summary' : 'Show Offspring Summary'}</button>
    ${horse.showOffspringSummary ? (() => {
      const summary = offspringSummary(horse);
      return `<div class='box'>
        <p class='small'>Total Offsprings: ${summary.total}</p>
        <p class='small'>Active Offsprings: ${summary.active}</p>
        <p class='small'>Retired Offsprings: ${summary.retired}</p>
        <p class='small'>Sold Offsprings: ${summary.sold}</p>
      </div>`;
    })() : ''}
  `;

  node.querySelectorAll('[data-action]').forEach((btn) => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      if (action === 'rename') {
        const val = node.querySelector('input').value.trim();
        if (val) horse.name = val;
      }
      if (action === 'retire-breeding') {
        if (horse.retiredForever) {
          horse.retiredToBreeding = true;
        } else {
          horse.retiredToBreeding = !horse.retiredToBreeding;
        }
      }
      if (action === 'retire-forever') horse.retiredForever = true;
      if (action === 'list-sale') {
        const price = Number(prompt('Sale price?', String(horseWorth(horse))));
        if (price > 0) app.saleBarn.push({ ...horse, owner: 'Your Stable', price, saleId: uid() });
      }
      if (action === 'npc-sell') {
        app.money += horseWorth(horse);
        app.horses = app.horses.filter((h) => h.id !== horse.id);
        pushReport(`${horse.name} sold to NPC for ${money(horseWorth(horse))}.`);
      }
      if (action === 'rehome') {
        app.horses = app.horses.filter((h) => h.id !== horse.id);
        pushReport(`${horse.name} was rehomed for free and left your stable.`);
      }
      if (action === 'hire-stablehand') {
        app.stablehandHired = !app.stablehandHired;
        if (app.stablehandHired) {
          app.horses.forEach((h) => applyStablehandCare(h));
          pushReport('Stablehand hired for free. Feed is now adjusted automatically, injuries are treated, and care stays high.');
        } else {
          pushReport('Stablehand dismissed. Manual horse care is active again.');
        }
      }
      if (action === 'save-notes') {
        const text = node.querySelector('.note-input')?.value.trim() || '';
        horse.notes = text;
      }
      if (action === 'toggle-notes') horse.showNotes = !horse.showNotes;
      if (action === 'save-tack') {
        if (horse.leaseLocked) {
          alert('Leased horses use barn-managed tack and cannot be changed.');
          return;
        }
        horse.tack = horse.tack || {};
        horse.tack.bridle = node.querySelector('.tack-bridle')?.value || horse.tack.bridle;
        horse.tack.bit = node.querySelector('.tack-bit')?.value || horse.tack.bit;
        horse.tack.saddle = node.querySelector('.tack-saddle')?.value || horse.tack.saddle;
        horse.tack.pad = node.querySelector('.tack-pad')?.value || horse.tack.pad;
        horse.tack.headwear = node.querySelector('.tack-headwear')?.value || horse.tack.headwear;
        horse.tack.body = node.querySelector('.tack-body')?.value || horse.tack.body;
        pushReport(`Updated tack for ${horse.name}.`);
      }
      if (action === 'test-ph') {
        if (!eligibleForPhTest(horse)) {
          alert('pH test is only available for mares over 320 pregnancy days.');
          return;
        }
        const reading = phReadingForMare(horse);
        horse.lastPhReading = reading;
        vetNote(horse, `${horse.name} milk pH reading: ${reading}.`);
      }
      if (action === 'save-turnout') {
        if (horse.leaseLocked) {
          alert('Leased horses use barn-managed turnout and cannot be changed.');
          return;
        }
        const value = Number(node.querySelector('.turnout-hours')?.value);
        if (Number.isFinite(value)) horse.turnoutAssignmentHours = Math.max(0.5, Math.min(14, value));
      }
      if (action === 'toggle-trainer-notes') horse.showTrainerNotes = !horse.showTrainerNotes;
      if (action === 'add-feed') {
        if (horse.leaseLocked) {
          alert('Leased horses use barn-managed feed and cannot be changed.');
          return;
        }
        const type = node.querySelector('.feed-type')?.value;
        const grams = Number(node.querySelector('.feed-grams')?.value) || 150;
        if (type && grams >= 50 && grams <= 250) {
          horse.feedPlan.push({ type, grams });
        }
      }
      if (action === 'clear-feed') {
        if (horse.leaseLocked) {
          alert('Leased horses use barn-managed feed and cannot be changed.');
          return;
        }
        horse.feedPlan = [];
      }
      if (action === 'save-auto-focus') {
        horse.autoTrainingFocus = node.querySelector('.auto-focus')?.value || '';
      }
      if (action === 'toggle-auto-stall') horse.autoStallCleaning = !horse.autoStallCleaning;
      if (action === 'toggle-auto-groom') horse.autoGrooming = !horse.autoGrooming;
      if (action === 'vet-notes') horse.showVetNotes = !horse.showVetNotes;
      if (action === 'inspection-details') horse.showInspectionDetails = !horse.showInspectionDetails;
      if (action === 'offspring-summary') horse.showOffspringSummary = !horse.showOffspringSummary;
      if (action === 'toggle-pedigree') horse.showPedigree = !horse.showPedigree;
      if (['feed', 'vet', 'farrier', 'train'].includes(action)) {
        const key = action === 'train' ? 'trained' : action;
        horse.managed[key] = !horse.managed[key];
      }
      render();
    };
  });
  return node;
}

function horseProfileMarkup(horse) {
  const activeIssue = horse.illnesses?.find((i) => i.active);
  const injuryLine = activeIssue ? ` • Injury: ${activeIssue.name}` : '';
  const dressage = Object.entries(horse.stats.dressage).map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
  const jumping = Object.entries(horse.stats.jumping).map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
  const latest = horse.showResults?.length ? horse.showResults[horse.showResults.length - 1] : null;
  const inspection = horse.registryInspection
    ? `<p class='small'>Inspection: ${horse.registryInspection.result} (${horse.registryInspection.totalScore.toFixed(2)}) • Branding: ${horse.registryInspection.branding || 'None'} • Condition: ${horse.registryInspection.condition.toFixed(1)} • Pedigree: ${horse.registryInspection.pedigree == null ? 'N/A' : horse.registryInspection.pedigree.toFixed(1)}</p>`
    : '';
  const leaseLine = horse.isLeased && Number.isFinite(horse.leaseMonthsRemaining)
    ? `<p class='small'>Lease Time Remaining: ${horse.leaseMonthsRemaining}/${horse.leaseDurationMonths || horse.leaseMonthsRemaining} month(s) • Lease Cost: ${money(horse.leaseMonthlyCost || 0)}/month</p>`
    : '';
  const titles = formattedHorseTitles(horse);
  const titlesLine = titles ? `<p class='small'>Titles: ${titles}</p>` : '';
  const record = showRecordSummary(horse);
  const showRecordLine = `<p class='small'>Show record: ${record.total} (${record.first}-${record.second}-${record.third})</p>`;
  const revealAll = options.revealAll ?? horse.owner === 'Your Stable';
  const visible = visibleIllnesses(horse, revealAll);
  const hiddenCount = (horse.illnesses || []).length - visible.length;
  const illnessLine = visible.length
    ? visible.map((i) => `${i.name}${i.active ? ` (${i.remaining} mo)` : ''}`).join(', ')
    : 'None';
  const hiddenNote = !revealAll && hiddenCount > 0 ? ` (+${hiddenCount} hidden)` : '';
  return `
    <p class='small'>${horse.breed} • ${horse.age} • ${horse.gender} • Conformation: ${horse.conformation} • Behavior: ${horse.behavior || 0}${horse.extraPotential ? ' • Extra potential' : ''}${injuryLine}</p>
    ${titlesLine}
    <div class='grid two'>
      <div><h4>Jump Training</h4><ul class='stats'>${jumping}</ul></div>
      <div><h4>Dressage Training</h4><ul class='stats'>${dressage}</ul></div>
    </div>
    <p class='small'>Wins: Championships ${horse.championships}, Reserves ${horse.reserves}, Total Points ${horse.totalPoints}, Best of breed ${horse.topWins?.breed || 0}.</p>
    ${leaseLine}
    ${showRecordLine}
    ${latest ? `<p class='small'>Latest show: ${latest.discipline} ${latest.level} — #${latest.placing}</p>` : '<p class="small">No show record yet.</p>'}
    ${inspection}
  `;
}

function renderHorses() {
  const el = document.getElementById('horses');
  const playerHorses = app.horses.filter((h) => h.owner === 'Your Stable' || h.isLeased);
  const foals = playerHorses.filter((h) => h.age < 3);
  const retiredBreeding = playerHorses.filter((h) => h.retiredToBreeding && !h.retiredForever);
  const retired = playerHorses.filter((h) => h.retiredForever);
  const active = playerHorses.filter((h) => h.age >= 3 && !h.retiredToBreeding && !h.retiredForever);

  const allHorses = [...active, ...retiredBreeding, ...retired, ...foals];
  if (!app.selectedHorseId && allHorses.length) {
    app.selectedHorseId = allHorses[0].id;
  }

  const tableSection = (title, horses, open = false) => `
    <details class='horse-section' ${open ? 'open' : ''}>
      <summary>${title} (${horses.length})</summary>
      <div class='table-wrap'>
        <table class='horse-table'>
          <thead>
            <tr>
              <th>Horse Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Breed</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            ${horses.map((h) => {
              const title = h.registryInspection?.title ? `${h.registryInspection.title} Champion` : '';
              const selectedClass = h.id === app.selectedHorseId ? ' class="selected"' : '';
              return `<tr data-horse-id='${h.id}'${selectedClass}>
                <td>${horseDisplayName(h)}</td>
                <td>${h.gender}</td>
                <td>${h.age}</td>
                <td>${h.breed}</td>
                <td>${title || '-'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </details>
  `;

  el.innerHTML = `
    <h2>Your Horses</h2>
    ${tableSection('Active Horses', active, true)}
    ${tableSection('Retired for Breeding', retiredBreeding)}
    ${tableSection('Retired', retired)}
    ${tableSection('Foals & Young Horses', foals)}
    <div id='horse-profile' class='horse-profile'></div>
  `;

  const selectedHorse = playerHorses.find((h) => h.id === app.selectedHorseId);
  const profileEl = el.querySelector('#horse-profile');
  if (!profileEl) return;
  profileEl.innerHTML = '';
  if (selectedHorse) {
    profileEl.append(createHorseCard(selectedHorse));
  }

  el.querySelectorAll('tr[data-horse-id]').forEach((row) => {
    row.onclick = () => {
      app.selectedHorseId = row.dataset.horseId;
      renderHorses();
    };
  });
}

function renderMarket() {
  app.marketSelections = app.marketSelections || {};
  const kinds = [
    { key: 'untrained', cost: 2000 },
    { key: 'trained', cost: 10000 },
    { key: 'fully', cost: 75000 }
  ];
  document.getElementById('market').innerHTML = `
    <h2>Prospects Pasture (NPC)</h2>
    <div class='cards'>${kinds.map((k) => `
      <div class='box'>
        <h3>${cap(k.key)} Horse</h3>
        <p>Cost: ${money(k.cost)}</p><p class='small'>${k.key === 'untrained' ? 'Training points: 0-10' : k.key === 'trained' ? 'Training points: 30-60' : 'Training points: 85-95'}</p>
        <label>Breed</label>
        <select id='breed-${k.key}'>${BREEDS.map((b) => `<option ${(app.marketSelections[k.key]?.breed || BREEDS[0]) === b ? 'selected' : ''}>${b}</option>`).join('')}</select>
        <label>Gender</label>
        <select id='gender-${k.key}'>${['Mare','Stallion','Gelding'].map((g) => `<option ${(app.marketSelections[k.key]?.gender || 'Mare') === g ? 'selected' : ''}>${g}</option>`).join('')}</select>
        <button id='buy-${k.key}'>Buy</button>
      </div>
    `).join('')}</div>
  `;

  kinds.forEach((k) => {
    const breedEl = document.getElementById(`breed-${k.key}`);
    const genderEl = document.getElementById(`gender-${k.key}`);
    const saveSelection = () => {
      app.marketSelections[k.key] = { breed: breedEl.value, gender: genderEl.value };
    };
    breedEl.onchange = saveSelection;
    genderEl.onchange = saveSelection;
    document.getElementById(`buy-${k.key}`).onclick = () => {
      saveSelection();
      if (app.money < k.cost) return alert('Not enough money');
      app.money -= k.cost;
      const horse = baseHorse(k.key, 'npc');
      horse.breed = document.getElementById(`breed-${k.key}`).value;
      horse.gender = document.getElementById(`gender-${k.key}`).value;
      horse.height = heightFromBreed(horse.breed);
      applyBreedTraits(horse);
      horse.marking = randomMarking(horse.breed, { salesMarketBoost: true });
      app.horses.push(horse);
      pushReport(`Bought ${horse.name} from Prospects Pasture.`);
      render();
    };
  });

}

function renderSales() {
  const el = document.getElementById('sales');
  el.innerHTML = `
    <h2>Sales Barn</h2>
    <div class='cards' id='player-sales'></div>
    <h2>NPC Sales Ads</h2>
    <div class='cards' id='npc-sales'></div>
    <h2>NPC Stud Ads</h2>
    <div class='cards' id='npc-studs'></div>
  `;
  const cards = el.querySelector('#player-sales');
  const npcCards = el.querySelector('#npc-sales');
  const studCards = el.querySelector('#npc-studs');

  app.saleBarn.forEach((h, idx) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${horseDisplayName(h)}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>${money(h.price)}</p><p class='small'>Seller: ${h.owner}</p><details><summary>View Profile</summary>${horseProfileMarkup(h)}</details><button>Buy Horse</button>`;
    b.querySelector('button').onclick = () => {
      if (app.money < h.price) return alert('Not enough money');
      app.money -= h.price;
      app.horses.push({ ...h, owner: 'Your Stable' });
      app.saleBarn.splice(idx, 1);
      pushReport(`Bought ${h.name} from sales barn for ${money(h.price)}.`);
      render();
    };
    cards.append(b);
  });

  app.npcSales.forEach((h) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${horseDisplayName(h)}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>${money(h.price)}</p><p class='small'>Seller: ${h.owner}</p><details><summary>View Profile</summary>${horseProfileMarkup(h)}</details><button data-sale='${h.saleId}'>Buy Horse</button>`;
    b.querySelector('button').onclick = () => {
      if (app.money < h.price) return alert('Not enough money');
      app.money -= h.price;
      app.horses.push({ ...h, owner: 'Your Stable' });
      app.npcSales = app.npcSales.filter((s) => s.saleId !== h.saleId);
      pushReport(`Bought ${h.name} from NPC sales for ${money(h.price)}.`);
      render();
    };
    npcCards.append(b);
  });

  app.npcStuds.forEach((h) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${horseDisplayName(h)}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>Stud Fee: ${money(h.fee)}</p><p class='small'>Stud: ${h.owner}</p><details><summary>View Profile</summary>${horseProfileMarkup(h)}</details><button data-stud='${h.studId}'>Purchase Straw</button>`;
    b.querySelector('button').onclick = () => {
      if (!tryCharge(h.fee)) return;
      app.semenStraws.push({ id: uid(), stallionId: h.id, stallionName: h.name });
      pushReport(`Purchased a straw from ${h.name} for ${money(h.fee)}.`);
      render();
    };
    studCards.append(b);
  });
}

function renderStud() {
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  document.getElementById('stud').innerHTML = `
    <h2>Stud Barn</h2>
    <div class='box'>
      <p>Collect semen and use in reproduction from the vet panel.</p>
      <div class='cards'>
        ${stallions.map((h) => `<div class='box'><h3>${horseDisplayName(h)}</h3><p>Cover $900 | Straw Collection $500</p><button data-id='${h.id}'>Collect Semen</button></div>`).join('') || '<p>No stallions available.</p>'}
      </div>
    </div>
  `;

  document.querySelectorAll('#stud button[data-id]').forEach((btn) => {
    btn.onclick = () => {
      const stallion = app.horses.find((h) => h.id === btn.dataset.id);
      if (!stallion || app.money < 500) return alert('Need stallion and $500.');
      app.money -= 500;
      const count = rnd(1, 6);
      for (let i = 0; i < count; i++) app.semenStraws.push({ id: uid(), stallionId: stallion.id, stallionName: stallion.name });
      pushReport(`Collected ${count} semen straws from ${stallion.name}.`);
      render();
    };
  });
}

function trainingPerformanceDelta(horse) {
  const preferred = horse.preferredTrainingSessions || 25;
  const sessions = Number.isFinite(horse.lastTrainingSessions) ? horse.lastTrainingSessions : horse.trainingSessionsThisMonth || 0;
  if (sessions > preferred) return -2;
  if (sessions < Math.max(1, Math.floor(preferred * 0.4))) return -2;
  return 2;
}

function turnoutPerformanceDelta(horse) {
  if (horse.lastTurnoutIssue === 'low') return -2;
  if (horse.lastTurnoutIssue === 'high') return -1;
  return 1;
}

function competitionFieldSize() {
  return rnd(8, 20);
}

function competitionMemoryPenalty(horse, discipline) {
  const memories = Array.isArray(horse.competitionMemories) ? horse.competitionMemories : [];
  if (!memories.length) return 0;
  const relevant = memories.filter((m) => m.discipline === discipline).slice(-3);
  return relevant.reduce((sum, m) => sum + (m.penalty || 0), 0);
}

function competitionInteractionPhases(discipline) {
  if (discipline === 'dressage') return ['center line', 'transition sequence', 'lateral work', 'final halt'];
  if (discipline === 'eventing') return ['dressage phase', 'cross-country phase', 'showjumping phase'];
  if (discipline === 'hunter') return ['first line', 'bending line', 'single fence', 'hand gallop'];
  return ['approach to fence 1', 'mid-course line', 'technical turn', 'final fence'];
}

function simulateCompetitionRide(horse, discipline, level) {
  const confidenceField = discipline === 'dressage' ? 'confidenceFlat' : 'confidenceJump';
  const baseSkill = effectiveDisciplineSkill(horse, discipline);
  const moodMod = moodOutcomeModifier(horse.mood);
  const personalityMod = personalityOutcomeModifier(horse.personality);
  const bondMod = Math.round(((horse.bond || 0) - 45) * 0.2);
  const qualityMod = Math.round((calculateHorseQualityOfLife(horse) - 55) * 0.2);
  const memoryPenalty = competitionMemoryPenalty(horse, discipline);
  const phases = competitionInteractionPhases(discipline);
  const log = [];
  let modifierTotal = 0;
  phases.forEach((phase) => {
    const event = rnd(1, 100) <= 45 ? pick(COMPETITION_RANDOM_EVENTS) : null;
    const randomMod = event ? event.mod : rnd(-5, 8);
    const successChance = clamp(Math.round((baseSkill * 0.45) + (moodMod * 2.2) + (personalityMod * 1.6) + bondMod + qualityMod - memoryPenalty + randomMod + ((horse[confidenceField] || 50) - 50) * 0.45), 8, 92);
    const partialChance = clamp(100 - successChance - rnd(10, 25), 10, 70);
    const failChance = Math.max(5, 100 - successChance - partialChance);
    const roll = rnd(1, 100);
    const outcome = roll <= successChance ? 'success' : roll <= successChance + partialChance ? 'partial' : 'fail';
    const stepMod = outcome === 'success' ? rnd(2, 6) : outcome === 'partial' ? rnd(-2, 2) : rnd(-8, -3);
    modifierTotal += stepMod;
    log.push({
      phase,
      outcome,
      chances: { success: successChance, partial: partialChance, fail: failChance },
      eventText: event ? event.text : 'No major event, just normal pressure and adjustment.'
    });
  });
  const memory = {
    date: dateLabel(),
    discipline,
    level,
    penalty: modifierTotal < -5 ? rnd(1, 3) : 0,
    note: modifierTotal < -5 ? 'Tense or mistake-heavy round remembered.' : 'Constructive competition memory.'
  };
  horse.competitionMemories = Array.isArray(horse.competitionMemories) ? horse.competitionMemories : [];
  horse.competitionMemories.push(memory);
  horse.competitionMemories = horse.competitionMemories.slice(-18);
  return {
    controls: COMPETITION_CONTROLS,
    modifier: clamp(modifierTotal, -18, 14),
    phases: log,
    memoryPenalty
  };
}

function competitionJumpCount(discipline, level) {
  if (discipline === 'jumping') {
    const height = Number(level);
    if (!Number.isFinite(height)) return rnd(6, 12);
    return height <= 1.1 ? rnd(6, 9) : rnd(10, 23);
  }
  if (discipline === 'dressage') return rnd(6, 15);
  if (discipline === 'eventing') return rnd(10, 20);
  return rnd(6, 12);
}

function formatHighlight(template, maxCount) {
  if (!template) return '';
  const marker = maxCount ? rnd(1, maxCount) : rnd(1, 10);
  return template.replace('#', marker);
}

function pickHighlight(list, maxCount) {
  if (!list?.length) return '';
  return formatHighlight(pick(list), maxCount);
}

function buildHighlights(discipline, details) {
  const maxCount = details.jumpCount || 10;
  const lines = [];
  if (discipline === 'jumping') {
    if (details.eliminated) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.eliminated, maxCount));
    if (details.refusals > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.refusals, maxCount));
    for (let i = 0; i < details.rails; i += 1) {
      lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.faults, maxCount));
      if (lines.length >= 3) break;
    }
    if (details.overSeconds > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.time, maxCount));
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.positive, maxCount));
  } else if (discipline === 'dressage') {
    const pct = details.pct || 0;
    const bucket = pct >= 80 ? 'positive' : pct >= 70 ? 'neutral' : 'negative';
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.dressage[bucket], maxCount));
  } else if (discipline === 'eventing') {
    if (details.eliminated) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.eliminated, maxCount));
    for (let i = 0; i < details.rails; i += 1) {
      lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.rails, maxCount));
      if (lines.length >= 2) break;
    }
    if (details.refusals > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.refusals, maxCount));
    if (details.overSeconds > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.time, maxCount));
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.positive, maxCount));
  } else if (discipline === 'hunter') {
    for (let i = 0; i < details.faults; i += 1) {
      lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.hunter.faults, maxCount));
      if (lines.length >= 2) break;
    }
    if (details.faults > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.hunter.rhythm, maxCount));
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.hunter.positive, maxCount));
  }
  return lines.filter(Boolean).slice(0, 5);
}

function selectCompetitionComment(score) {
  if (score >= 85) return pick(COMPETITION_COMMENTS.strong);
  if (score >= 70) return pick(COMPETITION_COMMENTS.mixed);
  return pick(COMPETITION_COMMENTS.management);
}

function selectCompetitionSuggestion(horse) {
  if (['Underweight', 'Overweight', 'Fleshy', 'Very Underweight'].includes(horse.weightStatus)) return pick(COMPETITION_SUGGESTIONS.feed);
  if (horse.lastTurnoutIssue) return pick(COMPETITION_SUGGESTIONS.turnout);
  if (horse.lastTrainingIssue) return pick(COMPETITION_SUGGESTIONS.training);
  return pick(COMPETITION_SUGGESTIONS.health);
}

function calculateCompetitionResult(horse, discipline, level, interaction = null) {
  const [minReq, maxReq] = requiredSkillBand(discipline, level);
  const skill = effectiveDisciplineSkill(horse, discipline);
  const skillBandBoost = ((skill - minReq) / Math.max(1, maxReq - minReq)) * 18;
  const temperament = personalityProfile(horse.personality);
  const bondMod = bondModifiers(horse);
  const conformationBoost = (CONFORMATION_MULT[horse.conformation] - 1) * 12;
  const behaviorBoost = Math.min(6, (horse.behavior || 0) * 0.3);
  const moodBoost = moodPerformanceDelta(horse.mood) + Math.round(bondMod.moodBoost * 4);
  const weightBoost = weightPerformanceDelta(horse.weightStatus);
  const feedBoost = horse.competitionBoost || 0;
  const trainingBoost = trainingPerformanceDelta(horse);
  const turnoutBoost = turnoutPerformanceDelta(horse);
  const interactionBoost = interaction?.modifier || 0;
  const quality = calculateHorseQualityOfLife(horse);
  const lowBondAndCare = (horse.bond || 0) < 0 && quality < 45;
  const baseCompetitionPercent = lowBondAndCare ? rnd(15, 25) : rnd(25, 50);
  const baseScore = clamp(Math.round(baseCompetitionPercent + skillBandBoost + conformationBoost + behaviorBoost + moodBoost + weightBoost + feedBoost + trainingBoost + turnoutBoost + temperament.showDelta + interactionBoost + rnd(-6, 6)), 0, 100);
  const fieldSize = competitionFieldSize();
  let score = baseScore;
  let resultText = `${baseScore}`;
  let penaltiesText = '';
  let timeScoreText = '';
  let eliminated = false;
  let rails = 0;
  let refusals = 0;
  let overSeconds = 0;
  let faults = 0;
  let pct = 0;
  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  const jumpCount = competitionJumpCount(discipline, level);
  const tack = horse.tack || {};
  const hotBlooded = horse.personality === 'Energetic' || horse.personality === 'Spooky' || horse.mood === 'Overly-Active';
  const rpgRoundStats = interaction?.roundStats && typeof interaction.roundStats === 'object' ? interaction.roundStats : null;
  const hotBloodedPenalty = horse.personality === 'Hot-Blooded' && rnd(1, 100) <= 35;
  const excitablePenalty = horse.personality === 'Excitable' && rnd(1, 100) <= 25;
  let tackPenaltyBias = 0;
  let tackRefusalBias = 0;
  if (tack.headwear === 'Ear-Bonnet') {
    tackPenaltyBias -= 1;
    tackRefusalBias -= 2;
    if (horse.personality === 'Spooky' || horse.personality === 'Energetic') tackRefusalBias -= 2;
  }
  if (tack.headwear === 'Race Mask') {
    tackRefusalBias -= horse.personality === 'Unfocused' || horse.personality === 'Spooky' ? 3 : 1;
    if (horse.personality === 'Unfocused' || horse.personality === 'Spooky') tackPenaltyBias -= 1;
  }
  if (tack.body === 'Martingal' && ['jumping', 'eventing', 'hunter'].includes(discipline)) {
    tackPenaltyBias -= 1;
    tackRefusalBias -= 2;
  }
  if (tack.body === 'Draw Reins' && !hotBlooded) {
    tackPenaltyBias += 3;
    tackRefusalBias += 6;
  }

  if (discipline === 'jumping') {
    const railBias = Math.max(0, 4 - Math.floor((jump.Striding + jump.Structure + jump.Power) / 95));
    rails = clamp(rnd(0, railBias + 1) + Math.max(0, temperament.penaltyBias + bondMod.penaltyBias + tackPenaltyBias) + (hotBloodedPenalty ? 2 : 0) + (excitablePenalty ? 1 : 0), 0, 8);
    const refusalChance = clamp(25 - Math.floor(jump.Confidence / 4) + temperament.refusalBias + bondMod.refusalBias + tackRefusalBias - Math.floor(interactionBoost / 3), 5, 60);
    refusals = rnd(1, 100) <= refusalChance ? (rnd(1, 100) <= 35 ? 2 : 1) : 0;
    const fall = rnd(1, 100) <= Math.max(2, temperament.fallBias + bondMod.fallBias + Math.floor((minReq - skill) / 8));
    const timeAllowed = Math.max(48, 70 - Math.floor(jump.Speed / 4) + Math.floor(jumpCount / 3));
    overSeconds = Math.max(0, rnd(0, 6) - Math.floor(jump.Speed / 20) + Math.max(0, weightBoost < 0 ? 1 : 0));
    if (rpgRoundStats) {
      rails = Math.max(0, Math.round((rpgRoundStats.faults || 0) / 4));
      refusals = Math.max(0, rpgRoundStats.refusals || 0);
      faults = Math.max(0, rpgRoundStats.faults || 0) + overSeconds;
      eliminated = rpgRoundStats.eliminated === true;
      if (eliminated) {
        score = 0;
        penaltiesText = 'Eliminated';
        timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
        resultText = penaltiesText;
      } else {
        score = clamp(baseScore - faults * 1.5, 0, 100);
        penaltiesText = faults === 0 ? 'Clear Round' : `${faults} faults`;
        timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
        resultText = `${penaltiesText} | ${timeScoreText}`;
      }
    } else if (fall || refusals >= 2) {
      eliminated = true;
      score = 0;
      penaltiesText = 'Eliminated';
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = penaltiesText;
    } else {
      faults = rails * 4 + refusals * 4 + overSeconds;
      score = clamp(baseScore - faults * 1.5, 0, 100);
      penaltiesText = faults === 0 ? 'Clear Round' : `${faults} faults`;
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = `${penaltiesText} | ${timeScoreText}`;
    }
  } else if (discipline === 'dressage') {
    const basePct = clamp((baseScore * 0.6 + 34) + rnd(-2, 2), 45, 100);
    const dressPenalty = rpgRoundStats ? Math.max(0, rpgRoundStats.faults || 0) : 0;
    pct = clamp(basePct - dressPenalty * 0.9, 40, 100);
    score = pct;
    if (rpgRoundStats?.eliminated) {
      eliminated = true;
      score = 0;
      penaltiesText = 'Eliminated';
      timeScoreText = 'Eliminated';
      resultText = penaltiesText;
    } else {
      penaltiesText = dressPenalty <= 0 ? `${pct.toFixed(2)}% (Clear Test)` : `${pct.toFixed(2)}% (${dressPenalty} penalty points)`;
      timeScoreText = `${pct.toFixed(2)}%`;
      resultText = penaltiesText;
    }
  } else if (discipline === 'eventing') {
    rails = clamp(rnd(0, 2 + Math.max(0, temperament.penaltyBias + bondMod.penaltyBias + tackPenaltyBias)) + (hotBloodedPenalty ? 2 : 0) + (excitablePenalty ? 1 : 0), 0, 6);
    const refusalChance = clamp(20 - Math.floor(jump.Confidence / 5) + temperament.refusalBias + bondMod.refusalBias + tackRefusalBias - Math.floor(interactionBoost / 3), 5, 55);
    refusals = rnd(1, 100) <= refusalChance ? (rnd(1, 100) <= 30 ? 2 : 1) : 0;
    const fall = rnd(1, 100) <= Math.max(2, temperament.fallBias + bondMod.fallBias + Math.floor((minReq - skill) / 10));
    const timeAllowed = Math.max(250, 320 - Math.floor((jump.Speed + jump.Confidence) / 2));
    overSeconds = Math.max(0, rnd(0, 20) - Math.floor(jump.Speed / 4));
    if (rpgRoundStats) {
      rails = Math.max(0, Math.round((rpgRoundStats.faults || 0) / 4));
      refusals = Math.max(0, rpgRoundStats.refusals || 0);
      const penalties = Math.max(0, rpgRoundStats.faults || 0) + overSeconds * 0.4;
      eliminated = rpgRoundStats.eliminated === true;
      if (eliminated) {
        score = 0;
        penaltiesText = 'Eliminated';
        timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
        resultText = penaltiesText;
      } else {
        score = clamp(baseScore - penalties * 0.6, 0, 100);
        penaltiesText = penalties <= 0.01 ? 'Clear Round' : `${penalties.toFixed(1)} penalties`;
        timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
        resultText = penaltiesText;
      }
    } else if (fall || refusals >= 3) {
      eliminated = true;
      score = 0;
      penaltiesText = 'Eliminated';
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = penaltiesText;
    } else {
      const penalties = rails * 4 + refusals * 20 + overSeconds * 0.4;
      score = clamp(baseScore - penalties * 0.6, 0, 100);
      penaltiesText = penalties <= 0.01 ? 'Clear Round' : `${penalties.toFixed(1)} penalties`;
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = penaltiesText;
    }
  } else if (discipline === 'hunter') {
    faults = rpgRoundStats ? Math.max(0, rpgRoundStats.faults || 0) : clamp(rnd(0, 5 + Math.max(0, temperament.penaltyBias + bondMod.penaltyBias)) - Math.floor((dress.Flowiness + dress.Balance + jump.Striding + jump.Structure) / 90) + (hotBloodedPenalty ? 3 : 0) + (excitablePenalty ? 1 : 0), 0, 12);
    eliminated = rpgRoundStats ? rpgRoundStats.eliminated === true : false;
    if (eliminated) {
      score = 0;
      penaltiesText = 'Eliminated';
      timeScoreText = 'Eliminated';
      resultText = penaltiesText;
    } else {
      score = clamp(baseScore - faults * 1.4, 0, 100);
      penaltiesText = faults === 0 ? 'Clear Round' : `${faults} faults`;
      timeScoreText = `Score ${score.toFixed(1)}`;
      resultText = penaltiesText;
    }
  }

  const placingBase = Math.ceil(((100 - score) / 100) * fieldSize);
  const placing = clamp(placingBase + rnd(0, 2), 1, fieldSize);
  const idx = levelIndex(discipline, level);
  const prize = Math.max(120, Math.round((3000 - placing * 130 + idx * 260) * (placing <= 3 ? 1.4 : 1)));
  const highlights = buildHighlights(discipline, {
    jumpCount,
    eliminated,
    rails,
    refusals,
    overSeconds,
    faults,
    pct
  });
  const comment = selectCompetitionComment(score);
  const suggestion = selectCompetitionSuggestion(horse);

  return {
    score,
    placing: eliminated ? fieldSize : placing,
    prize: eliminated ? 0 : prize,
    resultText,
    penaltiesText,
    timeScoreText,
    fieldSize,
    highlights,
    comment,
    suggestion,
    interactionBoost
  };
}


function trainingModeLabel() {
  return app.settings?.trainingMode === 'normal' ? 'Normal (spam click)' : 'RPG';
}

function competitionModeLabel() {
  return app.settings?.competitionMode === 'normal' ? 'Normal (spam click)' : 'RPG';
}

function applyNormalTrainingSession(horse, discipline, exercise) {
  const gain = rnd(1, 4);
  const confidenceGain = rnd(0, 2);
  if (discipline === 'dressage') {
    horse.stats.dressage[exercise] = clampSkill(horse, discipline, (horse.stats.dressage[exercise] || 0) + gain);
  } else if (discipline === 'jumping' || discipline === 'hunter') {
    horse.stats.jumping[exercise] = clampSkill(horse, discipline, (horse.stats.jumping[exercise] || 0) + gain);
  } else {
    if (horse.stats.dressage[exercise] != null) horse.stats.dressage[exercise] = clampSkill(horse, discipline, horse.stats.dressage[exercise] + gain);
    if (horse.stats.jumping[exercise] != null) horse.stats.jumping[exercise] = clampSkill(horse, discipline, horse.stats.jumping[exercise] + gain);
  }
  const confidenceField = discipline === 'dressage' ? 'confidenceFlat' : 'confidenceJump';
  horse[confidenceField] = clamp((horse[confidenceField] || 50) + confidenceGain, 0, 100);
  pushReport(`${horse.name} completed normal training in ${cap(discipline)} (${exercise}) and gained +${gain} skill.`);
}

function competitionWarmupReadinessBonus(session) {
  const st = session.warmupState || { tension: 50, focus: 50, confidence: 50, energy: 50, timing: 50 };
  const quality = Math.round((st.focus + st.confidence + st.energy + st.timing - st.tension) / 4);
  if (quality >= 45) return 10;
  if (quality <= 15) return -12;
  return 0;
}

function competitionPromptForStep(session) {
  const step = session.steps[session.stepIndex];
  if (!step) return null;
  if (step.stage === 'course_walk') {
    const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : (step.variantIndex % COMPETITION_COURSE_WALK_VARIANTS.length);
    return COMPETITION_COURSE_WALK_VARIANTS[promptIndex % COMPETITION_COURSE_WALK_VARIANTS.length];
  }
  if (step.stage === 'warm_up') {
    if (step.warmupSource === 'universal') {
      const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : (step.variantIndex % COMPETITION_WARMUP_UNIVERSAL.length);
      return COMPETITION_WARMUP_UNIVERSAL[promptIndex % COMPETITION_WARMUP_UNIVERSAL.length];
    }
    const set = COMPETITION_WARMUP_VARIANTS[session.discipline] || [];
    const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : step.variantIndex;
    return set[promptIndex % Math.max(1, set.length)] || COMPETITION_WARMUP_UNIVERSAL[0];
  }
  if (step.stage === 'main_round' && session.discipline === 'eventing') {
    const phase = String(step.phase || '').toLowerCase();
    if (phase.includes('dressage')) {
      const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : (step.phaseVariantIndex || 0);
      return COMPETITION_RPG_VARIANTS.dressage[promptIndex % COMPETITION_RPG_VARIANTS.dressage.length];
    }
    if (phase.includes('cross-country')) {
      const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : (step.phaseVariantIndex || 0);
      return COMPETITION_RPG_VARIANTS.eventing[promptIndex % COMPETITION_RPG_VARIANTS.eventing.length];
    }
    const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : (step.phaseVariantIndex || 0);
    return COMPETITION_RPG_VARIANTS.jumping[promptIndex % COMPETITION_RPG_VARIANTS.jumping.length];
  }
  const set = COMPETITION_RPG_VARIANTS[session.discipline] || COMPETITION_RPG_VARIANTS.jumping;
  const promptIndex = Number.isInteger(step.promptIndex) ? step.promptIndex : step.variantIndex;
  return set[promptIndex % set.length];
}

function competitionJumpTypesForDiscipline(discipline) {
  if (discipline === 'dressage') return ['Centerline', 'Transition', 'Lateral movement', 'Final halt'];
  if (discipline === 'hunter') return ['Hunter vertical', 'Outside line fence', 'Bending line fence', 'Final hunter fence'];
  if (discipline === 'eventing') return ['Dressage marker', 'Cross-country question', 'Stadium vertical', 'Combination'];
  return ['Vertical', 'Oxer', 'Liverpool', 'Triple bar', 'Combination', 'Wall', 'Plank', 'Water tray', 'Skinny fence'];
}

function buildCompetitionRpgSession(horse, discipline, level) {
  const warmupCount = 6;
  const jumpTypes = competitionJumpTypesForDiscipline(discipline);
  const steps = [];
  if (discipline !== 'dressage') {
    const walkOrder = shuffledIndices(COMPETITION_COURSE_WALK_VARIANTS.length).slice(0, 5);
    walkOrder.forEach((promptIndex, i) => {
      steps.push({ stage: 'course_walk', variantIndex: i, promptIndex, phase: 'course walk', randomBias: rnd(-6, 6) });
    });
  }

  const disciplineWarmup = COMPETITION_WARMUP_VARIANTS[discipline] || [];
  const universalCount = Math.min(3, warmupCount, COMPETITION_WARMUP_UNIVERSAL.length);
  const disciplineCount = Math.max(0, warmupCount - universalCount);
  const universalOrder = shuffledIndices(COMPETITION_WARMUP_UNIVERSAL.length).slice(0, universalCount);
  const disciplineOrder = shuffledIndices(disciplineWarmup.length).slice(0, disciplineCount);
  universalOrder.forEach((promptIndex, i) => {
    steps.push({ stage: 'warm_up', variantIndex: i, warmupSource: 'universal', promptIndex, phase: 'warm-up', randomBias: rnd(-6, 6) });
  });
  disciplineOrder.forEach((promptIndex, i) => {
    steps.push({ stage: 'warm_up', variantIndex: universalCount + i, warmupSource: 'discipline', promptIndex, phase: 'warm-up', randomBias: rnd(-6, 6) });
  });

  if (discipline === 'eventing') {
    const eventingPlan = [
      { phase: 'dressage phase', source: 'dressage' },
      { phase: 'cross-country phase', source: 'eventing' },
      { phase: 'showjumping phase', source: 'jumping' }
    ];
    let jumpNo = 1;
    eventingPlan.forEach((part) => {
      const list = COMPETITION_RPG_VARIANTS[part.source] || COMPETITION_RPG_VARIANTS.jumping;
      const promptOrder = shuffledIndices(list.length).slice(0, 5);
      for (let i = 0; i < 5; i += 1) {
        const promptIndex = promptOrder[i % promptOrder.length] || 0;
        const prompt = list[promptIndex] || {};
        steps.push({
          stage: 'main_round',
          variantIndex: i,
          phaseVariantIndex: i,
          promptIndex,
          phase: part.phase,
          jumpNumber: jumpNo,
          jumpType: prompt.title || pick(jumpTypes),
          randomBias: rnd(-8, 8)
        });
        jumpNo += 1;
      }
    });
  } else {
    const mainCount = discipline === 'jumping' ? 10 : 8;
    const phases = competitionInteractionPhases(discipline);
    const disciplineSet = COMPETITION_RPG_VARIANTS[discipline] || COMPETITION_RPG_VARIANTS.jumping;
    const promptOrder = shuffledIndices(disciplineSet.length);
    for (let i = 0; i < mainCount; i += 1) {
      steps.push({
        stage: 'main_round',
        variantIndex: i,
        promptIndex: promptOrder[i % promptOrder.length],
        phase: phases[i % phases.length],
        jumpNumber: i + 1,
        jumpType: pick(jumpTypes),
        randomBias: rnd(-8, 8)
      });
    }
  }

  return {
    horseId: horse.id,
    discipline,
    level,
    stepIndex: 0,
    steps,
    outcomes: [],
    modifier: 0,
    refusalCount: 0,
    eliminated: false,
    awaitingAdvance: false,
    feedback: '',
    warmupState: { tension: 50, focus: 50, confidence: 50, energy: 50, timing: 50 },
    readinessBonus: 0,
    currentStage: steps[0]?.stage || 'warm_up',
    horseChanceBias: rnd(-5, 5),
    roundStats: { faults: 0, refusals: 0, clearJumps: 0, majorFaults: 0, eliminated: false, eliminationReason: '' }
  };
}

function normalizeCompetitionRpgSession(session) {
  if (!session || typeof session !== 'object') return null;
  const discipline = typeof session.discipline === 'string' && SHOW_LEVELS[session.discipline] ? session.discipline : 'jumping';
  const level = typeof session.level === 'string' ? session.level : SHOW_LEVELS[discipline][0];
  const base = buildCompetitionRpgSession({ id: session.horseId || '' }, discipline, level);
  const normalized = { ...base, ...session };
  normalized.discipline = discipline;
  normalized.level = level;
  normalized.horseId = session.horseId || '';
  normalized.stepIndex = Number.isFinite(session.stepIndex) ? Math.max(0, session.stepIndex) : 0;
  normalized.steps = Array.isArray(session.steps) && session.steps.length ? session.steps : base.steps;
  normalized.outcomes = Array.isArray(session.outcomes) ? session.outcomes : [];
  normalized.modifier = Number.isFinite(session.modifier) ? session.modifier : 0;
  normalized.refusalCount = Number.isFinite(session.refusalCount) ? session.refusalCount : 0;
  normalized.eliminated = session.eliminated === true;
  normalized.awaitingAdvance = session.awaitingAdvance === true;
  normalized.feedback = typeof session.feedback === 'string' ? session.feedback : '';
  const ws = session.warmupState || {};
  normalized.warmupState = {
    tension: clamp(Number.isFinite(ws.tension) ? ws.tension : 50, 0, 100),
    focus: clamp(Number.isFinite(ws.focus) ? ws.focus : 50, 0, 100),
    confidence: clamp(Number.isFinite(ws.confidence) ? ws.confidence : 50, 0, 100),
    energy: clamp(Number.isFinite(ws.energy) ? ws.energy : 50, 0, 100),
    timing: clamp(Number.isFinite(ws.timing) ? ws.timing : 50, 0, 100)
  };
  normalized.readinessBonus = Number.isFinite(session.readinessBonus) ? session.readinessBonus : 0;
  normalized.horseChanceBias = Number.isFinite(session.horseChanceBias) ? clamp(session.horseChanceBias, -8, 8) : 0;
  const rs = session.roundStats || {};
  normalized.roundStats = {
    faults: Number.isFinite(rs.faults) ? Math.max(0, rs.faults) : 0,
    refusals: Number.isFinite(rs.refusals) ? Math.max(0, rs.refusals) : 0,
    clearJumps: Number.isFinite(rs.clearJumps) ? Math.max(0, rs.clearJumps) : 0,
    majorFaults: Number.isFinite(rs.majorFaults) ? Math.max(0, rs.majorFaults) : 0,
    eliminated: rs.eliminated === true,
    eliminationReason: typeof rs.eliminationReason === 'string' ? rs.eliminationReason : ''
  };
  return normalized;
}

function competitionChanceModifiers(session, horse, step) {
  const personality = personalityOutcomeModifier(horse.personality);
  const mood = moodOutcomeModifier(horse.mood);
  const bond = Math.round(((horse.bond || 0) - 45) * 0.2);
  const quality = Math.round((calculateHorseQualityOfLife(horse) - 55) * 0.2);
  let warmup = 0;
  if (step?.stage === 'main_round') {
    const ws = session.warmupState || { tension: 50, focus: 50, confidence: 50, energy: 50, timing: 50 };
    const positive = (ws.focus - 50) * 0.08 + (ws.confidence - 50) * 0.08 + (ws.energy - 50) * 0.05 + (ws.timing - 50) * 0.08;
    const negative = (ws.tension - 50) * 0.1;
    warmup = Math.round(clamp(positive - negative, -10, 10));
  }
  return { personality, mood, warmup, bond, quality };
}

function competitionOptionChances(session, horse, option, step) {
  const mods = competitionChanceModifiers(session, horse, step);
  const disciplineSkill = effectiveDisciplineSkill(horse, session.discipline);
  const skillMod = Math.round((disciplineSkill - 50) * 0.12);
  const confidenceField = session.discipline === 'dressage' ? 'confidenceFlat' : 'confidenceJump';
  const confidenceMod = Math.round(((horse[confidenceField] || 50) - 50) * 0.08);
  const memoryMod = Math.round(-competitionMemoryPenalty(horse, session.discipline));
  const horseBias = Number.isFinite(session.horseChanceBias) ? session.horseChanceBias : 0;
  const stepRandom = Number.isFinite(step?.randomBias) ? step.randomBias : 0;
  const optionBias = Math.round(((option.success || 0) - (option.fail || 0)) * 0.03);
  const bond = horse.bond || 0;
  const qualityOfLife = calculateHorseQualityOfLife(horse);
  const badCondition = qualityOfLife < 50;
  const rangeMin = badCondition ? 25 : 50;
  const rangeMax = badCondition ? 45 : 75;
  const normalizedOption = clamp((option.success || 0) / 100, 0, 1);
  const rangeBase = badCondition
    ? 25 + (normalizedOption * 6)
    : 50 + ((rangeMax - rangeMin) * normalizedOption);
  const careAdjust = badCondition
    ? Math.round(((qualityOfLife - 40) / 10) * 2)
    : Math.round(((qualityOfLife - 60) / 40) * 4);
  const bondAdjust = badCondition
    ? Math.round((bond / 100) * 3)
    : Math.round((bond / 100) * 6);
  const skillAdjust = Math.round(skillMod * 0.7);
  const confidenceAdjust = Math.round(confidenceMod * 0.7);
  const randomAdjust = Math.round((stepRandom * 0.6) + (optionBias * 0.4));
  const randomSwing = randomAdjust;
  const baseSuccessChance = clamp(
    Math.round(rangeBase + bondAdjust + careAdjust + skillAdjust + confidenceAdjust + (mods.personality * 1.0) + (mods.mood * 1.2) + (mods.warmup * 0.8) + (memoryMod * 0.7) + (horseBias * 0.8) + randomAdjust),
    rangeMin,
    rangeMax
  );
  const trainingPenalty = horse.personality === 'Hot-Blooded' ? 4 : horse.personality === 'Excitable' ? 2 : 0;
  const successChance = clamp(baseSuccessChance - trainingPenalty, rangeMin, rangeMax);
  const neutralChance = clamp(option.neutral + Math.round(-mods.mood * 0.2 + (stepRandom * -0.25)), 4, 75);
  const failChance = Math.max(1, 100 - successChance - neutralChance);
  return {
    successChance,
    neutralChance,
    failChance,
    skillMod,
    confidenceMod,
    memoryMod,
    horseBias,
    stepRandom,
    randomSwing,
    mods,
    disciplineSkill,
    bond,
    qualityOfLife,
    badCondition,
    rangeMin,
    rangeMax
  };
}

function competitionOptionFinalChances(session, horse, step, options) {
  const prepMod = step?.stage === 'main_round' ? session.readinessBonus : 0;
  const computedOptions = (options || []).map((option, index) => {
    const computed = competitionOptionChances(session, horse, option, step);
    const baseSuccess = clamp(computed.successChance + prepMod, computed.rangeMin, computed.rangeMax);
    return { index, option, computed, successChance: baseSuccess };
  });

  const used = new Set();
  computedOptions.forEach((entry) => {
    let target = entry.successChance;
    if (!used.has(target)) {
      used.add(target);
      entry.successChance = target;
      return;
    }
    const min = entry.computed.rangeMin;
    const max = entry.computed.rangeMax;
    for (let distance = 1; distance <= (max - min); distance += 1) {
      const up = target + distance;
      if (up <= max && !used.has(up)) {
        target = up;
        break;
      }
      const down = target - distance;
      if (down >= min && !used.has(down)) {
        target = down;
        break;
      }
    }
    entry.successChance = target;
    used.add(target);
  });

  return computedOptions;
}

function resolveCompetitionRpgChoice(session, horse, choiceIndex) {
  const step = session.steps[session.stepIndex];
  const variant = competitionPromptForStep(session);
  if (!step || !variant) return;
  const optionOutcomes = competitionOptionFinalChances(session, horse, step, variant.options);
  const selected = optionOutcomes.find((entry) => entry.index === choiceIndex);
  if (!selected) return;
  const computed = selected.computed;
  const successChance = selected.successChance;
  const neutralChance = computed.neutralChance;
  const failChance = Math.max(1, 100 - successChance - neutralChance);
  const roll = rnd(1, 100);
  const outcome = roll <= successChance ? 'success' : roll <= successChance + neutralChance ? 'partial' : 'fail';
  const mod = outcome === 'success' ? rnd(2, 5) : outcome === 'partial' ? rnd(-1, 2) : rnd(-8, -3);
  session.modifier += mod;

  if (step.stage === 'warm_up') {
    const ws = session.warmupState;
    if (outcome === 'success') {
      ws.tension = clamp(ws.tension - rnd(4, 8), 0, 100);
      ws.focus = clamp(ws.focus + rnd(3, 7), 0, 100);
      ws.confidence = clamp(ws.confidence + rnd(3, 7), 0, 100);
      ws.energy = clamp(ws.energy + rnd(1, 4), 0, 100);
      ws.timing = clamp(ws.timing + rnd(2, 6), 0, 100);
    } else if (outcome === 'partial') {
      ws.tension = clamp(ws.tension + rnd(-2, 3), 0, 100);
      ws.focus = clamp(ws.focus + rnd(-1, 2), 0, 100);
      ws.confidence = clamp(ws.confidence + rnd(-1, 2), 0, 100);
    } else {
      ws.tension = clamp(ws.tension + rnd(5, 10), 0, 100);
      ws.focus = clamp(ws.focus - rnd(3, 7), 0, 100);
      ws.confidence = clamp(ws.confidence - rnd(3, 7), 0, 100);
      ws.timing = clamp(ws.timing - rnd(2, 6), 0, 100);
    }
  }

  let displayOutcome = step.stage === 'main_round' ? 'Clear Jump' : (outcome === 'success' ? 'Prepared' : outcome === 'partial' ? 'Mixed prep' : 'Tense prep');
  if (step.stage === 'main_round') {
    const rs = session.roundStats || { faults: 0, refusals: 0, clearJumps: 0, majorFaults: 0, eliminated: false, eliminationReason: '' };
    const phaseText = String(step.phase || '').toLowerCase();

    if (session.discipline === 'jumping') {
      if (outcome === 'success') {
        rs.clearJumps += 1;
        displayOutcome = 'Clear Jump';
      } else if (outcome === 'partial') {
        rs.faults += 4;
        displayOutcome = 'Knockdown (4 faults)';
      } else {
        session.refusalCount += 1;
        rs.refusals += 1;
        if (rnd(1, 100) <= 12) {
          session.eliminated = true;
          rs.eliminated = true;
          rs.eliminationReason = 'fall';
          displayOutcome = 'Elimination (fall)';
        } else if (session.refusalCount >= 3) {
          session.eliminated = true;
          rs.eliminated = true;
          rs.eliminationReason = '3 refusals';
          displayOutcome = 'Elimination (3 refusals)';
        } else if (session.refusalCount === 1) {
          rs.faults += 4;
          displayOutcome = 'Refusal (4 faults)';
        } else {
          rs.faults += 8;
          displayOutcome = 'Refusal (8 faults)';
        }
      }
    } else if (session.discipline === 'hunter') {
      if (outcome === 'success') {
        rs.clearJumps += 1;
        displayOutcome = 'Clear Jump';
      } else if (outcome === 'partial') {
        rs.faults += 2;
        displayOutcome = 'Style Fault (2)';
      } else {
        rs.refusals += 1;
        rs.faults += 4;
        if (rs.refusals >= 2 || rnd(1, 100) <= 10) {
          session.eliminated = true;
          rs.eliminated = true;
          rs.eliminationReason = rs.refusals >= 2 ? 'multiple refusals' : 'fall';
          displayOutcome = rs.eliminationReason === 'fall' ? 'Elimination (fall)' : 'Elimination (multiple refusals)';
        } else {
          displayOutcome = 'Refusal (4 faults)';
        }
      }
    } else if (session.discipline === 'dressage') {
      if (outcome === 'success') {
        rs.clearJumps += 1;
        displayOutcome = 'Accurate Movement';
      } else if (outcome === 'partial') {
        rs.faults += 2;
        displayOutcome = 'Minor Dressage Fault (2 penalties)';
      } else {
        rs.faults += 5;
        rs.majorFaults = (rs.majorFaults || 0) + 1;
        if (rs.majorFaults >= 2 && rnd(1, 100) <= 40) {
          session.eliminated = true;
          rs.eliminated = true;
          rs.eliminationReason = 'wrong course / major errors';
          displayOutcome = 'Elimination (major route error)';
        } else {
          displayOutcome = 'Major Dressage Fault (5 penalties)';
        }
      }
    } else {
      // eventing phase-based faults
      if (outcome === 'success') {
        rs.clearJumps += 1;
        displayOutcome = 'Clear Jump';
      } else if (outcome === 'partial') {
        if (phaseText.includes('dressage')) {
          rs.faults += 2;
          displayOutcome = 'Dressage Penalty (2)';
        } else if (phaseText.includes('cross-country')) {
          rs.faults += 6;
          displayOutcome = 'XC Time/Style Penalty (6)';
        } else {
          rs.faults += 4;
          displayOutcome = 'Stadium Fault (4)';
        }
      } else {
        if (phaseText.includes('dressage')) {
          rs.faults += 5;
          rs.majorFaults = (rs.majorFaults || 0) + 1;
          displayOutcome = 'Dressage Major Fault (5)';
        } else if (phaseText.includes('cross-country')) {
          rs.refusals += 1;
          if (rs.refusals === 1) {
            rs.faults += 20;
            displayOutcome = 'XC Refusal (20 penalties)';
          } else if (rs.refusals === 2) {
            rs.faults += 40;
            displayOutcome = 'XC Refusal (40 penalties)';
          } else {
            session.eliminated = true;
            rs.eliminated = true;
            rs.eliminationReason = 'cross-country refusals';
            displayOutcome = 'Elimination (XC refusals)';
          }
          if (!rs.eliminated && rnd(1, 100) <= 10) {
            session.eliminated = true;
            rs.eliminated = true;
            rs.eliminationReason = 'fall';
            displayOutcome = 'Elimination (fall)';
          }
        } else {
          rs.refusals += 1;
          if (rs.refusals === 1) {
            rs.faults += 4;
            displayOutcome = 'Stadium Refusal (4 faults)';
          } else if (rs.refusals === 2) {
            rs.faults += 8;
            displayOutcome = 'Stadium Refusal (8 faults)';
          } else {
            session.eliminated = true;
            rs.eliminated = true;
            rs.eliminationReason = 'stadium refusals';
            displayOutcome = 'Elimination (stadium refusals)';
          }
        }
      }
    }

    session.roundStats = rs;
    if (rs.eliminated) session.eliminated = true;
  }

  session.outcomes.push({
    phase: step.phase,
    outcome: displayOutcome,
    eventText: `${cap(step.stage.replace('_', ' '))}: ${variant.title}`,
    chances: { success: successChance, partial: neutralChance, fail: failChance }
  });
  session.feedback = `${variant.title}: ${displayOutcome}`;
  session.awaitingAdvance = true;
}

function finalizeCompetitionRpgEntry(horse, session) {
  const interaction = {
    controls: COMPETITION_CONTROLS,
    modifier: clamp(session.modifier + session.readinessBonus, -26, 20),
    phases: session.outcomes,
    memoryPenalty: competitionMemoryPenalty(horse, session.discipline),
    roundStats: session.roundStats || { faults: 0, refusals: 0, clearJumps: 0, eliminated: false, eliminationReason: '' }
  };
  const entry = {
    id: uid(),
    discipline: session.discipline,
    level: session.level,
    date: dateLabel(),
    monthIndex: currentMonthIndex(),
    interaction
  };
  horse.pendingCompetitions = horse.pendingCompetitions || [];
  horse.pendingCompetitions.push(entry);
  horse.showEntriesThisMonth = (horse.showEntriesThisMonth || 0) + 1;
  const opener = interaction.phases[0] || { phase: 'round start', outcome: 'partial', eventText: 'steady opening' };
  pushReport(`${horse.name} registered for ${cap(session.discipline)} ${session.level} in ${competitionModeLabel()} mode.`);
  pushReport(`${horse.name} competition simulation (${opener.phase}): ${opener.outcome.toUpperCase()} — ${opener.eventText} Results will arrive next month.`);
  app.competitionRpg = null;
  saveGame(false);
}

function registerShowEntry(horse, discipline, level) {
  if (!canCompeteUnderSaddle(horse)) {
    if (horse.unridable) pushReport('This horse is unridable.');
    else if ((horse.behavior || 0) < requiredBehaviorForRiding(horse)) pushReport(`${horse.name} is unbroken/green and needs behavior 500 before under-saddle work.`);
    else pushReport(`${horse.name} cannot enter under-saddle shows until age 3.`);
    return;
  }
  if (horse.isLessonHorse && !horse.barnAvailable) {
    pushReport(`${horse.name} is unavailable this month and cannot train/compete.`);
    return;
  }
  if ((horse.illnesses || []).some((i) => i.active)) {
    pushReport(`${horse.name} cannot show while recovering from an injury/illness.`);
    return;
  }
  horse.managed.showEntry = true;
  const idx = levelIndex(discipline, level);
  const maxIdx = highestAllowedLevelIndex(horse, discipline);
  if (idx > maxIdx) {
    pushReport(`${horse.name} is not trained enough for ${discipline} ${level}. Max allowed right now: ${SHOW_LEVELS[discipline][maxIdx]}.`);
    return;
  }
  if (app.settings?.competitionMode === 'rpg') {
    app.competitionRpg = buildCompetitionRpgSession(horse, discipline, level);
    pushReport(`${horse.name} entered ${cap(discipline)} ${level} in RPG competition mode. Open the Shows tab and press Enter to progress scenes.`);
    saveGame(false);
    return;
  }
  const interaction = simulateCompetitionRide(horse, discipline, level);
  const entry = {
    id: uid(),
    discipline,
    level,
    date: dateLabel(),
    monthIndex: currentMonthIndex(),
    interaction
  };
  horse.pendingCompetitions = horse.pendingCompetitions || [];
  horse.pendingCompetitions.push(entry);
  horse.showEntriesThisMonth = (horse.showEntriesThisMonth || 0) + 1;
  const opener = interaction.phases[0];
  pushReport(`${horse.name} registered for ${cap(discipline)} ${level}. Controls: steer ${interaction.controls.steer}, jump/action ${interaction.controls.jump}, pace ${interaction.controls.pace}.`);
  pushReport(`${horse.name} competition simulation (${opener.phase}): ${opener.outcome.toUpperCase()} — ${opener.eventText} Results will arrive next month.`);
  saveGame(false);
}

function resolvePendingCompetitions(horse) {
  const currentIndex = currentMonthIndex();
  const pending = Array.isArray(horse.pendingCompetitions) ? horse.pendingCompetitions : [];
  const due = pending.filter((entry) => entry.monthIndex < currentIndex);
  horse.pendingCompetitions = pending.filter((entry) => entry.monthIndex >= currentIndex);
  if (!due.length) return;
  due.forEach((entry) => {
    const result = calculateCompetitionResult(horse, entry.discipline, entry.level, entry.interaction);
    horse.totalPoints += Math.max(0, 30 - result.placing);
    horse.earnings += result.prize;
    app.money += result.prize;
    if (result.placing === 1) horse.championships += 1;
    if (result.placing === 2) horse.reserves += 1;
    horse.topWins.highestScore = Math.max(horse.topWins.highestScore, result.score);
    horse.showResults.push({
      date: dateLabel(),
      discipline: entry.discipline,
      level: entry.level,
      score: result.score,
      placing: result.placing,
      prize: result.prize,
      resultText: result.resultText
    });
    updateHorseTitles(horse);
    pushCompetitionReport({
      id: entry.id,
      date: dateLabel(),
      discipline: entry.discipline,
      level: entry.level,
      competitionName: `${cap(entry.discipline)} ${entry.level}`,
      penaltiesText: result.penaltiesText,
      timeScoreText: result.timeScoreText,
      horseName: horse.name,
      horseBreed: horse.breed,
      placing: result.placing,
      fieldSize: result.fieldSize,
      highlights: [...(entry.interaction?.phases?.map((p) => `${cap(p.phase)}: ${p.outcome} (${p.eventText})`) || []).slice(0, 2), ...result.highlights].slice(0, 5),
      comment: result.comment,
      suggestion: result.suggestion
    });
    pushReport(`${horse.name} in ${entry.discipline} (${entry.level}) placed #${result.placing} with ${result.resultText} and won ${money(result.prize)}.`);
  });
}


function applyDailyPregnancyUpdates(horse) {
  if (!isPregnantMare(horse)) return;
  ensurePregnancyState(horse);
  const stage = pregnancyStage(horse);
  if (stage.label === '90-120 days') horse.weightStatus = pick(['Moderate', 'Fleshy']);
  if (stage.label === '210-320 days' || stage.label === '320+ days') horse.weightStatus = 'Overweight';
}

function advanceOneDay() {
  const newborns = [];
  app.horses.forEach((h) => {
    if (h.foalVitality && Number.isFinite(h.foalVitality.ageDays)) h.foalVitality.ageDays += 1;
    if (isPregnantMare(h)) processPregnancy(h, newborns, 1);
    applyStablehandCare(h);
    applyDailyPregnancyUpdates(h);
  });
  if (newborns.length) app.horses = app.horses.concat(newborns);
  app.hour = 0;
  app.day += 1;
  if (app.day > 30) {
    monthlyProgress();
  }
}

function advanceOneHour() {
  app.hour += 1;
  if (app.hour >= 24) advanceOneDay();
}

function canSkipHour() {
  return true;
}

function renderShows() {
  app.showSelections = app.showSelections || {};
  const panel = document.getElementById('shows');
  if (app.competitionRpg) app.competitionRpg = normalizeCompetitionRpgSession(app.competitionRpg);
  const activeSession = app.competitionRpg;
  if (activeSession) {
    const horse = app.horses.find((h) => h.id === activeSession.horseId);
    if (!horse) {
      app.competitionRpg = null;
      return renderShows();
    }
    const step = activeSession.steps[activeSession.stepIndex];
    const variant = competitionPromptForStep(activeSession);
    if (!step || !variant) {
      finalizeCompetitionRpgEntry(horse, activeSession);
      return renderShows();
    }
    const stageLabel = step.stage === 'course_walk' ? 'Course Walk' : step.stage === 'warm_up' ? 'Warm-Up' : 'Main Round';
    const stageCount = activeSession.steps.filter((x) => x.stage === step.stage).length;
    const stageIndex = activeSession.steps.slice(0, activeSession.stepIndex + 1).filter((x) => x.stage === step.stage).length;
    const ws = activeSession.warmupState;
    const includesCourseWalk = activeSession.steps.some((x) => x.stage === 'course_walk');
    const schemeText = includesCourseWalk ? 'Course walk → Warm-up → Main round' : 'Warm-up → Main round';
    const sceneLine = step.stage === 'main_round'
      ? `${step.jumpNumber || stageIndex} (Jump Number), ${step.jumpType || 'Course element'} (Jump Type), ${variant.scene}`
      : `${variant.title}, ${variant.scene}`;

    panel.innerHTML = `
      <h2>🏆 Competition RPG — ${cap(activeSession.discipline)} (${activeSession.level})</h2>
      <div class='box'>
        <p><strong>Scheme:</strong> ${schemeText}</p>
        <p><strong>Horse:</strong> ${horse.name}</p>
        <p><strong>Mode:</strong> ${competitionModeLabel()}</p>
        <p><strong>Stage:</strong> ${stageLabel} (${stageIndex}/${stageCount})</p>
        <p><strong>Phase:</strong> ${cap(step.phase)}</p>
        <p><strong>Scene:</strong> ${sceneLine}</p>
        <p class='small'>Press Enter after each choice to move to the next scene.</p>
        ${activeSession.feedback ? `<p><strong>Last Result:</strong> ${activeSession.feedback}</p>` : ''}
        <p class='small'><strong>Warm-up state:</strong> Tension ${ws.tension} | Focus ${ws.focus} | Confidence ${ws.confidence} | Energy ${ws.energy} | Timing ${ws.timing}</p>
        <p class='small'><strong>Readiness bonus:</strong> ${activeSession.readinessBonus >= 0 ? '+' : ''}${activeSession.readinessBonus}</p>
        <div id='comp-rpg-options'></div>
        <div class='inline'>
          <button id='comp-enter'>Enter</button>
          ${step.stage === 'course_walk' ? "<button id='comp-skip-walk'>Skip Course Walk</button>" : ''}
          <button id='comp-retire'>Retire Round</button>
        </div>
      </div>
    `;
    const wrap = document.getElementById('comp-rpg-options');
    const optionOutcomes = competitionOptionFinalChances(activeSession, horse, step, variant.options);
    optionOutcomes.forEach((entry) => {
      const box = document.createElement('div');
      const { index: idx, option: opt, computed, successChance: finalSuccess } = entry;
      const finalFail = Math.max(1, 100 - finalSuccess - computed.neutralChance);
      box.className = 'box';
      box.innerHTML = `
        <p><strong>${String.fromCharCode(97 + idx)})</strong> ${opt.label}</p>
        <p class='small'>Final chance: success ${finalSuccess}% / partial ${computed.neutralChance}% / fail ${finalFail}%</p>
        <p class='small'>intent: ${opt.intent || 'adaptive_riding'}</p>
        <button data-comp-opt='${idx}' ${activeSession.awaitingAdvance ? 'disabled' : ''}>Choose</button>
      `;
      wrap.append(box);
    });
    panel.querySelectorAll('[data-comp-opt]').forEach((btn) => {
      btn.onclick = () => {
        resolveCompetitionRpgChoice(activeSession, horse, Number(btn.dataset.compOpt));
        renderShows();
      };
    });
    document.getElementById('comp-enter').onclick = () => {
      if (!activeSession.awaitingAdvance) {
        alert('Choose an option first.');
        return;
      }
      activeSession.awaitingAdvance = false;
      activeSession.stepIndex += 1;
      const nextStep = activeSession.steps[activeSession.stepIndex];
      if (nextStep && nextStep.stage === 'main_round' && activeSession.readinessBonus === 0) {
        activeSession.readinessBonus = competitionWarmupReadinessBonus(activeSession);
      }
      if (activeSession.eliminated || activeSession.stepIndex >= activeSession.steps.length) {
        finalizeCompetitionRpgEntry(horse, activeSession);
      }
      renderShows();
    };
    const skipWalkBtn = document.getElementById('comp-skip-walk');
    if (skipWalkBtn) {
      skipWalkBtn.onclick = () => {
        const nextNonWalk = activeSession.steps.findIndex((s, idx) => idx >= activeSession.stepIndex && s.stage !== 'course_walk');
        if (nextNonWalk < 0) {
          finalizeCompetitionRpgEntry(horse, activeSession);
          renderShows();
          return;
        }
        activeSession.stepIndex = nextNonWalk;
        activeSession.awaitingAdvance = false;
        activeSession.feedback = 'Course walk skipped. Proceeding directly to warm-up.';
        pushReport(`${horse.name} skipped course walking and moved directly to warm-up.`);
        renderShows();
      };
    }
    document.getElementById('comp-retire').onclick = () => {
      app.competitionRpg = null;
      pushReport(`${horse.name} retired before completing the RPG competition round.`);
      renderShows();
    };
    return;
  }

  const shows = [
    { key: 'dressage', names: ['OTO Dressage Show', 'OTO Pony Dressage Show', 'OTO Young Horse Dressage Show'] },
    { key: 'jumping', names: ['OTO Jumping Show', 'OTO Pony Jumping Classic', 'OTO Young Horse Jumping Show'] },
    { key: 'eventing', names: ['OTO Eventing Show', 'OTO Pony Event Trials', 'OTO Young Horse Eventing Show'] },
    { key: 'hunter', names: ['OTO Hunter Show', 'OTO Pony Hunter Classic', 'OTO Young Horse Hunter Show'] }
  ];

  const showHorsePool = competitionEligibleHorses().filter((h) => !h.retiredForever && h.age >= 3);
  panel.innerHTML = `
    <h2>Enter Shows</h2>
    <p class='small'>Competition Mode: <strong>${competitionModeLabel()}</strong>. Change this in Settings.</p>
    <div class='box'>
      <label>Show Horse Source</label>
      <select id='show-horse-scope'>
        <option value='both' ${app.competitionHorseScope === 'both' ? 'selected' : ''}>Both private + lesson horses</option>
        <option value='private' ${app.competitionHorseScope === 'private' ? 'selected' : ''}>Private horses only</option>
        <option value='lesson' ${app.competitionHorseScope === 'lesson' ? 'selected' : ''}>Lesson horses only</option>
      </select>
      <p class='small'>Choose which horses appear in show registration lists.</p>
    </div>
    ${shows.map((s) => `
      <div class='box'>
        <h3>${cap(s.key)}</h3>
        ${s.names.map((n) => `<p>${n} (0/250) — Oxer To Oxer Showgrounds</p>`).join('')}
        <label>Horse</label>
        <select id='show-horse-${s.key}'>
          ${showHorsePool.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}
        </select>
        <p class='small'>Foals/youngsters under age 3 are in-hand only (registries/breeders), not under-saddle shows.</p>
        <label>Division</label>
        <select id='show-level-${s.key}'>${SHOW_LEVELS[s.key].map((lvl) => `<option>${lvl}</option>`).join('')}</select>
        ${showHorsePool.length ? '' : '<p class="small">No eligible horses for this filter.</p>'}
        <button id='enter-${s.key}' ${showHorsePool.length ? '' : 'disabled'}>Register Show Entry</button>
        <p class='small'>Results are delivered after the next month skip.</p>
      </div>
    `).join('')}
  `;

  const showScopeSelect = document.getElementById('show-horse-scope');
  if (showScopeSelect) {
    showScopeSelect.onchange = () => {
      app.competitionHorseScope = ['private', 'lesson', 'both'].includes(showScopeSelect.value) ? showScopeSelect.value : 'both';
      renderShows();
    };
  }

  Object.keys(SHOW_LEVELS).forEach((d) => {
    const horseSelect = document.getElementById(`show-horse-${d}`);
    const levelSelect = document.getElementById(`show-level-${d}`);
    const sel = app.showSelections[d] || {};
    if (horseSelect && sel.horseId) horseSelect.value = sel.horseId;
    if (levelSelect && sel.level) levelSelect.value = sel.level;
    if (horseSelect) horseSelect.onchange = () => {
      app.showSelections[d] = { ...(app.showSelections[d] || {}), horseId: horseSelect.value, level: levelSelect?.value || '' };
    };
    if (levelSelect) levelSelect.onchange = () => {
      app.showSelections[d] = { ...(app.showSelections[d] || {}), horseId: horseSelect?.value || '', level: levelSelect.value };
    };
  });

  Object.keys(SHOW_LEVELS).forEach((d) => {
    const btn = document.getElementById(`enter-${d}`);
    if (!btn) return;
    btn.onclick = () => {
      const id = document.getElementById(`show-horse-${d}`).value;
      const level = document.getElementById(`show-level-${d}`).value;
      app.showSelections[d] = { horseId: id, level };
      const horse = competitionEligibleHorses().find((h) => h.id === id);
      if (!horse) return alert('No eligible horse selected.');
      if (!canCompeteUnderSaddle(horse)) {
        if (horse.unridable) return alert('This horse is unridable.');
        if ((horse.behavior || 0) < requiredBehaviorForRiding(horse)) return alert('This horse is unbroken/green and needs behavior 500 before under-saddle work.');
        return alert('This horse is in-hand only until age 3.');
      }
      registerShowEntry(horse, d, level);
      render();
    };
  });
}

function vetNote(horse, text) {
  horse.vetNotes.unshift({ date: dateLabel(), text });
  horse.showVetNotes = true;
  pushReport(text);
}

function tryCharge(cost) {
  if (app.money < cost) {
    alert('Not enough money');
    return false;
  }
  app.money -= cost;
  return true;
}

function findTreatableIllness(horse) {
  if (!horse?.illnesses) return null;
  const active = horse.illnesses.find((i) => i.active);
  if (active) return active;
  const lingering = horse.illnesses.find((i) => (i.remaining || 0) > 0);
  if (lingering) {
    lingering.active = true;
    return lingering;
  }
  return null;
}

function renderVet() {
  app.vetSelection = app.vetSelection || { horseId: '', mareId: '', stallionId: '', strawId: '', embryoId: '' };
  const mares = app.horses.filter((h) => h.gender === 'Mare' && !h.retiredForever);
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  const opts = app.horses.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');

  document.getElementById('vet').innerHTML = `
    <h2>Vet: Basic, Reproduction, Pregnancy</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Basic Exams</h3>
        <label>Horse</label><select id='vet-horse'>${opts}</select>
        <button id='vet-checkup'>Checkup + Vaccination ($150)</button>
        <button id='vet-physical'>Complete Physical ($1000)</button>
        <button id='vet-soundness'>Soundness Exam ($1000)</button>
        <button id='vet-gelding'>Gelding ($500)</button>
        <button id='vet-injury'>Injury/Illness Exam ($1000)</button>
        <button id='vet-heal'>Treat Active Illness ($750)</button>
      </div>
      <div class='box'>
        <h3>Reproduction</h3><p class='small'>Stallion: semen only. Mare: AI/flush/transfer. Gelding: no repro services.</p>
        <label>Stallion for collection</label><select id='vet-stallion'>${stallions.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}</select>
        <button id='vet-collect'>Semen Collection ($500)</button>
        <label>Mare for breeding</label><select id='vet-mare'>${mares.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}</select>
        <label>Use Straw</label><select id='vet-straw'>${app.semenStraws.map((s) => `<option value='${s.id}'>${s.stallionName} (${s.id})</option>`).join('')}</select>
        <button id='vet-ai'>Artificial Insemination ($200)</button>
        <button id='vet-flush'>Embryo Flush ($1000)</button>
        <label>Embryo for transfer</label><select id='vet-embryo'>${app.embryos.map((e) => `<option value='${e.id}'>${e.donor} x ${e.sire}</option>`).join('')}</select>
        <button id='vet-transfer'>Embryo Transfer ($1000)</button>
        <button id='vet-sex'>Ultrasound for Sex ($200)</button>
        <button id='vet-mismate'>Mismate Shot ($100)</button>
      </div>
    </div>
  `;

  const vetHorseSelect = document.getElementById('vet-horse');
  const vetMareSelect = document.getElementById('vet-mare');
  const vetStallionSelect = document.getElementById('vet-stallion');
  const vetStrawSelect = document.getElementById('vet-straw');
  const vetEmbryoSelect = document.getElementById('vet-embryo');
  if (vetHorseSelect && app.vetSelection.horseId) vetHorseSelect.value = app.vetSelection.horseId;
  if (vetMareSelect && app.vetSelection.mareId) vetMareSelect.value = app.vetSelection.mareId;
  if (vetStallionSelect && app.vetSelection.stallionId) vetStallionSelect.value = app.vetSelection.stallionId;
  if (vetStrawSelect && app.vetSelection.strawId) vetStrawSelect.value = app.vetSelection.strawId;
  if (vetEmbryoSelect && app.vetSelection.embryoId) vetEmbryoSelect.value = app.vetSelection.embryoId;
  const syncVetSelection = () => {
    app.vetSelection = {
      horseId: vetHorseSelect?.value || '',
      mareId: vetMareSelect?.value || '',
      stallionId: vetStallionSelect?.value || '',
      strawId: vetStrawSelect?.value || '',
      embryoId: vetEmbryoSelect?.value || ''
    };
  };
  [vetHorseSelect, vetMareSelect, vetStallionSelect, vetStrawSelect, vetEmbryoSelect].forEach((node) => { if (node) node.onchange = syncVetSelection; });
  syncVetSelection();

  const selectedHorse = () => app.horses.find((h) => h.id === document.getElementById('vet-horse').value);
  const selectedMare = () => app.horses.find((h) => h.id === document.getElementById('vet-mare').value);
  const selectedStallion = () => app.horses.find((h) => h.id === document.getElementById('vet-stallion').value);

  document.getElementById('vet-checkup').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(150)) return;
    h.due.checkup = false;
    vetNote(h, `${h.name} completed annual checkup and vaccination.`);
    render();
  };

  document.getElementById('vet-physical').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(1000)) return;
    vetNote(h, `${h.name} physical exam: predisposed to ${h.healthRisks.join(', ')}.`);
    render();
  };

  document.getElementById('vet-soundness').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(1000)) return;
    const line = soundnessForecastLine(h.soundnessYears);
    vetNote(h, `${h.name} soundness forecast: ${line}`);
    render();
  };

  document.getElementById('vet-gelding').onclick = () => {
    const h = selectedHorse();
    if (!h) return;
    if (!confirm('You sure you want to geld this horse?')) return;
    if (!tryCharge(500)) return;
    h.gender = 'Gelding';
    Object.keys(h.potential).forEach((k) => { h.potential[k] += rnd(0, 5); });
    if (['Stubborn', 'Spooky', 'Unfocused'].includes(h.personality)) {
      h.personality = pick(['Easy-Going', 'Bomb-proof']);
    }
    vetNote(h, `${h.name} was gelded; performance trainability may improve.`);
    render();
  };

  document.getElementById('vet-injury').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(1000)) return;
    const issue = findTreatableIllness(h);
    if (issue) {
      vetNote(h, `${h.name} has ${issue.name}. Estimated recovery ${issue.remaining} months.`);
    } else if (h.hiddenIllnesses?.length) {
      const hidden = h.hiddenIllnesses.shift();
      addIllness(h, { name: hidden.name, impact: 10, severity: hidden.severity, surgeryRisk: 0, retirementRisk: 0 });
      vetNote(h, `${h.name} was diagnosed with ${hidden.name}. Estimated recovery ${h.illnesses.find((i) => i.active)?.remaining || 0} months.`);
    } else {
      vetNote(h, `${h.name} has no active injury/illness today.`);
    }
    render();
  };

  document.getElementById('vet-heal').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(750)) return;
    const issue = findTreatableIllness(h);
    if (!issue) {
      vetNote(h, `${h.name} had no active condition to treat.`);
    } else {
      issue.remaining = Math.max(0, issue.remaining - rnd(1, 2));
      issue.active = issue.remaining > 0;
      vetNote(h, issue.active
        ? `${h.name} received treatment for ${issue.name}. Estimated recovery ${issue.remaining} month(s) remaining.`
        : `${h.name} treated successfully for ${issue.name}.`);
    }
    render();
  };

  document.getElementById('vet-collect').onclick = () => {
    const stallion = selectedStallion();
    if (!stallion || !tryCharge(500)) return;
    const count = rnd(1, 6);
    for (let i = 0; i < count; i++) app.semenStraws.push({ id: uid(), stallionId: stallion.id, stallionName: stallion.name });
    vetNote(stallion, `Collected ${count} semen straws from ${stallion.name}.`);
    render();
  };

  document.getElementById('vet-ai').onclick = () => {
    const mare = selectedMare();
    const strawId = document.getElementById('vet-straw').value;
    const straw = app.semenStraws.find((s) => s.id === strawId);
    if (!mare || !straw || !tryCharge(200)) return;
    if (!mare.retiredToBreeding) { app.money += 200; return alert('Mare must be retired to breeding for AI.'); }
    const success = rnd(1, 100) > 30;
    if (success) {
      mare.pregnantBy = straw.stallionName;
      mare.pregnancyDays = 0;
      mare.gestationLengthDays = rnd(320, 360);
      vetNote(mare, `AI success for ${mare.name} using ${straw.stallionName}. Pregnancy started at day 0.`);
    } else {
      vetNote(mare, `AI attempt failed for ${mare.name} using ${straw.stallionName}.`);
    }
    app.semenStraws = app.semenStraws.filter((x) => x.id !== straw.id);
    render();
  };

  document.getElementById('vet-flush').onclick = () => {
    const mare = selectedMare();
    const strawId = document.getElementById('vet-straw').value;
    const straw = app.semenStraws.find((s) => s.id === strawId);
    if (!mare || !straw || !tryCharge(1000)) return;
    if (!mare.retiredToBreeding) { app.money += 1000; return alert('Mare must be retired to breeding for embryo flush.'); }
    app.semenStraws = app.semenStraws.filter((x) => x.id !== straw.id);
    const n = rnd(0, 2);
    for (let i = 0; i < n; i++) {
      app.embryos.push({
        id: uid(),
        donor: mare.name,
        donorId: mare.id,
        sire: straw.stallionName,
        sireId: straw.stallionId
      });
    }
    vetNote(mare, `Embryo flush complete for ${mare.name}: ${n} embryo(s) produced.`);
    render();
  };

  document.getElementById('vet-transfer').onclick = () => {
    const mare = selectedMare();
    const embryoId = document.getElementById('vet-embryo').value;
    const embryoIndex = app.embryos.findIndex((e) => e.id === embryoId);
    if (!mare || embryoIndex < 0 || !tryCharge(1000)) return;
    if (!mare.retiredToBreeding) { app.money += 1000; return alert('Recipient mare must be retired to breeding for embryo transfer.'); }
    const embryo = app.embryos[embryoIndex];
    const success = rnd(1, 100) > 35;
    if (success) {
      app.embryos.splice(embryoIndex, 1);
      mare.pregnantEmbryo = embryo;
      mare.pregnancyDays = 0;
      mare.gestationLengthDays = rnd(320, 360);
      vetNote(mare, `Embryo transfer successful for ${mare.name}. Pregnancy started at day 0.`);
    } else {
      vetNote(mare, `Embryo transfer failed for ${mare.name}.`);
    }
    render();
  };

  document.getElementById('vet-sex').onclick = () => {
    const mare = selectedMare();
    if (!mare || !tryCharge(200)) return;
    if (!(mare.pregnantBy || mare.pregnantEmbryo)) {
      app.money += 200;
      return alert('Ultrasound is only available for pregnant mares.');
    }
    vetNote(mare, `${mare.name} ultrasound: foal sex appears ${pick(['colt', 'filly'])}.`);
    render();
  };

  document.getElementById('vet-mismate').onclick = () => {
    const mare = selectedMare();
    if (!mare || !tryCharge(100)) return;
    delete mare.pregnantBy;
    delete mare.pregnantEmbryo;
    mare.pregnancyDays = 0;
    mare.gestationLengthDays = 0;
    vetNote(mare, `${mare.name} received mismate shot. Pregnancy ended.`);
    render();
  };
}

function renderFarrier() {
  const opts = app.horses.map((h) => `<option value='${h.id}'>${h.name}</option>`).join('');
  document.getElementById('farrier').innerHTML = `
    <h2>Farrier</h2>
    <div class='box'>
      <label>Horse</label><select id='farrier-horse'>${opts}</select>
      <label>Trim/Shoe</label>
      <select id='farrier-type'>
        <option value='50'>Basic Trim ($50)</option>
        <option value='120'>Keg Shoe ($120)</option>
        <option value='150'>Rim Shoe ($150)</option>
      </select>
      <button id='do-farrier'>Set Trim/Shoe</button>
    </div>
  `;

  document.getElementById('do-farrier').onclick = () => {
    const h = app.horses.find((x) => x.id === document.getElementById('farrier-horse').value);
    const cost = Number(document.getElementById('farrier-type').value);
    if (!h || !tryCharge(cost)) return;
    h.managed.farrier = true;
    h.farrierThisMonth = h.due.farrier;
    h.lastFarrierMonth = app.year * 12 + app.month;
    h.due.farrier = false;
    h.farrierThisMonth = true;
    if (cost === 120) {
      h.stats.dressage.Collection = clampSkill(h, 'dressage', h.stats.dressage.Collection + 2);
      h.stats.dressage.Connection = clampSkill(h, 'dressage', h.stats.dressage.Connection + 2);
    }
    if (cost === 150) {
      h.stats.jumping.Striding = clampSkill(h, 'jumping', h.stats.jumping.Striding + 2);
      h.stats.jumping.Power = clampSkill(h, 'jumping', h.stats.jumping.Power + 2);
    }
    pushReport(`${h.name} farrier appointment complete.`);
    render();
  };
}


function renderTraining() {
  const panel = document.getElementById('training');
  const session = app.trainingRpg;
  if (session) {
    const horse = app.horses.find((h) => h.id === session.horseId);
    if (!horse || horse.retiredForever) {
      app.trainingRpg = null;
      app.trainingRpgFeedback = '';
      return renderTraining();
    }
    const variant = session.variant;
    const env = session.environment || generateTrainingEnvironment();
    const sceneText = buildRpgNarrative(horse, session);
    panel.innerHTML = `
      <h2>Interactive Training</h2>
      <div class='box'>
        <h3>STEP: ${actionLabel(session.action)} (${(session.stepIndex || 0) + 1}/${(session.steps || []).length || 1})</h3><p class='small'><strong>Discipline:</strong> ${cap(session.discipline)}</p>
        <p><strong>Horse Name:</strong> ${horse.name}</p>
        <p><strong>Environment:</strong> Wind ${env.wind}; Noise ${env.noise}; Footing ${env.footing}; Nearby ${env.nearby}; Visual trigger ${env.visual}.</p>
        <p><strong>ACTION:</strong> ${actionLabel(session.action)} — Variant ${variant.id || '?'}</p>
        <p><strong>Scene:</strong> ${sceneText}</p>
        ${app.trainingRpgFeedback ? `<p><strong>Last choice result:</strong> ${app.trainingRpgFeedback}</p>` : ''}
        <p class='small'><strong>TRAINING/SHOW NOTE:</strong> Percentage starts from a small base, then is adjusted by Bond (high impact), Skills (slight impact), Quality of Life (medium impact), controlability, and tack.</p>
        <div id='rpg-options'></div>
        <button id='rpg-exit'>End Interactive Session</button>
      </div>
    `;
    const wrap = document.getElementById('rpg-options');
    variant.options.forEach((opt, idx) => {
      const line = document.createElement('div');
      line.className = 'box';
      const projected = resolveRpgOption(opt, { ...horse }, { ...session, pendingEvent: null });
      line.innerHTML = `
        <p><strong>${String.fromCharCode(97 + idx)})</strong> ${opt.label}</p>
        <p class='small'>Final chance: success ${projected.successChance}% / partial ${projected.neutralChance}% / fail ${projected.failChance}%</p>
        <p class='small'>intent: ${opt.intent || 'adaptive_riding'}</p>
        <button data-rpg='${idx}'>Choose</button>
      `;
      wrap.append(line);
    });
    panel.querySelectorAll('[data-rpg]').forEach((btn) => {
      btn.onclick = () => {
        const opt = variant.options[Number(btn.dataset.rpg)];
        session.actionsSinceEvent = (session.actionsSinceEvent || 0) + 1;
        if (!session.pendingEvent && session.actionsSinceEvent >= (session.nextEventAt || 3)) {
          session.pendingEvent = randomTrainingEvent();
          session.actionsSinceEvent = 0;
          session.nextEventAt = rnd(2, 4);
        }
        const result = resolveRpgOption(opt, horse, session);
        const d = session.discipline;
        let gain = result.outcome === 'success' ? rnd(Math.max(1, result.skillBase), Math.max(2, result.skillBase + 2)) : result.outcome === 'neutral' ? Math.max(0, result.skillBase - 1) : 0;
        if (session.action === 'work_in_hand' && (horse.trainingSessionsThisMonth || 0) <= 1) {
          gain = 0;
          horse.mood = 'No energy';
        }
        if (gain > 0) {
          const skill = pick(EXERCISE_MENU[d] || EXERCISE_MENU.jumping);
          if (d === 'dressage') horse.stats.dressage[skill] = clampSkill(horse, d, (horse.stats.dressage[skill] || 0) + gain);
          else if (d === 'jumping' || d === 'hunter') horse.stats.jumping[skill] = clampSkill(horse, d, (horse.stats.jumping[skill] || 0) + gain);
          else if (d === 'eventing') {
            if (horse.stats.dressage[skill] != null) horse.stats.dressage[skill] = clampSkill(horse, d, horse.stats.dressage[skill] + gain);
            if (horse.stats.jumping[skill] != null) horse.stats.jumping[skill] = clampSkill(horse, d, horse.stats.jumping[skill] + gain);
          }
        }
        horse.managed.trained = true;
        const outcomeLabel = result.outcome === 'success' ? 'Success' : result.outcome === 'neutral' ? 'Partial' : 'Fail';
        const summary = session.summary || { skill: 0, confidence: 0, bond: 0, fatigue: 0, notableEvent: '' };
        summary.skill += gain;
        summary.confidence += result.confidenceDelta;
        summary.bond += result.bondDelta + (session.pendingEvent?.bondBonus || 0);
        summary.fatigue += result.fatigueGain;
        if (session.pendingEvent) summary.notableEvent = session.pendingEvent.text;
        session.summary = summary;

        app.trainingRpgFeedback = `${actionLabel(session.action)}: ${outcomeLabel} (Final S${result.successChance}% / P${result.neutralChance}% / F${result.failChance}%)`;
        pushReport(`${horse.name} interactive ${actionLabel(session.action)}: ${outcomeLabel}.`);
        app.trainingRpg = advanceTrainingRpgSession(session, horse);
        if (!app.trainingRpg) {
          app.trainingRpgSummary = {
            horseName: horse.name,
            discipline: d,
            skill: summary.skill,
            confidence: summary.confidence,
            bond: summary.bond,
            fatigue: summary.fatigue,
            notableEvent: summary.notableEvent || 'Steady session with no standout event.',
            reflection: `${horse.name} finished the session feeling ${horse.mood.toLowerCase()} with ${horse.fatigue || 0}% fatigue. Progress was earned through repetition rather than automatic success.`
          };
          pushReport(`${horse.name} session summary — Skill ${summary.skill >= 0 ? '+' : ''}${summary.skill}, Confidence ${summary.confidence >= 0 ? '+' : ''}${summary.confidence}, Bond ${summary.bond >= 0 ? '+' : ''}${summary.bond}.`);
        }
        renderTraining();
      };
    });
    const exitBtn = document.getElementById('rpg-exit');
    if (exitBtn) {
      exitBtn.onclick = () => {
        app.trainingRpg = null;
        app.trainingRpgFeedback = '';
        renderTraining();
      };
    }
    return;
  }

  const trainingScope = ['private', 'lesson', 'both'].includes(app.trainingHorseScope) ? app.trainingHorseScope : 'both';
  const privateTrainingHorses = app.horses.filter((h) => !h.retiredForever);
  const lessonTrainingHorses = currentBarnLessonHorses();
  const trainingPool = trainingScope === 'private'
    ? privateTrainingHorses
    : trainingScope === 'lesson'
      ? lessonTrainingHorses
      : [...privateTrainingHorses, ...lessonTrainingHorses];
  const opts = trainingPool.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
  const foalOpts = app.horses.filter((h) => h.age < 3).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
  panel.innerHTML = `
    <h2>Training Grounds + Clinic (free)</h2>
    <p class='small'>Training Mode: <strong>${trainingModeLabel()}</strong>. Change this in Settings.</p>
    <div class='box'>
      <label>Horse Source</label>
      <select id='train-horse-scope'>
        <option value='both' ${trainingScope === 'both' ? 'selected' : ''}>Both private + lesson horses</option>
        <option value='private' ${trainingScope === 'private' ? 'selected' : ''}>Private horses only</option>
        <option value='lesson' ${trainingScope === 'lesson' ? 'selected' : ''}>Lesson horses only</option>
      </select>
      <p class='small'>Choose whether training includes your stable horses, lesson horses, or both.</p>
    </div>
    ${app.trainingRpgSummary ? `<div class='box'><h3>Session Summary</h3>
      <p><strong>${app.trainingRpgSummary.horseName}</strong> — ${cap(app.trainingRpgSummary.discipline)}</p>
      <p>Skill change: ${app.trainingRpgSummary.skill >= 0 ? '+' : ''}${app.trainingRpgSummary.skill} | Confidence change: ${app.trainingRpgSummary.confidence >= 0 ? '+' : ''}${app.trainingRpgSummary.confidence} | Bond change: ${app.trainingRpgSummary.bond >= 0 ? '+' : ''}${app.trainingRpgSummary.bond} | Fatigue: +${app.trainingRpgSummary.fatigue}</p>
      <p>Notable event: ${app.trainingRpgSummary.notableEvent}</p>
      <p class='small'>${app.trainingRpgSummary.reflection}</p>
    </div>` : ''}
    <div class='grid two'>
      <div class='box'>
        <label>Horse</label><select id='train-horse'>${opts}</select>${opts ? '' : '<p class="small">No horses available for this filter.</p>'}
        <label>Discipline</label><select id='train-disc'>${Object.keys(SHOW_LEVELS).map((d) => `<option>${d}</option>`).join('')}</select>
        <label>Exercise</label><select id='train-ex'></select>
        <label>Longer Walk (repeats)</label><select id='train-rpg-walk'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Longer Trot (repeats)</label><select id='train-rpg-trot'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Longer Canter (repeats)</label><select id='train-rpg-canter'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Jump/Discipline Practice (repeats)</label><select id='train-rpg-discipline'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option></select>
        <label>Cooldown Repeats</label><select id='train-rpg-cooldown'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Controlability Work</label><select id='train-control'>
          <option>Flat Work</option><option>Hand Work</option><option>Sensitivity</option><option>Controlability</option><option>Manners</option>
        </select>
        <button id='do-train' ${trainingPool.length ? '' : 'disabled'}>Train (${app.settings?.trainingMode === 'normal' ? 'Normal' : 'Interactive RPG'})</button>
        <button id='do-control-train'>Controlability Session</button>
      </div>
      <div class='box'>
        <h3>Training Clinic</h3>
        <label>Discipline</label><select id='clinic-disc'>${Object.keys(SHOW_LEVELS).map((d) => `<option>${d}</option>`).join('')}</select>
        <button id='clinic'>Run Gold Clinic Evaluation</button>
      </div>
    </div>
    <div class='box'>
      <h3>Foal Handling / Breaking In</h3>
      ${foalOpts ? `<label>Foal</label><select id='foal-horse'>${foalOpts}</select>` : '<p class="small">No foals or breaking-in horses available.</p>'}
      <label>Exercise</label>
      <select id='foal-ex' ${foalOpts ? '' : 'disabled'}>
        <option>Weaning</option>
        <option>Lunging</option>
        <option>Petting</option>
        <option>Standing Still</option>
      </select>
      <button id='do-foal-train' ${foalOpts ? '' : 'disabled'}>Handle Foal</button>
      <p class='small'>Foal handling boosts behavior and gives tiny skill gains. Rescue horses flagged for breaking in must reach behavior 100 before normal training.</p>
    </div>
  `;

  const EXERCISES = {
    jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
    dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness'],
    hunter: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
    eventing: ['Collection', 'Connection', 'Rhythm', 'Striding', 'Confidence', 'Speed']
  };

  const disciplineSelect = document.getElementById('train-disc');
  const exerciseSelect = document.getElementById('train-ex');
  const horseSelect = document.getElementById('train-horse');
  const renderExercises = () => {
    const disc = disciplineSelect.value;
    exerciseSelect.innerHTML = EXERCISES[disc].map((e) => `<option>${e}</option>`).join('');
  };
  const applyTrainingSelection = () => {
    const selection = app.trainingSelection || { horseId: '', discipline: 'jumping', exercise: '' };
    if (!selection.horseId && trainingPool.length) selection.horseId = trainingPool[0].id;
    if (!EXERCISES[selection.discipline]) selection.discipline = 'jumping';
    horseSelect.value = selection.horseId || horseSelect.value;
    disciplineSelect.value = selection.discipline || disciplineSelect.value;
    renderExercises();
    const options = EXERCISES[disciplineSelect.value];
    if (!options.includes(selection.exercise)) selection.exercise = options[0];
    exerciseSelect.value = selection.exercise || exerciseSelect.value;
    app.trainingSelection = selection;
  };

  const updateSelection = () => {
    app.trainingSelection = {
      horseId: horseSelect.value,
      discipline: disciplineSelect.value,
      exercise: exerciseSelect.value
    };
  };

  disciplineSelect.onchange = () => {
    renderExercises();
    updateSelection();
  };
  horseSelect.onchange = updateSelection;
  exerciseSelect.onchange = updateSelection;
  const applyRpgConfigSelection = () => {
    app.trainingRpgConfig = normalizeTrainingRpgConfig(app.trainingRpgConfig);
    document.getElementById('train-rpg-walk').value = String(app.trainingRpgConfig.walk);
    document.getElementById('train-rpg-trot').value = String(app.trainingRpgConfig.trot);
    document.getElementById('train-rpg-canter').value = String(app.trainingRpgConfig.canter);
    document.getElementById('train-rpg-discipline').value = String(app.trainingRpgConfig.discipline);
    document.getElementById('train-rpg-cooldown').value = String(app.trainingRpgConfig.coolDown);
  };
  const updateRpgConfig = () => {
    app.trainingRpgConfig = normalizeTrainingRpgConfig({
      walk: document.getElementById('train-rpg-walk').value,
      trot: document.getElementById('train-rpg-trot').value,
      canter: document.getElementById('train-rpg-canter').value,
      discipline: document.getElementById('train-rpg-discipline').value,
      coolDown: document.getElementById('train-rpg-cooldown').value
    });
  };
  ['train-rpg-walk', 'train-rpg-trot', 'train-rpg-canter', 'train-rpg-discipline', 'train-rpg-cooldown'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) node.onchange = updateRpgConfig;
  });
  const horseScopeSelect = document.getElementById('train-horse-scope');
  if (horseScopeSelect) {
    horseScopeSelect.onchange = () => {
      app.trainingHorseScope = ['private', 'lesson', 'both'].includes(horseScopeSelect.value) ? horseScopeSelect.value : 'both';
      renderTraining();
    };
  }
  applyTrainingSelection();
  applyRpgConfigSelection();
  app.trainingClinicSelection = app.trainingClinicSelection || { discipline: 'jumping' };
  const clinicDiscSelect = document.getElementById('clinic-disc');
  if (clinicDiscSelect) {
    clinicDiscSelect.value = app.trainingClinicSelection.discipline || 'jumping';
    clinicDiscSelect.onchange = () => { app.trainingClinicSelection.discipline = clinicDiscSelect.value; };
  }

  document.getElementById('do-train').onclick = () => {
    const h = trainingPool.find((x) => x.id === horseSelect.value);
    const d = disciplineSelect.value;
    if (!h) return;
    if (h.age < 3) return alert('Foals and young horses should use Foal Handling until age 3.');
    if (h.unridable) return alert('This horse is unridable.');
    if (!canRideUnderSaddle(h)) return alert('This horse is unbroken/green and needs behavior 500 before under-saddle training.');
    if (h.isLessonHorse && !h.barnAvailable) return alert('This lesson horse is unavailable this month and cannot train.');
    if (h.illnesses.some((i) => i.active)) return alert('This horse is recovering and cannot train until fully healed.');
    h.managed.trained = true;
    h.trainingSessionsThisMonth = (h.trainingSessionsThisMonth || 0) + 1;
    h.manualTrainingThisMonth = true;
    if (app.settings?.trainingMode === 'normal') {
      applyNormalTrainingSession(h, d, exerciseSelect.value);
      render();
      return;
    }
    app.trainingRpg = buildTrainingRpgSession(h, d, app.trainingRpgConfig);
    renderTraining();
  };

  document.getElementById('do-control-train').onclick = () => {
    const h = trainingPool.find((x) => x.id === horseSelect.value);
    const focus = document.getElementById('train-control').value;
    if (!h) return;
    if (h.isLessonHorse && !h.barnAvailable) return alert('This lesson horse is unavailable this month and cannot train.');
    if (h.illnesses.some((i) => i.active)) return alert('This horse is recovering and cannot train until fully healed.');
    trainingControlabilitySession(h, focus);
    h.managed.trained = true;
    h.trainingSessionsThisMonth = (h.trainingSessionsThisMonth || 0) + 1;
    h.manualTrainingThisMonth = true;
    render();
  };

  document.getElementById('clinic').onclick = () => {
    const h = trainingPool.find((x) => x.id === horseSelect.value);
    const disc = document.getElementById('clinic-disc').value;
    app.trainingClinicSelection.discipline = disc;
    if (!h) return;
    const maxByPotential = SHOW_LEVELS[disc][highestAllowedLevelIndex(h, disc)];
    pushReport(`Clinic: ${h.name} ${cap(disc)} potential ${h.potential[disc]}%. Suggested current max level: ${maxByPotential}.`);
    if (h.potential[disc] >= 100) {
      h.titles = Array.isArray(h.titles) ? h.titles : [];
      if (!h.titles.includes('Young Hope')) h.titles.push('Young Hope');
    }
    render();
  };

  const foalButton = document.getElementById('do-foal-train');
  if (foalButton) {
    foalButton.onclick = () => {
      const foalId = document.getElementById('foal-horse')?.value;
      const foal = app.horses.find((x) => x.id === foalId);
      const ex = document.getElementById('foal-ex')?.value;
      if (!foal || !FOAL_TRAINING[ex]) return;
      if (foal.illnesses.some((i) => i.active)) {
        alert('This foal is recovering and cannot be handled yet.');
        return;
      }
      applyFoalHandling(foal, ex);
      pushReport(`${foal.name} completed foal handling: ${ex}.`);
      render();
    };
  }
}

function applyBarnActivity(horse, activity, options = {}) {
  if (!horse) return;
  const silent = options.silent === true;
  const log = (text) => {
    if (!silent) pushReport(text);
  };
  if (activity === 'groom') {
    horse.bond = clamp((horse.bond || 0) + 8, horse.isRescue ? -50 : 0, 100);
    horse.dailyGrooming = clamp((horse.dailyGrooming || 65) + 6, 0, 100);
    horse.barnActivityQuality = clamp((horse.barnActivityQuality || 0) + 2, 0, 10);
    log(`Barn: ${horse.name} was groomed by hand (+Bond, +QOL).`);
  }
  if (activity === 'clean-stall') {
    horse.stallCleanliness = clamp((horse.stallCleanliness || 65) + 8, 0, 100);
    horse.barnActivityQuality = clamp((horse.barnActivityQuality || 0) + 1, 0, 10);
    log(`Barn: ${horse.name}'s stall was cleaned.`);
  }
  if (activity === 'hand-graze') {
    horse.bond = clamp((horse.bond || 0) + 5, horse.isRescue ? -50 : 0, 100);
    horse.mood = pick(POSITIVE_MOODS);
    horse.barnActivityQuality = clamp((horse.barnActivityQuality || 0) + 2, 0, 10);
    log(`Barn: ${horse.name} enjoyed hand grazing (+Bond, mood improved).`);
  }
  if (activity === 'lunge') {
    horse.bond = clamp((horse.bond || 0) + 3, horse.isRescue ? -50 : 0, 100);
    horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
    horse.barnActivityQuality = clamp((horse.barnActivityQuality || 0) + 2, 0, 10);
    log(`Barn: ${horse.name} completed a lunging session.`);
  }
  if (activity === 'trail') {
    const variant = pick(BARN_TRAIL_VARIANTS);
    const choice = pick(variant.options);
    const quality = calculateHorseQualityOfLife(horse);
    const successChance = clamp(Math.round((choice.success * 0.25) + ((horse.bond || 0) * 0.35) + ((quality - 50) * 0.35) + (moodOutcomeModifier(horse.mood) * 2) + (personalityOutcomeModifier(horse.personality) * 1.5)), 10, 97);
    const partialChance = clamp(choice.neutral, 2, 95 - successChance);
    const roll = rnd(1, 100);
    const outcome = roll <= successChance ? 'success' : roll <= successChance + partialChance ? 'partial' : 'fail';
    const bondGain = outcome === 'success' ? 4 : outcome === 'partial' ? 2 : 1;
    const qGain = outcome === 'success' ? 4 : outcome === 'partial' ? 2 : 1;
    horse.bond = clamp((horse.bond || 0) + bondGain, horse.isRescue ? -50 : 0, 100);
    horse.barnActivityQuality = clamp((horse.barnActivityQuality || 0) + qGain, 0, 10);
    log(`Barn Trail: ${horse.name} — ${variant.title} (${outcome.toUpperCase()}: S${successChance}% / P${partialChance}% / F${100 - successChance - partialChance}%).`);
  }
  horse.qualityOfLife = calculateHorseQualityOfLife(horse);
}

function careForAllBarnHorses(horses) {
  const careActions = ['groom', 'clean-stall', 'hand-graze'];
  horses.forEach((horse) => {
    careActions.forEach((action) => applyBarnActivity(horse, action, { silent: true }));
  });
  pushReport(`Barn: Care for all completed for ${horses.length} horse(s).`);
}

function renderBarn() {
  ensureBarnState();
  const panel = document.getElementById('barn');
  if (!panel) return;
  const horses = app.horses.filter((h) => !h.retiredForever);
  const currentBarn = app.currentBarn;
  const lesson = ensureLessonRosterForBarn(currentBarn);
  const privateHorses = horses.filter((h) => h.owner === 'Your Stable' || h.isLeased);
  if (!privateHorses.some((h) => h.id === app.barnHorseSelectionId)) app.barnHorseSelectionId = '';
  const careStars = currentBarn?.careStars || 3;
  const facilityStars = currentBarn?.facilityStars || 3;
  const eventStars = currentBarn?.eventsStars || 3;
  const lessonStars = currentBarn?.lessonsStars || 3;
  const lessonAvailBase = lessonAvailabilityBase(lessonStars);
  const currentCountry = currentBarn?.country || 'USA';
  const filterDefault = currentCountry;
  panel.innerHTML = `
    <h2>Barn</h2>
    <div class='box'>
      <p><strong>Current Barn:</strong> ${currentBarn.name} | <strong>Location:</strong> ${currentBarn.country}, ${currentBarn.city}</p>
      <details>
        <summary>Open/Close: Star Rating</summary>
        <p class='small'>⭐ CARE RATING: ${starText(careStars)}</p>
        <p class='small'>⭐ FACILITY RATING: ${starText(facilityStars)} (Turnout ${barnFacilityTurnoutRange(facilityStars)[0]}-${barnFacilityTurnoutRange(facilityStars)[1]}h/day)</p>
        <p class='small'>⭐ EVENTS RATING: ${starText(eventStars)}</p>
        <p class='small'>⭐ LESSONS RATING: ${starText(lessonStars)} (base availability ${lessonAvailBase}%)</p>
      </details>
    </div>
    <div class='grid two'>
      <div class='box'>
        <h3>Lesson Horses (${lesson.length})</h3>
        ${lesson.length ? lesson.map((h) => `<p>${horseDisplayName(h)} — Available ${h.barnAvailabilityPercent || 0}% (${h.barnAvailable ? 'Available' : 'Not available'}) <button data-lesson-profile='${h.id}'>Profile</button></p>`).join('') : '<p class="small">No lesson horses currently listed.</p>'}
        <p class='small'>Pool size depends on facility stars (1-20 horses).</p>
      </div>
      <div class='box'>
        <h3>Private Horses</h3>
        <label>Horse</label>
        <select id='barn-horse'>
          <option value=''>Choose a horse…</option>
          ${privateHorses.map((h) => `<option value='${h.id}' ${app.barnHorseSelectionId === h.id ? 'selected' : ''}>${horseDisplayName(h)} (Bond ${Math.round(h.bond || 0)}%, QOL ${calculateHorseQualityOfLife(h)}%)</option>`).join('')}
        </select>
        <p class='small'>Selected horse stays locked after each action so you can repeat actions quickly.</p>
        <div class='inline'>
          <button data-barn='groom'>Groom</button>
          <button data-barn='clean-stall'>Clean Stall</button>
          <button data-barn='hand-graze'>Hand Graze</button>
          <button data-barn='care-all'>Care for all</button>
          <button data-barn='trail'>Trail Ride</button>
          <button data-barn='lunge'>Lunging Pen</button>
        </div>
      </div>
    </div>
    <div id='barn-lesson-profile'></div>
    <details class='box'>
      <summary>Switch / Board Barns (Open/Close)</summary>
      <p class='small'>Refresh barn list manually every 4 months.</p>
      <label>Filter</label>
      <select id='barn-filter-country'>
        <option value='${filterDefault}'>My Country (${filterDefault})</option>
        <option value='OTHER'>Other Country</option>
      </select>
      <button id='barn-refresh-list'>Refresh List</button>
      <div id='barn-catalog-list'></div>
    </details>
  `;
  panel.querySelectorAll('[data-barn]').forEach((btn) => {
    btn.onclick = () => {
      if (btn.dataset.barn === 'care-all') {
        if (!privateHorses.length) return;
        careForAllBarnHorses(privateHorses);
        app.barnHorseSelectionId = document.getElementById('barn-horse')?.value || app.barnHorseSelectionId;
        renderBarn();
        return;
      }
      const horseId = document.getElementById('barn-horse')?.value;
      if (!horseId) {
        alert('Choose a horse before using a barn action.');
        return;
      }
      const horse = horsesIncludingLessons().find((h) => h.id === horseId);
      if (!horse) return;
      applyBarnActivity(horse, btn.dataset.barn);
      app.barnHorseSelectionId = horseId;
      renderBarn();
    };
  });

  const barnHorseSelect = document.getElementById('barn-horse');
  if (barnHorseSelect) {
    barnHorseSelect.value = app.barnHorseSelectionId || '';
    barnHorseSelect.onchange = () => {
      app.barnHorseSelectionId = barnHorseSelect.value || '';
    };
  }

  panel.querySelectorAll('[data-lesson-profile]').forEach((btn) => {
    btn.onclick = () => {
      app.barnLessonSelectionId = btn.dataset.lessonProfile;
      renderBarn();
    };
  });

  const selectedLessonHorse = lesson.find((h) => h.id === app.barnLessonSelectionId) || lesson[0];
  const lessonWrap = document.getElementById('barn-lesson-profile');
  if (selectedLessonHorse && lessonWrap) {
    lessonWrap.className = 'box';
    const leaseVisible = (app.currentBarn?.lessonsStars || 3) >= 3;
    lessonWrap.innerHTML = `<h3>${selectedLessonHorse.name} — Lesson Horse Profile</h3>${horseProfileMarkup(selectedLessonHorse)}
      <div class='inline'>
        <button id='lesson-train-btn' ${selectedLessonHorse.barnAvailable ? '' : 'disabled'}>Train</button>
        ${leaseVisible ? `<button id='lesson-lease-btn' ${selectedLessonHorse.barnAvailable ? '' : 'disabled'}>Lease</button>` : ''}
      </div>
      <p class='small'>${selectedLessonHorse.barnAvailable ? 'Available for this month.' : 'Visible but unavailable this month (cannot train or compete).'}</p>`;
    const trainBtn = document.getElementById('lesson-train-btn');
    if (trainBtn) trainBtn.onclick = () => {
      app.trainingSelection = app.trainingSelection || { horseId: '', discipline: 'jumping', exercise: '' };
      app.trainingSelection.horseId = selectedLessonHorse.id;
      changeTab('training');
    };
    const leaseBtn = document.getElementById('lesson-lease-btn');
    if (leaseBtn) leaseBtn.onclick = () => {
      const alreadyLeased = app.horses.some((h) => h.isLeased && h.leaseSourceId === selectedLessonHorse.id && !h.retiredForever);
      if (alreadyLeased) return alert('You already have an active lease for this lesson horse.');
      const leaseDuration = rnd(5, 15);
      const leaseMonthlyCost = rnd(250, 2500);
      const leasedHorse = {
        ...JSON.parse(JSON.stringify(selectedLessonHorse)),
        id: uid(),
        owner: 'Your Stable',
        isLeased: true,
        leaseSourceId: selectedLessonHorse.id,
        leaseLocked: true,
        leaseMonthlyCost,
        leaseDurationMonths: leaseDuration,
        leaseMonthsRemaining: leaseDuration
      };
      app.horses.push(leasedHorse);
      selectedLessonHorse.barnAvailable = false;
      pushReport(`Leased ${selectedLessonHorse.name} for ${leaseDuration} month(s) at ${money(leaseMonthlyCost)}/month. Leased horses can train/show but feed/tack/turnout are locked.`);
      render();
    };
  }

  const renderCatalogList = () => {
    const filter = document.getElementById('barn-filter-country')?.value || filterDefault;
    const list = app.barnCatalog.filter((b) => (filter === 'OTHER' ? b.country !== currentCountry : b.country === currentCountry));
    const wrap = document.getElementById('barn-catalog-list');
    if (!wrap) return;
    wrap.innerHTML = list.map((barn) => {
      const moveCost = transportCost(currentCountry, barn.country);
      const horseOptions = privateHorses.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
      return `<div class='box'>
        <p><strong>${barn.name}</strong></p>
        <p class='small'>Location: ${barn.country}, ${barn.city} | Move fee: ${money(moveCost)}</p>
        <p class='small'>Care ${starText(barn.careStars)} | Events ${starText(barn.eventsStars)} | Lessons ${starText(barn.lessonsStars)} | Facility ${starText(barn.facilityStars)}</p>
        <p class='small'>Monthly Board: ${money(barn.boardPerHorse)} per horse</p>
        <label>Horse for board</label>
        <select data-board-horse='${barn.id}'>${horseOptions}</select>
        <div class='inline'>
          <button data-board-one='${barn.id}'>Board Selected</button>
          <button data-board-all='${barn.id}'>Board All</button>
        </div>
      </div>`;
    }).join('') || '<p class="small">No barns for this filter.</p>';

    wrap.querySelectorAll('[data-board-one]').forEach((btn) => {
      btn.onclick = () => {
        const barn = app.barnCatalog.find((b) => b.id === btn.dataset.boardOne);
        if (!barn) return;
        const horseId = wrap.querySelector(`[data-board-horse='${barn.id}']`)?.value;
        const horse = horsesIncludingLessons().find((h) => h.id === horseId);
        if (!horse) return;
        const moveCost = transportCost(currentCountry, barn.country);
        if (!tryCharge(moveCost + barn.boardPerHorse)) return;
        app.currentBarn = { ...barn };
        horse.boardingBarnId = barn.id;
        ensureLessonRosterForBarn(app.currentBarn, true);
        pushReport(`${horse.name} boarded at ${barn.name}. Fees paid: ${money(moveCost + barn.boardPerHorse)}.`);
        refreshBarnShows();
        renderBarn();
      };
    });
    wrap.querySelectorAll('[data-board-all]').forEach((btn) => {
      btn.onclick = () => {
        const barn = app.barnCatalog.find((b) => b.id === btn.dataset.boardAll);
        if (!barn) return;
        const count = privateHorses.length;
        const moveCost = transportCost(currentCountry, barn.country);
        const total = moveCost + (barn.boardPerHorse * count);
        if (!tryCharge(total)) return;
        app.currentBarn = { ...barn };
        privateHorses.forEach((h) => { h.boardingBarnId = barn.id; });
        ensureLessonRosterForBarn(app.currentBarn, true);
        pushReport(`All horses boarded at ${barn.name}. Fees paid: ${money(total)}.`);
        refreshBarnShows();
        renderBarn();
      };
    });
  };

  document.getElementById('barn-filter-country').onchange = renderCatalogList;
  document.getElementById('barn-refresh-list').onclick = () => {
    const refreshed = refreshBarnCatalog(true);
    if (refreshed) pushReport('Barn catalog refreshed manually.');
    renderCatalogList();
  };
  renderCatalogList();
}


function processAgingAndMortality(horse) {
  if (horse.age < 25) return false;
  const chance = horse.age === 25 ? 8 : horse.age === 26 ? 14 : horse.age === 27 ? 24 : horse.age === 28 ? 35 : horse.age === 29 ? 55 : 85;
  if (rnd(1, 100) <= chance) {
    pushReport(`${horse.name} passed away from old age at ${horse.age}.`);
    return true;
  }
  return false;
}

function monthlyProgress() {
  ensureBarnState();
  app.day = 1;
  app.hour = 0;
  app.month += 1;
  if (app.month > 12) {
    app.month = 1;
    app.year += 1;
    app.horses.forEach((h) => {
      h.age += 1;
      h.due.checkup = true;
      h.overTrainingCountYear = 0;
      h.wrongFeedMonthsYear = 0;
      h.injuryCountYear = 0;
      h.healthTrackingYear = app.year;
      if (!h.retiredForever && !h.retiredToBreeding) {
        h.soundnessYears = Math.max(0, (h.soundnessYears ?? 0) - 1);
      }
    });
  }

  const survivors = [];
  const newborns = [];
  const conformationBreedPlacings = new Set();
  app.horses.forEach((h) => {
    processPregnancy(h, newborns);
    if (h.foalVitality && Number.isFinite(h.foalVitality.ageDays)) h.foalVitality.ageDays += 30;
    applyStablehandCare(h);
    maybeAddRandomIllness(h);
    if (h.deceased) {
      return;
    }
    h.illnesses.forEach((i) => {
      if (i.active && i.remaining > 0) i.remaining -= 1;
      if (i.active && i.remaining > 0 && h.healingBoost) i.remaining -= 1;
      if (i.active && i.remaining <= 0) {
        i.active = false;
        if (i.retirementRisk && rnd(1, 100) <= i.retirementRisk) {
          h.retiredToBreeding = true;
          pushReport(`${h.name} recovered from ${i.name} but was retired to breeding due to lasting issues.`);
        }
      }
    });
    applySoundnessWear(h);
    applyAutoTraining(h);
    const monthsSinceFarrier = app.year * 12 + app.month - (h.lastFarrierMonth || 0);
    h.due.farrier = monthsSinceFarrier >= 6;
    h.managed = { fed: false, vet: false, farrier: !h.due.farrier, showEntry: false, breedersEntry: false, trained: false };
    h.breedersEntries = 0;
    h.offspring.forEach((o) => { if (app.month === 1) o.age += 1; });
    if ((app.currentBarn?.careStars || 3) > 3) {
      if (h.autoStallCleaning) h.stallCleanliness = clamp((h.stallCleanliness || 65) + 8, 0, 100);
      if (h.autoGrooming) h.dailyGrooming = clamp((h.dailyGrooming || 65) + 8, 0, 100);
    }
    updateMonthlyCare(h);
    updateBondMonthly(h);
    h.barnActivityQuality = 0;
    maybeAddOvertrainingInjury(h);
    applyStablehandCare(h);
    resolvePendingCompetitions(h);
    resolvePendingConformationShows(h, conformationBreedPlacings);
    if (!processAgingAndMortality(h)) {
      if (h.isLeased && Number.isFinite(h.leaseMonthsRemaining)) {
        const leaseMonthlyCost = Number(h.leaseMonthlyCost) || 0;
        if (leaseMonthlyCost > 0) {
          if (app.money >= leaseMonthlyCost) {
            app.money -= leaseMonthlyCost;
            pushReport(`Lease fee paid for ${h.name}: ${money(leaseMonthlyCost)}.`);
          } else {
            releaseLeasedHorseToLessonProgram(h);
            pushReport(`Lease for ${h.name} ended early because you could not pay ${money(leaseMonthlyCost)} this month.`);
            return;
          }
        }
        h.leaseMonthsRemaining = Math.max(0, h.leaseMonthsRemaining - 1);
        if (h.leaseMonthsRemaining <= 0) {
          releaseLeasedHorseToLessonProgram(h);
          pushReport(`${h.name}'s lease ended and the horse returned to the lesson program.`);
          return;
        }
      }
      survivors.push(h);
    }
  });
  app.horses = survivors.concat(newborns);
  Object.values(app.lessonHorsesByBarn || {}).forEach((roster) => {
    if (!Array.isArray(roster)) return;
    roster.forEach((h) => {
      resolvePendingCompetitions(h);
      h.trainingSessionsThisMonth = 0;
      h.handTrainingSessionsThisMonth = 0;
      h.showEntriesThisMonth = 0;
    });
  });
  const boardedHorses = app.horses.filter((h) => !h.retiredForever).length;
  const monthlyBoard = (app.currentBarn?.boardPerHorse || 0) * boardedHorses;
  if (monthlyBoard > 0) {
    app.money -= monthlyBoard;
    pushReport(`Monthly board paid at ${app.currentBarn.name}: ${money(monthlyBoard)} (${boardedHorses} horse(s)).`);
  }
  app.upcomingEvents = (app.upcomingEvents || []).map((event) => ({
    ...event,
    isUpcomingEvent: true,
    monthsUntilStart: Math.max(0, (Number(event.monthsUntilStart) || 0) - 1)
  }));
  const eventsHappeningNow = app.upcomingEvents.filter((event) => event.monthsUntilStart <= 0).map((event) => ({
    ...event,
    id: uid(),
    isUpcomingEvent: false,
    month: app.month,
    year: app.year
  }));
  if (eventsHappeningNow.length) {
    eventsHappeningNow.forEach((event) => {
      pushReport(`Upcoming event is now live: ${cap(event.discipline)} ${event.level} at ${event.barnName}.`);
    });
  }
  app.upcomingEvents = app.upcomingEvents.filter((event) => event.monthsUntilStart > 0);
  refreshBarnShows();
  const targetShowCount = rnd(3, 10);
  app.barnShows = [...eventsHappeningNow, ...(app.barnShows || [])].slice(0, targetShowCount);
  while (app.barnShows.length < 3) {
    const fallbackShow = createBarnShowEvent({ maxSkill: 100 });
    if (!fallbackShow) break;
    app.barnShows.push(fallbackShow);
  }
  ensureUpcomingEventsPool();
  ensureLessonRosterForBarn(app.currentBarn, true);
  app.closedReminderIds = [];
  refreshNpcAds();
  refreshRescueHorses();
}


function reminderDueThisMonth(reminder) {
  const monthIndex = currentMonthIndex();
  if (reminder.repeatEveryMonths > 0) {
    if (monthIndex < reminder.startMonthIndex) return false;
    return (monthIndex - reminder.startMonthIndex) % reminder.repeatEveryMonths === 0;
  }
  if (Number.isFinite(reminder.year) && Number.isFinite(reminder.month)) {
    return reminder.year === app.year && reminder.month === app.month;
  }
  if (Number.isFinite(reminder.onceMonth)) {
    return reminder.onceMonth === app.month;
  }
  return false;
}

function activeRemindersForCurrentMonth() {
  const closed = new Set(app.closedReminderIds || []);
  return (app.calendarReminders || []).filter((r) => reminderDueThisMonth(r) && !closed.has(r.id));
}

function conformationMoodScore(horse) {
  const map = { Motivated: 9.4, Happy: 8.8, 'Try-Hard': 8.2, Neutral: 6.8, Moody: 5.1, Anxious: 4.4, Lazy: 4.2, Angry: 3.2 };
  return clamp(map[horse.mood] || 6.5, 1, 10);
}

function conformationBodyScore(horse) {
  const map = { 'Very Underweight': 2, Underweight: 4, Moderate: 10, Fleshy: 6.5, Overweight: 3.5 };
  return clamp(map[horse.weightStatus] || 6, 1, 10);
}

function conformationTypeScore(horse) {
  const map = { 'Very Bad': 2.2, Bad: 4.1, Acceptable: 5.9, Good: 7.2, 'Very Good': 8.7, Excellent: 9.8 };
  return clamp(map[horse.conformation] || 6, 1, 10);
}

function conformationPersonalityScore(horse) {
  const map = { 'Bomb-proof': 9.2, 'Easy-Going': 8.5, Energetic: 7, Lazy: 5.4, Unfocused: 4.7, Spooky: 4.3, Stubborn: 4.2, 'Hot-Blooded': 3.7, Excitable: 4.1 };
  return clamp(map[horse.personality] || 6, 1, 10);
}

function registerConformationShow(horse, typeKey) {
  if (!horse) return;
  if (!['Mare', 'Stallion'].includes(horse.gender)) return alert('Only mares and stallions can participate.');
  const type = CONFORMATION_SHOW_TYPES.find((x) => x.key === typeKey);
  if (!type) return;
  if (type.specialMonth && app.month !== type.specialMonth) return alert('Horse Of The Year is only available in month 12.');
  if (!pregnancyStage(horse).canCompete) return alert('Pregnant mares past 90 days cannot enter conformation shows.');
  horse.pendingConformationShows = Array.isArray(horse.pendingConformationShows) ? horse.pendingConformationShows : [];
  if (horse.pendingConformationShows.some((entry) => entry.monthIndex === currentMonthIndex())) return alert('This horse is already entered this month.');
  horse.pendingConformationShows.push({
    id: uid(),
    monthIndex: currentMonthIndex(),
    date: dateLabel(),
    type: type.key,
    label: type.label,
    slots: rnd(type.slots[0], type.slots[1])
  });
  pushReport(`${horse.name} entered ${type.label}. Results will arrive next month.`);
}

function resolvePendingConformationShows(horse, monthlyBreedPlaced) {
  const currentIndex = currentMonthIndex();
  const pending = Array.isArray(horse.pendingConformationShows) ? horse.pendingConformationShows : [];
  const due = pending.filter((entry) => entry.monthIndex < currentIndex);
  horse.pendingConformationShows = pending.filter((entry) => entry.monthIndex >= currentIndex);
  if (!due.length) return;
  horse.topWins = horse.topWins || { mareFilly: 0, breed: 0, overall: 0, highestScore: 0 };
  horse.conformationWins = horse.conformationWins || { goldenFirsts: 0 };
  due.forEach((entry) => {
    const showType = CONFORMATION_SHOW_TYPES.find((x) => x.key === entry.type) || CONFORMATION_SHOW_TYPES[0];
    const mood = conformationMoodScore(horse);
    const conf = conformationTypeScore(horse);
    const weight = conformationBodyScore(horse);
    const personality = conformationPersonalityScore(horse);
    const qol = clamp((horse.qualityOfLife || 65) / 10, 1, 10);
    const randomLight = rnd(-3, 3) / 10;
    const scoreRaw = (mood * 0.24) + (conf * 0.29) + (weight * 0.22) + (personality * 0.08) + (qol * 0.15) + randomLight;
    const score = clamp(Number(scoreRaw.toFixed(2)), 1, 10);
    const fieldSize = entry.slots || rnd(8, 10);
    const placing = score >= (8.9 * showType.difficulty) ? 1 : score >= (8.1 * showType.difficulty) ? 2 : score >= (7.4 * showType.difficulty) ? 3 : rnd(4, fieldSize);
    const breedKey = `${app.year}-${app.month}-${horse.breed}`;
    const breedPlacedAlready = monthlyBreedPlaced.has(breedKey);
    const earnedBreedPlace = !breedPlacedAlready && placing <= 3;
    if (earnedBreedPlace) monthlyBreedPlaced.add(breedKey);
    const prize = placing <= 3 ? rnd(showType.feeMin, showType.feeMax) : 0;
    if (prize) {
      app.money += prize;
      horse.earnings += prize;
    }
    if (placing === 1) {
      horse.topWins.mareFilly += 1;
      horse.topWins.overall += 1;
      if (earnedBreedPlace) horse.topWins.breed += 1;
      if (entry.type === 'golden') horse.conformationWins.goldenFirsts += 1;
      if (entry.type === 'hoy') {
        const valueBoost = rnd(80000, 120000);
        horse.earnings += valueBoost;
        horse.titles = Array.isArray(horse.titles) ? horse.titles : [];
        if (!horse.titles.includes('Global Beauty')) horse.titles.push('Global Beauty');
      }
    }
    horse.showResults = Array.isArray(horse.showResults) ? horse.showResults : [];
    horse.showResults.push({ date: dateLabel(), discipline: 'conformation', level: entry.label, score, placing, prize, resultText: `${score.toFixed(2)}/10` });
    pushCompetitionReport({
      horseName: horseDisplayName(horse),
      horseBreed: horse.breed,
      discipline: 'conformation',
      level: entry.label,
      placing,
      fieldSize,
      competitionName: entry.label,
      penaltiesText: 'N/A',
      timeScoreText: `${score.toFixed(2)}/10`,
      date: dateLabel(),
      highlights: [
        `Mood ${mood.toFixed(1)}/10`,
        `Type ${conf.toFixed(1)}/10`,
        `Body ${weight.toFixed(1)}/10`,
        `Personality ${personality.toFixed(1)}/10`,
        `Quality of life ${qol.toFixed(1)}/10`
      ],
      comment: `Overall conformation score: ${score.toFixed(2)}/10.`,
      suggestion: 'Keep quality of life and body condition stable to maintain strong conformation placements.',
      conformationBreakdown: {
        mood: Number(mood.toFixed(1)),
        type: Number(conf.toFixed(1)),
        body: Number(weight.toFixed(1)),
        personality: Number(personality.toFixed(1)),
        qualityOfLife: Number(qol.toFixed(1)),
        random: Number(randomLight.toFixed(1))
      }
    });
    pushReport(`${horse.name} ${entry.label}: placed #${placing}/${fieldSize} with ${score.toFixed(2)}. ${prize ? `Won ${money(prize)}.` : 'No prize this time.'}`);
    updateHorseTitles(horse);
  });
}



function registryInspectionScore(horse) {
  const conformationMap = { 'Very Bad': 2.5, Bad: 4, Acceptable: 5.6, Good: 7, 'Very Good': 8.5, Excellent: 9.6 };
  const baseConformation = conformationMap[horse.conformation] || 5;
  const conditionMap = {
    'Very Underweight': 2.2,
    Underweight: 4,
    Moderate: 9.5,
    Fleshy: 6.5,
    Overweight: 3.8
  };
  const behaviorScore = clamp(((horse.behavior || 0) / 1000) * 10, 1, 10);
  const weightScore = conditionMap[horse.weightStatus] || 5.5;
  const conditionScore = clamp(((weightScore * 0.8) + (behaviorScore * 0.2)), 1, 10);
  const purity = breedPurityPercent(horse.breed);
  const isSportCross = purity < 100;
  const pedigreeScore = isSportCross ? null : clamp(2 + (purity * 0.08), 1, 10);
  const potentialScore = clamp((Object.values(horse.potential || {}).reduce((sum, v) => sum + v, 0) / Math.max(1, Object.keys(horse.potential || {}).length)) / 10, 1, 10);
  const scored = [baseConformation, conditionScore, potentialScore, pedigreeScore].filter((v) => v != null);
  const totalScore = Number((scored.reduce((sum, value) => sum + value, 0) / Math.max(1, scored.length)).toFixed(2));
  const result = totalScore < 5 ? 'Fail' : 'Pass';
  const title = totalScore >= 9.5 ? 'Elite' : (totalScore >= 8 && totalScore <= 9) ? 'Golden' : '';
  const registry = BREED_BRANDINGS[horse.breed] ? horse.breed : 'Cross-Breed';
  return {
    conformationScore: baseConformation,
    conditionScore,
    pedigreeScore,
    potentialScore,
    totalScore,
    result,
    title,
    branding: BREED_BRANDINGS[registry] || '',
    registry,
    isSportCross,
    breakdown: {
      conformation: horse.conformation,
      behavior: horse.behavior || 0,
      weightStatus: horse.weightStatus || 'Unknown',
      purity
    }
  };
}

function runRegistryInspection(horse) {
  if (!horse) return;
  if (!['Mare', 'Stallion'].includes(horse.gender)) return alert('Only mares and stallions can participate in conformation inspection.');
  if (horse.registryInspection) return alert('This horse already completed a lifetime inspection.');
  const scored = registryInspectionScore(horse);
  horse.registryInspection = {
    registry: scored.registry,
    result: scored.result,
    totalScore: scored.totalScore,
    conformation: scored.conformationScore,
    condition: scored.conditionScore,
    pedigree: scored.pedigreeScore,
    potential: scored.potentialScore,
    title: scored.title,
    branding: scored.result === 'Pass' ? scored.branding : '',
    brandingPlacement: 'end',
    breakdown: scored.breakdown
  };
  if (scored.result === 'Pass' && scored.branding) {
    const placement = prompt(`Congratulations, ${horse.name} has received branding ${scored.branding}. Please choose its placing. (front/end)`, 'end');
    horse.registryInspection.brandingPlacement = String(placement || 'end').toLowerCase() === 'front' ? 'front' : 'end';
  }
  const titleText = scored.title ? ` ${scored.title} Champion title unlocked.` : '';
  pushReport(`${horse.name} inspection result: ${scored.result} (${scored.totalScore}).${titleText}`);
}

function renderRigistries() {
  return renderRegistries();
}

function renderRegistries() {
  const panel = document.getElementById('registries');
  if (!panel) return;
  const horses = app.horses.filter((h) => !h.retiredForever);
  const conformationTypes = CONFORMATION_SHOW_TYPES.filter((t) => !t.specialMonth || t.specialMonth === app.month);
  panel.innerHTML = `
    <h2>Registries</h2>
    <div class='box'>
      <p class='small'>Conformation inspection can be completed once per horse lifetime. Only mares and stallions can enter.</p>
      <p class='small'>Conformation shows return results next month and enter both Gender and Breed divisions together.</p>
      ${horses.length ? horses.map((h) => {
        const reg = h.registryInspection;
        const resultLine = reg ? `${reg.registry || h.breed}: ${reg.result} (${reg.totalScore?.toFixed?.(2) ?? reg.totalScore})` : 'Not inspected yet';
        const detail = reg && h.showInspectionDetails
          ? `<div class='box'><p class='small'>Conformation: ${reg.conformation.toFixed(1)} (${reg.breakdown?.conformation || h.conformation})</p><p class='small'>Condition: ${reg.condition.toFixed(1)} (Weight ${reg.breakdown?.weightStatus || h.weightStatus || 'Unknown'}, Behavior ${reg.breakdown?.behavior || 0})</p><p class='small'>Pedigree: ${reg.pedigree == null ? 'N/A (Sport Cross)' : reg.pedigree.toFixed(1)}</p><p class='small'>Potential: ${reg.potential.toFixed(1)}</p></div>`
          : '';
        const pendingShows = (h.pendingConformationShows || []).filter((x) => x.monthIndex === currentMonthIndex()).length;
        const showButtons = ['Mare', 'Stallion'].includes(h.gender)
          ? conformationTypes.map((t) => `<button data-reg-conformation='${h.id}' data-reg-show='${t.key}'>Register ${t.label}</button>`).join('')
          : '<p class="small">Only mares and stallions can participate.</p>';
        return `<div class='box'>
          <p><strong>${horseDisplayName(h)}</strong> — ${resultLine}</p>
          <p class='small'>Gender: ${h.gender} • Age: ${h.age} • Conformation: ${h.conformation} • Pending conformation entries this month: ${pendingShows}</p>
          <button data-reg-inspect='${h.id}' ${reg ? 'disabled' : ''}>${reg ? 'Inspection Complete' : 'Run Inspection'}</button>
          ${reg ? `<button data-reg-details='${h.id}'>${h.showInspectionDetails ? 'Hide Breakdown' : 'Show Breakdown'}</button>` : ''}
          <div class='inline'>${showButtons}</div>
          ${detail}
        </div>`;
      }).join('') : '<p class="small">No horses in your stable.</p>'}
    </div>
  `;
  panel.querySelectorAll('[data-reg-inspect]').forEach((btn) => {
    btn.onclick = () => {
      const horse = app.horses.find((h) => h.id === btn.dataset.regInspect);
      if (!horse) return;
      runRegistryInspection(horse);
      renderRegistries();
      renderHorses();
    };
  });
  panel.querySelectorAll('[data-reg-details]').forEach((btn) => {
    btn.onclick = () => {
      const horse = app.horses.find((h) => h.id === btn.dataset.regDetails);
      if (!horse?.registryInspection) return;
      horse.showInspectionDetails = !horse.showInspectionDetails;
      renderRegistries();
    };
  });
  panel.querySelectorAll('[data-reg-conformation]').forEach((btn) => {
    btn.onclick = () => {
      const horse = app.horses.find((h) => h.id === btn.dataset.regConformation);
      if (!horse) return;
      registerConformationShow(horse, btn.dataset.regShow);
      renderRegistries();
      renderCalendar();
      renderHorses();
    };
  });
}

function renderBreeders() {
  const panel = document.getElementById('breeders');
  if (!panel) return;
  const mares = app.horses.filter((h) => h.gender === 'Mare' && !h.retiredForever);
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  panel.innerHTML = `
    <h2>Breeders Board</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Mares</h3>
        ${mares.length ? mares.map((h) => `<p>${horseDisplayName(h)} — Potential J:${h.potential?.jumping || 0}% D:${h.potential?.dressage || 0}%</p>`).join('') : '<p class="small">No mares available.</p>'}
      </div>
      <div class='box'>
        <h3>Stallions</h3>
        ${stallions.length ? stallions.map((h) => `<p>${horseDisplayName(h)} — Potential J:${h.potential?.jumping || 0}% D:${h.potential?.dressage || 0}%</p>`).join('') : '<p class="small">No stallions available.</p>'}
      </div>
    </div>
    <p class='small'>Use Vet and Breeding tabs to perform breeding procedures.</p>
  `;
}

function renderFreezer() {
  const panel = document.getElementById('freezer');
  if (!panel) return;
  panel.innerHTML = `
    <h2>Freezer</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Semen Straws (${app.semenStraws.length})</h3>
        ${app.semenStraws.length ? app.semenStraws.map((s) => `<p>${s.stallionName} <span class='small'>(${s.id})</span> <button data-remove-straw='${s.id}'>Remove</button></p>`).join('') : '<p class="small">No semen straws stored.</p>'}
      </div>
      <div class='box'>
        <h3>Embryos (${app.embryos.length})</h3>
        ${app.embryos.length ? app.embryos.map((e) => `<p>${e.donor} × ${e.sire} <span class='small'>(${e.id})</span></p>`).join('') : '<p class="small">No embryos stored.</p>'}
      </div>
    </div>
  `;
  panel.querySelectorAll('[data-remove-straw]').forEach((btn) => {
    btn.onclick = () => {
      app.semenStraws = app.semenStraws.filter((s) => s.id !== btn.dataset.removeStraw);
      renderFreezer();
      saveGame(false);
    };
  });
}

function renderRescue() {
  const panel = document.getElementById('rescue');
  if (!panel) return;
  app.rescueHorses = Array.isArray(app.rescueHorses) ? app.rescueHorses : [];
  panel.innerHTML = `
    <h2>Rescue</h2>
    <div class='box'>
      <p class='small'>15 rescue horses rotate individually when their deadline passes (1-8 months). Rescue horses are only listed here.</p>
      ${app.rescueHorses.length ? app.rescueHorses.map((h) => `
        <div class='box'>
          <p><strong>Horse Name:</strong> ${h.name}</p>
          <p class='small'><strong>Age Range:</strong> ${h.ageLabel}</p>
          <p class='small'><strong>Breed:</strong> ${h.breed}</p>
          <p class='small'><strong>Gender:</strong> ${h.gender}</p>
          <p class='small'><strong>Health:</strong> ${(h.issues || []).map((i) => `${i.name} (${i.severity})`).join(', ') || 'No listed injury'}</p>
          <p class='small'><strong>Months Left:</strong> ${h.deadlineMonths || Math.max(1, h.deadlineMonthIndex - currentMonthIndex())}</p>
          <p class='small'><strong>Price:</strong> ${money(h.rescueFee || 0)}</p>
          <p class='small'><strong>Note:</strong> ${h.note}</p>
          <button data-rescue='${h.id}'>Adopt</button>
        </div>
      `).join('') : '<p class="small">No rescue horses currently available.</p>'}
    </div>
  `;
  panel.querySelectorAll('[data-rescue]').forEach((btn) => {
    btn.onclick = () => {
      const rescueTemplate = app.rescueHorses.find((h) => h.id === btn.dataset.rescue);
      if (!rescueTemplate) return;
      const fee = rescueTemplate.rescueFee || 0;
      if (!tryCharge(fee)) return;
      const horse = baseHorse('untrained', 'npc');
      horse.name = rescueTemplate.name;
      horse.age = rescueTemplate.age;
      horse.breed = rescueTemplate.breed || horse.breed;
      horse.gender = rescueTemplate.gender;
      horse.weightStatus = rescueTemplate.weightStatus;
      horse.owner = 'Your Stable';
      horse.isRescue = true;
      horse.rescueId = rescueTemplate.id;
      horse.requiresBreakingIn = rescueTemplate.isGreen;
      if (horse.requiresBreakingIn || horse.bredBy === 'Your Stable') horse.behavior = rnd(0, 450);
      horse.rescueWeightDelay = rescueTemplate.rescueWeightDelay || rnd(4, 12);
      horse.illnesses = (rescueTemplate.issues || []).map((issue) => ({
        name: issue.name,
        impact: 12,
        remaining: rnd(2, 8),
        active: true,
        severity: issue.severity || 'Medium',
        retirementRisk: issue.name === 'Kissing Spines' ? 30 : 8,
        hidden: rnd(1, 100) <= 40
      }));
      horse.unridable = rescueTemplate.unridable === true;
      if (horse.unridable) {
        pushReport(`${horse.name} has Kissing Spines and is currently unridable. This horse is unridable.`);
      }
      horse.mood = rnd(1, 100) <= 95 ? pick(NEGATIVE_MOODS) : horse.mood;
      horse.bond = -50;
      app.horses.push(horse);
      app.rescueHorses = app.rescueHorses.filter((h) => h.id !== rescueTemplate.id);
      pushReport(`Adopted rescue horse ${horse.name} for ${money(fee)}.`);
      renderRescue();
      renderHorses();
    };
  });
}

function renderCalendar() {
  ensureBarnState();
  const reminders = app.calendarReminders || [];
  const shows = app.barnShows || [];
  const upcomingEvents = (app.upcomingEvents || []).slice().sort((a, b) => (a.monthsUntilStart || 0) - (b.monthsUntilStart || 0));
  const conformationTypes = CONFORMATION_SHOW_TYPES.filter((t) => !t.specialMonth || t.specialMonth === app.month);
  const conformationEntries = app.horses.flatMap((h) => (h.pendingConformationShows || []).filter((e) => e.monthIndex === currentMonthIndex()).map((e) => `${horseDisplayName(h)} — ${e.label}`));
  document.getElementById('calendar').innerHTML = `
    <h2>Calendar</h2>
    <div class='box'>
      <label>Type</label>
      <select id='cal-type'><option>Vet Check</option><option>Farrier</option><option>Feed Change</option><option>Custom Note</option></select>
      <label>Note</label><input id='cal-note' type='text' placeholder='Written by hand note' />
      <label>Schedule</label>
      <select id='cal-schedule'>
        <option value='date'>On Date (Y/M)</option>
        <option value='repeat'>Every X Months</option>
        <option value='yearly'>Once a Year (Month)</option>
      </select>
      <label>Year</label><input id='cal-year' type='number' min='1' value='${app.year}' />
      <label>Month</label><input id='cal-month' type='number' min='1' max='12' value='${app.month}' />
      <label>Every X Months</label><input id='cal-every' type='number' min='1' max='24' value='3' />
      <button id='cal-add'>Add Reminder</button>
    </div>
    <div class='cards'>
      ${reminders.map((r) => `<div class='box'><h3>${r.type}</h3><p>${r.note || '-'}</p><p class='small'>${r.scheduleText}</p><button data-cal-del='${r.id}'>Delete</button></div>`).join('') || '<p class="small">No reminders yet.</p>'}
    </div>
    <div class='box'>
      <h3>Events Happening Right Now</h3>
      ${shows.map((show) => {
        const tCost = showTransportFee(show);
        return `<div class='box'>
          <p><strong>Location:</strong> ${show.barnName} | ${show.country}/${show.city}</p>
          <p class='small'><strong>Show Fee:</strong> ${money(show.fee)} | <strong>Transport Fee:</strong> ${money(tCost)}</p>
          <p class='small'><strong>Discipline:</strong> ${cap(show.discipline)} | <strong>Discipline Level:</strong> ${show.level} | <strong>Max Skill:</strong> ${show.maxSkill}</p>
          <label>Horse</label>
          <select data-show-horse='${show.id}'>
            ${competitionEligibleHorses().filter((h) => !h.retiredForever && canCompeteUnderSaddle(h)).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}
          </select>
          <button data-show-signup='${show.id}'>Sign Up</button>
        </div>`;
      }).join('') || '<p class="small">No upcoming shows listed at this time.</p>'}
    </div>

    <div class='box'>
      <h3>Conformation Shows</h3>
      <p class='small'>Available now: ${conformationTypes.map((t) => t.label).join(', ') || 'None this month'}.</p>
      <p class='small'>Register from Registries. Results arrive next month. Horse Of The Year appears in month 12.</p>
      ${conformationEntries.length ? conformationEntries.map((line) => `<p class='small'>${line}</p>`).join('') : '<p class="small">No conformation registrations this month.</p>'}
    </div>

    <div class='box'>
      <h3>Upcoming Events (Higher Skill Levels)</h3>
      ${upcomingEvents.map((show) => `<div class='box'>
        <p><strong>Location:</strong> ${show.barnName} | ${show.country}/${show.city}</p>
        <p class='small'><strong>Discipline:</strong> ${cap(show.discipline)} | <strong>Level:</strong> ${show.level}</p>
        <p class='small'><strong>Date:</strong> Hidden (${show.monthsUntilStart} month(s) remaining)</p>
      </div>`).join('') || '<p class="small">No high-level upcoming events currently listed.</p>'}
    </div>
  `;
  document.getElementById('cal-add').onclick = () => {
    const type = document.getElementById('cal-type').value;
    const note = document.getElementById('cal-note').value.trim();
    const schedule = document.getElementById('cal-schedule').value;
    const year = Number(document.getElementById('cal-year').value);
    const month = clamp(Number(document.getElementById('cal-month').value) || app.month, 1, 12);
    const every = Math.max(1, Number(document.getElementById('cal-every').value) || 1);
    const reminder = { id: uid(), type, note, startMonthIndex: currentMonthIndex(), repeatEveryMonths: 0, onceMonth: null, year: null, month: null, scheduleText: '' };
    if (schedule === 'repeat') {
      reminder.repeatEveryMonths = every;
      reminder.scheduleText = `Every ${every} month(s), starting ${dateLabel()}`;
    } else if (schedule === 'yearly') {
      reminder.onceMonth = month;
      reminder.scheduleText = `Every year in month ${month}`;
    } else {
      reminder.year = Math.max(1, year || app.year);
      reminder.month = month;
      reminder.scheduleText = `On Y${reminder.year} M${reminder.month}`;
    }
    app.calendarReminders = app.calendarReminders || [];
    app.calendarReminders.push(reminder);
    renderCalendar();
  };
  document.querySelectorAll('[data-cal-del]').forEach((btn) => {
    btn.onclick = () => {
      app.calendarReminders = (app.calendarReminders || []).filter((r) => r.id !== btn.dataset.calDel);
      renderCalendar();
    };
  });

  document.querySelectorAll('[data-show-signup]').forEach((btn) => {
    btn.onclick = () => {
      const show = shows.find((s) => s.id === btn.dataset.showSignup);
      if (!show) return;
      const horseId = document.querySelector(`[data-show-horse='${show.id}']`)?.value;
      const horse = competitionEligibleHorses().find((h) => h.id === horseId);
      if (!horse) return alert('Select a horse first.');
      const tCost = showTransportFee(show);
      const total = show.fee + tCost;
      if (!tryCharge(total)) return;
      registerShowEntry(horse, show.discipline, show.level);
      pushReport(`${horse.name} signed up for ${cap(show.discipline)} at ${show.barnName}. Fees paid: ${money(total)}.`);
      if (app.settings?.competitionMode === 'rpg' && app.competitionRpg) {
        changeTab('shows');
        renderShows();
      } else {
        renderCalendar();
      }
    };
  });
}


function renderBreeding() {
  const panel = document.getElementById('breeding');
  if (!panel) return;
  const mares = app.horses.filter((h) => h.gender === 'Mare' && !h.retiredForever);
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  const pregnant = mares.filter((h) => h.pregnantBy || h.pregnantEmbryo);
  panel.innerHTML = `
    <h2>Breeding</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Breeding Overview</h3>
        <p>Total mares: <strong>${mares.length}</strong></p>
        <p>Total stallions: <strong>${stallions.length}</strong></p>
        <p>Pregnant mares: <strong>${pregnant.length}</strong></p>
        <p>Frozen semen straws: <strong>${app.semenStraws.length}</strong></p>
        <p>Frozen embryos: <strong>${app.embryos.length}</strong></p>
      </div>
      <div class='box'>
        <h3>Where to Breed</h3>
        <p class='small'>Breeding actions are handled in the <strong>Vet</strong> tab (AI, embryo flush/transfer, ultrasound, mismate shot) and storage is in <strong>Freezer</strong>.</p>
        <div class='inline'>
          <button id='breeding-open-vet'>Open Vet</button>
          <button id='breeding-open-freezer'>Open Freezer</button>
        </div>
      </div>
    </div>
    <div class='box'>
      <h3>Pregnancy List</h3>
      ${pregnant.length ? pregnant.map((mare) => {
        const daysPregnant = Math.max(0, Math.round(Number(mare.pregnancyDays) || 0));
        const phAction = eligibleForPhTest(mare)
          ? `<button data-breeding-ph='${mare.id}'>Test pH</button>`
          : `<span class='small'>pH test available at 320+ days</span>`;
        const phResult = mare.lastPhReading != null
          ? `<span class='small'>pH: ${mare.lastPhReading}</span>`
          : `<span class='small'>pH: --</span>`;
        return `
          <div class='inline'>
            <p>${horseDisplayName(mare)}: ${daysPregnant} Days</p>
            ${phAction}
            ${phResult}
          </div>
        `;
      }).join('') : '<p class="small">No active pregnancies right now.</p>'}
    </div>
  `;
  const vetBtn = document.getElementById('breeding-open-vet');
  if (vetBtn) vetBtn.onclick = () => changeTab('vet');
  const freezerBtn = document.getElementById('breeding-open-freezer');
  if (freezerBtn) freezerBtn.onclick = () => changeTab('freezer');
  document.querySelectorAll('[data-breeding-ph]').forEach((btn) => {
    btn.onclick = () => {
      const mare = app.horses.find((h) => h.id === btn.dataset.breedingPh);
      if (!mare) return;
      if (!eligibleForPhTest(mare)) {
        alert('pH test is only available for mares over 320 pregnancy days.');
        return;
      }
      const reading = phReadingForMare(mare);
      mare.lastPhReading = reading;
      vetNote(mare, `${mare.name} milk pH reading: ${reading}.`);
      renderBreeding();
      saveGame(false);
    };
  });
}

function renderSettings() {
  const current = app.settings || { barnName: 'Oxer to Oxer Stable Manager', breedingCode: '', breedingCodePosition: 'front', trainingMode: 'rpg', competitionMode: 'rpg' };
  document.getElementById('settings').innerHTML = `
    <h2>Settings</h2>
    <div class='box'>
      <label>Money</label>
      <input id='settings-money' type='number' min='0' step='1' value='${Math.max(0, Math.round(app.money || 0))}' />
      <label>Barn Name</label>
      <input id='settings-barn-name' type='text' value='${current.barnName || ''}' placeholder='Barn name' />
      <label>Breeding Code</label>
      <input id='settings-breeding-code' type='text' maxlength='12' value='${current.breedingCode || ''}' placeholder='e.g. OTO' />
      <label>Breeding Code Position</label>
      <select id='settings-code-position'>
        <option value='front' ${current.breedingCodePosition === 'front' ? 'selected' : ''}>Front (Code FoalName)</option>
        <option value='end' ${current.breedingCodePosition === 'end' ? 'selected' : ''}>End (FoalName Code)</option>
      </select>
      <label>Training System</label>
      <select id='settings-training-mode'>
        <option value='rpg' ${current.trainingMode !== 'normal' ? 'selected' : ''}>RPG (prompt-based)</option>
        <option value='normal' ${current.trainingMode === 'normal' ? 'selected' : ''}>Normal (spam clicking)</option>
      </select>
      <label>Competition System</label>
      <select id='settings-competition-mode'>
        <option value='rpg' ${current.competitionMode !== 'normal' ? 'selected' : ''}>RPG (press Enter through scenes)</option>
        <option value='normal' ${current.competitionMode === 'normal' ? 'selected' : ''}>Normal (spam clicking)</option>
      </select>
      <button id='settings-save'>Save Settings</button>
      <p class='small'>Barn name updates the top header. Breeding code is auto-applied to newborn foal names. Training/competition mode controls RPG prompts vs normal fast-click sessions.</p>
    </div>
  `;
  const saveBtn = document.getElementById('settings-save');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const enteredMoney = Number(document.getElementById('settings-money').value);
      if (!Number.isFinite(enteredMoney) || enteredMoney < 0) {
        alert('Money must be a non-negative number.');
        return;
      }
      app.money = Math.round(enteredMoney);
      app.settings = {
        barnName: (document.getElementById('settings-barn-name').value || '').trim() || 'Oxer to Oxer Stable Manager',
        breedingCode: (document.getElementById('settings-breeding-code').value || '').trim(),
        breedingCodePosition: document.getElementById('settings-code-position').value === 'end' ? 'end' : 'front',
        trainingMode: document.getElementById('settings-training-mode').value === 'normal' ? 'normal' : 'rpg',
        competitionMode: document.getElementById('settings-competition-mode').value === 'normal' ? 'normal' : 'rpg'
      };
      ensureBarnState();
      if (app.currentBarn) app.currentBarn.name = app.settings.barnName;
      pushReport('Settings updated.');
      render();
      saveGame(false);
    };
  }
}


function render() {
  ensurePanels();
  safeRun('updateHeader', updateHeader);
  safeRun('renderDashboard', renderDashboard);
  safeRun('renderHorses', renderHorses);
  safeRun('renderBarn', renderBarn);
  safeRun('renderMarket', renderMarket);
  safeRun('renderSales', renderSales);
  safeRun('renderStud', renderStud);
  safeRun('renderShows', renderShows);
  safeRun('renderVet', renderVet);
  safeRun('renderFarrier', renderFarrier);
  safeRun('renderTraining', renderTraining);
  safeRun('renderBreeding', renderBreeding);
  safeRun('renderRegistries', typeof renderRegistries === 'function' ? renderRegistries : renderRigistries);
  safeRun('renderBreeders', renderBreeders);
  safeRun('renderFreezer', renderFreezer);
  safeRun('renderRescue', renderRescue);
  safeRun('renderCalendar', renderCalendar);
  safeRun('renderSettings', renderSettings);
}

const skipBtn = document.getElementById('skipMonthBtn');
const skipDayBtn = document.getElementById('skipDayBtn');
const skipHourBtn = document.getElementById('skipHourBtn');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const saveGameBtn = document.getElementById('saveGameBtn');
const loadGameBtn = document.getElementById('loadGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
const moneyLabel = document.getElementById('moneyLabel');
if (skipBtn) skipBtn.onclick = () => { monthlyProgress(); render(); saveGame(false); };
if (skipDayBtn) skipDayBtn.onclick = () => { advanceOneDay(); render(); saveGame(false); };
if (skipHourBtn) skipHourBtn.onclick = () => {
  advanceOneHour();
  render();
  saveGame(false);
};
if (addMoneyBtn) addMoneyBtn.onclick = () => { app.money += 100000; render(); saveGame(false); };
if (moneyLabel) {
  moneyLabel.style.cursor = 'pointer';
  moneyLabel.title = 'Click to set your money amount';
  moneyLabel.onclick = () => {
    const entered = prompt('Set money amount:', `${Math.round(app.money)}`);
    if (entered == null) return;
    const normalized = entered.replace(/[$,\s]/g, '');
    const value = Number(normalized);
    if (!Number.isFinite(value) || value < 0) {
      alert('Please enter a valid non-negative number.');
      return;
    }
    app.money = Math.round(value);
    render();
    saveGame(false);
  };
}
if (saveGameBtn) saveGameBtn.onclick = () => { if (saveGame(true)) render(); };
if (loadGameBtn) loadGameBtn.onclick = () => { if (loadGame(true)) render(); };
if (resetGameBtn) resetGameBtn.onclick = () => {
  if (!confirm('Reset game? This clears saved progress and starts fresh.')) return;
  try { localStorage.removeItem(SAVE_KEY); } catch (error) { console.error('Reset save failed', error); }
  resetGame();
  render();
};

window.addEventListener('error', (event) => {
  showFatal(event.message || 'Unknown runtime error');
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason?.message || String(event?.reason || 'Unknown promise rejection');
  showFatal(`Unhandled promise rejection: ${reason}`);
});

let didBootstrap = false;

function bootstrap() {
  if (didBootstrap) return;
  didBootstrap = true;
  try {
    seed();
    loadGame(false);
    ensurePanels();
    buildTabs();
    render();
  } catch (error) {
    console.error('Startup failed', error);
    try {
      resetGame();
      ensurePanels();
      buildTabs();
      render();
      pushReport('Startup recovered by resetting invalid state.');
    } catch (fallbackError) {
      console.error('Startup fallback failed', fallbackError);
      showFatal(`${error.message} (fallback failed: ${fallbackError.message})`);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
