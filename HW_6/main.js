class Hex {
	constructor(num) {
		this.num = num;
		return this.num;
	}

	toString() {
		return `0x${this.num.toString(16).toUpperCase()}`;
	}

	toJSON() {
		return this.toString();
	}

	valueOf() {
		return this.num;
	}

	plus(term) {
		this.num += term;
		return this;
	}

	minus(deductible) {
		this.num -= deductible;
		return this;
	}

	static parse(num) {
		return parseInt(num, 16);
	}
}

console.log(new Hex(15).plus(1).plus(16).toString());

class Dictionary {
	state = {};

	newEntry(word, definition) {
		this.state[word] = definition;
	}

	look(word) {
		return this.state[word] || `Can't find entry for ${word}`;
	}
}

// const d = new Dictionary();
// d.newEntry('Apple', 'A fruit that grows on trees');
// console.log(d.look('Apple'));
//console.log(d.look("Banana"));
