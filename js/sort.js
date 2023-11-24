import { getRandomArrayElement } from './util.js';
import { createThumbnail } from './renderThumbnails.js';

const RANDOM_FILTER_COUNT = 10;

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону миниатюры
const thumbnailsContainer = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
const defaultFilterElement = filtersContainer.querySelector('#filter-default');
const randomFilterElement = filtersContainer.querySelector('#filter-random');
const discussedFilterElement = filtersContainer.querySelector('#filter-discussed');

let currentFilterElement = defaultFilterElement;

const getUniqueRandomArray = (pictures, count) => {
  const uniqueArray = [];

  while (uniqueArray.length < count) {
    const randomElement = getRandomArrayElement(pictures);
    if (!uniqueArray.includes(randomElement)) {
      uniqueArray.push(randomElement);
    }
  }
  return uniqueArray;
};

const sortThumbnails = (pictures) => {
  const thumbnailsToRemove = thumbnailsContainer.querySelectorAll('.picture');
  thumbnailsToRemove.forEach((thumbnail) => {
    thumbnail.remove();
  });

  const fragment = document.createDocumentFragment();

  if (currentFilterElement === randomFilterElement) {
    const randomArray = getUniqueRandomArray(pictures, RANDOM_FILTER_COUNT);

    randomArray
      .forEach((picture) => {
        const thumbnail = createThumbnail(picture);
        fragment.append(thumbnail);
      });
  }

  if (currentFilterElement === discussedFilterElement) {
    const discussedArray = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);

    discussedArray
      .forEach((picture) => {
        const thumbnail = createThumbnail(picture);
        fragment.append(thumbnail);
      });
  }

  if (currentFilterElement === defaultFilterElement) {
    pictures.forEach((picture) => {
      const thumbnail = createThumbnail(picture);
      fragment.append(thumbnail);
    });
  }

  thumbnailsContainer.append(fragment);
};

const onFilterElementClick = (evt, pictures) => {
  currentFilterElement.classList.remove('img-filters__button--active');
  currentFilterElement = evt.target;
  currentFilterElement.classList.add('img-filters__button--active');
  sortThumbnails(pictures);
};

const filterButtons = (pictures) => {
  defaultFilterElement.addEventListener('click', (evt) => onFilterElementClick(evt, pictures));
  randomFilterElement.addEventListener('click', (evt) => onFilterElementClick(evt, pictures));
  discussedFilterElement.addEventListener('click', (evt) => onFilterElementClick(evt, pictures));
};

export { filterButtons };
