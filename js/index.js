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
let colorsRu = ["белый" , "светло-желтый" , "желтый" , "золотой" , "розовый" , "светло-розовый" , "оранжевый" , "темно-оранжевый" , "коралловый" , "ярко-розовый" , "оранжево-красный" , "фуксия" , "пурпурный" , "красный" , "бежевый" , "хаки" , "фиолетовый" , "лавандовый" , "светло-голубой" , "сливовый" , "малиновый" , "бледно-фиолетовый" , "светло-серый" , "шоколадный" , "светло-коричневый" , "серебряный" , "кирпичный" , "зелено-желтый" , "светло-голубой" , "темно-серый" , "коричневый" , "желто-зеленый" , "бледно-зеленый" , "темно-фиолетовый" , "светло-зеленый" , "темно-зеленый" , "темная магента" , "темно-красный" , "светло-голубой" , "небесно-голубой" , "серый" , "оливковый" , "фиолетовый" , "бордовый" , "аквамариновый" , "серый сланец" , "темно-серый" , "васильковый" , "индиго" , "темно-синий" , "бирюзовый" , "лимонно-зеленый" , "морской зеленый" , "светло-зеленый" , "голубой" , "лаймовый" , "темно-синий" , "темно-голубой" , "зеленый" , "темно-зеленый" , "синий" , "темно-синий" , "флотский" , "черный" ];
let colorsEn = ["white" , "lightyellow" , "yellow" , "gold" , "pink" , "lightpink" , "orange" , "darkorange" , "coral" , "hotpink" , "orangeRed" , "fuchsia" , "magenta" , "red" , "beige" , "khaki" , "violet" , "lavender" , "lightcyan" , "plum" , "crimson" , "palevioletred" , "lightgray" , "chocolate" , "peru" , "silver" , "firebrick" , "greenyellow" , "lightblue" , "darkgray" , "brown" , "yellowgreen" , "palegreen" , "darkviolet" , "lightgreen" , "darkseagreen" , "darkmagenta" , "darkred" , "lightskyblue" , "skyblue" , "gray" , "olive" , "purple" , "maroon" , "aquamarine" , "slategray" , "slateblue" , "cornflowerblue" , "indigo" , "darkslateblue" , "turquoise" , "limegreen" , "seagreen" , "lightseagreen" , "cyan" , "lime" , "deepskyblue" , "darkcyan" , "green" , "darkgreen" , "blue" , "darkblue" , "navy" , "black"];
let colorsHEX = ["#FFFFFF" , "#FFFFE0" , "#FFFF00" , "#FFD700" , "#FFC0CB" , "#FFB6C1" , "#FFA500" , "#FF8C00" , "#FF7F50" , "#FF69B4" , "#FF4500" , "#FF00FF" , "#FF00FF" , "#FF0000" , "#F5F5DC" , "#F0E68C" , "#EE82EE" , "#E6E6FA" , "#E0FFFF" , "#DDA0DD" , "#DC143C" , "#DB7093" , "#D3D3D3" , "#D2691E" , "#CD853F" , "#C0C0C0" , "#B22222" , "#ADFF2F" , "#ADD8E6" , "#A9A9A9" , "#A52A2A" , "#9ACD32" , "#98FB98" , "#9400D3" , "#90EE90" , "#8FBC8F" , "#8B008B" , "#8B0000" , "#87CEFA" , "#87CEEB" , "#808080" , "#808000" , "#800080" , "#800000" , "#7FFFD4" , "#708090" , "#6A5ACD" , "#6495ED" , "#4B0082" , "#483D8B" , "#40E0D0" , "#32CD32" , "#2E8B57" , "#20B2AA" , "#00FFFF" , "#00FF00" , "#00BFFF" , "#008B8B" , "#008000" , "#006400" , "#0000FF" , "#00008B" , "#000080" , "#000000"];
const colorsArrRu = colorsRu.map((colorRu,index)=>colorRu); // создание массива упорядоченых русских значений цвета
const colorsArrEn = colorsEn.map((colorEn,index)=>colorEn); // создание массива упорядоченых стандартных английских значений цвета
let colorName = colorsRu.map((colorRu,index) => ({
  colorRu, colorEn : colorsEn[index], colorsHEX : colorsHEX[index]
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
    newLi.className = 'fruit__item';
    newLi.innerHTML = "<div class = \" fruit__info \" > <div>index:" + (i+1) + "</div> <div>kind: " + fruits[i].kind + "</div> <div>color:" + fruits[i].color + "</div> <div>weight (кг):" + fruits[i].weight + "</div> </div>";
    // поиск цвета
        const indexColor = colorsArrRu.indexOf(fruits[i].color);          
          console.log(indexColor);
        if (indexColor > 0) {
          newLi.style.background = colorsArrEn[indexColor];
          console.log(colorsArrEn[indexColor]);
        } else {
          newLi.style.background = 'black';
        }
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
  //fruits = JSON.parse(fruitsJSON); // восстанавливает fruits из JSON вначале каждой фильтрации
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

let sortAPI = {
// функция сортировки пузырьком
bubbleSort(arr) {
  const n = arr.length;
              let temp;
              for (let indexСycle = 0; indexСycle < n-1; indexСycle++) { 
                  for (let index = 0; index < n-1-indexСycle; index++) { 
                      if (colorsArrRu.indexOf(arr[index].color) > colorsArrRu.indexOf(arr[index+1].color)) {
                          temp = arr[index+1]; 
                          arr[index+1] = arr[index]; 
                          arr[index] = temp; 
                      }
                  }
              }
},
// функция быстрой сортировки
quickSort(arr) {
   for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
    let indexMin = i;
    for (let j = i + 1; j < l; j++) {
        if (colorsArrRu.indexOf(arr[indexMin].color) > colorsArrRu.indexOf(arr[j].color)) {
            indexMin = j;
        }
    }
    if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
    }
}
return arr;
}
}

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

// действие кнопки смены алгоритма сортировки
let sort = false;
sortChangeButton.addEventListener('click', () => {
  if (sort) {
    sort = false;
    sortKind = 'bubbleSort';
  }
  else {
    sort = true;
    sortKind = 'quickSort';
  }
  sortKindLabel.textContent = sortKind;
  sortTimeLabel.textContent = '-';
});

// действие кнопки запуска алгоритма сортировки
sortActionButton.addEventListener('click', () => {
  sortKindLabel.textContent = sortKind; // вывести в sortTimeLabel значение 'sorting...'

        const start = new Date().getTime();
        sortAPI[sortKind](fruits);
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;

  display();
  sortTimeLabel.textContent = sortTime; // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if (kindInput.value && colorInput.value && weightInput.value) {
    fruits.push({"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value});
    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';
  }
  else {
    alert('Нехватает данных для добавления фрукта!');
  }
  display();
});
