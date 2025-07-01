import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePlaylist } from '../api/api';


function Home() {
  const navigate = useNavigate();  

  const [playlists, setPlaylists] = useState([
    { id: 1, name: '🎧 Chill' },
    { id: 2, name: '🔥 Workout' },
    { id: 3, name: '🌙 Late Night' },
  ];
  const handleDelete = async (playlistId) => {
    try {
      const result = await deletePlaylist(playlistId);
      alert(result.message);
      setPlaylists(playlists.filter(p => p.id !== playlistId));
    } catch (error) {
      alert('Failed to delete playlist: ' + error.message);
    }
  };


  return (
    <div className="homepage">
      <h1>🎵 TuneOut</h1>
      <button onClick={() => navigate('/create')} className="create-btn">+ Create Playlist</button>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <h3>{playlist.name}</h3>
            <div className="actions">
              <button onClick={() => navigate(`/playlist/${playlist.id}`)}>Open</button>
              <button onClick={() => alert('Add song logic here')}>Add Song</button>
              <button
                onClick={() => handleDelete(playlist.id)}
                className="delete-btn"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;