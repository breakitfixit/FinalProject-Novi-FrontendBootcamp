import React from 'react';
import {Link} from 'react-router-dom';

function TrackDetails() {
    return (
        <div>
            <h1>Track Details</h1>
            <Link to="/about">Naar de "over ons" pagina</Link>
            <p>
                Op deze pagina zie je details van zoekresultaten
            </p>
        </div>
    );
}

export default Profile;