document.getElementById('bg-color').addEventListener('change', function() {
    const selectedColor = this.value;
    const container = document.querySelector('.container');

    if (!document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundColor = selectedColor;
        container.style.backgroundColor = selectedColor;
    }
});
document.getElementById('font-size').addEventListener('input', function() {
    document.body.style.fontSize = this.value + 'px';
});
document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const isDarkMode = document.body.classList.toggle('dark-mode');

    if (isDarkMode) {
        document.body.style.backgroundColor = "black";
        container.style.backgroundColor = "#333";
        container.style.color = "white";
    } else {
        const selectedColor = document.getElementById('bg-color').value || "white";
        document.body.style.backgroundColor = selectedColor;
        container.style.backgroundColor = selectedColor;
        container.style.color = "black";
    }
});
document.getElementById('font-style').addEventListener('change', function() {
    document.body.style.fontFamily = this.value;
});
function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const editButton = document.createElement('span');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editTaskInline(li, taskSpan);

    const closeButton = document.createElement('span');
    closeButton.textContent = 'X';
    closeButton.className = 'close';
    closeButton.onclick = () => deleteTask(li);

    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(closeButton);
    document.getElementById('taskList').appendChild(li);

    taskInput.value = "";
}
function deleteTask(taskItem) {
    taskItem.remove();
}
function editTaskInline(taskItem, taskSpan) {
    const oldTaskText = taskSpan.textContent;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = oldTaskText;
    inputField.style.marginRight = '10px';

    taskItem.replaceChild(inputField, taskSpan);  
    const saveButton = taskItem.querySelector('.edit');
    saveButton.textContent = 'Save';
    saveButton.onclick = function() {
        const newTaskText = inputField.value.trim();
        if (newTaskText !== "") {
            taskSpan.textContent = newTaskText;
            taskItem.replaceChild(taskSpan, inputField);
            saveButton.textContent = 'Edit';
            saveButton.onclick = () => editTaskInline(taskItem, taskSpan);
        } else {
            alert("Task cannot be empty.");
        }
    };
}