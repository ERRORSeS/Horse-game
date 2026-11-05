# Show falls and training learning

Existing Training 2.0 controls and their order are preserved. This patch changes their learning effects and show fall probabilities. Bond, QOL, genetics, technical progression, refusal probabilities and refusal limits retain their existing rules.

## Effective rules

- Show rider-fall and horse-fall chances are divided by three, capped at 12%. This applies to Rider Realism incidents, legacy numerical rounds, Hunter/XC fallback resolution and Puissance. At Seat Stability/Balance 60, a refusal has a 5% show rider-fall chance; training remains 15%. Falls still record cause, intensity and assessment requirements; eliminations retain Fall/Refusal reasons.
- After a genuine refusal, Pause and assess or Allow time to investigate removes 1–2 avoidance points. Genuine tension-lowering walk breaks/circling away also remove 1–2. All read and update the same current horse value, including across save/reload. Unchanged settled clicks and medical restrictions cannot generate recovery awards. Reorganization keeps its existing weighted outcomes.
- Advanced/Professional riders earn -0.5 avoidance and +3 Trust in Rider’s Aids once per qualifying safe session. Appropriate aids with Leg Stability below 20/no spurs or Hand Stability below 20/no Pelham add +1 trust once, even if both apply. Unsafe aids, neglectful choices, empty sessions and unresolved serious concerns cannot claim these bonuses.
- An unpunished clean jump earns the initial +2/+3/+4 confidence award once per session. The second consecutive clean jump and each further clean jump in that streak earn another +2/+3/+4. Failure or punishment interrupts the streak; resuming after a failure needs two clean jumps to earn another award. Each actual attempt is processed once.
- Failed jumps can lower Jump Confidence at **every rider level**, within the existing fractional ordinary session learning budget. Beginner/Novice riders cannot restore Jump Confidence through recovery/time actions; clean jumps and rewards still help them. Punishment lowers confidence at every rank and reverses that attempt's clean-jump confidence award and confidence reward. The event ledger owns the punishment penalty so an older wrapper cannot subtract trust again.
- Reward Successful Attempt adds +1 confidence, bounded at 100, and subtracts 1 avoidance when its current value exceeds 30. It applies once per actual unpunished successful attempt and cannot replay after saving.

## Validation

- `npm test`: full regression suite, including unchanged training-control fixtures and ten additional integration groups in `tests/show-learning-rules.test.cjs`.
- `npm run test:behavior5-simulation`: existing per-jump refusal/course rates and real-session protected-state checks pass.
- `npm run test:behavior51-simulation`: existing 80,000 conditional training incident trials pass with unchanged training fall probabilities.
- `npm run test:show-learning-simulation`: 50,000 actual show incident trials pass. At stability 60, 529/10,000 refusal incidents caused rider falls (5.29%, expected 5%). Horse falls occurred in 99/10,000 slips (0.99%, expected 1%) and 161/10,000 serious jumping disruptions (1.61%, expected 1.67%). Results are saved in `outputs/show-learning-simulation.json`.
- Headless Chromium: existing attempt/reward/reassessment/break/finish controls; consecutive clean learning; Professional failed-jump confidence loss; Beginner/Novice passive recovery restrictions; +3 expert trust/+1 compatible aids; shared avoidance recovery; Fall/Refusal elimination displays; cause/intensity history and cold reload persistence. No browser exceptions.
