const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Express
app.use(express.json());

// Rutas para la gestión de tareas
const tareasRoutes = require('./src/routes/tareasRoutes');
app.use('/tareas', tareasRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
