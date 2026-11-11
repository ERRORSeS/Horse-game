const {check}=require('./behavior5-harness.cjs');
check('indexed geography preserves every country, aliases and per-venue region overrides',`{
 for(const [code,data]of Object.entries(CAREER_COUNTRIES)){
 const byCode=showGeo86({country:code}),byName=showGeo86({country:' '+data[0].toLowerCase()+' '});
 if(byCode.code!==code||JSON.stringify(byCode)!==JSON.stringify(byName))throw Error('country lookup '+code);
 const override=showGeo86({country:code,travelRegion:'Custom region'});if(override.region!=='Custom region'||override.code!==code)throw Error('stale override');
 }
 if(showGeo86({country:'UK'}).code!=='GBR'||showGeo86({federation:'KAZ',country:'France'}).code!=='KAZ')throw Error('alias or federation precedence');
 if(showGeo86({country:'Unknown',continent:'Oceania'}).continent!=='Oceania')throw Error('unknown fallback');
 let scans=0;const data=CAREER_COUNTRIES.FRA,name=data[0];Object.defineProperty(data,'0',{configurable:true,get(){scans++;return name;}});
 try{for(let i=0;i<1000;i++)showGeo86({country:'France'});if(scans)throw Error('rescanned country names '+scans);}finally{Object.defineProperty(data,'0',{configurable:true,writable:true,value:name});}
}`);
check('distant historical bookings skip geography while continental conflict boundaries remain intact',`{
 resetGame();const event={at:2000,discipline:'jumping',country:'JPN'},old=showGeo86;let calls=0;showGeo86=function(...args){calls++;return old(...args);};
 try{if(careerBusy(Array.from({length:32},(_,i)=>({start:i*24,end:i*24+6,country:'FRA'})),event)||calls)throw Error('scanned distant bookings');
 if(!careerBusy([{start:1960,end:1980,country:'FRA'}],event))throw Error('continental transfer ignored');
 if(careerBusy([{start:1956,end:1976,country:'FRA'}],event))throw Error('exact travel boundary changed');
 }finally{showGeo86=old;}
}`);
check('bounded seed caching retains exact deterministic rolls and avoids repeated ID hashing',`{
 const original=HorseHealth.hash;let hashes=0;HorseHealth.hash=function(...args){hashes++;return original(...args);};
 try{for(let i=0;i<500;i++){const id='performance-seed-fixture',key='key-'+i,expected=HorseHealth.roll(original(id),key);if(careerRoll(id,key)!==expected)throw Error('changed roll');}if(hashes!==1)throw Error('repeated seed hashing '+hashes);
 for(let i=0;i<17000;i++)careerRoll('bounded-fixture-'+i,'key');if(CAREER_SEED_CACHE.size>16384)throw Error('unbounded cache');
 }finally{HorseHealth.hash=original;}
}`);

check('optimized hashing and show rolls preserve legacy seeds including Unicode and lone surrogates',`{
 const legacy=text=>{let n=2166136261;for(const c of String(text))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;};
 for(const value of ['',null,undefined,0,123,'Étoile 漢字 🐎','\\uD800x\\uDC00','\\uD800\\uDFFF\\uD800'])if(HorseHealth.hash(value)!==legacy(value))throw Error('Unicode hash changed');
 for(let i=0;i<1000;i++){const id='event:'+i+':rider:'+i,key='phase:'+i;if(showRoll({id},key)!==HorseHealth.roll(legacy(id),key))throw Error('show seed changed');}
}`);
