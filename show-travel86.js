/* Competition journeys are based on the current barn and destination, not sporting nationality. */
const SHOW86_REGIONS={
 'Western Europe':'FRA GER NED BEL GBR IRL SUI AUT LUX', 'Northern Europe':'SWE DEN NOR FIN ISL', 'Southern Europe':'ITA ESP POR GRE CRO SLO CYP MLT', 'Eastern Europe':'POL CZE SVK HUN ROU BUL SRB UKR RUS EST LAT LTU BIH',
 'Northern America':'USA CAN', 'Central America':'MEX GUA CRC CRI PAN CUB DOM PUR JAM', 'South America':'BRA ARG CHI CHL COL URU ECU PER VEN BOL PAR',
 'Central Asia':'KAZ UZB KGZ TJK TKM', 'Eastern Asia':'JPN CHN KOR MGL MNG TPE TWN HKG', 'Western Asia':'UAE QAT SAU KSA TUR ISR JOR LBN BRN BAH KUW KWT OMA', 'Southern Asia':'IND PAK SRI BAN BGD NEP', 'Southeastern Asia':'THA MAS MYS SIN SGP IDN PHI PHL VIE VNM CAM KHM',
 'Northern Africa':'MAR ALG TUN EGY', 'Southern Africa':'RSA ZAF NAM BOT ZIM', 'Eastern Africa':'KEN ETH TAN UGA', 'Western Africa':'NGA GHA SEN', 'Australasia':'AUS NZL', 'Pacific Islands':'FIJ PNG SAM'
};
function showGeo86(location={}){const raw=String(location.federation||location.country||'').trim(),alias={UK:'GBR',GB:'GBR',US:'USA','U.S.':'USA','U.S.A.':'USA','UNITED STATES OF AMERICA':'USA',DE:'GER',DEU:'GER',FR:'FRA',NL:'NED',NLD:'NED',KZ:'KAZ'},code=alias[raw.toUpperCase()]||Object.keys(CAREER_COUNTRIES).find(c=>c.toLowerCase()===raw.toLowerCase()||CAREER_COUNTRIES[c][0].toLowerCase()===raw.toLowerCase()),base=code&&CAREER_COUNTRIES[code],region=location.travelRegion||location.geoRegion||Object.entries(SHOW86_REGIONS).find(([,codes])=>codes.split(' ').includes(code))?.[0]||base?.[1]||location.continent;
 let continent=base?.[1]||location.continent||'';if(continent==='Americas')continent=region==='South America'?'South America':'North America';return {code,region,continent};}
function showRoute86(show,requested){if(show.home)return {scope:'regional',hours:0,label:'Home arena'};const home=showGeo86(app.currentBarn||{}),away=showGeo86(show.eventSnapshot||{}),domestic=()=>({scope:'regional',hours:1+(showRoll(show,'domestic-hours86')<.5?0:1),label:'Same country'});
 if(home.code&&away.code){if(home.code===away.code)return domestic();if(home.continent&&away.continent&&home.continent!==away.continent)return {scope:'continent',hours:24,label:'Different continents'};if(home.region===away.region)return {scope:'country',hours:5,label:'Different countries, same region'};return {scope:'inter-region',hours:12,label:'Different regions, same continent'};}
 const scope=requested||show.travelScope||(show.distance==='long-distance'?'inter-region':'regional');return scope==='continent'?{scope,hours:24,label:'Different continents'}:scope==='country'?{scope,hours:5,label:'Different countries, same region'}:scope==='inter-region'?{scope,hours:12,label:'Different regions, same continent'}:domestic();
}
tripScope=function(show,requested){return showRoute86(show,requested).scope;};
tripDuration=function(show,scope){return showRoute86(show,scope).hours;};
const TRAVEL86_CREATE=showCreate;
showCreate=function(...args){const show=TRAVEL86_CREATE(...args),route=showRoute86(show);show.travelDurationHours=show.baseTravelDurationHours=route.hours;show.travelScope=route.scope;show.travelRegionLabel86=route.label;return show;};
const TRAVEL86_RENDER=renderShows;
renderShows=function(...args){const result=TRAVEL86_RENDER(...args),show=app.activeShow,panel=document.getElementById('shows');if(show?.stage==='planning'&&panel){const p=document.createElement('p'),route=showRoute86(show);p.setAttribute('data-travel86','');p.textContent=route.label+' · planned travel '+route.hours+' hours. Loading, delays and overnight rest are additional.';panel.prepend(p);}return result;};
const TRAVEL86_BUSY=careerBusy;
careerBusy=function(spans,event){if(TRAVEL86_BUSY(spans,event))return true;const destination=showGeo86({country:event.federation||event.country}),end=careerEventEnd(event);return spans.some(span=>{if(!span.country)return false;const source=showGeo86({country:span.country}),travel=source.continent&&destination.continent&&source.continent!==destination.continent?24:12;return span.start<end+travel&&event.at<span.end+travel;});};
