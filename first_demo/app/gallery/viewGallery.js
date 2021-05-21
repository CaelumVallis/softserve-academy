export default class ViewGallery {
  constructor(
    handleCounterBtnClick,
    handleSortSelectorClick,
    handlePageBtnClick,
    handleAddBtnClick,
    handleInfoBtnClick
  ) {
    this.cardTemplate = document.querySelector('#galleryCardTemplate').innerHTML;
    this.spinnerTemplate = document.querySelector('#loadingSpinner').innerHTML;
    this.itemInfoTemplate = document.querySelector('#itemInfoTemplate').innerHTML;
    this.galleryContent = document.querySelector('#galleryContent');
    this.itemCountBtns = document.querySelectorAll('.items-count-btn');
    this.sortSelectorBtns = document.querySelectorAll('.sort-selector');
    this.pagesContainer = document.querySelector('#pagesContainer');
    this.infoModal = document.querySelector('#itemInfoModal .modal-body');
    this.accordionSort = document.querySelector('#accordionSort');
    this.accordionSortBtn = document.querySelector('#accordionSortBtn');

    this.accordionSortBtn.addEventListener('click', () => this.onSortAccordionClick());

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
    this.handleInfoBtnClick = handleInfoBtnClick;
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
    this.infoBtn = document.querySelectorAll('.info-btn');
    this.addBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.onAddBtnClick(e));
    });
    this.infoBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.onInfoBtnClick(e));
    });
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

  renderItemInfo = (item) => {
    let templateString = this.itemInfoTemplate;
    for (const key in item) {
      templateString = templateString.replaceAll(`{{${key}}}`, item[key]);
    }
    this.infoModal.innerHTML = templateString;
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
    this.handleInfoBtnClick(itemId);
  };

  onSortSelectorClick = (e) => {
    this.handleSortSelectorClick(e);
  };

  onSortAccordionClick = () => {
    this.accordionSortBtn.classList.toggle('show');
    this.accordionSort.classList.toggle('show');
  };

  onPageBtnClick = (e) => {
    this.handlePageBtnClick(e);
  };
}
