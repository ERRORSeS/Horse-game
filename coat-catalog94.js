/* Coat-only data. Dedicated face/leg marking registries and generators are intentionally unused. */
const Coat94={version:1,primary:new Map(),patterns:new Map(),profiles:new Map(),shades:['Light','Medium','Dark'],expressions:['Minimal','Medium','Maximal']};
Coat94.sources={genetics:'https://vgl.ucdavis.edu/resources/horse-coat-color',cream:'https://vgl.ucdavis.edu/test/cream',pearl:'https://vgl.ucdavis.edu/test/pearl',silver:'https://vgl.ucdavis.edu/test/silver',mushroom:'https://vgl.ucdavis.edu/test/mushroom',white:'https://vgl.ucdavis.edu/test/dominant-white-horse',camarillo:'https://vgl.ucdavis.edu/test/camarillo-white',lp:'https://vgl.ucdavis.edu/test/appaloosa-pattern-1',fjord:'https://www.nfhr.com/catalog/index.php?breedstd=1',welsh:'https://www.wpcs.uk.com/welsh-mountain-pony',cleveland:'https://clevelandbay.org/wp/?page_id=114'};
function coat94Id(name){return String(name).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');}
function coat94Primary(name,base,recipe={},family=name,visual={}){
 const id=coat94Id(name);const p={id,name,base,family,recipe:{base,...recipe},visual,shadeNames:Coat94.shades,source:Coat94.sources.genetics};Coat94.primary.set(id,p);return p;
}
for(const [name,base,family,visual]of [
 ['Bay','bay','Bay',{}],['Blood Bay','bay','Bay',{bay:'blood'}],['Mahogany Bay','bay','Bay',{bay:'mahogany'}],['Wild Bay','bay','Bay',{bay:'wild'}],['Seal Brown','bay','Brown',{bay:'seal'}],['Very Dark Brown','bay','Brown',{bay:'very_dark'}],
 ['Chestnut','chestnut','Chestnut',{}],['Sorrel','chestnut','Chestnut',{chestnut:'sorrel'}],['Copper Chestnut','chestnut','Chestnut',{chestnut:'copper'}],['Golden Chestnut','chestnut','Chestnut',{chestnut:'golden'}],['Liver Chestnut','chestnut','Chestnut',{chestnut:'liver'}],['Flaxen Chestnut','chestnut','Chestnut',{flaxen:true}],
 ['Black','black','Black',{}],['Fading Black','black','Black',{fading:'fading'}],['Non-Fading Black','black','Black',{fading:'non_fading'}],['Jet Black','black','Black',{fading:'jet'}],['Sun-Faded Black','black','Black',{fading:'sun_faded'}]
])coat94Primary(name,base,{},family,visual);
for(const [name,base,cream]of [['Palomino','chestnut','Cr/N'],['Buckskin','bay','Cr/N'],['Smoky Black','black','Cr/N'],['Cremello','chestnut','Cr/Cr'],['Perlino','bay','Cr/Cr'],['Smoky Cream','black','Cr/Cr'],['Pearl Dilute Chestnut','chestnut','Prl/Prl'],['Pearl Dilute Bay','bay','Prl/Prl'],['Pearl Dilute Black','black','Prl/Prl'],['Palomino Pearl','chestnut','Cr/Prl'],['Buckskin Pearl','bay','Cr/Prl'],['Cream Pearl','black','Cr/Prl']])coat94Primary(name,base,{cream},/Pearl/.test(name)?'Pearl':/Cr\/Cr/.test(cream)?'Double Cream':name);
coat94Primary('Chocolate Palomino','chestnut',{cream:'Cr/N'},'Palomino',{sooty:true});
coat94Primary('Golden Palomino','chestnut',{cream:'Cr/N'},'Palomino',{golden:true});
coat94Primary('Golden Buckskin','bay',{cream:'Cr/N'},'Buckskin',{golden:true});
coat94Primary('Sooty Palomino','chestnut',{cream:'Cr/N'},'Palomino',{sooty:true});
coat94Primary('Sooty Buckskin','bay',{cream:'Cr/N'},'Buckskin',{sooty:true});
for(const [name,base,cream]of [['Bay Dun','bay','N/N'],['Brown Dun','bay','N/N'],['Red Dun','chestnut','N/N'],['Chestnut Dun','chestnut','N/N'],['Grullo','black','N/N'],['Grey Dun','black','N/N'],['Dunskin','bay','Cr/N'],['White Dun','bay','Cr/N'],['Dunalino','chestnut','Cr/N'],['Yellow Dun','chestnut','Cr/N'],['Smoky Grullo','black','Cr/N']])coat94Primary(name,base,{cream,dun:true},'Dun');
for(const [name,base,visual]of [['Gold Champagne','chestnut',{}],['Amber Champagne','bay',{}],['Classic Champagne','black',{}],['Sable Champagne','bay',{bay:'seal'}]])coat94Primary(name,base,{champagne:true},'Champagne',visual);
for(const [name,base,recipe]of [['Silver Black','black',{}],['Silver Bay','bay',{}],['Silver Brown','bay',{}],['Silver Grullo','black',{dun:true}],['Silver Bay Dun','bay',{dun:true}],['Mushroom Chestnut','chestnut',{mushroom:true}],['Mushroom Bay','bay',{mushroom:true}]])coat94Primary(name,base,{...recipe,...(!name.startsWith('Mushroom')?{silver:true}:{})},name.startsWith('Silver')?'Silver':'Mushroom',name==='Silver Brown'?{bay:'seal'}:{});
for(const base of ['Bay','Chestnut']){coat94Primary('Sooty '+base,base.toLowerCase(),{},base,{sooty:true});coat94Primary('Mealy '+base,base.toLowerCase(),{},base,{pangare:true});}
coat94Primary('Dominant White','bay',{white:'W5'},'White');coat94Primary('Camarillo White','bay',{white:'W4'},'White');
function coat94CompoundName(base,cream,dun,silver,champagne,mushroom){
 let name=base==='chestnut'?'Chestnut':base==='black'?'Black':'Bay';
 if(cream==='Cr/N')name={chestnut:'Palomino',bay:'Buckskin',black:'Smoky Black'}[base];
 if(cream==='Cr/Cr')name={chestnut:'Cremello',bay:'Perlino',black:'Smoky Cream'}[base];
 if(cream==='Prl/Prl')name='Pearl Dilute '+name;
 if(cream==='Cr/Prl')name={chestnut:'Palomino Pearl',bay:'Buckskin Pearl',black:'Cream Pearl'}[base];
 if(dun)name=cream==='N/N'?{chestnut:'Red Dun',bay:'Bay Dun',black:'Grullo'}[base]:cream==='Cr/N'?{chestnut:'Dunalino',bay:'Dunskin',black:'Smoky Grullo'}[base]:name+' Dun';
 if(champagne){const label={chestnut:'Gold',bay:'Amber',black:'Classic'}[base];name=cream==='N/N'?(dun?label+' Dun Champagne':label+' Champagne'):label+' '+name+' Champagne';}
 if(silver&&base!=='chestnut')name='Silver '+(name==='Black'?'Black':name);
 if(mushroom&&base!=='black')name='Mushroom '+name;
 return name;
}
for(const base of ['bay','chestnut','black'])for(const cream of ['N/N','Cr/N','Cr/Cr','Prl/Prl','Cr/Prl'])for(const dun of [false,true])for(const silver of [false,true])for(const champagne of [false,true])for(const mushroom of [false,true]){
 if(silver&&base==='chestnut'||mushroom&&base==='black')continue;
 const name=coat94CompoundName(base,cream,dun,silver,champagne,mushroom),id=coat94Id(name);
 if(!Coat94.primary.has(id))coat94Primary(name,base,{cream,dun,silver,champagne,mushroom},'Combined dilution');
}
const COAT94_PATTERN_DEFS=[
 ['None','none',null,[100,0,0]],['Tobiano','pinto','TO',[20,55,25]],['Frame Overo','pinto','O',[35,50,15]],['Splashed White','pinto','SW1',[35,45,20]],['Sabino','pinto','SB1',[50,35,15]],['Sabino White','pinto','SB1/SB1',[0,0,100]],['Sabino-like Roaning','complex',null,[50,35,15]],
 ['Classic Roan','roan','RN',[35,45,20]],['Progressive Grey','grey','G',[100,0,0]],['Leopard Complex','lp','LP',[40,45,15]],['Rabicano','complex',null,[55,35,10]],['Dominant White','white','KIT',[25,35,40]],['Tovero','combination',null,[20,55,25]],['Sooty','complex',null,[45,45,10]],['Pangare','complex',null,[45,45,10]],['Flaxen','complex',null,[25,55,20]],['Dappling','complex',null,[40,45,15]],['Brindle Texture','complex',null,[75,23,2]]
];
for(const [name,family,allele,expression]of COAT94_PATTERN_DEFS)Coat94.patterns.set(coat94Id(name),{id:coat94Id(name),name,family,allele,expression,source:Coat94.sources.genetics,inheritance:allele?'Known locus; expression varies':'Complex or incompletely understood appearance; not a fabricated single-gene trait'});
Coat94.lpSubtypes=['Blanket','Spotted Blanket','Snowcap','Leopard','Near Leopard','Fewspot Leopard','Near Fewspot','Snowflake','Frost','Varnish Roan','Mottled'];
Coat94.lpTables={
 '1:0':{'Blanket':20,'Spotted Blanket':25,'Snowflake':15,'Frost':10,'Varnish Roan':15,'Mottled':15},
 '1:1':{'Leopard':55,'Near Leopard':25,'Spotted Blanket':15,'Blanket':5},
 '2:0':{'Snowcap':55,'Near Fewspot':20,'Varnish Roan':15,'Frost':10},
 '2:1':{'Fewspot Leopard':65,'Near Fewspot':25,'Snowcap':10}
};
const COAT94_PALETTES={bay:['#b97b42','#934722','#50281d'],chestnut:['#d3a06a','#b66332','#673226'],black:['#51433b','#302e2c','#171a1f']};
function coat94Palette(primary,shade=1){
 const p=typeof primary==='string'?Coat94.primary.get(primary):primary;if(!p)return null;
 const recipe=p.recipe,c=recipe.cream||'N/N';let rgb=COAT94_PALETTES[p.base][shade].slice(1).match(/../g).map(h=>parseInt(h,16));
 const mix=(target,amount)=>{rgb=rgb.map((v,i)=>Math.round(v*(1-amount)+target[i]*amount));};
 if(recipe.white)mix([250,247,238],.98);
 if(c==='Cr/Cr'||c==='Cr/Prl')mix([248,239,212],[.92,.89,.85][shade]);else if(c==='Cr/N')mix([239,205,126],p.base==='black'?.12:.5);
 if(c==='Prl/Prl')mix([222,185,142],.68);if(recipe.dun)mix([204,178,132],.32);if(recipe.champagne)mix([224,184,133],.45);if(recipe.mushroom)mix([169,154,134],.48);if(recipe.silver&&p.base==='black')mix([130,110,98],.35);
 if(c==='Cr/Cr'||c==='Cr/Prl')rgb=rgb.map(v=>Math.max(190,v));
 const hex=a=>'#'+a.map(v=>v.toString(16).padStart(2,'0')).join('');
 return {body:hex(rgb),shadow:hex(rgb.map(v=>Math.round(v*.72))),highlight:hex(rgb.map(v=>Math.min(255,Math.round(v*.8+51)))),maneTail:c==='Cr/Cr'||c==='Cr/Prl'?'#eee7ce':recipe.silver?'#d2c4aa':p.visual.flaxen||p.base==='chestnut'&&c==='Cr/N'?'#eee0b4':p.base==='chestnut'?hex(rgb):'#24211f',bodyOnly:true};
}
for(const name of Coat94.lpSubtypes)Coat94.patterns.set(coat94Id(name),{id:coat94Id(name),name,family:'lp_subtype',parent:'leopard_complex',allele:'LP + PATN1',expression:[40,45,15],source:Coat94.sources.lp});
for(const name of ['Bay Roan','Red Roan','Blue Roan','Brown Roan','Dilute Roan'])Coat94.patterns.set(coat94Id(name),{id:coat94Id(name),name,family:'roan_subtype',parent:'classic_roan',expression:[35,45,20],source:Coat94.sources.genetics});
for(const name of ['Steel Grey','Dapple Grey','Light Grey','Nearly White Grey','Fleabitten Grey'])Coat94.patterns.set(coat94Id(name),{id:coat94Id(name),name,family:'grey_stage',parent:'progressive_grey',expression:[100,0,0],source:Coat94.sources.genetics});
for(const name of ['Tobiano Frame','Tobiano Splash','Tobiano Sabino','Sabino Roan'])Coat94.patterns.set(coat94Id(name),{id:coat94Id(name),name,family:'combination',expression:[20,55,25],source:Coat94.sources.genetics});
function coat94Rng(seed){let x=typeof seed==='number'?seed>>>0:HorseHealth.hash(String(seed));return ()=>{x=(x+0x6d2b79f5)|0;let y=Math.imul(x^(x>>>15),1|x);y^=y+Math.imul(y^(y>>>7),61|y);return ((y^(y>>>14))>>>0)/4294967296;};}
function coat94Pick(weights,random){const entries=Object.entries(weights);let draw=random()*entries.reduce((n,[,w])=>n+w,0);for(const [id,w]of entries){draw-=w;if(draw<0)return id;}return entries.at(-1)?.[0];}
function coat94Triplet(weights,random){return Number(coat94Pick(Object.fromEntries(weights.map((w,i)=>[i,w])),random));}
function coat94Registry(){return [...new Set([...BREEDS,...Object.keys(BREED_NORMS),...Object.keys(BREED_BRANDINGS)])];}
const COAT94_SUPPLIED_SEEDS={"Thoroughbred": {"Bay": 55.0, "Chestnut": 35.0, "Black": 10.0}, "Arabian": {"Bay": 45.0, "Chestnut": 45.0, "Black": 10.0}, "Dutch Warmblood": {"Bay": 50.0, "Chestnut": 25.0, "Black": 20.0, "Buckskin": 3.0, "Palomino": 2.0}, "Belgian Warmblood": {"Bay": 50.0, "Chestnut": 30.0, "Black": 20.0}, "Hanoverian": {"Bay": 55.0, "Chestnut": 25.0, "Black": 20.0}, "Holsteiner": {"Bay": 60.0, "Chestnut": 20.0, "Black": 20.0}, "Oldenburg": {"Bay": 45.0, "Chestnut": 30.0, "Black": 20.0, "Buckskin": 3.0, "Palomino": 2.0}, "Trakehner": {"Bay": 45.0, "Chestnut": 25.0, "Black": 30.0}, "Selle Français": {"Bay": 55.0, "Chestnut": 35.0, "Black": 10.0}, "Zangersheide": {"Bay": 50.0, "Chestnut": 30.0, "Black": 15.0, "Buckskin": 3.0, "Palomino": 2.0}, "Swedish Warmblood": {"Bay": 50.0, "Chestnut": 30.0, "Black": 20.0}, "Canadian Warmblood": {"Bay": 50.0, "Chestnut": 30.0, "Black": 20.0}, "Irish Sport Horse": {"Bay": 45.0, "Chestnut": 35.0, "Black": 20.0}, "Quarter Horse": {"Bay": 35.0, "Chestnut": 30.0, "Black": 10.0, "Buckskin": 9.0, "Palomino": 8.0, "Red Dun": 4.0, "Grullo": 2.0, "Smoky Black": 2.0}, "American Paint Horse": {"Bay": 37.0, "Chestnut": 33.0, "Black": 10.0, "Buckskin": 8.0, "Palomino": 7.0, "Red Dun": 3.0, "Grullo": 2.0}, "Appaloosa": {"Bay": 36.0, "Chestnut": 32.0, "Black": 12.0, "Buckskin": 8.0, "Palomino": 7.0, "Grullo": 3.0, "Red Dun": 2.0}, "Knabstrupper": {"Bay": 35.0, "Chestnut": 35.0, "Black": 30.0}, "Connemara Pony": {"Bay": 40.0, "Chestnut": 12.0, "Black": 12.0, "Buckskin": 20.0, "Palomino": 10.0, "Smoky Black": 6.0}, "Welsh Mountain Pony A": {"Bay": 35.0, "Chestnut": 40.0, "Black": 10.0, "Palomino": 8.0, "Buckskin": 5.0, "Dun": 2.0}, "Welsh Pony B": {"Bay": 40.0, "Chestnut": 35.0, "Black": 12.0, "Palomino": 6.0, "Buckskin": 5.0, "Dun": 2.0}, "Welsh Pony of Cob Type C": {"Bay": 40.0, "Chestnut": 38.0, "Black": 15.0, "Palomino": 4.0, "Buckskin": 3.0}, "Welsh Cob D": {"Bay": 42.0, "Chestnut": 40.0, "Black": 13.0, "Palomino": 3.0, "Buckskin": 2.0}, "Shetland Pony": {"Bay": 28.0, "Chestnut": 35.0, "Black": 25.0, "Palomino": 6.0, "Silver Black": 4.0, "Buckskin": 2.0}, "Icelandic Horse": {"Bay": 25.0, "Chestnut": 30.0, "Black": 22.0, "Silver Black": 10.0, "Silver Bay": 5.0, "Buckskin": 3.0, "Palomino": 3.0, "Dun": 2.0}, "Friesian": {"Black": 100.0}, "Haflinger": {"Chestnut": 100.0}, "Cleveland Bay": {"Bay": 100.0}, "Norwegian Fjord": {"Brown Dun": 90.0, "Red Dun": 5.0, "White Dun": 2.0, "Grey Dun": 2.0, "Yellow Dun": 1.0}, "Andalusian / PRE": {"Bay": 55.0, "Chestnut": 35.0, "Black": 10.0}, "Lusitano": {"Bay": 55.0, "Chestnut": 30.0, "Black": 15.0}, "Akhal-Teke": {"Bay": 40.0, "Chestnut": 30.0, "Black": 15.0, "Buckskin": 8.0, "Palomino": 5.0, "Cremello": 2.0}, "Morgan": {"Bay": 33.0, "Chestnut": 40.0, "Black": 20.0, "Palomino": 4.0, "Buckskin": 3.0}, "Tennessee Walking Horse": {"Bay": 32.0, "Chestnut": 30.0, "Black": 18.0, "Palomino": 8.0, "Buckskin": 7.0, "Silver Black": 3.0, "Gold Champagne": 2.0}, "Gypsy Cob": {"Bay": 37.0, "Chestnut": 33.0, "Black": 20.0, "Buckskin": 5.0, "Palomino": 5.0}, "Clydesdale": {"Bay": 60.0, "Chestnut": 17.0, "Black": 15.0, "Brown": 8.0}, "Shire": {"Black": 55.0, "Bay": 30.0, "Chestnut": 10.0, "Brown": 5.0}, "Percheron": {"Black": 75.0, "Bay": 20.0, "Chestnut": 5.0}, "Belgian Draft": {"Chestnut": 75.0, "Bay": 15.0, "Black": 10.0}, "Standardbred": {"Bay": 45.0, "Chestnut": 25.0, "Black": 25.0, "Brown": 5.0}, "Mustang": {"Bay": 30.0, "Chestnut": 30.0, "Black": 15.0, "Buckskin": 8.0, "Palomino": 7.0, "Bay Dun": 5.0, "Red Dun": 3.0, "Grullo": 2.0}, "Miniature Horse": {"Bay": 22.0, "Chestnut": 25.0, "Black": 15.0, "Buckskin": 10.0, "Palomino": 10.0, "Silver Black": 6.0, "Cremello": 4.0, "Perlino": 3.0, "Smoky Cream": 2.0, "Dun": 3.0}, "Pony of the Americas": {"Bay": 35.0, "Chestnut": 35.0, "Black": 15.0, "Buckskin": 10.0, "Palomino": 5.0}, "Australian Stock Horse": {"Bay": 40.0, "Chestnut": 30.0, "Black": 15.0, "Buckskin": 8.0, "Palomino": 4.0, "Dun": 3.0}, "Lipizzaner": {"Bay": 60.0, "Chestnut": 20.0, "Black": 20.0}, "Noriker": {"Bay": 30.0, "Chestnut": 30.0, "Black": 25.0, "Silver Black": 10.0, "Buckskin": 5.0}, "Finnhorse": {"Bay": 30.0, "Chestnut": 45.0, "Black": 18.0, "Silver Black": 4.0, "Palomino": 3.0}};
const COAT94_BREED_ALIASES={'Selle Francais':'Selle Français','Welsh Mountain Pony':'Welsh Mountain Pony A','Welsh Pony':'Welsh Pony B','Welsh Pony of Cob Type':'Welsh Pony of Cob Type C','Welsh Cob':'Welsh Cob D'};
const COAT94_EXTRA_SEEDS={
 'American Warmblood':{Bay:48,Chestnut:30,Black:18,Buckskin:2,Palomino:2},'Baden-Wuerttemberg':{Bay:54,Chestnut:29,Black:17},'Bavarian Warmblood':{Bay:52,Chestnut:30,Black:18},'Danish Warmblood':{Bay:50,Chestnut:28,Black:22},Gelderlander:{Bay:50,Chestnut:35,Black:15},Hessen:{Bay:52,Chestnut:28,Black:20},'Polish Warmblood':{Bay:48,Chestnut:32,Black:20},Rhineland:{Bay:48,Chestnut:30,Black:22},Westphalian:{Bay:50,Chestnut:27,Black:23},Zweibrucker:{Bay:50,Chestnut:30,Black:20},
 Draft:{Bay:35,Chestnut:40,Black:25},'Iberian Horse':{Bay:50,Chestnut:35,Black:15},'Riding Pony':{Bay:43,Chestnut:34,Black:15,Buckskin:5,Palomino:3},'Cross-Breed':{Bay:40,Chestnut:35,Black:15,Buckskin:5,Palomino:5},'Sport Cross':{Bay:48,Chestnut:32,Black:16,Buckskin:2,Palomino:2},Finnhorse:{Chestnut:90,Bay:8,Black:2}
};
const COAT94_SECONDARY_SEEDS={
 Thoroughbred:{progressive_grey:12,dominant_white:.08,rabicano:1},Arabian:{progressive_grey:35,rabicano:4,sooty:4,pangare:0},Friesian:{},Haflinger:{flaxen:100,dappling:4},'Cleveland Bay':{},'Norwegian Fjord':{pangare:30},
 'American Paint Horse':{tobiano:55,frame_overo:16,splashed_white:10,sabino:8,classic_roan:3,progressive_grey:3,dominant_white:.3,rabicano:2},'Quarter Horse':{tobiano:0,frame_overo:.3,splashed_white:1.5,sabino:1,classic_roan:8,progressive_grey:5,dominant_white:.1,rabicano:2},
 Appaloosa:{leopard_complex:85,classic_roan:1,progressive_grey:1,sabino:.5},Knabstrupper:{leopard_complex:90,progressive_grey:2,sabino:.5},'Pony of the Americas':{leopard_complex:92,progressive_grey:1,classic_roan:2},
 'Gypsy Cob':{tobiano:65,splashed_white:2,sabino:3,classic_roan:2,progressive_grey:3},'Icelandic Horse':{tobiano:20,classic_roan:4,progressive_grey:9},'Miniature Horse':{tobiano:25,frame_overo:4,splashed_white:4,sabino:5,leopard_complex:12,classic_roan:7,progressive_grey:10,dominant_white:.3},
 Clydesdale:{sabino_like_roaning:35,classic_roan:4,progressive_grey:1},Shire:{classic_roan:8,progressive_grey:5,sabino_like_roaning:2},Percheron:{progressive_grey:70},'Belgian Draft':{classic_roan:7,pangare:25,flaxen:30},Noriker:{leopard_complex:15,classic_roan:12,progressive_grey:5},
 'Connemara Pony':{progressive_grey:45,classic_roan:2},'Shetland Pony':{tobiano:15,classic_roan:6,progressive_grey:3},'Welsh Mountain Pony':{progressive_grey:20,classic_roan:6},'Welsh Pony':{progressive_grey:18,classic_roan:5},'Welsh Pony of Cob Type':{progressive_grey:6,classic_roan:5},'Welsh Cob':{progressive_grey:3,classic_roan:4},
 'Andalusian / PRE':{progressive_grey:55,rabicano:1},Lusitano:{progressive_grey:45,rabicano:1},'Iberian Horse':{progressive_grey:45,rabicano:1},Lipizzaner:{progressive_grey:90},'Akhal-Teke':{progressive_grey:8},Morgan:{progressive_grey:2,sabino:1,rabicano:1},'Tennessee Walking Horse':{tobiano:15,classic_roan:8,sabino:3,progressive_grey:3},
 Mustang:{tobiano:5,classic_roan:7,progressive_grey:7,leopard_complex:1},Standardbred:{progressive_grey:2,classic_roan:.5,sabino:.2},'Australian Stock Horse':{progressive_grey:8,classic_roan:2},Finnhorse:{progressive_grey:.5,classic_roan:.2,sabino:.2},
 'Irish Sport Horse':{progressive_grey:18,tobiano:2},Zangersheide:{progressive_grey:14,tobiano:1},'Dutch Warmblood':{progressive_grey:12,tobiano:.3,sabino:.4},Oldenburg:{progressive_grey:10,tobiano:.5,sabino:.4},
 'Belgian Warmblood':{progressive_grey:14,sabino:.3},Hanoverian:{progressive_grey:10,sabino:.2},Holsteiner:{progressive_grey:22,sabino:.2},Trakehner:{progressive_grey:12,sabino:.2},'Selle Francais':{progressive_grey:14,sabino:.2},'Swedish Warmblood':{progressive_grey:12,sabino:.2},'Canadian Warmblood':{progressive_grey:12,sabino:.2},
 'American Warmblood':{progressive_grey:12,tobiano:2,sabino:.5},'Baden-Wuerttemberg':{progressive_grey:10,sabino:.2},'Bavarian Warmblood':{progressive_grey:10,sabino:.2},'Danish Warmblood':{progressive_grey:12,sabino:.2},Gelderlander:{progressive_grey:9,sabino:.3},Hessen:{progressive_grey:10,sabino:.2},'Polish Warmblood':{progressive_grey:13,sabino:.2},Rhineland:{progressive_grey:11,sabino:.2},Westphalian:{progressive_grey:10,sabino:.2},Zweibrucker:{progressive_grey:10,sabino:.3},
 Draft:{classic_roan:6,progressive_grey:12,sabino:4},'Riding Pony':{progressive_grey:18,classic_roan:4,tobiano:2},'Cross-Breed':{progressive_grey:12,tobiano:8,classic_roan:5,sabino:2,leopard_complex:3},'Sport Cross':{progressive_grey:14,tobiano:4,classic_roan:2,sabino:1}
};
const COAT94_PRIMITIVE_PATTERNS=['progressive_grey','classic_roan','tobiano','frame_overo','splashed_white','sabino','leopard_complex','dominant_white','rabicano','sooty','pangare','flaxen','dappling','brindle_texture','sabino_like_roaning'];
function coat94Profile(breed){
 if(Coat94.profiles.has(breed))return Coat94.profiles.get(breed);
 const supplied=COAT94_SUPPLIED_SEEDS[COAT94_BREED_ALIASES[breed]||breed],seed=supplied||COAT94_EXTRA_SEEDS[breed];
 if(!seed)return coat94CompositeProfile(breed);
 const primary=Object.fromEntries([...Coat94.primary.keys()].map(id=>[id,0]));
 for(const [name,weight]of Object.entries(seed)){
  const alias={Brown:'Seal Brown',Dun:'Bay Dun'}[name]||name,id=coat94Id(alias);
  if(!Coat94.primary.has(id))throw Error('Unknown coat seed '+breed+': '+name);
  // Bay/chestnut/black subtypes are appearance variants, not invented genetic bases.
  const variants=name==='Bay'&&breed!=='Cleveland Bay'?{bay:75,blood_bay:10,mahogany_bay:10,wild_bay:5}:name==='Chestnut'&&breed!=='Haflinger'?{chestnut:75,copper_chestnut:10,liver_chestnut:10,golden_chestnut:5}:name==='Black'?{black:70,non_fading_black:15,jet_black:10,fading_black:5}:null;
  if(breed==='Haflinger'&&name==='Chestnut')primary.flaxen_chestnut+=weight;
  else if(variants)for(const [id,p]of Object.entries(variants))primary[id]+=weight*p/100;
  else primary[id]+=weight;
 }
 const defaults=['Friesian','Haflinger','Cleveland Bay','Norwegian Fjord'].includes(breed)?{}:{sooty:6,pangare:2,dappling:8};
 const geneProbability=Object.fromEntries(COAT94_PRIMITIVE_PATTERNS.map(id=>[id,0]));Object.assign(geneProbability,defaults,COAT94_SECONDARY_SEEDS[breed]||{});
 if(/Welsh/.test(breed))for(const id of ['tobiano','frame_overo','splashed_white','sabino','leopard_complex','dominant_white'])geneProbability[id]=0;
 if(/Warmblood|Hanoverian|Holsteiner|Trakehner|Oldenburg|Hessen|Rhineland|Westphalian|Zweibrucker|Gelderlander|Selle Francais|Zangersheide|Knabstrupper/.test(breed)&&geneProbability.sabino){geneProbability.sabino_like_roaning=geneProbability.sabino;geneProbability.sabino=0;}
 const expression=Object.fromEntries([...Coat94.patterns].map(([id,p])=>[id,[...p.expression]]));
 if(['Appaloosa','Knabstrupper','Pony of the Americas'].includes(breed))expression.leopard_complex=[25,50,25];
 const shade=breed==='Friesian'?[5,40,55]:breed==='Haflinger'?[45,45,10]:breed==='Norwegian Fjord'?[45,45,10]:[25,50,25];
 const shades=Object.fromEntries([...Coat94.primary].map(([id,p])=>[id,breed==='Thoroughbred'&&p.base==='bay'?[15,50,35]:[...shade]]));
 const profile={id:coat94Id(breed),breed,primary,primaryChoices:Object.fromEntries(Object.entries(primary).filter(([,w])=>w>0)),geneProbability,shades,expression,lpHomozygous:breed==='Knabstrupper'?22:breed==='Appaloosa'?12:15,patnGivenLp:breed==='Knabstrupper'?80:breed==='Appaloosa'?60:breed==='Pony of the Americas'?55:65,lpSubtypes:Coat94.lpTables,
  whiteAllele:breed==='Thoroughbred'?'W5':['American Paint Horse','Quarter Horse','Appaloosa','Pony of the Americas'].includes(breed)?'W10':'W20',
  restrictions:breed==='Friesian'?'Black purebred founders':breed==='Haflinger'?'Flaxen chestnut founders':breed==='Cleveland Bay'?'Bay founders':breed==='Norwegian Fjord'?'Five accepted dun colour names':/Welsh/.test(breed)?'No piebald/skewbald purebred founders':'Configured founder weights; inherited crossbred genes are retained',
  source:Coat94.sources.genetics,confidence:'Genetic mechanisms documented; all percentages are fictional game-generation estimates, not measured population frequencies',seedSource:supplied?'User supplied 8.7 seed table':'Explicit dedicated estimate for existing registry entry',active:coat94Registry().includes(breed)};
 coat94ResolveLPExpressions(profile);Coat94.profiles.set(breed,profile);return profile;
}

const COAT94_COMPOSITE_PROFILES=new Map();
function coat94CompositeProfile(breed){
 if(COAT94_COMPOSITE_PROFILES.has(breed))return COAT94_COMPOSITE_PROFILES.get(breed);
 const parts=Object.entries(breedPercentages(breed)).filter(([name])=>COAT94_SUPPLIED_SEEDS[COAT94_BREED_ALIASES[name]||name]||COAT94_EXTRA_SEEDS[name]);
 if(!parts.length)throw Error('Unregistered breed has no coat profile: '+breed);
 const total=parts.reduce((n,[,w])=>n+w,0),base=coat94Profile('Cross-Breed'),primary=Object.fromEntries([...Coat94.primary.keys()].map(id=>[id,0])),geneProbability=Object.fromEntries(COAT94_PRIMITIVE_PATTERNS.map(id=>[id,0]));
 for(const [name,weight]of parts){const p=coat94Profile(name);for(const id of Object.keys(primary))primary[id]+=p.primary[id]*weight/total;for(const id of COAT94_PRIMITIVE_PATTERNS)geneProbability[id]+=p.geneProbability[id]*weight/total;}
 const p={...base,id:coat94Id(breed),breed,primary,primaryChoices:Object.fromEntries(Object.entries(primary).filter(([,v])=>v>0)),geneProbability,active:false,restrictions:'Crossbred founder mixture; known-parent offspring use inherited genes instead',seedSource:'Explicit weighted mixture of named pedigree components',confidence:base.confidence};
 if(COAT94_COMPOSITE_PROFILES.size>=128)COAT94_COMPOSITE_PROFILES.delete(COAT94_COMPOSITE_PROFILES.keys().next().value);COAT94_COMPOSITE_PROFILES.set(breed,p);return p;
}

function coat94ResolveLPExpressions(profile){
 const values={'Blanket':[35,50,15],'Spotted Blanket':[25,55,20],'Snowcap':[10,50,40],'Leopard':[10,60,30],'Near Leopard':[35,55,10],'Fewspot Leopard':[5,30,65],'Near Fewspot':[15,55,30],'Snowflake':[50,40,10],'Frost':[40,45,15],'Varnish Roan':[55,35,10],'Mottled':[80,18,2]};
 for(const [name,weights]of Object.entries(values))profile.expression[coat94Id(name)]=weights;
 const overall=[0,0,0],homo=profile.lpHomozygous/100,patn=profile.patnGivenLp/100;
 for(const [copies,cw]of [[1,1-homo],[2,homo]])for(const [has,pw]of [[0,1-patn],[1,patn]])for(const [name,weight]of Object.entries(profile.lpSubtypes[copies+':'+has]))for(let i=0;i<3;i++)overall[i]+=cw*pw*weight*values[name][i]/100;
 profile.expression.leopard_complex=overall;
}
