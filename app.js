let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];

const ongoingTaskNumber = document.getElementById("ongoingTaskNumber");
const completedTasNumber = document.getElementById("completedTasNumber");
const totalTaskNumber = document.getElementById("totalTaskNumber");
const createTaskRedirect = document.getElementById("createTaskRedirect");

const taskName = document.getElementById("taskName");
const categorySelect = document.getElementById("categorySelect");
const createBtn = document.getElementById("createBtn");
const taskListMain = document.getElementById("taskListMain");

function createBtnHandler() {
  console.log("fired");
  const taskNameVal = taskName.value.trim();
  const categorySelectVal = categorySelect.value;

  if (!taskNameVal || !categorySelectVal) {
    alert("Please enter all the details!");
    return;
  }

  let taskObj = {
    task: taskNameVal,
    category: categorySelectVal,
    date: new Date().toLocaleString(),
    id: Date.now(),
  };

  taskArr.push(taskObj);
  saveToStorage();

  taskName.value = "";
  categorySelect.value = "";
}

renderAll();

function saveToStorage() {
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
  renderAll();
}

// render all task
function renderAll() {
  taskListMain.innerHTML = "";
  taskArr.forEach((tsk) => {
    const li = document.createElement("li");
    const removeBtn = document.createElement("button");

    removeBtn.innerText = "remove";
    li.textContent = `${tsk.category}||${tsk.task} || ${tsk.date}`;

    taskListMain.appendChild(li);
    li.appendChild(removeBtn);

    removeBtn.addEventListener("click", () => {
      removeTask(tsk.id);
    });
  });
  console.log("Tasks rendered successfully");
}

// remove task function
function removeTask(id) {
  taskArr = taskArr.filter((tsk) => {
    return tsk.id !== id;
  });

  console.log("Task removed successfully!");
  saveToStorage();
}

createBtn.addEventListener("click", createBtnHandler);

// dashboard rendering
