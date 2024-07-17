import React from 'react';
import {Link} from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/src/assets/images/logo.png" alt="Logo"/>
                </Link>
            </div>
            <ul className="navbar navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/favorieten" className="navbar-link">Favorieten</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/profile" className="navbar-link">Profiel</Link>
                </li>
                <li className="navbar-item">
                    Uitloggen
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;