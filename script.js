const BREEDS = [
  'American Warmblood', 'Baden-Wuerttemberg', 'Bavarian Warmblood', 'Belgian Warmblood', 'Canadian Warmblood',
  'Danish Warmblood', 'Dutch Warmblood', 'Gelderlander', 'Hanoverian', 'Hessen', 'Holsteiner', 'Oldenburg',
  'Polish Warmblood', 'Rhineland', 'Selle Francais', 'Swedish Warmblood', 'Trakehner', 'Westphalian', 'Zweibrucker',
  'Arabian', 'Draft', 'Iberian Horse', 'Riding Pony', 'Thoroughbred', 'Friesian'
];
const COATS = ['Black', 'Bay (Light)', 'Bay (Medium)', 'Bay (Dark)', 'Palomino', 'Fleabitten', 'Grey (Light)', 'Grey (Medium)', 'Grey (Dark)', 'Dappled Grey (Light)', 'Dappled Grey (Medium)', 'Dappled Grey (Dark)', 'Seal Bay', 'Cremello', 'Perlino', 'Buckskin', 'Dun', 'Grullo', 'Chestnut (Light)', 'Chestnut (Medium)', 'Chestnut (Dark)', 'Dapple Bay (Light)', 'Dapple Bay (Medium)', 'Dapple Bay (Dark)'];
const MARKINGS = ['Tobiano (Light)', 'Tobiano (Moderate)', 'Tobiano (Intense)', 'Overo', 'Sabino', 'Rabicano', 'Appaloosa (Light)', 'Appaloosa (Moderate)', 'Appaloosa (Intense)', 'Leopard (Light)', 'Leopard (Moderate)', 'Leopard (Intense)', 'None'];
const CONFORMATION = ['Very Bad', 'Bad', 'Acceptable', 'Good', 'Very Good', 'Excellent'];
const SOCKS = ['None', 'One Sock', 'Two Socks', 'Three Socks', 'Four Socks', 'Stockings'];
const FACE_MARKINGS = ['Faint', 'Star', 'Stripe', 'Broken Stripe', 'Blaze', 'Snip', 'Blaze + Snip', 'Bald Face'];

const SHOW_LEVELS = {
  jumping: ['0.70', '0.80', '0.90', '1.00', '1.10', '1.20', '1.30', '1.40', '1.50', '1.60', '1.70', '1.80'],
  dressage: ['Introductory', 'Training', 'Level One', 'Level Two', 'Level Three', 'Level Four', 'Prix St Georges', 'Intermediate', 'Grand Prix'],
  hunter: ['Poles and Crosspoles', 'Novice', 'Pre-Green', 'Green', 'Low', 'Medium', 'Modified', 'Regular', 'Working', 'Open'],
  eventing: ['Starter', 'Pre-Entry', 'Entry', 'Pre-Training', 'Training', 'Preliminary', 'Intermediate', 'Advanced', 'Four Star']
};

const BREED_BRANDINGS = {
  'American Warmblood': 'AW',
  'Baden-Wuerttemberg': 'BWA',
  'Bavarian Warmblood': 'BW',
  'Belgian Warmblood': 'BW',
  'Canadian Warmblood': 'CW',
  'Danish Warmblood': 'DW',
  'Dutch Warmblood': 'DDW',
  'Gelderlander': 'GE',
  'Hanoverian': 'HA',
  'Hessen': 'HE',
  'Holsteiner': 'HO',
  'Oldenburg': 'OLD',
  'Polish Warmblood': 'PW',
  'Rhineland': 'RH',
  'Selle Francais': 'SF',
  'Swedish Warmblood': 'SW',
  'Trakehner': 'TR',
  'Westphalian': 'WE',
  'Zweibrucker': 'ZW',
  'Arabian': 'AR',
  'Draft': 'DR',
  'Iberian Horse': 'IH',
  'Riding Pony': 'RP',
  'Thoroughbred': 'TH',
  'Friesian': 'FR',
  'Sport Cross': 'SC'
};

const BREED_NORMS = {
  'American Warmblood': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Jumping' },
  'Baden-Wuerttemberg': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage / Jumping' },
  'Bavarian Warmblood': { minHeight: 15.3, maxHeight: 17.2, mainPotential: 'Dressage' },
  'Belgian Warmblood': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping' },
  'Canadian Warmblood': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Hunters' },
  'Danish Warmblood': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage' },
  'Dutch Warmblood': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping / Dressage' },
  'Gelderlander': { minHeight: 15.1, maxHeight: 16.3, mainPotential: 'Dressage' },
  'Hanoverian': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage / Jumping' },
  'Hessen': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Dressage' },
  'Holsteiner': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping' },
  'Oldenburg': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Dressage' },
  'Polish Warmblood': { minHeight: 15.1, maxHeight: 17.0, mainPotential: 'Eventing' },
  'Rhineland': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Dressage / Jumping' },
  'Selle Francais': { minHeight: 15.3, maxHeight: 17.2, mainPotential: 'Jumping' },
  'Swedish Warmblood': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Dressage' },
  'Trakehner': { minHeight: 15.2, maxHeight: 17.1, mainPotential: 'Eventing / Dressage' },
  'Westphalian': { minHeight: 15.3, maxHeight: 17.3, mainPotential: 'Jumping / Dressage' },
  'Zweibrucker': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Jumping' },
  'Arabian': { minHeight: 14.1, maxHeight: 15.2, mainPotential: 'Eventing' },
  'Draft': { minHeight: 16.2, maxHeight: 18.2, mainPotential: 'Low-level Hunters' },
  'Iberian Horse': { minHeight: 14.3, maxHeight: 16.1, mainPotential: 'Dressage' },
  'Riding Pony': { minHeight: 12.2, maxHeight: 14.2, mainPotential: 'Hunters' },
  'Thoroughbred': { minHeight: 15.2, maxHeight: 17.2, mainPotential: 'Eventing / Jumping' },
  'Friesian': { minHeight: 15.3, maxHeight: 17.2, mainPotential: 'Dressage' }
};

const CONFORMATION_MULT = {
  'Very Bad': 0.78,
  Bad: 0.86,
  Acceptable: 0.95,
  Good: 1.02,
  'Very Good': 1.1,
  Excellent: 1.2
};

const SICKNESS_TYPES = [
  { name: 'Colic', impact: 12, severity: 'Severe', surgeryRisk: 18, retirementRisk: 10 },
  { name: 'Broken Leg', impact: 30, severity: 'Very Severe', surgeryRisk: 35, retirementRisk: 35 },
  { name: 'Broken Neck', impact: 40, severity: 'Very Severe', surgeryRisk: 45, retirementRisk: 100 },
  { name: 'Stab Wound', impact: 20, severity: 'Severe', surgeryRisk: 22, retirementRisk: 10 },
  { name: 'Lameness', impact: 14, severity: 'More Than Medium', surgeryRisk: 4, retirementRisk: 8 },
  { name: 'Respiratory Disease', impact: 8, severity: 'Medium', surgeryRisk: 2, retirementRisk: 4 },
  { name: 'Tendon Strain', impact: 12, severity: 'More Than Medium', surgeryRisk: 5, retirementRisk: 6 },
  { name: 'Metabolic Flare', impact: 9, severity: 'Medium', surgeryRisk: 3, retirementRisk: 5 },
  { name: 'Temperature', impact: 6, severity: 'Easy', surgeryRisk: 0, retirementRisk: 2 },
  { name: 'Lung Irritation', impact: 7, severity: 'Medium', surgeryRisk: 2, retirementRisk: 3 }
];

const PERSONALITIES = [
  'Stubborn',
  'Easy-Going',
  'Bomb-proof',
  'Energetic',
  'Spooky',
  'Lazy',
  'Unfocused'
];

const LEVEL_SKILL_BANDS = {
  jumping: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[80,90],[90,95],[95,100],[95,100]],
  dressage: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[90,100]],
  eventing: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[90,100]],
  hunter: [[5,10],[10,20],[20,30],[30,40],[40,50],[50,60],[60,70],[70,80],[80,90],[95,100]]
};

const DISCIPLINE_SKILLS = {
  jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness']
};

const app = {
  money: 50000,
  month: 1,
  year: 1,
  horses: [],
  semenStraws: [],
  embryos: [],
  saleBarn: [],
  rescueBarn: [],
  npcSales: [],
  npcStuds: [],
  reports: [],
  competitionReports: [],
  rescueHorses: [],
  settings: {
    barnName: 'Oxer to Oxer Stable Manager',
    breedingCode: '',
    breedingCodePosition: 'front'
  },
  showOffspringWindow: true,
  trainingSelection: { horseId: '', discipline: 'jumping', exercise: '' },
  trainingRpgConfig: { walk: 1, trot: 1, canter: 1, discipline: 1, coolDown: 2 },
  trainingRpg: null,
  trainingRpgFeedback: '',
  selectedHorseId: ''
};

const options = {};
const SAVE_KEY = 'horse_game_save_v1';
const tabs = ['dashboard', 'horses', 'market', 'sales', 'stud', 'shows', 'vet', 'farrier', 'training', 'breeding', 'registries', 'breeders', 'freezer', 'rescue', 'settings'];

const uid = () => Math.random().toString(36).slice(2, 9);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const money = (v) => `$${Math.round(v).toLocaleString()}`;
const dateLabel = () => `Y${app.year}M${app.month}`;
const cap = (t) => t[0].toUpperCase() + t.slice(1);

const RARE_MARKINGS = MARKINGS.filter((m) => m !== 'None');
const PEDIGREE_RELATIONS = ['Sire', 'Dam', 'Sire\'s Sire', 'Sire\'s Dam', 'Dam\'s Sire', 'Dam\'s Dam'];
const PEDIGREE_PREFIXES = ['OLD', 'HAN', 'RHF', 'BRW', 'STS', 'NTH', 'ELD', 'CRW'];
const FEEDS = [
  'Basic Feed',
  'Sports Feed',
  'Sweet Feed',
  'Brood-mare Feed',
  'Calm nd Ez',
  'Youngster Feed',
  'Old Horse Feed',
  'Recovery',
  'Weight Gain',
  'Diet Feed',
  'Joint Support'
];
let wrongFeedUsed = null;
const MOODS = ['Motivated', 'Happy', 'Try-Hard', 'Neutral', 'Uncomfortable', 'Distress', 'Overly-Active', 'No energy', 'Bad moods', 'Grumpy'];
const WEIGHTS = ['Very Underweight', 'Underweight', 'Moderate', 'Fleshy', 'Overweight'];
const TACK = {
  bridle: ['Snaffle Bridle', 'Flash Bridle', 'Drop Noseband Bridle', 'Figure-8 Bridle', 'Double Bridle'],
  bit: ['Loose Ring Snaffle', 'Eggbutt Snaffle', 'D-Ring Bit', 'Pelham Bit', 'Gag Bit'],
  saddle: ['All-Purpose Saddle', 'Jumping Saddle', 'Dressage Saddle', 'Racing / Close-Contact Saddle', 'Ill-Fitting Saddle'],
  pad: ['Basic Pad', 'Shock-Absorbing Pad', 'Incorrect Size Pad', 'Therapeutic Pad', 'No Pad'],
  footwear: ['Tendon Boots'],
  headwear: ['Halter', 'Rope Halter', 'Grazing Muzzle', 'Fly Mask', 'Tight Halter'],
  body: ['No Blanket', 'Light Blanket', 'Medium Blanket', 'Heavy Blanket']
};
const EXERCISE_MENU = {
  jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness'],
  hunter: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
  eventing: ['Collection', 'Connection', 'Rhythm', 'Striding', 'Confidence', 'Speed']
};
const COMPETITION_HIGHLIGHTS = {
  jumping: {
    positive: [
      'The horse cleared jump # with perfect striding.',
      'The horse approached jump # confidently and met the distance well.',
      'The horse maintained a clean line through jump #.',
      'Jump # required extra effort, and the horse landed smoothly.',
      'The horse showed a clean line until jump #, where a slight stumble caused hesitation.'
    ],
    faults: [
      'The horse had a dramatic knockdown on jump #.',
      'The turn was too sharp for jump #, resulting in a knockdown.',
      'The horse approached jump # confidently but misjudged the distance, brushing the rail.',
      'The pace was off, so the horse struggled, knocking jump #.'
    ],
    refusals: [
      'The striding was off, resulting in a refusal at jump #.'
    ],
    time: [
      'The pace was off, so the horse struggled but cleared jump #.',
      'The horse went off-course at jump #, losing momentum before rejoining the track.'
    ],
    eliminated: [
      'The horse was eliminated after a costly mistake on jump #.'
    ]
  },
  dressage: {
    positive: [
      'The horse executed the movement with fluidity and balance.',
      'The movement was executed with expression and engagement.',
      'The movement was accurate and showed good impulsion.'
    ],
    neutral: [
      'The movement was accurate but lacked impulsion.',
      'The horse performed the movement correctly, but the stride length was inconsistent.',
      'The transition into the movement was slightly rushed, reducing the score.'
    ],
    negative: [
      'The horse hesitated during the movement.',
      'The horse overbent in the movement, resulting in a score drop.',
      'The horse was tense during the movement, affecting rhythm.',
      'The horse lost straightness during the movement.',
      'The horse broke gait momentarily during the movement.'
    ]
  },
  eventing: {
    positive: [
      'The horse handled the jump well, landing smoothly.',
      'The horse galloped confidently over the cross-country obstacle.',
      'The horse showed excellent rhythm throughout the course.'
    ],
    rails: [
      'The horse knocked down a rail at jump #.',
      'The horse misjudged the distance and had a knockdown at jump #.'
    ],
    refusals: [
      'The horse refused at jump # and required a re-approach.',
      'The horse hesitated at water/ditch combinations.'
    ],
    time: [
      'The pace was too fast into the obstacle, resulting in a stumble.',
      'The horse executed a clean line in dressage, but stamina issues affected cross-country.'
    ],
    eliminated: [
      'The horse was eliminated after a fall on the cross-country course.'
    ]
  },
  hunter: {
    positive: [
      'The horse showed a flowing, consistent pace over the fence.',
      'The horse performed with expression and elegance over fence #.',
      'The horse maintained balance and posture throughout the course.'
    ],
    faults: [
      'The horse hit a rail lightly on fence #.',
      'Fence # disrupted the horse’s rhythm, causing a knockdown.',
      'The horse refused at fence #, causing a break in rhythm.'
    ],
    rhythm: [
      'The horse’s striding between fences was uneven.',
      'The horse was slow to the jump but cleared it.',
      'Fence # caused a slight stumble on landing, but the horse recovered well.',
      'The horse drifted off-course near fence # before correcting.'
    ]
  }
};
const COMPETITION_COMMENTS = {
  strong: [
    'Strong performance today; horse is adapting well to current skill level.',
    'The horse is excelling beyond expectations; consider entering a slightly higher-level competition.',
    'Exceptional effort from the horse; small improvements could have a big impact.'
  ],
  mixed: [
    'The horse shows potential but made minor mistakes; focus on precision and rhythm.',
    'Performance varied across rounds; consider adjusting skill-specific training.',
    'The horse’s performance suggests more strength and endurance work is needed.'
  ],
  management: [
    'The horse is responding well to management; keep routines consistent.',
    'The horse’s temperament is affecting performance; observe and adjust management if needed.',
    'The horse is showing its personality today; consider matching feed and turnout to mood.'
  ]
};
const COMPETITION_SUGGESTIONS = {
  feed: [
    'The horse seems to be performing well, but might benefit from slightly richer feed.',
    'The horse appears a little heavy; reducing feed could improve performance.',
    'Consider switching to recovery feed; the horse seems stiff or tense.',
    'The horse is underweight and could benefit from weight-gain feed.',
    'The horse’s energy seems balanced; current feeding regimen is working well.',
    'Too much feed may be affecting its energy and mood; monitor for weight gain.'
  ],
  turnout: [
    'The horse appears energetic and eager, more training may help channel this energy.',
    'The horse seems sluggish today, consider giving more turnout or adjusting feed.',
    'The horse’s energy is off; too much or too little turnout might be affecting its performance.',
    'Consider calm feed or extra rest for the horse; it’s overly active or distracted.',
    'The horse thrives under current workload; maintain schedule.'
  ],
  training: [
    'The horse shows promise in its current discipline but could benefit from extra skill work.',
    'The horse struggles with certain movements/jumps; focus on targeted exercises.',
    'Consistency is key; consider more repetition of current exercises to solidify skill.',
    'The horse may need time off or light training to prevent fatigue or injury.',
    'The horse demonstrates natural talent; ensure training is balanced to maximize potential.'
  ],
  health: [
    'The horse seems healthy, but keep an eye on weight and energy.',
    'Consider retiring this horse soon; age or current performance suggests limits.',
    'The horse may benefit from being gelded if temperament or energy is difficult to manage.',
    'The horse’s stamina is declining; review workload or discipline level.',
    'Injuries or stiffness suggest extra recovery feed or reduced workload.'
  ]
};


