import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import Header from '../components/Header';
import InitialCard from '../components/InitialCard';
import './style.css';

interface IArtists {
  name: string;
  id: string;
}

interface IImages {
  url: string;
}

interface IItems {
  id: string;
  artists: IArtists[];
  name: string;
  release_date: string;
  images: IImages[];
}

export default function Home() {
  const [state, setState] = useState([]);
  useEffect(()=> {
    async function Data() {
      try {
        const { data } = await api.get('/albums/new-realeses');
        console.log(data?.albums.items);
        setState(data?.albums.items);
      } catch (error) {
        console.log(error);
      }

    }
    Data();
  }, [])
  return (
    <>
      <Header />
      <div className="home-container">
        <h2>Álbuns recém lançados</h2>
        <div className="container-row">
          {
            state.map((album: IItems)=>(
              <InitialCard
                key={album.id}
                artist_id={album.artists[0].id}
                album_id={album.id}
                album_name={album.name}
                album_url={album.images[0].url}
                album_year={album.release_date}
                artist={album.artists[0].name}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}