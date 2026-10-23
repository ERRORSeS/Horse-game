/* Unified persistent sale transactions. Listing data owns the same horse identity. */
(function(root){
  'use strict';
  const H=root.HorseHealth;
  const sellers=[['Professional honest seller',30,.90,.97],['Private straightforward owner',30,.85,.97],['Busy professional',15,.87,.95],['Emotionally attached owner',15,.95,1.05],['Overoptimistic advertiser',8,.75,.92],['Deliberately misleading seller',2,.80,.97]];
  const transports={Local:120,Regional:350,'Long distance':800};
  function state(app){return app.sales2 ||= {version:1,sequence:0,listings:[],transactions:[],history:[]};}
  function list(app,horse,ask,day,direction='buy'){
    const s=state(app),existing=s.listings.find(l=>l.horseId===horse.id&&['Listing Active','Reserved'].includes(l.status));if(existing)return existing;
    if(!Number.isSafeInteger(ask)||ask<=0)throw new Error('A positive whole-number asking price is required.');
    if(direction==='sell'&&!app.horses.some(h=>h.id===horse.id&&h.owner==='Your Stable'&&!h.isLeased))throw new Error('Only an owned horse can be listed.');
    H.ensure(horse,day);
    const id=`listing-${++s.sequence}`,seed=H.hash(horse.id+'|seller'),value=H.roll(seed,'type')*100;let cumulative=0;const row=sellers.find(r=>(cumulative+=r[1])>value)||sellers[0];
    const listing={id,horseId:horse.id,horse,ask,reserve:Math.round(ask*(row[2]+H.roll(seed,'reserve')*(row[3]-row[2]))),sellerType:row[0],seller:direction==='sell'?'Your Stable':horse.owner||'Private owner',direction,status:'Listing Active',date:day,trialAvailable:horse.age>=3&&!horse.requiresBreakingIn,recordsAvailable:H.roll(seed,'records')>.2,location:'Local',claimedLevel:horse.showJumpingLevel||horse.jumpingLevel||'Schooling level unverified',disclosures:H.publicView(horse).confirmed,conversation:[]};
    s.listings.push(listing);return listing;
  }
  function inquiry(app,id,day){const s=state(app),l=s.listings.find(l=>l.id===id);if(!l||l.status!=='Listing Active')return null;let tx=s.transactions.find(t=>t.listingId===id&&!['Cancelled','Withdrawn','Complete','Declined'].includes(t.status));if(tx)return tx;
    tx={id:`transaction-${++s.sequence}`,listingId:id,horseId:l.horseId,direction:l.direction,status:'Inquiry Open',created:day,events:[],conversation:[],viewed:false,trial:false,ppe:null,offer:null,contract:null,paid:false,transferred:false};s.transactions.push(tx);return tx;
  }
  function listing(app,tx){return state(app).listings.find(l=>l.id===tx.listingId);}
  function active(app,tx){const l=listing(app,tx);return l&&l.status==='Listing Active'&&!['Cancelled','Withdrawn','Complete','Declined'].includes(tx.status)&&!tx.paid;}
  function sellerVariant(l,topic,lines){return lines[Math.floor(H.roll(H.hash(l.horseId+'|seller-reply'),topic)*lines.length)];}
  function travelReply(l){
    const h=l.horse,traits=h.training2?.traits||[];
    if(!l.travelProfile){
      const nervous=traits.includes('Traffic Nervous')||traits.some(t=>/load|trailer|travel/i.test(t));
      const u=H.roll(H.hash(h.id+'|travel'),'profile');
      l.travelProfile=nervous?'nervous':u<.30?'easy':u<.55?'patient':u<.73?'company':u<.86?'inexperienced':'unverified';
    }
    const lines={
      nervous:['The seller reports hesitation at the ramp and tension around traffic. Allow patient handling and assess loading yourself.','Loading can be difficult, especially around traffic; the seller describes stopping at the ramp.'],
      easy:['The seller reports walking onto the trailer calmly and settling during familiar journeys.','According to the seller, loading is usually straightforward and the horse travels quietly.'],
      patient:['The seller says loading usually takes a little time and a quiet approach, then the horse settles.','The horse reportedly pauses at the ramp but loads with patient, familiar handling.'],
      company:['The seller reports better loading and travel with a familiar companion. Solo travel is less settled.','Travel is reportedly easier in company; the horse may call and hesitate when loaded alone.'],
      inexperienced:['Travel experience is limited. The seller cannot promise consistent loading in a new trailer.','The horse has reportedly made few journeys, so loading and travel still need assessment.'],
      unverified:['There is no verified loading or travel assessment in the supplied records.','The seller has not supplied reliable travel records; arrange a loading assessment if it matters to you.']};
    return sellerVariant(l,'travel',lines[l.travelProfile]||lines.unverified);
  }
  function historyReply(l){
    if(!l.recordsAvailable)return sellerVariant(l,'history',['Historical medical records are incomplete; an independent examination may help assess current concerns.','The seller cannot provide a complete medical history. Missing records do not establish soundness.','Only partial health records are available, so previous issues remain uncertain.']);
    const known=[...new Set([...(l.disclosures||[]),...H.publicView(l.horse).confirmed].map(d=>d.name))];
    return known.length?sellerVariant(l,'history',[`The available records document: ${known.join(', ')}. Ask the veterinarian about their relevance to your plans.`,`The disclosed medical history includes ${known.join(', ')}. The records do not rule out other problems.`,`Known, documented concerns are ${known.join(', ')}. A current assessment is still advisable.`]):sellerVariant(l,'history',['No confirmed condition is documented in the available records. An undiscovered issue is still possible.','The supplied history lists no confirmed medical issue, but this is not a guarantee of soundness.','There is no recorded diagnosis to disclose. Subtle or previously unrecorded problems may still exist.']);
  }
  function trainingReply(l){
    const h=l.horse,results=h.showResults||[],intro=`The main discipline is ${l.mainDiscipline||'recorded in the listing'}. The advertised schooling is ${l.claimedLevel}. `;
    if(!l.recordsAvailable)return intro+sellerVariant(l,'training',['Competition records are incomplete; the advertised schooling is a seller claim, not a verified competition result.','The seller has not supplied a complete competition record. Assess the advertised level during a suitable trial.']);
    if(!results.length)return intro+sellerVariant(l,'training',['No competition results are recorded; schooling experience should be assessed separately.','There is no documented competition history. The horse may have schooling experience without show results.','The supplied record contains no show results, so the advertised level is not competition-proven here.']);
    const latest=results.at(-1),wins=results.filter(r=>Number(r.placing)===1).length,detail=[latest.discipline,latest.level!==undefined?`level ${latest.level}`:'',latest.placing?`placing ${latest.placing}`:''].filter(Boolean).join(', ');
    return intro+sellerVariant(l,'training',[`The supplied record contains ${results.length} results, including ${wins} wins. Latest recorded outing: ${detail||'details incomplete'}.`,`There are ${results.length} documented outings. The latest result lists ${detail||'incomplete details'}; ${wins} recorded wins overall.`,`Competition history shows ${results.length} results and ${wins} wins. Most recent entry: ${detail||'details incomplete'}.`]);
  }
  function say(app,tx,topic,day){if(!active(app,tx))return {ok:false,message:'This inquiry is closed.'};const l=listing(app,tx),h=l.horse;let text;
    switch(topic){
      case 'available':text=`${h.name} is still available. The asking price is $${l.ask}.`;break;
      case 'temperament':text=`The disclosed temperament is ${h.personality||'not recorded'}. Individual behavior can vary with context.`;break;
      case 'training':text=trainingReply(l);break;
      case 'history':text=historyReply(l);break;
      case 'farrier':text=h.hoofHealth.history.length?`Last recorded service: ${h.hoofHealth.history.at(-1).service}.`:'The hoof-care history is incomplete.';break;
      case 'travel':text=travelReply(l);break;
      case 'tack':text=`The supplied tack record lists ${Object.values(h.tack||{}).filter(Boolean).join(', ')||'no verified equipment'}. Included equipment must be agreed separately.`;break;
      case 'reason':text='The recorded reason for sale is a change in the owner’s available time.';break;
      case 'trot-up':case 'lunge-observation':{if(H.allowed(h,'ridden',1))return {ok:false,message:'Movement assessment requires veterinary clearance before further exercise.'};const found=H.observe(h,topic==='trot-up'?'trot':'circle',day,`${tx.id}:${topic}`);text=found.map(o=>o.text).join(' ')||'No new movement finding was observed; this does not establish soundness.';break;}
      case 'viewing':if(tx.contract)return {ok:false,message:'The contract is already prepared. Complete or cancel it before arranging another viewing.'};tx.viewed=true;tx.status='Viewing Completed';text='You watch the horse being handled. A personal trial and independent examination are optional.';H.observe(h,'stall',day,`${tx.id}:viewing-close`);H.observe(h,'walk',day,`${tx.id}:viewing`);break;
      default:return {ok:false,message:'Choose an available conversation topic.'};
    }
    if(tx.status==='Inquiry Open')tx.status='Seller Contacted';tx.conversation.push({day,topic,text});return {ok:true,message:text};
  }
  function offer(app,tx,amount,day){if(!active(app,tx)||tx.contract)return {ok:false,message:'This transaction cannot be renegotiated in its current state.'};if(!Number.isSafeInteger(amount)||amount<=0)return {ok:false,message:'Enter a positive whole-number offer.'};
    const l=listing(app,tx);tx.events.push({day,type:'Offer',amount});
    if(amount<Math.min(l.reserve,l.ask)){tx.status='Negotiation';return {ok:false,message:`The offer was declined. The counteroffer is $${Math.min(l.reserve,l.ask)}.`};}
    tx.offer=amount;tx.status='Offer Accepted';return {ok:true,message:'The price is agreed. Review the contract before signing.'};
  }
  function contract(app,tx,day,transport='Local',expedited=false){if(!active(app,tx)||tx.offer===null||!transports[transport])return {ok:false,message:'Agree a price and valid transport arrangement first.'};
    if(tx.contract)return {ok:true,contract:tx.contract};
    const l=listing(app,tx);tx.contract={horseId:l.horseId,registeredName:l.horse.name,seller:l.seller,buyer:tx.direction==='buy'?'Your Stable':tx.buyerName||'NPC Buyer',price:tx.offer,deposit:0,balance:tx.offer,equipment:[],disclosedConditions:H.copy([...new Map([...l.disclosures,...H.publicView(l.horse).confirmed].map(d=>[d.conditionId,d])).values()]),ppe:tx.ppe?H.copy(tx.ppe):'Not requested; buyer accepts examination uncertainty',transferDate:day,transport,transportCost:tx.direction==='buy'?Math.round(transports[transport]*(expedited?1.25:1)):0,expedited,sellerSigned:tx.direction==='buy',buyerSigned:tx.direction==='sell'};tx.status='Contract Draft';return {ok:true,contract:tx.contract};
  }
  function validEquipment(l,c){
    const equipment=c.equipment||[],ids=new Set();let total=0;
    for(const item of equipment){const offered=(l.tackOffers||[]).find(i=>i.id===item.id);if(!offered||ids.has(item.id)||item.salePrice!==offered.salePrice||item.type!==offered.type)return false;ids.add(item.id);total+=offered.salePrice;}
    return (c.equipmentCost||0)===total;
  }
  function sign(app,tx,confirmed){if(!active(app,tx)||tx.status!=='Contract Draft'||confirmed!==true)return {ok:false,message:'Review and explicitly confirm the contract signature.'};const l=listing(app,tx),c=tx.contract;
    if(!validEquipment(l,c)||c.horseId!==l.horseId||c.registeredName!==l.horse.name||c.price!==tx.offer||c.balance+c.deposit!==c.price)return {ok:false,message:'Contract identity or price differs from the agreed listing. Recreate the contract.'};
    c.sellerSigned=true;c.buyerSigned=true;tx.status='Contract Signed';return {ok:true};
  }
  function pay(app,tx,day){if(tx.paid)return {ok:true,receipt:tx.receipt};const l=listing(app,tx),c=tx.contract;
    if(!active(app,tx)||tx.status!=='Contract Signed'||!c?.sellerSigned||!c?.buyerSigned)return {ok:false,message:'A current signed contract is required.'};
    if(!validEquipment(l,c)||c.horseId!==l.horseId||c.price!==tx.offer||c.registeredName!==l.horse.name)return {ok:false,message:'Contract details have changed.'};
    const isOwned=app.horses.some(h=>h.id===l.horseId);if((tx.direction==='buy'&&isOwned)||(tx.direction==='sell'&&!isOwned))return {ok:false,message:'Ownership no longer matches this transaction.'};
    const equipmentCost=c.equipmentCost||0;if(!Number.isSafeInteger(equipmentCost)||equipmentCost<0)return {ok:false,message:'Invalid equipment price.'};const total=c.price+c.transportCost+equipmentCost;if(tx.direction==='buy'&&app.money<total)return {ok:false,message:'Insufficient funds for the price and agreed transport.'};
    // Validate everything before the synchronous money mutation. Delivery is separate and idempotent.
    app.money+=tx.direction==='buy'?-total:c.price+equipmentCost;tx.paid=true;tx.status='Transport Pending';l.status='Reserved';
    tx.receipt={number:`SALE-${tx.id}`,date:day,horseId:l.horseId,horse:l.horse.name,price:c.price,equipment:equipmentCost,transport:c.transportCost,total:tx.direction==='buy'?total:c.price,status:'Paid',direction:tx.direction};state(app).history.push(H.copy(tx.receipt));return {ok:true,receipt:tx.receipt};
  }
  function deliver(app,tx,day){if(tx.transferred)return {ok:true};const l=listing(app,tx);if(!tx.paid||tx.status!=='Transport Pending'||!l)return {ok:false,message:'Payment and transport arrangements are required.'};
    const h=tx.direction==='sell'?app.horses.find(h=>h.id===l.horseId):l.horse;if(!h)return {ok:false,message:'Horse identity could not be located; contact support before changing the transaction.'};
    if(tx.direction==='buy'){if(app.horses.some(h=>h.id===l.horseId))return {ok:false,message:'This horse is already present.'};h.owner='Your Stable';
      if(l.sellerTackItems){
        const management=app.management ||= {version:1,sequence:0,items:[],receipts:[],inventoryMigrated:false};
        h.sellerTackHistory=H.copy(l.sellerTackItems);h.tack={};h.equipmentRefs={};
        for(const equipment of (tx.contract.equipment||[])){
          const offered=(l.tackOffers||[]).find(i=>i.id===equipment.id);if(!offered)continue;
          let item=management.items.find(i=>i.id===offered.id);
          if(!item){item={...H.copy(offered),sellerOwned:false,assignedHorseId:h.id,assignedSlot:offered.slot};management.items.push(item);}
          h.tack[offered.slot]=item.type;h.equipmentRefs[offered.slot]=item.id;
        }
      }
      app.horses.push(h);}else{h.owner=tx.contract.buyer;app.horses=app.horses.filter(h=>h.id!==l.horseId);}
    l.horse=h;
    (h.ownershipHistory ||= []).push({day,from:tx.contract.seller,to:tx.contract.buyer,transactionId:tx.id,price:tx.offer});
    tx.transferred=true;tx.status='Complete';tx.completed=day;l.status=tx.direction==='sell'?'Sold':'Complete';
    for(const other of state(app).transactions)if(other.id!==tx.id&&other.listingId===l.id&&!other.paid)other.status='Cancelled';
    // Historical pools are retained in listing.horse; remove active advertisements only.
    app.saleBarn=(app.saleBarn||[]).filter(x=>x.id!==h.id);app.npcSales=(app.npcSales||[]).filter(x=>x.id!==h.id);return {ok:true};
  }
  function cancel(app,tx,day){if(tx.paid||tx.transferred)return {ok:false,message:'A paid transfer must be completed; cancellation cannot discard its horse or payment.'};if(['Cancelled','Withdrawn'].includes(tx.status))return {ok:true};tx.status='Cancelled';tx.events.push({day,type:'Cancelled'});return {ok:true};}
  function ppe(app,tx,packageName,day,eventId){if(!active(app,tx)||tx.contract)return {ok:false,message:'An active buying inquiry without a prepared contract is required.'};const packages={Basic:[250,['general','lameness']],Sport:[650,['general','lameness','respiratory','dental']],Advanced:[1200,['general','lameness','respiratory','dental','ultrasound','radiographs']],Digestive:[530,['general','gastroscopy','parasite']],Hoof:[305,['general','hoof','lameness']],Eye:[180,['general','eye']]},p=packages[packageName];if(!p)return {ok:false,message:'Choose a PPE package.'};if(tx.ppe)return {ok:true,report:tx.ppe};
    const l=listing(app,tx),payer=tx.direction==='sell'?{money:1000000}:app,receipt=H.ledger(payer,`ppe:${eventId}`,p[0],day,l.horse,[{name:`${packageName} PPE`,quantity:1,unitPrice:p[0]}]);if(!receipt)return {ok:false,message:'Insufficient funds.'};
    const shadow={money:1000000},reports=p[1].map(type=>H.examine(shadow,l.horse,type,day,`${eventId}:${type}`)).filter(r=>r.ok).map(r=>r.report);
    tx.ppe={day,packageName,horseId:l.horseId,intendedUse:'Suitable schooling / sport',tests:p[1],observations:reports.flatMap(r=>r.observed),diagnoses:reports.flatMap(r=>r.diagnoses),history:H.publicView(l.horse).history,messages:[...new Set(reports.flatMap(r=>r.messages||[]))],recommendedTests:[...new Set(reports.flatMap(r=>r.recommendedTests||[]))],paidBy:tx.direction==='sell'?tx.buyerName||'NPC Buyer':'Your Stable',uncertainty:'The examination cannot guarantee future soundness. The buyer decides whether the uncertainties are acceptable.',receipt:receipt.number};if(tx.ppe.diagnoses.length)tx.ppe.messages.push("The identified condition may influence the horse's suitability for "+(l.mainDiscipline||'the proposed discipline')+'.');tx.status='PPE Completed';return {ok:true,report:tx.ppe};
  }
  function scheduleMarketExit(l){
    if(l.marketTimingVersion===1)return;
    const values=[...Object.values(l.horse.stats?.jumping||{}),...Object.values(l.horse.stats?.dressage||{})].filter(Number.isFinite),average=values.reduce((n,v)=>n+v,0)/Math.max(1,values.length);
    const ability=Math.max(0,Math.min(1,l.marketAbility??average/100)),u=H.roll(H.hash(l.horseId+'|market'),'lifetime');
    l.marketLifetimeMonths=1+Math.min(9,Math.floor(10*Math.pow(u,1+ability*2)));
    l.marketExitDay=l.date+l.marketLifetimeMonths*30;l.marketTimingVersion=1;
  }
  function advanceMarket(app,day){
    const s=state(app);
    advanceBuyers(app,day);
    for(const l of s.listings){
      if(l.direction!=='buy'||l.status!=='Listing Active')continue;scheduleMarketExit(l);
      if(day<l.marketExitDay)continue;
      l.status='Sold Elsewhere';l.closed=l.marketExitDay;l.horse.owner='Another Stable';
      (l.horse.ownershipHistory ||= []).push({day:l.closed,from:l.seller,to:'Another Stable',listingId:l.id});
      s.history.push({number:`MARKET-${l.id}`,date:l.closed,horseId:l.horseId,horse:l.horse.name,total:null,status:'Sold Elsewhere'});
      for(const tx of s.transactions.filter(t=>t.listingId===l.id&&!t.paid&&!['Complete','Cancelled','Withdrawn'].includes(t.status))){tx.status='Withdrawn';tx.events.push({day:l.closed,type:'Listing ended before payment'});}
    }
    s.lastMarketDay=Math.max(s.lastMarketDay||day,day);
  }
  function advanceBuyers(app,day){
    const s=state(app);
    for(const l of s.listings.filter(l=>l.direction==='sell'&&l.status==='Listing Active')){
      if(!app.horses.some(h=>h.id===l.horseId&&!h.deceased&&!h.isLeased))continue;
      l.nextBuyerDay ??= l.date+1;
      if(day<l.nextBuyerDay)continue;
      const current=s.transactions.find(t=>t.listingId===l.id&&!['Cancelled','Withdrawn','Complete','Declined'].includes(t.status));
      if(current?.buyerOffer)continue;
      if(current&&(current.contract||current.status==='Offer Accepted')){current.buyerName ||= current.contract?.buyer||'NPC Buyer';current.buyerOffer=current.offer;continue;}
      const tx=current||inquiry(app,l.id,day);if(!tx)continue;
      const seed=H.hash(l.id+'|buyer:'+ (l.buyerCount||0));l.buyerCount=(l.buyerCount||0)+1;
      tx.buyerName=['Willow Creek Stable','Northfield Equestrian','Oakridge Horses','Meadowbrook Rider'][Math.floor(H.roll(seed,'name')*4)];
      tx.buyerOffer=Math.max(1,Math.round(l.ask*(.85+H.roll(seed,'offer')*.15)));tx.buyerLimit=Math.round(l.ask*(1+H.roll(seed,'limit')*.12));
      tx.status='Buyer Offer Received';tx.conversation.push({day,topic:'Buyer inquiry',text:tx.buyerName+' offers $'+tx.buyerOffer+' for '+l.horse.name+'.'});tx.events.push({day,type:'Buyer Offer',amount:tx.buyerOffer});l.nextBuyerDay=day+3;
    }
  }
  function respondOffer(app,tx,action,amount,day){
    if(tx.direction!=='sell'||!active(app,tx)||tx.contract||!tx.buyerOffer)return {ok:false,message:'An active buyer offer without a contract is required.'};
    if(action==='decline'){tx.status='Declined';tx.events.push({day,type:'Offer Declined'});listing(app,tx).nextBuyerDay=day+1;return {ok:true,message:'The offer was declined. The listing remains available to other buyers.'};}
    const price=action==='accept'?tx.buyerOffer:amount;
    if(!Number.isSafeInteger(price)||price<=0)return {ok:false,message:'Enter a positive whole-number price.'};
    if(action==='counter'&&price>tx.buyerLimit){tx.events.push({day,type:'Counteroffer Declined',amount:price});tx.conversation.push({day,text:tx.buyerName+' declines that counteroffer. The current offer remains $'+tx.buyerOffer+'.'});return {ok:false,message:'The buyer declined the counteroffer; the existing offer remains available.'};}
    tx.offer=price;tx.buyerOffer=price;tx.status='Offer Accepted';tx.events.push({day,type:action==='counter'?'Counteroffer Accepted':'Offer Accepted',amount:price});
    tx.conversation.push({day,text:tx.buyerName+' agrees to $'+price+'. Review the contract before signing.'});return {ok:true,message:'The price is agreed. Review the sale contract.'};
  }
  function editPrice(app,l,price,day){
    if(l.direction!=='sell'||l.status!=='Listing Active'||state(app).transactions.some(t=>t.listingId===l.id&&t.contract&&!['Cancelled','Declined'].includes(t.status)))return {ok:false,message:'The listing cannot be repriced while a contract is pending.'};
    if(!Number.isSafeInteger(price)||price<=0)return {ok:false,message:'Enter a positive whole-number price.'};
    l.ask=price;l.priceHistory ||= [];l.priceHistory.push({day,price});return {ok:true,message:'The asking price has been updated. Existing buyer offers retain their agreed amounts.'};
  }
  function withdrawListing(app,l,day){
    if(!l||l.direction!=='sell'||l.status!=='Listing Active'||state(app).transactions.some(t=>t.listingId===l.id&&t.paid))return {ok:false,message:'A paid or completed listing cannot be withdrawn.'};
    l.status='Withdrawn';l.closed=day;for(const tx of state(app).transactions.filter(t=>t.listingId===l.id&&!t.paid&&!t.transferred)){tx.status='Withdrawn';tx.events.push({day,type:'Listing Withdrawn'});}return {ok:true,message:'The listing was withdrawn. The horse remains in your stable.'};
  }
  function completeSale(app,tx,day){
    if(tx.direction!=='sell')return {ok:false,message:'This action is for an owned horse sale.'};
    if(tx.transferred)return {ok:true,message:listing(app,tx).horse.name+' has been sold for $'+tx.offer+'.'};
    const payment=pay(app,tx,day);if(!payment.ok)return payment;
    const transfer=deliver(app,tx,day);if(!transfer.ok)return transfer;
    const l=listing(app,tx);return {ok:true,message:l.horse.name+' has been sold for $'+tx.offer+'.',receipt:tx.receipt};
  }
  function deleteConversation(tx){
    if(tx.conversation?.length)(tx.deletedConversations ||= []).push(H.copy(tx.conversation));
    tx.conversation=[];tx.conversationDeleted=true;return {ok:true,message:'Conversation removed. Transaction and horse records are unchanged.'};
  }
  function restoreConversation(tx){
    const previous=tx.deletedConversations?.pop();if(previous)tx.conversation=[...previous,...(tx.conversation||[])];
    tx.conversationDeleted=false;return {ok:true,message:'Conversation restored.'};
  }
  root.HorseSales={advanceBuyers,respondOffer,editPrice,withdrawListing,completeSale,scheduleMarketExit,deleteConversation,restoreConversation,advanceMarket,sellers,transports,state,list,inquiry,listing,active,say,offer,contract,sign,pay,deliver,cancel,ppe};if(typeof module!=='undefined')module.exports=root.HorseSales;
})(globalThis);
