require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const app = {
  PORT: Number(process.env.PORT || 3000),
  BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS || 12),
};

const dbBase = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  dialect: "mysql",
  logging: false,
};

const development = { ...dbBase };
const test = {
  ...dbBase,
  database: process.env.DB_NAME_TEST || `${process.env.DB_NAME}_test`,
};
const production = { ...dbBase };

module.exports = {
  app,

  development,
  test,
  production,
};
