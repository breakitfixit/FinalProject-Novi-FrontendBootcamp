import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/src/assets/images/logo.png" alt="Logo"/>
                </Link>
            </div>
            <ul className="navbar navbar-list">
                <li className="nav-items">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="nav-items">
                    <Link to="/favorieten" className="navbar-link">Favorieten</Link>
                </li>
                <li className="nav-items">
                    <Link to="/profile" className="navbar-link">Profiel</Link>
                </li>
                <li className="nav-items">
                    Uitloggen
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;