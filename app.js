const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./Routes/tasks");

// MIDDLEWARES

app.use(express.json());

// ROUTES
app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/tasks", tasks);


const startServer = async ()=>{
try {
    await connectDB(process.env.MONGO_DB_URI)
    console.log('Database Connected...')
    app.listen(3000, () => {
      console.log("App listening on port 3000...");
    });

} catch (error) {
    console.log(error)
}
}


startServer()