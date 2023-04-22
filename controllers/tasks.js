const TaskModel = require("../Modals/Task");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find({});
    console.log(allTasks);
    if (allTasks.length === 0) {
      res.status(404).json({ msg: "No tasks found" });
    }
    res.status(200).json({ success: true, data: allTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const singleTask = await TaskModel.findOne({ _id: TaskID });

    if (!singleTask) {
      return res.status(404).json({ msg: `No task with id: ${TaskID}` });
    }

    res.status(200).json({ singleTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const { name, completed } = req.body;
    const updateTask = await TaskModel.findOneAndUpdate(
      { _id: TaskID },
      { name: name, completed: completed }
    );
    if (!updateTask) {
      res.status(201).json({ msg: "No task found with message ID" });
    }
    res.status(200).json({ msg: "Task successfully updated" });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const deleteTask = await TaskModel.findOneAndDelete({ _id: TaskID });

    if (!deleteTask) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({ msg: "Task successfully deleted" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};


 // document.querySelector(".tasks").innerHTML = "";
      // finalres.forEach((ele) => {
      //   let card = document.createElement("div");
      //   card.classList.add("card")

      //   let name = document.createElement("p");
      //   name.classList.add("namee")
      //   name.textContent = ele.name;

      //   let status = document.createElement("p");
      //   status.classList.add("status")
      //   status.textContent = ele.completed;


      //   let edit = document.createElement("button")
      //   edit.classList.add("edit1")
      //   edit.textContent = "EDIT"
      //   edit.addEventListener("click", ()=>{
      //     window.location.href = "./task.html?id=${TaskID}";
      //   })

      //   let del = document.createElement("button");
      //   del.classList.add("del");
      //   del.textContent = "DELETE";
      //   del.addEventListener("click", () => {
      //     window.location.href = "./task.html?id=${TaskID}";
      //   });

      //   card.append(name, status, edit, del);
      //   document.querySelector(".tasks").append(card);
      // });




      
// delete task /api/tasks/:id

// tasksDOM.addEventListener("click", async (e) => {
//   const el = e.target;
//   if (el.parentElement.classList.contains("del")) {
//     loadingDOM.style.visibility = "visible";
//     const id = el.parentElement.dataset.id;
//     try {
//       await axios.delete(`/api/v1/tasks/${id}`);
//       showTasks();
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   loadingDOM.style.visibility = "hidden";
// });