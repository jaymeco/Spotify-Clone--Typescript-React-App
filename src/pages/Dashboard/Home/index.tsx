import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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
  const [recentSearch, setRecentSearch] = useState<any[]>();
  const history = useHistory();

  useEffect(() => {
    async function Data() {
      try {
        api.defaults.headers['Authorization'] = localStorage.getItem('token');

        const { data } = await api.get('/albums/new-realeses');

        setState(data?.albums.items);
        
        if (localStorage.getItem('recenty_searched')) {
          setRecentSearch(JSON.parse(localStorage.getItem('recenty_searched') as string));
        }
        setIsLoading(false);
      } catch (error) {
        if(error.response?.body?.error.message === 'The access token expired'){
          history.push('/');
        }
      }

    }
    Data();
  }, []);


  if (isLoading) return <Loading />
  return (
    <>
      <Header
        setSearchData={setSearchData}
      />
      <div className="home-container">
        {
          (!searchData.length && recentSearch?.length)? (
            <h2>Buscado recentemente</h2>
          ): null
        }
        <div className="container-row">
          {
            (!searchData.length && recentSearch?.length) ?
            recentSearch.map(items => {
              if (items['album']) {
                return (
                  <SearchCard
                    name={items['album'].name}
                    type={items['album'].type}
                    image={items['album'].image}
                    total_tracks={items['album'].total_tracks}
                    artist={items['album'].artist}
                    artist_id={items['album'].artist_id}
                    id={items['album'].id}
                    key={items['album'].id}
                    setSearchData={setRecentSearch}
                  />
                );
              } else if (items['artist']) {
                return (
                  <SearchArtistCard
                    id={items['artist'].id}
                    key={items['artist'].id}
                    image={items['artist'].image}
                    name={items['artist'].name}
                    setSearchData={setRecentSearch}
                  />
                );
              } else if (items['track']) {
                return (
                  <SearchMusicCard
                    id={items['track'].id}
                    key={items['track'].id}
                    name={items['track'].name}
                    image={items['track'].image}
                    artist={items['track'].artist}
                    artist_id={items['track'].artist_id}
                    setSearchData={setRecentSearch}
                  />
                );
              }
            }): null
          }
        </div>
        {
          searchData.length? (
            <h2>Resultado da busca</h2>
          ): null
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
                    disable={true}
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
                    disable={true}
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
                    disable={true}
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