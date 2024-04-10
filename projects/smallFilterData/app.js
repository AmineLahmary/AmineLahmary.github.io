import DashboardFilter from './DashboardFilter.js';
// I used jsonplaceholder API to play with data
const app = document.getElementById('app');
const dataWrapper = document.getElementById('todosWrapper');
const filter = document.getElementById('filterWrapper');

filter.append(...DashboardFilter(dataWrapper));

