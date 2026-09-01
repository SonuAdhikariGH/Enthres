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

function renderAll() {
  taskListMain.innerHTML = "";
  taskArr.forEach((tsk) => {
    const li = document.createElement("li");
    li.textContent = `${tsk.category}||${tsk.task} || ${tsk.date}`;

    taskListMain.appendChild(li);
  });
  console.log("Tasks rendered successfully");
}

createBtn.addEventListener("click", createBtnHandler);
