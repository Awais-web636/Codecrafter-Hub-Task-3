let inputfield = document.getElementById("input_text");
let button = document.getElementById("btn_add");
let maindiv =document.querySelector(".content");


// let localTodoList = [];
// Get todo from local storage
const getTodoListFromLocal = () => {
 return JSON.parse(localStorage.getItem("TodolistItems"));
};
// Add todo list from local storage
const addTodoListLocalStorage = (localTodoList) => {
  return localStorage.setItem("TodolistItems",JSON.stringify(localTodoList));
};

let localTodoList = getTodoListFromLocal() || [];

// adding add list dynamically
const addTodoDynamicElem = (currEle) => {
  let divEle = document.createElement("div");
  divEle.classList.add("text");
  divEle.innerHTML = `<p>${currEle}</p><button class="content-btn">Delete</button>`;
  maindiv.append(divEle);
};

const addTodolist = (e) => {
  e.preventDefault();


  const todoListValue = inputfield.value.trim();
  inputfield.value = "";
  if( todoListValue !=="" && !localTodoList.includes(todoListValue)) {
     
   localTodoList.push(todoListValue);
   localTodoList =[...new Set(localTodoList)];
   console.log(localTodoList);
   localStorage.setItem("TodolistItems", JSON.stringify(localTodoList));

  // console.log(inputfield.value);
  //  let divEle = document.createElement("div");
  //  divEle.classList.add("text");
  //  divEle.innerHTML = `<p>${inputfield.value}</p><button class="content-btn">Delete</button>`;
  //  maindiv.append(divEle);
  // console.log(maindiv);
  addTodoDynamicElem(todoListValue);
  }
};

const showTodoList = () => {
  console.log(localTodoList);

  localTodoList.forEach((currEle) => {
    addTodoDynamicElem(currEle);
  });
 
};
showTodoList();

// remove the data 
const removeTodoEle = (e) => {
 let todoToremove = e.target;
 let todoListContent = todoToremove.previousElementSibling.innerText;
 let parentEle = todoToremove.parentElement;
 console.log(todoListContent);

localTodoList = localTodoList.filter((currEle) => {
   return currEle !== todoListContent; //.toLowercase() 
 });

  addTodoListLocalStorage(localTodoList);
  parentEle.remove();
    console.log(localTodoList);
};


button.addEventListener('click', (e) =>{
  addTodolist(e);
});

maindiv.addEventListener('click', (e) => {
 e.preventDefault();
//  console.log(e.target.classList.contains("content-btn"));
 if(e.target.classList.contains("content-btn")) {
  removeTodoEle(e);
 }

});