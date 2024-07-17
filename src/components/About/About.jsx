import React from 'react';
import './About.css';

const AboutComponent = () => {
    return (
        <section className="about" id="about">
            <h2>About T0oN</h2>
            <p>Voer een ISRC in de zoekbalk om beschikbare data te vinden bij Apple Music</p>

            <h2>Wat is een ISRC?</h2>
            <p>ISRC staat voor International Standard Recording Code. <br/>
                Het is een unieke code die wordt toegekend aan een masteropname.
            </p>

            <h2>Waar kan ik een ISRC vinden</h2>
            <p>https://www.isrcfinder.com/</p>

        </section>
    );
};

export default AboutComponent;