import { refs } from './refs';

refs.libraryLink.addEventListener('click', onLibraryClick);
refs.homeLink.addEventListener('click', onHomeClick);

// сохраняет класс LIBRARY при перезагрузке страници LIBRARY
(function () {
  if (localStorage.getItem('page') === 'library') {
    localStorage.setItem('page', 'library');
    refs.header.classList.add('library');
    keepLibraryBtnStyle();
    return;
  }
})();

function onLibraryClick() {
  keepLibraryBtnStyle();
  pageClassSetter();
}

function pageClassSetter() {
  localStorage.setItem('page', 'library');
  refs.header.classList.add('library');
}

function onHomeClick() {
  localStorage.removeItem('page');
  refs.header.classList.remove('library');
  refs.homeLink.classList.add('header__link--current');
  refs.libraryLink.classList.remove('header__link--current');
  refs.headerLibraryButtons.classList.add('hidden');
  refs.headerSearchBlock.classList.remove('hidden');
}

function keepLibraryBtnStyle() {
  refs.homeLink.classList.remove('header__link--current');
  refs.libraryLink.classList.add('header__link--current');
  refs.headerLibraryButtons.classList.remove('hidden');
  refs.headerSearchBlock.classList.add('hidden');
}
