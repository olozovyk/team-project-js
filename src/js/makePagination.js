import Pagination from 'tui-pagination';
import { scrollToTop } from './scroll';

export async function makePagination({ page, query, targetPage, renderFunction } = {}) {
  const total = await renderFunction(page);
  if (total === null) {
    return;
  }
  const paginationEl = document.querySelector('.js-pagination');
  const instance = new Pagination(paginationEl, {
    totalItems: total,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    page,
  });
  instance.on('beforeMove', function (eventData) {
    if (targetPage === 'main') sessionStorage.setItem('mainPage', eventData.page);
    scrollToTop();
    renderFunction(eventData.page);
  });
}
