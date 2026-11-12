# OXER TO OXER — COMPLETE BREED EXPANSION & ATHLETIC POTENTIAL 8.8

## 30 New Breeds • Realistic Heights • Breed Categories • Showjumping & Dressage Potential • Eventing & Hunter Abilities • Exceptional Individuals • Competition Levels • Branding • Coat Compatibility

**CODEX IMPLEMENTATION PROMPT — ADD MISSING BREEDS WITHOUT ALTERING EXISTING BREEDS**

# 0. MAIN OBJECTIVE

The game currently has 29 primary breed entries.

The expanded coat-color database includes 30 additional breeds that are not represented individually in the original main breed roster.

**ADD ALL 30 MISSING BREEDS AS FULLY FUNCTIONAL BREEDS.**

Each added breed needs:

1. Official in-game breed name.
2. Unique breed ID.
3. Breed abbreviation / branding code.
4. Breed category.
5. Horse or pony classification.
6. Realistic adult height distribution.
7. Showjumping skill potential.
8. Dressage skill potential.
9. Eventing skill potential.
10. Hunter skill potential.
11. Realistic potential competition height.
12. Suitable competition disciplines.
13. Individual genetic potential variation.
14. Rare exceptional individuals.
15. Compatibility with the existing coat-color catalog.
16. Compatibility with breeding, sales, auctions, training, competitions and NPC careers.

**Do not impose fixed hard caps that make exceptional horses impossible.**

The numerical values below are deliberately chosen fictional game-balance estimates informed by breed characteristics. They are not scientifically established breed-wide statistical maxima.

---

# PART I — PRESERVE THE CURRENT BREED ROSTER

## 1. DO NOT REMOVE OR CHANGE EXISTING BREEDS

Keep these existing breed names and branding codes:

| Existing breed | Branding |
|---|---|
| American Warmblood | AW |
| Baden-Wuerttemberg | BWA |
| Bavarian Warmblood | BW |
| Belgian Warmblood | BW |
| Canadian Warmblood | CW |
| Danish Warmblood | DW |
| Dutch Warmblood | DDW |
| Gelderlander | GE |
| Hanoverian | HA |
| Hessen | HE |
| Holsteiner | HO |
| Oldenburg | OLD |
| Polish Warmblood | PW |
| Rhineland | RH |
| Selle Francais | SF |
| Swedish Warmblood | SW |
| Trakehner | TR |
| Westphalian | WE |
| Zweibrucker | ZW |
| Arabian | AR |
| Draft | DR |
| Iberian Horse | IH |
| Riding Pony | RP |
| Thoroughbred | TH |
| Welsh Pony A | Existing code |
| Welsh Pony B | Existing code |
| Welsh Pony C | Existing code |
| Welsh Pony D | Existing code |
| Friesian | Existing code |

Do not change the existing Belgian/Bavarian branding-code overlap just because both currently use BW.

Internal breed IDs must remain unique regardless of display-branding codes.

### Existing generic breeds

Do not replace:

- Draft.
- Iberian Horse.
- Riding Pony.

These are broader existing classifications.

The newly added specific breeds must coexist with them.

For example:

- Andalusian / PRE is a new specific breed.
- Iberian Horse remains a valid existing generic breed.

Similarly:

- Belgian Draft is added separately.
- The generic Draft breed remains.

Do not automatically convert existing horses into newly introduced specific breeds.

---

# PART II — ADD THE 30 MISSING BREEDS

## 2. NEW BREED NAMES AND BRANDING

Branding codes below are fictional in-game identifiers unless the game already has a verified equivalent. Do not present them as official real-world studbook brands.

