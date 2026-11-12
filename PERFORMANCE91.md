# Ranking populations and time skips

Each age/discipline ranking has 50 simulated NPC contenders when no owned rider qualifies and 100 when a rider qualifies. National categories use separate pools for each country. When a rider leaves, the best 50 remain. Newly eligible categories add five zero-point competitors per game week until reaching 100. Reopening a board does not grow its pool. Player rows do not consume NPC slots. Horse/combination and compatible series boards reuse the appropriate underlying pool rather than generating duplicate actors.

These are competition candidate limits, not merely display limits. Existing historical NPC identities remain in saves. Actual nominated squad members can enter the bounded team pool. Main squad contenders can replace zero-point world standbys at a limited weekly rate, without receiving points on entry.

NPC ranking points and qualification evidence now come from actual calendar competitions. Hidden weekly circuits, opening seeds and auction seller backstories cannot award ranking progress. Auction horse history, earnings and experience remain intact, but generating that history no longer advances ranking rivals. Old personal player standings without a result ledger are preserved until normal expiry; unbacked NPC standings are removed.

## Performance

Measured in local headless Chromium, same baseline commit and seeded benchmark sequence. These are click-to-result timings; verified background saving is checked separately. The large fixture adds 10,000 synthetic historical records. The migrated fixture also restores the old approximately 6,600-rider roster.

| Fixture | Before: day | After: day | Before: month | After: month |
| --- | --- | --- | --- | --- |
| Normal career | 0.36–0.52 s | 0.07–0.30 s | 0.91–1.36 s | 0.46–0.80 s |
| Large history / migrated roster | 0.89–1.16 s | 0.39–0.83 s | 1.87–2.37 s | 1.03–1.49 s |

The main costs were repeatedly cloning and scanning complete result histories, checking thousands of candidates for each event, generating hidden ranking events, and rebuilding calendar templates. Workers now reuse unchanged histories with explicit patches; result indexes reuse finalized ledgers; programme templates are cached with independent mutable event objects. Actual competitions, horse care and manager training still run. Very large saves, many managed horses, colder workers and slower devices can exceed these measurements; this is not a universal one-second guarantee.

The calendar startup failure came from legacy saves missing application/season history arrays. Calendar and federation renderers now tolerate those omitted arrays.

## Verification and maintenance

Targeted coverage includes actual pool sizes, country/age/category transitions, gradual weekly growth, no backdated rewards, actual-calendar-only points, legacy player standings, auction history isolation, calendar startup after reload, cached/full worker state parity, save failure/retry, cancellation and verified reload. Federation progression and rider-life simulations exercise trials, team starts and Games qualification. Selected evidence is in validation91; the entire historical npm test suite was not rerun.

Clock workers observe additions/deletions/replacements of finalized meet records without recursively proxying every old record. In-clock result repairs must replace the meet object, or use the default deep observer. Main-thread deep repairs are detected by input fingerprints before the next skip. Migration occurs before observation. The generic observer still supports nested mutations and is separately tested.
