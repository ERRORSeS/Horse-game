require('./realism100.test.cjs');
const {check}=require('./behavior5-harness.cjs');
check('movement execution varies modestly after half-mark rounding without inflating average quality',`{
 let flat=0,totalChange=0,count=0;const ranges=[];
 for(let run=0;run<80;run++){
  const f=real100Fixture('dressage','Level Two',65,65,65);f.show.id='movement102:'+run;const c=dressage100Context(f.show,f.entry,f.h),test=dressage100Test(f.show),records=test.movements.map(()=>({quality:1,completed:true})),sheet=dressage100Sheet(f.show,f.entry,records,{},c),marks=sheet.movements.map(m=>m.mark);
  if(new Set(marks).size===1)flat++;
  ranges.push(Math.max(...marks)-Math.min(...marks));
  for(let i=0;i<test.movements.length;i++){
   const raw=dressage100Evaluate(f.show,f.entry,f.h,test.movements[i],records[i],i,c).rawMark;
   const oldVariation=(HorseHealth.roll(c.seed,'dressage97:movement:'+i)-.5)*.24,newVariation=(HorseHealth.roll(c.seed,'dressage97:movement:'+i)+HorseHealth.roll(c.seed,'dressage102:execution:'+i)-1)*.60;
   if(Math.abs(newVariation)>.60)throw Error('excessive variation');
   totalChange+=newVariation-oldVariation;count++;
   if(raw!==dressage100Evaluate(f.show,f.entry,f.h,test.movements[i],records[i],i,c).rawMark)throw Error('rerolled');
  }
 }
 if(flat>4||Math.abs(totalChange/count)>.035||Math.max(...ranges)>1.5)throw Error(JSON.stringify({flat,meanChange:totalChange/count,ranges}));
 console.log('MOVEMENT102 '+JSON.stringify({tests:80,flatSheets:flat,meanChange:totalChange/count,maxRange:Math.max(...ranges)}));
}`);
check('innate gait quality and executed quality still matter more than the bounded variation',`{
 const f=real100Fixture('dressage','Level Two',70,65,70),m=dressage100Movement('Extended trot','Trot','expressive'),record={quality:1,completed:true};
 const start=dressage100Evaluate(f.show,f.entry,f.h,m,record,4).rawMark;
 for(const key of ['trot','expression','elasticity','impulsion'])f.h.movement100[key]=95;
 const better=dressage100Evaluate(f.show,f.entry,f.h,m,record,4).rawMark;
 if(better-start<.6)throw Error('natural quality lost');
 if(dressage100Evaluate(f.show,f.entry,f.h,m,{quality:.3,completed:true,error:'rhythm'},4).rawMark>=better)throw Error('execution error ignored');
 if(dressage100Evaluate(f.show,f.entry,f.h,m,{quality:0,completed:false},4).rawMark!==0)throw Error('unperformed movement received marks');
 const before=dressage100Sheet(f.show,f.entry,dressage100Test(f.show).movements.map(()=>record));
 const saved=JSON.stringify({show:f.show,horse:f.h});const copy=JSON.parse(saved);app.horses=[copy.horse];
 const after=dressage100Sheet(copy.show,copy.show.competitors.find(e=>e.player),dressage100Test(copy.show).movements.map(()=>record));
 if(JSON.stringify(before.movements.map(m=>m.mark))!==JSON.stringify(after.movements.map(m=>m.mark)))throw Error('reload variation changed');
}`);
