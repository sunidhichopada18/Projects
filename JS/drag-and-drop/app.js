const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');

//Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

//Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

console.log(backlogListArray);

//Drag Functionality

//Get Arrays from localStorage if available, set default values if not
function getSavedColumns(){
    if (localStorage.getItem('backlogItems')){
        console.log(backlogListArray);
        backlogListArray = JSON.parse(localStorage.backlogItems);
        console.log(backlogListArray);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    }else{
        backlogListArray = ['Release the course', 'Sit back and relax'];
        progressListArray = ['Work on projects', 'Listen to music'];
        completeListArray = ['Being cool', 'Getting stuff done'];
        onHoldListArray = ['Being uncool'];
    }
}

getSavedColumns();
updateSavedColumns();

//set localStorage Arrays
function updateSavedColumns(){
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    });
}

//create DOM Elements for each list item
function createItemEl(columnEl, column, item, index){
    console.log('columnEl:',  columnEl);
    console.log('column:', column);
    console.log('item:', item);
    console.log('index:', index);

    //list Item
    const listEl = document.createElement('li');
    listEl.classList.add('drag-item');
}
// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once
    if(!updatedOnLoad){
        getSavedColumns();
    }
    // Backlog Column
    backlogListEl.textContent = '';
    backlogListArray.forEach((backlogItem, index) => {
        createItemEl(backlogListEl, 0, backlogItem, index);
    });
    // Progress Column
    progressListEl.textContent = '';
    progressListArray.forEach((progressItem, index) => {
        createItemEl(progressListEl, 1, progressItem, index);
    });
  
    // Complete Column
    completeListEl.textContent = '';
    completeListArray.forEach((completeItem, index) => {
        createItemEl(completeListEl, 2, completeItem, index);
    });
  
    // On Hold Column
    onHoldListEl.textContent = '';
    onHoldListArray.forEach((onHoldItem, index) => {
        createItemEl(onHoldListEl, 3, onHoldItem, index);
    });
  
    // Run getSavedColumns only once, Update Local Storage
  }

  //on load
  updateDOM();