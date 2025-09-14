
import { runDelays } from "./dynamicDelays";

async function main() {
  const nums = [200, 50, 500, 150]; 

  console.log("Starte Promises parallel...");
  try {
    const results = await runDelays(nums);
    console.log("Alle fertig. Ergebnisse (ms):", results);
  } catch (err) {
    
    console.error("Fehler bei der Ausführung:", err);
  }
}

main();
