// Задание 1 
// Функция приветствия Напишите функцию greetUser,
// которая принимает имя пользователя (строка) и выводит приветственное
// сообщение в консоль: "Привет, <name>!". Используйте строгую типизацию
function greetUser(name) {
    console.log("Hallo, ".concat(name, "!"));
}
greetUser("Alisa");
function printPersonInfo(person) {
    console.log("Name: ".concat(person.name, ", Age: ").concat(person.age, ", Town: ").concat(person.city));
}
var p1 = { name: "Hanna", age: 28, city: "Berlin" };
printPersonInfo(p1);
