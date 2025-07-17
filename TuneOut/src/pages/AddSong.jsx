import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AddSong() {
  const { id: playlistId } = useParams(); // gets playlist ID from URL
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { playlistId: `playlist${playlistId}`, title, artist, duration };

    try {
      const response = await fetch(
        'https://l9kvphvd0a.execute-api.us-east-1.amazonaws.com/default/updatePlaylist',
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
    <div className="add-song">
      <h2>Add a Song to Playlist {playlistId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Duration (e.g. 3:45)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        /><br />
        <button type="submit">Add Song</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddSong;
