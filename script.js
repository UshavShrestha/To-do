document.addEventListener("DOMContentLoaded", () => {
    const taskField = document.getElementById("taskField");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const filterBtns = document.querySelectorAll(".filter-btn");

    let tasks = [];

    function showTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.done) return;
            if (filter === "pending" && task.done) return;

            const taskItem = document.createElement("li");
            taskItem.classList.add("task-item");
            taskItem.style.opacity = "0";
            taskItem.innerHTML = `
                <span class="${task.done ? "done" : ""}" data-index="${index}">${task.text}</span>
                <div>
                    <button class="action-btn complete-btn" data-index="${index}">
                        <i class="fa ${task.done ? "fa-undo" : "fa-check"}"></i>
                    </button>
                    <button class="action-btn remove-btn" data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(taskItem);

            setTimeout(() => {
                taskItem.style.opacity = "1";
            }, 100);
        });
    }

    function addTask() {
        const taskText = taskField.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, done: false });
            showTasks();

            taskField.value = "";
            taskField.style.transform = "scale(1.1)";
            setTimeout(() => {
                taskField.style.transform = "scale(1)";
            }, 150);
        }
    }

    addBtn.addEventListener("click", addTask);

    taskField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    taskList.addEventListener("click", (e) => {
        if (e.target.closest(".remove-btn")) {
            const index = e.target.closest(".remove-btn").dataset.index;
            const taskItem = e.target.closest("li");

            taskItem.style.opacity = "0";
            setTimeout(() => {
                tasks.splice(index, 1);
                showTasks();
            }, 300);
        }

        if (e.target.closest(".complete-btn")) {
            const index = e.target.closest(".complete-btn").dataset.index;
            tasks[index].done = !tasks[index].done;
            showTasks();
        }
    });

    filterBtns.forEach(button => {
        button.addEventListener("click", () => {
            filterBtns.forEach(btn => btn.classList.remove("active-filter"));
            button.classList.add("active-filter");
            showTasks(button.dataset.filter);
        });
    });

    showTasks();
});
