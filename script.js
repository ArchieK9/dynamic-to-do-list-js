// Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get the text from the input field and remove whitespace
        const taskText = taskInput.value.trim();

        // Check if the taskText is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return; // Stop further execution
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText; // Set the task text

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn'; // Add class using className (not classList)

        // Assign onclick event to remove the task when clicked
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the li element
        li.appendChild(removeBtn);

        // Add the new task (li) to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field for new task
        taskInput.value = "";
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Attach event listener to the input field for "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
