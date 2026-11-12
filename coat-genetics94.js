/* The new coat genotype is separate from the untouched legacy marking genetics. */
const COAT94_LOCI={extension:['E','e'],agouti:['A','a'],cream:['N','Cr','Prl'],dun:['N','D'],silver:['N','Z'],champagne:['N','Ch'],mushroom:['N','Mu'],grey:['N','G'],tobiano:['N','TO'],frame:['N','O'],splash:['N','SW1'],lp:['N','LP'],patn1:['N','PATN1'],kit:['N','RN','SB1','W4','W5','W10','W13','W20','W22']};
function coat94Pair(value){return Array.isArray(value)?value:String(value||'?/?').split('/');}
function coat94Count(genes,key,allele){return coat94Pair(genes[key]).filter(a=>a===allele).length;}
function coat94Has(genes,key,allele){return coat94Count(genes,key,allele)>0;}
function coat94EmptyGenes(){return Object.fromEntries(Object.keys(COAT94_LOCI).map(key=>[key,key==='extension'?'E/e':key==='agouti'?'A/a':'N/N']));}
function coat94Validate(genes){
 const errors=[];for(const [key,allowed]of Object.entries(COAT94_LOCI)){const pair=coat94Pair(genes[key]);if(pair.length!==2||pair.some(a=>!allowed.includes(a)&&a!=='?'))errors.push(key);}
 if(coat94Count(genes,'frame','O')===2)errors.push('Non-viable homozygous frame');
 for(const w of ['W4','W5','W10','W13','W22'])if(coat94Count(genes,'kit',w)===2)errors.push('Non-viable homozygous '+w);
 return {valid:errors.length===0,errors,unknown:Object.keys(COAT94_LOCI).filter(key=>coat94Pair(genes[key]).includes('?'))};
}
function coat94GenesFromPrimary(primary,random){
 const p=typeof primary==='string'?Coat94.primary.get(primary):primary,g=coat94EmptyGenes(),r=p.recipe;
 g.extension=p.base==='chestnut'?'e/e':random()<.35?'E/e':'E/E';g.agouti=p.base==='black'?'a/a':p.base==='bay'?(random()<.3?'A/a':'A/A'):(random()<.5?'A/a':'a/a');
 g.cream=r.cream||'N/N';if(r.dun)g.dun='D/N';if(r.silver)g.silver='Z/N';if(r.champagne)g.champagne='Ch/N';if(r.mushroom)g.mushroom='Mu/Mu';if(r.white)g.kit=r.white+'/N';
 return g;
}
function coat94Base(g){return coat94Count(g,'extension','e')===2?'chestnut':coat94Has(g,'agouti','A')?'bay':'black';}
function coat94PrimaryFromGenes(g,appearance={}){
 const base=coat94Base(g),cr=coat94Count(g,'cream','Cr'),prl=coat94Count(g,'cream','Prl'),cream=cr===2?'Cr/Cr':cr&&prl?'Cr/Prl':prl===2?'Prl/Prl':cr?'Cr/N':'N/N';
 const name=coat94CompoundName(base,cream,coat94Has(g,'dun','D'),coat94Has(g,'silver','Z'),coat94Has(g,'champagne','Ch'),coat94Count(g,'mushroom','Mu')===2),resolved=Coat94.primary.get(coat94Id(name));
 let hint=Coat94.primary.get(appearance.primaryHint);
 if(hint&&(hint.recipe.white&&!coat94Has(g,'kit',hint.recipe.white)||hint.visual.flaxen&&!appearance.flaxen||hint.visual.sooty&&!appearance.sooty))hint=null;
 if(hint){const recipe=hint.recipe,hr=recipe.cream||'N/N';if(hint.base===base&&hr===cream&&!!recipe.dun===coat94Has(g,'dun','D')&&!!recipe.silver===(coat94Has(g,'silver','Z')&&base!=='chestnut')&&!!recipe.champagne===coat94Has(g,'champagne','Ch')&&!!recipe.mushroom===(coat94Count(g,'mushroom','Mu')===2&&base!=='black'))return hint;}
 if(!resolved)throw Error('Unresolved coat phenotype '+name);return resolved;
}
function coat94KitAdd(g,allele){const pair=coat94Pair(g.kit),free=pair.indexOf('N');if(free<0)return false;pair[free]=allele;g.kit=pair.join('/');return true;}
function coat94Founder(breed,seed,age=0){
 const profile=coat94Profile(breed),random=coat94Rng(seed),primary=Coat94.primary.get(coat94Pick(profile.primaryChoices,random)),genes=coat94GenesFromPrimary(primary,random),appearance={...primary.visual,primaryHint:primary.id};
 const chance=id=>random()*100<profile.geneProbability[id];
 if(['Andalusian / PRE','Lusitano','American Paint Horse','Quarter Horse'].includes(breed)&&genes.cream==='N/N'&&random()<.015)genes.cream='Prl/N';
 if(['Shetland Pony','Miniature Horse'].includes(breed)&&genes.mushroom==='N/N'&&random()<.12)genes.mushroom='Mu/N';
 if(['Icelandic Horse','Shetland Pony','Miniature Horse','Noriker','Tennessee Walking Horse'].includes(breed)&&primary.base==='chestnut'&&random()<.08)genes.silver='Z/N';
 if(chance('progressive_grey'))genes.grey=random()<.12?'G/G':'G/N';
 if(chance('tobiano'))genes.tobiano=random()<.15?'TO/TO':'TO/N';
 if(chance('frame_overo'))genes.frame='O/N';if(chance('splashed_white'))genes.splash='SW1/N';
 if(chance('dominant_white'))coat94KitAdd(genes,profile.whiteAllele);
 if(chance('classic_roan'))coat94KitAdd(genes,'RN');if(chance('sabino'))coat94KitAdd(genes,'SB1');
 if(chance('leopard_complex')){genes.lp=random()*100<profile.lpHomozygous?'LP/LP':'LP/N';genes.patn1=random()*100<profile.patnGivenLp?'PATN1/N':'N/N';}
 for(const id of ['rabicano','sooty','pangare','flaxen','dappling','brindle_texture','sabino_like_roaning'])appearance[id]=!!appearance[id]||chance(id);
 const state={v:1,origin:'founder',breed,seed:typeof seed==='number'?seed>>>0:HorseHealth.hash(String(seed)),genes,appearance,shade:coat94Triplet(profile.shades[primary.id],random),expressionSeed:Math.floor(random()*4294967296)};
 state.primary=primary.id;coat94Freeze(state,age);return state;
}
function coat94Grey(state,age){
 if(!coat94Has(state.genes,'grey','G'))return null;
 const random=coat94Rng(state.seed+':grey'),speed=.7+random()*.75+(coat94Count(state.genes,'grey','G')===2?.2:0),start=.8+random()*1.5,progress=Math.max(0,(age-start)*speed),fleabitten=random()<.28;
 const stage=progress<.5?'Base coat':progress<2?'Early Grey':progress<4?'Steel Grey':progress<7?'Dapple Grey':progress<10?'Light Grey':fleabitten&&progress>12?'Fleabitten Grey':'Nearly White Grey';
 return {stage,progress,expression:progress<3?0:progress<8?1:2,fleabitten,bodyOnly:true};
}
function coat94Varnish(patterns,state,age){
 const lp=patterns.find(p=>p.id==='leopard_complex'&&p.subtype==='Varnish Roan');if(!lp)return patterns;
 const random=coat94Rng(state.seed+':varnish'),progress=Math.max(0,age-(1+random()*2))*(.6+random()*.6);
 lp.expression=Math.min(2,lp.expression+Math.floor(progress/6));lp.stage=progress<2?'Early varnish':progress<7?'Developing varnish':'Extensive varnish';
 return patterns;
}
function coat94Patterns(state,age=0){
 if(state.fixedPatterns){const out=state.fixedPatterns.map(([id,expression,subtype,allele])=>({id,expression,...(subtype?{subtype}:{}),...(allele?{allele}:{}),...(id==='leopard_complex'?{lpCopies:coat94Count(state.genes,'lp','LP')}:{} )}));const grey=coat94Grey(state,age);if(grey)out.push({id:'progressive_grey',expression:grey.expression,stage:grey.stage});return coat94Varnish(out,state,age);}
 const g=state.genes,profile=coat94Profile(state.breed),random=coat94Rng(state.expressionSeed),out=[];
 const add=(id,extra={})=>{const p={id,expression:coat94Triplet(profile.expression[id]||[40,45,15],random),...extra};if(id!=='progressive_grey'&&id!=='sabino_white'&&Number.isInteger(state.expressionOverrides?.[id]))p.expression=state.expressionOverrides[id];out.push(p);};
 if(coat94Has(g,'tobiano','TO'))add('tobiano');if(coat94Has(g,'frame','O'))add('frame_overo');if(coat94Has(g,'splash','SW1'))add('splashed_white');
 if(coat94Has(g,'kit','SB1'))add(coat94Count(g,'kit','SB1')===2?'sabino_white':'sabino');
 if(coat94Has(g,'kit','RN'))add('classic_roan');
 const white=coat94Pair(g.kit).find(a=>/^W\d/.test(a));if(white)add('dominant_white',{allele:white,...(white==='W20'?{expression:0}:{})});
 const lp=coat94Count(g,'lp','LP');if(lp){const patn=coat94Has(g,'patn1','PATN1')?1:0,subtype=state.lpSubtype&&profile.lpSubtypes[lp+':'+patn][state.lpSubtype]?state.lpSubtype:coat94Pick(profile.lpSubtypes[lp+':'+patn],random);add('leopard_complex',{subtype,lpCopies:lp,expression:coat94Triplet(profile.expression[coat94Id(subtype)],random)});}
 for(const id of ['rabicano','sooty','pangare','flaxen','dappling','brindle_texture','sabino_like_roaning'])if(state.appearance[id]&&(id!=='flaxen'||coat94Base(g)==='chestnut'))add(id);
 const grey=coat94Grey(state,age);if(grey)add('progressive_grey',{expression:grey.expression,stage:grey.stage});
 return coat94Varnish(out,state,age);
}
function coat94PrimaryName(state){
 const p=Coat94.primary.get(state.primary),shade=Coat94.shades[state.shade]||'Medium';
 if(!p)return 'Unrecorded coat';if(shade==='Medium')return p.name;
 return /\b(Light|Dark|Golden|Jet|Sun-Faded)\b/.test(p.name)?p.name+' ('+shade+' shade)':shade+' '+p.name;
}
function coat94Describe(state,age=0){
 if(state.origin==='legacy')return {...state.legacy,underlying:state.primary?Coat94.primary.get(state.primary)?.name:'Unknown',shade:state.shade==null?'Unknown':Coat94.shades[state.shade],geneticStatus:'Legacy genetics incomplete; appearance preserved'};
 const primary=coat94PrimaryName(state),patterns=coat94Patterns(state,age),p=Coat94.primary.get(state.primary),g=state.genes;
 const roan=patterns.find(x=>x.id==='classic_roan'),grey=patterns.find(x=>x.id==='progressive_grey'),white=patterns.find(x=>x.id==='dominant_white'),lp=patterns.find(x=>x.id==='leopard_complex'),pinto=patterns.filter(x=>['tobiano','frame_overo','splashed_white','sabino','sabino_white'].includes(x.id));
 const secondary=patterns.map(x=>x.id==='classic_roan'?(p.recipe.cream&&p.recipe.cream!=='N/N'?p.name+' Roan':p.base==='black'?'Blue Roan':p.base==='chestnut'?'Red Roan':p.family==='Brown'?'Brown Roan':'Bay Roan'):x.subtype?x.subtype+' Appaloosa':x.id==='dominant_white'&&x.allele==='W20'?'W20 White Spotting':Coat94.patterns.get(x.id).name);
 let name=primary;
 if(roan)name=secondary[patterns.indexOf(roan)];if(lp)name=primary+' '+lp.subtype+' Appaloosa';
 if(pinto.length)name=(roan?secondary[patterns.indexOf(roan)]:primary)+' '+(pinto.some(x=>x.id==='tobiano')&&pinto.some(x=>x.id!=='tobiano')?'Tovero':pinto.map(x=>Coat94.patterns.get(x.id).name).join(' + '))+(lp?' '+lp.subtype+' Appaloosa':'');
 if(white&&white.allele!=='W20')name=white.allele==='W4'?'Camarillo White':'Dominant White';
 if(patterns.some(x=>x.id==='sabino_white'))name='Sabino White';
 if(grey&&grey.stage!=='Base coat'&&!(white&&white.allele!=='W20')&&!patterns.some(x=>x.id==='sabino_white'))name=grey.stage+' ('+p.name+' Base)';
 return {name,primary,underlying:p.name,shade:Coat94.shades[state.shade],secondary:secondary.join(' + ')||'None',patterns,genes:g,palette:coat94Palette(p,state.shade),geneticStatus:coat94Validate(g).unknown.length?'Partially unknown':'Recorded coat genotype'};
}
function coat94LegacyGenes(h){
 if(h?.coatGenetics94?.genes)return {...h.coatGenetics94.genes};
 const old=h?.genetics||{},g=Object.fromEntries(Object.keys(COAT94_LOCI).map(k=>[k,'?/?']));
 const normal=pair=>coat94Pair(pair).map(a=>a==='n'?'N':a).join('/');
 for(const key of ['extension','agouti','dun','champagne'])if(old[key])g[key]=normal(old[key]);
 if(old.gray)g.grey=normal(old.gray);
 const cr=old.cream?countAllele(old.cream,'Cr'):null,pr=old.pearl?countAllele(old.pearl,'Prl'):null;
 if(cr!=null&&pr!=null&&cr+pr<=2)g.cream=[...Array(cr).fill('Cr'),...Array(pr).fill('Prl'),...Array(2-cr-pr).fill('N')].join('/');
 const aliases={tobiano:['tobiano','TO'],frame:['overo','O'],splash:['splash','SW'],lp:['appaloosa','Lp']};
 for(const [key,[legacy,allele]]of Object.entries(aliases))if(old[legacy])g[key]=coat94Pair(old[legacy]).map(a=>a==='n'?'N':a===allele?COAT94_LOCI[key][1]:a).join('/');
 // Separate old KIT fields do not establish allelic phase; retain uncertainty.
 return g;
}
function coat94Inherit(dam,sire,seed){
 const a=coat94LegacyGenes(dam),b=coat94LegacyGenes(sire),random=coat94Rng(seed),genes={};
 for(const key of Object.keys(COAT94_LOCI)){const pa=coat94Pair(a[key]),pb=coat94Pair(b[key]);genes[key]=pa[Math.floor(random()*2)]+'/'+pb[Math.floor(random()*2)];}
 const da=dam?.coatGenetics94,sa=sire?.coatGenetics94,appearance={};
 for(const key of ['rabicano','sooty','pangare','flaxen','dappling','brindle_texture','sabino_like_roaning'])appearance[key]=!!(random()<.5?da?.appearance?.[key]:sa?.appearance?.[key]);
 const hint=(random()<.5?da:sa)?.primary;if(hint)appearance.primaryHint=hint;
 const breed=dam?.breed||sire?.breed||'Cross-Breed',state={v:1,origin:'inherited',breed,seed:HorseHealth.hash(String(seed)),genes,appearance,shade:Math.max(0,Math.min(2,Math.round(((da?.shade??1)+(sa?.shade??1))/2+(random()-.5)*1.4))),expressionSeed:Math.floor(random()*4294967296)};
 state.primary=coat94PrimaryFromGenes(genes,appearance).id;coat94Freeze(state,0);state.viability=coat94Validate(genes);return state;
}

function coat94Freeze(state,age=0){
 const patterns=coat94Patterns(state,age);
 state.fixedPatterns=patterns.filter(p=>p.id!=='progressive_grey').map(p=>[p.id,p.expression,p.subtype||null,p.allele||null]);
 Object.defineProperty(state,'patterns',{value:patterns,enumerable:false,configurable:true,writable:true});
 return state;
}
