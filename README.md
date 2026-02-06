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
- Training clinic-style report generation and in-app report feed.
