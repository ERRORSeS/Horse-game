# Critical fixes and medical balance update

Implemented 23 October 2026. This report supersedes earlier balance notes.

## Saving and loading

Root cause: storage writes could be treated as successful without read-back verification, and session recovery was not a dedicated scoped quarterly backup system. Save writes now validate the state and verify exact stored contents before success. Failures display “Save failed. Your progress has not been confirmed as saved.” Confirmed manual saves display “Game saved successfully.”

A browser-reproduced quota failure is also fixed with lossless LZW storage compression and compaction of existing game keys. Plain JSON remains readable, and no save is deleted to free space. Reads verify decompressed content. This reduces quota pressure but cannot remove the browser’s finite storage limit. Named saves remain separate. Each save scope maintains current and previous three-game-month autosaves. Actual chronological month boundaries trigger distinct snapshots, including year rollover; failures retain the prior valid backup and retry eligibility. Both backup generations are loadable. Loading restores medical truth, care economy, ownership, pending/completed commercial transactions and autosave schedule. Legacy data receives a backup before migration. Corrupt current backups cannot displace valid previous backups.

Scope uses named saves/stable identifiers: this local game has no authenticated account backend. Session recovery continues independently of quarterly backups. Browser storage remains local to its origin; it is not cloud sync.

## Owned horse sales

Root cause: listing an owned horse did not create an advancing buyer workflow. New daily buyer inquiries include offers and budgets, with accept/decline/counter, viewing, buyer-funded PPE, contract review/signing, payment and transfer. Prices can be edited and unpaid listings withdrawn. Sale completion credits payment and transfers ownership once; retries after loading cannot duplicate proceeds. Existing pending agreements are preserved. Rehoming code is unchanged.

## Examinations and work

Root causes: imaging prerequisites discarded visible findings, relevant signs could randomly disappear from reports, some hoof conditions were absent from soundness exams, and same-day result reuse could hide a new injury. All active conditions now produce findings in their relevant exams; every hoof/musculoskeletal condition is included in soundness and lameness assessments. A targeted test may still be needed to confirm the diagnosis. Historical/residual findings remain distinct from active illness. PPE uses the same persistent horse, not a new medical roll. Follow-up reminders persist once per due review.

Latest user clarification governs work: undiagnosed conditions allow ridden work, jumping, lunging and sales trial activity, subject to ordinary stamina, education, body-condition and other existing requirements. Activity observation generation is unchanged. Confirmed conditions enforce veterinary restrictions. Every completed exercise attempt on a relevant underlying condition accumulates work aggravation: recovery progress loses one eligible day and required recovery grows by one day, capped at 150% of the current severity baseline. Each six accumulated intensity units advances to the next eligible severity where available, with the new severity's minimum recovery duration and a new recovery baseline. It does not invent an ineligible severity or automatically reveal a diagnosis. Replaying the same event is idempotent; blocked attempts do not worsen the horse. Sales and training share this truth.

## Exact generation and background values

New market horses: old 60% healthy / 40% affected (affected severity 30% minor / 50% moderate / 20% major) is replaced by 55% healthy, 20% minor current-or-resolved, 12% significant history, 10% active mild/moderate, 3% serious. Active subgroup: 45% muscle, 20% hoof, 15% digestive, 10% airway, 10% other. Serious subgroup: 45% orthopedic, 20% chronic, 20% digestive, 15% other. Minor episodes are split equally current/resolved; some historical episodes retain residual effects using existing condition outcome probabilities. Serious listings identify assessment/rehabilitation suitability.

New rescues: profiles 25% neglect, 25% medical rehabilitation, 20% underconditioned with handling needs, 15% multiple needs, 10% severe rehabilitation, 5% behavior-focused. Primary severity 5% minor / 50% moderate / 35% major / 10% complex. Severe profiles receive major/complex needs while the overall requested severity weights remain intact. Every rescue has persistent welfare/handling/physical needs; intake transfers that same horse. Earlier rescue generation had no explicit primary-severity distribution and included a 15% mostly-healthy retraining profile. Existing horses/listings/rescues are not rerolled.

Monthly skips: background illness opportunity 4% per month becomes 4.6%, exactly +15% relative. The per-day hazard during month simulation is 1−(1−0.046)^(1/30). Per the user's clarification, daily skips use 4% on 90% of seeded days; 10% vary uniformly from 4–12%, averaging about 4.4%. These are opportunity rates, not guaranteed new diagnoses: existing eligibility and condition-selection gates remain. Severity, condition, recurrence and outcome weights otherwise stay unchanged. The health cursor prevents duplicate processing of the same day across mixed skips.

## Validation

Validation results: 68 unit checks and 31 integration checks passed; original-system regression results are recorded with the PR. Automated coverage includes verified storage failures, named-save isolation, three/six month checkpoints, year/day rollover, corrupt backup fallback, old-save migration, pending offers/PPE/completed sales/purchases through real save/load, exact-once transfers, offer negotiation/withdrawal/relisting, exam coverage across every catalog condition and mapped exam, stale result invalidation, unknown-versus-confirmed work eligibility, cumulative work aggravation, unchanged observation path, follow-up reminders, 10,000 seeded market horses and 1,000 rescue intakes.

Market sample: 5,417 healthy; 1,990 minor; 1,202 historical; 1,027 active; 364 serious. Rescue sample: 269 neglect; 243 medical; 200 underconditioned; 139 multiple; 96 severe; 53 behavior. Primary severities: 55 minor; 524 moderate; 338 major; 83 complex.

Browser checks in an isolated prefixed-storage fixture verified listing an owned test horse, retaining ownership before sale, and a real next-day buyer offer. The new sales UI rendered without console errors. A real browser quota-exceeded failure was reproduced; after compaction the same manual save displayed “Game saved successfully.” Loading it then visibly confirmed restoration with the same date, balance and roster. Full interactive sale/rehome and final medical checks were interrupted by browser comment selection mode, so those remaining browser flows are not claimed as manually passed. Engine and integration tests cover the sale lifecycle and actual RPG work path. Existing user progress was not reset. Test-only HTML fixtures are excluded from the deliverable and PR.

Changed systems: save-fix.js, sales-engine.js, health-engine.js, care-sales.js, new critical-ui.js, script ordering/cache versions in index.html, README/package test commands, integration/unit tests and regression browser/storage mocks. The mocks now implement real set/get/remove semantics so verified saves can be tested.
