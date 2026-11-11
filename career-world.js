const CAREER_HOURS_PER_YEAR = 12 * 30 * 24;
const CAREER_HOURS_PER_MONTH = 30 * 24;
const CAREER_HOURS_PER_WEEK = 7 * 24;
const CAREER_PHASES = {
  jumping: ['showjumping'], dressage: ['dressage'], hunter: ['hunter'],
  eventing: ['dressage', 'cross-country', 'showjumping']
};
const CAREER_STAGES = ['Club / amateur', 'Developing national', 'Established national',
  'Developing international', 'Established international', 'World elite'];
const CAREER_STAGE_LIMITS = [2, 3, 5, 7, 9, 11];
const CAREER_FIRST_NAMES = 'Leon,Luca,Matteo,Marco,Elias,Adrian,Felix,Julian,Sebastian,Nicolas,Gabriel,Hugo,Arthur,Theo,Oliver,Maxime,Louis,Antoine,Emil,Henrik,Lars,Erik,Finn,Oscar,Alexander,Daniel,Nathan,Adam,Rafael,Victor,Santiago,Tomas,Pascal,Florian,Vincent,Raphael,Kian,Roman,Camille,Emilia,Charlotte,Sofia,Sophie,Clara,Elena,Isabelle,Anna,Olivia,Freya,Mia,Amelie,Alice,Victoria,Cecilia,Lina,Elise,Emma,Noelle,Julia,Eva,Lucia,Valentina,Alexandra,Margot,Helena,Nina,Lara,Ines,Aurelia,Florence,Gabrielle,Katarina,Elisa,Annika,Zoe,Amara'.split(',');
const CAREER_SURNAMES = 'Moreau,Vandenberg,Vermeer,Rinaldi,Hartmann,Bellamy,Laurent,Schneider,Berger,Falkenberg,Dubois,Dumas,Verhoeven,Janssen,Lambert,Fischer,Rossi,Marchetti,Devereux,Van Dalen,Arnaud,Kovacs,Lindström,Weber,Mercier,Delacroix,Valenti,Van Houten,Beaumont,Roussel,Andersson,Verbruggen,Keller,Richter,Bellini,Moretti,Marchand,Oliveira,Salazar,Petrov,Sokolov,Ilyin,Tavares,Navarro,Duarte,Mertens,De Smet,Heller,Sommer,Antonelli'.split(',');
const CAREER_REGIONAL_NAMES = {
  KAZ: [['Aida','Dana','Aliya','Daniyar','Arman','Nursultan'], ['Sadykova','Akhmetov','Nurgali','Iskakov','Suleimenova','Omarov']],
  JPN: [['Aoi','Hana','Yui','Ren','Haruto','Kaito'], ['Sato','Suzuki','Takahashi','Ito','Nakamura','Yamamoto']],
  CHN: [['Mei','Lin','Hui','Wei','Jun','Ming'], ['Wang','Li','Zhang','Liu','Chen','Yang']],
  KOR: [['Ji-woo','Seo-yun','Min-seo','Ji-ho','Min-jun','Hyun-woo'], ['Kim','Lee','Park','Choi','Jung','Kang']],
  UAE: [['Amina','Layla','Mariam','Omar','Khalid','Yusuf'], ['Al Nuaimi','Al Mansouri','Al Marri','Al Hashimi','Al Ketbi','Al Mazrouei']],
  QAT: [['Amal','Noor','Sara','Hamad','Rashid','Fahad'], ['Al Kuwari','Al Sulaiti','Al Hajri','Al Mohannadi','Al Kaabi','Al Ansari']]
};

