export default function getRefs() {
    return {
        searchForm: document.querySelector('#search-form'),
        searchFormInput: document.querySelector('input'),
        searchFormButton: document.querySelector('.search-form__button'),
        fetchGallery: document.querySelector('.gallery'),
        // loadMoreButton: document.querySelector('.load-more'),
    };
  }
