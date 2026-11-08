/* Практика ДЭ — автономный журнал. Студенты не загружаются на сервер. */
(()=>{'use strict';
const V=window.DE_VARIANTS||[], byNum=new Map(V.map(v=>[v.number,v])), KEY='de2027_teachers_progress_v1';
const PARTS=['Набор и оформление Word','Слияние документов','Презентация PowerPoint','Мобильный слайдер'];
const defaultData=()=>({groups:[{id:'oi205',name:'ОИ-205',students:[]},{id:'oi206',name:'ОИ-206',students:[]}],assigned:{oi205:[],oi206:[]},marks:{},custom:{}});
function load(){try{let x=JSON.parse(localStorage.getItem(KEY));if(x&&Array.isArray(x.groups)&&x.assigned&&x.marks)return x}catch(e){}return defaultData()}
let db=load(), view='catalog', selectedVariant=null, selectedGroup=db.groups[0]?.id||'oi205',search='',filter='all',journalQuery='';
const app=document.getElementById('app');
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('Не удалось сохранить данные. Экспортируйте резервную копию.') }}
const $=(id)=>document.getElementById(id); const escape=(s)=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const currentGroup=()=>db.groups.find(g=>g.id===selectedGroup)||db.groups[0];
const groupAssignments=()=> [...(db.assigned[currentGroup()?.id]||[])].filter(n=>byNum.has(Number(n))).map(Number).sort((a,b)=>a-b);
const uid=()=> 's'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
function grade(p){if(p==null)return null;return p>=88?5:p>=76?4:p>=59?3:2}
function score(st){let vars=groupAssignments(),total=vars.reduce((a,n)=>a+(byNum.get(n)?.parts||1),0), done=0,complete=0;
  vars.forEach(n=>{let m=db.marks[st.id]?.[n]||{};let count=Object.values(m).filter(Boolean).length;done+=count;if(count===(byNum.get(n)?.parts||1))complete++});
  const p=total?Math.round(done/total*100):null;return {total,done,percent:p,grade:grade(p),complete,variants:vars.length};}
function groupStats(){let g=currentGroup(),students=g?.students||[];let ss=students.map(score),valid=ss.filter(s=>s.percent!=null);let avg=valid.length?Math.round(valid.reduce((a,s)=>a+s.percent,0)/valid.length):null;return{count:students.length,avg,assigned:groupAssignments().length,done:valid.reduce((a,s)=>a+s.complete,0), grades:[2,3,4,5].map(n=>valid.filter(s=>s.grade===n).length)} }
function gPill(grade){return grade?`<span class="grade-pill g${grade}">${grade}</span>`:'<span class="grade-pill">—</span>'}
function nav(name,label,glyph){return `<button data-nav="${name}" class="${view===name?'active':''}"><span class="glyph">${glyph}</span>${label}</button>`}
function shell(main){app.innerHTML=`<div class="shell"><aside class="sidebar"><div class="brand"><div class="brand-icon">ДЭ</div><div>Практика ДЭ<small>09.01.03 · КИМ 2027</small></div></div><div><div class="side-label">Навигация</div><nav class="nav">${nav('catalog','Варианты','▦')}${nav('journal','Журнал','▤')}${nav('analytics','Аналитика','◫')}${nav('settings','Настройки','⚙')}</nav></div><div class="side-foot">48 учебных вариантов.<br>Прогресс хранится только в браузере преподавателя.</div></aside><main class="main">${main}</main></div>`;app.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.nav;selectedVariant=null;render()}))}
function pageHeader(label,title,sub,actions=''){return `<div class="page-top"><div><div class="eyebrow">${label}</div><h1 class="h1">${title}</h1>${sub?`<p class="subtitle">${sub}</p>`:''}</div>${actions?`<div class="row wrap">${actions}</div>`:''}</div>`}
function render(){document.title=(selectedVariant&&view==='catalog'?'Вариант '+selectedVariant+' · ':'')+'Практика ДЭ · журнал';if(view==='catalog')renderCatalog();else if(view==='journal')renderJournal();else if(view==='analytics')renderAnalytics();else renderSettings()}

