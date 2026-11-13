# OXER TO OXER — DRESSAGE & EVENTING REALISM UPDATE 8.9

## Realistic Dressage Judging • Individual Horse Movement Quality • Fair Rider Influence • Variable Percentages • Dressage Test Sheets • Three-Phase Eventing • Cross-Country Simulation • Complete Competition Rebalancing

**CODEX IMPLEMENTATION PROMPT — REVIEW AND IMPROVE EXISTING DRESSAGE AND EVENTING SYSTEMS**

# 0. MAIN OBJECTIVES

Completely review how Dressage and Eventing competitions currently work.

There are two main concerns.

**DRESSAGE**

- Scores seem to repeatedly remain around 70%.
- Horses appear to have insufficient natural movement quality.
- It is unclear whether better-moving horses actually score better.
- Rider skill, preparation and training should meaningfully influence results.
- Competition scores should have realistic variation.
- A talented horse should have an advantage without making less naturally talented horses useless.
- Different movements must be judged individually.
- High percentages must be achievable under the right conditions.

**EVENTING**

- Review the entire competition system.
- Make the three phases meaningful.
- Correct scoring and penalties.
- Introduce genuine cross-country performance differences.
- Ensure dressage, jumping, stamina, fitness and rider ability contribute appropriately.
- Keep scoring consistent with the existing competition architecture.

**DO NOT REWRITE SHOWJUMPING AS A SEPARATE DISCIPLINE.**

Reuse the established showjumping engine for eventing's arena-jumping phase where appropriate.

Keep Quick Compete as the existing one-click experience.

---

# PART I — HORSE MOVEMENT QUALITY

## 1. NATURAL MOVEMENT VS TRAINED MOVEMENT

Every horse must have individual movement ability.

A horse's natural quality and its training are related but different.

For example:

**Horse A**
- Naturally expressive trot.
- Excellent canter.
- Average walk.
- Poor collection training.

**Horse B**
- Ordinary trot.
- Average canter.
- Excellent walk.
- Strong collection and transitions.

Horse A might earn higher marks for expressive extended trot.

Horse B might perform better in precision, transitions and collected movements.

**The horse with flashier movement must not automatically win every test.**

## 1.1 Natural movement qualities

Inspect the existing horse schema before adding any fields.

Where individual movement aptitude is missing, introduce underlying innate potential for:

- Walk quality.
- Trot quality.
- Canter quality.
- Natural elasticity.
- Natural balance.
- Natural impulsion potential.
- Natural movement expression.

Use 0–100 where appropriate.

Reuse the existing Gaits, Rhythm, Balance, Collection, Connection and Flowiness values for actual trainable performance.

Do not create duplicate trainable skills with different names.

## 1.2 Natural quality should not be randomly terrible

Improve how new horses receive movement talent.

Suggested game-generation distribution for general-purpose horses:

| Natural movement category | Approximate chance |
|---|---:|
| Below-average | 10% |
| Ordinary | 35% |
| Good | 35% |
| Very good | 15% |
| Exceptional | 5% |

These are approximate game-balancing weights, not measured population statistics.

They should vary by breed, breeding line, parents and discipline.

Do not give 5% of all horses perfect movement in every gait.

A horse can have an exceptional walk but an ordinary trot.

Dressage-specialized breeding lines should produce good movement more often than general-purpose populations.

But breed is not an automatic guarantee.

## 1.3 Breed influence

Use existing breed potential profiles from Update 8.8.

For example:

**Andalusian / PRE**
- Strong potential for collection.
- Good natural balance.
- Suitable dressage aptitude.

**Lipizzaner**
- Strong potential for collected work.
- High dressage suitability.

**Dutch Warmblood**
- Potential for expressive movement and higher-level dressage.
- Significant individual variation between jumping and dressage breeding lines.

**Thoroughbred**
- Often athletic and capable of good rhythm and extension.
- Individual movement quality varies.

**Connemara**
- Capable of good pony dressage.
- Not automatically limited to low percentages.

**Irish Sport Horse**
- Versatile movement and athleticism.
- May perform well in eventing dressage.

**Do not make any breed automatically score a particular percentage.**

Breed affects the distribution of individual abilities, not the final score directly.

---

# PART II — REAL DRESSAGE JUDGING

