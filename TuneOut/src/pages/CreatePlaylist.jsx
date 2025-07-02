
import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylist = () => {
  const [name, setName] = useState('');
  const [songs, setSongs] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const songList = songs.split(',').map(song => song.trim());

    try {
      const res = await axios.post('https://fj26176edf.execute-api.us-east-1.amazonaws.com/dev/createPlaylist', {
        name: name,
        songs: songList
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div>
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Playlist Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Songs (comma-separated):</label>
          <input type="text" value={songs} onChange={e => setSongs(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default CreatePlaylist;
