/* Movement definitions are fictional game tests, fitted to the existing level catalogue. */
function dressage100Movement(name,gait='Trot',kind='general',coefficient=1){return {name,gait,kind,coefficient,rein:/right/i.test(name)?'Right':'Left',transition:kind==='precision'||/flying[ -]change|transition/i.test(name),collected:kind==='technical',circle:/circle|pirouette/i.test(name)};}
const DRESSAGE100_TESTS=SHOW_LEVELS.dressage.map((level,i)=>{
 const m=[dressage100Movement('Entry, centreline and halt','Trot','precision'),dressage100Movement('Working trot left'),dressage100Movement('Left trot circle','Trot','precision'),dressage100Movement('Walk–trot transitions','Trot','precision'),dressage100Movement('Free walk','Walk','expressive',2)];
 if(i>=1)m.push(dressage100Movement('Left canter transition','Canter','precision'),dressage100Movement('Right canter circle','Canter','precision'),dressage100Movement('Downward transition','Walk','precision'));
 if(i>=2)m.push(dressage100Movement('Lengthened trot','Trot','expressive'),dressage100Movement('Change of direction and straightness','Trot','precision'));
 if(i>=3)m.push(dressage100Movement('Shoulder-in left','Trot','technical'),dressage100Movement('Counter-canter right','Canter','technical'));
 if(i>=4)m.push(dressage100Movement('Collected trot','Trot','technical'),dressage100Movement('Medium canter','Canter','expressive'),dressage100Movement('Half-pass right','Trot','technical'));
 if(i>=5)m.push(dressage100Movement('Flying change','Canter','technical',2));
 if(i>=6)m.push(dressage100Movement('Canter half-pirouette','Canter','technical',2),dressage100Movement('Flying-change sequence','Canter','technical',2));
 if(i>=7)m.push(dressage100Movement('Collected canter pirouette','Canter','technical',2));
 if(i>=8)m.push(dressage100Movement('Piaffe','Trot','technical',2),dressage100Movement('Passage','Trot','technical',2),dressage100Movement('Passage–piaffe transition','Trot','technical',2));
 m.push(dressage100Movement('Extended walk','Walk','expressive',2),dressage100Movement('Final halt and salute','Walk','precision'));return {name:'Oxer '+level+' Technical Test',level,movements:m};
});
function dressage100Test(show){
 const event=show.eventSnapshot||show,custom=event.dressageTest||event.rules?.dressage?.test;
 if(custom?.movements?.length)return {name:custom.name||'Configured test',level:show.level,movements:custom.movements.map(m=>({...dressage100Movement(m.name||m.movement,m.gait,m.kind,m.coefficient||1),...m}))};
 let index=show.discipline==='eventing'?Math.min(5,Math.max(0,SHOW_LEVELS.eventing.indexOf(show.level)-1)):Math.max(0,SHOW_LEVELS.dressage.indexOf(show.level));
 const base=DRESSAGE100_TESTS[index],freestyle=show.discipline==='dressage'&&event.course==='Freestyle'&&index>=6;
 return {...base,name:show.discipline==='eventing'?'Oxer '+show.level+' Eventing Dressage Test':freestyle?'Oxer '+show.level+' Freestyle':base.name,freestyle,movements:base.movements};
}
function dressage100Rules(show){
 const event=show.eventSnapshot||{},r=event.rules?.dressage||event.dressageRules||{},names=Array.isArray(r.judges)?r.judges:Array.isArray(r.judgePanel)?r.judgePanel:null,count=names?.length||Number(r.judges||event.judgeCount)||(event.games?7:event.tier>=10?5:event.tier>=5?3:1);
 return {...r,judges:Math.max(1,Math.min(7,Math.round(count))),judgeNames:names,increment:r.halfMarks===false?1:clamp(Number(r.markIncrement||r.increment)||.5,.1,1),errorPenalties:r.errorPenalties||(event.tier>=5?[2]:[2,4]),errorUnit:r.errorUnit||(event.tier>=5?'percentage':'points'),eliminateAfter:r.eliminateAfterErrors||(event.tier>=5?2:3)};
}
const DRESSAGE100_PANEL=new WeakMap();
function dressage100JudgeOffsets(show,rules,kind){let cache=DRESSAGE100_PANEL.get(show);if(!cache||cache.id!==show.id||cache.count!==rules.judges){cache={id:show.id,count:rules.judges,offsets:new Map()};DRESSAGE100_PANEL.set(show,cache);}if(!cache.offsets.has(kind))cache.offsets.set(kind,Array.from({length:rules.judges},(_,j)=>rules.judges===1?0:(performance100Roll(show.id+'|judge:'+j,kind)-.5)*.22));return cache.offsets.get(kind);}
function dressage100Training(h,m,show){
 const s=h.stats?.dressage||{},fallback=h.skills?.dressage??0,get=k=>Number(s[k]??fallback),keys=m.kind==='expressive'?['Gaits','Rhythm','Balance','Flowiness']:m.kind==='precision'?['Balance','Connection','Rhythm','Flowiness']:m.kind==='technical'?['Collection','Balance','Connection','Rhythm']:['Gaits','Rhythm','Balance','Connection'];
 const factors=m.kind==='expressive'?[.4,.25,.2,.15]:m.kind==='precision'?[.3,.3,.25,.15]:m.kind==='technical'?[.5,.25,.15,.1]:[.25,.25,.25,.25],actual=keys.reduce((n,k,i)=>n+get(k)*factors[i],0),level=dressage100Test(show).level,required=requiredSkillBand('dressage',level)[0];
 const trained=actual>=required?55+(actual-required)/Math.max(1,100-required)*45:55+(actual-required)*1.5;return {actual,required,value:clamp(trained,0,100),keys};
}
function dressage100Conditions(show,entry,h){
 const w=entry.player?show.rpg?.warmupState:null,attrs=entry.attributes||h.training2?.attributes||{},focus=w?.focus??h.focus??Number(attrs.Focus??7)*10,tension=w?.tension??Math.max(0,(100-Number(attrs.Confidence??7)*10)*.7),energy=w?.energy??Math.max(0,100-(h.fatigue||0));
 return {focus,tension,energy,timing:w?.timing??Number(attrs.Balance??7)*10,confidence:w?.confidence??Number(attrs.Confidence??7)*10,value:clamp((focus+energy+100-tension)/3-(h.fatigue||0)*.1,0,100)};
}
function dressage100Context(show,entry,h){
 const innate=movement100(h),rider=performance100Rider(show,entry),learned=h.riderBehavior?.learned||{},technical=performance100Average(['Timing','Balance','Hand Stability','Aid Consistency','Leg Stability'].map(k=>Number(rider[k])),50),condition=dressage100Conditions(show,entry,h),seed=HorseHealth.hash(String(show.id)+'|'+String(entry.id)),training=new Map(),natural=new Map();
 return {h,rider,innate,technical,condition,seed,compact:!entry.player&&!entry.retainTestSheet100||!show.rpg&&!show.performance100,form:HorseHealth.roll(seed,'dressage97:form'),harmony:kind=>performance100Average([learned['Rider Trust in Aids']??70,learned[kind==='technical'?'Collection Confidence':'Flatwork Confidence']??70,Number(h.bond??70)],70),training:m=>{if(!training.has(m.kind))training.set(m.kind,dressage100Training(h,m,show));return training.get(m.kind);},natural:m=>{const key=m.kind+'|'+m.gait;if(!natural.has(key)){const gait=innate[String(m.gait||'Trot').toLowerCase()]??innate.trot;natural.set(key,m.kind==='technical'?performance100Average([innate.balance,innate.elasticity,innate.impulsion,gait]):m.kind==='precision'?performance100Average([innate.balance,gait]):performance100Average([gait,innate.elasticity,innate.expression,innate.impulsion]));}return natural.get(key);}};
}
function dressage100Evaluate(show,entry,h,m,record,index,context=null){
 const c=context||dressage100Context(show,entry,h),training=c.training(m),natural=c.natural(m),technical=c.technical,harmony=c.harmony(m.kind),condition=c.condition,weights=m.kind==='expressive'?[.35,.25,.20,.10,.10]:m.kind==='precision'?[.10,.40,.25,.15,.10]:m.kind==='technical'?[.20,.40,.20,.10,.10]:[.20,.35,.25,.10,.10],quality=clamp(Number(record.quality??1),0,1),parts=[natural,training.value,technical,harmony,condition.value*quality],q=parts.reduce((n,v,i)=>n+v*weights[i],0),variation=(c.form-.5)*.30+(HorseHealth.roll(c.seed,'dressage97:movement:'+index)-.5)*.24,spark=HorseHealth.roll(c.seed,'dressage97:brilliance:'+index),brilliance=q>=94&&spark>.99?(spark-.99)/.01*1.3:0;
 let mark=1.5+.073*q+variation+brilliance;
 const deduction=Number(record.markDeduction??(record.error?quality<=.3?.75:.3:0));mark=record.completed===false||quality===0?0:clamp(mark-deduction,0,10);
 if(c.compact)return {coefficient:Number(m.coefficient)||1,rawMark:mark,quality,harmony};
 const comment=record.completed===false||quality===0?'Movement not performed.':record.error?'Observed '+record.error+' error; '+deduction.toFixed(2)+' mark deduction.':training.actual<training.required?'Required technical training is not yet established.':condition.tension>70?'Tension limited relaxation and expression.':m.kind==='expressive'&&natural>=80?'Expressive '+String(m.gait).toLowerCase()+' with correct execution.':m.kind==='technical'&&training.value>=80?'Well-trained collection and balance.':m.kind==='precision'&&technical>=80?'Accurate figures and rider timing.':'Correct movement; '+(natural<68?'ordinary natural expression.':'regular execution.');
 return {movement:m.name,gait:m.gait,kind:m.kind,coefficient:Number(m.coefficient)||1,rawMark:mark,mark,deduction,comment,quality,components:{natural,training:training.value,rider:technical,harmony,condition:condition.value},weights};
}
function dressage100Sheet(show,entry,records,stats={},context=null){
 const h=context?.h||performance100Horse(entry),c=context||dressage100Context(show,entry,h),test=dressage100Test(show),rules=dressage100Rules(show),movements=test.movements.map((m,i)=>{
  const record=records[i]||{quality:0,completed:false},offsets=dressage100JudgeOffsets(show,rules,m.kind);const resolved=record.judging100||dressage100Evaluate(show,entry,h,m,record,i,c),judges=Array.from({length:rules.judges},(_,j)=>{const offset=offsets[j];return Math.round(clamp(resolved.rawMark+offset,0,10)/rules.increment)*rules.increment;});
  return {...resolved,...(c.compact?{}:{judges}),mark:judges.reduce((a,b)=>a+b,0)/judges.length};
 });
 const maximum=movements.reduce((n,m)=>n+10*m.coefficient,0),earned=movements.reduce((n,m)=>n+m.mark*m.coefficient,0),testErrors=Number(stats.testErrors||records.filter(r=>r.testError).length),errorPoints=Array.from({length:Math.min(testErrors,rules.errorPenalties.length)},(_,i)=>rules.errorPenalties[i]).reduce((a,b)=>a+b,0),deductionPercent=rules.errorUnit==='points'?errorPoints/maximum*100:errorPoints;
 const technicalPercentage=rules.errorUnit==='points'?(earned-errorPoints)/maximum*100:earned/maximum*100-errorPoints;
 const technicalRaw=earned/maximum*100;
 let percentage=clamp(test.freestyle?technicalRaw:technicalPercentage,0,100),artistic=null;
 if(test.freestyle){const rider=performance100Rider(show,entry),innate=movement100(h),mean=performance100Average(movements.map(m=>m.quality),0);artistic=[['Harmony',c.compact?performance100Average(movements.map(m=>m.harmony)):performance100Average(movements.map(m=>m.components.harmony))],['Expression',innate.expression],['Choreography',performance100Average([rider['Aid Consistency']??50,rider.Timing??50,percentage])],['Music interpretation',rider.Timing??50],['Difficulty',clamp(Number(show.eventSnapshot?.freestyleDifficulty??(45+Math.max(0,SHOW_LEVELS.dressage.indexOf(show.level))*4+test.movements.filter(m=>m.kind==='technical').length/test.movements.length*20)),0,100)]].map(([name,value])=>({name,mark:clamp((1.5+.075*value+(value>95?Math.pow((value-95)/5,2):0))*mean,0,10)}));const artisticPercent=performance100Average(artistic.map(a=>a.mark),0)*10;const technicalWeight=clamp(Number(rules.freestyleTechnicalWeight??.5),0,1);percentage=clamp(percentage*technicalWeight+artisticPercent*(1-technicalWeight)-deductionPercent,0,100);}
 percentage=Math.round(percentage*100)/100;const eliminated=!!stats.eliminated||testErrors>=rules.eliminateAfter;
 return {version100:1,phase:'dressage',testName:test.name,testLevel:test.level,percentage,technicalPercentage:Math.round((test.freestyle?technicalRaw:technicalPercentage)*100)/100,penalties:Math.round((100-percentage)*100)/100,movements:c.compact?!show.rpg?[]:movements.map((m,i)=>({movement:test.movements[i].name,coefficient:m.coefficient,mark:m.mark,comment:records[i]?.error?'Observed '+records[i].error+' error.':m.quality===0?'Movement not performed.':'Movement completed.'})):movements,earned,maximum,judges:rules.judges,judgeNames:rules.judgeNames,artistic,testErrors,errorPoints,errorUnit:rules.errorUnit,deductionPercent,comments:c.compact?[]:movements.map(m=>m.comment),eliminated,...(eliminated?{eliminationReason:stats.eliminationReason||'Dressage test errors'}:{})};
}
function dressage100Simulate(show,entry,prior=[]){
 const h=performance100Horse(entry),c=dressage100Context(show,entry,h),test=dressage100Test(show),rider=c.rider,condition=c.condition,records=test.movements.map((m,i)=>{
  if(prior[i])return prior[i];const training=c.training(m),ability=performance100Average(Object.values(rider).filter(Number.isFinite),50),learned=h.riderBehavior?.learned||{},chance=clamp((100-training.value)*.0015+(100-ability)*.0012+Math.max(0,condition.tension-50)*.001+(learned['Training Anticipation']??5)*.0002,.005,.35),roll=HorseHealth.roll(c.seed,'dressage100:execution:'+i),error=roll<chance;
  return {quality:error?roll<chance*.25?.3:.6:1,completed:true,error:error?m.kind==='technical'?'balance':m.kind==='precision'?'aid':'rhythm':null};
 });return dressage100Sheet(show,entry,records,{},c);
}
