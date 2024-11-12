"use strict";
const bigBlock = document.querySelector("#big-block");
const block = document.querySelector("#block");
const buttonClear = document.querySelector("#button-clear");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const buttonAdd = document.querySelector("#buttonAdd");
const blockItem = document.querySelector("#block-item");

function validate(input) {
  if (input.value.length <= 4) {
    alert("belgi kiriting");
    input.focus();
    return false;
  }
  return true;
}

function createCard(data) {
  return `<div class="list">
          <p>${data.name}</p>
          <span>delete</span>
        </div>`;
}

function getStorage() {
  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }
  return data;
}
let storage = getStorage();
storage.forEach((toDo) => {
  let cards = createCard(toDo);
  blockItem.innerHTML += cards;
});

if (buttonAdd) {
  buttonAdd.addEventListener("click", function (event) {
    event.preventDefault();

    const isValid = validate(input);
    if (!isValid) {
      return;
    }
    let toDo = {
      id: Date.now(),
      name: input.value,
    };
    const card = createCard(toDo);
    blockItem.innerHTML += card;
    input.value = "";
    let storage = getStorage();
    storage.push(toDo);
    localStorage.setItem("todos", JSON.stringify(storage));
  });
}
buttonClear &&
  buttonClear.addEventListener("click", function (event) {
    event.preventDefault();
    let clearAll = confirm("hammasi ochib ketishi mumkin");
    if (clearAll) {
      blockItem.innerHTML = "";
      localStorage.removeItem('storage');
    }
  });