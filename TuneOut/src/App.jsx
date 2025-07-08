import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact.jsx';
import './App.css';
import ReadPlaylist from './pages/readPlaylist';
import AddSong from './pages/AddSong';


function App() {
  return (
    <Router>
      <SiteHeader />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/readPlaylist/:id" element={<ReadPlaylist />} />
          <Route path="/addSong/:id" element={<AddSong />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;