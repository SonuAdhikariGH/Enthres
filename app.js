let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];

const ongoingTaskNumber = document.getElementById("ongoingTaskNumber");
const completedTaskNumber = document.getElementById("completedTaskNumber");
const totalTaskNumber = document.getElementById("totalTaskNumber");
const createTaskRedirect = document.getElementById("createTaskRedirect");

const taskName = document.getElementById("taskName");
const categorySelect = document.getElementById("categorySelect");
const createBtn = document.getElementById("createBtn");
const taskListMain = document.getElementById("taskListMain");

// let totalTaskCounter = 0;

function createBtnHandler() {
  // console.log("fired");
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
    isCompleted: false,
  };

  taskArr.push(taskObj);
  saveToStorage();
  dashboardCounterRender();

  taskName.value = "";
  categorySelect.value = "";
}

renderAll();

// save to storage handler
function saveToStorage() {
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
  renderAll();
}

// render all task
function renderAll() {
  taskListMain.innerHTML = "";
  taskArr.forEach((tsk) => {
    // creation of child element
    const li = document.createElement("li");
    const removeBtn = document.createElement("button");
    const completedBtn = document.createElement("button");

    // inner text assignment
    completedBtn.innerText = "completed";
    removeBtn.innerText = "remove";

    // text content assignment
    li.textContent = `${tsk.category}||${tsk.task} || ${tsk.date}`;

    // element appending
    taskListMain.appendChild(li);
    li.appendChild(removeBtn);
    li.appendChild(completedBtn);

    if (tsk.isCompleted) {
      li.style.textDecoration = "line-through";
    }

    // eventlistnet assignment with outer functions
    removeBtn.addEventListener("click", () => {
      removeTask(tsk.id);
    });

    completedBtn.addEventListener("click", () => {
      completedTaskHandler(tsk.id);
    });
  });
  dashboardCounterRender();
  console.log("Tasks rendered successfully");
}

// remove task function
function removeTask(id) {
  taskArr = taskArr.filter((tsk) => {
    return tsk.id !== id;
  });

  console.log("Task removed successfully!");
  saveToStorage();
  dashboardCounterRender();
}

// completed task button handler
function completedTaskHandler(id) {
  taskArr = taskArr.map((tsk) => {
    if (tsk.id === id) {
      if (tsk.isCompleted === true) {
        alert("It is already marked as completed");
        return tsk;
      }
      if (tsk.isCompleted === false) {
        alert("Task marked as completed");
        return {
          ...tsk,
          isCompleted: true,
        };
      }
    }
    return tsk;
  });
  saveToStorage();
  dashboardCounterRender();
}

createBtn.addEventListener("click", createBtnHandler);

// dashboard rendering
function dashboardCounterRender() {
  // ongoingTaskNumber.innerHTML = "";
  // completedTaskNumber.innerHTML = "";
  // totalTaskNumber.innerHTML = "";
  let ongoingTaskCounter = 0;
  let completedTaskCounter = 0;

  ongoingTaskNumber.textContent = ongoingTaskCounter;
  completedTaskNumber.textContent = completedTaskCounter;

  if (taskArr.length < 0) {
    totalTaskNumber.textContent = 0;
    return;
  }

  totalTaskNumber.textContent = taskArr.length;

  taskArr.forEach((tsk) => {
    if (tsk.isCompleted === false) {
      ongoingTaskCounter++;
    }
    if (tsk.isCompleted === true) {
      completedTaskCounter++;
    }

    ongoingTaskNumber.textContent = ongoingTaskCounter;
    completedTaskNumber.textContent = completedTaskCounter;
    return tsk;
  });
}
dashboardCounterRender();

const mainQuoteList = document.getElementById("mainQuoteList");
const quoteContent = document.getElementById("quoteContent");
const quoteAuthor = document.getElementById("quoteAuthor");
const generateQuoteBtn = document.getElementById("generateQuoteBtn");

// get quotes btn handler
async function getQuotesBtnHandler() {
  let url = "https://dummyjson.com/quotes/random";
  quoteContent.textContent = "Loading...";
  quoteAuthor.textContent = "";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      quoteContent.textContent = "Error 404,Try again!";
      console.log("Error caught and displayed");
    }

    const data = await res.json();
    quoteContent.textContent = `“${data.quote}”`;
    quoteAuthor.textContent = `~${data.author}`;
  } catch (err) {
    console.error(err);
  }
}

generateQuoteBtn.addEventListener("click", getQuotesBtnHandler);
