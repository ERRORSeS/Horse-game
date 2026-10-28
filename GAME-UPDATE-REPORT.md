# Oxer to Oxer — implementation and validation report

Current saving behavior (28 October 2026): The user's follow-up supersedes the multiple-save and historical-backup interface described below. The header now has one **Save** button and a live saved/failed message. Manual saves, action autosaves and the three-month interval update the same complete stable record; startup restores it automatically. Named-save selectors, Load/Delete controls and extra backup/import/export menus have been removed. Existing current-session, named-only, quarterly-only and pre-care saves remain readable. Source records remain untouched during loading; obsolete copies are retired only after a complete replacement has been written and read back. When duplicate records exhaust quota, saving can atomically replace a larger legacy record first, then retire duplicates without deleting the last valid save before a successful write. Legacy migration no longer requires another full duplicate before hydration. A corrupt old duplicate cannot block a valid preserved save. Truly full/unavailable storage reports failure and retains the prior save.

The exact reported failure did not reproduce in the available preview: the old button reported success. The new browser workflow was checked by saving the existing Month 6 / $32,077 stable, refreshing, and observing the same date/balance with automatic restoration and no console errors. Dedicated tests exercise actual compressed storage quotas, fresh-runtime restoration, failed-write preservation, pre-care loading without a duplicate backup, corrupt compressed duplicates and the single-button UI. Integration assertions for named snapshots and separate quarterly copies were replaced with checks for the newly requested single-record behavior. The original implementation report below describes the previous expansion and is retained as history.

Implemented on branch `codex/complete-game-expansion-20261028`, based on `7979010e49e0624b30c6de94b69856767b882d91`. The update includes the original brief and the subsequent browser comments: independent care switches, named horse/rider entries, integer percentages, riding styles, Calendar NPC counts and jump-off markers, size presets (Small 12–20, Medium 20–27, Big 25–33 total riders including the player), and HH:MM show clocks.

1. **Saving failure.** The game deducts monthly boarding without clamping the stable balance, so debt is valid game state. `validatePersistentState` rejected every negative balance, preventing manual saves, session saves, imports and quarterly backups for indebted stables. The validator now accepts finite signed balances. A regression generates actual boarding debt through `monthlyProgress`, saves it, reloads it and checks horse IDs and the exact balance. `commitSaveValue` also restores the previous value after an unsuccessful write/readback check. Success follows confirmed persistence. A successful save timestamp, versioned export/import, import validation and preserved quarterly backups are available. Changed script assets have content hashes to prevent outdated cached implementations.

2. **Slow time skipping.** Profiling found repeated legacy training-schedule imports normalizing the same horse and rechecking medical state every hour even when the imported focus had not changed. The import wrapper now returns early for an unchanged focus without pending medical restoration. The underlying hourly processor, daily/monthly medical processing, pasture behavior, scheduled training, soundness and monthly Bond/QOL logic remain in place. No simulated hours or required systems were removed.

3. **Fever deadlock.** Investigation conditions previously entered a daily path with ineffective care and could never reach `finish`, which explicitly returned for investigations. Fever now has its own saved observation pathway. Its diagnostic branch is selected once (30/25/15/10/15/5 percent), compatible existing causes take priority, and relevant bloodwork or respiratory assessment can identify a real underlying condition and create its scheduled plan/prescription. Without an identified cause, the daily clinical distribution is 65% improving, 25% stable, 8% mildly worsening and 2% significantly worsening. Monitoring can lead to resolution without a definitive diagnosis. Existing episodes enter this pathway without deleting their histories or horses. Weight-loss and other medical pathways retain their prior behavior.

