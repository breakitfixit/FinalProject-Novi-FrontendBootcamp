import React, {useState, useEffect} from 'react';
import './Home.css';
import Searchbar from '../../components/Searchbar/Searchbar';

function Home() {
    // State voor de gebruikersnaam, initialiseer met waarde uit localStorage indien beschikbaar
    const [userName, setUserName] = useState(localStorage.getItem('username') || '');

    // To do: 'UseEffect toepassen om gebruikersnaam op te halen bij het laden van de pagina'

    return (
        <div className="home-container">
            <div className="intro-text">
                <h4>Welkom, {userName}</h4>
                <p>
                    Toon eenvoudig de trackdetails uit Apple Music door te zoeken op ISRC.
                    <br/>Zoekopties en
                    databases worden
                    mogelijk later uitgebreid!
                </p>
            </div>

            <div className="test-isrcs">TCAIG2485850 / NL4TG2400001
                <br/>
                <br/>
            </div>

            <Searchbar/>


        </div>
    );
}

export default Home;
