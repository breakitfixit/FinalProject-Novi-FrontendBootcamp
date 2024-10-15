import React from 'react';
import './About.css';

const AboutComponent = () => {
    return (
        <section className="about" id="about">
            {/* Schroeven voor decoratie in de layout */}
            <div className="screw top-left"></div>
            <div className="screw top-right"></div>

            {/* Titel van de sectie */}
            <h2>About</h2>

            {/* Wat is een ISRC? */}
            <div className="about-item">
                <h3>Wat is een ISRC?</h3>
                <p>
                    Een ISRC (International Standard Recording Code) is een unieke code van 12 karakters die wordt
                    toegekend aan een geluidsopname. De code identificeert muzieknummers en bestaat uit vier delen:
                    het land van herkomst, de registratiehouder, het jaar van registratie en een uniek volgnummer.
                    <br/>
                    Voor meer informatie over ISRC's, zie: <a
                    href="https://nl.wikipedia.org/wiki/International_Standard_Recording_Code"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Wikipedia
                </a>
                </p>
            </div>

            {/* Waar een ISRC vinden */}
            <div className="about-item">
                <h3>Waar kan ik een ISRC vinden?</h3>
                <p>
                    Ga hiervoor naar <a href="https://www.isrcfinder.com/" target="_blank" rel="noopener noreferrer">ISRC Finder</a>
                </p>
            </div>

            {/* Wat is Apple Music? */}
            <div className="about-item">
                <h3>Wat is Apple Music?</h3>
                <p>
                    Apple Music is het streaming platform van Apple en biedt toegang tot miljoenen releases. Elke track op Apple Music is voorzien van een ISRC.
                    <br/>
                    Voor meer informatie over Apple Music, zie: <a
                    href="https://www.apple.com/nl/apple-music/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Apple Music
                </a>
                </p>
            </div>

            {/* Contactinformatie */}
            <div className="about-item">
                <h3>Contact</h3>
                <p>Heb je vragen? Stuur een berichtje via Teams, dan kan ik je helpen!</p>
            </div>
        </section>
    );
};

export default AboutComponent;
