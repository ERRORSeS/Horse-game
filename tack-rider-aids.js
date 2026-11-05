/* Derived views of existing tack. No catalog entries, ownership or medical diagnoses are created. */
const TA_BITS={'Loose Ring Snaffle':'Snaffle','Eggbutt Snaffle':'Snaffle','D-Ring Bit':'Snaffle','Full Cheek Snaffle':'Snaffle','French Link Snaffle':'Mouthpiece variation','Straight Bar Bit':'Mouthpiece variation','Pelham Bit':'Multiple rein/attachment configuration','Gag Bit':'Gag configuration; subtype unspecified','Weymouth & Bradoon Set':'Double-bridle components'};
const TA_BRIDLES={'Neck Rope':'Neck rope; not a bridle','Hackamore':'Bitless nose-pressure equipment','Snaffle Bridle':'Snaffle-compatible configuration','Plain Cavesson Bridle':'Standard snaffle-compatible configuration','Flash Bridle':'Noseband variation','Drop Noseband Bridle':'Noseband variation','Figure-8 Bridle':'Noseband variation','Double Bridle':'Bradoon and curb configuration','Anatomical Bridle':'Anatomically shaped design'};
function taAudit(){return MG_CATALOG.filter(t=>['Bits','Bridles','Saddles','Smooth Spurs','Riding Crops'].includes(t.category)).map(t=>({id:t.id,slot:t.slot,price:t.price,category:t.category,classification:TA_BITS[t.id]||TA_BRIDLES[t.id]||t.category}));}
function taStability(v){return v<20?12:v<40?8:v<60?4:v<80?0:v<90?-3:-5;}
function taSensitivity(v){return v<3?-2:v<5?-1:v<7?0:v<9?1:2;}
function taSuitabilityBand(v){return v>=90?{label:'Excellent match',modifier:-4}:v>=75?{label:'Good match',modifier:-2}:v>=55?{label:'Acceptable',modifier:0}:v>=35?{label:'Questionable',modifier:4}:{label:'Poor match',modifier:8};}
function taConfidence(v,low,penalty){if(v<low)return penalty;if(v>80)return -3;return v<60?penalty*(60-v)/(60-low):v>70?-3*(v-70)/10:0;}
function taLearned(h,context){const b=rrHorse(h).learned;const table={jumping:[['Jump Confidence',40,5]],flatwork:[['Flatwork Confidence',40,5]],aid:[['Rider Trust in Aids',40,6]],collection:[['Collection Confidence',40,6]],handling:[['Handling Confidence',40,5]],arena:[['Arena Confidence',40,5]]};if(table[context])return table[context].reduce((n,[key,low,penalty])=>n+taConfidence(b[key],low,penalty),0);if(context==='avoidance')return Math.max(0,Math.min(5,(b['Learned Fence Avoidance']-10)/40*5));if(context==='novelty')return Math.max(0,Math.min(5,(b['Learned Spook Sensitivity']-15)/45*5));if(context==='anticipation')return Math.max(0,Math.min(5,(b['Training Anticipation']-50)/25*5));return 0;}
function taEquipment(h,s={}){const setup=eqSetup(h),warnings=[],hand=rrSettings().abilities['Hand Stability'],components=[];const combination=eqCombination(setup);if(combination)warnings.push(combination);for(const slot of ['bridle','bit','saddle','crop','spurs']){const type=mgType(setup[slot]);if(!type){if(setup[slot]&&!['None','No Bit'].includes(setup[slot]))warnings.push('Unsupported '+slot+': '+setup[slot]);continue;}if(type.slot!==slot){warnings.push('Incorrect component type in '+slot);continue;}const owned=(typeof csActiveSeller==='function'?csActiveSeller(h)?.sellerTackItems?.find(item=>item.slot===slot&&item.sellerOwned):null)||mgOwned(h.equipmentRefs?.[slot]);if(app.settings.tackOwnership&&(!owned||owned.assignedHorseId!==h.id||owned.assignedSlot!==slot||owned.type!==type.id)){warnings.push('Missing or unassigned owned '+slot);continue;}let fit=65;if(owned){const size=mgSizeEffects(owned,h);fit=size.ok?clamp(85+(size.comfort||0),0,100):20;if(!size.ok)warnings.push(size.message);}if(slot==='saddle'&&app.settings.saddleFitting){const f=saddleFit(h);fit=({Excellent:100,Good:85,Acceptable:65,Poor:40,'Very Poor':20})[f.grade]??50;}const preference=h.tackPreferences?.[type.id],comfort=typeof preference==='number'?clamp(preference,0,100):typeof preference?.comfort==='number'?clamp(preference.comfort,0,100):65;const condition=owned?clamp(Number(owned.condition)||0,0,100):65;if(condition<=0)warnings.push(type.id+' is unusable');const demand=type.riderCoordinationRequirement||(slot==='bridle'&&setup.bridle==='Double Bridle'&&setup.bit==='Weymouth & Bradoon Set'?'Advanced':'Basic');components.push({id:type.id,equipmentCategory:TA_BITS[type.id]||TA_BRIDLES[type.id]||type.category,compatibilityRequirements:slot==='bridle'&&type.id==='Double Bridle'?['Weymouth & Bradoon Set']:[],horseFitScore:fit,horsePreferenceScore:comfort,riderCoordinationRequirement:demand,conditionScore:condition,competitionEligibility:!s.liveShowId||equipmentAllowed(type.id,s.discipline,s.level,s.steps?.[s.stepIndex]?.phase),riderCompatibilityScore:slot==='spurs'?rrSettings().abilities['Leg Stability']:slot==='saddle'?(rrSettings().abilities['Seat Stability']+rrSettings().abilities.Balance)/2:hand,score:fit*.4+comfort*.25+(slot==='spurs'?rrSettings().abilities['Leg Stability']:slot==='saddle'?(rrSettings().abilities['Seat Stability']+rrSettings().abilities.Balance)/2:hand)*.2+condition*.15});}
const score=components.length?components.reduce((n,c)=>n+c.score,0)/components.length:65,coordination=components.some(c=>c.riderCoordinationRequirement==='Advanced')?'Advanced':components.some(c=>c.riderCoordinationRequirement==='Intermediate')?'Intermediate':'Basic';if(s.liveShowId){const validation=validateCompetitionEquipment(h,s.discipline,s.level);warnings.push(...validation.messages);}return {score,...taSuitabilityBand(score),components,warnings:[...new Set(warnings)],coordination,coordinationModifier:hand<40?(coordination==='Advanced'?4:coordination==='Intermediate'?2:0):0};}
function taEquippedAid(h,kind,s={}){const item=mgOwned(h.equipmentRefs?.[kind]);if(!item||mgType(item.type)?.slot!==kind||item.assignedHorseId!==h.id||item.assignedSlot!==kind||item.condition<=0)return false;if(s.liveShowId){const phase=String(s.steps?.[s.stepIndex]?.phase||s.discipline);return equipmentAllowed(item.type,s.discipline,s.level,phase);}return true;}
function taContext(e,s){const mounted=e.category!=='Groundwork'&&!e.id.startsWith('lunge-');return {mounted,contact:mounted&&(e.category==='Flatwork'||e.category==='Dressage'||e.category==='Jumping'||/transition|circle|collect|halt|rein/.test(e.id)),leg:mounted&&(e.category==='Jumping'||/canter|lateral|leg-yield|shoulder|collect|transition/.test(e.id)),collection:/collect|shoulder|half-pass|piaffe|passage/.test(e.id)};}
function taChance(base,stability,suitability,coordination=0,learned=0){return clamp(base+taStability(stability)+taSuitabilityBand(suitability).modifier+coordination+learned,0,100);}
function taCommunication(h,s,e){const context=taContext(e,s),gear=taEquipment(h,s),a=rrSettings().abilities,kind=context.contact&&(!context.leg||a['Hand Stability']<=a['Leg Stability'])?'contact':'leg';return {context,gear,kind,modifier:context.contact&&kind==='contact'?taStability(a['Hand Stability'])+gear.modifier+gear.coordinationModifier+taLearned(h,'aid')+(context.collection?taLearned(h,'collection'):0):context.leg?taStability(a['Leg Stability'])+gear.modifier+taLearned(h,'aid'):0};}
function taResolve(h,s,e,result){if(!rrEnabled()||!result||result.blocked||result.resultIndex<3)return null;const info=taCommunication(h,s,e);if(!info.context.mounted||!info.context.contact&&!info.context.leg)return null;s.taEvents ||= {};const key=rrSessionId(s)+'|'+(s.attempts??s.stepIndex??0);if(s.taEvents[key])return s.taEvents[key];const seed=HorseHealth.hash(h.id+'|'+key),severity=result.resultIndex===3?'Minor':result.resultIndex===4?'Moderate':'Significant',ranges=info.kind==='contact'?{Minor:[[1,3],[1,2],0],Moderate:[[3,6],[2,4],1],Significant:[[6,9],[3,6],2]}:{Minor:[[1,2],[1,1],0],Moderate:[[2,5],[1,3],1],Significant:[[5,8],[2,5],2]},[t,f,loss]=ranges[severity],roll=(range,k)=>range[0]+Math.floor(HorseHealth.roll(seed,k)*(range[1]-range[0]+1)),spurs=taEquippedAid(h,'spurs',s),tension=clamp(roll(t,'tension')+taSensitivity(t2attribute(h,'Sensitivity to Aids'))+(spurs&&info.kind==='leg'&&severity!=='Minor'?1:0),0,12),focus=roll(f,'focus');s.tension=clamp((s.tension||0)+tension,0,100);s.temporary ||= {};s.temporary.Focus=clamp((s.temporary.Focus||0)-focus/10,-5,5);const b=rrHorse(h);s.taLoss ||= {trust:0,collection:0};const persistentLoss=loss===2?2+Math.floor(HorseHealth.roll(seed,'persistent-loss')*2):loss,trust=typeof tbRecord==='function'?0:Math.min(persistentLoss,4-s.taLoss.trust),collection=typeof tbRecord==='function'?0:info.kind==='contact'&&info.context.collection?Math.min(persistentLoss,4-s.taLoss.collection):0;s.taLoss.trust+=trust;s.taLoss.collection+=collection;b.learned['Rider Trust in Aids']=Math.max(0,b.learned['Rider Trust in Aids']-trust);b.learned['Collection Confidence']=Math.max(0,b.learned['Collection Confidence']-collection);const event={key,day:rrDay(s),kind:info.kind,severity,tension,focus,trust,collection,context:rrContextKey(s),observation:info.kind==='contact'?'The contact becomes inconsistent as the rider enters the corner.':"The rider's lower leg shifts unexpectedly during the exercise.",consequence:'Communication error resolved once; technical skills unchanged.'};s.taEvents[key]=event;if(typeof tbRecord!=='function'){b.history.push(event);b.history=b.history.slice(-50);}s.log ||= [];return event;}
const TA_PROBABILITY=t2probability;t2probability=function(h,event,base,c={},primary,secondary,s){const out=TA_PROBABILITY(h,event,base,c,primary,secondary,s);if(!rrEnabled()||!s)return out;const e=t2exercise(s.exerciseId);if(!e)return out;const info=taCommunication(h,s,e);let modifier=event==='technical'?info.modifier:event==='hesitation'?(info.context.mounted?taLearned(h,info.context.collection?'collection':e.category==='Jumping'?'jumping':'flatwork'):taLearned(h,'handling')):event==='resistance'&&info.context.mounted?taLearned(h,'aid')+ (e.category==='Jumping'?taLearned(h,'avoidance'):0):event==='spook'&&(c.newFence||c.newArena||c.wind||c.traffic)?taLearned(h,'novelty'):event==='distraction'&&c.newArena?taLearned(h,'arena'):event==='anticipation'?taLearned(h,'anticipation'):0;return {...out,chance:clamp(out.chance+modifier,0,100),communicationModifier:modifier};};
const TA_ATTEMPT=t2attempt;t2attempt=function(h,s){if(!rrEnabled())return TA_ATTEMPT(h,s);const e=t2exercise(s.exerciseId),priorRider=rrHorse(h).lastRider,aid=s.riderAid,kind=aid==='Crop'?'crop':aid==='Spurs'?'spurs':null;if(kind&&!taEquippedAid(h,kind,s))return {blocked:true,message:'Equip an owned, suitable '+kind+' before selecting this action.'};const gear=taEquipment(h,s);if(gear.warnings.length&&taContext(e,s).mounted)return {blocked:true,message:gear.warnings.join(' ')};/* Ordinary aid presence carries no automatic bonus or punishment. */const behavioral=rrHorse(h),priorTrust=behavioral.learned['Rider Trust in Aids'],priorCollection=behavioral.learned['Collection Confidence'],priorHistory=[...behavioral.history];let result;try{s.riderAid='None';result=TA_ATTEMPT(h,s);}finally{s.riderAid=aid;}if(typeof tbRecord!=='function'&&result&&!result.blocked&&result.resultIndex>=3&&taContext(e,s).mounted&&(taContext(e,s).contact||taContext(e,s).leg)){behavioral.learned['Rider Trust in Aids']=priorTrust;behavioral.learned['Collection Confidence']=priorCollection;behavioral.history=[...priorHistory,...behavioral.history.filter(row=>!priorHistory.includes(row)&&behavioral.important.some(important=>important.key&&important.key===row.key))].slice(-50);}taResolve(h,s,e,result);if(result&&!result.blocked&&result.resultIndex<=1&&taContext(e,s).mounted){s.taPriorRider=priorRider;taNarratives(h,s,{kind:taCommunication(h,s,e).kind},true);}return result;};
const TA_RR_AID=rrAidAvailable;rrAidAvailable=function(h,s,aid){return rrEnabled()?taEquippedAid(h,aid==='Crop'?'crop':'spurs',s):TA_RR_AID(h,s,aid);};
const TA_CARD=createHorseCard;createHorseCard=function(h,...args){const node=TA_CARD(h,...args),details=document.createElement('details');details.innerHTML='<summary>Equipment Suitability</summary>';details.ontoggle=()=>{if(!details.open)return;const gear=taEquipment(h);details.innerHTML='<summary>Equipment Suitability</summary><p>'+gear.score.toFixed(1)+'/100 — '+gear.label+'</p><p>Fit 40% · horse preference 25% · rider compatibility 20% · condition 15%. Unmodeled data is neutral.</p>'+gear.components.map(c=>'<p>'+csEscape(c.id)+': fit '+c.horseFitScore+', preference '+c.horsePreferenceScore+', condition '+c.conditionScore+' · '+c.riderCoordinationRequirement+' coordination</p>').join('')+gear.warnings.map(w=>'<p>'+csEscape(w)+'</p>').join('');details.ontoggle=null;};node.appendChild(details);return node;};
const TA_OLD_MODIFIER=rrModifier;rrModifier=function(h,d,level){if(!rrEnabled())return 0;const r=rrSettings(),keys=['Seat Stability','Timing','Balance','Aid Consistency','Judgment'],mean=keys.reduce((n,k)=>n+r.abilities[k],0)/keys.length;return clamp((60-mean)*.12+rrOverLevel(d,level)*.15,-5,12);};
const TA_CHANCES=competitionOptionFinalChances;competitionOptionFinalChances=function(s,h,step,options){const rows=TA_CHANCES(s,h,step,options);if(!rrEnabled()||step?.stage!=='main_round')return rows;const dress=s.discipline==='dressage'||String(step.phase).includes('dressage'),e={id:dress?'collected-movement':'jump-approach',category:dress?'Dressage':'Jumping'},info=taCommunication(h,s,e);return rows.map(row=>{const success=clamp(row.successChance-info.modifier,0,100-row.computed.neutralChance);return {...row,successChance:success,computed:{...row.computed,failChance:100-success-row.computed.neutralChance},communicationModifier:info.modifier};});};
const TA_CHOICE=resolveCompetitionRpgChoice;resolveCompetitionRpgChoice=function(s,h,index){const b=rrHorse(h),priorTrust=b.learned['Rider Trust in Aids'],priorCollection=b.learned['Collection Confidence'],priorHistory=[...b.history],before=s.outcomes?.length||0,step=s.steps?.[s.stepIndex],out=TA_CHOICE(s,h,index);if(rrEnabled()&&step?.stage==='main_round'&&(s.outcomes?.length||0)>before){const text=s.outcomes.at(-1)?.outcome||'',dress=s.discipline==='dressage'||String(step.phase).includes('dressage');if(typeof tbRecord!=='function'&&!/Clear|Accurate/.test(text)){b.learned['Rider Trust in Aids']=priorTrust;b.learned['Collection Confidence']=priorCollection;b.history=[...priorHistory,...b.history.filter(row=>!priorHistory.includes(row)&&b.important.some(important=>important.key&&important.key===row.key))].slice(-50);}taResolve(h,s,{id:dress?'collected-movement':'jump-approach',category:dress?'Dressage':'Jumping'},{resultIndex:/Clear|Accurate/.test(text)?0:/Refusal|Run.?out/.test(text)?5:3});}return out;};

