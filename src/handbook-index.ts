import {documents,lessons} from './data';
import {lectures} from './lecture-data';
import {buildReading,isCode} from './reading-content';
import {taskHelp} from './task-help';
import {termExamples} from './handbook-term-examples';
import {csharpEntries} from './handbook-csharp';
import {winformsEntries} from './handbook-winforms';
import {extraEntries} from './handbook-extra';
import type {HandbookEntry,IndexedHandbookEntry} from './handbook-types';

// Index only material the student can actually read, including optional examples.
// Screenshot captions are excluded: some show an explicitly separate demo project.
export const lectureCorpus=documents.map(doc=>{
 const blocks=buildReading(doc.id);
 const helpBlocks=blocks.filter(b=>b.kind==='task-help').map(b=>taskHelp(doc.id,b.text,b.ordinal));
 const tasks=blocks.filter(b=>b.kind==='task-help').map(b=>{
  const help=taskHelp(doc.id,b.text,b.ordinal);return [help.code,help.note,...help.hints].join('\n');
 });
 const scenarios=lectures[doc.id].scenarios.map(s=>[s.input,s.code,...s.frames.map(f=>f.note+' '+Object.keys(f.values).join(' '))].join('\n'));
 const code=[...doc.paragraphs.filter(isCode),...helpBlocks.map(h=>h.code),...lectures[doc.id].scenarios.map(s=>s.code)].join('\n');
 return {id:doc.id,text:[...doc.paragraphs.filter(p=>p!=='@@SKIP'),...tasks,...scenarios].join('\n'),code};
});
const escape=(value:string)=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
export function containsLectureToken(text:string,token:string){
 if(!token.trim())return false;
 // A single operator must not match a different, longer operator.
 if(/^[=+*/%<>!&|?\-]+$/.test(token))return new RegExp('(?<![=+*/%<>!&|?\\-])'+escape(token)+'(?![=+*/%<>!&|?\\-])').test(text);
 const flexible=escape(token).replace(/\s+/g,'\\s+').replace(/\\\+/g,'\\s*\\+\\s*');
 const left=/^[\p{L}\p{N}_]/u.test(token)?'(?<![\\p{L}\\p{N}_])':'';
 const right=/[\p{L}\p{N}_]$/u.test(token)?'(?![\\p{L}\\p{N}_])':'';
 const pattern=new RegExp(left+flexible+right,/[А-Яа-яЁё]/.test(token)?'giu':'gu');
 for(const match of text.matchAll(pattern)){
  if(/^(?:F\d+|Ctrl\+|Shift\+|Alt\+)/.test(token)&&/\+\s*$/.test(text.slice(0,match.index)))continue;
  return true;
 }
 return false;
}
export const curatedEntries:HandbookEntry[]=[...csharpEntries,...winformsEntries,...extraEntries];
const normalize=(text:string)=>text.toLocaleLowerCase('ru').replace(/^(?:свойство|событие|коллекция|модель)\s+/,'').replace(/\(\)|\s+/g,'').replace(/^форма\(form\)$/,'form');
const coveredNames=new Set(curatedEntries.flatMap(e=>[e.title,...e.aliases??[],...e.lectureTokens??[]]).map(normalize));
function hash(text:string){let value=2166136261;for(const ch of text){value^=ch.charCodeAt(0);value=Math.imul(value,16777619)}return (value>>>0).toString(36)}
const sourceTerms=new Map<string,{title:string;definition:string;ids:number[];example:string}>();
for(const doc of documents){
 const start=doc.paragraphs.findIndex(p=>p.startsWith('Словарь терминов'));
 if(start<0)continue;
 for(const paragraph of doc.paragraphs.slice(start+1)){
  const match=paragraph.match(/^•\s*(.{1,70}?)\s+—\s+(.+)$/s);if(!match)break;
  const [,title,definition]=match;const key=normalize(title);
  if(coveredNames.has(key))continue;
  const existing=sourceTerms.get(key);
  if(existing){existing.ids.push(doc.id);continue;}
  const code=doc.paragraphs.find(p=>isCode(p)&&p.includes(title.replace(/\(\)$/,'')));
  sourceTerms.set(key,{title,definition,ids:[doc.id],example:code||definition});
 }
}
const termEntries:IndexedHandbookEntry[]=[...sourceTerms].map(([key,term])=>({
 id:'term-'+hash(key),title:term.title,category:'Термины курса',kind:'Понятие',description:term.definition,
 syntax:term.title,example:termExamples[term.title]?.example||term.example,notes:termExamples[term.title]?.notes||'Определение из словаря учебной работы. Откройте связанную лекцию: там приведены инструкции, исходные данные и контекст применения.',
 docsUrl:'https://learn.microsoft.com/ru-ru/dotnet/csharp/tour-of-csharp/',language:termExamples[term.title]?.language||(isCode(term.example)?'csharp':'text'),
 lectureIds:[...new Set([...term.ids,...lectureCorpus.filter(c=>containsLectureToken(c.text,term.title)).map(c=>c.id)])].sort((a,b)=>a-b),aliases:[],lectureTokens:[term.title]
}));
const componentTypes:Record<string,string>={btn:'Button',lbl:'Label',txt:'TextBox',nud:'NumericUpDown',dgv:'DataGridView',cmb:'ComboBox',lst:'ListBox'};
export const componentNames=[...new Set(lectureCorpus.flatMap(c=>c.text.match(/\b(?:btn|lbl|txt|nud|dgv|cmb|lst)[A-Z][A-Za-z0-9_]*\b/g)||[]))].filter(name=>!name.includes('_')).sort();
const componentEntries:HandbookEntry[]=componentNames.map(name=>{
 const type=componentTypes[name.slice(0,3)];
 const example=type==='NumericUpDown'?`decimal value = ${name}.Value;`:type==='DataGridView'?`if (${name}.CurrentRow != null)\n{\n    object selected = ${name}.CurrentRow.Tag;\n}`:type==='ComboBox'?`${name}.Items.Add("Кроссовки");\n${name}.SelectedIndex = 0;`:type==='ListBox'?`${name}.Items.Clear();\n${name}.Items.Add("Кроссовки");`:`${name}.Text = "${type==='TextBox'?'Кроссовки':'Готово'}";`;
 return {id:'project-'+name,title:name,category:'Имена компонентов в лекциях',kind:'Имя компонента',description:`Учебное имя элемента ${type}. Это имя, заданное в свойстве Name в конструкторе Visual Studio; оно позволяет обращаться к конкретному компоненту из кода формы.`,syntax:`${type} ${name}`,example,notes:'Это не встроенная команда .NET. Сначала добавьте компонент нужного типа на форму и задайте его Name. В своём проекте используйте фактическое имя своего элемента. Text задаёт видимую надпись, Name — имя в коде.',docsUrl:'https://learn.microsoft.com/ru-ru/dotnet/api/system.windows.forms.'+type.toLowerCase(),lectureTokens:[name],aliases:[type,'Name','имя элемента','учебный проект']};
});
// Punctuation in Russian prose and in string literals is not a C# operator.
function operatorCode(code:string){return code.replace(/@?"(?:\\.|""|[^"\\])*"|'(?:\\.|[^'\\])'|\/\/[^\n]*|\/\*[\s\S]*?\*\//g,' ').replace(/\b(?:List|Dictionary|HashSet|IEnumerable|IList|ICollection|BindingList|Task)\s*<[^>\n]+>/g,' ');}
export function matchesEntry(corpus:typeof lectureCorpus[number],entry:HandbookEntry){return (entry.lectureTokens??[entry.title]).some(token=>containsLectureToken(/^[=+*/%<>!&|?\-]+$/.test(token)&&token!=='//'&&token!=='/*'?operatorCode(corpus.code):corpus.text,token));}
export const handbookEntries:IndexedHandbookEntry[]=[...curatedEntries,...componentEntries].map(entry=>({...entry,lectureIds:lectureCorpus.filter(c=>matchesEntry(c,entry)).map(c=>c.id)})).concat(termEntries).sort((a,b)=>a.title.localeCompare(b.title,'ru'));
export const handbookCategories=[...new Set(handbookEntries.map(e=>e.category))].sort((a,b)=>a.localeCompare(b,'ru'));
export const handbookKinds=[...new Set(handbookEntries.map(e=>e.kind))].sort((a,b)=>a.localeCompare(b,'ru'));
export const availableLessons=lessons.filter(l=>l.ready);
export type HandbookFilters={query:string;category:string;kind:string;coverage:string;lesson:string};
export const emptyFilters:HandbookFilters={query:'',category:'',kind:'',coverage:'',lesson:''};
export function filterHandbook(filters:HandbookFilters){
 const words=filters.query.trim().toLocaleLowerCase('ru').split(/\s+/).filter(Boolean);
 return handbookEntries.filter(e=>{
  if(filters.category&&e.category!==filters.category||filters.kind&&e.kind!==filters.kind)return false;
  if(filters.coverage==='lecture'&&!e.lectureIds.length||filters.coverage==='extra'&&e.lectureIds.length)return false;
  if(filters.lesson&&!e.lectureIds.includes(Number(filters.lesson)))return false;
  const haystack=[e.title,e.description,e.syntax,e.example,e.notes,...e.aliases??[]].join(' ').toLocaleLowerCase('ru');
  return words.every(word=>haystack.includes(word));
 });
}
export function readFilters(route:string):HandbookFilters{const p=new URLSearchParams(route.split('?')[1]||'');return {query:p.get('q')||'',category:p.get('category')||'',kind:p.get('kind')||'',coverage:p.get('coverage')||'',lesson:p.get('lesson')||''};}
export function handbookHref(id:string|undefined,filters:HandbookFilters){const p=new URLSearchParams();for(const [key,value] of Object.entries(filters))if(value)p.set(key==='query'?'q':key,value);const query=p.toString();return '#/glossary'+(id?'/'+encodeURIComponent(id):'')+(query?'?'+query:'');}
