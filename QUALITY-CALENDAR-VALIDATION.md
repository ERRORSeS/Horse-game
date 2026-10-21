# Stable quality-of-life and Calendar validation

The eight requested bug-fix stages have separate local commits. The Calendar expansion and final regression corrections form a ninth, separate commit. Existing player saves are not included in the package and were not reset.

## Automated checks

Four suites cover 24 management tests, 16 pasture regressions, nine quality-of-life groups and nine Calendar expansion groups (58 grouped tests total). The test log is supplied beside the release archive.

Coverage includes ten actual synthetic purchases and stall assignments through the state-preserving redraw wrapper, explicit closing, category/count changes, selections, ten-plus stock generations and probability/size coverage, essential equipment, existing stock/date/cart preservation, three months of actual retired exercise, medical rest, young-horse groundwork, Social boundaries, overlapping half-hours, suitable NPC companions, departures and temporary returns, relationship caps and weighted interaction selection, cause-based feeding/behavior notes and corrected-warning removal.

Hour/day/month and mixed-batch checks compare persistent shop, NPC, relationship and diary state. Independent saved random streams prevent stock/NPC processing from changing with skip size. Large-stable checks include 20, 50 and 100 horses, including a complete 100-horse pasture month. Ordinary diagnostics are marked dirty and refreshed when shown; significant incidents still update immediately. Per-hour occupancy caches retain live eligibility/relationship checks.

Calendar checks generate 1,000 compatible game-hosted shows, verify saved special-rule distribution and Open Age coverage, preserve older ordinary events, check young/open ages and medical restrictions, ordinary versus special Neck Rope/Dressage rules, pre-modifier bareback control, final actual tack despite presets, missing mandatory equipment, result-stage DQ without awards, persisted reasons, and protection against duplicate result IDs.

Puissance tests cover shared progressive walls, configured maximum, deterministic entry-order tie-breaking, disqualified horses receiving no cleared height or attempts, refusal elimination, medical changes, partial-event reload, saved configuration recovery and duplicate-award prevention. A seeded before/after comparison verifies ordinary Showjumping results receive no Puissance data or altered scoring. Existing show generation is wrapped, rather than replaced.

## Browser check

The updated game loaded on a separate localhost test-save origin without captured startup JavaScript errors. Town, the redesigned shop, available-only filtering, size/color selection, stock messages and expanded cart were inspected. A purchase retained the open cart/shop. Automated disclosure/transaction checks additionally cover ten consecutive purchases and assignments.

## Scope and balancing choices

The detailed 80% standard / 65% specialty stocking rules take precedence over the conflicting opening request for only 10% out of stock. Quantities are distributed among variants; colors are not all guaranteed. Existing stock is never regenerated just by opening the store or importing a save.

New generated events roll 20% special once; formats incompatible with the existing generated discipline/level fall back to ordinary. Existing event counts, dates, fees and levels are retained. More than 75% of generated special profiles use Open Age. Puissance defaults to two attempts per wall, a 0.10 m increment and a maximum up to 0.40 m above its start, capped at the existing 1.80 m range; individual existing eligibility and safe-height limits always apply. Its attempt probabilities reuse existing jumping/refusal/fall calculations.

The suites use synthetic states and exact numerical assertions, plus sampled distribution checks. They are regression coverage, not a claim that every possible player stable has been exhaustively playtested.
