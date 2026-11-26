/* Add actual action chronology and recorded jump heights using the original report renderer. */
const TRAIN108_RIDER_ACTION=rider105Resolve;
rider105Resolve=function(h,s,...args){const out=TRAIN108_RIDER_ACTION(h,s,...args),height=Number(s?.setup?.height);if(out.row&&t2exercise(s?.exerciseId)?.category==='Jumping'&&Number.isFinite(height)&&height>=0)out.row.jumpHeight108=height;return out;};
const TRAIN108_FINISH=t2finish;
t2finish=function(h,s,...args){const wasFinished=s.finished,report=TRAIN108_FINISH(h,s,...args);if(!report||report.chronology108||wasFinished)return report;
 const old=report.exercises||[],actions=new Map((s.riderActions105?.events||[]).map(row=>[row.id,row])),seen=new Set(),ordered=[];let index=0;
 for(const row of s.log||[]){
  if(row.exerciseId){const original=old[index++]||{name:row.exercise,result:row.result,text:row.text},height=Number(row.setup?.height),jump=t2exercise(row.exerciseId)?.category==='Jumping'&&Number.isFinite(height)&&height>=0;ordered.push({...original,elapsed:row.elapsed,...(jump?{name:original.name+' · '+height.toFixed(2)+' m',text:(original.text||row.text||'')+' Jump height: '+height.toFixed(2)+' m.',jumpHeight108:height}:{})});}
  else if(row.riderAction105&&!seen.has(row.riderAction105)){const action=actions.get(row.riderAction105);if(!action)continue;seen.add(row.riderAction105);const height=action.jumpHeight108;ordered.push({name:action.category+(action.severity?' — '+action.severity:''),result:action.status==='Recovery'?'Regrouping':action.status==='Unavailable'?'Unavailable action':'Rider action',text:action.narrative+(Number.isFinite(height)?' Jump setting at this action: '+height.toFixed(2)+' m.':''),elapsed:row.elapsed,riderAction105:action.id,...(Number.isFinite(height)?{jumpHeight108:height}:{})});}
 }
 if(ordered.length)report.exercises=ordered;report.chronology108=1;return report;};
