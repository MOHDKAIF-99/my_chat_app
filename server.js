const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Increase memory limit to 100MB to allow sending pictures, voice notes, and long videos
const io = new Server(server, {
  maxHttpBufferSize: 1e8 // 100 Megabytes limit
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.roomId).emit('receiveMessage', data);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});