## 2. SCORE EACH MOVEMENT INDIVIDUALLY

Replace any simplified calculation that derives the entire dressage score from a single flatwork rating or a fixed percentage range.

A dressage test must contain actual movement entries.

Examples:

**Introductory**
- Working walk.
- Working trot.
- Transitions.
- Circles.
- Halt.
- Straightness.

**Preliminary / Novice**
- Working canter.
- Canter transitions.
- Changes of direction.
- Free walk.
- Accurate figures.
- Rhythm.

**Elementary / Medium**
- More developed lateral work.
- Lengthening.
- Collection.
- Counter-canter where applicable.
- Greater balance and transitions.

**Advanced**
- Advanced lateral movements.
- More demanding collection.
- Flying changes.
- Greater extension and precision.

**Prix St. Georges / Intermediates / Grand Prix**
- Appropriate advanced collected movements.
- Pirouettes where required.
- Flying-change sequences.
- Piaffe and passage at levels requiring them.
- Extended work.
- Transitions between difficult movements.

Do not include advanced movements in beginner tests.

Use existing test definitions and applicable competition rule configurations.

## 2.1 Judge marks

Every movement receives a mark from 0–10.

Support half marks where the relevant test rules permit them.

Use the established judging principles:

| Mark | Interpretation |
|---|---|
| 10 | Excellent |
| 9 | Very good |
| 8 | Good |
| 7 | Fairly good |
| 6 | Satisfactory |
| 5 | Sufficient |
| 4 | Insufficient |
| 3 | Fairly bad |
| 2 | Bad |
| 1 | Very bad |
| 0 | Not performed |

Do not treat 7/10 as an automatic default.

The judge must evaluate the actual movement performance.

## 2.2 Weighted movements

Some test entries have coefficients.

Example:

| Movement | Mark | Coefficient | Points |
|---|---:|---:|---:|
| Working trot | 7.5 | 1 | 7.5 |
| Free walk | 8.0 | 2 | 16.0 |
| Canter transition | 7.0 | 1 | 7.0 |
| Final halt | 8.5 | 1 | 8.5 |

Calculate the final percentage from:

`earned weighted marks / maximum weighted marks × 100`

Apply applicable errors and penalties according to the event's configured rules.

Do not average movement marks without considering coefficients.

---

# PART III — HOW EACH MOVEMENT IS SCORED

## 3. BALANCE HORSE, RIDER AND TRAINING

**The horse's natural movement must matter, but it cannot determine the entire result.**

Use the following model as a starting point for movement evaluation.

### General movement evaluation

| Factor | Suggested influence |
|---|---:|
| Natural movement quality | 20% |
| Actual trained movement skills | 35% |
| Rider technical execution | 25% |
| Horse–rider harmony and communication | 10% |
| Current performance conditions | 10% |

Total: 100%.

These are game design weights, not real-world judging rules.

Use them to calculate the quality of a performed movement, not to display five artificial marks on the official test sheet.

**The judge should award a mark to the movement itself.**

## 3.1 Different movements need different weights

A single weighting formula is not appropriate for every movement.

### Expressive gaits and extensions

Suggested:
- Natural movement quality: 35%.
- Training: 25%.
- Rider: 20%.
- Harmony: 10%.
- Current execution: 10%.

These movements depend more strongly on the horse's natural gait quality.

### Transitions, accuracy and straightness

Suggested:
- Natural movement quality: 10%.
- Training: 40%.
- Rider: 25%.
- Harmony: 15%.
- Current execution: 10%.

These depend more heavily on correct training and riding.

### Collection, lateral work and advanced technical movements

Suggested:
- Natural movement aptitude: 20%.
- Training: 40%.
- Rider: 20%.
- Harmony: 10%.
- Current execution: 10%.

The actual required movement must determine which existing skill fields contribute.

Do not merely use the horse's overall Dressage score for everything.

## 3.2 Skill mapping examples

**Extended trot**
- Natural trot quality.
- Gaits.
- Impulsion and elasticity.
- Balance.
- Rider effectiveness.
- Rhythm.

**Shoulder-in**
- Collection.
- Balance.
- Connection.
- Straightness.
- Relevant rider aids.
- Suppleness.

