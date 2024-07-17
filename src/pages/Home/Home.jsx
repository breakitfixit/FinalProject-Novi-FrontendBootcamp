import React, {useState} from 'react';
import './Home.css';
import Searchbar from "../../components/Searchbar/Searchbar.jsx";

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
            <Searchbar/>
            <div className="results-container">
                {searchClicked && (
                    <div className="search-results">
                        <p>resultaten hier</p>
                    </div>
                )}
            </div>
        </div>
    )
        ;
}

export default Home;