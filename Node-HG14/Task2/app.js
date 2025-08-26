require('dotenv').config(); 
const express = require('express'); 
const connectDB = require('./config/db'); 
const routes = require('./routes');

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 

app.use('/', routes); 

async function start() { 
  try { 
    const mongoUri = process.env.MONGODB_URI; 

    await connectDB(mongoUri); 
    app.listen(PORT, () => { 
      console.log(` Server is running at http://localhost:${PORT}`); 
    }); 
  } catch (err) { 
    console.error('Старт приложения завершился ошибкой:', err); 
    process.exit(1); 
  } 
} 

start(); 
