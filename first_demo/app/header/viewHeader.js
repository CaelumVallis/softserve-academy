export default class ViewHeader {
  constructor(handleSearch) {
    this.searchForm = document.querySelector('#searchForm');
    this.searchInput = document.querySelector('#searchInput');
    this.burgerBtn = document.querySelector('#burgerBtn');
    this.burgerMenu = document.querySelector('#burgerMenu');

    this.burgerBtn.addEventListener('click', () => this.onBurgerClick());

    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSearch();
    });

    this.handleSearch = handleSearch;
  }

  onSearch = () => {
    this.handleSearch(this.searchInput.value);
  };

  onBurgerClick = () => {
    this.burgerBtn.classList.toggle('collapsed');
    this.burgerMenu.classList.toggle('show');
  };
}
