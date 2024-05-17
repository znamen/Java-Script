# Java-Script

//Создание копии 
const person = {
    name: 'Bob',
    age: 21
}
const person2 = Object.assign({}, person)
person2.age = 30
person2.isAblut = 100

console.log(person)
console.log(person2)

//Функция суммирования
let a = 5
let b = 5
function sum(a, b) {
    const c = a + b
    console.log(c) }
sum(a, b)
a = 55
b = 10
sum(a, b)

------------------------------
//Простой опросник

const CURRENT_YEAR = 2024;
const CORRECT_ANSWER = 'Ответ верный';
const ERROR_ANSWER = 'Ответ неверный';

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const outputNode = document.querySelector('.js-output');

buttonNode.addEventListener('click', function() {
    const inputValue = inputNode.value;

    if (!inputValue) {
        return;
    }

    const answer = Number(inputNode.value);
    let output = CORRECT_ANSWER;

    if (answer !== CURRENT_YEAR) {
        output = ERROR_ANSWER;
    }
    
    outputNode.innerHTML = output;
});

