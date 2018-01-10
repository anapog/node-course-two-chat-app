let socket = io();

socket.on('connect', () => {
	console.log('Connected to server.');

	socket.emit('createMessage', {
		to: 'sending@email.com',
		text: 'I am sending an email'
	});
});

socket.on('newMessage', (message) => {
	console.log(message);
});

socket.on('disconnect', () => {
	console.log('Disconnected from the server.');
});