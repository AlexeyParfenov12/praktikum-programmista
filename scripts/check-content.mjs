import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
const originals=JSON.parse(fs.readFileSync('src/originals.json','utf8').replace(/^\uFEFF/,''));
const src=fs.readFileSync('src/data.ts','utf8').replace("import originals from './originals.json';",'').replace(/export /g,'');
const js=ts.transpileModule(src,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
const context={originals,console};vm.createContext(context);vm.runInContext(js+';globalThis.result={lessons,documents,stageContent};',context);
const {lessons,documents,stageContent}=context.result;
assert.equal(lessons.length,60);assert.equal(lessons.filter(l=>l.ready).length,16);
assert.equal(new Set(lessons.map(l=>l.id)).size,60);
for(const doc of documents){
 const stages=Array.from({length:6},(_,i)=>stageContent(doc.id,i));
 for(let i=0;i<6;i++)assert(stages[i].length>0,`Empty stage ${doc.id}/${i}`);
 const all=stages.flat();
 for(const p of doc.paragraphs)assert(all.includes(p),`Unreachable content in ${doc.id}: ${p.slice(0,90)}`);
 for(const p of originals.find(d=>d.id===doc.id).paragraphs.filter(p=>/^(?:Задание\s+[А-Г]|[А-Г])\s*\(обяз/.test(p)))assert(all.includes(p),`Mandatory task lost in ${doc.id}`);
 assert(!all.some(p=>/^(?:Задание\s+[А-Г]|[А-Г])\s*\(дополнител|^\d+\. Дополнительное задание/.test(p)),`Optional task remains ${doc.id}`);
 console.log(`Lesson ${doc.id}: six stages, mandatory tasks retained, optional tasks removed`);
}
assert(stageContent(16,5).some(p=>p.includes('Что оценивается')));
console.log('60 lessons; 16 published lessons; coverage and original mandatory tasks verified.');
