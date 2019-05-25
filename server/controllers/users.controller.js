const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.users_create = (req,res) => {
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  };


  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user){
      bcrypt.hash(req.body.password,10,(err,hash) => {
        userData.password = hash;
        User.create(userData)
                  .then(user => {
                    res.json({status: "success",title: "Поздравляем! Вы успешно создали аккаунт"});
                  })
                  .catch(err => {
                    res.send(`Error - ${err}`);
                  })
      })
    }else{
      res.json({status: 'error', title: "Пользователь с таким ящиком уже существует!!!"});
    }
  })
  .catch(err => {
    res.send(`Error - ${err}`);
  })
}

exports.users_login = (req,res) => {
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (user){
      if (bcrypt.compareSync(req.body.password,user.password)){
        const payload = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        };

        let token = jwt.sign(payload,process.env.SECRET_KEY,{
          expiresIn: 1440
        });

        res.json({status: "success",token});
      }else{
        res.json({status: "error",title: 'Неправильный логин или пароль'});
      }
    }else{
      res.json({status: "error", title: 'Неправильный логин или пароль'});
    }
  })
  .catch(err => {
    res.send(`error - ${err}`);
  });
}