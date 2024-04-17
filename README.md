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

