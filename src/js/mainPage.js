import { Loading } from 'notiflix';
import { handleMoviesObj } from './handleMoviesObj';
import { refs } from './refs';
import templatingOneFilm from '../templates/templatingOneFilm.hbs';
import { addCoverDefault } from './addCoverDefault';
import { controlModal } from './modal';
import { makePagination } from './makePagination';

let page = Number(sessionStorage.getItem('mainPage')) || 1;

export async function renderMovies(numberPage) {
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

makePagination({ page, targetPage: 'main', renderFunction: renderMovies });
