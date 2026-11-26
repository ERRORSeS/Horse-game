# Calendar showjumping and jump-offs

## Corrections

- Generated standard showjumping calendar classes use jump-off formats. Recognized individual career classes now include local and regional levels, rather than starting only at national tier. Schooling/team defaults and explicit single-round/custom choices remain intact; Puissance and non-jumping formats are unaffected.
- NPC-only jump-offs previously selected fences by comparing the requested jump-off phase with the player's still-first-round session. That produced an empty course and a false 0 seconds / 0 faults result. The shortened course now selects actual main-round fences independently of the player's qualification, clears cached first-round plans and resolves each fence. An empty course is rejected instead of recorded as a clear.
- Quick showjumping uses the interactive fence engine and suitable automatic choices based on current preparation and expected difficulty. It does not inspect future random draws. Player/NPC scoring uses actual records; the former legacy random-option quick path is retained only for already-partially-played legacy records, avoiding a replay of completed work. Other disciplines keep their existing quick workflows.
- Official player round times exclude course-walk and warm-up records. Jump-off preparation carries forward, and the new shortened session begins at its first fence. Strategy, genuine refusals/rails, elimination and ordinary fault/time tie-breaking remain meaningful. Zero penalties remain valid for an actual clear round; a completed jump-off has actual positive elapsed time.
- Invalid empty NPC caches can be cleared in an unfinished active jump-off when loading, allowing the existing next-competitor workflow to resolve the missing rounds. Unentered future generated standard classes without a format choice receive the new default. Existing entered class rules, completed history, prize payments and first-round results are not rerolled.

No training screen, controls, styling, horse attributes or general refusal/rail probability tables were changed. Qualification still requires a real zero-penalty, non-eliminated first round and at least two qualifiers.

## Validation

`npm run test:calendar-jumping-browser` passed in native Chromium: calendar format defaults and exclusions, genuine clear-round qualification, native Quick Compete Jump-Off button, positive player/NPC timings, immutable first-round scores, saved final results, watched NPC-only jump-offs, resumed empty-cache repair, carried preparation and manual jump-offs.

Across three 90-round groups, the prepared combination cleared 56, the intermediate combination 33 and the underprepared/high-avoidance combination 12. These are fixture measurements, not guarantees for every horse. Natural skills, learned avoidance, rider ability, preparation and errors still matter. See validation106/browser.json.

A seeded 40-show Quick Compete comparison produced 22 clears before and 26 after. The baseline regional classes offered no jump-off; updated classes offered a jump-off whenever multiple combinations genuinely qualified (the player did not qualify in every class). A real career registration also completed and recorded a result with 11 ranking points. See validation106/quick-comparison.json.

Existing native appearance/navigation/purchase, rider actions, dressage/eventing/calendar checks, the 23 dressage/eventing scenarios and marking-source checks passed. The full historical test suite was not run.
