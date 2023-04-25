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
