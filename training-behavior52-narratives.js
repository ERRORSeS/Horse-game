/* Exact 5.2 incident and post-assessment text; all eligibility comes from recorded events. */
const TB52_NARRATIVES=[
  {
    "id": "TB52-01",
    "text": "[HORSE] stops abruptly before the fence, and the rider loses balance during the sudden change.",
    "requiredConditions": [
      "refusal",
      "destabilized"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-02",
    "text": "The refusal catches the rider unprepared, and they fall from the saddle.",
    "requiredConditions": [
      "refusal",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-03",
    "text": "[HORSE] comes to a stop, but the rider manages to remain mounted.",
    "requiredConditions": [
      "refusal",
      "balancePassed"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-04",
    "text": "The rider falls during the refusal. The attempt ends immediately.",
    "requiredConditions": [
      "refusal",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-05",
    "text": "[HORSE] moves away from the intended line, leaving the rider struggling to maintain balance.",
    "requiredConditions": [
      "runout",
      "destabilized"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-06",
    "text": "The abrupt change of direction results in the rider falling.",
    "requiredConditions": [
      "runout",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-07",
    "text": "The rider remains mounted, although the jump attempt is unsuccessful.",
    "requiredConditions": [
      "runout",
      "balancePassed"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-08",
    "text": "The horse's sudden run-out leaves the rider unbalanced, and the session is interrupted.",
    "requiredConditions": [
      "runout",
      "interrupted"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-09",
    "text": "[HORSE] shies suddenly, and the rider loses their position.",
    "requiredConditions": [
      "spook",
      "destabilized"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-10",
    "text": "The unexpected spook results in a rider fall.",
    "requiredConditions": [
      "spook",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-11",
    "text": "The rider recovers their balance despite the sudden movement.",
    "requiredConditions": [
      "spook",
      "balancePassed"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-12",
    "text": "[HORSE] remains alert after the spook, while the rider's fall brings the exercise to an end.",
    "requiredConditions": [
      "spook",
      "riderFall",
      "continuedAlertness"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-13",
    "text": "[HORSE] accelerates unexpectedly, leaving the rider struggling to remain balanced.",
    "requiredConditions": [
      "bolt",
      "destabilized"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-14",
    "text": "The rider falls during the sudden loss of control.",
    "requiredConditions": [
      "bolt",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-15",
    "text": "The rider manages to remain mounted as the horse begins settling.",
    "requiredConditions": [
      "bolt",
      "balancePassed",
      "settled"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-16",
    "text": "The bolt interrupts the exercise, and the rider's fall is recorded as part of the incident.",
    "requiredConditions": [
      "bolt",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-17",
    "text": "[HORSE] bucks during the exercise, disrupting the rider's seat.",
    "requiredConditions": [
      "buck",
      "destabilized"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-18",
    "text": "The rider loses balance during the buck and falls.",
    "requiredConditions": [
      "buck",
      "riderFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-19",
    "text": "The rider remains mounted but struggles to regain a stable position.",
    "requiredConditions": [
      "buck",
      "balancePassed",
      "unstable"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-20",
    "text": "The bucking incident results in an interrupted training session.",
    "requiredConditions": [
      "buck",
      "interrupted"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-21",
    "text": "[HORSE] loses footing during the exercise, causing a sudden loss of balance.",
    "requiredConditions": [
      "slip"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-22",
    "text": "The horse falls after losing its footing. The session ends pending assessment.",
    "requiredConditions": [
      "slip",
      "horseFall",
      "sessionEnded"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-23",
    "text": "A serious jumping incident results in a horse-and-rider fall.",
    "requiredConditions": [
      "jumpHorseFall"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-24",
    "text": "A rotational fall occurs during the jumping incident. The session ends immediately, and both horse and rider require urgent assessment.",
    "requiredConditions": [
      "rotational",
      "sessionEnded",
      "urgentAssessment"
    ],
    "allowedEventTypes": [
      "incident"
    ]
  },
  {
    "id": "TB52-25",
    "text": "The rider appears able to respond normally after the fall.",
    "requiredConditions": [
      "riderResponsiveObserved"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-26",
    "text": "The rider requires further assessment before returning to riding.",
    "requiredConditions": [
      "riderAssessmentPending"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-27",
    "text": "The horse is being checked following the incident.",
    "requiredConditions": [
      "horseAssessmentInProgress"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-28",
    "text": "The veterinary examination has not yet been completed.",
    "requiredConditions": [
      "veterinaryPending"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-29",
    "text": "A medical concern has been identified during the examination.",
    "requiredConditions": [
      "medicalFinding"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-30",
    "text": "The assessment has been completed without identifying a significant injury.",
    "requiredConditions": [
      "assessmentCompleteNoSignificantFinding"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-31",
    "text": "The horse is not yet cleared to return to training.",
    "requiredConditions": [
      "restricted"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  },
  {
    "id": "TB52-32",
    "text": "The previous incident remains recorded in the horse's history.",
    "requiredConditions": [
      "incidentRecorded"
    ],
    "allowedEventTypes": [
      "assessment"
    ]
  }
];
