export default class ModelCart {
  #state = {
    orders: [],
  };
  #botToken = '1804031549:AAHJxCIcVxk2PgS-aKG1coQ4B-cXQrAGBHY';
  #chatId = '-552650591';

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

  makeOrder = ({ customer, order }) => {
    const storage = JSON.parse(this.getLocalStorage('orders')) || [];
    this.setLocalStorage('orders', JSON.stringify([...storage, order]));

    const minInfoStr = order
      .map((item, i) => {
        return `${i + 1}) name: ${item.PRODUCT_NAME}, quantity: ${item.quantity}, id: ${item.ID}`;
      })
      .join('\n');

    const orderString = `Customer: ${customer.name} ${customer.phone} ${
      customer.email
    }\n\n${minInfoStr}\n\n<b>ID: ${Date.now()}</b>`;

    fetch(
      `https://api.telegram.org/bot${this.#botToken}/sendMessage?chat_id=${
        this.#chatId
      }&parse_mode=html&text=${encodeURIComponent(orderString)}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  getItems = () => this.#state.orders;

  getLocalStorage = (key) => localStorage.getItem(key);
  setLocalStorage = (key, value) => localStorage.setItem(key, value);
}
