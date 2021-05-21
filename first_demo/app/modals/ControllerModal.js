import ViewModal from './ViewModal.js';

export default class ControllerModal {
  constructor(Publisher) {
    this.view = new ViewModal();

    Publisher.subscribe('UPDATE_PRODUCTS', this.init);
  }

  init = () => {
    this.view.init();
  };
}
