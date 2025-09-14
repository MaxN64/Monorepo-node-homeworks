// Aufgabe 2
// Namensräume für Finanzoperationen
// Erstelle eine Datei finance.ts, in der ein Namensraum Finance definiert wird.
// Innerhalb dieses Namensraums sollen zwei Klassen erstellt werden:
// LoanCalculator, der die monatlichen Kreditraten nach der Annuitätenformel berechnet
// TaxCalculator, der die Einkommenssteuer berechnet.
// Verwende diese Klassen in der Datei main.ts, um die Kreditraten und die Steuer mit Beispieldaten zu berechnen.

export namespace Finance {
  export class LoanCalculator {
    calculateMonthlyPayment(
      principal: number,
      annualRate: number,
      years: number
    ): number {
      const monthlyRate = annualRate / 12 / 100;
      const n = years * 12;
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, n);
      const denominator = Math.pow(1 + monthlyRate, n) - 1;

      return principal * (numerator / denominator);
    }
  }

  export class TaxCalculator {
    calculateTax(income: number, taxRate: number): number {
      return income * (taxRate / 100);
    }
  }
}
