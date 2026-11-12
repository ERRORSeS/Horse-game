const {check}=require('./behavior5-harness.cjs');
check('full skill, accurate execution and full preparation can reach ten with real movement marks',`{
 resetGame();rrSettings().enabled=true;rrSettings().level='Professional';for(const key of RR_ABILITIES)rrSettings().abilities[key]=100;rrSettings().experience.dressage='Grand Prix';
 const h=app.horses[0];h.age=10;h.behavior=900;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.fatigue=0;h.personality='Easy-Going';h.potential.dressage=100;for(const key of Object.keys(h.stats.dressage))h.stats.dressage[key]=100;t2horse(h).traits=[];
 const s=buildCompetitionRpgSession(h,'dressage','Grand Prix'),show=showCreate(h,s);app.activeShow=show;show.stage='ride';s.stepIndex=s.steps.findIndex(x=>x.stage==='main_round');s.warmupState={tension:0,focus:100,confidence:100,energy:100,timing:100};c7State(s).readiness=100;
 const roll=c7Roll;c7Roll=()=>.999;try{const record=c7Resolve(h,s,0);if(record.error||record.mark!==10)throw Error('perfect real movement still capped '+record.mark);const result=c7ScoreRecords(show,show.competitors.find(e=>e.player),'dressage',[record]);if(result.percentage!==100)throw Error('ten not reflected in official percentage');}finally{c7Roll=roll;}
}`);
check('identical automatic player and NPC performances use equal marks at every class difficulty',`{
 resetGame();const show=showCreate(app.horses[0],buildCompetitionRpgSession(app.horses[0],'dressage','Grand Prix'));
 const records=[{quality:1,title:'Entry'},{quality:1,title:'Halt'}];
 for(const skill of [30,60,80,100])for(const difficulty of [0,4,8]){
  const base={id:'same',horseId:'same',skills:{discipline:skill},difficulty,attributes:{Balance:10,Focus:10,Confidence:10}},npc={...base,player:false},player={...base,player:true};show.rpg.warmupState={timing:100,focus:100,confidence:100};
  const a=showScore(show,player,'dressage',records),b=showScore(show,npc,'dressage',records);if(a.percentage!==b.percentage||a.movements.some((m,i)=>m.mark!==b.movements[i].mark))throw Error('different player/NPC judge');if(skill===100&&a.percentage!==100)throw Error('automatic ceiling');
 }
 if(dressage95Mark({skill:100,quality:1,preparation:100,deduction:.75})>=10||dressage95Mark({skill:60,quality:1,preparation:100})>=10)throw Error('mistakes or insufficient training ignored');
}`);
check('equal dressage totals share placing regardless of player flag or start order; better tests can win',`{
 resetGame();const show=showCreate(app.horses[0],buildCompetitionRpgSession(app.horses[0],'dressage','Level One'));
 for(const [i,e]of show.competitors.entries())e.scores.dressage={phase:'dressage',percentage:i<2?85:80,penalties:i<2?15:20,movements:[],eliminated:false};
 let rows=showStandings(show);if(rows[0].rank!==1||rows[1].rank!==1||rows[2].rank!==3)throw Error('ties assigned different placings');
 const selected=show.competitors.at(-1);selected.player=true;selected.scores.dressage.percentage=86;selected.scores.dressage.penalties=14;rows=showStandings(show);if(rows[0].id!==selected.id||rows[0].rank!==1)throw Error('better player test cannot win');
 for(const e of show.competitors){e.player=!e.player;e.startOrder=100-e.startOrder;}
 if(showStandings(show).find(e=>e.id===selected.id).rank!==1)throw Error('flag/order biased placing');
}`);
