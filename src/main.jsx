import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';


// import generateJWT from './helper/jwtHelper'; // Step 1: Importeer generateJWT
//
// // Functie om JWT te genereren en op te slaan in localStorage
// const initializeJWT = async () => {
//     const token = generateJWT(); // Stap 2: Genereer de JWT (zonder async)
//     localStorage.setItem('jwtToken', token); // Stap 3: Sla de JWT op in localStorage
// };
//
// // Stap 4: Roep de functie aan om de JWT te genereren en op te slaan
// initializeJWT();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);