const TA_NARRATIVES=[
  {
    "id": "H1",
    "text": "The contact becomes inconsistent as the rider enters the corner.",
    "effect": "Contact error; Focus -2."
  },
  {
    "id": "H2",
    "text": "[HORSE] raises its head during the transition.",
    "effect": "Moderate contact error; Tension +3 to +6."
  },
  {
    "id": "H3",
    "text": "The horse struggles to understand the changing rein contact.",
    "effect": "Aid uncertainty; Rider Trust -1 if meaningful."
  },
  {
    "id": "H4",
    "text": "The current bit and bridle combination appears uncomfortable for [HORSE].",
    "effect": "Equipment suitability warning only when actual data supports it."
  },
  {
    "id": "H5",
    "text": "The horse loses rhythm during the collected movement.",
    "effect": "Movement execution penalty."
  },
  {
    "id": "H6",
    "text": "The rider's hands become steadier, allowing the contact to improve.",
    "effect": "Only if player choice or actual successful skill check."
  },
  {
    "id": "H7",
    "text": "[HORSE] responds more confidently to consistent communication.",
    "effect": "Contextual positive event; Rider Trust +1."
  },
  {
    "id": "H8",
    "text": "The same contact issue has appeared in several sessions.",
    "effect": "Retrieve existing history."
  },
  {
    "id": "H9",
    "text": "The trainer recommends a professional tack-fit review.",
    "effect": "Assessment flag."
  },
  {
    "id": "H10",
    "text": "The horse remains uncertain despite the change of exercise.",
    "effect": "No automatic recovery."
  },
  {
    "id": "H11",
    "text": "The bridle fits correctly, but the rider's contact remains inconsistent.",
    "effect": "Separate fit from rider technique."
  },
  {
    "id": "H12",
    "text": "The horse appears more comfortable with its current equipment setup.",
    "effect": "Positive suitability observation."
  },
  {
    "id": "H13",
    "text": "A physical examination is recommended because discomfort remains possible.",
    "effect": "Medical follow-up."
  },
  {
    "id": "H14",
    "text": "The contact-related difficulty is recorded in the training journal.",
    "effect": "Persist event."
  },
  {
    "id": "H15",
    "text": "The horse's existing technical Collection skill is unchanged.",
    "effect": "Do not alter genetic/technical ability."
  },
  {
    "id": "L1",
    "text": "The rider's lower leg shifts unexpectedly during the exercise.",
    "effect": "Leg Stability error."
  },
  {
    "id": "L2",
    "text": "[HORSE] reacts to a confusing leg request.",
    "effect": "Aid conflict; Tension +1 to +3."
  },
  {
    "id": "L3",
    "text": "The horse becomes more tense as the communication loses consistency.",
    "effect": "Moderate aid conflict."
  },
  {
    "id": "L4",
    "text": "The rider's position improves before the next movement.",
    "effect": "Successful rider recovery, only if selected or rolled."
  },
  {
    "id": "L5",
    "text": "[HORSE] maintains its rhythm despite the rider's mistake.",
    "effect": "No lasting negative event."
  },
  {
    "id": "L6",
    "text": "The fitted spurs make the rider's inconsistent leg contact more consequential.",
    "effect": "Relevant equipment interaction."
  },
  {
    "id": "L7",
    "text": "The horse appears uncertain about the next cue.",
    "effect": "Rider Trust in Aids -1 when warranted."
  },
  {
    "id": "L8",
    "text": "A possible equipment-related irritation is noticed during the examination.",
    "effect": "Actual medical observation."
  },
  {
    "id": "L9",
    "text": "The veterinarian recommends avoiding the irritating equipment until the concern is assessed.",
    "effect": "Medical management flag."
  },
  {
    "id": "L10",
    "text": "[HORSE] becomes defensive during the repeated conflicting requests.",
    "effect": "Welfare concern; session risk."
  },
  {
    "id": "L11",
    "text": "The exercise is interrupted because the horse is no longer responding consistently.",
    "effect": "Incomplete objective."
  },
  {
    "id": "L12",
    "text": "A stable employee raises concerns about the rider's handling.",
    "effect": "Storyline event if enabled."
  },
  {
    "id": "L13",
    "text": "The horse responds more consistently under a rider with steadier lower-leg control.",
    "effect": "Rider-specific comparison."
  },
  {
    "id": "L14",
    "text": "The equipment concern is added to the horse's management records.",
    "effect": "Persist finding."
  },
  {
    "id": "L15",
    "text": "The horse's response improves during subsequent suitable sessions.",
    "effect": "Gradual recovery."
  }
];
function taNarratives(h,s,event,positive=false){const gear=taEquipment(h,s),skin=HorseHealth.current(csEnsure(h)).some(c=>c.confirmed&&HorseHealth.definition(c).category==='skin'),history=rrHorse(h).history;let ids=event?.kind==='leg'?['L1','L2','L3','L7','L11','L14']:['H1','H2','H3','H5','H10','H14','H15'];if(positive)ids=event?.kind==='leg'?['L4','L5','L13','L15']:['H6','H7','H12'];if(gear.score<55)ids.push('H4','H9','H13');if(event?.kind==='contact'&&gear.components.some(c=>c.id.includes('Bridle')&&c.horseFitScore>=75))ids.push('H11');if(event?.kind==='leg'&&taEquippedAid(h,'spurs',s))ids.push('L6');if(skin)ids.push('L8','L9');if(history.filter(e=>e.kind==='contact').length>=2)ids.push('H8');if(rrSettings().difficultStories&&s.rrTrainerConcern)ids.push('L10','L12');ids=ids.filter(id=>id!=='H1'||event?.focus===2).filter(id=>!['H2','L3'].includes(id)||event?.severity==='Moderate').filter(id=>!['H3','L7'].includes(id)||event?.trust===1).filter(id=>id!=='H5'||/collect/.test(s.exerciseId||'')).filter(id=>id!=='L2'||event?.severity==='Minor').filter(id=>id!=='L13'||s.taPriorRider&&s.taPriorRider!==rrSettings().riderId).filter(id=>id!=='L15'||history.length>2);if(!ids.length)return;const row=TA_NARRATIVES.find(r=>r.id===ids[Math.floor(HorseHealth.roll(HorseHealth.hash(rrSessionId(s)+'|'+(s.attempts??s.stepIndex)),'aid-narrative')*ids.length)]);if(!row)return;const text=row.text.replaceAll('[HORSE]',h.name);if(event){event.observation=text;event.narrativeId=row.id;}s.log ||= [];s.log.push({kind:'Equipment observation',text,elapsed:s.elapsed});if(gear.score<55)rrHorse(h).assessmentRecommended={day:rrDay(s),context:'Equipment suitability review'};}
const TA_RESOLVE_ONCE=taResolve;taResolve=function(h,s,e,result){const key=rrSessionId(s)+'|'+(s.attempts??s.stepIndex??0),prior=s.taEvents?.[key],event=TA_RESOLVE_ONCE(h,s,e,result);if(event&&!prior)taNarratives(h,s,event);return event;};
// Extend only existing auxiliary aid IDs; all established bit/bridle/saddle rules retain their original result.
const TA_EQUIPMENT_ALLOWED=equipmentAllowed;equipmentAllowed=function(name,d,level,phase=null){const type=mgType(name);if(!['crop','spurs'].includes(type?.slot))return TA_EQUIPMENT_ALLOWED(name,d,level,phase);const rules=app.activeShow?.eventSnapshot?.rules||calendarRegistrationContext?.event?.rules||{},dress=d==='dressage'||d==='eventing'&&String(phase).includes('dressage');const allow=rules.equipment?.[type.slot==='crop'?'allowCrop':'allowSpurs']??rules[type.slot==='crop'?'allowCrop':'allowSpurs'];if(allow===false)return false;if(type.slot==='spurs')return true;if(type.id==='Dressage Whip')return dress&&allow===true;if(type.id==='Jumping Bat'&&dress)return false;return allow===true||!dress;};

// Keep the existing selector and handlers, populated from actual assigned inventory.
const TA_EDITOR=t2editorMarkup;t2editorMarkup=function(){const markup=TA_EDITOR();if(!rrEnabled())return markup;const s=t2state().session,h=s&&t2findHorse(s.horseId);if(!h)return markup;const options=['None',...(taEquippedAid(h,'crop',s)?['Crop']:[]),...(taEquippedAid(h,'spurs',s)?['Spurs']:[])];return markup.replace(/(<select id='t2-rider-aid'>)[\s\S]*?(<\/select>)/,'$1'+t2options(options,s.riderAid||'None')+'$2');};
