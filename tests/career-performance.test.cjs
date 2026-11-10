const {check}=require('./behavior5-harness.cjs');
check('rider result lookup skips unrelated fields after warming its index and handles repaired ledgers', `{
 resetGame();const w=careerState();let reads=0;
 for(let n=0;n<100;n++)w.meets[n]={id:String(n),hour:n,discipline:'jumping',results:[{get riderId(){reads++;return 'other-'+n;},horseId:'horse-'+n,placing:1}]};
 w.meets.mine={id:'mine',hour:101,discipline:'jumping',results:[{riderId:'me',horseId:'mine',placing:1}]};
 careerResults({riderId:'me'});reads=0;
 for(let n=0;n<20;n++)if(careerResults({riderId:'me'}).length!==1)throw Error('result lost');
 if(reads!==0)throw Error('unrelated competitors scanned '+reads+' times');
 w.meets.mine.results.push({riderId:'new-rider',horseId:'new',placing:2});if(careerResults({riderId:'new-rider'}).length!==1)throw Error('appended result missing');
 w.meets.mine={id:'mine',hour:102,discipline:'dressage',results:[{riderId:'replacement',horseId:'new',placing:1}]};
 if(careerResults({riderId:'me'}).length||careerResults({riderId:'replacement',discipline:'dressage'}).length!==1)throw Error('repair stale');
 delete w.meets.mine;if(careerResults({riderId:'replacement'}).length)throw Error('deleted result retained');
}`);
check('roster lookups are reused and refresh when new competitors arrive', `{
 const roster=[{id:'a',specialty:'jumping',country:'GBR'},{id:'b',specialty:'dressage',country:'KAZ'}];
 const first=careerRosterIndex(roster);if(first!==careerRosterIndex(roster)||first.byDiscipline.get('jumping').length!==1)throw Error('lookup rebuilt');
 roster.push({id:'c',specialty:'jumping',country:'GBR'});const next=careerRosterIndex(roster);
 if(next===first||next.byId.get('c')!==roster[2]||next.byCountry.get('GBR').length!==2)throw Error('roster index stale');
}`);
