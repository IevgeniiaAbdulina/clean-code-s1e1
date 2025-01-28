const newTaskInput = document.getElementById("new-task__name__input");
const newTaskAddButton = document.getElementById("new-task__add-task__button");
const uncompletedTasksHolder = document.getElementById("tasks-list__uncompleted");
const completedTasksHolder = document.getElementById("tasks-list__completed");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const taskCompleteCheckbox = document.createElement("input");
  const taskNameLabel = document.createElement("label");
  const taskChangedInput = document.createElement("input");
  const taskChangedLabel = document.createElement("label");
  const taskEditButton = document.createElement("button");
  const taskDeleteButton = document.createElement("button");
  const taskDeleteButtonImage = document.createElement("img");
  const uuid = window.crypto.randomUUID();

  taskCompleteCheckbox.type = "checkbox";
  taskCompleteCheckbox.className = "task-item__complete__checkbox";
  taskCompleteCheckbox.setAttribute("id", `task-item__name-${uuid}`);

  taskNameLabel.innerText = taskString;
  taskNameLabel.className = "task-item__name__label task";
  taskNameLabel.setAttribute("for", `task-item__name-${uuid}`);

  taskChangedInput.type = "text";
  taskChangedInput.className = "task-item__input__changed task";
  taskChangedInput.setAttribute("id", `task-item__input-${uuid}`);

  taskChangedLabel.setAttribute("for", `task-item__input-${uuid}`);

  taskEditButton.innerText = "Edit";
  taskEditButton.className = "task-item__edit__button";

  taskDeleteButton.className = "task-item__delete__button";
  taskDeleteButtonImage.src = "./remove.svg";
  taskDeleteButtonImage.alt = "Remove button image";

  taskDeleteButton.appendChild(taskDeleteButtonImage);
  listItem.appendChild(taskCompleteCheckbox);
  listItem.appendChild(taskNameLabel);
  listItem.appendChild(taskChangedInput);
  listItem.appendChild(taskChangedLabel);
  listItem.appendChild(taskEditButton);
  listItem.appendChild(taskDeleteButton);
  return listItem;
}

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  uncompletedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = "";
}

const editTask = function () {
  const listItem = this.parentNode;
  const taskChangedInput = listItem.querySelector(".task-item__input__changed");
  const taskNameLabel = listItem.querySelector(".task-item__name__label");
  const taskEditButton = listItem.querySelector(".task-item__edit__button");
  const containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    taskNameLabel.innerText = taskChangedInput.value;
    taskEditButton.innerText = "Edit";
  } else {
    taskChangedInput.value = taskNameLabel.innerText;
    taskEditButton.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const listItemContainer = listItem.parentNode;

  listItemContainer.removeChild(listItem);
}

const changeTaskCompletion = function (event) {
  const listItem = this.parentNode;
  const taskCompleteCheckbox = event.target;
  let completed = taskCompleteCheckbox.checked;

  let holder = (completed) ? completedTasksHolder : uncompletedTasksHolder;
  holder.appendChild(listItem);
}

//Set the click handler to the addTask function.
newTaskAddButton.onclick = addTask;
newTaskAddButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const taskCompleteCheckbox = taskListItem.querySelector(".task-item__complete__checkbox");
  const taskEditButton = taskListItem.querySelector(".task-item__edit__button");
  const taskDeleteButton = taskListItem.querySelector(".task-item__delete__button");

  taskEditButton.onclick = editTask;
  taskDeleteButton.onclick = deleteTask;
  taskCompleteCheckbox.onchange = changeTaskCompletion;
}

for (let i = 0; i < uncompletedTasksHolder.children.length; i++) {
  bindTaskEvents(uncompletedTasksHolder.children[i]);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i]);
}
