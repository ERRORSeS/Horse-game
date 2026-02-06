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

const CONFORMATION_MULT = {
  'Very Bad': 0.78,
  Bad: 0.86,
  Acceptable: 0.95,
  Good: 1.02,
  'Very Good': 1.1,
  Excellent: 1.2
};

const SICKNESS_TYPES = [
  { name: 'Colic', impact: 10 },
  { name: 'Lameness', impact: 14 },
  { name: 'Respiratory Disease', impact: 8 },
  { name: 'Tendon Strain', impact: 12 },
  { name: 'Metabolic Flare', impact: 9 }
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
  reports: [],
  showOffspringWindow: true
};

const SAVE_KEY = 'horse_game_save_v1';
const tabs = ['dashboard', 'horses', 'market', 'sales', 'stud', 'shows', 'vet', 'farrier', 'training', 'breeding', 'registries', 'breeders', 'freezer'];

const uid = () => Math.random().toString(36).slice(2, 9);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const money = (v) => `$${Math.round(v).toLocaleString()}`;
const dateLabel = () => `Y${app.year}M${app.month}`;
const cap = (t) => t[0].toUpperCase() + t.slice(1);

function normalizeMarkingForBreed(marking, breed) {
  if (!marking.includes('Rabicano')) return marking;
  const lower = String(breed || '').toLowerCase();
  if (lower.includes('arab')) return marking;
  return pick(MARKINGS.filter((m) => m !== 'Rabicano'));
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
  app.horses = Array.isArray(data.horses) ? data.horses : [];
  app.semenStraws = Array.isArray(data.semenStraws) ? data.semenStraws : [];
  app.embryos = Array.isArray(data.embryos) ? data.embryos : [];
  app.saleBarn = Array.isArray(data.saleBarn) ? data.saleBarn : [];
  app.reports = Array.isArray(data.reports) ? data.reports : [];
  app.showOffspringWindow = data.showOffspringWindow !== false;

  app.horses.forEach((h) => {
    h.socks = h.socks || pick(SOCKS);
    h.faceMarking = h.faceMarking || pick(FACE_MARKINGS);
    h.marking = normalizeMarkingForBreed(h.marking || 'None', h.breed);
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
  });
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
  return horse.age >= 3;
}

function horseLifeStage(horse) {
  if (horse.age < 1) return 'Foal';
  if (horse.age < 3) return 'Young Horse';
  return 'Mature Horse';
}

function horseDisciplineAverage(horse, discipline) {
  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  const jumpAvg = Object.values(jump).reduce((a, b) => a + b, 0) / 6;
  const dressAvg = Object.values(dress).reduce((a, b) => a + b, 0) / 6;
  if (discipline === 'dressage') return dressAvg;
  if (discipline === 'jumping') return (jumpAvg * 0.85) + (dress.Connection * 0.15);
  if (discipline === 'hunter') {
    return (dress.Flowiness + dress.Balance + dress.Collection + jump.Striding + jump.Confidence + jump.Balance + jump.Structure) / 7;
  }
  return (jumpAvg + dressAvg) / 2;
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
  return Math.min(raw, horse.potential[discipline] || 100);
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
  const training = Object.values(horse.stats.dressage).reduce((a, b) => a + b, 0) + Object.values(horse.stats.jumping).reduce((a, b) => a + b, 0);
  const resultsBonus = horse.totalPoints * 25 + horse.championships * 450 + horse.reserves * 250;
  const conformBonus = CONFORMATION_MULT[horse.conformation] || 1;
  const potentialBonus = (horse.potential.dressage + horse.potential.jumping + horse.potential.eventing + horse.potential.hunter) * 9;
  const agePenalty = horse.age > 16 ? (horse.age - 16) * 300 : 0;
  return Math.max(350, Math.round((1500 + training * 6 + potentialBonus + resultsBonus - agePenalty) * conformBonus));
}

