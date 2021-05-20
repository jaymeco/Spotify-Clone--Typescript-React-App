import { Link } from 'react-router-dom';
import './style.css';

interface IProps {
  id?: string;
  image?: string;
  name?: string;
}

export default function SearchArtistCard({id, image, name }: IProps) {
  return (
    <Link to={`/artist/${id}`} className="search-artist-card-group">
      <img 
        src={image || "https://i.scdn.co/image/ab67616d0000b27390acd1669192dc34cae79608"}
        alt={`artista - ${name}`}
      />
      <div className="content">
        <div>
          <h3 title={name}>{name || 'Slipknot'}</h3>
          <p>Artista</p>
        </div>
      </div>
    </Link>
  );
}