| New breed | Code | Breed category |
|---|---|---|
| Zangersheide | ZANG | Sport Warmblood |
| Irish Sport Horse | ISH | Sport Horse |
| Quarter Horse | QH | Stock Horse |
| American Paint Horse | APH | Stock Horse |
| Appaloosa | APP | Stock Horse |
| Knabstrupper | KN | Spotted Sport Horse |
| Connemara Pony | CON | Sport Pony |
| Shetland Pony | SHET | Small Pony |
| Icelandic Horse | ICE | Gaited/Northern Horse |
| Haflinger | HAF | Light Draft/Riding Horse |
| Cleveland Bay | CB | Carriage/Sport Horse |
| Norwegian Fjord | NF | Northern Riding/Driving Horse |
| Andalusian / PRE | PRE | Iberian/Baroque Horse |
| Lusitano | LUS | Iberian/Baroque Horse |
| Akhal-Teke | AT | Light Athletic Horse |
| Morgan | MOR | Versatile Riding Horse |
| Tennessee Walking Horse | TWH | Gaited Horse |
| Gypsy Cob | GCOB | Cob/Driving Horse |
| Clydesdale | CLY | Heavy Draft |
| Shire | SHI | Heavy Draft |
| Percheron | PER | Heavy Draft |
| Belgian Draft | BDR | Heavy Draft |
| Standardbred | STB | Racing/Driving Horse |
| Mustang | MUS | Versatile Range Horse |
| Miniature Horse | MINI | Miniature Horse |
| Pony of the Americas | POA | Sport/Stock Pony |
| Australian Stock Horse | ASH | Stock/Sport Horse |
| Lipizzaner | LIP | Classical Dressage Horse |
| Noriker | NOR | Heavy Draft |
| Finnhorse | FIN | Versatile Northern Horse |

**All 30 must be genuinely added to the breed registry and be selectable wherever the existing game supports selecting breeds.**

Do not add only a display name.

---

# PART III — ADULT HORSE HEIGHTS

## 3. REALISTIC BREED HEIGHT DISTRIBUTIONS

Use hands high (hh), with actual horse-height notation.

For example:
- 15.0 hh.
- 15.1 hh.
- 15.2 hh.
- 15.3 hh.
- 16.0 hh.

Do not generate invalid heights such as 15.4 hh.

### Suggested adult ranges

| Breed | Typical adult height |
|---|---|
| Zangersheide | 16.0–17.3 hh |
| Irish Sport Horse | 15.2–17.2 hh |
| Quarter Horse | 14.2–16.1 hh |
| American Paint Horse | 14.2–16.2 hh |
| Appaloosa | 14.2–16.1 hh |
| Knabstrupper | 15.2–17.1 hh |
| Connemara Pony | 12.2–14.2 hh |
| Shetland Pony | 7.0–10.2 hh |
| Icelandic Horse | 12.3–14.2 hh |
| Haflinger | 13.2–15.1 hh |
| Cleveland Bay | 16.0–16.3 hh |
| Norwegian Fjord | 13.1–14.3 hh |
| Andalusian / PRE | 15.0–16.3 hh |
| Lusitano | 15.0–16.3 hh |
| Akhal-Teke | 15.0–16.2 hh |
| Morgan | 14.1–16.1 hh |
| Tennessee Walking Horse | 14.2–17.0 hh |
| Gypsy Cob | 13.0–16.1 hh |
| Clydesdale | 16.0–18.0 hh |
| Shire | 16.2–19.0 hh |
| Percheron | 15.2–18.0 hh |
| Belgian Draft | 16.0–18.0 hh |
| Standardbred | 14.2–17.0 hh |
| Mustang | 13.0–15.3 hh |
| Miniature Horse | 7.0–9.2 hh |
| Pony of the Americas | 11.2–14.0 hh |
| Australian Stock Horse | 14.0–16.2 hh |
| Lipizzaner | 14.2–16.2 hh |
| Noriker | 15.0–17.1 hh |
| Finnhorse | 14.3–16.1 hh |

These are approximate generation ranges. Where an actual registry prescribes a stricter measured-height requirement, distinguish its registration rule from the biological variation of the breed.

## 3.1 Height generation

Do not distribute all heights equally.

Use a realistic bell-shaped or similarly center-weighted distribution.

Most horses should fall near their breed's typical middle height.

Very small or very tall individuals should be less common.

An exceptionally tall individual should be possible where biologically plausible.

## 3.2 Horse versus pony status

Determine formal pony-class eligibility from actual measured height and event rules, not simply the breed's name.

Examples:
- Connemaras generally qualify as ponies when within the applicable measurement limit.
- A small horse may qualify for some classes where permitted.
- A tall Icelandic Horse does not automatically qualify for every official pony championship.
- A miniature horse does not automatically qualify for ordinary ridden pony jumping.

Keep existing competition and pony-measurement rules.

## 3.3 Growth

If the game already models horse growth:

- Use appropriate age-dependent growth curves.
- Approach adult height gradually.
- Do not generate a newborn at its full mature height.
- Preserve each horse's projected mature height.

