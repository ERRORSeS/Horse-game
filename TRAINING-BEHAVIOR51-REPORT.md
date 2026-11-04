# Training Behavior 5.1 — implementation and validation

This addendum supersedes conflicting 5.0 progression, probability and recovery rules. The original Training 2.0 interface and handlers remain in place. The existing fixture checks every literal training button's ID, label and order, plus the contextual action catalog. No training buttons were added or replaced.

## Learning and persistent state

The authoritative scores remain `horse.riderBehavior.learned`; each change reads its current value. Fractional ordinary learning has one small budget per relevant statistic/direction/session. Minor events use 0.25–0.5, ordinary positive events generally 0.5–1, handling 0.25–0.75 and timing 0.25–1. Meaningful negative events use 0.5–1.5; significant communication incidents use 1.5–3. Incident-specific penalties, conditional rewards and verified recovery milestones remain separate.

Clean jumping uses the existing 40%/40%/20% draw for +2/+3/+4, now a session budget rather than repeated +2–4 awards. Reward Successful Attempt retains the existing independent threshold checks and once-per-success event ID.

Qualifying positive mounted communication gives general trust by actual rider level: Beginner 0–0.25, Novice 0.25–0.5, Intermediate 0.5–0.75, Advanced 0.75–1, Professional 1–1.25. This replaces both the old +3 expert bonus and the separate automatic compatibility increment. Empty, contradictory, distressed or medically unsuitable sessions cannot earn it. Small rider-specific adjustments persist separately, bounded to ±12 with at most 32 identities. Effective trust is general plus the selected rider's adjustment, clamped to 0–100; refusal, aid and bolt checks use it.

Reassessment, investigation, walk breaks, circling away and valid reorganization use the existing weighted outcomes, including zero improvement, with **no fixed recovery cap**. Each unique action uses the latest live avoidance score. Learning requires actual prior work and current tension or a newly evaluated unresolved concern. Repeated settled, unchanged clicks do not earn additional learning. Breaks during flatwork do not improve unrelated jumping avoidance. Advancing time alone does not change learned behavior.

Existing session event IDs, reports, horse saves and trainer profiles are reused. Ordinary budgets, rider adjustments, environmental stimulus decisions, incidents and pending assessments serialize with existing save data. No Bond, QOL, genetics or technical skill penalty was added.

## Refusal probabilities

The baseline is exactly 4% for scores 0–2; 3–10 interpolates from 15% to 25% (5 → 17.857%, 8 → 22.143%). The 11–30, 31–50, 51–75 and 76–100 formulas retain their specified boundary jumps. Final probability uses the existing rider, height, confidence, trust and tension modifiers and is clamped to **1–95%**. Fence geometry retains technical requirements; unfamiliar obstacle type adds no refusal chance. Existing medical restrictions and exposure rules remain; an unsupported numerical medical-refusal modifier was not invented.

The existing refusal/course simulation passes 60,000 single-jump trials, 6,000 courses and 24 actual training sessions under the new rules. At avoidance 5, the reference Intermediate rider's expected final chance is 19.857%; observed refusals were 19.91%. The previous 5.0 numerical output remains a historical artifact; rerunning `test:behavior5-simulation` evaluates the current engine.

## Spooks, bolts and falls

A spook requires an actual environmental stimulus. Explicit stimulus IDs resolve once; wind gusts, outdoor traffic or active arena movement are tied to actual attempts. The natural-spookiness bases, learned-sensitivity modifiers, arena-confidence modifiers and stimulus-intensity modifiers follow the supplied tables, capped at 50%. Properly sheltered indoor arenas do not inherit outdoor wind exposure.

The supplied severity weights total 85, so the 30/30/25 distribution is normalized to 100 before applying temperament's bounded transfer from mild to major severity. All temperaments retain nonzero mild and major possibilities. Major spooks can trigger one conditional bolt escalation using the requested temperament, tension, sensitivity and effective-trust formula, capped at 30%. The old independent bolt roll and duplicate ordinary spook gate are bypassed while Rider Realism is enabled.

Rider fall risk uses 60% Seat Stability plus 40% Balance and the exact multipliers, capped at 65%. The explicit incident table's 40% bolt base takes precedence over the conflicting illustrative 35% example. Normal successes have no generic rider-fall roll.

Horse falls are separate conditional checks: qualifying slip 8%, major imbalance 11%, serious jumping disruption 14%, severe footing plus incident 18%. A serious jumping horse fall can be rotational at 15%, or 25% in cross-country. A horse fall already includes the rider; no additional rider-only fall is rolled. Flatwork and minor spooks cannot produce rotational classifications.

Falls stop mounted work and record assessment requirements. Rotational falls end the session/round. Horse falls require an actual new general, soundness, lameness, emergency or follow-up veterinary examination and rider assessment. A pre-incident or unrelated dental exam cannot clear the incident. Incident identity participates in same-day examination caching so a real post-fall examination remains possible. Existing medical restrictions still control clearance; no diagnosis or instant healing is fabricated. Rider-only falls require rider-assessment acknowledgment through the existing reassessment/start flow.

Showjumping, hunter and eventing jumping phases use the same incident resolver while retaining their faults, refusal limits and elimination rules. A fall still eliminates the round. The training-only behavioral concern panel remains absent from shows.

## Weather and footing

All existing indoor/outdoor selections remain available in all weather. Interactive and Quick outdoor starts in poor conditions show the supplied warning with actual weather, arena, footing classification and selected activity; the player can decline or continue. Auto Training retains delegated scheduling and actual exposure.

Actual facility/session footing is preferred. Otherwise outdoor weather derives Normal, Low, Moderate, High or Severe concern with 4/6/8/13/21% slip-event probability per eligible movement. Indoors use actual indoor footing and shelter from outdoor rain, wind and snow. A slip is not automatically a fall. Warm-up movements also use one footing decision per completed action.

## Conditional narratives

All 88 new supplied quotes are preserved in `training-behavior51-narratives.js`, alongside the existing 140 rules. Every new rule has evidence predicates. Actor identities and current rider level must match. Consequences resolve before narration. Quotes cannot create a spook, recovery, fall, medical finding, stat change or player decision. Inspection and replay do not reroll mechanics. Additional conditions prevent a noise-specific line describing unrelated arena movement or a recovery line appearing before actual recovery.

## Validation

- `npm test`: complete medical, save, economy, competition, scheduling, performance, time-skip, Rider Realism, tack and behavior regressions pass, including ten new 5.1 integration groups.
- `npm run test:behavior5-simulation`: current exact refusal interpolation, per-jump/course probability bounds and actual-session consistency pass.
- `npm run test:behavior51-simulation`: 80,000 seeded conditional trials plus rotational subtype sampling pass; results are committed in `outputs/training-behavior51-simulation.json`.
- Chromium: existing Repeat Exercise, Reward, reassessment, walk break and End Session controls resolve real events; recovery continues beyond four points; qualified trust/report values and save/reload match. Weather cancellation/acceptance works. A real slip through Repeat Exercise produces one horse fall, stops work and preserves pending assessment across reload. No uncaught browser exceptions.
- Static checks: changed scripts parse successfully; button fixture and `git diff --check` pass.

Conditional simulation observations: environmental spook rates 12.73% / 21.56% / 43.29% versus expected 12% / 22% / 43%; rider-only stop falls 65.16% / 24.46% versus expected 65% / 24.75%; slip-related horse falls 8.21% versus 8%; bolt escalation 29.96% versus 30%; serious-jump horse falls 14.19% versus 14%; rotational subtype 16.35% among 1,419 eligible horse falls versus 15%. These are fictional gameplay probabilities from the specification.
