export default class GameSaving {
  constructor(jsonStr) {
    const data = JSON.parse(jsonStr);
    this.id = data.id;
    this.created = data.created;
    this.userInfo = data.userInfo;
  }
}