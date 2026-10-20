# Optional management validation

The update was implemented in the requested nine stages, with an actual local Git commit after each successfully tested stage. The preceding checkpoint preserves the existing pasture update separately.

## Automated coverage

The management suite contains 20 grouped regression tests; the existing pasture suite contains 16. Checks include older saves, selected tack preservation, one-time migration, all eight setting combinations, save round-trips, physical-item exclusivity, resale/repair/use-based wear, exact height boundaries, stock variants, last-unit and duplicate-line cart purchases, and persistent restock dates.

Equipment checks cover the ten personalities, control/learning caps, bitless combinations, Neck Rope at Bond 59/60, Sensitive Gag and Hackamore effects, advanced Double Bridle eligibility, all seven saddles in all four ordinary disciplines, hidden fit geometry and reassessment, ridden-only discomfort, medical restrictions, and no passive saddle exposure. Competition checks include no awards for equipment disqualification, missing preset items, unique-item session claims, exact RPG refusal percentage points, and Calendar-only Neck Rope exemptions.

Stall/behavior checks cover foals with mothers, retired and medically unrideable horses, capacity reduction without deleting assignments, persistent enrichment preferences and mood caps, all 56 stall template gates (55 expansion templates plus mother/foal rest), 60 turnout template definitions integrated with the existing event library, restricted movement, half-hour turnout, and visit-frequency limits.

Time checks compare complete monthly, daily, hourly and mixed-batch underlying states. The pasture suite exercises the actual hour/day/month buttons, pair reciprocity, fights and injuries, Social requirements, separations, retirement, sales, dead companions, decay, permanent milestones and bounded ordinary logs. Larger tests cover 20, 50 and 100 horse stables, plus a full month with 100 horses in separate pasture groups.

## Browser checks

The game loaded and refreshed normally in the in-app browser without captured JavaScript errors. Town → Tack Shop displayed item categories, size/color selectors, available quantities, out-of-stock handling, cart, receipts and restock date. A separate localhost origin was used for test-save setting changes. The existing save was not reset.

## Integration choices

The old game did not expose a separate private-horse stall capacity. Explicit barn capacity/stallCapacity values are honored; otherwise the existing facility capacity calculation supplies the numbered stalls. Upgrades append IDs and capacity reductions retain existing records.

Equipment injury reductions apply to the relevant existing incident kind when that incident exists. Equipment does not introduce fabricated weather, transport, racing, endurance, rider-size or illness events. Future-only equipment remains purchasable without adding unsupported competition disciplines.

Behavior logs reference the shared simulated events and never apply relationship effects again. Detailed stall occupancy is cached only during the current simulated hour, avoiding repeated stable-wide lookups without persisting stale assignments.

Tests use synthetic game states; they do not edit a player’s stored save. This report records regression coverage, rather than claiming exhaustive playtesting of every possible stable configuration.
