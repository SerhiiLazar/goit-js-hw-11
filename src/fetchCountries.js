
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30170611-f5f506e58232a96150936505d';
const axios = require('axios');

export default class NewsFetchCountries {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchApiImage() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
      );

      this.incrementPage();

      return response;
    } catch (error) {
      console.error(error);
    }
  }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
