import fs from 'node:fs';
import {createServer} from 'vite';
import React from 'react';
import {renderToString} from 'react-dom/server';
import assert from 'node:assert/strict';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{
 const {ReadingLecture}=await server.ssrLoadModule('/src/ReadingLecture.tsx');
 const {SiteNav}=await server.ssrLoadModule('/src/SiteNav.tsx');
 const {documents}=await server.ssrLoadModule('/src/data.ts');
 const {buildReading,isCode,isTask,isHeading}=await server.ssrLoadModule('/src/reading-content.ts');
 const {taskHelp}=await server.ssrLoadModule('/src/task-help.ts');
 const {copyCode}=await server.ssrLoadModule('/src/copy-code.ts');
 const sizes=JSON.parse(fs.readFileSync('src/screenshot-sizes.json','utf8'));
 let images=0,helpCount=0,codeCount=0;
 for(let id=1;id<=16;id++){
  const original=documents.find(d=>d.id===id).paragraphs;
  const blocks=buildReading(id),texts=blocks.filter(b=>b.kind==='text');
  assert.deepEqual(texts.map(b=>b.index),original.flatMap((t,i)=>i>0&&t!=='@@SKIP'?[i]:[]),`Order or coverage changed in ${id}`);
  const html=renderToString(React.createElement(ReadingLecture,{id}));
  const menuHtml=renderToString(React.createElement(SiteNav,{current:'/lesson/'+id}));
  assert(html.includes(menuHtml),`Shared SiteNav is missing or differs in ${id}`);
  assert.equal((html.match(/class="site-nav"/g)||[]).length,1,`Expected one shared menu in ${id}`);
  assert(menuHtml.includes('aria-label="Главное меню"'),`Menu landmark missing in ${id}`);
  for(const path of ['#/','#/catalog','#/glossary','#/help'])assert(menuHtml.includes(`href="${path}"`),`Menu link ${path} missing in ${id}`);
  assert(menuHtml.includes('aria-controls="site-menu"'),`Mobile menu control missing in ${id}`);
  assert(menuHtml.includes('href="#/catalog" aria-current="page"'),`Practical works menu item is not active in ${id}`);
  assert(!/class="[^"]*\bplain-(?:complete|storage-error)\b/.test(html),`Progress/completion block remains in ${id}`);
  assert(!html.includes('Мой прогресс')&&!html.includes('Браузер не разрешил сохранить прогресс')&&!html.includes('Отметка сохранена в этом браузере.'),`Progress UI remains in ${id}`);
  for(const button of html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g))assert(!/заверш|отмет|пройден|выполнен|прогресс/i.test(button[1].replace(/<[^>]*>/g,'')),`Completion/progress button remains in ${id}`);
  assert(html.includes('plain-article'));assert(!html.includes('worklayout'));assert(!html.includes('Карта работы'));assert(!html.includes('@@TABLE:'));assert(!html.includes('@@SKIP'));
  assert(html.includes('reading-code'),`No formatted code in ${id}`);assert(html.includes('Показать пример кода к заданию'),`No optional example in ${id}`);
  const help=blocks.filter(b=>b.kind==='task-help');helpCount+=help.length;
  const required=original.filter(isTask).length;
  assert.equal(help.length,required||(id===8||id===16?1:0),`Task example count in ${id}`);
  for(const b of help){const h=taskHelp(id,b.text,b.ordinal);assert(h.code.length>20);assert(h.hints.length>0);assert(/[;{}]/.test(h.code));}
  for(const b of blocks)if(b.kind==='image'){const bytes=fs.readFileSync('public/vs-real/'+b.shot.file);assert.equal(bytes.subarray(0,3).toString('hex'),'ffd8ff');assert(sizes[b.shot.file]?.width>0&&sizes[b.shot.file]?.height>0);assert(html.includes(`width="${sizes[b.shot.file].width}"`));images++;}
  const lastCheck=blocks.findIndex(b=>b.kind==='text'&&b.text.startsWith('Личный чек-лист'));
  const lastResult=blocks.findIndex(b=>b.kind==='image'&&b.shot.file===`lesson-${id}-run-after.jpg`);
  assert(lastCheck<0||lastResult<lastCheck,`Runtime screenshot is detached from the lesson in ${id}`);
  assert(blocks.some(b=>b.kind==='image'&&b.shot.file===`lesson-${id}-designer.jpg`));
  assert(blocks.some(b=>b.kind==='image'&&b.shot.file===`lesson-${id}-run-after.jpg`));
  if(id===1){const firstLaunch=blocks.findIndex(b=>b.kind==='text'&&b.text.startsWith('Запустите через Ctrl + F5.'));assert(firstLaunch<lastResult,'Runtime image appears before the first application launch');}
  if(id===10||id===11)assert(!blocks.some(b=>b.kind==='image'&&['button-name.jpg','add-class.jpg'].includes(b.shot.file)),'C# properties must not trigger unrelated designer screenshots');
  if(id===13)assert(!blocks.some(b=>b.kind==='image'&&b.shot.file==='toolbox-listbox.jpg'),'Removed ListBox should not be illustrated as a new component');
  for(const b of texts)if(isCode(b.text))codeCount++;
  console.log(`Lesson ${id}: original order, ${blocks.filter(b=>b.kind==='image').length} inline screenshots, ${help.length} optional task examples.`);
 }
 for(const sample of ['namespace Demo;\npublic class Product {}','int[] stocks = {2,8,0};','Product first = new Product();','lblOutput.Text = "Готово";'])assert(isCode(sample),sample);
 for(const instruction of ['1. На форме откройте Панель элементов и перетащите вторую Button.','2. Рядом разместите подпись производителя.','2. Вызовите TrySell(3), затем проверьте остаток.','6. Расчёт итоговой суммы выполняется только после проверки.'])assert(!isHeading(instruction),`Instruction treated as section: ${instruction}`);
 assert.equal(await copyCode('sample'),false);
 assert.equal(await copyCode('sample',{writeText:async()=>{throw Error('Clipboard denied')}}),false);
 let copied='';assert.equal(await copyCode('int stock = 2;',{writeText:async t=>{copied=t}}),true);assert.equal(copied,'int stock = 2;');
 const successfulAdd=taskHelp(15,'Задание А (обязательное).',0).code.replace(/\/\/[^\n]*/g,'');assert(!successfulAdd.includes('_products.Add('),'Add task example must not insert the same item twice');
 assert(!taskHelp(15,'Задание Б (обязательное).',1).code.includes('string name ='),'Do not redeclare existing name in the duplicate check');
 assert(!documents.some(d=>d.paragraphs.some(p=>p.includes('Знак = присваивает значение слева'))),'Incorrect assignment explanation remains');
 console.log(`16 flowing lectures verified: shared menu everywhere, no progress/completion UI, ${images} inline image placements, ${codeCount} original code blocks, ${helpCount} task examples.`);
}finally{await server.close();}
