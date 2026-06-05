//select dom elements

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

//try to load todos from local storage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current todo list to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create a dom nod for a todo or a append it to the list

function createTodoNode(todo,index) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
    todos[index].completed = checkbox.checked;

    textSpan.style.textDecoration =
        checkbox.checked ? 'line-through' : 'none';

    textSpan.style.opacity =
        checkbox.checked ? '0.6' : '1';

    saveTodos();
});

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin="0 8px";
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        //add double click event listener to edit todo

        textSpan.addEventListener('dblclick', () => {
            const newText = prompt('Edit todo:', todo.text);
            if (newText !== null) {
                todos[index].text = newText.trim();
                textSpan.textContent = todos[index].text;
                saveTodos();
            }
        });

        //delete todo button

        const delBtn = document.createElement('button');
        delBtn.textContent="Delete";
        delBtn.addEventListener('click', ()=>{
            todos.splice(index,1);
            saveTodos();
            render();
        });

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li;
}

//render the list of todos

function render() {
    //clear the list
    todoList.innerHTML = '';
    //render each todo
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        todoList.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if(!text){
        return;
    }
    todos.push({ text, completed: false });
    saveTodos();
    render();
    input.value = '';
}

addBtn.addEventListener('click', addTodo);
render();

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});