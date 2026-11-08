# Individuality 6 and Interactive Competition 7 implementation report

Follow-up: competition choices show one-decimal Success (clear), Partial (pole), and Fail (refusal) chances. Partial uses the conditional pole probability, including the chance of reaching the jump without a refusal. Displayed percentages total 100.0; outcome resolution retains full precision. Reorganization choices identify that no jump is attempted. Time penalties are removed from interactive, Quick, NPC, jump-off, and legacy eventing scoring; elapsed time is still recorded and used to rank equal-fault rounds. Existing saved historical results remain intact.

Loading follow-up: failed loading attempts keep the booked itinerary and remain available for retry or staff assistance. Only explicit abandonment returns to planning. Rebooking preserves the attempt sequence, preventing the same deterministic failure from repeating; bookings, payments, and loading progress survive reload.

## 1. Files and existing handlers

`individuality6.js` supplies the shared refusal profile, negative learning filter, Fence Resilience, inheritance, and environmental recovery. `traits6.js` connects the existing 55 canonical Training 2.0 traits to contextual calculations and resolved consequences. `competition7.js` wraps the existing interactive choice, advancement, score, NPC, jump-off, preparation, and rendering handlers. `index.html` loads these after the existing behavior layers.

Small integration edits are in `training2.js` (attribute defaults, pole eligibility, named hesitation, and existing outcome facts), `learned-avoidance.js` (the authoritative delta hook), `training-behavior51.js` (slow expert trust, stimulus evidence, and incident ownership), and `training-behavior52.js` (the existing single-jump audit with representation IDs). `script.js` keeps the existing choice controls while displaying the one-decimal clear/pole/refusal breakdown during interactive competition. `showjumping-round.js` uses the attachment's explicit rail baselines. Existing grooming and farrier checks consume contextual trait modifiers in `grooming-expansion.js`, `competition-completion.js`, and `health-engine.js`.

## 2. Preserved mechanics

All existing Training 2.0 button IDs, labels, order, and contextual action catalogs remain intact. Interactive, Quick, and Auto Training retain their progression and technical skill handlers. The existing nine learned values remain authoritative in `horse.riderBehavior.learned`; no parallel confidence or avoidance fields were introduced. Genetics, personality IDs, trait IDs, veterinary restrictions, existing tack/inventory, Bond, QOL, and rider profiles are preserved. The new permanent attribute appears in the existing riding attribute profile and roleplay editor.

Existing jumping class eligibility, entries, travel workflow, prizes, result identities, history deduplication, and elimination rules remain in their original handlers. New interactive refusals add four faults on the first refusal, represent the same fence, and eliminate on the second. Falls still eliminate. The existing reduced show-fall rates and fall-intensity history are retained.

## 3. Quick Compete protection

`quickCompete` itself is unchanged. Its existing `show.quickRunning` flag routes choice probabilities, resolution, advancement, and scores through the original implementations. It still completes immediately from one click, without stopping for individual choices. New refusal tables and the explicit rail baselines remain shared calculation changes. Tests exercise all four Quick disciplines and repeat calls to detect duplicate results or payments.

## 4. Interactive decisions and actual outcomes

The existing options and ordering are reused; two outdated circle labels no longer promise time penalties. Their intent and risk affect the coherent execution check, contact consistency, preparation, route distance, pace, and recovery. Actual selected rider abilities contribute a bounded adjustment; discipline experience and current horse skill also contribute. An execution mistake can still clear a jump. It does not automatically become a refusal or a rail.

Only a selected circle/re-approach action reorganizes the approach. A refusal or interrupted jumping question remains available for representation. Advancement displays the next decision; it never selects a riding action. Ledger IDs include the actual representation count. A resolved event, saved result, or reopened screen cannot roll again.

## 5. Round rail calibration

