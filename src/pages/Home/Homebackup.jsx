import React, {useState} from 'react';
import './Home.css';

function Home() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('Zoeken op ISRC:', searchTerm);
        setSearchClicked(true);
    };

    return (
        <div className="home-container">
            <div className="intro-text">
                <h4>Welkom, User</h4>
                <p>Voer een ISRC in de zoekbalk om beschikbare data te vinden bij Apple Music</p>
            </div>
            <div className="search-container">
                <input className="searchbar"
                       type="text"
                       placeholder="Zoeken op ISRC..."
                       value={searchTerm}
                       onChange={handleSearchChange}
                />
                <button className="button" onClick={handleSearch}>Search</button>
            </div>
            {/*{searchClicked && (*/}
            {/*    <div className="results-container">*/}
            {/*        <p>zoekresultaten hier</p>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
        ;
}

export default Home;