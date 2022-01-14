/**
 * Класс генерирует HTML-таблицу по переданным данным ( json ),
 * с фиксированным набором полей.
 */
export default class Table {
  constructor(data) {
    this.data = data;
    this.container = null;
    this.dataSort = ['id', 'id', 'title', 'title', 'year', 'year', 'imdb', 'imdb'];
    this.isAscent = true;
    this.idx = 0;
  }

  /**
 * Метод получает HTMLElement из DOM и записывает его в свойство this.container
 * @param {HTMLelement} container
 */
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  /**
   * Метод генерирует HTML-разметку по переданным в конструктор данным и
   * втавляет её в DOM
   */
  drawTable() {
    this.checkBinding();
    const table = document.createElement('table');
    table.className = 'table';
    table.innerHTML = `<caption class="table_title">Рейтинг фильмов</caption>
                       <thead class="table_head">
                          <tr>
                            <th data-name="id">id <span></span></th>
                            <th data-name="title">Название <span></span></th>
                            <th data-name="year">Год <span></span></th>
                            <th data-name="imdb">imdb <span></span></th>
                          </tr>
                        </thead>`;
    const tbody = document.createElement('tbody');
    tbody.className = 'table_body';
    this.data.forEach((e) => {
      const tr = `<tr data-id="${e.id}" data-title="${e.title}" data-year="${e.year}" data-imdb="${e.imdb}">
                    <td>${e.id}</td>
                    <td>${e.title}</td>
                    <td>(${e.year})</td>
                    <td>imdb: ${e.imdb.toFixed(2)}</td>
                  </tr>`;
      tbody.innerHTML += tr;
    });
    table.appendChild(tbody);
    table.innerHTML += `<tfoot class="table_footer">
                          <tr>
                            <th scope="row" colspan="3">Всего фильмов:</th>
                            <td colspan="2">${tbody.children.length}</td>
                          </tr>
                        </tfoot>`;
    this.container.appendChild(table);
  }

  /**
   * Метод сортирует таблицу по переданному в параметр полю по возрастанию/убыванию,
   * в зависимости от состояния свойства this.isAscent, соответственно.
   * @param {string} field параметр сортировки (id, Название, Год, imdb)
   */
  getSort(field) {
    const tbodyEl = document.querySelector('.table_body');
    const elements = [...tbodyEl.querySelectorAll('tr')];
    this.addArrow();

    if (this.isAscent) {
      elements.sort((a, b) => {
        if (field === 'title') {
          return a.dataset[field] < b.dataset[field] ? -1 : 1;
        }
        return a.dataset[field] - b.dataset[field];
      });
      this.isAscent = false;
    } else {
      elements.sort((a, b) => {
        if (field === 'title') {
          return a.dataset[field] > b.dataset[field] ? -1 : 1;
        }
        return b.dataset[field] - a.dataset[field];
      });
      this.isAscent = true;
    }

    tbodyEl.innerHTML = '';
    tbodyEl.append(...elements);
  }

  /**
   * Метод добавляет стрелку (вверх/вниз) элементу span в тэге thead,
   * в зависимости от  сортировки (по возрастанию/убыванию) соответственно
   */
  addArrow() {
    const curArrow = this.container.querySelector(`[data-name="${this.dataSort[this.idx]}"]`);
    const spans = this.container.querySelectorAll('.table_head span');
    spans.forEach((e) => {
      e.innerHTML = '';
    });
    curArrow.firstElementChild.innerHTML = this.isAscent ? '&#8657' : '&#8659';
  }

  /**
   * Метод проверяет связь контейнера с DOM
   */
  checkBinding() {
    if (this.container === null) {
      throw new Error('Table not bind to DOM');
    }
  }

  /**
   * Метод запускает сортировку таблицы, с переданной в миллисекундах переодичностью,
   * по умолчанию установлена переодичность 2000мс.
   * @param {number} interval миллисекунды
   */
  startSorting(interval = 2000) {
    if (!interval) return;
    setInterval(() => {
      this.getSort(this.dataSort[this.idx]);
      this.idx += 1;
      if (this.idx > this.dataSort.length - 1) {
        this.idx = 0;
      }
    }, interval);
  }
}