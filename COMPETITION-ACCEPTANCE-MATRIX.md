# Acceptance evidence

The brief’s 82 cases are covered by the following automated suites and browser workflows. Physical-device and browser-engine limits are listed in the report.

| Case | Requirement | Evidence |
|---|---|---|
| 1 | A horse with 0 penalties qualifies. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 2 | A horse with 4 penalties does not qualify. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 3 | A horse with time penalties does not qualify. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 4 | No nonqualifier performs a jump-off. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 5 | No nonqualifier receives jump-off faults. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 6 | Original first-round faults never change. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 7 | Original first-round times never change. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 8 | Jump-off rankings use correct penalty/time order. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 9 | Nonqualifier rankings remain based on first round. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 10 | Jump-off doesn't automatically favor player horse. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 11 | One qualifier is handled correctly. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 12 | No qualifiers is handled correctly. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 13 | Non-jump-off class remains a non-jump-off class. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 14 | Tension carries into jump-off. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 15 | Focus carries into jump-off. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 16 | Confidence carries into jump-off. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 17 | Energy carries into jump-off. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 18 | Timing carries into jump-off. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 19 | Break effects are applied only when relevant. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 20 | Opening jump-off does not reset values to 50. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 21 | Save/reload preserves them. | competition-repair.test.cjs; competition-completion.test.cjs; qualified/nonqualifying browser workflows |
| 22 | Compete button functions. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 23 | One click simulates a real round. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 24 | Result is visible immediately. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 25 | Same scoring logic as Interactive RPG. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 26 | No repeated rerolls. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 27 | No duplicate prize money. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 28 | Jump-off offered only to qualified players. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 29 | Quick/Interactive jump-off mode selection works. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 30 | Eventing quick mode handles three phases in proper order. | four-discipline one-click tests; existing prize/save integration; four-discipline browser runs |
| 31 | Neutral 0.70–0.90 m rounds approximate 30% with at least one rail. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 32 | Neutral 1.00–1.20 m rounds approximate 40%. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 33 | Neutral 1.30–1.80 m rounds approximate 45%. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 34 | Intervening heights have defined behavior. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 35 | Personality contribution works. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 36 | Tack contribution works. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 37 | Mood contribution works. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 38 | Luck stays within ±3 percentage points. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 39 | Luck is not rerolled on UI refresh. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 40 | Fault count is generated only on actual fences. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 41 | Refusals are not treated as fallen poles. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 42 | No double round/fence fault rolling. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 43 | Actual result matches displayed penalties. | 30,000-round simulation; factor/fence tests; existing pole-plan and refusal regressions |
| 44 | Every existing trait is connected to a meaningful relevant action. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 45 | Spooky horses react differently in unfamiliar environments. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 46 | Careful jumpers can show measurable knockdown effects. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 47 | Hot horses show relevant rushing behavior. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 48 | Calm horses settle differently. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 49 | Sensitive horses react to appropriate tack/aid contexts. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 50 | Traits don't override medical conditions. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 51 | Trait effects persist after saving. | 55-trait activation audit; existing Training 2.0 regressions; contextual handling integration |
| 52 | Loading profiles vary. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 53 | Travel tolerance profiles vary independently. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 54 | Difficult loaders have more genuine hesitant outcomes. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 55 | Excellent loaders usually load calmly. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 56 | Individual history affects future trips. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 57 | Travel over five hours triggers overnight planning. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 58 | Exactly five hours does not trigger the greater-than-five rule. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 59 | Multi-night stabling is available for relevant distant trips. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 60 | Overnight fees apply once. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 61 | Arrival readiness changes appropriately. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 62 | Venue familiarity persists. | booking/availability/experience and full distant-trip tests; three-night browser workflow |
| 63 | Sick horses can show physical examination signs. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 64 | Not every subtle illness is automatically detected. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 65 | Obvious symptoms have higher detection rates. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 66 | Uncomfortable mood can appear during symptomatic illness. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 67 | Uncomfortable mood isn't permanent after recovery. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 68 | Vet observations don't fabricate diagnoses. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 69 | Existing illness treatment progression works. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 70 | Existing hidden conditions remain meaningful. | 4,000-exam population; daily-mood population; hidden-diagnosis and existing treatment tests; vet browser workflow |
| 71 | Bond untouched. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 72 | QOL untouched. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 73 | Existing Training 2.0 preserved. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 74 | Existing show travel RPG preserved. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 75 | Existing four disciplines preserved. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 76 | Existing horse ownership preserved. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 77 | Existing prescriptions and care preserved. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 78 | Manual saving works. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 79 | Autosave works. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 80 | No duplicate transactions or results. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 81 | No console errors. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
| 82 | Desktop and touch interfaces work. | protected-file diff; complete existing suite; browser console and 390/1280 layout checks |