function careerState() {
  return app.career ||= {
    version: 1, recordVersion:84, settings: { progression: false, background: true, games: true, sponsors: true },
    origin: pastureCalendarHour(), cursor: pastureCalendarHour(), npcs: null, meets: {},
    allocations: {}, contracts: [], practice: {}, rankings: {}, rankHistory: {}
  };
}
// Reuse lookup tables across renders and meets; roster arrays are replaced on load.
const CAREER_ROSTER_INDEX=new WeakMap();
function careerRosterIndex(roster=careerRoster()){
 let index=CAREER_ROSTER_INDEX.get(roster);if(index?.size===roster.length)return index;
 index={size:roster.length,byId:new Map(),byDiscipline:new Map(),byCountry:new Map()};
 for(const rider of roster){index.byId.set(rider.id,rider);for(const [map,key]of [[index.byDiscipline,rider.specialty],[index.byCountry,rider.country]]){if(!map.has(key))map.set(key,[]);map.get(key).push(rider);}}
 CAREER_ROSTER_INDEX.set(roster,index);return index;
}
const CAREER_RESULT_INDEX=new WeakMap();
function careerResultIndex(meets){
 const keys=Object.keys(meets);let index=CAREER_RESULT_INDEX.get(meets);
 // Results are written atomically. Rebuild only for deletions, replacements or repaired arrays.
 if(index&&(keys.length<index.entries.size||keys.some(key=>index.entries.has(key)&&(index.entries.get(key)!==meets[key]||index.counts.get(key)!==meets[key].results.length||index.arrays.get(key)!==meets[key].results))))index=null;
 if(!index){index={entries:new Map(),counts:new Map(),arrays:new Map(),byRider:new Map(),byHorse:new Map(),byDiscipline:new Map(),order:new Map()};CAREER_RESULT_INDEX.set(meets,index);}
 for(const key of keys){
  if(index.entries.has(key))continue;
  const meet=meets[key];index.order.set(meet,index.entries.size);index.entries.set(key,meet);index.counts.set(key,meet.results.length);index.arrays.set(key,meet.results);
  const pairs=[[index.byDiscipline,meet.discipline],...meet.results.flatMap(row=>[[index.byRider,row.riderId],[index.byHorse,row.horseId]])];
  for(const [map,id]of pairs){if(!map.has(id))map.set(id,new Set());map.get(id).add(meet);}
 }
 return index;
}
function careerActive() {
  return Boolean(app.riderRealism?.enabled && app.career?.settings.progression);
}
function careerRoll(id, key) {
  return HorseHealth.roll(HorseHealth.hash(id), key);
}
function careerPick(id, key, values) {
  return values[Math.floor(careerRoll(id, key) * values.length)];
}
function careerCountry(value) {
  if (Object.hasOwn(CAREER_COUNTRIES, value)) return value;
  return Object.keys(CAREER_COUNTRIES).find(code => CAREER_COUNTRIES[code][0] === value) || 'GBR';
}
function careerRider() {
  const profile = rrStoreCurrentProfile();
  profile.career ||= { country: careerCountry(app.currentBarn?.country), birth: null };
  return { ...profile.career, id: profile.id, name: profile.name, player: true, level: profile.level,
    abilities: profile.abilities, experience: profile.experience, professional: profile.level === 'Professional' };
}
function careerSetProfile(profile, age, country) {
  if (!Number.isInteger(age) || age < 6 || age > 60 || !Object.hasOwn(CAREER_COUNTRIES, country)) return false;
  const date = pastureDate(pastureCalendarHour());
  profile.career = { country, birth: { year: date.year - age, month: date.month, day: date.day }, ageHistory: {} };
  profile.career.ageHistory[date.year] = careerDivisions({ ...profile.career, professional: profile.level === 'Professional' });
  return true;
}
const CAREER_NORMALIZE_PROFILE = rrNormalizeProfile;
rrNormalizeProfile = function (profile) {
  const result = CAREER_NORMALIZE_PROFILE(profile);
  const data = profile.career;
  if (data && Object.hasOwn(CAREER_COUNTRIES, data.country)) {
    const birth = data.birth;
    result.career = { country: data.country, birth: birth && Number.isInteger(birth.year) &&
      birth.month >= 1 && birth.month <= 12 && birth.day >= 1 && birth.day <= 30 ? { ...birth } : null, ageHistory: data.ageHistory || {},
      activeDivision: Object.hasOwn(CAREER_AGE_DIVISIONS,data.activeDivision) ? data.activeDivision : '' };
  }
  return result;
};
function careerAge(rider, hour = pastureCalendarHour(), competitionYear = false) {
  if (!rider.birth) return null;
  const date = pastureDate(hour);
  const beforeBirthday = date.month * 30 + date.day < rider.birth.month * 30 + rider.birth.day;
  return date.year - rider.birth.year - Number(!competitionYear && beforeBirthday);
}
function careerDivisions(rider, hour = pastureCalendarHour()) {
  const age = careerAge(rider,hour,true);
  if (age == null) return ['senior'];
  return Object.entries(CAREER_AGE_DIVISIONS).filter(([,division]) => age >= division.ages[0] && age <= division.ages[1] &&
    (!division.amateur || !rider.professional) && (!division.professional || rider.professional)).map(([key]) => key);
}
function careerHeightCm(horse) {
  if (Number.isFinite(horse.measuredHeightCm)) return horse.measuredHeightCm;
  const height = Number.parseFloat(horse.height);
  if (!Number.isFinite(height)) return Infinity;
  const hands = Math.floor(height), inches = Math.round((height - hands) * 10);
  return (hands * 4 + inches) * 2.54;
}
function careerHorseAge(horse, hour) {
  const age = Number(horse.age);
  if (Number.isFinite(horse.birthYear)) return pastureDate(hour).year - horse.birthYear;
  if (!Number.isFinite(horse.ageMonths)) return age + (pastureDate(hour).year - app.year);
  return Math.floor((horse.ageMonths + Math.max(0, Math.floor(hour / CAREER_HOURS_PER_MONTH) -
    Math.floor(pastureCalendarHour() / CAREER_HOURS_PER_MONTH))) / 12);
}

