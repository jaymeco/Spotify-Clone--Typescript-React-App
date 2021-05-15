import { useState } from 'react';
import { Link } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Banner from './components/Banner';
import './style.css';

export default function Artist() {
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
      <div className="artist-container">
        <Banner/>
        <div className="popular-others-container">
          <div className="popular-track-container">
            <h1>Músicas Populares</h1>
            <ul className="popular-track-list">
              {
                state.map(item => (
                  <li key={item}>
                    <div>
                      <p>{item}</p>
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e026afa62d8424c574900eff429"
                        alt={`Album -`}
                      />
                      <p>The Trooper - 2015 Remaster</p>
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
              <Link to="/artist/discography">DISCOGRAFIA</Link>
            </div>
            <div className="others-container-row">
              {
                state.map(item => (
                  <AlbumCard
                    key={item}
                    album_image="https://i.scdn.co/image/ab67616d00001e026afa62d8424c574900eff429"
                    album_name="Piece of Mind (2015 Remaster)"
                    album_year="2003"
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}