Do not rewrite the existing growth system.

---

# PART IV — DISCIPLINE POTENTIAL

## 4. FOUR MAIN SPORTING DISCIPLINES

Every new breed receives potential ratings for:

- Showjumping.
- Dressage.
- Eventing.
- Hunters.

Use 0–100.

**These are breed-level reference centers for potential, NOT the current skills automatically granted to every horse.**

Actual horses must have individual ability values, individual training progress and individual genetic potential.

### Reference potential values

| Breed | Jumping | Dressage | Eventing | Hunters |
|---|---:|---:|---:|---:|
| Zangersheide | 94 | 83 | 82 | 86 |
| Irish Sport Horse | 89 | 80 | 94 | 85 |
| Quarter Horse | 66 | 73 | 68 | 77 |
| American Paint Horse | 68 | 72 | 68 | 77 |
| Appaloosa | 72 | 72 | 76 | 79 |
| Knabstrupper | 83 | 91 | 77 | 82 |
| Connemara Pony | 90 | 79 | 90 | 93 |
| Shetland Pony | 43 | 57 | 46 | 60 |
| Icelandic Horse | 60 | 74 | 68 | 66 |
| Haflinger | 71 | 79 | 74 | 80 |
| Cleveland Bay | 76 | 80 | 76 | 78 |
| Norwegian Fjord | 65 | 72 | 71 | 74 |
| Andalusian / PRE | 72 | 95 | 70 | 74 |
| Lusitano | 79 | 95 | 80 | 77 |
| Akhal-Teke | 85 | 82 | 89 | 76 |
| Morgan | 77 | 83 | 79 | 83 |
| Tennessee Walking Horse | 61 | 65 | 63 | 70 |
| Gypsy Cob | 66 | 71 | 68 | 79 |
| Clydesdale | 49 | 59 | 48 | 63 |
| Shire | 41 | 55 | 42 | 60 |
| Percheron | 53 | 63 | 54 | 67 |
| Belgian Draft | 44 | 57 | 45 | 63 |
| Standardbred | 67 | 68 | 78 | 69 |
| Mustang | 73 | 71 | 81 | 79 |
| Miniature Horse | 36 | 50 | 31 | 48 |
| Pony of the Americas | 79 | 74 | 82 | 84 |
| Australian Stock Horse | 83 | 79 | 91 | 84 |
| Lipizzaner | 65 | 96 | 67 | 71 |
| Noriker | 56 | 70 | 59 | 70 |
| Finnhorse | 79 | 82 | 85 | 85 |

These numbers are explicitly **fictional balancing values**.

They reflect typical breed-purpose tendencies, not universal ability.

Do not interpret them as rigid restrictions.

---

# PART V — SHOWJUMPING COMPETITION HEIGHT POTENTIAL

## 5. BREED-APPROPRIATE JUMPING HEIGHTS

Every horse should have an individual potential competition height.

The following table defines approximate performance ranges for well-trained, suitable individuals of the breed.

**Typical** means a plausible upper competitive range for a talented representative of the breed, not what every ordinary horse can safely jump.

**Exceptional** means an uncommon individual with unusually high athletic potential.

| Breed | Talented typical upper range | Rare exceptional upper height |
|---|---|---|
| Zangersheide | 1.40–1.60 m | 1.70 m |
| Irish Sport Horse | 1.25–1.50 m | 1.60 m |
| Quarter Horse | 0.75–1.05 m | 1.20 m |
| American Paint Horse | 0.80–1.10 m | 1.25 m |
| Appaloosa | 0.85–1.15 m | 1.30 m |
| Knabstrupper | 1.15–1.40 m | 1.55 m |
| Connemara Pony | 1.05–1.30 m | 1.40 m |
| Shetland Pony | 0.30–0.60 m | 0.75 m |
| Icelandic Horse | 0.50–0.90 m | 1.10 m |
| Haflinger | 0.80–1.10 m | 1.25 m |
| Cleveland Bay | 1.05–1.30 m | 1.45 m |
| Norwegian Fjord | 0.65–1.00 m | 1.15 m |
| Andalusian / PRE | 0.85–1.15 m | 1.35 m |
| Lusitano | 1.00–1.30 m | 1.45 m |
| Akhal-Teke | 1.15–1.40 m | 1.55 m |
| Morgan | 1.00–1.25 m | 1.40 m |
| Tennessee Walking Horse | 0.65–0.95 m | 1.10 m |
| Gypsy Cob | 0.65–1.05 m | 1.20 m |
| Clydesdale | 0.45–0.80 m | 1.00 m |
| Shire | 0.35–0.75 m | 0.90 m |
| Percheron | 0.50–0.90 m | 1.05 m |
| Belgian Draft | 0.40–0.75 m | 0.95 m |
| Standardbred | 0.75–1.05 m | 1.25 m |
| Mustang | 0.85–1.15 m | 1.35 m |
| Miniature Horse | 0.20–0.45 m | 0.60 m |
| Pony of the Americas | 0.90–1.15 m | 1.30 m |
| Australian Stock Horse | 1.05–1.30 m | 1.45 m |
| Lipizzaner | 0.70–1.00 m | 1.20 m |
| Noriker | 0.55–0.90 m | 1.10 m |
| Finnhorse | 1.00–1.25 m | 1.40 m |