function careerNpcHorse(rider, suffix, originYear, used, kind = suffix) {
  const id = rider.id + ':horse:' + suffix;
  let draw = 0;
  const identity = generateHorseIdentity({ used, random: () => careerRoll(id, 'name:' + draw++) });
  used.add(horseNameKey(identity.name));
  const young = kind === 'prospect', pony = kind === 'pony';
  const age = young ? 4 + Math.floor(careerRoll(id, 'age') * 5) : 7 + Math.floor(careerRoll(id, 'age') * 8);
  return { id, ...identity, birthYear: originYear - age, age, pony, kind,
    height: pony ? careerPick(id, 'height', ['11.3 hh','12.1 hh','13.1 hh','14.1 hh']) : '16.1 hh',
    breed: pony ? 'Riding Pony' : careerPick(id, 'breed', BREEDS.slice(0, 19)),
    personality: careerPick(id, 'personality', ['Easy-Going','Brave','Spooky','Sensitive','Hot-Blooded']),
    skills: Object.fromEntries(DISCIPLINES.map(discipline => {
      const base = rider.skill + (discipline === rider.specialty ? 6 : -7) - (young ? 12 : pony ? 8 : 0);
      return [discipline, clamp(base + careerRoll(id, discipline) * 14, 20, 100)];
    }))
  };
}
function careerRoster() {
  const world = careerState();
  if (world.npcs) {careerExpandCompetitionRoster(world.npcs);return world.npcs;}
  const originYear = pastureDate(world.origin).year;
  const countries = CAREER_ROSTER_COUNTRIES, usedHorses = new Set(), usedRiders = new Set();
  world.npcs = Array.from({ length: 480 }, (_, index) => {
    const id = 'world-rider-' + (index + 1);
    const country = countries[index % countries.length];
    const [first, last] = CAREER_REGIONAL_NAMES[country] || [CAREER_FIRST_NAMES, CAREER_SURNAMES];
    let name, attempt = 0;
    do {
      name = careerPick(id, 'first:' + attempt, first) + ' ' + careerPick(id, 'last:' + attempt, last);
      if (++attempt > 60) name += ' ' + (index + 1);
    } while (usedRiders.has(name));
    usedRiders.add(name);
    const chance = careerRoll(id, 'career');
    const stage = [.30, .55, .73, .88, .97, 1].findIndex(limit => chance < limit);
    const age = index % 4 === 0 ? 6 + Math.floor(careerRoll(id, 'age') * 20) : 19 + Math.floor(careerRoll(id, 'age') * 43);
    const skill = clamp([28, 48, 64, 77, 91, 97][stage] + (careerRoll(id, 'skill') - .5) * 14, 15, 100);
    const rider = { id, name, country, stage, skill, potential: Math.min(100, skill + 5 + careerRoll(id, 'potential') * 20),
      professional: stage >= 2, travelWillingness: careerRoll(id,'travel'), specialty: careerPick(id, 'specialty', DISCIPLINES),
      birth: { year: originYear - age, month: 1 + index % 12, day: 1 + index % 30 },
      horses: [], starts: 0, lastStart: null, training: [] };
    rider.horses.push(careerNpcHorse(rider, 'sport', originYear, usedHorses));
    if (age <= 18 || index % 6 === 0) rider.horses.push(careerNpcHorse(rider, 'pony', originYear, usedHorses));
    if (index % 3 === 0) rider.horses.push(careerNpcHorse(rider, 'prospect', originYear, usedHorses));
    return rider;
  });
  careerExpandCompetitionRoster(world.npcs);
  return world.npcs;
}

// A persistent pool in every federation and age band, with one discipline per rider.
function careerExpandCompetitionRoster(roster) {
 const world=careerState();if(world.competitionRosterVersion===1)return;
 const year=pastureDate(world.origin).year,usedHorses=new Set(roster.flatMap(r=>r.horses.map(h=>horseNameKey(h.name)))),usedNames=new Set(roster.map(r=>r.name));
 for(const country of Object.keys(CAREER_COUNTRIES))for(const specialty of DISCIPLINES)for(const age of [7,9,11,13,15,17,20,24,32,46])for(let slot=0;slot<2;slot++){
  const id='specialist:'+country+':'+specialty+':'+age+':'+slot;
  if(roster.some(r=>r.id===id))continue;
  const [first,last]=CAREER_REGIONAL_NAMES[country]||[CAREER_FIRST_NAMES,CAREER_SURNAMES];let name,attempt=0;
  do{name=careerPick(id,'first:'+attempt,first)+' '+careerPick(id,'last:'+attempt,last);if(++attempt>60)name+=' '+id;}while(usedNames.has(name));usedNames.add(name);
  const stage=age<12?slot:age<16?1+slot:age<22?2+slot:slot?4:2,skill=clamp([32,48,65,79,91,97][stage]+careerRoll(id,'skill')*8,20,100);
  const rider={id,name,country,specialty,stage,skill,potential:Math.min(100,skill+12),professional:age>=18&&slot===1,birth:{year:year-age,month:1+Math.floor(careerRoll(id,'month')*12),day:1},travelWillingness:careerRoll(id,'travel'),horses:[],starts:0,lastStart:null,training:[]};
  rider.horses.push(careerNpcHorse(rider,'sport',year,usedHorses));if(age<=17)rider.horses.push(careerNpcHorse(rider,'pony',year,usedHorses));roster.push(rider);
 }
 world.competitionRosterVersion=1;
}

function careerAddYouthCohort(year,roster) {
  const world = careerState();
  const cohorts = world.youthCohorts ||= {};
  const originYear = pastureDate(world.origin).year;
  if (cohorts[year]) return;
  const usedHorses = new Set(roster.flatMap(rider => rider.horses.map(horse => horseNameKey(horse.name))));
  const usedRiders = new Set(roster.map(rider => rider.name));
  const countries = Object.keys(CAREER_COUNTRIES);
  const initial = !Object.keys(cohorts).length;
  const count = initial ? 240 : 24;
  const countriesPerCohort = initial ? CAREER_ROSTER_COUNTRIES : countries;
  for (let i=0;i<count;i++) {
    const id = 'youth-rider-'+year+'-'+(i+1);
    const age = initial ? 7+i%15 : 7+i%2;
    const country = countriesPerCohort[(i + Math.floor(i/15) + year-originYear + countriesPerCohort.length) % countriesPerCohort.length];
    const [first,last] = CAREER_REGIONAL_NAMES[country] || [CAREER_FIRST_NAMES,CAREER_SURNAMES];
    let name, attempt = 0;
    do {
      name = careerPick(id,'first:'+attempt,first)+' '+careerPick(id,'last:'+attempt,last);
      if(++attempt>60)name+=' '+id;
    } while (usedRiders.has(name));
    usedRiders.add(name);
    const stage = age < 13 ? i%2 : i%4;
    const skill = [34,49,66,81][stage] + careerRoll(id,'skill')*9;
    const rider = {id,name,country,stage,skill,potential:Math.min(100,skill+14),professional:false,
      birth:{year:year-age,month:1+i%12,day:1+i%30},specialty:careerPick(id,'specialty',DISCIPLINES),
      travelWillingness:careerRoll(id,'travel'),horses:[],starts:0,lastStart:null,training:[]};
    rider.horses.push(careerNpcHorse(rider,'sport',year,usedHorses));
    if (age <= 16) rider.horses.push(careerNpcHorse(rider,'pony',year,usedHorses));
    roster.push(rider);
  }
  cohorts[year] = true;
}

