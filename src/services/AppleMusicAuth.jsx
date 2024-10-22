// Zie documentatie in de README.md voor aanvullende informatie
import axios from 'axios';

// In deze functie wordt de backend wordt aangeroepen om een JWT-token op te halen van de Apple Music API
// Zie omschrijving in de README.md
export const fetchJwtToken = async () => {
    try {
        const tokenResponse = await axios.get('/api/token?secret=4935EF0596954B188FDCF59B07AEC17B93DC1B1248B3453FB9F31D1AAC2EF067');
        return tokenResponse.data.token;
    } catch (error) {
        console.error('Fout bij het fetchen van JWT token:', error);
        throw new Error('JWT token kon niet worden opgehaald');
    }
};

// // Het is helaas niet gelukt via onderstaande code waarin ik gebruik maak van een .env file
// import axios from 'axios';
//
// // Functie waarmee backend wordt aangeroepen om een JWT-token op te halen van de Apple Music API
// export const fetchJwtToken = async () => {
//     try {
//         // Gebruik de secret uit de .env file
//         const secret = process.env.REACT_APP_API_SECRET;
//         const tokenResponse = await axios.get(`/api/token?secret=${secret}`);
//         return tokenResponse.data.token;
//     } catch (error) {
//          console.error('Fout bij het fetchen van JWT token:', error);
//          throw new Error('JWT token kon niet worden opgehaald');
//     }
// };

