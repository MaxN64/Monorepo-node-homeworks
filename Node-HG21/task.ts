// Aufgabe 1
// Abstrakte Klasse Animal
// Erstellen Sie eine abstrakte Klasse Animal mit einer 
// abstrakten Methode makeSound().
// Erstellen Sie dann die Klassen Dog und Cat, die von Animal 
// erben und die Methode makeSound() jeweils anders implementieren 
// (Dog soll "Bark" zurückgeben, Cat – "Meow").
// Erstellen Sie ein Array vom Typ Animal[], das Dog- und Cat-Objekte 
// enthält, und rufen Sie die Methode makeSound() für jedes Element im Array auf.

abstract class Animal {
    abstract makeSound(): string;
}
class Dog extends Animal {
    makeSound(): string{
        return "Bark";
    }
}

class Cat extends Animal {
    makeSound(): string{
        return "Meow";
    }
}

const animals: Animal[] = [
    new Dog(),
    new Cat(),
    new Dog ()
];

for (const animal of animals) {
    console.log(animal.makeSound());
}

// Aufgabe 2
// Abstrakte Klasse ColoredShape mit Farbe
// Erstellen Sie eine abstrakte Klasse ColoredShape, die von Shape 
// (aus Aufgabe 4 der Unterrichtsstunde) erbt und ein abstraktes Feld color hinzufügt.
// Implementieren Sie die Klassen ColoredCircle und ColoredRectangle, 
// die von ColoredShape erben, das Feld color festlegen und die Methode calculateArea() implementieren.
// Geben Sie die Fläche (Area) und die Farbe (Farbe) für jedes Objekt aus.

abstract class Shape {
    abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape{
    abstract color: string;
}

class ColoredCircle extends ColoredShape {
    radius: number;
    color: string;

    constructor(radius: number, color: string){
        super();
        this.radius = radius;
        this.color = color;
    }
    calculateArea(): number {
        return Math.PI * this.radius*this.radius;
    }
}

class ColoredRectangle extends ColoredShape {
    width: number;
    height: number;
    color: string;

    constructor(width: number, height: number, color: string) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
    }

    calculateArea(): number {
        return this.width*this.height;
    }
}

const shapes: ColoredShape[] = [
    new ColoredCircle(5, "Rot"),
    new ColoredRectangle(4, 6, "Blau")
];

for (const shape of shapes) {
    console.log(`Farbe: ${shape.color}, Fläche: ${shape.calculateArea().toFixed(2)}`);
}

// Aufgabe 3
// Abstrakte Klasse Appliance
// Erstellen Sie eine abstrakte Klasse Appliance mit 
// den abstrakten Methoden turnOn() und turnOff().
// Erstellen Sie dann die Klassen WashingMachine und Refrigerator, 
// die Appliance erben und die Methoden turnOn() und turnOff() 
// implementieren, wobei entsprechende Meldungen ausgegeben werden.
// Erstellen Sie ein Array vom Typ Appliance[], fügen Sie WashingMachine- 
// und Refrigerator-Objekte hinzu, und rufen Sie die Methoden turnOn() 
// und turnOff() für jedes Element auf.


abstract class Appliance {
    abstract turnOn(): void;
    abstract turnOff(): void;
}

class WashingMachine extends Appliance {
    turnOn(): void {
        console.log("WashingMachine is now ON.");
    }

    turnOff(): void {
        console.log("WashingMachine is now OFF.");
    }
}

class Refrigerator extends Appliance {
    turnOn(): void {
        console.log("Refrigerator is now ON.");
    }

    turnOff(): void {
        console.log("Refrigerator is now OFF.");
    }
}

const appliances: Appliance[] = [
    new WashingMachine(),
    new Refrigerator()
];

for (const appliance of appliances) {
    appliance.turnOn();
    appliance.turnOff();
}


// Aufgabe 4
// Abstrakte Klasse Account
// Erstellen Sie eine abstrakte Klasse Account mit den abstrakten Methoden:
// deposit(amount: number)
// withdraw(amount: number)
// Implementieren Sie die Klassen
// SavingsAccount (Sparkonto)
// CheckingAccount (Girokonto)
// Im SavingsAccount soll beim Einzahlen zusätzlich ein 
// Zinssatz auf das Guthaben angewendet werden.
// Im CheckingAccount soll beim Abheben eine Gebühr (Kommission) abgezogen werden.
// Testen Sie die Methoden mit Objekten beider Klassen.


abstract class Account {
    protected balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): void;

    getBalance(): number {
        return this.balance;
    }
}

class SavingsAccount extends Account {
    private interestRate: number; 

    constructor(initialBalance: number, interestRate: number) {
        super(initialBalance);
        this.interestRate = interestRate;
    }

    deposit(amount: number): void {
        const interest = amount * this.interestRate;
        this.balance += amount + interest;
        console.log(`SavingsAccount: Deposited ${amount} + interest ${interest.toFixed(2)}`);
    }

    withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`SavingsAccount: Withdrawn ${amount}`);
        } else {
            console.log("SavingsAccount: Insufficient funds");
        }
    }
}

class CheckingAccount extends Account {
    private fee: number;

    constructor(initialBalance: number, fee: number) {
        super(initialBalance);
        this.fee = fee;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`CheckingAccount: Deposited ${amount}`);
    }

    withdraw(amount: number): void {
        const total = amount + this.fee;
        if (total <= this.balance) {
            this.balance -= total;
            console.log(`CheckingAccount: Withdrawn ${amount} + fee ${this.fee}`);
        } else {
            console.log("CheckingAccount: Insufficient funds");
        }
    }
}

const savings = new SavingsAccount(1000, 0.05);   
const checking = new CheckingAccount(1000, 2);    

savings.deposit(500);    
savings.withdraw(200);

checking.deposit(300);
checking.withdraw(100);  

console.log(`SavingsAccount Balance: ${savings.getBalance().toFixed(2)}`);
console.log(`CheckingAccount Balance: ${checking.getBalance().toFixed(2)}`);


// Aufgabe 5
// Abstrakte Klasse Media
// Erstellen Sie eine abstrakte Klasse Media mit einer abstrakten Methode play().
// Erstellen Sie die Klassen Audio und Video, die von Media erben 
// und play() jeweils individuell implementieren:
// Audio → "Playing audio"
// Video → "Playing video"
// Erstellen Sie ein Array vom Typ Media[], das Audio- und
// Video-Objekte enthält, und rufen Sie play() für jedes Element im Array auf.


abstract class Media {
    abstract play(): void;
}

class Audio extends Media {
    play(): void {
        console.log("Playing audio");
    }
}

class Video extends Media {
    play(): void {
        console.log("Playing video");
    }
}


const mediaList: Media[] = [
    new Audio(),
    new Video(),
    new Audio()
];


for (const media of mediaList) {
    media.play();
}