const TRAINING_RPG_VARIANTS = {
  scheme: [
    {
      text: 'You review today\'s scheme and set clear goals before mounting.',
      options: [
        { label: 'Keep the plan simple and realistic', success: 85, neutral: 10, fail: 5, moodMod: { Happy: 5, Motivated: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Push for a very ambitious session', success: 55, neutral: 25, fail: 20, moodMod: { Motivated: 5, Distress: -10 }, personalityMod: { Stubborn: -5 }, effects: { bond: 0, skill: 1 } }
      ]
    }
  ],
  walk: [
    {
      text: 'You start in walk and ask for a soft, attentive contact.',
      options: [
        { label: 'Ride a large circle and encourage relaxation', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 10 }, personalityMod: { Nervous: -5 }, effects: { bond: 1, skill: 1 } },
        { label: 'Ask for early lateral flexion', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 5 }, personalityMod: { Unfocused: -10 }, effects: { bond: 0, skill: 1 } }
      ]
    }
  ],
  trot: [
    {
      text: 'You ask for trot. The horse rushes forward and gets flat in the stride.',
      options: [
        { label: 'Half-halt repeatedly to slow the tempo', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 10, 'Overly-Active': -10 }, personalityMod: { Stubborn: -10, Energetic: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Sit deeper and steady contact', success: 55, neutral: 30, fail: 15, moodMod: { Happy: 10 }, personalityMod: { 'Easy-Going': 10, Unfocused: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Allow the pace and continue', success: 30, neutral: 30, fail: 40, moodMod: { 'Overly-Active': -10 }, personalityMod: { Energetic: -5 }, effects: { bond: -1, skill: 0 } },
        { label: 'Return to walk and retry', success: 70, neutral: 20, fail: 10, moodMod: { 'No energy': -5 }, personalityMod: {}, effects: { bond: 0, skill: 1 } }
      ]
    }
  ],
  jumping: [
    {
      text: 'You approach the jump. The horse locks onto the fence and starts rushing.',
      options: [
        { label: 'Add half-halt and shorten stride', success: 60, neutral: 25, fail: 15, moodMod: { Motivated: 10, Distress: -10 }, personalityMod: { Energetic: -5, 'Bomb-proof': 10 }, effects: { bond: 1, skill: 2, refusal: -5 } },
        { label: 'Circle away and re-approach', success: 75, neutral: 15, fail: 10, moodMod: { Neutral: 5 }, personalityMod: { Stubborn: -5 }, effects: { bond: 1, skill: 1, refusal: -8 } },
        { label: 'Let horse jump out of stride', success: 35, neutral: 25, fail: 40, moodMod: { 'Overly-Active': -10 }, personalityMod: { Spooky: -10 }, effects: { bond: -1, skill: 0, refusal: 10 } },
        { label: 'Lower the fence', success: 80, neutral: 15, fail: 5, moodMod: { Happy: 10 }, personalityMod: {}, effects: { bond: 1, skill: 1, refusal: -10 } }
      ]
    }
  ],
  dressage: [
    {
      text: 'You ask for more collection. The horse braces and tightens through the back.',
      options: [
        { label: 'Soften reins and rebalance', success: 70, neutral: 20, fail: 10, moodMod: { Happy: 10 }, personalityMod: { Stubborn: -10 }, effects: { bond: 1, skill: 2 } },
        { label: 'Push through resistance', success: 50, neutral: 25, fail: 25, moodMod: { Distress: -10 }, personalityMod: { Energetic: -5 }, effects: { bond: -1, skill: 1 } },
        { label: 'Halt and reassess', success: 80, neutral: 15, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'End the session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  canter: [
    {
      text: 'You ask for canter. The horse surges forward and quickens beyond your aids.',
      options: [
        { label: 'Sit deep and apply half-halt', success: 65, neutral: 25, fail: 10, moodMod: { Motivated: 10 }, personalityMod: { Energetic: -5, Stubborn: -5 }, effects: { bond: 1, skill: 2 } },
        { label: 'Circle to regain balance', success: 75, neutral: 20, fail: 5, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 1 } },
        { label: 'Let canter settle naturally', success: 55, neutral: 25, fail: 20, moodMod: { 'Overly-Active': -10 }, personalityMod: { Spooky: -5 }, effects: { bond: 0, skill: 1 } },
        { label: 'Return to trot and retry', success: 80, neutral: 15, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 1, skill: 1 } }
      ]
    }
  ],
  work_in_hand: [
    {
      text: 'You work in hand. The horse is alert and looking around instead of focusing.',
      options: [
        { label: 'Use voice and calm body language', success: 75, neutral: 20, fail: 5, moodMod: { Happy: 10 }, personalityMod: { Unfocused: -10 }, effects: { bond: 2, skill: 1 } },
        { label: 'Repeat aid more firmly', success: 65, neutral: 25, fail: 10, moodMod: { Distress: -5 }, personalityMod: { Stubborn: -10 }, effects: { bond: 0, skill: 1 } },
        { label: 'Accept minimal response', success: 50, neutral: 30, fail: 20, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'End in-hand work', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ],
  cool_down: [
    {
      text: 'You begin cool-down. The horse is tense but listening.',
      options: [
        { label: 'Walk longer on a long rein', success: 80, neutral: 15, fail: 5, moodMod: { Distress: -10, Happy: 10 }, personalityMod: { Nervous: -5 }, effects: { bond: 1, skill: 0 } },
        { label: 'Ask gentle bending', success: 70, neutral: 20, fail: 10, moodMod: { Neutral: 5 }, personalityMod: {}, effects: { bond: 1, skill: 0 } },
        { label: 'Halt and reassess', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } },
        { label: 'End session', success: 85, neutral: 10, fail: 5, moodMod: {}, personalityMod: {}, effects: { bond: 0, skill: 0 } }
      ]
    }
  ]
};

const TRAINING_ACTIONS_BY_DISCIPLINE = {
  jumping: ['scheme', 'walk', 'trot', 'canter', 'jumping', 'cool_down'],
  dressage: ['scheme', 'walk', 'trot', 'canter', 'dressage', 'work_in_hand', 'cool_down'],
  hunter: ['scheme', 'walk', 'trot', 'canter', 'jumping', 'cool_down'],
  eventing: ['scheme', 'walk', 'trot', 'canter', 'jumping', 'dressage', 'cool_down']
};

function actionLabel(action) {
  return action.replace('_', ' ').toUpperCase();
}

function pickTrainingVariant(action) {
  const list = TRAINING_RPG_VARIANTS[action] || TRAINING_RPG_VARIANTS.trot;
  return pick(list);
}

function defaultTrainingRpgConfig() {
  return { walk: 1, trot: 1, canter: 1, discipline: 1, coolDown: 2 };
}

function normalizeTrainingRpgConfig(config) {
  const base = defaultTrainingRpgConfig();
  const src = (config && typeof config === 'object') ? config : {};
  return {
    walk: clamp(Number(src.walk) || base.walk, 1, 4),
    trot: clamp(Number(src.trot) || base.trot, 1, 4),
    canter: clamp(Number(src.canter) || base.canter, 1, 4),
    discipline: clamp(Number(src.discipline) || base.discipline, 1, 6),
    coolDown: clamp(Number(src.coolDown) || base.coolDown, 1, 4)
  };
}

function primaryDisciplineAction(discipline) {
  if (discipline === 'dressage') return 'dressage';
  return 'jumping';
}

function buildTrainingRpgSteps(discipline, config) {
  const c = normalizeTrainingRpgConfig(config);
  const primary = primaryDisciplineAction(discipline);
  const steps = ['scheme'];
  for (let i = 0; i < c.walk; i += 1) steps.push('walk');
  for (let i = 0; i < c.trot; i += 1) steps.push('trot');
  for (let i = 0; i < c.canter; i += 1) steps.push('canter');
  for (let i = 0; i < c.discipline; i += 1) steps.push(primary);
  if (discipline === 'dressage') steps.push('work_in_hand');
  for (let i = 0; i < c.coolDown; i += 1) steps.push('cool_down');
  return steps;
}

function buildTrainingRpgSession(horse, discipline, config = app.trainingRpgConfig) {
  app.trainingRpgFeedback = '';
  const steps = buildTrainingRpgSteps(discipline, config);
  const stepIndex = 0;
  const action = steps[stepIndex];
  const variant = pickTrainingVariant(action);
  return { horseId: horse.id, discipline, action, variant, steps, stepIndex, at: dateLabel() };
}

function advanceTrainingRpgSession(session) {
  const steps = Array.isArray(session.steps) && session.steps.length ? session.steps : (TRAINING_ACTIONS_BY_DISCIPLINE[session.discipline] || ['scheme', 'walk', 'trot', 'canter']);
  const stepIndex = (session.stepIndex || 0) + 1;
  if (stepIndex >= steps.length) return null;
  const action = steps[stepIndex];
  return {
    ...session,
    steps,
    stepIndex,
    action,
    variant: pickTrainingVariant(action)
  };
}

function resolveRpgOption(option, horse) {
  const moodBonus = option.moodMod?.[horse.mood] || 0;
  const personalityBonus = option.personalityMod?.[horse.personality] || 0;
  const successChance = clamp(option.success + moodBonus + personalityBonus, 5, 95);
  const neutralChance = clamp(option.neutral, 0, 95 - successChance);
  const failChance = Math.max(0, 100 - successChance - neutralChance);
  const roll = rnd(1, 100);
  let outcome = 'fail';
  if (roll <= successChance) outcome = 'success';
  else if (roll <= successChance + neutralChance) outcome = 'neutral';

  const skillBase = option.effects?.skill || 0;
  const bondDelta = option.effects?.bond || 0;
  if (outcome === 'success') {
    horse.bond = clamp((horse.bond || 0) + Math.max(0, bondDelta), horse.isRescue ? -50 : 0, 100);
  } else if (outcome === 'fail') {
    horse.bond = clamp((horse.bond || 0) + Math.min(0, bondDelta), horse.isRescue ? -50 : 0, 100);
  }
  return { outcome, successChance, neutralChance, failChance, skillBase };
}

function normalizeMarkingForBreed(marking, breed) {
  const lower = String(breed || '').toLowerCase();
  if (lower.includes('friesian')) return 'None';
  if (!marking.includes('Rabicano')) return marking;
  if (lower.includes('arab')) return marking;
  return pick(MARKINGS.filter((m) => m !== 'Rabicano'));
}

function randomMarking(breed) {
  const roll = rnd(1, 100);
  const marking = roll <= 7 ? pick(RARE_MARKINGS) : 'None';
  return normalizeMarkingForBreed(marking, breed);
}

function currentMonthIndex() {
  return app.year * 12 + app.month;
}

function personalityProfile(personality) {
  switch (personality) {
    case 'Stubborn':
      return { trainDelta: -15, showDelta: -6, penaltyBias: 2, refusalBias: 12, fallBias: 2, careerDelta: 0 };
    case 'Easy-Going':
      return { trainDelta: 12, showDelta: 6, penaltyBias: -2, refusalBias: -6, fallBias: -1, careerDelta: 1 };
    case 'Bomb-proof':
      return { trainDelta: 0, showDelta: 6, penaltyBias: -3, refusalBias: -8, fallBias: -2, careerDelta: 2 };
    case 'Energetic':
      return { trainDelta: 8, showDelta: -3, penaltyBias: 3, refusalBias: 4, fallBias: 1, careerDelta: -2 };
    case 'Spooky':
      return { trainDelta: -10, showDelta: -8, penaltyBias: 4, refusalBias: 10, fallBias: 6, careerDelta: -1 };
    case 'Lazy':
      return { trainDelta: -4, showDelta: -2, penaltyBias: 1, refusalBias: 2, fallBias: 0, careerDelta: 0 };
    case 'Unfocused':
      return { trainDelta: -8, showDelta: 3, penaltyBias: 1, refusalBias: 3, fallBias: 0, careerDelta: 0 };
    default:
      return { trainDelta: 0, showDelta: 0, penaltyBias: 0, refusalBias: 0, fallBias: 0, careerDelta: 0 };
  }
}

function injuryRecoveryMonths(severity) {
  if (severity === 'Easy') return rnd(1, 2);
  if (severity === 'Medium') return rnd(2, 4);
  if (severity === 'More Than Medium') return rnd(4, 7);
  if (severity === 'Severe') return rnd(8, 12);
  return rnd(12, 16);
}

function soundnessLossRange(severity) {
  if (severity === 'Easy') return [0.5, 0.9];
  if (severity === 'Medium') return [0.8, 1.2];
  if (severity === 'More Than Medium') return [1, 1.5];
  if (severity === 'Severe') return [2, 2.9];
  if (severity === 'Very Severe') return [2.9, 3.5];
  return [0, 0];
}

function soundnessLossMultiplier(horse) {
  if (horse.healthGenetics === 'Low') return 0.8;
  if (horse.healthGenetics === 'High') return 1.2;
  return 1;
}

function applySoundnessLoss(horse, severity) {
  const [minLoss, maxLoss] = soundnessLossRange(severity);
  if (!maxLoss) return;
  const loss = (minLoss + Math.random() * (maxLoss - minLoss)) * soundnessLossMultiplier(horse);
  horse.soundnessYears = Math.max(0, Number((horse.soundnessYears - loss).toFixed(1)));
}

function soundnessForecastLine(years) {
  if (years > 10) return 'Lots of years left... (10+)';
  if (years >= 7) return 'Moderate amount of years left (7-10)';
  if (years >= 5) return 'Some years of competing left (5-7)';
  if (years >= 2) return 'Still some left, be careful though! (2-5)';
  if (years >= 1) return 'Should consider retiring soon... (1-2 years left)';
  return 'Should retire from competing... (less then 1 year left)';
}

function trainingStaminaRange(level) {
  if (level === 'Low') return '10-15';
  if (level === 'High') return '30-50';
  return '15-30';
}

function turnoutRange(level) {
  if (level === 'Low') return '2-3';
  if (level === 'High') return '8-14';
  return '3-8';
}

function turnoutRangeBounds(level) {
  if (level === 'Low') return [2, 3];
  if (level === 'High') return [8, 14];
  return [3, 8];
}

function feedRangeBounds(horse) {
  const pref = horse.preferredFeedGrams || 150;
  return [Math.max(50, pref - 25), Math.min(250, pref + 25)];
}

function updateWeight(horse, delta) {
  if (horse.isRescue && horse.weightStatus !== 'Moderate' && delta !== 0) {
    horse.rescueWeightCooldown = Number.isFinite(horse.rescueWeightCooldown) ? horse.rescueWeightCooldown : horse.rescueWeightDelay || 6;
    if (horse.rescueWeightCooldown > 0) {
      horse.rescueWeightCooldown -= 1;
      return;
    }
    horse.rescueWeightCooldown = horse.rescueWeightDelay || 6;
  }
  const idx = Math.max(0, Math.min(WEIGHTS.length - 1, WEIGHTS.indexOf(horse.weightStatus)));
  const next = Math.max(0, Math.min(WEIGHTS.length - 1, idx + delta));
  horse.weightStatus = WEIGHTS[next];
}

function moodPerformanceDelta(mood) {
  if (['Motivated', 'Happy', 'Try-Hard'].includes(mood)) return 4;
  if (mood === 'Neutral') return 0;
  if (mood === 'Grumpy') return -3;
  if (mood === 'Bad moods') return -4;
  if (['Uncomfortable', 'Distress', 'Overly-Active', 'No energy'].includes(mood)) return -4;
  return -5;
}

function weightPerformanceDelta(weight) {
  if (weight === 'Moderate') return 3;
  if (['Underweight', 'Fleshy'].includes(weight)) return -2;
  return -4;
}

function applyMonthlyMoodShift(horse) {
  const preferred = horse.preferredMood;
  if (horse.isRescue && (horse.bond || 0) <= 0) {
    return rnd(1, 100) <= 95 ? pick(['Uncomfortable', 'Distress', 'Overly-Active', 'No energy', 'Bad moods', 'Grumpy']) : preferred;
  }
  const bond = horse.bond || 0;
  if (bond >= 45 && rnd(1, 100) <= 40) {
    return pick(['Motivated', 'Happy', 'Try-Hard']);
  }
  const roll = rnd(1, 100);
  if (roll <= 55) return preferred;
  if (roll <= 80) return 'Neutral';
  return rnd(1, 100) <= 50 ? 'Bad moods' : 'Grumpy';
}

function genderPronouns(horse) {
  const female = horse.gender === 'Mare';
  return {
    subject: female ? 'She' : 'He',
    object: female ? 'her' : 'him',
    possessive: female ? 'her' : 'his'
  };
}

function recommendedFeedForHorse(horse) {
  if (horse.illnesses.some((i) => i.active)) return 'Recovery';
  if ((horse.injuryCountYear || 0) > 3) return 'Joint Support';
  if (horse.pregnantBy || horse.pregnantEmbryo || horse.retiredToBreeding) return 'Brood-mare Feed';
  if (horse.age <= 5) return 'Youngster Feed';
  if (horse.age >= 15) return 'Old Horse Feed';
  if (['Overweight', 'Fleshy'].includes(horse.weightStatus)) return 'Diet Feed';
  if (['Very Underweight', 'Underweight'].includes(horse.weightStatus)) return 'Weight Gain';
  return 'Basic Feed';
}

function trainerNotesForHorse(horse) {
  const notes = [];
  const { subject, object, possessive } = genderPronouns(horse);
  const [feedMin, feedMax] = feedRangeBounds(horse);
  const totalGrams = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  if (totalGrams > feedMax + 10) {
    notes.push(`${subject} is getting fleshy, you should feed ${object} less.`);
  } else if (totalGrams && totalGrams < feedMin - 10) {
    notes.push(`${subject} is too lightweight, consider making ${possessive} feeding plan more balanced.`);
  }
  if (horse.lastFeedIssue?.badFeed && horse.lastFeedIssue?.betterFeed) {
    notes.push(`${subject} needs ${horse.lastFeedIssue.badFeed} changed to ${horse.lastFeedIssue.betterFeed}!`);
  }
  if (horse.lastTurnoutIssue === 'low') {
    notes.push(`${subject} has so much energy, give ${object} more turn-out, it's a living creature after all!`);
  }
  if (horse.lastTrainingIssue === 'high') {
    notes.push(`${subject} is very tired, consider easing up ${possessive} schedule.`);
  }
  if (horse.lastTrainingIssue === 'low') {
    notes.push(`${subject} has too much energy, you should train ${object} bit more!`);
  }
  if (!horse.retiredForever && !horse.retiredToBreeding && horse.soundnessYears <= 0) {
    notes.push(`${subject} looks tired and burnt-out maybe it’s time for retirement.`);
  }
  if (horse.gender === 'Stallion' && horse.lastTrainingIssue === 'low' && !horse.retiredForever && !horse.retiredToBreeding) {
    notes.push('He looks overly energetic, consider gelding.');
  }
  if ((horse.injuryCountYear || 0) > 3) {
    notes.push(`${subject} is prone to injuries, better give ${object} some joint support feed!`);
  }
  const bestFeed = recommendedFeedForHorse(horse);
  notes.push(`This is the best feedplan for this horse, ${bestFeed} ${feedMin}-${feedMax}g.`);
  horse.trainerNotes = notes;
}

function evaluateFeedEffects(horse) {
  let moodOverride = '';
  let weightDelta = 0;
  let trainingBoost = 0;
  let competitionBoost = 0;
  let healingBoost = 0;
  let feedIssue = null;
  let wrongFeedUsed = false;
  const activeTraining = (horse.trainingSessionsThisMonth || 0) > 0 || horse.managed?.showEntry;
  const competitionCount = horse.showEntriesThisMonth || 0;
  const hasInjury = horse.illnesses.some((i) => i.active);
  const totalGrams = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  const hasSportsFeed = (horse.feedPlan || []).some((f) => f.type === 'Sports Feed');
  const hasOldHorseFeed = (horse.feedPlan || []).some((f) => f.type === 'Old Horse Feed');
  const hasJointSupport = (horse.feedPlan || []).some((f) => f.type === 'Joint Support');
  const pref = horse.preferredFeedGrams || 150;
  if (totalGrams > pref + 30) weightDelta += 1;
  if (totalGrams < pref - 30) weightDelta -= 1;

  (horse.feedPlan || []).forEach((feed) => {
    switch (feed.type) {
      case 'Basic Feed':
        competitionBoost += 1;
        break;
      case 'Sports Feed':
        if (!activeTraining && competitionCount === 0) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Sports Feed', betterFeed: 'Basic Feed' };
        } else {
          trainingBoost += 2;
          competitionBoost += 1;
        }
        break;
      case 'Sweet Feed':
        if (['Energetic', 'Stubborn'].includes(horse.personality)) {
          weightDelta += 1;
          moodOverride = 'Overly-Active';
          competitionBoost -= 1;
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Sweet Feed', betterFeed: 'Calm nd Ez' };
        } else if (horse.personality === 'Lazy') {
          moodOverride = 'Motivated';
          competitionBoost += 1;
        } else {
          moodOverride = 'Happy';
        }
        break;
      case 'Brood-mare Feed':
        if (!(horse.retiredToBreeding || horse.pregnantBy || horse.pregnantEmbryo || horse.age <= 2)) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Brood-mare Feed', betterFeed: 'Basic Feed' };
        } else {
          moodOverride = 'Happy';
        }
        break;
      case 'Calm nd Ez':
        if (['Lazy', 'Easy-Going', 'Bomb-proof'].includes(horse.personality)) {
          moodOverride = 'No energy';
          competitionBoost -= 1;
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Calm nd Ez', betterFeed: 'Basic Feed' };
        } else {
          moodOverride = 'Neutral';
          competitionBoost += 1;
        }
        if (hasInjury) moodOverride = 'No energy';
        break;
      case 'Youngster Feed':
        if (horse.age > 5 || horse.retiredForever || horse.retiredToBreeding) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Youngster Feed', betterFeed: 'Basic Feed' };
        } else {
          trainingBoost += 2;
        }
        break;
      case 'Old Horse Feed':
        if (horse.age < 15 && !horse.retiredForever) {
          weightDelta += 1;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Old Horse Feed', betterFeed: 'Basic Feed' };
          if (['Energetic', 'Stubborn'].includes(horse.personality)) moodOverride = 'Overly-Active';
        } else if (horse.age >= 20 || horse.retiredToBreeding || horse.retiredForever) {
          moodOverride = 'Happy';
          if (['Very Underweight', 'Underweight'].includes(horse.weightStatus)) weightDelta += 1;
        } else {
          trainingBoost += 1;
        }
        break;
      case 'Recovery':
        if (!hasInjury) {
          moodOverride = 'Uncomfortable';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Recovery', betterFeed: 'Basic Feed' };
        } else {
          const roll = rnd(1, 100);
          if (roll > 10 && roll <= 80) {
            healingBoost += 1;
          }
        }
        break;
      case 'Weight Gain':
        if (['Moderate', 'Fleshy', 'Overweight'].includes(horse.weightStatus)) {
          moodOverride = 'Distress';
          weightDelta += 1;
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Weight Gain', betterFeed: 'Basic Feed' };
        } else {
          weightDelta += 1;
        }
        break;
      case 'Diet Feed':
        if (['Overweight', 'Fleshy'].includes(horse.weightStatus)) {
          weightDelta -= 2;
        } else {
          weightDelta -= 2;
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Diet Feed', betterFeed: 'Basic Feed' };
        }
        if (feed.grams > 60) {
          moodOverride = 'No energy';
          wrongFeedUsed = true;
        }
        break;
      case 'Joint Support':
        if ((horse.injuryCountYear || 0) > 3) {
          competitionBoost += 1;
        } else {
          moodOverride = 'Distress';
          wrongFeedUsed = true;
          feedIssue = { badFeed: 'Joint Support', betterFeed: 'Basic Feed' };
        }
        break;
      default:
        break;
    }
  });

  if (competitionCount >= 2 && !hasSportsFeed) {
    moodOverride = 'No energy';
  }
  if ((horse.age >= 20 || horse.retiredToBreeding || horse.retiredForever) && !hasOldHorseFeed) {
    weightDelta -= 1;
  }
  if (wrongFeedUsed) {
    horse.wrongFeedMonthsYear = (horse.wrongFeedMonthsYear || 0) + 1;
  }
  horse.hasJointSupport = hasJointSupport && (horse.injuryCountYear || 0) > 3;
  if (weightDelta !== 0) updateWeight(horse, weightDelta);
  if (moodOverride) horse.mood = moodOverride;
  horse.lastFeedMoodOverride = moodOverride || '';
  horse.lastFeedIssue = feedIssue;
  horse.trainingBoost = trainingBoost;
  horse.competitionBoost = competitionBoost;
  horse.healingBoost = healingBoost;
}

function applyAutoTraining(horse) {
  horse.autoExerciseHours = 0;
  if (!horse.autoTrainingFocus) return;
  const allowedFocuses = autoTrainingOptionsForHorse(horse).map((option) => option.value);
  if (!allowedFocuses.includes(horse.autoTrainingFocus)) return;
  const preferred = Math.max(1, Math.min(50, horse.preferredTrainingSessions || 25));
  const stamina = horse.trainingPreference || 'Medium';
  const skillCap = stamina === 'Low' ? rnd(2, 5) : stamina === 'High' ? rnd(7, 10) : rnd(5, 7);
  let skillGains = 0;
  let trainedSessions = 0;
  if (horse.autoTrainingFocus === 'Light Exercise') {
    for (let i = 0; i < preferred; i += 1) {
      if (horse.illnesses.some((n) => n.active)) break;
      applyExerciseSession(horse, { silent: true, accumulate: true });
      trainedSessions += 1;
    }
    if (trainedSessions) {
      pushReport(`${horse.name} completed ${trainedSessions} light exercise session(s) this month.`);
    }
    return;
  }
  if (horse.autoTrainingFocus === 'Breaking in') {
    for (let i = 0; i < preferred; i += 1) {
      if (horse.illnesses.some((n) => n.active)) break;
      horse.behavior = Math.max(0, (horse.behavior || 0) + rnd(1, 2));
      horse.managed.trained = true;
      horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
      trainedSessions += 1;
    }
    if (horse.requiresBreakingIn && horse.behavior >= 100) {
      horse.requiresBreakingIn = false;
      pushReport(`${horse.name} completed breaking in and can begin regular training.`);
    }
    if (trainedSessions) {
      pushReport(`${horse.name} completed ${trainedSessions} breaking-in session(s) this month.`);
    }
    return;
  }
  for (let i = 0; i < preferred; i += 1) {
    if (horse.illnesses.some((n) => n.active)) break;
    const discipline = horse.autoTrainingFocus;
    const atCap = disciplineAtPotential(horse, discipline);
    if (horse.retiredForever || horse.retiredToBreeding || atCap) {
      applyExerciseSession(horse, { silent: true, accumulate: true });
      trainedSessions += 1;
      continue;
    }
    const skill = pick(EXERCISE_MENU[discipline]);
    const bonus = horse.trainingBoost ? Math.max(0, Math.round(horse.trainingBoost / 2)) : 0;
    const gain = rnd(1, 3) + bonus;
    if (skillGains < skillCap) {
      if (discipline === 'dressage') {
        horse.stats.dressage[skill] = clampSkill(horse, discipline, horse.stats.dressage[skill] + gain);
      }
      if (discipline === 'jumping' || discipline === 'hunter') {
        horse.stats.jumping[skill] = clampSkill(horse, discipline, horse.stats.jumping[skill] + gain);
      }
      if (discipline === 'eventing') {
        if (horse.stats.dressage[skill] != null) {
          horse.stats.dressage[skill] = clampSkill(horse, discipline, horse.stats.dressage[skill] + gain);
        }
        if (horse.stats.jumping[skill] != null) {
          horse.stats.jumping[skill] = clampSkill(horse, discipline, horse.stats.jumping[skill] + gain);
        }
      }
      skillGains += 1;
    }
    horse.managed.trained = true;
    horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
    trainedSessions += 1;
  }
  if (trainedSessions) {
    pushReport(`${horse.name} completed ${trainedSessions} auto-training session(s) in ${cap(horse.autoTrainingFocus)}.`);
  }
}


function controlabilityFromPersonality(personality) {
  const roll = rnd(1, 100);
  switch (personality) {
    case 'Easy-Going': return roll <= 45 ? rnd(35, 60) : rnd(60, 100);
    case 'Bomb-proof': return roll <= 30 ? rnd(40, 65) : rnd(65, 100);
    case 'Spooky': return roll <= 70 ? rnd(10, 50) : rnd(50, 90);
    case 'Stubborn': return roll <= 85 ? rnd(15, 60) : rnd(60, 95);
    case 'Energetic': return roll <= 65 ? rnd(20, 70) : rnd(70, 100);
    case 'Lazy': return roll <= 70 ? rnd(15, 50) : rnd(50, 90);
    case 'Unfocused': return roll <= 85 ? rnd(10, 50) : rnd(50, 90);
    default: return rnd(25, 85);
  }
}

function tackControlabilityDelta(horse, discipline = 'flatwork') {
  const tack = horse.tack || {};
  let delta = 0;
  if (tack.bridle === 'Flash Bridle') delta += 3;
  if (tack.bridle === 'Drop Noseband Bridle') delta += 5;
  if (tack.bridle === 'Figure-8 Bridle') delta += ['jumping', 'eventing', 'hunter'].includes(discipline) ? 6 : -2;
  if (tack.bridle === 'Double Bridle') delta += (horse.bond || 0) >= 45 ? 8 : -8;

  if (tack.bit === 'Eggbutt Snaffle') delta += 2;
  if (tack.bit === 'D-Ring Bit') delta += 4;
  if (tack.bit === 'Pelham Bit') delta += 6;
  if (tack.bit === 'Gag Bit') delta += horse.personality === 'Spooky' || ['Distress', 'Bad moods', 'Grumpy'].includes(horse.mood) ? -8 : 6;

  if (tack.saddle === 'Jumping Saddle') delta += ['jumping', 'eventing', 'hunter'].includes(discipline) ? 4 : -1;
  if (tack.saddle === 'Dressage Saddle') delta += discipline === 'dressage' || discipline === 'flatwork' ? 4 : -1;
  if (tack.saddle === 'Racing / Close-Contact Saddle') delta += -4;
  if (tack.saddle === 'Ill-Fitting Saddle') delta += -12;

  if (tack.pad === 'Shock-Absorbing Pad' || tack.pad === 'Therapeutic Pad') delta += 2;
  if (tack.pad === 'Incorrect Size Pad') delta += -6;
  if (tack.pad === 'No Pad') delta += -10;

  if (tack.headwear === 'Rope Halter') delta += 2;
  if (tack.headwear === 'Fly Mask') delta += 2;
  if (tack.headwear === 'Tight Halter') delta += -5;
  if (tack.headwear === 'Grazing Muzzle') delta += -3;

  if (tack.body === 'Light Blanket') delta += 1;
  if (tack.body === 'Medium Blanket') delta += -1;
  if (tack.body === 'Heavy Blanket') delta += -4;
  return delta;
}

function trainingControlabilitySession(horse, focus) {
  const mood = horse.mood || 'Neutral';
  const baseSuccess = 58;
  const moodMod = ['Motivated', 'Happy', 'Try-Hard'].includes(mood) ? 18 : ['Distress', 'Bad moods', 'Grumpy', 'No energy', 'Uncomfortable'].includes(mood) ? -18 : 0;
  const personalityMod = ['Easy-Going', 'Bomb-proof'].includes(horse.personality) ? 12 : ['Stubborn', 'Spooky', 'Unfocused'].includes(horse.personality) ? -12 : 0;
  const tackMod = tackControlabilityDelta(horse, 'flatwork');
  const successChance = clamp(baseSuccess + moodMod + personalityMod + tackMod, 10, 95);
  const roll = rnd(1, 100);
  if (roll <= successChance) {
    const gain = rnd(5, 10);
    horse.controlability = clamp((horse.controlability || 0) + gain, 0, 100);
    pushReport(`${horse.name} responded well to ${focus}. Controlability +${gain}%.`);
    return true;
  }
  const loss = rnd(1, 4);
  horse.controlability = clamp((horse.controlability || 0) - loss, 0, 100);
  pushReport(`${horse.name} struggled with ${focus}. Controlability -${loss}%.`);
  return false;
}

function updateMonthlyCare(horse) {
  if (horse.retiredForever && !horse.retiredToBreeding) return;
  evaluateFeedEffects(horse);
  const stamina = horse.trainingPreference || 'Medium';
  const [minTurnout, maxTurnout] = turnoutRangeBounds(stamina);
  const effectiveTurnout = horse.turnoutAssignmentHours > 0 ? horse.turnoutAssignmentHours : rnd(minTurnout, maxTurnout);
  horse.turnoutHours = (horse.illnesses || []).some((i) => i.active) ? 0 : Math.max(0.5, Math.min(14, effectiveTurnout));
  horse.lastTurnoutIssue = '';
  horse.lastTrainingIssue = '';
  const preferred = horse.preferredTrainingSessions || 25;
  const sessions = horse.trainingSessionsThisMonth || 0;
  horse.lastTrainingSessions = sessions;
  horse.lastShowEntries = horse.showEntriesThisMonth || 0;
  if (sessions > preferred) {
    horse.lastTrainingIssue = 'high';
    horse.overTrainingCountYear = (horse.overTrainingCountYear || 0) + 1;
    if ([4, 8].includes(horse.overTrainingCountYear)) {
      horse.pendingOvertrainingInjury = true;
    }
  } else if (sessions < Math.max(1, Math.floor(preferred * 0.4))) {
    horse.lastTrainingIssue = 'low';
  }

  let mood = horse.mood;
  const tackDelta = tackControlabilityDelta(horse, 'flatwork');
  if (tackDelta <= -8 && !['Distress', 'No energy'].includes(mood)) mood = 'Uncomfortable';
  if (!horse.lastFeedMoodOverride && (!mood || mood === 'Neutral')) {
    mood = applyMonthlyMoodShift(horse);
  }
  if ((horse.illnesses || []).some((i) => i.active)) {
    mood = (horse.feedPlan || []).some((f) => f.type === 'Calm nd Ez') ? 'No energy' : 'Distress';
  }
  if (horse.turnoutHours < minTurnout) {
    mood = 'Distress';
    horse.lastTurnoutIssue = 'low';
    updateWeight(horse, 1);
  } else if (horse.turnoutHours > maxTurnout) {
    mood = 'No energy';
    horse.lastTurnoutIssue = 'high';
    updateWeight(horse, -1);
  }
  if (horse.lastTrainingIssue === 'high') {
    mood = 'No energy';
  } else if (horse.lastTrainingIssue === 'low') {
    if (!['Distress', 'No energy'].includes(mood)) mood = 'Overly-Active';
  }

  horse.mood = mood;
  trainerNotesForHorse(horse);
  horse.trainingSessionsThisMonth = 0;
  horse.showEntriesThisMonth = 0;
}


