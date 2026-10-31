import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createServer} from 'vite';
const server=await createServer({server:{middlewareMode:true,hmr:false},appType:'custom'});
try{
 const h=await server.ssrLoadModule('/src/handbook-index.ts');
 const {default:Handbook}=await server.ssrLoadModule('/src/Handbook.tsx');
 const {Portal}=await server.ssrLoadModule('/src/Portal.tsx');
 const {ReadingCode}=await server.ssrLoadModule('/src/ReadingCode.tsx');
 const entries=h.handbookEntries;assert(entries.length>=400,'Reference base unexpectedly reduced');
 assert.equal(new Set(entries.map(e=>e.id)).size,entries.length,'Duplicate article ids');
 for(const e of entries){
  for(const field of ['id','title','category','kind','description','syntax','example','notes','docsUrl'])assert.equal(typeof e[field],'string',`${e.id}.${field}`);
  assert(e.description.length>15&&e.example.trim()&&e.notes.length>15,`Incomplete article: ${e.id}`);
  assert(/https:\/\/(?:learn\.microsoft\.com|www\.postgresql\.org|git-scm\.com)\//.test(e.docsUrl),`Non-primary docs: ${e.id}`);
  assert(e.lectureIds.every(id=>Number.isInteger(id)&&id>=1&&id<=16));
  assert.equal(new Set(e.lectureIds).size,e.lectureIds.length);
 }
 assert(entries.some(e=>!e.lectureIds.length));assert(entries.filter(e=>e.lectureIds.length).length>150);
 for(let id=1;id<=16;id++)assert(h.filterHandbook({...h.emptyFilters,lesson:String(id)}).length>15,`Missing lesson ${id}`);
 assert(!h.containsLectureToken('ListBox SelectionChanged stock == 4 <= 7 != 2','List'));
 assert(!h.containsLectureToken('ListBox SelectionChanged stock == 4 <= 7 != 2','Select'));
 assert(!h.containsLectureToken('stock == 4 <= 7 != 2','='));assert(h.containsLectureToken('stock = 4','='));
 assert(!h.containsLectureToken('Ctrl + F5','F5'));
 assert(!h.containsLectureToken('stock = 4','Stock'));assert(h.containsLectureToken('Ctrl + F5','Ctrl+F5'));
 assert(h.containsLectureToken('i++;','++'));assert(!h.containsLectureToken('i += 1;','+'));
 const punctuationCorpus={id:1,text:'Спасибо! Скидка 20%. List<Product>',code:'List<Product> items = new List<Product>(); MessageBox.Show("Спасибо! Скидка 20%.");'};
 for(const token of ['!','%','<','>'])assert(!h.matchesEntry(punctuationCorpus,{title:token,lectureTokens:[token]}),'Operator matched prose/string/generic: '+token);
 assert(h.componentNames.every(n=>!n.includes('_')),'Event handler misidentified as control');
 for(const name of h.componentNames){const e=entries.find(e=>e.id==='project-'+name);assert(e&&e.lectureIds.length,`Missing component ${name}`);assert(e.notes.includes('не встроенная команда'));}
 const find=q=>h.filterHandbook({...h.emptyFilters,query:q});
 for(const q of ['TryParse','txtNewName','SELECT','git status','dotnet build','скидка','&&'])assert(find(q).length,`Search failure: ${q}`);
 const sql=entries.filter(e=>e.category==='SQL и PostgreSQL');assert(sql.length>=30);assert(sql.every(e=>!e.lectureIds.length),'SQL keyword accidentally matched C#');
 const extra=h.filterHandbook({...h.emptyFilters,coverage:'extra'});assert(extra.every(e=>!e.lectureIds.length));
 const inCourse=h.filterHandbook({...h.emptyFilters,coverage:'lecture'});assert(inCourse.every(e=>e.lectureIds.length));
 const filters={query:'decimal.TryParse',category:'',kind:'',coverage:'lecture',lesson:'6'};
 const href=h.handbookHref('cs-int',filters);assert.deepEqual(h.readFilters(href.slice(1)),filters);
 const list=renderToString(React.createElement(Handbook,{route:'/glossary?lesson=6'}));assert(list.includes('Найдено:'));assert(list.includes('Лекция 6'));assert(list.includes('handbook-row'));
 for(const e of [entries.find(e=>e.title==='txtNewName'),sql[0]]){
  const html=renderToString(React.createElement(Handbook,{route:'/glossary/'+e.id}));
  assert(html.includes(e.title));assert(html.includes('Что нужно учесть'));assert(html.includes(e.docsUrl));
  assert(html.includes(e.lectureIds.length?'#/lesson/':'Дополнительный материал'));
 }
 assert(renderToString(React.createElement(ReadingCode,{code:'SELECT 1;',language:'sql'})).includes('Код: SQL'));
 assert(!renderToString(React.createElement(ReadingCode,{code:'git status',language:'bash'})).includes('Код: C#'));
 for(const route of ['/','/catalog','/progress','/help','/lesson/1','/work/2/8']){
  const html=renderToString(React.createElement(Portal,{initialRoute:route}));
  assert(html.includes('aria-label="Главное меню"'),`No menu: ${route}`);
  assert(!/Мой прогресс|Продолжить обучение|Сбросить прогресс|Отметить выполненной/.test(html),`Personal progress on ${route}`);
 }
 for(const file of ['Portal.tsx','ReadingLecture.tsx','main.tsx','Handbook.tsx'])assert(!/localStorage|sessionStorage/.test(fs.readFileSync('src/'+file,'utf8')),`Personal storage in ${file}`);
 console.log(`${entries.length} reference articles verified: ${inCourse.length} in lectures, ${extra.length} supplemental; searchable commands, all 16 lecture filters, truthful API labels, no personal progress.`);
}finally{await server.close()}
