/* Ranking populations govern real calendar fields. Joining never creates a result. */
const RANK91_WEEK = CAREER_HOURS_PER_WEEK,
  RANK91_GROWTH = 5;
const RANK91_COMPUTE = careerComputeBoards,
  RANK91_CREDITS = careerPointCredits;
const RANK91_POOL_INDEX = new WeakMap();
let rank91Raw = false,
  rank91Initializing = false;
function rank91Real(meet) {
  return (
    !!meet &&
    !meet.sandbox &&
    !meet.circuit85 &&
    !meet.openingHistory &&
    !meet.auctionSellerMeet86 &&
    !String(meet.id || "").includes("npc-circuit85:") &&
    !String(meet.id || "").includes(":prior-start:")
  );
}
function rank91Profiles() {
  return (app.riderRealism?.profiles || []).map((p) => ({
    id: p.id,
    ...p.career,
    professional: p.level === "Professional",
  }));
}
function rank91Spec(type, d, filter = "") {
  filter = String(filter);
  let division = "senior",
    country = "",
    horseAge = 0,
    pony = false,
    team = 0,
    region = "";
  if (type === "combination" || (type === "horse" && !filter)) type = "world";
  if (type === "horse" && filter === "pony") {
    type = "division";
    filter = "pony";
  }
  if (["division", "youth-international", "youth-national"].includes(type)) {
    division = filter.split("|")[0];
    if (type === "youth-national") country = filter.split("|")[1] || "";
    else type = "division";
  }
  if (type === "national") country = filter;
  if (type === "young-horse") horseAge = Number(filter);
  if (["tour", "team"].includes(type)) {
    const meta = CAREER_SERIES.find(
        (e) => (e.series === filter || e.id === filter) && e.discipline === d,
      ),
      parts = filter.split("-");
    division =
      meta?.division || (parts[0] === "federation" ? parts[2] : "senior");
    team = type === "team" ? meta?.team || 4 : 0;
    region = meta?.region || "";
  }
  if (!CAREER_AGE_DIVISIONS[division]) division = "senior";
  pony = division === "pony";
  const family =
      type === "tour" ? (division === "senior" ? "world" : "division") : type,
    sharedFilter =
      type === "tour"
        ? (division === "senior" ? "" : division) + (region ? "@" + region : "")
        : type === "team"
          ? division + (region ? "@" + region : "")
          : filter;
  return {
    key: careerBoardKey(family, d, sharedFilter),
    type,
    discipline: d,
    filter,
    division,
    country,
    horseAge,
    pony,
    team: team ? 4 : 0,
    region,
  };
}
function rank91Active(spec, hour, profiles = rank91Profiles()) {
  return profiles.some(
    (r) =>
      careerAge(r, hour, true) !== null &&
      careerDivisions(r, hour).includes(spec.division) &&
      (!spec.country || r.country === spec.country) &&
      (!spec.region || CAREER_COUNTRIES[r.country]?.[1] === spec.region) &&
      (!spec.horseAge ||
        app.horses.some((h) => careerHorseAge(h, hour) === spec.horseAge)),
  );
}
function rank91State() {
  const w = careerState();
  if (w.rankingPopulation91) return w.rankingPopulation91;
  const hour = pastureCalendarHour(),
    state = (w.rankingPopulation91 = {
      version: 1,
      originHour: hour,
      originProfiles: HorseHealth.copy(rank91Profiles()),
      pools: {},
      watched: {},
    });
  state.legacyPlayers = {};
  const players = new Set(rank91Profiles().map((r) => r.id));
  for (const [key, rows] of Object.entries(w.rankings || {})) {
    const [type, d] = key.split("|");
    if (["team", "horse", "young-horse"].includes(type)) continue;
    for (const row of rows) {
      const id =
        type === "combination" ? row.id.split("|")[0] : row.riderId || row.id;
      if (!players.has(id) || !(row.points > 0)) continue;
      const backed = Object.values(w.meets || {}).some(
        (m) =>
          m.discipline === d &&
          rank91Real(m) &&
          (m.results || []).some((r) => r.riderId === id && r.started !== false),
      );
      if (!backed)
        (state.legacyPlayers[key] ||= []).push({
          hour: w.rankingHour ?? hour,
          row: { ...row, riderId: id, legacy91: true },
        });
    }
  }
  const starts = new Map();
  for (const meet of Object.values(w.meets || {}))
    if (rank91Real(meet))
      for (const id of new Set(
        (meet.results || []).filter((r) => r.points > 0).map((r) => r.riderId),
      ))
        starts.set(id, (starts.get(id) || 0) + 1);
  for (const r of w.npcs || [])
    r.rankingScoringStarts86 = starts.get(r.id) || 0;
  // One migration removes synthetic points, preserving the old records themselves.
  if (!rank91Initializing) {
    rank91Initializing = true;
    rank91Raw = true;
    try {
      w.rankings = rank91LegacyPlayers(RANK91_COMPUTE(hour + 1), hour + 1);
    } finally {
      rank91Raw = false;
      rank91Initializing = false;
    }
  }
  return state;
}
function rank91LegacyPlayers(boards, hour) {
  for (const [key, records] of Object.entries(
    careerState().rankingPopulation91?.legacyPlayers || {},
  )) {
    const type = key.split("|")[0],
      rows = (boards[key] ||= []);
    for (const record of records)
      if (
        hour - record.hour < CAREER_HOURS_PER_YEAR &&
        (!["national", "youth-national", "tour"].includes(type) ||
          pastureDate(hour).year === pastureDate(record.hour).year) &&
        !rows.some((r) => r.id === record.row.id)
      )
        rows.push({ ...record.row });
    rows.sort((a, b) => b.points - a.points || a.id.localeCompare(b.id));
    rows.forEach((r, i) => (r.rank = i + 1));
  }
  return boards;
}
function rank91Index(pool) {
  let index = RANK91_POOL_INDEX.get(pool.members);
  if (!index) {
    index = new Map(pool.members.map((m) => [m.id, m]));
    RANK91_POOL_INDEX.set(pool.members, index);
  }
  return index;
}
function rank91Eligible(r, spec, hour) {
  return (
    !String(r.id).includes(":seller:") &&
    !r.retired &&
    r.specialty === spec.discipline &&
    careerDivisions(r, hour).includes(spec.division) &&
    (!spec.country || npc85Nationality(r) === spec.country) &&
    (!spec.region || CAREER_COUNTRIES[r.country]?.[1] === spec.region) &&
    (r.horses || []).some(
      (h) =>
        !h.retiredForever &&
        !h.retiredToBreeding &&
        !h.deceased &&
        (!spec.horseAge || careerHorseAge(h, hour) === spec.horseAge) &&
        (!spec.pony || careerHeightCm(h) <= 149),
    )
  );
}
function rank91RowRider(row, type) {
  if (["horse", "young-horse"].includes(type))
    return row.riderId || npc85Registry().horses.get(row.id)?.assignedRiderId;
  if (type === "combination") return row.riderId || row.id.split("|")[0];
  return row.riderId || row.id;
}
function rank91Pool(type, d, filter = "", hour = pastureCalendarHour()) {
  const state = rank91State(),
    spec = rank91Spec(type, d, filter),
    roster = careerRoster(),
    active = rank91Active(spec, hour),
    target = active ? 100 : 50,
    week = Math.floor(hour / RANK91_WEEK);
  let pool = state.pools[spec.key];
  if (!pool) {
    pool = state.pools[spec.key] = {
      ...spec,
      members: [],
      active,
      target,
      limit: rank91Active(spec, state.originHour, state.originProfiles)
        ? target
        : 50,
      lastWeek: week,
      sequence: 0,
    };
  }
  const sourceKey = pool.key.startsWith("world|")
    ? careerBoardKey("world", d, "")
    : pool.key.startsWith("division|")
      ? careerBoardKey("division", d, pool.division)
      : careerBoardKey(type, d, String(filter));
  const byId = careerRosterIndex(roster).byId,
    priorRows = careerState().rankings[sourceKey] || [],
    points = new Map(
      priorRows.map((r, i) => [
        rank91RowRider(r, type),
        { points: r.points || 0, rank: i },
      ]),
    );
  pool.members = pool.members.filter((m) => {
    const r = byId.get(m.id);
    return r && rank91Eligible(r, pool, hour);
  });
  if (!active) {
    pool.limit = 50;
    if (pool.members.length > 50)
      pool.members = pool.members
        .map((m, i) => ({ ...m, _order: i }))
        .sort(
          (a, b) =>
            (points.get(b.id)?.points || 0) - (points.get(a.id)?.points || 0) ||
            (points.get(a.id)?.rank ?? a._order) -
              (points.get(b.id)?.rank ?? b._order),
        )
        .slice(0, 50)
        .map(({ _order, ...m }) => m);
    pool.lastWeek = week;
  } else if (!pool.active) {
    pool.limit = 50;
    pool.lastWeek = week;
  } else if (week > pool.lastWeek) {
    pool.limit = Math.min(
      100,
      pool.limit + (week - pool.lastWeek) * RANK91_GROWTH,
    );
    pool.lastWeek = week;
  }
  pool.active = active;
  pool.target = target;
  if (pool.members.length >= pool.limit) {
    pool.initialized = true;
    return pool;
  }
  const countryCount =
    Object.values(CAREER_COUNTRIES).filter(
      (c) => !pool.region || c[1] === pool.region,
    ).length || 1;
  pool.countryLimit = Math.max(
    pool.team || 4,
    Math.ceil(pool.limit / countryCount),
  );
  const current = new Set(pool.members.map((m) => m.id)),
    counts = new Map();
  for (const m of pool.members) {
    const r = byId.get(m.id);
    counts.set(r.country, (counts.get(r.country) || 0) + 1);
  }
  const candidates = (
    pool.country
      ? careerRosterIndex(roster).byCountry.get(pool.country) || []
      : careerRosterIndex(roster).byDiscipline.get(d) || []
  )
    .filter((r) => !current.has(r.id) && rank91Eligible(r, pool, hour))
    .sort(
      (a, b) =>
        (points.get(b.id)?.points || 0) - (points.get(a.id)?.points || 0) ||
        (pool.key.startsWith("world|") ? b.skill - a.skill : 0) ||
        careerRoll(pool.key, a.id) - careerRoll(pool.key, b.id),
    );
  const since =
    pool.members.length === 0 && !pool.initialized ? -Infinity : hour;
  function add(r) {
    if (current.has(r.id)) return false;
    const n = counts.get(r.country) || 0;
    if (!pool.country && n >= pool.countryLimit) return false;
    pool.members.push({
      id: r.id,
      since: Number.isFinite(since) ? since : -1e12,
    });
    current.add(r.id);
    counts.set(r.country, n + 1);
    return true;
  }
  if (pool.team && !pool.country) {
    const countries = [
      ...new Set([
        ...rank91Profiles().map((r) => r.country),
        ...candidates.map((r) => r.country),
      ]),
    ].filter(Boolean);
    countries.sort(
      (a, b) =>
        Number(rank91Profiles().some((r) => r.country === b)) -
          Number(rank91Profiles().some((r) => r.country === a)) ||
        careerRoll(pool.key, a) - careerRoll(pool.key, b),
    );
    for (const country of countries)
      for (const r of candidates
        .filter((r) => r.country === country)
        .slice(0, pool.team - (counts.get(country) || 0))) {
        if (pool.members.length >= pool.limit) break;
        add(r);
      }
  } else
    for (const r of candidates) {
      if (pool.members.length >= pool.limit) break;
      add(r);
    }
  if (pool.members.length < pool.limit) {
    const names = new Set(roster.map((r) => r.name)),
      horses = new Set(
        roster.flatMap((r) =>
          (r.horses || []).map((h) => horseNameKey(h.name)),
        ),
      ),
      countries = Object.keys(CAREER_COUNTRIES)
        .filter((c) => !pool.region || CAREER_COUNTRIES[c][1] === pool.region)
        .sort((a, b) => careerRoll(pool.key, a) - careerRoll(pool.key, b)),
      year = pastureDate(hour).year;
    while (pool.members.length < pool.limit) {
      const id = "ranking91:" + pool.key + ":" + ++pool.sequence,
        country =
          pool.country ||
          countries.filter(
            (c) => (counts.get(c) || 0) < pool.countryLimit,
          )[0] ||
          countries[0],
        ages = CAREER_AGE_DIVISIONS[pool.division].ages,
        age =
          ages[0] +
          Math.floor(
            careerRoll(id, "age") * (Math.min(ages[1], 60) - ages[0] + 1),
          ),
        stage =
          age < 12
            ? Math.floor(careerRoll(id, "stage") * 3)
            : Math.floor(careerRoll(id, "stage") * 5),
        skill = [34, 49, 66, 81, 94][stage] + careerRoll(id, "skill") * 5;
      const r = {
        id,
        name: careerUniqueRiderName(id, country, names),
        country,
        specialty: d,
        birth: { year: year - age, month: 1, day: 1 },
        professional:
          pool.division === "professional" ||
          (pool.division !== "amateur" && age >= 18 && stage >= 3),
        stage,
        skill,
        potential: 100,
        travelWillingness: careerRoll(id, "travel"),
        horses: [],
        retiredHorses: [],
        starts: 0,
        lastStart: null,
        training: [],
        resources85: 90000,
        rankingDebutHour86: hour,
      };
      // Amateur/professional eligibility follows the requested category, never a fake score.
      if (pool.division === "amateur") r.professional = false;
      const h = careerNpcHorse(
        r,
        pool.pony ? "pony" : "sport",
        year,
        horses,
        pool.pony ? "pony" : "sport",
      );
      if (pool.horseAge) {
        h.birthYear = year - pool.horseAge;
        h.age = pool.horseAge;
      }
      r.horses.push(h);
      npc85Initialize(r, h);
      roster.push(r);
      add(r);
    }
    npc85Registry(true);
  }
  pool.initialized = true;
  return pool;
}
function rank91EventSpec(event) {
  if (event.team)
    return rank91Spec(
      "team",
      event.discipline,
      event.series || event.classId || event.id,
    );
  if (event.horseAge)
    return rank91Spec("young-horse", event.discipline, event.horseAge);
  if (event.ranking === "division" || event.federationTrial) {
    return rank91Spec(
      event.divisionScope === "international" || event.tier >= 5
        ? "division"
        : "youth-national",
      event.discipline,
      event.divisionScope === "international" || event.tier >= 5
        ? event.division
        : event.division +
            "|" +
            (event.federation || careerCountry(event.country)),
    );
  }
  return rank91Spec(
    event.ranking === "world" ? "world" : "national",
    event.discipline,
    event.ranking === "world"
      ? ""
      : event.federation || careerCountry(event.country),
  );
}
function ranking91EventRoster(event, roster) {
  if (String(event.id).includes(":prior-start:"))
    return (careerRosterIndex(roster).byDiscipline.get(event.discipline) || [])
      .filter((r) => !r.id.includes(":seller:"))
      .slice(0, 50);
  if (!careerActive())
    return careerRosterIndex(roster).byDiscipline.get(event.discipline) || [];
  const spec = rank91EventSpec(event),
    pool = rank91Pool(spec.type, spec.discipline, spec.filter, event.at),
    byId = careerRosterIndex().byId;
  if (pool.key.startsWith("world|") && !event.team) {
    const week = Math.floor(event.at / RANK91_WEEK);
    if (pool.admissionWeek !== week) {
      pool.admissionWeek = week;
      pool.admissions = 0;
    }
    const home = new Set(rank91Profiles().map((r) => r.country)),
      rows =
        careerState().rankings[careerBoardKey("world", event.discipline)] || [],
      scored = new Map(rows.map((r) => [r.id, r.points || 0])),
      candidates = [];
    for (const season of Object.values(app.career.federations?.seasons || {}))
      if (
        season.discipline === event.discipline &&
        season.division === pool.division &&
        season.selectedAt <= event.at &&
        season.expires > event.at
      )
        for (const member of season.members || []) {
          const r = byId.get(member.riderId);
          if (
            federation90Role(member) === "main" &&
            r &&
            rank91Eligible(r, pool, event.at)
          )
            candidates.push({ r, score: member.score || 0 });
        }
    for (const result of candidates.length
      ? careerResults({
          discipline: event.discipline,
          from: careerState().rankingHour ?? event.at - 168,
          until: event.at - 1,
          calendarOnly: true,
        })
      : [])
      if (result.ranking === "world" && result.points > 0)
        scored.set(
          result.riderId,
          Math.max(scored.get(result.riderId) || 0, result.points),
        );
    const wanted = new Set(candidates.map((c) => c.r.id));
    candidates.sort(
      (a, b) =>
        Number(home.has(b.r.country)) - Number(home.has(a.r.country)) ||
        b.score - a.score ||
        a.r.id.localeCompare(b.r.id),
    );
    for (const { r } of candidates) {
      if (pool.admissions >= RANK91_GROWTH) break;
      if (pool.members.some((m) => m.id === r.id)) continue;
      const same = pool.members.filter(
          (m) => byId.get(m.id)?.country === r.country,
        ),
        eligible = same.length >= 4 ? same : pool.members,
        index = eligible.findIndex(
          (m) => !wanted.has(m.id) && !(scored.get(m.id) > 0),
        );
      if (index < 0) continue;
      const removed = eligible[index].id;
      pool.members = pool.members.filter((m) => m.id !== removed);
      pool.members.push({ id: r.id, since: event.at });
      pool.admissions++;
    }
  }

  if (event.team) {
    const countries =
        event.programCountries ||
        [
          ...new Set([
            ...rank91Profiles().map((r) => r.country),
            ...pool.members.map((m) => byId.get(m.id)?.country),
          ]),
        ].filter(Boolean),
      nominated = [];
    for (const country of countries) {
      const season = federation90EnsureSeason(event, country);
      for (const member of season?.members || [])
        if (federationMayRepresent(event, member) && byId.has(member.riderId))
          nominated.push(member.riderId);
      for (const member of federationState().nominations90?.[
        event.id + "|" + country
      ]?.members || [])
        if (byId.has(member.riderId)) nominated.push(member.riderId);
    }
    if (nominated.length) {
      const wanted = new Set(nominated),
        selected = pool.members.filter((m) => wanted.has(m.id));
      for (const id of nominated)
        if (!selected.some((m) => m.id === id))
          selected.push({ id, since: event.at });
      pool.members = [
        ...selected,
        ...pool.members.filter((m) => !wanted.has(m.id)),
      ].slice(0, pool.limit);
    }
  }
  return pool.members.map((m) => byId.get(m.id)).filter(Boolean);
}
// Existing canonical calendar events replace hidden per-board weekly meets.
npc85EnsureCircuit = function () {
  return [];
};
careerSeedRankedHistory = function () {
  if (app.career) app.career.openingHistory = true;
};
careerExpandCompetitionRoster = function () {
  careerState().competitionRosterVersion = 1;
};
careerPointCredits = function (meet, row) {
  if (!rank91Real(meet)) return [];
  const credits = RANK91_CREDITS(meet, row);
  if (
    rank91Raw ||
    row.player ||
    !careerRosterIndex(careerState().npcs || []).byId.has(row.riderId)
  )
    return credits;
  const pools = app.career?.rankingPopulation91?.pools;
  if (!pools) return credits;
  return credits.filter((c) => {
    const spec = rank91Spec(c.type, meet.discipline, c.filter),
      pool = pools[spec.key];
    if (!pool) return true;
    const member = rank91Index(pool).get(row.riderId);
    return member && meet.hour >= member.since;
  });
};
function rank91Visible(type, d, filter, rows, hour, pool, priorRows) {
  const playerIds = new Set(rank91Profiles().map((r) => r.id)),
    members = rank91Index(pool),
    prior = new Map(
      (
        priorRows ||
        careerState().rankings[careerBoardKey(type, d, String(filter))] ||
        []
      ).map((r, i) => [r.id, i]),
    ),
    previousMetadata=new Map((priorRows || careerState().rankings[careerBoardKey(type,d,String(filter))] || []).map(r=>[r.id,r])),
    bestHistory=careerState().rankHistory[careerBoardKey(type,d,String(filter))] || {},
    registry = npc85Registry(),
    out = [];
  for (const row of rows) {
    const id = rank91RowRider(row, type);
    if (type === "team") {
      if (
        pool.members.some(
          (m) => registry.riders.get(m.id)?.country === row.id,
        ) ||
        rank91Profiles().some((r) => r.country === row.id)
      )
        out.push({ ...row });
    } else if (
      playerIds.has(id)
        ? rank91Active(
            pool,
            hour,
            rank91Profiles().filter((p) => p.id === id),
          )
        : members.has(id)
    )
      out.push({ ...row });
  }
  if (type !== "team")
    for (const member of pool.members) {
      const r = registry.riders.get(member.id);
      if (!r || out.some((row) => rank91RowRider(row, type) === r.id)) continue;
      let h = (r.horses || []).find(
        (h) =>
          !h.retiredForever &&
          (!pool.horseAge || careerHorseAge(h, hour) === pool.horseAge) &&
          (!pool.pony || careerHeightCm(h) <= 149),
      );
      if (!h) continue;
      const horse = ["horse", "young-horse"].includes(type),
        comb = type === "combination";
      out.push({
        id: horse ? h.id : comb ? r.id + "|" + h.id : r.id,
        riderId: r.id,
        horseId: h.id,
        name: horse ? h.name : comb ? r.name + " / " + h.name : r.name,
        country: r.country,
        points: 0,
        age: careerAge(r, hour, true),
        division: pool.division,
        specialty: d,
        newEntrant86: true,
      });
    }
  out.sort(
    (a, b) =>
      b.points - a.points ||
      (prior.get(a.id) ?? Infinity) - (prior.get(b.id) ?? Infinity) ||
      (members.get(rank91RowRider(a, type))?.since || 0) -
        (members.get(rank91RowRider(b, type))?.since || 0) ||
      a.id.localeCompare(b.id),
  );
  let npcRows = 0;
  return out
    .filter(
      (row) =>
        rank91Profiles().some((r) => r.id === rank91RowRider(row, type)) ||
        npcRows++ < pool.limit,
    )
    .map((row, i) => {
      const old=previousMetadata.get(row.id);
      const record=bestHistory[row.id];
      const known=[row.best,old?.best,record?.best,...(row.points>0?[i+1]:[])].filter(n=>Number.isInteger(n)&&n>0);
      return {...row,rank:i+1,best:known.length?Math.min(...known):null,previous:row.previous ?? old?.previous ?? null};
    });
}
careerComputeBoards = function (hour) {
  rank91State();
  const boards = rank91LegacyPlayers(RANK91_COMPUTE(hour), hour),
    pools = careerState().rankingPopulation91.pools;
  for (const [key, rows] of Object.entries(boards)) {
    const [type, d, ...parts] = key.split("|"),
      filter = parts.join("|"),
      pool = pools[rank91Spec(type, d, filter).key];
    if (!pool) continue;
    const members = rank91Index(pool),
      players = new Set(rank91Profiles().map((r) => r.id));
    boards[key] = rows.filter((row) =>
      type === "team"
        ? pool.members.some(
            (m) => careerRosterIndex().byId.get(m.id)?.country === row.id,
          ) || rank91Profiles().some((r) => r.country === row.id)
        : players.has(rank91RowRider(row, type))
          ? rank91Active(
              pool,
              hour,
              rank91Profiles().filter(
                (p) => p.id === rank91RowRider(row, type),
              ),
            )
          : members.has(rank91RowRider(row, type)),
    ).map((row,i)=>({...row,rank:i+1}));
  }
  return boards;
};
careerRankingRows = function (
  type,
  d,
  filter = "",
  hour = careerState().rankingHour ?? pastureCalendarHour(),
) {
  const now = pastureCalendarHour(),
    pool = rank91Pool(type, d, filter, now),
    state = rank91State(),
    key = careerBoardKey(type, d, String(filter));
  state.watched[key] = { type, discipline: d, filter: String(filter) };
  const rows = rank91Visible(
    type,
    d,
    String(filter),
    careerComputeBoards(hour)[key] || [],
    hour,
    pool,
  );
  careerState().rankings[key] = rows;
  careerState().rankingHour ??= hour;
  return rows;
};
careerCircuitField = function (type, d, filter, hour) {
  return careerRankingRows(type, d, filter, hour);
};
careerPublish = function (hour, ...args) {
  const state = rank91State();
  for (const pool of Object.values(state.pools))
    rank91Pool(pool.type, pool.discipline, pool.filter, hour);
  const prior = careerState().rankings,
    result = CIRCUIT_PUBLISH(hour, ...args);
  for (const [key, spec] of Object.entries(state.watched)) {
    const pool =
      state.pools[rank91Spec(spec.type, spec.discipline, spec.filter).key];
    careerState().rankings[key] = rank91Visible(
      spec.type,
      spec.discipline,
      spec.filter,
      careerState().rankings[key] || [],
      hour,
      pool,
      prior[key] || [],
    );
  }
  return result;
};
const RANK91_PROFILE = careerSetProfile;
careerSetProfile = function (...args) {
  const ok = RANK91_PROFILE(...args);
  if (ok && app.career?.rankingPopulation91)
    for (const pool of Object.values(rank91State().pools))
      rank91Pool(
        pool.type,
        pool.discipline,
        pool.filter,
        pastureCalendarHour(),
      );
  return ok;
};

const RANK91_SPEC_FACTORY = rank91Spec,
  RANK91_SPEC_CACHE = new Map();
rank91Spec = function (type, d, filter = "") {
  const key = careerBoardKey(type, d, String(filter));
  let spec = RANK91_SPEC_CACHE.get(key);
  if (!spec) {
    spec = RANK91_SPEC_FACTORY(type, d, filter);
    if (RANK91_SPEC_CACHE.size >= 2048) RANK91_SPEC_CACHE.clear();
    RANK91_SPEC_CACHE.set(key, spec);
  }
  return spec;
};

const RANK91_RENDER = renderCareerRankings;
renderCareerRankings = function (...args) {
  const result = RANK91_RENDER(...args),
    panel = document.getElementById("rankings");
  if (panel) {
    const text = document.createElement("p");
    text.textContent =
      "NPC contenders: 50 per inactive category, up to 100 in eligible rider categories. Newly active categories add five entrants each week. Only actual calendar competition results award ranking points.";
    panel.prepend(text);
  }
  return result;
};