function careerSeedRankedHistory(hour) {
  const world = careerState();
  if (world.openingHistory || !careerActive() || !world.settings.background) return;
  world.openingHistory = true;
  if (Object.values(world.meets).some(meet=>meet.ranking && meet.ranking!=='none')) return;
  const from = Math.max(0,hour - CAREER_HOURS_PER_YEAR/2);
  const roster = careerRoster();
  careerAddYouthCohort(pastureDate(hour).year,roster);
  for (const event of careerSchedule(from,hour-24,false,false)) {
    if (event.tier < 1 || event.team || event.final || event.horseAge || event.major) continue;
    if (!world.meets[event.id]) careerResolveNpcMeet(event).openingHistory = true;
  }
  careerPublish(hour);
}

function careerRefreshPartnerships(year) {
  const world = careerState();
  if (world.partnershipYear === year) return;
  const roster = careerRoster();
  careerAddYouthCohort(year,roster);
  const used = new Set(roster.flatMap(rider => rider.horses.map(horse => horseNameKey(horse.name))));
  for (const rider of roster) {
    if (year - rider.birth.year >= 68) {
      rider.retired = true;
      continue;
    }
    const retired = rider.horses.filter(horse => year - horse.birthYear > 21);
    if (retired.length) {
      rider.retiredHorses ||= [];
      rider.retiredHorses.push(...retired.map(({id,name,kind}) => ({id,name,kind,year})));
      rider.horses = rider.horses.filter(horse => year - horse.birthYear <= 21);
    }
    if (!rider.horses.some(horse => horse.kind === 'sport')) {
      const horse = careerNpcHorse(rider,'sport-' + year,year,used,'sport');
      if (rider.sponsorResources >= 6000) {
        horse.sponsorSupported = true;
        rider.sponsorResources -= 6000;
      }
      rider.horses.push(horse);
    }
    const age = year - rider.birth.year;
    rider.ageHistory ||= {};
    rider.ageHistory[year] = careerDivisions(rider,pastureCalendarHour(year,1,1,0));
    if (age <= 16 && !rider.horses.some(horse => horse.kind === 'pony')) {
      rider.horses.push(careerNpcHorse(rider,'pony-' + year,year,used,'pony'));
    }
    if (careerRoll(rider.id,'prospect-program') < .36 && !rider.horses.some(horse => horse.kind === 'prospect' && year - horse.birthYear <= 8)) {
      rider.horses.push(careerNpcHorse(rider,'prospect-' + year,year,used,'prospect'));
    }
  }
  world.partnershipYear = year;
}

const CAREER_RULE_CACHE = new Map();
function careerEvent(definition, year) {
  const tier = CAREER_TIERS[definition.tier];
  const country = definition.country || careerCountry(app.currentBarn?.country);
  const [countryName, region, city] = CAREER_COUNTRIES[country];
  const date = { year, month: definition.month, day: definition.day };
  const ruleKey = definition.discipline + '|' + definition.level;
  if (!CAREER_RULE_CACHE.has(ruleKey)) {
    CAREER_RULE_CACHE.set(ruleKey,calendarRuleProfile('Standard',definition.discipline,definition.level));
  }
  return {
    ...definition, id: 'career:' + year + ':' + definition.id, classId: definition.id,
    date, at: pastureCalendarHour(year, date.month, date.day, 12), careerEvent: true,
    country: countryName, federation: country, hostRegion: region, city,
    barnId: 'career-venue:' + country, barnName: city + (definition.indoor ? ' Indoor Arena' : ' Equestrian Centre'),
    entryFee: Math.round(55 * tier.purse), transportFee: 0, continent: region,
    prizeMoney: Math.round(325 * tier.purse), npcCount: definition.starters || (definition.team ? 23 : definition.tier >= 7 ? 27 : 15),
    minimumSkill: requiredSkillBand(definition.discipline,definition.level)[0],
    ...(definition.discipline === 'eventing' ? { phaseSchedule: {
      dressage: pastureCalendarHour(year,date.month,date.day,12),
      'cross-country': pastureCalendarHour(year,date.month,date.day + (definition.course === 'Long' ? 1 : 0),16),
      showjumping: pastureCalendarHour(year,date.month,date.day + (definition.course === 'Long' ? 2 : 0),18)
    } } : {}),
    rules: { ...CAREER_RULE_CACHE.get(ruleKey),
      jumpOff: definition.discipline === 'jumping' && definition.tier >= 3 && !definition.team },
    entries: []
  };
}
function careerSchedule(from, to, includeGames = careerState().settings.games, includeForeground = true) {
  const events = [];
  for (let year = pastureDate(from).year; year <= pastureDate(to).year; year++) {
    for (const row of CAREER_SERIES) {
      if ((row.foregroundOnly || row.calendarOnly) && !includeForeground || (row.games || row.gamesTrial) && !includeGames || row.cycle && year % row.cycle !== row.edition) continue;
      const hour = pastureCalendarHour(year, row.month, row.day, 12);
      if (hour >= from && hour <= to) events.push(careerEvent(row, year));
    }
  }
  return events.sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
}

function careerEventEnd(event) {
  return Math.max(event.at, event.phaseSchedule?.showjumping || event.at) + 2;
}
function careerBusy(spans, event) {
  const end = careerEventEnd(event);
  return spans.some(span => span.start < end + 12 && event.at < span.end + 12);
}

