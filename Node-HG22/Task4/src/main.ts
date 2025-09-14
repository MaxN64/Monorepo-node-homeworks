
import { generateFibonacci, generatePrimeNumbers } from "./sequenceUtils";

const fib = generateFibonacci(50);    
console.log("Fibonacci bis 50:", fib);

const primes = generatePrimeNumbers(50); 
console.log("Primzahlen bis 50:", primes);
