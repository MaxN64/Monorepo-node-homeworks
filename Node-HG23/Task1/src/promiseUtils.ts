// Aufgabe 1
// Verarbeitung einer Promise-Kette mit async/await
// Erstelle mehrere Funktionen, die Promises mit unterschiedlicher Ausführungszeit zurückgeben.
// Schreibe eine Funktion, die diese Promises nacheinander mit await aufruft 
// und die Ergebnisse jeder Operation verarbeitet.
// Stelle sicher, dass die Promise-Kette sequenziell ausgeführt wird.

 
export function task1():Promise<string> {
    return new Promise ((resolve)=> {
        setTimeout(() =>{
            resolve("Ergebnis von Task 1");
        }, 1000);
    });
}

 
export function task2():Promise<string> {
    return new Promise ((resolve)=> {
        setTimeout(() =>{
            resolve("Ergebnis von Task 2");
        }, 2000);
    });
}

export function task3():Promise<string> {
    return new Promise ((resolve)=> {
        setTimeout(() =>{
            resolve("Ergebnis von Task 3");
        }, 1500);
    });
}