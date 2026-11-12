const {check}=require('./behavior5-harness.cjs');
check('NPC debut wins earn the same full points as a player in every discipline',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const now=pastureCalendarHour(),player=careerRider();
 for(const d of DISCIPLINES){
  const pool=rank91Pool('world',d,'',now),r=careerRosterIndex().byId.get(pool.members[0].id);
  r.rankingDebutHour86=now;r.rankingScoringStarts86=0;
  const e=careerSchedule(now,now+CAREER_HOURS_PER_YEAR).find(e=>e.discipline===d&&e.ranking==='world'&&e.base>0);
  const winner={riderId:r.id,placing:1,score:d==='dressage'||d==='hunter'?80:d==='eventing'?30:0};
  const expected=careerPoints(e,{...winner,riderId:player.id},16);
  if(expected<=0||careerPoints(e,winner,16)!==expected)throw Error('NPC win discounted '+d);
  r.rankingScoringStarts86=1;if(careerPoints(e,winner,16)!==expected)throw Error('second start discounted '+d);
  if(careerPoints({...e,at:now-1},winner,16)!==0)throw Error('pre-debut points');
 }
}`);
check('best ranks survive recomputation, falling standings and reload while zero entrants have no invented best',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const w=careerState(),now=pastureCalendarHour(),pool=rank91Pool('world','jumping','',now),r=careerRosterIndex().byId.get(pool.members[0].id),h=r.horses[0],key='world|jumping|';
 let rows=careerRankingRows('world','jumping','',now);if(rows.some(r=>r.best!==null))throw Error('zero entrant invented career high');
 w.meets.scored93={id:'scored93',hour:now,at:now-2,official:true,ranking:'world',discipline:'jumping',division:'senior',tier:5,results:[{riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:r.country,score:0,placing:1,started:true,points:31}]};
 careerPublish(now);rows=careerRankingRows('world','jumping','',now);if(rows.find(x=>x.id===r.id)?.best!==1)throw Error('best dropped rebuilding');
 const opponent=careerRosterIndex().byId.get(pool.members[1].id);w.meets.opponent93={...w.meets.scored93,id:'opponent93',hour:now+1,results:[{...w.meets.scored93.results[0],riderId:opponent.id,horseId:opponent.horses[0].id,points:50}]};
 careerPublish(now+1);rows=careerRankingRows('world','jumping','',now+1);const row=rows.find(x=>x.id===r.id);if(row.rank!==2||row.best!==1)throw Error('career high fell with rank');
 hydrateFromSave(JSON.parse(serializeAppState()));rows=careerRankingRows('world','jumping','',now+1);if(rows.find(x=>x.id===r.id)?.best!==1)throw Error('best lost reloading');
}`);
check('saved discounted NPC results repair once without changing player, private, local or pre-debut results',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const now=pastureCalendarHour(),w=careerState(),pool=rank91Pool('world','jumping','',now),r=careerRosterIndex().byId.get(pool.members[0].id),h=r.horses[0];r.rankingDebutHour86=now;
 const e=careerSchedule(now,now+CAREER_HOURS_PER_YEAR).find(e=>e.discipline==='jumping'&&e.ranking==='world'&&e.base>0);
 const row={riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:r.country,score:0,placing:1,started:true,points:8};
 const base={id:e.id,classId:e.classId,at:e.at,hour:careerEventEnd(e),official:true,ranking:'world',discipline:'jumping',division:e.division,tier:e.tier,starters:16,fieldStrength:60,results:[row]};
 for(const [id,extra]of [['real93',{}],['private93',{auctionSellerMeet86:true}],['local93',{ranking:'none',tier:1}],['before93',{at:now-1}],['player93',{results:[{...row,player:true,points:23}]}]])w.meets[id]={...base,id,...extra};
 delete w.npcRankingPointsVersion93;const cash=app.money;hydrateFromSave(JSON.parse(serializeAppState()));
 const expected=RANK86_POINTS(e,row,16,1.03),state=careerState();if(state.meets.real93.results[0].points!==expected||expected<=8)throw Error('full points not restored');
 for(const id of ['private93','local93','before93'])if(state.meets[id].results[0].points!==8)throw Error('unrelated history changed '+id);
 if(state.meets.player93.results[0].points!==23||app.money!==cash)throw Error('changed player or replayed cash');
 hydrateFromSave(JSON.parse(serializeAppState()));if(careerState().meets.real93.results[0].points!==expected||app.money!==cash)throw Error('repair repeated');
}`);
check('board result breakdowns use published credited points rather than unrelated wins',`{
 resetGame();rrSettings().enabled=true;careerState().settings.progression=true;careerSetProfile(rrStoreCurrentProfile(),17,'GBR');
 const now=pastureCalendarHour(),w=careerState(),pool=rank91Pool('world','jumping','',now),r=careerRosterIndex().byId.get(pool.members[0].id),h=r.horses[0];
 const result={riderId:r.id,riderName:r.name,horseId:h.id,horseName:h.name,country:r.country,placing:1,score:0,started:true,points:40};
 for(const [id,extra]of [['earned93',{}],['future93',{hour:now+1}],['private93',{auctionSellerMeet86:true}],['other93',{ranking:'division',division:'junior'}],['expired93',{hour:now-CAREER_HOURS_PER_YEAR-1}]])w.meets[id]={id,name:id,hour:now,at:now-2,discipline:'jumping',ranking:'world',division:'senior',official:true,tier:5,results:[{...result}],...extra};
 careerPublish(now);const row=careerRankingRows('world','jumping','',now).find(x=>x.id===r.id),history=ranking93History(row,'world','jumping','',now);
 if(row.points!==40||history.length!==1||history[0].eventId!=='earned93'||history[0].rankingPoints!==40)throw Error('breakdown disagrees with board');
 const html=careerRiderDetails(row,'jumping',{type:'world',filter:''});if(!html.includes('+40 points')||html.includes('private93')||html.includes('future93')||html.includes('other93'))throw Error('unrelated wins shown as ranking results');
 const horseRow=careerRankingRows('horse','jumping','',now).find(x=>x.id===h.id);if(!horseRow||ranking93History(horseRow,'horse','jumping','',now).reduce((n,x)=>n+x.rankingPoints,0)!==horseRow.points)throw Error('horse credits mismatch');
 if(!careerLeaderboardDetails(horseRow,'horse','jumping','').includes('points'))throw Error('horse details failed');
}`);
