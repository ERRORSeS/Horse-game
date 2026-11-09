const { check } = require('./behavior5-harness.cjs');

check('5,000 names cover each style, all lengths, particles and breeder affixes', `{
  const counts = {};
  const names = new Set();
  const recent = new Set();
  let prefixes = 0, suffixes = 0, particles = 0;
  for (let i = 0; i < 5000; i++) {
    const { name, naming } = generateHorseIdentity({ used: new Set(), recent });
    const tokens = name.split(' ');
    const key = horseNameKey(name);
    const { style, breederPrefix, breederSuffix } = naming;
    if (recent.size > 96 || tokens.length > 5 || name !== name.normalize('NFC') || name !== name.trim()) throw Error(name);
    if (tokens.some((token, index) => /^(nieve|viento)$/i.test(token) ||
      token.toLowerCase() === tokens[index - 1]?.toLowerCase())) throw Error(name);
    if (breederPrefix && (!name.startsWith(breederPrefix + ' ') || breederSuffix)) throw Error(name);
    if (breederSuffix && !name.endsWith(' ' + breederSuffix)) throw Error(name);
    if (breederPrefix) prefixes++;
    if (breederSuffix) suffixes++;
    if (name.includes(' van der ')) particles++;
    counts[style] = (counts[style] || 0) + 1;
    counts[tokens.length] = (counts[tokens.length] || 0) + 1;
    names.add(key);
  }
  for (const [style, weight] of HORSE_NAME_STYLES) {
    if (Math.abs(counts[style] / 50 - weight) > 2) throw Error('style frequency ' + style);
  }
  if (counts[1] < 750 || counts[2] < 900 || counts[3] < 700 || counts[4] < 300) throw Error(JSON.stringify(counts));
  if (names.size < 1500 || !prefixes || !suffixes || !particles) throw Error('insufficient name variety');
  for (const affix of ['DVZ', 'J', "M'D"]) {
    if (![...names].some(name => name.endsWith(' ' + affix.toLowerCase()))) throw Error(affix);
  }
}`);

check('occupied names are checked without changing unrelated random draws', `{
  const used = new Set();
  function generate() {
    let calls = 0;
    const values = [.7, .9];
    const identity = generateHorseIdentity({ used, random: () => values[calls++] });
    if (calls !== 2) throw Error('name generation consumed additional random draws');
    return identity;
  }
  const first = generate();
  used.add(horseNameKey(first.name.toUpperCase()));
  if (horseNameKey(generate().name) === horseNameKey(first.name)) throw Error('duplicate name');
  if (horseNameKey("  D’Argent   Étoile  ") !== "d'argent étoile") throw Error('normalization');
}`);

check('stable and show names persist and legacy names survive export and import', `{
  resetGame();
  const horse = app.horses[0];
  const legacy = app.horses[1];
  legacy.name = 'Nieve Viento';
  const show = showCreate(horse, buildCompetitionRpgSession(horse, 'jumping', '0.70'));
  const entrants = JSON.stringify(show.competitors.map(e => [e.horseId, e.name]));
  const names = new Set(show.competitors.map(e => horseNameKey(e.name)));
  if (names.size !== show.competitors.length) throw Error('show duplicates');
  importStableSave(exportStableSave());
  const loaded = app.horses.find(h => h.id === horse.id);
  if (loaded.name !== horse.name || loaded.naming.seed !== horse.naming.seed) throw Error('horse identity changed');
  if (app.horses.find(h => h.id === legacy.id).name !== 'Nieve Viento') throw Error('legacy name changed');
  if (JSON.stringify(app.activeShow.competitors.map(e => [e.horseId, e.name])) !== entrants) throw Error('show identity changed');
}`);
