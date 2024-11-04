import {useContext} from "react";
import {Routes, Route} from 'react-router-dom';
import {AuthContext} from './context/AuthContext'; // Importeer AuthContext
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
    const {isAuth} = useContext(AuthContext); // Haal de isAuth-status uit de context


    return (
        <div className="appContainer">
            {isAuth && <Navbar/>} {/* Navbar alleen tonen als isAuth true is */}
            <main>
                <CasettePanel>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
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
