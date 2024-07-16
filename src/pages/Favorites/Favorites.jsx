import React from 'react';
import { Link } from 'react-router-dom';
function Favorites () {
    return (
        <div>
            <h1>Favorieten pagina</h1>
            <Link to="/about">Naar de "over ons" pagina</Link>
            <p>sla zoekresultaten op als favoriet</p>
            <p>exporteer favorieten als .csv</p>
        </div>
    );
}

export default Favorites;