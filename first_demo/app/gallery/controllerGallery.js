import ModelGallery from './modelGallery.js';
import ViewGallery from './viewGallery.js';

export default class ControllerGallery {
  constructor(Publisher) {
    this.publisher = Publisher;
    this.model = new ModelGallery();
    this.view = new ViewGallery(
      this.handleCounterBtnClick,
      this.handleSortSelectorClick,
      this.handlePageBtnClick,
      this.handleAddBtnClick,
      this.handleInfoBtnClick
    );

    this.publisher.subscribe('CHANGE_CATEGORY', this.handleCategoryChange);
    this.publisher.subscribe('SEARCH_ITEM', this.handleSearch);

    //************
    this.load();
  }

  load = () => {
    //************
    this.view.showSpinner();

    //fetchData() -> parseData() -> cropToPage()

    return this.model.fetchData().then((r) => {
      this.view.renderItems(r);
      this.view.renderPagesTabs(this.model.getPages());
      this.publisher.notify('UPDATE_PRODUCTS', r);
    });
  };

  handleAddBtnClick = (id) => {
    this.publisher.notify('ADD_TO_CART', this.model.searchItem(id, 'id'));
  };

  handleCounterBtnClick = (e) => {
    this.model.setItemsCount(e.target.dataset.count);
    //************
    this.load();
    this.view.renderPagesTabs(this.model.getPages());
  };

  handleSortSelectorClick = (e) => {
    this.model.sortItems(e.target.dataset.option);
    this.view.renderItems(this.model.getItems());
  };

  handleCategoryChange = (category) => {
    this.view.renderItems(this.model.getItems(category));
  };

  handleSearch = (value) => {
    this.view.renderItems(this.model.searchItem(value, 'string'));
  };

  handlePageBtnClick = (e) => {
    this.model.navigateTo(e.target.textContent);
    //************
    this.load();
  };

  handleInfoBtnClick = (id) => {
    this.view.renderItemInfo(this.model.searchItem(id, 'id'));
  };
}
