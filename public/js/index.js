let socket = io();

socket.on('roomsList', (rooms) => {
	rooms.unshift('');
	let select = jQuery('<select></select>');

	rooms.forEach((room) => {
		select.append(jQuery('<option></option>').val(room).text(room));
	});

	jQuery('#activeRooms').html(select);
});

let activeRooms = jQuery('#activeRooms');
activeRooms.on('click', (e) => {
	let selectedRoom = e.target.value;

	socket.emit('roomSelected', selectedRoom);
})
