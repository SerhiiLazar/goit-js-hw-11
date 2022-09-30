import './sass/index.scss';

import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import renderList from './renderList';
import NewsfetchCountries from './fetchCountries';




const refs = {
    searchForm: document.querySelector('.js-search-form'),
    searchFormInput: document.querySelector('.search-form__input'),
    searchFormButton: document.querySelector('.search-form__button'),
    fetchGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
}

refs.searchFormButton.addEventListener('submit', onSearch);


const newsFetchCountries = new NewsfetchCountries();
console.log(newsFetchCountries);

let isShown = 0;
function onSearch(e) {
    e.preventDefault();
    refs.fetchGallery.innerHTML = '';
    newsFetchCountries.query = e.currentTarget.elements.query.value.trim();
    
    newsFetchCountries.resetPage();
    onRenderGallery();
    // if (fetchCountries.query === '') {
    //     Notify.warning('Please, fill the main field');  
    //  return;
    // }       
    isShown = 1;
    
}

function  onRenderGallery(elements) {
    console.log(elements);
    const markup = elements.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
      return `<div class="photo-card">
      <a href="${largeImageURL}">
        <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
      </div>`;
    }).join('');
         refs.fetchGallery.insertAdjacentHTML('beforeend', markup);
  }   