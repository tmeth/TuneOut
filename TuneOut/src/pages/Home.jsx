import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import readPlaylist from './readPlaylist';

function Home() {
  const navigate = useNavigate();  

  const playlists = [
    { id: 1, name: '🎧 Chill' },
    { id: 2, name: '🔥 Workout' },
    { id: 3, name: '🌙 Late Night' },
  ];

  return (
    <div className="homepage">
      <h1>🎵 TuneOut</h1>
      <button onClick={() => navigate('/CreatePlaylist')} className="create-btn">+ Create Playlist</button>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <h3>{playlist.name}</h3>
            <div className="actions">
              <button onClick={() => navigate(`/readPlaylist/${playlist.id}`)}>Open</button>
              <button onClick={() => navigate(`/addSong/${playlist.id}`)}>Add Song</button>
              <button onClick={() => navigate(`/deletePlaylist/${playlist.id}`)} className="delete-btn">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;