const fs=require('node:fs'),vm=require('node:vm'),{context,check}=require('./behavior5-harness.cjs');
const source=fs.readFileSync(__dirname+'/federation-progression90.test.cjs','utf8');vm.runInContext(source.slice(source.indexOf(' globalThis.fed90Fixture='),source.indexOf('\n const f=fed90Fixture(6);')),context);
check('international national-team programme scores full foreign squads after actual scheduled trials',`{
 const f=globalThis.team99Fixture=fed90Fixture(8);fed90Trial(f,0);fed90Trial(f,1);federationReview(f.plan,f.plan.selection);const event=globalThis.team99Event=federation90ProgramEvents(f.plan).find(e=>e.date.month===8),country=event.programCountries[1],peer=federationPlan(app.year,country,'jumping','junior');
 for(let i=0;i<8;i++){const original=f.w.npcs[i],r=HorseHealth.copy(original);r.id=country+':99:'+i;r.country=country;r.recentStarts=[];r.lastStart=null;r.horses=r.horses.map((h,j)=>({...h,id:r.id+':horse:'+j,assignedRiderId:r.id,ownerId:r.id,recentStarts85:[],competitionHistory85:[]}));f.w.npcs.push(r);for(let n=0;n<5;n++)f.w.meets[r.id+':qual:'+n]={id:r.id+':qual:'+n,hour:peer.opens-24-n*24,official:true,discipline:'jumping',tier:3,ranking:'division',division:'junior',results:[{riderId:r.id,riderName:r.name,horseId:r.horses[0].id,horseName:r.horses[0].name,country,placing:1,score:0,started:true,points:20}],teams:[]};}
 npc85Registry(true);Object.assign(app,pastureDate(event.at-72));f.w.cursor=event.at-72;
 const schedule=careerSchedule(peer.trials[0].at-1,peer.trials[1].at+1);for(const t of peer.trials)if(!schedule.some(e=>e.id===t.id))throw Error('foreign selection trial missing from real calendar');
 const field=careerNpcField(event,event.npcCount,f.rider),foreign=field.filter(p=>p.rider.country===country);if(foreign.length!==event.team)throw Error('missing full opposing squad '+foreign.length);
 for(const t of peer.trials)if(!f.w.meets[t.id]?.results.length)throw Error('selection not based on completed actual trial');
 const home=field.filter(p=>p.rider.country===f.rider.country);if(home.length!==event.team-1)throw Error('no reserved player place');
 if(new Set(field.map(p=>p.rider.id)).size!==field.length)throw Error('duplicate rider in team field');
 const before=JSON.stringify(peer.trials.map(t=>f.w.meets[t.id]));careerNpcField(event,event.npcCount,f.rider);if(JSON.stringify(peer.trials.map(t=>f.w.meets[t.id]))!==before)throw Error('trial results rerolled');
 const meet=careerResolveNpcMeet(event);if(meet.teams.length<2||new Set(meet.teams.map(t=>t.country)).size<2)throw Error('no opposing national team result');globalThis.team99Meet=meet;
}`);
check('division national team standings show clear identities and exactly the completed team points',`{
 const meet=team99Meet;Object.assign(app,pastureDate(meet.hour));const rows=national99Board('jumping','junior',meet.hour),r=rows.find(r=>r.country===meet.teams[0].country);if(!r||!r.name.includes('National')||r.points!==meet.teams[0].points)throw Error('team points/name mismatch');
 for(const row of rows){const history=ranking93History(row,'team','jumping','national-teams|junior',meet.hour);if(history.reduce((n,h)=>n+h.rankingPoints,0)!==row.points)throw Error('breakdown mismatch');}
 const before=JSON.stringify(rows);hydrateFromSave(JSON.parse(serializeAppState()));if(JSON.stringify(national99Board('jumping','junior',meet.hour))!==before)throw Error('team results changed on load');
 if(national99Board('dressage','junior',meet.hour).some(r=>r.points)||national99Board('jumping','senior',meet.hour).some(r=>r.points))throw Error('points leaked to another category');
}`);
check('single-country programme results cannot create team points or inflate aggregate and series boards',`{
 const meet=team99Meet,event=team99Event,oneCountry=meet.results.filter(r=>r.country===meet.teams[0].country);if(careerTeamScores(event,oneCountry).length)throw Error('solo squad awarded team placing');
 const before=JSON.stringify(national99Board('jumping','junior',meet.hour)),series=JSON.stringify(careerRankingRows('team','jumping',event.series,meet.hour));careerState().meets['old-solo99']={...meet,id:'old-solo99',teams:[{...meet.teams[0],points:999}]};
 if(JSON.stringify(national99Board('jumping','junior',meet.hour))!==before||JSON.stringify(careerRankingRows('team','jumping',event.series,meet.hour))!==series)throw Error('legacy solo-team points counted');
 const row=national99Board('jumping','junior',meet.hour)[0];if(ranking93History(row,'team','jumping','national-teams|junior',meet.hour).some(r=>r.eventId==='old-solo99'))throw Error('solo-team result in breakdown');delete careerState().meets['old-solo99'];
}`);
check('viewing future programme fields never fabricates future selection-trial results',`{
 const next=federationPlan(app.year+1,'JPN','jumping','junior'),event=federation90ProgramEvents(next).find(e=>e.date.month===8),before=Object.keys(careerState().meets).length;federation90EnsureSeason(event,'JPN');if(Object.keys(careerState().meets).length!==before||next.trials.some(t=>careerState().meets[t.id]))throw Error('future trial simulated while browsing');
}`);

check('active squads remain visible at zero points when a new ranking year begins',`{
 const hour=pastureCalendarHour(team99Meet.date?.year||app.year+1,1,1,0),rows=national99Board('jumping','junior',hour);if(!rows.length||rows.some(r=>r.points!==0))throw Error('active carryover squads missing or old points retained');
}`);
check('every supported country has a team standings entry and enters the rotating programme',`{
 const countries=Object.keys(CAREER_COUNTRIES),rows=national99Board('jumping','junior',team99Meet.hour);if(rows.length!==countries.length||countries.some(c=>!rows.some(r=>r.country===c)))throw Error('country missing from national-team rankings');
 const invited=new Set();for(const year of [1,2])for(const e of federation90ProgramEvents(federationPlan(year,'GBR','jumping','junior')).filter(e=>e.team)){if(e.programCountries.length!==6||new Set(e.programCountries).size!==6)throw Error('invalid international invitation field');for(const c of e.programCountries)invited.add(c);}if(countries.some(c=>!invited.has(c)))throw Error('country excluded from rotation');
}`);
