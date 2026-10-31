import originals from './originals.json';
export const modules = [
 {title:'Основы C# и Windows Forms',range:[1,8],tag:'C# · WinForms',description:'От первого окна до собственной мини-системы. Учимся читать код и управлять программой.',icon:'code',color:'mint'},
 {title:'Объектно-ориентированное программирование',range:[9,16],tag:'Классы · Объекты',description:'Создаём модель товара, работаем с коллекциями и собираем каталог.',icon:'boxes',color:'blue'},
 {title:'Базы данных и SQL',range:[17,26],tag:'PostgreSQL · SQL',description:'Таблицы, ключи, связи и первые запросы в PostgreSQL.',icon:'database',color:'purple'},
 {title:'Приложение и база данных',range:[27,34],tag:'Npgsql · CRUD',description:'Соединяем интерфейс Windows Forms с реальными данными.',icon:'link',color:'sand'},
 {title:'Каталог и пользователи',range:[35,44],tag:'Поиск · Роли',description:'Поиск, фильтры, авторизация и права доступа.',icon:'users',color:'blue'},
 {title:'Заказы и управление',range:[45,52],tag:'Транзакции · Заказы',description:'Оформление заказов и рабочие места сотрудников.',icon:'cart',color:'mint'},
 {title:'Подготовка к демоэкзамену',range:[53,60],tag:'Git · Тестирование',description:'Объединяем навыки и проверяем готовность к экзамену.',icon:'flag',color:'purple'}
];
const future = ['Знакомство с PostgreSQL и pgAdmin','Создание базы данных и таблиц','Типы данных и ограничения','Добавление данных: INSERT','Выборка данных: SELECT','Условия WHERE и сортировка','Обновление и удаление данных','Первичные и внешние ключи','Связи таблиц и JOIN','ER-диаграмма базы магазина','Подключение Npgsql','Строка подключения','Чтение данных из PostgreSQL','Вывод данных в Windows Forms','Добавление записей из приложения','Изменение записей','Удаление и обработка ошибок','Практика CRUD','Каталог из базы данных','Поиск по наименованию','Сортировка каталога','Фильтрация по категориям','Совместная работа поиска и фильтров','Форма авторизации','Проверка учётных данных','Роли пользователей','Права доступа к действиям','Практика: каталог и авторизация','Модель заказа','Создание заказа','Позиции заказа','Расчёт стоимости заказа','Транзакции','Интерфейс менеджера','Интерфейс администратора','Практика: управление заказами','Интеграция модулей','Функциональное тестирование','Обработка ошибок приложения','Основы Git','История изменений и репозиторий','Подготовка к пробному экзамену','Пробный демонстрационный экзамен','Разбор результатов и итоговая проверка'];
export const lessons = [...originals.map(d=>({id:d.id,title:d.paragraphs[0].replace(/^Практическая работа №\d+\. /,''),ready:true,goal:d.paragraphs.find(p=>p.startsWith('Цель:'))?.replace(/^Цель:\s*/, '')||'Применить изученные приёмы в учебном проекте.'})),...future.map((title,i)=>({id:i+17,title,ready:false,goal:'Планируемая тема. Материалы будут добавлены позже.'}))];
// Correct inaccurate generated explanations only. Source text and mandatory task
// wording remain unchanged; documents is the presentation layer for the lessons.
function normalizeExplanation(text:string){
 if(!/^•\s*\d+\..*→/s.test(text))return text;
 const arrow=text.indexOf('→');const code=text.slice(0,arrow).replace(/^•\s*\d+\.\s*/,'').trim();const explanation=text.slice(arrow+1);
 const explain=(note:string)=>text.slice(0,arrow+1)+'  '+note;
 if(/^else\s+if\s*\(requested\s*>\s*stock\)/.test(code)&&explanation.includes('Ветка «иначе»'))return explain('Эта ветка проверяется, только если предыдущие условия цепочки оказались ложными. Её команды выполняются, когда requested > stock истинно: запрошено больше, чем есть на складе.');
 if(/^using\s*\(ProductDetailsForm\s+details\s*=/.test(code)&&explanation.includes('пространство имён'))return explain('Создаётся карточка выбранного товара. Блок using гарантирует вызов Dispose() для details после завершения блока, в том числе после закрытия модального окна. Это управление ресурсами формы, а не подключение пространства имён.');
 if(/^public\s+decimal\s+GetDiscountedPrice\s*\(/.test(code)&&explanation.includes('Вызывается метод'))return explain('Объявляется открытый метод GetDiscountedPrice. Он получает процент скидки через параметр percent и возвращает decimal. Вычисления выполняются позже, когда метод вызывают у конкретного товара.');
 if(/^string\.IsNullOrWhiteSpace\(manufacturer\)/.test(code)&&explanation.includes('название'))return explain('Проверяется производитель: true означает пустую строку или только пробелы. Эта часть соединена с проверкой названия через ||, поэтому ошибка возникает, если не заполнено хотя бы одно из двух полей.');
 if(/^return\s*;/.test(code)&&explanation.includes('Команда возвращает результат метода или'))return explain('Немедленно завершается текущий обработчик без возвращаемого значения. Его инструкции ниже return уже не выполняются; само приложение продолжает работать.');
 if(/^return\s+decimal\.Round\(/.test(code)&&explanation.includes('Команда возвращает результат метода или'))return explain('Вычисляется decimal.Round с указанными далее аргументами; метод возвращает полученное округлённое число и завершается. Вызывающий код получает результат и продолжает свою работу.');
 if(/^return\s+"Нет в наличии"\s*;/.test(code)&&explanation.includes('Команда возвращает результат метода или'))return explain('Метод GetStockStatus возвращает строку «Нет в наличии» и завершается. Следующие проверки этого вызова пропускаются; обработчик, вызвавший метод, получает строку для вывода.');
 if(/^List<string>\s+products\s*=/.test(code)&&explanation.includes('List<Product>'))return explain('Объявляется products — список строк List<string>. Каждый элемент здесь хранит только наименование товара. Список объектов List<Product>, содержащих цену и остаток, будет изучаться отдельно.');
 if(!explanation.includes('Знак = присваивает значение слева'))return text;
 if(/^if\s*\(\s*stock\s*<=\s*3\s*\)/.test(code))return explain('Оператор <= сравнивает остаток с 3. При остатке 0, 1, 2 или 3 условие истинно; при 4 и больше — ложно. Присваивания здесь нет.');
 if(/^if\s*\(\s*price\s*<=\s*0m\s*\)/.test(code))return explain('Оператор <= проверяет, что цена равна нулю или отрицательная. В этом случае конструктор отклоняет цену; для создания товара нужна цена больше нуля.');
 return text.replace('Знак = присваивает значение слева.','Знак = записывает значение справа в переменную или свойство слева.');
}
// Only optional task blocks are removed; the mandatory wording remains verbatim.
export const documents = originals.map(d=>{let skip=false; const paragraphs:string[]=[];const formatted=[...d.paragraphs];for(const t of d.tables){formatted[t.start]='@@TABLE:'+JSON.stringify(t.rows);for(let i=t.start+1;i<t.start+t.count;i++)formatted[i]='@@SKIP';}for(let p of formatted){
 if(/^(?:Задание\s+[А-Г]|[А-Г])\s*\(дополнител|^\d+\. Дополнительное задание/.test(p)){skip=true;continue;}
 if(skip && (/^\d+\. (?:Что|Провер|Критер|Контроль|Сдача|Итог|Отч|Тест|Сценар|Таблица)/.test(p)||/^(?:Задание\s+[А-Г]|[А-Г])\s*\(обяз/.test(p)))skip=false;
 if(skip)continue;
 p=p.replace('Выполняйте задания А, Б, В по очереди; дополнительные выполняйте после обязательных.','Выполняйте обязательные задания по очереди.').replace('Дополнительное задание добровольное. ','');
 paragraphs.push(normalizeExplanation(p));
 } return {...d,paragraphs};});
export const stageNames=['Результат занятия','Теория простыми словами','Работа в Visual Studio','Разбираем код','Самостоятельная работа','Проверка и сдача'];
export const lineExplanations:Record<string,string>={};
for(const doc of documents)for(const p of doc.paragraphs){const match=p.match(/^•\s*\d+\.\s*(.*?)\s*→\s*(.*)$/s);if(match)lineExplanations[match[1].replace(/\s/g,'')]=match[2];}
export function stageContent(id:number,stage:number){const p=documents.find(d=>d.id===id)!.paragraphs; const start=p.findIndex(s=>/^1\. /.test(s));
 const task=p.findIndex(s=>/^\d+\. (?:Самостоятельн|Основное самостоятельн|Техническое задание)/.test(s));
 const check=p.findIndex((s,i)=>i>Math.max(task,start)&&/^\d+\. (?:Что должно|Что проверить|Проверочные примеры|Тесты|Критерии проверки|Контрольные ситуации|Сценарии проверки|Контрольные сценарии|Контрольные тесты|Таблица проверки)/.test(s));
 const code=p.findIndex((s,i)=>i>start&&/^3\. /.test(s));const second=p.findIndex((s,i)=>i>start&&/^2\. /.test(s));
 if(id===16){const boundaries=[34,34,74,141,34,106];return stage===0?p.slice(0,34):stage===1?p.slice(34,74):stage===2?p.slice(74,106):stage===3?p.slice(141,144):stage===4?p.slice(34,74):p.slice(boundaries[5]);}
 if(stage===0)return p.slice(0,start);
 if(stage===1)return p.slice(start,second>start?second:task);
 if(stage===2)return p.slice(second>0?second:start,code>second?code:task);
 if(stage===3)return p.slice(code>0?code:second,task>code?task:(check>code?check:p.length));
 if(stage===4)return p.slice(task>0?task:start,check>task?check:p.length);
 return p.slice(check>0?check:p.findIndex(s=>s==='Если возникла ошибка'));
}
export const glossary=[['C#','Язык программирования, на котором мы записываем инструкции для приложения.'],['Форма','Окно настольной программы. В Windows Forms это объект типа Form.'],['Name','Имя компонента в коде. Например, btnStart. Пишите латиницей без пробелов.'],['Text','Текст, который видит пользователь: заголовок, подпись кнопки или содержимое поля.'],['Событие','Сигнал о действии: например, Click возникает при нажатии кнопки.'],['Переменная','Именованное место для значения. Тип определяет, какие значения допустимы.'],['Класс','Описание общих свойств и действий объектов. Класс Product — описание товара.'],['Объект','Конкретный экземпляр класса со своими значениями свойств.'],['Конструктор','Специальный метод, который задаёт начальное состояние нового объекта.'],['List<Product>','Коллекция объектов Product. В неё можно добавлять товары и перебирать их.'],['Инкапсуляция','Управление доступом к данным: изменять остаток можно через проверяющий метод.'],['Первичный ключ','Столбец или набор столбцов, однозначно определяющий строку таблицы.']];
