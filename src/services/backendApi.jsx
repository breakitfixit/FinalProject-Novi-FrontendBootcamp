import axios from 'axios';

// Functie om de gebruiker te authenticeren en een JWT-token op te halen
export const authenticateUser = async (username, password) => {
    try {
        // Stuur een POST request met de gebruikersnaam en wachtwoord
        const response = await axios.post(`https://api.datavortex.nl/toonrepertoire/users/authenticate`, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'toonrepertoire:OKnC8LRDd983cYAq1pv1'
            }
        });

        // Retourneer de response data (inclusief de JWT-token)
        return response.data;
    } catch (error) {
        // Log en retourneer de fout indien het verzoek mislukt
        console.error('Fout bij authenticatie:', error.response ? error.response.data : error.message);
        throw error; // Gooi de fout verder zodat de UI deze kan afhandelen
    }
};

// Functie om een nieuwe gebruiker te registreren
export const registerUser = async (userData) => {
    try {
        // Stuur een POST request met de gebruikersgegevens (JSON body)
        const response = await axios.post(`https://api.datavortex.nl/toonrepertoire/users`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'toonrepertoire:OKnC8LRDd983cYAq1pv1'
            }
        });

        // Retourneer de response data (meestal een bevestiging van registratie)
        return response.data;
    } catch (error) {
        // Log en retourneer de fout indien het verzoek mislukt
        console.error('Fout bij registratie:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Functie om gebruikersinformatie op te halen (JWT-token is vereist)
export const getUserInfo = async (username, token) => {
    try {
        // Stuur een GET request met de JWT-token in de Authorization header
        const response = await axios.get(`https://api.datavortex.nl/toonrepertoire/users/${username}/info`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Api-Key': 'toonrepertoire:OKnC8LRDd983cYAq1pv1'
            }
        });

        // Retourneer de opgehaalde gebruikersinformatie
        return response.data;
    } catch (error) {
        // Log en retourneer de fout indien het verzoek mislukt
        console.error('Fout bij het ophalen van gebruikersinformatie:', error.response ? error.response.data : error.message);
        throw error;
    }
};

//
// export const getCurrentUser = async (token) => {
//     try {
//         const response = await fetch('https://api.datavortex.nl/toonrepertoire/users/me', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (!response.ok) {
//             throw new Error(`HTTP-fout! status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Fout bij het ophalen van huidige gebruikersgegevens:', error);
//         throw error;
//     }
// };