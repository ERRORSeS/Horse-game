# Update 8.5 implementation and validation

## NPC careers and profiles

The previous ranking circuits created display-only identities and scores. They had no corresponding rider roster or horse record. Separately, ordinary NPC selection always preferred the strongest horse, and annual retirement discarded full horse records and created free replacements.

Circuits now score actual persistent riders and horses through the existing show scorer and result writer. World, horse and combination boards share the same circuit results. Every scoring circuit result carries real rider and horse IDs; nationality comes from the existing `rider.country` sporting federation. Barn and horse locations do not override it. Historical result countries remain unchanged.

Profiles show Current Horses and Former Horses, owner versus assigned rider, age, breed, schooling level, retirement status and recent results. Recovery searches player horses, sale/market/rescue pools, auction contracts, current and retired NPC rosters, archived horses and listings by ID. It restores actual recoverable links, canonicalizes duplicate saved references and flags genuinely missing horse records. Duplicate names are audited without merging identities; duplicate rider IDs are flagged.

Selection considers schooling suitability, horse age, medical restrictions, fatigue, recent starts and workload. It rotates eligible horses rather than always choosing the strongest. Classes with an explicit `maxHorsesPerRider` can produce separate horse results, while rider and horse booking conflicts still apply. Allocated schoolmasters are retained as actual event-pool records.

NPCs have finite persistent funds. Monthly market decisions consider real available listings, price, discipline, schooling, age and roster need. NPC purchases use the existing sale listing and ownership ledger, debit the buyer, credit a known seller, move the same horse and preserve former partnerships and competition history. Player deliveries also update the selling NPC roster. Unsold NPC stock is withdrawn at listing expiry rather than receiving an invented anonymous owner. Retirement preserves the complete horse and prevents further sporting entries. Annual free replacement horses have been removed. Auctions and their rules are unchanged.

## Optional horse editor

Settings → Enable Horse Stat Editor adds Edit Stats to owned horse cards. It exposes all stored jumping/dressage technical fields (Eventing and Hunters continue using their existing shared skill calculations), riding attributes, learned behaviors, natural spookiness and temperament intensity, personality and existing traits, handling/legacy confidence/control/focus/fatigue fields, aid education and discipline potential. Trait exclusions remain enforced.

MAX ALL SKILLS & ATTRIBUTES writes technical skills to 100, riding attributes to 10, editable potential to 100, handling behavior to its existing 1,000 scale, aid education and controlability to 100, and legacy flat/jump confidence to 100. It leaves learned behaviors and natural temperament values unchanged. Explicit advanced bulk targets can edit those separately. Potential overrides survive breed-cap recalculation without changing inherited genes. Identity, old results, ownership, Bond and QOL are preserved. Edits use the normal save workflow and apply to subsequent gameplay.

## Riding time

The old pace values were +12%, −8% and −16%; incident allowance was multiplied together with travel time, and Interactive and Quick timing followed different paths. One helper now calculates moving time from route distance / speed × one style factor × the existing horse factor. Conservative is +5%, Balanced neutral, Competitive −4% and Aggressive −6%. A recorded refusal/run-out adds 6.4 seconds; recorded hesitation/rhythm loss adds 1.5 seconds; recorded drift adds 0.5 seconds. A rail alone adds faults without an invented travel delay. Existing selected approach-reset actions, environmental incidents and scoring remain meaningful. Result details show moving time, incident causes and final effort time. Aggressive main-round exertion is 1.2× normal, Conservative 0.9×.

The paired simulation uses the same horse, course, starting state, conditions and 500 seeds per style. It runs the actual Interactive resolver (NPC mode suppresses player learning and injury persistence). Clean subsets can differ because styles change technical risk. Full-round means below include incidents in completed rounds; eliminations are reported separately.

| Style | Clean mean / median | Completed mean | Technical error / effort | Refusal / effort | Energy / effort | Eliminations / 500 |
|---|---:|---:|---:|---:|---:|---:|
| Conservative | 58.12 / 58.12 s | 59.22 s | 3.99% | 2.80% | 0.875 | 17 |
| Balanced | 55.35 / 55.35 s | 56.48 s | 4.87% | 2.80% | 0.972 | 17 |
| Competitive | 53.14 / 53.14 s | 54.27 s | 5.48% | 2.80% | 1.069 | 17 |
| Aggressive | 52.03 / 52.03 s | 53.17 s | 6.59% | 2.80% | 1.166 | 17 |

