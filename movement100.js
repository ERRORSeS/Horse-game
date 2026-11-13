/* Innate aptitude is recorded separately from existing, trainable dressage skills. */
const MOVEMENT100_KEYS=['walk','trot','canter','elasticity','balance','impulsion','expression'];
function performance100Roll(seed,key){return HorseHealth.roll(HorseHealth.hash(String(seed)),key);}
function movement100(h,origin='legacy',parents=null){
 if(h.movement100?.version===1&&MOVEMENT100_KEYS.every(k=>Number.isFinite(h.movement100[k])&&h.movement100[k]>=0&&h.movement100[k]<=100))return h.movement100;
 const saved=h.movement100?.version===1?{...h.movement100}:null;
 const roll=k=>performance100Roll(h.id+'|movement100',k),profile=typeof Breed94!=='undefined'?Breed94.get(h.breed):null,potential=Number(h.potential?.dressage??profile?.reference.dressage??70),gaits=Number(h.stats?.dressage?.Gaits??h.skills?.dressage??potential),specialized=potential>=80&&(profile?.reference.dressage>=90||/Dutch Warmblood|Hanoverian|Oldenburg|Andalusian|Lipizzaner|Lusitano/.test(h.breed||''));
 let values={},category='Derived from saved horse';
 if(parents){const a=movement100(parents[0]),b=movement100(parents[1]);for(const key of MOVEMENT100_KEYS)values[key]=clamp((a[key]+b[key])/2+(roll(key)-.5)*16,25,99);category='Inherited individual movement';}
 else if(origin==='founder'){
  const weights=specialized?[6,24,40,22,8]:potential<60?[13,40,32,12,3]:[10,35,35,15,5],centres=[45,61,73,84,93],names=['Below-average','Ordinary','Good','Very good','Exceptional'];let n=roll('category')*100,index=0;while(index<4&&(n-=weights[index])>=0)index++;category=names[index];
  for(const key of MOVEMENT100_KEYS)values[key]=clamp(centres[index]+(roll(key)+roll(key+':second')-1)*17+(specialized?2:0),25,99);
 }else{const base=clamp(65+(potential-65)*.24+(gaits-60)*.10,60,85);for(const key of MOVEMENT100_KEYS)values[key]=clamp(base+(roll(key)-.5)*12,50,93);}
 if(origin==='founder'&&/Andalusian|Lipizzaner|Lusitano/.test(h.breed||''))values.balance=Math.min(99,values.balance+4);
 h.movement100={version:1,origin:saved?.origin||(parents?'inherited':origin),category:saved?.category||category,...Object.fromEntries(MOVEMENT100_KEYS.map(k=>[k,Number.isFinite(saved?.[k])?clamp(saved[k],0,100):Math.round(values[k]*10)/10]))};return h.movement100;
}
const MOVEMENT100_BASE=baseHorse;
baseHorse=function(...args){const h=MOVEMENT100_BASE(...args);movement100(h,'founder');return h;};
const MOVEMENT100_NPC=careerNpcHorse;
careerNpcHorse=function(...args){const h=MOVEMENT100_NPC(...args);movement100(h,'founder');return h;};
const MOVEMENT100_BIRTH=processPregnancy;
processPregnancy=function(mare,newborns,...args){const start=newborns.length,sireId=mare.pregnantEmbryo?.sireId,sire=app.horses.find(h=>sireId?h.id===sireId:h.name===mare.pregnantBy),out=MOVEMENT100_BIRTH(mare,newborns,...args);for(const h of newborns.slice(start)){delete h.movement100;if(sire)movement100(h,'inherited',[mare,sire]);else movement100(h);}return out;};
function performance100Horse(entry){
 const actual=(app.horses||[]).find(h=>h.id===entry.horseId)||npc85Registry().horses.get(entry.horseId);
 const h=actual||(entry.performanceHorse100 ||= {id:entry.horseId||entry.id,breed:entry.horse?.breed||'Cross-Breed',age:entry.horseAge||10,skills:{dressage:entry.skills?.discipline??50,jumping:entry.skills?.form??entry.skills?.discipline??50,eventing:entry.skills?.discipline??50},potential:{dressage:entry.skills?.discipline??60},personality:entry.personality,focus:Number(entry.attributes?.Focus??5)*10,fatigue:0});
 movement100(h);if(h.stats)return h;
 const stats=Object.fromEntries(Object.entries(EXERCISE_MENU).filter(([d])=>['dressage','jumping','eventing'].includes(d)).map(([d,keys])=>[d,Object.fromEntries(keys.map(k=>[k,h.skills?.[d]??entry.skills?.discipline??50]))]));
 return {...h,stats,training2:h.training2||{attributes:entry.attributes||{},traits:entry.traits||[],familiarity:{}},riderBehavior:h.riderBehavior||rrHorse({...h})};
}
function performance100Rider(show,entry){return entry.riderAbilities||(entry.player?(show.rpg?.riderProfile?.abilities||rrSettings().abilities):Object.fromEntries(RR_ABILITIES.map(k=>[k,careerRosterIndex().byId.get(entry.riderId)?.skill??entry.skills?.discipline??50])));}
function performance100Average(values,fallback=60){const good=values.filter(Number.isFinite);return good.length?good.reduce((a,b)=>a+b,0)/good.length:fallback;}
function movement100Label(value){return value<52?'Below-average':value<68?'Ordinary':value<80?'Good':value<90?'Very good':'Exceptional';}
// Profiling found repeated Unicode normalization while building real NPC fields. Cache only this pure string result.
const PERFORMANCE100_NAME_KEY=horseNameKey,PERFORMANCE100_NAMES=new Map();
horseNameKey=function(name){if(typeof name!=='string')return PERFORMANCE100_NAME_KEY(name);if(PERFORMANCE100_NAMES.has(name))return PERFORMANCE100_NAMES.get(name);const key=PERFORMANCE100_NAME_KEY(name);if(PERFORMANCE100_NAMES.size>=65536)PERFORMANCE100_NAMES.delete(PERFORMANCE100_NAMES.keys().next().value);PERFORMANCE100_NAMES.set(name,key);return key;};
