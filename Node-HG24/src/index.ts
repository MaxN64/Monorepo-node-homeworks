
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("Hallo von Express + TypeScript");
});


app.post("/", (req, res) => {
 
  const payload = req.body; 
  res.status(201).json({
    message: "Payload empfangen",
    data: payload,
  });
});


app.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});


app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Interner Serverfehler" });
});


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
