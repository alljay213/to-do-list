document.addEventListener("DOMContentLoaded", function () {
  // Check if night mode is stored in local storage
  const nightModeEnabled = localStorage.getItem("nightMode") === "true";

  // Apply night mode if it was enabled
  if (nightModeEnabled) {
    toggleNightMode();
  }

  // Event listener for the night mode toggle checkbox
  document
    .getElementById("nightModeToggle")
    .addEventListener("change", function () {
      toggleNightMode();
    });

  // Event listener for the add task button
  document.getElementById("addTaskBtn").addEventListener("click", function () {
    displayTask();
  });

  // Function to toggle night mode
  function toggleNightMode() {
    const body = document.body;
    const container = document.getElementById("container");
    const button = document.getElementById("addTaskBtn");
    const listItems = document.querySelectorAll("#taskContainer li");

    body.classList.toggle("night-mode");
    container.classList.toggle("night-mode");
    button.classList.toggle("night-mode");

    listItems.forEach(function (item) {
      item.classList.toggle("night-mode");
    });

    // Store the night mode state in local storage
    const nightModeState = body.classList.contains("night-mode");
    localStorage.setItem("nightMode", nightModeState);
  }

  // Function to add a new task to the list
  function displayTask() {
    // ... (your existing displayTask code)
  }

  // Check if the page was reloaded
  if (performance.navigation.type === 1) {
    // Use setTimeout to ensure the night mode setting is cleared after the DOM is updated
    setTimeout(function () {
      // Clear night mode setting on page reload
      localStorage.removeItem("nightMode");
    }, 0);
  }
});

// Function to add a new task to the list
function displayTask() {
  const inputTask = document.getElementById("inputTask");
  const taskContainer = document.getElementById("taskContainer");

  // Get the task input value
  const taskInput = inputTask.value.trim();

  // Check if the input is not empty
  if (taskInput !== "") {
    // Create a new li element with the task text
    const newTask = document.createElement("li");
    newTask.textContent = taskInput;

    // Create a new button for deleting the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteBtn");

    // Append the delete button to the li element
    newTask.appendChild(deleteButton);

    // Append the li element to the task container
    taskContainer.appendChild(newTask);

    // Add click event listener to the delete button
    deleteButton.addEventListener("click", function () {
      // Remove the parent li element when the delete button is clicked
      taskContainer.removeChild(newTask);

      // Update tasks in localStorage after deletion
      updateLocalStorageTasks();
    });

    // Determine the night mode state
    const isNightMode = document.body.classList.contains("night-mode");

    // Apply appropriate styling based on the night mode state
    if (isNightMode) {
      newTask.classList.add("night-mode");
    } else {
      newTask.classList.remove("night-mode");
    }

    // Clear the input field
    inputTask.value = "";

    // Store the tasks in localStorage
    updateLocalStorageTasks();
  }
}
