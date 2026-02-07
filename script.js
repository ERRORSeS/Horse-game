const BREEDS = [
  'American Warmblood', 'Baden-Wuerttemberg', 'Bavarian Warmblood', 'Belgian Warmblood', 'Canadian Warmblood',
  'Danish Warmblood', 'Dutch Warmblood', 'Gelderlander', 'Hanoverian', 'Hessen', 'Holsteiner', 'Oldenburg',
  'Polish Warmblood', 'Rhineland', 'Selle Francais', 'Swedish Warmblood', 'Trakehner', 'Westphalian', 'Zweibrucker',
  'Arabian', 'Draft', 'Iberian Horse', 'Riding Pony', 'Thoroughbred'
];
const COATS = ['Black', 'Bay (Light)', 'Bay (Medium)', 'Bay (Dark)', 'Palomino', 'Fleabitten', 'Grey (Light)', 'Grey (Medium)', 'Grey (Dark)', 'Dappled Grey (Light)', 'Dappled Grey (Medium)', 'Dappled Grey (Dark)', 'Seal Bay', 'Cremello', 'Perlino', 'Buckskin', 'Dun', 'Grullo', 'Chestnut (Light)', 'Chestnut (Medium)', 'Chestnut (Dark)', 'Dapple Bay (Light)', 'Dapple Bay (Medium)', 'Dapple Bay (Dark)'];
const MARKINGS = ['Tobiano (Light)', 'Tobiano (Moderate)', 'Tobiano (Intense)', 'Overo', 'Sabino', 'Rabicano', 'Appaloosa (Light)', 'Appaloosa (Moderate)', 'Appaloosa (Intense)', 'Leopard (Light)', 'Leopard (Moderate)', 'Leopard (Intense)', 'None'];
const CONFORMATION = ['Very Bad', 'Bad', 'Acceptable', 'Good', 'Very Good', 'Excellent'];
const SOCKS = ['None', 'One Sock', 'Two Socks', 'Three Socks', 'Four Socks', 'Stockings'];
const FACE_MARKINGS = ['Faint', 'Star', 'Stripe', 'Broken Stripe', 'Blaze', 'Snip', 'Blaze + Snip', 'Bald Face'];

const SHOW_LEVELS = {
  jumping: ['0.70', '0.80', '0.90', '1.00', '1.10', '1.20', '1.30', '1.40', '1.50', '1.60', '1.70', '1.80'],
  dressage: ['Introductory', 'Training', 'Level One', 'Level Two', 'Level Three', 'Level Four', 'Prix St Georges', 'Intermediate', 'Grand Prix'],
  hunter: ['Poles and Crosspoles', 'Novice', 'Pre-Green', 'Green', 'Low', 'Medium', 'Modified', 'Regular', 'Working', 'Open'],
  eventing: ['Starter', 'Pre-Entry', 'Entry', 'Pre-Training', 'Training', 'Preliminary', 'Intermediate', 'Advanced', 'Four Star']
};

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
  'Thoroughbred': 'TH'
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
  'Unfocused'
];

const LEVEL_SKILL_BANDS = {
  jumping: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[70,80],[80,90],[90,95],[90,95],[95,100],[95,100]],
  dressage: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[70,80],[80,90],[90,100]],
  eventing: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[70,80],[80,90],[90,100]],
  hunter: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[70,80],[80,90],[90,95],[95,100]]
};

const DISCIPLINE_SKILLS = {
  jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness']
};

const app = {
  money: 50000,
  month: 1,
  year: 1,
  horses: [],
  semenStraws: [],
  embryos: [],
  saleBarn: [],
  npcSales: [],
  npcStuds: [],
  reports: [],
  showOffspringWindow: true,
  trainingSelection: { horseId: '', discipline: 'jumping', exercise: '' },
  selectedHorseId: ''
};

const SAVE_KEY = 'horse_game_save_v1';
const tabs = ['dashboard', 'horses', 'market', 'sales', 'stud', 'shows', 'vet', 'farrier', 'training', 'breeding', 'registries', 'breeders', 'freezer'];

const uid = () => Math.random().toString(36).slice(2, 9);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const money = (v) => `$${Math.round(v).toLocaleString()}`;
const dateLabel = () => `Y${app.year}M${app.month}`;
const cap = (t) => t[0].toUpperCase() + t.slice(1);

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
  'Weight Gain'
];
const MOODS = ['Motivated', 'Happy', 'Try-Hard', 'Neutral', 'Uncomfortable', 'Distress', 'Overly-Active', 'No energy', 'Bad moods', 'Grumpy'];
const WEIGHTS = ['Very Underweight', 'Underweight', 'Moderate', 'Fleshy', 'Overweight'];

function normalizeMarkingForBreed(marking, breed) {
  if (!marking.includes('Rabicano')) return marking;
  const lower = String(breed || '').toLowerCase();
  if (lower.includes('arab')) return marking;
  return pick(MARKINGS.filter((m) => m !== 'Rabicano'));
}

