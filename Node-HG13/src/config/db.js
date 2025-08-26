const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI не задана. Добавьте переменную в файл .env");
  }

  mongoose.connection.on("connected", () => {
    console.log(" MongoDB: соединение установлено");
  });

  mongoose.connection.on("error", (err) => {
    console.error(" MongoDB: ошибка соединения", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn(" MongoDB: соединение разорвано");
  });

  process.once("SIGINT", async () => {
    await mongoose.connection.close();
    console.log(" MongoDB: соединение закрыто (SIGINT)");
    process.exit(0);
  });

  await mongoose.connect(uri);
};
