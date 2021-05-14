import { BsFillPlayFill } from 'react-icons/bs';
import './style.css';

interface IProps {
  album_url: string;
  album_name: string;
  album_year: string;
  artist: string;
}

export default function InitialCard({ album_name, album_url, album_year, artist }: IProps) {
  return (
    <div className="initial-card-group" >
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
        <p>{artist} • {album_year}</p>
      </div>
    </div>
  )
}