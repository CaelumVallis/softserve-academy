const task1 = (L, W, H) => Math.ceil(((L + W) * H * 2) / 16);

//console.log(task1(10, 5, 3));

const task2 = (A1, A2, A3, B1, B2, B3) => {
	const sortedSand = [A1, A2, A3].sort((a, b) => b - a);
	const sortedBoxes = [B1, B2, B3].sort((a, b) => b - a);
	return sortedBoxes.reduce((acc, item, index) => (acc += item * sortedSand[index]), 0);
};

//console.log(task2(777, 228, 4, 2, 3, 4));

const task3 = (ticket) => {
	const ticketArr = ticket.toString().split('');
	const nullArr = new Array(6).fill('0');
	nullArr.forEach((item, index) => {
		nullArr[index] = ticketArr[index] || '0';
	});
	const firstSum = nullArr.slice(0, 3).reduce((acc, item) => acc + Number(item), 0);
	const secondSum = nullArr.slice(3, 6).reduce((acc, item) => acc + Number(item), 0);
	if (firstSum === secondSum) return 'YES';
	return 'NO';
};

//console.log(task3(123321));
