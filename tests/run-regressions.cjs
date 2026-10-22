const {spawnSync}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
let failed=0;
for(const file of fs.readdirSync(path.join(__dirname,'regression')).filter(f=>f.endsWith('.cjs')).sort()){
  const result=spawnSync(process.execPath,[path.join(__dirname,'regression',file)],{encoding:'utf8',timeout:180000});
  const output=(result.stdout||'').trim();
  console.log(`${result.status===0?'PASS':'FAIL'} ${file}: ${output.split('\n').at(-1)||result.error?.message||''}`);
  if(result.status!==0){failed++;console.error(result.stderr||result.error||output);}
}
process.exitCode=failed?1:0;
