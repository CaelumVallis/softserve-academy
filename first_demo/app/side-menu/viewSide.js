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
    this.handleCategoryChange(e.target.textContent);
  };

  renderCategories = (categoriesArr) => {
    this.categoriesList.innerHTML = '';
    categoriesArr.forEach((item) => {
      this.categoriesList.innerHTML += `<a class="list-item category-selector">${item}</a>`;
    });
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
