# Dressage and Eventing realism 8.9

The original request is preserved in docs/dressage-eventing100-request.md. This implementation extends the existing dark UI, sessions, calendar, histories and one-click Compete button. Standalone showjumping is retained.

## Previous scoring and the apparent 70% bottleneck

There was no universal hard cap at 70%. The recent judge used `3.3 + 0.035 × overall dressage skill + 1.35 × execution + 0.35 × preparation`, plus form variation and rare bonuses. Skill 65 with clean execution and neutral preparation naturally produced about 69%. Movement names and coefficients already existed, but the same overall skill drove most marks; innate gait aptitude and individual trained subskills did not distinguish the movements sufficiently. Class-specific movement demands were also missing from ordinary tests.

Eventing already summed three phase penalties, but generic automatic faults/times and the interactive jump path did not provide correct XC distinctions. XC used arena-style disobedience handling; time penalties were zero in core scoring, and phase order and tie resolution were largely fixed.

## Permanent individual movement aptitude

Each horse records seven separate innate values: walk, trot, canter, elasticity, balance, impulsion and expression. These are aptitude, not additional trainable skills. Actual performance continues to use the existing Gaits, Rhythm, Balance, Collection, Connection and Flowiness fields. No current skills, temperament, learned behavior, coat genes, face/leg markings or existing breed caps are rewritten.

General founder categories use fictional game weights 10/35/35/15/5 for Below-average/Ordinary/Good/Very good/Exceptional. Dressage-oriented breed references and individual breeding-line potential shift the distribution modestly. Gaits vary within each horse; Exceptional does not mean seven perfect scores. PRE/Lipizzaner/Lusitano collection suitability influences natural balance. Thoroughbreds and other general-purpose breeds can still produce exceptional movers. Breed is never inserted directly into the final judge formula.

Foals inherit bounded individual movement from their actual parents. Existing horses receive deterministic values derived from saved potential, breed and relevant training, without rerolling current skills. Missing historical data receives reasonable starting aptitude, not an automatic very-low penalty. Valid saved values remain fixed, including fractional values; partial movement records recover missing fields while preserving valid ones. There is no monthly innate-movement improvement.

Movement Quality appears on horse cards and sales listings. The existing sale inquiry can request an evaluation; completed sale trial reports include the actual movement assessment. Ratings and descriptions use the horse's recorded values, with current Rhythm training, collection potential and dressage potential displayed separately.

## Actual movement judging

The full level-by-level fictional test catalogue is in validation100/test-catalogue.json: seven Introductory movements through 24 Grand Prix movements. Beginner tests have no advanced collected work. Eventing uses its own level-appropriate selection, capped below dressage pirouette/sequence/piaffe/passage demands. Eligible Freestyle has separate artistic judging.

The movement determines both innate inputs and trained subskills:

| Movement group | Natural | Training | Rider | Harmony | Conditions |
| --- | ---: | ---: | ---: | ---: | ---: |
| General | 20% | 35% | 25% | 10% | 10% |
| Expressive gaits/extensions | 35% | 25% | 20% | 10% | 10% |
| Precision/transitions | 10% | 40% | 25% | 15% | 10% |
| Collected/technical | 20% | 40% | 20% | 10% | 10% |

Expressive training emphasizes Gaits/Rhythm/Balance/Flowiness; precision emphasizes Balance/Connection/Rhythm/Flowiness; technical work emphasizes Collection/Balance/Connection/Rhythm. Relative weights within these groups differ, so Collection cannot be replaced by an overall average. Walk, trot and canter use the actual individual gait. Technical innate inputs emphasize balance/elasticity/impulsion. Rider execution uses actual Timing, Balance, Hand Stability, Aid Consistency and Leg Stability. Harmony uses existing trust, relevant flatwork/collection confidence and bond. Conditions use actual focus, energy, tension and fatigue.

Training is assessed relative to the existing level requirement: at the minimum, normalized technical readiness is 55; it rises toward 100 as the actual relevant training reaches 100. Training below the requirement reduces readiness further. This lets well-trained ordinary horses excel at suitable lower levels while keeping advanced work demanding.

