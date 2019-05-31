const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const config = require("../config");

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", async function(next) {
  try {
    // Генерируем соль
    const genSalt = await bcrypt.genSalt(config.saltRounds);
    // Хешируем наш пароль на основе соли
    const hashPassword = await bcrypt.hash(this.password, genSalt);
    // Ставим в текущий пароль хешируемый пароль
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(pass) {
  try {
    return await bcrypt.compare(pass, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
// Create a  model
const User = mongoose.model("Users", UserSchema);

// Exports model
module.exports = User;
