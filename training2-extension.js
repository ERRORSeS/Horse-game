/* Additive progression and contextual incident hooks; existing scenes remain intact. */
const T2X_TEXT={
  "F1": "[HORSE] responds promptly to your transition aid, changing gait without losing the rhythm. The response feels clearer than it did during earlier exercises.",
  "F2": "[HORSE] takes several extra strides to come back to the requested gait. The horse remains manageable but needs a clearer understanding of the downward aid.",
  "F3": "[HORSE] follows the circle evenly, maintaining the intended bend and rhythm. The exercise feels organized from beginning to end.",
  "F4": "[HORSE] begins leaning onto the inside shoulder, causing the circle to shrink. The rhythm becomes less consistent as balance is lost.",
  "F5": "[HORSE] initially struggles to maintain the bend through the changes of direction. After further appropriate work, the movement becomes more accurate.",
  "F6": "[HORSE] begins preparing for canter before the aid is fully given. The horse feels eager but slightly ahead of the request.",
  "F7": "[HORSE] becomes heavier on the left rein and finds the requested bend difficult. The line becomes less precise in this direction.",
  "F8": "[HORSE] struggles to maintain even contact on the right rein, allowing the shoulders to drift out of alignment.",
  "F9": "[HORSE] attempts to shorten the stride but loses forward energy. The collected work is not yet fully consistent.",
  "F10": "[HORSE] moves sideways with a reasonably even rhythm, responding to the aids while maintaining forward movement.",
  "F11": "[HORSE] halts nearer the intended marker than on the previous attempts. The response feels more precise and organized.",
  "F12": "[HORSE] begins losing concentration during the detailed flatwork. The exercise remains possible, but a change of activity may be more productive.",
  "J1": "[HORSE] approaches the fence with a steady canter and a clear rhythm. The horse remains straight and jumps without requiring significant correction.",
  "J2": "[HORSE] maintains the intended stride pattern between the fences. The line feels organized, and the horse responds to the requested adjustment.",
  "J3": "[HORSE] shortens unexpectedly between the fences and adds another stride. The second jump becomes less organized than planned.",
  "J4": "[HORSE] lengthens unexpectedly and reaches the next fence in fewer strides than intended. The distance becomes more difficult to manage.",
  "J5": "[HORSE] lands and immediately increases the pace, becoming stronger in the contact. The next approach will require further organization.",
  "J6": "[HORSE] becomes more coordinated through the gymnastic line. Later efforts show a steadier takeoff and more organized landing.",
  "J7": "[HORSE] examines the filler carefully, shortening the final strides. The horse appears uncertain about the unusual appearance.",
  "J8": "[HORSE] approaches the filler with less hesitation than before and clears it calmly. The successful attempt provides meaningful confidence-building experience.",
  "J9": "[HORSE] becomes cautious on approach to the water tray. The stride shortens as the horse studies the obstacle.",
  "J10": "[HORSE] attempts the fence but loses the quality of the approach as the difficulty increases. The exercise may need to be simplified.",
  "J11": "After the fence is lowered, [HORSE] returns with a more consistent rhythm and completes the exercise more comfortably.",
  "J12": "[HORSE] remains attentive through the course, maintaining a consistent approach despite the changes of direction and fence types.",
  "HE1": "[HORSE] maintains a steady rhythm through the hunter line. The approach and landing remain consistent.",
  "HE2": "[HORSE] begins to quicken between the fences, disrupting the steady pace required for the exercise.",
  "HE3": "[HORSE] stays straight through the related line and completes both fences without drifting.",
  "HE4": "[HORSE] remains attentive throughout the course, adjusting smoothly to each change of direction.",
  "HE5": "[HORSE] completes the course, but the rhythm changes several times and the work lacks consistency.",
  "HE6": "[HORSE] performs the flatwork portion with improving accuracy, responding more reliably to the transition aids.",
  "HE7": "[HORSE] approaches the unfamiliar cross-country obstacle cautiously but maintains enough confidence to continue.",
  "HE8": "[HORSE] slows on approach to the new obstacle, showing uncertainty about the unfamiliar question.",
  "HE9": "[HORSE] works carefully over the slope, adjusting the stride and balance to the changing ground.",
  "HE10": "[HORSE] becomes less coordinated over the uneven terrain and needs an easier pace to maintain balance.",
  "HE11": "[HORSE] becomes more comfortable near the water and completes the introduction with noticeably less hesitation.",
  "HE12": "[HORSE] finishes the exercise more confidently than it began, showing better attention and coordination.",
  "L1": "[HORSE] walks around the circle at an even pace, responding quietly to the handler's direction.",
  "L2": "[HORSE] begins making the circle smaller, drifting inward rather than maintaining the requested line.",
  "L3": "[HORSE] responds to the voice cue and moves into trot without losing the intended circle.",
  "L4": "[HORSE] continues in the previous gait for several strides before responding to the repeated voice instruction.",
  "L5": "[HORSE] increases the pace too much and loses the steady rhythm required for the exercise.",
  "L6": "[HORSE] trots with a more regular rhythm, maintaining a consistent distance from the handler.",
  "L7": "[HORSE] organizes the canter transition and continues around the circle without significant loss of balance.",
  "L8": "[HORSE] falls inward during the canter, making the circle tighter and less balanced.",
  "L9": "[HORSE] listens to the halt cue and stops without becoming restless.",
  "L10": "[HORSE] changes direction calmly and begins working on the opposite rein.",
  "L11": "[HORSE] negotiates the ground poles with improving coordination, maintaining a more consistent rhythm.",
  "L12": "[HORSE] becomes distracted briefly but returns attention to the handler and completes the exercise.",
  "A1": "[HORSE] is prepared for lunging with correctly fitted, suitable equipment. The aids are checked before the exercise begins.",
  "A2": "[HORSE] accepts the familiar equipment calmly and begins walking without showing discomfort.",
  "A3": "[HORSE] notices the unfamiliar equipment and needs a calm introduction before training can continue.",
  "A4": "The selected training aid is unsuitable for [HORSE]'s current equipment fit, education, or medical status. The setup must be changed before continuing.",
  "A5": "[HORSE] maintains a more consistent balance through the exercise while working in the suitable equipment.",
  "A6": "[HORSE] remains attentive to the handler and completes the exercise without significant distraction.",
  "A7": "[HORSE] completes the exercise, but the equipment does not create any additional training benefit for this particular task.",
  "A8": "[HORSE] struggles with the requested rhythm despite the suitable equipment. A simpler exercise may be more productive.",
  "A9": "[HORSE] shows signs of discomfort while working. The equipment should be checked, and unsuitable aids must be removed.",
  "A10": "The additional training aids are removed. [HORSE] continues with an appropriate basic lunging exercise.",
  "A11": "[HORSE] maintains a consistent rhythm after the additional aids are removed, showing that the exercise is becoming better understood.",
  "A12": "The lunging session used appropriate equipment where relevant. Attribute progress was based on the completed exercises rather than the equipment alone.",
  "D1": "[HORSE] willingly attempts the requested exercise and remains engaged throughout the effort.",
  "D2": "[HORSE] approaches a previously difficult task with less resistance, showing a more cooperative attitude.",
  "D3": "[HORSE] begins showing signs of mental fatigue. Continuing the same exercise may reduce the quality of the work.",
  "D4": "[HORSE] waits quietly between attempts, remaining attentive without becoming restless.",
  "D5": "[HORSE] begins fidgeting while waiting, clearly finding the pause difficult.",
  "D6": "[HORSE] maintains the slower requested pace despite initially wanting to move faster.",
  "D7": "[HORSE] settles after the earlier difficulty and returns to work with a calmer attitude.",
  "D8": "[HORSE] remains tense after the interruption and needs more time before attempting another exercise.",
  "D9": "[HORSE] returns to the task after a suitable break and performs with greater confidence.",
  "D10": "The session provided useful training, but no meaningful stress-recovery sequence occurred.",
  "D11": "[HORSE] becomes increasingly overwhelmed by the difficulty. Further pressure is unlikely to produce useful learning.",
  "D12": "[HORSE] completes the final appropriate exercise calmly, ending the session with a positive experience.",
  "R1": "[HORSE] stops directly in front of the fence instead of taking off. The jump is not completed.",
  "R2": "[HORSE] approaches normally before stopping sharply in the final stride. The sudden change of momentum catches the rider by surprise.",
  "R3": "[HORSE] shortens the stride several times before stopping. The approach loses confidence well before the fence.",
  "R4": "[HORSE] drifts left and passes the outside of the jump instead of clearing it.",
  "R5": "[HORSE] moves toward the right standard and avoids the fence at the final moment.",
  "R6": "[HORSE] studies the unfamiliar filler and stops, appearing unsure about the obstacle.",
  "R7": "[HORSE] hesitates at the water tray and refuses to continue over the obstacle.",
  "R8": "[HORSE] loses forward energy on the approach and comes to a stop before the fence.",
  "R9": "[HORSE] becomes increasingly tense after another unsuccessful approach to the same obstacle.",
  "R10": "After a suitable break and adjustment, [HORSE] returns to the exercise in a calmer rhythm.",
  "R11": "With the difficulty reduced, [HORSE] approaches more confidently and clears the fence.",
  "R12": "[HORSE] has refused this obstacle repeatedly. Continuing without changing the exercise is not appropriate. Lower the difficulty, choose another exercise, or finish jumping.",
  "S1": "[HORSE] notices movement nearby and steps suddenly to the side. The horse quickly regains the previous rhythm.",
  "S2": "A sharp sound catches [HORSE]'s attention. The horse stops abruptly, lifting its head toward the source.",
  "S3": "A banner moves in the wind, and [HORSE] jumps sideways before looking back at it cautiously.",
  "S4": "Another horse moves suddenly nearby. [HORSE] reacts with a quick sideways step and briefly loses concentration.",
  "S5": "A bird takes off near the arena edge. [HORSE] startles and speeds up for several strides.",
  "S6": "The arena gate rattles unexpectedly, causing [HORSE] to tense and move away from it.",
  "S7": "An unfamiliar sound from beside the trail makes [HORSE] stop and look sharply toward the trees.",
  "S8": "[HORSE] jumps abruptly away from the unexpected movement, disrupting the rider's position.",
  "S9": "The rider remains balanced through the sudden movement and helps [HORSE] return to a controlled pace.",
  "S10": "[HORSE] continues looking toward the source of the noise, taking longer than usual to settle.",
  "S11": "[HORSE] relaxes after the brief startle and returns attention to the training exercise.",
  "S12": "After a calm pause, [HORSE] passes the previously worrying object without another significant reaction.",
  "B1": "[HORSE] suddenly accelerates beyond the requested pace. The rider feels the horse becoming difficult to slow.",
  "B2": "The initial spook develops into a sudden surge forward. [HORSE] continues accelerating rather than settling after a few strides.",
  "B3": "[HORSE] rushes across the outdoor arena, ignoring the first request to slow down.",
  "B4": "[HORSE] accelerates sharply across the indoor arena, making the turn ahead more difficult to organize.",
  "B5": "An unexpected disturbance causes [HORSE] to rush forward along the trail, losing the previously controlled pace.",
  "B6": "[HORSE] becomes strong in the contact and continues forward despite the rider's attempted downward aid.",
  "B7": "The rider gradually re-establishes control, and [HORSE] returns to a more manageable gait.",
  "B8": "[HORSE] continues rushing for several strides, and the rider remains unbalanced while trying to regain control.",
  "B9": "[HORSE] finally slows, remaining tense and alert after the sudden acceleration.",
  "B10": "Following the bolt, [HORSE] remains too unsettled for demanding work. A calmer activity or early finish is appropriate.",
  "B11": "After sufficient time to settle, [HORSE] completes an easier exercise without another uncontrolled acceleration.",
  "B12": "The loss of control makes continuing the original lesson unsafe. Demanding ridden work is discontinued.",
  "K1": "[HORSE] gives a small playful hop during the transition, then continues in the requested gait.",
  "K2": "As the canter begins, [HORSE] raises the hindquarters in a brief buck before moving forward again.",
  "K3": "[HORSE] becomes overexcited and throws in a sudden buck, briefly disrupting the rhythm.",
  "K4": "Immediately after landing, [HORSE] gives a sharp buck and shifts the rider's balance.",
  "K5": "[HORSE] swishes the tail and gives a small kick-out while resisting the requested transition.",
  "K6": "[HORSE] bucks forcefully, lifting the hindquarters and unbalancing the rider.",
  "K7": "[HORSE] produces several bucks in quick succession, making it difficult for the rider to remain balanced.",
  "K8": "The rider stays seated through the movement and regains an organized position.",
  "K9": "The sudden buck throws the rider forward, but the position is recovered before a fall occurs.",
  "K10": "[HORSE] stops bucking and gradually returns to a calmer pace.",
  "K11": "[HORSE] shows repeated resistance that may indicate discomfort. The training session should not continue at the same intensity without checking the cause.",
  "K12": "The bucking makes further demanding ridden work inappropriate. The current session is stopped.",
  "RE1": "[HORSE] becomes severely tense and lifts the front feet off the ground, interrupting the exercise.",
  "RE2": "[HORSE] suddenly rears, forcing the rider to focus on remaining balanced rather than completing the exercise.",
  "RE3": "The earlier resistance escalates sharply as [HORSE] rises onto the hind legs.",
  "RE4": "[HORSE] lifts the front feet briefly before returning to the ground, still visibly tense.",
  "RE5": "[HORSE] rises higher than expected, seriously disrupting the rider's balance.",
  "RE6": "The rider remains seated as [HORSE] returns to all four feet, but the training is interrupted.",
  "RE7": "The sudden upward movement causes the rider to lose a stable position.",
  "RE8": "[HORSE] remains agitated after the rear, and the original exercise is no longer appropriate.",
  "RE9": "The behavior raises concern about severe stress or discomfort. Continuing the same demanding work is not appropriate.",
  "RE10": "The session is stopped after the rearing incident.",
  "RE11": "The horse reared during the session. Demanding ridden work was discontinued, and the cause should be reviewed.",
  "RE12": "[HORSE] returns to a quieter state after the exercise is discontinued, but no further demanding ridden work is attempted.",
  "RF1": "[HORSE] stops abruptly before the fence. The sudden change of momentum unseats the rider, who falls forward. The training session ends.",
  "RF2": "[HORSE] moves suddenly around the side of the fence. The rider loses balance during the unexpected change of direction and falls.",
  "RF3": "[HORSE] lands awkwardly and becomes unbalanced. The rider cannot recover their position and falls after the fence.",
  "RF4": "[HORSE] stumbles badly, disrupting the rider's balance. The rider falls, and training is immediately stopped.",
  "RF5": "[HORSE] suddenly jumps sideways in response to a disturbance. The rider is thrown off balance and falls.",
  "RF6": "[HORSE] accelerates uncontrollably. During the sudden movement, the rider loses their seat and falls.",
  "RF7": "[HORSE] gives a forceful buck that unseats the rider. The riding session comes to an immediate end.",
  "RF8": "[HORSE] bucks several times in succession. The rider struggles to remain balanced before eventually falling.",
  "RF9": "[HORSE] rears sharply, and the rider loses balance during the upward movement. The rider falls as the horse returns to the ground.",
  "RF10": "[HORSE] startles suddenly, but the rider remains seated and helps the horse regain composure.",
  "RF11": "[HORSE] bucks unexpectedly, but the rider stays balanced and recovers their position.",
  "RF12": "[HORSE] surges forward, but the rider eventually regains control without falling.",
  "RF13": "[HORSE] rears, but the rider remains seated as the horse returns to the ground. The session is stopped due to the seriousness of the incident.",
  "RF14": "A rider fall occurred during the session. Further mounted training was discontinued.",
  "PI1": "[HORSE] settles after the brief startle and becomes attentive again.",
  "PI2": "[HORSE] continues reacting to the surroundings, making demanding work unsuitable for the moment.",
  "PI3": "[HORSE] returns to a manageable pace after the loss of control, but remains more alert than before.",
  "PI4": "[HORSE] stops bucking and returns to a steadier rhythm.",
  "PI5": "The repeated bucking suggests the horse may be uncomfortable or overly distressed. Demanding work is discontinued.",
  "PI6": "The seriousness of the rearing incident makes further ridden schooling inappropriate.",
  "PI7": "The exercise is made easier following the refusal, allowing [HORSE] another suitable opportunity.",
  "PI8": "[HORSE] completes a simpler exercise calmly after the earlier difficulty.",
  "PI9": "[HORSE] remains tense and is not yet ready for another demanding attempt.",
  "PI10": "The session ends following the rider fall. No further mounted exercises are attempted.",
  "PI11": "The horse successfully regained composure and returned to appropriate work, providing a qualifying Recovery-training experience.",
  "PI12": "The incident remained unresolved during the session, so no permanent Recovery training gain was awarded."
};
const T2X=Object.freeze({
 goals:['Responsiveness','Patience','Confidence','Balance','Focus','Willingness','Recovery'],
 lungingModes:['Lunging Without Additional Aids','Lunging With Training Aids'],
 goal:[1.30,1.15,1.05],quality:[1,.8,.5,.2,0,0,0,0],defaultGains:[.05,.02,.01],attributeCap:.15,
 extra:{willingness:.01,improvedWillingness:.02,willingnessCap:.06,recovery:.015,recoveryCap:.045,patienceCap:.05},
 refusal:{base:2,easy:-1,challenge:3,filler:4,water:6,lowConfidence:3,highConfidence:-2,lowWillingness:2,highWillingness:-1,fatigue:4,tension:3,cap:12,novelCap:22,limit:3},
 spook:{base:3,Spooky:6,'Bomb-Proof':-2,lowConfidence:3,highConfidence:-2,busy:3,stimulus:4,cap:20,severeCap:28,severity:[75,20,5]},
 bolt:{base:1.5,'Hot-Blooded':1.5,Excitable:1,Spooky:2,lowResponse:1.5,tension:2,confidence:-.5,cap:9},
 buck:{base:2,Energetic:2,Excitable:2,'Hot-Blooded':1.5,overactive:2,tension:2,cap:10,severity:[70,25,5]},
 rear:{base:.5,tension:.5,distress:.5,learned:1,cap:3},
 falls:{refusal:1,abruptRefusal:4,runout:2,landing:2,stumble:7,mildSpook:.2,moderateSpook:1.5,severeSpook:5,bolt:5,smallBuck:.5,strongBuck:4,repeatedBuck:8,briefRear:6,highRear:12},
 highTension:70,severeTension:90,highFatigue:70,ordinaryFallCap:12,highRearFallCap:16,
 aidBonus:{Balance:1.05,Focus:1.03},confidenceFamiliar:.25,confidenceNovel:1.10
});
// Base gains describe a real completed exercise block, never a small UI action.
const T2X_MAPPING={
 'walk-halt':['Responsiveness',.05,'Patience',.015], 'walk-trot':['Responsiveness',.055,'Balance',.02],
 'trot-canter':['Responsiveness',.06,'Balance',.025],downward:['Responsiveness',.06,'Balance',.02],
 'change-rein':['Responsiveness',.045,'Focus',.025], 'large-circle':['Balance',.045,'Focus',.015],
 'small-circle':['Balance',.06,'Responsiveness',.02],serpentines:['Balance',.05,'Focus',.025,'Responsiveness',.01],
 'rein-back':['Responsiveness',.045,'Patience',.02],lengthen:['Responsiveness',.06,'Balance',.025],shorten:['Responsiveness',.06,'Balance',.025],
 'leg-yield':['Balance',.055,'Responsiveness',.025,'Focus',.01],'shoulder-in':['Balance',.065,'Responsiveness',.02,'Focus',.01],
 crossrail:['Confidence',.05,'Balance',.015],vertical:['Balance',.045,'Focus',.02],oxer:['Balance',.055,'Confidence',.02],
 gymnastic:['Balance',.07,'Focus',.025,'Responsiveness',.01],bounce:['Balance',.065,'Responsiveness',.02],
 related:['Responsiveness',.065,'Balance',.025,'Focus',.01],bending:['Responsiveness',.06,'Balance',.03],
 'stride-poles':['Responsiveness',.07,'Patience',.015,'Balance',.01],filler:['Confidence',.06,'Recovery',.015],water:['Confidence',.065,'Recovery',.02],
 course:['Focus',.05,'Balance',.025,'Responsiveness',.01],'technical-course':['Focus',.06,'Responsiveness',.03,'Balance',.015],
 'lunge-walk':['Focus',.035,'Balance',.015],'lunge-trot':['Balance',.045,'Focus',.02],'lunge-canter':['Balance',.055,'Responsiveness',.02],
 'lunge-walk-trot':['Responsiveness',.05,'Focus',.02],'lunge-trot-canter':['Responsiveness',.055,'Balance',.025],
 'lunge-downward':['Responsiveness',.05,'Patience',.02],'lunge-halt':['Responsiveness',.045,'Patience',.02],
 'lunge-direction':['Focus',.045,'Responsiveness',.02],'lunge-poles':['Balance',.055,'Focus',.02],
 'lunge-cavaletti':['Balance',.06,'Focus',.025],'lunge-refocus':['Focus',.045,'Recovery',.02],
 'dressage-intro':['Responsiveness',.05,'Focus',.02],'dressage-training':['Balance',.055,'Responsiveness',.02],
 'precision-transitions':['Responsiveness',.06,'Focus',.025],straightness:['Balance',.05,'Focus',.025],
 lateral:['Balance',.06,'Responsiveness',.03],collected:['Balance',.065,'Focus',.025,'Patience',.01],
 'test-practice':['Focus',.06,'Responsiveness',.025,'Balance',.01],'precise-halts':['Responsiveness',.045,'Patience',.025],
 'hunter-rhythm':['Focus',.055,'Balance',.025],'hunter-lines':['Responsiveness',.05,'Balance',.025],
 'hunter-course':['Focus',.06,'Balance',.025,'Patience',.01],'smooth-transitions':['Responsiveness',.05,'Balance',.02],
 'consistent-rhythm':['Balance',.055,'Focus',.025],'eventing-dressage':['Responsiveness',.055,'Balance',.025],
 'xc-intro':['Confidence',.06,'Focus',.02],'xc-technical':['Focus',.065,'Responsiveness',.025,'Balance',.01],
 'eventing-water':['Confidence',.065,'Recovery',.02],'hill-work':['Balance',.05,'Focus',.015],terrain:['Balance',.055,'Confidence',.02]
};
function t2xLunging(e,s){return e.id.startsWith('lunge-');}
function t2xMapping(e,s){let row=T2X_MAPPING[e.id]||[e.primary,T2X.defaultGains[0],e.secondary,T2X.defaultGains[1]];if(s.discipline==='hunter'&&e.id==='course')row=T2X_MAPPING['hunter-course'];if(s.discipline==='eventing'&&e.id==='water')row=T2X_MAPPING['eventing-water'];return row;}
// Reuse existing exercise prerequisites and skill fields; add only missing named blocks.
for(const [id,name,base,source]of [
 ['lunge-walk-trot','Lunging Walk–Trot Transitions',6,'lunge-trot'],['lunge-trot-canter','Lunging Trot–Canter Transitions',9,'lunge-canter'],
 ['lunge-downward','Lunging Downward Transitions',7,'lunge-trot'],['lunge-halt','Lunging Voice Halt',5,'lunge-walk'],
 ['lunge-direction','Lunging Direction Change',5,'lunge-walk'],['lunge-poles','Lunging Ground Poles',6,'lunge-trot'],
 ['lunge-cavaletti','Lunging Cavaletti',8,'lunge-trot'],['lunge-refocus','Lunging Calmness/Refocus',5,'lunge-walk'],
 ['dressage-intro','Introductory Dressage',5,'walk-halt'],['dressage-training','Training-Level Dressage',7,'large-circle'],
 ['precision-transitions','Precision Transitions',8,'walk-trot'],['straightness','Straightness',6,'large-circle'],
 ['lateral','Lateral Movements',12,'leg-yield'],['collected','Collected Work',15,'shoulder-in'],
 ['test-practice','Test Practice',10,'serpentines'],['precise-halts','Precise Halts',5,'walk-halt'],
 ['hunter-rhythm','Hunter Rhythm',7,'vertical'],['hunter-lines','Hunter Lines',10,'related'],['hunter-course','Hunter Course',9,'course'],
 ['smooth-transitions','Smooth Transitions',6,'walk-trot'],['consistent-rhythm','Consistent Rhythm',6,'large-circle'],
 ['eventing-dressage','Eventing Dressage',7,'walk-trot'],['xc-intro','Intro Cross-Country',9,'crossrail'],
 ['xc-technical','Technical XC Lines',13,'technical-course'],['eventing-water','Water Introduction',11,'water'],
 ['hill-work','Hill Work',7,'trail'],['terrain','Terrain Adaptation',8,'trail']]){
 const original=t2exercise(source),row=T2X_MAPPING[id];T2_EXERCISES.push({...original,id,name,base,duration:5,primary:row[0],secondary:row[2],prerequisites:{...original.prerequisites},locations:/^xc-|eventing-water|hill-work|terrain/.test(id)?['Outdoor']:[...original.locations]});
}
function t2xArena(facility='outdoor',hour=pastureCalendarHour()){
 const state=t2state(),day=Math.floor(hour/24),key=day+'|'+facility;
 state.arenaActivity=state.arenaActivity||{};
 if(!state.arenaActivity[key]){const rng={seed:t2mixSeed(stableTextHash('arena|'+key))||1};state.arenaActivity[key]=['Quiet','Ordinary','Busy'][Math.floor(t2random(rng)*3)];}
 for(const k of Object.keys(state.arenaActivity))if(Number(k.split('|')[0])<day-90)delete state.arenaActivity[k];return state.arenaActivity[key];
}
const T2X_OLD_WEATHER=t2weather;
t2weather=function(hour=pastureCalendarHour()){
 const w=T2X_OLD_WEATHER(hour);if(w.extensionVersion!==1){const rng={seed:t2mixSeed(stableTextHash('daily-conditions|'+w.day))||1};w.temperature= Math.round((w.temperature+t2range(-2,2,rng))*10)/10;w.wind=Math.max(0,Math.round(w.wind+t2range(-3,3,rng)));w.extensionVersion=1;w.date=pastureDateLabel(Math.floor(hour/24)*24);}return w;
};
function t2xAidStatus(h,e,s){
 if(!t2xLunging(e,s)||s.lungingMode!==T2X.lungingModes[1])return {ok:true,bonus:false};
 const setup=eqSetup(h),gear=equipmentModifiers(h,'groundwork'),aid=setup.trainingAid;
 const approved=aid==='Side Reins',surcingle=aid==='Lunging Surcingle';
 const suitable=['Bomb-Proof','Easy-Going','Unfocused'].includes(mgPersonality(h));
 const ok=(approved&&suitable||surcingle)&&gear.comfort>=85&&!h.stallRest&&!h.unridable&&!(h.illnesses||[]).some(x=>x.active)&&t2educationScore(h)>=e.education;
 return {ok,bonus:ok&&approved,aid,message:ok?'':T2X_TEXT.A4};
}
function t2xAward(h,s,name,requested,changes){
 if(name==='Sensitivity to Aids'||!Number.isFinite(requested)||requested<=0)return 0;
 s.attributeGains=s.attributeGains||Object.fromEntries(T2_ATTRIBUTES.map(a=>[a,s.progress?.['Riding '+a]||0]));const value=t2attribute(h,name),gain=Math.max(0,Math.min(requested,T2X.attributeCap-(s.attributeGains[name]||0),10-value));
 if(name==='Focus')h.focus+=gain*10;else t2horse(h).attributes[name]=value+gain;
 s.attributeGains[name]=(s.attributeGains[name]||0)+gain;s.attributeGain+=gain;changes['Riding '+name]=(changes['Riding '+name]||0)+gain;return gain;
}
function t2xAttributeGain(h,e,s,result,repeat,c,m){
 const changes={},row=t2xMapping(e,s),quality=T2X.quality[result]||0,rep=T2.repetition[Math.min(5,repeat-1)],aid=t2xAidStatus(h,e,s);
 s.goalWork=s.goalWork||{total:0,relevant:0,attempted:0,earned:0};s.goalWork.attempted+=e.duration;
 if(!quality||!aid.ok)return changes;
 const meaningful=e.duration;s.goalWork.total+=meaningful;let goalRelevant=false;
 for(let i=0;i<row.length;i+=2){const name=row[i],value=t2attribute(h,name);if(name==='Recovery'&&!s.recoveryReady)continue;if(e.id==='terrain'&&name==='Confidence'&&c.familiarity>=60)continue;if(e.id==='hunter-course'&&name==='Patience'&&!(s.patientWaits>0))continue;
 const dim=T2.progress.diminishing[value<4?0:value<6?1:value<8?2:value<9.5?3:4],goal=name===s.goal?T2X.goal[i/2]:1;
 let factor=1;if(name==='Confidence')factor=c.familiarity>=80&&s.difficulty<=0?T2X.confidenceFamiliar:c.familiarity<20?T2X.confidenceNovel:1;
 if(aid.bonus&&T2X.aidBonus[name])factor*=T2X.aidBonus[name];
 const recoveryRoom=name==='Recovery'?Math.max(0,T2X.extra.recoveryCap-(s.extraDevelopment?.Recovery||0)):Infinity;const gain=t2xAward(h,s,name,Math.min(recoveryRoom,row[i+1]*quality*rep*dim*goal*factor*m.wm*m.fm*m.fat*m.traits*m.learning),changes);if(name==='Recovery'){s.extraDevelopment=s.extraDevelopment||{};s.extraDevelopment.Recovery=(s.extraDevelopment.Recovery||0)+gain;}
 if(name===s.goal){goalRelevant=true;s.goalWork.earned+=gain;}
 }
 if(goalRelevant)s.goalWork.relevant+=meaningful;
 if(result<=1){s.extraDevelopment=s.extraDevelopment||{};const improved=s.log.some(x=>x.exerciseId===e.id&&x.resultIndex===5),wanted=improved?T2X.extra.improvedWillingness:T2X.extra.willingness,used=s.extraDevelopment.Willingness||0,earned=t2xAward(h,s,'Willingness',Math.min(wanted*quality*rep*m.fat*(s.goal==='Willingness'?T2X.goal[2]:1),T2X.extra.willingnessCap-used),changes);s.extraDevelopment.Willingness=used+earned;if(s.goal==='Willingness'){s.goalWork.relevant+=meaningful;s.goalWork.earned+=earned;}
 if(t2xLunging(e,s)){const t=t2horse(h);t.education.voice=clamp((t.education.voice||0)+.2*quality*rep,0,100);}
 if(s.recoveryReady){const mappedRecovery=row.includes('Recovery');const used=s.extraDevelopment.Recovery||0,gain=t2xAward(h,s,'Recovery',Math.min((mappedRecovery?0:T2X.extra.recovery)*(s.goal==='Recovery'?T2X.goal[0]:1),T2X.extra.recoveryCap-used),changes);s.extraDevelopment.Recovery=used+gain;if(s.goal==='Recovery'&&!goalRelevant){s.goalWork.relevant+=meaningful;s.goalWork.earned+=gain;}s.recoveryReady=false;s.recoverySequences=(s.recoverySequences||0)+1;s.pendingRecoveryNarrative=true;}
 }
 return changes;
}
const T2X_OLD_BREAK=t2break;
t2break=function(h,s,minutes=2){const before=s.tension,amount=T2X_OLD_BREAK(h,s,minutes);if(before>=10&&before<=70&&amount>0&&s.tension<=10&&s.log.some(x=>x.event||x.incident)){s.recoveryReady=true;s.controlLost=false;}if(s.tension<=10)s.recoveryRequired=false;return amount;};
function t2xSpookProfile(h,s,c,gear){const p=T2X.spook,confidence=t2attribute(h,'Confidence',s),traits=t2traitModifiers(h,'spook',c),personality=p[mgPersonality(h)]||0,traitPersonality=clamp(personality+traits.reduce((n,r,i)=>n+r.value*(i?.5:1),0),-12,12),base=p.base;return {base,chance:clamp((base+traitPersonality+(confidence<4?p.lowConfidence:confidence>=8?p.highConfidence:0)+(c.newArena&&c.busy?p.busy:0)+(c.actualStimulus?p.stimulus:0)+(c.wind?t2weatherPP(s.weather,s.location,h).wind:0)+(gear.spook||0))*(1-(gear.spookReduction||0)/100),0,p.cap),traits,traitPersonality,personality,attributes:confidence<4?p.lowConfidence:confidence>=8?p.highConfidence:0,cap:p.cap};}
function t2xRefusalProfile(h,s,c,gear){const p=T2X.refusal,confidence=t2attribute(h,'Confidence',s),w=t2attribute(h,'Willingness',s),traits=t2traitModifiers(h,'hesitation',c),traitPersonality=clamp(traits.reduce((n,r,i)=>n+r.value*(i?.5:1),0),-12,12),cap=(c.filler||c.water)&&s.difficulty>=1?p.novelCap:p.cap;return {base:p.base,chance:clamp(p.base+(c.familiar&&s.difficulty<0?p.easy:0)+(s.difficulty>=1?p.challenge:0)+(c.filler?p.filler:0)+(c.water&&c.familiarity<60?p.water:0)+(confidence<4?p.lowConfidence:confidence>=8?p.highConfidence:0)+(w<4?p.lowWillingness:w>=8?p.highWillingness:0)+((h.fatigue||0)>=70?p.fatigue:0)+(s.tension>=70?p.tension:0)+traitPersonality+(gear.refusal||0),0,cap),traits,traitPersonality,attributes:0,cap};}
function t2xFallChance(h,s,kind){const relevant=!['refusal','abruptRefusal'].includes(kind),balance=t2attribute(h,'Balance',s);return clamp((T2X.falls[kind]||0)+(relevant?(balance<4?1:balance>=8?-.5:0):0)+((h.fatigue||0)>=70?1:0)+(s.tension>=70?1:0),0,kind==='highRear'?16:12);}
function t2xSay(h,id){return (T2X_TEXT[id]||'').replaceAll('[HORSE]',h.name);}
function t2xPickSeverity(weights,s){let roll=t2random(s)*100;return Math.max(0,weights.findIndex(n=>(roll-=n)<=0));}
function t2xIncident(h,s,kind,record,extra={}){
 if(record.incident)return record.incident;const incident={id:s.id+'-incident-'+s.attempts,kind,...extra,fallRolls:0};record.incident=incident;s.incidents=s.incidents||[];s.incidents.push(incident);
 const narratives={refusal:'R1',abruptRefusal:'R2',runout:s.setup.direction==='Right'?'R5':'R4',landing:null,stumble:null,mildSpook:'S1',moderateSpook:'S8',severeSpook:'S8',bolt:s.location==='Indoor'?'B4':t2exercise(s.exerciseId).category==='Trail'?'B5':'B3',smallBuck:'K2',strongBuck:'K6',repeatedBuck:'K7',briefRear:'RE4',highRear:'RE5'};
 // Serious stumble has no supplied non-fall scene: keep the existing technical observation until the stability outcome.
 record.supplements=record.supplements||[];if(kind==='smallBuck'&&s.gait!=='Canter'&&s.log.at(-2)?.exerciseId&&t2exercise(s.log.at(-2).exerciseId)?.category==='Jumping')narratives.smallBuck='K4';if(kind==='mildSpook'&&s.tension>20)narratives.mildSpook='S8';if(narratives[kind])record.supplements.push(t2xSay(h,narratives[kind]));
 if(kind==='stumble')record.text+=` ${h.name} stumbles and loses balance during the attempted movement.`;if(kind==='landing')record.text+=` ${h.name} lands awkwardly and needs to reorganize.`;const mounted=t2exercise(record.exerciseId||s.exerciseId).category!=='Groundwork';
 if(mounted){incident.fallChance=t2xFallChance(h,s,kind);incident.fallRolls=1;incident.fell=t2random(s)*100<incident.fallChance;}
 if(incident.fell){s.riderFell=true;s.safetyStop='Rider fall';s.phase='cooldown';const fallId=kind==='abruptRefusal'?'RF1':kind==='refusal'?'RF14':kind==='runout'?'RF2':kind==='landing'?'RF3':kind==='stumble'?'RF4':kind.includes('Spook')?'RF5':kind==='bolt'?'RF6':kind==='repeatedBuck'?'RF8':kind.includes('Buck')?'RF7':'RF9';record.supplements.push(t2xSay(h,fallId));s.mountedStopped=true;}
 else if(kind==='briefRear'||kind==='highRear'){s.safetyStop='Rearing welfare stop';s.phase='cooldown';s.mountedStopped=true;record.supplements.push(t2xSay(h,'RF13'),t2xSay(h,'PI6'));}
 else if(['bolt','strongBuck','repeatedBuck','severeSpook'].includes(kind)){s.demandingStopped=true;s.recoveryRequired=true;s.controlLost=kind==='bolt';s.tension=clamp(s.tension+15,0,100);record.supplements.push(t2xSay(h,kind==='bolt'?'B10':kind==='repeatedBuck'?'PI5':'PI9'));}
 else if(kind==='moderateSpook'){s.recoveryRequired=true;record.supplements.push(t2xSay(h,'S10'));}
 else if(kind==='mildSpook'&&mounted)record.supplements.push(t2xSay(h,'RF10'));
 else if(kind==='smallBuck')record.supplements.push(t2xSay(h,'K8'));
 record.text+=record.supplements.length?' '+record.supplements.join(' '):'';
 return incident;
}
function t2xBehaviorProfiles(h,s,e){const mounted=e.category!=='Groundwork',tension=s.tension||0,p=mgPersonality(h),canter=s.gait==='Canter'||e.id==='trot-canter',landing=s.log.at(-1)?.exerciseId&&t2exercise(s.log.at(-1).exerciseId)?.category==='Jumping',significant=tension>=90&&(h.mood==='Distress'||s.log.some(x=>x.incident)),buckTrigger=mounted&&(canter||landing)&&(s.lastBuckTrigger!==s.attempts),gear=equipmentModifiers(h,t2equipmentContext(e,s)),comfort=gear.comfort>=70;
 return {bolt:mounted&&tension>=T2X.highTension?clamp(T2X.bolt.base+(T2X.bolt[p]||0)+(t2attribute(h,'Responsiveness',s)<4?T2X.bolt.lowResponse:0)+T2X.bolt.tension+(t2attribute(h,'Confidence',s)>=8?T2X.bolt.confidence:0),0,T2X.bolt.cap):0,rear:mounted&&significant?clamp(T2X.rear.base+(tension>=70?.5:0)+(h.mood==='Distress'?.5:0)+(t2horse(h).learnedRearing===true?1:0),0,3):0,buck:buckTrigger&&comfort?clamp(T2X.buck.base+(T2X.buck[p]||0)+(h.mood==='Overly-Active'?2:0)+(tension>=70?2:0),0,10):0};}
