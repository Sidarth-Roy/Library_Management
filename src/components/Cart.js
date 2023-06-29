import React from 'react';

const Cart = ({ books, setBooks, setCount }) => {
  const handleRent = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          // Update the available copies and count when renting
          return { ...book, availableCopies: book.availableCopies - 1 };
        }
        return book;
      })
    );
    setCount((prevCount) => prevCount - 1); // Decrease the count of books when renting
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {books.map((book) => (
        <div key={book.id} className="cart-item">
          <img src={book.thumbnail} alt={book.title} />
          <h3>{book.title}</h3>
          <p>Author(s): {book.authors}</p>
          <p>Available Copies: {book.availableCopies}</p>
          <p>Rent Cost: ${book.rentCost}</p>
          <button onClick={() => handleRent(book.id)}>Rent</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
