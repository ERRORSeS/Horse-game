// Pasture time is measured on the game's 30-day calendar. Pair scores are reciprocal;
// diaries reference one shared event, whose effects are applied only by the simulator.
const PASTURE_PERSONALITY_FIGHT_RISK = 0.06;
const PASTURE_EVENT_LIBRARY = [
[1,'Grazing Together','Positive','pair',1,'{a} and {b} graze peacefully side by side.','{b} settles beside {a} over a quiet patch of grass.'],
[2,'Mutual Grooming','Positive','pair',3,'{a} and {b} gently groom each other’s necks and withers.','{b} returns {a}’s gentle grooming.'],
[3,'Following a Friend','Positive','pair',1,'{a} follows {b} across the pasture.','{b} finds fresh grass and {a} follows.'],
[4,'Friendly Greeting','Positive','pair',1,'{a} and {b} sniff noses peacefully.','{b} approaches {a} for a quiet greeting.'],
[5,'Resting Together','Positive','pair',2,'{a} and {b} relax beside each other.','{b} rests nearby while {a} settles down.'],
[6,'Playful Chase','Positive','pair',2,'{a} and {b} enjoy a playful, non-aggressive chase.','{b} invites {a} into a friendly run.'],
[7,'Shared Water Break','Positive','pair',1,'{a} and {b} drink peacefully at the trough.','{b} makes room for {a} at the water.'],
[8,'Gentle Nuzzling','Positive','pair',2,'{a} affectionately nudges {b}.','{b} accepts a gentle nuzzle from {a}.'],
[9,'Companion Comfort','Positive','pair',3,'{a} stays quietly beside nervous {b}.','{b} settles with calm {a} nearby.'],
[10,'Relaxed Group Grazing','Positive','group',1,'{group} graze calmly together.','The group—{group}—settles into peaceful grazing.'],
[11,'Standing Guard','Positive','pair',2,'{a} stays alert while {b} rests.','{b} relaxes while {a} watches the surroundings.'],
[12,'Playful Bucking Together','Positive','pair',2,'{a} and {b} run and buck playfully.','{b} joins {a} in an exuberant, friendly run.'],
[13,'Friendly Invitation','Positive','pair',2,'{a} invites {b} to play, and the invitation is accepted.','{b} answers {a}’s playful approach.'],
[14,'Reuniting With a Friend','Positive','reunion',3,'{a} and {b} greet each other after time apart.','Old friends {a} and {b} return to grazing together.'],
[15,'Reuniting With a Bonded Companion','Positive','reunion',4,'{a} and {b} seek each other out after separation.','Reunited companions {a} and {b} settle close together.'],
[16,'Sharing a Quiet Corner','Positive','pair',1,'{a} and {b} share a quiet corner.','{b} rests in the peaceful spot chosen by {a}.'],
[17,'Companion Following','Positive','pair',1,'{a} follows {b} to a fresh grazing spot.','{b} moves to new grass, with {a} close behind.'],
[18,'Gentle Play','Positive','pair',2,'{a} and {b} enjoy gentle play without chasing.','{b} accepts {a}’s quiet invitation to play.'],
[19,'Trusting Contact','Positive','pair',3,'Cautious {a} accepts friendly contact from {b}.','{a} allows {b} to approach without withdrawing.'],
[20,'Exceptional Bonding Moment','Positive','pair',5,'{a} and {b} share an exceptionally peaceful time grooming and resting.','Trusted friends {a} and {b} spend a rare, particularly settled hour together.'],
[21,'Quiet Grazing','Neutral','solo',0,'{a} grazes quietly.','{a} takes time over a patch of grass.'],
[22,'Rolling in Grass','Neutral','solo',0,'{a} rolls in the grass and shakes off.','{a} enjoys a roll before getting up again.'],
[23,'Water Break','Neutral','solo',0,'{a} drinks at the trough.','{a} takes an unhurried water break.'],
[24,'Exploring the Fence','Neutral','solo',0,'{a} investigates the pasture boundary.','{a} walks quietly along the fence.'],
[25,'Watching the Barn','Neutral','solo',0,'{a} watches activity around the stable.','{a} pauses to observe the barn.'],
[26,'Standing in the Shade','Neutral','solo',0,'{a} rests in a shaded spot.','{a} chooses a cool corner to stand quietly.'],
[27,'Investigating the Ground','Neutral','solo',0,'{a} sniffs an unfamiliar patch of ground.','{a} investigates the ground before grazing again.'],
[28,'Stretching','Neutral','solo',0,'{a} stretches and walks around.','{a} loosens up with a quiet stretch.'],
[29,'Quiet Rest','Neutral','solo',0,'{a} rests quietly during turnout.','{a} settles down for a peaceful rest.'],
[30,'Short Canter','Neutral','solo',0,'{a} canters briefly before settling.','{a} enjoys a short canter across the field.'],
[31,'Pasture Patrol','Neutral','solo',0,'{a} walks around, observing the surroundings.','{a} makes an unhurried circuit of the pasture.'],
[32,'Watching Companions','Neutral','pair',0,'{a} watches {b} without approaching.','{a} quietly observes {b} from a little distance.'],
[33,'Investigating New Objects','Neutral','solo',0,'{a} cautiously examines a harmless object near the fence.','{a} sniffs a harmless unfamiliar object.'],
[34,'Resting Near the Gate','Neutral','solo',0,'{a} rests quietly near the gate.','{a} spends a calm moment by the entrance.'],
[35,'Enjoying Turnout','Neutral','solo',0,'{a} spends turnout grazing and resting.','{a} enjoys a quiet spell outdoors.'],
[36,'Pinned Ears','Negative','pair',-2,'{a} pins ears as {b} approaches.','{b} notices {a}’s pinned ears and pauses.'],
[37,'Territorial Warning','Negative','pair',-3,'{a} warns {b} away from a grazing spot.','{a} threatens when {b} comes too close.'],
[38,'Forced Away','Negative','pair',-3,'{a} drives {b} away from a resting place.','{b} leaves a resting spot under pressure from {a}.'],
[39,'Water Trough Disagreement','Negative','pair',-3,'{a} and {b} argue over access to water.','{b} crowds {a} at the water trough.'],
[40,'Feed-Space Conflict','Negative','pair',-4,'{a} and {b} compete over a shared feeding area.','{a} challenges {b} for space at the pasture feeder.'],
[41,'Aggressive Chase','Negative','pair',-5,'{a} chases {b} away without contact.','{b} retreats from an aggressive chase by {a}.'],
[42,'Biting Attempt','Negative','pair',-5,'{a} tries to bite {b}, who moves away.','{b} sidesteps a biting attempt by {a}.'],
[43,'Kicking Threat','Negative','pair',-4,'{a} threatens to kick as {b} approaches from behind.','{b} moves away from {a}’s kicking threat.'],
[44,'Actual Kick','Negative','fight',-10,'{a} kicks {b} during a conflict.','A conflict escalates and {b} receives a kick from {a}.'],
[45,'Biting Incident','Negative','fight',-10,'{a} bites {b} during an escalating disagreement.','An argument escalates into a biting incident between {a} and {b}.'],
[46,'Serious Fight','Negative','fight',-15,'{a} and {b} fight before separating.','A serious fight breaks out between {a} and {b}.'],
[47,'Repeated Harassment','Negative','pair',-5,'{a} repeatedly drives {b} away.','{b} cannot settle while {a} keeps approaching aggressively.'],
[48,'Ignoring Social Cues','Negative','pair',-2,'Excitable {a} keeps approaching unwilling {b}.','{b} withdraws, but {a} persists with unwanted approaches.'],
[49,'Unwanted Play','Negative','pair',-3,'{a} invites play, but {b} responds aggressively.','{b} rejects {a}’s unwelcome play invitation.'],
[50,'Personal Space Disagreement','Negative','pair',-3,'{a} and {b} threaten each other while passing a narrow spot.','{a} and {b} disagree over space in a crowded passage.'],
[51,'Dominance Challenge','Negative','pair',-5,'{a} and {b} challenge each other without fighting.','{b} stands ground during a challenge from {a}.'],
[52,'Avoiding a Rival','Negative','pair',0,'{a} moves away on seeing disliked {b}.','{a} keeps a wary distance from {b}.'],
[53,'Pasture Tension','Negative','pair',-2,'Enemies {a} and {b} avoid and threaten each other.','Tension remains high between {a} and {b}.'],
[54,'Companion Jealousy','Negative','trio',-2,'{a} interrupts a friendly interaction between {b} and {c}.','{b} is interrupted by {a} while spending time with {c}.'],
[55,'Breaking Up a Disagreement','Negative','pair',-3,'{a} and {b} have a brief conflict before separating without injury.','{a} and {b} break off a disagreement before it escalates.'],
[56,'Peaceful Solitude','Individual Turnout','alone',0,'{a} grazes comfortably alone.','{a} enjoys peaceful solitary grazing.'],
[57,'Quiet Independence','Individual Turnout','alone',0,'{a} explores quietly alone.','Independent {a} investigates the pasture at an unhurried pace.'],
[58,'Enjoying Personal Space','Individual Turnout','alone',0,'{a} relaxes with plenty of personal space.','{a} settles happily without nearby companions.'],
[59,'Fence-Line Watching','Individual Turnout','alone',0,'{a} watches activity beyond the fence without meeting other horses.','{a} observes the surroundings from the fence line.'],
[60,'Calling for Companions','Individual Turnout','alone',0,'{a} repeatedly calls for company.','Social {a} calls out while alone.'],
[61,'Restless Pacing','Individual Turnout','alone',0,'{a} paces along the fence, seeking company.','Alone in the pasture, {a} walks restlessly back and forth.'],
[62,'Looking for Company','Individual Turnout','alone',0,'{a} keeps returning to the gate in search of company.','{a} watches the entrance, hoping for companions.'],
[63,'Independent Exploration','Individual Turnout','alone',0,'{a} calmly investigates the pasture alone.','{a} explores the field without seeking company.'],
[64,'Relaxed Nap','Individual Turnout','alone',0,'{a} rests comfortably alone.','{a} settles for a relaxed solitary nap.'],
[65,'Unhappy Solitude','Individual Turnout','alone',0,'{a} remains unsettled after repeated solitary turnout.','Highly social {a} struggles with another day alone.'],
[66,'Following Mother','Foal','mother',0,'{a} follows mother {b} around the pasture.','{a} stays close as mother {b} moves to fresh grass.'],
[67,'Nursing','Foal','mother',0,'{a} nurses while mother {b} stands quietly.','Mother {b} waits patiently while {a} nurses.'],
[68,'Resting Beside Mother','Foal','mother',0,'{a} sleeps close to mother {b}.','Mother {b} stands nearby while {a} rests.'],
[69,'Playful Foal','Foal','mother',0,'{a} runs and bucks playfully near mother {b}.','Mother {b} watches {a} enjoy a playful burst of energy.'],
[70,"Mother’s Warning",'Foal','pair',-2,'Mother {a} warns {b} away from foal {c}.','{a} asks approaching {b} to give foal {c} more space.'],
[71,'Curious Foal','Foal','pair',1,'Curious foal {a} approaches calm {b}, with mother {c} nearby.','Mother {c} watches while {a} investigates calm {b}.'],
[72,'Foal Friendship','Foal','pair',2,'Foals {a} and {b} play together.','Young {a} and {b} enjoy age-appropriate play.'],
[73,'Protective Mother','Foal','pair',0,'Mother {a} stands between foal {c} and unfamiliar {b}.','{a} quietly shields foal {c} as {b} passes.'],
[74,'Foal Startle','Foal','mother',0,'{a} startles at a harmless distraction and returns to mother {b}.','A harmless sound sends {a} hurrying back to mother {b}.'],
[75,'Growing Confidence','Foal','mother',0,'{a} explores a little farther before returning to mother {b}.','With mother {b} nearby, {a} confidently investigates new ground.'],
[76,'Spooky Reaction','Neutral','solo',0,'Spooky {a} startles at a harmless sound and moves away.','A small distraction startles {a} before things settle.'],
[77,'Sensitive Response','Negative','pair',-2,'Sensitive {a} withdraws from pushy {b}.','{a} retreats when {b} approaches too insistently.'],
[78,'Bomb-Proof Calmness','Neutral','solo',0,'{a} remains calm through a minor disturbance.','A harmless distraction leaves bomb-proof {a} relaxed.'],
[79,'Energetic Outburst','Neutral','solo',0,'Energetic {a} runs excitedly around the pasture.','{a} enjoys a lively burst of energy.'],
[80,'Lazy Afternoon','Neutral','solo',0,'Lazy {a} spends a quiet spell resting.','{a} chooses a restful afternoon over activity.'],
[81,'Stubborn Refusal','Negative','pair',-2,'Stubborn {a} refuses to yield, creating tension with {b}.','{a} holds ground when {b} approaches, prompting a brief disagreement.'],
[82,'Unfocused Wandering','Neutral','solo',0,'Unfocused {a} wanders without settling.','{a} drifts from one part of the pasture to another.'],
[83,'Excitable Invitation','Positive','pair',2,'Excitable {a} invites {b} to play.','{a} persistently encourages {b} to join in play.'],
[84,'Hot-Blooded Disagreement','Negative','pair',-4,'Hot-Blooded {a} reacts sharply to {b} approaching.','{b} enters {a}’s space and receives a strong warning.'],
[85,'Easy-Going Acceptance','Positive','pair',1,'Easy-Going {a} peacefully accepts unfamiliar {b} nearby.','{a} makes room for new companion {b}.'],
[86,'First Meeting','Important','milestone',0,'{a} and {b} share turnout for the first time.','{a} meets {b} during shared turnout.'],
[87,'New Friendship','Important','milestone',0,'{a} and {b} have become friends!','After shared turnout, {a} and {b} have become friends!'],
[88,'Bonded Companions','Important','milestone',0,'{a} and {b} have become bonded companions!','After growing close, {a} and {b} have become bonded companions!'],
[89,'Rivalry Formed','Important','milestone',0,'{a} and {b} have developed a rivalry.','A rivalry has formed between {a} and {b}.'],
[90,'Enemies','Important','milestone',0,'{a} and {b} are now enemies. Separate them to reduce conflict.','Serious hostility has developed between {a} and {b}.']
].map(([id,title,category,mode,delta,...texts]) => ({id,title,category,mode,delta,texts}));

