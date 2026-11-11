/* Match the save codec's existing reference compaction on an isolated snapshot. */
self.onmessage=({data:state})=>{
 try{
  const owned=new Set((state.horses||[]).map(h=>h.id));
  for(const contract of state.auctions3?.contracts||[])if(contract.delivered&&owned.has(contract.horse?.id))contract.horse={id:contract.horse.id};
  const collections=[...(state.auctions3?.collections||[]),...(state.auctions3?.deferredCollections87||[])],current=new Set(collections.flatMap(c=>c.lots).map(l=>l.horseId));
  for(const rider of state.career?.npcs||[])if(rider.horses?.some(h=>current.has(h.id)))rider.horses=rider.horses.map(h=>current.has(h.id)?{id:h.id}:h);
  self.postMessage({payload:JSON.stringify(state)});
 }catch(error){self.postMessage({error:error.message});}
};
