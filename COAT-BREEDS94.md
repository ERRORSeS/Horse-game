# Body coats and 30 additional breeds

The 8.7 body coat overhaul and 8.8 breed expansion are implemented as text and recorded genetics. The user explicitly waived graphics: this repository contains no horse model or marking image assets. Existing breeds, brands, breed potential rules and dedicated face/leg marking code are preserved. The complete original requests are retained in docs/.

## Catalogue and probabilities

- **192 primary coat descriptors**, each with Light / Medium / Dark body palettes and explicit genotype recipes. These include visual bay/chestnut/black variants, Cream, Pearl, Cream–Pearl, Dun, Silver, Champagne, Mushroom, supported compound dilutions, and KIT-associated white. Informal shades remain appearance variants rather than invented genes.
- **43 secondary entries**, including independent modifier families, 11 LP subtypes, roan names, grey stages and combined-pattern descriptors. Minimal / Medium / Maximal expression is recorded where applicable. Grey and varnish progression additionally depend on age. W20 is limited spotting rather than automatically pure white; homozygous SB1 is Sabino White.
- **61 complete breed/registry profiles**, covering the existing roster and all 30 additions, with explicit zeros for unavailable coats. The 46 supplied seed rows are stored verbatim in data/coat94-supplied-breed-seeds.json; aliases map the existing Welsh and Selle Francais names. Existing breeds omitted from the supplied table have separate explicit estimates rather than silently using an equal-frequency fallback. Crossbred founder profiles combine known ancestry. Actual foals inherit parental alleles instead.
- The human-readable complete catalogue and breed list are in [docs/coat94-catalogue.md](docs/coat94-catalogue.md). Every numeric primary, secondary, shade and expression probability, conditional LP table, source note and palette appears in [validation94/complete-breed-probabilities.json](validation94/complete-breed-probabilities.json). Root column names explain compact numeric vectors; zeros are included.

Every numeric population weight is a **fictional game estimate**, including the supplied starter rows. Registry restrictions and documented gene mechanisms are distinguished from estimates in each profile and the source links. Examples include black Friesian founders, chestnut/flaxen Haflingers, bay Cleveland Bays, the five Fjord dun forms, and no ordinary LP/pinto founders in restricted Welsh/Thoroughbred/Arabian profiles. Existing unusual saved horses are preserved rather than forcibly recolored. Clydesdale sabino-like appearance does not falsely assert a tested SB1 allele.

## Genetics, inheritance and progression

The authoritative body genotype records Extension, Agouti, a shared Cream/Pearl locus, Dun, Silver, Champagne, Mushroom, Grey, Tobiano, Frame, SW1, LP, PATN1 and one two-allele KIT model (RN/SB1/W4/W5/W10/W13/W20/W22). All 192 catalogue recipes are validated. Compatible dilutions and spotting can coexist; three independent KIT alleles cannot be assigned to one horse. Silver is visually silent on chestnut. Pearl and Mushroom can be carried without expression. Frame OO and the modeled nonviable dominant-white homozygotes fail viability checks during real foaling. W20 homozygotes remain viable. This is a simplified allelic model, not a complete chromosome/haplotype simulator.

Foals receive one recorded allele per locus from each parent, including crossbreds. Breed founder weights never overwrite inherited genes. Complex shade, flaxen, sooty, dappling, rabicano and sabino-like appearance use bounded appearance inheritance and are labeled as complex traits. Unknown historical alleles remain `?`, rather than fabricating complete genotypes. Appearance and expression are stored so loading, purchase and re-rendering do not reroll them.

New recorded Grey horses retain their underlying base and progress at individually seeded speeds through early, steel, dapple, light and nearly-white stages. Some later become fleabitten; not all do. Homozygous Grey progresses faster. Fjord Grey Dun remains genetically distinct. Varnish Roan LP expression progresses with age. True white remains labeled true white even if a Grey allele is present. Legacy horses keep their exact saved appearance, including old Grey stages, until explicitly edited; missing historical progression parameters are not invented during loading.

## New breeds and athletic potential

