# National team career progression and performance — implementation report

This extends the existing National Teams 8.2, competition ledger, Horse Manager and game clock. It does not create a separate federation clock or replace Quick Compete.

## Selection and careers

1. **Why two wins could fail selection.** The previous plan defined one trial and read only that event ID. It gave trial form 10% of the old selection calculation and returned an already-created season without reassessing finalized results. Development and Reserve members were also excluded from team entry. The update creates two distinct official rounds, reads both exact combinations, amends stale decisions, and exposes the actual evaluation. Two wins still cannot override medical/age/nationality restrictions or limited places.

2. **Actual calculation.** Every eligible player and NPC uses trials 40%, recent results 20%, horse suitability/proven level 15%, rider ability 10%, correct age/national ranking 10%, and consistency 5%. These replace the previous weights. A cycle with no configured trials normalizes the remaining 60% to 100%. Each trial contributes equally; a missing/invalid round contributes zero. Trial evaluation incorporates placing (65%), discipline-specific performance (25%) and recorded field strength (10%), adjusts placing for actual starters, and checks the competed level against the trial level. Recent results use up to five equivalent weighted top-ten finishes over the prior game year; consistency counts top-ten finishes against all started relevant results, including eliminations. Suitability combines current discipline readiness (70%) with the highest recorded completed level relative to the selection level (30%). Ranking is read from the real ledger at the evaluation cutoff, not a future release. Mandatory eligibility checks remain hard requirements.

3. **Stored trial evidence.** The existing `career.meets[eventId]` retains results, rider/horse IDs, discipline, division, country, completion, placing, score, starters and finalized time. New metadata identifies the federation cycle and round, programme status and actual field strength. Both round IDs and their evaluated evidence are retained in applications and season reviews. Unrelated trials, another horse/rider, sandbox results, wrong nationality/division, eliminations and future/unfinalized results cannot count. Legacy cycles retain their single configured trial and previous decision; an old record without field strength uses the disclosed neutral value 60 rather than invented field data.

4. **Explanations.** The National Teams drawer shows each actual factor, weight, counted/not-counted trial, total, candidate position, number of candidates, main-squad capacity, stage, next review, highest proven level and factual reason. Ineligible combinations retain their scored evidence where available. Missing profile data, underage riders, missing horses and medical/ownership restrictions have distinct messages. The current candidate list and changes are inspectable.

5. **Squad roles.** The same scored pool fills five Main, three Reserve and up to eight Development places. Main requires full selection eligibility and a completed official trial or two recent international top-three finishes; a trial-free cycle has an equivalent results route. Development can use the preparatory level below the trial. Championship nomination is specific to an event and still requires that event's qualifications; Main status is not an Olympic entitlement.

6. **Useful competitions.** Each discipline/division has six annual Development/Reserve legs and six Main preparation legs, spread across months. Development/Reserve includes three individual cups and three team challenges; individual cups avoid requiring a four-rider national team just to compete. Main has six Nations Preparation Cups plus eligible existing international fixtures. Classes use division-appropriate levels, actual entry, opponents, scoring, result writing and points. Individual/tour and team standings use real completed results; preparatory events do not fabricate world points or free ability gains. Ordinary shows remain available. The first selection season cannot field squads before they exist; these early programme fixtures record that cancellation reason. Established seasons span the subsequent early-year legs.

7. **Promotion, demotion and replacements.** Selection runs after both rounds, in months 9 and 12, and before relevant events when an actual vacancy is detected. There is no minimum tenure; new evidence can move Development or Reserve directly into Main. Losing eligibility can remove a place. Before allowed deadlines, an actual unavailable/withdrawn nomination can generate an eligible reserve/development replacement offer. Registration explicitly accepts it; accepted replacements remain accepted after the deadline and through reload. Medical/event qualifications still apply. Pending player trial invitations and registered shows stop a skip that would cross their start until completed or explicitly declined/withdrawn.

8. **NPC careers.** Candidates are existing persistent riders and their actual current horses, with the same scoring, age, nationality, result and medical rules. No replacement athletes, results or bonuses are fabricated. Foreign federation squads are evaluated lazily for relevant international events and periodically reassessed before later appearances. Histories record role changes and reasons, reviews retain trial IDs and candidate counts, and dated roster snapshots prevent a later review from rewriting an earlier event's roster.

