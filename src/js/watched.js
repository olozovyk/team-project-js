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
let defaultPageWatched = Number(sessionStorage.getItem('watchedPage')) || 1;
let defaultPageQueue = Number(sessionStorage.getItem('queueMovies')) || 1;

// ф-ия вызывающаяся при клике на ссылку myLybrary, watched или перезагрузка страницы
function onBtnMyLibrary(event) {
  refs.pagination.innerHTML = '';
  refs.btnWatched.classList.add('btn-is-active');

  if (refs.btnQueue.classList.contains('btn-is-active')) {
    addBackGrOrang(refs.btnQueue, refs.btnWatched);
  }

  if (sessionStorage.getItem('pageQueue') === 'queue') {
    sessionStorage.removeItem('pageQueue');
    sessionStorage.setItem('pageWatched', 'watched');
  }

  const keyAvailability = localStorage.getItem('watchedMovies') !== null;
  const emptyArr = localStorage.getItem('watchedMovies') === '[]';
  if (!keyAvailability || emptyArr) {
    localStorage.setItem('watchedMovies', '[]');
    refs.movies.innerHTML = '';
    return (refs.pagination.innerHTML = notificationLibrary());
  }

  markupWatched(defaultPageWatched);
}

// ф-ия вызывающаяся при клике на queue или перезагрузка страницы
function onBtnQueue(e) {
  refs.pagination.innerHTML = '';
  addBackGrOrang(refs.btnWatched, refs.btnQueue);

  if (sessionStorage.getItem('pageWatched') === 'watched') {
    sessionStorage.removeItem('pageWatched');
    sessionStorage.setItem('pageQueue', 'queue');
  }

  const keyAvailability = localStorage.getItem('queueMovies') !== null;
  const emptyArr = localStorage.getItem('queueMovies') === '[]';
  if (!keyAvailability || emptyArr) {
    localStorage.setItem('queueMovies', '[]');
    refs.movies.innerHTML = '';
    return (refs.pagination.innerHTML = notificationLibrary());
  }

  markupQueue(defaultPageQueue);
}

// разметка queue
function markupQueue(page) {
  const numbersMovies = 9;

  try {
    const saveMovies = localStorage.getItem('queueMovies');
    const parseMovies = JSON.parse(saveMovies);

    let start = 0;
    let end = numbersMovies * page;
    if (page > 1) {
      start = numbersMovies * (page - 1);
    }
    arrPagination = parseMovies.slice(start, end);
    getLibraryMovies(arrPagination);
    controlModal();

    function renderPaginationLibrary(page) {
      const instance = new Pagination(refs.pagination, {
        totalItems: parseMovies.length,
        itemsPerPage: 9,
        centerAlign: true,
        page: defaultPageQueue,
        visiblePages: 5,
      });
      instance.on('beforeMove', function (eventData) {
        sessionStorage.setItem('queueMovies', eventData.page);
        defaultPageQueue = eventData.page || 1;
        return markupQueue(defaultPageQueue);
      });
    }

    renderPaginationLibrary(defaultPageQueue);
    if (arrPagination.length === 0) {
      defaultPageQueue--;
      if (defaultPageQueue < 1) {
        defaultPageQueue = 1;
        if (parseMovies.length === 0) {
          refs.pagination.innerHTML = notificationLibrary();
          return;
        }
      }
      markupQueue(defaultPageQueue);
    }
  } catch (error) {
    console.log(error);
  }
}

// разметка watched
function markupWatched(page) {
  const numbersMovies = 9;

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

    function renderPaginationLibrary(page) {
      const instance = new Pagination(refs.pagination, {
        totalItems: parseMovies.length,
        itemsPerPage: 9,
        centerAlign: true,
        page: defaultPageWatched,
        visiblePages: 5,
      });
      instance.on('beforeMove', function (eventData) {
        sessionStorage.setItem('watchedPage', eventData.page);
        defaultPageWatched = eventData.page || 1;
        return markupWatched(defaultPageWatched);
      });
    }

    renderPaginationLibrary(defaultPageWatched);
    if (arrPagination.length === 0) {
      defaultPageWatched--;
      if (defaultPageWatched < 1) {
        defaultPageWatched = 1;
        if (parseMovies.length === 0) {
          refs.pagination.innerHTML = notificationLibrary();
          return;
        }
      }
      markupWatched(defaultPageWatched);
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
    setTimeout(() => {
      onBtnQueue();
    }, 0);
    return;
  }
})();

(function () {
  if (sessionStorage.getItem('pageWatched') === 'watched') {
    setTimeout(() => {
      onBtnMyLibrary();
    }, 0);
    return;
  }
})();
// =========================================

export { markupQueue, markupWatched };
