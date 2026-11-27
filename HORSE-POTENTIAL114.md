Universal coat/profile potential section

The Individual athletic potential panel was rendered only when athleticPotential94 existed, excluding many original breeds and older saved horses. Every horse now receives this panel inside the existing Coat & genetics section. It reads the recorded individual profile, saved horse potential and existing breed-cap records, without generating new potential or changing stats during rendering.

The panel shows all four disciplines, jumping scope, projected mature height when recorded, and current age with the existing age-based schooling bands. When individual scope is unavailable, a level ceiling derived from saved jumping potential is explicitly labelled as an estimate. Missing values are labelled Not recorded. A foal's current height is not presented as a projected adult height. Nonridden breeds retain their suitability restriction.

Incomplete lesson athletic profiles no longer trigger height-growth calculations without a valid projected mature height, avoiding NaN heights. Existing panels, coat editors and normal card layout are retained.

Native browser checks cover original/new breeds, foals, older horses and partial lesson profiles, unchanged values during markup generation, protected height, no undefined/NaN text, and save/reload. Original marking source regions remain unchanged.