**Flying change**
- Balance.
- Collection.
- Timing.
- Rider precision.
- Relevant learned anticipation.

**Free walk**
- Walk quality.
- Rhythm.
- Relaxation.
- Appropriate connection.
- Rider effectiveness.

**Halt**
- Training.
- Straightness.
- Balance.
- Responsiveness.
- Rider precision.

**Piaffe**
- Collection.
- Strength and balance.
- Technical training.
- Rider skill.
- Natural aptitude.
- Correct execution.

Do not give a horse marks for movements it has not performed.

---

# 4. MOVEMENT TRAINING MUST ACTUALLY HELP

A horse's trained skills should improve movement scores.

Examples:

Training Collection should improve the performance of relevant collected movements.

Training Rhythm should improve rhythm-dependent movements.

Training Connection should improve eligible contact and connection-related scores.

Training Gaits should improve the quality of movement execution within the horse's individual potential.

**Natural movement potential must not replace actual training.**

A young talented dressage horse can have excellent natural movement but still lack the training for Grand Prix.

A less expressive horse may become exceptionally accurate and consistent through good training.

## 4.1 No automatic movement improvement

Do not increase movement ability merely because a month passes.

Apply progress through actual completed eligible training, inheritance and existing progression mechanics.

Do not overwrite the horse's existing learned behavior.

---

# PART IV — FIX THE 70% SCORE PROBLEM

## 5. REMOVE HIDDEN SCORING BOTTLENECKS

Investigate why dressage horses repeatedly score around 70%.

Potential causes:

- Fixed base percentage of 70.
- Excessively narrow random variance.
- Incorrect normalization.
- Hidden cap at 70–75%.
- Movement values clamped too early.
- Breed potential applied as a rigid ceiling.
- Rider factors ignored.
- All movements receiving approximately 7/10.
- Judge marks generated independently of actual movement performance.
- Incorrect skill scaling.
- NPCs and player using different formulas.

Find the actual root cause.

**Do not solve the issue by adding a random +10% bonus.**

Fix the underlying movement scoring.

---

# 6. DRESSAGE PERCENTAGES SHOULD VARY NATURALLY

Illustrative game-calibration targets:

| Performance quality | Approximate outcome |
|---|---|
| Seriously underprepared or major mistakes | Below 55% possible |
| Developing or inconsistent test | 55–65% |
| Reasonable completed test | 65–70% |
| Good test | 70–75% |
| Very good test | 75–80% |
| Excellent test | 80–85% |
| Exceptional high-level technical test | 85%+ |
| Extraordinary appropriate Freestyle | 90%+ possible, very rare |

**These are descriptive calibration bands, not hardcoded score brackets or guaranteed results.**

A horse can score below or above its usual band depending on the actual performance.

Do not force the player to remain at 70%.

Do not make 80–85% the normal result for every highly trained horse.

High scores must be earned through excellent individual movements.

## 6.1 Different tests have different standards

A well-trained ordinary horse may score very highly in an Introductory or Preliminary test.

That does not mean it can score the same percentage in Grand Prix.

The judge evaluates the quality and correctness of the required movements for that particular level.

A Grand Prix test should require excellent advanced technical skills.

**Do not use the same movement requirements for every dressage level.**

## 6.2 Realistic consistency

A horse that regularly performs at approximately 76% should not randomly receive 61% or 91% without actual major performance differences.

At the same time, every competition should not produce exactly 76%.

Allow reasonable variation through:
- Current fitness.
- Actual training.
- Focus.
- Venue confidence.
- Tension.
- Accuracy.
- Horse–rider communication.
- Genuine movement errors.

Randomness should be meaningful but controlled.

---

# PART V — HORSE MOVEMENT QUALITY IN THE MARKET

## 7. MAKE NATURAL MOVEMENT VISIBLE TO PLAYERS

**This is especially important because players need a way to FIND good dressage horses.**

When inspecting a horse, display a movement evaluation using its actual generated data.

Suggested horse-profile section:

**MOVEMENT QUALITY**

| Attribute | Example |
|---|---|
| Walk | Very Good |
| Trot | Exceptional |
| Canter | Good |
| Natural Elasticity | Very Good |
| Collection Potential | Good |
| Dressage Potential | 91/100 |

These are example values.