The weighted quality Q produces `1.5 + 0.073 × Q`, with controlled test form up to ±0.15 marks, movement variation up to ±0.12, and a rare exceptional-movement term only when Q ≥ 94. Actual observed errors deduct marks. Unperformed movements receive zero. Relevant configured half/whole/tenth-mark rules apply. Strong scores come from the actual components, not a random +10% award.

Interactive choices retain the existing execution/trait/learned-behavior engine. Accuracy, ambitious expression/collection/precision and relaxation have different execution risks and small earned mark effects; they do not guarantee success. Relaxation lowers actual tension while slightly reducing expressive demand. Flying changes and transitions retain relevant anticipation and rider timing checks. No second learned-behavior system is introduced.

The official sheet contains every movement, mark, coefficient, weighted points, real comment, course errors and final percentage. Percentage is earned weighted points / maximum weighted points × 100. Default local panels use one judge, international panels three, majors five and Games seven; configured numeric or named panels override these defaults. Judges interpret the same resolved performance with small correlated differences.

Eligible Freestyle separates technical and artistic marks. Artistic harmony, expression, choreography, music interpretation and difficulty follow actual horse/rider/performance data. Difficulty uses the required movement composition or configured choreography difficulty, rather than merely adding to the technical percentage. Music playback is unnecessary. Configured technical/artistic weights are supported, with 50/50 default. Course-error deductions apply to the complete result once, rather than being halved by the technical/artistic average.

## Calibration evidence

Each profile below ran 400 starts with the same underlying horse/rider/preparation. Controlled variation and actual execution errors produce the range; no result band is hardcoded.

| Controlled profile | Mean | Range |
| --- | ---: | ---: |
| Ordinary, trained introductory partner | 71.16% | 66.67–72.78% |
| Good trained technical horse | 76.04% | 73.33–79.52% |
| Excellent Grand Prix combination | 84.38% | 81.52–85.61% |
| Extraordinary fully prepared Freestyle | 89.73% | 85.32–91.33% |

The last profile deliberately sets training and rider to 100, movement to 98 and full preparation. It demonstrates attainability, not the frequency of such a horse in the market. In a separate 500-horse mixture of ordinary training, aptitude, rider ability and preparation, no test reached 85% or 90%; one exceeded 80%. The complete distributions, example starts and generation counts are in validation100/distributions.json. Among 5,000 general-purpose founders the categories were 509 below-average, 1,812 ordinary, 1,706 good, 730 very good and 243 exceptional, within the specified statistical tolerance.

A native full manual Grand Prix also completed with a high but realistic technical percentage, without the former 8.5 movement ceiling preventing fair placing. Native examples and full sheets are in validation100/browser-example.json.

## Three-phase eventing

Dressage always starts first. Other phase order follows the stored phaseOrder or actual phaseSchedule, with supported short-format ordering when no schedule overrides it. Actual RPG steps follow that order. All three results remain separate and cumulative. Lowest total penalties wins; configured other penalties can be represented alongside phase scores. Tie resolution uses the configured sequence or XC penalties, closeness to optimum, arena penalties/time and dressage, with genuinely identical ties sharing placing.

XC has level-appropriate course distance, speed, optimum/time limit, dimensions and individual logs, brush, banks, water, ditches, corners, combinations, terrain changes and narrow questions. Each obstacle resolves separately. The existing Learned Fence Avoidance profile is the only refusal probability source; actual confidence, rider skill, technical challenge, traits, fatigue and pace modify that source. Severe learned avoidance remains severe. XC has no knockable arena rails.

Defaults model 20 penalties for a first disobedience, 40 for a second at the same obstacle, configured obstacle/total refusal elimination, 0.4 per commenced second over optimum and time-limit elimination. The stored XC rule configuration overrides these defaults. They are fictional FEI-inspired game defaults, not a claim that every national class uses one real-world rulebook.

Actual time comes from distance/speed, fitness, fatigue, terrain, line, pace and resolved incidents. Careful is slower; Fast is faster under comparable clean conditions but consumes more energy and raises technical demand. Fitness reuses existing Speed/Recovery/stamina-preference data, or an existing explicit fitness value; no duplicate trainable Fitness/Stamina skills are created. Phase exertion carries into subsequent phases. Existing medical restrictions prevent continuation, even if basic riding was administratively overridden. End-of-trip generic fatigue is credited against already-recorded phase exertion to avoid double counting.

