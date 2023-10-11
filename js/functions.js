/*

1.
Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:

*/

const stringLength = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
console.log(stringLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(stringLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(stringLength('проверяемая строка', 10)); // false

console.log(stringLength('или какая-то другая строка', 30)); // true
let someString = 'или какая-то другая строка';
console.log(someString.length);