The actual values must differ between individual horses.

## 7.1 Movement evaluation during purchase

Allow the existing trainer/test-ride system to evaluate:
- Walk quality.
- Trot quality.
- Canter quality.
- Rhythm.
- Natural balance.
- Elasticity.
- Dressage suitability.

A trainer might report:

"Expressive trot and good natural balance. The canter is somewhat ordinary, but the horse shows promising collection potential."

Or:

"Correct, rhythmic movement without exceptional expression. Could become a reliable lower-level dressage partner with appropriate training."

Reports must reflect the actual horse.

Do not invent positive movement descriptions for horses with low relevant potential.

## 7.2 More genuinely talented dressage horses

Ensure that dressage-oriented breeding lines generate a reasonable number of genuinely talented movers.

Do not make every auction contain only average-moving horses.

However, exceptional movers should still be uncommon and valuable.

## 7.3 Existing horses

Do not reroll existing horses.

If innate movement fields do not yet exist, derive reasonable initial values from their saved breed, genetics, relevant potential and training data where supported.

Do not automatically punish existing horses with very low natural movement because the new fields were missing.

Do not overwrite their current trained dressage skills.

---

# PART VI — INTERACTIVE DRESSAGE COMPETITIONS

## 8. MAKE INTERACTIVE DRESSAGE ACTUALLY INTERACTIVE

Preserve the existing Interactive Compete architecture.

During a dressage test, present meaningful decisions at suitable moments.

Examples:

- Prepare for a transition.
- Prioritize accuracy through the next movement.
- Maintain rhythm.
- Request an appropriate degree of collection.
- Ride a controlled extension.
- Keep a consistent contact.
- Manage tension.

Use existing rider and horse stats.

Do not create a completely new horse-controlling minigame.

## 8.1 Choices need real consequences

Example:

A horse is becoming tense before a transition.

Choosing to prioritize relaxation may:
- Improve composure.
- Slightly reduce expression.
- Improve the chance of a correct transition.

A more demanding approach may:
- Produce a more expressive movement when executed well.
- Increase the chance of losing balance or rhythm if the horse is not ready.

Do not secretly guarantee a successful decision.

Do not fabricate an error unrelated to the resolved movement.

## 8.2 Horse-specific reactions

A naturally expressive but sensitive horse should not perform exactly like a calm, less expressive horse.

Use:
- Natural movement.
- Temperament.
- Rider Trust in Aids.
- Flatwork Confidence.
- Learned Spook Sensitivity.
- Focus.
- Responsiveness.
- Collection Confidence.
- Existing relevant personality traits.

Do not duplicate learned-behavior calculations.

---

# PART VII — DRESSAGE TEST SHEET

## 9. SHOW THE PLAYER WHAT THEY ACTUALLY SCORED

After a dressage test, display a compact judge's sheet.

Example:

**DRESSAGE — ELEMENTARY TEST**

| Movement | Score | Comment |
|---|---:|---|
| Working trot | 7.5 | Good rhythm |
| Medium trot | 8.0 | Expressive extension |
| Shoulder-in | 6.5 | Slight loss of balance |
| Free walk | 8.5 | Relaxed and regular |
| Canter transition | 7.0 | Correct transition |
| Final halt | 8.0 | Straight and attentive |

Show the actual full test, not merely these six example entries.

Include:
- Judge marks.
- Coefficients.
- Relevant movement comments.
- Errors and deductions.
- Final percentage.
- Placing.

Every displayed comment must correspond to actual performance.

## 9.1 Multiple judges

Use event-appropriate judge panels.

- Small local competitions may have one judge.
- Higher-level competitions may have several judges.
- Major championship events should use the appropriate configured panel.

Judges may differ slightly in interpretation, but they must evaluate the same actual performance.

Do not generate unrelated random scores for each judge.

## 9.2 Freestyle

For eligible freestyle competitions, separate:
- Technical marks.
- Artistic marks.

Artistic results can consider:
- Choreography.
- Harmony.
- Movement expression.
- Music interpretation.
- Difficulty.

Do not apply ordinary technical-test scoring blindly to freestyle.

Do not require actual licensed music playback to simulate a freestyle result.

---

# PART VIII — EVENTING COMPLETE REVIEW

