import { createContext, useState } from 'react';
import { authenticateUser, getUserInfo, registerUser } from '../services/backendApi'; // Importeer de functies
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    userInfo: null,
    token: '', // Lege string als standaardwaarde
    login: () => {}, // Lege functies toegevoegd om te voorkomen dat de context null is
    register: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const data = await authenticateUser(username, password); // Gebruik de geïmporteerde functie
            setToken(data.jwt);
            localStorage.setItem('token', data.jwt);
                console.log('Login succesvol:', data);
                if (data) {
                    navigate('/'); // Navigeer naar homepagina na inloggen
                    console.log('Navigeer');
                }

            const userData = await getUserInfo(username, data.jwt); // Haal gebruikersinformatie op
            setUserInfo(userData);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await registerUser(userData); // Registreer de gebruiker met de API-aanroep
        } catch (error) {
            console.error('Registratie mislukt:', error.message);
            throw error;
        }
    };

    const logout = () => {
        setToken(null); // Update de token
        setUserInfo(null); // Update de inlogstatus
        localStorage.removeItem('token'); // Verwijder het token uit localStorage
    };

    return (
        <AuthContext.Provider value={{ userInfo, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }; // geen directe exports van de functies meer zoals in de vorige versie