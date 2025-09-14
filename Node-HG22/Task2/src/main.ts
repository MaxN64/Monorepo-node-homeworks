import { Finance } from "./finance";

const loanCalc = new Finance.LoanCalculator();
const monthlyPayment = loanCalc.calculateMonthlyPayment(10000, 5, 3);

console.log("Monatliche Kreditrate:", monthlyPayment.toFixed(2), "€");

const taxCalc = new Finance.TaxCalculator();
const incomeTax = taxCalc.calculateTax(45000, 20);

console.log("Einkommenssteuer:", incomeTax.toFixed(2), "€");
