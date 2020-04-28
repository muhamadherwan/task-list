// Defined UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const fiter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter event
  filter.addEventListener('keyup', filterTask);
}

// Get Task from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // Create text node and append li
    li.appendChild(document.createTextNode(task));
    // Create new link element
      const link = document.createElement('a');
    // add link class
      link.className = 'delete-item secondary-content'; 
    // add icon html to link
      link.innerHTML = '<i class="fa fa-remove">';
    // Append the link to li
      li.appendChild(link);

    // Append the li to ul
      taskList.appendChild(li);

  });

}

// Add task
function addTask(e) {
  if(taskInput.value === '' ) {
    alert('Add a task');
  } else {

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // Create text node and append li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
      const link = document.createElement('a');
    // add link class
      link.className = 'delete-item secondary-content'; 
    // add icon html to link
      link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
      li.appendChild(link);

    // Append the li to ul
      taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);  

    // clear input
    taskInput.value = '';

  }


  e.preventDefault();

}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTasks(){
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from ls
  clearTasksFromLocalStorage();                                                                                      
}

// Clear task from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Task
function filterTask(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

