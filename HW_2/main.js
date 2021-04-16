const task1 = (array) => {
	const result = array.map((item) => {
		return item.sort((a, b) => a - b);
	});

	return result.reduce((acc, item) => (acc += item[0]), 0);
};

// console.log(
// 	task1([
// 		[2, 1],
// 		[3, 5, 5, 6],
// 		[11, 15, 10],
// 	])
// );

const task2 = (array) => {
	return array
		.sort((a, b) => b - a)
		.slice(0, 2)
		.reverse();
};

// console.log(task2([1, 2, 10, 8, 56, 13, 77, 4, 88]));

const task3 = (str) => {
	return str
		.trim()
		.split(' ')
		.reduce((shortest, current) => {
			return current.length < shortest.length ? current : shortest;
		}).length;
};

// console.log(task3('Lets all go on holiday somewhere very cold'));
