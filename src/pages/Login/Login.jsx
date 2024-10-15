import { useState } from 'react';
import './Login.css';
import LoginButton from "../../components/LoginButton/LoginButton";
import InputBar from "../../components/InputBar/InputBar";
import { authenticateUser, getUserInfo } from '../../services/backendApi';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
    // State definieren voor de gebruikersnaam, wachtwoord en foutmeldingen
    // Zie Hoofdstuk 5 over State Management in React
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // error state
    const [userInfo, setUserInfo] = useState(null); // gebruikersinformatie state
    const navigate = useNavigate(); // Navigeren naar andere routes

    // Functie om de loginlogica af te handelen - sla jwt token op in localstorage
    const handleLogin = async () => {
        try {
            const data = await authenticateUser(username, password); // Roep de authenticateUser service aan
            if (data?.jwt) {
                localStorage.setItem('token', data.jwt); // Sla het JWT-token op in localStorage

                // Haal de gebruikersinformatie op met de getUserInfo-functie en bewaar het in de state
                const userData = await getUserInfo(username, data.jwt);
                setUserInfo(userData); // Sla de gebruikersinformatie op

                setIsLoggedIn(true); // Update de inlogstatus in de parent component
                navigate('/'); // Navigeer naar homepagina na inloggen
            } else {
                setError('Ongeldige inloggegevens.'); // Toon foutmelding bij verkeerde inloggegevens
            }
        } catch {
            setError('Er is een fout opgetreden. Probeer het opnieuw.'); // Algemene foutmelding
        }
    };

    // Functie om het formulier in te dienen
    const handleSubmit = (e) => {
        e.preventDefault(); //
        handleLogin(); // Roep de loginfunctie aan
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

            {/* Toon gebruikersinformatie na inloggen */}
            {userInfo && (
                <div className="user-info">
                    <h2>Welkom, {userInfo.name}</h2>
                    <p>Email: {userInfo.email}</p>
                </div>
            )}
        </div>
    );
}

export default Login;
