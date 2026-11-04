const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/competition-completion.test.cjs','utf8').split("check('trait fixture'")[0];
module.exports=vm.runInNewContext('(function(require,__dirname){'+source+'return {check,context};})(require,__dirname)',{require,__dirname,console});
