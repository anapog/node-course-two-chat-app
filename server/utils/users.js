class Users {

	constructor() {
		this.users = [];
	}
	addUser(id, name, room) {
		let roomName = room;
		room = room.toLowerCase();
		let user = {id, name, room, roomName};
		this.users.push(user);
		return user;
	}
	removeUser(id) {
		let user = this.getUser(id);

		if(user) {
			this.users = this.users.filter((user) => user.id !== id);
		}

		return user;
	}
	getUser(id) {
		let user = this.users.filter((user) => user.id === id)[0];

		return user;
	}
	checkUniqueUser(room, name) {
		let arrayNames = this.getUserList(room);

		return arrayNames.filter((userName) => userName.toLowerCase() === name.toLowerCase());
	}
	getUserList(room) {
		let users = this.users.filter((user) => user.room === room);
		let namesArray = users.map((user) => user.name);

		return namesArray;
	}
	getRoomList() {
		let roomsArray = this.users.map((user) => user.roomName);

		return roomsArray.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
	}

}

module.exports = {Users};