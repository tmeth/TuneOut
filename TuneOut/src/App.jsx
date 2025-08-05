import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact.jsx';
import ReadPlaylist from './pages/readPlaylist.jsx';
import './App.css';
import AddSong from './pages/AddSong';
import DeletePlaylist from './pages/DeletePlaylist';
import CreatePlaylist from './pages/CreatePlaylist.jsx';
import Subscribe from './pages/Subscribe';
import Success from './pages/Success';
import Cancel from './pages/Cancel';


function App() {
  return (
    <Router>
      <SiteHeader />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/CreatePlaylist" element={<CreatePlaylist />} />
          <Route path="/ReadPlaylist/:id" element={<ReadPlaylist />} />
          <Route path="/DeletePlaylist/:id" element={<DeletePlaylist />} />
          <Route path="/AddSong/:id" element={<AddSong />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;