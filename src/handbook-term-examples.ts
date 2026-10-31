export const termExamples: Record<string, { example: string; language: 'csharp' | 'text'; notes?: string }> = {
  "Валидация": {
    "example": "string name = txtProductName.Text.Trim();\nif (string.IsNullOrWhiteSpace(name))\n{\n    MessageBox.Show(\"Введите название товара\");\n    return;\n}\n// Дальнейшая обработка выполняется после проверки.",
    "language": "csharp",
    "notes": "Фрагмент обработчика кнопки. На форме должен существовать TextBox с именем txtProductName. При ошибке ввод сохраняется, метод завершается."
  },
  "Выбранный объект": {
    "example": "if (dgvProducts.CurrentRow?.Tag is Product selected)\n{\n    lblDetails.Text = selected.Name;\n}",
    "language": "csharp",
    "notes": "В лекции ссылка на исходный Product хранится в Tag строки таблицы: row.Tag = product. dgvProducts и lblDetails — элементы формы. selected ссылается на тот же объект, а не на заново созданный товар."
  },
  "Итого": {
    "example": "decimal price = 1000m;\nint quantity = 2;\ndecimal discountPercent = 20m;\ndecimal subtotal = price * quantity;\ndecimal total = subtotal - subtotal * discountPercent / 100m;\n// total == 1600m",
    "language": "csharp",
    "notes": "Небольшой пример формулы, а не весь обработчик. В приложении сначала проверьте допустимость цены, количества, скидки и наличие товара."
  },
  "Каталог": {
    "example": "dgvProducts.Rows.Clear();\nforeach (Product product in _products)\n{\n    int rowIndex = dgvProducts.Rows.Add(product.Name);\n    dgvProducts.Rows[rowIndex].Tag = product;\n}",
    "language": "csharp",
    "notes": "Краткий пример обновления каталога в стиле лекций: _products — существующий список Product, а dgvProducts — таблица без DataSource с заранее созданным столбцом названия. Tag связывает строку с исходным объектом. В полной работе добавьте остальные столбцы по заданию."
  },
  "Категория": {
    "example": "string category = \"Кроссовки\";\nbool isSneakers = string.Equals(\n    category, \"кроссовки\", StringComparison.OrdinalIgnoreCase);\n// isSneakers == true",
    "language": "csharp",
    "notes": "Пример сравнения категории без учёта регистра. В интерфейсе список допустимых категорий удобно задавать через ComboBox; строковое сравнение не исправляет опечатки."
  },
  "Конструктор формы": {
    "example": "public ProductDetailsForm(Product product)\n{\n    InitializeComponent();\n    lblDetails.Text = product.Name;\n}",
    "language": "csharp",
    "notes": "В лекции №14 имеется в виду C# конструктор окна: он получает выбранный Product и заполняет форму после InitializeComponent(). Разместите его внутри класса ProductDetailsForm с созданным Label lblDetails. Это отличается от визуального редактора формы, который Visual Studio тоже называет конструктором."
  },
  "Контрольный сценарий": {
    "example": "Подготовка: остаток товара = 2.\nДействие: запросить выдачу 3 единиц.\nОжидается: отказ, остаток остаётся 2.\nФактически: [запишите результат после запуска].\nЗатем: заново откройте карточку и проверьте остаток.",
    "language": "text",
    "notes": "Проверяйте и сообщение интерфейса, и сохранённое состояние объекта. Фактический результат заполняют после выполнения проверки."
  },
  "Обработчик": {
    "example": "private void btnCalculate_Click(object sender, EventArgs e)\n{\n    lblTotal.Text = \"Кнопка нажата\";\n}",
    "language": "csharp",
    "notes": "Метод размещается внутри класса формы. Его нужно связать с событием Click кнопки btnCalculate через дизайнер или подписку; одно совпадение имени связь не создаёт. lblTotal — существующий Label."
  },
  "Переменная": {
    "example": "int quantity = 2;\ndecimal price = 1000m;\ndecimal subtotal = price * quantity;\nquantity = 3;\n// subtotal пока остаётся 2000m: выражение не пересчиталось само.",
    "language": "csharp",
    "notes": "Значение вычисляется в момент присваивания. Чтобы получить новую сумму после изменения количества, выполните subtotal = price * quantity ещё раз."
  },
  "Поле формы": {
    "example": "private decimal _lastTotal;\n\nprivate void SaveTotal(decimal total)\n{\n    _lastTotal = total;\n}",
    "language": "csharp",
    "notes": "Разместите поле и метод внутри класса формы, вне других методов. Поле принадлежит экземпляру формы и доступно её обработчикам; локальная переменная существует только в своей области."
  },
  "Приведение (int)": {
    "example": "decimal enteredQuantity = nudQuantity.Value;\nint quantity = (int)enteredQuantity;\n// Если Value равно 3m, quantity равно 3.",
    "language": "csharp",
    "notes": "nudQuantity — существующий NumericUpDown: его Value имеет тип decimal даже при целочисленном вводе. Приведение к int отбрасывает дробную часть, а не округляет; выход за диапазон int вызывает OverflowException. Для количества задайте целочисленный ввод и допустимые границы."
  },
  "Проверка заказа": {
    "example": "int requested = 4;\nint stock = 3;\nif (requested <= 0 || requested > stock)\n{\n    MessageBox.Show(\"Проверьте количество и остаток\");\n    return;\n}\n// Расчёт и изменение данных — только после успешных проверок.",
    "language": "csharp",
    "notes": "Фрагмент метода, возвращающего void. До него проверьте преобразование ввода и цену. Отклонённый заказ не должен менять остаток товара."
  },
  "Проверочный пример": {
    "example": "Вход: цена 1000 ₽, количество 2, скидка 20%.\nПромежуточно: стоимость до скидки 2000 ₽.\nСумма скидки: 400 ₽.\nОжидаемый итог: 1600 ₽.\nФактически: [заполнить после запуска].",
    "language": "text",
    "notes": "Сначала рассчитайте ожидаемый результат независимо от программы. Добавьте граничные случаи: скидка 0%, скидка 100%, недопустимое количество."
  },
  "Проект": {
    "example": "ShoeStoreTraining/\n  ShoeStoreTraining.csproj\n  Program.cs\n  Form1.cs\n  Form1.Designer.cs\n  Form1.resx\n  Product.cs",
    "language": "text",
    "notes": "Пример структуры исходников WinForms. Имена форм и наличие Product.cs зависят от работы. Для сдачи сохраняйте файлы проекта и дизайнера; одного exe недостаточно."
  },
  "Процент": {
    "example": "decimal amount = 2000m;\ndecimal percent = 20m;\ndecimal part = amount * percent / 100m;\n// part == 400m",
    "language": "csharp",
    "notes": "20% — это 20 из 100. Суффикс m задаёт decimal; выражение 20 / 100 с двумя int даст 0 из-за целочисленного деления."
  },
  "Регистр": {
    "example": "string first = \"Product\";\nstring second = \"product\";\nbool exact = first == second;\nbool sameIgnoringCase = string.Equals(\n    first, second, StringComparison.OrdinalIgnoreCase);\n// exact == false; sameIgnoringCase == true",
    "language": "csharp",
    "notes": "Для технических идентификаторов и сравнений без лингвистических правил часто подходит OrdinalIgnoreCase. Имена переменных C# остаются чувствительными к регистру."
  },
  "Стоимость до скидки": {
    "example": "decimal price = 1500m;\nint quantity = 3;\ndecimal subtotal = price * quantity;\n// subtotal == 4500m",
    "language": "csharp",
    "notes": "Это стоимость всех заказанных единиц до скидки, а не цена одной единицы. Скидку и итог вычисляйте отдельно после проверки исходных данных."
  },
  "Сумма скидки": {
    "example": "decimal subtotal = 4500m;\ndecimal discountPercent = 10m;\ndecimal discountAmount = subtotal * discountPercent / 100m;\ndecimal total = subtotal - discountAmount;\n// Скидка 450 ₽; к оплате 4050 ₽.",
    "language": "csharp",
    "notes": "Не вычитайте число 10 непосредственно из суммы: это 10 рублей, а не 10%. Допустимый процент и правило округления задаются требованиями работы."
  },
  "Техническое задание": {
    "example": "Требование: нельзя выдать товара больше остатка.\nПредусловие: на складе 2 единицы.\nПроверка: пользователь запрашивает 3.\nКритерий приёмки: сообщение об отказе, остаток = 2.\nПодтверждение: результат записан в tests.txt.",
    "language": "text",
    "notes": "Пример превращает одно требование в проверяемое условие. Он не заменяет полный список обязательных требований вашей контрольной работы."
  },
  "Элемент управления": {
    "example": "Button button = new Button();\nbutton.Name = \"btnExample\";\nbutton.Text = \"Пример\";\nbutton.Location = new Point(20, 20);\nControls.Add(button);",
    "language": "csharp",
    "notes": "Фрагмент метода формы после InitializeComponent(). Требуются System.Windows.Forms и System.Drawing. Если такая кнопка уже создана дизайнером, настраивайте её поля, а не добавляйте вторую."
  },
  "Breakpoint / точка останова": {
    "example": "decimal price = 1000m;\nint quantity = 2;\ndecimal total = price * quantity; // Поставьте точку останова здесь.\nMessageBox.Show(total.ToString());",
    "language": "csharp",
    "notes": "В обработчике формы поставьте курсор на строку расчёта и нажмите F9, затем запустите отладку F5. Остановка происходит до выполнения строки; F10 выполнит её, после чего можно проверить total."
  },
  "List<Product>": {
    "example": "List<Product> products = new List<Product>();\nproducts.Add(existingProduct);\nint count = products.Count;\nforeach (Product product in products)\n{\n    Console.WriteLine(product.Name);\n}",
    "language": "csharp",
    "notes": "Product — уже объявленный класс, existingProduct — ранее созданный объект с конструктором из вашей лекции. Пример показывает коллекцию; в WinForms вместо Console.WriteLine выводите данные в интерфейс. Для List<T> нужен System.Collections.Generic."
  },
  "Product.cs": {
    "example": "public class Product\n{\n    public string Name { get; set; } = \"\";\n}",
    "language": "csharp",
    "notes": "Минимальный отдельный пример содержимого файла, не замена класса из курса. В лекциях Product дополняется свойствами, проверками и конструктором; его набор аргументов нужно сверять с текущей работой."
  },
  "README_student.txt": {
    "example": "Работа: №16.\nРеализовано: [перечислите выполненные требования].\nНе завершено: [укажите оставшиеся пункты].\nМои методы: [два имени и назначение каждого].\nПочему Product: [объясните хранение состояния товара].\nЗапуск проекта: [версия .NET и имя файла проекта].",
    "language": "text",
    "notes": "Шаблон отчёта: замените поля своими фактическими сведениями. Он должен описывать вашу реализацию, включая нерешённые проблемы."
  },
  "tests.txt": {
    "example": "Тест: отказ при недостаточном остатке.\nВход: остаток 2, запрос 3.\nОжидается: отказ, остаток остаётся 2.\nПолучилось: [заполните после запуска].\nПовторная проверка карточки: [фактический остаток].\nВывод: [пройден / не пройден, пояснение].",
    "language": "text",
    "notes": "Записывайте наблюдаемые результаты, а не копируйте ожидание в графу «Получилось». Проверяйте повторное действие без перезапуска приложения, если это требуется заданием."
  },
  "try / catch": {
    "example": "try\n{\n    int quantity = int.Parse(\"abc\");\n}\ncatch (FormatException)\n{\n    MessageBox.Show(\"Введите целое число\");\n}",
    "language": "csharp",
    "notes": "Учебный фрагмент для обработчика формы: строка abc намеренно вызывает FormatException. Для обычной проверки пользовательского числа удобнее TryParse. catch должен соответствовать исключению; он не обрабатывает любую ошибку."
  },
  "TryParse": {
    "example": "if (!int.TryParse(txtQuantity.Text, out int quantity))\n{\n    MessageBox.Show(\"Введите целое число\");\n    return;\n}\n// Преобразование успешно; теперь проверьте quantity > 0.",
    "language": "csharp",
    "notes": "Фрагмент обработчика с TextBox txtQuantity. Успешное преобразование не означает допустимость значения для заказа: отрицательное число тоже разбирается. При false не используйте выходное значение для расчёта."
  }
};
