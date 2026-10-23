# Hospital treatment debugging report

## A. Root causes

The explicit-care change only delegated care when both hospitalized and specialistCare were true. Ordinary admissions therefore fell into the player-missed-task branch. Hospital care also validated player medicine and supplies, so paid professional care could not advance the actual condition. The UI used successful recovery days as its hospital day counter, making this failure look like a stopped calendar.

Confirmed follow-ups retained the initial diagnostic detection roll. A known diagnosis could consequently receive no useful follow-up findings. Follow-up snapshots and clinical stage transitions were missing. The elapsed game calendar was already advancing: no missing hour/day/month callback was found. Those paths were preserved.

## B. Files and functions

health-engine.js: hospitalRecord, hospitalDecision, ensure, careDay, completeCare, clinicalService, advance, examine and finish.
veterinary3-ui.js: hospital elapsed/completed counters, review/extension/discharge controls, hospital task visibility and preserved condition-panel expansion.
tests/veterinary3.test.cjs: admission, task ownership, expiry, authorization, discharge, migration, save/daily parity, professional outpatient care and transition idempotency regressions.
tests/medical-realism.test.cjs: professional wound-service expectation now recognizes the actual veterinarian-provided care day.

## C. Medical time

HorseHealth.advance is the single chronological medical processor. care-sales.js routes the existing pasture-hour boundary callback through it, and monthlyProgress reconciles the same processor after month advancement. csDay uses careSimulationHour during chronological simulation and the canonical pastureCalendarHour otherwise. Every crossed day uses healthProcessedDay; each successful care record also records recoveryAppliedDay. Hospital billing retains the existing horse/day ledger key, preserving one daily fee even with multiple concurrent conditions or a manually prepaid nursing day. No medication price, incidence, severity or terminal-outcome table was changed.

Hospital episodes separate admission day, elapsed days, expected interval, authorized coverage, successful care days, provider, review status, extensions and discharge day. Staff supply their own prescribed care; take-home supplies and prepared course units are not consumed again. Required specialist/farrier/emergency prerequisites remain genuine prerequisites to treatment success, not medical training locks.

## D. Verification

80 core tests pass. The real game integration checks pass, including hour/day/month processing, saved treatment, paid operations and quarterly autosaves. All 10 regression suites pass (140 regression cases), including the separately rerun management suite. Regression suite results are attached separately. An overlapping run hit the existing 180-second timeout in management and pasture; management passed independently and the remaining suites were rerun serially with a longer external timeout. The product test runner timeout was not changed.

Browser verification used a disposable localhost save: ordinary admission at Day 0; Skip Day changed it to Day 1 with one completed professional day and exactly $150 charged; reload preserved progress; a $65 follow-up recognized progress and produced Early Recovery; discharge produced Home Rehabilitation and home-treatment controls; reload preserved discharge. No JavaScript errors were observed during those checks.

## E. Save repair

Existing episodes are enriched from their saved admission/operation/plan dates without resetting horse IDs, diagnoses, severity, progress, prescriptions, paid operations or plans. Successful historic hospital care acquires provider metadata. False missed-player entries within the known hospital interval are superseded with the prior record retained. No retrospective treatment benefit or bill is invented. Existing applied care is marked to prevent replay. Expired old stays require a real review and authorization rather than silently renewing charges.

Coverage stops at its authorized end. A follow-up is required before the player can extend it. Discharge changes ownership to home care from the discharge date; hospital and home care records remain distinct and each benefit applies once. Resolution closes a hospital episode; the original critical-care survival and terminal-outcome pathways remain intact.

## F. Limits

Desktop browser workflows were verified. Physical iPad/mobile hardware was not available; earlier responsive spot-checks do not constitute physical-device certification. The 73 numbered acceptance items are covered in grouped unit/integration/regression checks, not 73 separate manual browser scripts. Publication status is recorded in Git history.

## Responsive visual verification

Browser viewport checks at 390×844 and 768×1024: no horizontal page overflow, readable workload answers and wrapped controls. Physical-device testing was replaced with visual checks at the user’s request.
