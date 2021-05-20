import { Link } from 'react-router-dom';
import './style.css';

interface IProps {
  id?: string;
  image?: string;
  name?: string;
  artist?: string;
  artist_id?: string;
}

export default function SearchMusicCard({ artist, artist_id, id, image, name }: IProps) {
  return (
    <Link to={`/album/${id}`} className="search-music-card-group">
      <img 
        src={image || "https://i.scdn.co/image/ab67616d0000b27390acd1669192dc34cae79608"}
        alt={`artista - ${artist}`}
      />
      <div className="content">
        <div>
          <h3 title={name}>{name || 'Iron'}</h3>
          <Link title={artist} to={`/artist/${artist_id}`}>{artist || 'iron Maiden'}</Link>
        </div>
      </div>
    </Link>
  );
}