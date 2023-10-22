import { fetchBreeds, fetchCatByBreed } from './cat-api';

//  змінна для айді
let breedId = '';

const elements = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.loader.classList.add('is-hidden');
elements.error.classList.add('is-hidden');

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
  onLoad();
  breedId = evt.target.value;
  showCat(breedId);
}

// Виконуємо запит для отримання інформації про породу і зберігаємо її в selectedBreed
function showCat(breedId) {
  fetchBreeds()
    .then(data => {
      selectedBreed = data.find(breed => breed.id === breedId);
      //збираемо з запиту породи
      return fetchCatByBreed(breedId);
    })
    .then(catInfo => {
      // забираэмо картинку з другого запиту
      catData = catInfo[0];

      const description = selectedBreed.description;
      const temperament = selectedBreed.temperament;
      const name = selectedBreed.name;
      const { url } = catData;

      //формуємо розмітку
      const oneCatMarkup = `
         <div class="cat">
         <div class="cat__img">
           <img src="${url}" alt='cat' width="300"/>
         </div class="cat__info">
           <h1 class="cat__info-title">${name}</h1>
           <p class="cat__info-description">${description}</p>
           <p class="cat__info-temperament"><span>Temperament:</span> ${temperament}</p>
         </div>`;

      elements.info.innerHTML = oneCatMarkup;
      onAppear();
    })
    .catch(onError);
}

//  в разі помилки
function onError(error) {
  elements.error.classList.remove('is-hidden');
  console.error('Error fetching cat data:', error);
}

// на появі
function onAppear() {
  elements.loader.classList.add('is-hidden');
  elements.info.classList.remove('is-hidden');
}

//на загрузці
function onLoad() {
  elements.loader.classList.remove('is-hidden');
  elements.info.classList.add('is-hidden');
}

// показує картку кота за два заходи
// function showCat(breedId) {
//   // Використовує вибрану породу для отримання інформації про породу
//   fetchBreeds().then(data => {
//     // Знаходить інформацію про вибрану породу за ід з усіх
//     const selectedBreed = data.find(breed => breed.id === breedId);

//     const description = selectedBreed.description;
//     const temperament = selectedBreed.temperament;
//     const name = selectedBreed.name;

//     const oneCatMarkupInfo = `
//        <div class="cat-container"><h1>${name}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;

//     elements.info.insertAdjacentHTML('beforeend', oneCatMarkupInfo);
//   });

//   fetchCatByBreed(breedId)
//     .then(data => {
//       const { url } = data[0];

//       const oneCatMarkupImg = `<div class="cat-img"><img src="${url}" alt='cat' width="300"/></div>`;

//       elements.info.insertAdjacentHTML('afterbegin', oneCatMarkupImg);
//       onAppear();
//     })
//     .catch(onError);
// }
