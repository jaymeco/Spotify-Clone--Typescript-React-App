import { Link } from "react-router-dom";
import './style.css';

interface IProps {
  album_image: string;
  album_name: string;
  album_year: string;
}

export default function AlbumCard({ album_image, album_name, album_year }: IProps) {
  return (
    <Link className="album-card" to="/album">
      <img
        src={album_image}
        alt={`Album - ${album_name}`}
      />
      <div className="content">
        <h6 title={album_name} >{album_name}</h6>
        <p>{album_year}</p>
      </div>
    </Link>
  );
}