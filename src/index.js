import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';
import { getMovies } from './js/fetch';
import { genresSet, dataSet } from './js/templatingSettings';
import templatingOneFilm from './templates/templatingOneFilm.hbs';
import { refs } from './js/refs';

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

console.log(refs.movies);
