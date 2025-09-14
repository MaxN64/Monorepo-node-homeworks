// Aufgabe 2
// Erstelle eine Klasse Library, die eine statische Eigenschaft 
// totalBooks (Gesamtanzahl der Bücher) besitzt.
// Bei jedem Hinzufügen eines Buches soll diese Eigenschaft erhöht werden.
// Die Klasse soll außerdem eine Methode addBook() enthalten, die den Zähler erhöht.
// Erzeuge mehrere Objekte der Klasse und überprüfe, wie sich die 
// Gesamtanzahl der Bücher verändert.

class Library{
    static totalBooks: number = 0;

    addBooks(): void {
        Library.totalBooks++;
    }
}

const libraryA = new Library();
const libraryB = new Library();

libraryA.addBooks();
libraryA.addBooks();
libraryB.addBooks();

console.log("Gesamtanzahl der Bucher:", Library.totalBooks);