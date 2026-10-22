# Horse-game

Browser-based equestrian stable management prototype inspired by the Oxer to Oxer gameplay loop.

## Run

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Troubleshooting merge/conflict imports

- If the UI appears blank after resolving conflicts in your Git host with options like **Accept Current Change**, make sure `index.html` and `script.js` come from the **same commit/version**.
- Do a hard refresh in the browser (`Ctrl/Cmd + Shift + R`) after importing merged files so cached JS/CSS are not reused.
- If needed, re-import the latest `work` branch files again as a complete set instead of mixing older and newer versions.

## Included systems

- Unlimited skip-month progression with horse aging and foaling.
- Money economy with market purchases, sale barn buying, show earnings, and paid services.
- Horse management cards with stats, conformation, pedigree COI, and management toggles.
- NPC market, player sale barn, stud/freezer reproduction flow.
- Vet, farrier, training, shows, registries, breeders show pages.
- Interactive text-RPG training sessions with discipline-specific choices and weighted outcomes.
- Training clinic-style report generation and in-app report feed.

## Pastures and conformation schedules

Enable optional pasture management in Barn. Every owned horse can be assigned, including retired horses and young horses. Foals under one year follow their mother automatically. Select individual turnout in the horse profile or Barn to choose a private pasture; changing this preference clears a booking of the other type. A mare may share a private pasture with her foals under one year. Other horses cannot book it. Individual pasture count is one per three group pastures, rounded up.

Each horse has a persistent Social score from 0 to 100. Scores below 25 prefer being alone; 25–49 tolerate either arrangement but have a 15% fight risk with companions; 50–74 need at least one companion; 75–100 need at least two. Unsuitable turnout produces Uncomfortable or Stressed mood and a trainer note. Scores 0–10 have a 30% aggression risk with companions; Hot-Blooded and Excitable horses have a separate 6% fight risk. These risks apply only during shared turnout. Existing staff, crowding, and stallion risks still apply.

Recurring conformation settings are individual to each horse. Choose every X months, selected calendar months, or every month except selected months. Month selections repeat yearly, and show eligibility still applies. Old interval schedules remain supported. New Social scores, turnout preferences, bookings, and schedule settings are included in saves.

## Horse relationships and pasture diaries

`pasture.js` contains the shared turnout simulator and all 90 event templates. Keep this file together with the updated `index.html`, `script.js` and `styles.css`. No external runtime libraries are required to play.

Relationships belong to reciprocal horse pairs, separate from Social and rider Bond. A hidden pair compatibility value affects weighted activities; only actual, medically eligible shared turnout creates meetings or interactions. Scores are bounded to −100…+100, ordinary gains are limited to +5 per pair per game day (including reunions and exceptional bonding), and ordinary losses to −10. Serious fights can remove 10–20 points and occur at most once per pair per day. Friends and bonded companions favor friendly activities; disliked horses and enemies increase the existing conflict hazard. Positive relationships fade by one point per month after six months without contact.

The Hot-Blooded/Excitable modifier is **6%**, overriding the 15% wording in the extended request. The existing Social, crowding and stallion risks combine with personality and relationship modifiers into one pair hazard, scaled to actual shared hours using an eight-hour reference turnout. Fight injuries use existing illness/recovery care and produce veterinary notes; horses with active issues are excluded unless turnout is explicitly permitted. Minor event stress expires with in-game time. Anonymous pasture occupancy still affects crowding, but never creates invented named relationships.

Every profile has collapsible Relationships, Relationship History and Pasture Log sections. Favorite Companion and Rival are identified by the strongest qualifying scores. Ordinary diaries retain 100 entries per horse; permanent milestones, significant disagreements, fights and separations remain in history. Shared entries reference one processed event. Barn provides compatibility warnings and Pasture History; Dashboard provides Important Pasture Events. Diary filters show All Events, Positive, Neutral, Negative and Important.

Hour, day and month skips all use the same saved hourly cursor and independent simulation random state. Day/month batching cannot replay already processed hours or bypass daily caps. Turnout defaults to the assigned hours beginning at 08:00; hours outside turnout, medical rest, absent bookings and disabled management produce no social interactions. Month skips cover the remaining days of the current 30-day month. Pregnancy and foal-age advancement at the month boundary now use those elapsed days, avoiding double-counting days already advanced individually.