Refusal rates are equal in this controlled sample because learned refusal propensity is unchanged by style. Technical error risk and energy use increase with faster styles. The timing test also forces identical clean efforts and checks the exact factors, confirms that incident delays can outweigh a faster pace, and reconciles logged time with actual scoring.

## Horse Manager

Barn → Staff · Horse Manager supports hiring/dismissal and assignment to the current barn. The wage is $120 per game month, paid through the existing economy ledger. Insufficient funds pause duties and generate an activity log entry. Four independent switches control veterinary checks, farrier appointments, treatment and balanced training; all default OFF.

The manager calls the real examination, farrier, prescribed medication, supply, clinical-service and daily-care APIs. It does not invent diagnoses, free treatment or healing. Existing clinical prerequisites and costs still apply. Follow-up dates and once-only task keys prevent repeated appointments and charges. Logs retain successful and unresolved tasks.

Balanced training selects eligible existing exercises dynamically using weaker relevant skills relative to potential, recent exercise history, age, intended discipline and deterministic variation. It respects medical advice, fatigue, Energy where the schema supplies it, previous real sessions and current training reservations. One manager starts at most one actual Quick session per hour, within working hours. It never fabricates player choices or grants blanket daily skill increases. Care and training run from the existing hourly simulation, including day/month skips.

## Jumping calendar

The update varies ordinary development fixtures and fills gaps without replacing established competition IDs or changing configured championship heights. Ordinary calendar targets are eight classes per month per youth division and nine for Seniors/Open, across disciplines. Ordinary jumping offerings span:

| Division | Jumping range | Ordinary classes/month | Ordinary jumping classes/year |
|---|---:|---:|---:|
| kids | 0.30–1.05 m | 8 | 33 |
| prechildren | 0.40–1.10 m | 8 | 33 |
| children | 0.50–1.30 m | 8 | 33 |
| pony | 0.50–1.35 m | 8 | 33 |
| junior | 0.70–1.40 m | 8 | 36 |
| young | 0.80–1.50 m | 8 | 33 |
| u25 | 0.90–1.60 m | 8 | 33 |
| senior | 0.50–1.60 + existing elite classes m | 9 | 45 |

Exact annual counts by height (all ordinary jumping fixtures):

- **kids**: 0.30 m × 2, 0.40 m × 3, 0.50 m × 3, 0.60 m × 6, 0.70 m × 7, 0.80 m × 5, 0.90 m × 3, 1.00 m × 3, 1.05 m × 1.
- **prechildren**: 0.40 m × 4, 0.50 m × 4, 0.60 m × 4, 0.70 m × 4, 0.80 m × 5, 0.90 m × 3, 1.00 m × 3, 1.05 m × 3, 1.10 m × 3.
- **children**: 0.50 m × 4, 0.60 m × 4, 0.70 m × 4, 0.80 m × 4, 0.90 m × 5, 1.00 m × 3, 1.10 m × 3, 1.20 m × 3, 1.30 m × 3.
- **pony**: 0.50 m × 3, 0.60 m × 3, 0.70 m × 3, 0.80 m × 7, 0.90 m × 2, 1.00 m × 7, 1.10 m × 2, 1.20 m × 2, 1.30 m × 2, 1.35 m × 2.
- **junior**: 0.70 m × 3, 0.80 m × 3, 0.90 m × 5, 1.00 m × 6, 1.10 m × 7, 1.20 m × 8, 1.30 m × 2, 1.40 m × 2.
- **young**: 0.80 m × 4, 0.90 m × 4, 1.00 m × 4, 1.10 m × 6, 1.20 m × 4, 1.30 m × 4, 1.40 m × 4, 1.50 m × 3.
- **u25**: 0.90 m × 4, 1.00 m × 4, 1.10 m × 4, 1.20 m × 6, 1.30 m × 4, 1.40 m × 4, 1.50 m × 4, 1.60 m × 3.
- **senior**: 0.50 m × 4, 0.60 m × 4, 0.70 m × 5, 0.80 m × 5, 0.90 m × 4, 1.00 m × 3, 1.10 m × 4, 1.20 m × 4, 1.30 m × 3, 1.40 m × 3, 1.50 m × 3, 1.60 m × 3.

