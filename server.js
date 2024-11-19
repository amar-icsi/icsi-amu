const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    socket.broadcast.to(room).emit('message', `${username} has joined the room.`);
  });

  socket.on('chatMessage', (msg) => {
    const room = Array.from(socket.rooms)[1]; // Get the joined room
    io.to(room).emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
