import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext.jsx";
import './Navbar.css';

const Navbar = () => {
    const {isAuth, logout} = useContext(AuthContext); // Haal de isAuth-status uit de context
    const navigate = useNavigate(); // Voor het navigeren naar andere pagina's

    const handleLogout = () => {
        logout(); // Logout-functie aanroepen en verwijder token
        navigate("/login"); // Navigeer naar de login-pagina na uitloggen
    }

    // Uitlogfunctie: Verwijder token en navigeer naar loginpagina
    if (!isAuth) {
        return null; // Toon geen navigatie als de gebruiker niet is ingelogd
    }


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/">
                    <img src="/src/assets/images/logo.png" alt="Logo"/>
                </NavLink>
            </div>
            <ul className="navbar-list">
                <li className="nav-items">
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? 'navbar-link nav-item-active' : 'navbar-link'
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-items">
                    {/* 'About' is een interne link*/}
                    <a href="#about" className="navbar-link">About</a>
                </li>
                <li className="nav-items">
                    <NavLink
                        to="/favorieten"
                        className={({isActive}) =>
                            isActive ? 'navbar-link nav-item-active' : 'navbar-link'
                        }
                    >
                        Favorites
                    </NavLink>
                </li>
                <li className="nav-items">
                    <NavLink
                        to="/profile"
                        className={({isActive}) =>
                            isActive ? 'navbar-link nav-item-active' : 'navbar-link'
                        }
                    >
                        Profile
                    </NavLink>
                </li>
                {/* Uitlogknop */}
                <li className="nav-items">
                    <button onClick={handleLogout} className="navbar-link logout-button">
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
