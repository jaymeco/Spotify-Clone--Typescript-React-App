import { useState } from "react";
import AlbumCard from "../components/AlbumCard";
import Header from "../components/Header";
import './style.css';

export default function Discography() {
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
      <div className="discography-header">
        <img
          src="https://i.scdn.co/image/6dc0be659ea462b84b9b6485bc20db8dffaa48e2"
          alt={`Artist - `}
        />
        <h2>Iron Maiden</h2>
      </div>
      <div className="discography-container">
        <div className="discography-row">
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
    </>
  );
}