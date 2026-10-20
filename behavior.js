// Descriptions are observations, not veterinary diagnoses.
const STALL_BEHAVIOR_TEMPLATES=[
  {
    "id": 1,
    "name": "Quiet Resting",
    "text": "(Horse Name) spent time resting quietly, head lowered and ears relaxed.",
    "body": "Relaxed",
    "requirements": "Neutral/Happy",
    "effects": "No Effect."
  },
  {
    "id": 2,
    "name": "Dozing",
    "text": "(Horse Name) dozed in the stall, occasionally shifting weight before settling again.",
    "body": "Tired",
    "requirements": "Neutral/No Energy",
    "effects": "No Effect."
  },
  {
    "id": 3,
    "name": "Comfortable Lying Down",
    "text": "(Horse Name) lay down to rest, appearing calm and undisturbed.",
    "body": "Relaxed",
    "requirements": "Comfortable horse",
    "effects": "No Effect."
  },
  {
    "id": 4,
    "name": "Watching Stable Activity",
    "text": "(Horse Name) stood near the stall entrance, watching people and horses passing by.",
    "body": "Interested",
    "requirements": "All eligible horses",
    "effects": "No Effect."
  },
  {
    "id": 5,
    "name": "Looking Out",
    "text": "(Horse Name) spent several minutes watching activity outside the stall.",
    "body": "Interested",
    "requirements": "Stall with suitable opening",
    "effects": "No Effect."
  },
  {
    "id": 6,
    "name": "Quiet Hay Eating",
    "text": "(Horse Name) calmly ate hay, pausing occasionally to look around.",
    "body": "Relaxed",
    "requirements": "Feeder available",
    "effects": "No Effect."
  },
  {
    "id": 7,
    "name": "Water Break",
    "text": "(Horse Name) drank from the water supply before returning to a quiet corner.",
    "body": "Neutral",
    "requirements": "Water available",
    "effects": "No Effect."
  },
  {
    "id": 8,
    "name": "Stretching",
    "text": "(Horse Name) stretched and repositioned before settling.",
    "body": "Relaxed",
    "requirements": "Healthy horse",
    "effects": "No Effect."
  },
  {
    "id": 9,
    "name": "Investigating Bedding",
    "text": "(Horse Name) sniffed and moved through the bedding before choosing a resting spot.",
    "body": "Interested",
    "requirements": "Bedding present",
    "effects": "No Effect."
  },
  {
    "id": 10,
    "name": "Relaxed Stable Evening",
    "text": "(Horse Name) spent the evening standing quietly, showing relaxed ears and slow movements.",
    "body": "Relaxed",
    "requirements": "Positive/Neutral mood",
    "effects": "No Effect."
  },
  {
    "id": 11,
    "name": "Enjoying Likit",
    "text": "(Horse Name) spent time licking the flavored treat, returning to it several times.",
    "body": "Interested",
    "requirements": "Likes active Likit",
    "effects": "Happy +5 pp within enrichment cap."
  },
  {
    "id": 12,
    "name": "Ignoring Likit",
    "text": "(Horse Name) sniffed the Likit holder but showed little interest.",
    "body": "Neutral",
    "requirements": "Neutral preference",
    "effects": "No Effect."
  },
  {
    "id": 13,
    "name": "Disliking Likit",
    "text": "(Horse Name) turned away from the treat holder and avoided it.",
    "body": "Uncomfortable",
    "requirements": "Dislikes active Likit",
    "effects": "Uncomfortable +3 pp."
  },
  {
    "id": 14,
    "name": "Playing With Stall Ball",
    "text": "(Horse Name) repeatedly nudged the hanging ball, ears forward and curious.",
    "body": "Playful",
    "requirements": "Likes stall ball",
    "effects": "Happy +5 pp."
  },
  {
    "id": 15,
    "name": "Startled by Stall Ball",
    "text": "(Horse Name) backed away when the hanging ball moved unexpectedly.",
    "body": "Nervous",
    "requirements": "Dislikes stall ball",
    "effects": "Distress +5 pp."
  },
  {
    "id": 16,
    "name": "Soft Toy Interest",
    "text": "(Horse Name) picked up or nudged the soft toy before settling.",
    "body": "Interested",
    "requirements": "Likes soft toy",
    "effects": "Happy +5 pp."
  },
  {
    "id": 17,
    "name": "Jolly Ball Play",
    "text": "(Horse Name) pushed the ball around the stall, appearing energetic and engaged.",
    "body": "Playful",
    "requirements": "Likes Jolly Ball",
    "effects": "Happy +5 pp."
  },
  {
    "id": 18,
    "name": "Jolly Ball Avoidance",
    "text": "(Horse Name) avoided the ball when it rolled into the walking area.",
    "body": "Nervous",
    "requirements": "Dislikes Jolly Ball",
    "effects": "Uncomfortable +5 pp."
  },
  {
    "id": 19,
    "name": "Slow Feeder Enjoyment",
    "text": "(Horse Name) calmly worked through the hay feeder without appearing frustrated.",
    "body": "Relaxed",
    "requirements": "Likes slow feeder",
    "effects": "Happy +5 pp."
  },
  {
    "id": 20,
    "name": "Slow Feeder Frustration",
    "text": "(Horse Name) pawed near the feeder and repeatedly moved away before returning.",
    "body": "Agitated",
    "requirements": "Dislikes slow feeder",
    "effects": "Uncomfortable +5 pp."
  },
  {
    "id": 21,
    "name": "Salt Lick Interest",
    "text": "(Horse Name) used the salt lick briefly before resting.",
    "body": "Interested",
    "requirements": "Likes salt lick",
    "effects": "Happy +3 pp."
  },
  {
    "id": 22,
    "name": "Mirror Curiosity",
    "text": "(Horse Name) approached the mirror and investigated the reflection with ears forward.",
    "body": "Interested",
    "requirements": "Likes stall mirror",
    "effects": "Happy +5 pp."
  },
  {
    "id": 23,
    "name": "Mirror Concern",
    "text": "(Horse Name) became tense around the reflection and moved away.",
    "body": "Nervous",
    "requirements": "Dislikes stall mirror",
    "effects": "Distress +7 pp."
  },
  {
    "id": 24,
    "name": "Fan Relaxation",
    "text": "(Horse Name) stood comfortably near the airflow and relaxed.",
    "body": "Relaxed",
    "requirements": "Likes operating fan",
    "effects": "Happy +5 pp."
  },
  {
    "id": 25,
    "name": "Fan Noise Discomfort",
    "text": "(Horse Name) repeatedly glanced toward the operating fan and shifted away.",
    "body": "Nervous",
    "requirements": "Dislikes fan",
    "effects": "Uncomfortable +5 pp."
  },
  {
    "id": 26,
    "name": "Rope Toy Interaction",
    "text": "(Horse Name) investigated and gently nudged the hanging rope.",
    "body": "Interested",
    "requirements": "Likes hanging rope",
    "effects": "Happy +5 pp."
  },
  {
    "id": 27,
    "name": "Rope Toy Startle",
    "text": "(Horse Name) startled when the rope moved and avoided that area.",
    "body": "Nervous",
    "requirements": "Dislikes hanging rope",
    "effects": "Distress +5 pp."
  },
  {
    "id": 28,
    "name": "Quiet Divider Appreciation",
    "text": "(Horse Name) relaxed in the quieter portion of the stall.",
    "body": "Relaxed",
    "requirements": "Likes divider",
    "effects": "Happy +5 pp."
  },
  {
    "id": 29,
    "name": "Divider Discomfort",
    "text": "(Horse Name) repeatedly checked the partition and seemed unsettled by the reduced view.",
    "body": "Uncomfortable",
    "requirements": "Dislikes divider",
    "effects": "Uncomfortable +5 pp."
  },
  {
    "id": 30,
    "name": "Radio Comfort",
    "text": "(Horse Name) remained relaxed while the stable radio played quietly.",
    "body": "Relaxed",
    "requirements": "Likes radio and radio ON",
    "effects": "Happy +3 pp."
  },
  {
    "id": 31,
    "name": "Radio Irritation",
    "text": "(Horse Name) raised its head repeatedly and appeared unsettled by the sound.",
    "body": "Nervous",
    "requirements": "Dislikes radio and radio ON",
    "effects": "Distress +7 pp."
  },
  {
    "id": 32,
    "name": "Friendly Stall Greeting",
    "text": "(Horse Name) greeted (Other Horse) through the stall partition.",
    "body": "Socially Content",
    "requirements": "Compatible neighboring horse",
    "effects": "Relationship +1."
  },
  {
    "id": 33,
    "name": "Resting Beside Neighbor",
    "text": "(Horse Name) settled near the partition beside (Other Horse).",
    "body": "Socially Content",
    "requirements": "Friends",
    "effects": "No Effect."
  },
  {
    "id": 34,
    "name": "Curious Neighbor Watching",
    "text": "(Horse Name) watched (Other Horse) moving around the neighboring stall.",
    "body": "Interested",
    "requirements": "Adjacent horse present",
    "effects": "No Effect."
  },
  {
    "id": 35,
    "name": "Pinned Ears at Neighbor",
    "text": "(Horse Name) pinned its ears when (Other Horse) approached the partition.",
    "body": "Agitated",
    "requirements": "Negative relationship",
    "effects": "Relationship -1."
  },
  {
    "id": 36,
    "name": "Partition Disagreement",
    "text": "(Horse Name) and (Other Horse) exchanged tense gestures before moving apart.",
    "body": "Agitated",
    "requirements": "Incompatible neighbors",
    "effects": "Relationship -2."
  },
  {
    "id": 37,
    "name": "Calling for Companions",
    "text": "(Horse Name) called repeatedly toward nearby horses, appearing unsettled.",
    "body": "Nervous",
    "requirements": "Social 75+ and isolated",
    "effects": "Distress +5 pp."
  },
  {
    "id": 38,
    "name": "Comfortable Alone",
    "text": "(Horse Name) rested peacefully without seeking attention from neighboring horses.",
    "body": "Relaxed",
    "requirements": "Social 0-25",
    "effects": "Happy +3 pp."
  },
  {
    "id": 39,
    "name": "Seeking Favorite Neighbor",
    "text": "(Horse Name) repeatedly looked toward (Other Horse)'s stall and settled nearby.",
    "body": "Socially Content",
    "requirements": "Relationship 76+",
    "effects": "Happy +3 pp."
  },
  {
    "id": 40,
    "name": "Missing a Companion",
    "text": "(Horse Name) appeared restless and repeatedly called toward the usual neighboring stall.",
    "body": "Nervous",
    "requirements": "Bonded pair separated",
    "effects": "Distress +5 pp once per day."
  },
  {
    "id": 41,
    "name": "Energetic Restlessness",
    "text": "(Horse Name) moved around the stall with alert ears and frequent changes of direction.",
    "body": "Agitated/Playful",
    "requirements": "Energetic/Excitable",
    "effects": "No automatic mood change."
  },
  {
    "id": 42,
    "name": "Spooky Reaction",
    "text": "(Horse Name) startled at a nearby sound before carefully investigating the source.",
    "body": "Nervous",
    "requirements": "Spooky",
    "effects": "small temporary stress observation, no permanent modifier."
  },
  {
    "id": 43,
    "name": "Sensitive Tension",
    "text": "(Horse Name) became tense during nearby commotion and needed time to settle.",
    "body": "Nervous",
    "requirements": "Sensitive",
    "effects": "Distress +3 pp if repeated."
  },
  {
    "id": 44,
    "name": "Bomb-Proof Calmness",
    "text": "(Horse Name) remained quiet despite activity around the barn.",
    "body": "Relaxed",
    "requirements": "Bomb-Proof",
    "effects": "No Effect."
  },
  {
    "id": 45,
    "name": "Lazy Afternoon",
    "text": "(Horse Name) spent most of the afternoon resting and showed little interest in the surroundings.",
    "body": "Tired/Relaxed",
    "requirements": "Lazy",
    "effects": "No Effect."
  },
  {
    "id": 46,
    "name": "Unfocused Investigation",
    "text": "(Horse Name) moved between several objects without settling on one activity.",
    "body": "Interested",
    "requirements": "Unfocused",
    "effects": "No Effect."
  },
  {
    "id": 47,
    "name": "Stubborn Resistance",
    "text": "(Horse Name) resisted a routine handling request before eventually settling.",
    "body": "Agitated",
    "requirements": "Stubborn",
    "effects": "No skill change; possible trainer note."
  },
  {
    "id": 48,
    "name": "Hot-Blooded Tension",
    "text": "(Horse Name) paced briefly and reacted strongly to movement near the stall.",
    "body": "Agitated",
    "requirements": "Hot-Blooded",
    "effects": "Distress +3 pp if repeated."
  },
  {
    "id": 49,
    "name": "Happy Greeting",
    "text": "(Horse Name) approached the stall door with a relaxed expression and curious ears.",
    "body": "Relaxed",
    "requirements": "Happy mood",
    "effects": "No Effect."
  },
  {
    "id": 50,
    "name": "Grumpy Avoidance",
    "text": "(Horse Name) moved away from the door and showed little interest in interaction.",
    "body": "Agitated",
    "requirements": "Grumpy/Bad Mood",
    "effects": "No Effect."
  },
  {
    "id": 51,
    "name": "Uncomfortable Shifting",
    "text": "(Horse Name) repeatedly shifted weight and appeared unable to settle comfortably.",
    "body": "Uncomfortable",
    "requirements": "Uncomfortable mood",
    "effects": "Generate trainer observation, no automatic new diagnosis."
  },
  {
    "id": 52,
    "name": "Reduced Energy",
    "text": "(Horse Name) moved slowly and rested more than usual.",
    "body": "Tired",
    "requirements": "No Energy",
    "effects": "No Effect."
  },
  {
    "id": 53,
    "name": "Injury Rest",
    "text": "(Horse Name) spent the period resting as required by the veterinary recovery plan.",
    "body": "Tired/Neutral",
    "requirements": "Diagnosed injury/stall rest",
    "effects": "No Effect."
  },
  {
    "id": 54,
    "name": "Unusual Restlessness",
    "text": "(Horse Name) paced intermittently and struggled to settle.",
    "body": "Agitated",
    "requirements": "Negative mood",
    "effects": "Add trainer note if repeated three eligible days."
  },
  {
    "id": 55,
    "name": "Comfortable Stable Routine",
    "text": "(Horse Name) followed a quiet routine of eating, resting and observing the stable.",
    "body": "Relaxed",
    "requirements": "Appropriate housing/enrichment",
    "effects": "No Effect."
  }
];
const TURNOUT_BEHAVIOR_TEMPLATES=[
  {
    "id": 1,
    "name": "Quiet Grazing",
    "text": "(Horse Name) grazed with a lowered head and relaxed ears.",
    "body": "Relaxed",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 2,
    "name": "Searching for Grass",
    "text": "(Horse Name) wandered between grazing patches, investigating the ground.",
    "body": "Interested",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 3,
    "name": "Resting in Shade",
    "text": "(Horse Name) moved into a shaded area and rested quietly.",
    "body": "Relaxed",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 4,
    "name": "Standing in Sunlight",
    "text": "(Horse Name) stood comfortably in an open part of the pasture.",
    "body": "Relaxed",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 5,
    "name": "Rolling",
    "text": "(Horse Name) rolled in the grass, then stood and shook itself off.",
    "body": "Relaxed",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 6,
    "name": "Quiet Walking",
    "text": "(Horse Name) wandered slowly along the pasture boundary.",
    "body": "Neutral",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 7,
    "name": "Investigating Fence",
    "text": "(Horse Name) approached the fence and briefly examined the surroundings.",
    "body": "Interested",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 8,
    "name": "Drinking Water",
    "text": "(Horse Name) drank from the water trough before returning to grazing.",
    "body": "Neutral",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 9,
    "name": "Afternoon Rest",
    "text": "(Horse Name) rested quietly between periods of grazing.",
    "body": "Relaxed",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 10,
    "name": "Short Canter",
    "text": "(Horse Name) cantered briefly across the field before slowing down.",
    "body": "Playful",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 11,
    "name": "Playful Buck",
    "text": "(Horse Name) gave a playful buck before returning to normal activity.",
    "body": "Playful",
    "requirements": "Energetic/Excitable/young",
    "effects": "No Effect."
  },
  {
    "id": 12,
    "name": "Investigating Sounds",
    "text": "(Horse Name) raised its head and listened before relaxing again.",
    "body": "Interested",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 13,
    "name": "Watching the Barn",
    "text": "(Horse Name) stood near the gate, observing activity around the barn.",
    "body": "Interested",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 14,
    "name": "Quiet Fence Rest",
    "text": "(Horse Name) remained near the fence for some time without interacting with other horses.",
    "body": "Relaxed",
    "requirements": "",
    "effects": "No Effect."
  },
  {
    "id": 15,
    "name": "Long Grazing Session",
    "text": "(Horse Name) spent most of the turnout grazing calmly with short rest breaks.",
    "body": "Relaxed",
    "requirements": "5+ hours turnout",
    "effects": "No Effect."
  },
  {
    "id": 16,
    "name": "Friendly Greeting",
    "text": "(Horse Name) approached (Other Horse) and exchanged a calm greeting.",
    "body": "Socially Content",
    "requirements": "Compatible pair",
    "effects": "Relationship +1."
  },
  {
    "id": 17,
    "name": "Mutual Grooming",
    "text": "(Horse Name) and (Other Horse) gently groomed each other's necks.",
    "body": "Socially Content",
    "requirements": "Relationship +11 or greater",
    "effects": "Relationship +3."
  },
  {
    "id": 18,
    "name": "Grazing Side by Side",
    "text": "(Horse Name) grazed peacefully beside (Other Horse).",
    "body": "Socially Content",
    "requirements": "Compatible pair",
    "effects": "Relationship +1."
  },
  {
    "id": 19,
    "name": "Following Companion",
    "text": "(Horse Name) followed (Other Horse) across the pasture.",
    "body": "Socially Content",
    "requirements": "Social 50+ or Friends",
    "effects": "Relationship +1."
  },
  {
    "id": 20,
    "name": "Resting Together",
    "text": "(Horse Name) rested close to (Other Horse).",
    "body": "Socially Content",
    "requirements": "Friends",
    "effects": "Relationship +2."
  },
  {
    "id": 21,
    "name": "Playful Chase",
    "text": "(Horse Name) and (Other Horse) chased each other playfully without aggression.",
    "body": "Playful",
    "requirements": "Compatible playful pair",
    "effects": "Relationship +2."
  },
  {
    "id": 22,
    "name": "Shared Water Break",
    "text": "(Horse Name) and (Other Horse) drank peacefully near each other.",
    "body": "Neutral/Positive",
    "requirements": "Compatible pair",
    "effects": "Relationship +1."
  },
  {
    "id": 23,
    "name": "Gentle Nuzzling",
    "text": "(Horse Name) gently nuzzled (Other Horse).",
    "body": "Socially Content",
    "requirements": "Friends/Bonded",
    "effects": "Relationship +2."
  },
  {
    "id": 24,
    "name": "Companion Comfort",
    "text": "(Other Horse) remained nearby while (Horse Name) settled after becoming nervous.",
    "body": "Relaxed",
    "requirements": "Nervous horse with compatible calm companion",
    "effects": "Relationship +3."
  },
  {
    "id": 25,
    "name": "Quiet Group Grazing",
    "text": "(Horse Name) grazed peacefully as part of a relaxed group.",
    "body": "Socially Content",
    "requirements": "Three or more compatible horses",
    "effects": "Eligible pairs +1."
  },
  {
    "id": 26,
    "name": "Play Invitation Accepted",
    "text": "(Horse Name) approached (Other Horse), who responded with playful movement.",
    "body": "Playful",
    "requirements": "Compatible pair",
    "effects": "Relationship +2."
  },
  {
    "id": 27,
    "name": "Reuniting With Friend",
    "text": "(Horse Name) greeted (Other Horse) enthusiastically after their time apart.",
    "body": "Socially Content",
    "requirements": "Previously separated Friends",
    "effects": "Relationship +3 once per reunion."
  },
  {
    "id": 28,
    "name": "Bonded Companion Reunion",
    "text": "(Horse Name) sought out (Other Horse) immediately after entering the pasture.",
    "body": "Socially Content",
    "requirements": "Bonded pair",
    "effects": "Relationship +4 once per reunion."
  },
  {
    "id": 29,
    "name": "Friendly Standing Guard",
    "text": "(Horse Name) remained alert while (Other Horse) rested nearby.",
    "body": "Socially Content",
    "requirements": "Friends",
    "effects": "Relationship +2."
  },
  {
    "id": 30,
    "name": "Trusting New Companion",
    "text": "(Horse Name) allowed (Other Horse) to approach without moving away.",
    "body": "Relaxed",
    "requirements": "Spooky/Sensitive with improving relationship",
    "effects": "Relationship +3."
  },
  {
    "id": 31,
    "name": "Peaceful Individual Turnout",
    "text": "(Horse Name) grazed comfortably without seeking company.",
    "body": "Relaxed",
    "requirements": "Social 0-25",
    "effects": "Happy +3 pp."
  },
  {
    "id": 32,
    "name": "Enjoying Personal Space",
    "text": "(Horse Name) moved freely around the individual paddock and appeared relaxed.",
    "body": "Relaxed",
    "requirements": "Social 0-10",
    "effects": "Happy +3 pp."
  },
  {
    "id": 33,
    "name": "Independent Exploration",
    "text": "(Horse Name) explored several areas of the paddock alone.",
    "body": "Interested",
    "requirements": "Solo pasture",
    "effects": "No Effect."
  },
  {
    "id": 34,
    "name": "Quiet Solo Rest",
    "text": "(Horse Name) rested peacefully without other horses nearby.",
    "body": "Relaxed",
    "requirements": "Solo pasture",
    "effects": "No Effect."
  },
  {
    "id": 35,
    "name": "Watching Other Pastures",
    "text": "(Horse Name) watched horses in a neighboring pasture from the fence.",
    "body": "Interested",
    "requirements": "Solo, other horses visible",
    "effects": "No relationship change."
  },
  {
    "id": 36,
    "name": "Calling for Company",
    "text": "(Horse Name) called toward other horses while standing near the gate.",
    "body": "Nervous",
    "requirements": "Social 50+ alone",
    "effects": "Distress +5 pp."
  },
  {
    "id": 37,
    "name": "Restless Fence Walking",
    "text": "(Horse Name) repeatedly walked along the fence, appearing unsettled.",
    "body": "Agitated",
    "requirements": "Social 75+ alone",
    "effects": "Distress +5 pp."
  },
  {
    "id": 38,
    "name": "Searching for Companions",
    "text": "(Horse Name) repeatedly approached the gate and looked toward nearby horses.",
    "body": "Nervous",
    "requirements": "Social 75+ without enough companions",
    "effects": "Distress +5 pp."
  },
  {
    "id": 39,
    "name": "Settling Alone",
    "text": "(Horse Name) spent time exploring before eventually settling to graze.",
    "body": "Relaxed",
    "requirements": "Social 25-50 alone",
    "effects": "No Effect."
  },
  {
    "id": 40,
    "name": "Persistent Loneliness",
    "text": "(Horse Name) remained restless and called repeatedly during turnout.",
    "body": "Nervous",
    "requirements": "Repeated unsuitable solitary turnout",
    "effects": "use existing Social dissatisfaction effect, do not stack it twice."
  },
  {
    "id": 41,
    "name": "Pinned Ears",
    "text": "(Horse Name) pinned its ears when (Other Horse) approached.",
    "body": "Agitated",
    "requirements": "Negative relationship",
    "effects": "Relationship -2."
  },
  {
    "id": 42,
    "name": "Territorial Warning",
    "text": "(Horse Name) warned (Other Horse) away from a preferred grazing area.",
    "body": "Agitated",
    "requirements": "Territorial/incompatible horses",
    "effects": "Relationship -3."
  },
  {
    "id": 43,
    "name": "Water Trough Disagreement",
    "text": "(Horse Name) and (Other Horse) briefly argued near the water trough.",
    "body": "Agitated",
    "requirements": "Shared water access",
    "effects": "Relationship -3."
  },
  {
    "id": 44,
    "name": "Unwanted Attention",
    "text": "(Horse Name) moved away repeatedly while (Other Horse) attempted to approach.",
    "body": "Uncomfortable",
    "requirements": "Mismatched Social",
    "effects": "Relationship -2."
  },
  {
    "id": 45,
    "name": "Aggressive Chase",
    "text": "(Horse Name) chased (Other Horse) away before both separated.",
    "body": "Agitated",
    "requirements": "Negative relationship",
    "effects": "Relationship -5."
  },
  {
    "id": 46,
    "name": "Biting Threat",
    "text": "(Horse Name) snapped toward (Other Horse), who moved away.",
    "body": "Agitated",
    "requirements": "Conflict",
    "effects": "Relationship -5."
  },
  {
    "id": 47,
    "name": "Kicking Threat",
    "text": "(Horse Name) threatened to kick when (Other Horse) approached from behind.",
    "body": "Agitated",
    "requirements": "Conflict",
    "effects": "Relationship -4."
  },
  {
    "id": 48,
    "name": "Actual Kick",
    "text": "(Horse Name) kicked (Other Horse) during an escalating disagreement.",
    "body": "Agitated",
    "requirements": "Existing serious conflict roll",
    "effects": "Relationship -10 and existing injury calculation."
  },
  {
    "id": 49,
    "name": "Serious Fight",
    "text": "(Horse Name) and (Other Horse) fought before separating.",
    "body": "Agitated",
    "requirements": "Existing fight roll",
    "effects": "Relationship -15 and existing injury calculation."
  },
  {
    "id": 50,
    "name": "Avoiding Rival",
    "text": "(Horse Name) moved away after noticing (Other Horse) nearby.",
    "body": "Nervous",
    "requirements": "Negative relationship",
    "effects": "No additional relationship change."
  },
  {
    "id": 51,
    "name": "Overcrowding Stress",
    "text": "(Horse Name) repeatedly moved away from other horses and struggled to settle.",
    "body": "Uncomfortable",
    "requirements": "Existing pasture overcrowding",
    "effects": "apply existing overcrowding penalty once."
  },
  {
    "id": 52,
    "name": "Conflict Over Space",
    "text": "(Horse Name) pushed (Other Horse) away from a narrow area.",
    "body": "Agitated",
    "requirements": "Crowded/incompatible",
    "effects": "Relationship -3."
  },
  {
    "id": 53,
    "name": "Spooky Startle",
    "text": "(Horse Name) startled at an unexpected sound before cautiously relaxing.",
    "body": "Nervous",
    "requirements": "Spooky",
    "effects": "No automatic injury."
  },
  {
    "id": 54,
    "name": "Sensitive Withdrawal",
    "text": "(Horse Name) moved away when another horse approached too abruptly.",
    "body": "Nervous",
    "requirements": "Sensitive",
    "effects": "Relationship -2 if the other horse caused the incident."
  },
  {
    "id": 55,
    "name": "Bomb-Proof Calmness",
    "text": "(Horse Name) remained relaxed despite movement and activity in the pasture.",
    "body": "Relaxed",
    "requirements": "Bomb-Proof",
    "effects": "No Effect."
  },
  {
    "id": 56,
    "name": "Energetic Running",
    "text": "(Horse Name) ran several playful laps before settling.",
    "body": "Playful",
    "requirements": "Energetic",
    "effects": "No Effect."
  },
  {
    "id": 57,
    "name": "Excitable Play Invitation",
    "text": "(Horse Name) repeatedly invited another horse to play.",
    "body": "Playful",
    "requirements": "Excitable",
    "effects": "Relationship +2 if accepted, -2 if rejected aggressively."
  },
  {
    "id": 58,
    "name": "Lazy Grazing Afternoon",
    "text": "(Horse Name) spent most of the turnout grazing slowly and resting.",
    "body": "Relaxed",
    "requirements": "Lazy",
    "effects": "No Effect."
  },
  {
    "id": 59,
    "name": "Hot-Blooded Tension",
    "text": "(Horse Name) reacted sharply when another horse entered its personal space.",
    "body": "Agitated",
    "requirements": "Hot-Blooded",
    "effects": "Relationship -4 if a conflict develops."
  },
  {
    "id": 60,
    "name": "Growing Social Confidence",
    "text": "(Horse Name) cautiously approached another horse and remained relaxed during the interaction.",
    "body": "Socially Content",
    "requirements": "Spooky/Sensitive with positive social experience",
    "effects": "Relationship +3."
  }
];

