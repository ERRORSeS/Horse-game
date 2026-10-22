# Revised expansion status

This is a training repair increment, not the completed major expansion.

## Implemented

- Audited current skills, medical and sales paths. Source snapshot backed up before edits; no player-save medical migration has run.
- Main Discipline Skill and Main Riding Attribute selectors work independently in preparation and weekly schedules.
- Canonical Jumping and Dressage primary/secondary mappings award fractional internal progress; normal skill displays remain whole numbers and riding attributes remain one decimal.
- Hunters and Eventing reuse existing stored skills. Lunging retains handling education and limited Balance foundations; desensitization retains confidence education.
- Specified original-skill base, quality, repetition and focus multipliers replace the old single-skill award. Original-skill primary and secondary session budgets are bounded separately at 1.8 and 0.8. Secondary contribution is 40% of the base; proximity to potential slows progress. Riding-attribute progression remains separate.
- New work no longer receives the previous artificial +1 finish award. Fractional changes accumulate and cannot exceed assessed potential. Existing values already above a cap are preserved.
- No monthly cap. Existing daily stamina, recovery, automatic scheduling and safety checks remain active.
- Anticipation/rushing checks use the requested 5% bases. Context-specific aid/balance/rhythm interruptions use the existing mutually exclusive interruption selection, with existing stacking caps. Existing serious behavior and conditional fall mechanisms remain intact.
- Protected riding narrative templates, lesson/course builders and existing exercise IDs remain present. Four missing skill-specific variants reuse existing safe exercise mechanics.

## Verification

Ten functional/regression suites: 139 grouped checks, covering progression, roster, auto training, extension mechanics, training, management, quality of life, calendar and pasture.

Additional seeded simulation: 2,000 ordinary indoor mixed lessons with 4–7 blocks. Noticeable contextual minor interruptions 59.2%; major behaviors 2.25%; rider falls 0.15%; 10,987 attempted blocks. This fixture is not a universal estimate across horse personalities/environments. Minor-count definition uses named interruptions/rushing, not every generic quality imperfection. Statistical acceptance uses broad tolerances, not exact tiny-sample percentages.

Browser check: preparation/builder retain both selected focuses; Quick Training completes, reports separate original and riding gains, consumes one stamina session, and produces no captured console errors. Native mobile Safari is not verified in this increment.

## Still outstanding

The revised specification's medical truth/schema migration and player-save backups; complete condition catalog, observations and diagnostic workflow; treatment/recovery/residual outcomes; veterinary conversations; pharmacy/prescription inventory and receipts; vaccination policies; Farrier 2.0; rescue rehabilitation/fear discovery; unified sales rewrite, trial/PPE/negotiation/contracts/payment/transport; crops and spurs; all related narrative pools and full expansion integration tests.

Current medical, sales and related existing systems remain their previous implementations. This increment does not claim those replacements are complete.
