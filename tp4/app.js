const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Importa las rutas
const booksRoutes = require('./routes/bookRoutes');

// Utiliza las rutas
app.use('/api/books', booksRoutes);

app.listen(port, () => {
  console.log(`La API RESTful está escuchando en http://localhost:${port}`);
});
