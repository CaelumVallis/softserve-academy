export default class ModelCart {
  #state = {
    orders: [],
  };

  addToCart = (el) => {
    const order = { ...el, quantity: 1 };

    if (this.#state.orders.length === 0) {
      this.#state.orders.push(order);
      return;
    }

    const sameItemIndex = this.#state.orders.findIndex((item) => item.ID === order.ID);
    sameItemIndex === -1 ? this.#state.orders.push(order) : this.#state.orders[sameItemIndex].quantity++;
  };

  deleteFromCart = (id) => {
    this.#state.orders = this.#state.orders.filter((item) => item.ID !== id);
  };

  changeQuantity = (id, action) => {
    let idToDelete;
    this.#state.orders = this.#state.orders.map((item) => {
      if (item.ID === id) {
        if (action === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (action === 'decrease') {
          if (item.quantity === 1) {
            idToDelete = item.ID;
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    this.deleteFromCart(idToDelete);
  };

  makeOrder = (order) => {
    console.log(order);
  };

  getItems = () => this.#state.orders;
}
