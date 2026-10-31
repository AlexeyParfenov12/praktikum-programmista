import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const src=fs.readFileSync('src/lecture-data.ts','utf8');
const js=ts.transpileModule(src,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
const context={exports:{}};vm.createContext(context);vm.runInContext(js,context);const {lectures}=context.exports;
assert.equal(Object.keys(lectures).length,16);
for(let id=1;id<=16;id++){
 const d=lectures[id];assert(d.meaning&&d.focus&&d.question);assert(d.correct>=0&&d.correct<d.answers.length);
 for(const type of ['designer','run-before','run-after']){const path=`public/vs-real/lesson-${id}-${type}.jpg`;assert(fs.statSync(path).size>4000);const data=fs.readFileSync(path);assert.equal(data.toString('hex',0,3),'ffd8ff');}
 if(id===8||id===16){assert.equal(d.scenarios.length,0);continue;}
 assert(d.scenarios.length>0);
 for(const s of d.scenarios){assert(s.frames.length>0);for(const f of s.frames){assert(f.line>=0&&f.line<s.code.split('\n').length,`Bad line in ${id}: ${f.line}`);assert(f.note&&Object.keys(f.values).length);}}
}
const sum=lectures[7].scenarios[0].frames.at(-1).values.total;assert.equal(sum,'31');
assert.equal(lectures[4].scenarios[0].frames.at(-1).values['lblTotal.Text'],'1 600,00 ₽');
assert.equal(lectures[11].scenarios[0].frames.at(-1).values.afterSuccess,'1');
assert.equal(lectures[15].scenarios[0].frames.at(-1).values['lblAddStatus.Text'],'Товар добавлен. Позиций: 6');
assert.equal(lectures[12].scenarios[0].frames.at(-1).values.inventoryValue,'44400');
const main=fs.readFileSync('src/main.tsx','utf8');assert(!main.includes("name:'Тренажёры'"));assert(!main.includes('<Trainer'));assert(fs.readFileSync('src/ReadingLecture.tsx','utf8').includes('plain-article'));
console.log('16 inline lectures, real designer and runtime screenshots, reference line indexes and scenario results verified. Optional task examples are available in the flowing lectures.');
