# Dressage movement variation

The former per-movement spread was only ±0.12 marks, often lost when judges rounded to half marks. Execution now uses a centred triangular spread bounded by ±0.60 marks, with most movements near their quality-based baseline. The shared performance/form effect and all natural gait quality, expressive/technical/precision weights, training, rider, harmony, condition and error deductions remain intact. Player and NPC scores use the same calculation.

Variation is seeded per performance, combination and movement. Redrawing, rebuilding a sheet or reloading cannot reroll it. Completed saved movements retain their recorded judging values; existing final results are not recalculated. Half-mark judging is preserved.

Validation: `npm run test:dressage-movements` passes all 23 existing dressage/eventing scenarios plus bounded variation, average neutrality, quality sensitivity, error/zero handling and reconstructed-sheet stability. Across 80 moderate combinations, no sheets were entirely identical marks; the largest rounded movement range was 1.5 marks, and average change versus the old raw formula was +0.00139 marks. Native Chromium competition/reload/calendar checks also pass. This is bounded variation, not a guarantee that every pair of movements receives different marks.
