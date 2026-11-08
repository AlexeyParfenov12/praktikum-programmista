/* Наглядные образцы для учебных вариантов 39–48.
   Образец письма соответствует приложению «Образец Слияние_ОЗ.pdf» КИМ-2027.
   Журнал, оценки и списки студентов не затрагиваются. */
(function(){
'use strict';
const data=window.DE_VARIANTS;
if(!Array.isArray(data)) return;
const mailMarker='<h3>Шаблон письма — расположение и текст как в «Образец Слияние_ОЗ.pdf»</h3>';
const sliderMarker='<h3>МОДУЛЬ 2 · ПУНКТ 5. Мобильный слайдер</h3>';
const sampleLetter=String.raw`<h3>Шаблон уведомления для слияния — как в оригинальном образце КИМ-2027</h3>
<div class="kim-letter" aria-label="Официальный макет письма из образца КИМ-2027">
  <div class="kim-letter-header">
    <div class="kim-letter-sender">
      Санкт-Петербургский<br>государственный университет<br>телекоммуникаций им. проф.<br>М.А. Бонч-Бруевича «СПбГУТ»<br>
      наб. реки Мойки, д. 61 ЛИТЕР А,<br>Санкт-Петербург, 191186<br>
      тел. (812) 326-31-63, факс: (812) 326-31-59<br>
      р/сч 40501810300002000001 «Сбербанк»<br>
      ОКТМО 40909000000<br>
      ОКПО 01179934 ОГРН 1027809197635<br>
      ИНН/КПП 7808004760/784001001<br>
      15.11.21 № 15-02/21<br>
      На №________ от __________
    </div>
    <div class="kim-letter-recipient">
      «Должность»<br>«Организация»<br>«Инициалы_Фамилия»<br>«Адрес_1»
    </div>
  </div>
  <div class="kim-letter-subject">Об участии в конференции</div>
  <div class="kim-letter-greeting">«Обращение» <span class="kim-letter-underline">«Имя» «Отчество»</span>!</div>
  <div class="kim-letter-hint">(в оригинале: Уважаемый _________! — имя и отчество получателя)</div>
  <p>Предлагаем Вам принять участие в конференции.</p>
  <p>Надеемся на ваше согласие в ближайшее время.</p>
  <p class="kim-letter-signoff">С уважением,</p>
  <p class="kim-letter-signature">Директор&nbsp;&nbsp;&nbsp;&nbsp;Н.А. Чистова</p>
</div>
<p class="kim-demo-tip"><strong>Важно:</strong> шапка, тема и текст повторяют макет образца КИМ. Поля в кавычках вставляют средствами Word: «Рассылки» → «Вставить поле слияния».</p>`;
const sliderExample=String.raw`<figure class="slider-example-figure">
  <img src="slider-example.svg?v=20261108-3" alt="Учебный образец мобильного слайдера: три изображения 120 на 90 пикселей, закруглённые углы 10 пикселей и стрелки слева и справа" loading="eager">
  <figcaption><strong>Учебный пример слайдера.</strong> На демонстрационном экзамене этот образец не предоставляется. Студент самостоятельно подбирает изображения и создаёт собственный макет.</figcaption>
</figure>`;
let updated=0;
for(const variant of data){
  if(variant.number<39||variant.number>48||typeof variant.html!=='string')continue;
  let html=variant.html;
  const m=html.indexOf(mailMarker);
  if(m!==-1){
    const end=html.indexOf('</table></div>',m+mailMarker.length);
    if(end!==-1) html=html.slice(0,m)+sampleLetter+html.slice(end+'</table></div>'.length);
  }
  if(!html.includes('slider-example-figure')&&html.includes(sliderMarker)){
    html=html.replace(sliderMarker,sliderMarker+'\n'+sliderExample);
  }
  variant.html=html; updated++;
}
window.DE_KIM_VISUALS_2027={variantCount:updated,version:'2026-11-08.3'};
})();