function careerResults({ riderId, horseId, discipline, from = -Infinity, until = Infinity } = {}) {
  const meets=app.career?.meets||{},index=careerResultIndex(meets);
  const candidates=riderId?index.byRider.get(riderId):horseId?index.byHorse.get(horseId):discipline?index.byDiscipline.get(discipline):new Set(Object.values(meets));
  return [...(candidates||[])].sort((a,b)=>index.order.get(a)-index.order.get(b)).flatMap(meet =>
    meet.hour < from || meet.hour > until || meet.sandbox || discipline && meet.discipline !== discipline ? [] :
      meet.results.filter(row => row.started !== false && (!riderId || riderId === row.riderId) && (!horseId || horseId === row.horseId))
        .map(row => ({ ...row, hour: meet.hour, eventId: meet.id, event: meet.name, discipline: meet.discipline,
          tier: meet.tier, series: meet.series, division: meet.division, ranking: meet.ranking,
          horseAge: meet.horseAge, major: meet.major, custom: meet.custom })));
}
function careerEligibility(event, rider, horse, { npc = false, history } = {}) {
  if (!rider) return 'Choose a rider.';
  const age = careerAge(rider, event.at, true);
  const division = CAREER_AGE_DIVISIONS[event.division];
  const [min, max] = event.ages || division.ages;
  if (age === null && (event.division !== 'senior' || event.games)) return 'Set a birth date in Rider Realism first.';
  if (age !== null && (age < min || age > max)) return division.label + ' accepts competition-year ages ' + min + '–' + max + '.';
  if (division.amateur && rider.professional || division.professional && !rider.professional) return 'The rider does not meet the amateur or professional division rules.';
  if (event.region && CAREER_COUNTRIES[rider.country]?.[1] !== event.region) return 'This championship is restricted to ' + event.region + ' federations.';
  if (event.games && event.division === 'senior' && age < 18) return 'Senior Games entrants must be at least 18 in the competition year.';
  if (npc && (age >= 68 || event.tier > CAREER_STAGE_LIMITS[rider.stage] && !event.games && !event.youngFinal ||
    event.division === 'senior' && !event.horseAge && event.tier <= 2 && rider.stage > event.tier + 1)) return 'The rider is outside the career field for this class.';
  if (horse) {
    const horseAge = careerHorseAge(horse, event.at);
    if (event.horseAge && horseAge !== event.horseAge) return 'The horse must be ' + event.horseAge + ' in the competition year.';
    if (event.horseMinAge && horseAge < event.horseMinAge || npc && horseAge > 21) return 'The horse is outside the event age limits.';
    if (event.ponyCm) {
      const height = careerHeightCm(horse) - Number(horse.measuredWithShoes === true);
      if (height > event.ponyCm || height <= (event.ponyMinCm || 0)) return 'The horse does not meet this pony class’s measured-height limits.';
    }
    const minimumSkill = event.minimumSkill ?? requiredSkillBand(event.discipline,event.level)[0];
    if (npc ? horse.skills[event.discipline] < minimumSkill
      : !canCompeteUnderSaddle(horse) || levelIndex(event.discipline, event.level) > highestAllowedLevelIndex(horse, event.discipline)) {
      return 'The horse does not meet the current schooling or medical requirements.';
    }
  } else if (!event.allocated) return 'Choose a horse.';
  if (!npc && app.riderRealism?.enabled && levelIndex(event.discipline,event.level) - levelIndex(event.discipline,rider.experience?.[event.discipline]) >= 3) return 'The rider needs more discipline experience for this class.';

  const needsHistory = event.tier >= 5 && (event.division === 'senior' || event.games) || event.youngFinal || event.final;
  if (!needsHistory) return '';
  const records = (history || careerResults({ riderId: rider.id, discipline: event.discipline,
    from: event.at - 24 * CAREER_HOURS_PER_MONTH, until: event.at - 1 }))
    .filter(row => row.placing && row.placing <= (event.games ? 20 : 10) && row.hour < event.at &&
      row.hour >= event.at - 24 * CAREER_HOURS_PER_MONTH &&
      (!event.games || (event.discipline === 'jumping' ? row.score <= 12 : event.discipline === 'dressage' ? row.score >= 58 : row.score <= 120)));
  const relevant = records.filter(row => event.horseAge ? row.horseId === horse?.id && row.horseAge
    : event.division === 'senior' ? row.division === 'senior' && !row.horseAge : row.division === event.division);
  if (event.final) {
    const qualified = event.team ? Object.values(careerState().meets).some(meet =>
      meet.series === event.series && meet.hour < event.at && pastureDate(meet.hour).year === event.date.year &&
      meet.teams.some(team => team.country === rider.country && team.placing <= 6))
      : relevant.some(row => row.series === event.series && pastureDate(row.hour).year === event.date.year);
    if (!qualified) return event.team ? 'The federation needs a top-six team finish in a qualifying leg this season.'
      : 'A top-ten placing at a qualifying leg this season is required.';
  }
  if (event.games || event.tier >= 10 && !(event.team && event.final)) {
    const requiredTier = event.youngFinal ? 3 : event.division === 'senior' ? 7 : 3;
    const qualifications = relevant.filter(row => row.tier >= requiredTier && (!event.games || event.allocated || row.horseId === horse?.id));
    const worldRank = (app.career?.rankings[careerBoardKey('world',event.discipline)] || []).find(row => row.id === rider.id)?.rank;
    const rankInvitation = event.major && worldRank <= 75 && qualifications.length >= 1;
    if (!rankInvitation && qualifications.length < (event.youngFinal ? 1 : 2)) return 'More verified placings are required for the federation shortlist.';
  } else if (!npc && event.division === 'senior' && !relevant.some(row => row.tier >= Math.max(2, event.tier - 2))) {
    return 'A recent top-ten finish at the preceding competition tier is required.';
  }
  return '';
}

