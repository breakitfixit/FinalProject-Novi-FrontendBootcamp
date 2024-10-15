import React, { useState } from 'react';
import './Profile.css';

function Profile() {
    // State voor gebruikersnaam, wachtwoord en bewerkingsmodi
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [password, setPassword] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    // State voor Dark Mode en Disco Mode
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDiscoMode, setIsDiscoMode] = useState(false);

    // Functie om favorieten te verwijderen
    const clearFavorites = () => {
        localStorage.removeItem('favorites');
        alert('Favorieten succesvol verwijderd!');
    };

    // Schakel Dark Mode aan of uit
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setIsDiscoMode(false); // Zet Disco Mode uit bij Dark Mode
        document.body.classList.toggle('dark-mode', !isDarkMode);
        document.body.classList.remove('disco-mode');
    };

    // Schakel Disco Mode aan of uit
    const toggleDiscoMode = () => {
        setIsDiscoMode(!isDiscoMode);
        document.body.classList.toggle('disco-mode', !isDiscoMode);
    };

    // Functie om naam aan te passen
    const handleNameChange = (e) => setName(e.target.value);

    // Functie om wachtwoord aan te passen
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Functie om de naam op te slaan in localStorage
    const saveName = () => {
        if (name) {
            localStorage.setItem('name', name);
            setIsEditingName(false);
            alert('Naam succesvol aangepast!');
        } else {
            alert('Naam kan niet leeg zijn.');
        }
    };

    // Functie om het wachtwoord op te slaan (nog niet verbonden met backend)
    const savePassword = () => {
        if (password) {
            setIsEditingPassword(false);
            alert('Wachtwoord succesvol aangepast!');
            // Hier moet wachtwoord doorgesluisd worden naar de backend
        } else {
            alert('Wachtwoord kan niet leeg zijn.');
        }
    };

    return (
        <div className="profile-container">
            <h2>Profiel en Instellingen</h2>

            {/* Gebruikersnaam aanpassen */}
            {isEditingName ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Voer je naam in"
                        className="profile-input"
                    />
                    <button onClick={saveName} className="profile-button">Naam opslaan</button>
                </>
            ) : (
                <button onClick={() => setIsEditingName(true)} className="profile-button">Naam aanpassen</button>
            )}

            {/* Wachtwoord aanpassen */}
            {isEditingPassword ? (
                <>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Voer je wachtwoord in"
                        className="profile-input"
                    />
                    <button onClick={savePassword} className="profile-button">Wachtwoord opslaan</button>
                </>
            ) : (
                <button onClick={() => setIsEditingPassword(true)} className="profile-button">Wachtwoord aanpassen</button>
            )}

            <button onClick={clearFavorites} className="profile-button">Favorieten legen</button>

            <button className="profile-button">English (nog niet beschikbaar)</button>

            {/* Dark Mode / Disco Mode toggle */}
            <button
                onClick={toggleDarkMode}
                onDoubleClick={toggleDiscoMode} /* Dubbelklik voor disco */
                className="profile-button"
            >
                {isDiscoMode ? 'Disco Mode' : isDarkMode ? 'Sena Mode' : 'Dark Mode (nog niet beschikbaar)'}
            </button>
        </div>
    );
}

export default Profile;
