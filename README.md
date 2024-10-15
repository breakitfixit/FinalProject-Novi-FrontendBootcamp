# 2024-Novi-Eindopdracht-Sena

Dit project is mijn eindopdracht voor de Frontend Bootcamp bij Novi Hogeschool. Het idee voor de opdracht is in samenwerking met Sena (stichting ter exploitatie van naburige rechten) tot stand gekomen.
Het betreft een webapplicatie "TOON" die gebruik maakt van de Apple Music API voor het ophalen en weergeven van muziekinformatie op basis van ISRC-codes. 
Deze tool is in te zetten voor werknemers van Sena als ondersteuning bij controle-werkzaamheden op registraties van muzikanten- en producentenrepertoire.

## Inhoud

1. [Over het project](#over-het-project)
2. [Installatie](#installatie)
3. [Gebruik](#gebruik)
4. [ISRC Testgegevens](#isrc-testgegevens)
5. [Belangrijke configuratie](#belangrijke-configuratie)
6. [Beschikbare scripts](#beschikbare-scripts)
7. [Licentie](#licentie)

## Over het project

Dit project is gebouwd met React voor de frontend. Het hoofddoel is om muziekdetails op te halen op basis van ISRC-codes. Het project bevat een zoekfunctie, de mogelijkheid om favorieten op te slaan en deze naar CSV te exporteren.
In overleg met Novi is er een C++-backend gebruikt voor het genereren van JWT-tokens die nodig zijn voor authenticatie bij de Apple Music API.

## Installatie

Om de applicatie lokaal te draaien, volg je de volgende stappen:

### Vereisten

- Node.js (versie 14 of hoger)
- npm (versie 7 of hoger)

### Stappen

1. **Clone de repository:**
   git clone https://github.com/gebruikersnaam/2024-novi-eindopdracht-sena.git
   cd 2024-novi-eindopdracht-sena

2. **Installeer de benodigde dependencies:**
   npm install
   
3. **configuratie AppleMusicAuth.jsx:**
  In het bestand AppleMusicAuth.jsx moet de volgende code worden toegevoegd op de __________om de tokenResponse correct te activeren:
  4935EF0596954B188FDCF59B07AEC17B93DC1B1248B3453FB9F31D1AAC2EF067

5. **Start de development server:**
  npm run dev
   
6. **Proxy-configuratie in Vite:**
  In het bestand vite.config.js wordt een proxy gebruikt om de /api/-routes te omleiden naar de backend:

    export default defineConfig({
    server: {
      proxy: {
        '/api/': {
          target: 'https://secure.sena.nl/ricksafstudeerservices',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  });

  Hierdoor kunnen API-aanroepen tijdens de ontwikkeling zonder CORS-problemen worden afgehandeld.

## Gebruik

1. Login
Gebruikersnaam en wachtwoord aanmaken kan via de registratie-button
2. Zoeken op ISRC:
Voer een ISRC-code in de zoekbalk in en klik op "Zoek" om muziekinformatie van de Apple Music API op te halen.

3. Details inzien van zoekresultaten
Door te klikken op een van de gevonden resultaten kom je op de pagina trackdetails van deze release
   
4. Favorieten opslaan:
Sla maximaal 8 tracks op als favorieten en exporteer deze naar een CSV-bestand.

5. Favorieten exporteren in .csv
De selectie van 8 f
6. Profiel aanpassen:
Gebruikers kunnen hun profiel aanpassen en favorieten beheren via de instellingenpagina.

## ISRC Testgegevens

Voor het testen van de zoekfunctionaliteit kun je de volgende ISRC-codes gebruiken:
USCM51600028
USEE10250233
USIR27700016
USMO10119990
USDHM1521091
GBAQH0200041
GBARL1200723
GBAYE0601458
DEE868300011

of zoeken via isrcfinder.com



