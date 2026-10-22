# Auto-Training repair

The Interactive RPG, narrative pools, exercises, gain formulas, repetition modifiers, normal-skill formatting and riding-attribute progression remain in place. There is no monthly training skill cap.

## Audit and corrected paths

The existing stamina mechanism is session-count based, not a separate numeric energy pool. `trainingSessionBounds` provides Low 2–5, Medium 5–7 and High 7–10; `preferredTrainingSessionLimit` selects each horse's limit. `resetTrainingWindow` and fatigue recovery occur at the daily rollover. The fix uses these exact limits and the same daily recovery window for manual, quick and automatic lessons. One actual session consumes one session unit. Postponed or medically blocked work consumes none. Reopening or reprocessing cannot consume twice.

Several automatic paths were inconsistent: editing a weekly draft could suppress later legacy Auto Training selections; changing the scheduled activity could leave its old exercise selected; category-only resolution silently substituted a default instead of honoring valid mixed work; automatic reports were recorded in horse history but not exposed in the schedule panel; and daily stamina counters were not reset consistently within long skips.

Explicit Auto Training saves now activate the corresponding schedule. Intentional weekly disable settings are preserved. Activity changes choose a compatible default, while an explicitly selected valid exercise is retained. Invalid saved exercises or incompatible plans are reported rather than silently replaced. Each planned exercise is checked for health, education, equipment, facility and weather eligibility before work. Existing indoor/light-exercise weather alternatives remain available and report what actually happened.

## Scheduling and reporting

Weekly entries execute at 09:00 once on their scheduled day; Rest/Turnout entries remain unchanged and Manual entries await the player. Main Goal and Lunging Mode are selectable in the existing schedule controls. Automatic work calls the same warm-up, attempt, progression, recovery, incident and veterinary code as manual training.

Automatic lessons use a reproducible scheduled-hour mood selection from current care factors, preventing UI skip-end mood refreshes from changing their random outcome path. This does not replace the visible per-skip mood behavior. The schedule restores the player's visible mood after automatic resolution unless actual training effects changed it; medical/equipment-triggered mood changes are preserved.

Weekly Training Schedule → Auto-Training Reports shows completed/stopped, postponed and skipped entries, reasons, stamina consumption, Main Goal and actual gains. Horse training history retains full completed reports. Stamina counts, processed-day markers and reports survive save/load.

## Validation

122 grouped checks pass across eight suites, including 10 dedicated automatic-training tests. Coverage includes Low/Medium/High existing limits, manual/automatic shared stamina, no third session when two are available, daily recovery without a monthly cap, multiple horses, exercise/goal fidelity, blocked equipment/medical work, weather alternatives, duplicate prevention and save/reload.

The dedicated chronological comparison produces identical automatic reports, gains and stamina results for 30 daily skips, 720 hourly steps, weekly-sized chunks and one month skip. This controlled comparison disables unrelated random horse-injury conversion so it isolates schedule/progression equivalence; veterinary/incident mechanics retain their separate regression coverage. This is not a claim that every possible external care change is identical across all game controls.

Browser smoke check used a separate fresh test stable: enabled a Thursday Flatwork schedule, selected Walk–Trot and Responsiveness, advanced one day, and observed five completed attempts, Rhythm +1, riding-attribute gains and one session consumed. No browser console errors were recorded. The player's existing save was untouched.

Run `node tests/auto-training.test.cjs` for the focused suite.
