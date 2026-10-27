# Soundness, therapy, history and showjumping update

Implemented and verified 26 October 2026 on main commit c5645f1 (including the recovery and performance updates).

## Soundness: existing statistic repaired

The legacy field `soundnessYears` was a real decimal-year value: the original code subtracted fractional years, rounded with `toFixed(1)`, and described it as years. Thus a legacy 7.5 means approximately 90 months, not seven years five months. Migration preserves the original value, interpretation, version and game time in `soundnessMigration`. Existing horses are not rerolled. Existing resolved/persistent clinical consequences are marked as already included in the legacy estimate, avoiding a second retrospective deduction.

`soundnessRemainingMonths` is the single authoritative nonnegative integer. The old `soundnessYears` property is a compatibility getter/setter backed by those same months, preserving older code and serialized saves; it is not another independently updated stat. Profile, sale and vet displays use years.months. 84 → 83 months displays 7.0 → 6.11.

One shared elapsed-hour cursor (`lastSoundnessProcessedAt`) accumulates complete days and residual hours. `soundnessDayAccumulator` retains incomplete thirty-day periods and `soundnessHourRemainder` retains partial days. Every thirty complete days removes one month. Hour/day/month/mixed advancement and chronological simulation agree. Duplicate processing and saving do not age a horse again. The former workload-based wear and extra year-boundary subtraction no longer apply. Zero longevity alone does not impose injury, pain, automatic retirement or a bond penalty; existing clinical and ordinary gameplay rules still govern activity.

Only new eligible healthy riding horses aged 3–12 receive the requested 30/35/25/10 distribution across 7–8 / 9–10 / 11–12 / 13–15 years. Older new horses receive a conservative cap of max(1, 22−age) years; this never increases their prior estimate. New significant-history/serious market profiles retain lower estimates. Genetic/newborn adjustments remain compatible. Existing horses retain their migrated estimates.

New documented lasting musculoskeletal/hoof consequences apply once: six months for moderate residual/persistent effects, twelve for major effects, twenty-four for fracture/rupture effects. Existing generation adjustments and legacy historical effects are not charged again. Scratches, temporary concerns and full recoveries do not cause an automatic permanent longevity deduction.

## Fourteen-day therapy

Vet → Soundness & Longevity Therapy provides program information, eligibility, assessment, pricing, booking, daily interactions, contextual questions and reviews. An assessment costs $180; the package costs $980, exactly $1,160 total. Routine sessions and scheduled reviews are included. Receipts are real ledger entries. Optional imaging remains separate. An additional $65 day requires a specific veterinary prescription and reschedules a missed opportunity.

The horse must be alive, owned (not a loaned lesson horse), sufficiently stable, under twenty, and able to finish before the game's year-boundary twentieth birthday. Active emergencies and unstable major conditions take priority. Assessment uses actual physical/soundness findings without inventing diagnoses or curing conditions. Paid existing examination receipts are preserved when findings are reused. Death or ownership transfer closes an active course without a benefit or refund and retains its paid service records.

Day one is the professional assessment. Days two through thirteen offer twelve session opportunities. Each requires a comfort check, recommendation review, approved action/region/intensity, response and explicit completion. Actual movement grade, workload, response comparison and session quality are recorded. Acute/damaged structures use observation or veterinary recovery support rather than ordinary massage. Moderate intensity appears only when the plan permits it; painful responses pause the course. Clinical pauses reschedule rather than create negligent missed-care records.

Day seven has a professional review. Day fourteen requires a final review; there is no immediate or automatic bonus. A full eligible first course uses +1/+2/+3/+4 years at 25/35/25/15%. The seeded result is stored once. Eleven–twelve successful sessions permit the full table; nine–ten cap at two years; seven–eight cap at one; zero–six give no bonus. Missing the week-one review also limits benefit to one year. Repeat courses need a fresh assessment and at least 360 game days from the prior course start. At most two benefit-awarding courses are allowed, repeat gain is capped at two years, and lifetime therapy benefit is capped at six years. Turning twenty prevents a bonus while preserving paid service/course records.

