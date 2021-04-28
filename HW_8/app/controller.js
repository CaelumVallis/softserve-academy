import Model from './model.js';
import View from './view.js';

export default class Controller {
	constructor() {
		this.model = new Model(this.displayWeather);
		this.view = new View(this.handleSearchClick);
	}

	handleSearchClick = (city) => {
		this.model.onSearchBtnClick(city);
	};

	displayWeather = (data) => {
		this.view.displayWeather(data);
	};
}
