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
