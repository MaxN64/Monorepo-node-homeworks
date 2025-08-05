import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT)

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    if(req.method === 'PUT') {
        res.statusCode = 200;
        return res.end('PUT request received');
    } else if (req.method === 'DELETE') {
        res.statusCode = 200;
        return res.end('DELETE request received');
    } 
        else {

   res.statusCode = 404;
    return res.end('Not found');
}

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
