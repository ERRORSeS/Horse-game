const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),baseline=require('../data/coat94-marking-baseline.json');
for(const r of baseline.protectedRegions){const text=fs.readFileSync(path.join(root,r.file),'utf8'),start=text.indexOf(r.start),end=text.indexOf(r.end,start+r.start.length);assert(start>=0&&end>start);assert.equal(crypto.createHash('sha256').update(text.slice(start,end)).digest('hex'),r.sha256,r.file+' '+r.start);}
console.log('PASS '+baseline.protectedRegions.length+' original face/leg/legacy inheritance source regions remain byte-identical; baseline image assets: '+baseline.assetFiles.length+' (text-only scope authorized)');