### Important

These are not automatic jump heights, training recommendations, or safe heights for every horse.

The actual horse must develop the relevant training, conditioning and experience before attempting an appropriate competition.

Rare exceptional ability does not remove the effects of:
- Age.
- Fitness.
- Training.
- Recovery.
- Injury.
- Rider skill.
- Behavioral difficulties.
- Competition rules.

For miniature horses and very small ponies, do not automatically provide ordinary ridden jumping careers that are inappropriate for their size. Where the game lacks an appropriate driving, in-hand or specialist event format, preserve the breed for breeding, management and other existing compatible gameplay.

---

# PART VI — DRESSAGE POTENTIAL AND LEVELS

## 6. DRESSAGE SKILL VS COMPETITION LEVEL

Dressage skill is numerical, but competition level is a separate progression.

Possible competition levels under the existing game system include:

- Introductory.
- Preliminary.
- Novice.
- Elementary.
- Medium.
- Advanced Medium.
- Advanced.
- Prix St. Georges.
- Intermediate I.
- Intermediate II.
- Grand Prix.
- Grand Prix Special.
- Grand Prix Freestyle.

Use the game's actual existing classifications if they differ.

Do not add duplicate dressage levels.

## 6.1 Discipline-specific strengths

Examples:

**Lipizzaner**
- Strong potential for collection.
- Good lateral movement.
- Strong classical dressage suitability.
- Grand Prix potential in appropriately talented individuals.

**Andalusian / PRE**
- Strong collection and lateral-work suitability.
- High dressage potential.
- Less emphasis on elite showjumping specialization.

**Lusitano**
- Strong collection.
- High dressage potential.
- Often versatile between classical work and other disciplines.

**Zangersheide**
- Strong jumping specialization.
- Capable of dressage development.
- Not automatically inferior in every flatwork skill.

**Connemara**
- Versatile pony.
- Strong potential for sport-pony jumping, eventing and hunters.
- Capable of progressing in pony dressage.

**Irish Sport Horse**
- Particularly strong eventing suitability.
- High jumping potential.
- Balanced overall sport-horse development.

## 6.2 Dressage competition ceilings

Do not allow a horse's breed label alone to unlock or prevent Grand Prix.

For a horse to compete successfully at Grand Prix level, it should need:
- Sufficient actual dressage skills.
- Relevant movement capabilities.
- Appropriate training history.
- Suitable collection and balance.
- Rider ability.
- Competition qualification.

A rare exceptional Quarter Horse or Haflinger may develop much higher dressage ability than an average individual.

Similarly, a poorly trained Lipizzaner must not start at Grand Prix just because its breed has high dressage potential.

---

# PART VII — EXCEPTIONAL HORSES

## 7. INDIVIDUALS CAN BE BETTER THAN THEIR BREED'S USUAL POTENTIAL

This is essential.

Use the existing exceptional-potential system from Update 8.1 where present.

Suggested distribution:

| Genetic potential category | Probability | Potential adjustment |
|---|---:|---|
| Normal individual | 95% | Normal breed-based variation |
| Exceptional | 4% | +4 to +8 potential points |
| Very Exceptional | 0.9% | +9 to +13 potential points |
| Extraordinary | 0.1% | +14 to +18 potential points |

Total = 100%.

This is a fictional rarity distribution.