function showFatal(message) {
  let main = document.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    document.body.append(main);
  }
  const existing = document.getElementById('fatal-startup-box');
  if (existing) existing.remove();
  const box = document.createElement('section');
  box.id = 'fatal-startup-box';
  box.className = 'panel';
  box.innerHTML = `<div class='box'><h2>Startup Error</h2><p>${message}</p></div>`;
  main.prepend(box);
}

function safeRun(label, fn) {
  try {
    fn();
    return true;
  } catch (error) {
    console.error(`${label} failed`, error);
    showFatal(`${label} failed: ${error.message}`);
    return false;
  }
}


function serializeAppState() {
  return JSON.stringify(app);
}

function hydrateFromSave(data) {
  if (!data || typeof data !== 'object') throw new Error('Invalid save data.');
  app.money = Number(data.money) || 50000;
  app.month = Number(data.month) || 1;
  app.year = Number(data.year) || 1;
  app.horses = Array.isArray(data.horses) ? data.horses.filter(Boolean) : [];
  app.semenStraws = Array.isArray(data.semenStraws) ? data.semenStraws : [];
  app.embryos = Array.isArray(data.embryos) ? data.embryos : [];
  app.saleBarn = Array.isArray(data.saleBarn) ? data.saleBarn : [];
  app.rescueBarn = Array.isArray(data.rescueBarn) ? data.rescueBarn : [];
  app.npcSales = Array.isArray(data.npcSales) ? data.npcSales : [];
  app.npcStuds = Array.isArray(data.npcStuds) ? data.npcStuds : [];
  app.reports = Array.isArray(data.reports) ? data.reports : [];
  app.competitionReports = Array.isArray(data.competitionReports) ? data.competitionReports : [];
  app.rescueHorses = Array.isArray(data.rescueHorses) ? data.rescueHorses : [];
  app.settings = typeof data.settings === 'object' && data.settings ? {
    barnName: data.settings.barnName || 'Oxer to Oxer Stable Manager',
    breedingCode: data.settings.breedingCode || '',
    breedingCodePosition: data.settings.breedingCodePosition === 'end' ? 'end' : 'front'
  } : { barnName: 'Oxer to Oxer Stable Manager', breedingCode: '', breedingCodePosition: 'front' };
  app.showOffspringWindow = data.showOffspringWindow !== false;
  app.selectedHorseId = data.selectedHorseId || '';
  app.trainingSelection = typeof data.trainingSelection === 'object' && data.trainingSelection
    ? {
        horseId: data.trainingSelection.horseId || '',
        discipline: data.trainingSelection.discipline || 'jumping',
        exercise: data.trainingSelection.exercise || ''
      }
    : { horseId: '', discipline: 'jumping', exercise: '' };
  app.trainingRpgConfig = normalizeTrainingRpgConfig(data.trainingRpgConfig);
  app.trainingRpg = typeof data.trainingRpg === 'object' && data.trainingRpg ? data.trainingRpg : null;
  app.trainingRpgFeedback = typeof data.trainingRpgFeedback === 'string' ? data.trainingRpgFeedback : '';

  app.horses.forEach((h) => {
    h.socks = h.socks || pick(SOCKS);
    h.faceMarking = h.faceMarking || pick(FACE_MARKINGS);
    h.marking = normalizeMarkingForBreed(h.marking || 'None', h.breed);
    h.personality = h.personality || pick(PERSONALITIES);
    h.behavior = Number.isFinite(h.behavior) ? h.behavior : 0;
    h.extraPotential = h.extraPotential === true;
    h.healthGenetics = h.healthGenetics || pick(['Low', 'Medium', 'High']);
    h.injuryProtection = h.injuryProtection || {};
    h.registryInspection = h.registryInspection || null;
    if (h.registryInspection) {
      const scored = registryInspectionScore(h);
      h.registryInspection.condition = Number.isFinite(h.registryInspection.condition) ? h.registryInspection.condition : scored.conditionScore;
      if (h.registryInspection.pedigree === undefined && scored.pedigreeScore != null) {
        h.registryInspection.pedigree = scored.pedigreeScore;
      }
      if (!h.registryInspection.registry) h.registryInspection.registry = scored.isSportCross ? 'Sport Cross' : h.breed;
    }
    h.showInspectionDetails = h.showInspectionDetails || false;
    h.showOffspringSummary = h.showOffspringSummary || false;
    h.showPedigree = h.showPedigree || false;
    h.notes = h.notes || '';
    h.showNotes = h.showNotes || false;
    h.showTrainerNotes = h.showTrainerNotes || false;
    h.feedPlan = Array.isArray(h.feedPlan) ? h.feedPlan : [];
    h.autoTrainingPlan = Array.isArray(h.autoTrainingPlan) ? h.autoTrainingPlan : [];
    h.autoTrainingFocus = h.autoTrainingFocus || h.autoTrainingPlan?.[0]?.discipline || '';
    h.autoExerciseHours = Number.isFinite(h.autoExerciseHours) ? h.autoExerciseHours : 0;
    h.preferredFeedGrams = Number.isFinite(h.preferredFeedGrams) ? h.preferredFeedGrams : rnd(50, 250);
    h.preferredMood = h.preferredMood || pick(['Motivated', 'Happy', 'Try-Hard', 'Neutral']);
    h.mood = h.mood || 'Neutral';
    h.weightStatus = h.weightStatus || 'Moderate';
    h.trainingPreference = h.trainingPreference || pick(['Low', 'Medium', 'High']);
    h.preferredTrainingSessions = Number.isFinite(h.preferredTrainingSessions) ? h.preferredTrainingSessions : rnd(10, 50);
    h.trainingSessionsThisMonth = Number.isFinite(h.trainingSessionsThisMonth) ? h.trainingSessionsThisMonth : 0;
    h.lastTrainingSessions = Number.isFinite(h.lastTrainingSessions) ? h.lastTrainingSessions : 0;
    h.showEntriesThisMonth = Number.isFinite(h.showEntriesThisMonth) ? h.showEntriesThisMonth : 0;
    h.lastShowEntries = Number.isFinite(h.lastShowEntries) ? h.lastShowEntries : 0;
    h.manualTrainingThisMonth = h.manualTrainingThisMonth || false;
    h.farrierThisMonth = h.farrierThisMonth || false;
    h.turnoutHours = Number.isFinite(h.turnoutHours) ? h.turnoutHours : 0;
    h.controlability = Number.isFinite(h.controlability) ? h.controlability : 50;
    h.tack = typeof h.tack === 'object' && h.tack ? h.tack : {};
    h.tack.bridle = h.tack.bridle || 'Snaffle Bridle';
    h.tack.bit = h.tack.bit || 'Loose Ring Snaffle';
    h.tack.saddle = h.tack.saddle || 'All-Purpose Saddle';
    h.tack.pad = h.tack.pad || 'Basic Pad';
    h.tack.footwear = h.tack.footwear || 'Tendon Boots';
    h.tack.headwear = h.tack.headwear || 'Halter';
    h.tack.body = h.tack.body || 'No Blanket';
    h.trainingBoost = Number.isFinite(h.trainingBoost) ? h.trainingBoost : 0;
    h.competitionBoost = Number.isFinite(h.competitionBoost) ? h.competitionBoost : 0;
    h.feedPerformanceDelta = Number.isFinite(h.feedPerformanceDelta) ? h.feedPerformanceDelta : 0;
    h.feedTrainingDelta = Number.isFinite(h.feedTrainingDelta) ? h.feedTrainingDelta : 0;
    h.turnoutEffect = Number.isFinite(h.turnoutEffect) ? h.turnoutEffect : 0;
    h.trainingPerformanceDelta = Number.isFinite(h.trainingPerformanceDelta) ? h.trainingPerformanceDelta : 0;
    h.healingBoost = Number.isFinite(h.healingBoost) ? h.healingBoost : 0;
    h.titles = Array.isArray(h.titles) ? h.titles : [];
    h.failedInspection = Boolean(h.failedInspection);
    h.requiresBreakingIn = Boolean(h.requiresBreakingIn);
    h.trainerNotes = Array.isArray(h.trainerNotes) ? h.trainerNotes : [];
    h.lastFeedIssue = h.lastFeedIssue && typeof h.lastFeedIssue === 'object' ? h.lastFeedIssue : null;
    h.lastFeedMoodOverride = h.lastFeedMoodOverride || '';
    h.lastTurnoutIssue = h.lastTurnoutIssue || '';
    h.lastTrainingIssue = h.lastTrainingIssue || '';
    h.turnoutAssignmentHours = Number.isFinite(h.turnoutAssignmentHours) ? h.turnoutAssignmentHours : 0;
    h.wrongFeedMonthsYear = Number.isFinite(h.wrongFeedMonthsYear) ? h.wrongFeedMonthsYear : 0;
    h.overTrainingCountYear = Number.isFinite(h.overTrainingCountYear) ? h.overTrainingCountYear : 0;
    h.pendingOvertrainingInjury = h.pendingOvertrainingInjury || false;
    h.injuryCountYear = Number.isFinite(h.injuryCountYear) ? h.injuryCountYear : 0;
    h.healthTrackingYear = Number.isFinite(h.healthTrackingYear) ? h.healthTrackingYear : app.year;
    h.hasJointSupport = h.hasJointSupport || false;
    h.bond = Number.isFinite(h.bond) ? h.bond : 0;
    h.isRescue = h.isRescue || false;
    h.rescueWeightDelay = Number.isFinite(h.rescueWeightDelay) ? h.rescueWeightDelay : 0;
    h.rescueWeightCooldown = Number.isFinite(h.rescueWeightCooldown) ? h.rescueWeightCooldown : 0;
    if (h.healthTrackingYear !== app.year) {
      h.overTrainingCountYear = 0;
      h.pendingOvertrainingInjury = false;
      h.wrongFeedMonthsYear = 0;
      h.injuryCountYear = 0;
      h.healthTrackingYear = app.year;
    }
    h.pendingCompetitions = Array.isArray(h.pendingCompetitions) ? h.pendingCompetitions : [];
    h.titles = Array.isArray(h.titles) ? h.titles : [];
    h.height = h.height || heightFromBreed(h.breed);
    h.soundnessYears = Number.isFinite(h.soundnessYears) ? h.soundnessYears : rnd(1, 15);
    h.soundnessExpiredMonths = Number.isFinite(h.soundnessExpiredMonths) ? h.soundnessExpiredMonths : 0;
    h.lastSoundnessIssueMonth = Number.isFinite(h.lastSoundnessIssueMonth) ? h.lastSoundnessIssueMonth : 0;
    h.unridable = h.unridable || false;
    h.illnesses = Array.isArray(h.illnesses) ? h.illnesses : [];
    h.illnesses.forEach((ill) => {
      ill.remaining = Number.isFinite(ill.remaining) ? ill.remaining : 0;
      if (typeof ill.active !== 'boolean') {
        ill.active = ill.remaining > 0;
      }
    });
    h.pedigree = h.pedigree || {
      sire: null,
      dam: null,
      sireSire: null,
      sireDam: null,
      damSire: null,
      damDam: null
    };
    ensurePedigreeBase(h);
    h.stats = h.stats || { dressage: {}, jumping: {} };
    const d = h.stats.dressage || {};
    const j = h.stats.jumping || {};
    h.stats.dressage = {
      Collection: d.Collection ?? d.Relaxation ?? rnd(0, 20),
      Balance: d.Balance ?? d.Straightness ?? rnd(0, 20),
      Connection: d.Connection ?? rnd(0, 20),
      Gaits: d.Gaits ?? d.Impulsion ?? rnd(0, 20),
      Rhythm: d.Rhythm ?? rnd(0, 20),
      Flowiness: d.Flowiness ?? rnd(0, 20)
    };
    h.stats.jumping = {
      Striding: j.Striding ?? j.Adjustability ?? rnd(0, 20),
      Confidence: j.Confidence ?? rnd(0, 20),
      Balance: j.Balance ?? rnd(0, 20),
      Power: j.Power ?? rnd(0, 20),
      Speed: j.Speed ?? rnd(0, 20),
      Structure: j.Structure ?? j.Bascule ?? rnd(0, 20)
    };
    applyBreedTraits(h);
    h.lastFarrierMonth = Number.isFinite(h.lastFarrierMonth)
      ? h.lastFarrierMonth
      : (Number.isFinite(h.due?.farrierMonth) ? h.due.farrierMonth : app.year * 12 + app.month);
    h.hiddenIllnesses = Array.isArray(h.hiddenIllnesses) ? h.hiddenIllnesses : [];
  });
  refreshRescueHorses();
}

function resetGame() {
  app.money = 50000;
  app.month = 1;
  app.year = 1;
  app.horses = [];
  app.semenStraws = [];
  app.embryos = [];
  app.saleBarn = [];
  app.rescueBarn = [];
  app.npcSales = [];
  app.npcStuds = [];
  app.reports = [];
  app.competitionReports = [];
  app.rescueHorses = [];
  app.settings = { barnName: 'Oxer to Oxer Stable Manager', breedingCode: '', breedingCodePosition: 'front' };
  app.showOffspringWindow = true;
  app.trainingSelection = { horseId: '', discipline: 'jumping', exercise: '' };
  app.trainingRpgConfig = defaultTrainingRpgConfig();
  app.trainingRpg = null;
  app.trainingRpgFeedback = '';
  app.selectedHorseId = '';
  seed();
  saveGame(false);
}

function saveGame(manual = true) {
  try {
    localStorage.setItem(SAVE_KEY, serializeAppState());
    if (manual) pushReport('Game saved successfully.');
    return true;
  } catch (error) {
    if (manual) alert('Unable to save game in this browser/environment.');
    console.error('Save failed', error);
    return false;
  }
}

function loadGame(manual = true) {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) {
      if (manual) alert('No saved game found yet.');
      return false;
    }
    hydrateFromSave(JSON.parse(raw));
    if (manual) pushReport('Game loaded successfully.');
    return true;
  } catch (error) {
    if (manual) alert('Failed to load saved game data.');
    console.error('Load failed', error);
    return false;
  }
}

function pushReport(text) {
  app.reports.push({ date: dateLabel(), text });
}

function pushCompetitionReport(report) {
  app.competitionReports.push(report);
}

function canCompeteUnderSaddle(horse) {
  return horse.age >= 3 && !horse.unridable && !horse.retiredToBreeding && !horse.retiredForever;
}

function horseLifeStage(horse) {
  if (horse.age < 1) return 'Foal';
  if (horse.age < 3) return 'Young Horse';
  return 'Mature Horse';
}

function horseDisplayName(horse) {
  const branding = horse.registryInspection?.branding;
  return branding ? `${horse.name} "${branding}"` : horse.name;
}

function showRecordSummary(horse) {
  const records = horse.showResults || [];
  const first = records.filter((r) => r.placing === 1).length;
  const second = records.filter((r) => r.placing === 2).length;
  const third = records.filter((r) => r.placing === 3).length;
  return { total: records.length, first, second, third };
}

function bondLevelLabel(horse) {
  const bond = horse.bond || 0;
  if (horse.isRescue) {
    if (bond < 0) return 'Distant';
  }
  if (bond < 8) return 'Stranger';
  if (bond < 15) return 'Acquaintance';
  if (bond < 45) return 'Bonding';
  if (bond < 85) return 'Bestfriend';
  return 'Heart Horse';
}

function bondModifiers(horse) {
  const bond = horse.bond || 0;
  const rescuePenalty = horse.isRescue && bond < 0 ? 6 : 0;
  if (bond < 8) {
    return { penaltyBias: 4 + rescuePenalty, refusalBias: 10 + rescuePenalty, fallBias: 3 + rescuePenalty, trainingStruggle: 0.4, moodBoost: 0 };
  }
  if (bond < 15) {
    return { penaltyBias: 3 + rescuePenalty, refusalBias: 8 + rescuePenalty, fallBias: 2 + rescuePenalty, trainingStruggle: 0.4, moodBoost: 0.1 };
  }
  if (bond < 45) {
    return { penaltyBias: 1 + rescuePenalty, refusalBias: 4 + rescuePenalty, fallBias: 1 + rescuePenalty, trainingStruggle: 0.2, moodBoost: 0.2 };
  }
  if (bond < 85) {
    return { penaltyBias: 0 + rescuePenalty, refusalBias: 2 + rescuePenalty, fallBias: 0 + rescuePenalty, trainingStruggle: 0.2, moodBoost: 0.4 };
  }
  return { penaltyBias: -1 + rescuePenalty, refusalBias: 0 + rescuePenalty, fallBias: -1 + rescuePenalty, trainingStruggle: 0.1, moodBoost: 0.5 };
}

function updateBondMonthly(horse) {
  if (horse.retiredForever) return;
  let delta = 1;
  if (horse.manualTrainingThisMonth) delta += 3;
  const shows = Math.min(2, horse.lastShowEntries || 0);
  delta += shows * 2;
  const [feedMin, feedMax] = feedRangeBounds(horse);
  const feedTotal = (horse.feedPlan || []).reduce((sum, f) => sum + f.grams, 0);
  const trainingOk = horse.lastTrainingSessions >= Math.floor((horse.preferredTrainingSessions || 25) * 0.4)
    && horse.lastTrainingSessions <= (horse.preferredTrainingSessions || 25);
  const stamina = horse.trainingPreference || 'Medium';
  const [minTurnout, maxTurnout] = turnoutRangeBounds(stamina);
  const turnoutOk = horse.turnoutHours >= minTurnout && horse.turnoutHours <= maxTurnout;
  const feedOk = feedTotal >= feedMin && feedTotal <= feedMax;
  if (trainingOk && turnoutOk && feedOk) delta += 2;
  if (horse.farrierThisMonth) delta += 3;
  if (horse.soundnessYears <= 0 && !horse.retiredToBreeding && !horse.retiredForever && (horse.lastTrainingSessions > 0 || (horse.lastShowEntries || 0) > 0)) {
    delta -= 5;
  }
  const minBond = horse.isRescue ? -50 : 0;
  horse.bond = clamp((horse.bond || 0) + delta, minBond, 100);
  horse.manualTrainingThisMonth = false;
  horse.farrierThisMonth = false;
}

function highLevelWinCountWins(horse) {
  if (!horse.showResults?.length) return 0;
  return horse.showResults.filter((r) => {
    if (r.placing !== 1) return false;
    if (r.discipline === 'jumping') return Number(r.level) >= 1.6;
    if (r.discipline === 'hunter') return r.level === 'Open';
    if (r.discipline === 'eventing') return r.level === 'Four Star';
    if (r.discipline === 'dressage') return r.level === 'Grand Prix';
    return false;
  }).length;
}

function hasGrandPrixWin(horse) {
  return horse.showResults?.some((r) => r.discipline === 'dressage' && r.level === 'Grand Prix' && r.placing === 1);
}

function updateHorseTitles(horse) {
  const titles = Array.isArray(horse.titles) ? horse.titles : [];
  const addTitle = (title) => {
    if (!titles.includes(title)) titles.push(title);
  };
  const highWins = highLevelWinCountWins(horse);
  if (highWins >= 3) addTitle('Absolute Champion');
  if (highWins >= 15) addTitle('Legend');
  if ((horse.offspring || []).length >= 5) addTitle('Proven Producer');
  const totalShows = horse.showResults?.length || 0;
  const wins = horse.showResults?.filter((r) => r.placing === 1).length || 0;
  if (totalShows > 0 && wins / totalShows > 0.8) addTitle('Star');
  if (horse.registryInspection?.result === 'Fail' && hasGrandPrixWin(horse)) addTitle('Believer');
  horse.titles = titles;
}

function formattedHorseTitles(horse) {
  const registryTitle = horse.registryInspection?.title ? `${horse.registryInspection.title} Champion` : '';
  const customTitles = horse.titles?.length ? horse.titles.join(' • ') : '';
  return [registryTitle, customTitles].filter(Boolean).join(' • ');
}

function breedPercentages(breed) {
  if (!breed) return {};
  const parts = [];
  const regex = /([^x]+?)\s*(\d+)%/gi;
  let match;
  while ((match = regex.exec(breed)) !== null) {
    parts.push({ name: match[1].trim(), percent: Number(match[2]) });
  }
  if (!parts.length) {
    return { [breed]: 100 };
  }
  return parts.reduce((acc, part) => {
    acc[part.name] = part.percent;
    return acc;
  }, {});
}

function breedPurityPercent(breed) {
  const percents = breedPercentages(breed);
  const values = Object.values(percents);
  return values.length ? Math.max(...values) : 100;
}

function isSportCrossHorse(horse) {
  const purity = breedPurityPercent(horse.breed);
  return purity < 100;
}

function breedNorms(breed) {
  return BREED_NORMS[breed] || null;
}

function heightFromBreed(breed) {
  const norms = breedNorms(breed);
  const pickHeight = (min, max) => {
    const heights = [];
    for (let whole = Math.floor(min); whole <= Math.floor(max); whole += 1) {
      [1, 2, 3].forEach((decimal) => {
        const value = Number((whole + decimal / 10).toFixed(1));
        if (value >= min && value <= max) heights.push(value);
      });
    }
    if (!heights.length) return min;
    return pick(heights);
  };
  if (!norms) return `${pickHeight(14, 18).toFixed(1)} hh`;
  const min = Math.min(norms.minHeight, norms.maxHeight);
  const max = Math.max(norms.minHeight, norms.maxHeight);
  const height = pickHeight(min, max);
  return `${height.toFixed(1)} hh`;
}

function applyBreedTraits(horse) {
  if (!horse?.breed) return;
  if (horse.breedTraitsApplied === horse.breed) return;
  if (horse.breed === 'Friesian') {
    horse.marking = 'None';
    const roll = rnd(1, 100);
    horse.coat = roll <= 5 ? 'Chestnut (Dark)' : rnd(1, 100) <= 70 ? 'Black' : 'Bay (Dark)';
    horse.potential.dressage = Math.min(100, horse.potential.dressage + 12);
    horse.potential.jumping = Math.max(0, horse.potential.jumping - 10);
    horse.potential.eventing = Math.max(0, horse.potential.eventing - 10);
    horse.potential.hunter = Math.max(0, horse.potential.hunter - 10);
  }
  horse.breedTraitsApplied = horse.breed;
}

function visibleIllnesses(horse, revealAll) {
  return (horse.illnesses || []).filter((i) => revealAll || !i.hidden);
}

function applyFoalHandling(horse, exercise) {
  const plan = FOAL_TRAINING[exercise];
  if (!plan) return;
  horse.behavior = Math.max(0, (horse.behavior || 0) + rnd(plan.behavior[0], plan.behavior[1]));
  (plan.dressage || []).forEach((skill) => {
    horse.stats.dressage[skill] = clampSkill(horse, 'dressage', horse.stats.dressage[skill] + rnd(1, 2));
  });
  (plan.jumping || []).forEach((skill) => {
    horse.stats.jumping[skill] = clampSkill(horse, 'jumping', horse.stats.jumping[skill] + rnd(1, 2));
  });
  horse.managed.trained = true;
  if (horse.requiresBreakingIn && horse.behavior >= 100) {
    horse.requiresBreakingIn = false;
    pushReport(`${horse.name} completed breaking in and can begin regular training.`);
  }
}

function pedigreeBaseFromBreed(breed) {
  const percents = breedPercentages(breed);
  const entries = Object.entries(percents);
  if (entries.length >= 2) {
    const [sireBreed, sirePercent] = entries[0];
    const [damBreed] = entries[1];
    const normalizedSire = Math.min(100, Math.max(0, sirePercent));
    const normalizedDam = Math.max(0, 100 - normalizedSire);
    return { sireBreed, damBreed, sirePercent: normalizedSire, damPercent: normalizedDam };
  }
  const onlyBreed = entries.length ? entries[0][0] : breed || pick(BREEDS);
  return { sireBreed: onlyBreed, damBreed: onlyBreed, sirePercent: 50, damPercent: 50 };
}

