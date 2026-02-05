const BREEDS = [
  'American Warmblood','Baden-Wuerttemberg','Bavarian Warmblood','Belgian Warmblood','Canadian Warmblood',
  'Danish Warmblood','Dutch Warmblood','Gelderlander','Hanoverian','Hessen','Holsteiner','Oldenburg',
  'Polish Warmblood','Rhineland','Selle Francais','Swedish Warmblood','Trakehner','Westphalian','Zweibrucker',
  'Arabian','Draft','Iberian Horse','Riding Pony','Thoroughbred'
];
const COATS = ['Bay','Black','Chestnut','Grey','Palomino','Buckskin','Dun','Roan','Tobiano','Overo','Rabicano'];
const MARKINGS = ['Blaze','Star','Snip','Bald Face','Socks','Stockings','No markings'];
const CONFORMATION = ['Very Bad','Bad','Acceptable','Good','Very Good','Excellent'];
const DISCIPLINES = ['dressage','jumping','eventing','hunter'];

const app = {
  money: 50000,
  month: 1,
  year: 1,
  horses: [],
  semenStraws: [],
  embryos: [],
  saleBarn: [],
  studOffers: [],
  reports: [],
};

const tabs = [
  'dashboard','horses','market','sales','stud','shows','vet','farrier','training','registries','breeders','freezer'
];

const uid = () => Math.random().toString(36).slice(2, 9);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const money = (v) => `$${Math.round(v).toLocaleString()}`;

function baseHorse(type = 'trained') {
  const minAge = type === 'untrained' ? 4 : type === 'trained' ? 8 : 10;
  const maxAge = type === 'untrained' ? 6 : type === 'trained' ? 11 : 12;
  const name = `${pick(['Silver','Midnight','Winter','Storm','Emerald','Hope','Royal','Velvet'])} ${pick(['Dream','River','Valor','Cross','Echo','Flight','Blessing'])}`;
  const potential = {
    dressage: rnd(20, 100),
    jumping: rnd(20, 100),
    eventing: rnd(20, 100),
    hunter: rnd(20, 100)
  };
  return {
    id: uid(),
    name,
    breed: pick(BREEDS),
    gender: pick(['Mare','Stallion','Gelding']),
    age: rnd(minAge, maxAge),
    coat: pick(COATS),
    marking: pick(MARKINGS),
    conformation: pick(CONFORMATION),
    height: `${rnd(14, 18)}.${rnd(0, 3)} hh`,
    soundnessYears: rnd(1, 15),
    owner: 'Your Stable',
    bredBy: 'Your Stable',
    retiredToBreeding: false,
    retiredForever: false,
    managed: { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false },
    due: { checkup: true, farrier: true },
    injuries: [],
    healthRisks: [pick(['Metabolic','Colic','Laminitis','Tendon Strain']), pick(['Arthritis','Respiratory','Ulcers','None'])],
    stats: {
      dressage: { Rhythm: rnd(30, 80), Relaxation: rnd(30, 80), Connection: rnd(30, 80), Impulsion: rnd(30, 80), Straightness: rnd(30, 80), Collection: rnd(30, 80) },
      jumping: { Speed: rnd(30, 80), Confidence: rnd(30, 80), Adjustability: rnd(30, 80), Bascule: rnd(30, 80), Balance: rnd(30, 80), Power: rnd(30, 80) }
    },
    levels: { dressage: 'TL', jumping: '0.90m', eventing: 'EN', hunter: 'NOV' },
    potential,
    coi: rnd(0, 25),
    showResults: [],
    totalPoints: 0,
    championships: 0,
    reserves: 0,
    earnings: 0,
    topWins: { mareFilly: 0, breed: 0, overall: 0, highestScore: 0 }
  };
}

function seed() {
  app.horses = [baseHorse('trained'), baseHorse('untrained'), baseHorse('fully')];
  app.saleBarn = [baseHorse('fully'), baseHorse('trained')].map((h, i) => ({ ...h, owner: 'NPC Stable', price: 8000 + i * 4000 }));
  app.studOffers = app.horses.filter(h => h.gender === 'Stallion').map(h => ({ horseId: h.id, coverPrice: 900, strawPrice: 500 }));
}

