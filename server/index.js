// Connect our npm pakets
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const config = require("./config");
const morgan = require("morgan");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Connect MongoDb
mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch(err => {
    console.log(`Error - ${err}`);
  });

// Router express
const Users = require("./routes/users.route");

app.use("/users", Users);

// Server
app.listen(port, () => {
  console.log("Server Running");
});
