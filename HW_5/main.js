const quipuCalc = (exp) => {
	const action = exp[exp.slice('').search(/[-*+:\/]/)];
	const mathArgs = exp.split(action);

	const nums = mathArgs.map((knots) => {
		knots[knots.length - 1] === '~' ? (knots = knots.slice(0, -1)) : null;
		return +knots
			.split('~')
			.map((item) => (item === '' ? 0 : item.length))
			.join('');
	});

	let result;
	switch (action) {
		case '*': {
			result = nums[0] * nums[1];
			break;
		}
		case ':' || '/': {
			result = nums[0] / nums[1];
			break;
		}
		case '+': {
			result = nums[0] + nums[1];
			break;
		}
		case '-': {
			result = nums[0] - nums[1];
			break;
		}
	}

	return String(result)
		.split('')
		.map((item) => (+item ? '@'.repeat(+item) : '~'))
		.join('~');
};

// console.log(quipuCalc('@~@@*@@'));

const findPartMaxProd = (num) => {
	let temp = [];

	const partition = (n, limit, resArr) => {
		if (n > 0) {
			const k = Math.min(n, limit);
			for (let i = k; i > 0; i--) {
				partition(n - i, i, [...resArr, i]);
			}
		} else {
			temp = [...temp, [resArr, resArr.reduce((acc, item) => (acc *= item))]];
		}

		return temp;
	};

	const res = partition(num, num, []).sort((a, b) => b[1] - a[1]);

	return res.reduce(
		(acc, item) => {
			if (item[1] > acc[0][1]) {
				acc[0] = item;
				return acc;
			}

			if (item[1] === acc[0][1]) {
				acc = [...acc, item];
				return acc;
			}
			return acc;
		},
		[[[], 0]]
	);
};

// console.log(findPartMaxProd(10));

const isEveryoneAtShow = (cashArr) => {
	const result = cashArr.reduce((acc, item) => {
		if (item === 50) {
			const index = acc.indexOf(25);
			if (index > -1) {
				acc.splice(index, 1, 50);
				return acc;
			}
			return [false, ...acc];
		}

		if (item === 100) {
			const twfBills = acc.filter((item) => item === 25).length;
			const fifBills = acc.filter((item) => item === 50).length;

			if (fifBills >= 1 && twfBills >= 1) {
				acc.splice(acc.indexOf(25), 1);
				acc.splice(acc.indexOf(50), 1, 100);
				return acc;
			}

			if (twfBills >= 3) {
				acc.sort((a, b) => a - b);
				acc.splice(0, 3, 100);
				return acc;
			}

			return [false, ...acc];
		}

		return [...acc, item];
	}, []);

	return result[0] ? 'YES' : 'NO';
};

// console.log(isEveryoneAtShow([25, 25, 50]));
