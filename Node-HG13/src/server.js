const app = require("./app");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(` HTTP-сервер запущен: http://localhost:${PORT}`);
  });
})().catch((err) => {
  console.error("Не удалось запустить приложение:", err);
  process.exit(1);
});
