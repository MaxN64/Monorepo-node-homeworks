// Aufgabe 1
// Module für die Arbeit mit Strings
// Erstelle eine Datei stringUtils.ts, in der du folgende Funktionen definierst:
// capitalize, die den ersten Buchstaben eines Strings groß schreibt.
// reverseString, die einen String umgekehrt zurückgibt.
// Importiere diese Funktionen in die Datei main.ts und teste sie mit einigen Beispiel-Strings.

export function capitalize(str: string): string{
    if (!str) return str;

return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reverseString(str: string): string{

    return str.split("").reverse().join("");

}