function updateHeader() {
  document.getElementById('monthLabel').textContent = `Month ${app.month}, Year ${app.year}`;
  document.getElementById('moneyLabel').innerHTML = `<span class="money">${money(app.money)}</span>`;
}

function changeTab(tab) {
  tabs.forEach(t => {
    document.getElementById(t).classList.toggle('hidden', t !== tab);
    document.querySelector(`[data-tab='${t}']`)?.classList.toggle('active', t === tab);
  });
}

function buildTabs() {
  const wrap = document.getElementById('tabs');
  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.tab = tab;
    btn.textContent = tab[0].toUpperCase() + tab.slice(1);
    btn.onclick = () => changeTab(tab);
    wrap.append(btn);
  });
  changeTab('dashboard');
}

function renderDashboard() {
  document.getElementById('dashboard').innerHTML = `
    <div class="grid two">
      <div class="box">
        <h2>Stable Snapshot</h2>
        <p>Horses: <strong>${app.horses.length}</strong></p>
        <p>Frozen Semen Straws: <strong>${app.semenStraws.length}</strong></p>
        <p>Frozen Embryos: <strong>${app.embryos.length}</strong></p>
        <p>Sale Barn Listings: <strong>${app.saleBarn.length}</strong></p>
      </div>
      <div class="box">
        <h2>Latest Reports</h2>
        ${app.reports.slice(-5).reverse().map(r => `<p class='small'>${r.date}: ${r.text}</p>`).join('') || '<p class="small">No reports yet.</p>'}
      </div>
    </div>
  `;
}

function createHorseCard(horse) {
  const tpl = document.getElementById('horseCardTemplate');
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.querySelector('.horse-name').textContent = horse.name;
  node.querySelector('.subline').textContent = `${horse.height} | ${horse.coat} ${horse.marking} | ${horse.age} | ${horse.gender}`;
  node.querySelector('.meta').textContent = `${horse.breed} • Conformation: ${horse.conformation} • COI: ${horse.coi}% • Soundness: ${horse.soundnessYears} years est.`;

  const dList = node.querySelector('.dressage-stats');
  Object.entries(horse.stats.dressage).forEach(([k, v]) => dList.innerHTML += `<li>${k}: ${v}</li>`);
  const jList = node.querySelector('.jump-stats');
  Object.entries(horse.stats.jumping).forEach(([k, v]) => jList.innerHTML += `<li>${k}: ${v}</li>`);

  node.querySelector('.results').innerHTML = `
    <h4>Competition Results</h4>
    <p>Total Points: ${horse.totalPoints} | Championships: ${horse.championships} | Reserves: ${horse.reserves}</p>
    <p>Lifetime Earnings: ${money(horse.earnings)}</p>
    <p>Top Mare/Filly: ${horse.topWins.mareFilly} | Best Breed: ${horse.topWins.breed} | Best Overall: ${horse.topWins.overall}</p>
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
    <button data-action='sell'>List in Sale Barn ($)</button>
  `;

  node.querySelectorAll('[data-action]').forEach(btn => btn.onclick = () => {
    const action = btn.dataset.action;
    if (action === 'rename') {
      const val = node.querySelector('input').value.trim();
      if (val) horse.name = val;
    }
    if (action === 'retire-breeding') horse.retiredToBreeding = !horse.retiredToBreeding;
    if (action === 'retire-forever') horse.retiredForever = true;
    if (action === 'sell') {
      const price = Number(prompt('Sale price?', '5000'));
      if (price > 0) app.saleBarn.push({ ...horse, owner: 'Your Stable', price, saleId: uid() });
    }
    if (['feed','vet','farrier','train'].includes(action)) horse.managed[action === 'train' ? 'trained' : action] = !horse.managed[action === 'train' ? 'trained' : action];
    render();
  });
  return node;
}

function renderHorses() {
  const el = document.getElementById('horses');
  el.innerHTML = `<h2>Your Horses</h2><div class='cards'></div>`;
  const cards = el.querySelector('.cards');
  app.horses.forEach(h => cards.append(createHorseCard(h)));
}

