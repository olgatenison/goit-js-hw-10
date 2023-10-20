import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] = 'твій ключ';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'ive_rvW2fNQsV1F5ndG4nRUTL80oB7gnm9mRENenNK0bFaae9z95D31awypoySky0fpC';

const elements = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
};

// console.log(elements.select);
// console.log(elements.info);

//   fetchBreeds: виконує HTTP-запит за допомогою fetch за списком порід кішок, обробляє відповідь і виводить опції для вибору породи у селекті на сторінці.

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

//функція забезпечує отримання та відображення списку порід кішок на веб-сторінці, використовуючи отримані дані з API за допомогою axios.

export function fetchBreeds() {
  return (
    axios
      .get(`${BASE_URL}/breeds?key=${API_KEY}`)
      .then(resp => {
        // console.log(resp.data, 'data');
        const breedMarkup = resp.data
          .map(({ id, name }) => {
            return `<option value = ${id}>${name}</option>`;
          })
          .join('');
        elements.select.insertAdjacentHTML('beforeend', breedMarkup);
      })
      //if error
      .catch(err => {
        console.log(err.message);
      })
  );
}
// fetchBreeds();

// .then(data => {
//   // данні для картки
//   const name = data.name;
//   console.dir(name);
//   const country = data.location.country;
//   const temp = data.current.temp_c;
//   const feelsTemp = data.current.feelslike_c;
//   const clouds = data.current.condition.text;
//   const humidity = data.current.humidity;
//     });
// }

// fetchCatByBreed: Эта функция извлекает изображения кошек для конкретной породы на основе предоставленного идентификатора breedId. Она создает URL с использованием идентификатора породы и API-ключа, после чего отправляет GET-запрос. Также происходит проверка, что ответ имеет статус OK (код состояния 200), и возвращаются данные в формате JSON.

export function fetchCatByBreed(breedId) {
  return (
    fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&key=${API_KEY}`)
      .then(resp => {
        //checked if responce is ok
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      //if all ok create options
      .then(data => {
        console.log(data);
        const oneCatMarkup = data
          .map(({ id, name, description, temperament }) => {
            return `<option value = ${id}>${name}</option>`;
          })
          .join('');
        elements.select.insertAdjacentHTML('beforeend', breedMarkup);
      })
      //if error
      .catch(err => {
        console.log(err);
      })
  );
}
