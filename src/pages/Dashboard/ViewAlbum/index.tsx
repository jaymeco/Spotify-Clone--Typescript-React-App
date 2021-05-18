import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Banner from './components/Banner';
import './style.css';

interface IImages {
  url: string;
}

interface ITrack {
  id: string;
  name: string;
  duration_ms: number;
  disc_number: number;
}

interface ITracks {
  items: ITrack[];
}

interface IAlbum {
  images: IImages[];
  name: string;
  release_date?: string;
  id?: string;
  tracks: ITracks;
  total_tracks: number;
}

interface IArtist {
  images: IImages[];
  name: string;
  id: string;
}

export default function ViewAlbum() {
  const params = useParams<{id: string}>();
  const [state, setState] = useState([])
  const [artist, setArtist] = useState<IArtist>();
  const [albums, setAlbums] = useState<IAlbum[]>();
  const [album, setAlbum] = useState<IAlbum>();

  useEffect(()=> {
    async function getData(){
      try {
        const { id } = params;
        const {data} = await api.get(`/album/${id}`);

        setAlbums(data.some_albums.items);
        setArtist(data.artist);
        setAlbum(data.album);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData()
  }, [params])
  return (
    <>
      <Header />
      <div className="album-container">
        <Banner
          artist_id={artist?.id as string}
          artist_name={artist?.name as string}
          artist_image={artist?.images[0].url as string}
          album_name={album?.name as string}
          album_year={new Date(album?.release_date as string).getFullYear().toString()}
          album_image={album?.images[0].url as string}
          tracks={album?.total_tracks as number}
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
                album?.tracks.items.map((track, index) => (
                  <li key={track.id}>
                    <div>
                      <p>{index + 1}</p>
                      <p>{track.name}</p>
                    </div>
                    <p>{track.duration_ms}</p>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="others-albums">
            <div>
              <h2>Outros álbuns do artista</h2>
              <Link to={`/artist/${artist?.id}/discography`}>DISCOGRAFIA</Link>
            </div>
            <div className="others-container-row">
              {
                albums?.map(album=>(
                  <AlbumCard
                    album_id={album.id as string}
                    key={album.id}
                    album_image={album.images[0].url}
                    album_name={album.name}
                    album_year={new Date(album.release_date as string).getFullYear().toString()}
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