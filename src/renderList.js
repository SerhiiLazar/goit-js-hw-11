import SimpleLightbox from 'simplelightbox';
import getRefs from './refsElement';

const refs = getRefs();

let lightbox = new SimpleLightbox('.gallery a ', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  close: true,
});


export function renderList(images) {
  
  const hits = images.data.hits
  .map(image =>  {
        return `<div class="gallery__item">
          <a class="gallery__link" href="${image.largeImageURL}">
          <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/></a>
          <div class="text">
            <p class="text-item">
              <b>Likes:</b>${image.likes}
            </p>
            <p class="text-item">
              <b>Views:</b>${image.views}
            </p>
            <p class="text-item">
              <b>Comments:</b>${image.comments}
            </p>
            <p class="text-item">
              <b>Downloads:</b>${image.downloads}
            </p>
          </div>
        </div>`;
      })
    .join('');
  refs.fetchGallery.insertAdjacentHTML('beforeend', hits);
  lightbox.refresh(); 
}