function renderMarket() {
  const kinds = [
    { key: 'untrained', cost: 2000 },
    { key: 'trained', cost: 10000 },
    { key: 'fully', cost: 15000 }
  ];
  document.getElementById('market').innerHTML = `
    <h2>Prospects Pasture (NPC)</h2>
    <div class='cards'>${kinds.map(k => `
      <div class='box'>
        <h3>${k.key[0].toUpperCase() + k.key.slice(1)} Horse</h3>
        <p>Cost: ${money(k.cost)}</p>
        <label>Breed</label>
        <select id='breed-${k.key}'>${BREEDS.map(b => `<option>${b}</option>`).join('')}</select>
        <label>Gender</label>
        <select id='gender-${k.key}'><option>Mare</option><option>Stallion</option><option>Gelding</option></select>
        <button id='buy-${k.key}'>Buy</button>
      </div>
    `).join('')}</div>
  `;
  kinds.forEach(k => {
    document.getElementById(`buy-${k.key}`).onclick = () => {
      if (app.money < k.cost) return alert('Not enough money');
      app.money -= k.cost;
      const horse = baseHorse(k.key);
      horse.breed = document.getElementById(`breed-${k.key}`).value;
      horse.gender = document.getElementById(`gender-${k.key}`).value;
      app.horses.push(horse);
      app.reports.push({ date: `Y${app.year}M${app.month}`, text: `Bought ${horse.name} from Prospects Pasture.` });
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
      render();
    };
    cards.append(b);
  });
}

function renderStud() {
  document.getElementById('stud').innerHTML = `
    <h2>Stud Barn</h2>
    <div class='box'>
      <p>Offer your stallions for cover or frozen semen.</p>
      <div class='cards'>
        ${app.horses.filter(h => h.gender === 'Stallion').map(h => `<div class='box'><h3>${h.name}</h3><p>Cover $900 | Straw $500</p><button data-id='${h.id}'>Collect Semen</button></div>`).join('') || '<p>No stallions available.</p>'}
      </div>
    </div>
  `;
  document.querySelectorAll('#stud button[data-id]').forEach(btn => btn.onclick = () => {
    const stallion = app.horses.find(h => h.id === btn.dataset.id);
    if (!stallion || app.money < 500) return alert('Need stallion and $500.');
    app.money -= 500;
    const count = rnd(1, 6);
    for (let i = 0; i < count; i++) app.semenStraws.push({ id: uid(), stallionId: stallion.id, stallionName: stallion.name });
    app.reports.push({ date: `Y${app.year}M${app.month}`, text: `Collected ${count} semen straws from ${stallion.name}.` });
    render();
  });
}

function runShow(horse, discipline) {
  const base = Object.values(horse.stats[discipline === 'jumping' ? 'jumping' : 'dressage']).reduce((a, b) => a + b, 0) / 6;
  const pot = horse.potential[discipline];
  const trained = horse.managed.trained ? 4 : 0;
  const roll = rnd(1, 100);
  const score = Math.max(40, Math.min(100, Math.round(base * 0.5 + pot * 0.35 + roll * 0.15 + trained)));
  const placing = score > 92 ? 1 : score > 87 ? 2 : score > 80 ? 3 : score > 70 ? rnd(4, 8) : rnd(9, 20);
  const prize = placing === 1 ? 1800 : placing === 2 ? 1000 : placing === 3 ? 600 : 100;
  horse.totalPoints += Math.max(0, 25 - placing);
  horse.earnings += prize;
  app.money += prize;
  if (placing === 1) horse.championships += 1;
  if (placing === 2) horse.reserves += 1;
  horse.topWins.highestScore = Math.max(horse.topWins.highestScore, score);
  horse.showResults.push({ date: `Y${app.year}M${app.month}`, discipline, score, placing, prize });
  app.reports.push({ date: `Y${app.year}M${app.month}`, text: `${horse.name} placed #${placing} (${discipline}, score ${score}) and won ${money(prize)}.` });
}

