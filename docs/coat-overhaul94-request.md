# OXER TO OXER — COMPLETE HORSE COAT COLOR OVERHAUL 8.7

## Full Primary Coat Catalog • Light / Medium / Dark Shades • Secondary Patterns • Minimal / Medium / Maximal Expression • Breed-Specific Percentages • Realistic Genetics

**CODEX IMPLEMENTATION PROMPT — REBUILD THE COAT SYSTEM WHILE PRESERVING ALL LEG AND FACE MARKINGS**

# 0. MAIN OBJECTIVE

Completely overhaul horse coat generation.

The current system uses:

**PRIMARY COAT**
- Main coat color.
- Light.
- Medium.
- Dark.

**SECONDARY COAT**
- Additional coat patterns and modifiers.
- Minimal.
- Medium.
- Maximal.

Keep this general organization, but completely expand the available colors, genetics, combinations, and breed distributions.

Every existing breed must have its own coat-generation probabilities.

The goal is to make horses visually diverse while preserving realistic breed characteristics.

A Thoroughbred should commonly generate as bay or chestnut, a Friesian should generate black, a Fjord should have the recognized dun varieties, and an Appaloosa should frequently display leopard-complex patterning.

**Do not make all coat colors equally likely across all breeds.**

---

# 1. ABSOLUTELY DO NOT TOUCH FACE OR LEG MARKINGS

**THIS IS THE MOST IMPORTANT RESTRICTION IN THE UPDATE.**

Do not modify ANY existing:

- Face marking types.
- Leg marking types.
- Face marking names.
- Leg marking names.
- Face marking probabilities.
- Leg marking probabilities.
- Face marking inheritance.
- Leg marking inheritance.
- Face marking assets.
- Leg marking assets.
- Marking textures.
- Marking shapes.
- Marking masks.
- Marking opacity.
- Marking placement.
- Marking scaling.
- Marking randomization.
- Marking rendering order.
- Marking UI.
- Marking data structures.
- Marking save values.

Do not add new face or leg markings.

Do not remove existing ones.

Do not rewrite the marking generator.

Do not recalculate their probabilities.

Do not migrate their stored values.

Do not move, rename or replace their image files.

**The existing face and leg marking systems must remain EXACTLY as they currently are.**

## 1.1 Strict separation

Primary coats and secondary coat patterns must operate separately from dedicated face and leg markings.

If a secondary pattern such as Sabino, Tobiano, Splash or Frame would naturally extend onto the legs or face, implement its new visual expression through the BODY COAT system only.

Do not modify the dedicated face or leg marking systems to reproduce that appearance.

This is an intentional rendering constraint, even where it limits visual realism.

For example:

- Tobiano can create white body patches without changing the leg marking layer.
- Sabino can create body roaning without generating a new facial blaze.
- Splash can create allowed body coloration without automatically adding white stockings.
- Frame can create white body patches without altering facial markings.
- Dun can have an appropriate dorsal stripe without adding new leg barring through the leg-marking system.

Never paint a secondary coat overlay into existing face or leg marking assets.

**A horse's face and leg markings must remain pixel-identical before and after the update, provided the same horse, pose and assets are used.**

---

# PART I — COMPLETE PRIMARY COAT SYSTEM

# 2. PRIMARY COATS

Primary Coat describes the horse's main body color before secondary patterns are applied.

Every primary coat receives:

- Stable coat ID.
- Display name.
- Underlying genetic base.
- Relevant dilution genes.
- Shade classification.
- Color palette.
- Breed compatibility.
- Generation probability.
- Inheritance information.

The visible names may be more specific than the underlying genetic base.

For example:

**Primary:** Buckskin  
**Shade:** Dark  
**Secondary:** Tobiano  
**Expression:** Medium

Final display:

**Dark Buckskin Tobiano — Medium Expression**

Do not simply generate random visual combinations without checking their compatibility.

---

# 3. COMPLETE PRIMARY COAT COLOR CATALOG

Support the following color families and visually distinct variants.

## 3.1 Bay and brown

- Bay.
- Light Bay.
- Medium Bay.
- Dark Bay.
- Blood Bay.
- Mahogany Bay.
- Wild Bay.
- Seal Brown / Brown.
- Very Dark Brown.

Blood Bay, Mahogany Bay and Dark Bay may be subvariants under Bay instead of unrelated genetic bases.

Use consistent names.

Do not create duplicates such as "Dark Dark Bay."

## 3.2 Chestnut / sorrel

- Chestnut.
- Light Chestnut.
- Medium Chestnut.
- Dark Chestnut.
- Sorrel.
- Copper Chestnut.
- Golden Chestnut.
- Liver Chestnut.
- Flaxen Chestnut.

Sorrel can remain a recognized naming convention for reddish chestnut instead of a separate genetic base.

Flaxen primarily affects mane and tail color, rather than being a different base-pigment gene.

## 3.3 Black

- Black.
- Fading Black.
- Non-Fading Black.
- Jet Black.
- Sun-Faded Black.

Black remains genetically black regardless of coat fading.

Treat fading as a visual modifier when appropriate.

Do not invent a separate dominant gene for every informal black shade.

## 3.4 Cream dilutions

- Palomino.
- Light Palomino.
- Golden Palomino.
- Dark Palomino.
- Chocolate Palomino.
- Buckskin.
- Light Buckskin.
- Golden Buckskin.
- Dark Buckskin.
- Sooty Buckskin.
- Smoky Black.
- Cremello.
- Perlino.
- Smoky Cream.

