import { Link } from 'react-router-dom';
import './style.css';

interface IProps {
  id?: string;
  image?: string;
  name?: string;
  artist?: string;
  artist_id?: string;
  year?: number;
  type?: string;
  total_tracks?: number;
  total_time?: number;
}

export default function SearchCard({ artist, artist_id, id, image, year, type, name, total_tracks, total_time }: IProps) {
  return (
    <Link to={`/album/${id}`} className="search-card-group">
      <img 
        src={image || "https://i.scdn.co/image/ab67616d0000b27390acd1669192dc34cae79608"}
        alt={`artista - ${artist}`}
      />
      <div className="content">
        <div className="top">
          <h2>{name}</h2>
          <p>{total_tracks} músicas • 1h 40min</p>
          <p>{year}</p>
        </div>
        <div className="bottom">
          <Link to={`/artist/${artist_id}`}>{artist}</Link>
          <div>
            {type}
          </div>
        </div>
      </div>
    </Link>
  );
}