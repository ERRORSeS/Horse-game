const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const baseline=require('./fixtures/training-buttons-before5.json'),source=fs.readFileSync(__dirname+'/../training2.js','utf8');
assert.deepEqual([...source.matchAll(/t2button\('([^']+)','([^']+)'\)/g)].map(m=>[m[1],m[2]]),baseline.buttons,'existing button IDs labels and order');
assert.equal(crypto.createHash('sha256').update(source.match(/function t2extraActions\(.*?(?=\nfunction )/s)[0]).digest('hex'),baseline.extraActionsSHA256,'contextual action catalogs');
console.log('PASS every existing static button ID/label/order and contextual action catalog is preserved');
const {check}=require('./behavior5-harness.cjs');
check('normal show choices display the exact per-jump risk and saved concerns cannot block advancement',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=buildCompetitionRpgSession(h,'jumping','0.70');s.stepIndex=s.steps.findIndex(row=>row.stage==='main_round');const expected=fenceAvoidanceProfile(h,s).chance,rows=competitionOptionFinalChances(s,h,s.steps[s.stepIndex],competitionPromptForStep(s).options);
 for(const row of rows)if(row.computed.failChance!==expected||Math.abs(row.successChance+row.computed.neutralChance+row.computed.failChance-100)>1e-8)throw Error('show chance mismatch');
 s.rrConcern={kind:'refusal'};const before=s.outcomes?.length||0;resolveCompetitionRpgChoice(s,h,0);if((s.outcomes?.length||0)!==before+1||s.rrConcern)throw Error('show concern interrupted outcome');
 if(s.awaitingAdvance&&!s.eliminated){const index=s.stepIndex;showAdvanceRpg(s);if(s.stepIndex!==index+1)throw Error('show not advanced');}
}`);
check('actual jump attempts roll one avoidance branch and choose refusal runout or abandoned approach from it',`{
 for(const [subtype,index,event]of [[.1,5,'refusal'],[.8,5,'runout'],[.95,6,'abandoned-approach']]){
  resetGame();rrSettings().enabled=true;app.settings.tackOwnership=false;const h=app.horses[0];h.age=10;h.behavior=800;h.requiresBreakingIn=false;h.medicalConditions=[];h.illnesses=[];h.tack={bridle:'Snaffle Bridle',bit:'Loose Ring Snaffle',saddle:'Jumping Saddle',pad:'Basic Cotton Pad'};const s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail',setup:{height:.5},length:60});s.phase='main';s.warmup=15;s.weather={type:'Clear',temperature:20,wind:0};rrHorse(h).learned['Learned Fence Avoidance']=100;
  const random=t2random;let count=0;try{t2random=()=>{count++;return count<=2?.99:count===3?.01:count===4?subtype:.99;};const r=t2attempt(h,s);if(r.blocked||r.resultIndex!==index||r.event!==event)throw Error('categorical outcome '+JSON.stringify(r));if(s.behavior5.events.filter(row=>row.type==='attempt').length!==1||s.attempts!==1)throw Error('duplicate jump resolution');}finally{t2random=random;}
 }
}`);
check('session state is one live horse state and summaries preserve exact decimal deltas after save/load',`{
 resetGame();rrSettings().enabled=true;rrSettings().level='Professional';const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.elapsed=4;s.attempts=1;s.lastResult=0;s.log.push({exerciseId:'crossrail',resultIndex:0});rrHorse(h).learned['Learned Fence Avoidance']=60;tbRecord(h,s,'exercise','jumping',true);t2finish(h,s);const current=rrHorse(h).learned['Learned Fence Avoidance'];if(current<58.5||current>59||s.report.behavior.final['Learned Fence Avoidance']!==current)throw Error('decimal summary');
 if(!t2reportMarkup(s.report).includes('Behavior during this session'))throw Error('no summary');
 const saved=JSON.parse(serializeAppState());hydrateFromSave(saved);if(rrHorse(app.horses[0]).learned['Learned Fence Avoidance']!==current)throw Error('saved current state');
}`);
check('selected adjustments at a difficulty boundary do not invent a change or recovery',`{
 resetGame();rrSettings().enabled=true;const h=app.horses[0],s=t2newSession(h,{discipline:'jumping',exerciseId:'crossrail'});s.phase='main';s.attempts=1;s.lastResult=5;s.log.push({exerciseId:'crossrail',resultIndex:5});tbRecord(h,s,'refusal','jumping',false);s.difficulty=-2;s.tension=50;
 const before=JSON.stringify(rrHorse(h).learned);tbStartAction(h,s,'simplify');s.difficulty=Math.max(-2,s.difficulty-1);tbCompleteAction(h,s,'simplify');if(JSON.stringify(rrHorse(h).learned)!==before)throw Error('unchanged action rewarded');const event=s.behavior5.events.at(-1);if(event.flags.simplify||event.flags.configure)throw Error('invented adjustment');
}`);
check('NPC rounds never borrow the selected player rider profile',`{
 resetGame();const npc={id:'independent-npc',personality:'Easy-Going',mood:'Neutral',training2:{attributes:{Confidence:5,Willingness:5,Balance:5}}};rrSettings().enabled=false;const baseline=JSON.stringify(ShowjumpingRound.plan(npc,'0.70','npc-identity',12));rrSettings().enabled=true;rrSettings().level='Professional';if(JSON.stringify(ShowjumpingRound.plan(npc,'0.70','npc-identity',12))!==baseline)throw Error('NPC used player profile');
}`);
