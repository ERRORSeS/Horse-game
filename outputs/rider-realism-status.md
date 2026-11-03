# Rider Realism implementation status

This is an incomplete draft of the pasted expansion, not the complete 1.0 release.

1. Rider Realism settings default off, with separately gated difficult storylines, editable abilities and discipline experience from SHOW_LEVELS.
2. Existing t2probability, t2attempt, renderTraining and competition chance/resolution functions are extended; existing skill rewards are reused.
3. Natural spookiness is a saved deterministic scale. Learned spook sensitivity is a separate behavioral score.
4. Temperament intensity is independently seeded and editable.
5. Over-level thresholds are represented, but exact rider-error probability calibration and overall-level profiles require more work.
6. Competition modifiers adjust existing outcome chances. No second refusal roll is introduced.
7. Meaningful failures change learned confidence/avoidance with an eight-point daily cap.
8. Successful work gradually restores confidence; there is no instant fear cure.
9. Collection Confidence is separate from technical Collection skill.
10. Explicit gated misconduct produces no new training reward and interrupts work.
11. Welfare incidents have a separate permanent archive.
12. Existing personality and traits are retained, but natural-scale initialization from traits and richer compatibility need further integration.
13. Quick/Auto updates aggregate to one behavioral summary per session and use bounded ordinary histories.
14. Interactive competition chances extend existing scoring; jump-off qualification and base pole plans are untouched. Quick Compete behavioral integration is not complete.
15. Old saves default the setting off. New state is serialized and restored without changing Bond, QOL, skills, potential or ownership.
16. New targeted tests verify null-session style fallback, off/default behavior, bounded learning, idempotency, core-state preservation, welfare gating, and save/load. Full-suite results must be checked in the accompanying run log before release.
17. Files: show-session.js, rider-realism.js, index.html, tests/rider-realism.test.cjs.
18. Outstanding: the supplied 120+ narrative variants and their individual effects, full trainer storyline progression, complete Quick Compete and environmental-event coverage, lazy history rendering, stronger validation/migration, broader browser scenarios and performance measurements. Do not describe this draft as the complete expansion.
