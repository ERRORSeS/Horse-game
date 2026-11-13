# International national-team fields and standings

Programme competitions invited foreign countries but their national selection trials were absent from the calendar. Those federations could have reserve/development riders and no main squad, leaving the player's country as the only complete team. Background fields also had 23 slots even without a player, omitting the sixth four-rider team.

All 74 countries in the supported game registry appear in each division-wide national-team board, including countries that have not yet scored. Six-country fields rotate through every supported country over a two-season programme cycle instead of repeatedly inviting the same five opponents.

The calendar now includes the existing selection trials for invited opposing federations. They use the same eligibility, actual scoring, stored trial results and selection model. Existing saves can resolve previously missing or empty past foreign trials once they are due; future trials are never completed merely by viewing an event. Existing nonempty results are not rerolled. Qualified foreign combinations are nominated into the existing ranking population pool. Trial definitions are cached per career/year to avoid rebuilding the expanded schedule on every hour skipped. Foreign selection trials reuse eligible athletes and simulate at most twelve candidates instead of generating an extra fifty-rider ranking pool for every visiting country. New candidates start with no results or points; the ordinary ranking-pool limits remain unchanged.

Programme fields have capacity for six complete four-rider squads. With a player, the field builder reserves the player's place in their national quartet; without a player, all 24 NPC slots are available. Nationality, age, horse eligibility, nominations and qualification requirements remain in force. This does not manufacture a qualified squad for a federation that cannot meet those rules.

Rankings → National teams now opens the rider's division-wide national-team standings rather than an unrelated empty series. Existing saved filters migrate once; individual series remain selectable. Team identities include country, age division and discipline, and the player's country is identified as Your national team. All actual multi-country team meets contribute their recorded team points for the game year; breakdowns use the same results. Active squads remain visible at zero when the year resets. No starter points or fictional wins are generated. Historical single-country classifications are preserved but excluded from team standings. New single-country programme results receive no team classification or team points.

Completed show results display all classified national teams, their places, team points, counting scores and rider/horse combinations, in addition to the existing individual results.

## Validation

- Six targeted scenarios: full opposing squad after actual foreign trials; matching aggregate/series points and save reload; single-country results excluded; future trial results not fabricated; active squads visible after annual reset; all 74 country entries and full two-season invitation coverage.
- Native Chromium: actual Rankings division default, full foreign team identity, completed show team table, latest-squad point breakdown and verified save reload.
- Fresh career: eight real monthly worker skips from Year 1 January. The October junior jumping event contained GBR, Spain, Japan, Greece, Ireland and Oman, with four combinations each. Sixteen countries had actual classified team points across the completed calendar, and all 74 appeared in the board. GBR had 43 points from two team starts. Full output and skip timings are retained in validation99/fresh-career.log.
- Existing 21 federation progression scenarios and four ranking consistency scenarios passed, including the confirmed main-squad entry fix and chronological month/day/hour equivalence.

Run `npm run test:national-teams`, `npm run test:national-teams-browser`, and `npm run test:national-teams-life`. Browser checks use port 8105 by default; set GAME_URL to another running instance. The full historical suite was not rerun.
