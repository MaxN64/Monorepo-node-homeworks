import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.listen(3000, () => console.log('Server started on 3000'));

