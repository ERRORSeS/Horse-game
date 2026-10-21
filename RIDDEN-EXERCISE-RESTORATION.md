# Ridden exercise restoration

Confirmed failure path: the lesson renderer and draft refresh used full eligibility as a visibility filter. Side Reins or a Lunging Surcingle left equipped after lunging made every ridden exercise fail that check. The UI then rendered no options and removed the draft's ridden exercises. Medical, fatigue and prerequisite locks could cause the same silent removal. The registry itself was not being emptied.

The fix separates category membership from current eligibility. Menus derive entries from the authoritative registry and show temporarily unavailable entries as disabled with an explanation. Drafts retain locked exercises. Starting/attempting work still enforces the original restrictions. A player-controlled Remove Lunging Equipment for Riding action uses the existing inventory unassignment mechanism; equipment is not silently changed.

Existing exercise IDs, scenes, outcome checks, attribute gains, skills, course editing, clinic and veterinary logic remain intact. The requested named ridden variants reuse canonical exercise definitions, prerequisites, locations and learning mappings. All original entries remain. Polework and mixed lessons have explicit selectors. Discipline aliases normalize to existing identifiers, independent draft lessons are remembered per discipline, and repeated filtering does not modify the registry.

Groundwork and Lunging retain the combined in-hand/lunging pool. Ridden lists contain only ridden categories. Whole-number normal skill formatting, decimal riding attributes and removal of monthly training caps remain unchanged.

Validation: 54 training checks pass across the small-fix, additive-extension and original Training 2.0 suites. Added regressions reproduce the all-ridden-locked equipment case, verify locked entries remain visible, preserve the draft, unlock after removing equipment, repeat mode switching twenty times without catalog mutation, and check the requested catalog families and aliases.

Separate browser stable: repeated Lunging → Dressage → Lunging → Polework → Lunging → Jumping switches showed 25/40/11/68 appropriate entries respectively. A Vertical could be added after switching. Advanced Collection exercises showed explicit locks. No console errors were recorded. The player's existing stable was not edited.
