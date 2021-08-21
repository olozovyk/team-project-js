import { Loading } from 'notiflix';
import 'tui-pagination/dist/tui-pagination.min.css';
import templatingOneFilm from '../templates/templatingOneFilm.hbs';
import { refs } from './refs';
import { controlModal } from './modal';
import { addCoverDefault } from './addCoverDefault';
import { handleMoviesObj } from './handleMoviesObj';
import { makePagination } from './makePagination';

Loading.init({ svgColor: '#ff6b08' });
refs.searchForm.addEventListener('submit', onInputSearch);

let page = 1;
let searchQuery;

function onInputSearch(e) {
  e.preventDefault();

  sessionStorage.removeItem('mainPage');
  const form = e.currentTarget;
  searchQuery = form.elements.user_text.value;

  if (searchQuery.trim() === '') {
    form.reset();
    return;
  }

  clearInterface();
  makePagination({ page, query: searchQuery, renderFunction: renderMoviesFromSearch });
}

async function renderMoviesFromSearch(page) {
  Loading.init({ svgColor: '#ff6b08' });
  Loading.dots('Загрузка...');
  const data = await handleMoviesObj({ page, query: searchQuery });
  if (data.total === 0) {
    refs.headerFailureNotice.classList.remove('hidden');
    refs.searchForm.reset();
    Loading.remove(500);
    return null;
  }
  refs.headerFailureNotice.classList.add('hidden');
  cardRender(data.movies);
  addCoverDefault(refs.filmList);
  controlModal();
  refs.searchForm.reset();
  Loading.remove(500);
  return data.total;
}

function cardRender(movies) {
  refs.movies.innerHTML = templatingOneFilm(movies);
}

function clearInterface() {
  refs.movies.innerHTML = '';
  refs.pagination.innerHTML = '';
}
