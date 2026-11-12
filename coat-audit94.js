function coat94PatternProbabilities(profile){
 const p=profile.geneProbability,out=Object.fromEntries([...Coat94.patterns.keys()].map(id=>[id,0]));
 for(const id of COAT94_PRIMITIVE_PATTERNS)out[id]=p[id];
 out.sabino=p.sabino*(1-p.dominant_white*p.classic_roan/10000);
 for(const id of ['rabicano','sooty','pangare','flaxen','dappling','brindle_texture','sabino_like_roaning']){
  out[id]=Object.entries(profile.primaryChoices).reduce((total,[key,weight])=>{const c=Coat94.primary.get(key),allowed=id!=='flaxen'||c.base==='chestnut';return total+weight*(allowed?(c.visual[id]?1:p[id]/100):0);},0);
 }
 out.none=Object.entries(profile.primaryChoices).reduce((sum,[key,weight])=>{
  const c=Coat94.primary.get(key);let chance=1;
  for(const id of COAT94_PRIMITIVE_PATTERNS){const chancePattern=id==='flaxen'&&c.base!=='chestnut'?0:c.visual[id]?1:p[id]/100;chance*=1-chancePattern;}
  return sum+weight*chance;
 },0);
 const lp=p.leopard_complex/100,homo=profile.lpHomozygous/100,patn=profile.patnGivenLp/100;
 for(const [copies,copyChance]of [[1,1-homo],[2,homo]])for(const [has,hasChance]of [[0,1-patn],[1,patn]])for(const [name,weight]of Object.entries(profile.lpSubtypes[copies+':'+has]))out[coat94Id(name)]+=lp*copyChance*hasChance*weight;
 out.tovero=p.tobiano*(1-(1-p.frame_overo/100)*(1-p.splashed_white/100)*(1-out.sabino/100));
 out.tobiano_frame=p.tobiano*p.frame_overo/100;out.tobiano_splash=p.tobiano*p.splashed_white/100;out.tobiano_sabino=p.tobiano*out.sabino/100;out.sabino_roan=p.sabino*p.classic_roan/100*(1-p.dominant_white/100);
 for(const [key,weight]of Object.entries(profile.primaryChoices)){const c=Coat94.primary.get(key),dilute=c.recipe.cream&&c.recipe.cream!=='N/N',id=dilute?'dilute_roan':c.base==='chestnut'?'red_roan':c.base==='black'?'blue_roan':c.family==='Brown'?'brown_roan':'bay_roan';out[id]+=weight*p.classic_roan/100;}
 return out;
}
function coat94Audit(){
 return coat94Registry().map(breed=>{
  const p=coat94Profile(breed),probability=coat94PatternProbabilities(p);
  return {breedId:p.id,breed,active:true,primary:Object.fromEntries([...Coat94.primary].map(([id,c])=>[id,{probability:p.primary[id],light:p.shades[id][0],medium:p.shades[id][1],dark:p.shades[id][2],geneticEligibility:c.recipe,family:c.family}])),secondary:Object.fromEntries([...Coat94.patterns].map(([id,c])=>[id,{probability:probability[id],minimal:p.expression[id][0],medium:p.expression[id][1],maximal:p.expression[id][2],geneticEligibility:c.allele||c.parent||c.family,conditional:c.family==='lp_subtype'?'LP dosage and PATN1; conditional subtype tables below':c.family==='grey_stage'?'Age-dependent; zero at reference age 0':c.family==='combination'?'Joint inherited patterns; coverage derives from components':id==='dominant_white'&&p.whiteAllele==='W20'?'W20 body expression is Minimal in founder generation':id==='sabino'?'Conditional on a free KIT allele slot':'Gene/appearance probability, independent of primary draw unless explicitly qualified'}])),lpSubtypes:p.lpSubtypes,restrictions:p.restrictions,source:Coat94.sources,confidence:p.confidence,seedSource:p.seedSource,referenceAge:0,notes:'Primary values describe the underlying non-grey founder draw. Pattern probabilities are independent/conditional marginals and are not a 100% exclusive distribution. Grey stage and expression follow age, with preserved underlying genes.'};
 });
}
function coat94CheckProfiles(){
 const errors=[];
 for(const b of coat94Registry()){
  const p=coat94Profile(b),sum=Object.values(p.primary).reduce((n,v)=>n+v,0);
  if(Math.abs(sum-100)>1e-9)errors.push(b+': primary total '+sum);
  for(const [id,weights]of Object.entries(p.shades))if(weights.length!==3||Math.abs(weights.reduce((n,v)=>n+v,0)-100)>1e-9)errors.push(b+': shade '+id);
  for(const [id,weights]of Object.entries(p.expression))if(weights.length!==3||Math.abs(weights.reduce((n,v)=>n+v,0)-100)>1e-9)errors.push(b+': expression '+id);
  for(const [key,weights]of Object.entries(p.lpSubtypes))if(Math.abs(Object.values(weights).reduce((n,v)=>n+v,0)-100)>1e-9)errors.push(b+': subtype '+key);
  for(const value of Object.values(p.geneProbability))if(!Number.isFinite(value)||value<0||value>100)errors.push(b+': invalid pattern weight');
 }
 return errors;
}
