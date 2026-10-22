/* Unified persistent sale transactions. Listing data owns the same horse identity. */
(function(root){
  'use strict';
  const H=root.HorseHealth;
  const sellers=[['Professional honest seller',30,.90,.97],['Private straightforward owner',30,.85,.97],['Busy professional',15,.87,.95],['Emotionally attached owner',15,.95,1.05],['Overoptimistic advertiser',8,.75,.92],['Deliberately misleading seller',2,.80,.97]];
  const transports={Local:120,Regional:350,'Long distance':800};
  function state(app){return app.sales2 ||= {version:1,sequence:0,listings:[],transactions:[],history:[]};}
  function list(app,horse,ask,day,direction='buy'){
    const s=state(app),existing=s.listings.find(l=>l.horseId===horse.id&&!['Complete','Cancelled'].includes(l.status));if(existing)return existing;
    if(!Number.isSafeInteger(ask)||ask<=0)throw new Error('A positive whole-number asking price is required.');
    if(direction==='sell'&&!app.horses.some(h=>h.id===horse.id&&h.owner==='Your Stable'&&!h.isLeased))throw new Error('Only an owned horse can be listed.');
    H.ensure(horse,day);
    const id=`listing-${++s.sequence}`,seed=H.hash(horse.id+'|seller'),value=H.roll(seed,'type')*100;let cumulative=0;const row=sellers.find(r=>(cumulative+=r[1])>value)||sellers[0];
    const listing={id,horseId:horse.id,horse,ask,reserve:Math.round(ask*(row[2]+H.roll(seed,'reserve')*(row[3]-row[2]))),sellerType:row[0],seller:direction==='sell'?'Your Stable':horse.owner||'Private owner',direction,status:'Listing Active',date:day,trialAvailable:horse.age>=3&&!horse.requiresBreakingIn,recordsAvailable:H.roll(seed,'records')>.2,location:'Local',claimedLevel:horse.showJumpingLevel||horse.jumpingLevel||'Schooling level unverified',disclosures:H.publicView(horse).confirmed,conversation:[]};
    s.listings.push(listing);return listing;
  }
  function inquiry(app,id,day){const s=state(app),l=s.listings.find(l=>l.id===id);if(!l||l.status!=='Listing Active')return null;let tx=s.transactions.find(t=>t.listingId===id&&!['Cancelled','Withdrawn','Complete'].includes(t.status));if(tx)return tx;
    tx={id:`transaction-${++s.sequence}`,listingId:id,horseId:l.horseId,direction:l.direction,status:'Inquiry Open',created:day,events:[],conversation:[],viewed:false,trial:false,ppe:null,offer:null,contract:null,paid:false,transferred:false};s.transactions.push(tx);return tx;
  }
  function listing(app,tx){return state(app).listings.find(l=>l.id===tx.listingId);}
  function active(app,tx){const l=listing(app,tx);return l&&l.status==='Listing Active'&&!['Cancelled','Withdrawn','Complete'].includes(tx.status)&&!tx.paid;}
  function say(app,tx,topic,day){if(!active(app,tx))return {ok:false,message:'This inquiry is closed.'};const l=listing(app,tx),h=l.horse;let text;
    switch(topic){
      case 'available':text=`${h.name} is still available. The asking price is $${l.ask}.`;break;
      case 'temperament':text=`The disclosed temperament is ${h.personality||'not recorded'}. Individual behavior can vary with context.`;break;
      case 'training':text=`The main discipline is ${l.mainDiscipline||'recorded in the listing'}. The advertised schooling is ${l.claimedLevel}. Competition records contain ${(h.showResults||[]).length} recorded results.`;break;
      case 'history':text=l.recordsAvailable?(l.disclosures.length?`Available records document: ${l.disclosures.map(d=>d.name).join(', ')}.`:'There is no confirmed condition in the available records. This does not exclude an undiscovered issue.'):'Historical medical records are incomplete.';break;
      case 'farrier':text=h.hoofHealth.history.length?`Last recorded service: ${h.hoofHealth.history.at(-1).service}.`:'The hoof-care history is incomplete.';break;
      case 'travel':text=(h.training2?.traits||[]).includes('Traffic Nervous')?'The records mention Traffic Nervous behavior.':'There is no verified travel assessment in the supplied records.';break;
      case 'tack':text=`The supplied tack record lists ${Object.values(h.tack||{}).filter(Boolean).join(', ')||'no verified equipment'}. Included equipment must be agreed separately.`;break;
      case 'reason':text='The recorded reason for sale is a change in the owner’s available time.';break;
      case 'viewing':if(tx.contract)return {ok:false,message:'The contract is already prepared. Complete or cancel it before arranging another viewing.'};tx.viewed=true;tx.status='Viewing Completed';text='You watch the horse being handled. A personal trial and independent examination are optional.';H.observe(h,'walk',day,`${tx.id}:viewing`);break;
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
    const l=listing(app,tx);tx.contract={horseId:l.horseId,registeredName:l.horse.name,seller:l.seller,buyer:tx.direction==='buy'?'Your Stable':'NPC Buyer',price:tx.offer,deposit:0,balance:tx.offer,equipment:[],disclosedConditions:H.copy([...new Map([...l.disclosures,...H.publicView(l.horse).confirmed].map(d=>[d.conditionId,d])).values()]),ppe:tx.ppe?H.copy(tx.ppe):'Not requested; buyer accepts examination uncertainty',transferDate:day,transport,transportCost:tx.direction==='buy'?Math.round(transports[transport]*(expedited?1.25:1)):0,expedited,sellerSigned:tx.direction==='buy',buyerSigned:tx.direction==='sell'};tx.status='Contract Draft';return {ok:true,contract:tx.contract};
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
      app.horses.push(h);}else{h.owner='NPC Buyer';app.horses=app.horses.filter(h=>h.id!==l.horseId);}
    (h.ownershipHistory ||= []).push({day,from:tx.contract.seller,to:tx.contract.buyer,transactionId:tx.id,price:tx.offer});
    tx.transferred=true;tx.status='Complete';tx.completed=day;l.status='Complete';
    for(const other of state(app).transactions)if(other.id!==tx.id&&other.listingId===l.id&&!other.paid)other.status='Cancelled';
    // Historical pools are retained in listing.horse; remove active advertisements only.
    app.saleBarn=(app.saleBarn||[]).filter(x=>x.id!==h.id);app.npcSales=(app.npcSales||[]).filter(x=>x.id!==h.id);return {ok:true};
  }
  function cancel(app,tx,day){if(tx.paid||tx.transferred)return {ok:false,message:'A paid transfer must be completed; cancellation cannot discard its horse or payment.'};if(['Cancelled','Withdrawn'].includes(tx.status))return {ok:true};tx.status='Cancelled';tx.events.push({day,type:'Cancelled'});return {ok:true};}
  function ppe(app,tx,packageName,day,eventId){if(!active(app,tx)||tx.direction!=='buy'||tx.contract)return {ok:false,message:'An active buying inquiry without a prepared contract is required.'};const packages={Basic:[250,['general','lameness']],Sport:[650,['general','lameness','respiratory','dental']],Advanced:[1200,['general','lameness','respiratory','dental','ultrasound','radiographs']]},p=packages[packageName];if(!p)return {ok:false,message:'Choose a PPE package.'};if(tx.ppe)return {ok:true,report:tx.ppe};
    const l=listing(app,tx),receipt=H.ledger(app,`ppe:${eventId}`,p[0],day,l.horse,[{name:`${packageName} PPE`,quantity:1,unitPrice:p[0]}]);if(!receipt)return {ok:false,message:'Insufficient funds.'};
    const shadow={money:1000000},reports=p[1].map(type=>H.examine(shadow,l.horse,type,day,`${eventId}:${type}`)).filter(r=>r.ok).map(r=>r.report);
    tx.ppe={day,packageName,horseId:l.horseId,intendedUse:'Suitable schooling / sport',tests:p[1],observations:reports.flatMap(r=>r.observed),diagnoses:reports.flatMap(r=>r.diagnoses),history:H.publicView(l.horse).history,uncertainty:'The examination cannot guarantee future soundness. The buyer decides whether the uncertainties are acceptable.',receipt:receipt.number};tx.status='PPE Completed';return {ok:true,report:tx.ppe};
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
  function deleteConversation(tx){
    if(tx.conversation?.length)(tx.deletedConversations ||= []).push(H.copy(tx.conversation));
    tx.conversation=[];tx.conversationDeleted=true;return {ok:true,message:'Conversation removed. Transaction and horse records are unchanged.'};
  }
  function restoreConversation(tx){
    const previous=tx.deletedConversations?.pop();if(previous)tx.conversation=[...previous,...(tx.conversation||[])];
    tx.conversationDeleted=false;return {ok:true,message:'Conversation restored.'};
  }
  root.HorseSales={scheduleMarketExit,deleteConversation,restoreConversation,advanceMarket,sellers,transports,state,list,inquiry,listing,active,say,offer,contract,sign,pay,deliver,cancel,ppe};if(typeof module!=='undefined')module.exports=root.HorseSales;
})(globalThis);