function baseHorse(type = 'trained') {
  const minAge = type === 'untrained' ? 4 : type === 'trained' ? 8 : 10;
  const maxAge = type === 'untrained' ? 6 : type === 'trained' ? 11 : 12;
  const name = `${pick(['Silver', 'Midnight', 'Winter', 'Storm', 'Emerald', 'Hope', 'Royal', 'Velvet'])} ${pick(['Dream', 'River', 'Valor', 'Cross', 'Echo', 'Flight', 'Blessing'])}`;
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
    conformation: pick(CONFORMATION),
    height: `${rnd(14, 18)}.${rnd(0, 3)} hh`,
    soundnessYears: rnd(1, 15),
    owner: 'Your Stable',
    bredBy: 'Your Stable',
    retiredToBreeding: false,
    retiredForever: false,
    managed: { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false },
    due: { checkup: true, farrier: true },
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
    offspring: []
  };
  horse.marking = normalizeMarkingForBreed(pick(MARKINGS), horse.breed);
  return horse;
}


function seed() {
  app.horses = [baseHorse('trained'), baseHorse('untrained'), baseHorse('fully')];
  app.saleBarn = [baseHorse('fully'), baseHorse('trained')].map((h, i) => ({ ...h, owner: 'NPC Stable', price: 8000 + i * 4000 }));
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

  node.querySelector('.horse-name').textContent = horse.name;
  const socks = horse.socks || 'None';
  const face = horse.faceMarking || 'Faint';
  node.querySelector('.subline').textContent = `${horse.height} | ${horse.coat} | ${socks} | ${horse.marking} | Face: ${face} | ${horse.age} | ${horse.gender} | ${horseLifeStage(horse)}`;
  node.querySelector('.meta').textContent = `${horse.breed} • Conformation: ${horse.conformation} • COI: ${horse.coi}% • Soundness: ${horse.soundnessYears} years est. • Worth: ${money(horseWorth(horse))}${activeIssue ? ` • Active issue: ${activeIssue.name}` : ''} • ${canCompeteUnderSaddle(horse) ? 'Under saddle eligible' : 'In-hand/registry only until age 3'}`;

  const dList = node.querySelector('.dressage-stats');
  Object.entries(horse.stats.dressage).forEach(([k, v]) => { dList.innerHTML += `<li>${k}: ${v}</li>`; });
  const jList = node.querySelector('.jump-stats');
  Object.entries(horse.stats.jumping).forEach(([k, v]) => { jList.innerHTML += `<li>${k}: ${v}</li>`; });

  node.querySelector('.results').innerHTML = `
    <h4>Competition Results</h4>
    <p>Total Points: ${horse.totalPoints} | Championships: ${horse.championships} | Reserves: ${horse.reserves}</p>
    <p>Lifetime Earnings: ${money(horse.earnings)}</p>
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
    <button data-action='vet-notes'>${horse.showVetNotes ? 'Hide Vet Notes' : 'Show Vet Notes'}</button>
    ${horse.showVetNotes ? `<div class='box'>${horse.vetNotes.length ? horse.vetNotes.map((n) => `<p class='small'>${n.date}: ${n.text}</p>`).join('') : '<p class="small">No vet notes yet.</p>'}</div>` : ''}
  `;

  node.querySelectorAll('[data-action]').forEach((btn) => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      if (action === 'rename') {
        const val = node.querySelector('input').value.trim();
        if (val) horse.name = val;
      }
      if (action === 'retire-breeding') horse.retiredToBreeding = !horse.retiredToBreeding;
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
      if (action === 'vet-notes') horse.showVetNotes = !horse.showVetNotes;
      if (['feed', 'vet', 'farrier', 'train'].includes(action)) {
        const key = action === 'train' ? 'trained' : action;
        horse.managed[key] = !horse.managed[key];
      }
      render();
    };
  });
  return node;
}

function renderHorses() {
  const el = document.getElementById('horses');
  el.innerHTML = `<h2>Your Horses</h2><div class='cards'></div>`;
  const cards = el.querySelector('.cards');
  app.horses.forEach((h) => cards.append(createHorseCard(h)));
}