function randomPedigreeName(label, breed) {
  const tag = pick(PEDIGREE_PREFIXES);
  const code = `${tag}-${rnd(1000, 9999)}`;
  const base = label === 'Dam'
    ? `${pick(['Lady', 'Queen', 'Bella', 'Nova', 'Ivy', 'Aurora'])} ${pick(['Grace', 'Dream', 'Breeze', 'Muse'])}`
    : `${pick(['Sir', 'King', 'Rider', 'Atlas', 'Titan', 'Noble'])} ${pick(['Valor', 'Legacy', 'Storm', 'Echo'])}`;
  return `${base} (#${code})`;
}

function ensurePedigreeBase(horse) {
  const ped = horse.pedigree || {
    sire: null,
    dam: null,
    sireSire: null,
    sireDam: null,
    damSire: null,
    damDam: null
  };
  const { sireBreed, damBreed, sirePercent, damPercent } = pedigreeBaseFromBreed(horse.breed);
  if (!ped.sire) ped.sire = { name: randomPedigreeName('Sire', sireBreed), breed: sireBreed, coat: pick(COATS), percent: sirePercent };
  if (!ped.dam) ped.dam = { name: randomPedigreeName('Dam', damBreed), breed: damBreed, coat: pick(COATS), percent: damPercent };
  horse.pedigree = ped;
}

function pedigreeEntry(label, info, subjectBreed) {
  const fallback = { name: 'Unknown', breed: 'Unknown', coat: 'Unknown' };
  const entry = info || fallback;
  const percents = breedPercentages(subjectBreed);
  const percentValue = Number.isFinite(entry.percent) ? entry.percent : entry.breed && percents[entry.breed] ? percents[entry.breed] : null;
  const percent = percentValue != null ? `${percentValue}%` : 'Unknown';
  return { relation: label, ...fallback, ...entry, percent };
}

function pedigreeForHorse(horse) {
  const ped = horse.pedigree || {};
  return [
    pedigreeEntry('Sire', ped.sire, horse.breed),
    pedigreeEntry('Dam', ped.dam, horse.breed),
    pedigreeEntry("Sire's Sire", ped.sireSire, horse.breed),
    pedigreeEntry("Sire's Dam", ped.sireDam, horse.breed),
    pedigreeEntry("Dam's Sire", ped.damSire, horse.breed),
    pedigreeEntry("Dam's Dam", ped.damDam, horse.breed)
  ];
}

function pedigreeStats(entry) {
  if (!entry || !entry.id) return null;
  return app.horses.find((h) => h.id === entry.id) || null;
}

function offspringSummary(horse) {
  const records = horse.offspring || [];
  let active = 0;
  let retired = 0;
  let sold = 0;
  records.forEach((o) => {
    const foal = app.horses.find((h) => h.id === o.foalId);
    if (!foal) {
      sold += 1;
      return;
    }
    if (foal.retiredForever || foal.retiredToBreeding) {
      retired += 1;
    } else {
      active += 1;
    }
  });
  return { total: records.length, active, retired, sold };
}

function horseDisciplineAverage(horse, discipline) {
  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  const jumpAvg = Object.values(jump).reduce((a, b) => a + b, 0) / 6;
  const dressAvg = Object.values(dress).reduce((a, b) => a + b, 0) / 6;
  if (discipline === 'dressage') return dressAvg;
  if (discipline === 'jumping') return (jumpAvg * 0.9) + (dress.Connection * 0.1);
  if (discipline === 'hunter') {
    return (dress.Flowiness + dress.Balance + dress.Collection + jump.Striding + jump.Confidence + jump.Balance + jump.Structure) / 7;
  }
  return (jumpAvg + dressAvg) / 2;
}

function clampSkill(horse, discipline, value) {
  const capValue = horse?.potential?.[discipline] ?? 100;
  return Math.min(capValue, value);
}

function disciplineStatsGroup(horse, discipline) {
  if (discipline === 'dressage') return horse.stats.dressage;
  if (discipline === 'jumping' || discipline === 'hunter') return horse.stats.jumping;
  return null;
}

function disciplineAtPotential(horse, discipline) {
  const capValue = horse?.potential?.[discipline] ?? 100;
  if (discipline === 'eventing') {
    const dressAt = Object.values(horse.stats.dressage).every((v) => v >= capValue);
    const jumpAt = Object.values(horse.stats.jumping).every((v) => v >= capValue);
    return dressAt && jumpAt;
  }
  const stats = disciplineStatsGroup(horse, discipline);
  return stats ? Object.values(stats).every((v) => v >= capValue) : false;
}

function autoTrainingOptionsForHorse(horse) {
  if (horse.requiresBreakingIn && (horse.behavior || 0) < 100) {
    return [{ value: 'Breaking in', label: 'Breaking in (lunging, accept touch, light work)' }];
  }
  if (horse.age < 3) {
    return [{ value: 'Breaking in', label: 'Breaking in (lunging, accept touch, light work)' }];
  }
  if (horse.retiredForever || horse.retiredToBreeding) {
    return [{ value: 'Light Exercise', label: 'Light Exercise (lunging/hot-walker)' }];
  }
  return [
    { value: 'jumping', label: 'Jumping' },
    { value: 'dressage', label: 'Dressage' },
    { value: 'eventing', label: 'Eventing' },
    { value: 'hunter', label: 'Hunters' }
  ];
}

function applyExerciseSession(horse, options = {}) {
  const { silent = false, accumulate = false } = options;
  const exercise = pick(['Lunging', 'Hot walker']);
  const hours = rnd(1, 3);
  horse.autoExerciseHours = accumulate ? (horse.autoExerciseHours || 0) + hours : hours;
  horse.managed.trained = true;
  horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
  if (!silent) {
    pushReport(`${horse.name} completed exercise: ${exercise} for ${hours} hour(s).`);
  }
  return { exercise, hours };
}

function levelIndex(discipline, level) {
  return SHOW_LEVELS[discipline].indexOf(level);
}


function requiredSkillBand(discipline, level) {
  const idx = Math.max(0, levelIndex(discipline, level));
  return LEVEL_SKILL_BANDS[discipline][idx] || [5, 100];
}

function effectiveDisciplineSkill(horse, discipline) {
  const raw = horseDisciplineAverage(horse, discipline);
  const talentBoost = horse.extraPotential ? 3 : 0;
  return Math.min(raw + talentBoost, horse.potential[discipline] || 100);
}

function horseSkillScore(horse) {
  return Math.round((horseDisciplineAverage(horse, 'jumping') + horseDisciplineAverage(horse, 'dressage')) / 2);
}

function priceRangeByConformationAndSkill(conformation, skillScore) {
  const ranges = [];
  if (['Very Bad', 'Bad'].includes(conformation)) {
    ranges.push({ min: 0, max: 15, price: [5000, 8000] });
    ranges.push({ min: 15, max: 30, price: [7000, 12000] });
    ranges.push({ min: 30, max: 45, price: [10000, 18000] });
    ranges.push({ min: 45, max: 60, price: [15000, 22000] });
    ranges.push({ min: 60, max: 75, price: [20000, 26000] });
    ranges.push({ min: 75, max: 85, price: [25000, 30000] });
  } else if (conformation === 'Acceptable') {
    ranges.push({ min: 0, max: 15, price: [8000, 12000] });
    ranges.push({ min: 15, max: 30, price: [10000, 18000] });
    ranges.push({ min: 30, max: 45, price: [16000, 25000] });
    ranges.push({ min: 45, max: 60, price: [22000, 32000] });
    ranges.push({ min: 60, max: 75, price: [30000, 40000] });
    ranges.push({ min: 75, max: 85, price: [38000, 45000] });
    ranges.push({ min: 85, max: 95, price: [45000, 50000] });
  } else if (['Good', 'Very Good'].includes(conformation)) {
    ranges.push({ min: 15, max: 30, price: [15000, 22000] });
    ranges.push({ min: 30, max: 45, price: [20000, 30000] });
    ranges.push({ min: 45, max: 60, price: [28000, 40000] });
    ranges.push({ min: 60, max: 75, price: [38000, 52000] });
    ranges.push({ min: 75, max: 85, price: [50000, 60000] });
    ranges.push({ min: 85, max: 95, price: [58000, 65000] });
  } else if (conformation === 'Excellent') {
    ranges.push({ min: 30, max: 45, price: [20000, 30000] });
    ranges.push({ min: 45, max: 60, price: [28000, 45000] });
    ranges.push({ min: 60, max: 75, price: [40000, 65000] });
    ranges.push({ min: 75, max: 85, price: [60000, 85000] });
    ranges.push({ min: 85, max: 95, price: [80000, 100000] });
    ranges.push({ min: 95, max: 100, price: [100000, 110000] });
  }
  const match = ranges.find((range) => skillScore >= range.min && skillScore < range.max);
  if (match) return match.price;
  if (ranges.length && skillScore >= ranges[ranges.length - 1].max) return ranges[ranges.length - 1].price;
  return [5000, 12000];
}

function highLevelWinCount(horse) {
  if (!horse.showResults?.length) return 0;
  return horse.showResults.filter((r) => {
    if (r.placing > 3) return false;
    if (r.discipline === 'jumping') return Number(r.level) >= 1.6;
    if (r.discipline === 'hunter') return r.level === 'Open';
    if (r.discipline === 'eventing') return r.level === 'Four Star';
    if (r.discipline === 'dressage') return r.level === 'Grand Prix';
    return false;
  }).length;
}

function calculateHorsePrice(horse, useRandom = false) {
  const skillScore = horseSkillScore(horse);
  const [minPrice, maxPrice] = priceRangeByConformationAndSkill(horse.conformation, skillScore);
  const base = useRandom ? rnd(minPrice, maxPrice) : Math.round((minPrice + maxPrice) / 2);
  const earningsBoost = Math.min(60000, Math.round((horse.earnings || 0) * 0.4));
  const highClassBoost = highLevelWinCount(horse) * 15000;
  const championshipBoost = horse.championships * 3000 + horse.reserves * 1500;
  const titleBoost = horse.registryInspection?.title === 'Elite' ? 30000 : horse.registryInspection?.title === 'Golden' ? 15000 : 0;
  return Math.max(3500, base + earningsBoost + highClassBoost + championshipBoost + titleBoost);
}

function highestAllowedLevelIndex(horse, discipline) {
  const score = effectiveDisciplineSkill(horse, discipline);
  let maxIdx = 0;
  SHOW_LEVELS[discipline].forEach((lvl, idx) => {
    const [minNeeded] = requiredSkillBand(discipline, lvl);
    if (score >= minNeeded) maxIdx = idx;
  });
  return maxIdx;
}

function disciplineLevelSummary(horse, discipline) {
  const idx = highestAllowedLevelIndex(horse, discipline);
  const label = SHOW_LEVELS[discipline][idx];
  return `${cap(discipline)} max: ${label}`;
}

function horseWorth(horse) {
  const agePenalty = horse.age > 16 ? (horse.age - 16) * 1500 : 0;
  const base = calculateHorsePrice(horse, false);
  return Math.max(350, Math.round(base - agePenalty));
}

function baseHorse(type = 'trained', origin = 'player') {
  const minAge = type === 'untrained' ? 4 : type === 'trained' ? 8 : 10;
  const maxAge = type === 'untrained' ? 6 : type === 'trained' ? 11 : 12;
  const name = `${pick(['Silver', 'Midnight', 'Winter', 'Storm', 'Emerald', 'Hope', 'Royal', 'Velvet', 'Sol', 'Luna', 'Aster', 'Río', 'Nieve', 'Cielo', 'Frost', 'Sable', 'Aquila', 'Noir', 'Azul', 'Viento', 'Sakura', 'Kumo', 'Brisa', 'Ravn', 'Fuego', 'Aurum', 'Étoile', 'Vega'])} ${pick(['Dream', 'River', 'Valor', 'Cross', 'Echo', 'Flight', 'Blessing', 'Danza', 'Cielo', 'Mistral', 'Reina', 'Fleur', 'Nimbus', 'Solstice', 'Gloria', 'Mariposa', 'Orion', 'Zenith', 'Eclipse', 'Horizon', 'Belle', 'Shadow', 'Storm', 'Mirage'])}`;
  const potential = {
    dressage: rnd(35, 100),
    jumping: rnd(35, 100),
    eventing: rnd(35, 100),
    hunter: rnd(35, 100)
  };
  const statRange = type === 'untrained' ? [0, 10] : type === 'trained' ? [30, 60] : [85, 95];
  const horse = {
    id: uid(),
    name,
    breed: pick(BREEDS),
    gender: pick(['Mare', 'Stallion', 'Gelding']),
    age: rnd(minAge, maxAge),
    coat: pick(COATS),
    socks: pick(SOCKS),
    marking: 'None',
    faceMarking: pick(FACE_MARKINGS),
    personality: pick(PERSONALITIES),
    behavior: 0,
    controlability: 50,
    extraPotential: false,
    healthGenetics: pick(['Low', 'Medium', 'High']),
    injuryProtection: {},
    registryInspection: null,
    showInspectionDetails: false,
    showOffspringSummary: false,
    showPedigree: false,
    notes: '',
    showNotes: false,
    showTrainerNotes: false,
    feedPlan: [],
    autoTrainingPlan: [],
    autoTrainingFocus: '',
    autoExerciseHours: 0,
    preferredFeedGrams: rnd(50, 250),
    preferredMood: pick(['Motivated', 'Happy', 'Try-Hard', 'Neutral']),
    mood: 'Neutral',
    weightStatus: 'Moderate',
    trainingPreference: pick(['Low', 'Medium', 'High']),
    preferredTrainingSessions: rnd(10, 50),
    trainingSessionsThisMonth: 0,
    lastTrainingSessions: 0,
    showEntriesThisMonth: 0,
    lastShowEntries: 0,
    manualTrainingThisMonth: false,
    farrierThisMonth: false,
    turnoutHours: 0,
    tack: {
      bridle: 'Snaffle Bridle',
      bit: 'Loose Ring Snaffle',
      saddle: 'All-Purpose Saddle',
      pad: 'Basic Pad',
      footwear: 'Tendon Boots',
      headwear: 'Halter',
      body: 'No Blanket'
    },
    turnoutAssignmentHours: 0,
    trainingBoost: 0,
    competitionBoost: 0,
    feedPerformanceDelta: 0,
    feedTrainingDelta: 0,
    turnoutEffect: 0,
    trainingPerformanceDelta: 0,
    healingBoost: 0,
    titles: [],
    failedInspection: false,
    requiresBreakingIn: false,
    trainerNotes: [],
    lastFeedIssue: null,
    lastFeedMoodOverride: '',
    lastTurnoutIssue: '',
    lastTrainingIssue: '',
    wrongFeedMonthsYear: 0,
    overTrainingCountYear: 0,
    pendingOvertrainingInjury: false,
    injuryCountYear: 0,
    healthTrackingYear: app.year,
    hasJointSupport: false,
    bond: 0,
    isRescue: false,
    rescueWeightDelay: 0,
    rescueWeightCooldown: 0,
    conformation: pick(CONFORMATION),
    height: '',
    soundnessYears: rnd(1, 15),
    soundnessExpiredMonths: 0,
    lastSoundnessIssueMonth: 0,
    unridable: false,
    owner: 'Your Stable',
    bredBy: 'Your Stable',
    retiredToBreeding: false,
    retiredForever: false,
    managed: { fed: false, vet: false, farrier: false, showEntry: false, breedersEntry: false, trained: false },
    due: { checkup: true, farrier: false },
    lastFarrierMonth: app.year * 12 + app.month,
    illnesses: [],
    hiddenIllnesses: [],
    healthRisks: [pick(['Metabolic', 'Colic', 'Laminitis', 'Tendon Strain']), pick(['Arthritis', 'Respiratory', 'Ulcers', 'None'])],
    vetNotes: [],
    stats: {
      dressage: { Collection: rnd(statRange[0], statRange[1]), Balance: rnd(statRange[0], statRange[1]), Connection: rnd(statRange[0], statRange[1]), Gaits: rnd(statRange[0], statRange[1]), Rhythm: rnd(statRange[0], statRange[1]), Flowiness: rnd(statRange[0], statRange[1]) },
      jumping: { Striding: rnd(statRange[0], statRange[1]), Confidence: rnd(statRange[0], statRange[1]), Balance: rnd(statRange[0], statRange[1]), Power: rnd(statRange[0], statRange[1]), Speed: rnd(statRange[0], statRange[1]), Structure: rnd(statRange[0], statRange[1]) }
    },
    potential,
    coi: rnd(0, 25),
    showResults: [],
    pendingCompetitions: [],
    titles: [],
    breedersEntries: 0,
    totalPoints: 0,
    championships: 0,
    reserves: 0,
    earnings: 0,
    topWins: { mareFilly: 0, breed: 0, overall: 0, highestScore: 0 },
    offspring: [],
    pedigree: {
      sire: null,
      dam: null,
      sireSire: null,
      sireDam: null,
      damSire: null,
      damDam: null
    }
  };
  horse.height = heightFromBreed(horse.breed);
  horse.controlability = controlabilityFromPersonality(horse.personality);
  applyBreedTraits(horse);
  if (origin === 'npc') {
    const { sireBreed, damBreed, sirePercent, damPercent } = pedigreeBaseFromBreed(horse.breed);
    horse.pedigree.sire = { name: randomPedigreeName('Sire', sireBreed), breed: sireBreed, coat: pick(COATS), percent: sirePercent };
    horse.pedigree.dam = { name: randomPedigreeName('Dam', damBreed), breed: damBreed, coat: pick(COATS), percent: damPercent };
  }
  ensurePedigreeBase(horse);
  if (rnd(1, 100) <= 18) {
    horse.extraPotential = true;
    Object.keys(horse.potential).forEach((k) => {
      horse.potential[k] = Math.min(100, horse.potential[k] + rnd(6, 14));
    });
  }
  horse.marking = randomMarking(horse.breed);
  return horse;
}

function createRescueHorse() {
  const horse = baseHorse('untrained', 'npc');
  horse.age = rnd(1, 4);
  horse.owner = 'Rescue Organization';
  horse.requiresBreakingIn = rnd(1, 100) <= 45;
  if (horse.requiresBreakingIn) horse.behavior = rnd(0, 40);
  const illnessCount = rnd(1, 3);
  horse.illnesses = Array.from({ length: illnessCount }, () => {
    const picked = pick(SICKNESS_TYPES);
    const remaining = rnd(1, 4);
    return {
      name: picked.name,
      impact: picked.impact,
      remaining,
      active: true,
      severity: picked.severity,
      retirementRisk: picked.retirementRisk || 0,
      hidden: rnd(1, 100) <= 55
    };
  });
  horse.soundnessYears = Math.max(0, horse.soundnessYears - rnd(0, 3));
  horse.rescueId = uid();
  horse.rescueFee = rnd(300, 900);
  return horse;
}

function inheritExtraPotential(dam, sire) {
  const inheritedChance = dam?.extraPotential || sire?.extraPotential ? 35 : 18;
  return rnd(1, 100) <= inheritedChance;
}

function foalPotential(dam, sire) {
  const disciplines = Object.keys(SHOW_LEVELS);
  const output = {};
  disciplines.forEach((d) => {
    const damValue = Number.isFinite(dam?.potential?.[d]) ? dam.potential[d] : rnd(35, 100);
    const sireValue = Number.isFinite(sire?.potential?.[d]) ? sire.potential[d] : rnd(35, 100);
    const low = Math.max(0, Math.min(damValue, sireValue) - 5);
    const high = Math.min(100, Math.max(damValue, sireValue) + 10);
    output[d] = rnd(Math.min(low, high), Math.max(low, high));
  });
  return output;
}


function seed() {
  app.horses = [baseHorse('trained'), baseHorse('untrained'), baseHorse('fully')];
  app.saleBarn = [baseHorse('fully', 'npc'), baseHorse('trained', 'npc')].map((h) => {
    seedShowHistory(h, rnd(1, 3), 10);
    return { ...h, owner: 'NPC Stable', price: Math.round(calculateHorsePrice(h, true) * rnd(95, 110) / 100) };
  });
  refreshNpcAds();
  refreshRescueHorses();
}

function seedShowHistory(horse, showCount = rnd(1, 4), maxLevelIndex = 4) {
  horse.showResults = Array.isArray(horse.showResults) ? horse.showResults : [];
  const disciplines = Object.keys(SHOW_LEVELS);
  const safeCount = Math.max(0, showCount);
  for (let i = 0; i < safeCount; i += 1) {
    const discipline = pick(disciplines);
    const levels = SHOW_LEVELS[discipline] || [];
    if (!levels.length) continue;
    const levelCap = Math.min(levels.length - 1, Math.max(0, maxLevelIndex));
    const level = levels[rnd(0, levelCap)];
    const placing = rnd(1, 12);
    const score = rnd(58, 98);
    const prize = Math.max(0, Math.round((13 - placing) * rnd(60, 180)));
    horse.showResults.push({
      date: dateLabel(),
      discipline,
      level,
      score,
      placing,
      prize,
      resultText: `Score ${score}`
    });
    horse.totalPoints = (horse.totalPoints || 0) + Math.max(0, 30 - placing);
    horse.earnings = (horse.earnings || 0) + prize;
    if (placing === 1) horse.championships = (horse.championships || 0) + 1;
    if (placing === 2) horse.reserves = (horse.reserves || 0) + 1;
  }
  updateHorseTitles(horse);
}

function refreshNpcAds() {
  const saleCount = 6;
  const studCount = 5;
  app.npcSales = Array.from({ length: saleCount }, () => {
    const horse = baseHorse(pick(['trained', 'fully']), 'npc');
    seedShowHistory(horse, rnd(1, 4), 8);
    horse.owner = pick(['North Ridge Stable', 'Willow Creek Farm', 'Silverline Equestrian', 'Ravenwood Horses']);
    horse.saleId = uid();
    horse.price = Math.round(calculateHorsePrice(horse, true) * rnd(90, 118) / 100);
    return horse;
  });
  app.npcStuds = Array.from({ length: studCount }, () => {
    const stallion = baseHorse('fully', 'npc');
    stallion.gender = 'Stallion';
    seedShowHistory(stallion, rnd(2, 6), 10);
    stallion.owner = pick(['Blue Stone Stud', 'Goldleaf Stallions', 'Westwind Breeding', 'Pine Hollow Sporthorses']);
    stallion.studId = uid();
    stallion.fee = Math.max(500, Math.round(horseWorth(stallion) * rnd(4, 9) / 100));
    return stallion;
  });
}

function generateRescueHorse() {
  const name = `${pick(['Hope', 'Misty', 'Shadow', 'Brave', 'Willow', 'Ash', 'Storm', 'Echo'])} ${pick(['Rescue', 'Heart', 'Spirit', 'Horizon', 'Promise'])}`;
  const age = rnd(3, 18);
  const ageLabel = rnd(1, 100) <= 15 ? `${age}` : `${rnd(Math.max(2, age - 3), age + 3)}-${rnd(age + 4, age + 8)}`;
  const breed = randomRescueBreed();
  const gender = pick(['Mare', 'Stallion', 'Gelding']);
  const weightStatus = pick(['Very Underweight', 'Underweight', 'Fleshy', 'Overweight']);
  const issues = rescueHealthIssues();
  const deadlineMonths = rnd(1, 8);
  const deadlineMonthIndex = currentMonthIndex() + deadlineMonths;
  return {
    id: uid(),
    name,
    age,
    ageLabel,
    breed,
    gender,
    weightStatus,
    issues,
    deadlineMonthIndex,
    price: rnd(500, 1500),
    note: 'After buying a rescue horse, make sure to give them a vet check! They might have a hidden illness or two…',
    rescueWeightDelay: rnd(4, 12)
  };
}

function refreshRescueHorses() {
  const now = currentMonthIndex();
  if (!Array.isArray(app.rescueHorses)) app.rescueHorses = [];
  app.rescueHorses = app.rescueHorses.filter((h) => h.deadlineMonthIndex > now);
  while (app.rescueHorses.length < 15) {
    app.rescueHorses.push(generateRescueHorse());
  }
}

function randomRescueBreed() {
  const roll = rnd(1, 100);
  const one = pick(BREEDS);
  if (roll <= 15) return `${one} 100%`;
  if (roll <= 50) {
    const two = pick(BREEDS.filter((b) => b !== one));
    return `${one} 50% x ${two} 50%`;
  }
  if (roll <= 85) {
    const picks = [one, pick(BREEDS), pick(BREEDS), pick(BREEDS)];
    return picks.map((b) => `${b} 25%`).join(' x ');
  }
  const picks = [one, pick(BREEDS), pick(BREEDS), pick(BREEDS), pick(BREEDS)];
  return picks.map((b) => `${b} 15%`).join(' x ');
}

function rescueHealthIssues() {
  const pool = [
    { name: 'Internal Parasites', severity: 'Medium' },
    { name: 'Chronic Infection', severity: 'More Than Medium' },
    { name: 'Laminitis', severity: 'Severe' },
    { name: 'Anhidrosis', severity: 'Medium' },
    { name: 'Melanoma', severity: 'Severe' },
    { name: 'Kissing Spines', severity: 'Very Severe' }
  ];
  if (rnd(1, 100) > 75) return [];
  const count = rnd(1, 4);
  return Array.from({ length: count }, () => pick(pool));
}

