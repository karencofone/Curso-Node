const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

// Simulación de una base de datos
const tasks = [];

// Ruta para obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tasks);
});

// Ruta para obtener detalles de una tarea específica
app.get('/tareas/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Ruta para crear una nueva tarea
app.post('/tareas', (req, res) => {
  const newTask = req.body;
  newTask.id = Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta para actualizar una tarea existente
app.put('/tareas/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const existingTask = tasks.find((t) => t.id === taskId);

  if (existingTask) {
    Object.assign(existingTask, updatedTask);
    res.json(existingTask);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Ruta para eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
