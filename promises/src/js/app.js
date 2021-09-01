import GameSavingLoader from './GameSavingLoader';

GameSavingLoader.load().then((saving) => saving, (error) => new Error(error));