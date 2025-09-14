// Aufgabe 4
// Asynchrone Funktion mit dynamischer Ausführungszeit
// Schreibe eine asynchrone Funktion, die ein Array von Zahlen entgegennimmt.
// Für jede Zahl soll ein Promise erzeugt werden, das nach einer Anzahl 
// Millisekunden erfüllt wird, die dem Zahlenwert entspricht.
// Verwende Promise.all, um auf alle Promises zu warten und gib die Ergebnisse in der Konsole aus.



export function delay(ms: number): Promise<number> {
 
  if (!Number.isFinite(ms) || ms < 0) {
    return Promise.reject(new Error(`Ungültiger Zeitwert: ${ms}`));
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(ms), ms);
  });
}


export async function runDelays(values: number[]): Promise<number[]> {
  const promises: Promise<number>[] = values.map((v) => delay(v));

  return Promise.all(promises);
}