## Performance and persistence

9. **Observed costs.** Profiles identify actual training attempts, NPC fields/results, weekly rankings, auction processing and full-save serialization. On long careers, structured cloning the growing world to/from the worker and preparing/writing the complete save become larger costs than simulation. This is measurable work, not an animation delay. Detailed measurements accompany this report.

10. **Before/after timing method.** `tests/federation-performance90-browser.cjs` runs Chromium against the base revision and this revision, with an enabled career, GBR rider, populated youth/national boards and approximately 6,600–7,000 persistent NPCs initially. It creates Year 5/10 by actually advancing months, retaining the ledger. It measures worker simulation, click-to-applied-result, complete verified save, UI heartbeat and longest observed heartbeat gap. First-use and warm-worker samples are reported separately by fixture; the shared host produces timing variance. No fixed percentage reduction or universal one-second guarantee is claimed.

11. **Normal and large saves.** Both four-horse and thirty-horse stables are measured at Years 1, 5 and 10. Long histories are not truncated to produce attractive numbers. See the timing table below, including device-write failures on the base version where encountered.

12. **Optimizations.** One transient due-event agenda reuses the real calendar and orders care, competition completions, ranking releases, monthly payments/markets and federation checkpoints. It avoids regenerating the same schedule for every due event. Candidate batches share fresh ranking calculations at a timestamp, invalidated by every result write. During an atomic scheduler call, the result index validates once per actual ledger write rather than rescanning every historic meet for every candidate; external repairs still trigger validation outside the batch. Trial metadata lookups and deterministic invited-country lists are reused. Federation scans run at decisions instead of every hour. Large saves now compress in the encoder worker, avoiding transfer of the complete JSON string to the UI. Identity checks read stored metadata without expanding the previous payload. Readback compares the actual compressed bytes exactly, avoiding another full decompression; load reuses that verified encoded record. Existing worker reuse, result deltas, active-panel rendering and idle autosaves remain in place.

13. **Loading UI.** Time skips use a small inline live status and Cancel button. There is no modal dialog, backdrop, blocking loading overlay or artificial delay. Navigation, scrolling and disclosures remain available, and the chosen view survives worker completion. Conflicting gameplay mutations wait for the atomic advance. Cancellation/failure keeps the original state.

14. **Accurate scheduling.** The existing hourly pasture/care hook is preserved, including clinical progression, market activity and actual manager attempts. Career work is interleaved at due timestamps on that same clock, before decisions that depend on it. Selection cannot see later-in-month results. Existing meet IDs, receipt operation keys and processed decision tokens prevent duplicate results, payments, appointments and selections. Weekly ranking publication remains every seven game days.

15. **Save/load and consistency verification.** The new composite checks cover official two-round results, actual non-selection, formula equality, identity/cutoff exclusions, amended decisions, squad entries, promotions, demotions, NPC horse availability, real programme credits, legacy migration, explicit decisions, accepted substitutes and external index repairs. A fixed clinical-policy fixture compares month, 30 days and 720 hours for selection, reviews, manager operation keys, receipts, persistent original partnerships and clock position. Browser tests register both rounds through actual buttons, win through the real scoring/result writer, enter Development and Reserve fixtures, save and reload. Scripted junior/adult rider lives reach real national-team starts and Games entry without forced qualification flags. Worker hour/day/month/year-rollover results are compared with direct simulation; cancellation, conflicting-input guards, navigation, encoder failure/retry, in-flight save/load and verified reload are checked. Large device saves are losslessly gzip-compressed above 32 million characters to avoid browser single-value limits; the public save API and exported JSON retain the full original payload. A 40-million-character probe verifies compressed storage, exact readback, listing and reload. Legacy raw records remain readable.

16. **Limits.** Approximately one second is a target for normal simulation, not an achieved upper bound for every world, stable or device. Full world cloning and save serialization still cause measurable pauses on very large histories; compression fixes storage size, not every transfer cost. The inherited clinical engine deliberately has different daily and monthly incident hazard policies. This change preserves them; full random medical outcomes across those two policies are not claimed identical. The scheduler-equivalence fixture uses the same policy to isolate scheduling, while the browser parity tests compare each mode against its own direct simulation. No meaningful training, medical, care, pasture, NPC sale or competition system is disabled for performance. These limits should not be described as “all lag removed.”

