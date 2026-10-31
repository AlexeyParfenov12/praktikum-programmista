import {documents} from './data';
import type {Shot} from './vs-shots';
import {resolveLectureShotPlacements} from './lecture-shots';
export const isTask=(text:string)=>/^(?:Задание\s+)?[А-Г]\s*\(обяз/.test(text);
export const isCode=(text:string)=>/^(?:\/\/|using\s|namespace\s|private\s|public\s|internal\s|class\s|(?:int|decimal|string|bool|double|var)\b|Product\s|List<|if\s*\(|else\b|foreach\s*\(|for\s*\(|(?:[a-zA-Z_]\w*\.)+[a-zA-Z_]\w*\s*(?:=|\())/.test(text)&&/[;{}]/.test(text);
// These are the section titles in the sixteen source documents. Numbered
// instructions inside a task are ordinary paragraphs, even when they are short.
const majorTitles=new Set([
 'Что такое WinForms и как устроен проект','Пошагово: создаём приложение',
 'Первая инструкция C','Самостоятельная часть','Что должно получиться',
 'Новое: ввод и вывод информации','Добавляем поля на имеющуюся форму',
 'Проверяем пустой ввод','Как проверять программу','Почему типов данных несколько',
 'Добавляем числовые поля','Практика: эксперимент с данными','Операции и присваивание',
 'Из чего складывается стоимость','Изменения формы','Обязательные тесты',
 'Разбираем типичные ошибки','Зачем программе условия','Проверка остатка',
 'Выбор категории через switch','Проверочные ситуации','Что такое валидация',
 'Добавляем отдельную форму проверки данных (на той же Form1)','Набор тестов',
 'Почему нельзя написать 100 одинаковых строк','Добавляем список товаров',
 'Считаем суммарный остаток через for','Пробуем while','Что такое метод',
 'Метод расчёта стоимости','Метод определения статуса наличия',
 'Основное самостоятельное задание: «Проверка заказа»','Контрольные тесты',
 'Зачем менять программу','Начинаем каталог отдельно от старой формы',
 'Пишем свой первый класс','Создаём объект и выводим его на форму',
 'Самостоятельная работа','Таблица проверки','Что неудобно в прежнем варианте',
 'Изменяем класс Product','Исправляем обработчик кнопки','Эксперимент: порядок аргументов',
 'Что проверить','Зачем скрывать изменение данных',
 'Базовая версия Product для следующих занятий','Вызываем методы объекта',
 'Проверочные примеры','Зачем нужна коллекция','Элементы интерфейса',
 'Список как поле формы','Учимся вычислять итоговые показатели','Тесты',
 'Зачем таблица','Подготовка формы','Вывод объектов в DataGridView','Проверка',
 'Критерии проверки','Один объект, несколько экранов','Создаём окно карточки товара',
 'Открываем карточку выбранной строки','Контрольные ситуации',
 'Почему программа должна проверять данные','Поля добавления на CatalogForm',
 'Код обработчика добавления','Учимся отладке','Сценарии проверки',
 'Техническое задание','Исходные данные','Контрольные сценарии',
 'Подсказки-ориентиры (не решение)','Отчёт студента','Что оценивается (10 баллов)'
]);
export function isMajorHeading(text:string){const title=text.match(/^\d+\.\s+(.+)$/)?.[1];return !!title&&majorTitles.has(title);}
export function isHeading(text:string){return !isCode(text)&&!text.startsWith('•')&&(isMajorHeading(text)||/^(?:План пары|Словарь терминов|Памятка новичку|Объяснение простыми словами|Разбор примера по строкам|Самопроверка и сдача|Если возникла ошибка$|Если программа не работает:|Личный чек-лист|Основные требования:|Подробная инструкция к заданию|Что проверить по требованию)/.test(text));}
export type ReadingBlock={kind:'text';text:string;index:number}|{kind:'image';shot:Shot}|{kind:'task-help';text:string;ordinal:number};
export function buildReading(id:number):ReadingBlock[]{
 const paragraphs=documents.find(d=>d.id===id)!.paragraphs;const blocks:ReadingBlock[]=[];const seen=new Set<string>();const placements=resolveLectureShotPlacements(id,paragraphs);let task:string[]=[];let ordinal=0;
 const put=(shots:Shot[])=>{for(const shot of shots)if(!seen.has(shot.file)){seen.add(shot.file);blocks.push({kind:'image',shot});}};
 const finishTask=()=>{if(task.length){blocks.push({kind:'task-help',text:task.join('\n'),ordinal:ordinal++});task=[];}};
 for(let index=0;index<paragraphs.length;index++){
  const text=paragraphs[index];if(index===0||text==='@@SKIP')continue;
  const heading=isHeading(text);const mainHeading=isMajorHeading(text);
  const independent=/^\d+\.\s(?:Самостоятельн|Основное самостоятельн|Техническое задание)/.test(text);
  if(isTask(text)||mainHeading)finishTask();
  if(isTask(text)||(independent&&(id===8||id===16)))task=[text];else if(task.length)task.push(text);
  // Keep original paragraphs exactly once and in their original order.
  blocks.push({kind:'text',text,index});
  put(placements.get(index)||[]);
 }
 finishTask();return blocks;
}
