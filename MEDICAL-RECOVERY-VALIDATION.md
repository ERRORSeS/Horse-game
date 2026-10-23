# Medical recovery rebuild — validation report

## Repair and migration

The freeze was caused by hospital authorization expiring while the condition retained a hospital state, combined with biological recovery being gated on successful care. Once care stopped, elapsed time continued but healing could stop. Care counters also lacked validation against the authorized interval. The reported 15th care day cannot be conclusively traced without the original save; the migration retains all records and separates valid covered days from records outside that interval.

The rebuilt daily engine evaluates each active condition once per canonical game day. Hospital care days, biological progress and elapsed days are separate. Professional care, home care, passive recovery and missing essential treatment affect the daily response. Required surgery, farrier work, dental work, medication and diagnosis-dependent investigations cannot be replaced by merely waiting.

Hospital courses now end in a recorded clinical assessment: transfer to rehabilitation, or an explicit extension recommendation with a reason. Extra care requires authorization. Follow-up examinations compare real clinical findings; opening advice neither examines nor rerolls the horse. Remaining recovery estimates follow actual progress and setbacks.

Old expired stays are reconciled at the saved medical date. The repair preserves diagnoses, actual saved progress, historical elapsed time and original care evidence. It does not invent 159 days of treatment, retroactively bill the player, or declare the horse healed. Uncertain historical responsibility is archived rather than falsely charged to the player. A real reassessment clears the reconciliation flag.

## Model and compatibility

The 47 requested conditions have their specified daily response tables and five exact stage-aware quotes. The three additional existing catalog entries retain their original recovery durations, final outcomes and narratives, using the soft-tissue daily response fallback. The seeded daily choice is mutually exclusive: Improved, Stable, Mild setback or Significant worsening. Progress increments are normalized for expected setback losses, keeping existing nominal recovery durations meaningful without changing daily response probabilities. Missing care shifts response probabilities; essential untreated conditions cannot gain structural healing. Chronic and investigation cases have explicit management or underlying-cause endpoints.

An immutable baseline fixture confirms unchanged illness incidence weights, severity weights, recurrence probabilities and final outcome tables for all 50 catalog conditions. The diagnostic selection engine and training RPG remain intact. Critical mortality continues through its existing fixed episode decision, after five effective-care days where applicable; it is not independently rerolled each day. Training medical events remain separate from monthly incidence.

Hour/day/month processing shares the existing canonical medical day engine. The game itself uses its established 30-day calendar months; this update adds no separate monthly healing formula. Save/load and three-month backup regressions pass. Player workload choices, shared interactive/Quick/Auto Training consequences, and external competition rules remain covered by regressions.

## Validation

- `npm test`: 87 core tests, integration checks and 10 regression suites (140 regression cases). Final command exited successfully; full log supplied separately.
- End-to-end population run: 1,000 seeded episodes for every actual catalog condition, 50,000 episodes total, zero unexplained stalls/errors. The driver purchases supplies, fulfills prescriptions, authorizes services and hospital extensions, completes care and requests follow-ups.
- Population fixtures begin with the diagnosis established; specialist cases include the relevant prior assessment/imaging records. This validates post-diagnosis recovery, not random diagnostic discovery.
- Responsive browser checks at 390×844 and 768×1024: no horizontal overflow; compact questions and readable clinical cards. Reproduction remains below care.
- Representative legacy save: 173 elapsed days, 14 authorized days, 15 recorded care days; no inferred charges or healing. Requested follow-up transferred to rehabilitation; next day changed progress from 27% to 29% while money stayed $49,935. Manual save succeeded and reload retained the calendar and balance. Automated tests verify exact medical state persistence.
- Browser error log was empty at the check. Physical iPad/iPhone hardware testing was waived by the user.

## Measured population outcomes

Durations below are days to a **nonfatal documented endpoint** (full recovery, residual/persistent management, referral or underlying-cause management). They are not guaranteed healing dates or return-to-sport times. Daily outcome counts also include treatment transitions and incomplete-care states. Severity-stratified final outcome counts and all four daily outcome totals are in the JSON. Deaths are episode endpoints from the preserved mortality logic.

