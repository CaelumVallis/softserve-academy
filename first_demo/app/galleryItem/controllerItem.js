import ModelItem from './modelItem.js';
import ViewItem from './viewItem.js';

export default class ControllerItem {
	constructor() {
		this.model = new ModelItem();
		this.view = new ViewItem(this.handleAddBtnClick);
	}

	handleAddBtnClick = (title, info) => {
		this.model.addToCart({ title, info });
	};
}
