import templateLibrary from '../templates/library.hbs';
import { refs } from './refs';
import { genresSet, dataSet, voteAverageNew } from './templatingSettings';
import { controlModal } from './modal';

refs.libraryLink.addEventListener('click', onBtnMyLibrary);
refs.btnWatched.addEventListener('click', onBtnMyLibrary);
refs.btnQueue.addEventListener('click', onBtnQueue);

function onBtnMyLibrary(event) {
  if (refs.btnQueue.classList.contains('btn-is-active')) {
    addBackGrOrang(refs.btnQueue, refs.btnWatched);
  }
  refs.btnWatched.classList.add('btn-is-active');

  markupWatched();

  if (sessionStorage.getItem('pageQueue') === 'queue') {
    sessionStorage.removeItem('pageQueue');
  }
  sessionStorage.setItem('pageWatched', 'watched');
}

function onBtnQueue(e) {
  addBackGrOrang(refs.btnWatched, refs.btnQueue);
  markupQueue();

  if (sessionStorage.getItem('pageWatched') === 'watched') {
    sessionStorage.removeItem('pageWatched');
  }
  sessionStorage.setItem('pageQueue', 'queue');
}

// разметка queue
function markupQueue() {
  try {
    const saveMovies = localStorage.getItem('queueMovies');
    const parseMovies = JSON.parse(saveMovies);
    getLibraryMovies(parseMovies);
    controlModal();
  } catch (error) {
    console.log('error');
  }
}

// разметка watched
function markupWatched() {
  try {
    const saveMovies = localStorage.getItem('watchedMovies');
    const parseMovies = JSON.parse(saveMovies);
    getLibraryMovies(parseMovies);
    controlModal();
  } catch (error) {
    console.log('error');
  }
}

// получение фильиов в библиотеке
const getLibraryMovies = arg => {
  const filmsArr = arg.map(film => {
    const filmGenres = genresSet(film.genres);
    const filmDate = dataSet(film.release_date);
    const filmVoteAverage = voteAverageNew(film.vote_average);
    return { ...film, filmGenres, filmDate, filmVoteAverage };
  });
  return (refs.movies.innerHTML = templateLibrary(filmsArr));
};

// добавление. удаление активного стиля кнопок watched и queue
function addBackGrOrang(remove, add) {
  remove.classList.remove('btn-is-active');
  add.classList.add('btn-is-active');
}

// jтрисовка фильмов с sessionStorage при перезагрузке страницы
(function () {
  if (sessionStorage.getItem('pageQueue') === 'queue') {
    onBtnQueue();
    return;
  }
})();
(function () {
  if (sessionStorage.getItem('pageWatched') === 'watched') {
    onBtnMyLibrary();
    return;
  }
})();
// =========================================

export { markupQueue, markupWatched };
