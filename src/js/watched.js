import templateLibrary from '../templates/library.hbs';
import { refs } from './refs';
import { genresSet, dataSet, voteAverageNew } from './templatingSettings';

refs.libraryLink.addEventListener('click', onBtnMyLibrary);
refs.btnWatched.addEventListener('click', onBtnMyLibrary);
refs.btnQueue.addEventListener('click', onBtnQueue);

function onBtnMyLibrary(event) {
  const saveMovies = localStorage.getItem('watchedMovies');
  const parseMovies = JSON.parse(saveMovies);
  getLibraryMovies(parseMovies);
}

function onBtnQueue(e) {
  const saveMovies = localStorage.getItem('queueMovies');
  const parseMovies = JSON.parse(saveMovies);
  getLibraryMovies(parseMovies);
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
