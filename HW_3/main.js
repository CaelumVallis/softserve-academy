const sortStrings = (string) => {
	return string
		.split(' ')
		.reduce((acc, item) => {
			acc[item.match(/\d/)[0]] = item;
			return acc;
		}, [])
		.filter(() => true);
};

// console.log(sortStrings('is2 Thi1s T4est 3a'));

const tickTackToe = (array) => {
	let result = 0;
	const winningConditions = [
		[array[0][0], array[0][1], array[0][2]],
		[array[1][0], array[1][1], array[1][2]],
		[array[2][0], array[2][1], array[2][2]],
		[array[0][0], array[1][0], array[2][0]],
		[array[0][1], array[1][1], array[2][1]],
		[array[0][2], array[1][2], array[2][2]],
		[array[0][0], array[1][1], array[2][2]],
		[array[0][2], array[1][1], array[2][0]],
	];
	if (array.some((item) => item.length !== 3)) {
		return (result = -1);
	} else {
		winningConditions.forEach((item) => {
			if (item.every((el) => el === 1)) {
				return (result = 1);
			} else if (item.every((el) => el === 2)) {
				return (result = 2);
			}
		});
	}
	return result;
};

// console.log(
// 	tickTackToe([
// 		[0, 0, 1],
// 		[0, 1, 2],
// 		[1, 1, 0],
// 	])
// );

const meeting = (array, targetAmount) => {
	if (targetAmount === 0) {
		console.log('Game on!');
		return;
	}
	const freeChairsArr = array.map((item) => {
		const freeChairs = item[1] - item[0].length;
		return freeChairs > 0 ? freeChairs : 0;
	});
	const chairsSum = freeChairsArr.reduce((acc, item) => (acc += item));

	switch (true) {
		case chairsSum == targetAmount:
			console.log(freeChairsArr);
			break;
		case chairsSum < targetAmount:
			console.log('Not enough!');
			break;
		case chairsSum > targetAmount: {
			let sum = 0;
			let roomNumber = 0;

			freeChairsArr.forEach((item) => {
				if (sum + item <= targetAmount) {
					sum += item;
					roomNumber++;
				}
			});

			const result = [...freeChairsArr.slice(0, roomNumber), targetAmount - sum];

			console.log(result);
			break;
		}
		default:
			break;
	}
};

// meeting(
// 	[
// 		['XXX', 1],
// 		['XXXXXX', 6],
// 		['X', 2],
// 		['XXXXXX', 8],
// 		['X', 3],
// 		['XXX', 1],
// 	],
// 	5
// );
