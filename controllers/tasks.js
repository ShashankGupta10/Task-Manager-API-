const getAllTasks = (req, res)=>{
    console.log("all tasks")
};

const createTask = (req, res)=>{
    console.log('create task')
};

const getTask = (req, res) => {
  console.log("get single task");
};


const updateTask = (req, res) => {
  console.log("update task");
};


const deleteTask = (req, res) => {
  console.log("delete task");
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}