export class User {
  static Users;
  #name;
  constructor(name) {
    this.#name = name;
  }

  getName = () => this.#name;
}
