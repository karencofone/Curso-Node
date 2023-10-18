const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// obtener todos los libros
router.get('/', booksController.getAllBooks);

// obtener un libro por ID
router.get('/:id', booksController.getBookById);

// crear un nuevo libro
router.post('/', booksController.createBook);

// actualizar un libro por ID
router.put('/:id', booksController.updateBook);

// borrar un libro por ID
router.delete('/:id', booksController.deleteBook);

module.exports = router;
