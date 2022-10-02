import './sass/index.scss';
import NewsFetchCountries from './fetchCountries';
import LoadMoreBtn from './loadMoreBtn';
import {renderList} from './renderList';
import getRefs from './refsElement';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';






const refs = getRefs();


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsFetchCountries = new NewsFetchCountries();


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onRenderGallery);                   


async function onSearch(e) {
    e.preventDefault();

    newsFetchCountries.query = refs.searchFormInput.value.trim();
    loadMoreBtn.hide();
    newsFetchCountries.resetPage();
    clearGallery();
    onRenderGallery();
}    

async function onRenderGallery() {
    newsFetchCountries.fetchApiImage().then(images => {
      const totalPages = Math.ceil(
        images.data.totalHits / newsFetchCountries.perPage
      );
      
      loadMoreBtn.show();
      
      if (images.data.hits.length === 0) {
        loadMoreBtn.hide();
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (newsFetchCountries.searchQuery === '') {
        loadMoreBtn.hide();
        return Notiflix.Notify.warning(`The field must not be empty!`);
      }

      if (newsFetchCountries.page === 2) {
        Notiflix.Notify.success(
          `Hooray! We found ${images.data.totalHits} images.`
        );
      }

      if (newsFetchCountries.page > totalPages) {
        loadMoreBtn.hide();
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }


      renderList(images)
      
      
    })
    .catch (error => console.log (error));
    
  }



function clearGallery() {
  refs.fetchGallery.innerHTML = '';
}

