import React from 'react';
import './SearchResults.css';

const SearchResults = ({ results, loading, handleTrackClick }) => {
    return (
        <div className='search-result-container'>
            {loading ? (
                <p>Zoeken naar resultaten...</p>
            ) : results.length > 0 ? (
                    <ul>
                        {/* Toon het aantal gevonden releases */}
                        {/* Checkt of er 1 of meerdere releases zijn*/}
                        <p className="track-result-count">Track gevonden
                            op {results.length} {results.length === 1 ? 'release' : 'releases'}</p>
                        {results.map((song) => (
                            <li key={song.id} onClick={() => handleTrackClick(song.id)}
                                className="search-result-item">
                                <img
                                    src={song.attributes.artwork.url.replace('{w}x{h}', '150x150')}
                                    alt={`${song.attributes.name} artwork`}
                                    className="song-artwork"
                                />
                                <div className="song-info">
                                    <div className="artist-title">
                                        {song.attributes.artistName} - {song.attributes.name}
                                    </div>
                                    <div className="release">
                                        {song.attributes.albumName} ({new Date(song.attributes.releaseDate).getFullYear()})
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
            ) : (
                <p></p> // melding achterwege gelaten indien er geen resultaten zijn. Wordt eerder afgevangen in de Searchbar component
            )}
        </div>
    );
};

export default SearchResults;
