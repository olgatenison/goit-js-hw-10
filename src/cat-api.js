import axios from 'axios';
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'ive_rvW2fNQsV1F5ndG4nRUTL80oB7gnm9mRENenNK0bFaae9z95D31awypoySky0fpC';

axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = BASE_URL;

// fetchBreeds функція забезпечує отримання та відображення списку порід кішок на веб-сторінці, використовуючи отримані дані з API за допомогою axios.

export function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}

//  за допомогою fetch fetchBreeds: виконує HTTP-запит  за списком порід кішок, обробляє відповідь і виводить опції для вибору породи у селекті на сторінці.

// const elements = {
//   select: document.querySelector('.breed-select'),
//   info: document.querySelector('.cat-info'),
// };

// export function fetchBreeds() {
//   return (
//     fetch(`${BASE_URL}/breeds?key=${API_KEY}`)
//       .then(resp => {
//         //checked if responce is ok
//         if (!resp.ok) {
//           //send to catch
//           throw new Error(resp.statusText);
//         }
//         return resp.json();
//       })
//       //if all ok create options
//       .then(data => {
//         // console.log(data);
//         const breedMarkup = data
//           .map(({ id, name }) => {
//             return `<option value = ${id}>${name}</option>`;
//           })
//           .join('');
//         elements.select.insertAdjacentHTML('beforeend', breedMarkup);
//       })
//       //if error
//       .catch(err => {
//         console.log(err);
//       })
//   );
// };

// fetchBreeds();
