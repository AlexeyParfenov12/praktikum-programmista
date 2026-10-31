import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createServer} from 'vite';
const output=path.resolve(process.argv[2]||'../student-projects');fs.mkdirSync(output,{recursive:true});
const server=await createServer({server:{middlewareMode:true,hmr:false},appType:'custom'});
const {documents}=await server.ssrLoadModule('/src/data.ts');await server.close();
const ps=d=>documents[d-1].paragraphs;
const snippet=(id,start)=>{const value=ps(id).find(p=>p.startsWith(start));if(!value)throw Error(`${id}: ${start}`);return value};
const appProject='<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>WinExe</OutputType><TargetFramework>net8.0-windows</TargetFramework><UseWindowsForms>true</UseWindowsForms><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup></Project>';
const basics=[[],['lblTitle','btnStart','lblOutput'],['txtProductName','txtManufacturer','btnShowProduct'],['nudPrice','nudQuantity','btnProductInfo'],['nudDiscount','btnTotal','lblTotal'],['nudStock','btnCheckStock','lblStock','cmbCategory','btnCategory'],['txtArticle','txtStockInput','btnValidate','lblValidation'],['lstProducts','btnLoadProducts','btnAnalyze','lblSummary']];
const labels={btnStart:'Запустить',btnShowProduct:'Показать товар',btnProductInfo:'Информация о товаре',btnTotal:'Рассчитать',btnCheckStock:'Проверить остаток',btnCategory:'Описание категории',btnValidate:'Проверить ввод',btnLoadProducts:'Загрузить список',btnAnalyze:'Анализ остатков',btnLoadCatalog:'Загрузить каталог',btnShowTable:'Показать таблицу',btnDetails:'Карточка товара',btnAddProduct:'Добавить товар',btnClose:'Закрыть',lblTitle:'Учебный проект',lblOutput:'Здесь появится результат'};
function form(folder,name,names,methods,handlers,constructor=''){
 const type=n=>n.startsWith('btn')?'Button':n.startsWith('txt')?'TextBox':n.startsWith('nud')?'NumericUpDown':n.startsWith('cmb')?'ComboBox':n.startsWith('lst')?'ListBox':n.startsWith('dgv')?'DataGridView':'Label';
 const q=s=>JSON.stringify(s);
 let init='SuspendLayout();\n';
 names.forEach((n,i)=>{const t=type(n);init+=`${n} = new ${t}();\n${n}.Name = ${q(n)};\n${n}.Location = new Point(${20+(i%2)*460}, ${20+Math.floor(i/2)*105});\n${n}.Size = new Size(430, ${t==='Label'?85:t==='ListBox'?80:t==='DataGridView'?180:35});\n`;
  if(t==='Button'||t==='Label')init+=`${n}.Text = ${q(labels[n]||n)};\n`;
  if(t==='NumericUpDown')init+=`${n}.Maximum = ${n==='nudDiscount'?100:100000};\n${n}.DecimalPlaces = ${n==='nudPrice'?2:0};\n`;
  if(t==='ComboBox')init+=`${n}.Items.AddRange(new object[] {"Кроссовки", "Ботинки", "Туфли"});\n`;
  if(t==='DataGridView')init+=`${n}.AllowUserToAddRows = false;\n${n}.ReadOnly = true;\n${n}.SelectionMode = DataGridViewSelectionMode.FullRowSelect;\n${n}.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;\n${n}.Size = new Size(890, 220);\n${n}.Location = new Point(20, ${20+Math.ceil(names.length/2)*105});\n`;
  if(handlers[n])init+=`${n}.Click += ${handlers[n]};\n`;init+=`Controls.Add(${n});\n`;
 });
 if(name==='ProductDetailsForm')init+='lblDetails.Size = new Size(850, 250);\nlblStatus.Text = "";\nlblStatus.Location = new Point(20,290);\nbtnClose.Location = new Point(20,400);\n';
 init+=`AutoScroll = true;\nClientSize = new Size(960, 700);\nText = "${name} — восстановительная база";\nResumeLayout(false);\n`;
 fs.writeFileSync(path.join(folder,name+'.Designer.cs'),`#nullable enable\nnamespace ShoeStoreTraining;\npartial class ${name}\n{\nprivate System.ComponentModel.IContainer? components = null;\nprotected override void Dispose(bool disposing) { if (disposing) components?.Dispose(); base.Dispose(disposing); }\nprivate void InitializeComponent()\n{\n${init}}\n${names.map(n=>`private ${type(n)} ${n} = null!;`).join('\n')}\n}`);
 fs.writeFileSync(path.join(folder,name+'.cs'),`namespace ShoeStoreTraining;\npublic partial class ${name} : Form\n{\npublic ${name}() { InitializeComponent(); ${constructor} }\n${methods}\n}`);
}
const handler=(name,body)=>`private void ${name}(object? sender, EventArgs e)\n{\n${body}\n}\n`;
function baseline(folder,stage){
 let names=[],methods='',handlers={};const add=(btn,body)=>{handlers[btn]=btn+'_Click';methods+=handler(btn+'_Click',body)};
 for(let i=1;i<=Math.min(stage,7);i++)names.push(...basics[i]);
 if(stage>=1)add('btnStart','lblOutput.Text = "Приложение работает!"; btnStart.Text = "Готово";');
 if(stage>=2)add('btnShowProduct',snippet(2,'string name = txtProductName.Text.Trim();'));
 if(stage>=3)add('btnProductInfo',snippet(3,'string name = txtProductName.Text.Trim();'));
 if(stage>=4)add('btnTotal',stage>=8?'decimal result = CalculateTotal(nudPrice.Value, (int)nudQuantity.Value, nudDiscount.Value); lblTotal.Text = $"К оплате: {result:N2} ₽";':snippet(4,'decimal price = nudPrice.Value;'));
 if(stage>=5){add('btnCheckStock',snippet(5,'int stock = (int)nudStock.Value;'));add('btnCategory',snippet(5,'string category = cmbCategory.Text;'));}
 if(stage>=6)add('btnValidate',snippet(6,'string article = txtArticle.Text.Trim().ToUpperInvariant();'));
 if(stage>=7){add('btnLoadProducts',snippet(7,'List<string> products = new List<string>'));add('btnAnalyze',snippet(7,'int[] stocks =')+'\n'+snippet(7,'int index = 0;'));}
 if(stage>=8)methods+=snippet(8,'private decimal CalculateTotal(')+'\n'+snippet(8,'private string GetStockStatus(');
 form(folder,'Form1',names,methods,handlers);
 if(stage<9)return;
 fs.writeFileSync(path.join(folder,'Product.cs'),snippet(Math.min(stage,11),'namespace ShoeStoreTraining;'));
 const cn=['btnShowProduct','lblCatalogResult'];let cm='',ch={};
 if(stage===9)cm=handler('btnShowProduct_Click',snippet(9,'Product first = new Product();'));
 if(stage===10)cm=handler('btnShowProduct_Click',snippet(10,'Product first = new Product("'));
 if(stage>=11)cm=handler('btnShowProduct_Click',snippet(11,'Product shoes = new Product('));
 ch.btnShowProduct='btnShowProduct_Click';
 if(stage>=12){cn.push('lstCatalog','btnLoadCatalog','lblCatalogSummary');cm+='\nprivate readonly List<Product> _products = new List<Product>();\n'+handler('btnLoadCatalog_Click',snippet(12,'if (_products.Count == 0)'));ch.btnLoadCatalog='btnLoadCatalog_Click';}
 if(stage>=13){cn.push('btnShowTable','dgvProducts','lblSelectedProduct');cm+='\n'+snippet(13,'private void RefreshProductsTable()')+'\n'+snippet(13,'private void btnShowTable_Click(');ch.btnShowTable='btnShowTable_Click';}
 if(stage>=14){cn.push('btnDetails');cm+='\n'+handler('btnDetails_Click',snippet(14,'if (dgvProducts.CurrentRow?.Tag'));ch.btnDetails='btnDetails_Click';form(folder,'ProductDetailsForm',['lblDetails','lblStatus','btnClose'],snippet(14,'public ProductDetailsForm(Product product)')+'\n'+handler('btnClose_Click','Close();'),{btnClose:'btnClose_Click'});}
 if(stage>=15){cn.push('txtNewName','txtNewManufacturer','txtNewPrice','txtNewStock','btnAddProduct','lblAddStatus');cm+='\n'+handler('btnAddProduct_Click',snippet(15,'string name = txtNewName.Text.Trim();'));ch.btnAddProduct='btnAddProduct_Click';}
 form(folder,'CatalogForm',cn,cm,ch);
}
fs.mkdirSync('public/downloads',{recursive:true});const manifest=[];
for(let lesson=1;lesson<=16;lesson++){
 const tag=String(lesson).padStart(2,'0');const root=path.join(output,'start-'+tag);const folder=path.join(root,'ShoeStoreTraining');fs.mkdirSync(folder,{recursive:true});
 fs.writeFileSync(path.join(folder,'ShoeStoreTraining.csproj'),appProject);baseline(folder,lesson-1);
 fs.writeFileSync(path.join(folder,'Program.cs'),`namespace ShoeStoreTraining;\ninternal static class Program { [STAThread] static void Main() { ApplicationConfiguration.Initialize(); Application.Run(new ${lesson>=10?'CatalogForm':'Form1'}()); } }`);
 const sln=`Microsoft Visual Studio Solution File, Format Version 12.00\n# Visual Studio Version 17\nProject("{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}") = "ShoeStoreTraining", "ShoeStoreTraining\\ShoeStoreTraining.csproj", "{56EE3A2F-95BF-4C25-A60C-B16151120E42}"\nEndProject\nGlobal\n GlobalSection(SolutionConfigurationPlatforms) = preSolution\n Debug|Any CPU = Debug|Any CPU\n Release|Any CPU = Release|Any CPU\n EndGlobalSection\n GlobalSection(ProjectConfigurationPlatforms) = postSolution\n {56EE3A2F-95BF-4C25-A60C-B16151120E42}.Debug|Any CPU.ActiveCfg = Debug|Any CPU\n {56EE3A2F-95BF-4C25-A60C-B16151120E42}.Debug|Any CPU.Build.0 = Debug|Any CPU\n {56EE3A2F-95BF-4C25-A60C-B16151120E42}.Release|Any CPU.ActiveCfg = Release|Any CPU\n {56EE3A2F-95BF-4C25-A60C-B16151120E42}.Release|Any CPU.Build.0 = Release|Any CPU\n EndGlobalSection\nEndGlobal\n`;
 fs.writeFileSync(path.join(root,'ShoeStoreTraining.sln'),sln);
 fs.writeFileSync(path.join(root,'НАЧАТЬ_ЗДЕСЬ.txt'),`БАЗА ДЛЯ НАЧАЛА ПРАКТИЧЕСКОЙ ${lesson}\n\n1. Распакуйте ZIP в новую папку. Не работайте внутри архива.\n2. Откройте ShoeStoreTraining.sln в Visual Studio с компонентом «Разработка классических приложений .NET» и SDK .NET 8 или совместимым новым SDK.\n3. Запустите через Ctrl+F5. Вернитесь в редактор и продолжайте лекцию ${lesson}.\n\nСостав: ${lesson===1?'пустая Form1. Создание проекта уже сделано; начните с размещения элементов.':'базовые примеры занятий 1–'+(lesson-1)+'.'}\n${lesson===9?'Form1 сохранена. Создайте CatalogForm и Product по лекции 9.':lesson>=10?'Для текущей работы открывайте CatalogForm.cs и Product.cs; Form1 сохранена отдельно.':'Для текущей работы открывайте Form1.cs → Конструктор / Просмотр кода.'}\n\nЭто восстановительная база, собранная по основным примерам лекций. Самостоятельные задания и личные изменения студента не включены. Расположение элементов упрощено и может отличаться от снимков; имена элементов и базовый код сохранены. Добавляйте новые поля и обработчики по текущей лекции, не создавайте повторно уже существующие. Данные живут в памяти и при закрытии приложения сбрасываются.\n`);
 const build=spawnSync('dotnet',['build',path.join(folder,'ShoeStoreTraining.csproj'),'-v:q','--nologo'],{encoding:'utf8'});if(build.status!==0)throw Error('Start '+lesson+'\n'+build.stdout+'\n'+build.stderr);
 // Package explicit source files only; build outputs and user settings never enter ZIP.
 const zip=path.resolve('public/downloads/start-'+tag+'.zip');const command=`$root='${root.replaceAll("'","''")}'; $files=@((Get-ChildItem -LiteralPath $root -File).FullName) + @((Get-ChildItem -LiteralPath '${folder.replaceAll("'","''")}' -File).FullName); Add-Type -AssemblyName System.IO.Compression.FileSystem; $archive=[System.IO.Compression.ZipFile]::Open('${zip.replaceAll("'","''")}','Create'); try { foreach($file in $files) { $rel=$file.Substring($root.Length+1).Replace('\\','/'); [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive,$file,$rel) | Out-Null } } finally { $archive.Dispose() }`;
 if(fs.existsSync(zip))fs.unlinkSync(zip);const packed=spawnSync('powershell',['-NoProfile','-Command',command],{encoding:'utf8'});if(packed.status!==0)throw Error(packed.stderr);
 manifest.push({lesson,file:'start-'+tag+'.zip',bytes:fs.statSync(zip).size,stage:lesson-1});console.log('Built and packaged start '+tag);
}
fs.writeFileSync('src/project-downloads.json',JSON.stringify(manifest,null,2)+'\n');
