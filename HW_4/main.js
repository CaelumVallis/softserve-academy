import morseCode from './morse_code.js';

const ipCalc = (firstIp, secondIp) => {
	const toNum = (ip) => ip.reduce((acc, item) => +item + acc * 256);
	return toNum(secondIp.split('.')) - toNum(firstIp.split('.'));
};

// console.log(ipCalc('10.0.0.0', '10.0.0.50'));

const decodeMorse = (morse) => {
	const getKeyByValue = (object, value) => {
		return Object.keys(object).find((key) => object[key] === value);
	};

	const morseWords = morse
		.trim()
		.split('   ')
		.map((item) => item.split(' '));

	return morseWords
		.map((el) => {
			return el
				.map((item) => {
					return getKeyByValue(morseCode, item).toUpperCase();
				})
				.join('');
		})
		.join(' ');
};

// console.log(decodeMorse('.... . -.--   .--- ..- -.. .'));
