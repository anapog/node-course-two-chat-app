const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	let users = [];

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'aba',
			room: 'A'
		}, {
			id: '2',
			name: 'bill',
			room: 'B'
		}, {
			id: '3',
			name: 'cris',
			room: 'A'
		}];
	});

	it('should add new user', () => {
		let users = new Users();
		let user = {
			id: '123',
			name: 'lala',
			room: 'kitchen'
		};

		let res = users.addUser(user.id, user.name, user.room);

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

	it('should return names for room A', () => {
		let res = users.getUserList('A');

		expect(res).toEqual(['aba', 'cris']);
	});

	it('should return names for room B', () => {
		let res = users.getUserList('B');

		expect(res).toEqual(['bill']);
	});

});