4. **Training gains.** Completion rewards require a selected existing jumping/dressage skill, at least three recorded exercise attempts, at least two qualifying outcomes, at least eight exercise minutes and at least two attempts relevant to the focus. The base skill draw is +1/+2/+3/+4/+5 at 15/25/30/20/10 percent. Very easy work uses a 0.75 modifier; otherwise Slow Learner uses 0.85. The resulting target is rounded and bounded to 1–5, then reduced by progress already earned during that session and the horse's discipline ceiling. Thus completion tops up actual work instead of double-paying it. One relevant attribute has a 0.1/0.2/0.3/0.4 target at 30/35/25/10 percent, less its already-earned session progress and remaining room below 10. Sensitivity to Aids receives no new reward. Empty sessions, report views and duplicate completions cannot trigger the reward. The existing Training 2.0 RPG and per-attempt learning remain intact.

5. **Tack Shop additions.** Grooming & Coat Care uses the existing `careEconomy` inventory, receipts and transaction keys. Existing Hoof Pick and Hoof Brush stock is reused. All 26 products are available:

| Product | Game price | Type |
|---|---:|---|
| Rubber Curry Comb | $12 | Reusable |
| Dandy Brush | $16 | Reusable |
| Soft Body Brush | $19 | Reusable |
| Face Brush | $13 | Reusable |
| Mane Comb | $11 | Reusable |
| Tail Brush | $14 | Reusable |
| Hoof Pick | $8 | Reusable |
| Hoof Brush | $9 | Reusable |
| Grooming Sponge | $9 | Reusable |
| Sweat Scraper | $14 | Reusable |
| Equine Shampoo | $24 | Consumable |
| Mane & Tail Shampoo | $29 | Consumable |
| Equine Conditioner | $27 | Consumable |
| Detangler | $18 | Consumable |
| Plaiting Bands | $9 | Consumable |
| Braiding Thread | $12 | Consumable |
| Mane Scissors | $23 | Reusable |
| Mane Trimming Comb | $15 | Reusable |
| Tail Trimming Scissors | $25 | Reusable |
| Mane & Tail Styling Kit | $48 | Reusable |
| Grooming Box | $35 | Reusable |
| Tack Sponge | $8 | Reusable |
| Leather Cleaner | $18 | Consumable |
| Leather Conditioner | $21 | Consumable |
| Synthetic Tack Cleaner | $16 | Consumable |
| Soft Tack Cloth | $7 | Reusable |

6. **Everyday grooming and hair care.** Horse profiles provide brushing by region (including an accessible button and pointer-drag surface), wetting/shampoo/rinsing/scraping, detangling, conditioning, mane/tail combing, cutting/trimming, braids, removal and natural styles. Cutting checks tools, previews the chosen length and asks for an in-game confirmation. Browser QA bought $23 mane scissors, cut an ordinary-day mane from 30 cm to 12 cm and verified the length after refresh. Hair lengths, styles, dates, condition, tangles and per-region cleanliness/soap/wet state persist. Growth uses elapsed days and a saved cursor, with seeded per-horse monthly rates in the requested ranges. Tack cleaning selects an owned item, its actual material and a relevant area, then supports inspection and completion; cleaning does not repair condition. Settings independently disable mane/tail care, horse cleaning and tack cleaning while preserving stored data.

7. **Travel and arrival implementation.** `showTravelChoice` persists entry → planning → horse preparation → observation at loading → loading decisions → departure → journey checkpoint → arrival queue → check-in → stall allocation → unloading → walk to stable → stall inspection → settling → exploration → permitted practice → final preparation. Home shows go directly to preparation. Familiar venues retain visits/experiences and shorten familiarization. Booking, loading, delays, rest, settling and practice affect the session clock, fatigue, stress and readiness. Transport and return transport have separate idempotent receipts; existing Calendar transport credit is respected. Owned transport is offered only when eligible transport is recorded. Fixed Calendar dates reject impossible itineraries. Show clocks are separate from calendar skips and display whole HH:MM; configured event phase schedules can set phase times. The existing course-walk, warm-up and discipline choices remain playable.