## 10. EVENTING MUST HAVE THREE REAL PHASES

Every full eventing competition must use:

1. Dressage.
2. Cross-Country.
3. Showjumping.

Dressage takes place first.

Cross-country and showjumping order must follow the specific event format.

Do not automatically treat every event as the same fixed schedule.

## 10.1 Final eventing score

Eventing is based on accumulating penalty points.

**Lowest total penalties wins.**

`Final Eventing Penalties = Dressage Penalties + Cross-Country Penalties + Showjumping Penalties + Other Applicable Penalties`

Do not use an average of all three discipline scores.

Do not award a higher final placement merely because a rider has a faster time when their total penalties are worse.

Use the applicable tie-breaking rules.

---

# 11. EVENTING DRESSAGE

Use the same underlying movement-performance engine as ordinary Dressage.

However:
- Use the actual eventing dressage test.
- Use appropriate movements.
- Use the event's coefficients.
- Apply its own judging rules.

The dressage percentage converts to penalty points.

Example:

**Dressage score: 72.4%**

Penalty points:

`100 - 72.4 = 27.6`

The competitor begins the following phase with 27.6 penalties.

Do not reset these penalties after the next phase.

---

# 12. CROSS-COUNTRY SIMULATION

**CROSS-COUNTRY MUST NOT BE A RANDOM REPLICA OF SHOWJUMPING.**

Cross-country tests different abilities.

Use:
- Stamina.
- Fitness.
- Cross-country confidence.
- Jumping ability.
- Terrain handling.
- Rider cross-country judgment.
- Pace management.
- Focus.
- Relevant obstacle familiarity.
- Natural Spookiness where appropriate.
- Learned Fence Avoidance where appropriate.
- Relevant horse personality traits.

Reuse existing fields whenever possible.

Do not create duplicate horse skills merely to simulate cross-country.

## 12.1 Course features

Courses may contain appropriate obstacle types such as:

- Logs.
- Brush fences.
- Banks.
- Water complexes.
- Ditches.
- Corners.
- Combinations.
- Terrain changes.
- Narrow fences.

Each obstacle has:
- Actual difficulty.
- Appropriate dimensions.
- Relevant technical challenge.
- Horse-specific suitability.
- An actual resolved result.

Do not roll the entire course as a single random success/failure event.

## 12.2 Obstacle performance

For each meaningful obstacle, calculate the outcome using:
- Horse skills.
- Rider skills.
- Training.
- Approach quality.
- Current fatigue.
- Relevant horse traits.
- Current confidence.
- Actual obstacle difficulty.

Possible results include:
- Successful jump.
- Minor loss of rhythm.
- Slower or wider approach.
- Refusal.
- Runout.
- Other relevant rule-defined fault.

Do not make refusals excessively common on appropriately matched horses and courses.

Do not invent a second generic refusal roll on top of the existing Learned Fence Avoidance system.

---

# 13. CROSS-COUNTRY FAULTS

Use the appropriate stored rule set for the competition.

For a standard modern FEI-inspired format, relevant examples include:

| Event | Penalty |
|---|---:|
| First refusal/runout at an obstacle | 20 |
| Second refusal/runout at the same obstacle | 40 |
| Applicable additional disobedience | Rule-dependent elimination |
| Exceeding optimum time | Typically 0.4 penalties per commenced second |
| Exceeding the time limit | Elimination |

Other relevant faults must be read from the correct rule configuration.

Do not apply these blindly to every fictional national or introductory event if its configured rules differ.

Do not treat XC obstacles as normal knockable showjumping rails.

Do not invent unnecessary incidents to make cross-country difficult.

## 13.1 Cross-country time

Calculate a realistic course time based on:
- Course distance.
- Course speed requirements.
- Horse fitness.
- Actual pace.
- Terrain.
- Turning and obstacle approaches.
- Actual incidents.
- Rider pace management.

Do not generate a random final time unrelated to the horse and course.

---

# 14. CROSS-COUNTRY PACE OPTIONS

In Interactive Eventing, provide meaningful choices using existing style selections where possible.

Examples:

**Careful**
- More controlled pace.
- Potentially less demanding approaches.
- Greater likelihood of time penalties.

**Balanced**
- Reasonable pace.
- Balanced technical control.

