const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const tareasRoutes = require('./src/routes/tareasRoutes');
app.use('/tareas', tareasRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
