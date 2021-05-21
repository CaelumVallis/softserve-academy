import ModelCart from './modelCart.js';
import ViewCart from './viewCart.js';

export default class ControllerCart {
  constructor(Publisher) {
    this.model = new ModelCart(this.handleStatusMessage);
    this.view = new ViewCart(this.handleDeleteBtnClick, this.handleActionBtnClick, this.handleMakeOrderBtnClick);

    Publisher.subscribe('ADD_TO_CART', this.handleAddToCart);
    this.load();
  }

  load = () => {
    this.view.renderOrdersHistory(JSON.parse(this.model.getLocalStorage('orders')));
  };

  handleAddToCart = (item) => {
    this.model.addToCart(item);
    this.view.renderCart(this.model.getItems());
  };

  handleDeleteBtnClick = (id) => {
    this.model.deleteFromCart(id);
    this.view.renderCart(this.model.getItems());
  };

  handleActionBtnClick = (id, action) => {
    this.model.changeQuantity(id, action);
    this.view.renderCart(this.model.getItems());
  };

  handleMakeOrderBtnClick = (orderInfo) => {
    this.model.makeOrder({ customer: orderInfo, order: this.model.getItems() });
    this.updateOrdersHistory();
  };

  updateOrdersHistory = () => {
    this.view.renderOrdersHistory(JSON.parse(this.model.getLocalStorage('orders')));
  };

  handleStatusMessage = (msg) => {
    this.view.renderValidationMessage(msg);
  };
}
