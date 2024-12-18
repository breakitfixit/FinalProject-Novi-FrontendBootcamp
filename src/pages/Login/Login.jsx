import { useState, useContext } from 'react';
import './Login.css';
import LoginButton from "../../components/LoginButton/LoginButton";
import InputBar from "../../components/InputBar/InputBar";
import { AuthContext } from '../../context/AuthContext'; // AuthContext import voor useContext toevoeging
import { useNavigate } from "react-router-dom";

function Login() {
    // State voor gebruikersnaam, wachtwoord en foutmeldingen >> H5 State Management in React
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // error state
    const { login } = useContext(AuthContext); // Gebruik de login-functie vanuit de context
    const navigate = useNavigate(); // Voor navigatie nadat de gebruiker is ingelogd


    // Functie om de loginlogica af te handelen - sla jwt token op in localstorage
    const handleLogin = async () => {
        try {
            await login(username, password); // Gebruik de login-functie vanuit AuthContext
            setError(null); // Reset foutmelding
            navigate('/'); // Navigeer naar de homepagina na succesvolle login
        } catch (error) {
            setError('Er is een fout opgetreden. Probeer het opnieuw.'); // Toon foutmelding bij inlogfout
        }
    };

    // Functie om het formulier in te dienen
    const handleSubmit = (e) => {
        e.preventDefault(); //
        handleLogin(); // Roep de handleLogin-functie aan
    };

    const handleForgotPassword = () => {
        alert("Inloggegevens herstellen? Stuur Rick een berichtje via Teams.");
    };

    // Functie om door te navigeeren naar de registratiepagina
    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <img src="src/assets/images/logo-main.png" alt="Toon logo" className="logo"/> {/* Logo van de applicatie */}
            <div className="cassette-text">
                Zonder login is Toon niet beschikbaar. Log in of registreer om verder te gaan.
            </div>
            <form onSubmit={handleSubmit}>
                <InputBar
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update de gebruikersnaam in de state
                    placeholder="Gebruikersnaam"
                    type="text"
                    required // gemarkeerd als verplicht veld
                    className="login-input"
                />
                <InputBar
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update het wachtwoord in de state
                    placeholder="Wachtwoord"
                    type="password"
                    required // gemarkeerd als verplicht veld
                    className="login-input"
                    autocomplete="current-password" // tip vanuit de console toegepast om autocomplete te bevorderen
                />
                <LoginButton/>
                <div className="button-row">
                    <button type="button" className="login-button register" onClick={handleRegisterRedirect}>
                        Registreer hier
                    </button>
                    <button type="button" className="login-button register" onClick={handleForgotPassword}>
                        Wachtwoord vergeten?
                    </button>
                </div>
            </form>

            {/* Error tonen in geval login mislukt
             */}
            {error && <div className="error-message">{error}</div>}

        </div>
    );
}

export default Login;
