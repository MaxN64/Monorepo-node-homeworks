
import 'dotenv/config'; 

const PORT = process.env.PORT;
const URL  = `http://localhost:${PORT}/`;

async function testMethod(method) {
  try {
    const res = await fetch(URL, { method });
    const text = await res.text();
    console.log(`${method} → ${res.status}`, text);
  } catch (err) {
    console.error(`${method} network error →`, err.message);
  }
}

await testMethod('PUT');
await testMethod('DELETE');
await testMethod('GET');
