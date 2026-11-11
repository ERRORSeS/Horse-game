const {check}=require('./behavior5-harness.cjs');
check('ranking schooling limits use horse age at competition across all disciplines',`{
 resetGame();const at=pastureCalendarHour(),year=pastureDate(at).year;
 for(const d of DISCIPLINES)for(const age of [3,4,5,6,7,12])for(const band of ['low','medium','high']){
 const h={age,birthYear:year-age},level=AUCTION86_LEVELS[d][band].at(-1),expected=age<=5?band==='low':age<7?band!=='high':true;
 if(rankingSchoolingAge86(h,d,level,at)!==expected)throw Error(d+' '+age+' '+level);
 }
 const r=careerRoster().find(r=>r.specialty==='jumping'),h=r.horses[0],event=npc85CircuitEvent('world','jumping','',at,0);h.birthYear=year-4;h.skills.jumping=100;event.level='1.50';event.minimumSkill=0;
 if(npc85HorseEligible(r,h,event))throw Error('four year old jumping 1.50');
 event.level='1.10';h.birthYear=year-5;if(npc85HorseEligible(r,h,event))throw Error('five year old medium');
 event.level='1.30';h.birthYear=year-6;if(!npc85HorseEligible(r,h,event))throw Error('six year old medium rejected');
}`);
check('new open ranking riders have a range of ages and zero opening points',`{
 resetGame();careerRoster();const w=careerState();w.npcs=[];npc85Registry(true);const at=pastureCalendarHour(),event=npc85CircuitEvent('world','jumping','',at,0);
 npc85CircuitPool(event,'world','');const rows=rank86Pending('world','jumping','',at),ages=new Set(rows.map(r=>r.age));
 if(rows.length!==32||ages.size<8||rows.some(r=>r.age<16||r.age>60||r.points!==0))throw Error('uniform open ages '+[...ages]);
}`);
