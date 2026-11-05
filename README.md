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

## Save/load checkpoints

Save Game creates or explicitly replaces the named checkpoint. Normal actions autosave the current session separately, so they cannot overwrite a checkpoint you intend to reload. Load Game restores the selected checkpoint; reopening the game resumes the latest session. The Save/Load panel reports success and storage errors directly. Existing save slots remain supported. See `SAVE-LOAD-VALIDATION.md`.

## Critical fixes and balance update

Verified saves, scoped quarterly backup recovery, owned-horse buyer workflows, condition-based veterinary/PPE findings, updated new-market/rescue distributions, and cumulative work aggravation are documented in [CRITICAL-UPDATE-REPORT.md](CRITICAL-UPDATE-REPORT.md). Undiagnosed horses remain workable; diagnosed conditions enforce veterinary restrictions. Run `npm test` for the unit, integration and original-system regression checks.

## Performance update

Visible-panel redraws, faster compatible save compression and scoped UI-state scans reduce work during normal play. See [PERFORMANCE-VALIDATION.md](PERFORMANCE-VALIDATION.md) for measurements and compatibility checks. Run `npm test` for all feature checks and `npm run test:benchmark` for the informational save benchmark.

## Soundness longevity, therapy and round pole faults

Soundness now uses an integer-month clock and years.months display. Veterinary therapy is an interactive fourteen-day course; routine history/receipt controls preserve authoritative clinical and financial records. Showjumping uses one height-based pole-event chance per whole round. See [SOUNDNESS-THERAPY-VALIDATION.md](SOUNDNESS-THERAPY-VALIDATION.md) for effective rules, migration details and all validation results.

## Training Behavior Engine 5.2

Enable Rider Realism in the existing settings. Training 2.0 controls, exercises, skill progression, Quick/Auto training, competition scoring, genetics and QOL are preserved; Bond keeps its existing rewards and limits. Learned scores update directly on the horse after each real event and persist with decimal precision.

Each genuine jump has its own saved refusal/run-out decision using the latest horse and rider values. Numerical Quick rounds recalculate inside the fence loop; replaying a resolved attempt or reopening a menu cannot reroll it. Fallen poles retain their separate round-level model.

Barn care buttons now save completed Bond activities, including Care for all. Groom remains +8 and Hand Graze +5, with actual bounded gains displayed. The existing monthly rewards are protected against duplicate processing; no new daily passive reward or activity cap was introduced.

Outcome messages and session summaries announce only actual before/after changes. Falls record their real cause, Minor/Moderate/Serious/Critical severity, relevant learned losses and assessment state. All 24 supplied fall quotes and eight status quotes require matching recorded evidence. Serious and critical incidents use the existing medical review pathways without diagnosing an injury from severity alone.

Refusal/run-out baseline is **4% for avoidance 0–2**, then linear interpolation across 3–10 (15–25%), 11–30 (30–40%), 31–50 (45–55%), 51–75 (65–75%) and 76–100 (85–90%). Rider level, height experience, confidence, effective rider trust and current tension modify it; final risk is **1–95%**. Fence type and unfamiliar obstacles add no refusal probability.

Ordinary learning uses small fractional session budgets. Qualifying mounted sessions gain general trust by rider level: Beginner 0–0.25, Novice 0.25–0.5, Intermediate 0.5–0.75, Advanced +3 and Professional +3. A qualifying session adds +1 Trust in Rider’s Aids when Leg Stability is below 20 with no spurs, or Hand Stability is below 20 without a Pelham; this compatibility bonus applies once, even if both conditions match. Unsafe tack or neglectful choices prevent these positive session bonuses. Compact rider-specific adjustments persist separately and affect aid checks, refusal and bolt risk. Empty or contradictory sessions earn no trust bonus.

Clean-jump confidence uses the established +2/+3/+4 weighted outcome: one initial award per session, then another award on the second consecutive clean jump and each further clean jump in that streak. An unsuccessful or punished attempt resets the streak. Failed jumps can lower confidence at **every rider level**, using the existing ordinary session learning budget. Punishment lowers confidence at every level and withdraws confidence earned for the punished attempt, including its reward. Jumping walk breaks and circling away restore confidence at every rider level, including Beginner/Novice, even before the first attempt and at zero tension. Reward Successful Attempt adds +1 confidence up to 100 and −1 avoidance down to zero, once per actual unpunished success. Advanced/Professional riders also lower avoidance by 0.5 once per qualifying safe jumping session. Reassessment, investigation, walk breaks and reorganization share the live avoidance score with **no fixed recovery cap**. Jumping walk/circle actions always earn their bounded recovery; reassessment and investigation still require a real unresolved concern.

Spooks require actual environmental stimuli. Natural Spookiness, learned sensitivity and arena confidence affect likelihood; temperament affects severity and conditional bolt escalation. One primary incident has at most one escalation and one rider balance resolution. Separate horse falls can occur after a qualifying slip or serious disruption; rotational subtypes require serious jumping horse falls. Falls preserve unrelated statistics and pause Interactive Training for a player choice to get back on or end the session. No fall-clearance requirement blocks riding; genuine medical restrictions remain. Quick/Auto training still stops after a fall, and falls still eliminate in shows.

All weather remains available indoors and outdoors. Outdoor warnings require player review before Interactive or Quick training in poor conditions. Footing controls slip risk; sheltered indoor arenas use their actual footing without outdoor weather penalties. Auto Training retains its delegated scheduling and actual event resolution.

The 140 existing, 88 Engine 5.1 and 32 Engine 5.2 narrative rules describe recorded evidence after effects resolve. Reports show actual start/finish values, trust, recovery and incidents. The behavioral reassessment panel remains exclusive to training.

