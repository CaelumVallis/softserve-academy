export default class ModelGallery {
  #URL =
    'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';

  #columnsNumber = 9;

  #state = {
    data: [],
    itemsOnPage: 25,
    currentPage: 1,
  };

  getItems = (category) => {
    if (category) {
      return this.cropToPage(this.#state.data).filter((item) => item.CATEGORY === category);
    }
    return this.cropToPage(this.#state.data);
  };

  getPages = () => {
    return this.#state.data.length / this.#state.itemsOnPage;
  };

  searchItem = (value, type) => {
    if (value === '') {
      return this.cropToPage(this.#state.data);
    }
    if (type === 'string') {
      return this.#state.data.find((item) => {
        return item.PRODUCT_NAME.includes(value.toUpperCase());
      });
    }
    if (type === 'id') {
      return this.#state.data.find((item) => {
        return item.ID === value;
      });
    }
  };

  setItemsCount = (count) => {
    this.#state.itemsOnPage = count;
  };

  sortItems = (option) => {
    if (option === 'ascending') {
      this.#state.data.sort((a, b) => +a.PRICE - b.PRICE);
    }
    if (option === 'descending') {
      this.#state.data.sort((a, b) => +b.PRICE - a.PRICE);
    }
  };

  navigateTo = (target) => {
    let currentPage = this.#state.currentPage;

    switch (true) {
      case Number.isInteger(+target): {
        this.#state.currentPage = +target;
        break;
      }
      case target === 'Previous': {
        currentPage === 1 ? (this.#state.currentPage = 1) : (this.#state.currentPage -= 1);
        break;
      }
      case target === 'Next': {
        currentPage === this.getPages() ? null : (this.#state.currentPage += 1);
        break;
      }
      default: {
        this.#state.currentPage = 1;
      }
    }
  };

  fetchData = () => {
    return fetch(this.#URL)
      .then((r) => r.json())
      .then((d) => {
        this.getPages();
        return this.parseData(d.feed.entry, this.#columnsNumber);
      });
  };

  parseData(arr, fromElement) {
    const itemsArr = [];
    arr.splice(0, this.#columnsNumber);

    while (arr.length > 0) {
      itemsArr.push(arr.splice(0, fromElement));
    }

    this.#state.data = itemsArr
      .map((el) => {
        return el.map((item) => {
          switch (+item.gs$cell.col) {
            case 1: {
              return { ID: item.content.$t };
            }
            case 2: {
              return { PRODUCT_NAME: item.content.$t };
            }
            case 3: {
              return { MANUFACTURE: item.content.$t };
            }
            case 4: {
              return { CATEGORY: item.content.$t };
            }
            case 5: {
              return { INGRIDIENTS: item.content.$t };
            }
            case 6: {
              return { UNITS: item.content.$t };
            }
            case 7: {
              return { AMOUNT: item.content.$t };
            }
            case 8: {
              return { PRICE: item.content.$t };
            }
            case 9: {
              return { IMG_LINK: item.content.$t };
            }
          }
        });
      })
      .map((item) => Object.assign({}, ...item));

    return this.cropToPage(this.#state.data);
  }

  cropToPage = (arr) => {
    const sliceFrom = (this.#state.currentPage - 1) * this.#state.itemsOnPage;
    const sliceTill = this.#state.currentPage * this.#state.itemsOnPage;
    return arr.slice(sliceFrom, sliceTill);
  };
}
