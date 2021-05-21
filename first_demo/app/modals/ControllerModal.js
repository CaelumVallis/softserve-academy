import ViewModal from './ViewModal.js';

export default class ControllerModal {
  constructor(Publisher) {
    this.view = new ViewModal();

    Publisher.subscribe('ITEMS_RENDER', this.init);
  }

  init = () => {
    this.view.init();
  };
}
