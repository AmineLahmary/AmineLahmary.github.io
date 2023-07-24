import * as support from "./support.js"

export class Item {

  #id;#name

  constructor(name) {
    this.#id = support.makeid(8);
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    if (!support.validate(name)) {
      throw new Error("Insert Field is not valid !");
    } else {
      this.#name = support.escape(name);
    }
  }

  get id() {
    return this.#id
  }

    itemInRow(listCount) {
        
        return `
        <li class="item-row" data-id="${this.#id}">
          <div class="item-name-container">
            <span>#${listCount}</span>
            <p class="item-name">${this.#name}</p>
          </div>
          <div class="actions-container">
            <button class="edit-btn" data-id="${this.#id}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete-btn" data-id="${this.#id}" style="color: #f66;"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </li>`;
    }
}