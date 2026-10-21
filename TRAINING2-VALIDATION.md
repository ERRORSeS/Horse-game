# Training 2.0 implementation and validation

The existing game is extended by `training2.js`; the field audit is in `TRAINING2-AUDIT.md`. Existing horses, discipline potentials, veterinary records, purchased facilities, competitions and inventory are retained. Migration adds persistent values rather than rerolling on load.

## Probability safeguards

Relevant traits use one primary modifier and half a secondary, combined with one contextual personality modifier and capped at ±12 percentage points. Attribute contributions use primary/half-secondary (quarter-third for complex work), capped at ±8 pp. Ordinary events cap at 30%; distraction at 22%, overreaction at 18%, frustration at 25%. The shared interruption distribution also caps at 30%. Quality outcomes normalize to 100%. An interrupted attempt does not continue rolling every other negative event.

The calculation drawer exposes candidate and bounded probabilities. Low Confidence, low Focus, Spooky personality, wind sensitivity and unfamiliar surroundings therefore cannot accumulate unrestricted failure probabilities.

## Playable systems

Training preparation leads to an editable lesson, actual warm-up, player-controlled attempts, adjustments, breaks and a report. Courses store individual fences and resolve obstacles separately. Attributes, 55 contextual traits, familiarity, learned habits, session RNG, lesson plans, schedules and course edits persist. Quick, automatic and interactive work share progression limits. Indoor/outdoor weather effects use no facility-star bonuses.

The update also integrates actual riding-time reservations, a single session incident-to-injury pipeline, current mood factors, physical Likit flavors, live nameplates, rugs and named tack sets. Turnout rugs remain separate from riding sets. Medical restrictions override activities. Existing clinic and competition logic remain in place.

## Explicit implementation choices where no numeric rule was supplied

- Ordinary warm-up minimum is 6 minutes; jumping requires 10, including 4 trot and 2 canter minutes. Older or substantially fatigued horses require additional preparation.
- Excess oxer width contributes 1 pp per 10 cm beyond fence height, capped at 4 pp. The listed oxer exercise base and separate +2 pp setup adjustment are both represented.
- Relevant front/hind rail checks divide a bounded exercise-derived rail probability; rail traits do not modify unrelated failures.
- The 0.15 permanent riding-attribute gain limit is applied to the combined session gain. Existing monthly stamina-based learning limits remain authoritative alongside the new 1.2 normalized session skill cap.
- Previously broken adult horses with zero legacy behavior are recognized as educated for basic work without rewriting their historical behavior field.

## Validation

84 grouped automated checks passed: Training 2.0 (26), management (24), quality of life (9), calendar expansion (9), pasture (16). Tests cover all attributes, personalities, 55 trait contexts, required exercise definitions, seeded probability sampling, progression bounds, old saves, export/load, weather, schedule/time-skip equivalence, inventory identity, medical safeguards and 20/50/100-horse scheduled workloads. Existing pasture tests include a large-stable month simulation.

Browser smoke check used a separate fresh local test origin, leaving the player's current stable untouched. A purchased adult completed preparation, lesson building, warm-up, two Large Circles attempts with a direction change, and a report recording 14 minutes, actual gains and fatigue. No browser console errors were recorded. This is a focused browser check, not an assertion that every possible manual sequence has been played.

Run the suites with Node:

```
node tests/training2.test.cjs
node tests/management.test.cjs
node tests/quality.test.cjs
node tests/calendar-expansion.test.cjs
node tests/pasture.test.cjs
```
