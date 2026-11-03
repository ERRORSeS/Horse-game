const fs=require('node:fs'),vm=require('node:vm');
const setup=fs.readFileSync(__dirname+'/competition-completion.test.cjs','utf8').split("check('trait fixture'")[0];
vm.runInNewContext('(function(require,__dirname){'+setup+`
vm.runInContext("resetGame();const benchHorse=app.horses[0];t2horse(benchHorse);const benchSession=t2newSession(benchHorse,{discipline:'jumping',exerciseId:'crossrail',facilityId:'outdoor'});",context);
const {performance}=require('node:perf_hooks'),results={};
for(const enabled of [false,true]){vm.runInContext('rrSettings().enabled='+enabled,context);const times=[];for(let run=0;run<3;run++){const before=performance.now();vm.runInContext("for(let n=0;n<1000;n++)t2probability(benchHorse,'technical',10,{ordinary:true},'Balance','Focus',benchSession)",context);times.push(performance.now()-before);}results[enabled?'enabled':'disabled']={medianMs:times.sort((a,b)=>a-b)[1],operations:1000};}
console.log(JSON.stringify(results,null,2));
`+'})(require,__dirname)',{require,__dirname,console},{filename:__filename});
