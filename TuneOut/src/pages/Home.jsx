// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import readPlaylist from './ReadPlaylist';

function Home() {
  const navigate = useNavigate();  
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response = await fetch('https://47snssf5zohbjkzmypiemcbify0uvfms.lambda-url.us-east-1.on.aws/');
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
              <button onClick={() => navigate(`/readPlaylist/${playlist.pk}`)}>Open</button>
              <button onClick={() => navigate(`/addSong/${playlist.id}`)}>Add Song</button>
              <button onClick={() => alert('Delete logic here')} className="delete-btn">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;