import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddSong() {
  const { id: playlistName } = useParams();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      playlistId: playlistName,
      title,
      artist,
      duration,
    };

    try {
      const response = await fetch(
        'https://l9kvphvd0a.execute-api.us-east-1.amazonaws.com/UpdatePlaylist',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Song added successfully!');
        setTitle('');
        setArtist('');
        setDuration('');
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      setMessage(`❌ Network error: ${err.message}`);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: 'calc(100vh - 100px)', // slightly less than full height to avoid overflow
        background: 'linear-gradient(135deg, #f8f9fa, #e0e7ff)',
        overflow: 'hidden',
      }}
    >
      <div
        className="card shadow-sm rounded-4 border-0"
        style={{
          width: '100%',
          maxWidth: '360px',
          padding: '1rem',
        }}
      >
        <h6 className="text-center text-muted mb-1">Add a Song to</h6>
        <h5 className="text-center text-primary fw-semibold mb-2">"{playlistName}"</h5>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Song Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="artist"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
            <label htmlFor="artist">Artist</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="duration"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
            <label htmlFor="duration">Duration (e.g. 3:45)</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
            🎶 Add Song
          </button>
        </form>

        {message && (
          <div
            className={`alert mt-2 py-1 px-2 text-center ${
              message.startsWith('✅') ? 'alert-success' : 'alert-danger'
            }`}
            style={{ fontSize: '0.85rem' }}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddSong;
