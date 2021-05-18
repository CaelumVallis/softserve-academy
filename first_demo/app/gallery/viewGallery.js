export default class ViewGallery {
  constructor(handleCounterBtnClick, handleSortSelectorClick, handlePageBtnClick, handleAddBtnClick) {
    this.cardTemplate = document.querySelector('#galleryCardTemplate').innerHTML;
    this.spinnerTemplate = document.querySelector('#loadingSpinner').innerHTML;
    this.galleryContent = document.querySelector('#galleryContent');
    this.itemCountBtns = document.querySelectorAll('.items-count-btn');
    this.sortSelectorBtns = document.querySelectorAll('.sort-selector');
    this.pagesContainer = document.querySelector('#pagesContainer');
    this.infoModal = document.querySelector('#itemInfoModal .modal-body');

    this.itemCountBtns.forEach((item) => {
      item.addEventListener('click', (e) => this.onCounterBtnClick(e));
    });

    this.sortSelectorBtns.forEach((item) => {
      item.addEventListener('click', (e) => this.onSortSelectorClick(e));
    });

    this.handlePageBtnClick = handlePageBtnClick;
    this.handleCounterBtnClick = handleCounterBtnClick;
    this.handleSortSelectorClick = handleSortSelectorClick;
    this.handleAddBtnClick = handleAddBtnClick;
  }

  showSpinner = () => {
    this.galleryContent.innerHTML = this.spinnerTemplate;
  };

  renderItems = (itemsArr) => {
    if (!Array.isArray(itemsArr)) {
      itemsArr = [itemsArr];
    }
    this.galleryContent.innerHTML = itemsArr
      .map((item) => {
        return this.cardTemplate
          .replace('{{IMG_LINK}}', item.IMG_LINK)
          .replace('{{PRODUCT_NAME}}', item.PRODUCT_NAME)
          .replace('{{CATEGORY}}', item.CATEGORY)
          .replace('{{AMOUNT}}', item.AMOUNT)
          .replace('{{MANUFACTURE}}', item.MANUFACTURE)
          .replace('{{ID}}', item.ID)
          .replace('{{PRICE}}', `${item.PRICE}₴`);
      })
      .join('');

    this.addBtn = document.querySelectorAll('.add-btn');
    this.infoBtn = document.querySelector('.info-btn');
    this.addBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.onAddBtnClick(e));
    });
    this.infoBtn.addEventListener('click', (e) => this.onInfoBtnClick(e));
  };

  renderPagesTabs = (number) => {
    //можно переделать под text/template
    let links = ``;
    for (let i = 0; i < number; i++) {
      links += `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>`;
    }
    this.pagesContainer.innerHTML = `
    <li class="page-item">
    <a class="page-link" href="#">Previous</a>
    </li>
    ${links}
    <li class="page-item">
    <a class="page-link" href="#">Next</a>
    </li>`;

    this.pageCountBtns = document.querySelectorAll('.page-link');
    this.pageCountBtns.forEach((item) => {
      item.addEventListener('click', (e) => this.onPageBtnClick(e));
    });
  };

  onCounterBtnClick = (e) => {
    this.itemCountBtns.forEach((item) => item.classList.remove('active'));
    e.target.classList.add('active');
    this.handleCounterBtnClick(e);
  };

  onAddBtnClick = (e) => {
    const itemId = e.target.closest('.item-body').querySelector('.item-id').innerText;
    this.handleAddBtnClick(itemId);
  };

  onInfoBtnClick = (e) => {
    const itemId = e.target.closest('.item-body').querySelector('.item-id').innerText;
    this.infoModal.innerHTML = `<p>${itemId}</p>`;
  };

  onSortSelectorClick = (e) => {
    this.handleSortSelectorClick(e);
  };

  onPageBtnClick = (e) => {
    this.handlePageBtnClick(e);
  };
}
