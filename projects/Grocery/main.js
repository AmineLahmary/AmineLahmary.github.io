import * as support from "./support.js"
//import {Item} from "./ItemClasss.js"
import {Item} from "./ItemClass.js"
import dragRow from "./dragging.js"

let 
data = [
  new Item("Winnie Boyd"),
  new Item("Philip Garcia"),
  new Item("Blanche Bowers"),
],
editFieldIsOpen = false,
editField = document.createElement("p"),
saveIcon = "<i class=\"fa-regular fa-floppy-disk\" style=\"color: #9f9;\"></i>";



const   
listItem        = document.querySelector(".list-item"),
inputField      = document.querySelector(".insert-field"),
addBtn          = document.querySelector(".save-btn"),
itemName        = document.querySelectorAll(".item-name"),
totalItemsLabel = document.querySelector(".total"),
deleteAllBtn    = document.querySelector(".delete-all"),
searchBx        = document.querySelector(".search-bx");


// Display data
showData(data);
// add class edit-input to edit field (p tag)
editField.classList.add("edit-input");
editField.setAttribute("maxlength", "60")

function add() {

  try {
    let item = new Item();

    item.name = inputField.value;

    inputField.value = ""

    data.push(item)

    support.alertMessage('added successfully', "success")
    
    showData(data)

    document.querySelectorAll(".delete-btn").forEach(removeBtn => {
      removeBtn.addEventListener("click", deleteItem)
    });

    document.querySelectorAll(".edit-btn").forEach(editBtn => {
      editBtn.addEventListener("click",  edit)
    });

    

    dragRow(data).init()
    
  } catch ({message,name}) {

    inputField.parentElement.classList.add("animate__shakeX");
    inputField.parentElement.addEventListener('animationend', () => {
      inputField.parentElement.classList.remove('animate__shakeX');
    });

    support.alertMessage(message, "error")
    
  }

}

function deleteItem(e) {

  const itemId = e.currentTarget.getAttribute("data-id");

  data = data.filter(item => item.id != itemId);

  showData(data);
  dragRow(data).init()
}

function edit(e) {

  const itemId   = e.currentTarget.getAttribute("data-id"),
        itemName = document.querySelector(`[data-id='${itemId}'] .item-name`),
        editBtn  = document.querySelector(`[data-id='${itemId}'] .edit-btn`);

  if(!editFieldIsOpen) {
    console.log(123)
    editFieldIsOpen = true;
    editField.textContent = itemName.innerHTML;
    editField.setAttribute("contenteditable",'')
    itemName.innerHTML = editField.outerHTML;
    editBtn.innerHTML = saveIcon;

  }else if(editBtn.innerHTML == saveIcon) {
    data = data.map((item) => {
      if(item.itemId == itemId) {
        console.log(data)
        const editFieldValue = document.querySelector(".edit-input").textContent;
        item.name = editFieldValue;
      }
      return item;
    });
    editFieldIsOpen = false;
    showData(data);
    dragRow(data).init()
  }
}

function deleteAll() {
    if(confirm("are you sure you want to delete all the items in the list ?")){
      data = []
      showData(data)
    }
}

function showData(data) {
  let i = 0
  

  listItem.innerHTML = data.map((item) => {
      console.log(item)
      return itemRow(item,i++)
    })
    .join("")

    totalItemsLabel.textContent = `Total : ${i}`

    document.querySelectorAll(".delete-btn").forEach(removeBtn => {
      removeBtn.addEventListener("click", deleteItem)
    });

    document.querySelectorAll(".edit-btn").forEach(editBtn => {
      editBtn.addEventListener("click",  edit)
    });

}


function itemRow(item,index) {
  return `
  <li class="item-row" data-id="${item.itemId}" draggable="true" data-index="${index}">
    <div class="item-name-container">
      <span><i class="fa-solid fa-grip-vertical"></i></span>
      <p class="item-name">${item.name}</p>
    </div>
    <div class="actions-container">
      <button class="edit-btn" data-id="${item.itemId}">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="delete-btn" data-id="${item.itemId}" style="color: #f66;">
      <i class="fa-solid fa-trash-can"></i></button>
    </div>
  </li>`;
}


// =========== Event handlers ==========//

function handleSearchKeyup() {
    const filtredData = support.search(data, searchBx.value)
    showData(filtredData)
    dragRow(data).init()
}

function handleKeypressToAdd(event) {
    if (event.key === "Enter") {
      inputField.focus();
      addBtn.click();
    }
}


function handleDocumentClick(event) {
  const isEditBtn = event.target.classList.contains("edit-btn");
  const isEditInput = event.target.classList.contains("edit-input");
  const isSaveBtn = event.target.classList.contains("save-btn");
  const isEditInputOpen = document.querySelector(".edit-input") || null

  if (!isEditBtn && !isEditInput && !isSaveBtn && isEditInputOpen) {
    editFieldIsOpen = false;
    showData(data)
  }
}



// ========== Events Listener ========== //


// add item
addBtn.addEventListener("click", add)
// Add item with enter key
window.addEventListener("keypress", handleKeypressToAdd);
// search field
searchBx.addEventListener("input", handleSearchKeyup)
// Delete All items Button
deleteAllBtn.addEventListener("click", deleteAll)
// Close Edit field when the user click on the window
document.addEventListener("click", handleDocumentClick)