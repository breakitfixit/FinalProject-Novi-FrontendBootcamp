import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Searchbar.css';
import InputBar from '../../components/InputBar/InputBar';
import { useNavigate } from "react-router-dom";
import { fetchJwtToken } from '../../services/AppleMusicAuth.jsx';
import SearchResults from '../../components/SearchResults/SearchResults.jsx';

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Ingevoerde zoekterm
    const [results, setResults] = useState([]); // Zoekresultaten
    const [error, setError] = useState(null); // Foutmeldingen
    const [jwtToken, setJwtToken] = useState(null); // JWT-token voor authenticatie
    const [hasSearched, setHasSearched] = useState(false); // Of er een zoekopdracht is uitgevoerd
    const [loading, setLoading] = useState(false); // Laadstatus
    const navigate = useNavigate(); // Navigeren tussen routes

    // Haal het JWT-token op bij het laden van het component
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await fetchJwtToken();
                setJwtToken(token);
            } catch (error) {
                console.log('Fout bij ophalen van JWT-token:', error);
                setError({ message: "Kan geen verbinding maken met de server." });
            }
        };
        getToken();
    }, []); // Lege dependency array om effect slechts eenmaal uit te voeren

    // Functie om muziekdata op te halen van de Apple Music API
    const fetchMusicData = async () => {
        try {
            setLoading(true); // Start laadindicator
            const token = jwtToken; // Haal het token op uit de state

            // Controleer of het token beschikbaar is
            if (!token) {
                setError({ message: "Authenticatie mislukt. Probeer het later opnieuw." });
                setLoading(false);
                return;
            }

            // Gebruikersgemak: verwijder spaties en speciale tekens uit de zoekterm
            // De opgeschoonde ISRC wordt vervolgens gebruikt in de endpoint URL
            const cleanedISRC = searchTerm.trim().replace(/[^\w\s]/gi, ''); // Verwijder speciale tekens
            const encodedISRC = encodeURIComponent(cleanedISRC);
            const url = `https://api.music.apple.com/v1/catalog/us/songs?filter[isrc]=${encodedISRC}`;

            // API-aanroep naar Apple Music
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.data && response.data.data.length > 0) {
                setResults(response.data.data); // Sla resultaten op
                setError(null); // Reset foutmeldingen
            } else {
                setResults([]); // Geen resultaten gevonden
                setError({ message: "Geen resultaten gevonden voor deze ISRC-code." });
            }
        } catch (error) {
            console.log('Fout bij ophalen van data:', error);
            setError({ message: "Er is iets misgegaan bij het ophalen van de zoekopdracht." });
        } finally {
            setLoading(false); // Stop laadindicator
        }
    };

    // Functie die wordt aangeroepen bij het indienen van het zoekformulier
    const handleSearch = (e) => {
        e.preventDefault(); // Voorkom standaard formuliergedrag
        setError(null); // Reset foutmeldingen
        setHasSearched(true); // Markeer dat er is gezocht
        fetchMusicData(); // Voer de zoekopdracht uit
    };

    // Functie om te navigeren naar de track-details pagina bij klikken op een resultaat
    const handleTrackClick = (trackId) => {
        navigate(`/track-details/${trackId}`, { state: { token: jwtToken } });
    };

    return (
        <div>
            <form className="search-container" onSubmit={handleSearch}>
                <InputBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Voer hier een ISRC in"
                    type="text"
                    className="search-input"
                />
                <button type="submit" className="search-button">Zoeken</button>
            </form>
            {/* Foutmelding weergeven indien van toepassing */}
            {error && <div className="error-message">Error: {error.message}</div>}

            {/* Laadindicator weergeven tijdens het ophalen van data */}
            {loading && <div className="loading-message">Aan het zoeken...</div>}

            {/* Zoekresultaten weergeven na een zoekopdracht */}
            {hasSearched && !loading && (
                <SearchResults
                    results={results}
                    handleTrackClick={handleTrackClick}
                />
            )}
        </div>
    );
};

export default Searchbar;
