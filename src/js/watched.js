import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import templateLibrary from '../templates/library.hbs';
import notificationLibrary from '../templates/notificationLibrary.hbs';
import { refs } from './refs';
import { genresSet, dataSet, voteAverageNew } from './templatingSettings';
import { controlModal } from './modal';

refs.libraryLink.addEventListener('click', onBtnMyLibrary);
refs.btnWatched.addEventListener('click', onBtnMyLibrary);
refs.btnQueue.addEventListener('click', onBtnQueue);

let arrPagination;
let defaultPage = Number(sessionStorage.getItem('watchedPage')) || 1;

function onBtnMyLibrary(event) {
  if (refs.btnQueue.classList.contains('btn-is-active')) {
    addBackGrOrang(refs.btnQueue, refs.btnWatched);
  }
  refs.btnWatched.classList.add('btn-is-active');

  refs.pagination.innerHTML = '';
  const keyAvailability = localStorage.getItem('watchedMovies') !== null;
  const emptyArr = localStorage.getItem('watchedMovies') === '[]';
  if (!keyAvailability || emptyArr) {
    localStorage.setItem('watchedMovies', '[]');
    refs.movies.innerHTML = '';
    return refs.movies.insertAdjacentHTML('afterbegin', notificationLibrary());
  }

  markupWatched(defaultPage);

  if (sessionStorage.getItem('pageQueue') === 'queue') {
    sessionStorage.removeItem('pageQueue');
  }
  sessionStorage.setItem('pageWatched', 'watched');
}

function onBtnQueue(e) {
  const keyAvailability = localStorage.getItem('queueMovies') !== null;
  if (!keyAvailability) {
    localStorage.setItem('queueMovies', '[]');
  }

  addBackGrOrang(refs.btnWatched, refs.btnQueue);
  markupQueue();
  refs.pagination.innerHTML = '';
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
// const watchedPage = Number(sessionStorage.getItem('watchedPage')) || 1;
// console.log(watchedPage);
function markupWatched(page) {
  const numbersMovies = 3;
  console.log(page);

  try {
    const saveMovies = localStorage.getItem('watchedMovies');
    const parseMovies = JSON.parse(saveMovies);

    let start = 0;
    let end = numbersMovies * page;
    if (page > 1) {
      start = numbersMovies * (page - 1);
    }

    arrPagination = parseMovies.slice(start, end);
    getLibraryMovies(arrPagination);
    controlModal();
    // let defaultPage;

    function renderPaginationLibrary(page) {
      const instance = new Pagination(refs.pagination, {
        totalItems: parseMovies.length,
        itemsPerPage: 3,
        centerAlign: true,
        page: defaultPage,
        visiblePages: 5,
      });
      instance.on('beforeMove', function (eventData) {
        // sessionStorage.setItem('mainPage', eventData.page);
        sessionStorage.setItem('watchedPage', eventData.page);
        defaultPage = eventData.page || 1;
        // console.log(defaultPage);
        return markupWatched(defaultPage);
      });
    }
    renderPaginationLibrary(defaultPage);
    if (arrPagination.length === 0) {
      defaultPage--;
      if (defaultPage < 1) {
        defaultPage = 1;
      }
      markupWatched(defaultPage);
    }
  } catch (error) {
    console.log(error);
  }
}

// получение фильиов в библиотеке
const getLibraryMovies = arg => {
  const arrPagination = arg.map(film => {
    const filmGenres = genresSet(film.genres);
    const filmDate = dataSet(film.release_date);
    const filmVoteAverage = voteAverageNew(film.vote_average);
    return { ...film, filmGenres, filmDate, filmVoteAverage };
  });
  return (refs.movies.innerHTML = templateLibrary(arrPagination));
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
