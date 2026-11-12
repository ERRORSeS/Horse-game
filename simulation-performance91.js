/* Cache immutable programme templates; each consumer still receives its own event. */
const PROGRAMME91_TEMPLATES = new Map();
const PROGRAMME91_FACTORY = federation90ProgramEvents;
federation90ProgramEvents = function (plan) {
  const key = plan.id + "|" + plan.trial.level;
  let events = PROGRAMME91_TEMPLATES.get(key);
  if (!events) {
    events = PROGRAMME91_FACTORY(plan);
    if (PROGRAMME91_TEMPLATES.size >= 512) PROGRAMME91_TEMPLATES.clear();
    PROGRAMME91_TEMPLATES.set(key, events);
  }
  return events.map((event) => ({
    ...event,
    date: { ...event.date },
    rules: { ...event.rules },
    entries: [],
    squadRoles: [...event.squadRoles],
    programCountries: [...event.programCountries],
    ...(event.phaseSchedule
      ? { phaseSchedule: { ...event.phaseSchedule } }
      : {}),
  }));
};
