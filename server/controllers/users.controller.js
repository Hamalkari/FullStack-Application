const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");

const signToken = user => {
  return jwt.sign({ _id: user.id }, config.secretKey, {
    expiresIn: "24h"
  });
};

module.exports = {
  users_create: async (req, res) => {
    try {
      // Получить данные с POST запроса
      const { first_name, last_name, email, password } = req.body;

      // Пытаемся найти пользователя с таким ящиком
      const foundUser = await User.findOne({ email });
      if (foundUser) {
        res.json({
          status: "error",
          title: "Пользователь с таким ящиком уже существует"
        });
      } else {
        const newUser = new User({ first_name, last_name, email, password });
        await newUser.save();
        res
          .status(201)
          .json({ status: "success", title: "Пользователь успешно создан" });
      }
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  },
  users_login: async (req, res) => {
    try {
      const token = signToken(req.user);
      res.status(200).json({ token });
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  },
  users_getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.json({ status: "error", title: `${error}` });
    }
  },
  users_getUser: async (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      console.log(`${error}`);
    }
  }
};
