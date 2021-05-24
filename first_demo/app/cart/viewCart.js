export default class ViewCart {
  constructor(handleDeleteBtnClick, handleActionBtnClick, handleMakeOrderBtnClick) {
    this.cartModal = document.querySelector('#orderList');
    this.makeOrderBtn = document.querySelector('#makeOrderBtn');
    this.customerInfoInputs = document.querySelectorAll('.customer-data');
    this.ordersHistoryContainer = document.querySelector('#ordersHistoryModalBody');
    this.itemTemplate = document.querySelector('#cartItemTemplate').innerHTML;
    this.validationContainer = document.querySelector('#validationContainer');

    this.makeOrderBtn.addEventListener('click', () => this.onMakeOrderBtnClick());

    this.handleDeleteBtnClick = handleDeleteBtnClick;
    this.handleActionBtnClick = handleActionBtnClick;
    this.handleMakeOrderBtnClick = handleMakeOrderBtnClick;
  }

  renderCart = (arr) => {
    let totalPrice = 0;
    this.cartModal.innerHTML = arr
      .map((item) => {
        totalPrice += +item.PRICE;
        return this.itemTemplate
          .replace('{{ID}}', item.ID)
          .replace('{{NAME}}', item.PRODUCT_NAME)
          .replace('{{quantity}}', item.quantity)
          .replace('{{PRICE}}', item.PRICE);
      })
      .join('');

    this.removeBtns = document.querySelectorAll('.delete-btn');
    this.actionBtns = document.querySelectorAll('.change-quantity-btn');

    this.removeBtns.forEach((item) => {
      item.addEventListener('click', (e) => this.handleDeleteBtnClick(e.target.closest('.order-item').dataset.id));
    });

    this.actionBtns.forEach((item) => {
      item.addEventListener('click', (e) =>
        this.handleActionBtnClick(e.target.closest('.order-item').dataset.id, e.target.dataset.action)
      );
    });
  };

  onMakeOrderBtnClick = () => {
    const orderInfo = {};
    this.customerInfoInputs.forEach((item) => {
      orderInfo[item.dataset.info] = item.value;
    });
    this.handleMakeOrderBtnClick(orderInfo);
  };

  renderOrdersHistory = (arr) => {
    if (!arr) {
      this.ordersHistoryContainer.innerHTML = '<h5>Пока нет заказов :/</h5>';
      return;
    }
    this.ordersHistoryContainer.innerHTML = arr
      .map((el, elIndex) => {
        return `<h5>№${elIndex + 1}</h5>${el
          .map((item) => {
            return `<p>${item.PRODUCT_NAME} x${item.quantity}</p>`;
          })
          .join('')}`;
      })
      .join('');
  };

  renderValidationMessage = (msg) => {
    this.validationContainer.innerHTML = msg[0]
      ? `<span class='text-success'>${msg[1]}</span>`
      : `<span class='text-danger'>${msg[1]}</span>`;
  };
}
