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
        <div>
          <h3 title={name}>{name || 'Nigths od th death, Legacy'}</h3>
          <p>{total_tracks || 17} músicas • {year || 2020}</p>
          <Link title={artist} to={`/artist/${artist_id}`}>{artist || 'iron Maiden'}</Link>
        </div>
      </div>
    </Link>
  );
}