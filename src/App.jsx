import {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import TrackDetails from './pages/TrackDetails/TrackDetails';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CasettePanel from './components/CassettePanel/CassettePanel';
import AboutComponent from './components/About/About';
import Navbar from './components/navs/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; // Importeer PrivateRoute component
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check of gebruiker ingelogd is
    const navigate = useNavigate();

    // Controleer bij pagina-verversing of de gebruiker niet ingelogd is en navigeer naar loginpagina
    useEffect(() => {
        if (!isLoggedIn && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // Uitlogfunctie: Verwijder token en navigeer naar loginpagina
    const handleLogout = () => {
        localStorage.removeItem('token'); // Verwijder het token uit localStorage
        setIsLoggedIn(false); // Update de inlogstatus
        navigate('/login'); // Navigeer naar de loginpagina
    };

    return (
        <div className="appContainer">
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Inclusief props zodat navigatie enkel zichtbaar is wanneer de gebruiker is ingelogd*/}
            <main>
                <CasettePanel>
                    <Routes>
                        {/* Alleen toegang als gebruiker ingelogd is */}
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                        <Route path="/track-details/:id" element={<PrivateRoute><TrackDetails/></PrivateRoute>}/>
                        <Route path="/favorieten" element={<PrivateRoute><Favorites/></PrivateRoute>}/>
                        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                    </Routes>
                </CasettePanel>
            </main>
            <AboutComponent/>
            <footer>
                <p>&copy; 2024 Rick Commandeur | Eindopdracht voor Novi Hogeschool | In samenwerking met Sena</p>
            </footer>
        </div>
    );
}

export default App;
//
// import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import TrackDetails from './pages/TrackDetails/TrackDetails';
// import Favorites from './pages/Favorites/Favorites';
// import Profile from './pages/Profile/Profile';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import CasettePanel from './components/CassettePanel/CassettePanel';
// import AboutComponent from './components/About/About';
// import Navbar from './components/navs/Navbar';
// import './App.css';
//
// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
//
//     return (
//         <div className="appContainer">
//             <Navbar /> {/* Include the Navbar component */}
//             <main>
//                 <CasettePanel>
//                     <Routes>
//                         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//                         <Route path="/register" element={<Register />} />
//                         <Route path="/" element={<Home />} />
//                         <Route path="/track-details/:id" element={<TrackDetails />} />
//                         <Route path="/favorieten" element={<Favorites />} />
//                         <Route path="/profile" element={<Profile />} />
//                     </Routes>
//                 </CasettePanel>
//             </main>
//             <AboutComponent />
//             <footer>
//                 <p>&copy; 2024 Rick Commandeur | Eindopdracht voor Novi Hogeschool | In samenwerking met Sena</p>
//             </footer>
//         </div>
//     );
// }
//
// export default App;
