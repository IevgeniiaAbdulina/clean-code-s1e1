const newTaskInput = document.getElementById("new-task__name__input");
const newTaskAddButtton = document.getElementsByTagName("new-task__add-task__button");
const uncompletedTasksHolder = document.getElementById("tasks-list__uncompleted");
const completedTasksHolder = document.getElementById("tasks-list__completed");


const createNewTaskElement = function (taskString) {
    const listItem = document.createElement("li");
    const taskCompleteCheckbox = document.createElement("input");
    const taskNameLabel = document.createElement("label");
    const taskChangedInput = document.createElement("input");
    const taskEditButton = document.createElement("button");
    const taskDeleteButton = document.createElement("button");
    const taskDeleteButtonImage = document.createElement("img");

    taskCompleteCheckbox.type = "checkbox";
    taskCompleteCheckbox.className = "task-item__complete__checkbox";

    taskNameLabel.innerText = taskString;
    taskNameLabel.className = "task-item__name__label task";

    taskChangedInput.type = "text";
    taskChangedInput.className = "task-item__input__changed task";

    taskEditButton.innerText = "Edit";
    taskEditButton.className = "task-item__edit__button";

    taskDeleteButton.className = "task-item__delete__button";
    taskDeleteButtonImage.src = "./remove.svg";
    taskDeleteButtonImage.alt = "Remove button image";

    taskDeleteButton.appendChild(taskDeleteButtonImage);
    listItem.appendChild(taskCompleteCheckbox);
    listItem.appendChild(taskNameLabel);
    listItem.appendChild(taskChangedInput);
    listItem.appendChild(taskEditButton);
    listItem.appendChild(taskDeleteButton);
    return listItem;
}


const addTask = function () {
    if (!newTaskInput.value) return;
    const listItem = createNewTaskElement(newTaskInput.value);

    uncompletedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    newTaskInput.value = "";
}

const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector("input[type=text]");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".edit");
    const containsClass = listItem.classList.contains("edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}

const taskCompleted = function () {
    const listItem = this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = function () {
    const listItem = this.parentNode;

    uncompletedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


const ajaxRequest = function () {
}

//Set the click handler to the addTask function.
newTaskAddButtton.onclick = addTask;
newTaskAddButtton.addEventListener("click", addTask);
newTaskAddButtton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < uncompletedTasksHolder.children.length; i++) {
    bindTaskEvents(uncompletedTasksHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
