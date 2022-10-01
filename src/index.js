import './sass/index.scss';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import renderList from './renderList.js';
import NewsFetchCountries from './fetchCountries.js';
import LoadMoreBtn from './loadMoreBtn.js';



const refs = {
    searchForm: document.querySelector('.js-search-form'),
    searchFormInput: document.querySelector('.search-form__input'),
    searchFormButton: document.querySelector('.search-form__button'),
    fetchGallery: document.querySelector('.gallery'),
    // loadMoreButton: document.querySelector('.load-more'),  
}



const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsFetchCountries = new NewsFetchCountries();


console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);                   


function onSearch(e) {
    e.preventDefault();
    clearGallery();
    
    newsFetchCountries.query = e.currentTarget.elements.searchQuery.value.trim();
    
    if (newsFetchCountries.query === '') {
      return Notiflix.Notify.failure(
        `❌ Error, request field cannot be empty`
      );
    }
    
    
    loadMoreBtn.show();
    
    newsFetchCountries.resetPage();
    onRenderGallery();
    
}

function onLoadMore() {
  onRenderGallery();

}

async function onRenderGallery() {
   try {
    newsFetchCountries.fetchApiImage().then(data => {
      if (!data.hits.length) {
        loadMoreBtn.hide();
        Notiflix.Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        
        return;
      }
      if (data.hits.length < 40) {
        loadMoreBtn.hide();
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

