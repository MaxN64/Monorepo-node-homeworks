// Задание 1
// Объединение и пересечение типов. Создайте два типа: `Admin` и `User`.
// Тип `Admin` должен включать поля `name` (строка) и `permissions` (массив строк),
// а тип `User` должен включать поля `name` (строка) и `email` (строка).
// Создайте тип `AdminUser`, который объединяет свойства обоих типов, и создайте объект этого типа.

type Admin = {
  name: string;
  permission: string[];
};
type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Olga",
  permission: ["read", "write", "delete"],
  email: "olga@gmaillll.com",
};
console.log(adminUser);

// Задание 2
// Вложенные объекты и опциональные поля
// Создайте объект `Car` с полями `make` (строка), `model` (строка),
// и вложенным объектом `engine`, который имеет поля `type` (строка) и `horsepower` (число).
// Добавьте опциональное поле `year` (число) для года выпуска машины.
// Напишите функцию, которая выводит информацию о машине.

interface Car {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
}

function printCarInfo(car: Car): void {
  console.log(`Auto: ${car.make} ${car.model}`);
  console.log(`Motor: ${car.engine.type}, ${car.engine.horsepower} PS`);

  if (car.year !== undefined) {
    console.log(`Bauerjahr: ${car.year}`);
  } else {
    console.log("Baujahr: unbekannt");
  }
}

const car1: Car = {
  make: "Toyota",
  model: "Corolla",
  engine: {
    type: "Benzin",
    horsepower: 133,
  },
  year: 2020,
};
const car2: Car = {
  make: "Tesla",
  model: "Model 3",
  engine: {
    type: "Elektro",
    horsepower: 283,
  },
};

printCarInfo(car1);
printCarInfo(car2);

// Задание 3
// Интерфейс для функции с объектом
// Создайте интерфейс для функции `calculateDiscount`, которая принимает
// объект `Product` с полями `name` (строка) и `price` (число), а также параметр `discount` (число).
// Функция должна возвращать новую цену продукта с учетом скидки.

interface Product {
  name: string;
  price: number;
}
interface CalculateDiscount {
  (product: Product, discount: number): number;
}
const CalculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price - (product.price * discount) / 100;
};

const product: Product = {
  name: "Laptop",
  price: 1200,
};

console.log(CalculateDiscount(product, 10));
console.log(CalculateDiscount(product, 25));

// Задание 4 
// Массив объектов и функции
// Создайте интерфейс `Employee`, который включает 
// поля `name` (строка) и `salary` (число).
// Создайте массив объектов `Employee`, затем напишите функцию, которая 
// принимает этот массив и возвращает массив зарплат всех сотрудников.

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
{ name: "Anna", salary: 3000 },
  { name: "Max", salary: 4000 },
  { name: "Olga", salary: 3500 }
];

function getSalaries(employees: Employee[]): number[] {
  return employees.map(emp => emp.salary);
}
console.log(getSalaries(employees));

// Задание 5
// Наследование интерфейсов и работа с объектами
// Создайте интерфейс `Person` с полями `firstName` (строка) и `lastName` (строка).
// Создайте интерфейс `Student`, который наследует `Person` и добавляет поле `grade` (число).
// Создайте объект `student` этого типа и напишите функцию, которая выводит полное имя студента и его оценку.

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
firstName: "Anna",
lastName: "Muller",
grade: 5
};

function printStudentInfo(student: Student): void {
console.log (`Student: ${student.firstName} ${student.lastName}, Note: ${student.grade}`)
}

printStudentInfo(student);

// Задание 6
// Интерфейс для функции с несколькими параметрами
// Создайте интерфейс для функции `concatStrings`, которая принимает 
// два параметра: `str1` и `str2` (оба строки) и возвращает их объединение.
// Реализуйте эту функцию и протестируйте её.

interface ConcatStrings {
  (str1: string, str2: string): string;
}
const concatString: ConcatStrings = (str1, str2) => {
  return str1 + str2;
};
console.log(concatString("Hallo", "Welt"));
console.log(concatString("Type", "Script"));
console.log(concatString("Vorname", "Anna"));