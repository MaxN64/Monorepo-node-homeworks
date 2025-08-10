
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Book extends Model {}

Book.init(
  {
   
    title: {
      type: DataTypes.STRING,   // Тип данных: строка произвольной длины
      allowNull: false,         // Запрещаем NULL, поле обязательно для заполнения
      validate: {
        notEmpty: true          // Валидация: строка не должна быть пустой
      }
    },
    
    author: {
      type: DataTypes.STRING,   // Тип данных: строка
      allowNull: false,         // Обязательное поле
      validate: {
        notEmpty: true          // Не пустая строка
      }
    },
    
    year: {
      type: DataTypes.INTEGER,  // Тип данных: целое число
      allowNull: false,         // Обязательное поле
      validate: {
        isInt: true,            // Должно быть целым числом
        min: 0                  // Неотрицательное (можешь поменять как нужно)
      }
    }
  },
  {
    sequelize,                  // Экземпляр подключения, обязательная опция
    modelName: 'Book',          // Имя модели внутри Sequelize
    tableName: 'Books',         
    timestamps: true            // Включаем автоматические поля createdAt/updatedAt
  }
);

export default Book;
