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

let page = 1;
try {
  page = sessionStorage.getItem('mainPage1') || 1;
} catch (error) {
  console.log(error);
}

async function showMovies(numberPage) {
  const data = await getMovies({ page: numberPage });
  const filmsArr = data.movies.map(film => {
    const filmGenres = genresSet(film.genreNames);
    const filmDate = dataSet(film.release_date);
    return { ...film, filmGenres, filmDate };
  });
  refs.movies.innerHTML = templatingOneFilm(filmsArr);
  controlModal();
  return data.total_results;
}

async function makePagination(numberPage) {
  const total = await showMovies(numberPage);
  const containerMovies = document.querySelector('.js-pagination');
  const instance = new Pagination(containerMovies, {
    totalItems: total,
    itemsPerPage: 20,
    centerAlign: true,
    page: numberPage,
  });
  instance.on('beforeMove', function (eventData) {
    sessionStorage.setItem('mainPage', eventData.page);
    return showMovies(eventData.page);
  });
}

makePagination(page);
