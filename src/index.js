import { fetchBreeds, fetchCatByBreed } from './cat-api';

//  змінна для айді
let breedId = '';

const elements = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
};

//Функція fetchList дозволяє відображати список порід кішок у випадаючому списку на вашому веб-сайті, щоб користувачі могли обрати породу кота, за якою вони бажають отримати інформацію.

function fetchList() {
  fetchBreeds().then(breeds => {
    const breedMarkup = breeds
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    elements.select.insertAdjacentHTML('beforeend', breedMarkup);
  });
}

fetchList();

elements.select.addEventListener('change', onSelect);

function onSelect(evt) {
  evt.preventDefault();
  breedId = evt.target.value;
  showCat(breedId);
}

function showCat(breedId) {
  // Використовує вибрану породу для отримання інформації про породу
  fetchBreeds().then(data => {
    // Знаходить інформацію про вибрану породу за ід з усіх
    const selectedBreed = data.find(breed => breed.id === breedId);

    const description = selectedBreed.description;
    const temperament = selectedBreed.temperament;
    const name = selectedBreed.name;

    const oneCatMarkupInfo = `
       <div class="cat-container"><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;

    elements.info.insertAdjacentHTML('beforeend', oneCatMarkupInfo);
  });

  fetchCatByBreed(breedId)
    .then(data => {
      const { url } = data[0];

      const oneCatMarkupImg = `<div class="cat-img"><img src="${url}" alt='cat' width="300"/></div>`;

      elements.info.insertAdjacentHTML('afterbegin', oneCatMarkupImg);
    })
    .catch(onError);
}

//  в разі помилки
function onError(error) {
  console.error('Error fetching cat data:', error);
}
