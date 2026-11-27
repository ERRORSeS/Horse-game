/* Default field sizes follow prestige; fixed and player-defined formats retain their counts. */
function competitionField110(prestige){return 16+Math.floor(clamp(Number(prestige)||0,0,100)*.34);}
const PACE110_EVENT=careerEvent;
careerEvent=function(definition,...args){const event=PACE110_EVENT(definition,...args);if(!definition.team&&!definition.games&&definition.starters==null){event.fieldSize=competitionField110(event.prestige??CAREER_TIERS[event.tier]?.prestige);event.npcCount=event.fieldSize-1;}return event;};
const PACE110_FIELD=showConfigureField;
showConfigureField=function(event,size=null){
 if(!size&&event.gameHosted&&!event.careerEvent&&!event.userHosted&&!event.team&&!event.games&&!event.registeredEntries?.length&&!event.entries?.length&&event.status!=='Completed'&&event.id!==app.activeShow?.eventId){
 const venue=(app.barnCatalog||[]).find(b=>b.id===event.barnId)||app.currentBarn;
 event.fieldSize=competitionField110(event.prestige??[0,5,20,40,65,90][clamp(Math.round(venue?.eventsStars||3),1,5)]);event.npcCount=event.fieldSize-1;
 }return PACE110_FIELD(event,size);
};
/* Repair known scoring results once, without replaying competitions or paying prizes. */
function repairRankingPoints110(){
 const world=app.career;if(!world||world.rankingPointsVersion110)return 0;
 const catalogue=new Map(CAREER_SERIES.map(e=>[e.id,e])),riders=careerRosterIndex(world.npcs||[]).byId;let changed=0;
 for(const meet of Object.values(world.meets||{})){
 const event=ranking93ScoringEvent(meet,catalogue);if(!event)continue;
 const starters=meet.starters??(meet.results||[]).filter(r=>r.started!==false).length;
 for(const row of meet.results||[]){if(row.points>0||row.started===false||row.eliminated||!Number.isInteger(row.placing))continue;
 const rider=riders.get(row.riderId);if(!row.player&&rider?.rankingDebutHour86!=null&&event.at<rider.rankingDebutHour86)continue;
 const points=careerPoints(event,row,starters,clamp(.85+(meet.fieldStrength??60)*.003,.85,1.15));if(points>0){row.points=points;changed++;}}
 }world.rankingPointsVersion110=1;if(changed&&Number.isFinite(world.rankingHour))careerPublish(world.rankingHour,{repair:true});return changed;
}
const PACE110_LOAD=hydrateFromSave;
hydrateFromSave=function(...args){const out=PACE110_LOAD(...args);repairRankingPoints110();
 const now=pastureCalendarHour(),catalogue=new Map(CAREER_SERIES.map(e=>[e.id,e]));
 for(const event of [...(app.barnShows||[]),...(app.upcomingEvents||[]),...Object.values(app.management?.calendarEventRegistry||{})]){
 if(!event||event.at<now||event.entries?.length||event.registeredEntries?.length||event.status==='Completed'||event.id===app.activeShow?.eventId)continue;
 if(event.careerEvent){const definition=catalogue.get(event.classId);if(definition&&!definition.team&&!definition.games&&definition.starters==null){event.fieldSize=competitionField110(event.prestige??CAREER_TIERS[event.tier]?.prestige);event.npcCount=event.fieldSize-1;}}else showConfigureField(event);
 }return out;};
/* Lesson scope is a saved selection from breed-appropriate ceilings, not current schooling. */
function lessonScope110(h,barn){
 if(h.lessonScopeVersion110)return h;
 const p=Breed94.get(h.breed)||{ridden:true,jumpScope:[.5,1.3,/Warmblood|Hanover|Holstein|Oldenburg|Trakehn|Selle Francais|Sport Cross|Westphalian/i.test(h.breed)?1.7:/Pony/i.test(h.breed)?1.3:/Draft/i.test(h.breed)?.9:/Friesian/i.test(h.breed)?1.1:1.5]};if(!p.ridden)return h;
 const athlete=breed94Potential(h,true)||(h.athleticPotential94||={v:1,breed:h.breed,ridden:true,category:'Normal',potential:{...h.potential},subskills:{},jumpScope:p.jumpScope[1],source:'Lesson program selection'}),stars=clamp(Number(barn?.lessonsStars)||3,1,5),random=coat94Rng(h.id+':lesson-scope110'),roll=random();
 // Scope above 1.20m: 0%, 0%, 0.5%, 8%, 18%; above 1.40m: 0%, 0%, 0.05%, 1%, 3%.
 const high=stars>=5?.18:stars>=4?.08:stars>=3?.005:0,elite=stars>=5?.03:stars>=4?.01:stars>=3?.0005:0;
 const ceiling=roll<elite?1.6:roll<high?1.4:stars>=4?1.2:stars>=3?1.1:1;
 athlete.jumpScope=Math.round(Math.min(p.jumpScope[2],ceiling-(random()**.45)*.3)*100)/100;
 athlete.jumpScope=Math.max(Math.min(.5,p.jumpScope[2]),athlete.jumpScope);h.lessonScopeVersion110=1;return h;
}
const PACE110_LESSON=createLessonHorse;
createLessonHorse=function(barn){return lessonScope110(PACE110_LESSON(barn),barn);};
const PACE110_ROSTER=ensureLessonRosterForBarn;
ensureLessonRosterForBarn=function(barn,...args){const roster=PACE110_ROSTER(barn,...args);for(const h of roster||[])lessonScope110(h,barn);return roster;};
