/*
1.
Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:
*/

const getStringLength = (string, maxLength) => string.length <= maxLength;

console.log('');
console.log('Проверки первой функции:');
// Cтрока короче 20 символов
console.log(getStringLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(getStringLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(getStringLength('проверяемая строка', 10)); // false

console.log(getStringLength('или какая-то другая строка', 30)); // true
let someString = 'или какая-то другая строка';
console.log(someString.length);
console.log('');

/*
2.
Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. Например:

Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!
*/

function isPolindrom(string) {
  let backwardString = '';
  string = string.replaceAll(' ', '');

  for (let i = string.length - 1; i >= 0; i--) {
    backwardString += string[i];
  }

  return string.toLowerCase() === backwardString.toLowerCase();
}

console.log('Проверки второй функции:');
// Строка является палиндромом
isPolindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPolindrom('ДовОд'); // true
// Это не палиндром
isPolindrom('Кекс'); // false

// Это палиндром
isPolindrom('Лёша на полке клопа нашёл '); // true

console.log(isPolindrom('топот'));
console.log(isPolindrom('ДовОд'));
console.log(isPolindrom('Кекс'));
console.log(isPolindrom('Лёша на полке клопа нашёл '));
console.log('');

/*
3.
Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число. Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:
*/

function getAllNumbers(string) {
  let result = '';

  if (typeof string === 'number') {
    string = string.toString();
  }

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  // Если нет найденных цифр, вернем NaN
  if (result === '') {
    return NaN;
  }

  return result;
}

console.log('Проверки третьей функции, если передана строка:');
console.log(getAllNumbers('2023 год'));            // 2023
console.log(getAllNumbers('ECMAScript 2022'));     // 2022
console.log(getAllNumbers('1 кефир, 0.5 батона')); // 105
console.log(getAllNumbers('агент 007'));           // 7 (почему тут должно быть 7?)
console.log(getAllNumbers('а я томат'));           // NaN
console.log('Проверки третьей функции, если передано число:');
console.log(getAllNumbers(2023)); // 2023
console.log(getAllNumbers(-1));   // 1
console.log(getAllNumbers(1.5));  // 15
console.log('');
