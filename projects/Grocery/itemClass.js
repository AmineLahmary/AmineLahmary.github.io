import * as support from "./support.js"

export class Item {

  itemId;#itemName

  constructor(name, id = support.makeid(8) ) {
    this.itemId = id;
    this.#itemName = name;
  }

  get name() {
    return this.#itemName;
  }

  set name(name) {
    if (!support.validate(name)) {
      throw new Error("Insert Field is not valid !");
    } else {
      this.#itemName = support.escape(name);
    }
  }

  get id() {
    return this.itemId
  }

    itemInRow(index) {
        
        return `
        <li class="item-row" draggable="true" data-id="${this.itemId}" data-index="${index}">
          <div class="item-name-container">
            <span><i class="fa-solid fa-grip-vertical"></i></span>
            <p class="item-name">${this.#itemName}</p>
          </div>
          <div class="actions-container">
            <button class="edit-btn" data-id="${this.itemId}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete-btn" data-id="${this.itemId}" style="color: #f66;"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </li>`;
    }
}