import { createContext, useState } from 'react';
import { authenticateUser, getUserInfo } from '../services/backendApi'; // Importeer de functies

export const AuthContext = createContext({} );

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (username, password) => {
        try {
            const data = await authenticateUser(username, password); // Gebruik de geïmporteerde functie
            setToken(data.jwt);
            localStorage.setItem('token', data.jwt);

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
        setToken(null);
        setUserInfo(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ userInfo, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
