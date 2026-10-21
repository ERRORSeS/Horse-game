# Small training fixes

The existing lesson builder, course builder, outcome probabilities, incidents, traits, riding-attribute gains and veterinary restrictions remain intact.

- Normal skill values and training report gains display whole numbers; stored precision is retained. Riding Attributes & Individual Traits and riding-attribute progress retain one decimal. Physical fence dimensions retain their necessary precision.
- When a lesson genuinely earns normal skill progress, each earned normal skill is topped up to at least +1 once at session completion, subject to its existing skill/potential ceiling. No reward is created for unattempted work, refusals, safety stops, or a skill already at its ceiling. Riding attributes do not receive this minimum. Finishing twice cannot repeat the award.
- Monthly skill budgets and monthly session-count blockers are removed from interactive, quick, scheduled and legacy training paths. Per-session attribute limits, current fatigue, weather, health and eligibility restrictions remain.
- Mood selection is refreshed after each elapsed hour/day/month skip, using actual current care factors and existing probabilities. Active incident/medical priorities are preserved. A fresh evaluation may legitimately select the same mood. Because moods now update at each skip, differently sized skip sequences need not produce identical later random training/behavior outcomes; schedule processing and restock chronology still run once per actual period.
- Changing discipline immediately filters the saved draft exercises, selects an eligible replacement if necessary, and refreshes the exercise choices. Lunging choices cannot remain as the sole lesson after switching to a ridden discipline.

Validation: 109 grouped checks pass across seven suites, including six new focused checks. Previous tests that required identical mood-dependent outcomes for different skip sizes were updated to check once-per-period processing and unchanged inventory/restock timing, matching the requested per-skip mood behavior.

Browser check used a fresh separate stable: lunging choices changed to dressage choices, Quick Training completed, and a subsequent groundwork report displayed Manners +1 alongside decimal riding-attribute gains. No console errors were recorded. The player's current stable was untouched.
