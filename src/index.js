import './sass/index.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import renderList from './renderList.js';
import NewsFetchCountries from './fetchCountries.js';




const refs = {
    searchForm: document.querySelector('.js-search-form'),
    searchFormInput: document.querySelector('.search-form__input'),
    searchFormButton: document.querySelector('.search-form__button'),
    fetchGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', );                   

const newsFetchCountries = new NewsFetchCountries();


console.log(newsFetchCountries);

function onSearch(e) {
    e.preventDefault();
    refs.fetchGallery.innerHTML = '';
    newsFetchCountries.query = e.currentTarget.elements.searchQuery.value.trim();
    if (newsFetchCountries.query === '') {
      return Notiflix.Notify.failure(
        `❌ Ошибка, поле запроса не может быть пустым`
      );
    }
    onRenderGallery(); 
    newsFetchCountries.resetPage();
    clearGallery()
}

async function onRenderGallery() {
   try {
    newsFetchCountries.fetchApiImage().then(data => {
      if (!data.hits.length) {
        Notiflix.Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }
      imagesMarkup(data);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images !!!`);
      let lightbox = new SimpleLightbox('.gallery a ', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
        close: true,
      });
      lightbox.refresh();
    });
    } catch (error) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function imagesMarkup(data) {
  refs.fetchGallery.insertAdjacentHTML('beforeend', renderList(data));
}

function clearGallery() {
  refs.fetchGallery.innerHTML = '';
}