const TURNOUT_ALIAS={1:21,3:26,5:22,7:24,8:23,9:29,10:30,13:25,16:4,17:2,18:1,19:3,20:5,21:6,22:7,23:8,24:9,25:10,26:13,27:14,28:15,29:11,30:19,36:60,37:61,41:36,42:37,45:41,46:42,47:43,48:44,49:46,50:52,51:0,52:50,53:76,54:77,55:78,56:79,57:83,58:80,59:84,60:19};
const TURNOUT_NEW_IDS=[2,4,6,11,12,14,15,31,32,33,34,35,38,39,40,43,44];
for(const t of TURNOUT_BEHAVIOR_TEMPLATES){t.sourceId=TURNOUT_ALIAS[t.id]??1000+t.id;if(!TURNOUT_NEW_IDS.includes(t.id))continue;const negative=[38,40,43,44].includes(t.id),soloOnly=[31,32,33,34,35,39,40].includes(t.id);PASTURE_EVENT_LIBRARY.push({id:t.sourceId,title:t.name,category:negative?'Negative':soloOnly?'Individual Turnout':'Neutral',mode:[43,44].includes(t.id)?'pair':'solo',delta:t.id===43?-3:t.id===44?-2:0,texts:[t.text.replaceAll('(Horse Name)','{a}').replaceAll('(Other Horse)','{b}'),t.text.replaceAll('(Horse Name)','{a}').replaceAll('(Other Horse)','{b}')+' This was observed during the allotted turnout.'],behaviorTemplate:t.id});}
function behaviorSafeBody(h,body){const mood=String(h.mood||'Neutral').toLowerCase();if(['distress','uncomfortable'].includes(mood)&&/relaxed|content|playful/i.test(body))return mood==='distress'?'Agitated':'Uncomfortable';if(mood==='no energy'&&/playful/i.test(body))return 'Tired';return body.split('/')[0].trim();}
function behaviorText(text,h,other=null){const mare=h.gender==='Mare';return text.replaceAll('(Horse Name)',h.name).replaceAll('(Other Horse)',other?.name||'a former companion').replaceAll('its ',mare?'her ':'his ').replaceAll('itself',mare?'herself':'himself');}
function behaviorRange(hours){return hours<.5?[0,0]:hours<2?[0,1]:hours<5?[1,2]:hours<9?[2,3]:hours<=14?[3,4]:[3,5];}
function mgPastureFraction(h,hour){if(!pastureMedicalEligible(h))return 0;const start=Number.isFinite(h.turnoutStartHour)?h.turnoutStartHour:8,overlap=Math.max(0,Math.min(hour%24+1,start+pastureTurnoutHours(h))-Math.max(hour%24,start));if(!overlap)return 0;if(!app.currentBarn.pasturesEnabled)return Number(h.turnoutAssignmentHours)>0||Number(h.turnoutHours)>0?overlap:0;const b=effectivePastureBooking(h),p=app.currentBarn.pastures?.find(p=>p.id===b?.pastureId);return b?.barnId===app.currentBarn.id&&p&&pastureAttendance(h,p,hour+Math.max(0,start-hour%24))?overlap:0;}
function mgStallFraction(h,hour){return 1-mgPastureFraction(h,hour);}
function mgStallIntervals(h,hour){const fraction=mgPastureFraction(h,hour);if(!fraction)return [[0,1]];const start=Math.max(0,(h.turnoutStartHour??8)-hour%24),end=start+fraction;return [[0,start],[end,1]].filter(([a,b])=>b>a);}
function mgSharedStallInterval(horses,hour){let spans=[[0,1]];for(const h of horses)spans=spans.flatMap(([a,b])=>mgStallIntervals(h,hour).map(([x,y])=>[Math.max(a,x),Math.min(b,y)]).filter(([x,y])=>y>x));return spans.sort((a,b)=>(b[1]-b[0])-(a[1]-a[0]))[0]||null;}
function behaviorTrack(h,location,hour,minutes,placeId){if(minutes<=0)return;h.behaviorVisits=h.behaviorVisits||{};let v=h.behaviorVisits[location];const day=Math.floor(hour/24);if(!v||v.lastHour!==hour-1||v.placeId!==placeId||v.day!==day)v={day,start:hour,lastHour:hour,minutes:0,count:0,roll:stallRandom(),placeId};if(v.lastHour===hour&&v.minutes>0)return;v.minutes+=minutes;v.lastHour=hour;h.behaviorVisits[location]=v;}
function behaviorCanLog(h,location,hour){const v=h.behaviorVisits?.[location];if(!v||v.day!==Math.floor(hour/24))return false;const [,max]=behaviorRange(v.minutes/60);return v.count<max;}
function behaviorUseQuota(h,location){const v=h.behaviorVisits?.[location];if(v)v.count++;}
function behaviorStore(entry,horses,location,body='Interested',feedback='Unknown',duration=60,source='stall'){const s=mgState();s.behaviorEvents=s.behaviorEvents||{};const id=entry.id;s.behaviorEvents[id]={id,source,sourceId:entry.id,time:entry.time,location,duration,body,feedback,observations:Object.fromEntries(horses.map(h=>[h.id,{mood:h.mood,body:behaviorSafeBody(h,body)}])),description:entry.description,effects:entry.effects,title:entry.title,important:Boolean(entry.important)};for(const h of horses){const key=entry.important?'behaviorImportantIds':'behaviorLogIds';h[key]=h[key]||[];if(!h[key].includes(id))h[key].push(id);if(!entry.important&&h[key].length>100)h[key].splice(0,h[key].length-100);}return s.behaviorEvents[id];}
function behaviorQueueMood(h,key,mood,pp,hour){h.pendingBehaviorMood=h.pendingBehaviorMood||{};h.pendingBehaviorMood[key]={mood,pp,hour};}
function behaviorMoodMods(h){const out={happy:0,uncomfortable:0,distress:0,sources:[]};for(const [key,e]of Object.entries(h.pendingBehaviorMood||{})){out[e.mood.toLowerCase()]+=e.pp;out.sources.push({item:key,mood:e.mood,pp:e.pp});}return out;}
const BEHAVIOR_BASE_RESOLVE_MOOD=mgResolveMood;
mgResolveMood=function(h){const result=BEHAVIOR_BASE_RESOLVE_MOOD(h);h.pendingBehaviorMood={};return result;};
const BEHAVIOR_BASE_STALL_MOOD=stallMoodModifiers;
stallMoodModifiers=function(h){const out=BEHAVIOR_BASE_STALL_MOOD(h),b=behaviorMoodMods(h);out.happy+=b.happy;out.uncomfortable+=b.uncomfortable;out.distress+=b.distress;out.sources.push(...b.sources);return out;};
const BEHAVIOR_PASTURE_ELIGIBLE=pastureEventEligible;
pastureEventEligible=function(e,c){if(e.id<1000)return BEHAVIOR_PASTURE_ELIGIBLE(e,c);const n=e.behaviorTemplate,h=c.a,solo=c.group.length===1;if([31,32,33,34,35,39,40].includes(n)&&!solo)return false;if(n===11)return ['Energetic','Excitable'].includes(h.personality)||h.age<6;if(n===15)return c.group.includes(h)&&(h.behaviorVisits?.Pasture?.minutes||0)>=300;if(n===31)return h.social<25;if(n===32)return h.social<=10;if(n===35)return app.horses.some(o=>o.id!==h.id&&pastureHorseAvailable(o)&&mgPastureFraction(o,c.hour)>0&&!pastureSameAssignment(h,o));if(n===38)return h.social>=75&&c.group.filter(o=>o.id!==h.id&&(existingPasturePair(h,o)?.score||0)>=-40).length<2;if(n===39)return h.social>=25&&h.social<50;if(n===40)return h.social>=50&&(h.solitaryTurnoutDays||0)>=3;if(n===43)return Boolean(c.b)&&c.p.hasWater!==false;if(n===44)return Boolean(c.b)&&h.social<25&&c.b.social>=50;return true;};
const BEHAVIOR_BASE_PASTURE_RECORD=pastureRecordEvent;
pastureRecordEvent=function(event,horses,p,hour,effects=[],important=false,pair=null,text=''){
 const isStall=/^Stall|^First Stall/.test(event.title)||String(p?.name||'').startsWith('Stall'),location=isStall?'Stall':'Pasture';
 const administrative=['Missed Turnout','Separation','Time Apart','Shared Turnout Resumed'].includes(event.title),summary=event.title==='Daily Turnout Summary';
 if(!important&&!administrative&&horses.some(h=>!behaviorCanLog(h,location,hour)))return {id:'suppressed',horses:horses.map(h=>({id:h.id,name:h.name})),suppressed:true};
 const template=TURNOUT_BEHAVIOR_TEMPLATES.find(t=>t.sourceId===event.id),negative=event.category==='Negative',body=template?.body||(negative?'Agitated':event.category==='Positive'?'Socially Content':'Interested');
 let override=text;if(!override&&event.category==='Positive'&&horses.some(h=>h.mood==='Distress'))override='During a temporary calmer moment, '+pastureEventText(pasturePick(event.texts),horses,horses);
 const n=event.behaviorTemplate;if(n===31||n===32)effects=[...effects,'Happy +3 pp at next mood update'];if(n===38||event.id===60||event.id===61&&horses[0]?.social>=75)effects=[...effects,'Distress +5 pp at next mood update'];
 const entry=BEHAVIOR_BASE_PASTURE_RECORD(event,horses,p,hour,effects,important||administrative,pair,override);
 if(entry.important||!summary){if(!entry.important)horses.forEach(h=>behaviorUseQuota(h,location));const duration=administrative?0:Math.min(60,...horses.map(h=>(location==='Stall'?mgStallFraction(h,Math.floor(hour)):pastureHourFraction(h,Math.floor(hour)))*60));behaviorStore(entry,horses,location,body,pair?(pair.score>40?'Liked':pair.score< -40?'Disliked':'Neutral'):'Unknown',duration,'pasture');}
 if(n===31||n===32)for(const h of horses)behaviorQueueMood(h,event.title,'Happy',3,hour);if(n===38||event.id===60||event.id===61&&horses[0]?.social>=75)behaviorQueueMood(horses[0],event.title,'Distress',5,hour);
 return entry;
};
const BEHAVIOR_BASE_STALL_LOG=stallLog;
stallLog=function(horses,title,description,hour,effects=[],important=false){if(!important&&horses.some(h=>!behaviorCanLog(h,'Stall',hour)))return {id:'suppressed',suppressed:true,effects,description};const span=mgSharedStallInterval(horses,Math.floor(hour)),at=span?Math.floor(hour)+span[0]:hour;const entry=BEHAVIOR_BASE_STALL_LOG(horses,title,description,at,effects,important);entry.duration=span?(span[1]-span[0])*60:0;if(!important)horses.forEach(h=>behaviorUseQuota(h,'Stall'));const body=/Disagreement|Pinned|Restless/.test(title)?'Agitated':/Greeting|Companionship|Neighbor/.test(title)?'Socially Content':'Interested';behaviorStore(entry,horses,'Stall',body,'Unknown',entry.duration,'stall');return entry;};
function stallBehaviorEligible(t,h,stall,neighbors,hour){const id=t.id,p=mgPersonality(h),m=String(h.mood||'Neutral').toLowerCase(),medical=!pastureMedicalEligible(h),supplies=stall?stallActiveSupplies(stall):[],has=(type,pref)=>supplies.some(i=>i.type===type&&(!pref||h.decorationPreferences?.[type]===pref));if(id===32)return neighbors.some(o=>(existingPasturePair(h,o)?.score||0)>=41);if(id===35)return neighbors.some(o=>(existingPasturePair(h,o)?.score||0)<0);if(id===36)return neighbors.some(o=>(existingPasturePair(h,o)?.score||0)<=-41);if(m==='distress'&&/Relaxed|Playful|Socially Content/.test(t.body))return false;if(medical&&[8,14,17,26,41,46,48,54].includes(id))return false;
 if(id===1)return ['neutral','happy'].includes(m);if(id===2)return ['neutral','no energy'].includes(m);if(id===3)return ['happy','neutral','motivated','try-hard'].includes(m);if(id===5)return stall?.hasOpening!==false;if(id===6)return Boolean(stall?.decorations.feeder);if(id===7)return stall?.hasWater!==false;if(id===8)return !medical;if(id===9)return stall?.hasBedding!==false;if(id===10)return ['happy','neutral','motivated','try-hard'].includes(m)&&hour%24>=17;
 const decorations={11:['Likit Treat Holder','Likes'],12:['Likit Treat Holder','Neutral'],13:['Likit Treat Holder','Dislikes'],14:['Hanging Stall Ball','Likes'],15:['Hanging Stall Ball','Dislikes'],16:['Soft Stall Toy','Likes'],17:['Jolly Ball','Likes'],18:['Jolly Ball','Dislikes'],19:['Slow Hay Feeder','Likes'],20:['Slow Hay Feeder','Dislikes'],21:['Salt Lick','Likes'],22:['Stall Mirror','Likes'],23:['Stall Mirror','Dislikes'],24:['Stall Fan','Likes'],25:['Stall Fan','Dislikes'],26:['Hanging Rope Toy','Likes'],27:['Hanging Rope Toy','Dislikes'],28:['Quiet Corner Divider','Likes'],29:['Quiet Corner Divider','Dislikes'],30:['Stable Radio','Likes'],31:['Stable Radio','Dislikes']};if(decorations[id])return has(...decorations[id]);
 if(id===33)return neighbors.some(o=>(existingPasturePair(h,o)?.score||0)>=41);if(id===34)return neighbors.length>0;if(id===37)return h.social>=75&&!neighbors.length;if(id===38)return h.social<=25;if(id===39)return neighbors.some(o=>(existingPasturePair(h,o)?.score||0)>=76);if(id===40)return Boolean(h.favoriteStallNeighborId&&!neighbors.some(n=>n.id===h.favoriteStallNeighborId)&&h.missingStallCompanionDay!==Math.floor(hour/24));if(id===41)return ['Energetic','Excitable'].includes(p);if(id===42)return p==='Spooky';if(id===43)return p==='Sensitive'&&(neighbors.length>0||supplies.some(i=>mgType(i.type).tags?.includes('noisy')));if(id===44)return p==='Bomb-Proof';if(id===45)return p==='Lazy';if(id===46)return p==='Unfocused';if(id===47)return p==='Stubborn'&&h.lastHandlingHour===hour;if(id===48)return p==='Hot-Blooded'&&neighbors.length>0;if(id===49)return m==='happy';if(id===50)return ['grumpy','bad moods'].includes(m);if(id===51)return m==='uncomfortable';if(id===52)return m==='no energy';if(id===53)return medical;if(id===54)return NEGATIVE_MOODS.map(x=>x.toLowerCase()).includes(m);if(id===55)return !NEGATIVE_MOODS.map(x=>x.toLowerCase()).includes(m)&&((h.feedPlan||[]).length>0||h.managed?.fed);if(id===56)return Boolean(stallMother(h));return true;}
