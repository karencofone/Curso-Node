const books = [
    { id: 1, title: 'Libro 1', author: 'Autor 1' },
    { id: 2, title: 'Libro 2', author: 'Autor 2' },
    { id: 3, title: 'Libro 3', author: 'Autor 3' },
  ];
  
  // obtener todos los libros
  exports.getAllBooks = (req, res) => {
    res.json(books);
  };
  
  // obtener un libro por ID
  exports.getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
  
    if (!book) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      res.json(book);
    }
  };
  
  // crear un nuevo libro
  exports.createBook = (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
  };
  
  // actualizar un libro por ID
  exports.updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex((b) => b.id === id);
  
    if (index === -1) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      books[index] = updatedBook;
      res.json(updatedBook);
    }
  };
  
  // borrar un libro por ID
  exports.deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id === id);
  
    if (index === -1) {
      res.status(404).json({ message: 'Libro no encontrado' });
    } else {
      books.splice(index, 1);
      res.json({ message: 'Libro eliminado' });
    }
  };
  