let pastureRuntime = null;

function pastureCalendarHour(year = app.year, month = app.month, day = app.day || 1, hour = app.hour || 0) {
  return ((year * 12 + month - 1) * 30 + day - 1) * 24 + hour;
}
function pastureDate(hour) {
  const day = Math.floor(hour / 24), month = Math.floor(day / 30);
  return { year: Math.floor(month / 12), month: month % 12 + 1, day: day % 30 + 1, hour: hour % 24 };
}
function pastureDateLabel(hour) {
  const d = pastureDate(hour);
  return `Year ${d.year}, Month ${d.month}, Day ${d.day}, ${String(d.hour).padStart(2,'0')}:00`;
}
function ensurePastureRelationships() {
  if (!app.pastureRelationships || app.pastureRelationships.version !== 1) {
    app.pastureRelationships = { version: 1, cursor: pastureCalendarHour(), seed: 194785351, sequence: 0, pairs: {}, events: {}, pastureLogs: {}, important: [] };
  }
  return app.pastureRelationships;
}
function pastureRandom() {
  const s = ensurePastureRelationships();
  let n = s.seed | 0; n ^= n << 13; n ^= n >>> 17; n ^= n << 5;
  s.seed = n >>> 0 || 194785351;
  return s.seed / 4294967296;
}
function pasturePick(items) { return items[Math.floor(pastureRandom() * items.length)]; }
function pastureEscape(value) { return String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function pasturePairKey(a,b) { return JSON.stringify([String(a.id),String(b.id)].sort()); }
function relationshipLevel(score) {
  return score <= -76 ? 'Enemies' : score <= -41 ? 'Dislike' : score <= -11 ? 'Unfriendly' : score <= 10 ? 'Neutral' : score <= 40 ? 'Familiar' : score <= 75 ? 'Friends' : 'Bonded Companions';
}
function existingPasturePair(a,b) { return ensurePastureRelationships().pairs[pasturePairKey(a,b)]; }
function pastureLiveHorse(id) { const h=pastureRuntime?pastureRuntime.horses.get(id):app.horses.find(h=>h.id===id);return h&&!h.deceased&&!h.sold&&!h.rehomed?h:undefined; }
function pastureHorseAvailable(h) { return Boolean(h && !h.deceased && !h.sold && !h.rehomed && (pastureRuntime?pastureRuntime.horses.get(h.id)===h:app.horses.includes(h))); }
function pastureMedicalEligible(h) {
  return pastureHorseAvailable(h) && !h.stallRest && !h.requiredStallRest && !(h.illnesses || []).some((i) => i.active && i.turnoutPermitted !== true);
}
function pastureSameAssignment(a,b) {
  if (!app.currentBarn?.pasturesEnabled || !pastureHorseAvailable(a) || !pastureHorseAvailable(b)) return false;
  const x = effectivePastureBooking(a), y = effectivePastureBooking(b);
  return Boolean(x && y && x.barnId === app.currentBarn.id && x.barnId === y.barnId && x.pastureId === y.pastureId && app.currentBarn.pastures?.some((p) => p.id === x.pastureId));
}
function pastureEventText(template, horses, group) {
  const [a,b,c] = horses;
  const values = {a:a?.name || 'Horse', b:b?.name || 'Companion', c:c?.name || 'Foal', group:group.map((h) => h.name).join(', ')};
  return template.replace(/\{(a|b|c|group)\}/g, (_,key) => values[key]);
}
function pastureRecordEvent(event, horses, pasture, hour, effects = [], important = false, pair = null, textOverride = '') {
  const s = ensurePastureRelationships();
  // Every multi-horse entry comes from an actually co-present context, except explicit
  // historical separations/decay records, which never pretend to be shared activities.
  const id = `pasture-event-${++s.sequence}`;
  const previous = horses[0]?.lastPastureDescription;
  let text = textOverride || pastureEventText(pasturePick(event.texts), horses, horses);
  if (!textOverride && text === previous && event.texts.length > 1) text = pastureEventText(event.texts.find((t) => pastureEventText(t,horses,horses) !== previous) || event.texts[0], horses, horses);
  const entry = { id, time: hour, date: pastureDate(hour), pastureId: pasture?.id || '', barnId: app.currentBarn?.id || '', pastureName: pasture?.name || pair?.pastureName || 'Pasture history', horses: horses.map((h) => ({id:h.id,name:h.name})), eventId: event.id, title: event.title, category: event.category, important, description: text, effects };
  s.events[id] = entry;
  for (const h of horses) {
    if (!pastureHorseAvailable(h)) continue;
    h.lastPastureDescription = text;
    if (important) { h.pastureImportantIds = h.pastureImportantIds || []; h.pastureImportantIds.push(id); }
    else { h.pastureLogIds = h.pastureLogIds || []; h.pastureLogIds.push(id); if (h.pastureLogIds.length > 100) h.pastureLogIds.splice(0,h.pastureLogIds.length - 100); }
  }
  const pastureKey = JSON.stringify([entry.barnId,entry.pastureId]);
  const log = s.pastureLogs[pastureKey] || (s.pastureLogs[pastureKey] = []);
  log.push(id); if (log.length > 200) log.splice(0,log.length - 200);
  if (important) {
    if (pair) pair.history.push(id);
    if(!['First Meeting','Time Apart'].includes(entry.title)){s.important.push(id);if(s.important.length>50)s.important.shift();}
    // The separate dashboard panel uses the event's simulated date, not the skip's end date.
  }
  return entry;
}
function pastureHistoryEvent(title,text,horses,pasture,hour,pair,effects=[]) {
  return pastureRecordEvent({id:0,title,category:'Important',texts:[text]},horses,pasture,hour,effects,true,pair,text);
}
function getPasturePair(a,b,pasture,hour) {
  const s = ensurePastureRelationships(), key = pasturePairKey(a,b);
  let pair = s.pairs[key];
  if (!pair) {
    pair = s.pairs[key] = { key, ids:[a.id,b.id], names:[a.name,b.name], score:0, compatibility:Math.round(pastureRandom()*40)-20, sharedHours:0, firstMet:hour, lastContact:hour, lastDecay:hour, history:[], daily:{day:-1,gain:0,loss:0}, fightDay:-1, fights:0, seen:{}, separated:false, pastureName:pasture.name };
    if(pastureRuntime)for(const h of [a,b]){const list=pastureRuntime.pairs.get(h.id)||[];list.push(pair);pastureRuntime.pairs.set(h.id,list);}
    pastureRecordEvent(PASTURE_EVENT_LIBRARY[85],[a,b],pasture,hour,[],true,pair);
  }
  if(pair.firstMetSource==='stall'&&!pair.pastureMet){pair.pastureMet=true;pair.separated=false;pastureRecordEvent(PASTURE_EVENT_LIBRARY[85],[a,b],pasture,hour,[],true,pair);}
  pair.names = pair.ids.map((id,i) => pastureLiveHorse(id)?.name || pair.names[i]);
  return pair;
}
function changePastureRelationship(pair,delta,horses,pasture,hour,{serious=false}={}) {
  const day = Math.floor(hour/24), old = pair.score;
  if (pair.daily.day !== day) pair.daily = {day,gain:0,loss:0};
  if (delta > 0) { delta = Math.min(delta,5-pair.daily.gain); pair.daily.gain += delta; }
  if (delta < 0 && !serious) { delta = -Math.min(-delta,5-pair.daily.loss); pair.daily.loss -= delta; }
  pair.score = Math.round(Math.max(-100,Math.min(100,pair.score + delta)));
  const thresholds = [{id:87,key:'friends',cross:old<=40&&pair.score>40},{id:88,key:'bonded',cross:old<=75&&pair.score>75},{id:89,key:'rival',cross:old>=-40&&pair.score< -40},{id:90,key:'enemies',cross:old>=-75&&pair.score< -75}];
  for (const t of thresholds) if (t.cross) {
    const reunion = pair.seen[t.key]; pair.seen[t.key] = true;
    if (reunion) pastureHistoryEvent(t.id<89?'Reconciliation':'Renewed Rivalry',`${horses[0].name} and ${horses[1].name} ${t.id<89?'have reconciled':'have renewed their rivalry'} (${relationshipLevel(pair.score)}).`,horses,pasture,hour,pair);
    else pastureRecordEvent(PASTURE_EVENT_LIBRARY[t.id-1],horses,pasture,hour,[`Relationship ${pair.score>0?'+':''}${pair.score}`],true,pair);
  }
  return pair.score-old;
}
function pastureAgeDays(h,hour) {
  const base = Number.isFinite(h.foalVitality?.ageDays) ? h.foalVitality.ageDays : (h.age || 0)*360;
  // Long skips observe the same foal ages as daily skips without advancing breeding twice.
  return base + Math.max(0,Math.floor(hour/24)-Math.floor(pastureCalendarHour()/24));
}
function pastureIsFoal(h,hour) { return pastureAgeDays(h,hour)<365; }
function pastureMother(h,hour) { return pastureIsFoal(h,hour) ? app.horses.find((m) => pastureHorseAvailable(m) && (h.damId ? m.id===h.damId : m.name===h.pedigree?.dam?.name)) : null; }
function pastureTurnoutHours(h) {
  const source = Number(h.turnoutAssignmentHours)>0 ? Number(h.turnoutAssignmentHours) : Number(h.turnoutHours)>0 ? Number(h.turnoutHours) : (barnFacilityTurnoutRange(app.currentBarn.facilityStars)[0]+barnFacilityTurnoutRange(app.currentBarn.facilityStars)[1])/2;
  return Math.max(0,Math.min(14,source));
}
function preparePastureMonth(hour) {
  const rules = ensurePastures(), barn = app.currentBarn, month = Math.floor(hour/(24*30));
  if (barn.pastureSimulationMonth === month) return;
  barn.pastureSimulationMonth = month;
  for (const p of barn.pastures) {
    p.available = pastureRandom()*100 < rules[2];
    const assigned = pastureOccupants(p).length;
    p.guests = p.individual ? 0 : p.available ? Math.floor(pastureRandom()*(Math.max(0,rules[3]-assigned)+1)) : 1+Math.floor(pastureRandom()*rules[3]);
  }
}
function pastureAttendance(h,p,hour) {
  if (!pastureMedicalEligible(h)) return false;
  const dayHour=hour%24, start=Number.isFinite(h.turnoutStartHour) ? Math.max(0,Math.min(23,h.turnoutStartHour)) : 8;
  const duration=pastureTurnoutHours(h);
  if (dayHour<start || dayHour>=Math.min(24,start+duration)) return false;
  const month=Math.floor(hour/(24*30));
  if (h.pastureStaffMonth!==month) { h.pastureStaffMonth=month; h.pastureStaffMissed=app.currentBarn.careStars<3 && pastureRandom()<.30; h.pastureMissReported=false; }
  const mother=pastureMother(h,hour);
  if (mother && mother!==h && !pastureAttendance(mother,p,hour)) return false;
  if (h.pastureStaffMissed && !mother) {
    h.pastureMood=h.mood='Grumpy';h.pastureControlBonus=-8;
    if (!h.pastureMissReported) { h.pastureMissReported=true;pastureRecordEvent({id:0,title:'Missed Turnout',category:'Negative',texts:['Staff forgot {a}’s scheduled turnout.']},[h],p,hour,['Mood: Grumpy; controlability -8']); }
    return false;
  }
  return true;
}
function pastureFightRisk(a,b,pair,p,groupSize) {
  const socialRisk=(h)=>ensureHorseSocial(h)<=10?.30:h.social>=25&&h.social<50?.15:0;
  const personalityRisk=(h)=>['Hot-Blooded','Excitable'].includes(h.personality)?PASTURE_PERSONALITY_FIGHT_RISK:0;
  const care=(6-app.currentBarn.careStars)/5;
  const crowded=!p.individual&&groupSize+(p.guests||0)>PASTURE_RULES[app.currentBarn.facilityStars][3];
  const stallions=a.gender==='Stallion'&&b.gender==='Stallion'&&a.age>=3&&b.age>=3;
  // One combined hazard, not a second fight roll added on top of the existing risks.
  const risks=[socialRisk(a),socialRisk(b),personalityRisk(a),personalityRisk(b),crowded?.15*care:0,stallions?.15*care:0];
  let daily=1-risks.reduce((v,r)=>v*(1-r),1);
  daily+= [a,b].some(h=>h.personality==='Stubborn')?.02:0;
  daily+=pair.score< -75?.25:pair.score< -40?.10:0;
  if (pair.score>40) daily*=pair.score>75?.35:.60;
  daily=Math.max(0,Math.min(.85,daily-pair.compatibility/1000));
  return 1-Math.pow(1-daily,1/8);
}
function pastureEventEligible(e,c) {
  const {a,b,group,rel,p,hour}=c, id=e.id, social=ensureHorseSocial(a);
  if (['pair','group','trio','mother','fight','reunion'].includes(e.mode)&&!b) return false;
  if (e.mode==='alone'&&group.length!==1) return false;
  if (e.mode==='group'&&(group.length<3||group.some(h=>h.social<25)||group.some((h,i)=>group.slice(i+1).some(o=>(existingPasturePair(h,o)?.score||0)<-10))))return false;
  if (e.mode==='trio'&&group.length<3)return false;
  if (['fight','milestone','reunion'].includes(e.mode))return false;
  if (e.mode==='mother'&&(!pastureIsFoal(a,hour)||pastureMother(a,hour)?.id!==b.id))return false;
  const energetic=h=>['Energetic','Excitable'].includes(h.personality), calm=h=>['Easy-Going','Bomb-proof','Bomb-Proof'].includes(h.personality);
  if(id===2)return rel.score>10;
  if(id===3)return social>50||rel.score>30;
  if(id===7)return group.length+(p.guests||0)<=PASTURE_RULES[app.currentBarn.facilityStars][3]&&![a,b].some(h=>['Stressed','Distress'].includes(h.mood));
  if(id===8||id===11)return rel.score>40;
  if(id===9)return calm(a)&&['Spooky','Sensitive'].includes(b.personality);
  if(id===12)return energetic(a)&&energetic(b);
  if([6,18,13].includes(id))return energetic(a)||a.age<6||b.age<6;
  if(id===17)return social>75;
  if(id===19)return ['Spooky','Sensitive'].includes(a.personality)&&rel.sharedHours>=12;
  if(id===20)return rel.score>40&&rel.sharedHours>=48;
  if(id===30)return energetic(a)&&a.age>=1;
  if(id===36)return rel.score< -10;
  if(id===37)return ['Stubborn','Hot-Blooded'].includes(a.personality)||rel.score< -10;
  if(id===39||id===50)return group.length+(p.guests||0)>PASTURE_RULES[app.currentBarn.facilityStars][3];
  if(id===40)return Boolean(p.hasFeeder);
  if(id===43)return ['Spooky','Stubborn'].includes(a.personality)||rel.score< -40;
  if(id===47)return rel.score< -40&&rel.sharedHours>=16;
  if(id===48)return a.personality==='Excitable'&&social>b.social+25;
  if(id===49)return energetic(a)&&!energetic(b);
  if(id===51)return a.age>=3&&b.age>=3&&(a.gender==='Stallion'&&b.gender==='Stallion'||a.personality==='Hot-Blooded');
  if(id===52)return rel.score< -40;
  if(id===53)return rel.score<= -76;
  if(id===54)return group.some(o=>o.id!==a.id&&o.id!==b.id&&(existingPasturePair(b,o)?.score||0)>40);
  if(id===56||id===57||id===64)return social<50;
  if(id===58)return social<=10;
  if(id===60||id===61)return social>=50;
  if(id===62)return social>75;
  if(id===65)return social>=75&&(a.solitaryTurnoutDays||0)>=3;
  if(id===67)return pastureAgeDays(a,hour)<180&&Boolean(a.damId===b.id||(b.offspring||[]).some(o=>o.foalId===a.id))&&!b.nursingProhibited&&b.lactating!==false;
  if(id===70||id===73)return Boolean(group.find(foal=>foal.id!==b.id&&pastureMother(foal,hour)?.id===a.id))&&rel.score<11;
  if(id===71)return pastureIsFoal(a,hour)&&calm(b)&&group.some(h=>h.id===pastureMother(a,hour)?.id);
  if(id===72)return pastureIsFoal(a,hour)&&pastureIsFoal(b,hour);
  if(id===76)return a.personality==='Spooky';
  if(id===77)return a.personality==='Sensitive'&&['Stubborn','Hot-Blooded','Excitable'].includes(b.personality);
  if(id===78)return ['Bomb-proof','Bomb-Proof'].includes(a.personality);
  if(id===79)return a.personality==='Energetic';
  if(id===80)return a.personality==='Lazy';
  if(id===81)return a.personality==='Stubborn';
  if(id===82)return a.personality==='Unfocused';
  if(id===83)return a.personality==='Excitable';
  if(id===84)return a.personality==='Hot-Blooded';
  if(id===85)return a.personality==='Easy-Going'&&rel.score<=10;
  return true;
}
function pastureEventWeight(e,c) {
  let weight=e.category==='Positive'?3:e.category==='Negative'?.45:3;
  if(e.category==='Foal')weight=4;
  if(e.category==='Individual Turnout')weight=4;
  if(e.id===20||e.id===54)weight=.08;
  if(e.id===47)weight=.15;
  if(e.category==='Negative')weight*=1-(c.rel?.compatibility||0)/100;
  if(e.category==='Negative'&&[c.a,c.b].some(h=>h&&['Stubborn','Hot-Blooded','Excitable'].includes(h.personality)))weight*=1.3;
  if(e.category==='Negative'&&c.a.gender==='Stallion'&&c.b?.gender==='Stallion')weight*=1.3;
  if(e.category==='Negative')weight*=c.rel?.score< -75?5:c.rel?.score< -40?3:c.rel?.score>40?.35:1;
  if(e.category==='Positive') {
    weight*=1+(c.rel?.compatibility||0)/100;
    weight*=c.rel?.score>40?1.8:c.rel?.score< -40?.4:1;
    if([c.a,c.b].some(h=>h&&['Easy-Going','Bomb-proof','Bomb-Proof'].includes(h.personality)))weight*=1.4;
    if([c.a,c.b].some(h=>h&&['Spooky','Sensitive'].includes(h.personality))&&(c.rel?.sharedHours||0)<24)weight*=.5;
  }
  if([2,5,8,11].includes(e.id)&&c.rel?.score>40)weight*=2;
  if([29,64,80].includes(e.id)&&(c.a.personality==='Lazy'||c.a.age>=20))weight*=3;
  if([6,12,18,30,79,83].includes(e.id)&&['Energetic','Excitable'].includes(c.a.personality))weight*=2;
  if(e.mode==='pair')weight*=.6+ensureHorseSocial(c.a)/100;
  if(e.category==='Negative'&&['Distress','Stressed','Grumpy'].includes(c.a.mood))weight*=1.3;
  return weight;
}
function selectPastureEvent(c,scope) {
  const pool=PASTURE_EVENT_LIBRARY.filter(e=>scope==='social'?['pair','group','trio','mother'].includes(e.mode):['solo','alone'].includes(e.mode)).filter(e=>pastureEventEligible(e,c));
  let total=pool.reduce((n,e)=>n+pastureEventWeight(e,c),0), roll=pastureRandom()*total;
  return pool.find(e=>(roll-=pastureEventWeight(e,c))<=0)||pool[0];
}
function pastureSetMood(h,mood,hour,duration=4) {
  if(h.mood==='Uncontrollable')return;
  if((h.pastureMoodUntil||0)<=hour)h.pastureMoodBeforeEvent=h.mood;
  h.pastureMood=h.mood=mood;h.pastureMoodUntil=hour+duration;
}
function pastureFightInjury(h,p,hour,effects) {
  if(pastureRandom()>=.6)return;
  const issue=addIllness(h,{name:'Pasture Fight Injury',severity:'Easy',impact:6});
  if(!issue)return;
  issue.requiresStallRest=true;
  h.vetNotes=Array.isArray(h.vetNotes)?h.vetNotes:[];
  h.vetNotes.unshift({date:pastureDateLabel(hour),text:`${h.name}: ${issue.name} in ${p.name}. Stall rest until the injury resolves or a vet permits turnout; use existing recovery care.`});
  h.showVetNotes=true;
  effects.push(`${h.name}: ${issue.name}; stall rest required`);
}
function applyPastureEvent(e,c,{serious=false}={}) {
  if(!e)return null;
  const {a,b,group,p,hour,rel}=c;
  let participants=e.mode==='group'?group:[a,b].filter(Boolean), effects=[], actualDelta=0;
  if(['solo','alone'].includes(e.mode))participants=[a];
  if([70,73].includes(e.id))participants=[a,b,group.find(h=>h.id!==b.id&&pastureMother(h,hour)?.id===a.id)];
  if(e.id===71)participants=[a,b,group.find(h=>h.id===pastureMother(a,hour)?.id)];
  if(e.id===54)participants=[a,b,group.find(h=>h.id!==a.id&&h.id!==b.id&&(existingPasturePair(b,h)?.score||0)>40)];
  if(participants.some(h=>!h||!group.includes(h)||!pastureMedicalEligible(h)))return null;
  let delta=e.delta;
  if(e.id===83)delta=ensureHorseSocial(b)<25||rel.score< -10?-2:2;
  if(serious){
    const day=Math.floor(hour/24);
    if(rel.fightDay===day)return null;
    rel.fightDay=day;rel.fights++;delta=-(10+Math.floor(pastureRandom()*11));
  }
  if(delta&&e.mode==='group') {
    for(let i=0;i<participants.length;i++)for(let j=i+1;j<participants.length;j++) {
      const x=participants[i],y=participants[j],r=getPasturePair(x,y,p,hour);
      const actual=changePastureRelationship(r,delta,[x,y],p,hour);
      if(actual)effects.push(`${x.name} / ${y.name}: relationship +${actual}`);
    }
  } else if(delta&&b) {
    const actual=changePastureRelationship(rel,delta,[a,b],p,hour,{serious});
    actualDelta=actual;
    effects.push(`Relationship ${actual>=0?'+':''}${actual}${actual===0?' (daily cap reached)':''}`);
  }
  if(serious) {
    participants.forEach(h=>{pastureSetMood(h,'Distress',hour,24);h.pastureControlBonus=-8;pastureFightInjury(h,p,hour,effects)});
    effects.push('Mood: Distress');
    if(rel.fights>=2)effects.push('Trainer recommends separating this pair');
  } else if(e.category==='Negative'||delta<0||[60,61,62,65,74,76].includes(e.id)) {
    const stressed=e.id===47?'Distress':'Stressed';
    pastureSetMood(e.id===74?a:b||a,stressed,hour);
    effects.push(`${(e.id===74?a:b||a).name}: ${stressed}`);
    if(e.id===42&&pastureRandom()<.02) {
      const issue=addIllness(b,{name:'Pasture Bite Bruising',severity:'Easy',impact:3});
      if(issue){b.vetNotes=b.vetNotes||[];b.vetNotes.unshift({date:pastureDateLabel(hour),text:`${b.name}: minor bruising while evading a biting attempt in ${p.name}; existing injury recovery applies.`});effects.push(`${b.name}: minor bruising; recovery care required`);}
    }
  } else if(([5,9,15,18,20,56,58,64,68,69,75,78].includes(e.id)||[2,8,11].includes(e.id)&&rel?.score>75)&&pastureRandom()<.2) {
    for(const h of participants)if(!socialTurnoutEffect(h,group.length-1).mood&&!['Distress','Uncontrollable','Uncomfortable'].includes(h.mood)) {pastureSetMood(h,'Happy',hour,2);effects.push(`${h.name}: Happy`);}
  }
  if(e.id===75&&pastureRandom()<.15){a.behavior=Math.min(20,(a.behavior||0)+1);effects.push(`${a.name}: behavior +1`);}
  let override='';
  if(e.id===83)override=delta>0?`${a.name} invites ${b.name} to play, and the invitation is accepted.`:`${b.name} aggressively rejects ${a.name}’s persistent play invitation.`;
  const important=serious||e.mode==='reunion'||e.category==='Negative'&&actualDelta<=-5;
  const entry=pastureRecordEvent(e,participants,p,hour,effects,important,rel,override);
  if(e.mode==='group'&&important)for(const h of participants)for(const other of participants)if(h.id<other.id){const r=existingPasturePair(h,other);if(r&&!r.history.includes(entry.id))r.history.push(entry.id);}
  for(const h of participants){h.pastureDailyEvents=(h.pastureDailyEvents||0)+1;h.careDiagnosticsDirty=true;if(important)trainerNotesForHorse(h);}
  return entry;
}
function syncPastureSeparations(hour=pastureCalendarHour()) {
  if(!app.pastureRelationships)return;
  for(const pair of Object.values(app.pastureRelationships.pairs)) {
    const [a,b]=pair.ids.map((id,i)=>pastureLiveHorse(id)||{id,name:pair.names[i]});
    if(!pair.separated&&!pastureSameAssignment(a,b)) {
      pair.separated=true;
      pastureHistoryEvent('Separation',`${a.name} and ${b.name} no longer share a pasture.`,[a,b],null,hour,pair,['Relationship preserved']);
    }
  }
}
function pastureRelationshipTrainerNotes(h) {
  if(!app.currentBarn?.pasturesEnabled||!app.pastureRelationships)return [];
  return (pastureRuntime?pastureRuntime.pairs.get(h.id)||[]:Object.values(app.pastureRelationships.pairs)).some(r=>r.ids.includes(h.id)&&r.fights>=2&&r.ids.every(id=>pastureLiveHorse(id))&&pastureSameAssignment(...r.ids.map(pastureLiveHorse))) ? ["These horses aren't getting along. Consider separating them."] : [];
}
function pastureDailyMaintenance(hour) {
  const s=ensurePastureRelationships(),day=Math.floor(hour/24);
  for(const r of Object.values(s.pairs)) {
    if(r.score>0&&hour-r.lastContact>=180*24&&hour-r.lastDecay>=30*24){
      r.score=Math.max(0,r.score-1);r.lastDecay=hour;
      const horses=r.ids.map((id,i)=>pastureLiveHorse(id)||{id,name:r.names[i]});
      pastureHistoryEvent('Time Apart',`${horses[0].name} and ${horses[1].name}’s positive relationship faded slightly after a long separation.`,horses,null,hour,r,['Relationship -1']);
    }
  }
  for(const h of app.horses){
    if((h.pastureDailyEvents||0)>0){
      const booking=effectivePastureBooking(h),p=app.currentBarn?.pastures?.find(p=>p.id===booking?.pastureId);
      if(p)pastureRecordEvent({id:35,title:'Daily Turnout Summary',category:'Neutral',texts:[`{a} completed turnout with ${h.pastureDailyEvents} simulated ${h.pastureDailyEvents===1?'activity':'activities'}.`,`{a}’s turnout day included ${h.pastureDailyEvents} simulated ${h.pastureDailyEvents===1?'activity':'activities'}.`]},[h],p,hour-1,[]);
    }
    h.pastureDailyEvents=0;
    if(h.lastSoloTurnoutDay===day-1)h.solitaryTurnoutDays=(h.solitaryTurnoutDays||0)+1;else h.solitaryTurnoutDays=0;
  }
  // Bound ordinary storage while keeping every permanent milestone referenced by history.
  const keep=new Set([...Object.values(s.pastureLogs).flat(),...app.horses.flatMap(h=>h.pastureLogIds||[])]);
  for(const [id,e]of Object.entries(s.events))if(!e.important&&!keep.has(id))delete s.events[id];
}
function pastureReunion(pair,a,b,p,hour,group) {
  if(!pair.separated)return;
  pair.separated=false;
  if(pair.score>40)applyPastureEvent(PASTURE_EVENT_LIBRARY[pair.score>75?14:13],{a,b,rel:pair,p,hour,group});
  else pastureHistoryEvent('Shared Turnout Resumed',`${a.name} and ${b.name} are sharing turnout again.`,[a,b],p,hour,pair);
}
function pasturePregnancy(a,b,p,hour,pair) {
  const mare=a.gender==='Mare'?a:b.gender==='Mare'?b:null,stallion=a.gender==='Stallion'?a:b.gender==='Stallion'?b:null;
  if(!mare||!stallion||mare.age<3||stallion.age<3||mare.pregnantBy||mare.pregnantEmbryo||mare.unableToBreed||stallion.unableToBreed)return;
  const month=Math.floor(hour/(30*24));
  if(mare.pastureConceptionMonth===month)return;
  mare.pastureConceptionMonth=month;
  if(pastureRandom()<.50){
    mare.pregnantBy=stallion.name;mare.pregnancyDays=0;mare.gestationLengthDays=320+Math.floor(pastureRandom()*41);
    pastureHistoryEvent('Pasture Pregnancy',`${mare.name} became pregnant after sharing turnout with ${stallion.name}.`,[mare,stallion],p,hour,pair,['Pregnancy started']);
  }
}
function simulatePastureHour(hour) {
  mgSimulateHour(hour);
  for(const h of app.horses)if(h.pastureMoodUntil&&h.pastureMoodUntil<=hour){
    if(h.mood===h.pastureMood)h.mood=h.pastureMoodBeforeEvent||'Neutral';
    h.pastureMood='';h.pastureMoodUntil=0;
  }
  const barn=app.currentBarn;
  if(!barn?.pasturesEnabled)return;
  preparePastureMonth(hour);syncPastureSeparations(hour);
  const day=Math.floor(hour/24);
  // Resolve social comfort from actual attendance, not just bookings or anonymous guests.
  for(const p of barn.pastures){
    const assigned=pastureOccupants(p).filter(h=>{
      if(!pastureIsFoal(h,hour)&&h.inheritedPasture&&p.individual)return false;
      return pastureHorseAvailable(h);
    });
    const group=assigned.filter(h=>mgPastureFraction(h,hour)>0).sort((a,b)=>String(a.id).localeCompare(String(b.id)));
    if(!group.length)continue;
    for(const h of group){
      careObserveSocial(h,group,p,hour);
      if(group.length===1)h.lastSoloTurnoutDay=day;
      const crowded=!p.individual&&group.length+(p.guests||0)>PASTURE_RULES[barn.facilityStars][3];
      const crowdHazard=1-Math.pow(1-.15*(6-barn.careStars)/5,pastureHourFraction(h,hour)/8);
      if(crowded&&h.pastureCrowdDay!==day&&pastureRandom()<crowdHazard){
        h.pastureCrowdDay=day;pastureSetMood(h,'Distress',hour);h.pastureControlBonus=-8;
        pastureRecordEvent({id:0,title:'Overcrowded Turnout',category:'Negative',texts:['{a} becomes distressed by crowding in the pasture.','Crowding prevents {a} from settling comfortably.']},[h],p,hour,['Mood: Distress; controlability -8']);
      }
    }
    // Every co-present pair meets; only a sparse subset has a meaningful ordinary event.
    const pairContexts=[];
    for(let i=0;i<group.length;i++)for(let j=i+1;j<group.length;j++){
      let a=group[i],b=group[j];
      if(hour%2)[a,b]=[b,a];
      if(pastureMother(b,hour)?.id===a.id)[a,b]=[b,a];
      if(careSharedHours(a,b,hour)<=0)continue;
      const rel=getPasturePair(a,b,p,hour);pastureReunion(rel,a,b,p,hour,group);
      rel.sharedHours+=careSharedHours(a,b,hour);rel.lastContact=hour;rel.lastDecay=hour;
      pasturePregnancy(a,b,p,hour,rel);
      pairContexts.push({a,b,group,rel,p,hour});
    }
    const interacted=new Set();
    for(const c of pairContexts){
      const {a,b,rel}=c;
      if(!pastureMedicalEligible(a)||!pastureMedicalEligible(b))continue;
      // Injury-capable events only enter through this single pair fight gate.
      if(!pastureIsFoal(a,hour)&&!pastureIsFoal(b,hour)&&rel.fightDay!==day&&pastureRandom()<1-Math.pow(1-pastureFightRisk(a,b,rel,p,group.length),careSharedHours(a,b,hour))){
        applyPastureEvent(pasturePick(PASTURE_EVENT_LIBRARY.filter(e=>e.mode==='fight')),c,{serious:true});interacted.add(a.id);interacted.add(b.id);continue;
      }
      if(interacted.has(a.id)||interacted.has(b.id))continue;
      const socialFrequency=(.06+(ensureHorseSocial(a)+ensureHorseSocial(b))/2000)*(rel.score>75?1.25:rel.score>40?1.1:1);
      if(pastureRandom()<socialFrequency*careSharedHours(a,b,hour)){
        const e=selectPastureEvent(c,'social');
        const entry=applyPastureEvent(e,c);if(entry)entry.horses.forEach(h=>interacted.add(h.id));
      }
    }
    for(const h of group){
      if(!pastureMedicalEligible(h))continue;
      if(!interacted.has(h.id)&&pastureRandom()<.14*pastureHourFraction(h,hour))applyPastureEvent(selectPastureEvent({a:h,b:null,group,rel:null,p,hour},'solo'),{a:h,b:null,group,rel:null,p,hour});
      if(h.showTrainerNotes&&h.lastPastureTrainerDay!==day){trainerNotesForHorse(h);h.lastPastureTrainerDay=day;}
    }
  }
  if(typeof behaviorAfterPastureHour==='function')behaviorAfterPastureHour(hour);
}
function pastureHourFraction(h,hour){
  const start=Number.isFinite(h.turnoutStartHour)?Math.max(0,Math.min(23,h.turnoutStartHour)):8;
  return Math.max(0,Math.min(hour%24+1,start+pastureTurnoutHours(h))-Math.max(hour%24,start));
}
function simulatePastureUntil(targetHour) {
  mgAdvanceTime(targetHour);
  const s=ensurePastureRelationships();
  if(!Number.isFinite(targetHour)||targetHour<=s.cursor)return;
  const previousRuntime=pastureRuntime;
  pastureRuntime={horses:new Map(carePastureHorses().map(h=>[h.id,h])),pairs:new Map()};
  for(const pair of Object.values(s.pairs))for(const id of pair.ids){const list=pastureRuntime.pairs.get(id)||[];list.push(pair);pastureRuntime.pairs.set(id,list);}
  try {
    while(s.cursor<targetHour){
      simulatePastureHour(s.cursor);s.cursor++;
      if(s.cursor%24===0&&app.currentBarn?.pasturesEnabled)pastureDailyMaintenance(s.cursor);
    }
    syncPastureSeparations(targetHour);
    if(typeof behaviorCleanup==='function')behaviorCleanup();
  } finally { pastureRuntime=previousRuntime; }
}
function pastureEntryMarkup(entry) {
  return `<li class='pasture-diary-entry'><strong>${pastureEscape(entry.title)}</strong> — ${pastureEscape(pastureDateLabel(entry.time))}<br><span class='small'>${pastureEscape(entry.pastureName)} • ${entry.horses.map(h=>pastureEscape(pastureLiveHorse(h.id)?.name||h.name)).join(', ')} • ${pastureEscape(entry.category)}</span><p>${pastureEscape(entry.description)}</p><p class='small'>${entry.effects.length?entry.effects.map(pastureEscape).join('; '):'No mechanical change.'}</p></li>`;
}
function pastureHorseEntries(h) {
  const s=ensurePastureRelationships();
  return [...new Set([...(h.pastureLogIds||[]),...(h.pastureImportantIds||[])])].map(id=>s.events[id]).filter(Boolean).sort((a,b)=>b.time-a.time||b.id.localeCompare(a.id));
}
function filteredPastureEntries(h) {
  const filter=h.pastureLogFilter||'All Events';
  return pastureHorseEntries(h).filter(e=>filter==='All Events'||filter==='Important'&&e.important||filter==='Positive'&&(e.category==='Positive'||e.category==='Foal'&&!e.effects.some(x=>x.includes('Stressed')))||filter==='Neutral'&&['Neutral','Individual Turnout'].includes(e.category)&&!e.effects.some(x=>x.includes('Stressed'))||filter==='Negative'&&(e.category==='Negative'||e.effects.some(x=>x.includes('Stressed'))));
}
function horseRelationshipMarkup(h) {
  const s=ensurePastureRelationships(),pairs=Object.values(s.pairs).filter(r=>r.ids.includes(h.id)).sort((a,b)=>b.score-a.score);
  const favorite=pairs.find(r=>r.score>40),rival=[...pairs].reverse().find(r=>r.score< -40);
  const history=[...new Set(pairs.flatMap(r=>r.history))].map(id=>s.events[id]).filter(Boolean).sort((a,b)=>b.time-a.time);
  const filter=h.pastureLogFilter||'All Events',entries=filteredPastureEntries(h);
  return `<details data-pasture-toggle='${pastureEscape(h.id)}' data-pasture-field='relationshipsOpen' ${h.relationshipsOpen?'open':''}><summary>Relationships (${pairs.length})</summary><p class='small'>Horse-to-horse relationships (−100 to +100), separate from horse-to-rider Bond. Only actual shared turnout creates interactions.</p>${pairs.length?pairs.map(r=>{
    const otherId=r.ids.find(id=>id!==h.id),other=pastureLiveHorse(otherId),name=other?.name||r.names[r.ids.indexOf(otherId)];
    return `<p>${pastureEscape(name)} — ${r.score>0?'+':''}${r.score} — ${relationshipLevel(r.score)} — ${other?(pastureSameAssignment(h,other)?'Same Pasture':'Separate Pastures'):'Historical companion (no longer available)'}${r===favorite?' • Favorite Companion':''}${r===rival?' • Rival':''}</p>`;
  }).join(''):'<p class="small">No shared-turnout relationships recorded yet.</p>'}<details><summary>Relationship History</summary><ul class='pasture-diary'>${history.map(pastureEntryMarkup).join('')||'<li>No milestones yet.</li>'}</ul></details></details>
    <details data-pasture-toggle='${pastureEscape(h.id)}' data-pasture-field='pastureLogOpen' ${h.pastureLogOpen?'open':''}><summary>Pasture Log</summary><label>Filter<select data-pasture-log-filter='${pastureEscape(h.id)}'>${['All Events','Positive','Neutral','Negative','Important'].map(x=>`<option ${x===filter?'selected':''}>${x}</option>`).join('')}</select></label><p class='small'>Last 100 ordinary entries; important milestones are retained separately.</p><ul class='pasture-diary'>${entries.slice(0,150).map(pastureEntryMarkup).join('')||'<li>No matching pasture activities.</li>'}</ul></details>`;
}
function bindPastureProfileControls(panel) {
  if(typeof bindBehaviorLog==='function')panel.querySelectorAll('[data-behavior-filter]').forEach(el=>{const h=pastureLiveHorse(el.dataset.behaviorFilter);if(h)bindBehaviorLog(el.closest('details').parentElement,h);});
  panel.querySelectorAll('[data-pasture-toggle]').forEach(el=>{el.ontoggle=()=>{const h=pastureLiveHorse(el.dataset.pastureToggle);if(h)h[el.dataset.pastureField]=el.open;};});
  panel.querySelectorAll('[data-pasture-log-filter]').forEach(select=>{select.onchange=()=>{const h=pastureLiveHorse(select.dataset.pastureLogFilter);if(!h)return;h.pastureLogFilter=select.value;h.pastureLogOpen=true;const list=select.closest('details').querySelector('ul.pasture-diary');if(list)list.innerHTML=filteredPastureEntries(h).slice(0,150).map(pastureEntryMarkup).join('')||'<li>No matching pasture activities.</li>';};});
}
function pastureCompatibilityMarkup(p) {
  const assigned=pastureOccupants(p),warnings=[];
  for(let i=0;i<assigned.length;i++)for(let j=i+1;j<assigned.length;j++){
    const r=existingPasturePair(assigned[i],assigned[j]);
    if(r?.score< -40)warnings.push(`${assigned[i].name} / ${assigned[j].name}: ${relationshipLevel(r.score)} (${r.score})${r.score<=-76?' — separation strongly recommended':''}`);
  }
  for(const h of assigned){
    const suitable=assigned.filter(o=>o.id!==h.id&&(existingPasturePair(h,o)?.score||0)>=-40).length;
    if(socialTurnoutEffect(h,h.social<50?assigned.length-1:suitable).mood)warnings.push(`${h.name}: unsuitable social combination`);
    if(!pastureMedicalEligible(h))warnings.push(`${h.name}: turnout restricted during recovery`);
  }
  return `<div class='small'>${p.individual?'Individual':'Group'} • Capacity ${p.individual?'1 (mare and young foal exception)':PASTURE_RULES[app.currentBarn.facilityStars][3]} • ${warnings.length?`Compatibility warnings: ${warnings.map(pastureEscape).join('; ')}`:'No known compatibility concerns'} <button data-pasture-history='${pastureEscape(p.id)}'>Pasture History</button></div>`;
}
function pastureBarnHistoryMarkup() {
  const p=app.currentBarn?.pastures?.find(p=>p.id===app.pastureHistorySelection);
  if(!p)return '';
  const s=ensurePastureRelationships(),key=JSON.stringify([app.currentBarn.id,p.id]);
  const entries=(s.pastureLogs[key]||[]).map(id=>s.events[id]).filter(Boolean).sort((a,b)=>b.time-a.time);
  return `<details open><summary>${pastureEscape(p.name)} — Pasture History</summary><ul class='pasture-diary'>${entries.map(pastureEntryMarkup).join('')||'<li>No events recorded in this pasture.</li>'}</ul></details>`;
}
function bindPastureHistoryControls(panel) {
  panel.querySelectorAll('[data-pasture-history]').forEach(button=>{button.onclick=()=>{app.pastureHistorySelection=button.dataset.pastureHistory;renderBarn();};});
  bindPastureProfileControls(panel);
}
function pastureDashboardMarkup() {
  const s=ensurePastureRelationships(),events=s.important.map(id=>s.events[id]).filter(e=>e&&e.title!=='First Meeting'&&e.title!=='Time Apart').slice(-8).reverse();
  return `<details class='box'><summary>Important Pasture Events (${events.length})</summary><ul class='pasture-diary'>${events.map(pastureEntryMarkup).join('')||'<li>No important pasture events recorded yet.</li>'}</ul></details>`;
}