**Fast**
- Faster intended pace.
- Greater stamina demand.
- Potentially more difficult technical execution.

Do not force Fast to be slower without an actual reason.

Do not guarantee Fast will win.

Make pace and technical tradeoffs depend on the horse and rider.

## 14.1 Fatigue

Cross-country must consume appropriate Energy and stamina.

The horse's actual fatigue should affect later phases where relevant.

However, do not make every horse exhausted automatically.

A fit, well-prepared eventer should have meaningful advantages.

## 14.2 Health and welfare

Respect existing:
- Medical restrictions.
- Recovery.
- Fitness.
- Competition eligibility.
- Horse health checks.

Do not force a medically unfit horse to continue into another phase.

Use existing game veterinary and welfare systems rather than building an unrelated medical model.

---

# 15. EVENTING SHOWJUMPING PHASE

Reuse the existing showjumping competition resolution engine.

Keep:
- Relevant rail calculations.
- Rider technical skill.
- Horse jumping skills.
- Learned Fence Avoidance.
- Timing.
- Actual fence events.
- Course time.
- Applicable eventing penalties.

Do not create a separate inconsistent rail probability system.

For eventing, also consider:
- Recovery after cross-country.
- Fitness.
- Appropriate accumulated fatigue.
- Horse confidence.
- Rider precision.

A well-conditioned eventing horse should recover and perform more consistently.

The showjumping phase must not start with artificially reset perfect Energy if the event rules and schedule do not justify it.

---

# 16. EVENTING RESULTS EXAMPLE

**HORSE: SILVER PROMISE**

### Dressage

Score: 72.4%.

Dressage penalties: 27.6.

### Cross-Country

Obstacle penalties: 0.

Time: 5 seconds over optimum.

Time penalties: 2.0.

Cross-Country penalties: 2.0.

### Showjumping

One rail: 4 penalties.

Time penalties: 0.

Showjumping penalties: 4.0.

### Final result

| Phase | Penalties |
|---|---:|
| Dressage | 27.6 |
| Cross-Country | 2.0 |
| Showjumping | 4.0 |
| **Total** | **33.6** |

This rider finishes on **33.6 penalties**.

Their actual final placing depends on every other competitor's combined result.

Do not hardcode a placing based on one horse's score.

---

# PART IX — EVENTING SKILL BALANCE

## 17. HORSES SHOULD HAVE DIFFERENT EVENTING STRENGTHS

An elite eventing horse doesn't have to be equally exceptional in all three phases.

Example:

**Horse A**
- Excellent cross-country.
- Good showjumping.
- Average dressage movement.

**Horse B**
- Excellent dressage.
- Good showjumping.
- Slightly slower cross-country.

**Horse C**
- Very good in all three phases.
- Particularly consistent.
- Strong stamina and recovery.

All three could be competitive.

A horse that wins dressage can lose the overall competition after cross-country or showjumping penalties.

A horse with an ordinary dressage score may still climb the standings through reliable clear jumping.

**Do not preselect winners based solely on breed or one overall Eventing stat.**

---

# 18. EVENTING DIFFICULTY LEVELS

Use realistic existing national and international eventing progression.

For example:
- Introductory.
- Beginner / Entry.
- Novice.
- Intermediate.
- Advanced.
- CCI1*.
- CCI2*.
- CCI3*.
- CCI4*.
- CCI5*.

Use the game's actual level classifications, including short/long formats where already supported.

Different levels must have appropriate:
- Dressage tests.
- Cross-country technical demands.
- Course lengths.
- Speed requirements.
- Showjumping heights.
- Eligibility.
- Qualification requirements.

Do not use CCI5* demands in beginner events.

---

# 19. NPC EVENTING COMPETITORS

NPCs must use the same three-phase scoring rules as the player.

NPC results must account for:
- Actual horse dressage capabilities.
- Actual jumping capabilities.
- Rider skills.
- Fitness.
- Competition difficulty.
- Genuine faults.
- Real phase times.

Do not generate NPC totals independently from the three phases.

Their final penalties must equal the sum of their actual phase penalties.

Their horses and riders must persist correctly between events.

---

# PART X — FAIRNESS AND SCORE VARIATION

## 20. FAIR DOES NOT MEAN EVERY HORSE IS IDENTICAL

