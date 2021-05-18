import ModelSide from './modelSide.js';
import ViewSide from './viewSide.js';

export default class ControlelrSide {
  constructor(Publisher) {
    this.model = new ModelSide();
    this.view = new ViewSide(this.handleCategoryChange, this.handleCategoriesRendered);

    this.publisher = Publisher;
    this.publisher.subscribe('UPDATE_PRODUCTS', this.handleDataLoad);
  }

  handleDataLoad = (data) => {
    this.view.renderCategories(this.model.getCategories(data));
  };

  handleCategoriesRendered = () => {
    this.publisher.unsubscribe('UPDATE_PRODUCTS');
  };

  handleCategoryChange = (value) => {
    this.publisher.notify('CHANGE_CATEGORY', value);
  };
}
