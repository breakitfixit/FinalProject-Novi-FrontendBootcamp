import React from 'react';
import './App.css';
import Navbar from './components/navs/Navbar.jsx';
import Favorites from "./pages/Favorites/Favorites.jsx";
import AboutComponent from './components/About.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import {Routes, Route} from 'react-router-dom';


function App() {

    // voeg navbar toe


    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/favorieten" element={<Favorites/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
            <main>

                <AboutComponent/>
            </main>
            <footer>
                <p>&copy; 2024 Rick Commandeur</p>
            </footer>

        </div>
    );
}

export default App;