New heights use compatible legacy level indices; the established `SHOW_LEVELS` order is unchanged. New custom-show height options use the same catalog. Ordinary developmental availability is independent of rider experience labels; age, schooling, medical, horse-age, pony measurement and event-specific qualification rules still apply. Existing elite classes and championship rules remain in place.

## Save migration and performance

New saves and youth cohorts initialize the same ownership metadata as migrated saves. Reload repairs shared references by ID, preserves full retired horses, restores manager employment/toggles and the editor setting, and retains potential overrides. Unrecoverable historical horses are diagnosed internally without fabricated replacement history. Old display-only circuit snapshots and identities are archived explicitly. Genuine legacy earned standings lacking recoverable source rows retain a marked, expiring snapshot; new points require actual results. Repeated views do not award points or reroll results.

Registry, roster and result lookups are cached. Circuit meets are identified by board/week so a weekly refresh does not duplicate prior rounds. World/horse/combination boards reuse actual meets. Background board creation is lazy; watched boards refresh every seven days. Visiting every federation/category can substantially enlarge the persistent population and save. This is a real cost of replacing synthetic score rows with full identities and histories.

The three-sample browser comparison used the parent revision and the same seeded starting state. Median week advance: 994.6 → 1028.7 ms. First Kids national board: 2.7 → 93.5 ms. 100 cached views: 0.4 ms. Save size in this scenario: 9,622,868 → 13,100,923 bytes.

These are informational local measurements, not universal speed guarantees. The new first-view work and extra save data are expected. No weekly simulation slowdown was observed in this sample.

## Validation

- `tests/update85.test.cjs`: 15 grouped acceptance checks passed, covering editor/gameplay/reload invariants, recovery without invented IDs, rotation/retirement/conflicts, finite funded transfers, nationality/history, all height ranges and monthly density, medical costs and independent toggles, actual training, skip equivalence, player delivery/expiry, separate multi-horse starts and actual vet appointments.
- `tests/update85-style-simulation.cjs`: 2,000 paired style rounds and exact time-log reconciliation.
- `tests/update85-browser.cjs`: real Chromium clicks for Settings/editor Max All, manager hiring/toggle, a Kids national horse profile, no page errors.
- Medical/save engine suite: 124 passed, zero failed.
- Career-life simulations: age 17 completed 89 entries / 3 national-team starts; age 22 completed 77 entries / 7 national-team starts. Both reached the Games and retained trial invitations through reload. These are best-case reachability simulations with scripted skilled rides, not a probability of qualifying in ordinary play.
- Exhaustive ranking checks passed for every selectable category and all 74 federations in all four disciplines, with at least 24 scoring competitors. Earned points and deterministic weekly form passed; the weekly publication/reload follow-up passed after updating its obsolete assumption that every row must be a synthetic circuit row.
- Broad regression checks were run in resumable groups after a workspace restart interrupted the original processes. One pre-existing failure was reproduced on unchanged main (`5208021`): `tests/breed-schooling-grooming.test.cjs` expects every discipline of an Elite adult auction horse to avoid the low band, and fails on an 8-year-old at dressage Level One. Auction production rules were left unchanged. The remaining auction balance/potential tests and subsequent regression files passed, including long-play saves, Interactive/Quick competition, chance/time scoring and the seeded refusal/pole calibration. This means the complete `npm test` command is not reported as green.

The requested 92 acceptance points are covered by these grouped checks plus existing competition, behavior, Bond/QOL, medical, staff and save regressions. They are not presented as 92 independently named tests. No real-world competition regulations or lifelong injury rates are inferred from the controlled simulations.

Machine-readable measurements: [tests/fixtures/update85-results.json](tests/fixtures/update85-results.json).
