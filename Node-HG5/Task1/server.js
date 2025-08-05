import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT)

const TOKEN = process.env.AUTH_TOKEN;
if (!TOKEN) {
    console.error('not set AUTH_TOKEN in .env');
    process.exit(1);
}
const server = http.createServer((req, res) =>{
    const auth = req.headers['authorization'];
    if (auth !== `Bearer ${TOKEN}`) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('Unauthorized');
    }
    res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('Hello, World!');
   
    
 });
 server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
 });
    