const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Task = require('./models/task');

app.use(bodyParser.json());

app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la tarea.' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las tareas.' });
  }
});

app.patch('/tasks/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    task.completed = true;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo marcar la tarea como completada.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
