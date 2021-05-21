export default class ViewSide {
  constructor(handleCategoryChange, handleCategoriesRender) {
    this.categoriesList = document.querySelector('.categories-list');
    this.accordionCategoriesBtn = document.querySelector('#accordionCategoriesBtn');
    this.accordionCategories = document.querySelector('#accordionCategories');

    this.accordionCategoriesBtn.addEventListener('click', () => this.onAccordionClick());

    this.handleCategoryChange = handleCategoryChange;
    this.handleCategoriesRender = handleCategoriesRender;
  }

  onCategorySelectorClick = (e) => {
    let category = e.target.textContent;
    if (e.target.classList.contains('reset')) {
      category = '';
      this.onAccordionClick();
    }
    this.handleCategoryChange(category);
  };

  renderCategories = (categoriesArr) => {
    this.categoriesList.innerHTML = '';
    categoriesArr.forEach((item) => {
      this.categoriesList.innerHTML += `<a href='#' class="list-item category-selector">${item}</a>`;
    });
    this.categoriesList.innerHTML += `<a href='#' class="list-item reset category-selector">Сброс категорий</a>`;
    this.initializeCategoriesActions();
  };

  initializeCategoriesActions = () => {
    this.categoriesSelector = document.querySelectorAll('.category-selector');
    this.categoriesSelector.forEach((item) => {
      item.addEventListener('click', (e) => this.onCategorySelectorClick(e));
    });
    this.handleCategoriesRender();
  };

  onAccordionClick = () => {
    this.accordionCategoriesBtn.classList.toggle('collapsed');
    this.accordionCategories.classList.toggle('show');
  };
}
