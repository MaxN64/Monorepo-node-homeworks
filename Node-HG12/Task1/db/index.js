require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;

const defaultDbName = process.env.MONGODB_DB || "myapp";

let client;

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return client;

  if (!uri) {
    throw new Error("Не найдена переменная окружения MONGODB_URI в .env");
  }

  client = new MongoClient(uri);

  await client.connect();

  await client.db("admin").command({ ping: 1 });

  isConnected = true;

  return client;
}

function getDb() {
  if (!client || !isConnected) {
    throw new Error(
      "База данных не подключена. Сначала вызовите connectToDatabase()."
    );
  }

  return client.db(defaultDbName);
}

async function closeDatabase() {
  if (client && isConnected) {
    await client.close();
    isConnected = false;
  }
}

module.exports = { connectToDatabase, getDb, closeDatabase };
