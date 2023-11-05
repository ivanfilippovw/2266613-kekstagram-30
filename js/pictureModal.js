import { isEscapeKey } from './util';

// находим контейнер
const thumbnailsContainer = document.querySelector('.pictures'); // то где у нас уже лежат миниатюры с нужными данными
// находим модальное окно
const bigPictureModal = document.querySelector('.big-picture'); // элемент куда будем добавлять изображение
// находим кнопку закрытия модального окна
const closeBigPictureModalButton = document.querySelector('.big-picture__cancel');

// находим тег body
const body = document.querySelector('body');

// находим изображение модального окна
const imgPicture = bigPictureModal.querySelector('.big-picture__img img');
// находим количество лайков под фото модального окна
const likesPicture = bigPictureModal.querySelector('.likes-count');
// находим количество отображаемых комментариев модального окна
const commentsCountPicture = bigPictureModal.querySelector('.social__comment-shown-count');
// находим общее количетсво комментариев модального окна
const maxCommentsCountPicture = bigPictureModal.querySelector('.social__comment-total-count');
// находим блок комментариев модального окна
// const commentsPicture = bigPictureModal.querySelector('.social__comments');
// находим описание фотографии модального окна
const descriptionPicture = bigPictureModal.querySelector('.social__caption');

// находим адрес миниатюры
const imgThumbnail = thumbnailsContainer.querySelector('.picture__img');
// находим лайки миниатюры
const likesThumbnail = thumbnailsContainer.querySelector('.picture__likes');
// находим количество комментариев миниатюры
const commentsCountThumbnail = thumbnailsContainer.querySelector('.picture__comments');
// находим описание фотографии миниатюры
const descriptionThumbnail = thumbnailsContainer.querySelector('.picture__img').alt;

// находим список комментариев переданный ранее в миниатюры
// const comments = thumbnailsContainer.

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

function getDataForPicture () {
  imgPicture.src = imgThumbnail.src;
  likesPicture.textContent = likesThumbnail.textContent;
  commentsCountPicture.textContent = commentsCountThumbnail.textContent;
  maxCommentsCountPicture.textContent = commentsCountThumbnail.textContent;

  // commentsCountThumbnail.textContent =

  descriptionPicture.textContent = descriptionThumbnail;
  imgPicture.alt = descriptionThumbnail;
}

function openBigPictureModal (evt) {
  if (evt.target.closest('.picture')) {
    bigPictureModal.classList.remove('hidden');
    body.classList.add('modal-open');

    bigPictureModal.querySelector('.social__comment-count').classList.add('hidden'); // добавялем класс и прячем счетчик комментариев - временно
    bigPictureModal.querySelector('.comments-loader').classList.add('hidden'); // добавляем класс и прячем загрузку доп комментариев - временно
  }
  getDataForPicture();
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPictureModal () {
  bigPictureModal.classList.add('hidden');
  body.classList.remove('modal-open');

  bigPictureModal.querySelector('.social__comment-count').classList.remove('hidden'); // удаляем временный класс
  bigPictureModal.querySelector('.comments-loader').classList.remove('hidden'); // удаляем временный класс

  document.removeEventListener('keydown', onDocumentKeydown);
}

thumbnailsContainer.addEventListener('click', (evt) => {
  openBigPictureModal(evt);
});

closeBigPictureModalButton.addEventListener('click', () => {
  closeBigPictureModal();
});
