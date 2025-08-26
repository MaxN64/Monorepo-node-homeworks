const mongoose = require("mongoose");
module.exports = async function connectDB(uri) {
  if (!uri) {
    throw new Error("Не задана переменная окружения MONGODB_URI");
  }

  mongoose.connection.on("connected", () => {
    console.log(" MongoDB: подключение установлено");
  });

  mongoose.connection.on("error", (err) => {
    console.error(" MongoDB: ошибка подключения:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn(" MongoDB: соединение закрыто");
  });

  await mongoose.connect(uri);
};
