import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

// console.log(fetchBreeds);
let breedId = '';
const elements = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
};

// console.log(elements.select);
// console.log(elements.info);

fetchBreeds();

elements.select.addEventListener('change', onSelect);

function onSelect(evt) {
  evt.preventDefault();
  breedId = evt.target.value;
  showCat(breedId);
}

function showCat(breedId) {
  fetchCatByBreed(breedId)
    .then(data => {
      const oneCatMarkup = data
        .map(({ name, description, temperament, url }) => {
          return `<div class="cat-img">
                    <img src="${url}" alt="${name}" width="500" />
                  </div>
                  <div class="cat-container">
                    <h1>${name}</h1>
                    <p>${description}</p>
                    <p><b>Temperament:</b> ${temperament}</p>
                  </div>`;
        })
        .join('');
      elements.info.innerHTML = oneCatMarkup;
    })
    .catch(onError);
}

function onError(error) {
  console.error('Error fetching cat data:', error);
}
// function onSelect(evt) {
//   evt.preventDefault();

//   breedId = evt.target.value;

//   function showCat(breedId) {
//     fetchCatByBreed(breedId)
//       .then(data => {
//         console.log(data);
//         oneCatMarkup(data => {
//           console.log(data);
//           data
//             .map(({ name, description, temperament, url }) => {
//               return `<div class="cat-img">
//                       <img src="${url}" alt="${name}" width="500" />
//                     </div>
//                     <div class="cat-container">
//                       <h1>${name}</h1>
//                       <p>${description}</p>
//                       <p><b>Temperament:</b> ${temperament}</p>
//                     </div>`;
//             })
//             .join('');
//           elements.info.insertAdjacentHTML('beforeend', oneCatMarkup);
//         });
//       })
//       .catch(onError);
//   }

//   console.log(oneCatMarkup);
// }