Use correct single-cream versus double-cream inheritance.

## 3.5 Dun colors

- Bay Dun / Yellow Dun.
- Brown Dun.
- Red Dun.
- Chestnut Dun.
- Grullo / Grulla / Black Dun.
- Light Grullo.
- Dark Grullo.
- Dunskin.
- Dunalino.
- Smoky Grullo.
- White Dun.
- Grey Dun, where this is the breed-specific name for a black-based dun.

Do not confuse true dun dilution with buckskin.

Do not confuse Fjord Grey Dun with progressively greying horses.

## 3.6 Champagne colors

- Gold Champagne.
- Amber Champagne.
- Classic Champagne.
- Sable Champagne.
- Cream Champagne combinations where genetically possible.

## 3.7 Silver colors

- Silver Black.
- Silver Bay.
- Silver Brown.
- Silver Grullo.
- Silver Dun combinations.

Silver primarily affects black pigment.

A chestnut horse carrying Silver should not automatically display a silver-black phenotype.

## 3.8 Pearl colors

- Pearl Dilute Chestnut.
- Pearl Dilute Bay.
- Pearl Dilute Black, where genetically appropriate.
- Cream Pearl.
- Palomino Pearl.
- Buckskin Pearl.
- Other valid Cream/Pearl compound combinations.

Respect Cream and Pearl's interactions at their shared gene locus.

## 3.9 Mushroom dilution

- Mushroom Chestnut.
- Mushroom Bay.
- Other genetically supported Mushroom combinations.

## 3.10 Additional rare or combined colors

Support valid combinations where the existing graphics and genetic model permit them:

- Sooty Palomino.
- Sooty Bay.
- Sooty Chestnut.
- Pangaré / Mealy variants.
- Flaxen variants.
- Cream + Dun.
- Silver + Dun.
- Champagne + Cream.
- Silver + Champagne.
- Dun + Champagne.
- Pearl + Cream.
- Other supported multi-gene dilutions.

Rare combinations should remain rare.

**Do not multiply every dilution indiscriminately or create scientifically impossible allele combinations.**

## 3.11 True white and rare phenotypes

Handle:
- Dominant White.
- Camarillo White where supported.
- Other documented white-associated genetic variants.
- Rare brindle coat-texture expressions.

True White should not be treated as the same genetic phenomenon as a grey horse that has become visually white with age.

Dominant White belongs to the relevant spotting/genetic-modifier system internally, even if its final visible appearance is catalogued as white.

---

# 4. LIGHT / MEDIUM / DARK SHADES

Every eligible primary color family must support:

- Light.
- Medium.
- Dark.

**These represent relative variation within the selected coat family.**

Examples:

Bay:
- Light = warm golden brown.
- Medium = typical reddish-brown bay.
- Dark = deep brown with black points.

Chestnut:
- Light = pale golden red.
- Medium = copper/rust.
- Dark = mahogany/liver tones.

Black:
- Light = somewhat faded black.
- Medium = natural black.
- Dark = jet black.

Palomino:
- Light = pale cream-gold.
- Medium = golden.
- Dark = rich golden/chocolate tone where appropriate.

Buckskin:
- Light = pale sandy tan.
- Medium = golden tan.
- Dark = deep tan/brown.

## 4.1 Exceptions

Light/Medium/Dark must not make the result biologically nonsensical.

Examples:
- Cremello remains recognizably cremello.
- Perlino remains recognizably perlino.
- Smoky Cream remains recognizably smoky cream.
- Double dilutes should not become dark brown because the player selects Dark.

For restricted-color families, shades may vary subtly.

Keep all three user-facing shade categories while using appropriate underlying palettes.

## 4.2 Shade distribution

For common color families, suggested default generation weights:

| Shade | Chance |
|---|---:|
| Light | 25% |
| Medium | 50% |
| Dark | 25% |

These are default **game-generation weights**, not measured universal horse-population frequencies.

Breed and coat-specific overrides are required where appropriate.

Examples:
- Thoroughbred Bay may favor Medium/Dark.
- Haflinger Chestnut may favor Light/Medium.
- Friesian Black should favor Medium/Dark.
- Fjord Brown Dun may favor lighter shades.

Every resolved breed-color shade distribution must total exactly 100%.

---

# PART II — SECONDARY COAT COLORS & PATTERNS

# 5. SECONDARY COAT SYSTEM

Secondary Coats represent additional inherited patterns, spotting, roaning and visually expressed coat modifiers.

Every secondary pattern must support:

- Pattern ID.
- Display name.
- Genetic compatibility.
- Breed probability.
- Minimal expression.
- Medium expression.
- Maximal expression.
- Body-overlay rendering rules.
- Inheritance data.

Not every horse must have a secondary coat.

**"None" must be a valid and commonly generated outcome where appropriate.**

Do not force every horse to display a pattern.

---

# 6. COMPLETE SECONDARY PATTERN CATALOG

## 6.1 Tobiano

- Tobiano.
- Minimal Tobiano.
- Medium Tobiano.
- Maximal Tobiano.

Minimal: small patches of white on the body.

Medium: moderate clearly defined patches.

Maximal: extensive white body coverage.

Preserve the face and leg markings independently.

## 6.2 Frame Overo

