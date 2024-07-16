import React from 'react';
import {Link} from 'react-router-dom';

function Profile() {
    return (
        <div>
            <h1>Profiel en settings page</h1>
            <Link to="/about">Naar de "over ons" pagina</Link>
            <p>
                Hier kan je je profiel en instellingen aanpassen
            </p>
        </div>
    );
}

export default Profile;