function careerPoints(event, row, starters, fieldFactor = 1) {
  if (!event.official || !event.base || !Number.isFinite(row.score) || starters < event.minField || row.eliminated ||
      !Number.isInteger(row.placing) || row.placing < 1 || row.placing > Math.min(event.cutoff, Math.ceil(starters * .75))) return 0;
  const place = [0,1,.8,.65,.55,.45][row.placing] ?? (row.placing <= 10 ? .3 : .12);
  const score = row.score;
  const performance = event.discipline === 'dressage' ? (score >= 80 ? 1.15 : score >= 75 ? 1.08 :
    score >= 70 ? 1 : score >= 65 ? .85 : score >= 60 ? .65 : .4)
    : event.discipline === 'eventing' ? clamp(1.15 - score / 220, .35, 1.15)
    : event.discipline === 'hunter' ? clamp(score / 75, .4, 1.15) : 1;
  if (!Number.isFinite(performance)) return 0;
  return Math.round(event.base * place * performance * clamp(fieldFactor, .85, 1.15));
}

function careerNpcField(event, limit, player = null, selectionPool = false) {
  if (!limit && !selectionPool) return [];
  const roster = careerRoster(), matches = [];
  careerAddYouthCohort(pastureDate(careerState().cursor).year,roster);
  const histories = new Map();
  if (event.games || event.team || event.tier >= 10 || event.final) {
    for (const row of careerResults({ discipline: event.discipline, until: event.at - 1, from: event.at - CAREER_HOURS_PER_YEAR * 2 })) {
      if (!histories.has(row.riderId)) histories.set(row.riderId, []);
      histories.get(row.riderId).push(row);
    }
  }
  const [minimumAge,maximumAge] = event.ages || CAREER_AGE_DIVISIONS[event.division].ages;
  const year = event.date?.year ?? pastureDate(event.at).year;
  const booked = app.activeShow;
  const conflict = booked?.eventSnapshot?.careerEvent && booked.eventId !== event.id &&
    careerBusy([{start:booked.eventSnapshot.at,end:careerEventEnd(booked.eventSnapshot)}],event)
    ? new Set(booked.competitors.filter(row=>!row.player).map(row=>row.riderId)) : null;
  for (const rider of careerRosterIndex(roster).byDiscipline.get(event.discipline)||[]) {
    const age = year-rider.birth?.year;
    if (rider.specialty!==event.discipline || rider.retired || age < minimumAge || age > maximumAge || conflict?.has(rider.id) ||
      careerBusy(rider.recentStarts || [],event)) continue;
    const candidates = rider.horses.filter(horse => !careerEligibility(event, rider, horse,
      { npc: true, history: histories.get(rider.id) || [] }));
    if (!candidates.length) continue;
    const horse = typeof npc85ChooseHorse==='function'?npc85ChooseHorse(rider,candidates,event):candidates.sort((a,b)=>b.skills[event.discipline]-a.skills[event.discipline])[0];
    if(!horse)continue;
    const score = (rider.skill + horse.skills[event.discipline]) / 2;
    const qualifying = (histories.get(rider.id) || []).filter(row => row.placing && row.placing <= 10).length;
    const selection = score * .7 + Math.min(30, qualifying * 8);
    const sameCountry = rider.country === event.federation;
    const sameRegion = CAREER_COUNTRIES[rider.country][1] === event.hostRegion;
    const travel = event.tier <= 4 && !sameCountry ? (sameRegion ? .12 : .35) * (1 - (rider.travelWillingness ?? .5)) : 0;
    matches.push({ rider, horse, score, selection, draw: careerRoll(event.id, rider.id) + travel + (event.tier<=4&&!sameCountry?1:0) });
  }
  const quotas = {};
  if (player) quotas[player.country] = 1;
  matches.sort((a,b) => event.team || event.games ? b.selection - a.selection || a.draw - b.draw : a.draw - b.draw);
  if (selectionPool) return matches;
  if (event.team) {
    const squads = new Map();
    for (const pair of matches) {
      const code = pair.rider.country;
      if (!squads.has(code)) squads.set(code, []);
      const squad = squads.get(code);
      if (squad.length + (quotas[code] || 0) < event.team) squad.push(pair);
    }
    const complete = [...squads].filter(([code,squad]) => squad.length + (quotas[code] || 0) === event.team);
    complete.sort(([a],[b]) => Number(b === player?.country) - Number(a === player?.country));
    const field = [];
    for (const [,squad] of complete) if (field.length + squad.length <= limit) field.push(...squad);
    return field;
  }
  const selected = matches.filter(({ rider }) => {
    const maximum = event.quota || event.team || Infinity;
    const entered = quotas[rider.country] || 0;
    if (entered >= maximum) return false;
    quotas[rider.country] = entered + 1;
    return true;
  }).slice(0, limit);
  if (event.allocated) {
    for (const pair of selected) {
      const id = event.id + ':allocated:' + pair.rider.id;
      pair.horse = { ...pair.horse, id, name: 'Arena Schoolmaster ' + (selected.indexOf(pair) + 1), age: 10,
        birthYear: event.date.year - 10, skills: { ...pair.horse.skills, jumping: 78 } };
      pair.score = (pair.rider.skill + 78) / 2;
    }
  }
  return selected;
}
function careerNpcEntry(event, { rider, horse, score }, index) {
  return {
    id: event.id + ':' + rider.id, horseId: horse.id, name: horse.name, horseName: horse.name,
    riderId: rider.id, riderName: rider.name, country: rider.country, riderLevel: rider.stage >= 4 ? 'Professional' :
      rider.stage >= 2 ? 'Advanced' : rider.stage === 1 ? 'Intermediate' : 'Novice',
    riderAbilities: Object.fromEntries(RR_ABILITIES.map(skill => [skill, clamp(rider.skill + (careerRoll(rider.id, skill) - .5) * 12, 0, 100)])),
    horseAge: careerHorseAge(horse, event.at), horse: { id: horse.id, name: horse.name, breed: horse.breed },
    personality: horse.personality, startOrder: index + 1, player: false, state: 'Awaiting start', scores: {},
    attributes: Object.fromEntries(['Confidence','Willingness','Balance','Focus','Sensitivity to Aids']
      .map(key => [key, 3 + careerRoll(horse.id, key) * 7])),
    skills: { discipline: score, rhythm: horse.skills.dressage, form: horse.skills.jumping },
    difficulty: levelIndex(event.discipline, event.level)
  };
}