- Frame Overo.
- Minimal Frame.
- Medium Frame.
- Maximal Frame.

Use irregular framed white patches, with coverage appropriate to the expression.

Preserve the existing face and leg marking layers.

## 6.3 Splashed White

- Splashed White.
- Minimal Splash.
- Medium Splash.
- Maximal Splash.

Render allowed body-area patterning only.

Do not automatically create new white legs, a blaze, or blue eyes through the face/leg marking systems.

## 6.4 Sabino

- Sabino.
- Minimal Sabino.
- Medium Sabino.
- Maximal Sabino.
- Sabino White where genetically valid.

Allow appropriate body roaning and irregular body white.

Do not confuse Sabino 1 with every possible form of sabino-like appearance.

## 6.5 Roan

- Classic Roan.
- Bay Roan.
- Red / Strawberry Roan.
- Blue Roan.
- Brown Roan.
- Roan on a compatible dilute base.

Expressions:
- Minimal Roan.
- Medium Roan.
- Maximal Roan.

Actual displayed roan terminology should depend on underlying base.

Do not generate a "Blue Roan" name over a chestnut base.

## 6.6 Grey / Gray

- Progressive Grey.
- Steel Grey.
- Dapple Grey.
- Light Grey.
- Fleabitten Grey.

Grey must preserve the underlying genetically determined base coat.

Grey is a progressive depigmentation modifier, not a basic base color.

Where appropriate, grey horses become lighter with age.

Minimal/Medium/Maximal should describe the amount of visually expressed greying at that life stage, rather than three permanently unrelated genes.

Do not force every grey horse to become fleabitten.

Do not change existing face or leg markings when grey progression occurs.

## 6.7 Leopard complex / Appaloosa

Support:

- Blanket.
- Spotted Blanket.
- Snowcap.
- Leopard.
- Near Leopard.
- Fewspot Leopard.
- Near Fewspot.
- Snowflake.
- Frost.
- Varnish Roan.
- Mottled / Minimal Leopard Expression.
- Other established leopard-complex expressions where supported.

Use LP and relevant modifiers such as PATN1 rather than treating every visual pattern as an unrelated genetic mutation.

Different patterns may have different probabilities.

For example:
- Appaloosas should frequently display LP-related expression.
- Knabstruppers should frequently display leopard-complex expression.
- Most ordinary Thoroughbreds should not spontaneously generate leopard patterns.

## 6.8 Tovero and combined patterns

Support genuine combination patterns such as:

- Tobiano + Frame.
- Tobiano + Splash.
- Tobiano + Sabino.
- Tovero.
- Sabino + Roan.
- Leopard complex + compatible additional modifiers.
- Other genuinely compatible combinations.

Do not simply roll every pattern independently without checking resulting genetic and visual compatibility.

## 6.9 Other coat-wide modifiers

Include where scientifically supported:

- Rabicano.
- Sooty.
- Pangaré / Mealy.
- Flaxen mane/tail modifier.
- Dappling.
- Brindle texture.
- Varnish progression.
- Other established coat-specific modifiers.

Some of these are non-white-marking coat modifiers rather than white-spotting genes.

Keep their internal classification accurate.

Do not automatically classify every modifier as a pinto pattern.

---

# 7. SECONDARY EXPRESSION LEVELS

Use the existing three categories.

| Expression | General meaning |
|---|---|
| Minimal | Subtle or limited visible expression |
| Medium | Moderate expression |
| Maximal | Extensive or strongly visible expression |

Suggested default:

- Minimal: 40%.
- Medium: 45%.
- Maximal: 15%.

These are only starter balancing values.

Each pattern and breed needs its own resolved probabilities.

For example:

**Tobiano**
- Minimal 20%.
- Medium 55%.
- Maximal 25%.

**Roan**
- Minimal 35%.
- Medium 45%.
- Maximal 20%.

**Sabino**
- Minimal 50%.
- Medium 35%.
- Maximal 15%.

**Leopard complex**
- Use subtype-specific distribution, not one universal white-coverage rule.

**Grey**
- Expression must reflect genetic status, age and progression, not an unrelated permanent random coverage setting.

These are illustrative design weights, not published population frequencies.

---

# PART III — BREED-SPECIFIC COLOR PERCENTAGES

# 8. EVERY EXISTING BREED NEEDS ITS OWN COLOR PROFILE

Inspect the game's complete existing breed registry.

**DO NOT OMIT ANY BREED.**

Create a dedicated coat-generation profile for every breed ID.

Each breed profile must contain:

1. Primary coat probability for EVERY supported primary coat variant.
2. Probability of each eligible secondary pattern.
3. Probability of None.
4. Pattern-subtype probabilities where applicable.
5. Minimal/Medium/Maximal weights.
6. Light/Medium/Dark weights.
7. Genetic restrictions.
8. Breed-specific naming rules.
9. Relevant registry restrictions.
10. Source or confidence notes for probability estimates.

A probability can be 0%.

Do not create only a generic Warmblood profile and leave every breed using it without explicit resolution.

Shared templates may be used as starting points, but every registered breed must resolve to a complete, inspectable probability distribution.

---

# 9. BREED COLOR RESTRICTIONS

Respect documented purebred restrictions.

Examples:

### Friesian

- Black is the breed-standard color.
- Generated purebred Friesians should be black.
- Allow appropriate variations in black shade.
- Do not randomly generate cremello, palomino, tobiano or leopard purebred Friesians.

