import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'product_db'
});

export default pool;       // <- вместо module.exports
