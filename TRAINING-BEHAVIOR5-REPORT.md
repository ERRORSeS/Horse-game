# Training Behavior Engine 5.0 — implementation and validation

## 1. Existing controls and handlers

The Training 2.0 interface is retained. A saved baseline fixture checks all 30 literal button calls, their IDs, labels and order, plus the unchanged contextual-action catalog. No replacement or duplicate training controls were introduced. A read-only live status and a report table show current behavior and before/after values.

| Existing operation | Handler retained | Behavior integration |
| --- | --- | --- |
| Repeat / next course effort | `t2attempt`, `t2bind`, `t2adjust` | One resolved attempt event; one avoidance branch |
| Warm-up, gait and transitions | `t2warmup` | Existing preparation and technical work retained |
| Walk break / Circle Away | `t2break` | Weighted temporary recovery and shared avoidance cap |
| Simplify, change direction, lower fence, easier exercise | `t2bind`, `t2adjust`, course edit handlers | Reorganization only after an actual valid change and prior work |
| Increase difficulty / configure fences / select exercise | Existing setup handlers | Record the actual decision; no free permanent bonus |
| Encourage | Existing `encouraged` flag | Existing next-effort effect, no fabricated success |
| Reward Successful Attempt | `t2rewardSuccessfulAttempt` | Independent threshold checks; once per actual successful jump |
| Pause and assess / investigate | Existing `rrConcernControls`, `rrFollowup` | Actual refusal required; shared live score and cap |
| End work / cooldown | `t2finish`, existing cooldown routing | Actual-work qualification, accurate summaries, no empty-session bonus |
| Quick / scheduled Auto | Existing start and scheduling paths | Learn from actual resolved efforts; existing stamina and scheduling retained |

## 2. Refusal probability

`getBaseAvoidanceRisk` implements the supplied interpolation, including fractional boundaries, with the explicit inclusive 0–2 → 4% base override. For 2 < score ≤ 10 it uses 15 + score; the remaining segments are the supplied 11/31/51/76 formulas. Boundary jumps remain intentional. The previous Professional-only exemption in the 51–75 band is superseded by the requested −7 percentage-point rider modifier.

The final probability adds the requested rider, height, confidence, trust and tension terms, then clamps to 5–95%. Thus 4% is a base risk: modifiers and the 5% final floor still apply. The repository has no separately validated numeric medical-refusal modifier, so that additional term is zero rather than an invented penalty. Existing medical eligibility, warnings, exposure and pain-related recovery exclusions remain active.

A jump resolves one combined refusal/run-out branch. Conditional categories are 65% stop, 25% run-out and 10% abandoned approach. Refused/run-out training efforts retain the existing incident/fall pipeline. Shows retain their scoring, faults, elimination and jump-off rules. Quick numerical jumping shows now roll per eligible fence, stopping at the existing refusal limit; NPCs retain their own existing model rather than borrowing the selected player rider.

## 3. Seeded statistical results

Each row uses 10,000 stable seeded single-jump trials and 1,000 twelve-fence courses. The reference rider is Intermediate, Jump Confidence 70, Trust 70, Tension 50, at the established height. Course simulation ends at the existing two-refusal elimination threshold. Bounds check both single-jump risk and full-course clear/elimination frequencies. The large number of eliminations at high avoidance is the requested high-risk balance, not an endless retry loop.

| Avoidance | Base | Final expected | Observed refusals | Clear courses | Eliminated courses |
| --- | --- | --- | --- | --- | --- |
| 1 | 4.00% | 6.00% | 6.22% | 418/1000 | 145/1000 |
| 5 | 20.00% | 22.00% | 21.97% | 38/1000 | 815/1000 |
| 20 | 34.74% | 36.74% | 37.21% | 3/1000 | 978/1000 |
| 40 | 49.74% | 51.74% | 51.11% | 0/1000 | 994/1000 |
| 60 | 68.75% | 70.75% | 71.45% | 0/1000 | 1000/1000 |
| 85 | 86.88% | 88.88% | 88.85% | 0/1000 | 1000/1000 |

The simulation also runs 24 real training sessions through `t2attempt` and `t2finish`, checks that every counted attempt has an actual outcome, verifies summaries and confirms Bond, QOL and potential remain unchanged. Full numerical results are in `outputs/training-behavior5-simulation.json`.

## 4. Rider levels and height experience

Beginner +8, Novice +5, Intermediate +2, Advanced −3, Professional −7 points. Height gaps use actual supported jumping tiers: 0, +3, +6, +10 or +15 points. Confidence, trust and tension use the exact requested tables. The player is not prohibited from a height unless an existing independent eligibility rule applies.

## 5. All nine learned statistics