function renderShows() {
  const showTypes = [
    { key: 'dressage', names: ['OTO Dressage Show','OTO Pony Dressage Show','OTO Young Horse Dressage Show'] },
    { key: 'jumping', names: ['OTO Jumping Show','OTO Pony Jumping Classic','OTO Young Horse Jumping Show'] },
    { key: 'eventing', names: ['OTO Eventing Show','OTO Pony Event Trials','OTO Young Horse Eventing Show'] },
    { key: 'hunter', names: ['OTO Hunter Show','OTO Pony Hunter Classic','OTO Young Horse Hunter Show'] }
  ];
  document.getElementById('shows').innerHTML = `
    <h2>Enter Shows</h2>
    ${showTypes.map(s => `<div class='box'><h3>${s.key[0].toUpperCase()+s.key.slice(1)}</h3>${s.names.map(n => `<p>${n} (0/250) — Oxer To Oxer Showgrounds</p>`).join('')}<label>Horse</label><select id='show-horse-${s.key}'>${app.horses.filter(h => !h.retiredForever).map(h => `<option value='${h.id}'>${h.name}</option>`).join('')}</select><button id='enter-${s.key}'>Run Show Now</button></div>`).join('')}
  `;
  DISCIPLINES.forEach(d => {
    const btn = document.getElementById(`enter-${d}`);
    if (!btn) return;
    btn.onclick = () => {
      const id = document.getElementById(`show-horse-${d}`).value;
      const horse = app.horses.find(h => h.id === id);
      if (!horse) return;
      runShow(horse, d);
      render();
    };
  });
}