Existing saves acquire empty relationship defaults without resetting horses, care, breeding, training, health, retirement or bookings. Pair history remains available when horses leave, die or change barns. The system stays optional behind the existing pasture-management switch.

### Validation

Run `node tests/pasture.test.cjs` with Node.js to execute 16 regression tests. These cover all 90 event templates and milestones, batching parity, reciprocal scores, daily caps, injury restrictions, foals/mothers, retired horses, missing companions, save migration, full save/load, diary limits, real time-advance functions, and a 100-horse stable. Browser checks cover diary filtering, compatibility warnings, pasture history and the three skip buttons.

## Optional stall, tack and fitting management

Open **Town → Tack Shop** to buy in-stock equipment and Stable Supplies. Select Size, then Color, and add items to the shopping cart. Stock and the next restock date persist in the save. Barn → Tack Room manages owned items, repairs, resale and horse assignments.

Settings → Optional Horse Management contains three independent switches: Stall Assignments, Tack Ownership & Inventory, and Saddle Fitting. They default to OFF on new and older saves. Switching a system off preserves its saved data. When ownership is off, compatible tack remains freely selectable.

Barn → Stall Management assigns numbered stalls, swaps neighbors and installs enrichment. Foals under one year share their mother’s stall. Horse profiles contain collapsed Tack & Equipment, fitting services, discipline presets, Stall History and Daily Behavior Log sections, plus an explanation of active mood factors.

Calendar → Create Calendar Horse Show provides event-specific equipment formats, including neck-rope, bitless and bareback events. Expand Equipment Rules / Permitted Tack on an event to review its own rules. Ordinary Shows retain the normal discipline restrictions.

Use all the JavaScript modules shipped with this version together. Do not mix the new index with older modules. Existing save/export/import paths are retained; no player save file is bundled or reset by this update.

Run the regression suites with Node.js:

```bash
node tests/management.test.cjs
node tests/pasture.test.cjs
```

See MANAGEMENT-VALIDATION.md for validation coverage and integration details.

## Shop and panel usability update

Every equipment type now has a 90% chance of being in stock at each scheduled restock. In-stock types offer every valid size/color combination, with larger total quantities. Existing sold-out variants, purchases, cart contents and restock dates survive the one-time stock expansion. Buying the final units can still deplete a variant normally.

The redesigned Town shop groups equipment by category, shows availability and prices, retains selected variants, and supports removing individual cart lines. Use Close Tack Shop or its Town button to close it explicitly.

Collapsible sections remember their open/closed state through actions, purchases, redraws and save/load. This includes carts, management settings, stall assignments, individual stall enrichment, Tack Room categories and horse details. Pastures is now collapsible. Stall horse, target and supply selections remain selected when still available.

## Stable quality-of-life and Calendar fixes

Management drawers, filters, horse selectors and scroll position now survive normal redraws. Pastures are collapsible. The Tack Shop includes an available-only filter, explicit missing variants and saved restock dates. Standard equipment rolls 80% stock availability; specialty equipment rolls 65%; every restock includes the four essential tack types. Existing stock is retained until its scheduled restock.

Retired horses use actual completed light exercise rather than competition-training minimums. Healthy auto-exercised retirees receive a light routine three days each week; the suggested range is 2–4 sessions. Medical restrictions override exercise. Current feeding/trainer diagnostics identify the actual failed condition and stop showing corrected conditions as active warnings. Current Mood Factors and Current Mood Selection Weights explain calculated effects.

Pasture companionship counts only suitable horses actually sharing overlapping turnout. Social 50–74 requires one companion and Social 75–100 requires two. Loneliness applies once per evaluation: +8 pp Distress for Social 50–74 with none; +10 pp for Social 75+ with none; +3 pp for Social 75+ with one. Loneliness diary observations add no second penalty. Ordinary pair losses cap at −5/day; positive gains remain capped at +5/day. Existing relationships remain saved.

Barn → Pastures → NPC Pasture Companions offers optional boarding-facility companions without buying more horses. They use real capacity, schedules and reciprocal relationships; scheduled departures are recorded, and identities/history survive separation and temporary returns.