**Roll the exceptional category once per horse.**

Store the result permanently.

Do not reroll potential when reloading, purchasing or selling.

## 7.1 Exceptionality must be discipline-specific

A horse can be:

- Exceptional in showjumping.
- Ordinary in dressage.
- Excellent in eventing.
- Average in hunters.

Or:

- Extraordinary in dressage.
- Below average in jumping.

Do not automatically make every exceptional horse perfect at all disciplines.

Use correlated but individual discipline potentials based on the horse's inherited aptitude.

## 7.2 Examples

**Exceptional Zangersheide**
- Very high jumping genetic potential.
- Possibly capable of competing at 1.60–1.70 m.
- Does not automatically have exceptional dressage talent.

**Exceptional Connemara**
- Very high jumping suitability relative to its size.
- May develop toward elite pony jumping levels.
- Still respects actual pony measurements and eligibility.

**Exceptional Lipizzaner**
- Excellent dressage genetic potential.
- Potential Grand Prix horse.
- May remain ordinary in jumping.

**Exceptional Appaloosa**
- Particularly talented eventer or hunter.
- Better jumping ability than an average Appaloosa.
- Still requires training.

**Exceptional Finnhorse**
- Unusually strong dressage, jumping or eventing potential.
- May reach a noticeably higher competitive level than most of its breed.

## 7.3 Do not produce unrealistic universal superhorses

Rare exceptional horses should feel special, not biologically nonsensical.

Do not allow every breed to reach the same elite jumping height merely because a numerical skill reaches 100.

Technical skill, physical scope and competition performance are related but distinct.

For unusually high results, validate that the individual generated phenotype and inherited capability plausibly support the performance.

## 7.4 No rigid breed-based punishment

Do not forcibly cap an already exceptional horse simply because a standard breed table suggests a lower typical performance level.

Allow rare outliers through the exceptional system while respecting appropriate physical and eligibility constraints.

---

# PART VIII — BREED POTENTIAL GENERATION

## 8. SOFT CAPS, NOT UNIVERSAL HARD CAPS

Each new horse should have individual genetic potentials.

Suggested process:

1. Read the breed reference potential values.
2. Generate inherited discipline-specific ability.
3. Apply normal genetic variation.
4. Resolve inherited athletic traits from parents where applicable.
5. Apply the once-per-horse exceptional category.
6. Store individual potential ceilings.
7. Resolve individual plausible competitive scope.
8. Generate the horse's initial actual skills separately.

Do not automatically initialize skills at their potential maximum.

### Example

A young Irish Sport Horse might have:

- Jumping Potential: 91.
- Dressage Potential: 76.
- Eventing Potential: 98.
- Hunter Potential: 82.

Its actual current skills could still be low.

That horse may eventually become a particularly strong eventer if trained appropriately.

## 8.1 Individual subskills

Map the four discipline potentials to the actual existing individual horse skills.

For example:

**Showjumping**
- Striding.
- Confidence.
- Balance.
- Power.
- Speed.
- Structure.

**Dressage**
- Collection.
- Balance.
- Connection.
- Gaits.
- Rhythm.
- Flowiness.

Also map to the actual existing Eventing and Hunter skill fields.

Do not overwrite:
- Temperament.
- Natural Spookiness.
- Learned Fence Avoidance.
- Learned Trust in Aids.
- Existing riding attributes.

Breed athletic tendencies should not predetermine a horse's entire personality.

## 8.2 Subskill differences

Even horses from the same breed should differ.

Example:

Two Zangersheides:

**Horse A**
- Excellent Power.
- Excellent Speed.
- Average Balance.
- Lower Jump Confidence.

**Horse B**
- Excellent Balance.
- Excellent Structure.
- Average Speed.
- Excellent Jump Confidence.

Both might have comparable overall jumping potential but ride differently.

## 8.3 Genetic inheritance

Offspring potential should depend on:
- Both parents.
- Parent-specific athletic potential.
- Normal Mendelian and polygenic inheritance approximations.
- The existing breeding system.
- A controlled random component.

Do not reroll foal performance using only an unrelated breed average.

Mixed-breed horses should inherit a combination of parental traits.

---

# PART IX — SUITABLE DISCIPLINES

## 9. BREED DISCIPLINE SPECIALIZATIONS

Provide reasonable categories for the added breeds.

