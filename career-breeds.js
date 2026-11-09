const CAREER_WELSH = {
  'Welsh Mountain Pony': { section: 'A', branding: 'WA', height: [10.2,12.0], caps: [68,76,65,77], markings: [48,24,14,14] },
  'Welsh Pony': { section: 'B', branding: 'WB', height: [11.2,13.2], caps: [79,85,75,90], markings: [45,25,15,15] },
  'Welsh Pony of Cob Type': { section: 'C', branding: 'WC', height: [12.0,13.2], caps: [77,79,76,80], markings: [37,27,18,18] },
  'Welsh Cob': { section: 'D', branding: 'WD', height: [13.3,16.0], caps: [86,85,84,83], markings: [34,28,18,20] }
};
const CAREER_WELSH_STANDARDS = {
  'UK-inspired': { A: [0,121.92], B: [0,137.16], C: [0,137.16], D: [137.17,Infinity] },
  'North American-inspired': { A: [0,121.92], B: [0,147.32], C: [0,137.16], D: [137.17,Infinity] }
};
for (const [breed, data] of Object.entries(CAREER_WELSH)) {
  BREEDS.push(breed);
  BREED_BRANDINGS[breed] = data.branding;
  BREED_NORMS[breed] = { minHeight: data.height[0], maxHeight: data.height[1],
    mainPotential: data.section === 'D' ? 'Dressage / Jumping' : 'Pony Sport / Hunters' };
}

const CAREER_BREED_CAPS = {
  'American Warmblood': [94,93,96,94], 'Baden-Wuerttemberg': [94,97,91,93],
  'Bavarian Warmblood': [92,97,92,92], 'Belgian Warmblood': [100,92,94,96],
  'Canadian Warmblood': [93,92,96,97], 'Danish Warmblood': [93,100,91,91],
  'Dutch Warmblood': [100,100,95,95], Gelderlander: [89,96,86,90],
  Hanoverian: [98,100,95,95], Hessen: [93,96,91,92], Holsteiner: [100,94,96,96],
  Oldenburg: [94,100,91,93], 'Polish Warmblood': [91,93,96,91],
  Rhineland: [95,97,92,94], 'Selle Francais': [100,91,95,96],
  'Swedish Warmblood': [93,98,94,94], Trakehner: [94,98,97,92],
  Westphalian: [97,99,93,95], Zweibrucker: [97,94,96,95],
  Arabian: [85,91,94,83], Draft: [54,74,57,67], 'Iberian Horse': [79,92,77,78],
  'Riding Pony': [77,84,76,90], Thoroughbred: [92,87,99,96], Friesian: [71,85,70,71],
  'Cross-Breed': [92,92,92,92], 'Sport Cross': [98,96,98,96]
};

function careerAssignBreedPotential(horse, inherited = false) {
  const breed = horse.breed, limits = CAREER_WELSH[breed]?.caps || CAREER_BREED_CAPS[breed] || CAREER_BREED_CAPS['Cross-Breed'];
  const seed = HorseHealth.hash(horse.id + '|breed-potential|' + breed);
  const rare = HorseHealth.roll(seed, 'exception'), variation = HorseHealth.roll(seed, 'exception-size');
  const bonus = inherited ? 0 : rare < .001 ? 14 + Math.floor(variation * 5)
    : rare < .01 ? 9 + Math.floor(variation * 5) : rare < .05 ? 4 + Math.floor(variation * 5) : 0;
  const caps = {};
  ['jumping','dressage','eventing','hunter'].forEach((discipline,index) => {
    const cap = Math.min(100, limits[index] + bonus);
    const varied = cap - Math.floor(HorseHealth.roll(seed, discipline) * 13);
    const potential = inherited ? Math.min(100, horse.potential[discipline]) : Math.min(cap,
      Math.round(horse.potential[discipline] * .65 + varied * .35) + bonus);
    caps[discipline] = inherited ? Math.min(100, Math.max(cap, potential)) : cap;
    horse.potential[discipline] = potential;
  });
  horse.careerBreedPotential = { breed, caps, bonus, inherited };
}

const CAREER_BREED_LIMIT = applyBreedPotential;
applyBreedPotential = function (horse) {
  if (horse?.careerBreedPotential?.breed === horse.breed) {
    applyBreedAppearance(horse);
    // Keep existing breed-specific schooling ceilings, while Welsh and the other breeds use the saved profile.
    if (!BREED_POTENTIAL_LIMITS[horse.breed]) return;
  }
  return CAREER_BREED_LIMIT(horse);
};

function careerWelshMarkings(phenotype, genetics, breed, horseId, inherited) {
  const data = CAREER_WELSH[breed];
  if (!data || inherited && ['tobiano','overo','splash','sabino','appaloosa'].some(key => genetics[key] !== 'n/n')) return phenotype;
  const id = horseId + ':welsh-markings';
  const roll = careerRoll(id, 'type') * 100;
  let threshold = 0;
  const kind = data.markings.findIndex(weight => (threshold += weight) > roll);
  const face = kind === 1 || kind === 3;
  const legs = kind === 2 || kind === 3;
  const legOrder = ['FR','FL','BR','BL'].sort((a,b) => careerRoll(id,a) - careerRoll(id,b));
  const markedLegs = legs ? Math.ceil(careerRoll(id,'legs') * 4) || 1 : 0;
  const legMarkings = Object.fromEntries(legOrder.map((leg,index) => [leg, index < markedLegs
    ? careerPick(id,leg + ':mark',['Pastern','Fetlock','Sock','Stocking','Full White']) : 'None']));
  return { ...phenotype, faceMarking: face ? careerPick(id,'face',FACE_MARKINGS) : 'None', legMarkings,
    socks: socksFromLegMarkings(legMarkings) };
}
function careerWelshRegistry(horse, standard = app.settings.welshStandard || 'UK-inspired') {
  const data = CAREER_WELSH[horse.breed];
  if (!data) return { eligible: true };
  const [minimum, maximum] = (CAREER_WELSH_STANDARDS[standard] || CAREER_WELSH_STANDARDS['UK-inspired'])[data.section];
  const height = careerHeightCm(horse);
  if (height < minimum || height > maximum + .001) return { eligible: false, reason: 'Height falls outside the selected Section ' + data.section + ' registry profile.' };
  if (/tobiano|overo|piebald|skewbald/i.test([horse.marking, horse.marking2].join(' '))) {
    return { eligible: false, reason: 'This coat pattern is ineligible for the selected purebred registry.' };
  }
  return { eligible: true };
}
const CAREER_REGISTRY_SCORE = registryInspectionScore;
registryInspectionScore = function (horse) {
  const score = CAREER_REGISTRY_SCORE(horse);
  const welsh = careerWelshRegistry(horse);
  if (!welsh.eligible) return { ...score, registry: 'Cross-Breed', branding: '', isSportCross: true, title: '', result: 'Fail',
    breakdown: { ...score.breakdown, registryRestriction: welsh.reason } };
  return score;
};
