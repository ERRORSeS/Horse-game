/* Extend National Teams 8.2 with scored, persistent squad careers on the existing clock. */
const FED90_ROLES = {
  development: "Selected — Development Squad",
  reserve: "Selected — Reserve",
  main: "Selected — National Squad",
};
const FED90_WEIGHTS = {
  trials: 40,
  results: 20,
  horse: 15,
  rider: 10,
  ranking: 10,
  consistency: 5,
};
const FED90_PLAN = federationPlan;
federationPlan = function (...args) {
  const plan = FED90_PLAN(...args);
  if (!plan) return plan;
  const first = { ...plan.trial, federationTrialRound: 1 },
    at = first.at + 10 * 24,
    date = pastureDate(at),
    second = {
      ...first,
      id: first.id + ":round-2",
      name: first.name + " · Round 2",
      at,
      date,
      federationTrialRound: 2,
    };
  first.name += " · Round 1";
  if (second.phaseSchedule)
    second.phaseSchedule = {
      dressage: at,
      "cross-country": at + 24,
      showjumping: at + 48,
    };
  plan.trial = first;
  const existing = app.career?.federations?.seasons?.[plan.id];
  plan.trials =
    existing &&
    ((!existing.version90 && !existing.trialIds) ||
      existing.trialIds?.length === 1)
      ? [first]
      : [first, second];
  if (plan.trials.length === 1) return plan;
  plan.selection = Math.max(plan.selection, careerEventEnd(second) + 24);
  return plan;
};
function federation90Role(member) {
  return (
    member?.role ||
    Object.keys(FED90_ROLES).find(
      (role) => FED90_ROLES[role] === member?.status,
    ) ||
    (member?.status === "Selected — Championship Team" ? "main" : null)
  );
}
function federation90Health(h) {
  if (!h) return "No eligible horse is registered.";
  if (h.deceased || h.retiredForever || h.retiredToBreeding)
    return "The registered horse is unavailable or retired.";
  if (h.stats && !canCompeteUnderSaddle(h))
    return "The registered horse is not medically or educationally eligible.";
  if (
    (h.medicalConditions || []).some(
      (c) =>
        !c.resolved &&
        (c.severity === "major" || HorseHealth.definition(c).restriction),
    ) ||
    (h.illnesses || []).some((c) => c.active)
  )
    return "A current medical restriction prevents selection.";
  return "";
}
function federation90PartnerIssue(rider, horse) {
  if (rider.player)
    return app.horses.some(
      (h) => h.id === horse.id && (h.owner === "Your Stable" || h.isLeased),
    )
      ? ""
      : "The registered horse is no longer in your stable or lease.";
  return horse.owner === "Your Stable" ||
    (horse.assignedRiderId && horse.assignedRiderId !== rider.id) ||
    !rider.horses?.some((h) => h.id === horse.id)
    ? "The horse is no longer assigned to this rider."
    : "";
}
function federation90Horse(id) {
  return calendarHorseById(id) || npc85Registry().horses.get(id);
}
function federation90TrialRows(plan, riderId, horseId, hour) {
  return plan.trials.map((event) => {
    const meet =
        careerState().meets[event.id] || federation90TrialMeet(plan, event),
      row = meet?.results.find(
        (r) => r.riderId === riderId && r.horseId === horseId,
      ),
      valid = !!(
        meet &&
        row &&
        meet.hour <= hour &&
        meet.hour <= plan.selection &&
        meet.official !== false &&
        !meet.sandbox &&
        meet.discipline === plan.discipline &&
        meet.division === plan.division &&
        (!row.country || row.country === plan.country) &&
        row.started !== false &&
        !row.eliminated &&
        Number.isInteger(row.placing) &&
        row.placing > 0 &&
        Number.isFinite(row.score)
      );
    return {
      eventId: event.id,
      round: event.federationTrialRound,
      hour: meet?.hour,
      placing: row?.placing || null,
      score: row?.score ?? null,
      starters:
        meet?.starters ||
        meet?.results.filter((r) => r.started !== false).length ||
        0,
      fieldStrength: meet?.fieldStrength ?? 60,
      level: meet?.level || event.level,
      valid,
      reason: valid
        ? "Verified official combination result"
        : !row
          ? "No result for this registered rider–horse combination"
          : meet?.hour > hour
            ? "Result is not yet finalized"
            : row.eliminated
              ? "Eliminated or retired"
              : "Result fails official cycle/division/nationality/completion requirements",
    };
  });
}
const FED90_RECORDS = federationRecords;
federationRecords = function (plan, riderId, horseId, until) {
  return careerResults({
    riderId,
    horseId,
    discipline: plan.discipline,
    from: until - CAREER_HOURS_PER_YEAR,
    until,
    calendarOnly:true,
  }).filter(
    (r) =>
      r.tier >= 2 &&
      (r.division === plan.division ||
        (plan.division === "senior" && r.division === "amateur")) &&
      careerState().meets[r.eventId]?.official !== false && (typeof rank91Real!=='function'||rank91Real(careerState().meets[r.eventId])),
  );
};
function federation90Context(plan, hour) {
  const boards = careerComputeBoards(hour + 1),
    key = careerBoardKey(
      plan.division === "senior" ? "national" : "youth-national",
      plan.discipline,
      plan.division === "senior"
        ? plan.country
        : plan.division + "|" + plan.country,
    );
  return {
    ranking: new Map((boards[key] || []).map((r) => [r.id, r.rank])),
    rankingHour: hour,
  };
}
function federation90Score(plan, rider, horse, hour, context) {
  const trials = federation90TrialRows(plan, rider.id, horse.id, hour),
    records = federationRecords(plan, rider.id, horse.id, hour).filter(
      (r) =>
        !plan.trials.some((t) => t.id === r.eventId) &&
        careerState().meets[r.eventId]?.federationTrial !== plan.id,
    ),
    finished = records.filter((r) => r.placing && r.placing <= 10),
    consistency = records.length ? finished.length / records.length : 0,
    readiness = horse.stats
      ? effectiveDisciplineSkill(horse, plan.discipline)
      : Number(horse.skills?.[plan.discipline]) || 0,
    skill = rider.player
      ? Object.values(rider.abilities || {}).reduce((s, n) => s + n, 0) /
        Math.max(1, Object.keys(rider.abilities || {}).length)
      : rider.skill || 0,
    rank = context.ranking.get(rider.id);
  const trialValue = (row) => {
    if (!row.valid) return 0;
    const field = clamp(row.starters / 8, 0, 1),
      place = Math.max(
        0,
        1 - (row.placing - 1) / Math.max(3, row.starters - 1),
      ),
      quality =
        plan.discipline === "dressage"
          ? clamp((row.score - 45) / 40, 0, 1)
          : plan.discipline === "hunter"
            ? clamp(row.score / 90, 0, 1)
            : clamp(
                1 - row.score / (plan.discipline === "eventing" ? 140 : 40),
                0,
                1,
              ),
      difficulty = clamp(
        (SHOW_LEVELS[plan.discipline].indexOf(row.level) + 1) /
          (SHOW_LEVELS[plan.discipline].indexOf(plan.trial.level) + 1),
        0,
        1,
      );
    return (
      100 *
      (0.65 * place * (0.65 + 0.35 * field) +
        0.25 * quality +
        0.1 * clamp(row.fieldStrength / 90, 0, 1)) *
      difficulty
    );
  };
  const proven = [
      ...records
        .filter((r) => r.placing && !r.eliminated)
        .map((r) => careerState().meets[r.eventId]?.level),
      ...trials.filter((t) => t.valid).map((t) => t.level),
    ].filter((level) => SHOW_LEVELS[plan.discipline].includes(level)),
    provenIndex = Math.max(
      -1,
      ...proven.map((level) => SHOW_LEVELS[plan.discipline].indexOf(level)),
    ),
    proof =
      100 *
      clamp(
        (provenIndex + 1) /
          (SHOW_LEVELS[plan.discipline].indexOf(plan.trial.level) + 1),
        0,
        1,
      );
  const values = {
      trials: trials.length
        ? trials.reduce((s, r) => s + trialValue(r), 0) / trials.length
        : 0,
      results:
        100 *
        Math.min(
          1,
          finished.reduce(
            (s, r) =>
              s +
              Math.max(0.1, 1 - (r.placing - 1) / 12) * Math.min(1, r.tier / 4),
            0,
          ) / 5,
        ),
      horse: clamp(0.7 * readiness + 0.3 * proof, 0, 100),
      rider: clamp(skill, 0, 100),
      ranking: rank ? 100 / (1 + (rank - 1) / 15) : 0,
      consistency: 100 * consistency,
    },
    weights = trials.length
      ? { ...FED90_WEIGHTS }
      : {
          results: (100 / 60) * 20,
          horse: (100 / 60) * 15,
          rider: (100 / 60) * 10,
          ranking: (100 / 60) * 10,
          consistency: (100 / 60) * 5,
        },
    factors = Object.fromEntries(
      Object.entries(weights).map(([key, weight]) => [
        key,
        (values[key] * weight) / 100,
      ]),
    );
  return {
    score: Object.values(factors).reduce((s, n) => s + n, 0),
    values,
    weights,
    factors,
    trials,
    finishes: finished.length,
    consistency,
    readiness,
    ranking: rank || null,
    rankingHour: context.rankingHour,
    provenLevel: SHOW_LEVELS[plan.discipline][provenIndex] || null,
    international: finished.filter((r) => r.tier >= 5 && r.placing <= 3).length,
  };
}
federationScore = function (plan, rider, horse, hour) {
  return federation90Score(
    plan,
    rider,
    horse,
    hour,
    federation90Context(plan, hour),
  );
};
function federation90Issue(plan, rider, horse, hour, role = "main") {
  if (!rider) return "Rider profile unavailable.";
  if (!rider.country) return "Select a sporting nationality before applying.";
  if (rider.country !== plan.country)
    return "Sporting nationality does not match this federation.";
  const age = careerAge(rider, hour, true);
  if (age === null) return "Set a rider age before applying.";
  if (!careerDivisions(rider, hour).includes(plan.division))
    return (
      "Competition-year age " +
      age +
      " is outside " +
      CAREER_AGE_DIVISIONS[plan.division].ages.join("–") +
      "."
    );
  const health = federation90Health(horse);
  if (health) return health;
  const partner = federation90PartnerIssue(rider, horse);
  if (partner) return partner;
  const event =
    role === "development"
      ? {
          ...plan.trial,
          level:
            SHOW_LEVELS[plan.discipline][
              Math.max(
                0,
                SHOW_LEVELS[plan.discipline].indexOf(plan.trial.level) - 1,
              )
            ],
        }
      : plan.trial;
  event.minimumSkill = requiredSkillBand(event.discipline, event.level)[0];
  const issue = FEDERATION_ELIGIBILITY(event, rider, horse, {
    npc: !rider.player,
  });
  if (issue) return issue;
  if (
    !federationRecords(plan, rider.id, horse.id, hour).some(
      (r) => r.placing && r.placing <= 10,
    )
  )
    return "A verified regional-or-higher top-ten result with this horse is required.";
  return "";
}
federationEligibility = function (plan, rider, horse, hour) {
  return federation90Issue(plan, rider, horse, hour);
};
function federation90Evaluate(plan, hour) {
  const context = federation90Context(plan, hour),
    applications = Object.values(federationState().applications).filter(
      (a) => a.planId === plan.id && a.status !== "Withdrawn",
    ),
    pairs = [];
  for (const rider of careerRosterIndex().byCountry.get(plan.country) || []) {
    if (rider.retired || rider.specialty !== plan.discipline) continue;
    let best;
    for (const horse of rider.horses || []) {
      const issue = federation90Issue(plan, rider, horse, hour, "development");
      if (issue) continue;
      const card = federation90Score(plan, rider, horse, hour, context);
      if (!best || card.score > best.card.score) best = { rider, horse, card };
    }
    if (best) pairs.push(best);
  }
  for (const application of applications) {
    const rider = federationPlayer(application),
      horse = federation90Horse(application.horseId),
      issue = federation90Issue(plan, rider, horse, hour, "development");
    if (issue) {
      application.reason = issue;
      application.selection = {
        ...(rider && horse
          ? federation90Score(plan, rider, horse, hour, context)
          : {
              score: 0,
              scored: false,
              trials: federation90TrialRows(
                plan,
                application.riderId,
                application.horseId,
                hour,
              ),
            }),
        eligible: false,
        reason: issue,
      };
      continue;
    }
    pairs.push({
      rider,
      horse,
      application,
      card: federation90Score(plan, rider, horse, hour, context),
    });
  }
  const ranked = pairs
    .map(({ rider, horse, application, card }) => ({
      riderId: rider.id,
      riderName: rider.name,
      horseId: horse.id,
      horseName: horse.name,
      ...card,
      application,
      mainIssue: federation90Issue(plan, rider, horse, hour),
      trialCompletions: card.trials.filter((t) => t.valid).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.finishes - a.finishes ||
        a.riderId.localeCompare(b.riderId),
    );
  return { ranked, applications };
}
function federation90Select(plan, hour, reason = "Scheduled selection") {
  const state = federationState(),
    previous = state.seasons[plan.id],
    { ranked, applications } = federation90Evaluate(plan, hour),
    counts = { main: 0, reserve: 0, development: 0 },
    capacity = { main: FEDERATION_POSITIONS, reserve: 3, development: 8 };
  const members = ranked.map((row, index) => {
    const { application, ...card } = row,
      canMain =
        !row.mainIssue &&
        (row.trialCompletions > 0 ||
          row.international >= 2 ||
          (!plan.trials.length && row.finishes >= 3));
    let role = null;
    if (canMain && counts.main < capacity.main) role = "main";
    else if (!row.mainIssue && counts.reserve < capacity.reserve)
      role = "reserve";
    else if (counts.development < capacity.development) role = "development";
    if (role) counts[role]++;
    const status = FED90_ROLES[role] || "Not Selected",
      explanation =
        role === "main"
          ? `Ranked ${index + 1} of ${ranked.length} eligible candidates; selected for ${capacity.main} main-squad positions.`
          : row.mainIssue
            ? row.mainIssue
            : !canMain
              ? "No valid completed official trial or two recent international top-three results for direct main-squad selection."
              : `Ranked ${index + 1} of ${ranked.length}; ${capacity.main} main-squad places went to stronger eligible combinations.`;
    const member = {
      ...card,
      rank: index + 1,
      role,
      status,
      reason: explanation,
      eligibleCount: ranked.length,
      mainPositions: capacity.main,
      trialPlace:
        card.trials
          .filter((t) => t.valid)
          .sort((a, b) => a.placing - b.placing)[0]?.placing || null,
    };
    if (application) {
      application.selection = { ...member };
      application.reason = explanation;
      federationTransition(application, status, hour);
    }
    return member;
  });
  for (const a of applications)
    if (!members.some((m) => m.riderId === a.riderId)) {
      a.reason ||= "No eligible registered combination for this selection.";
      federationTransition(a, "Not Selected", hour);
    }
  const history = previous?.history || [];
  for (const member of members) {
    const old = previous?.members.find((m) => m.riderId === member.riderId);
    if (federation90Role(old) !== member.role)
      history.push({
        hour,
        riderId: member.riderId,
        horseId: member.horseId,
        from: federation90Role(old),
        to: member.role,
        reason: member.reason,
      });
  }
  for (const old of previous?.members || [])
    if (
      federation90Role(old) &&
      !members.some((m) => m.riderId === old.riderId)
    )
      history.push({
        hour,
        riderId: old.riderId,
        horseId: old.horseId,
        from: federation90Role(old),
        to: null,
        reason: "Combination no longer eligible at scheduled review.",
      });
  state.seasons[plan.id] = {
    ...previous,
    id: plan.id,
    year: plan.year,
    country: plan.country,
    discipline: plan.discipline,
    division: plan.division,
    selectedAt: previous?.selectedAt ?? hour,
    lastReview: hour,
    expires: plan.expires,
    trialId: plan.trial.id,
    trialIds: plan.trials.map((t) => t.id),
    members,
    history,
    version90: 1,
    reason,
    rosterSnapshots90: [
      ...(previous?.rosterSnapshots90 || []),
      {
        hour,
        members: members
          .filter((m) => m.role)
          .map((m) => ({
            riderId: m.riderId,
            riderName: m.riderName,
            horseId: m.horseId,
            horseName: m.horseName,
            role: m.role,
            status: m.status,
            score: m.score,
          })),
      },
    ],
    reviews: [
      ...(previous?.reviews || []),
      {
        hour,
        reason,
        candidates: ranked.length,
        counts,
        trialIds: plan.trials.map((t) => t.id),
      },
    ],
  };
  return state.seasons[plan.id];
}
federationReview = function (plan, hour) {
  const state = federationState(),
    applications = Object.values(state.applications).filter(
      (a) => a.planId === plan.id && a.status !== "Withdrawn",
    );
  for (const a of applications) {
    if (hour >= plan.review && a.status === "Submitted")
      federationTransition(a, "Under Review", plan.review);
    if (hour >= plan.shortlist && a.status === "Under Review") {
      const issue = federation90Issue(
        plan,
        federationPlayer(a),
        federation90Horse(a.horseId),
        plan.shortlist,
      );
      if (issue) a.reason = issue;
      federationTransition(
        a,
        issue ? "Not Selected" : "Shortlisted",
        plan.shortlist,
      );
    }
    if (hour >= plan.invites && a.status === "Shortlisted")
      federationTransition(a, "Trial Invited", plan.invites);
    if (
      ["Trial Invited", "Trial Completed"].includes(a.status) &&
      federation90TrialRows(plan, a.riderId, a.horseId, hour).some(
        (t) => t.valid,
      )
    )
      federationTransition(
        a,
        "Trial Completed",
        Math.min(hour, plan.selection),
      );
  }
  if (
    hour >= plan.selection &&
    (!state.seasons[plan.id] ||
      (!state.seasons[plan.id].version90 &&
        state.seasons[plan.id].expires > hour))
  ) {
    const old = state.seasons[plan.id];
    if (old)
      old.legacySelection90 = {
        members: HorseHealth.copy(old.members),
        selectedAt: old.selectedAt,
      };
    federation90Select(
      plan,
      plan.selection,
      old
        ? "Re-evaluated from saved official trials; previous decision preserved"
        : "Scheduled selection",
    );
  } else if (hour >= plan.selection && state.seasons[plan.id]?.selectionDirty) {
    state.seasons[plan.id].selectionDirty = false;
    federation90Select(
      plan,
      plan.selection,
      "Amended after a finalized official trial result",
    );
  }
};
const FED90_COUNTRIES = federationCountries;
federationCountries = function () {
  return FED90_COUNTRIES();
};
function federation90DecisionTimes(plan) {
  return [
    plan.opens + 1,
    plan.review,
    plan.shortlist,
    plan.invites,
    plan.selection,
    pastureCalendarHour(plan.year, 9, 4, 12),
    pastureCalendarHour(plan.year, 12, 4, 12),
  ];
}
function federationNextDecision(from, to) {
  if (!federationEnabled()) return Infinity;
  let next = Infinity;
  for (let year = pastureDate(from).year; year <= pastureDate(to).year; year++)
    for (const country of federationCountries())
      for (const plan of federationPlans(year, country))
        for (const at of federation90DecisionTimes(plan))
          if (at > from && at <= to) next = Math.min(next, at);
  return next;
}
federationAdvance = function (hour) {
  if (!federationEnabled()) return;
  const state = federationState(),
    from = state.cursor ?? careerState().origin;
  if (hour <= from) return;
  if (
    typeof chronologicalAgenda90 !== "undefined" &&
    chronologicalAgenda90 &&
    !chronologicalAgenda90.federationTimes.some((at) => at > from && at <= hour)
  ) {
    state.cursor = hour;
    return;
  }
  state.processed90 ||= {};
  for (
    let year = pastureDate(from).year;
    year <= pastureDate(hour).year;
    year++
  )
    for (const country of federationCountries())
      for (const plan of federationPlans(year, country)) {
        for (const at of federation90DecisionTimes(plan)) {
          const key = plan.id + ":" + at;
          if (at <= from || at > hour || state.processed90[key]) continue;
          if (at > plan.selection && state.seasons[plan.id])
            federation90Select(plan, at, "Periodic squad reassessment");
          else {
            federationRecruit(plan, at);
            federationReview(plan, at);
          }
          state.processed90[key] = true;
        }
      }
  state.cursor = hour;
};
function federation90ProgramEvents(plan) {
  const events = [];
  for (let month = 1; month <= 12; month++) {
    const roles = month % 2 ? ["development", "reserve", "main"] : ["main"],
      stage = month % 2 ? "Development / Reserve" : "Main Squad",
      level = roles.includes("development")
        ? SHOW_LEVELS[plan.discipline][
            Math.max(
              0,
              SHOW_LEVELS[plan.discipline].indexOf(plan.trial.level) - 1,
            )
          ]
        : plan.trial.level;
    events.push(
      careerEvent(
        {
          id:
            "federation-program-" +
            plan.country +
            "-" +
            plan.discipline +
            "-" +
            plan.division +
            "-" +
            month,
          name:
            CAREER_COUNTRIES[plan.country][0] +
            " " +
            CAREER_AGE_DIVISIONS[plan.division].label +
            " " +
            stage +
            " " +
            (month % 2 ? "Development Cup" : "Nations Preparation Cup"),
          discipline: plan.discipline,
          division: plan.division,
          level,
          tier: month % 2 ? 3 : 5,
          official: true,
          ranking: plan.division === "senior" ? "national" : "division",
          base: month % 2 ? 25 : 45,
          month,
          day: 10,
          country: plan.country,
          federationProgram: true,
          squadRoles: roles,
          series:
            "federation-" +
            plan.country +
            "-" +
            plan.division +
            "-" +
            (month % 2 ? "development" : "main"),
          team: 4,
          count: 3,
          minField: 8,
          cutoff: 24,
          horseMinAge: 5,
          allowSubstitutions: true,
          ...(plan.division === "pony" ? { ponyCm: 148 } : {}),
        },
        plan.year,
      ),
    );
  }
  return events;
}
const FED90_SCHEDULE = careerSchedule;
careerSchedule = function (from, to, ...args) {
  const events = FED90_SCHEDULE(from, to, ...args);
  if (!federationEnabled()) return events;
  for (let year = pastureDate(from).year; year <= pastureDate(to).year; year++)
    for (const country of federationCountries())
      for (const plan of federationPlans(year, country)) {
        for (const event of [
          ...plan.trials.slice(1),
          ...federation90ProgramEvents(plan),
        ])
          if (event.at >= from && event.at <= to) events.push(event);
      }
  return events.sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
};
function federation90Season(event, rider) {
  const season = Object.values(federationState().seasons)
    .filter(
      (s) =>
        s.country === rider.country &&
        s.discipline === event.discipline &&
        s.division === event.division &&
        s.selectedAt <= event.at &&
        s.expires > event.at,
    )
    .sort((a, b) => b.selectedAt - a.selectedAt)[0];
  if (season?.lastReview > event.at) {
    const snapshot = (season.rosterSnapshots90 || [])
      .filter((s) => s.hour <= event.at)
      .sort((a, b) => b.hour - a.hour)[0];
    if (snapshot)
      return {
        ...season,
        members: snapshot.members,
        lastReview: snapshot.hour,
        historical90: true,
      };
  }
  return season;
}
function federationMayRepresent(event, member) {
  const role = federation90Role(member);
  return (
    !!role &&
    (event.federationProgram
      ? (event.squadRoles || []).includes(role)
      : role === "main")
  );
}
federationNomination = function (event, rider, horse) {
  const season = federation90Season(event, rider);
  if (!season) return null;
  const member = season.members.find(
    (m) =>
      m.riderId === rider.id && (event.allocated || m.horseId === horse?.id),
  );
  if (!member || !federationMayRepresent(event, member)) return null;
  if (federation90Health(horse) || federation90PartnerIssue(rider, horse))
    return null;
  if (
    (event.games || event.major) &&
    FEDERATION_ELIGIBILITY(event, rider, horse, { npc: !rider.player })
  )
    return null;
  return member;
};
federationTeamEntries = function (
  rider = careerRider(),
  hour = pastureCalendarHour(),
) {
  if (!federationEnabled()) return [];
  return careerSchedule(hour, hour + 90 * 24)
    .filter((e) => e.team || e.games || e.federationProgram)
    .flatMap((event) => {
      const season = federation90Season(event, rider),
        member = season?.members.find((m) => m.riderId === rider.id),
        horse = member && federation90Horse(member.horseId);
      return horse && federationNomination(event, rider, horse)
        ? [{ event, horse }]
        : [];
    });
};
federationRegisterTrial = function (
  planId,
  rider = careerRider(),
  trialId = null,
) {
  const plan = federationPlans(app.year, rider.country).find(
      (p) => p.id === planId,
    ),
    application =
      plan && federationState().applications[plan.id + ":" + rider.id];
  if (
    !application ||
    !["Trial Invited", "Trial Completed"].includes(application.status)
  )
    return {
      ok: false,
      message: "A valid invitation for the registered combination is required.",
    };
  const trial =
    plan.trials.find((t) => t.id === trialId) ||
    plan.trials.find(
      (t) =>
        t.at >= pastureCalendarHour() &&
        !careerState().meets[t.id]?.results.some(
          (r) => r.riderId === rider.id && r.horseId === application.horseId,
        ),
    );
  if (!trial)
    return {
      ok: false,
      message: "No uncompleted future trial remains in this cycle.",
    };
  const horse = federation90Horse(application.horseId);
  return horse
    ? careerEnter(trial, horse)
    : { ok: false, message: "The invited horse is unavailable." };
};
const FED90_RECORD = careerRecordMeet;
careerRecordMeet = function (event, ...args) {
  const prior = app.career?.meets[event.id],
    meet = FED90_RECORD(event, ...args);
  if (!prior && federationEnabled())
    federationState().resultRevision90 =
      (federationState().resultRevision90 || 0) + 1;
  if (!prior && event.federationTrial) {
    const plan = federationPlans(event.date.year, event.federation).find(
      (p) => p.id === event.federationTrial,
    );
    if (plan) {
      const season = federationState().seasons[plan.id];
      if (season && meet.hour <= plan.selection) season.selectionDirty = true;
      federationReview(
        plan,
        Math.max(careerState().cursor || 0, careerEventEnd(event)),
      );
    }
  }
  return meet;
};
// National selections remain lazy for non-player federations, using existing riders and results.
function federation90EnsureSeason(event, country) {
  let season = federation90Season(event, { country });
  const year = event.date.year,
    plan = federationPlan(year, country, event.discipline, event.division);
  if (!plan || event.at < plan.selection) return season;
  if (!season) {
    federationReview(plan, plan.selection);
    season = federation90Season(event, { country });
  }
  if (season && !season.historical90) {
    const review = federation90DecisionTimes(plan)
      .filter(
        (at) => at > plan.selection && at < event.at && at > season.lastReview,
      )
      .pop();
    if (review) {
      federation90Select(
        plan,
        review,
        "Periodic squad reassessment before an international appearance",
      );
      season = federation90Season(event, { country });
    }
  }
  return season;
}
const FED90_ELIGIBILITY = careerEligibility;
careerEligibility = function (event, rider, horse, options = {}) {
  if (event.federationProgram) {
    if (!event.programCountries.includes(rider?.country))
      return "This federation is not invited to this team leg.";
    const season = options.npc
        ? federation90EnsureSeason(event, rider.country)
        : federation90Season(event, rider),
      member = season?.members.find(
        (m) => m.riderId === rider?.id && m.horseId === horse?.id,
      );
    if (
      !federationMayRepresent(event, member) &&
      !federationNomination(event, rider, horse)?.substitution90
    )
      return (
        "This event requires an active " +
        event.squadRoles.join(" / ") +
        " squad nomination."
      );
  }
  if (event.federationTrial && options.npc) {
    const plan = federationPlan(
      event.date.year,
      event.federation,
      event.discipline,
      event.division,
    );
    if (
      plan &&
      !federationRecords(plan, rider.id, horse?.id, event.at - 1).some(
        (r) => r.placing && r.placing <= 10,
      )
    )
      return "A verified qualifying result is required for this trial.";
  }
  return FED90_ELIGIBILITY(event, rider, horse, options);
};
const FED90_PROGRAM = federation90ProgramEvents;
const FED90_PROGRAM_COUNTRIES = new Map();
federation90ProgramEvents = function (plan) {
  let countries = FED90_PROGRAM_COUNTRIES.get(plan.id);
  if (!countries) {
    countries = [
      plan.country,
      ...Object.keys(CAREER_COUNTRIES)
        .filter((c) => c !== plan.country)
        .sort(
          (a, b) =>
            careerRoll(plan.id, "opponent:" + a) -
            careerRoll(plan.id, "opponent:" + b),
        )
        .slice(0, 5),
    ];
    if (FED90_PROGRAM_COUNTRIES.size >= 1024) FED90_PROGRAM_COUNTRIES.clear();
    FED90_PROGRAM_COUNTRIES.set(plan.id, countries);
  }
  return FED90_PROGRAM(plan).map((event) => ({
    ...event,
    ...([1, 7, 9].includes(event.date.month)
      ? {
          team: 0,
          count: 0,
          npcCount: 23,
          rules: { ...event.rules, jumpOff: event.discipline === "jumping" },
        }
      : {}),
    name: event.name.replace(
      "Development / Reserve Development Cup",
      [1, 7, 9].includes(event.date.month)
        ? "National Development Cup"
        : "Development Nations Challenge",
    ),
    squadRoles: event.squadRoles.includes("development")
      ? ["development", "reserve"]
      : ["main"],
    programCountries: countries,
  }));
};

function federation90Nominate(event, country, hour) {
  const season = federation90Season(event, { country });
  if (!season) return null;
  const state = federationState();
  state.nominations90 ||= {};
  const key = event.id + "|" + country,
    old = state.nominations90[key];
  const signature =
    (state.resultRevision90 || 0) +
    "|" +
    season.lastReview +
    "|" +
    season.members
      .map(
        (m) =>
          m.riderId +
          ":" +
          m.horseId +
          ":" +
          federation90MemberIssue(m, season, hour),
      )
      .join("|");
  if (old && old.reviewedAt === hour && old.signature === signature) return old;
  const allowed = event.squadRoles || ["main"],
    members = season.members.filter((m) =>
      allowed.includes(federation90Role(m)),
    ),
    eligible = (member) => {
      const rider =
          member.riderId === "player" ||
          app.riderRealism?.profiles.some((p) => p.id === member.riderId)
            ? federationPlayer({ riderId: member.riderId })
            : npc85Registry().riders.get(member.riderId),
        horse = federation90Horse(member.horseId);
      return (
        rider &&
        horse &&
        !federation90Health(horse) &&
        !federation90PartnerIssue(rider, horse) &&
        !FEDERATION_ELIGIBILITY(event, rider, horse, { npc: !rider.player })
      );
    },
    withdrawn = old?.withdrawn || [],
    accepted = (old?.members || [])
      .filter(
        (m) =>
          m.status === "Accepted" &&
          m.acceptedAt <= old.deadline &&
          !withdrawn.includes(m.riderId),
      )
      .map((prior) =>
        season.members.find(
          (m) => m.riderId === prior.riderId && m.horseId === prior.horseId,
        ),
      )
      .filter((m) => m && eligible(m)),
    chosen = [
      ...accepted,
      ...members.filter(
        (m) =>
          !accepted.some((a) => a.riderId === m.riderId) &&
          eligible(m) &&
          !withdrawn.includes(m.riderId),
      ),
    ].slice(0, event.team || 1),
    replacements = [];
  const deadline = event.substitutionDeadline ?? event.at - 1;
  if (
    chosen.length < (event.team || 1) &&
    event.allowSubstitutions &&
    hour <= deadline
  ) {
    for (const member of season.members
      .filter((m) => ["reserve", "development"].includes(federation90Role(m)))
      .sort((a, b) => b.score - a.score)) {
      if (
        chosen.some((m) => m.riderId === member.riderId) ||
        withdrawn.includes(member.riderId) ||
        !eligible(member)
      )
        continue;
      chosen.push(member);
      replacements.push(member.riderId);
      if (chosen.length >= (event.team || 1)) break;
    }
  }
  const nomination = {
    eventId: event.id,
    country,
    reviewedAt: hour,
    signature,
    deadline,
    withdrawn,
    members: chosen.map((m) => ({
      riderId: m.riderId,
      horseId: m.horseId,
      acceptedAt: old?.members.find(
        (prior) => prior.riderId === m.riderId && prior.horseId === m.horseId,
      )?.acceptedAt,
      status: accepted.some((prior) => prior.riderId === m.riderId)
        ? "Accepted"
        : replacements.includes(m.riderId)
          ? "Replacement offered"
          : "Nominated",
      reason: replacements.includes(m.riderId)
        ? "Eligible reserve/development replacement for an unavailable combination."
        : "Active squad member; event eligibility verified.",
    })),
  };
  state.nominations90[key] = nomination;
  return nomination;
}
function federationBeforeEvent(event) {
  if (!(event.team || event.games) || event.federationTrial) return;
  for (const country of event.programCountries || federationCountries()) {
    const season = federation90Season(event, { country });
    if (!season) continue;
    const missing = season.members.filter(
      (m) =>
        federation90Role(m) === "main" &&
        federation90MemberIssue(m, season, event.at),
    );
    if (missing.length && !season.historical90) {
      const plan = federationPlan(
        season.year,
        country,
        event.discipline,
        event.division,
      );
      federation90Select(
        plan,
        event.at - 2,
        "Review following an actual squad vacancy",
      );
    }
    federation90Nominate(event, country, event.at - 2);
  }
}
const FED90_NOMINATION = federationNomination;
federationNomination = function (event, rider, horse) {
  if (event.programCountries && !event.programCountries.includes(rider.country))
    return null;
  if (
    federationState().nominations90?.[
      event.id + "|" + rider.country
    ]?.withdrawn.includes(rider.id)
  )
    return null;
  const regular = FED90_NOMINATION(event, rider, horse);
  if (regular) {
    if (event.games || event.major) {
      const nomination = federation90Nominate(
        event,
        rider.country,
        rider.player ? pastureCalendarHour() : event.at - 2,
      );
      if (
        !nomination?.members.some(
          (m) => m.riderId === rider.id && m.horseId === horse?.id,
        )
      )
        return null;
      federationState().championships90 ||= {};
      federationState().championships90[event.id + "|" + rider.id] = {
        eventId: event.id,
        riderId: rider.id,
        horseId: horse.id,
        country: rider.country,
        status: "Championship nomination",
        verifiedAt: rider.player ? pastureCalendarHour() : event.at - 2,
      };
    }
    return regular;
  }
  if (!event.allowSubstitutions) return null;
  const nomination = federation90Nominate(
      event,
      rider.country,
      rider.player ? pastureCalendarHour() : event.at - 2,
    ),
    replacement = nomination?.members.find(
      (m) => m.riderId === rider.id && m.horseId === horse?.id,
    );
  if (!replacement) return null;
  const season = federation90Season(event, rider),
    member = season.members.find((m) => m.riderId === rider.id);
  return {
    ...member,
    substitution90: true,
    status: "Selected — National Squad",
    role: "main",
    replacementOffer: true,
  };
};
federationMayRepresent = function (event, member) {
  const role = federation90Role(member);
  return (
    !!role &&
    (member?.substitution90
      ? event.allowSubstitutions === true
      : event.federationProgram
        ? (event.squadRoles || []).includes(role)
        : role === "main")
  );
};
const FED90_REGISTER_TEAM = federationRegisterTeam;
federationRegisterTeam = function (eventId, rider = careerRider()) {
  const result = FED90_REGISTER_TEAM(eventId, rider);
  if (result.ok) {
    const nomination =
        federationState().nominations90?.[eventId + "|" + rider.country],
      member = nomination?.members.find((m) => m.riderId === rider.id);
    if (member) {
      member.status = "Accepted";
      member.acceptedAt = pastureCalendarHour();
    }
  }
  return result;
};
function federationWithdrawNomination(eventId, rider = careerRider()) {
  const event = careerSchedule(
    pastureCalendarHour(),
    pastureCalendarHour() + 90 * 24,
  ).find((e) => e.id === eventId);
  if (!event || !event.allowSubstitutions)
    return {
      ok: false,
      message: "This event does not currently permit a replacement.",
    };
  const nomination = federation90Nominate(
    event,
    rider.country,
    pastureCalendarHour(),
  );
  if (!nomination || pastureCalendarHour() > nomination.deadline)
    return { ok: false, message: "The substitution deadline has passed." };
  nomination.withdrawn.push(rider.id);
  nomination.reviewedAt = -1;
  federation90Nominate(event, rider.country, pastureCalendarHour());
  return { ok: true };
}
function federation90Scorecard(plan, application, hour) {
  let card = application?.selection;
  if (!card && application) {
    const rider = federationPlayer(application),
      horse = federation90Horse(application.horseId);
    if (
      rider &&
      horse &&
      !federation90Issue(plan, rider, horse, hour, "development")
    )
      card = federation90Score(
        plan,
        rider,
        horse,
        hour,
        federation90Context(plan, hour),
      );
  }
  if (!card) return "";
  return `<details data-federation-scorecard><summary>Selection evaluation · ${card.scored === false ? "Not scored" : Number(card.score || 0).toFixed(1) + "/100"}</summary>${(card.trials || []).map((t) => `<p>Trial ${t.round}: ${t.valid ? "#" + t.placing : "Not counted"} · ${csEscape(t.reason)} · ${t.starters} starters</p>`).join("")}<table><thead><tr><th>Factor</th><th>Actual evaluation</th><th>Weight</th></tr></thead><tbody>${Object.entries(
    card.weights || {},
  )
    .map(
      ([key, weight]) =>
        `<tr><td>${csEscape(key)}</td><td>${Number(card.values[key]).toFixed(1)}/100</td><td>${weight.toFixed(1)}%</td></tr>`,
    )
    .join(
      "",
    )}</tbody></table><p>${card.eligible === false ? "Ineligible for this selection" : card.rank ? "Shortlist #" + card.rank + " of " + card.eligibleCount + " · " + card.mainPositions + " main positions." : "Pending selection · " + FEDERATION_POSITIONS + " main positions."}</p><p>${csEscape(application.reason || "Decision pending until " + pastureDateLabel(plan.selection))}</p><p>Highest recorded completed level: ${csEscape(card.provenLevel || "Unrecorded")}.</p><p>Stage: ${csEscape(application.status)}. Next decision: ${csEscape(pastureDateLabel(federation90DecisionTimes(plan).find((at) => at > hour) || federationPlan(plan.year + 1, plan.country, plan.discipline, plan.division).selection))}. Main membership does not guarantee Games qualification.</p></details>`;
}
const FED90_MARKUP = federationMarkup82;
federationMarkup82 = function (rider, horses) {
  if (!CAREER_COUNTRIES[rider.country])
    return "<section><p>Select a sporting nationality before applying.</p></section>";
  let html = FED90_MARKUP(rider, horses);
  if (!federationEnabled()) return html;
  const age = careerAge(rider, pastureCalendarHour(), true);
  if (age !== null && age < 12)
    html = html.replace(
      '<div class="shop-drawer-body">',
      '<div class="shop-drawer-body"><p>National-team eligibility begins at age 12. Your rider is currently ' +
        age +
        ".</p>",
    );
  if (!horses.length)
    html = html.replace(
      '<div class="shop-drawer-body">',
      '<div class="shop-drawer-body"><p>No eligible horse is currently registered for this selection.</p>',
    );
  const now = pastureCalendarHour(),
    applications = Object.values(federationState().applications).filter(
      (a) => a.riderId === rider.id,
    ),
    cards = applications
      .map((a) => {
        const plan = federationPlan(
          a.year,
          a.country,
          a.discipline,
          a.division,
        );
        if (!plan) return "";
        const season = federationState().seasons[plan.id];
        return `<article class="box"><h3>${csEscape(CAREER_COUNTRIES[a.country][0])} · ${csEscape(CAREER_AGE_DIVISIONS[a.division].label)} · ${csEscape(CAREER_DISCIPLINE_LABELS[a.discipline])}</h3>${federation90Scorecard(plan, a, now)}${season ? "<details><summary>Current candidates and squad changes</summary>" + (season.members || []).map((m) => "<p>#" + m.rank + " " + csEscape(m.riderName) + " / " + csEscape(m.horseName) + " · " + m.score.toFixed(1) + " · " + csEscape(m.status) + "</p>").join("") + (season.history || []).map((h) => "<p>" + csEscape(pastureDateLabel(h.hour)) + " · " + csEscape(h.from || "Applicant") + " → " + csEscape(h.to || "Unselected") + " · " + csEscape(h.reason) + "</p>").join("") + "</details>" : ""}</article>`;
      })
      .join("");
  const end = html.lastIndexOf("</div></details>");
  const section = `<section data-federation-evaluations>${cards}<p>Development and Reserve: six shared development/team preparation cups per year. Main: six Nations Preparation Cups. Ordinary shows remain available. Squad reviews occur after both trials and in months 9 and 12; medical vacancies are reviewed before relevant team events.</p></section>`;
  return end < 0
    ? html + section
    : html.slice(0, end) + section + html.slice(end);
};

const FED90_APPLY = federationApply;
federationApply = function (...args) {
  const result = FED90_APPLY(...args);
  if (result.ok)
    result.application.trialIds90 = args[0].trials.map((t) => t.id);
  return result;
};
let federation90RenderContext = null;
const FED90_CONTEXT = federation90Context;
federation90Context = function (plan, hour) {
  if (!federation90RenderContext || federation90RenderContext.hour !== hour)
    return FED90_CONTEXT(plan, hour);
  const ctx = federation90RenderContext;
  ctx.boards ||= careerComputeBoards(hour + 1);
  const key = careerBoardKey(
    plan.division === "senior" ? "national" : "youth-national",
    plan.discipline,
    plan.division === "senior"
      ? plan.country
      : plan.division + "|" + plan.country,
  );
  return {
    ranking: new Map((ctx.boards[key] || []).map((r) => [r.id, r.rank])),
    rankingHour: hour,
  };
};
const FED90_RENDER = federationMarkup82;
federationMarkup82 = function (...args) {
  const previous = federation90RenderContext;
  federation90RenderContext = { hour: pastureCalendarHour() };
  try {
    return FED90_RENDER(...args);
  } finally {
    federation90RenderContext = previous;
  }
};
function federationSeries90() {
  if (!federationEnabled()) return [];
  const rows = [];
  for (const country of federationCountries())
    for (const plan of federationPlans(app.year, country)) {
      const events = federation90ProgramEvents(plan);
      for (const event of [events[0], events[1], events[2]]) {
        CAREER_SERIES_LABELS.set(
          event.series,
          CAREER_COUNTRIES[country][0] +
            " " +
            CAREER_AGE_DIVISIONS[plan.division].label +
            " " +
            (event.squadRoles.includes("development")
              ? "Development / Reserve"
              : "Main Team") +
            " · " +
            CAREER_DISCIPLINE_LABELS[plan.discipline],
        );
        rows.push(event);
      }
    }
  return rows;
}
const FED90_TEAMS = careerTeamScores;
careerTeamScores = function (event, ...args) {
  const teams = FED90_TEAMS(event, ...args);
  if (event.federationProgram)
    for (const team of teams)
      team.points = careerPoints(
        event,
        { placing: team.placing, score: team.score / event.count },
        teams.length * event.team,
      );
  return teams;
};
const FED90_BOARD = careerRankingRows;
careerRankingRows = function (
  type,
  discipline,
  filter = "",
  hour = careerState().rankingHour ?? pastureCalendarHour(),
  ...args
) {
  if (
    ["team", "tour"].includes(type) &&
    String(filter).startsWith("federation-")
  ) {
    const key = careerBoardKey(type, discipline, filter),
      rows = careerComputeBoards(hour + 1)[key] || [];
    careerState().rankings[key] = rows;
    return rows;
  }
  return FED90_BOARD(type, discipline, filter, hour, ...args);
};
const FED90_FIELD = careerNpcField;
careerNpcField = function (event, limit, player = null, selectionPool = false) {
  const field = FED90_FIELD(event, limit, player, selectionPool);
  if (
    event.federationProgram ||
    event.allocated ||
    !(event.team || event.games || event.major)
  )
    return field;
  const active = new Set(federationCountries());
  return field.flatMap((pair) => {
    if (selectionPool && !active.has(pair.rider.country)) return [pair];
    const season = federation90EnsureSeason(event, pair.rider.country),
      member = season?.members.find((m) => m.riderId === pair.rider.id),
      horse = member && federation90Horse(member.horseId);
    if (
      !season &&
      event.at <
        federationPlan(
          event.date.year,
          pair.rider.country,
          event.discipline,
          event.division,
        )?.selection
    )
      return [pair];
    if (
      !horse ||
      FEDERATION_ELIGIBILITY(event, pair.rider, horse, { npc: true }) ||
      !federationNomination(event, pair.rider, horse)
    )
      return [];
    return [
      {
        ...pair,
        horse,
        score:
          (pair.rider.skill + npc85HorseSkill(horse, event.discipline)) / 2,
      },
    ];
  });
};
const FED90_DETAILS = careerLeaderboardDetails;
careerLeaderboardDetails = function (row, type, ...args) {
  let html = FED90_DETAILS(row, type, ...args);
  const id = row.riderId || row.id,
    history = Object.values(app.career?.federations?.seasons || {}).filter(
      (s) => s.members.some((m) => m.riderId === id),
    );
  if (history.length)
    html +=
      "<details><summary>National team career</summary>" +
      history
        .map((s) => {
          const m = s.members.find((m) => m.riderId === id);
          return (
            "<p>Year " +
            s.year +
            " · " +
            csEscape(CAREER_COUNTRIES[s.country][0]) +
            " · " +
            csEscape(CAREER_AGE_DIVISIONS[s.division].label) +
            " · " +
            csEscape(m.status) +
            "</p>" +
            (s.history || [])
              .filter((h) => h.riderId === id)
              .map(
                (h) =>
                  "<p>" +
                  csEscape(pastureDateLabel(h.hour)) +
                  " · " +
                  csEscape(h.from || "Applicant") +
                  " → " +
                  csEscape(h.to || "Unselected") +
                  "</p>",
              )
              .join("")
          );
        })
        .join("") +
      "</details>";
  return html;
};

function federation90MemberIssue(member, season, hour) {
  const rider = app.riderRealism?.profiles.some((p) => p.id === member.riderId)
      ? federationPlayer({ riderId: member.riderId })
      : npc85Registry().riders.get(member.riderId),
    horse = federation90Horse(member.horseId);
  return (
    !rider ||
    rider.country !== season.country ||
    !careerDivisions(rider, hour).includes(season.division) ||
    federation90Health(horse) ||
    federation90PartnerIssue(rider, horse)
  );
}

const FED90_RESOLVE = careerResolveNpcMeet;
careerResolveNpcMeet = function (event) {
  if (
    event.federationProgram &&
    !event.programCountries.some((country) =>
      federation90Season(event, { country }),
    )
  ) {
    const plan = federationPlan(
      event.date.year,
      event.federation,
      event.discipline,
      event.division,
    );
    if (event.at < plan.selection) {
      federationState().cancelledProgramEvents90 ||= {};
      federationState().cancelledProgramEvents90[event.id] = {
        hour: event.at,
        reason:
          "No active nominated squad exists yet in this initial selection season.",
      };
      return null;
    }
  }
  return FED90_RESOLVE(event);
};

const FED90_ENTER_PROGRAM = careerEnter;
careerEnter = function (event, ...args) {
  const result = FED90_ENTER_PROGRAM(event, ...args);
  if (result.ok && event.federationProgram)
    result.show.federationSelection = {
      country: careerRider().country,
      role: federation90Role(
        federationNomination(event, careerRider(), args[0]),
      ),
    };
  return result;
};
const FED90_SHOW_RESULT = showResultMarkup;
showResultMarkup = function (show) {
  let html = FED90_SHOW_RESULT(show);
  if (show.eventSnapshot?.federationProgram && !show.eventSnapshot.team) {
    const meet = app.career?.meets[show.eventId],
      row = meet?.results.find((r) => r.player);
    if (row) {
      const credit = careerPointCredits(meet, row).find(
        (c) => c.type === "tour",
      );
      html +=
        "<p data-federation-recognition>Represented " +
        csEscape(CAREER_COUNTRIES[row.country]?.[0] || row.country) +
        " · " +
        (credit?.points || 0) +
        " development-series points from this recorded result.</p>";
    }
  }
  return html;
};
function federationDeclineTrial(planId, trialId, rider = careerRider()) {
  const plan = federationPlans(app.year, rider.country).find(
      (p) => p.id === planId,
    ),
    application =
      plan && federationState().applications[planId + ":" + rider.id];
  if (
    !application ||
    !plan.trials.some((t) => t.id === trialId && t.at > pastureCalendarHour())
  )
    return {
      ok: false,
      message: "No pending future trial for this application.",
    };
  application.declinedTrials90 ||= [];
  if (!application.declinedTrials90.includes(trialId)) {
    application.declinedTrials90.push(trialId);
    application.history.push({
      status:
        "Trial " +
        plan.trials.find((t) => t.id === trialId).federationTrialRound +
        " declined",
      hour: pastureCalendarHour(),
    });
  }
  return { ok: true };
}
function timeAdvanceDecision90(unit) {
  const now = pastureCalendarHour(),
    target =
      unit === "month"
        ? pastureCalendarHour(app.year, app.month + 1, 1, 0)
        : now + (unit === "day" ? 24 : 1),
    show = app.activeShow;
  if (
    show?.eventSnapshot?.careerEvent &&
    !["complete", "results"].includes(show.stage) &&
    show.eventSnapshot.at <= target
  )
    return "Attend or withdraw the registered competition before advancing past its start.";
  if (!federationEnabled()) return "";
  const rider = careerRider();
  for (const plan of federationPlans(app.year, rider.country)) {
    const a = federationState().applications[plan.id + ":" + rider.id];
    if (!a || !["Trial Invited", "Trial Completed"].includes(a.status))
      continue;
    for (const trial of plan.trials)
      if (
        trial.at > now &&
        trial.at <= target &&
        !a.declinedTrials90?.includes(trial.id) &&
        !careerState().meets[trial.id]?.results.some(
          (r) => r.riderId === rider.id && r.horseId === a.horseId,
        )
      )
        return (
          "Register, complete or explicitly decline selection trial " +
          trial.federationTrialRound +
          " before advancing past its date."
        );
  }
  return "";
}
const FED90_BIND = show82BindFederation;
show82BindFederation = function (panel, ...args) {
  FED90_BIND(panel, ...args);
  panel.querySelectorAll("[data-federation-decline-trial]").forEach(
    (button) =>
      (button.onclick = () => {
        const result = federationDeclineTrial(
          button.dataset.federationDeclineTrial,
          button.dataset.federationTrialId,
        );
        if (!result.ok) {
          panel.querySelector("[data-federation-status]").textContent =
            result.message;
          return;
        }
        saveGame(false);
        renderCalendar();
      }),
  );
};
const FED90_WITHDRAW_NOMINATION = federationWithdrawNomination;
federationWithdrawNomination = function (eventId, ...args) {
  if (
    app.activeShow?.eventId === eventId &&
    !["return", "complete"].includes(app.activeShow.stage)
  )
    return {
      ok: false,
      message:
        "Withdraw the registered show through the competition office first.",
    };
  return FED90_WITHDRAW_NOMINATION(eventId, ...args);
};
const FED90_LEAVE = showLeaveBeforeWarmup;
showLeaveBeforeWarmup = function (show, ...args) {
  const result = FED90_LEAVE(show, ...args);
  if (result && show.eventSnapshot?.allowSubstitutions)
    federationWithdrawNomination(show.eventId);
  return result;
};
const FED90_BIND_WITHDRAW = show82BindFederation;
show82BindFederation = function (panel, ...args) {
  FED90_BIND_WITHDRAW(panel, ...args);
  panel.querySelectorAll("[data-federation-withdraw-nomination]").forEach(
    (button) =>
      (button.onclick = () => {
        const result = federationWithdrawNomination(
          button.dataset.federationWithdrawNomination,
        );
        if (!result.ok) {
          panel.querySelector("[data-federation-status]").textContent =
            result.message;
          return;
        }
        saveGame(false);
        renderCalendar();
      }),
  );
};
// Candidate batches share one fresh ledger calculation per decision timestamp, never across results.
let federation90BoardBatch = null;
function federation90WithBoards(action) {
  if (federation90BoardBatch) return action();
  federation90BoardBatch = new Map();
  try {
    return action();
  } finally {
    federation90BoardBatch = null;
  }
}
const FED90_BATCH_CONTEXT = federation90Context;
federation90Context = function (plan, hour) {
  if (!federation90BoardBatch) return FED90_BATCH_CONTEXT(plan, hour);
  let boards = federation90BoardBatch.get(hour);
  if (!boards) {
    boards = careerComputeBoards(hour + 1);
    federation90BoardBatch.set(hour, boards);
  }
  const key = careerBoardKey(
    plan.division === "senior" ? "national" : "youth-national",
    plan.discipline,
    plan.division === "senior"
      ? plan.country
      : plan.division + "|" + plan.country,
  );
  return {
    ranking: new Map((boards[key] || []).map((r) => [r.id, r.rank])),
    rankingHour: hour,
  };
};
const FED90_BATCH_ADVANCE = federationAdvance;
federationAdvance = function (...args) {
  return federation90WithBoards(() => FED90_BATCH_ADVANCE(...args));
};
const FED90_BATCH_FIELD = careerNpcField;
careerNpcField = function (...args) {
  return federation90WithBoards(() => FED90_BATCH_FIELD(...args));
};

function federation90TrialMeet(plan, event) {
  if (!federation90BoardBatch)
    return Object.values(careerState().meets).find(
      (m) =>
        m.federationTrial === plan.id &&
        m.federationTrialRound === event.federationTrialRound,
    );
  if (!federation90BoardBatch.trialMeets) {
    const index = new Map();
    for (const meet of Object.values(careerState().meets))
      if (meet.federationTrial && meet.federationTrialRound)
        index.set(meet.federationTrial + "|" + meet.federationTrialRound, meet);
    federation90BoardBatch.trialMeets = index;
  }
  return federation90BoardBatch.trialMeets.get(
    plan.id + "|" + event.federationTrialRound,
  );
}