8. **In-session scoreboards.** `showPlayerResult` computes and stores the player's result immediately, with provisional rank, finished and remaining counts. `showNextCompetitor` processes saved NPC entries in start order and refreshes the board. Fast-forward loops over competitors, never `Skip Day` or `Skip Month`. Browser QA completed a dressage performance, saw four finished entries and eight remaining, fast-forwarded to twelve finished and final standings, all on Day 1. NPC horse/rider names, IDs, skills, scores and start orders persist. Calendar and ordinary creation offer Small (12–20), Medium (20–27) and Big (25–33) total-rider presets, plus Custom NPC counts. Generated Calendar fields use a saved draw from the venue-size range; opening a menu does not reroll it. NPC count is total riders minus the player entry. Existing numbered fields are migrated to stable names. Final results are recorded before prizegiving and before returning home. Prizegiving has separate invitation, presentation, award and conclusion actions; transactions and entry IDs prevent duplicate awards.

9. **Showjumping and jump-offs.** A jump-off occurs only in a configured jump-off class when at least two valid zero-penalty combinations qualify. It uses four playable efforts from the existing course choice system. Conservative/Balanced/Competitive/Aggressive styles multiply mistake and rail risks by 0.80/1.00/1.15/1.35 and effort times by 1.12/1.00/0.92/0.84. Route intent and actual effort outcomes also affect calculated time. The saved whole-round pole plan is not rerolled by opening menus or changing style. The same style controls are available in ordinary rounds. Test coverage exercises qualification, four actual jump-off choices, immediate scoring, NPC continuation, final standings, risk ordering, timing and integer chance displays summing to 100. Existing Puissance wall rules are preserved; configured NPCs have separate horses/tack, and current-date wall classes have live round controls, results and prizegiving without a calendar skip.

10. **Hunters.** Scores use rhythm, smoothness, jumping form, distances, straightness, flow, rider quietness and presentation, with judge comments. Time is not used as a hunter race score. Highest valid judged score ranks first. The integration test persists the provisional result, reloads it, finishes the NPC field and verifies a single permanent result/award.

11. **Dressage.** Each performed element receives a movement mark and comment, with a coefficient on the final element; the percentage is calculated from the weighted marks. The leaderboard orders valid percentages highest first. A browser-observed inverted ordering was corrected and has a dedicated regression. Partial/retired performances retain their observed marks and elimination status.

12. **Eventing.** The existing prompt order remains dressage → cross-country → showjumping. Each phase produces an immediate result and an NPC standings sequence before the next phase begins. Dressage contributes `100 − percentage`; XC and stadium contribute actual jumping and time penalties. Totals accumulate and lowest valid total wins. Separate phase records survive reload. The regression verifies phase order, immediate phase scores, a 20-penalty XC effort, four stadium faults and the exact cumulative total, with no calendar-day change. Eliminated combinations cannot resume later phases.

13. **Saving and migration validation.** Tests cover named snapshots versus session/quarterly saves, zero balances, actual boarding debt, failed quota writes, malformed slot stores, storage readback, previous quarterly recovery, calendar rollovers, unsupported imports, legacy care migration, roster IDs, veterinary treatment progress, training data, hair, inventory consumption, active travel, active show identity, NPC names, final results and independent care settings. Current-date Calendar entries can open the live show directly; future entries remain queued until due. Queued entries retain their original identity when migrated into live sessions.

14. **Benchmarks and browser validation.** Median of three runs per action, using a seeded 25-horse stable and Node 22.16.0 on this desktop. Measurements include chronological simulation, serialization, compression and verified in-memory storage; browser DOM rendering and physical storage I/O are excluded. These are measurements, not a universal hardware guarantee.

