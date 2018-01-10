const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		let from = 'ana';
		let text = 'this is a test using mocha';
		let message = generateMessage(from, text);
		expect(message).toInclude({from, text});
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location message object', () => {
		let from = 'ana';
		let latitude = 42.5750554;
		let longitude = -8.1360445;
		let url = `https://www.google.com/maps?q=${latitude},${longitude}`;

		let message = generateLocationMessage(from, latitude, longitude);
		expect(message).toInclude({from, url});
		expect(message.createdAt).toBeA('number');
	});
});