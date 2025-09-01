// Задание 1
// Типизация функции с несколькими параметрами
// Напишите функцию `calculateTotal`, которая принимает три параметра:  
// `price` (число)  
// `quantity` (число)  
// `discount` (число, по умолчанию равен 0)

function calculateTotal(price: number, quantity: number, discount: number = 0): number {
    return price * quantity - discount;
}

console.log(calculateTotal(100, 2));
console.log(calculateTotal(100, 2, 50));
console.log(calculateTotal(50, 5));

// Задание 2
// Использование Union типов
// Создайте переменную `id`, которая может быть либо строкой, либо числом.  
// Напишите функцию `displayId`, которая принимает эту переменную и выводит
// сообщение, содержащее значение ID. Если `id` — строка, выведите её в верхнем 
// регистре. Если `id` — число, умножьте его на 10 перед выводом.

let id: string | number;
function displayId(id: string | number): void{
    if(typeof id === "string"){
        console.log("ID (Zeile):", id.toUpperCase());
    }else{
        console.log("ID (Zahl):", id * 10);
    }
}
id = "user123";
displayId(id);

id = 23;
displayId(id);


// Задание 3
// Объявление и типизация массивов объектов
// Создайте массив объектов `orders`, где каждый объект описывает заказ 
// и содержит следующие свойства:  `orderId` (строка)  `amount` (число)  
// `status` (строка, может принимать значения "pending", "shipped" или "delivered")
// Напишите функцию `filterOrdersByStatus`, которая принимает этот массив 
// и строку `status`, и возвращает массив заказов, соответствующих указанному статусу.

interface Order {
    orderId: string;
    amaunt: number;
    status: "pending" | "shipped" | "delivered";

}
const orders: Order[] =[
    { orderId: "A001", amaunt: 100, status: "pending" },
  { orderId: "A002", amaunt: 200, status: "shipped" },
  { orderId: "A003", amaunt: 150, status: "delivered" },
  { orderId: "A004", amaunt: 80, status: "pending" },
];

function filterOrdersByStatus (orders: Order[], status: "pending" | "shipped" | "delivered"): Order[] {
   return orders.filter(order => order.status === status); 
}

console.log(filterOrdersByStatus(orders, "pending"));
console.log(filterOrdersByStatus(orders, "delivered"));
console.log(filterOrdersByStatus(orders, "shipped"));


// Задание 4
// Работа с кортежами и объектами
// Создайте кортеж `productInfo`, который содержит:  
// название товара (строка) его цену (число) количество на складе (число)
// Напишите функцию `updateStock`, которая принимает объект
// `inventory` (где ключ — это название товара, а значение — количество на складе)
// и кортеж `productInfo`, обновляет количество товара в объекте `inventory` 
// и возвращает обновленный объект.

type ProductInfo= [string, number, number];

function updateStock(
    inventory: {[key: string]: number},
    productInfo: ProductInfo
): {[key: string]: number} {

const [name, , stock] = productInfo;
inventory[name] = stock;

return inventory;
}

let inventory = {
    "laptop": 5,
    "Mouse": 10
};
let productInfo: ProductInfo = [
    "laptop", 1200, 8
];
console.log(updateStock(inventory, productInfo));

