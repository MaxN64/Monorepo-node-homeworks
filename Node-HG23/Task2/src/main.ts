import {processStrings} from "./stringProcessor";

async function run() {
  const data = ["alpha", "beta", "gamma", "delta"];

  console.log("Starte Verarbeitung...");
  const results = await processStrings(data);

  console.log("Fertig! Ergebnisse:");
  console.log(results);
}

run().catch((err) => console.error("Fehler:", err));