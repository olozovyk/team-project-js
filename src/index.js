import './sass/main.scss';
import 'modern-normalize/modern-normalize.css';
import { getMovies } from './js/fetch';

getMovies({}).then(console.log);
//Для того, чтобы получить результаты поиска, добавить, как аргумент ф-ции {query: 'запрос'}
//Для пагинации добавить {page: номер страницы}
