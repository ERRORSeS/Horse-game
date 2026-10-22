# Training roster and automatic-session verification

## Confirmed roster failure paths

The authored editor looked up the saved selected horse before reconciling the selection with the current roster. A stale/deleted/transferred horse ID could therefore cause a false empty-state message despite current owned horses. The older source filter could select lesson horses only, and the legacy renderer excluded fully retired horses even when suitable groundwork remained possible. Undefined optional lesson availability was also treated as unavailable.

The fix resolves selection against the authoritative current owned roster, keeps owned horses visible, labels optional current-barn lesson horses separately, and repairs stale IDs without changing horses. Restricted horses remain selectable for inspection, with activity-specific eligibility/stamina explanations. Groundwork-only and medically restricted statuses remain distinct. Missing optional availability is not treated as an explicit absence. Unavailable orphan sessions are retained separately rather than blocking the screen forever.

All original training starts and attempts still enforce health, age, education, fatigue, equipment, weather and stamina restrictions. No eligibility bypass or roster mutation is introduced.

## Automatic training

The package includes the existing `59b7b1c` automatic-training repair and verifies it alongside the new roster fix. See `AUTO-TRAINING-FIX.md` for its implementation audit. Stamina remains the game's session-count mechanism: Low 2–5, Medium 5–7, High 7–10, bounded by each horse's existing preferred session limit and daily recovery. Manual, quick and scheduled work share that allowance. There is no monthly skill/progression cap.

Ten dedicated automatic-training checks cover all stamina levels, the two-session limit, independent horses, actual discipline/attribute gains, Main Goal, equipment/medical/weather checks, once-only processing, save/load, and matching automatic lessons across hourly/daily/weekly/monthly batches. Completed, skipped and postponed outcomes retain reasons and actual stamina/progress reports.

Normal discipline skill displays remain whole numbers; riding attributes and decimal-based training values use one decimal. The existing normal-skill minimum reward and all gain formulas remain intact.

## Validation

129 grouped checks passed across nine suites: roster 7, automatic training 10, small fixes 9, additive extension 19, original Training 2.0 26, management 24, quality of life 9, calendar 9, pasture 16.

A separate browser test stable showed the owned horses with Ridden Training Available and Groundwork Available labels, plus explicit unavailable labels for absent lesson horses. Selection worked at desktop and a 390×844 mobile viewport. A day skip produced an automatic flatwork report with one stamina unit consumed, +1 Rhythm and decimal riding-attribute gains, without opening the RPG. No console errors were recorded. The temporary mobile viewport was reset, and the player's current stable was untouched.
