import { getPhotosData } from '../js/data'; // Функция для получения случайных данных
import { renderThumbnails } from './renderThumbnails'; // Функция для заполнения миниатюр по шаблону переданными данными
// import {  } from '../js/pictureModal';

const photosArray = getPhotosData(); // Генерируем массив со случайными данными и сохраняем его в переменную

renderThumbnails(photosArray); // Заполняем миниатюры по шаблону случайными данными и добавляем их в контейнер
