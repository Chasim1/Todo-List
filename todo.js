/**
* Adds the elements with their id and inserts it from HTML into Javascript
**/

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

/**
*  Makes todos and adds it into an array
**/
let todos = [];

/**
* this code listens for the form's submission event
**/
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    
    /**
    *By creating a todo object with these properties, you have structured a basic representation of a tdo item in your application.
    **/
    
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(todo);
        renderTodo(todo);
        updateStats();
        todoInput.value = '';
    }
});


/**
*The function renderTodo has const's li, checkbox, span, deleteBtn. These const'serve to make the to do list into the array and checkbox for if checked makes it crossed outm span to make it go into created, delete button makes the task removes it.
**/
function renderTodo(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    
    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) span.classList.add('completed');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    
    /**
    *These update the array
    **/
    
    
    li.append(checkbox, span, deleteBtn);
    todoList.appendChild(li);
    
    checkbox.addEventListener('change', function() {
        todo.completed = checkbox.checked;
        span.classList.toggle('completed');
        updateStats();
    });
    
    deleteBtn.addEventListener('click', function() {
        todos = todos.filter(t => t.id !== todo.id);
        li.remove();
        updateStats();
    });
}

function updateStats() {
    const completed = todos.filter(todo => todo.completed).length;
    totalTasks.textContent = `Total: ${todos.length}`;
    completedTasks.textContent = `Completed: ${completed}`;
}