### Haflinger

- Chestnut is the breed-standard color.
- Flaxen mane and tail are characteristic.
- Permit light, medium and dark chestnut shades.
- Do not generate ordinary purebred Haflingers as black, bay or tobiano.

### Cleveland Bay

- Bay is the breed-standard color.
- Allow light, medium and dark bay.
- Do not generate random leopard or pinto patterns for standard purebred founders.

### Norwegian Fjord

- Brown Dun.
- Red Dun.
- Grey Dun.
- White Dun.
- Yellow Dun.

Respect the breed's distinctive dun coloring.

### Welsh A, B, C and D

Use separate breed profiles.

Recognized purebred Welsh Sections A–D do not permit piebald or skewbald.

Do not automatically apply that exclusion to part-bred Welsh horses.

### Paint Horse

Paints can have many underlying base colors.

Tobiano and overo-related patterns should be frequent, but solid-colored registered Paints must remain possible.

### Appaloosa

Leopard-complex patterning should be common.

Solid or minimally expressed individuals may still exist.

### Knabstrupper

Leopard-complex patterns should be characteristic, with varied coverage and spotting.

### Thoroughbred

Bay and chestnut should be common.

Black should be less common.

Grey is an important secondary modifier.

Extreme dilutions and leopard-complex patterns should not appear at ordinary frequencies.

### Arabian

Grey, bay and chestnut should be prominent visible outcomes.

Black should be less common.

Avoid generating ordinary purebred Arabians with arbitrary tobiano, leopard or cream-dilute coats.

---

# 10. INITIAL PRIMARY COLOR WEIGHTS BY BREED

The following are **proposed game-generation starting distributions**, not claims of exact real-world percentages.

They apply to the non-grey underlying primary coat phenotype. Grey is rolled separately as a genetic modifier.

Every row totals 100%.

All colors not explicitly listed in a row initially have 0% in that starter profile, subject to scientifically valid rare-color evidence and the complete breed audit.

| Breed | Primary coat distribution |
|---|---|
| Thoroughbred | Bay 55%, Chestnut 35%, Black 10% |
| Arabian | Bay 45%, Chestnut 45%, Black 10% |
| Dutch Warmblood | Bay 50%, Chestnut 25%, Black 20%, Buckskin 3%, Palomino 2% |
| Belgian Warmblood | Bay 50%, Chestnut 30%, Black 20% |
| Hanoverian | Bay 55%, Chestnut 25%, Black 20% |
| Holsteiner | Bay 60%, Chestnut 20%, Black 20% |
| Oldenburg | Bay 45%, Chestnut 30%, Black 20%, Buckskin 3%, Palomino 2% |
| Trakehner | Bay 45%, Chestnut 25%, Black 30% |
| Selle Français | Bay 55%, Chestnut 35%, Black 10% |
| Zangersheide | Bay 50%, Chestnut 30%, Black 15%, Buckskin 3%, Palomino 2% |
| Swedish Warmblood | Bay 50%, Chestnut 30%, Black 20% |
| Canadian Warmblood | Bay 50%, Chestnut 30%, Black 20% |
| Irish Sport Horse | Bay 45%, Chestnut 35%, Black 20% |
| Quarter Horse | Bay 35%, Chestnut 30%, Black 10%, Buckskin 9%, Palomino 8%, Red Dun 4%, Grullo 2%, Smoky Black 2% |
| American Paint Horse | Bay 37%, Chestnut 33%, Black 10%, Buckskin 8%, Palomino 7%, Red Dun 3%, Grullo 2% |
| Appaloosa | Bay 36%, Chestnut 32%, Black 12%, Buckskin 8%, Palomino 7%, Grullo 3%, Red Dun 2% |
| Knabstrupper | Bay 35%, Chestnut 35%, Black 30% |
| Connemara Pony | Bay 40%, Chestnut 12%, Black 12%, Buckskin 20%, Palomino 10%, Smoky Black 6% |
| Welsh Mountain Pony A | Bay 35%, Chestnut 40%, Black 10%, Palomino 8%, Buckskin 5%, Dun 2% |
| Welsh Pony B | Bay 40%, Chestnut 35%, Black 12%, Palomino 6%, Buckskin 5%, Dun 2% |
| Welsh Pony of Cob Type C | Bay 40%, Chestnut 38%, Black 15%, Palomino 4%, Buckskin 3% |
| Welsh Cob D | Bay 42%, Chestnut 40%, Black 13%, Palomino 3%, Buckskin 2% |
| Shetland Pony | Bay 28%, Chestnut 35%, Black 25%, Palomino 6%, Silver Black 4%, Buckskin 2% |
| Icelandic Horse | Bay 25%, Chestnut 30%, Black 22%, Silver Black 10%, Silver Bay 5%, Buckskin 3%, Palomino 3%, Dun 2% |
| Friesian | Black 100% |
| Haflinger | Chestnut 100% |
| Cleveland Bay | Bay 100% |
| Norwegian Fjord | Brown Dun 90%, Red Dun 5%, White Dun 2%, Grey Dun 2%, Yellow Dun 1% |
| Andalusian / PRE | Bay 55%, Chestnut 35%, Black 10% |
| Lusitano | Bay 55%, Chestnut 30%, Black 15% |
| Akhal-Teke | Bay 40%, Chestnut 30%, Black 15%, Buckskin 8%, Palomino 5%, Cremello 2% |
| Morgan | Bay 33%, Chestnut 40%, Black 20%, Palomino 4%, Buckskin 3% |
| Tennessee Walking Horse | Bay 32%, Chestnut 30%, Black 18%, Palomino 8%, Buckskin 7%, Silver Black 3%, Gold Champagne 2% |
| Gypsy Cob | Bay 37%, Chestnut 33%, Black 20%, Buckskin 5%, Palomino 5% |
| Clydesdale | Bay 60%, Chestnut 17%, Black 15%, Brown 8% |
| Shire | Black 55%, Bay 30%, Chestnut 10%, Brown 5% |
| Percheron | Black 75%, Bay 20%, Chestnut 5% |
| Belgian Draft | Chestnut 75%, Bay 15%, Black 10% |
| Standardbred | Bay 45%, Chestnut 25%, Black 25%, Brown 5% |
| Mustang | Bay 30%, Chestnut 30%, Black 15%, Buckskin 8%, Palomino 7%, Bay Dun 5%, Red Dun 3%, Grullo 2% |
| Miniature Horse | Bay 22%, Chestnut 25%, Black 15%, Buckskin 10%, Palomino 10%, Silver Black 6%, Cremello 4%, Perlino 3%, Smoky Cream 2%, Dun 3% |
| Pony of the Americas | Bay 35%, Chestnut 35%, Black 15%, Buckskin 10%, Palomino 5% |
| Australian Stock Horse | Bay 40%, Chestnut 30%, Black 15%, Buckskin 8%, Palomino 4%, Dun 3% |
| Lipizzaner | Bay 60%, Chestnut 20%, Black 20% |
| Noriker | Bay 30%, Chestnut 30%, Black 25%, Silver Black 10%, Buckskin 5% |
| Finnhorse | Bay 30%, Chestnut 45%, Black 18%, Silver Black 4%, Palomino 3% |

