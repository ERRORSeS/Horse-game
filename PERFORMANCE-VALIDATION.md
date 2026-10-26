# Performance update — 26 October 2026

Based on current main commit 1f8c48d, including the newer medical recovery rebuild.

## Changes

- Normal redraws rebuild the visible panel instead of all 18 panels. Initial startup still initializes every panel. Changing tabs redraws the destination using current state.
- Save compression uses numeric LZW dictionary keys instead of repeatedly building and hashing growing strings. Decompression walks the saved codes directly, avoiding an intermediate array of every code.
- Unchanged save contents skip compression and the storage write after checking the actual stored value. External changes still invalidate the cache. Changed writes retain readback verification.
- Save validation checks the current state directly, removing one complete serialize/parse pass before the real save. Validation rules remain the same.
- Dropdown/textarea changes and disclosure toggles scan the panel that changed. Full redraws still capture and restore all remembered UI state.

## Measurement

A synthetic 500-horse, 749,092-byte JSON stable was compressed seven times with each encoder after warmup on the same machine. Median compression time fell from 599.6 ms to 114.0 ms — 81.0% less time. This measures compression, not end-to-end browser latency or frame rate. Encoded output was byte-for-byte identical. Normal redraws invoke one panel renderer instead of 18 (94% fewer panel render calls after initialization).

## Verification

Passed: 90 unit checks, 33 integration checks and 140 original-system regression checks — 263 total. The full current-main test sequence was executed with Node 24.21.0.

New checks cover byte-for-byte legacy codec compatibility, Unicode and high-entropy saves, dictionary saturation, fresh-load decoding, redundant-write avoidance, external storage changes, scoped UI state capture, hidden-panel render avoidance, fresh destination rendering and single-pass save serialization. Existing unit, integration and original-system regressions cover medical recovery/hospital care, vet/PPE, sales, saving/backups, training, competition, pasture, breeding, calendar and equipment.

Browser smoke test on an isolated localhost origin verified initial dashboard rendering, navigation to Vet and Sales, and retention of the selected soundness exam when returning to Vet. No console errors were recorded. The original preview's stored progress was not reset or deleted.

This is a performance-only update. No simulation cadence, probabilities, recovery rules, work restrictions, costs or feature definitions were changed. Remaining cost depends on herd/history size and the active panel. This does not claim that every interaction is instantaneous.

Reproduce the benchmark with `node tests/benchmark-save.cjs` (or `npm run test:benchmark`). Timings vary by machine and workload.
