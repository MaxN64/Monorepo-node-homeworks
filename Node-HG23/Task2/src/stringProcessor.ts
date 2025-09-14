// Aufgabe 2
// Asynchrone Verarbeitung von Daten aus einem Array
// Schreibe eine Funktion, die ein Array von Zeichenketten entgegennimmt.
// Jede Zeichenkette soll asynchron verarbeitet werden 
// (z. B. Umwandlung in Großbuchstaben mit einer Verzögerung).
// Verwende Promise.all, um alle Operationen parallel auszuführen und alle Ergebnisse auszugeben.



export function processString(input: string): Promise<string>{
    return new Promise((resolve)=> {
        setTimeout(()=>{
            resolve(input.toUpperCase());
        },1000);
    });
}

export async function processStrings(input: string[]): Promise<string[]> {
    const promises = input.map(processString);
    return Promise.all(promises);
    
}