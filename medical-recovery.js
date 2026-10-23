/* Post-diagnosis gameplay course only. Incidence and final outcomes remain in health-engine. */
(function(root){
const definitions={
 "scratch": {
  "daily": [
   94.0,
   5.0,
   0.8,
   0.2
  ],
  "quotes": [
   "A thin scratch is visible along [HORSE]'s [BODY REGION].",
   "The superficial mark remains visible, but the surrounding skin looks comfortable.",
   "The scratch is beginning to fade as the skin recovers.",
   "The affected area looks irritated again, suggesting the scratch has been disturbed.",
   "The scratch has healed, leaving no meaningful limitation."
  ],
  "recoveryDescription": "Recovery: 2–6 days."
 },
 "cut": {
  "daily": [
   89.0,
   8.0,
   2.0,
   1.0
  ],
  "quotes": [
   "A small cut is visible on [HORSE]'s [LIMB].",
   "The wound remains open, although its appearance is stable.",
   "The edges of the cut are closing and the surrounding irritation is decreasing.",
   "The wound has been disturbed and appears less healed than during the previous check.",
   "The cut has closed, with [NO VISIBLE MARK / A SMALL RESIDUAL SCAR]."
  ],
  "recoveryDescription": "Recovery: 4–21 days."
 },
 "abrasion": {
  "daily": [
   92.0,
   6.0,
   1.5,
   0.5
  ],
  "quotes": [
   "A rubbed patch of skin is visible on [HORSE]'s [BODY REGION].",
   "The abrasion remains sensitive to further contact.",
   "Healthy skin is gradually returning across the affected area.",
   "Continued friction has irritated the abrasion again.",
   "The abrasion has resolved, and the skin appears comfortable."
  ],
  "recoveryDescription": "Recovery: 3–12 days."
 },
 "rub": {
  "daily": [
   93.0,
   5.0,
   1.5,
   0.5
  ],
  "quotes": [
   "A rubbed area is visible where [HORSE]'s equipment normally rests.",
   "[HORSE] reacts when the affected skin comes into contact with the tack.",
   "The skin is becoming less irritated after the equipment adjustment.",
   "The same rubbing problem has caused renewed irritation.",
   "The skin has recovered, and the tack-related discomfort has settled."
  ],
  "recoveryDescription": "Recovery: 4–14 days."
 },
 "dermatitis": {
  "daily": [
   86.0,
   10.0,
   3.0,
   1.0
  ],
  "quotes": [
   "Several crusted patches are visible along [HORSE]'s coat.",
   "The affected skin remains irritated in multiple small areas.",
   "The crusted patches are gradually clearing.",
   "New irritation has appeared despite the earlier improvement.",
   "The active dermatitis has resolved, although environmental management remains important."
  ],
  "recoveryDescription": "Recovery: 7–28 days."
 },
 "skin-infection": {
  "daily": [
   82.0,
   12.0,
   4.0,
   2.0
  ],
  "quotes": [
   "The affected skin appears inflamed and requires veterinary assessment.",
   "The infected area remains uncomfortable despite initial care.",
   "The inflammation is decreasing during the prescribed treatment.",
   "The affected skin has become more irritated, and the treatment may need reassessment.",
   "The active infection has cleared, with [NO RESIDUAL EFFECT / RESIDUAL SKIN CHANGES]."
  ],
  "recoveryDescription": "Recovery: 7–60 days, severity-dependent."
 },
 "laceration": {
  "daily": [
   78.0,
   15.0,
   5.0,
   2.0
  ],
  "quotes": [
   "A substantial wound is visible on [HORSE]'s [BODY REGION].",
   "The wound remains under veterinary treatment and requires continued monitoring.",
   "The wound is becoming smaller as healthy tissue develops.",
   "The wound has reopened or developed a concerning change.",
   "The laceration has healed, although [HORSE] may retain [RESIDUAL EFFECT]."
  ],
  "recoveryDescription": "Recovery: 3 weeks–5 months."
 },
 "tender-hoof": {
  "daily": [
   89.0,
   8.0,
   2.0,
   1.0
  ],
  "quotes": [
   "[HORSE] takes a slightly shorter stride on firm ground.",
   "The affected foot still appears sensitive during movement.",
   "[HORSE] is moving more comfortably than during the previous check.",
   "The hoof tenderness has returned after additional stress.",
   "The tenderness has resolved and normal movement has returned."
  ],
  "recoveryDescription": "Recovery: 2–21 days."
 },
 "lost-shoe": {
  "daily": [
   0.0,
   94.0,
   5.0,
   1.0
  ],
  "quotes": [
   "One of [HORSE]'s shoes is missing.",
   "The affected hoof is awaiting farrier attention.",
   "The farrier has examined the foot and completed the required service.",
   "The unprotected hoof has become more sensitive while waiting for care.",
   "The shoe has been replaced and no active lost-shoe problem remains."
  ],
  "recoveryDescription": "Recovery: Depends on farrier visit and any secondary hoof damage."
 },
 "abscess": {
  "daily": [
   84.0,
   10.0,
   4.0,
   2.0
  ],
  "quotes": [
   "[HORSE] appears acutely uncomfortable on one foot.",
   "The hoof remains painful, and the horse is reluctant to move normally.",
   "[HORSE] is placing weight more comfortably as the condition improves.",
   "The hoof concern has not responded as expected, and further examination is recommended.",
   "The abscess-related pain has resolved after appropriate treatment."
  ],
  "recoveryDescription": "Recovery: 5–45 days."
 },
 "bruise": {
  "daily": [
   88.0,
   9.0,
   2.0,
   1.0
  ],
  "quotes": [
   "[HORSE] shortens its stride while placing weight on the affected foot.",
   "The hoof remains sensitive during movement.",
   "The horse is beginning to move more evenly.",
   "Further pressure has aggravated the bruised area.",
   "The bruise has resolved and the horse appears comfortable."
  ],
  "recoveryDescription": "Recovery: 4–21 days."
 },
 "imbalance": {
  "daily": [
   80.0,
   17.0,
   2.0,
   1.0
  ],
  "quotes": [
   "[HORSE]'s hooves show noticeable uneven wear or excessive growth.",
   "The farrier has identified a balance issue requiring continued management.",
   "The hoof shape is improving through the scheduled care plan.",
   "The imbalance is worsening because the underlying maintenance problem remains.",
   "The hooves have reached a more suitable balance, with ongoing farrier care recommended."
  ],
  "recoveryDescription": "Recovery: Cause-specific"
 },
 "thrush": {
  "daily": [
   86.0,
   10.0,
   3.0,
   1.0
  ],
  "quotes": [
   "An abnormal area is visible around the frog of [HORSE]'s hoof.",
   "The affected hoof still requires targeted care.",
   "The affected tissue appears to be improving.",
   "The hoof condition has worsened in the unsuitable environment.",
   "The active thrush has resolved, although continued hoof management is important."
  ],
  "recoveryDescription": "Recovery: 7–30 days."
 },
 "soreness": {
  "daily": [
   92.0,
   6.0,
   1.5,
   0.5
  ],
  "quotes": [
   "[HORSE] feels unusually stiff during the early movement.",
   "The muscle soreness remains apparent during more demanding exercises.",
   "[HORSE] is loosening up and moving more comfortably.",
   "The soreness has increased following additional strenuous work.",
   "The muscle soreness has settled, and [HORSE] appears comfortable again."
  ],
  "recoveryDescription": "Recovery: 1–10 days."
 },
 "strain": {
  "daily": [
   85.0,
   11.0,
   3.0,
   1.0
  ],
  "quotes": [
   "[HORSE] takes a slightly shortened stride.",
   "The horse remains less comfortable when working in one direction.",
   "The movement irregularity is becoming less noticeable.",
   "The strain has been aggravated, and the recovery plan may need extending.",
   "The strain has improved sufficiently for the veterinarian to reassess normal workload."
  ],
  "recoveryDescription": "Recovery: 2–10 weeks."
 },
 "tendon": {
  "daily": [
   75.0,
   19.0,
   4.0,
   2.0
  ],
  "quotes": [
   "[HORSE] appears uneven in trot, with a possible localized tendon concern.",
   "The injured structure remains in a stage where overloading could cause further damage.",
   "The latest examination shows signs of recovery, but rehabilitation remains necessary.",
   "The tendon injury has suffered a setback, and the horse may require a longer rehabilitation period.",
   "The tendon has completed its current rehabilitation stage, with the long-term outcome determined by the latest veterinary findings."
  ],
  "recoveryDescription": "Recovery: 3–15 months."
 },
 "tendon-rupture": {
  "daily": [
   62.0,
   25.0,
   8.0,
   5.0
  ],
  "quotes": [
   "[HORSE] develops severe limb dysfunction following the injury.",
   "The specialist confirms that the affected structure requires extensive treatment.",
   "The limb is showing limited improvement, but recovery remains highly uncertain.",
   "The injured structure has deteriorated, and the prognosis has become more guarded.",
   "The treatment has reached an outcome: [SPECIALIST-CONFIRMED OUTCOME]."
  ],
  "recoveryDescription": "Recovery: 9–18+ months where treatable."
 },
 "suspensory": {
  "daily": [
   74.0,
   20.0,
   4.0,
   2.0
  ],
  "quotes": [
   "[HORSE] appears less even on the circle than on the straight.",
   "The movement concern persists during exercises that load the affected limb.",
   "The follow-up shows improved movement and a more favorable rehabilitation response.",
   "The affected ligament appears to have suffered another setback.",
   "The suspensory injury has reached its current recovery outcome, with [REMAINING LIMITATIONS]."
  ],
  "recoveryDescription": "Recovery: 3–15 months."
 },
 "synovitis": {
  "daily": [
   82.0,
   13.0,
   4.0,
   1.0
  ],
  "quotes": [
   "[HORSE] appears unusually stiff through the affected movement.",
   "The joint remains sensitive during more demanding work.",
   "The stiffness is becoming less noticeable during appropriate movement.",
   "The inflammation has flared again after the recent workload.",
   "The acute joint inflammation has settled, with any remaining management needs documented."
  ],
  "recoveryDescription": "Recovery: 1–20 weeks depending on severity."
 },
 "back": {
  "daily": [
   85.0,
   11.0,
   3.0,
   1.0
  ],
  "quotes": [
   "[HORSE] tenses when the saddle is placed.",
   "The horse remains uncomfortable during movement that engages the affected area.",
   "The back-related reaction is becoming less noticeable.",
   "The discomfort has returned after the original triggering problem was repeated.",
   "The horse's back comfort has improved, and the veterinarian has reviewed the return to ridden work."
  ],
  "recoveryDescription": "Recovery: 1–24 weeks depending on cause."
 },
 "djd": {
  "daily": [
   65.0,
   29.0,
   5.0,
   1.0
  ],
  "quotes": [
   "[HORSE] appears stiff during the first part of movement.",
   "The joint condition remains present and requires ongoing management.",
   "The horse's symptoms are becoming better controlled.",
   "The condition has entered another symptomatic flare.",
   "The horse is currently stable under its management plan, although the chronic diagnosis remains."
  ],
  "recoveryDescription": "Recovery: Chronic management; symptom stabilization usually 2–8 weeks."
 },
 "stable-fracture": {
  "daily": [
   72.0,
   21.0,
   5.0,
   2.0
  ],
  "quotes": [
   "[HORSE] becomes uncomfortable following an injury involving the affected limb.",
   "The fracture remains under veterinary management while stability and healing are monitored.",
   "The latest examination indicates progress toward bone healing.",
   "A complication has delayed the expected healing process.",
   "The fracture has reached its assessed outcome, and any remaining limitations have been recorded."
  ],
  "recoveryDescription": "Recovery: 2–9+ months."
 },
 "unstable-fracture": {
  "daily": [
   60.0,
   25.0,
   9.0,
   6.0
  ],
  "quotes": [
   "[HORSE] is unable to move normally after a severe injury.",
   "The specialist identifies a major fracture with a guarded prognosis.",
   "The horse remains under intensive management, with some signs of stabilization.",
   "The fracture has developed complications, and the outlook is worsening.",
   "The veterinarian confirms the final clinical outcome: [OUTCOME]."
  ],
  "recoveryDescription": "Recovery: 6–18+ months if treatment is feasible."
 },
 "respiratory": {
  "daily": [
   86.0,
   10.0,
   3.0,
   1.0
  ],
  "quotes": [
   "[HORSE] coughs and appears less energetic than usual.",
   "The respiratory signs remain noticeable during the stall check.",
   "The coughing and other signs are becoming less frequent.",
   "The respiratory symptoms have become more pronounced again.",
   "The acute infection has resolved, and a return-to-work assessment can be considered."
  ],
  "recoveryDescription": "Recovery: 7–28 days."
 },
 "influenza": {
  "daily": [
   78.0,
   16.0,
   4.0,
   2.0
  ],
  "quotes": [
   "[HORSE] develops a cough and appears unusually subdued.",
   "The respiratory infection remains active, and the horse requires continued care.",
   "The horse's energy and respiratory signs are gradually improving.",
   "The illness has developed a complication or prolonged clinical course.",
   "The horse has recovered from the acute influenza episode, subject to appropriate return-to-work review."
  ],
  "recoveryDescription": "Recovery: 2–10+ weeks depending on severity."
 },
 "ehv": {
  "daily": [
   77.0,
   17.0,
   4.0,
   2.0
  ],
  "quotes": [
   "[HORSE] develops respiratory signs following a relevant infectious exposure.",
   "The veterinarian continues monitoring the contagious respiratory condition.",
   "The horse's clinical signs are beginning to settle.",
   "The symptoms have worsened, requiring further veterinary assessment.",
   "The acute respiratory episode has resolved, although the medical and exposure history remain recorded."
  ],
  "recoveryDescription": "Recovery: 2–8+ weeks."
 },
 "strangles": {
  "daily": [
   72.0,
   20.0,
   5.0,
   3.0
  ],
  "quotes": [
   "[HORSE] develops concerning signs of an infectious illness.",
   "The horse remains under isolation and veterinary care.",
   "The affected areas and general condition appear to be improving.",
   "The illness has developed a complication requiring further assessment.",
   "The acute condition has resolved, with veterinary clearance and appropriate biosecurity follow-up."
  ],
  "recoveryDescription": "Recovery: 3–12+ weeks."
 },
 "asthma": {
  "daily": [
   69.0,
   24.0,
   5.0,
   2.0
  ],
  "quotes": [
   "[HORSE] coughs during work or in an irritating environment.",
   "The breathing concern remains active under the current conditions.",
   "Respiratory comfort is improving following management changes.",
   "The horse has developed another airway flare.",
   "The asthma is currently controlled, although the underlying condition remains."
  ],
  "recoveryDescription": "Recovery: Chronic management; stabilization 1–6 weeks."
 },
 "airway-irritation": {
  "daily": [
   93.0,
   5.0,
   1.5,
   0.5
  ],
  "quotes": [
   "[HORSE] coughs in the dusty environment.",
   "The airway irritation remains noticeable while the triggering conditions continue.",
   "The coughing has decreased since the environment was changed.",
   "The irritation has returned after renewed exposure.",
   "The airway irritation has resolved."
  ],
  "recoveryDescription": "Recovery: 1–14 days."
 },
 "digestive-upset": {
  "daily": [
   91.0,
   7.0,
   1.5,
   0.5
  ],
  "quotes": [
   "[HORSE] seems less interested in its normal feed.",
   "The horse's digestive behavior remains slightly different from usual.",
   "Appetite and comfort are returning to normal.",
   "The digestive upset has become more noticeable again.",
   "The digestive upset has resolved."
  ],
  "recoveryDescription": "Recovery: 1–7 days."
 },
 "colic": {
  "daily": [
   82.0,
   13.0,
   3.0,
   2.0
  ],
  "quotes": [
   "[HORSE] appears uncomfortable and repeatedly looks toward its flank.",
   "The veterinarian continues treating and monitoring the abdominal discomfort.",
   "The horse is showing fewer signs of pain and appears more settled.",
   "The abdominal discomfort has returned, prompting urgent reassessment.",
   "The colic episode has resolved, although continued monitoring is recommended."
  ],
  "recoveryDescription": "Recovery: 1–10 days."
 },
 "impaction": {
  "daily": [
   70.0,
   20.0,
   7.0,
   3.0
  ],
  "quotes": [
   "[HORSE] repeatedly changes position and shows clear abdominal discomfort.",
   "The condition requires continued veterinary monitoring.",
   "The horse is beginning to settle and digestive findings are improving.",
   "The abdominal problem has not responded as expected.",
   "The episode has reached [RESOLVED / SURGICAL REFERRAL / LONG-TERM MANAGEMENT] status."
  ],
  "recoveryDescription": "Recovery: 3–14+ days."
 },
 "surgical-colic": {
  "daily": [
   65.0,
   25.0,
   7.0,
   3.0
  ],
  "quotes": [
   "[HORSE] is experiencing a severe abdominal emergency.",
   "The horse remains under hospital care following emergency intervention.",
   "The surgical team reports improving clinical stability.",
   "A serious complication has affected the recovery.",
   "The surgical episode has reached [SURVIVAL WITH RECOVERY / RESIDUAL MANAGEMENT / TERMINAL OUTCOME]."
  ],
  "recoveryDescription": "Recovery: Hospital days to weeks followed by months of rehabilitation if successful."
 },
 "critical-colic": {
  "daily": [
   55.0,
   28.0,
   10.0,
   7.0
  ],
  "quotes": [
   "[HORSE] shows severe abdominal distress and cannot settle comfortably.",
   "The veterinary team identifies a critical gastrointestinal problem.",
   "The horse's condition is stabilizing following intensive care.",
   "The condition has deteriorated despite ongoing emergency treatment.",
   "The veterinarian confirms the episode's final outcome: [OUTCOME]."
  ],
  "recoveryDescription": "Recovery: Potentially months if successfully treated."
 },
 "ulcers": {
  "daily": [
   83.0,
   12.0,
   4.0,
   1.0
  ],
  "quotes": [
   "[HORSE] seems less comfortable during feeding or some exercises.",
   "The gastrointestinal condition remains under treatment.",
   "The horse's appetite and behavior are improving.",
   "The symptoms have returned or become more pronounced.",
   "The current ulcer episode has improved or resolved, with future management recorded."
  ],
  "recoveryDescription": "Recovery: 3–12 weeks, variable by subtype."
 },
 "parasites": {
  "daily": [
   85.0,
   11.0,
   3.0,
   1.0
  ],
  "quotes": [
   "[HORSE] shows changes in condition or digestive comfort.",
   "The parasite-related problem remains under veterinary management.",
   "The horse's general condition is beginning to improve.",
   "The horse is not responding as expected, and further investigation is needed.",
   "The active parasite-related condition has resolved, with future control measures recorded."
  ],
  "recoveryDescription": "Recovery: 1–12 weeks."
 },
 "digestive-illness": {
  "daily": [
   73.0,
   19.0,
   6.0,
   2.0
  ],
  "quotes": [
   "[HORSE] shows a persistent change in appetite, comfort or digestive function.",
   "The veterinarian continues investigating and treating the digestive condition.",
   "The horse's clinical signs are gradually improving.",
   "The digestive illness has worsened or developed an unexpected complication.",
   "The condition has reached [RESOLVED / CHRONIC MANAGEMENT] status."
  ],
  "recoveryDescription": "Recovery: 2 weeks–4+ months depending on actual diagnosis."
 },
 "dental": {
  "daily": [
   94.0,
   5.0,
   0.8,
   0.2
  ],
  "quotes": [
   "[HORSE] appears uncomfortable while eating or responding to contact.",
   "The dental concern remains until appropriate treatment is performed.",
   "The horse appears more comfortable after the dental procedure.",
   "The oral discomfort persists and may require further examination.",
   "The dental concern has resolved, with future maintenance recorded."
  ],
  "recoveryDescription": "Recovery: Usually 1–14 days after appropriate treatment for uncomplicated cases.",
  "beforeTreatment": [
   5.0,
   90.0,
   4.0,
   1.0
  ]
 },
 "eye": {
  "daily": [
   89.0,
   8.0,
   2.0,
   1.0
  ],
  "quotes": [
   "[HORSE] blinks more frequently than usual.",
   "The affected eye remains mildly irritated.",
   "The eye appears more comfortable during treatment.",
   "The irritation has become worse, and another examination is appropriate.",
   "The eye irritation has resolved."
  ],
  "recoveryDescription": "Recovery: 2–10 days."
 },
 "cornea": {
  "daily": [
   77.0,
   16.0,
   5.0,
   2.0
  ],
  "quotes": [
   "[HORSE] keeps the affected eye partially closed.",
   "The corneal injury remains under veterinary treatment.",
   "The veterinarian observes improvement in the affected eye.",
   "The injury has developed changes requiring urgent reassessment.",
   "The eye injury has reached its recovery outcome, with [REMAINING EFFECTS]."
  ],
  "recoveryDescription": "Recovery: 1–12+ weeks depending on severity."
 },
 "ear": {
  "daily": [
   88.0,
   9.0,
   2.0,
   1.0
  ],
  "quotes": [
   "[HORSE] reacts more than usual when one ear is approached.",
   "The ear irritation remains noticeable during handling.",
   "The horse is becoming more comfortable with the affected area.",
   "The irritation has returned or become more pronounced.",
   "The ear condition has resolved."
  ],
  "recoveryDescription": "Recovery: 3–28 days."
 },
 "oral": {
  "daily": [
   82.0,
   13.0,
   4.0,
   1.0
  ],
  "quotes": [
   "[HORSE] shows an unusual reaction involving its mouth or feeding.",
   "The oral condition remains under veterinary care.",
   "The horse's eating and handling comfort are improving.",
   "The oral discomfort has worsened despite the initial management.",
   "The condition has resolved or transitioned to the appropriate management plan."
  ],
  "recoveryDescription": "Recovery: 1–8 weeks depending on specific diagnosis."
 },
 "dehydration": {
  "daily": [
   92.0,
   6.0,
   1.5,
   0.5
  ],
  "quotes": [
   "[HORSE] appears subdued and its hydration requires assessment.",
   "The hydration concern remains under monitoring.",
   "The horse's hydration status is improving.",
   "The hydration problem has worsened and requires reassessment.",
   "The horse's hydration status has returned to an appropriate level."
  ],
  "recoveryDescription": "Recovery: 1–5 days."
 },
 "heat": {
  "daily": [
   79.0,
   15.0,
   4.0,
   2.0
  ],
  "quotes": [
   "[HORSE] becomes unusually distressed or fatigued in the hot conditions.",
   "The heat-related condition remains under treatment.",
   "The horse's comfort and clinical state are improving.",
   "The horse has developed a setback during recovery.",
   "The heat-related episode has resolved, with future workload precautions recorded."
  ],
  "recoveryDescription": "Recovery: 1 day–8 weeks depending on severity."
 },
 "fatigue": {
  "daily": [
   92.0,
   6.0,
   1.5,
   0.5
  ],
  "quotes": [
   "[HORSE] appears unusually fatigued after the session.",
   "The horse has not yet returned to its normal energy level.",
   "The horse is recovering appropriately from the excessive workload.",
   "Additional demanding exercise has prolonged the fatigue.",
   "The horse's energy and ordinary movement have returned to normal."
  ],
  "recoveryDescription": "Recovery: 1–10 days."
 },
 "fever": {
  "daily": [
   0.0,
   85.0,
   10.0,
   5.0
  ],
  "quotes": [
   "[HORSE] appears unusually quiet and unwell.",
   "The veterinarian confirms an elevated temperature, but the cause remains uncertain.",
   "Additional findings are helping narrow the possible cause.",
   "The horse's condition has worsened, making further investigation important.",
   "The underlying cause has been identified and an appropriate treatment plan established."
  ],
  "recoveryDescription": "Recovery: Determined by underlying cause, not an independent 10-day timer."
 },
 "weight-loss": {
  "daily": [
   82.0,
   14.0,
   3.0,
   1.0
  ],
  "quotes": [
   "[HORSE] has visibly lost body condition since the previous assessment.",
   "The weight loss remains under investigation.",
   "The horse is gradually regaining appropriate condition.",
   "The horse continues to lose condition despite the current management.",
   "The weight concern has stabilized, with the underlying condition appropriately managed."
  ],
  "recoveryDescription": "Recovery: Typically weeks–months after underlying cause addressed.",
  "beforeTreatment": [
   10.0,
   82.0,
   6.0,
   2.0
  ]
 }
};
root.MedicalRecovery={definitions};if(typeof module!=="undefined")module.exports=root.MedicalRecovery;
})(globalThis);
