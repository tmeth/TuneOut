import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';


function readPlaylist(){
    const { id } = useParams();

    const [playlist, setPlaylist] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://47snssf5zohbjkzmypiemcbify0uvfms.lambda-url.us-east-1.on.aws/ ") 
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.json();
      })
      .then((data) => {
        const selected = data.find(p => String(p.id) === id);
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
      <h2>{playlist.title}</h2>
      <p>Artist: {playlist.artist}</p>
    </div>
  );

}
export default readPlaylist