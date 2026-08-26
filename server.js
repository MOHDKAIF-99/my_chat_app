const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log(`[Connected] Socket ID: ${socket.id}`);

  // 1. Join Room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`[Room] ${socket.id} joined "${room}"`);
  });

  // 2. Messaging
  socket.on('send_message', (data) => {
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`[Disconnected] Socket ID: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  
});