Therapy never resolves another medical condition or alters its recovery outcome. It does not disable training. Suitable easy activity adds no therapy disruption risk; excessive activity/demanding flatwork/jumping/competition use 5/12/25/35% fictional adherence-disruption opportunities, once per session. Where an active injury supplies a clinical consequence, therapy derives the adherence consequence from that event rather than stacking another injury roll. The original Training 2.0 and clinical consequence engines remain responsible for their own outcomes.

All fourteen daily event texts and the thirty requested narrative-library lines are included. Visible narratives use recorded state: for example, day thirteen does not claim the final session is complete before the player actually completes it.

## History and receipts

Routine hoof, farrier, observation, findings, care and therapy displays show the latest five ordinary entries in chronological order. Clear/select controls affect display preferences. Important clinical records are archived from that display, not destroyed. Filters include Latest Five, Important Only, Observations, Diagnoses, Treatments, Follow-Ups and Archived. Active diagnoses, previous significant conditions, prescriptions, hospitalization, restrictions, outcomes and future PPE truth remain intact.

Receipt controls support viewed/all/selected clearing and cancellation. Bulk operations require an explicit Confirm Clear. Inventory, balance, paid transactions, idempotence operations, hospital state and underlying receipt/financial records remain unchanged. Cleared/archive preferences persist through actual saving and loading.

## Showjumping: user clarification applied

The user explicitly selected **one chance per whole round**, rather than per jump. Neutral whole-round pole-event baselines are 30% at 0.70–0.90 m, 40% at 1.00–1.20 m and 45% at 1.30–1.80 m. Risk is adjusted invisibly by normalized personality ×15%, actual tack-control signal ×15%, mood ×20%, and one seeded luck value from −3 to +3 percentage points, bounded to 1–95%.

For a pole-event round, the bounded count is one/two/three poles at 70/25/5%, limited by fence count. These are implementation balance values for the count conditional on the round event; they do not compound the base probability per jump. Automatic results use one plan. The competition RPG saves a single plan and distributes its planned poles across fences; a refused fence defers its planned pole to another fence without rerolling the probability. Refusal, fall, elimination and time-fault rules remain separate. Each fallen pole still adds four faults. Reopening a saved round/result cannot reroll its plan or luck.

## Verification

**301 checks passed:** 116 unit checks, 33 existing full-game integration checks, 12 new longevity/full-game checks and 140 original-system regression checks, using Node 24.22.1. New coverage includes the requested calendar examples, 720 hour skips, thirty day skips, month/mixed/chronological equivalence, year rollover, partial-hour save/load, generation and legacy preservation, clinical-effect idempotence, full-course real-clock save/load, exact charges, response safety, adherence/caps, archived clinical truth, unchanged financial state, 4,000 bonus samples and 45,000 neutral whole-round pole samples. Real RPG resolution verifies four faults per pole, no per-jump reroll, and refusal deferral; automatic and RPG-finalization paths are also covered.

Desktop browser end-to-end checks on isolated port 4175 verified assessment/booking ($50,000 → $48,840), all twelve daily interactions, the week-one review, final day-fourteen review (+2 years; 8.0 → 10.0), five visible therapy summaries, safe history clearing, bulk receipt confirmation without a balance change, and save/reload without another gain or charge. Advancing from day fourteen to the next month then displayed **9.11** after thirty total elapsed days—exactly one month lost. No console errors were recorded. The previous preview's stored progress was not reset or deleted.

A physical iPad/Safari session was not available; that device-specific check is not claimed. Controls reuse the existing responsive layout. Existing medical recovery, hospital care, PPE, sales, farrier, Training 2.0, equipment, pasture relationships, breeding, calendar, manual saves and quarterly backups passed their regression/integration checks.

Run `npm test` (or the equivalent Node commands in package.json). This package contains source and tests, not the isolated browser's test save data.