function renderVet() {
  const opts = app.horses.map(h => `<option value='${h.id}'>${h.name}</option>`).join('');
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
        <button id='vet-color'>Color Genetics ($100)</button>
      </div>
      <div class='box'>
        <h3>Reproduction</h3>
        <button id='vet-collect'>Semen Collection ($500)</button>
        <button id='vet-ai'>Artificial Insemination ($200)</button>
        <button id='vet-flush'>Embryo Flush ($1000)</button>
        <button id='vet-transfer'>Embryo Transfer ($1000)</button>
        <h3>Pregnancy</h3>
        <button id='vet-sex'>Ultrasound for Sex ($200)</button>
        <button id='vet-mismate'>Mismate Shot ($100)</button>
      </div>
    </div>
  `;
  const charge = (amt, text) => {
    if (app.money < amt) return alert('Not enough money');
    app.money -= amt;
    app.reports.push({ date: `Y${app.year}M${app.month}`, text });
  };
  const selected = () => app.horses.find(h => h.id === document.getElementById('vet-horse').value);
  document.getElementById('vet-checkup').onclick = () => { const h = selected(); if (!h) return; charge(150, `${h.name} completed annual checkup.`); h.due.checkup = false; render(); };
  document.getElementById('vet-physical').onclick = () => { const h = selected(); if (!h) return; charge(1000, `${h.name} physical exam: predisposed to ${h.healthRisks.join(', ')}.`); render(); };
  document.getElementById('vet-soundness').onclick = () => { const h = selected(); if (!h) return; charge(1000, `${h.name} soundness forecast: ${h.soundnessYears > 10 ? 'lots of years left' : h.soundnessYears > 4 ? 'moderate time left' : 'might consider retiring soon'}.`); render(); };
  document.getElementById('vet-gelding').onclick = () => { const h = selected(); if (!h) return; charge(500, `${h.name} was gelded and became easier to manage.`); h.gender = 'Gelding'; Object.keys(h.potential).forEach(k => h.potential[k] += rnd(0, 5)); render(); };
  document.getElementById('vet-injury').onclick = () => { const h = selected(); if (!h) return; const rec = rnd(1, 6); charge(1000, `${h.name} injury exam: estimated recovery ${rec} months.`); render(); };
  document.getElementById('vet-color').onclick = () => { const h = selected(); if (!h) return; charge(100, `${h.name} color panel complete.`); render(); };
  document.getElementById('vet-collect').onclick = () => { const h = selected(); if (!h || h.gender !== 'Stallion') return alert('Select a stallion.'); charge(500, `Collected semen from ${h.name}.`); for (let i = 0; i < rnd(1, 6); i++) app.semenStraws.push({ id: uid(), stallionId: h.id, stallionName: h.name }); render(); };
  document.getElementById('vet-ai').onclick = () => { const h = selected(); if (!h || h.gender !== 'Mare') return alert('Select a mare.'); if (!app.semenStraws.length) return alert('No semen straws.'); charge(200, `${h.name} insemination performed.`); if (rnd(1,100) > 30) h.pregnantBy = pick(app.semenStraws).stallionName; render(); };
  document.getElementById('vet-flush').onclick = () => { const h = selected(); if (!h || h.gender !== 'Mare') return alert('Select a mare.'); if (!app.semenStraws.length) return alert('No semen straws.'); charge(1000, `${h.name} embryo flush performed.`); const n = rnd(0, 2); for (let i=0;i<n;i++) app.embryos.push({ id: uid(), donor: h.name, sire: pick(app.semenStraws).stallionName }); render(); };
  document.getElementById('vet-transfer').onclick = () => { const h = selected(); if (!h || h.gender !== 'Mare') return alert('Select recipient mare.'); if (!app.embryos.length) return alert('No frozen embryos.'); charge(1000, `${h.name} embryo transfer performed.`); if (rnd(1,100) > 35) h.pregnantEmbryo = app.embryos.pop(); render(); };
  document.getElementById('vet-sex').onclick = () => { const h = selected(); if (!h) return; charge(200, `${h.name} ultrasound: foal sex appears ${pick(['colt','filly'])}.`); render(); };
  document.getElementById('vet-mismate').onclick = () => { const h = selected(); if (!h) return; charge(100, `${h.name} received mismate shot.`); delete h.pregnantBy; delete h.pregnantEmbryo; render(); };
}

function renderFarrier() {
  const opts = app.horses.map(h => `<option value='${h.id}'>${h.name}</option>`).join('');
  document.getElementById('farrier').innerHTML = `
    <h2>Farrier</h2>
    <div class='box'>
      <label>Horse</label><select id='farrier-horse'>${opts}</select>
      <label>Trim/Shoe</label>
      <select id='farrier-type'><option value='50'>Basic Trim ($50)</option><option value='120'>Keg Shoe ($120)</option><option value='150'>Rim Shoe ($150)</option></select>
      <button id='do-farrier'>Set Trim/Shoe</button>
      <p class='small'>Keg shoes improve dressage impulsion/connection; rim shoes support jumping traction.</p>
    </div>
  `;
  document.getElementById('do-farrier').onclick = () => {
    const h = app.horses.find(x => x.id === document.getElementById('farrier-horse').value);
    const cost = Number(document.getElementById('farrier-type').value);
    if (!h || app.money < cost) return alert('Not enough money.');
    app.money -= cost;
    h.managed.farrier = true;
    h.due.farrier = false;
    if (cost === 120) { h.stats.dressage.Impulsion += 2; h.stats.dressage.Connection += 2; }
    if (cost === 150) { h.stats.jumping.Adjustability += 2; h.stats.jumping.Power += 2; }
    app.reports.push({ date: `Y${app.year}M${app.month}`, text: `${h.name} farrier appointment complete.` });
    render();
  };
}

function renderTraining() {
  const opts = app.horses.map(h => `<option value='${h.id}'>${h.name}</option>`).join('');
  document.getElementById('training').innerHTML = `
    <h2>Training Grounds + Clinic (free)</h2>
    <div class='grid two'>
      <div class='box'>
        <label>Horse</label><select id='train-horse'>${opts}</select>
        <label>Discipline</label><select id='train-disc'>${DISCIPLINES.map(d => `<option>${d}</option>`).join('')}</select>
        <label>Exercise</label><select id='train-ex'>${['Pole work','Transitions','Cavaletti','Gymnastics','Conditioning','Lead changes','Collection drill','Trail obstacles'].map(e => `<option>${e}</option>`).join('')}</select>
        <button id='do-train'>Train</button>
      </div>
      <div class='box'>
        <h3>Training Clinic</h3>
        <button id='clinic'>Run Gold Clinic Evaluation</button>
      </div>
    </div>
  `;
  document.getElementById('do-train').onclick = () => {
    const h = app.horses.find(x => x.id === document.getElementById('train-horse').value);
    const d = document.getElementById('train-disc').value;
    if (!h) return;
    const good = rnd(1, 100) > 25;
    if (d === 'jumping') {
      const key = pick(Object.keys(h.stats.jumping));
      if (good) h.stats.jumping[key] = Math.min(h.stats.jumping[key] + rnd(1,3), h.potential.jumping);
    } else {
      const key = pick(Object.keys(h.stats.dressage));
      if (good) h.stats.dressage[key] = Math.min(h.stats.dressage[key] + rnd(1,3), h.potential[d] || h.potential.dressage);
    }
    h.managed.trained = true;
    app.reports.push({ date: `Y${app.year}M${app.month}`, text: `${h.name} ${good ? 'improved during' : 'struggled with'} ${document.getElementById('train-ex').value}.` });
    render();
  };
  document.getElementById('clinic').onclick = () => {
    const h = app.horses.find(x => x.id === document.getElementById('train-horse').value);
    if (!h) return;
    const best = Object.entries(h.potential).sort((a,b)=>b[1]-a[1])[0];
    app.reports.push({ date: `Y${app.year}M${app.month}`, text: `Clinic: ${h.name} best potential in ${best[0]} (${best[1]}%). Personality: ${pick(['Brave','Sensitive','Intelligent','Bold'])}.` });
    render();
  };
}

function renderRegistries() {
  document.getElementById('registries').innerHTML = `
    <h2>Studbooks & Registries</h2>
    <div class='box'>
      <p>American Warmblood Registry</p>
      <p>Registered Horses: ${app.horses.length}</p>
      <p>Highest Ranked Stud: ${app.horses.find(h => h.gender === 'Stallion')?.name || 'None'}</p>
      <p>Inspection, Branding, Breed Expo, and Riding Test entries are available from this dashboard model.</p>
    </div>
  `;
}

function renderBreeders() {
  document.getElementById('breeders').innerHTML = `
    <h2>Breeders' Show</h2>
    <div class='box'>
      <p>Entry fee: $100 per horse (up to 4 entries per rollover).</p>
      <button id='enter-breeders'>Enter All Eligible Horses</button>
    </div>
  `;
  document.getElementById('enter-breeders').onclick = () => {
    const horses = app.horses.filter(h => !h.retiredForever);
    const cost = horses.length * 100;
    if (app.money < cost) return alert('Not enough money');
    app.money -= cost;
    horses.forEach(h => {
      const rank = rnd(1, 20);
      if (rank <= 3) h.topWins.breed++;
      if (rank === 1) h.topWins.overall++;
    });
    app.reports.push({ date: `Y${app.year}M${app.month}`, text: `Entered ${horses.length} horses into Breeders' Show.` });
    render();
  };
}