New game-hosted Calendar events roll a saved 20% special-format selection, subject to discipline/level compatibility. Ordinary events and Shows-tab rules remain separate. Age categories, star indicators and Equipment Rules belong to each event. User-hosted shows move out of Upcoming after completion or expiry without losing records. Incorrect Calendar tack is checked during the existing result flow and appears as Disqualified, without placing, money or points.

Puissance Wall is isolated to its Calendar format. The event saves its start/increment/maximum, attempts, entry order, wall rounds and results. It reuses existing eligibility, equipment, rail/refusal/fall, health and fatigue values; rankings use cleared height and saved tie-breaks. Ordinary Showjumping remains unchanged.

Additional regression suites:

```bash
node tests/quality.test.cjs
node tests/calendar-expansion.test.cjs
```

## Training 2.0

Open Training, choose a horse, discipline and location, then continue to the lesson builder. Add or edit eligible exercises and start interactive training. Complete the warm-up before main work; repeat, simplify, change direction, edit fences or take breaks between attempts. End Session records actual work and progress. The optional calculation drawer explains bounded probabilities.

Expandable sections provide riding attributes and traits, fence/course construction, weekly schedules, rugs, named tack sets and live stall nameplates. Quick Training uses the same progression rules. Weekly automatic work respects medical restrictions, weather, retirement and the existing monthly learning allowance; scheduled entries are retained when work is postponed.

See `TRAINING2-AUDIT.md` for authoritative field mappings and `TRAINING2-VALIDATION.md` for limits, implementation choices and test coverage. Run `node tests/training2.test.cjs` for the new regression suite.

### Additive riding progression and incidents

Main Training Goal now selects a trainable attribute and boosts only relevant earned progress. The report shows relevance based on completed work, along with actual incidents, rider falls and qualifying recovery. Lunging offers with/without additional-aid modes and develops separate voice education. Existing builders and core RPG scenes remain available.

Weather refreshes on each in-game day, including chronological month skips. Arena activity is randomized and saved per facility/day; it is no longer player-selected. See `TRAINING2-EXTENSION-VALIDATION.md` for mechanics, bounds and validation. Run `node tests/training2-extension.test.cjs` for additive tests.

### Small training fixes

Normal training skills display whole numbers and each genuinely earned normal skill receives at least +1 per lesson, subject to existing potential ceilings. Riding attributes keep their precision and original gains. Monthly training caps are removed; fatigue and medical restrictions remain. Mood now refreshes after every elapsed time skip. Changing discipline refreshes the lesson and exercise options immediately. See `TRAINING-SMALL-FIXES.md`.

### Ridden exercise availability restoration

Ridden catalogs remain visible when an exercise is temporarily locked by equipment, health, fatigue or education. Locks show their reasons instead of emptying the list. If lunging equipment is still equipped, use Remove Lunging Equipment for Riding. Groundwork/Lunging retain their combined pool; ridden disciplines, Polework and Mixed have ridden choices. Existing progression and no-monthly-cap behavior are preserved. See `RIDDEN-EXERCISE-RESTORATION.md`.

### Auto-Training repair

Scheduled Auto entries run at 09:00 when time advances. Weekly Training Schedule → Auto-Training Reports shows actual gains, stamina consumed and reasons for postponed/skipped work. Auto and manual training share each horse's existing daily session allowance and recovery; no monthly skill cap applies. See `AUTO-TRAINING-FIX.md` for the audited limits and validation.

### Current training horse selection

Training always resolves the selected horse against the current owned roster. Stale saved selections are repaired, and temporary health/stamina restrictions show reasons instead of hiding owned horses. Optional current-barn lesson horses are labeled separately. The combined download retains the shared-stamina Auto-Training fix and no monthly progression cap. See `TRAINING-ROSTER-AUTO-VALIDATION.md`.

## Condition-specific medical realism

Horse profiles and the clinic provide Stall/Pasture Observation, diagnosis-dependent findings and scheduled treatment compliance. Care consumes recorded supplies and prepared prescription courses through the shared hour/day/month clock. Severe conditions require diagnostics, professional treatment and follow-up.

See `MEDICAL-REALISM-VALIDATION.md` for preserved incidence settings, residual-rate differences, emergency branches, validation and anatomical-model limits. Run `npm test`. Ship `medical-catalog.js` and `medical-ui.js` with the other modules.
