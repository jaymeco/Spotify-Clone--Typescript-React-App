import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Loading } from '../../components/Loading';
import Header from '../components/Header';
import InitialCard from '../components/InitialCard';
import SearchArtistCard from './components/SearchArtistCard';
import SearchCard from './components/SearchCard';
import SearchMusicCard from './components/SearchMusicCard';
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
  const [searchData, setSearchData] = useState<any[]>([]);

  useEffect(() => {
    async function Data() {
      try {
        const { data } = await api.get('/albums/new-realeses');

        setState(data?.albums.items);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }

    }
    Data();
  }, [])

  if (isLoading) return <Loading />
  return (
    <>
      <Header
        setSearchData={setSearchData}
      />
      <div className="home-container">
        {
          searchData.length ? (
            <h2>Resultado da busca</h2>
          ) : null
        }
        <div className="container-row">
          {
            searchData?.map(data => {
              if (data.type === 'artist') {
                return (
                  <SearchArtistCard
                    id={data.id}
                    key={data.id}
                    image={data.images[0]?.url}
                    name={data.name}
                  />
                );
              } else if (data.type === 'album') {
                return (
                  <SearchCard
                    name={data?.name}
                    type={data?.type}
                    image={data?.images[0].url}
                    total_tracks={data?.total_tracks || 0}
                    artist={data?.artists[0].name}
                    artist_id={data?.artists[0].id || data?.id}
                    id={data?.id}
                  />
                );
              } else if (data.type === 'track') {
                return (
                  <SearchMusicCard
                    id={data.album.id}
                    key={data.id}
                    name={data.name}
                    image={data.album.images[0].url}
                    artist={data.artists[0].name}
                    artist_id={data.artists[0].id}
                  />
                );
              }
            })
          }
        </div>
        <h2>Álbuns recém lançados</h2>
        <div className="container-row">
          {
            state.map((album: IItems) => (
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