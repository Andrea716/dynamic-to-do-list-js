document.addEventListener('DOMContentLoaded', function() {
    // Select the DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add an event listener to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';

        // Save to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Event listener for the add button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }
        addTask(taskText);
    });

    // Event listener for pressing the Enter key in the task input
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
            addTask(taskText);
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
