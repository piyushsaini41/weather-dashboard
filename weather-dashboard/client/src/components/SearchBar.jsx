import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityInput}
        onChange={(event) => setCityInput(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
