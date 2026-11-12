const {check}=require('./behavior5-harness.cjs');
check('Year 1 opening tryouts appear in January alongside the unchanged annual trials',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const events=careerSchedule(pastureCalendarHour(1,1,1),pastureCalendarHour(1,6,30));
 for(const d of DISCIPLINES){const division=FEDERATION_DIVISIONS[d].includes('junior')?'junior':'senior',plan=federationPlan(1,'GBR',d,division);
  if(!plan.openingTrial93||plan.openingTrial93.date.month!==1||plan.trials.filter(t=>!t.openingTrial93).length!==2||plan.trial.date.month!==5)throw Error('opening or regular trial missing '+d);
  if(events.filter(e=>e.id===plan.openingTrial93.id).length!==1)throw Error('opening calendar entry absent or duplicated '+d);
  if(plan.trials.some(t=>t.openingTrial93&&t.base!==0))throw Error('tryout awarded ranking points');
 }
 if(federationPlan(2,'GBR','jumping','junior').trials.length!==2)throw Error('opening tryout repeated in year 2');
}`);
check('fresh eligible Year 1 combination applies and registers immediately without invented prior results',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerState().settings.background=false;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');app.money=1000000;
 const h=app.horses[0];h.breed='Dutch Warmblood';delete h.breedPotentialProfile;applyBreedPotential(h);h.age=9;h.birthYear=-8;h.behavior=900;h.requiresBreakingIn=false;h.manualRidabilityOverride=true;h.medicalConditions=[];h.illnesses=[];h.legacyMedicalRecords=[];h.owner='Your Stable';h.potential.jumping=100;for(const key of Object.keys(h.stats.jumping))h.stats.jumping[key]=100;rrSettings().experience.jumping='1.80';
 const rider=careerRider(),plan=federationPlan(1,'GBR','jumping','junior'),before=Object.keys(careerState().meets).length;
 const result=federationApply(plan,h,rider);if(!result.ok)throw Error(result.message);if(result.application.status!=='Trial Invited'||!result.application.openingEntry93)throw Error('early invitation missing');
 if(Object.keys(careerState().meets).length!==before)throw Error('application manufactured qualifying results');
 const booked=federationRegisterTrial(plan.id,rider);if(!booked.ok)throw Error(booked.message);if(booked.show.eventId!==plan.openingTrial93.id)throw Error('registered May trial instead of opening tryout');
 const show=booked.show;for(const entry of show.competitors)entry.scores.showjumping={faults:entry.player?0:4,penalties:entry.player?0:4,time:entry.player?40:70};showCompletePhase(show);showPersistResults(show);
 const hour=careerEventEnd(plan.openingTrial93),rows=federation90TrialRows(plan,rider.id,h.id,hour);if(!rows.some(r=>r.eventId===plan.openingTrial93.id&&r.valid))throw Error('real opening result not counted');
 if(federationState().seasons[plan.id])throw Error('tryout automatically selected national team');
 hydrateFromSave(JSON.parse(serializeAppState()));const saved=federationState().applications[plan.id+':'+rider.id];if(!saved?.openingEntry93||!federation90TrialRows(federationPlan(1,'GBR','jumping','junior'),rider.id,h.id,hour).some(r=>r.valid))throw Error('opening career lost reloading');
}`);
check('the opening route keeps age, medical and schooling restrictions and does not reopen closed seasons',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),10,'GBR');const h=app.horses[0],plan=federationPlan(1,'GBR','jumping','junior');
 if(federationApply(plan,h).ok)throw Error('wrong-age rider accepted');careerSetProfile(rrStoreCurrentProfile(),17,'GBR');h.age=2;if(federationApply(plan,h).ok)throw Error('underage horse accepted');
 federationState().seasons[plan.id]={version90:1,trialIds:plan.trials.filter(t=>!t.openingTrial93).map(t=>t.id),members:[]};if(federationPlan(1,'GBR','jumping','junior').openingTrial93)throw Error('retroactively added trial to old selection');
 federationState().seasons[plan.id].trialIds=plan.trials.map(t=>t.id);if(!federationPlan(1,'GBR','jumping','junior').openingTrial93)throw Error('new season lost recorded opening trial');
}`);
