//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const filterTodo = document.querySelector(".filter-todo");
const todoList = document.querySelector(".todo-list");




//EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterTodo.addEventListener("click", filterList);
document.addEventListener(DOMContentLoaded, getTodos);  //this is to pre-load




//FUNCTIONS
const checkTodos = ()=> {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

const createTodoElement = ()=> {
    const todoDiv = document.createElement("li");
        todoDiv.classList.add("todo");
    const newTodo = document.createElement("div");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
}

const createTodoButtons = ()=> {
    const completedButton = document.createElement("button");
        completedButton.classList.add("complete-btn");
        completedButton.innerHTML = '<i class="fas fa-check></i>';
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
        trashButton.classList.add("trash-btn");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
}



const saveLocalTodos = (todo)=> {
    checkTodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



const addTodo = ( (e)=> {
    e.preventDefault();
    createTodoElement();
    saveLocalTodos(todoInput.value);
    createTodoButtons();
    todoList.appendChild(todoDiv);
    todoInput.value = "";
});



const getTodos = ()=> {
    checkTodos();

    todos.forEach( (todo)=> {
        createTodoElement();
        createTodoButtons();
        todoList.appendChild(todoDiv);
    })
}




const deleteCheck = (e)=> {
    const item = e.target;
    const itemParent = item.parentElement;

    if(item.classList[0] === "complete-btn"){
        itemParent.classList.toggle("completed");
    }
    if(item.classList[0] === "trash-btn"){
        itemParent.classList.add("fall");
        itemParent.addEventListener('transitionComplete', ()=> {
            itemParent.remove();
        })
        removeLocalTodos(itemParent);
    }
}




const filterTodos = (e)=> {
    const todos = todoList.childNoges;
    todos.forEach( (todo)=> {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "impompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}



const removeLocalTodos = (todo)=> {
    checkTodos();   //NOTE: if this doesn't work, then ensure todos = [] is returned
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}