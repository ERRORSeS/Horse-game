/* Only new breed IDs receive the new athletic model. Existing registries remain authoritative. */
const BREED94_DEFINITIONS=[{"name": "Zangersheide", "id": "zangersheide", "code": "ZANG", "category": "Sport Warmblood", "height": ["16.0", "17.3"], "reference": {"jumping": 94, "dressage": 83, "eventing": 82, "hunter": 86}, "jumpScope": [1.4, 1.6, 1.7], "specialties": ["Showjumping", "Sport Horse"]}, {"name": "Irish Sport Horse", "id": "irish_sport_horse", "code": "ISH", "category": "Sport Horse", "height": ["15.2", "17.2"], "reference": {"jumping": 89, "dressage": 80, "eventing": 94, "hunter": 85}, "jumpScope": [1.25, 1.5, 1.6], "specialties": ["Eventing", "Showjumping"]}, {"name": "Quarter Horse", "id": "quarter_horse", "code": "QH", "category": "Stock Horse", "height": ["14.2", "16.1"], "reference": {"jumping": 66, "dressage": 73, "eventing": 68, "hunter": 77}, "jumpScope": [0.75, 1.05, 1.2], "specialties": ["Stock Riding", "Hunters", "General Riding"]}, {"name": "American Paint Horse", "id": "american_paint_horse", "code": "APH", "category": "Stock Horse", "height": ["14.2", "16.2"], "reference": {"jumping": 68, "dressage": 72, "eventing": 68, "hunter": 77}, "jumpScope": [0.8, 1.1, 1.25], "specialties": ["Stock Riding", "Hunters", "General Riding"]}, {"name": "Appaloosa", "id": "appaloosa", "code": "APP", "category": "Stock Horse", "height": ["14.2", "16.1"], "reference": {"jumping": 72, "dressage": 72, "eventing": 76, "hunter": 79}, "jumpScope": [0.85, 1.15, 1.3], "specialties": ["Hunters", "Eventing", "General Riding"]}, {"name": "Knabstrupper", "id": "knabstrupper", "code": "KN", "category": "Spotted Sport Horse", "height": ["15.2", "17.1"], "reference": {"jumping": 83, "dressage": 91, "eventing": 77, "hunter": 82}, "jumpScope": [1.15, 1.4, 1.55], "specialties": ["Dressage", "Showjumping", "Hunters"]}, {"name": "Connemara Pony", "id": "connemara_pony", "code": "CON", "category": "Sport Pony", "height": ["12.2", "14.2"], "reference": {"jumping": 90, "dressage": 79, "eventing": 90, "hunter": 93}, "jumpScope": [1.05, 1.3, 1.4], "specialties": ["Pony Jumping", "Eventing", "Hunters"]}, {"name": "Shetland Pony", "id": "shetland_pony", "code": "SHET", "category": "Small Pony", "height": ["7.0", "10.2"], "reference": {"jumping": 43, "dressage": 57, "eventing": 46, "hunter": 60}, "jumpScope": [0.3, 0.6, 0.75], "specialties": ["Pony Management", "In-hand/Driving where supported"]}, {"name": "Icelandic Horse", "id": "icelandic_horse", "code": "ICE", "category": "Gaited/Northern Horse", "height": ["12.3", "14.2"], "reference": {"jumping": 60, "dressage": 74, "eventing": 68, "hunter": 66}, "jumpScope": [0.5, 0.9, 1.1], "specialties": ["Gaited Riding", "General Riding"]}, {"name": "Haflinger", "id": "haflinger", "code": "HAF", "category": "Light Draft/Riding Horse", "height": ["13.2", "15.1"], "reference": {"jumping": 71, "dressage": 79, "eventing": 74, "hunter": 80}, "jumpScope": [0.8, 1.1, 1.25], "specialties": ["General Riding", "Dressage", "Driving"]}, {"name": "Cleveland Bay", "id": "cleveland_bay", "code": "CB", "category": "Carriage/Sport Horse", "height": ["16.0", "16.3"], "reference": {"jumping": 76, "dressage": 80, "eventing": 76, "hunter": 78}, "jumpScope": [1.05, 1.3, 1.45], "specialties": ["Driving", "Dressage", "Hunters"]}, {"name": "Norwegian Fjord", "id": "norwegian_fjord", "code": "NF", "category": "Northern Riding/Driving Horse", "height": ["13.1", "14.3"], "reference": {"jumping": 65, "dressage": 72, "eventing": 71, "hunter": 74}, "jumpScope": [0.65, 1.0, 1.15], "specialties": ["General Riding", "Driving", "Dressage"]}, {"name": "Andalusian / PRE", "id": "andalusian_pre", "code": "PRE", "category": "Iberian/Baroque Horse", "height": ["15.0", "16.3"], "reference": {"jumping": 72, "dressage": 95, "eventing": 70, "hunter": 74}, "jumpScope": [0.85, 1.15, 1.35], "specialties": ["Dressage", "Classical Riding"]}, {"name": "Lusitano", "id": "lusitano", "code": "LUS", "category": "Iberian/Baroque Horse", "height": ["15.0", "16.3"], "reference": {"jumping": 79, "dressage": 95, "eventing": 80, "hunter": 77}, "jumpScope": [1.0, 1.3, 1.45], "specialties": ["Dressage", "Classical Riding", "Versatile Sport"]}, {"name": "Akhal-Teke", "id": "akhal_teke", "code": "AT", "category": "Light Athletic Horse", "height": ["15.0", "16.2"], "reference": {"jumping": 85, "dressage": 82, "eventing": 89, "hunter": 76}, "jumpScope": [1.15, 1.4, 1.55], "specialties": ["Eventing", "Showjumping", "Endurance"]}, {"name": "Morgan", "id": "morgan", "code": "MOR", "category": "Versatile Riding Horse", "height": ["14.1", "16.1"], "reference": {"jumping": 77, "dressage": 83, "eventing": 79, "hunter": 83}, "jumpScope": [1.0, 1.25, 1.4], "specialties": ["Dressage", "Hunters", "General Riding"]}, {"name": "Tennessee Walking Horse", "id": "tennessee_walking_horse", "code": "TWH", "category": "Gaited Horse", "height": ["14.2", "17.0"], "reference": {"jumping": 61, "dressage": 65, "eventing": 63, "hunter": 70}, "jumpScope": [0.65, 0.95, 1.1], "specialties": ["Gaited Riding", "Trail Riding"]}, {"name": "Gypsy Cob", "id": "gypsy_cob", "code": "GCOB", "category": "Cob/Driving Horse", "height": ["13.0", "16.1"], "reference": {"jumping": 66, "dressage": 71, "eventing": 68, "hunter": 79}, "jumpScope": [0.65, 1.05, 1.2], "specialties": ["General Riding", "Driving", "Hunters"]}, {"name": "Clydesdale", "id": "clydesdale", "code": "CLY", "category": "Heavy Draft", "height": ["16.0", "18.0"], "reference": {"jumping": 49, "dressage": 59, "eventing": 48, "hunter": 63}, "jumpScope": [0.45, 0.8, 1.0], "specialties": ["Draft Work", "Driving"]}, {"name": "Shire", "id": "shire", "code": "SHI", "category": "Heavy Draft", "height": ["16.2", "19.0"], "reference": {"jumping": 41, "dressage": 55, "eventing": 42, "hunter": 60}, "jumpScope": [0.35, 0.75, 0.9], "specialties": ["Draft Work", "Driving"]}, {"name": "Percheron", "id": "percheron", "code": "PER", "category": "Heavy Draft", "height": ["15.2", "18.0"], "reference": {"jumping": 53, "dressage": 63, "eventing": 54, "hunter": 67}, "jumpScope": [0.5, 0.9, 1.05], "specialties": ["Driving", "General Riding"]}, {"name": "Belgian Draft", "id": "belgian_draft", "code": "BDR", "category": "Heavy Draft", "height": ["16.0", "18.0"], "reference": {"jumping": 44, "dressage": 57, "eventing": 45, "hunter": 63}, "jumpScope": [0.4, 0.75, 0.95], "specialties": ["Draft Work", "Driving"]}, {"name": "Standardbred", "id": "standardbred", "code": "STB", "category": "Racing/Driving Horse", "height": ["14.2", "17.0"], "reference": {"jumping": 67, "dressage": 68, "eventing": 78, "hunter": 69}, "jumpScope": [0.75, 1.05, 1.25], "specialties": ["Harness Racing", "Driving", "General Riding"]}, {"name": "Mustang", "id": "mustang", "code": "MUS", "category": "Versatile Range Horse", "height": ["13.0", "15.3"], "reference": {"jumping": 73, "dressage": 71, "eventing": 81, "hunter": 79}, "jumpScope": [0.85, 1.15, 1.35], "specialties": ["Eventing", "Hunters", "General Riding"]}, {"name": "Miniature Horse", "id": "miniature_horse", "code": "MINI", "category": "Miniature Horse", "height": ["7.0", "9.2"], "reference": {"jumping": 36, "dressage": 50, "eventing": 31, "hunter": 48}, "jumpScope": [0.2, 0.45, 0.6], "specialties": ["In-hand", "Driving", "Management"]}, {"name": "Pony of the Americas", "id": "pony_of_the_americas", "code": "POA", "category": "Sport/Stock Pony", "height": ["11.2", "14.0"], "reference": {"jumping": 79, "dressage": 74, "eventing": 82, "hunter": 84}, "jumpScope": [0.9, 1.15, 1.3], "specialties": ["Pony Hunters", "Pony Jumping", "Eventing"]}, {"name": "Australian Stock Horse", "id": "australian_stock_horse", "code": "ASH", "category": "Stock/Sport Horse", "height": ["14.0", "16.2"], "reference": {"jumping": 83, "dressage": 79, "eventing": 91, "hunter": 84}, "jumpScope": [1.05, 1.3, 1.45], "specialties": ["Eventing", "Jumping", "Stock Riding"]}, {"name": "Lipizzaner", "id": "lipizzaner", "code": "LIP", "category": "Classical Dressage Horse", "height": ["14.2", "16.2"], "reference": {"jumping": 65, "dressage": 96, "eventing": 67, "hunter": 71}, "jumpScope": [0.7, 1.0, 1.2], "specialties": ["Dressage", "Classical Riding"]}, {"name": "Noriker", "id": "noriker", "code": "NOR", "category": "Heavy Draft", "height": ["15.0", "17.1"], "reference": {"jumping": 56, "dressage": 70, "eventing": 59, "hunter": 70}, "jumpScope": [0.55, 0.9, 1.1], "specialties": ["Driving", "General Riding"]}, {"name": "Finnhorse", "id": "finnhorse", "code": "FIN", "category": "Versatile Northern Horse", "height": ["14.3", "16.1"], "reference": {"jumping": 79, "dressage": 82, "eventing": 85, "hunter": 85}, "jumpScope": [1.0, 1.25, 1.4], "specialties": ["Dressage", "Eventing", "Jumping", "Driving"]}];
const Breed94=new Map(BREED94_DEFINITIONS.map(p=>[p.name,p]));
for(const p of Breed94.values()){
 if(BREEDS.includes(p.name))throw Error('Breed expansion would replace '+p.name);
 BREEDS.push(p.name);BREED_BRANDINGS[p.name]=p.code;
 BREED_NORMS[p.name]={minHeight:Number(p.height[0]),maxHeight:Number(p.height[1]),mainPotential:p.specialties.join(' / ')};
 p.model=/Draft|Noriker|Gypsy|Shire|Clydesdale|Percheron/.test(p.category+' '+p.name)?'Draft':/Pony|Shetland|Icelandic|Haflinger|Fjord|Miniature/.test(p.name)?'Pony':/Akhal|Standardbred|Mustang/.test(p.name)?'Thoroughbred':'Warmblood';
 p.classification=/Pony|Shetland|Miniature/.test(p.name)?'Pony':'Horse';
 p.ridden=p.name!=='Miniature Horse';p.source='User supplied 8.8 fictional game-balance reference; not a biological maximum';
}
function breed94Inches(hh){const n=Number.parseFloat(hh);return Math.floor(n)*4+Math.round((n-Math.floor(n))*10);}
function breed94Hands(inches){return Math.floor(inches/4)+'.'+(inches%4)+' hh';}
const BREED94_HEIGHT=heightFromBreed;
heightFromBreed=function(breed){
 const p=Breed94.get(breed);if(!p)return BREED94_HEIGHT(breed);
 const min=breed94Inches(p.height[0]),max=breed94Inches(p.height[1]),roll=Math.random(),centered=roll<.5?Math.sqrt(roll/2):1-Math.sqrt((1-roll)/2);
 return breed94Hands(min+Math.round(centered*(max-min)));
};
function breed94Potential(h,inherited=false){
 const p=Breed94.get(h.breed);if(!p)return null;
 if(h.athleticPotential94?.breed===h.breed)return h.athleticPotential94;
 const random=coat94Rng(h.id+':athletic94:'+h.breed),roll=random(),category=roll<.95?'Normal':roll<.99?'Exceptional':roll<.999?'Very Exceptional':'Extraordinary';
 const range=category==='Normal'?[0,0]:category==='Exceptional'?[4,8]:category==='Very Exceptional'?[9,13]:[14,18],bonus=range[0]+Math.floor(random()*(range[1]-range[0]+1));
 const targets=[...DISCIPLINES].sort((a,b)=>p.reference[b]-p.reference[a]),target=targets[Math.floor(random()*targets.length)],shared=(random()+random()-1)*5,values={},subskills={};
 for(const d of DISCIPLINES){const base=inherited&&Number.isFinite(h.potential?.[d])?h.potential[d]:p.reference[d],variation=(random()+random()+random()-1.5)*8;values[d]=Math.max(0,Math.min(100,Math.round(base+shared+variation+(d===target?bonus:0))));subskills[d]={};for(const key of Object.keys(h.stats?.[d]||{}))subskills[d][key]=Math.max(0,Math.min(100,Math.round(values[d]+(random()+random()-1)*7)));}
 const [low,high,exception]=p.jumpScope,normalScope=low+(high-low)*(random()+random())/2;
 const jumpScope=category==='Normal'||target!=='jumping'?normalScope:high+(exception-high)*(bonus/range[1]);
 const mature=h.height || heightFromBreed(h.breed);
 const out={v:1,breed:h.breed,ridden:p.ridden&&breed94Inches(mature)>=40,category,target,bonus,potential:values,subskills,jumpScope:Math.round(jumpScope*100)/100,projectedMatureHeight:mature,source:p.source,inherited};
 h.athleticPotential94=out;h.extraPotential=category!=='Normal';h.potential={...h.potential,...values};
 // Initial technical schooling remains independent of potential and below individual ceilings.
 if(!inherited)for(const [d,skills]of Object.entries(h.stats||{}))if(values[d]!=null)for(const key of Object.keys(skills))skills[key]=Math.max(0,Math.min(skills[key],(subskills[d][key]??values[d])-(random()*4+1)));
 return out;
}
const BREED94_ASSIGN=careerAssignBreedPotential;
careerAssignBreedPotential=function(h,inherited=false){if(Breed94.has(h?.breed))return breed94Potential(h,inherited);return BREED94_ASSIGN(h,inherited);};
const BREED94_APPLY=applyBreedPotential;
applyBreedPotential=function(h){if(Breed94.has(h?.breed)){breed94Potential(h,!!h.damId);return;}return BREED94_APPLY(h);};
const BREED94_LEVEL=highestAllowedLevelIndex;
highestAllowedLevelIndex=function(h,d){
 const index=BREED94_LEVEL(h,d),athlete=breed94Athlete(h);
 if(!athlete)return index;
 if(athlete.ridden===false)return -1;
 const potential=d==='eventing'?Math.min(h.potential.eventing,(h.potential.dressage+h.potential.jumping)/2):h.potential[d];
 let ceiling=0;SHOW_LEVELS[d].forEach((level,i)=>{if(potential>=requiredSkillBand(d,level)[0])ceiling=i;});
 if(d!=='jumping')return Math.min(index,ceiling);
 const scoped=SHOW_LEVELS.jumping.findLastIndex(level=>Number(level)<=athlete.jumpScope+1e-9);return Math.min(index,ceiling,scoped);
};
const BREED94_RIDE=canRideUnderSaddle;
canRideUnderSaddle=function(h,...args){if(Breed94.get(h?.breed)?.ridden===false||breed94Athlete(h)?.ridden===false)return false;return BREED94_RIDE(h,...args);};
const BREED94_ELIGIBILITY=careerEligibility;
careerEligibility=function(event,rider,h,options={}){
 const individual=breed94Athlete(h);
 if((Breed94.has(h?.breed)||individual)&&!event.allocated){const p=Breed94.get(h.breed);if(p?.ridden===false||individual?.ridden===false)return 'This breed uses existing in-hand, breeding and management activities rather than ridden competition.';if(event.discipline==='jumping'&&individual&&Number(event.level)>individual.jumpScope+1e-9)return 'This class exceeds this horse’s individual competitive jumping scope.';}
 return BREED94_ELIGIBILITY(event,rider,h,options);
};
function breed94Growth(h){
 const a=h.athleticPotential94;if(!a)return;
 const mature=breed94Inches(a.projectedMatureHeight),age=h.birthDate?Math.max(0,(pastureCalendarHour()-pastureCalendarHour(h.birthDate.year,h.birthDate.month,h.birthDate.day||1,0))/(360*24)):Math.max(0,h.age||0);
 const fraction=age>=3?1:age<1?.60+.26*age:age<2?.86+.10*(age-1):.96+.04*(age-2);
 const current=Math.round(mature*fraction);h.height=breed94Hands(current);h.measuredHeightCm=Math.round(current*2.54*100)/100;
}
const BREED94_TRAITS=applyBreedTraits;
applyBreedTraits=function(h,...args){const out=BREED94_TRAITS(h,...args);if(Breed94.has(h?.breed)&&!globalThis.coat94Loading)breed94Potential(h,!!h.damId);return out;};
const BREED94_NPC=careerNpcHorse;
careerNpcHorse=function(rider,suffix,year,used,kind=suffix){
 const h=BREED94_NPC(rider,suffix,year,used,kind),random=coat94Rng(h.id+':new-breed94');
 if(random()<.22){
  const choices=[...Breed94.values()].filter(p=>p.ridden&&(kind==='pony'?/Pony/.test(p.name):p.classification==='Horse'));
  if(choices.length){const weights=Object.fromEntries(choices.map(p=>[p.name,Math.max(1,p.reference[rider.specialty]-45)]));h.breed=coat94Pick(weights,random);const p=Breed94.get(h.breed),lo=breed94Inches(p.height[0]),hi=breed94Inches(p.height[1]);h.height=breed94Hands(lo+Math.round((random()+random())/2*(hi-lo)));h.potential={...p.reference};breed94Potential(h);for(const d of DISCIPLINES)h.skills[d]=Math.min(h.skills[d],h.potential[d]);breed94Growth(h);}
 }
 return h;
};
const BREED94_GROUP=auction86Group;
auction86Group=function(breed){const p=Breed94.get(breed);if(!p)return BREED94_GROUP(breed);return /Pony|Shetland|Miniature/.test(breed)?'Pony':/Warmblood|Sport Horse|Spotted Sport/.test(p.category)?'Warmblood':'Exotic';};

