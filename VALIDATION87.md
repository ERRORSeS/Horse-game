# Fast month skipping and three-auction limit

This update supersedes the eight simultaneous catalogs in update86. Each cycle now shows at most three catalogs; all eight themes rotate over successive cycles. Existing extra catalogs are queued for later cycles with their horse identities, accepted bids and bidder schedules preserved. Catalogs with player bids receive priority in the first three. When a deferred catalog activates, its preview/open/close and pending bidding schedule move together. Bid history and prices remain intact. The market indicates queued catalogs, and the save validator checks their lot references.

Month skipping now uses prebuilt country/region indexes, skips geography work for distant historical bookings, registers new auction horses directly instead of rebuilding the world registry for every lot, and reuses a registry during catalog closure. Bounded ID-seed caching and a Unicode-compatible hash loop reduce deterministic scoring work without changing random rolls. Calendar progression, actual competition scoring, weekly rankings, care and auction purchase rules remain enabled.

## Browser measurement

`npm run benchmark:month-skip` runs three actual month-button clicks with Rider Realism, Career Progression, background events and two watched ranking categories. It measures simulation/render separately from verified IndexedDB saving. Chromium was run locally against main (7bac4dd) and this worktree. The same benchmark setup was used; generated populations and timings vary between fresh browser sessions. These are measured examples, not a universal 90% guarantee.

| Month skip | Main simulation + render | Optimized simulation + render | Reduction | Optimized including verified save |
| --- | ---: | ---: | ---: | ---: |
| 1 | 6,275 ms | 1,250 ms | 80% | 2,683 ms |
| 2 | 4,343 ms | 1,023 ms | 76% | 2,083 ms |
| 3 | 5,523 ms | 598 ms | 89% | 1,448 ms |

No browser page errors occurred. Saving remains asynchronous and adds about 0.85–1.43 seconds in this run. Large existing saves can still take longer; the simulation remains synchronous.

## Correctness

A deterministic two-month Node simulation with fixed time compared the complete saved state before and after the performance changes, temporarily retaining the old eight-catalog count to isolate optimization from the requested gameplay change. The complete 32,698,028-character saved state was identical.

Passing checks:
- Four targeted performance checks: every country/name/alias, custom region overrides, distant/continental booking boundaries, bounded seed caching, Unicode hashes and unchanged show rolls.
- Auction cap and migration checks: three catalogs, all eight rotating themes, legacy five-catalog queue, accepted bids, shifted schedules and horse IDs surviving save/reload.
- Auction variety, pricing, balance, youngstock and auction save/import/delivery suites.
- Existing rider/travel, career index, update85 ownership/multiple-mount/manager checks, and ranking age-limit checks.
- 47 medical recovery/veterinary/realism tests.
- Chromium auction UI/history/bidding/pony-height checks and three month skips with real saving.

The entire npm test suite was not run.
