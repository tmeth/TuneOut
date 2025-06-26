import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Home from './pages/Home';
import About from './pages/About';
<<<<<<< HEAD
import Contact from './pages/Contact';
import Playlists from './pages/Playlists';
=======
import Contact from './pages/Contact.jsx';
>>>>>>> c82f55ed0e29dc8f08bbbb58aa147944ea4e5c15
import './App.css';

function App() {
  return (
    <Router>
      <SiteHeader />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;