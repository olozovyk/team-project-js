export function openModal() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleOpenModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleOpenModal(event) {
    if (event.target.nodeName === 'UL') {
      return;
    }
    refs.modal.classList.toggle('backdrop__hidden');
  }

  function toggleModal(event) {
    refs.modal.classList.toggle('backdrop__hidden');
  }
}