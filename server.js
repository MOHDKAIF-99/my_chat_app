const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8 // 100 MB buffer limit
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log(`[Connected] Socket ID: ${socket.id}`);

  // Join Room
  socket.on('join_room', (data) => {
    const room = typeof data === 'object' ? data.room : data;
    const username = typeof data === 'object' ? data.username : 'Anonymous';

    if (!room) return;

    socket.join(room);
    console.log(`[Room] ${socket.id} (${username}) joined "${room}"`);

    socket.to(room).emit('user_online', {
      username: username,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  // Relay Messages
  socket.on('send_message', (data) => {
    if (data && data.room) {
      io.to(data.room).emit('receive_message', data);
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Disconnected] Socket ID: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});