## Validation commands

- `npm run test:federation-progression`
- `npm run test:federation-progression-browser`
- `npm run test:responsive-time-browser`
- `npm run test:large-save-browser`
- `npm run test:career-life`
- `npm run benchmark:federation-performance` and `npm run profile:federation-performance`

The targeted regression runs include original federation selection, career result indexing, Horse Manager/NPC updates, ranking schooling/age rules, month scheduling/geography, auction cap, actual competition completion, medical realism, care/sales, save recovery and integration. The entire repository's very long aggregate test command was not run.

## Measured timings

Raw benchmark output is retained in [validation90](validation90). Values are observations from the test host, not minimum hardware requirements or guarantees.

### Large-save optimization requested during validation

The same 218,184,937-character synthetic load fixture (45,153 distinct copies of actual generated meet records; 6,659 persistent NPCs) was saved twice through the previous compressed save path and twice through the final path. This tests save throughput, not career qualification or a freshly simulated ten-year career.

| Path | Verified save 1 | Verified save 2 | Largest observed UI heartbeat gap |
|---|---:|---:|---:|
| Before the final save optimization | 16.29 s | 17.05 s | 3.11 s |
| Final worker compression / encoded verification | 13.87 s | 11.84 s | 1.15 s |

The mean save time fell about 23% on this fixture. Both runs retained the exact record count and checked saved money and rider/horse links. Full JSON export/get remains available; compression changes storage representation, not career content. The separate 40-million-character test verifies exact expansion, listing and reload. The remaining initial snapshot copy can still pause the UI on large worlds. This is an improvement, not a claim that a 218 MB save completes instantly.

### Actual accumulated career worlds

These full-career runs preceded the final save-path optimization above. Years 5 and 10 were generated by real monthly progression, not by changing the year counter. The final save path was subsequently isolated and measured on the identical large fixture above; these older full-career save timings must not be presented as final-path timings.

| World | Stable horses | Base simulation | Initial-fix simulation | Base click-to-result | Initial-fix click-to-result |
|---|---:|---:|---:|---:|---:|
| Year 5 | 4 | 5.63 s | 2.76 s | 16.86 s | 12.97 s |
| Year 5 | 30 | 1.59 s | 1.44 s | 8.31 s | 7.06 s |
| Year 10 | 4 | Target crashed | 9.86 s | Target crashed | 21.15 s |
| Year 10 | 30 | Not reached | 8.54 s | Not reached | 21.69 s |

The Year 5 base world had 15,455 meets after the tested month; the updated world had 16,653, including new programme events. The Year 10 updated world retained 37,081 meets and 7,488 NPCs after the tested month. Base device writes failed at about 141 MB; compressed writes succeeded at about 155 MB (Year 5) and 310 MB (Year 10). Before the final save optimization, result plus verified save took 19–28 s in Year 5 and 53–62 s in Year 10. These observations identify the remaining cloning/encoding costs rather than claiming a universal speedup. Samples include cold/warm worker and shared-host variation; they are not a controlled percentage comparison.

Inclusive subsystem profiles (three early months with four horses and actual Horse Manager training enabled) recorded approximately 0.56–0.83 s in training attempts, 0.19–0.93 s in NPC competition resolution, 0.07–0.22 s in board calculation, 0.14–0.44 s in auctions and 0.21–0.55 s in serialization after the scheduler/index changes. Timings overlap and must not be added. Exact before/after profiles are included as JSON.

### Final normal-save measurements

Fresh sequential runs against base `2e9bc90` and the final code, with a populated career and national/youth boards:

| Stable | Base simulation / result / verified save | Final simulation / result / verified save |
|---|---|---|
| Four horses | 1.16 / 1.55 / 2.59 s | 1.45 / 1.81 / 3.06 s |
| Thirty horses | 0.86 / 1.34 / 2.95 s | 1.25 / 1.65 / 3.35 s |

The normal fixture did not improve in this sample; new team programme/eligibility work and workload variation remain visible. The measured large-save improvement above is specific to saving and should not be generalized to every button or simulation mode. Raw final normal-save timings and successful device writes are included in `normal-before.json` and `normal-after.json`.
