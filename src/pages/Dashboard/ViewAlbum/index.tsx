import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './style.css';

export default function ViewAlbum() {
  return (
    <>
      <Header />
      <div className="album-container">
        <div className="album-banner">
          <div className="banner-info">
            <h5>ÁLBUM</h5>
            <h2>Nights of the Dead, Legacy of the Beast: Live in Mexico City</h2>
            <div>
              <img
                src="https://i.scdn.co/image/6dc0be659ea462b84b9b6485bc20db8dffaa48e2"
                alt="Artist"
              />
              <p> <Link to="/artist">Iron Maiden</Link> • 2020 • 17 músicas, 1h 40min</p>
            </div>
          </div>
          <img
            src="https://i.scdn.co/image/ab67616d0000b27358057301afd41e6efaa5b547"
            alt="Album"
          />
        </div>
      </div>
    </>
  );
}