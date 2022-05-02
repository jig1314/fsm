const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://jig1314:yJhFOsWh6Gy6KYNT@cluster0.myxzc.mongodb.net/FSM?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDb!')
  })
  .catch(() => {
    console.log('MongoDB connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
