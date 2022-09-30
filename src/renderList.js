export default function renderList(data) {
  
  const hits = data.hits;
  return hits
    .map(
      ({ webformatURL, tags, largeImageURL, views, likes, comments, downloads }) => {
        return `
<div class="gallery__item">
  <a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="text">
    <p class="text-item">
      <b>Likes:</b>${likes}
    </p>
    <p class="text-item">
      <b>Views:</b>${views}
    </p>
    <p class="text-item">
      <b>Comments:</b>${comments}
    </p>
    <p class="text-item">
      <b>Downloads:</b>${downloads}
    </p>
  </div>
</div> 
    `;
      }
    )
    .join('');
    
}

