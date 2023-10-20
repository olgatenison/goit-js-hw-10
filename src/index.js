import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] = 'твій ключ';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

// console.log(fetchBreeds);

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
  let breedId = evt.target.value;
  // console.log(breedId);
  fetchCatByBreed(breedId);
}
