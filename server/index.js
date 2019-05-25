const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
const mongoURI = "mongodb+srv://halmakari:100420rub@datab-0fd4c.mongodb.net/PizzaApp?retryWrites=true";

mongoose.connect(mongoURI,{useNewUrlParser: true})
        .then(() => {
          console.log("MongoDb COnnected");
        })
        .catch(err => {
          console.log(`Error - ${err}`);
        })

const Users = require('./routes/users.route');

app.use('/users',Users);

app.listen(port,() => {
  console.log("Server Running");
})