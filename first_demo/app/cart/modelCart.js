export default class ModelCart {
  #state = {
    orders: [],
  };
  #botToken = '1804031549:AAHJxCIcVxk2PgS-aKG1coQ4B-cXQrAGBHY';
  #chatId = '-552650591';

  constructor(handleStatusMessage) {
    this.handleStatusMessage = handleStatusMessage;
  }

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
    const validation = this.validate(customer, order);
    if (!validation.status) {
      this.handleStatusMessage([validation.status, validation.error]);
      return;
    }

    const storage = JSON.parse(this.getLocalStorage('orders')) || [];
    this.setLocalStorage('orders', JSON.stringify([...storage, order]));

    const minInfoStr = order
      .map((item, i) => {
        return `${i + 1}) name: ${item.PRODUCT_NAME}, quantity: ${item.quantity}, id: ${item.ID}`;
      })
      .join('\n');

    const orderId = Date.now();
    const orderString = `Customer: ${customer.name} ${customer.phone} ${customer.email}\n\n${minInfoStr}\n\n<b>ID: ${orderId}</b>`;

    fetch(
      `https://api.telegram.org/bot${this.#botToken}/sendMessage?chat_id=${
        this.#chatId
      }&parse_mode=html&text=${encodeURIComponent(orderString)}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          this.handleStatusMessage([data.ok, `Ваш заказ №${orderId} успешно принят!`]);
        }
        if (!data.ok) {
          console.log(data);
        }
      });
  };

  validate = (customerInfo, order) => {
    const regexName = /^[a-zA-Z ]{2,30}$/;
    const regexPhone =
      /^(?:\+38)?(?:\(0[0-9][0-9]\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9][0-9][0-9]{7})$/gm;
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (order.length === 0) return { status: false, error: 'Корзина пуста' };
    if (!regexName.test(String(customerInfo.name)))
      return { status: false, error: 'Введите имя длиной от 2 до 30 символов' };
    if (!regexPhone.test(String(customerInfo.phone)))
      return { status: false, error: 'Введите корректный номер телефона' };
    if (!regexEmail.test(String(customerInfo.email).toLowerCase()))
      return { status: false, error: 'Введите корректный e-mail' };
    return { status: true };
  };

  getItems = () => this.#state.orders;

  getLocalStorage = (key) => localStorage.getItem(key);
  setLocalStorage = (key, value) => localStorage.setItem(key, value);
}
