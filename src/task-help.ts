export type TaskHelp = {hints:string[];code:string;note?:string};
const example=(hints:string[],code:string,note='Фрагмент для примера. Разместите его в указанном обработчике или классе и совместите с уже написанным кодом.'):TaskHelp=>({hints,code,note});

const examples:Record<number,TaskHelp[]>={
1:[
 example(['В конструкторе выделите саму форму и через F4 измените Text; затем выделите lblTitle и настройте Font.','Текст приветствия меняйте в существующем btnStart_Click.'],String.raw`private void btnStart_Click(object sender, EventArgs e)
{
    lblOutput.Text = "Добро пожаловать в программу учёта товаров!";
    btnStart.Text = "Готово";
}`, 'Замените тело существующего btnStart_Click командами из примера. Второй метод с тем же именем добавлять не нужно. Заголовок формы, шрифт и расположение элементов настройте в конструкторе через F4.'),
 example(['У новой кнопки задайте Name = btnReset, а Text = Сброс.','Сброс должен менять оба текста, не перезапуская приложение.'],String.raw`private void btnReset_Click(object sender, EventArgs e)
{
    lblOutput.Text = "Здесь появится результат";
    btnStart.Text = "Запустить";
}`)
],
2:[
 example(['Сначала прочитайте и очистите края обоих полей через Trim().','Проверка должна сработать, если пусто хотя бы одно поле.'],String.raw`string name = txtProductName.Text.Trim();
string manufacturer = txtManufacturer.Text.Trim();
if (string.IsNullOrWhiteSpace(name) ||
    string.IsNullOrWhiteSpace(manufacturer))
{
    lblOutput.Text = "Введите название и производителя";
    return;
}
lblOutput.Text = $"Товар: {name}; производитель: {manufacturer}";`),
 example(['Пишите очистку в обработчике новой кнопки btnClearProduct.','После очистки замените старую карточку приглашением ввести товар.'],String.raw`private void btnClearProduct_Click(object sender, EventArgs e)
{
    txtProductName.Clear();
    txtManufacturer.Clear();
    lblOutput.Text = "Введите новый товар";
}`)
],
3:[
 example(['Проверку названия поставьте до чтения остальных данных и вывода карточки.','return завершает обработчик сразу после сообщения об ошибке.'],String.raw`string name = txtProductName.Text.Trim();
if (string.IsNullOrWhiteSpace(name))
{
    lblOutput.Text = "Ошибка: укажите название товара";
    return;
}
// Далее — чтение цены, количества и вывод карточки.`),
 example(['bool хранит результат сравнения, а не текст в кавычках.','Для проверки 0 временно задайте Minimum = 0 у nudQuantity.'],String.raw`int quantity = (int)nudQuantity.Value;
bool isAvailable = quantity > 0;
lblOutput.Text = $"Заказано: {quantity}; доступен: {isAvailable}";`),
 example(['Остаток и количество в заказе — два разных числовых поля.','Сначала настройте nudStock: Minimum = 0 и Maximum = 10000.'],String.raw`int quantity = (int)nudQuantity.Value;
int stock = (int)nudStock.Value;
lblOutput.Text = $"Заказано: {quantity}; на складе: {stock}";`)
],
4:[
 example(['Сумма скидки — часть исходной стоимости, итог — стоимость после её вычитания.','Для вывода денег используйте N2.'],String.raw`decimal subtotal = nudPrice.Value * nudQuantity.Value;
decimal discountSum = subtotal * nudDiscount.Value / 100m;
decimal total = subtotal - discountSum;
lblDiscountSum.Text = $"{discountSum:N2} ₽";
lblTotal.Text = $"{total:N2} ₽";`),
 example(['Сначала измените исходное значение скидки.','PerformClick повторно вызывает действие уже настроенной кнопки расчёта.'],String.raw`// Обработчик кнопки «Без скидки»:
nudDiscount.Value = 0;
btnTotal.PerformClick();`),
 example(['Сравнивайте два результата при одинаковой цене и проценте скидки.','Количество 5 в 2,5 раза больше 2, поэтому итог меняется в том же отношении.'],String.raw`decimal price = 1000m;
decimal discount = 20m;
decimal totalForTwo = price * 2 * (100m - discount) / 100m;
decimal totalForFive = price * 5 * (100m - discount) / 100m;
lblTotal.Text = $"2 шт.: {totalForTwo:N2}; 5 шт.: {totalForFive:N2}; " +
    $"отношение: {totalForFive / totalForTwo}";`)
],
5:[
 example(['Количество из nudQuantity сравнивайте с остатком nudStock.','Эта проверка должна стоять до формулы итоговой цены.'],String.raw`int requested = (int)nudQuantity.Value;
int stock = (int)nudStock.Value;
if (requested > stock)
{
    MessageBox.Show("Недостаточно товара");
    return;
}
// Только после проверки выполняйте расчёт.`),
 example(['Добавьте «Сандалии» в Items списка.','В switch новая ветка должна иметь собственный break.'],String.raw`// При настройке формы, один раз:
cmbCategory.Items.Add("Сандалии");

// В обработчике:
string description;
switch (cmbCategory.Text)
{
    case "Сандалии":
        description = "Летняя обувь";
        break;
    default:
        description = "Другая категория";
        break;
}
lblStock.Text = description;`, 'В своём switch сохраните изученные ранее категории, добавив новую ветку. Здесь показан сокращённый пример.'),
 example(['Сначала исключите нулевой остаток и заказ сверх остатка.','Равенство проверяйте до общего сообщения о наличии.'],String.raw`int requested = (int)nudQuantity.Value;
int stock = (int)nudStock.Value;
if (stock == 0)
    lblStock.Text = "Нет на складе";
else if (requested > stock)
    lblStock.Text = "Недостаточно товара";
else if (requested == stock)
    lblStock.Text = "После заказа запас закончится";
else
    lblStock.Text = "Товар в наличии";`)
],
6:[
 example(['Сначала проверьте название, затем переходите к артикулу.','Пробелы по краям не должны делать пустое название допустимым.'],String.raw`string name = txtProductName.Text.Trim();
if (string.IsNullOrWhiteSpace(name))
{
    lblValidation.Text = "Введите название товара";
    return;
}
// Далее — проверка артикула и остатка.`),
 example(['Trim() убирает пробелы только по краям.','Contains(" ") обнаружит пробел внутри артикула.'],String.raw`string article = txtArticle.Text.Trim().ToUpperInvariant();
if (article.Contains(" "))
{
    lblValidation.Text = "Артикул не должен содержать пробелы";
    return;
}
// Далее — остальные проверки артикула.`),
 example(['Сначала преобразуйте текст через TryParse.','Присваивайте Value только после проверки всего допустимого диапазона.'],String.raw`if (!int.TryParse(txtStockInput.Text.Trim(), out int stock))
{
    lblValidation.Text = "Введите целый остаток";
    return;
}
if (stock < nudStock.Minimum || stock > nudStock.Maximum)
{
    lblValidation.Text = "Остаток вне допустимого диапазона";
    return;
}
nudStock.Value = stock;`)
],
7:[
 example(['В коллекции должно быть семь наименований.','Очищайте видимый список перед повторным заполнением.'],String.raw`List<string> products = new List<string>
{
    "Кроссовки", "Ботинки", "Туфли", "Сандалии",
    "Кеды", "Мокасины", "Сапоги"
};
lstProducts.Items.Clear();
foreach (string product in products)
    lstProducts.Items.Add(product);`),
 example(['Сумму и количество нулей накапливайте в разных переменных.','Для заданного массива ожидание: сумма 31, нулевых значений 1.'],String.raw`int[] stocks = { 2, 8, 0, 12, 5, 1, 3 };
int total = 0;
int zeroCount = 0;
for (int i = 0; i < stocks.Length; i++)
{
    total += stocks[i];
    if (stocks[i] == 0) zeroCount++;
}
lblSummary.Text = $"Сумма: {total}; нулей: {zeroCount}";`),
 example(['Обе границы диапазона включены: >= 1 и <= 3.','Проверка должна выполняться для каждого элемента массива.'],String.raw`int[] stocks = { 2, 8, 0, 12, 5, 1, 3 };
int lowCount = 0;
for (int i = 0; i < stocks.Length; i++)
{
    if (stocks[i] >= 1 && stocks[i] <= 3)
        lowCount++;
}
lblSummary.Text = $"Остаток от 1 до 3: {lowCount}";`)
],
8:[example(['Получайте входные данные заново при каждом нажатии.','После отказа завершайте обработчик через return; расчёт поручите CalculateTotal.','Низкий остаток проверяется после мысленного вычитания requested из stock.'],String.raw`private void btnMakeOrder_Click(object sender, EventArgs e)
{
    string name = txtProductName.Text.Trim();
    decimal price = nudPrice.Value;
    int requested = (int)nudQuantity.Value;
    int stock = (int)nudStock.Value;
    if (string.IsNullOrWhiteSpace(name))
    {
        lblTotal.Text = "Укажите название товара";
        return;
    }
    if (price <= 0m)
    {
        lblTotal.Text = "Введите цену больше нуля";
        return;
    }
    if (requested > stock)
    {
        lblTotal.Text = "Недостаточно товара";
        return;
    }
    decimal subtotal = price * requested;
    decimal total = CalculateTotal(price, requested, nudDiscount.Value);
    lblTotal.Text = $"{name}: исходная сумма {subtotal:N2} ₽; " +
        $"итог {total:N2} ₽";
    if (stock - requested <= 3)
        lblTotal.Text += Environment.NewLine + "Низкий остаток";
}`, 'Пример обработчика использует метод CalculateTotal из лекции. У nudQuantity задайте Minimum = 1. Эта проверка заказа не списывает товар со склада: требование задания — проверить и показать результат.')],
9:[
 example(['Каждый вызов new создаёт отдельный объект.','Перенос строки в Label задайте через Environment.NewLine.'],String.raw`Product first = new Product();
first.Name = "Кроссовки";
first.Price = 4000m;
Product second = new Product();
second.Name = "Ботинки";
second.Price = 5200m;
lblCatalogResult.Text = $"{first.Name}: {first.Price:N2} ₽" +
    Environment.NewLine + $"{second.Name}: {second.Price:N2} ₽";`),
 example(['В Product.cs внутри класса Product добавьте свойство public int Stock { get; set; }.','Значения задаются отдельным объектам: не храните два разных остатка в одном объекте.'],String.raw`// В обработчике, где first и second уже созданы:
first.Stock = 2;
second.Stock = 7;
lblCatalogResult.Text = $"{first.Name}: {first.Price:N2} ₽; {first.Stock} шт." +
    Environment.NewLine +
    $"{second.Name}: {second.Price:N2} ₽; {second.Stock} шт.";`, 'Свойство Stock добавляется в класс Product, а показанный код — в обработчик формы после создания first и second. Замените прежний вывод карточки новым, чтобы он не перезаписывал результат.')
],
10:[
 example(['Передавайте начальные значения в конструктор.','Если добавляете Category из следующего задания, обновите и эти вызовы.'],String.raw`Product first = new Product("Кроссовки", "SportLine", 4000m, 2);
Product second = new Product("Ботинки", "NordStep", 5200m, 7);
Product third = new Product("Сандалии", "Sunny", 2500m, 4);
lblCatalogResult.Text = $"{first.Name}: {first.Price:N2} ₽" + Environment.NewLine +
    $"{second.Name}: {second.Price:N2} ₽" + Environment.NewLine +
    $"{third.Name}: {third.Price:N2} ₽";`, 'Это вариант до добавления пятого параметра Category. После задания Б передавайте категорию во всех трёх вызовах.'),
 example(['Свойство и параметр конструктора — разные вещи: category нужно записать в Category.','В этой работе category добавляется пятым аргументом.'],String.raw`public class Product
{
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string Category { get; set; }

    public Product(string name, string manufacturer, decimal price,
        int stock, string category)
    {
        Name = name;
        Manufacturer = manufacturer;
        Price = price;
        Stock = stock;
        Category = category;
    }
}
// После изменения конструктора, в обработчике формы:
// Product third = new Product("Сандалии", "Sunny", 2500m, 4, "Летняя");`, 'Замените текущий класс Product этой версией или внесите те же изменения в него. Не добавляйте второй класс Product с тем же именем.'),
 example(['Сравните число и порядок аргументов с объявлением конструктора.','Неправильный вызов нужен только для наблюдения ошибки; перед сдачей исправьте его.'],String.raw`// Ошибка после добавления пятого параметра:
// Product third = new Product("Сандалии", "Sunny", 2500m, 4);

// Исправленный вызов:
Product third = new Product("Сандалии", "Sunny", 2500m, 4, "Летняя");
// В tests.txt: name, manufacturer, price, stock, category.`)
],
11:[
 example(['Сначала сохраните остаток после отказа, затем выполняйте успешную продажу.','Нельзя менять Stock в форме: обращайтесь к TrySell.'],String.raw`Product boots = new Product("Ботинки", "NordStep", "Зимняя", 6000m, 2);
bool refused = boots.TrySell(3);
int afterRefusal = boots.Stock;
bool sold = boots.TrySell(1);
lblCatalogResult.Text = $"TrySell(3): {refused}; остаток {afterRefusal}" +
    Environment.NewLine + $"TrySell(1): {sold}; остаток {boots.Stock}";`, 'С работы №11 в базовой модели порядок аргументов: name, manufacturer, category, price, stock. Сверяйте сигнатуру своего Product.'),
 example(['Скидку рассчитывает метод объекта, форма только показывает результат.','IsLowStock() возвращает bool, его можно включить в итоговую строку.'],String.raw`// boots уже создан:
decimal discounted = boots.GetDiscountedPrice(10m);
lblCatalogResult.Text = $"Цена: {boots.Price:N2} ₽; " +
    $"со скидкой: {discounted:N2} ₽; остаток: {boots.Stock}; " +
    $"низкий остаток: {boots.IsLowStock()}";`),
 example(['Restock объявляется внутри Product, чтобы иметь доступ к Stock с private set.','Отказ должен оставлять объект без изменений.'],String.raw`// Внутри класса Product:
public bool Restock(int quantity)
{
    if (quantity <= 0) return false;
    Stock += quantity;
    return true;
}

// В обработчике после создания boots:
// bool added = boots.Restock(4);
// int afterAdd = boots.Stock;
// bool rejected = boots.Restock(-1);
// lblCatalogResult.Text = $"{added}: {afterAdd}; {rejected}: {boots.Stock}";`)
],
12:[
 example(['Добавляйте новые объекты в данные один раз, а не при каждом выводе.','Для этой версии Product категория передаётся третьим аргументом.'],String.raw`// В блоке первоначального заполнения _products:
_products.Add(new Product("Туфли", "CityWalk", "Классическая", 3100m, 3));
_products.Add(new Product("Кеды", "SportLine", "Спортивная", 2800m, 12));

// При выводе:
lstCatalog.Items.Clear();
foreach (Product item in _products)
    lstCatalog.Items.Add($"{item.Name}: {item.Stock} шт.");`),
 example(['Данные и видимый список очищаются по разным правилам.','Данные создайте один раз, а lstCatalog.Items очищайте перед каждым отображением.'],String.raw`// Если коллекция наполняется в обработчике:
if (_products.Count == 0)
{
    _products.Add(new Product("Кроссовки", "SportLine", "Спортивная", 4000m, 2));
    _products.Add(new Product("Ботинки", "NordStep", "Зимняя", 5200m, 7));
    _products.Add(new Product("Сандалии", "Sunny", "Летняя", 2500m, 4));
    _products.Add(new Product("Туфли", "CityWalk", "Классическая", 3100m, 3));
    _products.Add(new Product("Кеды", "SportLine", "Спортивная", 2800m, 12));
}
lstCatalog.Items.Clear();
foreach (Product item in _products)
    lstCatalog.Items.Add($"{item.Name}: {item.Stock} шт.");
lblCatalogSummary.Text = $"Позиций: {_products.Count}";`, 'Это тело обработчика загрузки вместо прежнего заполнения и вывода. Коллекция _products уже объявлена полем формы. Не добавляйте объекты повторно в другом месте: после первого нажатия коллекция содержит пять товаров, следующие нажатия только обновляют список.'),
 example(['Обнулите накопитель перед циклом.','Умножайте цену каждого товара на его остаток и прибавляйте произведение.'],String.raw`decimal inventoryValue = 0m;
foreach (Product item in _products)
    inventoryValue += item.Price * item.Stock;
lblCatalogSummary.Text = $"Стоимость остатков: {inventoryValue:N2} ₽";`)
],
13:[
 example(['Новую колонку поставьте до цены со скидкой.','Порядок значений Rows.Add должен повторять порядок колонок.'],String.raw`private void RefreshProductsTable()
{
    dgvProducts.Columns.Clear();
    dgvProducts.Rows.Clear();
    dgvProducts.AllowUserToAddRows = false;
    dgvProducts.Columns.Add("Name", "Товар");
    dgvProducts.Columns.Add("Manufacturer", "Производитель");
    dgvProducts.Columns.Add("Category", "Категория");
    dgvProducts.Columns.Add("OriginalPrice", "Начальная цена");
    dgvProducts.Columns.Add("DiscountPrice", "Цена со скидкой 25%");
    dgvProducts.Columns.Add("Stock", "Остаток");
    foreach (Product item in _products)
    {
        int index = dgvProducts.Rows.Add(item.Name, item.Manufacturer,
            item.Category, $"{item.Price:N2} ₽",
            $"{item.GetDiscountedPrice(25m):N2} ₽", item.Stock);
        DataGridViewRow row = dgvProducts.Rows[index];
        row.Tag = item;
        if (item.IsLowStock()) row.DefaultCellStyle.BackColor = Color.MistyRose;
    }
}`, 'Замените существующий RefreshProductsTable этой версией целиком, не создавая второй метод с тем же именем. Проверки окраски из следующих заданий добавляйте в её цикл после получения row.'),
 example(['Меняйте оформление строки, а не свойства товара.','Нулевой остаток должен иметь и розовый фон, и тёмно-красный текст.'],String.raw`// В цикле RefreshProductsTable, после получения index:
DataGridViewRow row = dgvProducts.Rows[index];
if (item.IsLowStock())
    row.DefaultCellStyle.BackColor = Color.MistyRose;
if (item.Stock == 0)
    row.DefaultCellStyle.ForeColor = Color.DarkRed;`, 'Если row уже объявлена в вашем цикле, повторно объявлять её не нужно — оставьте только проверки.'),
 example(['Свяжите SelectionChanged с обработчиком через значок молнии.','Tag строки должен хранить тот Product, из которого построена строка.'],String.raw`private void dgvProducts_SelectionChanged(object sender, EventArgs e)
{
    if (dgvProducts.CurrentRow?.Tag is Product selected)
        lblSelectedProduct.Text = $"Выбран товар: {selected.Name}";
    else
        lblSelectedProduct.Text = "Товар не выбран";
}`)
],
14:[
 example(['Статус заполняйте в карточке из полученного product.','Не берите для карточки фиксированный первый элемент коллекции.'],String.raw`// В ProductDetailsForm, где доступен переданный product:
if (product.IsLowStock())
    lblStatus.Text = "Низкий остаток";
else
    lblStatus.Text = "Достаточный остаток";`),
 example(['Обработчик должен принадлежать самой карточке товара.','Оставьте один понятный способ закрытия окна.'],String.raw`private void btnClose_Click(object sender, EventArgs e)
{
    Close();
}`),
 example(['Передавайте объект текущей строки, а не _products[0].','После каждого выбора открывайте карточку заново и сверяйте данные.'],String.raw`if (dgvProducts.CurrentRow?.Tag is not Product selected)
{
    MessageBox.Show("Выберите товар");
    return;
}
using ProductDetailsForm details = new ProductDetailsForm(selected);
details.ShowDialog(this);`)
],
15:[
 example(['Очищайте поля только после успешного добавления и обновления таблицы.','Для счётчика используйте _products.Count, а не число прежних строк.'],String.raw`// В успешной ветке после _products.Add(item) и RefreshProductsTable():
txtNewName.Clear();
txtNewManufacturer.Clear();
txtNewPrice.Clear();
txtNewStock.Clear();
lblAddStatus.Text = $"Товар добавлен. Позиций: {_products.Count}";`, 'Вставьте команды очистки в успешную ветку существующего обработчика после обновления таблицы и замените прежнее сообщение. Повторно вызывать _products.Add(item) не нужно: иначе товар добавится дважды.'),
 example(['Совпасть должны одновременно название и производитель.','Проверяйте дубликаты до создания и добавления нового Product.'],String.raw`// name и manufacturer уже прочитаны в начале обработчика через Trim().
foreach (Product existing in _products)
{
    if (string.Equals(existing.Name, name, StringComparison.OrdinalIgnoreCase) &&
        string.Equals(existing.Manufacturer, manufacturer,
            StringComparison.OrdinalIgnoreCase))
    {
        lblAddStatus.Text = "Такой товар этого производителя уже есть";
        return;
    }
}
// Далее — создание и добавление item.`, 'Вставьте этот foreach после проверок полей, перед try с созданием Product. Используйте уже объявленные name и manufacturer; повторно объявлять их в этом же обработчике не нужно.'),
 example(['Выбранный объект получите из Tag строки.','Таблицу обновляйте после успешного TrySell; отказ не должен уменьшать Stock.'],String.raw`private void btnSell_Click(object sender, EventArgs e)
{
    if (dgvProducts.CurrentRow?.Tag is not Product selected)
    {
        MessageBox.Show("Выберите товар");
        return;
    }
    int quantity = (int)nudSellQty.Value;
    if (!selected.TrySell(quantity))
    {
        MessageBox.Show("Нельзя выдать указанное количество");
        return;
    }
    RefreshProductsTable();
}`)
],
16:[
 example(['Price проверяется на положительность, Stock — на неотрицательность.','Изменение остатка выполняйте внутри объекта, после проверки допустимости количества.'],String.raw`public class Product
{
    public string Name { get; }
    public string Manufacturer { get; }
    public string Category { get; }
    public decimal Price { get; }
    public int Stock { get; private set; }

    public Product(string name, string manufacturer, string category,
        decimal price, int stock)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Укажите название");
        if (price <= 0m || stock < 0)
            throw new ArgumentException("Проверьте цену и остаток");
        Name = name.Trim(); Manufacturer = manufacturer.Trim();
        Category = category; Price = price; Stock = stock;
    }
    public decimal GetDiscountedPrice(decimal percent) =>
        decimal.Round(Price * (100m - percent) / 100m, 2,
            MidpointRounding.AwayFromZero);
    public bool IsLowStock() => Stock <= 3;
    public bool TrySell(int quantity)
    {
        if (quantity <= 0 || quantity > Stock) return false;
        Stock -= quantity;
        return true;
    }
}`, 'Пример модели для контрольной. Если Product уже есть, внесите изменения в существующий класс. Таблицу, карточку, добавление и выдачу подключите к этому же объекту по изученным примерам.'),
 example(['Скидка в этой работе равна 10%, а не 25%.','Каждая строка должна сохранять исходный объект в Tag.'],String.raw`// В цикле вывода уже созданной коллекции _products:
foreach (Product item in _products)
{
    int index = dgvProducts.Rows.Add(item.Name, item.Manufacturer,
        item.Category, $"{item.Price:N2}",
        $"{item.GetDiscountedPrice(10m):N2}", item.Stock);
    DataGridViewRow row = dgvProducts.Rows[index];
    row.Tag = item;
    if (item.Stock >= 0 && item.Stock <= 3)
        row.DefaultCellStyle.BackColor = Color.MistyRose;
}`, 'До цикла очистите таблицу и создайте шесть столбцов в порядке, указанном в задании.'),
 example(['При отказе данные объекта остаются прежними.','После успешной выдачи обновите таблицу, а карточку открывайте по актуальному объекту.'],String.raw`// В обработчике «Выдать со склада»:
if (dgvProducts.CurrentRow?.Tag is not Product selected)
{
    MessageBox.Show("Выберите товар");
    return;
}
int quantity = (int)nudSellQty.Value;
if (!selected.TrySell(quantity))
{
    MessageBox.Show("Недостаточно товара или неверное количество");
    return;
}
RefreshProductsTable();`, 'nudSellQty — пример имени числового поля выдачи. Используйте имя вашего элемента и свой метод обновления таблицы.')
]
};

export function taskHelp(id:number,taskText:string,ordinal:number):TaskHelp{
 const letter=taskText.match(/^(?:Задание\s+)?([АБВГ])\s*\(обяз/);
 const at=letter?'АБВГ'.indexOf(letter[1]):ordinal;
 const list=examples[id]||[];
 if(id===16){
  if(/Основные требования:|^1\. Техническое задание/.test(taskText))return list[0];
  if(/Выдать|выдач|актуальн.*остаток/i.test(taskText))return list[2];
  if(/таблиц|DataGridView|светло.красн|10%/.test(taskText))return list[1];
 }
 return list[Math.max(0,Math.min(at,list.length-1))]||example(
  ['Разбейте требование на чтение данных, проверку и действие.','Проверьте обычные значения и границы допустимого диапазона.'],
  '// Пример алгоритма:\n// 1. Прочитайте данные.\n// 2. При ошибке покажите сообщение и выполните return.\n// 3. Выполните действие и обновите результат.'
 );
}
