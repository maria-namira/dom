import GameSaving from './GameSaving';
import json from './parser';
import read from './reader';

export default class GameSavingLoader {
  static load() {
    return new Promise(
      (resolve, reject) => read()
        .then((data) => json(data))
        .then((jsonStr) => resolve(new GameSaving(jsonStr)))
        .catch((err) => reject(err)),
    );
  }
}