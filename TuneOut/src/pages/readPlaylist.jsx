import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


function readPlaylist(){
    const { id } = useParams();

    const [playlist, setPlaylist] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://l9kvphvd0a.execute-api.us-east-1.amazonaws.com/readPlaylist") 
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.json();
      })
      .then((data) => {
        const selected = data.find(p => String(p.pk) === id);
        setPlaylist(selected)
      })
      .catch((err) => {
        console.error("Error fetching playlist:", err);
        setError("Something went wrong fetching the playlist.");
      });
  }, [id]);
  if (error) return <p>{error}</p>;
  if (!playlist) return <p>Loading...</p>;

  return (
    <div>
      <h2>{playlist.name || playlist.title || "Untitled Playlist"}</h2>
      <p><strong>Author:</strong> {playlist.author || "Unknown"}</p>
      
      <h3>Songs</h3>
      {Array.isArray(playlist.songs) ? (
        <ul>
          {playlist.songs.map((song, i) => (
            <li key={i}>
              <strong>{song.title}</strong> — {song.artist} <em>({song.duration})</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs listed for this playlist.</p>
      )}

    </div>
  );

}
export default readPlaylist