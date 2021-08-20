import Pagination from 'tui-pagination';
import lazySizes from 'lazysizes';
import { Loading } from 'notiflix';
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
import { scrollToTop } from './js/scroll';
import './js/theme';

let page = Number(sessionStorage.getItem('mainPage')) || 1;

async function renderMovies(numberPage) {
  if (sessionStorage.getItem('pageLibrary') === 'library') {
    return;
  }
  Loading.init({ svgColor: '#ff6b08' });
  Loading.dots('Загрузка...');
  const data = await handleMoviesObj({ page: numberPage });
  refs.movies.innerHTML = templatingOneFilm(data.movies);
  addCoverDefault(refs.movies);
  controlModal();
  Loading.remove(500);
  return data.total;
}

makePagination(page);

export async function makePagination(page, query) {
  const total = await renderMovies(page);
  const paginationEl = document.querySelector('.js-pagination');
  const instance = new Pagination(paginationEl, {
    totalItems: total,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    page,
  });
  instance.on('beforeMove', function (eventData) {
    sessionStorage.setItem('mainPage', eventData.page);
    scrollToTop();
    renderMovies(eventData.page);
  });
}

export async function handleMoviesObj({ page, query }) {
  const data = await getMovies({ page, query });
  const moviesArr = data.movies.map(movie => {
    const movieGenres = genresSet(movie.genreNames);
    const movieDate = dataSet(movie.release_date);
    return { ...movie, movieGenres, movieDate };
  });
  return { movies: moviesArr, total: data.total_results };
}
