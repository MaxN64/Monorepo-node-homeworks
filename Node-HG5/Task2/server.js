import http from "http";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT)
const LOG_FILE = path.join(__dirname, 'errors.log');

const server = http.createServer((req, res) => {
    try{
        throw new Error('Test error');
    }catch(err){
        const logEntry = `${new Date().toISOString()} ${err.stack}\n\n`;
        fs.appendFile(LOG_FILE, logEntry, (fsErr) => {
            if(fsErr){
                console.error('Failed to write to log file:', fsErr);
            }
        });
res.writeHead(500, {'Content-Type': 'text/plain'});
res.end('Internal Server Error');
}
   });
   server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
   })