import 'modern-normalize/modern-normalize.css';
import './sass/main.scss';
import { getMovies } from './js/fetch';
import { genresSet, dataSet } from './js/templatingSettings';
import templatingOneFilm from './templates/templatingOneFilm.hbs';
getMovies()
  .then(films => {
    const filmsArr = films.map(film => {
      const filmGenres = genresSet(film.genreNames);
      const filmDate = dataSet(film.release_date);
      return { ...film, filmGenres, filmDate };
    });
    return filmsArr;
  })
  .then(films => {
    console.log(templatingOneFilm(films));
  });
//Для того, чтобы получить результаты поиска, добавить, как аргумент ф-ции {query: 'запрос'}
//Для панигации добавить {page: номер страницы}
