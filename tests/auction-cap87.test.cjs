const {check}=require('./behavior5-harness.cjs');
check('three catalogs per cycle retain all eight rotating themes',`{
 resetGame();const kinds=new Set();for(let n=0;n<3;n++){auctionAdvance(auctionState().nextAt);const s=auctionState();if(s.collections.length!==3)throw Error('auction cap');for(const c of s.collections)kinds.add(c.kind);const count=s.collections.length;if(auctionGenerate(s.collections[0].previewAt,3,'Foal')!==null||s.collections.length!==count)throw Error('fourth catalog allowed');}if(kinds.size!==8)throw Error('lost variety');
}`);
check('legacy extra catalogs queue without losing bids, horses or save identities',`{
 resetGame();const at=pastureCalendarHour(),s=auctionState();for(let i=0;i<8;i++){const existing=s.collections;s.collections=[];const c=auctionGenerate(at,i,AUCTION86_KINDS[i]);s.collections=[...existing,c];}
 const identities=new Map(s.collections.map(c=>[c.id,c.lots.map(l=>l.horseId).join()]));for(const c of s.collections){const l=c.lots[0];l.leader='player';l.bid=l.startingPrice;l.history=[{at,bidder:'player',amount:l.bid}];}
 auctionAdvance(at);if(s.collections.length!==3||s.deferredCollections87.length!==5)throw Error('not queued');const deferred=s.deferredCollections87[0],id=deferred.id,lot=deferred.lots[0],bid=lot.bid,oldOpen=deferred.openAt,oldSchedule=lot.schedule.map(e=>e.at);
 const data=JSON.parse(serializeAppState());Save3.validate(data);hydrateFromSave(data);const restored=auctionState();if(restored.deferredCollections87.length!==5)throw Error('queue not saved');for(const c of [...restored.collections,...restored.deferredCollections87])if(identities.get(c.id)!==c.lots.map(l=>l.horseId).join())throw Error('horse identity lost');
 const next=restored.nextAt;auctionAdvance(next);const activated=restored.collections.find(c=>c.id===id);if(!activated||restored.collections.length!==3||restored.deferredCollections87.length!==2||activated.lots[0].bid!==bid||activated.lots[0].leader!=='player')throw Error('bid lost on activation');
 if(activated.openAt!==next+72||activated.lots[0].schedule.some((e,i)=>e.at-oldSchedule[i]!==activated.openAt-oldOpen))throw Error('bid schedule shifted incorrectly');
}`);
