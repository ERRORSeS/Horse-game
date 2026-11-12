const {check}=require('./behavior5-harness.cjs');
check('every actual breed and every supported coat/pattern has a complete numeric profile',`{
 const errors=coat94CheckProfiles();if(errors.length)throw Error(errors.join(';'));if(coat94Registry().length!==61||Breed94.size!==30)throw Error('incomplete breed registry');
 for(const row of coat94Audit()){if(Object.keys(row.primary).length!==Coat94.primary.size||Object.keys(row.secondary).length!==Coat94.patterns.size)throw Error('audit omitted zeros');for(const p of Object.values(row.secondary))if(!Number.isFinite(p.probability)||p.probability<0||p.probability>100)throw Error('invalid pattern audit');}
}`);
check('all primary recipes and shade palettes resolve without impossible dilution alleles',`{
 for(const p of Coat94.primary.values())for(let shade=0;shade<3;shade++){
  const genes=coat94GenesFromPrimary(p,coat94Rng(p.id)),valid=coat94Validate(genes);if(!valid.valid)throw Error(p.id+valid.errors.join(','));
  const state={v:1,origin:'edited',breed:'Cross-Breed',seed:1,genes,appearance:{...p.visual,primaryHint:p.id},primary:p.id,shade,expressionSeed:42};
  const view=coat94Describe(state,5);if(!view.name||/Dark Dark|Light Light|undefined/.test(view.name)||!/^#[0-9a-f]{6}$/i.test(view.palette.body))throw Error('bad name/palette '+p.id);
  if(p.recipe.cream==='Cr/Cr'&&view.palette.body.slice(1).match(/../g).some(x=>parseInt(x,16)<180))throw Error('double dilute too dark '+p.id);
 }
}`);
check('restricted founders and LP breeds respect their independent body coat profiles',`{
 for(let i=0;i<300;i++){
  const f=coat94Founder('Friesian',i),h=coat94Founder('Haflinger',i),c=coat94Founder('Cleveland Bay',i),d=coat94Founder('Norwegian Fjord',i);
  if(coat94Base(f.genes)!=='black'||f.patterns.length)throw Error('Friesian not black/solid');if(coat94Base(h.genes)!=='chestnut'||!h.appearance.flaxen)throw Error('Haflinger not flaxen chestnut');if(coat94Base(c.genes)!=='bay'||c.patterns.length)throw Error('Cleveland Bay not bay');if(!['brown_dun','red_dun','grey_dun','white_dun','yellow_dun'].includes(d.primary)||coat94Has(d.genes,'grey','G'))throw Error('Fjord dun confused with grey');
  for(const b of Object.keys(CAREER_WELSH)){const s=coat94Founder(b,i);if(s.patterns.some(p=>['tobiano','frame_overo','splashed_white','leopard_complex'].includes(p.id)))throw Error('Welsh pinto founder');}
 }
}`);
check('red factor, cream/pearl, silver, LP/PATN1 and frame viability follow actual inherited genes',`{
 const make=(base,extra={})=>{const genes={...coat94GenesFromPrimary(Coat94.primary.get(base),()=>.1),...extra};return {id:base,breed:'Cross-Breed',coatGenetics94:{genes,primary:base,shade:1,appearance:{}}};};
 const red=make('chestnut');for(let i=0;i<500;i++){const child=coat94Inherit(red,red,'red'+i);if(coat94Base(child.genes)!=='chestnut')throw Error('red parents made black pigment');}
 const carrier=make('bay',{extension:'E/e'});let chestnuts=0;for(let i=0;i<4000;i++)if(coat94Base(coat94Inherit(carrier,carrier,'carrier'+i).genes)==='chestnut')chestnuts++;if(chestnuts<850||chestnuts>1150)throw Error('chestnut segregation '+chestnuts);
 const pal=make('palomino'),buck=make('buckskin');let doubles=0;for(let i=0;i<4000;i++){const c=coat94Inherit(pal,buck,'cream'+i);if(coat94Count(c.genes,'cream','Cr')===2)doubles++;}if(doubles<850||doubles>1150)throw Error('cream dosage');
 const cp=make('bay',{cream:'Cr/Prl'});for(let i=0;i<100;i++){const c=coat94Inherit(cp,cp,'pearl'+i);if(coat94Pair(c.genes.cream).length!==2||coat94Count(c.genes,'cream','Cr')+coat94Count(c.genes,'cream','Prl')!==2)throw Error('separate cream/pearl loci invented');}
 const silent=coat94PrimaryFromGenes({...red.coatGenetics94.genes,silver:'Z/Z'});if(/Silver/.test(silent.name))throw Error('silver showed on chestnut');
 const lp=make('bay',{lp:'LP/LP',patn1:'PATN1/PATN1'});for(let i=0;i<100;i++){const child=coat94Inherit(lp,lp,'lp'+i);if(!['Fewspot Leopard','Near Fewspot','Snowcap'].includes(child.patterns.find(p=>p.id==='leopard_complex').subtype))throw Error('LP copies/PATN1 ignored');}
 const frame=make('bay',{frame:'O/N'});let lost=0;for(let i=0;i<4000;i++)if(!coat94Inherit(frame,frame,'frame'+i).viability.valid)lost++;if(lost<850||lost>1150)throw Error('frame viability '+lost);
 const paint=make('bay',{tobiano:'TO/TO'}),friesian={...make('black'),breed:'Friesian'};for(let i=0;i<100;i++){const c=coat94Inherit(friesian,paint,'cross'+i);if(!c.patterns.some(p=>p.id==='tobiano'))throw Error('breed weights erased inherited pattern');}
}`);
check('grey progresses with individual variation while Fjord grey dun stays genetically distinct',`{
 const stages=new Set();for(let i=0;i<100;i++){const s=coat94Founder('Arabian','grey'+i);s.genes.grey='G/N';const young=coat94Describe(s,0),old=coat94Describe(s,18);if(!young.primary||old.name===young.name)throw Error('grey did not progress');stages.add(coat94Grey(s,8).stage);const before=JSON.stringify(s.genes);coat94Describe(s,25);if(JSON.stringify(s.genes)!==before)throw Error('grey changed genotype');}
 if(stages.size<2)throw Error('all greys use one sequence');
}`);
check('body phenotype extensions leave all original face/leg generation and inherited marking values unchanged',`{
 const originalRandom=Math.random;try{
  for(const breed of ['Friesian','Thoroughbred','Arabian',...Object.keys(CAREER_WELSH)])for(let seed=0;seed<40;seed++){
   Math.random=coat94Rng(seed);const genes=randomGenetics(breed),a=COAT94_PHENOTYPE(genes,breed);
   Math.random=coat94Rng(seed);const copy=randomGenetics(breed);copy.coat94=coat94Inherit({id:'a',breed,coatGenetics94:coat94Founder(breed,seed)},{id:'b',breed,coatGenetics94:coat94Founder('American Paint Horse',seed+1)},seed);
   const b=resolvePhenotypeFromGenetics(copy,breed);for(const key of ['faceMarking','legMarkings','socks'])if(JSON.stringify(a[key])!==JSON.stringify(b[key]))throw Error('marking generator changed '+breed+' '+key);
  }
 }finally{Math.random=originalRandom;}
 resetGame();const h=app.horses[0];delete h.coatGenetics94;h.breed='Friesian';h.coat='Legacy Palomino (dark)';h.faceMarking='Blaze + Snip';h.legMarkings={FR:'Sock',FL:'None',BR:'Stocking',BL:'Pastern'};h.socks=socksFromLegMarkings(h.legMarkings);h.marking='Legacy body pattern';h.marking2='None';
 const snapshot=JSON.stringify({coat:h.coat,faceMarking:h.faceMarking,legMarkings:h.legMarkings,socks:h.socks,marking:h.marking,genetics:h.genetics});hydrateFromSave(JSON.parse(serializeAppState()));const loaded=app.horses.find(x=>x.id===h.id);applyBreedAppearance(loaded);
 if(JSON.stringify({coat:loaded.coat,faceMarking:loaded.faceMarking,legMarkings:loaded.legMarkings,socks:loaded.socks,marking:loaded.marking,genetics:loaded.genetics})!==snapshot)throw Error('saved coat or markings changed');
 if(loaded.coatGenetics94.origin!=='legacy')throw Error('legacy horse rerolled');
}`);

check('progressive modifiers retain their genetic base and true white is not renamed grey',`{
 const s=coat94Founder('Appaloosa','varnish94',0);s.genes.lp='LP/N';s.genes.patn1='N/N';s.lpSubtype='Varnish Roan';delete s.fixedPatterns;s.expressionOverrides={leopard_complex:0};coat94Freeze(s,0);const before=coat94Describe(s,0),after=coat94Describe(s,20);if(before.patterns.find(p=>p.id==='leopard_complex').expression>=after.patterns.find(p=>p.id==='leopard_complex').expression||before.underlying!==after.underlying)throw Error('no varnish progression');
 const w=coat94Founder('Cross-Breed','white94',0);w.genes.kit='W4/N';w.genes.grey='G/N';delete w.fixedPatterns;coat94Freeze(w,0);if(coat94Describe(w,20).name!=='Camarillo White')throw Error('true white mislabeled grey');
}`);
