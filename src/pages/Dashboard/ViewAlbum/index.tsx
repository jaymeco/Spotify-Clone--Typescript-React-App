import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Banner from './components/Banner';
import './style.css';

export default function ViewAlbum() {
  return (
    <>
      <Header />
      <div className="album-container">
        <Banner
          artist_name="Iron Maiden"
          artist_image="https://i.scdn.co/image/6dc0be659ea462b84b9b6485bc20db8dffaa48e2"
          album_name="Nights of the Dead, Legacy of the Beast: Live in Mexico City"
          album_year="2020"
          album_image="https://i.scdn.co/image/ab67616d0000b27358057301afd41e6efaa5b547"
          tracks={17}
          total_time={2000000}
        />
      </div>
    </>
  );
}