| Breed | Primary suggested specialties |
|---|---|
| Zangersheide | Showjumping, Sport Horse |
| Irish Sport Horse | Eventing, Showjumping |
| Quarter Horse | Stock Riding, Hunters, General Riding |
| American Paint Horse | Stock Riding, Hunters, General Riding |
| Appaloosa | Hunters, Eventing, General Riding |
| Knabstrupper | Dressage, Showjumping, Hunters |
| Connemara Pony | Pony Jumping, Eventing, Hunters |
| Shetland Pony | Pony Management, In-hand/Driving where supported |
| Icelandic Horse | Gaited Riding, General Riding |
| Haflinger | General Riding, Dressage, Driving |
| Cleveland Bay | Driving, Dressage, Hunters |
| Norwegian Fjord | General Riding, Driving, Dressage |
| Andalusian / PRE | Dressage, Classical Riding |
| Lusitano | Dressage, Classical Riding, Versatile Sport |
| Akhal-Teke | Eventing, Showjumping, Endurance |
| Morgan | Dressage, Hunters, General Riding |
| Tennessee Walking Horse | Gaited Riding, Trail Riding |
| Gypsy Cob | General Riding, Driving, Hunters |
| Clydesdale | Draft Work, Driving |
| Shire | Draft Work, Driving |
| Percheron | Driving, General Riding |
| Belgian Draft | Draft Work, Driving |
| Standardbred | Harness Racing, Driving, General Riding |
| Mustang | Eventing, Hunters, General Riding |
| Miniature Horse | In-hand, Driving, Management |
| Pony of the Americas | Pony Hunters, Pony Jumping, Eventing |
| Australian Stock Horse | Eventing, Jumping, Stock Riding |
| Lipizzaner | Dressage, Classical Riding |
| Noriker | Driving, General Riding |
| Finnhorse | Dressage, Eventing, Jumping, Driving |

Specialty labels are not new playable disciplines.

If the game does not currently support driving, endurance or stock riding as competitions, keep those as descriptive breed strengths.

**Do not create entire new competition systems merely because a breed is traditionally associated with them.**

## 9.1 No unnecessary discipline restrictions

An appropriate horse may enter any existing supported discipline if eligible.

Do not prohibit a Thoroughbred from dressage, a PRE from jumping, or a Quarter Horse from eventing solely because it is an unusual breed choice.

Actual performance should reflect the horse's individual ability.

---

# PART X — BREED COLORS

## 10. USE THE EXISTING 8.7 COAT DATABASE

The user has already provided primary coat distributions for all 30 newly added breeds.

**REUSE THOSE DISTRIBUTIONS AS THE INITIAL SEED WEIGHTS.**

Do not overwrite those values merely because the new breed-performance data is being added.

The new breeds must connect to:

- Primary coat colors.
- Light/Medium/Dark.
- Secondary patterns.
- Minimal/Medium/Maximal.
- Breed-specific coat probabilities.
- Genetic inheritance.
- Grey progression.
- Existing horse sprites and shading.

If new breed profiles are missing their coat settings, use the supplied 8.7 coat tables.

Where colors are restricted by an established purebred registry, preserve the distinction between genetic possibility and registry acceptance.

## 10.1 Absolutely preserve markings

**DO NOT TOUCH FACE OR LEG MARKINGS.**

Do not modify:
- Marking names.
- Marking chances.
- Marking files.
- Marking inheritance.
- Marking rendering.
- Marking layering.
- Existing saved marking values.

This restriction from Update 8.7 remains absolute.

---

# PART XI — HORSE MODELS

## 11. MATCH THE NEW BREEDS TO EXISTING ANATOMICAL MODELS

Use existing supported horse models wherever possible.

Suggested assignments:

**Warmblood model**
- Zangersheide.
- Irish Sport Horse.
- Knabstrupper.
- Cleveland Bay where appropriate.

**Thoroughbred / Light Horse model**
- Akhal-Teke.
- Standardbred.
- Mustang where appropriate.

**Arabian / Refined Horse model**
- Akhal-Teke where anatomy better suits this model.

**Draft model**
- Clydesdale.
- Shire.
- Percheron.
- Belgian Draft.
- Noriker.
- Gypsy Cob where appropriate.

**Pony / Compact model**
- Connemara.
- Shetland.
- Icelandic.
- Haflinger.
- Norwegian Fjord.
