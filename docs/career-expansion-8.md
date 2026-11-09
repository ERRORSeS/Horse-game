# Oxer to Oxer 8.0 and 8.1

## Where to play

- **Settings → Rider Realism → Saved riders.** Create riders with a starting age of 6–60 and a sporting country. Set up an older profile once if its age is unrecorded. Each rider keeps their own experience and editable abilities.
- **Settings → Rider Realism → Career settings.** Enable Rider Realism and Career Progression & Rankings for earned rider development and monthly rankings. Background NPC simulation, the Games calendar, and sponsorship offers have separate controls.
- **Calendar → Competition calendar → Browse competitions.** Filter by discipline, rider division, year, and month. Each event shows the date, location, technical level, prize, and qualification requirements. Recognized classes use the regular travel, preparation, interactive competition, and Quick Compete workflows.
- **Rankings.** Choose the discipline and board, open a classified entry to inspect its history, and open the guide for the current game rules. Career history, Games medals, and sponsorship offers are available in drawers.
- **Horses.** The horse card shows its official record and the proven-record premium when it has verified results.

The calendar, rankings, and related disclosures use the market and town shops' dark teal surfaces, card layouts, filters, and compact mobile spacing.

## Competition catalog and qualification

There are 12 tiers, from schooling and local shows through national championships, five international tiers, majors, and world championships. Star classification belongs to the scheduled class. For example, International Rising Stars has classified international starts with zero ranking points. Each class configures its division, technical level, points, field limit, date, and purse.

- **Jumping.** The Global Jumping World Cup, Global Champions Jumping Tour, World Nations Jumping League, Continental Cup, Indoor Masters, Elite Grand Prix, Rising Stars, Amateur Grand Prix, and youth, pony, and young horse circuits.
- **Dressage.** The regional and national ladder, CDI circuits, World Cup, Continental Championship, Nations Cup, Grand Prix Special, Freestyle, and age divisions. Special and Freestyle configure different movement sequences on the existing scoring engine.
- **Eventing.** The national ladder, CCI classes, Development Tour, Challenge, Masters, Majors, Nations Cup, Continental Championships, and age divisions. Long-format classes spread the existing three phases across multiple days.
- **Hunters.** The local through international ladder, national and international Derbies, Green Hunter Incentive, amateur league, and youth, young-horse, and size-specific pony classes. Points use judged hunter scores.
- **Games.** World Arena Games and Asian Continental Games offer jumping, dressage, and eventing with individual and team results. World Youth Arena Games and Continental Youth Games offer jumping. Their four-year schedules, eligible countries, horse ages, and starter quotas are configured separately. The World Youth event provides a temporary horse that leaves the temporary roster when the show ends.

Rider divisions overlap and use competition-year age. Pony classes use measured height, including their configured shod allowance. Young horse classes check the birth year where recorded and use the existing horse age for older records. World and championship starts require relevant prior results. Tour finals use series results. Team finals use federation results from qualifying legs, and Games require the configured country quota and technical eligibility. Teams count their configured number of best classified scores.

Event, venue, series, and sponsor identities are separate. The brief's Longines references informed the separate world and tour standings. Its Hermès reference informed the standalone major format, and its Rolex references informed the consecutive-major achievement. All playable titles, qualifications, scoring, and sponsors are fictional game content.

## Results, rankings, and career progression

The same result ledger accepts actual live show standings and bounded background competitions. An event can be written once. NPC-only meets use the existing compact show-scoring path and exclude incompatible bookings. Rider and horse IDs persist across shows and reloads. The world starts with 480 NPC riders across six career bands and 23 federations. Their results, partnership changes, retirement, development, and sponsor income are recorded as they occur.

The common points engine uses winner base × place × discipline performance × a bounded field factor. Jumping's international winner bases are 30, 45, 70, 100, 140, 180, and 200 from 1★ through world championship. Dressage uses 35, 50, 75, 100, 130, 170, and 200 with percentage factors. Eventing uses 30, 45, 70, 105, 160, 190, and 200 with a reduction for total penalties. Hunter uses 25, 35, 50, 65, 80, 90, and 120 with a judged-score factor. Explicit class overrides cover youth, team, pony, derby, and young horse classes. Short fields, unclassified finishes, and ineligible classes award no points. Monthly releases keep a rolling 12-month world window, with a best-30 result cap for world riders. Horse, combination, national, youth, pony, young horse, tour, and team points have separate boards. Rankings preserve best position, release changes, and career history. Seasonal and Games results remain visible after points expire. A three-win Elite Majors streak triggers a single fictional bonus.

The existing rider skills develop gradually through completed ridden work. Jumping practices Timing, Balance, Leg Stability, and Judgment. Dressage practices Seat Stability, Hand Stability, Aid Consistency, and Balance. Eventing and hunters use corresponding existing skills. Daily repetition and monthly gain limits apply. Calendar advancement alone creates no player practice. Disabling progression preserves previously published standings and stops new progression and background competition work.

Sponsorships range from local equipment support to elite apparel and performance deals. Offers depend on recent verified placings and category conflicts. Guardian representation is required for minors. Active contracts expire on their scheduled date, can be earned again, and pay through idempotent stable transactions.

## Horse genetics and market

The four Welsh sections use separate breed definitions, height ranges, potentials, and fallback marking distributions.

| Section | Foundation height | Jumping / dressage / eventing / hunter targets | Plain / face / legs / both |
| --- | --- | --- | --- |
| A · Welsh Mountain Pony | 10.2–12.0 hh | 68 / 76 / 65 / 77 | 48 / 24 / 14 / 14% |
| B · Welsh Pony | 11.2–13.2 hh | 79 / 85 / 75 / 90 | 45 / 25 / 15 / 15% |
| C · Welsh Pony of Cob Type | 12.0–13.2 hh | 77 / 79 / 76 / 80 | 37 / 27 / 18 / 18% |
| D · Welsh Cob | 13.3–16.0 hh | 86 / 85 / 84 / 83 | 34 / 28 / 18 / 20% |

UK-inspired and North American-inspired registration profiles have configurable height limits. Purebred registration rejects disallowed patterns while retaining inherited genes and markings. Individual new foundation horses receive saved breed-influenced potential, including rare exceptions. Bred foals use the existing inheritance and mutation path. Old horses keep their recorded names and existing potential values.

Verified performance adds one capped premium to the existing valuation. The highest proven tier sets the ceiling, with supporting results and recent completion history adjusting it within that ceiling. The cap is 35%. The same recognized earnings and placings are removed from the legacy additive price bonuses before applying the new premium. Buyer offers reflect the verified record while existing contract and sale rules remain in force.

## Verification and scope

The naming portion includes a 5,000-name sample test, RNG isolation, and stable and NPC field save round trips. Career tests cover schedule IDs and Games cycles, birthday and profile migration, pony and young-horse gates, Welsh marks and registry limits, ranking formulas and expiry, repeated date processing, stable NPC identities, live result persistence, the market premium, team scores, and sponsor payments. Chromium smoke tests cover the Calendar, Rankings, profile controls, actual Quick Compete result persistence, and a 390 px viewport. A seeded four-season background run processed 1,000 meets and 15,485 starts. It produced complete classified squads in all three Asian Continental Games and World Arena Games disciplines.

Scheduled classes use the existing game's level bands and scoring, so some requested real-world analogues share a technical level. Foundation Welsh markings reuse the existing face and leg sprite locations. Games selections are made at booking from the event's qualified pool. There is no separate federation administration screen. The temporary youth mount uses tack selected from an existing horse.
