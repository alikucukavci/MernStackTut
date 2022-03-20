require('dotenv').config();
const express = require('express');
const cors = require('cors');
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const mongoose = require("mongoose");


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/MernStackTut", {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
