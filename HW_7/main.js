class PaginationHelper {
	constructor(itemsArr, itemsPerPage) {
		this.itemsCount = itemsArr.length;
		this.perPage = itemsPerPage;
	}

	itemCount() {
		return this.itemsCount;
	}

	pageCount() {
		return Math.ceil(this.itemsCount / this.perPage);
	}

	pageItemCount(page) {
		const completePages = page * this.perPage;
		const itemsLength = this.itemsCount;

		if (page === 0) {
			return itemsLength <= this.perPage ? itemsLength : this.perPage;
		}

		return page < this.pageCount() ? itemsLength - completePages : -1;
	}

	pageIndex(index) {
		const johnCena = index / this.perPage;

		if (index > this.itemsCount || index < 0) {
			return -1;
		}

		return johnCena > 1 ? Math.floor(johnCena) : 0;
	}
}

const helper = new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);

// console.log(helper.pageIndex(-10));

// helper.pageCount(); //should == 2
// helper.itemCount(); //should == 6
// helper.pageItemCount(0); //should == 4
// helper.pageItemCount(1); // last page - should == 2
// helper.pageItemCount(2); // should == -1 since the page is invalid

// // pageIndex takes an item index and returns the page that it belongs on
// helper.pageIndex(5); //should == 1 (zero based index)
// helper.pageIndex(2); //should == 0
// helper.pageIndex(20); //should == -1
// helper.pageIndex(-10); //should == -1

class Fighter {
	constructor(name, health, damagePerAttack) {
		this.name = name;
		this.health = health;
		this.damagePerAttack = damagePerAttack;
	}

	toString() {
		return this.name;
	}
}

function declareWinner(fighter1, fighter2, firstAttacker) {
	const fighter1DeathStreak = Math.ceil(fighter2.health / fighter1.damagePerAttack);
	const fighter2DeathStreak = Math.ceil(fighter1.health / fighter2.damagePerAttack);

	if (fighter1DeathStreak === fighter2DeathStreak) {
		return `Winner is ${firstAttacker}`;
	}

	if (fighter1DeathStreak < fighter2DeathStreak) {
		return `Winner is ${fighter1.name}`;
	}

	if (fighter2DeathStreak < fighter1DeathStreak) {
		return `Winner is ${fighter2.name}`;
	}
}

// console.log(declareWinner(new Fighter('Ivan', 10, 2), new Fighter('Jonas', 5, 4), 'Ivan'));
