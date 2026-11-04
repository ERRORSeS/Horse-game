/* Supplied 5.1 narratives: effects resolve before these evidence predicates are evaluated. */
const TB51_NARRATIVES=[
  {
    "id": "TB51-14-01",
    "text": "[HORSE] lifts its head after hearing a sudden noise.",
    "requiredConditions": [
      "mildSpook",
      "audibleStimulus"
    ],
    "trigger": "Actual mild spook. Effect: Temporary Focus -1."
  },
  {
    "id": "TB51-14-02",
    "text": "The horse becomes alert to movement near the arena.",
    "requiredConditions": [
      "environmentalEvent",
      "arenaMovement",
      "tensionIncrease"
    ],
    "trigger": "Eligible environmental event. Effect: Temporary Tension +1 to +2."
  },
  {
    "id": "TB51-14-03",
    "text": "[HORSE] shies away from the distraction.",
    "requiredConditions": [
      "noticeableSpook"
    ],
    "trigger": "Resolved noticeable spook. Effect: Rhythm disruption."
  },
  {
    "id": "TB51-14-04",
    "text": "The horse loses concentration during the unexpected reaction.",
    "requiredConditions": [
      "significantSpook",
      "focusLoss"
    ],
    "trigger": "Significant spook. Effect: Focus -2 to -4."
  },
  {
    "id": "TB51-14-05",
    "text": "[HORSE] becomes increasingly unsettled after the incident.",
    "requiredConditions": [
      "spook",
      "sustainedTension",
      "tensionIncrease"
    ],
    "trigger": "Actual sustained tension. Effect: Tension +3 to +5."
  },
  {
    "id": "TB51-14-06",
    "text": "The horse settles within moments and returns its attention to the exercise.",
    "requiredConditions": [
      "spook",
      "recovery",
      "focusRecovered"
    ],
    "trigger": "Actual recovery. Effect: Focus +1 to +2."
  },
  {
    "id": "TB51-14-07",
    "text": "The rider remains balanced during the sudden movement.",
    "requiredConditions": [
      "spook",
      "balancePassed"
    ],
    "trigger": "Successful balance check. Effect: No fall."
  },
  {
    "id": "TB51-14-08",
    "text": "The rider struggles to remain centered as [HORSE] reacts.",
    "requiredConditions": [
      "spook",
      "balanceDifficult"
    ],
    "trigger": "Failed or difficult balance check. Effect: Fall-risk resolution."
  },
  {
    "id": "TB51-14-09",
    "text": "[HORSE] remains uneasy about the same part of the arena.",
    "requiredConditions": [
      "spook",
      "contextMemory"
    ],
    "trigger": "Actual contextual memory. Effect: Learned environmental concern."
  },
  {
    "id": "TB51-14-10",
    "text": "The horse appears calmer during the next completed exercise.",
    "requiredConditions": [
      "completedCalmerExercise"
    ],
    "trigger": "Actual lower Tension."
  },
  {
    "id": "TB51-14-11",
    "text": "[HORSE] reacts more strongly than expected for its usual temperament.",
    "requiredConditions": [
      "unusuallyIntense"
    ],
    "trigger": "Actual unusually intense event."
  },
  {
    "id": "TB51-14-12",
    "text": "The horse's natural sensitivity contributes to the response.",
    "requiredConditions": [
      "highSpookiness",
      "spook"
    ],
    "trigger": "High Natural Spookiness + actual reaction."
  },
  {
    "id": "TB51-14-13",
    "text": "[HORSE] remains relatively composed despite its naturally reactive temperament.",
    "requiredConditions": [
      "highSpookiness",
      "mildSpook"
    ],
    "trigger": "High Spookiness + mild response."
  },
  {
    "id": "TB51-14-14",
    "text": "The horse's learned sensitivity has increased following the incident.",
    "requiredConditions": [
      "spook",
      "sensitivityIncrease"
    ],
    "trigger": "Actual increase to Learned Spook Sensitivity."
  },
  {
    "id": "TB51-14-15",
    "text": "The horse shows no lasting change following the brief startle.",
    "requiredConditions": [
      "noLearnedChange",
      "mildSpook"
    ],
    "trigger": "No learned-stat change."
  },
  {
    "id": "TB51-14-16",
    "text": "The rider chooses to resume the existing exercise.",
    "requiredConditions": [
      "selectedResume"
    ],
    "trigger": "Actual player selection."
  },
  {
    "id": "TB51-14-17",
    "text": "The rider chooses to take a break.",
    "requiredConditions": [
      "selectedBreak"
    ],
    "trigger": "Actual player selection."
  },
  {
    "id": "TB51-14-18",
    "text": "The spook and its consequences are recorded in the session journal.",
    "requiredConditions": [
      "spook",
      "incidentRecorded"
    ],
    "trigger": "Event recorded."
  },
  {
    "id": "TB51-15-01",
    "text": "[HORSE] suddenly accelerates beyond the intended pace.",
    "requiredConditions": [
      "bolt"
    ],
    "trigger": "Actual bolt event. Effect: Interrupt current exercise."
  },
  {
    "id": "TB51-15-02",
    "text": "The horse becomes difficult to regulate during the unexpected acceleration.",
    "requiredConditions": [
      "bolt"
    ],
    "trigger": "Bolt event. Effect: Tension/focus consequences."
  },
  {
    "id": "TB51-15-03",
    "text": "The rider is caught off balance by the sudden change.",
    "requiredConditions": [
      "bolt",
      "balanceDifficult"
    ],
    "trigger": "Bolt + balance disruption. Effect: Fall check."
  },
  {
    "id": "TB51-15-04",
    "text": "The rider manages to remain mounted.",
    "requiredConditions": [
      "bolt",
      "balancePassed"
    ],
    "trigger": "Successful fall-resolution check."
  },
  {
    "id": "TB51-15-05",
    "text": "The rider loses balance and falls during the incident.",
    "requiredConditions": [
      "bolt",
      "riderFall"
    ],
    "trigger": "Actual rider fall. Effect: End attempt."
  },
  {
    "id": "TB51-15-06",
    "text": "[HORSE] begins to settle after the episode.",
    "requiredConditions": [
      "bolt",
      "recovery"
    ],
    "trigger": "Actual recovery."
  },
  {
    "id": "TB51-15-07",
    "text": "The horse remains tense even after the acceleration ends.",
    "requiredConditions": [
      "bolt",
      "sustainedTension"
    ],
    "trigger": "Sustained Tension."
  },
  {
    "id": "TB51-15-08",
    "text": "The incident occurred during an already unsettled session.",
    "requiredConditions": [
      "bolt",
      "previousHighTension"
    ],
    "trigger": "Previous high Tension."
  },
  {
    "id": "TB51-15-09",
    "text": "The horse's naturally intense temperament contributed to the severity of its response.",
    "requiredConditions": [
      "bolt",
      "intenseTemperament"
    ],
    "trigger": "High Temperament + severity modifier applied."
  },
  {
    "id": "TB51-15-10",
    "text": "Despite a placid temperament, [HORSE] reacts strongly today.",
    "requiredConditions": [
      "bolt",
      "placidTemperament"
    ],
    "trigger": "Low Temperament + genuine significant bolt."
  },
  {
    "id": "TB51-15-11",
    "text": "The rider's unstable position makes the incident more difficult.",
    "requiredConditions": [
      "bolt",
      "lowStability",
      "riderError"
    ],
    "trigger": "Low stability + relevant error."
  },
  {
    "id": "TB51-15-12",
    "text": "The horse recovers its rhythm without a rider fall.",
    "requiredConditions": [
      "bolt",
      "balancePassed",
      "recovery"
    ],
    "trigger": "Bolt resolved + no fall."
  },
  {
    "id": "TB51-15-13",
    "text": "The session is interrupted following the loss of control.",
    "requiredConditions": [
      "bolt",
      "interrupted"
    ],
    "trigger": "Actual interruption."
  },
  {
    "id": "TB51-15-14",
    "text": "The incident raises concern about the horse's current condition.",
    "requiredConditions": [
      "bolt",
      "assessmentPending"
    ],
    "trigger": "Relevant assessment concern."
  },
  {
    "id": "TB51-15-15",
    "text": "The horse's Flatwork Confidence has decreased following the event.",
    "requiredConditions": [
      "bolt",
      "flatConfidenceLoss"
    ],
    "trigger": "Actual Flatwork Confidence loss."
  },
  {
    "id": "TB51-15-16",
    "text": "The horse's learned environmental sensitivity has increased.",
    "requiredConditions": [
      "bolt",
      "sensitivityIncrease"
    ],
    "trigger": "Actual Learned Spook Sensitivity increase."
  },
  {
    "id": "TB51-15-17",
    "text": "The bolt is recorded as a separate event rather than an ordinary increase in speed.",
    "requiredConditions": [
      "bolt"
    ],
    "trigger": "Actual bolt event."
  },
  {
    "id": "TB51-15-18",
    "text": "The session record preserves the circumstances of the incident.",
    "requiredConditions": [
      "bolt",
      "incidentRecorded"
    ],
    "trigger": "Journal saved."
  },
  {
    "id": "TB51-16-01",
    "text": "The rider becomes unbalanced after the sudden stop.",
    "requiredConditions": [
      "refusalLinked",
      "destabilization"
    ],
    "trigger": "Actual destabilization."
  },
  {
    "id": "TB51-16-02",
    "text": "The rider's position deteriorates during the unexpected movement.",
    "requiredConditions": [
      "incidentRecorded",
      "stabilityError"
    ],
    "trigger": "Actual stability error."
  },
  {
    "id": "TB51-16-03",
    "text": "The rider remains mounted despite the disruption.",
    "requiredConditions": [
      "balancePassed"
    ],
    "trigger": "Successful fall check."
  },
  {
    "id": "TB51-16-04",
    "text": "The rider falls during the incident.",
    "requiredConditions": [
      "riderFall"
    ],
    "trigger": "Actual rider fall."
  },
  {
    "id": "TB51-16-05",
    "text": "The session is interrupted after the fall.",
    "requiredConditions": [
      "riderFall",
      "interrupted"
    ],
    "trigger": "Training interruption."
  },
  {
    "id": "TB51-16-06",
    "text": "The horse remains visibly unsettled after the incident.",
    "requiredConditions": [
      "riderFall",
      "sustainedTension"
    ],
    "trigger": "Actual elevated Tension."
  },
  {
    "id": "TB51-16-07",
    "text": "The rider's limited stability contributed to the outcome.",
    "requiredConditions": [
      "lowStabilityModifier"
    ],
    "trigger": "Low stability modifier was actually applied."
  },
  {
    "id": "TB51-16-08",
    "text": "The fall occurred despite the rider's established experience.",
    "requiredConditions": [
      "expertRider",
      "riderFall"
    ],
    "trigger": "Advanced/Professional + actual fall."
  },
  {
    "id": "TB51-16-09",
    "text": "The rider's balance helps prevent a fall.",
    "requiredConditions": [
      "balancePassed"
    ],
    "trigger": "Successful relevant stability check."
  },
  {
    "id": "TB51-16-10",
    "text": "The incident occurred following a refusal.",
    "requiredConditions": [
      "refusalLinked",
      "riderFall"
    ],
    "trigger": "Actual refusal-linked fall."
  },
  {
    "id": "TB51-16-11",
    "text": "The incident occurred following a spook.",
    "requiredConditions": [
      "spook",
      "riderFall"
    ],
    "trigger": "Actual spook-linked fall."
  },
  {
    "id": "TB51-16-12",
    "text": "The incident occurred during a bolt.",
    "requiredConditions": [
      "bolt",
      "riderFall"
    ],
    "trigger": "Actual bolt-linked fall."
  },
  {
    "id": "TB51-16-13",
    "text": "The horse's Jump Confidence has decreased following the jumping incident.",
    "requiredConditions": [
      "riderFall",
      "jumpConfidenceLoss"
    ],
    "trigger": "Actual confidence decrease."
  },
  {
    "id": "TB51-16-14",
    "text": "The horse's Flatwork Confidence has decreased following the flatwork incident.",
    "requiredConditions": [
      "riderFall",
      "flatConfidenceLoss"
    ],
    "trigger": "Actual confidence decrease."
  },
  {
    "id": "TB51-16-15",
    "text": "The fall has increased the horse's learned avoidance of jumping.",
    "requiredConditions": [
      "riderFall",
      "avoidanceIncrease"
    ],
    "trigger": "Actual avoidance increase."
  },
  {
    "id": "TB51-16-16",
    "text": "No lasting learned-behavior change is recorded from this incident.",
    "requiredConditions": [
      "incidentRecorded",
      "noLearnedChange"
    ],
    "trigger": "No learned-stat changes."
  },
  {
    "id": "TB51-16-17",
    "text": "The horse and rider require an appropriate assessment before returning to work.",
    "requiredConditions": [
      "assessmentPending",
      "riderFall"
    ],
    "trigger": "Recorded fall and assessment stage."
  },
  {
    "id": "TB51-16-18",
    "text": "The fall has been recorded once in the training history.",
    "requiredConditions": [
      "riderFall",
      "incidentRecorded"
    ],
    "trigger": "Saved incident."
  },
  {
    "id": "TB51-17-01",
    "text": "[HORSE] loses its footing during the exercise.",
    "requiredConditions": [
      "slip"
    ],
    "trigger": "Actual horse slip."
  },
  {
    "id": "TB51-17-02",
    "text": "The horse struggles to recover balance after the slip.",
    "requiredConditions": [
      "significantFooting"
    ],
    "trigger": "Significant footing event."
  },
  {
    "id": "TB51-17-03",
    "text": "The horse regains its footing without falling.",
    "requiredConditions": [
      "slip",
      "horseStayedUpright"
    ],
    "trigger": "Horse-fall check failed."
  },
  {
    "id": "TB51-17-04",
    "text": "[HORSE] falls during the incident.",
    "requiredConditions": [
      "horseFall"
    ],
    "trigger": "Actual horse fall."
  },
  {
    "id": "TB51-17-05",
    "text": "The exercise ends immediately following the horse's fall.",
    "requiredConditions": [
      "horseFall",
      "interrupted"
    ],
    "trigger": "Horse fall."
  },
  {
    "id": "TB51-17-06",
    "text": "The training session is stopped pending assessment.",
    "requiredConditions": [
      "horseFall",
      "interrupted"
    ],
    "trigger": "Horse fall."
  },
  {
    "id": "TB51-17-07",
    "text": "The arena footing is identified as a possible contributing factor.",
    "requiredConditions": [
      "footingContributed"
    ],
    "trigger": "Actual footing modifier."
  },
  {
    "id": "TB51-17-08",
    "text": "The incident occurred during a serious jumping disruption.",
    "requiredConditions": [
      "seriousJump"
    ],
    "trigger": "Actual jumping context."
  },
  {
    "id": "TB51-17-09",
    "text": "A rotational fall is recorded during the jumping incident.",
    "requiredConditions": [
      "rotational"
    ],
    "trigger": "Actual rotational subtype."
  },
  {
    "id": "TB51-17-10",
    "text": "The incident has caused a significant setback in jumping confidence.",
    "requiredConditions": [
      "horseFall",
      "jumpConfidenceLoss"
    ],
    "trigger": "Actual Jump Confidence decline."
  },
  {
    "id": "TB51-17-11",
    "text": "The horse's learned avoidance has increased following the incident.",
    "requiredConditions": [
      "horseFall",
      "avoidanceIncrease"
    ],
    "trigger": "Actual Fence Avoidance increase."
  },
  {
    "id": "TB51-17-12",
    "text": "The medical assessment remains pending.",
    "requiredConditions": [
      "assessmentPending"
    ],
    "trigger": "Actual pending medical status."
  },
  {
    "id": "TB51-17-13",
    "text": "The horse has not yet been cleared to return to ordinary work.",
    "requiredConditions": [
      "assessmentPending",
      "restricted"
    ],
    "trigger": "Existing restriction."
  },
  {
    "id": "TB51-17-14",
    "text": "The veterinarian records the results of the assessment.",
    "requiredConditions": [
      "vetExam"
    ],
    "trigger": "Actual vet examination."
  },
  {
    "id": "TB51-17-15",
    "text": "The behavioral effects of the incident remain in the horse's history.",
    "requiredConditions": [
      "horseFall",
      "incidentRecorded"
    ],
    "trigger": "Existing incident record."
  },
  {
    "id": "TB51-17-16",
    "text": "The horse's previous technical jumping ability remains recorded separately from its current confidence.",
    "requiredConditions": [
      "horseFall",
      "technicalPreserved"
    ],
    "trigger": "Technical skill preserved."
  },
  {
    "id": "TB51-18-01",
    "text": "Heavy rain has left the outdoor arena footing very wet.",
    "requiredConditions": [
      "outdoor",
      "heavyRain",
      "wetFooting"
    ],
    "trigger": "Heavy rain + affected outdoor footing."
  },
  {
    "id": "TB51-18-02",
    "text": "Snow has accumulated around the outdoor training area.",
    "requiredConditions": [
      "outdoor",
      "snow"
    ],
    "trigger": "Actual snow state."
  },
  {
    "id": "TB51-18-03",
    "text": "The footing offers reduced traction in some areas.",
    "requiredConditions": [
      "poorFooting"
    ],
    "trigger": "Poor footing classification."
  },
  {
    "id": "TB51-18-04",
    "text": "The current conditions increase the possibility of a slip.",
    "requiredConditions": [
      "elevatedSlipRisk"
    ],
    "trigger": "Elevated slip risk."
  },
  {
    "id": "TB51-18-05",
    "text": "The player elects to continue training outdoors despite the warning.",
    "requiredConditions": [
      "outdoorConfirmed"
    ],
    "trigger": "Actual player confirmation."
  },
  {
    "id": "TB51-18-06",
    "text": "The player selects the indoor arena.",
    "requiredConditions": [
      "selectedIndoor"
    ],
    "trigger": "Actual indoor selection."
  },
  {
    "id": "TB51-18-07",
    "text": "The indoor footing remains suitable for the scheduled exercise.",
    "requiredConditions": [
      "indoor",
      "suitableFooting"
    ],
    "trigger": "Indoor footing is actually suitable."
  },
  {
    "id": "TB51-18-08",
    "text": "The indoor arena also has a footing concern today.",
    "requiredConditions": [
      "indoor",
      "poorFooting"
    ],
    "trigger": "Actual indoor footing issue."
  },
  {
    "id": "TB51-18-09",
    "text": "[HORSE] loses its footing during the movement.",
    "requiredConditions": [
      "slip"
    ],
    "trigger": "Actual slip event."
  },
  {
    "id": "TB51-18-10",
    "text": "The horse recovers balance and continues without falling.",
    "requiredConditions": [
      "slip",
      "horseStayedUpright"
    ],
    "trigger": "Slip + no fall."
  },
  {
    "id": "TB51-18-11",
    "text": "The rider becomes unbalanced during the slip.",
    "requiredConditions": [
      "slip",
      "balanceDifficult"
    ],
    "trigger": "Slip + rider destabilization."
  },
  {
    "id": "TB51-18-12",
    "text": "The incident results in a rider fall.",
    "requiredConditions": [
      "slip",
      "riderFall"
    ],
    "trigger": "Actual rider fall."
  },
  {
    "id": "TB51-18-13",
    "text": "The horse falls during the footing-related incident.",
    "requiredConditions": [
      "slip",
      "horseFall"
    ],
    "trigger": "Actual horse fall."
  },
  {
    "id": "TB51-18-14",
    "text": "The session is interrupted following the serious footing incident.",
    "requiredConditions": [
      "slip",
      "interrupted"
    ],
    "trigger": "Serious incident."
  },
  {
    "id": "TB51-18-15",
    "text": "The weather has changed, but the current arena remains usable.",
    "requiredConditions": [
      "weatherChanged",
      "arenaUsable"
    ],
    "trigger": "Actual weather/footing state."
  },
  {
    "id": "TB51-18-16",
    "text": "The footing warning remains active because conditions have not improved.",
    "requiredConditions": [
      "warningActive"
    ],
    "trigger": "Warning condition still true."
  },
  {
    "id": "TB51-18-17",
    "text": "The horse's Arena Confidence decreases after the significant environment-related incident.",
    "requiredConditions": [
      "environmentRelated",
      "arenaConfidenceLoss"
    ],
    "trigger": "Actual Arena Confidence loss."
  },
  {
    "id": "TB51-18-18",
    "text": "The horse shows no lasting confidence change after the minor footing mistake.",
    "requiredConditions": [
      "slip",
      "noLearnedChange"
    ],
    "trigger": "No learned-stat change."
  }
];
