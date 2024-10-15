import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './TrackDetails.css';
import { fetchJwtToken } from '../../services/AppleMusicAuth.jsx';

const TrackDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const jwToken = location.state?.token || '';

    const [trackDetails, setTrackDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [albumDetails, setAlbumDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const includeRecordLabel = true;

    useEffect(() => {
        const fetchTrackDetails = async () => {
            try {
                const token = jwToken || await fetchJwtToken();

                if (!token) {
                    throw new Error("JWT token ontbreekt of is ongeldig.");
                }

                const response = await axios.get(`https://api.music.apple.com/v1/catalog/us/songs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const trackData = response.data.data[0];
                setTrackDetails(trackData.attributes);

                if (includeRecordLabel && trackData.relationships.albums.data[0]) {
                    const albumId = trackData.relationships.albums.data[0].id;

                    const albumResponse = await axios.get(`https://api.music.apple.com/v1/catalog/us/albums/${albumId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setAlbumDetails(albumResponse.data.data[0].attributes);
                }

                setLoading(false);
            } catch (error) {
                console.log('Fout bij ophalen van trackdetails:', error);
                setError("Er is een fout opgetreden bij het ophalen van de trackdetails.");
                setLoading(false);
            }
        };

        fetchTrackDetails();
    }, [id, includeRecordLabel, jwToken]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(fav => fav.id === id);
        setIsFavorite(isFav);
    }, [id]);

    const handleFavoriteClick = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!isFavorite) {
            favorites.push({ id, ...trackDetails });
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } else {
            const updatedFavorites = favorites.filter(fav => fav.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
        setIsFavorite(!isFavorite);
    };

    if (loading) {
        return <div>Aan het laden...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const trackTitle = trackDetails.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const trackUrl = `https://music.apple.com/us/song/${trackTitle}/${id}`;

    return (
        <main className="track-details-container">
            <h2>Track Details</h2>
            <section className="track-details-columns">
                <article className="track-details-list">
                    <ul>
                        <li><strong>Artiest:</strong> {trackDetails.artistName}</li>
                        <li><strong>Titel:</strong> {trackDetails.name}</li>
                        <li><strong>Release:</strong> {trackDetails.albumName}</li>
                        <li><strong>ISRC:</strong> {trackDetails.isrc}</li>
                        {includeRecordLabel && albumDetails && (
                            <li><strong>Label:</strong> {albumDetails.recordLabel}</li>
                        )}
                    </ul>
                </article>
                <aside className="track-artwork">
                    <img
                        src={trackDetails.artwork.url.replace('{w}x{h}', '300x300')}
                        alt={`${trackDetails.name} artwork`}
                        style={{ width: '150px', height: '150px' }}
                    />
                    <button className="favorite-button" onClick={handleFavoriteClick}>
                        <span className="heart-icon">{isFavorite ? '❤️' : '🤍'}</span>
                    </button>
                </aside>
                <article className="track-details-list">
                    <ul>
                        <li><strong>Componisten:</strong> {trackDetails.composerName}</li>
                        <li><strong>Releasedatum:</strong> {new Date(trackDetails.releaseDate).toLocaleDateString()}</li>
                        <li>
                            <strong>Duur:</strong> {Math.floor(trackDetails.durationInMillis / 60000)}:{((trackDetails.durationInMillis % 60000) / 1000).toFixed(0).padStart(2, '0')}
                        </li>
                        <li><strong>Apple Music Track ID:</strong> <a href={trackUrl} target="_blank" rel="noopener noreferrer">{id}</a></li>
                    </ul>
                </article>
            </section>
            {trackDetails.previews && trackDetails.previews.length > 0 && (
                <section className="track-preview">
                    <audio controls>
                        <source src={trackDetails.previews[0].url} type="audio/mpeg" />
                        Je browser ondersteunt het audio-element niet.
                    </audio>
                </section>
            )}
        </main>
    );
};

export default TrackDetails;