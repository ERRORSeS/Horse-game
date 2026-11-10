function customShowState() {
  return careerState().customShows ||= {sequence:0,shows:{},results:{}};
}
function customShowCreate(input) {
  const name = String(input.name || '').trim().slice(0,90), venue = String(input.venue || '').trim().slice(0,90);
  const {year,month,day,duration,prestige,tier,country} = input;
  const weather=input.weather || 'Seasonal';
  if (!['Seasonal','Clear','Light Rain','Heavy Rain','Windy'].includes(weather)) return {ok:false,message:'Choose a supported weather preset.'};
  const integer = (value,min,max)=>Number.isInteger(value) && value>=min && value<=max;
  if (!name || !venue || !Object.hasOwn(CAREER_COUNTRIES,country) || !integer(year,app.year,app.year+5) ||
    !integer(month,1,12) || !integer(day,1,30) || !integer(duration,1,7) || !integer(prestige,0,100) || !integer(tier,0,11)) {
    return {ok:false,message:'Enter a show title, venue, country, valid date, duration, tier, and prestige from 0–100.'};
  }
  const start = pastureCalendarHour(year,month,day,12);
  if (start <= pastureCalendarHour()) return {ok:false,message:'Choose a future date.'};
  if (!Array.isArray(input.classes) || !input.classes.length || input.classes.length>12) return {ok:false,message:'Add 1–12 classes.'};
  const classes = [];
  for (const raw of input.classes) {
    const {discipline,level,division,horseAge,offset,capacity,fee,prize,course} = raw;
    const format = raw.format || 'Standard';
    if (!SHOW_LEVELS[discipline]?.includes(level) || !Object.hasOwn(CAREER_AGE_DIVISIONS,division) ||
      !integer(offset,0,duration-1) || !integer(capacity,1,100) || !integer(fee,0,5000) || !integer(prize,0,25000) ||
      horseAge && !integer(horseAge,4,8) || !calendarSpecialCompatible(format,discipline,level) || format==='Puissance' ||
      raw.jumpOff && discipline!=='jumping' || course && !(discipline==='dressage' && ['Special','Freestyle'].includes(course) && level==='Grand Prix' ||
        discipline==='eventing' && ['Short','Long'].includes(course)) || course==='Long' && offset+2>=duration) {
      return {ok:false,message:'A class has incompatible rules, level, phase dates, capacity, or financial settings.'};
    }
    classes.push({...raw,name:String(raw.name || '').trim().slice(0,60),format});
  }
  const rider = careerRider(), sanctioned = input.mode==='sanctioned';
  if (sanctioned) {
    const known = [app.currentBarn,...(app.barnCatalog || [])].find(barn=>barn?.name===venue && careerCountry(barn.country)===country);
    const results = careerResults({riderId:rider.id,from:start-CAREER_HOURS_PER_YEAR,until:pastureCalendarHour()});
    if (!careerActive() || tier<1 || tier>3 || !known || results.filter(row=>row.tier>=2 && row.placing<=10 && row.placing).length<3 ||
      classes.some(row=>row.capacity<8 || !row.npcs || row.prize<100 || row.prize>2500 || row.format!=='Standard')) {
      return {ok:false,message:'Recognition requires three regional top-ten results, a known local-to-national venue, and fields of eight or more with standard rules and funded purses of 100–2,500.'};
    }
    if (input.annual) return {ok:false,message:'Apply each year to renew recognition and fund the new prizes.'};
    const funding = classes.reduce((total,row)=>total+row.prize,0);
    if (funding>app.money) return {ok:false,message:'The prize fund must be paid before the federation approves the show.'};
    app.money-=funding;
  }
  const state=customShowState(), id='custom-'+ ++state.sequence;
  const show={id,name,venue,country,year,month,day,duration,prestige,tier,sanctioned,weather,
    annual:input.annual===true,organizer:rider.id,classes,registrations:{},approved:sanctioned ? pastureCalendarHour() : null};
  state.shows[id]=show;
  return {ok:true,show};
}
function customShowEvents(from,to) {
  const shows=Object.values(app.career?.customShows?.shows || {}), events=[];
  for (const show of shows) for (let year=Math.max(show.year,pastureDate(from).year-1);year<=pastureDate(to).year;year++) {
    if (year!==show.year && !show.annual) continue;
    for (const [index,row] of show.classes.entries()) {
      const at=pastureCalendarHour(year,show.month,show.day+row.offset,12);
      if (at<from || at>to) continue;
      const date=pastureDate(at);
      const event=careerEvent({
        id:show.id+'-'+(index+1),name:show.name+' · '+ (row.name || 'Class '+(index+1)),
        month:date.month,day:date.day,discipline:row.discipline,level:row.level,division:row.division,
        tier:show.sanctioned ? show.tier : 0, prestige:show.prestige,country:show.country,
        course:row.course,horseAge:row.horseAge || null,ponyCm:row.pony || row.division==='pony' ? 148 : null,
        ranking:show.sanctioned ? (row.division==='senior' ? 'national' : 'division') : 'none',official:show.sanctioned,
        base:show.sanctioned ? CAREER_TIERS[show.tier].national : 0,minField:8,cutoff:10
      },date.year);
      event.id='career:'+year+':'+show.id+'-'+(index+1);
      event.customShowId=show.id;
      event.sandbox=!show.sanctioned;
      event.prizeMoney=show.sanctioned ? row.prize : 0;
      event.displayPrize=row.prize;
      event.customWeather=show.weather;
      event.entryFee=show.sanctioned ? row.fee : 0;
      event.npcCount=row.npcs ? row.capacity-1 : 0;
      event.maximumEntries=row.capacity;
      event.fieldTier=show.sanctioned ? show.tier : Math.min(9,Math.floor(show.prestige/11));
      event.barnName=show.venue;
      event.barnId='custom-venue:'+show.id;
      event.rules={...calendarRuleProfile(row.format,row.discipline,row.level),jumpOff:row.jumpOff===true};
      events.push(event);
    }
  }
  return events;
}
const CUSTOM_CALENDAR_FIND = calendarFindEvent;
calendarFindEvent = function(id) {
  const existing=CUSTOM_CALENDAR_FIND(id);
  if (existing || !/^career:\d+:custom-\d+-\d+$/.test(id || '')) return existing;
  const year=Number(id.split(':')[1]);
  return customShowEvents(pastureCalendarHour(year,1,1,0),pastureCalendarHour(year+1,1,7,23)).find(row=>row.id===id);
};
const CUSTOM_FIELD = careerNpcField;
careerNpcField = function(event,limit,...args) {
  return CUSTOM_FIELD(event.sandbox ? {...event,tier:event.fieldTier} : event,limit,...args);
};
const CUSTOM_SHOW_CREATE_LIVE = showCreate;
showCreate = function(horse,session,event,...args) {
  const show=CUSTOM_SHOW_CREATE_LIVE(horse,session,event,...args);
  if (event?.customShowId) {
    if (event.customWeather && event.customWeather!=='Seasonal') {
      const type=event.customWeather;
      session.weather={...t2weather(event.at),type,precipitation:type.includes('Rain'),wind:type==='Windy' ? 30 : 5};
    }
    if (event.sandbox) {
      show.home=true;
      show.stage='preparation';
    }
    customShowState().shows[event.customShowId].registrations[event.id] ||= {
      showId:show.id,riderId:show.careerRider.id,horseId:horse.id
    };
  }
  return show;
};
const CUSTOM_SHOW_AWARD = showAward;
showAward = function(show) {
  const event=show.eventSnapshot;
  if (!event?.customShowId) return CUSTOM_SHOW_AWARD(show);
  if (show.awarded) return;
  if (event.sandbox) {
    show.awarded=true;
    show.award={prize:0,rank:show.finalStandings.find(row=>row.player)?.rank};
    return;
  }
  CUSTOM_SHOW_AWARD(show);
};

const CUSTOM_SHOW_ENTER = careerEnter;
careerEnter = function(event,horse) {
  if (event?.customShowId && app.career?.customShows?.shows[event.customShowId]?.registrations[event.id]) {
    return {ok:false,message:'This class already has a saved entry.'};
  }
  return CUSTOM_SHOW_ENTER(event,horse);
};
