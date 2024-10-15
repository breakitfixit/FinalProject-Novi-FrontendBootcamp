import axios from 'axios';

// In deze functie wordt de backend wordt aangeroepen om een JWT-token op te halen van de Apple Music API
// Zie omschrijving in de README.md
export const fetchJwtToken = async () => {
    try {
        const tokenResponse = await axios.get('/api/token?secret=_________________');
        return tokenResponse.data.token;
    } catch (error) {
        console.error('Error fetching JWT token:', error);
        throw new Error('Could not fetch JWT token');
    }
};


// import axios from 'axios';
//
// // Functie waarmee backend wordt aangeroepen om een JWT-token op te halen van de Apple Music API
// // niet gelukt via de .env file
// export const fetchJwtToken = async () => {
//     try {
//         // Gebruik de secret uit de .env file
//         const secret = process.env.REACT_APP_API_SECRET;
//         const tokenResponse = await axios.get(`/api/token?secret=${secret}`);
//         return tokenResponse.data.token;
//     } catch (error) {
//         console.error('Error fetching JWT token:', error);
//         throw new Error('Could not fetch JWT token');
//     }
// };

