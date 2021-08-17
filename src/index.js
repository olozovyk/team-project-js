import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';
import { getMovies, getMovieById } from './js/fetch';
import { genresSet, dataSet } from './js/templatingSettings';
import templatingOneFilm from './templates/templatingOneFilm.hbs';
import { refs } from './js/refs';
import './js/pageSwitch';
import './js/searchQuery';
import { controlModal } from './js/modal';
import './js/watched';
import { addCoverDefault } from './js/addCoverDefault';

let libraryKey;
libraryKey = sessionStorage.getItem('pageLibrary') === 'library';
let page = Number(sessionStorage.getItem('mainPage')) || 1;

async function showMovies(numberPage) {
  if (libraryKey) {
    return;
  }
  const data = await getMovies({ page: numberPage });
  const filmsArr = data.movies.map(film => {
    const filmGenres = genresSet(film.genreNames);
    const filmDate = dataSet(film.release_date);
    return { ...film, filmGenres, filmDate };
  });
  refs.movies.innerHTML = templatingOneFilm(filmsArr);
  addCoverDefault(refs.movies);
  controlModal();
  return data.total_results;
}

export default async function makePagination(numberPage) {
  const total = await showMovies(numberPage);
  const paginationEl = document.querySelector('.js-pagination');
  const instance = new Pagination(paginationEl, {
    totalItems: total,
    itemsPerPage: 20,
    centerAlign: true,
    page: numberPage,
    // currentPage: numberPage,
  });
  instance.on('beforeMove', function (eventData) {
    sessionStorage.setItem('mainPage', eventData.page);
    return showMovies(eventData.page);
  });
}

// makePagination(page);

// console.log(libraryKey);
makePagination(page);
// if (!libraryKey) {
//   makePagination(page);
// }
