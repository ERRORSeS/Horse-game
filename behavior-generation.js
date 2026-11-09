/* Learned behavior is generated once for sale horses, or explicitly shuffled by the player. */
function learnedBehaviorDefaults(){return Object.fromEntries(RR_LEARNED.map(key=>[key,/Avoidance|Sensitivity|Anticipation/.test(key)?5:70]));}
function variedLearnedBehavior(h,token){
 const seed=HorseHealth.hash(h.id+'|learned-profile|'+token),person=String(h.personality||''),traits=h.training2?.traits||[];
 const steady=/bomb.proof|easy.going|calm/i.test(person),wary=/spook|nervous|excitable|sensitive/i.test(person),reluctant=/stubborn|lazy/i.test(person);
 const unstarted=h.age<3||h.requiresBreakingIn,calm=steady?7:wary?-6:0;
 const average=group=>{const values=Object.values(h.stats?.[group]||{});return values.length?values.reduce((n,v)=>n+(Number(v)||0),0)/values.length:0;};
 const jump=(average('jumping')-40)*.12,flat=(average('dressage')-40)*.12;
 const ranges={
  'Jump Confidence':[unstarted?20:40,unstarted?60:90,calm+jump],
  'Flatwork Confidence':[unstarted?25:45,unstarted?65:95,calm+flat],
  'Rider Trust in Aids':[35,90,calm-(reluctant?6:0)],
  'Learned Fence Avoidance':[0,unstarted?8:35,steady?-3:wary?4:0],
  'Learned Spook Sensitivity':[0,unstarted?15:40,steady?-3:wary?5:0],
  'Training Anticipation':[0,unstarted?10:35,/hot|excitable/i.test(person)?5:0],
  'Arena Confidence':[30,95,calm],
  'Handling Confidence':[35,95,calm],
  'Collection Confidence':[unstarted?10:35,unstarted?50:95,calm+flat]
 };
 if(traits.includes('Bold Jumper'))ranges['Jump Confidence'][2]+=5;
 if(traits.includes('Stands Quietly'))ranges['Handling Confidence'][2]+=5;
 return Object.fromEntries(RR_LEARNED.map(key=>{const [low,high,bias]=ranges[key];return [key,Math.round(clamp(low+HorseHealth.roll(seed,key)*(high-low)+bias,0,100)*10)/10];}));
}
function ensurePurchasedLearnedBehavior(h,source){
 const b=rrHorse(h);if(b.learnedProfile?.version===1)return b;
 const defaults=learnedBehaviorDefaults();
 // Existing customized or learned values remain authoritative, including ridden trials.
 const untouched=RR_LEARNED.every(key=>b.learned[key]===defaults[key]);
 if(untouched)b.learned=variedLearnedBehavior(h,'initial');
 b.learnedProfile={version:1,source,generated:untouched};return b;
}
function shuffleHorseBehavior(horseId){
 const h=app.horses.find(h=>h.id===horseId);
 if(!h||h.deceased)return {ok:false,message:'Choose a living horse in your stable.'};
 const b=rrHorse(h);b.learnedShuffleCount=(b.learnedShuffleCount||0)+1;
 b.learned=variedLearnedBehavior(h,'shuffle:'+b.learnedShuffleCount);
 b.learnedProfile={version:1,source:'manual shuffle',generated:true};
 return {ok:true,message:'Learned confidence, trust, avoidance and anticipation values shuffled.'};
}
const LEARNED_SALE_LIST=HorseSales.list;
HorseSales.list=function(a,...args){const l=LEARNED_SALE_LIST(a,...args);if(l.direction==='buy'&&!(a.horses||[]).some(h=>h.id===l.horseId))ensurePurchasedLearnedBehavior(l.horse,'sale listing');return l;};
const LEARNED_SALE_DELIVER=HorseSales.deliver;
HorseSales.deliver=function(a,tx,...args){const transferred=tx.transferred,result=LEARNED_SALE_DELIVER(a,tx,...args);if(result.ok&&!transferred&&tx.transferred&&tx.direction==='buy'){const h=a.horses.find(h=>h.id===tx.horseId);if(h)ensurePurchasedLearnedBehavior(h,'sale purchase');}return result;};
const LEARNED_AUCTION_GENERATE=auctionGenerate;
auctionGenerate=function(...args){const collection=LEARNED_AUCTION_GENERATE(...args);for(const lot of collection.lots)ensurePurchasedLearnedBehavior(lot.horse,'auction lot');return collection;};
const LEARNED_AUCTION_CONTRACT=auctionContract;
auctionContract=function(id,action,...args){const c=auctionState().contracts.find(c=>c.id===id),delivered=c?.delivered,result=LEARNED_AUCTION_CONTRACT(id,action,...args);if(action==='deliver'&&!delivered&&c?.delivered)ensurePurchasedLearnedBehavior(c.horse,'auction purchase');return result;};
const LEARNED_LESSON_BUY=lessonBuyHorse;
lessonBuyHorse=function(...args){const result=LEARNED_LESSON_BUY(...args);if(result.ok)ensurePurchasedLearnedBehavior(result.horse,'lesson-horse buyout');return result;};
const LEARNED_BEHAVIOR_CARD=createHorseCard;
createHorseCard=function(h,...args){
 const node=LEARNED_BEHAVIOR_CARD(h,...args),controls=node.querySelector('.ridability-repair');
 if(!controls?.insertBefore)return node;
 const button=document.createElement('button');button.type='button';button.textContent='Shuffle Behavior';button.dataset.shuffleHorseBehavior=h.id;
 button.title='Randomize the nine learned behavior values. Technical skills, attributes and innate temperament stay the same.';
 const status=document.createElement('p');status.setAttribute('role','status');status.textContent=h.behaviorShuffleMessage||'';
 button.onclick=()=>{const result=shuffleHorseBehavior(h.id);h.behaviorShuffleMessage=result.message;render();if(result.ok)saveGame(false);};
 controls.insertBefore(button,controls.querySelector('[data-make-horse-ridable]')?.nextSibling||null);controls.appendChild(status);return node;
};
