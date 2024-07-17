import React, { useState } from 'react';

function Home () {

    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('Zoeken op ISRC:', searchTerm);
        // zoeklogica hier
    };

    return (
        <div className= "home-container">
            <h4>Welkom, User</h4>
            <p>Voer een ISRC in de zoekbalk om beschikbare data te vinden bij Apple Music</p>
            <input className= "searchbar"
                type="text"
                placeholder="Zoeken op ISRC..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
             <button className="button" onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Home;