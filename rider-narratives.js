/* Contextual narrative definitions supplied for Rider Realism. */
const RR_NARRATIVES=[
  {
    "id": "R1",
    "text": "[HORSE] shortens its stride before the fence, appearing uncertain about the distance.",
    "effect": "Temporary jump focus -2; upcoming approach difficulty slightly increased."
  },
  {
    "id": "R2",
    "text": "The brightly colored filler catches [HORSE]'s attention. The horse looks toward it instead of maintaining the approach.",
    "effect": "Contextual spook trigger; possible small increase to obstacle-specific uncertainty."
  },
  {
    "id": "R3",
    "text": "The rider loses balance in the final strides, and [HORSE] becomes uncertain about the takeoff.",
    "effect": "Rider error recorded; approach disrupted; possible confidence -1 to -2."
  },
  {
    "id": "R4",
    "text": "[HORSE] begins losing energy through the corner, leaving the final approach underpowered.",
    "effect": "Performance Energy decreases; refusal likelihood handled by existing engine."
  },
  {
    "id": "R5",
    "text": "At the last moment, [HORSE] moves away from the line of the fence instead of jumping.",
    "effect": "Run-out event; actual competition penalties; context-specific avoidance may increase."
  },
  {
    "id": "R6",
    "text": "[HORSE] comes to a stop in front of the oxer.",
    "effect": "Refusal recorded; existing competition penalty rules apply."
  },
  {
    "id": "R7",
    "text": "The second approach feels more hesitant than the first. [HORSE] has not regained confidence.",
    "effect": "Current jump confidence -2; escalation warning."
  },
  {
    "id": "R8",
    "text": "After returning to a simpler exercise, [HORSE] approaches with a steadier rhythm.",
    "effect": "Temporary focus +3; small confidence improvement if completed."
  },
  {
    "id": "R9",
    "text": "The fence demands more than [HORSE] appears comfortable attempting today.",
    "effect": "Difficulty warning; continued attempts require an explicit player choice."
  },
  {
    "id": "R10",
    "text": "A normally willing [HORSE] repeatedly hesitates, raising concern about a possible physical cause.",
    "effect": "Flag for veterinary assessment; do not diagnose automatically."
  },
  {
    "id": "R11",
    "text": "The horse appears more comfortable after the difficulty is reduced.",
    "effect": "Temporary tension -3; may improve contextual confidence."
  },
  {
    "id": "R12",
    "text": "Despite the pause, [HORSE] continues to watch the fence with uncertainty.",
    "effect": "No automatic confidence gain; unresolved trigger remains."
  },
  {
    "id": "R13",
    "text": "The exercise is discontinued after [HORSE] shows repeated difficulty.",
    "effect": "Training session can end; no full completion reward for unfinished objectives."
  },
  {
    "id": "R14",
    "text": "[HORSE] becomes increasingly tense, and its movements lose their previous rhythm.",
    "effect": "Temporary tension +5; focus -3; escalation state."
  },
  {
    "id": "R15",
    "text": "A late, inconsistent rider correction disrupts the approach further.",
    "effect": "Rider technique error; reduced timing; negative training observation."
  },
  {
    "id": "R16",
    "text": "The same obstacle has caused difficulty before, and [HORSE] appears to recognize it.",
    "effect": "Retrieve existing obstacle-specific memory; no fabricated new history."
  },
  {
    "id": "R17",
    "text": "For the first time in several sessions, [HORSE] approaches the previously difficult fence without obvious hesitation.",
    "effect": "Relevant avoidance -2; confidence +2."
  },
  {
    "id": "R18",
    "text": "Although recent sessions have been positive, [HORSE] hesitates again today.",
    "effect": "Minor confidence setback; do not erase prior progress."
  },
  {
    "id": "R19",
    "text": "The trainer notes that the refusals began after a change in rider technique.",
    "effect": "Add meaningful training-history observation."
  },
  {
    "id": "R20",
    "text": "Today's jumping difficulties have been recorded, including the suspected contributing factors.",
    "effect": "Create a single summarized history entry."
  },
  {
    "id": "S1",
    "text": "[HORSE] flicks its ears toward a movement near the arena.",
    "effect": "Minor attention shift; focus -1."
  },
  {
    "id": "S2",
    "text": "A sudden noise causes [HORSE] to lift its head sharply.",
    "effect": "Temporary tension +3."
  },
  {
    "id": "S3",
    "text": "The horse notices an unfamiliar object and slows to examine it.",
    "effect": "Context-specific novelty event; no automatic penalty."
  },
  {
    "id": "S4",
    "text": "[HORSE] shies away from the arena decorations.",
    "effect": "Spook event; rhythm interruption."
  },
  {
    "id": "S5",
    "text": "The horse returns to its previous rhythm after a brief moment.",
    "effect": "Focus recovery +2."
  },
  {
    "id": "S6",
    "text": "[HORSE] remains suspicious of the same corner.",
    "effect": "Small context-specific uncertainty increase."
  },
  {
    "id": "S7",
    "text": "The rider's sudden correction adds to [HORSE]'s confusion.",
    "effect": "Rider inconsistency recorded; tension +3."
  },
  {
    "id": "S8",
    "text": "[HORSE] becomes quieter once the unfamiliar area is approached calmly.",
    "effect": "Contextual confidence +1."
  },
  {
    "id": "S9",
    "text": "Another horse passes the arena entrance, briefly distracting [HORSE].",
    "effect": "Distraction event; focus -2."
  },
  {
    "id": "S10",
    "text": "[HORSE] reacts more strongly than usual to the familiar surroundings.",
    "effect": "Trigger health/management review recommendation."
  },
  {
    "id": "S11",
    "text": "The horse recognizes the area from its previous visit and settles more quickly.",
    "effect": "Apply existing venue familiarity benefit."
  },
  {
    "id": "S12",
    "text": "A nearby flag moves in the wind, drawing [HORSE]'s attention.",
    "effect": "Novelty response calculation."
  },
  {
    "id": "S13",
    "text": "[HORSE] remains relaxed despite the movement around the arena.",
    "effect": "Positive calm-response record."
  },
  {
    "id": "S14",
    "text": "The horse becomes increasingly alert as several unfamiliar sounds occur.",
    "effect": "Temporary tension +4."
  },
  {
    "id": "S15",
    "text": "A familiar routine helps [HORSE] regain concentration.",
    "effect": "Focus +3, if routine is successful."
  },
  {
    "id": "S16",
    "text": "The horse is still unsettled, and the session is shortened.",
    "effect": "Training ends early; remaining objectives uncompleted."
  },
  {
    "id": "S17",
    "text": "[HORSE] approaches the previously worrying area with greater confidence than last week.",
    "effect": "Contextual avoidance -1 to -2."
  },
  {
    "id": "S18",
    "text": "The incident is added to [HORSE]'s behavioral history.",
    "effect": "Save one meaningful event, not an extra behavior change."
  },
  {
    "id": "C1",
    "text": "[HORSE] begins the exercise with a steady, relaxed contact.",
    "effect": "Focus +2; successful start."
  },
  {
    "id": "C2",
    "text": "The rider's inconsistent contact causes [HORSE] to lose its rhythm.",
    "effect": "Rider error; current focus -2."
  },
  {
    "id": "C3",
    "text": "[HORSE] raises its head and becomes tense during the request for collection.",
    "effect": "Tension +4; collection comfort decreases slightly if recurring."
  },
  {
    "id": "C4",
    "text": "The horse struggles to understand the combination of aids.",
    "effect": "Aid-consistency issue logged; no automatic skill loss."
  },
  {
    "id": "C5",
    "text": "[HORSE] performs the movement correctly but appears less comfortable than during previous sessions.",
    "effect": "Temporary behavioral warning; track recurrence."
  },
  {
    "id": "C6",
    "text": "A quieter transition allows [HORSE] to regain balance.",
    "effect": "Balance-related temporary performance improvement."
  },
  {
    "id": "C7",
    "text": "The horse falls out of the collected work before completing the movement.",
    "effect": "Movement incomplete; reduce applicable session outcome."
  },
  {
    "id": "C8",
    "text": "[HORSE] begins anticipating the next transition.",
    "effect": "Anticipation memory +1."
  },
  {
    "id": "C9",
    "text": "Repeated inconsistent requests have made [HORSE] uncertain about the exercise.",
    "effect": "Learned collection confidence -2."
  },
  {
    "id": "C10",
    "text": "The rider loses balance, and the horse's contact becomes inconsistent.",
    "effect": "Seat-related rider error."
  },
  {
    "id": "C11",
    "text": "[HORSE] responds more confidently when the movement is simplified.",
    "effect": "Relevant learned confidence +1."
  },
  {
    "id": "C12",
    "text": "The horse becomes increasingly tense during the difficult exercise.",
    "effect": "Temporary tension +5."
  },
  {
    "id": "C13",
    "text": "The movement improves after the horse is given time to recover its rhythm.",
    "effect": "Temporary focus +3."
  },
  {
    "id": "C14",
    "text": "[HORSE] remains reluctant despite repeated requests.",
    "effect": "Unresolved concern; do not guarantee improvement."
  },
  {
    "id": "C15",
    "text": "The horse's resistance is unusual enough to warrant further assessment.",
    "effect": "Add assessment recommendation."
  },
  {
    "id": "C16",
    "text": "[HORSE] completes the transition with a softer, more consistent response.",
    "effect": "Positive experience; relevant confidence +2."
  },
  {
    "id": "C17",
    "text": "The horse appears more willing to attempt the movement than during the previous session.",
    "effect": "Learned collection confidence +1."
  },
  {
    "id": "C18",
    "text": "The rider's timing improves, allowing the exercise to become more consistent.",
    "effect": "Record positive rider technique outcome."
  },
  {
    "id": "C19",
    "text": "[HORSE] shows signs of fatigue, and the final exercise is shortened.",
    "effect": "End exercise; remaining objectives incomplete."
  },
  {
    "id": "C20",
    "text": "The session journal records the horse's technical performance and current comfort with collected work separately.",
    "effect": "Save both records without changing genetic skill."
  },
  {
    "id": "W1",
    "text": "The rider strikes [HORSE] with the crop after the refusal. The horse becomes visibly distressed, and the session is flagged for a welfare concern.",
    "effect": "Record welfare incident; interrupt ordinary reward processing for the event; assess temporary stress and learned behavior."
  },
  {
    "id": "W2",
    "text": "The rider uses the spurs as punishment. [HORSE] becomes defensive, and the trainer's response is recorded as inappropriate.",
    "effect": "Welfare incident; behavioral concern."
  },
  {
    "id": "W3",
    "text": "The trainer dismisses [HORSE]'s obvious discomfort and demands that the exercise continue.",
    "effect": "Negligent-training storyline; increase likelihood of session interruption or staff concern."
  },
  {
    "id": "W4",
    "text": "[HORSE] begins resisting the exercise rather than returning to its previous rhythm.",
    "effect": "Defensive-response event; no automatic obedience improvement."
  },
  {
    "id": "W5",
    "text": "A member of the stable staff intervenes and questions the rider's treatment of [HORSE].",
    "effect": "Trainer/staff storyline event."
  },
  {
    "id": "W6",
    "text": "The session is brought to an end after the horse's distress becomes impossible to ignore.",
    "effect": "Training terminated; unfinished objectives receive no completion reward."
  },
  {
    "id": "W7",
    "text": "The rider and trainer disagree over whether continuing the session is appropriate.",
    "effect": "Storyline decision; no arbitrary horse skill change."
  },
  {
    "id": "W8",
    "text": "This is not the first time [HORSE] has shown distress during this rider's sessions.",
    "effect": "Retrieve actual previous welfare incidents."
  },
  {
    "id": "W9",
    "text": "[HORSE] begins the next session more cautiously than usual.",
    "effect": "Retrieve learned experience; modest temporary confidence penalty."
  },
  {
    "id": "W10",
    "text": "The trainer notes that [HORSE] was previously reliable and did not show these difficulties under earlier management.",
    "effect": "Behavioral-history comparison."
  },
  {
    "id": "W11",
    "text": "The veterinarian recommends investigating whether physical discomfort is contributing to the behavior.",
    "effect": "Recommend existing veterinary examination route."
  },
  {
    "id": "W12",
    "text": "The horse's reactions remain unsettled even after the exercise is discontinued.",
    "effect": "Unresolved behavioral state."
  },
  {
    "id": "W13",
    "text": "[HORSE] responds differently when another rider takes over the session.",
    "effect": "Evaluate new rider compatibility rather than deleting all behavioral memories."
  },
  {
    "id": "W14",
    "text": "Stable staff have begun raising concerns about the trainer's repeated treatment of horses.",
    "effect": "Persistent trainer storyline flag."
  },
  {
    "id": "W15",
    "text": "The horse's owner asks for an explanation of the recent changes in behavior.",
    "effect": "Owner/stable management storyline."
  },
  {
    "id": "W16",
    "text": "The session ends, and the horse is given an opportunity to recover before further training is considered.",
    "effect": "Stop escalation; recovery becomes available."
  },
  {
    "id": "W17",
    "text": "Several calmer sessions have begun restoring [HORSE]'s willingness to attempt the previously difficult exercise.",
    "effect": "Slow contextual confidence improvement."
  },
  {
    "id": "W18",
    "text": "The welfare incident has been recorded separately from normal training mistakes.",
    "effect": "Save permanent incident summary; no additional random damage roll."
  },
  {
    "id": "E1",
    "text": "The rider becomes unbalanced during the approach.",
    "effect": "Temporary Timing -3."
  },
  {
    "id": "E2",
    "text": "The rider's hands become inconsistent as [HORSE] prepares to jump.",
    "effect": "Relevant focus -2; contact error recorded."
  },
  {
    "id": "E3",
    "text": "A late correction interrupts the horse's established rhythm.",
    "effect": "Timing -3; approach difficulty increased."
  },
  {
    "id": "E4",
    "text": "[HORSE] attempts to compensate for the rider's instability.",
    "effect": "Patient/experienced horse modifier; may avoid larger disruption."
  },
  {
    "id": "E5",
    "text": "The horse becomes uncertain when the rider gives conflicting requests.",
    "effect": "Relevant confidence -1."
  },
  {
    "id": "E6",
    "text": "The rider misjudges the approach and makes an abrupt adjustment.",
    "effect": "Rider-error outcome through existing engine."
  },
  {
    "id": "E7",
    "text": "[HORSE] remains calm despite the rider's mistake.",
    "effect": "No lasting negative learning; positive tolerance observation."
  },
  {
    "id": "E8",
    "text": "The horse's sensitive nature makes the inconsistent contact more noticeable.",
    "effect": "Sensitivity modifier applied."
  },
  {
    "id": "E9",
    "text": "A lack of preparation leaves the horse struggling to maintain balance.",
    "effect": "Movement-quality reduction."
  },
  {
    "id": "E10",
    "text": "The rider regains a stable position before the next exercise.",
    "effect": "Temporary balance recovery."
  },
  {
    "id": "E11",
    "text": "The horse rushes after the rider loses control of the rhythm.",
    "effect": "Current tension and timing adjusted."
  },
  {
    "id": "E12",
    "text": "[HORSE] becomes reluctant after several confusing approaches.",
    "effect": "Learned jump confidence may decrease if recurring."
  },
  {
    "id": "E13",
    "text": "The rider recognizes the mistake and simplifies the next exercise.",
    "effect": "De-escalation; improvement possible."
  },
  {
    "id": "E14",
    "text": "The rider continues working above their established experience level.",
    "effect": "Apply over-level modifier."
  },
  {
    "id": "E15",
    "text": "Despite the difficult exercise, [HORSE] remains willing and attentive.",
    "effect": "Successful tolerance outcome."
  },
  {
    "id": "E16",
    "text": "The horse becomes less forgiving as the session progresses.",
    "effect": "Accumulated temporary fatigue/tension, not permanent personality change."
  },
  {
    "id": "E17",
    "text": "The rider's steadier position allows the horse to respond more consistently.",
    "effect": "Positive technique outcome."
  },
  {
    "id": "E18",
    "text": "The training journal identifies rider inconsistency as a possible contributor.",
    "effect": "History note."
  },
  {
    "id": "B1",
    "text": "[HORSE] approaches the familiar exercise with slightly less hesitation than before.",
    "effect": "Relevant avoidance -1."
  },
  {
    "id": "B2",
    "text": "The horse completes the simplified exercise comfortably.",
    "effect": "Relevant confidence +2."
  },
  {
    "id": "B3",
    "text": "[HORSE] remains cautious, despite the improved session.",
    "effect": "Preserve unresolved memory."
  },
  {
    "id": "B4",
    "text": "The trainer records the horse's first clear improvement in several sessions.",
    "effect": "Milestone note."
  },
  {
    "id": "B5",
    "text": "[HORSE] begins relaxing earlier in the warm-up.",
    "effect": "Temporary tension reduction."
  },
  {
    "id": "B6",
    "text": "The horse recognizes the familiar exercise and responds more confidently.",
    "effect": "Context-specific confidence +1."
  },
  {
    "id": "B7",
    "text": "A minor hesitation remains, but the horse completes the exercise.",
    "effect": "Small positive experience."
  },
  {
    "id": "B8",
    "text": "[HORSE] appears more comfortable with the new rider's consistent approach.",
    "effect": "Rider-specific compatibility benefit."
  },
  {
    "id": "B9",
    "text": "The horse's reaction to the previously worrying obstacle is less pronounced.",
    "effect": "Contextual avoidance -2."
  },
  {
    "id": "B10",
    "text": "The horse is not ready for the more difficult exercise today.",
    "effect": "No forced progression."
  },
  {
    "id": "B11",
    "text": "A quiet training session ends without the problems seen earlier.",
    "effect": "Positive training-memory entry."
  },
  {
    "id": "B12",
    "text": "[HORSE] becomes tense again when the difficulty increases too quickly.",
    "effect": "Temporary setback."
  },
  {
    "id": "B13",
    "text": "The horse's natural sensitivity remains evident, but its confidence has improved.",
    "effect": "Learned confidence gain; natural temperament unchanged."
  },
  {
    "id": "B14",
    "text": "The rider and trainer agree that the horse is progressing gradually.",
    "effect": "Storyline milestone."
  },
  {
    "id": "B15",
    "text": "[HORSE] completes several consistent sessions without repeating the previous refusal.",
    "effect": "Long-term recovery milestone."
  },
  {
    "id": "B16",
    "text": "The horse approaches the same fence that caused difficulty earlier in the season.",
    "effect": "Retrieve memory for contextual response."
  },
  {
    "id": "B17",
    "text": "This time, [HORSE] completes the exercise with a confident, steady rhythm.",
    "effect": "Relevant confidence +2; avoidance -1."
  },
  {
    "id": "B18",
    "text": "The recovery journal reflects meaningful progress without erasing the horse's previous history.",
    "effect": "Persist milestone."
  },
  {
    "id": "T1",
    "text": "The trainer requests a more difficult exercise than the horse has recently attempted.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T2",
    "text": "The rider questions whether [HORSE] is ready for the requested work.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T3",
    "text": "The trainer believes the horse's reaction is behavioral rather than physical.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T4",
    "text": "A stable employee suggests that [HORSE] should receive further assessment.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T5",
    "text": "The trainer dismisses concerns raised during the session.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T6",
    "text": "The rider decides to finish the exercise at a lower difficulty.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T7",
    "text": "The trainer is visibly dissatisfied with the decision to stop.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T8",
    "text": "Another staff member notices that [HORSE] has become more tense over recent weeks.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T9",
    "text": "The owner asks whether the horse's training program remains suitable.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T10",
    "text": "A veterinary recommendation conflicts with the trainer's original plan.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T11",
    "text": "The stable manager requests an explanation of the recurring problems.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T12",
    "text": "The rider chooses to change instructors.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T13",
    "text": "The new trainer reviews the horse's previous training records.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T14",
    "text": "The trainer identifies several exercises that may need to be reconsidered.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T15",
    "text": "The horse begins showing improvement under the revised program.",
    "effect": "Persist the eligible trainer-management event."
  },
  {
    "id": "T16",
    "text": "The stable records the management change as an important event.",
    "effect": "Persist the eligible trainer-management event."
  }
];
