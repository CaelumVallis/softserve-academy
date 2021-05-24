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
      this.handleInfoBtnClick,
      this.handleItemsRender
    );

    this.publisher.subscribe('CHANGE_CATEGORY', this.handleCategoryChange);
    this.publisher.subscribe('SEARCH_ITEM', this.handleSearch);

    this.load();
  }

  load = () => {
    this.view.showSpinner();

    return this.model.fetchData().then(() => {
      this.view.renderItems(this.model.cropToPage(this.model.getItems()));
      this.view.renderPagesTabs(this.model.getPages());
      this.publisher.notify('UPDATE_PRODUCTS', this.model.getItems());
    });
  };

  handleItemsRender = () => {
    this.publisher.notify('ITEMS_RENDER');
  };

  handleAddBtnClick = (id) => {
    this.publisher.notify('ADD_TO_CART', this.model.searchItem(id, 'id'));
  };

  handleCounterBtnClick = (e) => {
    this.model.setItemsCount(e.target.dataset.count);

    const currentPage = this.model.getCurrentPage();
    const totalPages = this.model.getPages();

    if (currentPage > totalPages) {
      this.model.navigateTo(totalPages);
    }

    this.view.renderItems(this.model.cropToPage(this.model.getCurrentItems()));
    this.view.renderPagesTabs(this.model.getPages());
  };

  handleSortSelectorClick = (e) => {
    this.model.sortItems(e.target.dataset.option);
    this.view.renderItems(this.model.cropToPage(this.model.getCurrentItems()));
  };

  handleCategoryChange = (category) => {
    this.model.navigateTo(1);
    this.model.setCurrentItems(this.model.getItems(category));
    this.view.renderPagesTabs(this.model.getPages());
    this.view.renderItems(this.model.cropToPage(this.model.getCurrentItems()));
  };

  handleSearch = (value) => {
    this.view.renderItems(this.model.searchItem(value, 'string'));
    this.view.renderPagesTabs(this.model.getPages());
  };

  handlePageBtnClick = (e) => {
    this.model.navigateTo(e.target.textContent);
    this.view.renderItems(this.model.cropToPage(this.model.getCurrentItems()));
  };

  handleInfoBtnClick = (id) => {
    this.view.renderItemInfo(this.model.searchItem(id, 'id'));
  };
}
