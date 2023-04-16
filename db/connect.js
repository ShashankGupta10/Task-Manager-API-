const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = (url)=>{
    return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

})
}

module.exports = connectDB