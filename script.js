
const logoutModal = document.getElementById("logoutModal");
const confirmLogoutBtn = document.getElementById("confirmLogout");
const cancelLogoutBtn = document.getElementById("cancelLogout");
const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
  
    logoutModal.style.visibility = "visible";
    logoutModal.style.opacity = "1";
});


confirmLogoutBtn.addEventListener("click", () => {
    window.location.href = "index.html"; 
});


cancelLogoutBtn.addEventListener("click", () => {
    closeLogoutModal();
});

const closeLogoutModal = () => {
    logoutModal.style.opacity = "0";
    logoutModal.style.visibility = "hidden";
};



const helpButton = document.getElementById("help-button");
const helpChat = document.getElementById("help-chat");
const closeChatButton = document.getElementById("close-chat");

helpButton.addEventListener("click", () => {
    helpChat.classList.toggle("hidden");
});

closeChatButton.addEventListener("click", () => {
    helpChat.classList.add("hidden");
});



const languageToggleButton = document.getElementById("language-toggle");
const languageDropdown = document.getElementById("language-dropdown");

languageToggleButton.addEventListener("click", () => {
    languageDropdown.classList.toggle("hidden");
});

languageDropdown.addEventListener("click", (event) => {
    const selectedLang = event.target.closest("li");
    if (!selectedLang) return;

    const langCode = selectedLang.dataset.lang;
    const langFlag = selectedLang.querySelector("img").src;
    const langName = selectedLang.textContent.trim();

    languageToggleButton.innerHTML = `<img src="${langFlag}" alt="${langName}" class="flag-icon"> ${langCode.toUpperCase()}`;

    languageDropdown.classList.add("hidden");

    console.log(`Idioma cambiado a: ${langName} (${langCode})`);
});

document.addEventListener("click", (event) => {
    if (!languageToggleButton.contains(event.target) && !languageDropdown.contains(event.target)) {
        languageDropdown.classList.add("hidden");
    }
});



const themeToggleButton = document.getElementById("theme-toggle");

themeToggleButton.addEventListener("click", () => {
    const body = document.body;
    
    body.classList.toggle("light-mode");
    
    const isLightMode = body.classList.contains("light-mode");
    themeToggleButton.textContent = isLightMode ? "☀️":"🌙" ;
});



document.getElementById("user-button").addEventListener("click", () => {
    const dropdown = document.getElementById("user-dropdown");
    dropdown.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("user-dropdown");
    const userButton = document.getElementById("user-button");
    if (!userButton.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add("hidden");
    }
});


const changeLanguage = () => {
    const language = document.getElementById("language-selector").value;
    document.querySelector("h1").textContent = translations[language].title;
    document.getElementById("backlog-header").textContent = translations[language].backlog;
    document.getElementById("ready-header").textContent = translations[language].ready;
    document.getElementById("progress-header").textContent = translations[language].inProgress;
    document.getElementById("review-header").textContent = translations[language].inReview;
    document.getElementById("add-task").textContent = translations[language].addTask;
};


        let currentTaskElement = null;

        const drop = (event) => {
            event.preventDefault();
            let taskID = event.dataTransfer.getData("text");
            if (event.target.id.includes("task")) return;
            event.target.appendChild(document.getElementById(taskID));
            updateTasksCount();
        }

        const allowdrop = (event) => {
            event.preventDefault();
        }

        const drag = (event) => {
            event.dataTransfer.setData("text", event.target.id);
        }

        const updateTasksCount = () => {
            const backlogColumn = document.getElementById("backlog");
            const readyColumn = document.getElementById("ready");
            const inReviewColumn = document.getElementById("in-review");

            const backlogHeader = document.getElementById("backlog-header");
            const readyHeader = document.getElementById("ready-header");
            const inReviewHeader = document.getElementById("review-header");

            updateHeader("Por hacer", backlogHeader, backlogColumn);
            updateHeader("En curso", readyHeader, readyColumn);
            updateHeader("Hecho", inReviewHeader, inReviewColumn);
        }

        const updateHeader = (title, header, column) => {
            const taskCount = column.children.length;
            const taskCondition = taskCount > 1 ? "Tareas" : "Tarea";
            header.innerHTML = `${title} <br>(<span style="color: #2196F3">${taskCount} ${taskCondition}</span>)`;
        }

        const addTask = () => {
            const backlogColumn = document.getElementById("backlog");
            const newTaskID = `task${backlogColumn.children.length + 1}`;
            const newTask = document.createElement("p");
            newTask.className = "task";
            newTask.id = newTaskID;
            newTask.draggable = true;
            newTask.ondragstart = (event) => drag(event);
            newTask.onclick = (event) => openTaskDetails(event);
            newTask.textContent = `Tarea ${backlogColumn.children.length + 1}`;
            newTask.dataset.description = "Escribe aquí tu descripción";
            newTask.dataset.subtasks = JSON.stringify([]);
            backlogColumn.appendChild(newTask);
            updateTasksCount();
        }

        const openTaskDetails = (event) => {
            currentTaskElement = event.target;
            const modal = document.getElementById("task-modal");
            document.getElementById("task-title-input").value = currentTaskElement.textContent;
            document.getElementById("task-description-input").value = currentTaskElement.dataset.description || "";

            const subtasks = JSON.parse(currentTaskElement.dataset.subtasks || "[]");
            const subtasksList = document.getElementById("subtasks-list");
            subtasksList.innerHTML = "";
            subtasks.forEach((subtask, index) => {
                const li = document.createElement("li");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = subtask.completed;
                checkbox.onchange = () => toggleSubtaskCompletion(index);

                const text = document.createTextNode(subtask.text);
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = () => removeSubtask(index);

                li.appendChild(checkbox);
                li.appendChild(text);
                li.appendChild(removeButton);
                subtasksList.appendChild(li);
            });

            modal.style.display = "block";
        }

        const closeTaskDetails = () => {
            const modal = document.getElementById("task-modal");
            modal.style.display = "none";
        }

