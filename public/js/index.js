let socket = io();

function scrollToBottom() {
	// Selectors
	let messages = jQuery('#messages');
	//let newMessage = messages.children('li:last-child')
	// Heights
	let clientHeight = messages.prop('clientHeight');
	let scrollTop = messages.prop('scrollTop');
	let scrollHeight = messages.prop('scrollHeight');
	let newMessageHeight = newMessage.innerHeight();
	//let lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);	
	}
};


socket.on('connect', () => {
	console.log('Connected to server.');
});

socket.on('disconnect', () => {
	console.log('Disconnected from the server.');
});

socket.on('newMessage', (message) => {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#location-message-template').html();
	let html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

let messageTextbox = jQuery('[name=message]');
jQuery("#message-form").on('submit', (e) => {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, () => {
		messageTextbox.val('');
	});
});

let locationButton = jQuery('#send-location');
locationButton.on('click', () => {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition((position) => {
		locationButton.removeAttr('disabled').text('Send location');

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});
