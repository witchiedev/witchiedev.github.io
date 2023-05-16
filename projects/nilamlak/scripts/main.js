// global variables
const cities = [
  'رشت',
  'بندر انزلی',
  'آستارا',
  'رودسر',
  'لنگرود',
  'رودبار',
  'لاهیجان',
  'سیاهکل',
  'شفت',
  'املش',
  'آستانه اشرفیه',
  'ماسال',
  'صومعه سرا',
  'رضوانشهر',
  'فومن',
  'خمام',
  'ماسوله',
  'لوشان',
  'گوراب زرمیخ',
  'لشت نسا',
  'اسالم',
  'منجیل',
  'ضیابر',
  'طاهر گوراب',
  'لیسار',
  'کوچصفهان',
  'آب کنار',
  'جواهردشت',
  'ساحل گیسوم',
  'بلور دکان',
  'قلعه رودخان',
  'امامزاده هاشم',
  'چمخاله',
  'شهربیجار'
];
// IIFEs
(function() {
  const checkbox = document.querySelector('.checkbox'),
        menu     = document.querySelector('.filter'),
        header   = document.querySelector('.header');
  checkbox.addEventListener('click', function(){
    checkbox.checked ? 
    menu.style.top = `${header.clientHeight}px`
    : menu.style.top = `calc(100% - 50px)`;
  })
})();

(function() {
  const filter_btn = document.querySelector('.filter-content-region-city'),
        popup = document.querySelector('.popup');
  let city_fragment = new DocumentFragment();
  filter_btn.addEventListener('click', function() {
    popup.textContent = '';
    let elements = [
      {
        element: document.createElement('div'),
        class: 'popup-cover',
        parent: true
      },
      {
        element: document.createElement('div'),
        class: 'popup-box',
        children: [
          {
            element: document.createElement('header'),
            class: 'popup-box-header',
            children: [
              {
                element: document.createElement('p'),
                content: 'شهر خود را انتخاب کنید',
              }
            ]
          },
          {
            element: document.createElement('section'),
            class: 'popup-box-content',
            children: [
              {
                element: document.createElement('ul'),
                class: 'popup-box-content-list',
                children: createItems()
              }
            ]
          },
          {
            element: document.createElement('footer'),
            class: 'popup-box-footer',
            children: [
              {
                element: document.createElement('p'),
                class: 'popup-box-footer-deny',
                content: 'انصراف'
              },
              {
                element: document.createElement('button'),
                class: 'popup-box-footer-accept',
                content: 'تایید'
              }
            ]
          }
        ],
        parent: true
      }
    ]
    function createItems() {
      let data = [];
      for( const city of cities ) {
        if(cities.indexOf(city) !== 0){
          data.push(
            {
              element: document.createElement('hr')
            }
          )
        }
        data.push(
          {
            element: document.createElement('li'),
            class: 'popup-box-content-list-item',
            children:  [
              {
                element: document.createElement('span'),
                class: 'popup-box-content-list-item-label',
                content: city
              },
              {
                element: document.createElement('input'),
                class: 'popup-box-content-list-item-checkbox',
                attributes: [
                  ['type', 'checkbox']
                ]
              }
            ]
          }
        )
      }
      return data;
    }
    function createNodes(childNodes, parent) {
      for( const child of childNodes ) {
        child.hasOwnProperty('class') ?
          child.element.className = child.class
        : null;
        child.hasOwnProperty('attributes') ?
          child.attributes.forEach( attribute => child.element.setAttribute( attribute[0], attribute[1] ))
        : null;
        child.hasOwnProperty('content') ? 
          child.element.textContent = child.content
        : null;
        !(child.hasOwnProperty('parent')) ?
          parent.appendChild(child.element)
        : null;
        console.log(child)
        child.hasOwnProperty('children') ?
          createNodes(child.children, child.element)
        : null;
      }
    }
    createNodes(elements, null);
    for( const element of elements ) {
      city_fragment.appendChild(element.element)
    }
    popup.appendChild(city_fragment)

    document.querySelector('.popup-box-footer-deny').addEventListener('click', ()=> popup.textContent = '');
    document.querySelector('.popup-box-footer-accept').addEventListener('click', ()=> {
      let checkboxes = document.querySelectorAll('.popup-box-content-list-item-checkbox');
      let str = '';
      let output = '';
      let counter = 0;
      for( const checkbox of checkboxes ) {
        if(checkbox.checked){
          str += checkbox.previousSibling.textContent + " -" + " " ;
          counter++;
        }
      }
      str = str.substring(0, str.length -2);
      if(counter > 1) {
        counter = counter.toString().replace(/\d/g, x => ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'][x]);
        output = counter + ' شهر';
      } else if(counter < 1){
        output = 'شهر';
      } else {
        output = str;
      }
      document.querySelector('.filter-content-region-city').textContent = output;
      document.querySelector('.filter-content-region-city').setAttribute('title', str);
      popup.textContent = '';
    });
  })
})();

function setInputFilter(textbox, inputFilter, errMsg) {
  [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
          this.classList.remove("input-error");
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      }
      else if (this.hasOwnProperty("oldValue")) {
        this.classList.add("input-error");
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
      else {
        this.value = "";
      }
    });
  });
}

const inputs = document.querySelectorAll('.input-number');

for( const input of inputs ) {
  input.addEventListener('input', () => {
    // setInputFilter(input, value => /^\d*\.?\d*$/.test(value), 'نوشتن حروف امکان پذیر نیست.');
    input.value = input.value.replaceAll(',', '').replace(/\B(?=([\u06F0-\u06F90-9][\u06F0-\u06F90-9][\u06F0-\u06F90-9])+(?![\u06F0-\u06F90-9]))/g, ',');
  });
}