Validation: `npm test`, `npm run test:behavior5-simulation` and `npm run test:behavior51-simulation`. See [the 5.1 implementation report](TRAINING-BEHAVIOR51-REPORT.md) and [conditional incident simulation results](outputs/training-behavior51-simulation.json). The [5.0 report](TRAINING-BEHAVIOR5-REPORT.md) records the historical rules superseded by this addendum.

See [the 5.2 investigation and validation report](TRAINING-BEHAVIOR52-REPORT.md). Run `npm run test:behavior52-simulation` for the conditional severity distribution.

### Fall balance, recovery and result displays

Training uses reduced incident-related fall probabilities. With Seat Stability and Balance both at 60, refusal/run-out falls use 15% (previously 45%), significant spook/bolt falls 13% (previously 40%), significant buck/rear falls 17% (previously 50%), and major disruptions 22% (previously 65%). Existing stability multipliers still apply, with a 35% cap. Conditional horse-fall chances are 3% after a slip, 4% after major imbalance, 5% after a serious jumping disruption and 6% with severe footing plus an incident. These supersede the historical 5.1 probability values. Severity distributions and the conditional rotational subtype remain in place; fall details remain recorded without requiring riding clearance.

Horse cards show a single **base refusal/run-out risk per jump**, with avoidance and percentage rounded to one decimal for display, for example `12.3/100` and `30.7% per jump`. Stored values and the actual rider-adjusted probability keep their precision. Every actual fall now displays **Fall intensity: Minor / Moderate / Serious / Critical** in the immediate outcome, report and history.

Show rider-fall and horse-fall probabilities are one-third of the corresponding previous chances, capped at 12%. For example, a refusal with Seat Stability and Balance both at 60 now has a 5% rider-fall chance in a show, compared with 15% in training. Legacy numerical rounds, Hunter/XC fallback resolution and Puissance use the same show reduction. Refusal rates, severity distributions and fall assessment requirements retain their existing rules.

During jumping, every walk-break or circle-away action lowers current tension toward zero, lowers avoidance by 1–2, and adds 0.5–1 confidence at every rider level. Refusals/run-outs raise tension by 5, once per actual incident. Pause and assess / Allow time to investigate also lower avoidance by 1–2 after a genuine refusal. Reorganization retains its weighted chance of no improvement. All actions share the live horse values; jumping walk breaks/circling away also improve confidence and avoidance when tension is already zero. Medical restrictions still prevent permanent recovery awards.

Show results and saved histories display **Eliminated — Fall** or **Eliminated — Refusal**, preserving the recorded reason through eventing phases and queued results. Fall eliminations include the recorded intensity. Unknown historical reasons remain unspecified. Scores, faults, refusal limits and prizes follow the existing rules.

`npm test` includes seven additional integration groups in `tests/fall-recovery-display.test.cjs`. The refusal/course simulation preserves the existing refusal rates; the updated 80,000-trial incident simulation confirms the reduced fall rates. Chromium checks cover the actual card, walk-break control, intensity feedback, both elimination causes and cold save/reload.

See [show fall and training learning validation](SHOW-LEARNING-REPORT.md) for the latest learning rules and checks.

### Lesson-horse leases and buyouts

Lesson profiles show personality, coat, height, all four discipline levels, and barn-managed tack. Lease prices are saved at $50–$200/month, with a player-selected duration of 1 up to each horse’s saved availability-based maximum (at most 12 months). The first month is paid at signing and is not charged again at the first monthly rollover. Leases retain their progress on return and cannot duplicate a horse or make it simultaneously available in the lesson roster.

Some horses have saved buyout offers with individual 1–6 month deadlines. Offers can be withdrawn or the horse can be bought by another rider; NPC/player purchases remove that horse from the barn. Players can buy out their active lease without duplicating it. Expired offers cannot be purchased, and active leases prevent NPC sales until return.

Barns below 2 lesson stars overwork their lesson horses, reflected in fatigue, and sometimes assign personality-mismatched tack. Other barns select suitable tack. Barn equipment works with Tack Ownership both on and off. Footing commentary is limited to once per training session. Jumping show refusals cost 4 faults for the first and eliminate on the second, including both eventing jumping phases; falls still eliminate.

See [training, show and lesson-horse validation](TRAINING-LEASE-UPDATE.md).

### Leased riding and session gains

The barn Train button opens the active leased copy, and older saved leases recover their player-owned availability flags. The source remains unavailable to the lesson program while leased.

A qualifying completed session now totals +3–5 in its main technical skill and +1.5–2.0 in its relevant riding attribute, including exercise-led sessions. These amounts include progress already earned during the lesson. Actual relevant work is required; short, empty, unsuccessful or unrelated lessons do not receive a completion award. Genetic skill ceilings and the 10-point riding-attribute maximum still apply. Completion rewards do not alter Behavior & Temperament scores, and cannot be claimed again by finishing or viewing a report twice or reloading a save.

### Saved riders and time skipping

Settings → Rider Realism → Saved riders lets you create, name and select multiple riders. Each profile keeps its overall level, seven abilities and all four discipline experience levels. Save Rider Realism saves the current profile; switching or creating a rider also saves current form edits. New riders copy the current values so they can then be edited independently. Names can change while the rider’s underlying identity stays stable, preserving rider-specific trust and historical events. Existing rider settings migrate into the first profile, and profiles travel with normal saves and portable backups.

Skip Day and Skip Month remain enabled during pending veterinary emergencies. The existing medical warnings stay visible and the calendar continues processing care, recovery and medical consequences, allowing treatment that requires time to progress.
