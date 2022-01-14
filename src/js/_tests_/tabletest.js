import data from '../data';
import Table from '../Table';

const testTable = new Table(data);
const testData = ['id', 'id', 'title', 'title', 'year', 'year', 'imdb', 'imdb'];

test('Инстанс должет быть создан с корректными свойствами', () => {
  expect(testTable.data).toEqual(data);
  expect(testTable.container).toBe(null);
  expect(testTable.dataSort).toEqual(testData);
  expect(testTable.isAscent).toBe(true);
  expect(testTable.idx).toBe(0);
});

test('Метод bindToDOM должен выбросить ошибку', () => {
  expect(() => testTable.bindToDOM(null)).toThrowError(new Error('container is not HTMLElement'));
});

test('Метод drawTable создает html-разметку', () => {
  document.body.innerHTML = '<div id="container"></div>';
  testTable.bindToDOM(document.getElementById('container'));
  testTable.drawTable();
  const table = testTable.container.firstElementChild;
  expect(table.tagName).toBe('TABLE');
  expect(table.className).toBe('table');
  expect(table.children[0].tagName).toBe('CAPTION');
  expect(table.children[0].className).toBe('table_title');
  expect(table.children[1].tagName).toBe('THEAD');
  expect(table.children[1].className).toBe('table_head');
  expect(table.children[2].tagName).toBe('TBODY');
  expect(table.children[2].className).toBe('table_body');
  expect(table.children[3].tagName).toBe('TFOOT');
  expect(table.children[3].className).toBe('table_footer');
  expect(table.children[1].children[0].children.length).toBe(4);
  expect(table.children[2].children[0].children.length).toBe(4);
  expect(table.children[3].children[0].children.length).toBe(2);
  expect(table.children[1].children[0].tagName).toBe('TR');
  expect(table.children[2].children[0].tagName).toBe('TR');
  expect(table.children[3].children[0].tagName).toBe('TR');
  expect(table.children[1].children[0].children[0].dataset.name).toBe('id');
  expect(table.children[1].children[0].children[1].dataset.name).toBe('title');
  expect(table.children[1].children[0].children[2].dataset.name).toBe('year');
  expect(table.children[1].children[0].children[3].dataset.name).toBe('imdb');
});

test('Метод getSort должен отсортировать по id по возрастанию', () => {
  testTable.getSort(testTable.dataSort[0]);
  const tbody = document.querySelector('.table_body');
  expect(tbody.children[0].children[0].textContent).toBe('25');
  expect(tbody.children[1].children[0].textContent).toBe('26');
  expect(tbody.children[2].children[0].textContent).toBe('27');
  expect(tbody.children[3].children[0].textContent).toBe('223');
  expect(tbody.children[4].children[0].textContent).toBe('1047');
});

test('Метод getSort должен отсортировать по id по убыванию', () => {
  testTable.isAscent = false;
  testTable.getSort(testTable.dataSort[0]);
  const tbody = document.querySelector('.table_body');
  expect(tbody.children[0].children[0].textContent).toBe('1047');
  expect(tbody.children[1].children[0].textContent).toBe('223');
  expect(tbody.children[2].children[0].textContent).toBe('27');
  expect(tbody.children[3].children[0].textContent).toBe('26');
  expect(tbody.children[4].children[0].textContent).toBe('25');
});

test('Метод getSort должен отсортировать по названию по убыванию', () => {
  testTable.isAscent = true;
  testTable.getSort(testTable.dataSort[2]);
  const tbody = document.querySelector('.table_body');
  expect(tbody.children[0].children[1].textContent).toBe('Криминальное чтиво');
  expect(tbody.children[1].children[1].textContent).toBe('Крёстный отец');
  expect(tbody.children[2].children[1].textContent).toBe('Крёстный отец 2');
  expect(tbody.children[3].children[1].textContent).toBe('Побег из Шоушенка');
  expect(tbody.children[4].children[1].textContent).toBe('Тёмный рыцарь');
});

test('Метод getSort должен отсортировать по названию по возрастанию', () => {
  testTable.isAscent = false;
  testTable.getSort(testTable.dataSort[2]);
  const tbody = document.querySelector('.table_body');
  expect(tbody.children[0].children[1].textContent).toBe('Тёмный рыцарь');
  expect(tbody.children[1].children[1].textContent).toBe('Побег из Шоушенка');
  expect(tbody.children[2].children[1].textContent).toBe('Крёстный отец 2');
  expect(tbody.children[3].children[1].textContent).toBe('Крёстный отец');
  expect(tbody.children[4].children[1].textContent).toBe('Криминальное чтиво');
});

test('Метод addArrow должен добавить стрелку ⇓ элементу c data-name="id" в тэге thead', () => {
  testTable.isAscent = true;
  testTable.getSort(testTable.dataSort[0]);
  testTable.addArrow();
  expect(document.querySelector('[data-name="id"]').children[0].innerHTML).toBe('⇓');
});

test('Метод addArrow должен добавить стрелку ⇑ элементу c data-name="id" в тэге thead', () => {
  testTable.isAscent = false;
  testTable.getSort(testTable.dataSort[0]);
  testTable.addArrow();
  expect(document.querySelector('[data-name="id"]').children[0].innerHTML).toBe('⇑');
});

jest.useFakeTimers();
test('Метод startSorting должен вызывать setInterval', () => {
  testTable.startSorting(2000);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
});

test('Метод checkBinding должен выбросить ошибку', () => {
  testTable.container = null;
  expect(() => testTable.checkBinding()).toThrowError(new Error('Table not bind to DOM'));
});