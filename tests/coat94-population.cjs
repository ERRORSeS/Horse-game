const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {context}=require('./behavior5-harness.cjs');
const out=process.env.COAT94_OUTPUT||path.join(__dirname,'..','validation94');fs.mkdirSync(out,{recursive:true});
const reports=vm.runInContext(`(()=>{
 const results=[],n=10000;let invalid=0;
 const check=(actual,p,total,label)=>{const expected=total*p/100,tolerance=6*Math.sqrt(total*p/100*(1-p/100))+4;if(p===0&&actual!==0||p===100&&actual!==total||Math.abs(actual-expected)>tolerance)throw Error(label+': '+actual+' observed vs '+expected+' expected');};
 for(const breed of coat94Registry()){
  const profile=coat94Profile(breed),primary=Object.fromEntries([...Coat94.primary.keys()].map(id=>[id,0])),shade=[0,0,0],secondary=Object.fromEntries([...Coat94.patterns.keys()].map(id=>[id,0])),expression={},byPrimary={};
  for(let i=0;i<n;i++){
   const s=coat94Founder(breed,breed+':population94:'+i,0);if(!coat94Validate(s.genes).valid||!Coat94.primary.has(s.primary))invalid++;
   primary[s.primary]++;shade[s.shade]++;(byPrimary[s.primary]||=[0,0,0])[s.shade]++;
   if(!s.patterns.length)secondary.none++;
   for(const p of s.patterns){secondary[p.id]++;(expression[p.id]||=[0,0,0])[p.expression]++;if(p.subtype)secondary[coat94Id(p.subtype)]++;}
   const ids=new Set(s.patterns.map(p=>p.id));if(ids.has('tobiano')&&['frame_overo','splashed_white','sabino'].some(id=>ids.has(id)))secondary.tovero++;
   for(const [id,a,b]of [['tobiano_frame','tobiano','frame_overo'],['tobiano_splash','tobiano','splashed_white'],['tobiano_sabino','tobiano','sabino'],['sabino_roan','sabino','classic_roan']])if(ids.has(a)&&ids.has(b))secondary[id]++;
   if(ids.has('classic_roan')){const p=Coat94.primary.get(s.primary),dilute=p.recipe.cream&&p.recipe.cream!=='N/N',id=dilute?'dilute_roan':p.base==='chestnut'?'red_roan':p.base==='black'?'blue_roan':p.family==='Brown'?'brown_roan':'bay_roan';secondary[id]++;}
  }
  for(const [id,count]of Object.entries(primary)){check(count,profile.primary[id],n,breed+' '+id);if(count)for(let i=0;i<3;i++)check(byPrimary[id][i],profile.shades[id][i],count,breed+' '+id+' shade '+i);}
  const probabilities=coat94PatternProbabilities(profile);for(const [id,count]of Object.entries(secondary))check(count,probabilities[id],n,breed+' '+id);
  for(const [id,counts]of Object.entries(expression)){const total=counts.reduce((a,b)=>a+b,0),weights=id==='dominant_white'&&profile.whiteAllele==='W20'?[100,0,0]:profile.expression[id];for(let i=0;i<3;i++)check(counts[i],weights[i],total,breed+' '+id+' expression '+i);}
  results.push({breed,n,primary,shade,byPrimary,secondary,expression,invalid:0});console.log('PASS '+breed+' · '+n+' founders');
 }
 if(invalid)throw Error('Invalid founder coats: '+invalid);
 return results;
})()`,context);
fs.writeFileSync(path.join(out,'founder-population.json'),JSON.stringify({seed:'breed:population94:index',perBreed:10000,total:reports.reduce((n,r)=>n+r.n,0),tolerance:'Six binomial standard deviations plus four; explicit zeros and 100% restrictions exact',breeds:reports},null,2));
const audit=vm.runInContext(`({version:94,primaryColumns:['probability','light','medium','dark'],secondaryColumns:['probability','minimal','medium','maximal'],primaryCatalog:[...Coat94.primary.values()].map(p=>({...p,palettes:Coat94.shades.map((shade,i)=>({shade,...coat94Palette(p,i)}))})),secondaryCatalog:[...Coat94.patterns.values()],sources:Coat94.sources,breeds:coat94Audit().map(p=>({...p,primary:Object.fromEntries(Object.entries(p.primary).map(([id,r])=>[id,[r.probability,r.light,r.medium,r.dark]])),secondary:Object.fromEntries(Object.entries(p.secondary).map(([id,r])=>[id,[r.probability,r.minimal,r.medium,r.maximal]]))}))})`,context);
fs.writeFileSync(path.join(out,'complete-breed-probabilities.json'),JSON.stringify(audit));
console.log('PASS full population/audit artifacts: '+reports.length+' breeds, '+reports.length*10000+' founders; no player state modified');