The attachment explicitly specifies neutral round baselines of 30% at 0.70–0.90 m, 40% at 1.00–1.20 m, and 45% at 1.30–1.80 m. The old source actually used 10%/30%/40%; this update follows the explicit attachment values and updates the corresponding tests.

For round probability `P`, total hazard is `-ln(1-P)`. Fence `i` receives weight `w_i` from its recorded course geometry and local probability `1-exp(-hazard*w_i/sum(weights))`. Consequently, the product of local survival probabilities is exactly `1-P` under neutral conditions. There is no new whole-round rail gate in interactive competition. Front- and hind-leg hazards are distinct: Careful Front End multiplies only front hazard by 0.92; Trails Hind Legs multiplies only hind hazard by 1.10.

Current rider, timing, energy, focus, choice, and style modify the local hazard. Saved legacy rounds that already contain an assigned pole plan keep that plan until the next round. A keyed avalanche mixer avoids correlation between neighboring fence draws; it is local to the new competition engine and does not change the existing medical random stream.

## 6. Per-fence refusal calculations

Training and competition use all 13 explicit score bands, clamped scores, and linear interpolation within each band. Scores 0–2 have a 4% base chance in both contexts. The tables' endpoints take priority over inconsistent worked examples in the attachment (for example, training score 5 interpolates to 5.5714%, rather than the listed 5.9%). Fractional scores between integer bands enter the next band at its lower endpoint.

The final chance uses rider rank (+4/+2/0/−2/−4), height gap (0/+2/+4/+6), Jump Confidence (+5/+3/+1/0/−2), Rider Trust (+3/+2/+1/0/−1), and current Tension (−2/0/+2/+4). Any explicitly qualifying direct trait modifier is bounded to ±4. No generic fence-type, appearance, or unfamiliar-obstacle refusal modifier exists. The final bounds are 1–80% through score 80, 65–90% at 81–95, and 92–99% at 96–100.

A successful avoidance roll selects stop, run-out, or abandoned approach at 65%/25%/10%. Ordinary polework does not receive a jumping refusal roll; at scores 96–100 one check owns the whole attempted pole line. No polework hesitation creates an official show jumping fault. Training retains the existing Rider Realism opt-in for learned-behavior resolution; the new interactive competition resolver uses the competition profile directly.

## 7. Persistent RPG values and readiness

The existing Tension, Focus, Confidence, Energy, and Timing fields remain in `warmupState`. Successful preparation, execution errors, actual exertion, settling, spooks, and trait consequences change those live fields. They carry through phases and jump-offs. The new derived readiness starts at 50 and records the actual reason for each change; it does not reset at arena entry.

Readiness and Focus contribute +6/+3/0/−2/−4 to relevant execution checks. Timing contributes +7/+3/0/−2/−5; Confidence contributes +4/+2/0/−1/−2 to uncertainty; Energy contributes +6/+3/0/0/−2 to fatigue-related checks. These are applied only to relevant checks, rather than added wholesale to the refusal percentage. The compact panel displays current progress, penalties, elapsed time, all five values, readiness, and the last five events. Normal screens omit internal random rolls.

## 8. All 55 trait connections

`i6Check` indexes the existing stored traits. It does not scan unused trait checks each game hour. Existing exclusions remain; conflicting legacy traits use the first stored compatible trait, without deleting the player's data. The names “Drifts Left/Right” resolve to the existing canonical “…to Fences” IDs. Trait effects use existing training checks and coherent competition execution, rail, environmental, handling, engagement, or learning events. No trait adds an independent refusal, spook, or fall check.

Each trait retains its exact supplied quote and an additional exact contrasting quote. Favorable, neutral, and difficulty variants require an eligible context and a resolved outcome. The following matrix identifies the numerical check and actual handlers.

