import { useState } from 'react';
import Header from '../components/Header';
import InitialCard from '../components/InitialCard';
import './style.css';

export default function Home() {
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
    10
  ])

  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Álbuns recém lançados</h2>
        <div className="container-row">
          {
            state.map(item=>(
              <InitialCard
                key={item}
                album_name="Nights of the Dead, Legacy of the Beast: Live in Mexico City"
                album_url="https://i.scdn.co/image/ab67616d00001e023dd751909cadeef54302b0d8"
                album_year="2020"
                artist="Iron Maiden"
              />
            ))
          }
        </div>
      </div>
    </>
  );
}