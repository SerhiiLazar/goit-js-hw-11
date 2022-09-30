import axios from 'axios';

export default class NewsFetchCountries  {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }

    
    async fetchApiImage() {
        const options = {
            url: 'https://pixabay.com/api/',
            params: {
                key: '30170611-f5f506e58232a96150936505d',
                q: `${this.searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: `${this.page}`,
                per_page: `${this.per_page}`,
            },
            
        };
        try {
            const response = await axios(options);
            const data = response.data;
            console.log(options);
            this.incrementPage();
            return data;
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
