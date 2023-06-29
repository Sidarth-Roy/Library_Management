import React, { useState, useEffect } from 'react';

const Filters = ({ books, setBooks ,setCount}) => {
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleAddFilter = () => {
    if (filterBy && filterValue) {
      setActiveFilters([...activeFilters, { filterBy, filterValue }]);
      setFilterBy('');
      setFilterValue('');
    }
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = [...activeFilters];
    updatedFilters.splice(index, 1);
    setActiveFilters(updatedFilters);
  };

  useEffect(() => {
    let filteredBooks = [...books];

    // Apply active filters
    activeFilters.forEach(({ filterBy, filterValue }) => {
      filteredBooks = filteredBooks.filter((book) => {
        if (filterBy === 'title') {
          return book.title.toLowerCase().includes(filterValue.toLowerCase());
        }
        if (filterBy === 'author') {
          return book.authors.some((author) =>
            author.toLowerCase().includes(filterValue.toLowerCase())
          );
        }
        if (filterBy === 'publishDate') {
          return book.publishedDate.includes(filterValue);
        }
        return true;
      });
    });

    // Apply sorting logic
    if (sortBy === 'title') {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
      filteredBooks.sort((a, b) => a.authors[0].localeCompare(b.authors[0]));
    } else if (sortBy === 'publishDate') {
      filteredBooks.sort((a, b) =>
        a.publishedDate.localeCompare(b.publishedDate)
      );
    }

    setBooks(filteredBooks);
    setCount(filteredBooks.length);
  }, [sortBy, activeFilters, books, setBooks]);

  return (
    <div className="filters">
      <select value={sortBy} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publishDate">Publish Date</option>
      </select>
      <div>
        {activeFilters.map((filter, index) => (
          <div key={index} className="active-filter">
            <span>{`${filter.filterBy}: ${filter.filterValue}`}</span>
            <button onClick={() => handleRemoveFilter(index)}>x</button>
          </div>
        ))}
      </div>
      <select value={filterBy} onChange={handleFilterChange}>
        <option value="">Filter By</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publishDate">Publish Date</option>
      </select>
      {filterBy && (
        <div>
          <input
            type="text"
            placeholder="Enter search value"
            value={filterValue}
            onChange={handleFilterValueChange}
          />
          <button onClick={handleAddFilter}>Add Filter</button>
        </div>
      )}
    </div>
  );
};


export default Filters;