const BREED94_AUCTION=auction86Horse;
auction86Horse=function(...args){const h=BREED94_AUCTION(...args);if(h.athleticPotential94)breed94Growth(h);coat94Ensure(h);return h;};
function breed94Finalize(h,initial=false){
 const a=h?.athleticPotential94;if(!a)return;
 const random=coat94Rng(h.id+':subskills94');
 for(const [d,skills]of Object.entries(h.stats||{}))if(a.potential[d]!=null){a.subskills[d]||={};for(const key of Object.keys(skills)){a.subskills[d][key]??=Math.max(0,Math.min(100,Math.round(a.potential[d]+(random()+random()-1)*7)));if(initial)skills[key]=Math.max(0,Math.min(skills[key],a.subskills[d][key]-(random()*4+1)));}}
}

function breed94Athlete(h){const a=h?.athleticPotential94;return a&&(a.breed===h.breed||String(h.breed).includes('%')&&Object.hasOwn(breedPercentages(h.breed),a.breed))?a:null;}
const BREED94_AUCTION_LEVEL=auctionLevel;
auctionLevel=function(h,d,potential=false){if(!potential&&breed94Athlete(h)&&highestAllowedLevelIndex(h,d)<0)return 'Unstarted';return BREED94_AUCTION_LEVEL(h,d,potential);};
function breed94Foal(h,dam,sire){
 const pa=breed94Athlete(dam),pb=breed94Athlete(sire),registered=Breed94.has(h.breed);
 if(!registered&&!pa&&!pb)return;
 const random=coat94Rng(h.id+':inherited-athlete94');let a=registered?breed94Potential(h,true):null;
 if(!a){
  const roll=random(),category=roll<.95?'Normal':roll<.99?'Exceptional':roll<.999?'Very Exceptional':'Extraordinary',bounds=category==='Normal'?[0,0]:category==='Exceptional'?[4,8]:category==='Very Exceptional'?[9,13]:[14,18],bonus=bounds[0]+Math.floor(random()*(bounds[1]-bounds[0]+1)),target=DISCIPLINES[Math.floor(random()*DISCIPLINES.length)],potential={...h.potential};
  potential[target]=Math.min(100,potential[target]+bonus);a=h.athleticPotential94={v:1,breed:h.breed,inherited:true,category,target,bonus,potential,subskills:{},jumpScope:(pa?.jumpScope??pb?.jumpScope??1),projectedMatureHeight:h.height,source:'Parent-derived genetic potential and physical scope; controlled individual variation'};h.potential={...potential};h.extraPotential=category!=='Normal';
 }
 const mature=[pa?.projectedMatureHeight||dam?.height,pb?.projectedMatureHeight||sire?.height].filter(Boolean).map(breed94Inches).filter(Number.isFinite);
 if(mature.length===2)a.projectedMatureHeight=breed94Hands(Math.max(20,Math.round((mature[0]+mature[1])/2+(random()-.5)*2)));
 const scopes=[pa?.jumpScope,pb?.jumpScope].filter(Number.isFinite);if(scopes.length)a.jumpScope=Math.max(.2,Math.min(1.8,Math.round((scopes.reduce((n,v)=>n+v,0)/scopes.length+(random()-.5)*.1)*100)/100));
 a.ridden=Breed94.get(h.breed)?.ridden!==false&&breed94Inches(a.projectedMatureHeight)>=40;
 h.birthDate={year:app.year,month:app.month,day:app.day};breed94Finalize(h);breed94Growth(h);
}
