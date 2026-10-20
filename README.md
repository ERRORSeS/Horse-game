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

Each horse has a persistent Social score from 0 to 100. Scores below 25 prefer being alone; 25–49 tolerate either arrangement but have a 15% fight risk with companions; 50–74 need at least one companion; 75–100 need at least two. Unsuitable turnout produces Uncomfortable or Stressed mood and a trainer note. Scores 0–10 have a 30% aggression risk with companions; Hot-Blooded and Excitable horses have a separate 15% fight risk. These risks apply only during shared turnout. Existing staff, crowding, and stallion risks still apply.

Recurring conformation settings are individual to each horse. Choose every X months, selected calendar months, or every month except selected months. Month selections repeat yearly, and show eligibility still applies. Old interval schedules remain supported. New Social scores, turnout preferences, bookings, and schedule settings are included in saves.
