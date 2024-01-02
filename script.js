document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listElement = document.querySelector("#tasks");
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (!Array.isArray(savedTasks)) {
    savedTasks = []; // Initialize as an empty array
  }

  savedTasks.forEach((savedTask) => {
    createTaskElement(savedTask);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    // Save the task to local storage
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Create and append task element to the list
    createTaskElement(task);

    input.value = "";
  });

  function createTaskElement(task) {
    const taskElement = document.createElement("div");

    taskElement.classList.add("task");

    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("content");

    taskElement.appendChild(taskContentElement);

    const taskInputElement = document.createElement("input");
    taskInputElement.classList.add("text");
    taskInputElement.type = "text";
    taskInputElement.value = task;
    taskInputElement.setAttribute("readonly", "readonly");

    taskContentElement.appendChild(taskInputElement);

    const taskActionElement = document.createElement("div");
    taskActionElement.classList.add("actions");

    const taskEditElement = document.createElement("button");
    taskEditElement.classList.add("edit");
    taskEditElement.innerText = "Edit";

    const taskDeleteElement = document.createElement("button");
    taskDeleteElement.classList.add("delete");
    taskDeleteElement.innerText = "Delete";

    taskActionElement.appendChild(taskEditElement);
    taskActionElement.appendChild(taskDeleteElement);

    taskElement.appendChild(taskActionElement);

    listElement.appendChild(taskElement);

    taskEditElement.addEventListener("click", () => {
      if (taskEditElement.innerText.toLowerCase() == "edit") {
        taskEditElement.innerText = "Save";
        taskInputElement.removeAttribute("readonly");
        taskInputElement.focus();
      } else {
        taskEditElement.innerText = "Edit";
        taskInputElement.setAttribute("readonly", "readonly");

        // Update the task in local storage when saved
        const updatedTasks = savedTasks.map((savedTask) => {
          return savedTask === task ? taskInputElement.value : savedTask;
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    });
    // localStorage.removeItem("data", input.value);
    // localStorage.removeItem("tasks");
    taskDeleteElement.addEventListener("click", () => {
      listElement.removeChild(taskElement);

      // Remove the task from local storage
      const updatedTasks = savedTasks.filter(
        (savedTask) => savedTask !== taskInputElement.value
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });
  }
});
