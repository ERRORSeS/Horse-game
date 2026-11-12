/* Standings and their result breakdown use the same published scoring window. */
function ranking93History(row,type,discipline,filter='',hour=careerState().rankingHour ?? pastureCalendarHour()) {
  const world=careerState(),from=hour-CAREER_HOURS_PER_YEAR,year=pastureDate(hour).year;
  const horse=['horse','young-horse'].includes(type),comb=type==='combination';
  const riderId=comb ? row.riderId || row.id.split('|')[0] : horse || type==='team' ? undefined : row.riderId || row.id;
  const horseId=horse ? row.id : comb ? row.horseId || row.id.slice(row.id.indexOf('|')+1) : undefined;
  let history=[];
  const results=type==='team' ? [] : careerResults({riderId,horseId,discipline,from,until:hour,calendarOnly:true});
  if(type==='team') {
    for(const meet of Object.values(world.meets || {})) {
      if(!rank91Real(meet)||meet.discipline!==discipline||meet.series!==filter||meet.hour>hour||meet.hour<from||pastureDate(meet.hour).year!==year)continue;
      const result=meet.teams?.find(r=>r.country===row.id && r.points>0);
      if(result)history.push({...result,hour:meet.hour,event:meet.name,eventId:meet.id,rankingPoints:result.points});
    }
  } else for(const result of results) {
    const meet=world.meets[result.eventId],npc=careerRosterIndex(world.npcs || []).byId.get(result.riderId);
    if(npc && npc.specialty!==discipline)continue;
    const country=npc?.country || app.riderRealism?.profiles.find(p=>p.id===result.riderId)?.career?.country || result.country;
    for(const credit of careerPointCredits(meet,result)) {
      const target=credit.type==='national' ? country : credit.type==='youth-national' ? String(credit.filter).split('|')[0]+'|'+country : credit.filter;
      if(credit.type!==type||String(target)!==String(filter)||credit.id!==row.id||credit.points<=0||credit.seasonal&&pastureDate(meet.hour).year!==year)continue;
      history.push({...result,rankingPoints:credit.points});
    }
  }
  if(type==='world')history=history.sort((a,b)=>b.rankingPoints-a.rankingPoints).slice(0,30);
  return history.sort((a,b)=>b.hour-a.hour);
}

function ranking93ScoringEvent(meet,catalogue) {
  if(!rank91Real(meet)||!meet.official)return null;
  let rules=meet.rankingRules93;
  if(!rules) {
    const definition=catalogue.get(meet.classId);
    if(definition?.official && definition.discipline===meet.discipline && definition.tier===meet.tier && definition.ranking===meet.ranking)
      rules=definition;
    else if(meet.customId && ['national','division'].includes(meet.ranking) && Number.isInteger(meet.tier) && meet.tier>=0 && meet.tier<=11)
      rules={base:CAREER_TIERS[meet.tier].national ?? 45,minField:8,cutoff:10};
  }
  if(!(rules?.base>0)||!Number.isFinite(rules.minField)||!Number.isFinite(rules.cutoff))return null;
  return {...meet,at:meet.at ?? meet.hour-2,base:rules.base,minField:rules.minField,cutoff:rules.cutoff};
}
function repairNpcRankingPoints93() {
  const world=app.career;
  if(!world || world.npcRankingPointsVersion93===1)return 0;
  const catalogue=new Map(CAREER_SERIES.map(e=>[e.id,e])),riders=careerRosterIndex(world.npcs || []).byId;
  let changed=0;
  for(const meet of Object.values(world.meets || {})) {
    const event=ranking93ScoringEvent(meet,catalogue);
    if(!event)continue;
    const starters=meet.starters ?? (meet.results || []).filter(r=>r.started!==false).length;
    const strength=clamp(.85+(meet.fieldStrength ?? 60)*.003,.85,1.15);
    for(const row of meet.results || []) {
      const rider=riders.get(row.riderId);
      if(row.player||!rider||row.started===false||rider.rankingDebutHour86!=null&&event.at<rider.rankingDebutHour86)continue;
      const points=careerPoints(event,row,starters,strength);
      if(row.points!==points){row.points=points;changed++;}
    }
  }
  world.npcRankingPointsVersion93=1;
  if(changed && Number.isFinite(world.rankingHour))careerPublish(world.rankingHour,{repair:true});
  return changed;
}
const RANK93_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const result=RANK93_LOAD(...args);repairNpcRankingPoints93();return result;};
