// Array
let tasks = [
    {id: 1, description: 'Completar Desafio de la semana', completed: true},
    {id: 2, description: 'Entregar el proyecto final en Desafío Latam', completed: false},
    {id: 3, description: 'Reunión con el equipo', completed: false},
    {id: 4, description: 'Aprender React', completed: false},
    {id: 5, description: 'Aprender Vue', completed: false},
    {id: 6, description: 'Aprender Angular', completed: false},
    {id: 7, description: 'Aprender Swift', completed: false},
    {id: 8, description: 'Aprender Kotlin', completed: false},
    {id: 9, description: 'Aprender Python', completed: false},
    {id: 10, description: 'Aprender Ruby', completed: false},
];

// Dom
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const totalTasksSpan = document.getElementById('total-tasks');
const completedTasksSpan = document.getElementById('completed-tasks');
const pendingTasksSpan = document.getElementById('pending-tasks');


// FX PARA ID UNICO
const generateId = () => {
    return Math.max(...tasks.map(task => task.id), 0) + 1;
};

// ACTUALIZAR RESUMEN
const updateSummary = () => {
    if (totalTasksSpan && completedTasksSpan && pendingTasksSpan) {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;

        totalTasksSpan.textContent = total;
        completedTasksSpan.textContent = completed;
        pendingTasksSpan.textContent = pending;
    }
};

// FX RENDERIZAR TAREAS
const renderTask = (task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'task-completed' : ''}`;
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.description}</span>
        <button class="delete-btn">Eliminar</button>
    `;

    //EVENT CHECKBOX
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.classList.toggle('task-completed', task.completed);
        updateSummary();
    });

    // EVENT SUPR 
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        updateSummary();
    });

    return li;
};

// FX PARA RENDERIZAR TODAS LAS TAREAS 


const renderAllTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.appendChild(renderTask(task));
    });
    updateSummary();
};

// AGREGA NUEVAS TAREAS
addTaskBtn.addEventListener('click', () => {
    const description = newTaskInput.value.trim();
    if (description) {
        const newTask = {
            id: generateId(),
            description: description,
            completed: false
        };
        tasks.push(newTask);
        taskList.appendChild(renderTask(newTask));
        newTaskInput.value = '';
        updateSummary();
    }
});

// EVENT (PERMITE CREAR NUEVAS TAREAS PRESIONANDO ENTER)
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});





document.addEventListener('DOMContentLoaded', () => {
renderAllTasks();
});