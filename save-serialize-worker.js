/* Match the save codec's existing reference compaction on an isolated snapshot. */
self.onmessage=async({data})=>{
 const state=data.storage===true&&data.state?data.state:data,storage=data.storage===true&&!!data.state;
 try{
  const owned=new Set((state.horses||[]).map(h=>h.id));
  for(const contract of state.auctions3?.contracts||[])if(contract.delivered&&owned.has(contract.horse?.id))contract.horse={id:contract.horse.id};
  const collections=[...(state.auctions3?.collections||[]),...(state.auctions3?.deferredCollections87||[])],current=new Set(collections.flatMap(c=>c.lots).map(l=>l.horseId));
  for(const rider of state.career?.npcs||[])if(rider.horses?.some(h=>current.has(h.id)))rider.horses=rider.horses.map(h=>current.has(h.id)?{id:h.id}:h);
  const payload=JSON.stringify(state);
  if(storage&&payload.length>=32000000&&typeof CompressionStream!=='undefined'&&typeof DecompressionStream!=='undefined'){
   const payloadGzip=await new Response(new Blob([payload]).stream().pipeThrough(new CompressionStream('gzip'))).blob();
   self.postMessage({payload:null,payloadEncoding:'gzip',payloadGzip});
  }else self.postMessage({payload});
 }catch(error){self.postMessage({error:error.message});}
};
