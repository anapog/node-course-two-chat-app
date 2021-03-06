const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	let users = [];

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'aba',
			roomName: 'A',
			room: 'a'
		}, {
			id: '2',
			name: 'bill',
			roomName: 'B',
			room: 'b'
		}, {
			id: '3',
			name: 'cris',
			roomName: 'A',
			room: 'a'
		}];
	});

	it('should add new user', () => {
		let users = new Users();
		let user = {
			id: '123',
			name: 'lala',
			roomName: 'KITCHEN'
		};

		let res = users.addUser(user.id, user.name, user.roomName);

		user.room = user.roomName.toLowerCase();
		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		let user = users.removeUser('1');

		expect(user.id).toBe('1');
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		let user = users.removeUser('11');

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		let user = users.getUser('1');

		expect(user.id).toBe('1');
		expect(user).toEqual(users.users[0]);
	});

	it('should not find user', () => {
		let user = users.getUser('5');

		expect(user).toNotExist();
	});

	it('should detect duplicated user names', () => {
		let room = 'a';
		let name = 'aba';

		let res = users.checkUniqueUser(room, name);
		expect(res.length).toBe(1);
		expect(res).toEqual(['aba']);
	});

	it('should not detect duplicated user names', () => {
		let room = 'a';
		let name = 'example';

		let res = users.checkUniqueUser(room, name);
		expect(res.length).toBe(0);
		expect(res).toEqual([]); 
	});

	it('should return names for room A', () => {
		let res = users.getUserList('a');

		expect(res).toEqual(['aba', 'cris']);
	});

	it('should return names for room B', () => {
		let res = users.getUserList('b');

		expect(res).toEqual(['bill']);
	});

	it('should return the list of rooms available', () => {
		let res = users.getRoomList();

		expect(res).toEqual(['A', 'B']);
	});

});