| Existing trait | Check and value | Actual trigger | Resolution handlers |
|---|---|---|---|
| Rushes Fences | rushing: +12 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Cautious Jumper | hesitation: +8 pp | `newExercise` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Bold Jumper | hesitation: -6 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Hesitates at Fillers | hesitation: +10 pp | `hasFiller` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Water-Shy | hesitation: +12 pp | `water` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Overjumps | overjump: +12 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Careful Front End | frontRail: -8 pp | `jump` | `t2railProfile`, `c7PoleRisk` |
| Trails Hind Legs | hindRail: +10 pp | `jump` | `t2railProfile`, `c7PoleRisk` |
| Long Stride Tendency | distance: +8 pp | `related` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Short Stride Tendency | distance: +8 pp | `related` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Drifts Left to Fences | drift: +10 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Drifts Right to Fences | drift: +10 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Strong After Fences | postSpeed: +12 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Careful but Slow | hurried: -4 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Enjoys Jumping | engagement: +8 pp | `jump` | `t2attempt`, `t2xAfterAttempt`, `c7Resolve` |
| Strong on Left Rein | turn: +10 pp | `left` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Strong on Right Rein | turn: +10 pp | `right` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Weak Left Canter Lead | lead: +12 pp | `leftCanter` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Weak Right Canter Lead | lead: +12 pp | `rightCanter` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Anticipates Transitions | anticipation: +12 pp | `transition` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Difficult Downward Transitions | aid: +12 pp | `downward` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Naturally Straight | straightness: -8 pp | `flat` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Falls Inward on Circles | balance: +10 pp | `circle` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Excellent Rhythm | rhythm: -8 pp | `rhythmEligible` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Contact Sensitive | overreaction: +10 pp | `inconsistentContact` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Quick Learner | learn: +15 % relative | `completed` | `individualityLearningDelta`, `tbApply`, `tbCommit` |
| Slow Learner | learn: -20 % relative | `completed` | `individualityLearningDelta`, `tbApply`, `tbCommit` |
| Dislikes Repetition | frustration: +8 pp | `fourth` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Patient Worker | frustration: -8 pp | `repeated` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Easily Distracted | distraction: +12 pp | `realDistraction` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Strong Work Ethic | engagement: +6 pp | `demanding` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Needs Encouragement | engagement: +8 pp | `encouraged` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Frustrates Easily | frustration: +10 pp | `failedAttempt` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Slow to Warm Up | technical: +10 pp | `cold` | `t2probability`, `i6ResolveTraitEffects`, `c7Execution` |
| Quick to Settle | settling: +12 pp | `disturbed` | `t2break`, `i6ResolveTraitEffects`, `c7Resolve` |
| Nervous in New Arenas | tension: +10 pp | `newArrival` | `individualResponse`, `t2probability`, `c7Execution` |
| Comfortable in New Arenas | tension: -10 pp | `newArrival` | `individualResponse`, `t2probability`, `c7Execution` |
| Distracted by Other Horses | distraction: +12 pp | `horses` | `individualResponse`, `t2probability`, `c7Execution` |
| Enjoys Working Around Horses | distraction: -8 pp | `horses` | `individualResponse`, `t2probability`, `c7Execution` |
| Wind Sensitive | spook: +12 pp | `wind` | `tb51SpookProfile`, `t2xBeforeAttempt`, `c7Resolve` |
| Traffic Nervous | spook: +12 pp | `traffic` | `tb51SpookProfile`, `t2xBeforeAttempt`, `c7Resolve` |
| Likes Open Spaces | tension: -6 pp | `outdoor` | `individualResponse`, `t2probability`, `c7Execution` |
| Prefers Enclosed Spaces | tension: -6 pp | `indoor` | `individualResponse`, `t2probability`, `c7Execution` |
| Nervous Around Arena Gates | tension: +12 pp | `gate` | `individualResponse`, `t2probability`, `c7Execution` |
| Enjoys Trail Work | engagement: +8 pp | `trail` | `individualResponse`, `t2probability`, `c7Execution` |
| Difficult to Mount | mount: +15 pp | `mount` | `t2probability`, existing loading/examination, `c7Handling` |
| Stands Quietly | mount: -12 pp | `standing` | `t2probability`, existing loading/examination, `c7Handling` |
| Sensitive to Grooming | groom: +12 pp | `groom` | `i6GroomResponse`, `groomingAction`, training practice |
| Hoof-Handling Difficulties | hoof: +15 pp | `hoof` | `i6HandlingCooperation`, `HorseHealth.farrier`, training practice |
| Calm with Farrier | farrier: -12 pp | `farrier` | `i6HandlingCooperation`, `HorseHealth.farrier`, training practice |
| Nervous with Farrier | farrier: +15 pp | `farrier` | `i6HandlingCooperation`, `HorseHealth.farrier`, training practice |
| Sensitive to Clipping | clip: +15 pp | `clip` | Existing Clipper Introduction training practice; `c7Handling` for actual clipping |
| Equipment Cautious | hesitation: +12 pp | `newEquipment` | `t2probability`, existing loading/examination, `c7Handling` |
| Mouths Equipment | fidget: +15 pp | `equipment` | `t2probability`, existing loading/examination, `c7Handling` |
| Very People-Oriented | engagement: +10 pp | `familiarHandler` | `t2probability`, existing loading/examination, `c7Handling` |

