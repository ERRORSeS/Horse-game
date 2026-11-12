# Device save recovery

Some devices remained locked in “still loading or requires recovery” after a startup storage error. Loading or importing a valid career did not clear that lock. Loading also rewrote the entire stored career to select it, allowing quota errors to prevent otherwise readable saves from opening.

This change restores readiness after successful load/import/create, shares concurrent startup attempts, and lets the user retry startup. Loading an already active save is read-only unless an existing migration must be saved; selecting another save writes only the active ID. A failed migration write preserves the readable career and reports that saving needs attention.

Settings → Your Save now shows the underlying error, Retry save storage, and a confirmed Delete this local save action. Choose Local Save lists metadata without decompressing every career, so one corrupt payload does not hide the others. Each row has Load and Delete. Deleting an unreadable active save or the open career creates a fresh verified stable; other careers remain intact. Cancelling confirmation leaves storage unchanged. Pending autosaves finish before deletion and cannot recreate the deleted record.

This is device-local storage. A local ID cannot retrieve a save from another device; use the existing portable code or exported file. No automatic deletion, storage wipe, or cloud claims were added.

## Validation

- Native Chromium: simulated first-open failure and successful retry; corrupt active payload plus valid alternate career; recovery lock clears after loading alternate; cancelled and confirmed single-save deletion; full-save quota failure while loading readable active save; pending save/deletion race; current deletion creates fresh verified career.
- Save identity regression: independent careers, portable restore, corruption detection, invalid-import rollback and persisted migration.
- Auction/save regression: catalogue persistence, schooling, auction funding and riding eligibility.

Evidence: validation96/*.log. Run `npm run test:save-recovery-browser`, `node tests/save3-identities.test.cjs`, and `node tests/auction-save3.test.cjs`.
