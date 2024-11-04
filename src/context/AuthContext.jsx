import { createContext, useEffect, useState } from 'react';
import { authenticateUser, getUserInfo, registerUser } from '../services/backendApi'; // Importeer de functies
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({}); // Context met een leeg object als standaardwaarde

const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAuth, setIsAuth] = useState(false); // Auth-status voor de hele applicatie
    const navigate = useNavigate();

    // Controleer bij het verversen van de pagina of de gebruiker is ingelogd
    useEffect(() => {
        // const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token); // Decode het token om gebruiker-id te krijgen voor de context
            fetchUserData(decoded.sub, token); // Haal gebruikersinformatie op als token aanwezig is
            setIsAuth(true);  // Stelt in op ingelogd als token aanwezig is
        } else {
            setIsAuth(false);
        }
    }, [token]);

    // Functie waarin de gebruikersinformatie wordt opgehaald
    const fetchUserData = async (username, token) => {
        try {
            const userData = await getUserInfo(username, token); // Haal gebruikersinformatie op
            setUserInfo(userData);
            setIsAuth(true); // auth-status op True als gebruikersinformatie is opgehaald
        } catch (error) {
            console.error('Fout bij ophalen gebruikersinformatie:', error.message);
            setIsAuth(false); // Update de auth-status
        }
    };

    // login functie die JWT instelt, gebruikersinformatie ophaalt en de auth-status bijwerkt
    const login = async (username, password) => {
            try {
                const data = await authenticateUser(username, password); // Gebruik de geïmporteerde functie
                setToken(data.jwt);
                localStorage.setItem('token', data.jwt);
                const userData= await getUserInfo(username, data.jwt); // Haal gebruikersinformatie op
                setUserInfo(userData);
                setIsAuth(true); // Zet auth-status op true na succesvolle login
                navigate('/'); // Navigeer naar de homepagina
            } catch (error) {
                console.error('Login mislukt:', error.message);
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

    // Logout-functie incl het wissen van auth-data
    const logout = () => {
        setToken(null); // Update de token
        setUserInfo(null); // Update de inlogstatus
        setIsAuth(false); // Update de auth-status
        localStorage.removeItem('token'); // Verwijder het token uit localStorage
        console.log('Token verwijderd uit localStorage:', localStorage.getItem('token')); // Controleer of de token is verwijderd
        navigate('/login'); // Navigeer naar de loginpagina
    };

    return (
        <AuthContext.Provider value={{ userInfo, token, isAuth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};