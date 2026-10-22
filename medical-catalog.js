/* Condition-specific fictional gameplay defaults. Existing configured rates take precedence. */
(function(root){
 const entries = {
  "scratch": {
    "name": "Superficial Scratch",
    "severityWeights": {
      "minor": 100
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        2,
        6
      ]
    },
    "source": {
      "Severity": "Small only.",
      "Cause": "Minor contact with a fence, vegetation or another harmless environmental object.",
      "Visibility": "Stall or close Pasture Observation.",
      "Examination": "Visual observation; veterinary examination if worsening or concerning.",
      "Treatment": "Suitable permitted basic wound care using Saline Rinse, Sterile Gauze and optionally Non-Adherent Dressing where appropriate.",
      "Supplies": "Saline Rinse $9; Sterile Gauze $12; Dressing $15.",
      "Game healing": "2–6 days.",
      "Suggested outcomes": "Full 99%; residual mark 1%; persistent 0%.",
      "Suggested recurrence": "1% as a linked repeated rubbing issue when the cause remains; otherwise a future scratch is a new unrelated event."
    },
    "quotes": [
      "A thin scratch is visible on [HORSE]'s [BODY REGION].",
      "The superficial mark looks clean and does not appear to be causing significant discomfort.",
      "The scratch remains visible, but the surrounding skin looks normal.",
      "The mark is beginning to fade as the skin recovers.",
      "The superficial scratch has healed, leaving no noticeable problem."
    ]
  },
  "cut": {
    "name": "Small Cut",
    "severityWeights": {
      "minor": 85,
      "moderate": 15
    },
    "outcomes": {
      "minor": [
        0.97,
        0.03,
        0.0
      ],
      "moderate": [
        0.9,
        0.08,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        4,
        9
      ],
      "moderate": [
        10,
        21
      ]
    },
    "source": {
      "Severity": "Small 85%; Medium 15% when this condition is selected, unless current configuration differs.",
      "Cause": "Minor contact injury.",
      "Visibility": "Usually Stall Observation or close Pasture Observation.",
      "Examination": "Direct inspection; vet if deep, contaminated, near a joint, or otherwise concerning.",
      "Treatment": "Appropriate wound assessment and permitted dressing supplies.",
      "Game healing": "Small 4–9 days; Medium 10–21 days.",
      "Suggested outcomes": "Small: 97% full, 3% residual scar. Medium: 90% full, 8% residual, 2% persistent complication.",
      "Suggested recurrence": "2% only when the original environmental hazard remains relevant."
    },
    "quotes": [
      "A small cut is visible on [HORSE]'s [LIMB].",
      "The affected area appears sensitive when the horse moves.",
      "The wound remains open and needs appropriate attention.",
      "The edges of the wound look less irritated than during the previous check.",
      "The cut has closed, although a small mark may remain."
    ]
  },
  "abrasion": {
    "name": "Abrasion",
    "severityWeights": {
      "minor": 90,
      "moderate": 10
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.98,
        0.02,
        0.0
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        3,
        12
      ],
      "moderate": [
        3,
        12
      ]
    },
    "source": {
      "Severity": "Small 90%; Medium 10%.",
      "Cause": "Rubbing against equipment or surfaces.",
      "Visibility": "Stall Observation, tack removal/preparation inspection.",
      "Examination": "Skin inspection and equipment-fit assessment.",
      "Treatment": "Correct rubbing source; suitable basic skin care and dressings when indicated.",
      "Game healing": "3–12 days.",
      "Suggested outcomes": "Full 98%; residual 2%.",
      "Recurrence": "15% over 60 in-game days IF the same unsuitable equipment remains in use; 2% if corrected."
    },
    "quotes": [
      "A patch of rubbed skin is visible on [HORSE]'s [BODY REGION].",
      "The affected skin looks irritated where repeated friction has occurred.",
      "[HORSE] reacts when the rubbed area is touched.",
      "The abrasion is improving now that the source of friction has been removed.",
      "The skin has recovered, and the abrasion is no longer active."
    ]
  },
  "rub": {
    "name": "Tack Rub",
    "severityWeights": {
      "minor": 85,
      "moderate": 15
    },
    "outcomes": {
      "minor": [
        0.97,
        0.0,
        0.03
      ],
      "moderate": [
        0.97,
        0.0,
        0.03
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        4,
        14
      ],
      "moderate": [
        4,
        14
      ]
    },
    "source": {
      "Severity": "Small 85%; Medium 15%.",
      "Cause": "Incorrect fit, friction, unsuitable or poorly adjusted equipment.",
      "Visibility": "Before or After Training, Stall Observation during close inspection.",
      "Examination": "Skin inspection plus tack-fit check.",
      "Treatment": "Remove or correct offending tack, assess skin, permitted basic care.",
      "Game healing": "4–14 days.",
      "Suggested outcomes": "97% full; 3% persistent irritation if the actual source remains.",
      "Recurrence": "25% within 60 days with unchanged unsuitable equipment; 3% after successful fit correction."
    },
    "quotes": [
      "A rubbed area is visible where [HORSE]'s equipment normally sits.",
      "[HORSE] becomes uncomfortable when the affected area is contacted.",
      "The irritation appears consistent with repeated friction.",
      "The area is beginning to recover after the equipment arrangement was changed.",
      "The tack rub has resolved, and the skin appears comfortable again."
    ]
  },
  "dermatitis": {
    "name": "Rain-Related Dermatitis",
    "severityWeights": {
      "minor": 70,
      "moderate": 30
    },
    "outcomes": {
      "minor": [
        0.94,
        0.04,
        0.02
      ],
      "moderate": [
        0.94,
        0.04,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        28
      ]
    },
    "source": {
      "Severity": "Small 70%; Medium 30%.",
      "Cause": "Relevant prolonged moisture and skin conditions.",
      "Visibility": "Stall Observation, close Pasture Observation.",
      "Examination": "Veterinary skin assessment when appropriate.",
      "Treatment": "Improve environmental conditions, appropriate veterinary-directed skin care, relevant supplies.",
      "Game healing": "Small 7–14 days; Medium 14–28 days.",
      "Suggested outcomes": "Full 94%; residual 4%; persistent 2%.",
      "Recurrence": "20% within 90 days if exposure remains; 5% after management correction."
    },
    "quotes": [
      "Several small crusted patches are visible along [HORSE]'s coat.",
      "The affected skin appears irritated after prolonged damp conditions.",
      "The crusted areas remain noticeable during the stall inspection.",
      "The skin is gradually improving as the conditions and care change.",
      "The dermatitis has resolved, although continued management may be useful."
    ]
  },
  "skin-infection": {
    "name": "Skin Infection",
    "severityWeights": {
      "minor": 55,
      "moderate": 40,
      "major": 5
    },
    "outcomes": {
      "minor": [
        0.97,
        0.03,
        0.0
      ],
      "moderate": [
        0.88,
        0.09,
        0.03
      ],
      "major": [
        0.7,
        0.2,
        0.1
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        30
      ],
      "major": [
        30,
        60
      ]
    },
    "source": {
      "Severity": "Small 55%; Medium 40%; Serious 5%.",
      "Cause": "Actual infected skin lesion or appropriate bacterial process.",
      "Visibility": "Often Stall Observation; may begin as a subtle local finding.",
      "Examination": "Veterinary skin examination; relevant additional diagnostics if needed.",
      "Treatment": "Veterinary-prescribed plan, appropriate wound care, antimicrobial therapy only if indicated.",
      "Supplies/meds": "Saline Rinse, Gauze, Dressing; Trimethoprim–Sulfadiazine $75 or other veterinarian-selected medication when appropriate.",
      "Game healing": "Small 7–14 days; Medium 14–30 days; Serious 30–60 days.",
      "Suggested outcomes": "Small 97/3/0; Medium 88/9/3; Serious 70/20/10 (full/residual/persistent).",
      "Recurrence": "8% in 90 days after full recovery; 20% if contributing conditions persist."
    },
    "quotes": [
      "The affected skin looks more inflamed than during the previous observation.",
      "[HORSE] reacts when the irritated area is examined.",
      "The visible changes suggest that a veterinary assessment is appropriate.",
      "The skin condition is improving during the prescribed treatment.",
      "The infection has resolved, although the area still requires monitoring."
    ]
  },
  "laceration": {
    "name": "Significant Laceration",
    "severityWeights": {
      "moderate": 65,
      "major": 35
    },
    "outcomes": {
      "moderate": [
        0.8,
        0.18,
        0.02
      ],
      "major": [
        0.5,
        0.4,
        0.1
      ]
    },
    "recoveryDurationBySeverity": {
      "moderate": [
        21,
        56
      ],
      "major": [
        60,
        150
      ]
    },
    "source": {
      "Severity": "Medium 65%; Serious 35%.",
      "Cause": "Actual traumatic injury.",
      "Visibility": "Immediately apparent during close observation.",
      "Examination": "Veterinary wound assessment; investigation for deeper structures where indicated.",
      "Treatment": "Professional veterinary wound management; appropriate dressings and prescribed medication if indicated.",
      "Game recovery": "Medium 3–8 weeks; Serious 2–5 months.",
      "Suggested outcomes": "Medium full 80%, scar/residual 18%, persistent 2%. Serious full 50%, residual 40%, persistent 10%.",
      "Recurrence": "2% as a directly related later wound problem following recovery; future accidents are separate."
    },
    "quotes": [
      "A substantial wound is visible on [HORSE]'s [BODY REGION].",
      "The injury appears more significant than an ordinary superficial cut.",
      "[HORSE] is visibly uncomfortable around the affected area.",
      "The veterinary treatment is progressing, but healing is not yet complete.",
      "The laceration has closed, although a visible scar or lasting limitation may remain."
    ]
  },
  "tender-hoof": {
    "name": "Mild Hoof Tenderness",
    "severityWeights": {
      "minor": 75,
      "moderate": 25
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.92,
        0.06,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        2,
        7
      ],
      "moderate": [
        7,
        21
      ]
    },
    "source": {
      "Severity": "Small 75%; Medium 25%.",
      "Cause": "Relevant footing or hoof-condition stress.",
      "Discovery": "During movement, hoof inspection or farrier evaluation.",
      "Exam": "Vet/farrier hoof examination.",
      "Treatment": "Appropriate rest/work modification; farrier assessment and cause correction.",
      "Game recovery": "Small 2–7 days; Medium 7–21 days.",
      "Outcomes": "Small 98/2/0; Medium 92/6/2.",
      "Recurrence": "10% within 60 days if the same triggering conditions persist."
    },
    "quotes": [
      "[HORSE] takes a shorter step on the firmer ground.",
      "The horse appears less comfortable on one type of footing.",
      "[HORSE] remains slightly cautious while turning.",
      "The movement looks more comfortable after the hoof concern is addressed.",
      "The tenderness is no longer apparent during ordinary movement."
    ]
  },
  "lost-shoe": {
    "name": "Lost Shoe",
    "severityWeights": {
      "minor": 90,
      "moderate": 10
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.98,
        0.02,
        0.0
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        1
      ],
      "moderate": [
        1,
        1
      ]
    },
    "source": {
      "Severity": "Small 90%; Medium 10% if secondary hoof damage occurred.",
      "Cause": "Existing shoe detaches during relevant activity.",
      "Discovery": "Hoof observation, stall, pasture, preparation.",
      "Exam": "Farrier inspection.",
      "Treatment": "Lost Shoe Replacement $55; assess possible hoof damage.",
      "Resolution": "After appropriate service, usually same-day if no other injury.",
      "Outcomes": "Full 98%; residual secondary concern 2%.",
      "Recurrence": "Use the existing shoe-loss mechanic; do not add a second independent medical recurrence roll."
    },
    "quotes": [
      "One of [HORSE]'s shoes appears to be missing.",
      "[HORSE] walks more carefully on the affected foot.",
      "The farrier examines the hoof before replacing the shoe.",
      "The lost shoe has been replaced.",
      "[HORSE] moves normally following the completed farrier service."
    ]
  },
  "abscess": {
    "name": "Hoof Abscess",
    "severityWeights": {
      "minor": 35,
      "moderate": 55,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.94,
        0.05,
        0.01
      ],
      "major": [
        0.85,
        0.1,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        5,
        10
      ],
      "moderate": [
        10,
        21
      ],
      "major": [
        21,
        45
      ]
    },
    "source": {
      "Severity": "Small 35%; Medium 55%; Serious 10%.",
      "Cause": "Appropriate localized hoof infection.",
      "Discovery": "Movement irregularity, hoof pain, targeted examination.",
      "Exam": "Vet/farrier hoof evaluation.",
      "Treatment": "Professional hoof-abscess management; prescribed dressing/bandage supplies where indicated.",
      "Game recovery": "Small 5–10 days; Medium 10–21 days; Serious 21–45 days.",
      "Outcomes": "Small 98/2/0; Medium 94/5/1; Serious 85/10/5.",
      "Recurrence": "8% over 90 days if an underlying recurring problem persists; otherwise treat a later new abscess as a separate episode."
    },
    "quotes": [
      "[HORSE] appears suddenly much more uncomfortable on one foot.",
      "The horse is reluctant to place full weight on the affected limb.",
      "The hoof examination reveals findings that require veterinary or farrier attention.",
      "[HORSE] begins moving more comfortably during the recovery period.",
      "The hoof problem has resolved, and the horse's movement is returning to normal."
    ]
  },
  "bruise": {
    "name": "Hoof Bruise",
    "severityWeights": {
      "minor": 70,
      "moderate": 28,
      "major": 2
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.92,
        0.07,
        0.01
      ],
      "major": [
        0.8,
        0.15,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        4,
        10
      ],
      "moderate": [
        10,
        21
      ],
      "major": [
        21,
        45
      ]
    },
    "source": {
      "Severity": "Small 70%; Medium 28%; Serious 2%.",
      "Cause": "Relevant localized hoof trauma.",
      "Discovery": "Movement or hoof examination.",
      "Treatment": "Vet/farrier-directed support and suitable activity restriction.",
      "Game recovery": "4–21 days; serious cases potentially longer.",
      "Outcomes": "Small 98/2/0; Medium 92/7/1; Serious 80/15/5.",
      "Recurrence": "5% linked recurrence within 60 days; environmental reinjury separately."
    },
    "quotes": [
      "[HORSE] seems uncomfortable on the hard surface.",
      "The horse's stride changes when weight is placed on the affected foot.",
      "The farrier identifies a localized hoof concern.",
      "The horse's movement improves after the appropriate care period.",
      "The hoof bruise has resolved without an obvious remaining problem."
    ]
  },
  "imbalance": {
    "name": "Hoof Imbalance / Overgrowth",
    "severityWeights": {
      "minor": 60,
      "moderate": 35,
      "major": 5
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.93,
        0.06,
        0.01
      ],
      "major": [
        0.75,
        0.2,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        21
      ],
      "moderate": [
        21,
        56
      ],
      "major": [
        60,
        150
      ]
    },
    "source": {
      "Severity": "Small 60%; Medium 35%; Serious 5%.",
      "Cause": "Hoof growth and inadequate/unsuitable hoof care over time.",
      "Discovery": "Stall hoof inspection, farrier, altered movement.",
      "Treatment": "Farrier trimming/balancing program.",
      "Cost": "Routine Trim $65; assessment $35; special program if indicated.",
      "Recovery": "Small 1–3 weeks; Medium 3–8 weeks; Serious 2–5 months with staged management.",
      "Outcomes": "Small 99/1/0; Medium 93/6/1; Serious 75/20/5.",
      "Recurrence": "30% if maintenance is neglected again; 5% with proper schedule."
    },
    "quotes": [
      "The hoof shape looks less even than during the previous check.",
      "The wear pattern appears uneven between the feet.",
      "[HORSE] struggles slightly with movement that was previously comfortable.",
      "The hoof balance is improving through the farrier's management plan.",
      "The horse's hoof condition is stable under its current care schedule."
    ]
  },
  "thrush": {
    "name": "Thrush / Frog Infection",
    "severityWeights": {
      "minor": 65,
      "moderate": 30,
      "major": 5
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.9,
        0.08,
        0.02
      ],
      "major": [
        0.75,
        0.2,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        21
      ],
      "major": [
        21,
        30
      ]
    },
    "source": {
      "Severity": "Small 65%; Medium 30%; Serious 5%.",
      "Cause": "Relevant hoof environment and infection risk.",
      "Discovery": "Hoof inspection/farrier.",
      "Treatment": "Farrier/vet-directed local care; improve environmental causes; appropriate supplies.",
      "Game recovery": "7–30 days.",
      "Outcomes": "Small 98/2/0; Medium 90/8/2; Serious 75/20/5.",
      "Recurrence": "25% in 90 days if unfavorable conditions continue; 6% after correction."
    },
    "quotes": [
      "An unusual change is visible around the frog of [HORSE]'s hoof.",
      "The affected hoof requires closer examination.",
      "The farrier identifies an area requiring targeted hoof care.",
      "The affected hoof is gradually improving under the prescribed plan.",
      "The hoof condition has resolved, although routine monitoring remains important."
    ]
  },
  "soreness": {
    "name": "Muscle Soreness",
    "severityWeights": {
      "minor": 85,
      "moderate": 15
    },
    "outcomes": {
      "minor": [
        1.0,
        0.0,
        0.0
      ],
      "moderate": [
        0.97,
        0.0,
        0.03
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        4
      ],
      "moderate": [
        4,
        10
      ]
    },
    "source": {
      "Severity": "Small 85%; Medium 15%.",
      "Cause": "Appropriate recent workload or unaccustomed exercise, excluding serious muscle disease.",
      "Discovery": "Before/during training, movement observation.",
      "Exam": "Veterinary evaluation if persistent, significant or unusual.",
      "Treatment": "Adjust work/rest appropriately; cause-specific assessment when warranted.",
      "Recovery": "Small 1–4 days; Medium 4–10 days.",
      "Outcomes": "Small 100% full; Medium 97% full, 3% extended unresolved concern needing reassessment.",
      "Recurrence": "15% within 30 days if the same excessive workload remains; otherwise no specific recurrence."
    },
    "quotes": [
      "[HORSE] feels slightly stiff during the early warm-up.",
      "The horse appears less comfortable with the more demanding movement.",
      "[HORSE] loosens up gradually during suitable easy work.",
      "The soreness appears to be settling after the workload is adjusted.",
      "[HORSE] returns to its usual comfortable movement."
    ]
  },
  "strain": {
    "name": "Mild Soft-Tissue Strain",
    "severityWeights": {
      "minor": 65,
      "moderate": 35
    },
    "outcomes": {
      "minor": [
        0.95,
        0.05,
        0.0
      ],
      "moderate": [
        0.85,
        0.12,
        0.03
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        14,
        35
      ],
      "moderate": [
        35,
        70
      ]
    },
    "source": {
      "Severity": "Small 65%; Medium 35%.",
      "Cause": "Relevant movement incident or overload.",
      "Discovery": "Subtle movement change; possibly swelling.",
      "Exam": "Vet musculoskeletal/lameness exam; targeted imaging if indicated.",
      "Treatment": "Vet-directed restrictions and staged rehabilitation.",
      "Recovery": "Small 2–5 weeks; Medium 5–10 weeks.",
      "Outcomes": "Small full 95%, residual 5%. Medium full 85%, residual 12%, persistent 3%.",
      "Recurrence": "Small 8%, Medium 15% within one in-game year, conditionally on return to activity."
    },
    "quotes": [
      "[HORSE] takes a slightly shortened stride during the trot.",
      "The horse seems less comfortable when turning in one direction.",
      "A subtle irregularity appears during more demanding work.",
      "The horse is moving more evenly as rehabilitation progresses.",
      "The strain has improved, although the veterinarian may still recommend a gradual return to work."
    ]
  },
  "tendon": {
    "name": "Partial Tendon Injury",
    "severityWeights": {
      "minor": 45,
      "moderate": 45,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.8,
        0.18,
        0.02
      ],
      "moderate": [
        0.6,
        0.32,
        0.08
      ],
      "major": [
        0.35,
        0.45,
        0.2
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        90,
        180
      ],
      "moderate": [
        180,
        300
      ],
      "major": [
        270,
        450
      ]
    },
    "source": {
      "Severity": "Small 45%; Medium 45%; Serious 10%.",
      "Cause": "Relevant tendon lesion following injury or cumulative overload.",
      "Discovery": "Variable lameness; possible swelling/heat.",
      "Exam": "Veterinary lameness workup; ultrasound when appropriate.",
      "Treatment": "Vet-directed rehabilitation, imaging follow-up, controlled activity.",
      "Recovery/return to appropriate sport": "Small 3–6 months; Medium 6–10 months; Serious 9–15 months.",
      "Suggested outcomes": "Small full 80%, residual 18%, persistent 2%; Medium 60/32/8; Serious 35/45/20.",
      "Recurrence": "Small 12%, Medium 25%, Serious 40% within two in-game years after relevant return to work."
    },
    "quotes": [
      "[HORSE] feels unusually uneven during the trot.",
      "A local area near the tendon appears warmer than expected.",
      "The horse shows a repeated movement irregularity during the exercise.",
      "The rehabilitation is progressing, but the tendon is not yet cleared for demanding work.",
      "The veterinarian has completed reassessment, with the outcome dependent on how well the injured structure has recovered."
    ]
  },
  "tendon-rupture": {
    "name": "Complete Tendon Rupture / Tear",
    "severityWeights": {
      "major": 100
    },
    "outcomes": {
      "major": [
        0.1,
        0.45,
        0.3,
        0.15
      ]
    },
    "recoveryDurationBySeverity": {
      "major": [
        270,
        540
      ]
    },
    "source": {
      "Severity": "Serious only.",
      "Cause": "Rare qualifying major traumatic incident; not a routine illness roll from normal training.",
      "Discovery": "Sudden severe dysfunction, potentially obvious instability or marked lameness.",
      "Examination": "Emergency veterinarian assessment and appropriate imaging.",
      "Treatment": "Emergency specialist management, possible surgery when appropriate, long-term rehabilitation or welfare-based end-of-life decision for untreatable cases.",
      "Game treatment cost": "Specialist assessment $600; surgery package where eligible $4,000–$12,000; long-term rehabilitation separate.",
      "Recovery/rehabilitation": "Approximately 9–18+ game months if survival and treatment are feasible.",
      "Proposed conditional outcomes for treatable complete tears with timely specialist care": "Return without major functional restriction 10%; substantial lasting restriction 45%; chronic non-sport outcome 30%; fatal/euthanasia outcome 15%. Actual suitability depends strongly on anatomy and associated injury. Do not apply the same prognosis to every tendon type.",
      "Recurrence": "35% among horses returned to demanding sport, over two in-game years; use existing configured rate if present."
    },
    "quotes": [
      "[HORSE] suddenly becomes severely unable to move normally after the incident.",
      "The affected limb appears unstable, and the horse is in obvious difficulty.",
      "Further movement is stopped immediately while emergency veterinary assistance is requested.",
      "The specialist examination identifies a major tendon injury requiring difficult treatment decisions.",
      "The long-term outcome remains guarded, and returning to the previous sporting level may not be possible."
    ]
  },
  "suspensory": {
    "name": "Suspensory Ligament Injury",
    "severityWeights": {
      "minor": 35,
      "moderate": 45,
      "major": 20
    },
    "outcomes": {
      "minor": [
        0.8,
        0.18,
        0.02
      ],
      "moderate": [
        0.55,
        0.35,
        0.1
      ],
      "major": [
        0.3,
        0.45,
        0.25
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        90,
        180
      ],
      "moderate": [
        180,
        300
      ],
      "major": [
        270,
        450
      ]
    },
    "source": {
      "Severity": "Small 35%; Medium 45%; Serious 20%.",
      "Cause": "Relevant sport-related loading or trauma.",
      "Discovery": "Sometimes subtle, especially in particular movements.",
      "Exam": "Veterinary lameness examination, appropriate targeted imaging.",
      "Treatment": "Vet-directed rehabilitation.",
      "Recovery": "Small 3–6 months; Medium 6–10 months; Serious 9–15 months.",
      "Outcomes": "Small 80/18/2; Medium 55/35/10; Serious 30/45/25.",
      "Recurrence": "15% / 25% / 40% within two years by severity after returning to substantial work."
    },
    "quotes": [
      "[HORSE] appears less even on the circle than on the straight.",
      "The horse struggles with a movement that was previously comfortable.",
      "The irregularity is difficult to identify from observation alone.",
      "Targeted veterinary examination identifies a problem requiring prolonged management.",
      "The horse is improving, but long-term suitability for its previous workload remains under review."
    ]
  },
  "synovitis": {
    "name": "Joint Inflammation / Synovitis",
    "severityWeights": {
      "minor": 55,
      "moderate": 35,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.93,
        0.06,
        0.01
      ],
      "moderate": [
        0.78,
        0.18,
        0.04
      ],
      "major": [
        0.55,
        0.3,
        0.15
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        21
      ],
      "moderate": [
        21,
        56
      ],
      "major": [
        60,
        150
      ]
    },
    "source": {
      "Severity": "Small 55%; Medium 35%; Serious 10%.",
      "Cause": "Relevant strain, joint irritation or underlying pathology.",
      "Discovery": "Stiffness, performance changes, sometimes swelling.",
      "Exam": "Vet joint/movement examination, suitable diagnostics.",
      "Treatment": "Cause-specific veterinary plan, rest/work modification, prescribed medicine where indicated.",
      "Recovery": "Small 1–3 weeks; Medium 3–8 weeks; Serious 2–5 months.",
      "Outcomes": "Small 93/6/1; Medium 78/18/4; Serious 55/30/15.",
      "Recurrence": "12% / 25% / 40% over one in-game year."
    },
    "quotes": [
      "[HORSE] begins the session feeling unusually stiff.",
      "The horse seems reluctant to perform a demanding joint movement.",
      "The stiffness becomes more noticeable after repeated exercise.",
      "The horse's comfort improves under the veterinary management plan.",
      "The joint concern has stabilized, although future monitoring may be required."
    ]
  },
  "back": {
    "name": "Back / Saddle-Region Discomfort",
    "severityWeights": {
      "minor": 55,
      "moderate": 35,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.95,
        0.04,
        0.01
      ],
      "moderate": [
        0.82,
        0.15,
        0.03
      ],
      "major": [
        0.55,
        0.3,
        0.15
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        21
      ],
      "moderate": [
        21,
        56
      ],
      "major": [
        60,
        180
      ]
    },
    "source": {
      "Severity": "Small 55%; Medium 35%; Serious 10%.",
      "Cause": "Tack fit, muscle pain or another genuine underlying condition.",
      "Discovery": "Tacking reactions, mounting, ridden performance.",
      "Exam": "Vet and tack-fit assessment; more tests where indicated.",
      "Treatment": "Correct cause, suitable medical care, restrictions and tack changes.",
      "Recovery": "Small 1–3 weeks; Medium 3–8 weeks; Serious 2–6 months.",
      "Outcomes": "Small 95/4/1; Medium 82/15/3; Serious 55/30/15.",
      "Recurrence": "25% with unchanged cause, 6% after appropriate correction."
    },
    "quotes": [
      "[HORSE] tenses when the saddle is placed.",
      "[HORSE] reacts unexpectedly during mounting.",
      "The horse appears less comfortable when asked to use its back through the exercise.",
      "The reaction becomes less noticeable after the underlying issue is addressed.",
      "The horse's comfort has improved, although its return to normal work must remain appropriate."
    ]
  },
  "djd": {
    "name": "Degenerative Joint Disease",
    "severityWeights": {
      "minor": 45,
      "moderate": 40,
      "major": 15
    },
    "outcomes": {
      "minor": [
        0.0,
        0.0,
        1.0
      ],
      "moderate": [
        0.0,
        0.0,
        1.0
      ],
      "major": [
        0.0,
        0.0,
        1.0
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        14,
        56
      ],
      "moderate": [
        14,
        56
      ],
      "major": [
        14,
        56
      ]
    },
    "source": {
      "Severity": "Small 45%; Medium 40%; Serious 15%.",
      "Cause": "Genuine chronic joint pathology, influenced by age/history.",
      "Discovery": "Repeated stiffness, performance changes.",
      "Exam": "Vet assessment and appropriate diagnostics.",
      "Treatment": "Long-term management rather than guaranteed cure.",
      "Outcome": "This is a chronic condition; do not assign ordinary full biological cure. Allow controlled/symptomatically stable, active limitations, and severe long-term disability states.",
      "Game stabilization": "2–8 weeks after a management change.",
      "Suggested long-term functional outcomes": "Stable with suitable work 65%; persistent restricted workload 30%; progressive severe limitation 5%.",
      "Recurrence": "Not a new episode roll; use symptom flare-ups for a persistent condition."
    },
    "quotes": [
      "[HORSE] appears stiff during the first part of the session.",
      "The horse finds certain demanding movements less comfortable.",
      "The veterinary findings indicate a condition requiring ongoing management.",
      "The horse is comfortable during its current appropriate workload.",
      "The joint condition remains present, even though the current symptoms are controlled."
    ]
  },
  "stable-fracture": {
    "name": "Stable Fracture / Small Bone Fracture",
    "severityWeights": {
      "moderate": 65,
      "major": 35
    },
    "outcomes": {
      "moderate": [
        0.65,
        0.3,
        0.05
      ],
      "major": [
        0.35,
        0.45,
        0.15,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "moderate": [
        60,
        150
      ],
      "major": [
        120,
        270
      ]
    },
    "source": {
      "Severity": "Medium 65%; Serious 35%, depending on anatomical site.",
      "Cause": "Relevant actual trauma or appropriately modeled bone injury.",
      "Discovery": "Pain, localized swelling or lameness.",
      "Exam": "Veterinarian examination and radiographs when indicated.",
      "Treatment": "Professional stabilization, possible surgery, appropriate rehabilitation.",
      "Game costs": "Radiographs $250; specialist care $450–$1,500; surgery when indicated $2,500–$8,000.",
      "Recovery": "Medium 2–5 months; Serious 4–9+ months.",
      "Proposed outcomes": "Medium full 65%, residual 30%, chronic 5%; Serious full 35%, residual 45%, chronic 15%, fatal/euthanasia 5%.",
      "Recurrence": "8% relevant reinjury risk after return to the previous workload, unless individual anatomy/history supports another rate."
    },
    "quotes": [
      "[HORSE] becomes markedly uncomfortable after the movement incident.",
      "The horse avoids placing normal weight through the affected limb.",
      "The veterinarian recommends imaging to investigate a possible bone injury.",
      "The fracture is receiving specialist treatment, and the horse remains restricted from work.",
      "The bone injury has progressed through healing, although the long-term performance outcome still requires assessment."
    ]
  },
  "unstable-fracture": {
    "name": "Unstable / Comminuted Major Fracture",
    "severityWeights": {
      "major": 100
    },
    "outcomes": {
      "major": [
        0.1,
        0.2,
        0.2,
        0.5
      ]
    },
    "recoveryDurationBySeverity": {
      "major": [
        180,
        540
      ]
    },
    "source": {
      "Severity": "Serious only.",
      "Cause": "Rare substantial trauma.",
      "Discovery": "Severe lameness, instability, major pain.",
      "Exam": "Emergency specialist veterinary evaluation and appropriate radiographs.",
      "Treatment": "Emergency stabilization and surgical referral if feasible; specialist-led prognosis and welfare decisions.",
      "Cost": "Emergency $300; specialist assessment $600; potential surgical package $6,000–$18,000.",
      "Recovery": "If successfully managed, often 6–18+ in-game months; not every case is treatable.",
      "Proposed outcomes only for eligible serious modeled fractures": "Functional return 10%; permanent substantial limitation 20%; chronic non-sport status 20%; fatal/euthanasia outcome 50%. These are intentionally severity-specific fictional mechanics, not a clinical prediction, and must be overridden by anatomical subtype where available.",
      "Recurrence": "No ordinary independent recurrence roll; future fracture risk follows condition-specific residual anatomy and actual trauma."
    },
    "quotes": [
      "[HORSE] suddenly becomes unable to move normally after a serious accident.",
      "The affected limb appears severely compromised.",
      "The horse requires immediate emergency veterinary care, and further movement is restricted.",
      "The specialist explains that treatment options and long-term outlook are uncertain.",
      "The outcome depends on whether the fracture can be stabilized and the horse can recover comfortably."
    ]
  },
  "respiratory": {
    "name": "Mild Respiratory Infection",
    "severityWeights": {
      "minor": 70,
      "moderate": 30
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.95,
        0.04,
        0.01
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        28
      ]
    },
    "source": {
      "Severity": "Small 70%; Medium 30%.",
      "Cause": "Appropriate infection exposure.",
      "Signs": "Cough, discharge, fatigue.",
      "Exam": "Vet respiratory exam, additional testing if needed.",
      "Treatment": "Vet-directed supportive care, isolation where appropriate, specific therapy if indicated.",
      "Recovery": "Small 7–14 days; Medium 14–28 days.",
      "Outcomes": "Small 99/1/0; Medium 95/4/1.",
      "Recurrence": "5% same-episode relapse within 60 days; a new exposure causes a new episode."
    },
    "quotes": [
      "[HORSE] coughs several times while standing.",
      "A mild nasal discharge is visible during the stall check.",
      "The horse appears less energetic than usual.",
      "The respiratory signs are becoming less noticeable.",
      "The infection has resolved, and the veterinarian has reviewed the return-to-work plan."
    ]
  },
  "influenza": {
    "name": "Equine Influenza",
    "severityWeights": {
      "minor": 35,
      "moderate": 55,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.95,
        0.04,
        0.01
      ],
      "major": [
        0.8,
        0.15,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        14,
        21
      ],
      "moderate": [
        21,
        42
      ],
      "major": [
        42,
        70
      ]
    },
    "source": {
      "Severity": "Small 35%; Medium 55%; Serious 10%.",
      "Cause": "Relevant infectious exposure and susceptibility.",
      "Discovery": "Cough, fever, discharge, reduced energy.",
      "Exam": "Vet respiratory assessment and testing.",
      "Treatment": "Professional guidance, isolation, supportive care and follow-up.",
      "Recovery": "Small 2–3 weeks; Medium 3–6 weeks; Serious 6–10 weeks or longer.",
      "Outcomes": "Small 99/1/0; Medium 95/4/1; Serious 80/15/5.",
      "Recurrence": "No automatic same-condition recurrence; reinfection depends on future exposure/immunity."
    },
    "quotes": [
      "[HORSE] appears unusually tired and develops a cough.",
      "A respiratory illness is suspected after a relevant exposure.",
      "The veterinarian recommends isolation and further assessment.",
      "The horse's respiratory signs are improving, but training clearance has not yet been granted.",
      "The illness has resolved, and the horse may gradually return to appropriate activity."
    ]
  },
  "ehv": {
    "name": "Ehv-Associated Respiratory Disease",
    "severityWeights": {
      "minor": 35,
      "moderate": 55,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.95,
        0.04,
        0.01
      ],
      "major": [
        0.85,
        0.12,
        0.03
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        14,
        28
      ],
      "moderate": [
        28,
        42
      ],
      "major": [
        42,
        56
      ]
    },
    "source": {
      "Severity": "Small 35%; Medium 55%; Serious 10% for this respiratory subtype.",
      "Cause": "Specific viral exposure.",
      "Exam": "Vet assessment and relevant testing.",
      "Treatment": "Isolation/biosecurity and vet-directed care.",
      "Recovery": "2–8 weeks, depending on case.",
      "Outcomes": "Small 99/1/0; Medium 95/4/1; Serious 85/12/3.",
      "Recurrence": "Future episodes through exposure/reactivation according to the disease model; do not independently apply a generic monthly reoccurrence roll."
    },
    "quotes": [
      "[HORSE] develops respiratory signs after a recent exposure.",
      "The veterinarian is concerned about a potentially contagious respiratory condition.",
      "The horse is kept separate while the veterinary assessment continues.",
      "The respiratory signs are gradually improving.",
      "The acute illness has settled, but the horse's exposure and health history remain recorded."
    ]
  },
  "strangles": {
    "name": "Strangles",
    "severityWeights": {
      "minor": 20,
      "moderate": 60,
      "major": 20
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.92,
        0.06,
        0.02
      ],
      "major": [
        0.7,
        0.2,
        0.1
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        21,
        35
      ],
      "moderate": [
        35,
        56
      ],
      "major": [
        56,
        84
      ]
    },
    "source": {
      "Severity": "Small 20%; Medium 60%; Serious 20%.",
      "Cause": "Appropriate infectious exposure.",
      "Exam": "Vet assessment, relevant pathogen testing.",
      "Treatment": "Isolation, veterinary management and biosecurity.",
      "Recovery": "Small 3–5 weeks; Medium 5–8 weeks; Serious 8–12+ weeks.",
      "Outcomes": "Small 98/2/0; Medium 92/6/2; Serious 70/20/10.",
      "Recurrence": "5% relapse/persistent infection state if relevant; reinfection is separately modeled."
    },
    "quotes": [
      "[HORSE] appears feverish and less interested in its usual routine.",
      "Swelling becomes noticeable near the throat region.",
      "The veterinarian suspects a contagious illness requiring isolation.",
      "The horse remains under a specific veterinary and biosecurity plan.",
      "The acute illness has improved, but veterinary clearance is required before normal contact resumes."
    ]
  },
  "asthma": {
    "name": "Equine Asthma",
    "severityWeights": {
      "minor": 45,
      "moderate": 40,
      "major": 15
    },
    "outcomes": {
      "minor": [
        0.0,
        0.0,
        1.0
      ],
      "moderate": [
        0.0,
        0.0,
        1.0
      ],
      "major": [
        0.0,
        0.0,
        1.0
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        42
      ],
      "moderate": [
        7,
        42
      ],
      "major": [
        7,
        42
      ]
    },
    "source": {
      "Severity": "Small 45%; Medium 40%; Serious 15%.",
      "Cause": "Appropriate airway disease and environmental triggers.",
      "Exam": "Vet respiratory workup.",
      "Treatment": "Environmental management and veterinarian-prescribed therapy where indicated.",
      "Recovery": "Chronic; symptom stabilization 1–6 weeks.",
      "Outcomes": "60% stable with appropriate management; 30% recurrent symptomatic limitations; 10% severe persistent limitation.",
      "Recurrence": "Triggered exacerbations; no full cure/reinfection loop."
    },
    "quotes": [
      "[HORSE] coughs during the early part of exercise.",
      "The horse appears to find breathing more demanding during work.",
      "The respiratory signs become more noticeable in dusty conditions.",
      "The horse's comfort improves after environmental and medical management.",
      "The airway condition remains present but is currently controlled."
    ]
  },
  "airway-irritation": {
    "name": "Environmental Airway Irritation",
    "severityWeights": {
      "minor": 80,
      "moderate": 20
    },
    "outcomes": {
      "minor": [
        1.0,
        0.0,
        0.0
      ],
      "moderate": [
        0.98,
        0.0,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        5
      ],
      "moderate": [
        5,
        14
      ]
    },
    "source": {
      "Severity": "Small 80%; Medium 20%.",
      "Cause": "Dust, irritants or poor ventilation.",
      "Exam": "Environmental assessment and veterinary exam if persistent.",
      "Treatment": "Remove exposure, improve ventilation and management.",
      "Recovery": "Small 1–5 days; Medium 5–14 days.",
      "Outcomes": "Small 100% full; Medium 98% full, 2% ongoing concern requiring reassessment.",
      "Recurrence": "35% if the irritant persists; 3% after resolution of cause."
    },
    "quotes": [
      "[HORSE] coughs briefly in the dusty environment.",
      "The horse appears uncomfortable while exposed to airborne irritation.",
      "The breathing concern is less noticeable outside the affected environment.",
      "The coughing is decreasing after the environmental changes.",
      "The irritation has settled, and the horse appears comfortable again."
    ]
  },
  "digestive-upset": {
    "name": "Mild Digestive Upset",
    "severityWeights": {
      "minor": 85,
      "moderate": 15
    },
    "outcomes": {
      "minor": [
        1.0,
        0.0,
        0.0
      ],
      "moderate": [
        0.98,
        0.0,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        3
      ],
      "moderate": [
        3,
        7
      ]
    },
    "source": {
      "Severity": "Small 85%; Medium 15%.",
      "Cause": "Relevant digestive/feeding disturbance.",
      "Discovery": "Stall observation, appetite/manure records, horse behavior.",
      "Exam": "Veterinary assessment if persistent/concerning.",
      "Treatment": "Cause-specific vet advice and monitoring.",
      "Recovery": "Small 1–3 days; Medium 3–7 days.",
      "Outcomes": "Small 100% full; Medium 98% full, 2% extended concern requiring reassessment.",
      "Recurrence": "10% within 60 days if trigger persists."
    },
    "quotes": [
      "[HORSE] shows less interest in its usual feed.",
      "The horse's manure appears different from its normal pattern.",
      "[HORSE] seems mildly unsettled during the stall check.",
      "The horse's appetite is returning to normal.",
      "The digestive upset has resolved."
    ]
  },
  "colic": {
    "name": "Mild / Medically Managed Colic",
    "severityWeights": {
      "minor": 65,
      "moderate": 35
    },
    "outcomes": {
      "minor": [
        0.97,
        0.03,
        0.0
      ],
      "moderate": [
        0.88,
        0.1,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        4
      ],
      "moderate": [
        4,
        10
      ]
    },
    "source": {
      "Severity": "Small 65%; Medium 35% within this specific subtype.",
      "Cause": "Appropriate actual gastrointestinal disturbance.",
      "Discovery": "Stall/pasture behavior including discomfort signs.",
      "Exam": "Urgent veterinarian clinical assessment.",
      "Treatment": "Vet-managed medical treatment, monitoring and recheck.",
      "Game cost": "Emergency visit $300; medical management package $150–$550 as appropriate.",
      "Recovery": "Small 1–4 days; Medium 4–10 days, with follow-up as needed.",
      "Suggested outcomes": "Small full 97%, recurrent/managed concern 3%; Medium full 88%, residual/recurring issue 10%, serious complication 2%.",
      "Future recurrence": "8% Small / 18% Medium within one in-game year among eligible recovered horses, conditional on risk context."
    },
    "quotes": [
      "[HORSE] repeatedly looks toward its flank instead of settling normally.",
      "[HORSE] appears uncomfortable and paws during the stall observation.",
      "The horse lies down and gets back up more often than usual.",
      "The veterinarian is treating an episode of abdominal pain and monitoring the response.",
      "The signs of colic have resolved, but the horse will continue to be monitored."
    ]
  },
  "impaction": {
    "name": "Moderate Colic / Impaction Concern",
    "severityWeights": {
      "moderate": 100
    },
    "outcomes": {
      "moderate": [
        0.82,
        0.12,
        0.0,
        0.01
      ]
    },
    "recoveryDurationBySeverity": {
      "moderate": [
        3,
        14
      ]
    },
    "source": {
      "Severity": "Medium only for this defined episode class.",
      "Cause": "Appropriate actual gastrointestinal condition.",
      "Discovery": "Behavioral signs, appetite/manure changes, vet assessment.",
      "Exam": "Emergency veterinarian evaluation with diagnostics as indicated.",
      "Treatment": "Veterinarian-led medical management or referral if unresolved.",
      "Game cost": "$350–$1,200.",
      "Recovery": "3–14 days if responding to medical management; escalation may require urgent surgical assessment.",
      "Proposed outcomes": "Full recovery 82%; persistent/recurrent digestive concern 12%; surgical escalation 5%; fatal 1%.",
      "Note": "Surgical escalation is an intermediate branch, not a final health outcome. Once escalated, resolve through the surgical subtype and do not count it twice. The mutually exclusive final outcome must be normalized in code.",
      "Recurrence": "18% within one year after recovery, subject to relevant causes."
    },
    "quotes": [
      "[HORSE] appears increasingly uncomfortable and repeatedly changes position.",
      "The horse's appetite and manure pattern have changed noticeably.",
      "The veterinarian is concerned that the abdominal discomfort may not resolve quickly.",
      "The horse requires continued medical monitoring and possible referral.",
      "The episode has resolved after treatment, although future digestive management may be necessary."
    ]
  },
  "surgical-colic": {
    "name": "Severe Surgical Colic",
    "severityWeights": {
      "major": 100
    },
    "outcomes": {
      "major": [
        0.58,
        0.22,
        0.0,
        0.2
      ]
    },
    "recoveryDurationBySeverity": {
      "major": [
        60,
        150
      ]
    },
    "source": {
      "Severity": "Serious only.",
      "Cause": "A qualifying serious gastrointestinal problem that requires referral and may require surgery.",
      "Examples": "Appropriate severe displacement, obstruction or intestinal compromise as specifically modeled.",
      "Discovery": "Severe abdominal pain, worsening clinical findings, veterinary emergency.",
      "Exam": "Emergency veterinarian/surgical hospital assessment.",
      "Treatment": "Hospitalization, fluids, veterinary-directed medication and surgery where indicated.",
      "Game price": "Emergency vet $300; referral/diagnostics $900; surgery $4,000–$12,000; post-operative hospitalization $1,500–$4,000.",
      "Recovery if successful": "Hospital phase approximately 5–10 in-game days; longer restricted recovery 2–5 months depending on surgery and complications.",
      "- Survival with full functional recovery": "58%.",
      "- Survival with longer-term digestive/management effects": "22%.",
      "- Death/euthanasia despite treatment": "20%.",
      "Total": "100%.",
      "Proposed outcome if surgery is medically required but unavailable/refused": "Resolve through a distinct critical-care branch with much poorer prognosis; use the existing configured values if present. Do not make simply waiting a safe substitute.",
      "Recurrence after surviving": "15% within two in-game years, adjusted by actual lesion and complications."
    },
    "quotes": [
      "[HORSE] shows intense signs of abdominal pain and cannot settle comfortably.",
      "The veterinarian identifies a serious emergency and recommends immediate specialist assessment.",
      "The horse is transferred for urgent surgical evaluation.",
      "The surgical team is treating a life-threatening gastrointestinal condition.",
      "The horse survives the operation, but the recovery period remains critical.",
      "The horse is improving following intensive care and requires a carefully managed recovery.",
      "Despite emergency treatment, the horse's condition deteriorates.",
      "The veterinarian explains that the condition is no longer compatible with recovery."
    ]
  },
  "critical-colic": {
    "name": "Strangulating / Critical Colic",
    "severityWeights": {
      "major": 100
    },
    "outcomes": {
      "major": [
        0.35,
        0.25,
        0.0,
        0.4
      ]
    },
    "recoveryDurationBySeverity": {
      "major": [
        90,
        180
      ]
    },
    "source": {
      "Severity": "Serious / life-threatening only.",
      "Cause": "Actual intestinal strangulation or comparable vascular compromise.",
      "Discovery": "Severe clinical signs; vet emergency assessment.",
      "Treatment": "Immediate emergency surgical referral where appropriate.",
      "Game costs": "Advanced emergency/surgical package $7,000–$18,000.",
      "Recovery if successful": "3–6 months or longer, depending on complications.",
      "- Survival without major lasting limitation": "35%.",
      "- Survival with meaningful residual management": "25%.",
      "- Death/euthanasia despite intervention": "40%.",
      "Recurrence among survivors": "20% over two years, conditional on the particular lesion and surgery."
    },
    "quotes": [
      "[HORSE] is in severe abdominal distress and requires immediate veterinary assistance.",
      "The emergency examination raises concern about intestinal compromise.",
      "The veterinarian explains that delay could substantially worsen the prognosis.",
      "The horse is undergoing emergency treatment for a potentially fatal condition.",
      "The critical-care team reports that the horse remains unstable.",
      "The horse has survived the critical period, but recovery is far from complete.",
      "The horse's condition worsens despite intensive treatment.",
      "The veterinarian confirms that the horse has died despite emergency care."
    ]
  },
  "ulcers": {
    "name": "Gastric Ulcer Syndrome",
    "severityWeights": {
      "minor": 35,
      "moderate": 50,
      "major": 15
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.93,
        0.05,
        0.02
      ],
      "major": [
        0.82,
        0.12,
        0.06
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        21,
        28
      ],
      "moderate": [
        28,
        42
      ],
      "major": [
        42,
        56
      ]
    },
    "source": {
      "Severity": "Small 35%; Medium 50%; Serious 15%.",
      "Cause": "Actual gastric condition with appropriate risk factors.",
      "Discovery": "Variable appetite, performance and behavior signs.",
      "Exam": "Veterinarian assessment, gastroscopy where indicated.",
      "Treatment": "Veterinarian-prescribed omeprazole and relevant management; sucralfate where specifically indicated.",
      "Game recovery": "Small 3–5 weeks; Medium 4–8 weeks; Serious 6–12 weeks.",
      "Outcomes": "Small 90/8/2; Medium 80/15/5; Serious 65/25/10.",
      "Recurrence": "15% / 25% / 35% by severity within a year if original risk factors remain; lower if corrected."
    },
    "quotes": [
      "[HORSE] seems less interested in its usual feed.",
      "The horse behaves differently during preparation, but the cause is unclear.",
      "[HORSE] appears less comfortable during some ridden exercises.",
      "The veterinary assessment identifies a gastrointestinal condition requiring treatment.",
      "The horse's appetite and behavior are improving during the prescribed care plan."
    ]
  },
  "parasites": {
    "name": "Parasite-Related Illness",
    "severityWeights": {
      "minor": 60,
      "moderate": 35,
      "major": 5
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.94,
        0.05,
        0.01
      ],
      "major": [
        0.8,
        0.15,
        0.05
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        28
      ],
      "major": [
        28,
        42
      ]
    },
    "source": {
      "Severity": "Small 60%; Medium 35%; Serious 5%.",
      "Cause": "Relevant parasitic infection and inadequate control/exposure.",
      "Exam": "Vet assessment, appropriate parasite testing/planning.",
      "Treatment": "Vet-selected parasite-control medication, not automatic random deworming.",
      "Recovery": "Small 1–3 weeks; Medium 3–6 weeks; Serious 6–12 weeks.",
      "Outcomes": "Small 99/1/0; Medium 94/5/1; Serious 80/15/5.",
      "Recurrence": "Exposure-driven reinfection; 15% within a year if poor control persists, 3% with appropriate plan."
    },
    "quotes": [
      "[HORSE] seems less comfortable than usual despite an otherwise ordinary routine.",
      "The horse's condition or digestive pattern raises a concern.",
      "The veterinarian recommends a targeted parasite-control assessment.",
      "The horse is improving following the prescribed management plan.",
      "The active parasite-related condition has resolved, and the prevention schedule has been updated."
    ]
  },
  "digestive-illness": {
    "name": "Other Significant Digestive Illness",
    "severityWeights": {
      "moderate": 70,
      "major": 30
    },
    "outcomes": {
      "moderate": [
        0.85,
        0.12,
        0.03
      ],
      "major": [
        0.6,
        0.25,
        0.15
      ]
    },
    "recoveryDurationBySeverity": {
      "moderate": [
        14,
        42
      ],
      "major": [
        30,
        120
      ]
    },
    "source": {
      "Severity": "Medium 70%; Serious 30%.",
      "Cause": "Specific diagnosed gastrointestinal pathology, not a catch-all free diagnosis.",
      "Exam": "Vet clinical workup.",
      "Treatment": "Diagnosis-specific veterinary management.",
      "Recovery": "Medium 2–6 weeks; Serious 1–4 months or longer.",
      "Outcomes": "Medium 85/12/3; Serious 60/25/15, where terminal prognosis is clinically relevant.",
      "Recurrence": "10–25% depending on diagnosis, use specific subtype once known."
    },
    "quotes": [
      "[HORSE] shows a persistent change in appetite and comfort.",
      "The digestive symptoms continue beyond an ordinary brief upset.",
      "The veterinarian identifies a more significant condition requiring further investigation.",
      "The horse remains under an extended treatment and monitoring plan.",
      "The condition has improved, although follow-up is still required."
    ]
  },
  "dental": {
    "name": "Dental Sharp Points / Oral Discomfort",
    "severityWeights": {
      "minor": 60,
      "moderate": 35,
      "major": 5
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.95,
        0.04,
        0.01
      ],
      "major": [
        0.85,
        0.12,
        0.03
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        3
      ],
      "moderate": [
        3,
        7
      ],
      "major": [
        7,
        14
      ]
    },
    "source": {
      "Severity": "Small 60%; Medium 35%; Serious 5%.",
      "Discovery": "Feeding behavior, contact-related reaction; not every rein resistance means dental disease.",
      "Exam": "Veterinary dental exam.",
      "Treatment": "Professional veterinary dental care.",
      "Cost": "Dental exam $120; dental treatment package $100–$300.",
      "Recovery": "1–14 days after appropriate treatment, depending on condition.",
      "Outcomes": "Small 99/1/0; Medium 95/4/1; Serious 85/12/3.",
      "Recurrence": "Dental maintenance due according to individual follow-up, not random monthly disease rolls."
    },
    "quotes": [
      "[HORSE] appears uncomfortable while eating.",
      "The horse becomes unusually resistant to the contact.",
      "The veterinary dental examination identifies an issue requiring attention.",
      "The horse appears more comfortable after appropriate dental treatment.",
      "The dental concern has resolved, and the next review has been scheduled."
    ]
  },
  "eye": {
    "name": "Eye Irritation",
    "severityWeights": {
      "minor": 75,
      "moderate": 25
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.92,
        0.07,
        0.01
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        2,
        5
      ],
      "moderate": [
        5,
        10
      ]
    },
    "source": {
      "Severity": "Small 75%; Medium 25%.",
      "Discovery": "Stall/pasture close observation.",
      "Exam": "Prompt veterinary eye examination where relevant.",
      "Treatment": "Cause-specific vet-directed care; appropriate fly protection where helpful.",
      "Recovery": "2–10 days.",
      "Outcomes": "Small 98/2/0; Medium 92/7/1.",
      "Recurrence": "8% if irritant remains."
    },
    "quotes": [
      "[HORSE] is blinking more frequently than usual.",
      "One eye appears irritated during the stall observation.",
      "[HORSE] seems bothered by the bright light.",
      "The eye appears more comfortable during the prescribed care.",
      "The irritation has resolved, and the eye appears normal again."
    ]
  },
  "cornea": {
    "name": "Corneal Injury",
    "severityWeights": {
      "minor": 40,
      "moderate": 45,
      "major": 15
    },
    "outcomes": {
      "minor": [
        0.94,
        0.05,
        0.01
      ],
      "moderate": [
        0.8,
        0.15,
        0.05
      ],
      "major": [
        0.5,
        0.35,
        0.15
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        35
      ],
      "major": [
        35,
        84
      ]
    },
    "source": {
      "Severity": "Small 40%; Medium 45%; Serious 15%.",
      "Discovery": "Squinting, tearing, visible discomfort.",
      "Exam": "Urgent veterinary eye examination and appropriate diagnostics.",
      "Treatment": "Vet-directed treatment, medications assigned to condition; no DIY eye medication selection.",
      "Recovery": "Small 1–2 weeks; Medium 2–5 weeks; Serious 5–12 weeks or longer.",
      "Outcomes": "Small 94/5/1; Medium 80/15/5; Serious 50/35/15.",
      "Recurrence": "5% of linked complications; new trauma is separate."
    },
    "quotes": [
      "[HORSE] keeps one eye partially closed.",
      "The horse appears unusually sensitive to light.",
      "Tearing is visible around the affected eye.",
      "The veterinarian identifies an eye injury requiring careful treatment.",
      "The eye injury is improving, although complete recovery remains under assessment."
    ]
  },
  "ear": {
    "name": "Ear Irritation",
    "severityWeights": {
      "minor": 75,
      "moderate": 25
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.93,
        0.06,
        0.01
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        3,
        10
      ],
      "moderate": [
        10,
        28
      ]
    },
    "source": {
      "Severity": "Small 75%; Medium 25%.",
      "Discovery": "Headshaking, ear sensitivity.",
      "Exam": "Vet examination if persistent.",
      "Treatment": "Cause-specific professional assessment and care.",
      "Recovery": "Small 3–10 days; Medium 10–28 days.",
      "Outcomes": "Small 99/1/0; Medium 93/6/1.",
      "Recurrence": "12% if cause persists."
    },
    "quotes": [
      "[HORSE] shakes its head more often than usual.",
      "The horse reacts when one ear is approached.",
      "The irritation is not obvious enough to identify the cause.",
      "The horse becomes more comfortable as the underlying issue is treated.",
      "The ear concern has resolved."
    ]
  },
  "oral": {
    "name": "Other Oral Condition",
    "severityWeights": {
      "minor": 40,
      "moderate": 45,
      "major": 15
    },
    "outcomes": {
      "minor": [
        0.98,
        0.02,
        0.0
      ],
      "moderate": [
        0.9,
        0.08,
        0.02
      ],
      "major": [
        0.7,
        0.2,
        0.1
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        7,
        14
      ],
      "moderate": [
        14,
        28
      ],
      "major": [
        28,
        56
      ]
    },
    "source": {
      "Severity": "Small 40%; Medium 45%; Serious 15%.",
      "Cause": "Confirmed oral pathology; must be specific in actual diagnosis.",
      "Exam": "Veterinary oral examination.",
      "Treatment": "Condition-specific dental/veterinary care.",
      "Recovery": "1–8 weeks.",
      "Outcomes": "Small 98/2/0; Medium 90/8/2; Serious 70/20/10.",
      "Recurrence": "5–20% depending on subtype; use the subtype-specific value."
    },
    "quotes": [
      "[HORSE] shows an unusual reaction while eating.",
      "The horse appears uncomfortable around the mouth.",
      "The veterinary examination identifies an oral concern.",
      "The horse's eating behavior improves during treatment.",
      "The oral condition has resolved or entered a stable management phase."
    ]
  },
  "dehydration": {
    "name": "Mild Dehydration",
    "severityWeights": {
      "minor": 75,
      "moderate": 25
    },
    "outcomes": {
      "minor": [
        1.0,
        0.0,
        0.0
      ],
      "moderate": [
        0.99,
        0.0,
        0.01
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        2
      ],
      "moderate": [
        2,
        5
      ]
    },
    "source": {
      "Severity": "Small 75%; Medium 25%.",
      "Cause": "Relevant fluid intake/loss context.",
      "Discovery": "Changes in behavior, water intake and veterinary assessment.",
      "Treatment": "Restore appropriate hydration under veterinary advice; electrolyte products where indicated.",
      "Recovery": "Small 1–2 days; Medium 2–5 days.",
      "Outcomes": "Small 100% full; Medium 99% full, 1% requiring extended evaluation.",
      "Recurrence": "Exposure-driven, not a monthly hidden disease roll."
    },
    "quotes": [
      "[HORSE] seems quieter than usual following the recent conditions.",
      "The horse's drinking pattern raises a concern.",
      "The veterinarian identifies a hydration issue.",
      "[HORSE] is responding well to the prescribed supportive care.",
      "Hydration has returned to an appropriate state."
    ]
  },
  "heat": {
    "name": "Heat-Related Illness",
    "severityWeights": {
      "minor": 60,
      "moderate": 35,
      "major": 5
    },
    "outcomes": {
      "minor": [
        0.99,
        0.01,
        0.0
      ],
      "moderate": [
        0.92,
        0.07,
        0.01
      ],
      "major": [
        0.65,
        0.25,
        0.1
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        3
      ],
      "moderate": [
        3,
        14
      ],
      "major": [
        14,
        56
      ]
    },
    "source": {
      "Severity": "Small 60%; Medium 35%; Serious 5%.",
      "Cause": "Actual heat/exertion context.",
      "Discovery": "During or after activity.",
      "Exam": "Veterinary assessment for concerning signs.",
      "Treatment": "Stop exercise, professional evaluation and appropriate cooling/supportive management.",
      "Recovery": "Small 1–3 days; Medium 3–14 days; Serious 2–8 weeks.",
      "Outcomes": "Small 99/1/0; Medium 92/7/1; Serious 65/25/10.",
      "Recurrence": "10% related heat-exposure recurrence if the same unsuitable circumstances continue."
    },
    "quotes": [
      "[HORSE] appears unusually fatigued in the hot conditions.",
      "The horse is not settling as expected after the exercise.",
      "The heat-related signs require immediate attention.",
      "[HORSE] is becoming more comfortable during the veterinary care period.",
      "The horse has recovered from the episode, and future workload should consider environmental conditions."
    ]
  },
  "fatigue": {
    "name": "Overexertion / Excessive Fatigue",
    "severityWeights": {
      "minor": 85,
      "moderate": 15
    },
    "outcomes": {
      "minor": [
        1.0,
        0.0,
        0.0
      ],
      "moderate": [
        0.98,
        0.0,
        0.02
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        1,
        3
      ],
      "moderate": [
        3,
        10
      ]
    },
    "source": {
      "Severity": "Small 85%; Medium 15%.",
      "Cause": "Actual workload/fatigue, not a random disease event.",
      "Discovery": "During/after training.",
      "Treatment": "Stop demanding work; appropriate recovery and vet assessment if abnormal.",
      "Recovery": "Small 1–3 days; Medium 3–10 days.",
      "Outcomes": "Small 100% full; Medium 98% full, 2% further evaluation required.",
      "Recurrence": "Driven by repeating excessive workload; do not roll independently."
    },
    "quotes": [
      "[HORSE] begins losing coordination as fatigue increases.",
      "The horse struggles to maintain the quality of earlier work.",
      "[HORSE] appears unusually tired after the session.",
      "The horse is regaining normal energy after an appropriate recovery period.",
      "The excessive fatigue has resolved."
    ]
  },
  "fever": {
    "name": "Unexplained Fever",
    "severityWeights": {
      "moderate": 85,
      "major": 15
    },
    "outcomes": {
      "moderate": [
        0.0,
        0.0,
        1.0
      ],
      "major": [
        0.0,
        0.0,
        1.0
      ]
    },
    "recoveryDurationBySeverity": {
      "moderate": [
        3,
        14
      ],
      "major": [
        14,
        30
      ]
    },
    "source": {
      "Severity": "Medium 85%; Serious 15%.",
      "Cause": "An underlying condition requiring investigation, not a standalone permanent diagnosis.",
      "Discovery": "Vet examination, temperature observation and compatible signs.",
      "Treatment": "Diagnostic investigation and cause-specific care.",
      "Recovery": "Determined by the discovered underlying condition.",
      "Outcome": "Do not roll a second generic healing outcome; resolve according to underlying cause."
    },
    "quotes": [
      "[HORSE] appears more subdued than usual.",
      "The horse's condition raises concern about an underlying illness.",
      "The veterinarian identifies an elevated temperature.",
      "The cause of the fever has not yet been established.",
      "The veterinary investigation identifies the underlying issue requiring treatment."
    ]
  },
  "weight-loss": {
    "name": "Unexplained Weight Loss",
    "severityWeights": {
      "minor": 45,
      "moderate": 45,
      "major": 10
    },
    "outcomes": {
      "minor": [
        0.0,
        0.0,
        1.0
      ],
      "moderate": [
        0.0,
        0.0,
        1.0
      ],
      "major": [
        0.0,
        0.0,
        1.0
      ]
    },
    "recoveryDurationBySeverity": {
      "minor": [
        30,
        60
      ],
      "moderate": [
        60,
        120
      ],
      "major": [
        120,
        180
      ]
    },
    "source": {
      "Severity": "Small 45%; Medium 45%; Serious 10%.",
      "Cause": "Nutrition, dental, digestive, chronic illness or other appropriate underlying cause.",
      "Discovery": "Visible body-condition trend and feeding records.",
      "Exam": "Veterinary assessment and appropriate diagnostics.",
      "Treatment": "Correct actual cause.",
      "Recovery": "1–6 months depending on cause.",
      "Outcome": "Determined by underlying diagnosis and nutritional recovery, not an independent automatic cure."
    },
    "quotes": [
      "[HORSE] appears to have lost condition since the previous assessment.",
      "The horse's body condition has changed despite the usual routine.",
      "The veterinarian recommends investigating the weight loss.",
      "The horse is gradually returning toward its appropriate condition.",
      "The weight concern has stabilized, although the underlying cause remains part of the record."
    ]
  }
};
 root.MedicalCatalogDefaults=entries;
 if(typeof module!=="undefined")module.exports=entries;
})(globalThis);