**IMPORTANT IMPLEMENTATION NOTES**

1. These are seed weights only.
2. Revise them when authoritative breed-specific data provides a better distribution.
3. Do not copy a seed number into the game while labeling it scientifically verified.
4. For unsupported rare combinations, apply 0% rather than inventing genetic plausibility.
5. Do not silently omit breeds absent from this example table.
6. Do not assign a primary coat that contradicts the horse's actual stored genotype.
7. Do not use these founder-generation percentages to override Mendelian inheritance for offspring.

---

# 11. SECONDARY PATTERN PROBABILITIES BY BREED

Every breed must have separate weights for:

- Grey.
- Classic Roan.
- Tobiano.
- Frame Overo.
- Splashed White.
- Sabino.
- Leopard Complex.
- Rabicano.
- Dominant White.
- Other applicable modifiers.
- None.

The probability of a specific pattern must reflect its known presence within that breed.

Examples:

| Breed | Secondary pattern priorities |
|---|---|
| Friesian | Ordinarily no major secondary white-body patterns |
| Haflinger | Minimal or no major body-white patterns |
| Cleveland Bay | Ordinarily no major secondary white-body patterns |
| Thoroughbred | Grey occurs; large pinto/leopard patterns extremely unusual or absent in standard generation |
| Arabian | Grey relatively common; ordinary pinto/leopard patterns absent from purebred generation |
| Dutch Warmblood | Grey and occasional documented white spotting |
| Belgian Warmblood | Grey and occasional documented white spotting |
| Paint Horse | Tobiano, Overo-related, Splash and combined patterns common |
| Appaloosa | LP-associated patterns very common |
| Knabstrupper | LP-associated patterns characteristic |
| Gypsy Cob | Pinto-related body patterns common |
| Clydesdale | Sabino-like expression may be common |
| Shire | Roan/grey where documented; other patterns appropriately restricted |
| Icelandic | Broad coat variation including supported pinto patterns |
| Welsh A–D | No piebald/skewbald for standard purebred generation |
| Norwegian Fjord | Dun variations, not random leopard or pinto coats |
| Miniature Horse | Broad color and pattern variation |
| Pony of the Americas | Leopard-complex expression characteristic |

For breeds without robust numeric population evidence, define explicit documented or estimated per-pattern game weights with confidence annotations.

**Do not pretend these broad qualitative priorities are complete numerical data. Resolve every actual breed to numeric weights in code.**

## 11.1 Probability structure

Use two separate steps:

**A. Does this horse carry/express a secondary genetic modifier?**

Example:
- Grey probability.
- Roan probability.
- Tobiano probability.
- LP probability.

**B. How strongly does the modifier appear?**

Example:
- Minimal.
- Medium.
- Maximal.

Avoid incorrectly forcing independently inherited modifiers to sum to 100%.

For exclusive choices within one pattern family, the conditional subtype probabilities must total 100%.

## 11.2 Actual numeric data requirement

Before marking implementation complete, output a complete breed probability audit containing:

| Field | Required |
|---|---|
| Breed ID | Yes |
| Primary color ID | Yes |
| Primary probability | Yes |
| Light probability | Yes |
| Medium probability | Yes |
| Dark probability | Yes |
| Secondary pattern ID | Yes |
| Pattern probability | Yes |
| Minimal probability | Yes |
| Medium expression probability | Yes |
| Maximal probability | Yes |
| Genetic eligibility | Yes |
| Source/confidence | Yes |

This audit must include **every single existing breed** and **every supported color/pattern**, including explicit zeros.