| Condition | Nonfatal endpoint days, median (P10–P90) | Full | Residual | Persistent | Death | Other endpoint | Errors |
|---|---:|---:|---:|---:|---:|---:|---:|
| scratch | 4 (2–7) | 985 | 15 | 0 | 0 | 0 | 0 |
| cut | 8 (5–14) | 987 | 10 | 3 | 0 | 0 | 0 |
| rub | 9 (5–14) | 976 | 0 | 24 | 0 | 0 | 0 |
| dermatitis | 12 (8–24) | 974 | 10 | 16 | 0 | 0 | 0 |
| skin-infection | 14 (8–28) | 954 | 32 | 14 | 0 | 0 | 0 |
| laceration | 48 (25–123) | 793 | 145 | 62 | 0 | 0 | 0 |
| tender-hoof | 6 (2–16) | 965 | 30 | 5 | 0 | 0 | 0 |
| lost-shoe | 1 (1–1) | 981 | 19 | 0 | 0 | 0 | 0 |
| abscess | 14 (7–26) | 945 | 41 | 14 | 0 | 0 | 0 |
| bruise | 9 (5–19) | 961 | 32 | 7 | 0 | 0 | 0 |
| imbalance | 20 (9–53) | 953 | 37 | 10 | 0 | 0 | 0 |
| thrush | 13 (8–20) | 955 | 39 | 6 | 0 | 0 | 0 |
| soreness | 4 (2–7) | 992 | 4 | 4 | 0 | 0 | 0 |
| strain | 35 (20–67) | 936 | 53 | 11 | 0 | 0 | 0 |
| tendon | 226 (124–351) | 672 | 277 | 51 | 0 | 0 | 0 |
| suspensory | 258 (128–404) | 549 | 357 | 94 | 0 | 0 | 0 |
| synovitis | 24 (11–68) | 750 | 219 | 31 | 0 | 0 | 0 |
| back | 21 (10–61) | 855 | 119 | 26 | 0 | 0 | 0 |
| djd | 39 (20–60) | 0 | 0 | 1000 | 0 | 0 | 0 |
| orthopedic | 236 (156–319) | 398 | 602 | 0 | 0 | 0 | 0 |
| respiratory | 14 (9–27) | 978 | 18 | 4 | 0 | 0 | 0 |
| influenza | 30 (17–51) | 935 | 55 | 10 | 0 | 0 | 0 |
| ehv | 35 (20–49) | 957 | 31 | 12 | 0 | 0 | 0 |
| strangles | 51 (31–80) | 891 | 85 | 24 | 0 | 0 | 0 |
| asthma | 25 (10–40) | 0 | 0 | 1000 | 0 | 0 | 0 |
| airway-irritation | 4 (1–10) | 997 | 0 | 3 | 0 | 0 | 0 |
| digestive-upset | 3 (1–6) | 996 | 0 | 4 | 0 | 0 | 0 |
| colic | 4 (1–9) | 942 | 43 | 3 | 0 | 12 | 0 |
| ulcers | 32 (22–46) | 917 | 49 | 34 | 0 | 0 | 0 |
| parasites | 14 (8–26) | 963 | 30 | 7 | 0 | 0 | 0 |
| digestive-illness | 37 (20–106) | 768 | 167 | 65 | 0 | 0 | 0 |
| dental | 3 (1–8) | 964 | 29 | 7 | 0 | 0 | 0 |
| eye | 5 (3–9) | 966 | 32 | 2 | 0 | 0 | 0 |
| cornea | 19 (9–53) | 803 | 147 | 50 | 0 | 0 | 0 |
| ear | 9 (4–24) | 975 | 22 | 3 | 0 | 0 | 0 |
| oral | 19 (10–40) | 914 | 65 | 21 | 0 | 0 | 0 |
| dehydration | 2 (1–5) | 997 | 0 | 3 | 0 | 0 | 0 |
| heat | 3 (1–13) | 953 | 43 | 4 | 0 | 0 | 0 |
| fatigue | 3 (1–6) | 997 | 0 | 3 | 0 | 0 | 0 |
| fever | 15 (10–28) | 0 | 0 | 0 | 0 | 1000 | 0 |
| weight-loss | 15 (10–27) | 0 | 0 | 0 | 0 | 1000 | 0 |
| age-related | 64 (39–95) | 0 | 0 | 1000 | 0 | 0 | 0 |
| contusion | 8 (4–12) | 1000 | 0 | 0 | 0 | 0 | 0 |
| abrasion | 8 (4–12) | 984 | 16 | 0 | 0 | 0 | 0 |
| tendon-rupture | 398 (290–520) | 101 | 453 | 313 | 133 | 0 | 0 |
| stable-fracture | 136 (79–252) | 544 | 363 | 79 | 14 | 0 | 0 |
| unstable-fracture | 350 (201–519) | 100 | 198 | 209 | 493 | 0 | 0 |
| impaction | 8 (3–14) | 823 | 138 | 0 | 5 | 34 | 0 |
| surgical-colic | 102 (67–140) | 580 | 216 | 0 | 204 | 0 | 0 |
| critical-colic | 125 (89–179) | 366 | 255 | 0 | 379 | 0 | 0 |

## Modified files

Runtime: `health-engine.js`, `medical-recovery.js`, `veterinary3-ui.js`, `index.html`. Tests: `tests/recovery-rebuild.test.cjs`, `tests/simulate-recovery.cjs`, `tests/fixtures/medical-probabilities-v3.json`, `tests/care-sales.test.cjs`, `tests/integration.test.cjs`, `tests/medical-realism.test.cjs`, `tests/veterinary3.test.cjs`, `package.json`.

Run the population validation with `npm run test:recovery-population` (defaults to 1,000 episodes per condition; `EPISODES` permits a smaller smoke run).

## Remaining limits

The exact original saved game was unavailable; migration was tested against a representative reconstruction of the reported state. The 50,000 episodes represent cooperative care, not every possible untreated/training/concurrent-condition combination. Randomized cohorts support regression confidence and balancing; they do not prove every seed. The three legacy-only catalog conditions use the documented daily-response fallback. Physical devices and Safari were not used.
