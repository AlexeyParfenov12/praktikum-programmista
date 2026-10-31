import {resultShots,toolboxShot,type Shot} from './vs-shots';

/** Every prefix identifies one original paragraph. Images follow that paragraph. */
export type LectureShotPlacement={after:string;shots:Shot[]};
const pic=(file:string,title:string,note:string):Shot=>({file:file+'.jpg',title,note});
const at=(after:string,...shots:Shot[]):LectureShotPlacement=>({after,shots});
const form=(id:number)=>pic(`lesson-${id}-designer`,'Форма в Visual Studio',`Реальный конструктор учебного примера №${id}. На снимке показано расположение компонентов; точные имена, состав элементов и значения задаёт текущая инструкция.`);
const name=()=>pic('button-name','Где задать Name','Общий приём на кнопке btnStart из №1: выделите свой компонент, нажмите F4 и найдите (Name). Используйте имя из текущей инструкции.');
const text=()=>pic('button-text','Где изменить Text','Общий приём на btnStart из №1: свойство Text задаёт надпись, а (Name) — имя для обращения из кода.');
const click=()=>pic('click-event','Где проверить событие Click','Общий приём на btnStart из №1: в свойствах нажмите значок молнии и найдите Click. Для текущей кнопки проверьте имя её собственного обработчика.');
const grid=()=>pic('grid-columns','Редактор столбцов DataGridView','Общий приём на таблице из №13: откройте свойство Columns кнопкой «…». Сверяйте Name, HeaderText и порядок столбцов с текущей инструкцией.');
const results=(id:number)=>resultShots(id).map(s=>id===8?{...s,note:s.note.replace('Полное решение контрольной выполните самостоятельно.','Можно использовать подсказки и пример кода к заданию ниже.')}:s);

