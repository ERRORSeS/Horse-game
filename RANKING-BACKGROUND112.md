Ranking simulation and competition strength

The competition scheduler previously required optional rider career progression to be enabled. Turning progression off stopped NPC ranking competitions entirely, although the UI still listed the contenders with zero points. Awarding points for official meets alone did not fix the missing competitions.

Ranking simulation now runs with progression off. It uses actual scheduled calendar events: international/world classes, the rider's national classes, and competitions serving existing ranking-category pools. Explicitly disabling background competition still pauses NPC simulation. Optional progression retains its existing wider career schedule. Missing legacy background preferences use the enabled default.

Event entry now uses bounded ranking pools even with progression off. Matching national and age-category pool members can enter their corresponding real calendar fields, rather than having recorded credits filtered away because a different pool supplied every entrant. Team/Games selection remains on its existing path. Inactive/active pools retain their 50/100 limits, gradual growth and zero-point newcomers.

New world-pool recruits are advanced/professional/elite contenders rather than random beginners. High-tier field selection gives a modest preference to stronger eligible rider/horse combinations while retaining a seeded draw, country quotas, age and schooling requirements. Existing riders and results are not boosted or replaced.

No opening scores or hidden competitions are created. Existing skipped time is not replayed into fabricated results. New careers and newly recruited contenders legitimately begin with zero points; they earn points at future actual events, with ranking releases still every seven game days. Existing awarded results and weekly publication rules are retained.

Verification

A native browser simulation with progression off ran four game months using actual calendar classes. All four world boards earned points: 23 dressage, 31 eventing, 32 jumping and 12 hunter scorers. National and junior boards also scored. Every board total matched its counted result history, every result matched its class scoring rules, and all pools remained within 50/100 NPC limits. The four-month advance took about 0.3 seconds after fixture/pool initialization in this environment; this is not an end-to-end UI time-skip guarantee. Reload preserved totals and explicit background pause prevented new meets.

Regression checks cover ranking pool membership and age transitions, zero-point new entrants, exclusion of synthetic results, rendered result breakdown and score repair, native national-team competitors/results/reload, and protected horse marking sources.
