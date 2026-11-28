/* Championship discovery is independent of current filters, rider eligibility and edition year. */
function olympics117Event(event){return /^(world-games-|world-trials-|youth-games(?:-|$))/.test(event.classId||String(event.id||'').replace(/^career:\d+:/,''));}
function olympics117Edition(kind,now=pastureCalendarHour()){
 const definitions=CAREER_SERIES.filter(e=>kind==='senior'?e.id.startsWith('world-games-'):e.id==='youth-games'),current=pastureDate(now).year;
 for(let year=current;year<=current+4;year++){
 const events=definitions.filter(e=>!e.cycle||year%e.cycle===e.edition).map(e=>careerEvent(e,year));
 if(events.some(e=>careerEventEnd(e)>=now))return {year,events};
 }return null;
}
function olympics117Open(kind){
 const edition=olympics117Edition(kind);if(!edition)return;
 const filters=careerSelection().show82||={};Object.assign(filters,{view:'list',year:edition.year,month:edition.events[0].date.month,kind:'olympics',discipline:'',division:'',tier:'',status:'',min:0,max:100,sort:'date',page:0});show82RenderCalendar();
 document.querySelector('.career-calendar-wrap')?.scrollIntoView?.({block:'start'});
}
function olympics117Panel(){
 const panel=document.getElementById('calendar');if(!panel?.appendChild)return;panel.querySelector('[data-olympics117-panel]')?.remove();
 const section=document.createElement('section');section.className='box';section.dataset.olympics117Panel='true';const enabled=careerState().settings.games!==false;
 section.innerHTML='<h3>Olympics &amp; Youth Olympics</h3><p>Held every four game years. Senior Olympics: Years 4, 8, 12… Youth Olympics: Years 1, 5, 9…</p>'+['senior','youth'].map(kind=>{const edition=olympics117Edition(kind),label=kind==='senior'?'Olympics':'Youth Olympics';if(!edition)return '';return '<div><strong>'+label+' · Year '+edition.year+'</strong><p>'+edition.events.map(e=>csEscape(CAREER_DISCIPLINE_LABELS[e.discipline])+' · '+csEscape(pastureDateLabel(e.at))).join('<br>')+'</p><button type="button" data-olympics117-view="'+kind+'">View '+label+' and qualifiers</button></div>';}).join('')+(enabled?'<p>View the edition calendar to see its qualifiers and entry requirements. Entries open within the normal booking window; qualification is required.</p>':'<p>Championship events are switched off in Career settings.</p><button type="button" data-olympics117-enable>Enable championship events</button>');
 for(const button of section.querySelectorAll('[data-olympics117-view]'))button.onclick=()=>olympics117Open(button.dataset.olympics117View);
 const enable=section.querySelector('[data-olympics117-enable]');if(enable)enable.onclick=()=>{careerState().settings.games=true;saveGame(false);show82RenderCalendar();};panel.prepend(section);
}
const OLYMPICS117_CALENDAR=show82RenderCalendar;
show82RenderCalendar=function(...args){const out=OLYMPICS117_CALENDAR(...args);olympics117Panel();return out;};
const OLYMPICS117_LOAD=hydrateFromSave;
hydrateFromSave=function(data,...args){const enabled=data?.career?.settings?.games!==false,out=OLYMPICS117_LOAD(data,...args);if(app.career){app.career.settings||={};app.career.settings.games=enabled;}return out;};