// Explicit anchors prevent a mention of a C# property or an old control from
// being mistaken for an instruction to edit the designer or add that control.
export const lectureShotPlacements:Record<number,LectureShotPlacement[]>={
 1:[
  at('Название проекта и решения: ShoeStoreTraining.',pic('project-settings','Настройка проекта','В мастере Visual Studio заданы имя ShoeStoreTraining и папка проекта.'),pic('dotnet-version','Выбор версии .NET','Следующее окно мастера: в учебном примере выбрана .NET 8.')),
  at('Откроется Form1 в режиме конструктора.',pic('designer-empty','Пустая форма','Настоящий конструктор Form1 после создания проекта.')),
  at('Перетащите Label. В окне свойств установите Name = lblTitle',toolboxShot('Label')),
  at('Перетащите Button. Установите Name = btnStart',toolboxShot('Button'),name(),text()),
  at('Добавьте ещё один Label: Name = lblOutput',form(1)),
  at('Дважды щёлкните по btnStart в конструкторе.',click(),pic('handler-empty','Созданный обработчик','Visual Studio создала btnStart_Click. Следующий код добавляется внутрь его фигурных скобок.')),
  at('Запустите через Ctrl + F5. Сначала написано',...results(1)),
  at('5. Проверка: нажмите «Запустить», затем «Сброс».',pic('lesson-1-reset','Результат сброса','После «Сброс» обе надписи вернулись к начальным значениям без перезапуска программы.'))
 ],
 2:[
  at('Из Toolbox перетащите Label.',toolboxShot('Label')),
  at('Добавьте TextBox; Name = txtProductName',toolboxShot('TextBox')),
  at('Добавьте Button; Name = btnShowProduct',toolboxShot('Button'),name(),text()),
  at('1. Добавьте новый TextBox на Form1; назначьте Name = txtManufacturer.',pic('lesson-2-properties','Свойства текстового поля','В Visual Studio выбран txtManufacturer из учебного примера №2. Выделите своё поле и сверяйте его Name в окне F4.'),form(2)),
  at('5. Проверьте три случая: пустое название, пустой производитель, оба поля заполнены.',...results(2))
 ],
 3:[
  at('Добавьте Label с подписью «Цена товара, ₽».',toolboxShot('Label')),
  at('Добавьте NumericUpDown: Name = nudPrice',toolboxShot('NumericUpDown')),
  at('Задание В (обязательное). Добавьте NumericUpDown nudStock',pic('lesson-3-properties','Диапазон остатка','В окне свойств выбран nudStock из №3: сверяйте Minimum = 0 и Maximum = 10000 с текущим заданием.'),form(3)),
  at('5. Проверьте: заказано 4, на складе 10.',...results(3))
 ],
 4:[
  at('Добавьте NumericUpDown: Name = nudDiscount',toolboxShot('NumericUpDown'),pic('lesson-4-properties','Выбранное поле скидки','В окне F4 выбран nudDiscount из №4. У своего поля проверьте диапазон и остальные значения по инструкции.')),
  at('Добавьте Label: Name = lblTotal',toolboxShot('Label')),
  at('Добавьте Button: Name = btnTotal',toolboxShot('Button')),
  at('Дважды нажмите btnTotal.',click()),
  at('1. В дизайнере формы перетащите ещё один Label и назначьте Name = lblDiscountSum.',form(4)),
  at('4. Проверьте пример: 2 шт. по 1000 ₽, скидка 20%',...results(4)),
  at('4. Проверьте: введите любую скидку, рассчитайте, затем нажмите новую кнопку',pic('lesson-4-no-discount','После «Без скидки»','В реальном примере скидка стала 0, а итог повторного расчёта — 2000 ₽.'))
 ],
 5:[
  at('В проекте после №4 сохраните копию Lesson05.',toolboxShot('Label'),toolboxShot('Button'),click()),
  at('Добавьте ComboBox cmbCategory.',toolboxShot('ComboBox'),form(5)),
  at('Проверьте все строки и зафиксируйте вывод.',...results(5),pic('lesson-5-rejected','Отказ при превышении остатка','Отдельный проверочный пример: запрошено 9 при остатке 8. Приложение показывает сообщение об отказе.'))
 ],
 6:[
  at('Label «Артикул (от 4 символов)», TextBox с Name = txtArticle.',toolboxShot('TextBox'),toolboxShot('Label')),
  at('Button с Name = btnValidate, Text = Проверить данные.',toolboxShot('Button'),name()),
  at('Label с Name = lblValidation, Text = Результат проверки',form(6)),
  at('Дважды нажмите btnValidate.',click()),
  at('Запустите все проверки.',...results(6),pic('lesson-6-rejected','Проверка ошибочного ввода','В поле остатка введено abc. Приложение сообщает об ошибке и продолжает работать.'))
 ],
 7:[
  at('Сохраните проект после №6 как Lesson07.',toolboxShot('ListBox'),toolboxShot('Button'),toolboxShot('Label'),form(7)),
  at('Дважды нажмите btnLoadProducts',click()),
  at('3. Для заданного массива ответ 3 (значения 2,1,3).',...results(7))
 ],
 8:[
  at('2. В дизайнере добавьте недостающие элементы',form(8)),
  at('Требования к интерфейсу: пользователь вводит название товара',toolboxShot('TextBox'),toolboxShot('NumericUpDown'),toolboxShot('Button')),
  at('Повторное нажатие кнопки с другими данными должно давать новый результат',...results(8))
 ],
 9:[
  at('Добавьте Label с именем lblCatalogResult',toolboxShot('Label')),
  at('Добавьте Button с именем btnDemo',toolboxShot('Button'),form(9)),
  at('В обозревателе решений нажмите на проект → Добавить → Класс, имя файла Product.cs.',pic('add-class','Добавление Product.cs','Ctrl + Shift + A → «Класс». Введите имя Product.cs и добавьте файл в текущий проект.')),
  at('Откройте дизайнер CatalogForm, дважды нажмите на btnDemo.',click()),
  at('6. Таблица проверки',...results(9))
 ],
 10:[
  at('3. Исправляем обработчик кнопки',form(10)),
  at('6. Что проверить',...results(10))
 ],
 11:[
  at('3. Вызываем методы объекта',form(11)),
  at('5. Проверочные примеры',...results(11))
 ],
 12:[
  at('Создайте копию Lesson12. На CatalogForm в дизайнере добавьте:',toolboxShot('ListBox'),toolboxShot('Button'),toolboxShot('Label')),
  at('У ListBox увеличьте размер',form(12)),
  at('6. Тесты',...results(12))
 ],
 13:[
  at('В копии Lesson13 откройте дизайнер CatalogForm.',toolboxShot('DataGridView'),pic('lesson-13-properties','Свойства DataGridView','В Visual Studio выбран dgvProducts из №13. Проверьте ReadOnly, AllowUserToAddRows и выделение строки по инструкции.'),grid(),form(13)),
  at('1. Добавьте Label lblSelectedProduct в дизайнере.',toolboxShot('Label')),
  at('2. Выделите dgvProducts, откройте события (молния) и создайте SelectionChanged.',pic('click-event','Где находится список событий','Общий приём показан на кнопке из №1: значок молнии открывает список событий. В текущем задании выберите свой dgvProducts и событие SelectionChanged, а не Click со снимка.')),
  at('6. Критерии проверки',...results(13))
 ],
 14:[
  at('В копии Lesson14 в Solution Explorer:',toolboxShot('Label'),form(14)),
  at('На CatalogForm добавьте кнопку btnDetails',toolboxShot('Button'),click()),
  at('2. Каждый раз нажмите кнопку «Карточка» и сверьте',...results(14))
 ],
 15:[
  at('В копии Lesson15 добавьте в свободной области формы',toolboxShot('TextBox'),toolboxShot('Button'),toolboxShot('Label'),form(15)),
  at('Создайте событие btnAddProduct_Click двойным щелчком',click()),
  at('Здесь out decimal price означает',...results(15)),
  at('1. Добавьте NumericUpDown nudSellQty и Button btnSell на форму каталога.',toolboxShot('NumericUpDown'))
 ],
 16:[
  at('Вывести таблицу через DataGridView со столбцами:',form(16)),
  at('Скидка фиксированная — 10%.',...results(16))
 ]
};

/** Resolve anchors once and fail explicitly if source edits invalidate a match. */
export function resolveLectureShotPlacements(id:number,paragraphs:string[]):Map<number,Shot[]>{
 const result=new Map<number,Shot[]>();
 for(const placement of lectureShotPlacements[id]||[]){
  const matches=paragraphs.flatMap((text,index)=>text.startsWith(placement.after)?[index]:[]);
  if(matches.length!==1)throw new Error(`Screenshot anchor must match once: lesson ${id}, ${JSON.stringify(placement.after)} (${matches.length} matches)`);
  const index=matches[0];result.set(index,[...(result.get(index)||[]),...placement.shots]);
 }
 return result;
}
