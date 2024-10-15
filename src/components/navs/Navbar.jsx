import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/">
                    <img src="/src/assets/images/logo.png" alt="Logo" />
                </NavLink>
            </div>

            {/* Toon navigatielinks alleen als de gebruiker is ingelogd */}
            {isLoggedIn && (
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
            )}
        </nav>
    );
};

export default Navbar;