Positive engagement and actual successful settling have temporary consequences. Rushing changes Focus/Timing; filler hesitation changes Timing; difficult water responses change Tension; overjumping costs Energy; drifting and stride errors affect Timing; a failed rebalance affects Timing. Careful but Slow adds real elapsed time. Handling uncertainty uses the existing Handling Confidence tiers. A haircut is not treated as a clipping event, and a veterinary soundness examination is not treated as a farrier visit.

Fence Resilience is permanent, generated once for new horses, defaulted safely to 5 for old horses, and inherited from the parental average with bounded variation. It scales only qualifying new negative avoidance learning (×1.25/1.10/1.00/0.75/0.50), rounded to the nearest quarter point. Random ordinary refusals alone do not acquire avoidance. Quick/Slow Learner affect eligible positive learned deltas by ×1.15/×0.80; actual engaged jumping can multiply ordinary positive learning by ×1.10. Existing slow learning budgets remain. Advanced/Professional session trust is 0.75–1 after qualifying communication, rather than an automatic +3; the existing qualifying safe-aid bonus remains separate.

Learned Spook Sensitivity recovery requires an actual composed encounter, completed calm-waiting work, improved handling, or real settling. Each qualifying event uses the specified 25%/50%/25% outcomes (−1/−0.5/0), with a single 40% extra −1 milestone per three distinct positive encounters with the same concern. No day/month hook grants recovery. Natural Spookiness is not lowered. Recovery history affects the existing single environmental spook check.

## 9. Dressage marks

Recorded movement plans identify gait, side, lead, transitions, circles, collection, and coefficients. Existing class plans are honored; otherwise the built-in test records a coherent sequence before resolution, with no canter in Introductory and no collected movement below the applicable level. Existing tactical option labels remain.

Each completed movement receives one bounded mark, based on actual skill, current state, execution, and the resolved error. Minor rhythm/alignment errors deduct 0.2, transition/lead errors 0.75, balance errors 0.5, and consistent execution can add 0.2. The official percentage uses movement coefficients once. Legacy in-progress movement records retain their old mark calculation when converted into a mixed old/new round.

## 10. Hunter judging

The existing eight criteria remain: Rhythm, Smoothness, Jumping form, Distances, Straightness, Flow, Rider quietness, and Presentation. Actual refusals, rails, rushing, distance, alignment, and rider errors influence the relevant judging records. Showjumping time penalties are not added to hunter scores.

## 11. Eventing phases

Dressage, cross-country, and stadium use the existing phase lifecycle and cumulative official scores. Dressage uses movement marks, cross-country uses its recorded route and elapsed time without time penalties, and stadium uses jumping faults and rails. Current RPG state and readiness carry between phases. An eliminated entry retains its reason through unstarted phases. NPC entries simulate actual question-by-question rounds before their score is posted; their completed records and scores remain fixed.

