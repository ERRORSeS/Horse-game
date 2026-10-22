# Save/load repair

The previous `saveGame(false)` wrote into the selected named slot on every ordinary action and UI disclosure update. It could also use a name currently being typed into the Save field. The resulting slot no longer represented the player's checkpoint, so Load appeared to do nothing. Save success/error feedback was not visible beside the controls.

`save-fix.js` separates session autosave (`SAVE_KEY`) from manual named snapshots (`SAVE_SLOTS_KEY`). Manual slots change only through explicit Save Game. Startup resumes the latest autosave; explicit Load restores the selected named snapshot and updates the current session without rewriting that snapshot. Existing slot names, payloads and storage keys remain compatible.

The Save/Load panel now shows success or failure immediately. Failed writes preserve existing named saves. An unreadable slot store is not silently replaced. Invalid payloads are rejected before hydration; a hydration failure attempts to restore the previous running session. Slot names are escaped in the selector, including special characters and object-key names. Zero balance remains zero through the existing care hydration layer.

Validation: all 24 integration checks pass, including five save regressions for checkpoint immutability/restoration, autosave startup priority, storage quota/malformed store handling, invalid payload and zero balance, and special slot names. The existing medical/care test suite remains unchanged.

Browser verification: saved a new `Verified checkpoint` at $87,002, Day 1 / Month 3, and 28 rehabilitation days; added $100,000 and advanced a day to 29 rehabilitation days; loaded the checkpoint and confirmed all three values restored. Reloading the browser retained the restored session. Existing Main Save and other named slots were retained. No captured browser errors occurred during this test. Test save payloads are not bundled with the source.
