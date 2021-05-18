import ModelHeader from './modelHeader.js';
import ViewHeader from './viewHeader.js';

export default class ControllerHeader {
  constructor(Publisher) {
    this.model = new ModelHeader();
    this.view = new ViewHeader(this.handleSearch);

    this.publisher = Publisher;
  }

  handleSearch = (value) => {
    this.publisher.notify('SEARCH_ITEM', value);
  };
}
