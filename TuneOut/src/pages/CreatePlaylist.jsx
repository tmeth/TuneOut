import React, { useState } from 'react';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [songInput, setSongInput] = useState('');
  const [songList, setSongList] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const addSong = () => {
    if (songInput.trim()) {
      setSongList([...songList, songInput.trim()]);
      setSongInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://fj26176edf.execute-api.us-east-1.amazonaws.com/createPlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName,
          songs: songList
        })
      });

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch');
      setResponse(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Playlist Name</label>
          <input
            type="text"
            className="form-control"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add a song"
            value={songInput}
            onChange={(e) => setSongInput(e.target.value)}
          />
          <button type="button" className="btn btn-outline-primary" onClick={addSong}>+</button>
        </div>

        {songList.length > 0 && (
          <ul className="list-group mb-3">
            {songList.map((song, index) => (
              <li key={index} className="list-group-item">{song}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="btn btn-success">Create Playlist</button>
      </form>

      {response && (
        <div className="alert alert-success mt-4">
          <strong>Success:</strong> {response.message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default CreatePlaylist;
