# Medical realism expansion

Extends the existing medical engine, horse identities, training, sales, rescue and save paths. All values are fictional gameplay values.

## Preserved probabilities

Baseline incident opportunity remains `1 - .96^(1/30)` per day. Separate incident weights remain `none:80, minor:14, moderate:13, major:7` over 114. Category weights remain 25/20/20/10/10/7/8. Existing condition-selection weights, exposures, vaccination modifiers and marketplace generation (40% affected, conditional 30/50/20 severities and existing pools) remain unchanged.

New definitions have zero independent baseline weight. Explicit complete-rupture/unstable-fracture injury templates require the existing major-incident result; lesser results remain strains. Colic complications/referrals link to the original episode. No new spontaneous catastrophic-subtype incidence selector was added. Anatomical diagnosis beyond the named classes is not modeled.

Explicit existing residual probabilities and original tendon/suspensory severity tables take priority over suggestions. Other acute shares normalize around retained residual rates. The table below reports differences. Ulcer recurrence remains 25%. Recurrence is a separate saved conditional opportunity, never added to acute outcomes. Lost shoes receive no second recurrence roll.

## Conditions, observation and treatment

`medical-catalog.js` contains all 47 condition entries from request sections 3–8, with exact quoted lines, fallback severity/duration/outcome data and descriptions. Three additional existing entries remain supported. `health-engine.js` enriches definitions with canonical metadata. Existing IDs and owned shop items remain stable. Changed display names keep legacy aliases.

Narrative selection uses actual phase, known diagnosis and observation context. Stable initial findings deduplicate. Improving lines require progress; resolved lines require resolution. Unconfirmed findings use observable symptoms. Ordinary distant pasture observation suppresses subtle localized findings. The historical `groom` API context is a stall-inspection alias; the interface offers existing observation/training/examination routes.

An authorized plan schedules daily care. Supplies consume once per eligible day and episode. Missing supplies, medication preparation, source correction, farrier or specialist care produce missed-task records without healing. No extra random adherence penalty is introduced. Prescription packages authorize a specific horse, condition, medicine, quantity and expiry; no dosing instructions are provided. Existing paid prepared packages migrate with their remaining course support. Expired unfilled prescriptions can be renewed by reviewing the existing plan.

One completed-day cursor drives hour/day/month progression. The final hour now processes the midnight boundary immediately. Serious rehabilitation requires targeted diagnostics and follow-up clearance; dental treatment requires professional service. Chronic arthritis/asthma retain functional management states. Fever/weight loss investigations follow a linked confirmed underlying diagnosis without a second cure roll.

## Emergencies and history

Emergency findings and Call Emergency Veterinarian / Request Hospital Referral / View Current Findings appear prominently in the clinic. Day/month skips pause for an owned horse's unresolved immediate emergency decisions. Unowned listings cannot block the clock. Existing training/trial restrictions apply. Examinations derive lameness grade from medical truth rather than an independent marketplace roll.

Services validate relevance before charging. Surgery requires specialist assessment, starts paid hospital care and transitions surviving horses to restricted rehabilitation after the critical phase. One saved outcome seed determines both the critical phase and final follow-up; death cannot reroll. Death preserves identity, veterinary/treatment records, ownership, competition results, pedigree and genetics.

Unavailable indicated specialist treatment requires a specialist prognosis. Its previously undefined fictional fallback is 0% full / 5% residual / 5% persistent / 90% death. This is a distinct critical branch, not safe waiting. Healthy horses have no death roll. Detailed anatomical prognosis remains outside the named-class model.

## Validation

- 26 existing care/sales tests and 28 new medical tests pass.
- 19 integration checks pass, including actual hourly/daily care, save/load consumption and month versus 30 daily skips.
- All 10 existing regression suites pass (auto-training, calendar, discipline progression, management, pasture, quality, roster and three Training 2.0 suites).
- Browser smoke checks cover startup, clinic rendering, narrow viewport, emergency panel, blocked emergency day/month controls, $300 consultation and its status update. No console errors were captured in these flows.
- This is not a claim that every one of the 75 requested scenarios or a full mobile/device matrix was individually tested. New catastrophic classes keep the explicit qualifying-source restriction above.

Run `npm test`. Ship both new JavaScript modules with the existing files. No player save or preview fixture is bundled.

## Preserved residual-rate differences

| Condition | Severity | Retained | Suggested |
|---|---|---:|---:|
| cut | minor | 1% | 3% |
| cut | moderate | 1% | 8% |
| dermatitis | minor | 1% | 4% |
| dermatitis | moderate | 1% | 4% |
| skin-infection | moderate | 3% | 9% |
| skin-infection | major | 3% | 20% |
| laceration | moderate | 15% | 18% |
| laceration | major | 15% | 40% |
| soreness | minor | 0.5% | 0% |
| soreness | moderate | 0.5% | 0% |
| strain | moderate | 5% | 12% |
| tendon | minor | 15% | 18% |
| tendon | moderate | 35% | 32% |
| tendon | major | 60% | 45% |
| suspensory | minor | 20% | 18% |
| suspensory | major | 55% | 45% |
| synovitis | minor | 20% | 6% |
| synovitis | moderate | 20% | 18% |
| synovitis | major | 20% | 30% |
| ulcers | minor | 5% | 2% |
| ulcers | major | 5% | 12% |

## Veterinary-service repair from browser review

Paid treatment services now create their active scheduled care plan automatically. Surgery, dental treatment, wound care, fluid therapy and medical colic treatment record concrete findings, next steps, service receipt and persistent treatment state. Daily recovery uses that plan. Already-paid operations loaded from earlier versions acquire the missing plan without another operation charge.

Menus show only services relevant to the condition, with prerequisites. Completed operations cannot be charged again, ordinary colic surgery cannot substitute for critical-colic surgery, and manual/automatic hospital-day payments share one ledger entry. Exam, care-plan, pharmacy and farrier results produce visible feedback. Current Findings includes the veterinary and service records.

The earlier UI could store an impossible unavailable-surgery decision after surgery had been performed. That flag is removed on migration. A terminal outcome caused solely by that invalid branch is corrected, with the original invalid death record archived under `correctedMedicalRecords`. Genuine critical-phase outcomes remain unchanged. The unavailable-treatment choice is no longer available after an operation.

Browser verification on the existing paid-operation preview showed recovery advancing from 0 to 1 and then 2 eligible care days, $150 per care day, and a $180 fluid-therapy service producing findings and a saved record.
