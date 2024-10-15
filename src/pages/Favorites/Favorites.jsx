import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import axios from 'axios';
import './Favorites.css';
import { fetchJwtToken } from '../../services/AppleMusicAuth.jsx';

function Favorites() {
    const [favoriteTracks, setFavoriteTracks] = useState([]); // State om favoriete tracks op te slaan
    const [jwtToken, setJwtToken] = useState(null); // State om de JWT-token op te slaan
    const [loading, setLoading] = useState(true); // State om de laadtoestand te beheren
    const [error, setError] = useState(null); // State om eventuele fouten op te slaan

    // Haal favoriete tracks en JWT-token op bij het laden van het component
    useEffect(() => {
        const fetchFavoritesAndToken = async () => {
            try {
                const token = await fetchJwtToken(); // Haal de JWT-token op via helper
                if (!token) {
                    throw new Error("JWT token ontbreekt of is ongeldig.");
                }
                setJwtToken(token); // Sla de token op in de state

                const localFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Haal favorieten uit localStorage
                setFavoriteTracks(localFavorites.slice(0, 8)); // Beperk het aantal weergegeven favorieten tot 8
                setLoading(false); // Zet de laadtoestand op false wanneer de favorieten zijn geladen
            } catch (error) {
                console.error('Error fetching JWT token or favorites:', error);
                setError("Er is een probleem met het ophalen van de favoriete tracks.");
                setLoading(false); // Zorg ervoor dat de laadtoestand wordt gestopt in geval van een fout
            }
        };

        fetchFavoritesAndToken(); // Roep de functie aan om de token en favorieten op te halen
    }, []);

    // Functie om trackdetails op te halen via Apple Music API
    const fetchTrackDetails = async (trackId) => {
        try {
            const token = jwtToken || await fetchJwtToken(); // Zorg ervoor dat de token altijd aanwezig is
            if (!token) {
                throw new Error("JWT token ontbreekt of is ongeldig.");
            }

            console.log("JWT token:", token); // Log de token om te controleren of deze correct is

            const url = `https://api.music.apple.com/v1/catalog/us/songs/${trackId}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Voeg JWT-token toe aan de headers
                    'Content-Type': 'application/json'
                }
            });

            return response.data.data[0]; // Return trackdata uit de API-response
        } catch (error) {
            console.error('Error fetching track details:', error); // Log de volledige foutmelding
            return null;
        }
    };

    // Functie om favorieten te exporteren naar een CSV-bestand
    const exportToCSV = () => {
        const csvData = favoriteTracks.map(track => ({
            id: track.id,
            title: track.name,
            artist: track.artistName,
            album: track.albumName,
            isrc: track.isrc,
            composer: track.composerName,
            label: track.recordLabel, // Voeg labelinformatie toe
            releaseDate: new Date(track.releaseDate).toLocaleDateString(),
            duration: `${Math.floor(track.durationInMillis / 60000)}:${((track.durationInMillis % 60000) / 1000).toFixed(0).padStart(2, '0')}`,
            trackUrl: `https://music.apple.com/us/song/${track.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}/${track.id}`
        }));

        const csv = Papa.unparse(csvData); // Converteer de gegevens naar CSV-formaat met PapaParse
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); // Maak een blob van de CSV-data
        const link = document.createElement('a'); // Maak een tijdelijke downloadlink
        link.href = URL.createObjectURL(blob); // Genereer een object URL voor de blob
        link.setAttribute('download', 'favorites.csv'); // Stel de download-bestandsnaam in
        document.body.appendChild(link);
        link.click(); // Klik automatisch op de link om het downloaden te starten
        document.body.removeChild(link); // Verwijder de link na het downloaden
    };

    if (loading) {
        return <div>Aan het laden...</div>; // Toon een loading scherm zolang de favorieten worden geladen
    }

    if (error) {
        return <div>{error}</div>; // Toon foutmelding als er een fout is
    }

    return (
        <div className="favorites-container">
            {/* Als er geen favorieten zijn, toon een bericht */}
            {favoriteTracks.length === 0 ? (
                <div className="no-favorites">
                    <p>Er zijn nog geen favorieten geselecteerd.</p>
                    <p>Er is ruimte voor 8 favorieten.</p>
                    <p>Deze selectie is inclusief alle details te exporteren naar een .csv-bestand.</p>
                </div>
            ) : (
                <div className="favorites-grid">
                    {/* Toon favoriete tracks zonder extra API-aanroep */}
                    {favoriteTracks.map((track) => (
                        <Link key={track.id} to={`/track-details/${track.id}`} className="favorite-item">
                            <img
                                src={track.artwork.url.replace('{w}x{h}', '100x100')} // Gebruik de reeds beschikbare artwork URL
                                alt={`${track.name} artwork`}
                                className="favorite-artwork"
                            />
                            <div className="favorite-info">
                                <p>{track.name}</p>
                                <p>{track.artistName}</p>
                            </div>
                        </Link>
                    ))}
                    {/* Export-knop om favorieten naar CSV te exporteren */}
                    {favoriteTracks.length > 0 && (
                        <button onClick={exportToCSV} className="export-button">CSV export</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Favorites;