The game should reward:
- Natural movement quality.
- Good breeding.
- Correct training.
- Rider development.
- Horse–rider partnership.
- Preparation.
- Appropriate competition selection.

But it must not make results entirely dependent on expensive or rare horses.

A well-trained ordinary horse with an excellent rider should be able to defeat a naturally talented but poorly prepared horse.

Similarly, an elite horse should not be automatically defeated by a substantially less capable horse when both perform comparably well.

The scoring must follow actual performance.

## 20.1 No player-specific penalties

Use identical scoring for:
- Player.
- NPCs.
- Custom competitions.
- Normal competitions.
- National championships.
- International classes.

Apply level-specific rules where appropriate.

Do not secretly weaken player horses.

Do not secretly grant NPCs extra movement talent during competition.

---

# 21. AVOID SCORE COMPRESSION

If every horse has:
- Dressage 70%.
- Eventing dressage 69%.
- Cross-country zero faults.
- Showjumping four faults.

Then the game is not generating enough meaningful differences.

However, do not fix this with random extremes.

Variation should emerge from actual:
- Horse profiles.
- Rider profiles.
- Movement talent.
- Training.
- Course difficulty.
- Fitness.
- Competition incidents.
- Daily performance.

Maintain realistic correlations across repeated starts.

---

# PART XI — DISPLAY AND UI

## 22. KEEP EXISTING UI STYLE

Preserve the Oxer to Oxer dark interface.

Do not rebuild the competition tab.

### Dressage

Display:
- Test name.
- Test level.
- Movement breakdown.
- Judge marks.
- Final percentage.
- Placing.
- Relevant ranking points.

### Eventing

Display:
- Dressage percentage.
- Dressage penalties.
- Cross-country results and penalties.
- Showjumping penalties.
- Cumulative total.
- Final placing.
- Ranking points.

Allow players to expand the phase details without cluttering the competition results page.

---

# PART XII — PERFORMANCE

## 23. PRESERVE FAST TIME SKIPS

This update must not reintroduce major lag.

Maintain the performance requirements from Update 8.6.

NPC dressage tests may be simulated using a lightweight movement-scoring engine without rendering every UI interaction.

NPC eventing may use compact phase simulation.

However, all recorded results must still follow the correct scoring rules.

Do not calculate hundreds of unnecessary decorative events.

Do not save the entire game after every individual movement during a month skip.

**Keep Quick Compete as one click, with correct complete results.**

---

# PART XIII — REQUIRED TESTS

## Dressage judging

1. Every test contains valid movements.
2. Every movement receives an appropriate mark.
3. Coefficients work.
4. Final percentages calculate correctly.
5. Multiple judges work.
6. Test errors apply correct penalties.
7. Grand Prix movements are not used in Introductory tests.
8. Dressage skill affects actual performance.
9. Rider skill affects actual performance.
10. Natural movement affects relevant movements.
11. Horse–rider harmony affects performance appropriately.
12. No universal 70% scoring cap.
13. Scores above 80% are possible.
14. Exceptional performances can exceed 85%.
15. Unprepared horses do not repeatedly score 80% without justification.
16. A horse's results remain reasonably consistent across comparable tests.
17. Test sheets correspond to actual performance.

## Horse movement

18. Each horse has meaningful individual movement aptitude.
19. Natural walk, trot and canter quality can differ.
20. Dressage breeds have appropriate distributions.
21. Other breeds can produce talented movers.
22. Existing horses migrate safely.
23. Movement evaluations appear in horse profiles.
24. Trainer evaluations match actual horse data.
25. Training improves relevant movement execution.
26. Innate qualities are not randomly rerolled.
27. Breeding and exceptional potential remain functional.

## Interactive dressage

28. Player decisions affect the actual next movement.
29. Decisions do not guarantee success.
30. Relevant horse traits affect performance.
31. No fabricated errors.
32. Test scores update correctly.
33. The result sheet remains accurate.

## Eventing

