// Aufgabe 3
// Überschreiben des Konstruktors in der Klasse Vehicle
// Erstellen Sie eine Klasse Vehicle, die die Eigenschaften 
// make (Marke) und model (Modell) enthält.
// Fügen Sie einen Konstruktor hinzu, der diese Eigenschaften initialisiert.
// Erstellen Sie dann eine Unterklasse Motorcycle, die eine neue 
// Eigenschaft type (Motorradtyp) hinzufügt und den Konstruktor überschreibt,
// um alle drei Eigenschaften zu initialisieren.
// Stellen Sie sicher, dass die Daten beim Erstellen eines Objekts 
// korrekt initialisiert werden.


class Vehicle{
    make: string;
    model: string;

    constructor(make: string, model: string){
        this.make = make;
        this.model = model;
    }
}
class Motocycle extends Vehicle {
    type: string;

    constructor(make: string, model: string, type: string) {
        super(make, model);
        this.type = type;
    }
}

const myMotorcycle = new Motocycle("Yamaha", "MT-07", "Naked Bike");

console.log("Marke:", myMotorcycle.make);
console.log("Modell:", myMotorcycle.model);
console.log("Typ:", myMotorcycle.type);