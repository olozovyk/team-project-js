import './sass/main.scss';
import 'modern-normalize/modern-normalize.css';
import { getMovies } from './js/fetch';

getMovies({ page: 1, query: 'животные' }).then(console.log);
//Для того, чтобы получить результаты поиска, добавить, как аргумент ф-ции {query: 'запрос'}
//Для панигации добавить {page: номер страницы}
