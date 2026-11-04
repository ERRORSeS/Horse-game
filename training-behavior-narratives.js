/* Exact supplied quotes. Conditions are checked after real events; quotes never mutate state. */
const TB5_NARRATIVES=[
  {
    "id": "TB5-21-01",
    "text": "The beginner rider struggles to maintain a consistent approach.",
    "requiredConditions": [
      "approachError"
    ],
    "trigger": "Resolved approach error. Effect: Apply actual timing-error result.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-02",
    "text": "The rider becomes unbalanced as [HORSE] changes rhythm.",
    "requiredConditions": [
      "balanceError"
    ],
    "trigger": "Balance error. Effect: Temporary stability disruption.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-03",
    "text": "The rider's inconsistent hands interrupt the horse's contact.",
    "requiredConditions": [
      "contactError"
    ],
    "trigger": "Hand Stability error. Effect: Contact-error calculation.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-04",
    "text": "[HORSE] completes the jump despite a minor rider mistake.",
    "requiredConditions": [
      "minorError",
      "cleanJump"
    ],
    "trigger": "Minor rider error + actual successful jump. Effect: Clean-jump reward remains eligible.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-05",
    "text": "The rider has difficulty maintaining the intended distance.",
    "requiredConditions": [
      "distanceError"
    ],
    "trigger": "Actual distance error. Effect: Existing approach outcome.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-06",
    "text": "The horse appears uncertain after conflicting rider requests.",
    "requiredConditions": [
      "aidConflict"
    ],
    "trigger": "Resolved aid conflict. Effect: Rider Trust adjustment if warranted.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-07",
    "text": "The beginner rider completes the exercise successfully.",
    "requiredConditions": [
      "success"
    ],
    "trigger": "Genuine successful completion. Effect: Appropriate positive outcome.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-08",
    "text": "The rider loses balance during the sudden stop.",
    "requiredConditions": [
      "refusal",
      "balanceError"
    ],
    "trigger": "Actual refusal + balance disruption. Effect: Conditional fall calculation.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-09",
    "text": "The rider's lower leg becomes inconsistent during the transition.",
    "requiredConditions": [
      "legError"
    ],
    "trigger": "Leg Stability error. Effect: Relevant aid-conflict calculation.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-10",
    "text": "The horse maintains its rhythm despite the rider's unstable position.",
    "requiredConditions": [
      "minorBalanceError",
      "success"
    ],
    "trigger": "Minor balance error + horse successfully compensates. Effect: No automatic learned decline.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-11",
    "text": "The rider continues the same exercise after the refusal.",
    "requiredConditions": [
      "repeat",
      "afterRefusal"
    ],
    "trigger": "Player selected an existing repeat action after refusal. Effect: Resolve new attempt.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-12",
    "text": "The rider chooses a less demanding exercise.",
    "requiredConditions": [
      "simplify"
    ],
    "trigger": "Player selected existing reduction/simplification action. Effect: Apply actual exercise change.",
    "allowedRiderLevels": [
      "Beginner"
    ],
    "allowedEventTypes": [
      "action"
    ]
  },
  {
    "id": "TB5-21-13",
    "text": "The rider takes a walk break after the difficult attempt.",
    "requiredConditions": [
      "break"
    ],
    "trigger": "Player selected existing walk-break action. Effect: Roll actual recovery outcome.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-14",
    "text": "The rider's experience level makes the current height especially demanding.",
    "requiredConditions": [
      "overHeight"
    ],
    "trigger": "Height above rider experience. Effect: Existing height-gap modifier.",
    "allowedRiderLevels": [
      "Beginner"
    ]
  },
  {
    "id": "TB5-21-15",
    "text": "Despite limited experience, the rider and horse finish the session with a successful exercise.",
    "requiredConditions": [
      "sessionComplete",
      "lastSuccess"
    ],
    "trigger": "Beginner + actual last successful objective. Effect: Positive learning only if earned.",
    "allowedRiderLevels": [
      "Beginner"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-22-01",
    "text": "The novice rider makes a late correction before the fence.",
    "requiredConditions": [
      "timingError"
    ],
    "trigger": "Timing error. Effect: Approach disruption.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-02",
    "text": "The rider struggles to keep the horse's rhythm consistent.",
    "requiredConditions": [
      "rhythmError"
    ],
    "trigger": "Rhythm error. Effect: Existing performance result.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-03",
    "text": "[HORSE] compensates for a small mistake and clears the fence.",
    "requiredConditions": [
      "minorError",
      "cleanJump"
    ],
    "trigger": "Minor error + clean jump. Effect: Successful jump gain.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-04",
    "text": "The novice rider becomes unbalanced after the refusal.",
    "requiredConditions": [
      "refusal",
      "balanceError"
    ],
    "trigger": "Refusal + instability. Effect: Fall check.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-05",
    "text": "The rider's contact becomes inconsistent during the transition.",
    "requiredConditions": [
      "contactError"
    ],
    "trigger": "Contact error. Effect: Contact-error table.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-06",
    "text": "The horse responds well to a successful, clearly timed request.",
    "requiredConditions": [
      "clearCommunication"
    ],
    "trigger": "Verified clear communication. Effect: Appropriate Rider Trust gain.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-07",
    "text": "The novice rider misjudges the approach.",
    "requiredConditions": [
      "approachError"
    ],
    "trigger": "Actual approach mistake. Effect: Timing result.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-08",
    "text": "The rider completes the exercise at a familiar level.",
    "requiredConditions": [
      "success",
      "withinExperience"
    ],
    "trigger": "Valid completion within rider experience. Effect: Positive result.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-09",
    "text": "The horse hesitates despite the rider's otherwise consistent approach.",
    "requiredConditions": [
      "hesitation",
      "noRiderError"
    ],
    "trigger": "Refusal/hesitation without rider error. Effect: Do not invent rider error.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-10",
    "text": "The rider continues after the previous unsuccessful attempt.",
    "requiredConditions": [
      "repeat"
    ],
    "trigger": "Actual repeat/continue selection. Effect: New attempt if valid.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-11",
    "text": "The rider adjusts the exercise difficulty.",
    "requiredConditions": [
      "configurationSelected"
    ],
    "trigger": "Actual player selection. Effect: Preserve existing action.",
    "allowedRiderLevels": [
      "Novice"
    ],
    "allowedEventTypes": [
      "action"
    ]
  },
  {
    "id": "TB5-22-12",
    "text": "The rider's position improves during the next attempt.",
    "requiredConditions": [
      "stabilityImproved"
    ],
    "trigger": "Verified positive stability outcome. Effect: Temporary improvement.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-13",
    "text": "The horse becomes increasingly uncertain after several genuine rider errors.",
    "requiredConditions": [
      "repeatedErrors",
      "decline"
    ],
    "trigger": "Multiple recorded errors. Effect: Contextual learned decline when eligible.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-14",
    "text": "The novice rider completes a clean jump.",
    "requiredConditions": [
      "cleanJump"
    ],
    "trigger": "Actual clean attempt. Effect: +2 to +4 Jump Confidence.",
    "allowedRiderLevels": [
      "Novice"
    ]
  },
  {
    "id": "TB5-22-15",
    "text": "The session ends with mixed results.",
    "requiredConditions": [
      "sessionComplete",
      "mixed"
    ],
    "trigger": "Both successful and unsuccessful completed events. Effect: Show accurate summary.",
    "allowedRiderLevels": [
      "Novice"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-23-01",
    "text": "The intermediate rider maintains a steady approach through the first part of the exercise.",
    "requiredConditions": [
      "successfulApproach"
    ],
    "trigger": "Successful approach.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-02",
    "text": "The rider makes a small timing error.",
    "requiredConditions": [
      "timingError"
    ],
    "trigger": "Actual timing error.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-03",
    "text": "[HORSE] responds consistently during the familiar exercise.",
    "requiredConditions": [
      "success",
      "familiar"
    ],
    "trigger": "Successful familiar task.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-04",
    "text": "The rider struggles with the more technical part of the movement.",
    "requiredConditions": [
      "technicalError"
    ],
    "trigger": "Technical error.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-05",
    "text": "The horse completes the jump despite an imperfect approach.",
    "requiredConditions": [
      "minorError",
      "cleanJump"
    ],
    "trigger": "Minor error + clean jump.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-06",
    "text": "The rider's balance remains stable during the horse's reaction.",
    "requiredConditions": [
      "balancePassed"
    ],
    "trigger": "Successful balance check.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-07",
    "text": "The horse remains reluctant despite a reasonable approach.",
    "requiredConditions": [
      "refusal",
      "noRiderError"
    ],
    "trigger": "Refusal without significant rider error.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-08",
    "text": "The rider chooses to repeat the exercise.",
    "requiredConditions": [
      "repeat"
    ],
    "trigger": "Actual repeat selection.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-09",
    "text": "The rider changes the exercise configuration.",
    "requiredConditions": [
      "configure"
    ],
    "trigger": "Actual configuration selection.",
    "allowedRiderLevels": [
      "Intermediate"
    ],
    "allowedEventTypes": [
      "action"
    ]
  },
  {
    "id": "TB5-23-10",
    "text": "The horse begins responding more confidently after a completed positive exercise.",
    "requiredConditions": [
      "confidenceGain"
    ],
    "trigger": "Verified confidence gain.",
    "allowedRiderLevels": [
      "Intermediate"
    ],
    "requiredStatDirection": {
      "stat": "Jump Confidence",
      "direction": "increase"
    }
  },
  {
    "id": "TB5-23-11",
    "text": "The rider's contact becomes inconsistent during the collected movement.",
    "requiredConditions": [
      "contactError",
      "collection"
    ],
    "trigger": "Actual contact error.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-12",
    "text": "The horse maintains an even rhythm through the exercise.",
    "requiredConditions": [
      "successfulRhythm"
    ],
    "trigger": "Successful rhythm outcome.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-13",
    "text": "The intermediate rider makes a significant mistake during the difficult approach.",
    "requiredConditions": [
      "significantError"
    ],
    "trigger": "Actual significant error.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-14",
    "text": "The rider and horse complete another successful attempt.",
    "requiredConditions": [
      "secondSuccess"
    ],
    "trigger": "Real second successful attempt.",
    "allowedRiderLevels": [
      "Intermediate"
    ]
  },
  {
    "id": "TB5-23-15",
    "text": "The session summary records both the successful work and the remaining difficulties.",
    "requiredConditions": [
      "sessionComplete",
      "mixed"
    ],
    "trigger": "Mixed real outcomes.",
    "allowedRiderLevels": [
      "Intermediate"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-24-01",
    "text": "The advanced rider maintains a consistent approach.",
    "requiredConditions": [
      "successfulApproach"
    ],
    "trigger": "Verified successful approach.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-02",
    "text": "The horse remains hesitant despite the rider's experience.",
    "requiredConditions": [
      "hesitation"
    ],
    "trigger": "Actual hesitation.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-03",
    "text": "The rider makes an unusual timing error.",
    "requiredConditions": [
      "timingError"
    ],
    "trigger": "Actual timing error.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-04",
    "text": "[HORSE] responds positively to the rider's consistent communication.",
    "requiredConditions": [
      "clearCommunication"
    ],
    "trigger": "Clear communication event.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-05",
    "text": "The advanced rider completes the exercise successfully.",
    "requiredConditions": [
      "success"
    ],
    "trigger": "Actual success.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-06",
    "text": "The horse's existing avoidance remains evident.",
    "requiredConditions": [
      "highAvoidance",
      "hesitation"
    ],
    "trigger": "High Fence Avoidance + observed hesitation.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-07",
    "text": "The rider selects a less demanding exercise.",
    "requiredConditions": [
      "simplify"
    ],
    "trigger": "Actual selected action.",
    "allowedRiderLevels": [
      "Advanced"
    ],
    "allowedEventTypes": [
      "action"
    ]
  },
  {
    "id": "TB5-24-08",
    "text": "The rider chooses to continue at the current difficulty.",
    "requiredConditions": [
      "repeat"
    ],
    "trigger": "Actual selected action.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-09",
    "text": "The horse becomes more settled during the completed exercise.",
    "requiredConditions": [
      "tensionDecrease"
    ],
    "trigger": "Actual temporary Tension reduction.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-10",
    "text": "The rider remains balanced during the unexpected stop.",
    "requiredConditions": [
      "refusal",
      "balancePassed"
    ],
    "trigger": "Refusal + successful balance check.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-11",
    "text": "The rider loses balance despite considerable experience.",
    "requiredConditions": [
      "balanceFailed"
    ],
    "trigger": "Actual failed balance check.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-12",
    "text": "[HORSE] completes a clean jumping effort.",
    "requiredConditions": [
      "cleanJump"
    ],
    "trigger": "Actual successful jump.",
    "allowedRiderLevels": [
      "Advanced"
    ]
  },
  {
    "id": "TB5-24-13",
    "text": "The horse's confidence improves following the successful attempt.",
    "requiredConditions": [
      "confidenceGain"
    ],
    "trigger": "Jump Confidence genuinely increases.",
    "allowedRiderLevels": [
      "Advanced"
    ],
    "requiredStatDirection": {
      "stat": "Jump Confidence",
      "direction": "increase"
    }
  },
  {
    "id": "TB5-24-14",
    "text": "The rider's consistent communication contributes to a positive session.",
    "requiredConditions": [
      "clearCommunication",
      "sessionComplete"
    ],
    "trigger": "Verified aid-consistency success.",
    "allowedRiderLevels": [
      "Advanced"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-24-15",
    "text": "The session produces a small reduction in established avoidance.",
    "requiredConditions": [
      "avoidanceDecrease"
    ],
    "trigger": "Actual Fence Avoidance decrease.",
    "allowedRiderLevels": [
      "Advanced"
    ],
    "requiredStatDirection": {
      "stat": "Learned Fence Avoidance",
      "direction": "decrease"
    }
  },
  {
    "id": "TB5-25-01",
    "text": "The professional rider maintains a consistent rhythm.",
    "requiredConditions": [
      "successfulRhythm"
    ],
    "trigger": "Actual successful rhythm outcome.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-02",
    "text": "[HORSE] remains reluctant despite the professional rider's technical ability.",
    "requiredConditions": [
      "hesitation"
    ],
    "trigger": "Actual hesitation/refusal.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-03",
    "text": "The rider completes the approach with consistent timing.",
    "requiredConditions": [
      "successfulTiming"
    ],
    "trigger": "Successful timing outcome.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-04",
    "text": "The horse responds more predictably to the rider's cues.",
    "requiredConditions": [
      "clearCommunication"
    ],
    "trigger": "Verified clear communication.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-05",
    "text": "The professional rider makes an unexpected distance error.",
    "requiredConditions": [
      "distanceError"
    ],
    "trigger": "Actual distance error.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-06",
    "text": "The rider remains balanced through the sudden change of movement.",
    "requiredConditions": [
      "balancePassed"
    ],
    "trigger": "Successful balance check.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-07",
    "text": "The rider loses balance during the horse's unexpected reaction.",
    "requiredConditions": [
      "balanceFailed"
    ],
    "trigger": "Failed balance check.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-08",
    "text": "The horse completes a clean jump.",
    "requiredConditions": [
      "cleanJump"
    ],
    "trigger": "Actual success.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-09",
    "text": "[HORSE] continues showing avoidance despite recent improvements.",
    "requiredConditions": [
      "highAvoidance",
      "priorProgress"
    ],
    "trigger": "Existing avoidance + verified progress.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-10",
    "text": "The rider chooses to reduce the difficulty.",
    "requiredConditions": [
      "simplify"
    ],
    "trigger": "Actual player selection.",
    "allowedRiderLevels": [
      "Professional"
    ],
    "allowedEventTypes": [
      "action"
    ]
  },
  {
    "id": "TB5-25-11",
    "text": "The rider selects another attempt at the current exercise.",
    "requiredConditions": [
      "repeat"
    ],
    "trigger": "Actual player selection.",
    "allowedRiderLevels": [
      "Professional"
    ]
  },
  {
    "id": "TB5-25-12",
    "text": "The horse's Rider Trust in Aids improves after the completed session.",
    "requiredConditions": [
      "sessionComplete",
      "trustSessionGain"
    ],
    "trigger": "Actual +3 qualifying session gain.",
    "allowedRiderLevels": [
      "Professional"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-25-13",
    "text": "The session produces a small, measurable reduction in learned avoidance.",
    "requiredConditions": [
      "avoidanceDecrease"
    ],
    "trigger": "Actual -0.5 or other legitimate decrease.",
    "allowedRiderLevels": [
      "Professional"
    ],
    "requiredStatDirection": {
      "stat": "Learned Fence Avoidance",
      "direction": "decrease"
    }
  },
  {
    "id": "TB5-25-14",
    "text": "The professional rider's work produces no measurable behavioral improvement today.",
    "requiredConditions": [
      "sessionComplete",
      "noProgress"
    ],
    "trigger": "No relevant positive stat change.",
    "allowedRiderLevels": [
      "Professional"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-25-15",
    "text": "The horse shows measurable progress across recent professional training sessions.",
    "requiredConditions": [
      "sessionComplete",
      "multipleProfessionalSessions"
    ],
    "trigger": "Multiple real completed positive sessions.",
    "allowedRiderLevels": [
      "Professional"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-26-01",
    "text": "The trainer observes the refusal and suggests reassessing the exercise.",
    "requiredConditions": [
      "refusal"
    ],
    "trigger": "Refusal + Patient/Fair trainer present.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-02",
    "text": "The trainer notes that the horse appears uncertain.",
    "requiredConditions": [
      "hesitation"
    ],
    "trigger": "Observed uncertainty.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-03",
    "text": "The trainer acknowledges the successful attempt.",
    "requiredConditions": [
      "cleanJump"
    ],
    "trigger": "Clean jump.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-04",
    "text": "The trainer points out the rider's timing error.",
    "requiredConditions": [
      "timingError"
    ],
    "trigger": "Actual timing error.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-05",
    "text": "The trainer recommends reviewing the exercise difficulty.",
    "requiredConditions": [
      "overHeight"
    ],
    "trigger": "Relevant difficulty concern.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-06",
    "text": "The trainer observes an improvement in the horse's rhythm.",
    "requiredConditions": [
      "rhythmImproved"
    ],
    "trigger": "Actual rhythm improvement.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-07",
    "text": "The trainer explains that the previous problem remains unresolved.",
    "requiredConditions": [
      "unresolved"
    ],
    "trigger": "Existing unresolved issue.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-08",
    "text": "The trainer praises the horse's consistent response.",
    "requiredConditions": [
      "success",
      "clearCommunication"
    ],
    "trigger": "Successful consistent response.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-09",
    "text": "The trainer suggests ending the jumping work for today.",
    "requiredConditions": [
      "concern"
    ],
    "trigger": "Relevant concern. Suggestion only.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-10",
    "text": "The trainer acknowledges the horse's progress over recent sessions.",
    "requiredConditions": [
      "multipleSessions"
    ],
    "trigger": "Verified multi-session progress.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-11",
    "text": "The trainer identifies inconsistent contact as a contributing factor.",
    "requiredConditions": [
      "contactError"
    ],
    "trigger": "Actual contact error.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-12",
    "text": "The trainer observes that the horse is more relaxed than earlier.",
    "requiredConditions": [
      "tensionDecrease"
    ],
    "trigger": "Actual Tension reduction.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-13",
    "text": "The trainer notes that the horse remains reluctant to jump.",
    "requiredConditions": [
      "hesitation"
    ],
    "trigger": "Actual refusal/hesitation.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-14",
    "text": "The trainer recommends evaluating a possible physical cause.",
    "requiredConditions": [
      "medicalConcern"
    ],
    "trigger": "Actual medical concern.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ]
  },
  {
    "id": "TB5-26-15",
    "text": "The trainer records the session's outcomes without assuming improvement.",
    "requiredConditions": [
      "sessionComplete"
    ],
    "trigger": "Session review.",
    "allowedTrainerTypes": [
      "Patient",
      "Fair"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-27-01",
    "text": "The trainer expects a more consistent approach.",
    "requiredConditions": [
      "approachError"
    ],
    "trigger": "Actual inconsistent approach.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-02",
    "text": "The trainer expresses frustration with the rider's repeated errors.",
    "requiredConditions": [
      "repeatedErrors"
    ],
    "trigger": "Multiple actual errors.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-03",
    "text": "The trainer believes the horse should be capable of more demanding work.",
    "requiredConditions": [
      "underChallenged"
    ],
    "trigger": "Technical ability exceeds current work.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-04",
    "text": "The trainer proposes increasing the difficulty.",
    "requiredConditions": [
      "storylineProposal"
    ],
    "trigger": "Trainer present + appropriate storyline. Proposal only.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-05",
    "text": "The trainer is dissatisfied with the rider's preparation.",
    "requiredConditions": [
      "preparationIssue"
    ],
    "trigger": "Actual preparation issue.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-06",
    "text": "The trainer acknowledges the successful jump but expects greater consistency.",
    "requiredConditions": [
      "cleanJump",
      "priorError"
    ],
    "trigger": "Successful jump + earlier inconsistency.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-07",
    "text": "The trainer points out the repeated loss of rhythm.",
    "requiredConditions": [
      "rhythmError"
    ],
    "trigger": "Actual rhythm problems.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-08",
    "text": "The trainer challenges the rider to improve timing.",
    "requiredConditions": [
      "timingError"
    ],
    "trigger": "Actual timing concern.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-09",
    "text": "The trainer notices that the horse remains hesitant.",
    "requiredConditions": [
      "hesitation"
    ],
    "trigger": "Actual hesitation.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-10",
    "text": "The trainer proposes another attempt.",
    "requiredConditions": [
      "failed"
    ],
    "trigger": "Unsuccessful attempt. Proposal only.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-11",
    "text": "The trainer expresses concern about slow progress.",
    "requiredConditions": [
      "stagnation"
    ],
    "trigger": "Genuine repeated stagnation.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-12",
    "text": "The trainer believes the rider should be working more consistently.",
    "requiredConditions": [
      "riderError"
    ],
    "trigger": "Relevant rider inconsistency.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-13",
    "text": "The trainer discusses the horse's longer-term competition potential.",
    "requiredConditions": [
      "potentialContext"
    ],
    "trigger": "Actual potential context.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-14",
    "text": "The trainer is pleased with a particularly successful attempt.",
    "requiredConditions": [
      "success"
    ],
    "trigger": "Actual positive result.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ]
  },
  {
    "id": "TB5-27-15",
    "text": "The trainer reviews the session's measurable results.",
    "requiredConditions": [
      "sessionComplete"
    ],
    "trigger": "Session completion.",
    "allowedTrainerTypes": [
      "Strict",
      "Ambitious"
    ],
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-28-01",
    "text": "The trainer dismisses [HORSE]'s repeated refusal as defiance.",
    "requiredConditions": [
      "repeatedRefusals",
      "trainerInappropriateComment"
    ],
    "trigger": "Negligent/Abusive + actual repeated refusals.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-02",
    "text": "The trainer blames the horse for the unsuccessful exercise.",
    "requiredConditions": [
      "failed",
      "trainerBlame"
    ],
    "trigger": "Negligent/Abusive + unsuccessful event.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-03",
    "text": "The trainer demands another attempt despite the horse's obvious distress.",
    "requiredConditions": [
      "abusiveTrainer",
      "distress",
      "trainerPressure"
    ],
    "trigger": "Abusive + actual distress. Do not make player comply automatically.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-04",
    "text": "The trainer ignores the rider's concern about the horse's behavior.",
    "requiredConditions": [
      "concernRaised",
      "trainerDismissal"
    ],
    "trigger": "Concern actually raised.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-05",
    "text": "The trainer refuses to reconsider the planned difficulty.",
    "requiredConditions": [
      "difficultyDiscussion",
      "trainerRefusedReview"
    ],
    "trigger": "Actual discussion/decision context.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-06",
    "text": "The trainer makes an inappropriate comment about the horse's reluctance.",
    "requiredConditions": [
      "abusiveTrainer",
      "refusal",
      "trainerInappropriateComment"
    ],
    "trigger": "Relevant refusal + abusive trainer.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-07",
    "text": "The trainer's conduct raises a welfare concern.",
    "requiredConditions": [
      "misconduct",
      "trainerMisconduct"
    ],
    "trigger": "Actual misconduct.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-08",
    "text": "The trainer insists that the horse should perform at its previous level.",
    "requiredConditions": [
      "higherPastPerformance"
    ],
    "trigger": "Recorded higher historical performance.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-09",
    "text": "The trainer overlooks the worsening pattern of refusals.",
    "requiredConditions": [
      "historicalDecline"
    ],
    "trigger": "Actual historical decline.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-10",
    "text": "The trainer dismisses the possibility that physical discomfort is contributing.",
    "requiredConditions": [
      "medicalConcern",
      "trainerIgnoredMedical"
    ],
    "trigger": "Existing genuine concern.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-11",
    "text": "The trainer pressures the rider to continue.",
    "requiredConditions": [
      "storylineProposal",
      "trainerPressure"
    ],
    "trigger": "Relevant storyline. Player decision remains open.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-12",
    "text": "The rider receives conflicting advice from the trainer.",
    "requiredConditions": [
      "conflictingAdvice"
    ],
    "trigger": "Actual conflicting advice event.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-13",
    "text": "The trainer shows little concern for the horse's changing behavior.",
    "requiredConditions": [
      "decline"
    ],
    "trigger": "Negligent/Abusive + observed deterioration.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-14",
    "text": "The trainer's earlier actions remain documented in the horse's history.",
    "requiredConditions": [
      "historicalMisconduct"
    ],
    "trigger": "Historical recorded misconduct.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-28-15",
    "text": "The trainer's behavior has contributed to ongoing concerns about the horse's training.",
    "requiredConditions": [
      "multipleMisconduct"
    ],
    "trigger": "Multiple genuine recorded incidents.",
    "allowedTrainerTypes": [
      "Negligent",
      "Abusive"
    ]
  },
  {
    "id": "TB5-29-01",
    "text": "No measurable behavioral improvement has occurred during this session.",
    "requiredConditions": [
      "noProgress"
    ],
    "trigger": "Actual relevant stat delta = 0."
  },
  {
    "id": "TB5-29-02",
    "text": "[HORSE]'s Jump Confidence remains at [VALUE]/100.",
    "requiredConditions": [
      "currentConfidence"
    ],
    "trigger": "Actual current Jump Confidence."
  },
  {
    "id": "TB5-29-03",
    "text": "The earlier refusal has not yet been followed by a successful jumping attempt.",
    "requiredConditions": [
      "afterRefusal",
      "noSuccessAfterSetback"
    ],
    "trigger": "Actual history."
  },
  {
    "id": "TB5-29-04",
    "text": "The horse appears calmer, but its learned avoidance remains unchanged.",
    "requiredConditions": [
      "tensionDecrease",
      "avoidanceUnchanged"
    ],
    "trigger": "Tension decreased + Fence Avoidance unchanged."
  },
  {
    "id": "TB5-29-05",
    "text": "The break reduces tension without resolving the underlying jumping difficulty.",
    "requiredConditions": [
      "break",
      "tensionDecrease",
      "avoidanceUnchanged"
    ],
    "trigger": "Actual break + reduced tension + no avoidance improvement."
  },
  {
    "id": "TB5-29-06",
    "text": "The horse remains hesitant after the reassessment.",
    "requiredConditions": [
      "noReassessmentImprovement"
    ],
    "trigger": "Actual reassessment + no improvement."
  },
  {
    "id": "TB5-29-07",
    "text": "[HORSE] becomes slightly more settled during the pause.",
    "requiredConditions": [
      "reassessmentImproved"
    ],
    "trigger": "Actual positive reassessment."
  },
  {
    "id": "TB5-29-08",
    "text": "The horse's Learned Fence Avoidance decreases from [OLD] to [NEW].",
    "requiredConditions": [
      "avoidanceDecrease"
    ],
    "trigger": "Actual recorded decrease.",
    "requiredStatDirection": {
      "stat": "Learned Fence Avoidance",
      "direction": "decrease"
    }
  },
  {
    "id": "TB5-29-09",
    "text": "The successful jump increases Jump Confidence from [OLD] to [NEW].",
    "requiredConditions": [
      "cleanJump",
      "confidenceGain"
    ],
    "trigger": "Actual clean jump and gain.",
    "requiredStatDirection": {
      "stat": "Jump Confidence",
      "direction": "increase"
    }
  },
  {
    "id": "TB5-29-10",
    "text": "The horse completes its first clean jump since the previous setback.",
    "requiredConditions": [
      "firstSuccessAfterSetback"
    ],
    "trigger": "Real first clean attempt after setback."
  },
  {
    "id": "TB5-29-11",
    "text": "The second successful session suggests growing consistency.",
    "requiredConditions": [
      "twoSessions"
    ],
    "trigger": "Two real positive sessions."
  },
  {
    "id": "TB5-29-12",
    "text": "After three verified positive sessions, the horse is beginning to recover confidence.",
    "requiredConditions": [
      "threeSessions"
    ],
    "trigger": "Three actual qualifying sessions."
  },
  {
    "id": "TB5-29-13",
    "text": "The horse remains reluctant despite a more experienced rider.",
    "requiredConditions": [
      "riderChanged",
      "hesitation"
    ],
    "trigger": "Actual rider comparison + hesitation."
  },
  {
    "id": "TB5-29-14",
    "text": "The new rider has completed a successful session with [HORSE].",
    "requiredConditions": [
      "sessionComplete",
      "riderChanged",
      "success"
    ],
    "trigger": "Actual rider change and completion.",
    "allowedEventTypes": [
      "session"
    ]
  },
  {
    "id": "TB5-29-15",
    "text": "The current trainer is different from the one recorded during the earlier difficulties.",
    "requiredConditions": [
      "trainerChanged"
    ],
    "trigger": "Actual trainer change."
  },
  {
    "id": "TB5-29-16",
    "text": "The horse's technical jumping ability remains, although its confidence has changed.",
    "requiredConditions": [
      "technicalUnchanged",
      "confidenceChanged"
    ],
    "trigger": "Technical skill unchanged + confidence change."
  },
  {
    "id": "TB5-29-17",
    "text": "Several days have passed without further jumping training.",
    "requiredConditions": [
      "daysWithoutWork"
    ],
    "trigger": "Actual time/history."
  },
  {
    "id": "TB5-29-18",
    "text": "Rest has not automatically changed [HORSE]'s established fence avoidance.",
    "requiredConditions": [
      "restWithoutLearning"
    ],
    "trigger": "Rest/time passage without relevant learning."
  },
  {
    "id": "TB5-29-19",
    "text": "Today's attempt produces another setback.",
    "requiredConditions": [
      "decline"
    ],
    "trigger": "Actual adverse learned-stat change."
  },
  {
    "id": "TB5-29-20",
    "text": "The session's behavioral summary reflects only the events that actually occurred.",
    "requiredConditions": [
      "sessionComplete"
    ],
    "trigger": "Session completion.",
    "allowedEventTypes": [
      "session"
    ]
  }
];
