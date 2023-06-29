import React, { useEffect, useRef, useState } from 'react';

const BookList = ({ books, setBooks }) => {
  const [visibleBooks, setVisibleBooks] = useState([]);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleBooks(books);
  }, [books]);
  const loadMoreBooks = () => {
    // No need to load more books when all are already visible
    if (visibleBooks.length === books.length) {
      return;
    }

    setVisibleBooks(books);
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreBooks();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, [loadMoreBooks]);
  const handleAddToCart = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === bookId) {
          // Update the available copies and count when adding to cart
          if (book.availableCopies > 0) {
            return { ...book, availableCopies: book.availableCopies - 1 };
          }
        }
        return book;
      })
    );
  };
  return (
    <div className="book-list">
      {visibleBooks.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.thumbnail} alt={book.title} />
          <h3>{book.title}</h3>
          <p>Author(s): {book.authors}</p>
          <p>Published Date: {book.publishedDate}</p>
          <p>{book.description}</p>
          <button onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
        </div>
      ))}
      <div ref={sentinelRef} className="sentinel" />
    </div>
  );
};

export default BookList;
