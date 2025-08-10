
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


export const sequelize = new Sequelize(
  process.env.DB_NAME,        
  process.env.DB_USERNAME,    // пользователь
  process.env.DB_PASSWORD,    // пароль
  {
    host: process.env.DB_HOST,     // хост
    port: process.env.DB_PORT,     // порт
    dialect: process.env.DB_DIALECT, // тип базы (mysql)
    logging: false
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(' Database connection established');
  } catch (err) {
    console.error(' Unable to connect to database:', err);
    throw err;
  }
}
