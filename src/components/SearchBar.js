import React, { useState } from 'react';

const SearchBar = ({ fetchBooks }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      setSearchTags((prevTags) => [...prevTags, searchInput.trim()]);
      setSearchInput('');
    }
  };

  const handleTagRemove = (tag) => {
    setSearchTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleSearch = () => {
    const tags = [...searchTags, searchInput.trim()];
    fetchBooks(tags);
  };
  

  return (
    <div className="search-bar">
      <form onSubmit={handleTagSubmit}>
        <input
          type="text"
          placeholder="Enter search tags"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button type="submit">Add Tag</button>
      </form>
      <div className="tag-list">
        {searchTags.map((tag) => (
          <div key={tag} className="tag">
            {tag}
            <button onClick={() => handleTagRemove(tag)}>x</button>
          </div>
        ))}
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
