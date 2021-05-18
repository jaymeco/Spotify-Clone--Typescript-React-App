import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './style.css';

interface IProps {
  album_url: string;
  album_name: string;
  album_year: string;
  artist: string;
  artist_id: string;
  album_id: string;
}

export default function InitialCard({ album_name, album_url, album_year, artist, artist_id, album_id }: IProps) {
  return (
    <Link to={`/album/${album_id}`} className="initial-card-group" >
      <div className="card-img-group">
        <img src={album_url}
          alt={`Album ${album_name}`}
        />
        <button>
          <BsFillPlayFill size={25} color="#fff"/>
        </button>
      </div>
      <div className="card-content">
        <h4>{album_name}</h4>
        <p><Link to={`/artist/${artist_id}`}>{artist}</Link> • {new Date(album_year).getFullYear().toString()}</p>
      </div>
    </Link>
  )
}