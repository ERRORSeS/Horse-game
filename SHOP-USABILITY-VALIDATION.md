# Shop and panel usability update

## Changes

- Every equipment type has a 90% chance of appearing at a scheduled restock. In-stock types offer all valid size/color combinations and larger total quantities. Ordinary purchases can still deplete a particular variant.
- Existing stock expands once. Previously sold-out rows, existing item IDs, carts, purchases and the scheduled restock date are preserved. Opening the shop does not reroll stock.
- The Town shop has a category rail, availability counts, clear prices, grouped variant controls, color previews, cart-line removal, receipts and an explicit Close Tack Shop action. Selected variants and quantities remain selected.
- Collapsible sections retain both open and manually closed state through nested redraws and save/load. Counts changing in headings do not reset them. Per-horse and per-stall sections have stable identities.
- Stall horse, target and available supply selections survive redraws. Pastures is collapsible. The selected main tab and Tack Shop view are included in saved layout state.

## Validation

All 24 management regression checks passed in batches. This includes the four new checks for exact availability boundaries, complete valid variants, legacy stock migration, persistent nested disclosures, manual closing, collapsible pastures and retained selections. Existing checks cover save compatibility, all eight settings combinations, actual-use equipment wear, fitting, competition rules, time-skip equivalence and 20/50/100 horse stables.

Two focused pasture checks passed: reciprocal pair/event processing without duplicate hours, and identical pasture states across monthly, daily, hourly and mixed batches.

Browser interaction confirmed that adding an item left the cart expanded and retained the selected variant. Optional Horse Management remained expanded after successive Stall Assignments and Tack Ownership changes. Pastures appeared as a collapsible section. No JavaScript errors were captured during these checks.

The complete 16-test pasture rerun exceeded the test runner timeout; it is not reported as a completed full-suite pass for this change. Browser control subsequently lost its connection, preventing a final screenshot capture. The existing player save was not reset; browser interaction used a separate test-save origin.

Diff whitespace checks passed.
