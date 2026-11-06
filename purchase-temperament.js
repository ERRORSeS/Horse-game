/* One saved starting behavior profile for a purchasable horse; no learning events are invented. */
const PURCHASE_TEMPERAMENT_RANGES={
 bombproof:{spook:[0,18],intensity:[5,32],confidence:[70,95],trust:[65,95]},
 easygoing:{spook:[5,35],intensity:[10,45],confidence:[60,95],trust:[60,90]},
 lazy:{spook:[5,40],intensity:[5,38],confidence:[50,88],trust:[45,85]},
 stubborn:{spook:[15,50],intensity:[35,80],confidence:[45,88],trust:[35,80]},
 energetic:{spook:[20,60],intensity:[45,85],confidence:[50,90],trust:[45,85]},
 unfocused:{spook:[25,65],intensity:[30,75],confidence:[40,85],trust:[40,85]},
 sensitive:{spook:[35,75],intensity:[45,88],confidence:[40,85],trust:[40,85]},
 spooky:{spook:[55,95],intensity:[40,90],confidence:[35,80],trust:[40,85]},
 hotblooded:{spook:[35,80],intensity:[65,98],confidence:[40,85],trust:[40,85]},
 excitable:{spook:[35,80],intensity:[60,98],confidence:[40,85],trust:[40,85]},
 neutral:{spook:[15,70],intensity:[20,80],confidence:[40,90],trust:[40,90]}
};
function preparePurchaseTemperament(h,advertised=h?.personality,source='purchase',state=app){
 if(!h||state.horses?.some(owned=>owned.id===h.id))return h?.riderBehavior||null;
 const b=rrHorse(h);if(b.purchaseTemperament)return b;
 const personality=String(advertised||h.personality||'Neutral'),key=personality.toLowerCase().replace(/[^a-z]/g,''),ranges=PURCHASE_TEMPERAMENT_RANGES[key]||PURCHASE_TEMPERAMENT_RANGES.neutral;
 const profile={version:1,advertisedPersonality:personality,source};
 // Preserve prior learning and explicitly authored values, including older trial horses.
 const hasExperience=['history','important','processed','memories','experiences','completedBehaviorSessions'].some(field=>b[field]?.length)||Object.keys(b.riderTrustAdjustments||{}).length>0;
 const defaults=RR_LEARNED.every(stat=>b.learned?.[stat]===(/Avoidance|Sensitivity|Anticipation/.test(stat)?5:70));
 if(hasExperience||!defaults){profile.preservedExperience=true;b.purchaseTemperament=profile;return b;}
 const seed=HorseHealth.hash(h.id+'|purchase-temperament-v1'),roll=(stat,range,precision=1)=>{const [min,max]=range,value=min+HorseHealth.roll(seed,stat)*(max-min),factor=10**precision;return Math.round(value*factor)/factor;};
 b.naturalSpookiness=roll('natural-spookiness',ranges.spook,0);b.temperamentIntensity=roll('temperament-intensity',ranges.intensity,0);
 for(const stat of RR_LEARNED){
  // Innate spookiness is separate from learned avoidance and sensitization.
  const range=stat==='Rider Trust in Aids'?ranges.trust:/Avoidance|Sensitivity|Anticipation/.test(stat)?[0,20]:ranges.confidence;
  b.learned[stat]=roll(stat,range);
 }
 // Recorded repeated refusals support a more difficult jumping starting profile.
 if((h.showResults||[]).filter(result=>result.eliminated&&/refusal/i.test(result.eliminationReason||result.resultText||'')).length>=2){
  b.learned['Learned Fence Avoidance']=roll('recorded-refusals-avoidance',[25,55]);
  b.learned['Jump Confidence']=roll('recorded-refusals-confidence',[35,70]);
 }
 profile.initial={naturalSpookiness:b.naturalSpookiness,temperamentIntensity:b.temperamentIntensity,learned:{...b.learned}};
 b.purchaseTemperament=profile;return b;
}
const PURCHASE_TEMPERAMENT_LIST=HorseSales.list;
HorseSales.list=function(state,h,...args){const listing=PURCHASE_TEMPERAMENT_LIST(state,h,...args);if(listing.direction==='buy')preparePurchaseTemperament(listing.horse,listing.horse.personality,'sale:'+listing.id,state);return listing;};
const PURCHASE_TEMPERAMENT_INQUIRY=HorseSales.inquiry;
HorseSales.inquiry=function(state,...args){const tx=PURCHASE_TEMPERAMENT_INQUIRY(state,...args);if(tx?.direction==='buy'){const listing=HorseSales.listing(state,tx);if(listing)preparePurchaseTemperament(listing.horse,listing.horse.personality,'sale:'+listing.id,state);}return tx;};
const PURCHASE_TEMPERAMENT_PAY=HorseSales.pay;
HorseSales.pay=function(state,tx,...args){const result=PURCHASE_TEMPERAMENT_PAY(state,tx,...args);if(result.ok&&tx.direction==='buy'){const listing=HorseSales.listing(state,tx);if(listing)preparePurchaseTemperament(listing.horse,listing.horse.personality,'sale:'+listing.id,state);}return result;};
const PURCHASE_TEMPERAMENT_AUCTION=auctionGenerate;
auctionGenerate=function(...args){const collection=PURCHASE_TEMPERAMENT_AUCTION(...args);for(const lot of collection.lots)preparePurchaseTemperament(lot.horse,lot.horse.personality,'auction:'+lot.id);return collection;};
const PURCHASE_TEMPERAMENT_CONTRACT=auctionContract;
auctionContract=function(id,action,...args){const contract=PURCHASE_TEMPERAMENT_CONTRACT(id,action,...args);if(action==='pay'&&contract.paid&&!contract.cancelled)preparePurchaseTemperament(contract.horse,contract.horse.personality,'auction:'+contract.lotId);return contract;};
const PURCHASE_TEMPERAMENT_LESSON=lessonEnsureTerms;
lessonEnsureTerms=function(h,...args){const result=PURCHASE_TEMPERAMENT_LESSON(h,...args);preparePurchaseTemperament(h,h.personality,'lesson:'+h.id);return result;};
