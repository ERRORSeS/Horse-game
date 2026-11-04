# Training Behavior 5.2 — implementation and validation

This patch builds on merged Training Behavior 5.1. It retains the existing training controls, profiles, skills, genetics, equipment, medical engine, weather choices and competition scoring.

## Per-jump refusal decisions

Interactive, Quick and scheduled Auto Training use the existing attempt pipeline. Each eligible attempt of the selected fence reads current avoidance, rider profile, actual height, confidence, effective trust and tension, then records one refusal/run-out decision with a unique attempt ID. The decision includes its score, chance, draw and final outcome. Recovery, configuration changes, reports and menus do not create jump decisions. A saved attempt cannot award skills or reroll its outcome through replay of an old session snapshot.

Configured courses retain their existing fence selection and player-controlled attempt/continue actions. Eight genuine attempts produce eight decisions, including repeated attempts at a refused fence. No extra fences or successful efforts are invented from opening an exercise.

Numerical Quick show rounds previously calculated their chance once before the fence loop. They now recalculate it inside that loop and store each fence's current score and draw. Completed round outcomes remain cached to prevent replay; existing refusal elimination limits still terminate the round. Interactive show rounds retain one outcome draw, use continuous percentages to preserve fractional probability, and reject duplicate resolution while awaiting advancement.

The 0–2 → 4% baseline, other interpolation bands, contextual modifiers and 1–95% clamp are unchanged. Unknown obstacle types add no probability. Fallen-pole planning remains the existing separate round-level model.

## Bond investigation and fix

The observed defect was in the Barn UI save path: Groom, Hand Graze and other Barn care handlers mutated the authoritative horse and rerendered the Barn without requesting a save. Care for all had the same omission. A reload before another saving action could discard those gains. The handlers now request the existing save mechanism after an activity; Care for all saves the completed batch once. Legacy RPG actions also save after resolving an existing Bond-eligible choice. Their feedback now reports actual bounded Bond/confidence deltas, including pending-event bonuses, without counting the bonus twice in the summary.

Reproduction and verification used Bond 40 on two horses. Groom remains +8, Hand Graze +5, Lunging Pen +3 and Trail its existing outcome-dependent reward. No new daily activity cap or reward was introduced. Existing 0–100 ordinary-horse clipping, legacy rescue compatibility, training limits and QOL calculations remain intact. Feedback reports the actual bounded Bond delta and omits a gain when already at the upper bound.

The monthly function already executes and preserves progress. Its existing +1 monthly base, +3 manual-training flag, show/care/farrier rewards and pain-related penalty remain unchanged; no daily passive reward was added. A persistent month marker prevents duplicate monthly processing from consuming flags or awarding the same monthly progression twice. Hour/day skips add no Bond reward. Actual qualifying manual/Quick work still sets its existing monthly flag; Auto Training retains its original eligibility and activity accounting. Scheduled grooming does not receive a newly invented rider-Bond award.

Tests verify independent horse values, subsequent eligible activities, saved decimals/state, hour/day/month progression and monthly replay protection. Chromium verifies the actual Groom and Care for all controls, followed by a cold reload of the IndexedDB save without a separate manual-save action.

## Actual changes only

`getActualChanges` compares finite before/after values with a 0.00001 tolerance. Event announcements format only those deltas, including fractions and clipping. Session behavior tables include only changed statistics and disappear when empty. The old cap/zero-gain announcement paragraph is removed.

Zero-change narrative candidates are excluded without deleting their historical catalogs. Central display filtering also covers saved observation logs, report notes and horse-history entries. Historical records remain stored. Ordinary event descriptions, actual assessments and current-stat overview displays remain available; no stat-change text is guessed from a quote. Existing technical progression and contextual medical feedback remain separate.

## Fall causes, severity and assessment

Every new fall stores horse/rider/trainer IDs, session ID, actual event date/hour, discipline/exercise, primary and triggering cause, contributing factors, fall type, severity, assessment status, actual confidence changes and session outcome. A bounded persistent incident history preserves these fields after reload. Duplicate processing reuses the same incident and learning event.

`fallSeverity` is separate from the existing numeric spook `severity`, preserving temperament mechanics. Ordinary rider-only fall weights are exactly Minor 65%, Moderate 27%, Serious 7%, Critical 1%. A horse fall following a genuinely serious jump, major imbalance or high-risk footing uses 10/45/35/10 weights; ordinary slip incidents retain the ordinary distribution. Rotational incidents are Critical. These are fictional balance classifications, not diagnoses.

All existing fall-stop rules remain. Moderate and higher incidents explicitly end the session; serious/critical rider falls also require a real veterinary review alongside rider assessment. Horse falls retain mandatory veterinary/rider review. Critical status marks urgency. Existing clinical findings and restrictions determine medical clearance, and severity alone creates no injury. Assessment status is synchronized into persisted incident and report records.

Refusal, run-out, spook, bolt, buck, footing, serious jumping and rotational events use their actual causes. A landing-related horse fall cannot receive the footing-slip quote. A rotational quote requires an actual rotational horse fall. Relevant 5.1 confidence/avoidance effects remain once per incident; unrelated jumping, flatwork, handling or collection statistics are preserved. Shows retain their existing elimination rules and do not receive the training concern panel.

All 24 supplied incident quotes and eight post-fall status quotes are retained with actor, event-type and evidence predicates. Effects and assessment results resolve before their text is eligible. No rider-responsiveness observation or medical result is fabricated where the existing systems have not recorded it.

## Validation

- Complete `npm test` passes, including eleven new 5.2 integration groups and the existing unchanged-button/catalog fixture.
- Targeted checks cover eight real attempts, changing live scores after recovery, duplicate/reload prevention, show replay, numerical round limits, real Quick and scheduled Auto Training, Bond persistence, filtering, causes, severity, assessments and context-specific losses.
- `npm run test:behavior5-simulation` passes 60,000 single-jump trials, 6,000 courses and 24 actual sessions with the same expected risks.
- `npm run test:behavior51-simulation` passes 80,000 conditional spook/fall/bolt trials plus rotational subtype sampling. Its numerical results are unchanged by this patch.
- `npm run test:behavior52-simulation` samples 10,000 ordinary rider-fall severity decisions: Minor 64.31%, Moderate 27.27%, Serious 7.40%, Critical 1.02%, within the tested statistical bounds. Results are in `outputs/training-behavior52-simulation.json`.
- Chromium verifies the actual Barn care controls and cold persistence, eight Repeat Exercise decisions, suppression of zero-change announcements, cause-matched refusal-fall text, severity/report detail and persisted pending assessment. No application console exceptions.
- Changed scripts parse successfully; `git diff --check` passes.
