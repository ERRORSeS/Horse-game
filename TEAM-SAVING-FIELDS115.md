Health-neutral national-team selection

Application review, selection scoring, squad retention and nominations no longer reject or demote a horse because of active health conditions, illness, rest, medical documentation or medication holds. Readiness uses the same saved skills and genetic potential without temporary illness deductions. Sporting requirements remain: rider nationality and age division, horse age and education, ownership/assignment, actual results, available squad places and qualification rules. Missing, deceased, sold/unassigned or retired horses remain unavailable.

A one-time load correction reconsiders current-year health-only rejections using actual recorded evidence. It does not fabricate trial finishes or guarantee a main-squad place. Horse clinical records remain intact. The selection-only flag does not change ordinary competition medical entry rules.

Background save memory

Large saves now compress in the serialization worker from 4 MB rather than 32 MB, avoiding large uncompressed payload transfers back into the page during hidden-tab saves. The existing single-writer queue, dirty follow-up handling, storage readback verification, save identity and recovery mechanisms are retained. This reduces a plausible memory-pressure cause; a full browser/OS tab crash was not independently reproduced.

The stress test repeatedly dispatched the actual visibility/pagehide save handlers with an approximately 11 MB save payload. At most one worker was active, the verified stored record was about 0.4 MB, and reload restored the saved money. Recovery/deletion/race regression checks passed. This is not a guarantee against all device/browser crashes.

Competition field sizes

Highest-prestige generated individual shows now target 50 total combinations, with lower-prestige defaults scaling from 17 upward. Explicit custom counts and fixed team/Games formats remain intact. Regional series now use their corresponding regional category pool instead of a global pool dominated by ineligible foreign-region riders. Actual country, age, schooling, scope, availability and championship qualification rules still determine the real field; no placeholder participants or invented results are added. Existing 50/100 category NPC caps remain.

Validation includes health-neutral application/selection/nomination/retention and score parity under major injury, active illness, rest and medication holds; old rejection correction and reload; the full federation progression suite; native main-squad entry; regional actual field expansion; field/prestige/zero-fault/ranking repair checks; Reduce Lag field equality; national-team native results; background-save visibility stress and save-recovery regressions.
