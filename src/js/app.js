import GamePlay from './GamePlay';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.getElementById('game-container'));

gamePlay.init();