function generateRescueHorse() {
  const name = `${pick(['Hope', 'Misty', 'Shadow', 'Brave', 'Willow', 'Ash', 'Storm', 'Echo'])} ${pick(['Rescue', 'Heart', 'Spirit', 'Horizon', 'Promise'])}`;
  const age = rnd(3, 18);
  const ageLabel = rnd(1, 100) <= 15 ? `${age}` : `${rnd(Math.max(2, age - 3), age + 3)}-${rnd(age + 4, age + 8)}`;
  const breed = randomRescueBreed();
  const gender = pick(['Mare', 'Stallion', 'Gelding']);
  const weightStatus = pick(['Very Underweight', 'Underweight', 'Fleshy', 'Overweight']);
  const issues = rescueHealthIssues();
  const deadlineMonths = rnd(1, 8);
  const deadlineMonthIndex = currentMonthIndex() + deadlineMonths;
  return {
    id: uid(),
    name,
    age,
    ageLabel,
    breed,
    gender,
    weightStatus,
    issues,
    deadlineMonthIndex,
    price: rnd(500, 1500),
    note: 'After buying a rescue horse, make sure to give them a vet check! They might have a hidden illness or two…',
    rescueWeightDelay: rnd(4, 12)
  };
}

function refreshRescueHorses() {
  const now = currentMonthIndex();
  if (!Array.isArray(app.rescueHorses)) app.rescueHorses = [];
  app.rescueHorses = app.rescueHorses.filter((h) => h.deadlineMonthIndex > now);
  while (app.rescueHorses.length < 15) {
    app.rescueHorses.push(generateRescueHorse());
  }
}

function updateHeader() {
  const monthEl = document.getElementById('monthLabel');
  const moneyEl = document.getElementById('moneyLabel');
  const titleEl = document.querySelector('.topbar h1');
  if (titleEl) titleEl.textContent = app.settings?.barnName || 'Oxer to Oxer Stable Manager';
  if (monthEl) monthEl.textContent = `Month ${app.month}, Year ${app.year}`;
  if (moneyEl) moneyEl.innerHTML = `<span class="money">${money(app.money)}</span>`;
}

function changeTab(tab) {
  tabs.forEach((t) => {
    const panel = document.getElementById(t);
    panel?.classList.toggle('hidden', t !== tab);
    document.querySelector(`[data-tab='${t}']`)?.classList.toggle('active', t === tab);
  });
}

function ensurePanels() {
  let main = document.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    document.body.append(main);
  }
  tabs.forEach((tab) => {
    if (document.getElementById(tab)) return;
    const section = document.createElement('section');
    section.id = tab;
    section.className = 'panel hidden';
    main.append(section);
  });
}

function buildTabs() {
  let wrap = document.getElementById('tabs');
  if (!wrap) {
    wrap = document.createElement('nav');
    wrap.id = 'tabs';
    wrap.className = 'tabs';
    const topbar = document.querySelector('.topbar');
    if (topbar && topbar.nextSibling) topbar.parentNode.insertBefore(wrap, topbar.nextSibling);
    else document.body.prepend(wrap);
  }
  wrap.innerHTML = '';
  tabs.forEach((tab) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.dataset.tab = tab;
    btn.textContent = cap(tab);
    btn.onclick = () => changeTab(tab);
    wrap.append(btn);
  });
  changeTab('dashboard');
}

function renderDashboard() {
  const sick = app.horses.filter((h) => h.illnesses.some((i) => i.active)).length;
  const competitionReports = app.competitionReports.slice(-6).reverse().map((report) => `
    <details class='report'>
      <summary>${report.horseName} — ${cap(report.discipline)} ${report.level} (#${report.placing}/${report.fieldSize})</summary>
      <div class='box'>
        <p><strong>Competition:</strong> ${report.competitionName}</p>
        <p><strong>Penalties:</strong> ${report.penaltiesText || '-'}</p>
        <p><strong>Time/Score:</strong> ${report.timeScoreText || '-'}</p>
        <p><strong>Horse Name:</strong> ${report.horseName}</p>
        <p><strong>Horse Breed:</strong> ${report.horseBreed}</p>
        <p><strong>Date:</strong> ${report.date}</p>
        <p><strong>Placing:</strong> #${report.placing} of ${report.fieldSize}</p>
        <h4>Highlights</h4>
        <ul>${(report.highlights || []).map((line) => `<li>${line}</li>`).join('')}</ul>
        <h4>Comments</h4>
        <p>${report.comment}</p>
        <h4>Suggestions</h4>
        <p>${report.suggestion}</p>
      </div>
    </details>
  `).join('') || '<p class="small">No competition reports yet.</p>';
  document.getElementById('dashboard').innerHTML = `
    <div class="grid two">
      <div class="box">
        <h2>Stable Snapshot</h2>
        <p>Horses: <strong>${app.horses.length}</strong></p>
        <p>Horses currently sick/injured: <strong>${sick}</strong></p>
        <p>Frozen Semen Straws: <strong>${app.semenStraws.length}</strong></p>
        <p>Frozen Embryos: <strong>${app.embryos.length}</strong></p>
      </div>
      <div class="box">
        <h2>Latest Reports</h2>
        ${app.reports.slice(-8).reverse().map((r) => `<p class='small'>${r.date}: ${r.text}</p>`).join('') || '<p class="small">No reports yet.</p>'}
      </div>
    </div>
    <div class="box">
      <h2>Competition Reports</h2>
      <button id="clear-competition-reports">Clear Reports</button>
      ${competitionReports}
    </div>
  `;
  const clearBtn = document.getElementById('clear-competition-reports');
  if (clearBtn) {
    clearBtn.onclick = () => {
      app.competitionReports = [];
      renderDashboard();
      saveGame(false);
    };
  }
}

