import { getMovies } from './fetch';
import templatingOneFilm from '../templates/templatingOneFilm.hbs';
import { refs } from './refs';
import { dataSet, genresSet } from './templatingSettings';

refs.searchForm.addEventListener('submit', onInputSearch);

function onInputSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.user_text.value;
    
    clearInterface();

    getMovies({ query: searchQuery })
        .then(movies => {
            const arrayOfMovies = movies.map(movie => {
                const filmGenres = genresSet(movie.genreNames);
                const filmDate = dataSet(movie.release_date);
                return { ...movie, filmGenres, filmDate };
            });
            return arrayOfMovies;
        })
        .then(cardRender)
        .finally(form.reset())        
};

function cardRender(movies) {
    refs.filmList.insertAdjacentHTML('beforeend', templatingOneFilm(movies));
};

function clearInterface() {
    refs.filmList.innerHTML = '';
};