function careerTeamScores(event, results) {
  if (!event.team) return [];
  const countries = new Map();
  for (const row of results) {
    if (!countries.has(row.country)) countries.set(row.country, []);
    countries.get(row.country).push(row);
  }
  const higher = ['dressage','hunter'].includes(event.discipline);
  const teams = [];
  for (const [country, members] of countries) {
    const counted = members.filter(row => row.placing).sort((a,b) => a.placing - b.placing).slice(0, event.count);
    if (members.length < event.team || counted.length < event.count) continue;
    teams.push({ country, members: counted.map(row => row.riderId), score: counted.reduce((sum,row) => sum + row.score,0),
      tie: counted.reduce((sum,row) => sum + row.placing,0) });
  }
  return teams.sort((a,b) => (higher ? b.score - a.score : a.score - b.score) || a.tie - b.tie || a.country.localeCompare(b.country))
    .map((team,index) => ({ ...team, placing: index + 1, medal: event.games ? ['Gold','Silver','Bronze'][index] || null : null,
      points: event.ranking === 'team' ? careerPoints(event, { placing: index + 1, score: team.score / event.count }, teams.length * event.team) : 0 }));
}
function careerParticipationStatus(row) {
  if (row.status) return row.status;
  const reason = row.result?.eliminationReason || Object.values(row.scores || {}).find(score => score.eliminationReason)?.eliminationReason;
  if (reason === 'Retired') return 'Retired';
  return row.eliminated || row.result?.eliminated || Object.values(row.scores || {}).some(score=>score.eliminated)
    ? 'Eliminated' : row.rank ? 'Completed' : 'Did Not Start';
}

function careerRecordMeet(event, standings, player = null, { recovery = false, ranked = careerActive() || (event.customShowId && event.official) } = {}) {
  const world = careerState();
  if (world.meets[event.id]) return world.meets[event.id];
  const mean = standings.reduce((sum,row) => sum + (row.skills?.discipline ?? 60), 0) / Math.max(1, standings.length);
  const field = clamp(.85 + mean * .003, .85, 1.15);
  const counted = ranked && !event.sandbox;
  const progressing = careerActive();
  const starters = standings.filter(row => row.started !== false).length;
  const results = standings.map(row => {
    const identity = row.player ? player : row;
    const status = careerParticipationStatus(row);
    const started = ['Completed','Eliminated','Retired'].includes(status);
    const placing = status === 'Completed' ? row.rank : null;
    const result = {
      riderId: row.player ? identity?.id : row.riderId, riderName: row.player ? identity?.name : row.riderName,
      horseId: row.horseId, horseName: row.horseName || row.name, player: Boolean(row.player), country: identity?.country,
      ...(row.entryId ? {entryId:row.entryId} : {}), status, started, placing,
      score: Number.isFinite(row.total) ? row.total : null, eliminated: status === 'Eliminated' || status === 'Retired',
      clear: Boolean(placing && event.discipline === 'jumping' && row.scores?.showjumping?.faults === 0),
      ...(row.player ? {showPoints:!event.sandbox && placing ? Math.max(0,30-placing) : 0} : {})
    };
    return { ...result, points: counted && started ? careerPoints(event, result, starters, field) : 0,
      medal: event.games && result.placing ? ['Gold','Silver','Bronze'][result.placing - 1] || null : null };
  });
  const meet = {
    id: event.id, classId: event.classId || event.id, at:event.at, hour: careerEventEnd(event), name: event.name,
    venue: event.barnName, discipline: event.discipline, level: event.level,
    tier: event.tier, prestige: event.prestige, ranking: event.ranking, series: event.series, division: event.division, divisionScope:event.divisionScope,
    official: Boolean(event.official), sandbox: Boolean(event.sandbox), custom: Boolean(event.customShowId || event.userHosted),
    customId: event.customShowId, starters,
    horseAge: event.horseAge, major: Boolean(event.major), games: Boolean(event.games), final: Boolean(event.final),
    results, teams: careerTeamScores(event, results)
  };
  if (!counted) for (const team of meet.teams) team.points = 0;
  world.meets[event.id] = meet;
  if (event.sandbox || recovery) return meet;
  const byId = careerRosterIndex().byId;
  for (const row of results) {
    if (row.player || !row.started) continue;
    const rider = byId.get(row.riderId);
    if (!rider) continue;
    rider.starts++;
    rider.lastStart = Math.max(rider.lastStart ?? 0, event.at);
    rider.recentStarts = [...(rider.recentStarts || []),{ start:event.at, end:careerEventEnd(event) }]
      .sort((a,b) => a.start-b.start).slice(-32);
    if (progressing && world.settings.background) {
      careerDevelopNpc(rider, event, row);
      careerNpcSponsors(rider,event,row);
    }
  }
  if (player) {
    const result = results.find(row => row.player);
    if (result?.placing && progressing) careerPractice(player.id, event.discipline, event.level, event.id, event.at);
    if (result?.placing) careerSponsorBonus(player, event, result);
    const slam = event.major ? careerMajorStreak(event.series) : null;
    if (slam?.eventId === event.id && slam.riderId === player.id && slam.length === 3) {
      if (careerCredit('career-slam:' + event.id,2500,event.at,'Elite Majors three-win award')) meet.slamBonus = 2500;
    }
  }
  return meet;
}
function careerDevelopNpc(rider, event, result) {
  if (!result.placing || rider.skill >= rider.potential) return;
  const amount = Math.min(rider.potential - rider.skill, (.1 + careerRoll(event.id, rider.id) * .25) * (1 - rider.skill / 120));
  rider.skill += amount;
  rider.training.push({ hour: event.at, eventId: event.id, discipline: event.discipline, amount });
  if (rider.training.length > 24) rider.training.shift();
  const horse = rider.horses.find(h => h.id === result.horseId);
  if (horse) horse.skills[event.discipline] = Math.min(100, horse.skills[event.discipline] + amount * .6);
  if (rider.stage < 5 && rider.skill >= [53, 68, 81, 92, 98][rider.stage] && event.tier >= CAREER_STAGE_LIMITS[rider.stage] - 1 && result.placing <= 5) rider.stage++;
}
function careerResolveNpcMeet(event) {
  const field = careerNpcField(event, event.npcCount);
  if (!field.length) return careerRecordMeet(event, []);
  const competitors = field.map((pair,index) => careerNpcEntry(event,pair,index));
  const show = { id: event.id, discipline: event.discipline, level: event.level, round: 0, competitors };
  for (const entry of competitors) {
    for (const phase of CAREER_PHASES[event.discipline]) {
      const rider = field[entry.startOrder - 1].rider;
      const eliminated = careerRoll(entry.id, 'incident:' + phase) < clamp(.14 - rider.skill / 850, .025, .12);
      entry.scores[phase] = showScore(show, entry, phase, undefined, { eliminated });
      if (eliminated) {
        for (const rest of CAREER_PHASES[event.discipline]) entry.scores[rest] ||= { eliminated: true, penalties: 0, time: 0 };
        break;
      }
    }
  }
  let standings = showStandings(show);
  if (event.rules.jumpOff) {
    show.qualifiers = standings.filter(row => !row.eliminated && row.result.penalties === 0).map(row => row.id);
    if (show.qualifiers.length > 1) {
      show.round = 1;
      for (const entry of competitors.filter(row => show.qualifiers.includes(row.id))) entry.scores['jump-off'] = showScore(show, entry, 'jump-off');
      const jumpOff = showStandings(show);
      const remaining = standings.filter(row => !show.qualifiers.includes(row.id));
      standings = [...jumpOff.filter(row => !row.eliminated), ...remaining, ...jumpOff.filter(row => row.eliminated)]
        .map((row,index) => ({ ...row, rank: row.eliminated ? null : index + 1 }));
    }
  }
  return careerRecordMeet(event, standings);
}

