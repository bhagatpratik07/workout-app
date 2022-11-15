const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening to port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
