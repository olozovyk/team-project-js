import './sass/main.scss';
import 'modern-normalize/modern-normalize.css';
import { getMovies } from './js/fetch';
import { genresSet, dataSet } from './js/templatingSettings';
import templatingOneFilm from './templates/templatingOneFilm.hbs';
getMovies({ page: 1, query: 'животные' }).then(films => {
    films.forEach(film => {
        const filmGenres = genresSet(film.genreNames);
        const filmDate = dataSet(film.release_date);
        console.log(templatingOneFilm({ film, filmGenres, filmDate }));
    });
});
//Для того, чтобы получить результаты поиска, добавить, как аргумент ф-ции {query: 'запрос'}
//Для панигации добавить {page: номер страницы}
