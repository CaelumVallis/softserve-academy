export default class ModelGallery {
	#URL =
		'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';

	fetchData() {
		fetch(this.#URL)
			.then((r) => r.json())
			.then((d) => this.parseData(d.feed.entry, 25));
	}

	parseData(arr, itemNumber) {
		const parsedData = [];

		arr.slice(0, itemNumber).map((item) => {
			//console.log(item);
			switch (item.gs$cell.col) {
				case 1: {
					console.log(item);
					break;
				}
				case 2: {
					break;
				}
				case 3: {
					break;
				}
				case 4: {
					break;
				}
				case 5: {
					break;
				}
				case 6: {
					break;
				}
				case 7: {
					break;
				}
				case 8: {
					break;
				}
				case 9: {
					break;
				}
			}
		});
	}
}
