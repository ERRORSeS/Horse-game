/* Revised expansion phase 2: original discipline skills stay distinct from riding attributes. */
const DISCIPLINE_PROGRESS=Object.freeze({base:[.08,.18,.35,.48,0],quality:[1,.8,.5,.2,0,0,0,0],repetition:[1,.9,.75,.6,.4,.25],focus:{primary:1.25,secondary:1.10},secondaryShare:.4,primarySessionCap:1.8,secondarySessionCap:.8});
const ORIGINAL_JUMP_MAPPING={crossrail:['Confidence','Balance'],vertical:['Balance','Power'],oxer:['Power','Balance'],gymnastic:['Balance','Power'],bounce:['Balance','Striding'],'one-stride':['Striding','Balance'],'two-stride':['Striding','Structure'],related:['Striding','Structure'],bending:['Structure','Striding'],'stride-poles':['Striding','Speed'],'jump-adjustable-strides':['Striding','Speed'],filler:['Confidence','Structure'],water:['Confidence','Balance'],'jump-rhythm':['Speed','Striding'],course:['Structure','Balance'],'technical-course':['Structure','Striding'],'progressive-height':['Power','Confidence'],'controlled-approach':['Speed','Structure']};
const ORIGINAL_DRESS_MAPPING={'walk-halt':['Connection','Rhythm'],'walk-trot':['Gaits','Connection'],'trot-canter':['Gaits','Balance'],downward:['Connection','Collection'],'large-circle':['Balance','Rhythm'],'small-circle':['Balance','Collection'],serpentines:['Flowiness','Balance'],'change-rein':['Flowiness','Connection'],straightness:['Balance','Connection'],lengthen:['Gaits','Rhythm'],shorten:['Collection','Rhythm'],'rein-back':['Connection','Collection'],'leg-yield':['Flowiness','Balance'],'shoulder-in':['Collection','Balance'],collected:['Collection','Connection'],'test-practice':['Flowiness','Rhythm'],'rhythm-exercises':['Rhythm','Gaits'],'contact-exercises':['Connection','Collection']};
for(const [id,name,source]of [['progressive-height','Progressive Suitable Height Schooling','vertical'],['controlled-approach','Controlled Approach','crossrail'],['rhythm-exercises','Rhythm Exercises','consistent-rhythm'],['contact-exercises','Contact Exercises','shorten']])if(!t2exercise(id)){const e=t2exercise(source);T2_EXERCISES.push({...e,id,name,canonicalSource:source,prerequisites:{...e.prerequisites},locations:[...e.locations],adjustments:[...e.adjustments]});T2X_MAPPING[id]=[...(T2X_MAPPING[source]||[e.primary,.05,e.secondary,.02])];}
function originalSkillMapping(e,s){let id=e.canonicalSource||e.id;if(ORIGINAL_JUMP_MAPPING[e.id]||ORIGINAL_DRESS_MAPPING[e.id])id=e.id;const jump=e.category==='Jumping'||e.category==='Polework',group=jump?'jumping':'dressage';let pair=jump?ORIGINAL_JUMP_MAPPING[id]:ORIGINAL_DRESS_MAPPING[id];
 if(['rhythm-exercises','consistent-rhythm','controlled-rhythm'].includes(e.id))pair=['Rhythm','Gaits'];if(['contact-exercises','precision-transitions','smooth-transitions'].includes(e.id))pair=['Connection','Collection'];if(e.id==='lateral')pair=['Flowiness','Balance'];if(e.id==='eventing-dressage')pair=['Connection','Rhythm'];if(e.id==='jump-straightness')pair=['Structure','Balance'];if(e.id==='hunter-rhythm')pair=['Speed','Striding'];if(e.id==='hunter-lines')pair=['Striding','Structure'];if(e.id==='hunter-course')pair=['Structure','Balance'];if(e.id==='xc-intro')pair=['Confidence','Balance'];if(e.id==='xc-technical')pair=['Structure','Striding'];if(e.id==='eventing-water')pair=['Confidence','Balance'];
 if(e.category==='Groundwork'){if(e.skill==='Confidence')return {group:'education',primary:'Confidence',secondary:null};if(e.id.startsWith('lunge-'))return {group:'education',primary:'Manners',secondary:'Balance',secondaryGroup:'dressage',foundation:true};return {group:'education',primary:'Manners',secondary:null};}
 if(!pair){pair=jump?[e.skill==='Confidence'?'Confidence':Object.hasOwn(ORIGINAL_JUMP_MAPPING,e.id)?ORIGINAL_JUMP_MAPPING[e.id][0]:e.skill,'Balance']:[e.skill,'Rhythm'];if(!['Collection','Balance','Connection','Gaits','Rhythm','Flowiness'].includes(pair[0])&&!jump)pair=['Balance','Rhythm'];}
 return {group,primary:pair[0],secondary:pair[1]===pair[0]?null:pair[1]};
}
const ORIGINAL_SKILL_LEARNED=t2learned;
t2learned=function(h,e){if(e.category==='Groundwork'||e.category==='Trail')return ORIGINAL_SKILL_LEARNED(h,e);const m=originalSkillMapping(e,{});return h.stats?.[m.group]?.[m.primary]??0;};
function originalSkillFocusOptions(discipline,current=''){const d=t2canonicalDiscipline(discipline),groups=['groundwork','lunging','flatwork','dressage'].includes(d)?['dressage']:['jumping','dressage'];return (['groundwork','lunging'].includes(d)?['Manners','Confidence'].map(skill=>`<option value='education:${skill}' ${current==='education:'+skill?'selected':''}>${skill==='Confidence'?'Flatwork Confidence (education)':'Manners'}</option>`).join(''):'')+`<option value='' ${!current?'selected':''}>Exercise-led (no selected skill)</option>`+groups.map(group=>Object.keys(group==='jumping'?app.horses.find(h=>h.stats?.jumping)?.stats.jumping||{Striding:0,Confidence:0,Balance:0,Power:0,Speed:0,Structure:0}:app.horses.find(h=>h.stats?.dressage)?.stats.dressage||{Collection:0,Balance:0,Connection:0,Gaits:0,Rhythm:0,Flowiness:0}).map(skill=>`<option value='${group}:${skill}' ${current===group+':'+skill?'selected':''}>${group==='jumping'?'Jumping':'Dressage'} — ${mgEscape(skill)}</option>`).join('')).join('');}
function originalSkillAward(h,e,s,result,repeat,c,m){const out={},q=DISCIPLINE_PROGRESS.quality[result]||0;if(!q||s.difficulty>2)return out;const map=originalSkillMapping(e,s),rep=DISCIPLINE_PROGRESS.repetition[Math.min(5,Math.max(0,repeat-1))],base=DISCIPLINE_PROGRESS.base[clamp((s.difficulty||0)+2,0,3)];s.originalProgress=s.originalProgress||{};s.originalPrimaryGain=s.originalPrimaryGain||0;s.originalSecondaryGain=s.originalSecondaryGain||0;
 for(const [role,skill]of [['primary',map.primary],['secondary',map.secondary]]){if(!skill)continue;const group=role==='secondary'?(map.secondaryGroup||map.group):map.group,education=group==='education',before=education?(skill==='Confidence'?(h.confidenceFlat??0):clamp((h.behavior||0)/10,0,100)):h.stats?.[group]?.[skill];if(!Number.isFinite(before))continue;
 const discipline=s.discipline==='eventing'?'eventing':s.discipline==='hunter'?'hunter':group,cap=education?100:Math.min(100,h.potential?.[discipline]??100),dimin=cap>0&&before/cap>=.95?.4:cap>0&&before/cap>=.85?.7:1,focus=s.disciplineSkill===group+':'+skill?DISCIPLINE_PROGRESS.focus[role]:1,usedKey=role==='primary'?'originalPrimaryGain':'originalSecondaryGain',limit=role==='primary'?DISCIPLINE_PROGRESS.primarySessionCap:DISCIPLINE_PROGRESS.secondarySessionCap;
 const requested=Math.max(0,Math.min(limit-s[usedKey],!education&&h.age<6?trainingCompletionTargets(h,s).skill-(s.originalProgress[(group==='jumping'?'Jumping ':'Dressage ')+skill]||0):Infinity,base*q*rep*dimin*focus*(role==='secondary'?DISCIPLINE_PROGRESS.secondaryShare:1)*(map.foundation?.5:1)*m.wm*m.fm*m.fat*m.traits*m.learning,cap-before));
 if(education&&skill==='Confidence'){h.confidenceFlat=before+requested;}else if(education){h.behavior=(h.behavior||0)+requested*10;if(h.age>3&&h.behavior>=150)h.requiresBreakingIn=false;}else h.stats[group][skill]=before+requested;
 if(requested>0){const key=education?(skill==='Confidence'?'Flatwork Confidence (education)':'Manners'):(group==='jumping'?'Jumping ':'Dressage ')+skill;out[key]=(out[key]||0)+requested;s.originalProgress[key]=(s.originalProgress[key]||0)+requested;s[usedKey]+=requested;s.skillGain+=requested;h.handTrainingSkillGainsThisMonth=(h.handTrainingSkillGainsThisMonth||0)+requested;}
 }
 return out;
}
const ORIGINAL_SKILL_NEW_SESSION=t2newSession;
t2newSession=function(h,options={}){const s=ORIGINAL_SKILL_NEW_SESSION(h,options);s.disciplineSkill=options.disciplineSkill||'';s.normalSkillMinimumApplied=true;s.progressionVersion=2;return s;};
t2gain=function(h,e,s,result,repeat,c){if(result>=4)return {};const t=t2horse(h),w=t2attribute(h,'Willingness'),f=t2attribute(h,'Focus'),fatigue=h.fatigue||0,traits=t.traits.includes('Quick Learner')?T2.progress.quick:t.traits.includes('Slow Learner')?T2.progress.slow:1,wm=T2.progress.willingness[w<4?0:w<6?1:w<8?2:3],fm=T2.progress.focus[f<4?0:f<6?1:f<8?2:3],fat=T2.progress.fatigue[fatigue<30?0:fatigue<50?1:fatigue<70?2:3],equipment=equipmentModifiers(h,t2equipmentContext(e,s)),learning=clamp(1+equipment.learn/100,.6,1.15),m={wm,fm,fat,traits,learning};s.normalSkillMinimumApplied=true;
 const changes=originalSkillAward(h,e,s,result,repeat,c,m),actual=Object.values(changes).reduce((a,b)=>a+b,0);Object.assign(changes,t2xAttributeGain(h,e,s,result,repeat,c,m));if(result<=1&&e.primary==='Responsiveness'&&!t2xLunging(e,s))for(const aid of c.aid==='leg'?['leg']:c.aid==='rein'?['rein']:['leg','rein'])t.education[aid]=clamp(t.education[aid]+actual,0,100);return changes;};
