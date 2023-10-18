const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

const dbUrl = '';
mongoose.connect(dbUrl, { useUnifiedTopology: true })
  .then((result) => {
    // app.listen(3000);
  })
  .catch((error) => console.log(error));

app.get('/', (request, response) => {
  response.send('APP TAREAS');
});

app.use(taskRoutes);

module.exports = app;