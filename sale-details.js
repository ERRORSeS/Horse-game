/* Saved sale locations and seller circumstances; agreed quotes remain unchanged. */
function saleEnsureReason(l){
 if(typeof l.saleReason==='string')l.saleReason={code:'seller-provided',text:l.saleReason};
 if(!l.saleReason?.text)l.saleReason=HorseSales.reasonForSale(l.horse,l.direction);
 return l.saleReason;
}
function saleEnsureMarketDetails(l){
 saleEnsureReason(l);if(l.saleLocationVersion===1||l.direction!=='buy'||l.status!=='Listing Active')return l;
 l.baseAsk=l.ask;l.locationPriceMultiplier=1;l.saleLocationVersion=1;
 if(HorseSales.state(app).transactions.some(tx=>tx.listingId===l.id))return l;
 const seed=HorseHealth.hash(l.horseId+'|sale-location'),locations=['Local','Regional','International','Intercontinental'];
 if(!locations.includes(l.location)||l.location==='Local')l.location=locations[Math.min(3,Math.floor(HorseHealth.roll(seed,'location')*locations.length))];
 if(l.location!=='Local'&&HorseHealth.roll(seed,'market-price')<.5){
  const limits=({Regional:[.95,1.10],International:[.90,1.20],Intercontinental:[.85,1.25]})[l.location];
  l.locationPriceMultiplier=Math.round((limits[0]+HorseHealth.roll(seed,'market-adjustment')*(limits[1]-limits[0]))*100)/100;
  l.ask=Math.max(1,Math.round(l.baseAsk*l.locationPriceMultiplier));l.reserve=Math.max(1,Math.round(l.reserve*l.locationPriceMultiplier));
 }
 return l;
}
const SALE_DETAILS_PROSPECTS=csProspects;csProspects=function(...args){const result=SALE_DETAILS_PROSPECTS(...args);HorseSales.state(app).listings.forEach(saleEnsureMarketDetails);return result;};
const SALE_DETAILS_AD=csSaleMarkup;csSaleMarkup=function(l){
 const reason=saleEnsureReason(l),fee=HorseSales.transports[l.location]||HorseSales.transports.Local;
 return SALE_DETAILS_AD(l).replace('<p>Main discipline:', '<p>Reason for sale: '+csEscape(reason.text)+'</p>'+(l.direction==='buy'?'<p>Transport from this location: from '+money(fee)+'.</p>':'')+'<p>Main discipline:');
};
const SALE_DETAILS_TRANSACTION=csTransactionMarkup;csTransactionMarkup=function(tx){
 const l=HorseSales.listing(app,tx),reason=saleEnsureReason(l);let html=SALE_DETAILS_TRANSACTION(tx);if(tx.direction!=='buy')return html;
 html=html.replace('id="cs-sale-topic">','id="cs-sale-topic"><option value="potential">Does the horse have potential to go higher?</option>');
 const minimum=HorseSales.transports[l.location]||HorseSales.transports.Local,options=Object.keys(HorseSales.transports).filter(route=>HorseSales.transports[route]>=minimum),preferred=options.includes(l.location)?l.location:options[0];
 html=html.replace(/<select id="cs-sale-transport">[\s\S]*?<\/select>/,'<select id="cs-sale-transport">'+csOptions(options,preferred)+'</select>');
 return html.replace('<p class="small">Inquiry opened','<p>Location: '+csEscape(l.location)+' · Transport from '+money(minimum)+'</p><p>Reason for sale: '+csEscape(reason.text)+'</p><p class="small">Inquiry opened');
};
const SALE_DETAILS_HYDRATE=hydrateFromSave;hydrateFromSave=function(data,...args){
 const result=SALE_DETAILS_HYDRATE(data,...args);for(const l of HorseSales.state(app).listings)saleEnsureReason(l);
 const session=t2state().session;if(session?.saleTrial&&!session.finished){session.length=50;delete session.saleTrial.maxHeight;}
 return result;
};

const SALE_POTENTIAL_SAY=HorseSales.say;
HorseSales.say=function(app,tx,topic,day){
 if(topic!=='potential')return SALE_POTENTIAL_SAY(app,tx,topic,day);
 if(!HorseSales.active(app,tx))return {ok:false,message:'This inquiry is closed.'};
 const listing=HorseSales.listing(app,tx),h=HorseHealth.copy(listing.horse),d=listing.mainDiscipline||'jumping';
 const unstarted=h.age<=3||h.requiresBreakingIn,current=unstarted?-1:highestAllowedLevelIndex(h,d),potential=auctionPotentialIndex(h,d);
 const higher=potential>current,currentLabel=unstarted?'Unstarted':SHOW_LEVELS[d][current],upper=SHOW_LEVELS[d][potential];
 const text=(higher?'Yes, there is potential to progress above the current level. ':'No, the current schooling is already at the estimated potential ceiling. ')+auctionDisciplineName(d)+': current schooling '+currentLabel+'; estimated potential '+upper+(d==='jumping'?' m':'')+'. Progress depends on training, soundness and the horse’s development; the estimate is not a promised competition result.';
 tx.conversation.push({day,topic,text});if(tx.status==='Inquiry Open')tx.status='Seller Contacted';return {ok:true,message:text};
};