const ORIGINAL_SKILL_BIND=t2bind;
t2bind=function(panel){ORIGINAL_SKILL_BIND(panel);const draft=t2state().draft,node=panel.querySelector('#t2-discipline-skill');if(node&&draft)node.onchange=()=>{draft.disciplineSkill=node.value;saveGame(false);};};
const ORIGINAL_SKILL_FINISH=t2finish;
t2finish=function(h,s){const r=ORIGINAL_SKILL_FINISH(h,s);if(r.disciplineFocus!==undefined)return r;r.disciplineFocus=s.disciplineSkill||'';const [group,skill]=r.disciplineFocus.split(':');if(skill){const key=group==='education'?(skill==='Confidence'?'Flatwork Confidence (education)':'Manners'):(group==='jumping'?'Jumping ':'Dressage ')+skill;const earned=r.progress[key]||0;r.notes.push(earned>0?`The work contributed directly to ${skill}, the selected discipline skill.`:`The selected skill received only limited training during this lesson.`);}return r;};
const ORIGINAL_SKILL_REPORT=t2reportMarkup;
t2reportMarkup=function(r){const html=ORIGINAL_SKILL_REPORT(r),entries=Object.entries(r.progress||{}).filter(([k,v])=>/^(Jumping |Dressage )/.test(k)&&v>0);return html.replace('<h4>Progress</h4>',`<h4>Progress</h4>${entries.length?'<p>Fractional original-skill progress is stored at full precision, even when the whole-number display has not yet changed.</p>':''}`);};

