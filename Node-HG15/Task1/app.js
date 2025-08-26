

const http = require('http');                 
const express = require('express');           
const { Server } = require('socket.io');      
const { randomUUID } = require('crypto');     

const app = express();                        
const server = http.createServer(app);        
const io = new Server(server);                
const PORT = process.env.PORT || 3000;        

app.use(express.static('public'));            


const messages = new Map(); 
const reads = new Map();    

io.on('connection', (socket) => {
  console.log(' connected:', socket.id);


  socket.on('chat:message', (payload = {}) => {
    const text = typeof payload.text === 'string' ? payload.text.trim() : '';
    if (!text) return; 

    
    const id = randomUUID();
    const clientId = payload.clientId || null;
    const at = new Date().toISOString();

    
    messages.set(id, { from: socket.id, text, at });
    reads.set(id, new Set());

    
    io.emit('chat:message', { id, clientId, text, from: socket.id, at });

    
    socket.emit('chat:ack', { id, clientId, status: 'delivered', at });
  });

  socket.on('chat:read', ({ id } = {}) => {
    if (!id || !messages.has(id)) return;

    const meta = messages.get(id);
    
    if (meta.from === socket.id) return;

    
    const set = reads.get(id) || new Set();
    if (set.has(socket.id)) return;
    set.add(socket.id);
    reads.set(id, set);

    
    io.to(meta.from).emit('chat:read', { id, reader: socket.id, at: new Date().toISOString() });
  });

  socket.on('disconnect', () => {
    console.log(' disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(` http://localhost:${PORT}`);
});
