export default class ViewModal {
  init = () => {
    this.toggleCartBtn = document.querySelector('#toggleCartBtn');
    this.cartModal = document.querySelector('#cartModal');
    this.toggleOrdersHistoryBtn = document.querySelector('#toggleOrdersHistoryBtn');
    this.ordersHistoryModal = document.querySelector('#ordersHistoryModal');
    this.toggleItemInfoBtn = document.querySelectorAll('.info-btn');
    this.itemInfoModal = document.querySelector('#itemInfoModal');
    this.closeModalBtn = document.querySelectorAll('.btn-close');
    this.validationContainer = document.querySelector('#validationContainer');

    this.toggleCartBtn.addEventListener('click', () => this.openModal(this.cartModal));
    this.toggleOrdersHistoryBtn.addEventListener('click', () => this.openModal(this.ordersHistoryModal));
    this.toggleItemInfoBtn.forEach((item) => {
      item.addEventListener('click', () => this.openModal(this.itemInfoModal));
    });
    this.closeModalBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
    });
  };

  openModal = (element) => {
    element.classList.add('show');
    element.style.display = 'block';
    document.querySelector('#backdrop').style.display = 'block';
    document.querySelector('body').classList.add('modal-open');
  };

  closeModal = (element) => {
    element.classList.remove('show');
    element.style.display = 'none';
    document.querySelector('#backdrop').style.display = 'none';
    document.querySelector('body').classList.remove('modal-open');
    this.validationContainer.innerHTML = '';
  };
}
