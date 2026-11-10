# Oxer to Oxer 8.4

## Competition records and points

The 8.2 sandbox writer kept a separate custom standings snapshot and returned before the shared career writer. That left sandbox starts out of rider and horse history. Sanctioned youth custom classes also carried the general national ranking code, so their points missed the age-division standings.

- Modern custom and scheduled classes now write through the same live finalization and career result ledger. The final row keeps the rider, horse, edition and class IDs, class date, discipline, division, classification, prestige, status, placing, score and points. An active booking preserves Entered and Started. Final statuses distinguish Completed, Eliminated, Retired, Withdrawn and Did Not Start.
- Sandbox results appear in Calendar history and the rider and horse participation drawers. They carry zero official points and stay out of qualification, official horse prestige, and official career totals. The older calendar-hosted show flow keeps its established payouts and scoring, including Puissance, with participation visible in the unofficial history.
- Sanctioned senior custom classes feed their configured national board. Sanctioned youth classes feed the age-division and national age-division boards. A valid classified result also credits Show Points using the existing placing formula. Official horse record and prizegiving use their existing paths.
- The profile and history use the same credit destinations as the standings calculation. They identify Show Points, named ranking points, championship series points, and team series points. A result can contribute to multiple boards when its metadata allows it. A series-only result feeds its named series alone.
- The profile shows a rider's active division, world ranking, applicable division boards, published points, career highs and points awaiting a scheduled release. Other eligible divisions and historical standings sit in drawers. The rider can choose an active division or let recent verified activity determine it. Aged-out results remain in history.

## Junior schedule and field depth

The old annual catalog offered three general Junior legs per discipline and a Junior Nations Cup. The update adds 34 dated classes across 17 named Junior circuits, alongside the existing Junior Championship and Nations Cup. They use the existing playable jumping, dressage, eventing and hunter engines.

| Division | Ordinary classes per game month |
| --- | ---: |
| Kids | 7 |
| Pre-Children | 7 |
| Children | 7 |
| Pony Riders | 7 |
| Juniors | 7 |
| Young Riders | 7 |
| U25 | 7 |
| Seniors/Open | 7 |

These counts use a qualifying rider and horse for each division and a 145 cm pony for the Pony Rider count. A rider can enter overlapping divisions. Young-horse championships, teams and restricted senior international classes are additional opportunities. The calendar keeps its filters, prestige sorting and paginated cards.

The existing 480 NPC identities and original country rotation are preserved. The first youth cohort adds 240 persistent riders, with 24 new young riders in subsequent years. NPCs age into eligible divisions, keep their horse partnerships and earn points through actual scored results. New ranked worlds can start with a simulated six-month history. The ordinary calendar additions use a rotating subset for background simulation, with the other classes available for live entries.

## Barn directory

The existing Barn → Switch / Board Barns directory gains **69 countries and 185 city or locality choices**, bringing the total to **74 countries and 210 locations**. The original five countries, 25 locations, saved barn IDs and directory entries are retained. The California entry uses Los Angeles because the control accepts cities.

The directory reuses the existing barn generator, star ratings, board prices and boarding actions. Browsing a city does not relocate horses, charge fees or change barn facilities. An explicit boarding action still uses the existing transport and boarding calculations. Sporting nationality remains a rider-profile setting, independent of the barn's country.

## Existing saves

The migration reuses saved finals, custom standings, registration IDs, recorded point awards and class metadata when they support a link. It repairs affected published standings at the existing release date and keeps historical ranking highs. It does not replay money, prizes, skills or NPC starts. Saved points without an identifiable destination are labeled as such. Results whose identifying data is missing cannot be attributed to a rider or reconstructed.

## Verification

- Focused automated cases cover sanctioned and sandbox finalization, entered and started entries, withdrawals, retirement, DNS, save/load, duplicate protection, Junior eligibility and fields, 12 months of accessible classes, ranking and series destinations, points expiration, old-save recovery and the expanded barn directory.
- Chromium verified the Calendar custom creator, one-click Quick Compete, persisted sandbox results, the rider's category and world rankings, ranking-list collapse, seven requested location choices, and boarding at Lanaken while retaining Kazakhstan as sporting nationality. No uncaught browser errors appeared.
