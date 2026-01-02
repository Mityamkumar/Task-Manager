const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const countText = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filter-task button");

let tasks = [];
let currentFilter = "all";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (input.value.trim() === "") return;

  const task = {
    id: Date.now(),
    text: input.value,
    completed: false
  };

  tasks.push(task);
  input.value = "";
  renderTasks();
});

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    currentFilter = this.dataset.filter;
    renderTasks();
  });
});

function renderTasks() {
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "done") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";

    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });

  updateTaskCount();
}

function updateTaskCount() {
  const activeCount = tasks.filter(task => !task.completed).length;
  countText.textContent = `${activeCount} tasks left`;
}
