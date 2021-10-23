import GamePlay from '../GamePlay';

const game = new GamePlay();
document.body.innerHTML = '<div id="game-container"></div>';
game.boardSize = 5;

test('Метод bindToDOM должен выбросить ошибку', () => {
  expect(() => game.bindToDOM(null)).toThrowError(new Error('container is not HTMLElement'));
});

test('Метод drawBoard создает html-разметку', () => {
  game.bindToDOM(document.getElementById('game-container'));
  game.drawBoard();
  expect(game.container.firstElementChild.tagName).toBe('H1');
  expect(game.container.firstElementChild.textContent).toBe('Whack the goblin');
  expect(game.container.children[1].className).toBe('board');
  expect(game.container.children[1].children.length).toBe(game.boardSize ** 2);
  expect(game.container.children[1].lastElementChild.tagName).toBe('DIV');
  expect(game.container.children[1].firstElementChild.className).toBe('cell');
});

test('Метод drawBoard должен выбросить ошибку', () => {
  game.container = null;
  expect(() => game.drawBoard()).toThrowError(new Error('GamePlay not bind to DOM'));
});

test('Метод addGoblinPosition должен добавить класс goblin элементу', () => {
  game.addGoblinPosition();
  expect(game.cells[game.goblinPosition].className).toBe('cell goblin');
});

test('Метод deleteGoblinPosition должен удалить класс goblin', () => {
  game.deleteGoblinPosition();
  expect(game.cells[game.goblinPosition].className).toBe('cell');
});

jest.useFakeTimers();
test('Метод startGame должен вызывать setInterval', () => {
  game.startGame();
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 2000);
});

test('Метод init должен вызывать методы startGame и drawBoard', () => {
  game.drawBoard = jest.fn();
  game.startGame = jest.fn();
  game.init();
  expect(game.drawBoard).toBeCalled();
  expect(game.startGame).toBeCalled();
});