STALL_BEHAVIOR_TEMPLATES.push({id:56,name:'Mother and Foal Resting',text:'(Horse Name) rested beside mother (Other Horse) in their shared stall.',body:'Relaxed',effects:'No numerical effect.'});
function detailedStallBehavior(h,stall,hour){const neighbors=stallNeighbors(h,hour).filter(o=>mgSharedStallInterval([h,o],hour)),pool=STALL_BEHAVIOR_TEMPLATES.filter(t=>![32,35,36].includes(t.id)&&stallBehaviorEligible(t,h,stall,neighbors,hour));if(!pool.length)return;const medical=!pastureMedicalEligible(h);let candidates=medical?pool.filter(t=>t.id===53):pool;const t=candidates[Math.floor(stallRandom()*candidates.length)];let other=null;if([33,34,39].includes(t.id))other=neighbors.find(o=>(existingPasturePair(h,o)?.score||0)>=(t.id===39?76:t.id===33?41:-100));if(t.id===56)other=stallMother(h);const participants=other?[h,other]:[h];if(participants.some(x=>!behaviorCanLog(x,'Stall',hour)))return;const effects=[],decoration=t.id>=11&&t.id<=31;let feedback='Unknown';if(decoration){const item=stallActiveSupplies(stall).find(i=>i.type===({11:'Likit Treat Holder',12:'Likit Treat Holder',13:'Likit Treat Holder',14:'Hanging Stall Ball',15:'Hanging Stall Ball',16:'Soft Stall Toy',17:'Jolly Ball',18:'Jolly Ball',19:'Slow Hay Feeder',20:'Slow Hay Feeder',21:'Salt Lick',22:'Stall Mirror',23:'Stall Mirror',24:'Stall Fan',25:'Stall Fan',26:'Hanging Rope Toy',27:'Hanging Rope Toy',28:'Quiet Corner Divider',29:'Quiet Corner Divider',30:'Stable Radio',31:'Stable Radio'})[t.id]);if(item){h.decorationObservations[item.type]=(h.decorationObservations[item.type]||0)+1;const pref=h.decorationPreferences[item.type];feedback=h.decorationObservations[item.type]>=3?pref==='Likes'?'Liked':pref==='Dislikes'?'Disliked':'Neutral':'Unknown';const m=stallEnrichment(h);effects.push(`Current enrichment weighting: Happy +${m.happy} pp; Uncomfortable +${m.uncomfortable} pp; Distress +${m.distress} pp (enrichment caps apply)`);h.decorationTrainerHints=h.decorationTrainerHints||{};h.decorationTrainerHints[item.type]=pref==='Likes'?`${h.name} appears to enjoy the ${item.type}.`:pref==='Dislikes'?`${h.name} seems uncomfortable around the ${item.type}. Consider removing it.`:`${h.name} doesn't seem particularly interested in the ${item.type}.`;}}
 const weights={37:['Distress',5],38:['Happy',3],39:['Happy',3],40:['Distress',5]};if(weights[t.id]){const [mood,pp]=weights[t.id];behaviorQueueMood(h,t.name,mood,pp,hour);effects.push(`${h.name}: ${mood} +${pp} pp at next mood update`);}if(t.id===40)h.missingStallCompanionDay=Math.floor(hour/24);if([43,48].includes(t.id)){h.stallTensionObservations=(h.stallTensionObservations||0)+1;if(h.stallTensionObservations>=2){behaviorQueueMood(h,t.name,'Distress',3,hour);effects.push('Distress +3 pp at next mood update');}}if(t.id===51)h.behaviorTrainerNote=`${h.name} has been shifting uncomfortably in the stall. Review the existing care and veterinary notes.`;if(t.id===54){const day=Math.floor(hour/24);h.restlessObservationDays=h.restlessObservationDays||[];if(!h.restlessObservationDays.includes(day))h.restlessObservationDays.push(day);if(h.restlessObservationDays.length>=3)h.behaviorTrainerNote=`${h.name} has struggled to settle on three observed days. Review turnout, care and active health issues.`;}
 const entry=stallLog(participants,t.name,behaviorText(t.text+(Math.floor(hour/24)%2?' This was observed during the stall visit.':''),h,other||{name:pastureLiveHorse(h.favoriteStallNeighborId)?.name||'the usual companion'}),hour,effects);if(!entry.suppressed){const body=mgState().behaviorEvents[entry.id];body.body=t.body;body.feedback=feedback;body.observations=Object.fromEntries(participants.map(x=>[x.id,{mood:x.mood,body:behaviorSafeBody(x,t.body)}]));}}
