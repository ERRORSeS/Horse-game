/* Recovery never deletes other stables or silently replaces an unreadable save. */
const SAVE96_SETTINGS=renderSettings;
renderSettings=function(...args){
 const result=SAVE96_SETTINGS(...args),node=document.querySelector('[data-save3-panel]'),details=node?.querySelector('[data-save3-disclosure]');if(!details)return result;
 const recovery=document.createElement('section');recovery.dataset.save96Recovery='';recovery.innerHTML='<h3>Device save recovery</h3><p data-save96-reason></p><button type="button" data-save96-retry>Retry save storage</button><button type="button" data-save96-delete-current>Delete this local save</button><p role="status" data-save96-status></p>';details.appendChild(recovery);
 recovery.querySelector('[data-save96-reason]').textContent=Save3.error?.message||(Save3.ready?'Save storage is ready.':'Save storage has not finished opening.');
 if(!Save3.ready)details.open=true;
 const status=recovery.querySelector('[data-save96-status]'),found=node.querySelector('[data-save3-found]');
 const run=fn=>async()=>{try{await fn();}catch(error){status.textContent=error.message;}};
 const remove=async(id,name)=>{
  if(!confirm('Delete "'+name+'" ('+id+') from this device? This permanently removes that local save. Other saved stables are kept. Cancel to export it first.'))return false;
  status.textContent='Deleting this local save…';const removed=await Save3.remove(id);
  if(removed.current||removed.blocked){resetGame();await Save3.create('New Stable');render();changeTab('settings');renderSettings();saveFeedback('Deleted the selected local save and created a fresh stable.');}
  else status.textContent='Deleted '+name+'. Other local saves were kept.';
  return true;
 };
 recovery.querySelector('[data-save96-retry]').onclick=run(async()=>{
  status.textContent='Retrying device save storage…';if(Save3.ready)await Save3.flush();else await Save3.start();
  if(!Save3.ready)throw Save3.error||Error('Device storage is still unavailable.');render();changeTab('settings');renderSettings();saveFeedback('Device save storage is ready.');
 });
 recovery.querySelector('[data-save96-delete-current]').textContent=Save3.blockedSaveId?'Delete unreadable active save':'Delete this local save';
 recovery.querySelector('[data-save96-delete-current]').onclick=run(()=>remove(Save3.blockedSaveId||Save3.identity().id,Save3.blockedSaveId?'unreadable active save':Save3.identity().name));
 const list=async()=>{
  const rows=await Save3.summaries();found.replaceChildren();
  for(const r of rows){const line=document.createElement('div'),text=document.createElement('p');text.textContent=(r.name||'Unnamed save')+' · '+r.id+' · '+(r.updatedAt||'No recorded save time');line.appendChild(text);
   const load=document.createElement('button');load.type='button';load.textContent='Load this save';load.dataset.save96Load=r.id;load.onclick=run(async()=>{if(Save3.ready&&!confirm('Save the open stable and load '+r.name+'?'))return;await Save3.load(r.id,{preserve:Save3.ready});changeTab('settings');renderSettings();});line.appendChild(load);
   const del=document.createElement('button');del.type='button';del.textContent='Delete this save';del.dataset.save96Delete=r.id;del.onclick=run(async()=>{if(await remove(r.id,r.name))if(document.contains(found))await list();});line.appendChild(del);found.appendChild(line);
  }
  if(!rows.length)found.textContent='No saves are stored on this device.';
 };
 node.querySelector('[data-save3="list"]').onclick=run(list);
 return result;
};
