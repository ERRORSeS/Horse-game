// Remember player-controlled disclosure state independently of redraws and counts.
function uiDisclosureBaseKey(el){
 const panel=el.closest('.panel')?.id||'page',owner=el.closest('[data-ui-owner]')?.dataset?.uiOwner||'';
 if(el.dataset.uiKey)return `${panel}|${owner}|${el.dataset.uiKey}`;
 if(el.dataset.pastureToggle)return `${panel}|${el.dataset.pastureToggle}|${el.dataset.pastureField}`;
 const labels=[];for(let node=el;node&&node!==el.closest('.panel');node=node.parentElement){if(node.tagName==='DETAILS'){const text=node.querySelector(':scope > summary')?.textContent||'';labels.unshift(text.replace(/\s*\(\d+[^)]*\)/g,'').replace(/\s+/g,' ').trim());}}
 return `${panel}|${owner}|${labels.join('/')}`;
}
function uiDisclosureEntries(scope=document){const seen=new Map();return [...scope.querySelectorAll('details')].map(el=>{const base=uiDisclosureBaseKey(el),index=seen.get(base)||0;seen.set(base,index+1);return {el,key:`${base}|${index}`};});}
function uiSelectionEntries(scope=document){const seen=new Map();return [...scope.querySelectorAll('select, textarea')].filter(el=>el.dataset?.authoritativeSelection!=='true'&&!el.id?.startsWith('shop-')&&!el.closest('.training2')?.classList?.contains('training2')).map(el=>{const panel=el.closest('.panel')?.id||'page',owner=el.closest('[data-ui-owner]')?.dataset?.uiOwner||'',attribute=[...(el.attributes||[])].filter(a=>a.name.startsWith('data-')).map(a=>`${a.name}:${a.value}`).join('|'),label=el.closest('label')?.textContent?.replace(/\s+/g,' ').trim()||'',base=`${panel}|${owner}|${el.id||attribute||el.className||label}`,n=seen.get(base)||0;seen.set(base,n+1);return {el,key:`${base}|${n}`};});}
function uiCapturePanels(scope=document){app.uiDisclosures=app.uiDisclosures||{};app.uiSelections=app.uiSelections||{};for(const {el,key}of uiDisclosureEntries(scope))app.uiDisclosures[key]=el.open;for(const {el,key}of uiSelectionEntries(scope))app.uiSelections[key]=el.value;}
function uiRestorePanels(){for(const {el,key}of uiDisclosureEntries())if(Object.hasOwn(app.uiDisclosures||{},key))el.open=app.uiDisclosures[key];for(const {el,key}of uiSelectionEntries()){const value=app.uiSelections?.[key];if(value!=null&&(el.tagName==='TEXTAREA'||[...el.options].some(o=>o.value===value)))el.value=value;}}
let uiRenderDepth=0;
function uiPreservingRender(renderFn){return function(...args){const outer=uiRenderDepth===0,scroll=outer?{x:window.scrollX||0,y:window.scrollY||0,focusId:document.activeElement?.id}:null;if(outer)uiCapturePanels();uiRenderDepth++;try{return renderFn.apply(this,args);}finally{uiRenderDepth--;if(outer){uiRestorePanels();if(typeof window.scrollTo==='function')window.scrollTo({left:scroll.x,top:scroll.y,behavior:'instant'});if(scroll.focusId)document.getElementById(scroll.focusId)?.focus?.({preventScroll:true});if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>window.scrollTo?.({left:scroll.x,top:scroll.y,behavior:'instant'}));}}};}
for(const name of Object.keys(globalThis).filter(name=>/^render(?:[A-Z]|$)/.test(name)&&typeof globalThis[name]==='function'))globalThis[name]=uiPreservingRender(globalThis[name]);
let uiSaveTimer=null;
function uiFlushSave(){if(uiSaveTimer===null)return;clearTimeout(uiSaveTimer);uiSaveTimer=null;saveGame(false);}
function uiQueueSave(){if(uiSaveTimer!==null)clearTimeout(uiSaveTimer);uiSaveTimer=setTimeout(uiFlushSave,180);}
window.addEventListener('pagehide',uiFlushSave);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')uiFlushSave();});
document.addEventListener('toggle',event=>{const el=event.target;if(el.tagName!=='DETAILS'||!el.isConnected)return;const entry=uiDisclosureEntries(el.closest('.panel')||document).find(e=>e.el===el);if(!entry)return;app.uiDisclosures=app.uiDisclosures||{};if(app.uiDisclosures[entry.key]!==el.open){app.uiDisclosures[entry.key]=el.open;uiQueueSave();}},true);

// Selection changes survive direct panel redraws as well as the full render.
document.addEventListener('change',event=>uiCapturePanels(event.target?.closest?.('.panel')||document),true);
function uiUpdateHeaderOffsets(){const header=document.querySelector('.topbar'),nav=document.querySelector('.tabs');if(!header||!nav)return;const height=header.getBoundingClientRect().height;document.documentElement.style.setProperty('--topbar-height',height+'px');document.documentElement.style.setProperty('--ui-obstruction',(height+nav.getBoundingClientRect().height+16)+'px');}
document.addEventListener('DOMContentLoaded',()=>{uiUpdateHeaderOffsets();if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(uiUpdateHeaderOffsets);for(const node of document.querySelectorAll('.topbar, .tabs'))observer.observe(node);}window.addEventListener('resize',uiUpdateHeaderOffsets);});

// Keep navigation disclosure independent of gameplay renders and save data.
let uiTabsCollapsed=false;
function uiSetTabsCollapsed(collapsed){
 const nav=document.getElementById('tabs'),button=document.getElementById('toggleTabsBtn');
 if(!nav||!button)return;
 uiTabsCollapsed=Boolean(collapsed);
 nav.hidden=uiTabsCollapsed;
 button.setAttribute('aria-expanded',String(!uiTabsCollapsed));
 button.textContent=uiTabsCollapsed?'Show Tabs ▾':'Hide Tabs ▴';
 uiUpdateHeaderOffsets();
}
document.addEventListener('DOMContentLoaded',()=>{
 const button=document.getElementById('toggleTabsBtn');
 if(button)button.addEventListener('click',()=>uiSetTabsCollapsed(!uiTabsCollapsed));
 uiSetTabsCollapsed(uiTabsCollapsed);
});
