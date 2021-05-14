import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Banner from './components/Banner';
import './style.css';

export default function ViewAlbum() {
  const [state, setState] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17
  ])

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
        <div className="tracks-others-container">
          <div className="album-track-container">
            <div className="search-menu">
              <SearchBar />
              <div className="btn-container">
                <button type="button" className="btn-first">Disco 1</button>
                {/* <button type="button" className="btn-middle">Disco 2</button> */}
                <button type="button" className="btn-last">Disco 2</button>
              </div>
            </div>
            <div className="track-header">
              <h4>Título</h4>
              <h4>Duração</h4>
            </div>
            <ul className="track-list">
              {
                state.map(item => (
                  <li key={item}>
                    <div>
                      <p>{item}</p>
                      <p>Churchill’s Speech - Live in Mexico City, Palacio de los Deportes, Mexico, September 2019</p>
                    </div>
                    <p>0:38</p>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="others-albums">
            <div>
              <h2>Outros álbuns do artista</h2>
              <Link to="artists/discography">DISCOGRAFIA</Link>
            </div>
            <div className="others-container-row">
              {
                state.map(item=>(
                  <Link key={item} className="album-card" to="/album">
                    <img
                      src="https://i.scdn.co/image/ab67616d00001e026afa62d8424c574900eff429"
                      alt="Album - "
                    />
                    <div className="content">
                      <h6>Piece of Mind (2015 Remaster)</h6>
                      <p>2003</p>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}