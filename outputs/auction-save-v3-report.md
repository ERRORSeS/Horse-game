# Auction and Save System 3 implementation report

1. Market now renders international collection cards, paginated lots, detail pages, watchlists, bids, contracts, incoming horses and history.
2. Sales implementation files and its purchase workflow were not edited. Existing Sales regression checks are included in the full suite.
3. Two concurrent collections are generated every two game months, using weighted collection themes and persistent lots.
4. Each collection contains 8–35 horses, per the later browser request. New lots have 1–3 NPC bidders and at most five scheduled bid opportunities. Older prototype saves retain their existing schedules.
5. Horses use the existing base generator, pedigree and medical engine. Quality selection chooses among generated candidates without changing their genetic ceilings. Candidates are bounded to 32 attempts; the closest candidate may be used. No invented competition results are added.
6. Seller assessments persist per discipline: 60% close, 20% optimistic, 15% conservative, 5% inaccurate, clamped to available levels. Exact underlying ceilings are not shown.
7. Breed does not restrict discipline. Current Training and future assessments show discipline-specific levels.
8. NPC events have persisted timestamps and cursors, processed only when game time advances. Reloading and browsing do not reroll them.
9. Bids enforce incremental minimums, available funds, reserve, open/close times and one current leading bid. Leading player funds are held; outbids release the hold.
10. A win creates a persistent contract. Signature, itemized payment, documentation and booking are required. Repeating payment does not charge twice.
11. Country determines shipping category and duration. Arrival requires observation/staff, unloading, the included medical assessment and an empty stall. Delivery transfers the actual generated horse once, preserving its attributes and medical state.
12. Saves receive crypto-generated IDs, verified IndexedDB writes, local lookup, names and separate stable records. Legacy saves migrate without claiming cloud availability.
13. No cloud backend is configured. The short OXER ID identifies locally accessible data and cannot retrieve a remote device's save by itself.
14. Portable OXER3 codes contain the complete snapshot, use gzip where supported and validate a checksum before importing. JSON export/import is also available. Portable textarea contents are excluded from saved UI selections to prevent recursive growth. “Your Save” and recovery controls can be expanded/collapsed in Settings.
15. Initial rendering now mounts only the active panel. Auction events use scheduled cursors, lists show eight lots per page, notifications and histories are bounded. Browser writes are debounced and use IndexedDB without the legacy synchronous compression step.
16. See performance measurements below. These are VM simulations with legacy synchronous compression, not browser IndexedDB timings. No browser latency target is claimed from those measurements.
17. Portable browser fixture code was about 105 KB including active lots and four owned horses. This is an example, not a controlled before/after size comparison.
18. Automated checks cover bounded collections, stable saved potential, winning through skipped time, escrow, idempotent payment, same-horse delivery, country shipping, independent save IDs, portable import into empty storage, damaged-code rejection and rollback after invalid imports.
19. Browser checks completed bidding, winning, signing, payment, shipping, arrival assessment and delivery of Sakura Gloria. Reload retained four horses. A separate IndexedDB database restored the portable code to the same ID, Day 1 Month 2 Year 1 and $384,155, including Sakura Gloria, then retained it after reload. “Your Save” was opened and closed successfully. No browser errors were captured in the recovery check.
20. Limitations: portable codes are snapshots, not ongoing sync; generate a fresh code after playing. Old codes restore old progress. No real video assets are provided. Optional additional pre-shipment PPE has no dedicated auction control. Completed collection archives retain compact summaries rather than full historical horse details. Tests do not establish every mobile device/browser combination or certify every requested performance target.

## Performance measurements

25 horses; median of three runs; DOM excluded. The original and updated game both use the benchmark’s in-memory legacy compression path. Updated runs include cold auction generation. Runs were sequential; other regression processes may still affect wall time.

| Action | Before (ms) | After (ms) |
|---|---:|---:|
| hour | 449.54 | 1607.61 |
| day | 372.66 | 1216.58 |
| month | 1972.24 | 1294.6 |
| threeMonths | 3354.32 | 3579.54 |

The day/hour cold paths exceed the requested targets and need further profiling. The browser IndexedDB path avoids legacy compression, but no controlled before/after browser timing was captured. `npm test` completed successfully on the final implementation.
