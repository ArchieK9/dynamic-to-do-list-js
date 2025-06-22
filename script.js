// Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from Local Storage and display them in the DOM
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' to prevent re-saving to Local Storage
        });
    }

    // Function to add a new task to the DOM (and optionally to Local Storage)
    function addTask(taskText, save = true) {
        // Create the <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button for this task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Attach event to remove the task from the DOM and Local Storage
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the <li>
        li.appendChild(removeBtn);

        // Add the <li> to the <ul> list
        taskList.appendChild(li);

        // If save is true, add the task to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for clicking the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        addTask(taskText);
        taskInput.value = ""; // Clear input field after adding
    });

    // Event listener to allow adding a task by pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();

            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }

            addTask(taskText);
            taskInput.value = ""; // Clear input field after adding
        }
    });
});
