let socket = io();

socket.on('connect', () => {
	console.log('Connected to server.');
});

socket.on('disconnect', () => {
	console.log('Disconnected from the server.');
});

socket.on('newMessage', (message) => {
	console.log(message);

	let li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});


jQuery("#message-form").on('submit', (e) => {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, () => {

	});
});


// socket.on('newMessage', function (message) {
//   console.log('newMessage', message);
//   var li = jQuery('<li></li>');
//   li.text(`${message.from}: ${message.text}`);

//   jQuery('#messages').append(li);
// });

// jQuery('#message-form').on('submit', function (e) {
//   e.preventDefault();

//   socket.emit('createMessage', {
//     from: 'User',
//     text: jQuery('[name=message]').val()
//   }, function () {

//   });
// });