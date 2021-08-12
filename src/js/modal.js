import { getMovieById } from './fetch';
import movieTemplate from '../../src/templates/modal.hbs';
import { refs } from './refs';

const modalContentEl = document.querySelector('#modal-content');

const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
const queueMovies = [];

export function controlModal() {
  const openModalBtnEl = document.querySelector('[data-modal-open]');
  const closeModalBtnEL = document.querySelector('[data-modal-close]');
  const modalEl = document.querySelector('[data-modal]');

  openModalBtnEl.addEventListener('click', onClickOpenModal);
  closeModalBtnEL.addEventListener('click', onClickCloseModal);

  function onClickOpenModal(event) {
    event.preventDefault();

    if (event.target.nodeName === 'UL') {
      return;
    }
    openModal(modalEl);

    const listItem = event.target.closest('LI');
    if (!listItem) {
      return;
    }

    const movieId = listItem.dataset.id;
    if (!movieId) {
      return;
    }

    getMovieById(movieId)
      .then(movie => {
        modalContentEl.innerHTML = movieTemplate(movie);
      })

      /* BUTTONS */
      .then(() => {
        const modalWatchedBtn = document.querySelector('#modal-watched-btn');
        const modalQueueBtn = document.querySelector('#modal-queue-btn');
        if (!modalWatchedBtn && !modalQueueBtn) {
          return;
        }

        const liContent = listItem.innerHTML;
        console.log(liContent);

        modalWatchedBtn.addEventListener('click', () => {
          let indexMovie = null;

          watchedMovies.forEach((item, idx) => {
            if (Number(item.id) === Number(movieId)) {
              indexMovie = idx;
            }
          });

          if (indexMovie !== null) {
            watchedMovies.splice(indexMovie, 1);
            localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
            console.table(watchedMovies);
            indexMovie = null;
          } else {
            const movieObj = { id: movieId, liContent };
            watchedMovies.push(movieObj);
            localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
            console.table(watchedMovies);
          }
        });
      });
    /* BUTTONS */
  }

  function openModal(modalEl) {
    modalEl.classList.remove('backdrop__hidden');
    document.body.style.overflow = 'hidden';
    document.body.style.width = 'calc(100% - 15px)';
  }

  function onClickCloseModal(event) {
    modalEl.classList.add('backdrop__hidden');
    modalContentEl.innerHTML = '';
    document.body.style.overflow = 'auto';
    document.body.style.width = '100%';
  }
}
