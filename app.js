const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const tasks = require("./Routes/tasks");

const port = process.env.PORT || 3001;
const connString = process.env.MONGO_DB_URI;
// MIDDLEWARES

app.use(express.static("./public"));
app.use(express.json());

// ROUTES

app.use("/api/v1/tasks", tasks);

// STARTING THE SERVER

const startServer = async () => {
  try {
    await connectDB(connString);
    console.log("Database Connected...");
    app.listen(port, () => {
      console.log(`App listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
