const {check}=require('./behavior5-harness.cjs');
check('calendar opens legacy federation decisions and applications without optional history arrays',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');const rider=careerRider(),plan=federationPlan(app.year,'GBR','jumping','junior'),state=federationState(),horse=app.horses[0];
 state.seasons[plan.id]={id:plan.id,year:app.year,country:'GBR',discipline:'jumping',division:'junior',selectedAt:plan.selection,expires:plan.expires,members:[]};
 state.applications[plan.id+':'+rider.id]={id:plan.id+':'+rider.id,planId:plan.id,year:app.year,country:'GBR',discipline:'jumping',division:'junior',riderId:rider.id,horseId:horse.id,horseName:horse.name,status:'Selected — Reserve',selection:{score:65}};
 const before=JSON.stringify(state);const html=federationMarkup82(rider,[horse]);if(!html.includes('National team applications')||!html.includes('65.0'))throw Error('legacy decision not displayed');if(JSON.stringify(state)!==before)throw Error('render invented or changed history');
 hydrateFromSave(JSON.parse(serializeAppState()));renderCalendar();
}`);
check('programme template caching isolates mutable event state and preserves all dates and rules',`{
 resetGame();const plan=federationPlan(app.year,'GBR','eventing','junior'),first=federation90ProgramEvents(plan),expected=JSON.stringify(first);first[0].rules.jumpOff=true;first[0].date.month=12;first[0].squadRoles.push('invented');first[0].programCountries.length=0;first[0].entries.push({id:'registered'});if(first[0].phaseSchedule)first[0].phaseSchedule.dressage=0;const second=federation90ProgramEvents(plan);if(JSON.stringify(second)!==expected)throw Error('mutable calendar event leaked into template');if(PROGRAMME91_TEMPLATES.size>512)throw Error('cache unbounded');
}`);
check('repeated same-day clinical sync preserves a real recovery observation',`{
 resetGame();const h=app.horses[0],day=csDay();h.medicalConditions=[];h.medicalMood='Uncomfortable';h.medicalMoodDay=day-1;updateMedicalMood(h,day);const observation=h.medicalMoodObservation;if(!observation)throw Error('recovery transition missing');updateMedicalMood(h,day);if(h.medicalMoodObservation!==observation)throw Error('same-day sync erased observation');updateMedicalMood(h,day+1);if(h.medicalMoodObservation!=='')throw Error('observation did not expire next day');
}`);