function t2xBeforeAttempt(h,s,e){
 if(s.mountedStopped||s.riderFell)return {blocked:true,message:'Mounted work has ended for safety. End Session.'};
 if(e.category!=='Groundwork'&&equipmentModifiers(h,t2equipmentContext(e,s)).comfort<50){s.demandingStopped=true;return {blocked:true,message:t2xSay(h,'K11')};}if(s.recoveryRequired||s.controlLost)return {blocked:true,message:'Take a calm walk break and regain composure before another attempt.'};
 if(s.demandingStopped&&(e.intensity>1||e.category==='Jumping'))return {blocked:true,message:'Demanding work was discontinued after the incident. Choose suitable easy work or end the session.'};
 const key=t2attemptKey(e,s.setup,s);if((s.refusals?.[key]||0)>=T2X.refusal.limit)return {blocked:true,message:t2xSay(h,'R12')};
 const aid=t2xAidStatus(h,e,s);if(!aid.ok)return {blocked:true,message:t2xSay(h,'A4')};
 if(t2xLunging(e,s)&&s.lungingMode!==T2X.lungingModes[1]&&eqSetup(h).trainingAid&&!['None','Lunging Surcingle','Neck Strap'].includes(eqSetup(h).trainingAid))return {blocked:true,message:'Remove additional training aids before selecting Lunging Without Additional Aids.'};
 const profiles=t2xBehaviorProfiles(h,s,e);s.lastBuckTrigger=s.attempts;let roll=t2random(s)*100,kind=null;
 // One categorical major-behavior decision, not independent buck and rear rolls.
 if(roll<profiles.rear)kind=s.tension>=95?'highRear':'briefRear';else if(roll<profiles.rear+profiles.bolt)kind='bolt';else if(roll<profiles.rear+profiles.bolt+profiles.buck)kind=['smallBuck','strongBuck','repeatedBuck'][t2xPickSeverity(T2X.buck.severity,s)];
 if(!kind)return null;
 s.attempts++;s.elapsed+=e.duration;h.fatigue=clamp((h.fatigue||0)+e.intensity,0,100);s.repetitions[e.id]=(s.repetitions[e.id]||0)+1;
 const record={exercise:e.name,exerciseId:e.id,result:'Exercise abandoned',resultIndex:6,event:kind,text:'The planned exercise was interrupted before completion.',changes:{},elapsed:s.elapsed,setup:{...s.setup},probabilities:{majorBehavior:{chance:profiles.rear+profiles.bolt+profiles.buck,cap:22}}};s.log.push(record);t2xIncident(h,s,kind,record);s.lastResult=6;if(s.riderFell)t2state().lastReport=t2finish(h,s);return record;
}
function t2xAfterAttempt(h,s,e,r,c,observation){
 if(c.jump&&r.resultIndex===5){const key=t2attemptKey(e,s.setup,s);s.refusals=s.refusals||{};s.refusals[key]=(s.refusals[key]||0)+1;
 const drift=t2horse(h).traits.some(t=>t==='Drifts Left to Fences'||t==='Drifts Right to Fences');let kind=drift?'runout':s.tension>=70?'abruptRefusal':'refusal';
 // The actual refused approach, never a clear, owns one stability decision.
 t2xIncident(h,s,kind,r);if(c.filler)r.text+=' '+t2xSay(h,'R6');else if(c.water)r.text+=' '+t2xSay(h,'R7');if(s.refusals[key]>=3)r.text+=' '+t2xSay(h,'R12');
 }else if(r.event==='spook'){
 let severity=t2xPickSeverity(T2X.spook.severity,s);if(severity===2&&!c.wind&&!c.traffic&&!c.newArena&&!c.actualStimulus)severity=1;
 let kind=['mildSpook','moderateSpook','severeSpook'][severity];
 if(severity===2){const p=T2X.bolt,chance=clamp(p.base+(p[mgPersonality(h)]||0)+(t2attribute(h,'Responsiveness',s)<4?p.lowResponse:0)+(s.tension>=70?p.tension:0)+(t2attribute(h,'Confidence',s)>=8?p.confidence:0),0,p.cap);r.probabilities.bolt={chance,cap:p.cap};if(t2random(s)*100<chance)kind='bolt';}
 t2xIncident(h,s,kind,r,{fromSpook:kind==='bolt',stimulus:c.wind?'wind':c.traffic?'traffic':c.gate?'gate':'nearby horses'});
 }else if(r.resultIndex===3&&e.category!=='Groundwork'&&(e.primary==='Balance'||e.secondary==='Balance')){
 // An existing actual severe technical imbalance can be a stumble/landing, without another generic incident chance.
 if((h.fatigue||0)>=70||s.difficulty>=2)t2xIncident(h,s,c.jump?'landing':'stumble',r);
 }
 if(t2xLunging(e,s)&&r.event==='excitement'&&e.id.includes('trot'))r.rushing=true;const supplements=t2xExerciseNarratives(h,s,e,r,c);if(s.pendingRecoveryNarrative){supplements.push('PI11');s.pendingRecoveryNarrative=false;}
 for(const id of supplements){const text=t2xSay(h,id);if(text&&!r.text.includes(text))r.text+=' '+text;}
 if(t2xLunging(e,s)&&s.lungingMode===T2X.lungingModes[1]){const aid=t2xAidStatus(h,e,s);r.text+=' '+t2xSay(h,r.resultIndex<=1?(aid.bonus?(e.primary==='Balance'?'A5':'A6'):'A7'):'A8');}
 if((s.automatic||s.quick)&&r.resultIndex===5&&c.jump&&!s.riderFell){s.setup.height=Math.max(.2,Math.round((s.setup.height-.1)*100)/100);s.difficulty=Math.max(-2,s.difficulty-1);s.adjustedAfterRefusal=true;s.log.push({kind:'Automatic adjustment',text:t2xSay(h,'PI7'),elapsed:s.elapsed});}if(s.riderFell){t2state().lastReport=t2finish(h,s);}
}
function t2xNarrativeEligibility(h,s,e,r,c){
 const correct=r.resultIndex<=1,partial=r.resultIndex===2,error=r.resultIndex===3,prior=s.log.slice(0,-1).filter(x=>x.exerciseId===e.id),improved=correct&&prior.some(x=>x.resultIndex>=2),last=prior.at(-1),incident=r.incident,kind=incident?.kind,lunging=t2xLunging(e,s),map=t2xMapping(e,s),transition=/transition|walk-|downward/.test(e.id),circle=/circle/.test(e.id),jump=c.jump,flat=e.category==='Flatwork',recovered=Boolean(s.pendingRecoveryNarrative),ids=[];
 const yes=(id,condition)=>{if(condition)ids.push(id);};
 yes('F1',flat&&transition&&improved);yes('F2',e.id==='downward'&&error);yes('F3',flat&&circle&&r.resultIndex===0);yes('F4',flat&&circle&&error);yes('F5',e.id==='serpentines'&&improved);yes('F6',transition&&r.event==='anticipation');yes('F7',flat&&error&&c.left&&t2horse(h).traits.includes('Strong on Left Rein'));yes('F8',flat&&error&&c.right&&t2horse(h).traits.includes('Strong on Right Rein'));yes('F9',e.id==='collected'&&partial);yes('F10',['leg-yield','shoulder-in','lateral'].includes(e.id)&&correct);yes('F11',['walk-halt','precise-halts'].includes(e.id)&&improved);yes('F12',flat&&(h.fatigue||0)>=50&&r.event==='distraction');
 yes('J1',jump&&correct&&!r.rushing&&!r.incident);yes('J2',e.id==='related'&&correct);yes('J3',jump&&error&&c.longLine&&t2horse(h).traits.includes('Short Stride Tendency'));yes('J4',jump&&error&&c.shortLine&&t2horse(h).traits.includes('Long Stride Tendency'));yes('J5',r.text.includes('Strong landing'));yes('J6',e.id==='gymnastic'&&improved);yes('J7',c.filler&&r.event==='hesitation');yes('J8',c.filler&&improved&&prior.some(x=>x.event==='hesitation'));yes('J9',c.water&&r.event==='hesitation');yes('J10',jump&&s.difficulty>=1&&(partial||error));yes('J11',jump&&correct&&last?.resultIndex>=2&&last.setup?.height>s.setup.height);yes('J12',e.id==='course'&&correct&&!r.rushing&&!r.incident);
 yes('HE1',s.discipline==='hunter'&&e.id.includes('line')&&correct);yes('HE2',s.discipline==='hunter'&&r.rushing);yes('HE3',s.discipline==='hunter'&&e.id.includes('line')&&correct&&!r.rushing);yes('HE4',s.discipline==='hunter'&&/course/.test(e.id)&&correct);yes('HE5',s.discipline==='hunter'&&/course/.test(e.id)&&partial);yes('HE6',s.discipline==='eventing'&&flat&&improved);yes('HE7',e.id==='xc-intro'&&correct&&c.newFence);yes('HE8',/^xc-/.test(e.id)&&r.event==='hesitation');yes('HE9',e.id==='hill-work'&&correct);yes('HE10',e.id==='terrain'&&(partial||error));yes('HE11',(e.id==='eventing-water'||s.discipline==='eventing'&&c.water)&&improved);yes('HE12',s.discipline==='eventing'&&improved);
 yes('L1',e.id==='lunge-walk'&&correct);yes('L2',lunging&&error&&t2taskEvent(e)==='balance');yes('L3',e.id==='lunge-walk-trot'&&correct);yes('L4',lunging&&/halt|transition|downward|walk-trot|trot-canter/.test(e.id)&&error);yes('L5',lunging&&r.rushing);yes('L6',e.id==='lunge-trot'&&correct);yes('L7',/^lunge-.*canter/.test(e.id)&&correct);yes('L8',/^lunge-.*canter/.test(e.id)&&error);yes('L9',e.id==='lunge-halt'&&correct);yes('L10',e.id==='lunge-direction'&&correct);yes('L11',e.id==='lunge-poles'&&improved);yes('L12',lunging&&correct&&prior.some(x=>x.event==='distraction'));
 yes('D1',correct&&!r.incident);yes('D2',correct&&prior.some(x=>x.resultIndex===5));yes('D3',(h.fatigue||0)>=50&&r.event==='distraction');yes('D4',s.lastWaitingCalm===true);yes('D5',s.lastWaitingCalm===false);yes('D6',e.id==='shorten'&&correct&&s.speedPressure>0);yes('D7',recovered);yes('D8',s.recoveryRequired&&s.tension>10);yes('D9',improved&&recovered);yes('D11',s.tension>=90&&s.difficulty>=1);yes('D12',correct&&s.elapsed+e.duration>s.length);
 yes('R3',kind==='refusal'&&c.familiarity<20);yes('R6',kind==='refusal'&&c.filler);yes('R7',kind==='refusal'&&c.water);yes('R8',kind==='refusal'&&t2attribute(h,'Willingness')<4);yes('R9',kind==='refusal'&&s.refusals?.[c.attemptKey]>1&&s.tension>=30);yes('R10',correct&&s.breakAfterRefusal&&s.adjustedAfterRefusal);yes('R11',jump&&correct&&last?.resultIndex===5&&s.setup.height<last.setup.height);
 yes('S2',kind==='moderateSpook'&&incident.stimulus==='sound');yes('S3',kind?.includes('Spook')&&incident.stimulus==='wind');yes('S4',kind?.includes('Spook')&&incident.stimulus==='nearby horses');yes('S5',kind?.includes('Spook')&&incident.stimulus==='bird');yes('S6',kind?.includes('Spook')&&incident.stimulus==='gate');yes('S7',kind?.includes('Spook')&&c.trail&&incident.stimulus==='sound');yes('S11',kind==='mildSpook'&&s.tension<=10);yes('S12',correct&&s.reexposedStimulus&&s.recoverySequences>0);
 yes('B1',kind==='bolt');yes('B2',kind==='bolt'&&incident.fromSpook);yes('B6',kind==='bolt'&&t2attribute(h,'Responsiveness')<4);yes('B8',kind==='bolt'&&!incident.fell&&s.controlLost);yes('B11',correct&&s.incidents?.some(x=>x.kind==='bolt')&&s.tension<=10);
 yes('K1',kind==='smallBuck'&&e.id==='trot-canter');yes('K3',kind==='smallBuck'&&h.mood==='Overly-Active');yes('K4',kind==='strongBuck'&&s.log.at(-2)?.exerciseId&&t2exercise(s.log.at(-2).exerciseId)?.category==='Jumping');yes('K5',kind==='smallBuck'&&r.event==='overreaction');yes('K9',kind==='strongBuck'&&!incident.fell);yes('K11',kind==='repeatedBuck');yes('K12',kind==='strongBuck'||kind==='repeatedBuck');
 yes('RE1',kind==='briefRear');yes('RE2',kind==='highRear');yes('RE3',kind?.includes('Rear')&&prior.some(x=>x.resultIndex===5));yes('RE7',kind?.includes('Rear')&&incident.fell);yes('RE8',kind?.includes('Rear'));yes('RE9',kind?.includes('Rear'));yes('RE10',kind?.includes('Rear'));
 yes('PI1',kind==='mildSpook'&&s.tension<=10);yes('PI2',s.recoveryRequired&&kind?.includes('Spook'));yes('PI8',correct&&s.recoverySequences>0&&s.difficulty<0);
 return ids;
}
function t2xExerciseNarratives(h,s,e,r,c){const eligible=t2xNarrativeEligibility(h,s,e,r,c),technical=eligible.filter(id=>/^(F|J|HE|L)\d/.test(id)),other=eligible.filter(id=>!technical.includes(id));return [...(technical.length?[technical[Math.floor(t2random(s)*technical.length)]]:[]),...(other.length?[other[Math.floor(t2random(s)*other.length)]]:[])];}
function t2xGoalReport(h,s){const goal=T2X.goals.includes(s.goal)?s.goal:'Responsiveness',work=s.goalWork||{},fraction=work.total?work.relevant/work.total:0,relevance=fraction>=.5?'High':fraction>=.2?'Moderate':fraction>0?'Low':'None';const text=fraction>=.5?`Today's exercises directly supported the selected training goal: ${goal}.`:fraction>=.2?`The selected exercises supported ${goal} as a secondary training objective.`:fraction>0?`The selected exercises provided only limited opportunities to train ${goal}.`:`The completed work did not meaningfully target ${goal}.`;return {goal,relevance,relevantMinutes:work.relevant||0,completedMinutes:work.total||0,earned:work.earned||0,text};}
const T2X_OLD_FINISH=t2finish;
t2finish=function(h,s){const existing=Boolean(s.finished),report=T2X_OLD_FINISH(h,s);if(existing&&report.extensionVersion)return report;report.extensionVersion=1;report.mainGoal=t2xGoalReport(h,s);report.incidents=JSON.parse(JSON.stringify(s.incidents||[]));report.recoverySequences=s.recoverySequences||0;report.safetyStop=s.safetyStop||null;report.arenaActivity=s.occupancy;report.incidentCounts={};for(const i of report.incidents){const label=i.kind==='runout'?'Run-outs':/refusal/i.test(i.kind)?'Jump refusals':i.kind.includes('Spook')?'Spooks':i.kind.includes('Buck')?'Bucks':i.kind.includes('Rear')?'Rears':i.kind==='bolt'?'Bolting incidents':i.kind==='landing'?'Awkward landings':'Serious stumbles';report.incidentCounts[label]=(report.incidentCounts[label]||0)+1;if(i.fell)report.incidentCounts['Rider falls']=(report.incidentCounts['Rider falls']||0)+1;}report.lungingMode=s.log.some(x=>x.exerciseId?.startsWith('lunge-'))?s.lungingMode:null;
 const add=text=>{if(text&&!report.notes.includes(text))report.notes.push(text);};add(report.mainGoal.text);
 if(!report.incidents.length&&s.attempts)add(`${h.name} completed the planned exercises without significant behavioral incidents.`);
 if(s.riderFell)add(t2xSay(h,s.incidents?.at(-1)?.kind==='abruptRefusal'?'PI10':'RF14'));if(s.safetyStop?.includes('Rearing'))add(t2xSay(h,'RE11'));
 if(s.recoverySequences)add(t2xSay(h,'PI11'));else if(s.incidents?.length)add(t2xSay(h,'PI12'));else add(t2xSay(h,'D10'));
 if(report.lungingMode===T2X.lungingModes[1])add(t2xSay(h,'A12'));
 return report;
};
const T2X_OLD_REPORT=t2reportMarkup;
t2reportMarkup=function(r){let html=T2X_OLD_REPORT(r);const extra=`${r.mainGoal?`<h4>Main Training Goal</h4><p>${mgEscape(r.mainGoal.goal)} — ${r.mainGoal.relevance} relevance · ${t2fmt(r.mainGoal.relevantMinutes)} / ${t2fmt(r.mainGoal.completedMinutes)} completed work minutes · +${t2fmt(r.mainGoal.earned)} earned points</p>`:''}${r.incidents?.length?`<h4>Behavior & Rider Stability</h4>${Object.entries(r.incidentCounts||{}).map(([name,count])=>`<p>${mgEscape(name)}: ${count}</p>`).join('')}${r.incidents.map(i=>`<p>${mgEscape(i.kind)} — ${i.fell?'Rider fall; mounted session ended':i.fallRolls?'Rider stayed seated':'Ground handling incident; no rider fall check'}${i.fallRolls?' · conditional fall probability '+t2fmt(i.fallChance)+'%':''}</p>`).join('')}`:''}${r.recoverySequences?`<p>Recovery sequences: ${r.recoverySequences}</p>`:''}${r.safetyStop?`<p>Safety stop: ${mgEscape(r.safetyStop)}</p>`:''}`;return html.replace('</details>',extra+'</details>');};
const T2X_OLD_ELIGIBILITY=t2eligibility;
t2eligibility=function(h,e,setup={},s){const problem=T2X_OLD_ELIGIBILITY(h,e,setup,s);if(problem)return problem;if(e.locations&&!e.locations.includes(setup.location||s?.location||'Outdoor'))return 'This obstacle is unavailable in the selected training environment.';if(s&&(s.mountedStopped||s.riderFell))return 'Mounted work has ended for safety. End Session.';return '';};
const T2X_OLD_WARMUP=t2warmup;
t2warmup=function(h,s,...args){if(s.mountedStopped||s.riderFell)return {ok:false,message:'Mounted work has ended for safety. End Session.'};return T2X_OLD_WARMUP(h,s,...args);};
const T2X_OLD_ACTIONS=t2extraActions;
t2extraActions=function(h,s){const actions=T2X_OLD_ACTIONS(h,s);if(t2xLunging(t2exercise(s.exerciseId),s)&&s.lungingMode===T2X.lungingModes[1])actions.push(['remove-lunging-aids','Remove Additional Training Aids']);if(s.phase==='main'&&!s.mountedStopped)actions.push(['wait-calmly','Practice Calm Waiting']);return actions;};
const T2X_OLD_ADJUST=t2adjust;
t2adjust=function(h,s,action){if(action==='remove-lunging-aids'){const item=eqItems(h).find(x=>x.slot==='trainingAid');if(item?.item)mgUnassign(item.item);else if(h.tack)h.tack.trainingAid='None';s.lungingMode=T2X.lungingModes[0];s.aidsRemoved=true;s.log.push({kind:'Equipment adjustment',text:t2xSay(h,'A10'),elapsed:s.elapsed});return true;}
 if(action==='wait-calmly'){if(s.phase!=='main'||t2eligibility(h,t2exercise('standing'),{location:s.location},s))return false;if(s.finished||s.mountedStopped||s.elapsed+3>s.length||t2scheduledSessionCount(h,s.createdHour)>=preferredTrainingSessionLimit(h))return false;const e=t2exercise('standing'),repeat=(s.repetitions['standing']||0)+1;s.elapsed+=3;s.repetitions.standing=repeat;const chance=t2probability(h,'frustration',repeat<3?0:3,{repeated:repeat>=3},'Patience',null,s).chance,calm=t2random(s)*100>=chance;s.lastWaitingCalm=calm;const changes={};if(calm){s.patientWaits=(s.patientWaits||0)+1;s.waitingGain=s.waitingGain||0;const value=t2attribute(h,'Patience'),dimin=T2.progress.diminishing[value<4?0:value<6?1:value<8?2:value<9.5?3:4],goal=s.goal==='Patience'?T2X.goal[0]:1,gain=t2xAward(h,s,'Patience',Math.min(.015*T2.repetition[Math.min(5,repeat-1)]*dimin*goal,.05-s.waitingGain),changes);s.waitingGain+=gain;s.goalWork=s.goalWork||{total:0,relevant:0,attempted:0,earned:0};s.goalWork.total+=3;s.goalWork.attempted+=3;if(s.goal==='Patience'){s.goalWork.relevant+=3;s.goalWork.earned+=gain;}for(const[k,v]of Object.entries(changes))s.progress[k]=(s.progress[k]||0)+v;}s.log.push({kind:'Calm waiting',text:t2xSay(h,calm?'D4':'D5'),elapsed:s.elapsed,changes});return true;}return T2X_OLD_ADJUST(h,s,action);};
