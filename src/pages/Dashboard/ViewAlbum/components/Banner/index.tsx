import { Link } from "react-router-dom";
import './style.css';

interface IProps {
  artist_name: string;
  artist_image: string;
  album_name: string;
  album_image: string;
  album_year: string;
  tracks: number;
  total_time: number;
}

export default function Banner(
  {
    artist_name,
    artist_image,
    album_name,
    album_image,
    album_year,
    tracks,
    total_time,
  }: IProps) {
  return (
    <div className="album-banner">
      <div className="banner-info">
        <h5>ÁLBUM</h5>
        <h2>{album_name}</h2>
        <div>
          <img
            src={artist_image}
            alt={`Artist - ${artist_name}`}
          />
          <p>
            <Link to="/artist">{artist_name}</Link>
            • {album_year} • {tracks} músicas, 1h 40min</p>
        </div>
      </div>
      <img
        src={album_image}
        alt={`Album - ${album_name}`}
      />
    </div>
  );
}