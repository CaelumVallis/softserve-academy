export default class ViewHeader {
  constructor(handleSearch) {
    this.searchForm = document.querySelector("#searchForm");
    this.searchInput = document.querySelector("#searchInput");

    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onSearch();
    });

    this.handleSearch = handleSearch;
  }

  onSearch = () => {
    this.handleSearch(this.searchInput.value);
  };
}