function renderFreezer() {
  document.getElementById('freezer').innerHTML = `
    <h2>Freezer</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Semen Straws</h3>
        ${app.semenStraws.map(s => `<p class='small'>${s.stallionName} • Straw #${s.id}</p>`).join('') || '<p class="small">No straws stored.</p>'}
      </div>
      <div class='box'>
        <h3>Embryos</h3>
        ${app.embryos.map(e => `<p class='small'>${e.donor} x ${e.sire} • Embryo #${e.id}</p>`).join('') || '<p class="small">No embryos stored.</p>'}
      </div>
    </div>
  `;
}

function monthlyProgress() {
  app.month += 1;
  if (app.month > 12) { app.month = 1; app.year += 1; app.horses.forEach(h => { h.age += 1; h.due.checkup = true; }); }
  app.horses.forEach(h => {
    if (h.pregnantBy || h.pregnantEmbryo) {
      h.gestation = (h.gestation || 0) + 1;
      if (h.gestation >= 11) {
        const foal = baseHorse('untrained');
        foal.age = 0;
        foal.breed = h.breed;
        foal.name = `Foal of ${h.name}`;
        app.horses.push(foal);
        delete h.pregnantBy; delete h.pregnantEmbryo; h.gestation = 0;
        app.reports.push({ date: `Y${app.year}M${app.month}`, text: `${h.name} foaled successfully: ${foal.name}.` });
      }
    }
    h.managed = { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false };
    h.due.farrier = true;
  });
}

function render() {
  updateHeader();
  renderDashboard();
  renderHorses();
  renderMarket();
  renderSales();
  renderStud();
  renderShows();
  renderVet();
  renderFarrier();
  renderTraining();
  renderRegistries();
  renderBreeders();
  renderFreezer();
}

document.getElementById('skipMonthBtn').onclick = () => { monthlyProgress(); render(); };
document.getElementById('addMoneyBtn').onclick = () => { app.money += 100000; render(); };

seed();
buildTabs();
render();
