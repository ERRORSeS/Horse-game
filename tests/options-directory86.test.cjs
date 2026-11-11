const {check}=require('./behavior5-harness.cjs');
check('all boarding countries have real stable listings that retain their identity',`{
 resetGame();const current=app.currentBarn.id,locations=barnLocationChoices();for(const country of Object.keys(locations)){const a=barnCountryListings86(country),b=barnCountryListings86(country);if(!a.length||a.some(x=>x.country!==country)||a.map(x=>x.id).join()!==b.map(x=>x.id).join())throw Error('missing stables '+country);}if(app.currentBarn.id!==current)throw Error('moved boarding');
}`);
check('skip travel preference survives saving and leaves normal travel available when off',`{
 resetGame();setSkipCompetitionTravel86(true);if(showTransportFee({country:'JPN'})!==0||showBookingLeadHours86({country:'JPN'})!==0)throw Error('travel not skipped');
 const data=JSON.parse(serializeAppState());hydrateFromSave(data);if(!skipCompetitionTravel86())throw Error('lost setting');setSkipCompetitionTravel86(false);if(skipCompetitionTravel86()||showBookingLeadHours86({country:'JPN'})===0)throw Error('cannot restore travel');
}`);
check('national selection profile recovers saved birth strings and country aliases',`{
 resetGame();const p=rrNormalizeProfile({id:'test',name:'Test',career:{country:'UK',birth:{year:String(app.year-24),month:'1',day:'1'}}});if(p.career.country!=='GBR'||typeof p.career.birth.year!=='number')throw Error('profile normalization');
}`);

check('representative ranking divisions and horse ages have real age-eligible fields',`{
 resetGame();const at=pastureCalendarHour();for(const [type,d,f]of [['world','jumping',''],['national','dressage','KAZ'],['division','hunter','kids'],['youth-national','eventing','junior|JPN'],['young-horse','jumping',4],['young-horse','dressage',5],['young-horse','hunter',6]]){const rows=careerCircuitField(type,d,f,at);if(rows.length<24)throw Error('thin '+type);const event=npc85CircuitEvent(type,d,f,at,0),registry=npc85Registry();for(const row of rows){const h=registry.horses.get(row.horseId);if(!h||!rankingSchoolingAge86(h,d,event.level,at))throw Error('ineligible ranking horse');}}
}`);