const BEHAVIOR_BASE_SIMULATE_STALL=mgSimulateHour;
mgSimulateHour=function(hour){const previousCache=stallSimulationCache;stallSimulationCache={occupants:new Map(stallState().map(st=>[st.id,[]]))};for(const h of app.horses){const booking=stallBooking(h);if(pastureHorseAvailable(h)&&booking?.barnId===app.currentBarn.id)stallSimulationCache.occupants.get(booking.stallId)?.push(h);}try{const enabled=app.settings.stallAssignments||app.currentBarn.pasturesEnabled;if(!enabled)return BEHAVIOR_BASE_SIMULATE_STALL(hour);for(const h of app.horses){if(!pastureHorseAvailable(h))continue;const out=mgPastureFraction(h,hour),booking=effectivePastureBooking(h),st=stallHorse(h);behaviorTrack(h,'Pasture',hour,out*60,booking?.pastureId||'automatic-turnout');behaviorTrack(h,'Stall',hour,(1-out)*60,st?.id||'automatic-housing');}BEHAVIOR_BASE_SIMULATE_STALL(hour);for(const h of app.horses){const v=h.behaviorVisits?.Stall;if(!app.settings.stallAssignments||!stallHorse(h)||!v||v.lastHour!==hour||!behaviorCanLog(h,'Stall',hour))continue;const [min,max]=behaviorRange(v.minutes/60),target=min+Math.floor(v.roll*(max-min+1));if(v.count<target)detailedStallBehavior(h,stallHorse(h),hour);}}finally{stallSimulationCache=previousCache;}};
function behaviorAfterPastureHour(hour){if(!app.currentBarn.pasturesEnabled)return;for(const p of app.currentBarn.pastures||[]){const group=pastureOccupants(p).filter(h=>mgPastureFraction(h,hour)>0);for(const h of group){const v=h.behaviorVisits?.Pasture;if(!v||v.lastHour!==hour||!behaviorCanLog(h,'Pasture',hour))continue;const [min,max]=behaviorRange(v.minutes/60),target=min+Math.floor(v.roll*(max-min+1));if(v.count<target){const t=PASTURE_EVENT_LIBRARY.find(e=>e.id===1002);applyPastureEvent(t,{a:h,b:null,group,p,hour,rel:null});}}}}
function behaviorLogMarkup(h){const s=mgState(),filter=h.behaviorLogFilter||'All',entries=[...new Set([...(h.behaviorLogIds||[]),...(h.behaviorImportantIds||[])])].map(id=>s.behaviorEvents?.[id]).filter(Boolean).sort((a,b)=>b.time-a.time).filter(e=>filter==='All'||filter==='Important Events'&&e.important||filter==='Stall Activity'&&e.location==='Stall'||filter==='Pasture Activity'&&e.location==='Pasture'||filter==='Mood & Body Language');return `<details><summary>Daily Behavior Log</summary><label>Section<select data-behavior-filter='${h.id}'>${['All','Stall Activity','Pasture Activity','Mood & Body Language','Important Events'].map(f=>`<option ${f===filter?'selected':''}>${f}</option>`).join('')}</select></label><ul class='pasture-diary' data-behavior-entries>${entries.slice(0,150).map(e=>behaviorEntryMarkup(e,h)).join('')||'<li>No matching observations yet.</li>'}</ul><p class='small'>Body-language observations describe a combination of cues, not a diagnosis.</p></details>`;}
function behaviorEntryMarkup(e,h){const source=e.source==='pasture'?ensurePastureRelationships().events[e.sourceId]:null,o=e.observations[h.id]||{};return `<li><strong>${mgEscape(e.title)}</strong> — ${pastureDateLabel(e.time)}<p>${e.location} • Duration ${e.duration} minutes • Mood ${mgEscape(o.mood)} • Body Language ${mgEscape(o.body||e.body)} • Preference ${mgEscape(e.feedback)}</p><p>${mgEscape(source?.description||e.description||'Historical observation')}</p><p class='small'>${(source?.effects||e.effects||[]).map(mgEscape).join('; ')||'No numerical effect.'}</p></li>`;}
function bindBehaviorLog(node,h){const select=node.querySelector('[data-behavior-filter]');if(!select)return;select.onchange=()=>{h.behaviorLogFilter=select.value;const holder=document.createElement('div');holder.innerHTML=behaviorLogMarkup(h);node.querySelector('[data-behavior-entries]').innerHTML=holder.querySelector('[data-behavior-entries]').innerHTML;};const why=node.querySelector('[data-mood-why]');if(why)why.onclick=()=>{const details=node.querySelector('[data-mood-reasons]');details.hidden=!details.hidden;};}
function moodReasonsMarkup(h){const reasons=[];if(app.currentBarn.pasturesEnabled&&h.turnoutSocialIssue)reasons.push('Insufficient or unsuitable turnout for this horse’s Social needs.');if((h.illnesses||[]).some(i=>i.active))reasons.push('An active diagnosed health issue requires ongoing care.');const active=[...stallMoodModifiers(h).sources,...mgEquipmentMoodModifiers(h).sources];for(const s of active)if(s.pp>0||s.priority){const known=(h.decorationObservations?.[s.item]||0)>=3;reasons.push(mgType(s.item)?.category==='Stable Supplies'?(known?`Stall decoration preference: ${s.item}.`:'Stall enrichment preferences are still being assessed.'):`${s.item}: ${s.mood} selection ${s.priority?'priority':'weighting'}.`);}if(h.pastureMoodUntil>pastureCalendarHour())reasons.push('A recent pasture interaction is still affecting the horse.');const alignment=moodCareAlignment(h);if(alignment.trainingOver)reasons.push('Training volume exceeds this horse’s preferred schedule.');if(alignment.wrongFeed||alignment.calmFeedOnLazyHorse||alignment.oldFeedTooYoung)reasons.push('The current feeding plan does not match this horse’s needs.');if(alignment.turnoutLow)reasons.push('The assigned turnout is below this horse’s preference.');return `<button data-mood-why>Why is my horse feeling this way?</button><div data-mood-reasons hidden><p>Mood: ${mgEscape(h.mood)}</p>${[...new Set(reasons)].map(r=>`<p>${mgEscape(r)}</p>`).join('')||'<p>No additional active management cause has been recorded.</p>'}</div>`;}
const BEHAVIOR_BASE_EQ_NOTES=eqEquipmentNotes;
eqEquipmentNotes=function(h){return [...BEHAVIOR_BASE_EQ_NOTES(h),...Object.values(h.decorationTrainerHints||{}),...(h.behaviorTrainerNote?[h.behaviorTrainerNote]:[])];};
function behaviorCleanup(){const s=mgState();if(!s.behaviorEvents)return;const ids=new Set(app.horses.flatMap(h=>[...(h.behaviorLogIds||[]),...(h.behaviorImportantIds||[])]));for(const id of Object.keys(s.behaviorEvents))if(!ids.has(id))delete s.behaviorEvents[id];}