// Supplemental preparation/recovery scenes use the same actual equipment and tension transitions.
const T2X_PREPARATION_ATTEMPT=t2xBeforeAttempt;
t2xBeforeAttempt=function(h,s,e){
 if(t2xLunging(e,s)&&s.lungingMode===T2X.lungingModes[1]&&!s.aidPreparationRecorded){const status=t2xAidStatus(h,e,s);if(!status.ok){const gear=equipmentModifiers(h,'groundwork');s.log.push({kind:'Equipment check',text:t2xSay(h,gear.comfort<85?'A9':'A4'),elapsed:s.elapsed});return {blocked:true,message:t2xSay(h,'A4')};}
 s.aidPreparationRecorded=true;const seen=t2horse(h).equipmentSeen[status.aid];s.log.push({kind:'Equipment check',text:t2xSay(h,'A1')+' '+t2xSay(h,seen?'A2':'A3'),elapsed:s.elapsed});}
 return T2X_PREPARATION_ATTEMPT(h,s,e);
};
const T2X_RECOVERY_BREAK=t2break;
t2break=function(h,s,minutes=2){if(s.finished||s.riderFell||s.mountedStopped)return 0;const latest=s.incidents?.at(-1),before=s.tension,amount=T2X_RECOVERY_BREAK(h,s,minutes);if(amount>0&&s.tension<=10&&latest&&!latest.recoveryNarrated){latest.recoveryNarrated=true;const ids=latest.kind==='bolt'?['B7','B9','PI3','RF12']:latest.kind.includes('Buck')?['K10','PI4']:latest.kind.includes('Spook')?['S11','PI1']:[];if(ids.length)s.log.push({kind:'Incident recovery',text:t2xSay(h,ids[Math.floor(t2random(s)*ids.length)]),elapsed:s.elapsed});if(latest.kind==='refusal'||latest.kind==='abruptRefusal')s.breakAfterRefusal=true;}return amount;};
const T2X_NARRATIVE_INCIDENT=t2xIncident;
t2xIncident=function(h,s,kind,r,extra={}){const was=Boolean(r.incident),incident=T2X_NARRATIVE_INCIDENT(h,s,kind,r,extra);if(was)return incident;
 let pair=null;if(!incident.fell&&(kind==='briefRear'||kind==='highRear'))pair=['RF13','RE6'];else if(!incident.fell&&kind==='mildSpook'&&incident.fallRolls)pair=['RF10','S9'];else if(!incident.fell&&kind==='smallBuck')pair=['K8','RF11'];else if(!incident.fell&&kind==='bolt')pair=['B10','B12'];
 if(pair&&t2random(s)>=.5){r.text=r.text.replace(t2xSay(h,pair[0]),t2xSay(h,pair[1]));r.supplements=(r.supplements||[]).map(text=>text===t2xSay(h,pair[0])?t2xSay(h,pair[1]):text);}
 return incident;};
