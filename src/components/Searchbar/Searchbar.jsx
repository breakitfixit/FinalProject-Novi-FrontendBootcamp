import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = () => {
       const [searchTerm, setSearchTerm] = useState('');
       const [searchClicked, setSearchClicked] = useState(false);

       const handleSearchChange = (event) => {
              setSearchTerm(event.target.value);
       };

       const handleSearch = () => {
              console.log('Zoeken op ISRC:', searchTerm);
              setSearchClicked(true);
              // Hier kun je de zoekfunctie toevoegen om de Apple Music API te gebruiken
       };

       return (
           <div className="search-container">
                  <input
                      className="searchbar"
                      type="text"
                      placeholder="ISRC..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                  />
                  <button className="button" onClick={handleSearch}>Search</button>
           </div>
       );
};

export default Searchbar;