const saveTaskDetails = () => {
    const titleInput = document.getElementById("task-title-input").value;
    const descriptionInput = document.getElementById("task-description-input").value;
    const priorityInput = document.getElementById("task-priority").value;
    const assigneeInput = document.getElementById("task-assignee").value;
    const deadlineInput = document.getElementById("task-deadline").value;

    if (currentTaskElement) {
        currentTaskElement.innerHTML = `
            <p class="task-title">${titleInput || "Untitled Task"}</p>
            <p class="task-details">
                Deadline: ${deadlineInput || "Sin fecha"} | Asignada a: ${assigneeInput || "nadie"}
            </p>
        `;

        currentTaskElement.classList.remove("priority-high", "priority-medium", "priority-low");
        currentTaskElement.classList.add(priorityInput);

        currentTaskElement.dataset.description = descriptionInput;
        currentTaskElement.dataset.priority = priorityInput;
        currentTaskElement.dataset.assignee = assigneeInput;
        currentTaskElement.dataset.deadline = deadlineInput;
    }

    closeTaskDetails();
};




        const addSubtask = () => {
            const newSubtaskInput = document.getElementById("new-subtask-input");
            const subtasksList = document.getElementById("subtasks-list");
            const newSubtaskText = newSubtaskInput.value;
            if (newSubtaskText.trim() === "") return;

            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const text = document.createTextNode(newSubtaskText);
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = () => li.remove();

            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(removeButton);
            subtasksList.appendChild(li);

            newSubtaskInput.value = "";
        }

        const toggleSubtaskCompletion = (index) => {
            const subtasks = JSON.parse(currentTaskElement.dataset.subtasks || "[]");
            subtasks[index].completed = !subtasks[index].completed;
            currentTaskElement.dataset.subtasks = JSON.stringify(subtasks);
        }

        const removeSubtask = (index) => {
            const subtasks = JSON.parse(currentTaskElement.dataset.subtasks || "[]");
            subtasks.splice(index, 1);
            currentTaskElement.dataset.subtasks = JSON.stringify(subtasks);
            openTaskDetails({ target: currentTaskElement });
        }

        const deleteTask = () => {
            const taskModal = document.getElementById("task-modal");
            const customModal = document.getElementById("customModal");
        
            taskModal.style.display = "none";
        
            customModal.style.visibility = "visible";
            customModal.style.opacity = "1";
        
            document.getElementById("confirmDelete").onclick = () => {
                if (currentTaskElement) {
                    currentTaskElement.remove();
                    updateTasksCount();
                }
                closeCustomModal();
            };
        
            document.getElementById("cancelDelete").onclick = () => {
                closeCustomModal();
                taskModal.style.display = "block";
            };
        };
        
        const closeCustomModal = () => {
            const customModal = document.getElementById("customModal");
            customModal.style.opacity = "0";
            customModal.style.visibility = "hidden";
        };
        

        updateTasksCount();
		