function renderMarket() {
  const kinds = [
    { key: 'untrained', cost: 2000 },
    { key: 'trained', cost: 10000 },
    { key: 'fully', cost: 15000 }
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
      const horse = baseHorse(k.key);
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
  el.innerHTML = `<h2>Sales Barn</h2><div class='cards'></div>`;
  const cards = el.querySelector('.cards');

  app.saleBarn.forEach((h, idx) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${h.name}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>${money(h.price)}</p><p class='small'>Seller: ${h.owner}</p><button>Buy Horse</button>`;
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
}

function renderStud() {
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  document.getElementById('stud').innerHTML = `
    <h2>Stud Barn</h2>
    <div class='box'>
      <p>Collect semen and use in reproduction from the vet panel.</p>
      <div class='cards'>
        ${stallions.map((h) => `<div class='box'><h3>${h.name}</h3><p>Cover $900 | Straw Collection $500</p><button data-id='${h.id}'>Collect Semen</button></div>`).join('') || '<p>No stallions available.</p>'}
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
  const idx = levelIndex(discipline, level);
  const maxIdx = highestAllowedLevelIndex(horse, discipline);
  if (idx > maxIdx) {
    pushReport(`${horse.name} is not trained enough for ${discipline} ${level}. Max allowed right now: ${SHOW_LEVELS[discipline][maxIdx]}.`);
    return;
  }

  const [minReq] = requiredSkillBand(discipline, level);
  const skill = effectiveDisciplineSkill(horse, discipline);
  const conformationBoost = (CONFORMATION_MULT[horse.conformation] - 1) * 8;
  const illnessPenalty = horse.illnesses.filter((i) => i.active).reduce((a, i) => a + i.impact, 0);
  const score = Math.max(0, Math.min(100, Math.round(skill + conformationBoost - illnessPenalty + rnd(-4, 6) - Math.max(0, minReq - skill) * 1.4)));
  const placing = score >= 95 ? 1 : score >= 90 ? 2 : score >= 85 ? 3 : score >= 78 ? rnd(4, 8) : score >= 68 ? rnd(9, 16) : rnd(17, 25);
  const prize = Math.max(120, Math.round((3000 - placing * 130 + idx * 260) * (placing <= 3 ? 1.4 : 1)));

  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  let resultText = `${score}`;
  if (discipline === 'jumping') {
    const rails = rnd(0, Math.max(0, 3 - Math.floor((jump.Striding + jump.Structure + jump.Power) / 85)));
    const refusal = rnd(1, 100) > jump.Confidence ? 1 : 0;
    const overSec = Math.max(0, rnd(0, 6) - Math.floor(jump.Speed / 22));
    const faults = rails * 4 + refusal * 4 + overSec;
    const time = (65 - Math.min(18, Math.floor(jump.Speed / 5))) + overSec;
    resultText = `${faults} faults | ${time}s`;
  } else if (discipline === 'dressage') {
    const pct = Math.max(45, Math.min(90, (score * 0.55 + 35) + rnd(-2, 2))).toFixed(2);
    resultText = `${pct}%`;
  } else if (discipline === 'eventing') {
    const rails = rnd(0, 2);
    const refusal = score < 70 && rnd(1, 100) > 70 ? 1 : 0;
    const over = Math.max(0, rnd(0, 10) - Math.floor((jump.Speed + jump.Confidence) / 40));
    const penalties = (rails * 4) + (refusal * 20) + (over * 0.4);
    resultText = `${penalties.toFixed(1)} penalties`;
  } else if (discipline === 'hunter') {
    const faults = Math.max(0, rnd(0, 8) - Math.floor((dress.Flowiness + dress.Balance + jump.Striding + jump.Structure) / 70));
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
          ${app.horses.filter((h) => !h.retiredForever && canCompeteUnderSaddle(h)).map((h) => `<option value='${h.id}'>${h.name}</option>`).join('')}
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
  const opts = app.horses.map((h) => `<option value='${h.id}'>${h.name}</option>`).join('');

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
        <label>Stallion for collection</label><select id='vet-stallion'>${stallions.map((h) => `<option value='${h.id}'>${h.name}</option>`).join('')}</select>
        <button id='vet-collect'>Semen Collection ($500)</button>
        <label>Mare for breeding</label><select id='vet-mare'>${mares.map((h) => `<option value='${h.id}'>${h.name}</option>`).join('')}</select>
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
    const line = h.soundnessYears > 10 ? 'lots of years left' : h.soundnessYears > 4 ? 'moderate time left' : 'might consider retiring soon';
    vetNote(h, `${h.name} soundness forecast: ${line}.`);
    render();
  };

  document.getElementById('vet-gelding').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(500)) return;
    h.gender = 'Gelding';
    Object.keys(h.potential).forEach((k) => { h.potential[k] += rnd(0, 5); });
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
      issue.active = false;
      issue.remaining = 0;
      vetNote(h, `${h.name} treated successfully for ${issue.name}.`);
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
    for (let i = 0; i < n; i++) app.embryos.push({ id: uid(), donor: mare.name, sire: straw.stallionName });
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
    h.due.farrier = false;
    if (cost === 120) {
      h.stats.dressage.Collection = Math.min(100, h.stats.dressage.Collection + 2);
      h.stats.dressage.Connection = Math.min(100, h.stats.dressage.Connection + 2);
    }
    if (cost === 150) {
      h.stats.jumping.Striding = Math.min(100, h.stats.jumping.Striding + 2);
      h.stats.jumping.Power = Math.min(100, h.stats.jumping.Power + 2);
    }
    pushReport(`${h.name} farrier appointment complete.`);
    render();
  };
}

