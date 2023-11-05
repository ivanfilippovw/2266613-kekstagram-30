// Находим элемент-контейнер, куда будем добавлять сгенерированные по шаблону миниатюры
const thumbnailsContainer = document.querySelector('.pictures');
// Находим шаблон и в шаблоне находим нужный элемент
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция создания (клонирования) миниатюры по шаблону
const createThumbnail = ({url, description, comments, likes}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

// Функция содания фрагмента, наполнения фрагмента миниатюрами и добавления наполненного фрагмента в элемент-контейнер
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  thumbnailsContainer.append(fragment);
};

export { renderThumbnails };
