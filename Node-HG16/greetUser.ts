// Задание 1 
// Функция приветствия Напишите функцию greetUser,
// которая принимает имя пользователя (строка) и выводит приветственное
// сообщение в консоль: "Привет, <name>!". Используйте строгую типизацию


function greetUser (name: string): void {
    console.log(`Hallo, ${name}!`);
}
greetUser("Alisa");

// Задание 2
// Типизация функции с объектом в качестве параметра
// Создайте интерфейс `Person`, который описывает 
// человека с полями `name`, `age`, и `city`.
// Напишите функцию `printPersonInfo`, которая принимает объект 
// типа `Person` и выводит информацию о человеке в 
// формате: `"Имя: <name>, Возраст: <age>, Город: <city>"`.

interface Person {
    name: string;
    age: number;
    city: string;
}
function printPersonInfo(person: Person): void {
    console.log(`Name: ${person.name}, Age: ${person.age}, Town: ${person.city}`);

}

const p1: Person ={ name: "Hanna", age: 28, city: "Berlin"};
printPersonInfo(p1);

// Задание 3 
// Простая типизация для числового параметра Напишите 
// функцию squareNumber, которая принимает число и возвращает
// его квадрат. Используйте строгую типизацию.

function squareNumber(n: number): number {
    return n * n;
}
console.log(squareNumber(5));
console.log(squareNumber(5));

// Задание 4
// Типизация функции с boolean
// Напишите функцию `isEven`, которая принимает число и 
// возвращает `true`, если число четное, и `false`, 
// если нечетное. Используйте строгую типизацию.

function isEven(n: number): boolean {
    return n % 2 === 0;
}
console.log(isEven(4));
console.log(isEven(7));

// Задание 5
// Создание интерфейса для объекта
// Создайте интерфейс `Student`, который описывает студента 
// с полями `name` (строка) и `grade` (число).
// Напишите функцию `printStudentInfo`,  которая принимает объект
// типа `Student` и выводит информацию о студенте 
// в формате: `"Студент: <name>, Оценка: <grade>"`.

interface Student {
    name: string;
    grade: number;
}
function printStudentInfo(student: Student): void {
    console.log(`Student: ${student.name}, Grade: ${student.grade}`);

}
const s1: Student = {name: "Olga", grade: 5};
const s2: Student = {name: "Stefan", grade: 3};

printStudentInfo (s1);
printStudentInfo (s2);

// Задание 6
// Функция с типом `void`
// Напишите функцию `logMessage`, которая принимает строку 
// и выводит её в консоль без возвращаемого значения. 
// Используйте тип `void`.

function logMassege(message: string): void{
    console.log(message);
}

logMassege("Hallo, world");
logMassege("TypeScript super!!!");
