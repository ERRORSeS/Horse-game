/* One due-event agenda interleaves the existing career scheduler with actual care/pasture hours. */
let chronologicalAgenda90 = null;
function careerAgenda90(from, to) {
  const events =
      careerActive() && careerState().settings.background
        ? CAREER_AGENDA90_SCHEDULE(from - 72, to, undefined, false)
        : [],
    due = new Set([to]),
    federationTimes = [];
  for (const event of events) {
    const end = careerEventEnd(event);
    if (end > from && end <= to) due.add(end);
  }
  for (const step of [CAREER_HOURS_PER_WEEK, CAREER_HOURS_PER_MONTH])
    for (
      let hour = (Math.floor(from / step) + 1) * step;
      hour <= to;
      hour += step
    )
      due.add(hour);
  if (federationEnabled())
    for (
      let year = pastureDate(from).year;
      year <= pastureDate(to).year;
      year++
    )
      for (const country of federationCountries())
        for (const plan of federationPlans(year, country))
          for (const hour of federation90DecisionTimes(plan))
            if (hour > from && hour <= to) {
              due.add(hour);
              federationTimes.push(hour);
            }
  return {
    from,
    to,
    events,
    due: [...due].sort((a, b) => a - b),
    federationTimes: federationTimes.sort((a, b) => a - b),
    index: 0,
  };
}
const CAREER_AGENDA90_SCHEDULE = careerSchedule;
careerSchedule = function (from, to, includeGames, includeForeground, ...args) {
  const agenda = chronologicalAgenda90;
  if (
    agenda &&
    includeForeground === false &&
    from >= agenda.from - 72 &&
    to <= agenda.to
  )
    return agenda.events.filter((e) => e.at >= from && e.at <= to);
  return CAREER_AGENDA90_SCHEDULE(
    from,
    to,
    includeGames,
    includeForeground,
    ...args,
  );
};
const CAREER_AGENDA90_FED_NEXT = federationNextDecision;
federationNextDecision = function (from, to) {
  return chronologicalAgenda90
    ? (chronologicalAgenda90.federationTimes.find(
        (hour) => hour > from && hour <= to,
      ) ?? Infinity)
    : CAREER_AGENDA90_FED_NEXT(from, to);
};
const CAREER_AGENDA90_UNTIL = simulatePastureUntil;
simulatePastureUntil = function (target, ...args) {
  if (chronologicalAgenda90 || !app.career || target <= careerState().cursor)
    return CAREER_AGENDA90_UNTIL(target, ...args);
  const previous = chronologicalAgenda90;
  chronologicalAgenda90 = careerAgenda90(careerState().cursor, target);
  try {
    return CAREER_AGENDA90_UNTIL(target, ...args);
  } finally {
    chronologicalAgenda90 = previous;
  }
};
const CAREER_AGENDA90_HOUR = simulatePastureHour;
simulatePastureHour = function (hour, ...args) {
  const result = CAREER_AGENDA90_HOUR(hour, ...args),
    agenda = chronologicalAgenda90;
  if (agenda)
    while (
      agenda.index < agenda.due.length &&
      agenda.due[agenda.index] <= hour + 1
    ) {
      const due = agenda.due[agenda.index++];
      careerAdvance(due);
    }
  return result;
};
// During an atomic scheduler call only the result writer mutates the ledger. Validate
// its index once per write, rather than scanning every historical meet per candidate.
let careerResultBatch90 = null;
const CAREER_BATCH90_INDEX = careerResultIndex;
careerResultIndex = function (meets, calendarOnly = false) {
  if (!careerResultBatch90) return CAREER_BATCH90_INDEX(meets,calendarOnly);
  if (careerResultBatch90.meets !== meets || !careerResultBatch90.index) {
    careerResultBatch90.meets = meets;
    careerResultBatch90.index = {};
  }
  const key=calendarOnly?"calendar":"all";return careerResultBatch90.index[key] ||= CAREER_BATCH90_INDEX(meets,calendarOnly);
};
const CAREER_BATCH90_ADVANCE = careerAdvance;
careerAdvance = function (...args) {
  if (careerResultBatch90) return CAREER_BATCH90_ADVANCE(...args);
  careerResultBatch90 = {};
  try {
    return CAREER_BATCH90_ADVANCE(...args);
  } finally {
    careerResultBatch90 = null;
  }
};
const CAREER_BATCH90_RECORD = careerRecordMeet;
careerRecordMeet = function (...args) {
  if (careerResultBatch90) careerResultBatch90.index = null;
  if (federation90BoardBatch) {
    federation90BoardBatch.clear();
    delete federation90BoardBatch.trialMeets;
  }
  return CAREER_BATCH90_RECORD(...args);
};
