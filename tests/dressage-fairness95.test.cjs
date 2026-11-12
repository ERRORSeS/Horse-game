const {check}=require('./behavior5-harness.cjs');
check('full skill, accurate execution and full preparation produce realistic strong movement marks',`{
 resetGame();rrSettings().enabled=true;rrSettings().level='Professional';for(const key of RR_ABILITIES)rrSettings().abilities[key]=100;rrSettings().experience.dressage='Grand Prix';
 const h=app.horses[0];h.age=10;h.behavior=900;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.fatigue=0;h.personality='Easy-Going';h.potential.dressage=100;for(const key of Object.keys(h.stats.dressage))h.stats.dressage[key]=100;t2horse(h).traits=[];
 const s=buildCompetitionRpgSession(h,'dressage','Grand Prix'),show=showCreate(h,s);app.activeShow=show;show.stage='ride';s.stepIndex=s.steps.findIndex(x=>x.stage==='main_round');s.warmupState={tension:0,focus:100,confidence:100,energy:100,timing:100};c7State(s).readiness=100;
 const roll=c7Roll;c7Roll=()=>.999;try{const record=c7Resolve(h,s,0);if(record.error||record.mark<8||record.mark>9.5)throw Error('unexpected real movement mark '+record.mark);const result=c7ScoreRecords(show,show.competitors.find(e=>e.player),'dressage',[record]);if(Math.abs(result.percentage-record.mark*10)>.001)throw Error('actual mark not reflected in official percentage');}finally{c7Roll=roll;}
}`);
check('identical automatic player and NPC performances use equal marks at every class difficulty',`{
 resetGame();const show=showCreate(app.horses[0],buildCompetitionRpgSession(app.horses[0],'dressage','Grand Prix'));
 const records=[{quality:1,title:'Entry'},{quality:1,title:'Halt'}];
 for(const skill of [30,60,80,100])for(const difficulty of [0,4,8]){
  const base={id:'same',horseId:'same',skills:{discipline:skill},difficulty,attributes:{Balance:10,Focus:10,Confidence:10}},npc={...base,player:false},player={...base,player:true};show.rpg.warmupState={timing:100,focus:100,confidence:100};
  const a=showScore(show,player,'dressage',records),b=showScore(show,npc,'dressage',records);if(a.percentage!==b.percentage||a.movements.some((m,i)=>m.mark!==b.movements[i].mark))throw Error('different player/NPC judge');if(skill===100&&(a.percentage<78||a.percentage>91))throw Error('unrealistic automatic percentage');
 }
 if(dressage95Mark({skill:100,quality:1,preparation:100,deduction:.75})>=dressage95Mark({skill:100,quality:1,preparation:100})||dressage95Mark({skill:60,quality:1,preparation:100})>=dressage95Mark({skill:100,quality:1,preparation:100}))throw Error('mistakes or insufficient training ignored');
}`);
check('equal dressage totals share placing regardless of player flag or start order; better tests can win',`{
 resetGame();const show=showCreate(app.horses[0],buildCompetitionRpgSession(app.horses[0],'dressage','Level One'));
 for(const [i,e]of show.competitors.entries())e.scores.dressage={phase:'dressage',percentage:i<2?85:80,penalties:i<2?15:20,movements:[],eliminated:false};
 let rows=showStandings(show);if(rows[0].rank!==1||rows[1].rank!==1||rows[2].rank!==3)throw Error('ties assigned different placings');
 const selected=show.competitors.at(-1);selected.player=true;selected.scores.dressage.percentage=86;selected.scores.dressage.penalties=14;rows=showStandings(show);if(rows[0].id!==selected.id||rows[0].rank!==1)throw Error('better player test cannot win');
 for(const e of show.competitors){e.player=!e.player;e.startOrder=100-e.startOrder;}
 if(showStandings(show).find(e=>e.id===selected.id).rank!==1)throw Error('flag/order biased placing');
}`);

check('large fields stay realistic, exceptional marks remain attainable and accuracy can win',`{
 resetGame();const scores=[];let nineties=0,tens=0;
 for(let test=0;test<2000;test++){const show={id:'dressage97:'+test},entry={id:'entry',horseId:'horse'};let total=0;for(let i=0;i<20;i++){const m=dressage95Mark({skill:100,quality:1,preparation:100,...dressage97Context(show,entry,i)});total+=m;if(m===10)tens++;}const score=total/2;scores.push(score);if(score>=90)nineties++;}
 const mean=scores.reduce((a,b)=>a+b,0)/scores.length;if(mean<80||mean>87||nineties>20||!tens)throw Error('unrealistic population '+JSON.stringify({mean,nineties,tens}));
 if(dressage95Mark({skill:100,quality:1,preparation:100,form:1,variation:1,brilliance:1})!==10)throw Error('ten impossible');
 const clean=dressage95Mark({skill:80,quality:1,preparation:90}),flawed=dressage95Mark({skill:80,quality:.3,preparation:90,deduction:.75});if(clean<7||clean>8.5||flawed>=clean)throw Error('unfair skill/accuracy balance');
 console.log('POPULATION97 '+JSON.stringify({tests:2000,mean,nineties,tens,movements:40000,minimum:Math.min(...scores),maximum:Math.max(...scores)}));
}`);
