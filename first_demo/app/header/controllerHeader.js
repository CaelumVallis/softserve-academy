import ViewHeader from './viewHeader.js';

export default class ControllerHeader {
  constructor(Publisher) {
    this.view = new ViewHeader(this.handleSearch);

    this.publisher = Publisher;
  }

  handleSearch = (value) => {
    this.publisher.notify('SEARCH_ITEM', value);
  };
}
