export function openModal() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', onClickOpenModal);
  refs.closeModalBtn.addEventListener('click', onClickCloseModal);

  function onClickOpenModal(event) {
    event.preventDefault();
    if (event.target.nodeName === 'UL') {
      return;
    }
    const listItem = event.target.closest('LI');
    const movieId = listItem.dataset.id;
    console.log(movieId);

    if (!movieId) {
      return;
    }

    refs.modal.classList.remove('backdrop__hidden');
    document.body.style.overflow = 'hidden';
    document.body.style.width = 'calc(100% - 15px)';
  }

  function onClickCloseModal(event) {
    refs.modal.classList.add('backdrop__hidden');
    document.body.style.overflow = 'auto';
    document.body.style.width = '100%';
  }
}
