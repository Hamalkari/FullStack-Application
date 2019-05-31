const express = require("express");
const users = express.Router();
const passport = require("passport");
const users_controller = require("../controllers/users.controller");
const passportConf = require("../passort");

users.post("/register", users_controller.users_create);
users.post(
  "/login",
  passport.authenticate("local", { session: false }),
  users_controller.users_login
);
users.get("/", users_controller.users_getUsers);
users.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  users_controller.users_getUser
);

module.exports = users;