const T2X_MORE_NARRATIVES=t2xExerciseNarratives;
t2xExerciseNarratives=function(h,s,e,r,c){const ids=T2X_MORE_NARRATIVES(h,s,e,r,c);if(t2xLunging(e,s)&&s.aidsRemoved&&r.resultIndex<=1){ids.push('A11');s.aidsRemoved=false;}if(s.safetyStop?.includes('Rearing')&&s.tension<=10)ids.push('RE12');return ids;};
const T2X_GOAL_TEXT=[
"Today's exercises directly supported the selected training goal: [GOAL].",
"[HORSE] completed several exercises that emphasized [GOAL].",
"The session provided useful practice toward improving [GOAL].",
"The selected exercises supported [GOAL] as a secondary training objective.",
"Some work contributed to [GOAL], although another attribute received the greatest emphasis.",
"The selected exercises provided only limited opportunities to train [GOAL].",
"The completed work did not meaningfully target [GOAL].",
"[HORSE] attempted suitable work for [GOAL], but the exercise was not completed successfully.",
"[HORSE] showed improved execution during exercises targeting [GOAL].",
"The session was shortened before substantial [GOAL] training could occur.",
"The selected training goal remained appropriate, but fatigue reduced the amount of productive work.",
"The chosen exercise was too familiar to provide much additional progress toward [GOAL]."
];
const T2X_GOAL_REPORT=t2xGoalReport;
t2xGoalReport=function(h,s){const report=T2X_GOAL_REPORT(h,s),work=s.goalWork||{},improved=s.log.some((x,i)=>x.resultIndex<=1&&s.log.slice(0,i).some(p=>p.exerciseId===x.exerciseId&&p.resultIndex>=2)&&t2xMapping(t2exercise(x.exerciseId),s).includes(report.goal));let index=report.relevance==='High'?0:report.relevance==='Moderate'?3:report.relevance==='Low'?5:6;
 if(!work.total&&s.log.some(x=>x.exerciseId&&t2xMapping(t2exercise(x.exerciseId),s).includes(report.goal)))index=7;
 else if(report.relevantMinutes>0&&s.elapsed<10)index=9;
 else if(report.relevantMinutes>0&&(h.fatigue||0)>=50)index=10;
 else if(report.relevantMinutes>0&&s.log.filter(x=>x.exerciseId).every(x=>(t2horse(h).familiarity[t2exercise(x.exerciseId).memory]||0)>=80)&&(work.earned||0)<.01)index=11;
 else if(improved)index=8;
 else if(index===0){const blocks=s.log.filter(x=>x.resultIndex<=1&&x.exerciseId).length;index=blocks>=3?1:blocks===1?2:0;}
 else if(index===3&&report.relevantMinutes<report.completedMinutes/3)index=4;
 report.text=T2X_GOAL_TEXT[index].replaceAll('[HORSE]',h.name).replaceAll('[GOAL]',report.goal);return report;};
