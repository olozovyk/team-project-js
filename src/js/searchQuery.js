import { getMovies } from './fetch';
import templatingOneFilm from '../templates/templatingOneFilm.hbs';
import { refs } from './refs';

refs.input.addEventListener('change', onInputSearch);
refs.searchBtn.addEventListener('click', onSearchButtonClick);

function onInputSearch(e) {
    clearInterface();
    const searchQuery = e.currentTarget.value.trim();
    getMovies({query: searchQuery })
        .then(movies => {
            console.log(movies)
            refs.filmList.insertAdjacentHTML('beforeend', templatingOneFilm(movies));
        });
};

function onSearchButtonClick(e) {
    e.preventDefault();
    refs.input.innerHTML = '';
};

function clearInterface() {
    refs.filmList.innerHTML = '';
};