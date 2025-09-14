// Aufgabe 4
// Module für die Arbeit mit Zahlenfolgen
// Erstelle eine Datei sequenceUtils.ts, in der folgende Funktionen definiert werden:
// generateFibonacci, die die Fibonacci-Folge bis zu einer angegebenen Zahl generiert.
// generatePrimeNumbers, die alle Primzahlen bis zu einer angegebenen Zahl generiert.
// Importiere diese Funktionen in main.ts und teste sie mit Beispielen.

export function generateFibonacci(limit: number): number[] {
  const sequence: number[] = [0, 1];

  if (limit < 1) return [0];

  while (true) {
    const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
    if (next > limit) break;
    sequence.push(next);
  }

  return sequence;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}