function randomMarking(breed) {
  const roll = rnd(1, 100);
  const marking = roll <= 7 ? pick(RARE_MARKINGS) : 'None';
  return normalizeMarkingForBreed(marking, breed);
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

function trainingStaminaRange(level) {
  if (level === 'Low') return '10-15';
  if (level === 'High') return '30-50';
  return '15-30';
}

function turnoutRange(level) {
  if (level === 'Low') return '2-3';
  if (level === 'High') return '8-14';
  return '3-8';
}

function updateWeight(horse, delta) {
  const idx = Math.max(0, Math.min(WEIGHTS.length - 1, WEIGHTS.indexOf(horse.weightStatus)));
  const next = Math.max(0, Math.min(WEIGHTS.length - 1, idx + delta));
  horse.weightStatus = WEIGHTS[next];
}

function moodPerformanceDelta(mood) {
  if (['Motivated', 'Happy', 'Try-Hard'].includes(mood)) return 4;
  if (mood === 'Neutral') return 0;
  if (mood === 'Grumpy') return -3;
  if (mood === 'Bad moods') return -4;
  return -5;
}

function weightPerformanceDelta(weight) {
  if (weight === 'Moderate') return 3;
  if (['Underweight', 'Fleshy'].includes(weight)) return -2;
  return -4;
}

function applyMonthlyMoodShift(horse) {
  const preferred = horse.preferredMood;
  const roll = rnd(1, 100);
  if (roll <= 55) {
    horse.mood = preferred;
    return;
  }
  if (roll <= 80) {
    horse.mood = 'Neutral';
    return;
  }
  horse.mood = rnd(1, 100) <= 50 ? 'Bad moods' : 'Grumpy';
}

function evaluateFeedEffects(horse) {
  let moodOverride = '';
  let weightDelta = 0;
  let trainingBoost = 0;
  let competitionBoost = 0;
  let healingBoost = 0;
  const activeTraining = (horse.trainingSessionsThisMonth || 0) > 0 || horse.managed?.showEntry;
  const hasInjury = horse.illnesses.some((i) => i.active);
  const totalGrams = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  const pref = horse.preferredFeedGrams || 150;
  if (totalGrams > pref + 30) weightDelta += 1;
  if (totalGrams < pref - 30) weightDelta -= 1;

  (horse.feedPlan || []).forEach((feed) => {
    switch (feed.type) {
      case 'Basic Feed':
        competitionBoost += 1;
        break;
      case 'Sports Feed':
        if (!activeTraining) {
          weightDelta += 1;
          moodOverride = 'Distress';
        } else {
          competitionBoost += 2;
        }
        break;
      case 'Sweet Feed':
        if (['Energetic', 'Stubborn'].includes(horse.personality)) {
          weightDelta += 1;
          moodOverride = 'Overly-Active';
        } else {
          moodOverride = 'Happy';
        }
        break;
      case 'Brood-mare Feed':
        if (!(horse.retiredToBreeding || horse.pregnantBy || horse.pregnantEmbryo)) {
          weightDelta += 1;
          moodOverride = 'Distress';
        }
        break;
      case 'Calm nd Ez':
        if (['Lazy', 'Easy-Going', 'Bomb-proof'].includes(horse.personality)) {
          moodOverride = 'No energy';
        } else {
          moodOverride = 'Neutral';
        }
        if (hasInjury) moodOverride = 'Neutral';
        break;
      case 'Youngster Feed':
        if (horse.age > 5 || horse.retiredForever || horse.retiredToBreeding) {
          weightDelta += 1;
          moodOverride = 'Distress';
        } else {
          trainingBoost += 2;
        }
        break;
      case 'Old Horse Feed':
        if (horse.age < 15 && !horse.retiredForever) {
          weightDelta += 1;
          moodOverride = 'Distress';
          if (['Energetic', 'Stubborn'].includes(horse.personality)) moodOverride = 'Overly-Active';
        }
        break;
      case 'Recovery':
        if (!hasInjury) {
          moodOverride = 'Uncomfortable';
        } else if (rnd(1, 100) <= 70) {
          healingBoost += 1;
        }
        break;
      case 'Weight Gain':
        if (['Moderate', 'Fleshy', 'Overweight'].includes(horse.weightStatus)) {
          moodOverride = 'Distress';
          weightDelta += 1;
        } else {
          weightDelta += 1;
        }
        break;
      default:
        break;
    }
  });

  if (weightDelta !== 0) updateWeight(horse, weightDelta);
  if (moodOverride) horse.mood = moodOverride;
  horse.trainingBoost = trainingBoost;
  horse.competitionBoost = competitionBoost;
  horse.healingBoost = healingBoost;
}

function updateMonthlyCare(horse) {
  if (horse.retiredForever && !horse.retiredToBreeding) return;
  applyMonthlyMoodShift(horse);
  evaluateFeedEffects(horse);
  const stamina = horse.trainingPreference || 'Medium';
  horse.turnoutHours = horse.illnesses.some((i) => i.active) ? 0 : (stamina === 'Low' ? rnd(2, 3) : stamina === 'High' ? rnd(8, 14) : rnd(3, 8));
  if (horse.turnoutHours < 2) horse.mood = 'Distress';
  if ((horse.trainingSessionsThisMonth || 0) > (horse.preferredTrainingSessions || 25)) horse.mood = 'No energy';
  horse.trainingSessionsThisMonth = 0;
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
  box.innerHTML = `<div class='box'><h2>Startup Error</h2><p>${message}</p><p class='small'>Try a hard refresh (Ctrl/Cmd + Shift + R). If this persists, resolve all git conflicts and ensure both index.html and script.js are from the same commit.</p></div>`;
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
  app.year = Number(data.year) || 1;
  app.horses = Array.isArray(data.horses) ? data.horses.filter(Boolean) : [];
  app.semenStraws = Array.isArray(data.semenStraws) ? data.semenStraws : [];
  app.embryos = Array.isArray(data.embryos) ? data.embryos : [];
  app.saleBarn = Array.isArray(data.saleBarn) ? data.saleBarn : [];
  app.npcSales = Array.isArray(data.npcSales) ? data.npcSales : [];
  app.npcStuds = Array.isArray(data.npcStuds) ? data.npcStuds : [];
  app.reports = Array.isArray(data.reports) ? data.reports : [];
  app.showOffspringWindow = data.showOffspringWindow !== false;
  app.selectedHorseId = data.selectedHorseId || '';
  app.trainingSelection = typeof data.trainingSelection === 'object' && data.trainingSelection
    ? {
        horseId: data.trainingSelection.horseId || '',
        discipline: data.trainingSelection.discipline || 'jumping',
        exercise: data.trainingSelection.exercise || ''
      }
    : { horseId: '', discipline: 'jumping', exercise: '' };

  app.horses.forEach((h) => {
    h.socks = h.socks || pick(SOCKS);
    h.faceMarking = h.faceMarking || pick(FACE_MARKINGS);
    h.marking = normalizeMarkingForBreed(h.marking || 'None', h.breed);
    h.personality = h.personality || pick(PERSONALITIES);
    h.behavior = Number.isFinite(h.behavior) ? h.behavior : 0;
    h.extraPotential = h.extraPotential === true;
    h.healthGenetics = h.healthGenetics || pick(['Low', 'Medium', 'High']);
    h.injuryProtection = h.injuryProtection || {};
    h.registryInspection = h.registryInspection || null;
    h.showInspectionDetails = h.showInspectionDetails || false;
    h.showOffspringSummary = h.showOffspringSummary || false;
    h.showPedigree = h.showPedigree || false;
    h.notes = h.notes || '';
    h.showNotes = h.showNotes || false;
    h.feedPlan = Array.isArray(h.feedPlan) ? h.feedPlan : [];
    h.preferredFeedGrams = Number.isFinite(h.preferredFeedGrams) ? h.preferredFeedGrams : rnd(80, 220);
    h.preferredMood = h.preferredMood || pick(['Motivated', 'Happy', 'Try-Hard', 'Neutral']);
    h.mood = h.mood || 'Neutral';
    h.weightStatus = h.weightStatus || 'Moderate';
    h.trainingPreference = h.trainingPreference || pick(['Low', 'Medium', 'High']);
    h.preferredTrainingSessions = Number.isFinite(h.preferredTrainingSessions) ? h.preferredTrainingSessions : rnd(10, 50);
    h.trainingSessionsThisMonth = Number.isFinite(h.trainingSessionsThisMonth) ? h.trainingSessionsThisMonth : 0;
    h.turnoutHours = Number.isFinite(h.turnoutHours) ? h.turnoutHours : 0;
    h.trainingBoost = Number.isFinite(h.trainingBoost) ? h.trainingBoost : 0;
    h.competitionBoost = Number.isFinite(h.competitionBoost) ? h.competitionBoost : 0;
    h.healingBoost = Number.isFinite(h.healingBoost) ? h.healingBoost : 0;
    h.soundnessYears = Number.isFinite(h.soundnessYears) ? h.soundnessYears : rnd(1, 15);
    h.soundnessExpiredMonths = Number.isFinite(h.soundnessExpiredMonths) ? h.soundnessExpiredMonths : 0;
    h.lastSoundnessIssueMonth = Number.isFinite(h.lastSoundnessIssueMonth) ? h.lastSoundnessIssueMonth : 0;
    h.unridable = h.unridable || false;
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
    h.lastFarrierMonth = Number.isFinite(h.lastFarrierMonth)
      ? h.lastFarrierMonth
      : (Number.isFinite(h.due?.farrierMonth) ? h.due.farrierMonth : app.year * 12 + app.month);
  });
}

function resetGame() {
  app.money = 50000;
  app.month = 1;
  app.year = 1;
  app.horses = [];
  app.semenStraws = [];
  app.embryos = [];
  app.saleBarn = [];
  app.npcSales = [];
  app.npcStuds = [];
  app.reports = [];
  app.showOffspringWindow = true;
  app.trainingSelection = { horseId: '', discipline: 'jumping', exercise: '' };
  app.selectedHorseId = '';
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

function canCompeteUnderSaddle(horse) {
  return horse.age >= 3 && !horse.unridable;
}

function horseLifeStage(horse) {
  if (horse.age < 1) return 'Foal';
  if (horse.age < 3) return 'Young Horse';
  return 'Mature Horse';
}

function horseDisplayName(horse) {
  const branding = horse.registryInspection?.branding;
  return branding ? `${horse.name} "${branding}"` : horse.name;
}

function showRecordSummary(horse) {
  const records = horse.showResults || [];
  const first = records.filter((r) => r.placing === 1).length;
  const second = records.filter((r) => r.placing === 2).length;
  const third = records.filter((r) => r.placing === 3).length;
  return { total: records.length, first, second, third };
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
    faceMarking: pick(FACE_MARKINGS),
    personality: pick(PERSONALITIES),
    behavior: 0,
    extraPotential: false,
    healthGenetics: pick(['Low', 'Medium', 'High']),
    injuryProtection: {},
    registryInspection: null,
    showInspectionDetails: false,
    showOffspringSummary: false,
    showPedigree: false,
    notes: '',
    showNotes: false,
    feedPlan: [],
    preferredFeedGrams: rnd(80, 220),
    preferredMood: pick(['Motivated', 'Happy', 'Try-Hard', 'Neutral']),
    mood: 'Neutral',
    weightStatus: 'Moderate',
    trainingPreference: pick(['Low', 'Medium', 'High']),
    preferredTrainingSessions: rnd(10, 50),
    trainingSessionsThisMonth: 0,
    turnoutHours: 0,
    trainingBoost: 0,
    competitionBoost: 0,
    healingBoost: 0,
    conformation: pick(CONFORMATION),
    height: `${rnd(14, 18)}.${rnd(0, 3)} hh`,
    soundnessYears: rnd(1, 15),
    soundnessExpiredMonths: 0,
    lastSoundnessIssueMonth: 0,
    unridable: false,
    owner: 'Your Stable',
    bredBy: 'Your Stable',
    retiredToBreeding: false,
    retiredForever: false,
    managed: { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false },
    due: { checkup: true, farrier: false },
    lastFarrierMonth: app.year * 12 + app.month,
    illnesses: [],
    healthRisks: [pick(['Metabolic', 'Colic', 'Laminitis', 'Tendon Strain']), pick(['Arthritis', 'Respiratory', 'Ulcers', 'None'])],
    vetNotes: [],
    stats: {
      dressage: { Collection: rnd(statRange[0], statRange[1]), Balance: rnd(statRange[0], statRange[1]), Connection: rnd(statRange[0], statRange[1]), Gaits: rnd(statRange[0], statRange[1]), Rhythm: rnd(statRange[0], statRange[1]), Flowiness: rnd(statRange[0], statRange[1]) },
      jumping: { Striding: rnd(statRange[0], statRange[1]), Confidence: rnd(statRange[0], statRange[1]), Balance: rnd(statRange[0], statRange[1]), Power: rnd(statRange[0], statRange[1]), Speed: rnd(statRange[0], statRange[1]), Structure: rnd(statRange[0], statRange[1]) }
    },
    potential,
    coi: rnd(0, 25),
    showResults: [],
    breedersEntries: 0,
    totalPoints: 0,
    championships: 0,
    reserves: 0,
    earnings: 0,
    topWins: { mareFilly: 0, breed: 0, overall: 0, highestScore: 0 },
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
  horse.marking = randomMarking(horse.breed);
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


function seed() {
  app.horses = [baseHorse('trained'), baseHorse('untrained'), baseHorse('fully')];
  app.saleBarn = [baseHorse('fully', 'npc'), baseHorse('trained', 'npc')].map((h) => {
    seedShowHistory(h, rnd(1, 3), 10);
    return { ...h, owner: 'NPC Stable', price: Math.round(calculateHorsePrice(h, true) * rnd(95, 110) / 100) };
  });
  refreshNpcAds();
}

function seedShowHistory(horse, count, highClassChance) {
  const disciplines = Object.keys(SHOW_LEVELS);
  for (let i = 0; i < count; i++) {
    const discipline = pick(disciplines);
    const levels = SHOW_LEVELS[discipline];
    const isHigh = rnd(1, 100) <= highClassChance;
    const level = isHigh ? levels[levels.length - 1] : pick(levels);
    const score = Math.max(40, Math.min(100, Math.round(horseSkillScore(horse) + rnd(-8, 12))));
    const placing = score >= 90 ? rnd(1, 3) : score >= 80 ? rnd(4, 7) : rnd(8, 15);
    const idx = levelIndex(discipline, level);
    const prize = Math.max(120, Math.round((3000 - placing * 130 + idx * 260) * (placing <= 3 ? 1.4 : 1)));
    horse.showResults.push({ date: dateLabel(), discipline, level, score, placing, prize, resultText: `${score}` });
    horse.totalPoints += Math.max(0, 30 - placing);
    horse.earnings += prize;
    if (placing === 1) horse.championships += 1;
    if (placing === 2) horse.reserves += 1;
  }
}

function refreshNpcAds() {
  const saleCount = rnd(2, 4);
  const studCount = rnd(2, 3);
  app.npcSales = Array.from({ length: saleCount }, () => {
    const horse = baseHorse(pick(['untrained', 'trained', 'fully']), 'npc');
    horse.owner = pick(['Evergreen Stables', 'Valley Creek Farm', 'Blue Ridge Sporthorses', 'Silverleaf Stables']);
    seedShowHistory(horse, rnd(1, 4), 12);
    const price = Math.round(calculateHorsePrice(horse, true) * rnd(95, 110) / 100);
    return { ...horse, price, saleId: uid() };
  });
  app.npcStuds = Array.from({ length: studCount }, () => {
    const stallion = baseHorse('trained', 'npc');
    stallion.gender = 'Stallion';
    stallion.owner = pick(['Redwood Stud', 'Oak Hollow', 'Northbridge Sporthorses']);
    seedShowHistory(stallion, rnd(2, 4), 20);
    const fee = Math.round(calculateHorsePrice(stallion, true) * 0.18 + 1200);
    return { ...stallion, fee, studId: uid() };
  });
  pushReport('NPC sale and stud ads have been refreshed.');
}

function updateHeader() {
  const monthEl = document.getElementById('monthLabel');
  const moneyEl = document.getElementById('moneyLabel');
  if (monthEl) monthEl.textContent = `Month ${app.month}, Year ${app.year}`;
  if (moneyEl) moneyEl.innerHTML = `<span class="money">${money(app.money)}</span>`;
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
  const sick = app.horses.filter((h) => h.illnesses.some((i) => i.active)).length;
  document.getElementById('dashboard').innerHTML = `
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
  `;
}

function createHorseCard(horse) {
  const tpl = document.getElementById('horseCardTemplate');
  const node = tpl?.content?.firstElementChild
    ? tpl.content.firstElementChild.cloneNode(true)
    : (() => {
      const article = document.createElement('article');
      article.className = 'horse-card';
      article.innerHTML = `<h3 class='horse-name'></h3><p class='subline'></p><p class='meta'></p><div class='grid two'><div><h4>Jump Training</h4><ul class='stats jump-stats'></ul></div><div><h4>Dressage Training</h4><ul class='stats dressage-stats'></ul></div></div><div class='grid two'><div class='results'></div><div class='manage'></div></div>`;
      return article;
    })();
  const activeIssue = horse.illnesses.find((i) => i.active);
  const titleLabel = horse.registryInspection?.title ? `${horse.registryInspection.title} Champion` : '';

  node.querySelector('.horse-name').textContent = horseDisplayName(horse);
  let titleEl = node.querySelector('.horse-title');
  if (!titleEl) {
    titleEl = document.createElement('p');
    titleEl.className = 'horse-title';
    node.querySelector('.horse-name').insertAdjacentElement('afterend', titleEl);
  }
  titleEl.textContent = titleLabel;
  const socks = horse.socks || 'None';
  const face = horse.faceMarking || 'Faint';
  node.querySelector('.subline').textContent = `${horse.height} | ${horse.coat} | ${socks} | ${horse.marking} | Face: ${face} | ${horse.age} | ${horse.gender} | ${horseLifeStage(horse)}`;
  node.querySelector('.meta').textContent = `${horse.breed} • Personality: ${horse.personality} • Behavior: ${horse.behavior || 0} • Mood: ${horse.mood} • Weight: ${horse.weightStatus} • Conformation: ${horse.conformation} • COI: ${horse.coi}% • Soundness: ${horse.soundnessYears.toFixed(1)} years est. • Worth: ${money(horseWorth(horse))}${horse.extraPotential ? ' • Extra potential' : ''}${activeIssue ? ` • Active issue: ${activeIssue.name}` : ''} • ${canCompeteUnderSaddle(horse) ? 'Under saddle eligible' : 'In-hand/registry only until age 3'}`;

  const dList = node.querySelector('.dressage-stats');
  Object.entries(horse.stats.dressage).forEach(([k, v]) => { dList.innerHTML += `<li>${k}: ${v}</li>`; });
  const jList = node.querySelector('.jump-stats');
  Object.entries(horse.stats.jumping).forEach(([k, v]) => { jList.innerHTML += `<li>${k}: ${v}</li>`; });

  const record = showRecordSummary(horse);
  node.querySelector('.results').innerHTML = `
    <h4>Competition Results</h4>
    <p>Total Points: ${horse.totalPoints} | Championships: ${horse.championships} | Reserves: ${horse.reserves}</p>
    <p>Lifetime Earnings: ${money(horse.earnings)}</p>
    <p>Show record: ${record.total} (${record.first}-${record.second}-${record.third})</p>
    <p>Top Mare/Filly: ${horse.topWins.mareFilly} | Best Breed: ${horse.topWins.breed} | Best Overall: ${horse.topWins.overall}</p>
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
    <label>Notes</label><textarea rows='3' class='note-input'>${horse.notes}</textarea>
    <button data-action='save-notes'>Save Notes</button>
    <button data-action='toggle-notes'>${horse.showNotes ? 'Hide Notes' : 'Show Notes'}</button>
    ${horse.showNotes && horse.notes ? `<div class='box'><p class='small'>${horse.notes}</p></div>` : ''}
    <label>Feed Plan</label>
    <select class='feed-type'>${FEEDS.map((f) => `<option>${f}</option>`).join('')}</select>
    <label>Amount (grams)</label>
    <input type='number' class='feed-grams' min='50' max='250' value='150' />
    <button data-action='add-feed'>Add Feed</button>
    <button data-action='clear-feed'>Clear Feed Plan</button>
    ${horse.feedPlan.length ? `<div class='box'><p class='small'>${horse.feedPlan.map((f) => `${f.type} (${f.grams}g)`).join(', ')}</p></div>` : '<p class="small">No feed assigned.</p>'}
    <p class='small'>Mood: ${horse.mood} • Weight: ${horse.weightStatus} • Training stamina: ${horse.trainingPreference} (${trainingStaminaRange(horse.trainingPreference)} sessions) • Turnout: ${turnoutRange(horse.trainingPreference)} hrs</p>
    <button data-action='vet-notes'>${horse.showVetNotes ? 'Hide Vet Notes' : 'Show Vet Notes'}</button>
    ${horse.showVetNotes ? `<div class='box'>${horse.vetNotes.length ? horse.vetNotes.map((n) => `<p class='small'>${n.date}: ${n.text}</p>`).join('') : '<p class="small">No vet notes yet.</p>'}</div>` : ''}
    ${horse.registryInspection ? `<button data-action='inspection-details'>${horse.showInspectionDetails ? 'Hide Inspection Details' : 'Show Inspection Details'}</button>` : ''}
    ${horse.registryInspection && horse.showInspectionDetails ? `
      <div class='box'>
        <p class='small'>Inspection (${horse.registryInspection.result}) — Score ${horse.registryInspection.totalScore.toFixed(2)}</p>
        <p class='small'>Conformation: ${horse.registryInspection.conformation.toFixed(1)} | Pedigree: ${horse.registryInspection.pedigree.toFixed(1)} | Potential: ${horse.registryInspection.potential.toFixed(1)}</p>
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
      if (action === 'save-notes') {
        const text = node.querySelector('.note-input')?.value.trim() || '';
        horse.notes = text;
      }
      if (action === 'toggle-notes') horse.showNotes = !horse.showNotes;
      if (action === 'add-feed') {
        const type = node.querySelector('.feed-type')?.value;
        const grams = Number(node.querySelector('.feed-grams')?.value) || 150;
        if (type && grams >= 50 && grams <= 250) {
          horse.feedPlan.push({ type, grams });
        }
      }
      if (action === 'clear-feed') horse.feedPlan = [];
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
  const dressage = Object.entries(horse.stats.dressage).map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
  const jumping = Object.entries(horse.stats.jumping).map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
  const latest = horse.showResults?.length ? horse.showResults[horse.showResults.length - 1] : null;
  const inspection = horse.registryInspection
    ? `<p class='small'>Inspection: ${horse.registryInspection.result} (${horse.registryInspection.totalScore.toFixed(2)}) • Branding: ${horse.registryInspection.branding || 'None'}</p>`
    : '';
  const record = showRecordSummary(horse);
  const showRecordLine = `<p class='small'>Show record: ${record.total} (${record.first}-${record.second}-${record.third})</p>`;
  return `
    <p class='small'>${horse.breed} • ${horse.age} • ${horse.gender} • Conformation: ${horse.conformation} • Behavior: ${horse.behavior || 0}${horse.extraPotential ? ' • Extra potential' : ''}</p>
    <div class='grid two'>
      <div><h4>Jump Training</h4><ul class='stats'>${jumping}</ul></div>
      <div><h4>Dressage Training</h4><ul class='stats'>${dressage}</ul></div>
    </div>
    <p class='small'>Wins: Championships ${horse.championships}, Reserves ${horse.reserves}, Total Points ${horse.totalPoints}, Top Breed ${horse.topWins?.breed || 0}.</p>
    ${showRecordLine}
    ${latest ? `<p class='small'>Latest show: ${latest.discipline} ${latest.level} — #${latest.placing}</p>` : '<p class="small">No show record yet.</p>'}
    ${inspection}
  `;
}

function renderHorses() {
  const el = document.getElementById('horses');
  const foals = app.horses.filter((h) => h.age < 3);
  const retiredBreeding = app.horses.filter((h) => h.retiredToBreeding && !h.retiredForever);
  const retired = app.horses.filter((h) => h.retiredForever);
  const active = app.horses.filter((h) => h.age >= 3 && !h.retiredToBreeding && !h.retiredForever);

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

  const selectedHorse = app.horses.find((h) => h.id === app.selectedHorseId);
  const profileEl = el.querySelector('#horse-profile');
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
        <select id='breed-${k.key}'>${BREEDS.map((b) => `<option>${b}</option>`).join('')}</select>
        <label>Gender</label>
        <select id='gender-${k.key}'><option>Mare</option><option>Stallion</option><option>Gelding</option></select>
        <button id='buy-${k.key}'>Buy</button>
      </div>
    `).join('')}</div>
  `;

  kinds.forEach((k) => {
    document.getElementById(`buy-${k.key}`).onclick = () => {
      if (app.money < k.cost) return alert('Not enough money');
      app.money -= k.cost;
      const horse = baseHorse(k.key, 'npc');
      horse.breed = document.getElementById(`breed-${k.key}`).value;
      horse.gender = document.getElementById(`gender-${k.key}`).value;
      horse.marking = normalizeMarkingForBreed(horse.marking, horse.breed);
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

function runShow(horse, discipline, level) {
  if (!canCompeteUnderSaddle(horse)) {
    pushReport(`${horse.name} cannot enter under-saddle shows until age 3.`);
    return;
  }
  if (horse.illnesses.some((i) => i.active)) {
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

  const [minReq] = requiredSkillBand(discipline, level);
  const skill = effectiveDisciplineSkill(horse, discipline);
  const temperament = personalityProfile(horse.personality);
  const conformationBoost = (CONFORMATION_MULT[horse.conformation] - 1) * 14;
  const behaviorBoost = Math.min(8, (horse.behavior || 0) * 0.35);
  const talentBoost = horse.extraPotential ? 4 : 0;
  const moodBoost = moodPerformanceDelta(horse.mood) + (horse.competitionBoost || 0);
  const weightBoost = weightPerformanceDelta(horse.weightStatus);
  const illnessPenalty = horse.illnesses.filter((i) => i.active).reduce((a, i) => a + i.impact, 0);
  const score = Math.max(0, Math.min(100, Math.round(skill + conformationBoost + behaviorBoost + talentBoost + moodBoost + weightBoost + temperament.showDelta - illnessPenalty + rnd(-2, 4) - Math.max(0, minReq - skill) * 1.0)));
  const placing = score >= 92 ? 1 : score >= 88 ? 2 : score >= 84 ? 3 : score >= 78 ? rnd(4, 6) : score >= 70 ? rnd(7, 10) : rnd(11, 15);
  const prize = Math.max(120, Math.round((3000 - placing * 130 + idx * 260) * (placing <= 3 ? 1.4 : 1)));

  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  let resultText = `${score}`;
  if (discipline === 'jumping') {
    const rails = rnd(0, Math.max(0, 3 - Math.floor((jump.Striding + jump.Structure + jump.Power) / 90))) + Math.max(0, temperament.penaltyBias);
    const refusal = rnd(1, 100) > Math.min(100, jump.Confidence + (10 - temperament.refusalBias)) ? 1 : 0;
    const fall = rnd(1, 100) <= Math.max(1, temperament.fallBias);
    const overSec = Math.max(0, rnd(0, 5) - Math.floor(jump.Speed / 25));
    if (fall) {
      resultText = 'DQ (fall)';
      horse.showResults.push({ date: dateLabel(), discipline, level, score: 0, placing: 15, prize: 0, resultText });
      pushReport(`${horse.name} in ${discipline} (${level}) was disqualified due to a fall.`);
      return;
    }
    const faults = rails * 4 + refusal * 4 + overSec;
    const time = (65 - Math.min(18, Math.floor(jump.Speed / 5))) + overSec;
    resultText = `${faults} faults | ${time}s`;
  } else if (discipline === 'dressage') {
    const pct = Math.max(45, Math.min(92, (score * 0.6 + 34) + rnd(-1.5, 1.5))).toFixed(2);
    resultText = `${pct}%`;
  } else if (discipline === 'eventing') {
    const rails = rnd(0, 2 + Math.max(0, temperament.penaltyBias));
    const refusal = rnd(1, 100) > Math.min(100, jump.Confidence + (10 - temperament.refusalBias)) ? 1 : 0;
    const fall = rnd(1, 100) <= Math.max(1, temperament.fallBias);
    const over = Math.max(0, rnd(0, 8) - Math.floor((jump.Speed + jump.Confidence) / 45));
    if (fall) {
      resultText = 'DQ (fall)';
      horse.showResults.push({ date: dateLabel(), discipline, level, score: 0, placing: 15, prize: 0, resultText });
      pushReport(`${horse.name} in ${discipline} (${level}) was disqualified due to a fall.`);
      return;
    }
    const penalties = (rails * 4) + (refusal * 20) + (over * 0.4);
    resultText = `${penalties.toFixed(1)} penalties`;
  } else if (discipline === 'hunter') {
    const faults = Math.max(0, rnd(0, 6 + Math.max(0, temperament.penaltyBias)) - Math.floor((dress.Flowiness + dress.Balance + jump.Striding + jump.Structure) / 75));
    resultText = `${faults} faults`;
  }

  horse.totalPoints += Math.max(0, 30 - placing);
  horse.earnings += prize;
  app.money += prize;
  if (placing === 1) horse.championships += 1;
  if (placing === 2) horse.reserves += 1;
  horse.topWins.highestScore = Math.max(horse.topWins.highestScore, score);
  horse.showResults.push({ date: dateLabel(), discipline, level, score, placing, prize, resultText });
  pushReport(`${horse.name} in ${discipline} (${level}) placed #${placing} with ${resultText} and won ${money(prize)}.`);
}

function renderShows() {
  const shows = [
    { key: 'dressage', names: ['OTO Dressage Show', 'OTO Pony Dressage Show', 'OTO Young Horse Dressage Show'] },
    { key: 'jumping', names: ['OTO Jumping Show', 'OTO Pony Jumping Classic', 'OTO Young Horse Jumping Show'] },
    { key: 'eventing', names: ['OTO Eventing Show', 'OTO Pony Event Trials', 'OTO Young Horse Eventing Show'] },
    { key: 'hunter', names: ['OTO Hunter Show', 'OTO Pony Hunter Classic', 'OTO Young Horse Hunter Show'] }
  ];

  document.getElementById('shows').innerHTML = `
    <h2>Enter Shows</h2>
    ${shows.map((s) => `
      <div class='box'>
        <h3>${cap(s.key)}</h3>
        ${s.names.map((n) => `<p>${n} (0/250) — Oxer To Oxer Showgrounds</p>`).join('')}
        <label>Horse</label>
        <select id='show-horse-${s.key}'>
          ${app.horses.filter((h) => !h.retiredForever && canCompeteUnderSaddle(h)).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}
        </select>
        <p class='small'>Foals/youngsters under age 3 are in-hand only (registries/breeders), not under-saddle shows.</p>
        <label>Division</label>
        <select id='show-level-${s.key}'>${SHOW_LEVELS[s.key].map((lvl) => `<option>${lvl}</option>`).join('')}</select>
        <button id='enter-${s.key}'>Run Show Now</button>
      </div>
    `).join('')}
  `;

  Object.keys(SHOW_LEVELS).forEach((d) => {
    const btn = document.getElementById(`enter-${d}`);
    if (!btn) return;
    btn.onclick = () => {
      const id = document.getElementById(`show-horse-${d}`).value;
      const level = document.getElementById(`show-level-${d}`).value;
      const horse = app.horses.find((h) => h.id === id);
      if (!horse) return alert('No eligible horse selected.');
      if (!canCompeteUnderSaddle(horse)) return alert('This horse is in-hand only until age 3.');
      runShow(horse, d, level);
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

function renderVet() {
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
    if (!h || !tryCharge(500)) return;
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
    const issue = h.illnesses.find((i) => i.active);
    if (issue) {
      vetNote(h, `${h.name} has ${issue.name}. Estimated recovery ${issue.remaining} months.`);
    } else {
      vetNote(h, `${h.name} has no active injury/illness today.`);
    }
    render();
  };

  document.getElementById('vet-heal').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(750)) return;
    const issue = h.illnesses.find((i) => i.active);
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
      mare.gestation = 0;
      mare.foalDue = rnd(10, 13);
      vetNote(mare, `AI success for ${mare.name} using ${straw.stallionName}. Due in ~${mare.foalDue} months.`);
    } else {
      vetNote(mare, `AI attempt failed for ${mare.name} using ${straw.stallionName}.`);
    }
    render();
  };

  document.getElementById('vet-flush').onclick = () => {
    const mare = selectedMare();
    const strawId = document.getElementById('vet-straw').value;
    const straw = app.semenStraws.find((s) => s.id === strawId);
    if (!mare || !straw || !tryCharge(1000)) return;
    if (!mare.retiredToBreeding) { app.money += 1000; return alert('Mare must be retired to breeding for embryo flush.'); }
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
      mare.gestation = 0;
      mare.foalDue = rnd(10, 13);
      vetNote(mare, `Embryo transfer successful for ${mare.name}. Due in ~${mare.foalDue} months.`);
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
    mare.gestation = 0;
    mare.foalDue = 0;
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
    h.lastFarrierMonth = app.year * 12 + app.month;
    h.due.farrier = false;
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
  const opts = app.horses.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
  const foalOpts = app.horses.filter((h) => h.age < 3).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
  document.getElementById('training').innerHTML = `
    <h2>Training Grounds + Clinic (free)</h2>
    <div class='grid two'>
      <div class='box'>
        <label>Horse</label><select id='train-horse'>${opts}</select>
        <label>Discipline</label><select id='train-disc'>${Object.keys(SHOW_LEVELS).map((d) => `<option>${d}</option>`).join('')}</select>
        <label>Exercise</label><select id='train-ex'></select>
        <button id='do-train'>Train</button>
      </div>
      <div class='box'>
        <h3>Training Clinic</h3>
        <label>Discipline</label><select id='clinic-disc'>${Object.keys(SHOW_LEVELS).map((d) => `<option>${d}</option>`).join('')}</select>
        <button id='clinic'>Run Gold Clinic Evaluation</button>
      </div>
    </div>
    <div class='box'>
      <h3>Foal Handling (under age 3)</h3>
      ${foalOpts ? `<label>Foal</label><select id='foal-horse'>${foalOpts}</select>` : '<p class="small">No foals or young horses available.</p>'}
      <label>Exercise</label>
      <select id='foal-ex' ${foalOpts ? '' : 'disabled'}>
        <option>Weaning</option>
        <option>Lunging</option>
        <option>Petting</option>
        <option>Standing Still</option>
      </select>
      <button id='do-foal-train' ${foalOpts ? '' : 'disabled'}>Handle Foal</button>
      <p class='small'>Foal handling boosts behavior and gives tiny skill gains.</p>
    </div>
  `;

  const EXERCISES = {
    jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
    dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness'],
    hunter: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
    eventing: ['Collection', 'Connection', 'Rhythm', 'Striding', 'Confidence', 'Speed']
  };
  const FOAL_TRAINING = {
    Weaning: { behavior: [1, 2], dressage: ['Balance', 'Rhythm'] },
    Lunging: { behavior: [1, 2], jumping: ['Striding', 'Balance'] },
    Petting: { behavior: [2, 3], dressage: ['Connection'], jumping: ['Confidence'] },
    'Standing Still': { behavior: [1, 2], dressage: ['Collection'], jumping: ['Structure'] }
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
    if (!selection.horseId && app.horses.length) selection.horseId = app.horses[0].id;
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
  applyTrainingSelection();

  document.getElementById('do-train').onclick = () => {
    const h = app.horses.find((x) => x.id === horseSelect.value);
    const d = disciplineSelect.value;
    const ex = exerciseSelect.value;
    if (!h) return;
    if (h.age < 3) {
      alert('Foals and young horses should use Foal Handling until age 3.');
      return;
    }
    if (h.illnesses.some((i) => i.active)) {
      alert('This horse is recovering and cannot train until fully healed.');
      return;
    }
    const profile = personalityProfile(h.personality);
    const good = rnd(1, 100) > Math.max(5, 18 - profile.trainDelta);

    const applyBoost = (group, key, capDiscipline) => {
      if (!key || group[key] == null) return;
      if (good) {
        const extra = h.trainingBoost ? Math.max(0, Math.round(h.trainingBoost / 2)) : 0;
        group[key] = clampSkill(h, capDiscipline, group[key] + rnd(1, 4) + extra);
      }
    };

    if (d === 'dressage') applyBoost(h.stats.dressage, ex, 'dressage');
    if (d === 'jumping') applyBoost(h.stats.jumping, ex, 'jumping');
    if (d === 'hunter') applyBoost(h.stats.jumping, ex, 'hunter');
    if (d === 'eventing') {
      if (h.stats.dressage[ex] != null) applyBoost(h.stats.dressage, ex, 'eventing');
      if (h.stats.jumping[ex] != null) applyBoost(h.stats.jumping, ex, 'eventing');
    }

    h.managed.trained = true;
    h.trainingSessionsThisMonth = (h.trainingSessionsThisMonth || 0) + 1;
    pushReport(`${h.name} ${good ? 'improved during' : 'struggled with'} ${ex}.`);
    render();
  };

  document.getElementById('clinic').onclick = () => {
    const h = app.horses.find((x) => x.id === horseSelect.value);
    const disc = document.getElementById('clinic-disc').value;
    if (!h) return;
    const maxByPotential = SHOW_LEVELS[disc][highestAllowedLevelIndex(h, disc)];
    pushReport(`Clinic: ${h.name} ${cap(disc)} potential ${h.potential[disc]}%. Suggested current max level: ${maxByPotential}.`);
    render();
  };

  const foalButton = document.getElementById('do-foal-train');
  if (foalButton) {
    foalButton.onclick = () => {
      const foalId = document.getElementById('foal-horse')?.value;
      const foal = app.horses.find((x) => x.id === foalId);
      const ex = document.getElementById('foal-ex')?.value;
      if (!foal || foal.age >= 3 || !FOAL_TRAINING[ex]) return;
      if (foal.illnesses.some((i) => i.active)) {
        alert('This foal is recovering and cannot be handled yet.');
        return;
      }
      const plan = FOAL_TRAINING[ex];
      foal.behavior = Math.max(0, (foal.behavior || 0) + rnd(plan.behavior[0], plan.behavior[1]));
      (plan.dressage || []).forEach((skill) => {
        foal.stats.dressage[skill] = clampSkill(foal, 'dressage', foal.stats.dressage[skill] + rnd(1, 2));
      });
      (plan.jumping || []).forEach((skill) => {
        foal.stats.jumping[skill] = clampSkill(foal, 'jumping', foal.stats.jumping[skill] + rnd(1, 2));
      });
      foal.managed.trained = true;
      pushReport(`${foal.name} completed foal handling: ${ex}.`);
      render();
    };
  }
}


function renderBreeding() {
  const broodmares = app.horses.filter((h) => h.gender === 'Mare' && h.retiredToBreeding && !h.retiredForever);
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);

  document.getElementById('breeding').innerHTML = `
    <h2>Breeding Barn</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Breeding Status</h3>
        ${broodmares.length ? broodmares.map((m) => `<p>${m.name}: Pregnant ${m.pregnantBy || m.pregnantEmbryo ? 'Y' : 'N'}${m.pregnantBy || m.pregnantEmbryo ? ` (${m.gestation || 0} month(s))` : ''}</p>`).join('') : '<p class="small">No mares retired to breeding.</p>'}
        <p class='small'>Only retired-to-breeding mares can carry pregnancies.</p>
      </div>
      <div class='box'>
        <h3>Offspring Records</h3>
        <button id='toggle-offspring'>${app.showOffspringWindow ? 'Close Window' : 'Open Window'}</button>
        ${app.showOffspringWindow ? (() => {
          const unique = new Map();
          app.horses.forEach((h) => {
            h.offspring.forEach((o) => {
              const key = o.foalId || `${o.name}-${o.otherParentName}`;
              if (!unique.has(key)) unique.set(key, o);
            });
          });
          const rows = Array.from(unique.values()).map((o) => `<p>${o.name} — ${o.otherParentRole}: ${o.otherParentName} • Age ${o.age}</p>`).join('');
          return rows || '<p class="small">No offspring records yet.</p>';
        })() : '<p class="small">Offspring window closed.</p>'}
      </div>
    </div>
  `;

  document.getElementById('toggle-offspring').onclick = () => {
    app.showOffspringWindow = !app.showOffspringWindow;
    renderBreeding();
  };
}

function registryInspectionScore(horse) {
  const conformationMap = {
    'Very Bad': 3,
    Bad: 4.5,
    Acceptable: 6.5,
    Good: 7.7,
    'Very Good': 8.7,
    Excellent: 9.6
  };
  const pedigreeScore = Math.max(1, Math.min(10, 10 - (horse.coi || 0) / 3));
  const potentialAvg = Object.values(horse.potential || {}).reduce((a, b) => a + b, 0) / 4;
  const potentialScore = Math.max(1, Math.min(10, potentialAvg / 10));
  const conformationScore = conformationMap[horse.conformation] || 4;
  const baseTotal = (conformationScore + pedigreeScore + potentialScore) / 3;
  const totalScore = baseTotal >= 9.5 ? baseTotal : Math.min(9.4, baseTotal + 0.5);
  return { conformationScore, pedigreeScore, potentialScore, totalScore };
}

function runRegistryInspection(horse) {
  if (!horse) return null;
  if (!['Mare', 'Stallion'].includes(horse.gender)) {
    alert('Only mares and stallions can participate in inspections.');
    return null;
  }
  if (horse.registryInspection) {
    alert('This horse already completed an inspection.');
    return null;
  }
  const scores = registryInspectionScore(horse);
  let result = 'Fail';
  let title = '';
  if (scores.totalScore >= 9.5) {
    result = 'Elite';
    title = 'Elite';
  } else if (scores.totalScore >= 8) {
    result = 'Golden';
    title = 'Golden';
  } else if (scores.totalScore >= 5) {
    result = 'Pass';
  }
  const branding = result === 'Pass' || result === 'Golden' || result === 'Elite' ? BREED_BRANDINGS[horse.breed] : '';
  let placement = '';
  if (branding) {
    const placementInput = prompt(`Congratulations, ${horse.name} has received branding. Please choose its placing (Beginning/End).`, 'Beginning');
    placement = placementInput && placementInput.toLowerCase().includes('end') ? 'End' : 'Beginning';
  }
  horse.registryInspection = {
    date: dateLabel(),
    conformation: scores.conformationScore,
    pedigree: scores.pedigreeScore,
    potential: scores.potentialScore,
    totalScore: scores.totalScore,
    result,
    title,
    branding,
    placement
  };
  horse.showInspectionDetails = true;
  if (branding) {
    alert(`Congratulations, ${horse.name} has received branding ${branding}.`);
  } else {
    alert(`${horse.name} did not receive branding.`);
  }
  pushReport(`${horse.name} registry inspection result: ${result} (${scores.totalScore.toFixed(2)}).`);
  return horse.registryInspection;
}

function renderRegistries() {
  const groups = BREEDS.map((breed) => {
    const horses = app.horses.filter((h) => h && h.breed === breed);
    return { breed, prefix: breed.split(' ').map((w) => w[0]).join(''), horses };
  });

  document.getElementById('registries').innerHTML = `
    <h2>Studbooks & Registries</h2>
    <div class='cards'>
      ${groups.map((g) => `
        <div class='box'>
          <h3>${g.breed} Registry (${g.prefix})</h3>
          <p>Registered Horses: ${g.horses.length}</p>
          <label>Horse</label>
          <select data-reg='${g.breed}' data-role='horse'>
            ${g.horses.filter((h) => ['Mare', 'Stallion'].includes(h.gender) && !h.retiredForever).map((h) => `
              <option value='${h.id}' ${h.registryInspection ? 'disabled' : ''}>${horseDisplayName(h)}${h.registryInspection ? ' (inspected)' : ''}</option>
            `).join('') || '<option disabled>No eligible horses</option>'}
          </select>
          <button data-reg='${g.breed}' data-action='inspect'>Join Inspection</button>
          <button data-reg='${g.breed}' data-action='riding'>Join Riding Test</button>
          <button data-reg='${g.breed}' data-action='expo'>Join Breed Expo</button>
        </div>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('#registries button[data-reg]').forEach((btn) => {
    btn.onclick = () => {
      const breed = btn.dataset.reg;
      const horses = app.horses.filter((h) => h && h.breed === breed && !h.retiredForever);
      if (!horses.length) return alert(`No eligible ${breed} horses.`);
      const select = document.querySelector(`#registries select[data-reg='${breed}']`);
      const selectedId = select?.value;
      const selectedHorse = app.horses.find((h) => h.id === selectedId);
      const winner = horses.sort((a, b) => horseWorth(b) - horseWorth(a))[0];
      const action = btn.dataset.action;
      if (action === 'inspect') {
        if (!selectedHorse) return alert('No eligible horse selected.');
        runRegistryInspection(selectedHorse);
      }
      if (action === 'riding') {
        if (!canCompeteUnderSaddle(winner)) {
          pushReport(`${winner.name} is under age 3 and can only do in-hand registry events right now.`);
        } else {
          pushReport(`${winner.name} completed ${breed} riding test and gained registry points.`);
        }
      }
      if (action === 'expo') pushReport(`${winner.name} represented your stable at the ${breed} breed expo.`);
      render();
    };
  });
}

function renderBreeders() {
  document.getElementById('breeders').innerHTML = `
    <h2>Breeders' Show</h2>
    <div class='box'>
      <label>Horse</label>
      <select id='breed-horse'>${app.horses.filter((h) => !h.retiredForever).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}</select>
      <button id='enter-breeder'>Enter Horse ($100)</button>
      <p class='small'>Foals/youngsters under 3 enter in-hand classes only. At 3+, they may continue here and also compete under saddle. Each horse may enter 4 times per month.</p>
    </div>
  `;

  document.getElementById('enter-breeder').onclick = () => {
    const horse = app.horses.find((h) => h.id === document.getElementById('breed-horse').value);
    if (!horse || !tryCharge(100)) return;
    if ((horse.breedersEntries || 0) >= 4) {
      alert('Horse already entered 4 times this month.');
      app.money += 100;
      return;
    }
    horse.breedersEntries = (horse.breedersEntries || 0) + 1;
    const conf = CONFORMATION_MULT[horse.conformation] * 32;
    const worthInfluence = horseWorth(horse) / 1400;
    const talentBoost = horse.extraPotential ? 4 : 0;
    const score = Math.round(conf + worthInfluence + talentBoost + rnd(20, 40));
    const placing = score > 93 ? 1 : score > 88 ? 2 : score > 82 ? 3 : rnd(4, 20);
    const payout = placing === 1 ? 1500 : placing === 2 ? 900 : placing === 3 ? 500 : 120;
    app.money += payout;
    horse.earnings += payout;
    if (placing <= 3) horse.topWins.breed += 1;
    if (placing === 1) horse.topWins.overall += 1;
    const showType = canCompeteUnderSaddle(horse) ? 'under-saddle or in-hand' : 'in-hand';
    pushReport(`Breeders' Show (${showType}): ${horse.name} scored ${score}, placed #${placing}, won ${money(payout)}.`);
    render();
  };
}

function renderFreezer() {
  document.getElementById('freezer').innerHTML = `
    <h2>Freezer</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Semen Straws</h3>
        ${app.semenStraws.map((s) => `<p class='small'>${s.stallionName} • Straw #${s.id}</p>`).join('') || '<p class="small">No straws stored.</p>'}
      </div>
      <div class='box'>
        <h3>Embryos</h3>
        ${app.embryos.map((e) => `<p class='small'>${e.donor} x ${e.sire} • Embryo #${e.id}</p>`).join('') || '<p class="small">No embryos stored.</p>'}
      </div>
    </div>
  `;
}

function injuryChanceByGenetics(horse) {
  if (horse.healthGenetics === 'Low') return 5;
  if (horse.healthGenetics === 'High') return 12;
  return 8;
}

function maybeAddRandomIllness(horse) {
  if (horse.illnesses.some((i) => i.active)) return;
  if (rnd(1, 100) <= injuryChanceByGenetics(horse)) {
    const picked = pick(SICKNESS_TYPES);
    const remaining = injuryRecoveryMonths(picked.severity);
    const isSevere = ['Severe', 'Very Severe'].includes(picked.severity) || remaining > 2;
    const lastSevere = horse.injuryProtection?.[picked.name];
    if (isSevere && lastSevere && currentMonthIndex() - lastSevere <= 24) {
      if (rnd(1, 100) <= 90) return;
    }
    const surgeryRoll = picked.surgeryRisk ? rnd(1, 100) : 0;
    if (picked.surgeryRisk && surgeryRoll <= picked.surgeryRisk) {
      const died = rnd(1, 100) <= Math.min(90, picked.surgeryRisk + 10);
      if (died) {
        horse.deceased = true;
        pushReport(`${horse.name} suffered ${picked.name} and did not survive surgery.`);
        return;
      }
    }
    horse.illnesses.push({ name: picked.name, impact: picked.impact, remaining, active: true, severity: picked.severity, retirementRisk: picked.retirementRisk || 0 });
    applySoundnessLoss(horse, picked.severity);
    if (isSevere) {
      horse.injuryProtection[picked.name] = currentMonthIndex();
    }
    pushReport(`${horse.name} developed ${picked.name} (${picked.severity}). Recovery ${remaining} month(s).`);
  }
}

function applySoundnessWear(horse) {
  if (horse.retiredForever || horse.retiredToBreeding) return;
  if (horse.soundnessYears > 0) {
    horse.soundnessExpiredMonths = 0;
    return;
  }
  horse.soundnessExpiredMonths = (horse.soundnessExpiredMonths || 0) + 1;
  if (horse.unridable) return;
  if (horse.soundnessExpiredMonths >= 24) {
    horse.unridable = true;
    horse.retiredForever = true;
    horse.illnesses.push({
      name: 'Kissing Spines',
      impact: 45,
      remaining: 999,
      active: true,
      severity: 'Very Severe',
      retirementRisk: 100
    });
    pushReport(`${horse.name} developed kissing spines after extended competition and is now unridable.`);
    return;
  }
  if (horse.illnesses.some((i) => i.active)) return;
  const monthsSinceIssue = currentMonthIndex() - (horse.lastSoundnessIssueMonth || 0);
  if (monthsSinceIssue < 6) return;
  const isLongTerm = horse.soundnessExpiredMonths >= 12;
  const remaining = isLongTerm ? rnd(3, 6) : 1;
  horse.illnesses.push({
    name: isLongTerm ? 'Soundness Breakdown' : 'Soundness Strain',
    impact: isLongTerm ? 18 : 6,
    remaining,
    active: true,
    severity: isLongTerm ? 'Severe' : 'Easy',
    retirementRisk: isLongTerm ? 12 : 0
  });
  horse.lastSoundnessIssueMonth = currentMonthIndex();
  pushReport(`${horse.name} developed ${isLongTerm ? 'a soundness breakdown' : 'a soundness strain'} (${remaining} month recovery).`);
}

function processPregnancy(horse, newborns) {
  if (!(horse.pregnantBy || horse.pregnantEmbryo)) return;
  horse.gestation = (horse.gestation || 0) + 1;
  const due = horse.foalDue || 11;
  if (horse.gestation >= due) {
    const foal = baseHorse('untrained');
    foal.age = 0;
    const embryo = horse.pregnantEmbryo;
    const damHorse = embryo?.donorId ? app.horses.find((x) => x.id === embryo.donorId) : horse;
    const damName = damHorse?.name || horse.name;
    const sireName = horse.pregnantBy || embryo?.sire || 'Unknown Sire';
    const sireHorse = embryo?.sireId
      ? app.horses.find((x) => x.id === embryo.sireId)
      : app.horses.find((x) => x.name === sireName && x.gender === 'Stallion');
    foal.breed = sireHorse && damHorse && sireHorse.breed !== damHorse.breed
      ? `${damHorse.breed} 50% x ${sireHorse.breed} 50%`
      : (damHorse?.breed || horse.breed);
    foal.name = `Foal of ${damName}`;
    foal.bredBy = 'Your Stable';
    foal.owner = 'Your Stable';
    foal.gender = pick(['Mare', 'Stallion']);
    foal.potential = foalPotential(damHorse, sireHorse);
    foal.extraPotential = inheritExtraPotential(damHorse, sireHorse);
    if (foal.extraPotential) {
      Object.keys(foal.potential).forEach((k) => {
        foal.potential[k] = Math.min(100, foal.potential[k] + rnd(3, 8));
      });
    }
    const damTrait = damHorse?.personality || pick(PERSONALITIES);
    const sireTrait = sireHorse?.personality || pick(PERSONALITIES);
    foal.personality = rnd(1, 100) <= 45 ? damTrait : rnd(1, 100) <= 60 ? sireTrait : pick(PERSONALITIES);
    foal.socks = pick(SOCKS);
    foal.faceMarking = pick(FACE_MARKINGS);
    foal.marking = randomMarking(foal.breed);
    foal.pedigree = {
      sire: sireHorse ? { id: sireHorse.id, name: sireHorse.name, breed: sireHorse.breed, coat: sireHorse.coat } : { name: sireName, breed: sireHorse?.breed || 'Unknown', coat: sireHorse?.coat || 'Unknown' },
      dam: damHorse ? { id: damHorse.id, name: damHorse.name, breed: damHorse.breed, coat: damHorse.coat } : { name: damName, breed: damHorse?.breed || 'Unknown', coat: damHorse?.coat || 'Unknown' },
      sireSire: sireHorse?.pedigree?.sire || null,
      sireDam: sireHorse?.pedigree?.dam || null,
      damSire: damHorse?.pedigree?.sire || null,
      damDam: damHorse?.pedigree?.dam || null
    };
    ensurePedigreeBase(foal);
    foal.stats.dressage = { Collection: 0, Balance: 0, Connection: 0, Gaits: 0, Rhythm: 0, Flowiness: 0 };
    foal.stats.jumping = { Striding: 0, Confidence: 0, Balance: 0, Power: 0, Speed: 0, Structure: 0 };
    if (damHorse) damHorse.offspring.push({ foalId: foal.id, name: foal.name, otherParentRole: 'Sire', otherParentName: sireName, age: foal.age });
    if (sireHorse) sireHorse.offspring.push({ foalId: foal.id, name: foal.name, otherParentRole: 'Dam', otherParentName: damName, age: foal.age });
    newborns.push(foal);
    delete horse.pregnantBy;
    delete horse.pregnantEmbryo;
    horse.gestation = 0;
    horse.foalDue = 0;
    pushReport(`${horse.name} foaled successfully: ${foal.name}.`);
  }
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
  app.month += 1;
  if (app.month > 12) {
    app.month = 1;
    app.year += 1;
    app.horses.forEach((h) => {
      h.age += 1;
      h.due.checkup = true;
      if (!h.retiredForever && !h.retiredToBreeding) {
        h.soundnessYears = Math.max(0, (h.soundnessYears ?? 0) - 1);
      }
    });
  }

  const survivors = [];
  const newborns = [];
  app.horses.forEach((h) => {
    processPregnancy(h, newborns);
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
    const monthsSinceFarrier = app.year * 12 + app.month - (h.lastFarrierMonth || 0);
    h.due.farrier = monthsSinceFarrier >= 6;
    h.managed = { fed: false, vet: false, farrier: !h.due.farrier, showEntry: false, breedersEntry: false, trained: false };
    h.breedersEntries = 0;
    h.offspring.forEach((o) => { if (app.month === 1) o.age += 1; });
    updateMonthlyCare(h);
    if (!processAgingAndMortality(h)) survivors.push(h);
  });
  app.horses = survivors.concat(newborns);
  refreshNpcAds();
}


function render() {
  ensurePanels();
  safeRun('updateHeader', updateHeader);
  safeRun('renderDashboard', renderDashboard);
  safeRun('renderHorses', renderHorses);
  safeRun('renderMarket', renderMarket);
  safeRun('renderSales', renderSales);
  safeRun('renderStud', renderStud);
  safeRun('renderShows', renderShows);
  safeRun('renderVet', renderVet);
  safeRun('renderFarrier', renderFarrier);
  safeRun('renderTraining', renderTraining);
  safeRun('renderBreeding', renderBreeding);
  safeRun('renderRegistries', renderRegistries);
  safeRun('renderBreeders', renderBreeders);
  safeRun('renderFreezer', renderFreezer);
}

const skipBtn = document.getElementById('skipMonthBtn');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const saveGameBtn = document.getElementById('saveGameBtn');
const loadGameBtn = document.getElementById('loadGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
if (skipBtn) skipBtn.onclick = () => { monthlyProgress(); render(); saveGame(false); };
if (addMoneyBtn) addMoneyBtn.onclick = () => { app.money += 100000; render(); saveGame(false); };
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

try {
  seed();
  loadGame(false);
  ensurePanels();
  buildTabs();
  render();
} catch (error) {
  console.error('Startup failed', error);
  showFatal(error.message);
}
