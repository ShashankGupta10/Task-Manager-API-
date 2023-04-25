const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
// Load tasks from /api/tasks


const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    let { data } = await axios.get("/api/v1/tasks");
    let finalres = data.data;

    if (finalres.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
    } else {
      const taskListDOM = document.createElement("div");
      taskListDOM.classList.add("task-list");
      finalres.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("card");

        if (product.completed) {
          productElement.innerHTML = `
          <h3 class= "namee"><del>${product.name}</del></h3>
          <button class = "edit1">EDIT</button>
          <button class = "del">DELETE</button>
        `;
        } else {
          productElement.innerHTML = `
          <h3 class= "namee">${product.name}</h3>
          <button class = "edit1">EDIT</button>
          <button class = "del">DELETE</button>
        `;
        }

        productElement.addEventListener("click", () => {
          // When a product is clicked, get the object
          console.log(product);
        });

        const edit1 = productElement.querySelector(".edit1");
        edit1.addEventListener("click", () => {
          console.log("clicked");
          console.log(product._id);
          window.location.href = `./task.html?id=${product._id}`;
        });

        const delTask = productElement.querySelector(".del");
        delTask.addEventListener("click", async () => {
          try {
            await axios.delete(`/api/v1/tasks/${product._id}`);
            showTasks();
          } catch (error) {
            console.log(error);
          }
        });
        taskListDOM.appendChild(productElement);
      });
      tasksDOM.innerHTML = "";
      tasksDOM.appendChild(taskListDOM);
      loadingDOM.style.visibility = "hidden";
    }
  } catch (err) {
    console.log(err);
  }
};

showTasks();
// delete task

// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;
  console.log(name);

  try {
    await axios.post("/api/v1/tasks", { name: name, completed: false });
    console.log("done");
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }


  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});



















