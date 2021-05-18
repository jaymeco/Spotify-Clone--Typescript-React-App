import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Loading } from '../../components/Loading';
import Header from '../components/Header';
import InitialCard from '../components/InitialCard';
import SearchCard from './components/SearchCard';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    async function Data() {
      try {
        const { data } = await api.get('/albums/new-realeses');
        
        setState(data?.albums.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }

    }
    Data();
  }, [])

  if(isLoading) return <Loading/>
  return (
    <>
      <Header />
      <div className="home-container">
        <SearchCard/>
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