/* Варианты 39–48. Шаблон слияния повторяет макет «Образец Слияние_ОЗ.pdf».
   Журнал и списки студентов не изменяются. */
function kimMailPreview(html,variantNumber){
  if(variantNumber<39||variantNumber>48)return html;
  const token='<h3>Шаблон письма — расположение и текст как в «Образец Слияние_ОЗ.pdf»</h3>';
  const start=html.indexOf(token);
  if(start<0)return html;
  const close='</table></div>';
  const end=html.indexOf(close,start+token.length);
  if(end<0)return html;
  const example=[
    '<h3>Шаблон уведомления — по оригинальному образцу КИМ-2027</h3>',
    '<div class="kim-letter" aria-label="Образец письма по КИМ">',
      '<div class="kim-letter-header">',
        '<div class="kim-letter-sender">',
          'Санкт-Петербургский<br>государственный университет<br>телекоммуникаций им. проф.<br>М.А. Бонч-Бруевича «СПбГУТ»<br>',
          'наб. реки Мойки, д. 61 ЛИТЕР А,<br>Санкт-Петербург, 191186<br>',
          'тел. (812) 326-31-63, факс: (812) 326-31-59<br>',
          'р/сч 40501810300002000001 «Сбербанк»<br>',
          'ОКТМО 40909000000<br>',
          'ОКПО 01179934 ОГРН 1027809197635<br>',
          'ИНН/КПП 7808004760/784001001<br>',
          '15.11.21 № 15-02/21<br>',
          'На №___________ от ___________',
        '</div>',
        '<div class="kim-letter-recipient"><div>',
          '«Должность»<br>«Организация»<br>«Инициалы_Фамилия»<br>«Адрес_1»',
        '</div></div>',
      '</div>',
      '<div class="kim-letter-subject">Об участии в конференции</div>',
      '<div class="kim-letter-greeting">«Обращение» <span class="kim-letter-underline">«Имя» «Отчество»</span>!</div>',
      '<div class="kim-letter-hint">(в оригинале: «Уважаемый _____!», муж. «Имя» «Отчество»!)</div>',
      '<p>Предлагаем Вам принять участие в конференции.</p>',
      '<p>Надеемся на ваше согласие в ближайшее время.</p>',
      '<p class="kim-letter-signoff">С уважением,</p>',
      '<p class="kim-letter-signature">Директор&nbsp;&nbsp;&nbsp;&nbsp;Н.А. Чистова</p>',
    '</div>'
  ].join('');
  return html.slice(0,start)+example+html.slice(end+close.length);
}

