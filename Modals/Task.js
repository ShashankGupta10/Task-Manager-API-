const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The field name cannot be empty! Please provide a name'],
        trim: true,
        maxlength: [20, 'Name cannot be bigger than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;