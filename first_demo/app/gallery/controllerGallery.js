import ModelGallery from './modelGallery.js';
import ViewGallery from './viewGallery.js';

export default class ControllerGallery {
	constructor() {
		this.model = new ModelGallery();
		this.view = new ViewGallery();
	}

	load() {
		this.model.fetchData();
	}
}
