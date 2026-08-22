const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static assets (style.css, client-side JS)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});