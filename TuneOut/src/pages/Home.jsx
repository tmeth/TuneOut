// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import readPlaylist from './ReadPlaylist';

function Home() {
  const navigate = useNavigate();  
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await fetch('https://l9kvphvd0a.execute-api.us-east-1.amazonaws.com/readPlaylist');
        console.log(response)
        const playlistNames = await response.json();
        setPlaylists(playlistNames);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    }

    fetchPlaylists();
  }, []);


  return (
    <div className="homepage">
      <h1>🎵 TuneOut</h1>
      <button onClick={() => navigate('/CreatePlaylist')} className="create-btn">+ Create Playlist</button>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div key={playlist.pk} className="playlist-card">
            <h3>{playlist.name}</h3>
            <div className="actions">
              <button onClick={() => navigate(`/ReadPlaylist/${playlist.pk}`)}>Open</button>
              <button onClick={() => navigate(`/AddSong/${playlist.pk}`)}>Add Song</button>
              <button onClick={() => navigate(`/DeletePlaylist/${playlist.pk}`)} className="delete-btn">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;