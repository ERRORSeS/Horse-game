/* Ranking competition is independent of optional rider-career progression. */
function ranking112Matches(event,spec){
 if(!event.official||event.sandbox||!event.base||event.ranking==='none'||event.discipline!==spec.discipline)return false;
 if(event.team||event.games)return spec.type==='team'&&event.series===spec.filter;
 const ranking=event.ranking,division=event.division||'senior';
 if(spec.type==='world'||spec.type==='horse'||spec.type==='combination')return ranking==='world';
 if(spec.type==='national')return ['national','world'].includes(ranking)&&(ranking==='world'||(event.federation||careerCountry(event.country))===spec.country);
 if(spec.type==='young-horse')return ranking==='young-horse'&&Number(event.horseAge)===spec.horseAge;
 if(['division','youth-international','youth-national'].includes(spec.type))return ranking==='division'&&division===spec.division&&(!spec.country||(event.federation||careerCountry(event.country))===spec.country);
 if(spec.type==='tour')return event.series===spec.filter;
 return false;
}
function ranking112Wanted(event){
 if(event.ranking==='world')return true;
 const profiles=rank91Profiles();
 if(event.ranking==='national'&&profiles.some(p=>p.country===(event.federation||careerCountry(event.country))))return true;
 const pools=Object.values(app.career?.rankingPopulation91?.pools||{});
 return pools.some(spec=>ranking112Matches(event,spec)&&(!['division','youth-international'].includes(spec.type)||event.tier>=5||event.divisionScope==='international'||profiles.some(p=>p.country===(event.federation||careerCountry(event.country)))));
}
function careerBackgroundSchedule112(from,to){
 if(careerState().settings.background===false)return [];
 return careerSchedule(from,to,undefined,true).filter(event=>
  careerActive()&&!event.foregroundOnly&&!event.calendarOnly||ranking112Wanted(event));
}
const RANK112_ROSTER=ranking91EventRoster;
ranking91EventRoster=function(event,roster){
 const primary=RANK112_ROSTER(event,roster);if(event.team||event.games||String(event.id).includes(':prior-start:'))return primary;
 const byId=careerRosterIndex(roster).byId,ids=new Map(primary.map(r=>[r.id,r]));
 for(const pool of Object.values(app.career?.rankingPopulation91?.pools||{})){
 if(!ranking112Matches(event,pool))continue;
 for(const member of pool.members){const r=byId.get(member.id);if(r&&event.at>=member.since&&rank91Eligible(r,pool,event.at))ids.set(r.id,r);}
 }return [...ids.values()];
};
