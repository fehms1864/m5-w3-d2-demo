module.exports = function(app) {

    var books = require('../controllers/book.controllers.js');

    app.post('/api/book', books.createBook);
    app.get('/api/book/:id', books.getBook);
    app.get('/api/books', books.books);
    app.put('/api/book', books.updateBook);
    app.delete('/api/book/:id', books.deleteBook);
}