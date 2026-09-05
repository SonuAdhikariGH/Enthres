let taskArr = JSON.parse(localStorage.getItem("taskArr")) || [];

const ongoingTaskNumber = document.getElementById("ongoingTaskNumber");
const completedTaskNumber = document.getElementById("completedTaskNumber");
const totalTaskNumber = document.getElementById("totalTaskNumber");
const createTaskRedirect = document.getElementById("createTaskRedirect");

const taskName = document.getElementById("taskName");
const categorySelect = document.getElementById("categorySelect");
const createBtn = document.getElementById("createBtn");
const taskListMain = document.getElementById("taskListMain");

function createBtnHandler() {
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

// render all tasks
function renderAll() {
  taskListMain.innerHTML = "";

  if (taskArr.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "No tasks yet, add one above.";
    taskListMain.appendChild(emptyState);
    dashboardCounterRender();
    return;
  }

  taskArr.forEach((tsk) => {
    // creation of child elements
    const li = document.createElement("li");
    li.className = "task-item";

    const info = document.createElement("div");
    info.className = "task-info";

    const category = document.createElement("span");
    category.className = "task-category";
    category.dataset.category = tsk.category;
    category.textContent = tsk.category;

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = tsk.task;

    const date = document.createElement("span");
    date.className = "task-date";
    date.textContent = tsk.date;

    info.appendChild(category);
    info.appendChild(text);
    info.appendChild(date);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completedBtn = document.createElement("button");
    completedBtn.className = "btn-complete";
    completedBtn.innerText = "Done";

    const editTaskBtn = document.createElement("button");
    editTaskBtn.className = "btn-edit";
    editTaskBtn.innerText = "Edit";

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.innerText = "Remove";

    actions.appendChild(completedBtn);
    actions.appendChild(editTaskBtn);
    actions.appendChild(removeBtn);

    li.appendChild(info);
    li.appendChild(actions);

    if (tsk.isCompleted) {
      li.classList.add("task-item--done");
    }

    taskListMain.appendChild(li);

    // eventlistener assignment with outer functions
    removeBtn.addEventListener("click", () => {
      removeTask(tsk.id);
    });

    completedBtn.addEventListener("click", () => {
      completedTaskHandler(tsk.id);
    });

    editTaskBtn.addEventListener("click", () => {
      editTaskBtnHandler(tsk.id);
    });
  });

  dashboardCounterRender();
  console.log("Tasks rendered successfully");
}

// edit task function
function editTaskBtnHandler(id) {
  taskArr = taskArr.map((tsk) => {
    if (tsk.id === id) {
      if (tsk.isCompleted) {
        alert(
          "The task is already completed, Therefore no changes can be done.",
        );
        return tsk;
      }
      let tskInpVal = prompt("Enter new task");
      if (!tskInpVal) {
        alert("No task provided, Please try again!");
        return tsk;
      }
      return {
        ...tsk,
        task: tskInpVal,
      };
    }
    return tsk;
  });
  saveToStorage();
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
const saveQuoteBtn = document.getElementById("saveQuoteBtn");

// quote Arr localstorage
const quoteArr = JSON.parse(localStorage.getItem("quoteArr")) || [];

let quoteObj;
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

    quoteObj = {
      quote: data.quote,
      author: data.author,
    };

    quoteContent.textContent = `“${data.quote}”`;
    quoteAuthor.textContent = `~${data.author}`;
  } catch (err) {
    console.error(err);
  }
}

// save quote handler
function saveQuoteHandler() {
  if (!quoteObj) {
    alert("Please generate a quote first");
    return;
  }

  quoteArr.push(quoteObj);
  saveToQuoteStorage();

  quoteObj = "";
  quoteAuthor.textContent = "";
  quoteContent.textContent = "Generate another!";
}

saveToQuoteStorage();

// saveToQuoteStorage handler
function saveToQuoteStorage() {
  localStorage.setItem("quoteArr", JSON.stringify(quoteArr));
  renderQuoteList();
}

// renderQuoteList
function renderQuoteList() {
  mainQuoteList.innerHTML = "";

  if (quoteArr.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "No saved quotes yet.";
    mainQuoteList.appendChild(emptyState);
    return;
  }

  quoteArr.forEach((qt) => {
    const li = document.createElement("li");
    li.className = "quote-item";

    const text = document.createElement("span");
    text.className = "quote-text";
    text.textContent = qt.quote;

    const author = document.createElement("span");
    author.className = "quote-author";
    author.textContent = `~${qt.author}`;

    li.appendChild(text);
    li.appendChild(author);
    mainQuoteList.appendChild(li);
  });

  console.log("Quote list rendered successfully");
}

generateQuoteBtn.addEventListener("click", getQuotesBtnHandler);
saveQuoteBtn.addEventListener("click", saveQuoteHandler);