Arena jumping reuses ShowjumpingRound for rails, refusals and timing. Its API accepts an optional eventing rider context; standalone calls retain their existing behavior. Both manual and automatic eventing use appropriate arena heights and fence counts. Actual jumping training, rider skill and carried fatigue influence the eventing phase. NPCs use persistent horse movement/phase abilities and actual rider data, rather than a new synthetic all-purpose horse per phase. The old independent random background elimination roll is removed for these disciplines; elimination follows actual resolved performance/rules.

A real native one-click example:

| Phase | Actual result | Penalties |
| --- | --- | ---: |
| dressage | 80.53% | 19.47 |
| cross-country | 0 obstacle + 0 time | 0 |
| showjumping | 0 obstacle + 0 time | 0 |
| Total | Sum of actual phases | 19.47 |

This is an actual simulated result, not the illustrative fixed 33.6 example. Tests separately verify 72.4% dressage → 27.6, five seconds over optimum → 2.0, plus one four-fault rail → 33.6, and that better total penalties beat faster but worse totals.

## Persistence, fairness and workflow

Quick Compete remains one click. It uses the same lightweight horse/rider movement and phase formulas for automatic players and NPCs. Manual decisions use the existing RPG execution architecture and the same judge/penalty calculations. Completed movements and phases are retained if Quick Compete finishes a partially played test. Background calculations do not create decorative UI events or save once per movement.

Full player sheets and phase results survive Save3 reload. NPC/rider ledgers and horse histories retain compact phase numbers, including actual dressage percentage, penalties, times and elimination state. Compact and full simulations are tested for exactly equal scores. Existing completed results are not rescored; already-booked legacy sessions retain their stored workflow and scoring mode. New competitions use the new model. Original genetics/marking code remains byte-identical in eight protected regions.

Native testing also registers and completes an eligible actual calendar event, checks the phase sum and awarded ranking points, then verifies the compact phase history after save/reload. National team and ranking eligibility rules are retained.

## Performance and verification

Initial profiling found repeated name normalization, roster work and unnecessary result-detail construction. Pure string normalization is memoized with a bounded cache; per-test evaluation inputs and judge interpretation are reused. Background results omit UI-only comments/panel detail while retaining exactly the same calculations. Event configurations stored on sessions contain scoring metadata rather than duplicating the calendar's growing result archive.

Local native worker benchmark:

| Operation | Current main baseline | Updated |
| --- | ---: | ---: |
| Day skips | 178–745 ms | 122–650 ms |
| Heavy first month / national pool initialization | 8,910 ms | 6,167 ms |
| Following month | 1,629 ms | 2,357 ms |

These are measured observations, not a universal one-second guarantee. The heavy first-month initialization remains slower than ordinary gameplay; it improved materially but is not eliminated. The ordinary month was about 0.73 seconds slower in this run. Scoring changes alter completed fields/results, so these are not identical-outcome speed ratios. Full timings, counts and the initial profile are retained in validation100/.

Validation includes targeted movement, mapping, judge/error, score, inheritance/migration, interactive-choice, XC, pace/fitness, phase order, sums/ties, actor fairness, compact/full equality, medical withdrawal, actual jumping ability and legacy-session checks; 5,000 generation samples; 2,100 repeated/mixed starts; native UI/calendar/save checks; and existing interactive competition, travel/completion, standalone jumping, national teams, federation, ranking-points, save-identity and protected-marking regressions. Two older competition fixtures were made explicitly adult, trained and ridden-breed fixtures rather than relying on a random first horse being eligible. Old partial-test assertions now account for the full test denominator and zero marks for unperformed movements.

Run npm scripts test:realism, test:realism-browser and test:realism-population. Evidence is in validation100/. The full historical suite was not rerun.

## Limits

Tests and course defaults are fictional Oxer configurations rather than verbatim licensed federation sheets. The existing level catalogue ends at Four Star; no unsupported CCI5* level or new discipline was invented. Broad statistical calibration uses controlled game populations, not real-world measured frequencies. Legacy NPC records that contain only a discipline summary use that saved summary for missing trained subskills; no extra NPC training is invented during judging. Innate gait quality and movement-specific judging still vary separately. If a parent record is unavailable, the foal receives a stable estimate from its saved data. Existing legacy booked sessions finish in their original mode to preserve recorded outcomes; start a new competition for the complete new test model.
