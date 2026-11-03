# Tack compatibility and rider-aid audit

Fictional game-balance mechanics. Existing item IDs, prices, ownership, sizing and durability are reused. No catalog items are added.

| Existing ID | Slot | Price |
|---|---|---:|
| Neck Rope | bridle | $35 |
| Hackamore | bridle | $180 |
| Snaffle Bridle | bridle | $120 |
| Flash Bridle | bridle | $155 |
| Drop Noseband Bridle | bridle | $160 |
| Figure-8 Bridle | bridle | $190 |
| Double Bridle | bridle | $450 |
| Plain Cavesson Bridle | bridle | $115 |
| Anatomical Bridle | bridle | $260 |
| Loose Ring Snaffle | bit | $45 |
| Eggbutt Snaffle | bit | $60 |
| D-Ring Bit | bit | $70 |
| Pelham Bit | bit | $125 |
| Gag Bit | bit | $135 |
| Full Cheek Snaffle | bit | $75 |
| French Link Snaffle | bit | $85 |
| Straight Bar Bit | bit | $80 |
| Weymouth & Bradoon Set | bit | $220 |
| All-Purpose Saddle | saddle | $1,200 |
| Jumping Saddle | saddle | $2,300 |
| Dressage Saddle | saddle | $2,500 |
| Close-Contact Saddle | saddle | $2,100 |
| Endurance Saddle | saddle | $1,800 |
| Western Saddle | saddle | $2,000 |
| Racing Saddle | saddle | $1,100 |
| Short Schooling Crop | crop | $18 |
| Dressage Whip | crop | $24 |
| Jumping Bat | crop | $28 |
| Rounded Dummy Spurs | spurs | $35 |
| Rounded Short-Neck Spurs | spurs | $42 |
| Smooth Roller Spurs | spurs | $65 |

Unsupported, not added: Hanging-Cheek/Baucher, explicitly double-jointed models beyond the existing French Link, Kimberwick, Elevator/Universal, Combination Bit, separate Weymouth/Bradoon pieces, Micklem, Sidepull and Cross-Under bridles. Gag Bit remains generic and is not silently renamed Dutch Gag/Pessoa. Straight Bar Bit remains a mouthpiece variation, not an inferred Mullen design. Hackamore remains existing bitless equipment.

Suitability is a derived view, not another inventory. It uses existing size/fit data (40%), explicit horse comfort/preference when recorded (25%), rider compatibility (20%) and existing item condition (15%). Unknown data uses neutral acceptable values; no examination is invented. Double Bridle + Weymouth & Bradoon is an existing multi-component configuration and uses one Advanced coordination check. Otherwise tiers require existing configuration metadata; item price is never used.

Communication checks extend the existing technical outcome. They do not roll a second refusal or change the pole plan. Resolved failures receive one saved severity event, bounded temporary tension/focus changes and at most four points of trust/collection loss per session from these errors. Old generic trust/collection penalties from the same attempt are replaced, preventing duplicate learning. Existing sensitivity affects reaction tension, not probability.

Ordinary crops/spurs have no automatic bonus or repeated-use punishment in Rider Realism. Aids must exist, be owned, assigned and usable. Existing auxiliary IDs use phase/class allow flags; established bit/bridle/saddle rules are unchanged. Deliberate misuse continues through the existing gated welfare story processor.

All nine learned statistics have eligible-context functions. Menus derive scores without resolving events. The veterinary engine remains the source of actual skin findings: no spur-use count, injury threshold, new diagnosis or treatment is created by this module.

Thirty supplied narratives are available under actual outcome, fit, severity, history, class and medical predicates. Appropriate positive interactions do not themselves add automatic aid bonuses.

Validation: exact numerical tables and 22% example; all existing item IDs/no invented items; real owned crop assignment and save/load; class restrictions; idempotent severity consequences and session caps; protected skills/potential/Bond/QOL/medical truth; all nine learned modifiers. Full-suite and browser results are recorded in the PR.

Files: tack-rider-aids.js, index.html, package.json, rider-realism.js (avoids duplicate legacy learned-spook contribution), tests/tack-rider-aids.test.cjs and the existing rider realism tests updated to equip actual owned aids.

Final validation (2026-11-03): complete `npm test` exited 0; seven tack regression groups passed. Browser loaded an existing three-horse saved stable, opened Equipment Suitability, started interactive flatwork, completed warm-up and resolved a mounted lesson; no warning/error console entries. The aid selector showed only None with no aids equipped.
