import axios from 'axios';

export default class NewsfetchCountries  {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.PER_PAGE = 40;
    }
    async fetchApiImage() {
        axios.options = {
            method: 'get',
            url: 'https://pixabay.com/api/',
            params: {
                key: '30170611-f5f506e58232a96150936505d',
                q: `${this.searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: `${this.page}`,
                per_page:`${this.PER_PAGE}`,
            } 
        };
        try {
            const response = await axios(options);
            const data = response.data;
            console.log(data);
            this.incrementPage();
            return data;
        } catch (error) {
            console.error(error);
        }
       
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}   