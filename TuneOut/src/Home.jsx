
function HomePage() {
  //const navigate = useNavigate();

  const playlists = [
    { id: 1, name: '🎧 Chill' },
    { id: 2, name: '🔥 Workout' },
    { id: 3, name: '🌙 Late Night' },
  ];

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
              <button onClick={() => alert('Delete logic here')} className="delete-btn">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;