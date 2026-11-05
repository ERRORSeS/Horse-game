# Training recovery, show refusals and lesson-horse leases

This update supersedes the recovery, reward-threshold, fall-clearance and refusal-limit details in earlier behavior reports. Existing training buttons retain their names and order. One conditional remount button is added after a fall. Bond, QOL, genetics and technical skill progression retain their existing rules.

## Training and jumping shows

- Static footing/weather commentary appears once per training session and stays deduplicated after saving. A new actual slip still records its own incident.
- Refusals/run-outs add 5 tension points, bounded at 100, once per incident. During jumping, every walk break/circle-away action lowers tension toward zero, adds 0.5–1 Jump Confidence and removes 1–2 Learned Fence Avoidance. This includes all rider levels, zero tension and breaks before the first jump. Recovery uses the same live horse values. Real medical restrictions still prevent permanent learning awards.
- Rewarding an actual unpunished clean attempt adds 1 Jump Confidence and removes 1 avoidance at every positive avoidance score. Values remain bounded at 0–100; an attempt cannot be rewarded twice.
- Interactive Training pauses after a fall. The player can choose Get back on and continue riding or the existing End Session. The fall, intensity and consequences remain in saved history; continuing awards no fictional success. Quick/Auto training still ends after a fall.
- The extra incident-clearance gate is removed, including for old saves. A recorded fall does not claim that a veterinary/rider examination happened. Real examinations remain optional recorded events; genuine medical riding restrictions remain.
- Showjumping, Hunter and both eventing jumping phases score the first refusal as 4 faults and eliminate on the second. Falls still eliminate. Standard jumping uses the round’s actual refusal count, preventing a stale parallel counter from eliminating after one refusal. Legacy numerical eventing uses the same two-refusal threshold and four-fault refusal penalty.

## Lesson horses

- Each horse has saved lease terms: $50–$200/month and a random maximum duration tied to its availability, bounded at 12 months. Players select a whole number of months within that limit. Unavailable/already-leased horses and insufficient funds cannot start a lease.
- The first month is paid when signing; the first monthly rollover consumes that prepaid month without charging again. Subsequent months retain existing monthly billing. The horse returns with its actual training/health/show progress. Active leases keep their source horse unavailable.
- Approximately 35% receive a buyout offer with a saved price, individual 1–6 month deadline and saved sale/withdrawal outcome. An NPC purchase removes the horse from the lesson roster; withdrawn offers remain visible without a purchase option. Active leases prevent NPC purchases. Player buyouts remove the source from the barn, transfer tack, and convert an active lease without duplicating the live horse.
- Profiles show personality, coat, height and current level in Jumping, Dressage, Hunter and Eventing. Barn-managed tack is selected from the existing personality suitability rules and works with inventory ownership enabled or disabled.
- Barns below 2 lesson stars give their horses elevated fatigue and sometimes unsuitable tack. At 2 stars and above, generated tack avoids personality incompatibilities. Player horses and other facility mechanics are unaffected.

## Validation

- Full `npm test` regression suite, including eight new training/show integration groups and seven new lesson-horse groups.
- Tests cover live recovery/bounds, all rider levels, no invented jumps, actual refusal tension, remount pause/replay/save behavior, real medical restrictions, persistent footing deduplication and both eventing jumping phases.
- Financial/lifecycle tests cover lease limits and funds, duplicate requests, prepaid-month billing, lease expiry and retained progress, active-lease buyouts, tack ownership, individualized NPC/withdrawal deadlines and save/reload.
- Headless Chromium verifies the existing walk/circle/attempt/reward controls, actual fall/remount choice across a cold reload, continued riding with recorded history, lease prices/month selector, player buyout and one-star lesson profiles. No browser exceptions.
