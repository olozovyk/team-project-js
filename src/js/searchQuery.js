import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { getMovies } from './fetch';
import templatingOneFilm from '../templates/templatingOneFilm.hbs';
import { refs } from './refs';
import { dataSet, genresSet } from './templatingSettings';
import { controlModal } from './modal';
import { addCoverDefault } from './addCoverDefault';

refs.searchForm.addEventListener('submit', onInputSearch);

let page = sessionStorage.getItem('searchPageNumber') || 1;
let searchQuery;

function onInputSearch(e) {
  e.preventDefault();

  sessionStorage.setItem('mainPage', 1);
  const form = e.currentTarget;
  searchQuery = form.elements.user_text.value;

  if (searchQuery.trim() === '') {
    form.reset();
    return;
  }

  clearInterface();

  async function makePagination({ page, query } = {}) {
    const total = await showMovies({ page, query: searchQuery });
    console.log(total);
    const paginationEl = document.querySelector('.js-pagination');
    const instance = new Pagination(paginationEl, {
      totalItems: total,
      itemsPerPage: 20,
      centerAlign: true,
      page,
    });
    instance.on('beforeMove', function (eventData) {
      sessionStorage.setItem('mainPage', eventData.page);
      refs.movies.innerHTML = '';
      return showMovies({ page: eventData.page, query: searchQuery });
    });
  }

  makePagination({ page, query: searchQuery });
}

async function showMovies({ page, query } = {}) {
  const data = await getMovies({ page, query: searchQuery });
  const arrayOfMovies = data.movies.map(movie => {
    const filmGenres = genresSet(movie.genreNames);
    const filmDate = dataSet(movie.release_date);
    return { ...movie, filmGenres, filmDate };
  });
  if (arrayOfMovies.length === 0) {
    refs.headerFailureNotice.classList.remove('hidden');
    return;
  }

  refs.headerFailureNotice.classList.add('hidden');
  cardRender(arrayOfMovies);
  addCoverDefault(refs.filmList);
  controlModal();
  refs.searchForm.reset();

  return data.total_results;

}

function cardRender(movies) {
  refs.filmList.insertAdjacentHTML('beforeend', templatingOneFilm(movies));
}

function clearInterface() {
  refs.movies.innerHTML = '';
  refs.pagination.innerHTML = '';
}
