export default class Model {
	URL_TEMPLATE = `https://api.openweathermap.org/data/2.5/weather?q={{city}}&appid=3f0564f4ed80e38c01a55dded9b8f820`;

	constructor(displayWeather) {
		this.displayWeather = displayWeather;
	}

	load() {
		return fetch(this.url)
			.then((r) => r.json())
			.then((d) => this.displayWeather(d));
	}

	onSearchBtnClick = (city) => {
		this.updateUrl(city);
		this.load();
	};

	updateUrl = (city) => {
		this.url = this.URL_TEMPLATE.replace(`{{city}}`, `${city}`);
	};
}
