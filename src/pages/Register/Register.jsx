import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Register.css';
import InputBar from '../../components/InputBar/InputBar';
import LoginButton from '../../components/LoginButton/LoginButton';
import {registerUser} from '../../services/backendApi'; // Importeer de API-functie om gebruikers te registreren

function Register() {
    // State voor gebruikersnaam, e-mail, wachtwoord en foutmeldingen
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Voor navigeren naar andere pagina's

    // Functie voor het afhandelen van registratie
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Wachtwoorden komen niet overeen.');
            return;
        }

        try {
            const userData = {
                username,
                email,
                password,
                authorities: [{authority: 'USER'}], // Standaardrol voor een nieuwe gebruiker
            };
            await registerUser(userData); // Roep de API-aanroep voor registratie aan
            navigate('/login'); // Navigeer naar de loginpagina na succesvolle registratie
        } catch (error) {
            setError('Registratie mislukt. Probeer het opnieuw.');
            console.error('Registratie mislukt:', error.message);
        }
    };

    return (
        <div className="login-container">
            <img src="src/assets/images/logo-main.png" alt="Toon logo" className="logo"/>
            {/* Formulier voor registratie */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister(); // Roep de registratie-functie aan bij indienen van het formulier
                }}
            >
                {/* Gebruikersnaam invoerveld */}
                <InputBar
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Werk de gebruikersnaam bij
                    placeholder="Gebruikersnaam"
                    type="text"
                    required
                    className="login-input"
                />
                {/* Email invoerveld */}
                <InputBar
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                    className="login-input"
                />
                {/* Wachtwoord invoerveld */}
                <InputBar
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Wachtwoord"
                    type="password"
                    required
                    className="login-input"
                />
                {/* Bevestig wachtwoord invoerveld */}
                <InputBar
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Bevestig Wachtwoord"
                    type="password"
                    required
                    className="login-input"
                />
                {/* Registreren knop */}
                <LoginButton buttonText="Registreren"/>
                {/* terug naar inlogpagina knop*/}

            </form>
            {/* Toon foutmelding indien aanwezig */}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Register;
