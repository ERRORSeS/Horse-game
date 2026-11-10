# Career and national-team validation

The national-team and World Arena Games routes are reachable. The Games are the game's Olympic equivalent. Two four-season simulations used the real entry, scoring, result-ledger, application, nomination, and team-selection code. One rider started at 17, moved from juniors to seniors, completed 69 shows and three national-team events, and reached the Games in year 4. The other started at 22, completed 77 shows and seven national-team events, and reached the same Games. Both retained their trial invitations after saving and reloading.

These are best-case reachability checks with an already skilled rider, a suitable fully schooled horse, adequate funds, and scripted clean rides. They do not estimate a beginner's success rate or guarantee selection. Qualification records and nomination flags were earned through the competition APIs rather than inserted by the simulation.

## Registration

1. Enable Rider Realism, Career Progression, and National Team Applications in Settings; set the rider's age and sporting country.
2. Earn a regional-or-higher top-ten result in the relevant division on the same horse.
3. Open Calendar → **National team registration**, choose the squad and horse, and apply before month 3, day 15.
4. Review starts on month 3, day 20; shortlisting is on month 4, day 2; invitations are issued on month 4, day 8.
5. Click **Register for selection trial** in the invited application. The invitation alone is not a competition entry. The new button opens the normal show and travel flow for the invited horse. Trials run in month 5, with dates varying by division.
6. Squad decisions are made on month 6, day 4. Successful national or championship squad members see upcoming nominated competitions and **Enter for [country]** buttons in the office. These entries use the usual booking window, eligibility, equipment, funds, and federation quota checks.

Missed and eliminated trials did not earn championship or national-squad nominations in negative tests. A development-squad place does not grant championship entry. Successful classified trials could earn championship-team selection. Repeated review did not reroll the decision.

## Competitions and rewards

The calendar contains senior Nations leagues/cups in jumping, dressage and eventing, junior and pony team events, and the four-year Games. Full simulated careers entered regular national-team competitions as well as the Games.

A Chromium button test entered the World Nations Jumping League for Great Britain. The country finished sixth, earned 21 team ranking points, and the player received a $9,100 individual show prize. These are the observed results of that test, not a fixed participation payment. Normal placing prizes apply; Games can award individual and team medals. National representation is displayed on the active show, and final results show the country placing, team points, medal when earned, and received show prize.

## Performance

Three paired Chromium samples used the same seeded world and workload. Median first-week career processing fell from 661.5 ms to 568.6 ms (14%); saving fell from 312.9 ms to 266.2 ms (15%); repeated rider-result queries fell from 9.3 ms to 7.2 ms (23%). Timings vary by browser and save size.

Roster indexes now reuse discipline/country/identity lookups. Result queries reuse an incremental meet index instead of scanning unrelated competitors. Loading a dormant career no longer creates thousands of NPCs unnecessarily. Saving avoids a redundant full JSON parse, and automatic writes are coalesced over a longer input pause. Existing NPCs, results, rankings, and save formats are retained.

## Reproduce

- `npm run test:career-life`: junior and senior four-season career simulations.
- `node tests/federation-selection.test.cjs`: invitation, qualification, duplicate application, successful/missed/eliminated trial, and stable selection checks.
- `node tests/career-performance.test.cjs`: cached lookups and repaired/deleted result handling.
- The normal `npm test` command includes the new focused regressions.
