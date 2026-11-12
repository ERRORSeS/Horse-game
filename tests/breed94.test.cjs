const {check}=require('./behavior5-harness.cjs');
check('all thirty new breeds coexist with the old roster, unique IDs and original brands',`{
 if(BREED94_DEFINITIONS.length!==30||new Set(BREED94_DEFINITIONS.map(p=>p.id)).size!==30||new Set(BREEDS).size!==BREEDS.length)throw Error('duplicate or missing breed');
 for(const p of BREED94_DEFINITIONS)if(!BREEDS.includes(p.name)||BREED_BRANDINGS[p.name]!==p.code||!BREED_NORMS[p.name]||!coat94Profile(p.name))throw Error('display-only breed '+p.name);
 if(BREED_BRANDINGS['Belgian Warmblood']!=='BW'||BREED_BRANDINGS['Bavarian Warmblood']!=='BW'||BREED_BRANDINGS['Dutch Warmblood']!=='DDW')throw Error('changed original brand');
 for(const name of ['Draft','Iberian Horse','Riding Pony','Friesian',...Object.keys(CAREER_WELSH)])if(!BREEDS.includes(name))throw Error('replaced old breed');
}`);
check('new breed heights use valid hands notation and center-weighted ranges',`{
 const random=Math.random;try{for(const p of Breed94.values()){
  Math.random=coat94Rng(p.name+':height-test');const counts=new Map(),lo=breed94Inches(p.height[0]),hi=breed94Inches(p.height[1]);let middle=0,edge=0;
  for(let i=0;i<10000;i++){const height=heightFromBreed(p.name),inch=breed94Inches(height);if(!/^\\d+\\.[0-3] hh$/.test(height)||inch<lo||inch>hi)throw Error('invalid height '+p.name+' '+height);if(inch>=lo+(hi-lo)*.3&&inch<=lo+(hi-lo)*.7)middle++;if(inch<=lo+(hi-lo)*.1||inch>=lo+(hi-lo)*.9)edge++;}
  if(middle<=edge)throw Error('uniform or extreme-biased heights '+p.name);
 }}finally{Math.random=random;}
}`);
check('new founders have independent permanent potential, real subskill variation and appropriate physical scope',`{
 resetGame();const breeds=[...BREEDS];try{for(const p of Breed94.values()){
  BREEDS.splice(0,BREEDS.length,p.name);const h=baseHorse('untrained','player'),a=h.athleticPotential94;if(!a||a.breed!==p.name)throw Error('missing athlete '+p.name);
  if(Object.values(a.potential).some(v=>v<0||v>100)||a.jumpScope>p.jumpScope[2]+1e-9)throw Error('invalid potential/scope');
  for(const [d,skills]of Object.entries(h.stats)){if(!a.subskills[d]||Object.keys(a.subskills[d]).length!==Object.keys(skills).length)throw Error('subskills missing '+p.name+' '+d);if(Object.values(skills).some(v=>v>70))throw Error('untrained founder initialized at potential');}
  const before=JSON.stringify(a);applyBreedPotential(h);careerAssignBreedPotential(h);h.owner='Sale Barn';applyBreedPotential(h);if(JSON.stringify(h.athleticPotential94)!==before)throw Error('potential rerolled '+p.name);
 }}finally{BREEDS.splice(0,BREEDS.length,...breeds);}
}`);
check('rarity categories follow the requested distribution and enhancements are discipline-specific',`{
 const counts={Normal:0,Exceptional:0,'Very Exceptional':0,Extraordinary:0};for(let i=0;i<20000;i++){
  const h={id:'exception94:'+i,breed:'Irish Sport Horse',height:'16.1 hh',potential:{jumping:1,dressage:1,eventing:1,hunter:1},stats:{}};const a=breed94Potential(h);counts[a.category]++;
  if(a.category!=='Normal'&&(!DISCIPLINES.includes(a.target)||a.bonus<4||a.bonus>18))throw Error('bad exceptional bonus');
 }
 for(const [key,p]of [['Normal',.95],['Exceptional',.04],['Very Exceptional',.009],['Extraordinary',.001]])if(Math.abs(counts[key]-20000*p)>6*Math.sqrt(20000*p*(1-p))+4)throw Error('rarity '+key+' '+counts[key]);
}`);
check('inherited potential follows parent-derived values and miniature horses do not receive ridden careers',`{
 resetGame();const h={id:'inherited94',breed:'Zangersheide',height:'16.2 hh',potential:{jumping:25,dressage:25,eventing:25,hunter:25},stats:{}};breed94Potential(h,true);if(Object.values(h.potential).some(v=>v>60))throw Error('foal rerolled to breed centers');
 const mini=baseHorse('trained','player');mini.breed='Miniature Horse';mini.height='8.2 hh';delete mini.athleticPotential94;breed94Potential(mini);mini.age=10;mini.manualRidabilityOverride=true;mini.behavior=900;if(canRideUnderSaddle(mini)||highestAllowedLevelIndex(mini,'jumping')!==-1)throw Error('miniature granted ridden jumping');
 const youngster={id:'grow94',breed:'Norwegian Fjord',age:0,birthDate:{year:app.year,month:app.month,day:app.day},height:'14.0 hh',potential:{},stats:{}};breed94Potential(youngster);breed94Growth(youngster);if(breed94Inches(youngster.height)>=breed94Inches(youngster.athleticPotential94.projectedMatureHeight))throw Error('newborn at adult height');
}`);
check('real foaling saves parent-derived body genes, crossbred athletic potential and growth',`{
 resetGame();const mare=app.horses[0],sire=app.horses[1];mare.gender='Mare';sire.gender='Stallion';mare.breed='Irish Sport Horse';sire.breed='Zangersheide';
 for(const p of [mare,sire]){p.age=10;delete p.athleticPotential94;breed94Potential(p);p.coatGenetics94=coat94Founder(p.breed,p.id+':modern-foal',10);p.coatGenetics94.genes.extension='e/e';p.coatGenetics94.genes.frame='N/N';p.coatGenetics94.genes.kit='N/N';p.coatGenetics94.primary=coat94PrimaryFromGenes(p.coatGenetics94.genes,p.coatGenetics94.appearance).id;delete p.coatGenetics94.fixedPatterns;coat94Freeze(p.coatGenetics94,10);}
 mare.pregnantBy=sire.name;mare.pregnancyDays=319;mare.pregnancyLossCheckedDays=[];const daily=getDailyFoalingState,random=Math.random,newborns=[];
 try{getDailyFoalingState=()=>({laborLikely:true,fakeLabor:false});Math.random=()=>.5;processPregnancy(mare,newborns,1);}finally{getDailyFoalingState=daily;Math.random=random;}
 if(newborns.length!==1)throw Error('foal not born');const foal=newborns[0];if(foal.coatGenetics94?.origin!=='inherited'||foal.coatGenetics94.genes.extension!=='e/e'||!foal.athleticPotential94?.inherited||!foal.birthDate||breed94Inches(foal.height)>=breed94Inches(foal.athleticPotential94.projectedMatureHeight))throw Error('lost inherited data');
 app.horses.push(foal);const before=JSON.stringify({coat:foal.coatGenetics94,athlete:foal.athleticPotential94,height:foal.height});hydrateFromSave(JSON.parse(serializeAppState()));const loaded=app.horses.find(h=>h.id===foal.id);if(JSON.stringify({coat:loaded.coatGenetics94,athlete:loaded.athleticPotential94,height:loaded.height})!==before)throw Error('foal rerolled on reload');
}`);
