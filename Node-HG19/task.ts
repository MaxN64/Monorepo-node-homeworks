// Aufgabe 1
// Schreibe eine Pfeilfunktion sumEvenNumbers, die ein Array
// von Zahlen entgegennimmt und die Summe aller geraden Zahlen zurückgibt.

const sumEvenNumbers = (numbers: number[]): number => {
  return numbers.reduce((sum: number, num: number) => {
    if (num % 2 === 0) {
      return sum + num;
    }
    return sum;
  }, 0);
};

console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6]));

// Aufgabe 2
// Definiere ein Interface StringToBooleanFunction für eine Funktion, 
// die einen String entgegennimmt und einen boolean zurückgibt 
// (z. B. überprüft, ob der String leer ist). Implementiere eine solche Funktion.

interface StringToBooleanFunction{
    (input: string): boolean;
}
const isEmptyString: StringToBooleanFunction =(input: string): boolean =>{
    return input.length === 0;
};
console.log(isEmptyString(""));
console.log(isEmptyString("Hallo"));

// Aufgabe 3
// Erstelle einen Typ CompareStrings für eine Funktion, 
// die zwei Strings entgegennimmt und einen boolean zurückgibt 
// (z. B. um die Gleichheit von Strings zu prüfen). Schreibe eine Funktion, die diesem Typ entspricht.

type CompareString = (a: string, b: string) => boolean;

const areStringsEqual: CompareString = (a: string, b: string): boolean => {
    return a===b;
};

console.log(areStringsEqual("Hallo", "Hallo"));
console.log(areStringsEqual("Hallo", "Welt"));

// Aufgabe 4
// Schreibe eine generische Funktion getLastElement, 
// die ein Array eines beliebigen Typs entgegennimmt 
// und das letzte Element dieses Arrays zurückgibt.

function getLastElement<T>(arr: T[]): T | undefined {

    if (arr.length ===0) {
        return undefined;
    }
    return arr[arr.length -1];
}
const numbers = [10, 20, 30];
const strings = ["Apfel", "Banane", "Kirsche"];
const objects = [{id: 1}, {id: 2}];

console.log(getLastElement(numbers));
console.log(getLastElement(strings));
console.log(getLastElement(objects));
console.log(getLastElement([]));

// Aufgabe 5
// Schreibe eine generische Funktion makeTriple, 
// die drei Argumente desselben Typs entgegennimmt und 
// ein Array mit diesen drei Elementen zurückgibt.

function makeTriple<T>(a: T, b: T, c: T): T[]{
    return[a, b, c];
}

const tripleNumbers = makeTriple(1, 2, 3);
console.log(tripleNumbers);

const tripleStrings = makeTriple("a", "B", "c");
console.log(tripleStrings);

const tripleObjects = makeTriple({id: 1}, {id: 2}, {id: 3});
console.log(tripleObjects);

