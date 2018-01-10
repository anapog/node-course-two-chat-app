const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
  	from: 'example@message.com',
  	text: 'this is a test',
  	createdAt: Date.now()
  });

  socket.on('createMessage', (message) => {
  	console.log(message);
  });

  socket.on('disconnect', () => {
  	console.log('User disconnected');
  });
});

server.listen(port, () => {
	console.log(`The app is listening in port ${port}`);
})