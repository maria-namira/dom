export default class GamePlay {
  constructor() {
    this.boardSize = 5;
    this.container = null;
    this.cells = [];
    this.goblinPosition = null;
  }

  init() {
    this.drawBoard();
    this.startGame();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawBoard() {
    this.checkBinding();

    this.container.innerHTML = '<h1>Whack the goblin</h1>';
    const board = document.createElement('div');
    board.className = 'board';
    const cellSize = `calc(80vh / ${this.boardSize})`;
    board.style.gridTemplateColumns = `repeat(${this.boardSize}, ${cellSize}`;
    board.style.gridTemplateRows = `repeat( ${this.boardSize}, ${cellSize}`;
    const cell = '<div class="cell"></div>';

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      board.innerHTML += cell;
    }

    this.cells = [...board.children];
    this.container.appendChild(board);
  }

  getRandomIndex() {
    const index = Math.floor(Math.random() * this.boardSize ** 2);
    if (index === this.goblinPosition) {
      return this.getRandomIndex();
    }

    return index;
  }

  addGoblinPosition() {
    this.goblinPosition = this.getRandomIndex();
    this.cells[this.goblinPosition].classList.add('goblin');
  }

  deleteGoblinPosition() {
    this.cells[this.goblinPosition].classList.remove('goblin');
  }

  startGame() {
    setInterval(() => {
      if (this.goblinPosition !== null) {
        this.deleteGoblinPosition();
      }
      this.addGoblinPosition();
    }, 2000);
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}