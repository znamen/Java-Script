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

