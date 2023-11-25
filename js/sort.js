import { getRandomArrayElement, debounce } from './util.js';
import { createThumbnail } from './renderThumbnails.js';

const RERENDER_DELAY = 500;
const RANDOM_FILTER_COUNT = 10;

// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону миниатюры
const thumbnailsContainer = document.querySelector('.pictures');
const filtersContainer = document.querySelector('.img-filters');
const defaultFilterElement = filtersContainer.querySelector('#filter-default');
const randomFilterElement = filtersContainer.querySelector('#filter-random');
const discussedFilterElement = filtersContainer.querySelector('#filter-discussed');

let currentFilterElement = defaultFilterElement;
let lastSelectedDefaultFilter = null;
let lastSelectedDiscussedFilter = null;

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

const sortThumbnails = (evt, pictures) => {
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

const compareFilters = () =>
  currentFilterElement === defaultFilterElement && currentFilterElement === lastSelectedDefaultFilter ||
  currentFilterElement === discussedFilterElement && currentFilterElement === lastSelectedDiscussedFilter;

const onFilterElementClick = (evt, pictures) => {
  currentFilterElement.classList.remove('img-filters__button--active');
  currentFilterElement = evt.target;
  currentFilterElement.classList.add('img-filters__button--active');

  // Если текущий фильтр - randomFilterElement, нет необходимости в проверке
  if (currentFilterElement !== randomFilterElement) {
    if (compareFilters) {
      return;
    }
  }

  if (currentFilterElement === defaultFilterElement) {
    lastSelectedDefaultFilter = currentFilterElement;
  } else if (currentFilterElement === discussedFilterElement) {
    lastSelectedDiscussedFilter = currentFilterElement;
  }

  const debouncedSortThumbnails = debounce(() => sortThumbnails(evt, pictures), RERENDER_DELAY);
  debouncedSortThumbnails(evt, pictures); // Вызов отложенной функции после создания
};

const filterButtons = (pictures) => {
  defaultFilterElement.addEventListener('click', (evt) => onFilterElementClick(evt, pictures));
  randomFilterElement.addEventListener('click', (evt) => onFilterElementClick(evt, pictures));
  discussedFilterElement.addEventListener('click', (evt) => onFilterElementClick(evt, pictures));
};

export { filterButtons };