function renderCatalog(){if(selectedVariant){const d=byNum.get(selectedVariant);let html=pageHeader('Каталог / Вариант '+d.number,`Вариант №${d.number}`,escape(d.title),`<button class="btn" id="printV">⎙ Печать / PDF</button><button class="btn primary" id="backV">Все варианты</button>`);
 html+=`<div class="panel-grid"><article class="card"><div class="task-meta"><span class="chip">${d.parts} ${d.parts===1?'часть':d.parts<5?'части':'частей'}</span>${d.generated?'<span class="chip muted">Дополнительный учебный вариант</span>':''}</div><div class="task-content">${kimMailPreview(d.html,d.number)}</div></article><aside><div class="side-panel"><b>Структура варианта</b><p>${Array.from({length:d.parts},(_,i)=>`${i+1}. ${escape(PARTS[i])}`).join('<br>')}</p><p>Сохраните выполненные файлы в папку с нужным именем. Если показатели в тренажёре отличаются от КИМ на экзамене, приоритет имеет выданное задание.</p></div></aside></div>`;shell(html);$('backV').onclick=()=>{selectedVariant=null;render()};$('printV').onclick=()=>window.print();return}
 const visible=V.filter(v=>{let f=filter==='all'||(filter==='word'&&v.parts===1)||(filter==='merge'&&v.parts===2)||(filter==='ppt'&&v.parts===3)||(filter==='slider'&&v.parts===4);return f&&(!search||String(v.number).includes(search)||v.title.toLowerCase().includes(search.toLowerCase()))});
 let out=pageHeader('Библиотека заданий','Каталог вариантов','Подборка учебных работ №1–48 с постепенным расширением навыков: Word, рассылка, презентации и мобильный слайдер.');
 out+=`<section class="card hero"><div><div class="eyebrow" style="color:#a2c9bb">Подготовка к демонстрационному экзамену</div><h2>От первого документа<br>до комплексного задания</h2><p>Изучайте варианты, а выполнение отмечайте в преподавательском журнале. Все задания доступны для просмотра и печати.</p></div><div class="number">48</div></section>`;
 out+=`<div class="stats"><div class="card stat"><div class="stat-label">Всего вариантов</div><div class="stat-value">48</div><div class="stat-note">№1–48</div></div><div class="card stat"><div class="stat-label">Word</div><div class="stat-value">48</div><div class="stat-note">Повторение базового навыка</div></div><div class="card stat"><div class="stat-label">Слияние</div><div class="stat-value">30</div><div class="stat-note">Начиная с №19</div></div><div class="card stat"><div class="stat-label">Слайдер</div><div class="stat-value">10</div><div class="stat-note">Варианты 39–48</div></div></div>`;
 out+=`<div class="toolbar"><label class="search"><span>⌕</span><input id="variantSearch" placeholder="Номер или тема задания" value="${escape(search)}"></label><div class="filter-tabs">${[['all','Все'],['word','1 часть'],['merge','2 части'],['ppt','3 части'],['slider','4 части']].map(([a,b])=>`<button data-filter="${a}" class="${a===filter?'active':''}">${b}</button>`).join('')}</div></div><div class="variant-grid">`;
 out+=visible.map(v=>`<button class="variant-card" data-open="${v.number}"><span class="variant-id">${String(v.number).padStart(2,'0')}</span><h3>${escape(v.title)}</h3><div class="variant-footer"><span>${v.parts} ${v.parts===1?'часть':v.parts<5?'части':'частей'}</span><span class="chip">Открыть ↗</span></div></button>`).join('')+'</div>';
 if(!visible.length)out+='<div class="empty"><h3>Варианты не найдены</h3><p>Попробуйте другой запрос или сбросьте фильтр.</p></div>';
 out+=`<p class="notice">Варианты 1–2 восстановлены как отдельные учебные упражнения, потому что их исходных файлов не было в переданном комплекте. Варианты 3–48 перенесены из подготовленных Word-документов.</p>`;
 shell(out);
 $('variantSearch').addEventListener('input',e=>{search=e.target.value;renderCatalog(); const input=$('variantSearch');input.focus();input.setSelectionRange(search.length,search.length)});
 app.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});app.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{selectedVariant=+b.dataset.open;render()});
}
function groupSelect(){return `<select id="groupSelect" class="field" style="width:auto;min-width:130px">${db.groups.map(g=>`<option value="${escape(g.id)}" ${g.id===selectedGroup?'selected':''}>${escape(g.name)}</option>`).join('')}</select>`}
function bindGroupSelect(){const s=$('groupSelect');if(s)s.onchange=e=>{selectedGroup=e.target.value;render()}}
function renderJournal(){const g=currentGroup(),vars=groupAssignments(),stats=groupStats(),filtered=(g?.students||[]).filter(s=>s.name.toLowerCase().includes(journalQuery.toLowerCase()));
 let out=pageHeader('Учёт успеваемости','Журнал практических работ','Выдавайте варианты по мере прохождения курса. Оценка рассчитывается по выполненным частям только назначенных работ.',`${groupSelect()}<button class="btn primary" id="addStudent">+ Студент</button>`);
 out+=`<div class="stats"><div class="card stat"><div class="stat-label">Студентов</div><div class="stat-value">${stats.count}</div><div class="stat-note">${escape(g?.name)}</div></div><div class="card stat"><div class="stat-label">Назначено вариантов</div><div class="stat-value">${stats.assigned}</div><div class="stat-note">Для текущей группы</div></div><div class="card stat"><div class="stat-label">Среднее выполнение</div><div class="stat-value">${stats.avg===null?'—':stats.avg+'%'}</div><div class="stat-note">По назначенным заданиям</div></div><div class="card stat"><div class="stat-label">Полностью сдано работ</div><div class="stat-value">${stats.done}</div><div class="stat-note">Всего по группе</div></div></div>`;
 out+=`<div class="toolbar"><label class="search"><span>⌕</span><input id="journalSearch" placeholder="Найти студента" value="${escape(journalQuery)}"></label><button class="btn" id="assignVars">☷ Назначить варианты</button><button class="btn" id="bulkStudents">⇩ Добавить списком</button><button class="btn" id="exportCSV">⇧ CSV</button></div>`;
 if(!g.students.length)out+=`<div class="card empty"><div style="font-size:34px">♙</div><h3>Добавьте студентов группы ${escape(g.name)}</h3><p>В публичный GitHub их фамилии не публикуются: список сохраняется только в вашем браузере. Можно добавить одного студента или вставить весь список группы.</p><button class="btn primary" id="quickAdd">Добавить студентов</button></div>`;
 else if(!vars.length)out+=`<div class="card empty"><h3>Для группы пока не назначены варианты</h3><p>Назначьте, например, 39–40. После этого напротив каждого студента появятся ячейки для отметок, а процент и оценка начнут рассчитываться автоматически.</p><button class="btn primary" id="quickAssign">Назначить варианты</button></div>`;
 else{
 out+=`<div class="table-shell"><table class="grade-table"><thead><tr><th class="student-name">ФИО студента</th><th>Выполнено</th><th>%</th><th>Оценка</th>${vars.map(n=>`<th title="${escape(byNum.get(n)?.title)}">№${n}</th>`).join('')}<th></th></tr></thead><tbody>`;
 out+=filtered.map(s=>{let x=score(s);return `<tr><td class="student-name">${escape(s.name)}</td><td class="score-cell">${x.done}/${x.total}</td><td class="score-cell">${x.percent==null?'—':x.percent+'%'}</td><td>${gPill(x.grade)}</td>${vars.map(n=>{const p=byNum.get(n)?.parts||1;let done=Object.values(db.marks[s.id]?.[n]||{}).filter(Boolean).length;return `<td><button class="mark-btn ${done===p?'complete':done?'partial':''}" data-mark="${s.id}:${n}" title="Отметить выполнение">${done}/${p}</button></td>`}).join('')}<td><button data-del="${s.id}" class="btn small bad" title="Удалить студента">×</button></td></tr>`}).join('');
 out+='</tbody></table></div><p class="subtitle">Нажмите на ячейку вида 0/4 или 2/4, чтобы отметить выполненные части варианта. Полная отметка возникает автоматически, когда зачтены все части.</p>';
 }
 out+=`<div class="notice">Данные оценок не хранятся на GitHub и не передаются другим пользователям. Они привязаны к текущему браузеру на этом устройстве. Для резервного копирования используйте «Настройки → Скачать JSON».</div>`;
 shell(out);bindGroupSelect();$('addStudent').onclick=()=>modalStudent(false);if($('quickAdd'))$('quickAdd').onclick=()=>modalStudent(true);if($('quickAssign'))$('quickAssign').onclick=modalAssign;$('assignVars').onclick=modalAssign;$('bulkStudents').onclick=()=>modalStudent(true);
 $('journalSearch').oninput=e=>{journalQuery=e.target.value;let start=e.target.selectionStart;render();$('journalSearch').focus();$('journalSearch').setSelectionRange(start,start)};
 if($('exportCSV'))$('exportCSV').onclick=exportCSV;
 app.querySelectorAll('[data-mark]').forEach(b=>b.onclick=()=>{const [sid,n]=b.dataset.mark.split(':');modalMark(sid,+n)});
 app.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{let st=g.students.find(s=>s.id===b.dataset.del);if(confirm(`Удалить ${st?.name}? Отметки будут удалены.`)){g.students=g.students.filter(s=>s.id!==b.dataset.del);delete db.marks[b.dataset.del];save();render()}});
}
function modal(title,body,footer=''){const bg=document.createElement('div');bg.className='modal-backdrop';bg.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="${escape(title)}"><h2>${escape(title)}</h2>${body}<div class="modal-footer"><button class="btn" data-close>Отмена</button>${footer}</div></div>`;document.body.appendChild(bg);bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('[data-close]'))bg.remove()});document.addEventListener('keydown',function esc(e){if(e.key==='Escape'){bg.remove();document.removeEventListener('keydown',esc)}});return bg}
function modalStudent(multi){let g=currentGroup(),body=multi?`<p>Вставьте ФИО: каждый студент с новой строки. Можно вставить список целиком из таблицы.</p><textarea class="field" id="studentsLines" rows="12" placeholder="Иванов Иван Иванович&#10;Петрова Мария Сергеевна"></textarea>`:`<p>Студент появится в группе ${escape(g.name)}.</p><label class="form-label">ФИО студента</label><input class="field" id="studentName" placeholder="Фамилия Имя Отчество">`;
 let bg=modal(multi?'Добавление списка студентов':'Новый студент',body,`<button class="btn primary" id="studentSave">Добавить</button>`);
 bg.querySelector('#studentSave').onclick=()=>{let text=(bg.querySelector(multi?'#studentsLines':'#studentName').value||'').trim();let names=(multi?text.split(/\r?\n/):[text]).map(s=>s.trim()).filter(Boolean);let existing=new Set(g.students.map(x=>x.name.toLowerCase()));let added=0;names.forEach(name=>{if(name.length<3||existing.has(name.toLowerCase()))return;g.students.push({id:uid(),name});existing.add(name.toLowerCase());added++});if(!added){alert('Нет новых имён для добавления.');return}save();bg.remove();render()};
}
function modalAssign(){let assigned=new Set(groupAssignments());let body=`<p>Отметьте варианты, которые уже выданы группе <b>${escape(currentGroup().name)}</b>. Только по ним рассчитывается процент выполнения.</p><label class="form-label">Быстрый ввод: 1-5, 11, 39-48</label><input class="field" id="rangeInput" placeholder="39-48"><button class="btn small" id="applyRange" style="margin-top:8px">Выделить указанные</button><div class="checkbox-grid" id="variantChecks">${V.map(v=>`<label class="${assigned.has(v.number)?'selected':''}"><input type="checkbox" value="${v.number}" ${assigned.has(v.number)?'checked':''}>${v.number}</label>`).join('')}</div>`;
 let bg=modal('Назначить варианты',body,`<button class="btn primary" id="saveAssigned">Сохранить назначение</button>`);
 const grid=bg.querySelector('#variantChecks');grid.onchange=e=>{if(e.target.matches('input'))e.target.closest('label').classList.toggle('selected',e.target.checked)};
 bg.querySelector('#applyRange').onclick=()=>{const set=new Set();const text=bg.querySelector('#rangeInput').value;for(const p of text.split(/[,;\s]+/)){if(!p)continue;let m=p.match(/^(\d+)-(\d+)$/);if(m){for(let i=Math.max(1,+m[1]);i<=Math.min(48,+m[2]);i++)set.add(i)}else if(/^\d+$/.test(p)&&+p<=48&&+p>0)set.add(+p)}if(!set.size){alert('Введите номера, например 39-48');return}grid.querySelectorAll('input').forEach(inp=>{if(set.has(+inp.value)){inp.checked=true;inp.closest('label').classList.add('selected')}})};
 bg.querySelector('#saveAssigned').onclick=()=>{db.assigned[selectedGroup]=[...grid.querySelectorAll('input:checked')].map(i=>+i.value).sort((a,b)=>a-b);save();bg.remove();render()};
}
function modalMark(sid,n){let g=currentGroup(),st=g.students.find(s=>s.id===sid),v=byNum.get(n);if(!st||!v)return;const current=db.marks[sid]?.[n]||{};
 let body=`<p><b>${escape(st.name)}</b> · Вариант №${n}<br><span class="muted">${escape(v.title)}</span></p><div>${Array.from({length:v.parts},(_,i)=>`<label class="checkrow"><input class="partCheck" type="checkbox" value="${i}" ${current[i]?'checked':''}><span>${escape(PARTS[i])}</span></label>`).join('')}</div>`;
 let bg=modal(`Выполнение варианта №${n}`,body,`<button class="btn" id="markAll">Зачесть всё</button><button class="btn primary" id="markSave">Сохранить</button>`);
 bg.querySelector('#markAll').onclick=()=>bg.querySelectorAll('.partCheck').forEach(c=>c.checked=true);
 bg.querySelector('#markSave').onclick=()=>{db.marks[sid]??={};db.marks[sid][n]={};bg.querySelectorAll('.partCheck').forEach(c=>db.marks[sid][n][c.value]=c.checked);save();bg.remove();render()};
}
function renderAnalytics(){let g=currentGroup(),stats=groupStats();let students=g.students.map(s=>({...s,...score(s)})).sort((a,b)=>(b.percent??-1)-(a.percent??-1));
 let out=pageHeader('Сводка','Аналитика группы','Показатели обновляются при каждой отметке выполнения.',groupSelect());
 out+=`<div class="stats"><div class="card stat"><div class="stat-label">Студентов</div><div class="stat-value">${stats.count}</div></div><div class="card stat"><div class="stat-label">Средний процент</div><div class="stat-value">${stats.avg===null?'—':stats.avg+'%'}</div></div><div class="card stat"><div class="stat-label">Назначено вариантов</div><div class="stat-value">${stats.assigned}</div></div><div class="card stat"><div class="stat-label">Зачтено вариантов</div><div class="stat-value">${stats.done}</div></div></div>`;
 out+=`<div class="panel-grid"><div class="card"><h3>Распределение оценок</h3><p class="subtitle">Оценка выставляется от процента выполненных частей назначенных вариантов.</p><div class="chart-bars">${[2,3,4,5].map((n,i)=>{let h=stats.count?Math.round(stats.grades[i]/Math.max(1,...stats.grades)*120):0;return `<div class="column"><span>${stats.grades[i]}</span><div class="bar g${n}" style="height:${Math.max(4,h)}px"></div><span class="grade-pill g${n}">${n}</span></div>`}).join('')}</div></div><div class="card"><h3>Шкала оценивания</h3><div class="checkrow">${gPill(5)} <span>88–100% выполнения</span></div><div class="checkrow">${gPill(4)} <span>76–87%</span></div><div class="checkrow">${gPill(3)} <span>59–75%</span></div><div class="checkrow">${gPill(2)} <span>0–58%</span></div><p class="subtitle">Без назначенных вариантов оценка не выставляется.</p></div></div>`;
 out+=`<div class="card" style="margin-top:20px"><h3>Студенты группы ${escape(g.name)}</h3>${students.length?`<div class="task-table-wrap"><table class="task-table"><tr><th>ФИО</th><th>Выполнено</th><th>Процент</th><th>Оценка</th></tr>${students.map(s=>`<tr><td>${escape(s.name)}</td><td>${s.done}/${s.total}</td><td>${s.percent===null?'—':s.percent+'%'}</td><td>${gPill(s.grade)}</td></tr>`).join('')}</table></div>`:'<p class="muted">Сначала добавьте студентов в журнал.</p>'}</div>`;
 shell(out);bindGroupSelect();}
function downloadText(name,body,type){const b=new Blob([body],{type});let u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000)}
function exportJSON(){downloadText('de2027-journal-backup.json',JSON.stringify(db,null,2),'application/json;charset=utf-8')}
function exportCSV(){let g=currentGroup(),lines=[['ФИО','Группа','Выполнено','Всего','Процент','Оценка'].join(';')];for(const st of g.students){const s=score(st);lines.push([st.name,g.name,s.done,s.total,s.percent??'',s.grade??''].map(x=>String(x).replaceAll(';',',')).join(';'))}downloadText(`de2027-${g.name}.csv`,'\ufeff'+lines.join('\r\n'),'text/csv;charset=utf-8')}
function importJSON(file){let r=new FileReader();r.onload=()=>{try{const x=JSON.parse(String(r.result));if(!Array.isArray(x.groups)||!x.assigned||!x.marks)throw Error('Неверная структура файла');if(confirm('Заменить текущий журнал данными из резервной копии?')){db=x;selectedGroup=db.groups[0]?.id;save();render()}}catch(e){alert('Неподходящий JSON-файл: '+e.message)}};r.readAsText(file,'utf-8')}
function renderSettings(){let out=pageHeader('Управление','Настройки и данные','Локальный журнал — удобен для одного преподавателя и одного браузера. Данные групп и отметки не отправляются на GitHub.');
 out+=`<div class="panel-grid"><section class="card"><h3>Группы</h3><div class="row wrap">${db.groups.map(g=>`<span class="group-chip">${escape(g.name)} · ${g.students.length} студентов</span>`).join('')}</div><div class="row wrap" style="margin:17px 0"><input class="field grow" style="width:auto" id="newGroup" placeholder="Например, ОИ-207"><button class="btn" id="createGroup">+ Добавить группу</button></div><h3>Резервное копирование</h3><p class="subtitle">JSON сохраняет группы, отметки и назначенные варианты. Держите файл в безопасном месте.</p><div class="row wrap" style="margin-top:14px"><button class="btn primary" id="jsonExport">↓ Скачать JSON</button><label class="btn" for="jsonImport" style="cursor:pointer">↑ Загрузить JSON</label><input id="jsonImport" class="hidden" type="file" accept=".json,application/json"></div><p class="subtitle" style="margin-top:16px">CSV содержит оценки текущей группы; его можно открыть в Excel.</p><button class="btn" id="settingsCSV">↓ Экспорт CSV</button></section><aside class="card"><h3>Шкала оценок</h3><p>5 — от 88%<br>4 — от 76%<br>3 — от 59%<br>2 — до 58%</p><h3>Как считается процент?</h3><p class="subtitle">Зачтённые части всех назначенных группе вариантов / общее количество частей этих вариантов × 100%.</p><h3>Сохранность данных</h3><p class="subtitle">Если очистить данные браузера, отметки могут исчезнуть. Периодически сохраняйте JSON.</p></aside></div>`;
 out+=`<div class="privacy" style="margin-top:19px"><strong>Конфиденциальность:</strong> GitHub Pages — общедоступный статический сайт. Поэтому фамилии и оценки не размещаются в коде сайта и не доступны другим посетителям. Встроенный журнал хранится только в браузере. Для общего журнала с синхронизацией между компьютерами, входом преподавателя и резервированием понадобится отдельная защищённая база данных и авторизация.</div>`;
 shell(out);$('createGroup').onclick=()=>{let name=$('newGroup').value.trim();if(name.length<3){alert('Введите название группы');return}if(db.groups.some(g=>g.name.toLowerCase()===name.toLowerCase())){alert('Группа уже существует');return}const id='g'+Date.now().toString(36);db.groups.push({id,name,students:[]});db.assigned[id]=[];selectedGroup=id;save();render()};$('jsonExport').onclick=exportJSON;$('settingsCSV').onclick=exportCSV;$('jsonImport').onchange=e=>{if(e.target.files?.[0])importJSON(e.target.files[0])};}
render();
})();