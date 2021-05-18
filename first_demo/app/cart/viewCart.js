export default class ViewCart {
  #itemTemplate = `<li class="list-group-item order-item" data-id="{{ID}}">
  <span>{{NAME}}</span>
  <span>
  <i data-action="decrease" class="bi bi-chevron-left change-quantity-btn"></i>{{quantity}}<i data-action="increase" class="bi bi-chevron-right change-quantity-btn"></i>
  </span>
  <span>{{PRICE}}₴</span>
  <span><i class="bi bi-trash delete-btn"></i></span>
  </li>`;

  constructor(handleDeleteBtnClick, handleActionBtnClick, handleMakeOrderBtnClick) {
    this.cartModal = document.querySelector('#orderList');
    this.makeOrderBtn = document.querySelector('#makeOrderBtn');
    this.customerInfoInputs = document.querySelectorAll('.customer-data');

    this.makeOrderBtn.addEventListener('click', () => this.onMakeOrderBtnClick());

    this.handleDeleteBtnClick = handleDeleteBtnClick;
    this.handleActionBtnClick = handleActionBtnClick;
    this.handleMakeOrderBtnClick = handleMakeOrderBtnClick;
  }

  renderCart = (arr) => {
    this.cartModal.innerHTML = arr
      .map((item) => {
        return this.#itemTemplate
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
}
