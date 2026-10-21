# Training 2.0 integration audit

Audit completed before implementation. Existing gameplay stays authoritative outside Training 2.0 lessons.

| Existing field/system | Current use | Training 2.0 mapping |
| --- | --- | --- |
| stats.jumping: Striding, Confidence, Balance, Power, Speed, Structure | Schooling, clinic suggestions, competitions and level eligibility | Same learned 0–100 skill objects; never copied into a parallel discipline total |
| stats.dressage: Collection, Balance, Connection, Gaits, Rhythm, Flowiness | Dressage schooling, competitions and eligibility | Same learned skill objects and clampSkill potential limits |
| potential by discipline; highestAllowedLevelIndex | Genetic caps, clinic and competition eligibility | Unchanged; restrict both gains and schooling heights |
| confidenceJump / confidenceFlat | Old story RPG and competitions | Retained discipline education, used to initialize riding Confidence; session uncertainty lives separately |
| focus (0–100) | Old story options and horse education | Canonical base riding Focus is focus / 10; no duplicate permanent Focus field |
| behavior; requiresBreakingIn | Handling education; mounted eligibility at behavior 500 for homebred/flagged unbroken horses; established purchased adults remain eligible | Groundwork education remains behavior (normalized Manners = behavior / 10, with existing values above the learning ceiling preserved). Already broken adults map to established basic riding education without overwriting behavior; no Balance/trait unlock bypass |
| controlability | Permanent handling control and existing performance | Still canonical; new Responsiveness describes prompt aid execution, not a replacement control stat |
| bond | Rider relationship, handling and competition modifiers | Preserved; not horse-to-horse relationship or an innate riding attribute |
| trainingPreference; preferredTrainingSessions | Stamina, monthly exercise expectations | Retained care checks; retired light-exercise mapping stays active |
| trainingSessionsThisMonth / SinceReset | Existing completed sessions and overtraining | Increment once on actual completed Training 2.0 work, never per text choice |
| handTrainingSkillCapThisMonth / Gains | Existing monthly manual progression budget | Shared fractional budget; no integer rounding of small new gains |
| autoTrainingFocus; autoExerciseHours | Monthly legacy automated work; retired care | Weekly schedule supersedes only horses with an enabled schedule; legacy automation remains otherwise |
| fatigue | Existing 0–100 workload | Same field; session carries actual fatigue forward |
| trainingRpg/config/summary | Legacy fixed story steps, option rolls and gains | Replace Training-tab entry with authored lessons; retain in-progress legacy sessions for migration/completion |
| trainingBoost; exercise menu | Legacy normal training and automatic learning | Existing tack learning remains in the common new progression path; no new star bonus |
| equipmentModifiers / eqRecordUse / fitting | Real owned tack, session exposure, discomfort, existing injuries | Reuse once per completed lesson; equipment injury roll consolidated with lesson incident handling |
| illnesses / unridable / stallRest / canRideUnderSaddle | Veterinary and age restrictions | Rechecked before preparation and every attempt; never interpreted as unwillingness |
| currentBarn ratings, lesson pools, pastures | Existing boarding/care/lesson availability | Retained; stars absent from all new training probability/gain calculations |
| mgResolveMood / careCurrentMoodFactors | Source-based management mood | Refresh factors after elapsed skips; category changes remain normal evaluation cadence |
| stallEnrichment / stallActiveSupplies / flavor preferences | Occupied-stall Likit use, consumables, behavior | Extend actual holder/refill mechanics; reuse inventory IDs and preference records |
| eq presets and equipmentRefs | Assigned physical equipment | Named sets hold the same references and call existing validation |
| serializeAppState / hydrateFromSave | JSON app save and migration | Additive training2 data and persistent session RNG; no reset of horses or existing history |
| Training Clinic / farrier / breeding / Calendar / competitions | Independent established features | Preserve handlers and results; Training 2.0 replaces no competition engines |

Source audit: script.js training functions (1965–2201), monthly automation (3099 onward), hydration (3346 onward), clampSkill (4334), horse stats creation (4629), Training UI (7517 onward); care-fixes.js status and hourly wrappers; tack.js and fitting.js actual-use integration; stalls.js preferences, occupied-hours and Likit controls; pasture.js chronological simulation cursor.

Probability order: contextual base → at most primary/half-secondary trait plus one personality (combined ±12 pp) → primary/half-secondary attributes (±8 pp) → relevant current state and tack → final category cap (ordinary30, distraction22, overreaction18, frustration25). Categories remain separate and gated; quality distributions normalize exactly. No generic stacked disaster roll.
