# Training 2.0 additive extension

## Changes

The existing lesson and course builders, core scene wording, clinic, trait generation, horse attribute identities, inventory, fitting and competition systems are retained. New behavior lives in `training2-extension.js`, with narrow hooks in the existing attempt/gain engine.

- Exact flatwork, dressage, jumping, Hunter, Eventing and lunging attribute mappings; primary/secondary/tertiary Main Goal multipliers of 1.30/1.15/1.05, once per relevant earned gain.
- New named blocks reuse existing skill fields, education prerequisites, durations and locations. Voice education from lunging is separate from ridden leg/rein education.
- Correct, minor, partial and learning-producing technical outcomes use attribute multipliers 1/.8/.5/.2. Gains retain precision and display one decimal. Each attribute caps at .15/session. Additional Willingness, waiting-related Patience and qualifying Recovery have their specified separate bounds.
- Familiar easy Confidence work earns 25% of nominal progress; new manageable challenges use 110%. Recovery requires actual manageable tension, settling and successful resumed work.
- Side Reins provide 5% relative Balance and 3% Focus learning only for suitable, comfortable setups. A surcingle alone gives no extra attribute gain. Inventory remains authoritative.
- Jump refusals extend the existing resistance check, with 12% ordinary and 22% unfamiliar challenging caps. Three refusals at an unchanged obstacle require modification. Automatic work simplifies refused fences.
- Contextual spooks, triggered bucks, bolts and rare rears share one major incident resolution. One conditional stability decision follows the final continuous incident category. Falls end mounted work, preserving prior earned progress. Rearing stops ridden work even without a fall. Horse injuries remain in the existing separate veterinary exposure pipeline.
- All 158 supplied literal supplemental templates are retained, with context predicates or preparation, recovery, incident and report hooks. Eligible variants supplement the original scenes. No claim is made that every rare narrative branch has been manually observed in a browser.

## Daily weather and arena activity

The existing seasonal weather generator and weights remain authoritative. Each in-game day has a persisted weather record, with small daily temperature/wind variation. A daily refresh can legitimately retain the same weather category. Month skips process the elapsed dated records chronologically.

Arena busyness is randomized among Quiet, Ordinary and Busy per facility/day, with equal weights because no distribution was specified. It is displayed, not selected. Reopening, choosing a different horse or reloading does not reroll that facility's conditions.

## Validation

103 grouped checks pass: additive extension 19, existing Training 2.0 26, management 24, quality of life 9, calendar 9, pasture 16. Seeded samples cover the fourteen conditional fall categories, spook severity and rare rearing, alongside the prior probability tests. Integration checks cover actual refusals, safe automatic simplification, no duplicate incident/fall decisions, prior-gain preservation, report/save identity, lunging education, caps, and daily/monthly chronology.

Browser smoke check on a separate test origin: goal selection, existing builder and warm-up, two real ridden attempts, report with Main Goal relevance/progress, Next Day, Next Month and reload. The displayed weather changed from Cold/Clear to Heavy Snow to Cloudy, arena activity changed with the in-game dates, and no console errors were recorded. The player's existing browser stable was not edited.

Run all six suites with Node, including `node tests/training2-extension.test.cjs`. The tests verify configured mechanics and selected end-to-end paths; they are not an exhaustive manual playthrough of every possible incident sequence.
