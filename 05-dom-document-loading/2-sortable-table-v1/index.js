export default class SortableTable {
  element;
  subElements = {};
  headersConfig = [];
  data = [];

  constructor(headersConfig, {
    data = []
  } ={}) {
    this.headersConfig = headersConfig;
    this.data = data;

    this.render();
  }

  getTabHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headersConfig.map(item => this.getHeaderRow(item)).join('')}
    </div>`;
  }

  getHeaderRow({id, title, sortable}){
    return `
      <div class="sortable-table__cell" data-id=${id} data-sortable=${id}>
        <span>${title}</span>
          ${this.getHeaderSortingArrow()}
        </span>
      </div>`
  }

  getHeaderSortingArrow(){
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
  }

  getTableBody(){
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>`;
  }

  getTableRows(data){
    return data.map(item => {
      return ` 
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.getTableRow(item)}
      </a>`
      
    }).join('');
  }
  
  getTableRow(item){
    const cells = this.headersConfig.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        :`<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getTable(){
    return `<div class="sortable-table">
        ${this.getTabHeader()}
        ${this.getTableBody()}
      </div>`;
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTable();

    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElemnts(element);
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-sortable]');
    const currentColumn = this.element.querySelector('.sortable-table__cell[data-sortable]');

    allColumns.forEach(column => {
      column.dataset.order = '';
    });
    currentColumn.dataset.order = order;
    
    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  sortData(field, order){
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id ===field);
    const {sortType, customSorting} = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort( (a,b) => {
      switch (sortType) {
        case 'numer':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], 'ru');
        case 'custom':
          return direction * customSorting(a,b);
        default:
          return direction * (a[field] - b[field]);
      }
    });
  }

  getSubElemnts(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

