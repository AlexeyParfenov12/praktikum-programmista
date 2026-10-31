import type { HandbookEntry } from './handbook-types';

// Справочные примеры: эти строки показаны студенту и не выполняются сайтом.
export const extraEntries: HandbookEntry[] = [
  {
    "id": "extra-sql-select",
    "title": "SELECT — выбрать данные",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Возвращает нужные столбцы и вычисленные выражения из таблицы. Запрос чтения сам по себе не меняет хранящиеся строки.",
    "syntax": "SELECT столбцы FROM таблица;",
    "example": "SELECT name, price, stock\nFROM products;",
    "notes": "Примеры предполагают таблицу products с name, price и stock. Перечисленные столбцы делают результат понятнее, чем SELECT *.",
    "aliases": [
      "выборка",
      "прочитать таблицу",
      "select from"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-select.html",
    "lectureTokens": [
      "SQL SELECT — выбрать данные"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-where",
    "title": "WHERE — отфильтровать строки",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Оставляет в результате только строки, для которых условие истинно. Проверка выполняется до группировки и итоговых агрегатов.",
    "syntax": "SELECT ... FROM ... WHERE условие;",
    "example": "SELECT name, stock\nFROM products\nWHERE stock > 0;",
    "notes": "WHERE не сортирует данные. Для неизвестного значения NULL обычное сравнение не даёт true; проверяйте его через IS NULL.",
    "aliases": [
      "фильтр",
      "условие отбора"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-WHERE",
    "lectureTokens": [
      "SQL WHERE — отфильтровать строки"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-order-by",
    "title": "ORDER BY — сортировка",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Задаёт порядок строк результата по одному или нескольким выражениям. ASC означает возрастание, DESC — убывание.",
    "syntax": "ORDER BY выражение [ASC | DESC], ...",
    "example": "SELECT id, name, price\nFROM products\nORDER BY price DESC, id ASC;",
    "notes": "Без ORDER BY порядок строк не гарантируется. Второй уникальный ключ помогает получить устойчивый порядок при равной цене.",
    "aliases": [
      "сортировка",
      "asc",
      "desc"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-order.html",
    "lectureTokens": [
      "SQL ORDER BY — сортировка"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-limit-offset",
    "title": "LIMIT и OFFSET — часть результата",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "LIMIT ограничивает число возвращаемых строк, OFFSET пропускает указанное количество строк перед ними.",
    "syntax": "LIMIT количество OFFSET пропуск",
    "example": "SELECT id, name\nFROM products\nORDER BY id\nLIMIT 10 OFFSET 20;",
    "notes": "Для страниц нужен определённый ORDER BY. Большой OFFSET может быть дорогим: сервер всё равно обрабатывает пропускаемые строки.",
    "aliases": [
      "пагинация",
      "страницы результата"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-limit.html",
    "lectureTokens": [
      "SQL LIMIT и OFFSET — часть результата"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-distinct",
    "title": "DISTINCT — убрать дубликаты",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Удаляет из результата повторяющиеся сочетания всех выбранных столбцов.",
    "syntax": "SELECT DISTINCT столбцы FROM таблица;",
    "example": "SELECT DISTINCT category_id\nFROM products\nORDER BY category_id;",
    "notes": "DISTINCT относится ко всей строке результата. Для одного значения по каждой группе часто нужен GROUP BY или DISTINCT ON с осмысленной сортировкой.",
    "aliases": [
      "уникальные строки",
      "повторения"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-select.html#SQL-DISTINCT",
    "lectureTokens": [
      "SQL DISTINCT — убрать дубликаты"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-as",
    "title": "AS — псевдоним столбца или таблицы",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Задаёт удобное имя столбцу результата либо короткое имя таблице внутри запроса.",
    "syntax": "выражение AS псевдоним",
    "example": "SELECT p.name,\n       p.price * p.stock AS inventory_value\nFROM products AS p;",
    "notes": "Псевдоним столбца не переименовывает хранящийся столбец. В WHERE этого же уровня нельзя обращаться к псевдониму, вычисленному в SELECT.",
    "aliases": [
      "алиас",
      "псевдоним"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-select-lists.html",
    "lectureTokens": [
      "псевдоним в SQL",
      "SQL AS"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-logic",
    "title": "AND, OR, NOT в SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Соединяют условия либо отрицают их. AND требует истинности обеих частей, OR — хотя бы одной.",
    "syntax": "условие AND условие; NOT условие",
    "example": "SELECT name\nFROM products\nWHERE stock > 0 AND (price < 2000 OR category_id = 1);",
    "notes": "Скобки показывают порядок явно. SQL использует также неизвестный результат NULL; не переносите в него бездумно двухзначную логику C#.",
    "aliases": [
      "логические операции SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-logical.html",
    "lectureTokens": [
      "AND в SQL",
      "OR в SQL",
      "NOT в SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-comparison",
    "title": "Операторы сравнения SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Сравнивают значения в запросах: =, <>, <, >, <= и >=. Результат участвует в условиях отбора.",
    "syntax": "выражение оператор выражение",
    "example": "SELECT name, price\nFROM products\nWHERE price >= 1000 AND price <> 1500;",
    "notes": "В SQL одиночный = проверяет равенство; это отличается от присваивания в C#. Для NULL используйте IS NULL, а не = NULL.",
    "aliases": [
      "равно SQL",
      "не равно SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-comparison.html",
    "lectureTokens": [
      "операторы SQL",
      "сравнения SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-in",
    "title": "IN — одно из значений",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Проверяет, совпадает ли значение хотя бы с одним элементом списка или результатом подзапроса.",
    "syntax": "выражение IN (значение, ...)",
    "example": "SELECT name\nFROM products\nWHERE category_id IN (1, 3, 5);",
    "notes": "NULL внутри списка может сделать результат NOT IN неизвестным. При проверке отсутствия связанных строк полезно рассмотреть NOT EXISTS.",
    "aliases": [
      "список вариантов SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-subquery.html#FUNCTIONS-SUBQUERY-IN",
    "lectureTokens": [
      "IN в SQL",
      "SQL IN"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-between",
    "title": "BETWEEN — диапазон включительно",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Проверяет попадание значения между нижней и верхней границами, включая обе границы.",
    "syntax": "значение BETWEEN нижняя_граница AND верхняя_граница",
    "example": "SELECT name, price\nFROM products\nWHERE price BETWEEN 1000 AND 3000;",
    "notes": "Для времени диапазон целого дня часто удобнее задавать как >= начало и < начало следующего дня, чтобы не потерять дробные секунды.",
    "aliases": [
      "диапазон",
      "границы SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-comparison.html",
    "lectureTokens": [
      "SQL BETWEEN — диапазон включительно"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-like-ilike",
    "title": "LIKE и ILIKE — текстовый шаблон",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "LIKE сравнивает строку с SQL-шаблоном. ILIKE в PostgreSQL выполняет сопоставление без учёта регистра с учётом правил локали.",
    "syntax": "строка LIKE шаблон; строка ILIKE шаблон",
    "example": "SELECT name\nFROM products\nWHERE name ILIKE '%кроссов%';",
    "notes": "% заменяет любое число символов, _ — ровно один. Это шаблоны LIKE, а не синтаксис регулярных выражений.",
    "aliases": [
      "поиск по части названия",
      "без учёта регистра SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-LIKE",
    "lectureTokens": [
      "SQL LIKE и ILIKE — текстовый шаблон"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-is-null",
    "title": "IS NULL и IS NOT NULL",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Проверяют, отсутствует ли значение либо присутствует. NULL обозначает неизвестное или неуказанное значение.",
    "syntax": "столбец IS NULL; столбец IS NOT NULL",
    "example": "SELECT id, name\nFROM products\nWHERE category_id IS NULL;",
    "notes": "Выражение category_id = NULL не является корректной проверкой отсутствия: его результат неизвестен, и WHERE такую строку не пропускает.",
    "aliases": [
      "пустое значение SQL",
      "проверка null"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-comparison.html",
    "lectureTokens": [
      "IS NULL",
      "IS NOT NULL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-inner-join",
    "title": "INNER JOIN — связанные строки",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Объединяет строки двух источников, если условие ON истинно. Несовпавшие строки не входят в результат.",
    "syntax": "FROM a INNER JOIN b ON условие",
    "example": "SELECT p.name, c.name AS category\nFROM products AS p\nINNER JOIN categories AS c ON c.id = p.category_id;",
    "notes": "Если справа нашлось несколько совпадений, одна левая строка появится несколько раз. Проверяйте ключи и условие соединения.",
    "aliases": [
      "соединение таблиц",
      "join on"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN",
    "lectureTokens": [
      "SQL INNER JOIN — связанные строки"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-left-join",
    "title": "LEFT JOIN — сохранить левую таблицу",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Возвращает все строки левого источника. Если справа нет совпадения, правые столбцы заполняются NULL.",
    "syntax": "FROM a LEFT JOIN b ON условие",
    "example": "SELECT p.name, c.name AS category\nFROM products AS p\nLEFT JOIN categories AS c ON c.id = p.category_id;",
    "notes": "Условие на правую таблицу в WHERE может убрать строки с NULL и изменить смысл внешнего соединения. При необходимости переносите такое условие в ON.",
    "aliases": [
      "левое соединение",
      "не найденная категория"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN",
    "lectureTokens": [
      "SQL LEFT JOIN — сохранить левую таблицу"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-group-by",
    "title": "GROUP BY — группы строк",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Объединяет строки с одинаковыми значениями ключей, чтобы вычислить показатели для каждой группы.",
    "syntax": "GROUP BY ключи_группы",
    "example": "SELECT category_id, COUNT(*) AS products_count\nFROM products\nGROUP BY category_id;",
    "notes": "Обычные столбцы SELECT должны соответствовать группировке; остальные выражения обычно помещают в агрегатные функции.",
    "aliases": [
      "группировка",
      "по категориям"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP",
    "lectureTokens": [
      "SQL GROUP BY — группы строк"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-having",
    "title": "HAVING — фильтр групп",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Отбирает уже сформированные группы, в том числе по результатам COUNT, SUM и других агрегатов.",
    "syntax": "GROUP BY ... HAVING условие",
    "example": "SELECT category_id, COUNT(*) AS count\nFROM products\nGROUP BY category_id\nHAVING COUNT(*) >= 3;",
    "notes": "WHERE проверяет отдельные строки до группировки, HAVING — результат группировки. Не подменяйте ими друг друга.",
    "aliases": [
      "условие на агрегат",
      "фильтрация групп"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP",
    "lectureTokens": [
      "SQL HAVING — фильтр групп"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-union-all",
    "title": "UNION и UNION ALL",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Соединяют результаты совместимых запросов. UNION удаляет одинаковые строки, UNION ALL сохраняет их.",
    "syntax": "запрос UNION [ALL] запрос",
    "example": "SELECT name FROM current_products\nUNION ALL\nSELECT name FROM archived_products;",
    "notes": "В обоих SELECT должны совпадать число столбцов и совместимые типы. Порядок всего результата задают итоговым ORDER BY.",
    "aliases": [
      "объединить результаты"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/queries-union.html",
    "lectureTokens": [
      "SQL UNION и UNION ALL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-exists",
    "title": "EXISTS — есть ли строки",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Проверяет, возвращает ли подзапрос хотя бы одну строку. Удобен для проверки наличия связанной записи.",
    "syntax": "EXISTS (подзапрос)",
    "example": "SELECT c.id, c.name\nFROM categories AS c\nWHERE EXISTS (\n    SELECT 1 FROM products AS p WHERE p.category_id = c.id\n);",
    "notes": "Значения в SELECT подзапроса здесь не используются: важен сам факт наличия строки. NOT EXISTS проверяет отсутствие.",
    "aliases": [
      "наличие записи",
      "not exists"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-subquery.html#FUNCTIONS-SUBQUERY-EXISTS",
    "lectureTokens": [
      "SQL EXISTS — есть ли строки"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-insert",
    "title": "INSERT — добавить строки",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Создаёт новые строки в таблице. Явный список столбцов связывает каждое значение с нужным полем.",
    "syntax": "INSERT INTO таблица (столбцы) VALUES (значения);",
    "example": "INSERT INTO products (name, price, stock)\nVALUES ('Кеды', 2800.00, 12)\nRETURNING id;",
    "notes": "Пример изменяет данные. Значения должны проходить ограничения таблицы; автоматически генерируемый id обычно не передают вручную.",
    "aliases": [
      "добавление записи",
      "вставка"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-insert.html",
    "lectureTokens": [
      "SQL INSERT — добавить строки"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-update",
    "title": "UPDATE — изменить строки",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Меняет указанные столбцы у строк, прошедших WHERE.",
    "syntax": "UPDATE таблица SET столбец = значение WHERE условие;",
    "example": "UPDATE products\nSET price = 2900.00\nWHERE id = 7\nRETURNING id, name, price;",
    "notes": "Без WHERE изменятся все строки таблицы. Перед изменением проверьте ту же выборку через SELECT.",
    "aliases": [
      "обновление записи",
      "изменение цены"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-update.html",
    "lectureTokens": [
      "SQL UPDATE — изменить строки"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-delete",
    "title": "DELETE — удалить строки",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Удаляет строки таблицы, удовлетворяющие условию WHERE. Сама структура таблицы остаётся.",
    "syntax": "DELETE FROM таблица WHERE условие;",
    "example": "DELETE FROM products\nWHERE id = 7\nRETURNING id, name;",
    "notes": "Команда удаляет данные; без WHERE удалит все строки. Сначала проверьте SELECT с тем же условием и правила внешних ключей.",
    "aliases": [
      "удаление строки",
      "очистить запись"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-delete.html",
    "lectureTokens": [
      "SQL DELETE — удалить строки"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-returning",
    "title": "RETURNING — результат изменения",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Возвращает значения строк, которые затронул INSERT, UPDATE или DELETE, без отдельного запроса SELECT.",
    "syntax": "INSERT ... RETURNING столбцы;",
    "example": "INSERT INTO products (name, price, stock)\nVALUES ('Ботинки', 5200, 7)\nRETURNING id, name;",
    "notes": "При DELETE возвращаются значения удалённой строки. Если операция не затронула ни одной строки, результат также будет пустым.",
    "aliases": [
      "получить новый id",
      "возврат после insert"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/dml-returning.html",
    "lectureTokens": [
      "SQL RETURNING — результат изменения"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-create-table",
    "title": "CREATE TABLE — структура таблицы",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Создаёт таблицу, задавая имена столбцов, их типы и ограничения.",
    "syntax": "CREATE TABLE имя (столбец тип ограничения, ...);",
    "example": "CREATE TABLE products (\n    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    name text NOT NULL,\n    price numeric(12,2) NOT NULL CHECK (price > 0),\n    stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0)\n);",
    "notes": "Создание таблицы не добавляет в неё товары. В примере используются фиксированная денежная точность и ограничения допустимых значений.",
    "aliases": [
      "создание таблицы",
      "DDL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-createtable.html",
    "lectureTokens": [
      "SQL CREATE TABLE — структура таблицы"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-alter-table",
    "title": "ALTER TABLE — изменить структуру",
    "category": "SQL и PostgreSQL",
    "kind": "Конструкция SQL",
    "description": "Меняет уже существующую таблицу: добавляет столбцы и ограничения, переименовывает элементы либо изменяет их типы.",
    "syntax": "ALTER TABLE таблица ADD COLUMN столбец тип;",
    "example": "ALTER TABLE products\nADD COLUMN article text;",
    "notes": "ALTER может блокировать таблицу и затрагивать существующие данные. Удаление столбца через DROP COLUMN удалит и его значения.",
    "aliases": [
      "добавить столбец",
      "изменить схему"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/sql-altertable.html",
    "lectureTokens": [
      "SQL ALTER TABLE — изменить структуру"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-count",
    "title": "COUNT — число строк",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "COUNT(*) считает строки; COUNT(столбец) считает только строки с непустым значением этого столбца.",
    "syntax": "COUNT(*); COUNT(выражение)",
    "example": "SELECT COUNT(*) AS total,\n       COUNT(category_id) AS with_category\nFROM products;",
    "notes": "Пустая выборка даёт 0. После JOIN подсчитываются строки результата соединения.",
    "aliases": [
      "количество записей"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-aggregate.html",
    "lectureTokens": [
      "COUNT(*)",
      "SQL COUNT"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-sum",
    "title": "SUM — сумма значений",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Суммирует непустые значения выражения, например стоимость складских остатков.",
    "syntax": "SUM(выражение)",
    "example": "SELECT COALESCE(SUM(price * stock), 0) AS inventory_value\nFROM products;",
    "notes": "Для пустой выборки SUM даёт NULL; COALESCE позволяет вывести 0.",
    "aliases": [
      "суммарная стоимость SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/tutorial-agg.html",
    "lectureTokens": [
      "SQL SUM — сумма значений"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-avg",
    "title": "AVG — среднее значение",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Вычисляет среднее арифметическое непустых значений в группе.",
    "syntax": "AVG(выражение)",
    "example": "SELECT category_id, AVG(price) AS average_price\nFROM products\nGROUP BY category_id;",
    "notes": "NULL не считается нулём и не участвует в делителе. Для пустой группы результат NULL.",
    "aliases": [
      "средняя цена SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/tutorial-agg.html",
    "lectureTokens": [
      "SQL AVG — среднее значение"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-min-max",
    "title": "MIN и MAX — крайние значения",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Возвращают минимальное или максимальное непустое значение, а не всю строку с этим значением.",
    "syntax": "MIN(выражение); MAX(выражение)",
    "example": "SELECT MIN(price) AS cheapest,\n       MAX(price) AS most_expensive\nFROM products;",
    "notes": "Чтобы получить сам товар, можно отсортировать строки по цене и ограничить результат.",
    "aliases": [
      "минимум SQL",
      "максимум SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-aggregate.html",
    "lectureTokens": [
      "SQL MIN и MAX — крайние значения"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-coalesce",
    "title": "COALESCE — заменить NULL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Возвращает первый аргумент, который не равен NULL. Если все аргументы пусты, результат тоже NULL.",
    "syntax": "COALESCE(выражение, запасное_значение, ...)",
    "example": "SELECT name, COALESCE(article, 'Артикул не указан') AS article\nFROM products;",
    "notes": "Аргументы должны приводиться к совместимому типу. Пустая строка не равна NULL.",
    "aliases": [
      "значение по умолчанию для null"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL",
    "lectureTokens": [
      "SQL COALESCE — заменить NULL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-nullif",
    "title": "NULLIF — превратить совпадение в NULL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Возвращает NULL, когда два аргумента равны; иначе возвращает первый аргумент.",
    "syntax": "NULLIF(значение, значение_для_пустоты)",
    "example": "SELECT NULLIF(TRIM(article), '') AS normalized_article\nFROM products;",
    "notes": "Полезно при нормализации пустых строк. Это выражение запроса, оно само не изменяет сохранённый article.",
    "aliases": [
      "пустая строка в null"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-NULLIF",
    "lectureTokens": [
      "SQL NULLIF — превратить совпадение в NULL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-case",
    "title": "CASE — условное выражение SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Выбирает значение по первому истинному условию WHEN. Ветвление является частью выражения запроса.",
    "syntax": "CASE WHEN условие THEN значение ELSE значение END",
    "example": "SELECT name,\n       CASE WHEN stock = 0 THEN 'Нет'\n            WHEN stock <= 3 THEN 'Мало'\n            ELSE 'Достаточно' END AS stock_status\nFROM products;",
    "notes": "Без подходящей ветки и без ELSE результат NULL. Это SQL CASE, а не оператор switch из C#.",
    "aliases": [
      "условный вывод SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-CASE",
    "lectureTokens": [
      "CASE в SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-round",
    "title": "ROUND — округление в PostgreSQL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Округляет numeric до указанного числа знаков после десятичной точки.",
    "syntax": "ROUND(значение_numeric, число_знаков)",
    "example": "SELECT name, ROUND(price * 0.9, 2) AS discounted_price\nFROM products;",
    "notes": "Вариант с числом знаков рассчитан на numeric. Для double precision может понадобиться явное приведение ::numeric.",
    "aliases": [
      "округление SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-math.html",
    "lectureTokens": [
      "ROUND в PostgreSQL",
      "ROUND в SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-abs",
    "title": "ABS — модуль числа в SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Возвращает неотрицательную величину числа: расстояние от него до нуля.",
    "syntax": "ABS(число)",
    "example": "SELECT ABS(-12) AS distance;",
    "notes": "Отрицательный знак убирается, но тип остаётся важен: крайнее отрицательное целое значение может переполнить целый тип при вычислении модуля.",
    "aliases": [
      "модуль SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-math.html",
    "lectureTokens": [
      "ABS в PostgreSQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-lower-upper",
    "title": "LOWER и UPPER — регистр текста",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Преобразуют символы строки в нижний либо верхний регистр по правилам локали базы.",
    "syntax": "LOWER(строка); UPPER(строка)",
    "example": "SELECT LOWER(name) AS lower_name,\n       UPPER(name) AS upper_name\nFROM products;",
    "notes": "Для поиска без учёта регистра часто удобен ILIKE. Простое преобразование результата не изменяет сам столбец.",
    "aliases": [
      "строчные буквы SQL",
      "заглавные буквы SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-string.html",
    "lectureTokens": [
      "SQL LOWER и UPPER — регистр текста"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-trim",
    "title": "TRIM — края строки в SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Удаляет заданные символы с краёв строки; без уточнения удаляются пробелы с обеих сторон.",
    "syntax": "TRIM([BOTH | LEADING | TRAILING] [символы] FROM строка)",
    "example": "SELECT TRIM('  Кроссовки  ') AS name;",
    "notes": "TRIM не удаляет все пробелы внутри текста. Здесь SQL-функция; метод C# string.Trim() имеет отдельную статью.",
    "aliases": [
      "обрезать пробелы SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-string.html",
    "lectureTokens": [
      "TRIM в SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-length",
    "title": "LENGTH — число символов SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Возвращает количество символов текстовой строки, а не число байтов в её кодировке.",
    "syntax": "LENGTH(строка)",
    "example": "SELECT name, LENGTH(name) AS characters\nFROM products;",
    "notes": "Для длины в байтах есть octet_length. NULL даёт NULL.",
    "aliases": [
      "длина строки SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-string.html",
    "lectureTokens": [
      "SQL LENGTH — число символов SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-substring",
    "title": "SUBSTRING — часть текста",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Извлекает часть строки, начиная с указанной позиции. Позиции символов в этом варианте SQL считаются с 1.",
    "syntax": "SUBSTRING(строка FROM начало FOR длина)",
    "example": "SELECT SUBSTRING('Артикул AB12' FROM 9 FOR 4) AS article;",
    "notes": "Не переносите сюда нулевую индексацию C# Substring: в показанном SQL-синтаксисе первый символ имеет номер 1.",
    "aliases": [
      "подстрока SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-string.html",
    "lectureTokens": [
      "SQL SUBSTRING — часть текста"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-replace",
    "title": "REPLACE — замена в тексте SQL",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Заменяет все вхождения указанной подстроки другой строкой в возвращаемом результате.",
    "syntax": "REPLACE(строка, что_заменить, на_что)",
    "example": "SELECT REPLACE('AB-12-XY', '-', '') AS article;",
    "notes": "REPLACE сам не сохраняет новый текст в таблицу. Для изменения данных его используют в UPDATE.",
    "aliases": [
      "замена подстроки SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-string.html",
    "lectureTokens": [
      "REPLACE в SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-concat",
    "title": "CONCAT — соединить значения",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Соединяет текстовые представления аргументов; NULL-аргументы пропускаются.",
    "syntax": "CONCAT(значение, значение, ...)",
    "example": "SELECT CONCAT(name, ' — ', stock, ' шт.') AS caption\nFROM products;",
    "notes": "Оператор || тоже соединяет строки, но его поведение с NULL отличается: результат такого выражения может стать NULL.",
    "aliases": [
      "склеить строки SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-string.html",
    "lectureTokens": [
      "SQL CONCAT — соединить значения"
    ],
    "language": "sql"
  },
  {
    "id": "extra-sql-current-date",
    "title": "CURRENT_DATE и CURRENT_TIMESTAMP",
    "category": "SQL и PostgreSQL",
    "kind": "Функция SQL",
    "description": "Дают текущую дату либо дату и время начала текущей транзакции.",
    "syntax": "CURRENT_DATE; CURRENT_TIMESTAMP",
    "example": "SELECT CURRENT_DATE AS today,\n       CURRENT_TIMESTAMP AS transaction_time;",
    "notes": "CURRENT_TIMESTAMP не является постоянно тикающими часами внутри транзакции. Для фактического времени вызова есть clock_timestamp().",
    "aliases": [
      "текущая дата SQL",
      "время SQL"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-CURRENT",
    "lectureTokens": [
      "SQL CURRENT_DATE и CURRENT_TIMESTAMP"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-postgresql",
    "title": "PostgreSQL",
    "category": "Базы данных",
    "kind": "Понятие",
    "description": "Система управления реляционными базами данных. Хранит таблицы, выполняет SQL-запросы и контролирует целостность данных.",
    "syntax": "SELECT version();",
    "example": "SELECT version();",
    "notes": "PostgreSQL — сервер базы данных. Visual Studio, приложение WinForms и клиент для SQL подключаются к нему, но не заменяют сервер.",
    "aliases": [
      "СУБД",
      "Postgres"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/intro-whatis.html",
    "lectureTokens": [
      "PostgreSQL",
      "Postgres"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-table-row-column",
    "title": "Таблица, строка и столбец",
    "category": "Базы данных",
    "kind": "Понятие",
    "description": "Таблица описывает сущность, строка — одну запись, столбец — отдельное свойство записи. У каждого столбца есть тип данных.",
    "syntax": "CREATE TABLE имя (столбец тип, ...);",
    "example": "CREATE TABLE categories (\n    id integer PRIMARY KEY,\n    name text NOT NULL\n);\nSELECT id, name FROM categories;",
    "notes": "Порядок строк таблицы сам по себе не определён. Для нужного порядка результата используйте ORDER BY.",
    "aliases": [
      "запись",
      "поле",
      "реляционная таблица"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-basics.html",
    "lectureTokens": [
      "реляционная таблица",
      "таблица базы данных"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-primary-key",
    "title": "PRIMARY KEY",
    "category": "Базы данных",
    "kind": "Ограничение",
    "description": "Первичный ключ однозначно определяет строку таблицы. Не допускает повторяющихся значений и NULL в ключевых столбцах.",
    "syntax": "столбец тип PRIMARY KEY",
    "example": "CREATE TABLE categories (\n    id integer PRIMARY KEY,\n    name text NOT NULL\n);",
    "notes": "Первичный ключ может включать несколько столбцов. Случайный номер строки в таблице не является устойчивым идентификатором записи.",
    "aliases": [
      "первичный ключ",
      "PK"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-PRIMARY-KEYS",
    "lectureTokens": [
      "PRIMARY KEY",
      "первичный ключ"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-foreign-key",
    "title": "FOREIGN KEY / REFERENCES",
    "category": "Базы данных",
    "kind": "Ограничение",
    "description": "Внешний ключ связывает таблицы и не позволяет сослаться на отсутствующую запись в другой таблице.",
    "syntax": "столбец тип REFERENCES таблица(ключ)",
    "example": "CREATE TABLE products (\n    id integer PRIMARY KEY,\n    name text NOT NULL,\n    category_id integer REFERENCES categories(id)\n);",
    "notes": "Сначала должна существовать categories с подходящим уникальным ключом id. Внешний ключ допускает NULL, если отдельно не указать NOT NULL. Удаление родительской записи регулируется правилами связи.",
    "aliases": [
      "внешний ключ",
      "связь таблиц"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK",
    "lectureTokens": [
      "FOREIGN KEY",
      "REFERENCES categories",
      "внешний ключ"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-not-null",
    "title": "NOT NULL",
    "category": "Базы данных",
    "kind": "Ограничение",
    "description": "Требует, чтобы столбец имел значение в каждой строке. Используется для обязательных полей.",
    "syntax": "столбец тип NOT NULL",
    "example": "CREATE TABLE categories (\n    id integer PRIMARY KEY,\n    name text NOT NULL\n);",
    "notes": "NOT NULL запрещает отсутствие значения, но не запрещает пустую строку ''. Для запрета пустого названия добавьте CHECK.",
    "aliases": [
      "обязательное поле",
      "null в базе"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-NOT-NULL",
    "lectureTokens": [
      "NOT NULL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-unique",
    "title": "UNIQUE",
    "category": "Базы данных",
    "kind": "Ограничение",
    "description": "Запрещает повторяющиеся значения столбца или комбинации столбцов, например одинаковые артикулы товаров.",
    "syntax": "столбец тип UNIQUE",
    "example": "CREATE TABLE products (\n    id integer PRIMARY KEY,\n    article text NOT NULL UNIQUE\n);",
    "notes": "Обычное UNIQUE в PostgreSQL допускает несколько NULL. Если поле обязательно и должно быть уникальным, сочетайте NOT NULL и UNIQUE.",
    "aliases": [
      "уникальность",
      "уникальный артикул"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS",
    "lectureTokens": [
      "SQL UNIQUE",
      "ограничение UNIQUE"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-check",
    "title": "CHECK",
    "category": "Базы данных",
    "kind": "Ограничение",
    "description": "Проверяет условие для записываемой строки. Подходит для положительной цены, диапазона скидки и других правил данных.",
    "syntax": "CHECK (условие)",
    "example": "CREATE TABLE products (\n    id integer PRIMARY KEY,\n    price numeric(12,2) NOT NULL CHECK (price > 0),\n    discount integer NOT NULL CHECK (discount BETWEEN 0 AND 100)\n);",
    "notes": "CHECK считает допустимым и результат NULL. Поэтому для обязательной цены нужны оба ограничения: NOT NULL и CHECK. Условие не должно проверять другие строки таблицы.",
    "aliases": [
      "проверка значения",
      "ограничение диапазона"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS",
    "lectureTokens": [
      "SQL CHECK",
      "ограничение CHECK"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-default",
    "title": "DEFAULT",
    "category": "Базы данных",
    "kind": "Ограничение",
    "description": "Задаёт значение, которое база подставит при добавлении записи, если столбец пропущен или явно указано DEFAULT.",
    "syntax": "столбец тип DEFAULT выражение",
    "example": "CREATE TABLE products (\n    id integer PRIMARY KEY,\n    name text NOT NULL,\n    stock integer NOT NULL DEFAULT 0\n);\nINSERT INTO products (id, name) VALUES (1, 'Кеды');",
    "notes": "Явно переданный NULL не заменяется значением по умолчанию. В этом примере он будет отклонён ограничением NOT NULL.",
    "aliases": [
      "значение по умолчанию"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-default.html",
    "lectureTokens": [
      "SQL DEFAULT",
      "DEFAULT в SQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-identity",
    "title": "GENERATED AS IDENTITY",
    "category": "Базы данных",
    "kind": "Конструкция SQL",
    "description": "Просит PostgreSQL автоматически выдавать значения числового идентификатора при добавлении записей.",
    "syntax": "id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY",
    "example": "CREATE TABLE categories (\n    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n    name text NOT NULL\n);\nINSERT INTO categories (name) VALUES ('Кроссовки') RETURNING id;",
    "notes": "IDENTITY генерирует значения, а уникальность обеспечивает PRIMARY KEY или UNIQUE. Номера могут иметь пропуски; не используйте их как счётчик количества записей.",
    "aliases": [
      "автонумерация",
      "автоинкремент"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/ddl-identity-columns.html",
    "lectureTokens": [
      "GENERATED ALWAYS AS IDENTITY",
      "identity в PostgreSQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-numeric",
    "title": "numeric(p, s)",
    "category": "Базы данных",
    "kind": "Тип данных",
    "description": "Точный десятичный тип PostgreSQL. Удобен для цены, когда нужно хранить определённое количество знаков после запятой.",
    "syntax": "numeric(общее_число_цифр, знаков_после_запятой)",
    "example": "CREATE TABLE prices (\n    product_id integer PRIMARY KEY,\n    price numeric(12,2) NOT NULL CHECK (price >= 0)\n);\nINSERT INTO prices VALUES (1, 2599.90);",
    "notes": "numeric(12,2) оставляет до 10 цифр перед точкой и 2 после неё. Лишние дробные цифры округляются. В SQL десятичный разделитель — точка.",
    "aliases": [
      "decimal SQL",
      "денежная сумма в БД"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/datatype-numeric.html",
    "lectureTokens": [
      "numeric(12,2)",
      "тип numeric"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-text-varchar",
    "title": "text и varchar(n)",
    "category": "Базы данных",
    "kind": "Тип данных",
    "description": "Хранят строковые значения. text не задаёт ограничение длины, varchar(n) ограничивает строку n символами.",
    "syntax": "название text; артикул varchar(30)",
    "example": "CREATE TABLE products (\n    id integer PRIMARY KEY,\n    name text NOT NULL,\n    article varchar(30) NOT NULL UNIQUE\n);",
    "notes": "В PostgreSQL varchar(n) не даёт преимущества скорости перед text. Выбирайте ограничение длины по требованиям данных, а не ради предполагаемого ускорения.",
    "aliases": [
      "строковый тип SQL",
      "длина текста в БД"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/datatype-character.html",
    "lectureTokens": [
      "varchar(",
      "тип text PostgreSQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-date-timestamp",
    "title": "date, timestamp и timestamptz",
    "category": "Базы данных",
    "kind": "Тип данных",
    "description": "date хранит календарную дату, timestamp — дату и время без часового пояса, timestamptz — момент времени с учётом часового пояса при вводе и выводе.",
    "syntax": "date; timestamp; timestamp with time zone",
    "example": "CREATE TABLE orders (\n    id integer PRIMARY KEY,\n    delivery_date date,\n    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP\n);",
    "notes": "timestamptz не сохраняет исходное название часового пояса: вывод зависит от текущего часового пояса сеанса. Для момента создания заказа обычно подходит timestamptz, для дня доставки — date.",
    "aliases": [
      "дата в SQL",
      "время в базе"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/datatype-datetime.html",
    "lectureTokens": [
      "timestamptz",
      "timestamp with time zone"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-transaction",
    "title": "BEGIN, COMMIT и ROLLBACK",
    "category": "Базы данных",
    "kind": "Понятие",
    "description": "Транзакция объединяет операции в одно целое. COMMIT сохраняет её изменения, ROLLBACK отменяет незавершённые изменения.",
    "syntax": "BEGIN;\n-- операции\nCOMMIT; -- либо ROLLBACK;",
    "example": "BEGIN;\nSELECT id, name FROM products ORDER BY id;\nROLLBACK;",
    "notes": "Пример только читает данные. Если внутри транзакции выполняются INSERT, UPDATE или DELETE, COMMIT сделает изменения постоянными. После ошибки транзакции обычно нужен ROLLBACK.",
    "aliases": [
      "транзакция",
      "откат",
      "фиксация"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/tutorial-transactions.html",
    "lectureTokens": [
      "транзакция базы данных",
      "SQL COMMIT",
      "SQL ROLLBACK"
    ],
    "language": "sql"
  },
  {
    "id": "extra-db-index",
    "title": "CREATE INDEX",
    "category": "Базы данных",
    "kind": "Понятие",
    "description": "Создаёт дополнительную структуру для ускорения подходящих запросов: например поиска по артикулу или фильтра по категории.",
    "syntax": "CREATE INDEX имя ON таблица (столбец);",
    "example": "CREATE INDEX idx_products_category\nON products (category_id);\n\nSELECT id, name FROM products WHERE category_id = 2;",
    "notes": "Индекс занимает место и добавляет работу при изменении данных. PostgreSQL сам решает, применять ли его. Индекс не заменяет ORDER BY и не гарантирует порядок выдачи.",
    "aliases": [
      "индекс базы",
      "ускорение запроса"
    ],
    "docsUrl": "https://www.postgresql.org/docs/current/indexes-intro.html",
    "lectureTokens": [
      "CREATE INDEX",
      "индекс PostgreSQL"
    ],
    "language": "sql"
  },
  {
    "id": "extra-git-init",
    "title": "git init",
    "category": "Git",
    "kind": "Команда",
    "description": "Создаёт репозиторий Git в текущей папке, чтобы отслеживать историю проекта.",
    "syntax": "git init [-b имя_ветки]",
    "example": "git init -b main",
    "notes": "Команда не отправляет файлы на GitHub. Перед запуском перейдите в корень своего проекта, чтобы не создать репозиторий для лишних папок.",
    "aliases": [
      "новый репозиторий",
      "инициализация"
    ],
    "docsUrl": "https://git-scm.com/docs/git-init",
    "lectureTokens": [
      "git init"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-clone",
    "title": "git clone",
    "category": "Git",
    "kind": "Команда",
    "description": "Копирует удалённый репозиторий вместе с историей и настраивает источник origin.",
    "syntax": "git clone URL [папка]",
    "example": "git clone https://github.com/AlexeyParfenov12/praktikum-programmista.git",
    "notes": "Клонирование создаёт новую папку. Оно не устанавливает зависимости проекта и само по себе не запускает сайт или приложение.",
    "aliases": [
      "скачать репозиторий",
      "копия проекта"
    ],
    "docsUrl": "https://git-scm.com/docs/git-clone",
    "lectureTokens": [
      "git clone"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-status",
    "title": "git status",
    "category": "Git",
    "kind": "Команда",
    "description": "Показывает текущую ветку, изменённые файлы и файлы, подготовленные к следующему коммиту.",
    "syntax": "git status [--short]",
    "example": "git status --short",
    "notes": "Статус не меняет файлы. Проверьте его перед добавлением и коммитом, чтобы не включить временные файлы, пароли и лишние изменения.",
    "aliases": [
      "состояние репозитория",
      "изменённые файлы"
    ],
    "docsUrl": "https://git-scm.com/docs/git-status",
    "lectureTokens": [
      "git status"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-diff",
    "title": "git diff",
    "category": "Git",
    "kind": "Команда",
    "description": "Показывает изменения построчно. По умолчанию сравнивает рабочие файлы с подготовленной версией в индексе.",
    "syntax": "git diff [--staged] [-- файл]",
    "example": "git diff -- Form1.cs\ngit diff --staged",
    "notes": "После git add обычный git diff может быть пустым: подготовленные изменения смотрите через --staged. Двоичные изображения обычно нельзя сравнить как текст.",
    "aliases": [
      "разница версий",
      "сравнение кода"
    ],
    "docsUrl": "https://git-scm.com/docs/git-diff",
    "lectureTokens": [
      "git diff"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-add",
    "title": "git add",
    "category": "Git",
    "kind": "Команда",
    "description": "Подготавливает текущие изменения выбранного файла для следующего коммита.",
    "syntax": "git add -- путь_к_файлу",
    "example": "git add -- Form1.cs\ngit status --short",
    "notes": "Коммит сохранит подготовленную версию. Если после git add ещё раз изменить файл, новые правки нужно добавить отдельно. Проверяйте содержимое перед массовым git add .",
    "aliases": [
      "индекс",
      "подготовить коммит",
      "stage"
    ],
    "docsUrl": "https://git-scm.com/docs/git-add",
    "lectureTokens": [
      "git add"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-commit",
    "title": "git commit",
    "category": "Git",
    "kind": "Команда",
    "description": "Записывает подготовленные изменения в локальную историю с поясняющим сообщением.",
    "syntax": "git commit -m \"Сообщение\"",
    "example": "git commit -m \"Добавлена проверка цены товара\"",
    "notes": "В коммит попадают подготовленные через git add изменения. Команда не публикует их на GitHub: для этого используют git push.",
    "aliases": [
      "коммит",
      "сохранить историю"
    ],
    "docsUrl": "https://git-scm.com/docs/git-commit",
    "lectureTokens": [
      "git commit"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-log",
    "title": "git log",
    "category": "Git",
    "kind": "Команда",
    "description": "Показывает историю коммитов: идентификаторы, авторов и сообщения.",
    "syntax": "git log [--oneline] [-n количество]",
    "example": "git log --oneline -n 5",
    "notes": "Короткий идентификатор позволяет найти коммит в других командах. История зависит от выбранной ветки; для просмотра всех веток есть --all.",
    "aliases": [
      "история изменений",
      "список коммитов"
    ],
    "docsUrl": "https://git-scm.com/docs/git-log",
    "lectureTokens": [
      "git log"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-branch",
    "title": "git branch",
    "category": "Git",
    "kind": "Команда",
    "description": "Показывает, создаёт или удаляет ветки. Без параметров выводит список локальных веток.",
    "syntax": "git branch [--show-current]",
    "example": "git branch --show-current\ngit branch",
    "notes": "Звёздочка в списке обозначает текущую ветку. Создание ветки командой git branch имя само по себе на неё не переключает.",
    "aliases": [
      "ветка",
      "текущая ветка"
    ],
    "docsUrl": "https://git-scm.com/docs/git-branch",
    "lectureTokens": [
      "git branch"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-switch",
    "title": "git switch",
    "category": "Git",
    "kind": "Команда",
    "description": "Переключает ветку; параметр -c создаёт новую ветку и сразу открывает её.",
    "syntax": "git switch имя_ветки\ngit switch -c новая_ветка",
    "example": "git switch -c feature/catalog",
    "notes": "Git может отказать в переключении, если оно затрёт незакоммиченные изменения. Сначала сохраните нужные правки в истории или уберите их на хранение.",
    "aliases": [
      "переключить ветку",
      "новая ветка"
    ],
    "docsUrl": "https://git-scm.com/docs/git-switch",
    "lectureTokens": [
      "git switch"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-restore-staged",
    "title": "git restore --staged",
    "category": "Git",
    "kind": "Команда",
    "description": "Убирает файл из набора подготовленных изменений, сохраняя правки в рабочем файле.",
    "syntax": "git restore --staged -- путь_к_файлу",
    "example": "git restore --staged -- Form1.cs\ngit status --short",
    "notes": "Это отмена подготовки к коммиту. Рабочий файл не возвращается к старому содержимому. Команда предполагает, что в репозитории уже есть коммит.",
    "aliases": [
      "убрать из коммита",
      "unstage"
    ],
    "docsUrl": "https://git-scm.com/docs/git-restore",
    "lectureTokens": [
      "git restore --staged"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-restore",
    "title": "git restore",
    "category": "Git",
    "kind": "Команда",
    "description": "Восстанавливает содержимое рабочего файла из выбранной версии. Может удалить несохранённые в истории изменения.",
    "syntax": "git restore --source=версия -- файл",
    "example": "git restore --source=HEAD -- Form1.cs",
    "notes": "Пример заменит Form1.cs содержимым последнего коммита: локальные правки файла будут потеряны. Сначала сохраните нужную копию и проверьте git diff. Для снятия подготовки используйте --staged.",
    "aliases": [
      "отменить правки файла",
      "вернуть файл"
    ],
    "docsUrl": "https://git-scm.com/docs/git-restore",
    "lectureTokens": [
      "git restore"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-remote",
    "title": "git remote",
    "category": "Git",
    "kind": "Команда",
    "description": "Показывает и настраивает адреса удалённых репозиториев, например origin на GitHub.",
    "syntax": "git remote -v",
    "example": "git remote -v",
    "notes": "origin — обычное имя удалённого репозитория, а не специальный сервис. Проверяйте адрес перед отправкой изменений, особенно в копии чужого проекта.",
    "aliases": [
      "origin",
      "адрес GitHub"
    ],
    "docsUrl": "https://git-scm.com/docs/git-remote",
    "lectureTokens": [
      "git remote"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-fetch",
    "title": "git fetch",
    "category": "Git",
    "kind": "Команда",
    "description": "Загружает сведения и объекты из удалённого репозитория, обновляя ссылки вида origin/main.",
    "syntax": "git fetch [имя_источника]",
    "example": "git fetch origin\ngit log --oneline HEAD..origin/main",
    "notes": "fetch не объединяет загруженные изменения с вашей текущей веткой и не заменяет рабочие файлы. Это удобно для предварительного просмотра новых коммитов.",
    "aliases": [
      "получить изменения",
      "обновить origin"
    ],
    "docsUrl": "https://git-scm.com/docs/git-fetch",
    "lectureTokens": [
      "git fetch"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-pull",
    "title": "git pull --ff-only",
    "category": "Git",
    "kind": "Команда",
    "description": "Получает изменения и обновляет текущую ветку только если её можно просто передвинуть вперёд без слияния.",
    "syntax": "git pull --ff-only [источник] [ветка]",
    "example": "git pull --ff-only origin main",
    "notes": "Запускайте в нужной локальной ветке. Если обе стороны имеют разные новые коммиты, команда остановится: сначала разберите расхождение, не удаляя свои изменения.",
    "aliases": [
      "обновить проект",
      "fast-forward"
    ],
    "docsUrl": "https://git-scm.com/docs/git-pull",
    "lectureTokens": [
      "git pull --ff-only"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-push",
    "title": "git push",
    "category": "Git",
    "kind": "Команда",
    "description": "Отправляет локальные коммиты в удалённый репозиторий. Параметр -u связывает локальную и удалённую ветки.",
    "syntax": "git push [-u] источник ветка",
    "example": "git push -u origin main",
    "notes": "Команда меняет удалённый репозиторий. Проверьте адрес origin и содержимое коммитов. Если отправка отклонена из-за новых удалённых коммитов, сначала получите и объедините изменения.",
    "aliases": [
      "отправить на GitHub",
      "публикация коммитов"
    ],
    "docsUrl": "https://git-scm.com/docs/git-push",
    "lectureTokens": [
      "git push"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-merge",
    "title": "git merge",
    "category": "Git",
    "kind": "Команда",
    "description": "Объединяет указанную ветку с текущей. Может потребовать ручного разрешения конфликтов.",
    "syntax": "git merge ветка",
    "example": "git switch main\ngit merge feature/catalog",
    "notes": "Пример предполагает существование обеих веток. При конфликте исправьте участки с маркерами в файлах и завершите слияние. Не выбирайте чужую версию вслепую: проверьте итоговую работу приложения.",
    "aliases": [
      "слияние веток",
      "конфликт"
    ],
    "docsUrl": "https://git-scm.com/docs/git-merge",
    "lectureTokens": [
      "git merge"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-revert",
    "title": "git revert",
    "category": "Git",
    "kind": "Команда",
    "description": "Создаёт новый коммит, который отменяет изменения выбранного старого коммита, сохраняя историю.",
    "syntax": "git revert идентификатор_коммита",
    "example": "git revert HEAD",
    "notes": "Пример отменяет изменения последнего коммита в новом коммите. Операция может вызвать конфликт и обычно открывает редактор сообщения. Перед отменой проверьте git show HEAD.",
    "aliases": [
      "отмена коммита",
      "обратный коммит"
    ],
    "docsUrl": "https://git-scm.com/docs/git-revert",
    "lectureTokens": [
      "git revert"
    ],
    "language": "bash"
  },
  {
    "id": "extra-git-ignore",
    "title": ".gitignore",
    "category": "Git",
    "kind": "Файл настроек",
    "description": "Файл с правилами, какие неотслеживаемые файлы Git не должен предлагать для добавления.",
    "syntax": "Один шаблон пути на строку",
    "example": "bin/\nobj/\n.vs/\n*.user",
    "notes": "Правила не убирают из истории уже отслеживаемые файлы. Игнорирование файла с паролем не удаляет ранее опубликованный пароль: секрет нужно заменить отдельно.",
    "aliases": [
      "игнорировать файлы",
      "временные файлы"
    ],
    "docsUrl": "https://git-scm.com/docs/gitignore",
    "lectureTokens": [
      ".gitignore"
    ],
    "language": "text"
  },
  {
    "id": "extra-git-show",
    "title": "git show",
    "category": "Git",
    "kind": "Команда",
    "description": "Показывает конкретный объект истории, обычно содержимое коммита и внесённые изменения.",
    "syntax": "git show [версия] [-- файл]",
    "example": "git show --stat HEAD\ngit show HEAD -- Form1.cs",
    "notes": "--stat даёт краткую сводку по файлам. Без него для коммита обычно виден полный текст изменений. Команда только читает историю.",
    "aliases": [
      "просмотр коммита",
      "что изменено"
    ],
    "docsUrl": "https://git-scm.com/docs/git-show",
    "lectureTokens": [
      "git show"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-info",
    "title": "dotnet --info",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Показывает сведения об установленном .NET SDK, средах выполнения и платформе. Помогает проверить окружение перед созданием проекта.",
    "syntax": "dotnet --info\ndotnet --list-sdks",
    "example": "dotnet --info\ndotnet --list-sdks",
    "notes": "SDK нужен для создания и сборки проектов. Установленная среда выполнения позволяет запускать совместимые приложения, но не заменяет SDK.",
    "aliases": [
      "версия SDK",
      "установленные SDK"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet",
    "lectureTokens": [
      "dotnet --info"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-new-winforms",
    "title": "dotnet new winforms",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Создаёт новый проект Windows Forms на C# из шаблона .NET SDK.",
    "syntax": "dotnet new winforms -n ИмяПроекта",
    "example": "dotnet new winforms -n ShoeStoreTraining",
    "notes": "Пример создаёт папку проекта. Для запуска Windows Forms требуется Windows и подходящий .NET. Это проект современного .NET, а не старого .NET Framework.",
    "aliases": [
      "создать WinForms",
      "шаблон проекта"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates",
    "lectureTokens": [
      "dotnet new winforms"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-restore",
    "title": "dotnet restore",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Восстанавливает зависимости NuGet, перечисленные в проекте. Обычно выполняется автоматически во время сборки или запуска.",
    "syntax": "dotnet restore [путь_к_проекту]",
    "example": "dotnet restore ShoeStoreTraining/ShoeStoreTraining.csproj",
    "notes": "restore не исправляет ошибки C# и не запускает приложение. Для пакетов, которых ещё нет в локальном кеше, нужен доступ к настроенному источнику NuGet.",
    "aliases": [
      "восстановить пакеты",
      "NuGet зависимости"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-restore",
    "lectureTokens": [
      "dotnet restore"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-build",
    "title": "dotnet build",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Компилирует проект и зависимости, выводит ошибки и предупреждения сборки.",
    "syntax": "dotnet build [проект] [-c конфигурация]",
    "example": "dotnet build ShoeStoreTraining/ShoeStoreTraining.csproj -c Debug",
    "notes": "Успешная сборка означает, что компилятор смог собрать проект. Она не гарантирует правильность расчётов и поведения формы. При необходимости команда автоматически восстанавливает пакеты.",
    "aliases": [
      "сборка проекта",
      "компиляция"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build",
    "lectureTokens": [
      "dotnet build"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-run",
    "title": "dotnet run",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Собирает и запускает проект из исходного кода. Для выбора проекта используется --project.",
    "syntax": "dotnet run --project путь_к_проекту",
    "example": "dotnet run --project ShoeStoreTraining/ShoeStoreTraining.csproj",
    "notes": "Запускайте WinForms на Windows. --no-build пропускает сборку и может запустить старый результат, если после последней сборки исходный код менялся.",
    "aliases": [
      "запуск приложения",
      "запустить форму"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-run",
    "lectureTokens": [
      "dotnet run"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-test",
    "title": "dotnet test",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Собирает и выполняет автоматические тесты в тестовом проекте с поддерживаемым тестовым инструментом.",
    "syntax": "dotnet test [тестовый_проект]",
    "example": "dotnet test ShoeStoreTraining.Tests/ShoeStoreTraining.Tests.csproj",
    "notes": "Пример предполагает, что тестовый проект уже создан и настроен. Команда не проверяет интерфейс формы сама по себе: она выполняет только написанные тесты.",
    "aliases": [
      "модульные тесты",
      "запустить тесты"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-test",
    "lectureTokens": [
      "dotnet test"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-clean",
    "title": "dotnet clean",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Удаляет промежуточные и итоговые файлы предыдущей сборки указанного проекта и конфигурации.",
    "syntax": "dotnet clean [проект] [-c конфигурация]",
    "example": "dotnet clean ShoeStoreTraining/ShoeStoreTraining.csproj -c Debug",
    "notes": "Команда очищает результаты сборки, а не исходный код. Для очистки Release укажите -c Release. Следующая сборка заново создаст необходимые файлы.",
    "aliases": [
      "очистить сборку",
      "bin obj"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-clean",
    "lectureTokens": [
      "dotnet clean"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-publish",
    "title": "dotnet publish",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Готовит приложение и его зависимости в отдельной папке для передачи и установки.",
    "syntax": "dotnet publish проект -c Release -r платформа --self-contained false -o папка",
    "example": "dotnet publish ShoeStoreTraining/ShoeStoreTraining.csproj -c Release -r win-x64 --self-contained false -o publish/win-x64",
    "notes": "Здесь выбран Windows x64 и публикация без встроенной среды выполнения: на компьютере студента потребуется совместимый .NET Desktop Runtime. Передавайте всю папку результата, а не один exe.",
    "aliases": [
      "публикация приложения",
      "папка для передачи"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-publish",
    "lectureTokens": [
      "dotnet publish"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-package-add",
    "title": "dotnet package add",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Добавляет зависимость NuGet в проект и восстанавливает пакеты. В .NET 10 доступен порядок слов package add.",
    "syntax": "dotnet package add ИмяПакета --project проект\n# Для .NET 9 и ранее:\ndotnet add проект package ИмяПакета",
    "example": "dotnet package add Npgsql --project ShoeStoreTraining/ShoeStoreTraining.csproj",
    "notes": "Для .NET 9 и более ранних SDK используйте dotnet add ShoeStoreTraining/ShoeStoreTraining.csproj package Npgsql. Проверьте совместимость пакета с целевой версией .NET; для повторяемой сборки задавайте согласованную версию через --version.",
    "aliases": [
      "добавить пакет",
      "NuGet",
      "dotnet add package"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-add",
    "lectureTokens": [
      "dotnet package add",
      "dotnet add package"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-reference-add",
    "title": "dotnet reference add",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Добавляет ссылку одного проекта на другой, чтобы приложение могло использовать его открытые классы.",
    "syntax": "dotnet reference add библиотека.csproj --project приложение.csproj\n# Для .NET 9 и ранее:\ndotnet add приложение.csproj reference библиотека.csproj",
    "example": "dotnet reference add Store.Core/Store.Core.csproj --project ShoeStoreTraining/ShoeStoreTraining.csproj",
    "notes": "Оба проекта должны существовать и иметь совместимые целевые платформы. Это ссылка на проект, а не установка пакета NuGet. Порядок reference add введён в .NET 10.",
    "aliases": [
      "ссылка на проект",
      "библиотека классов",
      "dotnet add reference"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-reference-add",
    "lectureTokens": [
      "dotnet reference add",
      "dotnet add reference"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-sln",
    "title": "dotnet sln",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Управляет списком проектов в решении .sln или .slnx. Решение объединяет связанные проекты для работы и сборки.",
    "syntax": "dotnet sln [решение] list\ndotnet sln [решение] add проект",
    "example": "dotnet sln list\ndotnet sln add ShoeStoreTraining/ShoeStoreTraining.csproj",
    "notes": "Запускайте из папки с одним решением или укажите его путь. Добавление в решение не создаёт зависимость между проектами: для этого нужна ссылка на проект.",
    "aliases": [
      "решение",
      "slnx",
      "добавить в solution"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-sln",
    "lectureTokens": [
      "dotnet sln"
    ],
    "language": "bash"
  },
  {
    "id": "extra-dotnet-format",
    "title": "dotnet format",
    "category": "Команды .NET",
    "kind": "Команда",
    "description": "Проверяет или исправляет оформление и стиль кода согласно настройкам проекта и .editorconfig.",
    "syntax": "dotnet format [проект] [--verify-no-changes]",
    "example": "dotnet format ShoeStoreTraining/ShoeStoreTraining.csproj --verify-no-changes",
    "notes": "С --verify-no-changes исходные файлы не исправляются; ненулевой код завершения означает, что нужны изменения оформления. Без этого параметра команда может переписать файлы. Проверка стиля не заменяет тесты.",
    "aliases": [
      "форматирование кода",
      "EditorConfig"
    ],
    "docsUrl": "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format",
    "lectureTokens": [
      "dotnet format"
    ],
    "language": "bash"
  }
];