function trainingCompletionTargets(h,s){
 const young=h.age<6;if(s.trainingGainTargets?.young===young)return s.trainingGainTargets;
 const seed=HorseHealth.hash(h.id+'|'+s.id),skillRoll=HorseHealth.roll(seed,'completion-skill'),attributeRoll=HorseHealth.roll(seed,'completion-attribute');
 return s.trainingGainTargets={young,skill:young ? 0.5+Math.min(5,Math.floor(skillRoll*6))/10:3+Math.min(2,Math.floor(skillRoll*3)),attribute:young ? 0.1+Math.min(3,Math.floor(attributeRoll*4))/10:1.5+Math.min(5,Math.floor(attributeRoll*6))/10};
}
// Completion rewards top up work already earned; viewing a report cannot grant rewards.
function completedFocusReward(h,s){
  if(s.completionReward||s.finished)return;
  const work=s.log.filter(x=>x.exerciseId&&Number.isFinite(x.resultIndex)&&t2exercise(x.exerciseId));
  if(work.length<3||work.filter(x=>x.resultIndex<=3).length<2||work.reduce((n,x)=>n+t2exercise(x.exerciseId).duration,0)<8)return;
  let [group,skill]=String(s.disciplineSkill||'').split(':');
  if(!s.disciplineSkill){
    const weights=new Map();
    for(const row of work.filter(x=>x.resultIndex<=3)){
      const e=t2exercise(row.exerciseId),map=originalSkillMapping(e,s);
      for(const [g,k,weight]of [[map.group,map.primary,1],[map.secondaryGroup||map.group,map.secondary,.4]]){
        if(!['jumping','dressage'].includes(g)||!Object.hasOwn(h.stats[g]||{},k))continue;
        const key=g+':'+k;weights.set(key,(weights.get(key)||0)+e.duration*weight);
      }
    }
    [group,skill]=[...weights.entries()].sort((a,b)=>b[1]-a[1])[0]?.[0].split(':')||[];
  }
  const technical=['jumping','dressage'].includes(group)&&Object.hasOwn(h.stats[group]||{},skill);
  const relevant=technical?work.filter(x=>x.resultIndex<=3).filter(x=>{const map=originalSkillMapping(t2exercise(x.exerciseId),s);return map.group===group&&map.primary===skill||(map.secondaryGroup||map.group)===group&&map.secondary===skill;}):work.filter(x=>x.resultIndex<=3);
  if(relevant.length<2||s.disciplineSkill&&['jumping','dressage'].includes(group)&&!technical)return;
  const t=t2horse(h);t.completedRewardIds ||= [];if(t.completedRewardIds.includes(s.id))return;
  const target=trainingCompletionTargets(h,s).skill;
  let skillGain=0;
  if(technical){
    const key=(group==='jumping'?'Jumping ':'Dressage ')+skill,earned=s.progress[key]||0,discipline=['eventing','hunter'].includes(s.discipline)?s.discipline:group,cap=Math.min(100,h.potential?.[discipline]??100);
    const gain=Math.max(0,Math.min(target-earned,cap-h.stats[group][skill]));h.stats[group][skill]+=gain;s.progress[key]=earned+gain;s.skillGain+=gain;h.handTrainingSkillGainsThisMonth=(h.handTrainingSkillGainsThisMonth||0)+gain;skillGain=s.progress[key];
  }
  const map=t2xMapping(t2exercise(relevant.at(-1).exerciseId),s),trainable=name=>T2_ATTRIBUTES.includes(name)&&name!=='Sensitivity to Aids'&&(name!=='Recovery'||s.recoverySequences>0);
  const attribute=map.filter((x,i)=>i%2===0&&trainable(x)).find(x=>x===s.goal)||map.filter((x,i)=>i%2===0&&trainable(x))[0];
  const desired=trainingCompletionTargets(h,s).attribute;
  if(attribute){
    const value=t2attribute(h,attribute),prior=s.progress['Riding '+attribute]||0,gain=Math.max(0,Math.min(desired-prior,10-value));
    if(attribute==='Focus')h.focus+=gain*10;else t.attributes[attribute]=value+gain;
    s.progress['Riding '+attribute]=prior+gain;s.attributeGain+=gain;
  }
  s.completionReward={id:s.id,focus:technical?group+':'+skill:s.disciplineSkill||'',base:target,target,skillGain,attribute,attributeGain:s.progress['Riding '+attribute]||0};t.completedRewardIds.push(s.id);t.completedRewardIds=t.completedRewardIds.slice(-500);
}
const COMPLETED_FOCUS_FINISH=t2finish;
t2finish=function(h,s){completedFocusReward(h,s);const report=COMPLETED_FOCUS_FINISH(h,s);if(s.completionReward){report.completionReward=s.completionReward;if(!report.notes.includes("Today's main skill and attribute gains have been recorded."))report.notes.push(gameNarrative('Training completion quotes',10,{HORSE:h.name}));}return report;};