function renderTraining() {
  const opts = app.horses.map((h) => `<option value='${h.id}'>${h.name}</option>`).join('');
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
        <button id='clinic'>Run Gold Clinic Evaluation</button>
      </div>
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
  const renderExercises = () => {
    const disc = disciplineSelect.value;
    exerciseSelect.innerHTML = EXERCISES[disc].map((e) => `<option>${e}</option>`).join('');
  };
  disciplineSelect.onchange = renderExercises;
  renderExercises();

  document.getElementById('do-train').onclick = () => {
    const h = app.horses.find((x) => x.id === document.getElementById('train-horse').value);
    const d = document.getElementById('train-disc').value;
    const ex = document.getElementById('train-ex').value;
    if (!h) return;
    const good = rnd(1, 100) > 18;

    const applyBoost = (group, key) => {
      if (!key || !group[key]) return;
      if (good) group[key] = Math.min(100, group[key] + rnd(1, 4));
    };

    if (d === 'dressage') applyBoost(h.stats.dressage, ex);
    if (d === 'jumping' || d === 'hunter') applyBoost(h.stats.jumping, ex);
    if (d === 'eventing') {
      if (h.stats.dressage[ex] != null) applyBoost(h.stats.dressage, ex);
      if (h.stats.jumping[ex] != null) applyBoost(h.stats.jumping, ex);
    }

    h.managed.trained = true;
    pushReport(`${h.name} ${good ? 'improved during' : 'struggled with'} ${ex}.`);
    render();
  };

  document.getElementById('clinic').onclick = () => {
    const h = app.horses.find((x) => x.id === document.getElementById('train-horse').value);
    if (!h) return;
    const best = Object.entries(h.potential).sort((a, b) => b[1] - a[1])[0];
    const maxByPotential = SHOW_LEVELS[best[0]][highestAllowedLevelIndex(h, best[0])];
    pushReport(`Clinic: ${h.name} best potential in ${best[0]} (${best[1]}%). Suggested current max level: ${maxByPotential}.`);
    render();
  };
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

function renderRegistries() {
  const groups = BREEDS.map((breed) => {
    const horses = app.horses.filter((h) => h.breed === breed);
    const horse = { breed, prefix: breed.split(' ').map((w) => w[0]).join(''), horses };
  });

  document.getElementById('registries').innerHTML = `
    <h2>Studbooks & Registries</h2>
    <div class='cards'>
      ${groups.map((g) => `
        <div class='box'>
          <h3>${g.breed} Registry (${g.prefix})</h3>
          <p>Registered Horses: ${g.horses.length}</p>
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
      const horses = app.horses.filter((h) => h.breed === breed && !h.retiredForever);
      if (!horses.length) return alert(`No eligible ${breed} horses.`);
      const winner = horses.sort((a, b) => horseWorth(b) - horseWorth(a))[0];
      const action = btn.dataset.action;
      if (action === 'inspect') {
        const score = Math.round((horseDisciplineAverage(winner, 'dressage') + horseDisciplineAverage(winner, 'jumping')) / 2 * 0.7 + rnd(5, 20));
        pushReport(`${winner.name} attended ${breed} inspection (in-hand) and scored ${score}.`);
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
      <select id='breed-horse'>${app.horses.filter((h) => !h.retiredForever).map((h) => `<option value='${h.id}'>${h.name}</option>`).join('')}</select>
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
    const conf = CONFORMATION_MULT[horse.conformation] * 12;
    const score = Math.round(horseWorth(horse) / 900 + conf + rnd(45, 65));
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

function maybeAddRandomIllness(horse) {
  if (horse.illnesses.some((i) => i.active)) return;
  if (rnd(1, 100) <= 8) {
    const picked = pick(SICKNESS_TYPES);
    horse.illnesses.push({ name: picked.name, impact: picked.impact, remaining: rnd(2, 5), active: true });
    pushReport(`${horse.name} developed ${picked.name}. Performance will be affected until healed.`);
  }
}

function processPregnancy(horse, newborns) {
  if (!(horse.pregnantBy || horse.pregnantEmbryo)) return;
  horse.gestation = (horse.gestation || 0) + 1;
  const due = horse.foalDue || 11;
  if (horse.gestation >= due) {
    const foal = baseHorse('untrained');
    foal.age = 0;
    const sireName = horse.pregnantBy || horse.pregnantEmbryo?.sire || 'Unknown Sire';
    const sireHorse = app.horses.find((x) => x.name === sireName && x.gender === 'Stallion');
    foal.breed = sireHorse && sireHorse.breed !== horse.breed ? `${horse.breed} 50% x ${sireHorse.breed} 50%` : horse.breed;
    foal.name = `Foal of ${horse.name}`;
    foal.bredBy = 'Your Stable';
    foal.owner = 'Your Stable';
    foal.gender = pick(['Mare', 'Gelding']);
    foal.socks = pick(SOCKS);
    foal.faceMarking = pick(FACE_MARKINGS);
    foal.marking = normalizeMarkingForBreed(pick(MARKINGS), foal.breed);
    foal.stats.dressage = { Collection: 0, Balance: 0, Connection: 0, Gaits: 0, Rhythm: 0, Flowiness: 0 };
    foal.stats.jumping = { Striding: 0, Confidence: 0, Balance: 0, Power: 0, Speed: 0, Structure: 0 };
    horse.offspring.push({ foalId: foal.id, name: foal.name, otherParentRole: 'Sire', otherParentName: sireName, age: foal.age });
    if (sireHorse) sireHorse.offspring.push({ foalId: foal.id, name: foal.name, otherParentRole: 'Dam', otherParentName: horse.name, age: foal.age });
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
    });
  }

  const survivors = [];
  const newborns = [];
  app.horses.forEach((h) => {
    processPregnancy(h, newborns);
    maybeAddRandomIllness(h);
    h.illnesses.forEach((i) => {
      if (i.active && i.remaining > 0) i.remaining -= 1;
      if (i.active && i.remaining <= 0) i.active = false;
    });
    h.managed = { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false };
    h.due.farrier = true;
    h.breedersEntries = 0;
    h.offspring.forEach((o) => { if (app.month === 1) o.age += 1; });
    if (!processAgingAndMortality(h)) survivors.push(h);
  });
  app.horses = survivors.concat(newborns);
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
if (skipBtn) skipBtn.onclick = () => { monthlyProgress(); render(); saveGame(false); };
if (addMoneyBtn) addMoneyBtn.onclick = () => { app.money += 100000; render(); saveGame(false); };
if (saveGameBtn) saveGameBtn.onclick = () => { if (saveGame(true)) render(); };
if (loadGameBtn) loadGameBtn.onclick = () => { if (loadGame(true)) render(); };

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
