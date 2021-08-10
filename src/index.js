import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';
import { getMovies, getMoviesById } from './js/fetch';
import { genresSet, dataSet } from './js/templatingSettings';
import templatingOneFilm from './templates/templatingOneFilm.hbs';
import { refs } from './js/refs';
import './js/searchQuery';

let numberPage = 1;
getMovies({ page: numberPage })
  .then(films => {
    const filmsArr = films.map(film => {
      const filmGenres = genresSet(film.genreNames);
      const filmDate = dataSet(film.release_date);
      return { ...film, filmGenres, filmDate };
    });
    return filmsArr;
  })
  .then(films => {
    refs.movies.innerHTML = templatingOneFilm(films);
  });

getMoviesById(522478).then(console.log);