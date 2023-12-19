// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minweightInput = document.querySelector('.minweight__input'); // поле мин.веса для фильтрации
const maxweightInput = document.querySelector('.maxweight__input'); // поле макс.веса для фильтрации
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }; // функция проверки на соответствие числовому типу

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "малиновый", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// библиотека цветов
let values = ["белый" , "светло-желтый" , "желтый" , "золотой" , "розовый" , "светло-розовый" , "оранжевый" , "темно-оранжевый" , "коралловый" , "ярко-розовый" , "оранжево-красный" , "фуксия" , "пурпурный" , "красный" , "бежевый" , "хаки" , "фиолетовый" , "лавандовый" , "светло-голубой" , "сливовый" , "малиновый" , "бледно-фиолетовый" , "светло-серый" , "шоколадный" , "светло-коричневый" , "серебряный" , "кирпичный" , "зелено-желтый" , "светло-голубой" , "темно-серый" , "коричневый" , "желто-зеленый" , "бледно-зеленый" , "темно-фиолетовый" , "светло-зеленый" , "темно-зеленый" , "темная магента" , "темно-красный" , "светло-голубой" , "небесно-голубой" , "серый" , "оливковый" , "фиолетовый" , "бордовый" , "аквамариновый" , "серый сланец" , "темно-серый" , "васильковый" , "индиго" , "темно-синий" , "бирюзовый" , "лимонно-зеленый" , "морской зеленый" , "светло-зеленый" , "голубой" , "лаймовый" , "темно-синий" , "темно-голубой" , "зеленый" , "темно-зеленый" , "синий" , "темно-синий" , "флотский" , "черный" ];
let colors = ["white" , "lightyellow" , "yellow" , "gold" , "pink" , "lightpink" , "orange" , "darkorange" , "coral" , "hotpink" , "orangeRed" , "fuchsia" , "magenta" , "red" , "beige" , "khaki" , "violet" , "lavender" , "lightcyan" , "plum" , "crimson" , "palevioletred" , "lightgray" , "chocolate" , "peru" , "silver" , "firebrick" , "greenyellow" , "lightblue" , "darkgray" , "brown" , "yellowgreen" , "palegreen" , "darkviolet" , "lightgreen" , "darkseagreen" , "darkmagenta" , "darkred" , "lightskyblue" , "skyblue" , "gray" , "olive" , "purple" , "maroon" , "aquamarine" , "slategray" , "slateblue" , "cornflowerblue" , "indigo" , "darkslateblue" , "turquoise" , "limegreen" , "seagreen" , "lightseagreen" , "cyan" , "lime" , "deepskyblue" , "darkcyan" , "green" , "darkgreen" , "blue" , "darkblue" , "navy" , "black"];
let hexCods = ["#FFFFFF" , "#FFFFE0" , "#FFFF00" , "#FFD700" , "#FFC0CB" , "#FFB6C1" , "#FFA500" , "#FF8C00" , "#FF7F50" , "#FF69B4" , "#FF4500" , "#FF00FF" , "#FF00FF" , "#FF0000" , "#F5F5DC" , "#F0E68C" , "#EE82EE" , "#E6E6FA" , "#E0FFFF" , "#DDA0DD" , "#DC143C" , "#DB7093" , "#D3D3D3" , "#D2691E" , "#CD853F" , "#C0C0C0" , "#B22222" , "#ADFF2F" , "#ADD8E6" , "#A9A9A9" , "#A52A2A" , "#9ACD32" , "#98FB98" , "#9400D3" , "#90EE90" , "#8FBC8F" , "#8B008B" , "#8B0000" , "#87CEFA" , "#87CEEB" , "#808080" , "#808000" , "#800080" , "#800000" , "#7FFFD4" , "#708090" , "#6A5ACD" , "#6495ED" , "#4B0082" , "#483D8B" , "#40E0D0" , "#32CD32" , "#2E8B57" , "#20B2AA" , "#00FFFF" , "#00FF00" , "#00BFFF" , "#008B8B" , "#008000" , "#006400" , "#0000FF" , "#00008B" , "#000080" , "#000000"];
let colorName = values.map((value,index) => ({
    value, color : colors[index], hexCod : hexCods[index]
}));

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
  const display = () => {

  // TODO: очищаем fruitsList от вложенных элементов,
    fruitsList.innerHTML = '';

  // чтобы заполнить актуальными данными из fruits через цикл for
    for (let i = 0; i < fruits.length; i++) {
    const newLi = document.createElement('li');
    // поиск цвета
    //let index = colorName.color.indexOf(fruits[i].color);
    newLi.className = 'fruit__item fruit_green'; //+ colorName[index].value;
    newLi.innerHTML = "<div class = \" fruit__info \" > <div>index:" + (i+1) + "</div> <div>kind: " + fruits[i].kind + "</div> <div>color:" + fruits[i].color + "</div> <div>weight (кг):" + fruits[i].weight + "</div> </div>";
    fruitsList.appendChild(newLi);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const oldFruits = fruits;
  let randomEl;
  while (fruits.length > 0) {
    randomEl = fruits[getRandomInt(0,(fruits.length-1))];
    result.push(randomEl);
    fruits.splice(fruits.indexOf(randomEl),1);
  }
  
  if (oldFruits === result) {
    alert('Ошибка перемешивания. Попробуйте ещё раз.')
  }
  else {
      fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива

const filterFruits = () => {
  if (isNumber(minweightInput.value) && isNumber(maxweightInput.value)) {
  //fruits = JSON.parse(fruitsJSON);
  fruits = fruits
    .filter((item) => {
      return parseInt(minweightInput.value) < item.weight && item.weight< parseInt(maxweightInput.value);
    });
  }
  else { alert('Недопустимый формат для минимальной и максимальной границ!')}
    
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
const valuesColorArr = values.map((value,index)=>value); // создание массива упорядоченых значений цвета

  // функция сравнения двух элементов
const comparationColor = (a, b) => {
  valuesColorArr.indexOf(a.color) > valuesColorArr.indexOf(b.color);
};

//const sortAPI = {
//  bubbleSort() {
//    const n = fruits.length;
//    for (let i = 0; i < n-1; i++) { 
//        for (let j = 0; j < n-1-i; j++) { 
//            if (valuesColorArr.indexOf(fruits[j].color) > valuesColorArr.indexOf(fruits[j+1].color)) {
//                let temp = fruits[j+1]; 
//                fruits[j+1] = fruits[j]; 
//                fruits[j] = temp; 
//            }
//        }
//    }                    
//  },
  
//  
  // функция сортировки пузырьком
//  bubbleSort(arr, comparation) {
//    const n = arr.length;
//    // внешняя итерация по элементам
//    for (let i = 0; i < n-1; i++) { 
//        // внутренняя итерация для перестановки элемента в конец массива
//        for (let j = 0; j < n-1-i; j++) { 
//            // сравниваем элементы
//            if (comparation(arr[j], arr[j+1])) { 
//                // делаем обмен элементов
//                let temp = arr[j+1]; 
//                arr[j+1] = arr[j]; 
//                arr[j] = temp; 
//            }
//        }
//    }    
//  },

//  quickSort(arr, comparation) {
//    // TODO: допишите функцию быстрой сортировки
//  },

  // выполняет сортировку и производит замер времени
//  startSort(sort, arr, comparation) {
//    const start = new Date().getTime();
//    sort(arr, comparation);
//    const end = new Date().getTime();
//    sortTime = `${end - start} ms`;
//  },
//};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  sortKindLabel.textContent = sortKind; // вывести в sortTimeLabel значение 'sorting...'
//  const sort = sortAPI[2]//[sortKind];
//  sortAPI.startSort(sort, fruits, comparationColor);
        const start = new Date().getTime();
              const n = fruits.length;
              let temp;
              for (let indexСycle = 0; indexСycle < n-1; indexСycle++) { 
                  for (let index = 0; index < n-1-indexСycle; index++) { 
                      if (valuesColorArr.indexOf(fruits[index].color) > valuesColorArr.indexOf(fruits[index+1].color)) {
                          temp = fruits[index+1]; 
                          fruits[index+1] = fruits[index]; 
                          fruits[index] = temp; 
                      }
                  }
              }

        const end = new Date().getTime();
        sortTime = `${end - start} ms`;

  display();
  sortTimeLabel.textContent = sortTime; // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
