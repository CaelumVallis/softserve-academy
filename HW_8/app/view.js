export default class View {
	constructor(search, data) {
		this.searchBtn = document.querySelector('#search_btn');
		this.cityInput = document.querySelector('#city_input');
		this.weatherInfo = document.querySelector('#weather_info');

		this.searchBtn.addEventListener('click', () => this.onSearchBtnClick());

		this.search = search;
	}

	onSearchBtnClick() {
		this.search(this.cityInput.value);
	}

	displayWeather(data) {
		if (!/20[01]/g.test(data.cod)) {
			this.weatherInfo.innerHTML = `<h3 style="color: red;">${data.message}</h3>`;
			return;
		}

		const {
			main: { temp },
			weather: {
				0: { description, icon },
			},
			sys: { country },
			name,
		} = data;

		this.weatherInfo.innerHTML = `<h3>${name}, ${country}</h3><h4>${Math.round(
			temp - 273.15
		)}°C, ${description}</h4><img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>`;
	}
}
