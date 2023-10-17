import { annotate } from './notation.js';

const addItemInput = document.querySelector('.add-item-input')
const addItemBtn   = document.querySelector('.add-item-btn')
const itemsContainer = document.querySelector('.items-container')

function addTask() {
    if(addItemInput.value.trim() === "") {
        alert("Feild is empty !")
        addItemInput.focus()
    }
    else {
        const newItem = document.createElement('li')
        const deleteItem = document.createElement('span')
        deleteItem.textContent = "x";
        newItem.innerHTML = `<p>${addItemInput.value}</p>`
        itemsContainer.appendChild(newItem)
        newItem.appendChild(deleteItem)
        saveData()
    }
}

function itemFunctionality(e) {
    if(e.target.tagName == 'LI') {
        e.target.classList.add('checked')
        const crossedOff = annotate(e.target.children[0], {type: 'crossed-off'})
        crossedOff.show()
    }
    if(e.target.tagName == 'SPAN') e.target.parentElement.remove()
    saveData()
}

function saveData() {
    localStorage.setItem('taskList', itemsContainer.innerHTML)
}

function showData() {
    itemsContainer.innerHTML = localStorage.getItem('taskList')
}

function handleKeyPressToAdd(e) {
    if(e.key == "Enter") addTask()
}



itemsContainer.addEventListener('click', itemFunctionality)
addItemBtn.addEventListener('click', addTask)
window.addEventListener('DOMContentLoaded', showData)
window.addEventListener('keypress',handleKeyPressToAdd)