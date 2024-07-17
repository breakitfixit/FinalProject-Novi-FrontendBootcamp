import React from 'react';
import {Link} from 'react-router-dom';
import './Searchbar.css';

const

<input className="searchbar"
       type="text"
       placeholder="Zoeken op ISRC..."
       value={searchTerm}
       onChange={handleSearchChange}
/>

export default Searchbar;