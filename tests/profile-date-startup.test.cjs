const fs=require('node:fs'),vm=require('node:vm');
// Profiles must render even if the optional town-shop script is unavailable.
const source=fs.readFileSync(__dirname+'/competition-completion.test.cjs','utf8')
 .split("check('trait fixture'")[0]
 .replace("for(const match of html.matchAll(/<script src=\"([^?]+)\\?/g))vm.runInContext", "for(const match of html.matchAll(/<script src=\"([^?]+)\\?/g))if(match[1]!=='care-shops.js')vm.runInContext");
const {check}=vm.runInNewContext('(function(require,__dirname){'+source+'return {check};})(require,__dirname)',{require,__dirname,console});
check('horse health profiles format care dates without the town-shop script',`{
 if(typeof csShopHeading!=='undefined')throw Error('shop script unexpectedly loaded');
 resetGame();const h=app.horses[0];csEnsure(h);h.hoofHealth.nextDue=402;
 const markup=csHealthMarkup(h);if(!markup.includes('Hoof review: 13/02/0001'))throw Error('missing care date');
 h.deceased=true;h.deathDay=720;if(!csHealthMarkup(h).includes('01/01/0002'))throw Error('missing historical date');
}`);
check('shared care dates retain the game calendar and handle missing old-save dates',`{
 for(const [day,date]of [[0,'01/01/0000'],[360,'01/01/0001'],[402,'13/02/0001'],[720,'01/01/0002'],[undefined,'Unknown date'],[null,'Unknown date'],[NaN,'Unknown date']])if(csDate(day)!==date)throw Error('wrong date for '+day);
}`);