All 30 requested names, IDs, brands, valid hands-height ranges, specialties, four discipline reference values, and typical/exceptional jumping scope appear in [data/breeds94.json](data/breeds94.json). They participate in the existing breed registry, generation, sales filter, breeding, NPC roster and auction breed groups. No extra discipline or auction format was added. Future anatomical model assignments are metadata only.

New-breed heights use center-weighted whole-inch samples and valid `.0–.3` hands notation. Foals grow toward an inherited mature height. Normal/Exceptional/Very Exceptional/Extraordinary categories use **95% / 4% / 0.9% / 0.1%**, with the requested 4–8 / 9–13 / 14–18 enhancement ranges in one discipline. Individual potential varies around fictional breed references rather than acting as a hard breed-wide maximum. Per-subskill ceilings and physical jumping scope are recorded separately from actual schooling. Training, age, condition, existing eligibility and the individual's physical scope still apply. Miniatures and extremely small ponies are excluded from ridden sport. Existing breed definitions and existing saved current skills remain intact.

Purebred and mixed foals derive potential, height and scope from their parents, rather than being rerolled to elite breed averages. New-born inherited data survives serialization and loading. Stored athletic potential is permanent across sale, import and re-rendering.

## Existing horses and marking protection

The existing 13-field marking/genetics system remains intact for compatibility. New body information is stored in coatGenetics94. Hydration snapshots and restores exact saved coat, body pattern, face marking, leg markings, socks, modifiers and legacy genetics, including unusual old breed/coats. Large legacy NPC populations are not bulk-migrated into extra genotype records merely by opening a save; their text details can be read lazily.

Eight protected original source regions, including face/leg generators, probabilities and inheritance, match their baseline SHA256 hashes. Seeded functional comparisons confirm unchanged original face/leg outputs across the old breed roster. Real inherited marking fields, saved marked horses and roleplay editing are tested. The editor changes body fields and the new genotype only. No marking names, files, chances, layering or image assets were changed. Graphics, pixel comparison and model alignment work are outside this explicitly authorized text-only scope; no nonexistent renderer is claimed.

## Validation and performance

- Complete profile checks: every supported breed has every primary/secondary entry, numerical weights, shade/expression totals, restrictions and source notes.
- **610,000 seeded founders**: 10,000 per breed. All tested frequencies fit six binomial standard deviations plus four; explicit zero/100% restrictions are exact. Full counts are retained in founder-population.json. No invalid founder genotype was generated.
- Mendelian carrier, recessive and dilution combinations; Cream/Pearl exclusivity; Silver expression; LP/PATN1 dosage; frame viability; individual Grey and Varnish progression; true-white labeling.
- 300,000 height samples across the 30 additions; 20,000 rarity samples; permanent potential and subskill checks; real crossbred foaling and unchanged reload.
- Native Chromium: actual horse detail/editor, compatible combined patterns, saved legacy marked horses, verified Save3 reload, and the real sales breed selector.
- Existing auction variety, save identity/portable transfer, schooling/grooming, interactive competition, ranking point/standing, and 20 federation progression scenarios passed. The auction fixture was brought in line with the existing three-catalogue cap and explicit life-stage themes; production auction rules were not altered.
- Native worker time skipping passed. Before: day skips 113–528ms, month skips 864/1363ms. After the traversal optimization: day skips 87–152ms, months 641/802ms. These are local observations, not universal guarantees; the added breeds can change eligibility and results, so this is not an exact identical-career speed ratio. Full timings and population sizes are recorded in validation94/skips-before.json and skips-after.json. The collector stops at horse objects instead of repeatedly traversing every stat/genotype leaf.

Evidence and test logs are retained in validation94/. Run `npm run test:coats-breeds`, `npm run test:coats-population`, and `npm run test:coats-browser` (serve the game on port 8101 or set GAME_URL). No full historical-suite claim is made.

## Deliberate limits

No new graphics are supplied. Complex traits are approximate, not claimed to be known Mendelian loci. Unknown legacy genes remain unknown, and legacy visible coats are frozen for compatibility. Unsupported SW variants, unverified rare KIT haplotypes, chimerism and additional unresearched alleles are not invented. Rare catalogue combinations can be inherited or selected in the existing optional roleplay editor; most have zero founder weight in ordinary purebreds. Registry acceptance is distinct from genetic possibility.