function careerAdvance(hour = pastureCalendarHour()) {
  if (!app.career) return;
  const world = careerState();
  if (hour <= world.cursor) return;
  careerSeedRankedHistory(world.cursor);
  const from = world.cursor + 1;
  const firstMonth = Math.floor(world.cursor / CAREER_HOURS_PER_MONTH);
  const events = careerActive() && world.settings.background
    ? careerSchedule(from - 72, hour, undefined, false).filter(event => careerEventEnd(event) >= from && careerEventEnd(event) <= hour)
      .sort((a,b) => careerEventEnd(a)-careerEventEnd(b) || a.id.localeCompare(b.id))
    : [];
  let index=0, nextWeek=(Math.floor(world.cursor/CAREER_HOURS_PER_WEEK)+1)*CAREER_HOURS_PER_WEEK;
  let nextMonth=(firstMonth+1)*CAREER_HOURS_PER_MONTH;
  for(let tick=Math.min(nextWeek,nextMonth,hour);;tick=Math.min(nextWeek,nextMonth,hour)){
    while(events[index]&&careerEventEnd(events[index])<=tick){
      const event=events[index++];
      if(!world.meets[event.id]&&app.activeShow?.eventId!==event.id){careerRefreshPartnerships(event.date.year);careerResolveNpcMeet(event);}
    }
    if(tick===nextWeek){careerPublish(tick);nextWeek+=CAREER_HOURS_PER_WEEK;}
    if(tick===nextMonth){
      const month=Math.floor(tick/CAREER_HOURS_PER_MONTH);
      if(month%12===0&&careerActive())for(const profile of rrSettings().profiles){if(!profile.career?.birth)continue;profile.career.ageHistory||={};profile.career.ageHistory[pastureDate(tick).year]=careerDivisions({...profile.career,professional:profile.level==='Professional'},tick);}
      careerPaySponsors(month);if(typeof npc85MarketMonth==='function')npc85MarketMonth(month);nextMonth+=CAREER_HOURS_PER_MONTH;
    }
    if(tick===hour)break;
  }
  world.cursor = hour;
}

const CAREER_ADVANCE_HOUR = advanceOneHour;
advanceOneHour = function (...args) {
  const result = CAREER_ADVANCE_HOUR(...args);
  careerAdvance();
  return result;
};
const CAREER_ADVANCE_DAY = advanceOneDay;
advanceOneDay = function (...args) {
  const result = CAREER_ADVANCE_DAY(...args);
  careerAdvance();
  return result;
};
const CAREER_ADVANCE_MONTH = monthlyProgress;
monthlyProgress = function (...args) {
  const result = CAREER_ADVANCE_MONTH(...args);
  careerAdvance();
  return result;
};
const CAREER_HYDRATE = hydrateFromSave;
hydrateFromSave = function (data, ...args) {
  app.career = data.career?.version === 1 ? HorseHealth.copy(data.career) : null;
  return CAREER_HYDRATE(data, ...args);
};
const CAREER_RESET = resetGame;
resetGame = function (...args) {
  app.career = null;
  return CAREER_RESET(...args);
};