| Action | Baseline | Updated | Reduction | Brief target |
|---|---:|---:|---:|---|
| Skip Hour | 240.70 ms | 153.88 ms | 36.1% | Not met (150 ms) |
| Skip Day | 211.52 ms | 132.87 ms | 37.2% | Met (400 ms) |
| Skip Month | 1155.64 ms | 450.03 ms | 61.1% | Met (1500 ms) |
| Advance 3 months | 3290.61 ms | 1187.10 ms | 63.9% | Met (4000 ms) |

The hour target was narrowly missed; the day, month and three-month targets were met in this harness. Browser checks used 1280×800 and 390×844 viewports, with no horizontal overflow at either size. A choice resolved at the narrow viewport. Browser console inspection returned no errors during the checked workflows. Physical mobile touch hardware and other browser engines were not tested.

15. **Files and functions changed.**

- `save-fix.js`: signed-balance validation, confirmed-write rollback, timestamp and portable-save functions/UI.
- `auto-training-fix.js`: unchanged-focus import guard.
- `health-engine.js`: fever observation/diagnostic/daily evolution functions and relevant-exam integration.
- `medical-recovery.js`: fever's clinical probabilities and recovery description.
- `discipline-progression.js`: `completedFocusReward` and the completion wrapper, with bounded duplicate-reward IDs.
- `grooming-expansion.js`: shared shop stock, everyday grooming/hair/tack functions, profile controls and Settings switches.
- `show-session.js`: persistent travel, preserved RPG normalization, live scoring, field generation/names, styles, scene progression, event phases, prizes/return, Calendar configuration/markers and live Puissance controls.
- `showjumping-round.js`: optional multiplicative risk argument; default behavior remains unchanged.
- `game-narratives.js`: all 272 supplied narrative lines and placeholder substitution.
- `calendar-equipment.js`: NPC-count and jump-off form inputs/binding.
- `index.html`: load the new modules and version changed assets by content.
- `package.json`: include expansion checks and the reproducible benchmark command.
- `tests/expansion.test.cjs`, `tests/benchmark-expansion.cjs`: targeted integration checks and measurement harness.
- `tests/integration.test.cjs`: exact required failure wording.
- `tests/medical-realism.test.cjs`: retain the investigation gate test for weight-loss; fever's new behavior has separate tests.
- `tests/regression/management.test.cjs`: add the missing DOM `querySelector` mock for current-date Calendar navigation, retaining its assertions.

**Protected-file verification:** `script.js`, `care-fixes.js`, `care-sales.js`, `behavior.js`, `tack.js`, `management.js` and `pasture.js` are byte-for-byte identical to the starting commit. This includes the Bond/QOL calculation, monthly calculation, levels, percentages, existing reward logic and care integration. No new Bond/QOL reward calls were introduced. A regression compares Bond and QOL before and after new grooming and competition awards. SHA-256 evidence is in `protection-audit.json`.

16. **Remaining practical limits.** The save backend remains the established compressed browser storage, so genuinely unavailable/full browser storage reports failure and preserves the previous valid save; export provides a portable copy. The hour performance goal is not claimed as met. Browser QA covers the desktop in-app browser at desktop/mobile widths, not every browser engine or physical touch device. Two-phase jumping formats were not added where the original game did not support them. Eventing phase schedules can be supplied through event data; no separate multi-day phase-schedule editor was introduced. The show-session clock records logistics/competition progression independently of the stable calendar, as required for results without calendar skips.

Follow-up: Grooming & Coat Care is now a category inside the Tack Shop sidebar, using the existing shop header, product selector, option grid, prices, swatches and purchase controls. Brushes, combs, hoof picks, sweat scrapers and grooming boxes offer twelve colors. Other products use fixed defaults (silver scissors, yellow sponges, black styling kit, white supplies). Colors persist on care inventory rows and receipt lines, appear in grooming tool labels, and do not alter prices or care effects. Legacy stock receives a display default without being deleted. A regression covers multiple colors, quantities, duplicate purchase IDs, invalid variants and export/import persistence. Browser QA verified the integrated category, Lilac swatch and fixed White shampoo default.
