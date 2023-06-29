import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingAnimation from './components/LoadingAnimation';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Cart from './components/Cart';
// import Signup from './components/Signup';
// import Login from './components/Login';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(12);

  const fetchBooks = (tags) => {
    const queryString = tags.join('+');
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${queryString}`;
  
    setLoading(true);
  
    axios
      .get(apiUrl)
      .then((response) => {
        const booksData = response.data.items;
        const formattedBooks = booksData.map((book) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
            description: book.volumeInfo.description,
            availableCopies: 1, // Initially, set the available copies to 1 for each book
            rentCost: 5, // Rent cost of $5 for each book
          };
        });
        setBooks(formattedBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  

  useEffect(() => {
    fetchBooks([]); // Fetch initial books on component mount
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/"
            element={
              loading ? (
                <LoadingAnimation />
              ) : (
                <>
                  <SearchBar fetchBooks={fetchBooks} setCount={setCount}/>
                  <Filters books={books} setBooks={setBooks} setCount={setCount}/>
                  <BookList books={books} setBooks={setBooks} />
                </>
              )
            }
          />
          <Route path="/cart" element={<Cart books={books} setBooks={setBooks} setCount={setCount} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
