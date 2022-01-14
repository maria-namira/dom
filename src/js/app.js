import data from './data';
import Table from './Table';
const table = new Table(data);
table.bindToDOM(document.getElementById('container'));
table.drawTable();
table.startSorting();