34. All three phases exist.
35. Dressage occurs first.
36. Other phase order follows event format.
37. Dressage percentage converts correctly to penalties.
38. Cross-country obstacle faults work.
39. Cross-country time penalties work.
40. Showjumping penalties work.
41. Total eventing penalties add correctly.
42. Lowest valid penalty total wins.
43. Event-specific tie-breakers work.
44. Elimination and retirement are handled correctly.
45. XC pace affects actual time.
46. Fitness affects relevant XC performance.
47. Relevant accumulated fatigue affects later phases.
48. NPCs use the same scoring rules.
49. Phase results persist in horse and rider histories.
50. Eventing rankings receive only eligible points.

## Balancing

51. Ordinary movers can score highly at suitable levels with good training.
52. Exceptional movers have appropriate advantages.
53. Breed alone does not determine scores.
54. Low-level dressage is accessible.
55. Elite dressage remains demanding.
56. Scores do not repeatedly cluster around exactly 70%.
57. Strong eventing horses can have different phase specialties.
58. Actual faults determine changes in eventing standings.
59. Player and NPC scoring use identical formulas.

## Regression

60. Quick Compete is unchanged.
61. Existing showjumping remains functional.
62. Existing horse skills remain intact.
63. Existing rider skills remain intact.
64. Existing genetics remain intact.
65. Existing temperament remains intact.
66. Learned behaviors remain intact.
67. Horse Manager remains functional.
68. National team competitions remain functional.
69. Rankings remain functional.
70. Existing saves load.
71. No severe time-skip lag.
72. No console errors.

---

# FINAL IMPLEMENTATION REPORT

Report:

1. How dressage scoring worked before the changes.
2. Why scores were clustering around 70%, if confirmed.
3. The new per-movement scoring calculations.
4. The influence of natural movement versus training versus rider skill.
5. How breed potential affects movement generation.
6. How existing horses receive movement data without being reset.
7. How movement quality is displayed to players.
8. Test sheets and coefficient calculations.
9. Actual example dressage results across different horses and levels.
10. Percentage distributions from repeated simulated tests.
11. The previous eventing scoring pipeline.
12. Cross-country scoring changes.
13. The calculation of eventing time penalties.
14. Integration with existing showjumping.
15. Example three-phase eventing results.
16. NPC fairness tests.
17. Performance benchmark results.
18. Save compatibility and migration changes.
19. Any remaining limitations.

# FINAL NON-NEGOTIABLE REQUIREMENTS

**DRESSAGE MUST SCORE INDIVIDUAL MOVEMENTS, NOT A SINGLE OVERALL HORSE STAT.**

**NATURAL MOVEMENT QUALITY MUST MATTER.**

**TRAINING AND RIDER SKILL MUST ALSO MATTER SIGNIFICANTLY.**

**ORDINARY HORSES MUST STILL BE ABLE TO ACHIEVE GOOD DRESSAGE RESULTS AT APPROPRIATE LEVELS.**

**EXCEPTIONAL MOVERS MUST HAVE MEANINGFUL BUT NOT UNFAIR ADVANTAGES.**

**REMOVE ARTIFICIAL SCORING BOTTLENECKS AROUND 70%.**

**ALLOW STRONG 75–85% RESULTS WHEN ACTUAL MOVEMENT EXECUTION JUSTIFIES THEM.**

**KEEP VERY HIGH ELITE SCORES UNCOMMON AND PERFORMANCE-DEPENDENT.**

**ADD MEANINGFUL DRESSAGE TEST SHEETS AND MOVEMENT COMMENTS.**

**SHOW MOVEMENT QUALITY IN HORSE PROFILES AND PURCHASE EVALUATIONS.**

**EVENTING MUST SCORE ALL THREE PHASES CORRECTLY.**

**CROSS-COUNTRY MUST TEST ACTUAL EVENTING ABILITY, FITNESS, PACE AND TECHNICAL EXECUTION.**

**EVENTING FINAL PLACINGS MUST USE THE LOWEST TOTAL PENALTIES.**

**PLAYER AND NPC HORSES MUST FOLLOW THE SAME FORMULAS.**

**PRESERVE ALL EXISTING HORSE GENETICS, SKILLS, LEARNED BEHAVIORS AND RECORDS.**

**DO NOT REBUILD STANDALONE SHOWJUMPING.**

**DO NOT CHANGE QUICK COMPETE'S ONE-CLICK WORKFLOW.**

**PRESERVE EXISTING SAVES AND FAST TIME SKIPS.**