## 12. First rounds, jump-offs, saves, and awards

The original zero-total-penalty qualification and first-round copies remain authoritative. Only qualifiers start the jump-off. The existing five-value copy is retained and readiness is carried as well. Nonqualifiers keep their original results. Existing result and prize deduplication remains in `showPersistResults`/`showAward`.

New ledgers store compact outcome references rather than duplicating every record. NPC histories retain compact completed effort records; they do not persist unused probability breakdowns. Existing identities and save serialization are reused. Browser testing includes a cold IndexedDB reload of a pending outcome.

## 13. Narrative eligibility

The 58 supplied competition lines are registered with predicates and selected after resolution. Rider-rank lines require the actual selected rank; water, lead, circle, rail, refusal, fall, mark, and placement lines require their corresponding recorded fact. Prepared scene labels describe the planned task, not a fictional pre-existing spook, overjump, mistake, or success. Existing riding choice labels remain unchanged. Original trainer profiles and conditional trainer dialogue remain in their existing handlers; the new engine does not choose actions for the player.

The four supplied simple-jump/pole lines and the five displayable spook-recovery lines also require actual events. Stat notifications use authoritative before/after differences; zero changes are omitted.

## 14. Automated validation

- `npm test`: existing regression suite plus the new Individuality 6 / Competition 7 integration and calibration suites.
- `node tests/individuality6-competition7.test.cjs`: 20 substantive scenarios plus the unchanged training-button fixture, covering tables, modifiers, migration, learning, recovery milestones, all trait contexts, actual consequences, local hazards, representation, marks, saves, NPCs, Quick Compete, inheritance, complete eventing, and truthful scene labels.
- `node tests/individuality6-simulation.cjs`: 40,000 samples per tested refusal score and per round baseline/course-length combination.
- Automated Chromium checks: startup, existing roleplay editor, original competition choice controls, compact status, one resolution per click, cold IndexedDB reload, and the original training attempt button.
- `node tests/competition-chances-time.test.cjs`: six follow-up checks cover accurate outcome probabilities, one-decimal display, actual branch resolution, zero time penalties for player/Quick/NPC phases, and slow clear-round qualification.
- `git diff --check` and JavaScript syntax checks.

Existing assertions were updated for the requested calibration and behavior changes: new table values, new rail baselines, slow expert trust, exact trait magnitudes, sheltered indoor wind, and the separate owned refusal/incident draws. Ordinary learning tests explicitly use neutral traits/resilience so random individual learning multipliers do not invalidate baseline expectations. The equipment-matrix and Puissance tie fixtures explicitly select warmbloods so a randomly generated breed ceiling cannot prevent an otherwise valid advanced tack check.

## 15. Results and limits

The calibration run measured 3.98% at a 4% refusal target, 70.01% at a 70.1111% target, and 98.01% at a 98% target. Across four- and twelve-fence courses, measured rail-round rates were 29.81–30.01%, 39.98–40.10%, and 44.70–44.77% for the 30%, 40%, and 45% neutral targets.

`npm test` completed successfully (exit 0), including the integration and calibration suites. The nested regression runner also completed outside the sandbox with captured child-process output. Browser validation passed without uncaught page exceptions. Existing saves and controls are covered by the regression suite. Full detailed outcomes exist only for the scheduled questions actually resolved; this does not add arbitrary procedural course design or invent external weather/traffic. The existing show-course length and elapsed-time recording are retained. Named hunter/eventing classes without a recorded numerical fence height display the class level and retain the existing 0.70 m default rail baseline; supplied course heights override that fallback. Height-experience gaps for those named classes use the actual discipline level indices. Monte Carlo checks validate the specified fictional balance; they do not claim real-world equestrian probabilities.
