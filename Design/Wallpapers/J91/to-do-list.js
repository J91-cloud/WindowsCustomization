// Local storage key
const TODO_STORAGE_KEY = 'wallpaper_todos';

// Initialize tasks from local storage or use defaults
let tasks = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [
  { text: "Make Bed", priority: "high", completed: false },
  { text: "Run security scans", priority: "high", completed: true }
];

// Currently selected priority
let currentPriority = "medium";

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasks));
}

// Function to populate to-do list
function renderTodoList() {
  const todoList = document.getElementById('todoList');
  if (!todoList) return;
  
  todoList.innerHTML = ''; // Clear existing items
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;
    
    // Create task content
    const itemContent = document.createElement('div');
    itemContent.className = 'todo-item-text';
    
    // Add priority label
    const label = document.createElement('span');
    label.className = `todo-label ${task.priority}`;
    label.textContent = task.priority;
    itemContent.appendChild(label);
    
    // Add task text
    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;
    itemContent.appendChild(textSpan);
    

    // Create delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'todo-delete';
    deleteBtn.textContent = '✕';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTodoList();
    });
    
    // Add everything to list item
    li.appendChild(itemContent);
    li.appendChild(deleteBtn);
    
    // Toggle completion status on click
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTodoList();
    });
    
    todoList.appendChild(li);
  });
}


// Initialize the todo list functionality
function initTodoList() {
  const todoList = document.getElementById('todoList');
  const todoInput = document.getElementById('todoInput');
  const todoAddBtn = document.getElementById('todoAddBtn');
  const priorityOptions = document.querySelectorAll('.priority-option');
  
  if (!todoList || !todoInput || !todoAddBtn) return;
  
  // Add task when button is clicked
  todoAddBtn.addEventListener('click', () => {
    addNewTask();
  });
  
  // Add task when Enter is pressed
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  });
  
  // Priority selection
  priorityOptions.forEach(option => {
    option.addEventListener('click', () => {
      priorityOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      currentPriority = option.dataset.priority;
    });
  });
  
  // Initial render
  renderTodoList();
}

// Function to add a new task
function addNewTask() {
  const todoInput = document.getElementById('todoInput');
  const text = todoInput.value.trim();
  
  if (text) {
    tasks.push({
      text: text,
      priority: currentPriority,
      completed: false
    });
    
    saveTasks();
    renderTodoList();
    todoInput.value = '';
  }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initTodoList);