Do not stop at the sample breeds above.

---

# PART IV — GENETICS AND BREEDING

# 12. INHERITANCE MUST MAKE SENSE

The game's genetics must distinguish the visible phenotype from the inherited genes.

Include accurate supported inheritance rules for:

- Extension / Red Factor.
- Agouti.
- Cream.
- Dun.
- Silver.
- Champagne.
- Pearl.
- Mushroom.
- Grey.
- Roan.
- Tobiano.
- Frame Overo.
- Sabino 1.
- Splashed White.
- Leopard Complex.
- PATN1.
- Supported Dominant White variants.

Do not invent an exact known gene for every shade or informal color name.

Some appearance variation is genetically complex or incompletely understood.

## 12.1 Example

Mother:
- Bay.
- Carries recessive chestnut.

Father:
- Bay.
- Carries recessive chestnut.

Their foal may inherit a chestnut base when the correct alleles combine.

The foal should not be forced to remain Bay simply because Bay has the highest probability in its breed profile.

**Breed percentages determine random founder-population generation, not the genetic outcome of two already-generated parents.**

## 12.2 White pattern genetics

Use appropriate inheritance for documented white patterns.

Do not treat LP and PATN1 as identical genes.

Do not treat every visual "overo" pattern as one genetic mutation.

Frame Overo homozygosity must not be generated as an ordinary healthy phenotype.

The simulation should respect the existing breeding and foal-viability architecture rather than producing impossible surviving genotypes.

## 12.3 Purebred restrictions versus genetics

A breed registry's accepted colors and the colors that can arise genetically are not always identical.

Separate:
- Breed-standard accepted colors.
- Biologically possible inherited outcomes.
- New randomly generated purebred founder colors.
- Crossbred colors.

Do not silently rewrite an offspring's inherited color to make it match a registry standard.

Instead, use the existing registration rules where relevant.

## 12.4 Crossbreeding

Crossbred foals should inherit real gene combinations from their parents.

Example:

A Tobiano Paint Horse crossed with a solid-colored Warmblood could produce a pinto-patterned sport horse if the relevant genes are inherited.

Do not disable that outcome merely because ordinary purebred Warmblood founders have a low Tobiano generation probability.

---

# PART V — GREY PROGRESSION

# 13. GREY MUST CHANGE WITH AGE

A genetically grey horse may begin with:
- Dark Bay.
- Chestnut.
- Black.
- Another valid inherited base.

As it ages, its visible coat should gradually lighten.

Possible stages:
- Initial base color.
- Early grey.
- Steel grey.
- Dapple grey.
- Light grey.
- Nearly white.
- Optional fleabitten expression.

Actual progression should be based on:
- Grey genotype.
- Horse age.
- Individual variation.
- Existing progression data where available.

**Do not make all grey horses follow exactly the same age-based visual sequence.**

## 13.1 Preserve underlying color

The horse retains its underlying genotype even when its visible coat becomes nearly white.

Its offspring should inherit from its actual genes, not from the apparent white appearance.

## 13.2 Marking protection

During greying:
- Do not mutate face marking data.
- Do not mutate leg marking data.
- Do not alter face marking assets.
- Do not alter leg marking assets.

Grey appearance changes should be applied through the permitted body-coat renderer only.

---

# PART VI — VISUAL COAT GENERATION

# 14. KEEP COAT ART COMPATIBLE WITH EXISTING HORSE MODELS

Use the game's existing horse model assets and rendering pipeline.

Do not redesign the horse anatomy.

Do not:
- Replace horse models.
- Modify horse proportions.
- Change pose alignments.
- Change existing marking artwork.
- Move the horse on the canvas.
- Modify the background.
- Replace the existing pixel-art style.

Coat colors must preserve underlying shading.

The color system should work with all supported horse models, including:
- Warmblood.
- Thoroughbred.
- Arabian.
- Draft.
- Pony models where available.

## 14.1 Primary color rendering

Primary palettes should preserve:
- Muscle shading.
- Body contours.
- Highlights.
- Shadows.
- Mane and tail coloration where applicable.
- Natural color transitions.
- Dark-point coloration where applicable.

Do not simply place a fully opaque flat-colored rectangle over the horse.

## 14.2 Secondary overlays

Secondary overlays must:
- Respect horse anatomy.
- Match the existing model coordinates.
- Maintain pixel-art consistency.
- Preserve primary color shading.
- Avoid unnatural noise.
- Render with genuine Minimal/Medium/Maximal differences.

Examples:

Minimal Tobiano should not look the same as Maximal Tobiano.

Minimal Roan should not look the same as Maximal Roan.

A Snowcap should not use the same distribution as an ordinary Leopard.

## 14.3 Anatomy and model variation

For each horse body model:

- Align overlays with the actual silhouette.
- Prevent patterns leaking outside the horse.
- Preserve horse model shading.
- Respect neck, barrel, shoulder and hindquarter areas.
- Do not change leg or face markings.
- Use consistent coat coverage for all poses.

If a pattern asset is missing, provide a clearly compatible body-only fallback rather than silently changing the horse's stored color or substituting an unrelated existing marking.

---

# PART VII — COAT NAMING AND UI

# 15. DISPLAY COAT COLORS CLEARLY

Examples:

**Horse A**
- Primary: Bay
- Shade: Dark
- Secondary: Tobiano
- Expression: Medium