function createHorseCard(horse) {
  horse.illnesses = Array.isArray(horse.illnesses) ? horse.illnesses : [];
  horse.managed = horse.managed || { fed: false, vet: false, farrier: false, trained: false, shown: false };
  horse.stats = horse.stats || { dressage: {}, jumping: {} };
  horse.stats.dressage = horse.stats.dressage || {};
  horse.stats.jumping = horse.stats.jumping || {};
  horse.topWins = horse.topWins || { mareFilly: 0, breed: 0, overall: 0 };
  horse.showResults = Array.isArray(horse.showResults) ? horse.showResults : [];
  horse.soundnessYears = Number.isFinite(horse.soundnessYears) ? horse.soundnessYears : 0;
  horse.weightStatus = horse.weightStatus || 'Healthy Weight';
  horse.coi = Number.isFinite(horse.coi) ? horse.coi : 0;
  const tpl = document.getElementById('horseCardTemplate');
  const node = tpl?.content?.firstElementChild
    ? tpl.content.firstElementChild.cloneNode(true)
    : (() => {
      const article = document.createElement('article');
      article.className = 'horse-card';
      article.innerHTML = `<h3 class='horse-name'></h3><p class='subline'></p><p class='meta'></p><div class='grid two'><div><h4>Jump Training</h4><ul class='stats jump-stats'></ul></div><div><h4>Dressage Training</h4><ul class='stats dressage-stats'></ul></div></div><div class='grid two'><div class='results'></div><div class='manage'></div></div>`;
      return article;
    })();
  const activeIssue = (horse.illnesses || []).find((i) => i.active);
  const injuryLine = activeIssue ? ` • Injury: ${activeIssue.name}` : '';
  const revealAll = options.revealAll ?? horse.owner === 'Your Stable';
  const visible = visibleIllnesses(horse, revealAll);
  const hiddenCount = Math.max(0, (horse.illnesses || []).length - visible.length);
  const illnessLine = visible.length
    ? visible.map((i) => `${i.name}${i.active ? ` (${i.remaining} mo)` : ''}`).join(', ')
    : 'None';
  const illnessLineWithHidden = !revealAll && hiddenCount > 0 ? `${illnessLine} (+${hiddenCount} hidden)` : illnessLine;
  const titleLabel = formattedHorseTitles(horse);
  const autoOptions = autoTrainingOptionsForHorse(horse);
  const autoFocusOptions = [
    { value: '', label: 'None' },
    ...autoOptions
  ].map((option) => `<option value='${option.value}' ${horse.autoTrainingFocus === option.value ? 'selected' : ''}>${option.label}</option>`).join('');

  node.querySelector('.horse-name').textContent = horseDisplayName(horse);
  let titleEl = node.querySelector('.horse-title');
  if (!titleEl) {
    titleEl = document.createElement('p');
    titleEl.className = 'horse-title';
    node.querySelector('.horse-name').insertAdjacentElement('afterend', titleEl);
  }
  titleEl.textContent = titleLabel || '';
  const socks = horse.socks || 'None';
  const face = horse.faceMarking || 'Faint';
  node.querySelector('.subline').textContent = `${horse.height} | ${horse.coat} | ${socks} | ${horse.marking} | Face: ${face} | ${horse.age} | ${horse.gender} | ${horseLifeStage(horse)}`;
  node.querySelector('.meta').textContent = `${horse.breed} • Personality: ${horse.personality} • Behavior: ${horse.behavior || 0} • Mood: ${horse.mood} • Weight: ${horse.weightStatus} • Conformation: ${horse.conformation} • COI: ${horse.coi}% • Soundness: ${horse.soundnessYears.toFixed(1)} years est. • Worth: ${money(horseWorth(horse))}${horse.extraPotential ? ' • Extra potential' : ''}${injuryLine} • ${canCompeteUnderSaddle(horse) ? 'Under saddle eligible' : 'In-hand/registry only until age 3'}`;

  const dList = node.querySelector('.dressage-stats');
  Object.entries(horse.stats.dressage).forEach(([k, v]) => { dList.innerHTML += `<li>${k}: ${v}</li>`; });
  const jList = node.querySelector('.jump-stats');
  Object.entries(horse.stats.jumping).forEach(([k, v]) => { jList.innerHTML += `<li>${k}: ${v}</li>`; });

  const record = showRecordSummary(horse);
  const bondValue = Number.isFinite(horse.bond) ? horse.bond : 0;
  const bondLabel = bondLevelLabel(horse);
  const bondPercent = clamp(bondValue, 0, 100);
  node.querySelector('.results').innerHTML = `
    <h4>Competition Results</h4>
    <p>Total Points: ${horse.totalPoints} | Championships: ${horse.championships} | Reserves: ${horse.reserves}</p>
    <p>Lifetime Earnings: ${money(horse.earnings)}</p>
    <p class='small'>Illnesses: ${illnessLineWithHidden}</p>
    <p>Show record: ${record.total} (${record.first}-${record.second}-${record.third})</p>
    <p>Top Mare/Filly: ${horse.topWins.mareFilly} | Best Breed: ${horse.topWins.breed} | Best Overall: ${horse.topWins.overall}</p>
    ${horse.showResults.length ? `<p class='small'>Latest: ${horse.showResults[horse.showResults.length - 1].discipline} ${horse.showResults[horse.showResults.length - 1].level} — #${horse.showResults[horse.showResults.length - 1].placing} (${horse.showResults[horse.showResults.length - 1].resultText || horse.showResults[horse.showResults.length - 1].score})</p>` : '<p class="small">No show entries yet.</p>'}
    <p class='small'>${disciplineLevelSummary(horse, 'jumping')} | ${disciplineLevelSummary(horse, 'dressage')} | ${disciplineLevelSummary(horse, 'eventing')} | ${disciplineLevelSummary(horse, 'hunter')}</p>
  `;

  node.querySelector('.manage').innerHTML = `
    <h4>Management</h4>
    <div class='inline'>
      <button data-action='feed'>Fed: ${horse.managed.fed ? 'Y' : 'N'}</button>
      <button data-action='vet'>Vet: ${horse.managed.vet ? 'Y' : 'N'}</button>
      <button data-action='farrier'>Farrier: ${horse.managed.farrier ? 'Y' : 'N'}</button>
      <button data-action='train'>Trained: ${horse.managed.trained ? 'Y' : 'N'}</button>
    </div>
    <label>Rename horse</label><input type='text' value='${horse.name}' />
    <button data-action='rename'>Save Name</button>
    <button data-action='retire-breeding'>${horse.retiredToBreeding ? 'Return to Competition' : 'Retire to Breeding'}</button>
    <button data-action='retire-forever'>Retire to Greener Pastures</button>
    <button data-action='list-sale'>List in Sale Barn ($)</button>
    <button data-action='npc-sell'>Sell to NPC (${money(horseWorth(horse))})</button>
    <button data-action='rehome'>Rehome for Free</button>
    <label>Notes</label><textarea rows='3' class='note-input'>${horse.notes}</textarea>
    <button data-action='save-notes'>Save Notes</button>
    <button data-action='toggle-notes'>${horse.showNotes ? 'Hide Notes' : 'Show Notes'}</button>
    ${horse.showNotes && horse.notes ? `<div class='box'><p class='small'>${horse.notes}</p></div>` : ''}
    <label>Feed Plan</label>
    <select class='feed-type'>${FEEDS.map((f) => `<option value='${f}'>${f}</option>`).join('')}</select>
    <label>Amount (grams)</label>
    <input type='number' class='feed-grams' min='50' max='250' value='150' />
    <button data-action='add-feed'>Add Feed</button>
    <button data-action='clear-feed'>Clear Feed Plan</button>
    ${horse.feedPlan.length ? `<div class='box'><p class='small'>${horse.feedPlan.map((f) => `${f.type} (${f.grams}g)`).join(', ')}</p></div>` : '<p class="small">No feed assigned.</p>'}
    <p class='small'>Preferred feed range: ${feedRangeBounds(horse)[0]}-${feedRangeBounds(horse)[1]}g (you don’t need to be exact, just within range).</p>
    <label>Controlability</label>
    <p class='small'>${horse.controlability || 0}%</p>
    <label>Tack: Bridle</label><select class='tack-bridle'>${TACK.bridle.map((x) => `<option ${horse.tack?.bridle === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Bit</label><select class='tack-bit'>${TACK.bit.map((x) => `<option ${horse.tack?.bit === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Saddle</label><select class='tack-saddle'>${TACK.saddle.map((x) => `<option ${horse.tack?.saddle === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Saddle Pad</label><select class='tack-pad'>${TACK.pad.map((x) => `<option ${horse.tack?.pad === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Headwear</label><select class='tack-headwear'>${TACK.headwear.map((x) => `<option ${horse.tack?.headwear === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <label>Tack: Body</label><select class='tack-body'>${TACK.body.map((x) => `<option ${horse.tack?.body === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
    <button data-action='save-tack'>Save Tack</button>
    <label>Turn-out assignment (hours)</label>
    <input type='number' class='turnout-hours' min='0.5' max='14' step='0.5' value='${horse.turnoutAssignmentHours || ''}' placeholder='0.5 - 14' />
    <p class='small'>Mood: ${horse.mood} • Weight: ${horse.weightStatus} • Training stamina: ${horse.trainingPreference} (${trainingStaminaRange(horse.trainingPreference)} sessions) • Turnout range: ${turnoutRange(horse.trainingPreference)} hrs</p>
    <button data-action='save-turnout'>Save Turn-out</button>
    <details class='bond-box'>
      <summary>Bond</summary>
      <div class='box'>
        <p class='small'>Level: ${bondLabel} (${bondValue.toFixed(0)}%)</p>
        <div class='bond-meter'><span style='width:${bondPercent}%;'></span></div>
      </div>
    </details>
    <button data-action='toggle-trainer-notes'>${horse.showTrainerNotes ? 'Hide Trainer Notes' : 'Show Trainer Notes'}</button>
    ${horse.showTrainerNotes ? `<div class='box'>${horse.trainerNotes.length ? horse.trainerNotes.map((n) => `<p class='small'>${n}</p>`).join('') : '<p class="small">No trainer notes this month.</p>'}</div>` : ''}
    <label>Auto Training Focus (monthly)</label>
    <select class='auto-focus'>${autoFocusOptions}</select>
    <p class='small'>Auto training uses the preferred training amount (${horse.preferredTrainingSessions} sessions).</p>
    <button data-action='save-auto-focus'>Save Auto Training</button>
    ${horse.autoTrainingFocus ? `<p class='small'>Auto training set to: ${horse.autoTrainingFocus}</p>` : '<p class="small">No auto training assigned.</p>'}
    ${horse.autoExerciseHours ? `<p class='small'>Exercise (retired/maxed): ${horse.autoExerciseHours} hour(s) on lunging/hot-walker.</p>` : ''}
    <button data-action='vet-notes'>${horse.showVetNotes ? 'Hide Vet Notes' : 'Show Vet Notes'}</button>
    ${horse.showVetNotes ? `<div class='box'>${horse.vetNotes.length ? horse.vetNotes.map((n) => `<p class='small'>${n.date}: ${n.text}</p>`).join('') : '<p class="small">No vet notes yet.</p>'}</div>` : ''}
    ${horse.registryInspection ? `<button data-action='inspection-details'>${horse.showInspectionDetails ? 'Hide Inspection Details' : 'Show Inspection Details'}</button>` : ''}
    ${horse.registryInspection && horse.showInspectionDetails ? `
      <div class='box'>
        <p class='small'>Inspection (${horse.registryInspection.result}) — Score ${horse.registryInspection.totalScore.toFixed(2)}</p>
        <p class='small'>Conformation: ${horse.registryInspection.conformation.toFixed(1)} | Condition: ${horse.registryInspection.condition.toFixed(1)} | Pedigree: ${horse.registryInspection.pedigree == null ? 'N/A' : horse.registryInspection.pedigree.toFixed(1)} | Potential: ${horse.registryInspection.potential.toFixed(1)}</p>
      </div>
    ` : ''}
    <button data-action='toggle-pedigree'>${horse.showPedigree ? 'Hide Pedigree' : 'Show Pedigree'}</button>
    ${horse.showPedigree ? (() => {
      const entries = pedigreeForHorse(horse);
      return `<div class='box pedigree-grid'>
        ${entries.map((entry) => {
          const stats = pedigreeStats(entry);
          const disciplineMax = stats
            ? `${disciplineLevelSummary(stats, 'jumping')} | ${disciplineLevelSummary(stats, 'dressage')} | ${disciplineLevelSummary(stats, 'eventing')} | ${disciplineLevelSummary(stats, 'hunter')}`
            : 'Unknown';
          const record = stats ? showRecordSummary(stats) : null;
          return `<div class='pedigree-entry'>
            <p class='small pedigree-relation'>${entry.relation}</p>
            <details ${entry.name !== 'Unknown' ? '' : ''}>
              <summary>${entry.name}</summary>
              <p class='small'>Breed: ${entry.breed} (${entry.percent})</p>
              <p class='small'>Coat: ${entry.coat}</p>
              <p class='small'>Jumping Stats: ${stats ? Object.entries(stats.stats.jumping).map(([k, v]) => `${k} ${v}`).join(', ') : 'Unknown'}</p>
              <p class='small'>Dressage Stats: ${stats ? Object.entries(stats.stats.dressage).map(([k, v]) => `${k} ${v}`).join(', ') : 'Unknown'}</p>
              <p class='small'>Personality: ${stats ? stats.personality : 'Unknown'}</p>
              <p class='small'>Behavior: ${stats ? stats.behavior : 'Unknown'}</p>
              <p class='small'>Conformation: ${stats ? stats.conformation : 'Unknown'}</p>
              <p class='small'>Worth: ${stats ? money(horseWorth(stats)) : 'Unknown'}</p>
              <p class='small'>Total Points: ${stats ? stats.totalPoints : 'Unknown'}</p>
              <p class='small'>Winnings: ${stats ? money(stats.earnings) : 'Unknown'}</p>
              <p class='small'>Lifetime Earnings: ${stats ? money(stats.earnings) : 'Unknown'}</p>
              <p class='small'>Show record: ${stats ? `${record.total} (${record.first}-${record.second}-${record.third})` : 'Unknown'}</p>
              <p class='small'>Discipline Max: ${disciplineMax}</p>
            </details>
          </div>`;
        }).join('')}
      </div>`;
    })() : ''}
    <button data-action='offspring-summary'>${horse.showOffspringSummary ? 'Hide Offspring Summary' : 'Show Offspring Summary'}</button>
    ${horse.showOffspringSummary ? (() => {
      const summary = offspringSummary(horse);
      return `<div class='box'>
        <p class='small'>Total Offsprings: ${summary.total}</p>
        <p class='small'>Active Offsprings: ${summary.active}</p>
        <p class='small'>Retired Offsprings: ${summary.retired}</p>
        <p class='small'>Sold Offsprings: ${summary.sold}</p>
      </div>`;
    })() : ''}
  `;

  node.querySelectorAll('[data-action]').forEach((btn) => {
    btn.onclick = () => {
      const action = btn.dataset.action;
      if (action === 'rename') {
        const val = node.querySelector('input').value.trim();
        if (val) horse.name = val;
      }
      if (action === 'retire-breeding') {
        if (horse.retiredForever) {
          horse.retiredToBreeding = true;
        } else {
          horse.retiredToBreeding = !horse.retiredToBreeding;
        }
      }
      if (action === 'retire-forever') horse.retiredForever = true;
      if (action === 'list-sale') {
        const price = Number(prompt('Sale price?', String(horseWorth(horse))));
        if (price > 0) app.saleBarn.push({ ...horse, owner: 'Your Stable', price, saleId: uid() });
      }
      if (action === 'npc-sell') {
        app.money += horseWorth(horse);
        app.horses = app.horses.filter((h) => h.id !== horse.id);
        pushReport(`${horse.name} sold to NPC for ${money(horseWorth(horse))}.`);
      }
      if (action === 'rehome') {
        app.horses = app.horses.filter((h) => h.id !== horse.id);
        pushReport(`${horse.name} was rehomed for free and left your stable.`);
      }
      if (action === 'save-notes') {
        const text = node.querySelector('.note-input')?.value.trim() || '';
        horse.notes = text;
      }
      if (action === 'toggle-notes') horse.showNotes = !horse.showNotes;
      if (action === 'save-tack') {
        horse.tack = horse.tack || {};
        horse.tack.bridle = node.querySelector('.tack-bridle')?.value || horse.tack.bridle;
        horse.tack.bit = node.querySelector('.tack-bit')?.value || horse.tack.bit;
        horse.tack.saddle = node.querySelector('.tack-saddle')?.value || horse.tack.saddle;
        horse.tack.pad = node.querySelector('.tack-pad')?.value || horse.tack.pad;
        horse.tack.headwear = node.querySelector('.tack-headwear')?.value || horse.tack.headwear;
        horse.tack.body = node.querySelector('.tack-body')?.value || horse.tack.body;
        pushReport(`Updated tack for ${horse.name}.`);
      }
      if (action === 'save-turnout') {
        const value = Number(node.querySelector('.turnout-hours')?.value);
        if (Number.isFinite(value)) horse.turnoutAssignmentHours = Math.max(0.5, Math.min(14, value));
      }
      if (action === 'toggle-trainer-notes') horse.showTrainerNotes = !horse.showTrainerNotes;
      if (action === 'add-feed') {
        const type = node.querySelector('.feed-type')?.value;
        const grams = Number(node.querySelector('.feed-grams')?.value) || 150;
        if (type && grams >= 50 && grams <= 250) {
          horse.feedPlan.push({ type, grams });
        }
      }
      if (action === 'clear-feed') horse.feedPlan = [];
      if (action === 'save-auto-focus') {
        horse.autoTrainingFocus = node.querySelector('.auto-focus')?.value || '';
      }
      if (action === 'vet-notes') horse.showVetNotes = !horse.showVetNotes;
      if (action === 'inspection-details') horse.showInspectionDetails = !horse.showInspectionDetails;
      if (action === 'offspring-summary') horse.showOffspringSummary = !horse.showOffspringSummary;
      if (action === 'toggle-pedigree') horse.showPedigree = !horse.showPedigree;
      if (['feed', 'vet', 'farrier', 'train'].includes(action)) {
        const key = action === 'train' ? 'trained' : action;
        horse.managed[key] = !horse.managed[key];
      }
      render();
    };
  });
  return node;
}

function horseProfileMarkup(horse) {
  const activeIssue = horse.illnesses?.find((i) => i.active);
  const injuryLine = activeIssue ? ` • Injury: ${activeIssue.name}` : '';
  const dressage = Object.entries(horse.stats.dressage).map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
  const jumping = Object.entries(horse.stats.jumping).map(([k, v]) => `<li>${k}: ${v}</li>`).join('');
  const latest = horse.showResults?.length ? horse.showResults[horse.showResults.length - 1] : null;
  const inspection = horse.registryInspection
    ? `<p class='small'>Inspection: ${horse.registryInspection.result} (${horse.registryInspection.totalScore.toFixed(2)}) • Branding: ${horse.registryInspection.branding || 'None'} • Condition: ${horse.registryInspection.condition.toFixed(1)} • Pedigree: ${horse.registryInspection.pedigree == null ? 'N/A' : horse.registryInspection.pedigree.toFixed(1)}</p>`
    : '';
  const titles = formattedHorseTitles(horse);
  const titlesLine = titles ? `<p class='small'>Titles: ${titles}</p>` : '';
  const record = showRecordSummary(horse);
  const showRecordLine = `<p class='small'>Show record: ${record.total} (${record.first}-${record.second}-${record.third})</p>`;
  const revealAll = options.revealAll ?? horse.owner === 'Your Stable';
  const visible = visibleIllnesses(horse, revealAll);
  const hiddenCount = (horse.illnesses || []).length - visible.length;
  const illnessLine = visible.length
    ? visible.map((i) => `${i.name}${i.active ? ` (${i.remaining} mo)` : ''}`).join(', ')
    : 'None';
  const hiddenNote = !revealAll && hiddenCount > 0 ? ` (+${hiddenCount} hidden)` : '';
  return `
    <p class='small'>${horse.breed} • ${horse.age} • ${horse.gender} • Conformation: ${horse.conformation} • Behavior: ${horse.behavior || 0}${horse.extraPotential ? ' • Extra potential' : ''}${injuryLine}</p>
    ${titlesLine}
    <div class='grid two'>
      <div><h4>Jump Training</h4><ul class='stats'>${jumping}</ul></div>
      <div><h4>Dressage Training</h4><ul class='stats'>${dressage}</ul></div>
    </div>
    <p class='small'>Wins: Championships ${horse.championships}, Reserves ${horse.reserves}, Total Points ${horse.totalPoints}, Top Breed ${horse.topWins?.breed || 0}.</p>
    ${showRecordLine}
    ${latest ? `<p class='small'>Latest show: ${latest.discipline} ${latest.level} — #${latest.placing}</p>` : '<p class="small">No show record yet.</p>'}
    ${inspection}
  `;
}

function renderHorses() {
  const el = document.getElementById('horses');
  const foals = app.horses.filter((h) => h.age < 3);
  const retiredBreeding = app.horses.filter((h) => h.retiredToBreeding && !h.retiredForever);
  const retired = app.horses.filter((h) => h.retiredForever);
  const active = app.horses.filter((h) => h.age >= 3 && !h.retiredToBreeding && !h.retiredForever);

  const allHorses = [...active, ...retiredBreeding, ...retired, ...foals];
  if (!app.selectedHorseId && allHorses.length) {
    app.selectedHorseId = allHorses[0].id;
  }

  const tableSection = (title, horses, open = false) => `
    <details class='horse-section' ${open ? 'open' : ''}>
      <summary>${title} (${horses.length})</summary>
      <div class='table-wrap'>
        <table class='horse-table'>
          <thead>
            <tr>
              <th>Horse Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Breed</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            ${horses.map((h) => {
              const title = h.registryInspection?.title ? `${h.registryInspection.title} Champion` : '';
              const selectedClass = h.id === app.selectedHorseId ? ' class="selected"' : '';
              return `<tr data-horse-id='${h.id}'${selectedClass}>
                <td>${horseDisplayName(h)}</td>
                <td>${h.gender}</td>
                <td>${h.age}</td>
                <td>${h.breed}</td>
                <td>${title || '-'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </details>
  `;

  el.innerHTML = `
    <h2>Your Horses</h2>
    ${tableSection('Active Horses', active, true)}
    ${tableSection('Retired for Breeding', retiredBreeding)}
    ${tableSection('Retired', retired)}
    ${tableSection('Foals & Young Horses', foals)}
    <div id='horse-profile' class='horse-profile'></div>
  `;

  const selectedHorse = app.horses.find((h) => h.id === app.selectedHorseId);
  const profileEl = el.querySelector('#horse-profile');
  if (!profileEl) return;
  profileEl.innerHTML = '';
  if (selectedHorse) {
    profileEl.append(createHorseCard(selectedHorse));
  }

  el.querySelectorAll('tr[data-horse-id]').forEach((row) => {
    row.onclick = () => {
      app.selectedHorseId = row.dataset.horseId;
      renderHorses();
    };
  });
}

function renderMarket() {
  const kinds = [
    { key: 'untrained', cost: 2000 },
    { key: 'trained', cost: 10000 },
    { key: 'fully', cost: 75000 }
  ];
  document.getElementById('market').innerHTML = `
    <h2>Prospects Pasture (NPC)</h2>
    <div class='cards'>${kinds.map((k) => `
      <div class='box'>
        <h3>${cap(k.key)} Horse</h3>
        <p>Cost: ${money(k.cost)}</p><p class='small'>${k.key === 'untrained' ? 'Training points: 0-10' : k.key === 'trained' ? 'Training points: 30-60' : 'Training points: 85-95'}</p>
        <label>Breed</label>
        <select id='breed-${k.key}'>${BREEDS.map((b) => `<option>${b}</option>`).join('')}</select>
        <label>Gender</label>
        <select id='gender-${k.key}'><option>Mare</option><option>Stallion</option><option>Gelding</option></select>
        <button id='buy-${k.key}'>Buy</button>
      </div>
    `).join('')}</div>
    <h2>Rescue Barn</h2>
    <div class='cards' id='rescue-barn'>
      ${app.rescueBarn.length ? app.rescueBarn.map((h) => `
        <div class='box'>
          <h3>${horseDisplayName(h)}</h3>
          <p>${h.breed} • ${h.age} • ${h.gender}</p>
          <p>Adoption Fee: ${money(h.rescueFee || 0)}</p>
          ${h.requiresBreakingIn && h.behavior < 100 ? `<p class='small'>Requires breaking in (behavior ${h.behavior}/100).</p>` : ''}
          <details><summary>View Profile</summary>${horseProfileMarkup(h, { revealAll: false })}</details>
          <button data-rescue='${h.rescueId}'>Adopt</button>
        </div>
      `).join('') : '<p class="small">No rescue horses available right now.</p>'}
    </div>
  `;

  kinds.forEach((k) => {
    document.getElementById(`buy-${k.key}`).onclick = () => {
      if (app.money < k.cost) return alert('Not enough money');
      app.money -= k.cost;
      const horse = baseHorse(k.key, 'npc');
      horse.breed = document.getElementById(`breed-${k.key}`).value;
      horse.gender = document.getElementById(`gender-${k.key}`).value;
      horse.height = heightFromBreed(horse.breed);
      applyBreedTraits(horse);
      horse.marking = normalizeMarkingForBreed(horse.marking, horse.breed);
      app.horses.push(horse);
      pushReport(`Bought ${horse.name} from Prospects Pasture.`);
      render();
    };
  });

  document.querySelectorAll('#rescue-barn button[data-rescue]').forEach((btn) => {
    btn.onclick = () => {
      const horse = app.rescueBarn.find((h) => h.rescueId === btn.dataset.rescue);
      if (!horse) return;
      if (app.money < (horse.rescueFee || 0)) return alert('Not enough money');
      app.money -= horse.rescueFee || 0;
      horse.owner = 'Your Stable';
      horse.illnesses = (horse.illnesses || []).map((i) => ({ ...i, hidden: false }));
      app.horses.push(horse);
      app.rescueBarn = app.rescueBarn.filter((h) => h.rescueId !== horse.rescueId);
      pushReport(`Adopted ${horse.name} from the rescue barn.`);
      render();
    };
  });
}

function renderSales() {
  const el = document.getElementById('sales');
  el.innerHTML = `
    <h2>Sales Barn</h2>
    <div class='cards' id='player-sales'></div>
    <h2>NPC Sales Ads</h2>
    <div class='cards' id='npc-sales'></div>
    <h2>NPC Stud Ads</h2>
    <div class='cards' id='npc-studs'></div>
  `;
  const cards = el.querySelector('#player-sales');
  const npcCards = el.querySelector('#npc-sales');
  const studCards = el.querySelector('#npc-studs');

  app.saleBarn.forEach((h, idx) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${horseDisplayName(h)}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>${money(h.price)}</p><p class='small'>Seller: ${h.owner}</p><details><summary>View Profile</summary>${horseProfileMarkup(h)}</details><button>Buy Horse</button>`;
    b.querySelector('button').onclick = () => {
      if (app.money < h.price) return alert('Not enough money');
      app.money -= h.price;
      app.horses.push({ ...h, owner: 'Your Stable' });
      app.saleBarn.splice(idx, 1);
      pushReport(`Bought ${h.name} from sales barn for ${money(h.price)}.`);
      render();
    };
    cards.append(b);
  });

  app.npcSales.forEach((h) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${horseDisplayName(h)}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>${money(h.price)}</p><p class='small'>Seller: ${h.owner}</p><details><summary>View Profile</summary>${horseProfileMarkup(h)}</details><button data-sale='${h.saleId}'>Buy Horse</button>`;
    b.querySelector('button').onclick = () => {
      if (app.money < h.price) return alert('Not enough money');
      app.money -= h.price;
      app.horses.push({ ...h, owner: 'Your Stable' });
      app.npcSales = app.npcSales.filter((s) => s.saleId !== h.saleId);
      pushReport(`Bought ${h.name} from NPC sales for ${money(h.price)}.`);
      render();
    };
    npcCards.append(b);
  });

  app.npcStuds.forEach((h) => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<h3>${horseDisplayName(h)}</h3><p>${h.breed} • ${h.age} • ${h.gender}</p><p>Stud Fee: ${money(h.fee)}</p><p class='small'>Stud: ${h.owner}</p><details><summary>View Profile</summary>${horseProfileMarkup(h)}</details><button data-stud='${h.studId}'>Purchase Straw</button>`;
    b.querySelector('button').onclick = () => {
      if (!tryCharge(h.fee)) return;
      app.semenStraws.push({ id: uid(), stallionId: h.id, stallionName: h.name });
      pushReport(`Purchased a straw from ${h.name} for ${money(h.fee)}.`);
      render();
    };
    studCards.append(b);
  });
}

function renderStud() {
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  document.getElementById('stud').innerHTML = `
    <h2>Stud Barn</h2>
    <div class='box'>
      <p>Collect semen and use in reproduction from the vet panel.</p>
      <div class='cards'>
        ${stallions.map((h) => `<div class='box'><h3>${horseDisplayName(h)}</h3><p>Cover $900 | Straw Collection $500</p><button data-id='${h.id}'>Collect Semen</button></div>`).join('') || '<p>No stallions available.</p>'}
      </div>
    </div>
  `;

  document.querySelectorAll('#stud button[data-id]').forEach((btn) => {
    btn.onclick = () => {
      const stallion = app.horses.find((h) => h.id === btn.dataset.id);
      if (!stallion || app.money < 500) return alert('Need stallion and $500.');
      app.money -= 500;
      const count = rnd(1, 6);
      for (let i = 0; i < count; i++) app.semenStraws.push({ id: uid(), stallionId: stallion.id, stallionName: stallion.name });
      pushReport(`Collected ${count} semen straws from ${stallion.name}.`);
      render();
    };
  });
}

function trainingPerformanceDelta(horse) {
  const preferred = horse.preferredTrainingSessions || 25;
  const sessions = Number.isFinite(horse.lastTrainingSessions) ? horse.lastTrainingSessions : horse.trainingSessionsThisMonth || 0;
  if (sessions > preferred) return -2;
  if (sessions < Math.max(1, Math.floor(preferred * 0.4))) return -2;
  return 2;
}

function turnoutPerformanceDelta(horse) {
  if (horse.lastTurnoutIssue === 'low') return -2;
  if (horse.lastTurnoutIssue === 'high') return -1;
  return 1;
}

function competitionFieldSize() {
  return rnd(8, 20);
}

function competitionJumpCount(discipline, level) {
  if (discipline === 'jumping') {
    const height = Number(level);
    if (!Number.isFinite(height)) return rnd(6, 12);
    return height <= 1.1 ? rnd(6, 9) : rnd(10, 23);
  }
  if (discipline === 'dressage') return rnd(6, 15);
  if (discipline === 'eventing') return rnd(10, 20);
  return rnd(6, 12);
}

function formatHighlight(template, maxCount) {
  if (!template) return '';
  const marker = maxCount ? rnd(1, maxCount) : rnd(1, 10);
  return template.replace('#', marker);
}

function pickHighlight(list, maxCount) {
  if (!list?.length) return '';
  return formatHighlight(pick(list), maxCount);
}

function buildHighlights(discipline, details) {
  const maxCount = details.jumpCount || 10;
  const lines = [];
  if (discipline === 'jumping') {
    if (details.eliminated) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.eliminated, maxCount));
    if (details.refusals > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.refusals, maxCount));
    for (let i = 0; i < details.rails; i += 1) {
      lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.faults, maxCount));
      if (lines.length >= 3) break;
    }
    if (details.overSeconds > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.time, maxCount));
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.jumping.positive, maxCount));
  } else if (discipline === 'dressage') {
    const pct = details.pct || 0;
    const bucket = pct >= 80 ? 'positive' : pct >= 70 ? 'neutral' : 'negative';
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.dressage[bucket], maxCount));
  } else if (discipline === 'eventing') {
    if (details.eliminated) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.eliminated, maxCount));
    for (let i = 0; i < details.rails; i += 1) {
      lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.rails, maxCount));
      if (lines.length >= 2) break;
    }
    if (details.refusals > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.refusals, maxCount));
    if (details.overSeconds > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.time, maxCount));
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.eventing.positive, maxCount));
  } else if (discipline === 'hunter') {
    for (let i = 0; i < details.faults; i += 1) {
      lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.hunter.faults, maxCount));
      if (lines.length >= 2) break;
    }
    if (details.faults > 0) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.hunter.rhythm, maxCount));
    while (lines.length < 4) lines.push(pickHighlight(COMPETITION_HIGHLIGHTS.hunter.positive, maxCount));
  }
  return lines.filter(Boolean).slice(0, 5);
}

function selectCompetitionComment(score) {
  if (score >= 85) return pick(COMPETITION_COMMENTS.strong);
  if (score >= 70) return pick(COMPETITION_COMMENTS.mixed);
  return pick(COMPETITION_COMMENTS.management);
}

function selectCompetitionSuggestion(horse) {
  if (['Underweight', 'Overweight', 'Fleshy', 'Very Underweight'].includes(horse.weightStatus)) return pick(COMPETITION_SUGGESTIONS.feed);
  if (horse.lastTurnoutIssue) return pick(COMPETITION_SUGGESTIONS.turnout);
  if (horse.lastTrainingIssue) return pick(COMPETITION_SUGGESTIONS.training);
  return pick(COMPETITION_SUGGESTIONS.health);
}

function calculateCompetitionResult(horse, discipline, level) {
  const [minReq, maxReq] = requiredSkillBand(discipline, level);
  const skill = effectiveDisciplineSkill(horse, discipline);
  const skillBandBoost = ((skill - minReq) / Math.max(1, maxReq - minReq)) * 18;
  const temperament = personalityProfile(horse.personality);
  const bondMod = bondModifiers(horse);
  const conformationBoost = (CONFORMATION_MULT[horse.conformation] - 1) * 12;
  const behaviorBoost = Math.min(6, (horse.behavior || 0) * 0.3);
  const moodBoost = moodPerformanceDelta(horse.mood) + Math.round(bondMod.moodBoost * 4);
  const weightBoost = weightPerformanceDelta(horse.weightStatus);
  const feedBoost = horse.competitionBoost || 0;
  const trainingBoost = trainingPerformanceDelta(horse);
  const turnoutBoost = turnoutPerformanceDelta(horse);
  const baseScore = clamp(Math.round(55 + skillBandBoost + conformationBoost + behaviorBoost + moodBoost + weightBoost + feedBoost + trainingBoost + turnoutBoost + temperament.showDelta + rnd(-6, 6)), 0, 100);
  const fieldSize = competitionFieldSize();
  let score = baseScore;
  let resultText = `${baseScore}`;
  let penaltiesText = '';
  let timeScoreText = '';
  let eliminated = false;
  let rails = 0;
  let refusals = 0;
  let overSeconds = 0;
  let faults = 0;
  let pct = 0;
  const jump = horse.stats.jumping;
  const dress = horse.stats.dressage;
  const jumpCount = competitionJumpCount(discipline, level);

  if (discipline === 'jumping') {
    const railBias = Math.max(0, 4 - Math.floor((jump.Striding + jump.Structure + jump.Power) / 95));
    rails = clamp(rnd(0, railBias + 1) + Math.max(0, temperament.penaltyBias + bondMod.penaltyBias), 0, 8);
    const refusalChance = clamp(25 - Math.floor(jump.Confidence / 4) + temperament.refusalBias + bondMod.refusalBias, 5, 60);
    refusals = rnd(1, 100) <= refusalChance ? (rnd(1, 100) <= 35 ? 2 : 1) : 0;
    const fall = rnd(1, 100) <= Math.max(2, temperament.fallBias + bondMod.fallBias + Math.floor((minReq - skill) / 8));
    const timeAllowed = Math.max(48, 70 - Math.floor(jump.Speed / 4) + Math.floor(jumpCount / 3));
    overSeconds = Math.max(0, rnd(0, 6) - Math.floor(jump.Speed / 20) + Math.max(0, weightBoost < 0 ? 1 : 0));
    if (fall || refusals >= 2) {
      eliminated = true;
      score = 0;
      penaltiesText = 'Eliminated';
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = penaltiesText;
    } else {
      faults = rails * 4 + refusals * 4 + overSeconds;
      score = clamp(baseScore - faults * 1.5, 0, 100);
      penaltiesText = `${faults} faults`;
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = `${penaltiesText} | ${timeScoreText}`;
    }
  } else if (discipline === 'dressage') {
    pct = clamp((baseScore * 0.6 + 34) + rnd(-2, 2), 45, 100);
    score = pct;
    penaltiesText = `${pct.toFixed(2)}%`;
    timeScoreText = `${pct.toFixed(2)}%`;
    resultText = penaltiesText;
  } else if (discipline === 'eventing') {
    rails = clamp(rnd(0, 2 + Math.max(0, temperament.penaltyBias + bondMod.penaltyBias)), 0, 6);
    const refusalChance = clamp(20 - Math.floor(jump.Confidence / 5) + temperament.refusalBias + bondMod.refusalBias, 5, 55);
    refusals = rnd(1, 100) <= refusalChance ? (rnd(1, 100) <= 30 ? 2 : 1) : 0;
    const fall = rnd(1, 100) <= Math.max(2, temperament.fallBias + bondMod.fallBias + Math.floor((minReq - skill) / 10));
    const timeAllowed = Math.max(250, 320 - Math.floor((jump.Speed + jump.Confidence) / 2));
    overSeconds = Math.max(0, rnd(0, 20) - Math.floor(jump.Speed / 4));
    if (fall || refusals >= 3) {
      eliminated = true;
      score = 0;
      penaltiesText = 'Eliminated';
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = penaltiesText;
    } else {
      const penalties = rails * 4 + refusals * 20 + overSeconds * 0.4;
      score = clamp(baseScore - penalties * 0.6, 0, 100);
      penaltiesText = `${penalties.toFixed(1)} penalties`;
      timeScoreText = `${timeAllowed + overSeconds}s / ${timeAllowed}s`;
      resultText = penaltiesText;
    }
  } else if (discipline === 'hunter') {
    faults = clamp(rnd(0, 5 + Math.max(0, temperament.penaltyBias + bondMod.penaltyBias)) - Math.floor((dress.Flowiness + dress.Balance + jump.Striding + jump.Structure) / 90), 0, 12);
    score = clamp(baseScore - faults * 1.4, 0, 100);
    penaltiesText = `${faults} faults`;
    timeScoreText = `Score ${score.toFixed(1)}`;
    resultText = penaltiesText;
  }

  const placingBase = Math.ceil(((100 - score) / 100) * fieldSize);
  const placing = clamp(placingBase + rnd(0, 2), 1, fieldSize);
  const idx = levelIndex(discipline, level);
  const prize = Math.max(120, Math.round((3000 - placing * 130 + idx * 260) * (placing <= 3 ? 1.4 : 1)));
  const highlights = buildHighlights(discipline, {
    jumpCount,
    eliminated,
    rails,
    refusals,
    overSeconds,
    faults,
    pct
  });
  const comment = selectCompetitionComment(score);
  const suggestion = selectCompetitionSuggestion(horse);

  return {
    score,
    placing: eliminated ? fieldSize : placing,
    prize: eliminated ? 0 : prize,
    resultText,
    penaltiesText,
    timeScoreText,
    fieldSize,
    highlights,
    comment,
    suggestion
  };
}

function registerShowEntry(horse, discipline, level) {
  if (!canCompeteUnderSaddle(horse)) {
    pushReport(`${horse.name} cannot enter under-saddle shows until age 3.`);
    return;
  }
  if ((horse.illnesses || []).some((i) => i.active)) {
    pushReport(`${horse.name} cannot show while recovering from an injury/illness.`);
    return;
  }
  horse.managed.showEntry = true;
  const idx = levelIndex(discipline, level);
  const maxIdx = highestAllowedLevelIndex(horse, discipline);
  if (idx > maxIdx) {
    pushReport(`${horse.name} is not trained enough for ${discipline} ${level}. Max allowed right now: ${SHOW_LEVELS[discipline][maxIdx]}.`);
    return;
  }
  const entry = {
    id: uid(),
    discipline,
    level,
    date: dateLabel(),
    monthIndex: currentMonthIndex()
  };
  horse.pendingCompetitions = horse.pendingCompetitions || [];
  horse.pendingCompetitions.push(entry);
  horse.showEntriesThisMonth = (horse.showEntriesThisMonth || 0) + 1;
  pushReport(`${horse.name} registered for ${cap(discipline)} ${level}. Results will arrive next month.`);
  saveGame(false);
}

function resolvePendingCompetitions(horse) {
  const currentIndex = currentMonthIndex();
  const pending = Array.isArray(horse.pendingCompetitions) ? horse.pendingCompetitions : [];
  const due = pending.filter((entry) => entry.monthIndex < currentIndex);
  horse.pendingCompetitions = pending.filter((entry) => entry.monthIndex >= currentIndex);
  if (!due.length) return;
  due.forEach((entry) => {
    const result = calculateCompetitionResult(horse, entry.discipline, entry.level);
    horse.totalPoints += Math.max(0, 30 - result.placing);
    horse.earnings += result.prize;
    app.money += result.prize;
    if (result.placing === 1) horse.championships += 1;
    if (result.placing === 2) horse.reserves += 1;
    horse.topWins.highestScore = Math.max(horse.topWins.highestScore, result.score);
    horse.showResults.push({
      date: dateLabel(),
      discipline: entry.discipline,
      level: entry.level,
      score: result.score,
      placing: result.placing,
      prize: result.prize,
      resultText: result.resultText
    });
    updateHorseTitles(horse);
    pushCompetitionReport({
      id: entry.id,
      date: dateLabel(),
      discipline: entry.discipline,
      level: entry.level,
      competitionName: `${cap(entry.discipline)} ${entry.level}`,
      penaltiesText: result.penaltiesText,
      timeScoreText: result.timeScoreText,
      horseName: horse.name,
      horseBreed: horse.breed,
      placing: result.placing,
      fieldSize: result.fieldSize,
      highlights: result.highlights,
      comment: result.comment,
      suggestion: result.suggestion
    });
    pushReport(`${horse.name} in ${entry.discipline} (${entry.level}) placed #${result.placing} with ${result.resultText} and won ${money(result.prize)}.`);
  });
}

function renderShows() {
  const shows = [
    { key: 'dressage', names: ['OTO Dressage Show', 'OTO Pony Dressage Show', 'OTO Young Horse Dressage Show'] },
    { key: 'jumping', names: ['OTO Jumping Show', 'OTO Pony Jumping Classic', 'OTO Young Horse Jumping Show'] },
    { key: 'eventing', names: ['OTO Eventing Show', 'OTO Pony Event Trials', 'OTO Young Horse Eventing Show'] },
    { key: 'hunter', names: ['OTO Hunter Show', 'OTO Pony Hunter Classic', 'OTO Young Horse Hunter Show'] }
  ];

  document.getElementById('shows').innerHTML = `
    <h2>Enter Shows</h2>
    ${shows.map((s) => `
      <div class='box'>
        <h3>${cap(s.key)}</h3>
        ${s.names.map((n) => `<p>${n} (0/250) — Oxer To Oxer Showgrounds</p>`).join('')}
        <label>Horse</label>
        <select id='show-horse-${s.key}'>
          ${app.horses.filter((h) => !h.retiredForever && canCompeteUnderSaddle(h)).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}
        </select>
        <p class='small'>Foals/youngsters under age 3 are in-hand only (registries/breeders), not under-saddle shows.</p>
        <label>Division</label>
        <select id='show-level-${s.key}'>${SHOW_LEVELS[s.key].map((lvl) => `<option>${lvl}</option>`).join('')}</select>
        <button id='enter-${s.key}'>Register Show Entry</button>
        <p class='small'>Results are delivered after the next month skip.</p>
      </div>
    `).join('')}
  `;

  Object.keys(SHOW_LEVELS).forEach((d) => {
    const btn = document.getElementById(`enter-${d}`);
    if (!btn) return;
    btn.onclick = () => {
      const id = document.getElementById(`show-horse-${d}`).value;
      const level = document.getElementById(`show-level-${d}`).value;
      const horse = app.horses.find((h) => h.id === id);
      if (!horse) return alert('No eligible horse selected.');
      if (!canCompeteUnderSaddle(horse)) return alert('This horse is in-hand only until age 3.');
      registerShowEntry(horse, d, level);
      render();
    };
  });
}

function vetNote(horse, text) {
  horse.vetNotes.unshift({ date: dateLabel(), text });
  horse.showVetNotes = true;
  pushReport(text);
}

function tryCharge(cost) {
  if (app.money < cost) {
    alert('Not enough money');
    return false;
  }
  app.money -= cost;
  return true;
}

function findTreatableIllness(horse) {
  if (!horse?.illnesses) return null;
  const active = horse.illnesses.find((i) => i.active);
  if (active) return active;
  const lingering = horse.illnesses.find((i) => (i.remaining || 0) > 0);
  if (lingering) {
    lingering.active = true;
    return lingering;
  }
  return null;
}

function renderVet() {
  const mares = app.horses.filter((h) => h.gender === 'Mare' && !h.retiredForever);
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);
  const opts = app.horses.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');

  document.getElementById('vet').innerHTML = `
    <h2>Vet: Basic, Reproduction, Pregnancy</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Basic Exams</h3>
        <label>Horse</label><select id='vet-horse'>${opts}</select>
        <button id='vet-checkup'>Checkup + Vaccination ($150)</button>
        <button id='vet-physical'>Complete Physical ($1000)</button>
        <button id='vet-soundness'>Soundness Exam ($1000)</button>
        <button id='vet-gelding'>Gelding ($500)</button>
        <button id='vet-injury'>Injury/Illness Exam ($1000)</button>
        <button id='vet-heal'>Treat Active Illness ($750)</button>
      </div>
      <div class='box'>
        <h3>Reproduction</h3><p class='small'>Stallion: semen only. Mare: AI/flush/transfer. Gelding: no repro services.</p>
        <label>Stallion for collection</label><select id='vet-stallion'>${stallions.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}</select>
        <button id='vet-collect'>Semen Collection ($500)</button>
        <label>Mare for breeding</label><select id='vet-mare'>${mares.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}</select>
        <label>Use Straw</label><select id='vet-straw'>${app.semenStraws.map((s) => `<option value='${s.id}'>${s.stallionName} (${s.id})</option>`).join('')}</select>
        <button id='vet-ai'>Artificial Insemination ($200)</button>
        <button id='vet-flush'>Embryo Flush ($1000)</button>
        <label>Embryo for transfer</label><select id='vet-embryo'>${app.embryos.map((e) => `<option value='${e.id}'>${e.donor} x ${e.sire}</option>`).join('')}</select>
        <button id='vet-transfer'>Embryo Transfer ($1000)</button>
        <button id='vet-sex'>Ultrasound for Sex ($200)</button>
        <button id='vet-mismate'>Mismate Shot ($100)</button>
      </div>
    </div>
  `;

  const selectedHorse = () => app.horses.find((h) => h.id === document.getElementById('vet-horse').value);
  const selectedMare = () => app.horses.find((h) => h.id === document.getElementById('vet-mare').value);
  const selectedStallion = () => app.horses.find((h) => h.id === document.getElementById('vet-stallion').value);

  document.getElementById('vet-checkup').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(150)) return;
    h.due.checkup = false;
    vetNote(h, `${h.name} completed annual checkup and vaccination.`);
    render();
  };

  document.getElementById('vet-physical').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(1000)) return;
    vetNote(h, `${h.name} physical exam: predisposed to ${h.healthRisks.join(', ')}.`);
    render();
  };

  document.getElementById('vet-soundness').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(1000)) return;
    const line = soundnessForecastLine(h.soundnessYears);
    vetNote(h, `${h.name} soundness forecast: ${line}`);
    render();
  };

  document.getElementById('vet-gelding').onclick = () => {
    const h = selectedHorse();
    if (!h) return;
    if (!confirm('You sure you want to geld this horse?')) return;
    if (!tryCharge(500)) return;
    h.gender = 'Gelding';
    Object.keys(h.potential).forEach((k) => { h.potential[k] += rnd(0, 5); });
    if (['Stubborn', 'Spooky', 'Unfocused'].includes(h.personality)) {
      h.personality = pick(['Easy-Going', 'Bomb-proof']);
    }
    vetNote(h, `${h.name} was gelded; performance trainability may improve.`);
    render();
  };

  document.getElementById('vet-injury').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(1000)) return;
    const issue = findTreatableIllness(h);
    if (issue) {
      vetNote(h, `${h.name} has ${issue.name}. Estimated recovery ${issue.remaining} months.`);
    } else if (h.hiddenIllnesses?.length) {
      const hidden = h.hiddenIllnesses.shift();
      addIllness(h, { name: hidden.name, impact: 10, severity: hidden.severity, surgeryRisk: 0, retirementRisk: 0 });
      vetNote(h, `${h.name} was diagnosed with ${hidden.name}. Estimated recovery ${h.illnesses.find((i) => i.active)?.remaining || 0} months.`);
    } else {
      vetNote(h, `${h.name} has no active injury/illness today.`);
    }
    render();
  };

  document.getElementById('vet-heal').onclick = () => {
    const h = selectedHorse();
    if (!h || !tryCharge(750)) return;
    const issue = findTreatableIllness(h);
    if (!issue) {
      vetNote(h, `${h.name} had no active condition to treat.`);
    } else {
      issue.remaining = Math.max(0, issue.remaining - rnd(1, 2));
      issue.active = issue.remaining > 0;
      vetNote(h, issue.active
        ? `${h.name} received treatment for ${issue.name}. Estimated recovery ${issue.remaining} month(s) remaining.`
        : `${h.name} treated successfully for ${issue.name}.`);
    }
    render();
  };

  document.getElementById('vet-collect').onclick = () => {
    const stallion = selectedStallion();
    if (!stallion || !tryCharge(500)) return;
    const count = rnd(1, 6);
    for (let i = 0; i < count; i++) app.semenStraws.push({ id: uid(), stallionId: stallion.id, stallionName: stallion.name });
    vetNote(stallion, `Collected ${count} semen straws from ${stallion.name}.`);
    render();
  };

  document.getElementById('vet-ai').onclick = () => {
    const mare = selectedMare();
    const strawId = document.getElementById('vet-straw').value;
    const straw = app.semenStraws.find((s) => s.id === strawId);
    if (!mare || !straw || !tryCharge(200)) return;
    if (!mare.retiredToBreeding) { app.money += 200; return alert('Mare must be retired to breeding for AI.'); }
    const success = rnd(1, 100) > 30;
    if (success) {
      mare.pregnantBy = straw.stallionName;
      mare.gestation = 0;
      mare.foalDue = rnd(10, 13);
      vetNote(mare, `AI success for ${mare.name} using ${straw.stallionName}. Due in ~${mare.foalDue} months.`);
    } else {
      vetNote(mare, `AI attempt failed for ${mare.name} using ${straw.stallionName}.`);
    }
    render();
  };

  document.getElementById('vet-flush').onclick = () => {
    const mare = selectedMare();
    const strawId = document.getElementById('vet-straw').value;
    const straw = app.semenStraws.find((s) => s.id === strawId);
    if (!mare || !straw || !tryCharge(1000)) return;
    if (!mare.retiredToBreeding) { app.money += 1000; return alert('Mare must be retired to breeding for embryo flush.'); }
    const n = rnd(0, 2);
    for (let i = 0; i < n; i++) {
      app.embryos.push({
        id: uid(),
        donor: mare.name,
        donorId: mare.id,
        sire: straw.stallionName,
        sireId: straw.stallionId
      });
    }
    vetNote(mare, `Embryo flush complete for ${mare.name}: ${n} embryo(s) produced.`);
    render();
  };

  document.getElementById('vet-transfer').onclick = () => {
    const mare = selectedMare();
    const embryoId = document.getElementById('vet-embryo').value;
    const embryoIndex = app.embryos.findIndex((e) => e.id === embryoId);
    if (!mare || embryoIndex < 0 || !tryCharge(1000)) return;
    if (!mare.retiredToBreeding) { app.money += 1000; return alert('Recipient mare must be retired to breeding for embryo transfer.'); }
    const embryo = app.embryos[embryoIndex];
    const success = rnd(1, 100) > 35;
    if (success) {
      app.embryos.splice(embryoIndex, 1);
      mare.pregnantEmbryo = embryo;
      mare.gestation = 0;
      mare.foalDue = rnd(10, 13);
      vetNote(mare, `Embryo transfer successful for ${mare.name}. Due in ~${mare.foalDue} months.`);
    } else {
      vetNote(mare, `Embryo transfer failed for ${mare.name}.`);
    }
    render();
  };

  document.getElementById('vet-sex').onclick = () => {
    const mare = selectedMare();
    if (!mare || !tryCharge(200)) return;
    if (!(mare.pregnantBy || mare.pregnantEmbryo)) {
      app.money += 200;
      return alert('Ultrasound is only available for pregnant mares.');
    }
    vetNote(mare, `${mare.name} ultrasound: foal sex appears ${pick(['colt', 'filly'])}.`);
    render();
  };

  document.getElementById('vet-mismate').onclick = () => {
    const mare = selectedMare();
    if (!mare || !tryCharge(100)) return;
    delete mare.pregnantBy;
    delete mare.pregnantEmbryo;
    mare.gestation = 0;
    mare.foalDue = 0;
    vetNote(mare, `${mare.name} received mismate shot. Pregnancy ended.`);
    render();
  };
}

function renderFarrier() {
  const opts = app.horses.map((h) => `<option value='${h.id}'>${h.name}</option>`).join('');
  document.getElementById('farrier').innerHTML = `
    <h2>Farrier</h2>
    <div class='box'>
      <label>Horse</label><select id='farrier-horse'>${opts}</select>
      <label>Trim/Shoe</label>
      <select id='farrier-type'>
        <option value='50'>Basic Trim ($50)</option>
        <option value='120'>Keg Shoe ($120)</option>
        <option value='150'>Rim Shoe ($150)</option>
      </select>
      <button id='do-farrier'>Set Trim/Shoe</button>
    </div>
  `;

  document.getElementById('do-farrier').onclick = () => {
    const h = app.horses.find((x) => x.id === document.getElementById('farrier-horse').value);
    const cost = Number(document.getElementById('farrier-type').value);
    if (!h || !tryCharge(cost)) return;
    h.managed.farrier = true;
    h.farrierThisMonth = h.due.farrier;
    h.lastFarrierMonth = app.year * 12 + app.month;
    h.due.farrier = false;
    h.farrierThisMonth = true;
    if (cost === 120) {
      h.stats.dressage.Collection = clampSkill(h, 'dressage', h.stats.dressage.Collection + 2);
      h.stats.dressage.Connection = clampSkill(h, 'dressage', h.stats.dressage.Connection + 2);
    }
    if (cost === 150) {
      h.stats.jumping.Striding = clampSkill(h, 'jumping', h.stats.jumping.Striding + 2);
      h.stats.jumping.Power = clampSkill(h, 'jumping', h.stats.jumping.Power + 2);
    }
    pushReport(`${h.name} farrier appointment complete.`);
    render();
  };
}


function renderTraining() {
  const panel = document.getElementById('training');
  const session = app.trainingRpg;
  if (session) {
    const horse = app.horses.find((h) => h.id === session.horseId);
    if (!horse || horse.retiredForever) {
      app.trainingRpg = null;
      app.trainingRpgFeedback = '';
      return renderTraining();
    }
    const variant = session.variant;
    panel.innerHTML = `
      <h2>Interactive Training</h2>
      <div class='box'>
        <h3>STEP: ${actionLabel(session.action)} (${(session.stepIndex || 0) + 1}/${(session.steps || []).length || 1})</h3><p class='small'><strong>Discipline:</strong> ${cap(session.discipline)}</p>
        <p><strong>Horse Name:</strong> ${horse.name}</p>
        <p><strong>Training:</strong> ${variant.text}</p>
        ${app.trainingRpgFeedback ? `<p><strong>Last choice result:</strong> ${app.trainingRpgFeedback}</p>` : ''}
        <p class='small'><strong>GLOBAL CODING NOTE:</strong> Each option uses base outcome %, mood modifier, personality modifier, and can affect bond, skills, penalties/refusals and future mood.</p>
        <div id='rpg-options'></div>
        <button id='rpg-exit'>End Interactive Session</button>
      </div>
    `;
    const wrap = document.getElementById('rpg-options');
    variant.options.forEach((opt, idx) => {
      const line = document.createElement('div');
      line.className = 'box';
      line.innerHTML = `
        <p><strong>${String.fromCharCode(97 + idx)})</strong> ${opt.label}</p>
        <p class='small'>→ [Success ${opt.success}% | Fail ${opt.fail}%]</p>
        <button data-rpg='${idx}'>Choose</button>
      `;
      wrap.append(line);
    });
    panel.querySelectorAll('[data-rpg]').forEach((btn) => {
      btn.onclick = () => {
        const opt = variant.options[Number(btn.dataset.rpg)];
        const result = resolveRpgOption(opt, horse);
        const d = session.discipline;
        const gain = result.outcome === 'success' ? rnd(Math.max(1, result.skillBase), Math.max(2, result.skillBase + 2)) : result.outcome === 'neutral' ? Math.max(0, result.skillBase - 1) : 0;
        if (gain > 0) {
          const skill = pick(EXERCISE_MENU[d] || EXERCISE_MENU.jumping);
          if (d === 'dressage') horse.stats.dressage[skill] = clampSkill(horse, d, (horse.stats.dressage[skill] || 0) + gain);
          else if (d === 'jumping' || d === 'hunter') horse.stats.jumping[skill] = clampSkill(horse, d, (horse.stats.jumping[skill] || 0) + gain);
          else if (d === 'eventing') {
            if (horse.stats.dressage[skill] != null) horse.stats.dressage[skill] = clampSkill(horse, d, horse.stats.dressage[skill] + gain);
            if (horse.stats.jumping[skill] != null) horse.stats.jumping[skill] = clampSkill(horse, d, horse.stats.jumping[skill] + gain);
          }
        }
        horse.managed.trained = true;
        horse.trainingSessionsThisMonth = (horse.trainingSessionsThisMonth || 0) + 1;
        horse.manualTrainingThisMonth = true;
        const outcomeLabel = result.outcome === 'success' ? 'Success' : 'Fail';
        app.trainingRpgFeedback = `${actionLabel(session.action)}: ${outcomeLabel}`;
        pushReport(`${horse.name} interactive ${actionLabel(session.action)}: ${outcomeLabel}.`);
        app.trainingRpg = advanceTrainingRpgSession(session);
        renderTraining();
      };
    });
    const exitBtn = document.getElementById('rpg-exit');
    if (exitBtn) {
      exitBtn.onclick = () => {
        app.trainingRpg = null;
        app.trainingRpgFeedback = '';
        renderTraining();
      };
    }
    return;
  }

  const opts = app.horses.map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
  const foalOpts = app.horses.filter((h) => h.age < 3).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('');
  panel.innerHTML = `
    <h2>Training Grounds + Clinic (free)</h2>
    <div class='grid two'>
      <div class='box'>
        <label>Horse</label><select id='train-horse'>${opts}</select>
        <label>Discipline</label><select id='train-disc'>${Object.keys(SHOW_LEVELS).map((d) => `<option>${d}</option>`).join('')}</select>
        <label>Exercise</label><select id='train-ex'></select>
        <label>Longer Walk (repeats)</label><select id='train-rpg-walk'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Longer Trot (repeats)</label><select id='train-rpg-trot'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Longer Canter (repeats)</label><select id='train-rpg-canter'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Jump/Discipline Practice (repeats)</label><select id='train-rpg-discipline'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option></select>
        <label>Cooldown Repeats</label><select id='train-rpg-cooldown'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>
        <label>Controlability Work</label><select id='train-control'>
          <option>Flat Work</option><option>Hand Work</option><option>Sensitivity</option><option>Controlability</option><option>Manners</option>
        </select>
        <button id='do-train'>Train (Interactive)</button>
        <button id='do-control-train'>Controlability Session</button>
      </div>
      <div class='box'>
        <h3>Training Clinic</h3>
        <label>Discipline</label><select id='clinic-disc'>${Object.keys(SHOW_LEVELS).map((d) => `<option>${d}</option>`).join('')}</select>
        <button id='clinic'>Run Gold Clinic Evaluation</button>
      </div>
    </div>
    <div class='box'>
      <h3>Foal Handling / Breaking In</h3>
      ${foalOpts ? `<label>Foal</label><select id='foal-horse'>${foalOpts}</select>` : '<p class="small">No foals or breaking-in horses available.</p>'}
      <label>Exercise</label>
      <select id='foal-ex' ${foalOpts ? '' : 'disabled'}>
        <option>Weaning</option>
        <option>Lunging</option>
        <option>Petting</option>
        <option>Standing Still</option>
      </select>
      <button id='do-foal-train' ${foalOpts ? '' : 'disabled'}>Handle Foal</button>
      <p class='small'>Foal handling boosts behavior and gives tiny skill gains. Rescue horses flagged for breaking in must reach behavior 100 before normal training.</p>
    </div>
  `;

  const EXERCISES = {
    jumping: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
    dressage: ['Collection', 'Balance', 'Connection', 'Gaits', 'Rhythm', 'Flowiness'],
    hunter: ['Striding', 'Confidence', 'Balance', 'Power', 'Speed', 'Structure'],
    eventing: ['Collection', 'Connection', 'Rhythm', 'Striding', 'Confidence', 'Speed']
  };

  const disciplineSelect = document.getElementById('train-disc');
  const exerciseSelect = document.getElementById('train-ex');
  const horseSelect = document.getElementById('train-horse');
  const renderExercises = () => {
    const disc = disciplineSelect.value;
    exerciseSelect.innerHTML = EXERCISES[disc].map((e) => `<option>${e}</option>`).join('');
  };
  const applyTrainingSelection = () => {
    const selection = app.trainingSelection || { horseId: '', discipline: 'jumping', exercise: '' };
    if (!selection.horseId && app.horses.length) selection.horseId = app.horses[0].id;
    if (!EXERCISES[selection.discipline]) selection.discipline = 'jumping';
    horseSelect.value = selection.horseId || horseSelect.value;
    disciplineSelect.value = selection.discipline || disciplineSelect.value;
    renderExercises();
    const options = EXERCISES[disciplineSelect.value];
    if (!options.includes(selection.exercise)) selection.exercise = options[0];
    exerciseSelect.value = selection.exercise || exerciseSelect.value;
    app.trainingSelection = selection;
  };

  const updateSelection = () => {
    app.trainingSelection = {
      horseId: horseSelect.value,
      discipline: disciplineSelect.value,
      exercise: exerciseSelect.value
    };
  };

  disciplineSelect.onchange = () => {
    renderExercises();
    updateSelection();
  };
  horseSelect.onchange = updateSelection;
  exerciseSelect.onchange = updateSelection;
  const applyRpgConfigSelection = () => {
    app.trainingRpgConfig = normalizeTrainingRpgConfig(app.trainingRpgConfig);
    document.getElementById('train-rpg-walk').value = String(app.trainingRpgConfig.walk);
    document.getElementById('train-rpg-trot').value = String(app.trainingRpgConfig.trot);
    document.getElementById('train-rpg-canter').value = String(app.trainingRpgConfig.canter);
    document.getElementById('train-rpg-discipline').value = String(app.trainingRpgConfig.discipline);
    document.getElementById('train-rpg-cooldown').value = String(app.trainingRpgConfig.coolDown);
  };
  const updateRpgConfig = () => {
    app.trainingRpgConfig = normalizeTrainingRpgConfig({
      walk: document.getElementById('train-rpg-walk').value,
      trot: document.getElementById('train-rpg-trot').value,
      canter: document.getElementById('train-rpg-canter').value,
      discipline: document.getElementById('train-rpg-discipline').value,
      coolDown: document.getElementById('train-rpg-cooldown').value
    });
  };
  ['train-rpg-walk', 'train-rpg-trot', 'train-rpg-canter', 'train-rpg-discipline', 'train-rpg-cooldown'].forEach((id) => {
    const node = document.getElementById(id);
    if (node) node.onchange = updateRpgConfig;
  });
  applyTrainingSelection();
  applyRpgConfigSelection();

  document.getElementById('do-train').onclick = () => {
    const h = app.horses.find((x) => x.id === horseSelect.value);
    const d = disciplineSelect.value;
    if (!h) return;
    if (h.age < 3) return alert('Foals and young horses should use Foal Handling until age 3.');
    if (h.illnesses.some((i) => i.active)) return alert('This horse is recovering and cannot train until fully healed.');
    app.trainingRpg = buildTrainingRpgSession(h, d, app.trainingRpgConfig);
    renderTraining();
  };

  document.getElementById('do-control-train').onclick = () => {
    const h = app.horses.find((x) => x.id === horseSelect.value);
    const focus = document.getElementById('train-control').value;
    if (!h) return;
    if (h.illnesses.some((i) => i.active)) return alert('This horse is recovering and cannot train until fully healed.');
    trainingControlabilitySession(h, focus);
    h.managed.trained = true;
    h.trainingSessionsThisMonth = (h.trainingSessionsThisMonth || 0) + 1;
    h.manualTrainingThisMonth = true;
    render();
  };

  document.getElementById('clinic').onclick = () => {
    const h = app.horses.find((x) => x.id === horseSelect.value);
    const disc = document.getElementById('clinic-disc').value;
    if (!h) return;
    const maxByPotential = SHOW_LEVELS[disc][highestAllowedLevelIndex(h, disc)];
    pushReport(`Clinic: ${h.name} ${cap(disc)} potential ${h.potential[disc]}%. Suggested current max level: ${maxByPotential}.`);
    if (h.potential[disc] >= 100) {
      h.titles = Array.isArray(h.titles) ? h.titles : [];
      if (!h.titles.includes('Young Hope')) h.titles.push('Young Hope');
    }
    render();
  };

  const foalButton = document.getElementById('do-foal-train');
  if (foalButton) {
    foalButton.onclick = () => {
      const foalId = document.getElementById('foal-horse')?.value;
      const foal = app.horses.find((x) => x.id === foalId);
      const ex = document.getElementById('foal-ex')?.value;
      if (!foal || !FOAL_TRAINING[ex]) return;
      if (foal.illnesses.some((i) => i.active)) {
        alert('This foal is recovering and cannot be handled yet.');
        return;
      }
      applyFoalHandling(foal, ex);
      pushReport(`${foal.name} completed foal handling: ${ex}.`);
      render();
    };
  }
}

function renderBreeding() {
  const broodmares = app.horses.filter((h) => h.gender === 'Mare' && h.retiredToBreeding && !h.retiredForever);
  const stallions = app.horses.filter((h) => h.gender === 'Stallion' && !h.retiredForever);

  document.getElementById('breeding').innerHTML = `
    <h2>Breeding Barn</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Breeding Status</h3>
        ${broodmares.length ? broodmares.map((m) => `<p>${m.name}: Pregnant ${m.pregnantBy || m.pregnantEmbryo ? 'Y' : 'N'}${m.pregnantBy || m.pregnantEmbryo ? ` (${m.gestation || 0} month(s))` : ''}</p>`).join('') : '<p class="small">No mares retired to breeding.</p>'}
        <p class='small'>Only retired-to-breeding mares can carry pregnancies.</p>
      </div>
      <div class='box'>
        <h3>Offspring Records</h3>
        <button id='toggle-offspring'>${app.showOffspringWindow ? 'Close Window' : 'Open Window'}</button>
        ${app.showOffspringWindow ? (() => {
          const unique = new Map();
          app.horses.forEach((h) => {
            h.offspring.forEach((o) => {
              const key = o.foalId || `${o.name}-${o.otherParentName}`;
              if (!unique.has(key)) unique.set(key, o);
            });
          });
          const rows = Array.from(unique.values()).map((o) => `<p>${o.name} — ${o.otherParentRole}: ${o.otherParentName} • Age ${o.age}</p>`).join('');
          return rows || '<p class="small">No offspring records yet.</p>';
        })() : '<p class="small">Offspring window closed.</p>'}
      </div>
    </div>
  `;

  document.getElementById('toggle-offspring').onclick = () => {
    app.showOffspringWindow = !app.showOffspringWindow;
    renderBreeding();
  };
}

function registryInspectionScore(horse) {
  const conformationMap = {
    'Very Bad': 2,
    Bad: 4,
    Acceptable: 6,
    Good: 7.5,
    'Very Good': 8.5,
    Excellent: 9.5
  };
  const conditionMap = {
    'Very Underweight': 2,
    Underweight: 4,
    Moderate: 9.5,
    Fleshy: 6.5,
    Overweight: 3
  };
  const purityScore = Math.max(1, Math.min(10, breedPurityPercent(horse.breed) / 10));
  const potentialAvg = Object.values(horse.potential || {}).reduce((a, b) => a + b, 0) / 4;
  const potentialScore = Math.max(1, Math.min(10, potentialAvg / 10));
  const conformationScore = conformationMap[horse.conformation] || 4;
  const conditionScore = conditionMap[horse.weightStatus] || 5;
  const isSportCross = isSportCrossHorse(horse);
  const scoreParts = isSportCross
    ? [conformationScore, conditionScore, potentialScore]
    : [conformationScore, conditionScore, purityScore, potentialScore];
  const totalScore = scoreParts.reduce((a, b) => a + b, 0) / scoreParts.length;
  return { conformationScore, conditionScore, pedigreeScore: isSportCross ? null : purityScore, potentialScore, totalScore, isSportCross };
}

function runRegistryInspection(horse, registryKey = '') {
  if (!horse) return null;
  if (!['Mare', 'Stallion'].includes(horse.gender)) {
    alert('Only mares and stallions can participate in inspections.');
    return null;
  }
  if (horse.registryInspection) {
    alert('This horse already completed an inspection.');
    return null;
  }
  const scores = registryInspectionScore(horse);
  let result = 'Fail';
  let title = '';
  if (scores.totalScore >= 9.5) {
    result = 'Elite';
    title = 'Elite';
  } else if (scores.totalScore >= 8) {
    result = 'Golden';
    title = 'Golden';
  } else if (scores.totalScore >= 5) {
    result = 'Pass';
  }
  const registryName = registryKey || horse.breed;
  const branding = result === 'Pass' || result === 'Golden' || result === 'Elite' ? BREED_BRANDINGS[registryName] : '';
  let placement = '';
  if (branding) {
    const placementInput = prompt(`Congratulations, ${horse.name} has received branding. Please choose its placing (Beginning/End).`, 'Beginning');
    placement = placementInput && placementInput.toLowerCase().includes('end') ? 'End' : 'Beginning';
  }
  horse.registryInspection = {
    date: dateLabel(),
    conformation: scores.conformationScore,
    condition: scores.conditionScore,
    pedigree: scores.pedigreeScore,
    potential: scores.potentialScore,
    totalScore: scores.totalScore,
    result,
    title,
    branding,
    placement,
    registry: registryName
  };
  updateHorseTitles(horse);
  horse.showInspectionDetails = true;
  if (branding) {
    alert(`Congratulations, ${horse.name} has received branding ${branding}.`);
  } else {
    alert(`${horse.name} did not receive branding.`);
  }
  pushReport(`${horse.name} registry inspection result: ${result} (${scores.totalScore.toFixed(2)}).`);
  return horse.registryInspection;
}

function renderRegistries() {
  const registryList = [...BREEDS, 'Sport Cross'];
  const groups = registryList.map((breed) => {
    const horses = breed === 'Sport Cross'
      ? app.horses.filter((h) => h && isSportCrossHorse(h))
      : app.horses.filter((h) => h && h.breed === breed);
    const prefix = BREED_BRANDINGS[breed] || breed.split(' ').map((w) => w[0]).join('');
    const norms = breedNorms(breed);
    return { breed, prefix, horses, norms };
  });

  document.getElementById('registries').innerHTML = `
    <h2>Studbooks & Registries</h2>
    <div class='cards'>
      ${groups.map((g) => `
        <div class='box'>
          <h3>${g.breed} Registry (${g.prefix})</h3>
          <p>Registered Horses: ${g.horses.length}</p>
          ${g.norms ? `<p class='small'>Norms: ${g.norms.minHeight.toFixed(1)}-${g.norms.maxHeight.toFixed(1)} hh • Main Potential: ${g.norms.mainPotential}</p>` : ''}
          <label>Horse</label>
          <select data-reg='${g.breed}' data-role='horse'>
            ${g.horses.filter((h) => ['Mare', 'Stallion'].includes(h.gender) && !h.retiredForever).map((h) => `
              <option value='${h.id}' ${h.registryInspection ? 'disabled' : ''}>${horseDisplayName(h)}${h.registryInspection ? ' (inspected)' : ''}</option>
            `).join('') || '<option disabled>No eligible horses</option>'}
          </select>
          <button data-reg='${g.breed}' data-action='inspect'>Join Inspection</button>
          <button data-reg='${g.breed}' data-action='riding'>Join Riding Test</button>
          <button data-reg='${g.breed}' data-action='expo'>Join Breed Expo</button>
        </div>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('#registries button[data-reg]').forEach((btn) => {
    btn.onclick = () => {
      const breed = btn.dataset.reg;
      const horses = breed === 'Sport Cross'
        ? app.horses.filter((h) => h && isSportCrossHorse(h) && !h.retiredForever)
        : app.horses.filter((h) => h && h.breed === breed && !h.retiredForever);
      if (!horses.length) return alert(`No eligible ${breed} horses.`);
      const select = document.querySelector(`#registries select[data-reg='${breed}']`);
      const selectedId = select?.value;
      const selectedHorse = app.horses.find((h) => h.id === selectedId);
      const winner = horses.sort((a, b) => horseWorth(b) - horseWorth(a))[0];
      const action = btn.dataset.action;
      if (action === 'inspect') {
        if (!selectedHorse) return alert('No eligible horse selected.');
        runRegistryInspection(selectedHorse, breed);
      }
      if (action === 'riding') {
        if (!canCompeteUnderSaddle(winner)) {
          pushReport(`${winner.name} is under age 3 and can only do in-hand registry events right now.`);
        } else {
          pushReport(`${winner.name} completed ${breed} riding test and gained registry points.`);
        }
      }
      if (action === 'expo') pushReport(`${winner.name} represented your stable at the ${breed} breed expo.`);
      render();
    };
  });
}

function renderBreeders() {
  document.getElementById('breeders').innerHTML = `
    <h2>Breeders' Show</h2>
    <div class='box'>
      <label>Horse</label>
      <select id='breed-horse'>${app.horses.filter((h) => !h.retiredForever).map((h) => `<option value='${h.id}'>${horseDisplayName(h)}</option>`).join('')}</select>
      <button id='enter-breeder'>Enter Horse ($100)</button>
      <p class='small'>Foals/youngsters under 3 enter in-hand classes only. At 3+, they may continue here and also compete under saddle. Each horse may enter 4 times per month.</p>
    </div>
  `;

  document.getElementById('enter-breeder').onclick = () => {
    const horse = app.horses.find((h) => h.id === document.getElementById('breed-horse').value);
    if (!horse || !tryCharge(100)) return;
    if ((horse.breedersEntries || 0) >= 4) {
      alert('Horse already entered 4 times this month.');
      app.money += 100;
      return;
    }
    horse.breedersEntries = (horse.breedersEntries || 0) + 1;
    const conf = CONFORMATION_MULT[horse.conformation] * 32;
    const worthInfluence = horseWorth(horse) / 1400;
    const talentBoost = horse.extraPotential ? 4 : 0;
    const score = Math.round(conf + worthInfluence + talentBoost + rnd(20, 40));
    const placing = score > 93 ? 1 : score > 88 ? 2 : score > 82 ? 3 : rnd(4, 20);
    const payout = placing === 1 ? 1500 : placing === 2 ? 900 : placing === 3 ? 500 : 120;
    app.money += payout;
    horse.earnings += payout;
    if (placing <= 3) horse.topWins.breed += 1;
    if (placing === 1) horse.topWins.overall += 1;
    const showType = canCompeteUnderSaddle(horse) ? 'under-saddle or in-hand' : 'in-hand';
    pushReport(`Breeders' Show (${showType}): ${horse.name} scored ${score}, placed #${placing}, won ${money(payout)}.`);
    render();
  };
}

function renderFreezer() {
  document.getElementById('freezer').innerHTML = `
    <h2>Freezer</h2>
    <div class='grid two'>
      <div class='box'>
        <h3>Semen Straws</h3>
        ${app.semenStraws.map((s) => `<p class='small'>${s.stallionName} • Straw #${s.id}</p>`).join('') || '<p class="small">No straws stored.</p>'}
      </div>
      <div class='box'>
        <h3>Embryos</h3>
        ${app.embryos.map((e) => `<p class='small'>${e.donor} x ${e.sire} • Embryo #${e.id}</p>`).join('') || '<p class="small">No embryos stored.</p>'}
      </div>
    </div>
  `;
}

function renderRescue() {
  const cards = app.rescueHorses.map((h) => `
    <div class='box'>
      <h3>${h.name}</h3>
      <p>Age Range: ${h.ageLabel}</p>
      <p>Breed: ${h.breed}</p>
      <p>Gender: ${h.gender}</p>
      <p>Health: ${h.issues.length ? `${h.issues.length} issue(s)` : 'Unknown'}</p>
      <p>Months Left: ${Math.max(1, h.deadlineMonthIndex - currentMonthIndex())}</p>
      <p>Price: ${money(h.price)}</p>
      <p class='small'>Note: ${h.note}</p>
      <button data-rescue='${h.id}'>Adopt Rescue</button>
    </div>
  `).join('') || '<p class="small">No rescue horses available.</p>';

  document.getElementById('rescue').innerHTML = `
    <h2>Rescue Barn</h2>
    <p class='small'>Rescue horses are in poor condition and take longer to recover. Bonding will be tougher at first.</p>
    <div class='cards'>${cards}</div>
  `;

  document.querySelectorAll('#rescue button[data-rescue]').forEach((btn) => {
    btn.onclick = () => {
      const rescue = app.rescueHorses.find((h) => h.id === btn.dataset.rescue);
      if (!rescue || !tryCharge(rescue.price)) return;
      const horse = baseHorse('untrained');
      horse.name = rescue.name;
      horse.age = rescue.age;
      horse.breed = rescue.breed;
      horse.gender = rescue.gender;
      horse.weightStatus = rescue.weightStatus;
      horse.mood = rnd(1, 100) <= 95 ? pick(['Uncomfortable', 'Distress', 'Overly-Active', 'No energy', 'Bad moods', 'Grumpy']) : horse.mood;
      horse.isRescue = true;
      horse.bond = rnd(-50, -1);
      horse.rescueWeightDelay = rescue.rescueWeightDelay;
      horse.rescueWeightCooldown = rescue.rescueWeightDelay;
      horse.hiddenIllnesses = rescue.issues || [];
      app.horses.push(horse);
      app.rescueHorses = app.rescueHorses.filter((r) => r.id !== rescue.id);
      refreshRescueHorses();
      pushReport(`Adopted rescue horse ${horse.name} for ${money(rescue.price)}.`);
      render();
    };
  });
}

function injuryChanceByGenetics(horse) {
  if (horse.healthGenetics === 'Low') return 8;
  if (horse.healthGenetics === 'High') return 3;
  return 5;
}

function pickIllnessWithModifiers(horse) {
  const wrongFeedMonths = horse.wrongFeedMonthsYear || 0;
  const baseWeights = SICKNESS_TYPES.map((entry) => ({ entry, weight: 1 }));
  if (wrongFeedMonths > 5) {
    baseWeights.forEach((item) => {
      if (item.entry.name === 'Colic') item.weight *= 1.5;
      if (item.entry.name === 'Metabolic Flare') item.weight *= 1.75;
    });
  }
  const total = baseWeights.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of baseWeights) {
    roll -= item.weight;
    if (roll <= 0) return item.entry;
  }
  return SICKNESS_TYPES[0];
}

function addIllness(horse, illness) {
  if (!illness) return;
  const remaining = injuryRecoveryMonths(illness.severity);
  const isSevere = ['Severe', 'Very Severe'].includes(illness.severity) || remaining > 2;
  const lastSevere = horse.injuryProtection?.[illness.name];
  if (isSevere && lastSevere && currentMonthIndex() - lastSevere <= 24) {
    if (rnd(1, 100) <= 90) return;
  }
  const surgeryRoll = illness.surgeryRisk ? rnd(1, 100) : 0;
  if (illness.surgeryRisk && surgeryRoll <= illness.surgeryRisk) {
    const died = rnd(1, 100) <= Math.min(90, illness.surgeryRisk + 10);
    if (died) {
      horse.deceased = true;
      pushReport(`${horse.name} suffered ${illness.name} and did not survive surgery.`);
      return;
    }
  }
  horse.illnesses.push({
    name: illness.name,
    impact: illness.impact,
    remaining,
    active: true,
    severity: illness.severity,
    retirementRisk: illness.retirementRisk || 0
  });
  applySoundnessLoss(horse, illness.severity);
  const controlLoss = illness.severity === 'Easy' ? rnd(5, 10)
    : illness.severity === 'Medium' ? rnd(10, 15)
      : illness.severity === 'More Than Medium' ? rnd(15, 25)
        : rnd(25, 45);
  horse.controlability = clamp((horse.controlability || 0) - controlLoss, 0, 100);
  if (isSevere) {
    horse.injuryProtection[illness.name] = currentMonthIndex();
  }
  horse.injuryCountYear = (horse.injuryCountYear || 0) + 1;
  pushReport(`${horse.name} developed ${illness.name} (${illness.severity}). Recovery ${remaining} month(s).`);
}

function maybeAddOvertrainingInjury(horse) {
  if (horse.illnesses.some((i) => i.active)) return;
  const count = horse.overTrainingCountYear || 0;
  if (!horse.pendingOvertrainingInjury || count < 4) return;
  if (count >= 8) {
    addIllness(horse, { name: 'Broken Leg', impact: 28, severity: pick(['More Than Medium', 'Severe']), surgeryRisk: 25, retirementRisk: 25 });
    horse.pendingOvertrainingInjury = false;
    return;
  }
  addIllness(horse, { name: 'Lameness', impact: 10, severity: pick(['Easy', 'Medium']), surgeryRisk: 0, retirementRisk: 0 });
  horse.pendingOvertrainingInjury = false;
}

function maybeAddRandomIllness(horse) {
  if (horse.illnesses.some((i) => i.active)) return;
  const jointSupportBonus = horse.hasJointSupport ? 0.6 : 1;
  if (rnd(1, 100) <= injuryChanceByGenetics(horse) * jointSupportBonus) {
    const picked = pickIllnessWithModifiers(horse);
    addIllness(horse, picked);
  }
}

function applySoundnessWear(horse) {
  if (horse.retiredForever || horse.retiredToBreeding) return;
  if (horse.soundnessYears > 0) {
    horse.soundnessExpiredMonths = 0;
    return;
  }
  horse.soundnessExpiredMonths = (horse.soundnessExpiredMonths || 0) + 1;
  if (horse.unridable) return;
  if (horse.soundnessExpiredMonths >= 24) {
    horse.unridable = true;
    horse.retiredForever = true;
    horse.illnesses.push({
      name: 'Kissing Spines',
      impact: 45,
      remaining: 999,
      active: true,
      severity: 'Very Severe',
      retirementRisk: 100
    });
    pushReport(`${horse.name} developed kissing spines after extended competition and is now unridable.`);
    return;
  }
  if (horse.illnesses.some((i) => i.active)) return;
  const monthsSinceIssue = currentMonthIndex() - (horse.lastSoundnessIssueMonth || 0);
  if (monthsSinceIssue < 6) return;
  const isLongTerm = horse.soundnessExpiredMonths >= 12;
  const remaining = isLongTerm ? rnd(3, 6) : 1;
  horse.illnesses.push({
    name: isLongTerm ? 'Soundness Breakdown' : 'Soundness Strain',
    impact: isLongTerm ? 18 : 6,
    remaining,
    active: true,
    severity: isLongTerm ? 'Severe' : 'Easy',
    retirementRisk: isLongTerm ? 12 : 0
  });
  horse.injuryCountYear = (horse.injuryCountYear || 0) + 1;
  horse.lastSoundnessIssueMonth = currentMonthIndex();
  pushReport(`${horse.name} developed ${isLongTerm ? 'a soundness breakdown' : 'a soundness strain'} (${remaining} month recovery).`);
}

function processPregnancy(horse, newborns) {
  if (!(horse.pregnantBy || horse.pregnantEmbryo)) return;
  horse.gestation = (horse.gestation || 0) + 1;
  const due = horse.foalDue || 11;
  if (horse.gestation >= due) {
    const foal = baseHorse('untrained');
    foal.age = 0;
    const embryo = horse.pregnantEmbryo;
    const damHorse = embryo?.donorId ? app.horses.find((x) => x.id === embryo.donorId) : horse;
    const damName = damHorse?.name || horse.name;
    const sireName = horse.pregnantBy || embryo?.sire || 'Unknown Sire';
    const sireHorse = embryo?.sireId
      ? app.horses.find((x) => x.id === embryo.sireId)
      : app.horses.find((x) => x.name === sireName && x.gender === 'Stallion');
    foal.breed = sireHorse && damHorse && sireHorse.breed !== damHorse.breed
      ? `${damHorse.breed} 50% x ${sireHorse.breed} 50%`
      : (damHorse?.breed || horse.breed);
    foal.height = heightFromBreed(foal.breed);
    applyBreedTraits(foal);
    const rawFoalName = `Foal of ${damName}`;
    const code = (app.settings?.breedingCode || '').trim();
    if (code) {
      foal.name = app.settings?.breedingCodePosition === 'end' ? `${rawFoalName} ${code}` : `${code} ${rawFoalName}`;
    } else {
      foal.name = rawFoalName;
    }
    foal.bredBy = 'Your Stable';
    foal.owner = 'Your Stable';
    foal.gender = pick(['Mare', 'Stallion']);
    foal.potential = foalPotential(damHorse, sireHorse);
    foal.extraPotential = inheritExtraPotential(damHorse, sireHorse);
    if (foal.extraPotential) {
      Object.keys(foal.potential).forEach((k) => {
        foal.potential[k] = Math.min(100, foal.potential[k] + rnd(3, 8));
      });
    }
    const damTrait = damHorse?.personality || pick(PERSONALITIES);
    const sireTrait = sireHorse?.personality || pick(PERSONALITIES);
    foal.personality = rnd(1, 100) <= 45 ? damTrait : rnd(1, 100) <= 60 ? sireTrait : pick(PERSONALITIES);
    foal.socks = pick(SOCKS);
    foal.faceMarking = pick(FACE_MARKINGS);
    foal.marking = randomMarking(foal.breed);
    foal.pedigree = {
      sire: sireHorse ? { id: sireHorse.id, name: sireHorse.name, breed: sireHorse.breed, coat: sireHorse.coat } : { name: sireName, breed: sireHorse?.breed || 'Unknown', coat: sireHorse?.coat || 'Unknown' },
      dam: damHorse ? { id: damHorse.id, name: damHorse.name, breed: damHorse.breed, coat: damHorse.coat } : { name: damName, breed: damHorse?.breed || 'Unknown', coat: damHorse?.coat || 'Unknown' },
      sireSire: sireHorse?.pedigree?.sire || null,
      sireDam: sireHorse?.pedigree?.dam || null,
      damSire: damHorse?.pedigree?.sire || null,
      damDam: damHorse?.pedigree?.dam || null
    };
    ensurePedigreeBase(foal);
    foal.stats.dressage = { Collection: 0, Balance: 0, Connection: 0, Gaits: 0, Rhythm: 0, Flowiness: 0 };
    foal.stats.jumping = { Striding: 0, Confidence: 0, Balance: 0, Power: 0, Speed: 0, Structure: 0 };
    if (damHorse) {
      damHorse.offspring.push({ foalId: foal.id, name: foal.name, otherParentRole: 'Sire', otherParentName: sireName, age: foal.age });
      updateHorseTitles(damHorse);
    }
    if (sireHorse) {
      sireHorse.offspring.push({ foalId: foal.id, name: foal.name, otherParentRole: 'Dam', otherParentName: damName, age: foal.age });
      updateHorseTitles(sireHorse);
    }
    newborns.push(foal);
    delete horse.pregnantBy;
    delete horse.pregnantEmbryo;
    horse.gestation = 0;
    horse.foalDue = 0;
    pushReport(`${horse.name} foaled successfully: ${foal.name}.`);
  }
}

function processAgingAndMortality(horse) {
  if (horse.age < 25) return false;
  const chance = horse.age === 25 ? 8 : horse.age === 26 ? 14 : horse.age === 27 ? 24 : horse.age === 28 ? 35 : horse.age === 29 ? 55 : 85;
  if (rnd(1, 100) <= chance) {
    pushReport(`${horse.name} passed away from old age at ${horse.age}.`);
    return true;
  }
  return false;
}

function monthlyProgress() {
  app.month += 1;
  if (app.month > 12) {
    app.month = 1;
    app.year += 1;
    app.horses.forEach((h) => {
      h.age += 1;
      h.due.checkup = true;
      h.overTrainingCountYear = 0;
      h.wrongFeedMonthsYear = 0;
      h.injuryCountYear = 0;
      h.healthTrackingYear = app.year;
      if (!h.retiredForever && !h.retiredToBreeding) {
        h.soundnessYears = Math.max(0, (h.soundnessYears ?? 0) - 1);
      }
    });
  }

  const survivors = [];
  const newborns = [];
  app.horses.forEach((h) => {
    processPregnancy(h, newborns);
    maybeAddRandomIllness(h);
    if (h.deceased) {
      return;
    }
    h.illnesses.forEach((i) => {
      if (i.active && i.remaining > 0) i.remaining -= 1;
      if (i.active && i.remaining > 0 && h.healingBoost) i.remaining -= 1;
      if (i.active && i.remaining <= 0) {
        i.active = false;
        if (i.retirementRisk && rnd(1, 100) <= i.retirementRisk) {
          h.retiredToBreeding = true;
          pushReport(`${h.name} recovered from ${i.name} but was retired to breeding due to lasting issues.`);
        }
      }
    });
    applySoundnessWear(h);
    applyAutoTraining(h);
    const monthsSinceFarrier = app.year * 12 + app.month - (h.lastFarrierMonth || 0);
    h.due.farrier = monthsSinceFarrier >= 6;
    h.managed = { fed: false, vet: false, farrier: !h.due.farrier, showEntry: false, breedersEntry: false, trained: false };
    h.breedersEntries = 0;
    h.offspring.forEach((o) => { if (app.month === 1) o.age += 1; });
    updateMonthlyCare(h);
    updateBondMonthly(h);
    maybeAddOvertrainingInjury(h);
    resolvePendingCompetitions(h);
    if (!processAgingAndMortality(h)) survivors.push(h);
  });
  app.horses = survivors.concat(newborns);
  refreshNpcAds();
  refreshRescueHorses();
}



function renderSettings() {
  const current = app.settings || { barnName: 'Oxer to Oxer Stable Manager', breedingCode: '', breedingCodePosition: 'front' };
  document.getElementById('settings').innerHTML = `
    <h2>Settings</h2>
    <div class='box'>
      <label>Barn Name</label>
      <input id='settings-barn-name' type='text' value='${current.barnName || ''}' placeholder='Barn name' />
      <label>Breeding Code</label>
      <input id='settings-breeding-code' type='text' maxlength='12' value='${current.breedingCode || ''}' placeholder='e.g. OTO' />
      <label>Breeding Code Position</label>
      <select id='settings-code-position'>
        <option value='front' ${current.breedingCodePosition === 'front' ? 'selected' : ''}>Front (Code FoalName)</option>
        <option value='end' ${current.breedingCodePosition === 'end' ? 'selected' : ''}>End (FoalName Code)</option>
      </select>
      <button id='settings-save'>Save Settings</button>
      <p class='small'>Barn name updates the top header. Breeding code is auto-applied to newborn foal names.</p>
    </div>
  `;
  const saveBtn = document.getElementById('settings-save');
  if (saveBtn) {
    saveBtn.onclick = () => {
      app.settings = {
        barnName: (document.getElementById('settings-barn-name').value || '').trim() || 'Oxer to Oxer Stable Manager',
        breedingCode: (document.getElementById('settings-breeding-code').value || '').trim(),
        breedingCodePosition: document.getElementById('settings-code-position').value === 'end' ? 'end' : 'front'
      };
      pushReport('Settings updated.');
      render();
      saveGame(false);
    };
  }
}


function render() {
  ensurePanels();
  safeRun('updateHeader', updateHeader);
  safeRun('renderDashboard', renderDashboard);
  safeRun('renderHorses', renderHorses);
  safeRun('renderMarket', renderMarket);
  safeRun('renderSales', renderSales);
  safeRun('renderStud', renderStud);
  safeRun('renderShows', renderShows);
  safeRun('renderVet', renderVet);
  safeRun('renderFarrier', renderFarrier);
  safeRun('renderTraining', renderTraining);
  safeRun('renderBreeding', renderBreeding);
  safeRun('renderRegistries', renderRegistries);
  safeRun('renderBreeders', renderBreeders);
  safeRun('renderFreezer', renderFreezer);
  safeRun('renderRescue', renderRescue);
  safeRun('renderSettings', renderSettings);
}

const skipBtn = document.getElementById('skipMonthBtn');
const addMoneyBtn = document.getElementById('addMoneyBtn');
const saveGameBtn = document.getElementById('saveGameBtn');
const loadGameBtn = document.getElementById('loadGameBtn');
const resetGameBtn = document.getElementById('resetGameBtn');
if (skipBtn) skipBtn.onclick = () => { monthlyProgress(); render(); saveGame(false); };
if (addMoneyBtn) addMoneyBtn.onclick = () => { app.money += 100000; render(); saveGame(false); };
if (saveGameBtn) saveGameBtn.onclick = () => { if (saveGame(true)) render(); };
if (loadGameBtn) loadGameBtn.onclick = () => { if (loadGame(true)) render(); };
if (resetGameBtn) resetGameBtn.onclick = () => {
  if (!confirm('Reset game? This clears saved progress and starts fresh.')) return;
  try { localStorage.removeItem(SAVE_KEY); } catch (error) { console.error('Reset save failed', error); }
  resetGame();
  render();
};

window.addEventListener('error', (event) => {
  showFatal(event.message || 'Unknown runtime error');
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason?.message || String(event?.reason || 'Unknown promise rejection');
  showFatal(`Unhandled promise rejection: ${reason}`);
});

try {
  seed();
  loadGame(false);
  ensurePanels();
  buildTabs();
  render();
} catch (error) {
  console.error('Startup failed', error);
  try {
    resetGame();
    ensurePanels();
    buildTabs();
    render();
    pushReport('Startup recovered by resetting invalid state.');
  } catch (fallbackError) {
    console.error('Startup fallback failed', fallbackError);
    showFatal(`${error.message} (fallback failed: ${fallbackError.message})`);
  }
}
