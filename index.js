const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

// Serve the static index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Array to hold the books
let books = [];

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/books', (req, res) => {
  // Generate a unique ID for the book
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Add the book to the array
  const book = {
    id,
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate || null,
  };
  books.push(book);

  // Send the response
  res.json(book);
});


app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  // Find the book by ID
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    
    res.status(404).json({ message: 'Book not found' });
  } else {
    // Remove the book from the array
    books.splice(index, 1);

    
    res.json({ message: 'Book deleted successfully' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