Display: Dark Bay Tobiano.

**Horse B**
- Primary: Black
- Shade: Medium
- Secondary: Roan
- Expression: Maximal

Display: Blue Roan.

**Horse C**
- Primary: Buckskin
- Shade: Light
- Secondary: Leopard Complex
- Expression: Medium
- Subtype: Spotted Blanket

Display: Light Buckskin Spotted Blanket Appaloosa.

**Horse D**
- Primary: Chestnut
- Shade: Dark
- Secondary: Grey
- Current visible stage: Dapple Grey

Display: Dapple Grey (Chestnut Base).

Do not generate awkward or contradictory names.

## 15.1 Horse profiles

Show:
- Visible coat name.
- Underlying primary color.
- Shade.
- Secondary pattern(s).
- Expression.
- Genetic information where the existing genetics UI supports it.

Do not require players to understand every genotype merely to identify a horse's coat.

## 15.2 Coat selector

Preserve the existing coat-selection interface style.

Organize:

**Primary Color**
- Select color family.
- Select subtype where applicable.
- Select Light / Medium / Dark.

**Secondary Pattern**
- None.
- Select pattern family.
- Select subtype where applicable.
- Select Minimal / Medium / Maximal.

Where multiple compatible patterns are supported, allow the game to store those combinations without breaking the current UI.

Do not introduce a completely unrelated coat editor.

---

# PART VIII — GENERATION ALGORITHM

# 16. GENERATING A RANDOM HORSE

Use this process for newly generated founder or market horses.

1. Identify breed.
2. Load its dedicated breed profile.
3. Determine permitted base-color genetic distribution.
4. Generate valid primary coat genotype.
5. Resolve primary phenotype.
6. Generate applicable shade.
7. Generate eligible inherited secondary modifiers.
8. Resolve compatible pattern combinations.
9. Resolve subtype and expression.
10. Generate resulting visible coat name.
11. Render primary coat.
12. Render secondary body overlays.
13. Apply the existing untouched marking-rendering system.
14. Save the resulting horse coat and genotype.

Do not automatically assign secondary patterns to all horses.

Do not allow rare patterns to occur as frequently as ordinary bay or chestnut horses unless the breed's actual documented genetics justify their high prevalence.

## 16.1 Percentages

Use explicit weighted distributions.

Example:

**Hypothetical Breed**
- Bay 50%.
- Chestnut 30%.
- Black 15%.
- Buckskin 3%.
- Palomino 2%.

Total = 100%.

Then separately:

**Secondary gene probabilities**
- Grey 10%.
- Roan 3%.
- Tobiano 1%.
- LP 0%.
- Other supported modifiers according to their independent or conditional rules.

These are separate genetic events, so their probabilities must not be combined incorrectly into the 100% primary-color total.

---

# PART IX — EXISTING HORSES & SAVE FILES

# 17. DO NOT RANDOMIZE EXISTING HORSES AGAIN

Existing horses must retain:
- Current coat appearance wherever possible.
- Existing primary coat.
- Existing shade.
- Existing secondary pattern.
- Existing pattern expression.
- Existing face markings.
- Existing leg markings.
- Existing genes.
- Existing breeding history.
- Existing identity.
- Existing competition history.
- Existing ownership.

Do not regenerate the coat of every horse when a save loads.

## 17.1 Migration

Map existing coat records to the expanded coat catalog.

Where a stored color maps unambiguously, use the new canonical ID.

Where genetic information is incomplete, preserve the existing phenotype and avoid fabricating precise historical genotypes.

New genetic fields may be marked unknown where appropriate.

If a migration would alter a horse's visible coat unexpectedly, preserve its original appearance until a safe conversion is possible.

## 17.2 Existing face and leg markings

**DO NOT MIGRATE, RESET, REGENERATE, REROLL, RECOLOR, OR REPLACE THEM.**

These fields are explicitly outside the scope of this update.

---

# PART X — TESTING

# 18. PRIMARY COLORS

Test:

1. Every registered primary coat ID exists.
2. Every supported color renders.
3. Light/Medium/Dark shade works.
4. Diluted colors remain plausible.
5. Mane/tail colors correspond to actual coat genetics.
6. No duplicate or contradictory names.
7. Rare colors generate only when permitted.
8. Every breed has a complete primary distribution.
9. Every primary distribution totals exactly 100%.
10. Every breed-color shade distribution totals 100%.

# 19. SECONDARY PATTERNS

Test:

11. Tobiano Minimal/Medium/Maximal.
12. Frame Minimal/Medium/Maximal.
13. Splash Minimal/Medium/Maximal.
14. Sabino Minimal/Medium/Maximal.
15. Roan Minimal/Medium/Maximal.
16. Grey progression.
17. Leopard variants.
18. Blanket and spotted blanket.
19. Snowcap.
20. Fewspot.
21. Snowflake.
22. Frost.
23. Varnish Roan.
24. Rabicano.
25. Dominant White.
26. Compatible pattern combinations.
27. No impossible genetics.
28. No pattern bleeding beyond the model.
29. Secondary overlays preserve shading.
30. None remains a valid generated outcome.

# 20. BREED REALISM

Test:

31. Friesians generate black.
32. Haflingers generate chestnut.
33. Cleveland Bays generate bay.
34. Fjords generate accepted dun types.
35. Welsh A/B/C/D retain separate profiles.
36. Welsh purebred pinto restrictions are respected.
37. Thoroughbreds primarily generate expected common colors.
38. Arabians have a plausible grey prevalence.
39. Appaloosas frequently display LP-related characteristics.
40. Knabstruppers frequently display leopard-complex characteristics.
41. Paint Horses commonly display appropriate patterns.
42. Solid Paint Horses remain possible.
43. Miniature Horses display greater valid color variation.
44. Every other registered breed resolves to its own valid profile.

# 21. PERCENTAGE TESTING

For each breed:

Generate 10,000 new independent founder horses using a fixed test seed.

Compare actual results against the configured breed probabilities.

Report:
- Primary color distribution.
- Shade distribution.
- Secondary pattern distribution.
- Expression distribution.
- Invalid combinations.
- Unknown coat IDs.
- Missing profiles.

Use statistically appropriate tolerance rather than demanding an exact match in a random sample.

Do not alter the player population during testing.

# 22. GENETICS

Test:

45. Chestnut inheritance.
46. Bay and Black inheritance.
47. Single Cream.
48. Double Cream.
49. Cream/Pearl interaction.
50. Dun inheritance.
51. Champagne inheritance.
52. Silver inheritance.
53. Grey inheritance.
54. Roan inheritance.
55. Tobiano inheritance.
56. Frame Overo compatibility and viability.
57. Leopard Complex.
58. PATN1 interaction.
59. Crossbred coat outcomes.
60. Parent genetics override founder breed-generation weights.

# 23. FACE AND LEG MARKING REGRESSION

**MANDATORY TESTS**

61. Existing face marking names unchanged.
62. Existing leg marking names unchanged.
63. Existing marking assets unchanged.
64. Existing marking probabilities unchanged.
65. Existing marking inheritance unchanged.
66. Existing marking generator unchanged.
67. Existing marking masks unchanged.
68. Existing marking placement unchanged.
69. Existing saved marking values unchanged.
70. Existing marking appearance unchanged.
71. No new primitive leg bars added.
72. No new face patterns added.
73. Secondary coat overlays do not rewrite face or leg markings.
74. Existing horse screenshot comparisons pass.
75. Existing marked horses remain visually identical in their dedicated marking layers.

Where possible, compare asset checksums, serialized marking fields and marking-layer pixel output before versus after the update.

# 24. GENERAL REGRESSION

76. Existing horses load.
77. New horses generate.
78. Breeding works.
79. Foals retain inherited color data.
80. Sales and auctions display the correct coat.
81. Horse profiles display the correct coat.
82. The coat selector works.
83. Different horse models work.
84. Horse assets remain aligned.
85. No save corruption.
86. No unnecessary performance regression.
87. Month skipping remains fast.
88. No changes to horse skills or temperament.
89. No changes to competitions.
90. No changes to stable management.

---

# FINAL IMPLEMENTATION REPORT

Report:

1. The complete supported primary coat catalog.
2. The complete supported secondary pattern catalog.
3. Number of shades and expression variants.
4. Every breed added or updated.
5. Per-breed primary-color probabilities.
6. Per-breed secondary-pattern probabilities.
7. Per-breed shade probabilities.
8. Per-breed pattern-expression probabilities.
9. Documented restrictions versus estimated game weights.
10. All supported genetic combinations.
11. How Grey progression works.
12. How crossbred foal colors are inherited.
13. How existing horses were preserved.
14. How coat graphics were updated.
15. Validation of every breed probability table.
16. Statistical generation test results.
17. Evidence that face markings were not changed.
18. Evidence that leg markings were not changed.
19. Save compatibility results.
20. Remaining unsupported variants, if any.

# FINAL NON-NEGOTIABLE REQUIREMENTS

**COMPLETELY OVERHAUL PRIMARY COATS.**

**COMPLETELY OVERHAUL SECONDARY COATS.**

**SUPPORT THE FULL DEFINED COLOR AND PATTERN CATALOG, INCLUDING VALID RARE COMBINATIONS.**

**EVERY PRIMARY COAT MUST SUPPORT LIGHT / MEDIUM / DARK WHERE VISUALLY APPROPRIATE.**

**EVERY SECONDARY PATTERN MUST SUPPORT MINIMAL / MEDIUM / MAXIMAL EXPRESSION WHERE APPROPRIATE.**

**EVERY EXISTING BREED MUST HAVE ITS OWN COMPLETE NUMERICAL COAT-GENERATION PROFILE.**

**ALL PROBABILITIES MUST BE EXPLICIT, VALIDATED, AND BASED ON BREED EVIDENCE WHEN AVAILABLE.**

**DO NOT GENERATE ALL COLORS AT EQUAL FREQUENCY.**

**DO NOT INVENT GENETICALLY IMPOSSIBLE COMBINATIONS.**

**FOALS MUST INHERIT GENES FROM THEIR PARENTS, NOT BE REROLLED FROM BREED PERCENTAGES.**

**PRESERVE ALL EXISTING HORSES AND SAVES.**

**PRESERVE ALL EXISTING HORSE MODELS AND PIXEL ART.**

**DO NOT TOUCH FACE MARKINGS.**

**DO NOT TOUCH LEG MARKINGS.**

**DO NOT CHANGE THEIR CODE, GENETICS, CHANCES, ASSETS, RENDERING, OR SAVED VALUES.**

**NO OTHER GAMEPLAY SYSTEMS SHOULD BE MODIFIED.**