Jump Confidence affects jump risk; Flatwork Confidence affects relevant technical uncertainty; Rider Trust affects aid uncertainty and jump risk; Fence Avoidance owns its baseline; Spook Sensitivity affects genuine environmental reactions; Training Anticipation affects premature responses; Arena Confidence affects environmental uncertainty; Handling Confidence affects handling hesitation while retaining the transport-specific system; Collection Confidence affects collected-work uncertainty. Their positive and negative changes require actual contextual events. These remain separate from technical skills, horse genetics, natural temperament, Bond and QOL.

## 6. Shared live state

The authoritative learned object remains `horse.riderBehavior.learned`. Session `behavior5` stores the initial audit snapshot, actor IDs, resolved event/attempt IDs, selected actions and caps; it does not own a second mutable learned score. Every delta reads the current horse value. Old session-baseline reset layers are bypassed. Reports alone retain a final historical snapshot.

## 7. Session caps

Non-jumping recovery shares one −4 avoidance cap across reassessment, investigation, walk breaks and reorganization. Temporary tension can continue to fall after the cap. Ordinary clean-jump confidence has a +12 cap. Qualifying session trust has a +3 cap; a separately eligible compatibility outcome can add +1 without stacking the same hand/leg evidence twice. Rewards and separately verified milestones remain distinct and idempotent.

## 8. Positive and negative events

Clean-jump gains use the 40/40/20 table. Recovery actions use the exact supplied weighted outcomes, including zero learned improvement. Beginner/Novice confidence loss requires a genuine contributing rider error; Intermediate decline is limited to a genuine negative error event; Advanced/Professional refusals normally leave confidence intact. Explicit welfare incidents have adverse contextual effects without an obedience reward. Three relevant verified positive sessions since a setback may award the separate once-only recovery milestone. Idle time does not regenerate behavior.

## 9. Rider-specific narration

All five rider levels use their supplied fifteen-quote groups. Metadata checks actual horse ID, rider ID, selected level, action, event outcome and stat direction. A Beginner can succeed and a Professional can make a real error. No quote applies a gameplay effect after selection. Unknown or ineligible cases use neutral event-specific feedback.

## 10. Trainer-specific narration

Patient/Fair, Strict/Ambitious and Negligent/Abusive groups retain their exact supplied text. Profiles have persistent IDs and saved personalities. `Demanding` is migrated as the existing alias for Strict. A trainer response is recorded before a quote describes it; current trainer conduct is never inferred from an earlier trainer’s misconduct. Matching identity is required for historical attribution.

## 11. Trainer changes and history

The existing change-instructor action and settings are reused. New selection updates the current profile ID; previous event and conduct records retain their original trainer IDs and type. Hydration restores the registry and sequence counters, including on a fresh browser load. Older saves initialize missing metadata lazily without resetting learned values.

## 12. Unknown-obstacle causes removed

Fence type, filler, water appearance and unfamiliarity add no direct avoidance-refusal modifier. The old filler/water refusal supplements and novelty-specific refusal cap were removed. Fence geometry and existing technical requirements remain; real environmental spooks and their existing fall rules remain separate.

## 13. UI and player agency

The original control catalog is tested against a pre-update fixture. Action records are created only by actual handlers; no session decision is generated on render. A difficulty-boundary click that changes nothing cannot earn reorganization recovery. Automatic/Quick modes retain their explicitly delegated workflow. Show concerns do not interrupt or add training-only buttons to competitions.

## 14. Validation

`npm test` covers the original medical, economy, save, performance, scheduling, competition, jump-off, fall and training suites plus the updated behavior and Engine 5.0 checks. Tests verify every narrative predicate, mismatched actors, wrong-stat placeholder prevention, exact probabilities, capped live recovery, actual auto/quick efforts, cold trainer restoration, decimal summaries and duplicate-event prevention. `npm run test:behavior5-simulation` performs the numerical and full-session simulations above.

Chromium exercises the existing Repeat Exercise, reward, reassessment, walk-break and End Session controls; checks actor-correct narration, shared cap behavior, conditional rewards, qualified bonuses, report tables, protected data and fresh save/reload without uncaught exceptions.

## 15. Save/load and performance

Existing save schema and engine are reused. Learned decimals, event IDs, session action/cap state, instructor IDs and profiles persist. Event, quote and action ledgers are bounded; quote filtering occurs after an event, never every render. Existing time-skip and save performance suites remain part of the full regression command.

## 16. Limits and interpretation

The engine remains behind the existing Rider Realism setting. The 4% override is the requested **base** value within the new combined-risk specification; final risk follows its 5–95% clamp. A numerical medical-refusal magnitude was not invented where the repository has none. Historical imported text remains intact; new narration uses the validated event system. Rare quotes whose specific evidence has not occurred remain ineligible. No external dependency, service, credential, or UI rebuild is required.
