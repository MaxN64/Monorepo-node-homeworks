// Aufgabe 1
// Erstelle eine Klasse Animal, die die Eigenschaften name (Name des Tieres) 
// und species (Tierart) enthält.
// Füge eine Methode sound() hinzu, die "The animal makes a sound" in die Konsole ausgibt.
// Erstelle anschließend eine abgeleitete Klasse Dog, die eine neue Eigenschaft 
// breed (Hunderasse) hinzufügt und die Methode sound() überschreibt, sodass "The dog barks" ausgegeben wird.


class Animal {
    name: string;
    species: string;

    constructor(name: string, species: string){
        this.name = name;
        this.species = species;
    }

    sound(): void {
        console.log("The animal makes a sound");
    }
}

class Dog extends Animal{
    breed: string;

    constructor(name: string, species: string, breed: string){
        super(name, species);
        this.breed = breed;
    }
override sound(): void {
    console.log("The dog barks");
}
}

const genericAnimal = new Animal("Charlie", "Unknown");
genericAnimal.sound();

const myDog = new Dog("Bello", "Dog", "Labrador");
myDog.sound();
console.log(myDog.name, myDog.species, myDog.breed);




