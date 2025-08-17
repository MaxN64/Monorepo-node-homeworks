require("dotenv").config();

const express = require("express");

const { connectToDatabase, getDb, closeDatabase } = require("./db");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/db-name", (req, res) => {
  const db = getDb();

  res.json({ database: db.databaseName });
});

function startServer() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(` Сервер запущен: http://localhost:${PORT}`);
  });
}

connectToDatabase()
  .then(() => {
    const db = getDb();

    console.log(` Подключено к MongoDB, база: ${db.databaseName}`);

    startServer();
  })
  .catch((err) => {
    console.error(" Ошибка подключения к MongoDB:", err);

    process.exit(1);
  });

process.on("SIGINT", async () => {
  console.log("\nПолучен SIGINT. Закрываем соединение с базой...");

  await closeDatabase();

  process.exit(0);
});
